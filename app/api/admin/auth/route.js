import { generateToken, validateToken } from '@/lib/adminAuth'
import { logError } from '@/lib/errorLog'
import { checkRateLimit } from '@/lib/rate-limiter'
import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    // Brute force 방어: IP 기반 rate limit (60s / 5회)
    const supabase = getServiceSupabase()
    const vercelIp = request.headers.get('x-vercel-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const identifier = vercelIp || realIp || 'unknown'
    const rl = await checkRateLimit(supabase, identifier, 'admin-login', 60000, 5)
    if (!rl.allowed) {
      return Response.json(
        { error: '로그인 시도 초과. 잠시 후 다시 시도하세요.', retryAfter: rl.retryAfter },
        { status: 429 }
      )
    }

    const { password } = await request.json()

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return Response.json(
        { error: '비밀번호가 틀립니다' },
        { status: 401 }
      )
    }

    const token = generateToken()
    return Response.json({ success: true, token: token })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/auth POST' })
    console.error('[admin/auth] 에러:', error)
    return Response.json(
      { error: '서버 에러' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { error: '인증 필요' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    if (!validateToken(token)) {
      return Response.json(
        { error: '토큰이 만료되었거나 유효하지 않습니다' },
        { status: 401 }
      )
    }

    return Response.json({ valid: true })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/auth GET' })
    console.error('[admin/auth] GET 에러:', error)
    return Response.json(
      { error: '서버 에러' },
      { status: 500 }
    )
  }
}
