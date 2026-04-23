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
    const supabase = getServiceSupabase()

    // 날짜 파라미터 (기본: 오늘)
    const url = new URL(request.url)
    const dateParam = url.searchParams.get('date')
    const targetDate = dateParam || new Date().toISOString().slice(0, 10)
    const dayStart = targetDate + 'T00:00:00.000Z'
    const dayEnd = targetDate + 'T23:59:59.999Z'

    // 안전 카운트 헬퍼
    const safeCount = async (table, filter) => {
      try {
        let q = supabase.from(table).select('*', { count: 'exact', head: true })
        if (filter) q = filter(q)
        const { count, error } = await q
        if (error) return 0
        return count || 0
      } catch (e) { return 0 }
    }

    const safeSelect = async (table, columns, opts) => {
      try {
        let q = supabase.from(table).select(columns)
        if (opts && opts.order) q = q.order(opts.order, { ascending: false })
        if (opts && opts.limit) q = q.limit(opts.limit)
        if (opts && opts.filter) q = opts.filter(q)
        const { data, error } = await q
        if (error) return []
        return data || []
      } catch (e) { return [] }
    }

    const safeSum = async (table, column, filter) => {
      try {
        let q = supabase.from(table).select(column)
        if (filter) q = filter(q)
        const { data, error } = await q
        if (error || !data) return 0
        let sum = 0
        data.forEach(row => { sum += (row[column] || 0) })
        return sum
      } catch (e) { return 0 }
    }

    // 병렬 쿼리
    const [
      // 누적
      usersTotal,
      usersBanned,
      errorsTotal,
      errorsUnresolved,
      cloverTotal,
      noticesTotal,
      noticesPinned,
      adminLogs,
      sajuTotal,
      gunghapTotal,
      // 당일 (today)
      todayVisitors,
      todaySignups,
      todaySaju,
      todayGunghap,
      todayChat,
      todayChatUsers,
      todayCloverIn,
      todayCloverOut,
      todayApiCalls,
      todayErrors
    ] = await Promise.all([
      // 누적
      safeCount('users'),
      safeCount('users', q => q.eq('is_blocked', true)),
      safeCount('error_logs'),
      safeCount('error_logs', q => q.eq('is_resolved', false)),
      safeSum('clover_history', 'amount', q => q.in('type', ['charge', 'signup_bonus'])),
      safeCount('notices'),
      safeCount('notices', q => q.eq('is_pinned', true)),
      safeSelect('admin_logs', '*', { order: 'created_at', limit: 20 }),
      safeCount('saju_results'),
      safeCount('gunghap_results'),
      // 당일
      safeCount('visitor_logs', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('users', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('saju_results', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('gunghap_results', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('chat_sessions', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('chat_sessions', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeSum('clover_history', 'amount', q => q.gte('created_at', dayStart).lte('created_at', dayEnd).gt('amount', 0)),
      safeSum('clover_history', 'amount', q => q.gte('created_at', dayStart).lte('created_at', dayEnd).lt('amount', 0)),
      safeCount('saju_results', q => q.gte('created_at', dayStart).lte('created_at', dayEnd)),
      safeCount('error_logs', q => q.gte('created_at', dayStart).lte('created_at', dayEnd))
    ])

    // api_calls = 당일 사주 + 궁합 + 채팅 (AI API 호출 총합)
    const apiCalls = todaySaju + todayGunghap + todayChat

    return Response.json({
      date: targetDate,
      today: {
        visitors: todayVisitors,
        signups: todaySignups,
        saju: todaySaju,
        gunghap: todayGunghap,
        chat: todayChat,
        chat_users: todayChatUsers,
        clover_in: todayCloverIn,
        clover_out: todayCloverOut,
        api_calls: apiCalls,
        errors: todayErrors
      },
      users: { total: usersTotal, banned: usersBanned },
      errors: { total: errorsTotal, unresolved: errorsUnresolved },
      clover: { total: cloverTotal },
      notices: { total: noticesTotal, pinned: noticesPinned },
      admin_logs: adminLogs,
      saju_results: { total: sajuTotal },
      gunghap_results: { total: gunghapTotal }
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/dashboard' })
    console.error('[admin/dashboard] 에러:', error)
    return Response.json({ error: '서버 에러' }, { status: 500 })
  }
}
