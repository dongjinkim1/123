exports.handler = async function(event) {
  const { code, redirect_uri } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'code is required' })
    };
  }

  const REST_API_KEY = '951d6c9e38404e6e1086ac9f388d5a90';

  try {
    // 인가 코드로 토큰 교환
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: redirect_uri || '',
        code: code
      }).toString()
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'token_failed', detail: tokenData })
      };
    }

    // 토큰으로 사용자 정보 조회
    const userRes = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: { 'Authorization': 'Bearer ' + tokenData.access_token }
    });

    const userInfo = await userRes.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        kakao_id: String(userInfo.id),
        nickname: (userInfo.kakao_account && userInfo.kakao_account.profile)
          ? userInfo.kakao_account.profile.nickname : '사용자',
        profile_image: (userInfo.kakao_account && userInfo.kakao_account.profile)
          ? userInfo.kakao_account.profile.profile_image_url : null,
        email: (userInfo.kakao_account && userInfo.kakao_account.email)
          ? userInfo.kakao_account.email : null
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'server_error', message: err.message })
    };
  }
};
