import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

// CJS modules -- dynamic import
let _gp = null
let _ai = null
let _val = null
let _rl = null
async function getModules() {
  if (!_gp) {
    const gpMod = await import('@/lib/gunghap-prompt.js')
    _gp = gpMod.default || gpMod
    const aiMod = await import('@/lib/ai-client.js')
    _ai = aiMod.default || aiMod
    const valMod = await import('@/lib/validators.js')
    _val = valMod.default || valMod
    const rlMod = await import('@/lib/rate-limiter.js')
    _rl = rlMod.default || rlMod
  }
  return { gp: _gp, ai: _ai, val: _val, rl: _rl }
}

export async function POST(request) {
  console.log('[gunghap-v2] request received')

  try {
    let body
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON body' }, { status: 400 }) }
    const { paramsA, paramsB, relType, userId } = body

    const { gp, ai, val, rl } = await getModules()
    const supabase = getServiceSupabase()

    // input validation (strengthened)
    const validationError = val.validateGunghapInput(paramsA, paramsB, relType)
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 })
    }

    // rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const identifier = userId || ip
    const { allowed, retryAfter } = await rl.checkRateLimit(supabase, identifier, 'gunghap', 60000, 5)
    if (!allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter }, { status: 429 })
    }

    // server-side clover check
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
    const prompts = gp.buildGunghapPrompt(paramsA, paramsB, relType)

    if (!prompts || !prompts.systemPrompt || !prompts.userPrompt) {
      return Response.json({ error: 'Prompt build failed' }, { status: 500 })
    }

    console.log('[gunghap-v2] prompts built: sys=%d usr=%d',
      prompts.systemPrompt.length, prompts.userPrompt.length)

    const jobId = crypto.randomUUID()
    const inputParams = { type: 'gunghap', paramsA, paramsB, relType, userId: userId || null } // M7: owner

    const { error: dbError } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
      status: 'processing',
      params: inputParams,
      updated_at: new Date().toISOString()
    })

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    console.log('[gunghap-v2] job created:', jobId)
    waitUntil(processJob(jobId, prompts, inputParams, ai))

    return Response.json({ jobId, status: 'created' })

  } catch (err) {
    console.error('[gunghap-v2] error:', err.message)
    return Response.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}

async function processJob(jobId, prompts, inputParams, ai) {
  const supabase = getServiceSupabase()

  try {
    const finalSystemPrompt = prompts.systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown, NO comments, NO preamble\n' +
      '5. All string values must use proper JSON escaping\n' +
      '6. Violation = system crash. Comply exactly.'

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

    const isComplete = ai.isValidJSON(fullText)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
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

    if (!isComplete) {
      await logError('gunghap', 'Incomplete AI response', {
        jobId, errorType: 'json_parse', length: fullText.length
      })
    }

  } catch (err) {
    console.error('[gunghap-v2] processJob error:', err.message)

    const errorType = err.message.includes('timeout') || err.message.includes('Timeout') ? 'ai_timeout'
      : err.status === 529 || err.message.includes('overloaded') ? 'ai_overload'
      : 'unknown'

    await logError('gunghap', err.message, { jobId, errorType })

    const { error: failErr } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
      status: 'failed',
      params: inputParams,
      error: err.message || 'unknown',
      updated_at: new Date().toISOString()
    })
    if (failErr) console.error('[gunghap-v2] fail upsert error:', failErr.message)
  }
}
