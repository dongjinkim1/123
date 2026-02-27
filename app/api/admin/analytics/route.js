import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'

function authCheck(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return validateToken(authHeader.replace('Bearer ', ''))
}

export async function GET(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var now = new Date()
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    var todayISO = todayStart.toISOString()

    // 7일 전
    var sevenDaysAgo = new Date(todayStart)
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    var sevenDaysISO = sevenDaysAgo.toISOString()

    // 안전한 select 헬퍼
    var safeQuery = async function(table, columns, filter) {
      try {
        var q = supabase.from(table).select(columns)
        if (filter) q = filter(q)
        var result = await q
        if (result.error) return []
        return result.data || []
      } catch (e) { return [] }
    }

    // ===== 오늘 데이터 병렬 조회 =====
    var results = await Promise.all([
      safeQuery('saju_results', 'created_at', function(q) { return q.gte('created_at', todayISO) }),
      safeQuery('gunghap_results', 'created_at', function(q) { return q.gte('created_at', todayISO) }),
      safeQuery('chat_sessions', 'created_at', function(q) { return q.gte('created_at', todayISO) }),
      safeQuery('clover_history', 'created_at, amount', function(q) { return q.gte('created_at', todayISO) }),
      safeQuery('saju_results', 'created_at', function(q) { return q.gte('created_at', sevenDaysISO) }),
      safeQuery('gunghap_results', 'created_at', function(q) { return q.gte('created_at', sevenDaysISO) }),
      safeQuery('chat_sessions', 'created_at', function(q) { return q.gte('created_at', sevenDaysISO) }),
      safeQuery('users', 'created_at', function(q) { return q.gte('created_at', sevenDaysISO) })
    ])

    var sajuToday = results[0]
    var gunghapToday = results[1]
    var chatToday = results[2]
    var cloverToday = results[3]
    var sajuWeek = results[4]
    var gunghapWeek = results[5]
    var chatWeek = results[6]
    var signupWeek = results[7]

    // ===== 시간대별 분석 요청 집계 =====
    var hourly = []
    for (var h = 0; h < 24; h++) {
      var sCount = 0, gCount = 0, cCount = 0
      for (var si = 0; si < sajuToday.length; si++) {
        if (new Date(sajuToday[si].created_at).getHours() === h) sCount++
      }
      for (var gi = 0; gi < gunghapToday.length; gi++) {
        if (new Date(gunghapToday[gi].created_at).getHours() === h) gCount++
      }
      for (var ci = 0; ci < chatToday.length; ci++) {
        if (new Date(chatToday[ci].created_at).getHours() === h) cCount++
      }
      if (sCount > 0 || gCount > 0 || cCount > 0) {
        hourly.push({ hour: h, saju: sCount, gunghap: gCount, chat: cCount })
      }
    }

    // ===== 시간대별 클로버 흐름 =====
    var hourly_clover = []
    for (var h2 = 0; h2 < 24; h2++) {
      var given = 0, used = 0
      for (var cli = 0; cli < cloverToday.length; cli++) {
        if (new Date(cloverToday[cli].created_at).getHours() === h2) {
          if (cloverToday[cli].amount > 0) given += cloverToday[cli].amount
          else used += Math.abs(cloverToday[cli].amount)
        }
      }
      if (given > 0 || used > 0) {
        hourly_clover.push({ hour: h2, given: given, used: used })
      }
    }

    // ===== 7일 일별 트렌드 =====
    var daily = []
    for (var d = 0; d < 7; d++) {
      var dayDate = new Date(sevenDaysAgo)
      dayDate.setDate(dayDate.getDate() + d)
      var dayStr = dayDate.toISOString().slice(0, 10)

      var daySaju = 0, dayGh = 0, dayChat = 0, daySignups = 0
      for (var a = 0; a < sajuWeek.length; a++) {
        if (sajuWeek[a].created_at && sajuWeek[a].created_at.slice(0, 10) === dayStr) daySaju++
      }
      for (var b = 0; b < gunghapWeek.length; b++) {
        if (gunghapWeek[b].created_at && gunghapWeek[b].created_at.slice(0, 10) === dayStr) dayGh++
      }
      for (var c2 = 0; c2 < chatWeek.length; c2++) {
        if (chatWeek[c2].created_at && chatWeek[c2].created_at.slice(0, 10) === dayStr) dayChat++
      }
      for (var e = 0; e < signupWeek.length; e++) {
        if (signupWeek[e].created_at && signupWeek[e].created_at.slice(0, 10) === dayStr) daySignups++
      }

      daily.push({
        date: dayStr,
        saju: daySaju,
        gunghap: dayGh,
        chat: dayChat,
        signups: daySignups
      })
    }

    return Response.json({
      hourly: hourly,
      hourly_clover: hourly_clover,
      daily: daily
    })
  } catch (error) {
    console.error('[admin/analytics] 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
