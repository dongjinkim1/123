// ====================================================================
// MBTS login.js — 카카오 로그인 + Supabase 연동
// ====================================================================

var mbtsSession = {
  userId: null,
  kakaoId: null,
  nickname: null,
  profileImage: null,
  provider: null,
  cloverBalance: 0
};

// ── 세션 저장/불러오기 ──
function saveSession(data) {
  mbtsSession.userId = data.userId || data.user_id || null;
  mbtsSession.kakaoId = data.kakaoId || data.kakao_id || null;
  mbtsSession.nickname = data.nickname || '사용자';
  mbtsSession.profileImage = data.profileImage || data.profile_image || null;
  mbtsSession.provider = data.provider || 'kakao';
  mbtsSession.cloverBalance = data.cloverBalance || data.clover_balance || 0;
  try {
    localStorage.setItem('mbts_session', JSON.stringify(mbtsSession));
  } catch (e) {
    console.warn('[MBTS] 세션 저장 실패:', e);
  }
}

function loadSession() {
  try {
    var raw = localStorage.getItem('mbts_session');
    if (raw) {
      var parsed = JSON.parse(raw);
      mbtsSession.userId = parsed.userId || null;
      mbtsSession.kakaoId = parsed.kakaoId || null;
      mbtsSession.nickname = parsed.nickname || '사용자';
      mbtsSession.profileImage = parsed.profileImage || null;
      mbtsSession.provider = parsed.provider || 'kakao';
      mbtsSession.cloverBalance = parsed.cloverBalance || 0;
      return mbtsSession.userId ? true : false;
    }
  } catch (e) {
    console.warn('[MBTS] 세션 불러오기 실패:', e);
  }
  return false;
}

function clearSession() {
  mbtsSession.userId = null;
  mbtsSession.kakaoId = null;
  mbtsSession.nickname = null;
  mbtsSession.profileImage = null;
  mbtsSession.provider = null;
  mbtsSession.cloverBalance = 0;
  try { localStorage.removeItem('mbts_session'); } catch (e) {}
}

function isLoggedIn() {
  return mbtsSession.userId ? true : false;
}

// ── 카카오 로그인 → Supabase 유저 생성/조회 ──
function doKakaoLogin() {
  if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
    console.warn('[MBTS] Kakao SDK 미초기화 — 테스트 로그인으로 대체');
    doTestLogin();
    return;
  }

  Kakao.Auth.login({
    success: function(authObj) {
      console.log('[MBTS] 카카오 인증 성공');
      // 카카오 사용자 정보 가져오기
      Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          var kakaoId = String(res.id);
          var nickname = (res.kakao_account && res.kakao_account.profile)
            ? res.kakao_account.profile.nickname : '사용자';
          var profileImage = (res.kakao_account && res.kakao_account.profile)
            ? res.kakao_account.profile.profile_image_url : null;
          var email = (res.kakao_account && res.kakao_account.email)
            ? res.kakao_account.email : null;

          console.log('[MBTS] 카카오 사용자:', nickname, kakaoId);

          // Supabase에서 기존 유저 찾기 or 신규 생성
          upsertKakaoUser(kakaoId, nickname, profileImage, email);
        },
        fail: function(err) {
          console.error('[MBTS] 카카오 사용자 정보 실패:', err);
          if (typeof showToast === 'function') showToast('카카오 로그인 실패');
        }
      });
    },
    fail: function(err) {
      console.error('[MBTS] 카카오 로그인 실패:', err);
      if (typeof showToast === 'function') showToast('카카오 로그인에 실패했습니다');
    }
  });
}

// ── Supabase 유저 생성/조회 ──
function upsertKakaoUser(kakaoId, nickname, profileImage, email) {
  if (typeof supabase === 'undefined') {
    console.error('[MBTS] Supabase 미초기화');
    return;
  }

  // 1) 기존 유저 조회
  supabase
    .from('users')
    .select('*')
    .eq('kakao_id', kakaoId)
    .maybeSingle()
    .then(function(result) {
      if (result.error) {
        console.error('[MBTS] 유저 조회 실패:', result.error);
        if (typeof showToast === 'function') showToast('로그인 중 오류 발생');
        return;
      }

      if (result.data) {
        // 기존 유저 — 닉네임/프로필 업데이트
        var user = result.data;
        supabase
          .from('users')
          .update({ nickname: nickname, profile_image: profileImage })
          .eq('id', user.id)
          .then(function() {
            console.log('[MBTS] 기존 유저 로그인:', nickname);
            saveSession({
              userId: user.id,
              kakaoId: kakaoId,
              nickname: nickname,
              profileImage: profileImage,
              provider: 'kakao',
              cloverBalance: user.clover_balance || 0
            });
            onLoginSuccess();
          });
      } else {
        // 신규 유저 — 생성 (클로버 50개 보너스)
        supabase
          .from('users')
          .insert({
            kakao_id: kakaoId,
            nickname: nickname,
            profile_image: profileImage,
            email: email,
            clover_balance: 50,
            role: 'user'
          })
          .select()
          .single()
          .then(function(insertResult) {
            if (insertResult.error) {
              console.error('[MBTS] 유저 생성 실패:', insertResult.error);
              if (typeof showToast === 'function') showToast('계정 생성 실패');
              return;
            }
            var newUser = insertResult.data;
            console.log('[MBTS] 신규 유저 생성:', nickname, '🍀 50잎 지급');
            saveSession({
              userId: newUser.id,
              kakaoId: kakaoId,
              nickname: nickname,
              profileImage: profileImage,
              provider: 'kakao',
              cloverBalance: 50
            });

            // 신규가입 클로버 내역 기록
            supabase.from('clover_history').insert({
              user_id: newUser.id,
              amount: 50,
              balance_after: 50,
              type: 'signup_bonus',
              description: '🎉 가입 축하 보너스'
            }).then(function() {
              console.log('[MBTS] 가입 보너스 내역 기록 완료');
            });

            onLoginSuccess();
          });
      }
    });
}

// ── 로그인 성공 후 처리 ──
function onLoginSuccess() {
  updateLoginUI();
  if (typeof go === 'function') go('pgDash');
  if (typeof showToast === 'function') {
    showToast('환영합니다, ' + mbtsSession.nickname + '님! 🍀');
  }
}

// ── 테스트 로그인 (개발용) ──
function doTestLogin() {
  if (typeof supabase === 'undefined') {
    console.error('[MBTS] Supabase 미초기화');
    return;
  }

  var testKakaoId = 'test_user_001';

  supabase
    .from('users')
    .select('*')
    .eq('kakao_id', testKakaoId)
    .maybeSingle()
    .then(function(result) {
      if (result.data) {
        // 기존 테스트 유저
        var user = result.data;
        saveSession({
          userId: user.id,
          kakaoId: testKakaoId,
          nickname: user.nickname || '테스트유저',
          provider: 'test',
          cloverBalance: user.clover_balance || 0
        });
        onLoginSuccess();
      } else {
        // 테스트 유저 생성
        supabase
          .from('users')
          .insert({
            kakao_id: testKakaoId,
            nickname: '테스트유저',
            clover_balance: 50,
            role: 'user'
          })
          .select()
          .single()
          .then(function(insertResult) {
            if (insertResult.error) {
              console.error('[MBTS] 테스트 유저 생성 실패:', insertResult.error);
              return;
            }
            var newUser = insertResult.data;
            saveSession({
              userId: newUser.id,
              kakaoId: testKakaoId,
              nickname: '테스트유저',
              provider: 'test',
              cloverBalance: 50
            });
            onLoginSuccess();
          });
      }
    });
}

// ── 세션 체크 (Supabase에서 최신 잔액 확인) ──
function checkSession(callback) {
  if (!mbtsSession.userId) {
    if (callback) callback(false);
    return;
  }

  if (typeof supabase === 'undefined') {
    if (callback) callback(false);
    return;
  }

  supabase
    .from('users')
    .select('clover_balance, nickname')
    .eq('id', mbtsSession.userId)
    .maybeSingle()
    .then(function(result) {
      if (result.data) {
        mbtsSession.cloverBalance = result.data.clover_balance || 0;
        mbtsSession.nickname = result.data.nickname || mbtsSession.nickname;
        saveSession(mbtsSession);
        updateLoginUI();
        if (callback) callback(true);
      } else {
        clearSession();
        if (callback) callback(false);
      }
    });
}

// ── 로그아웃 ──
function doLogout() {
  // 카카오 로그아웃
  if (typeof Kakao !== 'undefined' && Kakao.isInitialized() && Kakao.Auth.getAccessToken()) {
    try { Kakao.Auth.logout(function() { console.log('[MBTS] 카카오 로그아웃'); }); } catch(e) {}
  }
  clearSession();
  updateLoginUI();
  if (typeof go === 'function') go('pgLanding');
  console.log('[MBTS] 로그아웃 완료');
}

// ── UI 업데이트 ──
function updateLoginUI() {
  var balanceEls = document.querySelectorAll('.clover-balance-display');
  for (var i = 0; i < balanceEls.length; i++) {
    balanceEls[i].textContent = mbtsSession.cloverBalance;
  }
  var nicknameEls = document.querySelectorAll('.user-nickname-display');
  for (var j = 0; j < nicknameEls.length; j++) {
    nicknameEls[j].textContent = mbtsSession.nickname || '사용자';
  }
}

// ── 클로버 잔액 새로고침 ──
function refreshCloverBalance(callback) {
  if (!mbtsSession.userId || typeof supabase === 'undefined') {
    if (callback) callback(0);
    return;
  }

  supabase
    .from('users')
    .select('clover_balance')
    .eq('id', mbtsSession.userId)
    .maybeSingle()
    .then(function(result) {
      if (result.data) {
        mbtsSession.cloverBalance = result.data.clover_balance || 0;
        saveSession(mbtsSession);
        updateLoginUI();
        if (callback) callback(mbtsSession.cloverBalance);
      } else {
        if (callback) callback(0);
      }
    });
}

// ── 초기화 ──
function initLogin() {
  var hasSession = loadSession();
  if (hasSession) {
    checkSession(function(valid) {
      if (valid) {
        console.log('[MBTS] 기존 세션 유효:', mbtsSession.nickname, '🍀', mbtsSession.cloverBalance);
        updateLoginUI();
      } else {
        console.log('[MBTS] 기존 세션 만료');
        clearSession();
      }
    });
  }
}

console.log('[MBTS] login.js loaded (Kakao + Supabase)');
