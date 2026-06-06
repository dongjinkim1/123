'use strict';
// theory-excerpter.test.js — 결정론 청커/인덱스 테스트 (§4.1)
// 검증: readFileSync 성공 / PART 5분할 / 십성:겁재 후보 정밀도(v2.2 회귀가드) / cap / 폴백.
var assert = require('assert');
var ex = require('./theory-excerpter');

var passed = 0, failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  PASS ' + name); }
  catch (e) { failed++; console.log('  FAIL ' + name + ': ' + e.message); }
}

console.log('\n=== theory-excerpter tests ===\n');

// 1) readFileSync load 성공 + 인덱스 구조
test('load(): readFileSync 성공 & 인덱스 구조', function () {
  var idx = ex.load();
  assert.ok(idx && typeof idx.txt === 'string', 'txt 문자열 아님');
  assert.ok(idx.txt.length > 100000, 'corpus 길이 > 100k 아님: ' + idx.txt.length);
  assert.ok(Array.isArray(idx.sections) && idx.sections.length > 10, 'sections > 10 아님: ' + idx.sections.length);
  assert.ok(idx.byPart && typeof idx.byPart === 'object', 'byPart 객체 아님');
});

// 2) PART 정확히 5개 분할 (1..5)
test('PART 정확히 5개 분할 (1..5)', function () {
  var idx = ex.load();
  assert.strictEqual(idx.banners.length, 5, 'banner 5개 아님: ' + idx.banners.length);
  var parts = idx.banners.map(function (b) { return b.part; });
  assert.deepStrictEqual(parts, [1, 2, 3, 4, 5], 'parts=1..5 아님: ' + parts.join(','));
});

// 3) 십성:겁재 후보 — 1순위가 진짜 십성/비겁 섹션 (v2.2 IIFE 서문 오결합 회귀가드)
test('listCandidateSections("십성:겁재") 1순위가 진짜 십성/비겁 섹션', function () {
  var cands = ex.listCandidateSections('십성:겁재');
  assert.ok(Array.isArray(cands) && cands.length > 0, '후보 비어있음');
  var topHit = /십성|비겁|겁재/.test(cands[0].title) || /십성|비겁|겁재/.test(cands[0].preview);
  assert.ok(topHit, '1순위가 십성/비겁/겁재 아님: ' + cands[0].id + ' / ' + cands[0].title);
  // v2.2 버그: 겁재가 IIFE 서문(P1-S01)에 오결합 → 1순위 금지.
  assert.notStrictEqual(cands[0].id, 'P1-S01', 'IIFE 서문이 1순위 (v2.2 버그 재발)');
  // 후보 풀 전체에 십성 섹션이 복수 존재해야 함.
  var hitCount = cands.filter(function (c) {
    return /십성|비겁|겁재/.test(c.title) || /십성|비겁|겁재/.test(c.preview);
  }).length;
  assert.ok(hitCount >= 2, '십성 후보 2개 미만: ' + hitCount);
});

// 4) getSectionText 본문 상한 ≤ 3500 (윈도우 cap)
test('getSectionText 본문 상한 ≤ 3500', function () {
  var idx = ex.load();
  var biggest = idx.sections.reduce(function (a, b) { return b.body.length > a.body.length ? b : a; });
  assert.ok(biggest.body.length > 3500, '전제 불충족(3500 초과 섹션 없음): ' + biggest.body.length);
  var txt = ex.getSectionText(biggest.id);
  assert.strictEqual(txt.length, 3500, 'cap 정확히 3500 아님: ' + txt.length);
});

// 5) 폴백 — 잘못된/불명/part-only/빈 id 도 throw 없이 non-empty
test('getSectionText 폴백: 잘못된 id → throw 없이 non-empty', function () {
  var ids = ['P9-S99', '쓰레기', 'P3', ''];
  for (var i = 0; i < ids.length; i++) {
    var r = ex.getSectionText(ids[i]);
    assert.ok(typeof r === 'string' && r.length > 0, '폴백 non-empty 아님: id="' + ids[i] + '"');
  }
});

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
process.exit(failed ? 1 : 0);
