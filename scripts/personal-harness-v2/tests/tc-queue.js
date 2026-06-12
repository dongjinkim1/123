// tests/tc-queue.js — TC-1(큐 커버리지·14키 가드) + TC-22(층화 분포)
'use strict';
var fs = require('fs');
var path = require('path');
var oq = require('../order-queue.js');
var STATE = path.join(__dirname, '..', 'state');

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }

var assets = oq.loadAssets();
var tdf = assets.tdf;
var gen = tdf.meta.genericPrefixes;
var strata = JSON.parse(fs.readFileSync(path.join(STATE, 'strata.json'), 'utf8')).할당;

// ── TC-1: 큐 전수 검증 ──
var totalOrders = 0;
oq.SUBJ14.forEach(function (subj) {
  var q = JSON.parse(fs.readFileSync(path.join(STATE, 'queue_' + assets.codes[subj] + '.json'), 'utf8'));
  check('TC-1-subj', q.subject === subj && oq.SUBJ14.indexOf(q.subject) >= 0, q.subject);
  check('TC-1-cov', q.coverage >= 0.95, subj + ' 커버리지 ' + q.coverage);
  var idSeen = {};
  q.orders.forEach(function (o) {
    totalOrders++;
    check('TC-1-subj2', o.subject === subj, o.order_id);
    check('TC-1-tags', o.tags.length >= 2 && o.tags.length <= 4, o.order_id + ' 태그 ' + o.tags.length);
    check('TC-1-id', new RegExp('^H2-' + q.code + '-\\d{3}$').test(o.pattern_id), o.pattern_id);
    check('TC-1-dup', !idSeen[o.pattern_id], o.pattern_id + ' 중복');
    idSeen[o.pattern_id] = 1;
    check('TC-1-support', o.support > 0, o.order_id + ' support 0 (공존 위반)');
    o.tags.forEach(function (t) {
      check('TC-1-generic', !gen.some(function (g) { return t.indexOf(g) === 0; }), o.order_id + ' generic ' + t);
      check('TC-1-kts', t.indexOf('temperament:') !== 0, o.order_id + ' temperament 사용(패치 위반)');
      check('TC-1-df', (tdf.df[t] || 0) < 0.45, o.order_id + ' df 상한 위반 ' + t);
    });
    if (o.anchor) check('TC-1-anchor', o.tags[0] === o.anchor, o.order_id);
  });
  // 앵커 분담 확인
  if (oq.ANCHOR_AXIS[subj]) {
    var ax = oq.ANCHOR_AXIS[subj];
    var anchors = q.orders.filter(function (o) { return o.kind === 'anchor'; });
    check('TC-1-axis', anchors.length >= 100 && anchors.every(function (o) {
      return o.anchor.indexOf(ax + ':') === 0;
    }), subj + ' 앵커축 ' + ax + ' (' + anchors.length + '장)');
  }
});
console.log('[TC-1] 큐 전수(' + totalOrders + '장) 검증: ' + (fails.length === 0 ? 'PASS' : 'FAIL'));

// ── TC-1b: 14키 표기 가드 — 무공백 "올해조언" 즉시 중단 ──
(function () {
  var before = fails.length;
  var threw = false;
  try { oq.buildSubjectQueue('올해조언', assets); } catch (e) { threw = /14키 불일치/.test(String(e.message)); }
  check('TC-1b', threw, '무공백 표기가 중단되지 않음');
  console.log('[TC-1b] "올해조언" 무공백 → 중단: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-22: 층화 — 일반 주문서 strataCell 분포 = 목표 ±7%p ──
(function () {
  var before = fails.length;
  var cells = {}, n = 0;
  oq.SUBJ14.forEach(function (subj) {
    var q = JSON.parse(fs.readFileSync(path.join(STATE, 'queue_' + assets.codes[subj] + '.json'), 'utf8'));
    q.orders.filter(function (o) { return o.kind === 'general'; }).forEach(function (o) {
      cells[o.strataCell] = (cells[o.strataCell] || 0) + 1; n++;
    });
  });
  Object.keys(strata).forEach(function (c) {
    var actual = (cells[c] || 0) / n;
    check('TC-22', Math.abs(actual - strata[c]) <= 0.07,
      c + ' 실제 ' + (actual * 100).toFixed(1) + '% vs 목표 ' + (strata[c] * 100).toFixed(1) + '%');
  });
  console.log('[TC-22] 층화 분포(일반 ' + n + '장): ' + (fails.length === before ? 'PASS' : 'FAIL') +
    ' — ' + Object.keys(strata).map(function (c) {
      return c + ' ' + ((cells[c] || 0) / n * 100).toFixed(1) + '%';
    }).join(' / '));
})();

if (fails.length) {
  console.log('\nFAIL 상세 (상위 20):');
  fails.slice(0, 20).forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-1·1b·22)');
