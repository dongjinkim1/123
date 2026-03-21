import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var { kakaoId, nickname, profileImage, email } = await request.json()

    if (!kakaoId) {
      return Response.json({ error: 'Missing kakaoId' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    // 기존 유저 조회
    var { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('kakao_id', kakaoId)
      .maybeSingle()

    if (fetchError) {
      return Response.json({ error: 'DB query failed' }, { status: 500 })
    }

    if (existingUser) {
      // 기존 유저 — 닉네임/프로필 업데이트
      await supabase
        .from('users')
        .update({ nickname: nickname || existingUser.nickname, profile_image: profileImage || existingUser.profile_image })
        .eq('id', existingUser.id)

      return Response.json({
        success: true,
        isNew: false,
        user: {
          id: existingUser.id,
          kakaoId: kakaoId,
          nickname: nickname || existingUser.nickname,
          profileImage: profileImage || existingUser.profile_image,
          cloverBalance: existingUser.clover_balance || 0,
        },
      })
    } else {
      // 신규 유저 생성 (클로버 50개 보너스)
      var { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          kakao_id: kakaoId,
          nickname: nickname || '사용자',
          profile_image: profileImage || null,
          email: email || null,
          clover_balance: 50,
          role: 'user',
        })
        .select()
        .single()

      if (insertError || !newUser) {
        return Response.json({ error: 'User creation failed', detail: insertError?.message }, { status: 500 })
      }

      // 가입 보너스 내역 기록
      await supabase.from('clover_history').insert({
        user_id: newUser.id,
        amount: 50,
        balance_after: 50,
        type: 'signup_bonus',
        description: '🎉 가입 축하 보너스',
      })

      console.log('[auth-kakao] New user created:', nickname, 'id:', newUser.id)

      return Response.json({
        success: true,
        isNew: true,
        user: {
          id: newUser.id,
          kakaoId: kakaoId,
          nickname: nickname || '사용자',
          profileImage: profileImage || null,
          cloverBalance: 50,
        },
      })
    }
  } catch (err) {
    console.error('[auth-kakao] Error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
