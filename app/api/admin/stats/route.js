import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

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
    var url = new URL(request.url)
    var period = url.searchParams.get('period') || 'today'

    var now = new Date()
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    var startDate, prevStartDate, prevEndDate

    // 기간 계산
    if (period === 'custom') {
      var customFrom = url.searchParams.get('from')
      var customTo = url.searchParams.get('to')
      if (customFrom && customTo) {
        startDate = new Date(customFrom + 'T00:00:00')
        var customToDate = new Date(customTo + 'T23:59:59.999')
        var diffMs = customToDate.getTime() - startDate.getTime() + 1
        prevEndDate = new Date(startDate.getTime() - 1)
        prevStartDate = new Date(prevEndDate.getTime() - diffMs + 1)
      } else {
        startDate = todayStart
        prevStartDate = new Date(todayStart)
        prevStartDate.setDate(prevStartDate.getDate() - 1)
        prevEndDate = todayStart
      }
    } else if (period === 'today') {
      startDate = todayStart
      var yesterday = new Date(todayStart)
      yesterday.setDate(yesterday.getDate() - 1)
      prevStartDate = yesterday
      prevEndDate = todayStart
    } else if (period === 'week') {
      var weekAgo = new Date(todayStart)
      weekAgo.setDate(weekAgo.getDate() - 6)
      startDate = weekAgo
      var prevWeekStart = new Date(weekAgo)
      prevWeekStart.setDate(prevWeekStart.getDate() - 7)
      prevStartDate = prevWeekStart
      prevEndDate = weekAgo
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      var prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      prevStartDate = prevMonthStart
      prevEndDate = startDate
    } else {
      // year
      startDate = new Date(now.getFullYear(), 0, 1)
      var prevYearStart = new Date(now.getFullYear() - 1, 0, 1)
      prevStartDate = prevYearStart
      prevEndDate = startDate
    }

    var startISO = startDate.toISOString()
    var endISO = new Date(now.getTime() + 86400000).toISOString()
    var prevStartISO = prevStartDate.toISOString()
    var prevEndISO = prevEndDate.toISOString()

    // 안전한 쿼리 헬퍼
    var safeQuery = async function(table, columns, filter) {
      try {
        var q = supabase.from(table).select(columns)
        if (filter) q = filter(q)
        var result = await q
        if (result.error) return []
        return result.data || []
      } catch (e) { return [] }
    }

    var safeCount = async function(table, filter) {
      try {
        var q = supabase.from(table).select('*', { count: 'exact', head: true })
        if (filter) q = filter(q)
        var result = await q
        if (result.error) return 0
        return result.count || 0
      } catch (e) { return 0 }
    }

    // ===== 현재 + 이전 기간 + 글로벌 카운트 병렬 조회 =====
    var results = await Promise.all([
      // 현재 기간 [0-5]
      safeQuery('saju_results', 'created_at, user_id', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      safeQuery('gunghap_results', 'created_at, user_id', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      safeQuery('chat_sessions', 'created_at, user_id', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      safeQuery('users', 'created_at', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      safeQuery('clover_history', 'created_at, amount', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      safeQuery('error_logs', 'created_at', function(q) { return q.gte('created_at', startISO).lt('created_at', endISO) }),
      // 이전 기간 [6-11]
      safeQuery('saju_results', 'created_at, user_id', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      safeQuery('gunghap_results', 'created_at, user_id', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      safeQuery('chat_sessions', 'created_at', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      safeQuery('users', 'created_at', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      safeQuery('clover_history', 'created_at, amount', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      safeQuery('error_logs', 'created_at', function(q) { return q.gte('created_at', prevStartISO).lt('created_at', prevEndISO) }),
      // 글로벌 [12-13]
      safeCount('users'),
      safeCount('error_logs', function(q) { return q.eq('resolved', false) })
    ])

    var saju = results[0]
    var gunghap = results[1]
    var chat = results[2]
    var signups = results[3]
    var clover = results[4]
    var errors = results[5]
    var prevSaju = results[6]
    var prevGunghap = results[7]
    var prevChat = results[8]
    var prevSignups = results[9]
    var prevClover = results[10]
    var prevErrors = results[11]
    var usersTotal = results[12]
    var errorsUnresolved = results[13]

    // ===== 클로버 집계 =====
    var cloverGiven = 0, cloverUsed = 0
    for (var ci = 0; ci < clover.length; ci++) {
      if (clover[ci].amount > 0) cloverGiven += clover[ci].amount
      else cloverUsed += Math.abs(clover[ci].amount)
    }
    var prevCloverGiven = 0, prevCloverUsed = 0
    for (var pci = 0; pci < prevClover.length; pci++) {
      if (prevClover[pci].amount > 0) prevCloverGiven += prevClover[pci].amount
      else prevCloverUsed += Math.abs(prevClover[pci].amount)
    }

    // ===== 카드 데이터 (프론트엔드 포맷) =====
    var prevUsersTotal = usersTotal - signups.length
    if (prevUsersTotal < 0) prevUsersTotal = 0

    var cards = {
      users_total: { value: usersTotal, prev: prevUsersTotal },
      signups: { value: signups.length, prev: prevSignups.length },
      saju: { value: saju.length, prev: prevSaju.length },
      gunghap: { value: gunghap.length, prev: prevGunghap.length },
      chat: { value: chat.length, prev: prevChat.length },
      total_analysis: { value: saju.length + gunghap.length, prev: prevSaju.length + prevGunghap.length },
      clover_given: { value: cloverGiven, prev: prevCloverGiven },
      clover_used: { value: cloverUsed, prev: prevCloverUsed },
      errors: { value: errors.length, prev: prevErrors.length },
      errors_unresolved: { value: errorsUnresolved, prev: 0 }
    }

    // ===== 전환율 계산 =====
    var sajuUserSet = {}
    var gunghapUserSet = {}
    var analyzedUserSet = {}

    for (var si = 0; si < saju.length; si++) {
      if (saju[si].user_id) {
        sajuUserSet[saju[si].user_id] = true
        analyzedUserSet[saju[si].user_id] = true
      }
    }
    for (var gi = 0; gi < gunghap.length; gi++) {
      if (gunghap[gi].user_id) {
        gunghapUserSet[gunghap[gi].user_id] = true
        analyzedUserSet[gunghap[gi].user_id] = true
      }
    }

    var analyzedCount = Object.keys(analyzedUserSet).length
    var sajuUserCount = Object.keys(sajuUserSet).length

    // 사주→궁합 전환: 궁합 유저 중 사주도 한 유저
    var gunghapFromSaju = 0
    var gKeys = Object.keys(gunghapUserSet)
    for (var gki = 0; gki < gKeys.length; gki++) {
      if (sajuUserSet[gKeys[gki]]) gunghapFromSaju++
    }

    var signupToAnalysis = signups.length > 0
      ? Math.round(analyzedCount / signups.length * 1000) / 10 : 0
    if (signupToAnalysis > 100) signupToAnalysis = 100

    var sajuToGunghap = sajuUserCount > 0
      ? Math.round(gunghapFromSaju / sajuUserCount * 1000) / 10 : 0

    // 사주→대화, 궁합→대화 전환율
    var sajuToChatRate = 0
    var gunghapToChatRate = 0
    try {
      var chatUserSet = {}
      for (var ci2 = 0; ci2 < chat.length; ci2++) {
        if (chat[ci2].user_id) chatUserSet[chat[ci2].user_id] = true
      }
      var chatUserIds = Object.keys(chatUserSet)

      // 사주→대화 전환율
      var sajuKeys = Object.keys(sajuUserSet)
      if (sajuKeys.length > 0) {
        var sajuThenChat = 0
        for (var sc = 0; sc < sajuKeys.length; sc++) {
          if (chatUserSet[sajuKeys[sc]]) sajuThenChat++
        }
        sajuToChatRate = Math.round((sajuThenChat / sajuKeys.length) * 100)
      }

      // 궁합→대화 전환율
      var ghKeys2 = Object.keys(gunghapUserSet)
      if (ghKeys2.length > 0) {
        var ghThenChat = 0
        for (var gc = 0; gc < ghKeys2.length; gc++) {
          if (chatUserSet[ghKeys2[gc]]) ghThenChat++
        }
        gunghapToChatRate = Math.round((ghThenChat / ghKeys2.length) * 100)
      }
    } catch (e) {
      // chat_sessions 없으면 무시
    }

    // 재방문율: 2일 이상 활동한 유저 비율
    var userDays = {}
    for (var ri = 0; ri < saju.length; ri++) {
      if (saju[ri].user_id && saju[ri].created_at) {
        var uid = saju[ri].user_id
        var day = saju[ri].created_at.slice(0, 10)
        if (!userDays[uid]) userDays[uid] = {}
        userDays[uid][day] = true
      }
    }
    for (var ri2 = 0; ri2 < gunghap.length; ri2++) {
      if (gunghap[ri2].user_id && gunghap[ri2].created_at) {
        var uid2 = gunghap[ri2].user_id
        var day2 = gunghap[ri2].created_at.slice(0, 10)
        if (!userDays[uid2]) userDays[uid2] = {}
        userDays[uid2][day2] = true
      }
    }
    for (var ri3 = 0; ri3 < chat.length; ri3++) {
      if (chat[ri3].user_id && chat[ri3].created_at) {
        var uid3 = chat[ri3].user_id
        var day3 = chat[ri3].created_at.slice(0, 10)
        if (!userDays[uid3]) userDays[uid3] = {}
        userDays[uid3][day3] = true
      }
    }

    var multiDayUsers = 0
    var allActiveUserKeys = Object.keys(userDays)
    for (var mi = 0; mi < allActiveUserKeys.length; mi++) {
      if (Object.keys(userDays[allActiveUserKeys[mi]]).length > 1) multiDayUsers++
    }
    var retention = allActiveUserKeys.length > 0
      ? Math.round(multiDayUsers / allActiveUserKeys.length * 1000) / 10 : 0

    var conversion = {
      signup_to_analysis: signupToAnalysis,
      saju_to_gunghap: sajuToGunghap,
      saju_to_chat: sajuToChatRate,
      gunghap_to_chat: gunghapToChatRate,
      retention: retention
    }

    // ===== 일별 데이터 (테이블용) =====
    var dayList = []
    var cursor = new Date(startDate)
    var endDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    while (cursor <= endDay) {
      dayList.push(cursor.toISOString().slice(0, 10))
      cursor.setDate(cursor.getDate() + 1)
    }

    var table = []
    for (var di = 0; di < dayList.length; di++) {
      var dayStr = dayList[di]
      var dSaju = 0, dGunghap = 0, dChat = 0, dSignups = 0
      var dCloverGiven = 0, dCloverUsed = 0, dErrors = 0

      for (var a = 0; a < saju.length; a++) {
        if (saju[a].created_at && saju[a].created_at.slice(0, 10) === dayStr) dSaju++
      }
      for (var b = 0; b < gunghap.length; b++) {
        if (gunghap[b].created_at && gunghap[b].created_at.slice(0, 10) === dayStr) dGunghap++
      }
      for (var c2 = 0; c2 < chat.length; c2++) {
        if (chat[c2].created_at && chat[c2].created_at.slice(0, 10) === dayStr) dChat++
      }
      for (var s2 = 0; s2 < signups.length; s2++) {
        if (signups[s2].created_at && signups[s2].created_at.slice(0, 10) === dayStr) dSignups++
      }
      for (var cl = 0; cl < clover.length; cl++) {
        if (clover[cl].created_at && clover[cl].created_at.slice(0, 10) === dayStr) {
          if (clover[cl].amount > 0) dCloverGiven += clover[cl].amount
          else dCloverUsed += Math.abs(clover[cl].amount)
        }
      }
      for (var er = 0; er < errors.length; er++) {
        if (errors[er].created_at && errors[er].created_at.slice(0, 10) === dayStr) dErrors++
      }

      table.push({
        date: dayStr,
        signups: dSignups,
        saju: dSaju,
        gunghap: dGunghap,
        chat: dChat,
        total: dSaju + dGunghap,
        clover_given: dCloverGiven,
        clover_used: dCloverUsed,
        errors: dErrors
      })
    }

    return Response.json({
      cards: cards,
      conversion: conversion,
      table: table,
      period: period
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/stats' })
    console.error('[admin/stats] 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
