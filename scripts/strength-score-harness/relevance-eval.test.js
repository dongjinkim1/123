'use strict';
// relevance-eval.test.js — §7/§8: 가중치 양수→단조 / form 3종 / normalize 전종 /
//   레지스트리 밖 source→throw / interaction 선펼침 fixture 결정론 해석.
var assert = require('assert');
var E = require('./relevance-eval');

var passed = 0, failed = 0;
function test(n, f) { try { f(); passed++; console.log('  PASS ' + n); } catch (e) { failed++; console.log('  FAIL ' + n + ': ' + e.message); } }
function approx(a, b) { return Math.abs(a - b) < 1e-9; }

// 공통 fixture ctx (§6 선펼침 사실 + 엔진 스칼라). yongshin → extractYongshinOh='목'.
function ctxFix(score) {
  return {
    score: score, yongshin: '갑목(연료)+임수', dmEl: '화',
    relations: [{ name: '진유합', kind: '합', strength: 0.4, pillar: '시지' }],
    hyung: [],
    saeng: { generates: '화', generatedBy: '수' }, // 화=dmEl → 일치
    geuk: { controls: '토', controlledBy: '금' }    // 일간(화) 불일치 → 0
  };
}

console.log('\n=== relevance-eval tests ===\n');

// 1) normalize 전종
test('normalize 전종 값 검증', function () {
  assert.strictEqual(E.NORMALIZE.identity(0.7), 0.7);
  assert.strictEqual(E.NORMALIZE.div5(4), 0.8);
  assert.strictEqual(E.NORMALIZE.polarityMag('용신(최길)'), 1.0);
  assert.strictEqual(E.NORMALIZE.polarityMag('희신(길)'), 0.7);
  assert.strictEqual(E.NORMALIZE.polarityMag('한신(중립)'), 0.4);
  assert.strictEqual(E.NORMALIZE.polarityMag('구신(소흉)'), 0.7);
  assert.strictEqual(E.NORMALIZE.polarityMag('기신(흉)'), 1.0);
  assert.strictEqual(E.NORMALIZE.polarityMag(''), 0.5);
  assert.strictEqual(E.NORMALIZE.polarityMag(null), 0.5);
  assert.strictEqual(E.NORMALIZE.bool01([]), 0);
  assert.strictEqual(E.NORMALIZE.bool01([1]), 1);
  assert.strictEqual(E.NORMALIZE.bool01(0), 0);
  assert.strictEqual(E.NORMALIZE.bool01(3), 1);
  assert.strictEqual(E.NORMALIZE.relMag(0.4), 0.4);
  assert.strictEqual(E.NORMALIZE.relMag(2.5), 1); // clamp
});

// 2) transform 단조증가 + 파라미터 가드
test('transform 단조증가 (sqrt/pow/log1p/div) + k>0·c>0 강제', function () {
  var xs = [0, 0.1, 0.3, 0.6, 1.0];
  ['identity', 'sqrt', 'pow:2', 'pow:0.5', 'log1p', 'div:2'].forEach(function (t) {
    var fn = E.makeTransform(t), prev = -Infinity;
    xs.forEach(function (x) { var y = fn(x); assert.ok(y >= prev - 1e-12, '단조 위반 ' + t + ' x=' + x); prev = y; });
  });
  assert.throws(function () { E.makeTransform('pow:-1'); });
  assert.throws(function () { E.makeTransform('div:0'); });
  assert.throws(function () { E.makeTransform('weird'); });
});

// 3) form 3종 값
test('form 3종 (weighted_sum/product/min_gate) 값', function () {
  var fs = [{ key: 'a', w: 1, f: 0.4 }, { key: 'b', w: 1, f: 0.9 }];
  assert.ok(approx(E.FORM.weighted_sum(fs), 0.65), 'weighted_sum=0.65');
  assert.ok(approx(E.FORM.weighted_product(fs), 0.6), 'weighted_product=geo(0.4,0.9)=0.6'); // sqrt(0.36)
  assert.strictEqual(E.FORM.min_gate(fs), 0.4);
  assert.strictEqual(E.FORM.weighted_product([{ key: 'a', w: 1, f: 0 }, { key: 'b', w: 1, f: 0.5 }]), 0, '0인자→product 0');
});

// 4) 가중치 양수 → gangdo factor 단조 비감소 (M4 준비) — 3 form 전부 + [0,1] 불변
test('가중치 양수 → gangdo 단조 비감소 & [0,1] (3 form)', function () {
  ['weighted_sum', 'weighted_product', 'min_gate'].forEach(function (form) {
    var spec = {
      block: 't', pillar: '월지', oh: '목', gangdoAxis: 'magnitude',
      relevance: { form: form, factors: [
        { key: 'gangdo', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1.0 },
        { key: 'wuichi', source: 'wuichi', normalize: 'div5', transform: 'identity', weight: 0.6 }
      ] }
    };
    var prev = -Infinity;
    [0.1, 0.3, 0.5, 0.7, 0.9].forEach(function (s) {
      var v = E.evalRelevance(spec, ctxFix(s));
      assert.ok(v >= 0 && v <= 1, '[0,1] 이탈 ' + form + ' v=' + v);
      assert.ok(v >= prev - 1e-12, '단조 위반 ' + form + ' score=' + s + ' v=' + v + ' prev=' + prev);
      prev = v;
    });
  });
});

// 5) 레지스트리 밖 source → throw
test('레지스트리 밖 source → throw', function () {
  var spec = { block: 't', oh: '목', relevance: { form: 'weighted_sum', factors: [
    { key: 'x', source: '__nope__', normalize: 'identity', transform: 'identity', weight: 1 }
  ] } };
  assert.throws(function () { E.evalRelevance(spec, ctxFix(0.5)); }, /레지스트리 밖 source/);
});

// 6) interaction(relation/hyung/saeng/geuk) 선펼침 fixture 결정론 해석
test('interaction 선펼침 fixture 결정론 해석', function () {
  var ctx = ctxFix(0.5), spec = { block: '십성:겁재', pillar: '월지', oh: '목' };
  assert.strictEqual(E.resolveFactor({ key: 'r', source: 'relation', normalize: 'relMag', transform: 'identity', weight: 1 }, spec, ctx), 0.4);
  assert.strictEqual(E.resolveFactor({ key: 'h', source: 'hyung', normalize: 'bool01', transform: 'identity', weight: 1 }, spec, ctx), 0);
  assert.strictEqual(E.resolveFactor({ key: 's', source: 'saeng', against: '일간', normalize: 'bool01', transform: 'identity', weight: 1 }, spec, ctx), 1);
  assert.strictEqual(E.resolveFactor({ key: 'g', source: 'geuk', against: '일간', normalize: 'bool01', transform: 'identity', weight: 1 }, spec, ctx), 0);
  // 동일 입력 → 동일 출력(결정론)
  function mk() { return { block: 't', pillar: '월지', oh: '목', relevance: { form: 'weighted_sum', factors: [
    { key: 'gangdo', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1 },
    { key: 'rel', source: 'relation', normalize: 'relMag', transform: 'identity', weight: 0.4 }
  ] } }; }
  assert.strictEqual(E.evalRelevance(mk(), ctx), E.evalRelevance(mk(), ctx), '결정론');
});

// 7) open axis (relevance:null) → null
test('open axis (relevance:null) → null', function () {
  assert.strictEqual(E.evalRelevance({ block: 't', gangdoAxis: 'open', relevance: null }, ctxFix(0.5)), null);
});

// 8) wuichi pillar 생략 / gilhyung 라벨 polarityMag
test('wuichi pillar 생략 → gangdo만 / gilhyung 라벨 해석', function () {
  var spec = { block: 't', oh: '목', relevance: { form: 'weighted_sum', factors: [
    { key: 'gangdo', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1 },
    { key: 'wuichi', source: 'wuichi', normalize: 'div5', transform: 'identity', weight: 0.6 }
  ] } };
  assert.strictEqual(E.evalRelevance(spec, ctxFix(0.7)), 0.7); // pillar 없음 → wuichi 생략
  var gh = { key: 'gh', source: 'gilhyung', normalize: 'polarityMag', transform: 'identity', weight: 1 };
  assert.strictEqual(E.resolveFactor(gh, { oh: '목' }, ctxFix(0.5)), 1.0); // 용신(최길)
  assert.strictEqual(E.resolveFactor(gh, { oh: '금' }, ctxFix(0.5)), 1.0); // 기신(흉)
  assert.strictEqual(E.resolveFactor(gh, { oh: '화' }, ctxFix(0.5)), 0.4); // 한신(중립)
  assert.strictEqual(E.resolveFactor(gh, { oh: '수' }, ctxFix(0.5)), 0.7); // 희신(길)
});

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
process.exit(failed ? 1 : 0);
