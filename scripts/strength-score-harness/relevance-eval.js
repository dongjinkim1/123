'use strict';
// relevance-eval.js — §7 결정론 평가기: 고정 source-resolver 레지스트리 + normalize/transform/form.
// producer는 레지스트리/정규화/변환/결합을 못 바꾼다(레지스트리 밖 source = M6 FAIL → throw).
// HARD #1: gangdo 재계산 금지 — ctx.score(extractTopFeatures 결과)를 그대로 읽는다.
// 단조성 보증: wᵢ≥0 · fᵢ∈[0,1] · transform 단조증가 → 각 factor·form 모두 단조 비감소.
// ⚠ lib/saju-theory-server.js 는 module.exports(① 실행데이터) → require OK. public/saju-theory.js 아님.
var SJ = require('../../lib/saju-theory-server');

function clamp01(x) { return x < 0 ? 0 : (x > 1 ? 1 : x); }

// === §7.1 고정 source-resolver 레지스트리 (producer 못 바꿈) ===
// 각 리졸버: (spec, ctx) → 원시값(number 또는 label) | null(=factor 생략).
function againstOh(spec, ctx) {
  var a = spec && spec.against;
  if (!a || a === '일간') return ctx && ctx.dmEl;
  return a;
}
var REGISTRY = {
  // gangdo: 강도 magnitude. 재계산 금지 — ctx.score 그대로(0~1). 없으면 생략.
  gangdo: function (spec, ctx) { return (ctx && typeof ctx.score === 'number') ? ctx.score : null; },
  // wuichi: 기둥 충격도 SJ_IMPACT_SCORE[pillar].score(1~5). pillar 없으면 factor 생략.
  wuichi: function (spec, ctx) {
    if (!spec || !spec.pillar) return null;
    var e = SJ.SJ_IMPACT_SCORE[spec.pillar];
    return (e && typeof e.score === 'number') ? e.score : null;
  },
  // gilhyung: 용신 체계 라벨(용신/희신/한신/구신/기신). polarityMag로 크기화. ''→0.5.
  gilhyung: function (spec, ctx) {
    if (!spec || !spec.oh || !ctx || !ctx.yongshin) return '';
    var oh = SJ.SJ_extractYongshinOh(ctx.yongshin);
    if (!oh) return '';
    var chegye = SJ.SJ_calcOsinChegye(oh);
    return chegye ? (SJ.SJ_getOsinLabel(chegye, spec.oh) || '') : '';
  },
  // relation: §6 선펼침 관계 강도 집계(default sum, spec.agg='max' 가능). relMag로 크기화.
  relation: function (spec, ctx) {
    var arr = (ctx && ctx.relations) || [], i, agg = 0;
    if (spec && spec.agg === 'max') { for (i = 0; i < arr.length; i++) agg = Math.max(agg, +arr[i].strength || 0); }
    else { for (i = 0; i < arr.length; i++) agg += (+arr[i].strength || 0); }
    return agg; // 0~1+
  },
  // hyung: §6 선펼침 형 개수(bool01로 존재 0/1).
  hyung: function (spec, ctx) { return ((ctx && ctx.hyung) || []).length; },
  // saeng: block.saeng(생성/피생성) vs against(default 일간 dmEl) 일치 → 0/1.
  saeng: function (spec, ctx) {
    var s = ctx && ctx.saeng; if (!s) return 0;
    var a = againstOh(spec, ctx);
    return (s.generates === a || s.generatedBy === a) ? 1 : 0;
  },
  // geuk: block.geuk(극/피극) vs against(default 일간) 일치 → 0/1.
  geuk: function (spec, ctx) {
    var g = ctx && ctx.geuk; if (!g) return 0;
    var a = againstOh(spec, ctx);
    return (g.controls === a || g.controlledBy === a) ? 1 : 0;
  }
};

// === §7.2 normalize (고정) ===
var POLARITY = [['용신', 1.0], ['희신', 0.7], ['한신', 0.4], ['구신', 0.7], ['기신', 1.0]];
var NORMALIZE = {
  identity: function (x) { return +x || 0; },
  div5: function (x) { return (+x || 0) / 5; },
  polarityMag: function (label) {
    if (label == null || label === '') return 0.5;
    for (var i = 0; i < POLARITY.length; i++) if (String(label).indexOf(POLARITY[i][0]) >= 0) return POLARITY[i][1];
    return 0.5;
  },
  bool01: function (x) { return Array.isArray(x) ? (x.length > 0 ? 1 : 0) : ((+x > 0 || x === true) ? 1 : 0); },
  relMag: function (x) { return clamp01(+x || 0); } // 관계강도→크기(0~1 클램프, 단조 안전)
};

// === §7.2 transform (단조증가만): identity·sqrt·pow:k(k>0)·log1p·div:c(c>0) ===
function makeTransform(spec) {
  var s = String(spec || 'identity'), m;
  if (s === 'identity') return function (x) { return x; };
  if (s === 'sqrt') return function (x) { return Math.sqrt(Math.max(0, x)); };
  if (s === 'log1p') return function (x) { return Math.log1p(Math.max(0, x)); };
  if ((m = /^pow:(.+)$/.exec(s))) {
    var k = parseFloat(m[1]); if (!(k > 0)) throw new Error('transform pow:k k>0 아님: ' + s);
    return function (x) { return Math.pow(Math.max(0, x), k); };
  }
  if ((m = /^div:(.+)$/.exec(s))) {
    var c = parseFloat(m[1]); if (!(c > 0)) throw new Error('transform div:c c>0 아님: ' + s);
    return function (x) { return x / c; };
  }
  throw new Error('알 수 없는 transform: ' + s);
}

// === §7.2 form (wᵢ≥0, fᵢ∈[0,1] → 단조증가) ===
var FORM = {
  weighted_sum: function (fs) {
    var sw = 0, acc = 0, i;
    for (i = 0; i < fs.length; i++) { sw += fs[i].w; acc += fs[i].w * fs[i].f; }
    return sw > 0 ? acc / sw : 0;
  },
  // 가중 기하평균 exp(Σwᵢln fᵢ / Σwᵢ). fᵢ=0(w>0)→0. [0,1] 보존·단조.
  weighted_product: function (fs) {
    var sw = 0, acc = 0, i;
    for (i = 0; i < fs.length; i++) {
      if (fs[i].w <= 0) continue;
      if (fs[i].f <= 0) return 0;
      sw += fs[i].w; acc += fs[i].w * Math.log(fs[i].f);
    }
    return sw > 0 ? Math.exp(acc / sw) : 0;
  },
  min_gate: function (fs) {
    var mn = null, i;
    for (i = 0; i < fs.length; i++) { if (fs[i].w <= 0) continue; if (mn === null || fs[i].f < mn) mn = fs[i].f; }
    return mn === null ? 0 : mn;
  }
};

// === factor 평가: resolve → normalize → transform → clamp01 (null=생략) ===
function resolveFactor(factor, spec, ctx) {
  if (!factor || !REGISTRY[factor.source]) throw new Error('레지스트리 밖 source: ' + (factor && factor.source));
  // factor-level against가 resolver(againstOh)에 닿도록 effective spec에 실어 전달(생략 시 spec 그대로).
  var effSpec = (factor.against != null) ? Object.assign({}, spec, { against: factor.against }) : spec;
  var raw = REGISTRY[factor.source](effSpec, ctx);
  if (raw === null || raw === undefined) return null;
  var nrm = NORMALIZE[factor.normalize || 'identity'];
  if (!nrm) throw new Error('알 수 없는 normalize: ' + factor.normalize);
  var tf = makeTransform(factor.transform || 'identity');
  return clamp01(tf(nrm(raw)));
}

// spec.relevance===null(open) → null(점수 없음). 그 외 [0,1] 점수.
function evalRelevance(spec, ctx) {
  if (!spec || !spec.relevance) return null;
  var rel = spec.relevance, form = FORM[rel.form];
  if (!form) throw new Error('알 수 없는 form: ' + rel.form);
  var factors = rel.factors || [], fs = [], i;
  for (i = 0; i < factors.length; i++) {
    var w = +factors[i].weight; if (!(w >= 0)) throw new Error('weight ≥0 아님: ' + factors[i].key);
    var f = resolveFactor(factors[i], spec, ctx);
    if (f === null) continue;
    fs.push({ key: factors[i].key, w: w, f: f });
  }
  return clamp01(form(fs));
}

module.exports = {
  REGISTRY: REGISTRY, NORMALIZE: NORMALIZE, FORM: FORM,
  makeTransform: makeTransform, resolveFactor: resolveFactor, evalRelevance: evalRelevance,
  clamp01: clamp01, againstOh: againstOh
};
