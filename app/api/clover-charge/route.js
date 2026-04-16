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

    // 잔액 업데이트
    var { error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId)

    if (updateError) {
      return Response.json({ error: 'Failed to update balance' }, { status: 500 })
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
