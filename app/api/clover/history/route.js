import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ error: 'userId 필요' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    var res = await supabase
      .from('clover_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50)

    return Response.json({
      success: true,
      history: res.data || []
    })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
