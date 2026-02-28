// ============================================================
// payment.js — MBTS 클로버 결제/충전/차감
// 실결제(토스/카카오페이)는 틀만 — 결정 후 채움
// engine.js, gunghap.js, login.js 절대 건드리지 않음
// ============================================================

// ===== 클로버 잔액 확인 =====
function getCloverBalance() {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user) return 0;
  return user.clover_balance || 0;
}

// ===== 클로버 차감 (분석/채팅 실행 전 호출) =====
// amount: 차감할 잎 수, type: 'saju'|'gunghap'|'chat'
// 성공하면 true, 실패하면 false 반환 (콜백 방식)
function useClover(amount, type, callback) {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user || !user.id) {
    if (typeof showToast === 'function') showToast('로그인이 필요합니다');
    if (typeof go === 'function') go('pgLogin');
    if (callback) callback(false);
    return;
  }

  var balance = user.clover_balance || 0;
  if (balance < amount) {
    if (typeof showToast === 'function') showToast('클로버가 부족합니다 🍀 (' + balance + '/' + amount + ')');
    showChargeModal();
    if (callback) callback(false);
    return;
  }

  fetch('/api/clover/use', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.id,
      amount: amount,
      type: type || 'saju',
      description: getCloverTypeLabel(type) + ' 분석'
    })
  }).then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.success) {
      // 로컬 잔액 업데이트
      if (typeof mbtsUser !== 'undefined' && mbtsUser) {
        mbtsUser.clover_balance = d.newBalance;
        try { localStorage.setItem('mbts_user', JSON.stringify(mbtsUser)); } catch(e) {}
      }
      if (typeof applyLoginState === 'function') applyLoginState();
      if (callback) callback(true, d.newBalance);
    } else {
      if (d.insufficient) {
        if (typeof showToast === 'function') showToast('클로버가 부족합니다');
        showChargeModal();
      } else {
        if (typeof showToast === 'function') showToast('클로버 차감 실패: ' + (d.error || ''));
      }
      if (callback) callback(false);
    }
  }).catch(function(e) {
    console.error('[MBTS] 클로버 차감 실패:', e);
    if (typeof showToast === 'function') showToast('서버 연결 실패');
    if (callback) callback(false);
  });
}

function getCloverTypeLabel(type) {
  var labels = { saju: '사주', gunghap: '궁합', chat: '달토 채팅' };
  return labels[type] || '서비스';
}

// ===== 충전 모달 열기 =====
function showChargeModal() {
  var modal = document.getElementById('chargeModal');
  if (modal) modal.style.display = 'flex';
}

// ===== 충전 모달 닫기 =====
function hideChargeModal() {
  var modal = document.getElementById('chargeModal');
  if (modal) modal.style.display = 'none';
}

// ===== 충전 패키지 선택 =====
var selectedChargeAmount = 0;
var selectedChargePrice = 0;

function selectChargePkg(el) {
  // 기존 선택 해제
  var pkgs = document.querySelectorAll('.charge-pkg');
  for (var i = 0; i < pkgs.length; i++) {
    pkgs[i].style.border = '1.5px solid var(--border)';
    pkgs[i].style.background = '#fff';
  }
  el.style.border = '1.5px solid #2D9D78';
  el.style.background = 'rgba(200,235,210,0.3)';

  // 패키지 정보 추출
  var amountEl = el.querySelector('[data-clover-amount]');
  var priceEl = el.querySelector('[data-clover-price]');
  if (amountEl) selectedChargeAmount = parseInt(amountEl.getAttribute('data-clover-amount')) || 0;
  if (priceEl) selectedChargePrice = parseInt(priceEl.getAttribute('data-clover-price')) || 0;
}

// ===== 충전 실행 (결제 연동 틀) =====
function doCharge() {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user || !user.id) {
    if (typeof showToast === 'function') showToast('로그인이 필요합니다');
    return;
  }

  if (selectedChargeAmount <= 0) {
    if (typeof showToast === 'function') showToast('충전할 패키지를 선택하세요');
    return;
  }

  // ========================================
  // TODO: 실결제 연동 (토스페이먼츠 or 카카오페이)
  // 아래는 테스트용 즉시 충전 — 결제 연동 후 교체
  // ========================================
  if (!confirm('🍀 ' + selectedChargeAmount + '잎 충전 (₩' + selectedChargePrice.toLocaleString() + ')\n\n⚠️ 현재 테스트 모드: 무료 충전됩니다.')) return;

  fetch('/api/clover/charge', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user.id,
      amount: selectedChargeAmount,
      price: selectedChargePrice,
      paymentMethod: 'test'
    })
  }).then(function(r) { return r.json(); })
  .then(function(d) {
    if (d.success) {
      if (typeof mbtsUser !== 'undefined' && mbtsUser) {
        mbtsUser.clover_balance = d.newBalance;
        try { localStorage.setItem('mbts_user', JSON.stringify(mbtsUser)); } catch(e) {}
      }
      if (typeof applyLoginState === 'function') applyLoginState();
      hideChargeModal();
      if (typeof showToast === 'function') showToast('🍀 ' + selectedChargeAmount + '잎 충전 완료! 잔액: ' + d.newBalance + '잎');
      // 클로버 내역 새로고침
      loadCloverHistory();
    } else {
      if (typeof showToast === 'function') showToast('충전 실패: ' + (d.error || ''));
    }
  }).catch(function(e) {
    console.error('[MBTS] 충전 실패:', e);
    if (typeof showToast === 'function') showToast('서버 연결 실패');
  });
}

// ===== 내 클로버 내역 로드 =====
function loadCloverHistory() {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user || !user.id) return;

  var historyEl = document.getElementById('cloverHistoryList');
  if (!historyEl) return;

  fetch('/api/clover/history?userId=' + user.id)
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (!d.success || !d.history || d.history.length === 0) {
      historyEl.innerHTML = '<div style="text-align:center;color:var(--text-3);padding:20px;font-size:13px">아직 내역이 없어요</div>';
      return;
    }
    var html = '';
    for (var i = 0; i < d.history.length; i++) {
      var h = d.history[i];
      var isPlus = h.amount > 0;
      var dateStr = '';
      if (h.created_at) {
        var dt = new Date(h.created_at);
        dateStr = dt.getFullYear() + '.' + (dt.getMonth() + 1 < 10 ? '0' : '') + (dt.getMonth() + 1) + '.' + (dt.getDate() < 10 ? '0' : '') + dt.getDate();
      }
      html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border)">';
      html += '<div><div style="font-size:14px;font-weight:600">' + (h.description || (isPlus ? '클로버 충전' : '클로버 사용')) + '</div>';
      html += '<div style="font-size:11px;color:var(--text-3);margin-top:2px">' + dateStr + '</div></div>';
      html += '<div style="font-size:16px;font-weight:800;color:' + (isPlus ? '#2D9D78' : '#E05A5A') + '">' + (isPlus ? '+' : '') + h.amount + '🍀</div>';
      html += '</div>';
    }
    historyEl.innerHTML = html;
  }).catch(function(e) {
    console.warn('[MBTS] 클로버 내역 조회 실패:', e);
  });
}

// ===== 클로버 잔액 충분한지 간단 체크 (동기) =====
function hasEnoughClover(amount) {
  return getCloverBalance() >= amount;
}

console.log('[MBTS] payment.js loaded');
