import crypto from 'crypto'

// 글로벌 토큰 저장소 (token → 생성시간)
const tokenStore = new Map()

// 만료 시간: 24시간
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000

export function generateToken() {
  const token = crypto.randomBytes(16).toString('hex')
  tokenStore.set(token, Date.now())
  return token
}

export function validateToken(token) {
  if (!token || !tokenStore.has(token)) return false
  const created = tokenStore.get(token)
  if (Date.now() - created > TOKEN_EXPIRY_MS) {
    tokenStore.delete(token)
    return false
  }
  return true
}
