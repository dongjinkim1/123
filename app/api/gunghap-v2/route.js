import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

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

    // userId 필수 + UUID 검증 (Stage 2A)
    if (!userId) {
      return Response.json({ error: '로그인이 필요합니다.' }, { status: 401 })
    }
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) {
      return Response.json({ error: 'Invalid userId' }, { status: 400 })
    }

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
        type: 'gunghap',
        description: '궁합 분석',
      })
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
