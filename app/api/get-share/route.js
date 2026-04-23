import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

// 공유 링크 조회 (anon 공개 접근 허용, service_role 경유로 RLS 우회)
// query: ?code=<share_code>
// 응답: legacy shape 변환해서 제공 → MBTSShare.render 호환
//   { success, data: { result_type, render_data, ai_result, saju_summary,
//     mbti, animal_emoji, animal_title, animal_desc, share_image_url, nickname } }

export async function GET(request) {
  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var code = url.searchParams.get('code')

    if (!code) {
      return Response.json({ success: false, error: 'code는 필수입니다' }, { status: 400 })
    }
    if (!/^[a-z0-9]{4,16}$/i.test(code)) {
      return Response.json({ success: false, error: 'code 형식 오류' }, { status: 400 })
    }

    // Rate limiting (60s / 60req) — 공유 링크 대량 조회 대비
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'get-share', 60000, 60)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    var { data, error } = await supabase
      .from('shared_results')
      .select('*')
      .eq('share_code', code)
      .maybeSingle()

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 })
    }
    if (!data) {
      return Response.json({ success: false, error: '공유 링크를 찾을 수 없습니다' }, { status: 404 })
    }

    // Gen 3 payload 기반으로 저장된 경우 → legacy shape 으로 변환
    // 레거시 필드 직접 저장된 row 도 호환 (Hand 가 MBTS 구에 어떤 DDL 로 만들었든)
    var payload = data.payload || {}
    var preview = payload.preview || {}

    var legacy = {
      result_type: payload.type || data.result_type || 'premium',
      render_data: payload.renderData || data.render_data || null,
      ai_result: data.ai_result || {},
      saju_summary: data.saju_summary || {},
      mbti: preview.mbti || payload.mbti || data.mbti || '',
      animal_emoji: preview.emoji || payload.animal_emoji || data.animal_emoji || '',
      animal_title: preview.title || payload.animal_title || data.animal_title || '',
      animal_desc: preview.desc || payload.animal_desc || data.animal_desc || '',
      share_image_url: preview.image || payload.share_image_url || data.share_image_url || '',
      nickname: payload.nickname || data.nickname || '',
      animal_traits: data.animal_traits || [],
      animal_rx: data.animal_rx || '',
      animal_tag: data.animal_tag || '',
      animal_key: data.animal_key || '',
      oheng: data.oheng || ''
    }

    return Response.json({ success: true, data: legacy })

  } catch (error) {
    logError('get-share', error.message, { endpoint: '/api/get-share' })
    console.error('[get-share] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
