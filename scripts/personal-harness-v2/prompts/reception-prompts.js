// prompts/reception-prompts.js — 수용층 융합 v2 프롬프트 (SPEC-reception-fusion-v2 §2 이식)
// 원칙: 게이트 질문(사건을 바꾸나=드리프트)과 생성 질문(어떻게 받나=수용)을 절대 섞지 않음(§1.7).
// 1단계 축 = cf:만 (production buildUserTags 방출 어휘 — temperament substring버그·kts/fx/ei 미방출).
'use strict';

// cf 8기능 (지각/판단). production이 유저에게 풀 스택으로 방출 → 매칭 가능.
var CF_PERCEIVING = ['cf:Se', 'cf:Ni', 'cf:Si', 'cf:Ne'];
var CF_JUDGING = ['cf:Te', 'cf:Ti', 'cf:Fe', 'cf:Fi'];

function cardLine(cards) {
  return (cards || []).map(function (c) {
    return '  - ' + c.uid + '(' + c.mbti + '): ' + (c.tags || []).filter(function (t) {
      return /^(strength|ss|gyeokguk|yongshin|tongbyeon|sinsal|cf):/.test(t);
    }).slice(0, 6).join(', ');
  }).join('\n');
}

// ① axis-determination — 이 사건의 *수용*이 지각기능서 갈리나 판단기능서 갈리나, 아니면 무관(none)인가.
//    none = 유형 무관(분할 불가) → 부모 스킵(억지 융합 방지).
function axisPrompt(parent, coreTags, cards) {
  return '검증된 사주 사건(불변):\n"' + (parent.mechanism || parent.cross || '') + '"\n사건 코어: [' + coreTags.join(', ') + ']\n\n' +
    '이 사건의 *발생·시점·부호*는 사주가 정한다(불변). 질문은 단 하나: **이 사건을 사람이 *어떻게 받고 대응하나*가 MBTI 인지기능의 어느 갈래에서 갈리는가.**\n' +
    '("MBTI가 이 사건에 무슨 영향을 주나"가 아니다 — 그건 드리프트. "같은 사건을 이 기능은 어떻게 소화하나"다.)\n\n' +
    '실존 카드:\n' + cardLine(cards) + '\n\n' +
    '셋 중 하나로 답:\n' +
    '- "perceiving" : 받아들이는 *지각*에서 갈림 (cf:Se 현재직결 / cf:Ni 의미수렴 / cf:Si 전례대조 / cf:Ne 가능성분기)\n' +
    '- "judging" : *판단·대응*에서 갈림 (cf:Te 외부지표 / cf:Ti 내부정합 / cf:Fe 관계조율 / cf:Fi 가치내재)\n' +
    '- "none" : 유형 무관 — 어느 기능이든 *같은 방식*으로 받음(트윈이 안 갈림). 억지로 쪼개지 말 것.\n\n' +
    '쌍둥이 기준: 같은 사주·다른 MBTI가 *실제로 다르게 받아야* 그 갈래다.\n' +
    '{"axis":"perceiving|judging|none","why":"1줄 근거"}';
}

// ② ladder-gen — 선택 갈래의 cf값별 *수용 변형*을 production 8필드로.
function ladderPrompt(parent, coreTags, values, cells) {
  var supLine = (cells || []).map(function (c) { return '[' + c.value + '] 실존 ' + c.support + '명'; }).join(' / ');
  return '검증된 사주 사건(불변):\n"' + (parent.mechanism || parent.cross || '') + '"\n사건 코어: [' + coreTags.join(', ') + ']\n실존 분포: ' + supLine + '\n\n' +
    '이 사건을 아래 cf 기능들이 *각각 어떻게 받고 대응하나* 서술하라. **사건은 사주가 정함 — 너는 "받는·대응하는 방식"만**(부호·발생을 MBTI가 바꾼다 하면 드리프트=실패). 값끼리 명시적으로 차등화.\n' +
    '대상 값: ' + values.join(', ') + '\n\n' +
    '각 값마다 완성 패턴(production 스키마):\n' +
    '  name: "핵심 — 부제" 1줄\n' +
    '  saju: 사건(사주) 조건 1줄\n' +
    '  mbti: 이 기능의 수용·대응 방식 1줄 — **반드시 ": "로 시작** (예: ": Se가 사건을 현재형으로 직결 포착한다")\n' +
    '  cross: 사건 × 수용 교차해설 ~130자\n' +
    '  falsify: 다른 기능은 다르게 받는다는 변별 1줄 (바넘 금지 — 모든 유형에 통하면 실패)\n\n' +
    '{"variants":[{"value":"' + (values[0] || 'cf:Se') + '","name":"...","saju":"...","mbti":": ...","cross":"...","falsify":"..."}]}';
}

// ③ twin-gate — 변형 중 *실질 같게 받는*(병렬·동어반복) 쌍 식별. 중복 그룹 1개만 남김.
function twinPrompt(variants) {
  return '같은 사주 사건을 cf 기능별 수용으로 쓴 것들이다. 각 mechanism이 *실질적으로 다르게 받는가*, 일부는 같은 수용을 라벨만 바꾼 중복인가?\n\n' +
    variants.map(function (v, i) { return '[' + i + '] ' + v.value + ' :: ' + (v.cross || '').slice(0, 100); }).join('\n') +
    '\n\n중복(같은 수용) 그룹만 묶어라. 전부 다르면 빈 배열.\n{"redundant_groups":[[인덱스,...]]}';
}

module.exports = {
  CF_PERCEIVING: CF_PERCEIVING, CF_JUDGING: CF_JUDGING,
  axisPrompt: axisPrompt, ladderPrompt: ladderPrompt, twinPrompt: twinPrompt
};
