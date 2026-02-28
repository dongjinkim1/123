import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var page = body.page || '/'
    var referrer = body.referrer || 'direct'

    // UA에서 디바이스 판별
    var ua = request.headers.get('user-agent') || ''
    var device = 'desktop'
    if (/mobile|android|iphone/i.test(ua)) {
      device = 'mobile'
    } else if (/tablet|ipad/i.test(ua)) {
      device = 'tablet'
    }

    await supabase.from('visitor_logs').insert({
      page: page,
      referrer: referrer,
      device: device
    })

    return Response.json({ success: true })

  } catch (e) {
    // 추적 실패가 앱을 막으면 안 됨
    return Response.json({ success: true })
  }
}
