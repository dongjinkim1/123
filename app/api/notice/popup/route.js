import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function GET() {
  try {
    var supabase = getServiceSupabase()

    // is_popup=true, is_published=true인 가장 최근 공지 1개
    var res = await supabase
      .from('notices')
      .select('id, title, content, created_at')
      .eq('is_popup', true)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (res.data) {
      return Response.json({
        success: true,
        notice: {
          id: res.data.id,
          title: res.data.title,
          content: res.data.content
        }
      })
    } else {
      return Response.json({ success: false, notice: null })
    }
  } catch (e) {
    logError('other', e.message, { endpoint: '/api/notice/popup' })
    return Response.json({ success: false, notice: null })
  }
}
