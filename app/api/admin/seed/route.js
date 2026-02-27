import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ') || !validateToken(authHeader.replace('Bearer ', ''))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    const supabase = getServiceSupabase()

    const testUsers = [
      { nickname: '테스트유저1', email: 'test1@test.com', kakao_id: 'test_kakao_1', clover_balance: 50, role: 'user', is_blocked: false },
      { nickname: '테스트유저2', email: 'test2@test.com', kakao_id: 'test_kakao_2', clover_balance: 100, role: 'user', is_blocked: true },
      { nickname: '관리자테스트', email: 'admin@test.com', kakao_id: 'test_kakao_3', clover_balance: 200, role: 'admin', is_blocked: false }
    ]

    let created = 0
    let skipped = 0

    for (const user of testUsers) {
      // 이미 존재하는지 확인
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('kakao_id', user.kakao_id)
        .maybeSingle()

      if (existing) {
        skipped++
        continue
      }

      // 유저 생성
      const { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert({
          nickname: user.nickname,
          email: user.email,
          kakao_id: user.kakao_id,
          clover_balance: user.clover_balance,
          role: user.role,
          is_blocked: user.is_blocked
        })
        .select('id')
        .single()

      if (insertErr) {
        console.error('[seed] 유저 생성 실패:', user.nickname, insertErr)
        continue
      }

      // clover_history에 signup_bonus 기록
      if (newUser) {
        try {
          await supabase.from('clover_history').insert({
            user_id: newUser.id,
            type: 'signup_bonus',
            amount: user.clover_balance,
            memo: '테스트 시드 가입 보너스'
          })
        } catch (cloverErr) {
          console.warn('[seed] 클로버 기록 실패:', cloverErr)
        }
      }

      created++
    }

    // admin_logs에 기록
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '테스트 시드 데이터 생성: ' + created + '명 생성, ' + skipped + '명 스킵'
      })
    } catch (logErr) {
      console.warn('[seed] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true, created, skipped })
  } catch (error) {
    console.error('[admin/seed] 에러:', error)
    return Response.json({ error: '서버 에러: ' + error.message }, { status: 500 })
  }
}
