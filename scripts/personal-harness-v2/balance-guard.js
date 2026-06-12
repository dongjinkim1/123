// scripts/personal-harness-v2/balance-guard.js — C19: 실시간 쏠림 교정 (코드 전용, LLM 0콜)
// 채택 풀 축 분포 vs 모집단 — 과잉 칸(2배 초과) 대기 주문서 후순위 / 부족 칸(1/2 미만) 앞당김.
// 토론 내용에는 어떤 지시도 주입하지 않는다 — 교정은 오직 큐 재정렬(함정a 차단).
'use strict';

var fs = require('fs');
var path = require('path');
var STATE = path.join(__dirname, 'state');
var GUARD_AXES = ['strength', 'dm', 'kts', 'cf', 'ss'];

function axisOf(tag) { var i = tag.indexOf(':'); return i > 0 ? tag.slice(0, i) : null; }

// 채택 이벤트마다 O(1) 갱신
function onAccept(guard, tags) {
  guard.total = (guard.total || 0) + 1;
  guard.counts = guard.counts || {};
  tags.forEach(function (t) {
    if (GUARD_AXES.indexOf(axisOf(t)) >= 0) guard.counts[t] = (guard.counts[t] || 0) + 1;
  });
}

// 큐 재정렬: 과잉 태그 포함 주문서 → 뒤 / 부족 태그 포함 → 앞 (안정 정렬)
function rebalance(guard, pendingOrders, popDf, logFn) {
  if (!guard.total || guard.total < 10) return pendingOrders;
  var over = {}, under = {};
  Object.keys(guard.counts || {}).forEach(function (t) {
    var adopted = guard.counts[t] / guard.total;
    var pop = popDf[t] || 0.001;
    if (adopted > pop * 2) over[t] = 1;
  });
  // 부족: 모집단 점유 큰 태그인데 채택 풀에서 ½ 미만
  Object.keys(popDf).forEach(function (t) {
    if (GUARD_AXES.indexOf(axisOf(t)) < 0) return;
    if (popDf[t] < 0.03) return; // 극희소 칸은 보충 대상 아님(층화 하한이 담당)
    var adopted = (guard.counts && guard.counts[t] || 0) / guard.total;
    if (adopted < popDf[t] / 2) under[t] = 1;
  });
  if (!Object.keys(over).length && !Object.keys(under).length) return pendingOrders;

  var head = [], mid = [], tail = [];
  pendingOrders.forEach(function (o) {
    var hasOver = o.tags.some(function (t) { return over[t]; });
    var hasUnder = o.tags.some(function (t) { return under[t]; });
    if (hasUnder && !hasOver) head.push(o);
    else if (hasOver && !hasUnder) tail.push(o);
    else mid.push(o);
  });
  if (logFn && (head.length || tail.length)) {
    logFn({ at: new Date().toISOString(), over: Object.keys(over), under: Object.keys(under),
      movedFront: head.length, movedBack: tail.length });
  }
  return head.concat(mid).concat(tail);
}

function appendBalanceLog(entry) {
  fs.appendFileSync(path.join(STATE, 'balance_log.jsonl'), JSON.stringify(entry) + '\n', 'utf8');
}

module.exports = { onAccept: onAccept, rebalance: rebalance, appendBalanceLog: appendBalanceLog,
  GUARD_AXES: GUARD_AXES };
