import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

// 유저 프로필 조회 (RLS 활성화 대비 — service_role 경유)
// 민감 필드 (role, is_blocked, email, provider, last_login) 제외
// 응답: { success, user: {id, mbti, animal_key, ilju, birth_*, gender, nickname, clover_balance, kakao_id} }

export async function GET(request) {
  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ success: false, error: 'userId는 필수입니다' }, { status: 400 })
    }

    // Rate limiting (60s / 30req)
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'user-profile', 60000, 30)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    var { data, error } = await supabase
      .from('users')
      .select('id, mbti, animal_key, ilju, birth_year, birth_month, birth_day, birth_hour, birth_min, gender, nickname, clover_balance, kakao_id')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 })
    }
    if (!data) {
      return Response.json({ success: false, error: '유저를 찾을 수 없습니다' }, { status: 404 })
    }

    return Response.json({ success: true, user: data })

  } catch (error) {
    logError('user-profile', error.message, { endpoint: '/api/user-profile' })
    console.error('[user-profile] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
