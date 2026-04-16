// ============================================================
// sync.js — MBTS 분석 결과 Supabase 자동 동기화
// index.html 수정 최소화를 위해 별도 파일로 분리
// localStorage 저장을 감시하여 Supabase에 자동 전송
// ============================================================

(function(){
  var SAJU_KEY = 'mbts_history';
  var GH_KEY = 'mbts_gh_history';
  var lastSajuLen = 0;
  var lastGhLen = 0;

  // 초기 길이 기록
  try {
    var s = localStorage.getItem(SAJU_KEY);
    if(s) lastSajuLen = JSON.parse(s).length;
  } catch(e){}
  try {
    var g = localStorage.getItem(GH_KEY);
    if(g) lastGhLen = JSON.parse(g).length;
  } catch(e){}

  // localStorage.setItem 래핑
  var _origSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    _origSetItem.apply(this, arguments);

    if(key === SAJU_KEY) {
      try {
        var arr = JSON.parse(value) || [];
        if(arr.length > lastSajuLen) {
          var newItem = arr[arr.length - 1];
          syncToSupabase('saju', newItem);
          lastSajuLen = arr.length;
        }
      } catch(e){}
    }

    if(key === GH_KEY) {
      try {
        var arr2 = JSON.parse(value) || [];
        if(arr2.length > lastGhLen) {
          var newGh = arr2[arr2.length - 1];
          syncToSupabase('gunghap', newGh);
          lastGhLen = arr2.length;
        }
      } catch(e){}
    }
  };

  function syncToSupabase(type, record) {
    // Bug 3 fix: route through /api/save-result (service role, correct project B)
    // Eliminates "input_data column not found" errors from anon→project A direct writes.
    var userId = null;
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) {
      userId = mbtsSession.userId;
    }

    fetch('/api/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, type: type, data: record })
    })
    .then(function(res) { return res.json(); })
    .then(function(json) {
      if (!json.success) console.warn('[sync.js] ' + type + ' 저장 실패:', json.error);
      else console.log('[sync.js] ' + type + ' 결과 저장 완료, id:', json.id);
    })
    .catch(function(err) {
      console.warn('[sync.js] ' + type + ' 저장 오류:', err && err.message);
    });
  }

  console.log('[sync.js] Supabase 자동 동기화 활성화');
})();
