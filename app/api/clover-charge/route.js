import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var host = request.headers.get('host') || ''
    var isDev = host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.includes('.local')
    if (!isDev) {
      return Response.json(
        { error: '결제 시스템 준비 중이에요. 곧 이용 가능합니다.' },
        { status: 503 }
      )
    }

    var { userId, amount, price } = await request.json()

    if (!userId || !amount) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

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
