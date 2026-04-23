import { createClient } from '@supabase/supabase-js'
import { logError } from '@/lib/errorLog'

export async function GET(request) {
  console.log('[my-results] 요청 시작')

  try {
    // Authorization 헤더에서 Bearer 토큰 추출
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { error: '로그인 필요' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')

    // 토큰으로 Supabase 클라이언트 생성
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    )

    // 유저 확인
    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      console.error('[my-results] 인증 에러:', userError)
      return Response.json(
        { error: '로그인 필요' },
        { status: 401 }
      )
    }

    console.log('[my-results] 유저 확인:', user.id)

    // 사주 결과 조회 (Gen 3: payload jsonb 기반)
    const { data: sajuResults, error: sajuError } = await supabase
      .from('saju_results')
      .select('id, payload, created_at')
      .eq('user_id', user.id)
      .not('payload', 'is', null)
      .order('created_at', { ascending: false })

    if (sajuError) {
      console.error('[my-results] saju_results 조회 에러:', sajuError)
    }

    // 궁합 결과 조회 (Gen 3: payload jsonb 기반)
    const { data: gunghapResults, error: gunghapError } = await supabase
      .from('gunghap_results')
      .select('id, payload, created_at')
      .eq('user_id', user.id)
      .not('payload', 'is', null)
      .order('created_at', { ascending: false })

    if (gunghapError) {
      console.error('[my-results] gunghap_results 조회 에러:', gunghapError)
    }

    console.log('[my-results] 조회 완료 - saju:', sajuResults?.length || 0, ', gunghap:', gunghapResults?.length || 0)

    return Response.json({
      saju: sajuResults || [],
      gunghap: gunghapResults || [],
    })
  } catch (error) {
    logError('other', error.message, { endpoint: '/api/my-results' })
    console.error('[my-results] 서버 에러:', error)
    return Response.json(
      { error: '서버 내부 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}
