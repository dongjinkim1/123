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
      mbtsSession.signedUpAt = parsed.signedUpAt || null;
      mbtsSession.isNew = parsed.isNew === true;
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
  var REST_API_KEY = '951d6c9e38404e6e1086ac9f388d5a90';
  var redirectUri = window.location.origin + '/auth/kakao/callback';

  // C5: CSRF state — generate random, persist in sessionStorage, verify on callback
  var state;
  try {
    if (window.crypto && window.crypto.getRandomValues) {
      var buf = new Uint8Array(16);
      window.crypto.getRandomValues(buf);
      state = Array.prototype.map.call(buf, function(b) { return ('0' + b.toString(16)).slice(-2); }).join('');
    } else {
      state = String(Date.now()) + Math.random().toString(36).slice(2, 12);
    }
    sessionStorage.setItem('mbts_oauth_state', state);
  } catch(e) {
    state = String(Date.now());
  }

  var kakaoAuthUrl = 'https://kauth.kakao.com/oauth/authorize'
    + '?client_id=' + REST_API_KEY
    + '&redirect_uri=' + encodeURIComponent(redirectUri)
    + '&response_type=code'
    + '&state=' + encodeURIComponent(state)
    + '&scope=profile_nickname,profile_image';

  window.location.href = kakaoAuthUrl;
}

// ── 로그인 성공 후 처리 ──
function onLoginSuccess() {
  updateLoginUI();
  // 레퍼럴 보상 처리 (A:추천인 +2, B:신규유저 +2)
  // M13: remove the key BEFORE the fetch so interrupted/failed calls can't re-fire on next login.
  // Server still needs idempotency (TIER 2), but this closes the client-side duplication vector.
  try {
    var ref = localStorage.getItem('mbts_referrer');
    if (ref && ref !== mbtsSession.userId) {
      localStorage.removeItem('mbts_referrer'); // consume immediately (M13)
      fetch('/api/referral-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referrerId: ref, newUserId: mbtsSession.userId })
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          console.log('[MBTS] 레퍼럴 보상 지급 완료 (양쪽 +2)');
          // 내 잔액도 +2 반영
          mbtsSession.cloverBalance = (mbtsSession.cloverBalance || 0) + 2;
          saveSession(mbtsSession);
          if (typeof updateLoginUI === 'function') updateLoginUI();
          if (typeof showToast === 'function') showToast('🎁 초대 보너스 +2잎!');
        }
      })
      .catch(function(e) { console.warn('[MBTS] 레퍼럴 처리 실패:', e); });
    }
  } catch(e) {}
  if (typeof go === 'function') go('pgDash');
  if (typeof showToast === 'function') {
    showToast('환영합니다, ' + mbtsSession.nickname + '님! 🍀');
  }
}

// ── 테스트 로그인 (개발용) ──
function doTestLogin() {
  fetch('/api/auth-kakao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kakaoId: 'test_user_001', nickname: '테스트유저' })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success && data.user) {
      var u = data.user;
      saveSession({
        userId: u.id,
        kakaoId: u.kakaoId,
        nickname: u.nickname || '테스트유저',
        provider: 'test',
        cloverBalance: u.cloverBalance || 0
      });
      onLoginSuccess();
    } else {
      console.error('[MBTS] 테스트 로그인 실패:', data.error);
    }
  })
  .catch(function(err) {
    console.error('[MBTS] 테스트 로그인 API 오류:', err);
  });
}

// ── 세션 체크 (서버 API에서 최신 잔액 확인) ──
function checkSession(callback) {
  if (!mbtsSession.userId) {
    if (callback) callback(false);
    return;
  }

  // 신규 가입 직후 10초간 Supabase replica 지연으로 success:false 올 수 있음 → 세션 유지
  var isGracePeriod = !!(mbtsSession.signedUpAt && (Date.now() - mbtsSession.signedUpAt < 10000));

  fetch('/api/clover-balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: mbtsSession.userId })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      mbtsSession.cloverBalance = data.balance;
      mbtsSession.nickname = data.nickname || mbtsSession.nickname;
      saveSession(mbtsSession);
      updateLoginUI();
      if (callback) callback(true);
    } else {
      if (isGracePeriod) {
        console.log('[MBTS] 신규 가입 grace period — 세션 유지');
        if (callback) callback(true);
        return;
      }
      clearSession();
      if (callback) callback(false);
    }
  })
  .catch(function() {
    if (isGracePeriod) {
      if (callback) callback(true);
      return;
    }
    if (callback) callback(false);
  });
}

// ── 로그아웃 ──
function doLogout() {
  // 카카오 로그아웃
  if (typeof Kakao !== 'undefined' && Kakao.isInitialized() && Kakao.Auth.getAccessToken()) {
    try { Kakao.Auth.logout(function() { console.log('[MBTS] 카카오 로그아웃'); }); } catch(e) {}
  }
  clearSession();
  // Extended cleanup for shared-device privacy
  try { sessionStorage.removeItem('mbts_oauth_state'); } catch(e) {}
  try { localStorage.removeItem('mbts_referrer'); } catch(e) {}
  try { localStorage.removeItem('mbts_history'); } catch(e) {}
  try { localStorage.removeItem('mbts_gh_history'); } catch(e) {}
  try { localStorage.removeItem('mbts_active_job'); } catch(e) {}
  try { localStorage.removeItem('mbts_lastResult'); } catch(e) {}
  try { localStorage.removeItem('mbts_chat_me'); } catch(e) {}
  try { localStorage.removeItem('mbts_chat_count'); } catch(e) {}
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
  if (!mbtsSession.userId) {
    if (callback) callback(0);
    return;
  }

  fetch('/api/clover-balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: mbtsSession.userId })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      mbtsSession.cloverBalance = data.balance;
      saveSession(mbtsSession);
      updateLoginUI();
      if (callback) callback(data.balance);
    } else {
      if (callback) callback(0);
    }
  })
  .catch(function() {
    if (callback) callback(0);
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
        if (typeof go === 'function') go('pgLanding');
      }
    });
  }
}

console.log('[MBTS] login.js loaded (Kakao + Supabase)');
