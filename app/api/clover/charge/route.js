import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId
    var amount = body.amount
    var price = body.price || 0
    var paymentMethod = body.paymentMethod || 'test'

    if (!userId || !amount || amount <= 0) {
      return Response.json({ success: false, error: 'userId, amount 필요' }, { status: 400 })
    }

    // 현재 잔액 조회
    var { data: user, error: fetchErr } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .single()

    if (fetchErr || !user) {
      return Response.json({ success: false, error: '유저를 찾을 수 없습니다' }, { status: 404 })
    }

    var balance = user.clover_balance || 0
    var newBalance = balance + amount

    // 잔액 업데이트
    var { error: updateErr } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId)

    if (updateErr) {
      return Response.json({ success: false, error: updateErr.message }, { status: 500 })
    }

    // 히스토리 기록
    await supabase.from('clover_history').insert({
      user_id: userId,
      amount: amount,
      balance_after: newBalance,
      type: 'charge',
      description: '클로버 ' + amount + '잎 충전 (테스트)'
    })

    // 결제 기록
    await supabase.from('payments').insert({
      user_id: userId,
      amount: price,
      clover_amount: amount,
      method: paymentMethod,
      status: 'completed'
    })

    return Response.json({ success: true, newBalance: newBalance })

  } catch (error) {
    logError('clover', error.message, { endpoint: '/api/clover/charge' })
    console.error('[clover/charge] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
