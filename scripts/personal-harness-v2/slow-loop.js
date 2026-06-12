// scripts/personal-harness-v2/slow-loop.js — D5: 자아수정 느린 루프 (전부 코드 — LLM·관찰자 미경유)
// TRASH-only 사유 주입. 동일 사유군 3연속 → 교정지시 1줄 템플릿 조립.
'use strict';

function normalize(reason) {
  return String(reason || '').toLowerCase()
    .replace(/[을를이가은는의에서도와과로]/g, ' ')
    .replace(/[^가-힣a-z0-9 ]/g, ' ')
    .split(/\s+/).filter(function (w) { return w.length >= 2; });
}

function jaccard(a, b) {
  var setA = {}, inter = 0;
  a.forEach(function (w) { setA[w] = 1; });
  var setB = {};
  b.forEach(function (w) { if (!setB[w]) { setB[w] = 1; if (setA[w]) inter++; } });
  var union = Object.keys(setA).length + Object.keys(setB).length - inter;
  return union ? inter / union : 0;
}

// state.trashReasons = [{reason, words}] 누적. 최근 3건이 같은 군이면 교정지시.
function record(state, reason) {
  if (!state.trashReasons) state.trashReasons = [];
  state.trashReasons.push({ reason: reason, words: normalize(reason) });
  if (state.trashReasons.length > 50) state.trashReasons.shift();
}

function correction(state) {
  var rs = state.trashReasons || [];
  if (rs.length < 3) return null;
  var last3 = rs.slice(-3);
  if (jaccard(last3[0].words, last3[1].words) >= 0.5 &&
      jaccard(last3[1].words, last3[2].words) >= 0.5) {
    // 템플릿 조립 — 사유 원문 인용 + 회피 지시 (LLM 0콜)
    return '최근 반려 사유: "' + last3[2].reason + '" — 같은 유형의 실패를 회피하라.';
  }
  return null;
}

module.exports = { record: record, correction: correction, normalize: normalize, jaccard: jaccard };
