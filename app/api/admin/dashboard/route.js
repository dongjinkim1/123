import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    // 토큰 검증
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: '인증 필요' }, { status: 401 })
    }
    const token = authHeader.replace('Bearer ', '')
    if (!validateToken(token)) {
      return Response.json({ error: '토큰 만료' }, { status: 401 })
    }

    const supabase = getServiceSupabase()
    const today = new Date().toISOString().slice(0, 10)

    // 각 쿼리를 병렬로 실행, 테이블 없어도 에러 안 나게 처리
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
      usersTotal,
      usersBanned,
      usersToday,
      errorsTotal,
      errorsUnresolved,
      errorsToday,
      errorsAiFail,
      cloverTotal,
      noticesTotal,
      noticesPinned,
      adminLogs,
      sajuTotal,
      gunghapTotal,
      todaySaju,
      todayGunghap,
      todayChat
    ] = await Promise.all([
      safeCount('users'),
      safeCount('users', q => q.eq('is_blocked', true)),
      safeCount('users', q => q.gte('created_at', today)),
      safeCount('error_logs'),
      safeCount('error_logs', q => q.eq('resolved', false)),
      safeCount('error_logs', q => q.gte('created_at', today)),
      safeCount('error_logs', q => q.in('error_type', ['ai_fail', 'analysis', 'gunghap'])),
      safeSum('clover_history', 'amount', q => q.in('type', ['charge', 'signup_bonus'])),
      safeCount('notices'),
      safeCount('notices', q => q.eq('is_pinned', true)),
      safeSelect('admin_logs', '*', { order: 'created_at', limit: 20 }),
      safeCount('saju_results'),
      safeCount('gunghap_results'),
      safeCount('saju_results', q => q.gte('created_at', today)),
      safeCount('gunghap_results', q => q.gte('created_at', today)),
      safeCount('chat_sessions', q => q.gte('created_at', today))
    ])

    return Response.json({
      users: { total: usersTotal, banned: usersBanned, today: usersToday },
      errors: { total: errorsTotal, unresolved: errorsUnresolved, today: errorsToday, ai_fail: errorsAiFail },
      clover: { total: cloverTotal },
      notices: { total: noticesTotal, pinned: noticesPinned },
      admin_logs: adminLogs,
      saju_results: { total: sajuTotal },
      gunghap_results: { total: gunghapTotal },
      today_saju: todaySaju,
      today_gunghap: todayGunghap,
      today_chat: todayChat
    })
  } catch (error) {
    console.error('[admin/dashboard] 에러:', error)
    return Response.json({ error: '서버 에러' }, { status: 500 })
  }
}
