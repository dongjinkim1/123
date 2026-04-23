import crypto from 'crypto'
import { getServiceSupabase } from '@/lib/supabase'

// 24시간 만료. admin_tokens 테이블에 영속 저장 (Vercel cold start 생존).
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000

export async function generateToken() {
  const token = crypto.randomBytes(16).toString('hex')
  const supabase = getServiceSupabase()
  const { error } = await supabase.from('admin_tokens').insert({ token })
  if (error) {
    console.error('[adminAuth] token insert 실패:', error)
    throw error
  }
  return token
}

export async function validateToken(token) {
  if (!token) return false
  const supabase = getServiceSupabase()
  const { data, error } = await supabase
    .from('admin_tokens')
    .select('token, created_at')
    .eq('token', token)
    .maybeSingle()
  if (error || !data) return false
  const age = Date.now() - new Date(data.created_at).getTime()
  if (age > TOKEN_EXPIRY_MS) {
    // 만료 — 정리
    await supabase.from('admin_tokens').delete().eq('token', token)
    return false
  }
  return true
}
