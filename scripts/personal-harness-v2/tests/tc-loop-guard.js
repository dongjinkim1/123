// tests/tc-loop-guard.js — TC-9(가드 state 영속)·TC-10(관찰자 비주입)·TC-16(교정지시 격리)
//                         + TC-22b(가드 재정렬 발동)
'use strict';
var fs = require('fs');
var path = require('path');
var sl = require('../slow-loop.js');
var bg = require('../balance-guard.js');

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }

// ── TC-16: 교정지시 — LLM 0콜·동일군 3연속만 발동·observer 무관 ──
(function () {
  var before = fails.length;
  var st = {};
  sl.record(st, '평면적 일반론 — 조건 무관 서술');
  sl.record(st, '병렬 나열에 그침');
  check('TC-16-no', sl.correction(st) === null, '2건에 조기 발동');
  var st2 = {};
  sl.record(st2, '바넘 — 반대 조건에서도 성립하는 서술');
  sl.record(st2, '바넘 서술 — 반대 조건 성립');
  sl.record(st2, '바넘: 반대 조건에서 성립');
  var corr = sl.correction(st2);
  check('TC-16-fire', corr && /바넘/.test(corr) && /회피/.test(corr), JSON.stringify(corr));
  var st3 = {};
  sl.record(st3, '바넘 서술');
  sl.record(st3, '드리프트 — 체계 밖 의미');
  sl.record(st3, '평면 일반론');
  check('TC-16-mixed', sl.correction(st3) === null, '이질 사유 3건에 발동');
  // 격리: slow-loop 소스에 LLM·observer 경로 부재
  var src = fs.readFileSync(path.join(__dirname, '..', 'slow-loop.js'), 'utf8');
  check('TC-16-iso', src.indexOf('transport') < 0 && src.indexOf('observer') < 0 &&
    src.indexOf('call(') < 0, 'slow-loop에 LLM/observer 경로');
  console.log('[TC-16] 교정지시 코드 전용·격리: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-10: 관찰자 비주입 — debate 프롬프트 조립이 observer 산출 미참조 ──
(function () {
  var before = fails.length;
  ['debate.js', path.join('prompts', 'formats.js')].forEach(function (f) {
    var src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
    check('TC-10-' + f, src.indexOf('observer') < 0 && src.indexOf('state/observer') < 0,
      f + '에 observer 참조');
  });
  // observer 산출 경로는 state/observer/ 한정
  var osrc = fs.readFileSync(path.join(__dirname, '..', 'observer', 'observer.js'), 'utf8');
  check('TC-10-out', osrc.indexOf("'observer'") >= 0 && osrc.indexOf('transcripts') < 0,
    'observer 산출 경로 위반');
  console.log('[TC-10] 관찰자 비주입(grep): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-9/22b: balance-guard — 영속 가능 구조 + 재정렬 발동 ──
(function () {
  var before = fails.length;
  var guard = {};
  for (var i = 0; i < 20; i++) bg.onAccept(guard, ['strength:극신강', 'dm:기']);
  var popDf = { 'strength:극신강': 0.0125, 'strength:신약': 0.436, 'dm:기': 0.1 };
  var pending = [
    { order_id: 'A', tags: ['strength:극신강', 'ss:비겁'] },
    { order_id: 'B', tags: ['strength:신약', 'ss:비겁'] },
    { order_id: 'C', tags: ['unsung:묘', 'ss:관성'] }
  ];
  var logged = [];
  var sorted = bg.rebalance(guard, pending, popDf, function (e) { logged.push(e); });
  check('TC-22b-front', sorted[0].order_id === 'B', '부족 칸 앞당김 실패: ' + sorted.map(function (o) { return o.order_id; }).join(','));
  check('TC-22b-back', sorted[2].order_id === 'A', '과잉 칸 후순위 실패');
  check('TC-22b-log', logged.length === 1 && logged[0].over.indexOf('strength:극신강') >= 0, '발동 로그');
  // 영속: JSON 직렬화 왕복
  var revived = JSON.parse(JSON.stringify(guard));
  check('TC-9-persist', revived.total === 20 && revived.counts['strength:극신강'] === 20, 'guard 직렬화');
  // 가드 산출이 토론 ctx에 미주입 — debate 소스 grep
  var dsrc = fs.readFileSync(path.join(__dirname, '..', 'debate.js'), 'utf8');
  check('TC-22b-iso', dsrc.indexOf('balance') < 0 && dsrc.indexOf('guard') < 0, 'debate에 가드 참조');
  console.log('[TC-9·22b] 가드 영속·재정렬·격리: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL:'); fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-9·10·16·22b)');
