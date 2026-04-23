import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  var recordId = null
  var type = null
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = (body.userId === undefined) ? null : body.userId
    type = body.type
    recordId = body.recordId

    if (!type || !recordId) {
      return Response.json({ success: false, error: 'type과 recordId는 필수입니다' }, { status: 400 })
    }

    // Rate limiting (60s / 10 req per identifier) — save-result 와 동일 패턴
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'delete-result', 60000, 10)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    var tableName
    if (type === 'saju') {
      tableName = 'saju_results'
    } else if (type === 'gunghap') {
      tableName = 'gunghap_results'
    } else {
      return Response.json({ success: false, error: '지원하지 않는 type' }, { status: 400 })
    }

    var query = supabase.from(tableName).delete().eq('id', recordId)
    if (userId === null) {
      query = query.is('user_id', null)
    } else {
      query = query.eq('user_id', userId)
    }

    var { error: delErr } = await query

    if (delErr) {
      return Response.json({ success: false, error: delErr.message }, { status: 500 })
    }

    return Response.json({ success: true })

  } catch (error) {
    logError('delete-result', error.message, { endpoint: '/api/delete-result', recordId: recordId, type: type })
    console.error('[delete-result] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
