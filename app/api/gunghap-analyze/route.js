// 🚫 사용 중지된 레거시 엔드포인트. 궁합 분석은 /api/gunghap-v2 로 일원화.

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
