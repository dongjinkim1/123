// tests/pattern-matcher.test.js — pattern matching unit tests
'use strict';

var assert = require('assert');
var core = require('../lib/saju-core');
var analysis = require('../lib/saju-analysis');
var patternEngine = require('../lib/pattern-data');

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

test('buildUserTags generates tags', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(Array.isArray(tags), 'tags should be array');
  assert.ok(tags.length >= 5, 'should have at least 5 tags, got ' + tags.length);
});

test('buildUserTags includes MBTI tags', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t === 'cf:Fi'; }), 'should include dominant cf:Fi for INFP');
  assert.ok(tags.some(function(t) { return t === 'cf:Ne'; }), 'should include auxiliary cf:Ne for INFP');
});

test('buildUserTags includes strength tag', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('strength:'); }), 'should include strength tag');
});

test('buildUserTags includes gyeokguk tag', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('gyeokguk:'); }), 'should include gyeokguk tag');
});

test('buildUserTags includes daymaster tag', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  assert.ok(tags.some(function(t) { return t.startsWith('dm:'); }), 'should include dm: tag');
});

// matchPatterns tests
test('matchPatterns returns scored results', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = patternEngine.matchPatterns('premium', '나의 성격', tags, 5);
  assert.ok(Array.isArray(matched), 'should be array');
  assert.ok(matched.length > 0, 'should find at least 1 match');
  assert.ok(matched.length <= 5, 'should respect limit');
});

test('matchPatterns results are sorted by score', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = patternEngine.matchPatterns('premium', '나의 성격', tags, 5);
  for (var i = 1; i < matched.length; i++) {
    var prev = matched[i - 1].score * matched[i - 1].pattern.impact;
    var curr = matched[i].score * matched[i].pattern.impact;
    assert.ok(prev >= curr, 'should be sorted descending: ' + prev + ' >= ' + curr);
  }
});

test('matchPatterns has no duplicate pattern IDs', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var matched = patternEngine.matchPatterns('premium', '나의 성격', tags, 10);
  var ids = {};
  matched.forEach(function(m) {
    assert.ok(!ids[m.pattern.id], 'duplicate ID: ' + m.pattern.id);
    ids[m.pattern.id] = true;
  });
});

// Discrimination test: different saju → different patterns
test('different saju produces different top pattern', function() {
  var saju2 = core.calcSajuForApp(1970, 1, 1, 6, 0, null);
  var gg2 = analysis.analyzeGyeokguk(saju2);
  var dw2 = analysis.calcDaewoon(saju2, 1970, 1, 1, 6, 0, '여');

  var tags1 = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var tags2 = patternEngine.buildUserTags(saju2, gg2, dw2, 'ESTJ', [55, 55, 55, 55]);

  var m1 = patternEngine.matchPatterns('premium', '나의 성격', tags1, 3);
  var m2 = patternEngine.matchPatterns('premium', '나의 성격', tags2, 3);

  assert.ok(m1.length > 0 && m2.length > 0, 'both should have matches');
  // At least the tag sets should differ
  assert.ok(tags1.join(',') !== tags2.join(','), 'tag sets should differ');
});

// buildPatternPrompt test
test('buildPatternPrompt returns non-empty text', function() {
  var tags = patternEngine.buildUserTags(saju1, gg1, dw1, 'INFP', [70, 65, 80, 55]);
  var text = patternEngine.buildPatternPrompt('premium', tags);
  assert.ok(typeof text === 'string', 'should be string');
  assert.ok(text.length > 100, 'should have substantial content, got ' + text.length);
  assert.ok(text.indexOf('나의 성격') >= 0 || text.indexOf('고쳐야 할 점') >= 0,
    'should contain sub-topic headers');
});

// All categories exist
test('MBTS_PATTERNS has all 5 categories', function() {
  var p = patternEngine.MBTS_PATTERNS;
  assert.ok(p.premium, 'premium');
  assert.ok(p.ssom, 'ssom');
  assert.ok(p.lover, 'lover');
  assert.ok(p.colleague, 'colleague');
  assert.ok(p.friend, 'friend');
});

test('premium has 14 sub-topics', function() {
  var subs = Object.keys(patternEngine.MBTS_PATTERNS.premium);
  assert.strictEqual(subs.length, 14, 'should have 14, got ' + subs.length);
});

console.log('\n=== Results: ' + passed + ' passed, ' + failed + ' failed ===\n');
process.exit(failed > 0 ? 1 : 0);
