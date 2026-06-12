// prompts/formats.js — D3: 시작 형식 5종 + 단독 + 파생 개방형 (질문만 — 결론 지시 금지)
'use strict';

var PERSONA_SAJU = '너는 사주명리학 교수다. 십성·오행·신강도·운성·통변의 체계 안에서만 추론하고, 체계 밖 임의 의미 부여(드리프트)를 하지 않는다. 상대(MBTI 교수)의 주장에 자유롭게 동의하거나 반박하라. 결론을 정해두지 말라.';
var PERSONA_MBTI = '너는 MBTI 인지기능 이론 교수다. 기능 스택(주/부/3차/열등)·기질·축 이론의 체계 안에서만 추론하고, 체계 밖 임의 의미 부여를 하지 않는다. 상대(사주 교수)의 주장에 자유롭게 동의하거나 반박하라. 결론을 정해두지 말라.';
var PERSONA_SOLO = '너는 사주명리와 MBTI 인지기능 양쪽에 정통한 교차 분석가다. 두 체계의 어휘 안에서만 추론하라.';

function cardBlock(cards, twins) {
  var s = '## 실측 카드 (이 조건을 실제 보유한 유저들)\n';
  cards.forEach(function (c, i) {
    s += '카드' + (i + 1) + ' [' + c.mbti + ']: ' + c.tags.join(' ') + '\n';
  });
  if (twins && twins.length) {
    s += '## 쌍둥이 카드 (같은 사주, MBTI만 교체 — 엔진 실계산)\n';
    twins.forEach(function (t) {
      s += '쌍둥이 [' + t.mbti + ']: ' + t.tags.join(' ') + '\n';
    });
  }
  return s;
}

// 시작 질문 5종 — 내용 제약 없음, 형식만
var OPENERS = {
  '장면': function (o) {
    return '조건 [' + o.tags.join(' + ') + ']을 모두 가진 사람이 "' + o.subject +
      '" 영역에서 실제로 겪는 구체적 일상 장면 하나를 떠올리고, 그 장면이 왜 이 조건 조합에서만 나타나는지 메커니즘을 토론하라.';
  },
  '쌍둥이대조': function (o) {
    return '같은 사주에 MBTI만 다른 두 사람(카드 vs 쌍둥이)이 "' + o.subject +
      '" 영역에서 어떻게 갈라지는지 대조하라. 조건 [' + o.tags.join(' + ') + ']이 어느 쪽에서 어떻게 발현되는지 토론하라.';
  },
  '시간서사': function (o) {
    return '조건 [' + o.tags.join(' + ') + ']을 가진 사람의 "' + o.subject +
      '" 이슈가 시간에 따라(과거→현재→다가올 운) 어떻게 전개되는지 서사로 토론하라.';
  },
  '반박라운드': function (o) {
    return '명제: "조건 [' + o.tags.join(' + ') + ']은 \'' + o.subject +
      '\' 영역에서 뚜렷한 고유 패턴을 만든다." 한쪽은 이 명제를 옹호하고 다른 쪽은 반박하라. 반박을 견딘 부분만 살려라.';
  },
  '하이브리드': function (o) {
    return '조건 [' + o.tags.join(' + ') + ']의 "' + o.subject +
      '" 패턴을 (1)구체 장면 (2)쌍둥이 대조 두 각도에서 교차 검증하며 토론하라. 두 각도가 일치하는 핵심만 남겨라.';
  }
};

var OUTPUT_SPEC = '## 최종 산출 (JSON 하나만)\n' +
  '{"name":"패턴 제목 1줄(한글, 메커니즘 핵심)","mechanism":"왜 이 조건 조합에서 이 패턴이 생기는가 — 주장 본문","scene":"일상 예시 장면 1개(장식 — 주장 아님)","falsify":"이 패턴이 성립하지 않는 반대 조건 1줄(예: 신약이면 아님)","tags":["조건 태그 2~4개 — 카드 실보유 태그로 교체·추가 가능"]}\n' +
  '주의: falsify는 반드시 구체 조건. 모든 사주에 통하는 서술(바넘)은 실패작이다.';

function debateOpener(order, cards, twins) {
  return OPENERS[order.format](order) + '\n\n' + cardBlock(cards, twins) +
    '\n태그 어휘는 카드의 prefix:값 형식만 사용하라.';
}

function soloPrompt(order, cards, twins) {
  return PERSONA_SOLO + '\n\n' + debateOpener(order, cards, twins) +
    '\n\n혼자 양쪽 체계를 교차 검증한 뒤 산출하라.\n\n' + OUTPUT_SPEC;
}

// 파생 개방형 (D11 §5) — 부모 name/scene/falsify/tier 주입 금지
function sweepPrompt(parentMechanism, swappedTags, cards) {
  return '검증된 메커니즘 가설:\n"' + parentMechanism + '"\n\n' +
    '이번 조건: [' + swappedTags.join(' + ') + ']\n\n' + cardBlock(cards, null) +
    '\n이 조건에서 위 메커니즘은 발현/변형/소멸/역전 중 무엇인가 — 소멸이면 소멸을 선언하라.\n\n' +
    '## 최종 산출 (JSON 하나만)\n' +
    '발현·변형·역전: {"name":"…","mechanism":"이 조건에서의 메커니즘","scene":"…","falsify":"…","tags":[…]}\n' +
    '소멸: {"소멸선언":true,"사유":"이 조건에서 성립하지 않는 이유 1줄"}';
}

module.exports = {
  PERSONA_SAJU: PERSONA_SAJU, PERSONA_MBTI: PERSONA_MBTI, PERSONA_SOLO: PERSONA_SOLO,
  OPENERS: OPENERS, OUTPUT_SPEC: OUTPUT_SPEC,
  debateOpener: debateOpener, soloPrompt: soloPrompt, sweepPrompt: sweepPrompt,
  cardBlock: cardBlock
};
