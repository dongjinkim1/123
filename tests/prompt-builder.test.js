// tests/prompt-builder.test.js — prompt builder integration tests
'use strict';

var assert = require('assert');
var pb = require('../lib/prompt-builder');
var gp = require('../lib/gunghap-prompt');

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

console.log('\n=== prompt-builder tests ===\n');

// buildSajuPrompt
test('buildSajuPrompt returns complete structure', function() {
  var r = pb.buildSajuPrompt({
    y: 1993, m: 5, d: 26, h: 8, min: 40,
    gender: '남성', mbtiChoices: ['R','R','R','L'],
    mbtiIntensities: [70, 65, 80, 55], cityLng: 127
  });
  assert.ok(r.systemPrompt, 'systemPrompt');
  assert.ok(r.userPrompt, 'userPrompt');
  assert.ok(r.saju, 'saju');
  assert.ok(r.gg, 'gg');
  assert.ok(r.dw, 'dw');
  assert.ok(r.mt, 'mt');
  assert.ok(r.mbtiObj, 'mbtiObj');
});

test('buildSajuPrompt system prompt has minimum length', function() {
  var r = pb.buildSajuPrompt({
    y: 1990, m: 3, d: 15, h: 14, min: 30,
    gender: '여성', mbtiChoices: ['L','R','R','L'],
    mbtiIntensities: [68, 55, 88, 68]
  });
  assert.ok(r.systemPrompt.length > 3000, 'system prompt should be >3000 chars, got ' + r.systemPrompt.length);
});

test('buildSajuPrompt user prompt contains saju data', function() {
  var r = pb.buildSajuPrompt({
    y: 1993, m: 5, d: 26, h: 8, min: 40,
    gender: '남성', mbtiChoices: ['R','R','R','L'],
    mbtiIntensities: [70, 65, 80, 55]
  });
  assert.ok(r.userPrompt.indexOf('의뢰인') >= 0, 'should contain 의뢰인');
  assert.ok(r.userPrompt.indexOf('사주 원국') >= 0, 'should contain 사주 원국');
  assert.ok(r.userPrompt.indexOf('격국') >= 0, 'should contain 격국');
  assert.ok(r.userPrompt.indexOf('대운') >= 0, 'should contain 대운');
});

test('buildSajuPrompt includes pattern injection', function() {
  var r = pb.buildSajuPrompt({
    y: 1993, m: 5, d: 26, h: 8, min: 40,
    gender: '남성', mbtiChoices: ['R','R','R','L'],
    mbtiIntensities: [70, 65, 80, 55]
  });
  assert.ok(r.userPrompt.indexOf('교수 토론 교차 패턴') >= 0, 'should contain pattern section');
});

test('buildSajuPrompt handles null hour', function() {
  var r = pb.buildSajuPrompt({
    y: 1990, m: 1, d: 15, h: null, min: null,
    gender: '여성', mbtiChoices: ['R','L','R','L'],
    mbtiIntensities: [60, 60, 60, 60]
  });
  assert.ok(r.systemPrompt, 'should work with null hour');
  assert.ok(r.userPrompt.indexOf('시간 미상') >= 0 || r.userPrompt.indexOf('시간미상') >= 0,
    'should mention unknown hour');
});

// buildGunghapPrompt
test('buildGunghapPrompt returns complete structure', function() {
  var r = gp.buildGunghapPrompt(
    { y: 1993, m: 5, d: 26, h: 8, min: 40, gender: '남성', mbtiType: 'INFP' },
    { y: 1990, m: 3, d: 15, h: 14, min: 30, gender: '여성', mbtiType: 'ENTJ' },
    'lover'
  );
  assert.ok(r.systemPrompt, 'systemPrompt');
  assert.ok(r.userPrompt, 'userPrompt');
  assert.ok(r.sajuA, 'sajuA');
  assert.ok(r.sajuB, 'sajuB');
  assert.ok(r.mtA === 'INFP', 'mtA');
  assert.ok(r.mtB === 'ENTJ', 'mtB');
  assert.ok(r.ghResult, 'ghResult');
  assert.ok(typeof r.ghResult.scores.total === 'number', 'total score');
});

test('buildGunghapPrompt different relTypes produce different prompts', function() {
  var params = [
    { y: 1993, m: 5, d: 26, h: 8, min: 40, gender: '남성', mbtiType: 'INFP' },
    { y: 1990, m: 3, d: 15, h: 14, min: 30, gender: '여성', mbtiType: 'ENTJ' }
  ];
  var rSsom = gp.buildGunghapPrompt(params[0], params[1], 'ssom');
  var rLover = gp.buildGunghapPrompt(params[0], params[1], 'lover');
  assert.ok(rSsom.systemPrompt !== rLover.systemPrompt || rSsom.userPrompt !== rLover.userPrompt,
    'different relTypes should produce different prompts');
});

test('buildGunghapPrompt all 4 relTypes work', function() {
  var pa = { y: 1993, m: 5, d: 26, h: 8, min: 40, gender: '남성', mbtiType: 'INFP' };
  var pb2 = { y: 1990, m: 3, d: 15, h: 14, min: 30, gender: '여성', mbtiType: 'ENTJ' };
  ['ssom', 'lover', 'colleague', 'friend'].forEach(function(rel) {
    var r = gp.buildGunghapPrompt(pa, pb2, rel);
    assert.ok(r.systemPrompt.length > 1000, rel + ' system prompt should be substantial');
    assert.ok(r.userPrompt.length > 500, rel + ' user prompt should be substantial');
  });
});

// Validators
var val = require('../lib/validators');

test('validateInput accepts valid input', function() {
  var err = val.validateInput({
    y: 1993, m: 5, d: 26, h: 8, min: 40, gender: '남성',
    mbtiChoices: ['R','R','R','L'], mbtiIntensities: [70, 65, 80, 55]
  });
  assert.strictEqual(err, null, 'should return null for valid input');
});

test('validateInput rejects invalid year', function() {
  var err = val.validateInput({
    y: 9999, m: 5, d: 26, mbtiChoices: ['R','R','R','L']
  });
  assert.ok(err, 'should reject year 9999');
});

test('validateInput rejects invalid MBTI choices', function() {
  var err = val.validateInput({
    y: 1993, m: 5, d: 26, mbtiChoices: ['X','Y','Z','W']
  });
  assert.ok(err, 'should reject invalid MBTI choices');
});

test('validateInput rejects XSS in gender', function() {
  var err = val.validateInput({
    y: 1993, m: 5, d: 26, gender: '<script>alert(1)</script>',
    mbtiChoices: ['R','R','R','L']
  });
  assert.ok(err, 'should reject XSS');
});

test('validateGunghapInput accepts valid input', function() {
  var err = val.validateGunghapInput(
    { y: 1993, m: 5, d: 26, mbtiType: 'INFP' },
    { y: 1990, m: 3, d: 15, mbtiType: 'ENTJ' },
    'lover'
  );
  assert.strictEqual(err, null, 'should return null');
});

test('validateGunghapInput rejects invalid relType', function() {
  var err = val.validateGunghapInput(
    { y: 1993, m: 5, d: 26, mbtiType: 'INFP' },
    { y: 1990, m: 3, d: 15, mbtiType: 'ENTJ' },
    'enemy'
  );
  assert.ok(err, 'should reject invalid relType');
});

test('validateGunghapInput rejects invalid MBTI type', function() {
  var err = val.validateGunghapInput(
    { y: 1993, m: 5, d: 26, mbtiType: 'XXXX' },
    { y: 1990, m: 3, d: 15, mbtiType: 'ENTJ' },
    'lover'
  );
  assert.ok(err, 'should reject invalid MBTI type');
});

console.log('\n=== Results: ' + passed + ' passed, ' + failed + ' failed ===\n');
process.exit(failed > 0 ? 1 : 0);
