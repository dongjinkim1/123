import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  var { searchParams } = new URL(request.url)
  var id = searchParams.get('id')

  if (!id || id.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(id)) return Response.json({ error: 'Invalid job id' }, { status: 400 })

  var supabase = getServiceSupabase()

  var { data, error } = await supabase
    .from('analysis_jobs')
    .select('id, type, status, result, error, params, partial_subs, progress, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error || !data) return Response.json({ error: 'Job not found' }, { status: 404 })

  return Response.json({
    id: data.id,
    status: data.status,
    type: data.type,
    result: data.result || null,
    error: data.error || null,
    params: data.params || null,
    partial_subs: data.partial_subs || null,
    progress: data.progress || null,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  })
}
