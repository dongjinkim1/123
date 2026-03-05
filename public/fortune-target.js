(function() {
  'use strict';

  window.getFortuneTarget = function() {
    try {
      var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
      if (hist.length === 0) return null;
      var targetId = localStorage.getItem('mbts_fortuneTarget');
      var rec = null;
      if (targetId) {
        for (var i = 0; i < hist.length; i++) {
          if (hist[i].id === targetId) { rec = hist[i]; break; }
        }
      }
      if (!rec) {
        rec = hist[0];
        localStorage.setItem('mbts_fortuneTarget', rec.id);
      }
      return rec;
    } catch(e) {
      console.error('[fortune-target] getFortuneTarget 실패:', e);
      return null;
    }
  };

  window.updateFortuneTargetUI = function() {
    var infoEl = document.getElementById('fortuneTargetInfo');
    var changeEl = document.getElementById('fortuneTargetChange');
    if (!infoEl) return;
    var rec = getFortuneTarget();
    if (!rec) {
      infoEl.textContent = '';
      if (changeEl) changeEl.style.display = 'none';
      return;
    }
    var name = rec.name || '나';
    var birth = '';
    if (rec.input) {
      birth = rec.input.y + '.' + rec.input.m + '.' + rec.input.d;
      if (rec.input.h && rec.input.h !== '모름') {
        birth += ' ' + rec.input.h + ':' + (rec.input.min || '00');
      }
    }
    var mbti = rec.mbti || '';
    infoEl.textContent = name + (birth ? ' · ' + birth : '') + (mbti ? ' · ' + mbti : '');
    if (changeEl) changeEl.style.display = 'inline';
  };

  // "변경하기" 클릭 → 분석결과 이동 + 수정모드 자동 ON
  window.selectFortuneTarget = function() {
    if (typeof go === 'function') go('pgSave');
    setTimeout(function() {
      if (typeof editMode !== 'undefined' && !editMode) {
        if (typeof toggleEditMode === 'function') toggleEditMode();
      }
    }, 150);
  };

  // "내 사주" 체크 클릭 → 대상 변경 + 수정모드 유지
  window.setMyFortune = function(recordId) {
    localStorage.setItem('mbts_fortuneTarget', recordId);
    if (typeof renderSaveCards === 'function') {
      renderSaveCards();
      setTimeout(function() {
        if (typeof editMode !== 'undefined' && !editMode) {
          if (typeof toggleEditMode === 'function') toggleEditMode();
        }
      }, 50);
    }
    updateFortuneTargetUI();
  };

  window.onFortuneTargetHistoryDelete = function(recordId) {
    var currentTarget = localStorage.getItem('mbts_fortuneTarget');
    if (currentTarget === recordId) {
      localStorage.removeItem('mbts_fortuneTarget');
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateFortuneTargetUI, 300);
  });
})();
