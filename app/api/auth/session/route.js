import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function GET(request) {
  try {
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ valid: false, error: '유저 ID 필요' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // 유저 존재 확인
    var { data: user, error: userErr } = await supabase
      .from('users')
      .select('id, nickname, provider')
      .eq('id', userId)
      .single()

    if (userErr || !user) {
      return Response.json({ valid: false, error: '유저 없음' }, { status: 404 })
    }

    // 클로버 잔액 계산
    var cloverBalance = 0
    var { data: cloverData } = await supabase
      .from('clover_history')
      .select('amount')
      .eq('user_id', userId)

    if (cloverData) {
      for (var i = 0; i < cloverData.length; i++) {
        cloverBalance += cloverData[i].amount
      }
    }

    return Response.json({
      valid: true,
      user_id: user.id,
      nickname: user.nickname,
      provider: user.provider,
      clover_balance: cloverBalance
    })

  } catch (error) {
    logError('auth', error.message, { endpoint: '/api/auth/session' })
    console.error('[auth/session] 에러:', error)
    return Response.json({ valid: false, error: error.message }, { status: 500 })
  }
}
