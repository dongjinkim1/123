import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId
    var amount = body.amount
    var type = body.type || 'use'
    var description = body.description || ''

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
      return Response.json({ success: false, error: '유저를 찾을 수 없습니다', balance: 0 })
    }

    var balance = user.clover_balance || 0

    if (balance < amount) {
      return Response.json({ success: false, insufficient: true, balance: balance })
    }

    var newBalance = balance - amount

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
      amount: -amount,
      balance_after: newBalance,
      type: type,
      description: description
    })

    return Response.json({ success: true, newBalance: newBalance })

  } catch (error) {
    logError('clover', error.message, { endpoint: '/api/clover/use' })
    console.error('[clover/use] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
