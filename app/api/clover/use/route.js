import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var body = await request.json()
    var userId = body.userId
    var amount = body.amount || 1
    var type = body.type || 'saju'
    var description = body.description || '서비스 이용'

    if (!userId) {
      return Response.json({ error: 'userId 필요' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // 현재 잔액 확인
    var userRes = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .single()

    if (!userRes.data) {
      return Response.json({ error: '유저 없음' }, { status: 404 })
    }

    var currentBalance = userRes.data.clover_balance || 0
    if (currentBalance < amount) {
      return Response.json({ error: '잔액 부족', insufficient: true, balance: currentBalance }, { status: 400 })
    }

    var newBalance = currentBalance - amount

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
        amount: -amount,
        balance_after: newBalance,
        type: type,
        description: description
      })

    return Response.json({ success: true, newBalance: newBalance })
  } catch (e) {
    console.error('[clover/use] error:', e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}
