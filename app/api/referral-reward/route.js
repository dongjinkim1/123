import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var { referrerId, newUserId } = await request.json()

    if (!referrerId || !newUserId) {
      return Response.json({ error: 'Missing parameters' }, { status: 400 })
    }

    // 자기 자신 추천 방지
    if (referrerId === newUserId) {
      return Response.json({ error: 'Self referral' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // 추천인 존재 확인 + 잔액 조회
    var { data: referrer, error: fetchError } = await supabase
      .from('users')
      .select('id, clover_balance, nickname')
      .eq('id', referrerId)
      .maybeSingle()

    if (fetchError || !referrer) {
      return Response.json({ error: 'Referrer not found', success: false })
    }

    // 추천인에게 클로버 2잎 지급
    var REWARD = 2
    var newBalance = (referrer.clover_balance || 0) + REWARD

    var { error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', referrerId)

    if (updateError) {
      return Response.json({ error: 'Failed to reward referrer' }, { status: 500 })
    }

    // 내역 기록
    await supabase.from('clover_history').insert({
      user_id: referrerId,
      amount: REWARD,
      balance_after: newBalance,
      type: 'referral',
      description: '🎁 친구 초대 보상',
    })

    // B(신규유저)에게도 2잎 지급
    var { data: newUser } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', newUserId)
      .maybeSingle()

    if (newUser) {
      var newUserBalance = (newUser.clover_balance || 0) + REWARD
      await supabase
        .from('users')
        .update({ clover_balance: newUserBalance })
        .eq('id', newUserId)

      await supabase.from('clover_history').insert({
        user_id: newUserId,
        amount: REWARD,
        balance_after: newUserBalance,
        type: 'referral_bonus',
        description: '🎁 초대받기 보너스',
      })
    }

    console.log('[referral] ' + referrerId + ' rewarded ' + REWARD + ' clovers')

    return Response.json({ success: true, reward: REWARD })
  } catch (err) {
    console.error('[referral-reward] Error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
