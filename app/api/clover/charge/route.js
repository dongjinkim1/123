import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var body = await request.json()
    var userId = body.userId
    var amount = body.amount || 0
    var price = body.price || 0
    var paymentMethod = body.paymentMethod || 'test'

    if (!userId || amount <= 0) {
      return Response.json({ error: 'userId, amount 필요' }, { status: 400 })
    }

    // ============================================
    // TODO: 실결제 검증 (토스/카카오페이 결제 승인 확인)
    // paymentMethod === 'test' → 테스트 모드, 바로 충전
    // paymentMethod === 'toss' → 토스 결제 승인 검증
    // paymentMethod === 'kakao' → 카카오페이 결제 승인 검증
    // ============================================

    var supabase = getServiceSupabase()

    // 현재 잔액
    var userRes = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .single()

    if (!userRes.data) {
      return Response.json({ error: '유저 없음' }, { status: 404 })
    }

    var currentBalance = userRes.data.clover_balance || 0
    var newBalance = currentBalance + amount

    // 잔액 업데이트
    await supabase
      .from('users')
      .update({ clover_balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', userId)

    // 내역 기록
    await supabase
      .from('clover_history')
      .insert({
        user_id: userId,
        amount: amount,
        balance_after: newBalance,
        type: 'charge',
        description: '클로버 충전 (' + paymentMethod + ') ' + amount + '잎 / ₩' + price
      })

    return Response.json({ success: true, newBalance: newBalance })
  } catch (e) {
    console.error('[clover/charge] error:', e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}
