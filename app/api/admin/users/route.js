import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'

function authCheck(request) {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return validateToken(authHeader.replace('Bearer ', ''))
}

export async function GET(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    const supabase = getServiceSupabase()
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    // 총 수 조회
    let countQuery = supabase.from('users').select('*', { count: 'exact', head: true })
    if (search) {
      countQuery = countQuery.or('nickname.ilike.%' + search + '%,email.ilike.%' + search + '%')
    }
    const { count: total } = await countQuery

    // 데이터 조회
    let dataQuery = supabase.from('users').select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    if (search) {
      dataQuery = dataQuery.or('nickname.ilike.%' + search + '%,email.ilike.%' + search + '%')
    }
    const { data: users, error } = await dataQuery

    if (error) {
      console.error('[admin/users] GET 에러:', error)
      return Response.json({ users: [], total: 0, page, limit })
    }

    return Response.json({ users: users || [], total: total || 0, page, limit })
  } catch (error) {
    console.error('[admin/users] GET 서버 에러:', error)
    return Response.json({ error: '서버 에러' }, { status: 500 })
  }
}

export async function PATCH(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    const supabase = getServiceSupabase()
    const { userId, action, memo } = await request.json()

    if (!userId || !action) {
      return Response.json({ error: 'userId와 action이 필요합니다' }, { status: 400 })
    }

    let updateData = {}
    let actionLabel = ''

    switch (action) {
      case 'block':
        updateData = { is_blocked: true }
        actionLabel = '차단'
        break
      case 'unblock':
        updateData = { is_blocked: false }
        actionLabel = '차단 해제'
        break
      case 'make_admin':
        updateData = { role: 'admin' }
        actionLabel = '관리자 권한 부여'
        break
      case 'make_user':
        updateData = { role: 'user' }
        actionLabel = '일반 유저로 변경'
        break
      default:
        return Response.json({ error: '알 수 없는 action' }, { status: 400 })
    }

    const { error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)

    if (updateError) {
      console.error('[admin/users] PATCH 에러:', updateError)
      return Response.json({ error: updateError.message }, { status: 500 })
    }

    // admin_logs에 기록
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '유저 ' + actionLabel + ': ' + userId,
        detail: JSON.stringify({ userId, memo: memo || '' })
      })
    } catch (logErr) {
      console.warn('[admin/users] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('[admin/users] PATCH 서버 에러:', error)
    return Response.json({ error: '서버 에러' }, { status: 500 })
  }
}
