import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var body = await request.json()
    var page = body.page || '/'
    var referrer = body.referrer || ''

    var supabase = getServiceSupabase()

    // user-agent, ip 추출
    var userAgent = request.headers.get('user-agent') || ''
    var ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || ''
    if (ip.indexOf(',') !== -1) {
      ip = ip.split(',')[0].trim()
    }

    await supabase.from('visitor_logs').insert({
      page: page,
      referrer: referrer,
      user_agent: userAgent,
      ip_address: ip
    })

    return Response.json({ success: true })
  } catch (e) {
    logError('other', e.message, { endpoint: '/api/visitor/track' })
    return Response.json({ success: false }, { status: 500 })
  }
}
