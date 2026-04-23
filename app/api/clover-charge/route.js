import { getServiceSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limiter'

// NOTE: C7 hardening (no session auth / no payment verification yet — see TIER 2 report).
// Defense-in-depth:
//   - strict UUID / amount validation
//   - amount cap (≤ 5000 leaves per charge call)
//   - per-userId rate limit (5 req/min) — prevents double-click duplication
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request) {
  try {
    // C9 서버측 가드: 결제 검증 연동 전까지 프로덕션에서 비활성화.
    // 프론트 payment.js 의 C9 가드와 대칭. 실결제 (토스/카카오페이) 붙일 때 이 블록 제거.
    const host = request.headers.get('host') || ''
    const isDev = host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.includes('.local')
    if (!isDev) {
      return Response.json(
        { error: '결제 시스템 준비 중이에요. 곧 이용 가능합니다.' },
        { status: 503 }
      )
    }

    var body
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }
    var { userId, amount, price } = body

    if (!userId || !amount) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) {
      return Response.json({ error: 'Invalid userId' }, { status: 400 })
    }
    amount = +amount
    if (!Number.isFinite(amount) || amount <= 0 || amount > 5000 || !Number.isInteger(amount)) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // rate limit per userId — 5 charge calls per minute
    var rl = await checkRateLimit(supabase, userId, 'clover-charge', 60000, 5)
    if (!rl.allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter: rl.retryAfter }, { status: 429 })
    }

    // 유저 최신 잔액 조회
    var { data: user, error: fetchError } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .maybeSingle()

    if (fetchError || !user) {
      return Response.json({ error: 'User not found', balance: 0 })
    }

    var currentBalance = user.clover_balance || 0
    var newBalance = currentBalance + amount

    // Optimistic concurrency control — C8 race mitigation.
    // Conditional update: only succeeds if balance hasn't changed since read.
    var { data: updated, error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId)
      .eq('clover_balance', currentBalance)
      .select('clover_balance')
      .maybeSingle()

    if (updateError || !updated) {
      // Conflict — retry once with fresh balance
      var { data: user2 } = await supabase.from('users').select('clover_balance').eq('id', userId).maybeSingle()
      if (!user2) return Response.json({ error: 'User not found' }, { status: 404 })
      var currentBalance2 = user2.clover_balance || 0
      var newBalance2 = currentBalance2 + amount
      var { data: updated2, error: retryErr } = await supabase
        .from('users')
        .update({ clover_balance: newBalance2 })
        .eq('id', userId)
        .eq('clover_balance', currentBalance2)
        .select('clover_balance')
        .maybeSingle()
      if (retryErr || !updated2) {
        return Response.json({ error: 'Charge conflict — retry', code: 'race' }, { status: 409 })
      }
      newBalance = newBalance2
    }

    // 충전 내역 기록
    var priceLabel = price ? ' (₩' + Number(price).toLocaleString() + ')' : ''
    await supabase.from('clover_history').insert({
      user_id: userId,
      amount: amount,
      balance_after: newBalance,
      type: 'charge',
      description: '🍀 ' + amount + '잎 충전' + priceLabel,
    })

    console.log('[clover-charge] userId:', userId, '+' + amount, 'balance:', newBalance)

    return Response.json({ success: true, balance: newBalance })
  } catch (err) {
    console.error('[clover-charge] Error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
