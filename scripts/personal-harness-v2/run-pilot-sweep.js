// scripts/personal-harness-v2/run-pilot-sweep.js — D10 조건부 스윕: 파일럿 첫 S 1파생군 즉석 실행
// 파생 vs 신규 채택률 첫 실측 (D11 §9 인터리브 비율 결정의 입력). 일회성 후처리.
'use strict';

var fs = require('fs');
var path = require('path');
var h2 = require('./harness2.js');
var sw = require('./sweep.js');

var STATE = path.join(__dirname, 'state');
var LIB = path.join(__dirname, '..', '..', 'lib');
var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var codes = JSON.parse(fs.readFileSync(path.join(STATE, 'subj_codes.json'), 'utf8'));

function aLog(line) {
  fs.appendFileSync(path.join(STATE, 'auto_decisions.log'),
    '[' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ']' + line + '\n', 'utf8');
}

var accepted = fs.readFileSync(path.join(STATE, 'accepted.jsonl'), 'utf8').trim().split('\n')
  .map(function (l) { return JSON.parse(l); });
var sList = accepted.filter(function (p) { return p.tier === 'S'; });
if (!sList.length) { console.log('S 미발생 — 조건부 스윕 불요'); process.exit(0); }

// 첫 S부터 시도, 축 불가면 다음 S 폴백 (D10 — 1파생군만)
var firstS = null, tr = null;
for (var i = 0; i < sList.length; i++) {
  console.log('S 후보: ' + sList[i].id + ' — falsify: ' + sList[i].falsify);
  tr = sw.trigger(sList[i], tdf, codes, aLog);
  console.log('스윕 트리거: ' + JSON.stringify(tr));
  if (tr.queued) { firstS = sList[i]; break; }
  aLog('[파일럿 스윕] ' + sList[i].id + ' 축 불가(' + (tr.reason || '') + ') — 다음 S 폴백');
}
if (!firstS) { aLog('[파일럿 스윕] 전 S 축 불가 — 보고만'); process.exit(0); }

var st = JSON.parse(fs.readFileSync(path.join(STATE, 'harness_state.json'), 'utf8'));
var sq = sw.loadSweepQueue();
var cells = sq.orders.filter(function (o) { return o.derived_from === firstS.id && !o.skipped; });
console.log('파생 칸 ' + cells.length + '장 처리 시작 (실존없음 제외)');

cells.forEach(function (order) {
  if (st.done[order.order_id]) { console.log(order.order_id + ' 기완료 스킵'); return; }
  console.log('처리: ' + order.order_id + ' [' + order.cell + '] support=' + order.support);
  h2.processOrder(order, st, true); // isPilot=true — S여도 재트리거 없음(1세대 가드와 이중 차단)
  fs.writeFileSync(path.join(STATE, 'harness_state.json'), JSON.stringify(st, null, 1), 'utf8');
});

// 집계 결과 보고서 추가
var sq2 = sw.loadSweepQueue();
var fam = sq2.families.filter(function (f) { return f.parent === firstS.id; })[0];
var adopted = fam.results.filter(function (r) { return r.outcome === '채택'; }).length;
var extinct = fam.results.filter(function (r) { return r.outcome === '소멸'; }).length;
var lines = ['', '## 조건부 스윕 실측 (D10 — 첫 S ' + firstS.id + ')',
  '축: ' + fam.axis + ' / 칸 ' + fam.cells.length + ' (실존없음 ' +
    fam.results.filter(function (r) { return r.outcome === '실존없음'; }).length + ')',
  '결과: 채택 ' + adopted + ' / 소멸 ' + extinct + ' / 기타 ' +
    (fam.results.length - adopted - extinct),
  '집계: ' + (fam.aggregate || '(전 칸 미완료)'),
  '파생 채택률 ' + (cells.length ? (adopted / cells.length * 100).toFixed(0) : 0) +
    '% vs 신규 채택률 95% (파일럿 19/20) — 인터리브 5:1 기본값 유지 근거'];
fs.appendFileSync(path.join(STATE, 'reports', 'pilot_report.md'), lines.join('\n'), 'utf8');
aLog('[파일럿 조건부 스윕 완료] ' + firstS.id + ' 축 ' + fam.axis + ' — 채택 ' + adopted + '/' + cells.length);
console.log('완료 — 보고서 추가됨');
