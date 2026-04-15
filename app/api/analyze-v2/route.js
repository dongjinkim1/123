import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

// CJS modules — dynamic import
let _pb = null
let _ai = null
let _val = null
let _rl = null
async function getModules() {
  if (!_pb) {
    const pbMod = await import('@/lib/prompt-builder.js')
    _pb = pbMod.default || pbMod
    const aiMod = await import('@/lib/ai-client.js')
    _ai = aiMod.default || aiMod
    const valMod = await import('@/lib/validators.js')
    _val = valMod.default || valMod
    const rlMod = await import('@/lib/rate-limiter.js')
    _rl = rlMod.default || rlMod
  }
  return { pb: _pb, ai: _ai, val: _val, rl: _rl }
}

export async function POST(request) {
  console.log('[analyze-v2] request received')

  try {
    const body = await request.json()
    const { y, m, d, h, min, gender, mbtiChoices, mbtiIntensities, cityLng, userId } = body

    const { pb, ai, val, rl } = await getModules()
    const supabase = getServiceSupabase()

    // input validation (strengthened)
    const validationError = val.validateInput({ y, m, d, h, min, gender, mbtiChoices, mbtiIntensities })
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    // rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const identifier = userId || ip
    const { allowed, retryAfter } = await rl.checkRateLimit(supabase, identifier, 'analyze', 60000, 5)
    if (!allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter }, { status: 429 })
    }

    // server-side clover check (if userId provided)
    if (userId) {
      const { data: user } = await supabase
        .from('users')
        .select('clover_balance')
        .eq('id', userId)
        .maybeSingle()
      if (user && user.clover_balance < 15) {
        return Response.json({ error: '클로버 부족', balance: user.clover_balance }, { status: 402 })
      }
    }

    // result caching — same input within 7 days returns cached result
    const inputKey = JSON.stringify({y:+y,m:+m,d:+d,h:h?+h:null,min:min?+min:null,gender,mbtiChoices,mbtiIntensities:mbtiIntensities||[60,60,60,60]})
    const inputHash = Array.from(new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(inputKey))
    )).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32)

    const { data: cached } = await supabase
      .from('analysis_jobs')
      .select('id, result')
      .eq('input_hash', inputHash)
      .eq('status', 'done')
      .gte('created_at', new Date(Date.now() - 7*24*60*60*1000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (cached && cached.result) {
      console.log('[analyze-v2] cache hit:', inputHash)
      return Response.json({ jobId: cached.id, status: 'done', result: cached.result, cached: true })
    }

    // server-side prompt build
    const prompts = pb.buildSajuPrompt({
      y: +y, m: +m, d: +d,
      h: h ? +h : null, min: min ? +min : null,
      cityLng: cityLng || null,
      gender: gender || '여성',
      mbtiChoices: mbtiChoices,
      mbtiIntensities: mbtiIntensities || [60, 60, 60, 60]
    })

    if (!prompts || !prompts.systemPrompt) {
      return Response.json({ error: 'Prompt build failed' }, { status: 500 })
    }

    console.log('[analyze-v2] prompts built: sys=%d usr=%d',
      prompts.systemPrompt.length, prompts.userPrompt.length)

    // create job
    const jobId = crypto.randomUUID()
    const inputParams = {
      type: 'saju', y, m, d, h, min,
      gender, mbtiChoices, mbtiIntensities, cityLng
    }

    const { error: dbError } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: 'processing',
      params: inputParams,
      input_hash: inputHash,
      updated_at: new Date().toISOString()
    })

    if (dbError) {
      console.error('[analyze-v2] DB insert error:', dbError.message)
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    console.log('[analyze-v2] job created:', jobId)

    // return immediately, process in background
    waitUntil(processJob(jobId, prompts, inputParams, ai))

    return Response.json({ jobId, status: 'created' })

  } catch (err) {
    console.error('[analyze-v2] error:', err.message)
    return Response.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}

async function processJob(jobId, prompts, inputParams, ai) {
  const supabase = getServiceSupabase()

  try {
    // JSON enforcement (same as job-create)
    const finalSystemPrompt = prompts.systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character of your response MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown (```), NO comments, NO apologies, NO preamble\n' +
      '5. All string values must use proper JSON escaping (\\n for newlines, \\\\ for backslash, \\" for quotes)\n' +
      '6. Violation = system crash. Comply exactly.'

    console.log('[analyze-v2] calling Claude API for job:', jobId)

    const SUB_TITLES = ["나의 성격","나의 장점","고쳐야 할 점","남들이 보는 나","연애 스타일","잘 맞는 타입","연애 지뢰","직장 적성","맞춤 재물 쌓는 법","올해 키워드","올해 조언","대운 흐름","기회의 시기","인생 한줄 마무리"]

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 30000,
      temperature: 0.6,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: prompts.userPrompt }]
    })

    let fullText = ''
    let detectedCount = 0
    const detectedSubs = []

    stream.on('text', async (text) => {
      fullText += text

      // detect completed subs for progressive rendering
      if (detectedCount < SUB_TITLES.length) {
        const nextIdx = detectedCount + 1
        if (nextIdx < SUB_TITLES.length) {
          const nextMarker = '"h":"' + SUB_TITLES[nextIdx] + '"'
          const nextMarkerWs = '"h": "' + SUB_TITLES[nextIdx] + '"'
          if (fullText.indexOf(nextMarker) >= 0 || fullText.indexOf(nextMarkerWs) >= 0) {
            const prevTitle = SUB_TITLES[detectedCount]
            const prevMarker = '"h":"' + prevTitle + '"'
            const prevMarkerWs = '"h": "' + prevTitle + '"'
            const pmPos = fullText.indexOf(prevMarker) >= 0 ? fullText.indexOf(prevMarker) : fullText.indexOf(prevMarkerWs)
            const nmPos = fullText.indexOf(nextMarker) >= 0 ? fullText.indexOf(nextMarker) : fullText.indexOf(nextMarkerWs)
            if (pmPos >= 0 && nmPos > pmPos) {
              const prevStart = fullText.lastIndexOf('{', pmPos)
              const nextStart = fullText.lastIndexOf('{', nmPos)
              if (prevStart >= 0 && nextStart > prevStart) {
                const subText = fullText.substring(prevStart, nextStart).replace(/,\s*$/, '')
                try {
                  const subObj = JSON.parse(subText)
                  detectedSubs.push(subObj)
                  // update DB with partial progress (fire-and-forget)
                  supabase.from('analysis_jobs').update({
                    partial_subs: detectedSubs,
                    progress: Math.round(detectedSubs.length / SUB_TITLES.length * 100)
                  }).eq('id', jobId).then(function() {})
                } catch (e) { /* partial parse fail — skip */ }
              }
              detectedCount = nextIdx
            }
          }
        }
      }
    })

    const finalMessage = await stream.finalMessage()
    // ensure fullText has final content
    fullText = finalMessage.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    console.log('[analyze-v2] Claude done:', fullText.length, 'chars, subs detected:', detectedSubs.length)

    const isComplete = ai.isValidJSON(fullText)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: isComplete ? 'done' : 'partial',
      params: inputParams,
      result: {
        text: fullText,
        length: fullText.length,
        model: finalMessage.model,
        usage: finalMessage.usage
      },
      error: isComplete ? null : 'incomplete_response',
      updated_at: new Date().toISOString()
    })

    console.log('[analyze-v2] saved:', isComplete ? 'done' : 'partial', fullText.length, 'chars')

    // log partial responses
    if (!isComplete) {
      await logError('analysis', 'Incomplete AI response', {
        jobId, errorType: 'json_parse', length: fullText.length
      })
    }

  } catch (err) {
    console.error('[analyze-v2] processJob error:', err.message)

    const errorType = err.message.includes('timeout') || err.message.includes('Timeout') ? 'ai_timeout'
      : err.status === 529 || err.message.includes('overloaded') ? 'ai_overload'
      : 'unknown'

    await logError('analysis', err.message, { jobId, errorType })

    const { error: failErr } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: 'failed',
      params: inputParams,
      error: err.message || 'unknown',
      updated_at: new Date().toISOString()
    })
    if (failErr) console.error('[analyze-v2] fail upsert error:', failErr.message)
  }
}
