// tests/saju-core.test.js — saju calculation unit tests
'use strict';

var assert = require('assert');
var core = require('../lib/saju-core');
var analysis = require('../lib/saju-analysis');

var passed = 0, failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (e) {
    failed++;
    console.log('  ❌ ' + name + ': ' + e.message);
  }
}

console.log('\n=== saju-core tests ===\n');

// Known saju cases (verified against traditional manserryeok)
var cases = [
  { input: {y:1993,m:5,d:26,h:8,min:40}, expected: {dayGan:'정',dayJi:'미'} },
  { input: {y:1990,m:3,d:15,h:14,min:30}, expected: {dayGan:'기',dayJi:'묘'} },
  { input: {y:1988,m:3,d:22,h:8,min:0}, expected: {dayGan:'병',dayJi:'자'} },
  { input: {y:2000,m:1,d:1,h:0,min:0}, expected: {dayGan:'무',dayJi:'오'} },
  { input: {y:1985,m:12,d:3,h:14,min:0}, expected: {dayGan:'병',dayJi:'자'} },
  { input: {y:1970,m:6,d:15,h:null,min:null}, expected: {dayGan:'병',dayJi:'인'} },
];

cases.forEach(function(c, i) {
  test('Case ' + (i+1) + ': ' + c.input.y + '/' + c.input.m + '/' + c.input.d, function() {
    var saju = core.calcSajuForApp(c.input.y, c.input.m, c.input.d, c.input.h, c.input.min, null);
    assert.ok(saju, 'saju object should exist');
    assert.ok(saju.P, 'saju.P should exist');
    assert.ok(saju.P.length >= 3, 'saju.P should have at least 3 pillars');
    assert.strictEqual(saju.P[2].s, c.expected.dayGan, 'dayGan: expected ' + c.expected.dayGan + ' got ' + saju.P[2].s);
    assert.strictEqual(saju.P[2].b, c.expected.dayJi, 'dayJi: expected ' + c.expected.dayJi + ' got ' + saju.P[2].b);
  });
});

// Structure tests
test('calcSajuForApp returns complete structure', function() {
  var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, 127);
  assert.ok(saju.P, 'P (pillars)');
  assert.ok(saju.raw, 'raw indices');
  assert.ok(saju.el, 'el (oheng counts)');
  assert.ok(saju.ss, 'ss (sipsung)');
  assert.ok(saju.jjg, 'jjg (jijanggan)');
  assert.ok(saju.jiSS, 'jiSS (ji sipsung)');
  assert.ok(saju.specialSals, 'specialSals');
  assert.ok(typeof saju.dm === 'string', 'dm (daymaster)');
  assert.ok(typeof saju.dmEl === 'string', 'dmEl (daymaster element)');
});

test('calcSajuForApp handles null hour', function() {
  var saju = core.calcSajuForApp(1990, 1, 15, null, null, null);
  assert.ok(saju, 'should not crash with null hour');
  assert.ok(saju.P.length >= 3, 'should have at least 3 pillars');
});

test('calcSajuForApp handles city longitude', function() {
  var sajuDefault = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
  var sajuSeoul = core.calcSajuForApp(1993, 5, 26, 8, 40, 127);
  assert.ok(sajuDefault, 'no city');
  assert.ok(sajuSeoul, 'with city');
});

// analyzeGyeokguk tests
test('analyzeGyeokguk returns strength and gyeokguk', function() {
  var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
  var gg = analysis.analyzeGyeokguk(saju);
  assert.ok(gg, 'gg object');
  assert.ok(gg.strengthGrade, 'strengthGrade');
  assert.ok(gg.gyeokgukName, 'gyeokgukName');
  assert.ok(typeof gg.strengthScore === 'number', 'strengthScore');
  assert.ok(gg.cnt, 'cnt (sipsung counts)');
  assert.ok(typeof gg.cnt['비겁'] === 'number', 'cnt.비겁');
  assert.ok(gg.yongshin, 'yongshin');
});

// calcDaewoon tests
test('calcDaewoon returns valid structure', function() {
  var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
  var dw = analysis.calcDaewoon(saju, 1993, 5, 26, 8, 40, '남');
  assert.ok(dw, 'dw object');
  assert.ok(dw.daewoons, 'daewoons array');
  assert.ok(dw.daewoons.length >= 5, 'at least 5 daewoon periods');
  assert.ok(typeof dw.currentDWIdx === 'number', 'currentDWIdx');
  assert.ok(dw.seun, 'seun (yearly fortune)');
  assert.ok(typeof dw.currentAge === 'number', 'currentAge');
});

test('calcDaewoon gender difference', function() {
  var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
  var dwM = analysis.calcDaewoon(saju, 1993, 5, 26, 8, 40, '남');
  var dwF = analysis.calcDaewoon(saju, 1993, 5, 26, 8, 40, '여');
  assert.ok(dwM.direction !== dwF.direction || dwM.daewoons[0].gan !== dwF.daewoons[0].gan,
    'male and female daewoon should differ');
});

// calcRelations tests
test('calcRelations returns relation arrays', function() {
  var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
  var rel = analysis.calcRelations(saju);
  assert.ok(rel, 'relations object');
  assert.ok(Array.isArray(rel.jijiChung), 'jijiChung');
  assert.ok(Array.isArray(rel.jijiHap), 'jijiHap');
  assert.ok(Array.isArray(rel.cheonganHap), 'cheonganHap');
});

console.log('\n=== Results: ' + passed + ' passed, ' + failed + ' failed ===\n');
process.exit(failed > 0 ? 1 : 0);
