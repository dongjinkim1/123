// 🚫 사용 중지된 레거시 엔드포인트
// 모든 사주 분석은 /api/analyze-v2 로 일원화됨 (rate-limiter + userId 검증 + 결과 캐시).
// engine.js 의 runSajuAnalysis 는 dead path 지만 fallback 시도 시 graceful 실패.

export async function POST() {
  return Response.json(
    { success: false, error: '사용 중지된 엔드포인트입니다.' },
    { status: 410 }
  )
}

export async function GET() {
  return Response.json(
    { success: false, error: '사용 중지된 엔드포인트입니다.' },
    { status: 410 }
  )
}
