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
    var body = { type: type, data: {} };

    // 로그인 유저면 userId 포함
    if(typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) {
      body.userId = mbtsSession.userId;
    }

    if(type === 'saju') {
      body.data = {
        name: record.name || '나',
        input: record.input || {},
        saju: record.saju || {},
        mbtiObj: record.mbtiObj || {},
        aiResult: typeof record.aiResult === 'string' ? record.aiResult : JSON.stringify(record.aiResult || {})
      };
    } else if(type === 'gunghap') {
      body.data = {
        personA: record.personA || {},
        personB: record.personB || {},
        relType: record.relType || record.relLabel || '',
        scores: record.scores || {},
        aiResult: typeof record.aiResult === 'string' ? record.aiResult : JSON.stringify(record.aiResult || {})
      };
    }

    fetch('/api/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function(r) { return r.json(); })
    .then(function(d) {
      if(d.success) {
        console.log('[sync.js] ' + type + ' 결과 Supabase 저장 완료 (id: ' + d.id + ')');
      } else {
        console.warn('[sync.js] ' + type + ' 저장 실패:', d.error);
      }
    }).catch(function(e) {
      console.warn('[sync.js] ' + type + ' 저장 네트워크 오류:', e);
    });
  }

  console.log('[sync.js] Supabase 자동 동기화 활성화');
})();
