import Anthropic from '@anthropic-ai/sdk'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

export async function POST(request) {
  console.log('[gunghap-analyze] 요청 시작')

  try {
    const { systemPrompt, userPrompt, model } = await request.json()

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
    console.log(`[gunghap-analyze] 모델: ${useModel}`)

    const stream = await client.messages.create({
      model: useModel,
      max_tokens: 16000,
      stream: true,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          console.error('[gunghap-analyze] 스트림 에러:', err.message)
          const errEvent = { type: 'error', error: { message: err.message } }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errEvent)}\n\n`))
          controller.close()
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
    logError('gunghap', error.message, { endpoint: '/api/gunghap-analyze' })
    console.error('[gunghap-analyze] 서버 에러:', error)
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
