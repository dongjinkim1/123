import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'
import { randomBytes } from 'crypto'

// 공유 링크 저장 (service_role 경유)
// body: { type, renderData, preview, nickname, userId? }
// 응답: { success, code, url }

function gen6() {
  // base36 6자 (a-z + 0-9 소문자) — crypto 기반 랜덤
  var bytes = randomBytes(4)
  var num = bytes.readUInt32BE(0)
  return num.toString(36).padStart(6, '0').slice(0, 6)
}

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var type = body.type || 'premium'
    var renderData = body.renderData || null
    var preview = body.preview || {}
    var nickname = body.nickname || ''
    var userId = body.userId || null

    // Rate limiting (60s / 20req)
    var rlMod = await import('@/lib/rate-limiter.js')
    var rl = rlMod.default || rlMod
    var vercelIp = request.headers.get('x-vercel-forwarded-for')
    var realIp = request.headers.get('x-real-ip')
    var rlIdentifier = userId || vercelIp || realIp || 'unknown'
    var rlResult = await rl.checkRateLimit(supabase, rlIdentifier, 'save-share', 60000, 20)
    if (!rlResult.allowed) {
      return Response.json({ success: false, error: '요청 한도 초과', retryAfter: rlResult.retryAfter }, { status: 429 })
    }

    // share_code 생성 + UNIQUE 충돌 재시도 3회
    // 현 shared_results 스키마: 레거시 18컬럼 (payload/user_id 없음 — Hand Phase 6 A단계 확인).
    // userId 는 rate-limiter identifier 로만 사용, insert 시 무시.
    var row = {
      share_code: null, // per-attempt
      nickname: nickname,
      mbti: preview.mbti || '',
      animal_key: '',
      animal_emoji: preview.emoji || '',
      animal_title: preview.title || '',
      animal_desc: preview.desc || '',
      animal_traits: [],
      animal_rx: '',
      animal_tag: '',
      oheng: '',
      ai_result: {},
      saju_summary: {},
      share_image_url: preview.image || '',
      result_type: type,
      render_data: renderData || {}
    }

    var code = null
    var lastErr = null
    for (var attempt = 0; attempt < 3; attempt++) {
      var candidate = gen6()
      row.share_code = candidate
      var { error: insertErr } = await supabase
        .from('shared_results')
        .insert(row)

      if (!insertErr) {
        code = candidate
        break
      }
      // 23505 = unique violation
      if (insertErr.code === '23505' || /duplicate|unique/i.test(insertErr.message || '')) {
        lastErr = insertErr
        continue
      }
      // 다른 에러는 즉시 실패
      return Response.json({ success: false, error: insertErr.message }, { status: 500 })
    }

    if (!code) {
      return Response.json({ success: false, error: 'share_code 생성 실패: ' + (lastErr && lastErr.message || 'unknown') }, { status: 500 })
    }

    return Response.json({
      success: true,
      code: code,
      url: 'https://mbts.kr?s=' + code
    })

  } catch (error) {
    logError('save-share', error.message, { endpoint: '/api/save-share' })
    console.error('[save-share] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
