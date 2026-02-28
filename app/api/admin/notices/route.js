import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

function authCheck(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return validateToken(authHeader.replace('Bearer ', ''))
}

// GET: 공지 목록
export async function GET(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var page = parseInt(url.searchParams.get('page') || '1', 10)
    var limit = parseInt(url.searchParams.get('limit') || '20', 10)
    var offset = (page - 1) * limit

    // 총 수 조회
    var { count: total, error: countErr } = await supabase
      .from('notices')
      .select('*', { count: 'exact', head: true })

    if (countErr) {
      console.error('[admin/notices] count 에러:', countErr)
    }

    // 데이터 조회 (고정 우선, 최신순)
    var { data: notices, error: dataErr } = await supabase
      .from('notices')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (dataErr) {
      console.error('[admin/notices] data 에러:', dataErr)
      return Response.json({ notices: [], total: 0, page: page })
    }

    return Response.json({
      notices: notices || [],
      total: total || 0,
      page: page
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/notices GET' })
    console.error('[admin/notices] GET 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// POST: 공지 생성
export async function POST(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var title = body.title
    var content = body.content
    var category = body.category || 'general'
    var isPinned = body.is_pinned || false
    var isPublished = body.is_published !== false

    if (!title || !content) {
      return Response.json({ error: '제목과 내용 필요' }, { status: 400 })
    }

    var isPopup = body.is_popup || false

    var { data: newNotice, error: insertErr } = await supabase
      .from('notices')
      .insert({
        title: title,
        content: content,
        category: category,
        is_pinned: isPinned,
        is_published: isPublished,
        is_popup: isPopup
      })
      .select()
      .single()

    if (insertErr) {
      console.error('[admin/notices] insert 에러:', insertErr)
      return Response.json({ error: '공지 등록 실패: ' + insertErr.message }, { status: 500 })
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '공지 등록: ' + title
      })
    } catch (logErr) {
      console.warn('[admin/notices] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true, notice: newNotice })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/notices POST' })
    console.error('[admin/notices] POST 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// PATCH: 공지 수정
export async function PATCH(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var noticeId = body.noticeId

    if (!noticeId) {
      return Response.json({ error: 'noticeId 필요' }, { status: 400 })
    }

    var updateData = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.content !== undefined) updateData.content = body.content
    if (body.category !== undefined) updateData.category = body.category
    if (body.is_pinned !== undefined) updateData.is_pinned = body.is_pinned
    if (body.is_published !== undefined) updateData.is_published = body.is_published
    if (body.is_popup !== undefined) updateData.is_popup = body.is_popup

    var { error: updateErr } = await supabase
      .from('notices')
      .update(updateData)
      .eq('id', noticeId)

    if (updateErr) {
      console.error('[admin/notices] update 에러:', updateErr)
      return Response.json({ error: '공지 수정 실패: ' + updateErr.message }, { status: 500 })
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '공지 수정: ' + (body.title || noticeId.slice(0, 8))
      })
    } catch (logErr) {
      console.warn('[admin/notices] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/notices PATCH' })
    console.error('[admin/notices] PATCH 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

// DELETE: 공지 삭제
export async function DELETE(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  try {
    var supabase = getServiceSupabase()
    var url = new URL(request.url)
    var noticeId = url.searchParams.get('noticeId')

    if (!noticeId) {
      return Response.json({ error: 'noticeId 필요' }, { status: 400 })
    }

    // 삭제 전 제목 가져오기 (로그용)
    var { data: existing } = await supabase
      .from('notices')
      .select('title')
      .eq('id', noticeId)
      .single()

    var { error: delErr } = await supabase
      .from('notices')
      .delete()
      .eq('id', noticeId)

    if (delErr) {
      console.error('[admin/notices] delete 에러:', delErr)
      return Response.json({ error: '공지 삭제 실패: ' + delErr.message }, { status: 500 })
    }

    // 관리자 로그
    try {
      await supabase.from('admin_logs').insert({
        admin_id: null,
        action: '공지 삭제: ' + (existing ? existing.title : noticeId.slice(0, 8))
      })
    } catch (logErr) {
      console.warn('[admin/notices] 로그 기록 실패:', logErr)
    }

    return Response.json({ success: true })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/notices DELETE' })
    console.error('[admin/notices] DELETE 에러:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
