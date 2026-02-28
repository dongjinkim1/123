// ====================================================================
// MBTS login.js — 세션 관리 + 테스트 로그인 + 카카오 로그인 틀
// ====================================================================

var mbtsSession = {
  userId: null,
  nickname: null,
  provider: null,
  cloverBalance: 0
};

// ── 세션 저장/불러오기 ──
function saveSession(data) {
  mbtsSession.userId = data.user_id || data.userId || null;
  mbtsSession.nickname = data.nickname || '사용자';
  mbtsSession.provider = data.provider || 'test';
  mbtsSession.cloverBalance = data.clover_balance || data.cloverBalance || 0;
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
      mbtsSession.nickname = parsed.nickname || '사용자';
      mbtsSession.provider = parsed.provider || 'test';
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
  mbtsSession.nickname = null;
  mbtsSession.provider = null;
  mbtsSession.cloverBalance = 0;
  try {
    localStorage.removeItem('mbts_session');
  } catch (e) {}
}

function isLoggedIn() {
  return mbtsSession.userId ? true : false;
}

// ── 세션 체크 (서버 확인) ──
function checkSession(callback) {
  if (!mbtsSession.userId) {
    if (callback) callback(false);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/auth/session?userId=' + encodeURIComponent(mbtsSession.userId));
  xhr.onload = function () {
    try {
      var res = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && res.valid) {
        mbtsSession.cloverBalance = res.clover_balance || 0;
        mbtsSession.nickname = res.nickname || mbtsSession.nickname;
        saveSession(mbtsSession);
        if (callback) callback(true);
      } else {
        clearSession();
        if (callback) callback(false);
      }
    } catch (e) {
      if (callback) callback(false);
    }
  };
  xhr.onerror = function () {
    if (callback) callback(false);
  };
  xhr.send();
}

// ── 테스트 로그인 ──
function doTestLogin() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/auth/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    try {
      var res = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && res.success) {
        saveSession({
          userId: res.user_id,
          nickname: res.nickname,
          provider: 'test',
          cloverBalance: res.clover_balance
        });
        console.log('[MBTS] 테스트 로그인 성공:', res.nickname);
        go('pgDash');
        updateLoginUI();
      } else {
        console.error('[MBTS] 테스트 로그인 실패:', res.error);
        alert('로그인 실패: ' + (res.error || '알 수 없는 오류'));
      }
    } catch (e) {
      console.error('[MBTS] 테스트 로그인 파싱 실패:', e);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };
  xhr.onerror = function () {
    alert('서버 연결에 실패했습니다.');
  };
  xhr.send(JSON.stringify({ provider: 'test' }));
}

// ── 카카오 로그인 (틀만) ──
function doKakaoLogin() {
  if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
    console.warn('[MBTS] Kakao SDK 미초기화 — 테스트 로그인으로 대체');
    doTestLogin();
    return;
  }
  Kakao.Auth.login({
    success: function (authObj) {
      console.log('[MBTS] 카카오 인증 성공:', authObj.access_token ? '토큰 있음' : '토큰 없음');
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/auth/login');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        try {
          var res = JSON.parse(xhr.responseText);
          if (xhr.status === 200 && res.success) {
            saveSession({
              userId: res.user_id,
              nickname: res.nickname,
              provider: 'kakao',
              cloverBalance: res.clover_balance
            });
            console.log('[MBTS] 카카오 로그인 성공:', res.nickname);
            go('pgDash');
            updateLoginUI();
          } else {
            alert('카카오 로그인 실패: ' + (res.error || '알 수 없는 오류'));
          }
        } catch (e) {
          alert('카카오 로그인 중 오류가 발생했습니다.');
        }
      };
      xhr.onerror = function () {
        alert('서버 연결에 실패했습니다.');
      };
      xhr.send(JSON.stringify({
        provider: 'kakao',
        access_token: authObj.access_token
      }));
    },
    fail: function (err) {
      console.error('[MBTS] 카카오 로그인 실패:', err);
      alert('카카오 로그인에 실패했습니다.');
    }
  });
}

// ── 로그아웃 ──
function doLogout() {
  clearSession();
  updateLoginUI();
  go('pgLanding');
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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/api/auth/session?userId=' + encodeURIComponent(mbtsSession.userId));
  xhr.onload = function () {
    try {
      var res = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && res.valid) {
        mbtsSession.cloverBalance = res.clover_balance || 0;
        saveSession(mbtsSession);
        updateLoginUI();
        if (callback) callback(mbtsSession.cloverBalance);
      } else {
        if (callback) callback(0);
      }
    } catch (e) {
      if (callback) callback(0);
    }
  };
  xhr.onerror = function () {
    if (callback) callback(0);
  };
  xhr.send();
}

// ── 초기화 ──
function initLogin() {
  var hasSession = loadSession();
  if (hasSession) {
    checkSession(function (valid) {
      if (valid) {
        console.log('[MBTS] 기존 세션 유효:', mbtsSession.nickname);
        updateLoginUI();
      } else {
        console.log('[MBTS] 기존 세션 만료');
        clearSession();
      }
    });
  }
}

console.log('[MBTS] login.js loaded');
