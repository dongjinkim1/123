export async function GET(request) {
  var { searchParams } = new URL(request.url)
  var code = searchParams.get('code')
  var redirect_uri = searchParams.get('redirect_uri')

  if (!code) {
    return Response.json({ error: 'code is required' }, { status: 400 })
  }

  var REST_API_KEY = '951d6c9e38404e6e1086ac9f388d5a90'

  try {
    // 인가 코드로 토큰 교환
    var tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: redirect_uri || '',
        code: code,
        client_secret: '9D7mNupeZNAZTd9rbgkWOzBN4sS4R0hp'
      }).toString()
    })

    var tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return Response.json({ error: 'token_failed', detail: tokenData }, { status: 400 })
    }

    // 토큰으로 사용자 정보 조회
    var userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { 'Authorization': 'Bearer ' + tokenData.access_token }
    })

    var userInfo = await userRes.json()

    return Response.json({
      success: true,
      kakao_id: String(userInfo.id),
      nickname: (userInfo.kakao_account && userInfo.kakao_account.profile)
        ? userInfo.kakao_account.profile.nickname : '사용자',
      profile_image: (userInfo.kakao_account && userInfo.kakao_account.profile)
        ? userInfo.kakao_account.profile.profile_image_url : null,
      email: (userInfo.kakao_account && userInfo.kakao_account.email)
        ? userInfo.kakao_account.email : null
    })
  } catch (err) {
    console.error('[kakao-token] Error:', err)
    return Response.json({ error: 'server_error', message: err.message }, { status: 500 })
  }
}
