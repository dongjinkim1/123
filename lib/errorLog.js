import { getServiceSupabase } from '@/lib/supabase'

/**
 * 에러를 error_logs 테이블에 자동 기록
 * @param {string} category - 'analysis'|'gunghap'|'chat'|'payment'|'auth'|'admin'|'other'
 * @param {string} message - 에러 메시지
 * @param {object} details - 추가 정보 (user_id, request body 등)
 */
export async function logError(category, message, details) {
  try {
    var supabase = getServiceSupabase()
    await supabase.from('error_logs').insert({
      category: category || 'other',
      message: String(message || 'Unknown error').slice(0, 1000),
      details: details ? JSON.stringify(details).slice(0, 5000) : null,
      is_resolved: false,
      created_at: new Date().toISOString()
    })
  } catch (e) {
    // 에러 로깅 자체가 실패해도 앱은 중단하지 않음
    console.error('[MBTS] 에러 로깅 실패:', e.message)
  }
}
