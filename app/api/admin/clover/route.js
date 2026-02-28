import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

function authCheck(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return validateToken(authHeader.replace('Bearer ', ''))
}

// GET: 클로버 내역 조회
export async function GET(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')
    var page = parseInt(url.searchParams.get('page') || '1', 10)
    var limit = parseInt(url.searchParams.get('limit') || '20', 10)
    var offset = (page - 1) * limit

    if (!userId) {
      return Response.json({ error: 'userId 필요' }, { status: 400 })
    }

    // 총 수 조회
    var { count: total, error: countErr } = await supabase
      .from('clover_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

    if (countErr) {
      console.error('[admin/clover] count 에러:', countErr)
    }

    // 데이터 조회
    var { data: history, error: dataErr } = await supabase
      .from('clover_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (dataErr) {
      console.error('[admin/clover] data 에러:', dataErr)
      return Response.json({ history: [], total: 0, page: page })
    }

    return Response.json({
      history: history || [],
      total: total || 0,
      page: page
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/clover GET' })
    console.error('[admin/clover] GET 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST: 클로버 지급/차감
export async function POST(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId
    var amount = body.amount // 양수=지급, 음수=차감
    var type = body.type || 'admin'
    var description = body.description || ''

    if (!userId || !amount) {
      return Response.json({ error: 'userId와 amount 필요' }, { status: 400 })
    }

    // 현재 잔액 조회
    var { data: userData, error: userErr } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .single()

    if (userErr || !userData) {
      return Response.json({ error: '유저를 찾을 수 없습니다' }, { status: 404 })
    }

    var currentBalance = userData.clover_balance || 0
    var newBalance = currentBalance + amount
    if (newBalance < 0) {
      return Response.json({ error: '잔액이 부족합니다 (현재: ' + currentBalance + ')' }, { status: 400 })
    }

    // 잔액 업데이트
    var { error: updateErr } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId)

    if (updateErr) {
      console.error('[admin/clover] 잔액 업데이트 에러:', updateErr)
      return Response.json({ error: '잔액 업데이트 실패: ' + updateErr.message }, { status: 500 })
    }

    // 내역 기록
    var { error: historyErr } = await supabase
      .from('clover_history')
      .insert({
        user_id: userId,
        amount: amount,
        balance_after: newBalance,
        type: type,
        description: description,
        admin_memo: '관리자 수동 ' + (amount > 0 ? '지급' : '차감')
      })

    if (historyErr) {
      console.error('[admin/clover] 내역 기록 에러:', historyErr)
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '클로버 ' + (amount > 0 ? '지급' : '차감') + ' ' + Math.abs(amount) + '개 → ' + userId.slice(0, 8) + '... (' + description + ')'
      })
    } catch (logErr) {
      console.warn('[admin/clover] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true, newBalance: newBalance })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/clover POST' })
    console.error('[admin/clover] POST 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PUT: 클로버 일괄 지급
export async function PUT(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var target = body.target || 'all'
    var amount = body.amount
    var reason = body.reason || ''

    if (!amount || amount <= 0) {
      return Response.json({ error: 'amount 필요' }, { status: 400 })
    }
    if (amount > 1000) {
      return Response.json({ error: '최대 1,000개까지 가능' }, { status: 400 })
    }

    // 대상 유저 조회
    var query = supabase.from('users').select('id, clover_balance')
    if (target === 'active') {
      query = query.eq('is_blocked', false)
    }
    var { data: users, error: usersErr } = await query

    if (usersErr) {
      console.error('[admin/clover] 유저 조회 에러:', usersErr)
      return Response.json({ error: '유저 조회 실패: ' + usersErr.message }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return Response.json({ error: '대상 유저가 없습니다' }, { status: 400 })
    }

    // 각 유저별 잔액 업데이트 + 내역 기록
    var count = 0
    for (var i = 0; i < users.length; i++) {
      var u = users[i]
      var newBalance = (u.clover_balance || 0) + amount

      await supabase
        .from('users')
        .update({ clover_balance: newBalance })
        .eq('id', u.id)

      await supabase
        .from('clover_history')
        .insert({
          user_id: u.id,
          amount: amount,
          balance_after: newBalance,
          type: 'admin',
          description: '[일괄지급] ' + reason
        })

      count++
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '클로버 일괄 지급: ' + count + '명 × ' + amount + '🍀 (' + reason + ')'
      })
    } catch (logErr) {
      console.warn('[admin/clover] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true, count: count })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/clover PUT' })
    console.error('[admin/clover] PUT 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE: 클로버 일괄 회수
export async function DELETE(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var target = body.target || 'all'
    var amount = body.amount
    var reason = body.reason || ''

    if (!amount || amount <= 0) {
      return Response.json({ error: 'amount 필요' }, { status: 400 })
    }
    if (amount > 1000) {
      return Response.json({ error: '최대 1,000개까지 가능' }, { status: 400 })
    }

    // 대상 유저 조회
    var query = supabase.from('users').select('id, clover_balance')
    if (target === 'active') {
      query = query.eq('is_blocked', false)
    }
    var { data: users, error: usersErr } = await query

    if (usersErr) {
      console.error('[admin/clover] 유저 조회 에러:', usersErr)
      return Response.json({ error: '유저 조회 실패: ' + usersErr.message }, { status: 500 })
    }

    if (!users || users.length === 0) {
      return Response.json({ error: '대상 유저가 없습니다' }, { status: 400 })
    }

    // 각 유저별 잔액 차감 + 내역 기록
    var count = 0
    for (var i = 0; i < users.length; i++) {
      var u = users[i]
      var currentBalance = u.clover_balance || 0
      var newBalance = currentBalance - amount
      if (newBalance < 0) newBalance = 0
      var actualRevoked = currentBalance - newBalance

      if (actualRevoked <= 0) continue

      await supabase
        .from('users')
        .update({ clover_balance: newBalance })
        .eq('id', u.id)

      await supabase
        .from('clover_history')
        .insert({
          user_id: u.id,
          amount: -actualRevoked,
          balance_after: newBalance,
          type: 'admin',
          description: '[일괄회수] ' + reason
        })

      count++
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '클로버 일괄 회수: ' + count + '명 × ' + amount + '🍀 (' + reason + ')'
      })
    } catch (logErr) {
      console.warn('[admin/clover] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true, count: count })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/clover DELETE' })
    console.error('[admin/clover] DELETE 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
