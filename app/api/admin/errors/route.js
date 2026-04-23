import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

async function authCheck(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return await validateToken(authHeader.replace('Bearer ', ''))
}

// GET: 에러 목록 조회
export async function GET(request) {
  if (!(await authCheck(request))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var page = parseInt(url.searchParams.get('page') || '1', 10)
    var limit = parseInt(url.searchParams.get('limit') || '20', 10)
    var offset = (page - 1) * limit
    var resolved = url.searchParams.get('resolved')
    var type = url.searchParams.get('type')

    // 미해결 건수 (항상 반환)
    var { count: unresolvedCount, error: ucErr } = await supabase
      .from('error_logs')
      .select('*', { count: 'exact', head: true })
      .eq('is_resolved', false)

    if (ucErr) {
      console.error('[admin/errors] unresolved count 에러:', ucErr)
    }

    // 필터링된 총 수 쿼리
    var countQuery = supabase.from('error_logs').select('*', { count: 'exact', head: true })
    if (resolved === 'true') countQuery = countQuery.eq('is_resolved', true)
    else if (resolved === 'false') countQuery = countQuery.eq('is_resolved', false)
    if (type) countQuery = countQuery.eq('category', type)
    var { count: total, error: countErr } = await countQuery

    if (countErr) {
      console.error('[admin/errors] count 에러:', countErr)
    }

    // 데이터 쿼리
    var dataQuery = supabase.from('error_logs').select('*')
    if (resolved === 'true') dataQuery = dataQuery.eq('is_resolved', true)
    else if (resolved === 'false') dataQuery = dataQuery.eq('is_resolved', false)
    if (type) dataQuery = dataQuery.eq('category', type)
    dataQuery = dataQuery.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    var { data: errors, error: dataErr } = await dataQuery

    if (dataErr) {
      console.error('[admin/errors] data 에러:', dataErr)
      return Response.json({ errors: [], total: 0, unresolved: 0, page: page })
    }

    return Response.json({
      errors: errors || [],
      total: total || 0,
      unresolved: unresolvedCount || 0,
      page: page
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/errors GET' })
    console.error('[admin/errors] GET 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PATCH: 에러 해결 처리
export async function PATCH(request) {
  if (!(await authCheck(request))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var errorId = body.errorId
    var memo = body.memo || ''
    var compensateClover = body.compensateClover || 0

    if (!errorId) {
      return Response.json({ error: 'errorId 필요' }, { status: 400 })
    }

    // 에러 해결 처리
    var { error: updateErr } = await supabase
      .from('error_logs')
      .update({
        is_resolved: true,
        resolved_memo: memo,
        compensated_clover: compensateClover,
        resolved_at: new Date().toISOString()
      })
      .eq('id', errorId)

    if (updateErr) {
      console.error('[admin/errors] 해결 처리 에러:', updateErr)
      return Response.json({ error: '해결 처리 실패: ' + updateErr.message }, { status: 500 })
    }

    // 보상 클로버 지급 (0보다 클 때만)
    if (compensateClover > 0) {
      var { data: errData } = await supabase
        .from('error_logs')
        .select('user_id')
        .eq('id', errorId)
        .single()

      if (errData && errData.user_id) {
        var userId = errData.user_id
        var { data: userData } = await supabase
          .from('users')
          .select('clover_balance')
          .eq('id', userId)
          .single()

        if (userData) {
          var newBalance = (userData.clover_balance || 0) + compensateClover

          await supabase
            .from('users')
            .update({ clover_balance: newBalance })
            .eq('id', userId)

          await supabase
            .from('clover_history')
            .insert({
              user_id: userId,
              amount: compensateClover,
              balance_after: newBalance,
              type: 'refund',
              description: '에러 보상: ' + memo
            })
        }
      }
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '에러 해결: ' + memo + (compensateClover > 0 ? ' (🍀' + compensateClover + ' 보상)' : '')
      })
    } catch (logErr) {
      console.warn('[admin/errors] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/errors PATCH' })
    console.error('[admin/errors] PATCH 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
