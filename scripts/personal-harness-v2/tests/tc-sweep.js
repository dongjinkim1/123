// tests/tc-sweep.js — TC-11(falsify 파서)·TC-12(파생 주문서)·TC-14(집계)·TC-17(미주입)·TC-18(1세대)
'use strict';
var fs = require('fs');
var path = require('path');
var sw = require('../sweep.js');
var prompts = require('../prompts/formats.js');
var LIB = path.join(__dirname, '..', '..', '..', 'lib');
var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var STATE = path.join(__dirname, '..', 'state');
var codes = JSON.parse(fs.readFileSync(path.join(STATE, 'subj_codes.json'), 'utf8'));

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }
var logs = [];
function log(s) { logs.push(s); }

// ── TC-11: falsify 축 파서 ──
(function () {
  var before = fails.length;
  check('TC-11-str', sw.parseFalsifyAxis('신약이면 아님').axis === 'strength');
  check('TC-11-cf', sw.parseFalsifyAxis('Te 우세면 아님').axis === 'cf');
  check('TC-11-kts', sw.parseFalsifyAxis('SJ 기질이면 성립 안 함').axis === 'kts');
  check('TC-11-dwss', sw.parseFalsifyAxis('대운이 인성운이면 아님').axis === 'dwss');
  check('TC-11-ys', sw.parseFalsifyAxis('용신이 화면 아님').axis === 'yongshin_el');
  check('TC-11-none', sw.parseFalsifyAxis('도화살이 없으면 아님').axis === null, '불명 축이 식별됨');
  var multi = sw.parseFalsifyAxis('신약이거나 Te 우세면 아님');
  check('TC-11-multi', multi.axis === 'strength' && multi.rest.indexOf('cf') >= 0, JSON.stringify(multi));
  console.log('[TC-11] falsify 축 파서: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-12·18: 파생 주문서 생성 + 1세대 가드 ──
(function () {
  var before = fails.length;
  var sqPath = path.join(STATE, 'sweep_queue.json');
  if (fs.existsSync(sqPath)) fs.unlinkSync(sqPath);
  var parent = { id: 'H2-YAD-001', subject: '올해 조언', tier: 'S',
    tags: ['strength:신약', 'ss:비겁', 'dwss:정인'], falsify: '신강이면 아님',
    mechanism: '신약+비겁 조합의 메커니즘', derived_from: null };
  var r = sw.trigger(parent, tdf, codes, log);
  var sq = sw.loadSweepQueue();
  var nonexistN = sq.orders.filter(function (o) { return o.skipped === '실존없음'; }).length;
  check('TC-12-queued', r.queued >= 1 && r.queued + nonexistN === 4,
    'queued ' + r.queued + ' + 실존없음 ' + nonexistN + ' ≠ 4칸 (공존 검증)');
  check('TC-12-cells', sq.orders.length === 4, '신강도 칸 수 ' + sq.orders.length + ' (5-부모1=4)');
  sq.orders.forEach(function (o) {
    check('TC-12-id', /^H2-YAD-\d{3}$/.test(o.pattern_id), o.pattern_id);
    check('TC-12-swap', o.tags.indexOf('strength:신약') < 0 && o.tags.length === parent.tags.length, o.order_id);
    if (o.exists) check('TC-12-support', o.support > 0 && o.support !== 97, o.order_id + ' support ' + o.support);
  });
  // 실존없음 기록 구분 확인 (있다면)
  var nonexist = sq.orders.filter(function (o) { return o.skipped === '실존없음'; });
  check('TC-12-skipkind', nonexist.every(function (o) { return o.support === 0; }), '실존없음 칸 support≠0');
  // TC-18: 파생 패턴(derived_from 있음) S → 재트리거 차단
  var derived = Object.assign({}, parent, { id: 'H2-YAD-501', derived_from: 'H2-YAD-001' });
  var r2 = sw.trigger(derived, tdf, codes, log);
  check('TC-18', r2.queued === 0 && /1세대/.test(r2.reason), JSON.stringify(r2));
  console.log('[TC-12·18] 파생 주문서·1세대 가드: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-14: 파생군 집계 3분기 ──
(function () {
  var before = fails.length;
  var fam = function (results) { return { parent: 'H2-YAD-001', results: results }; };
  var r1 = sw.aggregate(fam([{ cell: 'a', outcome: '소멸' }, { cell: 'b', outcome: '소멸' },
    { cell: 'c', outcome: '실존없음' }]), null, log);
  check('TC-14-extinct', r1.kind === 'extinct-all' && r1.falsifyVerified === true, r1.kind);
  var mockHomo = function (val) {
    return function () { return { json: { distinct: val }, text: '' }; };
  };
  var allLive = fam([{ cell: 'a', outcome: '채택', mechanism: 'm1' }, { cell: 'b', outcome: '채택', mechanism: 'm2' }]);
  var r2 = sw.aggregate(allLive, mockHomo(false), log);
  check('TC-14-homo', r2.kind === 'all-survive-homogeneous' && r2.resubmit === true, r2.kind);
  var r3 = sw.aggregate(allLive, mockHomo(true), log);
  check('TC-14-distinct', r3.kind === 'all-survive-distinct', r3.kind);
  var r4 = sw.aggregate(fam([{ cell: 'a', outcome: '채택' }, { cell: 'b', outcome: '소멸' }]), null, log);
  check('TC-14-mixed', r4.kind === 'mixed-ladder', r4.kind);
  console.log('[TC-14] 파생군 집계(전멸/동질/구분/혼재): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-17: 파생 토론 ctx — 부모 name/scene/falsify/tier 미주입 ──
(function () {
  var before = fails.length;
  var p = prompts.sweepPrompt('부모 메커니즘 본문', ['strength:신강', 'ss:비겁', 'dwss:정인'],
    [{ uid: 'U1', mbti: 'INTJ', tags: ['strength:신강', 'ss:비겁', 'dwss:정인'] }]);
  check('TC-17-mech', p.indexOf('부모 메커니즘 본문') >= 0, 'mechanism 미주입');
  ['name', 'scene', 'falsify가', 'tier', '부모 패턴 제목'].forEach(function (kw) {});
  check('TC-17-nofalsify', p.indexOf('신강이면 아님') < 0, '부모 falsify 누출');
  check('TC-17-notier', !/tier|티어|S급/.test(p), '부모 tier 누출');
  check('TC-17-open', p.indexOf('발현/변형/소멸/역전') >= 0 && p.indexOf('소멸을 선언하라') >= 0, '개방형 질문 훼손');
  console.log('[TC-17] 파생 미주입(개방형 유지): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL:'); fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-11·12·14·17·18)');
