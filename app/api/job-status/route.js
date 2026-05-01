import { getServiceSupabase } from '@/lib/supabase'

// M7: require caller-provided userId (from client session) to match the job owner.
// Guest jobs (created without userId) have params.userId == null — callers that pass no
// userId can only read guest jobs. The 'params' field is stripped from the response
// because it contains birth data (PII). Callers do not need params for polling.
export async function GET(request) {
  var { searchParams } = new URL(request.url)
  var id = searchParams.get('id')
  var userId = searchParams.get('userId') || null

  if (!id || id.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return Response.json({ error: 'Invalid job id' }, { status: 400 })
  }
  if (userId && (userId.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(userId))) {
    return Response.json({ error: 'Invalid user id' }, { status: 400 })
  }

  var supabase = getServiceSupabase()

  var { data, error } = await supabase
    .from('analysis_jobs')
    .select('id, type, status, result, error, params, partial_subs, progress, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error || !data) return Response.json({ error: 'Job not found' }, { status: 404 })

  // Ownership check: if job has userId in params, caller must match
  var ownerId = (data.params && data.params.userId) || null
  if (ownerId && ownerId !== userId) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Do NOT return params (contains birth PII). Client already has its own input.
  return Response.json({
    id: data.id,
    status: data.status,
    type: data.type,
    result: data.result || null,
    error: data.error || null,
    partial_subs: data.partial_subs || null,
    progress: data.progress || null,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  }, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' }
  })
}
