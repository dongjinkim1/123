import Anthropic from '@anthropic-ai/sdk'
import { logError } from '@/lib/errorLog'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

export async function POST(request) {
  console.log('[chat] 요청 시작')

  try {
    const { systemPrompt, messages, model } = await request.json()

    if (!systemPrompt || !messages) {
      return Response.json(
        { error: 'systemPrompt와 messages가 필요합니다.' },
        { status: 400 }
      )
    }

    const useModel = model || MODEL
    console.log(`[chat] 모델: ${useModel}, 메시지 수: ${messages.length}`)

    const stream = await client.messages.create({
      model: useModel,
      max_tokens: 4000,
      stream: true,
      system: systemPrompt,
      messages: messages,
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
          console.error('[chat] 스트림 에러:', err.message)
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
    logError('chat', error.message, { endpoint: '/api/chat' })
    console.error('[chat] 서버 에러:', error)
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
