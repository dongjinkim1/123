// tests/tc-card.js — TC-2(카드-태그 정합) + TC-3(쌍둥이 누출 0)
'use strict';
var fs = require('fs');
var path = require('path');
var cs = require('../card-sampler.js');
var LIB = path.join(__dirname, '..', '..', '..', 'lib');
var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var STATE = path.join(__dirname, '..', 'state');

var fails = [];
function check(n, c, d) { if (!c) fails.push(n + (d ? ' — ' + d : '')); }

var q = JSON.parse(fs.readFileSync(path.join(STATE, 'queue_YAD.json'), 'utf8'));

// ── TC-2: 카드 태그 = buildUserTagsV2 엔진 재계산과 완전 일치 + 주문서 조건 보유 ──
(function () {
  var before = fails.length;
  var byUid = {};
  tdf.users.forEach(function (u) { byUid[u.uid] = u; });
  q.orders.slice(0, 10).forEach(function (o) {
    var r = cs.sampleCards(o, tdf);
    check('TC-2-holders', r.holders === o.support, o.order_id + ' holders ' + r.holders + '≠support ' + o.support);
    r.cards.forEach(function (c) {
      check('TC-2-cond', o.tags.every(function (t) { return c.tags.indexOf(t) >= 0; }),
        o.order_id + ' ' + c.uid + ' 조건 미보유');
      check('TC-2-nobirth', !('birth' in c) && !('hour' in c), c.uid + ' 생년월일 미폐기');
      var recalc = cs.engineTags(byUid[c.uid]);
      check('TC-2-engine', JSON.stringify(recalc) === JSON.stringify(c.tags),
        c.uid + ' 엔진 재계산 불일치');
    });
  });
  console.log('[TC-2] 카드-태그 정합(10주문서): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TC-3: 쌍둥이 — 사주 평면 불변·MBTI 평면만 가변·누출 0 ──
(function () {
  var before = fails.length;
  var SAJU_PRE = ['dm:', 'strength:', 'gyeokguk:', 'condition:', 'ss:', 'pillar:', 'unsung:',
    'sinsal:', 'relation:', 'tongbyeon:', 'yongshin:', 'yongshin_type:', 'yongshin_el:',
    'dwss:', 'sess:'];
  var MBTI_PRE = ['cf:', 'fx:', 'kts:', 'temperament:', 'axis:', 'stress:', 'intensity:'];
  var byUid = {};
  tdf.users.forEach(function (u) { byUid[u.uid] = u; });
  var twinOrders = q.orders.filter(function (o) {
    return o.format === '쌍둥이대조' || o.format === '하이브리드';
  }).slice(0, 5);
  check('TC-3-exist', twinOrders.length > 0, '쌍둥이 형식 주문서 없음');
  twinOrders.forEach(function (o) {
    var r = cs.sampleCards(o, tdf);
    check('TC-3-twin', r.twins.length === 1, o.order_id);
    if (!r.twins.length) return;
    var tw = r.twins[0];
    var base = byUid[tw.baseUid];
    check('TC-3-mbti', tw.mbti === cs.flipMBTI(base.mbti), o.order_id + ' 플립 ' + tw.mbti);
    function pick(tags, pres) {
      return tags.filter(function (t) {
        return pres.some(function (p) { return t.indexOf(p) === 0; });
      }).sort();
    }
    var sajuBase = pick(base.tags, SAJU_PRE), sajuTwin = pick(tw.tags, SAJU_PRE);
    check('TC-3-saju', JSON.stringify(sajuBase) === JSON.stringify(sajuTwin),
      o.order_id + ' 사주 태그 변동(누출): ' + sajuBase.length + '→' + sajuTwin.length);
    var mbtiBase = pick(base.tags, MBTI_PRE), mbtiTwin = pick(tw.tags, MBTI_PRE);
    check('TC-3-vary', JSON.stringify(mbtiBase) !== JSON.stringify(mbtiTwin),
      o.order_id + ' MBTI 태그 무변동(쌍둥이 무의미)');
    // 4축 전부 플립 시 cf 스택·기질 반드시 변동
    check('TC-3-kts', mbtiTwin.join(',').indexOf('kts:') >= 0, o.order_id + ' twin kts 미방출');
  });
  console.log('[TC-3] 쌍둥이 누출 0(' + twinOrders.length + '주문서): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL 상세:');
  fails.slice(0, 15).forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('전체 PASS (TC-2·3)');
