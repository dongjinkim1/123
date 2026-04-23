import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

// 유저 본인의 saju_results 조회 (RLS 활성화 대비 — service_role 경유)
// 응답: { success, rows: [{id, payload, created_at, mbti, ilju, name, is_my_profile}] }

export async function GET(request) {
  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ success: false, error: 'userId는 필수입니다' }, { status: 400 })
    }

    // Rate limiting (60s / 60req) — 조회는 많을 수 있어 상한 여유
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'my-saju-results', 60000, 60)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    var { data, error } = await supabase
      .from('saju_results')
      .select('id, payload, created_at, mbti, ilju, name, is_my_profile')
      .eq('user_id', userId)
      .not('payload', 'is', null)
      .order('created_at', { ascending: true })

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, rows: data || [] })

  } catch (error) {
    logError('my-saju-results', error.message, { endpoint: '/api/my-saju-results' })
    console.error('[my-saju-results] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
