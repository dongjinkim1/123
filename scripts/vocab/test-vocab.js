// scripts/vocab/test-vocab.js — TW-1 / TW-3 / TW-5 (래퍼 단위 테스트, 생성 전 실행)
'use strict';

var path = require('path');
var LIB = path.join(__dirname, '..', '..', 'lib');
var core = require(path.join(LIB, 'saju-core.js'));
var ana = require(path.join(LIB, 'saju-analysis.js'));
var pd = require(path.join(LIB, 'pattern-data.js'));
var sdata = require(path.join(LIB, 'saju-data.js'));
var v2 = require('./build-user-tags-v2.js');

var _origLog = console.log;
function muteTagLog() { console.log = function () {}; }
function unmute() { console.log = _origLog; }

// mulberry32 — 시드 고정 PRNG (gen-tag-df와 동일 구현)
function mulberry32(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

var MBTI16 = Object.keys(require(path.join(LIB, 'mbti-profile.v2.js')).STACK);
var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function randomPerson(rnd) {
  var y = 1960 + Math.floor(rnd() * 48); // 1960~2007
  var m = 1 + Math.floor(rnd() * 12);
  var maxD = DAYS[m - 1] + ((m === 2 && y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 1 : 0);
  var d = 1 + Math.floor(rnd() * maxD);
  var hasHour = rnd() >= 0.1; // 10% 시간 미상
  var h = hasHour ? Math.floor(rnd() * 24) : null;
  var min = hasHour ? Math.floor(rnd() * 60) : null;
  var gender = rnd() < 0.5 ? '남성' : '여성';
  var mbti = MBTI16[Math.floor(rnd() * 16)];
  return { y: y, m: m, d: d, h: h, min: min, gender: gender, mbti: mbti };
}

function calc(p) {
  var saju = core.calcSajuForApp(p.y, p.m, p.d, p.h, p.min, null);
  var gg = ana.analyzeGyeokguk(saju);
  var dw = ana.calcDaewoon(saju, p.y, p.m, p.d, p.h, p.min, p.gender);
  return { saju: saju, gg: gg, dw: dw };
}

var fails = [];
function check(name, cond, detail) {
  if (!cond) fails.push(name + (detail ? ' — ' + detail : ''));
}

// ── TW-1: 무변형 — 표본 50명, V2에서 신규 prefix 제거 = 기존 산출과 완전 일치 ──
(function tw1() {
  var rnd = mulberry32(11001);
  muteTagLog();
  for (var i = 0; i < 50; i++) {
    var p = randomPerson(rnd);
    var e = calc(p);
    var baseTags = pd.buildUserTags(e.saju, e.gg, e.dw, p.mbti, null);
    var v2Tags = v2.buildUserTagsV2(e.saju, e.gg, e.dw, p.mbti, null,
      { baseYear: 2026, birthYear: p.y });
    var stripped = v2.stripNewAxes(v2Tags);
    if (JSON.stringify(stripped) !== JSON.stringify(baseTags)) {
      unmute();
      check('TW-1', false, 'sample#' + i + ' diff (' + p.y + '-' + p.m + '-' + p.d + ')');
      muteTagLog();
    }
  }
  unmute();
  console.log('[TW-1] 무변형 50명: ' + (fails.length === 0 ? 'PASS' : 'FAIL'));
})();

// ── TW-3: dwss·sess 정합 — 표본 10명 수계산 대조 + 연도 파라미터화 ──
(function tw3() {
  var before = fails.length;
  var rnd = mulberry32(11003);
  var TGAN_KR = sdata.TGAN_KR, JIJI_KR = sdata.JIJI_KR, getSipsung = sdata.getSipsung;
  var nowYear = new Date().getFullYear();
  muteTagLog();
  for (var i = 0; i < 10; i++) {
    var p = randomPerson(rnd);
    var e = calc(p);
    // (a) 실행 연도 기준: pickCurrentDaewoon == calcDaewoon currentDWIdx
    var picked = v2.pickCurrentDaewoon(e.dw, p.y, nowYear);
    var engineCur = e.dw.currentDWIdx >= 0 ? e.dw.daewoons[e.dw.currentDWIdx] : null;
    check('TW-3a', JSON.stringify(picked) === JSON.stringify(engineCur),
      'sample#' + i + ' 대운 선택 불일치');
    // (b) sess 간지: seunGanji(실행연도) == calcDaewoon seun[0]
    var se = v2.seunGanji(nowYear);
    check('TW-3b', TGAN_KR[se.ganIdx] === e.dw.seun[0].gan && JIJI_KR[se.jiIdx] === e.dw.seun[0].ji,
      'sample#' + i + ' 세운 간지 불일치');
    // (c) 십성 대조: dwss 천간십성 == calcDaewoon 기계산 ss / 세운 천간십성 == seun[0].ss
    if (picked) {
      var pair = v2.sipsungPairOf(e.saju.raw.dg, TGAN_KR.indexOf(picked.gan), JIJI_KR.indexOf(picked.ji));
      check('TW-3c-dw', pair[0] === picked.ss, 'sample#' + i + ' 대운 천간십성 ' + pair[0] + '≠' + picked.ss);
    }
    var sePair = v2.sipsungPairOf(e.saju.raw.dg, se.ganIdx, se.jiIdx);
    check('TW-3c-se', sePair[0] === e.dw.seun[0].ss,
      'sample#' + i + ' 세운 천간십성 ' + sePair[0] + '≠' + e.dw.seun[0].ss);
    // (c2) 지지 정기십성 독립 수계산 (JIJANGGAN 마지막 = 정기)
    if (picked) {
      var jiIdx = JIJI_KR.indexOf(picked.ji);
      var manual = getSipsung(e.saju.raw.dg, v2.jeonggiGanIdx(jiIdx));
      var tags = v2.buildUserTagsV2(e.saju, e.gg, e.dw, p.mbti, null, { baseYear: nowYear, birthYear: p.y });
      check('TW-3c-ji', tags.indexOf('dwss:' + manual) >= 0, 'sample#' + i + ' 지지십성 미방출');
    }
    // (d) 연도 파라미터화: 다른 기준 연도로도 에러 없이 재산출
    var t27 = v2.buildUserTagsV2(e.saju, e.gg, e.dw, p.mbti, null, { baseYear: 2027, birthYear: p.y });
    check('TW-3d', t27.some(function (t) { return t.indexOf('sess:') === 0; }),
      'sample#' + i + ' baseYear=2027 sess 미방출');
    // (e) 2027 세운(정미) != 2026 세운(병오) — 연도 반영 확인
    var se27 = v2.seunGanji(2027);
    check('TW-3e', TGAN_KR[se27.ganIdx] === '정' && JIJI_KR[se27.jiIdx] === '미',
      '2027 세운 간지 ' + TGAN_KR[se27.ganIdx] + JIJI_KR[se27.jiIdx]);
  }
  unmute();
  console.log('[TW-3] dwss·sess 정합 10명: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-5: fx — 16타입 전수 3슬롯, tert 미방출, 8기능×3위치=24칸 등재 ──
(function tw5() {
  var before = fails.length;
  var STACK = require(path.join(LIB, 'mbti-profile.v2.js')).STACK;
  var allFx = {};
  MBTI16.forEach(function (t) {
    var fx = v2.fxTags(t);
    check('TW-5-count', fx.length === 3, t + ' 슬롯 ' + fx.length);
    var stack = STACK[t];
    check('TW-5-tert', fx.indexOf('fx:' + stack[2] + '_dom') < 0 &&
      fx.every(function (x) { return x !== 'fx:' + stack[2] + '_tert'; }) &&
      fx.join(',').indexOf('_tert') < 0, t + ' tert 방출');
    check('TW-5-pos', fx[0] === 'fx:' + stack[0] + '_dom' && fx[1] === 'fx:' + stack[1] + '_aux' &&
      fx[2] === 'fx:' + stack[3] + '_inf', t + ' 위치 매핑');
    fx.forEach(function (x) { allFx[x] = true; });
  });
  var FN8 = ['Ni', 'Ne', 'Si', 'Se', 'Ti', 'Te', 'Fi', 'Fe'];
  var missing = [];
  FN8.forEach(function (fn) {
    ['dom', 'aux', 'inf'].forEach(function (pos) {
      if (!allFx['fx:' + fn + '_' + pos]) missing.push(fn + '_' + pos);
    });
  });
  check('TW-5-24', missing.length === 0, '누락 칸: ' + missing.join(','));
  check('TW-5-exact', Object.keys(allFx).length === 24, '칸 수 ' + Object.keys(allFx).length);
  console.log('[TW-5] fx 24칸: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-9: kts — 16타입 전부 정확 1개 방출, Keirsey 매핑 정확 (① 패치) ──
(function tw9() {
  var before = fails.length;
  var EXPECT = {
    INFJ: 'NF', INFP: 'NF', ENFJ: 'NF', ENFP: 'NF',
    INTJ: 'NT', INTP: 'NT', ENTJ: 'NT', ENTP: 'NT',
    ISTJ: 'SJ', ISFJ: 'SJ', ESTJ: 'SJ', ESFJ: 'SJ',
    ISTP: 'SP', ISFP: 'SP', ESTP: 'SP', ESFP: 'SP'
  };
  MBTI16.forEach(function (t) {
    check('TW-9-map', v2.ktsTag(t) === 'kts:' + EXPECT[t],
      t + ' → ' + v2.ktsTag(t) + ' (기대 kts:' + EXPECT[t] + ')');
  });
  // 라이브 버그 케이스 명시 확인: S기질이 kts에서 포착되는가
  check('TW-9-istj', v2.ktsTag('ISTJ') === 'kts:SJ', 'ISTJ');
  check('TW-9-esfp', v2.ktsTag('ESFP') === 'kts:SP', 'ESFP');
  // 실방출 검증: 표본 16명(타입별 1명) — V2 산출에 kts 정확 1개
  var rnd = mulberry32(11009);
  muteTagLog();
  MBTI16.forEach(function (t) {
    var p = randomPerson(rnd);
    p.mbti = t;
    var e = calc(p);
    var tags = v2.buildUserTagsV2(e.saju, e.gg, e.dw, t, null, { baseYear: 2026, birthYear: p.y });
    var ktsList = tags.filter(function (x) { return x.indexOf('kts:') === 0; });
    check('TW-9-emit', ktsList.length === 1 && ktsList[0] === 'kts:' + EXPECT[t],
      t + ' 방출 ' + JSON.stringify(ktsList));
  });
  unmute();
  console.log('[TW-9] kts 16타입 매핑+방출: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL 상세:');
  fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('\n전체 PASS (TW-1·3·5·9)');
