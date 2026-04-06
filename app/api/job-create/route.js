import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'

export const maxDuration = 300

async function processJob(jobId, type, params) {
  var supabase = getServiceSupabase()
  try {
    await supabase.from('analysis_jobs').update({ status: 'running', updated_at: new Date().toISOString() }).eq('id', jobId)

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: params.model || 'claude-sonnet-4-6',
        max_tokens: params.max_tokens || 8000,
        system: params.systemPrompt,
        messages: [{ role: 'user', content: params.userPrompt }]
      })
    })

    if (!response.ok) {
      var errText = await response.text()
      throw new Error('Claude API ' + response.status + ': ' + errText.substring(0, 200))
    }

    var data = await response.json()
    var aiText = data.content[0].text

    await supabase.from('analysis_jobs').update({
      status: 'done',
      result: { text: aiText, model: data.model, usage: data.usage },
      updated_at: new Date().toISOString()
    }).eq('id', jobId)

    console.log('[job-create] Job done:', jobId, 'tokens:', data.usage?.output_tokens)
  } catch (err) {
    console.error('[job-create] processJob error:', err)
    try {
      await supabase.from('analysis_jobs').update({
        status: 'failed',
        error: err.message || 'Unknown error',
        updated_at: new Date().toISOString()
      }).eq('id', jobId)
    } catch (dbErr) {
      console.error('[job-create] Failed to update job status:', dbErr)
    }
  }
}

export async function POST(request) {
  try {
    var body = await request.json()
    var { type, params } = body

    if (!type || !params || !params.systemPrompt || !params.userPrompt) {
      return Response.json({ error: 'Missing type or params' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    var insertObj = {
      type: type,
      status: 'pending',
      user_id: params.userId || null,
      params: { systemPrompt: params.systemPrompt, userPrompt: params.userPrompt, model: params.model, max_tokens: params.max_tokens }
    }
    if (body.jobId) insertObj.id = body.jobId

    var { data, error } = await supabase.from('analysis_jobs').insert(insertObj).select('id').single()

    if (error) {
      console.error('[job-create] Insert error:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    var jobId = data.id

    // waitUntil: 응답 반환 후에도 서버에서 processJob 계속 실행
    waitUntil(processJob(jobId, type, params))

    // 즉시 응답 (1초 이내)
    return Response.json({ jobId: jobId, status: 'processing' })
  } catch (err) {
    console.error('[job-create] Handler error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
