// lib/prompt-builder.js — Saju analysis prompt construction
// Extracts prompt building logic from runSajuAnalysis() into a pure function
// that returns { systemPrompt, userPrompt, saju, gg, dw, mt, mbtiObj }
// without calling any AI API.
'use strict';

var data = require('./saju-data');
var core = require('./saju-core');
var analysis = require('./saju-analysis');
var mbti = require('./mbti-data');
var prompts = require('./prompt-system');
var promptUsr = require('./prompt-builder-usr');

var PREMIUM_SYSTEM = prompts.PREMIUM_SYSTEM;
var GUNGHAP_SYSTEM = prompts.GUNGHAP_SYSTEM;

var TGAN = data.TGAN;
var JIJI = data.JIJI;
var JIJI_KR = data.JIJI_KR;
var JIJANGGAN_DATA = data.JIJANGGAN_DATA;
var getSipsung = data.getSipsung;
var TY = mbti.TY;
var DM_AX = mbti.DM_AX;
var strLv = mbti.strLv;
var getMBTIFromChoices = mbti.getMBTIFromChoices;
var miAllParam = mbti.miAllParam;

// Build the complete saju prompt without calling AI
function buildSajuPrompt(params) {
  var mt = getMBTIFromChoices(params.mbtiChoices);
  var saju = core.calcSajuForApp(+params.y, +params.m, +params.d, params.h ? +params.h : null, params.min ? +params.min : null, params.cityLng);
  var ti = TY[mt] || {n:"탐험가", cf:"Ni-Te-Fi-Se"};
  var gg = analysis.analyzeGyeokguk(saju);
  var dw = analysis.calcDaewoon(saju, +params.y, +params.m, +params.d, params.h ? +params.h : null, params.min ? +params.min : null, params.gender);

  var strArr = params.mbtiChoices.map(function(c, i) { return strLv(params.mbtiIntensities[i]) + ' ' + (c === 'L' ? DM_AX[i].Ll : DM_AX[i].Rl); });
  var mbtiObj = {
    type: mt, cf: ti.cf,
    axes: [
      {side: params.mbtiChoices[0] === 'L' ? 'E' : 'I', pct: params.mbtiIntensities[0] || 60},
      {side: params.mbtiChoices[1] === 'L' ? 'S' : 'N', pct: params.mbtiIntensities[1] || 60},
      {side: params.mbtiChoices[2] === 'L' ? 'T' : 'F', pct: params.mbtiIntensities[2] || 60},
      {side: params.mbtiChoices[3] === 'L' ? 'J' : 'P', pct: params.mbtiIntensities[3] || 60}
    ],
    profile: strArr.join(', ')
  };

  // Build the user prompt via the extracted builder
  var usr = promptUsr.buildUserPrompt(params, saju, gg, dw, mt, ti, strArr, mbtiObj);

  return {
    systemPrompt: PREMIUM_SYSTEM,
    userPrompt: usr,
    saju: saju,
    gg: gg,
    dw: dw,
    mt: mt,
    mbtiObj: mbtiObj
  };
}

module.exports = {
  buildSajuPrompt: buildSajuPrompt,
  PREMIUM_SYSTEM: PREMIUM_SYSTEM,
  GUNGHAP_SYSTEM: GUNGHAP_SYSTEM
};
