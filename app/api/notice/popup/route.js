import { getServiceSupabase } from '@/lib/supabase'

export async function GET() {
  try {
    var supabase = getServiceSupabase()

    var { data: notice, error } = await supabase
      .from('notices')
      .select('title, content')
      .eq('is_published', true)
      .eq('is_pinned', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !notice) {
      return Response.json({ success: true, notice: null })
    }

    return Response.json({ success: true, notice: notice })

  } catch (e) {
    return Response.json({ success: true, notice: null })
  }
}
