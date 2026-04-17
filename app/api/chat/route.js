import Anthropic from '@anthropic-ai/sdk'
import { logError } from '@/lib/errorLog'
import { getServiceSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limiter'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// C11 hardening: rate limit + input shape validation + message count cap.
// Full session auth is TIER 2 — for now we accept optional userId and rate-limit on
// whatever identifier we have (userId if present, else trusted proxy IP).
// This does NOT yet enforce clover deduction — see TIER 2 report.
const MAX_MESSAGES = 40
const MAX_MESSAGE_CHARS = 8000
const MAX_SYSTEM_CHARS = 10000

export async function POST(request) {
  console.log('[chat] 요청 시작')

  try {
    let body
    try { body = await request.json() } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }) }
    const { systemPrompt, messages, model, userId } = body

    if (!systemPrompt || !messages) {
      return Response.json(
        { error: 'systemPrompt와 messages가 필요합니다.' },
        { status: 400 }
      )
    }
    if (typeof systemPrompt !== 'string' || systemPrompt.length > MAX_SYSTEM_CHARS) {
      return Response.json({ error: 'systemPrompt invalid' }, { status: 400 })
    }
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return Response.json({ error: 'messages invalid' }, { status: 400 })
    }
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i]
      if (!m || typeof m !== 'object') return Response.json({ error: 'message shape' }, { status: 400 })
      if (m.role !== 'user' && m.role !== 'assistant') return Response.json({ error: 'invalid role' }, { status: 400 })
      if (typeof m.content !== 'string' || m.content.length > MAX_MESSAGE_CHARS) {
        return Response.json({ error: 'content too long' }, { status: 400 })
      }
    }
    if (userId && (typeof userId !== 'string' || !UUID_RE.test(userId))) {
      return Response.json({ error: 'Invalid userId' }, { status: 400 })
    }

    // rate limit — 30 req/min per identifier (userId or trusted proxy IP)
    const supabase = getServiceSupabase()
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const identifier = userId || vercelIp || realIp || 'unknown'
    const rl = await checkRateLimit(supabase, identifier, 'chat', 60000, 30)
    if (!rl.allowed) {
      return Response.json({ error: '요청 한도 초과', retryAfter: rl.retryAfter }, { status: 429 })
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
