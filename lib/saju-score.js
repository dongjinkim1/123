// lib/saju-score.js — 사주 재료 통합 점수화 (feature-strength 앵커 + 미점수 요소)
// (a) 통합 랭킹: 십성·신살(원본 그대로) + 관계확장(충·합·형·해·원진·암합)
// (c) 별도 레이어: 신강약·격국·오행결핍 (측정축이 달라 랭킹 비교 불가)
// (b) 보류: 용신·조후·납음·일주물상 (처방/상징 — 결정적 magnitude 없음, label만)
'use strict';

var data = require('./saju-data');
var fs = require('./feature-strength');

var JIJI_KR = data.JIJI_KR;
var JIJI_CHUNG = data.JIJI_CHUNG;   // [[0,6],[1,7],...] 충 6쌍
var JIJI_HYUNG = data.JIJI_HYUNG;   // [[2,5,'무은지형'],...] 형(자형 포함)
var JIJI_HAE = data.JIJI_HAE;       // [[0,7,'자미해'],...] 육해 6쌍
var WONJIN_PAIRS = [[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]]; // saju-analysis 정의와 동일

// 마찰계열(충>형>원진>해) 기저강도. 충 1.0·합 0.8 은 feature-strength 가 담당(원본 무수정).
// 결합계열(암합)은 독립. 값=0 이면 해당 요소 점수기여 제거 → baseline 완전일치(회귀 안전장치).
var EXTRA = { '형': 0.85, '원진': 0.55, '해': 0.4, '암합': 0.5 };
var FRICTION_RANK = { '충': 4, '형': 3, '원진': 2, '해': 1 };
var REL_CAT = (fs.STRENGTH_WEIGHTS.category && fs.STRENGTH_WEIGHTS.category['합충']) || 0.7;

function distMul(i, j) { var d = Math.abs(i - j); return d === 1 ? 1.0 : (d === 2 ? 0.7 : 0.5); }

function matchPair(table, a, b) {
  for (var k = 0; k < table.length; k++) {
    var t = table[k];
    if ((a === t[0] && b === t[1]) || (a === t[1] && b === t[0])) return t;
  }
  return null;
}

// 관계 raw 맵: 충·합(원본) + 형·해·원진·암합. 마찰계열은 동일 위치쌍에서 최강 1개만(중복 차단).
function buildRelationRaw(saju) {
  var raw = fs.calcRelationStrength(saju); // {'자오충':x,'자축합':y,...} 원본 그대로
  var P = saju.P || [];
  var br = [];
  for (var p = 0; p < P.length; p++) br.push(P[p].bi);

  var claim = {}; // 위치쌍 'i_j' → 이미 점유한 마찰 rank
  for (var ci = 0; ci < br.length; ci++) {
    for (var cj = ci + 1; cj < br.length; cj++) {
      if (br[ci] == null || br[cj] == null) continue;
      if (matchPair(JIJI_CHUNG, br[ci], br[cj])) claim[ci + '_' + cj] = FRICTION_RANK['충'];
    }
  }

  function addFriction(table, suffix, rank, base) {
    if (base <= 0) return; // 점수기여 0 → 키 생성 안 함 (회귀 일치 보장)
    for (var i = 0; i < br.length; i++) {
      for (var j = i + 1; j < br.length; j++) {
        if (br[i] == null || br[j] == null) continue;
        if (!matchPair(table, br[i], br[j])) continue;
        var key = i + '_' + j;
        if ((claim[key] || 0) >= rank) continue; // 더 강한 마찰이 점유 → 흡수
        claim[key] = rank;
        var nm = JIJI_KR[br[i]] + JIJI_KR[br[j]] + suffix;
        raw[nm] = (raw[nm] || 0) + base * distMul(i, j);
      }
    }
  }
  addFriction(JIJI_HYUNG, '형', FRICTION_RANK['형'], EXTRA['형']);
  addFriction(WONJIN_PAIRS, '원진', FRICTION_RANK['원진'], EXTRA['원진']);
  addFriction(JIJI_HAE, '해', FRICTION_RANK['해'], EXTRA['해']);

  var am = saju.amhap || [];
  if (am.length > 0 && EXTRA['암합'] > 0) {
    raw['암합'] = (raw['암합'] || 0) + EXTRA['암합'] * Math.min(am.length, 3);
  }

  for (var k in raw) {
    if (Object.prototype.hasOwnProperty.call(raw, k)) raw[k] = Math.round(raw[k] * 100) / 100;
  }
  return raw;
}

// 관계 → feature 배열 (max 정규화 후 category 가중). feature-strength 의 합충 산출과 동일 형식.
function buildRelationFeatures(saju) {
  var raw = buildRelationRaw(saju);
  var keys = Object.keys(raw);
  var max = 0;
  for (var i = 0; i < keys.length; i++) { if (raw[keys[i]] > max) max = raw[keys[i]]; }
  var out = [];
  for (var j = 0; j < keys.length; j++) {
    var nm = keys[j];
    var norm = max > 0 ? raw[nm] / max : 0;
    out.push({
      type: '합충', name: nm,
      score: Math.round(norm * REL_CAT * 1000) / 1000,
      distinct: Math.round(norm * 1000) / 1000,
      ratio: Math.round(norm * 100) / 100,
      absolute: Math.round(raw[nm] * 100) / 100,
      label: norm >= 0.66 ? '강' : (norm >= 0.33 ? '중' : '약')
    });
  }
  return out;
}

// (c) 별도 레이어 — 점수는 되나 변별/두드러짐 축과 측정축이 달라 랭킹 비교 불가.
function buildLayerC(saju, gg) {
  var sScore = (gg && gg.strengthScore != null) ? gg.strengthScore : 50;
  var sinkang = {
    name: '신강약', score: Math.round(sScore) / 100,
    grade: (gg && gg.strengthGrade) || '', label: (gg && gg.strengthGrade) || ''
  };
  var formation = 1.0; // 성격(정격 무파격)
  if (gg) {
    if (gg.isJonggyeok || gg.isHwakyeok) formation = 0.7; // 특수격 성립
    else if (gg.pagyeokInfo) formation = 0.5;             // 파격
  }
  var gyeokguk = {
    name: (gg && gg.gyeokgukName) || '', score: formation,
    label: (gg && gg.gyeokgukName) || '',
    special: !!(gg && (gg.isJonggyeok || gg.isHwakyeok)), pagyeok: !!(gg && gg.pagyeokInfo)
  };
  var missing = (gg && gg.lack) || [];     // el===0 (raw 카운트 — clarity gate 정답명확)
  var weak = saju.lackFull || [];          // elFull<0.3
  var sev = Math.min(1, missing.length * 0.4);
  var ohLack = {
    name: '오행결핍', score: Math.round(sev * 1000) / 1000,
    missing: missing.slice(), weak: weak.slice(),
    label: missing.length > 0 ? missing.join('·') + ' 결핍' : '오행 고름'
  };
  return { sinkang: sinkang, gyeokguk: gyeokguk, ohLack: ohLack };
}

// (b) 보류 — 처방/상징. 결정적 magnitude 없음. label 만 표면으로 전달.
function buildHeld(saju, gg) {
  return {
    yongshin: { label: (gg && gg.yongshin) || '', type: (gg && gg.yongshinType) || '' },
    johu: { label: (gg && gg.johuYongshin) || '' },
    napeum: { label: (gg && gg.napeumText) || '' },
    ilju: { label: (saju.dm || '') + ((saju.P && saju.P[2] && saju.P[2].b) || '') }
  };
}

function extractSajuScore(saju, gg, opts) {
  opts = opts || {};
  // 회귀 안전장치: 추가요소 비활성 → feature-strength 와 완전일치 (위임)
  if (!opts.extras) return fs.extractTopFeatures(saju, gg, opts);

  var threshold = (opts.threshold != null) ? opts.threshold : 0.4;
  var minN = (opts.min != null) ? opts.min : 3;
  var maxN = (opts.max != null) ? opts.max : 7;

  // 십성·신살: feature-strength 산출을 그대로 소비 (재구현 아님 — 무변경)
  var full = fs.extractTopFeatures(saju, gg, { threshold: -1, min: 0, max: 9999 }).topFeatures;
  var pool = [];
  for (var i = 0; i < full.length; i++) {
    if (full[i].type === '십성' || full[i].type === '신살') pool.push(full[i]);
  }
  // 관계(합충/형/해/원진/암합): 재정규화하여 (a) 랭킹 참여
  pool = pool.concat(buildRelationFeatures(saju));

  var passed = pool.filter(function (f) { return f.score >= threshold; });
  passed.sort(function (a, b) { return b.score - a.score; });
  var top = passed.slice(0, maxN);
  if (top.length < minN) {
    var allSorted = pool.slice().sort(function (a, b) { return b.score - a.score; });
    top = allSorted.slice(0, minN);
  }

  return {
    topFeatures: top,
    sinkangForMulsang: {
      grade: (gg && gg.strengthGrade) ? gg.strengthGrade : '',
      score: (gg && gg.strengthScore != null) ? gg.strengthScore : 0
    },
    layerC: buildLayerC(saju, gg), // (c) 비교불가 · 별도 레이어
    held: buildHeld(saju, gg)      // (b) 보류 · 라벨만
  };
}

module.exports = {
  EXTRA: EXTRA,
  FRICTION_RANK: FRICTION_RANK,
  buildRelationRaw: buildRelationRaw,
  buildRelationFeatures: buildRelationFeatures,
  buildLayerC: buildLayerC,
  buildHeld: buildHeld,
  extractSajuScore: extractSajuScore
};
