import { getServiceSupabase } from '@/lib/supabase'

/**
 * 에러를 error_logs 테이블에 자동 기록
 * @param {string} category - 'analysis'|'gunghap'|'chat'|'payment'|'auth'|'admin'|'client'|'other'
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
    console.error('[MBTS] 에러 로깅 실패:', e.message)
  }

  // critical errors → webhook alert
  var criticalCategories = ['analysis', 'gunghap']
  if (criticalCategories.indexOf(category) >= 0 && details && details.errorType === 'ai_timeout') {
    try { await sendAlert(category, message, details); } catch(e) {}
  }
}

async function sendAlert(category, message, details) {
  var webhookUrl = process.env.ALERT_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: '🚨 MBTS [' + category + '] ' + String(message).slice(0, 200)
        + '\njobId: ' + (details && details.jobId || 'N/A')
    })
  })
}
