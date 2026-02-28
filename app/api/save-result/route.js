import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  console.log('[save-result] 요청 시작')

  try {
    const { userId, birthData, mbti, mbtiIntensity, resultJson, sajuSummary } = await request.json()

    if (!userId || !birthData || !mbti || !resultJson) {
      return Response.json(
        { error: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()

    const { data, error } = await supabase
      .from('saju_results')
      .insert({
        user_id: userId,
        birth_year: birthData.year,
        birth_month: birthData.month,
        birth_day: birthData.day,
        birth_hour: birthData.hour,
        birth_minute: birthData.minute,
        gender: birthData.gender,
        mbti: mbti,
        mbti_intensity: mbtiIntensity,
        result_json: resultJson,
        saju_summary: sajuSummary,
        is_paid: true,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[save-result] Supabase 에러:', error)
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    console.log('[save-result] 저장 완료, id:', data.id)
    return Response.json({ success: true, id: data.id })
  } catch (error) {
    logError('other', error.message, { endpoint: '/api/save-result' })
    console.error('[save-result] 서버 에러:', error)
    return Response.json(
      { error: '서버 내부 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}
