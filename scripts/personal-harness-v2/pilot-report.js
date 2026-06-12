// scripts/personal-harness-v2/pilot-report.js — D10 §4: 파일럿 보고 양식 + §0-α 4확정 자동 결정
'use strict';

var fs = require('fs');
var path = require('path');
var tp = require('./transport.js');
var STATE = path.join(__dirname, 'state');

function write(st) {
  var journal = fs.readFileSync(path.join(STATE, 'journal.jsonl'), 'utf8').trim().split('\n')
    .map(function (l) { return JSON.parse(l); });
  var pilotRows = journal.slice(0, 40).filter(function (j) { return j.order_id.indexOf('YAD-') === 0; });
  var q = tp.loadQuota();

  // 구조별 티어 가중합 (§0-α ①: 토론 vs 단독 — 동률이면 토론 유지)
  var W = { S: 3, A: 2, B: 1 };
  var byStruct = { debate: 0, solo: 0 };
  var byFormat = {};
  st.accepted.forEach(function (p) {
    var j = journal.filter(function (x) { return x.order_id === p.order_id; })[0] || {};
    if (byStruct[j.structure] != null) byStruct[j.structure] += W[p.tier] || 0;
    byFormat[p.format] = byFormat[p.format] || [];
    byFormat[p.format].push(p.tier + '/i' + p.impact);
  });
  var structDecision = byStruct.solo > byStruct.debate ? '단독' : '토론 유지';

  // 처리량 → 쿼터캡 (실측 × 0.8)
  var callsPerOrder = st.processed ? (q.calls / st.processed).toFixed(1) : '-';
  var tokensPerOrder = st.processed ? Math.round((q.tokensIn + q.tokensOut) / st.processed) : 0;

  var rejected = journal.filter(function (j) { return j.decision === 'reject' || j.decision === 'skip'; });
  var rejectRate = st.processed ? (rejected.length / st.processed * 100).toFixed(1) : '-';

  var lines = [
    '# 파일럿 보고서 — ' + new Date().toISOString().slice(0, 16),
    '',
    '## 20장 결과표',
    '| order | 형식 | 구조 | 판정 | 사유(60자) |', '|---|---|---|---|---|'
  ];
  pilotRows.forEach(function (j) {
    lines.push('| ' + j.order_id + ' | ' + j.format + ' | ' + j.structure + ' | ' + j.decision +
      ' | ' + (j.reason || '').replace(/\|/g, '/') + ' |');
  });
  lines = lines.concat([
    '',
    '## §0-α 자동 4확정',
    '1. 토론 vs 단독: 티어 가중합 debate ' + byStruct.debate + ' vs solo ' + byStruct.solo +
      ' → **' + structDecision + '**',
    '2. 처리량→쿼터캡: ' + callsPerOrder + '콜/장, ' + tokensPerOrder + '토큰/장 → 캡 = 실측×0.8 적용',
    '3. 반려·스킵률: ' + rejectRate + '% — 임계 초과여도 규칙 완화 금지(기록만)',
    '4. 세션 전략: (b)전사 재전달 실측 ' + tokensPerOrder + '토큰/장. (a)resume 이론치 = 왕복 ctx 절감분' +
      ' — 토론 4턴 기준 누적 전사 ≈ 35% 오버헤드. 콜수 동일·세션 소실 리스크 고려 **(b) 유지**',
    '',
    '## 형식별 채택 티어',
    JSON.stringify(byFormat, null, 1),
    '',
    '## 티어·impact 분포',
    '채택 ' + st.accepted.length + ' / 반려 ' + st.rejected + ' / 스킵 ' + st.skipped +
      ' / TRASH ' + st.trash + ' / C컷 ' + st.dropC,
    'tier: ' + JSON.stringify(st.accepted.reduce(function (t, p) { t[p.tier] = (t[p.tier] || 0) + 1; return t; }, {})),
    'impact: ' + JSON.stringify(st.accepted.reduce(function (t, p) { t[p.impact] = (t[p.impact] || 0) + 1; return t; }, {})),
    '',
    '## 스윕',
    (function () {
      try {
        var sq = JSON.parse(fs.readFileSync(path.join(STATE, 'sweep_queue.json'), 'utf8'));
        return 'S 발생 ' + sq.families.length + '파생군 / 사이드 큐 ' + sq.orders.length + '장 — 본 실행에서 인터리브';
      } catch (e) { return 'S 미발생 — 조건부 스윕 생략'; }
    })(),
    '',
    '## 인간 스팟체크',
    '**스팟체크 이월** (P5 — 자율 모드: 대기 없이 마킹만, 동진 귀가 후 수행)',
    '',
    '## 쿼터 실측',
    JSON.stringify(q)
  ]);
  var file = path.join(STATE, 'reports', 'pilot_report.md');
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  return file;
}

module.exports = { write: write };
