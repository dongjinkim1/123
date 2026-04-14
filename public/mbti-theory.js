// ======================================================================
// mbti-theory.js v1.0 — MBTI 인지기능 이론 모듈 (대학 교수 수준)
// 목적: MBTI 인지기능 이론 참조 데이터 (순수 MBTI 심리학)
// 규칙: MT_ 접두사, ES5 문법, 다른 파일 수정 없음 (읽기 전용 참조)
// 의존성: 없음 (독립 모듈)
// ======================================================================
(function() {
'use strict';

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 1: 인지기능 8개 — 학술적 정의                              ║
// ║  근거: Jung(1921), Myers-Briggs, Beebe(2004), Nardi(2011)       ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_FUNCTIONS = {

  // ── 외향 직관 (Extraverted Intuition) ──
  Ne: {
    id: 'Ne',
    fullName: 'Extraverted Intuition',
    koName: '외향 직관',
    nickname: '가능성 탐색기',
    category: 'perceiving',    // perceiving vs judging
    attitude: 'extraverted',   // extraverted vs introverted
    axis: 'N',                 // S/N axis
    oppositeFn: 'Si',          // 같은 축 반대 태도
    definition: '외부 세계에서 패턴, 연결, 가능성을 탐지하는 기능. 하나의 자극에서 다수의 해석과 연결을 동시에 확산시킨다.',
    coreProcess: '확산적 연상. 하나의 데이터 → 다수의 가능성으로 팬아웃(fan-out)',
    healthyExpression: '창의적 아이디어 생성, 패턴 인식, 가능성 탐색, 브레인스토밍',
    unhealthyExpression: '산만, 미완성 프로젝트 누적, 현실 회피, 과도한 가능성 탐색으로 결정 마비',
    neuroscience: 'Nardi(2011) EEG: Ne 우세자는 전두엽 전체에 걸친 크리스마스트리 패턴(trans-contextual thinking) 관찰',
    bodySignal: '눈동자가 빠르게 움직임, 대화 중 주제 도약, 손으로 연결을 그리는 제스처',
    keyQuestion: '"만약에 ~라면?" / "이것과 저것은 어떻게 연결될까?"',
    valuesKeyword: '새로움, 가능성, 연결, 다양성',
    fearsKeyword: '고착, 제한, 반복, 선택지 없음',
    stressResponse: '과잉 확산 — 가능성을 무한히 생성하지만 하나도 실행 못함',
    growthDirection: 'Si 통합 — 과거 경험에서 배운 패턴을 현재 가능성 평가에 활용'
  },

  // ── 내향 직관 (Introverted Intuition) ──
  Ni: {
    id: 'Ni',
    fullName: 'Introverted Intuition',
    koName: '내향 직관',
    nickname: '미래 내비게이션',
    category: 'perceiving',
    attitude: 'introverted',
    axis: 'N',
    oppositeFn: 'Se',
    definition: '내부에서 수렴적 통찰을 생성하는 기능. 다수의 데이터를 하나의 핵심 비전이나 예측으로 압축한다.',
    coreProcess: '수렴적 통찰. 다수의 데이터 → 하나의 핵심 패턴으로 압축(fan-in)',
    healthyExpression: '장기 비전, 핵심 통찰, 미래 예측, 상징적 사고, 전략적 방향 설정',
    unhealthyExpression: '과도한 확신(독단), 현재 순간 무시, "이미 답을 알고 있다"는 오만, 설명 불가능한 직감 고집',
    neuroscience: 'Nardi(2011) EEG: Ni 우세자는 "Zen-like" 전두엽 집중 패턴 — 한 점에 수렴하는 뇌파',
    bodySignal: '시선이 한 곳에 고정, "멍하니 보이지만 머릿속은 풀가동", 갑자기 "아!" 하는 유레카 순간',
    keyQuestion: '"이것의 본질은 무엇인가?" / "궁극적으로 어디로 향하는가?"',
    valuesKeyword: '의미, 방향, 본질, 비전',
    fearsKeyword: '무의미, 방향 상실, 표면적 삶',
    stressResponse: 'Se 그립 — 감각적 과잉행동(폭식, 충동구매, 과음)으로 나타남',
    growthDirection: 'Se 통합 — 현재 순간의 감각적 경험을 비전에 접지'
  },

  // ── 외향 감정 (Extraverted Feeling) ──
  Fe: {
    id: 'Fe',
    fullName: 'Extraverted Feeling',
    koName: '외향 감정',
    nickname: '분위기 리더기',
    category: 'judging',
    attitude: 'extraverted',
    axis: 'F',
    oppositeFn: 'Ti',
    definition: '외부 세계의 사회적 조화와 집단 감정을 조율하는 기능. 타인의 감정 상태를 읽고 집단의 정서적 균형을 유지한다.',
    coreProcess: '감정 동기화. 집단의 감정 온도를 읽고 조율하여 조화를 만든다.',
    healthyExpression: '공감적 리더십, 갈등 중재, 분위기 형성, 타인 배려, 사회적 연결',
    unhealthyExpression: '과도한 자기희생, 거절 불가, 타인 감정에 매몰, 갈등 회피로 문제 악화',
    neuroscience: '거울뉴런 시스템과 관련 — 타인의 표정/목소리에서 감정 상태를 자동으로 미러링',
    bodySignal: '대화 상대의 표정을 무의식적으로 따라함, 목소리 톤을 맞춤, 불편한 사람이 있으면 몸이 긴장',
    keyQuestion: '"모두가 편안한가?" / "이 결정이 관계에 어떤 영향을 줄까?"',
    valuesKeyword: '조화, 연결, 배려, 소속감',
    fearsKeyword: '고립, 갈등, 배제, 거부',
    stressResponse: 'Ti 그립 — 냉소적 논리로 무장하며 "다 쓸데없어" 식의 분리',
    growthDirection: 'Ti 통합 — 논리적 경계를 세워 건강한 자기 보호'
  },

  // ── 내향 감정 (Introverted Feeling) ──
  Fi: {
    id: 'Fi',
    fullName: 'Introverted Feeling',
    koName: '내향 감정',
    nickname: '내면의 심판관',
    category: 'judging',
    attitude: 'introverted',
    axis: 'F',
    oppositeFn: 'Te',
    definition: '내부의 가치 체계와 진정성에 기반한 판단 기능. "이것이 나에게 진짜인가?"를 기준으로 모든 것을 평가한다.',
    coreProcess: '가치 정렬. 경험을 내면의 가치 체계에 비추어 진위/선악을 판정한다.',
    healthyExpression: '강한 도덕적 나침반, 진정성, 개인의 의미 추구, 깊은 공감(1:1), 예술적 감수성',
    unhealthyExpression: '과도한 주관성, "내 감정이 곧 진실" 오류, 비판에 극도로 취약, 소통 거부',
    neuroscience: '전전두엽-변연계 연결 — 감정적 경험을 가치 판단과 통합하는 회로',
    bodySignal: '가슴이 답답하거나 뜨거워지는 체감, "뭔가 아닌데" 하는 직감적 불편, 눈물이 먼저 나옴',
    keyQuestion: '"이것이 나의 가치와 일치하는가?" / "이것이 진짜인가?"',
    valuesKeyword: '진정성, 의미, 개성, 도덕적 일관성',
    fearsKeyword: '가치 훼손, 강요, 진정성 상실, 자기 배반',
    stressResponse: 'Te 그립 — 공격적 효율 추구, 냉혹한 비판, "결과만 보자" 식 돌변',
    growthDirection: 'Te 통합 — 내면의 가치를 외부 세계에서 효과적으로 실현하는 실행력'
  },

  // ── 외향 사고 (Extraverted Thinking) ──
  Te: {
    id: 'Te',
    fullName: 'Extraverted Thinking',
    koName: '외향 사고',
    nickname: '실행력 엔진',
    category: 'judging',
    attitude: 'extraverted',
    axis: 'T',
    oppositeFn: 'Fi',
    definition: '외부 세계를 효율적으로 조직하고 체계화하는 기능. 객관적 기준, 측정 가능한 결과, 최적화를 추구한다.',
    coreProcess: '체계적 실행. 목표 → 계획 → 실행 → 측정 → 개선의 루프를 돌린다.',
    healthyExpression: '효율적 리더십, 목표 달성, 시스템 구축, 의사결정 속도, 자원 최적화',
    unhealthyExpression: '과도한 통제, 감정 무시, 결과 지상주의, "안 되면 되게 하라" 식 독단',
    neuroscience: '전두엽 실행 기능 네트워크 — 계획, 우선순위, 작업 전환을 관장',
    bodySignal: '비효율을 볼 때 신체적 불편(짜증), 체크리스트 완료 시 도파민 보상감, 빠른 결정 후 행동',
    keyQuestion: '"가장 효율적인 방법은?" / "측정 가능한 결과가 무엇인가?"',
    valuesKeyword: '효율, 결과, 체계, 달성',
    fearsKeyword: '무능, 비효율, 통제 불능, 목표 미달',
    stressResponse: 'Fi 그립 — 갑자기 감정 폭발, "아무도 내 마음을 몰라" 식 감정적 붕괴',
    growthDirection: 'Fi 통합 — 효율뿐 아니라 의미와 가치를 고려한 의사결정'
  },

  // ── 내향 사고 (Introverted Thinking) ──
  Ti: {
    id: 'Ti',
    fullName: 'Introverted Thinking',
    koName: '내향 사고',
    nickname: '내장 논리회로',
    category: 'judging',
    attitude: 'introverted',
    axis: 'T',
    oppositeFn: 'Fe',
    definition: '내부의 논리적 프레임워크를 구축하고 정교화하는 기능. "이것이 논리적으로 일관성이 있는가?"를 기준으로 판단한다.',
    coreProcess: '논리적 일관성 검증. 내부 모델을 만들고, 모든 입력을 그 모델에 비추어 검증한다.',
    healthyExpression: '정밀한 분석, 독창적 프레임워크, 논리적 일관성, 문제 해결, 진리 추구',
    unhealthyExpression: '과도한 분석 마비, 현실과 괴리된 이론, 소통 거부("설명하기 귀찮아"), 냉소',
    neuroscience: '좌반구 전두-두정 네트워크 — 복잡한 논리 체인을 내적으로 시뮬레이션',
    bodySignal: '논리적 모순 발견 시 "찝찝함", 틀린 주장에 신체적 불편, 혼자 생각할 때 가장 편안',
    keyQuestion: '"이것이 논리적으로 맞는가?" / "근본 원리가 무엇인가?"',
    valuesKeyword: '정확성, 일관성, 원리, 독립적 사고',
    fearsKeyword: '논리적 모순, 강요된 동의, 지적 부정직',
    stressResponse: 'Fe 그립 — 갑자기 타인의 평가에 극도로 민감해짐, 인정 갈구',
    growthDirection: 'Fe 통합 — 논리적 통찰을 타인과 효과적으로 공유하는 소통력'
  },

  // ── 외향 감각 (Extraverted Sensing) ──
  Se: {
    id: 'Se',
    fullName: 'Extraverted Sensing',
    koName: '외향 감각',
    nickname: '현장 체험러',
    category: 'perceiving',
    attitude: 'extraverted',
    axis: 'S',
    oppositeFn: 'Ni',
    definition: '현재 순간의 감각적 경험을 최대한 생생하게 흡수하는 기능. 지금, 여기, 실제로 일어나고 있는 것에 완전히 몰입한다.',
    coreProcess: '현재 순간 몰입. 오감을 통해 환경을 실시간으로 스캔하고 반응한다.',
    healthyExpression: '현장 대응력, 감각적 즐거움, 실전 능력, 위기 대처, 신체적 민첩성',
    unhealthyExpression: '충동성, 자극 중독(과식/과음/과소비), 미래 무시, "지금이 좋으면 됐지" 식 쾌락주의',
    neuroscience: '감각운동 피질 활성화 — 현재 환경의 감각 입력을 실시간으로 처리',
    bodySignal: '환경 변화에 즉각 반응, 지루함에 대한 낮은 내성, 새로운 감각 자극에 눈이 빛남',
    keyQuestion: '"지금 무슨 일이 일어나고 있는가?" / "이것을 직접 경험하면 어떨까?"',
    valuesKeyword: '현재, 경험, 행동, 자유',
    fearsKeyword: '지루함, 구속, 관념적 토론, 행동 제한',
    stressResponse: 'Ni 그립 — 파멸적 미래 상상, "다 망할 거야" 식의 비관적 예언',
    growthDirection: 'Ni 통합 — 순간의 경험에서 장기적 의미와 패턴을 읽어내는 통찰'
  },

  // ── 내향 감각 (Introverted Sensing) ──
  Si: {
    id: 'Si',
    fullName: 'Introverted Sensing',
    koName: '내향 감각',
    nickname: '추억 저장소',
    category: 'perceiving',
    attitude: 'introverted',
    axis: 'S',
    oppositeFn: 'Ne',
    definition: '과거 경험의 감각적 기억을 저장하고 현재에 비교 참조하는 기능. "이전에 이런 경험이 있었다"를 기반으로 현재를 해석한다.',
    coreProcess: '경험 비교. 현재 입력을 과거 기억 라이브러리와 대조하여 판단한다.',
    healthyExpression: '신뢰성, 디테일 기억, 전통 유지, 안정적 루틴, 실수 반복 방지',
    unhealthyExpression: '변화 저항, 과거 집착, "예전이 좋았어" 식 보수성, 새로운 것에 대한 불안',
    neuroscience: '해마-피질 회로 — 에피소드 기억을 정밀하게 저장하고 인출하는 시스템',
    bodySignal: '익숙한 감각(냄새/소리/맛)에서 과거 기억이 생생하게 환기, 새로운 환경에서 불안',
    keyQuestion: '"이전에 이런 경험이 있었는가?" / "검증된 방법은 무엇인가?"',
    valuesKeyword: '안정, 전통, 신뢰, 디테일',
    fearsKeyword: '불확실성, 검증 안 된 새로움, 기존 체계 파괴',
    stressResponse: 'Ne 그립 — "모든 것이 잘못될 수 있다" 식의 끝없는 부정적 가능성 확산',
    growthDirection: 'Ne 통합 — 과거 경험을 기반으로 새로운 가능성을 열린 마음으로 탐색'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 2: 16유형 인지기능 스택 — 위치별 역학                      ║
// ║  근거: Myers-Briggs Type Dynamics, Beebe 8-function model       ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── 2-1. 스택 위치 정의 ──
var MT_STACK_POSITIONS = {
  dominant: {
    position: 1,
    koName: '주기능',
    role: '핵심 자아. 가장 자연스럽고 강력한 기능. 의식의 중심.',
    developAge: '6~12세에 분화 시작',
    energyCost: '가장 적은 에너지로 가장 큰 효과',
    analogy: '오른손잡이의 오른손 — 의식하지 않아도 자동으로 사용'
  },
  auxiliary: {
    position: 2,
    koName: '부기능',
    role: '주기능의 균형추. 주기능이 외향이면 부기능은 내향, 또는 그 반대.',
    developAge: '12~20세에 본격 발달',
    energyCost: '약간의 의식적 노력 필요',
    analogy: '오른손잡이의 왼손 — 훈련으로 꽤 능숙해짐'
  },
  tertiary: {
    position: 3,
    koName: '3차기능',
    role: '부기능의 반대 기능. 미발달 상태에서는 유치하게 발현. 30대 이후 성장 가능.',
    developAge: '30~40대에 의식적 발달 시작',
    energyCost: '상당한 에너지 소모. 오래 사용하면 피로',
    analogy: '약한 손으로 글씨 쓰기 — 가능하지만 힘듦'
  },
  inferior: {
    position: 4,
    koName: '열등기능',
    role: '주기능의 정반대. 가장 미발달. 스트레스 시 "그립(grip)"으로 발현하여 파괴적 행동.',
    developAge: '40대 후반~50대에 통합 시작 (Jung의 개성화)',
    energyCost: '극도로 높은 에너지 소모. 사용 시 급격한 피로',
    analogy: '트라우마 버튼 — 평소엔 잠자지만 극한 스트레스에 폭발'
  }
};

// ── 2-2. 그림자 기능 (5~8번째) — Beebe 모델 ──
var MT_SHADOW_POSITIONS = {
  opposing: {
    position: 5,
    koName: '반대 인격',
    role: '주기능과 같은 축이지만 반대 태도. 방어적으로 사용. "나는 그렇게 안 해"의 근원.',
    trigger: '주기능이 위협받을 때 자동 발동',
    example: 'Ne 주기능자가 위협받으면 Ni를 방어적으로 사용 → "이건 분명 이렇게 될 거야(부정적 확신)"'
  },
  critical_parent: {
    position: 6,
    koName: '비판적 부모',
    role: '부기능의 그림자. 타인을 비판할 때 사용. 본인에게도 적용되면 자기 비하.',
    trigger: '부기능 영역에서 타인의 미숙함을 볼 때',
    example: 'Te 부기능자의 Ti 비판적 부모 → "논리가 이렇게 엉성한데 어떻게..."'
  },
  trickster: {
    position: 7,
    koName: '트릭스터',
    role: '3차기능의 그림자. 이중 속박(double bind)을 만듦. 본인도 속이고 타인도 속이는 영역.',
    trigger: '3차기능 영역에서 혼란을 느낄 때',
    example: 'Si 3차기능자의 Se 트릭스터 → 현재 순간의 감각을 왜곡하여 기억'
  },
  demon: {
    position: 8,
    koName: '악마(데몬)',
    role: '열등기능의 그림자. 가장 원시적이고 파괴적. 극한의 위기에서만 발현. 자기파괴적.',
    trigger: '존재 자체가 위협받는 극한 상황',
    example: 'Te 열등기능자의 Ti 데몬 → 냉혹한 논리로 모든 관계를 해체'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 3: 16유형 풀 프로필                                        ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_TYPES = {
  INFP: {
    code: 'INFP', name: '중재자',
    stack: ['Fi','Ne','Si','Te'],
    shadow: ['Fe','Ni','Se','Ti'],
    temperament: 'NF (이상주의자)',
    interactionStyle: 'behind-the-scenes',
    coreNeed: '진정성 있는 자기 표현',
    coreFear: '가치의 훼손, 자기 배반',
    stressPattern: 'Te 그립 — 평소와 달리 공격적으로 효율/논리를 들이밀며, 냉혹한 비판을 함. 자기에게도 타인에게도.',
    loop: 'Fi-Si 루프 — 내면 가치(Fi)와 과거 기억(Si)만 반복 순환. Ne를 건너뛰어 외부 가능성을 차단. 증상: 과거의 상처에 갇혀 새로운 시도 거부.',
    growthPath: 'Ne 활성화 — 내면의 가치를 외부 세계의 새로운 가능성과 연결. Te 통합 — 가치를 현실에서 실현하는 실행력.'
  },
  ENFP: {
    code: 'ENFP', name: '활동가',
    stack: ['Ne','Fi','Te','Si'],
    shadow: ['Ni','Fe','Ti','Se'],
    temperament: 'NF (이상주의자)',
    interactionStyle: 'get-things-going',
    coreNeed: '가능성의 탐색과 진정한 자기 표현',
    coreFear: '선택지 없음, 가치 없는 삶',
    stressPattern: 'Si 그립 — 과거의 나쁜 기억에 집착, 신체 증상에 과민, "예전엔 이러지 않았는데"',
    loop: 'Ne-Te 루프 — 아이디어(Ne)를 즉시 실행(Te)하려 하지만 Fi를 건너뛰어 가치 점검 없이 산만하게 질주. 증상: 바쁘지만 의미 없는 느낌.',
    growthPath: 'Fi 심화 — 수많은 가능성 중 진짜 가치 있는 것을 선별. Si 통합 — 꾸준함과 디테일.'
  },
  INFJ: {
    code: 'INFJ', name: '옹호자',
    stack: ['Ni','Fe','Ti','Se'],
    shadow: ['Ne','Fi','Te','Si'],
    temperament: 'NF (이상주의자)',
    interactionStyle: 'behind-the-scenes',
    coreNeed: '깊은 의미와 인류에 대한 기여',
    coreFear: '무의미한 삶, 피상적 관계',
    stressPattern: 'Se 그립 — 감각적 과잉행동(폭식, 충동구매, 과도한 운동). 평소의 절제된 모습과 정반대.',
    loop: 'Ni-Ti 루프 — 비전(Ni)을 내부 논리(Ti)로만 검증. Fe를 건너뛰어 타인과 공유하지 않음. 증상: 고립, 독단적 확신, "아무도 이해 못해".',
    growthPath: 'Fe 활성화 — 통찰을 타인과 나누고 피드백 수용. Se 통합 — 현재 순간에 접지.'
  },
  ENFJ: {
    code: 'ENFJ', name: '선도자',
    stack: ['Fe','Ni','Se','Ti'],
    shadow: ['Fi','Ne','Si','Te'],
    temperament: 'NF (이상주의자)',
    interactionStyle: 'in-charge',
    coreNeed: '타인의 성장을 이끌고 조화로운 공동체',
    coreFear: '관계의 단절, 무의미한 리더십',
    stressPattern: 'Ti 그립 — 냉소적 분석, "어차피 논리적으로 안 맞잖아" 식 분리. 평소의 따뜻함이 사라짐.',
    loop: 'Fe-Se 루프 — 타인 반응(Fe)과 현재 환경(Se)에만 반응. Ni를 건너뛰어 장기 비전 상실. 증상: 눈앞의 인간관계에 휘둘림.',
    growthPath: 'Ni 심화 — 즉각적 조화 너머의 장기 비전. Ti 통합 — 감정에만 의존하지 않는 논리적 경계.'
  },
  INTP: {
    code: 'INTP', name: '논리술사',
    stack: ['Ti','Ne','Si','Fe'],
    shadow: ['Te','Ni','Se','Fi'],
    temperament: 'NT (합리주의자)',
    interactionStyle: 'behind-the-scenes',
    coreNeed: '논리적 정합성과 지적 자유',
    coreFear: '지적 부정직, 강요된 동의',
    stressPattern: 'Fe 그립 — 갑자기 타인 평가에 극도로 민감. "아무도 나를 인정하지 않아" 식 감정 폭발.',
    loop: 'Ti-Si 루프 — 내부 논리(Ti)를 과거 데이터(Si)로만 검증. Ne를 건너뛰어 새로운 가능성 차단. 증상: 같은 분석의 무한 반복.',
    growthPath: 'Ne 활성화 — 완벽한 프레임보다 다양한 가능성 탐색. Fe 통합 — 통찰을 타인과 연결하는 소통.'
  },
  ENTP: {
    code: 'ENTP', name: '변론가',
    stack: ['Ne','Ti','Fe','Si'],
    shadow: ['Ni','Te','Fi','Se'],
    temperament: 'NT (합리주의자)',
    interactionStyle: 'get-things-going',
    coreNeed: '지적 자극과 가능성의 탐색',
    coreFear: '지적 정체, 선택지 없음',
    stressPattern: 'Si 그립 — 과거의 실수에 집착, 건강 염려증, 루틴에 강박적으로 매달림.',
    loop: 'Ne-Fe 루프 — 아이디어(Ne)를 사회적 반응(Fe)으로만 평가. Ti를 건너뛰어 논리 검증 없이 "인기 있으면 맞는 거" 함정.',
    growthPath: 'Ti 심화 — 아이디어의 논리적 검증. Si 통합 — 완성까지 꾸준히 가는 인내.'
  },
  INTJ: {
    code: 'INTJ', name: '전략가',
    stack: ['Ni','Te','Fi','Se'],
    shadow: ['Ne','Ti','Fe','Si'],
    temperament: 'NT (합리주의자)',
    interactionStyle: 'chart-the-course',
    coreNeed: '비전의 실현과 시스템 최적화',
    coreFear: '무능, 비전 없는 삶',
    stressPattern: 'Se 그립 — 감각적 과잉행동. 과식, 충동구매, 과도한 운동. "지금 당장 이거라도" 식 충동.',
    loop: 'Ni-Fi 루프 — 비전(Ni)을 내면 가치(Fi)로만 정당화. Te를 건너뛰어 실행 없이 확신만 강해짐. 증상: "내가 맞는데 세상이 안 따라줘".',
    growthPath: 'Te 활성화 — 비전을 측정 가능한 단계로 실행. Se 통합 — 현재 순간의 현실에 접지.'
  },
  ENTJ: {
    code: 'ENTJ', name: '통솔자',
    stack: ['Te','Ni','Se','Fi'],
    shadow: ['Ti','Ne','Si','Fe'],
    temperament: 'NT (합리주의자)',
    interactionStyle: 'in-charge',
    coreNeed: '효율적 실행과 비전 달성',
    coreFear: '무능, 통제 불능',
    stressPattern: 'Fi 그립 — 갑자기 감정적 붕괴. "아무도 내 진심을 몰라" 식 고립. 울음 또는 극단적 자기 연민.',
    loop: 'Te-Se 루프 — 실행(Te)과 현장 반응(Se)만 반복. Ni를 건너뛰어 장기 비전 없이 단기 성과에 중독. 증상: 바쁘지만 방향 없음.',
    growthPath: 'Ni 심화 — 실행 너머의 장기 비전. Fi 통합 — 효율뿐 아니라 의미와 가치 고려.'
  },
  ISFP: {
    code: 'ISFP', name: '모험가',
    stack: ['Fi','Se','Ni','Te'],
    shadow: ['Fe','Si','Ne','Ti'],
    temperament: 'SP (장인)',
    interactionStyle: 'behind-the-scenes',
    coreNeed: '감각적 아름다움과 가치의 체현',
    coreFear: '자유의 박탈, 진정성 상실',
    stressPattern: 'Te 그립 — 공격적 비판, 효율 강요. "이건 다 쓸데없어, 결과를 봐" 식 돌변.',
    loop: 'Fi-Ni 루프 — 내면 가치(Fi)를 부정적 미래 비전(Ni)으로 확증. Se를 건너뛰어 현재 경험 차단. 증상: 비관적 은둔.',
    growthPath: 'Se 활성화 — 내면의 가치를 현재 순간의 경험으로 표현. Te 통합 — 예술적 가치를 세상에 효과적으로 전달.'
  },
  ESFP: {
    code: 'ESFP', name: '연예인',
    stack: ['Se','Fi','Te','Ni'],
    shadow: ['Si','Fe','Ti','Ne'],
    temperament: 'SP (장인)',
    interactionStyle: 'get-things-going',
    coreNeed: '자유로운 경험과 즐거움의 공유',
    coreFear: '지루함, 구속, 즐거움의 박탈',
    stressPattern: 'Ni 그립 — 파멸적 미래 상상. "다 끝났어, 좋은 일은 없을 거야" 식 비관적 예언.',
    loop: 'Se-Te 루프 — 감각 경험(Se)을 효율(Te)로만 판단. Fi를 건너뛰어 가치 없는 쾌락 추구. 증상: 자극 중독.',
    growthPath: 'Fi 심화 — 경험 중 진짜 의미 있는 것 선별. Ni 통합 — 순간 너머의 장기적 방향.'
  },
  ISTP: {
    code: 'ISTP', name: '장인',
    stack: ['Ti','Se','Ni','Fe'],
    shadow: ['Te','Si','Ne','Fi'],
    temperament: 'SP (장인)',
    interactionStyle: 'chart-the-course',
    coreNeed: '원리 이해와 실전 능숙함',
    coreFear: '무능, 원리 이해 없는 맹목적 따름',
    stressPattern: 'Fe 그립 — 갑자기 타인 감정에 과민. "왜 다들 나를 싫어해?" 식 감정적 과민.',
    loop: 'Ti-Ni 루프 — 내부 논리(Ti)를 직관적 확신(Ni)으로만 뒷받침. Se를 건너뛰어 현실 데이터 차단. 증상: 검증 없는 이론 고집.',
    growthPath: 'Se 활성화 — 이론을 실전으로 검증. Fe 통합 — 기술적 능력을 타인과 나누는 소통.'
  },
  ESTP: {
    code: 'ESTP', name: '사업가',
    stack: ['Se','Ti','Fe','Ni'],
    shadow: ['Si','Te','Fi','Ne'],
    temperament: 'SP (장인)',
    interactionStyle: 'in-charge',
    coreNeed: '즉각적 행동과 현장 장악',
    coreFear: '행동 제한, 무기력',
    stressPattern: 'Ni 그립 — 파멸적 미래 상상. 모든 것이 나빠질 것이라는 부정적 비전에 사로잡힘.',
    loop: 'Se-Fe 루프 — 현장 반응(Se)과 사회적 평가(Fe)만 반복. Ti를 건너뛰어 논리 없이 분위기에 휘둘림.',
    growthPath: 'Ti 심화 — 행동 전 논리적 분석. Ni 통합 — 현재 행동의 장기적 결과 예측.'
  },
  ISFJ: {
    code: 'ISFJ', name: '수호자',
    stack: ['Si','Fe','Ti','Ne'],
    shadow: ['Se','Fi','Te','Ni'],
    temperament: 'SJ (수호자)',
    interactionStyle: 'behind-the-scenes',
    coreNeed: '안정적 관계와 신뢰할 수 있는 환경',
    coreFear: '불안정, 신뢰의 배반',
    stressPattern: 'Ne 그립 — 부정적 가능성의 폭발. "최악의 시나리오"를 끝없이 생성. 모든 것이 잘못될 수 있다는 불안.',
    loop: 'Si-Ti 루프 — 과거 기억(Si)을 내부 논리(Ti)로만 분석. Fe를 건너뛰어 타인과 공유하지 않고 혼자 곱씹음. 증상: 원한 축적.',
    growthPath: 'Fe 활성화 — 기억과 경험을 타인과 나눔. Ne 통합 — 새로운 가능성에 열린 마음.'
  },
  ESFJ: {
    code: 'ESFJ', name: '집정관',
    stack: ['Fe','Si','Ne','Ti'],
    shadow: ['Fi','Se','Ni','Te'],
    temperament: 'SJ (수호자)',
    interactionStyle: 'get-things-going',
    coreNeed: '사회적 조화와 소속감',
    coreFear: '거부, 고립, 조화의 파괴',
    stressPattern: 'Ti 그립 — 냉소적 분석. "어차피 아무도 진심이 아니야" 식 인간관계 해체.',
    loop: 'Fe-Ne 루프 — 타인 반응(Fe)과 가능성(Ne) 사이에서 불안하게 왔다 갔다. Si를 건너뛰어 검증된 경험 무시. 증상: 모든 사람을 기쁘게 하려는 소진.',
    growthPath: 'Si 심화 — 검증된 경험에 기반한 안정적 판단. Ti 통합 — 조화 너머의 논리적 경계.'
  },
  ISTJ: {
    code: 'ISTJ', name: '현실주의자',
    stack: ['Si','Te','Fi','Ne'],
    shadow: ['Se','Ti','Fe','Ni'],
    temperament: 'SJ (수호자)',
    interactionStyle: 'chart-the-course',
    coreNeed: '체계와 신뢰할 수 있는 구조',
    coreFear: '혼란, 무질서, 약속 위반',
    stressPattern: 'Ne 그립 — 부정적 가능성의 폭발. "이것도 잘못될 수 있고, 저것도..." 식의 끝없는 불안.',
    loop: 'Si-Fi 루프 — 과거 기억(Si)을 내면 가치(Fi)로만 해석. Te를 건너뛰어 객관적 기준 없이 주관적 정의에 매몰. 증상: "예전이 옳았어" 식 고집.',
    growthPath: 'Te 활성화 — 경험을 객관적 체계로 조직. Ne 통합 — 새로운 가능성에 열린 유연성.'
  },
  ESTJ: {
    code: 'ESTJ', name: '경영자',
    stack: ['Te','Si','Ne','Fi'],
    shadow: ['Ti','Se','Ni','Fe'],
    temperament: 'SJ (수호자)',
    interactionStyle: 'in-charge',
    coreNeed: '효율적 체계와 질서',
    coreFear: '무질서, 비효율, 통제 불능',
    stressPattern: 'Fi 그립 — 감정적 붕괴. "아무도 내 노력을 인정하지 않아" 식 자기 연민. 갑작스런 울음.',
    loop: 'Te-Ne 루프 — 효율(Te)과 가능성(Ne) 사이에서 산만하게 질주. Si를 건너뛰어 검증 없이 새 시스템을 계속 시도. 증상: 개혁 중독.',
    growthPath: 'Si 심화 — 검증된 시스템의 가치 인정. Fi 통합 — 효율 너머의 인간적 가치.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 4: 인지기능 상호작용 패턴                                   ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── 4-1. 기능 간 궁합 매트릭스 ──
// 두 기능이 만났을 때 시너지/갈등 패턴
var MT_FUNCTION_INTERACTIONS = {
  // 같은 축, 같은 태도 = 공명
  'Ne-Ne': { type: 'resonance', desc: '아이디어 폭발. 확산의 공명. 실행 없이 끝날 위험.' },
  'Ni-Ni': { type: 'resonance', desc: '비전 공유. 말 없이도 통하는 이해. 현실 괴리 위험.' },
  'Fe-Fe': { type: 'resonance', desc: '감정 동기화. 즉각적 라포. 갈등 회피 위험.' },
  'Fi-Fi': { type: 'resonance', desc: '가치 공명. 깊은 이해. 주관성 과잉 위험.' },
  'Te-Te': { type: 'resonance', desc: '효율 시너지. 빠른 의사결정. 감정 무시 위험.' },
  'Ti-Ti': { type: 'resonance', desc: '논리적 토론. 지적 자극. 실행 부재 위험.' },
  'Se-Se': { type: 'resonance', desc: '경험 공유. 즉각적 행동. 충동성 위험.' },
  'Si-Si': { type: 'resonance', desc: '안정적 루틴. 신뢰 구축. 변화 저항 위험.' },

  // 같은 축, 반대 태도 = 긴장
  'Ne-Si': { type: 'tension', desc: '가능성 vs 검증. 혁신 vs 전통. 건강하면 "검증된 혁신".' },
  'Ni-Se': { type: 'tension', desc: '비전 vs 현실. 미래 vs 현재. 건강하면 "현실에 접지된 비전".' },
  'Fe-Ti': { type: 'tension', desc: '조화 vs 논리. 관계 vs 진리. 건강하면 "논리적 공감".' },
  'Fi-Te': { type: 'tension', desc: '가치 vs 효율. 의미 vs 결과. 건강하면 "의미 있는 실행".' },

  // 다른 축 = 보완
  'Ne-Fe': { type: 'complement', desc: '가능성을 사람 중심으로 탐색. 사회적 혁신.' },
  'Ne-Te': { type: 'complement', desc: '가능성을 체계적으로 실행. 기업가적 실행력.' },
  'Ne-Fi': { type: 'complement', desc: '가능성을 가치에 비추어 선별. 예술적 탐색.' },
  'Ne-Ti': { type: 'complement', desc: '가능성을 논리적으로 검증. 이론적 탐색.' },
  'Ni-Fe': { type: 'complement', desc: '비전을 사람을 통해 실현. 카리스마적 리더십.' },
  'Ni-Te': { type: 'complement', desc: '비전을 체계적으로 실행. 전략적 리더십.' },
  'Ni-Fi': { type: 'complement', desc: '비전과 가치의 융합. 도덕적 비전.' },
  'Ni-Ti': { type: 'complement', desc: '비전을 논리적으로 정교화. 이론적 통찰.' },
  'Se-Fe': { type: 'complement', desc: '현장 감각으로 분위기 주도. 엔터테인먼트.' },
  'Se-Te': { type: 'complement', desc: '현장에서 즉각 실행. 위기 대응 리더십.' },
  'Se-Fi': { type: 'complement', desc: '감각적 경험의 가치 체화. 예술적 표현.' },
  'Se-Ti': { type: 'complement', desc: '현장 데이터의 논리적 분석. 기술적 장인.' },
  'Si-Fe': { type: 'complement', desc: '안정적 관계 유지. 신뢰 기반 공동체.' },
  'Si-Te': { type: 'complement', desc: '검증된 체계의 효율적 운영. 관리자.' },
  'Si-Fi': { type: 'complement', desc: '경험 기반 가치 체계. 전통의 수호.' },
  'Si-Ti': { type: 'complement', desc: '경험 데이터의 논리적 정리. 학자형.' }
};

// ── 4-2. 4축 강도별 행동 프로필 ──
// 같은 I라도 55 vs 88은 완전히 다른 사람
var MT_INTENSITY_PROFILES = {
  E: {
    55: { trait: '사람 속에서 에너지 얻지만 혼자 시간도 필수', love: '연인과 함께 있되 각자의 시간도 존중', work: '팀과 혼자 작업을 유연하게 전환', burn: '과도한 사교 활동 후 갑작스런 은둔 필요' },
    68: { trait: '혼자 있으면 심심. 주말에 약속 없으면 불안', love: '데이트 빈도가 높아야 안정감', work: '회의·브레인스토밍에서 에너지 충전', burn: '강제 고립(재택·격리) 시 우울감' },
    88: { trait: '혼자 있는 건 고문. 모임의 중심이어야 에너지 충전', love: '상대방도 사교적이길 기대, 집콕 연인은 답답', work: '혼자 작업은 고문, 항상 누군가와 함께', burn: '사교 기회 차단 시 정체성 위기' }
  },
  I: {
    55: { trait: '내향이지만 큰 모임도 OK. 외향인 척 가능한 내향', love: '조용한 데이트도 활발한 데이트도 가능', work: '필요하면 발표·네트워킹도 거뜬', burn: '에너지 관리 실패 시 갑작스런 셧다운' },
    68: { trait: '혼자만의 시간이 생명줄. 전화보다 카톡', love: '깊은 1:1 대화 선호, 단체 데이트 피곤', work: '집중 작업 시간 확보가 핵심, 잦은 회의는 독', burn: '사교 과부하 시 완전한 은둔 모드' },
    88: { trait: '세상은 시끄럽고 내 방이 천국. 파티 초대 = 빠질 구실부터', love: '상대방이 사회적 방패 역할 해주길 기대', work: '원격·독립 작업이 생산성 극대화', burn: '강제 사교 시 신체적 증상(두통·피로)' }
  },
  S: {
    55: { trait: '현실적이되 가끔 느낌적으로 판단', love: '현실적 계획 + 가끔 로맨틱한 서프라이즈', work: '데이터 기반이되 직감도 활용', burn: '과도한 추상적 논의 시 피로' },
    68: { trait: '"증거 보여줘"가 기본. 추상적 이야기에 "그래서 구체적으로?"', love: '약속·기념일 같은 구체적 표현 중시', work: '매뉴얼·체크리스트·실적 숫자가 중요', burn: '비전만 있고 실행 없는 환경에서 좌절' },
    88: { trait: '오감 예민, 현실 파악력 최상. 10년 후 상상은 막막', love: '선물·스킨십 같은 감각적 사랑 표현', work: '현장 경험이 최고의 학습, 이론 교육은 졸림', burn: '불확실한 미래 계획 강요 시 극심한 스트레스' }
  },
  N: {
    55: { trait: '가능성 탐색하되 현실 체크도 함', love: '깊은 대화를 원하되 현실적 조건도 고려', work: '전략적 사고 + 실행력 균형', burn: '단순 반복 업무 장기화 시 의미 상실감' },
    68: { trait: '"왜?"와 "만약에?"가 일상. 대화 중 주제가 세 번 점프', love: '지적 대화가 스킨십만큼 중요', work: '패턴 인식·전략 기획에 강점, 루틴 업무 약점', burn: '창의적 자극 없는 환경에서 서서히 죽어감' },
    88: { trait: '머릿속에 평행 우주 5개 작동. 현실은 가능성의 한 버전일 뿐', love: '영혼의 대화가 관계의 핵심 조건', work: '혁신적 아이디어 생산, 디테일 실행은 위임 필요', burn: '상상과 현실의 괴리에서 만성적 불만족' }
  },
  T: {
    55: { trait: '논리적이지만 감정도 꽤 고려', love: '효율적 문제 해결 + 감정적 배려 가능', work: '데이터와 팀 분위기 둘 다 챙김', burn: '감정 vs 논리 사이에서 내적 갈등' },
    68: { trait: '감정보다 효율. "맞는 말"이 "좋은 말"보다 중요', love: '문제 발생 시 감정보다 해결책 먼저', work: '성과 중심, KPI와 효율 최적화', burn: '비효율적 감정 표현 강요 시 짜증' },
    88: { trait: '감정은 비효율. 사실과 논리만 본다', love: '"울면서 말하면 논점이 흐려져" — 상대방 상처', work: '냉철한 의사결정, 팀 분위기 파괴 위험', burn: '감정적 동료와의 강제 협업 시 소진' }
  },
  F: {
    55: { trait: '공감 능력 높지만 논리적 판단도 가능', love: '감정적 연결 + 합리적 갈등 해결', work: '팀 분위기 + 성과 양립', burn: '감정적 결정 후 논리적 후회의 반복' },
    68: { trait: '논리보다 사람. "맞는 말이지만 그렇게 말하면 상처받잖아"', love: '감정적 안전감이 관계의 기초', work: '동료 관계·팀 문화에 민감, 갈등 시 소진 빠름', burn: '냉혹한 피드백에 정서적 타격 큼' },
    88: { trait: '논리적으로 맞아도 감정적으로 안 맞으면 거부', love: '감정의 깊이와 진정성이 관계의 전부', work: '팀 분위기가 나쁘면 성과와 무관하게 이직 고려', burn: '감정적으로 안전하지 않은 환경에서 신체 증상' }
  },
  J: {
    55: { trait: '계획 선호하지만 유연하게 변경 가능', love: '데이트 계획은 있되 즉흥 변경 OK', work: '체계적이되 예외 상황에 적응 가능', burn: '너무 많은 변수가 동시에 발생할 때' },
    68: { trait: '체크리스트 없으면 불안. 여행도 일정표부터', love: '관계 진행에도 단계와 타임라인 기대', work: '마감·일정 관리에 강점, 갑작스런 변경 시 스트레스', burn: '통제 불능 상황 장기화 시 번아웃' },
    88: { trait: '변수=스트레스. 모든 것에 계획과 마감이 필요', love: '"우리 관계 어디로 가는 거야" — 불확실성 못 참음', work: '완벽한 체계 구축 능력, 유연성 부족이 약점', burn: '계획 무시당하면 존재 자체가 부정당하는 느낌' }
  },
  P: {
    55: { trait: '옵션 열어두되 결정해야 할 때는 함', love: '즉흥과 계획 사이에서 균형', work: '유연한 대응 + 적당한 체계', burn: '과도한 규칙과 마감 압박' },
    68: { trait: '즉흥이 최고. 결정 미루는 게 아니라 "더 좋은 선택지가 있을 수도"', love: '자유로운 관계 선호, 속박 느끼면 도망', work: '위기 대응·창의적 문제 해결에 강점, 루틴 약점', burn: '경직된 규칙과 세세한 마감의 연속' },
    88: { trait: '계획은 감옥. 5분 후도 모르는 게 오히려 신남', love: '"흘러가는 대로" — 상대가 J면 갈등 불가피', work: '극한의 유연성, 마감 관리는 외부 도움 필수', burn: '반복적 루틴 업무에서 영혼이 죽어감' }
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 5: 발달심리학 × 인지기능 (Jung 개성화 과정)                 ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_DEVELOPMENT_STAGES = [
  { age: '0~6', stage: '미분화', desc: '모든 기능이 미분화 상태. 환경에 반응적.', focus: '생존과 애착' },
  { age: '6~12', stage: '주기능 분화', desc: '주기능이 의식적으로 분화. "나는 이게 잘 돼" 자각 시작.', focus: '핵심 강점 발견' },
  { age: '12~20', stage: '부기능 발달', desc: '주기능의 균형추로 부기능 발달. 사춘기에 두 기능의 조합이 성격의 핵심으로 정착.', focus: '정체성 형성' },
  { age: '20~35', stage: '3차기능 자각', desc: '3차기능이 의식에 올라오기 시작. 유치하지만 매력적. "나 원래 이런 면도 있었어?" 시기.', focus: '확장과 도전' },
  { age: '35~50', stage: '열등기능 대면', desc: 'Jung의 중년 전환점(midlife transition). 열등기능을 의식적으로 대면. 인생의 "두 번째 반" 시작.', focus: '통합과 성숙' },
  { age: '50+', stage: '개성화(individuation)', desc: '그림자 기능까지 포함한 전체 자아의 통합. 4개 기능 + 그림자 4개의 조화.', focus: '전체성(wholeness)' }
];




// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 6: 4대 기질 체계 (Keirsey Temperament)                    ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_TEMPERAMENTS = {
  NF: { name: '이상주의자(Idealist)', types: ['INFP','ENFP','INFJ','ENFJ'], coreNeed: '진정성과 의미', communication: '은유적, 감정적, 가능성 중심', conflict: '가치 충돌 시 깊은 상처. 비전 없는 관계에 서서히 죽어감.' },
  NT: { name: '합리주의자(Rational)', types: ['INTP','ENTP','INTJ','ENTJ'], coreNeed: '능력과 지적 자유', communication: '분석적, 전략적, 시스템 중심', conflict: '무능 지적에 깊은 상처. 지적 정체에 좌절.' },
  SP: { name: '장인(Artisan)', types: ['ISFP','ESFP','ISTP','ESTP'], coreNeed: '자유와 경험', communication: '구체적, 현재 중심, 행동 지향', conflict: '자유 박탈에 극도로 저항. 구속하면 도망.' },
  SJ: { name: '수호자(Guardian)', types: ['ISFJ','ESFJ','ISTJ','ESTJ'], coreNeed: '안정과 소속', communication: '구체적, 경험 기반, 전통 중시', conflict: '신뢰 배반에 깊은 상처. 불안정에 극도로 불안.' }
};


// ═══════════════════════════════════════════════════
// 전역 노출
// ═══════════════════════════════════════════════════
window.MT_FUNCTIONS = MT_FUNCTIONS;
window.MT_STACK_POSITIONS = MT_STACK_POSITIONS;
window.MT_SHADOW_POSITIONS = MT_SHADOW_POSITIONS;
window.MT_TYPES = MT_TYPES;
window.MT_FUNCTION_INTERACTIONS = MT_FUNCTION_INTERACTIONS;
window.MT_INTENSITY_PROFILES = MT_INTENSITY_PROFILES;
window.MT_DEVELOPMENT_STAGES = MT_DEVELOPMENT_STAGES;
window.MT_TEMPERAMENTS = MT_TEMPERAMENTS;

// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 7: 유형 간 관계 역학 — "두 유형이 만나면 무슨 일이"         ║
// ║  근거: Socionics 관계론 + Keirsey 궁합론 + 인지기능 교차 분석     ║
// ╚══════════════════════════════════════════════════════════════════╝

// ── 7-1. 관계 유형 정의 (8종) ──
var MT_RELATION_TYPES = {
  dual: {
    name: '쌍대(Dual)',
    pattern: '주기능이 상대의 열등기능과 같음. 서로의 약점을 자연스럽게 보완.',
    dynamic: '처음엔 신기하고, 깊어지면 가장 편한 관계. 서로 없는 것을 채워줌.',
    risk: '초반에 서로를 이해하기 어려울 수 있음. "왜 저렇게 생각하지?"',
    examples: 'INFP↔ESTJ, ENFP↔ISTJ, INFJ↔ESTP, INTJ↔ESFP'
  },
  mirror: {
    name: '거울(Mirror)',
    pattern: '같은 기능을 쓰지만 순서가 다름. 같은 주제를 다른 각도에서 봄.',
    dynamic: '대화가 잘 통하지만 결론이 다름. 서로의 다른 버전을 보는 느낌.',
    risk: '"나랑 비슷한데 왜 결론이 다르지?" — 미묘한 짜증',
    examples: 'INFP↔ENFJ, INTP↔ENTJ, ISFP↔ESFJ'
  },
  activity: {
    name: '활성(Activity)',
    pattern: '단기적으로 에너지를 높여주지만 장기적으로 소모.',
    dynamic: '만나면 재밌고 활발해짐. 그러나 오래 있으면 피로 누적.',
    risk: '서로 자극은 주지만 안정감은 못 줌',
    examples: 'INFP↔ESFP, INTJ↔ENTP'
  },
  conflict: {
    name: '충돌(Conflict)',
    pattern: '모든 기능이 반대 태도. 세상을 정반대로 봄.',
    dynamic: '멀리서 보면 매력적, 가까이 가면 모든 것이 어긋남.',
    risk: '근본적 세계관 차이. 타협점 찾기 매우 어려움.',
    examples: 'INFP↔ESTP, ENFP↔ISTJ(부분충돌), INFJ↔ESTJ(부분충돌)'
  },
  pedagogue: {
    name: '교육자(Pedagogue)',
    pattern: '한쪽의 주기능이 상대의 부기능과 같음.',
    dynamic: '"이 사람한테 배울 게 있다" 느낌. 자연스러운 멘토-멘티.',
    risk: '관계가 불균형해질 수 있음. 항상 가르치는 쪽/배우는 쪽 고정.',
    examples: 'INFJ→INFP (Ni가 INFP의 부기능 방향을 자극)'
  },
  companion: {
    name: '동반자(Companion)',
    pattern: '같은 주기능, 같은 태도. 세상을 같은 렌즈로 봄.',
    dynamic: '즉각적 이해. "이 사람은 나를 안다" 느낌. 편안함.',
    risk: '성장 자극이 약함. 같은 맹점을 공유하여 함께 빠짐.',
    examples: 'INFP↔ISFP (둘 다 Fi 주기능)'
  },
  supervisor: {
    name: '감독(Supervisor)',
    pattern: '한쪽의 주기능이 상대의 3차기능을 압박.',
    dynamic: '한쪽이 무의식적으로 상대의 약점을 자극. 의도 없이 압박.',
    risk: '받는 쪽은 "왜 이 사람 앞에서만 작아지지?" 느낌.',
    examples: 'ENTJ→ISFP (Te가 ISFP의 3차 Ni를 압박)'
  },
  quasiIdentical: {
    name: '유사(Quasi-identical)',
    pattern: '같은 기능을 공유하지만 내향/외향이 뒤집힘.',
    dynamic: '"비슷한 것 같은데 뭔가 다르다." 미묘한 이질감.',
    risk: '비슷해 보여서 기대했다가 실망. 같은 문제를 다르게 처리.',
    examples: 'INFP↔INFJ (Fi-Ne vs Ni-Fe)'
  }
};

// ── 7-2. 16유형 관계 매트릭스 (핵심 조합) ──
// 모든 256개 조합 대신, 토론에서 가장 많이 나올 핵심 패턴만
var MT_RELATION_MATRIX = [
  // NF × NF
  { a:'INFP', b:'ENFJ', rel:'mirror', note:'같은 가치(Fi/Fe)를 다른 방향에서. 깊은 대화 가능하지만 결론 다름' },
  { a:'INFP', b:'INFJ', rel:'quasiIdentical', note:'둘 다 깊고 이상적이지만 처리 방식 다름. Fi의 개인 가치 vs Fe의 사회 조화' },
  { a:'ENFP', b:'INFJ', rel:'pedagogue', note:'Ne가 Ni를 확장시키고, Ni가 Ne에 방향을 줌. 황금 조합이라 불림' },
  { a:'ENFP', b:'ENFJ', rel:'companion', note:'둘 다 열정적. 에너지 시너지 극대화. 그러나 현실 감각 부족' },

  // NF × NT
  { a:'INFP', b:'INTJ', rel:'pedagogue', note:'Ni가 Fi에 비전을 주고, Fi가 Ni에 가치를 줌. 서로의 깊이를 인정' },
  { a:'ENFP', b:'INTJ', rel:'dual', note:'Ne-Fi × Ni-Te. 가능성+가치 vs 비전+실행. 강력한 보완' },
  { a:'INFJ', b:'INTP', rel:'companion', note:'Ni-Ti 축 공유. 깊은 지적 교감. 그러나 감정 처리 방식 다름' },
  { a:'ENFJ', b:'ENTP', rel:'activity', note:'단기 시너지 폭발. 장기적으로 Fe vs Ti 갈등' },

  // NT × NT
  { a:'INTJ', b:'INTP', rel:'mirror', note:'같은 분석력, 다른 실행력. Ni-Te는 결론 내고, Ti-Ne는 계속 탐색' },
  { a:'ENTJ', b:'INTP', rel:'supervisor', note:'Te가 Ti를 압박. INTP는 "왜 결론을 서두르지?" ENTJ는 "왜 실행을 안 하지?"' },
  { a:'ENTP', b:'INTJ', rel:'mirror', note:'Ne의 확산 vs Ni의 수렴. 토론은 최고, 협업은 방향 갈등' },

  // SP × SP
  { a:'ISTP', b:'ESTP', rel:'companion', note:'Ti 공유. 실전 능력 시너지. 감정 소통은 둘 다 약함' },
  { a:'ISFP', b:'ESFP', rel:'companion', note:'Fi 공유. 경험 속에서 의미 찾기. 편안하지만 계획성 부족' },

  // SJ × SJ
  { a:'ISTJ', b:'ESTJ', rel:'companion', note:'Si-Te 축 공유. 체계적 협업 최강. 유연성 부족' },
  { a:'ISFJ', b:'ESFJ', rel:'companion', note:'Si-Fe 축 공유. 안정적 관계. 변화에 취약' },

  // NF × SP (가장 극적 조합)
  { a:'INFP', b:'ESTP', rel:'conflict', note:'Fi-Ne vs Se-Ti. 가치/가능성 vs 현재/논리. 극과 극' },
  { a:'INFJ', b:'ESTP', rel:'dual', note:'Ni-Fe vs Se-Ti. 서로의 약점을 정확히 보완. 초반 이질감 큼' },
  { a:'ENFP', b:'ISTP', rel:'activity', note:'Ne-Fi vs Ti-Se. 단기 자극. 장기 소통 어려움' },

  // NF × SJ
  { a:'INFP', b:'ESTJ', rel:'dual', note:'Fi-Ne vs Te-Si. 가치 vs 효율의 극적 보완. 갈등도 극적' },
  { a:'ENFJ', b:'ISTJ', rel:'pedagogue', note:'Fe가 Si의 안정성을 인정하고, Si가 Fe의 온기를 받음' },
  { a:'INFJ', b:'ISFJ', rel:'companion', note:'둘 다 깊은 배려. Ni vs Si 차이 — 미래 vs 과거 지향' },

  // NT × SJ
  { a:'INTJ', b:'ISTJ', rel:'pedagogue', note:'Ni가 Si에 비전을 줌. Si는 Ni에 현실 데이터를 줌' },
  { a:'ENTP', b:'ISTJ', rel:'conflict', note:'Ne-Ti vs Si-Te. 혁신 vs 전통. 근본적 갈등' },
  { a:'ENTJ', b:'ESTJ', rel:'companion', note:'Te 공유. 실행력 시너지. 권력 경쟁 가능성' }
];


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 8: 유형별 커리어 적성                                      ║
// ║  근거: Holland 직업흥미 이론 + MBTI Career Report + 실증 연구     ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_CAREER = {
  INFP: { strengths:'상담, 글쓰기, 예술, 심리치료, 사회복지, UX디자인', weakAreas:'고압 영업, 반복 행정, 대규모 관리', idealEnv:'자율성, 의미 있는 일, 소규모 팀', stressJob:'가치와 충돌하는 업무, 감정 억제 요구 환경', holland:'ASI (예술-사회-탐구)' },
  ENFP: { strengths:'마케팅, 기획, 상담, 교육, 스타트업, 저널리즘', weakAreas:'반복 루틴, 세밀한 데이터 관리, 혼자 장기 집중', idealEnv:'창의적 자유, 다양한 프로젝트, 사람과 협업', stressJob:'엄격한 규칙, 단일 업무 반복', holland:'EAS (기업-예술-사회)' },
  INFJ: { strengths:'상담, 심리학, 작가, 교수, NGO, 전략기획', weakAreas:'고빈도 사교, 단기 성과 압박, 표면적 관계', idealEnv:'깊은 의미, 장기 비전, 1:1 관계', stressJob:'정치적 환경, 가치 없는 반복', holland:'SAI (사회-예술-탐구)' },
  ENFJ: { strengths:'교육, HR, 리더십, 상담, 공공정책, 이벤트기획', weakAreas:'고독한 독립작업, 냉혹한 데이터 분석', idealEnv:'팀 리더십, 사람 성장 관여, 비전 공유', stressJob:'고립된 작업, 인간관계 무시 문화', holland:'SEC (사회-기업-관습)' },
  INTP: { strengths:'프로그래밍, 연구, 데이터분석, 철학, 수학, 게임개발', weakAreas:'감정 노동, 세일즈, 반복 행정', idealEnv:'지적 자유, 복잡한 문제, 자율 시간', stressJob:'감정 기반 의사결정, 정치적 환경', holland:'IAR (탐구-예술-현실)' },
  ENTP: { strengths:'기업가, 변호사, 컨설턴트, 발명가, 벤처캐피탈, 토론가', weakAreas:'장기 루틴, 세부사항 관리, 감정 노동', idealEnv:'지적 도전, 다양한 프로젝트, 논쟁 가능', stressJob:'반복, 세부 관리, 감정 순응 요구', holland:'EIA (기업-탐구-예술)' },
  INTJ: { strengths:'전략기획, 시스템설계, 연구, 투자, 경영컨설팅', weakAreas:'감정 노동, 서비스업, 잦은 회의', idealEnv:'장기 비전, 독립 작업, 전문성 인정', stressJob:'비효율적 조직, 정치적 의사결정', holland:'IEA (탐구-기업-예술)' },
  ENTJ: { strengths:'CEO, 경영, 법률, 군사전략, 프로젝트관리, 정치', weakAreas:'감정 상담, 예술적 모호함, 수동적 역할', idealEnv:'리더 포지션, 명확한 목표, 경쟁 환경', stressJob:'권한 없는 포지션, 비효율 조직', holland:'EIC (기업-탐구-관습)' },
  ISFP: { strengths:'디자인, 요리, 사진, 물리치료, 수의학, 패션', weakAreas:'대규모 관리, 공격적 영업, 장기 계획', idealEnv:'감각적 자유, 자기 표현, 유연한 일정', stressJob:'규격화된 환경, 감정 억제, 경쟁 문화', holland:'ARS (예술-현실-사회)' },
  ESFP: { strengths:'연기, 이벤트기획, 영업, 관광, 응급의료, 스포츠', weakAreas:'장기 연구, 고독한 분석, 이론 작업', idealEnv:'사람과 함께, 즉각적 결과, 감각적 자극', stressJob:'혼자 장기 프로젝트, 추상적 계획', holland:'ESA (기업-사회-예술)' },
  ISTP: { strengths:'엔지니어, 정비사, 외과의사, 파일럿, 프로그래머, 형사', weakAreas:'감정 상담, 장기 팀 관리, 반복 행정', idealEnv:'실전 문제해결, 도구/기술, 독립 작업', stressJob:'감정 정치, 의미 없는 회의', holland:'RIA (현실-탐구-예술)' },
  ESTP: { strengths:'기업가, 영업, 응급구조, 스포츠코치, 부동산, 트레이더', weakAreas:'장기 연구, 감정 상담, 이론 작업', idealEnv:'즉각적 행동, 위기 대응, 경쟁 환경', stressJob:'느린 관료제, 추상적 계획', holland:'ERC (기업-현실-관습)' },
  ISFJ: { strengths:'간호, 교사, 행정, 사서, 사회복지, 회계', weakAreas:'고위험 의사결정, 빈번한 변화, 공격적 경쟁', idealEnv:'안정적, 명확한 역할, 사람 돌봄', stressJob:'불확실성, 빠른 변화, 갈등 환경', holland:'SCR (사회-관습-현실)' },
  ESFJ: { strengths:'교사, 간호, HR, 이벤트, 영업, 고객서비스', weakAreas:'고독한 연구, 냉혹한 분석, 기술 전문직', idealEnv:'팀 분위기, 사람 돌봄, 인정받는 환경', stressJob:'고립, 냉혹한 피드백 문화', holland:'SEC (사회-기업-관습)' },
  ISTJ: { strengths:'회계, 법률, 군인, 공무원, 데이터관리, 품질관리', weakAreas:'즉흥 창작, 감정 상담, 모호한 업무', idealEnv:'명확한 체계, 안정적 조직, 전문성 축적', stressJob:'끊임없는 변화, 규칙 없는 환경', holland:'CRI (관습-현실-탐구)' },
  ESTJ: { strengths:'관리자, 군장교, 판사, 재무관리, 프로젝트매니저', weakAreas:'예술적 모호함, 감정 상담, 수동적 역할', idealEnv:'명확한 위계, 실행 권한, 결과 측정 가능', stressJob:'권한 없음, 비효율 방치, 감정 정치', holland:'ECR (기업-관습-현실)' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 9: 유형별 갈등/소통 스타일                                  ║
// ║  근거: Thomas-Kilmann 갈등 모델 + MBTI Conflict Dynamics          ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_CONFLICT_STYLES = {
  INFP: {
    trigger: '가치가 무시되거나 진정성이 의심받을 때',
    fightStyle: '처음엔 참다가 한계점에서 폭발. 조용히 관계를 끊어버리는 "도어 슬램" 가능',
    communication: '감정을 글로 표현하는 게 말보다 나음. 직접 대면 갈등 극도로 힘들어함',
    needsFromOther: '"네 감정이 맞아" 라는 인정. 해결책보다 공감이 먼저',
    blindSpot: '상대의 의도를 과도하게 해석. "그렇게 말한 건 나를 무시한 거야"'
  },
  ENFP: {
    trigger: '자유가 제한되거나 가능성이 차단될 때',
    fightStyle: '감정적으로 폭발했다가 금방 풀림. 그러나 근본 문제는 안 풀린 채 반복',
    communication: '대화를 많이 하지만 핵심을 빙빙 돌림. 비유와 감정으로 소통',
    needsFromOther: '가능성을 열어두는 태도. "그것도 방법이네" 한마디',
    blindSpot: '갈등 자체를 회피하려다 문제 악화. "괜찮아 괜찮아" 하다가 터짐'
  },
  INFJ: {
    trigger: '비전이 무시되거나 관계가 피상적으로 느껴질 때',
    fightStyle: '오래 참다가 한 번에 관계를 끊음. 경고 없이 사라지는 "INFJ door slam"',
    communication: '핵심을 직관적으로 꿰뚫지만 설명을 잘 못함. "그냥 느껴지는데..."',
    needsFromOther: '의도를 진심으로 이해하려는 노력. 표면적 사과는 역효과',
    blindSpot: '자신의 비전에 대한 과도한 확신. 상대 관점을 "피상적"으로 치부'
  },
  ENFJ: {
    trigger: '팀의 조화가 깨지거나 자신의 선의가 거부될 때',
    fightStyle: '상대 감정을 조작하려는 무의식적 시도. "이렇게 하면 다 좋잖아"',
    communication: '대화 주도. 상대의 감정을 읽고 맞추지만, 자기 감정은 숨김',
    needsFromOther: '리더십에 대한 인정. "네가 있어서 다행이야"',
    blindSpot: '조화를 위해 자기 욕구를 억압. 축적되면 Ti 그립으로 냉소 폭발'
  },
  INTP: {
    trigger: '논리가 무시되거나 비합리적 결정이 강요될 때',
    fightStyle: '논리적으로 상대를 해체. 감정은 배제하고 팩트만 나열. 상대는 "차갑다" 느낌',
    communication: '정확한 용어와 논리 체인. 감정적 소통에 서툴러서 "로봇 같다" 오해',
    needsFromOther: '논리적 일관성 존중. "네 분석이 맞아, 근데 감정도 고려하자"',
    blindSpot: '상대의 감정적 맥락을 완전히 놓침. "논리적으로 맞는데 왜 화내?"'
  },
  ENTP: {
    trigger: '지적으로 과소평가되거나 가능성이 차단될 때',
    fightStyle: '토론을 즐기듯 갈등에 접근. 상대는 싸움인데 본인은 "재밌는 논쟁"으로 인식',
    communication: '빠른 반론, 다양한 각도. 상대가 지칠 때까지 논점을 바꿔가며 공격',
    needsFromOther: '지적 능력에 대한 인정. 토론할 수 있는 공간',
    blindSpot: '갈등을 게임으로 여겨 상대 감정을 상처냄. "나는 토론했을 뿐인데?"'
  },
  INTJ: {
    trigger: '비효율이 방치되거나 무능이 용인될 때',
    fightStyle: '냉정한 분석으로 상대의 논리를 해체. 감정 없이 팩트만 제시',
    communication: '간결하고 직접적. 돌려 말하지 않음. "결론부터 말하면..."',
    needsFromOther: '능력에 대한 인정. 비전을 이해하려는 노력',
    blindSpot: '자신의 방식이 유일한 정답이라는 확신. 감정적 데이터를 무시'
  },
  ENTJ: {
    trigger: '통제권을 잃거나 무능한 리더십을 목격할 때',
    fightStyle: '직접적 대면. 권위로 압도하려 함. "내가 맞고 너가 틀려"',
    communication: '명확한 지시와 기대치. 감정적 뉘앙스는 무시',
    needsFromOther: '실행력과 결과. "됐고, 이거 해"에 "네, 하겠습니다"',
    blindSpot: 'Fi 그립 — 갑작스런 감정 폭발 후 자기도 당황. "나 왜 이러지?"'
  },
  ISFP: {
    trigger: '자유가 억압되거나 가치가 강요될 때',
    fightStyle: '조용히 저항. 말은 안 하지만 행동으로 거부. 극단적이면 완전히 사라짐',
    communication: '비언어적 소통 선호. 분위기로 감정을 전달. 직접적 대화 회피',
    needsFromOther: '공간과 시간. "준비되면 말해" — 기다려주는 태도',
    blindSpot: '감정을 말로 표현하지 않아서 상대가 모름. "왜 말 안 했어?"'
  },
  ESFP: {
    trigger: '즐거움이 차단되거나 지루한 환경에 갇힐 때',
    fightStyle: '감정적으로 터뜨리고 빠르게 잊음. 본인은 풀렸는데 상대는 안 풀림',
    communication: '직접적이고 감정적. 바로 말하고 바로 잊음',
    needsFromOther: '현재 순간의 감정 인정. 과거 끌어오지 말 것',
    blindSpot: '갈등의 근본 원인을 안 봄. 증상만 처리하고 넘어감'
  },
  ISTP: {
    trigger: '논리가 무시되거나 불필요한 감정 개입이 있을 때',
    fightStyle: '냉정하게 분석 후 결론 통보. "이유는 이거고, 끝." 협상 여지 안 줌',
    communication: '최소한의 말. 필요한 것만. 감정 표현은 거의 없음',
    needsFromOther: '로직 존중. 불필요한 감정 토론 안 하는 것',
    blindSpot: 'Fe 그립 시 갑자기 감정 폭발. 평소와 정반대라 주변 혼란'
  },
  ESTP: {
    trigger: '행동이 제한되거나 무기력한 환경에 놓일 때',
    fightStyle: '직접적 대면. 문제를 바로 해결하려 함. "지금 바로 얘기하자"',
    communication: '실용적, 현재 중심. "과거 얘기 왜 해? 지금 어떻게 할 건데?"',
    needsFromOther: '행동으로 보여주기. 말보다 실행',
    blindSpot: 'Ni 그립 시 최악의 미래를 상상하며 비관에 빠짐'
  },
  ISFJ: {
    trigger: '신뢰가 배반당하거나 안정이 위협받을 때',
    fightStyle: '참고 참다가 과거 기록을 전부 꺼냄. "그때도 이랬잖아, 그리고 그때도..."',
    communication: '간접적. 돌려 말하거나 행동으로 표현 (밥 안 차려줌, 연락 안 함)',
    needsFromOther: '일관된 태도와 감사 표현. "네가 해준 거 다 알아"',
    blindSpot: '과거 상처를 기록처럼 저장. 한 번 무너진 신뢰는 복구 극도로 어려움'
  },
  ESFJ: {
    trigger: '소속감이 위협받거나 노력이 인정받지 못할 때',
    fightStyle: '관계 동원. "다른 사람들도 다 그렇게 생각해" — 사회적 압력 사용',
    communication: '감정 중심이지만 논리적 포장을 시도. 상대의 감정을 읽으며 대화',
    needsFromOther: '기여에 대한 인정. "네 덕분이야" 한마디',
    blindSpot: 'Ti 그립 시 냉소적 분석으로 관계를 해체. 평소 모습과 정반대'
  },
  ISTJ: {
    trigger: '규칙이 무시되거나 약속이 깨질 때',
    fightStyle: '팩트와 전례를 무기로 사용. "이전에 합의한 건 이거였고, 너는 안 지켰어"',
    communication: '직접적이고 구체적. 추상적 대화 싫어함. 데이터와 사실 중심',
    needsFromOther: '약속 이행. 말한 대로 행동하는 일관성',
    blindSpot: 'Ne 그립 시 최악의 가능성을 끝없이 상상. "다 잘못될 거야"'
  },
  ESTJ: {
    trigger: '무질서, 비효율, 약속 불이행',
    fightStyle: '직접적 대면 + 권위 사용. "이건 이렇게 해야 하는 거야" — 타협 어려움',
    communication: '명확한 기대치와 결과 중심. "언제까지 뭘 해" — 지시형',
    needsFromOther: '결과로 보여주기. 실행력에 대한 존중',
    blindSpot: 'Fi 그립 시 감정적 붕괴. 평소 강한 모습과 대비되어 본인도 당황'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 10: 인지기능 축(Axis) 이론 — 시소 역학의 핵심              ║
// ║  근거: Jung 보상 원리, Beebe 대극 이론                           ║
// ╚══════════════════════════════════════════════════════════════════╝

// 4개 축: 같은 축의 두 기능은 시소 관계. 하나가 올라가면 하나가 내려감.
// 이것이 그립(grip)의 원리이자, 성장의 방향.
var MT_AXES = {
  'Fi-Te': {
    name: '가치-효율 축 (Judging Introverted-Extraverted)',
    seesaw: 'Fi가 강하면 Te가 약함 (가치 중심 → 실행력 부족). Te가 강하면 Fi가 약함 (효율 중심 → 의미 상실).',
    healthyBalance: '가치 있는 것을 효율적으로 실행. "의미 있는 일을 제대로 해낸다"',
    unhealthyFiDom: '가치에 매몰 → 현실에서 아무것도 실행 못함. "좋은 사람인데 결과가 없다"',
    unhealthyTeDom: '효율에 매몰 → 왜 하는지 잊음. "성공했는데 공허하다"',
    gripDirection: 'Fi 주기능자 스트레스 → Te 폭발 (냉혹한 효율 강요). Te 주기능자 스트레스 → Fi 폭발 (감정적 붕괴).',
    types: { FiDom: ['INFP','ISFP'], TeDom: ['ENTJ','ESTJ'], FiAux: ['ENFP','ESFP'], TeAux: ['INTJ','ISTJ'] }
  },
  'Fe-Ti': {
    name: '조화-논리 축',
    seesaw: 'Fe가 강하면 Ti가 약함 (관계 중심 → 논리적 경계 부재). Ti가 강하면 Fe가 약함 (논리 중심 → 관계 단절).',
    healthyBalance: '논리적 판단을 관계 안에서 전달. "정확하면서도 따뜻하다"',
    unhealthyFeDom: '조화에 매몰 → 자기 생각이 없음. "모두에게 좋은 사람인데 본인이 없다"',
    unhealthyTiDom: '논리에 매몰 → 사람을 잃음. "맞는 말만 하는데 아무도 안 듣는다"',
    gripDirection: 'Fe 주기능자 스트레스 → Ti 폭발 (냉소적 해체). Ti 주기능자 스트레스 → Fe 폭발 (인정 갈구).',
    types: { FeDom: ['ENFJ','ESFJ'], TiDom: ['INTP','ISTP'], FeAux: ['INFJ','ISFJ'], TiAux: ['ENTP','ESTP'] }
  },
  'Ne-Si': {
    name: '가능성-검증 축 (Perceiving)',
    seesaw: 'Ne가 강하면 Si가 약함 (미래 가능성 → 과거 학습 무시). Si가 강하면 Ne가 약함 (검증된 것만 → 새 가능성 차단).',
    healthyBalance: '과거 데이터 기반으로 새 가능성을 탐색. "경험을 토대로 혁신한다"',
    unhealthyNeDom: '가능성에 매몰 → 아무것도 완성 못함. "아이디어는 100개, 결과물은 0개"',
    unhealthySiDom: '과거에 매몰 → 변화 거부. "예전에 이렇게 했으니까 계속 이렇게"',
    gripDirection: 'Ne 주기능자 스트레스 → Si 그립 (과거 집착, 신체 증상). Si 주기능자 스트레스 → Ne 그립 (부정적 가능성 폭발).',
    types: { NeDom: ['ENFP','ENTP'], SiDom: ['ISFJ','ISTJ'], NeAux: ['INFP','INTP'], SiAux: ['ESFJ','ESTJ'] }
  },
  'Ni-Se': {
    name: '비전-현실 축 (Perceiving)',
    seesaw: 'Ni가 강하면 Se가 약함 (미래 비전 → 현재 순간 놓침). Se가 강하면 Ni가 약함 (현재 경험 → 장기 방향 없음).',
    healthyBalance: '현재 경험에서 장기 패턴을 읽어냄. "지금 여기에서 미래를 본다"',
    unhealthyNiDom: '비전에 매몰 → 현실과 괴리. "머릿속에서만 사는 사람"',
    unhealthySeDom: '경험에 매몰 → 미래 없음. "지금 재밌으면 됐지 — 10년 후? 몰라"',
    gripDirection: 'Ni 주기능자 스트레스 → Se 그립 (감각 과잉행동). Se 주기능자 스트레스 → Ni 그립 (파멸적 미래 상상).',
    types: { NiDom: ['INFJ','INTJ'], SeDom: ['ESFP','ESTP'], NiAux: ['ENFJ','ENTJ'], SeAux: ['ISFP','ISTP'] }
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 11: 유형별 연애/사랑 패턴                                  ║
// ║  근거: MBTI Love Languages 연구 + 인지기능 연애 역학             ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_LOVE = {
  INFP: { attract:'진정성과 깊이. 겉치레 없는 사람에게 끌림', loveLanguage:'의미 있는 대화, 편지/글, 함께하는 고요한 시간', earlyDating:'이상화 경향. 상대를 완벽한 존재로 투사', deepRelation:'깊은 감정 교류. 1:1에서 가장 친밀. 상대의 영혼을 이해하고 싶어함', conflict:'상처받으면 침묵. 감정이 정리될 때까지 시간 필요', breakup:'오래 끌다가 한순간 "끝"을 선언. 미련이 오래 남지만 돌아가진 않음', dealbreaker:'진정성 없는 관계, 감정적 억압, 가치관 무시', growthInLove:'Te 발달 — 감정만이 아니라 현실적 문제도 직면하는 용기' },
  ENFP: { attract:'유머, 지적 자극, 독특한 세계관. "이 사람 재밌다"가 입구', loveLanguage:'함께하는 새로운 경험, 깊은 대화, 서프라이즈', earlyDating:'열정적 몰입. 상대의 가능성을 보고 사랑에 빠짐', deepRelation:'자유 속의 연결. 속박 없이 깊게 연결되길 원함', conflict:'감정적으로 터뜨리고 빠르게 회복. 근본 문제는 반복될 수 있음', breakup:'미련과 새로운 가능성 사이에서 방황. 이별 후 자기 탐색기', dealbreaker:'자유 억압, 지적 무시, 루틴 강요', growthInLove:'Si 발달 — 꾸준함과 약속 이행. 설렘 없어도 관계를 유지하는 힘' },
  INFJ: { attract:'깊이, 비전, 도덕적 강함. 영혼의 동반자를 찾음', loveLanguage:'의미 있는 대화, 미래 계획 공유, 조용한 헌신', earlyDating:'상대를 읽는 능력이 극강. 초기에 "이 사람이다" 확신 가능', deepRelation:'영혼의 연결 추구. 표면적 관계에 만족 못함. 모 아니면 도', conflict:'참다가 "도어 슬램". 경고 없이 관계를 끊어버림', breakup:'결단하면 돌아보지 않음. 감정 처리는 혼자 내면에서', dealbreaker:'피상적 관계, 도덕적 타협, 비전 없는 삶', growthInLove:'Se 발달 — 현재 순간의 즐거움. 완벽한 관계 대신 지금의 관계를 즐기기' },
  ENFJ: { attract:'따뜻한 카리스마. 상대를 빛나게 만드는 능력', loveLanguage:'칭찬, 함께하는 시간, 상대의 성장 지원', earlyDating:'상대의 잠재력을 보고 사랑에 빠짐. 코칭 본능 발동', deepRelation:'파트너를 성장시키고 싶어함. 때로 과도한 개입', conflict:'조화 유지 시도. 자기 욕구를 숨기다가 축적 후 폭발', breakup:'관계를 끝내기 어려워함. 상대를 위해 머무르다가 소진', dealbreaker:'무관심, 성장 거부, 감정적 착취', growthInLove:'Ti 발달 — 모든 사람을 구하려 하지 않기. 건강한 경계선' },
  INTP: { attract:'지적 호기심. "이 사람 머리가 어떻게 돌아가지?" 궁금증', loveLanguage:'지적 대화, 독립적 시간 존중, 공유하는 관심사', earlyDating:'감정 표현 서툴러서 관심 있어도 티가 안 남', deepRelation:'지적 동반자 관계. 감정보다 생각을 공유할 때 친밀감', conflict:'논리로 감정을 처리하려 함. 상대는 "로봇이랑 대화하는 느낌"', breakup:'감정적으로 힘들어도 논리적 이유를 찾으려 함. 정리 느림', dealbreaker:'지적 무시, 비합리적 강요, 과도한 감정 요구', growthInLove:'Fe 발달 — 감정의 논리적 가치를 인정. "비합리적이어도 중요한 것"' },
  ENTP: { attract:'지적 불꽃. 토론하다 사랑에 빠지는 유형', loveLanguage:'지적 도전, 유머, 함께하는 새로운 시도', earlyDating:'매력적이고 재밌지만 정착 어려움. "이 사람도 재밌고 저 사람도..."', deepRelation:'파트너에게 끊임없는 지적 자극 기대. 지루해지면 위험', conflict:'토론으로 접근. 상대가 감정적이면 "왜 논리적으로 안 해?"', breakup:'관계보다 가능성이 우선. 새로운 사람에 대한 호기심', dealbreaker:'지적 정체, 가능성 차단, 과도한 루틴', growthInLove:'Si 발달 — 한 사람과 깊이. 넓이 대신 깊이의 가치 발견' },
  INTJ: { attract:'능력, 독립성, 깊이. "이 사람은 진짜다"는 느낌', loveLanguage:'효율적 도움, 미래 계획 공유, 지적 존중', earlyDating:'매우 선별적. 관심 없으면 시간 안 씀. 관심 있으면 전략적 접근', deepRelation:'파트너를 시스템의 핵심 파트로 여김. 깊지만 표현이 건조', conflict:'감정 빼고 팩트만. 상대 입장에서는 차갑고 무정하게 느껴짐', breakup:'결단하면 깔끔. 미련 없이 자름. 감정 처리는 혼자', dealbreaker:'무능, 비전 없음, 감정적 조작', growthInLove:'Se 발달 — 현재 순간 즐기기. Fi 발달 — 감정을 언어로 표현하는 연습' },
  ENTJ: { attract:'파워, 결단력, 비전. 강한 사람에게 끌리는 상대에게 최적', loveLanguage:'함께하는 목표 달성, 실용적 지원, 공개적 인정', earlyDating:'관계도 프로젝트처럼 접근. 목표 설정 → 실행', deepRelation:'동반 성장 파트너. 서로를 높이는 팀. 감정 교류는 약할 수 있음', conflict:'직접적 대면. "문제 뭐야? 해결 방법은?" — 감정은 후순위', breakup:'비효율적 관계는 정리. 감정보다 논리적 판단', dealbreaker:'무능, 의존성 과다, 비전 불일치', growthInLove:'Fi 발달 — 파트너의 감정이 "비효율"이 아니라 "데이터"임을 배움' },
  ISFP: { attract:'조용한 매력, 감각적 아름다움, 진정성', loveLanguage:'함께하는 경험, 감각적 선물, 물리적 친밀감', earlyDating:'느리게 다가감. 신뢰가 쌓여야 마음을 염', deepRelation:'현재 순간을 함께 느끼는 관계. 말보다 행동으로 사랑 표현', conflict:'침묵으로 저항. 극단적이면 사라짐', breakup:'조용히 떠남. 설명 없이 거리 두기', dealbreaker:'자유 억압, 감각적 무감각, 가치 강요', growthInLove:'Te 발달 — 감정을 말로 표현. Ni 발달 — 관계의 장기 방향 설정' },
  ESFP: { attract:'에너지, 유머, 현재 순간의 즐거움. 같이 있으면 재밌는 사람', loveLanguage:'함께하는 경험, 물리적 애정, 서프라이즈', earlyDating:'빠르게 빠지고 빠르게 식을 수 있음. 현재 감정에 충실', deepRelation:'즐거움 공유가 핵심. 무거운 대화보다 함께하는 경험', conflict:'바로 터뜨리고 바로 잊음. 본인은 풀렸는데 상대는 아님', breakup:'새 자극에 끌림. 이별도 빠르게 처리하려 함', dealbreaker:'지루함, 과도한 규칙, 감정 억제 요구', growthInLove:'Ni 발달 — 즉각적 즐거움 너머의 깊은 의미 발견' },
  ISTP: { attract:'쿨한 능력자. 위기에 강한 모습에 끌림', loveLanguage:'함께하는 활동, 실용적 도움, 공간 존중', earlyDating:'관심 표현이 매우 미묘. 상대가 알아채기 어려움', deepRelation:'행동으로 사랑 표현. 말은 적지만 필요할 때 확실히 있어줌', conflict:'냉정한 분석. 감정 논의 자체를 불편해함', breakup:'감정 정리 없이 떠날 수 있음. "안 맞으면 안 맞는 거지"', dealbreaker:'감정 강요, 자유 제한, 비효율적 드라마', growthInLove:'Fe 발달 — 감정이 논리적이지 않아도 유효함을 배움' },
  ESTP: { attract:'자신감, 행동력, 현장 장악력. 같이 있으면 짜릿한 사람', loveLanguage:'함께하는 모험, 물리적 애정, 즉각적 반응', earlyDating:'직접적 접근. 관심 있으면 바로 행동. 밀당 안 함', deepRelation:'경험 공유가 유대. 일상의 모험을 함께', conflict:'현재 문제에 집중. "지금 어떻게 할 건데?" — 과거 안 봄', breakup:'깔끔하게 끊음. 미련보다 다음 행동', dealbreaker:'행동 제한, 과도한 감정 논의, 지루한 루틴', growthInLove:'Ni 발달 — 관계의 장기 방향. Fe 발달 — 파트너 감정의 깊이 읽기' },
  ISFJ: { attract:'따뜻한 안정감. "이 사람이면 안전하다"는 느낌', loveLanguage:'헌신적 돌봄, 기억된 디테일, 안정적 루틴', earlyDating:'천천히, 신중하게. 신뢰가 확인되어야 마음을 염', deepRelation:'헌신적 파트너. 상대의 필요를 기억하고 채워줌. 과도한 희생 위험', conflict:'참다가 과거 기록을 전부 꺼냄. 축적형 갈등', breakup:'매우 어려워함. 관계 유지를 위해 자기를 희생하다가 소진', dealbreaker:'배반, 불안정, 감사 없음', growthInLove:'Ne 발달 — 새로운 경험에 대한 열린 마음. 변화도 안전할 수 있음을 배움' },
  ESFJ: { attract:'따뜻한 사교성. 모임에서 가장 먼저 말 걸어주는 사람', loveLanguage:'칭찬, 함께하는 사교 활동, 기념일 챙기기', earlyDating:'관계의 "정상 경로"를 따르려 함. 썸→고백→연인 단계', deepRelation:'헌신적이고 사교적인 커플. 주변 관계까지 관리', conflict:'사회적 지지를 동원. "다른 사람들도 내 편이야"', breakup:'사회적 체면도 고려. 혼자 결정 어려워함', dealbreaker:'소속감 파괴, 공개적 무시, 노력 불인정', growthInLove:'Ti 발달 — 모든 관계를 유지하지 않아도 됨. 건강한 경계' },
  ISTJ: { attract:'신뢰할 수 있는 일관성. "이 사람은 변하지 않는다"', loveLanguage:'약속 이행, 실용적 지원, 안정적 루틴', earlyDating:'전통적 접근. 명확한 의사 표현. 모호함 싫어함', deepRelation:'충실한 파트너. 약속하면 반드시 지킴. 감정 표현은 행동으로', conflict:'규칙과 전례를 근거로. "우리 합의한 건 이거였어"', breakup:'약속 파기가 원인이면 결단. 한번 결정하면 번복 안 함', dealbreaker:'불성실, 약속 위반, 불안정', growthInLove:'Ne 발달 — 예상 밖의 변화도 성장 기회. Fi 발달 — 감정을 규칙이 아닌 느낌으로 처리' },
  ESTJ: { attract:'강한 리더십과 안정감. "이 사람이 있으면 걱정 없다"', loveLanguage:'실용적 지원, 명확한 기대치, 함께 목표 달성', earlyDating:'직접적 접근. 관심 있으면 빠르게 관계 정의', deepRelation:'체계적 파트너. 가정도 프로젝트처럼 효율적으로 운영', conflict:'직접적 대면 + 권위. "이건 이래야 해" — 타협 어려움', breakup:'비효율적이면 정리. 감정보다 현실적 판단', dealbreaker:'무질서, 게으름, 약속 불이행', growthInLove:'Fi 발달 — 효율 너머의 감정. "왜 울어?"가 아니라 "어떤 감정이야?"' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 12: 스트레스 단계 모델 — 정상 → 경미 → 루프 → 그립 → 회복 ║
// ║  근거: Naomi Quenk "Was That Really Me?" (그립/회복),             ║
// ║        MBTI 실무 커뮤니티 합의 (루프 개념), Beebe 그림자 모델     ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_STRESS_STAGES = {
  stage1_normal: {
    name: '정상 (Homeostasis)',
    desc: '주기능과 부기능이 건강하게 교대. 에너지 밸런스 유지.',
    sign: '자기답게 행동. 강점 발휘. 일상 스트레스를 정상 처리.',
    duration: '기본 상태'
  },
  stage2_mild: {
    name: '경미 스트레스 (Mild Stress)',
    desc: '주기능에 과도하게 의존. 부기능 사용이 줄어듦.',
    sign: '강점의 과잉 사용. INFP는 더 이상적이 되고, ESTJ는 더 통제적이 됨.',
    duration: '수일~수주. 환경 변화로 회복 가능.',
    intervention: '부기능 활성화 활동. INFP는 Ne(새로운 경험), ESTJ는 Si(검증된 루틴).'
  },
  stage3_loop: {
    name: '루프 (Loop)',
    desc: '주기능이 부기능을 건너뛰고 3차기능과 직결. 악순환. (주의: 학술 문헌이 아닌 MBTI 실무 커뮤니티에서 정립된 개념)',
    sign: '부기능의 균형 역할이 사라짐. 한쪽으로 극단적 치우침.',
    examples: {
      'Fi-Si (INFP)': '내면 가치 + 과거 기억만 반복. 새 가능성(Ne)이 차단되어 과거 상처에 갇힘.',
      'Ne-Te (ENFP)': '아이디어 + 즉시 실행만 반복. 가치 점검(Fi)이 빠져 의미 없는 바쁨.',
      'Ni-Ti (INFJ)': '비전 + 내부 논리만 반복. 타인 피드백(Fe)이 차단되어 독단적 확신.',
      'Te-Se (ENTJ)': '실행 + 현장 반응만 반복. 장기 비전(Ni)이 빠져 단기 성과 중독.',
      'Ti-Si (INTP)': '분석 + 과거 데이터만 반복. 새 입력(Ne)이 차단되어 같은 분석 무한 반복.',
      'Si-Ti (ISFJ)': '기억 + 내부 분석만 반복. 타인 공유(Fe)가 차단되어 원한 축적.',
      'Fe-Se (ENFJ)': '타인 반응 + 환경 자극만 반복. 비전(Ni)이 빠져 눈앞 관계에 휘둘림.',
      'Se-Fe (ESFP)': '감각 + 사회적 반응만 반복. 가치(Fi)가 빠져 자극 중독.',
      'Ni-Fi (INTJ)': '비전 + 내면 가치만 반복. 실행(Te)이 차단되어 확신만 강해지고 결과 없음.',
      'Ne-Fe (ENTP)': '아이디어 + 사회적 반응만 반복. 논리 검증(Ti)이 빠져 인기 추종.',
      'Ti-Ni (ISTP)': '내부 논리 + 직관적 확신만 반복. 현실 데이터(Se)가 차단되어 검증 없는 이론 고집.',
      'Se-Fe (ESTP)': '현장 반응 + 사회적 평가만 반복. 논리(Ti)가 빠져 분위기에 휘둘림.',
      'Fi-Ni (ISFP)': '내면 가치 + 부정적 미래 비전만 반복. 현재 경험(Se)이 차단되어 비관적 은둔.',
      'Fe-Ne (ESFJ)': '타인 반응 + 가능성 사이에서 왔다 갔다. 검증된 경험(Si)이 빠져 소진.',
      'Si-Fi (ISTJ)': '과거 기억 + 내면 가치만 반복. 객관적 기준(Te)이 빠져 주관적 고집.',
      'Te-Ne (ESTJ)': '효율 + 가능성 사이에서 산만 질주. 검증(Si)이 빠져 개혁 중독.'
    },
    duration: '수주~수개월. 의식적 개입 필요.',
    intervention: '부기능을 의식적으로 사용하는 활동. 신뢰할 수 있는 사람과 대화.'
  },
  stage4_grip: {
    name: '그립 (Grip of the Inferior)',
    desc: '열등기능이 원시적 형태로 폭발. 평소와 완전히 다른 사람.',
    sign: '주변 사람이 "이 사람 왜 이래?" 할 정도로 성격 변화.',
    examples: {
      'Te grip (INFP/ISFP)': '갑자기 공격적 효율 추구. 냉혹한 비판. "결과만 봐!" 돌변.',
      'Se grip (INFJ/INTJ)': '감각 과잉행동. 폭식, 충동구매, 과음, 과도한 운동.',
      'Si grip (ENFP/ENTP)': '과거 집착, 신체 증상 과민. "예전엔 안 이랬는데" 반복.',
      'Ne grip (ISFJ/ISTJ)': '부정적 가능성 폭발. "이것도 잘못될 수 있고, 저것도..." 끝없는 불안.',
      'Fe grip (INTP/ISTP)': '타인 평가에 극도로 민감. "아무도 나를 인정 안 해" 감정 폭발.',
      'Ti grip (ENFJ/ESFJ)': '냉소적 논리. "어차피 아무도 진심 아니야" 관계 해체.',
      'Fi grip (ENTJ/ESTJ)': '감정적 붕괴. 갑작스런 울음, 극단적 자기 연민. 본인도 당황.',
      'Ni grip (ESFP/ESTP)': '파멸적 미래 상상. "다 끝났어, 좋은 일은 없을 거야".'
    },
    duration: '수일~수주. 극심한 스트레스 제거 시 자연 회복.',
    intervention: '열등기능을 안전한 환경에서 소량 사용. 강제로 "정상"으로 돌리려 하면 악화.'
  },
  stage5_recovery: {
    name: '회복 (Recovery & Integration)',
    desc: '그립 경험 이후 열등기능에 대한 이해가 깊어짐. 성장의 기회.',
    sign: '자기 이해 심화. "아, 나한테 이런 면이 있구나" 자각.',
    growth: '그립 경험이 반복되면 열등기능이 점차 통합됨. Jung의 개성화(individuation) 과정의 일부.',
    intervention: '경험을 언어화하고 패턴을 인식. 다음 스트레스 시 조기 감지 가능.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 13: 인지기능 성숙도 레벨                                    ║
// ║  근거: 발달심리학 + MBTI 건강 수준 모델 (Jung 개성화 단계 응용)  ║
// ╚══════════════════════════════════════════════════════════════════╝

// 같은 Fi라도 성숙도에 따라 완전히 다른 표현
var MT_MATURITY = {
  Fi: {
    immature: '자기감정 = 절대진리. 비판을 공격으로 받아들임. "내 감정이 맞으니까 네가 틀려"',
    developing: '자기 가치를 인식하지만 타인 가치도 존재함을 앎. 비판에 상처받지만 수용 시도',
    mature: '확고한 내면 가치 + 타인의 다른 가치도 존중. 자기 가치를 지키면서도 유연함'
  },
  Fe: {
    immature: '모든 사람을 기쁘게 하려는 강박. 자기 욕구 완전 억압. 수동공격적 분노',
    developing: '조화를 추구하되 건강한 경계 설정 시작. 모든 갈등을 피하진 않음',
    mature: '진정한 공감 + 건강한 경계. 조화를 만들되 자기를 잃지 않음. 어려운 진실도 따뜻하게 전달'
  },
  Ne: {
    immature: '산만. 모든 가능성에 흥분하지만 하나도 완성 못함. 책임 회피를 "자유"로 포장',
    developing: '가능성을 탐색하되 선별하기 시작. 몇 개에 집중하는 훈련',
    mature: '핵심 가능성을 선별하여 깊이 탐색. 창의성과 실행력의 통합. 다른 사람의 가능성도 열어줌'
  },
  Ni: {
    immature: '독단적 확신. "내가 보는 미래가 유일한 진실". 다른 관점 거부',
    developing: '비전의 강도를 유지하되 검증의 필요성 인식. "내가 틀릴 수도 있다"',
    mature: '비전 + 겸손. 직관적 통찰을 타인과 공유하고 피드백을 수용. 비전을 현실에 접지'
  },
  Te: {
    immature: '효율 독재. 사람을 도구로 여김. "안 되면 되게 하라" 강압. 결과만 보는 냉혹함',
    developing: '효율을 추구하되 사람도 고려 시작. 과정의 가치를 인식',
    mature: '효율 + 인간성. 시스템을 만들되 사람이 시스템을 위해 존재하는 게 아님을 앎. 임파워먼트 리더십'
  },
  Ti: {
    immature: '논리 우월주의. 감정적 사람을 "비합리적"으로 경멸. 소통 거부를 "독립"으로 포장',
    developing: '논리 체계의 한계 인식 시작. 감정도 데이터임을 수용',
    mature: '정밀한 분석 + 소통 능력. 복잡한 것을 쉽게 설명. 논리와 감정 둘 다 유효한 도구로 사용'
  },
  Se: {
    immature: '충동, 자극 중독. 결과 생각 안 하고 현재 쾌락만 추구. 지루함 = 죽음',
    developing: '현재를 즐기되 미래 결과도 고려 시작. 행동 전 한 박자 멈춤',
    mature: '현재에 완전히 몰입하되 의미 있는 경험을 선별. 위기 대응력 + 감각적 지혜'
  },
  Si: {
    immature: '과거 집착. 변화 거부. "예전이 좋았어" 반복. 새로운 것 = 위험',
    developing: '과거 경험을 참고하되 새 정보도 수용 시작. "해본 적 없지만 해볼까"',
    mature: '경험의 지혜 + 개방성. 과거 데이터를 기반으로 현명하게 새 시도. 신뢰할 수 있는 혁신'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 14: 오인(Mistyping) 패턴 — 자주 혼동되는 유형 쌍          ║
// ║  근거: MBTI 임상 실무 + 인지기능 분석                             ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_MISTYPE = [
  { confused: ['INFJ','INFP'], frequency: '매우 높음',
    rootCause: 'Fe vs Fi 혼동. INFJ는 타인 감정을 미러링하여 자기 감정처럼 느끼므로 Fi로 오인.',
    keyDifference: 'INFJ: "모두를 위해 옳은 것은?" vs INFP: "나에게 진짜인 것은?"',
    testQuestion: '그룹에서 불편한 사람이 있을 때 — 그 사람의 감정을 내 몸으로 느끼면(Fe=INFJ), 내 가치관에 비추어 판단하면(Fi=INFP)' },

  { confused: ['INFJ','INTJ'], frequency: '높음',
    rootCause: '둘 다 Ni 주기능. 외부 행동이 비슷(조용, 전략적)해서 혼동.',
    keyDifference: 'INFJ: Ni-Fe (비전을 사람을 통해 실현) vs INTJ: Ni-Te (비전을 시스템으로 실현)',
    testQuestion: '프로젝트 성공의 기준 — 사람들이 성장했으면(Fe=INFJ), 목표를 달성했으면(Te=INTJ)' },

  { confused: ['INTP','INTJ'], frequency: '높음',
    rootCause: '둘 다 내향적 분석가. 겉에서 보면 비슷.',
    keyDifference: 'INTP: Ti-Ne (내부 모델 → 가능성 탐색) vs INTJ: Ni-Te (비전 → 실행). INTP는 과정 자체가 목적, INTJ는 결과가 목적.',
    testQuestion: '흥미로운 문제를 발견했을 때 — 끝없이 분석하고 싶으면(Ti=INTP), 해결하고 다음으로 가고 싶으면(Te=INTJ)' },

  { confused: ['ENFP','ENFJ'], frequency: '높음',
    rootCause: '둘 다 열정적이고 사람 중심. 겉 행동 유사.',
    keyDifference: 'ENFP: Ne-Fi (가능성 탐색 + 개인 가치) vs ENFJ: Fe-Ni (사회적 조화 + 비전). ENFP는 자기 표현, ENFJ는 타인 성장.',
    testQuestion: '파티에서 — 흥미로운 사람을 찾아다니면(Ne=ENFP), 모두가 편안한지 살피면(Fe=ENFJ)' },

  { confused: ['ISTP','INTJ'], frequency: '중간',
    rootCause: '둘 다 냉정하고 독립적. Ti와 Ni의 내향성이 유사하게 보임.',
    keyDifference: 'ISTP: Ti-Se (원리 이해 + 실전 적용) vs INTJ: Ni-Te (비전 + 체계적 실행). ISTP는 현재 문제, INTJ는 미래 설계.',
    testQuestion: '고장난 기계 앞에서 — 직접 분해하고 싶으면(Se=ISTP), 왜 고장나는지 시스템을 재설계하고 싶으면(Ni=INTJ)' },

  { confused: ['ISFJ','INFJ'], frequency: '높음',
    rootCause: '둘 다 조용하고 배려적. Fe를 공유.',
    keyDifference: 'ISFJ: Si-Fe (과거 경험 기반 돌봄) vs INFJ: Ni-Fe (미래 비전 기반 돌봄). ISFJ는 "전에 이랬으니까", INFJ는 "궁극적으로 이래야 하니까".',
    testQuestion: '친구가 힘들 때 — 지난번에 효과 있었던 방법을 권하면(Si=ISFJ), 근본 원인의 본질을 읽으려 하면(Ni=INFJ)' },

  { confused: ['ENFP','ESFP'], frequency: '중간',
    rootCause: '둘 다 활발하고 사교적.',
    keyDifference: 'ENFP: Ne-Fi (가능성+가치) vs ESFP: Se-Fi (경험+가치). ENFP는 상상 속에서, ESFP는 현실에서 살아있음.',
    testQuestion: '주말 계획 — "이런 거 해보면 어떨까?"(Ne=ENFP) vs "지금 바로 가자!"(Se=ESFP)' },

  { confused: ['ESTJ','ENTJ'], frequency: '중간',
    rootCause: '둘 다 Te 주도. 리더십 스타일 유사.',
    keyDifference: 'ESTJ: Te-Si (검증된 체계 운영) vs ENTJ: Te-Ni (새 비전 실행). ESTJ는 기존 시스템 최적화, ENTJ는 새 시스템 구축.',
    testQuestion: '조직 문제 해결 — 기존 규칙을 더 철저히(Si=ESTJ), 규칙 자체를 바꿔야(Ni=ENTJ)' }
];


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 15: Big Five 대응 — 학술적 삼각 검증                       ║
// ║  근거: McCrae & Costa (1989), Furnham (1996) 실증 연구           ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_BIG_FIVE = {
  mapping: {
    E_I: { bigFive: 'Extraversion (외향성)', correlation: 'E/I ↔ Extraversion: r=0.74 (가장 높은 상관)', note: 'MBTI E/I와 Big Five Extraversion은 거의 같은 것을 측정' },
    S_N: { bigFive: 'Openness to Experience (경험 개방성)', correlation: 'N ↔ Openness: r=0.72', note: 'N 성향이 강할수록 새로운 경험, 추상적 사고에 개방적' },
    T_F: { bigFive: 'Agreeableness (친화성)', correlation: 'F ↔ Agreeableness: r=0.44 (중간 상관)', note: 'F 성향이 강할수록 협력적이고 공감적이지만, T가 비친화적인 것은 아님' },
    J_P: { bigFive: 'Conscientiousness (성실성)', correlation: 'J ↔ Conscientiousness: r=0.49 (중간 상관)', note: 'J 성향이 강할수록 체계적이고 계획적' },
    neuroticism: { bigFive: 'Neuroticism (신경증)', correlation: 'MBTI에 직접 대응 축 없음', note: 'MBTI는 신경증을 측정하지 않음. 이것이 MBTI의 가장 큰 측정 공백이며, 별도의 보완 도구가 필요한 지점' }
  },
  limitations: {
    mbtiLimit: 'MBTI는 성격의 "선호(preference)"를 측정. 능력이나 건강도가 아님. Big Five는 "정도(degree)"를 측정.',
    complementary: 'MBTI의 유형론(4글자)과 Big Five의 특성론(연속 스펙트럼)은 경쟁이 아니라 보완 관계.',
    neuroticism_gap: 'Big Five의 Neuroticism은 MBTI에 없음 — 스트레스 취약성, 정서 안정성은 MBTI만으로 예측 불가. 이 영역은 별도의 심리측정 도구(NEO-PI-R 등)로 보완이 필요하다.'
  },
  academicStatus: {
    mbti: '대중적으로 가장 널리 사용. 학술적으로는 "유용하지만 과학적 엄밀성 부족" 평가.',
    bigFive: '학술적 표준. 심리학 연구의 기본 프레임워크.',
    jungOriginal: 'Jung의 원본 유형론은 MBTI보다 훨씬 깊고 복잡. MBTI는 Jung의 간소화 버전.',
    position: 'MBTI의 가치는 "자기 이해의 출발점"으로서의 접근성. Big Five는 "측정의 정밀성". Jung은 "이론의 깊이". 세 가지는 서로 다른 목적.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 16: 상호작용 스타일 — Linda Berens 모델                     ║
// ║  근거: Berens (2001) "Understanding Yourself and Others"          ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_INTERACTION_STYLES = {
  'behind-the-scenes': {
    name: '무대 뒤 조율자 (Behind the Scenes)',
    coreGoal: '최선의 결과를 위해 과정을 조율',
    energy: '내부에서 작업하고, 필요할 때만 나섬',
    communication: '질문과 경청 중심. 직접 지시보다 제안과 합의',
    strength: '통합적 사고, 인내심, 깊이 있는 분석',
    stress: '의견을 묻지 않고 일방적으로 결정될 때',
    types: ['INFP','ISFP','INTP','ISTP','INFJ','ISFJ'],
    inRelationship: '파트너의 필요를 뒤에서 채워줌. 자기 욕구 표현이 약점.'
  },
  'chart-the-course': {
    name: '항로 설계자 (Chart the Course)',
    coreGoal: '예측 가능한 방향으로 목표 달성',
    energy: '계획을 세우고 그대로 실행. 변수 최소화',
    communication: '신중하고 구조적. "먼저 이거, 다음 이거" 식 단계적 전달',
    strength: '장기 계획, 체계적 접근, 예측 능력',
    stress: '계획이 갑자기 뒤바뀌거나 방향 없이 진행될 때',
    types: ['INTJ','ISTJ'],
    inRelationship: '관계에도 방향과 단계가 필요. "우리 어디로 가는 거야?"'
  },
  'get-things-going': {
    name: '분위기 메이커 (Get Things Going)',
    coreGoal: '사람들을 참여시키고 에너지를 만듦',
    energy: '열정으로 주변을 끌어들이고, 함께 움직이게 만듦',
    communication: '열정적이고 포용적. "같이 해보자!" 식 초대형 소통',
    strength: '동기부여, 네트워킹, 창의적 참여 유도',
    stress: '아무도 호응하지 않거나, 열정이 무시될 때',
    types: ['ENFP','ESFP','ENTP','ESFJ'],
    inRelationship: '관계에 새로움과 재미를 불어넣음. 꾸준한 유지가 약점.'
  },
  'in-charge': {
    name: '현장 지휘관 (In Charge)',
    coreGoal: '목표를 정하고 즉각 실행하여 결과를 냄',
    energy: '결단하고 밀어붙이는 추진력. 기다림이 고통',
    communication: '직접적이고 명확. "이거 해, 언제까지" 식 지시형',
    strength: '결단력, 위기 대응, 빠른 실행',
    stress: '통제권을 잃거나 비효율이 방치될 때',
    types: ['ENTJ','ESTJ','ENFJ','ESTP'],
    inRelationship: '주도적으로 관계를 이끔. 파트너 자율성 존중이 약점.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 17: 그림자 기능 유형별 발현                                  ║
// ║  근거: Beebe 8기능 원형 모델 + 임상 관찰                          ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_SHADOW_BY_TYPE = {
  INFP: {
    opposing_Fe: '타인 감정을 읽되 방어적으로 사용. "나도 배려할 수 있어, 안 하는 거야." 사회적 조화를 거부하는 형태.',
    critical_Ni: '타인의 비전이나 확신을 냉소적으로 비판. "그게 진짜 될 거라고?" 식 비관적 예언.',
    trickster_Se: '현재 상황의 감각 정보를 왜곡. 위험 신호를 못 읽거나 과잉 반응. 신체적 부주의.',
    demon_Ti: '극한 시 냉혹한 논리로 관계를 해체. "논리적으로 이 관계는 비효율적이야." 본인도 충격.'
  },
  ENFP: {
    opposing_Ni: '자기 가능성(Ne)이 위협받으면 비관적 확신으로 방어. "어차피 다 이렇게 될 거야."',
    critical_Fe: '타인의 조화 시도를 위선으로 비판. "다 좋은 척하는 거잖아."',
    trickster_Ti: '논리를 엉뚱하게 적용. 본인은 논리적이라 생각하지만 남들 눈엔 궤변.',
    demon_Se: '극한 시 감각 과잉행동. 무모한 행동, 자기 파괴적 충동.'
  },
  INFJ: {
    opposing_Ne: '자기 비전(Ni)이 위협받으면 부정적 가능성 확산으로 방어. "이것도 잘못될 수 있고 저것도..."',
    critical_Fi: '타인의 개인 가치를 판단. "그런 가치관이 진짜 가치야?" 식 도덕적 심판.',
    trickster_Te: '효율과 체계를 어설프게 시도. 조직하려 하지만 엉뚱한 방향. 과도한 통제 시도.',
    demon_Si: '극한 시 과거 트라우마가 생생하게 환기. 기억에 압도당해 현재를 잃음.'
  },
  ENFJ: {
    opposing_Fi: '자기 조화(Fe)가 위협받으면 "내 가치는 이거야!" 식으로 방어적 개인주의 돌출.',
    critical_Ne: '타인의 아이디어를 비현실적이라 비판. "가능성만 얘기하지 말고 현실을 봐."',
    trickster_Si: '과거 경험을 왜곡하여 기억. "내가 그때 그렇게 했을 리가 없어." 식 기억 편집.',
    demon_Te: '극한 시 냉혹한 효율로 사람을 도구화. 평소 따뜻함이 완전 소멸.'
  },
  INTP: {
    opposing_Te: '자기 논리(Ti)가 위협받으면 외부 권위나 데이터를 방어적으로 동원. "이 논문에 이렇게 나와 있어!"',
    critical_Ni: '타인의 직관적 확신을 논리적 근거 없다고 비판. "느낌이 아니라 증거를 보여줘."',
    trickster_Se: '현재 환경의 감각 정보를 놓침. 물리적 위험 인지 부족. 현장 대응 서툼.',
    demon_Fi: '극한 시 억눌린 가치 판단이 폭발. "아무도 나를 진짜로 이해 안 해." 식 감정적 고립.'
  },
  ENTP: {
    opposing_Ni: '가능성 탐색(Ne)이 위협받으면 비관적 미래 확신으로 방어. "이건 반드시 실패할 거야."',
    critical_Te: '타인의 체계나 효율을 과도하게 비판. "그 시스템은 근본적으로 틀렸어."',
    trickster_Fi: '개인 가치를 어설프게 적용. 본인은 진정성 있다고 생각하지만 일관성 없음.',
    demon_Se: '극한 시 감각적 과잉행동. 무모한 도전, 신체적 자기 파괴.'
  },
  INTJ: {
    opposing_Ne: '비전(Ni)이 위협받으면 부정적 가능성을 확산시켜 방어. "이 계획엔 100가지 문제가 있어."',
    critical_Ti: '타인의 논리를 내부 프레임으로 냉혹하게 해체. "네 추론의 3번째 전제가 틀렸어."',
    trickster_Fe: '사회적 조화를 어설프게 시도. 배려하려 하지만 타이밍과 방식이 어색.',
    demon_Si: '극한 시 과거 실패 기억에 압도. "나는 늘 이렇게 실패해왔어." 식 자기 파괴.'
  },
  ENTJ: {
    opposing_Ti: '실행력(Te)이 위협받으면 내부 논리로 방어적 분석. "내가 왜 맞는지 설명해줄까?"',
    critical_Ne: '타인의 아이디어를 비현실적이라 냉소. "아이디어는 많은데 실행은?"',
    trickster_Si: '과거 데이터를 선택적으로 왜곡. 자기 유리한 전례만 기억.',
    demon_Fe: '극한 시 억눌린 관계 욕구 폭발. 갑자기 "아무도 날 진심으로 대하지 않아" 식 감정적 붕괴.'
  },
  ISFP: {
    opposing_Fe: '가치(Fi) 위협 시 사회적 조화를 무기로 사용. "다른 사람들은 다 내 편이야."',
    critical_Si: '타인의 과거 경험이나 전통을 비판. "그건 옛날 방식이야." 검증된 것을 거부하는 형태.',
    trickster_Ne: '가능성 탐색이 엉뚱한 방향. 불안이 확산되어 최악의 시나리오 난무.',
    demon_Ti: '극한 시 냉혹한 논리로 자기 가치 체계마저 해체. 완전한 허무.'
  },
  ESFP: {
    opposing_Si: '현재(Se) 위협 시 과거를 방어적으로 끌어옴. "예전엔 이러지 않았어."',
    critical_Fe: '타인의 조화 시도를 가식으로 비판. 사회적 기대를 공격적으로 거부.',
    trickster_Ti: '논리를 어설프게 적용. 궤변인데 본인은 논리적이라고 확신.',
    demon_Ne: '극한 시 부정적 가능성 폭발. "모든 것이 끝났고 어떤 가능성도 없다" 식 확산적 절망.'
  },
  ISTP: {
    opposing_Te: '내부 논리(Ti) 위협 시 외부 체계를 방어적으로 동원. "규칙에 이렇게 되어 있잖아."',
    critical_Si: '타인의 과거 경험 의존을 비판. "맨날 했던 대로만 하니까 안 되는 거야." 전례 거부.',
    trickster_Ne: '가능성 탐색이 부정적 방향. "이것도 잘못될 수 있고 저것도..." 식 불안.',
    demon_Fi: '극한 시 억눌린 가치 판단 폭발. "나한테 중요한 건 아무도 모르잖아."'
  },
  ESTP: {
    opposing_Si: '현장(Se) 위협 시 과거 경험을 방어적으로 동원. "내가 해봐서 아는데."',
    critical_Te: '타인의 체계를 비효율적이라 공격. "그 방법은 현장에서 안 먹혀."',
    trickster_Fi: '개인 가치를 어설프게 내세움. 진정성 있어 보이지만 일관성 부족.',
    demon_Ne: '극한 시 부정적 가능성 폭발. "뭘 해도 다 잘못될 거야" 식 확산적 절망.'
  },
  ISFJ: {
    opposing_Se: '경험(Si) 위협 시 현재 환경을 방어적으로 통제. "지금 당장 이걸 바꿔야 해!"',
    critical_Fi: '타인의 개인 가치를 이기적이라 비판. "자기만 생각하는 거 아니야?"',
    trickster_Te: '효율을 어설프게 시도. 체계 만들려 하지만 감정이 섞여 비효율적.',
    demon_Ni: '극한 시 파멸적 미래 비전. "이 상황은 절대 나아지지 않을 거야" 식 수렴적 절망.'
  },
  ESFJ: {
    opposing_Fi: '조화(Fe) 위협 시 방어적 개인주의. "내가 이만큼 해줬는데 이런 대접이야?"',
    critical_Se: '타인의 현재 행동을 날카롭게 비판. "지금 그게 중요해?" 식 감각 판단.',
    trickster_Ni: '미래 예측이 엉뚱한 방향. 비관적 직관이 확대 해석으로 이어짐.',
    demon_Te: '극한 시 냉혹한 효율로 관계를 정리. 평소 따뜻함이 완전히 사라짐.'
  },
  ISTJ: {
    opposing_Se: '과거 경험(Si) 위협 시 현재를 방어적으로 통제. 환경 변화에 과민 반응.',
    critical_Ti: '타인의 내부 논리를 냉혹하게 해체. "네 추론 과정 자체가 틀렸어." 식 논리적 심판.',
    trickster_Fe: '사회적 조화 시도가 어색. 배려하려 하지만 딱딱하고 형식적.',
    demon_Ni: '극한 시 파멸적 미래 확신. "이건 반드시 나빠질 거야" 식 수렴적 절망.'
  },
  ESTJ: {
    opposing_Ti: '효율(Te) 위협 시 내부 논리로 방어. "내가 왜 맞는지 논리적으로 증명하지."',
    critical_Se: '타인의 현장 행동을 세밀하게 비판. "지금 그 행동이 적절해?"',
    trickster_Ni: '미래 예측이 빗나감. 비관적 직관에 사로잡혀 과잉 대비.',
    demon_Fe: '극한 시 억눌린 관계 욕구. "아무도 내 노력을 알아주지 않아." 식 감정적 붕괴.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 18: 유형별 의사결정 프로세스                                 ║
// ║  근거: 인지기능 스택 순서 기반 의사결정 흐름                       ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_DECISION_PROCESS = {
  INFP: { flow:'①이게 내 가치에 맞나?(Fi) → ②다른 가능성은?(Ne) → ③과거에 비슷한 경험?(Si) → ④효율적인 방법은?(Te, 마지못해)', blind:'효율 분석을 가장 늦게 고려. 감정적으로 결정한 뒤 논리적 근거를 사후 구성하는 경향.' },
  ENFP: { flow:'①어떤 가능성이 있지?(Ne) → ②이 중 내 가치에 맞는 건?(Fi) → ③효과적인 실행법은?(Te) → ④과거 데이터 확인(Si, 마지못해)', blind:'검증된 데이터 확인을 가장 나중에. 가능성에 매혹되어 현실 체크 부족.' },
  INFJ: { flow:'①이것의 본질과 미래 방향은?(Ni) → ②관계에 미치는 영향은?(Fe) → ③논리적으로 맞나?(Ti) → ④현재 상황의 구체적 사실은?(Se, 마지못해)', blind:'현재 순간의 구체적 사실 확인을 가장 늦게. 직관에 과도하게 의존.' },
  ENFJ: { flow:'①모두에게 어떤 영향?(Fe) → ②장기적 방향은?(Ni) → ③현장 상황은?(Se) → ④논리적으로 타당한가?(Ti, 마지못해)', blind:'냉정한 논리 분석이 가장 약함. 관계를 위해 비합리적 결정을 내릴 수 있음.' },
  INTP: { flow:'①논리적으로 맞나?(Ti) → ②다른 가능성은?(Ne) → ③과거 사례는?(Si) → ④타인의 감정에 미치는 영향?(Fe, 마지못해)', blind:'타인 감정 고려가 가장 마지막. 논리적으로 완벽한데 인간관계에서 폭탄.' },
  ENTP: { flow:'①어떤 가능성이?(Ne) → ②논리적으로 맞나?(Ti) → ③관계에 미치는 영향은?(Fe) → ④과거 검증 데이터는?(Si, 마지못해)', blind:'과거 실패 교훈을 무시. "이번엔 다르다"는 착각에 취약.' },
  INTJ: { flow:'①궁극적 방향은?(Ni) → ②가장 효율적 방법은?(Te) → ③내 가치에 맞나?(Fi) → ④지금 현실적으로 가능한가?(Se, 마지못해)', blind:'현재 현실의 제약 조건을 과소평가. 머릿속 계획이 완벽해서 현장 변수를 무시.' },
  ENTJ: { flow:'①가장 효율적인 방법은?(Te) → ②궁극적 방향은?(Ni) → ③현장 상황은?(Se) → ④내 진짜 감정은?(Fi, 마지못해)', blind:'자기 감정 인식이 가장 늦음. 결정을 내리고 한참 뒤에야 "나 불편했구나" 자각.' },
  ISFP: { flow:'①이게 나에게 진짜인가?(Fi) → ②지금 여기서 느끼는 건?(Se) → ③장기적으로 어떻게 될까?(Ni) → ④효율적인가?(Te, 마지못해)', blind:'체계적 실행 계획이 가장 약함. 감각과 가치로 결정하되 실행은 즉흥적.' },
  ESFP: { flow:'①지금 뭐가 일어나고 있지?(Se) → ②이게 나에게 의미 있나?(Fi) → ③효율적인 방법은?(Te) → ④장기적으로 어떻게 될까?(Ni, 마지못해)', blind:'장기적 결과 예측이 가장 약함. 현재 기분으로 결정해서 미래에 후회.' },
  ISTP: { flow:'①원리가 뭔지?(Ti) → ②현장에서 검증 가능한가?(Se) → ③장기적 의미는?(Ni) → ④타인 감정에 미치는 영향?(Fe, 마지못해)', blind:'타인 감정 고려가 가장 약함. 기술적으로 옳은데 사람이 떠나가는 상황.' },
  ESTP: { flow:'①지금 상황이 어떤지?(Se) → ②원리는 뭔지?(Ti) → ③관계에 어떤 영향?(Fe) → ④장기적으로 어떻게 될까?(Ni, 마지못해)', blind:'장기적 결과 예측을 무시. "지금 해결되면 됐지" 식 단기 사고.' },
  ISFJ: { flow:'①과거에 어떻게 했지?(Si) → ②주변 사람들은 어떻게 느끼나?(Fe) → ③논리적으로 맞나?(Ti) → ④새로운 가능성은?(Ne, 마지못해)', blind:'새로운 방법 시도를 가장 꺼림. 검증된 것만 고수하다가 변화에 뒤처짐.' },
  ESFJ: { flow:'①주변 사람들 반응은?(Fe) → ②과거에 효과 있었던 방법은?(Si) → ③새 가능성은?(Ne) → ④냉정한 논리 분석(Ti, 마지못해)', blind:'냉정한 논리 분석이 가장 약함. 모두가 좋아하는 선택이 합리적인 선택은 아닐 수 있음.' },
  ISTJ: { flow:'①과거 데이터와 전례는?(Si) → ②가장 효율적 실행법은?(Te) → ③내 가치에 맞나?(Fi) → ④새로운 가능성은?(Ne, 마지못해)', blind:'새 가능성 탐색을 가장 꺼림. 전례 없는 상황에서 판단 마비.' },
  ESTJ: { flow:'①가장 효율적인 방법은?(Te) → ②검증된 전례가 있나?(Si) → ③새 방법도 고려할까?(Ne) → ④내 진짜 감정은?(Fi, 마지못해)', blind:'자기 감정 인식이 가장 약함. 효율적으로 옳은 결정이 감정적으로 문제될 수 있음.' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 19: 유형별 돈/소비 패턴                                     ║
// ║  근거: 인지기능 기반 소비 심리 분석                                ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_MONEY = {
  INFP: { style:'의미 소비형', pattern:'가치 있는 것에는 과감하고 나머지는 극도로 절약. 예술·책·경험에 기꺼이 투자. 가격보다 의미.', trap:'감정적 충동구매 후 자책 루프. "나에게 보상해야지" → 구매 → 죄책감.', tip:'구매 전 24시간 대기 규칙. Fi의 즉각적 가치 판단을 Ne로 한 박자 늦추기.' },
  ENFP: { style:'가능성 소비형', pattern:'"이거 사면 인생 바뀔 것 같아" 식 충동구매. 다양한 취미용품이 방에 쌓임.', trap:'새로운 것에 대한 무한 투자 → 미완성 프로젝트 = 돈 낭비.', tip:'월 "탐색 예산"을 정해놓고, 그 안에서만 새 가능성에 투자.' },
  INFJ: { style:'선별적 투자형', pattern:'비전에 부합하면 과감하게 지출. 자기 성장·교육에 아끼지 않음. 일상적 소비는 미니멀.', trap:'타인을 위한 과도한 지출. "이 사람에게 이게 필요하니까" 식 대리 소비.', tip:'자기를 위한 지출 비율을 의식적으로 설정.' },
  ENFJ: { style:'관계 투자형', pattern:'사람을 위한 소비에 관대. 선물, 모임, 경험 공유에 지출. 타인의 기쁨이 지출의 이유.', trap:'모든 모임에 다 내는 습관. 감사받지 못하면 서운함 축적.', tip:'받는 것도 사랑 표현임을 인식. 감사 표현을 명시적으로 요청하는 연습.' },
  INTP: { style:'효율 분석형', pattern:'구매 전 스펙 비교·리뷰 분석에 시간 투자. 가성비에 민감. 불필요한 사교비 절약.', trap:'분석 마비 — 너무 오래 비교하다 타이밍을 놓치거나 결국 안 삼.', tip:'80% 정보에서 결정하는 규칙. 완벽한 분석은 불가능.' },
  ENTP: { style:'실험 투자형', pattern:'새로운 아이디어에 베팅하듯 소비. 스타트업·도구·강좌에 투자. 일상적 것에는 무관심.', trap:'100개 시도에 투자하고 하나도 완수 못하는 패턴.', tip:'한 번에 3개까지만 활성 프로젝트. 나머지는 "가능성 대기열"에 보관.' },
  INTJ: { style:'전략 투자형', pattern:'장기 ROI를 계산하고 투자. 자산·교육·도구에 전략적 지출. 충동구매 거의 없음.', trap:'과도한 절약 — 현재 삶의 질을 희생하며 미래에만 투자.', tip:'현재 경험(Se)에 의식적으로 예산 배정. "지금도 살고 있다"는 사실 인식.' },
  ENTJ: { style:'목표 달성형', pattern:'목표에 기여하면 과감 지출. 효율적 도구·인맥·시간 절약에 투자. 비효율적 소비에 짜증.', trap:'성공의 상징적 소비 — 지위를 위한 과시적 지출 가능성.', tip:'소비 동기를 점검. "이게 목표에 기여하나, 자존심에 기여하나?"' },
  ISFP: { style:'감각 경험형', pattern:'감각적 아름다움에 투자. 옷·음식·인테리어·사진에 기꺼이 지출. 브랜드보다 미감.', trap:'감각적 충동에 무방비. 예쁜 것을 보면 사야 하는 충동.', tip:'위시리스트에 일주일 보관 후 재판단. 시간이 Fi 필터 역할.' },
  ESFP: { style:'현재 즐거움형', pattern:'지금 즐거우면 OK. 맛집·여행·파티에 관대. 저축 개념이 약할 수 있음.', trap:'내일의 나에게서 빌려 쓰는 패턴. 카드값 폭탄.', tip:'자동이체 저축을 먼저 빼고, 나머지로 즐기기. "모르는 사이에 저축".' },
  ISTP: { style:'실용 도구형', pattern:'필요한 도구·기술에 정확하게 투자. 불필요한 것에 돈 안 씀. 미니멀리스트 경향.', trap:'도구 업그레이드 집착 — 이미 충분한데 "더 나은 버전"에 반복 지출.', tip:'현재 도구로 할 수 있는 것에 집중. 업그레이드 충동 시 기존 장비의 한계를 먼저 기록.' },
  ESTP: { style:'실전 투자형', pattern:'경험·행동에 투자. 스포츠·여행·새 도전에 관대. 계획 없이 현금 흐름으로 생활.', trap:'큰 판에 과도한 베팅. 리스크 관리 부족.', tip:'월 고정비를 자동화하고, 나머지를 "행동 예산"으로 운용.' },
  ISFJ: { style:'안전 저축형', pattern:'꾸준히 저축. 가족·사랑하는 사람을 위해서는 기꺼이 지출. 본인을 위한 지출은 최소.', trap:'자기 보상 부족 — 다 아끼다가 한 번에 폭발적 소비 후 자책.', tip:'매달 "나만을 위한 예산"을 고정. 죄책감 없이 쓰는 연습.' },
  ESFJ: { style:'관계 유지형', pattern:'기념일·선물·모임에 계획적으로 지출. 타인의 기대에 맞추는 소비. 쿠폰·할인에 능숙.', trap:'사회적 체면을 위한 과도한 지출. "남들도 다 이 정도는 하니까."', tip:'"내가 진짜 원하는 것"과 "남에게 보이고 싶은 것" 구분 연습.' },
  ISTJ: { style:'계획 관리형', pattern:'가계부·예산·장기 계획. 규칙적 저축. 충동구매 거의 없음. 가성비 꼼꼼히 비교.', trap:'과도한 절약으로 삶의 질 저하. "아깝다"가 모든 판단 기준.', tip:'분기별 "경험 예산" 설정. 새로운 시도에도 투자하는 유연성 연습.' },
  ESTJ: { style:'효율 관리형', pattern:'가정 재정을 시스템으로 운영. 투자·보험·절세 체계적 관리. 결과 측정 가능한 곳에 지출.', trap:'돈으로 통제하는 패턴. 가족 소비를 지나치게 관리하여 관계 갈등.', tip:'가족 구성원에게도 자율 예산 부여. 통제와 관리의 경계 인식.' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 20: 유형별 SNS/소통 행동 패턴                               ║
// ║  근거: 인지기능 기반 디지털 행동 분석                              ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_SOCIAL_MEDIA = {
  INFP: { posting:'감성 글·시·사진. 자기 감정을 예술적으로 표현. 공유보다 저장 위주.', consuming:'깊이 있는 콘텐츠 탐색. 시간 가는 줄 모르고 의미 있는 글 서핑.', interaction:'좋아요는 하되 댓글은 고민 후 작성. 공개 갈등 극도로 회피.', darkside:'비교 함정 — 타인의 하이라이트와 자기 일상을 비교하여 자존감 하락.', detox:'부캐/비공개 계정으로 진짜 감정 분리. 알고리즘에서 벗어나 자기만의 영역 보호.' },
  ENFP: { posting:'일상의 재미있는 순간, 아이디어 공유, 다양한 관심사 릴스. 톤이 자주 바뀜.', consuming:'트렌드 탐색, 새로운 사람·아이디어 발견에 열광. 탭 30개 열어놓고 서핑.', interaction:'적극적 댓글, 공유, 태그. 온라인 관계 형성에 능숙.', darkside:'산만 소비 — 4시간 스크롤 후 "나 뭐 했지?" 공허감.', detox:'앱 타이머 설정. "탐색 시간"과 "창작 시간" 분리.' },
  INFJ: { posting:'드물지만 올리면 깊고 의미 있는 글. 사회 이슈·통찰·영감 공유.', consuming:'선별적 소비. 깊이 없는 콘텐츠는 빠르게 스킵. 양보다 질.', interaction:'DM으로 깊은 대화 선호. 공개 댓글보다 개인 메시지.', darkside:'"도어 슬램"의 디지털 버전 — 자극 과부하 시 모든 SNS를 갑자기 삭제.', detox:'SNS 정리 주기를 정해놓고, 팔로우 리스트를 의식적으로 큐레이션.' },
  ENFJ: { posting:'타인 응원·축하 게시물. 그룹 활동 기록. 긍정적 분위기 조성 콘텐츠.', consuming:'주변 사람들의 게시물 모니터링. "얘가 요즘 힘들어 보이네" 감지.', interaction:'가장 먼저 좋아요·댓글. 타인 게시물에 대한 반응이 빠르고 따뜻함.', darkside:'온라인 페르소나 관리 피로. 항상 긍정적이어야 한다는 압박.', detox:'오프라인 관계에 집중하는 날을 정기적으로 설정.' },
  INTP: { posting:'거의 안 올림. 올리면 분석적 글, 밈, 기술적 발견 공유.', consuming:'깊은 레딧 쓰레드, 논문, 기술 블로그. 래빗홀에 빠지기 쉬움.', interaction:'논쟁적 댓글에 참여하기도 하지만 감정적 반응엔 불편함.', darkside:'정보 과부하 — 아는 것만 늘고 실행은 제로.', detox:'소비:창작 비율을 의식적으로 관리. 읽은 것을 정리하는 시간 확보.' },
  ENTP: { posting:'도발적 질문, 토론 유발 글, 유머+지식 조합 콘텐츠.', consuming:'논쟁·토론 쓰레드, 반론 찾기, 새로운 관점 탐색.', interaction:'토론 참여 적극적. 논쟁을 즐김. 상대가 지쳐도 계속.', darkside:'트롤링 경계 — 재미로 시작한 논쟁이 실제 관계를 손상.', detox:'온라인 토론 에너지를 오프라인 프로젝트로 전환.' },
  INTJ: { posting:'거의 안 올림. 올리면 체계적 분석, 장문의 견해, 완성도 높은 콘텐츠.', consuming:'선별적·목적 지향적 소비. "이 정보가 내 프로젝트에 필요한가?" 필터.', interaction:'최소한. 필요한 정보 교환 위주. 사교적 댓글 거의 안 함.', darkside:'타인의 비효율적 게시물에 대한 내적 짜증. 은근히 판단적.', detox:'이미 최소한으로 사용하지만, 비교 함정에는 취약할 수 있음.' },
  ENTJ: { posting:'성취·결과 공유. 프로젝트 진행 상황, 리더십 관련 통찰. 개인 감정 거의 안 올림.', consuming:'업계 뉴스, 경쟁사 동향, 생산성 콘텐츠.', interaction:'전략적 네트워킹. 댓글도 목적 지향적. "이 사람을 알아두면 유용하겠다."', darkside:'SNS를 자기 브랜딩 도구로만 사용. 진정성 의심받을 수 있음.', detox:'순수하게 즐기는 콘텐츠 소비 시간 확보. 모든 것이 전략일 필요는 없음.' },
  ISFP: { style:'감각적 갤러리형', posting:'아름다운 사진·영상 위주. 텍스트는 최소. 미감이 일관적.', consuming:'비주얼 중심 탐색. 인스타·핀터레스트에서 영감 수집.', interaction:'조용히 좋아요. 댓글보다 저장·스크랩 위주.', darkside:'이상적 이미지와 현실 자기의 괴리에서 오는 자존감 하락.' },
  ESFP: { posting:'실시간 일상 공유. 스토리 적극 활용. 재미있고 에너지 넘치는 톤.', consuming:'트렌드에 빠르게 반응. 핫한 것을 가장 먼저 시도.', interaction:'적극적 소통. 댓글·리액션·라이브에 자연스러움.', darkside:'좋아요 수에 기분이 좌우됨. 외부 인정 의존.', detox:'오프라인 경험에 더 집중하기. 공유 안 해도 경험은 유효함을 인식.' },
  ISTP: { posting:'거의 안 올림. 올리면 결과물(작품·수리·완성품) 위주. 설명 최소.', consuming:'실용적 정보 탐색. 튜토리얼·리뷰·스펙 비교.', interaction:'거의 없음. 필요한 질문만.', darkside:'소셜 미디어 자체에 대한 경멸이 관계 단절로 이어질 수 있음.', detox:'이미 최소 사용. 다만 가까운 사람과의 연결 유지 채널은 확보 필요.' },
  ESTP: { posting:'행동 중심 콘텐츠. 운동·모험·현장 영상. 에너지 넘치는 톤.', consuming:'액션·스포츠·실전 콘텐츠. 이론적 긴 글은 스킵.', interaction:'직접적이고 재미있는 댓글. 오프라인 만남으로 빠르게 전환.', darkside:'과시적 행동 공유가 허세로 비칠 수 있음.', detox:'기록하지 않는 경험의 가치를 인식하기.' },
  ISFJ: { posting:'가족·일상·감사 콘텐츠. 따뜻하고 안정적인 톤. 빈도는 보통.', consuming:'지인 근황 확인, 실용적 정보(요리·육아·건강) 수집.', interaction:'축하·응원 댓글에 성실. 갈등에는 참여하지 않음.', darkside:'타인의 화려한 삶과 자기 일상을 비교. "나만 평범한 건가."', detox:'"비교하지 않는 날"을 의식적으로 설정. 감사 일기와 병행.' },
  ESFJ: { posting:'기념일·모임·관계 중심 콘텐츠. 태그·멘션 활발. 소속감 표현.', consuming:'지인 네트워크 관리. 누가 뭘 했는지 가장 잘 파악.', interaction:'가장 활발. 모든 지인 게시물에 반응. 생일 챙기기 최강.', darkside:'SNS 관계 관리가 의무가 되어 소진. "다 챙겨야 해."', detox:'모든 관계를 온라인에서 유지할 필요 없음을 인식. 핵심 관계에 집중.' },
  ISTJ: { posting:'매우 드묾. 올리면 기록 목적(여행·성취). 감정 노출 최소.', consuming:'뉴스·정보·실용적 콘텐츠 위주. 체계적 정보 수집.', interaction:'최소한. 불필요한 사교적 반응 안 함.', darkside:'SNS를 시간낭비로 여기면서도 은근히 확인하는 이중성.', detox:'정해진 시간에만 확인하는 습관. 이미 잘 하고 있을 가능성 높음.' },
  ESTJ: { posting:'성취·결과 중심. 체계적이고 정보 가치 있는 콘텐츠. 감정 노출 최소.', consuming:'업무 관련 정보, 뉴스, 실용적 콘텐츠.', interaction:'명확하고 직접적인 댓글. 모호한 소통 안 함.', darkside:'타인의 비효율적 게시물에 대한 판단. "이걸 왜 올리지?"', detox:'판단을 내려놓는 연습. 모든 것이 효율적일 필요는 없음.' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 21: 유형별 자기돌봄(Self-care) 패턴                         ║
// ║  근거: 인지기능 기반 에너지 회복 분석                              ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_SELFCARE = {
  INFP: { recharge:'혼자만의 글쓰기, 자연 속 산책, 의미 있는 예술 감상, 내면 대화', warning:'자기돌봄이 고립으로 변할 수 있음. 완전히 혼자만 있는 시간이 3일 넘으면 루프 위험.', tip:'Ne를 활용 — 새로운 카페, 처음 가는 길, 낯선 음악으로 가벼운 자극 추가.' },
  ENFP: { recharge:'새로운 경험, 영감 주는 사람과의 대화, 창작 활동, 즉흥 여행', warning:'자극 추구가 회피 기제일 수 있음. "재밌는 것만 하고 싶다" = 불편한 감정 회피 신호.', tip:'Fi 심화 — 하루 10분 감정 일기. "오늘 진짜 느낀 것"을 기록.' },
  INFJ: { recharge:'완전한 고독 + 깊이 있는 독서 + 일기 + 의미 있는 1:1 대화', warning:'고독이 은둔으로 변하면 Ni-Ti 루프 진입. "아무도 나를 이해 못해" 신호.', tip:'Fe 활성화 — 신뢰하는 1명에게 감정을 나누기. 완벽하게 정리될 때까지 기다리지 말 것.' },
  ENFJ: { recharge:'사랑하는 사람들과 깊은 대화, 타인 성장을 돕는 활동, 비전 공유', warning:'타인 돌봄이 자기 회피일 수 있음. "남을 도우면서 에너지를 얻는다"가 항상 건강한 건 아님.', tip:'Ni 심화 — "나는 진짜 뭘 원하지?"를 타인 없이 혼자 묻는 시간.' },
  INTP: { recharge:'지적 탐구, 복잡한 문제 풀기, 새로운 프레임워크 학습, 혼자만의 분석 시간', warning:'분석이 반추(rumination)로 변할 수 있음. 같은 문제를 계속 돌리면 마비 상태.', tip:'Ne 활성화 — 전혀 다른 분야의 콘텐츠 탐색. "이거 내 분야랑 연결되네" 순간이 회복.' },
  ENTP: { recharge:'지적 토론, 새로운 아이디어 실험, 다양한 분야 탐색, 자극적 환경', warning:'자극 중독이 될 수 있음. 고요함을 견디지 못하면 Si 그립 접근 신호.', tip:'Ti 심화 — 하나의 아이디어를 깊이 파고드는 시간. 넓이 대신 깊이.' },
  INTJ: { recharge:'장기 프로젝트 진행, 전략적 계획 수립, 독립적 학습, 질 높은 콘텐츠 소비', warning:'프로젝트에 과몰입하여 수면·식사 무시. 신체를 도구로 취급하는 패턴.', tip:'Se 의식적 활성화 — 요리, 산책, 운동 등 감각적 현재 경험.' },
  ENTJ: { recharge:'목표 달성, 효율적 시스템 구축, 경쟁적 활동, 성과 확인', warning:'쉬는 것 자체를 비효율로 여김. "쉬면 뒤처진다" 강박.', tip:'Fi 의식적 활성화 — "나는 왜 이걸 하지?" "이게 나에게 어떤 의미지?"' },
  ISFP: { recharge:'감각적 경험 — 요리, 미술, 음악, 자연, 물리적 친밀감', warning:'혼자 예술에 몰두하는 것이 고립의 위장일 수 있음.', tip:'Se를 타인과 함께 — 친구와 같이 요리하기, 함께 산책하기.' },
  ESFP: { recharge:'친구와 어울리기, 새로운 경험, 신체 활동, 감각적 즐거움', warning:'멈추지 못하는 것 자체가 스트레스 신호. "쉬면 불안해" = 그립 접근.', tip:'Fi 심화 — 혼자 조용히 "오늘 뭐가 의미 있었지?" 묻기.' },
  ISTP: { recharge:'문제 해결, 도구 다루기, 기술적 작업, 자유로운 시간 확보', warning:'사람과의 단절이 장기화되면 Fe 결핍으로 외로움이 쌓임.', tip:'Fe를 낮은 강도로 — 편한 사람 한 명과 함께 작업하기.' },
  ESTP: { recharge:'신체 활동, 모험, 경쟁, 새로운 도전, 현장 경험', warning:'행동이 멈추면 불안해하는 패턴. 고요함을 견디는 연습 필요.', tip:'Ti 심화 — 행동하기 전 "왜?"를 한 번 묻는 습관.' },
  ISFJ: { recharge:'안전한 루틴, 사랑하는 사람과 조용한 시간, 익숙한 취미, 정리정돈', warning:'타인 돌봄에 모든 에너지를 쓰고 자기 충전을 안 함. 소진의 원형.', tip:'매주 "나만의 시간"을 비협상 일정으로 고정.' },
  ESFJ: { recharge:'사랑하는 사람들과 함께하기, 기념일 챙기기, 사교 활동, 인정받기', warning:'모든 관계를 다 챙기려다 소진. "나 없으면 안 돼"라는 믿음이 독이 됨.', tip:'Ti 활성화 — "이 관계에 내가 꼭 필요한가?" 냉정하게 판단하는 시간.' },
  ISTJ: { recharge:'안정적 루틴, 계획대로 진행되는 하루, 체계적 정리, 혼자만의 시간', warning:'변화를 거부하는 것이 안정 추구가 아니라 공포일 수 있음.', tip:'Ne 활성화 — 매달 하나씩 "해본 적 없는 것" 시도. 작은 것부터.' },
  ESTJ: { recharge:'목표 달성, 체크리스트 완료, 효율적 하루, 시스템 정비', warning:'쉬는 것을 게으름으로 여김. "생산적인 휴식"만 허용하는 패턴.', tip:'Fi 활성화 — "나는 성과 없이도 가치 있는 사람이다"를 체화하는 연습.' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 22: 유형별 우정 역학                                        ║
// ║  근거: 인지기능 기반 관계 유형 분석                                ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_FRIENDSHIP = {
  INFP: { style:'소수 깊은 관계형', making:'천천히 신뢰를 쌓음. 가치관이 맞는지 무의식적으로 테스트.', maintaining:'"영혼의 친구"와 그 외의 극단적 이분법. 중간이 없음.', giving:'경청, 감정적 지지, 상대의 진짜 마음을 알아채 줌.', needing:'가치관 존중, 강요 없는 자유, "너는 너대로 괜찮아" 인정.', breaking:'가치관이 배반당했다고 느끼면 조용히 떠남. 설명 없이.' },
  ENFP: { style:'넓고 다양한 관계형', making:'빠르게 친해짐. "우리 완전 잘 맞는다!" 초기 열정 강함.', maintaining:'여러 그룹을 자유롭게 넘나듦. 한 곳에 고정되기 싫어함.', giving:'열정적 응원, 새로운 가능성 열어주기, 분위기 살리기.', needing:'지적 자극, 자유, 판단 없는 수용.', breaking:'구속하거나 가능성을 차단하면 서서히 거리를 둠.' },
  INFJ: { style:'선별적 깊은 관계형', making:'매우 선별적. "이 사람의 본질"을 읽으려 하고, 통과하면 깊은 연결.', maintaining:'소수와 매우 깊은 유대. 피상적 관계에 에너지를 쓰지 않음.', giving:'통찰, 비전 공유, 상대의 잠재력을 보고 응원, 인생 상담.', needing:'진정성, 깊이, "겉과 속이 같은" 사람.', breaking:'"도어 슬램" — 경고 없이 관계를 완전히 차단. 돌아오지 않음.' },
  ENFJ: { style:'넓고 깊은 관계형', making:'자연스럽게 사람을 끌어들임. "이 사람 어디가 좋은지 알아" 식 발견.', maintaining:'다양한 그룹에서 중심 역할. 각 관계를 의식적으로 관리.', giving:'성장 지원, 갈등 중재, 따뜻한 격려, 연결고리 만들기.', needing:'노력에 대한 인정, 진심, 리더십 존중.', breaking:'감사받지 못하면 서서히 소진. 끝까지 노력하다가 탈진 후 떠남.' },
  INTP: { style:'소수 지적 동반자형', making:'공통 관심사에서 시작. 지적 대화가 우정의 핵심.', maintaining:'연락 빈도 낮아도 괜찮음. 한 달 만에 만나도 바로 깊은 대화.', giving:'정확한 분석, 솔직한 피드백, 문제 해결 도움.', needing:'지적 존중, 감정적 강요 없음, 독립적 공간.', breaking:'감정적 드라마가 반복되면 피로감으로 자연 소멸.' },
  ENTP: { style:'다양한 지적 네트워크형', making:'토론에서 시작. "이 사람이랑 얘기하면 재밌다" = 우정의 시작.', maintaining:'지루해지면 거리를 둠. 자극이 있어야 관계 유지.', giving:'새로운 관점, 유머, 도전적 질문, 모험 동반.', needing:'지적 대등함, 토론할 수 있는 공간, 판단 없는 수용.', breaking:'상대가 지적으로 정체되면 관심이 사라짐.' },
  INTJ: { style:'극소수 전략적 동반자형', making:'매우 선별적. 능력과 깊이를 기준으로 판단. 시간이 오래 걸림.', maintaining:'연락 빈도 매우 낮아도 유대 유지. 효율적 관계 운영.', giving:'전략적 조언, 솔직한 피드백, 문제 해결, 장기 비전 공유.', needing:'능력 존중, 비전 이해, 감정적 요구 최소.', breaking:'무능이 드러나거나 비전이 안 맞으면 냉정하게 정리.' },
  ENTJ: { style:'목표 공유 동지형', making:'함께 뭔가를 달성하면서 우정 형성. 행동으로 신뢰 구축.', maintaining:'활동 중심 관계. 함께 프로젝트하거나 목표를 공유하는 사이.', giving:'리소스 연결, 실행 도움, 직접적 피드백, 기회 제공.', needing:'실행력, 결과, 신뢰할 수 있는 약속 이행.', breaking:'약속 불이행이 반복되면 빠르게 정리. 감정보다 신뢰 기반.' },
  ISFP: { style:'소수 체험 공유형', making:'함께 경험하면서 자연스럽게 가까워짐. 말보다 함께하는 시간.', maintaining:'조용하지만 따뜻한 관계. 필요할 때 묵묵히 곁에 있어줌.', giving:'무조건적 수용, 행동으로 보여주는 사랑, 감각적 경험 공유.', needing:'강요 없는 자유, 가치 존중, 함께하되 구속하지 않는 관계.', breaking:'자유가 억압되면 말 없이 사라짐. 설명 요구하면 더 멀어짐.' },
  ESFP: { style:'파티 중심 넓은 관계형', making:'즉각적 친밀감. 재미있으면 바로 친구. 에너지가 맞으면 끝.', maintaining:'함께 즐기는 활동이 관계의 핵심. 재미 없으면 거리 두기.', giving:'에너지, 즐거움, 현재 순간의 활력, 실용적 도움.', needing:'즐거움, 자유, 판단 없는 수용.', breaking:'지루해지면 자연스럽게 거리 두기. 극적 이별보다 소멸.' },
  ISTP: { style:'독립적 동료형', making:'함께 작업하거나 활동하면서 자연스럽게. 대화보다 행동.', maintaining:'연락 거의 없어도 괜찮음. 필요할 때 "있는" 사이.', giving:'실용적 도움, 문제 해결, 도구·기술 공유.', needing:'독립성 존중, 불필요한 감정 토론 최소, 공간.', breaking:'감정적 드라마가 과하면 조용히 사라짐.' },
  ESTP: { style:'행동 동반자형', making:'함께 뭔가 하면서 즉시 친해짐. 행동이 관계의 기반.', maintaining:'활동 중심. "뭐 하자"가 연락의 주 목적.', giving:'즉각적 도움, 모험 동반, 에너지, 현실적 조언.', needing:'행동을 함께할 수 있는 사람. 말보다 행동.', breaking:'행동이 없고 말만 하는 관계에 흥미 상실.' },
  ISFJ: { style:'헌신적 소수 관계형', making:'천천히, 신뢰가 확인되어야. 오래된 관계를 가장 소중히 여김.', maintaining:'기념일 기억, 안부 확인, 작은 배려. 꾸준한 관계 유지의 달인.', giving:'헌신적 돌봄, 실용적 도움, 기억해주는 디테일, 안정감.', needing:'감사 표현, 안정성, 일관된 태도.', breaking:'배반당하면 오래 참다가 한 번에 과거 기록 전부 꺼내며 결별.' },
  ESFJ: { style:'공동체 중심 넓은 관계형', making:'사교적으로 자연스럽게. 소속감을 만들어내는 능력.', maintaining:'모든 관계를 체계적으로 관리. 생일·기념일·근황 파악.', giving:'실용적 돌봄, 사교적 연결, 소속감 제공, 이벤트 기획.', needing:'소속감, 인정, 감사 표현, 노력에 대한 보상.', breaking:'노력이 인정받지 못하면 서운함 축적. Ti 그립 시 냉소적 정리.' },
  ISTJ: { style:'약속 기반 소수 관계형', making:'느리지만 확실. 약속을 지키는 사람을 신뢰. 행동으로 판단.', maintaining:'연락 빈도보다 약속 이행. "말한 대로 하는" 관계.', giving:'신뢰할 수 있는 일관성, 실용적 도움, 약속 이행.', needing:'일관성, 약속 이행, 불확실성 최소.', breaking:'약속이 반복적으로 깨지면 신뢰 철회. 한번 잃은 신뢰 복구 극난.' },
  ESTJ: { style:'활동 기반 조직적 관계형', making:'함께 목표를 달성하면서 우정 형성. 일 잘하는 사람을 좋아함.', maintaining:'체계적 관계 관리. 정기적 만남, 명확한 기대치.', giving:'리더십, 조직력, 실용적 지원, 직접적 조언.', needing:'효율, 약속 이행, 결과, 능력 인정.', breaking:'무능이 반복되거나 약속이 안 지켜지면 관계 정리.' }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 23: 인지기능별 분노 표현 패턴                               ║
// ║  근거: 인지기능 역학 + 임상 관찰                                   ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_ANGER = {
  byFunction: {
    Fi: { expression:'내면에서 조용히 타오름. 겉으로는 평온해 보이지만 속은 용광로. 한계점 도달 시 폭발 또는 완전한 관계 절단.', trigger:'가치가 무시되거나 진정성이 의심받을 때', duration:'매우 길다. 몇 년 전 상처도 생생하게 기억.', resolution:'감정이 언어화되어야 해소. 글쓰기가 효과적. 사과보다 "네 감정이 맞아" 인정이 핵심.' },
    Fe: { expression:'관계가 깨진 것에 대한 슬픔형 분노. "왜 이렇게 됐지?"라는 비탄. 주변 사람을 동원할 수 있음.', trigger:'조화가 깨지거나 소속감이 위협받을 때', duration:'비교적 짧지만 관계 복구가 되지 않으면 장기화.', resolution:'관계 복구가 핵심. "우리 괜찮지?" 확인이 해소의 시작.' },
    Te: { expression:'즉각적, 직접적. 목소리 커짐. 비효율에 대한 공격. "이게 왜 안 돼?"', trigger:'무능, 비효율, 약속 불이행', duration:'짧고 강렬. 해결되면 깨끗하게 털어냄.', resolution:'문제가 해결되면 바로 풀림. 감정 처리보다 상황 해결이 우선.' },
    Ti: { expression:'냉정한 논리적 해체. 감정 없이 상대의 논리를 분해. "네 주장의 3번째 전제가 틀렸어."', trigger:'논리적 모순, 비합리적 강요, 지적 부정직', duration:'표면적으로는 짧지만, 내부적으로는 상대의 논리적 신뢰를 영구 하향 조정.', resolution:'논리적으로 납득 가능한 설명이 있으면 즉시 해소. 감정적 사과는 효과 없음.' },
    Ne: { expression:'산발적 폭발. 여러 방향으로 동시에 화남. "그리고 이것도 문제야, 저것도!"', trigger:'가능성이 차단되거나 선택지가 제거될 때', duration:'짧고 확산적. 빠르게 터뜨리고 다음으로 넘어감.', resolution:'새로운 가능성이 열리면 바로 풀림. "다른 방법이 있네!" 순간.' },
    Ni: { expression:'느리고 깊은 확신형. "이렇게 될 줄 알았어" 식 예언적 분노. 냉소적 톤.', trigger:'비전이 무시되거나, 예측이 현실로 드러났는데 아무도 안 들었을 때', duration:'매우 길다. 비전이 부정당한 상처는 깊이 저장.', resolution:'비전이 인정받거나 현실에서 증명될 때. "그것 보라고" 순간.' },
    Se: { expression:'즉각적이고 물리적. 문을 세게 닫거나, 목소리가 커지거나, 행동으로 표현.', trigger:'행동이 제한되거나, 지루한 상황에 갇힐 때', duration:'매우 짧다. 폭발하고 바로 잊음. 본인은 풀렸는데 상대는 아님.', resolution:'즉각적 행동 변화가 있으면 바로 풀림.' },
    Si: { expression:'과거 기록을 전부 꺼내는 축적형. "그때도 이랬잖아, 그리고 그때도, 그리고..."', trigger:'신뢰가 배반당하거나, 검증된 것이 무시될 때', duration:'매우 길다. 과거의 모든 사례를 기록처럼 저장.', resolution:'일관된 행동 변화가 보여야. 말이 아닌 행동으로 증명. 시간이 오래 걸림.' }
  },
  byType: {
    INFP:'Fi 분노 → 폭발 시 Te 그립으로 냉혹한 비판. 평소와 정반대라 주변 충격.',
    ENFP:'Ne 분노 → 산발적 터뜨림 후 빠르게 회복. 근본 문제는 반복될 수 있음.',
    INFJ:'Ni 분노 → 오래 참다가 "도어 슬램". 경고 없이 관계 완전 차단.',
    ENFJ:'Fe 분노 → 조화 깨진 것에 대한 비탄. 자기 욕구 억압이 축적되어 Ti 그립 폭발.',
    INTP:'Ti 분노 → 냉정한 논리적 해체. 상대는 "로봇과 싸우는 느낌".',
    ENTP:'Ne+Ti → 논쟁으로 접근. 상대가 싸움인데 본인은 "흥미로운 토론"으로 인식.',
    INTJ:'Ni 분노 → 냉소적 확신. "이렇게 될 줄 알았지." 감정 없이 팩트로 절단.',
    ENTJ:'Te 분노 → 즉각적 권위 행사. "이건 이래야 해." 타협 없는 지시 모드.',
    ISFP:'Fi 분노 → 조용한 저항. 말은 안 하지만 행동으로 거부. 극단 시 완전 사라짐.',
    ESFP:'Se 분노 → 즉각적 폭발 후 즉각적 회복. "나는 풀렸는데 너는 왜 아직?"',
    ISTP:'Ti 분노 → 냉정한 결론 통보. "이유는 이거고, 끝." 협상 여지 없음.',
    ESTP:'Se 분노 → 직접 대면. "지금 바로 얘기하자." 과거는 안 봄. 현재 해결 중심.',
    ISFJ:'Si 분노 → 축적형 폭발. 참고 참다가 과거 전체를 꺼냄. 본인도 놀라는 격앙.',
    ESFJ:'Fe 분노 → 사회적 동원. "다른 사람들도 다 그렇게 생각해." 동맹 구축.',
    ISTJ:'Si 분노 → 팩트와 전례 무기. "합의한 건 이거였고, 당신은 이걸 안 지켰어."',
    ESTJ:'Te 분노 → 직접 대면 + 권위. "이건 이렇게 해야 하는 거야." 타협 어려움.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 24: 방법론 선언 및 이론적 한계                              ║
// ║  목적: 학술적 투명성 확보                                         ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_METHODOLOGY = {
  stackModel: {
    adopted: 'Grant-Brownsword (1983) IEIE 교대 모델',
    reason: '① Beebe(2004) 8기능 원형 모델과의 구조적 정합성 (그림자 = 같은 기능 + 반대 태도), ② 현대 MBTI 실무 커뮤니티에서의 사실상 표준(de facto standard) 지위, ③ 1985/1998 MBTI Manual 채택.',
    alternatives: {
      myersOriginal: 'Myers 원래 모델 (EIII/IEEE): 3차기능이 주기능과 반대 태도. Jung 원전에 더 가까우나 현재 거의 사용되지 않음.',
      quenkPosition: 'Quenk(2009, p.15): "3차기능의 태도에 대한 이론적·실증적 근거가 불충분하므로 특정하지 않는다." MBTI Manual 공저자로서 가장 보수적 학술 입장.',
      reynierse: 'Reynierse & Harker(2008): 유형역학(type dynamics) 자체의 실증적 근거가 약하다고 보고. 4개 선호 척도(이분법)만이 실증적으로 유효하다는 입장.'
    },
    disclosure: '본 모듈은 Grant-Brownsword 모델의 한계를 인지한 상태에서, 응용 목적(MBTS 서비스)에 최적화된 실무 참조 데이터로 구성되었다.'
  },
  loopConcept: {
    status: '학술 문헌이 아닌 MBTI 실무 커뮤니티(Personality Junkie, PersonalityCafe 등)에서 2000년대 중반 이후 발전된 경험적 프레임워크.',
    academicBasis: 'Quenk의 그립 모델에서 "주기능 과잉 의존 → 열등기능 폭발" 사이에 위치하는 중간 단계로 커뮤니티가 독자적으로 정립.',
    validity: '임상적 관찰에서 반복적으로 보고되나, 통제된 실증 연구는 부재.'
  },
  socionicsAdaptation: {
    note: 'PART 7(유형 간 관계 역학)의 8종 관계 유형은 Socionics 관계론에서 차용. Socionics는 내향 유형의 J/P를 MBTI와 반대로 해석하므로(Socionics INFp = MBTI INFJ), 본 모듈은 MBTI 인지기능 체계에 맞게 재매핑하였다.',
    limitation: '이 재매핑은 이론적 추론이며, 실증적으로 검증된 것이 아님.'
  }
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 25: MBTI 도구의 심리측정적 지위                             ║
// ║  근거: McCrae & Costa(1989), Capraro & Capraro(2002), MBTI Manual║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_PSYCHOMETRIC_STATUS = {
  reliability: {
    testRetest: 'EI: .75~.93, SN: .69~.93, TF: .48~.89, JP: .64~.89 (Myers & McCaulley, 1989). 2018 Global Step I 기준: .81~.86 (n=1,721, 6~15주 간격).',
    typeChange: '재검사 시 39~76%가 유형 변경 (이분법적 분류의 구조적 한계). 선호 강도가 약한 사람일수록 변경 확률 높음.',
    metaAnalysis: 'Capraro & Capraro(2002) 메타분석: 전체적으로 수용 가능한 내적 일관성 및 재검사 신뢰도, 단 표본에 따라 변동.'
  },
  validity: {
    construct: '4개 MBTI 지표가 Big Five의 4개 요인과 유의미한 상관 (McCrae & Costa, 1989). 단, MBTI가 "유형"을 측정하는지 "특성의 연속 척도"를 측정하는지에 대한 논쟁 미해결.',
    criterion: 'National Academy of Sciences(1991): "인기 대비 과학적 근거 부족." 직업 수행 예측력은 제한적.',
    bigFiveCorrelation: 'E/I↔Extraversion(r=.74), S/N↔Openness(r=.72), T/F↔Agreeableness(r=.44), J/P↔Conscientiousness(r=.49), Neuroticism=대응 축 없음.'
  },
  critiques: {
    dichotomy: '강제 이분법 문제: 실제 성격 분포는 정규분포에 가까움. 경계선 근처의 사람들이 다른 유형으로 분류될 위험.',
    neuroticism: 'Big Five의 Neuroticism(신경증/정서 안정성)에 대응하는 축이 없음. MBTI의 가장 큰 측정 공백.',
    cognitiveFunctions: '인지기능 스택 자체가 MBTI 공식 도구로 직접 측정되지 않음. 이론적 추론이지 직접 측정이 아님.',
    pseudoscience: '학술 커뮤니티의 일부는 MBTI를 "유사과학"으로 분류. Adam Grant(2013): "사라지지 않는 유행".'
  },
  defense: {
    practicalUtility: '70년 이상의 적용 사례. 자기 이해의 출발점으로서의 접근성.',
    bigFiveOverlap: 'Big Five 4개 요인과의 유의미한 상관은 MBTI가 성격의 실질적 측면을 측정함을 시사.',
    faceLegitimacy: '많은 사용자가 자기 유형 기술에서 높은 자기 인식(face validity)을 보고.',
    step2: 'MBTI Step II는 각 선호 척도를 5개 하위 패싯으로 세분화하여 이분법 비판에 대응.'
  },
  position: '본 모듈은 MBTI의 측정적 한계를 인지하되, 인지기능 이론의 설명력과 실용적 가치를 인정하는 입장에서 구성되었다. 학술적 엄밀성이 아닌 응용적 유용성에 초점.'
};


// ╔══════════════════════════════════════════════════════════════════╗
// ║  PART 26: 참고문헌                                                ║
// ╚══════════════════════════════════════════════════════════════════╝

var MT_REFERENCES = {
  primary: {
    jung1921: 'Jung, C.G. (1921/1971). Psychological Types. Princeton University Press.',
    myers1980: 'Myers, I.B. (1980). Gifts Differing: Understanding Personality Type. Davies-Black.',
    beebe2004: 'Beebe, J. (2004). "Understanding consciousness through the theory of psychological types." In Analytical Psychology: Contemporary Perspectives in Jungian Analysis. Routledge, pp.83-115.',
    beebe2017: 'Beebe, J. (2017). Energies and Patterns in Psychological Type. Routledge.',
    quenk2002: 'Quenk, N.L. (2002). Was That Really Me? How Everyday Stress Brings Out Our Hidden Personality. Davies-Black.',
    quenk2009: 'Quenk, N.L. (2009). Essentials of Myers-Briggs Type Indicator Assessment (2nd ed.). Wiley.',
    grant1983: 'Grant, W.H., Thompson, M., & Clarke, T.E. (1983). From Image to Likeness: A Jungian Path in the Gospel Journey. Paulist Press.',
    brownsword1987: 'Brownsword, A. (1987). It Takes All Types! An Introduction to the Uses and Abuses of Personality Type. Baytree Publication.'
  },
  empirical: {
    mccrae1989: 'McCrae, R.R. & Costa, P.T. (1989). Reinterpreting the Myers-Briggs Type Indicator from the perspective of the five-factor model of personality. Journal of Personality, 57(1), 17-40.',
    capraro2002: 'Capraro, R.M. & Capraro, M.M. (2002). Myers-Briggs Type Indicator Score Reliability Across Studies: A Meta-Analytic Reliability Generalization Study. Educational and Psychological Measurement, 62(4), 590-602.',
    furnham1996: 'Furnham, A. (1996). The big five versus the big four: the relationship between the Myers-Briggs Type Indicator and the NEO-PI five factor model of personality. Personality and Individual Differences, 21(2), 303-307.',
    reynierse2008: 'Reynierse, J.H. & Harker, J.B. (2008). Preference multidimensionality and the fallacy of type dynamics. Journal of Psychological Type, 68(11), 90-112.',
    nardi2011: 'Nardi, D. (2011). Neuroscience of Personality: Brain Savvy Insights for All Types of People. Radiance House. (주의: 소규모 표본, 독립 재현 미확인)'
  },
  frameworks: {
    keirsey1998: 'Keirsey, D. (1998). Please Understand Me II: Temperament, Character, Intelligence. Prometheus Nemesis.',
    berens2001: 'Berens, L.V. (2001). Understanding Yourself and Others: An Introduction to Interaction Styles. Telos Publications.',
    thomasKilmann: 'Thomas, K.W. & Kilmann, R.H. (1974). Thomas-Kilmann Conflict Mode Instrument. CPP.',
    holland1997: 'Holland, J.L. (1997). Making Vocational Choices: A Theory of Vocational Personalities and Work Environments (3rd ed.). Psychological Assessment Resources.'
  },
  manual: {
    mbtiManual: 'Myers, I.B., McCaulley, M.H., Quenk, N.L., & Hammer, A.L. (1998). MBTI Manual: A Guide to the Development and Use of the Myers-Briggs Type Indicator (3rd ed.). CPP.',
    nas1991: 'National Research Council. (1991). In the Mind\'s Eye: Enhancing Human Performance. National Academy Press.'
  }
};


// ═══════════════════════════════════════════════════
// 전역 노출 (추가분)
// ═══════════════════════════════════════════════════
window.MT_RELATION_TYPES = MT_RELATION_TYPES;
window.MT_RELATION_MATRIX = MT_RELATION_MATRIX;
window.MT_CAREER = MT_CAREER;
window.MT_CONFLICT_STYLES = MT_CONFLICT_STYLES;
window.MT_AXES = MT_AXES;
window.MT_LOVE = MT_LOVE;
window.MT_STRESS_STAGES = MT_STRESS_STAGES;
window.MT_MATURITY = MT_MATURITY;
window.MT_MISTYPE = MT_MISTYPE;
window.MT_BIG_FIVE = MT_BIG_FIVE;
window.MT_INTERACTION_STYLES = MT_INTERACTION_STYLES;
window.MT_SHADOW_BY_TYPE = MT_SHADOW_BY_TYPE;
window.MT_DECISION_PROCESS = MT_DECISION_PROCESS;
window.MT_MONEY = MT_MONEY;
window.MT_SOCIAL_MEDIA = MT_SOCIAL_MEDIA;
window.MT_SELFCARE = MT_SELFCARE;
window.MT_FRIENDSHIP = MT_FRIENDSHIP;
window.MT_ANGER = MT_ANGER;
window.MT_METHODOLOGY = MT_METHODOLOGY;
window.MT_PSYCHOMETRIC_STATUS = MT_PSYCHOMETRIC_STATUS;
window.MT_REFERENCES = MT_REFERENCES;

// 유형 간 관계 조회
window.mtGetRelation = function(type1, type2) {
  for (var i = 0; i < MT_RELATION_MATRIX.length; i++) {
    var r = MT_RELATION_MATRIX[i];
    if ((r.a === type1 && r.b === type2) || (r.a === type2 && r.b === type1)) {
      return { relation: MT_RELATION_TYPES[r.rel], note: r.note };
    }
  }
  return null;
};

// 유형별 커리어 조회
window.mtGetCareer = function(code) {
  return MT_CAREER[code] || null;
};

// 유형별 갈등 스타일 조회
window.mtGetConflict = function(code) {
  return MT_CONFLICT_STYLES[code] || null;
};


// ═══════════════════════════════════════════════════
// 유틸리티 함수
// ═══════════════════════════════════════════════════

// 유형 코드 → 풀 프로필 반환
window.mtGetType = function(code) {
  return MT_TYPES[code] || null;
};

// 유형 코드 → 스택 위치별 기능 상세 반환
window.mtGetStack = function(code) {
  var t = MT_TYPES[code];
  if (!t) return null;
  var positions = ['dominant','auxiliary','tertiary','inferior'];
  return t.stack.map(function(fnId, i) {
    return {
      position: positions[i],
      positionKo: MT_STACK_POSITIONS[positions[i]].koName,
      fn: MT_FUNCTIONS[fnId],
      role: MT_STACK_POSITIONS[positions[i]].role,
      developAge: MT_STACK_POSITIONS[positions[i]].developAge
    };
  });
};

// 두 기능의 상호작용 패턴 조회
window.mtGetInteraction = function(fn1, fn2) {
  return MT_FUNCTION_INTERACTIONS[fn1+'-'+fn2]
      || MT_FUNCTION_INTERACTIONS[fn2+'-'+fn1]
      || null;
};

// 축 + 강도 → 행동 프로필 조회
window.mtGetIntensity = function(axis, level) {
  var a = MT_INTENSITY_PROFILES[axis];
  if (!a) return null;
  return a[level] || null;
};


// ═══════════════════════════════════════════════════
// Build 함수 — 유형 데이터를 해석문 텍스트로 변환
// 패턴: SJ_buildXXXText와 동일 (string 리턴, 빈 데이터 → '')
// ═══════════════════════════════════════════════════

// 1. MT_buildProfileText
function MT_buildProfileText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var lines = ['[MBTI 핵심 프로필]'];
  lines.push('- 유형: ' + t.code + ' (' + t.name + ')');
  lines.push('- 핵심 욕구: ' + t.coreNeed);
  lines.push('- 핵심 두려움: ' + t.coreFear);
  lines.push('- 스트레스 반응: ' + t.stressPattern);
  lines.push('- 루프 경고: ' + t.loop);
  lines.push('- 성장 경로: ' + t.growthPath);
  return lines.join('\n');
}

// 2. MT_buildStackText
function MT_buildStackText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var positions = ['dominant','auxiliary','tertiary','inferior'];
  var posLabels = ['주기능','부기능','3차기능','열등기능'];
  var lines = ['[인지기능 스택]'];
  for (var i = 0; i < 4; i++) {
    var fnId = t.stack[i];
    var fn = MT_FUNCTIONS[fnId];
    var pos = MT_STACK_POSITIONS[positions[i]];
    if (!fn || !pos) continue;
    lines.push('- ' + posLabels[i] + ': ' + fnId + ' (' + fn.koName + ') — ' + pos.role.substring(0, 60) + ' (' + (pos.developAge || '') + ')');
  }
  return lines.join('\n');
}

// 3. MT_buildShadowText
function MT_buildShadowText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var sb = MT_SHADOW_BY_TYPE[type];
  if (!sb) return '';
  var shadowPositions = ['opposing','critical_parent','trickster','demon'];
  var shadowLabels = ['반대인격(5번)','비판적부모(6번)','트릭스터(7번)','데몬(8번)'];
  var shadowKeys = ['opposing_','critical_','trickster_','demon_'];
  var lines = ['[그림자 기능]'];
  for (var i = 0; i < 4; i++) {
    var fnId = t.shadow[i];
    var key = null;
    var keys = Object.keys(sb);
    for (var k = 0; k < keys.length; k++) {
      if (keys[k].indexOf(shadowKeys[i]) === 0) { key = keys[k]; break; }
    }
    var desc = key ? sb[key] : '';
    lines.push('- ' + shadowLabels[i] + ': ' + fnId + ' — ' + desc);
  }
  return lines.join('\n');
}

// 4. MT_buildAxesText
function MT_buildAxesText(type) {
  var t = MT_TYPES[type];
  if (!t || !t.stack) return '';
  var dom = t.stack[0];
  var inf = t.stack[3];
  var axisKey = dom + '-' + inf;
  var axis = MT_AXES[axisKey] || MT_AXES[inf + '-' + dom];
  if (!axis) return '';
  var lines = ['[축 역학: ' + axis.name + ']'];
  lines.push('- 시소: ' + axis.seesaw);
  lines.push('- 건강한 균형: ' + axis.healthyBalance);
  var unhealthy1 = axis['unhealthy' + dom + 'Dom'] || axis['unhealthy' + inf + 'Dom'] || '';
  var unhealthy2 = axis['unhealthy' + inf + 'Dom'] || axis['unhealthy' + dom + 'Dom'] || '';
  if (unhealthy1) lines.push('- 불건강(' + dom + ' 과잉): ' + unhealthy1);
  if (unhealthy2 && unhealthy2 !== unhealthy1) lines.push('- 불건강(' + inf + ' 과잉): ' + unhealthy2);
  lines.push('- 그립 방향: ' + axis.gripDirection);
  return lines.join('\n');
}

// 5. MT_buildStressText
function MT_buildStressText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var stages = ['stage1_normal','stage2_mild','stage3_loop','stage4_grip','stage5_recovery'];
  var lines = ['[스트레스 5단계]'];
  for (var i = 0; i < stages.length; i++) {
    var s = MT_STRESS_STAGES[stages[i]];
    if (!s) continue;
    var line = '- ' + (i+1) + '단계(' + s.name + '): ' + s.desc;
    if (s.sign) line += ' 징후: ' + s.sign;
    if (i === 2 && s.examples) {
      var loopKey = t.loop ? t.loop.split(' —')[0].replace(/\s/g,'') : (t.stack[0] + '-' + t.stack[2] + ' (' + type + ')');
      for (var ek in s.examples) {
        if (ek.indexOf(type) !== -1) { line += ' [' + ek + '] ' + s.examples[ek]; break; }
      }
    }
    if (i === 3 && s.examples) {
      for (var gk in s.examples) {
        if (gk.indexOf(t.stack[3]) !== -1) { line += ' [' + gk + '] ' + s.examples[gk]; break; }
      }
    }
    lines.push(line);
  }
  if (t.stressPattern) lines.push('- 유형 고유: ' + t.stressPattern);
  if (t.loop) lines.push('- 루프: ' + t.loop);
  return lines.join('\n');
}

// 6. MT_buildLoveText
function MT_buildLoveText(type) {
  var d = MT_LOVE[type];
  if (!d) return '';
  var lines = ['[연애 패턴]'];
  if (d.attract) lines.push('- 끌리는 포인트: ' + d.attract);
  if (d.loveLanguage) lines.push('- 사랑의 언어: ' + d.loveLanguage);
  if (d.earlyDating) lines.push('- 초기 연애: ' + d.earlyDating);
  if (d.deepRelation) lines.push('- 깊은 관계: ' + d.deepRelation);
  if (d.conflict) lines.push('- 갈등 시: ' + d.conflict);
  if (d.breakup) lines.push('- 이별: ' + d.breakup);
  if (d.dealbreaker) lines.push('- 딜브레이커: ' + d.dealbreaker);
  if (d.growthInLove) lines.push('- 성장 과제: ' + d.growthInLove);
  return lines.join('\n');
}

// 7. MT_buildConflictText
function MT_buildConflictText(type) {
  var d = MT_CONFLICT_STYLES[type];
  if (!d) return '';
  var lines = ['[갈등 패턴]'];
  lines.push('- 트리거: ' + d.trigger);
  lines.push('- 싸우는 방식: ' + d.fightStyle);
  lines.push('- 소통 방식: ' + d.communication);
  lines.push('- 상대에게 필요한 것: ' + d.needsFromOther);
  lines.push('- 맹점: ' + d.blindSpot);
  return lines.join('\n');
}

// 8. MT_buildAngerText
function MT_buildAngerText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var domFn = t.stack[0];
  var byFn = MT_ANGER.byFunction[domFn];
  var byTp = MT_ANGER.byType[type];
  if (!byFn && !byTp) return '';
  var lines = ['[분노 패턴]'];
  if (byFn) {
    lines.push('- 기능별(' + domFn + '): ' + byFn.expression);
    lines.push('- 트리거: ' + byFn.trigger);
    lines.push('- 지속시간: ' + byFn.duration);
    lines.push('- 해소 조건: ' + byFn.resolution);
  }
  if (byTp) lines.push('- 유형별(' + type + '): ' + byTp);
  return lines.join('\n');
}

// 9. MT_buildCareerText
function MT_buildCareerText(type) {
  var d = MT_CAREER[type];
  if (!d) return '';
  var lines = ['[직업 적성]'];
  if (d.strengths) lines.push('- 적합: ' + d.strengths);
  if (d.weakAreas) lines.push('- 취약: ' + d.weakAreas);
  if (d.idealEnv) lines.push('- 이상적 환경: ' + d.idealEnv);
  if (d.stressJob) lines.push('- 피해야 할 환경: ' + d.stressJob);
  if (d.holland) lines.push('- 홀랜드: ' + d.holland);
  return lines.join('\n');
}

// 10. MT_buildDecisionText
function MT_buildDecisionText(type) {
  var d = MT_DECISION_PROCESS[type];
  if (!d) return '';
  var lines = ['[의사결정 패턴]'];
  lines.push('- 과정: ' + d.flow);
  lines.push('- 함정: ' + d.blind);
  return lines.join('\n');
}

// 11. MT_buildMoneyText
function MT_buildMoneyText(type) {
  var d = MT_MONEY[type];
  if (!d) return '';
  var lines = ['[소비 패턴]'];
  if (d.style) lines.push('- 유형: ' + d.style);
  if (d.pattern) lines.push('- 패턴: ' + d.pattern);
  if (d.trap) lines.push('- 함정: ' + d.trap);
  if (d.tip) lines.push('- 팁: ' + d.tip);
  return lines.join('\n');
}

// 12. MT_buildSelfcareText
function MT_buildSelfcareText(type) {
  var d = MT_SELFCARE[type];
  if (!d) return '';
  var lines = ['[셀프케어]'];
  if (d.recharge) lines.push('- 충전법: ' + d.recharge);
  if (d.warning) lines.push('- 경고: ' + d.warning);
  if (d.tip) lines.push('- 팁: ' + d.tip);
  return lines.join('\n');
}

// 13. MT_buildFriendshipText
function MT_buildFriendshipText(type) {
  var d = MT_FRIENDSHIP[type];
  if (!d) return '';
  var lines = ['[우정 패턴]'];
  if (d.style) lines.push('- 스타일: ' + d.style);
  if (d.making) lines.push('- 친구 사귀기: ' + d.making);
  if (d.maintaining) lines.push('- 유지: ' + d.maintaining);
  if (d.giving) lines.push('- 주는 것: ' + d.giving);
  if (d.needing) lines.push('- 필요한 것: ' + d.needing);
  if (d.breaking) lines.push('- 이별: ' + d.breaking);
  return lines.join('\n');
}

// 14. MT_buildSocialMediaText
function MT_buildSocialMediaText(type) {
  var d = MT_SOCIAL_MEDIA[type];
  if (!d) return '';
  var lines = ['[소셜미디어 패턴]'];
  if (d.posting) lines.push('- 포스팅: ' + d.posting);
  if (d.consuming) lines.push('- 소비: ' + d.consuming);
  if (d.interaction) lines.push('- 상호작용: ' + d.interaction);
  if (d.darkside) lines.push('- 어두운 면: ' + d.darkside);
  if (d.detox) lines.push('- 디톡스: ' + d.detox);
  return lines.join('\n');
}

// 15. MT_buildMaturityText
function MT_buildMaturityText(type) {
  var t = MT_TYPES[type];
  if (!t) return '';
  var domFn = t.stack[0];
  var d = MT_MATURITY[domFn];
  if (!d) return '';
  var lines = ['[주기능 성숙도: ' + domFn + ']'];
  lines.push('- 미성숙: ' + d.immature);
  lines.push('- 발달 중: ' + d.developing);
  lines.push('- 성숙: ' + d.mature);
  return lines.join('\n');
}

// 16. MT_buildTemperamentText
function MT_buildTemperamentText(type) {
  var t = MT_TYPES[type];
  if (!t || !t.temperament) return '';
  var tempKey = t.temperament.substring(0, 2);
  var d = MT_TEMPERAMENTS[tempKey];
  if (!d) return '';
  var lines = ['[기질: ' + d.name + ']'];
  lines.push('- 소속 유형: ' + d.types.join(', '));
  lines.push('- 핵심 욕구: ' + d.coreNeed);
  lines.push('- 소통 방식: ' + d.communication);
  lines.push('- 갈등: ' + d.conflict);
  return lines.join('\n');
}

// 17. MT_buildInteractionStyleText
function MT_buildInteractionStyleText(type) {
  var t = MT_TYPES[type];
  if (!t || !t.interactionStyle) return '';
  var d = MT_INTERACTION_STYLES[t.interactionStyle];
  if (!d) return '';
  var lines = ['[상호작용 스타일: ' + d.name + ']'];
  lines.push('- 핵심 목표: ' + d.coreGoal);
  lines.push('- 에너지: ' + d.energy);
  lines.push('- 소통: ' + d.communication);
  lines.push('- 강점: ' + d.strength);
  lines.push('- 스트레스: ' + d.stress);
  if (d.inRelationship) lines.push('- 관계에서: ' + d.inRelationship);
  return lines.join('\n');
}

// 18. MT_buildIntensityText
function MT_buildIntensityText(type, intensities) {
  if (!intensities || intensities.length < 4) return '';
  var axes = type.split('');
  var axisOrder = [
    axes[0] === 'E' ? 'E' : 'I',
    axes[1] === 'S' ? 'S' : 'N',
    axes[2] === 'T' ? 'T' : 'F',
    axes[3] === 'J' ? 'J' : 'P'
  ];
  var lines = ['[강도별 행동]'];
  for (var i = 0; i < 4; i++) {
    var ax = axisOrder[i];
    var lv = intensities[i];
    var profile = MT_INTENSITY_PROFILES[ax];
    if (!profile) continue;
    var d = profile[lv] || profile[String(lv)];
    if (!d) continue;
    var label = lv === 55 ? '살짝' : lv === 68 ? '확실' : lv === 88 ? '극강' : String(lv);
    lines.push('- ' + ax + '(' + lv + '-' + label + '): ' + d.trait);
    if (d.love) lines.push('  연애: ' + d.love);
    if (d.work) lines.push('  일: ' + d.work);
    if (d.burn) lines.push('  번아웃: ' + d.burn);
  }
  return lines.join('\n');
}

// 19. MT_buildMistypeText
function MT_buildMistypeText(type) {
  var matches = [];
  for (var i = 0; i < MT_MISTYPE.length; i++) {
    var m = MT_MISTYPE[i];
    if (m.confused.indexOf(type) !== -1) matches.push(m);
  }
  if (matches.length === 0) return '';
  var lines = ['[오인 패턴]'];
  for (var j = 0; j < matches.length; j++) {
    var m = matches[j];
    var other = m.confused[0] === type ? m.confused[1] : m.confused[0];
    lines.push('- ' + type + ' vs ' + other + ' (빈도: ' + m.frequency + ')');
    lines.push('  원인: ' + m.rootCause);
    lines.push('  핵심 차이: ' + m.keyDifference);
    if (m.testQuestion) lines.push('  테스트: ' + m.testQuestion);
  }
  return lines.join('\n');
}

// 20. MT_buildDevelopmentText
function MT_buildDevelopmentText(type, age) {
  if (!age && age !== 0) return '';
  var current = null;
  var next = null;
  for (var i = 0; i < MT_DEVELOPMENT_STAGES.length; i++) {
    var s = MT_DEVELOPMENT_STAGES[i];
    var parts = s.age.replace('+','~999').split('~');
    var lo = parseInt(parts[0]) || 0;
    var hi = parseInt(parts[1]) || 999;
    if (age >= lo && age <= hi) current = s;
    if (age < lo && !next) next = s;
  }
  if (!current) return '';
  var t = MT_TYPES[type];
  var lines = ['[발달 단계 (현재 ' + age + '세)]'];
  lines.push('- 현재 단계: ' + current.stage + ' (' + current.age + '세)');
  lines.push('- 설명: ' + current.desc);
  lines.push('- 초점: ' + current.focus);
  if (t && t.stack) {
    var posLabels = ['주기능','부기능','3차기능','열등기능'];
    var posAges = [[6,12],[12,20],[20,35],[35,50]];
    for (var j = 0; j < 4; j++) {
      if (age >= posAges[j][0] && age <= posAges[j][1]) {
        lines.push('- 현재 발달 중인 기능: ' + posLabels[j] + ' ' + t.stack[j]);
        break;
      }
    }
  }
  if (next) lines.push('- 다음 단계: ' + next.stage + ' (' + next.age + '세) — ' + next.focus);
  return lines.join('\n');
}

// 21. MT_buildFullContext (master)
function MT_buildFullContext(type, intensities, age, typeB) {
  var parts = [];
  parts.push(MT_buildProfileText(type));
  parts.push(MT_buildStackText(type));
  parts.push(MT_buildShadowText(type));
  parts.push(MT_buildAxesText(type));
  parts.push(MT_buildStressText(type));
  parts.push(MT_buildLoveText(type));
  parts.push(MT_buildConflictText(type));
  parts.push(MT_buildAngerText(type));
  parts.push(MT_buildCareerText(type));
  parts.push(MT_buildDecisionText(type));
  parts.push(MT_buildMoneyText(type));
  parts.push(MT_buildSelfcareText(type));
  parts.push(MT_buildFriendshipText(type));
  parts.push(MT_buildSocialMediaText(type));
  parts.push(MT_buildMaturityText(type));
  parts.push(MT_buildTemperamentText(type));
  parts.push(MT_buildInteractionStyleText(type));
  if (intensities) parts.push(MT_buildIntensityText(type, intensities));
  parts.push(MT_buildMistypeText(type));
  if (age) parts.push(MT_buildDevelopmentText(type, age));
  if (typeB) parts.push(MT_buildRelationText(type, typeB));
  return parts.filter(Boolean).join('\n\n');
}

// 22. MT_buildRelationText
function MT_buildRelationText(type1, type2) {
  if (!type1 || !type2) return '';
  var match = null;
  for (var i = 0; i < MT_RELATION_MATRIX.length; i++) {
    var r = MT_RELATION_MATRIX[i];
    if ((r.a === type1 && r.b === type2) || (r.a === type2 && r.b === type1)) {
      match = r; break;
    }
  }
  var lines = ['[궁합: ' + type1 + ' × ' + type2 + ']'];
  if (match) {
    var relType = MT_RELATION_TYPES[match.rel];
    if (relType) {
      lines.push('- 관계 유형: ' + relType.name);
      lines.push('- 패턴: ' + relType.pattern);
      lines.push('- 역학: ' + relType.dynamic);
      lines.push('- 리스크: ' + relType.risk);
    }
    if (match.note) lines.push('- 노트: ' + match.note);
  } else {
    lines.push('- 매트릭스에 없는 조합 (역방향 검색 없음)');
  }
  var c1 = MT_CONFLICT_STYLES[type1];
  var c2 = MT_CONFLICT_STYLES[type2];
  if (c1 || c2) {
    lines.push('');
    lines.push('[갈등 대조]');
    if (c1) lines.push('- ' + type1 + ' 트리거: ' + c1.trigger + ' / 방식: ' + c1.fightStyle);
    if (c2) lines.push('- ' + type2 + ' 트리거: ' + c2.trigger + ' / 방식: ' + c2.fightStyle);
  }
  return lines.join('\n');
}

// ── window 전역 등록 ──
window.MT_buildProfileText = MT_buildProfileText;
window.MT_buildStackText = MT_buildStackText;
window.MT_buildShadowText = MT_buildShadowText;
window.MT_buildAxesText = MT_buildAxesText;
window.MT_buildStressText = MT_buildStressText;
window.MT_buildLoveText = MT_buildLoveText;
window.MT_buildConflictText = MT_buildConflictText;
window.MT_buildAngerText = MT_buildAngerText;
window.MT_buildCareerText = MT_buildCareerText;
window.MT_buildDecisionText = MT_buildDecisionText;
window.MT_buildMoneyText = MT_buildMoneyText;
window.MT_buildSelfcareText = MT_buildSelfcareText;
window.MT_buildFriendshipText = MT_buildFriendshipText;
window.MT_buildSocialMediaText = MT_buildSocialMediaText;
window.MT_buildMaturityText = MT_buildMaturityText;
window.MT_buildTemperamentText = MT_buildTemperamentText;
window.MT_buildInteractionStyleText = MT_buildInteractionStyleText;
window.MT_buildIntensityText = MT_buildIntensityText;
window.MT_buildMistypeText = MT_buildMistypeText;
window.MT_buildDevelopmentText = MT_buildDevelopmentText;
window.MT_buildFullContext = MT_buildFullContext;
window.MT_buildRelationText = MT_buildRelationText;

})();
