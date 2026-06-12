// tests/tc-arbiter.js — TC-4(접지 반려)·TC-5(스킵)·TC-6(태그 검증)·TC-13(dedup·파생군)
//                      ·TC-15(support 재계산)·TC-19(impact·name 필수)·TC-20(융화 가드)
// LLM 콜 0 — callFn 모킹.
'use strict';
var fs = require('fs');
var path = require('path');
var ar = require('../arbiter/arbiter.js');
var matcher = require(path.join(__dirname, '..', '..', '..', 'lib', 'pattern-matcher.js'));
var LIB = path.join(__dirname, '..', '..', '..', 'lib');
var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var STATE = path.join(__dirname, '..', 'state');
var q = JSON.parse(fs.readFileSync(path.join(STATE, 'queue_YAD.json'), 'utf8'));
var premiumIndex = JSON.parse(fs.readFileSync(path.join(STATE, 'premium_index.json'), 'utf8'));

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }
function mockCall(json) { return function () { return { text: JSON.stringify(json), json: json, model: 'claude-fable-5' }; }; }

var order = q.orders[0];
var cards = [{ uid: 'U000', mbti: 'INTJ', tags: order.tags.concat(['ss:비겁', 'dm:기', 'cf:Ni']) }];
var goodOut = { name: '테스트 패턴', mechanism: '조건 조합이 만드는 메커니즘', scene: '장면',
  falsify: '신약이면 아님', tags: order.tags.slice(0, Math.min(3, order.tags.length)) };

// ── TC-4: 접지 — verdict 반려/스킵/TRASH/C 처리 ──
(function () {
  var before = fails.length;
  var r1 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '반려', reason: '바넘 — falsify가 반대조건에서도 성립' }));
  check('TC-4-reject', r1.decision === 'reject' && /바넘/.test(r1.reason), JSON.stringify(r1));
  var r2 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '스킵', reason: '무의미 조합' }));
  check('TC-5-skip', r2.decision === 'skip', r2.decision);
  var r3 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'TRASH', impact: 3, reason: '평면' }));
  check('TC-4-trash', r3.decision === 'trash', r3.decision);
  var r4 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'C', impact: 5, reason: '바넘 경계' }));
  check('TC-4-dropC', r4.decision === 'drop-c', r4.decision + ' (C18 미적재)');
  console.log('[TC-4·5] 접지 반려·스킵·C/TRASH 컷: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-6: 태그 검증 — 카드 미보유 태그·개수 위반 거부 ──
(function () {
  var before = fails.length;
  var bad1 = Object.assign({}, goodOut, { tags: order.tags.concat(['sinsal:존재하지않는태그']).slice(0, 4) });
  var r1 = ar.judge(order, bad1, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A', impact: 7 }));
  check('TC-6-foreign', r1.decision === 'reject' && r1.coded, JSON.stringify(r1.reason));
  var bad2 = Object.assign({}, goodOut, { tags: ['ss:비겁'] });
  var r2 = ar.judge(order, bad2, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A', impact: 7 }));
  check('TC-6-count', r2.decision === 'reject', '1태그 통과됨');
  console.log('[TC-6] 태그 카드 보유·2~4 검증: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-13: dedup prefilter — 태그 2+ 공유만 후보 / 파생군 vs 중복 분기 ──
(function () {
  var before = fails.length;
  var accepted = [];
  for (var i = 0; i < 120; i++) {
    accepted.push({ id: 'H2-YAD-9' + String(i).padStart(2, '0'), subject: '올해 조언',
      tags: ['sinsal:가상' + i, 'unsung:가상' + i], name: 'n' + i, mechanism: 'm' + i });
  }
  accepted.push({ id: 'H2-YAD-801', subject: '올해 조언', tags: order.tags.slice(), name: '겹침', mechanism: '동일기전' });
  var cands = ar.prefilter('올해 조언', order.tags, accepted);
  check('TC-13-narrow', cands.every(function (c) { return c.id === 'H2-YAD-801' || c.origin === 'legacy'; }),
    '태그 0~1 공유가 후보에 포함: ' + cands.length);
  // 중복: mechanism 동일 + 태그 전부 겹침
  var rDup = ar.judge(order, Object.assign({}, goodOut, { tags: order.tags.slice() }), cards, accepted, tdf,
    mockCall({ verdict: '통과', tier: 'A', impact: 7, duplicateOf: 'H2-YAD-801' }));
  check('TC-13-dup', rDup.decision === 'reject' && /중복/.test(rDup.reason), JSON.stringify(rDup.reason));
  // 파생군: duplicateOf 지목 + 조건 분리(겹침 < min) → family 링크
  var partialTags = order.tags.slice(0, 2).concat(['cf:Ni', 'dm:기']).slice(0, 4);
  var rFam = ar.judge(order, Object.assign({}, goodOut, { tags: partialTags }), cards, accepted, tdf,
    mockCall({ verdict: '통과', tier: 'A', impact: 7, duplicateOf: 'H2-YAD-801' }));
  check('TC-13-family', rFam.decision === 'accept' && rFam.record.family_id === 'H2-YAD-801',
    JSON.stringify(rFam.decision) + ' family=' + (rFam.record && rFam.record.family_id));
  console.log('[TC-13] dedup prefilter·파생군 분기: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-15: support 재계산 — 태그 교체 시 최종 태그 기준 ──
(function () {
  var before = fails.length;
  var swapped = Object.assign({}, goodOut, { tags: order.tags.slice(0, 2).concat(['cf:Ni']) });
  var r = ar.judge(order, swapped, cards, [], tdf, mockCall({ verdict: '통과', tier: 'B', impact: 6 }));
  check('TC-15-acc', r.decision === 'accept', r.reason);
  if (r.record) {
    var manual = ar.recalcSupport(swapped.tags, tdf);
    check('TC-15-val', r.record.support === manual && manual !== order.support,
      'support ' + r.record.support + ' manual ' + manual + ' 원주문 ' + order.support);
  }
  console.log('[TC-15] support 최종 태그 재계산: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-19: impact·name 필수 + scorePattern 차등 ──
(function () {
  var before = fails.length;
  var r1 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A' }));
  check('TC-19-noimpact', r1.decision === 'reject' && /impact/.test(r1.reason), r1.reason);
  var r2 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A', impact: 11 }));
  check('TC-19-range', r2.decision === 'reject', 'impact 11 통과됨');
  var r3 = ar.judge(order, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A', impact: 7 }));
  check('TC-19-name', r3.decision === 'accept' && r3.record.name.trim().length > 0, r3.reason);
  var p3 = { tier: 'A', impact: 3, tags: ['ss:비겁', 'dm:기'] };
  var p8 = { tier: 'A', impact: 8, tags: ['ss:비겁', 'dm:기'] };
  var us = { 'ss:비겁': true, 'dm:기': true };
  check('TC-19-score', matcher.scorePattern(p8, us) > matcher.scorePattern(p3, us),
    'impact 차등 미반영: ' + matcher.scorePattern(p8, us) + ' vs ' + matcher.scorePattern(p3, us));
  console.log('[TC-19] impact·name 필수+score 차등: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-20: 융화 가드 — H2 형식·기존 id 충돌 차단·기존 풀 prefilter ──
(function () {
  var before = fails.length;
  var badOrder = Object.assign({}, order, { pattern_id: 'CROSS-FIX-003' });
  var r1 = ar.judge(badOrder, goodOut, cards, [], tdf, mockCall({ verdict: '통과', tier: 'A', impact: 7 }));
  check('TC-20-ns', r1.decision === 'reject' && /id/.test(r1.reason), r1.reason);
  var legacy = premiumIndex.filter(function (p) { return p.subject === '올해 조언'; })[0];
  if (legacy && legacy.tags.length >= 2) {
    var cands = ar.prefilter('올해 조언', legacy.tags.slice(0, Math.max(2, legacy.tags.length)), []);
    check('TC-20-legacy', cands.some(function (c) { return c.origin === 'legacy'; }),
      '기존 풀이 prefilter에 미포함');
  }
  console.log('[TC-20] 융화 가드(H2·기존 충돌·legacy prefilter): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL:'); fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-4·5·6·13·15·19·20)');
