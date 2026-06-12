// scripts/vocab/build-user-tags-v2.js
// 명령서① REV2 W-D1/W-D2: 기존 buildUserTags 무변형 래퍼 — 신규 4축 추가 방출
//   dwss:{십성}  현재 대운 천간/지지(정기) → 일간 대비 십성 (baseYear 파라미터)
//   sess:{십성}  baseYear 세운 간지 → 일간 대비 십성 (연도 파라미터 — TW-3)
//   fx:{기능}_{dom|aux|inf}  STACK 위치 기반, tert 제외 (동진 확정)
//   yongshin_el:{오행}  yongshin 자유 문자열 정규화 (실패 시 미방출 — TW-4)
// 기존 buildUserTags 방출분은 1byte도 변형하지 않는다 (TW-1).
'use strict';

var path = require('path');
var LIB = path.join(__dirname, '..', '..', 'lib');
var pd = require(path.join(LIB, 'pattern-data.js'));
var sdata = require(path.join(LIB, 'saju-data.js'));
var profile = require(path.join(LIB, 'mbti-profile.v2.js'));

var TGAN_KR = sdata.TGAN_KR;
var JIJI_KR = sdata.JIJI_KR;
var getSipsung = sdata.getSipsung;
var JIJANGGAN_DATA = sdata.JIJANGGAN_DATA;
var STACK = profile.STACK;

// 상생 순서 (목→화→토→금→수→목). 십성 그룹 offset의 기저.
var OH = ['목', '화', '토', '금', '수'];

// 십성 개별명 → 그룹명
var SS_GROUP = {
  '비견': '비겁', '겁재': '비겁', '비겁': '비겁',
  '식신': '식상', '상관': '식상', '식상': '식상',
  '편재': '재성', '정재': '재성', '재성': '재성',
  '편관': '관성', '정관': '관성', '관성': '관성',
  '편인': '인성', '정인': '인성', '인성': '인성'
};

// 그룹 → 일간 오행 대비 상생 사이클 offset
// 비겁=동일, 식상=내가 생, 재성=내가 극(+2), 관성=나를 극(+3), 인성=나를 생(+4)
var SS_OFFSET = { '비겁': 0, '식상': 1, '재성': 2, '관성': 3, '인성': 4 };

var SS_NAMES_RE = '비겁|비견|겁재|식상|식신|상관|재성|편재|정재|관성|편관|정관|인성|편인|정인';

function ssGroupToEl(groupOrName, dmEl) {
  var group = SS_GROUP[groupOrName];
  var base = OH.indexOf(dmEl);
  if (!group || base < 0) return null;
  return OH[(base + SS_OFFSET[group]) % 5];
}

// 지지 idx → 정기(主氣) 천간 idx — saju-core jiSS와 동일 규칙(지장간 마지막 원소)
function jeonggiGanIdx(jiIdx) {
  var arr = JIJANGGAN_DATA[jiIdx];
  return arr[arr.length - 1].g;
}

// 간지 → 일간 대비 십성 페어 (천간십성, 지지 정기십성) — 중복 시 1개
function sipsungPairOf(dgIdx, ganIdx, jiIdx) {
  var out = [];
  if (ganIdx != null && ganIdx >= 0) {
    var s1 = getSipsung(dgIdx, ganIdx);
    if (s1) out.push(s1);
  }
  if (jiIdx != null && jiIdx >= 0) {
    var s2 = getSipsung(dgIdx, jeonggiGanIdx(jiIdx));
    if (s2 && out.indexOf(s2) < 0) out.push(s2);
  }
  return out;
}

// baseYear 기준 현재 대운 — calcDaewoon currentDWIdx(new Date 의존)의 연도 파라미터화
function pickCurrentDaewoon(dw, birthYear, baseYear) {
  if (!dw || !dw.daewoons || birthYear == null) return null;
  var age = baseYear - birthYear + 1; // calcDaewoon의 한국식 나이 규칙과 동일
  for (var i = 0; i < dw.daewoons.length; i++) {
    var d = dw.daewoons[i];
    if (age >= d.startAge && age <= d.endAge) return d;
  }
  return null;
}

// 세운 간지 — saju-analysis calcDaewoon L151 공식 재현 (연도 파라미터 — TW-3)
function seunGanji(year) {
  var idx = ((year - 4) % 60 + 60) % 60;
  return { ganIdx: idx % 10, jiIdx: idx % 12 };
}

// yongshin 자유 문자열 → 오행 정규화. 실패 시 null (미방출 + 수집 — TW-4).
// 실측 템플릿 5형 (saju-analysis L499~713 + 조후 경로 실방출 2026-06-13 덤프):
//   조후형   "갑목(경작)+계수+병화"        → 첫 항 천간+오행 복합
//   통관형   "수(금목소통)"                → 오행 단독 시작
//   흐름형   "식상→재성 흐름 강화(…)"      → 도착 십성
//   병렬형   "비겁·인성 유지(…)"           → 첫 항 십성
//   십성형   "식신(제살)…" "편재(제편인)…" → 시작 십성
function extractYongshinEl(str, dmEl) {
  if (!str || typeof str !== 'string') return null;
  var s = str.trim();
  var m;
  m = s.match(/^[갑을병정무기경신임계]([목화토금수])/);
  if (m) return m[1];
  m = s.match(/^([목화토금수])\(/);
  if (m) return m[1];
  m = s.match(new RegExp('^(' + SS_NAMES_RE + ')→(' + SS_NAMES_RE + ')\\s*흐름'));
  if (m) return ssGroupToEl(m[2], dmEl);
  m = s.match(new RegExp('^(' + SS_NAMES_RE + ')·(' + SS_NAMES_RE + ')'));
  if (m) return ssGroupToEl(m[1], dmEl);
  m = s.match(new RegExp('^(' + SS_NAMES_RE + ')'));
  if (m) return ssGroupToEl(m[1], dmEl);
  return null;
}

// fx — STACK 위치 기반 3슬롯 (dom/aux/inf, tert 제외)
function fxTags(mbtiType) {
  var stack = STACK[mbtiType];
  if (!stack) return [];
  return ['fx:' + stack[0] + '_dom', 'fx:' + stack[1] + '_aux', 'fx:' + stack[3] + '_inf'];
}

// 메인 래퍼. opts: { baseYear, birthYear }
//   baseYear  — dwss/sess 기준 연도 (미지정 시 실행 연도)
//   birthYear — dwss 대운 선택용 (미지정 시 dw.currentDWIdx fallback = 실행 시점 기준)
function buildUserTagsV2(saju, gg, dw, mbtiType, intensities, opts) {
  opts = opts || {};
  var baseYear = (opts.baseYear != null) ? opts.baseYear : new Date().getFullYear();
  var base = pd.buildUserTags(saju, gg, dw, mbtiType, intensities);
  var extra = [];
  var dgIdx = (saju && saju.raw && typeof saju.raw.dg === 'number') ? saju.raw.dg : null;

  // 1. dwss — 현재 대운 (baseYear 재선택 우선, birthYear 없으면 calcDaewoon 인덱스)
  if (dgIdx != null && dw) {
    var cdw = (opts.birthYear != null)
      ? pickCurrentDaewoon(dw, opts.birthYear, baseYear)
      : ((dw.currentDWIdx >= 0 && dw.daewoons) ? dw.daewoons[dw.currentDWIdx] : null);
    if (cdw) {
      var pair = sipsungPairOf(dgIdx, TGAN_KR.indexOf(cdw.gan), JIJI_KR.indexOf(cdw.ji));
      for (var i = 0; i < pair.length; i++) extra.push('dwss:' + pair[i]);
    }
  }

  // 2. sess — baseYear 세운 (calcDaewoon seun과 무관하게 자체 계산 — 연도 파라미터화)
  if (dgIdx != null) {
    var se = seunGanji(baseYear);
    var sePair = sipsungPairOf(dgIdx, se.ganIdx, se.jiIdx);
    for (var j = 0; j < sePair.length; j++) extra.push('sess:' + sePair[j]);
  }

  // 3. fx
  var fx = fxTags(mbtiType);
  for (var k = 0; k < fx.length; k++) extra.push(fx[k]);

  // 4. yongshin_el
  if (gg && gg.yongshin) {
    var el = extractYongshinEl(gg.yongshin, saju ? saju.dmEl : null);
    if (el) extra.push('yongshin_el:' + el);
  }

  return base.concat(extra);
}

var NEW_PREFIXES = ['dwss:', 'sess:', 'fx:', 'yongshin_el:'];

// V2 산출에서 신규 축 제거 → 기존 buildUserTags 산출 복원 (TW-1 검증용)
function stripNewAxes(tags) {
  return tags.filter(function (t) {
    return !NEW_PREFIXES.some(function (p) { return t.indexOf(p) === 0; });
  });
}

module.exports = {
  buildUserTagsV2: buildUserTagsV2,
  extractYongshinEl: extractYongshinEl,
  fxTags: fxTags,
  seunGanji: seunGanji,
  pickCurrentDaewoon: pickCurrentDaewoon,
  sipsungPairOf: sipsungPairOf,
  jeonggiGanIdx: jeonggiGanIdx,
  ssGroupToEl: ssGroupToEl,
  stripNewAxes: stripNewAxes,
  NEW_PREFIXES: NEW_PREFIXES,
  OH: OH
};
