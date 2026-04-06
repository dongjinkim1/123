import { getServiceSupabase } from '@/lib/supabase'

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
    await supabase.from('analysis_jobs').update({
      status: 'failed',
      error: err.message || 'Unknown error',
      updated_at: new Date().toISOString()
    }).eq('id', jobId)
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
    // 클라이언트가 보낸 jobId가 있으면 사용 (recovery 보장)
    if (body.jobId) insertObj.id = body.jobId

    var { data, error } = await supabase.from('analysis_jobs').insert(insertObj).select('id').single()

    if (error) {
      console.error('[job-create] Insert error:', error)
      return Response.json({ error: error.message }, { status: 500 })
    }

    var jobId = data.id

    // 동기 방식: AI 호출 완료까지 대기 후 응답
    // maxDuration 300초이므로 충분. 폰 앱 전환해도 서버는 계속 실행.
    // 클라이언트는 job-create 응답 후 폴링 시작하지만,
    // 이미 done 상태이므로 첫 폴링에서 바로 결과 수신.
    await processJob(jobId, type, params)

    // 처리 완료 후 응답 (클라이언트는 이 시점에 jobId를 받고 즉시 폴링 → done)
    return Response.json({ jobId: jobId, status: 'processing' })
  } catch (err) {
    console.error('[job-create] Handler error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
