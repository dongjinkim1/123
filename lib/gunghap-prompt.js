// lib/gunghap-prompt.js -- gunghap prompt builder (server-side)
'use strict';

var core = require('./saju-core');
var analysis = require('./saju-analysis');
var data = require('./saju-data');
var _pbUsr = require('./prompt-builder-usr');
var mbtiData = require('./mbti-data');
var _sjTheory = require('./saju-theory-server');
var _mbtiTheory = require('./mbti-theory-server');
var _patternData = require('./pattern-data');
var _patternMatcher = require('./pattern-matcher');
var termUtils = require('./term-utils');

// TERM_REPLACE / TERM_HINTS / applyTermHintsGH
// → lib/term-utils.js 로 분리됨. termUtils.applyTermHints 로 접근.

function buildMBTIProfile(label, axes, mbtiType) {
  var leftSides = ['E','S','T','J'];
  var choices = [], intens = [];
  for (var i = 0; i < 4; i++) {
    if (axes && axes[i]) {
      choices.push(leftSides.indexOf(axes[i].side) >= 0 ? 'L' : 'R');
      intens.push(axes[i].pct || 60);
    } else {
      choices.push('R'); intens.push(60);
    }
  }
  var mi = mbtiData.miAllParam(choices, intens);
  var strArr = choices.map(function(c, i) {
    return mbtiData.strLv(intens[i]) + ' ' + (c === 'L' ? mbtiData.DM_AX[i].Ll : mbtiData.DM_AX[i].Rl);
  });
  var txt = '\n### ' + label + '의 MBTI 강도별 행동 프로파일 (' + mbtiType + ')\n';
  for (var i = 0; i < 4; i++) {
    txt += '- ' + strArr[i] + ': ' + mi[i].trait + '\n';
    txt += '  연애: ' + mi[i].love + '\n';
    txt += '  직업: ' + mi[i].work + '\n';
    txt += '  번아웃: ' + mi[i].burn + '\n';
  }
  return txt;
}

// GH_CATEGORIES
var GH_CATEGORIES = {'ssom':{label:'\u{1F495} \uC378',emoji:'\u{1F495}',categories:['\uC0C1\uB300 \uD30C\uC545','\uB098\uC640\uC758 \uAD00\uACC4','\uC2E4\uC804','\uBBF8\uB798'],scoreLabels:{love:'\uB04C\uB9BC',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC77C\uC0C1'},scoreWeights:{love:0.40,comm:0.30,values:0.15,work:0.15},tone:'\uC124\uB818\uACFC \uAD81\uAE08\uD568. \uB450\uADFC\uAC70\uB9AC\uB294 \uD1A4.'},'lover':{label:'\u2764\uFE0F \uC5F0\uC778',emoji:'\u2764\uFE0F',categories:['\uC0C1\uB300 \uD30C\uC545','\uAD81\uD569 \uAD6C\uC870','\uC18C\uD1B5\uACFC \uAC08\uB4F1','\uACB0\uD63C'],scoreLabels:{love:'\uC5F0\uC560',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC0DD\uD65C'},scoreWeights:{love:0.35,comm:0.25,values:0.25,work:0.15},tone:'\uD604\uC2E4\uC801\uC774\uACE0 \uAE4A\uC740 \uBD84\uC11D. \uC194\uC9C1\uD55C \uD1A4.'},'colleague':{label:'\u{1F4BC} \uC9C1\uC7A5 \uB3D9\uB8CC',emoji:'\u{1F4BC}',categories:['\uC0C1\uB300 \uD30C\uC545','\uD611\uC5C5 \uAD6C\uC870','\uC2E4\uC804 \uD301','\uC131\uC7A5'],scoreLabels:{love:'\uCE5C\uBC00\uB3C4',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC5C5\uBB34'},scoreWeights:{love:0.05,comm:0.30,values:0.25,work:0.40},tone:'\uD504\uB85C\uD398\uC154\uB110\uD558\uC9C0\uB9CC \uC778\uAC04\uC801.'},'friend':{label:'\u{1F37B} \uCE5C\uAD6C',emoji:'\u{1F37B}',categories:['\uC0C1\uB300 \uD30C\uC545','\uC6B0\uB9AC \uAD6C\uC870','\uC720\uC9C0\uC640 \uC2DC\uB108\uC9C0','\uC7A5\uAE30'],scoreLabels:{love:'\uC720\uB300\uAC10',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uD65C\uB3D9'},scoreWeights:{love:0.10,comm:0.35,values:0.30,work:0.25},tone:'\uD3B8\uC548\uD558\uACE0 \uC194\uC9C1\uD55C \uD1A4.'}};

// GH_CAT_RANGES
var GH_CAT_RANGES = {
  ssom: [4, 3, 3, 2],
  lover: [4, 3, 2, 3],
  colleague: [4, 3, 3, 2],
  friend: [4, 3, 3, 2]
};

// GUNGHAP_SYSTEM_V2
var GUNGHAP_SYSTEM_V2 = `당신은 대한민국 최정상급 MBTS(사주 × MBTI) 전문가입니다.

## 핵심 임무
두 사람의 사주팔자와 MBTI를 교차 분석하여, "어? 우리 딱 이래!" 하고 소름 돋는 궁합 풀이를 만드세요.

## 재료 계층 (★ 중요)
【1군 — 풀이의 뼈대】
두 사람의 MBTS 핵심 특성(사주 원국 + MBTI 교차)을 네가 가장 잘 살릴 수 있는 방식으로 풀어내라.
- 재료: 관계 교차 패턴, A/B 캐릭터 프로파일, 두 사람의 사주 원국 데이터(일주 물상, 격국, 용신, 합충, 오행)
- 어떤 요소를 꺼낼지는 소주제마다 네가 판단한다. 신강도/용신 같은 특정 요소에 매이지 마라.
- "어? 이거 완전 나잖아" 하고 무릎을 칠 만큼 구체적으로. 두루뭉술한 칭찬 말고, 이 두 사람만의 디테일로.
- 앞 소주제에서 쓴 표현·특성·비유를 다음 소주제에서 반복하지 마라. 매번 새로운 각도로.

【2군 — 보조】 1군을 풍성하게 만드는 살.
- A/B MBTI 강도별 행동 프로파일
- A/B 대운·세운 요약, 합충형해
- 카드별 출발 힌트

【3군 — 필요할 때만】
- MBTI 이론 심층, 사주 이론 심층, 월운, 지장간 비율, 신살, 동적 키워드

## 교차 패턴 활용 (핵심)
각 소주제마다 제공된 교차 패턴 중 이 궁합에 가장 강하게 해당하는 4개를 골라,
그 패턴의 교차해설을 소주제의 뼈대로 사용하세요.
패턴에 없는 내용으로 채우지 마세요. 패턴이 풀이의 주인공입니다.

## 전문용어 금지 (절대 규칙)
사주/MBTI 전문용어(십성·천간지지·신살명·격국명·12운성명·궁위명·운 이름·오행분석용어) 본문 노출 금지. 자연어로 번역.
금지는 본문(b)에만 적용.
물상 비유는 자유: 촛불, 이슬, 칼날, 바위, 호수, 씨앗, 모닥불 등

- 사주 전문용어(한자 포함)를 본문에 절대 쓰지 마세요. 괄호 안 뉘앙스를 참고해서 자연어로만 쓰세요.
전문용어 옆 괄호는 뉘앙스 힌트일 뿐입니다. 그대로 옮기지 마세요. 해당 소주제의 맥락과 흐름에 맞게 자기 말로 풀어쓰세요. 같은 용어라도 소주제마다 다르게 표현하세요.

## 소주제별 균형 (절대 규칙)
각 소주제 본문에 사주 재료와 MBTI 재료가 자연스럽게 어우러져야 함. 한 소주제가 사주만 또는 MBTI만으로 채워지는 것 금지.

## 긍정 먼저 규칙
각 소주제의 b에서 첫 1~2문단은 두 사람의 강점, 케미, 끌림으로 시작하세요.
나머지는 두 사람의 관계에 발현하는 강한 특징과 mbts패턴 위주로 풀이하세요.

## 문체
- 구어체: ~예요, ~거든요. 유저 프롬프트 상단에 명시된 이름(예: ○○님)으로 호칭하세요. "당신", "상대방" 같은 대명사 사용 금지.
- 인지기능 설명: "INFP 특유의 ~~ 성향으로" 식으로 자연어로. 인지기능 코드(Fi, Ni 등)·학술용어("주기능", "Ni-Fi 루프")·인지기능 별명("내면의 심판관", "분위기 리더기", "가능성 탐색기", "미래 내비게이션", "추억 저장소", "현장 스캐너", "내장 논리회로", "실행력 엔진" 등) 노출 금지.
  나쁜 예: "내면의 심판관(Fi)이 주기능이라서..."
  나쁜 예: "Ni-Fi 루프에 빠지면..."
- 내면 독백("~") 항목당 최대 2개. 모든 MBTI에 따뜻한 감성 톤.
- 동네 언니/오빠처럼 카페에서 두 사람 이야기 해주는 느낌으로 쓰세요.
- 의사가 환자에게 소견서 읽어주는 톤 금지.

## _blueprint (풀이 전 메모 — 사용자에게 표시 안 됨)

본문을 쓰기 전에 _blueprint를 먼저 작성하세요. _blueprint는 세 단계입니다:

STEP 1: 각 소주제마다, 관계 교차 패턴과 A/B 캐릭터 프로파일에서 이 궁합에 가장 해당하는 재료 4개를 골라 적으세요.

STEP 2: 12개 소주제 전체를 훑어, 같은 테마가 2개 이상 소주제에 등장하면 한 곳만 남기고 나머지는 다른 재료로 교체.

STEP 3: 각 소주제마다 다음을 적으세요:
- keyword: 그 소주제의 핵심 메시지 한 단어 (12개 중 의미 겹침 금지)
- cross_axis: 두 사람 각각의 사주×MBTI 교차점을 한 줄로 (같은 축 조합 반복 금지)
  예: "A(화일간×직관형) ↔ B(수용신×감정형)"
      "A(배우자궁 편관×J성향) ↔ B(식상과다×P성향)"
      "A↔B 일지충 × A(내향)↔B(외향) 소통 차이"

"_blueprint": {
  "소주제1": {"patterns": ["패턴A","패턴B","패턴C","패턴D"], "keyword": "한단어", "cross_axis": "A(사주×MBTI) ↔ B(사주×MBTI)"},
  "소주제2": {"patterns": [...], "keyword": "...", "cross_axis": "..."},
  ...위 categories에 정의된 소주제 전부
}

_blueprint를 완성한 후에만 categories 본문을 쓰세요.
각 소주제의 첫 문단에서 선택한 cross_axis가 이 궁합에 왜 해당되는지를 풀어쓰세요.

## 소주제 간 중복 방지 (절대 규칙)
- _blueprint STEP 2에서 중복을 제거했으면, 본문에서도 지키세요.
- 같은 테마(예: "실행력 부족", "감정을 혼자 삭임", "경쟁 기질")가 2개 이상의 소주제에서 주요 문단으로 등장하면 안 됩니다.
- 한 소주제에서 주요 테마로 다룬 내용은 다른 소주제에서 한 문장 이내로만 언급할 수 있습니다.

## 반복 금지 (절대 규칙)
- 신강도·에너지 강약(신강/신약/극신강/극신약, "에너지가 약한/적은/부족한" 등)을 직접 언급하는 것은 전체 12개 소주제에서 합쳐서 최대 2회까지. 물상 비유로 전환하면 횟수에 안 셈.
- 같은 형용사·수식어·비유를 3개 이상의 소주제에서 반복 사용 금지. (예: "조용한", "깊은 물", "여린 에너지"를 매 소주제마다 쓰면 불합격)
- 한 소주제에서 핵심으로 다룬 특성은 다른 소주제에서 한 문장 이내로만 스쳐 지나갈 수 있다.

## 작성 규칙
- 각 소주제는 _blueprint에서 고른 재료로 시작하고, 사주 원국 데이터로 뒷받침하세요.
- 각 소주제에서 핵심 패턴 4개 골라서 깊게 풀이하세요. 나열하지 마세요.
관계 패턴과 캐릭터 프로파일을 자유롭게 교차해서 쓰되, 다른 소주제와 내용이 겹치지 않게 하세요.
- 끝낼 곳에서 끝내세요.

## 소주제별 시점 (절대 규칙)
각 소주제에는 시점(speaker)이 지정되어 있습니다. 반드시 해당 시점에서 풀이하세요.
- "B에 대해" → B의 특성을 A에게 설명. 주어는 B(이름).
- "B → A 시점" → B가 A를 바라보는 방향. B의 눈으로 A가 어떻게 보이는지.
- "A → B 방향" → A가 B에게 다가가거나 대처하는 방향. A에게 코칭하는 시점.
- "A ↔ B 양방향" → 둘 사이의 관계를 조망. 어느 한쪽에 치우치지 않게.
시점을 무시하고 일반적인 궁합론을 쓰면 불합격입니다.

## 소주제별 톤 (패턴 선택 후 적용)
해당 소주제의 패턴 4개를 먼저 고른 뒤, 유저 프롬프트에 동봉된 톤 가이드대로 풀어쓰세요.
톤은 재료를 고르는 기준이 아니라 표현 방식입니다.
전체적으로 희망차고 따뜻한 톤을 유지하세요.

## 인사이트/처방
- 본문(b): 풀이만. 처방은 tip에만.
- 추상적 조언 금지. 오늘 당장 할 수 있는 구체적 행동.
- 각 sub의 b 마지막에 반드시 💊로 시작하는 실천 팁 1~2줄. 💊는 내용에 따라 다양한 이모티콘을 써도 돼.

## 데이터 무결성
제공된 점수·숫자·나이·간지·오행개수·세운연도 변경 금지. 없는 합충형 만들기 금지.
대운 나이 범위는 제공 데이터 그대로. MBTI 유형·인지기능 스택 변경 금지.

## quote 필드
적천수 물상 + 계절감 + 두 사람의 사주 분위기. 자연 이미지 한 줄. 납음은 한 줄 요약 전용이므로 여기서는 쓰지 마세요.

## categories 구조
유저 프롬프트에 명시된 카테고리와 소주제 순서를 그대로 따르세요.
★ 각 카테고리 안에 subs 배열, 각 sub는 {"h":"소제목","b":"본문"} 객체. 카테고리를 통째로 하나의 글로 쓰면 불합격.
h는 유저 프롬프트에 정의된 소주제명을 정확히 그대로 사용하세요.

## JSON 출력 형식

{
  "title": "OO일주×XX일주 · XXXX×YYYY 궁합",
  "quote": "자연 이미지 한 줄",
  "totalScore": 87,
  "categories": [
    {
      "n": "카테고리명",
      "subs": [
        {
          "h": "소주제명",
          "b": "문단1\\
\\
문단2\\
\\
💊 실천 팁"
        }
      ]
    }
  ]
}

b: 3~5문단, 각 3~5문장. \\
\\
으로 구분. 마지막 문단은 이모지로 시작하는 실천 팁.
JSON만 출력하세요.`;

// GH_REL_CONFIG
var GH_REL_CONFIG = {
  ssom: {
    title: '\uC378',
    subtitle: '\uC774 \uC0AC\uB78C... \uB098 \uC5B4\uB5BB\uAC8C \uC0DD\uAC01\uD574?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uC124\uB808\uB294 \uD1A4. \uB85C\uB9E8\uD2F1.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC560\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC88B\uC544\uD558\uB294 \uD0C0\uC785', tone: '\uAD6C\uCCB4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801. \uBA85\uD655\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uB04C\uB9AC\uB294 \uC0AC\uB78C\uC758 \uD2B9\uC9D5.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uD0C0\uC785', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uAC70\uBD80\uAC10 \uB290\uB07C\uB294 \uC0AC\uB78C\uC758 \uD2B9\uC9D5.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC6B0\uB9AC \uC0AC\uC774\uC758 \uB04C\uB9BC', tone: '\uC124\uB808\uB294 \uD1A4. \uD655\uC2E0.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uC0AC\uC774\uC5D0 \uD750\uB974\uB294 \uC5D0\uB108\uC9C0.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uD1B5\uD558\uB294 \uC811\uADFC\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uC790\uC2E0\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uB2E4\uAC00\uAC08 \uB54C.' },
      { h: '\uC5ED\uD6A8\uACFC \uB098\uB294 \uD589\uB3D9', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uD558\uBA74 \uC548 \uB418\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uC0AC\uADC0\uB824\uBA74', tone: '\uD604\uC2E4\uC801\uC774\uACE0 \uC804\uB7B5\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uC0AC\uADC0\uAE30 \uC704\uD55C \uC804\uB7B5.' },
      { h: '\uC0AC\uADC0\uBA74 \uC5B4\uB5A4 \uCEE4\uD50C\uC774 \uB418\uB294\uC9C0', tone: '\uB530\uB73B\uD55C \uC0C1\uC0C1. \uAE30\uB300\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uB9CC\uB4E4\uC5B4\uAC08 \uCEE4\uD50C\uC0C1.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  lover: {
    title: '\uC5F0\uC778',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uCABD \uAC00\uB3C4 \uB420\uAE4C?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uB530\uB73B\uD558\uACE0 \uB85C\uB9E8\uD2F1.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC560\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uACF5\uAC10\uD558\uB294 \uD1A4. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC778\uC5D0\uAC8C \uAE30\uB300\uD558\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBBFC\uAC10\uD55C \uBD80\uBD84', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC778\uC5D0\uAC8C\uC11C \uC608\uBBFC\uD574\uC9C0\uB294 \uC9C0\uC810.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uC798 \uB9DE\uB294 \uC9C0\uC810.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC2F8\uC6E0\uC744 \uB54C \uD654\uD574\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uD654\uD574\uD560 \uB54C \uBC29\uBC95.' },
      { h: '\uC6B0\uB9AC\uC5D0\uAC8C \uB9DE\uB294 \uC18C\uD1B5\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC5D0\uAC8C \uB9DE\uB294 \uB300\uD654 \uBC29\uC2DD.' },
      { h: '\uACB0\uD63C\uD558\uBA74 \uC5B4\uB5A4 \uBD80\uBD80\uAC00 \uB418\uB294\uC9C0', tone: '\uD604\uC2E4\uC801\uC774\uACE0 \uC804\uB7B5\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uB9CC\uB4E4\uC5B4\uAC08 \uBD80\uBD80\uC0C1.' },
      { h: '\uACB0\uD63C\uAE4C\uC9C0 \uAC00\uB824\uBA74', tone: '\uB530\uB73B\uD55C \uC0C1\uC0C1. \uAE30\uB300\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uACB0\uD63C\uAE4C\uC9C0 \uAC00\uAE30 \uC704\uD574 \uB458\uC774 \uD574\uC57C \uD560 \uAC83.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  colleague: {
    title: '\uC9C1\uC7A5 \uB3D9\uB8CC',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uC5B4\uB5BB\uAC8C \uC77C\uD574\uC57C \uD560\uAE4C',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5C5\uBB34 \uC2A4\uD0C0\uC77C', tone: '\uAD00\uCC30\uC790 \uD1A4. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC120\uD638\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uCF54\uCE6D \uD1A4. \uC2E4\uC6A9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC88B\uC544\uD558\uB294 \uBC29\uC2DD.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC2EB\uC5B4\uD558\uB294 \uBC29\uC2DD.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uB3D9\uB8CC\uB85C\uC11C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uC2DC\uB108\uC9C0', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC77C\uD560 \uB54C \uB098\uB294 \uD798.' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uD611\uC5C5 \uC2DC \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uB300\uD654\uD560 \uB54C \uD301', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uB9D0 \uAC78 \uB54C.' },
      { h: '\uC774 \uC0AC\uB78C\uC5D0\uAC8C \uC778\uC815\uBC1B\uB294 \uBC95', tone: '\uCC28\uBD84\uD558\uACE0 \uAC1D\uAD00\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uC778\uC815\uBC1B\uC73C\uB824\uBA74.' },
      { h: '\uD2B8\uB7EC\uBE14 \uB0AC\uC744 \uB54C \uB300\uCC98\uBC95', tone: '\uCC28\uBD84\uD558\uACE0 \uAC1D\uAD00\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uBD80\uB52A\uD614\uC744 \uB54C.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uD070 \uADF8\uB9BC. \uD76C\uB9DD\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC131\uC7A5\uD558\uAE30 \uC704\uD574.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  friend: {
    title: '\uCE5C\uAD6C',
    subtitle: '\uC6B0\uB9AC \uC9C4\uC9DC \uCE5C\uD55C \uAC70 \uB9DE\uC9C0?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC6B0\uC815 \uC2A4\uD0C0\uC77C', tone: '\uB530\uB73B\uD55C \uAD00\uCC30. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC640 \uC9C0\uB0BC \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uACF5\uAC10\uD558\uB294 \uD1A4. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC5D0\uAC8C \uAE30\uB300\uD558\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uC11C\uC6B4\uD574\uD558\uB294 \uAC83', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC5D0\uAC8C\uC11C \uC11C\uC6B4\uD574\uC9C0\uB294 \uC9C0\uC810.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uCE5C\uAD6C\uB85C\uC11C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uC798 \uB9DE\uB294 \uC9C0\uC810.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uAC10\uC815 \uD45C\uD604 \uBC29\uC2DD', tone: '\uAC10\uC131\uC801 \uAD00\uCC30. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uAC10\uC815\uC744 \uB4DC\uB7EC\uB0B4\uB294 \uBC29\uC2DD.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uD558\uBA74 \uC798 \uB418\uB294 \uAC83', tone: '\uB530\uB73B\uD55C \uCF54\uCE6D.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8\uD560 \uB54C \uC2DC\uB108\uC9C0 \uB098\uB294 \uC601\uC5ED.' },
      { h: '\uBA40\uC5B4\uC84C\uC744 \uB54C \uD68C\uBCF5\uBC95', tone: '\uB530\uB73B\uD55C \uCF54\uCE6D.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uBA40\uC5B4\uC84C\uC744 \uB54C \uB2E4\uC2DC \uAC00\uAE4C\uC6CC\uC9C0\uB824\uBA74.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uD070 \uADF8\uB9BC. \uD76C\uB9DD\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC131\uC7A5\uD558\uAE30 \uC704\uD574.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  }
};

// ── 소주제별 톤 가이드 (Phase B: getGHSystemPrompt 출력 전용) ──
// GH_REL_CONFIG.subs[].tone 과 별개. 시스템 프롬프트 노출 시 이 룩업의 tone을 사용한다.
// h 키는 GH_REL_CONFIG.subs[].h 와 정확히 일치해야 함.
var GH_SUB_TONE = {
  ssom: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 연애 스타일': '설레는 톤. 로맨틱.',
    '이 사람이 좋아하는 타입': '구체적이고 실용적. 명확하게.',
    '이 사람이 싫어하는 타입': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '우리 사이의 끌림': '설레는 톤. 확신.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '통하는 접근법': '실용적 코칭. 자신감.',
    '역효과 나는 행동': '걱정해주는 톤. 직설적.',
    '이 사람과 사귀려면': '현실적이고 전략적.',
    '사귀면 어떤 커플이 되는지': '따뜻한 상상. 기대감.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  lover: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 연애 스타일': '따뜻하고 로맨틱.',
    '이 사람이 연인에게 바라는 것': '공감하는 톤. 따뜻하게.',
    '이 사람이 연인에게 민감한 부분': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '잘 맞는 부분': '자신감 불어넣기. 확신 톤.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '싸웠을 때 화해법': '실용적 코칭. 따뜻하게.',
    '우리에게 맞는 소통법': '실용적 코칭. 따뜻하게.',
    '결혼하면 어떤 부부가 되는지': '현실적이고 전략적.',
    '결혼까지 가려면': '따뜻한 상상. 기대감.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  colleague: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 업무 스타일': '관찰자 톤. 담백하게.',
    '이 사람이 선호하는 업무 방식': '코칭 톤. 실용적.',
    '이 사람이 싫어하는 업무 방식': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '같이 일할 때 시너지': '자신감 불어넣기. 확신 톤.',
    '같이 일할 때 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '이 사람과 대화할 때 팁': '실용적 코칭. 담백하게.',
    '이 사람에게 인정받는 법': '차분하고 객관적.',
    '트러블 났을 때 대처법': '차분하고 객관적.',
    '이 사람과 같이 성장하려면': '큰 그림. 희망적.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  friend: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 우정 스타일': '따뜻한 관찰. 담백하게.',
    '이 사람이 친구에게 바라는 것': '공감하는 톤. 따뜻하게.',
    '이 사람이 친구에게 서운해하는 것': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '잘 맞는 부분': '자신감 불어넣기. 확신 톤.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '이 사람의 감정 표현 방식': '감성적 관찰. 따뜻하게.',
    '이 사람과 같이 하면 잘 되는 것': '따뜻한 코칭.',
    '멀어졌을 때 회복법': '따뜻한 코칭.',
    '이 사람과 같이 성장하려면': '큰 그림. 희망적.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  }
};

// getGHSystemPrompt
function getGHSystemPrompt(rel) {
  var base = GUNGHAP_SYSTEM_V2;
  var cfg = GH_REL_CONFIG[rel];
  if (!cfg) return base;

  var cat = GH_CATEGORIES[rel];
  var label = cat ? cat.label : rel;

  // v3 categorized subs structure (primary)
  if (cfg.subs && cfg.subs.length > 0) {
    var catNames = (cat && cat.categories) || ['\uC804\uCCB4'];
    var ranges = GH_CAT_RANGES[rel] || [cfg.subs.length];
    var section = '\n## \uAD00\uACC4: ' + label
      + '\n\uBD80\uC81C: ' + (cfg.subtitle || '')
      + '\n\n## categories (' + catNames.length + '\uAC1C \uACE0\uC815, ' + cfg.subs.length + '\uAC1C subs)\n\n';
    var idx = 0;
    for (var c = 0; c < catNames.length; c++) {
      var subNames = [];
      for (var s = 0; s < (ranges[c] || 0); s++) {
        if (idx < cfg.subs.length) {
          subNames.push(cfg.subs[idx].h);
          idx++;
        }
      }
      section += (c + 1) + '. ' + catNames[c] + ': ' + subNames.join(' / ') + '\n';
    }
    // \u2500\u2500 \uC18C\uC8FC\uC81C\uBCC4 \uD1A4 \uAC00\uC774\uB4DC + \uC575\uCEE4 (Phase B) \u2500\u2500
    var toneMap = GH_SUB_TONE[rel] || {};
    section += '\n## \uC18C\uC8FC\uC81C\uBCC4 \uD1A4 + \uC2DC\uC810 \uAC00\uC774\uB4DC\n';
    for (var ti = 0; ti < cfg.subs.length; ti++) {
      var subH = cfg.subs[ti].h;
      var subTone = toneMap[subH] || '\uB2F4\uBC31\uD55C \uD1A4.';
      var subSpeaker = cfg.subs[ti].speaker || '';
      section += (ti + 1) + '. ' + subH + '\n';
      section += '   \uC2DC\uC810: ' + subSpeaker + '\n';
      section += '   \uD1A4: "' + subTone + '"\n';
      section += '   \uC575\uCEE4: \uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD\n';
    }
    section += '\n\u2605 \uAC01 \uCE74\uD14C\uACE0\uB9AC \uC548\uC5D0 subs \uBC30\uC5F4, \uAC01 sub\uB294 {"h":"\uC18C\uC81C\uBAA9","b":"\uBCF8\uBB38"} \uAC1D\uCCB4. \uCE74\uD14C\uACE0\uB9AC\uB97C \uD1B5\uC9F8\uB85C \uD558\uB098\uC758 \uAE00\uB85C \uC4F0\uBA74 \uBD88\uD569\uACA9.\n';
    section += '\uBC18\uB4DC\uC2DC \uC704 \uCE74\uD14C\uACE0\uB9AC\uC640 \uC18C\uC8FC\uC81C \uC804\uBD80\uB97C \uBE60\uC9D0\uC5C6\uC774 \uC21C\uC11C\uB300\uB85C \uC791\uC131\uD558\uC138\uC694.\n';
    section += 'h\uB294 \uC704\uC5D0 \uC815\uC758\uB41C \uC18C\uC8FC\uC81C\uBA85\uC744 \uC815\uD655\uD788 \uADF8\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n';
    return base + section;
  }

  // legacy: nested categories structure (fallback)
  if (cfg.categories && cfg.categories[0] && cfg.categories[0].subs) {
    var section2 = '\n## \uAD00\uACC4: ' + label
      + '\n\uBD80\uC81C: ' + (cfg.subtitle || '')
      + '\n\n## \uC18C\uC8FC\uC81C (\uC21C\uC11C\uB300\uB85C \uC791\uC131)\n\n';
    var subCount = 0;
    cfg.categories.forEach(function(c) {
      section2 += '### ' + c.name + '\n';
      c.subs.forEach(function(s) {
        subCount++;
        section2 += subCount + '. ' + s.h + '\n';
      });
      section2 += '\n';
    });
    section2 += '\n\uBC18\uB4DC\uC2DC \uC704 \uC18C\uC8FC\uC81C \uC804\uBD80\uB97C \uBE60\uC9D0\uC5C6\uC774 \uC21C\uC11C\uB300\uB85C \uC791\uC131\uD558\uC138\uC694.\n';
    section2 += 'h\uB294 \uC704\uC5D0 \uC815\uC758\uB41C \uC18C\uC8FC\uC81C\uBA85\uC744 \uC815\uD655\uD788 \uADF8\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n';
    return base + section2;
  }

  // fallback: simple categories
  var catSection = '\n## \uAD00\uACC4: ' + label + '\n\uCE74\uD14C\uACE0\uB9AC:\n';
  if (cfg.categories) {
    cfg.categories.forEach(function(c, i) { catSection += (i + 1) + '. ' + c + '\n'; });
  }
  return base + catSection;
}

// buildGunghapPrompt
function buildGunghapPrompt(paramsA, paramsB, relType) {
  // paramsA = { y, m, d, h, min, gender, mbtiType, mbtiAxes?: [{side,pct},...], name?: '○○님' }
  // paramsB = { y, m, d, h, min, gender, mbtiType, mbtiAxes?: [{side,pct},...], name?: '○○님' }
  // relType = 'ssom' | 'lover' | 'colleague' | 'friend'

  // 호칭: 이름이 있으면 사용, 없으면 A/B fallback (프롬프트 텍스트 전용 — 코드/변수명은 A/B 유지)
  var nameA = paramsA.name || 'A';
  var nameB = paramsB.name || 'B';

  // Calculate person A
  var sajuA = core.calcSajuForApp(+paramsA.y, +paramsA.m, +paramsA.d,
    paramsA.h ? +paramsA.h : null, paramsA.min ? +paramsA.min : null, paramsA.cityLng || null);
  var ggA = analysis.analyzeGyeokguk(sajuA);
  var genderA = (paramsA.gender === '\uB0A8\uC131' || paramsA.gender === '\uB0A8') ? '\uB0A8' : '\uC5EC';
  var dwA = analysis.calcDaewoon(sajuA, +paramsA.y, +paramsA.m, +paramsA.d,
    paramsA.h ? +paramsA.h : 12, paramsA.min ? +paramsA.min : 0, genderA);

  // Build MBTI object A
  var tiA = mbtiData.TY[paramsA.mbtiType] || {n:"\uD0D0\uD5D8\uAC00", cf:"Ni-Te-Fi-Se"};
  var mbtiObjA;
  if (paramsA.mbtiAxes && paramsA.mbtiAxes.length === 4) {
    mbtiObjA = {
      type: paramsA.mbtiType, cf: tiA.cf,
      axes: paramsA.mbtiAxes, profile: ''
    };
  } else {
    mbtiObjA = {
      type: paramsA.mbtiType, cf: tiA.cf,
      axes: [
        {side: paramsA.mbtiType[0], pct: 60},
        {side: paramsA.mbtiType[1], pct: 60},
        {side: paramsA.mbtiType[2], pct: 60},
        {side: paramsA.mbtiType[3], pct: 60}
      ], profile: ''
    };
  }

  // Calculate person B
  var sajuB = core.calcSajuForApp(+paramsB.y, +paramsB.m, +paramsB.d,
    paramsB.h ? +paramsB.h : null, paramsB.min ? +paramsB.min : null, null);
  var ggB = analysis.analyzeGyeokguk(sajuB);
  var genderB = (paramsB.gender === '\uB0A8\uC131' || paramsB.gender === '\uB0A8') ? '\uB0A8' : '\uC5EC';
  var dwB = analysis.calcDaewoon(sajuB, +paramsB.y, +paramsB.m, +paramsB.d,
    paramsB.h ? +paramsB.h : 12, paramsB.min ? +paramsB.min : 0, genderB);

  var tiB = mbtiData.TY[paramsB.mbtiType] || {n:"\uD0D0\uD5D8\uAC00", cf:"Ni-Te-Fi-Se"};
  var mbtiObjB;
  if (paramsB.mbtiAxes && paramsB.mbtiAxes.length === 4) {
    mbtiObjB = {
      type: paramsB.mbtiType, cf: tiB.cf,
      axes: paramsB.mbtiAxes, profile: ''
    };
  } else {
    mbtiObjB = {
      type: paramsB.mbtiType, cf: tiB.cf,
      axes: [
        {side: paramsB.mbtiType[0], pct: 60},
        {side: paramsB.mbtiType[1], pct: 60},
        {side: paramsB.mbtiType[2], pct: 60},
        {side: paramsB.mbtiType[3], pct: 60}
      ], profile: ''
    };
  }

  // Run gunghap engine
  var ghResult = analysis.analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB);

  // Apply score weights
  var cat = GH_CATEGORIES[relType];
  if (cat && cat.scoreWeights) {
    var w = cat.scoreWeights;
    ghResult.scores.total = Math.round(
      ghResult.scores.love * w.love + ghResult.scores.comm * w.comm +
      ghResult.scores.values * w.values + ghResult.scores.work * w.work
    );
  }

  // Build user prompt
  var userPrompt = analysis.buildGunghapUserPrompt(
    ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB
  );

  // 호칭 안내 — 본문 최상단에 prepend (AI가 가장 먼저 읽도록)
  userPrompt = '[호칭 안내] A = ' + nameA + ' / B = ' + nameB + ' — 본문에서 반드시 이 이름으로 호칭하세요.\n\n' + userPrompt;

  // ── A/B 원국 상세 데이터 주입 ──
  var TGAN_KR = data.TGAN_KR;
  var JIJI_KR = data.JIJI_KR;
  var ILJU_DATA = data.ILJU_DATA;

  function buildWonkukDetail(label, saju, gg) {
    var txt = '\n### ' + label + '의 원국 상세\n';
    // 천간십성
    txt += '- 천간십성: ' + saju.ss.map(function(s){ return s.pillar+' '+s.stem+'('+s.ss+')'; }).join(', ') + '\n';
    // 궁위십성 (지지정기 기준)
    txt += '- 궁위십성: ' + saju.jiSS.map(function(j){ return j.pillar+' '+j.branch+'='+j.ss+'('+j.gungwi+')'; }).join(' | ') + '\n';
    // 오행 지장간 포함
    txt += '- 오행(표면): 목='+saju.el['목']+' 화='+saju.el['화']+' 토='+saju.el['토']+' 금='+saju.el['금']+' 수='+saju.el['수']+'\n';
    if (saju.elFull) {
      txt += '- 오행(지장간포함): 목='+saju.elFull['목']+' 화='+saju.elFull['화']+' 토='+saju.elFull['토']+' 금='+saju.elFull['금']+' 수='+saju.elFull['수']+'\n';
    }
    if (saju.hiddenOh && saju.hiddenOh.length > 0) {
      txt += '  → 숨은 오행: ' + saju.hiddenOh.join(',') + '\n';
    }
    // 12운성
    txt += '- 12운성: ' + saju.P.map(function(p,i){ return p.l+'='+(saju.uns[i]||'미상'); }).join(', ') + '\n';
    // 격국 상세
    txt += '- 격국: ' + gg.gyeokgukName + ' (' + gg.gyeokgukBasis + ')\n';
    txt += '  → ' + gg.gyeokgukDesc + '\n';
    if (gg.isJonggyeok) txt += '  ⚠️ 종격 사주\n';
    if (gg.isHwakyeok) txt += '  ⚠️ 화격 사주\n';
    // 파격 (개인분석과 동일)
    if (gg.pagyeokInfo) txt += '  - ⚠️ 파격: ' + gg.pagyeokInfo + '\n';
    // 십성비중
    txt += '- 십성비중: 비겁='+gg.cnt['비겁'].toFixed(1)+' 식상='+gg.cnt['식상'].toFixed(1)+' 재성='+gg.cnt['재성'].toFixed(1)+' 관성='+gg.cnt['관성'].toFixed(1)+' 인성='+gg.cnt['인성'].toFixed(1)+'\n';
    // 일간강도
    txt += '- 일간강도: '+gg.strengthGrade+' '+gg.strengthScore+'점 (자기편='+gg.selfStr.toFixed(1)+' vs 상대편='+gg.otherStr.toFixed(1)+')'+(gg.deukryeong?' [득령]':' [실령]')+'\n';
    // 강/약 오행
    txt += '- 강한: '+gg.dominant[0]+'('+gg.dominant[1].toFixed(1)+') 약한: '+gg.weak[0]+'('+gg.weak[1].toFixed(1)+')\n';
    // 부족오행
    txt += '- 부족오행: '+(saju.lackFull && saju.lackFull.length>0 ? saju.lackFull.join(',') : '없음')+'\n';
    // 용신
    txt += '- 용신: '+gg.yongshin+' ['+gg.yongshinType+'용신]'+(gg.johuYongshin&&gg.yongshinType!=='조후'?' · 조후참고: '+gg.johuYongshin:'')+'\n';
    // 오행흐름
    txt += '- 오행흐름: '+gg.flowSummary+'\n';
    // 원국 내 합충형해
    var rel = analysis.calcRelations(saju);
    var hapTxt = rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;})).join(', ') || '없음';
    var samhapTxt = rel.jijiSamhap.map(function(h){return h.desc;}).join(', ') || '없음';
    var chungTxt = rel.jijiChung.map(function(c){return c.desc;}).join(', ') || '없음';
    var hyungTxt = rel.jijiHyung.map(function(h){return h.desc;}).join(', ') || '없음';
    txt += '- 합: '+hapTxt+' | 삼합: '+samhapTxt+'\n';
    txt += '- 충: '+chungTxt+' | 형: '+hyungTxt+'\n';
    // 합충우선순위 (개인분석과 동일)
    var hapChungResolved = analysis.resolveHapChungPriority(rel);
    if (hapChungResolved && hapChungResolved.summary) {
      txt += '- 합충우선순위: ' + hapChungResolved.summary + '\n';
    }
    // 암합
    if (saju.amhap && saju.amhap.length > 0) {
      txt += '- 암합: '+saju.amhap.map(function(a){return a.from+'↔'+a.to+'=합화'+a.hapOh;}).join(', ')+'\n';
    }
    return txt;
  }

  userPrompt += buildWonkukDetail(nameA, sajuA, ggA);
  userPrompt += buildWonkukDetail(nameB, sajuB, ggB);

  // ── A/B 공망 + 동적키워드 + 올해핵심 (profileAnalysis 타입 태그는 제거 — AI 자율 해석 유도) ──
  try {
    // ① 공망
    var gmA = analysis.calcGongmang(sajuA);
    var gmB = analysis.calcGongmang(sajuB);

    // ② 지장간 비율 (동적 키워드 입력용)
    var jjgRatioA = analysis.calcJijangganRatio(sajuA);
    var jjgRatioB = analysis.calcJijangganRatio(sajuB);

    // ③ 동적 키워드
    var dynKWA = analysis.generateDynamicKeywords ? analysis.generateDynamicKeywords(sajuA, ggA, dwA, gmA, jjgRatioA) : null;
    var dynKWB = analysis.generateDynamicKeywords ? analysis.generateDynamicKeywords(sajuB, ggB, dwB, gmB, jjgRatioB) : null;

    // ④ 대운 vs 원국 (올해 핵심 입력용)
    var dwSeA = analysis.analyzeDWSEvsWonkuk ? analysis.analyzeDWSEvsWonkuk(sajuA, dwA) : null;
    var dwSeB = analysis.analyzeDWSEvsWonkuk ? analysis.analyzeDWSEvsWonkuk(sajuB, dwB) : null;

    // ⑤ 월운 (올해 핵심 입력용)
    var wolunA = _pbUsr.buildWolunData ? _pbUsr.buildWolunData(sajuA, dwA) : null;
    var wolunB = _pbUsr.buildWolunData ? _pbUsr.buildWolunData(sajuB, dwB) : null;

    // ⑥ 올해 핵심
    var yearHLA = (analysis.buildYearHighlight && dwSeA && wolunA)
      ? analysis.buildYearHighlight(dwSeA, dwA, wolunA.wolunArr, wolunA.wonJiArr) : null;
    var yearHLB = (analysis.buildYearHighlight && dwSeB && wolunB)
      ? analysis.buildYearHighlight(dwSeB, dwB, wolunB.wolunArr, wolunB.wonJiArr) : null;

    // 텍스트 조립 — 공망/참고 힌트/올해 핵심만 (개인 프로파일 타입 태그 제외)
    function buildContextText(label, gm, dynKW, yearHL) {
      var txt = '';
      if (gm && gm.desc) txt += '\n### ' + label + '의 공망\n- ' + gm.desc + '\n';
      if (dynKW) {
        var kw = _pbUsr.formatKeywordsForAI ? _pbUsr.formatKeywordsForAI(dynKW) : '';
        if (kw) txt += '\n### ' + label + '의 참고 힌트\n' + kw;
      }
      if (yearHL) {
        txt += '\n### ' + label + '의 올해 핵심\n';
        if (yearHL.main) txt += '- ' + yearHL.main + '\n';
        if (yearHL.hotMonths) txt += '- 핵심 달: ' + yearHL.hotMonths + '\n';
      }
      return txt;
    }

    userPrompt += buildContextText(nameA, gmA, dynKWA, yearHLA);
    userPrompt += buildContextText(nameB, gmB, dynKWB, yearHLB);

  } catch(e) { console.warn('[gunghap] 컨텍스트 주입 실패:', e.message); }

  // ── 카드별 출발 힌트 (궁합 버전) ──
  try {
    var iljuKeyA = sajuA.P[2].s + sajuA.P[2].b;
    var iljuKeyB = sajuB.P[2].s + sajuB.P[2].b;
    var iljuDA = ILJU_DATA[iljuKeyA] || {k:'독특한 기질',t:'',love:'',job:''};
    var iljuDB = ILJU_DATA[iljuKeyB] || {k:'독특한 기질',t:'',love:'',job:''};
    var gungwiA = analysis.buildGungwiContext(sajuA, ggA);
    var gungwiB = analysis.buildGungwiContext(sajuB, ggB);

    var cardHints = '\n\n## ★ 카드별 출발 힌트 (1군 재료 — 각 소주제의 앵커)\n';
    cardHints += '아래 힌트는 각 소주제의 첫 문단 출발점일 뿐입니다. 풀이의 본체는 반드시 ★★교차 패턴★★ 4개로 채우세요.\n';
    cardHints += '같은 힌트를 여러 소주제에서 반복하지 마세요.\n\n';

    cardHints += '【' + nameA + ' 일주 물상】 → 이 사람의 성격 소주제의 출발점\n';
    cardHints += '- ' + nameA + ' 물상 이미지: ' + iljuDA.k + '\n';
    if (iljuDA.t) cardHints += '- ' + nameA + ' 기질: ' + iljuDA.t + '\n';

    cardHints += '\n【' + nameB + ' 일주 물상】 → 이 사람의 성격 소주제의 출발점\n';
    cardHints += '- ' + nameB + ' 물상 이미지: ' + iljuDB.k + '\n';
    if (iljuDB.t) cardHints += '- ' + nameB + ' 기질: ' + iljuDB.t + '\n';

    if (gungwiA.spouse || iljuDA.love) {
      cardHints += '\n【' + nameA + ' 연애궁】 → 연애 스타일·끌림 소주제의 출발점\n';
      if (gungwiA.spouse) cardHints += '- ' + gungwiA.spouse + '\n';
      if (iljuDA.love) cardHints += '- ' + nameA + ' 일주 연애 기질: ' + iljuDA.love + '\n';
    }
    if (gungwiB.spouse || iljuDB.love) {
      cardHints += '\n【' + nameB + ' 연애궁】 → 상대방의 연애 패턴 참고\n';
      if (gungwiB.spouse) cardHints += '- ' + gungwiB.spouse + '\n';
      if (iljuDB.love) cardHints += '- ' + nameB + ' 일주 연애 기질: ' + iljuDB.love + '\n';
    }

    if (gungwiA.career || gungwiB.career) {
      cardHints += '\n【직업궁 교차】 → 업무 시너지·직장동료 소주제의 출발점\n';
      if (gungwiA.career) cardHints += '- ' + nameA + ': ' + gungwiA.career + '\n';
      if (gungwiB.career) cardHints += '- ' + nameB + ': ' + gungwiB.career + '\n';
    }

    cardHints += '\n【용신 궁합】 → 서로에게 필요한 에너지\n';
    cardHints += '- ' + nameA + ' 용신: ' + ggA.yongshin + ' [' + ggA.yongshinType + ']\n';
    cardHints += '- ' + nameB + ' 용신: ' + ggB.yongshin + ' [' + ggB.yongshinType + ']\n';
    var aYongOh = ggA.yongshin.replace(/[^목화토금수]/g,'');
    var bYongOh = ggB.yongshin.replace(/[^목화토금수]/g,'');
    if (aYongOh && sajuB.el[aYongOh] >= 2) cardHints += '- ★ ' + nameB + '이 ' + nameA + '의 용신(' + aYongOh + ') 보완 가능!\n';
    if (bYongOh && sajuA.el[bYongOh] >= 2) cardHints += '- ★ ' + nameA + '이 ' + nameB + '의 용신(' + bYongOh + ') 보완 가능!\n';

    cardHints += '\n※ 위 힌트의 전문용어는 뉘앙스 참고용. 본문에 그대로 옮기지 마세요.\n';
    userPrompt += cardHints;
  } catch(e) { console.warn('[gunghap] 카드별 출발 힌트 실패:', e.message); }

  // ── A/B 대운 상세 + 세운 교차 ──
  try {
    var JIJANGGAN_DATA = data.JIJANGGAN_DATA;
    var getSipsung = data.getSipsung;

    function buildDWDetail(label, saju, dw) {
      var txt = '\n### ' + label + '의 대운 상세\n';
      txt += '대운 흐름 (' + dw.direction + ', ' + dw.daewoonAge + '세 시작):\n';
      dw.daewoons.forEach(function(d, i) {
        var prefix = (dw.currentDWIdx === i ? '★현재 ' : '  ');
        var jiJJG = JIJANGGAN_DATA[data.JIJI_KR.indexOf(d.ji)];
        var jiSS = jiJJG ? getSipsung(saju.raw.dg, jiJJG[jiJJG.length-1].g) : '';
        txt += prefix + d.startAge + '~' + d.endAge + '세 ' + d.gan + d.ji + '(' + d.ganH + d.jiH + ') — 전반: ' + d.ss + '운 / 후반: ' + (jiSS || '미상') + '운\n';
      });
      var cdw = dw.currentDWIdx >= 0 ? dw.daewoons[dw.currentDWIdx] : null;
      if (cdw) txt += '현재: ' + cdw.gan + cdw.ji + ' ' + cdw.ss + '운 (' + cdw.startAge + '~' + cdw.endAge + '세)\n';
      var nextDI = dw.currentDWIdx >= 0 ? dw.currentDWIdx + 1 : -1;
      var nextDW = nextDI >= 0 && nextDI < dw.daewoons.length ? dw.daewoons[nextDI] : null;
      if (nextDW) {
        txt += '다음 전환: ' + nextDW.startAge + '세 ' + nextDW.gan + nextDW.ji + ' ' + nextDW.ss + '운\n';
      }
      txt += '세운: ' + dw.seun.map(function(s){ return s.y + '년 ' + s.gan + s.ji + '(' + s.ss + ')'; }).join(', ') + '\n';
      return txt;
    }

    userPrompt += buildDWDetail(nameA, sajuA, dwA);
    userPrompt += buildDWDetail(nameB, sajuB, dwB);

    // 대운 전환점 교차
    var cdwA = dwA.currentDWIdx >= 0 ? dwA.daewoons[dwA.currentDWIdx] : null;
    var cdwB = dwB.currentDWIdx >= 0 ? dwB.daewoons[dwB.currentDWIdx] : null;
    var nextA = (dwA.currentDWIdx >= 0 && dwA.currentDWIdx + 1 < dwA.daewoons.length) ? dwA.daewoons[dwA.currentDWIdx + 1] : null;
    var nextB = (dwB.currentDWIdx >= 0 && dwB.currentDWIdx + 1 < dwB.daewoons.length) ? dwB.daewoons[dwB.currentDWIdx + 1] : null;
    if (nextA || nextB) {
      userPrompt += '\n### 대운 전환점 교차\n';
      if (nextA) userPrompt += '- ' + nameA + ' 다음 전환: ' + nextA.startAge + '세 → ' + nextA.ss + '운\n';
      if (nextB) userPrompt += '- ' + nameB + ' 다음 전환: ' + nextB.startAge + '세 → ' + nextB.ss + '운\n';
      if (nextA && nextB && Math.abs(nextA.startAge - nextB.startAge) <= 3) {
        userPrompt += '- ⚠️ ' + nameA + '·' + nameB + ' 대운 전환이 비슷한 시기! 관계에 큰 변화 가능\n';
      }
    }

    // 세운 교차 분석
    if (dwA.seun && dwB.seun) {
      userPrompt += '\n### 세운 교차\n';
      for (var si = 0; si < Math.min(dwA.seun.length, dwB.seun.length); si++) {
        var seA = dwA.seun[si], seB = dwB.seun[si];
        userPrompt += '- ' + seA.y + '년: ' + nameA + '=' + seA.gan + seA.ji + '(' + seA.ss + ') / ' + nameB + '=' + seB.gan + seB.ji + '(' + seB.ss + ')\n';
      }
    }
  } catch(e) { console.warn('[gunghap] 대운 상세 실패:', e.message); }

  // ── Phase 3: MBTI 강도별 행동 프로파일 (기본 데이터 영역) ──
  userPrompt += buildMBTIProfile(nameA, mbtiObjA.axes, paramsA.mbtiType);
  userPrompt += buildMBTIProfile(nameB, mbtiObjB.axes, paramsB.mbtiType);

  // ── Phase 1-2: 교차 패턴 주입 (★★ 유일한 강조 — 풀이의 뼈대) ──
  try {
    var intensA = mbtiObjA.axes ? mbtiObjA.axes.map(function(a){ return a.pct; }) : null;
    var intensB = mbtiObjB.axes ? mbtiObjB.axes.map(function(a){ return a.pct; }) : null;
    var userTagsA = _patternData.buildUserTags(sajuA, ggA, dwA, paramsA.mbtiType, intensA);
    var userTagsB = _patternData.buildUserTags(sajuB, ggB, dwB, paramsB.mbtiType, intensB);
    var prefixedA = userTagsA.map(function(t){ return 'A:' + t; });
    var prefixedB = userTagsB.map(function(t){ return 'B:' + t; });
    var relationTags = (_patternData.buildRelationTags)
      ? _patternData.buildRelationTags(ghResult, sajuA, sajuB, ggA, ggB, mbtiObjA, mbtiObjB)
      : [];
    var combinedTags = userTagsA.concat(userTagsB).concat(prefixedA).concat(prefixedB).concat(relationTags);

    // ── A/B 캐릭터 프로파일 (premium 패턴 기반 — 인물 묘사 재료) ──
    var CHAR_SUBS = ['나의 성격','나의 장점','남들이 보는 나','연애 스타일','잘 맞는 타입','연애 지뢰','고쳐야 할 점'];
    if (relType === 'colleague') CHAR_SUBS.push('직장 적성');

    // 내면 모순/갈등 패턴 — B(상대)의 캐릭터 프로파일에서만 제외(화자 구분: A=본인은 유지)
    var EXCLUDE_FROM_B_PROFILE = {
      '나의 성격': ['CROSS-CHAR-004', 'SAJU-CHAR-004', 'P-CHAR-020', 'P-CHAR-005', 'P-CHAR-010']
    };
    function buildCharacterProfile(label, userTags, isB) {
      var sections = [];
      for (var i = 0; i < CHAR_SUBS.length; i++) {
        var sub = CHAR_SUBS[i];
        var excl = (isB && EXCLUDE_FROM_B_PROFILE[sub]) ? EXCLUDE_FROM_B_PROFILE[sub] : [];
        var lim = excl.length ? 15 : 10; // 제외 시 backfill 여유분 확보
        var matched = _patternMatcher.matchPatterns('premium', sub, userTags, lim);
        if (excl.length) {
          matched = matched.filter(function(m){ return excl.indexOf(m.pattern.id) < 0; });
        }
        matched = matched.slice(0, 10);
        if (matched.length === 0) continue;
        var lines = [];
        lines.push('### [' + sub + '] (' + matched.length + '개)');
        for (var p = 0; p < matched.length; p++) {
          var pat = matched[p].pattern;
          lines.push('- ' + pat.name);
          if (pat.cross) lines.push('  교차해설: ' + pat.cross);
        }
        sections.push(lines.join('\n'));
      }
      if (sections.length === 0) return '';
      return '\n\n## ' + label + '의 캐릭터 프로파일 (이 사람을 이해하는 재료)\n' +
        '아래는 ' + label + ' 개인의 사주×MBTI 교차 분석 결과다. 이 사람을 묘사할 때 다양한 각도를 활용하라.\n' +
        '같은 특성(예: "에너지 약함")을 2회 이상 반복하지 마라. 매 소주제마다 다른 특성으로 이 사람을 그려라.\n\n' +
        sections.join('\n\n');
    }

    userPrompt += buildCharacterProfile(nameA, userTagsA, false);
    userPrompt += buildCharacterProfile(nameB, userTagsB, true);

    // '이 사람의 연애 스타일'은 premium '연애 스타일'(buildCharacterProfile B)과 동일 패턴 중복 →
    // ssom 풀(combinedTags=A섞임)에서 빼고 premium(userTagsB) 한 경로로 일원화
    var PREMIUM_ROUTED_SUBS = ['이 사람의 연애 스타일'];
    var _cfgSubs = (GH_REL_CONFIG[relType] && GH_REL_CONFIG[relType].subs)
      ? GH_REL_CONFIG[relType].subs.map(function(s){ return s.h; })
          .filter(function(h){ return PREMIUM_ROUTED_SUBS.indexOf(h) < 0; })
      : null;
    var ghPatternText = _patternMatcher.buildPatternPrompt(relType, combinedTags, {
      showScores: true,
      subjects: _cfgSubs
    });
    if (ghPatternText) {
      userPrompt += '\n\n## 관계 교차 패턴 (두 사람의 사주×MBTI 교차 인사이트)\n' +
        '아래는 두 사람의 관계에서 나타나는 교차 통찰이다. 이 사람들에게 해당하는 것만 골라, 구어체로 재해석해서 풀이에 녹여라.\n\n' +
        ghPatternText;
    }
  } catch(e) { console.warn('[gunghap] Pattern 주입 실패:', e.message); }

  // ── Phase 1-1: MBTI theory 주입 (헤더 격하 — "참고") ──
  try {
    var intensA = mbtiObjA.axes ? mbtiObjA.axes.map(function(a){ return a.pct; }) : null;
    var intensB = mbtiObjB.axes ? mbtiObjB.axes.map(function(a){ return a.pct; }) : null;
    var theoryMBTI_A = _mbtiTheory.MT_buildFullContext(paramsA.mbtiType, intensA, null, paramsB.mbtiType);
    var theoryMBTI_B = _mbtiTheory.MT_buildFullContext(paramsB.mbtiType, intensB, null, paramsA.mbtiType);
    if (theoryMBTI_A) userPrompt += '\n\n## ' + nameA + '의 MBTI 이론 참고 (필요 시에만)\n' + theoryMBTI_A;
    if (theoryMBTI_B) userPrompt += '\n\n## ' + nameB + '의 MBTI 이론 참고 (필요 시에만)\n' + theoryMBTI_B;
  } catch(e) { console.warn('[gunghap] MBTI theory 주입 실패:', e.message); }

  // ── Phase 1-1: 사주 theory 주입 (헤더 격하 — "참고") ──
  try {
    var theorySaju_A = _sjTheory.SJ_buildFullContext(sajuA, ggA, dwA, genderA, sajuB, ggB);
    var theorySaju_B = _sjTheory.SJ_buildFullContext(sajuB, ggB, dwB, genderB, sajuA, ggA);
    if (theorySaju_A) userPrompt += '\n\n## ' + nameA + '의 사주 이론 참고 (필요 시에만)\n' + theorySaju_A;
    if (theorySaju_B) userPrompt += '\n\n## ' + nameB + '의 사주 이론 참고 (필요 시에만)\n' + theorySaju_B;
  } catch(e) { console.warn('[gunghap] Saju theory 주입 실패:', e.message); }

  // Append relType-specific subs info to user prompt
  var cfg = GH_REL_CONFIG[relType];
  if (cfg && cat) {
    userPrompt += '\n### \uAD00\uACC4: ' + cat.label + '\n';
    if (cfg.subs && cfg.subs.length > 0) {
      userPrompt += '\uBD80\uC81C: ' + (cfg.subtitle || '') + '\n\n';
      for (var i = 0; i < cfg.subs.length; i++) {
        userPrompt += (i + 1) + '. ' + cfg.subs[i].h + '\n';
      }
    } else {
      userPrompt += '\uCE74\uD14C\uACE0\uB9AC:\n';
      cat.categories.forEach(function(c, i) { userPrompt += (i + 1) + '. ' + c + '\n'; });
      if (cat.tone) userPrompt += '\n\uD1A4: ' + cat.tone + '\n';
    }
  }

  // Build system prompt
  var systemPrompt = getGHSystemPrompt(relType);

  userPrompt = termUtils.applyTermHints(userPrompt);

  return {
    systemPrompt: systemPrompt,
    userPrompt: userPrompt,
    sajuA: sajuA, sajuB: sajuB,
    ggA: ggA, ggB: ggB,
    dwA: dwA, dwB: dwB,
    mtA: paramsA.mbtiType, mtB: paramsB.mbtiType,
    mbtiObjA: mbtiObjA, mbtiObjB: mbtiObjB,
    ghResult: ghResult
  };
}

module.exports = {
  buildGunghapPrompt: buildGunghapPrompt,
  GH_CATEGORIES: GH_CATEGORIES,
  GH_REL_CONFIG: GH_REL_CONFIG,
  getGHSystemPrompt: getGHSystemPrompt
};
