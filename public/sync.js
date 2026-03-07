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
    if (typeof supabase === 'undefined') return;

    var userId = null;
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) {
      userId = mbtsSession.userId;
    }

    if (type === 'saju') {
      supabase.from('saju_results').insert({
        user_id: userId,
        name: record.name || '나',
        input_data: JSON.stringify(record.input || {}),
        saju_data: JSON.stringify(record.saju || {}),
        mbti_data: JSON.stringify(record.mbtiObj || {}),
        result_json: typeof record.aiResult === 'string' ? record.aiResult : JSON.stringify(record.aiResult || {})
      }).then(function(res) {
        if (res.error) console.warn('[sync.js] saju 저장 실패:', res.error.message);
        else console.log('[sync.js] saju 결과 Supabase 저장 완료');
      });
    } else if (type === 'gunghap') {
      supabase.from('gunghap_results').insert({
        user_id: userId,
        person_a: JSON.stringify(record.personA || {}),
        person_b: JSON.stringify(record.personB || {}),
        rel_type: record.relType || record.relLabel || '',
        scores: JSON.stringify(record.scores || {}),
        result_json: typeof record.aiResult === 'string' ? record.aiResult : JSON.stringify(record.aiResult || {})
      }).then(function(res) {
        if (res.error) console.warn('[sync.js] gunghap 저장 실패:', res.error.message);
        else console.log('[sync.js] gunghap 결과 Supabase 저장 완료');
      });
    }
  }

  console.log('[sync.js] Supabase 자동 동기화 활성화');
})();
