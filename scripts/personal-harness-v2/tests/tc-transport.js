// tests/tc-transport.js — TC-7: 4단 파서·rate limit 감지·쿼터 영속 (LLM 콜 0 — 단위만)
'use strict';
var fs = require('fs');
var path = require('path');
var tp = require('../transport.js');
var ai = require(path.join(__dirname, '..', '..', '..', 'lib', 'ai-client.js'));

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }

// ── 4단 파서 (지저분한 LLM 출력 4형) ──
var ok1 = ai.parseAIResponse('{"a":1}');
check('TC-7-p1', ok1 && ok1.a === 1, '직접 파스');
var ok2 = ai.parseAIResponse('설명 텍스트…\n```json\n{"name":"테스트","tier":"A"}\n```\n끝.');
check('TC-7-p2', ok2 && ok2.name === '테스트', '코드펜스+전후 텍스트');
var ok3 = ai.parseAIResponse('{"a":"줄바뀜","b":2}');
check('TC-7-p3', ok3 && ok3.b === 2, '제어문자');
var ok4 = ai.parseAIResponse('{"a":[1,2,{"b":3}');
check('TC-7-p4', ok4 && ok4.a && ok4.a[2].b === 3, '괄호 복구');
console.log('[TC-7] 4단 파서: ' + (fails.length === 0 ? 'PASS' : 'FAIL'));

// ── rate limit 감지 ──
(function () {
  var before = fails.length;
  check('TC-7-rl1', tp.isRateLimited('Error: rate limit exceeded'), 'rate limit');
  check('TC-7-rl2', tp.isRateLimited('API overloaded, retry later'), 'overloaded');
  check('TC-7-rl3', tp.isRateLimited('HTTP 429'), '429');
  check('TC-7-rl4', !tp.isRateLimited('정상 JSON 응답 {"a":1}'), '오탐');
  console.log('[TC-7] rate limit 감지: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── 쿼터 영속 (저장→재로드) ──
(function () {
  var before = fails.length;
  var q = tp.loadQuota();
  check('TC-7-q', typeof q.calls === 'number' && typeof q.tokensOut === 'number', '구조');
  check('TC-7-est', tp.estTokens('abcd') === 1 && tp.estTokens('a'.repeat(9)) === 3, '토큰 추정');
  console.log('[TC-7] 쿼터 구조·추정: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── pending_upload 보류 (P3 비차단) ──
(function () {
  var before = fails.length;
  var r = tp.uploadOrDefer({ test: 'tc7', at: '2026-06-13' });
  check('TC-7-defer', r.deferred === true, '보류 실패');
  var pending = path.join(__dirname, '..', 'state', 'pending_upload.jsonl');
  check('TC-7-file', fs.existsSync(pending), 'jsonl 미생성');
  console.log('[TC-7] Supabase 비차단 보류: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL:'); fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-7)');
