// scripts/personal-harness-v2/debate.js — D3: 사주↔MBTI 교수 자유 핑퐁 (왕복 2라운드 + 산출 1콜)
// 세션 전략 (b)전사 재전달 기본. 교정지시(느린 루프 산출)는 시스템 말미 1줄만 허용.
'use strict';

var prompts = require('./prompts/formats.js');

var MAX_TURNS = 4; // 사주→MBTI→사주→MBTI (쿼터 가드 천장 — 내용 제약 아님)

// transport.call 주입형 (테스트 모킹 가능)
function runDebate(order, cards, twins, callFn, correction) {
  var transcript = [];
  var corr = correction ? '\n\n[운영 메모] ' + correction : '';
  var opener = prompts.debateOpener(order, cards, twins);

  function turn(role, persona, instruction) {
    var ctx = transcript.map(function (t) { return '[' + t.speaker + ']\n' + t.text; }).join('\n\n');
    var p = persona + corr + '\n\n# 주제\n' + opener +
      (ctx ? '\n\n# 지금까지의 토론\n' + ctx : '') + '\n\n# 지시\n' + instruction;
    var r = callFn(role, p, { expectJson: false });
    transcript.push({ speaker: role, text: r.text, tokens: r.tokens, ms: r.ms });
    return r;
  }

  turn('debate-saju', prompts.PERSONA_SAJU, '사주 체계에서 이 조건 조합을 분석해 첫 발언을 하라.');
  turn('debate-mbti', prompts.PERSONA_MBTI, '사주 교수의 발언에 응답하라 — 동의든 반박이든 근거를 들어라.');
  turn('debate-saju', prompts.PERSONA_SAJU, 'MBTI 교수의 응답에 답하고 논점을 좁혀라.');
  turn('debate-mbti', prompts.PERSONA_MBTI, '토론을 마무리할 핵심 합의/이견을 정리하라.');

  // 산출 콜 — 서기는 조립만 (티어·impact는 판정자 전권 — D4)
  var ctxAll = transcript.map(function (t) { return '[' + t.speaker + ']\n' + t.text; }).join('\n\n');
  var synth = callFn('debate-synth',
    '너는 토론 서기다. 아래 토론에서 살아남은 결론만 충실히 조립하라(새 주장 추가 금지).\n\n# 토론 전문\n' +
    ctxAll + '\n\n# 원 주문 조건\n[' + order.tags.join(' + ') + '] / 소주제: ' + order.subject +
    '\n\n' + prompts.OUTPUT_SPEC, { expectJson: true });
  transcript.push({ speaker: 'debate-synth', text: synth.text, tokens: synth.tokens, ms: synth.ms });

  return { output: synth.json, transcript: transcript,
    tokens: transcript.reduce(function (s, t) { return s + (t.tokens || 0); }, 0) };
}

function runSolo(order, cards, twins, callFn, correction) {
  var corr = correction ? '\n\n[운영 메모] ' + correction : '';
  var r = callFn('solo', prompts.soloPrompt(order, cards, twins) + corr, { expectJson: true });
  return { output: r.json, transcript: [{ speaker: 'solo', text: r.text, tokens: r.tokens, ms: r.ms }],
    tokens: r.tokens };
}

function runSweepDebate(parentMechanism, swappedTags, cards, callFn) {
  var r = callFn('sweep', prompts.sweepPrompt(parentMechanism, swappedTags, cards), { expectJson: true });
  return { output: r.json, transcript: [{ speaker: 'sweep', text: r.text, tokens: r.tokens, ms: r.ms }],
    tokens: r.tokens };
}

// 산출 스키마 1차 검증 (코드 가드 — arbiter 전 단계)
function validOutput(o) {
  if (!o) return '산출 null(파싱 실패)';
  if (o['소멸선언']) return null; // 파생 소멸 — 유효
  if (!o.name || !String(o.name).trim()) return 'name 누락';
  if (!o.mechanism) return 'mechanism 누락';
  if (!o.falsify) return 'falsify 누락';
  if (!Array.isArray(o.tags) || o.tags.length < 2 || o.tags.length > 4) return 'tags 2~4 위반';
  return null;
}

module.exports = { runDebate: runDebate, runSolo: runSolo, runSweepDebate: runSweepDebate,
  validOutput: validOutput, MAX_TURNS: MAX_TURNS };
