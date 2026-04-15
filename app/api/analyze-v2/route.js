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

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 30000,
      temperature: 0.6,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: prompts.userPrompt }]
    })

    const finalMessage = await stream.finalMessage()
    const fullText = finalMessage.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    console.log('[analyze-v2] Claude done:', fullText.length, 'chars')

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

    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: 'failed',
      params: inputParams,
      error: err.message || 'unknown',
      updated_at: new Date().toISOString()
    }).catch(() => {})
  }
}
