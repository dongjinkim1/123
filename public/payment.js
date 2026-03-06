// ============================================================
// payment.js — MBTS 클로버 결제/충전/차감 (Supabase 직접 연결)
// engine.js, saju.js, fortune_data.js 절대 건드리지 않음
// ============================================================

// ===== 클로버 잔액 확인 =====
function getCloverBalance() {
  if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.cloverBalance) {
    return mbtsSession.cloverBalance;
  }
  return 0;
}

// ===== 클로버 차감 (분석/채팅 실행 전 호출) =====
function useClover(amount, type, callback) {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user || !user.id) {
    if (typeof showToast === 'function') showToast('로그인이 필요합니다');
    if (typeof go === 'function') go('pgLogin');
    if (callback) callback(false);
    return;
  }

  fetch('/api/clover-use', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user.id, amount: amount, type: type })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.success) {
      // 로컬 잔액 업데이트
      if (typeof mbtsSession !== 'undefined') {
        mbtsSession.cloverBalance = data.balance;
        try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
      }
      if (typeof updateLoginUI === 'function') updateLoginUI();
      console.log('[MBTS] 클로버 차감 완료, 잔액:', data.balance);
      if (callback) callback(true, data.balance);
    } else if (data.error === 'Insufficient clover') {
      if (typeof showToast === 'function') showToast('클로버가 부족합니다 🍀 (' + (data.balance || 0) + '/' + amount + ')');
      showChargeModal();
      if (callback) callback(false);
    } else {
      if (typeof showToast === 'function') showToast('클로버 차감 실패');
      if (callback) callback(false);
    }
  })
  .catch(function(err) {
    console.error('[MBTS] 클로버 API 오류:', err);
    if (typeof showToast === 'function') showToast('서버 연결 실패');
    if (callback) callback(false);
  });
}

function getCloverTypeLabel(type) {
  var labels = { saju: '사주', gunghap: '궁합', chat: '달토 채팅' };
  return labels[type] || '서비스';
}

// ===== 충전 모달 열기/닫기 =====
function showChargeModal() {
  var modal = document.getElementById('chargeModal');
  if (modal) modal.style.display = 'flex';
}

function hideChargeModal() {
  var modal = document.getElementById('chargeModal');
  if (modal) modal.style.display = 'none';
}

// ===== 충전 패키지 선택 =====
var selectedChargeAmount = 0;
var selectedChargePrice = 0;

function selectChargePkg(el) {
  var pkgs = document.querySelectorAll('.charge-pkg');
  for (var i = 0; i < pkgs.length; i++) {
    pkgs[i].style.border = '1.5px solid var(--border)';
    pkgs[i].style.background = '#fff';
  }
  el.style.border = '1.5px solid #2D9D78';
  el.style.background = 'rgba(200,235,210,0.3)';

  var amountEl = el.querySelector('[data-clover-amount]');
  var priceEl = el.querySelector('[data-clover-price]');
  if (amountEl) selectedChargeAmount = parseInt(amountEl.getAttribute('data-clover-amount')) || 0;
  if (priceEl) selectedChargePrice = parseInt(priceEl.getAttribute('data-clover-price')) || 0;
}

// ===== 충전 실행 (테스트 모드 — PG 연동 후 교체) =====
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

  if (typeof supabase === 'undefined') {
    if (typeof showToast === 'function') showToast('서버 연결 실패');
    return;
  }

  // ========================================
  // TODO: 실결제 연동 (토스페이먼츠 or 카카오페이)
  // 아래는 테스트용 즉시 충전 — 결제 연동 후 교체
  // ========================================
  if (!confirm('🍀 ' + selectedChargeAmount + '잎 충전 (₩' + selectedChargePrice.toLocaleString() + ')\n\n⚠️ 현재 테스트 모드: 무료 충전됩니다.')) return;

  // 최신 잔액 조회 후 충전
  supabase
    .from('users')
    .select('clover_balance')
    .eq('id', user.id)
    .maybeSingle()
    .then(function(result) {
      if (!result.data) {
        if (typeof showToast === 'function') showToast('유저 정보를 찾을 수 없습니다');
        return;
      }

      var currentBalance = result.data.clover_balance || 0;
      var newBalance = currentBalance + selectedChargeAmount;

      supabase
        .from('users')
        .update({ clover_balance: newBalance })
        .eq('id', user.id)
        .then(function(updateResult) {
          if (updateResult.error) {
            if (typeof showToast === 'function') showToast('충전 실패');
            return;
          }

          // 내역 기록
          supabase.from('clover_history').insert({
            user_id: user.id,
            amount: selectedChargeAmount,
            balance_after: newBalance,
            type: 'charge',
            description: '🍀 ' + selectedChargeAmount + '잎 충전 (₩' + selectedChargePrice.toLocaleString() + ')'
          }).then(function() {
            console.log('[MBTS] 클로버 충전:', selectedChargeAmount, '잔액:', newBalance);
          });

          // 로컬 업데이트
          if (typeof mbtsSession !== 'undefined') {
            mbtsSession.cloverBalance = newBalance;
            try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
          }
          if (typeof updateLoginUI === 'function') updateLoginUI();

          hideChargeModal();
          if (typeof showToast === 'function') showToast('🍀 ' + selectedChargeAmount + '잎 충전 완료! 잔액: ' + newBalance + '잎');
          loadCloverHistory();
        });
    });
}

// ===== 내 클로버 내역 로드 =====
function loadCloverHistory() {
  var user = (typeof getUser === 'function') ? getUser() : null;
  if (!user || !user.id) return;

  var historyEl = document.getElementById('cloverHistoryList');
  if (!historyEl) return;

  if (typeof supabase === 'undefined') return;

  supabase
    .from('clover_history')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: false })
    .limit(20)
    .then(function(result) {
      if (!result.data || result.data.length === 0) {
        historyEl.innerHTML = '<div style="text-align:center;color:var(--text-3);padding:20px;font-size:13px">아직 내역이 없어요</div>';
        return;
      }

      var html = '';
      for (var i = 0; i < result.data.length; i++) {
        var h = result.data[i];
        var isPlus = h.amount > 0;
        html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--border)">';
        html += '<div><div style="font-size:14px;font-weight:600">' + (h.description || (isPlus ? '클로버 충전' : '클로버 사용')) + '</div>';
        html += '<div style="font-size:11px;color:var(--text-3);margin-top:2px">잔액: ' + (h.balance_after || 0) + '잎</div></div>';
        html += '<div style="font-size:16px;font-weight:800;color:' + (isPlus ? '#2D9D78' : '#E05A5A') + '">' + (isPlus ? '+' : '') + h.amount + '🍀</div>';
        html += '</div>';
      }
      historyEl.innerHTML = html;
    });
}

// ===== 클로버 잔액 충분한지 간단 체크 (동기) =====
function hasEnoughClover(amount) {
  return getCloverBalance() >= amount;
}

console.log('[MBTS] payment.js loaded (Supabase 직접 연결)');
