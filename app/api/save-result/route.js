import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId || null
    var type = body.type
    var data = body.data || {}

    // Rate limiting (60s / 20 req per identifier) — analyze-v2 와 동일 패턴
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'save-result', 60000, 20)
    if (!rlResult.allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    if (type === 'saju') {
      var { data: result, error: insertErr } = await supabase
        .from('saju_results')
        .insert({
          user_id: userId,
          payload: data
        })
        .select('id')
        .single()

      if (insertErr) {
        return Response.json({ success: false, error: insertErr.message }, { status: 500 })
      }

      return Response.json({ success: true, id: result.id })

    } else if (type === 'gunghap') {
      var { data: ghResult, error: ghErr } = await supabase
        .from('gunghap_results')
        .insert({
          user_id: userId,
          payload: data
        })
        .select('id')
        .single()

      if (ghErr) {
        return Response.json({ success: false, error: ghErr.message }, { status: 500 })
      }

      return Response.json({ success: true, id: ghResult.id })

    } else {
      return Response.json({ success: false, error: '지원하지 않는 type' }, { status: 400 })
    }

  } catch (error) {
    logError('save-result', error.message, { endpoint: '/api/save-result' })
    console.error('[save-result] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
