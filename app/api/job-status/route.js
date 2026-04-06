import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  var { searchParams } = new URL(request.url)
  var id = searchParams.get('id')

  if (!id) return Response.json({ error: 'Missing job id' }, { status: 400 })

  var supabase = getServiceSupabase()

  var { data, error } = await supabase
    .from('analysis_jobs')
    .select('id, type, status, result, error, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error || !data) return Response.json({ error: 'Job not found' }, { status: 404 })

  return Response.json(data)
}
