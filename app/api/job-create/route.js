// 🚫 사용 중지된 레거시 엔드포인트. analyze-v2 / gunghap-v2 가 job 생성을 내재화.

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
