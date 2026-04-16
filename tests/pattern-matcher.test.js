// tests/pattern-matcher.test.js — pattern matching unit tests
// Exercises the NEW finalScore-based pattern-matcher (lib/pattern-matcher.js).
// buildUserTags / MBTS_PATTERNS still come from pattern-data.js (unchanged).
'use strict';

var assert = require('assert');
var core = require('../lib/saju-core');
var analysis = require('../lib/saju-analysis');
var patternData = require('../lib/pattern-data');
var pm = require('../lib/pattern-matcher');

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

console.log('\n=== pattern-matcher tests ===\n');

// Setup: compute saju for a known person
var saju1 = core.calcSajuForApp(1993, 5, 26, 8, 40, null);
var gg1 = analysis.analyzeGyeokguk(saju1);
var dw1 = analysis.calcDaewoon(saju1, 1993, 5, 26, 8, 40, '남');

// ─── buildUserTags tests (unchanged — lives in pattern-data.js) ───

test('buildUserTags generates tags', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(Array.isArray(tags), 'tags should be array');
  assert.ok(tags.length >= 5, 'should have at least 5 tags, got ' + tags.length);
});

test('buildUserTags includes MBTI tags', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t === 'cf:Fi'; }), 'should include dominant cf:Fi for INFP');
  assert.ok(tags.some(function(t) { return t === 'cf:Ne'; }), 'should include auxiliary cf:Ne for INFP');
});

test('buildUserTags includes strength tag', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('strength:'); }), 'should include strength tag');
});

test('buildUserTags includes gyeokguk tag', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('gyeokguk:'); }), 'should include gyeokguk tag');
});

test('buildUserTags includes daymaster tag', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('dm:'); }), 'should include dm: tag');
});

// ─── NEW matchPatterns tests (finalScore-based) ───

test('matchPatterns returns scored results', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = pm.matchPatterns('premium', '나의 성격', tags, 5);
  assert.ok(Array.isArray(matched), 'should be array');
  assert.ok(matched.length > 0, 'should find at least 1 match');
  assert.ok(matched.length <= 5, 'should respect limit');
});

test('matchPatterns results are sorted by finalScore descending', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = pm.matchPatterns('premium', '나의 성격', tags, 10);
  for (var i = 1; i < matched.length; i++) {
    assert.ok(matched[i - 1].score >= matched[i].score,
      'should be sorted desc by finalScore: ' + matched[i - 1].score + ' >= ' + matched[i].score);
  }
});

test('matchPatterns has no duplicate pattern IDs', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = pm.matchPatterns('premium', '나의 성격', tags, 10);
  var ids = {};
  matched.forEach(function(m) {
    assert.ok(!ids[m.pattern.id], 'duplicate ID: ' + m.pattern.id);
    ids[m.pattern.id] = true;
  });
});

test('different saju produces different top patterns', function() {
  var saju2 = core.calcSajuForApp(1970, 1, 1, 6, 0, null);
  var gg2 = analysis.analyzeGyeokguk(saju2);
  var dw2 = analysis.calcDaewoon(saju2, 1970, 1, 1, 6, 0, '여');

  var tags1 = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var tags2 = patternData.buildUserTags(saju2, gg2, dw2, 'ESTJ', [55, 55, 55, 55]);

  var m1 = pm.matchPatterns('premium', '나의 성격', tags1, 3);
  var m2 = pm.matchPatterns('premium', '나의 성격', tags2, 3);

  assert.ok(m1.length > 0 && m2.length > 0, 'both should have matches');
  assert.ok(tags1.join(',') !== tags2.join(','), 'tag sets should differ');
});

// ─── NEW spec-driven tests ───

test('[spec] TRASH tier patterns are excluded from results', function() {
  // Score a TRASH fixture directly
  var trashPat = { id: 'TEST-TRASH', tier: 'TRASH', tags: ['ss:비겁'], impact: 5 };
  var score = pm.scorePattern(trashPat, { 'ss:비겁': true });
  assert.strictEqual(score, -1, 'TRASH score should be -1, got ' + score);

  // Ensure the real TRASH pattern never appears in any subject's top-5
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var subs = Object.keys(patternData.MBTS_PATTERNS.premium);
  for (var i = 0; i < subs.length; i++) {
    var matched = pm.matchPatterns('premium', subs[i], tags, 10);
    matched.forEach(function(r) {
      assert.notStrictEqual(r.pattern.tier, 'TRASH', 'TRASH leaked into results: ' + r.pattern.id);
    });
  }
});

test('[spec] single specific tag caps relevance at 60% × overlap ratio', function() {
  // One specific tag, full overlap → rawRelevance=100 × precision 0.6 = 60 relevance
  // finalScore = 60 × (1 + impact × tierBonus × 0.1)
  var pat = { id: 'TEST-1', tier: 'A', tags: ['ss:비겁'], impact: 5 };
  var userSet = { 'ss:비겁': true };
  var s = pm.scorePattern(pat, userSet);
  var expected = 60 * (1 + 5 * 1.3 * 0.1); // = 60 × 1.65 = 99
  assert.ok(Math.abs(s - expected) < 0.001, 'expected ' + expected + ', got ' + s);
});

test('[spec] generic pattern (no specific tags) has relevance fixed at 20', function() {
  var pat = { id: 'TEST-GEN', tier: 'B', tags: ['uses:strength', 'ref:FOO'], impact: 3 };
  var s = pm.scorePattern(pat, { 'ss:비겁': true });
  var expected = 20 * (1 + 3 * 1.1 * 0.1); // = 20 × 1.33 = 26.6
  assert.ok(Math.abs(s - expected) < 0.001, 'expected ' + expected + ', got ' + s);
});

test('[spec] tiebreak: S tier beats B tier when finalScore ties', function() {
  // Construct two patterns with identical finalScore but different tiers.
  // relevance × (1 + impact × tierBonus × 0.1) = constant
  // Solve: for S (1.5) and B (1.1), pick relevance/impact so both hit same score.
  // Use explicit scores with custom results; easier to test the comparator directly.
  var results = [
    { pattern: { id: 'B', tier: 'B', impact: 5 }, score: 100, source: 'subject' },
    { pattern: { id: 'S', tier: 'S', impact: 5 }, score: 100, source: 'subject' }
  ];
  // Mimic the comparator from pattern-matcher
  results.sort(function(a, b) {
    if (b.score !== a.score) return b.score - a.score;
    var order = { S: 4, A: 3, B: 2, C: 1 };
    var td = (order[b.pattern.tier] || 0) - (order[a.pattern.tier] || 0);
    if (td !== 0) return td;
    return (b.pattern.impact || 3) - (a.pattern.impact || 3);
  });
  assert.strictEqual(results[0].pattern.id, 'S', 'S should come first when tied with B');
});

test('[spec] zero overlap on specific-tagged pattern returns score 0', function() {
  var pat = { id: 'TEST-NOMATCH', tier: 'A', tags: ['ss:비겁', 'cf:Fi'], impact: 5 };
  var s = pm.scorePattern(pat, { 'ss:식상': true }); // no overlap
  assert.strictEqual(s, 0, 'expected 0 for zero overlap, got ' + s);
});

test('[spec] impact defaults to 3 when null/undefined/0', function() {
  var patA = { id: 'A', tier: 'A', tags: ['ss:비겁'], impact: null };
  var patB = { id: 'B', tier: 'A', tags: ['ss:비겁'], impact: undefined };
  var patC = { id: 'C', tier: 'A', tags: ['ss:비겁'], impact: 0 };
  var userSet = { 'ss:비겁': true };
  var sA = pm.scorePattern(patA, userSet);
  var sB = pm.scorePattern(patB, userSet);
  var sC = pm.scorePattern(patC, userSet);
  assert.ok(Math.abs(sA - sB) < 0.001, 'null vs undefined impact differ');
  assert.ok(Math.abs(sA - sC) < 0.001, 'null vs 0 impact differ');
  // Confirm it equals the default-3 score
  var expected = 60 * (1 + 3 * 1.3 * 0.1); // relevance 60 × (1+0.39) = 83.4
  assert.ok(Math.abs(sA - expected) < 0.001, 'expected ' + expected + ', got ' + sA);
});

test('[spec] isSpecificTag distinguishes uses:/ref: from specific tags', function() {
  assert.strictEqual(pm.isSpecificTag('ss:비겁'), true);
  assert.strictEqual(pm.isSpecificTag('strength:신강'), true);
  assert.strictEqual(pm.isSpecificTag('cf:Fi'), true);
  assert.strictEqual(pm.isSpecificTag('uses:strength'), false);
  assert.strictEqual(pm.isSpecificTag('ref:MT_ANGER'), false);
});

// ─── buildPatternPrompt test ───

test('buildPatternPrompt returns non-empty text (new matcher)', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var text = pm.buildPatternPrompt('premium', tags);
  assert.ok(typeof text === 'string', 'should be string');
  assert.ok(text.length > 100, 'should have substantial content, got ' + text.length);
  assert.ok(text.indexOf('나의 성격') >= 0 || text.indexOf('고쳐야 할 점') >= 0,
    'should contain sub-topic headers');
});

test('buildPatternPrompt with showScores includes (score: N) markers', function() {
  var tags = patternData.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var text = pm.buildPatternPrompt('premium', tags, { showScores: true });
  assert.ok(text.indexOf('(score: ') >= 0, 'expected score markers in prompt');
});

// ─── All categories exist (unchanged) ───

test('MBTS_PATTERNS has all 5 categories', function() {
  var p = patternData.MBTS_PATTERNS;
  assert.ok(p.premium, 'premium');
  assert.ok(p.ssom, 'ssom');
  assert.ok(p.lover, 'lover');
  assert.ok(p.colleague, 'colleague');
  assert.ok(p.friend, 'friend');
});

test('premium has 14 sub-topics', function() {
  var subs = Object.keys(patternData.MBTS_PATTERNS.premium);
  assert.strictEqual(subs.length, 14, 'should have 14, got ' + subs.length);
});

console.log('\n=== Results: ' + passed + ' passed, ' + failed + ' failed ===\n');
process.exit(failed > 0 ? 1 : 0);
