import Anthropic from '@anthropic-ai/sdk'
import { createHash } from 'crypto'
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
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const trustedIp = vercelIp || realIp || 'unknown'
    const identifier = userId || trustedIp
    const { allowed, retryAfter } = await rl.checkRateLimit(supabase, identifier, 'gunghap', 60000, 5)
    if (!allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter }, { status: 429 })
    }

    // Stage 2B — 서버측 atomic 차감 (optimistic concurrency)
    // 김동진 TEST BYPASS 유지 (테스트 편의). 런칭 직전 별도 제거 예정.
    // ── 캐시 + dedupe (analyze-v2 동일) ──
    const cacheUser = userId || 'guest'
    const inputKey = JSON.stringify({
      u: cacheUser,
      a: { y:paramsA.y, m:paramsA.m, d:paramsA.d, h:paramsA.h||null, min:paramsA.min||null, gender:paramsA.gender, mbtiType:paramsA.mbtiType, mbtiAxes:paramsA.mbtiAxes||null },
      b: { y:paramsB.y, m:paramsB.m, d:paramsB.d, h:paramsB.h||null, min:paramsB.min||null, gender:paramsB.gender, mbtiType:paramsB.mbtiType, mbtiAxes:paramsB.mbtiAxes||null },
      rel: relType
    })
    const inputHash = createHash('sha256').update(inputKey).digest('hex').slice(0, 32)

    // dedupe: 동일 입력 30초 이내 처리 중이면 기존 jobId 반환
    const since5m = new Date(Date.now() - 5*60*1000).toISOString()
    const { data: pending } = await supabase
      .from('analysis_jobs')
      .select('id, status')
      .eq('input_hash', inputHash)
      .in('status', ['processing','pending'])
      .gte("created_at", since5m)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (pending && pending.id) {
      console.log('[gunghap-v2] dedupe hit — returning existing jobId:', pending.id)
      return Response.json({ jobId: pending.id, status: 'created', dedup: true })
    }

    // cache: 동일 입력 7일 이내 완료 결과 있으면 반환
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
      console.log('[gunghap-v2] cache hit:', inputHash)
      return Response.json({ jobId: cached.id, status: 'done', result: cached.result, cached: true })
    }

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
        // 충돌 — 최대 3회 재시도
        let retrySuccess = false
        let retryBalance = null
        for (let attempt = 0; attempt < 3; attempt++) {
          const { data: uR } = await supabase.from('users').select('clover_balance').eq('id', userId).maybeSingle()
          if (!uR) return Response.json({ error: 'User not found' }, { status: 404 })
          const cbR = uR.clover_balance || 0
          if (cbR < COST) return Response.json({ error: '클로버 부족', balance: cbR }, { status: 402 })
          const nbR = cbR - COST
          const { data: updR, error: errR } = await supabase
            .from('users')
            .update({ clover_balance: nbR })
            .eq('id', userId)
            .eq('clover_balance', cbR)
            .select('clover_balance')
            .maybeSingle()
          if (!errR && updR) {
            retryBalance = updR.clover_balance
            retrySuccess = true
            break
          }
        }
        if (!retrySuccess) {
          return Response.json({ error: 'Charge conflict — retry', code: 'race' }, { status: 409 })
        }
        finalBalance = retryBalance
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
      input_hash: inputHash,
      updated_at: new Date().toISOString()
    })

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    console.log('[gunghap-v2] job created:', jobId)
    waitUntil(processJob(jobId, prompts, inputParams, ai, gp))

    return Response.json({ jobId, status: 'created' })

  } catch (err) {
    console.error('[gunghap-v2] error:', err.message)
    return Response.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}

async function processJob(jobId, prompts, inputParams, ai, gp) {
  const supabase = getServiceSupabase()

  try {
    // 관계별 소주제명 동적 추출 (progressive rendering용)
    const relType = inputParams.relType || 'ssom'
    const relConfig = gp.GH_REL_CONFIG[relType]
    const SUB_TITLES = relConfig ? relConfig.subs.map(s => s.h) : []

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
      temperature: 0.5,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: prompts.userPrompt }]
    })

    let fullText = ''
    let detectedCount = 0
    const detectedSubs = []
    let partialUpdateChain = Promise.resolve()

    stream.on('text', (text) => {
      fullText += text

      if (SUB_TITLES.length > 0 && detectedCount < SUB_TITLES.length) {
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
              let nextStart = -1
              const hPos1 = fullText.lastIndexOf('{"h"', nmPos)
              const hPos2 = fullText.lastIndexOf('{"h": ', nmPos)
              const hPos3 = fullText.lastIndexOf('{"h":"', nmPos)
              nextStart = Math.max(hPos1, hPos2, hPos3)
              if (nextStart < 0) nextStart = fullText.lastIndexOf('{', nmPos)
              if (prevStart >= 0 && nextStart > prevStart) {
                let subText = fullText.substring(prevStart, nextStart).replace(/,\s*$/, '')
                const boundaryIdx = subText.search(/\]\s*\}/)
                if (boundaryIdx >= 0) subText = subText.substring(0, boundaryIdx).replace(/[,\s]+$/, '')
                try {
                  const subObj = JSON.parse(subText)
                  detectedSubs.push(subObj)
                  const snapshot = detectedSubs.slice()
                  const progress = Math.round(snapshot.length / SUB_TITLES.length * 100)
                  partialUpdateChain = partialUpdateChain.then(function() {
                    return supabase.from('analysis_jobs').update({
                      partial_subs: snapshot,
                      progress: progress
                    }).eq('id', jobId)
                  }).catch(function(e) { console.error('[gunghap-v2] partial update error:', e.message) })
                } catch (e) { /* partial parse fail — skip */ }
              }
              detectedCount = nextIdx
            }
          }
        }
      }
    })

    const finalMessage = await stream.finalMessage()
    await partialUpdateChain
    fullText = finalMessage.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    console.log('[gunghap-v2] Claude done:', fullText.length, 'chars, subs detected:', detectedSubs.length)

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

    // ── 클로버 환불 (분석 실패) ──
    if (inputParams.userId) {
      try {
        const { data: refundUser } = await supabase
          .from('users')
          .select('clover_balance, nickname')
          .eq('id', inputParams.userId)
          .maybeSingle()
        if (refundUser && refundUser.nickname !== '김동진') {
          const refundBalance = (refundUser.clover_balance || 0) + 15
          await supabase.from('users')
            .update({ clover_balance: refundBalance })
            .eq('id', inputParams.userId)
          await supabase.from('clover_history').insert({
            user_id: inputParams.userId,
            amount: 15,
            balance_after: refundBalance,
            type: 'refund',
            description: '분석 실패 자동 환불'
          })
          console.log('[환불] 분석 실패 클로버 환불:', inputParams.userId, '+15')
        }
      } catch(refundErr) {
        console.error('[환불] 환불 처리 실패:', refundErr.message)
      }
    }

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
