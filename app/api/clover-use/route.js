import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var { userId, amount, type } = await request.json()

    if (!userId || !amount || !type) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // 1. 최신 잔액 조회
    var { data: user, error: fetchError } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .maybeSingle()

    if (fetchError || !user) {
      return Response.json({ error: 'User not found', balance: 0 })
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
