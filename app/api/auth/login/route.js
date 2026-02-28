import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var provider = body.provider

    if (provider === 'test') {
      // 테스트 유저 조회
      var { data: existing } = await supabase
        .from('users')
        .select('id, nickname, clover_balance')
        .eq('nickname', '테스트유저')
        .eq('email', 'test@mbts.app')
        .maybeSingle()

      if (existing) {
        return Response.json({
          success: true,
          user_id: existing.id,
          nickname: existing.nickname,
          clover_balance: existing.clover_balance,
          provider: 'test'
        })
      }

      // 새로 생성
      var { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert({
          nickname: '테스트유저',
          email: 'test@mbts.app',
          clover_balance: 50,
          role: 'user'
        })
        .select('id, nickname, clover_balance')
        .single()

      if (insertErr) {
        return Response.json({ success: false, error: insertErr.message }, { status: 500 })
      }

      return Response.json({
        success: true,
        user_id: newUser.id,
        nickname: newUser.nickname,
        clover_balance: newUser.clover_balance,
        provider: 'test'
      })

    } else if (provider === 'kakao') {
      var accessToken = body.access_token
      if (!accessToken) {
        return Response.json({ success: false, error: 'access_token 필요' }, { status: 400 })
      }

      // 카카오 사용자 정보 조회
      var kakaoRes = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      })

      if (!kakaoRes.ok) {
        return Response.json({ success: false, error: '카카오 인증 실패' }, { status: 401 })
      }

      var kakaoData = await kakaoRes.json()
      var kakaoId = String(kakaoData.id)
      var kakaoNickname = (kakaoData.kakao_account && kakaoData.kakao_account.profile && kakaoData.kakao_account.profile.nickname) || '카카오유저'
      var kakaoImage = (kakaoData.kakao_account && kakaoData.kakao_account.profile && kakaoData.kakao_account.profile.profile_image_url) || ''
      var kakaoEmail = (kakaoData.kakao_account && kakaoData.kakao_account.email) || ''

      // 기존 유저 검색
      var { data: kakaoUser } = await supabase
        .from('users')
        .select('id, nickname, clover_balance, profile_image')
        .eq('kakao_id', kakaoId)
        .maybeSingle()

      if (kakaoUser) {
        // 기존 유저: 닉네임, 프사 업데이트
        await supabase
          .from('users')
          .update({ nickname: kakaoNickname, profile_image: kakaoImage })
          .eq('id', kakaoUser.id)

        return Response.json({
          success: true,
          user_id: kakaoUser.id,
          nickname: kakaoNickname,
          clover_balance: kakaoUser.clover_balance,
          provider: 'kakao',
          profile_image: kakaoImage
        })
      }

      // 신규 생성
      var { data: newKakao, error: kakaoInsertErr } = await supabase
        .from('users')
        .insert({
          kakao_id: kakaoId,
          nickname: kakaoNickname,
          profile_image: kakaoImage,
          email: kakaoEmail,
          clover_balance: 50
        })
        .select('id, nickname, clover_balance')
        .single()

      if (kakaoInsertErr) {
        return Response.json({ success: false, error: kakaoInsertErr.message }, { status: 500 })
      }

      // 가입 보너스 기록
      await supabase.from('clover_history').insert({
        user_id: newKakao.id,
        amount: 50,
        balance_after: 50,
        type: 'signup_bonus',
        description: '가입 축하 보너스'
      })

      return Response.json({
        success: true,
        user_id: newKakao.id,
        nickname: newKakao.nickname,
        clover_balance: newKakao.clover_balance,
        provider: 'kakao',
        profile_image: kakaoImage
      })

    } else {
      return Response.json({ success: false, error: '지원하지 않는 provider' }, { status: 400 })
    }

  } catch (error) {
    logError('auth', error.message, { endpoint: '/api/auth/login' })
    console.error('[auth/login] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
