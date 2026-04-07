import Anthropic from '@anthropic-ai/sdk'
import { logError } from '@/lib/errorLog'
import { getServiceSupabase } from '@/lib/supabase'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

function isValidJSON(text) {
  if (!text || text.length < 100) return false
  try {
    const cleaned = text.replace(/```json|```/g, '').trim()
    let target = cleaned
    const fb = cleaned.indexOf('{')
    const lb = cleaned.lastIndexOf('}')
    if (fb >= 0 && lb > fb) target = cleaned.substring(fb, lb + 1)
    const obj = JSON.parse(target)
    return !!(obj && obj.categories && obj.categories.length > 0)
  } catch (e) {
    return false
  }
}

export async function POST(request) {
  console.log('[analyze] 요청 시작')
  let jobId = null
  let inputParams = null

  try {
    const body = await request.json()
    const { systemPrompt, userPrompt, model } = body
    jobId = body.jobId || null
    inputParams = body.inputParams || null

    if (!systemPrompt || !userPrompt) {
      return Response.json(
        { error: 'systemPrompt와 userPrompt가 필요합니다.' },
        { status: 400 }
      )
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
    console.log(`[analyze] 모델: ${useModel}`)

    const stream = await client.messages.create({
      model: useModel,
      max_tokens: 30000,
      temperature: 0.6,
      stream: true,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    let fullText = ''
    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta?.text) {
              fullText += event.delta.text
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()

          // ★ Supabase 보험 저장
          if (jobId && fullText.length > 100) {
            try {
              const supabase = getServiceSupabase()
              const isComplete = isValidJSON(fullText)
              await supabase.from('analysis_jobs').upsert({
                id: jobId,
                type: 'saju',
                status: isComplete ? 'done' : 'partial',
                params: inputParams || {},
                result: { text: fullText, length: fullText.length },
                error: isComplete ? null : 'incomplete_json',
                updated_at: new Date().toISOString()
              })
              console.log('[analyze] Supabase 보험 저장 완료 (' + (isComplete ? 'done' : 'partial') + ', ' + fullText.length + '자)')
            } catch (dbErr) {
              console.error('[analyze] Supabase 저장 실패:', dbErr.message)
            }
          }
        } catch (err) {
          console.error('[analyze] 스트림 에러:', err.message)
          const errEvent = { type: 'error', error: { message: err.message } }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`))
          controller.close()

          // ★ 스트림 에러도 Supabase 기록
          if (jobId) {
            try {
              const supabase = getServiceSupabase()
              await supabase.from('analysis_jobs').upsert({
                id: jobId,
                type: 'saju',
                status: 'failed',
                params: inputParams || {},
                error: err.message || 'stream_error',
                updated_at: new Date().toISOString()
              })
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
    logError('analysis', error.message, { endpoint: '/api/analyze' })
    console.error('[analyze] 서버 에러:', error)
    // ★ 서버 에러도 Supabase 기록
    if (jobId) {
      try {
        const supabase = getServiceSupabase()
        await supabase.from('analysis_jobs').upsert({
          id: jobId,
          type: 'saju',
          status: 'failed',
          params: inputParams || {},
          error: error.message || 'server_error',
          updated_at: new Date().toISOString()
        })
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
