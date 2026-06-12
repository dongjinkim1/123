// scripts/personal-harness-v2/card-sampler.js — D2: 주문서 보유 실카드 + 쌍둥이 엔진 실계산
// 카드 = 생년월일 폐기(uid+tags). 쌍둥이 = 같은 사주, MBTI만 교체 — V2(누출 0) 실험 전제.
'use strict';

var fs = require('fs');
var path = require('path');

var LIB = path.join(__dirname, '..', '..', 'lib');
var core = require(path.join(LIB, 'saju-core.js'));
var ana = require(path.join(LIB, 'saju-analysis.js'));
var v2 = require(path.join(__dirname, '..', 'vocab', 'build-user-tags-v2.js'));

var BASE_YEAR = 2026;
var CARDS_PER_ORDER = 3;

function hashSeed(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// MBTI 4축 전부 플립 — 대비 최대 쌍둥이 (결정적)
var FLIP = { I: 'E', E: 'I', N: 'S', S: 'N', T: 'F', F: 'T', J: 'P', P: 'J' };
function flipMBTI(t) { return t.split('').map(function (c) { return FLIP[c] || c; }).join(''); }

// 유저(birth 보존분)로 엔진 실계산 — buildUserTagsV2 동일 경로 (TC-2 전제)
function engineTags(u, mbtiOverride) {
  var b = u.birth.split('-').map(Number);
  var saju = core.calcSajuForApp(b[0], b[1], b[2], u.hour, u.min, null);
  var gg = ana.analyzeGyeokguk(saju);
  var dw = ana.calcDaewoon(saju, b[0], b[1], b[2], u.hour, u.min, u.gender);
  var origLog = console.log; console.log = function () {};
  var tags;
  try {
    tags = v2.buildUserTagsV2(saju, gg, dw, mbtiOverride || u.mbti, null,
      { baseYear: BASE_YEAR, birthYear: b[0] });
  } finally { console.log = origLog; }
  var uniq = [], seen = {};
  tags.forEach(function (t) { if (!seen[t]) { seen[t] = 1; uniq.push(t); } });
  return uniq;
}

// 주문서 → 카드 묶음. needTwin = 형식이 쌍둥이대조/하이브리드.
function sampleCards(order, tdf) {
  var users = tdf.users;
  var holders = users.filter(function (u) {
    if (!u._set) { u._set = {}; u.tags.forEach(function (t) { u._set[t] = 1; }); }
    return order.tags.every(function (t) { return u._set[t]; });
  });
  if (!holders.length) return { cards: [], twins: [], holders: 0 };

  var rnd = mulberry32(hashSeed(order.order_id));
  var picked = [];
  var pool = holders.slice();
  for (var i = 0; i < Math.min(CARDS_PER_ORDER, pool.length); i++) {
    picked.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]);
  }

  var cards = picked.map(function (u) {
    return { uid: u.uid, mbti: u.mbti, tags: u.tags }; // 생년월일 폐기(D2)
  });

  var twins = [];
  var needTwin = order.format === '쌍둥이대조' || order.format === '하이브리드';
  if (needTwin) {
    var base = picked[0];
    var twinMbti = flipMBTI(base.mbti);
    twins.push({
      uid: base.uid + '-TWIN', baseUid: base.uid, mbti: twinMbti,
      tags: engineTags(base, twinMbti) // 같은 생일·성별, MBTI만 교체 — 엔진 실계산
    });
  }
  return { cards: cards, twins: twins, holders: holders.length };
}

module.exports = { sampleCards: sampleCards, engineTags: engineTags, flipMBTI: flipMBTI,
  CARDS_PER_ORDER: CARDS_PER_ORDER, BASE_YEAR: BASE_YEAR };
