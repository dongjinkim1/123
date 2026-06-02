'use strict';
// ─────────────────────────────────────────────────────────────────────
// lib/mbti-profile.v2.js
// MBTI cognitive-function strength formula — v2 (converged).
//
// Validation log: lib/MBTI_FORMULA_V2_VALIDATION.md
// Baseline: lib/mbti-profile.experimental.js (preserved as the regression anchor).
//
// v2 adds three correction layers on top of the baseline pipeline, to remove
// two baseline limitations:
//   (1) E/I and J/P test axes were INERT (only S/N and T/F fed function strength).
//   (4) inferior paradox: a stronger type-axis made the inferior LARGER, not smaller.
//
// As with the baseline, NO ground-truth answer data exists. Validation =
// (a) theory-consistency auto-checks (order, no-new-contradiction) and
// (b) critique of the corrections against type dynamics. It is NOT an "N/M pass".
// Production rollout is a separate step, only after Dongjin's approval.
// ─────────────────────────────────────────────────────────────────────

var mdata = require('./mbti-data.js');             // DM_AX, IN_OP, MI, getMBTIFromChoices
var mtheory = require('./mbti-theory-server.js');  // MT_FUNCTIONS, MT_MATURITY
var MT_FUNCTIONS = mtheory.MT_FUNCTIONS;
// Option D (maturity): referenced but intentionally NOT used (no maturity signal in test input).
var MT_MATURITY = mtheory.MT_MATURITY; // eslint-disable-line no-unused-vars

// ── 16-type cognitive-function stack (dominant-auxiliary-tertiary-inferior) ──
// Grant alternating-attitude model. Identical to baseline STACK / MT_TYPES.stack.
var STACK = {
  INTJ: ['Ni', 'Te', 'Fi', 'Se'], INTP: ['Ti', 'Ne', 'Si', 'Fe'],
  ENTJ: ['Te', 'Ni', 'Se', 'Fi'], ENTP: ['Ne', 'Ti', 'Fe', 'Si'],
  INFJ: ['Ni', 'Fe', 'Ti', 'Se'], INFP: ['Fi', 'Ne', 'Si', 'Te'],
  ENFJ: ['Fe', 'Ni', 'Se', 'Ti'], ENFP: ['Ne', 'Fi', 'Te', 'Si'],
  ISTJ: ['Si', 'Te', 'Fi', 'Ne'], ISFJ: ['Si', 'Fe', 'Ti', 'Ne'],
  ESTJ: ['Te', 'Si', 'Ne', 'Fi'], ESFJ: ['Fe', 'Si', 'Ne', 'Ti'],
  ISTP: ['Ti', 'Se', 'Ni', 'Fe'], ISFP: ['Fi', 'Se', 'Ni', 'Te'],
  ESTP: ['Se', 'Ti', 'Fe', 'Ni'], ESFP: ['Se', 'Fi', 'Te', 'Ni']
};

var POS = ['주', '부', '3차', '열등'];
// Position weight — spec-fixed lever (do NOT change).
var POS_W = { '주': 1.0, '부': 0.8, '3차': 0.5, '열등': 0.3 };

// v2 correction coefficients (converged — see validation §4).
//   alpha : E/I and J/P axis sensitivity (보정1, 보정2)
//   beta  : inferior suppression strength (보정3)
//   capEps: strictness margin so auxiliary stays strictly below dominant
var DEFAULTS = { alpha: 0.2, beta: 0.3, capEps: 0.02, axisMode: 'compressed', stressFlag: 1 };

// Level buckets: 55 / 68 / 88. Normalizer maps 55->0, 68->~0.394, 88->1.0.
var LV_MIN = 55, LV_SPAN = 33;
function norm(level) { return (level - LV_MIN) / LV_SPAN; }

// ── Intensity bucket -> level (same rule as mbti-data IN_OP) ──
function levelOf(rawIt) {
  return (rawIt && rawIt >= 76) ? 88 : (rawIt && rawIt >= 61) ? 68 : 55;
}

// ── Axis-strength mapping (carried over from the converged baseline) ──
//  compressed : 0.6 + 0.4*level/100 — stack STRUCTURE dominates raw test %.
var AXIS = {
  naive: function (level) { return level / 100; },
  compressed: function (level) { return 0.6 + 0.4 * (level / 100); }
};

function round3(x) { return Math.round(x * 1000) / 1000; }

// cognitive function -> relevant test-axis index (DM_AX): perceiving->S/N(1), judging->T/F(2)
function fnAxisIndex(fn) {
  return MT_FUNCTIONS[fn].category === 'perceiving' ? 1 : 2;
}
// cognitive function -> attitude ('extraverted' | 'introverted')
function fnAttitude(fn) { return MT_FUNCTIONS[fn].attitude; }

// mbtiChoices: array of 4 ('L'|'R'|null). mbtiIntensities: array of 4 numbers.
// opts: { alpha, beta, capEps, axisMode:'compressed'|'naive', stressFlag:0|1 }
// Setting alpha=0 & beta=0 reproduces the baseline exactly (corrections become identity,
// and the cap never binds because baseline aux <= 0.929*dom < (1-capEps)*dom).
function buildProfile(mbtiChoices, mbtiIntensities, opts) {
  opts = opts || {};
  var alpha = (opts.alpha != null) ? opts.alpha : DEFAULTS.alpha;
  var beta = (opts.beta != null) ? opts.beta : DEFAULTS.beta;
  var capEps = (opts.capEps != null) ? opts.capEps : DEFAULTS.capEps;
  var axisFn = AXIS[opts.axisMode] || AXIS.compressed;
  var stressFlag = (opts.stressFlag != null) ? opts.stressFlag : DEFAULTS.stressFlag;

  var type = mdata.getMBTIFromChoices(mbtiChoices);
  var stack = STACK[type];

  var axes = [];
  for (var i = 0; i < 4; i++) {
    var ax = mdata.DM_AX[i];
    var dir = (mbtiChoices[i] === 'L') ? ax.L : (mbtiChoices[i] === 'R') ? ax.R : '?';
    axes.push({ axis: ax.L + '/' + ax.R, dir: dir, level: levelOf(mbtiIntensities[i]) });
  }

  if (!stack) {
    return {
      type: type, axes: axes, functions: [], grip: null, balance: null,
      corrections: null, note: 'incomplete/unknown type'
    };
  }

  var isIntrovert = (type.charAt(0) === 'I');
  var eiLevel = axes[0].level;  // E/I axis level
  var jpLevel = axes[3].level;  // J/P axis level

  // ── baseline pipeline (Layer 1): axisStrength * positionWeight, then balance ──
  var base = [];
  for (var p = 0; p < 4; p++) {
    var fn = stack[p];
    var lvl = axes[fnAxisIndex(fn)].level;
    base.push({ fn: fn, pos: POS[p], level: lvl, raw: axisFn(lvl) * POS_W[POS[p]] });
  }
  var balance = 0.6 + 0.4 * (base[1].raw / base[0].raw);
  var baseExpr = base.map(function (b) { return b.raw * balance; });

  // ── v2 correction layer (multiplicative, applied on top of baseline expression) ──
  // 보정1 — E/I -> dominant. Dominant attitude always equals the E/I direction.
  //   I-type: dominant is introverted -> E/I alone drives it.
  //   E-type: dominant is extraverted -> E/I AND J/P both point to it -> average (no double count).
  var corrEI = isIntrovert
    ? (1 + alpha * norm(eiLevel))
    : (1 + alpha * norm((eiLevel + jpLevel) / 2));

  // 보정2 — J/P -> the extraverted function.
  //   I-type: the extraverted function is the AUXILIARY -> boost aux.
  //   E-type: J/P already folded into the dominant (보정1) -> no separate aux boost.
  var corrJP = isIntrovert ? (1 + alpha * norm(jpLevel)) : 1;

  // 보정3 — inferior direction. Inferior = opposite of the preferred dominant.
  //   A stronger type-axis means the inferior is MORE repressed, so suppress it.
  var infFn = stack[3];
  var infAxisLevel = axes[fnAxisIndex(infFn)].level;
  var corrInf = 1 - beta * norm(infAxisLevel);

  var corrected = [
    baseExpr[0] * corrEI,  // 주
    baseExpr[1] * corrJP,  // 부
    baseExpr[2],           // 3차 (no correction)
    baseExpr[3] * corrInf  // 열등
  ];

  // ── order-preserving cap (type-dynamics axiom: auxiliary supports, never exceeds dominant) ──
  // Only the auxiliary J/P boost can cross the dominant; clamp it strictly below.
  var domCap = corrected[0] * (1 - capEps);
  var auxCapped = (corrected[1] > domCap);
  if (auxCapped) corrected[1] = domCap;

  var functions = base.map(function (b, idx) {
    return { fn: b.fn, pos: b.pos, level: b.level, 발현강도: round3(corrected[idx]) };
  });

  // Layer 2 grip = dominant expression * 0.3 * stressFlag (inferior function, PART 12)
  var grip = {
    fn: stack[3],
    발현강도: round3(functions[0].발현강도 * 0.3 * stressFlag),
    stressFlag: stressFlag
  };

  return {
    type: type, axes: axes, functions: functions,
    balance: round3(balance), grip: grip,
    corrections: {
      corrEI: round3(corrEI), corrJP: round3(corrJP), corrInf: round3(corrInf),
      auxCapped: auxCapped, alpha: alpha, beta: beta
    }
  };
}

module.exports = {
  buildProfile: buildProfile,
  STACK: STACK,
  POS_W: POS_W,
  levelOf: levelOf,
  AXIS: AXIS,
  fnAxisIndex: fnAxisIndex,
  fnAttitude: fnAttitude,
  DEFAULTS: DEFAULTS
};
