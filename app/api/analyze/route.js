import Anthropic from '@anthropic-ai/sdk'
import { logError } from '@/lib/errorLog'
import { getServiceSupabase } from '@/lib/supabase'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

export async function POST(request) {
  console.log('[analyze] 요청 시작')

  // jobId를 쿼리 파라미터에서 추출
  const url = new URL(request.url)
  const jobId = url.searchParams.get('jobId')

  try {
    const { systemPrompt, userPrompt, model } = await request.json()

    if (!systemPrompt || !userPrompt) {
      return Response.json(
        { error: 'systemPrompt와 userPrompt가 필요합니다.' },
        { status: 400 }
      )
    }

    // job 상태 업데이트: processing
    if (jobId) {
      try {
        const sb = getServiceSupabase()
        await sb.from('analysis_jobs').update({
          status: 'processing',
          started_at: new Date().toISOString()
        }).eq('id', jobId)
      } catch (e) { console.warn('[analyze] job status update failed:', e.message) }
    }

    // JSON 응답 강제 지시 추가
    const finalSystemPrompt = systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character of your response MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown (```), NO comments, NO apologies, NO preamble\n' +
      '5. All string values must use proper JSON escaping (\\n for newlines, \\\\ for backslash, \\" for quotes)\n' +
      '6. Violation = system crash. Comply exactly.'

    const useModel = model || MODEL
    console.log(`[analyze] 모델: ${useModel}, jobId: ${jobId || 'none'}`)

    const stream = await client.messages.create({
      model: useModel,
      max_tokens: 30000,
      temperature: 0.6,
      stream: true,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    // 스트리밍 텍스트 누적용
    let fullText = ''

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            // 텍스트 누적 (job 저장용)
            if (jobId && event.type === 'content_block_delta' && event.delta && event.delta.text) {
              fullText += event.delta.text
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()

          // ── 핵심: 스트리밍 완료 후 결과를 Supabase에 저장 ──
          if (jobId) {
            try {
              const sb = getServiceSupabase()
              let resultJson = null
              try { resultJson = JSON.parse(fullText) } catch (e) {
                const fb = fullText.indexOf('{'), lb = fullText.lastIndexOf('}')
                if (fb >= 0 && lb > fb) {
                  try { resultJson = JSON.parse(fullText.substring(fb, lb + 1)) } catch (e2) {}
                }
              }
              await sb.from('analysis_jobs').update({
                status: 'done',
                result_text: fullText,
                result_json: resultJson,
                completed_at: new Date().toISOString()
              }).eq('id', jobId)
              console.log('[analyze] job 결과 저장 완료:', jobId)
            } catch (e) { console.warn('[analyze] job 결과 저장 실패:', e.message) }
          }
        } catch (err) {
          console.error('[analyze] 스트림 에러:', err.message)
          const errEvent = { type: 'error', error: { message: err.message } }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`))
          controller.close()

          // 에러 시에도 job 상태 업데이트
          if (jobId) {
            try {
              const sb = getServiceSupabase()
              await sb.from('analysis_jobs').update({
                status: 'error',
                error_message: err.message,
                completed_at: new Date().toISOString()
              }).eq('id', jobId)
            } catch (e) {}
          }
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    logError('analysis', error.message, { endpoint: '/api/analyze', jobId })
    console.error('[analyze] 서버 에러:', error)

    // 에러 시 job 상태 업데이트
    if (jobId) {
      try {
        const sb = getServiceSupabase()
        await sb.from('analysis_jobs').update({
          status: 'error',
          error_message: error.message,
          completed_at: new Date().toISOString()
        }).eq('id', jobId)
      } catch (e) {}
    }

    if (error.status === 529 || (error.error && error.error.type === 'overloaded_error')) {
      return Response.json(
        { error: 'overloaded_error' },
        { status: 529 }
      )
    }
    return Response.json(
      { error: '서버 내부 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}
