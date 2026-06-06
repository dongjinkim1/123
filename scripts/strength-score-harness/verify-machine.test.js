'use strict';
// verify-machine.test.js — §8 M1~M6 게이트 검증(인라인 spec, state/ 비의존).
var assert = require('assert');
var V = require('./verify-machine');

var passed = 0, failed = 0;
function test(n, f) { try { f(); passed++; console.log('  PASS ' + n); } catch (e) { failed++; console.log('  FAIL ' + n + ': ' + e.message); } }
function hasCode(res, code) { return res.fails.some(function (x) { return x.code === code; }); }

// 공통 §6 사실 + _meta(겁재 0.914 recall 대상).
function blockFix() {
  return {
    pillars: ['월지'], oh: '목',
    relations: [{ name: '진유합', kind: '합', strength: 0.4, pillars: ['시지'] }],
    hyung: [], saeng: { generates: '화', generatedBy: '수' }, geuk: { controls: '토', controlledBy: '금' }
  };
}
var META = { dmEl: '화', yongshin: '갑목(연료)+임수', topFeatures: [{ type: '십성', name: '겁재', score: 0.914 }] };

function specScored() {
  return {
    block: '십성:겁재', pillar: '월지', oh: '목', gangdoAxis: 'magnitude',
    relevance: { form: 'weighted_sum', factors: [
      { key: 'gangdo', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1 },
      { key: 'rel', source: 'relation', normalize: 'relMag', transform: 'identity', weight: 0.4 }
    ] }, geunge: 'PART2 십성 섹션: 겁재는 비겁으로 강도 변별이 크다', flag: ''
  };
}
function specOpen() { return { block: '음양', oh: '화', gangdoAxis: 'open', relevance: null, geunge: '4-OPEN', flag: '' }; }

console.log('\n=== verify-machine tests ===\n');

// 1) 정상 점수 spec → pass:true, fails:[]
test('정상 점수 spec → pass:true', function () {
  var res = V.verifyBlock(specScored(), blockFix(), META);
  assert.strictEqual(res.pass, true, 'fails=' + JSON.stringify(res.fails));
  assert.strictEqual(res.fails.length, 0);
});

// 2) open spec(음양) → pass:true (M3/M4/M6 N/A)
test('open spec(4-OPEN) → pass:true', function () {
  var res = V.verifyBlock(specOpen(), blockFix(), META);
  assert.strictEqual(res.pass, true, 'fails=' + JSON.stringify(res.fails));
});

// 3) M2: 4-OPEN 블록인데 점수화 → M2 FAIL
test('M2: 4-OPEN 블록(음양) 점수화 → M2 FAIL', function () {
  var s = specScored(); s.block = '음양';
  var res = V.verifyBlock(s, blockFix(), META);
  assert.ok(!res.pass && hasCode(res, 'M2'), 'M2 미검출: ' + JSON.stringify(res.fails));
});

// 4) M1: magnitude 축인데 gangdo factor 없음 → M1 FAIL
test('M1: magnitude 인데 gangdo 없음 → M1 FAIL', function () {
  var s = specScored();
  s.relevance.factors = [{ key: 'r', source: 'relation', normalize: 'relMag', transform: 'identity', weight: 1 }];
  var res = V.verifyBlock(s, blockFix(), META);
  assert.ok(hasCode(res, 'M1'), 'M1 미검출: ' + JSON.stringify(res.fails));
});

// 5) M1 recall: gangdo 대상이 topFeatures에 없음 → M1 FAIL
test('M1 recall: 미존재 feature 지명 → M1 FAIL', function () {
  var s = specScored(); s.block = '십성:정관';
  var res = V.verifyBlock(s, blockFix(), META);
  assert.ok(hasCode(res, 'M1'), 'recall 미검출: ' + JSON.stringify(res.fails));
});

// 6) M1 autofix: geunge가 카테고리 가중을 틀리게 인용 → autofix 항목
test('M1 autofix: 잘못 인용한 카테고리 가중 → autofix', function () {
  var s = specScored(); s.geunge = '십성 가중 0.9 를 적용';
  var res = V.verifyBlock(s, blockFix(), META);
  var fix = res.autofix.filter(function (a) { return a.from === '0.9' && a.to === '1'; });
  assert.strictEqual(fix.length, 1, 'autofix 미생성: ' + JSON.stringify(res.autofix));
});

// 7) M5: gangdoAxis 단일 문자열 아님(배열) → M5 FAIL
test('M5: gangdoAxis 배열 → M5 FAIL', function () {
  var s = specScored(); s.gangdoAxis = ['magnitude', 'impact'];
  var res = V.verifyBlock(s, blockFix(), META);
  assert.ok(hasCode(res, 'M5'), 'M5 미검출: ' + JSON.stringify(res.fails));
});

// 8) M6: 레지스트리 밖 source → M6 FAIL
test('M6: 레지스트리 밖 source → M6 FAIL', function () {
  var s = specScored();
  s.relevance.factors = [
    { key: 'g', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1 },
    { key: 'x', source: '__nope__', normalize: 'identity', transform: 'identity', weight: 1 }
  ];
  var res = V.verifyBlock(s, blockFix(), META);
  assert.ok(hasCode(res, 'M6'), 'M6 미검출: ' + JSON.stringify(res.fails));
});

// 9) M4: gangdo 없는 spec → M4 N/A(통과). gangdo 있는 spec → 단조(통과).
test('M4: gangdo 유무에 따른 단조/NA', function () {
  var noG = specScored();
  noG.gangdoAxis = 'impact';
  noG.relevance.factors = [{ key: 'r', source: 'relation', normalize: 'relMag', transform: 'identity', weight: 1 }];
  assert.ok(!hasCode(V.verifyBlock(noG, blockFix(), META), 'M4'), 'M4 N/A 아님');
  assert.ok(!hasCode(V.verifyBlock(specScored(), blockFix(), META), 'M4'), 'gangdo 단조 위반 오검출');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
process.exit(failed ? 1 : 0);
