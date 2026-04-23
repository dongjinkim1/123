import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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
    let body
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }) }
    const { y, m, d, h, min, gender, mbtiChoices, mbtiIntensities, cityLng, userId } = body

    // userId 필수 + UUID 형식 검증 (Stage 2A — anonymous 우회 차단)
    if (!userId) {
      return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) {
      return Response.json({ error: 'Invalid userId' }, { status: 400 })
    }

    const { pb, ai, val, rl } = await getModules()
    const supabase = getServiceSupabase()

    // input validation (strengthened)
    const validationError = val.validateInput({ y, m, d, h, min, gender, mbtiChoices, mbtiIntensities })
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    // rate limiting — prefer userId; fall back to IP from TRUSTED proxy only (M4).
    // In Vercel runtime, 'x-vercel-forwarded-for' is trusted; 'x-forwarded-for' can be spoofed from other infra.
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const trustedIp = vercelIp || realIp || 'unknown'
    const identifier = userId || trustedIp
    const { allowed, retryAfter } = await rl.checkRateLimit(supabase, identifier, 'analyze', 60000, 5)
    if (!allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter }, { status: 429 })
    }

    // Stage 2B — 서버측 atomic 차감 (optimistic concurrency)
    // 김동진 TEST BYPASS 유지 (테스트 편의). 런칭 직전 별도 제거 예정.
    const COST = 15

    const { data: userRow, error: userFetchErr } = await supabase
      .from('users')
      .select('clover_balance, nickname')
      .eq('id', userId)
      .maybeSingle()

    if (userFetchErr || !userRow) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const isTestUser = userRow.nickname === '김동진'
    const currentBalance = userRow.clover_balance || 0

    if (!isTestUser) {
      if (currentBalance < COST) {
        return Response.json({ error: '클로버 부족', balance: currentBalance }, { status: 402 })
      }

      // atomic 차감: balance = current - COST WHERE balance = current (조건부)
      const newBalance = currentBalance - COST
      const { data: updated, error: updErr } = await supabase
        .from('users')
        .update({ clover_balance: newBalance })
        .eq('id', userId)
        .eq('clover_balance', currentBalance)
        .select('clover_balance')
        .maybeSingle()

      let finalBalance = null
      if (updErr || !updated) {
        // 충돌 — 1회 재시도
        const { data: u2 } = await supabase.from('users').select('clover_balance').eq('id', userId).maybeSingle()
        if (!u2) return Response.json({ error: 'User not found' }, { status: 404 })
        const cb2 = u2.clover_balance || 0
        if (cb2 < COST) {
          return Response.json({ error: '클로버 부족', balance: cb2 }, { status: 402 })
        }
        const nb2 = cb2 - COST
        const { data: updated2, error: retryErr } = await supabase
          .from('users')
          .update({ clover_balance: nb2 })
          .eq('id', userId)
          .eq('clover_balance', cb2)
          .select('clover_balance')
          .maybeSingle()
        if (retryErr || !updated2) {
          return Response.json({ error: 'Charge conflict — retry', code: 'race' }, { status: 409 })
        }
        finalBalance = updated2.clover_balance
      } else {
        finalBalance = updated.clover_balance
      }

      // 차감 내역 기록
      await supabase.from('clover_history').insert({
        user_id: userId,
        amount: -COST,
        balance_after: finalBalance,
        type: 'saju',
        description: '사주 분석',
      })
    }

    // result caching — same input within 7 days returns cached result
    // M6: include userId in the hash so users never read each other's job rows.
    // Guest (no userId) cache is still shared but scoped under 'guest'.
    const cacheUser = userId || 'guest'
    const inputKey = JSON.stringify({u:cacheUser,y:+y,m:+m,d:+d,h:h?+h:null,min:min?+min:null,gender,mbtiChoices,mbtiIntensities:mbtiIntensities||[60,60,60,60]})
    const inputHash = createHash('sha256').update(inputKey).digest('hex').slice(0, 32)

    // M9: dedupe concurrent requests — same inputHash already processing in last 30s
    const since30s = new Date(Date.now() - 30*1000).toISOString()
    const { data: pending } = await supabase
      .from('analysis_jobs')
      .select('id, status')
      .eq('input_hash', inputHash)
      .in('status', ['processing','pending'])
      .gte('created_at', since30s)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (pending && pending.id) {
      console.log('[analyze-v2] dedupe hit — returning existing jobId:', pending.id)
      return Response.json({ jobId: pending.id, status: 'created', dedup: true })
    }

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

    if (!prompts || !prompts.systemPrompt || !prompts.userPrompt) {
      return Response.json({ error: 'Prompt build failed' }, { status: 500 })
    }

    console.log('[analyze-v2] prompts built: sys=%d usr=%d',
      prompts.systemPrompt.length, prompts.userPrompt.length)

    // create job
    const jobId = crypto.randomUUID()
    const inputParams = {
      type: 'saju', y, m, d, h, min,
      gender, mbtiChoices, mbtiIntensities, cityLng,
      userId: userId || null // M7: store owner for job-status ownership check
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
    // serialize partial updates to prevent races with the final upsert
    let partialUpdateChain = Promise.resolve()

    stream.on('text', (text) => {
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
              // Bug 2 fix: find the {"h"...} brace (skip category {"id":...} boundary)
              let nextStart = -1
              const hPos1 = fullText.lastIndexOf('{"h"', nmPos)
              const hPos2 = fullText.lastIndexOf('{"h": ', nmPos)
              const hPos3 = fullText.lastIndexOf('{"h":"', nmPos)
              nextStart = Math.max(hPos1, hPos2, hPos3)
              if (nextStart < 0) nextStart = fullText.lastIndexOf('{', nmPos)
              if (prevStart >= 0 && nextStart > prevStart) {
                let subText = fullText.substring(prevStart, nextStart).replace(/,\s*$/, '')
                // Bug 2 fix: trim category boundary artifacts e.g. "}]}, {\"id\":\"love\"..."
                // subText might already end with the sub's closing "}" before the "]}" — cut at "]" and strip trailing comma/whitespace.
                const boundaryIdx = subText.search(/\]\s*\}/)
                if (boundaryIdx >= 0) subText = subText.substring(0, boundaryIdx).replace(/[,\s]+$/, '')
                try {
                  const subObj = JSON.parse(subText)
                  detectedSubs.push(subObj)
                  // queue partial update (serialized) to avoid races with final upsert
                  const snapshot = detectedSubs.slice()
                  const progress = Math.round(snapshot.length / SUB_TITLES.length * 100)
                  partialUpdateChain = partialUpdateChain.then(function() {
                    return supabase.from('analysis_jobs').update({
                      partial_subs: snapshot,
                      progress: progress
                    }).eq('id', jobId)
                  }).catch(function(e) { console.error('[analyze-v2] partial update error:', e.message) })
                } catch (e) { /* partial parse fail — skip */ }
              }
              detectedCount = nextIdx
            }
          }
        }
      }
    })

    const finalMessage = await stream.finalMessage()
    // wait for all partial updates to settle before writing the final row
    await partialUpdateChain
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
      