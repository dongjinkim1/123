import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var body = await request.json()
    var provider = body.provider || 'test'
    var supabase = getServiceSupabase()

    if (provider === 'test') {
      // 테스트 유저 생성 또는 조회
      var testId = 'test_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
      var nickname = '테스트유저_' + Math.random().toString(36).slice(2, 6)

      // 기존 테스트 유저 쿠키/세션 확인은 클라이언트에서 처리
      // 새 유저 생성
      var { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert({
          id: testId,
          nickname: nickname,
          provider: 'test',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (insertErr) {
        console.error('[auth/login] 유저 생성 실패:', insertErr)
        // 에러 발생해도 ID 기반으로 진행
      }

      // 초기 클로버 지급
      try {
        await supabase.from('clover_history').insert({
          user_id: testId,
          amount: 5,
          reason: '회원가입 보너스',
          created_at: new Date().toISOString()
        })
      } catch (e) {
        console.warn('[auth/login] 클로버 지급 실패:', e)
      }

      return Response.json({
        success: true,
        user_id: testId,
        nickname: nickname,
        provider: 'test',
        clover_balance: 5
      })

    } else if (provider === 'kakao') {
      var accessToken = body.access_token
      if (!accessToken) {
        return Response.json({ error: '카카오 토큰 필요' }, { status: 400 })
      }

      // 카카오 사용자 정보 조회
      var kakaoUser = null
      try {
        var kakaoRes = await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: { 'Authorization': 'Bearer ' + accessToken }
        })
        kakaoUser = await kakaoRes.json()
      } catch (e) {
        console.error('[auth/login] 카카오 API 실패:', e)
        return Response.json({ error: '카카오 인증 실패' }, { status: 401 })
      }

      if (!kakaoUser || !kakaoUser.id) {
        return Response.json({ error: '카카오 사용자 정보 없음' }, { status: 401 })
      }

      var kakaoId = 'kakao_' + kakaoUser.id
      var kakaoNickname = '사용자'
      if (kakaoUser.properties && kakaoUser.properties.nickname) {
        kakaoNickname = kakaoUser.properties.nickname
      } else if (kakaoUser.kakao_account && kakaoUser.kakao_account.profile && kakaoUser.kakao_account.profile.nickname) {
        kakaoNickname = kakaoUser.kakao_account.profile.nickname
      }

      // 기존 유저 조회
      var { data: existing } = await supabase
        .from('users')
        .select('id, nickname')
        .eq('id', kakaoId)
        .single()

      var cloverBalance = 0

      if (existing) {
        // 기존 유저 — 클로버 잔액 조회
        var { data: cloverData } = await supabase
          .from('clover_history')
          .select('amount')
          .eq('user_id', kakaoId)

        if (cloverData) {
          for (var i = 0; i < cloverData.length; i++) {
            cloverBalance += cloverData[i].amount
          }
        }

        return Response.json({
          success: true,
          user_id: kakaoId,
          nickname: existing.nickname || kakaoNickname,
          provider: 'kakao',
          clover_balance: cloverBalance
        })
      } else {
        // 신규 유저 생성
        await supabase.from('users').insert({
          id: kakaoId,
          nickname: kakaoNickname,
          provider: 'kakao',
          created_at: new Date().toISOString()
        })

        // 초기 클로버 지급
        try {
          await supabase.from('clover_history').insert({
            user_id: kakaoId,
            amount: 5,
            reason: '회원가입 보너스',
            created_at: new Date().toISOString()
          })
          cloverBalance = 5
        } catch (e) {
          console.warn('[auth/login] 카카오 유저 클로버 지급 실패:', e)
        }

        return Response.json({
          success: true,
          user_id: kakaoId,
          nickname: kakaoNickname,
          provider: 'kakao',
          clover_balance: cloverBalance
        })
      }

    } else {
      return Response.json({ error: '지원하지 않는 로그인 방식' }, { status: 400 })
    }

  } catch (error) {
    console.error('[auth/login] 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
