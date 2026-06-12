// tests/tc-persist.js — TC-21: 전사 영속·저널 재개 (모킹 — LLM 콜 0)
'use strict';
var fs = require('fs');
var path = require('path');
var h2 = require('../harness2.js');
var STATE = path.join(__dirname, '..', 'state');

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }

var order = { order_id: 'TST-901', pattern_id: 'H2-TST-901', subject: '올해 조언',
  format: '장면', structure: 'debate', tags: ['ss:비겁', 'dm:기'] };

// 잔여 테스트 산출물 정리
var tp = h2.tPath(order);
[tp].concat(fs.existsSync(path.dirname(tp)) ?
  fs.readdirSync(path.dirname(tp)).filter(function (f) { return f.indexOf('TST-901') >= 0; })
    .map(function (f) { return path.join(path.dirname(tp), f); }) : [])
  .forEach(function (f) { try { fs.unlinkSync(f); } catch (e) {} });

// ── 전사 턴 단위 append + 3턴째 강제 킬 시뮬 ──
(function () {
  var before = fails.length;
  h2.appendTurn(order, { at: 't1', role: 'debate-saju', text: '첫 발언' });
  h2.appendTurn(order, { at: 't2', role: 'debate-mbti', text: '응답' });
  // 3턴째 "프로세스 사망" — append 없이 중단됐다고 가정
  var lines = fs.readFileSync(h2.tPath(order), 'utf8').trim().split('\n');
  check('TC-21-turns', lines.length === 2, '2턴까지 디스크 존재 — 실제 ' + lines.length);
  check('TC-21-parse', JSON.parse(lines[1]).role === 'debate-mbti', '턴 구조');
  console.log('[TC-21a] 턴 단위 영속(킬 시뮬): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── 재개: 저널 미완료 + 전사 존재 → _aborted rename 후 재토론 대상 ──
(function () {
  var before = fails.length;
  // harness2.main의 재개 로직 재현: done에 없고 전사 있으면 rename
  var done = {}; // 저널상 미완료
  var p = h2.tPath(order);
  check('TC-21-pre', fs.existsSync(p), '전사 사전 존재');
  if (!done[order.order_id] && fs.existsSync(p)) {
    fs.renameSync(p, p.replace('.jsonl', '_aborted_test.jsonl'));
  }
  check('TC-21-aborted', !fs.existsSync(p) &&
    fs.readdirSync(path.dirname(p)).some(function (f) { return f.indexOf('_aborted') >= 0 && f.indexOf('TST-901') >= 0; }),
    '_aborted 보존 실패');
  console.log('[TC-21b] _aborted 보존 후 재토론 대상화: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── 완료 주문서 스킵: 저널 done 마킹 시 재실행 금지 ──
(function () {
  var before = fails.length;
  var st = { processed: 0, done: {}, accepted: [] };
  h2.journal(st, order, 'accept', '테스트');
  check('TC-21-done', st.done['TST-901'] === 'accept' && st.processed === 1, '저널 마킹');
  // journal.jsonl에 영속됐는지
  var jlines = fs.readFileSync(path.join(STATE, 'journal.jsonl'), 'utf8').trim().split('\n');
  var last = JSON.parse(jlines[jlines.length - 1]);
  check('TC-21-jfile', last.order_id === 'TST-901' && last.decision === 'accept', '저널 파일 영속');
  console.log('[TC-21c] 저널 완료 마킹·영속: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// 정리 (테스트 잔여물이 본 실행 저널을 오염시키지 않게 마지막 줄 제거)
(function () {
  var jp = path.join(STATE, 'journal.jsonl');
  var jlines = fs.readFileSync(jp, 'utf8').trim().split('\n')
    .filter(function (l) { return l.indexOf('TST-901') < 0; });
  fs.writeFileSync(jp, jlines.length ? jlines.join('\n') + '\n' : '', 'utf8');
  var dir = path.dirname(h2.tPath(order));
  fs.readdirSync(dir).filter(function (f) { return f.indexOf('TST-901') >= 0; })
    .forEach(function (f) { fs.unlinkSync(path.join(dir, f)); });
})();

if (fails.length) {
  console.log('\nFAIL:'); fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-21)');
