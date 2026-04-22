import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    var supabase = getServiceSupabase()
    var body = await request.json()
    var userId = body.userId || null
    var type = body.type
    var data = body.data || {}

    if (type === 'saju') {
      var { data: result, error: insertErr } = await supabase
        .from('saju_results')
        .insert({
          user_id: userId,
          payload: data
        })
        .select('id')
        .single()

      if (insertErr) {
        return Response.json({ success: false, error: insertErr.message }, { status: 500 })
      }

      return Response.json({ success: true, id: result.id })

    } else if (type === 'gunghap') {
      var { data: ghResult, error: ghErr } = await supabase
        .from('gunghap_results')
        .insert({
          user_id: userId,
          payload: data
        })
        .select('id')
        .single()

      if (ghErr) {
        return Response.json({ success: false, error: ghErr.message }, { status: 500 })
      }

      return Response.json({ success: true, id: ghResult.id })

    } else {
      return Response.json({ success: false, error: '지원하지 않는 type' }, { status: 400 })
    }

  } catch (error) {
    logError('save-result', error.message, { endpoint: '/api/save-result' })
    console.error('[save-result] 에러:', error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
