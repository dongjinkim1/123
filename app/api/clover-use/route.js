import { getServiceSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limiter'

// NOTE: C6 hardening (no session auth yet — see TIER 2 report).
// Until session-based auth is deployed, we defense-in-depth via:
//   - strict input validation (uuid shape, amount bounds, type whitelist)
//   - per-userId rate limit (20 req/min) — prevents burst draining
//   - positive-amount enforcement
const VALID_TYPES = ['saju', 'gunghap', 'chat']
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request) {
  try {
    var body
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }
    var { userId, amount, type } = body

    if (!userId || !amount || !type) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }
    if (typeof userId !== 'string' || !UUID_RE.test(userId)) {
      return Response.json({ error: 'Invalid userId' }, { status: 400 })
    }
    amount = +amount
    if (!Number.isFinite(amount) || amount <= 0 || amount > 1000 || !Number.isInteger(amount)) {
      return Response.json({ error: 'Invalid amount' }, { status: 400 })
    }
    if (VALID_TYPES.indexOf(type) === -1) {
      return Response.json({ error: 'Invalid type' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // rate limit per userId — 20 calls per minute
    var rl = await checkRateLimit(supabase, userId, 'clover-use', 60000, 20)
    if (!rl.allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter: rl.retryAfter }, { status: 429 })
    }

    // 1. 최신 잔액 조회 (nickname도 가져옴 — TEST BYPASS용)
    var { data: user, error: fetchError } = await supabase
      .from('users')
      .select('clover_balance, nickname')
      .eq('id', userId)
      .maybeSingle()

    if (fetchError || !user) {
      return Response.json({ error: 'User not found', balance: 0 })
    }

    // ⚠️ TEST BYPASS: "김동진" 닉네임은 클로버 차감 면제 + 무한 잔액 반환
    // TODO: production에서 반드시 제거
    if (user.nickname === '김동진') {
      console.log('[clover-use] TEST BYPASS for 김동진 — skipping deduction')
      return Response.json({ success: true, balance: 999, testBypass: true })
    }

    var balance = user.clover_balance || 0

    if (balance < amount) {
      return Response.json({ error: 'Insufficient clover', balance: balance }, { status: 402 })
    }

    var newBalance = balance - amount

    // 2. 잔액 차감
    var { error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId)

    if (updateError) {
      return Response.json({ error: 'Failed to update balance' }, { status: 500 })
    }

    // 3. 내역 기록
    var labels = { saju: '사주', gunghap: '궁합', chat: '달토 채팅' }
    var { error: historyError } = await supabase.from('clover_history').insert({
      user_id: userId,
      amount: -amount,
      balance_after: newBalance,
      type: type,
      description: (labels[type] || '서비스') + ' 분석',
    })
    if (historyError) {
      console.error('[clover-use] history insert error:', historyError)
    }

    return Response.json({ success: true, balance: newBalance })
  } catch (err) {
    console.error('[clover-use] Error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
