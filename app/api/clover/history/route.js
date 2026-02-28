import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ success: false, error: 'userId 필요' }, { status: 400 })
    }

    var supabase = getServiceSupabase()
    var { data: history, error } = await supabase
      .from('clover_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(30)

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 500 })
    }

    return Response.json({ success: true, history: history || [] })

  } catch (e) {
    console.error('[clover/history] 에러:', e)
    return Response.json({ success: false, error: e.message }, { status: 500 })
  }
}
