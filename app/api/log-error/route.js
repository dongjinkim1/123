import { logError } from '@/lib/errorLog'
import { getServiceSupabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/rate-limiter'

export async function POST(request) {
  try {
    // Rate limit: 10 req/min per IP — prevent error_logs flood
    const supabase = getServiceSupabase()
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const identifier = vercelIp || realIp || 'unknown'
    const rl = await checkRateLimit(supabase, identifier, 'log-error', 60000, 10)
    if (!rl.allowed) {
      return Response.json({ ok: false, error: 'rate_limit' }, { status: 429 })
    }

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
