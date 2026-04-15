// lib/index.js — unified re-export (backward compatibility)
'use strict';

var data = require('./saju-data');
var animal = require('./animal-data');
var mbti = require('./mbti-data');
var core = require('./saju-core');
var analysis = require('./saju-analysis');
var pb = require('./prompt-builder');
var validators = require('./validators');
var fb = require('./fallback');
var ai = require('./ai-client');
var chat = require('./chat-engine');

module.exports = {
  // saju-core
  calcSajuForApp: core.calcSajuForApp,

  // saju-analysis
  analyzeGyeokguk: analysis.analyzeGyeokguk,
  calcDaewoon: analysis.calcDaewoon,
  calcRelations: analysis.calcRelations,
  calcGongmang: analysis.calcGongmang,

  // mbti
  getMBTIFromChoices: mbti.getMBTIFromChoices,

  // animal
  getAnimalResult: animal.getAnimalResult,

  // prompt-builder
  buildSajuPrompt: pb.buildSajuPrompt,
  PREMIUM_SYSTEM: pb.PREMIUM_SYSTEM,

  // validators
  postValidateAI: validators.postValidateAI,

  // fallback
  mkFB: fb.mkFB,

  // chat
  buildChatPrompt: chat.buildChatPrompt,

  // ai-client
  parseAIResponse: ai.parseAIResponse,
  isValidJSON: ai.isValidJSON,

  // data re-exports
  TGAN: data.TGAN, TGAN_KR: data.TGAN_KR,
  JIJI: data.JIJI, JIJI_KR: data.JIJI_KR,
  TY: mbti.TY, DM_AX: mbti.DM_AX, MI: mbti.MI,
  ANIMALS: animal.ANIMALS, ILJU_DATA: data.ILJU_DATA
};
