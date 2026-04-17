// ⚠️ 이 중첩 라우트는 비활성화되었습니다.
// 모든 클로버 사용은 /api/clover-use (flat route)를 통해 처리됩니다.
// flat 라우트에는 rate limit, UUID 검증, amount 상한이 적용되어 있습니다.

export async function POST() {
  return Response.json(
    { success: false, error: '이 엔드포인트는 사용 중지되었습니다. /api/clover-use를 사용하세요.' },
    { status: 410 }
  )
}
