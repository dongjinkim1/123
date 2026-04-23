import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

// 화이트리스트 — 이 필드만 업데이트 허용
// clover_balance / kakao_id / id / email / provider / role / is_blocked / created_at 은 절대 수정 불가
var ALLOWED_FIELDS = [
  'nickname',
  'mbti',
  'animal_key',
  'ilju',
  'birth_year',
  'birth_month',
  'birth_day',
  'birth_hour',
  'birth_min',
  'gender'
]

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId || null
    var fields = body.fields || {}

    if (!userId) {
      return Response.json({ success: false, error: 'userId는 필수입니다' }, { status: 400 })
    }

    // Rate limiting (60s / 30req)
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'update-user', 60000, 30)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    // Whitelist filter — 허용 필드만 추출, 나머지는 조용히 drop
    var filtered = {}
    for (var i = 0; i < ALLOWED_FIELDS.length; i++) {
      var key = ALLOWED_FIELDS[i]
      if (fields[key] !== undefined) filtered[key] = fields[key]
    }
    if (Object.keys(filtered).length === 0) {
      return Response.json({ success: false, error: '허용된 필드가 없습니다' }, { status: 400 })
    }
    // updated_at 은 서버에서 항상 자동 설정 (클라가 보내도 무시)
    filtered.updated_at = new Date().toISOString()

    var { error: updateErr } = await supabase
      .from('users')
      .update(filtered)
      .eq('id', userId)

    if (updateErr) {
      return Response.json({ success: false, error: updateErr.message }, { status: 500 })
    }

    return Response.json({ success: true, updated: Object.keys(filtered) })

  } catch (error) {
    logError('update-user', error.message, { endpoint: '/api/update-user' })
    console.error('[update-user] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
