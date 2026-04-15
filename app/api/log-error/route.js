import { logError } from '@/lib/errorLog'

export async function POST(request) {
  try {
    const { type, message, context } = await request.json()

    if (!message) {
      return Response.json({ error: 'Missing message' }, { status: 400 })
    }

    await logError(
      type || 'client',
      String(message).slice(0, 500),
      { ...context, source: 'client' }
    )

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ ok: false }, { status: 500 })
  }
}
