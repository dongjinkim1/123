'use strict';
// ─────────────────────────────────────────────────────────────────────
// lib/mbti-profile.experimental.js
// MBTI cognitive-function strength formula — experimental / validation build (converged).
//
// Validation log: lib/MBTI_FORMULA_VALIDATION.md
// No original exists — this is a NEW formula. Because no ground-truth answer
// data exists, validation = (1) automatic theory-consistency checks +
// (2) critique of the core assumption (mapping test axis-strength directly to
// cognitive-function manifestation strength). It is NOT an "N/M pass" verdict.
// Production rollout is a separate step, only after Dongjin's approval.
// ─────────────────────────────────────────────────────────────────────

var mdata = require('./mbti-data.js');             // DM_AX, IN_OP, MI, getMBTIFromChoices
var mtheory = require('./mbti-theory-server.js');  // MT_FUNCTIONS, MT_MATURITY
var MT_FUNCTIONS = mtheory.MT_FUNCTIONS;
// Option D (maturity): referenced but intentionally NOT used by this formula.
// The same Fi manifests differently by maturity, but the test input carries no
// maturity signal, so it is excluded. Kept as an explicit reference per spec.
var MT_MATURITY = mtheory.MT_MATURITY; // eslint-disable-line no-unused-vars

// ── 16-type cognitive-function stack (dominant-auxiliary-tertiary-inferior) ──
// Source: Myers-Briggs Type Dynamics. Identical to mbti-theory-server MT_TYPES.stack
// and mbti-data TY.cf.
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

// ── Intensity bucket -> level (same rule as mbti-data IN_OP) ──
function levelOf(rawIt) {
  return (rawIt && rawIt >= 76) ? 88 : (rawIt && rawIt >= 61) ? 68 : 55;
}

// ── Axis-strength mapping (the single tuned lever) ──
//  naive      : level/100             (raw test axis% — assumption (2) in its naive form)
//  compressed : 0.6 + 0.4*level/100   (range-compressed — stack STRUCTURE dominates test %)
// Finding: with naive, when the auxiliary's axis is 2 buckets stronger than the
//   dominant's axis, auxiliary expression > dominant expression -> structural
//   contradiction (주 < 부). compressed preserves 주>부>3차>열등 for ALL inputs.
//   The converged build therefore uses compressed.
var AXIS = {
  naive: function (level) { return level / 100; },
  compressed: function (level) { return 0.6 + 0.4 * (level / 100); }
};

function round3(x) { return Math.round(x * 1000) / 1000; }

// cognitive function -> relevant test-axis index (DM_AX): perceiving->S/N(1), judging->T/F(2)
function fnAxisIndex(fn) {
  return MT_FUNCTIONS[fn].category === 'perceiving' ? 1 : 2;
}

// mbtiChoices: array of 4 ('L'|'R'|null). mbtiIntensities: array of 4 numbers.
// opts.axisMode: 'compressed'(default) | 'naive'. opts.stressFlag: 0|1 (default 1).
function buildProfile(mbtiChoices, mbtiIntensities, opts) {
  opts = opts || {};
  var axisFn = AXIS[opts.axisMode] || AXIS.compressed;
  var stressFlag = (opts.stressFlag != null) ? opts.stressFlag : 1;

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
      note: 'incomplete/unknown type'
    };
  }

  // Layer 1 base = axisStrength * positionWeight (before balance correction)
  var base = [];
  for (var p = 0; p < 4; p++) {
    var fn = stack[p];
    var lvl = axes[fnAxisIndex(fn)].level;
    base.push({ fn: fn, pos: POS[p], level: lvl, raw: axisFn(lvl) * POS_W[POS[p]] });
  }

  // Balance correction = 0.6 + 0.4 * (aux expression / dom expression). Single per-profile scalar.
  var balance = 0.6 + 0.4 * (base[1].raw / base[0].raw);

  var functions = base.map(function (b) {
    return { fn: b.fn, pos: b.pos, level: b.level, 발현강도: round3(b.raw * balance) };
  });

  // Layer 2 grip = dominant expression * 0.3 * stressFlag (inferior function, PART 12)
  var grip = {
    fn: stack[3],
    발현강도: round3(functions[0].발현강도 * 0.3 * stressFlag),
    stressFlag: stressFlag
  };

  return {
    type: type, axes: axes, functions: functions,
    balance: round3(balance), grip: grip
  };
}

module.exports = {
  buildProfile: buildProfile,
  STACK: STACK,
  POS_W: POS_W,
  levelOf: levelOf,
  AXIS: AXIS,
  fnAxisIndex: fnAxisIndex
};
