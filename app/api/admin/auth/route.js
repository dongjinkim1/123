import { generateToken, validateToken } from '@/lib/adminAuth'

export async function POST(request) {
  try {
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
    console.error('[admin/auth] GET 에러:', error)
    return Response.json(
      { error: '서버 에러' },
      { status: 500 }
    )
  }
}
