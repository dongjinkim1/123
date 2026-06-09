// ══════════════════════════════════════════════
// MBTS Pattern Data — 자동 생성
// 생성일: 2026-04-14
// 총 패턴: 841개
// ══════════════════════════════════════════════

var MBTS_PATTERNS = {
  "premium": {
    "고쳐야 할 점": [
      {
        "id": "CROSS-FIX-003",
        "tier": "A",
        "name": "일주 그림자(shadow)와 인지기능 그림자의 이중 진단 — 강점이 뒤틀릴 때",
        "tags": [
          "uses:ilju",
          "uses:osin",
          "uses:shadow"
        ],
        "saju": "ILJU_KW[일주].shadow + JEOKCHEONSU[일간].danger",
        "mbti": ": 상대가 제시한 그림자 기능의 방어적 발현 (opposing, critical_parent, trickster, demon)",
        "cross": "사주에서 드러나는 어두운 면은 날짜 조합이 만들어내는 이미지에서 나온다. 예를 들어 나무와 불의 조합은 '쉽게 타오르다 꺼지는' 인내력 부족의 그림자를 만든다. MBTI에서 드러나는 어두운 면은 가장 약한 성향이 반전될 때 나타난다. 출발점이 전혀 다른 두 체계가 같은 약점을 동시에 가리킨다면, 그 어두운 면은 실제로 존재할 가능성이 훨씬 높아진다.",
        "impact": 6
      },
      {
        "id": "CROSS-FIX-008",
        "tier": "A",
        "name": "소비 함정과 재성 통변의 재정적 이중 진단 — 돈이 새는 구조의 양면",
        "tags": [
          "strength:신약+",
          "condition:excess",
          "ss:비겁",
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "unsung:태",
          "unsung:양",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약",
          "tongbyeon:재성태과",
          "ref:MT_MONEY",
          "ref:MT_DECISION"
        ],
        "saju": "SJ_detectTongbyeon 중 재성 관련 흉 공식 (비겁탈재='벌어도 빼앗김', 재다신약='돈은 보이는데 감당 못함', 재성태과='물욕 과다') + SSP['편재'/'정재'][궁위별 해석]",
        "mbti": ": MT_MONEY[code].trap + MT_MONEY[code].pattern + MT_DECISION_PROCESS[code].blind",
        "cross": "사주는 '돈의 에너지가 구조적으로 어디로 흐르는가'를 보여주고, MBTI는 '인지적으로 어디서 재정 판단이 흔들리는가'를 보여준다. 사주는 동업·투자·보증 같은 외부 재정 환경에서 더 강하게 드러나고, MBTI는 충동구매나 과잉절약 같은 내부 소비 행동에서 더 잘 보인다. 두 분석이 같은 방향을 가리키면, 그 사람의 가장 큰 재정적 약점을 두 각도에서 동시에 확인하는 셈이다.",
        "impact": 6
      },
      {
        "id": "CROSS-FIX-006",
        "tier": "A",
        "name": "의사결정 사각지대와 격국 패격 조건의 수렴 — 재능이 왜곡되는 인지적 경로",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "condition:패격",
          "ref:MT_DECISION"
        ],
        "saju": "JAPYEONG_GG의 breaks 배열 (격국별 패격 조건)",
        "mbti": ": MT_DECISION_PROCESS[code].blind + MT_DECISION_PROCESS[code].flow",
        "cross": "에너지 구조 수준에서 재능이 왜곡되는 경로가 있고, 판단 구조 수준에서 결정이 왜곡되는 경로가 있다. 두 경로가 같은 영역의 약점을 가리키면 '이 사람의 가장 아쉬운 점'이 두 번 확인된다. 서로 다른 영역을 가리키면 별개의 두 가지 약점이 각각 존재한다는 뜻이다.",
        "impact": 6
      },
      {
        "id": "CROSS-FIX-002",
        "tier": "A",
        "name": "신강도 극단값과 인지 축(axis) 극단 불균형의 이중 치우침 진단",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "uses:intensity",
          "ref:MT_AXES"
        ],
        "saju": "analyzeGyeokguk의 strengthScore (극신강 ≥80% 또는 극신약 ≤25%) + SJ_buildStrengthText",
        "mbti": ": 상대가 제시한 MT_AXES 시소 극단 불균형 + MT_INTENSITY_PROFILES의 88급 편향",
        "cross": "사주의 나와 세상 사이의 에너지 균형은 '나 대 세상' 전체 비율이라는 큰 그림의 치우침이고, MBTI의 특정 성향 편향은 특정 기능 쌍 안에서의 작은 치우침이다. 두 체계 모두 극단값일 때만 '고쳐야 할 점'으로 떠오른다는 공통점이 있다. 두 가지가 동시에 극단으로 치우쳐 있다면, 교정의 시급성은 어느 한쪽만 봤을 때보다 훨씬 높아진다.",
        "impact": 7
      },
      {
        "id": "CROSS-FIX-009",
        "tier": "A",
        "name": "우정 파괴 패턴과 형살의 관계적 중첩 — 친구를 잃는 이중 구조",
        "tags": [
          "relation:형",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "SJ_checkSamhyung 결과 + JIJI_HYUNG_KW (형살별 관계 패턴)",
        "mbti": ": MT_FRIENDSHIP[code].breaking + MT_FRIENDSHIP[code].needing",
        "cross": "에너지 마찰 구조는 갈등 상황과 우정 상황에서 다르게 나타날 수 있다. 같은 구조적 마찰이라도 갈등 맥락에서는 '상대의 의도를 과도하게 해석하는' 인지적 반응으로 나타나고, 우정 맥락에서는 '아무 설명 없이 사라지는' 행동적 반응으로 나타날 수 있다. 같은 구조적 문제가 관계의 맥락에 따라 전혀 다른 증상으로 발현된다는 점이 포인트다.",
        "impact": 5
      },
      {
        "id": "CROSS-FIX-005",
        "tier": "A",
        "name": "갈등 맹점과 형살 반복 패턴의 관계적 이중 진단",
        "tags": [
          "relation:형",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "SJ_checkSamhyung 결과 + JIJI_HYUNG_KW (형살별 관계 패턴)",
        "mbti": ": MT_CONFLICT_STYLES[code].blindSpot + MT_ANGER.byFunction[해당 기능] + MT_LOVE[code].conflict",
        "cross": "사주의 구조적 마찰은 어떤 종류의 관계 패턴이 반복되는가를 보여주고, MBTI의 갈등 맹점은 갈등 상황에서 무엇을 못 보는가를 보여준다. 전자가 관계의 무대를 설정한다면 후자는 그 무대 위에서의 행동을 결정한다. 두 체계가 같은 방향을 가리키면 이 사람이 왜 같은 관계 실패를 반복하는지 입체적으로 설명할 수 있다.",
        "impact": 6
      },
      {
        "id": "CROSS-FIX-004",
        "tier": "A",
        "name": "오행 과다 행동과 인지기능 미성숙 행동의 수렴 — 과잉의 이중 포착",
        "tags": [
          "condition:excess"
        ],
        "saju": "saju.elFull >= 3.0인 오행 + OHENG_KW excess 키워드",
        "mbti": ": 상대가 제시한 인지기능 성숙도 immature 수준의 행동 기술",
        "cross": "사주의 특정 에너지 과다는 구조적으로 고정된 특성이고, MBTI의 미성숙한 성향은 성장 과정에서 변할 수 있는 특성이다. 두 체계를 함께 보면 같은 과잉 증상에 대해 구조적 원인과 발달적 원인을 동시에 파악할 수 있어, 처방이 훨씬 입체적이 된다는 점이 교차 분석의 가치다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-007",
        "tier": "B",
        "name": "일주 그림자(shadow)가 지목하는 고유한 약점",
        "tags": [
          "unsung:사",
          "uses:ilju",
          "uses:shadow"
        ],
        "saju": "ILJU_KW[일주].shadow 키워드 + JEOKCHEONSU[일간].danger",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 일주별 그림자는 60가지 일주 각각에 대한 고유한 데이터이며, 위험 패턴은 고전 명리 원전에 기반한다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-004",
        "tier": "B",
        "name": "오행 결핍이 만드는 행동적 맹점 — '안 보이는 것은 고칠 수도 없다'",
        "tags": [
          "condition:lack",
          "unsung:사"
        ],
        "saju": "saju.lackFull (결핍 오행 목록) + OHENG_KW lack/zero 키워드",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 성격의 어두운 면을 살펴보는 것에서 한 걸음 더 나아가, 구체적으로 무엇을 어떻게 고쳐야 하는가라는 행동 처방에 초점을 맞춘다. 실천 행동, 마음 닻, 음식 처방이 직접적인 개선 방향을 제공한다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-010",
        "tier": "B",
        "name": "건강 오행 경고 — 과다/결핍 오행이 만드는 신체적 취약점",
        "tags": [
          "condition:excess",
          "condition:lack",
          "unsung:사"
        ],
        "saju": "SJ_HEALTH_OH (오행별 장부/증상 매핑) + SJ_buildHealthText + saju.elFull/lackFull",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 오행과 신체 장기의 대응은 황제내경과 동의보감의 오행배속론에 기반한다.",
        "impact": 5
      },
      {
        "id": "SAJU-FIX-003",
        "tier": "B",
        "name": "오행 과다가 만드는 성격 과잉 — 자각 없는 반복적 과잉 행동",
        "tags": [
          "condition:excess",
          "unsung:사"
        ],
        "saju": "saju.elFull에서 특정 오행 ≥ 3.0 + OHENG_KW excess 키워드",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 오행 균형은 하늘 에너지와 숨겨진 에너지의 가중치로 계산되며, 특정 오행이 전체의 일정 비율을 넘으면 과다로 판별한다.",
        "impact": 7
      },
      {
        "id": "MBTI-FIX-001",
        "tier": "B",
        "name": "열등기능이 지목하는 평생의 성장 과제 — 가장 약한 고리",
        "tags": [
          "uses:inferior",
          "ref:MT_AXES"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_STACK_POSITIONS.inferior + MT_TYPES[code].stack[3] + MT_AXES (열등기능이 속한 축의 불균형)",
        "cross": "MBTI 단독. 가장 약한 성향은 네 가지 심리 성향 중 마지막에 자리하며, 이 사람에게 무엇이 가장 약한가를 가장 명확하게 특정해준다.",
        "impact": 9
      },
      {
        "id": "SAJU-FIX-001",
        "tier": "B",
        "name": "통변 흉(凶) 공식이 만드는 반복적 실패 회로",
        "tags": [
          "strength:신약+",
          "condition:excess",
          "ss:비겁",
          "ss:상관",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "unsung:태",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약",
          "tongbyeon:재성태과",
          "tongbyeon:관살혼잡"
        ],
        "saju": "SJ_detectTongbyeon (type='흉' 공식 — 비겁탈재, 재다신약, 관살혼잡, 인성태과, 식상태과, 비겁태과, 재성태과, 관성태과, 상관견관, 재생관살)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 에너지 구조의 불균형에서 자동으로 도출되는 흉 패턴은 명리학의 핵심 진단 도구다.",
        "impact": 9
      },
      {
        "id": "SAJU-FIX-009",
        "tier": "B",
        "name": "대운 전환기 부적응 — 이전 에너지에 대한 집착",
        "tags": [
          "unsung:사",
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "DW_TRANSITION_KW (대운 전환 키워드) + calcTransitionSpeed (전환 속도) + SJ_findGyowoongi (교운기 탐지)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 10년 흐름이 바뀌는 전환 속도는 에너지 거리, 원국과의 친화도, 자기 에너지 강도의 세 가지 변수로 계산되며, 전환 유형별 키워드와 결합된다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-002",
        "tier": "B",
        "name": "격국 패격(敗格) 조건이 만드는 재능 왜곡 패턴",
        "tags": [
          "uses:gyeokguk",
          "ss:겁재",
          "ss:상관",
          "unsung:사",
          "tongbyeon:효신탈식",
          "uses:tongbyeon",
          "condition:패격"
        ],
        "saju": "JAPYEONG_GG의 breaks 배열 (격국별 패격 조건: 효신탈식, 상관견관, 겁재탈재, 칠살무제 등)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 에너지 구조의 성패는 월지의 핵심 에너지와 원국 안의 방해 에너지 조합으로만 진단할 수 있는 고전 명리학 고유의 이론이다.",
        "impact": 8
      },
      {
        "id": "SAJU-FIX-006",
        "tier": "B",
        "name": "형살이 만드는 관계 내 반복적 실패 패턴",
        "tags": [
          "unsung:사",
          "relation:형"
        ],
        "saju": "SJ_checkSamhyung 결과 (무은지형/지세지형/무례지형/자형) + JIJI_HYUNG_KW",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 에너지 마찰은 땅 에너지 간 특정 조합에서만 발생하는 사주 고유의 관계 역학이다. 에너지 충돌이 한순간의 충격이라면, 에너지 마찰은 장기간 반복되는 갈등 패턴이라는 점에서 다르다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-012",
        "tier": "B",
        "name": "세운·월운이 원국 취약점을 발동시키는 타이밍 — '언제 터지는가'",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:wolun"
        ],
        "saju": "analyzeDWSEvsWonkuk (대운/세운 vs 원국 합충) + SJ_buildMonthlyHighlight + SEUN_HAPCHUNG_KW",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 올해 흐름과 월 흐름이 원국과 결합하거나 충돌하는 시점은 사주 고유의 시간축 분석이다. 고쳐야 할 점이 언제 가장 위험하게 발동하는지를 예측적으로 경고해준다는 점에서, 다른 모든 개선 포인트에 시기적 맥락을 더해준다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-011",
        "tier": "B",
        "name": "5신 기신(忌神)·구신(仇神)이 지목하는 피해야 할 에너지 방향",
        "tags": [
          "unsung:사",
          "uses:daewoon",
          "uses:sewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye (5신 배정) + SJ_getOsinLabel (대운/세운 5신 판별) + SJ_buildOsinText",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 가장 필요한 에너지와 방해 에너지의 체계는 에너지 상생상극 순환으로만 산출할 수 있는 명리학 고유의 개념이다. 결핍 오행이 '없는 것'이라면 방해 에너지는 '있지만 해로운 것'이라는 점에서 교정 방향이 완전히 다르다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-018",
        "tier": "B",
        "name": "5신 기신 달과 원국 합충 발동의 동시 작동 — 시기적 복합 위험 패턴",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:sewoon",
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_buildMonthlyHighlight (월별 5신 판별) + analyzeDWSEvsWonkuk (세운 vs 원국 합충) + SJ_generateKillingPoints (5신 충돌 로직)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 에너지 길흉 판별과 구조적 충격 타이밍을 동시에 적용하는 방식은 사주 시간축 분석의 가장 정교한 수준이다. 방해 에너지 달만 보거나 충돌 시점만 보는 단일 방식보다 훨씬 정밀한 위험 예측이 가능하다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-017",
        "tier": "B",
        "name": "음양 불균형이 만드는 행동 편향 — 극양의 무모함 vs 극음의 지체",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yinyang"
        ],
        "saju": "SJ_calcYinYang 결과 (yang, yin, label, desc) + ST5_PILLAR_PSYCHOLOGY (궁위별 음양 배치 의미)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 음양 비율은 사주 8자의 가장 기본적인 에너지 방향을 결정하며, 에너지 강약·에너지 구조·오행 균형과는 독립적으로 작동하는 별개의 축이다. 같은 극강 에너지라도 극양+극강이면 '불도저형 독불장군'이고, 극음+극강이면 '고집은 강한데 표현은 안 하는 속왕형'이라서 교정 방향이 완전히 달라진다.",
        "impact": 5
      },
      {
        "id": "MBTI-FIX-003",
        "tier": "B",
        "name": "의사결정 사각지대 — 판단할 때마다 빠뜨리는 것",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_DECISION_PROCESS[code].blind + MT_DECISION_PROCESS[code].flow",
        "cross": "MBTI 단독. 가장 약한 성향이 심리적 약점이라면, 의사결정 사각지대는 그것이 일상에서 매일 반복되는 행동적 표현이다. 추상적인 심리적 약점을 일상적 의사결정 수준으로 구체화해준다.",
        "impact": 8
      },
      {
        "id": "MBTI-FIX-004",
        "tier": "B",
        "name": "루프(loop) 상태 — 부기능을 건너뛰는 악순환 회로",
        "tags": [
          "unsung:태",
          "uses:auxiliary",
          "stress:loop"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop + MT_TYPES[code].loop",
        "cross": "MBTI 단독. 특정 성향 쌍이 반복적으로 맞물리는 패턴은 학술 연구보다는 MBTI 실무 커뮤니티에서 발전한 경험적 프레임워크다. 통제된 실증 연구는 없지만 임상적 관찰에서 반복적으로 보고된다. 사주의 흉 패턴이 수치 기반의 외부 검증 역할을 할 수 있다는 점은 흥미로운 지점이다.",
        "impact": 8
      },
      {
        "id": "MBTI-FIX-009",
        "tier": "B",
        "name": "SNS/소통 행동의 반복적 함정(darkside) — 디지털 환경에서 반복하는 에너지 소모",
        "tags": [
          "ref:MT_SOCIAL"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_SOCIAL_MEDIA[code].darkside + MT_SOCIAL_MEDIA[code].detox + MT_SOCIAL_MEDIA[code].consuming",
        "cross": "MBTI 단독. SNS에서 드러나는 어두운 면은 가장 약한 성향과 의사결정 사각지대가 디지털 환경에서 증폭된 것이다. 갈등 맹점이 관계 맥락, 소비 함정이 재정 맥락이라면, 이것은 디지털 맥락이라는 점에서 동일한 심리적 약점이 새로운 영역에서 표현되는 것이다.",
        "impact": 5
      },
      {
        "id": "SAJU-FIX-016",
        "tier": "B",
        "name": "오행 상생 단절이 만드는 능력 연결 실패 — '왜 재능이 성과로 안 이어지는가'",
        "tags": [
          "unsung:사",
          "unsung:절"
        ],
        "saju": "findBrokenChain 함수 결과 + OHENG_FLOW_DESC (5개 단절 구간별 해석)",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 오행 상생의 흐름이 끊기는 지점은 에너지 순환의 구조적 병목을 보여준다. 개별 오행의 과다나 결핍보다 에너지 간 연결에 초점을 맞춘다. 끊어진 오행을 직접 보충하거나, 그 오행을 키워주는 에너지를 활성화하는 것이 처방이 된다.",
        "impact": 6
      },
      {
        "id": "MBTI-FIX-005",
        "tier": "B",
        "name": "그립(grip) 상태 — 열등기능의 원시적 폭발",
        "tags": [
          "unsung:태",
          "uses:inferior",
          "stress:grip",
          "ref:MT_AXES"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_STRESS_STAGES.stage4_grip + MT_TYPES[code].stressPattern + MT_AXES의 gripDirection",
        "cross": "MBTI 단독. 극심한 스트레스 상태는 학술적으로도 근거가 있어 특정 성향 쌍의 반복 패턴보다 신뢰도가 높다. 사주의 흉 패턴이 '평소에 반복되는 회로'라면, 극심한 스트레스 상태는 '한계에 몰렸을 때의 폭발'이라는 점에서 시점과 강도가 다르다.",
        "impact": 7
      },
      {
        "id": "MBTI-FIX-006",
        "tier": "B",
        "name": "연애 갈등의 반복 패턴과 관계 파괴 트리거",
        "tags": [
          "ref:MT_LOVE"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_LOVE[code].conflict + MT_LOVE[code].breakup + MT_LOVE[code].dealbreaker + MT_LOVE[code].growthInLove",
        "cross": "MBTI 단독. 연애 갈등 패턴은 갈등 맹점이 친밀한 관계에 특화된 버전이다. 가장 약한 성향이 가장 민감하게 자극받는 영역이 바로 친밀한 관계라는 점에서 영향력이 크다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-015",
        "tier": "B",
        "name": "대운 십성이 활성화하는 시기별 교정 과제 — '지금 고쳐야 할 것'의 시간축",
        "tags": [
          "unsung:사",
          "uses:daewoon"
        ],
        "saju": "DW_SIPSUNG_KW[십성그룹][strong/weak] + AGE_DW_KW[나이대][십성그룹] + calcDaewoon 결과의 currentDWIdx",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 10년 흐름별 에너지 과제는 흐름이 바뀌는 전환기 탐지 및 전환 키워드와 연동되어, 이전 10년에서 현재 10년으로의 전환까지 포함한다. 고쳐야 할 점이 시간에 따라 달라진다는 것은 명리학의 핵심적인 차별점이다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-008",
        "tier": "B",
        "name": "공망 궁위가 만드는 반복적 허전함과 보상 행동",
        "tags": [
          "unsung:사",
          "uses:gongmang"
        ],
        "saju": "calcGongmang 함수 + GONGMANG_GUNGWI_KW + SJ_GONGMANG_GUNGWI",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 공망은 일주의 60갑자 순환에서 빠진 두 가지 땅 에너지라는 순수 명리 개념이다. 10년 흐름이나 올해 흐름에서 공망이 채워질 때 어떤 변화가 오는지도 예측할 수 있다.",
        "impact": 5
      },
      {
        "id": "MBTI-FIX-007",
        "tier": "B",
        "name": "소비 심리의 반복적 함정(money trap) — 돈에서 반복하는 실수",
        "tags": [
          "ref:MT_MONEY"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_MONEY[code].trap + MT_MONEY[code].tip + MT_MONEY[code].style",
        "cross": "MBTI 단독. 소비 함정은 가장 약한 성향과 의사결정 사각지대가 재정 맥락에서 구체화된 것이다. 갈등 맹점이 관계 맥락, 연애 갈등이 친밀 관계 맥락이라면, 이것은 재정 맥락이라는 점에서 동일한 구조적 약점이 다른 영역에서 표현되는 것이다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-013",
        "tier": "B",
        "name": "육친론이 지목하는 관계별 교정 과제 — 특정 관계에서 반복되는 에너지 충돌",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별][십성] + SJ_GUNGWI_DESC[궁위] + SSP[십성][궁위] + SS_CONTEXT[십성][궁위별 해석]",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 가족·배우자·자녀 등 관계별 과제는 성별, 에너지 유형, 사주 기둥 위치의 세 가지 차원을 조합해 특정하는 명리학 고유의 관계 분석 프레임워크다. 각 조합별로 구체적인 행동 기술이 제공된다.",
        "impact": 7
      },
      {
        "id": "SAJU-FIX-014",
        "tier": "B",
        "name": "암합이 만드는 무의식적 욕구 왜곡 — 본인도 모르는 반복적 끌림/회피 패턴",
        "tags": [
          "unsung:사",
          "relation:암합"
        ],
        "saju": "calcSajuForApp의 amhapResults + AMHAP_LAYERS (3층위 의식 수준) + classifyAmhap 함수",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 숨겨진 에너지 간의 암묵적 결합은 명리학 고유의 무의식 탐색 도구다. 의식·반의식·무의식의 세 층위로 나누는 구조는 심리학의 의식 층위 개념과 유사해 보이지만, 산출 방법은 간지 조합이라는 점에서 완전히 다르다.",
        "impact": 6
      },
      {
        "id": "MBTI-FIX-002",
        "tier": "B",
        "name": "갈등 스타일의 자동 맹점(blindSpot) — 싸울 때마다 반복하는 실수",
        "tags": [
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_CONFLICT_STYLES[code].blindSpot + MT_ANGER.byFunction[주기능/부기능의 축] + MT_ANGER.byType[code]",
        "cross": "MBTI 단독. 갈등 맹점은 가장 약한 성향이 관계 맥락에서 어떻게 나타나는가를 구체화한 것이다. 의사결정 사각지대가 판단 맥락이라면, 이것은 갈등 맥락이라는 점에서 서로 보완적이다.",
        "impact": 7
      },
      {
        "id": "MBTI-FIX-008",
        "tier": "B",
        "name": "우정 파괴의 반복 패턴 — 친구를 잃는 방식의 구조적 반복",
        "tags": [
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "해당 없음 (MBTI 단독)",
        "mbti": ": MT_FRIENDSHIP[code].breaking + MT_FRIENDSHIP[code].needing + MT_FRIENDSHIP[code].style",
        "cross": "MBTI 단독. 연애 갈등이 친밀한 관계의 파괴 패턴이라면, 이것은 우정 관계의 파괴 패턴이다. 같은 약점이 관계 유형에 따라 다르게 나타나므로, 고쳐야 할 점의 관계적 범위를 더 넓게 이해할 수 있다.",
        "impact": 6
      },
      {
        "id": "SAJU-FIX-005",
        "tier": "B",
        "name": "신강도 극단값이 만드는 관계적 핵심 과제",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk의 strengthScore/strengthGrade (극신강 ≥80%, 극신약 ≤25%) + SJ_buildStrengthText",
        "mbti": ": 해당 없음 (사주 단독)",
        "cross": "사주 단독. 나와 세상 사이의 에너지 균형은 내 편(나를 지지하는 에너지) 대 상대편(세상과 맞닿는 에너지)의 비율로 계산하는 사주 고유 방식이다. 이 비율이 극단적으로 치우칠 때만 보완이 필요한 약점으로 부각된다.",
        "impact": 8
      },
      {
        "id": "CROSS-FIX-010",
        "tier": "S",
        "name": "대운 십성 과제와 인지기능 발달 단계의 시간적 수렴 — 발달적 이중 성장",
        "tags": [
          "uses:daewoon",
          "uses:development"
        ],
        "saju": "DW_SIPSUNG_KW[십성그룹][strong/weak] + AGE_DW_KW[나이대][십성그룹] + calcDaewoon 결과",
        "mbti": ": MT_DEVELOPMENT_STAGES (인지기능 발달 단계별 과제) + MT_STACK_POSITIONS (기능 위치별 발달 시기)",
        "cross": "사주는 '이 10년에 어떤 에너지 과제가 오는가'를 보여주고, MBTI는 '이 나이에 어떤 심리적 성장 과제가 오는가'를 보여준다. 두 체계를 교차하면 이 시기에 이 사람에게 가장 중요한 성장 방향이 두 방향에서 동시에 가리켜진다. 구조적 특성, 상황적 특성에 이어 발달적 성장이라는 세 번째 관점을 완성한다.",
        "impact": 7
      },
      {
        "id": "CROSS-FIX-007",
        "tier": "S",
        "name": "시간적 계층별 교차 매핑 — 만성적 회로(루프×통변흉) vs 급성 폭발(그립×세운발동)",
        "tags": [
          "uses:tongbyeon",
          "uses:sewoon",
          "uses:wolun",
          "stress:grip",
          "stress:loop"
        ],
        "saju": "SJ_detectTongbyeon 흉 공식 (구조적/만성) + analyzeDWSEvsWonkuk 세운 발동 (상황적/급성) + SJ_buildMonthlyHighlight 월운 기신 달",
        "mbti": ": MT_STRESS_STAGES.stage3_loop (만성 악순환) + MT_STRESS_STAGES.stage4_grip (급성 폭발)",
        "cross": "오래 지속되는 패턴끼리, 특정 시기에 터지는 패턴끼리 묶어보면 처방의 시급도가 구체화된다. 오래 지속되는 패턴이 교차하면 평생 의식적으로 관리해야 할 과제이고, 특정 시기에 집중되는 패턴이 교차하면 그 시기에 집중적으로 대비해야 할 과제다. 같은 행동 증상이 같은 방향을 가리키는 것을 넘어, 그 증상이 얼마나 지속적인지 혹은 얼마나 폭발적인지까지 함께 파악할 수 있다는 점이 포인트다.",
        "impact": 7
      },
      {
        "id": "CROSS-FIX-001",
        "tier": "S",
        "name": "통변 흉 공식과 인지적 반복 회로의 행동 수렴 진단",
        "tags": [
          "condition:excess",
          "condition:lack",
          "ss:비겁",
          "ss:인성",
          "ss:관성",
          "ss:식상",
          "unsung:태",
          "uses:tongbyeon",
          "uses:dominant",
          "uses:inferior",
          "uses:tertiary"
        ],
        "saju": "SJ_detectTongbyeon의 흉 공식별 desc (인성태과='생각 과잉→행동 부족', 식상태과='표현 과잉→구설수', 비겁태과='자존심 과잉', 관성태과='스트레스 과다')",
        "mbti": ": 상대가 제시한 루프 패턴 (주기능-3차기능 직결 악순환) + 그립 패턴 (열등기능의 원시적 폭발)",
        "cross": "사주의 흉 패턴은 에너지 비중 수치에서 자동으로 산출되는 객관적 결과이고, MBTI의 반복 패턴은 성향 이론에서 도출되는 이론적 결과다. 서로 다른 방법론이 같은 증상을 동시에 짚어낸다면, 그 파악에 대한 확신은 어느 한 체계만 봤을 때보다 훨씬 높아진다. 두 체계를 함께 보는 본질적인 가치가 바로 여기에 있다.",
        "impact": 8
      }
    ],
    "기회의 시기": [
      {
        "id": "P-OPP-009",
        "tier": "B",
        "name": "연애/결혼 타이밍의 다변수 점수 — '올해가 인연의 해인가'",
        "tags": [
          "pillar:일지",
          "uses:daewoon",
          "uses:sewoon",
          "sinsal:도화"
        ],
        "saju": "SJ_findLoveTiming(배우자성 세운 + 일지합 + 도화발동 + 홍염살 + 대운 배우자성)",
        "mbti": ": 없음",
        "cross": "연애 타이밍은 올해 에너지의 성격, 내 사주에서 파트너와 연결되는 자리의 에너지 결합, 타고난 매력의 유무, 연애 에너지를 강하게 끌어올리는 특별한 기운, 10년 흐름의 에너지 성격, 이 다섯 가지 변수가 겹칠 때만 예측할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-OPP-001",
        "tier": "B",
        "name": "대운 십성이 결정하는 10년간 기회의 장르 — '이 10년은 무슨 기회의 시기인가'",
        "tags": [
          "uses:strength",
          "uses:daewoon"
        ],
        "saju": "DW_SIPSUNG_KW[십성그룹].strong/weak + analyzeGyeokguk → strengthGrade",
        "mbti": ": 없음",
        "cross": "10년 단위의 기회 장르 분류는 명리학 고유의 시간축 예측 영역이다. 10년 흐름의 에너지 유형과 자기 에너지 강약의 교차가 기회를 공격적으로 잡을지 방어적으로 지킬지를 결정한다.",
        "impact": 9
      },
      {
        "id": "P-OPP-010",
        "tier": "B",
        "name": "재물 타이밍의 다변수 점수 — '올해가 돈의 해인가'",
        "tags": [
          "ss:재성",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_findMoneyTiming(재성 세운 + 재성 지지 + 대운 재성 + 식상생재 시너지 + 5신)",
        "mbti": ": 없음",
        "cross": "재물 타이밍은 올해 흐름의 에너지 성격, 땅 에너지의 오행, 10년 흐름, 에너지들 사이에서 일어나는 서로 끌어당기고 부딪히는 작용, 그리고 나에게 힘이 되는 에너지와 나를 방해하는 에너지의 균형, 이 다섯 가지 변수가 겹칠 때만 예측할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-OPP-002",
        "tier": "B",
        "name": "세운 5신 판별에 의한 올해 기회/위험 등급 — '올해는 순풍인가 역풍인가'",
        "tags": [
          "uses:sewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye + SJ_getOsinLabel(세운 천간 오행)",
        "mbti": ": 없음",
        "cross": "내 에너지 흐름에 가장 잘 맞는 것과 방해가 되는 것을 기준으로 모든 외부 에너지를 이롭고 해로운 것으로 나누는 방식은 사주만의 개인화된 분류법이다. 같은 환경도 사람마다 다르게 작용하는 이유를 이 기준으로 설명할 수 있다.",
        "impact": 9
      },
      {
        "id": "P-OPP-005",
        "tier": "B",
        "name": "교운기 전환 속도의 3변수 결정 — '얼마나 빨리 새 에너지에 적응하는가'",
        "tags": [
          "condition:교운기"
        ],
        "saju": "calcTransitionSpeed(에너지 거리 × 원국 친화도 × 자아 강도)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 에너지 전환 속도 예측은 오행 관계 구조, 원국 배치, 내 에너지가 얼마나 충전되어 있는지라는 세 가지 사주 변수의 조합으로 파악할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-OPP-013",
        "tier": "B",
        "name": "세운 12운성이 결정하는 올해 에너지의 생명주기적 위치 — '올해는 시작인가, 정점인가, 끝인가'",
        "tags": [
          "uses:unsung",
          "uses:sewoon"
        ],
        "saju": "getUnsung(일간, 세운 지지) + UNSUNG_KW",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 에너지 성장 곡선은 에너지의 양이 아니라 각 에너지가 지금 어느 계절에 놓여 있는지, 즉 막 싹을 틔우는 시기인지 한창 무르익은 시기인지 서서히 내려가는 시기인지를 보여주는 또 다른 관점이다.",
        "impact": 7
      },
      {
        "id": "P-OPP-011",
        "tier": "B",
        "name": "월운 5신 분화에 의한 월별 기회 밀도 — '올해 안에서도 달마다 다르다'",
        "tags": [
          "relation:충",
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_buildMonthlyHighlight(월별 천간 오행 5신 + 월별 지지 합충)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 월 단위로 에너지 흐름을 세분화하면 한 해 안에서도 어느 달이 유리하고 어느 달이 조심스러운지를 구체적으로 살펴볼 수 있다.",
        "impact": 6
      },
      {
        "id": "P-OPP-012",
        "tier": "B",
        "name": "택일 가이드 — 목적별 행동 최적 월의 다변수 결정",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:wolun",
          "uses:taekil",
          "uses:osin"
        ],
        "saju": "SJ_buildTaekil(결혼/이사/개업/시험 × 월별 십성+5신+합충+신살)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 목적별 최적 시기는 에너지의 성격, 나에게 맞는 에너지와 맞지 않는 에너지, 에너지 결합과 충돌, 그리고 개인마다 다르게 부여되는 고유한 기운의 다양한 변수를 함께 살펴봐야 가늠할 수 있다.",
        "impact": 6
      },
      {
        "id": "P-OPP-006",
        "tier": "B",
        "name": "합 트리거 예보에 의한 에너지 폭발 시점 — '삼합이 완성되는 해'",
        "tags": [
          "relation:삼합",
          "uses:sewoon"
        ],
        "saju": "SJ_findHapTrigger(원국 반삼합 + 세운 지지)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 세 가지 땅 에너지가 하나로 모여 완성되는 강력한 에너지 흐름은 원국 땅 에너지 배치와 올해 흐름 땅 에너지의 교차에서 읽어낼 수 있는 사주 고유의 예측 영역이다.",
        "impact": 8
      },
      {
        "id": "P-OPP-014",
        "tier": "B",
        "name": "대운 vs 원국 합충형해 발동에 의한 10년간 변동 영역 — '이 10년에 무엇이 흔들리는가'",
        "tags": [
          "relation:충",
          "uses:daewoon"
        ],
        "saju": "analyzeDWSEvsWonkuk(대운 지지/천간 × 원국 4주) + SJ_IMPACT_SCORE",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 10년 흐름에서 에너지 결합과 충돌이 발동하는 시점은 어느 자리에서 변화가 일어나는지를 구체적으로 짚어낼 수 있는 사주 고유의 예측 영역이다.",
        "impact": 8
      },
      {
        "id": "P-OPP-016",
        "tier": "B",
        "name": "세운 십성이 결정하는 올해 사회적 에너지 모드 — '올해 어떤 모드로 살아야 하는가'",
        "tags": [
          "unsung:사",
          "uses:sewoon",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(일간, 세운 천간) + SS_CONTEXT[십성].general/career",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 올해 흐름이 내 삶에서 어떤 성격의 한 해인지를 세분화해서 보여주는 것은 사주 고유의 분류 방식이다.",
        "impact": 7
      },
      {
        "id": "P-OPP-007",
        "tier": "B",
        "name": "공망 해소 시점 — '비어있던 자리가 채워지는 해'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:gongmang"
        ],
        "saju": "calcGongmang → affected 궁위 + GONGMANG_FILL_KW + 세운/대운 지지",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 특정 자리의 에너지가 일시적으로 작동하지 않는 구간이 언제 다시 살아나는지는 60년 주기 순환 구조와 각 자리의 의미가 맞물릴 때 읽어낼 수 있는 사주 고유의 개념이다.",
        "impact": 7
      },
      {
        "id": "P-OPP-015",
        "tier": "B",
        "name": "인생 로드맵 — 대운 8기(80년) 통합 시간축 구조",
        "tags": [
          "unsung:태",
          "uses:daewoon",
          "uses:yukchin",
          "uses:osin"
        ],
        "saju": "SJ_buildLifeRoadmap(대운 8기 × 십성 시기 해석 + 5신 태그 + 육친 인연)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 인생 전체의 에너지 흐름을 한눈에 그려볼 수 있는 큰 그림은 사주만의 고유한 강점이다.",
        "impact": 10
      },
      {
        "id": "P-OPP-003",
        "tier": "B",
        "name": "대운-세운 5신 이중 구조에 의한 기회의 이중 필터 — '큰 흐름과 올해 파도의 교차'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_buildOsinText(대운 5신 + 세운 5신 동시 판별)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 10년 흐름과 올해 흐름을 함께 보면 큰 그림 속에서 올해가 어떤 위치인지를 구체적으로 파악할 수 있는 사주 고유의 시간축 구조다.",
        "impact": 10
      },
      {
        "id": "P-OPP-004",
        "tier": "B",
        "name": "교운기가 만드는 인생 전환점 — '문이 열리고 닫히는 시점'",
        "tags": [
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi + SJ_TRANSITION 16패턴",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 10년 흐름의 전환은 인생의 모드가 바뀌는 시점으로, 사주에서 미리 읽어낼 수 있는 영역이다.",
        "impact": 9
      },
      {
        "id": "P-OPP-008",
        "tier": "B",
        "name": "세운 vs 원국 합충형해에 의한 올해 변화 영역 특정 — '올해 어디가 흔들리는가'",
        "tags": [
          "relation:충",
          "uses:sewoon"
        ],
        "saju": "analyzeDWSEvsWonkuk(세운 지지 × 원국 4지지) + SEUN_HAPCHUNG_KW",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 올해 흐름의 땅 에너지가 원국의 특정 자리와 결합하거나 충돌하는 방식은 그 해에 어느 영역에서 변화가 생기는지를 짚어주는 사주 고유의 분석 방식이다.",
        "impact": 8
      }
    ],
    "나의 성격": [
      {
        "id": "P-CHAR-037",
        "tier": "A",
        "name": "갈등 반응의 사주 신강도 분기 — 극신강~극신약 5등급 × 일간 분노 양식",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "ss:상관",
          "unsung:사",
          "unsung:양",
          "axis:TF",
          "uses:intensity",
          "ref:MT_ANGER"
        ],
        "saju": "analyzeGyeokguk.strengthGrade(5등급) + analyzeGyeokguk.strengthScore(0~100) + P-CHAR-025의 일간 분노 양식 + 상관 유무",
        "mbti": ": P-CHAR-032의 MT_INTENSITY_PROFILES T/F 축 55/68/88 + MT_ANGER.byFunction",
        "cross": "분노의 양식과 방향을 넘어, 이번에는 분노를 실행할 힘의 강도를 함께 본다. 사주의 에너지 총량과 MBTI의 감정 우선 정도는 측정 대상이 다르다. 에너지 총량은 밀어붙일 수 있는 힘이고, 감정 우선 정도는 판단할 때 감정이 얼마나 앞서는지의 정도다. 두 체계를 교차할 때 진짜 가치는 단순 합산이 아니라 차이의 발견에 있다. 에너지가 넘치는데 감정에 절대적이면 폭주로 이어지기 쉽지만, 에너지가 부족한데 감정에 절대적이면 겉은 수용적인데 속은 용광로인 상태가 드러난다. 이 차이는 어느 한 체계만으로는 보기 어렵다.",
        "impact": 8
      },
      {
        "id": "P-CHAR-019",
        "tier": "A",
        "name": "의사결정 서열 교차 — 십성 비중 순위 × 인지기능 스택 순서",
        "tags": [
          "unsung:사",
          "uses:inferior",
          "ref:MT_DECISION"
        ],
        "saju": "analyzeGyeokguk.cnt의 5그룹 십성 수치 내림차순(P-CHAR-014)",
        "mbti": ": MT_DECISION_PROCESS — 유형별 4단계 의사결정 흐름 + blind spot + MT_STACK_POSITIONS.inferior의 에너지 소모",
        "cross": "사주는 어떤 에너지가 얼마나 강하게 작동하는지로 판단 우선순위를 보여주고, MBTI는 성향 배열로 의사결정 서열을 보여준다. 교차의 가치는 세 가지다. 첫째, 두 체계가 같은 방향을 가리키면 그 패턴에 대한 확신이 강해진다. 둘째, 방향이 다르면 타고난 에너지 구조와 자기보고 인지 선호 사이의 차이가 드러난다. 셋째, 두 체계에서 동시에 약한 영역이 겹치면 그 영역의 에너지 소모까지 두 방향에서 확인된다. 특히 세 번째가 중요한데, MBTI에서 가장 덜 발달된 성향이 소모하는 에너지와 사주에서 해당 에너지 성격이 없을 때 나타나는 체감 키워드가 서로 다른 언어로 같은 취약점을 가리키는 것을 두 방향에서 함께 확인할 수 있다.",
        "impact": 7
      },
      {
        "id": "CROSS-CHAR-014",
        "tier": "A",
        "name": "에너지 흐름 단절과 기능 발달 장애: 끊어진 상생 체인 × 3차 기능 미발달",
        "tags": [
          "condition:lack",
          "unsung:절",
          "uses:development",
          "uses:tertiary"
        ],
        "saju": "findBrokenChain(상생 체인 단절) × OHENG_FLOW_DESC(5개 단절 유형) × 결핍 오행(lackFull)",
        "mbti": ": MT_TYPES[type].stack[2](tertiary) × MT_STACK_POSITIONS.tertiary.role('미발달, 유치한 발현') × MT_DEVELOPMENT_STAGES('20~35세 3차기능 자각')",
        "cross": "사주에서 에너지 흐름이 끊긴 부분은 '어떤 에너지가 부족한가'를 보여주고(예: 불 에너지 부족 = 추진력 결핍), MBTI에서 상대적으로 약한 성향은 '어떤 사고 방식이 약한가'를 보여준다(예: 눈앞의 현실보다 가능성을 먼저 보는 경향이 강해 실질적인 경험을 잘 활용하지 못하는 성향). 두 체계를 함께 보면 '이 사람에게 추진력(불 에너지)이 부족하고, 동시에 경험에서 실질적인 것을 끌어내는 능력도 약한 이유는, 두 체계가 같은 빈 자리를 서로 다른 언어로 가리키고 있기 때문일 수 있다'는 입체적 파악이 가능해진다. 사주만 보면 '불 에너지가 부족하다'는 추상적 설명에 그치고, MBTI만 보면 '경험 활용 능력이 약하다'는 인지적 설명에 그치지만, 두 체계를 교차하면 처방도 두 배로 구체화된다. 불 에너지를 보충하는 활동(러닝, 댄스, 핫요가, 감각 일기 쓰기)과 지금 이 순간의 감각 경험을 의식적으로 기록하는 습관을 동시에 실천할 수 있다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-026",
        "tier": "A",
        "name": "자기돌봄 교차 — 용신 활동 × 인지기능 회복 메커니즘",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "ref:MT_SELFCARE"
        ],
        "saju": "SJ_calcOsinChegye의 용신 오행 + SJ_GAEUN/SAJU_GAEUN의 용신별 회복 활동(actions/anchor/food) + 기신 오행(회피해야 할 활동)",
        "mbti": ": P-CHAR-022의 MT_SELFCARE + MT_STRESS_STAGES의 intervention",
        "cross": "사주는 내 에너지 흐름에 맞는 활동과 맞지 않는 활동을 구분해 에너지 효율이 높은 활동을 보여주고, MBTI는 성향 배열 기반의 회복 처방을 보여준다. 교차의 가치는 두 가지다. 두 체계가 같은 방향이면 회복 처방의 확신이 강해지고, 반대 방향이면 에너지 구조가 필요로 하는 것과 인지적으로 편안한 것이 다른 지점이 드러나 더 통합적인 처방을 찾을 수 있다. 특히 내 흐름에 맞지 않는 활동과 MBTI의 과잉 시 위험 교차가 핵심이다. 사주에서 과도한 루틴이 방해가 되는 사람이 MBTI에서도 지나치게 안정만 추구하다 스스로 갇히는 위험이 있다면, 안정 추구가 오히려 함정이라는 두 겹의 경고가 된다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-027",
        "tier": "A",
        "name": "우정 역학 교차 — 비겁/식상 배치 × 인지기능 우정 스타일",
        "tags": [
          "ss:비겁",
          "ss:겁재",
          "ss:비견",
          "ss:식상",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt의 비겁 수치 + 식상 수치 + 비견/겁재 개별 비중(_raw) + 궁위별 비겁 배치(SIPSUNG_GUNGWI_KW.비견/겁재)",
        "mbti": ": P-CHAR-023의 MT_FRIENDSHIP (style/making/maintaining/giving/needing/breaking)",
        "cross": "사주는 나 자신의 에너지와 감정·표현 에너지 배치로 우정의 에너지 구조를 보여주고, MBTI는 성향 배열로 우정 스타일을 보여준다. 두 체계가 같은 방향이면 우정 패턴의 확신이 강해지고, 다른 방향이면 에너지 구조가 원하는 우정과 인지적으로 편안한 우정이 다른 지점이 드러난다. 특히 관계를 끊는 패턴의 교차가 가치 있다. 사주에서 자기 에너지와 경쟁 기질이 강하면 자신의 영역을 침범당할 때 관계를 끊고, INFP는 가치관이 배반당했다고 느낄 때 조용히 떠난다. 두 체계의 관계 단절 트리거가 다르면, 이 사람은 상황에 따라 다른 방식으로 관계를 끊는다는 복합적 분석이 가능하다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-029",
        "tier": "A",
        "name": "5신 에너지 효율 지도 — 활동별 에너지 소모/충전 차이",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye의 5신 배정(용신/희신/한신/구신/기신) + SJ_getOsinLabel + SJ_GAEUN의 오행별 활동",
        "mbti": ": (META-MBTI-004의 '에너지 소모 원칙'에 대한 사주 측 대응)",
        "cross": "사주는 에너지 효율 체계로 오행별 에너지 소모를 보여주고, MBTI는 성향 배열 위치로 에너지 소모를 보여준다. 두 체계의 에너지 소진 영역이 같은 활동 영역을 가리키면, 그 영역의 회피나 조절이 구조적으로 필요하다는 신호가 된다. 특히 처방의 교차가 핵심이다. 사주의 구체적 활동 처방과 MBTI의 인지적 처방을 통합하면 무엇을 어떤 방식으로 해야 하는가라는 실질적인 처방이 가능해진다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-032",
        "tier": "A",
        "name": "갈등 반응 강도 분기 — F/T 축 강도 × 분노 duration 교차",
        "tags": [
          "ss:상관",
          "unsung:양",
          "relation:충",
          "axis:TF",
          "uses:intensity",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "P-CHAR-025의 일간 분노 양식 + 상관 유무 + 충 내성",
        "mbti": ": MT_ANGER.byFunction의 duration/resolution + MT_INTENSITY_PROFILES의 T/F 축 55/68/88 + MT_CONFLICT_STYLES.blindSpot",
        "cross": "분노의 방향을 넘어, 이번에는 분노의 강도를 교차한다. 감정을 얼마나 절대적으로 우선시하느냐에 따라 같은 에너지 구조와 같은 갈등 스타일이라도 실제 발현이 완전히 달라진다. 감정에 절대적이면서 감정을 밖으로 내보내는 에너지가 없는 조합은 MBTI 단독으로도 사주 단독으로도 각각 보이지만, 교차의 고유 가치는 감정적 절대성과 표출 에너지 부재가 결합해 만드는 극심한 내적 압력이라는 구체적인 상태를 짚어낼 수 있다는 점이다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-044",
        "tier": "A",
        "name": "연애 단계별 교차 분기 — earlyDating vs deepRelation에서 교차 방향이 바뀌는 패턴",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "sinsal:도화",
          "uses:intensity",
          "ref:MT_LOVE"
        ],
        "saju": "P-CHAR-035의 배우자궁 4변수(일지 십성/12운성/도화살/배우자성)",
        "mbti": ": MT_LOVE.earlyDating vs MT_LOVE.deepRelation의 단계별 차이 + MT_LOVE.growthInLove + MT_INTENSITY_PROFILES.F/T 강도",
        "cross": "연애 패턴의 정적 교차를 넘어, 연애가 시간적으로 진행되면서 교차의 방향이 어떻게 변하는지를 다룬다. 초기 만남에서는 시너지였던 조합이 깊은 관계로 접어들면서 차이로 전환될 수 있다. 이것은 사주만으로도 MBTI만으로도 보기 어려운 흐름의 변화다. 특히 관계 안에서의 성장 방향과 나의 배우자 자리에 담긴 에너지의 교차는 관계 성장의 방향에 대한 구체적인 힌트를 두 방향에서 동시에 제공해준다.",
        "impact": 7
      },
      {
        "id": "CROSS-CHAR-004",
        "tier": "A",
        "name": "내면 갈등/조화 구조: 루프/그립 × 합충 역학",
        "tags": [
          "relation:충",
          "stress:grip",
          "stress:loop",
          "ref:MT_AXES"
        ],
        "saju": "원국 내 합충형해(CHEONGAN_HAP/CHUNG, JIJI 합충형해) × 궁위 조합(CHUNG_GUNGWI_KW, HAP_GUNGWI_KW)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop(유형별 루프 패턴) × stage4_grip × MT_AXES(4축 긴장 관계)",
        "cross": "사주는 갈등이 '어디서' 생기는지(어떤 자리 사이에서 충돌이 일어나는지)를 보여주고, MBTI 성향 분석은 갈등이 '어떤 패턴으로' 진행되는지(처음에는 작은 불편함으로 시작해 긴장이 쌓이고 점점 감당하기 어려워지다가 결국 폭발하고 이후 회복되는 흐름)를 설명한다. 두 체계를 함께 보면 갈등의 발생 위치와 진행 방식을 동시에 설명할 수 있다. 특히 주목할 점은, 극심한 갈등을 겪고 난 뒤 자신의 가장 약한 면을 더 깊이 이해하게 되어 성장의 기회가 된다는 MBTI의 관점이, 사주에서 '충돌이 반드시 나쁜 것이 아니라 필요한 변화를 촉발한다'는 관점과 같은 방향을 가리킨다는 것이다. 두 체계 모두 갈등을 성장의 계기로 바라보는 시각을 공유한다.",
        "impact": 8
      },
      {
        "id": "CROSS-CHAR-016",
        "tier": "A",
        "name": "인지 성숙도와 에너지 성숙도의 교차: 같은 기능이 성장하는 두 가지 축",
        "tags": [
          "strength:신강+",
          "uses:strength",
          "uses:daewoon",
          "uses:development",
          "ref:MT_MATURITY"
        ],
        "saju": "신강등급(strengthGrade 5단계) × 대운 십성 전환 횟수(DW_TRANSITION_KW 누적 경험) × 나이대(AGE_DW_KW)",
        "mbti": ": MT_MATURITY[fn](immature/developing/mature 3단계) × MT_DEVELOPMENT_STAGES(6단계 발달) × MT_STACK_POSITIONS(위치별 발달 시기)",
        "cross": "심리적 성숙도는 의식적 노력과 경험에 의해 같은 성향의 질이 변하는 것이고, 에너지 성숙도는 내 에너지가 얼마나 충전되어 있는지와 10년 흐름 경험 누적에 의해 같은 에너지 구조의 발휘가 변하는 것이다. 이 둘은 같은 현상의 다른 축이다. 예를 들어 아직 자기 성향을 충분히 다루지 못하는 INFP가 감정·창의 에너지가 넘치는 구조라면, 표현 욕구는 폭발하는데 자기 감정을 절대진리로 여겨 타인의 비판을 수용하지 못하는 창작자가 된다. 재능은 있지만 피드백 수용이 불가한 상태다. 같은 INFP가 자기 성향을 충분히 이해하고 다룰 수 있는 단계에 이르고 에너지가 안정적으로 균형 잡힌 구조라면, 표현이 적절하고 타인의 다른 가치도 존중하는 협력적 창작자가 된다. 단독 체계에서는 성향을 아직 충분히 다루지 못하는 상태 또는 감정·창의 에너지가 넘치는 구조라고만 말하지만, 교차하면 이 사람의 미숙함이 에너지적으로 어떤 형태를 취하는지까지 구체화된다.",
        "impact": 6
      },
      {
        "id": "CROSS-CHAR-007",
        "tier": "A",
        "name": "갈등 스타일: 분노 표현 패턴 × 합충 궁위",
        "tags": [
          "relation:충",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "원국 내 충 위치(CHUNG_GUNGWI_KW) × 일간 오행(ST5_TGAN_DEEP)",
        "mbti": ": MT_ANGER.byFunction[dominant_fn] × MT_CONFLICT_STYLES[type] × MT_ANGER.byType[type]",
        "cross": "사주는 어디서 갈등이 생기는가, 즉 어느 자리 사이의 에너지 충돌인지를 보여주고, MBTI는 어떻게 갈등을 처리하는가, 즉 유형별 분노 표현과 갈등 스타일을 설명한다. 두 체계를 교차하면 갈등의 원인과 심리적 발현을 동시에 볼 수 있다. 예를 들어 사회적 자리와 내면 자리 사이에 에너지 긴장이 있는 INFP라면, 가치가 무시될 때 갈등이 터진다는 패턴이 직장 영역에서 반복될 가능성이 높다는 것을 알 수 있다.",
        "impact": 6
      },
      {
        "id": "CROSS-CHAR-015",
        "tier": "A",
        "name": "자기인식 정확도: 겉-속 괴리 크기가 자기이해를 왜곡하는 정도",
        "tags": [
          "pillar:일지",
          "relation:충",
          "uses:ilju",
          "uses:osin",
          "uses:sipsung_rel",
          "uses:shadow",
          "uses:mistype"
        ],
        "saju": "일간-일지 십성 관계(SS_CONTEXT) × ILJU_KW core vs shadow 괴리 × 원국 내 충 개수(calcRelations.jijiChung)",
        "mbti": ": MT_MISTYPE(오인 패턴 8쌍) × MT_TYPES[type].stack[0] vs stack[3] 거리 × MT_SHADOW_BY_TYPE[type].opposing",
        "cross": "사주는 겉과 속의 차이가 구조적으로 얼마나 큰지를 파악할 수 있고, MBTI는 그 차이가 자기인식에 미치는 구체적 영향을 설명할 수 있다. 두 체계를 교차하면 이 사람은 구조적으로 겉과 속의 차이가 크기 때문에 자기 유형을 이렇게 오인할 가능성이 높다는 것을 알 수 있다. 단독으로는 겉과 속이 다르다거나 유형을 잘못 인식할 수 있다고만 말하지만, 교차하면 왜 이 사람이 특히 자기를 잘못 이해하는가에 대한 구체적인 설명이 된다.",
        "impact": 5
      },
      {
        "id": "CROSS-CHAR-013",
        "tier": "A",
        "name": "에너지 회복 메커니즘: 자기돌봄 패턴 × 조후 에너지 필요",
        "tags": [
          "uses:johu",
          "uses:yongshin",
          "uses:gaeun",
          "uses:dominant",
          "ref:MT_SELFCARE"
        ],
        "saju": "조후 필요 오행(ST5_JOHU × JOHU 120개 테이블) × 용신 오행(SJ_extractYongshinOh) × SJ_GAEUN(개운법)",
        "mbti": ": MT_SELFCARE[type].recharge × warning × tip × MT_TYPES[type].stack[0..1] × MT_FUNCTIONS[dominant].growthDirection",
        "cross": "MBTI의 자기 돌봄은 글쓰기, 새로운 경험, 지적 탐구 같은 인지적 방식으로 회복을 설명하고, 사주의 필요 에너지 분석은 '물 에너지가 필요하다', '불 에너지가 과잉이다' 같은 에너지 유형으로 필요를 설명한다. 두 체계를 함께 보면 '이 사람에게는 냉각과 유연성을 주는 물 에너지가 필요한데, 그것을 인지적으로는 새로운 가능성을 탐색하는 방식으로 실현할 수 있다'는 구체적인 처방이 가능해진다. 사주만 보면 '물 에너지가 필요하다'는 추상적 조언에 그치고, MBTI만 보면 '새로운 가능성을 탐색하라'는 일반적 조언에 그치지만, 두 체계를 교차하면 '왜 이 사람에게 특히 이 방식이 필요한가'에 대한 두 방향의 근거가 생긴다.",
        "impact": 5
      },
      {
        "id": "P-CHAR-025",
        "tier": "A",
        "name": "갈등 반응의 교차 분석 — 일간 오행 분노 패턴 × 인지기능 갈등 스타일",
        "tags": [
          "ss:상관",
          "ss:식상",
          "unsung:양",
          "relation:충",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "일간 오행의 분노 양식(ST5_TGAN_DEEP) + profileAnalysis.angerType(7종) + 상관 유무/강도(analyzeGyeokguk.cnt 식상 수치 + _raw 상관 개수) + 원국 충 개수(calcRelations.jijiChung.length)",
        "mbti": ": P-CHAR-021의 MT_CONFLICT_STYLES + MT_ANGER.byFunction",
        "cross": "사주는 나 자신의 에너지 성격과 감정을 밖으로 내보내는 에너지, 에너지 충돌 조합으로 갈등 반응의 에너지 구조를 보여주고, MBTI는 성향 기반 갈등 스타일을 보여준다. 교차의 가치는 세 가지다. 같은 방향이면 갈등 반응 패턴을 두 방향에서 확인하고, 다른 방향이면 타고난 에너지 구조와 학습된 인지 선호 사이의 갈등 반응 차이가 드러난다. 특히 감정을 밖으로 내보내는 에너지의 유무와 분노가 얼마나 오래 지속되는지의 교차가 가치 있다. 사주에서 감정을 밖으로 내보내는 에너지가 없어 감정을 표출하지 못하는 사람이 MBTI에서도 분노가 매우 오래 지속된다면, 감정 축적이 두 방향에서 동시에 확인되는 셈이다.",
        "impact": 8
      },
      {
        "id": "P-CHAR-031",
        "tier": "A",
        "name": "소비 심리의 인지기능적 분석 — 돈에 대한 태도",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "unsung:사",
          "unsung:태",
          "ref:MT_MONEY"
        ],
        "saju": "(대응 사주 변수: analyzeGyeokguk.cnt의 재성 수치 + 정재/편재 비중(_raw) + 궁위별 재성 배치(SIPSUNG_GUNGWI_KW.정재/편재) — 재성 강약이 물질적 감각을 결정)",
        "mbti": ": MT_MONEY (유형별 style/pattern/trap/tip)",
        "cross": "사주는 재물 관련 에너지 배치로 물질적 감각의 에너지 구조를 보여주고, MBTI는 성향 배열로 소비 심리를 보여준다. 같은 방향이면 소비 패턴을 두 방향에서 확인하고, 다른 방향이면 타고난 물질 감각과 인지적 소비 방식의 차이가 드러난다. 특히 함정 패턴의 교차가 가치 있다. 사주에서 큰 판을 벌이고 싶은 욕구가 강해 투기적 성향이 있고, MBTI에서도 새로운 것에 무한 투자하다 미완성 프로젝트로 돈을 낭비하는 패턴이 있다면, 큰 판에 즉흥적으로 투자하는 위험이 두 방향에서 동시에 확인된다.",
        "impact": 5
      },
      {
        "id": "P-CHAR-035",
        "tier": "A",
        "name": "연애 패턴의 사주 4변수 교차 — 배우자궁 에너지 × 인지기능 연애 스타일",
        "tags": [
          "ss:편재",
          "ss:정재",
          "pillar:일지",
          "uses:unsung",
          "unsung:사",
          "relation:충",
          "uses:sewoon",
          "sinsal:도화",
          "uses:sipsung_rel",
          "ref:MT_LOVE"
        ],
        "saju": "일지 지장간 정기 십성(jiSS[2].ss) + 일지 12운성(SJ_UNSUNG_MEANING[uns[2]].spouse) + 도화살/홍염살 유무·궁위(SJ_getDohwa/calcExtraSinsal HONGYEOM) + 배우자성의 정재/편재 질적 차이(SS_CONTEXT.정재.spouse vs SS_CONTEXT.편재.spouse) + 세운 일지 충 여부(SEUN_HAPCHUNG_KW.충.일지)",
        "mbti": ": P-CHAR-030의 MT_LOVE (attract/loveLanguage/earlyDating/deepRelation/conflict/breakup/dealbreaker/growthInLove)",
        "cross": "사주는 나의 배우자 자리의 네 가지 변수로 연애 에너지 구조를 보여주고, MBTI는 성향 배열로 연애 인지 스타일을 보여준다. 교차의 고유 가치는 세 가지다. 두 체계가 같은 방향이면 연애 패턴을 두 방향에서 확인하고, 다른 방향이면 에너지적 끌림과 인지적 선호의 차이가 드러난다. 특히 나의 배우자 자리에 여러 사람과 쉽게 연결되고 관계를 넓히는 에너지가 있어 다양한 인연이 자연스럽게 모이는 구조인데 INFP처럼 깊은 한 사람을 원하는 성향이라면, 이 차이가 연애에서 반복되는 갈등의 뿌리가 된다. 또한 관계 파탄의 시간적 트리거는 사주에서만 예측 가능한 언제라는 정보를 추가해 MBTI의 무엇과 결합할 수 있다.",
        "impact": 8
      },
      {
        "id": "CROSS-CHAR-003",
        "tier": "A",
        "name": "성격 사각지대: 열등기능/그림자 × 결핍 에너지",
        "tags": [
          "condition:lack",
          "unsung:사",
          "uses:inferior",
          "uses:shadow"
        ],
        "saju": "부족/결핍 오행(lackFull) × OHENG_KW.lack/zero 키워드 × findBrokenChain(끊어진 상생)",
        "mbti": ": MT_TYPES[type].stack[3](inferior) + MT_SHADOW_BY_TYPE[type] × MT_STACK_POSITIONS.inferior + MT_SHADOW_POSITIONS.demon",
        "cross": "사주는 다섯 가지 에너지 중 무엇이 결핍되어 있는지를 구체적으로 지목하고, MBTI는 그 결핍이 어떻게 작동하는지, 즉 극심한 스트레스 상황에서 평소와 전혀 다른 모습이 튀어나오는 방식을 설명한다. 두 체계를 교차하면 결핍의 내용과 역동을 동시에 잡을 수 있다. 특히 극한의 스트레스 상황에서 결핍된 성향이 어떤 구체적 행동으로 나타나는지를 유형별로 설명할 수 있어, 사주의 에너지 결핍 키워드보다 행동 예측이 더 생생하게 그려진다.",
        "impact": 7
      },
      {
        "id": "CROSS-CHAR-012",
        "tier": "A",
        "name": "사회적 역할 스타일: 상호작용 스타일 × 격국의 사회적 포지션",
        "tags": [
          "strength:신강+",
          "uses:strength",
          "uses:gyeokguk",
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "격국 유형(JAPYEONG_GG role) × 신강등급(strengthGrade) × 월주 십성(SS_CONTEXT 월주 영역)",
        "mbti": ": MT_INTERACTION_STYLES[style] × MT_TYPES[type].interactionStyle × MT_TYPES[type].stack[0..1]",
        "cross": "MBTI는 이 사람이 집단에서 자연스럽게 맡는 역할을 보여주고, 사주의 에너지 구조는 이 사람의 에너지가 향하는 사회적 방향을 보여준다. 두 체계를 교차하면 에너지 방향과 역할 방식이 서로 맞는지 엇갈리는지를 볼 수 있다. 예를 들어 사주에서 안정과 체계를 향하는 에너지 구조인 사람이 MBTI에서 분위기를 띄우고 참여를 이끄는 역할이라면, 에너지 방향은 안정과 질서인데 사회적 역할은 열정적 참여 유도다. 이 사람은 규율을 열정적으로 전파하는 사람이거나 규율과 자유 사이에서 갈등하는 사람이 된다. 단독으로 볼 때는 안정 지향 또는 분위기 메이커 중 하나만 보이지만, 교차하면 이 두 면이 어떻게 공존하는지가 드러난다.",
        "impact": 5
      },
      {
        "id": "CROSS-CHAR-005",
        "tier": "A",
        "name": "발달 시간축: 인지기능 발달 단계 × 대운 성격 모드 전환",
        "tags": [
          "uses:daewoon",
          "condition:교운기",
          "uses:development"
        ],
        "saju": "현재 대운 십성(DW_SIPSUNG_KW) × 대운 전환(DW_TRANSITION_KW) × 나이대(AGE_DW_KW)",
        "mbti": ": MT_DEVELOPMENT_STAGES(6단계 발달) × MT_STRESS_STAGES.stage5_recovery(통합) × MT_STACK_POSITIONS(기능별 발달 시기)",
        "cross": "MBTI의 성향 발달은 보편적이어서 모든 유형이 비슷한 순서로 성장하고, 사주의 10년 흐름은 개인적이어서 각 사주마다 다른 주기로 변화한다. 두 체계를 교차하면 보편적 성장 과제와 개인적 에너지 변화가 합쳐져, 왜 이 사람은 35세에 위기가 왔는데 저 사람은 28세에 왔는가를 설명할 수 있다. MBTI만으로는 30대에 새로운 면이 깨어난다는 보편 흐름밖에 말할 수 없지만, 개인의 10년 흐름 주기와 교차하면 이 사람의 30대 초반은 자기 자신에 대한 새로운 자각과 에너지 모드 전환이 겹쳐 특히 격변기라는 구체적인 그림이 그려진다.",
        "impact": 7
      },
      {
        "id": "CROSS-CHAR-002",
        "tier": "A",
        "name": "성격 표현 강도 분화: 선호 강도 × 격국-신강도",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "uses:gyeokguk",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "격국 유형(JAPYEONG_GG) × 신강등급(strengthGrade 5단계: 극신강/신강/중화/신약/극신약)",
        "mbti": ": MT_INTENSITY_PROFILES 축별 강도(55/68/88) × MT_TYPES[type].stack 기능 순서",
        "cross": "사주는 에너지 구조의 방향과 강도라는 두 가지 차원이고, MBTI는 성향의 방향, 선호 강도, 심리적 성숙도라는 세 가지 차원이다. 두 체계를 교차하면 방향, 강도, 성숙도를 입체적으로 살펴볼 수 있다. 특히 성숙도가 핵심인데, 아직 자기 성향을 충분히 다루지 못하는 단계에서는 자기 감정을 절대진리로 여기고 비판을 공격으로 받아들이지만, 자기 성향을 잘 이해하고 다룰 수 있는 단계에서는 확고한 내면 가치를 지니면서도 타인의 다른 가치를 존중한다. 같은 강도라도 성숙도에 따라 건강한 표현과 그렇지 않은 표현이 갈리는데, 이 성숙도의 차이는 두 체계를 교차할 때 비로소 온전히 드러나는 고유한 발견이다.",
        "impact": 8
      },
      {
        "id": "P-CHAR-040",
        "tier": "A",
        "name": "갈등 반응의 Fi/Fe 분기 — 같은 F 88이라도 주기능에 따라 완전히 다른 양상",
        "tags": [
          "uses:strength",
          "ss:상관",
          "unsung:양",
          "cf:Fi",
          "cf:Fe",
          "uses:dominant",
          "intensity:88",
          "uses:intensity",
          "ref:MT_ANGER"
        ],
        "saju": "P-CHAR-037의 analyzeGyeokguk.strengthGrade(신강도 5등급) + P-CHAR-025의 일간 분노 양식 + 상관 유무",
        "mbti": ": MT_ANGER.byFunction.Fi vs MT_ANGER.byFunction.Fe + MT_INTENSITY_PROFILES.F(55/68/88) + MT_TYPES.stack[0]이 Fi인지 Fe인지 구분",
        "cross": "에너지 총량과 감정 판단 강도를 교차하는 것에서 한 발 더 나아가, 같은 감정 중심 성향 안에서도 '내 감정을 내면에서 스스로 처리하는 방식'과 '관계 속에서 상대와 함께 감정을 처리하는 방식'이 만드는 질적 차이를 세분화할 수 있다. MBTI에서 이 두 방식의 구분은 이미 존재하고, 사주에서 내 에너지가 얼마나 충전되어 있는지의 구분도 이미 존재한다. 두 체계를 교차할 때의 고유한 가치는, 에너지가 부족한 상태에서 내면 기준으로 감정을 처리하는 사람과 관계 속에서 감정을 처리하는 사람이 만드는 완전히 다른 갈등 양상을 짚어낼 수 있다는 점이다. 내면 기준으로 감정을 처리하는데 에너지가 부족한 사람은 감정을 오래 쌓아두다 관계를 단절하는 방식으로 표출하고, 관계 속에서 감정을 처리하는데 에너지가 부족한 사람은 상대를 수용하다 스스로를 소진하는 방식으로 표출한다. 이 두 양상은 에너지 총량이라는 동일한 조건에서도 감정 처리 방식의 질적 차이에 의해 전혀 다른 방향으로 갈라진다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-036",
        "tier": "A",
        "name": "소비 심리의 사주 통변 교차 — 정재/편재 비중 + 통변 공식 × 인지적 소비 스타일",
        "tags": [
          "ss:비겁",
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "ss:식상",
          "unsung:사",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:비겁탈재",
          "ref:MT_MONEY"
        ],
        "saju": "정재/편재 개별 비중(analyzeGyeokguk._raw 정재/편재) + 식상생재 여부(SJ_detectTongbyeon) + 비겁탈재 여부(SJ_detectTongbyeon) + SJ_findMoneyTiming의 재물 성향 텍스트 + 궁위별 재성 배치(SIPSUNG_GUNGWI_KW.정재/편재)",
        "mbti": ": P-CHAR-031의 MT_MONEY (style/pattern/trap/tip)",
        "cross": "사주만으로는 재물 에너지의 구조(꾸준한 수입 추구형인지 큰 기회 도전형인지)를 보여주고, MBTI만으로는 성향에 기반한 소비 심리를 보여준다. 두 체계를 교차할 때 특히 핵심이 되는 것은 '함정 패턴'의 교차다. 사주에서 내 에너지가 재물 에너지를 오히려 흩어버리는 구조적 손실 패턴이 있고, MBTI에서도 나눔과 공유를 과도하게 하는 성향이 확인된다면, '구조적 재물 손실 경향'과 '인지적 나눔 과다'가 두 방향에서 동시에 확인되어 재무적 경고로서의 설득력이 높아진다. 이것은 어느 한 체계만으로는 볼 수 없는 교차만의 고유한 가치다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-020",
        "tier": "A",
        "name": "성격 내 결합/충돌 구조의 교차 — 합충 × 인지기능 상호작용 패턴",
        "tags": [
          "relation:충",
          "ref:MT_AXES"
        ],
        "saju": "calcRelations 함수의 합충 존재 여부 + 궁위(P-CHAR-016)",
        "mbti": ": MT_FUNCTION_INTERACTIONS의 tension/complement/resonance + MT_AXES의 시소 역학",
        "cross": "사주는 에너지 결합·충돌·마찰의 자리별 의미를 완결적으로 분석할 수 있고, MBTI는 성향 간 긴장·보완·공명 관계를 분석할 수 있다. 교차의 가치는 '이 사람 안에 에너지 충돌이 있는가'를 두 체계가 각자의 방식으로 함께 확인하는 데 있다. 단, 자리별 세분화는 사주 고유의 메커니즘이므로 교차 범위는 그 부분을 제외하고 적용한다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-008",
        "tier": "A",
        "name": "사회적 역할 경향의 교차 — 격국 × 기질/상호작용 스타일",
        "tags": [
          "uses:strength",
          "gyeokguk:식신격",
          "gyeokguk:상관격",
          "gyeokguk:정재격",
          "ss:식신",
          "ss:상관",
          "ss:정재",
          "unsung:사",
          "ref:MT_INTERACTION_STYLES",
          "ref:MT_TEMPERAMENTS",
          "temperament:SJ"
        ],
        "saju": "격국 유형(식신격/상관격/정재격 등) × 신강도",
        "mbti": ": MT_TEMPERAMENTS (NF/NT/SP/SJ 기질) + MT_INTERACTION_STYLES (behind-the-scenes/chart-the-course/get-things-going/in-charge)",
        "cross": "사주는 에너지 구조를 통해 사회적 역할을 예측하고, MBTI는 기질과 상호작용 스타일로 예측한다. 교차의 가치는 두 예측이 일치하면 확신도가 높아지고, 불일치하면 '잠재력과 현재 행동 사이의 갭'을 발견하는 데 있다. MBTI에서 주도형은 통제권을 잃거나 비효율이 방치될 때 스트레스를 받고, 지원형은 의견을 묻지 않고 일방적으로 결정될 때 스트레스를 받는다. 에너지 구조와 교차하면 스트레스 취약점도 두 방향에서 함께 살펴볼 수 있다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-006",
        "tier": "A",
        "name": "의식-무의식 이중 구조의 교차 해석",
        "tags": [
          "pillar:일지",
          "uses:dominant",
          "uses:inferior",
          "ref:MT_AXES"
        ],
        "saju": "일간(의식적 자아) × 일지(무의식적 욕구)의 오행 상생/상극 관계",
        "mbti": ": MT_AXES의 주기능-열등기능 시소 역학 + MT_STACK_POSITIONS dominant(의식 중심) vs inferior(무의식 그립)",
        "cross": "사주는 나 자신의 에너지와 나의 배우자 자리 에너지가 서로 맞부딪힐 때 겉과 속이 다른 이유를 에너지 구조로 풀어낼 수 있고, MBTI는 성향 불균형이나 극심한 스트레스 빈도로 같은 현상을 설명할 수 있다. 교차의 가치는 두 체계의 예측이 일치할 때 더 믿음직한 그림이 그려지고, 불일치할 때 더 깊은 개인차 탐구가 필요하다는 신호를 받는 데 있다. 두 체계는 각각 다른 언어로 같은 현상의 다른 층위를 포착한다.",
        "impact": 9
      },
      {
        "id": "SAJU-CHAR-005",
        "tier": "B",
        "name": "신살이 부여하는 성격 특수색",
        "tags": [
          "pillar:시주"
        ],
        "saju": "특수 신살(SINSAL_KEYWORDS, SINSAL_STORY) × 궁위(년/월/일/시지)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "특수 에너지는 다섯 가지 기본 에너지나 에너지 성격 체계와는 별도로 작동하는 독립 변수로, 성격에 예측하기 어려운 특수한 개성을 부여한다. 같은 에너지 구조, 같은 에너지 강도를 가진 사람이라도 사람을 자연스럽게 끌어당기는 특별한 기운의 유무에 따라 대인관계 양상이 완전히 달라진다. 이처럼 유형론으로는 잡아내기 어려운 개인 간 차이를 설명해주는 요소가 사주에는 존재한다.",
        "impact": 6
      },
      {
        "id": "SAJU-CHAR-001",
        "tier": "B",
        "name": "일간-일지 이중자아 구조",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:sipsung_rel"
        ],
        "saju": "일간 오행(ST5_TGAN_DEEP) × 일지 12운성(UNSUNG_KW) × 일지 지장간 정기 십성(SS_CONTEXT)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "하나의 유형 틀만으로는 설명하기 어려운 겉과 속의 차이를 구조적으로 풀어낼 수 있다. 나 자신의 에너지와 배우자 자리 에너지가 서로 맞부딪히면 내면에서 지속적인 긴장이 이어지고, 서로 잘 어우러지면 자연스러운 흐름이 된다. 본인 자리의 조합마다 이 양상이 저마다 다르게 나타난다.",
        "impact": 9
      },
      {
        "id": "MBTI-CHAR-003",
        "tier": "B",
        "name": "그림자 기능의 방어적 발현: 8기능 전체 프로필",
        "tags": [
          "relation:충",
          "uses:osin",
          "uses:shadow"
        ],
        "saju": "(대응 미정 — 상대의 합충형해 구조와 교차 가능)",
        "mbti": ": MT_SHADOW_BY_TYPE[type](유형별 4그림자 기능) × MT_SHADOW_POSITIONS(opposing/critical_parent/trickster/demon)",
        "cross": "평소에는 잘 드러나지 않지만 위기 상황에서 성격의 파괴적인 면을 결정하는 심리적 그늘이 있다. 사주에서 에너지 결합·충돌·마찰이 만드는 구조적 긴장이 이 심리적 그늘을 건드리는 조건이 될 수 있다. 특히 가장 약한 성향의 극단적 발현은, 사주의 극한 에너지 충돌과 맞먹는 수준의 파괴적 에너지를 설명한다.",
        "impact": 5
      },
      {
        "id": "SAJU-CHAR-006",
        "tier": "B",
        "name": "조후(온도)가 결정하는 성격 기저 톤",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "uses:johu"
        ],
        "saju": "월지 계절(ST5_JOHU) × 일간 오행(ST5_TGAN_DEEP)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "조후는 성격의 '무드와 톤'을 결정하는 배경 변수다. 같은 본인 자리, 같은 에너지 구조라도 태어난 달에 따라 에너지의 '온도'가 달라진다. 다른 성격 분석 체계에는 없는 고유 변수로, '왜 같은 구조인데 느낌이 다른가'를 설명하는 핵심 열쇠다.",
        "impact": 7
      },
      {
        "id": "SAJU-CHAR-008",
        "tier": "B",
        "name": "투출 여부에 의한 잠재력 의식화 수준",
        "tags": [
          "pillar:월지",
          "uses:tuchul"
        ],
        "saju": "SJ_checkTuchul(월지 지장간 → 천간 투출 감지) × ST5_JIJANGGAN_LAYERS(3겹 무의식 구조) × JIJANGGAN_HIDDEN_KW(숨은 십성 체감)",
        "mbti": ": (대응 미정 — 상대 체계에서 '무의식의 의식화 과정'에 해당하는 변수)",
        "cross": "(다른 체계와의 교차는 추후 과제. 단독으로도 성격의 '자기 인식 수준'을 설명하는 고유 변수다.)",
        "impact": 6
      },
      {
        "id": "SAJU-CHAR-004",
        "tier": "B",
        "name": "원국 합충이 만드는 내면 갈등/조화 패턴",
        "tags": [
          "relation:충",
          "relation:형",
          "relation:해",
          "relation:천간합"
        ],
        "saju": "원국 내 천간합/충(CHEONGAN_HAP, CHEONGAN_CHUNG) × 지지합/충/형/해(JIJI_YUKHAP, JIJI_CHUNG, JIJI_HYUNG, JIJI_HAE) × 궁위 조합(CHUNG_GUNGWI_KW, HAP_GUNGWI_KW)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "에너지 결합·충돌·마찰은 성격의 '역동성'을 설명한다. 결합만 있는 사주는 안정적이지만 변화 동력이 약하고, 충돌이 있는 사주는 불안정하지만 성장 동력이 강하다. 에너지 충돌이 반드시 나쁜 것이 아니라 필요한 변화를 촉발하는 계기라는 관점에서 보면, 성격 안의 갈등을 병리가 아닌 성장 에너지로 다시 읽을 수 있다.",
        "impact": 8
      },
      {
        "id": "MBTI-CHAR-004",
        "tier": "B",
        "name": "오인(Mistyping) 패턴: 겉으로 보이는 유형과 실제 유형의 괴리",
        "tags": [
          "uses:mistype"
        ],
        "saju": "(대응 미정 — 상대의 겉-속 이중구조(SAJU-CHAR-001)와 교차 가능)",
        "mbti": ": MT_MISTYPE(8쌍 오인 패턴) × MT_TYPES[type].stack × MT_FUNCTIONS[fn].definition",
        "cross": "자신의 MBTI 유형을 정확히 파악하기 어려운 이유가 있다. 사주에서 나 자신의 에너지와 배우자 자리 에너지의 차이가 '겉과 속이 다른 이유'를 에너지 구조로 설명한다면, 오인 패턴은 '겉과 속이 다른 사람이 자기 자신을 어떻게 오해하는가'를 인지 구조로 설명한다. 두 분석을 교차하면 '왜 이 사람이 자기 유형을 잘못 인식하는가'를 두 각도에서 설명할 수 있다. 사주에서 나 자신과 배우자 자리의 차이가 클수록, 자기 유형 평가의 오류도 클 가능성이 높다.",
        "impact": 4
      },
      {
        "id": "CROSS-CHAR-006",
        "tier": "B",
        "name": "의사결정 흐름: 인지기능 순서 × 격국의 방향성",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_DECISION"
        ],
        "saju": "격국 유형(JAPYEONG_GG role) × 십성 우선순위(SS_CONTEXT)",
        "mbti": ": MT_DECISION_PROCESS[type].flow × blind × MT_TYPES[type].stack 순서",
        "cross": "MBTI만으로는 '어떤 순서로 판단하는가'를 알 수 있지만 '무엇을 향해 판단하는가'는 알기 어렵다. 사주의 에너지 구조는 '사회적 역할 방향'이라는 구체적 목적지를 제공한다. 두 분석을 교차하면 의사결정의 '과정'과 '방향'이 결합된다. 예를 들어 MBTI에서 효율 분석을 마지못해 하는 성향이, 사주에서 창의 에너지는 강한데 실행력이 약한 구조와 만나면, 의사결정 맹점이 두 번 확인된다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-013",
        "tier": "B",
        "name": "그림자 기능 — 방어적 성격의 무의식 층위",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "uses:osin",
          "uses:shadow"
        ],
        "saju": "(대응 사주 변수: 신살의 성격 특이점 또는 일지의 무의식 영역과 유사한 역할 가능)",
        "mbti": ": MT_SHADOW_BY_TYPE (유형별 5~8번째 기능의 방어적 발현) + MT_SHADOW_POSITIONS (opposing/critical_parent/trickster/demon)",
        "cross": "MBTI 단독 패턴이지만, 사주의 특이한 에너지 패턴과 잠재적으로 연결된다. 사주에서 특정 에너지 조합이 '보통 사람에게 없는 특이점'을 만든다고 보는 것처럼, MBTI에서도 평소에는 드러나지 않다가 특정 상황에서 갑자기 발현되는 특이한 행동 패턴이 있다. 다만 작동 방식은 다르다. 사주의 특이점은 땅 에너지 간의 관계에서 나오고, MBTI의 특이 행동은 평소 편하게 쓰는 성향과 잘 쓰지 않는 성향 사이에 쌓인 긴장이 한꺼번에 터져나오면서 비롯된다.",
        "impact": 3
      },
      {
        "id": "SAJU-CHAR-007",
        "tier": "B",
        "name": "대운에 의한 성격 시간축 변화",
        "tags": [
          "uses:daewoon"
        ],
        "saju": "현재 대운 십성(DW_SIPSUNG_KW) × 직전 대운에서의 전환(DW_TRANSITION_KW) × 나이대(AGE_DW_KW)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "성격이 시간에 따라 변한다는 것은 사주만의 고유한 설명력이다. 같은 사람도 20대와 40대의 에너지 구조가 다르다는 관점은, 유형이 고정된다고 보는 정적 성격 모델과 근본적으로 다른 동적 성격 모델을 제공한다.",
        "impact": 8
      },
      {
        "id": "MBTI-CHAR-001",
        "tier": "B",
        "name": "인지기능 스택 구조: 4기능의 위치별 역학",
        "tags": [
          "uses:strength",
          "uses:gyeokguk"
        ],
        "saju": "(대응 미정 — 상대 체계의 일간/격국/신강도로 교차 가능하나, 이 패턴은 인지기능의 기본 구조 설명)",
        "mbti": ": MT_TYPES[type].stack(4기능 순서) × MT_STACK_POSITIONS(위치별 역할/발달시기/에너지비용) × MT_FUNCTIONS(8기능 정의)",
        "cross": "이 패턴은 MBTI 분석의 기본 골격이다. 사주에서 나 자신이 MBTI의 가장 두드러진 성향과 대응하고, 에너지 구조가 그다음 성향 또는 유형 전체와 대응한다. 단독으로도 의미가 크지만, 사주와 교차하면 '에너지의 종류'(사주)와 '인지의 구조'(MBTI)가 결합된 다차원 성격 모델이 된다.",
        "impact": 9
      },
      {
        "id": "SAJU-CHAR-002",
        "tier": "B",
        "name": "격국-신강 교차에 의한 표현 강도 분화",
        "tags": [
          "strength:신강+",
          "uses:strength",
          "uses:gyeokguk"
        ],
        "saju": "격국 유형(JAPYEONG_GG) × 신강등급(strengthGrade 5단계)",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "에너지 구조는 '방향'을 정하고 에너지가 얼마나 채워져 있는지는 '속도와 강도'를 정한다. 이 두 변수의 조합이 실제 행동 양태를 결정한다. 에너지 구조만으로는 '무엇을 하고 싶은가'만 알 수 있고, 에너지가 얼마나 채워져 있는지를 함께 봐야 '실제로 하는가, 못 하는가'를 가늠할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-CHAR-041",
        "tier": "B",
        "name": "커리어 적성의 인지기능적 분석 — 직업적 강점/약점 × 사주 격국/식상 배치",
        "tags": [
          "uses:gyeokguk",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "uses:job",
          "ref:MT_CAREER",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "(대응 사주 변수: analyzeGyeokguk.gyeokgukName 격국 유형 + cnt의 식상/재성/관성 비중 + SJ_findMoneyTiming의 직업 성향 텍스트 + JAPYEONG_GG의 격국별 role)",
        "mbti": ": MT_CAREER (유형별 strengths/weakAreas/idealEnv/stressJob/holland) + MT_INTERACTION_STYLES (behind-the-scenes/chart-the-course/get-things-going/in-charge)",
        "cross": "사주는 에너지 구조를 통해 사회적 역할 경향을 보여주고, MBTI는 성향의 흐름을 통해 직업 적성을 보여준다. 교차의 고유 가치는 두 가지다. 첫째, 같은 방향이면 커리어 방향이 두 번 확인된다. 둘째, 다른 방향이면 '사회적 역할 에너지(사주)와 인지적 강점(MBTI)이 서로 다른 곳을 가리키는 상황'이 발견된다. 특히 스트레스 직업 환경 교차가 유용하다. 사주에서 내 흐름을 방해하는 에너지가 활성화되는 환경과 MBTI에서 소진을 유발하는 직업 환경이 같은 곳을 가리키면, 그 환경에서의 번아웃이 두 번 확인되어 '절대 피해야 할 직업 유형'이 구체적으로 특정된다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-030",
        "tier": "B",
        "name": "연애 패턴의 인지기능적 분석 — 친밀 관계 양식",
        "tags": [
          "ss:정재",
          "ss:정관",
          "pillar:일지",
          "unsung:사",
          "unsung:양",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "(대응 사주 변수: 일지=배우자 궁, 정재/정관=배우자성, 일간-일지 관계가 배우자와의 에너지 교류 방식을 결정 — P-CHAR-001/P-CHAR-006과 연결)",
        "mbti": ": MT_LOVE (유형별 attract/loveLanguage/earlyDating/deepRelation/conflict/breakup/dealbreaker/growthInLove) + MT_CONFLICT_STYLES (갈등 시 반응)",
        "cross": "MBTI 단독으로 성향 기반 연애 패턴이 완결적으로 설명된다. 사주에서 배우자 자리 분석을 교차하면, '사주의 배우자 자리 에너지 구조 + MBTI의 인지적 연애 스타일'이 결합되어 '이 사람이 연애에서 어떤 에너지를 원하고(사주) 어떤 방식으로 연애하는가(MBTI)'를 두 각도에서 볼 수 있다. 특히 관계 단절 조건 교차가 가치 있다. 사주에서 나 자신과 배우자 자리가 서로 상극이고, MBTI에서도 관계 단절 조건이 피상적 관계 회피형이면, 친밀 관계에서의 취약점이 두 번 확인된다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-028",
        "tier": "B",
        "name": "격국-십성 비중 괴리에 의한 사회적 페르소나 vs 내적 우선순위 분리",
        "tags": [
          "uses:gyeokguk",
          "pillar:월지",
          "unsung:사"
        ],
        "saju": "격국 유형(analyzeGyeokguk.gyeokgukName) vs 십성 비중 최고 그룹(analyzeGyeokguk.cnt 최고값 그룹) — 격국의 월지 정기 십성과 실제 에너지 비중 최고 그룹이 불일치하는 경우",
        "mbti": ": (P-CHAR-008의 사회적 역할 교차 + P-CHAR-019의 의사결정 서열 교차에 기여)",
        "cross": "사주 단독으로 에너지 구조와 실제 에너지 비중의 차이가 '사회적 역할 대 내적 에너지의 불일치'를 보여준다. 교차의 가치는 이렇다. 사주에서 이 차이가 있는 사람이 MBTI에서도 겉으로 드러나는 상호작용 스타일과 내적 동기가 불일치하면, '이 사람의 사회적 모습은 구조적으로 본성과 다르다'는 점이 여러 겹으로 드러난다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-024",
        "tier": "B",
        "name": "성숙도-스트레스 단계 조합에 의한 인지기능 질감 세분화",
        "tags": [
          "uses:unsung",
          "ref:MT_MATURITY"
        ],
        "saju": "(P-CHAR-015의 12운성 세분화에 대응)",
        "mbti": ": MT_MATURITY (인지기능별 immature/developing/mature) × MT_STRESS_STAGES (정상/경미/루프/그립/회복)",
        "cross": "MBTI 단독의 세분화 도구다. 사주의 에너지 생명주기가 생명의 흐름 속 위치에 따른 질감을 제공한다면, MBTI의 심리적 성숙 정도와 스트레스 강도의 조합이 대응한다. 교차의 가치는 사주의 에너지 생명주기가 예측하는 무의식적 질감과 MBTI의 성숙-스트레스 조합이 예측하는 심리적 질감이 같은 방향인지 확인하는 데 있다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-017",
        "tier": "B",
        "name": "음양 밸런스의 성격 체감",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yinyang",
          "axis:EI"
        ],
        "saju": "SJ_calcYinYang 함수 — 양:음 비율 → 극양/양우세/균형/음우세/극음 5등급",
        "mbti": ": (대응 변수 미확인 — 상대 체계의 E/I 축 강도와 형식적 유사성 있으나 측정 차원이 다름)",
        "cross": "음양 비율은 사주 여덟 글자 전체의 에너지 방향에서 도출되는 고유 변수다. MBTI의 내향-외향 축과 형식적으로 유사해 보이지만, 음양은 에너지 전체의 방향이고 내향-외향은 인지적 에너지의 방향이므로 측정 차원이 다르다. 다만 사주에서 양 에너지가 압도적인데 MBTI에서 내향 성향이 매우 강하면, '에너지 구조는 외향적인데 인지 선호는 극내향'이라는 흥미로운 차이가 발견될 수 있다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-004",
        "tier": "B",
        "name": "신살 성격 특이점 (도화·역마·화개·양인·괴강)",
        "tags": [
          "unsung:양",
          "sinsal:도화",
          "sinsal:역마",
          "sinsal:화개",
          "sinsal:양인"
        ],
        "saju": "12지지 기반 신살 배치 × 궁위(년/월/일/시) = getSpecialSinsal + calcExtraSinsal",
        "mbti": ": MT_TYPES[code].stack + MT_SHADOW_BY_TYPE (유형별 그림자 기능과 특이 행동 패턴) + MT_FUNCTIONS[열등기능] (무의식적 특이성 발현)",
        "cross": "특수 에너지는 땅 에너지들 사이의 관계에서 도출되는 사주 고유 개념이다. 특히 같은 특수 에너지라도 어느 기둥에 있느냐에 따라 의미가 달라지는 세분화는 사주에만 있는 분석 축이다. MBTI에서 특이한 성격 변수를 다루는 개념이 있다면 교차가 가능하다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-005",
        "tier": "B",
        "name": "통변 내적 갈등 구조 (상반된 공식의 공존)",
        "tags": [
          "uses:tongbyeon"
        ],
        "saju": "SJ_detectTongbyeon의 16개 통변 공식 중 상반된 공식 동시 감지",
        "mbti": ": MT_TYPES[code].loop + MT_STRESS_STAGES.stage3_loop (유형별 스트레스 루프의 양가적 행동) + MT_AXES (상반된 축의 동시 활성)",
        "cross": "에너지 간 상호작용 공식은 에너지 성격 간의 관계에서 자동으로 감지되는 사주 고유 메커니즘이다. 특히 긍정적 흐름과 부정적 흐름이 동시에 존재하는 구조적 모순은 사주에서만 포착된다. MBTI에서 내적 모순이나 양가감정을 다루는 변수가 있다면 교차가 가능하다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-002",
        "tier": "B",
        "name": "격국 사회적 페르소나 (건강/뒤틀림 분기)",
        "tags": [
          "uses:strength",
          "uses:gyeokguk",
          "pillar:월지",
          "unsung:사",
          "condition:종격"
        ],
        "saju": "월지 정기 십성 → 격국 유형(10종+종격4종) × 신강도(5등급)",
        "mbti": ": MT_TEMPERAMENTS[기질].socialRole + MT_INTERACTION_STYLES (사회적 역할 선호와 상호작용 스타일)",
        "cross": "에너지 구조는 사회·직업 자리라는 특정 기둥에서 결정되며, 무너지는 조건은 사주 내 에너지 배치에 의해 결정된다. 이것은 사주 고유 구조다. MBTI에서 사회적 역할과 관련된 변수와 교차하면 의미 있는 분석이 가능하다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-001",
        "tier": "B",
        "name": "일주 원형 이중성 (겉-속 괴리)",
        "tags": [
          "pillar:일지",
          "uses:ilju",
          "uses:shadow"
        ],
        "saju": "일간(天干) × 일지(地支) 조합 = ILJU_DATA + ILJU_KW의 core vs shadow",
        "mbti": ": MT_TYPES[code].stack[0] vs stack[3] (주기능과 열등기능의 겉-속 괴리) + MT_SHADOW_BY_TYPE[code] (유형별 그림자 원형)",
        "cross": "사주 단독으로 60가지 원형을 구별할 수 있다. 나 자신의 에너지와 배우자 자리 에너지의 오행 관계가 겉과 속의 일치도를 결정하는 것은 사주 고유 메커니즘이다. MBTI에서 유사한 겉-속 프레임이 있다면 교차점 논의가 가능하다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-012",
        "tier": "B",
        "name": "4축 강도별 체감 차이 — 같은 유형 내 스펙트럼",
        "tags": [
          "uses:strength",
          "unsung:사",
          "axis:EI",
          "axis:SN",
          "axis:TF",
          "axis:JP",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "(대응 사주 변수: 신강도 5등급이 에너지 강도를 구분하는 것과 유사한 역할이나, 축의 차원이 다르므로 직접 교차 미확인)",
        "mbti": ": MT_INTENSITY_PROFILES — E/I, S/N, T/F, J/P 각 축의 55/68/88 강도별 행동 프로필",
        "cross": "MBTI 단독 패턴이다. 네 가지 성향 축 각각의 강도 프로필은 MBTI 측정 도구 고유의 데이터다. 사주의 에너지 강약과 형식적으로 유사해 보이지만 측정 차원이 완전히 다르다. 사주의 에너지 강약은 '나 자신의 에너지 대 주변 에너지'의 총량 비교이고, MBTI 강도는 '네 가지 인지 선호 축 각각의 편향 정도'다.",
        "impact": 3
      },
      {
        "id": "SAJU-CHAR-003",
        "tier": "B",
        "name": "오행 결핍이 만드는 성격 사각지대",
        "tags": [
          "condition:lack",
          "unsung:사"
        ],
        "saju": "부족/결핍 오행(lackFull) × 해당 오행의 OHENG_KW.lack/zero 키워드",
        "mbti": ": (대응 미정 — 상대 발언 대기)",
        "cross": "결핍 오행은 '없는 것'이기 때문에 본인이 자각하지 못하는 맹점이 된다. 다른 성격 분석에서 '약점'으로 나타나는 것의 구조적 원인을 오행 균형으로 설명할 수 있다. 또한 결핍 오행은 에너지 상생 순환의 단절점이 되어 전체 에너지 흐름에 영향을 준다.",
        "impact": 7
      },
      {
        "id": "MBTI-CHAR-002",
        "tier": "B",
        "name": "기질 체계: 4대 기질의 핵심 욕구와 소통 패턴",
        "tags": [
          "uses:gyeokguk",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "(대응 미정 — 상대의 격국 유형과 교차 가능)",
        "mbti": ": MT_TEMPERAMENTS[temperament](NF/NT/SP/SJ) × MT_TYPES[type].temperament",
        "cross": "기질은 성향 분석보다 더 근본적인 수준에서 '이 사람이 근본적으로 무엇을 원하는가'를 잡아낸다. 사주의 에너지 구조가 '사회적 역할 방향'이라면, 기질은 '존재론적 욕구 방향'이다. 두 분석을 교차하면 사회적 역할과 존재론적 욕구가 일치하는지 충돌하는지를 볼 수 있어, 그 사람의 근본적 만족과 불만족을 예측할 수 있다.",
        "impact": 7
      },
      {
        "id": "MBTI-CHAR-005",
        "tier": "B",
        "name": "인지기능 성숙도 프로필: 같은 유형 내의 질적 차이",
        "tags": [
          "uses:strength",
          "uses:daewoon",
          "uses:development",
          "ref:MT_MATURITY"
        ],
        "saju": "(대응 미정 — 상대 체계의 신강도/대운 경험이 부분적으로 대응하나, CROSS-CHAR-016에서 교차 시도)",
        "mbti": ": MT_MATURITY[fn](8기능 각각의 immature/developing/mature) × MT_TYPES[type].stack(4기능 순서) × MT_DEVELOPMENT_STAGES(발달 단계별 기대 성숙도)",
        "cross": "(단독 패턴. MBTI 고유의 강점이다. 사주에는 '같은 에너지의 질적 성숙도'를 직접 측정하는 변수가 없다. 에너지 강약은 에너지의 크기이지 성숙도가 아니다.)",
        "impact": 5
      },
      {
        "id": "P-CHAR-022",
        "tier": "B",
        "name": "자기돌봄 패턴 — 에너지 회복 메커니즘의 인지기능적 분석",
        "tags": [
          "unsung:사",
          "ref:MT_SELFCARE"
        ],
        "saju": "(대응 사주 변수 미확인)",
        "mbti": ": MT_SELFCARE (유형별 recharge/warning/tip) + MT_STRESS_STAGES (5단계 스트레스 모델의 intervention)",
        "cross": "MBTI 단독 패턴이다. 성향 흐름 기반 에너지 회복 처방은 MBTI 고유의 설명 체계이며, 각 스트레스 단계에 맞춤화된 회복 방법이 제공된다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-023",
        "tier": "B",
        "name": "우정 역학의 인지기능적 패턴 — 관계 형성/유지/파괴 스타일",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "(대응 사주 변수 미확인 — 십성 관계에서 친구 궁을 분석하는 변수가 있다면 교차 가능)",
        "mbti": ": MT_FRIENDSHIP (유형별 style/making/maintaining/giving/needing/breaking)",
        "cross": "MBTI 단독 패턴이다. 우정 역학은 성향의 흐름에서 직접 도출되는 관계 패턴이며, 사주에서 관계를 분석하는 변수가 있다면 교차 가능성이 열린다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-003",
        "tier": "B",
        "name": "오행 기질 온도 (조후에 의한 기본 에너지 색채)",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "uses:johu"
        ],
        "saju": "일간 오행 × 월지 계절 → 조후 필요 오행 (JOHU 120개 테이블)",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_TYPES[code].energyPattern (기질별 에너지 온도와 핵심 욕구 방향)",
        "cross": "태어난 시점의 계절적 조건이 기질에 영향을 미친다는 것은 사주 고유 이론이다. 사회·직업 자리의 계절과 에너지 조합에 따른 120가지 세분화는 사주에만 있는 구조다. MBTI에서 기질의 온도나 에너지 수준과 관련된 변수가 있다면 교차가 가능하다.",
        "impact": 3
      },
      {
        "id": "CROSS-CHAR-008",
        "tier": "B",
        "name": "통변 공식과 인지기능 간 역학: 에너지 흐름 패턴의 교차",
        "tags": [
          "ss:비겁",
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "tongbyeon:식신제살",
          "ref:MT_DECISION",
          "ref:MT_AXES"
        ],
        "saju": "SJ_detectTongbyeon 16개 통변 공식(식상생재/살인상생/비겁탈재/상관견관/식신제살 등) × 십성 분포(cnt)",
        "mbti": ": MT_TYPES[type].stack 기능 간 에너지 흐름 × MT_DECISION_PROCESS[type].flow × MT_AXES 축 간 시소",
        "cross": "사주의 에너지 상호작용 공식은 에너지 간 '관계 법칙'이고, MBTI의 성향 처리 흐름은 '처리 순서 법칙'이다. 두 분석을 교차하면 '어떤 에너지가 어디로 흐르는가'와 '어떤 순서로 처리하는가'가 결합된다. 특히 긍정적 에너지 흐름(재능을 갈고닦아 현실적 성과로 이어지거나, 외부의 자극과 압박을 내면에서 소화해 지혜로 바꾸는 흐름)과 부정적 흐름(에너지가 지나치게 넘쳐 재물이 오히려 새어나가거나, 명예를 향한 욕구와 외부 압박이 뒤섞여 방향을 잃는 흐름)의 구분은, MBTI에서 건강한 성향 사용과 불건강한 사용의 구분과 구조적으로 같다. 사주 단독으로는 '왜 이 사람은 재능을 돈으로 잘 바꾸는가'를 설명할 수 있지만, 교차하면 '어떤 심리적 과정으로 재능이 현실적 성과로 전환되는가'까지 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-007",
        "tier": "B",
        "name": "인지기능 스택 기반 의사결정 서열",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "(대응 사주 변수: 격국 유형이 판단 우선순위를 결정할 수 있으나, 직접 대응 미확인)",
        "mbti": ": MT_DECISION_PROCESS — 유형별 4단계 의사결정 흐름 + blind spot",
        "cross": "MBTI 단독 패턴이다. 어떤 성향을 먼저 활용하고 나중에 활용하는지에 따른 의사결정 우선순위는 MBTI 고유 메커니즘이며, 사주의 어떤 변수와도 직접 교차하지 않는다. 사주에서 판단 우선순위를 결정하는 변수가 발견된다면 교차를 시도할 수 있으나, 현재로서는 단독 패턴으로 제시한다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-011",
        "tier": "B",
        "name": "성격 성숙도 레벨 — 같은 유형 내 질적 차이",
        "tags": [
          "pillar:시주",
          "unsung:사",
          "uses:daewoon",
          "uses:sewoon",
          "uses:development",
          "ref:MT_MATURITY"
        ],
        "saju": "(대응 사주 변수: 대운/세운에 의한 시간적 변화가 성숙도에 대응할 수 있으나, '나의 성격' 주제에서는 원국 구조 중심이므로 직접 교차 미확인)",
        "mbti": ": MT_MATURITY (인지기능별 immature/developing/mature 3단계) + MT_DEVELOPMENT_STAGES (연령별 발달 단계)",
        "cross": "MBTI 단독 패턴이다. 나이가 들면서 각 성향이 어떤 순서로 발달하는지에 대한 설명 체계는 MBTI 고유다. 사주에서 10년 흐름과 올해 흐름에 의한 시간적 변화가 있으므로 향후 교차 가능성이 있으나, 현재로서는 단독 패턴으로 제시한다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-034",
        "tier": "B",
        "name": "SNS/소통 행동의 인지기능적 분석",
        "tags": [
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "unsung:양",
          "ref:MT_SOCIAL"
        ],
        "saju": "(대응 사주 변수: 식상의 유무와 강도가 표현 양식을 결정 + 재성 배치가 물질적 과시 경향에 영향 + 관성 배치가 사회적 체면 의식에 영향 — analyzeGyeokguk.cnt의 식상/재성/관성 수치)",
        "mbti": ": MT_SOCIAL_MEDIA (유형별 posting/consuming/interaction/darkside/detox)",
        "cross": "사주는 표현 에너지와 사회적 체면 의식의 구조를 보여주고, MBTI는 성향의 흐름을 통해 디지털 행동 패턴을 보여준다. 교차의 가치는 두 가지다. 첫째, 같은 방향이면 SNS 행동이 두 번 확인된다. 둘째, 다른 방향이면 '타고난 표현 에너지(사주)와 인지적 소통 선호(MBTI)의 차이'가 발견된다. 특히 자기 에너지가 강한 사주에서 MBTI의 어두운 면이 '비교 함정'이면, 자존심이 높은 사람이 비교에 취약하다는 구조적 위험이 두 번 확인된다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-018",
        "tier": "B",
        "name": "지장간 투출의 성격 의미 — 잠재 에너지의 의식화 여부",
        "tags": [
          "pillar:월지",
          "uses:tuchul"
        ],
        "saju": "SJ_checkTuchul 함수 — 월지 지장간이 천간에 투출되었는지 여부",
        "mbti": ": (대응 변수 미확인)",
        "cross": "숨겨진 에너지가 하늘 에너지로 드러나는지 여부는 사주 고유 메커니즘이다. '잠재 에너지의 의식화'라는 개념은 사주에서 매우 독특한 분석 축이며, 같은 에너지가 있어도 드러남 여부에 따라 성격 표현이 완전히 달라진다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-015",
        "tier": "B",
        "name": "일지 12운성에 의한 무의식 에너지 질감 세분화",
        "tags": [
          "pillar:일지",
          "uses:unsung"
        ],
        "saju": "일지 12운성(UNSUNG_KW) × 일간-일지 오행 관계(상생/상극/비화)",
        "mbti": ": (P-CHAR-006의 의식-무의식 이중 구조 세분화에 기여)",
        "cross": "에너지 생명주기는 나 자신의 에너지와 배우자 자리 에너지의 관계에서 도출되는 사주 고유 변수다. 에너지의 상생과 상극이라는 이분법을 12단계로 세분화하기 때문에, 사주 측 예측의 정밀도가 높아진다. MBTI에서도 가장 강한 성향과 가장 약한 성향 사이의 긴장 강도나 질감을 세분화하는 변수가 있다면 더 깊은 교차 분석이 가능하다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-021",
        "tier": "B",
        "name": "갈등 반응의 인지기능적 분석 — 분노 표현과 트리거",
        "tags": [
          "unsung:사",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "(대응 사주 변수 미확인 — 상대 체계에서 갈등 반응을 결정하는 변수가 있다면 교차 가능)",
        "mbti": ": MT_CONFLICT_STYLES (유형별 trigger/fightStyle/communication/needsFromOther/blindSpot) + MT_ANGER.byFunction (인지기능별 분노 표현/trigger/duration/resolution)",
        "cross": "MBTI 단독 패턴이다. 성향별 분노 표현과 갈등 스타일은 MBTI 고유의 설명 체계다. 사주에서 특정 에너지 조합에 따른 갈등 패턴이 제시되면 교차 가능성이 열린다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-016",
        "tier": "B",
        "name": "원국 합충형해의 성격 구조 — 에너지가 묶이거나 깨지는 지점",
        "tags": [
          "relation:충"
        ],
        "saju": "calcRelations 함수의 cheonganHap/jijiHap/jijiChung/jijiHyung/jijiHae + 궁위 조합(CHUNG_GUNGWI_KW, HAP_GUNGWI_KW)",
        "mbti": ": (대응 변수 미확인 — 상대 체계에서 '성격 내 에너지가 묶이거나 충돌하는 구조'가 있다면 교차 가능)",
        "cross": "에너지 결합·충돌·마찰은 하늘 에너지와 땅 에너지 사이의 관계 규칙에서 도출되는 사주 고유 메커니즘이다. 특히 같은 충돌이라도 어느 기둥 사이에서 일어나느냐에 따라 의미가 달라지는 세분화는 사주에만 있다. MBTI에서 성격 내 에너지가 묶이거나 충돌하는 구조를 설명하는 변수가 있다면 교차 가능성이 열린다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-009",
        "tier": "C",
        "name": "핵심 결핍감과 갈망의 교차 진단",
        "tags": [
          "condition:lack",
          "uses:johu",
          "cf:Fe",
          "cf:Ne",
          "uses:intensity"
        ],
        "saju": "조후 필요 오행(결핍 오행) + OHENG_KW의 부족 체감 키워드",
        "mbti": ": MT_TYPES.coreFear + MT_TYPES.coreNeed + MT_INTENSITY_PROFILES 축별 강도",
        "cross": "사주 단독으로 계절 에너지 분석이 가능하고, MBTI 단독으로 핵심 두려움과 핵심 필요 분석이 가능하다. 교차의 가치는 두 체계가 각각 다른 도구로 같은 심리적 현상, 즉 근본적 결핍감의 서로 다른 층위를 포착한다는 점이다. MBTI는 성향의 선호와 회피를 통해, 사주는 에너지 균형의 구조적 편향을 통해 접근한다. 같은 현상을 두 방향에서 확인하는 효과가 있다.",
        "impact": 3
      },
      {
        "id": "P-CHAR-014",
        "tier": "C",
        "name": "십성 비중 순위 기반 판단 우선순위",
        "tags": [
          "ss:비겁",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "analyzeGyeokguk.cnt의 비겁/식상/재성/관성/인성 수치 내림차순 + 가장 낮은 십성 = blind spot",
        "mbti": ": (P-CHAR-007의 MT_DECISION_PROCESS 의사결정 서열에 대응)",
        "cross": "사주만 봐도 어떤 에너지가 판단에서 우선순위를 차지하는지 알 수 있고, MBTI만 봐도 의사결정의 서열이 보인다. 두 분석을 함께 볼 때의 가치는, 같은 방향을 가리키면 확신이 강해지고, 다른 방향을 가리키면 '타고난 에너지 구조와 후천적으로 학습된 성향 사이의 간극'을 발견할 수 있다는 점이다. 특히 두 체계에서 공통으로 약한 영역이 나타나면, 그 취약성이 구조적이라는 사실을 두 방향에서 함께 확인할 수 있다.",
        "impact": 3
      },
      {
        "id": "CROSS-CHAR-001",
        "tier": "S",
        "name": "의식-무의식 이중구조: 주기능-열등기능 시소 × 겉-속 이중자아",
        "tags": [
          "pillar:일지",
          "uses:ilju",
          "uses:sipsung_rel",
          "uses:dominant",
          "uses:inferior",
          "uses:shadow",
          "ref:MT_AXES"
        ],
        "saju": "일간 오행(ST5_TGAN_DEEP) × 일지 지장간 정기 십성(SS_CONTEXT) × ILJU_KW core/shadow",
        "mbti": ": MT_TYPES[type].stack[0](dominant) × stack[3](inferior) × MT_AXES 시소 역학 × MT_STACK_POSITIONS.dominant.role + inferior.role",
        "cross": "사주는 본인 자리 조합으로 '어떤 종류의 이중성인가'를 구체적으로 보여주고, MBTI는 극한의 스트레스 상황에서 평소와 전혀 다른 모습이 튀어나오는 메커니즘으로 '그 이중성이 어떻게 폭발하는가'를 설명한다. 예를 들어 INFP가 극심한 스트레스 상황에 빠지면 갑자기 공격적으로 효율을 추구하거나 냉혹하게 비판하는 모습이 나타나는데, 이것은 평소에 거의 쓰지 않던 면이 갑자기 튀어나오는 현상이다. 사주에서 '숨겨진 에너지가 표면화되는 순간'과 같은 현상을 다른 언어로 설명하는 것이기도 하다. 두 체계를 함께 보면 '무엇이 숨어있는가'와 '어떻게 터져나오는가'를 동시에 설명할 수 있어 단독 분석보다 훨씬 강력하다.",
        "impact": 9
      },
      {
        "id": "P-CHAR-038",
        "tier": "S",
        "name": "투출 여부에 의한 표현 에너지 의식화 — SNS 행동의 겉/속 분기",
        "tags": [
          "ss:식상",
          "pillar:월지",
          "uses:tuchul",
          "ref:MT_SOCIAL"
        ],
        "saju": "SJ_checkTuchul 함수 — 월지 지장간 식상 에너지의 투출 여부 + 식상 수치(analyzeGyeokguk.cnt) + 지장간 정기/중기/여기 구분(JIJANGGAN_DATA) + 투출시 '의식적 무기', 미투출시 JIJANGGAN_HIDDEN_KW의 숨은 에너지",
        "mbti": ": P-CHAR-034의 MT_SOCIAL_MEDIA (posting/consuming/darkside)",
        "cross": "사주만 봐도 잠재된 에너지가 의식 위로 드러나 있는지 아닌지를 알 수 있고, MBTI만 봐도 표현 패턴이 보인다. 두 분석을 함께 볼 때의 고유한 가치는, 같은 표현 에너지 수치와 같은 MBTI 유형이라도 그 에너지가 표면에 드러나 있는지 여부에 따라 실제 행동이 달라진다는 세분화에 있다. 이것은 '왜 같은 유형인데 어떤 사람은 적극적으로 표현하고 어떤 사람은 그렇지 않은가'에 대한 사주 측의 추가 설명이다. 특히 10년 흐름이나 올해 흐름에 의해 그 에너지가 언제 표면으로 드러나는지 예측할 수 있다는 점은 사주에서만 가능한 시간축 가치다.",
        "impact": 5
      },
      {
        "id": "P-CHAR-033",
        "tier": "S",
        "name": "스트레스 단계별 회복 처방의 교차 세분화",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "stress:loop",
          "ref:MT_SELFCARE"
        ],
        "saju": "P-CHAR-026의 용신/기신 활동 + SJ_GAEUN 처방",
        "mbti": ": MT_STRESS_STAGES (5단계별 intervention) + MT_SELFCARE (recharge/warning/tip) + MT_TYPES.loop/growthPath",
        "cross": "스트레스의 어느 단계에 있느냐에 따라 두 체계를 교차하는 처방이 완전히 달라진다. 초기 스트레스 단계에서는 '평소에 두 번째로 자주 활용하는 성향을 활성화'하는 것이 핵심이므로, 가장 필요한 에너지와 그 성향의 교차가 중요하다. 반면 극심한 스트레스 상태에서는 '평소에 가장 적게 활용하는 성향을 조금씩 사용'하는 것이 핵심이므로, 방해 에너지와 그 성향의 교차가 중요하다. 이 단계별 분기는 사주 단독(필요한 에너지와 방해 에너지는 단계 구분이 없음)이나 MBTI 단독(5단계 모델은 있지만 오행별 활동 처방이 없음)으로는 나올 수 없는 교차 고유의 가치다.",
        "impact": 7
      },
      {
        "id": "P-CHAR-010",
        "tier": "S",
        "name": "내적 모순 구조의 교차 — 통변 갈등 × 루프/그립 역학",
        "tags": [
          "uses:tongbyeon",
          "stress:grip",
          "stress:loop",
          "ref:MT_AXES"
        ],
        "saju": "SJ_detectTongbyeon의 상반된 공식 동시 감지",
        "mbti": ": MT_STRESS_STAGES.stage3_loop + MT_TYPES.loop (유형별 루프 패턴) + MT_AXES.gripDirection",
        "cross": "사주만 봐도 에너지 간 충돌 구조를 감지할 수 있고, MBTI만 봐도 스트레스 상태에서 나타나는 패턴을 분석할 수 있다. 두 체계를 함께 볼 때의 핵심 가치는 시간 축의 차이에 있다. 사주는 '항상 존재하는 구조적 모순'을, MBTI는 '스트레스를 받을 때 발동하는 상태적 모순'을 포착한다. 이 두 층위를 겹치면 '이 사람의 내적 갈등이 타고난 구조의 문제인가, 아니면 상황에 따라 달라지는 상태의 문제인가'를 구분할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-CHAR-043",
        "tier": "S",
        "name": "오인(Mistype) 방지 교차 — 사주 변수에 의한 유형 검증 보강",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:mistype"
        ],
        "saju": "P-CHAR-001의 일간 오행 기질 + P-CHAR-014의 십성 비중 순위 + P-CHAR-025의 분노 양식",
        "mbti": ": MT_MISTYPE (혼동 쌍별 frequency/rootCause/keyDifference/testQuestion)",
        "cross": "사주에서는 에너지 구성 비율이 전체 에너지 구조를 보여주고, MBTI에서는 비슷해 보이는 유형들을 구분하는 기준이 있다. 교차의 핵심 가치는 이것이다. MBTI는 자기 스스로 응답하는 방식에 의존하기 때문에 주관적 편향이 생길 수 있는 반면, 사주의 에너지 구성 비율은 출생 데이터에서 계산되는 객관적 구조다. 그래서 자기 보고의 편향을 보완할 수 있다. 예를 들어 스스로는 INFJ라고 생각하지만 사주에서 사회적 조화와 관련된 에너지가 극도로 약하다면, '이 사람이 정말 타인과의 조화를 두 번째로 중요하게 여기는 사람인가'라는 검증 질문을 던질 수 있다. 이런 교차 검증은 어느 한 체계만으로는 나올 수 없다.",
        "impact": 5
      },
      {
        "id": "P-CHAR-042",
        "tier": "S",
        "name": "성장 시기 교차 예측 — 인지기능 발달 단계 × 대운의 성장 에너지",
        "tags": [
          "uses:daewoon",
          "condition:교운기",
          "uses:osin",
          "uses:development",
          "uses:inferior"
        ],
        "saju": "P-CHAR-039의 SJ_buildOsinText 대운 5신 판별 + SJ_findGyowoongi 교운기 + 대운 천간의 십성(DW_SIPSUNG_KW)",
        "mbti": ": MT_DEVELOPMENT_STAGES (연령별 6단계 발달) + MT_STACK_POSITIONS (주/부/3차/열등기능 발달 시기) + MT_TYPES.growthPath",
        "cross": "사주만 봐도 10년 흐름에서 필요한 에너지와 방해 에너지의 시간 패턴이 보이고, MBTI만 봐도 성향의 일반적인 성장 시기가 보인다. 두 체계를 함께 볼 때의 고유한 가치는 이렇다. MBTI의 성장 단계는 '일반적인 연령대'만 제시할 뿐(예: 30~40대에 세 번째로 강한 성향이 발달), 개인마다 이 발달이 빨라지는지 늦어지는지는 예측하지 못한다. 사주의 10년 흐름이 같은 방향의 에너지를 해당 시기에 제공하면 발달이 가속되고, 반대 방향이면 발달이 지연되거나 다른 경로가 필요하다는 개인별 예측이 가능해진다. 특히 10년 흐름의 전환기와 중년의 전환기가 시간적으로 겹치는 경우는 어느 한 체계만으로는 나올 수 없는 교차 고유의 통찰이다.",
        "impact": 8
      },
      {
        "id": "CROSS-CHAR-011",
        "tier": "S",
        "name": "존재론적 욕구의 교차: 기질 핵심 욕구 × 용신 에너지 방향",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "용신 오행(SJ_extractYongshinOh) × 5신 체계(SJ_calcOsinChegye) × SJ_GAEUN(개운법)",
        "mbti": ": MT_TEMPERAMENTS[temperament].coreNeed × MT_TEMPERAMENTS[temperament].conflict",
        "cross": "MBTI의 기질이 '무엇을 원하는가'를 정하고, 사주의 가장 필요한 에너지가 '무엇이 필요한가'를 정한다. 원하는 것과 필요한 것이 다를 때 성격의 가장 깊은 긴장이 생긴다. 이 긴장은 단독 체계로는 포착할 수 없다. 기질만 보면 '이 사람은 의미를 추구한다'고 끝나고, 사주만 보면 '이 사람은 재물 활동이 필요하다'고 끝난다. 두 체계를 교차해야 '의미를 추구하면서도 재물 활동을 해야 하는 모순'이 드러난다.",
        "impact": 6
      },
      {
        "id": "CROSS-CHAR-010",
        "tier": "S",
        "name": "음양 에너지 방향 × 외향/내향 에너지 원천",
        "tags": [
          "unsung:양",
          "uses:yinyang",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "SJ_calcYinYang 음양 비율(극양/양우세/균형/음우세/극음) × 일간의 양간/음간 구분",
        "mbti": ": MT_TYPES[type].stack[0]의 방향(e/i) × MT_INTENSITY_PROFILES.EI 축 강도",
        "cross": "사주의 음양과 MBTI의 내향/외향이 일치하면(강한 양 에너지+외향, 또는 강한 음 에너지+내향) 성격이 일관적이고, 불일치하면(강한 양 에너지+내향, 또는 강한 음 에너지+외향) 겉과 속 사이에 차이가 생긴다. 이 불일치는 두 체계를 교차해야만 발견할 수 있는 고유 패턴이다. 단독 분석에서는 '일관된 외향인'으로만 보이는 사람이 교차 분석에서는 '에너지 방향은 외향이지만 충전은 내향 방식 — 사회활동 후 극심한 피로'라는 모순 구조를 드러낼 수 있다. 다만 이 대응은 탐색적 수준이다. 음양과 내향/외향이 정확히 같은 것을 측정하는지는 아직 검증되지 않았다.",
        "impact": 5
      },
      {
        "id": "CROSS-CHAR-017",
        "tier": "S",
        "name": "격국 성패와 인지 성숙도의 이중 진단: 같은 에너지의 건강한 사용 vs 뒤틀린 사용",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:tongbyeon",
          "condition:패격",
          "ref:MT_MATURITY"
        ],
        "saju": "JAPYEONG_GG[격국].intact/breaks(성격/패격 조건) × SJ_detectTongbyeon(16통변 길/흉) × pagyeokInfo(파격 재산정)",
        "mbti": ": MT_MATURITY[fn](immature/developing/mature) × MT_TYPES[type].stack(4기능 순서)",
        "cross": "사주의 에너지 구조 성패는 '원래 타고난 조건에 의해 에너지가 건강하게 작동하는지 뒤틀려 있는지'를 결정하고, MBTI의 성숙도는 '나이와 의식적 노력에 따라 같은 성향을 얼마나 건강하게 사용하는지'를 보여준다. 핵심 차이는 '외적 조건(10년 흐름에 의한 구조 변화) vs 내적 발달(경험에 의한 성숙)'이다. 두 체계를 교차하면 '이 사람의 에너지가 구조적으로 뒤틀려 있는가'와 '그 에너지를 얼마나 건강하게 처리하는가'를 두 방향에서 함께 살펴볼 수 있다. 단독으로는 '구조가 좋다/나쁘다'(이진 판단) 또는 '미숙/보통/성숙'(3단계)이라고만 말하지만, 교차하면 '구조도 뒤틀리고 사용법도 미숙'(최악)부터 '구조도 건강하고 사용법도 성숙'(최선)까지 6가지 조합으로 세분화된다. 가장 흥미로운 것은 '구조적으로는 불리하지만 경험과 노력으로 에너지 사용법을 터득한 사람'이다. 이것이 '사주를 넘어서는 삶'의 실제 사례라고 볼 수 있다.",
        "impact": 7
      },
      {
        "id": "CROSS-CHAR-009",
        "tier": "S",
        "name": "성격의 기저 온도: 조후론 × 선호 강도의 에너지 온도",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "uses:johu",
          "uses:dominant",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "월지 계절(ST5_JOHU) × 일간 오행(ST5_TGAN_DEEP) × JOHU 120개 테이블(analyzeGyeokguk 내 JOHU)",
        "mbti": ": MT_INTENSITY_PROFILES 축별 강도(55/68/88) × MT_TYPES[type].stack[0] 주기능의 방향(내향/외향)",
        "cross": "MBTI에는 '계절'이라는 변수가 없다. 같은 INFP라도 여름생과 겨울생의 에너지 톤이 다르다는 것은 사주만이 설명할 수 있는 고유 변수다. 두 체계를 교차하면 MBTI 유형이 '무엇을 하는가'를 정하고, 태어난 계절의 온도 균형이 '어떤 온도와 톤으로 하는가'를 정한다. 단독으로는 '이 사람은 감정 중심'이라고만 말할 수 있지만, 교차하면 '이 사람은 감정 중심인데 뜨거운 감정(여름생)인지 차가운 감정(겨울생)인지'까지 구분된다.",
        "impact": 6
      },
      {
        "id": "P-CHAR-039",
        "tier": "S",
        "name": "시간축 스트레스 예측 — 대운/세운 5신 변동 × 스트레스 단계 진입 트리거",
        "tags": [
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "condition:교운기",
          "uses:osin",
          "stress:loop"
        ],
        "saju": "SJ_buildOsinText의 현재 대운/세운 5신 판별 + SJ_getOsinLabel + SJ_findGyowoongi의 교운기(대운 전환점) + SEUN_HAPCHUNG_KW(세운 충/형 시)",
        "mbti": ": P-CHAR-033의 MT_STRESS_STAGES (5단계 모델) + MT_TYPES.loop (루프 패턴)",
        "cross": "사주만 봐도 10년 흐름과 올해 흐름에서 에너지가 언제 소진되고 충전되는지 시간 패턴이 보인다. MBTI만 봐도 스트레스 5단계 모델로 현재 상태 파악과 처방이 가능하다. 두 체계를 함께 볼 때의 고유한 가치는 이렇다. MBTI는 '지금 어떤 단계인가'(상태 파악)는 가능하지만 '언제 이 단계에 진입하는가'(시간 예측)는 불가능하다. 사주는 10년 흐름과 올해 흐름으로 '언제 에너지가 소진되고 충전되는가'를 예측할 수 있다. 이 둘을 결합하면 예방적 처방이 가능해진다. 방해 에너지가 강해지는 해가 오기 전에 미리 필요한 에너지 활동을 강화하는 것이다. 이것은 어느 한 체계만으로는 나올 수 없는 교차 고유의 가치다.",
        "impact": 8
      }
    ],
    "나의 장점": [
      {
        "id": "P-MERIT-001",
        "tier": "B",
        "name": "격국 성격(成格)의 사회적 강점 — 월지 정기가 건강하게 발현될 때의 역할적 장점",
        "tags": [
          "uses:strength",
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "격국 유형(JAPYEONG_GG) + 파격 여부(analyzeGyeokguk.pagyeokInfo) + 신강도(strengthGrade)",
        "mbti": ": (대응 미정 — 상대 교수 발언 대기)",
        "cross": "사주만 봐도 사회적 역할 강점을 매우 구체적으로 파악할 수 있다. 에너지 구조의 종류, 성패 여부, 에너지 강약에 따라 다양한 조합이 나온다. MBTI에서 '가장 강한 성향이 사회적으로 능숙하게 발현되는 모습'을 함께 보면, 두 체계가 같은 강점을 가리키는지 아니면 서로 다른 강점을 보는지에 따라 교차 가치가 결정된다. 현재는 사주 단독으로도 충분히 완결적이지만, 교차 확장 가능성이 높은 영역이다.",
        "impact": 9
      },
      {
        "id": "P-MERIT-004",
        "tier": "B",
        "name": "일주 60종 고유 강점 — 천간+지지 조합이 만드는 원형적 장점",
        "tags": [
          "uses:ilju",
          "uses:shadow"
        ],
        "saju": "ILJU_DATA(60일주 특성) + ILJU_KW(60일주 키워드 core/shadow) + JEOKCHEONSU(적천수 십간론)",
        "mbti": ": (대응 미정)",
        "cross": "60가지 본인 자리 조합은 사주 고유의 극도로 세밀한 성격 원형 분류다. MBTI의 16가지 유형보다 3.75배 많은 분류 체계이며, '같은 INFP라도 어떤 본인 자리를 가진 INFP냐에 따라 다르다'는 수준의 개인화가 가능하다. MBTI와 교차하면 이론적으로 960가지 세분화가 가능하나, 현재는 사주 단독으로 강점을 기술한다.",
        "impact": 9
      },
      {
        "id": "P-MERIT-003",
        "tier": "B",
        "name": "신살 특수 재능 — 천을귀인·문창귀인·학당귀인·도화살·역마살·화개살의 장점적 발현",
        "tags": [
          "sinsal:도화",
          "sinsal:역마",
          "sinsal:화개",
          "sinsal:천을귀인"
        ],
        "saju": "getSpecialSinsal + calcExtraSinsal 결과 중 type='good' 또는 장점 발현 가능한 신살",
        "mbti": ": (대응 미정)",
        "cross": "특수 에너지는 사주 고유의 메커니즘이며 MBTI에 직접 대응하는 개념이 없다. 매력 에너지가 만드는 '대인 매력'은 MBTI의 내향/외향이나 감정 중심 성향과 형식적으로 유사할 수 있으나, 사주의 매력 에너지는 어느 자리에 있느냐에 따라 발현 영역이 달라진다는 세밀함이 있다. 예를 들어 외부환경 자리의 매력 에너지는 어릴 때부터 인기를 끌고, 배우자 자리의 매력 에너지는 연애 관계에서 특히 빛난다. 이 세밀함 덕분에 사주 단독으로도 충분히 완결적이다.",
        "impact": 6
      },
      {
        "id": "P-MERIT-005",
        "tier": "B",
        "name": "투출에 의한 의식적 재능 — 숨겨진 에너지가 겉으로 드러나 '쓸 수 있는 무기'가 된 상태",
        "tags": [
          "pillar:월지",
          "unsung:태",
          "uses:tuchul"
        ],
        "saju": "SJ_checkTuchul(월지 지장간 → 천간 투출 여부) + ST5_JIJANGGAN_LAYERS(지장간 3겹 구조)",
        "mbti": ": (대응 미정)",
        "cross": "에너지가 표면으로 드러나 있는지 여부는 사주 고유의 개념이며 MBTI에 직접 대응하는 것이 없다. 같은 오행 수치라도 에너지가 표면에 드러나 있는지 아닌지에 따라 행동이 달라지는 것은 사주 고유의 강력한 변수다. MBTI와 교차하면 '같은 유형이라도 에너지 표출 여부에 따라 해당 재능의 발현 수준이 다르다'는 통찰이 가능하지만, 현재는 사주 단독으로 강점 구조를 기술한다.",
        "impact": 7
      },
      {
        "id": "P-MERIT-012",
        "tier": "B",
        "name": "주기능 능숙 사용의 핵심 강점 — 가장 적은 에너지로 가장 큰 효과를 내는 영역",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:ilju",
          "uses:dominant"
        ],
        "saju": "(대응 미정 — 상대 교수의 일주/격국 패턴과 교차 검토 필요)",
        "mbti": ": MT_FUNCTIONS[dominant].healthyExpression + MT_STACK_POSITIONS.dominant.energyCost + MT_TYPES[code].stack[0]",
        "cross": "가장 강한 성향이 건강하게 발현되는 모습은 MBTI 단독으로도 매우 완결적으로 설명된다. 사주의 본인 자리 고유 강점이나 에너지 구조의 사회적 강점과 교차하면 '두 체계가 같은 강점을 가리키는가'를 확인할 수 있으나, 현재는 MBTI 단독으로 제시한다.",
        "impact": 9
      },
      {
        "id": "P-MERIT-011",
        "tier": "B",
        "name": "직업 적성의 구조적 강점 — 십성 비중 조합이 가리키는 천직 영역",
        "tags": [
          "uses:job"
        ],
        "saju": "SJ_buildJobText(직업 적성) + SJ_JOB_APTITUDE(12종 적성 매칭) + analyzeGyeokguk.cnt(십성 비중)",
        "mbti": ": (대응 미정)",
        "cross": "사주의 직업 적성은 에너지 비중이라는 구조에 기반하고, MBTI의 커리어 적성은 성향 선호에 기반한다. 두 체계의 적성 방향이 일치하면 확신이 강해지고, 다르면 숨겨진 적성을 발견할 수 있다는 교차 가치가 있다. 그러나 사주 단독으로도 12가지 적성이 직업명까지 포함해 매우 구체적이어서 충분히 완결적이다.",
        "impact": 7
      },
      {
        "id": "P-MERIT-006",
        "tier": "B",
        "name": "신강/신약 에너지 총량의 강점적 해석 — 강하면 추진력, 약하면 적응력",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength"
        ],
        "saju": "analyzeGyeokguk.strengthScore(0~100) + strengthGrade(극신강~극신약 5단계) + SJ_buildStrengthText",
        "mbti": ": (대응 미정)",
        "cross": "사주의 에너지 강약은 에너지 총량을 나타내고, MBTI의 내향/외향은 에너지의 원천 방향을 나타낸다. 측정 차원이 다르므로 교차하면 새로운 조합이 나올 수 있다. 그러나 '강점' 관점에서는 사주 단독으로 에너지 강약에 따른 강점을 충분히 기술할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-MERIT-009",
        "tier": "B",
        "name": "오행 순환 강점 — 상생 체인이 연결된 구간에서 에너지가 자연스럽게 흐르는 영역",
        "tags": [
          "unsung:절"
        ],
        "saju": "OHENG_FLOW_DESC(오행 흐름 단절 해석) + findBrokenChain(끊어진 체인) + analyzeGyeokguk.flowSummary",
        "mbti": ": (대응 미정)",
        "cross": "오행 순환 분석은 사주 고유의 메커니즘이다. MBTI에서 가장 강한 성향과 두 번째 성향이 함께 발달할 때 나타나는 자연스러운 흐름과 형식적으로 유사하지만, 오행 순환은 5가지 원소 간 상생과 상극이라는 전혀 다른 체계로 작동한다.",
        "impact": 5
      },
      {
        "id": "P-MERIT-008",
        "tier": "B",
        "name": "용신 방향의 개운 강점 — '무엇을 하면 강해지는가'를 아는 것 자체가 강점",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin"
        ],
        "saju": "analyzeGyeokguk.yongshin + SJ_calcOsinChegye(5신 체계) + SJ_GAEUN(개운법 5행) + SAJU_GAEUN(개운 상세)",
        "mbti": ": (대응 미정)",
        "cross": "가장 필요한 에너지는 사주 고유의 에너지 처방 체계다. MBTI에도 '무엇을 하면 에너지가 충전되는가'라는 개념이 있어 교차 가능성이 높다. 그러나 사주의 필요 에너지는 방향, 색상, 직업까지 포함하는 포괄적 처방이어서 사주 단독으로도 매우 완결적이다.",
        "impact": 7
      },
      {
        "id": "P-MERIT-010",
        "tier": "B",
        "name": "합(合)이 만드는 조화 강점 — 에너지가 결합하여 새로운 능력이 탄생한 구조",
        "tags": [
          "relation:충"
        ],
        "saju": "calcRelations(합충형해 계산) 중 cheonganHap + jijiHap + jijiSamhap + SJ_buildWonkukRelations",
        "mbti": ": (대응 미정)",
        "cross": "에너지 결합과 충돌은 사주 고유의 메커니즘이다. 그러나 에너지 결합이 만드는 '시너지'는 MBTI에서 가장 강한 성향과 두 번째 성향이 함께 작동할 때의 시너지와 형식적으로 유사하여, '어떤 종류의 결합인가'라는 교차 통찰이 가능하다. 현재는 사주 단독으로 강점 구조를 기술한다.",
        "impact": 6
      },
      {
        "id": "P-MERIT-002",
        "tier": "B",
        "name": "통변 길한 공식의 구조적 강점 — 에너지 흐름이 자연스럽게 좋은 결과를 만드는 패턴",
        "tags": [
          "ss:식신",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:재관쌍미",
          "tongbyeon:인수생비",
          "tongbyeon:식신제살"
        ],
        "saju": "SJ_detectTongbyeon 길(吉) 공식 감지 결과: 식상생재 / 살인상생 / 재관쌍미 / 인수생비 / 식신제살",
        "mbti": ": (대응 미정)",
        "cross": "에너지 흐름 공식은 오행 간 상생상극 관계에서 파생되는 사주 고유의 메커니즘으로, 다른 성격 분석 체계에는 없는 '에너지 변환 패턴'이다. MBTI에서 성향들이 서로 상호작용하는 방식과 형식적 유사성은 있으나, 사주의 에너지 흐름 공식은 구체적인 수치 기준이 있어 사주 단독으로 완결적이다.",
        "impact": 8
      },
      {
        "id": "P-MERIT-007",
        "tier": "B",
        "name": "12운성 일지 강점 — 배우자궁/내면에 깔린 에너지의 질감이 만드는 강점",
        "tags": [
          "pillar:일지",
          "uses:unsung"
        ],
        "saju": "SJ_UNSUNG_MEANING(12운성 궁위별 의미) + UNSUNG_KW(12운성 체감 키워드) + 일지 12운성",
        "mbti": ": (대응 미정)",
        "cross": "에너지 생명주기 단계는 사주 고유의 세밀한 에너지 질감 분류다. MBTI에는 이런 세밀한 에너지 상태 분류가 없다. 이 단계와 60가지 본인 자리 조합이 결합하면 매우 세밀한 개인화가 가능해진다.",
        "impact": 6
      },
      {
        "id": "P-MERIT-013",
        "tier": "S",
        "name": "강점 정렬 진단 — 일주 고유 강점과 주기능 건강한 발현의 일치/불일치",
        "tags": [
          "uses:ilju",
          "uses:dominant"
        ],
        "saju": "ILJU_KW[일주].core(60일주 고유 강점 키워드) + JEOKCHEONSU[일간](적천수 본질 강점)",
        "mbti": ": MT_FUNCTIONS[dominant].healthyExpression + MT_TYPES[code].stack[0]",
        "cross": "핵심 교차 가치는 이렇다. 사주의 본인 자리 핵심은 출생 시점에 고정된 구조적 강점이고, MBTI의 가장 강한 성향은 자기 보고에 기반한 인식된 강점이다. 두 체계의 강점 방향이 일치하면 '자기 강점을 정확히 아는 사람'이라는 확신이 생기고, 불일치하면 '아직 자각하지 못한 구조적 강점'이라는 새로운 정보가 나온다. 불일치할 때 '왜 이 강점을 스스로 느끼지 못하는가?'라는 질문이 자기 이해의 돌파구가 된다.",
        "impact": 8
      }
    ],
    "남들이 보는 나": [
      {
        "id": "CROSS-LOOK-004",
        "tier": "A",
        "name": "존재감 크기의 삼중 진단 — 신강도 × 음양 방향 × E/I 축 강도",
        "tags": [
          "uses:strength",
          "unsung:양",
          "uses:yinyang",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "getStrengthGrade(gg) + SJ_calcYinYang(saju)",
        "mbti": ": MT_INTENSITY_PROFILES.E/I[강도]",
        "cross": "존재감이라는 단일 현상을 세 개의 독립적 변수로 함께 살펴본다. 세 변수의 일치/불일치 패턴이 '왜 이 사람의 존재감이 맥락에 따라 다른가'를 구조적으로 설명한다. 특히 불일치 조합이 만드는 독특한 인상(에너지는 큰데 안 보이는 사람, 에너지는 작은데 자꾸 나오는 사람)은 세 변수를 교차해야만 포착 가능하다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOOK-001",
        "tier": "A",
        "name": "첫인상 구조의 교차 — 에너지 색채(오행) × 행동 양식(상호작용 스타일)",
        "tags": [
          "unsung:양",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "ST5_PILLAR_PSYCHOLOGY.yearPillar.ganMeaning + OHAENG_TGAN[yg]",
        "mbti": ": MT_INTERACTION_STYLES[유형의 interactionStyle]",
        "cross": "에너지의 질감(무엇으로 느껴지는가)과 행동의 양식(어떻게 행동하는가)이라는 서로 다른 차원을 교차하여 첫인상의 다면성을 포착한다. 한쪽만으로는 '어떤 느낌의 사람인데 어떻게 행동하는지'를 동시에 설명할 수 없다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOOK-007",
        "tier": "A",
        "name": "갈등 시 타인 인식의 이중 진단 — 갈등 스타일 × 궁위별 관계 맥락",
        "tags": [
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "SIPSUNG_GUNGWI_KW + SSP의 궁위별 해석",
        "mbti": ": MT_CONFLICT_STYLES[유형].fightStyle/blindSpot + MT_ANGER.byType[유형]",
        "cross": "갈등 시 타인에게 어떻게 보이는지를 행동 패턴(MBTI 성향 기반)과 관계 맥락(사주 자리 배치 기반)의 교차로 살펴본다. '어떤 관계에서 어떤 방식의 갈등이 보이는가'를 두 축으로 특정하여, 같은 유형이라도 사주 자리 배치에 따라 갈등 인상이 달라지는 이유를 설명한다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-012",
        "tier": "B",
        "name": "주기능 태도(내향/외향)가 만드는 겉-속 구조적 괴리 — 타인은 부기능을 먼저 본다",
        "tags": [
          "unsung:태",
          "uses:dominant",
          "uses:auxiliary",
          "axis:EI"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_FUNCTIONS[주기능].attitude + MT_FUNCTIONS[부기능].attitude + MT_STACK_POSITIONS.dominant/auxiliary + MT_TYPES[code].stack",
        "cross": "MBTI 성향의 내향/외향 방향이라는 단일 변수로 '왜 타인이 이 사람의 핵심을 못 보는가'를 구조적으로 설명한다. 가장 강한 성향이 내향인 8개 유형은 구조적으로 오해받기 쉽고, 외향인 8개 유형은 구조적으로 읽히기 쉽다는 체계적 예측이 가능하다.",
        "impact": 8
      },
      {
        "id": "P-LOOK-020",
        "tier": "B",
        "name": "대운 십성이 만드는 타인 인식의 시간적 변화 — '이 사람 예전이랑 달라졌다'의 구조적 원인",
        "tags": [
          "unsung:사",
          "uses:daewoon"
        ],
        "saju": "DW_SIPSUNG_KW[대운십성그룹].strong/weak + DW_TRANSITION_KW + SJ_findGyowoongi",
        "mbti": ": 없음 — 사주 단독",
        "cross": "타인 인식의 시간적 변화를 10년 단위로 예측할 수 있는 것은 사주 고유다. '왜 5년 전과 지금 이 사람이 달라 보이는가'에 대한 시간축 답변이다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-001",
        "tier": "B",
        "name": "년간 오행이 결정하는 첫인상 에너지 색채",
        "tags": [
          "pillar:년주",
          "unsung:사",
          "uses:mulsang"
        ],
        "saju": "ST5_PILLAR_PSYCHOLOGY.yearPillar.ganMeaning + SAJU_PILLAR_PSY.yearGan + MULSANG_GAN[년간] + OHAENG_TGAN[yg]",
        "mbti": ": 없음 — 사주 단독",
        "cross": "첫인상의 에너지 색채를 오행 물상으로 구체화할 수 있는 것은 사주 고유다. 외부 환경 자리라는 특정 위치가 '외부 인상'을 담당한다는 자리 이론이 근거다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-002",
        "tier": "B",
        "name": "월간 십성이 만드는 사회적 페르소나 — 직장/모임에서 보이는 나",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "ST5_PILLAR_PSYCHOLOGY.monthPillar.ganMeaning + SAJU_PILLAR_PSY.monthGan + SS_CONTEXT[월간십성].general + SSP[월간십성]['월주']",
        "mbti": ": 없음 — 사주 단독",
        "cross": "사회적 페르소나를 관계론적 에너지로 설명하는 것은 사주 고유의 방식이다. 같은 사람이 직장에서와 집에서 다르게 보이는 이유를 사회/직업 자리와 본인 자리의 차이로 구조적으로 설명한다.",
        "impact": 8
      },
      {
        "id": "CROSS-LOOK-009",
        "tier": "B",
        "name": "납음 존재 상징 × 기질의 존재적 인상 조합 — '이 사람은 어떤 존재인가'의 이중 이미지",
        "tags": [
          "unsung:사",
          "uses:napeum",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "getNapeum(dg,dj) + NAPEUM_STORY + NAPEUM_TABLE",
        "mbti": ": MT_TEMPERAMENTS[기질코드].name/coreNeed",
        "cross": "60가지 본인 자리를 30쌍으로 묶어 각각에 자연 이미지 상징을 부여하는 사주 고유의 방식(사주 고유)과 기질의 4대 동기 구조(MBTI 고유)가 결합하여 120가지 '존재적 인상' 조합을 생성한다. 자연 이미지 상징 단독으로는 '어떤 이미지인가'만 설명하고, 기질 단독으로는 '어떤 동기의 사람인가'만 설명하지만, 교차하면 '어떤 이미지의 어떤 동기를 가진 사람'이라는 입체적 존재 인상이 된다.",
        "impact": 5
      },
      {
        "id": "P-LOOK-003",
        "tier": "B",
        "name": "년간-일간 오행 관계가 만드는 겉-속 일치도 — 첫인상과 실제의 괴리/일치",
        "tags": [
          "unsung:사"
        ],
        "saju": "OHAENG_TGAN[yg] vs OHAENG_TGAN[dg] + OH_SANG/OH_GEUK 관계 + ST5_PILLAR_PSYCHOLOGY.yearPillar vs dayPillar",
        "mbti": ": 없음 — 사주 단독",
        "cross": "첫인상과 실제 자아의 차이를 두 자리 간 오행 관계로 구체적으로 살펴볼 수 있다는 것이 사주 고유의 구조다. 에너지가 서로 돕는지, 충돌하는지, 비슷한지에 따라 그 차이의 질감까지 설명 가능하다.",
        "impact": 8
      },
      {
        "id": "P-LOOK-004",
        "tier": "B",
        "name": "격국이 타인에게 투사하는 사회적 역할 기대 — '이 사람은 이런 역할을 할 것이다'",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "JAPYEONG_GG[격국명].role + ST5_GYEOKGUK_SYSTEM.types[격국명].role + gyeokgukDesc",
        "mbti": ": 없음 — 사주 단독",
        "cross": "사주의 에너지 구조가 사회적 역할 코드로 작동하여 타인의 기대를 형성한다는 관점이다. 성격이 아니라 역할이 타인 인식의 단위라는 사주 고유의 프레임이 포인트다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-006",
        "tier": "B",
        "name": "신강도 5등급이 결정하는 존재감의 크기",
        "tags": [
          "uses:strength",
          "unsung:사"
        ],
        "saju": "getStrengthGrade(gg) + SJ_buildStrengthText(gg) + analyzeGyeokguk.strengthScore/strengthGrade",
        "mbti": ": 없음 — 사주 단독",
        "cross": "존재감의 크기를 자기 편 에너지 비율로 5단계로 나눌 수 있는 것은 사주만의 방식이다. '왜 이 사람은 조용한데 깊어 보이는가'를 구조적으로 설명한다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-009",
        "tier": "B",
        "name": "물상(物象) 원국 풍경이 만드는 직관적 인상 이미지",
        "tags": [
          "unsung:사",
          "uses:mulsang"
        ],
        "saju": "buildNatalLandscape(saju) + MULSANG_GAN + MULSANG_SEASON + WOLJI_SEASON + JIJI_MULSANG + calcLandscapeHarmony",
        "mbti": ": 없음 — 사주 단독",
        "cross": "물상이라는 이미지 기반의 직관적 표현이 사주 고유의 설명 방식이다. '이 사람은 어떤 풍경인가'라는 접근으로 타인에게 주는 인상을 설명한다.",
        "impact": 5
      },
      {
        "id": "P-LOOK-011",
        "tier": "B",
        "name": "상호작용 스타일이 결정하는 즉각적 대인 인상 — 처음 만난 30초",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_INTERACTION_STYLES[유형의 interactionStyle].name/coreGoal/energy/communication",
        "cross": "상호작용 스타일은 MBTI 성향 전체가 외부로 드러나는 행동 패턴의 유형이다. 개별 성향이 아닌 전체 성향 조합이 사회적으로 어떻게 발현되는지를 4가지 유형으로 나눠, 타인이 나를 어떻게 느끼는지 바로 파악할 수 있게 해준다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-013",
        "tier": "B",
        "name": "E/I 축 강도에 의한 사교적 인상의 스펙트럼 — 같은 I라도 55와 88은 다른 사람",
        "tags": [
          "unsung:사",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_INTENSITY_PROFILES.E/I[55/68/88]",
        "cross": "같은 유형 안에서도 축 강도에 따라 타인 인식이 완전히 달라진다는 스펙트럼 관점이다. 유형론의 이분법적 한계를 강도 변수로 보완하여 '같은 INFP인데 왜 사교성이 다르게 보이는가'를 설명한다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-015",
        "tier": "B",
        "name": "갈등 시 타인이 보는 나 — 평소와 다른 얼굴",
        "tags": [
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_CONFLICT_STYLES[유형].fightStyle/trigger/blindSpot + MT_ANGER.byType[유형]",
        "cross": "갈등 상황이라는 특정 맥락에서 타인이 나를 어떻게 보는지를 따로 살펴본다. 평소 인상과 갈등 시 인상의 차이 자체가 타인에게 '이 사람은 겉과 속이 다르다'는 판단의 근거가 된다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-018",
        "tier": "B",
        "name": "SNS 게시/소통 패턴이 만드는 디지털 페르소나 — 온라인에서 남들이 보는 나",
        "tags": [
          "ref:MT_SOCIAL"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_SOCIAL_MEDIA[유형].posting/interaction/darkside",
        "cross": "디지털 환경이라는 현대적 맥락에서 타인이 나를 어떻게 보는지를 MBTI 성향 패턴으로 살펴본다. 오프라인 인상과 온라인 인상의 차이가 유형별로 어떻게 나타나는지를 설명한다.",
        "impact": 5
      },
      {
        "id": "CROSS-LOOK-005",
        "tier": "B",
        "name": "사회적 페르소나의 이중 구조 — 월간 십성 × 기질/상호작용 스타일",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_INTERACTION_STYLES",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "SS_CONTEXT[월간십성].general + SSP[월간십성]['월주'] + SAJU_PILLAR_PSY.monthGan",
        "mbti": ": MT_TEMPERAMENTS[기질코드] + MT_INTERACTION_STYLES[스타일]",
        "cross": "사회적 페르소나를 관계론적 에너지(사주)와 행동·동기 유형(MBTI 기질·상호작용 스타일)으로 두 방향에서 살펴본다. 사주는 '이 사람이 사회에서 어떤 역할 에너지를 쓰는가'를, MBTI 기질과 스타일은 '이 사람이 사회에서 어떤 방식으로 행동하는가'를 각각 설명하여 페르소나의 입체성이 높아진다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-019",
        "tier": "B",
        "name": "육친론이 만드는 관계별 타인 인식 — 같은 사람이 관계에 따라 다르게 보이는 구조적 이유",
        "tags": [
          "unsung:사",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별] + SS_CONTEXT[십성].spouse/career/child/outer + SJ_buildYukchinText",
        "mbti": ": 없음 — 사주 단독",
        "cross": "타인 인식이 '나'의 고유 속성이 아니라 '나와 상대의 관계 함수'라는 관계론적 프레임이다. 같은 사람이 A에게는 편안한 사람이고 B에게는 위협적인 사람이 되는 이유를, 사주에서 각 에너지가 상대방의 에너지와 어떤 관계를 맺는지로 설명한다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-021",
        "tier": "B",
        "name": "연애 관계에서 파트너가 보는 나의 다단계 인상 변화 — 초기 매력에서 깊은 관계까지",
        "tags": [
          "ref:MT_LOVE"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_LOVE[유형].attract/earlyDating/deepRelation/conflict/breakup",
        "cross": "연애 관계라는 특정 맥락에서 파트너에게 어떻게 보이는지가 시간에 따라 5단계로 달라지는 것을 추적한다. 일반적인 첫인상이나 갈등 시 인상과 달리, 친밀 관계가 깊어짐에 따른 인상 변화의 흐름을 보여준다는 점이 이 분석의 고유한 가치다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-005",
        "tier": "B",
        "name": "신살이 입히는 대인 인상의 특수 레이어",
        "tags": [
          "unsung:사"
        ],
        "saju": "SINSAL_STORY + SINSAL_KEYWORDS + getSpecialSinsal + calcExtraSinsal",
        "mbti": ": 없음 — 사주 단독",
        "cross": "사주 고유의 특수 에너지가 타인 인식에 특별한 색을 입힌다. 일반적인 성격 분석에서는 잡아내기 어려운 '특정 종류의 매력, 위협, 신비로움'을 설명하는 것이 포인트다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-007",
        "tier": "B",
        "name": "음양 밸런스가 결정하는 에너지 방향성 — 능동/수동 인상",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yinyang"
        ],
        "saju": "SJ_calcYinYang(saju) + SJ_buildYinYangText",
        "mbti": ": 없음 — 사주 단독",
        "cross": "8자 전체의 음양 비율이라는 단일 지표로 에너지 방향성을 읽어내는 것이 사주 고유의 방식이다. 전체적인 '느낌'의 근거를 음양이라는 가장 원초적인 두 가지 대립으로 설명한다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-008",
        "tier": "B",
        "name": "투출 여부가 결정하는 에너지의 가시성 — 보이는 나 vs 숨겨진 나",
        "tags": [
          "unsung:사",
          "uses:tuchul"
        ],
        "saju": "SJ_checkTuchul(saju) + ST5_JIJANGGAN_LAYERS.tuchul + JIJANGGAN_HIDDEN_KW",
        "mbti": ": 없음 — 사주 단독",
        "cross": "에너지가 표면에 드러나 있는지 여부라는 사주 고유 개념이 '왜 이 능력이 남에게 안 보이는가'를 구조적으로 설명한다. 사주에서 에너지는 세 겹의 층위(표면/중간/깊은 곳)에 숨겨져 있을 수 있으며, 어느 층위에 있느냐에 따라 타인에게 보이는 정도가 달라진다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-010",
        "tier": "B",
        "name": "십성 궁위 배치에 의한 맥락별 타인 인식 분화 — 같은 성격이 관계 맥락에 따라 다르게 보이는 이유",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel",
          "temperament:SP"
        ],
        "saju": "SIPSUNG_GUNGWI_KW + SSP + SS_CONTEXT의 궁위별 해석 + SAJU_PILLAR_PSY",
        "mbti": ": 없음 — 사주 단독",
        "cross": "같은 에너지라도 어떤 관계 자리(직업, 배우자, 자녀 등)에 있느냐에 따라 완전히 다르게 발현되고 인식된다는 것은 사주 고유의 통찰이다. 타인 인식이 관계 맥락에 따라 분화되는 이유를 구조적으로 설명한다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-014",
        "tier": "B",
        "name": "기질(Temperament)이 결정하는 사회적 역할 기대 — '이 사람은 이런 종류의 사람'",
        "tags": [
          "unsung:사",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_TEMPERAMENTS[기질코드].name/coreNeed/communication",
        "cross": "기질은 세부 성향보다 상위 수준의 사회적 범주화 도구다. 타인이 세부 성향을 몰라도 기질 수준에서는 직관적으로 읽을 수 있다는 점에서, '남들이 보는 나'를 설명하는 데 직접적으로 연결된다.",
        "impact": 7
      },
      {
        "id": "P-LOOK-016",
        "tier": "B",
        "name": "오인(Mistype) 구조 — 타인이 이 사람의 유형을 왜 잘못 읽는가",
        "tags": [
          "unsung:사",
          "uses:mistype"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_MISTYPE[해당쌍].rootCause/keyDifference/testQuestion",
        "cross": "타인이 나를 잘못 읽는 구조적 이유를 성향 수준에서 설명한다. '왜 남들이 나를 오해하는가'에 대해 구체적인 답을 찾을 수 있다.",
        "impact": 6
      },
      {
        "id": "P-LOOK-017",
        "tier": "B",
        "name": "그림자 기능 opposing의 방어적 발현 — 위협받을 때 타인이 보는 '다른 사람'",
        "tags": [
          "unsung:사",
          "uses:osin",
          "uses:shadow"
        ],
        "saju": "없음 — MBTI 단독",
        "mbti": ": MT_SHADOW_BY_TYPE[유형].opposing_[기능] + MT_SHADOW_POSITIONS.opposing",
        "cross": "극심한 스트레스 상태에서 무의식적으로 작동하는 방어 패턴이 타인에게 투사되는 '위기 시 모습'을 설명한다. 평소의 의식적인 모습과 위기 상황에서 무의식적으로 튀어나오는 모습 사이의 차이가, 타인이 보기에 '이 사람은 왜 일관성이 없지'라는 인상을 만든다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOOK-003",
        "tier": "C",
        "name": "사회적 역할 기대의 이중 진단 — 격국 역할 × 기질 역할",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "JAPYEONG_GG[격국명].role + ST5_GYEOKGUK_SYSTEM.types[격국명].role",
        "mbti": ": MT_TEMPERAMENTS[기질코드].name/coreNeed",
        "cross": "사회적 역할을 두 가지 서로 다른 관점에서 살펴볼 수 있다. 두 관점의 결과가 일치하면 그 사람의 역할 정체성이 명확해지고, 불일치하면 역할 혼란이 생기는 구조적 원인을 찾아낼 수 있다. 어느 한 관점만으로는 '왜 이 사람의 역할이 명확하지 않은가'를 설명하기 어렵다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOOK-006",
        "tier": "S",
        "name": "오인(Mistype) 구조와 겉-속 괴리의 교차 — 사주적 괴리가 유형 오인을 강화하는 구조",
        "tags": [
          "unsung:사",
          "relation:해",
          "uses:mistype"
        ],
        "saju": "OHAENG_TGAN[yg] vs OHAENG_TGAN[dg] + SJ_checkTuchul",
        "mbti": ": MT_MISTYPE[해당쌍].rootCause/frequency",
        "cross": "타인에게 다른 유형으로 오인받는 현상의 원인을 성향 구조와 에너지 불일치(외부 환경 자리와 나 자신 자리의 관계, 에너지 노출 여부)로 함께 살펴본다. 오인이 단순히 '비슷해 보여서'가 아니라 에너지 불일치까지 겹쳐 강화되는 구조를 보여준다. '왜 이 사람은 유독 오인을 많이 당하는가'에 대해 두 가지 각도에서 답을 찾을 수 있다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOOK-008",
        "tier": "S",
        "name": "타인 인식의 시간적 변화 교차 — 대운 십성 전환 × 인지기능 발달 단계",
        "tags": [
          "uses:daewoon",
          "uses:development"
        ],
        "saju": "DW_SIPSUNG_KW[대운십성그룹] + DW_TRANSITION_KW[이전→현재]",
        "mbti": ": MT_DEVELOPMENT_STAGES[연령대] + MT_STACK_POSITIONS[발달중인 기능위치]",
        "cross": "타인 인식이 변화하는 시간축을 두 가지 흐름, 즉 10년 흐름 주기와 성향의 연령별 발달 단계로 함께 살펴본다. 두 시간축이 같은 방향으로 움직이면 변화가 급격하고, 서로 엇갈리면 변화가 느려진다는 예측은 교차 분석에서만 가능하다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOOK-002",
        "tier": "S",
        "name": "겉-속 괴리의 이중 진단 — 궁위 간 오행 관계 × 주기능 태도",
        "tags": [
          "unsung:태",
          "uses:dominant"
        ],
        "saju": "OHAENG_TGAN[yg] vs OHAENG_TGAN[dg] + OH_SANG/OH_GEUK",
        "mbti": ": MT_FUNCTIONS[주기능].attitude + MT_TYPES[code].stack[0-1]",
        "cross": "겉으로 보이는 모습과 속마음의 차이를 두 가지 서로 다른 메커니즘, 즉 사주의 각 자리 간 에너지 관계와 MBTI의 성향 방향성으로 함께 살펴본다. 두 분석의 일치 여부가 겉-속 차이의 성격을 결정한다. 에너지 차원의 불일치와 인식 차원의 불일치를 구분해보면 '이 사람의 겉-속 다름이 어떤 종류인가'를 구체적으로 파악할 수 있다.",
        "impact": 8
      }
    ],
    "대운 흐름": [
      {
        "id": "P-DW-004",
        "tier": "B",
        "name": "대운 vs 원국 합충형해 발동에 의한 10년간 변동 영역 특정",
        "tags": [
          "relation:충",
          "uses:daewoon",
          "uses:sewoon"
        ],
        "saju": "analyzeDWSEvsWonkuk(saju, dw) + SJ_IMPACT_SCORE + SEUN_HAPCHUNG_KW",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 에너지 결합·충돌·마찰이 각 자리(년·월·일·시)에 미치는 충격 정도와 10년 흐름-원래 에너지 구조 간의 관계를 함께 살펴봄으로써, '10년간 삶의 어느 영역이 흔들리는가'를 구체적으로 짚어낸다.",
        "impact": 8
      },
      {
        "id": "P-DW-002",
        "tier": "B",
        "name": "대운 전환기(교운기)의 인생 이벤트 집중 — 16가지 전환 패턴",
        "tags": [
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi + SJ_TRANSITION + SJ_SS_GROUP",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 10년 흐름 전환의 '방향'(어디서 어디로 바뀌는가)과 '시점'(몇 세에 바뀌는가)을 동시에 짚어주는 방식이다. MBTI의 성향 발달 단계는 수십 년 단위여서 10년 흐름 전환의 정밀한 시점을 보여주기에는 맞지 않는다.",
        "impact": 9
      },
      {
        "id": "P-DW-008",
        "tier": "B",
        "name": "대운별 건강 에너지 변화 — 대운 오행 × 원국 건강 취약점 교차",
        "tags": [
          "condition:lack",
          "uses:daewoon"
        ],
        "saju": "SJ_HEALTH_OH + calcDaewoon → daewoons[i].oh + saju.elFull/lackFull",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 오행과 신체 장기의 대응 관계(황제내경 기반)와 10년 흐름의 시간축을 함께 보면, '어떤 10년에 어떤 건강 영역이 취약해지는가'를 미리 살펴볼 수 있다. 각 오행의 과다·부족이 어느 장기에 영향을 미치는지가 근거가 된다.",
        "impact": 6
      },
      {
        "id": "P-DW-003",
        "tier": "B",
        "name": "교운기 전환 속도의 3변수 결정 — 에너지 거리 × 원국 친화도 × 자아 강도",
        "tags": [
          "condition:교운기"
        ],
        "saju": "calcTransitionSpeed(prevDWOh, newDWOh, saju, gg)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 대운 전환 속도를 3가지 요소로 읽어내는 방식이다. 에너지들이 서로 돕거나 부딪히는 관계 구조가 적응 속도를 가늠하는 실질적인 근거가 된다는 점이 고유하다.",
        "impact": 7
      },
      {
        "id": "P-DW-007",
        "tier": "B",
        "name": "대운-세운 상호작용에 의한 '큰 흐름 안의 올해 파도' 구조",
        "tags": [
          "uses:daewoon",
          "uses:sewoon"
        ],
        "saju": "SJ_buildOsinText + SJ_generateKillingPoints + calcDaewoon → seun",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 10년 흐름과 1년 파도의 이중 구조가 만드는 '전략적 타이밍 판단' — 언제 움직이고 언제 참을지의 구체적 근거. 앞서 살펴본 올해 키워드의 세운 분석과 이어지지만, 여기서는 10년 흐름이라는 큰 틀 안에서 올해의 의미가 어떻게 달라지는지에 초점을 맞춘다.",
        "impact": 8
      },
      {
        "id": "P-DW-001",
        "tier": "B",
        "name": "대운 십성별 10년 에너지 모드 — 신강/신약 분화 포함",
        "tags": [
          "strength:신강+",
          "strength:신약+",
          "uses:strength",
          "uses:daewoon"
        ],
        "saju": "calcDaewoon → daewoons[i].ss + analyzeGyeokguk → strengthGrade",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 10년 흐름의 에너지 모드와 나와 세상 사이의 에너지 균형의 조합으로, 10년간의 삶의 주제와 에너지를 어떻게 활용할지(적극 공세 또는 방어 유지)가 함께 드러난다. MBTI에는 10년 단위 에너지 전환 변수가 없다.",
        "impact": 9
      },
      {
        "id": "P-DW-005",
        "tier": "B",
        "name": "대운 5신 판별에 의한 10년 길흉 등급 — 용신/희신/기신/구신/한신",
        "tags": [
          "uses:daewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye + SJ_getOsinLabel + SJ_extractYongshinOh",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 내 에너지 구조 전체에서 어떤 흐름이 나에게 가장 잘 맞는지를 파악하고, 그 흐름이 들어오는 시기인지 아닌지에 따라 10년 흐름의 좋고 나쁨이 결정된다. 같은 재물 에너지 흐름이라도 그것이 내 구조에 꼭 필요한 흐름이라면 최고의 재물 시기가 되고, 내 구조와 맞지 않는 흐름이라면 재물이 오히려 독이 되는 시기가 된다.",
        "impact": 9
      },
      {
        "id": "P-DW-006",
        "tier": "B",
        "name": "인생 로드맵 — 대운 8기(80년) 통합 시간축 구조",
        "tags": [
          "uses:daewoon"
        ],
        "saju": "SJ_buildLifeRoadmap(dw, saju, gg, gender)",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 10년 흐름의 에너지 모드, 에너지 좋고 나쁨 판정, 관계 에너지 흐름을 하나의 로드맵으로 엮어낸 결과물이다. 80년 인생의 에너지 흐름을 한눈에 조망할 수 있다는 것이 사주만의 고유한 강점이다.",
        "impact": 10
      }
    ],
    "맞춤 재물 쌓는 법": [
      {
        "id": "P-MONEY-017",
        "tier": "B",
        "name": "그립 상태에서의 재물 파괴 행동 — '평소와 완전히 다른 돈 쓰는 방식'이 발동하는 순간",
        "tags": [
          "unsung:태",
          "uses:inferior",
          "stress:grip",
          "ref:MT_MONEY"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES.stage4_grip.examples[유형] + MT_MONEY[유형].trap — 그립 상태에서 열등기능이 원시적으로 폭발하며 재물 파괴 행동 발생",
        "cross": "MBTI 단독으로 완결되는 분석이다. 극심한 스트레스 상태에서 가장 약한 성향이 원시적으로 폭발하는 것은 MBTI 고유의 메커니즘이며, 사주에는 이런 심리적 스트레스 반응에 따른 소비 행동 변화를 설명하는 변수가 없다. 사주는 방해 에너지 시기에 재물 에너지가 하락한다고 보여주지만, '구체적으로 어떤 방식의 소비 파괴가 일어나는가'는 이 스트레스 모델만이 보여줄 수 있다.",
        "impact": 5
      },
      {
        "id": "P-MONEY-009",
        "tier": "B",
        "name": "대운 전환기(교운기)의 재물 전략 전환 — '지금이 재물 방향을 바꿔야 할 때인가'",
        "tags": [
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi → 교운기 임박 여부 + SJ_TRANSITION[이전그룹→현재그룹] 의미 + DW_TRANSITION_KW + DW_SIPSUNG_KW[현재대운십성그룹].strong/weak",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 10년 주기의 에너지 모드 전환에 따른 재물 전략 전환은 MBTI에서는 볼 수 없는 관점이다. 10년 흐름 전환의 다양한 패턴이 각각 다른 재물 전략 전환을 이끌어낸다.",
        "impact": 7
      },
      {
        "id": "P-MONEY-001",
        "tier": "B",
        "name": "재성 구조가 결정하는 재물 축적 기본 경로 — 정재형 vs 편재형 vs 식상생재형 vs 재성부재형",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon"
        ],
        "saju": "SJ_findMoneyTiming → styleText 로직: ssArr['정재'] vs ssArr['편재'] 비율 + SJ_detectTongbyeon → 식상생재 여부 + gg.cnt['재성'] 총량",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 꾸준히 수입을 쌓아가는 성향과 큰 기회를 한 번에 잡으려는 성향의 비율, 그리고 내가 잘하는 것을 발휘할 때 자연스럽게 재물이 따라오는 흐름의 유무가 재물 축적의 기본 방향을 결정한다. 이 방향을 먼저 파악하지 않으면 누구에게나 똑같은 재물 조언이 되어버려 실질적인 도움이 되지 않는다.",
        "impact": 9
      },
      {
        "id": "P-MONEY-004",
        "tier": "B",
        "name": "재물 타이밍 5년 예측 — 세운별 재물 점수와 최적 행동 시기",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "ss:식상",
          "pillar:년주",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "uses:daewoon",
          "uses:sewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_findMoneyTiming → 5년간 세운별 점수(편재운/정재운 + 재성지지 + 대운재성 + 식상생재시너지 + 5신 용신/기신 판정)",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 시간축에 따른 재물 에너지 변동은 MBTI에서는 볼 수 없는 관점이다. 올해 흐름의 하늘 에너지 성격, 땅 에너지 특성, 10년 흐름의 재물 에너지, 내가 잘하는 것이 자연스럽게 돈으로 연결되는 흐름, 지금 들어오는 흐름이 나에게 맞는 흐름인지 아닌지, 흐름을 방해하는 에너지의 영향, 이 여섯 가지를 함께 살펴야 재물 타이밍을 제대로 읽어낼 수 있다.",
        "impact": 8
      },
      {
        "id": "P-MONEY-006",
        "tier": "B",
        "name": "신강도 5등급에 의한 재물 전략의 공격/방어 분화 — 극신강의 적극 투자 vs 극신약의 보수적 축적",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength"
        ],
        "saju": "analyzeGyeokguk → strengthScore/strengthGrade + selfStr/otherStr 비율 + SJ_buildStrengthText 처방",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 나와 세상 사이의 에너지 균형은 내 안에 쌓인 에너지와 밖으로 쓰이는 에너지의 비율로 결정되며, MBTI에는 이에 해당하는 에너지 총량을 가늠하는 기준이 없다.",
        "impact": 7
      },
      {
        "id": "P-MONEY-010",
        "tier": "B",
        "name": "개운법의 재물 구체화 — 용신 오행으로 일상 재물 환경 최적화",
        "tags": [
          "uses:yongshin",
          "uses:gaeun"
        ],
        "saju": "SJ_GAEUN[용신오행] → direction/color/number/season/career/food + SJ_buildGaeunText",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 방향·색상·숫자·계절·직업·음식 등 여섯 가지 차원의 구체적인 생활 처방은 MBTI에서는 제공하지 않는다. 특히 방향·색상·숫자 같은 물리적 환경 조정은 사주 개운법에서만 다루는 영역이다.",
        "impact": 6
      },
      {
        "id": "P-MONEY-012",
        "tier": "B",
        "name": "육친론이 결정하는 재물 관계 맥락 — '누구를 통해 돈이 들어오는가'",
        "tags": [
          "ss:재성",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별] + SS_CONTEXT[십성].career + 궁위별 재성 배치(년/월/일/시)",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 에너지 구성을 성별과 관계 맥락으로 풀어내는 사주 고유의 방식은 MBTI에는 없는 관계별 에너지 흐름을 보여준다.",
        "impact": 6
      },
      {
        "id": "P-MONEY-018",
        "tier": "B",
        "name": "납음(納音) 물상이 결정하는 재물 에너지의 존재적 질감 — '이 사람의 돈은 어떤 성질의 돈인가'",
        "tags": [
          "unsung:사",
          "uses:ilju",
          "uses:mulsang",
          "uses:napeum"
        ],
        "saju": "SJ_getNapeum(dg, dj) → NAPEUM_TABLE[idx].name/desc + NAPEUM_STORY[납음명] — 일주 기준 30종 납음 물상",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 60가지 본인 자리를 30쌍으로 묶어 각각에 자연 이미지 상징을 부여하는 사주 고유의 방식은 MBTI에는 이에 해당하는 개념이 없다.",
        "impact": 4
      },
      {
        "id": "P-MONEY-002",
        "tier": "B",
        "name": "5신 체계에 의한 재물 에너지 최적 방향 — 용신 오행이 가리키는 '돈이 들어오는 채널'",
        "tags": [
          "uses:johu",
          "condition:종격",
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye → yongsin/huisin 오행 + SJ_GAEUN[용신오행].direction/color/number/season/career/food + analyzeGyeokguk → yongshinType(조후/통관/억부/종격)",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 내 에너지 구조에서 부족한 부분을 채워 균형을 잡는 방향은 MBTI에서는 볼 수 없는 관점이다. 방향·색상·숫자·계절·직업·음식 등 여섯 가지 구체적인 처방이 재물 전략을 일상 속에서 실천할 수 있는 수준으로 풀어준다.",
        "impact": 9
      },
      {
        "id": "P-MONEY-003",
        "tier": "B",
        "name": "통변 길/흉 공식이 만드는 재물 구조적 시너지와 구조적 장애 — '돈이 자동으로 불어나는 회로' vs '돈이 자동으로 새는 회로'",
        "tags": [
          "strength:신약+",
          "condition:excess",
          "ss:비겁",
          "ss:상관",
          "ss:재성",
          "ss:식상",
          "unsung:태",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:비겁탈재",
          "tongbyeon:재관쌍미",
          "tongbyeon:재다신약",
          "tongbyeon:재성태과"
        ],
        "saju": "SJ_detectTongbyeon → 식상생재(길), 재관쌍미(길), 비겁탈재(흉), 재다신약(흉), 재성태과(흉), 상관패인(반길반흉) 등",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 에너지 순환 흐름은 에너지 구성의 특정 조합이 만들어내는 흐름 회로이며, 이 개념은 MBTI에 없다. 특히 나에게 힘이 되는 흐름과 나를 가로막는 흐름을 동시에 보여주는 것은 사주만이 드러낼 수 있는 양면적 재물 구조다.",
        "impact": 8
      },
      {
        "id": "P-MONEY-005",
        "tier": "B",
        "name": "격국이 결정하는 재물 축적의 근본 전략 — 10격국 × 재물 경로",
        "tags": [
          "uses:gyeokguk",
          "condition:패격"
        ],
        "saju": "analyzeGyeokguk → gyeokgukName + JAPYEONG_GG[격국].role/intact/breaks + pagyeokInfo",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 에너지 구조는 사회·직업 자리에 담긴 에너지와 전체 에너지 균형에 의해 결정되는 사주 고유의 개념이며, MBTI에는 이에 해당하는 구조가 없다. 특히 여러 방향에서 동시에 에너지가 충돌하고 흔들릴 때 재물 경로가 뒤틀리는 현상은 사주만이 보여줄 수 있는 부분이다.",
        "impact": 8
      },
      {
        "id": "P-MONEY-007",
        "tier": "B",
        "name": "월운 단위 재물 에너지 분화 — 매달 재물 전략이 달라지는 이유",
        "tags": [
          "ss:재성",
          "uses:yongshin",
          "uses:wolun",
          "uses:taekil"
        ],
        "saju": "SJ_calcWolun → months[].group('재성') + SJ_buildMonthlyHighlight → 용신/기신 달 판별 + SJ_buildTaekil → biz(개업 적기)",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 월 단위의 재물 에너지 변동은 MBTI에서는 볼 수 없는 관점이다. 12개월 에너지 그룹 분류와 개업·중요 결정의 적기를 읽어내는 것이 핵심이다.",
        "impact": 7
      },
      {
        "id": "P-MONEY-008",
        "tier": "B",
        "name": "오행 상생 단절이 만드는 재물 연결 실패 — '재능이 돈이 안 되는' 구조의 처방",
        "tags": [
          "ss:재성",
          "ss:식상",
          "unsung:절"
        ],
        "saju": "findBrokenChain(saju) + OHENG_FLOW_DESC[끊어진 구간] — 특히 '식상→재성' 연결 구간의 단절 여부",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 에너지가 서로를 도우며 이어지는 흐름이 끊기는 것은 MBTI에서는 볼 수 없는 에너지 흐름 관점이다. 각 단절의 구체적인 의미와 처방이 이 분석의 핵심이다.",
        "impact": 7
      },
      {
        "id": "P-MONEY-011",
        "tier": "B",
        "name": "합 트리거 예보에 의한 재물 폭발 시점 예측 — 삼합 완성 연도의 에너지 집중",
        "tags": [
          "unsung:사",
          "relation:삼합",
          "uses:sewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_findHapTrigger → 사주 내 삼합 2/3 보유 시 나머지 1개가 세운으로 들어오는 연도 + 5신 판정(용신이면 최고)",
        "mbti": ": 없음",
        "cross": "사주 단독 완결. 세 개의 땅 에너지가 특정 시점에 한꺼번에 모여 폭발적인 변화를 일으키는 현상은 원래 에너지 구조와 올해 흐름이 만날 때 발생하며, MBTI에는 이에 해당하는 개념이 없다.",
        "impact": 6
      },
      {
        "id": "P-MONEY-013",
        "tier": "B",
        "name": "건강 오행 경고와 재물 지속가능성 — '몸이 자본'의 구체적 근거",
        "tags": [
          "condition:excess",
          "condition:lack"
        ],
        "saju": "SJ_HEALTH_OH[과다/결핍 오행] + SJ_buildHealthText + analyzeGyeokguk → lackFull/elFull",
        "mbti": ": 없음",
        "cross": "사주 단독으로 완결되는 분석이다. 오행과 신체 장기의 대응 관계 및 과다·결핍 시 나타나는 증상은 황제내경·동의보감에 기반하며, MBTI에는 신체 건강을 다루는 체계가 없다.",
        "impact": 5
      },
      {
        "id": "P-MONEY-014",
        "tier": "B",
        "name": "인지적 소비/투자 스타일이 결정하는 재물 '누수'의 반복 패턴 — 유형별 돈이 새는 무의식적 경로",
        "tags": [
          "ref:MT_MONEY"
        ],
        "saju": "없음",
        "mbti": ": MT_MONEY[유형].style/pattern/trap/tip — 16유형별 소비 심리 프로필의 trap(반복적 함정)과 tip(인지적 교정 처방)",
        "cross": "MBTI 단독으로 완결되는 분석이다. 성향 구조에서 필연적으로 발생하는 소비 함정을 유형별로 짚어내며, 사주의 재물 에너지·흐름 체계에는 '어떤 방식으로 돈을 쓰는가'라는 소비 패턴을 설명하는 변수가 없다. 사주는 재물 에너지의 구조·방향·타이밍을 보여주지만, '왜 이 사람이 이런 방식으로 돈을 쓰는가'의 심리적 이유는 설명하지 않는다.",
        "impact": 6
      },
      {
        "id": "P-MONEY-015",
        "tier": "B",
        "name": "의사결정 사각지대가 만드는 재물 판단의 체계적 오류 — '투자할 때마다 빠뜨리는 것'",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "없음",
        "mbti": ": MT_DECISION_PROCESS[유형].flow/blind — 유형별 의사결정 순서와 체계적 사각지대",
        "cross": "MBTI 단독으로 완결되는 분석이다. 가장 약한 성향이 판단 과정에서 마지막에 고려되는 것은 성향 구조의 필연적인 특성이며, 사주에는 '어떤 정보를 먼저 보고 나중에 보는가'를 설명하는 변수가 없다. 사주는 재물의 에너지 방향을 보여주지만, '판단 과정에서 어떤 정보를 빠뜨리는가'는 성향 구조만이 보여줄 수 있다.",
        "impact": 6
      },
      {
        "id": "P-MONEY-016",
        "tier": "B",
        "name": "기질이 결정하는 재물 축적의 근본 동기 — '돈을 왜 모으는가'가 '어떻게 모으는가'를 결정한다",
        "tags": [
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed/communication/conflict — 4대 기질의 핵심 욕구가 재물 동기를 결정",
        "cross": "MBTI 단독으로 완결되는 분석이다. 기질별 4대 핵심 욕구는 Keirsey 기질론에 기반하며, 사주에는 '왜 돈을 모으는가'라는 심리적 동기를 설명하는 변수가 없다. 사주는 재물의 구조·방향·타이밍을 보여주지만, 재물 축적의 심리적 동기는 기질론만이 보여줄 수 있다.",
        "impact": 5
      },
      {
        "id": "CROSS-MONEY-001",
        "tier": "S",
        "name": "재성 구조 유형과 인지적 재물 태도의 수렴/모순 진단 — '에너지가 가리키는 방향과 마음이 가리키는 방향이 같은가 다른가'",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:재성",
          "ss:식상",
          "unsung:태",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "ref:MT_MONEY"
        ],
        "saju": "SJ_findMoneyTiming → styleText 로직의 4분류(정재형/편재형/식상생재형/재성부재형) + gg.cnt['재성'] + SJ_detectTongbyeon → 식상생재 여부",
        "mbti": ": MT_MONEY[유형].style — 16유형별 재물 태도(의미소비형/가능성소비형/전략투자형/안전저축형/감각경험형/실용도구형/효율관리형/관계투자형 등)",
        "cross": "이 교차는 일상적 소비 패턴의 교차와는 다른 차원이다. 여기서는 재물 축적 전략의 방향성 자체가 같은 방향인지 서로 엇갈리는지를 살펴본다. 사주의 재물 에너지 구조(꾸준히 수입을 쌓아가는 유형·큰 기회를 한 번에 잡으려는 유형·잘하는 것을 발휘할 때 자연스럽게 돈이 따라오는 유형·재물 에너지가 약한 유형)는 재물을 얻는 '경로'를 결정하고, MBTI의 재물 스타일은 재물을 대하는 '태도'를 결정한다. 경로와 태도가 일치하는지 여부가 재물 전략을 실제로 실천하기 쉬운지를 좌우한다. 사주 단독으로는 '큰 기회를 노리는 에너지가 강하니 투자하세요'만 나오고, MBTI 단독으로는 '저축 성향이니 아끼세요'만 나오지만, 교차하면 '큰 기회를 향한 에너지를 안전한 저축 방식으로 충족하는 중간 전략'이라는 나만을 위한 조언이 나온다.",
        "impact": 7
      }
    ],
    "연애 스타일": [
      {
        "id": "CROSS-LOVE-002",
        "tier": "A",
        "name": "신강도 주도성과 상호작용 스타일의 연애 역할 교차 — 주도/수용의 이중 결정",
        "tags": [
          "uses:strength",
          "ref:MT_LOVE",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGyeokguk.strengthScore + strengthGrade",
        "mbti": ": MT_INTERACTION_STYLES[유형].inRelationship + MT_LOVE[유형].earlyDating/deepRelation",
        "cross": "내 에너지의 크기와 상호작용 스타일(에너지 양식)이 서로 다른 차원에서 관계 주도성을 결정하므로, 교차해야만 크기와 양식을 함께 보는 네 가지 유형 구분이 가능하다. 특히 에너지가 매우 강하면서도 뒤에서 조용히 이끄는 스타일은 어느 체계 단독으로도 잘 보이지 않는 복잡한 패턴이다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOVE-009",
        "tier": "A",
        "name": "격국 연애 역할과 상호작용 스타일 연애 역할의 수렴/괴리 진단 — '말하는 역할 vs 실제 행동'",
        "tags": [
          "uses:gyeokguk",
          "ref:MT_LOVE",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "P-LOVE-017의 analyzeGyeokguk.gyeokgukName + JAPYEONG_GG[격국].role",
        "mbti": ": MT_INTERACTION_STYLES[유형].inRelationship + MT_LOVE[유형].deepRelation",
        "cross": "에너지 구조가 만드는 연애 역할(에너지 방향)과 상호작용 스타일이 만드는 연애 역할(행동 양식)은 서로 다른 차원이므로, 교차해야만 두 역할이 같은 방향인지 어긋나는지를 확인할 수 있다. 특히 두 역할이 어긋나는 조합에서는 '본인은 이 역할을 하고 있다고 생각하지만 파트너는 전혀 체감하지 못하는' 소통 단절이 왜 생기는지를 짚어줄 수 있다는 점이 이 교차 분석만의 가치다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOVE-004",
        "tier": "A",
        "name": "일간 오행 연애 기저 톤과 사랑 언어(loveLanguage)의 표현 양식 교차",
        "tags": [
          "unsung:사",
          "unsung:양",
          "ref:MT_LOVE"
        ],
        "saju": "JEOKCHEONSU[일간].love + ST5_TGAN_DEEP[일간].inRelation",
        "mbti": ": MT_LOVE[유형].loveLanguage + MT_LOVE[유형].deepRelation",
        "cross": "기저 톤(에너지 질감)과 표현 양식(행동 형태)은 서로 다른 차원이므로, 교차해야만 '어떤 에너지로 어떤 형태의 사랑을 하는가'를 온전히 볼 수 있다. 같은 유형 안에서도 나 자신의 타고난 기질에 따라 사람마다 다른 결이 생기는 이유를 설명해준다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOVE-011",
        "tier": "A",
        "name": "연애 에너지 활성화 시기와 인지기능 성숙도의 교차 — '연애 기회가 올 때 받아들일 준비가 되어 있는가'",
        "tags": [
          "uses:wolun",
          "uses:dominant",
          "ref:MT_MATURITY"
        ],
        "saju": "P-LOVE-009(SJ_findLoveTiming) + P-LOVE-022(SJ_calcWolun 연애 에너지 월)",
        "mbti": ": P-LOVE-021(MT_MATURITY[주기능].immature/developing/mature) + P-LOVE-014(MT_STRESS_STAGES)",
        "cross": "사주만으로는 '이 시기에 인연이 찾아온다'는 타이밍을 알 수 있고, 성격 유형만으로는 '이 사람이 연애를 얼마나 잘 풀어낼 수 있는가'라는 역량을 알 수 있다. 두 가지를 함께 보면 '인연이 왔을 때 실제로 이어질 확률'이라는 예측이 가능해진다. 타이밍과 역량을 동시에 보는 것이 핵심 포인트다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOVE-006",
        "tier": "A",
        "name": "대운 십성이 연애 단계에 입히는 시간적 색채 — '이 연애가 어떤 대운에서 시작되었느냐'",
        "tags": [
          "uses:daewoon",
          "ref:MT_LOVE"
        ],
        "saju": "DW_SIPSUNG_KW[십성].strong/weak + calcDaewoon.currentDWIdx + analyzeGyeokguk.strong",
        "mbti": ": MT_LOVE[유형].earlyDating/deepRelation + MT_STACK_POSITIONS[위치별]",
        "cross": "성격 유형은 '어떤 성향이 활성화되는가'를 설명하고, 10년 흐름의 에너지가 '그 성향이 어떤 맥락에서 발동하는가'를 결정한다. 같은 초기 연애 단계라도 돈과 현실에 집중하게 되는 시기와 감정과 표현이 활발해지는 시기에 드러나는 연애 방식은 완전히 달라진다. 연애 단계와 시기별 에너지를 함께 봐야 이 차이가 보인다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-013",
        "tier": "B",
        "name": "기질(Temperament)이 결정하는 연애 핵심 욕구와 관계 파괴 트리거",
        "tags": [
          "cf:Ne",
          "ref:MT_LOVE",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_TEMPERAMENTS[기질].conflict + MT_LOVE[유형].dealbreaker",
        "cross": "기질 수준의 분석은 세밀하지는 않지만, '이 사람이 연애에서 절대 양보할 수 없는 것'을 가장 간결하게 짚어낸다. 기질별로 연애에서 가장 취약한 지점이 명확히 다르다는 점이 포인트다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-014",
        "tier": "B",
        "name": "스트레스 단계별 연애 행동의 질적 전환 — 정상인의 연애 vs 그립 상태의 연애",
        "tags": [
          "unsung:태",
          "stress:loop",
          "ref:MT_LOVE"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES[stage1~4] + MT_LOVE[유형].conflict/breakup + MT_TYPES[유형].loop/stressPattern",
        "cross": "스트레스 상태에 따라 연애 행동이 달라지는 현상은 성격 유형만으로는 설명하기 어렵다. 같은 유형이라도 심리적으로 건강할 때와 극심한 스트레스 상태일 때 연애 방식이 완전히 달라진다. 유형을 고정된 것으로만 보는 분석의 한계를 보완하는 부분이다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-008",
        "tier": "B",
        "name": "통변 공식이 만드는 연애 구조적 패턴",
        "tags": [
          "uses:tongbyeon"
        ],
        "saju": "SJ_detectTongbyeon 결과 중 연애 관련 공식 + SJ_TERM_MAP",
        "mbti": ": 없음",
        "cross": "에너지 구성 요소들의 조합이 만들어내는 역학은 단일 요소만 봐서는 보이지 않는 구조적 패턴을 드러낸다. 특히 서로 충돌하거나 과잉된 에너지 조합이 연애에서 반복되는 실패 회로를 설명해준다는 점이 주목할 만하다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-001",
        "tier": "B",
        "name": "배우자궁(일지) 십성이 결정하는 무의식적 연애 욕구",
        "tags": [
          "pillar:일지",
          "uses:sipsung_rel"
        ],
        "saju": "calcSajuForApp의 jiSS[2](일지 정기 십성) + SS_CONTEXT[해당십성].spouse",
        "mbti": ": 없음",
        "cross": "사주의 배우자 자리에 담긴 에너지는 각각 고유한 배우자 기대치를 정의한다. 이것은 내가 의식적으로 '좋다'고 말하는 타입과 실제로 무의식적으로 끌리는 타입이 다를 수 있다는 구조적 근거가 된다. 배우자 자리에 숨겨진 에너지가 '드러나지 않는 갈망'을 담고 있다는 점이 포인트다.",
        "impact": 9
      },
      {
        "id": "P-LOVE-023",
        "tier": "B",
        "name": "납음 존재 상징이 만드는 연애에서의 존재적 인상 — '이 사람과 있으면 이런 느낌'",
        "tags": [
          "unsung:사",
          "uses:ilju",
          "uses:napeum"
        ],
        "saju": "getNapeum(dg, dj) + NAPEUM_TABLE + NAPEUM_STORY + ILJU_DATA[일주].love",
        "mbti": ": 없음",
        "cross": "사주에는 오행과 에너지 구조와는 별도로 작동하는 상징적 기운 변수가 있다. 이것은 다른 성격 분석에서는 찾아볼 수 없는 사주 고유의 상징 체계로, 배우자 자리나 연애와 관련된 자리의 이미지와 결합하면 추상적인 분석이 구체적인 이야기로 전환된다.",
        "impact": 5
      },
      {
        "id": "P-LOVE-017",
        "tier": "B",
        "name": "격국이 결정하는 연애에서의 사회적 역할 기대 — '연인에게 어떤 역할을 하려 하는가'",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk.gyeokgukName + JAPYEONG_GG[격국].role + ST5_GYEOKGUK_SYSTEM.types",
        "mbti": ": 없음",
        "cross": "에너지 구조는 사회적 역할을 결정하는데, 연애 관계에서도 '이 사람이 자연스럽게 맡게 되는 역할'을 구조적으로 짚어준다. 에너지가 안정적으로 균형 잡힌 경우와 에너지 균형이 흔들린 경우에 따라 같은 구조라도 건강한 연애 역할과 뒤틀린 연애 역할로 나뉜다는 점이 고유한 가치다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-018",
        "tier": "B",
        "name": "원국 합충형해가 만드는 연애 관계 내 구조적 긴장/안정 패턴",
        "tags": [
          "pillar:일지",
          "relation:충"
        ],
        "saju": "calcRelations(saju) 결과 중 일지 관련 + resolveHapChungPriority",
        "mbti": ": 없음",
        "cross": "에너지 결합과 충돌이 어느 자리에서 일어나느냐에 따라 연애에 미치는 영향이 달라진다. 예를 들어 배우자 자리와 직업 자리가 서로 부딪히는 구조라면 '왜 이 사람은 연애와 직장이 항상 부딪히는가'라는 질문에 구조적인 답을 줄 수 있다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-012",
        "tier": "B",
        "name": "축(axis) 시소 역학이 만드는 끌림과 파괴의 동시성 — 연애의 구조적 역설",
        "tags": [
          "stress:grip",
          "ref:MT_LOVE",
          "ref:MT_AXES"
        ],
        "saju": "없음",
        "mbti": ": MT_AXES[해당축].seesaw + MT_AXES[해당축].gripDirection + MT_LOVE[유형].earlyDating/conflict/breakup",
        "cross": "가장 강한 성향과 가장 약한 성향이 이루는 긴장 관계는, '왜 좋아하는 것과 관계를 파괴하는 것이 같은 근원인가'라는 연애의 핵심 역설에 대한 구조적 설명을 제공한다. 연애 초기의 이상화와 갈등 시 극심한 스트레스 상태에서의 폭발이 같은 긴장 위에 있다는 점이 이 패턴의 고유한 통찰이다.",
        "impact": 8
      },
      {
        "id": "P-LOVE-020",
        "tier": "B",
        "name": "유형 간 관계 역학(Relation Types)이 결정하는 개인의 최적 연애 구조 — '어떤 역학에서 가장 잘 작동하는가'",
        "tags": [
          "ref:MT_LOVE",
          "ref:MT_RELATION"
        ],
        "saju": "없음",
        "mbti": ": MT_RELATION_TYPES[관계유형] + MT_RELATION_MATRIX[해당유형 조합] + MT_LOVE[유형].deepRelation/conflict",
        "cross": "유형 간 관계 역학은 단순한 성격 궁합을 넘어, 서로 다른 성향이 어떻게 보완하고 충돌하는지를 보여준다. 유형 조합별 역학과 개인 수준의 연애 경험이 서로 맞물리는 구조다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-006",
        "tier": "B",
        "name": "성별 육친론에 의한 연애 대상 에너지 기대치",
        "tags": [
          "uses:yukchin"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별][십성] + analyzeGyeokguk.cnt",
        "mbti": ": 없음",
        "cross": "사주에는 성별에 따라 완전히 다른 해석 체계를 적용하는 고유의 관계 분석법이 있다. 같은 에너지 요소라도 성별에 따라 의미가 180도 달라진다는 점이 구조적 특성이다.",
        "impact": 8
      },
      {
        "id": "P-LOVE-002",
        "tier": "B",
        "name": "일간 오행 물상이 결정하는 연애 기저 톤",
        "tags": [
          "uses:mulsang"
        ],
        "saju": "JEOKCHEONSU[일간].love + ST5_TGAN_DEEP[일간].inRelation",
        "mbti": ": 없음",
        "cross": "자연물 이미지(나무, 불, 물 등)를 기반으로 연애 스타일을 직관적으로 설명한다. 관계 안에서 이 사람이 상대에게 주는 느낌까지 커버하면서, 추상적인 성격 서술보다 훨씬 체감하기 쉬운 방식으로 이해할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-LOVE-009",
        "tier": "B",
        "name": "연애/결혼 타이밍 예측 구조",
        "tags": [
          "uses:daewoon",
          "uses:sewoon"
        ],
        "saju": "SJ_findLoveTiming(saju, gg, dw, gender) + 대운 십성 + 세운 십성",
        "mbti": ": 없음",
        "cross": "사주의 가장 큰 강점은 시간축 분석이다. 성격 분석만으로는 '이 사람이 어떻게 연애하는가'까지만 알 수 있지만, 시간축 분석을 더하면 '언제 연애가 시작되고, 깊어지고, 위기를 맞는가'까지 예측할 수 있다. 여러 변수를 점수화해서 구체적인 시기를 특정하는 것이 포인트다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-011",
        "tier": "B",
        "name": "인지기능 스택이 결정하는 연애 판단 서열 — 연인 선택 시 무엇을 먼저 보는가",
        "tags": [
          "ref:MT_LOVE",
          "ref:MT_DECISION"
        ],
        "saju": "없음",
        "mbti": ": MT_DECISION_PROCESS[유형].flow + MT_DECISION_PROCESS[유형].blind + MT_LOVE[유형].attract",
        "cross": "내 성향들이 작동하는 순서와 우선순위가 연애에 적용되면, 단순한 성격 묘사를 넘어 '왜 이 사람이 항상 같은 실수를 반복하는가'라는 심리적 메커니즘을 설명할 수 있다. 연애에서의 맹점을 구조적으로 짚어주는 것이 핵심 가치다.",
        "impact": 8
      },
      {
        "id": "P-LOVE-022",
        "tier": "B",
        "name": "월운이 만드는 연애 에너지의 월별 분화 — '이 달에 연애 에너지가 올라가는가 내려가는가'",
        "tags": [
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_calcWolun(saju).months + SJ_buildMonthlyHighlight + SJ_getOsinLabel",
        "mbti": ": 없음",
        "cross": "월 단위로 연애 에너지를 분석하면 연간 타이밍 분석보다 훨씬 세밀한 예측이 가능하다. '어떤 달에 소개팅이나 데이트가 유리한가'라는 즉각적인 처방을 줄 수 있고, 배우자 자리의 에너지가 직접 살아나는 달을 판별할 수 있다는 점이 고유한 가치다.",
        "impact": 5
      },
      {
        "id": "CROSS-LOVE-005",
        "tier": "B",
        "name": "연애 성장 방향의 이중 지목 — growthInLove × 열등기능 통합",
        "tags": [
          "uses:inferior",
          "ref:MT_LOVE",
          "ref:MT_AXES"
        ],
        "saju": "없음 — 상대 교수 발언에서 직접 대응하는 성장 변수 부재",
        "mbti": ": MT_LOVE[유형].growthInLove + MT_AXES[해당축].healthyBalance + MT_FUNCTIONS[열등기능].growthDirection",
        "cross": "연애 성장 방향을 유형의 특성, 심리적 균형, 성향의 성숙이라는 세 가지 측면에서 함께 짚어준다. 세 측면이 모두 같은 방향을 가리키면 명확한 성장 처방이 나오고, 방향이 다르면 더 복잡한 성장 과제가 있다는 신호다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-019",
        "tier": "B",
        "name": "공망 배우자궁이 만드는 연애 인연의 특수 구조 — 빈 자리가 채워지는 시점",
        "tags": [
          "uses:gongmang"
        ],
        "saju": "calcGongmang(saju) + GONGMANG_GUNGWI_KW.day + GONGMANG_FILL_KW.day",
        "mbti": ": 없음",
        "cross": "사주에는 '구조적으로 비어 있는 자리'라는 고유한 개념이 있다. 다른 성격 분석 체계에는 없는 독특한 변수로, 특히 '그 빈자리가 채워지는 시점'을 연애 타이밍 분석과 연결하면 실용적 가치가 크게 높아진다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-015",
        "tier": "B",
        "name": "4축 강도별 연애 행동 분화 — 같은 유형 내 스펙트럼",
        "tags": [
          "axis:EI",
          "axis:SN",
          "axis:TF",
          "axis:JP",
          "uses:intensity",
          "ref:MT_LOVE"
        ],
        "saju": "없음",
        "mbti": ": MT_INTENSITY_PROFILES[E/I/S/N/T/F/J/P][55/68/88] + MT_LOVE[유형]",
        "cross": "성향 강도에 의한 세분화는 '같은 INFP라도 감정 성향이 약한 사람과 매우 강한 사람은 완전히 다른 연애를 한다'는 핵심적 개인차를 포착한다. 유형 수준의 일반화를 넘어 개인 수준의 정밀 분석을 가능하게 하는 고유한 가치다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-010",
        "tier": "B",
        "name": "5신 체계에 의한 이상적 파트너 오행 방향",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(용신오행) + SJ_getOsinLabel + SJ_GAEUN[용신]",
        "mbti": ": 없음",
        "cross": "내 에너지 구조에서 각 오행이 나에게 힘이 되는지, 방해가 되는지, 구원이 되는지, 중립인지를 파악하는 구조이므로, 단순히 '좋은 오행·나쁜 오행'이 아니라 '에너지의 관계적 맥락'을 보여준다. 파트너의 핵심 에너지가 내 에너지 체계에서 어떤 역할인지로 관계의 에너지 역학을 파악한다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-007",
        "tier": "B",
        "name": "암합이 만드는 무의식적 연애 끌림 패턴",
        "tags": [
          "relation:암합"
        ],
        "saju": "calcSajuForApp.amhap + SAJU_AMHAP_LAYERS + classifyAmhap",
        "mbti": ": 없음",
        "cross": "사주에는 표면 에너지에 드러나지 않는 숨겨진 연결이라는 개념이 있다. 다른 어떤 분석 체계로도 포착할 수 없는 사주 고유의 무의식적 끌림 메커니즘으로, 숨겨진 연결이 드러나고 의식적 선택으로 발전하는 시간축의 경로가 이 분석의 핵심이다.",
        "impact": 6
      },
      {
        "id": "P-LOVE-005",
        "tier": "B",
        "name": "신강도 5등급에 의한 연애 주도성 분화",
        "tags": [
          "uses:strength"
        ],
        "saju": "analyzeGyeokguk.strengthScore + SJ_buildStrengthText",
        "mbti": ": 없음",
        "cross": "에너지 강함/약함은 연애 스타일의 '방향'이 아니라 '강도'를 결정하는 핵심 변수다. 배우자 자리에 같은 현실적이고 안정을 중시하는 에너지가 있어도, 전체 에너지가 매우 강한 사람과 매우 약한 사람은 완전히 다른 관계 역학을 만든다. 전자는 '현실을 지배하는 사랑', 후자는 '현실에 이끌리는 사랑'이 된다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-016",
        "tier": "B",
        "name": "연애 단계별 인지기능 전환 패턴 — earlyDating에서 breakup까지의 기능 이동",
        "tags": [
          "ref:MT_LOVE"
        ],
        "saju": "없음",
        "mbti": ": MT_LOVE[유형].earlyDating/deepRelation/conflict/breakup + MT_TYPES[유형].stack + MT_STACK_POSITIONS[위치별]",
        "cross": "연애 단계에 따라 MBTI 성향의 서로 다른 면이 활성화된다는 구조적 설명은, '시간이 지나면서 보이는 성격이 달라지는' 연애 경험을 성향 변화의 흐름으로 정밀하게 포착한다. 각 성향이 익숙해지는 시기와 그것을 사용할 때 드는 심리적 부담이 단계별 변화의 메커니즘을 제공한다는 점이 이 분석의 고유한 가치다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-004",
        "tier": "B",
        "name": "12운성 × 일지 십성의 이중 진단 — 배우자궁 에너지의 질감",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:sipsung_rel"
        ],
        "saju": "saju.uns[2](일지 12운성) + saju.jiSS[2].ss(일지 정기 십성) + SJ_UNSUNG_MEANING[운성].spouse + SS_CONTEXT[십성].spouse",
        "mbti": ": 없음",
        "cross": "배우자 자리라는 같은 자리를 두 가지 다른 분석 체계(에너지의 흐름 상태와 에너지 성격)가 동시에 들여다보면서, 두 결과가 같은 방향을 가리키는지 서로 다른 방향을 가리키는지가 중요하다. 같은 방향이면 그 패턴의 확실성이 높아지고, 다른 방향이면 내면의 갈등 구조와 연결되는 파생 분석이 가능해진다.",
        "impact": 8
      },
      {
        "id": "P-LOVE-003",
        "tier": "B",
        "name": "도화살 궁위에 의한 매력 발현 맥락 분화",
        "tags": [
          "pillar:일지",
          "sinsal:도화"
        ],
        "saju": "SJ_getDohwa(일지) → SJ_DOHWA_GUNGWI[궁위인덱스] + getSpecialSinsal의 도화살 결과",
        "mbti": ": 없음",
        "cross": "사람을 끌어당기는 특별한 기운이 어디에 자리하느냐에 따라 그 의미가 완전히 달라진다. 그 기운의 유무만 보는 것이 아니라, 그것이 사회적 자리에 있는지 배우자 자리에 있는지 말년 자리에 있는지를 함께 봐야 한다는 점이 포인트다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOVE-001",
        "tier": "S",
        "name": "배우자궁 무의식 욕구와 인지적 끌림 포인트의 교차 진단 — '왜 이 사람에게 끌리는가'의 이중 답",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_LOVE",
          "ref:MT_DECISION"
        ],
        "saju": "calcSajuForApp.jiSS[2] + SS_CONTEXT[십성].spouse",
        "mbti": ": MT_LOVE[유형].attract + MT_DECISION_PROCESS[유형].flow의 ①②",
        "cross": "사주와 MBTI는 '왜 끌리는가'라는 같은 질문에 서로 다른 층위의 답을 내놓는다. 두 답이 같은 방향을 가리키는지, 아니면 서로 어긋나는지를 보면 자신이 자기 끌림을 얼마나 잘 이해하고 있는지가 드러난다. 이 비교는 어느 한 체계만으로는 볼 수 없고, 두 체계를 함께 놓아야만 보이는 가치다.",
        "impact": 9
      },
      {
        "id": "CROSS-LOVE-003",
        "tier": "S",
        "name": "통변 흉공식과 인지적 갈등/이별 패턴의 연애 실패 이중 진단",
        "tags": [
          "uses:tongbyeon",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "SJ_detectTongbyeon(연애 관련 공식)",
        "mbti": ": MT_LOVE[유형].conflict + MT_LOVE[유형].breakup + MT_CONFLICT_STYLES[유형]",
        "cross": "에너지 구조 분석은 '어떤 구조에서 연애가 실패하는가'를 설명하고, 성향별 갈등 처리 방식은 '그 실패를 어떻게 다루는가'를 설명한다. 두 가지를 함께 봐야 '구조적 실패 + 처리 방식'의 완전한 실패 시나리오가 그려진다. 어느 한쪽만 보면 실패의 절반밖에 보이지 않는다.",
        "impact": 7
      },
      {
        "id": "CROSS-LOVE-010",
        "tier": "S",
        "name": "연애에서의 직장-관계 충돌 연쇄 — 일지-월지 충이 인지기능 루프를 발동시키는 경로",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "relation:충",
          "stress:loop",
          "ref:MT_LOVE",
          "ref:MT_CAREER"
        ],
        "saju": "calcRelations(saju) 중 일지-월지 충 + CHUNG_GUNGWI_KW['month-day']",
        "mbti": ": MT_CAREER[유형].stressJob + MT_LOVE[유형].dealbreaker + MT_TYPES[유형].loop",
        "cross": "에너지 충돌이 어느 자리 사이에서 일어나는지가 '충돌이 어디서 발생하는가'를 짚어주고, 성향의 반복 패턴이 '그 충돌이 어떻게 연애 영역으로 번지는가'의 경로를 설명한다. 에너지 충돌 없이는 전이 경로가 없고, 성향 분석 없이는 전이 메커니즘이 없다. 두 가지를 함께 봐야 '직장 스트레스가 연애로 번지는' 완전한 시나리오가 그려진다.",
        "impact": 6
      },
      {
        "id": "CROSS-LOVE-007",
        "tier": "S",
        "name": "연애 일관성의 3중 진단 — 사주 내부 수렴/모순 × 교차 수렴/괴리의 4분류",
        "tags": [
          "uses:unsung",
          "unsung:사",
          "ref:MT_LOVE",
          "ref:MT_DECISION"
        ],
        "saju": "P-LOVE-004의 12운성-십성 수렴/모순 판정",
        "mbti": ": MT_LOVE[유형].attract + MT_DECISION_PROCESS[유형].flow",
        "cross": "사주 내부 분석과 두 체계를 함께 보아야만 보이는 패턴들이 있다. 특히 '사주 내부에서는 일치하는데 함께 보면 어긋나는 경우'와 '사주 내부에서는 모순되는데 함께 보면 오히려 일치하는 경우'는 어느 한쪽 체계만으로는 파악할 수 없는 복잡한 연애 패턴이다.",
        "impact": 8
      },
      {
        "id": "CROSS-LOVE-008",
        "tier": "S",
        "name": "구조적 역설의 이중 설명 — 배우자궁 에너지 역설 × 축 시소 역학",
        "tags": [
          "uses:strength",
          "pillar:일지",
          "stress:grip",
          "ref:MT_AXES"
        ],
        "saju": "P-LOVE-001(일지 십성) + P-LOVE-005(신강도)",
        "mbti": ": MT_AXES[해당축].seesaw + MT_AXES[해당축].gripDirection",
        "cross": "같은 현상인 '끌림과 파괴의 역설'에 대해 에너지 역학과 심리적 성향 역학이 각각 독립적인 설명을 제공한다. 두 설명이 일치할수록 그 역설은 더 강하게 작동한다. 한쪽만 보면 역설의 절반만 보이고, 두 가지를 함께 봐야 '이 역설이 얼마나 강한가'를 가늠할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-LOVE-021",
        "tier": "TRASH",
        "name": "인지기능 성숙도가 결정하는 연애 질적 수준 — 같은 유형의 건강한 연애 vs 독성 연애",
        "tags": [
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_LOVE",
          "ref:MT_AXES",
          "ref:MT_MATURITY"
        ],
        "saju": "없음",
        "mbti": ": MT_MATURITY[주기능/부기능].immature/developing/mature + MT_LOVE[유형].earlyDating/deepRelation/conflict + MT_AXES[해당축].healthyBalance/unhealthy",
        "cross": "같은 MBTI 유형이라도 심리적 성숙도에 따라 연애의 질이 크게 달라진다. 미성숙 단계, 성장 중인 단계, 성숙 단계의 세 단계에 따라 연애 각 시기에서 실제 행동이 어떻게 다르게 나타나는지를 구체적으로 설명할 수 있다는 점이 포인트다.",
        "impact": 7
      }
    ],
    "연애 지뢰": [
      {
        "id": "P-MINE-001",
        "tier": "B",
        "name": "배우자궁 십성 결핍 반전이 만드는 핵심 연애 지뢰 — '가장 원하는 것이 가장 아픈 것'",
        "tags": [
          "condition:lack",
          "pillar:일지",
          "uses:unsung"
        ],
        "saju": "P[2].b(일지) → jiSS[2].ss(일지 정기 십성) + uns[2](일지 12운성)",
        "mbti": ": 없음",
        "cross": "배우자 자리에 담긴 에너지가 욕구의 방향을 결정하고, 그 에너지가 현재 얼마나 활성화되어 있는지가 욕구의 강도와 자각 수준을 결정한다. 이 두 가지가 맞물려 연애에서의 지뢰가 '어떤 내용인지'와 '얼마나 강하게 터지는지'를 함께 보여준다.",
        "impact": 9
      },
      {
        "id": "P-MINE-002",
        "tier": "B",
        "name": "5신 기신 오행이 만드는 즉각적 거부 반응 지뢰 — '왜 이렇게 부담스럽지?'의 구조적 원인",
        "tags": [
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye → gisin(기신 오행) + gusin(구신 오행)",
        "mbti": ": 없음",
        "cross": "내 에너지 구조에서 어떤 흐름이 나에게 가장 잘 맞는지를 기준으로 흐름을 방해하는 에너지와 해로운 에너지 방향이 도출된다. 이를 통해 '이 사람에게 에너지적으로 해로운 방향'을 구체적으로 특정할 수 있다. 성격 분석이 아니라 에너지 역학 분석이라는 점이 포인트다.",
        "impact": 8
      },
      {
        "id": "P-MINE-003",
        "tier": "B",
        "name": "통변 흉(凶) 공식이 만드는 자기-지뢰 회로 — 본인이 반복적으로 밟는 연애 실수",
        "tags": [
          "strength:신약+",
          "ss:비겁",
          "ss:상관",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약"
        ],
        "saju": "SJ_detectTongbyeon → 흉 공식 목록(비겁탈재, 상관견관, 재다신약 등)",
        "mbti": ": 없음",
        "cross": "에너지 조합 중 서로 부딪히거나 한쪽으로 치우친 패턴이 연애 맥락에서 '자기 지뢰'로 발현되는 경로를 구체적으로 짚어준다. 같은 사람이 연애에서 반복하는 실패 패턴의 근본 원인을 여기서 찾을 수 있다.",
        "impact": 8
      },
      {
        "id": "P-MINE-004",
        "tier": "B",
        "name": "원국 충(衝) 궁위가 결정하는 구조적 민감 영역 — 특정 화제/상황이 불비례한 반응을 촉발하는 이유",
        "tags": [
          "relation:충"
        ],
        "saju": "calcRelations → jijiChung 궁위 조합 + CHUNG_GUNGWI_KW",
        "mbti": ": 없음",
        "cross": "에너지 충돌이 어느 자리에서 일어나는지에 따라 의미가 달라지므로, '어떤 화제가 왜 이 사람에게 지뢰인가'를 자리 구조로 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-MINE-006",
        "tier": "B",
        "name": "공망 배우자궁이 만드는 '채워지지 않는 빈자리' 지뢰 — '아무리 해줘도 부족해'의 구조적 원인",
        "tags": [
          "condition:lack",
          "pillar:일지",
          "uses:gongmang"
        ],
        "saju": "calcGongmang → affected 중 일지 포함 여부 + GONGMANG_GUNGWI_KW.day",
        "mbti": ": 없음",
        "cross": "배우자 자리에 구조적으로 채워지지 않는 빈자리가 있는지 여부를 특정하고, 그 빈자리가 해소되는 시점도 예측할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-MINE-009",
        "tier": "B",
        "name": "신강도 5등급에 의한 지뢰 방향 반전 — 극신강의 '통제 지뢰' vs 극신약의 '유기 지뢰'",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength"
        ],
        "saju": "analyzeGyeokguk → strengthGrade(극신강/신강/중화/신약/극신약)",
        "mbti": ": 없음",
        "cross": "내 전체 에너지 크기가 지뢰의 핵심 방향을 결정한다. 에너지가 넘치는 경우에는 상대를 통제하려는 지뢰가, 에너지가 부족한 경우에는 버려짐에 대한 두려움이 지뢰로 작동하는 경향이 있다. 에너지 크기에 따른 처방도 달라진다.",
        "impact": 8
      },
      {
        "id": "P-MINE-013",
        "tier": "B",
        "name": "인지기능 주기능 핵심 욕구의 부정이 만드는 인지적 연애 지뢰 — dealbreaker의 구조적 기원",
        "tags": [
          "cf:Fe",
          "uses:dominant",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[유형].coreFear + MT_LOVE[유형].dealbreaker + MT_CONFLICT_STYLES[유형].trigger",
        "cross": "관계에서 치명적으로 느끼는 것, 절대 넘어서는 안 되는 선, 갈등이 터지는 순간 — 이 세 가지는 모두 내가 가장 강하게 추구하는 핵심 욕구가 부정될 때 발생한다는 하나의 뿌리에서 나온다. 세 가지가 각각 다른 방식으로 같은 지점을 가리키고 있다는 것이 핵심이다.",
        "impact": 8
      },
      {
        "id": "P-MINE-014",
        "tier": "B",
        "name": "해(害)가 만드는 만성적 에너지 소진 연애 지뢰 — '겉으로는 괜찮은데 왜 이렇게 지치지?'의 구조적 원인",
        "tags": [
          "relation:해"
        ],
        "saju": "calcRelations → jijiHae 궁위 조합 + JIJI_HAE_KW",
        "mbti": ": 없음",
        "cross": "에너지 마찰이 어느 자리에서 일어나는지에 따라 만성적인 에너지 소진 패턴이 달라진다. 즉각적으로 터지는 충돌형 지뢰, 반복적으로 쌓이는 마찰형 지뢰와 구분되는 세 번째 유형으로, '서서히 소진되는 만성적 지뢰'가 이에 해당한다.",
        "impact": 6
      },
      {
        "id": "P-MINE-005",
        "tier": "B",
        "name": "형살이 만드는 연애 내 '좋은 의도의 역효과' 지뢰 — 은혜를 원수로 갚는 구조",
        "tags": [
          "relation:형"
        ],
        "saju": "SJ_checkSamhyung → 형살 유형(무은지형/지세지형/무례지형/자형)",
        "mbti": ": 없음",
        "cross": "에너지 마찰의 유형에 따라 연애 안에서 구체적으로 어떤 지뢰 시나리오가 펼쳐지는지가 달라진다. 마찰의 종류별로 관계에서 반복되는 갈등 패턴이 다르게 나타난다.",
        "impact": 6
      },
      {
        "id": "P-MINE-007",
        "tier": "B",
        "name": "양인살이 만드는 연애 내 '칼로 자르듯 끊는' 단절 지뢰 — 작은 배신에 대한 과도한 결단",
        "tags": [
          "unsung:절",
          "unsung:양",
          "sinsal:양인"
        ],
        "saju": "calcExtraSinsal → 양인살 존재 여부 + 궁위",
        "mbti": ": 없음",
        "cross": "태어난 자리가 어디냐에 따라 과도한 단절 반응이 어떤 상황에서 특히 강하게 나타나는지 달라진다. 같은 강한 승부 기질이라도 사회·직업 영역에서 작동할 때와 배우자 관계에서 작동할 때는 그 폭발 맥락이 전혀 다르다.",
        "impact": 6
      },
      {
        "id": "P-MINE-008",
        "tier": "B",
        "name": "일간 오행 물상이 결정하는 지뢰 폭발 양상 — 같은 지뢰를 밟아도 반응이 다르다",
        "tags": [
          "unsung:양",
          "uses:mulsang"
        ],
        "saju": "raw.dg → OHAENG_TGAN[dg] + ST5_TGAN_DEEP[일간].weakness + JEOKCHEONSU[일간].danger",
        "mbti": ": 없음",
        "cross": "지뢰의 '내용'보다 '어떻게 터지는가'가 중요하다. 나 자신을 나타내는 하늘 에너지(일간)의 성질에 따라 폭발 형태가 10가지로 달라진다. 같은 분노라도 어떤 사람은 냉정하게 끊어내고, 어떤 사람은 격렬하게 쏟아내는 식으로 표현 방식 자체가 다르다.",
        "impact": 7
      },
      {
        "id": "P-MINE-010",
        "tier": "B",
        "name": "암합이 만드는 무의식적 역린 지뢰 — 본인도 모르는 가장 위험한 연애 지뢰",
        "tags": [
          "relation:암합"
        ],
        "saju": "calcSajuForApp → amhapResults + SAJU_AMHAP_LAYERS(yeogi/junggi)",
        "mbti": ": 없음",
        "cross": "본인조차 왜 그랬는지 모르는 지뢰가 있다. 겉으로 드러나지 않는 숨겨진 에너지의 결합 구조가 이것을 만드는데, 그 결합이 어느 영역에서 일어나는지, 그리고 얼마나 깊이 숨어 있는지에 따라 무의식의 깊이가 달라진다. 구조적으로 특정할 수 있는 유일한 변수다.",
        "impact": 8
      },
      {
        "id": "P-MINE-011",
        "tier": "B",
        "name": "격국 패격 조건이 연애에서 발동하는 자기-지뢰 경로 — '재능이 뒤틀리면 관계도 뒤틀린다'",
        "tags": [
          "uses:gyeokguk",
          "condition:패격"
        ],
        "saju": "analyzeGyeokguk → pagyeokInfo + gyeokgukName + JAPYEONG_GG[격국].breaks",
        "mbti": ": 없음",
        "cross": "사람은 자신이 맡은 사회적 역할 틀 안에서도 스스로 지뢰를 만든다. 에너지 구조가 무너지는 조건이 연애 상황에서 구체적으로 어떤 자기 파괴 패턴으로 나타나는지를 보여준다. 에너지 흐름의 문제가 아니라, 내가 스스로 규정한 역할이 깨질 때 생기는 왜곡이 포인트다.",
        "impact": 6
      },
      {
        "id": "P-MINE-012",
        "tier": "B",
        "name": "세운/대운 5신 기신 시기에 의한 지뢰 민감도 시간적 증폭 — '올해 특히 건드리면 안 되는 것'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_buildOsinText → 세운/대운 5신 판별(기신/구신 여부) + SJ_buildMonthlyHighlight",
        "mbti": ": 없음",
        "cross": "지뢰는 항상 같은 강도로 존재하지 않는다. 10년 단위 큰 흐름과 올해 흐름, 그리고 월별 방해 에너지가 겹치는 시점에 특정 지뢰가 특히 위험해진다. '어떤 지뢰가 있는가'를 넘어 '언제 그 지뢰가 가장 위험한가'를 시간축으로 짚어주는 분석이다.",
        "impact": 7
      },
      {
        "id": "CROSS-MINE-002",
        "tier": "S",
        "name": "배우자궁 십성 지뢰 × 인지적 갈등 트리거의 수렴/모순 진단 — 지뢰가 하나인가 둘인가",
        "tags": [
          "pillar:일지",
          "cf:Fe",
          "ref:MT_CONFLICT"
        ],
        "saju": "P[2].b(일지) → jiSS[2].ss(일지 정기 십성)",
        "mbti": ": MT_CONFLICT_STYLES[유형].trigger + MT_TYPES[유형].coreFear",
        "cross": "배우자 자리의 에너지 성격과 심리적 두려움·촉발 요인은 완전히 다른 경로에서 나온다. 두 가지가 같은 방향을 가리키면 두 경로 모두에서 확인된 지뢰이고, 서로 다른 방향을 가리키면 '이 사람은 관계를 파괴하는 경로가 두 개 존재한다'는 뜻이다. 끌림에서의 불일치가 '복잡한 취향'을 의미한다면, 지뢰에서의 불일치는 '관계 파괴 경로가 복수'라는 실질적 위험 신호다.",
        "impact": 8
      },
      {
        "id": "CROSS-MINE-001",
        "tier": "S",
        "name": "신강도 지뢰 방향 × E/I 축 강도에 의한 지뢰 폭발 표현 채널 분화 — 같은 지뢰가 '어떻게 터지는가'의 이중 결정",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "axis:EI",
          "intensity:88"
        ],
        "saju": "analyzeGyeokguk → strengthGrade(극신강/극신약)",
        "mbti": ": E/I 축 강도(88/68/55)",
        "cross": "에너지가 강한 사람이라도 외향적인지 내향적인지에 따라 지뢰의 형태가 완전히 달라진다. 에너지 총량은 지뢰의 방향을 결정하고, 외향·내향은 그 지뢰가 어떻게 전달되는지를 결정한다. 에너지가 강하고 외향적인 사람의 폭발은 그 자리에서 목격되므로 '즉각 진화'가 필요하고, 에너지가 강하고 내향적인 사람의 폭발은 이미 결론이 난 뒤 통보되므로 '사전 감지'가 필요하다. 상대방의 대응 전략이 완전히 달라지는 지점이다.",
        "impact": 7
      }
    ],
    "올해 조언": [
      {
        "id": "P-YEAR-018",
        "tier": "B",
        "name": "올해 대운-세운 에너지 방향의 일치/불일치에 의한 전략 분기 — '큰 흐름과 올해 파도의 관계'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "DW_SIPSUNG_KW[대운십성그룹][strong/weak] + SJ_getOsinLabel(osin, 대운ganOh) vs SJ_getOsinLabel(osin, 세운ganOh) + SJ_SS_GROUP[대운ss] vs SJ_SS_GROUP[세운ss]",
        "mbti": ": 없음",
        "cross": "10년 흐름과 올해 흐름이 각각 좋은지 나쁜지에 따라 올해를 어떻게 살아야 하는지 전략이 달라진다. 둘 다 좋으면 적극적으로 밀고 나가고, 둘 다 나쁘면 지키는 데 집중하고, 엇갈리면 그 조합에 맞는 방향이 따로 있다. 에너지 구조를 아는 것에서 한 발 더 나아가 '그래서 올해 어떻게 행동할 것인가'를 결정하는 핵심 분기점이다.",
        "impact": 8
      },
      {
        "id": "P-YEAR-015",
        "tier": "B",
        "name": "올해 건강 에너지 경고 — 세운 오행이 건강 취약 오행을 자극하는 시기",
        "tags": [
          "condition:excess",
          "condition:lack",
          "relation:해",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_HEALTH_OH[과다/결핍오행] + 세운 간지 오행(OHAENG_TGAN[seGanIdx], OHAENG_JIJI[seJiIdx]) + SJ_getOsinLabel(osin, seGanOh)",
        "mbti": ": 없음",
        "cross": "평생 주의해야 할 건강 영역이 있다면, 올해는 그중 어느 부분이 특히 자극받는지를 짚어준다. 올해 흐름이 방해 에너지이면서 동시에 건강 취약 에너지까지 건드리는 조건이 겹칠 때 경고 강도가 가장 높아진다.",
        "impact": 5
      },
      {
        "id": "P-YEAR-017",
        "tier": "B",
        "name": "올해 개운법 구체화 — 월별 5신 에너지에 맞춘 행동/색상/음식/방향 처방",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_GAEUN[용신오행] + SJ_buildMonthlyHighlight(saju, gg, osin) → 월별 용신/기신 달 판별 + SJ_getOsinLabel(osin, monthGanOh)",
        "mbti": ": 없음",
        "cross": "에너지를 보충하는 방법은 월별 에너지 흐름과 결합하면 '올해 어느 달에 어떤 활동을 강화하고 어느 달에는 피해야 하는가'라는 시간축 처방이 된다. 늘 유효한 일반적인 자기돌봄 조언과 달리, 이것은 달마다 달라지는 맞춤 처방이라는 점에서 다르다.",
        "impact": 7
      },
      {
        "id": "P-YEAR-014",
        "tier": "B",
        "name": "택일 가이드에 의한 올해 목적별 행동 최적 타이밍 — '올해 안에서도 언제가 좋은가'",
        "tags": [
          "uses:taekil",
          "uses:osin"
        ],
        "saju": "SJ_buildTaekil(saju, gg, osin) → months[].wedding/moving/biz/exam + isDanger",
        "mbti": ": 없음",
        "cross": "같은 달이라도 결혼에 좋은 타이밍과 개업에 좋은 타이밍은 다를 수 있다. 목적(결혼·이사·개업·시험 등)에 따라 적용하는 변수가 달라지기 때문이다. 월별 에너지 흐름을 아는 것에서 한 발 더 나아가, 내가 하려는 일에 맞는 달을 고르는 분석이다.",
        "impact": 6
      },
      {
        "id": "P-YEAR-016",
        "tier": "B",
        "name": "올해 육친 인연 활성화 — 세운 십성이 특정 관계를 깨우는 해",
        "tags": [
          "uses:sewoon",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(r.dg, seGanIdx) → 세운십성 + SJ_YUKCHIN_MAP[성별][세운십성] → 육친관계 + SJ_SS_GROUP[세운십성] → 십성그룹",
        "mbti": ": 없음",
        "cross": "올해 흐름에서 활성화되는 에너지가 같더라도, 남성과 여성에게는 완전히 다른 관계가 열린다. 같은 에너지가 남성에게는 재물이나 연인과 연결되고 여성에게는 사회적 인정이나 경쟁 관계와 연결되는 식으로, 성별에 따라 관계 해석이 달라지는 것은 사주만의 독특한 분류 방식이다.",
        "impact": 6
      }
    ],
    "올해 키워드": [
      {
        "id": "P-YEAR-002",
        "tier": "B",
        "name": "세운 vs 원국 합충형해에 의한 올해 변화 영역 특정 — '올해 어디가 흔들리는가/묶이는가'",
        "tags": [
          "relation:충",
          "uses:sewoon"
        ],
        "saju": "analyzeDWSEvsWonkuk.seun1 (세운 지지 vs 원국 4지지의 충/합/형/해) + SEUN_HAPCHUNG_KW + SJ_IMPACT_SCORE[궁위]",
        "mbti": ": 없음",
        "cross": "올해 흐름이 내 원래 에너지 구조와 어떻게 만나는지에 따라, 올해 어떤 영역(관계·돈·건강·명예 등)에서 주요 사건이 생기는지가 드러난다.",
        "impact": 9
      },
      {
        "id": "P-YEAR-011",
        "tier": "B",
        "name": "올해 재물 타이밍 판별 — '올해가 돈의 해인가'",
        "tags": [
          "ss:재성",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_findMoneyTiming(saju, gg, dw, osin) — 세운 재성 십성 + 재성 지지 + 대운 재성 + 식상생재 시너지 + 5신 판별 종합 점수",
        "mbti": ": 없음",
        "cross": "올해 재물 흐름은 어떤 에너지 역할이 활성화되는지, 그 에너지가 나에게 도움이 되는지 방해가 되는지의 복합적인 조합으로 결정된다. 이 조합이 올해 돈에 대해 공격적으로 움직일 해인지, 지키는 데 집중할 해인지를 알려준다.",
        "impact": 7
      },
      {
        "id": "P-YEAR-009",
        "tier": "B",
        "name": "세운 5신 × 원국 합충 동시 작동에 의한 복합 위험/기회 패턴 — '올해의 뇌관'",
        "tags": [
          "pillar:일지",
          "relation:충",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "P-YEAR-001(세운 5신) + P-YEAR-002(세운 vs 원국 합충) — 기신 세운 + 일지 충 동시 발동",
        "mbti": ": 없음",
        "cross": "방해 에너지와 충돌이 같은 시점에 겹치면 단순히 두 효과를 더한 것보다 훨씬 강하게 체감된다. 나쁜 조건들이 동시에 발동할 때는 증폭 효과가 생긴다는 점이 포인트다.",
        "impact": 8
      },
      {
        "id": "P-YEAR-007",
        "tier": "B",
        "name": "교운기 임박 여부에 의한 올해 키워드의 질적 전환 — '올해가 인생 전환점인가'",
        "tags": [
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi(dw, currentAge) — 교운기 ±2년 내 여부 + SJ_TRANSITION[이전→현재 십성그룹]",
        "mbti": ": 없음",
        "cross": "10년 흐름이 바뀌는 전환점 시기에 해당하는지 여부가, 올해가 평범한 한 해인지 인생의 방향이 바뀌는 해인지를 결정하는 가장 큰 변수다.",
        "impact": 8
      },
      {
        "id": "P-YEAR-001",
        "tier": "B",
        "name": "세운 5신 판별에 의한 올해 기본 에너지 색채 — '올해는 나에게 어떤 해인가'",
        "tags": [
          "uses:sewoon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(용신오행) + calcDaewoon.seun[0] → SJ_getOsinLabel(osin, 세운천간오행) + SJ_getOsinLabel(osin, 세운지지오행)",
        "mbti": ": 없음",
        "cross": "올해 흐름이 내게 꼭 필요한 에너지인지, 흐름을 방해하는 에너지인지에 따라 올해 전체의 기본 톤이 결정된다. 다른 모든 분석의 바탕이 되는 가장 근본적인 판단이다.",
        "impact": 9
      },
      {
        "id": "P-YEAR-013",
        "tier": "B",
        "name": "세운 12운성이 결정하는 올해 에너지의 생명 주기적 위치 — '올해는 시작인가, 정점인가, 끝인가'",
        "tags": [
          "dm:기",
          "uses:unsung",
          "uses:sewoon"
        ],
        "saju": "getUnsung(saju.raw.dg, 세운지지인덱스) — 일간 기준 세운 지지의 12운성 + UNSUNG_KW[운성명]",
        "mbti": ": 없음",
        "cross": "에너지의 흐름 상태는 유불리 판단이나 충돌 구조와는 별개의 축으로, 올해 에너지가 한창 무르익는 중인지 서서히 힘을 잃는 중인지 급격히 바뀌는 중인지를 알려준다. 같은 방해 에너지 해라도 에너지가 한창 차오르는 시기면 '어려움이 있지만 나아가는 중'이고, 급격한 변화 시기면 '방해에 급격한 변화까지 겹친다'는 식으로 체감이 완전히 달라진다.",
        "impact": 6
      },
      {
        "id": "P-YEAR-003",
        "tier": "B",
        "name": "세운 십성이 결정하는 올해 사회적 에너지 모드 — '올해 어떤 모드로 살아야 하는가'",
        "tags": [
          "unsung:사",
          "uses:sewoon",
          "uses:sipsung_rel"
        ],
        "saju": "calcDaewoon.seun[0].ss (세운 천간 십성) + SS_CONTEXT[십성].general/career/spouse",
        "mbti": ": 없음",
        "cross": "올해 흐름의 하늘 에너지가 나 자신과 어떤 관계를 맺는지에 따라 올해 내가 자연스럽게 맡게 되는 삶의 역할이 결정된다. 같은 해라도 사람마다 다른 역할이 활성화되는 이유다.",
        "impact": 8
      },
      {
        "id": "P-YEAR-004",
        "tier": "B",
        "name": "대운-세운 상호작용에 의한 올해 에너지의 이중 구조 — '큰 흐름 vs 올해만의 파도'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "calcDaewoon.daewoons[currentDWIdx] (현재 대운 십성/5신) + calcDaewoon.seun[0] (세운 십성/5신) + analyzeDWSEvsWonkuk.dwSeConflict",
        "mbti": ": 없음",
        "cross": "10년 흐름은 장기 추세이고 올해 흐름은 단기 변동이다. 이 두 층위를 함께 보면 올해 키워드가 단순한 1년짜리 사건인지, 더 큰 흐름 안에서의 한 장면인지가 보인다.",
        "impact": 8
      },
      {
        "id": "P-YEAR-005",
        "tier": "B",
        "name": "월운 하이라이트에 의한 올해 월별 에너지 분화 — '올해 안에서도 달마다 다르다'",
        "tags": [
          "uses:wolun",
          "uses:osin"
        ],
        "saju": "SJ_calcWolun(saju) + SJ_buildMonthlyHighlight(saju, gg, osin)",
        "mbti": ": 없음",
        "cross": "월별 에너지 흐름 분석은 올해의 큰 방향을 실제로 실행할 수 있는 달력으로 바꿔준다. '올해 좋다'는 것을 알아도 어느 달에 움직여야 하는지를 알아야 실전에서 쓸 수 있다.",
        "impact": 7
      },
      {
        "id": "P-YEAR-006",
        "tier": "B",
        "name": "합 트리거 예보에 의한 올해 에너지 폭발 시점 — '올해 삼합이 완성되는가'",
        "tags": [
          "relation:삼합",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_findHapTrigger(saju, dw, osin) — 원국 반삼합 + 세운 지지가 나머지 채움 여부",
        "mbti": ": 없음",
        "cross": "올해 흐름에서 땅 에너지 여러 개가 한 방향으로 모여 큰 흐름을 완성하는 구조가 만들어지는지 여부는, 미리 준비할 수 있는 폭발적 기회 또는 위험을 예고한다. 타고난 에너지 구조와 올해 흐름이 시간적으로 만나야만 발생하는 사건이다.",
        "impact": 7
      },
      {
        "id": "P-YEAR-008",
        "tier": "B",
        "name": "공망 해소 시점 진입 여부 — '비어있던 자리가 올해 채워지는가'",
        "tags": [
          "uses:sewoon",
          "uses:gongmang"
        ],
        "saju": "calcGongmang(saju) → affected 궁위 + calcDaewoon.seun[0] 세운 지지가 공망 지지와 일치 여부 + GONGMANG_FILL_KW[궁위]",
        "mbti": ": 없음",
        "cross": "원래 에너지 구조에서 비어 있던 자리가 올해 흐름에서 비로소 채워지는 해가 있다. 이런 해에는 오랫동안 실현되지 않던 것이 비로소 현실화되는 특별한 의미가 생긴다.",
        "impact": 6
      },
      {
        "id": "P-YEAR-010",
        "tier": "B",
        "name": "올해 연애/결혼 타이밍 판별 — '올해가 인연의 해인가'",
        "tags": [
          "pillar:일지",
          "uses:daewoon",
          "uses:sewoon",
          "sinsal:도화"
        ],
        "saju": "SJ_findLoveTiming(saju, gg, dw, gender) — 세운 배우자성 + 일지합 + 도화 발동 + 홍염살 + 대운 배우자성 종합 점수",
        "mbti": ": 없음",
        "cross": "사람을 끌어당기는 기운이 강해지는 올해 흐름, 본인 에너지와의 결합, 끌림이 살아나는 흐름이라는 복합 조건은 '올해 연애 확률'을 구체적으로 짚어주는 유일한 도구다.",
        "impact": 7
      },
      {
        "id": "P-YEAR-012",
        "tier": "B",
        "name": "세운 지지에서 발동하는 올해 신살 — '올해 어떤 특수 에너지가 활성화되는가'",
        "tags": [
          "pillar:일지",
          "uses:sewoon"
        ],
        "saju": "SJ_getDohwa(일지) + SJ_getYeokma(일지) + SJ_getHwagae(일지) — 각각이 올해 세운 지지(calcDaewoon.seun[0].ji)와 일치 여부",
        "mbti": ": 없음",
        "cross": "특수 에너지 활성화는 올해 흐름의 에너지가 특정 조건을 충족할 때 발생하며, 올해 키워드에 '이동 흐름 활성화'나 '사람을 끌어당기는 흐름 활성화'라는 별도 차원을 추가한다.",
        "impact": 6
      }
    ],
    "인생 한줄 마무리": [
      {
        "id": "P-SUMMARY-008",
        "tier": "B",
        "name": "조후론이 한줄에 넣는 기질 온도 — '태어난 계절이 한줄의 감성적 질감을 결정한다'",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "unsung:태",
          "uses:johu",
          "uses:mulsang",
          "uses:gaeun"
        ],
        "saju": "ST5_JOHU.seasons[계절].character + ST5_JOHU.seasons[계절].need + MULSANG_SEASON[월지].mood",
        "mbti": ": 없음",
        "cross": "태어난 달의 계절 에너지가 나 자신의 기본 온도를 결정한다. 열기가 강한 사람은 식혀주는 에너지가 필요하고, 냉기가 강한 사람은 데워주는 에너지가 필요하다. 이 균형 원리는 사주만이 가진 몸으로 느끼는 성격 이론이다.",
        "impact": 6
      },
      {
        "id": "P-SUMMARY-009",
        "tier": "B",
        "name": "원국 합충이 한줄에 넣는 내면의 구조적 긴장/안정 — '이 사람 안에 전쟁이 있는가 평화가 있는가'",
        "tags": [
          "unsung:사",
          "relation:충"
        ],
        "saju": "calcRelations → cheonganHap/cheonganChung/jijiHap/jijiChung/jijiHyung/jijiHae 총합",
        "mbti": ": 없음",
        "cross": "12가지 땅 에너지 사이의 배치—서로 맞부딪히거나, 끌어당기거나, 어긋나는 관계—에서 에너지 충돌과 결합이 생겨난다. 이 사람 안에 내적 긴장이 존재하는지를 에너지 배치에서 읽어내는 방식이다.",
        "impact": 7
      },
      {
        "id": "P-SUMMARY-003",
        "tier": "B",
        "name": "시간축 색채 주입 — 현재 대운 십성이 한줄에 '지금'을 넣는 구조",
        "tags": [
          "strength:신강+",
          "strength:신약+",
          "uses:daewoon"
        ],
        "saju": "DW_SIPSUNG_KW[대운십성][신강/신약].theme + SJ_buildLifeRoadmap의 현재 대운 위치",
        "mbti": ": 없음",
        "cross": "'지금 이 사람이 인생의 어느 지점에 있는가'를 한 줄에 담을 수 있는 것은 사주의 10년 흐름 체계뿐이다. '올해' 또는 '이 10년'에 해당하는 시간 변수를 담아내는 것은 사주만의 강점이다.",
        "impact": 8
      },
      {
        "id": "P-SUMMARY-011",
        "tier": "B",
        "name": "5신 양면 처방이 한줄에 넣는 '필요한 것 + 피해야 할 것' — 용신/기신의 에너지 쌍극 처방",
        "tags": [
          "unsung:양",
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(yongshinOh) → yongsin/huisin/gisin/gusin/hansin 5신 전체 + SJ_GAEUN[용신오행].message + SJ_GAEUN[기신오행]의 반대 경고",
        "mbti": ": 없음",
        "cross": "내 에너지 균형의 핵심 방향을 중심으로 나머지 에너지를 도움이 되는 것과 피해야 할 것으로 함께 배열하는 것은 에너지 순환 구조에서만 가능하다. 핵심 방향을 흔드는 에너지가 자동으로 피해야 할 에너지가 되는 연결 구조가 있기 때문이다. 사주에서는 특정 에너지를 적극적으로 멀리하라는 처방이 나오는데, 이는 모든 성향을 키워야 할 대상으로 보는 심리 유형론과는 다른 접근이다.",
        "impact": 6
      },
      {
        "id": "P-SUMMARY-010",
        "tier": "B",
        "name": "육친 배치가 한줄에 넣는 관계적 존재 정의 — '이 사람은 관계에서 어떤 역할을 하는가'",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별] + jiSS[2].ss(일지 정기 십성의 육친 의미) + SS_CONTEXT[일지십성].spouse",
        "mbti": ": 없음",
        "cross": "에너지 역할이 성별에 따라 가족 관계로 연결되는 것은 사주만의 독특한 방식이다. 같은 에너지 변수라도 성별 맥락에 따라 배우자, 부모, 자녀 등 완전히 다른 관계적 의미를 갖게 된다.",
        "impact": 5
      },
      {
        "id": "P-SUMMARY-001",
        "tier": "B",
        "name": "3축 존재 압축 원형 — 일간 물상 × 격국 역할 × 일지 12운성",
        "tags": [
          "uses:gyeokguk",
          "pillar:일지",
          "uses:unsung",
          "uses:mulsang"
        ],
        "saju": "JEOKCHEONSU[일간].title + JAPYEONG_GG[격국].role + UNSUNG_KW[일지 12운성]",
        "mbti": ": 없음",
        "cross": "나 자신의 에너지 이미지, 내 에너지 구조가 사회에서 자연스럽게 맡는 역할, 지금 내 에너지가 얼마나 활발하게 작동하고 있는지—이 세 가지가 교차하는 지점에서 한 줄 요약이 나온다. 어느 하나만으로는 나올 수 없는 구체성이 세 축의 조합에서 생긴다.",
        "impact": 9
      },
      {
        "id": "P-SUMMARY-M02",
        "tier": "B",
        "name": "기질 핵심 욕구가 한줄에 넣는 존재론적 갈망 — '이 사람이 평생 추구하는 것'",
        "tags": [
          "unsung:사",
          "cf:Fe",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_TYPES[유형].coreNeed + MT_TYPES[유형].coreFear",
        "cross": "기질과 유형의 이중 구조가 '왜 이 사람이 이것을 그토록 원하는가'를 설명한다. 이 사람이 가장 원하는 것과 가장 피하고 싶어 하는 것은 심리 유형론 고유의 구조에서 나온다.",
        "impact": 7
      },
      {
        "id": "P-SUMMARY-M05",
        "tier": "B",
        "name": "주기능 핵심 질문이 한줄을 관통하는 인생 질문으로 전환 — '이 사람이 평생 묻는 질문'",
        "tags": [
          "unsung:사",
          "uses:dominant"
        ],
        "saju": "없음",
        "mbti": ": MT_FUNCTIONS[주기능].keyQuestion + MT_FUNCTIONS[주기능].valuesKeyword + MT_FUNCTIONS[주기능].fearsKeyword",
        "cross": "각 심리 유형이 깊이 품고 있는 하나의 핵심 질문이 있다. 이미지로 존재를 압축하는 사주의 방식과 달리, 심리 유형론은 질문으로 존재를 압축한다. 어떤 사람인지를 형태가 아니라 그 사람이 평생 붙들고 가는 방향으로 보여주는 접근이다.",
        "impact": 6
      },
      {
        "id": "P-SUMMARY-M03",
        "tier": "B",
        "name": "루프 패턴이 한줄에 넣는 '이 사람의 반복적 함정' — 구체적 반전 장치",
        "tags": [
          "unsung:사",
          "stress:loop"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[유형].loop + MT_STRESS_STAGES.stage3_loop.examples[유형별루프]",
        "cross": "내가 가장 자연스럽게 쓰는 성향과 평소에 잘 의식하지 못하는 성향이 서로 직접적인 영향을 주고받는 구조가 있다. 원래 그 사이에서 균형을 잡아주는 역할이 제대로 작동하지 않을 때 생기는 반전이 한 줄 요약의 핵심 긴장을 만든다.",
        "impact": 7
      },
      {
        "id": "P-SUMMARY-002",
        "tier": "B",
        "name": "납음 존재 메타포 — 일주 전체를 하나의 자연물 이미지로 압축",
        "tags": [
          "uses:ilju",
          "uses:napeum"
        ],
        "saju": "SJ_NAPEUM_TABLE[일주] + NAPEUM_STORY[납음명]",
        "mbti": ": 없음",
        "cross": "하늘 에너지와 땅 에너지를 동시에 활용해 나를 나타내는 자리 전체를 하나의 고유한 상징으로 읽어내는 체계는, 에너지 역할이나 활성화 단계 어디에도 환원되지 않는 독립적인 해석 층이다.",
        "impact": 6
      },
      {
        "id": "P-SUMMARY-004",
        "tier": "B",
        "name": "킬링포인트 반전 주입 — 통변 모순·교운기·5신 충돌이 만드는 놀라움 요소",
        "tags": [
          "relation:충",
          "uses:tongbyeon",
          "condition:교운기",
          "uses:osin"
        ],
        "saju": "SJ_generateKillingPoints 자동 생성 결과",
        "mbti": ": 없음",
        "cross": "예상치 못한 에너지의 공존, 10년 흐름 전환점 임박, 나를 돕는 흐름과 방해하는 흐름의 충돌 등 사주 내부의 여러 요소가 겹치는 지점에서 예상치 못한 반전이 나온다. 하나의 요소만 봐서는 보이지 않는 모순이 핵심이다.",
        "impact": 7
      },
      {
        "id": "P-SUMMARY-005",
        "tier": "B",
        "name": "핵심 처방 주입 — 용신 에너지 방향이 한줄에 '그래서 어떻게'를 넣는 구조",
        "tags": [
          "uses:yongshin",
          "uses:gaeun"
        ],
        "saju": "SJ_extractYongshinOh + SJ_GAEUN[용신오행].message",
        "mbti": ": 없음",
        "cross": "내 에너지 균형의 핵심 방향은 계절적 조화, 에너지 소통, 전체 에너지 크기 조절의 순서로 우선순위가 정해진다. 한 줄 마무리에 실천적 방향을 담을 수 있는 것은 이 원칙 덕분이다.",
        "impact": 7
      },
      {
        "id": "P-SUMMARY-M04",
        "tier": "B",
        "name": "인지기능 성숙도가 한줄의 질을 결정하는 분기 — '같은 유형의 다른 삶'",
        "tags": [
          "uses:development",
          "uses:dominant",
          "ref:MT_MATURITY"
        ],
        "saju": "없음",
        "mbti": ": MT_MATURITY[주기능].immature/developing/mature + MT_DEVELOPMENT_STAGES",
        "cross": "같은 심리 유형이라도 그 성향이 얼마나 건강하게 발현되는지에 따라 완전히 다른 한 줄이 나온다. 이 차이를 반영하는 것이 '모든 INFP는 이렇다'는 식의 일반화를 막는 핵심 장치이기도 하다.",
        "impact": 8
      },
      {
        "id": "P-SUMMARY-007",
        "tier": "B",
        "name": "결핍 갈망 키워드 — 결핍 오행이 인생의 '빈자리'를 한줄에 담는 구조",
        "tags": [
          "condition:lack"
        ],
        "saju": "calcSajuForApp.lackFull + OHENG_KW[결핍오행].zero",
        "mbti": ": 없음",
        "cross": "전체 에너지 분포에서 특정 에너지가 아예 없는 것은 단순히 약한 것과 질적으로 다르다. 완전히 없는 에너지는 그 사람이 무의식적으로 강하게 갈망하는 에너지가 되며, 없음의 절대성이 갈망의 강도를 결정한다.",
        "impact": 6
      },
      {
        "id": "P-SUMMARY-M01",
        "tier": "B",
        "name": "주기능-열등기능 축이 만드는 인지적 존재 원형 — '이 사람의 정보처리 방식의 본질'",
        "tags": [
          "unsung:사",
          "uses:dominant",
          "uses:inferior",
          "ref:MT_AXES"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[유형].stack[0] (주기능) + MT_TYPES[유형].stack[3] (열등기능) + MT_AXES[해당축].healthyBalance + MT_STACK_POSITIONS.dominant.role + MT_STACK_POSITIONS.inferior.role",
        "cross": "내가 가장 편하게 쓰는 성향과 가장 낯설고 어색한 성향은 서로 반대편에서 시소처럼 긴장 관계를 이룬다. 이 긴장이 한 줄 요약의 뼈대를 만든다. 사주의 세 축 조합이 에너지적으로 이 사람을 정의한다면, 이것은 심리적으로 이 사람을 정의한다.",
        "impact": 9
      },
      {
        "id": "P-SUMMARY-M06",
        "tier": "B",
        "name": "상호작용 스타일이 한줄에 넣는 '세상과의 접촉 방식' — 행동적 존재 정의",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음",
        "mbti": ": MT_INTERACTION_STYLES[스타일].coreGoal + MT_INTERACTION_STYLES[스타일].energy + MT_INTERACTION_STYLES[스타일].inRelationship",
        "cross": "Linda Berens의 상호작용 스타일 모델은 사람이 사회적 상황에서 어떻게 행동하는지를 분류하는 MBTI 보완 도구다. 내면에서 생각을 정리하고 판단하는 방식이 아니라, 겉으로 드러나는 행동 양식이라는 별도의 차원을 분석에 추가해 준다.",
        "impact": 5
      },
      {
        "id": "P-SUMMARY-006",
        "tier": "B",
        "name": "핵심 에너지 회로 압축 — 최강 통변 공식이 인생의 자동 드라이버를 한줄로 지목",
        "tags": [
          "uses:tongbyeon"
        ],
        "saju": "SJ_detectTongbyeon → 가장 강한 길/흉 공식",
        "mbti": ": 없음",
        "cross": "에너지들이 서로 돕고 부딪히는 관계에서 파생되는 에너지 변화 흐름은 MBTI 성향 간 강하고 약한 구조와는 작동 방식이 근본적으로 다르다.",
        "impact": 8
      },
      {
        "id": "P-SUMMARY-M07",
        "tier": "B",
        "name": "4축 강도가 한줄에 넣는 '같은 유형 내 스펙트럼 위치' — 바넘 방지의 결정적 세분화 장치",
        "tags": [
          "axis:EI",
          "axis:SN",
          "axis:TF",
          "axis:JP",
          "uses:intensity"
        ],
        "saju": "없음",
        "mbti": ": MT_INTENSITY_PROFILES[E/I][55/68/88] + MT_INTENSITY_PROFILES[S/N][55/68/88] + MT_INTENSITY_PROFILES[T/F][55/68/88] + MT_INTENSITY_PROFILES[J/P][55/68/88]",
        "cross": "같은 내향(I)이라도 강도에 따라 체감이 완전히 달라진다. 내향 성향이 약한 편이라면 큰 모임도 무난하게 소화하지만, 내향 성향이 강한 편이라면 혼자만의 공간이 진심으로 편안하고 외부 자극은 피곤하게 느껴진다. 같은 I라도 이 두 사람은 사실상 다른 존재에 가깝다는 점이 포인트다.",
        "impact": 6
      }
    ],
    "잘 맞는 타입": [
      {
        "id": "P-TYPE-014",
        "tier": "A",
        "name": "인지기능 스택 보완 구조가 결정하는 최적 파트너 유형 — 열등기능 커버 원리",
        "tags": [
          "uses:inferior",
          "ref:MT_AXES",
          "ref:MT_RELATION"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[유형].stack[3] (열등기능) + MT_RELATION_TYPES.dual + MT_AXES[해당축].types",
        "cross": "MBTI 단독 분석이다. 서로 다른 강점이 자연스럽게 채워지는 보완 관계로, 4가지 성향 축 각각에서 반대편 강점을 가진 유형이 서로를 잘 채워주는 파트너가 된다는 16유형 간 관계의 원리를 보여준다.",
        "impact": 8
      },
      {
        "id": "CROSS-TYPE-008",
        "tier": "A",
        "name": "원국 합충 긴장도와 갈등 호환성의 교차 — '구조적 긴장이 높은 사람에게 위기 궁합이 특히 중요한 이유'",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:gunghap",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "calcRelations(saju) + 원국 내 충/형 개수 및 궁위",
        "mbti": ": MT_CONFLICT_STYLES[유형].trigger/fightStyle/needsFromOther + MT_ANGER.byFunction[주기능].resolution",
        "cross": "에너지 충돌 구조만으로는 에너지적 긴장의 크기만 알 수 있고, 갈등 호환성만으로는 인지적 갈등 대응 방식의 호환만 알 수 있다. 교차하면 '이 사람에게 갈등 호환이 얼마나 중요한가'를 에너지 구조에서 읽어낼 수 있다. 에너지 충돌이 2개 이상인 사람에게는 갈등 호환성의 중요도가 사실상 매우 높아지고, 충돌이 없는 사람에게는 상대적으로 낮아진다.",
        "impact": 6
      },
      {
        "id": "P-TYPE-011",
        "tier": "A",
        "name": "잘 맞는 타입의 다변수 수렴/모순 진단 — '끌리는 타입과 맞는 타입이 같은가 다른가'",
        "tags": [
          "uses:strength",
          "uses:tongbyeon"
        ],
        "saju": "P-TYPE-001~010의 전체 변수 수렴/모순 분석",
        "mbti": ": 없음",
        "cross": "사주 단독 분석이다. 여러 변수가 같은 방향을 가리키는지 서로 다른 방향을 가리키는지를 함께 살펴본다. 이 모순 구조 자체가 '왜 연애가 반복적으로 잘 안 되는가'를 설명하는 핵심 단서가 된다.",
        "impact": 9
      },
      {
        "id": "P-TYPE-013",
        "tier": "A",
        "name": "피해야 할 파트너 에너지 — 5신 기신·구신 + 통변 흉공식이 지목하는 '독이 되는 타입'",
        "tags": [
          "uses:tongbyeon",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye.gisin/gusin + SJ_detectTongbyeon의 흉(凶) 공식",
        "mbti": ": 없음",
        "cross": "잘 맞는 타입을 찾는 것과 반대로, 구조적으로 피하는 것이 나은 타입을 짚어내는 것도 사주가 잘 할 수 있는 영역이다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-016",
        "tier": "A",
        "name": "인지기능 상호작용 매트릭스가 예측하는 두 사람의 주기능 시너지/갈등",
        "tags": [
          "unsung:사",
          "uses:dominant"
        ],
        "saju": "없음",
        "mbti": ": MT_FUNCTION_INTERACTIONS[fn1-fn2].type/desc",
        "cross": "MBTI 단독 분석이다. 8가지 주요 성향 간 다양한 조합 각각의 시너지와 갈등 패턴을 한눈에 볼 수 있다. 두 사람의 가장 강한 성향 조합만 알면 관계의 기본 역학을 바로 파악할 수 있는 도구다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-018",
        "tier": "A",
        "name": "8종 관계 유형별 최적 작동 조건과 위험 패턴 — '어떤 관계 역학에서 이 사람이 가장 잘 작동하는가'",
        "tags": [
          "unsung:사",
          "ref:MT_RELATION"
        ],
        "saju": "없음",
        "mbti": ": MT_RELATION_TYPES[유형].pattern/dynamic/risk + MT_RELATION_MATRIX",
        "cross": "MBTI 단독 패턴. 8종 관계 유형론은 단순히 잘 맞는지 안 맞는지가 아니라, 어떤 방식으로 잘 맞는지 안 맞는지를 8가지로 세분화하여 보여준다.",
        "impact": 8
      },
      {
        "id": "CROSS-TYPE-003",
        "tier": "A",
        "name": "피해야 할 타입의 이중 진단 — '독이 되는 파트너'의 에너지적+인지적 양면 경고",
        "tags": [
          "unsung:양",
          "uses:tongbyeon",
          "uses:yongshin",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT",
          "ref:MT_RELATION"
        ],
        "saju": "SJ_calcOsinChegye.gisin/gusin + SJ_detectTongbyeon 흉 공식",
        "mbti": ": MT_LOVE[유형].dealbreaker + MT_CONFLICT_STYLES[유형].blindSpot + MT_RELATION_TYPES.conflict/supervisor",
        "cross": "사주에서 말하는 '에너지적으로 독이 되는 방향'과 MBTI에서 말하는 '소통이 근본적으로 안 되는 유형'은 각각 한 면만 보여준다. 두 가지를 함께 보면 '왜 독인가'를 에너지 차원(만나면 피곤해진다)과 소통 차원(갈등 방식이 충돌한다) 양쪽에서 설명할 수 있어 경고의 설득력이 훨씬 높아진다.",
        "impact": 7
      },
      {
        "id": "CROSS-TYPE-006",
        "tier": "A",
        "name": "납음 존재 조화와 기질 소통 궁합의 이중 진단 — '존재적 편안함'과 '소통적 편안함'의 수렴/괴리",
        "tags": [
          "uses:napeum",
          "uses:gunghap",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "SJ_getNapeum + 납음 오행 상생/상극/비화 관계",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed/communication",
        "cross": "사주의 존재적 조화와 MBTI의 소통적 조화는 각각 다른 층위를 본다. 두 가지를 함께 보면 '편안함의 두 층위'를 동시에 확인할 수 있어서, '좋은데 뭔가 안 맞는 느낌' 또는 '안 맞는 것 같은데 같이 있으면 편한 느낌'의 원인을 설명할 수 있다.",
        "impact": 5
      },
      {
        "id": "CROSS-TYPE-007",
        "tier": "A",
        "name": "원국 합충 구조와 관계 역학 유형의 교차 — '구조적으로 맞는 파트너'의 에너지+역학 이중 특정",
        "tags": [
          "relation:충",
          "ref:MT_RELATION"
        ],
        "saju": "calcRelations + 원국 내 반합/충 구조 + SJ_findHapTrigger",
        "mbti": ": MT_RELATION_TYPES[유형].pattern/dynamic/risk",
        "cross": "사주로는 어떤 에너지 구조의 파트너가 필요한지 알 수 있고, MBTI로는 어떤 관계 역학이 잘 맞는지 알 수 있다. 두 가지를 함께 보면 파트너 프로필이 두 가지 차원에서 동시에 좁혀진다. 다만 특정 에너지 구조와 특정 MBTI 유형 사이에 직접적인 대응 관계는 없으므로, 이 교차는 확률적으로 가까워지는 것이지 딱 한 명을 특정하는 것은 아니다.",
        "impact": 5
      },
      {
        "id": "P-TYPE-012",
        "tier": "A",
        "name": "암합이 만드는 무의식적 파트너 끌림 방향 — '왜 이런 사람에게 자꾸 끌리는지 모르겠다'",
        "tags": [
          "unsung:사",
          "relation:암합"
        ],
        "saju": "calcSajuForApp.amhap[] + SAJU_AMHAP_LAYERS + classifyAmhap",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 겉으로 드러나지 않는 숨겨진 에너지끼리의 결합은 사주 고유의 개념으로, 본인도 의식하지 못하는 끌림의 패턴을 설명해주는 변수다.",
        "impact": 6
      },
      {
        "id": "P-TYPE-015",
        "tier": "A",
        "name": "기질(Temperament) 궁합이 결정하는 핵심 욕구의 충돌/보완 — '같은 언어를 쓰는가 다른 언어를 쓰는가'",
        "tags": [
          "relation:충",
          "uses:gunghap",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed/communication/conflict",
        "cross": "MBTI 단독 분석이다. 16가지 유형을 4개의 기질 그룹으로 묶어 관계의 기초적인 소통 호환성을 파악한다. 세부적인 성향을 보는 분석이 좀 더 세밀한 차원이라면, 기질은 '대화의 기본 주파수가 맞는가'를 파악하는 큰 그림의 차원이라고 볼 수 있다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-017",
        "tier": "A",
        "name": "dealbreaker와 attract의 구조적 모순 — 인지기능이 만드는 '끌리는데 견딜 수 없는' 역설",
        "tags": [
          "ref:MT_LOVE"
        ],
        "saju": "없음",
        "mbti": ": MT_LOVE[유형].attract/dealbreaker/growthInLove",
        "cross": "MBTI 단독 패턴. 끌림·갈등·성장이 끌림에서 갈등을 거쳐 성장으로 이어지는 전체 경로를 하나의 유형 프로필 안에서 볼 수 있다. 사주에서 여러 변수가 같은 방향을 가리키거나 서로 엇갈리는 구조와 비슷하지만, 살펴보는 변수가 다르다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-004",
        "tier": "B",
        "name": "결핍 오행이 만드는 본능적 끌림 방향 — '없는 것을 가진 사람에 대한 갈망'",
        "tags": [
          "condition:lack"
        ],
        "saju": "calcSajuForApp.lackFull + OHENG_KW[오행].lack/zero",
        "mbti": ": 없음",
        "cross": "내게 없는 에너지를 가진 사람에게 자연스럽게 끌린다는 원리는 '왜 나와 완전히 다른 사람에게 끌리는가'를 구조적으로 설명한다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-002",
        "tier": "B",
        "name": "용신 오행이 지목하는 '만나면 기운 나는' 파트너 오행 방향",
        "tags": [
          "uses:yongshin"
        ],
        "saju": "SJ_calcOsinChegye(SJ_extractYongshinOh(gg.yongshin)) → yongsin/huisin 오행",
        "mbti": ": 없음",
        "cross": "가장 필요한 에너지 이론은 파트너를 내 에너지 균형을 맞춰주는 존재로 보는 독특한 관점을 제공한다.",
        "impact": 8
      },
      {
        "id": "P-TYPE-003",
        "tier": "B",
        "name": "일간 물상이 지목하는 필요 에너지 파트너 — 적천수 십간론 기반",
        "tags": [
          "uses:mulsang"
        ],
        "saju": "JEOKCHEONSU[일간].needsFromEnvironment + JEOKCHEONSU[일간].love",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 나 자신을 상징하는 타고난 에너지 유형 각각이 파트너에게 필요로 하는 것을 자연물 비유로 설명하는 고유한 데이터다.",
        "impact": 8
      },
      {
        "id": "P-TYPE-007",
        "tier": "B",
        "name": "12운성 배우자궁 질감이 결정하는 관계 형태 선호",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:태"
        ],
        "saju": "calcSajuForApp.uns[2] (일지 12운성) + SJ_UNSUNG_MEANING[운성].spouse",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 에너지의 성숙 수준은 에너지 역할과 별개로 작동하는 요소로, 같은 에너지 역할이라도 성숙 수준에 따라 관계의 질감이 완전히 달라진다.",
        "impact": 6
      },
      {
        "id": "P-TYPE-010",
        "tier": "B",
        "name": "성별 육친론이 결정하는 배우자 에너지 기대치",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "uses:yukchin"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별] + 원국 내 정재/편재(남)/정관/편관(여) 분포",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 사주에는 각 에너지가 인간관계 속에서 어떤 의미를 갖는지를 읽어내는 고유한 방식이 있다. 이를 통해 내가 파트너에게 어떤 관계 에너지를 기대하는지를 구체적으로 파악할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-005",
        "tier": "B",
        "name": "조후론이 결정하는 '온도가 맞는 파트너' — 계절적 보완 끌림",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "analyzeGyeokguk.seasonName + analyzeGyeokguk.johuNeeds + JOHU[일간][월지]",
        "mbti": ": 없음",
        "cross": "기질 온도 이론은 사주 고유의 '기질 온도' 개념으로, 파트너 적합성을 기후 비유로 설명한다. 차가운 사주에는 따뜻한 에너지의 파트너가, 뜨거운 사주에는 서늘한 에너지의 파트너가 맞는다는 식이다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-020",
        "tier": "B",
        "name": "삼합 트리거가 예측하는 '잘 맞는 타입이 실제로 나타나는 시점' — 파트너 출현 타이밍",
        "tags": [
          "relation:삼합",
          "uses:sewoon",
          "uses:osin"
        ],
        "saju": "SJ_findHapTrigger(saju, dw, osin) + JIJI_SAMHAP + 세운 지지",
        "mbti": ": 없음",
        "cross": "'어떤 타입이 맞는가'에서 '그 타입이 언제 나타나는가'로 확장하는 시간축 예측이다. 10년 단위 큰 흐름과 올해 흐름 속에서 내 에너지 구조에 잠재된 특별한 에너지 결합이 완성되는 시점을 구체적으로 짚어낼 수 있다.",
        "impact": 6
      },
      {
        "id": "P-TYPE-008",
        "tier": "B",
        "name": "도화살 궁위가 결정하는 매력 수신 채널 — '어떤 매력에 반응하는가'",
        "tags": [
          "pillar:일지",
          "sinsal:도화"
        ],
        "saju": "SJ_getDohwa(일지) + SJ_DOHWA_GUNGWI[궁위] + SINSAL_KEYWORDS.도화살",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 매력 에너지는 매력과 끌림에 특화된 요소로, 내 사주의 어느 위치에 자리하느냐에 따라 매력이 발휘되는 채널이 달라진다는 고유한 관점을 제공한다.",
        "impact": 5
      },
      {
        "id": "P-TYPE-006",
        "tier": "B",
        "name": "신강도 5등급이 결정하는 보완적 파트너 에너지 구조",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength"
        ],
        "saju": "analyzeGyeokguk.strengthGrade (극신강/신강/중화/신약/극신약) + SJ_buildStrengthText.rx",
        "mbti": ": 없음",
        "cross": "에너지가 넘치는 사람과 에너지가 부족한 사람은 같은 관계 에너지라도 필요한 파트너의 강도가 다르다. 에너지가 극도로 넘치는 사람에게 마찬가지로 강한 파트너는 충돌을 일으키고, 에너지가 극도로 부족한 사람에게 마찬가지로 약한 파트너는 서로 무력해진다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-001",
        "tier": "B",
        "name": "배우자궁 십성이 결정하는 이상적 파트너 에너지 원형",
        "tags": [
          "pillar:일지",
          "uses:sipsung_rel"
        ],
        "saju": "calcSajuForApp.jiSS[2].ss (일지 정기 십성) + SS_CONTEXT[해당십성].spouse",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 내 사주에서 파트너와 연결되는 자리에 담긴 핵심 개념으로, 수십 가지 조합마다 고유한 파트너 원형이 존재한다.",
        "impact": 9
      },
      {
        "id": "P-TYPE-024",
        "tier": "B",
        "name": "세운 십성이 만드는 '올해 특히 잘 맞는 파트너 에너지' — 연별 끌림 방향 변동",
        "tags": [
          "dm:기",
          "uses:sewoon",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "세운 간지의 일간 기준 십성 + SJ_getOsinLabel(osin, 세운 천간 오행) + SS_CONTEXT[세운십성].spouse",
        "mbti": ": 없음",
        "cross": "특정 에너지 구조의 파트너가 나타나는 시점을 예측하는 방식이 있다면, 이 방식은 특정 관계 에너지에 대한 끌림 강도가 해마다 어떻게 변동하는지를 예측한다. 앞의 방식은 땅의 에너지 흐름을 보는 것이고 이것은 하늘의 에너지 흐름을 보는 것이라 서로 다른 각도에서 독립적으로 작동한다. 10년 단위 흐름이 큰 방향을 잡아준다면, 이것은 1년 단위 변동으로 실제 행동 예측에 더 바로 적용할 수 있다.",
        "impact": 5
      },
      {
        "id": "P-TYPE-009",
        "tier": "B",
        "name": "통변 공식이 지목하는 관계 시너지 구조 — '어떤 파트너와 시너지가 나는가'",
        "tags": [
          "ss:비겁",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재"
        ],
        "saju": "SJ_detectTongbyeon 결과 (식상생재/살인상생/비겁탈재 등)",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 에너지 순환 흐름은 내 에너지가 어떻게 돌아가는지를 보여주며, 파트너를 그 흐름 안에서 어떤 역할로 필요로 하는지를 자연스럽게 드러내는 독특한 관점을 제공한다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-019",
        "tier": "B",
        "name": "납음(納音) 오행 관계가 결정하는 존재적 조화 파트너 — '같이 있으면 편안한 사람'의 물상적 근거",
        "tags": [
          "unsung:사",
          "uses:mulsang",
          "uses:napeum"
        ],
        "saju": "SJ_getNapeum(dg, dj) + SJ_NAPEUM_TABLE + NAPEUM_STORY + 납음 오행 간 상생/상극/비화 관계",
        "mbti": ": 없음",
        "cross": "사주 단독 패턴. 자연물 상징 분류는 에너지 역할·에너지 성숙 수준과 별개로 작동하는 수십 가지 고유의 상징 분류로, 파트너 조화를 자연물 비유로 설명하는 유일한 요소다. 직관적·상징적 수준에서 파트너 적합성을 살펴보는 방식이다.",
        "impact": 4
      },
      {
        "id": "P-TYPE-021",
        "tier": "B",
        "name": "원국 합충 구조가 결정하는 파트너 관계의 구조적 운명 — '이 사람과 사귀면 합이 완성되는가 충이 발동하는가'",
        "tags": [
          "unsung:사",
          "relation:충"
        ],
        "saju": "calcRelations(saju) + JIJI_YUKHAP + JIJI_CHUNG + 파트너의 지지와의 교차 가능성",
        "mbti": ": 없음",
        "cross": "파트너를 성격이 아니라 에너지 구조의 퍼즐 조각으로 보는 관점이다. 특정 에너지를 가진 사람이 내 에너지 구조를 완성시키거나 충돌을 가중시키는 구조적 예측이 가능하다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-022",
        "tier": "B",
        "name": "갈등 호환성에 의한 파트너 적합성 — '평소에 잘 맞는 파트너'와 '위기 때 살아남는 파트너'의 분리",
        "tags": [
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음",
        "mbti": ": MT_CONFLICT_STYLES[유형].trigger/fightStyle/needsFromOther/blindSpot + MT_ANGER.byType[유형]",
        "cross": "평소에 잘 맞는 유형을 찾는 것과 별개로, 갈등이 생겼을 때 관계가 살아남을 수 있는 유형을 살펴보는 패턴이다. 장기 관계에서는 평소 궁합보다 위기 때의 궁합이 관계 존속을 더 강하게 결정한다는 점에서 독립적인 예측 가치가 있다.",
        "impact": 7
      },
      {
        "id": "P-TYPE-023",
        "tier": "B",
        "name": "의사결정 보완 파트너 — '일상적 판단에서 빠뜨리는 것을 채워주는 사람'",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "없음",
        "mbti": ": MT_DECISION_PROCESS[유형].flow/blind",
        "cross": "MBTI 단독 분석이다. '자신의 가장 약한 성향을 가장 강한 성향으로 가진 파트너'라는 보완 원리를 일상적인 의사결정 장면으로 구체화한다. '무엇을 놓치는가'와 '무엇을 먼저 보는가'의 정확한 대응이 보완이 실제로 작동하는 방식을 보여준다.",
        "impact": 5
      },
      {
        "id": "CROSS-TYPE-004",
        "tier": "S",
        "name": "상호작용 스타일 궁합과 신강도 보완의 교차 — '관계 운영 방식'과 '에너지 보완 방향'의 동시 진단",
        "tags": [
          "uses:strength",
          "uses:gunghap",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGyeokguk.strengthGrade + SJ_buildStrengthText.rx",
        "mbti": ": MT_INTERACTION_STYLES[스타일].coreGoal/inRelationship",
        "cross": "내 에너지의 강약만 보면 어떤 에너지가 필요한지만 알 수 있고, 상호작용 스타일만 보면 관계를 어떻게 운영하는지만 알 수 있다. 두 가지를 함께 보면 '필요한 에너지 방향 + 관계 운영 방식'의 조합으로 파트너 프로필이 두 차원에서 훨씬 선명해진다.",
        "impact": 6
      },
      {
        "id": "CROSS-TYPE-009",
        "tier": "S",
        "name": "배우자궁 십성 에너지와 갈등 스타일 needsFromOther의 수렴/모순 — '원하는 파트너 에너지와 갈등 시 필요한 것이 같은가 다른가'",
        "tags": [
          "pillar:일지",
          "uses:sipsung_rel",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "calcSajuForApp.jiSS[2].ss (일지 정기 십성) + SS_CONTEXT[해당십성].spouse",
        "mbti": ": MT_CONFLICT_STYLES[유형].needsFromOther + MT_LOVE[유형].conflict",
        "cross": "파트너와 연결되는 자리의 에너지만 보면 원하는 파트너 유형만 알 수 있고, 갈등 스타일만 보면 위기 때 필요한 것만 알 수 있다. 두 가지를 함께 보면 '내가 원하는 파트너가 위기 때도 맞는 파트너인가'의 일관성을 확인할 수 있다. 모순이 발견되면 끌리는 사람과 갈등 때 필요한 사람이 다르다는 구조적 연애 난제를 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "CROSS-TYPE-001",
        "tier": "S",
        "name": "결핍 에너지 끌림과 열등기능 끌림의 이중 진단 — '내가 약한 것에 끌리는' 두 가지 구조",
        "tags": [
          "condition:lack",
          "uses:inferior",
          "stress:grip",
          "ref:MT_LOVE",
          "ref:MT_AXES"
        ],
        "saju": "calcSajuForApp.lackFull + OHENG_KW[오행].lack/zero",
        "mbti": ": MT_TYPES[유형].stack[3] (열등기능) + MT_AXES[축].gripDirection + MT_LOVE[유형].attract",
        "cross": "사주에서의 결핍 끌림과 MBTI에서의 가장 약한 성향에 대한 끌림이 같은 방향을 가리키면 '이 사람이 끌리는 타입'이 두 체계에서 동시에 확인되고, 서로 다른 방향을 가리키면 '끌림의 방향이 혼란스러운 구조'가 두 체계에서 함께 드러난다. 어느 한 체계만으로는 각각 한쪽 면만 보이지만, 두 체계를 교차하면 그 끌림이 나에게 좋은 방향인지 아닌지까지 양면에서 살펴볼 수 있다.",
        "impact": 8
      },
      {
        "id": "CROSS-TYPE-002",
        "tier": "S",
        "name": "다변수 수렴/모순 진단의 교차 확장 — 사주 10변수 + MBTI 5변수의 통합 '끌림 ≠ 적합' 진단",
        "tags": [
          "unsung:사",
          "cf:Ne",
          "ref:MT_LOVE",
          "ref:MT_AXES",
          "ref:MT_TEMPERAMENTS",
          "ref:MT_RELATION"
        ],
        "saju": "P-TYPE-001~010 전체 변수",
        "mbti": ": MT_LOVE[유형].attract/dealbreaker + MT_RELATION_TYPES + MT_AXES[축].seesaw + MT_TEMPERAMENTS[기질].coreNeed",
        "cross": "사주 여러 변수의 같은 방향과 모순은 에너지 차원에서 파악할 수 있고, MBTI의 끌림과 결정적 비호환 사이의 모순은 심리적 차원에서 파악할 수 있다. 두 가지를 함께 보면 에너지적으로 끌리는 방향과 심리적으로 끌리는 방향이 같은지 다른지까지 알 수 있다. 모순이 있다면 그것이 에너지 안에서 생긴 문제인지, 심리 안에서 생긴 문제인지, 아니면 에너지와 심리가 서로 어긋나서 생긴 문제인지를 나눠서 볼 수 있다.",
        "impact": 9
      },
      {
        "id": "CROSS-TYPE-005",
        "tier": "S",
        "name": "'잘 맞는 타입'의 시간적 변동 이중 진단 — 대운 전환 × 인지기능 발달 단계",
        "tags": [
          "pillar:시주",
          "uses:daewoon",
          "condition:교운기",
          "uses:development",
          "ref:MT_LOVE"
        ],
        "saju": "대운 십성 전환 + P-TYPE-002/005의 시간축 변동",
        "mbti": ": MT_DEVELOPMENT_STAGES[연령대].focus + MT_LOVE[유형].growthInLove",
        "cross": "사주의 10년 흐름 전환만으로는 '에너지적으로 지금 맞는 타입'의 변동만 알 수 있고, MBTI의 성향 성숙 흐름만으로는 '심리적으로 지금 끌리는 타입'의 변동만 알 수 있다. 두 체계를 교차하면 '이 시기에 에너지적으로도 심리적으로도 맞는 타입'을 함께 짚어내거나, 반대로 '두 방향이 엇갈리는 시기'를 미리 알 수 있다.",
        "impact": 7
      }
    ],
    "직장 적성": [
      {
        "id": "CROSS-WORK-005",
        "tier": "A",
        "name": "직업적 시간축 변화의 이중 예측 — 대운 직업 모드 전환 × 인지기능 발달 단계",
        "tags": [
          "uses:daewoon",
          "uses:job",
          "uses:development"
        ],
        "saju": "calcDaewoon → daewoons[].ss + DW_SIPSUNG_KW[십성] + DW_TRANSITION_KW",
        "mbti": ": MT_DEVELOPMENT_STAGES[연령대] + MT_TYPES[유형].growthPath",
        "cross": "사주의 10년 흐름만으로는 에너지 모드의 전환만 알 수 있고, MBTI의 성장 흐름만으로는 심리적으로 성숙해가는 방향만 알 수 있다. 두 체계를 교차하면 '이 시기에 이 에너지가 이 성장 과제와 만났을 때 실제로 어떤 직업적 변화가 일어나는가'라는 구체적인 시간의 접점이 보이기 시작한다. 특히 직업 적성의 맥락에서는 구체적인 커리어 전환 판단에 직접 적용할 수 있다.",
        "impact": 6
      },
      {
        "id": "CROSS-WORK-004",
        "tier": "A",
        "name": "직업 환경 적합도의 이중 진단 — 조후론 기저 온도 × 기질 핵심 욕구",
        "tags": [
          "uses:johu",
          "uses:job",
          "cf:Ne",
          "ref:MT_CAREER",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "analyzeGyeokguk → johuNeeds/johuDesc + calcLandscapeHarmony",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_CAREER[유형].idealEnv/stressJob",
        "cross": "기질 온도 단독으로는 에너지 온도만, 심리적 기질 단독으로는 내면의 욕구만 알 수 있다. 두 가지를 함께 보면 '이 온도에서 이 욕구가 어떻게 발현되는가'라는 구체적인 환경 방향이 나온다. 특히 두 체계의 방향이 서로 충돌하는 경우, 양쪽을 동시에 만족시키는 환경을 좁혀서 찾을 수 있다.",
        "impact": 5
      },
      {
        "id": "CROSS-WORK-008",
        "tier": "A",
        "name": "직업 적성의 통합 진단 프레임 — 5축(사주) × 5변수(MBTI)의 교차 매트릭스에서 수렴/모순 밀도가 결정하는 직업 방향의 확신도",
        "tags": [
          "uses:strength",
          "uses:gyeokguk",
          "unsung:사",
          "uses:daewoon",
          "uses:yongshin",
          "uses:job"
        ],
        "saju": "P-WORK-001(격국) + P-WORK-002(십성) + P-WORK-003(신강도) + P-WORK-005(대운) + P-WORK-020(용신)",
        "mbti": ": P-WORK-011(인지 도구) + P-WORK-012(상호작용 스타일) + P-WORK-013(기질 욕구) + P-WORK-014(의사결정) + P-WORK-016(번아웃)",
        "cross": "개별 교차 패턴들은 각각 두 변수의 교차만 보지만, 이 통합 프레임은 여러 교차점들이 얼마나 같은 방향을 가리키는지를 전체적으로 살펴본다. 같은 방향이 많을수록 조언이 구체적으로 좁혀지고, 적을수록 다양한 가능성을 열어두고 유연하게 접근해야 한다. 이 사람에게 지금 확실한 직업 조언을 드릴 수 있는 상황인지 아닌지를 먼저 살펴보는 것이 좋은 출발점이 된다.",
        "impact": 7
      },
      {
        "id": "CROSS-WORK-007",
        "tier": "A",
        "name": "5신 용신 직업 방향 × 기질 핵심 욕구의 이중 좁히기 — '어떤 에너지 환경에서 어떤 질의 일을 해야 하는가'의 구체적 교차 처방",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin",
          "uses:job",
          "cf:Ne",
          "ref:MT_CAREER",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "SJ_calcOsinChegye → yongsin + SJ_GAEUN[용신오행].career",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_CAREER[유형].idealEnv",
        "cross": "가장 필요한 에너지 기반 직업 방향 단독으로는 어떤 업종인지만, 기질 단독으로는 어떤 환경의 질이 맞는지만 알 수 있다. 교차하면 이 업종에서 이런 질의 환경을 찾아라는 구체적인 방향이 나온다. 계절 에너지 교차보다 가장 필요한 에너지가 직업 방향 요소로서 더 직접적이고 실용적이며, 다양한 조합이 각각 구체적인 직업 리스트로 이어진다.",
        "impact": 6
      },
      {
        "id": "CROSS-WORK-001",
        "tier": "A",
        "name": "직업 적성의 수렴/모순 진단 — 격국 역할 원형 × 인지기능 커리어 프로필의 이중 포착",
        "tags": [
          "uses:gyeokguk",
          "uses:job",
          "ref:MT_CAREER"
        ],
        "saju": "analyzeGyeokguk → gyeokgukName + JAPYEONG_GG[격국].role",
        "mbti": ": MT_CAREER[유형].strengths/weakAreas/holland + MT_TYPES[유형].stack",
        "cross": "두 체계가 독립적으로 도출한 직업 적성이 같은 방향을 가리키면 확신이 두 배가 되고, 서로 다른 방향을 가리키면 단독 체계로는 설명할 수 없는 내적 갈등의 구조가 드러난다. 방향이 일치할 때는 구체적인 직업군까지 좁힐 수 있고, 엇갈릴 때는 '왜 이 사람이 직업 선택에서 항상 갈등하는가'에 대한 구조적 답이 된다.",
        "impact": 8
      },
      {
        "id": "P-WORK-009",
        "tier": "B",
        "name": "조후론이 결정하는 직업 환경 적합도 — '어떤 온도의 직장에서 잘 작동하는가'",
        "tags": [
          "uses:johu",
          "uses:gaeun",
          "uses:job"
        ],
        "saju": "analyzeGyeokguk → season/seasonName/johuNeeds/johuDesc + calcLandscapeHarmony + ST5_JOHU",
        "mbti": ": 없음",
        "cross": "태어난 계절과 나 자신의 에너지 유형의 조합은 직업 환경의 '기저 온도'를 결정한다. 이것은 고전 문헌에 기반한 다양한 조합표에서 도출되며, 같은 에너지 유형이라도 태어난 달에 따라 필요한 직업 환경이 정반대가 될 수 있다. 에너지 구조나 각 에너지 역할 분석으로는 포착할 수 없는 차원이다.",
        "impact": 5
      },
      {
        "id": "P-WORK-003",
        "tier": "B",
        "name": "신강도 5등급이 결정하는 직업적 에너지 활용 방식 — 리더형 vs 참모형 vs 균형형",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "uses:job"
        ],
        "saju": "analyzeGyeokguk → strengthGrade(극신강/신강/중화/신약/극신약) + selfStr/otherStr 비율",
        "mbti": ": 없음",
        "cross": "내 전체 에너지 크기는 나를 지지하는 에너지와 나를 소모시키는 에너지의 비율로 결정된다. 같은 안정 지향형 에너지 구조라도 전체 에너지가 매우 강한 경우는 '조직 안에서 독자적으로 밀어붙이는 리더'가 되고, 매우 약한 경우는 '좋은 상사 밑에서 꽃피는 직원'이 된다. 에너지 구조와 조합하면 직업 표현의 강도와 방향이 훨씬 세밀하게 분화된다.",
        "impact": 8
      },
      {
        "id": "P-WORK-007",
        "tier": "B",
        "name": "오행 상생 단절이 만드는 직업적 능력 연결 실패 — '왜 재능이 성과로 안 이어지는가'",
        "tags": [
          "unsung:절",
          "uses:job"
        ],
        "saju": "findBrokenChain(saju) + OHENG_FLOW_DESC[끊어진 구간]",
        "mbti": ": 없음",
        "cross": "재능이 있는데 성과가 안 나오는 사람에게 '어디서 흐름이 끊기는가'를 정확히 지목할 수 있다. 다섯 가지 에너지의 순환이 어디서 단절되는지를 보면, 직업적 능력이 왜 중간에 막히는지 구조적으로 설명된다.",
        "impact": 6
      },
      {
        "id": "P-WORK-014",
        "tier": "B",
        "name": "의사결정 프로세스의 직업적 판단 순서 — '업무 판단에서 무엇을 먼저 보고 무엇을 빠뜨리는가'",
        "tags": [
          "unsung:사",
          "uses:job",
          "ref:MT_DECISION"
        ],
        "saju": "없음",
        "mbti": ": MT_DECISION_PROCESS[유형].flow/blind",
        "cross": "가장 약한 성향은 '마지못해' 사용되기 때문에, 시간 압박이 있는 업무 환경에서는 구조적으로 빠지기 쉽다. 이것이 '왜 이 사람이 업무에서 같은 실수를 반복하는가'의 인지적 구조를 정확히 설명해 준다.",
        "impact": 7
      },
      {
        "id": "P-WORK-002",
        "tier": "B",
        "name": "십성 비중 순위가 결정하는 직업 적성 매칭 — 지배 십성+부지배 십성 조합의 구체적 직업군",
        "tags": [
          "ss:비겁",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "uses:job"
        ],
        "saju": "analyzeGyeokguk → cnt(비겁/식상/재성/관성/인성) + SJ_JOB_APTITUDE 매칭",
        "mbti": ": 없음",
        "cross": "사주 단독 분석이다. 12가지 에너지 성격 조합은 나 자신의 에너지 유형과 숨겨진 에너지의 가중치를 포함한 정밀한 계산에서 도출되므로 신뢰도가 높다. 에너지 구조가 '어떤 역할인가'를 보여준다면, 이 분석은 '구체적으로 어떤 직업군인가'를 지목한다.",
        "impact": 8
      },
      {
        "id": "P-WORK-001",
        "tier": "B",
        "name": "격국이 결정하는 타고난 직업적 역할 원형 — '이 사람은 어떤 종류의 일꾼인가'",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "condition:패격",
          "uses:job"
        ],
        "saju": "analyzeGyeokguk → gyeokgukName + gyeokgukDesc + JAPYEONG_GG[격국].role/intact/breaks",
        "mbti": ": 없음",
        "cross": "에너지 구조는 태어난 달의 에너지라는 객관적 데이터에서 도출되며, 직업적 역할의 뼈대를 결정한다. 재능이 직업으로 이어지지 않는 구조적 원인도 여기서 지목된다.",
        "impact": 9
      },
      {
        "id": "P-WORK-006",
        "tier": "B",
        "name": "투출 여부가 결정하는 직업적 재능의 의식화 수준 — '쓸 수 있는 재능 vs 잠자는 재능'",
        "tags": [
          "pillar:월지",
          "uses:tuchul",
          "uses:job"
        ],
        "saju": "SJ_checkTuchul → 월지 지장간의 투출/미투출 판정 + ST5_JIJANGGAN_LAYERS.tuchul",
        "mbti": ": 없음",
        "cross": "내면에 숨겨진 에너지가 겉으로 드러나는지 여부가 직업 적성을 파악하는 데 중요하다. '재능이 있는데 왜 쓰지 못하는가'의 구조적 답이 여기에 있다.",
        "impact": 6
      },
      {
        "id": "P-WORK-005",
        "tier": "B",
        "name": "대운 십성이 활성화하는 시기적 직업 에너지 — '10년 단위로 바뀌는 직업적 모드'",
        "tags": [
          "uses:daewoon",
          "uses:job"
        ],
        "saju": "calcDaewoon → daewoons[].ss + DW_SIPSUNG_KW[십성].strong/weak + DW_TRANSITION_KW[이전→현재]",
        "mbti": ": 없음",
        "cross": "같은 사람이 20대 창의·표현의 흐름에서는 크리에이터로 빛나다가 30대 책임·명예의 흐름에서는 조직 안에서 시련을 겪는 것을 구조적으로 설명할 수 있다. 전체 에너지가 강한 사람과 약한 사람은 같은 10년 흐름도 다르게 체감한다는 점까지 세분화된다.",
        "impact": 7
      },
      {
        "id": "P-WORK-020",
        "tier": "B",
        "name": "5신 용신 오행이 가리키는 직업 에너지 방향 — '어떤 오행의 활동이 이 사람을 살리는가'",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:gaeun",
          "uses:osin",
          "uses:job"
        ],
        "saju": "SJ_calcOsinChegye → yongsin/huisin + SJ_GAEUN[용신오행].career + SJ_buildGaeunText",
        "mbti": ": 없음",
        "cross": "가장 필요한 에너지 방향은 에너지 구조, 에너지 성격과는 독립적인 세 번째 직업 축이다. 에너지 구조가 '역할 원형', 에너지 성격이 '구체적 직업군', 가장 필요한 에너지가 '직업 환경의 방향'이라는 세 축이 겹쳐야 가장 정밀한 직업 방향이 나온다.",
        "impact": 6
      },
      {
        "id": "P-WORK-019",
        "tier": "B",
        "name": "원국 합충이 직업궁(월주)에 만드는 구조적 안정/불안정 — '직업의 뿌리가 흔들리는가 단단한가'",
        "tags": [
          "pillar:월지",
          "relation:충",
          "uses:job"
        ],
        "saju": "calcRelations → jijiChung/jijiHap/jijiHyung 중 월지 관련 + SJ_buildWonkukRelations + CHUNG_GUNGWI_KW[월지 관련]",
        "mbti": ": 없음",
        "cross": "에너지 구조가 '어떤 직업인가'를 결정한다면, 에너지 간의 어울림과 충돌은 '그 직업이 안정적인가 불안정한가'를 결정한다. 같은 재능 표현형 구조라도 직업 자리에 충돌이 있으면 '창작 분야에서 자주 바뀜'이 되고, 어울림이 있으면 '한 분야에서 꾸준히 쌓음'이 된다.",
        "impact": 6
      },
      {
        "id": "P-WORK-012",
        "tier": "B",
        "name": "상호작용 스타일이 결정하는 팀 내 최적 역할 — 지휘관 vs 조율자 vs 설계자 vs 메이커",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음",
        "mbti": ": MT_INTERACTION_STYLES[스타일].coreGoal/energy/communication/strength/stress + MT_TYPES[유형].interactionStyle",
        "cross": "상호작용 스타일은 '같은 직업 안에서도 어떤 역할에 배치되어야 하는가'를 결정한다. 같은 마케팅 팀이라도 주도형은 팀장, 후방 지원형은 전략가, 분위기 주도형은 대외 커뮤니케이션, 방향 설정형은 프로젝트 매니저가 최적이다.",
        "impact": 7
      },
      {
        "id": "P-WORK-008",
        "tier": "B",
        "name": "일주 60종이 결정하는 직업 적성의 고유한 톤 — 같은 격국이라도 일주에 따라 다른 직업 방향",
        "tags": [
          "uses:gyeokguk",
          "uses:ilju",
          "uses:job"
        ],
        "saju": "ILJU_DATA[일주].job + ILJU_KW[일주].core + JEOKCHEONSU[일간].work",
        "mbti": ": 없음",
        "cross": "같은 에너지 구조 안에서도 나 자신의 에너지 유형과 그 아래 깔린 에너지의 조합에 따라 개인차가 생긴다. 이 조합의 직업 방향, 핵심 성향, 적성이 세 겹으로 겹쳐 직업 방향을 세밀하게 지목한다.",
        "impact": 7
      },
      {
        "id": "P-WORK-011",
        "tier": "B",
        "name": "인지기능 스택이 결정하는 직업적 핵심 도구와 사각지대 — 주기능은 무기, 열등기능은 맹점",
        "tags": [
          "unsung:사",
          "uses:job",
          "uses:dominant",
          "uses:inferior",
          "ref:MT_CAREER"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[유형].stack + MT_FUNCTIONS[주기능].healthyExpression/unhealthyExpression + MT_CAREER[유형].strengths/weakAreas",
        "cross": "가장 강한 성향은 가장 적은 에너지로 가장 큰 효과를 내고, 가장 약한 성향은 극도로 높은 에너지를 소모한다. 가장 약한 성향을 주로 사용하는 직업은 단기간은 가능하지만 장기적 소진이 구조적으로 예정되어 있다. 어떤 성향이 자연스러운 도구이고 어떤 성향이 에너지를 과도하게 소모하는지를 알면 직업적 지속가능성을 판단할 수 있다.",
        "impact": 9
      },
      {
        "id": "P-WORK-016",
        "tier": "B",
        "name": "스트레스 단계별 직업적 번아웃 메커니즘 — 루프와 그립이 업무에서 발동하는 구체적 경로",
        "tags": [
          "uses:job",
          "stress:grip",
          "stress:loop",
          "ref:MT_CAREER"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES.stage3_loop/stage4_grip + MT_TYPES[유형].loop/stressPattern + MT_CAREER[유형].stressJob",
        "cross": "번아웃은 갑자기 오지 않는다. 정상 상태에서 시작해 경미한 피로, 같은 패턴의 반복, 극심한 스트레스 상태, 회복의 5단계로 진행된다. 반복 패턴 단계에서 두 번째로 강한 성향을 의식적으로 사용하는 활동을 하면 번아웃 초기에 개입할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-WORK-018",
        "tier": "B",
        "name": "직장 내 갈등 패턴의 인지적 구조 — '왜 직장에서 같은 사람과 계속 부딪히는가'",
        "tags": [
          "unsung:사",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음",
        "mbti": ": MT_CONFLICT_STYLES[유형].trigger/fightStyle/blindSpot + MT_ANGER.byFunction[주기능]",
        "cross": "직장에서 같은 마찰이 반복된다면 성격이나 의지의 문제가 아닐 수 있다. 자신이 인식하지 못하는 인지적 사각지대가 구조적으로 그 마찰을 만들어내고 있을 가능성이 높다.",
        "impact": 6
      },
      {
        "id": "P-WORK-017",
        "tier": "B",
        "name": "인지기능 발달 단계에 의한 직업적 시간축 변화 — '나이에 따라 맞는 직업이 달라진다'",
        "tags": [
          "uses:job",
          "uses:development"
        ],
        "saju": "없음",
        "mbti": ": MT_DEVELOPMENT_STAGES[연령대] + MT_STACK_POSITIONS[위치].developAge + MT_TYPES[유형].growthPath",
        "cross": "사람은 나이에 따라 다른 직업 환경을 필요로 한다. 성격 유형의 발달 흐름을 보면 '같은 사람이 왜 시기마다 다른 환경에서 잘 맞는가'를 구조적으로 설명할 수 있다. 사주의 10년 흐름도 같은 시간축 변화를 다루므로, 두 체계를 함께 보면 더 입체적인 그림이 나온다.",
        "impact": 6
      },
      {
        "id": "P-WORK-013",
        "tier": "B",
        "name": "기질(Temperament)이 결정하는 직업 환경 핵심 욕구 — 이것이 충족 안 되면 능력과 무관하게 소진",
        "tags": [
          "relation:충",
          "uses:job",
          "cf:Ne",
          "ref:MT_CAREER",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed/communication + MT_CAREER[유형].idealEnv/stressJob",
        "cross": "같은 직업이라도 어떤 환경에서 하느냐에 따라 성과가 극적으로 달라진다. 의미와 가치를 중시하는 기질의 프로그래머가 의미 있는 프로젝트에서는 빛나지만 의미 없는 반복 유지보수에서 소진되는 것은 코딩 능력의 문제가 아니라 기질적 욕구의 문제다.",
        "impact": 8
      },
      {
        "id": "P-WORK-010",
        "tier": "B",
        "name": "월간 십성이 결정하는 직장에서의 사회적 페르소나 — '직장 동료들이 보는 나'",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "ss[1].ss (월간 십성) + SSP[십성].월주 + SS_CONTEXT[십성].career + SIPSUNG_GUNGWI_KW[십성].month",
        "mbti": ": 없음",
        "cross": "직업 자리는 직장에서의 '업무용 나'를 결정하는 가장 직접적인 변수다. 본래의 나와 직장에서의 내가 다르면 '직장에서 연기하는 느낌'이 생기고, 같으면 자연스러운 직업 생활이 된다.",
        "impact": 6
      },
      {
        "id": "P-WORK-004",
        "tier": "B",
        "name": "통변 공식이 만드는 직업적 구조적 시너지와 구조적 장애 — '왜 이 사람은 이 패턴을 반복하는가'",
        "tags": [
          "unsung:사",
          "uses:tongbyeon",
          "uses:job"
        ],
        "saju": "SJ_detectTongbyeon → 통변 공식 16개 (길8+흉7+반길반흉1)",
        "mbti": ": 없음",
        "cross": "자기 에너지가 재물 에너지를 잠식하는 구조를 가진 사람은 동업할 때마다 돈이 새는 패턴을 반복하는데, 이것은 성격이 아니라 에너지 구조의 문제다. 에너지 성격의 조합 패턴을 보면 직업적 행동 패턴의 '왜'를 구조적으로 설명할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-WORK-015",
        "tier": "B",
        "name": "4축 강도별 업무 환경 적합도 분화 — 같은 유형이라도 강도에 따라 필요한 환경이 다르다",
        "tags": [
          "uses:intensity"
        ],
        "saju": "없음",
        "mbti": ": MT_INTENSITY_PROFILES[축][강도].work/burn",
        "cross": "성향의 강도는 유형 분류를 넘어 개인차를 포착하는 핵심 변수다. 논리 중심 성향이 강한 사람은 감정적 동료와의 강제 협업에서 소진되고, 감정 중심 성향이 강한 사람은 감정적으로 안전하지 않은 환경에서 신체 증상으로 소진된다. 같은 유형 안에서도 팀 배치를 달리해야 하는 이유가 여기에 있다.",
        "impact": 6
      },
      {
        "id": "CROSS-WORK-006",
        "tier": "S",
        "name": "월지 합충에 의한 직업 안정도 × 상호작용 스타일 스트레스의 이중 작용 — 구조적 불안정이 인지적 소진을 가속하는 경로",
        "tags": [
          "pillar:월지",
          "relation:충",
          "uses:job",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "calcRelations → 월지 관련 충/형 + CHUNG_GUNGWI_KW",
        "mbti": ": MT_INTERACTION_STYLES[스타일].stress + MT_TYPES[유형].interactionStyle",
        "cross": "직업 자리에 충돌이 있다는 것만으로는 '직업이 잦게 바뀐다'는 것만 알 수 있고, 상호작용 스타일의 스트레스 반응만으로는 '이 상황에서 소진된다'는 것만 알 수 있다. 두 가지를 함께 보면 '직업 변동이 이 사람의 스트레스를 구체적으로 어떻게 촉발하는가'의 경로가 나온다. 방향 설정형에게 직업 변동은 존재론적 위협이지만, 분위기 주도형에게는 새 시작의 기회가 될 수도 있다. 같은 충돌 구조라도 인지 방식에 따라 위기인지 기회인지가 갈린다.",
        "impact": 6
      },
      {
        "id": "CROSS-WORK-003",
        "tier": "S",
        "name": "직업적 반복 실패의 이중 구조 진단 — 통변 흉공식 × 의사결정 사각지대",
        "tags": [
          "strength:신약+",
          "ss:비겁",
          "unsung:사",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약",
          "tongbyeon:관살혼잡",
          "uses:job",
          "ref:MT_CONFLICT",
          "ref:MT_DECISION"
        ],
        "saju": "SJ_detectTongbyeon → 흉 공식(비겁탈재/관살혼잡/재다신약 등)",
        "mbti": ": MT_DECISION_PROCESS[유형].blind + MT_CONFLICT_STYLES[유형].blindSpot",
        "cross": "반복되는 에너지 패턴만으로는 '무엇이 반복되는가'만 알 수 있고, 인지적 사각지대만으로는 '무엇을 빠뜨리는가'만 알 수 있다. 두 가지를 함께 보면 '이 에너지 패턴이 이 인지적 사각지대를 통해 어떤 구체적 실패로 이어지는가'의 경로가 드러난다. 처방도 두 방향으로 나뉜다. 에너지 패턴 자체를 바꿀 수는 없지만, 인지적 사각지대를 의식적으로 보완하면 같은 패턴에서도 실패를 줄일 수 있다.",
        "impact": 7
      },
      {
        "id": "CROSS-WORK-002",
        "tier": "S",
        "name": "조직 내 역할 적합성의 이중 결정 — 신강도 에너지 크기 × 상호작용 스타일 운용 방식",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGyeokguk → strengthGrade(극신강/신강/중화/신약/극신약)",
        "mbti": ": MT_INTERACTION_STYLES[스타일].coreGoal/stress + MT_TYPES[유형].interactionStyle",
        "cross": "에너지 강약만으로는 '에너지 크기'만, 상호작용 스타일만으로는 '운용 방식'만 알 수 있다. 두 가지를 함께 보면 '이 크기의 에너지를 이 방식으로 쓸 때 어떤 일이 발생하는가'의 구체적 조합이 나온다. 특히 서로 어긋나는 조합은 단독 체계에서는 예측할 수 없는 직업적 긴장을 드러낸다.",
        "impact": 7
      }
    ]
  },
  "ssom": {
    "끌림": [
      {
        "id": "SOMC-CHEM-009",
        "tier": "A",
        "name": "교차 삼합 완성 × 인지기능 스택 커버율 — 둘이 만나면 세계가 확장되는 시너지 끌림",
        "tags": [
          "unsung:사",
          "unsung:묘",
          "unsung:양",
          "relation:삼합",
          "uses:yongshin",
          "uses:gunghap",
          "ref:MT_RELATION"
        ],
        "saju": "두 사람의 지지를 합산했을 때 삼합 완성 여부 (JIJI_SAMHAP 4조: 인오술→화/사유축→금/신자진→수/해묘미→목) + analyzeGunghap 레이어 10 교차 삼합 + 삼합 오행이 양쪽 용신과 관련되는지",
        "mbti": ": 두 사람의 인지기능 스택을 합산했을 때 8개 기능 중 커버율 (6개이상=고, 4~5개=중, 3개이하=저) + MT_RELATION_TYPES.dual/활성화 여부 + MT_TEAM_DYNAMICS",
        "cross": "두 사람이 함께 있을 때 서로를 더 크게 만드는 시너지 끌림이 있다. 사주만으로는 이 에너지 공명이 실제 끌림으로 체험되는지, 아니면 단순히 효율적인 파트너십인지 구분하기 어렵다. MBTI만으로는 서로의 성향이 얼마나 잘 맞는지가 관계 만족도와 직결되는지 불확실하다. 두 체계를 함께 보면 이 시너지의 성격이 드러난다. 두 사람의 에너지가 강하게 맞닿아 있고 서로의 성향도 넓게 맞닿아 있으면 '운명적 팀'의 느낌이 생기고, 에너지는 강하게 맞닿는데 성향의 맞닿는 부분이 적으면 '에너지는 공명하는데 소통이 어려운' 역설이 나타난다.",
        "impact": 6
      },
      {
        "id": "SOMC-CHEM-001",
        "tier": "A",
        "name": "천간합 × 인지축 상보성 — 설명 불가능한 끌림의 이중 공명",
        "tags": [
          "unsung:사",
          "unsung:병",
          "relation:천간합",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se"
        ],
        "saju": "두 사람 일간 천간합 여부 (CHEONGAN_HAP 5쌍: 갑기/을경/병신/정임/무계) + 합화오행",
        "mbti": ": 인지기능 축 상보성 여부 (Te-Fi/Se-Ni/Ti-Fe/Si-Ne — 한쪽의 1번 기능이 상대의 3~4번 기능인 축) + MT_STACK_POSITIONS",
        "cross": "두 사람의 에너지가 서로 당기는 것은 '에너지적 인력'이고, 서로의 성향이 보완되는 구조는 '생각하고 느끼는 방식의 보완'이다. 둘 다 단독으로는 한 차원의 끌림만 설명하지만, 함께 보면 '에너지적으로도 성향적으로도 반대편에서 끌리는' 이중 공명이 드러난다. 이 이중 공명이 있을 때만 '설명하기 어려운 운명적 끌림'이라는 체험이 성립한다.",
        "impact": 8
      },
      {
        "id": "SOMC-CHEM-002",
        "tier": "A",
        "name": "오행 부족 보완 × 열등기능 커버 — 만나면 완전해지는 느낌의 이중 충족",
        "tags": [
          "condition:lack",
          "unsung:양",
          "relation:충",
          "uses:dominant",
          "uses:inferior",
          "uses:auxiliary"
        ],
        "saju": "A의 lackFull(부족오행) + B의 elFull(해당 오행 2.0 이상) — 양방향 교차 + OH_EFFECT[해당오행]",
        "mbti": ": A의 열등기능(MT_TYPES[A].stack[3]) + B의 주기능/부기능(stack[0]/stack[1])이 A의 열등기능을 커버하는지 — 양방향 교차",
        "cross": "에너지 균형의 충족이고, 가장 약한 성향을 상대가 커버해 주는 것은 심리적 약점의 충족이다. 단독으로는 각각 '에너지적 편안함' 또는 '인지적 안정감'만 설명하지만, 함께 보면 '완전해지는 느낌'의 전체 구조가 드러난다. 두 보완이 같은 방향인지 다른 방향인지가 보완 효과의 체감 크기를 결정하며, 이는 따로 봐서는 알 수 없다.",
        "impact": 7
      },
      {
        "id": "SOMC-CHEM-005",
        "tier": "A",
        "name": "용신 교차 × 인지기능 약점 보완 방향 일치 — 이중 확인이 만드는 운명적 끌림",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yongshin",
          "uses:gunghap",
          "uses:osin",
          "uses:dominant",
          "uses:inferior"
        ],
        "saju": "analyzeGunghap 레이어 7 — A의 용신 오행이 B 사주에 풍부한 정도 (bForA) + B의 용신 오행이 A 사주에 풍부한 정도 (aForB) + SJ_calcOsinChegye 5신 교차",
        "mbti": ": A의 열등기능 영역을 B의 주기능이 커버하는지 + B의 열등기능 영역을 A의 주기능이 커버하는지 — 양방향 인지기능 약점 보완",
        "cross": "가장 필요한 에너지를 상대가 채워주는 것과, 가장 약한 성향을 상대가 보완해 주는 것은 비슷해 보이지만 다르다. 내게 부족한 에너지가 채워지면 '편하다'는 느낌이 오고, 가장 필요한 에너지가 채워지면 '살아난다'는 느낌이 온다. 이 차이가 끌림의 강도를 결정한다.",
        "impact": 8
      },
      {
        "id": "SOMC-CHEM-003",
        "tier": "S",
        "name": "일지 12운성 쌍 × J/P 쌍 — 연애 리듬 동기화 매트릭스",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:건록",
          "unsung:제왕",
          "unsung:장생",
          "unsung:목욕",
          "unsung:절",
          "unsung:쇠",
          "axis:JP",
          "uses:intensity"
        ],
        "saju": "A의 일지 12운성 (uns[2]) + B의 일지 12운성 — SJ_UNSUNG_MEANING[x].spouse 조합 (건록+목욕, 제왕+쇠, 장생+절 등)",
        "mbti": ": A의 J/P 축 + B의 J/P 축 — 4조합 (JJ/JP/PJ/PP) + MT_INTENSITY_PROFILES 강도",
        "cross": "에너지 성장 단계의 조합은 '에너지 리듬의 궁합'이고, 계획형과 즉흥형의 조합은 '생활 리듬의 궁합'이다. 단독으로는 각각 추상적 수준에서만 맞다 안 맞다를 말하지만, 함께 보면 '구체적으로 데이트를 어떻게 하고 연락을 어떻게 하는가'의 패턴이 결정된다. 에너지 리듬은 맞는데 생활 속도가 안 맞는 구조, 혹은 속도는 맞는데 에너지 리듬이 안 맞는 구조가 각각 다른 방식으로 마찰을 만든다.",
        "impact": 6
      },
      {
        "id": "SOMC-CHEM-007",
        "tier": "S",
        "name": "상호작용 스타일 조합 × 사주 신강도 쌍 — 썸 주도권의 자연스러운 배분 vs 권력 다툼",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "unsung:사",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "A의 신강도 (극신강/신강/중화/신약/극신약) + B의 신강도 — 쌍방향 에너지 볼륨 비교",
        "mbti": ": A의 상호작용 스타일(MT_INTERACTION_STYLES: behind-the-scenes/chart-the-course/get-things-going/in-charge) + B의 상호작용 스타일 — 4×4 조합 중 핵심 역학 + MT_INTERACTION_STYLES[x].inRelationship",
        "cross": "에너지 강약은 '자기 주장의 볼륨'이고, 상호작용 스타일은 '관계에서 목표를 달성하는 방식'이다. 에너지가 강하면서 주도형 스타일이면 썸에서 밀어붙이는 접근이 되고, 에너지는 강한데 후방 지원형 스타일이면 강한 에너지를 뒤에서 운용하는 전략적 접근이 된다. 두 사람의 조합에서 이것이 '자연스러운 역할 배분'인지 '권력 다툼'인지를 결정한다.",
        "impact": 6
      },
      {
        "id": "SOMC-CHEM-006",
        "tier": "S",
        "name": "기질(Temperament) 조합 × 사주 오행 기질 궁합 — 끌림의 질감 매트릭스",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:gunghap",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "A의 일간 오행 기질 (목=성장/화=표현/토=안정/금=결단/수=유연) + B의 일간 오행 기질 — 상생/상극/비화 관계",
        "mbti": ": A의 기질(MT_TEMPERAMENTS: NF/NT/SP/SJ) + B의 기질 — 기질 조합의 coreNeed 충돌/공명 + MT_TEMPERAMENTS[x].conflict",
        "cross": "에너지의 흐름 방향은 '에너지가 자연스럽게 흐르는가, 긴장하는가'를 보여주고, 기질 조합은 '핵심 욕구가 충돌하는가, 공명하는가'를 보여준다. 에너지가 자연스럽게 흐르면서 핵심 욕구도 공명하면 끌림이 즉각적이고 자연스럽다. 에너지는 긴장 관계인데 핵심 욕구는 공명하면 '자극적이지만 묘하게 편한' 끌림이 된다. 끌림의 질감이 자연스러운지, 자극적인지, 안정적인지, 긴장되는지는 두 가지를 함께 봐야 결정된다.",
        "impact": 7
      },
      {
        "id": "SOMC-CHEM-008",
        "tier": "S",
        "name": "천간충(일간 충) × 인지기능 그립 자극 — 위험하지만 중독적인 끌림",
        "tags": [
          "uses:strength",
          "unsung:사",
          "unsung:양",
          "unsung:병",
          "relation:충",
          "uses:dominant",
          "uses:inferior",
          "stress:grip"
        ],
        "saju": "두 사람 일간의 천간충 여부 (CHEONGAN_CHUNG 4쌍: 갑경/을신/병임/정계) + CHEONGAN_CHUNG_KW 의미 + 각자의 신강도(충을 감당할 체력)",
        "mbti": ": A의 주기능이 B의 열등기능을 자극하는지(grip 유발) — MT_TYPES[A].stack[0] vs MT_TYPES[B].stack[3] 같은 축 여부 + 양방향 교차 + MT_GRIP_PATTERNS",
        "cross": "에너지가 자연스럽게 하나로 어우러지는 끌림이 있다면, 서로 부딪혀 불꽃이 튀는 끌림도 있다. 사주만으로는 그 충돌이 끌림인지 거부인지 판단하기 어렵고, MBTI만으로는 극심한 긴장 자극이 매력으로 느껴지는지 위협으로 느껴지는지 판단하기 어렵다. 두 가지를 함께 봐야 '이 충돌이 성장의 촉매인지 파괴의 시작인지'가 결정된다. 특히 에너지 충돌과 심리적 긴장 자극이 양방향으로 작용하면 소진 속도와 변화 속도가 모두 극대화되는 고유한 역학이 나온다.",
        "impact": 7
      },
      {
        "id": "SOMC-CHEM-004",
        "tier": "S",
        "name": "대운 동기화 × 인지기능 발달 단계 동기화 — 함께 성장하는 느낌 vs 엇갈리는 방향",
        "tags": [
          "dm:기",
          "ss:비겁",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "uses:daewoon",
          "uses:gunghap",
          "uses:development",
          "uses:dominant",
          "uses:auxiliary"
        ],
        "saju": "analyzeGunghap 레이어 5 대운 동기화 (동반 상승기/한쪽 상승/한쪽 하강/함께 인내) + 현재 대운 십성 그룹 (비겁/식상/재성/관성/인성)",
        "mbti": ": 인지기능 발달 단계 동기화 — 두 사람의 나이대별 주력 개발 기능이 상보적인지 동일한지 (MT_TYPES[타입].stack 순서 + 나이대별 발달: 20대 주기능 강화, 30대 부기능 개발, 40대+ 3차/열등 통합)",
        "cross": "인생의 큰 흐름이 일치하는 것은 '시간적 에너지 흐름'의 일치이고, 성격 유형 발달의 일치는 '정신적 성장 방향'의 일치이다. 큰 흐름만 보면 에너지는 맞는데 성장 방향이 다를 수 있고, 성격 발달만 보면 성장 방향은 같은데 에너지적으로 힘든 시기일 수 있다. 두 가지를 함께 봐야 '지금 이 시기에 함께 성장할 수 있는가'라는 시간적 궁합의 전체 그림이 나온다.",
        "impact": 6
      }
    ],
    "맞춰가야 할 부분": [
      {
        "id": "SOMC-ADJUST-001",
        "tier": "A",
        "name": "지지 충·형·해·원진 궁위별 마찰 × T/F 갈등 처리 방식 — 같은 충이 다른 상처를 만드는 구조",
        "tags": [
          "unsung:양",
          "relation:충",
          "relation:형",
          "relation:해",
          "axis:TF"
        ],
        "saju": "지지충(JIJI_CHUNG 6쌍), 지지형(JIJI_HYUNG), 지지해(JIJI_HAE 6쌍), 원진살(WONJIN) — 궁위 조합별(CHUNG_GUNGWI_KW, JIJI_CHUNG_KW, JIJI_HAE_KW, JIJI_HYUNG_KW)",
        "mbti": ": T/F 판단축 (양쪽 모두)",
        "cross": "에너지 충돌과 마찰은 '어디서 부딪히는가'를 알려주고, 논리형과 감정형의 차이는 '어떻게 아파하는가'를 알려준다. 사주만으로는 마찰의 위치만 보이고, MBTI만으로는 갈등 처리 스타일만 보인다. 두 가지를 함께 보면 '두 사람의 관계 자리에 충돌이 있는데 논리형과 감정형 쌍이면, 상대의 직업적 이동을 감정적 배신으로 해석한다'처럼 구체적인 시나리오 예측이 가능해진다.",
        "impact": 9
      },
      {
        "id": "SOMC-ADJUST-002",
        "tier": "A",
        "name": "신강도 쌍 × T/F·E/I — 갈등 주도권과 해소 경로의 이중 결정",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "unsung:태",
          "unsung:양",
          "axis:EI",
          "axis:TF"
        ],
        "saju": "신강도(strengthScore, strengthGrade — 극신강/신강/중화/신약/극신약) 양쪽의 조합(강강/강약/약약/강중화 등)",
        "mbti": ": T/F 판단축 + E/I 태도축 (양쪽 모두)",
        "cross": "에너지 강약은 '누가 밀어붙이는가'의 볼륨을 결정하고, 외향/내향과 논리형/감정형의 조합은 '갈등이 어디로 흘러가는가'의 경로를 결정한다. 볼륨만 보이거나 경로만 보이는 것을 넘어, 두 가지를 함께 보면 '에너지가 강하고 외향적이며 감정 표현이 강한 사람이 밀어붙일 때, 에너지가 약하고 내향적이며 논리 중심인 사람은 조용히 냉소적으로 관계를 평가하다가 갑자기 차단한다'는 구체적인 궤적이 보인다.",
        "impact": 8
      },
      {
        "id": "SOMC-ADJUST-004",
        "tier": "A",
        "name": "격국 역할 교차 × J/P — 사회적 기질 충돌의 증폭/완화",
        "tags": [
          "gyeokguk:식신격",
          "gyeokguk:상관격",
          "gyeokguk:편재격",
          "gyeokguk:정재격",
          "gyeokguk:편관격",
          "gyeokguk:정관격",
          "gyeokguk:편인격",
          "gyeokguk:정인격",
          "gyeokguk:양인격",
          "gyeokguk:건록격",
          "ss:식신",
          "ss:상관",
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "ss:편인",
          "ss:정인",
          "unsung:건록",
          "unsung:사",
          "unsung:양",
          "relation:충",
          "axis:JP"
        ],
        "saju": "양쪽의 격국 유형(gyeokgukName — 식신격/상관격/편재격/정재격/편관격/정관격/편인격/정인격/건록격/양인격) 조합, 특히 상극적 역할 쌍(예: 식신격 vs 편관격, 상관격 vs 정관격)",
        "mbti": ": J/P 생활양식축 (양쪽 모두)",
        "cross": "에너지 구조는 '무엇이 충돌하는가'를 보여주고, 계획형과 즉흥형의 조합은 '그 충돌이 일상에서 얼마나 자주 발현되는가'를 결정한다. 두 사람의 에너지 방향이 서로 맞지 않아도 생활 리듬이 충돌을 완화하면 일상적 마찰은 낮고, 에너지 구조가 중립이어도 생활 리듬의 차이가 의외의 마찰을 만들 수 있다.",
        "impact": 7
      },
      {
        "id": "SOMC-ADJUST-005",
        "tier": "B",
        "name": "12운성 에너지 레벨 차이 × J/P — 속도 비대칭이 만드는 리듬 마찰",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:건록",
          "unsung:제왕",
          "unsung:장생",
          "unsung:사",
          "unsung:묘",
          "unsung:절",
          "unsung:양",
          "unsung:쇠",
          "unsung:병",
          "axis:JP"
        ],
        "saju": "양쪽 일지 12운성(uns[2]) 조합 — 특히 에너지 레벨이 크게 다른 쌍(제왕 vs 묘/절, 건록 vs 병/사, 장생 vs 쇠 등)",
        "mbti": ": J/P 생활양식축 (양쪽 모두)",
        "cross": "에너지 볼륨의 차이는 '두 사람의 에너지 크기가 얼마나 다른가'를 보여주고, 계획형과 즉흥형의 조합은 '그 차이를 일상에서 어떻게 경험하는가'를 결정한다. 리듬이 맞으면 끌림이 강해지는 것의 반대편, 즉 리듬이 안 맞을 때 어디서 마찰이 생기는지를 보여준다.",
        "impact": 6
      },
      {
        "id": "SOMC-ADJUST-003",
        "tier": "S",
        "name": "과잉 오행 상극 방향 × 인지기능 그립 스트레스 방향 — 만성 마찰의 이중 축",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:inferior",
          "stress:grip"
        ],
        "saju": "양쪽 사주의 과잉 오행(elFull에서 2.5 이상) 사이의 상극 관계(OH_GEUK), 특히 A의 과잉 오행이 B의 과잉 오행을 극하는 방향",
        "mbti": ": 그립(grip) 스트레스 시 열등기능 발동 방향 — 상대의 과잉 에너지가 나의 열등기능 영역을 자극하는지 여부",
        "cross": "즉각적인 거부 반응이 아니라 서서히 쌓이는 마찰이 있다. 어떤 에너지가 어떤 에너지를 누르는 방향은 '어디서 힘의 불균형이 생기는가'를 보여주고, 가장 약한 성향은 '어디가 취약한가'를 보여준다. 두 취약점이 겹치면 만성 스트레스가 되고, 겹치지 않으면 서로 완충이 가능하다.",
        "impact": 7
      },
      {
        "id": "SOMC-ADJUST-006",
        "tier": "S",
        "name": "MBTI 갈등 맹점(blindSpot) × 상대방 사주 마찰 에너지 방향 — 자각 없는 관계 악화 패턴",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "relation:충",
          "stress:loop",
          "ref:MT_CONFLICT"
        ],
        "saju": "상대방 사주의 마찰 유발 에너지 방향 — 충·형·해·원진의 궁위, 과잉 오행 방향, 격국 역할",
        "mbti": ": MT_CONFLICT_STYLES(blindSpot — 16유형별 갈등 맹점), MT_TYPES(loop — 루프 패턴)",
        "cross": "자신이 모르는 인지적 사각지대와 관계에 내재된 구조적 긴장이 겹치면 이중 맹점이 만들어진다. 사주만으로는 마찰의 존재만 알 수 있고, MBTI만으로는 사각지대의 존재만 알 수 있다. 두 가지를 함께 보면 '이 사람은 이 방향의 마찰을 자각하지 못한 채 악화시킬 것이다'라는 구체적인 경고가 가능해진다.",
        "impact": 7
      }
    ],
    "사귀려면": [
      {
        "id": "SOMC-TIMING-007",
        "tier": "A",
        "name": "Ni 주기능 earlyDating 직관 × 사주 타이밍 정합 — '이 사람이다' 확신의 이중 확인",
        "tags": [
          "unsung:사",
          "relation:천간합",
          "relation:삼합",
          "uses:daewoon",
          "uses:sewoon",
          "cf:Ni",
          "uses:dominant",
          "ref:MT_LOVE"
        ],
        "saju": "세운·대운 연애 타이밍 열림 + 천간합/삼합 등 합 트리거 발동 (SJ_findHapTrigger)",
        "mbti": ": Ni 주기능자(INFJ/INTJ)의 earlyDating 패턴 (MT_LOVE.INFJ.earlyDating / MT_LOVE.INTJ.earlyDating) + MT_FUNCTIONS.Ni.coreProcess",
        "cross": "여러 가능성을 동시에 열어두고 탐색하기를 즐기는 사람은 좋은 타이밍이 열려도 한 사람으로 좁혀가기 어렵고 여러 사람을 동시에 탐색하는 경향이 있다. 반면 강한 확신으로 하나에 집중하는 사람은 타이밍이 열리면 단 한 사람에게 강력하게 수렴한다. 사주만으로는 왜 같은 타이밍에 어떤 사람은 한 명에게 올인하고 어떤 사람은 여전히 탐색 중인지 설명하기 어렵고, MBTI만으로는 왜 그 강한 확신이 하필 이 시기에 발동했는지 설명하기 어렵다. 두 가지를 함께 봐야 전체 그림이 나온다.",
        "impact": 6
      },
      {
        "id": "SOMC-TIMING-004",
        "tier": "A",
        "name": "배우자궁 기대 정합 × A의 MBTI 기질 — 사귀기의 자연스러움 vs 의식적 조율 필요도",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:사"
        ],
        "saju": "B의 배우자궁 십성 (jiSS[2].ss) + B의 일지 12운성 (SJ_UNSUNG_MEANING.spouse)",
        "mbti": ": A의 MBTI 4글자 기질 유형 + 강도",
        "cross": "상대의 기대에 부합했을 때 관계가 얼마나 자연스럽게 이어지는지를 보여주는 패턴이다. 기대에 어긋났을 때 역효과가 생기는 것과 반대로, 기대에 맞아떨어졌을 때는 사귀기까지의 과정이 훨씬 수월해진다. 또한 두 사람의 성향이 잘 맞지 않을 때 어떤 식으로 의식적으로 조율하면 좋은지, 그 실질적인 방법까지 함께 살펴볼 수 있다는 점이 포인트다.",
        "impact": 7
      },
      {
        "id": "SOMC-TIMING-001",
        "tier": "A",
        "name": "세운/대운 연애 타이밍 × J/P 관계 정의 속도 — 고백 전환점의 이중 결정",
        "tags": [
          "ss:재성",
          "ss:관성",
          "pillar:일지",
          "relation:육합",
          "uses:daewoon",
          "uses:sewoon",
          "sinsal:도화",
          "axis:JP",
          "intensity:88"
        ],
        "saju": "세운·대운의 재성(남)/관성(여) 진입 + 일지 육합 + 도화살 발동 (SJ_findLoveTiming, DW_SIPSUNG_KW, SJ_getDohwa)",
        "mbti": ": J/P 축 + 강도 (55/68/88)",
        "cross": "사주만 보면 '올해 연애 인연이 열린다'는 것만 알 수 있고, MBTI만 보면 'J 성향은 관계를 빨리 정의하고 P 성향은 천천히 간다'는 것만 알 수 있다. 두 가지를 함께 보면 훨씬 구체적인 시나리오가 나온다. 올해 인연이 열리는 시기에, J-J 쌍이라면 3개월 안에 사귀게 될 가능성이 높고, P-P 쌍이라면 그 해를 넘길 수도 있으며, J-P 쌍이라면 J가 먼저 주도하되 P의 유보적 태도가 긴장감을 만드는 구조가 된다.",
        "impact": 8
      },
      {
        "id": "SOMC-TIMING-005",
        "tier": "A",
        "name": "5년 타이밍 최적해(bestYear) × 쌍방 J/P·E/I — 최적 시기의 실행 시나리오",
        "tags": [
          "uses:sewoon",
          "uses:gunghap",
          "axis:EI",
          "axis:JP"
        ],
        "saju": "analyzeGunghap 레이어18 — 5년 타이밍(timing5.bestYear) + 해당 연도 세운 간지·십성",
        "mbti": ": 쌍방의 J/P × E/I 조합 + 강도",
        "cross": "사주 궁합만 보면 '2026년이 최고의 해'라는 것만 알 수 있고, MBTI만 보면 'EJ 성향은 적극적이고 IP 성향은 소극적이다'는 것만 알 수 있다. 두 가지를 함께 보면 실행 가능한 시나리오가 나온다. 2026년이 최고의 해인데 두 사람 모두 IP 성향이라면, 그 해에 공통 친구의 소개나 함께 참여할 수 있는 이벤트처럼 외부에서 만남의 계기를 의식적으로 만들어야 한다는 구체적인 방향이 보인다.",
        "impact": 6
      },
      {
        "id": "SOMC-TIMING-002",
        "tier": "B",
        "name": "대운 동기화 위상 × 인지기능 발달 단계 동기화 — 관계 성립의 구조적 전제 조건",
        "tags": [
          "dm:기",
          "unsung:태",
          "uses:daewoon",
          "uses:gunghap",
          "uses:development",
          "uses:sipsung_rel",
          "uses:dominant",
          "uses:auxiliary"
        ],
        "saju": "대운 동기화 상태 (analyzeGunghap L5 — 동반 상승기/한쪽 견인/함께 인내) + 현재 대운 십성 (DW_SIPSUNG_KW)",
        "mbti": ": 인지기능 발달 단계 (주기능 안정기/부기능 발달기/3차 탐색기)",
        "cross": "끌림의 맥락에서 '함께 성장하는 느낌'을 다루는 것과 달리, 여기서는 관계가 실제로 성립하기 위한 구조적 조건을 살펴본다. 끌림이 있어도 두 사람의 인생 흐름이 엇갈리면 사귀기 어렵고, 반대로 끌림이 약해도 두 사람의 흐름이 비슷한 방향으로 맞아떨어지면 자연스럽게 관계가 형성될 수 있다는 새로운 시각이다.",
        "impact": 7
      },
      {
        "id": "SOMC-TIMING-003",
        "tier": "S",
        "name": "교운기 임박 × E/I 전달 채널 — 전환기 인연의 포착 vs 상실",
        "tags": [
          "uses:daewoon",
          "condition:교운기",
          "axis:EI",
          "intensity:88"
        ],
        "saju": "교운기 임박 여부 (SJ_findGyowoongi — 현재 나이 ±2세 이내) + 대운 전환 방향 (SJ_TRANSITION)",
        "mbti": ": E/I 축 + 강도 (55/68/88)",
        "cross": "사주만 보면 '인생의 큰 흐름이 바뀌는 시기에 전환이 온다'는 것만 알 수 있고, MBTI만 보면 'E 성향은 외향적이고 I 성향은 내향적이다'는 것만 알 수 있다. 두 가지를 함께 보면 실전 타이밍 전술이 나온다. 흐름이 바뀌는 시기에 E 성향은 새로운 인연을 적극적으로 만나 관계가 성립하지만, I 성향은 같은 시기에 내면을 정리하는 데 집중하느라 인연이 와도 알아채지 못할 수 있다. 그래서 I 성향인 상대의 전환기에는 천천히, 반복적으로 존재감을 드러내는 전략이 필요하다.",
        "impact": 7
      },
      {
        "id": "SOMC-TIMING-006",
        "tier": "S",
        "name": "Fi-Te 축 시소 × 사주 타이밍 — 가치 확인 vs 실행 속도의 구조적 시간차",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "relation:육합",
          "uses:daewoon",
          "uses:sewoon",
          "sinsal:도화",
          "cf:Fi",
          "cf:Te",
          "uses:dominant",
          "ref:MT_DECISION",
          "ref:MT_AXES"
        ],
        "saju": "세운·대운 연애 타이밍 열림 (SJ_findLoveTiming, 도화살 발동, 일지 육합)",
        "mbti": ": Fi-Te 축 위치 (MT_AXES['Fi-Te']) — Fi 주기능자(INFP/ISFP) vs Te 주기능자(ENTJ/ESTJ) + MT_DECISION_PROCESS[type].flow",
        "cross": "계획적·유연한 성향의 차이가 관계 정의의 속도를 결정한다면, 가치 우선 성향과 실행 우선 성향의 차이는 관계 정의의 내용에서 시간차를 만든다. 사주 타이밍이 같은 시점에 열려도, 가치를 먼저 확인하는 사람은 '마음은 정해졌는데 말을 못 하는' 상태이고, 실행을 먼저 움직이는 사람은 '말은 했는데 감정은 나중에 따라오는' 상태다. 이 비대칭은 계획·유연 축만으로는 포착할 수 없다.",
        "impact": 6
      }
    ],
    "상대 눈에 비친 나": [
      {
        "id": "SOMC-GAZE-005",
        "tier": "A",
        "name": "A의 특수 신살(도화살/화개살/천을귀인 궁위별) × B의 지각 주기능(Se/Si/Ne/Ni) — 매력 수신 방식의 분화",
        "tags": [
          "sinsal:도화",
          "sinsal:화개",
          "sinsal:천을귀인",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "uses:dominant",
          "uses:auxiliary"
        ],
        "saju": "A의 특수 신살 — 도화살(SJ_getDohwa/SJ_DOHWA_GUNGWI, 궁위별), 화개살(SJ_getHwagae/SJ_HWAGAE_GUNGWI), 천을귀인(getSpecialSinsal), 홍염살(calcExtraSinsal) 유무 및 궁위",
        "mbti": ": B의 지각 축 주기능 또는 부기능 중 상위 지각 기능 (Se/Si/Ne/Ni) — MT_FUNCTIONS[해당기능].coreProcess",
        "cross": "매력 에너지만 보면 A에게 매력 에너지가 있다는 사실만 알 수 있고, B가 그것을 어떻게 체험하는지는 알 수 없다. B의 인식 성향만 보면 일반적인 인식 방식만 알 수 있고, A의 구체적인 매력에 대한 반응은 알 수 없다. 두 가지를 함께 보면 'B가 A의 매력을 감각적으로, 익숙함으로, 가능성으로, 직감으로 중 어떤 채널로 받아들이는가'가 결정된다. A 자신의 매혹 발산 방식을 다루는 패턴이 있다면, 이 패턴은 수신자 B의 지각 방식에 초점을 맞춘다.",
        "impact": 6
      },
      {
        "id": "SOMC-GAZE-001",
        "tier": "A",
        "name": "B→A 십성 인식 × B의 인지기능 주기능 — 상대 렌즈에 비친 나의 모습",
        "tags": [
          "ss:겁재",
          "ss:비견",
          "ss:식신",
          "ss:상관",
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "ss:편인",
          "ss:정인",
          "uses:sipsung_rel",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "uses:dominant"
        ],
        "saju": "B→A 십성 (getSipsung(rB.dg, rA.dg)) — 비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인",
        "mbti": ": B의 인지기능 주기능 (MT_TYPES[B타입].stack[0]) — Se/Si/Ne/Ni/Te/Ti/Fe/Fi",
        "cross": "사주의 에너지 성격만으로는 '어떤 에너지 유형인가'만 알 수 있고, 상대가 그것을 어떤 방식으로 받아들이는지는 알 수 없다. MBTI의 가장 강한 성향만으로는 일반적인 인식 패턴만 알 수 있고, 특정 에너지에 대한 반응은 알 수 없다. 두 체계를 교차해야 '상대가 나를 구체적으로 어떻게 인식하는가'가 결정된다. 에너지 성격이 인식의 내용을, 가장 강한 성향이 인식의 방식을 결정하는 구조다.",
        "impact": 9
      },
      {
        "id": "SOMC-GAZE-002",
        "tier": "A",
        "name": "A의 년간 오행(첫인상) × A의 E/I — 첫인상과 실제 접근 방식의 역전",
        "tags": [
          "pillar:년주",
          "uses:mulsang",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "A의 년간 오행 (OHAENG_TGAN[rA.yg]) — 목/화/토/금/수 + 년간 물상 (MULSANG_GAN[TGAN_KR[rA.yg]])",
        "mbti": ": A의 E/I 축 + 선호 강도 (MT_INTENSITY_PROFILES 기준 55/68/88)",
        "cross": "첫인상의 에너지 유형만 보면 어떤 느낌을 주는지만 알 수 있고, 실제 행동 패턴은 알 수 없다. E/I 성향만 보면 일반적인 사교 방식만 알 수 있고, B가 A에게 기대하는 첫인상과 실제 사이의 간극은 알 수 없다. 두 가지를 함께 봐야 썸 초기에 자주 일어나는 '첫인상 역전' 경험이 설명된다.",
        "impact": 7
      },
      {
        "id": "SOMC-GAZE-003",
        "tier": "B",
        "name": "A의 월간 십성(사회적 페르소나) × A의 MBTI 부기능 — '직장/모임에서 보여주는 나'의 이중 페르소나",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:auxiliary"
        ],
        "saju": "A의 월간 십성 (saju.ss[1].ss) + SSP[해당십성].월주 해석 + SIPSUNG_GUNGWI_KW[해당십성].month",
        "mbti": ": A의 부기능 (MT_TYPES[A타입].stack[1]) + MT_STACK_POSITIONS.auxiliary 역할",
        "cross": "사회적 자리의 에너지 방향만 보면 어떤 역할을 지향하는지만 알 수 있고 구체적인 표현 방식은 알 수 없다. 의식적으로 즐겨 쓰는 성향만 보면 사주의 사회적 역할과 일관성이 있는지 없는지는 알 수 없다. 두 가지를 함께 보면 B가 A를 사회적 장면에서 '일관되게 읽을 수 있는 사람'으로 보는지, '혼란스러운 사람'으로 보는지가 결정된다.",
        "impact": 6
      },
      {
        "id": "SOMC-GAZE-004",
        "tier": "S",
        "name": "A의 신강도 × B의 E/I — 존재감 볼륨 × 수신 감도 매트릭스",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "getStrengthGrade(ggA) — 극신강/신강/중화/신약/극신약 (selfStr/otherStr 비율)",
        "mbti": ": B의 E/I 축 + 선호 강도 (MT_INTENSITY_PROFILES 기준)",
        "cross": "A의 에너지 강도만 보면 존재감의 크기만 알 수 있고, B가 그것을 어떻게 받아들이는지는 알 수 없다. B의 E/I 성향만 보면 일반적인 에너지 수신 방식만 알 수 있고, A의 구체적인 존재감에 어떻게 반응하는지는 알 수 없다. 두 가지를 함께 봐야 'B가 A의 존재감을 압도적으로 느끼는지, 동등하게 느끼는지, 포근하게 느끼는지, 아니면 별 감흥이 없는지'가 결정된다.",
        "impact": 7
      }
    ],
    "싫어하는 타입": [
      {
        "id": "SOMC-HATE-002",
        "tier": "A",
        "name": "원진살 은근한 밀어냄 × 인지기능 축 어긋남 — 설명 불가능한 거부감",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "unsung:묘",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se"
        ],
        "saju": "원진살 관계 유무 (WONJIN 테이블 — 자미/축오/인유/묘신/진해/사술) + 궁위별 영향도 (일지 원진이면 최상)",
        "mbti": ": 인지기능 축 배치 불일치 (Te-Fi vs Ti-Fe, Se-Ni vs Si-Ne — 같은 영역이지만 방향이 다른 축 조합)",
        "cross": "사주의 이유 없는 밀어냄 에너지는 '설명하기 어려운 밀어냄'이라는 독특한 관계 역학을 제공하고, MBTI 성향 축의 불일치는 '같은 영역인데 방향이 다른 답답함'을 제공한다. 두 가지를 함께 보면 이 '이유 없는 거부감'의 실체가 두 겹으로 드러난다. 에너지적으로도 밀어내고 사고 방식으로도 어긋나므로, 둘 다 논리적인데 결론이 다르고 둘 다 감성적인데 감동받는 포인트가 다르다. 사주만 보면 '에너지가 안 맞아'이고, MBTI만 보면 '성향이 달라서 안 맞아'인데, 두 가지를 함께 보면 '이 사람이 구체적으로 어떤 순간에 밀어내는 느낌을 받는가'가 특정된다.",
        "impact": 7
      },
      {
        "id": "SOMC-HATE-001",
        "tier": "A",
        "name": "과잉 오행 과부하 × 열등기능 자극 — 본능적 거부 반응",
        "tags": [
          "condition:excess",
          "unsung:사",
          "uses:inferior",
          "stress:grip"
        ],
        "saju": "사주 과잉 오행 (elFull 기준 3.0 이상인 오행) + OHENG_KW[해당 오행].excess 키워드",
        "mbti": ": MT_STACK_POSITIONS.inferior(열등기능) + MT_STRESS_STAGES.stage4_grip 패턴",
        "cross": "부족한 에너지 방향의 회피가 '나에게 흐름을 방해하는 에너지를 피하는 것'이라면, 이 패턴은 넘치는 에너지 방향의 포화 거부다. 두 체계가 같은 방향을 가리킬 때 거부 강도가 극대화된다는 것이 핵심이다. 사주만 보면 '특정 에너지가 과다하면 그 에너지를 가진 상대가 불편하다'까지만 말할 수 있고, MBTI만 보면 '가장 약한 성향을 자극하면 불편하다'까지만 말할 수 있지만, 두 가지를 함께 보면 '어떤 구체적인 행동이 이 사람을 폭발시키는가'가 특정된다.",
        "impact": 8
      },
      {
        "id": "SOMC-HATE-003",
        "tier": "S",
        "name": "겁재·양인살 영역 방어 × T/F 판단축 — 침범 거부의 질감 분화",
        "tags": [
          "condition:excess",
          "ss:비겁",
          "ss:겁재",
          "unsung:사",
          "unsung:양",
          "sinsal:양인",
          "axis:TF",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "겁재 과다 여부 (gg.cnt 비겁 ≥ 2.0 + 개별 겁재 ≥ 1) 또는 양인살 유무 (calcExtraSinsal 중 양인살)",
        "mbti": ": T/F 축 (사고형/감정형) + 선호 강도 (MT_INTENSITY_PROFILES의 55/68/88 기준)",
        "cross": "사주만으로는 경쟁·승부 에너지 과다가 '소유욕과 경쟁심이 강한 사람'이라는 것만 알려주고, 어떤 영역의 침범이 가장 민감한지는 말해주지 못한다. MBTI만으로는 논리 중심·감정 중심의 판단 방식 차이만 알려준다. 두 가지를 함께 보면 '이 사람의 영역 방어가 논리 영역인지 감정 영역인지'가 특정되고, 그 성향의 강도에 따라 '참을 수 있는 불편인지 폭발적인 거부인지'가 결정된다. 경쟁·승부 에너지가 강하고 논리 중심 성향이 매우 강하면 '자기 결정을 뒤집는 사람에게 칼같이 돌아서는' 패턴이 되고, 경쟁·승부 에너지가 강해도 감정 중심 성향이 중간 정도이면 '가치관을 무시당하면 서운해하지만 참는' 패턴이 된다.",
        "impact": 7
      }
    ],
    "어떤 커플": [
      {
        "id": "SOMC-COUPLE-001",
        "tier": "A",
        "name": "배우자궁 기대 교차 × E/I·T/F 소통 채널 — 사귀면 드러나는 돌봄/기대의 쌍방향 질감",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "axis:EI",
          "axis:TF",
          "uses:intensity"
        ],
        "saju": "쌍방 배우자궁 십성 교차 (jiSS[2].ss) — A의 일지 정기 십성이 B에 대한 기대를, B의 일지 정기 십성이 A에 대한 기대를 형성",
        "mbti": ": 쌍방 E/I × T/F 조합 (MT_INTENSITY_PROFILES 기준 55/68/88 강도)",
        "cross": "끌림 단계의 구조를 다루는 패턴이 있다면, 이 패턴은 사귄 후 일상에서 '기대 충족과 좌절'이 반복되는 역학을 다룬다. 본인 자리의 에너지 성격만 보면 '안정을 추구하는 에너지=안정 추구'라는 일반론에 머물고, MBTI만 보면 소통 스타일만 나온다. 두 가지를 함께 보면 '안정을 기대하는 사람 + 조용히 헌신하는 상대 = 기대 충족'이 되거나, '안정을 기대하는 사람 + 적극적이지만 감성이 부족한 상대 = 불만 누적'이 되는 것처럼, 구체적인 커플 역학이 드러난다.",
        "impact": 8
      },
      {
        "id": "SOMC-COUPLE-004",
        "tier": "A",
        "name": "대운 성장 방향 쌍 × J/P 쌍 — 커플의 성장 동기화/비동기화 체감 강도",
        "tags": [
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "uses:daewoon",
          "axis:JP",
          "uses:intensity"
        ],
        "saju": "쌍방 현재 대운의 십성 방향 쌍 — 둘 다 재성 대운이면 동방향 성장, 한쪽 관성(시련)+한쪽 식상(자유)이면 역방향 성장",
        "mbti": ": J/P 쌍 (MT_INTENSITY_PROFILES J/P 55/68/88 강도) — 성장 방향이 엇갈릴 때 이것을 어떻게 체감하고 처리하는가",
        "cross": "성장 동기화의 끌림과 달리, 이 패턴은 성장 방향이 엇갈릴 때 그것을 얼마나 불편하게 느끼는가를 다룬다. 사주의 인생 흐름 방향이 '어느 쪽으로 성장하는가'를 결정하고, J/P 성향 조합이 '그 엇갈림을 얼마나 불편하게 느끼는가'를 결정한다. 사주만 보면 성장 방향의 객관적 차이만 보이고, MBTI만 보면 계획 불일치의 주관적 불편함만 보이지만, 두 가지를 함께 보면 역설적인 조합이 드러난다. 객관적으로는 같은 방향인데 J/P 차이 때문에 체감이 완전히 다른 경우, 또는 객관적으로는 방향이 다른데 둘 다 P 성향이라 그 차이를 별로 못 느끼는 경우가 그것이다.",
        "impact": 6
      },
      {
        "id": "SOMC-COUPLE-002",
        "tier": "A",
        "name": "신강도 쌍 × 상호작용 스타일·J/P 쌍 — 커플 주도-수용 구조의 일상적 고착",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "axis:JP",
          "intensity:88",
          "uses:intensity",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "쌍방 신강도 쌍 (극신강/신강/중화/신약/극신약 × 극신강/신강/중화/신약/극신약) — 관계 안에서의 에너지 주도권 원형",
        "mbti": ": 쌍방 상호작용 스타일 (MT_INTERACTION_STYLES: in-charge / chart-the-course / get-things-going / behind-the-scenes) + J/P 쌍 (MT_INTENSITY_PROFILES J/P 55/68/88 강도)",
        "cross": "썸 단계에서 '누가 먼저 다가가는가'가 관심사였다면, 이 분석은 관계가 안정된 후 '누가 결정하고 누가 따르는가'의 일상적 역학을 다룬다. 사주의 에너지 강도가 '원형적 주도력'을, MBTI의 상호작용 스타일이 '구체적인 소통 방식'을, 계획성 성향(J/P)이 '계획 영역의 주도권'을 각각 결정하여 세 가지 층위에서 역할이 나뉜다. 사주만 보면 에너지 크기만, MBTI만 보면 소통 방식만 알 수 있지만, 두 체계를 교차하면 '에너지는 강한데 소통은 뒤에서 조율하는 사람'이라는 역설적인 커플 역학이 드러난다.",
        "impact": 7
      },
      {
        "id": "SOMC-COUPLE-006",
        "tier": "B",
        "name": "커플 오행 합산 완전성 × 인지기능 스택 커버율 — 기능적 완전성의 이중 측정",
        "tags": [
          "unsung:사",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "uses:dominant",
          "uses:tertiary",
          "ref:MT_RELATION"
        ],
        "saju": "두 사주의 elFull(지장간 포함 오행 분포)을 합산한 5행 균등도 — 합산 후 0인 오행이 있으면 '커플 단위 맹점', 5행이 고루 분포(각 2.0 이상)하면 '기능적 완전성'",
        "mbti": ": 두 MBTI 유형의 인지기능 스택(MT_TYPES[A].stack[0~3] + MT_TYPES[B].stack[0~3])이 8개 인지기능(Ne/Ni/Se/Si/Te/Ti/Fe/Fi) 중 주기능~3차기능 수준으로 커버하는 개수 — MT_RELATION_TYPES.dual의 '서로의 약점을 자연스럽게 보완'하는 구조",
        "cross": "서로의 부족한 점을 채워주는 끌림이 있고, 그 보완이 장기적으로 의존으로 변질될 위험도 있다. 이 분석은 그 두 가지와는 완전히 다른 질문을 던진다. '서로 보완한 후에도 커플 단위로 여전히 채워지지 않는 부분이 있는가?' 개인 수준에서는 서로 잘 채워주더라도, 커플 단위에서는 두 사람 모두 놓치는 공통 맹점이 존재할 수 있다. 사주의 여러 에너지 영역과 MBTI의 여러 가지 성향이 독립적으로 '전체를 얼마나 커버하는가'라는 동일한 질문을 던지는 구조적 교차다.",
        "impact": 6
      },
      {
        "id": "SOMC-COUPLE-003",
        "tier": "S",
        "name": "오행 보완 의존화 × 인지기능 열등기능 의존화 — 보완이 의존으로 전환되는 이중 구조",
        "tags": [
          "dm:기",
          "condition:excess",
          "condition:lack",
          "uses:development",
          "uses:dominant",
          "uses:inferior",
          "ref:MT_AXES"
        ],
        "saju": "A의 부족 오행이 B의 과다 오행과 정합하는 보완 구조 — 장기화 시 A가 B 없이 해당 에너지를 발현하지 못하는 의존 구조화",
        "mbti": ": A의 열등기능(MT_TYPES[A].stack[3])이 B의 주기능(MT_TYPES[B].stack[0])과 같은 축일 때 — B가 A의 열등기능을 대신 수행하여 A의 열등기능 발달이 정체되는 구조 (MT_AXES 시소 역학 + MT_DEVELOPMENT_STAGES의 35~50세 열등기능 대면 시기)",
        "cross": "서로의 부족한 점이 끌림을 만든다면, 이 분석은 그 보완이 시간이 지나면서 의존으로 바뀌는 위험을 다룬다. 사주의 에너지 보완이 에너지 차원의 의존을, MBTI에서 약한 성향을 상대가 대신 채워주는 것이 심리적 성장 차원의 의존을 각각 만드는데, 두 방향이 같으면 의존이 두 겹으로 강화된다. 사주만 보면 에너지 의존만, MBTI만 보면 약한 성향의 미발달만 보이지만, 두 체계를 교차하면 '에너지도 부족하고 그 성향도 약한 영역을 상대가 전부 커버해주는' 완전한 의존 구조가 드러난다. 이것은 관계가 개인의 심리적 성장 과정을 대체해버리는 위험이다.",
        "impact": 7
      },
      {
        "id": "SOMC-COUPLE-005",
        "tier": "S",
        "name": "쌍방 갈등 스타일 교차 × 사주 마찰 에너지 방향 — '싸울 때 어떤 커플인가'",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "unsung:사",
          "relation:충",
          "ref:MT_CONFLICT"
        ],
        "saju": "지지 충·형·해·원진의 주요 마찰 궁위 — 어떤 영역(일지=내밀/월지=사회적/시지=미래)에서 마찰 에너지가 발생하는가",
        "mbti": ": MT_CONFLICT_STYLES[A] × MT_CONFLICT_STYLES[B] — 쌍방의 갈등 촉발 조건(trigger), 싸움 방식(fightStyle), 필요한 것(needsFromOther), 맹점(blindSpot)의 교차",
        "cross": "같은 충돌이 성향에 따라 다른 상처를 만드는 구조가 있다면, 이 분석은 '갈등 스타일 쌍 전체의 역학'과 '마찰이 일어나는 자리가 특정하는 싸움의 영역'을 함께 본다. MBTI만으로는 두 유형의 싸움 방식을 알 수 있지만 '무엇을 두고 싸우는가'는 알 수 없다. 사주만으로는 갈등이 일어나는 영역을 알 수 있지만 '어떤 방식으로 싸우는가'는 알 수 없다. 두 체계를 교차하면 '내밀한 영역에서 참다가 폭발하면 가장 아픈 곳을 치는 구조'처럼 구체적인 커플 갈등 역학이 드러난다.",
        "impact": 7
      }
    ],
    "역효과 행동": [
      {
        "id": "SOMC-ANTI-003",
        "tier": "A",
        "name": "충·형·해 반복 궁위 × A의 E/I·T/F — 같은 지뢰를 반복 밟는 메커니즘",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:gunghap",
          "axis:EI",
          "axis:TF"
        ],
        "saju": "두 사람 사이 충·형·해가 걸린 궁위 (analyzeGunghap의 details.ji)",
        "mbti": ": A의 E/I × T/F 소통 방식",
        "cross": "사주가 '어디서 마찰이 나는지' 자리를 지목하고, MBTI가 '왜 같은 실수를 반복하는지' 메커니즘을 설명한다. 외향적이고 논리적인 성향은 직접 부딪혀 상처를 키우고, 내향적이고 감정적인 성향은 침묵으로 갈등을 쌓아간다. 두 체계를 결합하면 반복되는 역효과의 전체 경로, 즉 갈등이 터지는 위치, 그것을 밟는 방식, 반복되는 이유가 하나의 구조로 드러난다.",
        "impact": 7
      },
      {
        "id": "SOMC-ANTI-005",
        "tier": "A",
        "name": "B의 양인살/겁재 과다(영역 방어) × A의 E/I 접근 강도 — 영역 침범 지뢰의 강도 분화",
        "tags": [
          "condition:excess",
          "ss:비겁",
          "ss:겁재",
          "unsung:양",
          "sinsal:양인",
          "axis:EI",
          "intensity:88"
        ],
        "saju": "B의 양인살 유무 + 겁재 과다 여부 (calcExtraSinsal + gg.cnt['비겁'])",
        "mbti": ": A의 E/I 축 (+ 강도 55/68/88)",
        "cross": "사주로 강한 영역 방어 본능을 파악하고, MBTI로 A의 접근 강도를 파악한다. 두 가지를 함께 볼 때의 핵심은 외향적 접근과 내향적 접근이 그 방어 본능을 건드리는 방식이 질적으로 다르다는 점이다. 외향적 성향은 직접 충돌하는 방식으로 건드리고, 내향적 성향은 어디가 민감한지 모른 채 돌아다니다 간접적으로 의심을 사는 방식으로 건드린다. 어느 한 쪽만 봐서는 이 미세한 접근 강도 조절이 불가능하다.",
        "impact": 6
      },
      {
        "id": "SOMC-ANTI-001",
        "tier": "A",
        "name": "기신 오행 × 열등기능 — 이중 지뢰 구조",
        "tags": [
          "uses:yongshin",
          "uses:osin",
          "uses:inferior"
        ],
        "saju": "B의 5신 중 기신 오행 (SJ_calcOsinChegye → gisin)",
        "mbti": ": B의 열등기능 (4번째 인지기능)",
        "cross": "사주만으로는 나에게 맞지 않는 에너지가 자극될 때 불쾌한 반응을 예측하고, MBTI만으로는 가장 취약한 성향이 자극될 때 방어적으로 움츠러드는 반응을 예측한다. 두 체계를 교차했을 때 두 민감 지점이 같은 방향이면 폭발력이 극대화되고, 다른 방향이면 피해야 할 영역 자체가 넓어진다. 이 두 민감 지점을 함께 파악하는 것은 어느 한 체계만으로는 알 수 없는 교차만의 고유한 가치다.",
        "impact": 8
      },
      {
        "id": "SOMC-ANTI-006",
        "tier": "S",
        "name": "B의 대운/세운 기신 진입 × B의 MBTI 그립 활성화 — '시기가 나쁘면 뭘 해도 역효과'",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:osin",
          "uses:inferior"
        ],
        "saju": "B의 현재 대운/세운 5신 판별 (SJ_getOsinLabel → 기신/구신)",
        "mbti": ": B의 그립 기능 활성화 패턴 (스트레스 시 열등기능 폭주)",
        "cross": "사주만으로는 나에게 맞지 않는 에너지가 강해지는 시기를 예측하고, MBTI만으로는 스트레스 상황에서 무너지는 패턴을 예측한다. 두 체계를 교차할 때의 고유한 가치는 시간축(사주)과 심리 메커니즘(MBTI)의 결합이다. 맞지 않는 에너지가 강해지는 시기에 심리적으로도 한계에 몰린 상태가 동시에 겹치면 상대의 방어막이 이중으로 올라가므로, 평소라면 괜찮았을 행동도 역효과가 되는 시기적 구조가 드러난다. 시기와 메커니즘의 결합은 어느 한 체계만으로는 불가능하다.",
        "impact": 7
      },
      {
        "id": "SOMC-ANTI-002",
        "tier": "S",
        "name": "A의 과잉 오행 습관 × B의 인지기능 그립 방향 — '나의 평소가 너에겐 독'",
        "tags": [
          "uses:inferior"
        ],
        "saju": "A의 과잉 오행 (elFull에서 3.0 이상인 오행)",
        "mbti": ": B의 그립 기능 (스트레스 시 퇴행하는 열등기능 방향)",
        "cross": "사주로 A의 반복적인 행동 패턴을 파악하고, MBTI로 B의 스트레스 취약점을 파악할 수 있다. 두 가지를 함께 볼 때의 핵심은 A의 자연스러운 행동이 B의 가장 약한 지점을 건드리는 경로를 발견하는 것이다. 이것은 어느 한 쪽의 잘못이 아니라 두 사람 사이에 존재하는 구조적 역효과이며, 어느 한 쪽만 봐서는 이 관계 특유의 갈등 경로를 짚어낼 수 없다.",
        "impact": 8
      },
      {
        "id": "SOMC-ANTI-004",
        "tier": "S",
        "name": "B의 배우자궁 기대 방향 × A의 MBTI 기질 — '기대를 정면 배반하는 존재'",
        "tags": [
          "pillar:일지"
        ],
        "saju": "B의 배우자궁(일지) 정기 십성 (jiSS[2].ss)",
        "mbti": ": A의 MBTI 기질 (SJ/SP/NF/NT)",
        "cross": "사주로 B가 연인에게 기대하는 것을 읽고, MBTI로 A의 자연스러운 행동 기질을 파악한다. 두 가지를 함께 볼 때의 핵심은 A의 기본값과 B의 기대값 사이의 구조적 불일치를 발견하는 것이다. A가 잘못한 것이 아니라, 두 체계가 가리키는 방향이 교차하면서 생기는 관계 특유의 역효과다. 어느 한 쪽만 봐서는 '왜 이 사람에게만 역효과인가'를 설명할 수 없다.",
        "impact": 7
      }
    ],
    "연애 스타일": [
      {
        "id": "SOMC-LOVE-004",
        "tier": "A",
        "name": "홍염살 × 인지기능 주기능 — 매혹 질감 분화",
        "tags": [
          "uses:dominant"
        ],
        "saju": "홍염살 유무 (calcExtraSinsal 중 홍염살, HONGYEOM 테이블)",
        "mbti": ": 인지기능 주기능 (MT_FUNCTIONS 8종 중 stack[0])",
        "cross": "매력 에너지만으로는 '뜨거운 매력이 있다'는 정보만 제공한다. MBTI 성향만으로는 인식과 판단 방식만 제공한다. 두 체계를 교차하면 '뜨거운 매력의 구체적인 질감'이 결정된다. 같은 매력 에너지라도 감각 중심 성향이면 육체적 매력으로, 직관 중심 성향이면 신비로운 매력으로, 감정 공감 성향이면 정서적 매력으로, 논리 분석 성향이면 지적 매력으로 완전히 다른 방식의 매혹이 된다. 썸 상대의 '어떤 점이 끌리는가'를 구체적으로 설명할 수 있는 유일한 교차다.",
        "impact": 6
      },
      {
        "id": "SOMC-LOVE-002",
        "tier": "A",
        "name": "도화살 궁위 × E/I 매력 발산 채널",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "sinsal:도화",
          "axis:EI"
        ],
        "saju": "도화살 유무 및 궁위 (SJ_getDohwa, SJ_DOHWA_GUNGWI — 년지/월지/일지/시지)",
        "mbti": ": E/I 축 (외향/내향)",
        "cross": "매력 에너지만으로는 '매력이 있다, 어느 영역에서 발산된다'까지만 알 수 있다. 내향/외향 성향만으로는 에너지 방향만 알 수 있다. 두 체계를 교차하면 '이 사람의 매력이 적극적으로 표출되는가, 은근히 스며드는가'가 결정된다. 사주에서 매력 에너지가 강하고 내향적인 사람은, 사주만 보면 '매력적인 사람'이고 MBTI만 보면 '조용한 사람'이라 모순처럼 보이지만, 실제로는 '조용한데 묘하게 끌리는 사람'이라는 독특한 패턴이 된다.",
        "impact": 7
      },
      {
        "id": "SOMC-LOVE-006",
        "tier": "A",
        "name": "배우자궁 십성 간 교차 × 인지기능 축 조화도 — 쌍방향 끌림 구조",
        "tags": [
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "uses:sipsung_rel"
        ],
        "saju": "A→B 십성 + B→A 십성 (getSipsung 교차) + 성별맥락(정재/정관/편재/편관)",
        "mbti": ": 인지기능 1-2번 축의 상보성 (같은 축 반대 방향 여부)",
        "cross": "에너지 성격의 교차만으로는 에너지 역학적 끌림만 알고, 성향의 상호 보완성만으로는 인식과 판단 차원의 끌림만 알고, 에너지 역학적 구조는 알 수 없다. 두 체계를 교차하면 '에너지적으로도 성향적으로도 끌리는 쌍방향 구조'인지, '한 차원에서만 끌리는 일방적 구조'인지를 구별할 수 있다. 에너지 성격도 좋고 성향도 서로 보완적이면 가장 강한 궁합이고, 에너지 성격은 좋은데 성향이 비슷하면 안정적이지만 다소 밋밋한 궁합이 된다.",
        "impact": 8
      },
      {
        "id": "SOMC-LOVE-005",
        "tier": "S",
        "name": "일간 오행 상생/상극 × E/I — 썸 접근 전략",
        "tags": [
          "unsung:사",
          "unsung:양",
          "axis:EI"
        ],
        "saju": "두 사람 일간 오행 관계 (상생/상극/비화 — OH_SANG/OH_GEUK 비교)",
        "mbti": ": E/I 축 (외향/내향) — 양쪽 모두",
        "cross": "에너지의 흐름과 충돌 방향만 보면 어떤 에너지가 서로를 돕거나 누르는지만 알 수 있고, 그것이 행동으로 어떻게 나타나는지는 모른다. E/I 성향만 보면 에너지 방향만 알 수 있고, 왜 그런 방향인지의 구조적 이유는 모른다. 두 가지를 함께 보면 '이 사람이 왜 이런 방식으로 다가오는가, 또는 왜 못 다가오는가'의 구조적 설명이 가능해진다. 특히 에너지적으로 상대를 압도하는 구조인데 본인이 내향적인 경우, 어느 체계만으로도 설명하기 어려운 '끌리는데 무서워서 피하는' 패턴이 나타난다.",
        "impact": 7
      },
      {
        "id": "SOMC-LOVE-001",
        "tier": "S",
        "name": "배우자궁 십성 × T/F 사랑 언어 분화",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "uses:sipsung_rel",
          "axis:TF"
        ],
        "saju": "배우자궁 십성 (일지 정기 십성 — SS_CONTEXT[x].spouse, jiSS[2].ss)",
        "mbti": ": T/F 축 (사고형/감정형)",
        "cross": "사주만으로는 '어떤 에너지에 끌리는가'까지만 알 수 있고, 그 끌림이 감정적 채널로 작동하는지 논리적 채널로 작동하는지는 구별할 수 없다. MBTI만으로는 감정 중심인지 논리 중심인지의 일반적인 판단 양식만 알 수 있고, 연애에서 구체적으로 어떤 에너지에 끌리는지는 알 수 없다. 두 체계를 교차하면 '강한 상대에게 끌리는데, 그 강함을 따뜻한 감정으로 확인하려 한다'는 패턴과 '능력과 성과로 확인하려 한다'는 패턴으로 분화된다.",
        "impact": 8
      },
      {
        "id": "SOMC-LOVE-003",
        "tier": "S",
        "name": "일지 12운성(spouse) × J/P 연애 리듬 역설",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:건록",
          "unsung:제왕",
          "unsung:관대",
          "unsung:장생",
          "unsung:목욕",
          "unsung:사",
          "unsung:묘",
          "unsung:절",
          "unsung:태",
          "unsung:양",
          "unsung:쇠",
          "unsung:병",
          "axis:JP"
        ],
        "saju": "일지 12운성 (SJ_UNSUNG_MEANING[x].spouse — 장생/목욕/관대/건록/제왕/쇠/병/사/묘/절/태/양)",
        "mbti": ": J/P 축 (계획형/유연형)",
        "cross": "배우자 자리의 에너지 성격만으로는 '어떤 에너지의 배우자를 원하는가'까지 알 수 있고, 계획성 성향(J/P)만으로는 생활양식만 알 수 있다. 두 체계를 교차하면 '원하는 관계 에너지'와 '그것을 운영하는 방식' 사이의 조화 또는 역설이 드러난다. 변화와 자유를 원하는 배우자 자리를 가졌지만 계획적인 성향인 사람은, 사주만 보면 '변화를 즐기는 연애'이고 MBTI만 보면 '계획적인 사람'이라 따로 보면 모순처럼 보이지만, 합치면 '계획적으로 변화를 추구하는 모순적인 연인'이라는 독특한 패턴이 된다.",
        "impact": 7
      }
    ],
    "이 사람의 성격": [
      {
        "id": "SOMC-PERSONALITY-002",
        "tier": "A",
        "name": "신강도 볼륨 × 판단축 스타일",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "unsung:사",
          "axis:TF"
        ],
        "saju": "getStrengthGrade 신강등급 (극신강/신강/중화/신약/극신약)",
        "mbti": ": T/F 축 (사고/감정)",
        "cross": "에너지 강도만 보면 총량과 방향만 보이고, 논리/감정 판단 성향만 보면 판단 기준만 보인다. 두 가지를 함께 보면 '어떤 힘으로 어떤 방식으로 밀어붙이는가'가 구체화된다. 에너지가 강하고 논리 판단 성향인 사람이 갈등 상황에서 보이는 패턴과, 에너지가 강하고 감정 판단 성향인 사람의 패턴은 질적으로 다르다. 전자는 논리로 제압하고 후자는 감정으로 압도한다. 이 차이는 썸 관계에서 상대의 갈등 대응 방식을 예측하는 데 핵심이 된다.",
        "impact": 8
      },
      {
        "id": "SOMC-PERSONALITY-003",
        "tier": "A",
        "name": "격국 역할 × 인식 스타일 분화",
        "tags": [
          "gyeokguk:식신격",
          "gyeokguk:상관격",
          "gyeokguk:편재격",
          "gyeokguk:정재격",
          "gyeokguk:편관격",
          "gyeokguk:정관격",
          "gyeokguk:편인격",
          "gyeokguk:정인격",
          "gyeokguk:양인격",
          "gyeokguk:건록격",
          "ss:식신",
          "ss:상관",
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "ss:편인",
          "ss:정인",
          "unsung:건록",
          "unsung:양",
          "axis:SN"
        ],
        "saju": "analyzeGyeokguk 격국유형 (식신격/상관격/편재격/정재격/편관격/정관격/편인격/정인격/건록격/양인격)",
        "mbti": ": S/N 축 (감각/직관)",
        "cross": "에너지 구조만으로는 '어떤 역할'인지만 보이고, 감각/직관 성향만으로는 '정보를 어떻게 받아들이는가'만 보인다. 두 체계를 교차하면 '어떤 역할을 어떤 방식으로 수행하는가'가 구체화된다. 같은 창의적 표현 에너지 구조라도 감각 중심이면 요리사나 장인이 될 수 있고, 직관 중심이면 콘텐츠 크리에이터나 기획자가 될 수 있다. 이 분석은 썸 상대의 직업적 지향과 대화 스타일을 동시에 예측하게 해준다.",
        "impact": 7
      },
      {
        "id": "SOMC-PERSONALITY-011",
        "tier": "A",
        "name": "일주 그림자 × MBTI 그립 이중폭발",
        "tags": [
          "uses:ilju",
          "uses:inferior",
          "stress:grip",
          "uses:shadow"
        ],
        "saju": "ILJU_KW[일주].shadow — 60일주별 억압된 성향",
        "mbti": ": MT_STRESS_STAGES.stage4_grip — 열등기능 폭주 패턴",
        "cross": "사주의 억압된 성향은 나 자신의 고유한 숨겨진 어두운 면이고, MBTI의 한계 상황에서 나타나는 취약한 반응은 심리 구조의 약한 고리다. 두 체계의 취약점이 동시에 발동할 때 나타나는 패턴은 어느 한쪽만으로는 예측할 수 없다. 썸 상대의 '최악의 순간'을 이해할 수 있는 유일한 도구다.",
        "impact": 6
      },
      {
        "id": "SOMC-PERSONALITY-010",
        "tier": "A",
        "name": "십성 에너지 흐름 × 인지기능 축",
        "tags": [
          "ss:비겁",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "uses:dominant",
          "uses:auxiliary"
        ],
        "saju": "SJ_detectTongbyeon 통변 공식 (식상생재/살인상생/비겁탈재 등) + analyzeGyeokguk의 cnt(비겁/식상/재성/관성/인성 분포)",
        "mbti": ": MT_FUNCTIONS 8인지기능 중 주기능·부기능 조합",
        "cross": "에너지 구조가 역할의 방향이라면, 에너지 성격의 실제 분포는 에너지의 실제 흐름이다. MBTI의 성향은 정보를 처리하는 방식이다. 두 체계를 교차하면 '이 에너지 흐름이 이 성향적 방식으로 구현된다'는 가장 구체적인 행동 예측이 나온다.",
        "impact": 6
      },
      {
        "id": "SOMC-PERSONALITY-008",
        "tier": "A",
        "name": "인지기능 주기능 성격 × 일간 오행 에너지 질감",
        "tags": [
          "uses:dominant"
        ],
        "saju": "일간 오행 에너지 특성 (JEOKCHEONSU 십간론)",
        "mbti": ": MT_TYPES[].stack[0] 주기능 + MT_STACK_POSITIONS.dominant + MT_FUNCTIONS",
        "cross": "에너지의 방향 차이를 보는 분석이 있다면, 이 분석은 에너지의 '질감' 수준에서 MBTI의 가장 두드러진 성향과 사주 나 자신의 구조적 공명 또는 긴장을 본다. 내면 중심의 섬세한 감정 성향이 강한 추진 에너지와 만나면 어떤 사람이 되는가, 이것은 어느 체계 단독으로도 예측할 수 없는 교차만의 고유한 정보다.",
        "impact": 7
      },
      {
        "id": "SOMC-PERSONALITY-005",
        "tier": "B",
        "name": "조후 기질 온도 × MBTI 유형 강도",
        "tags": [
          "uses:johu",
          "uses:gaeun",
          "uses:intensity"
        ],
        "saju": "analyzeGyeokguk의 season/seasonName/johuDesc (조후론)",
        "mbti": ": MBTI 각 축의 선호 강도 (약한 선호 vs 확실한 선호)",
        "cross": "사주의 타고난 기질 온도만 보면 기질의 따뜻함과 차가움만 보이고, MBTI 성향의 강도만 보면 선호의 확실성만 보인다. 두 가지를 함께 보면 기질적 온도와 행동적 선명도의 조합이 나타난다. 뜨거운 기질에 뚜렷한 성향이라면 '타오르는 불꽃' 같은 사람이고, 차가운 기질에 흐릿한 성향이라면 '안개 속의 호수' 같은 사람이다. 이 조합은 썸에서 '이 사람이 어떤 속도로 마음을 드러내는가'를 예측하는 데 결정적이다.",
        "impact": 6
      },
      {
        "id": "SOMC-PERSONALITY-007",
        "tier": "B",
        "name": "일간 물상 이미지 × MBTI 기질 조합",
        "tags": [
          "uses:mulsang"
        ],
        "saju": "JEOKCHEONSU/MULSANG_GAN 일간 물상 (10종)",
        "mbti": ": MBTI 4글자 기질 유형",
        "cross": "사주의 상징 이미지만 보면 원형적인 이미지만 있고, MBTI만 보면 행동 유형만 있다. 두 가지를 함께 보면 이 사람을 한 문장으로 그릴 수 있는 생생한 캐릭터 이미지가 탄생한다. 썸 상대를 직관적으로 이해하게 해주는 가장 강력한 설명 도구다. 'ENFP입니다'보다 '모든 곳을 비추려는 태양 같은 ENFP입니다'가 훨씬 생생하게 와닿는다.",
        "impact": 7
      },
      {
        "id": "SOMC-PERSONALITY-001",
        "tier": "S",
        "name": "음양 볼륨 × 에너지 방향 괴리",
        "tags": [
          "unsung:양",
          "uses:yinyang",
          "axis:EI"
        ],
        "saju": "SJ_calcYinYang 음양밸런스 (양우세/음우세/균형)",
        "mbti": ": E/I 축 (외향/내향)",
        "cross": "사주의 활동적/수용적 에너지 경향만 보면 에너지가 적극적이다 또는 내향적이다는 경향만 보이고, MBTI의 E/I 성향만 보면 사교적으로 행동하는가만 보인다. 두 가지를 함께 보면 타고난 에너지 경향과 실제 행동 패턴의 일치 또는 불일치를 잡아낼 수 있다. 활동적 에너지가 우세한데 내향적인 사람은 혼자 있어도 에너지가 충만하지만 그것을 밖으로 드러내지 않는 것이고, 수용적 에너지가 우세한데 외향적인 사람은 사교적으로 행동하지만 속으로는 지쳐있을 수 있다. 이 불일치 정보는 어느 한 체계만으로는 포착되지 않는다.",
        "impact": 8
      },
      {
        "id": "SOMC-PERSONALITY-006",
        "tier": "S",
        "name": "겉(년간) vs 속(일간) 괴리 × 자기보고 편향",
        "tags": [
          "pillar:년주"
        ],
        "saju": "년간 오행 vs 일간 오행 (상극/상생/비화)",
        "mbti": ": MBTI 전체 유형 (자기보고 결과)",
        "cross": "사주를 보면 한 사람의 겉모습과 속마음이 얼마나 다른지 알 수 있고, MBTI를 보면 본인이 스스로를 어떻게 인식하는지 알 수 있다. 두 가지를 함께 보면 'MBTI 결과가 이 사람의 겉을 반영한 것인지, 속을 반영한 것인지'를 판별할 수 있다. 썸 상대가 보여주는 모습이 진짜인지 아닌지에 대한 구조적 답을 얻을 수 있다는 점이 핵심이다.",
        "impact": 9
      },
      {
        "id": "SOMC-PERSONALITY-004",
        "tier": "S",
        "name": "일지 운성 리듬 × 생활양식 구조",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:양",
          "axis:JP"
        ],
        "saju": "12운성(일지 기준) — UNSUNG_KW/SJ_UNSUNG_MEANING",
        "mbti": ": J/P 축 (계획/유연)",
        "cross": "에너지 생명주기만 보면 내면의 리듬만 알 수 있고, J/P만 보면 외부를 얼마나 계획적으로 다루는지만 알 수 있다. 두 가지를 함께 보면 내면의 리듬과 외부 행동 방식이 서로 맞는지 충돌하는지가 드러난다. 예를 들어 에너지가 변화를 원하는 상태인데 J 성향이라 계획을 세우려 하거나, 에너지가 독립적으로 강한 상태인데 P 성향이라 자유분방하게 행동하는 식의 복잡한 성격은 어느 한쪽만으로는 설명하기 어렵다.",
        "impact": 6
      },
      {
        "id": "SOMC-PERSONALITY-009",
        "tier": "S",
        "name": "스트레스 루프 패턴 × 신강도 표현 강도",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "stress:loop"
        ],
        "saju": "getStrengthGrade 신강등급 (극신강/신강/중화/신약/극신약)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop — 유형별 루프 패턴",
        "cross": "MBTI만으로는 극심한 스트레스 상태에서 어떤 성향끼리 연결되는지 알 수 있고, 사주만으로는 에너지의 강도만 알 수 있다. 두 가지를 함께 보면 스트레스 반응이 얼마나 강하게 외부로 표출되는지가 나온다. 같은 스트레스 패턴이라도 에너지가 강한 사람은 폭발적으로 드러내고, 에너지가 약한 사람은 안으로 삭이는 방식으로 나타난다. 썸 상대의 스트레스 신호를 정확히 읽으려면 이 두 가지를 함께 봐야 한다.",
        "impact": 6
      }
    ],
    "좋아하는 타입": [
      {
        "id": "SOMC-LOVE-007",
        "tier": "A",
        "name": "용신 끌림 방향 × MBTI 유형 — 보상적 vs 강화적 끌림",
        "tags": [
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_extractYongshinOh → 용신 오행 (목/화/토/금/수) + SJ_calcOsinChegye 5신 체계",
        "mbti": ": MBTI 4글자 전체 유형 + 일간 오행과 MBTI 기질 일치/불일치",
        "cross": "사주의 가장 필요한 에너지 방향은 그 사람에게 객관적으로 무엇이 필요한지를 알려주고, MBTI 유형은 본인이 이미 가지고 있는 행동 패턴을 보여준다. 이 둘이 일치하는지 다른지에 따라 비슷한 사람에게 끌리는지 반대 유형에게 끌리는지가 결정된다. 사주만으로는 필요한 에너지 방향만 알고, MBTI만으로는 자기 유형만 안다. 두 가지를 함께 봐야 '나를 채워주는 끌림인지, 나를 강화하는 끌림인지'의 구조가 보인다.",
        "impact": 8
      },
      {
        "id": "SOMC-LOVE-010",
        "tier": "A",
        "name": "월간 십성 × E/I — 사회적 장면에서의 이상형 탐색 패턴",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "saju.ss[1].ss — 월간 십성 + SSP[십성].월주 해석 + SIPSUNG_GUNGWI_KW[십성].month",
        "mbti": ": E/I 축 (외향/내향) + 선호 강도",
        "cross": "배우자 자리의 에너지가 무의식적 끌림을 나타낸다면, 사회/직업 자리의 에너지는 의식적으로 원하는 이상형을 나타낸다. 이 둘이 다르면 사회적으로 원하는 타입과 본능적으로 끌리는 타입이 다른 사람이 된다. MBTI의 E/I는 이 의식적 이상형을 어떤 방식으로 탐색하는지를 결정한다. 사주만으로는 의식적 이상형과 무의식적 이상형의 차이를 알 수 있고, MBTI만으로는 탐색 방식만 알 수 있다. 두 가지를 함께 봐야 '어떤 장면에서 어떤 사람을 어떻게 찾는가'가 완성된다.",
        "impact": 6
      },
      {
        "id": "SOMC-LOVE-009",
        "tier": "S",
        "name": "기신 오행 × MBTI 열등기능 — '절대 안 되는 타입'의 이중 회피",
        "tags": [
          "unsung:절",
          "uses:yongshin",
          "uses:inferior",
          "stress:grip"
        ],
        "saju": "SJ_calcOsinChegye → 기신(忌神) 오행 + 구신(仇神) 오행",
        "mbti": ": MT_STACK_POSITIONS.inferior(열등기능) + MT_STRESS_STAGES.stage4_grip",
        "cross": "사주의 방해 에너지는 어떤 에너지가 나에게 맞지 않는지를 객관적으로 알려주고, MBTI의 가장 약한 성향은 심리적으로 아직 미숙한 영역을 보여준다. 이 둘이 같은 방향을 가리키면 회피가 극대화되고, 다른 방향이면 불편함이 분산된다. 사주만으로는 어떤 에너지가 해로운지만 알고, MBTI만으로는 어떤 성향이 미숙한지만 안다. 두 가지를 함께 봐야 '이 사람이 연애에서 절대 못 견디는 구체적인 상대 유형'이 나온다.",
        "impact": 7
      },
      {
        "id": "SOMC-LOVE-008",
        "tier": "S",
        "name": "일주 love 원형 × 인지기능 부기능 — 연애 접근 전술 구체화",
        "tags": [
          "pillar:일지",
          "uses:ilju",
          "uses:auxiliary"
        ],
        "saju": "ILJU_DATA[일주].love — 60일주별 연애 해석 + 일지 정기 십성(jiSS[2].ss)",
        "mbti": ": MT_FUNCTIONS 부기능(stack[1]) + MT_STACK_POSITIONS.auxiliary 역할",
        "cross": "사주의 배우자 자리 정보는 어떤 사람에게 끌리는지를 알려주고, MBTI의 두 번째로 강한 성향은 어떻게 다가가는지를 알려준다. 사주만으로는 끌리는 유형은 알지만 접근 방법은 모르고, MBTI만으로는 행동 패턴은 알지만 무의식적 끌림의 방향은 모른다. 두 가지를 함께 보면 '어떤 사람에게 끌리는지'와 '어떻게 다가가는지'가 결합된 구체적인 연애 전략이 나온다.",
        "impact": 7
      }
    ],
    "통하는 접근법": [
      {
        "id": "SOMC-APPROACH-003",
        "tier": "null",
        "name": "B의 일지 12운성 에너지 레벨 × A의 J/P — 접근 속도의 최적화",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:장생",
          "unsung:양",
          "axis:JP"
        ],
        "saju": "B의 일지 12운성 (uns[2] — 장생~양 12단계, SJ_UNSUNG_MEANING[x].spouse)",
        "mbti": ": A의 J/P 축 (판단/인식)",
        "cross": "에너지 생명주기는 에너지의 양과 방향(상승 중인지, 하강 중인지, 잠재된 상태인지)을 결정하고, J/P는 행동의 템포를 결정한다. 두 가지를 함께 봐야 '언제, 얼마나 빠르게 다가가야 하는가'라는 구체적인 처방이 나온다. 에너지 생명주기만 보면 '배우자 자리 에너지가 높다/낮다' 수준이고, J/P만 보면 '계획적이다/즉흥적이다' 수준이지만, 두 가지를 함께 보면 '이 사람에게는 이 속도로 다가가라'는 맞춤 전략이 된다.",
        "impact": 7
      },
      {
        "id": "SOMC-APPROACH-001",
        "tier": "null",
        "name": "용신 에너지 방향 × E/I 전달 채널 — 접근 에너지의 채널 분화",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "axis:EI"
        ],
        "saju": "B의 용신 오행 방향 (SJ_extractYongshinOh → SJ_GAEUN — 목/화/토/금/수)",
        "mbti": ": A의 E/I 축 (외향/내향)",
        "cross": "가장 필요한 에너지는 상대의 결핍을 나타내므로, 그것을 채워주는 행동 자체가 접근법이 된다. E/I는 그 채움의 방식(사회적 장면인지 개인적 장면인지)을 결정한다. 두 가지를 함께 봐야 구체적으로 무엇을 해야 하는지가 나온다. 예를 들어 '따뜻한 에너지를 줘라'는 정보만 있을 때, E 성향이면 '같이 활기찬 자리에 가라'가 되고 I 성향이면 '조용한 공간에서 둘이 깊게 대화하라'로 달라진다.",
        "impact": 8
      },
      {
        "id": "SOMC-APPROACH-004",
        "tier": "null",
        "name": "B의 월간 십성(사회적 페르소나) × A의 E/I — 사회적 장면에서의 접근 채널 선택",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel",
          "axis:EI"
        ],
        "saju": "B의 월간 십성 (ss[1].ss — SS_CONTEXT[x].general)",
        "mbti": ": A의 E/I 축 (외향/내향)",
        "cross": "사회/직업 자리의 에너지만 보면 '이 사람은 사회적으로 이런 에너지를 가진 사람'이라는 정보만 얻고, E/I만 보면 '나는 외향적/내향적'이라는 정보만 얻는다. 두 가지를 함께 보면 전략이 달라진다. 외향적인 사람이라면 상대의 사회적 에너지에 맞는 장면을 만들어 접근하고, 내향적인 사람이라면 사회적 장면을 우회해 상대의 내면에 직접 다가가는 방식이 효과적이다. 어떤 장소와 상황에서 접근할지를 결정하는 데 두 가지를 함께 봐야 한다는 점이 포인트다.",
        "impact": 6
      },
      {
        "id": "SOMC-APPROACH-005",
        "tier": "null",
        "name": "삼합 트리거 타이밍 × B의 MBTI 수용 패턴 — 에너지 열림 시기의 접근 전술",
        "tags": [
          "unsung:사",
          "relation:삼합",
          "uses:sewoon",
          "uses:wolun",
          "uses:dominant",
          "uses:auxiliary"
        ],
        "saju": "B 사주의 삼합 트리거 시기 (SJ_findHapTrigger — 반삼합 보유 시 나머지 1지지가 세운/월운에서 오는 시점)",
        "mbti": ": B의 MBTI 4글자 전체 (특히 주기능+부기능)",
        "cross": "에너지 결합/충돌 시점은 사주만이 가진 '언제'의 정보를 제공한다. MBTI만으로는 접근 시기를 알 수 없고, 사주의 시기 정보만으로는 어떻게 다가가야 하는지를 알 수 없다. 두 가지를 함께 보면 '이 시기에 이 방식으로'라는 시기와 전술이 동시에 나온다.",
        "impact": 6
      },
      {
        "id": "SOMC-APPROACH-002",
        "tier": "null",
        "name": "천간합 성립 여부 × A의 MBTI 소통 방식 — 합의 에너지를 증폭하는 소통 채널",
        "tags": [
          "unsung:병",
          "relation:천간합",
          "uses:dominant",
          "axis:EI"
        ],
        "saju": "A-B 일간 천간합 성립 여부 및 합화 오행 (CHEONGAN_HAP — 갑기→토, 을경→금, 병신→수, 정임→목, 무계→화)",
        "mbti": ": A의 MBTI 4글자 전체 (특히 주기능+E/I)",
        "cross": "하늘 에너지의 자연스러운 끌림 구조는 사주에서 확인할 수 있지만, 그 끌림을 실제 접근 행동으로 어떻게 옮기느냐는 MBTI가 더해져야 알 수 있다. 같은 끌림 구조라도 MBTI에 따라 접근 방식이 완전히 달라진다. 예를 들어 안정감을 주는 에너지가 필요한 상대에게, 감정 중심 성향이라면 정서적 안정감을 주는 방식으로, 논리 중심 성향이라면 실질적 안정감을 주는 방식으로 채널이 열린다. 끌림의 구조만으로는 '끌린다'는 사실만 알고, MBTI만으로는 소통 방식만 안다. 두 가지를 함께 보면 '이 끌림을 이 방식으로 강화하라'는 맞춤 처방이 나온다.",
        "impact": 7
      }
    ],
    "한 줄 요약": [
      {
        "id": "SOMC-SUMMARY-001",
        "tier": "A",
        "name": "관계 최적 형태 이중 진단",
        "tags": [
          "unsung:태",
          "uses:gunghap",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "관계유형별 궁합 점수 편차 (calcGunghapByRelType → bestRelType/worstRelType, 6종 관계별 REL_TYPE_WEIGHTS 적용 점수)",
        "mbti": ": 상호작용 스타일 쌍 (MT_INTERACTION_STYLES: in-charge/behind-the-scenes/chart-the-course/get-things-going)",
        "cross": "사주는 에너지 구조를 통해 어떤 관계일 때 가장 조화로운지를 알려주고, MBTI는 소통 방식을 통해 어떤 관계 패턴이 자연스러운지를 결정한다. 이 둘이 동시에 같은 관계 유형을 가리키는 경우는 흔하지 않다. 일치할 때는 '이 관계는 맞다'는 강한 확신의 근거가 되고, 불일치할 때는 의식적인 조율이 필요하다는 신호가 된다. 두 가지를 함께 봐야 관계의 정체를 양쪽에서 확인할 수 있다.",
        "impact": 7
      }
    ]
  },
  "lover": {
    "결혼까지 가려면": [
      {
        "id": "P-RLC-120",
        "tier": "A",
        "name": "격국 파격 유무 × 배우자궁 십성: 결혼을 망설이게 하는 구조적 원인",
        "tags": [
          "uses:gyeokguk",
          "pillar:일지",
          "uses:sipsung_rel"
        ],
        "saju": "gg.pagyeokInfo(파격 여부/유형) + gg.gyeokgukName, jiSS[2].ss(일지 정기 십성) + SS_CONTEXT[십성].spouse",
        "mbti": ": N/A",
        "cross": "에너지 구조가 뒤틀려 있는 사람의 경우, 배우자 자리의 에너지를 함께 보면 '내 인생이 꼬여 있는 상황에서 결혼이 그것을 풀어주는가, 아니면 악화시키는가'라는 핵심 질문에 답할 수 있다. 에너지 구조만 보면 결혼과의 관계를 알 수 없고, 배우자 자리만 보면 전체 에너지 구조의 영향을 알 수 없다.",
        "impact": 7
      },
      {
        "id": "P-RLC-118",
        "tier": "A",
        "name": "쌍방 결혼 타이밍 × 커플 세운 타이밍: 결혼 적기의 이중 판정",
        "tags": [
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "SJ_findLoveTiming(sajuA/B, ggA/B, dwA/B, genderA/B) → 향후 5년 점수, analyzeGunghap L18 timing.years[].score/grade",
        "mbti": ": N/A",
        "cross": "개인의 결혼 타이밍과 커플로서의 결혼 타이밍은 서로 다른 변수에서 나온다. 개인 타이밍은 나 자신 기준의 에너지 흐름과 매력 에너지, 커플 타이밍은 두 사람의 배우자 자리와 올해 흐름의 관계에서 도출된다. 두 가지를 함께 봐야 '나는 결혼하고 싶은 시기인데 이 관계에서 실제로 가능한가'라는 실전적 판단이 가능해진다. 어느 한쪽만 보면 '결혼하기 좋은 해인데 이 사람과는 아닌 해'를 구별할 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-117",
        "tier": "A",
        "name": "배우자궁 12운성 × 현재 대운 십성: 결혼 준비도 판정",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:daewoon"
        ],
        "saju": "sajuA.uns[2](일지 12운성) + SJ_UNSUNG_MEANING[운성].spouse, dwA.daewoons[currentDWIdx].ss + DW_SIPSUNG_KW[십성그룹]",
        "mbti": ": N/A",
        "cross": "배우자 자리의 에너지 생명주기는 배우자 에너지의 현재 상태를 보여주고, 10년 흐름의 에너지 방향은 지금 내가 어떤 모드로 움직이고 있는지를 보여준다. 두 가지를 함께 보면 단순히 '결혼운이 좋다/나쁘다'가 아니라 '왜 지금 결혼을 원하는가, 혹은 왜 원하지 않는가'라는 내적 동기를 구조적으로 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-126",
        "tier": "A",
        "name": "coreFear × 결혼이라는 구속: 결혼 공포의 유형별 정체",
        "tags": [
          "cf:Fe",
          "cf:Ne",
          "uses:intensity"
        ],
        "saju": "N/A",
        "mbti": ": MT_TYPES[type].coreFear, MT_TYPES[type].coreNeed, MT_INTENSITY_PROFILES.P (55/68/88)",
        "cross": "MBTI만으로 분석한다. 같은 P 성향이라도 각자가 가진 핵심 두려움의 내용에 따라 결혼에 대한 불안의 양상이 완전히 달라진다.",
        "impact": 8
      },
      {
        "id": "P-RLC-122",
        "tier": "A",
        "name": "교운기 × 결혼 타이밍: 대운 전환점에서의 결혼 판단",
        "tags": [
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi(dw, currentAge) → 교운기 임박 여부, SJ_TRANSITION[이전그룹→새그룹] 전환 의미, SJ_findLoveTiming 결혼 타이밍 점수",
        "mbti": ": N/A",
        "cross": "10년 흐름이 바뀌는 전환 시점과 결혼 인연이 활성화되는 시점이 겹치면, 인생의 큰 전환점에서 결혼이라는 중요한 결정이 함께 오는 구조가 된다. 이때 결혼의 의미와 심리적 무게가 완전히 달라진다. 전환 시점을 모르고 타이밍만 보면 그 결혼 결정이 얼마나 무거운 선택인지 알 수 없고, 타이밍을 모르고 전환 시점만 보면 그 전환이 결혼으로 이어지는지 알 수 없다.",
        "impact": 7
      },
      {
        "id": "P-RLC-119",
        "tier": "A",
        "name": "공망 궁위(일지) × 공망 충전 시기(대운/세운): 결혼 장애물의 정체와 해소 시기",
        "tags": [
          "pillar:일지",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:gongmang"
        ],
        "saju": "calcGongmang(saju) → affected(일지 포함 여부), GONGMANG_FILL_KW['day'], 대운/세운 지지가 공망 지지와 일치하는 시기",
        "mbti": ": N/A",
        "cross": "결핍 구조와 그것이 해소되는 시기는 같은 변수의 양면이다. 두 가지를 함께 보면 '왜 결혼이 늦어지는가(구조적 원인)'와 '언제 결혼의 문이 열리는가(시간적 해소)'를 하나의 흐름으로 설명할 수 있다. 결핍 구조를 모르면 '좋은 해인데 왜 안 되는가'를 설명할 수 없고, 해소 시기를 모르면 '언제 풀리는가'를 알 수 없다.",
        "impact": 7
      },
      {
        "id": "P-RLC-125",
        "tier": "A",
        "name": "결혼 의사결정의 인지기능 순서: 어디서 막히는가",
        "tags": [
          "unsung:사",
          "uses:inferior",
          "ref:MT_DECISION"
        ],
        "saju": "N/A",
        "mbti": ": MT_DECISION_PROCESS[type].flow (4단계 의사결정 순서), MT_TYPES[type].stack[3] (열등기능)",
        "cross": "MBTI 성향이 결혼 결심 과정에서 어디서 막히는지를 예측해준다. 사주의 결혼 타이밍이 '언제'를 다룬다면, 이것은 '왜 그 시기에 심리적으로 막히는가'의 메커니즘을 다룬다.",
        "impact": 7
      },
      {
        "id": "P-RLC-131",
        "tier": "B",
        "name": "기질별 결혼의 의미: 같은 결혼, 다른 정의",
        "tags": [
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "N/A",
        "mbti": ": MT_TEMPERAMENTS (NF/NT/SP/SJ), MT_TEMPERAMENTS[기질].coreNeed, MT_TEMPERAMENTS[기질].conflict",
        "cross": "MBTI 기질에 따라 결혼의 의미 자체가 다르다. 커플 조합에 따라 결혼에 대한 '정의'가 서로 달라 생기는 갈등을 예측할 수 있다. 결혼의 조건이 맞지 않는 것보다, 결혼을 바라보는 의미 자체가 다른 것이 더 근본적인 갈등의 원인이 된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-127",
        "tier": "B",
        "name": "J/P 강도별 결혼 준비 스타일: 프로젝트 vs 흘러감",
        "tags": [
          "axis:JP",
          "uses:intensity",
          "ref:MT_LOVE"
        ],
        "saju": "N/A",
        "mbti": ": MT_INTENSITY_PROFILES.J (55/68/88), MT_INTENSITY_PROFILES.P (55/68/88), MT_LOVE[type].earlyDating",
        "cross": "J/P 성향의 강도 차이에 따라 결혼 준비 과정에서 나타나는 행동 패턴이 달라진다. 같은 J나 P라도 그 성향이 얼마나 강한지에 따라 결혼 준비 방식이 구체적으로 어떻게 다른지를 설명한다.",
        "impact": 7
      },
      {
        "id": "P-RLC-132",
        "tier": "B",
        "name": "결혼 결심 시 그립(grip) 폭발: 최종 결단의 심리적 위기",
        "tags": [
          "stress:grip",
          "ref:MT_LOVE",
          "ref:MT_AXES"
        ],
        "saju": "N/A",
        "mbti": ": MT_STRESS_STAGES.stage4_grip, MT_TYPES[type].stressPattern, MT_AXES[해당축].gripDirection, MT_LOVE[type].breakup",
        "cross": "결혼 결심이라는 고압 상황에서 극도로 지치거나 압박을 받을 때 나타나는 반응 패턴이 MBTI 유형마다 다르다. 이 상태에서 나오는 반응이 그 사람의 진짜 마음과 다를 수 있다는 점을 인식하는 것이 실전적으로 매우 중요하다.",
        "impact": 7
      },
      {
        "id": "P-RLC-130",
        "tier": "B",
        "name": "상호작용 스타일별 결혼 준비 주도권: 누가 이끌고 누가 조율하는가",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "N/A",
        "mbti": ": MT_INTERACTION_STYLES (in-charge/chart-the-course/get-things-going/behind-the-scenes), MT_INTERACTION_STYLES[style].inRelationship",
        "cross": "MBTI만으로 분석한다. 사람마다 다른 네 가지 소통 방식이 커플 조합별로 결혼 준비에 어떤 역학을 만드는지 예측한다. 특히 두 사람 모두 뒤에서 조용히 움직이는 스타일일 때 결혼 준비가 무기한 미뤄지는 패턴은 실제 상황에서 예측력이 높다.",
        "impact": 6
      },
      {
        "id": "P-RLC-128",
        "tier": "B",
        "name": "열등기능 대면으로서의 결혼 결심: 시소의 반대편으로 건너가기",
        "tags": [
          "uses:inferior",
          "stress:grip",
          "ref:MT_AXES"
        ],
        "saju": "N/A",
        "mbti": ": MT_AXES[해당축].seesaw, MT_AXES[해당축].gripDirection, MT_TYPES[type].stack[3] (열등기능), MT_TYPES[type].growthPath",
        "cross": "MBTI의 주요 성향 차이들이 결혼 결심이라는 상황에서 각자에게 어떤 심리적 과제를 안겨주는지를 설명한다. 결혼은 단순한 관계 이벤트가 아니라 심리적 성장을 강제하는 장치이기도 하다는 점이 핵심이다.",
        "impact": 8
      },
      {
        "id": "P-RLC-129",
        "tier": "B",
        "name": "dealbreaker의 시간적 급부상: 연애에서 견딘 것이 '평생'에서 터진다",
        "tags": [
          "uses:intensity",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": MT_LOVE[type].dealbreaker, MT_LOVE[type].deepRelation, MT_CONFLICT_STYLES[type].trigger, MT_INTENSITY_PROFILES (해당 축 강도)",
        "cross": "연애에서 결혼으로 프레임이 바뀌는 순간 각자가 갑자기 받아들이기 어려워지는 조건들이 급부상하는 과정을 설명한다. MBTI 유형별로 어떤 영역에서 이 조건이 떠오르는지 예측할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-133",
        "tier": "B",
        "name": "결혼 합의의 쌍방 의사결정 교차: A의 blind가 B의 flow 1순위인 구조",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION",
          "ref:MT_RELATION"
        ],
        "saju": "N/A",
        "mbti": ": MT_DECISION_PROCESS[typeA].blind × MT_DECISION_PROCESS[typeB].flow[0] (쌍방), MT_RELATION_TYPES",
        "cross": "MBTI 유형별 결정을 내리는 방식을 함께 살펴보면 결혼 결심 과정에서 두 사람이 서로를 어떻게 보완하는지가 보인다. 평소 관계 패턴과는 별개로, 결혼이라는 특정 결정 상황에서 나타나는 보완 구조를 새롭게 밝혀준다.",
        "impact": 6
      },
      {
        "id": "P-RLC-123",
        "tier": "B",
        "name": "쌍방 신살 교차 유형 × 결혼 타이밍: 결혼 인연의 질적 판정",
        "tags": [
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L15 starsCross(dowhaSal, chuneul, yeokma, hwagaeSal, yangin) + L18 timing.bestYear",
        "mbti": ": N/A",
        "cross": "특정 인연 에너지는 결혼의 질적 분위기를, 세운 타이밍은 결혼의 시간적 창을 각각 알려준다. 두 가지를 함께 보면 '이 해에 결혼하면 어떤 분위기의 결혼이 되는가'라는 통합 판단이 가능하다. 인연 에너지만 보면 '좋은 인연인데 언제?'이고, 타이밍만 보면 '좋은 해인데 이 관계의 질은?'을 알 수 없다.",
        "impact": 6
      },
      {
        "id": "P-RLC-124",
        "tier": "B",
        "name": "쌍방 조후 보완 × 결혼 후 계절 에너지 누적: 결혼의 장기적 온도 조절",
        "tags": [
          "unsung:절",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "gg_A.season + gg_A.johuNeeds vs sajuB.dmEl + sajuB.elFull, gg_B.season + gg_B.johuNeeds vs sajuA.dmEl + sajuA.elFull",
        "mbti": ": N/A",
        "cross": "연인 사이에서는 가끔 만나기 때문에 두 사람의 에너지 온도 차이가 크게 문제되지 않는다. 하지만 결혼 후 매일 함께하면 이 온도 차이가 누적되어 관계의 기본 온도를 결정하게 된다. 이 패턴은 결혼이라는 장기적 동거 맥락에서 매일 함께할 때의 만성적 에너지 온도에 초점을 맞춘다.",
        "impact": 7
      },
      {
        "id": "P-RLC-121",
        "tier": "S",
        "name": "용신 궁합 × 강약 궁합 × 배우자궁 기대-현실 갭: 결혼 지속 가능성의 3층 판정",
        "tags": [
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L7 용신궁합(bForA, aForB) + L16 강약궁합(combo) + L17 배우자궁 십성 교차(spouseGung.desc) + P-RLC-087(기대-현실 갭)",
        "mbti": ": N/A",
        "cross": "가장 필요한 에너지 방향, 두 사람의 에너지 강약 균형, 배우자 자리의 기대와 현실 매칭, 이 세 가지는 각각 다른 차원을 측정한다. 어느 하나만으로는 결혼 지속 가능성을 온전히 판단할 수 없다. 세 가지를 함께 보면 모두 좋은 경우부터 모두 좋지 않은 경우까지 여덟 가지 조합이 만들어지며, 이것이 결혼 상담의 핵심 판단 틀이 된다.",
        "impact": 9
      }
    ],
    "결혼하면": [
      {
        "id": "P-RLC-111",
        "tier": "A",
        "name": "배우자궁 십성 교차 × 강약 궁합 × 격국 보완: 결혼 후 역할 분담 안정성",
        "tags": [
          "uses:gyeokguk",
          "pillar:일지",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L17 배우자궁 십성 교차(spouseGung.A.toPartner, spouseGung.B.toPartner) + jiSS[2].ss(일지 정기 십성) + analyzeGunghap L16 강약궁합(쌍강/쌍약/A강B약/B강A약/균형) + gg.gyeokgukName(격국 유형) + JAPYEONG_GG[격국].role",
        "mbti": ": N/A",
        "cross": "에너지 강약과 에너지 구조를 각각 따로 보면 '역할 분담이 자연스러운가'와 '기대가 충족되는가'가 별개의 결론으로 나올 수 있다. 세 변수를 동시에 봐야 결혼 후 첫 1년의 적응 속도와 장기 안정성을 함께 판단할 수 있다. 특히 두 사람 모두 에너지가 강하면서 배우자 자리의 기대는 충족되는 경우, '만족하지만 주도권 다툼'이라는 결혼 특유의 모순이 드러난다.",
        "impact": 9
      },
      {
        "id": "P-RLC-112",
        "tier": "A",
        "name": "교차 통변 공식 × 용신 궁합: 부부 단위 에너지 흐름의 길흉",
        "tags": [
          "uses:tongbyeon",
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "SJ_detectCrossTongbyeon(ggA, ggB) → tongbyeons[].name/type + analyzeGunghap L7 용신궁합(bForA, aForB) + SJ_extractYongshinOh(ggA.yongshin), SJ_extractYongshinOh(ggB.yongshin)",
        "mbti": ": N/A",
        "cross": "두 사람의 에너지 흐름만 보면 합쳐졌을 때의 전반적인 흐름만 알 수 있고, 서로의 필요를 채워주는지만 보면 그것만 알 수 있다. 두 가지를 함께 보면 네 가지 조합이 만들어진다. 에너지 흐름도 좋고 서로의 필요도 채워지는 최적의 경우, 흐름은 좋지만 필요는 채워지지 않아 겉은 좋아 보이지만 속이 공허한 경우, 흐름은 좋지 않지만 필요는 채워져 위기 때 버팀목이 되는 경우, 둘 다 좋지 않은 구조적으로 위험한 경우다. 이 네 가지 조합이 결혼 생활의 재물, 건강, 방향성을 동시에 설명한다.",
        "impact": 8
      },
      {
        "id": "P-RLC-116",
        "tier": "A",
        "name": "시주 십성 교차 × 자녀운 방향: 결혼 후 자녀 영역의 시너지/갈등",
        "tags": [
          "ss:식상",
          "pillar:시주",
          "uses:unsung",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(rA.dg, rB.hg) = A가 느끼는 B의 시주 에너지, getSipsung(rB.dg, rA.hg) = B가 느끼는 A의 시주 에너지 + SJ_buildChildAnalysis 방향(시간 십성, 시지 12운성, 시지 신살, 식상 수) + SSP[십성]['시주'](기둥위치 해석) + SIPSUNG_GUNGWI_KW[십성].hour",
        "mbti": ": N/A",
        "cross": "두 사람의 자녀 자리 에너지를 교차하면 '양육관의 일치 또는 충돌'과 '자녀 복의 비대칭'이라는 부부 고유의 조합이 드러난다. 연애에서는 자녀 이야기가 먼 미래지만 결혼에서는 핵심 이슈이므로, 이 교차는 결혼 맥락에서만 의미 있는 분석이다.",
        "impact": 7
      },
      {
        "id": "P-RLC-115",
        "tier": "B",
        "name": "납음 궁합 × 음양 궁합 × 오행 보완: 결혼의 상징적 원형과 실제 보완의 정합성",
        "tags": [
          "unsung:양",
          "uses:yinyang",
          "uses:napeum",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L12 납음궁합(napeum.rel: 상생/비화/상극) + NAPEUM_STORY[납음명] + SJ_buildNapeumGunghap(관계 서술) + SJ_calcYinYang(A: 양수/음수/라벨) + SJ_calcYinYang(B) + analyzeGunghap L3 오행보완(ohBowan: 방향/오행)",
        "mbti": ": N/A",
        "cross": "상징적 서사, 에너지 리듬, 구체적 결핍 보충이라는 세 가지 차원을 동시에 봐야 결혼의 이야기, 리듬, 실속이 일치하는지 판단할 수 있다. 이 정합성이 높을수록 '설명할 수 없지만 함께하면 좋은 부부'가 되고, 낮을수록 '좋아하는데 왜 힘든지 모르겠는 부부'가 된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-114",
        "tier": "S",
        "name": "대운 동기화 × 세운 합충 시기 × 배우자궁 십성: 결혼 후 위기/전성기 시점 예측",
        "tags": [
          "dm:기",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L5 대운동기화(dw sync: 동반상승/한쪽견인/동반인내) + L18 세운타이밍(timing years[].score/grade) + SEUN_HAPCHUNG_KW[합/충][궁위] + L17 배우자궁 십성 교차(spouseGung) + DW_SIPSUNG_KW[십성](strong/weak)",
        "mbti": ": N/A",
        "cross": "두 사람의 10년 흐름 차이가 만드는 마찰과 배우자 자리의 정적 구조는 각각 다른 정보를 준다. 이 두 가지에 시간 흐름을 함께 교차하면 '언제 어디서 무엇이 터지는가'를 구체적으로 특정할 수 있다. 결혼의 핵심은 시간에 따른 변화이므로, 이 시간과 공간의 교차가 결혼 상담에서 가장 실용적인 분석이 된다.",
        "impact": 9
      },
      {
        "id": "P-RLC-113",
        "tier": "S",
        "name": "5신 위치(상대 일간)의 장기 누적 효과 × 일지 12운성: 결혼 후 만성 체감",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(A용신오행) → B일간오행의 5신 라벨(용신/희신/한신/구신/기신) + sajuA.uns[2](A의 일지 12운성) + SJ_calcOsinChegye(B용신오행) → A일간오행의 5신 라벨 + sajuB.uns[2](B의 일지 12운성)",
        "mbti": ": N/A",
        "cross": "상대가 나에게 좋은 에너지인지 나쁜 에너지인지는 사주에서 알 수 있지만, 연애에서는 가끔 만나기 때문에 나쁜 에너지라도 큰 문제가 되지 않을 수 있다. 결혼하면 매일 함께하므로 그 에너지의 누적 효과가 완전히 달라진다. 에너지 생명주기의 방사 강도까지 함께 보면 결혼 특유의 만성적 체감을 설명할 수 있다.",
        "impact": 8
      }
    ],
    "맞춰가야 할 부분": [
      {
        "id": "P-RLC-084",
        "tier": "A",
        "name": "강약 궁합 유형 × 격국 상보/동질: 역할 분담의 자연스러움",
        "tags": [
          "uses:gyeokguk",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L16 강약궁합(쌍강/쌍약/A강B약/B강A약/균형) × gg.gyeokgukName(10격국 유형) × JAPYEONG_GG[격국].role",
        "mbti": ": N/A",
        "cross": "에너지 강약만으로는 두 사람의 에너지 양 차이만 알 수 있고, 에너지 구조만으로는 각자의 역할 성향만 알 수 있다. 두 가지를 함께 봐야 '에너지가 강한 쪽이 표현을 맡고 약한 쪽이 관리를 맡는' 식의 자연스러운 역할 분담 구조가 나온다. 특히 두 사람 모두 에너지가 강하면서 같은 에너지 구조를 가진 경우의 극심한 주도권 마찰은 어느 한쪽만으로는 설명하기 어렵다.",
        "impact": 8
      },
      {
        "id": "P-RLC-087",
        "tier": "A",
        "name": "배우자궁 기대 십성 × B→A 실제 십성: 기대-현실 갭의 조율 과제",
        "tags": [
          "pillar:일지",
          "uses:gunghap",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGunghap L17 배우자궁 십성 교차(spouseGung.A.toPartner, spouseGung.B.toPartner) × 일지 정기 십성(jiSS[2].ss) × SS_CONTEXT[십성].spouse",
        "mbti": ": N/A",
        "cross": "개인 단위에서 기대와 현실의 매칭을 보는 것과 달리, 이 패턴은 A의 기대 대 B의 제공, B의 기대 대 A의 제공을 동시에 쌍방향으로 본다. 이를 통해 누가 더 조율해야 하는지, 어느 방향으로 조율해야 하는지를 구체적으로 특정할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-083",
        "tier": "A",
        "name": "충·형·해 궁위 교차 × 해당 궁위 십성: 커플 갈등 영역의 정체",
        "tags": [
          "relation:충",
          "relation:형",
          "relation:해",
          "uses:gunghap",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGunghap L2 지지충·형·해(JIJI_CHUNG_KW, JIJI_HYUNG_KW, JIJI_HAE_KW) × 궁위 조합(CHUNG_GUNGWI_KW) × 해당 궁위 십성(SS_CONTEXT[십성])",
        "mbti": ": N/A",
        "cross": "충돌의 유형만으로는 어떤 질감의 갈등인지만 알고, 어느 영역인지만으로는 위치만 알고, 무엇에 대한 것인지만으로는 주제만 안다. 세 가지를 함께 교차해야 '배우자 영역에서 감정 폭발적인 형태로 주도권에 대해 충돌한다'처럼 갈등의 질감, 위치, 주제가 결합된 입체적인 그림이 완성된다.",
        "impact": 9
      },
      {
        "id": "P-RLC-092",
        "tier": "A",
        "name": "분노 지속시간의 비동기화: 한쪽은 풀렸는데 다른 쪽은 아직인 구조",
        "tags": [
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "N/A",
        "mbti": ": MT_ANGER.byFunction[A의 주기능].duration × MT_ANGER.byFunction[B의 주기능].duration",
        "cross": "MBTI 성향별로 갈등 이후 감정이 얼마나 오래 지속되는지가 다르다. 커플 단위로 이것을 교차하면 갈등 자체보다 갈등 이후 회복 타이밍의 불일치가 관계를 더 갉아먹는 구조가 보인다. 갈등이 일어나는 것보다 갈등 후 회복 속도가 서로 달라서 생기는 마찰이 실제로는 더 큰 문제인 경우가 많다.",
        "impact": 6
      },
      {
        "id": "P-RLC-089",
        "tier": "A",
        "name": "쌍방 과잉 오행 동일 × 결핍 오행 비보완: 에너지 마찰의 근본 구조",
        "tags": [
          "condition:excess",
          "condition:lack",
          "uses:gunghap"
        ],
        "saju": "sajuA.elFull + sajuB.elFull(과잉/결핍 비교) × OHENG_KW[오행].excess/lack × analyzeGunghap L3 오행보완(ohBowan)",
        "mbti": ": N/A",
        "cross": "오행 보완 분석(L3)만으로는 '서로의 부족을 채우는가'만 보지만, 과잉의 동일성을 교차하면 '서로의 과잉을 증폭시키는가'까지 본다. 채움과 증폭은 다른 차원이다. 특히 같은 오행 과잉 + 같은 오행 결핍의 조합은 관계의 가장 근본적인 에너지적 한계를 보여준다.",
        "impact": 7
      },
      {
        "id": "P-RLC-086",
        "tier": "A",
        "name": "원진살 궁위 × 해(害) 궁위: 만성 미세 마찰의 이중 지뢰",
        "tags": [
          "relation:해",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L9 원진살(WONJIN 6쌍) × L2 해(JIJI_HAE_KW 6종) × 궁위 조합",
        "mbti": ": N/A",
        "cross": "미묘하게 밀어내는 부조화만으로는 '비스듬히 어긋나는 불편함'만 알 수 있고, 에너지 결합을 방해하는 구조만으로는 '잘 맞는 짝을 빼앗기는 느낌'만 알 수 있다. 두 가지는 작동 방식이 다르다. 전자는 정반대가 아닌 비스듬한 어긋남이고, 후자는 잘 맞는 짝을 빼앗는 구조다. 같은 자리에서 두 가지가 겹치면 두 메커니즘이 동시에 작동하여 원인을 알 수 없는 만성적 피로감이 된다.",
        "impact": 6
      },
      {
        "id": "P-RLC-088",
        "tier": "A",
        "name": "대운 비동기화 × 세운 합충 시기: 시간적 에너지 차이의 마찰",
        "tags": [
          "dm:기",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L5 대운동기화(dw sync) × L18 세운타이밍(timing years) × DW_SIPSUNG_KW[십성](strong/weak)",
        "mbti": ": N/A",
        "cross": "큰 흐름의 방향이 서로 다르다는 것은 정적인 정보이고, 올해 에너지 충돌 여부는 단년 정보다. 두 가지를 함께 보면 '큰 흐름이 엇갈린 상태에서 올해마저 한쪽에만 강한 충돌이 걸리면 위기의 해'라는 시간적 마찰의 리듬이 드러난다.",
        "impact": 7
      },
      {
        "id": "P-RLC-094",
        "tier": "B",
        "name": "그립 상태의 커플 역학: 한쪽이 그립에 빠졌을 때 상대가 도울 수 있는가 악화시키는가",
        "tags": [
          "unsung:태",
          "stress:grip"
        ],
        "saju": "N/A",
        "mbti": ": MT_STRESS_STAGES.stage4_grip(A의 그립 패턴) × MT_TYPES[typeB].stack(B의 해당 기능 위치), MT_STRESS_STAGES.stage5_recovery.intervention",
        "cross": "MBTI 단독 분석이다. 개인 단위의 극한 스트레스 반응과 달리, 커플 단위에서 '한쪽이 위기일 때 다른 쪽이 방파제가 되는가, 함께 흔들리는가'를 살펴볼 수 있다. 이것은 장기 관계의 지속 가능성에 직접적인 영향을 미친다.",
        "impact": 7
      },
      {
        "id": "P-RLC-093",
        "tier": "B",
        "name": "갈등 해소 needsFromOther의 구조적 미스매치: 상대가 자연스럽게 제공하는 것 ≠ 내가 필요한 것",
        "tags": [
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": MT_CONFLICT_STYLES[typeA].needsFromOther × MT_CONFLICT_STYLES[typeB].fightStyle/communication, MT_CONFLICT_STYLES[typeB].needsFromOther × MT_CONFLICT_STYLES[typeA].fightStyle/communication",
        "cross": "MBTI 단독 패턴. 갈등 해소 과정에서 '상대가 자연스럽게 주는 것'과 '내가 진짜 필요한 것' 사이의 구조적 간극을 보여준다. 이것이 두 사람이 맞춰가야 할 부분에 대한 가장 실용적인 조언이 된다.",
        "impact": 8
      },
      {
        "id": "P-RLC-085",
        "tier": "B",
        "name": "용신 보완도 × 조후 보완도: 필요 에너지의 이중 정합/모순",
        "tags": [
          "condition:lack",
          "pillar:월지",
          "unsung:절",
          "uses:johu",
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L7 용신궁합(bForA/aForB) × ST5_JOHU(월지 계절 결핍) × SJ_HEALTH_OH(오행 건강)",
        "mbti": ": N/A",
        "cross": "가장 필요한 에너지를 보완하면 에너지 구조가 균형 잡히는지 알 수 있고, 계절적 온도 균형을 맞추면 체감적으로 맞는지 알 수 있다. 둘 다 '에너지 보완'이지만 차원이 다르다. 전자는 에너지 성분의 균형이고, 후자는 계절적 냉기와 열기의 균형이다. 두 가지를 함께 보아야 '구조적으로도 맞고 체감적으로도 맞다'는 두 방향의 확인이 가능하다.",
        "impact": 7
      },
      {
        "id": "P-RLC-090",
        "tier": "S",
        "name": "갈등 트리거의 상호 교차: A의 자연스러운 행동이 B의 지뢰를 밟는 구조",
        "tags": [
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": MT_CONFLICT_STYLES[typeA].fightStyle/communication × MT_CONFLICT_STYLES[typeB].trigger, MT_CONFLICT_STYLES[typeB].fightStyle/communication × MT_CONFLICT_STYLES[typeA].trigger",
        "cross": "MBTI 단독 패턴. 두 사람의 갈등 스타일을 교차 분석하여 '의도 없이 상대를 건드리는 구조적 지뢰'를 찾아낸다. 개인 단위의 갈등 스타일과 달리, 두 사람의 스타일이 맞물릴 때 발생하는 반복적인 부딪힘 구조를 보여준다.",
        "impact": 7
      },
      {
        "id": "P-RLC-091",
        "tier": "S",
        "name": "blindSpot의 상호 자극: 서로의 사각지대가 상대의 핵심 욕구를 건드리는 구조",
        "tags": [
          "unsung:사",
          "cf:Ne",
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": MT_CONFLICT_STYLES[typeA].blindSpot × MT_TYPES[typeB].coreNeed, MT_CONFLICT_STYLES[typeB].blindSpot × MT_TYPES[typeA].coreNeed",
        "cross": "MBTI 단독 패턴. 본인이 인식하지 못하는 영역과 상대의 가장 깊은 욕구가 교차하면, '의식되지 않는 상처'가 반복적으로 생겨난다. 두 사람의 갈등 스타일이 만들어내는 의식적 부딪힘이 있다면, 이것은 그보다 더 깊은 곳에서 서서히 쌓이는 갈등이 만성화되는 패턴이다.",
        "impact": 7
      }
    ],
    "민감한 부분": [
      {
        "id": "P-RLC-048",
        "tier": "A",
        "name": "조후 결핍 방향 × 과잉 오행: 온도 민감성의 정체",
        "tags": [
          "condition:lack",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "gg.johuNeeds(조후 필요 오행) + elFull[오행] 과잉(≥3.0) + gg.seasonName",
        "mbti": ": N/A",
        "cross": "계절적 온도 균형은 '외부 환경 기준으로 무엇이 필요한가'를, 에너지 분포는 '내부에서 무엇이 넘치는가'를 각각 독립적으로 설명한다. 두 가지를 함께 보면 '넘치는 것과 부족한 것이 정확히 반대편에 있는' 극단적 불균형이 한눈에 보인다. 계절 균형만 보면 '필요한 것'만, 에너지 분포만 보면 '넘치는 것'만 알 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-045",
        "tier": "A",
        "name": "공망 궁위 × 파격 방향: 결핍이 만드는 지뢰밭의 정체",
        "tags": [
          "uses:gyeokguk",
          "condition:lack",
          "uses:gongmang"
        ],
        "saju": "calcGongmang().affected[궁위] + gg.pagyeokInfo / gg.gyeokgukName",
        "mbti": ": N/A",
        "cross": "비어있는 자리만 보면 '어디가 결핍인가'만, 에너지 뒤틀림만 보면 '에너지가 어떻게 꼬였는가'만 설명된다. 두 가지를 함께 보면 '비어있는 자리에 뒤틀린 에너지까지 겹친 이중 결핍'이라는 민감한 구조가 보인다. 두 요소는 서로 다른 층(공간적 결핍 vs 에너지적 뒤틀림)에서 독립적으로 도출되므로 함께 볼 때 의미가 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-054",
        "tier": "A",
        "name": "opposing 그림자 × 기신 대운: 방어적 민감 반응의 시간적 활성화",
        "tags": [
          "uses:daewoon",
          "uses:yongshin",
          "uses:osin",
          "uses:shadow"
        ],
        "saju": "기신 대운 진입 시기(SJ_calcOsinChegye.gisin + daewoon 십성 매칭)",
        "mbti": ": MT_SHADOW_BY_TYPE[type].opposing_[기능] + MT_SHADOW_POSITIONS.opposing.trigger",
        "cross": "MBTI 단독으로는 방어적 반응이 '어떤 상황에서 발동하는가'를 설명하지만 '언제 특히 강하게 발동하는가'의 시간적 특정이 불가능하다. 사주 단독으로는 맞지 않는 에너지가 강해지는 시기의 스트레스는 설명하지만 '방어 반응의 구체적 심리적 양상'을 설명할 수 없다. 두 가지를 교차하면 '큰 흐름 단위로 언제 어떤 방어적 민감 반응이 가장 강해지는가'를 짚어낼 수 있다.",
        "impact": 6
      },
      {
        "id": "P-RLC-053",
        "tier": "A",
        "name": "분노 지속시간 × 원국 충·형 궁위: 분노의 만성화 구조",
        "tags": [
          "relation:충",
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "calcRelations().jijiChung[].궁위 + jijiHyung[].궁위",
        "mbti": ": MT_ANGER.byFunction[주기능].duration + MT_ANGER.byFunction[주기능].resolution",
        "cross": "MBTI 단독으로는 '분노를 어떻게 처리하는가(축적 vs 소각 vs 기록)'를 설명하고, 사주 단독으로는 '어떤 영역이 만성적으로 자극되는가'를 설명한다. 교차하면 '만성 자극 영역 × 분노 처리 방식 = 관계 내 갈등 패턴(축적형 폭발 / 반복형 소각 / 기록형 따지기)'이 나온다.",
        "impact": 7
      },
      {
        "id": "P-RLC-049",
        "tier": "A",
        "name": "원진살 궁위 × 일간 물상: 미묘한 밀당 지뢰의 반응 양식",
        "tags": [
          "unsung:묘",
          "unsung:양",
          "uses:mulsang"
        ],
        "saju": "calcExtraSinsal().원진살(desc: 궁위쌍) + JEOKCHEONSU[일간] / MULSANG_GAN[일간]",
        "mbti": ": N/A",
        "cross": "미묘하게 불편한 에너지 관계는 '어떤 자리 쌍이 불편한가'를, 타고난 반응 방식은 '이 사람의 근본적 반응 스타일이 어떤가'를 각각 독립적으로 설명한다. 두 가지를 함께 보면 '불편함에 대한 구체적 반응 방식'이 보인다. 불편한 관계만 보면 '어디가 불편한지'만, 반응 스타일만 보면 '이 사람의 기본 스타일'만 알 수 있다.",
        "impact": 6
      },
      {
        "id": "P-RLC-046",
        "tier": "S",
        "name": "양인살/괴강살 유무 × 신강도 등급: 공격적 민감 반응의 방향",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "unsung:양",
          "sinsal:양인"
        ],
        "saju": "calcExtraSinsal().양인살/괴강살 유무 + gg.strengthGrade(극신강~극신약)",
        "mbti": ": N/A",
        "cross": "날카로운 에너지만 보면 '칼날이 있다'만, 에너지 강약만 보면 '힘의 크기'만 설명된다. 두 가지를 함께 보면 '칼날의 방향'(밖으로 vs 안으로)이 결정된다. 같은 날카로운 에너지라도 전체 에너지가 넘치면 외부로 폭발하는 형태, 에너지가 부족하면 내부로 향하는 형태가 된다. 이것은 어느 한 가지만으로는 예측할 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-043",
        "tier": "S",
        "name": "기신 오행 × 과잉/결핍 오행: 민감 지점의 에너지 구조",
        "tags": [
          "condition:lack",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(yongshinOh).gisin + SJ_getOsinLabel() + elFull[오행] 과잉(≥3.0)/결핍(≤0.3)",
        "mbti": ": N/A",
        "cross": "맞지 않는 에너지 목록과 에너지 분포를 함께 보면, 단순히 '이 에너지가 싫다'가 아니라 '이 에너지가 넘쳐서 싫은가 vs 없어서 거부하는가'를 구분할 수 있다. 같은 맞지 않는 에너지라도 반응이 정반대로 나타난다. 이것은 어느 한 가지만으로는 설명할 수 없는 통찰이다.",
        "impact": 8
      },
      {
        "id": "P-RLC-057",
        "tier": "S",
        "name": "과잉 오행의 감정 질감 × 갈등 해소 방식: 화해의 미스매치",
        "tags": [
          "condition:excess",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "elFull[오행] ≥3.0 (과잉 오행 종류: 화/수/금/토/목) + OHENG_KW[오행].excess",
        "mbti": ": MT_CONFLICT_STYLES[type].resolution + MT_ANGER.byFunction[주기능].resolution",
        "cross": "감정 중심 성향과 논리 중심 성향의 차이는 감정의 온도나 질감을 설명하지 못한다. 그러나 갈등 해소라는 구체적 맥락에서 넘치는 에너지의 감정적 질감이 작용하면, 성향 분류만으로는 닿을 수 없는 설명이 가능해진다. 사주만으로는 '이 사람이 갈등 후 어떤 절차를 밟는가'를 특정할 수 없다. MBTI의 갈등 해소 방식이 절차를, 사주의 넘치는 에너지가 그 절차 안의 감정적 질감을 결정하여, 두 가지를 교차할 때만 나오는 '화해 방식'이 완성된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-055",
        "tier": "S",
        "name": "dealbreaker × 조후 결핍: 관계 종료 트리거의 이중 결정",
        "tags": [
          "condition:lack",
          "uses:johu",
          "uses:gaeun",
          "ref:MT_LOVE"
        ],
        "saju": "gg.johuNeeds(조후 필요 오행) + gg.seasonName + elFull[오행]",
        "mbti": ": MT_LOVE[type].dealbreaker",
        "cross": "관계를 끝내게 만드는 심리적 방아쇠는 성격 구조에서 도출된 '관계 종료의 심리적 트리거'이고, 계절적 에너지 결핍은 사주의 계절에서 도출된 '에너지적 갈증'이다. 두 가지를 교차하면 '심리적 트리거와 에너지적 갈증이 같은 방향인가 반대 방향인가'라는 구조가 보인다. 같은 방향이면 특히 조심해야 할 민감 지점이, 반대 방향이면 스스로도 혼란스러운 민감 지점이 형성된다.",
        "impact": 6
      },
      {
        "id": "P-RLC-050",
        "tier": "S",
        "name": "coreFear × 기신 오행: 민감 지점의 이중 뿌리",
        "tags": [
          "uses:yongshin",
          "uses:osin",
          "cf:Fe"
        ],
        "saju": "SJ_calcOsinChegye(yongshinOh).gisin + SJ_getOsinLabel() + elFull[기신 오행]",
        "mbti": ": MT_TYPES[type].coreFear",
        "cross": "가장 깊은 두려움은 성격 구조에서 '무엇이 두려운가'를 파악하고, 맞지 않는 에너지는 사주의 에너지 균형에서 '어떤 에너지가 해로운가'를 파악한다. 두 체계가 서로 다른 방식으로 같은 방향을 가리키면, 양쪽에서 독립적으로 확인된 깊은 취약 지점이 된다. MBTI 단독으로는 '두려움의 에너지적 질감'을, 사주 단독으로는 '맞지 않는 에너지가 심리적으로 어떤 두려움을 만드는지'를 설명할 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-047",
        "tier": "S",
        "name": "일지 12운성(병·사·절) × 배우자궁 십성: 관계 내 취약 지점의 정체",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:사",
          "unsung:절",
          "unsung:병",
          "uses:sipsung_rel"
        ],
        "saju": "saju.uns[2](일지 12운성: 병/사/절) + saju.jiSS[2].ss(일지 정기 십성)",
        "mbti": ": N/A",
        "cross": "에너지 상태 변화는 '에너지 상태(강/약)'를, 에너지의 성격은 '보호/압박/경쟁 등 어떤 종류의 에너지인가'를 각각 독립적으로 설명한다. 두 가지를 교차하면 '약한 상태에서 어떤 성격의 에너지에 노출되는가'라는 취약 지점의 정체가 보인다. 에너지 상태 변화만으로는 '약하다'만, 에너지 성격만으로는 '무슨 에너지인지'만 알 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-056",
        "tier": "S",
        "name": "격국 파격 × 갈등 trigger: 구조적 뒤틀림이 만드는 관계 특유의 지뢰",
        "tags": [
          "uses:gyeokguk",
          "ss:겁재",
          "ss:상관",
          "tongbyeon:효신탈식",
          "uses:tongbyeon",
          "cf:Fe",
          "ref:MT_CONFLICT"
        ],
        "saju": "gg.pagyeokInfo(효신탈식/상관견관/겁재탈재/칠살무제) + gg.gyeokgukName",
        "mbti": ": MT_CONFLICT_STYLES[type].trigger + MT_TYPES[type].coreFear",
        "cross": "MBTI만으로는 갈등 방아쇠가 왜 '일반적 불쾌'를 넘어 '존재적 위협'이 되는지 설명할 수 없다(같은 유형인데 왜 어떤 사람은 가치 무시에 폭발하고 어떤 사람은 견디는가). 사주의 에너지 긴장이 그 방아쇠의 깊이를 결정한다. 사주만으로는 에너지 긴장이 연인 관계에서 '구체적으로 어떤 상황에서' 발동하는지 특정할 수 없다. MBTI의 갈등 방아쇠가 구체적 발동 상황을 제공한다.",
        "impact": 7
      },
      {
        "id": "P-RLC-044",
        "tier": "S",
        "name": "격국 파격 유형 × 원국 충·형 궁위: 민감 영역의 구조적 뿌리",
        "tags": [
          "uses:gyeokguk",
          "ss:겁재",
          "ss:상관",
          "relation:충",
          "tongbyeon:효신탈식",
          "uses:tongbyeon"
        ],
        "saju": "gg.pagyeokInfo(효신탈식/상관견관/겁재탈재/칠살무제) + calcRelations().jijiChung[].a.l/b.l + jijiHyung[].a.l/b.l",
        "mbti": ": N/A",
        "cross": "에너지의 구조적 뒤틀림은 '왜 민감한가'를, 에너지 충돌이 일어나는 삶의 영역은 '어디서 민감한가'를 각각 독립적으로 설명한다. 두 가지를 교차하면 '왜 민감한가 + 어디서 민감한가'가 동시에 잡힌다. 에너지 뒤틀림만으로는 '무엇이 꼬였는지'만, 충돌 영역만으로는 '어디가 흔들리는지'만 알 수 있다.",
        "impact": 9
      },
      {
        "id": "P-RLC-051",
        "tier": "S",
        "name": "열등기능 그립 × 양인살+신강도: 극한 민감 반응의 방향",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "unsung:양",
          "sinsal:양인",
          "uses:inferior",
          "stress:grip"
        ],
        "saju": "calcExtraSinsal().양인살/괴강살 유무 + gg.strengthGrade(극신강~극신약)",
        "mbti": ": MT_STRESS_STAGES.stage4_grip.examples[해당유형] + MT_TYPES[type].stressPattern",
        "cross": "MBTI 단독으로는 한계에 몰렸을 때 나타나는 반응의 '내용(what)'만 알 수 있고, 사주 단독으로는 폭발의 '방향(where)'만 알 수 있다. 두 가지를 교차하면 '무엇이 어느 방향으로 폭발하는가'라는 구체적인 극한 반응이 보인다. 이것은 연인이 '이 사람이 한계에 몰렸을 때 나한테 뭘 할 것인가'를 예측하는 데 결정적이다.",
        "impact": 8
      },
      {
        "id": "P-RLC-052",
        "tier": "S",
        "name": "갈등 blindSpot × 공망 궁위: 무의식적으로 상대를 찌르는 사각지대",
        "tags": [
          "unsung:사",
          "uses:gongmang",
          "ref:MT_CONFLICT"
        ],
        "saju": "calcGongmang().affected[궁위]",
        "mbti": ": MT_CONFLICT_STYLES[type].blindSpot",
        "cross": "MBTI만으로는 '상대의 어떤 결핍을 건드리는지' 특정할 수 없고, 사주만으로는 '왜 그 자리가 반복적으로 건드려지는지의 메커니즘' 설명이 안 된다. 두 가지를 교차하면 '자신도 모르게 상처를 주는 행동 패턴 + 자신도 모르게 상처받는 결핍 지점'이라는 관계 내 만성 상처 패턴이 보인다. 이것은 두 사람의 데이터가 있어야만 작동하는 궁합 전용 교차 패턴이다.",
        "impact": 7
      }
    ],
    "바라는 것": [
      {
        "id": "P-RLC-028",
        "tier": "A",
        "name": "공망 궁위의 결핍 × 공망 충전 시기: 바라는 것의 급변점",
        "tags": [
          "condition:lack",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:gongmang"
        ],
        "saju": "공망 해당 궁위(GONGMANG_GUNGWI_KW), 공망 충전 시기(GONGMANG_FILL_KW), 대운/세운에서 공망 지지 진입 여부",
        "mbti": ": N/A",
        "cross": "비어있는 자리는 '구조적으로 결핍된 공간'이라는 독특한 개념으로, 일반적인 에너지 부족과 질적으로 다르다. 에너지 부족은 '적은 것'이지만 비어있는 자리는 '없는 것'이며, 없는 것이 채워지는 순간의 급변은 양적 보충과는 전혀 다른 경험이다.",
        "impact": 7
      },
      {
        "id": "P-RLC-031",
        "tier": "A",
        "name": "열등기능의 은밀한 갈망: 연인에게 투사되는 그림자 욕구",
        "tags": [
          "unsung:사",
          "uses:inferior",
          "intensity:88",
          "uses:intensity",
          "uses:shadow",
          "ref:MT_LOVE",
          "ref:MT_AXES"
        ],
        "saju": "N/A",
        "mbti": ": 열등기능(MT_TYPES[type].stack[3]) + MT_AXES[해당축].seesaw + F/T 축 강도(MT_INTENSITY_PROFILES.F/T: 55/68/88) + MT_LOVE[type].attract + MT_STACK_POSITIONS.inferior",
        "cross": "MBTI 단독 패턴. 성향의 양극 구조에서 나타나는 시소 역학과 각 축의 강도가 결합하여 '자신도 모르게 상대에게 바라는 것의 강도'를 설명하는 것은 MBTI 고유의 메커니즘이다.",
        "impact": 9
      },
      {
        "id": "P-RLC-030",
        "tier": "A",
        "name": "조후 결핍 × 용신 방향 × 계절: 본능적으로 끌리는 에너지의 온도",
        "tags": [
          "condition:lack",
          "pillar:월지",
          "unsung:절",
          "uses:johu",
          "uses:yongshin"
        ],
        "saju": "조후용신(gg.johuNeeds/johuYongshin/johuDesc), 월지 계절(ST5_JOHU), 용신 오행(SJ_extractYongshinOh)",
        "mbti": ": N/A",
        "cross": "계절적 에너지 결핍은 태어난 계절에서 파생되는 '온도적 결핍'으로, 에너지 균형 보완이나 에너지 소통 보완과는 독립적인 별도의 관점이다. 같은 '따뜻한 에너지가 필요하다'는 결론이라도 계절 균형에서 온 경우(따뜻함 자체가 필요)와 에너지 균형에서 온 경우(표현력이 필요)는 연인에게 바라는 것의 질이 다르다.",
        "impact": 7
      },
      {
        "id": "P-RLC-034",
        "tier": "A",
        "name": "coreFear의 반전 투사: 연인에게 바라는 것의 최심층",
        "tags": [
          "unsung:사",
          "cf:Fe",
          "cf:Ne",
          "uses:inferior",
          "stress:grip",
          "ref:MT_LOVE"
        ],
        "saju": "N/A",
        "mbti": ": MT_TYPES[type].coreFear + MT_TYPES[type].coreNeed + 열등기능 그립(MT_STRESS_STAGES.stage4_grip.examples) + MT_LOVE[type].dealbreaker",
        "cross": "MBTI 단독 패턴. 가장 깊은 두려움에서 출발하여 핵심 바람, 관계를 끝내게 만드는 방아쇠, 한계에 몰렸을 때의 반응으로 이어지는 흐름이 '바라는 것의 가장 깊은 층'을 설명하며, 이 흐름은 성격 구조에서 일관되게 나온다.",
        "impact": 9
      },
      {
        "id": "P-RLC-029",
        "tier": "A",
        "name": "격국 파격의 구체적 양상 × 일지 십성: 연인에게 투사하는 미해결 과제",
        "tags": [
          "uses:gyeokguk",
          "pillar:일지",
          "unsung:사",
          "unsung:양",
          "condition:패격",
          "uses:sipsung_rel"
        ],
        "saju": "격국 파격 상세(JAPYEONG_GG[격국].breaks[].condition/effect/remedy), 일지 정기 십성(SS_CONTEXT[십성].spouse), 파격 여부(gg.pagyeokInfo)",
        "mbti": ": N/A",
        "cross": "에너지 구조의 뒤틀림은 단순한 에너지 과다/부족이 아니라 '특정 에너지 조합의 역학적 실패'이므로, 일반적인 해석 공식보다 구체적인 원인-결과를 보여준다. 이 구체적 실패가 연인에게 투사되는 메커니즘은 연인 자리의 에너지 성격이라는 별도 변수가 방향을 결정할 때만 완전히 설명된다.",
        "impact": 8
      },
      {
        "id": "P-RLC-027",
        "tier": "A",
        "name": "대운 십성 전환 × 용신 방향: 바라는 것의 10년 주기 변화",
        "tags": [
          "uses:daewoon",
          "uses:yongshin"
        ],
        "saju": "현재 대운 십성(DW_SIPSUNG_KW[십성그룹].strong/weak), 이전 대운 십성(DW_TRANSITION_KW[전환키]), 용신 오행/십성(gg.yongshin)",
        "mbti": ": N/A",
        "cross": "가장 필요한 에너지는 평생 변하지 않는 근본 결핍이고, 큰 흐름의 에너지 성격은 주기적으로 바뀌는 시대적 에너지다. 두 시간축(고정 vs 변동)의 교차가 '바라는 것의 시간적 층위'를 만든다. 단일 변수로는 이 시간적 간극을 설명할 수 없다.",
        "impact": 7
      },
      {
        "id": "P-RLC-026",
        "tier": "A",
        "name": "5신 체계에서 연인 일간 오행의 위치: 연인이 치료제인가 독약인가",
        "tags": [
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "용신 오행(SJ_extractYongshinOh), 5신 배정(SJ_calcOsinChegye), 연인 일간 오행(dmEl), 5신 라벨(SJ_getOsinLabel)",
        "mbti": ": N/A",
        "cross": "이 에너지 역할 체계는 각 사람에게 가장 필요한 에너지를 기준으로 나머지 에너지들이 도움이 되는지, 방해가 되는지, 중립인지를 개인별로 다르게 판단한다. 단순히 에너지끼리 잘 맞는지를 보는 범용 궁합과 달리, '이 특정 사람에게 이 에너지가 어떤 의미인가'를 개인화하여 보는 것이 핵심 차이다.",
        "impact": 8
      },
      {
        "id": "P-RLC-032",
        "tier": "A",
        "name": "루프 상태에서 바라는 것의 급변: 차단된 부기능을 연인에게 기대",
        "tags": [
          "unsung:태",
          "uses:auxiliary",
          "stress:loop",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": 루프 패턴(MT_STRESS_STAGES.stage3_loop.examples[유형]) + 부기능(MT_TYPES[type].stack[1]) + MT_LOVE[type].needsFromOther(→MT_CONFLICT_STYLES) + MT_FUNCTIONS[부기능]",
        "cross": "MBTI 단독 분석이다. 악순환 상태는 MBTI 고유의 프레임워크로, 자신이 가장 편하게 쓰는 방식 다음으로 의지하는 성향이 막힐 때 관계에 대한 기대가 급변하는 과정을 보여준다.",
        "impact": 8
      },
      {
        "id": "P-RLC-025",
        "tier": "A",
        "name": "용신 방향 × 격국 파격 조건 × 일지 십성: 바라는 것의 3층 정합성",
        "tags": [
          "uses:gyeokguk",
          "pillar:일지",
          "condition:패격",
          "uses:yongshin",
          "uses:sipsung_rel"
        ],
        "saju": "용신 오행/십성(gg.yongshin + SJ_extractYongshinOh), 격국 파격 조건(JAPYEONG_GG[격국].breaks), 일지 정기 십성(SS_CONTEXT[십성].spouse)",
        "mbti": ": N/A",
        "cross": "단일 변수만으로는 '바라는 것의 내적 모순'을 설명할 수 없다. 이 사람에게 가장 필요한 에너지, 배우자에 대한 무의식적 기대, 그 외 변수들이 서로 맞는지 어긋나는지가 바라는 것의 복잡성 자체를 입체적으로 보여준다.",
        "impact": 9
      },
      {
        "id": "P-RLC-040",
        "tier": "B",
        "name": "관계 유형에 따른 상호 바라는 것의 구조: 쌍대/거울/충돌 역학",
        "tags": [
          "unsung:양",
          "relation:충",
          "cf:Fe",
          "cf:Ne",
          "ref:MT_RELATION"
        ],
        "saju": "N/A",
        "mbti": ": MT_RELATION_TYPES[관계유형] + MT_RELATION_MATRIX[조합].note + MT_TYPES[양쪽type].coreNeed/coreFear",
        "cross": "MBTI 단독 패턴. 두 사람이 서로에게 바라는 것이 얼마나 맞는지를 성향 조합으로 분류하는 것은 MBTI 고유의 관계 분석 방식이다.",
        "impact": 8
      },
      {
        "id": "P-RLC-039",
        "tier": "B",
        "name": "바라는 것의 의사결정 순서: 인지기능 우선순위가 결정하는 욕구 층위",
        "tags": [
          "unsung:사",
          "ref:MT_LOVE",
          "ref:MT_DECISION"
        ],
        "saju": "N/A",
        "mbti": ": MT_DECISION_PROCESS[type].flow + MT_DECISION_PROCESS[type].blind + MT_LOVE[type].deepRelation + MT_LOVE[type].growthInLove",
        "cross": "MBTI 단독 패턴. 무언가를 결정할 때 자연스럽게 거치는 심리적 순서가 연인에게 바라는 것을 4단계로 보여주고, 평소에 잘 의식하지 못하는 영역이 '미처 몰랐던 욕구'를 드러낸다. 이 순서 구조는 사주에 대응하는 개념이 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-042",
        "tier": "B",
        "name": "통변 공식 유형 × 용신 방향: 연인에게 바라는 것의 구조적 프레임",
        "tags": [
          "uses:tongbyeon",
          "uses:yongshin"
        ],
        "saju": "SJ_detectTongbyeon 결과(tongbyeons[].name/type), 용신 오행/십성(gg.yongshin)",
        "mbti": ": N/A",
        "cross": "사주 단독 패턴. 에너지가 어떤 방향으로 흐르는지의 구조가 '바라는 것의 큰 틀'을 잡아주고, 이 사람에게 가장 필요한 에너지가 '무엇을 가장 먼저 원하는가'를 결정하여 두 가지가 함께 작동한다.",
        "impact": 7
      },
      {
        "id": "P-RLC-033",
        "tier": "B",
        "name": "바라는 것의 표현 채널: 상호작용 스타일에 따른 전달 방식",
        "tags": [
          "axis:JP",
          "intensity:88",
          "uses:intensity",
          "ref:MT_CONFLICT",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "N/A",
        "mbti": ": MT_INTERACTION_STYLES[type] + MT_CONFLICT_STYLES[type].communication + J/P 축 강도(MT_INTENSITY_PROFILES.J/P: 55/68/88)",
        "cross": "MBTI 단독 패턴. 대인 상호작용 스타일과 J/P 성향의 강도가 결합하여 '바라는 것을 어떻게 전달하는가'를 4가지 방식으로 나누는 것은 MBTI 고유의 관계 분석 방식이다.",
        "impact": 6
      },
      {
        "id": "P-RLC-035",
        "tier": "B",
        "name": "기질별 핵심 욕구 × 연애 패턴: 4기질이 바라는 것의 대분류",
        "tags": [
          "cf:Ne",
          "ref:MT_LOVE",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "N/A",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_TEMPERAMENTS[기질].conflict + MT_LOVE[type].deepRelation + MT_LOVE[type].growthInLove",
        "cross": "MBTI 단독 패턴. 4가지 기질 분류가 바라는 것의 가장 큰 범주를 제공하며, 기질이 서로 다를 때 관계 갈등의 가장 근본적인 원인이 된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-041",
        "tier": "B",
        "name": "육친론 × 일지 십성 × 원국 십성 분포: 연인에게 바라는 역할의 의식/무의식 모순",
        "tags": [
          "pillar:일지",
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별], 일지 정기 십성(SS_CONTEXT[십성].spouse), 원국 십성 분포(gg.cnt)",
        "mbti": ": N/A",
        "cross": "사주 단독 패턴. 관계 에너지의 성별 분화 방식, 배우자에 대한 무의식적 기대, 원국 전체의 의식적 필요라는 세 변수가 '바라는 것의 의식과 무의식 사이의 모순'을 잘 드러내준다.",
        "impact": 7
      },
      {
        "id": "P-RLC-037",
        "tier": "S",
        "name": "루프 진입 시기의 바라는 것 급변: 인지기능 루프 × 기신 대운/충 시기",
        "tags": [
          "relation:충",
          "uses:daewoon",
          "uses:auxiliary",
          "stress:loop"
        ],
        "saju": "기신 대운 또는 원국 충 발동 시기(DW_SIPSUNG_KW[기신그룹] + SJ_buildWonkukRelations의 충/형 궁위)",
        "mbti": ": 루프 패턴(MT_STRESS_STAGES.stage3_loop.examples[유형]) + 부기능 차단(MT_TYPES[type].stack[1]) + MT_FUNCTIONS[부기능].valuesKeyword",
        "cross": "MBTI만으로는 특정 심리 악순환의 심리적 과정과 바라는 것의 변화를 설명하지만, '언제 그 상태에 빠질 가능성이 높은가'를 시간적으로 예측하지 못한다. 사주만으로는 흐름이 좋지 않은 시기의 스트레스를 설명하지만, 그 스트레스가 '관계에서 바라는 것을 어떻게 왜곡하는가'의 심리적 과정을 설명하지 못한다. 두 가지를 교차하면 '이 사람이 힘든 10년 흐름 3년차에 특정 심리 상태에 빠져 연인에게 과도한 역할을 기대하게 된다'는 시기·과정·결과를 함께 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-036",
        "tier": "S",
        "name": "열등기능 갈망의 시간적 활성화: 인지기능 발달 단계 × 대운 십성 전환",
        "tags": [
          "uses:daewoon",
          "uses:development",
          "uses:inferior",
          "ref:MT_LOVE"
        ],
        "saju": "대운 십성 전환(DW_SIPSUNG_KW[십성그룹] + DW_TRANSITION_KW[전환키]) + 현재 나이대(AGE_DW_KW)",
        "mbti": ": 인지기능 발달 단계(MT_DEVELOPMENT_STAGES: 35-50세 열등기능 대면) + 열등기능(MT_TYPES[type].stack[3]) + MT_LOVE[type].growthInLove",
        "cross": "MBTI만으로는 자신이 가장 불편해하는 성향과 본격적으로 마주하는 시기가 '35~50세 어딘가'라는 넓은 범위밖에 못 준다. 사주의 10년 흐름 전환이 개인별 시기를 구체적으로 짚어준다. 사주만으로는 10년 흐름의 에너지가 '심리적으로 어떤 갈망을 깨우는가'를 설명하지 못한다. 두 가지를 교차하면 '이 사람이 42세에 재물 에너지의 10년 흐름에 들어서면서 그동안 외면해온 성향이 깨어나 연인에게 바라는 것이 근본적으로 바뀐다'는 개인별 타이밍을 구체적으로 볼 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-038",
        "tier": "S",
        "name": "열등기능 투사 강도 × 관계 에너지 지속성: 갈망의 깊이와 지구력",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "pillar:일지",
          "uses:unsung",
          "unsung:사",
          "uses:inferior",
          "axis:SN",
          "intensity:88",
          "uses:intensity",
          "ref:MT_AXES"
        ],
        "saju": "신강도 5등급(극신강~극신약) + 일지 12운성(SJ_UNSUNG_MEANING[운성].spouse)",
        "mbti": ": 열등기능 투사 강도(MT_AXES[해당축].seesaw 기반) + F/T 또는 S/N 축 강도(MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "MBTI만으로는 가장 약한 성향이 상대방에게 투영되는 심리적 강도를 설명하지만, 그 투영을 관계 안에서 얼마나 지속적으로 유지할 에너지가 있는지는 설명하지 못한다. 사주만으로는 관계 에너지의 총량과 리듬을 설명하지만, 그 에너지가 심리적으로 어떤 갈망을 향하는지는 설명하지 못한다. 두 체계를 교차하면 '갈망의 방향과 깊이(MBTI)'와 '갈망을 유지하는 지구력과 리듬(사주)'이라는 두 차원의 프로필이 완성된다.",
        "impact": 7
      }
    ],
    "상대 눈에 비친 나": [
      {
        "id": "P-RLC-061",
        "tier": "A",
        "name": "B의 기신 오행 × A의 일간 오행 관계: 상대가 나에게 무의식적으로 예민해지는 구조",
        "tags": [
          "unsung:사",
          "uses:yongshin"
        ],
        "saju": "SJ_calcOsinChegye(B용신오행) → B의 기신 오행. A의 일간 오행(sajuA.dmEl). 둘 사이의 관계: 동일/상생/상극/무관",
        "mbti": ": N/A",
        "cross": "한 사람 내부의 민감 지점을 보는 패턴이 있다면, 이 패턴은 '상대방의 방해 에너지와 나의 존재가 어떤 관계인가'라는 궁합적 교차다. 에너지 역할 체계로 '나는 상대에게 전반적으로 약인가 독인가'를 거시적으로 판정하는 것과 달리, 이 패턴은 '상대의 특정 약점을 내가 건드리는가 해소하는가'를 미시적으로 판정한다. 두 가지 모두 필요하다.",
        "impact": 7
      },
      {
        "id": "P-RLC-058",
        "tier": "A",
        "name": "B→A 십성 × B 격국 유형: 상대가 나를 쓰는 방식",
        "tags": [
          "uses:gyeokguk",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(rB.dg, rA.dg) → B→A 십성 10종, gg_B.gyeokgukName → 격국 10종",
        "mbti": ": N/A",
        "cross": "상대가 나를 어떤 에너지로 보는지만으로는 '나는 상대에게 안정 수입 같은 존재다'에 그치지만, 상대의 에너지 구조를 교차하면 '왜 상대가 나를 그렇게 필요로 하는가'의 구조적 이유가 나온다. 재능 표현 에너지가 강한 상대가 나를 안정 수입으로 보면 '재능을 현금화해주는 파트너'이고, 안정 질서 에너지가 강한 상대가 나를 안정 수입으로 보면 '명예의 기반을 닦아주는 내조자'이다. 이 차이는 에너지 성격만으로는 설명할 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-059",
        "tier": "A",
        "name": "B의 5신 위치(A 일간) × B의 조후 결핍: 나는 상대에게 약인가 독인가 — 이중 판정",
        "tags": [
          "condition:lack",
          "uses:johu",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(B용신오행) → A일간오행의 5신 라벨(용신/희신/한신/구신/기신), gg_B.johuNeeds(조후 필요 오행)",
        "mbti": ": N/A",
        "cross": "에너지 역할 체계만 보면 원국 균형 기반의 이성적 판정에 그치지만, 계절적 온도 균형을 교차하면 '왜 끌리는지의 본능적 차원(온도)'까지 설명된다. 에너지 역할 체계는 원국 균형 기반 이성적 판정이고, 계절 균형은 체감적 판정이다. 겨울에 태어난 상대에게 따뜻한 에너지를 가진 사람은 에너지 역할과 무관하게 '따뜻하다'고 느껴진다. 두 판정이 일치하면 '운명적 끌림'의 구조적 근거가 되고, 불일치하면 '끌리는데 왜 불편하지?'의 원인이 된다.",
        "impact": 9
      },
      {
        "id": "P-RLC-060",
        "tier": "A",
        "name": "B의 월간 십성(사회적 페르소나) × B의 일지 십성(무의식): 상대가 나를 대하는 겉과 속",
        "tags": [
          "pillar:일지",
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "B의 월간 십성: getSipsung(rB.dg, rB.mg), B의 일지 정기 십성: jiSS_B[2].ss",
        "mbti": ": N/A",
        "cross": "사회적으로 드러내는 모습과 무의식적 기대는 서로 다른 심리층에서 작동한다. 이 두 층의 불일치가 클수록 상대는 '읽히지 않는 사람'이 되고, 나는 그 사람의 진심을 파악하기 어려워진다. 궁합 상담에서 '그 사람이 날 좋아하는 건지 모르겠어요'라는 말의 구조적 원인이 여기에 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-064",
        "tier": "B",
        "name": "B의 열등기능 자극 강도 × A의 해당 기능 성숙도: 상대가 나를 통해 경험하는 성장 vs 위협",
        "tags": [
          "unsung:양",
          "uses:inferior",
          "stress:grip",
          "ref:MT_MATURITY"
        ],
        "saju": "N/A",
        "mbti": ": MT_TYPES[B].stack[3] (B의 열등기능), MT_TYPES[A].stack에서 해당 기능의 위치 (A가 이 기능을 얼마나 자연스럽게 쓰는가), MT_MATURITY[해당기능] (immature/developing/mature), MT_STRESS_STAGES.stage4_grip[B유형] (B가 그립에 빠질 때의 양상)",
        "cross": "MBTI만으로 분석한다. 같은 성향이라도 얼마나 균형 있게 발달했느냐에 따라 상대 눈에 비친 내 모습이 성장을 돕는 존재에서 위협적인 존재로 완전히 뒤집힌다. 사주는 에너지의 양과 질을 구분하지만 '심리적 성숙도'라는 발달의 차원은 MBTI가 고유하게 설명할 수 있는 영역이다.",
        "impact": 7
      },
      {
        "id": "P-RLC-063",
        "tier": "B",
        "name": "B의 인지기능 스택에서 A 주기능의 위치: 상대가 나를 자연스럽다고 느끼는가 이질적이라고 느끼는가",
        "tags": [
          "uses:dominant",
          "uses:shadow"
        ],
        "saju": "N/A",
        "mbti": ": MT_TYPES[B].stack (4기능 위치에서 A의 주기능 MT_TYPES[A].stack[0]이 어디에 있는지 매칭), MT_SHADOW_BY_TYPE[B] (A의 주기능이 그림자 영역에 있는 경우)",
        "cross": "MBTI 단독 분석이다. 사주의 에너지 성격 분류와 달리, 각 성향의 위치는 '상대의 어떤 사고 과정이 나에게 어떤 심리적 반응을 일으키는가'를 설명한다. 에너지 성격이 역할(재물, 명예, 학습 등)을 부여한다면, 각 성향의 위치는 심리적 편안함, 이질감, 위협감이 생기는 이유를 설명한다.",
        "impact": 6
      },
      {
        "id": "P-RLC-065",
        "tier": "S",
        "name": "B의 5신 체계에서 A의 위치 × B의 인지기능 스택에서 A 주기능의 위치: 에너지적 필요와 심리적 인식의 정합성",
        "tags": [
          "condition:lack",
          "uses:johu",
          "uses:yongshin",
          "uses:osin",
          "uses:dominant",
          "uses:auxiliary",
          "uses:shadow",
          "ref:MT_RELATION"
        ],
        "saju": "SJ_calcOsinChegye(B의 용신 오행 기준) → A의 일간 오행이 B에게 용신/희신/한신/구신/기신 중 어디인지, gg_B.johuNeeds (B의 조후 결핍 오행)",
        "mbti": ": MT_TYPES[B].stack에서 A의 주기능 MT_TYPES[A].stack[0]의 위치 (주기능/부기능/3차/열등/그림자), MT_RELATION_TYPES[해당관계유형]",
        "cross": "사주의 에너지 균형 체계는 '이 사람이 내게 필요한가'를 판단하고, MBTI의 성향 조합은 '이 사람과 함께 있을 때 편안한가'를 판단한다. 필요하다고 반드시 편안한 것은 아니고, 편안하다고 반드시 필요한 것도 아니다. 이 일치와 불일치가 관계의 질을 결정한다. 어느 한 체계만으로는 이 두 가지를 동시에 설명할 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-062",
        "tier": "S",
        "name": "B의 배우자궁 기대 십성 × B→A 실제 십성: 기대와 현실의 매칭 정도",
        "tags": [
          "pillar:일지",
          "uses:sipsung_rel"
        ],
        "saju": "B의 일지 정기 십성(jiSS_B[2].ss) = B가 배우자에게 기대하는 역할. getSipsung(rB.dg, rA.dg) = B가 A에게서 실제로 받는 십성 에너지",
        "mbti": ": N/A",
        "cross": "배우자에 대한 무의식적 기대와 에너지 생명력의 교차가 내가 배우자에게 기대하는 패턴이었다면, 이 분석은 상대의 기대와 내가 실제로 제공하는 에너지의 매칭이라는 '궁합적 교차'다. 배우자에 대한 무의식적 기대(내면의 기대)와 실제 에너지 성격(현실적 에너지)은 독립적으로 결정되므로 불일치가 자연스럽게 발생할 수 있다. 이 불일치의 크기와 방향이 '상대 눈에 비친 나의 만족도 또는 불만족도'를 결정한다.",
        "impact": 8
      }
    ],
    "소통법": [
      {
        "id": "P-RLC-104",
        "tier": "A",
        "name": "월간 십성(사회적 페르소나) 교차: 대화에서 꺼내 쓰는 도구",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(rA.dg, rA.mg) = A의 월간 십성, getSipsung(rB.dg, rB.mg) = B의 월간 십성, getSipsung(rA.dg, rB.mg) = A가 느끼는 B의 사회적 에너지, getSipsung(rB.dg, rA.mg) = B가 느끼는 A의 사회적 에너지",
        "mbti": ": N/A",
        "cross": "월간(사회/직업 자리)의 교차는 일간(나 자신)의 교차와는 다른 차원의 이야기다. 일간이 '이 사람이 근본적으로 나에게 어떤 존재인가'를 말해준다면, 월간은 '이 사람이 실제로 말할 때 어떤 느낌인가'를 말해준다. 예를 들어 일간이 안정적 파트너 에너지인데 월간이 카리스마/압박 에너지라면, '좋은 사람인 건 아는데 말투가 무서워'라는 느낌이 된다. 이 두 자리 사이의 갭이 소통 오해의 핵심 구조라고 볼 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-106",
        "tier": "A",
        "name": "조후 온도 차이 × 과잉 오행 감정 질감: 소통 속도와 온도의 미스매치",
        "tags": [
          "condition:excess",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "gg_A.season + gg_A.johuNeeds vs gg_B.season + gg_B.johuNeeds, sajuA.elFull의 과잉 오행(≥3) vs sajuB.elFull의 과잉 오행(≥3), OHENG_KW[오행].excess",
        "mbti": ": N/A",
        "cross": "계절 온도 차이만으로는 소통 속도의 빠르고 느림만 알 수 있고, 과잉 에너지만으로는 개인의 말투만 알 수 있다. 두 가지를 함께 보면 커플 간 소통 속도와 질감의 간극이 드러난다. 불 에너지가 강한 계절에 불 에너지가 과다한 사람 대 금속 에너지가 강한 계절에 금속 에너지가 과다한 사람이라면, 한쪽은 불처럼 쏟아붓는데 다른 쪽은 칼로 자르듯 받아치는 극적인 미스매치가 된다. 같은 계절에 같은 과잉 에너지라면 리듬은 맞지만 새로운 관점이 없다. 이 교차가 '왜 타이밍이 안 맞는가'의 핵심 답이다.",
        "impact": 7
      },
      {
        "id": "P-RLC-109",
        "tier": "A",
        "name": "일지 12운성 × 배우자궁 십성: 내밀한 대화의 깊이와 한계",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:sipsung_rel"
        ],
        "saju": "sajuA.uns[2](A의 일지 12운성) + sajuB.uns[2](B의 일지 12운성) + jiSS_A[2].ss(A의 배우자궁 십성) + jiSS_B[2].ss(B의 배우자궁 십성) + SJ_UNSUNG_MEANING[운성].spouse + SS_CONTEXT[십성].spouse",
        "mbti": ": N/A",
        "cross": "에너지 생명력만으로는 대화할 때의 에너지 상태만 알 수 있다. 예를 들어 에너지가 가장 왕성한 상태라면 강하고 활발한 대화가 되고, 에너지가 끊긴 상태라면 약하고 소극적인 대화가 된다. 배우자에 대한 무의식적 기대만으로는 대화의 내용과 방향만 알 수 있다. 재능/표현 에너지라면 편안한 대화, 카리스마/압박 에너지라면 긴장된 대화가 된다. 이 둘을 함께 보면 '어떤 강도로, 어떤 내용의 깊은 대화가 가능한가'가 비로소 드러난다. 에너지가 강하고 표현이 편안한 조합이라면 강하고 따뜻한 깊은 대화가 가능한 최상의 소통이 되고, 에너지도 약한데 긴장감까지 더해지는 조합이라면 깊은 대화 자체가 트라우마가 될 수 있다. 이 조합이 '이 커플이 속마음을 얼마나 편하게 나눌 수 있는가'를 가늠하는 핵심 지표다.",
        "impact": 7
      },
      {
        "id": "P-RLC-103",
        "tier": "A",
        "name": "일간 오행 상호관계 × 식상/인성 분포 비율: 소통의 기본 구조",
        "tags": [
          "ss:인성",
          "ss:식상"
        ],
        "saju": "일간 오행 상호관계(상생/상극/비화) + 쌍방 식상(gg.cnt['식상']) 및 인성(gg.cnt['인성']) 분포 비율",
        "mbti": ": N/A",
        "cross": "두 사람의 에너지 관계가 소통의 기본 호환성을 결정하고, 표현 에너지와 학습 에너지의 비율이 소통의 방향과 양을 결정한다. 이 두 변수를 함께 보면 소통 구조의 네 가지 유형이 나온다. ①에너지가 서로 살려주고 표현·학습 에너지가 균형 잡힌 경우는 이상적인 소통, ②에너지가 서로 살려주지만 표현 에너지가 한쪽으로 치우친 경우는 한쪽만 말하는 편향적 소통, ③에너지가 서로 부딪히지만 표현·학습 에너지가 균형 잡힌 경우는 말은 하는데 잘 안 먹히는 노력형 소통, ④에너지가 서로 부딪히고 표현 에너지도 치우친 경우는 말해도 안 통하고 안 말해도 답답한 좌절형 소통이다. 에너지 관계만으로는 소통의 양을 알 수 없고, 표현·학습 에너지만으로는 소통의 질감을 알 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-105",
        "tier": "A",
        "name": "천간합 궁위(특히 월간합) × 충·형·해 궁위: 소통의 열린 채널과 닫힌 채널",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:월간",
          "relation:충",
          "relation:천간합",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L1 천간합(월간끼리 합 여부, 일간합 여부) + L2 지지 충·형·해(월지끼리, 일지끼리 여부) + HAP_GUNGWI_KW + CHUNG_GUNGWI_KW",
        "mbti": ": N/A",
        "cross": "에너지 결합과 충돌이 서로 다른 자리에 동시에 존재하면 대화 주제별 소통 격차가 생긴다. 사회·직업 자리에서 결합되고 본인 자리에서 충돌하면 밖에서는 베프인데 집에서는 못 말하는 것이 있는 커플이 된다. 본인 자리에서 결합되고 사회·직업 자리에서 충돌하면 속은 통하는데 현실적 대화가 안 되는 커플이 된다. 이 자리별 조합이 어디서 말이 통하고 어디서 막히는가의 지도를 그린다. 결합만 보면 막히는 영역을 모르고, 충돌만 보면 통하는 영역을 모른다.",
        "impact": 8
      },
      {
        "id": "P-RLC-108",
        "tier": "A",
        "name": "강약 궁합 × 식상/인성 비대칭: 소통 주도권의 구조적 편향",
        "tags": [
          "ss:인성",
          "ss:식상",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L16 강약궁합(쌍강/쌍약/A강B약/B강A약/균형) + gg_A.cnt['식상'] vs gg_B.cnt['식상'], gg_A.cnt['인성'] vs gg_B.cnt['인성']",
        "mbti": ": N/A",
        "cross": "에너지 강약만으로는 밀어붙이는 정도만 알 수 있고, 표현 에너지와 학습 에너지의 비율만으로는 말하는 성향과 듣는 성향만 알 수 있다. 두 가지를 함께 보면 소통 주도권이 어디에 고정되는지의 구조적 패턴이 드러난다. 에너지가 강한데 학습 에너지도 강하면 자기 주장이 강하지만 남의 말도 듣는 의외의 조합으로 소통에서 유리하다. 에너지가 약한데 표현 에너지가 강하면 힘은 없는데 할 말은 다 하는 사람이 되어 상대에게 혼란을 줄 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-110",
        "tier": "B",
        "name": "납음 관계 유형 × 일간 물상: 소통의 상징적 리듬",
        "tags": [
          "uses:mulsang",
          "uses:napeum",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L12 납음궁합(napeum.rel: 상생/비화/상극/무관) + NAPEUM_STORY[납음명] + MULSANG_GAN[A일간] + MULSANG_GAN[B일간]",
        "mbti": ": N/A",
        "cross": "60갑자의 자연물 상징만으로는 관계의 추상적 리듬을 알 수 있고, 개인의 에너지 이미지만으로는 개인의 분위기를 알 수 있다. 두 가지를 함께 보면 이 커플의 대화가 어떤 풍경인지를 감각적으로 표현할 수 있다. 이것은 수치로 측정하는 분석이 아니라 풀이에서 느낌을 전달하는 도구다. 바다 속 금속 에너지와 화로 불 에너지의 커플은 깊은 바다에서 불꽃을 찾는 대화처럼 쉽지 않지만 찾으면 보석 같은 관계다. 이 상징적 차원은 다른 분석에서는 접근할 수 없는 고유한 가치를 가진다.",
        "impact": 5
      },
      {
        "id": "P-RLC-107",
        "tier": "S",
        "name": "용신 궁합 × B→A 십성: 소통 수용성의 이중 결정",
        "tags": [
          "uses:yongshin",
          "uses:gunghap",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGunghap L7 용신궁합(bForA: B가 A의 용신 오행을 얼마나 보유, aForB: A가 B의 용신 오행을 얼마나 보유) + analyzeGunghap L6 십성관계(ssAtoB, ssBtoA) + SJ_getOsinLabel(A의 5신 체계에서 B 일간 오행의 위치)",
        "mbti": ": N/A",
        "cross": "가장 필요한 에너지 궁합만으로는 '에너지적으로 받아들이기 쉬운가'만 알 수 있고, 에너지 성격만으로는 '상대를 어떤 역할로 느끼는가'만 알 수 있다. 이 둘을 함께 보면 '내용의 수용성과 형식의 수용성'이 동시에 드러난다. 에너지 보완이 잘 되는데 카리스마/압박 에너지라면 '쓴 약이지만 효과는 있는' 소통이 되고, 에너지 보완이 잘 안 되는데 재능/표현 에너지라면 '달콤하지만 영양은 없는' 소통이 된다. 이 교차가 '왜 좋은 말인데 안 먹히는가' 혹은 '왜 거친 말인데 효과가 있는가'에 대한 답을 준다.",
        "impact": 8
      }
    ],
    "연애 스타일": [
      {
        "id": "P-RLC-020",
        "tier": "A",
        "name": "연애에서의 에너지 방향과 충전 — E/I 강도 × 관계 리듬",
        "tags": [
          "uses:strength",
          "pillar:일지",
          "uses:unsung",
          "relation:충",
          "axis:EI",
          "intensity:88",
          "uses:intensity",
          "ref:MT_LOVE",
          "ref:MT_SELFCARE"
        ],
        "saju": "신강도 5등급 + 일지 12운성(SJ_UNSUNG_MEANING[운성].spouse)",
        "mbti": ": E/I 축 강도(MT_INTENSITY_PROFILES.E/I: 55/68/88) + 자기돌봄 패턴(MT_SELFCARE[type].recharge) + 연애 패턴(MT_LOVE[type].deepRelation)",
        "cross": "사주만으로는 에너지 총량과 리듬을 알 수 있고, MBTI만으로는 에너지 방향과 충전 방식을 알 수 있다. 두 가지를 함께 보면 '이 사람의 관계 에너지가 얼마나 × 어디서 충전되고 × 어떤 리듬으로 흐르는가'라는 입체적인 에너지 지도가 그려진다. 특히 에너지 총량과 충전 방식이 불일치할 때, 즉 에너지는 강한데 혼자 충전하는 내향형이거나 에너지는 약한데 외부에서 충전이 필요한 외향형일 때, 관계에서 독특한 역설이 나타난다. 이것은 두 가지를 함께 볼 때만 포착할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-018",
        "tier": "A",
        "name": "시기별 연애 페르소나 — 인지기능 발달 단계 × 대운 십성 주기",
        "tags": [
          "uses:daewoon",
          "uses:development",
          "uses:inferior",
          "uses:tertiary",
          "ref:MT_LOVE"
        ],
        "saju": "현재 대운 십성 그룹(DW_SIPSUNG_KW) + 나이대(AGE_DW_KW)",
        "mbti": ": 인지기능 발달 단계(MT_DEVELOPMENT_STAGES) + 3차기능/열등기능 발달(MT_STACK_POSITIONS.tertiary/inferior) + 연애 성장 방향(MT_LOVE[type].growthInLove)",
        "cross": "사주만으로는 '이 10년의 외적 에너지 테마'만 알 수 있고, MBTI만으로는 '이 나이대의 심리적 발달 과제'만 알 수 있다. 이 둘을 함께 보면 외적 에너지 테마와 내적 발달 과제가 같은 방향인지(시너지), 다른 방향인지(갈등)를 파악할 수 있다. 표현 에너지가 강한 시기에 새로운 가능성을 탐색하는 심리적 발달이 겹치면 표현이 폭발적으로 확장되는 시너지가 생기고, 명예 에너지가 강한 시기에 책임감을 통합하는 발달 과제가 겹쳐도 시너지가 된다. 반면 재물 에너지가 강한 시기에 내면 가치를 탐색하는 발달 과제가 겹치면 '돈을 벌어야 하는데 가치를 찾고 싶다'는 갈등이 생길 수 있다. 시간의 흐름 속에서 이런 조화와 불협화를 동시에 읽는 것은 두 체계를 함께 볼 때만 가능하다.",
        "impact": 7
      },
      {
        "id": "P-RLC-019",
        "tier": "A",
        "name": "사랑의 성숙도 레벨 — 인지기능 성숙도 × 격국 발현 수준",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:johu",
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_LOVE",
          "ref:MT_CONFLICT",
          "ref:MT_MATURITY"
        ],
        "saju": "격국 유형(JAPYEONG_GG) + 조후(ST5_JOHU) + 격국 성패(격국의 건강한/불건강한 발현)",
        "mbti": ": 인지기능 성숙도(MT_MATURITY[주기능/부기능]) + 연애 성장 방향(MT_LOVE[type].growthInLove) + 관계 맹점(MT_CONFLICT_STYLES[type].blindSpot)",
        "cross": "사주만으로는 에너지 구조가 건강하게 발현되는지 아닌지를 알 수 있지만, 그것이 심리적으로 어떤 메커니즘인지는 설명하기 어렵다. MBTI만으로는 심리 기능의 성숙도를 알 수 있지만, 그것이 어떤 사회적 맥락에서 드러나는지는 알기 어렵다. 이 둘을 함께 보면 '이 사람의 연애 스타일이 왜 지금 이 수준인가'를 에너지 구조의 건강도와 심리 기능의 성숙도, 두 가지 축으로 동시에 파악할 수 있다. 특히 두 체계의 성숙도가 어긋날 때, 즉 에너지 구조는 건강한데 심리 기능이 미성숙하거나 그 반대인 경우, 연애에서 기묘한 불균형이 나타나는 이유가 설명된다.",
        "impact": 6
      },
      {
        "id": "P-RLC-014",
        "tier": "B",
        "name": "대운 십성 × 현재 나이대: 현재 연애 모드 패턴",
        "tags": [
          "uses:daewoon"
        ],
        "saju": "현재 대운 십성 그룹(DW_SIPSUNG_KW[십성그룹].strong/weak) + 현재 나이대(AGE_DW_KW[나이대][십성그룹])",
        "mbti": ": N/A",
        "cross": "타고난 구조를 설명하는 다른 패턴들과 달리, 이 패턴은 지금 이 시점의 연애 모드를 설명한다. 사주의 가장 큰 강점인 시간축을 연애 스타일에 적용한 것이다. 같은 사람이라도 20대와 40대의 연애 스타일이 구조적으로 다를 수밖에 없는 이유를 10년 흐름과 나이로 설명한다. 연인이 '왜 요즘 이 사람이 변한 것 같지?'라고 느끼는 현상의 구조적 원인이 여기에 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-021",
        "tier": "B",
        "name": "납음 원형 × 일지 12운성: 연애 스타일의 상징적 원형",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:ilju",
          "uses:napeum"
        ],
        "saju": "납음오행 30종(SJ_NAPEUM_TABLE[일주].name/desc) + 일지 12운성(SJ_UNSUNG_MEANING[운성].spouse)",
        "mbti": ": N/A",
        "cross": "사주만으로 분석한다. 60갑자를 30가지 자연물로 압축하는 이 분류 체계는 하늘과 땅 에너지의 조합을 상징적 이미지로 변환한다. 개별 에너지 분류나 배우자 자리 에너지 역할보다 더 통합적인 시각을 제공한다. MBTI에 대응하는 개념이 없으므로 교차 분석 대상이 아니다.",
        "impact": 4
      },
      {
        "id": "P-RLC-013",
        "tier": "B",
        "name": "음양 밸런스 × 오행 과부족: 감정 표현 색채 패턴",
        "tags": [
          "condition:excess",
          "condition:lack",
          "unsung:양",
          "uses:yinyang"
        ],
        "saju": "음양 밸런스(SJ_calcYinYang: 극양/양우세/균형/음우세/극음) + 오행 과부족(OHENG_KW[오행].excess/lack/zero)",
        "mbti": ": N/A",
        "cross": "음양은 에너지의 방향, 즉 외향적이냐 내향적이냐를 나타내고, 오행의 과부족은 에너지의 내용, 즉 무엇이 넘치고 부족한가를 나타낸다. 이 둘을 함께 보면 이 사람이 감정을 표현할 때 상대가 실제로 느끼는 체감이 결정된다. 양 에너지가 우세해도 물 에너지가 과다하면 외향적으로 보이지만 감정은 깊이 가라앉아 있고, 음 에너지가 우세해도 불 에너지가 과다하면 겉은 조용한데 속은 불타고 있어 언젠가 폭발한다. 음양만으로도, 오행만으로도 이 복합적인 체감을 설명할 수 없다.",
        "impact": 6
      },
      {
        "id": "P-RLC-022",
        "tier": "B",
        "name": "용신 방향 × 일지 십성: 핵심 필요와 무의식적 기대의 정합성",
        "tags": [
          "pillar:일지",
          "uses:yongshin",
          "uses:sipsung_rel"
        ],
        "saju": "용신 오행/십성 방향(gg.yongshin + SJ_extractYongshinOh) + 일지 정기 십성(SS_CONTEXT[십성].spouse)",
        "mbti": ": N/A",
        "cross": "사주만으로 분석한다. 가장 필요한 에너지와 배우자 자리에서 기대하는 에너지가 일치하는지 비교하는 것은 명리학 안에서도 자주 간과되는 분석이다. '좋은 사람인데 뭔가 부족한 느낌'의 구조적 원인을 설명하며, 궁합 분석에서도 상대가 내게 필요한 에너지를 채워주는가와 내가 배우자에게 기대하는 에너지를 채워주는가를 구분하는 데 핵심적이다.",
        "impact": 7
      },
      {
        "id": "P-RLC-012",
        "tier": "B",
        "name": "신강도 × 일지 12운성: 관계 에너지 지속성 패턴",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "pillar:일지",
          "uses:unsung"
        ],
        "saju": "신강도 5등급(극신강/신강/중화/신약/극신약) + 일지 12운성(SJ_UNSUNG_MEANING[운성].spouse)",
        "mbti": ": N/A",
        "cross": "연애에서 주도권의 방향과 기대의 내용이 있다면, 이 패턴은 관계의 지속성과 리듬을 설명한다. 같은 에너지가 강한 사람이라도 에너지가 절정에 달한 상태라면 폭발적으로 에너지를 쏟아내고, 원숙하게 안정된 상태라면 꾸준히 유지하며, 에너지가 끊긴 상태라면 기복이 극심하게 나타난다. 연인이 '왜 이 사람은 한동안 잘하다가 갑자기 무관심해지는지'를 에너지의 리듬으로 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-015",
        "tier": "B",
        "name": "원국 지지 합충 궁위 × 궁위 심리론: 관계 내 만성 모순 패턴",
        "tags": [
          "relation:충"
        ],
        "saju": "원국 지지 충/형/해 존재 여부(SJ_buildWonkukRelations) + 해당 궁위 조합(CHUNG_GUNGWI_KW / ST5_PILLAR_PSYCHOLOGY)",
        "mbti": ": N/A",
        "cross": "하늘 에너지의 결합과 충돌이 내면 구조를 설명한다면, 이 패턴은 땅 에너지의 결합·충돌·마찰이 생활 영역의 구조를 설명한다. 하늘 에너지는 의식 수준이고 땅 에너지는 환경과 행동 수준이다. 연인이 체감하는 '이 사람의 모순'은 대부분 땅 에너지의 충돌과 마찰이 자리별로 교차하는 데서 온다. '왜 이 부분만 유독 일관성이 없는지'를 자리 간 에너지 충돌로 설명한다.",
        "impact": 7
      },
      {
        "id": "P-RLC-011",
        "tier": "B",
        "name": "일간 물상 × 배우자궁 십성: 사랑 표현 방식 패턴",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "uses:mulsang",
          "uses:sipsung_rel"
        ],
        "saju": "일간 오행 물상(JEOKCHEONSU[일간].image/inRelation) + 일지 정기 십성(SS_CONTEXT[십성].spouse)",
        "mbti": ": N/A",
        "cross": "배우자에게 기대하는 것을 설명하는 패턴과 달리, 이 패턴은 배우자에게 실제로 주는 것을 설명한다. 같은 배우자 자리 에너지 역할이라도 나 자신의 에너지 이미지에 따라 발현 양상이 완전히 다르다. 추상적인 에너지를 구체적인 자연물 이미지로 번역하면 이 사람이 사랑할 때 어떤 느낌인가를 체감적으로 전달할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-024",
        "tier": "S",
        "name": "통변 에너지 흐름 × 의사결정 순서: 연애 의사결정의 정합성",
        "tags": [
          "condition:excess",
          "condition:lack",
          "ss:비겁",
          "ss:식상",
          "unsung:사",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_DECISION"
        ],
        "saju": "통변 공식(SJ_detectTongbyeon: 식상생재/살인상생/비겁탈재 등) + 오행 분포(과다/부족 오행)",
        "mbti": ": 의사결정 프로세스(MT_DECISION_PROCESS[type].flow/blind) + 주기능-부기능 조합(MT_TYPES[type].stack[0-1])",
        "cross": "사주의 에너지 흐름은 '어디서 어디로 흐르는가'라는 방향과 구조를 알려주고, MBTI의 의사결정 방식은 그 흐름을 '어떤 심리적 순서로 실행하는가'를 알려준다. 사주만으로는 '이 사람에게 표현 에너지가 재물 에너지로 이어지는 구조가 있다'는 정보만 있고, MBTI만으로는 '이 사람은 내면 가치를 먼저 확인하고, 가능성을 탐색하고, 경험을 정리한 뒤, 효율적으로 실행하는 순서로 결정한다'는 심리적 정보만 있다. 이 둘을 함께 보면 '표현에서 결과로 이어지는 흐름에서 가능성 탐색 단계는 자연스럽지만 효율 실행 단계에서 막힌다'는 구체적인 병목 지점이 드러난다. 이것이 연애에서 '의도는 좋은데 실행이 어긋나는 이유'를 정밀하게 설명해준다.",
        "impact": 6
      },
      {
        "id": "P-RLC-017",
        "tier": "S",
        "name": "연애 내 만성 루프 — 인지기능 루프 × 궁위 충의 구조적 모순",
        "tags": [
          "relation:충",
          "stress:loop",
          "ref:MT_CONFLICT"
        ],
        "saju": "원국 지지 충/형 궁위(SJ_buildWonkukRelations + CHUNG_GUNGWI_KW)",
        "mbti": ": 루프 패턴(MT_STRESS_STAGES.stage3_loop.examples) + 해당 유형 갈등 스타일(MT_CONFLICT_STYLES[type].blindSpot)",
        "cross": "사주만으로는 '어떤 자리들 사이에서 갈등이 있다'는 위치 정보만 알 수 있고, MBTI만으로는 '이 유형이 심리적 악순환에 빠지면 어떤 패턴을 보이는가'라는 과정만 알 수 있다. 이 둘을 함께 보면 '이 사람의 연애에서 왜 하필 이 영역(직장과 가정, 현재와 미래)에서만 같은 패턴이 반복되는가'를 설명할 수 있다. 사주의 자리 충돌이 심리적 악순환이 터지는 지점을 특정해주고, 심리적 악순환이 그 충돌이 어떻게 증폭되는지의 과정을 설명해준다.",
        "impact": 7
      },
      {
        "id": "P-RLC-016",
        "tier": "S",
        "name": "사랑 표현의 인지적 양식 — 주기능-부기능 × F/T 강도",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "unsung:양",
          "uses:mulsang",
          "uses:sipsung_rel",
          "uses:dominant",
          "uses:auxiliary",
          "intensity:88",
          "uses:intensity",
          "ref:MT_LOVE"
        ],
        "saju": "일간 오행 물상(JEOKCHEONSU[일간].inRelation) + 일지 십성(SS_CONTEXT[십성].spouse)",
        "mbti": ": 주기능-부기능 조합(MT_TYPES[type].stack[0-1]) + F/T 축 강도(MT_INTENSITY_PROFILES.F/T: 55/68/88) + 사랑 표현(MT_LOVE[type].loveLanguage)",
        "cross": "사주만으로는 '이 사람이 어떤 종류의 사랑 에너지를 가졌는가'만 알 수 있고, MBTI만으로는 '그 사랑을 어떤 심리적 방식으로 전달하는가'만 알 수 있다. 이 둘을 함께 보면 '이 사람이 어떤 에너지를 어떤 방식으로 전달하는가'라는 완전한 사랑 표현 프로필이 나온다. 예를 들어 한 사람만을 깊이 비추는 안정적 헌신 에너지를 가진 사람이 내면 가치 기반으로 전달하면 극도로 깊은 1:1 헌신이 되지만, 사회적 조화를 중시하는 방식으로 전달하면 상대를 빛나게 해주는 헌신이 된다. 같은 에너지라도 전달 방식이 달라지는 것, 이것은 두 체계를 함께 볼 때만 보인다.",
        "impact": 8
      },
      {
        "id": "P-RLC-023",
        "tier": "S",
        "name": "매력 발동 영역 × 인지기능 매력 유형: 매력의 좌표",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "unsung:양",
          "sinsal:도화",
          "sinsal:화개",
          "uses:yinyang",
          "axis:EI",
          "intensity:88",
          "uses:intensity",
          "ref:MT_LOVE",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "도화살/화개살 궁위(SJ_analyzeSpecialSals: 년지/월지/일지/시지) + 일간 음양(양간/음간)",
        "mbti": ": MT_LOVE[type].attract + MT_INTERACTION_STYLES[type] + E/I 축 강도(MT_INTENSITY_PROFILES.E/I: 55/68/88)",
        "cross": "사주의 매력 에너지와 영적/예술 에너지가 어느 자리에 있는지는 매력이 '어디서' 발동하는지를 알려주고, MBTI의 상호작용 스타일은 '어떤 종류의' 매력인지를 알려준다. 사주만으로는 매력이 사회적 장면에서 발동하는지 사적인 자리에서 발동하는지, 적극적인지 수동적인지 정도만 알 수 있고, MBTI만으로는 지적 매력인지 감각적 매력인지 카리스마적 매력인지 정도만 알 수 있다. 이 둘을 함께 볼 때 비로소 '이 사람은 1:1 자리에서 지적 깊이로 매력을 발산한다' 혹은 '이 사람은 사회적 장면에서 감각적 에너지로 매력을 발산한다'는 구체적인 매력 좌표가 완성된다.",
        "impact": 5
      }
    ],
    "이 사람의 성격": [
      {
        "id": "P-RLC-010",
        "tier": "A",
        "name": "갈등 만성화 vs 급성화",
        "tags": [
          "axis:JP",
          "intensity:88",
          "uses:intensity",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "N/A",
        "mbti": ": 갈등 스타일(MT_CONFLICT_STYLES[type]) + J/P 축 강도(MT_INTENSITY_PROFILES.J/P: 55/68/88) + 분노 패턴(MT_ANGER.byType)",
        "cross": "이것은 MBTI 내부에서 갈등 스타일과 J/P 성향의 강도를 교차하는 패턴으로, 연인 관계에서 갈등이 '어떻게 전개되는가'의 시간적 패턴을 결정한다. 사주의 합과 충이 갈등의 시간적 발동을 설명한다면, MBTI는 갈등을 인지적으로 처리하는 방식, 즉 직면하는가 회피하는가가 성격 강도에 따라 결정된다는 고유한 설명을 제공한다. J/P 성향의 강도가 갈등의 시간 축을 결정한다는 점이 이 교차의 핵심 가치다.",
        "impact": 6
      },
      {
        "id": "P-RLC-008",
        "tier": "A",
        "name": "연인에게 보이는 첫인상 vs 실제",
        "tags": [
          "uses:dominant",
          "uses:auxiliary",
          "axis:EI",
          "intensity:88",
          "uses:intensity",
          "ref:MT_LOVE"
        ],
        "saju": "N/A",
        "mbti": ": 주기능-부기능 조합(MT_TYPES.stack[0-1]) + E/I 축 강도(MT_INTENSITY_PROFILES.E/I: 55/68/88) + 초기 데이트 패턴(MT_LOVE[type].earlyDating)",
        "cross": "이것은 MBTI 내부에서 성향 조합과 E/I 강도를 교차하는 패턴으로, 사주 변수 없이도 독립적으로 의미가 있다. 사주에서 외부환경 자리가 사회적 외면을 설명하는 것과 연결할 수 있지만, 이 맥락에서는 '상대방의 성격이 연인에게 어떻게 비치는가'가 핵심이다. MBTI만으로도 가장 강한 성향(진짜 자기)과 두 번째 성향(사회적 자기)이 얼마나 드러나는지가 E/I 강도에 따라 달라진다는 고유한 설명이 가능하다.",
        "impact": 6
      },
      {
        "id": "P-RLC-009",
        "tier": "A",
        "name": "위기 시 낯선 얼굴 — 그립 패턴의 강도",
        "tags": [
          "uses:inferior",
          "intensity:88",
          "uses:intensity",
          "stress:grip"
        ],
        "saju": "N/A",
        "mbti": ": 열등기능 그립(MT_STRESS_STAGES.stage4_grip) + F/T 축 강도(MT_INTENSITY_PROFILES.F/T: 55/68/88) + 그립 발현 유형(MT_SHADOW_BY_TYPE)",
        "cross": "이것은 MBTI 내부에서 극심한 스트레스 상태의 유형과 성향 강도를 교차하는 패턴으로, 연인 관계에서 '이 사람의 위기 성격'을 예측하는 데 핵심적이다. 사주에서 운의 충극이 성격 변화를 일으키는 과정과 연결할 수 있지만, 이 맥락에서는 MBTI의 극심한 스트레스 이론이 '왜 평소와 다른 사람이 되는가'를 고유하게 설명한다. F/T 성향의 강도와 교차하면 스트레스 상태에서의 폭발 강도를 예측할 수 있다는 점에서 단순한 스트레스 유형 설명을 넘어선다.",
        "impact": 7
      },
      {
        "id": "P-RLC-006",
        "tier": "B",
        "name": "도화살/화개살 궁위 × 일간 음양: 매력 표현 채널 패턴",
        "tags": [
          "pillar:시주",
          "unsung:양",
          "unsung:병",
          "sinsal:도화",
          "sinsal:화개",
          "uses:yinyang"
        ],
        "saju": "도화살 또는 화개살의 궁위(SJ_analyzeSpecialSals: 년/월/일/시지) + 일간 음양(양간=갑병무경임, 음간=을정기신계)",
        "mbti": ": N/A",
        "cross": "매력 에너지만으로는 매력이 있다는 존재 여부만 알 수 있고, 음양만으로는 활동적이냐 수동적이냐는 일반론에 불과하다. 두 가지를 함께 보면 어떤 매력을 어떤 방식으로 표현하는가가 구체화되어, 연인 관계에서 상대방이 느끼는 매력의 질감을 정밀하게 읽을 수 있다.",
        "impact": 6
      },
      {
        "id": "P-RLC-007",
        "tier": "B",
        "name": "공망 궁위 × 격국 방향: 결핍의 성격화 패턴",
        "tags": [
          "uses:gyeokguk",
          "condition:lack",
          "uses:gongmang"
        ],
        "saju": "공망 해당 궁위(GONGMANG_GUNGWI_KW: year/month/day/hour) + 격국 유형(JAPYEONG_GG)",
        "mbti": ": N/A",
        "cross": "비어있는 영역만 알면 '이 부분이 채워지지 않는다'는 구조만 파악된다. 에너지가 어떤 방향으로 흐르는지만 알면 '이런 역할을 지향한다'는 방향만 파악된다. 두 정보를 함께 보면 '지향하는 역할의 기반 자체가 비어있어서 오는 고통'인지, '맞지 않는 역할의 기반이 비어있어서 오히려 자유로운 상태'인지를 정확히 짚을 수 있다.",
        "impact": 5
      },
      {
        "id": "P-RLC-005",
        "tier": "B",
        "name": "통변 공식 × 오행 분포 배경: 성격 색채 패턴",
        "tags": [
          "condition:excess",
          "condition:lack",
          "ss:비겁",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재"
        ],
        "saju": "통변 공식(SJ_detectTongbyeon: 식상생재/살인상생/비겁탈재 등) + 오행 분포(el/elFull 과다/부족 오행)",
        "mbti": ": N/A",
        "cross": "재능이 돈으로 연결되는 에너지 흐름만 알면 에너지 패턴만 파악된다. 오행 분포만 알면 어떤 기운이 많고 적은지 양적 정보만 있다. 두 정보를 함께 보면 그 패턴이 어떤 기질 위에서 작동하는지가 결정되어, 같은 구조라도 성격 표현이 180도 달라지는 이유를 설명할 수 있다.",
        "impact": 6
      },
      {
        "id": "P-RLC-004",
        "tier": "B",
        "name": "원국 천간 합충 × 궁위 위치: 내면 갈등 구조 패턴",
        "tags": [
          "relation:충",
          "relation:천간합"
        ],
        "saju": "천간합(CHEONGAN_HAP) 또는 천간충(CHEONGAN_CHUNG) 존재 여부 + 궁위 조합(HAP_GUNGWI_KW / CHUNG_GUNGWI_KW)",
        "mbti": ": N/A",
        "cross": "에너지 결합/충돌의 존재만 알면 '합이 있다/충이 있다'는 사실만 파악된다. 궁위만 알면 '사회 자리와 자아 자리의 관계'라는 추상적 틀만 있다. 두 정보를 함께 보면 '사회적 자아와 본질이 잘 맞아 편안한 구조'인지, '본질과 미래 지향이 충돌해 주기적으로 흔들리는 구조'인지를 정확히 짚을 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-002",
        "tier": "B",
        "name": "배우자궁 십성 × 12운성: 관계 기대 패턴",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:sipsung_rel"
        ],
        "saju": "일지 정기 십성(SS_CONTEXT[십성].spouse) + 일지 12운성(SJ_UNSUNG_MEANING[운성].spouse)",
        "mbti": ": N/A",
        "cross": "에너지 성격만으로는 기대의 유형, 즉 안정적인 파트너를 원하는지 카리스마 있는 파트너를 원하는지만 알 수 있고, 그 기대가 얼마나 실현 가능한지는 알 수 없다. 에너지 생명력만으로는 에너지 상태, 즉 활발한지 끊겨 있는지만 알 수 있고 무엇에 대한 에너지인지는 알 수 없다. 이 둘을 함께 보면 '무엇을 어떤 상태로 기대하는가'가 되어 연인의 관계 기대치를 입체적으로 그릴 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-001",
        "tier": "B",
        "name": "일간 오행 × 강약 등급: 관계 주도권 패턴",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength"
        ],
        "saju": "일간 오행(JEOKCHEONSU 10천간) + 신강도(strengthGrade: 극신강/신강/중화/신약/극신약)",
        "mbti": ": N/A",
        "cross": "일간 오행만 알면 '이 사람은 나무 같은 사람'이라는 막연한 서술에 그치고, 에너지 강약만 알면 '에너지가 강하다'는 양적 정보에 불과하다. 두 정보를 함께 볼 때 비로소 '뿌리 깊은 큰 나무라 밀어붙이는 사람'인지, '뿌리 마른 큰 나무라 겉은 크지만 속은 불안한 사람'인지가 구별된다. 연인 관계에서 이 구별이 핵심이다.",
        "impact": 9
      },
      {
        "id": "P-RLC-003",
        "tier": "B",
        "name": "격국 유형 × 조후(월지 계절): 성격 온도 패턴",
        "tags": [
          "uses:gyeokguk",
          "pillar:월지",
          "unsung:절",
          "uses:johu"
        ],
        "saju": "격국 유형(JAPYEONG_GG 10격) + 월지 계절(ST5_JOHU 4계절)",
        "mbti": ": N/A",
        "cross": "에너지 구조만 보면 '이 사람이 어떤 역할을 하는 사람인가'만 알 수 있고, 태어난 계절의 온도만 보면 '열정적인 사람인가, 차분한 사람인가'라는 기질만 알 수 있다. 두 가지를 함께 보면, 같은 표현 역할을 가진 사람이라도 여름에 태어난 경우와 겨울에 태어난 경우가 왜 전혀 다른 인상을 주는지 설명할 수 있다.",
        "impact": 7
      }
    ],
    "잘 맞는 부분": [
      {
        "id": "P-RLC-075",
        "tier": "A",
        "name": "주기능 × 주기능 상호작용: 일상적 소통의 기본 질감",
        "tags": [
          "uses:dominant"
        ],
        "saju": "N/A",
        "mbti": ": MT_FUNCTION_INTERACTIONS[fnA-fnB], MT_TYPES[typeA].stack[0], MT_TYPES[typeB].stack[0]",
        "cross": "오행의 상생·상극 관계와 표면적으로 비슷해 보이지만, 오행 관계는 에너지 흐름의 방향을 다루고 MBTI의 성향 간 상호작용은 정보를 처리하는 방식의 시너지와 갈등을 다룬다. 측정하는 대상 자체가 다르기 때문에 두 분석은 서로 독립적인 정보를 제공한다.",
        "impact": 7
      },
      {
        "id": "P-RLC-074",
        "tier": "A",
        "name": "두 유형의 관계 유형 판별: 인지기능 스택 교차에 의한 시너지 구조",
        "tags": [
          "ref:MT_RELATION"
        ],
        "saju": "N/A",
        "mbti": ": MT_RELATION_TYPES, MT_RELATION_MATRIX, MT_TYPES[typeA].stack, MT_TYPES[typeB].stack",
        "cross": "MBTI의 관계 유형 분석은 MBTI 고유의 영역이다. 사주에는 이에 해당하는 개념이 없으므로, 두 사람의 성향 조합이 어떤 관계 유형인지는 MBTI 분석으로만 파악할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-071",
        "tier": "B",
        "name": "조후 보완: 서로의 계절 온도를 맞춰주는 구조",
        "tags": [
          "condition:lack",
          "unsung:절",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "ggA.johuNeeds(A의 조후 결핍 오행), sajuB.dmEl(B의 일간 오행), ggB.johuNeeds(B의 조후 결핍 오행), sajuA.dmEl(A의 일간 오행), ggA.seasonName, ggB.seasonName",
        "mbti": ": N/A",
        "cross": "오행의 부족함을 채우는 관점이 '무엇이 모자란가'를 보는 것이라면, 태어난 계절의 온도 결핍을 채우는 관점은 더 근본적인 층위에서 보완을 설명한다. 같은 물 기운이 부족하더라도 겨울에 태어난 사람의 부족함과 여름에 태어난 사람의 부족함은 의미가 다르다. 이 계절 온도 보완은 본능적으로 끌리는 에너지의 온도와도 연결되는 궁합 버전이라 할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-079",
        "tier": "B",
        "name": "기질 궁합: 4기질 간 시너지와 마찰의 대분류",
        "tags": [
          "uses:gunghap",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "N/A",
        "mbti": ": MT_TEMPERAMENTS[A기질], MT_TEMPERAMENTS[B기질], MT_TEMPERAMENTS[A기질].coreNeed, MT_TEMPERAMENTS[B기질].coreNeed, MT_TEMPERAMENTS[기질].conflict",
        "cross": "에너지 구조 간 시너지와 MBTI 기질 간 시너지는 같은 '유형 간 궁합'이라는 주제를 다루지만, 기질은 심리적 성향 조합에서 나오고 에너지 구조는 오행 역학에서 나온다. MBTI의 감성형이 반드시 표현 에너지 구조와 같지 않고, 분석형이 반드시 명예 에너지 구조와 같지 않으므로 둘을 1:1로 대응시킬 수 없다. 각각 독립적인 관점을 제공한다.",
        "impact": 6
      },
      {
        "id": "P-RLC-077",
        "tier": "B",
        "name": "상호작용 스타일 보완: 관계 내 역할 분담의 자연스러움",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "N/A",
        "mbti": ": MT_INTERACTION_STYLES[typeA 해당 스타일], MT_INTERACTION_STYLES[typeB 해당 스타일], MT_TYPES[typeA].code, MT_TYPES[typeB].code",
        "cross": "에너지 강약에 따른 역할 분담과 MBTI 상호작용 스타일에 따른 역할 분담은 모두 '관계 안에서 누가 어떤 역할을 하는가'를 다루지만, 상호작용 스타일은 외부 세계를 향한 행동 방식이고 에너지 강약은 내부 에너지의 총량이다. 에너지는 강하지만 행동은 조율형인 사람도 있으므로, 두 분석은 독립적인 정보를 제공한다.",
        "impact": 6
      },
      {
        "id": "P-RLC-068",
        "tier": "B",
        "name": "용신 궁합 × 배우자궁 십성 교차: 필요와 역할의 이중 정합/모순",
        "tags": [
          "uses:yongshin",
          "uses:gunghap",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_calcOsinChegye(A용신오행) → B일간오행의 5신 라벨, sajuB.elFull[A용신오행](B가 A용신을 채워주는 정도), sajuB.jiSS[2].ss(B의 배우자궁 기대 십성), getSipsung(rB.dg, rA.dg)(B→A 실제 십성)",
        "mbti": ": N/A",
        "cross": "상대방의 위치가 나에게 좋은 영향을 주는 자리인지와 배우자에 대한 기대-현실 간극, 이 두 가지를 함께 보면 관계의 체감이 구체적으로 설명된다. 두 가지가 모두 긍정적으로 맞아떨어지면 '천생연분' 같은 느낌이 들고, 한쪽은 맞고 한쪽은 어긋나면 '끌리는데 뭔가 안 맞는' 모순적인 체감의 근거가 된다.",
        "impact": 9
      },
      {
        "id": "P-RLC-080",
        "tier": "B",
        "name": "교차 암합: 두 사람 사이 천간-지장간 합의 무의식적 끌림 구조",
        "tags": [
          "unsung:사",
          "relation:암합",
          "relation:천간합"
        ],
        "saju": "AMHAP_TABLE(천간합 5쌍), SAJU_AMHAP_LAYERS(의식 층위), JIJANGGAN_DATA(A/B 지장간), sajuA.raw.dg/mg/yg/hg(A 천간), sajuB.raw.dg/mg/yg/hg(B 천간)",
        "mbti": ": N/A",
        "cross": "사주에는 숨겨진 에너지 층위가 있어서, 겉으로 드러나는 에너지 결합이 '의식적 끌림'이라면 그 안에 숨겨진 에너지끼리의 결합은 '무의식적 끌림'이라 할 수 있다. 이 구분은 사주 고유의 분석이다.",
        "impact": 5
      },
      {
        "id": "P-RLC-078",
        "tier": "B",
        "name": "사랑 언어 정합성: loveLanguage 일치와 보완의 정도",
        "tags": [
          "unsung:사",
          "ref:MT_LOVE"
        ],
        "saju": "N/A",
        "mbti": ": MT_LOVE[typeA].loveLanguage, MT_LOVE[typeB].loveLanguage, MT_LOVE[typeA].attract, MT_LOVE[typeB].attract, MT_LOVE[typeA].deepRelation, MT_LOVE[typeB].deepRelation",
        "cross": "MBTI의 사랑 표현 방식과 사주의 사랑 표현 방식은 같은 주제를 다루지만, MBTI는 심리적 성향에서 파생된 욕구를 보여주고 사주는 오행 에너지와 역학에서 파생된 행동 양식을 보여준다. 같은 사람이 MBTI적으로는 '대화로 사랑을 표현하는 유형'인데 사주적으로는 '행동으로 사랑을 표현하는 유형'일 수 있으며, 이 간극 자체가 중요한 인사이트가 된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-076",
        "tier": "B",
        "name": "갈등 해소 정합성: A가 필요로 하는 것을 B가 자연스럽게 제공하는가",
        "tags": [
          "ref:MT_CONFLICT"
        ],
        "saju": "N/A",
        "mbti": ": MT_CONFLICT_STYLES[typeA].needsFromOther, MT_CONFLICT_STYLES[typeB].fightStyle, MT_CONFLICT_STYLES[typeB].communication, MT_CONFLICT_STYLES[typeB].needsFromOther, MT_CONFLICT_STYLES[typeA].fightStyle",
        "cross": "사주의 에너지 충돌 구조는 갈등이 발생하는 조건을 보여주고, MBTI의 갈등 스타일 정합성은 갈등이 해소될 가능성을 보여준다. 둘은 갈등의 서로 다른 단계, 즉 발생과 해소를 각각 다루므로 독립적인 정보다.",
        "impact": 8
      },
      {
        "id": "P-RLC-073",
        "tier": "B",
        "name": "육친 교차 × 성별 맥락: 서로에게 맡겨진 역할의 자연스러움",
        "tags": [
          "uses:yukchin",
          "uses:sipsung_rel"
        ],
        "saju": "SJ_YUKCHIN_MAP[성별A][ssAtoB](A→B 십성의 육친 의미), SJ_YUKCHIN_MAP[성별B][ssBtoA](B→A 십성의 육친 의미), getSipsung(rA.dg, rB.dg), getSipsung(rB.dg, rA.dg)",
        "mbti": ": N/A",
        "cross": "단순히 이 에너지가 어떤 역할인지를 넘어서, 성별에 따른 관계 해석을 적용하면 이 에너지가 연인 맥락에서 구체적으로 무엇을 의미하는지가 훨씬 풍부하게 설명된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-072",
        "tier": "B",
        "name": "납음 상생/비화 × 일지 12운성 조합: 관계의 상징적 원형과 에너지 리듬",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:napeum"
        ],
        "saju": "SJ_getNapeum(rA.dg, rA.dj) → 납음A, SJ_getNapeum(rB.dg, rB.dj) → 납음B, 납음 간 관계(상생/비화/상극), sajuA.uns[2](A 일지 12운성), sajuB.uns[2](B 일지 12운성), NAPEUM_STORY",
        "mbti": ": N/A",
        "cross": "두 사람의 타고난 에너지 상징이 서로 어떻게 어울리는지를 넘어, 그 상징이 가진 시적 이미지와 에너지의 생애 리듬을 결합하면 관계의 상징적 원형이 그려진다. 이것은 커플에게 '우리 관계는 어떤 이미지인가'라는 관계 정체성을 제공하는 데 기여한다.",
        "impact": 5
      },
      {
        "id": "P-RLC-070",
        "tier": "B",
        "name": "강약 궁합 × 격국 보완: 역할 분담의 자연스러움",
        "tags": [
          "uses:strength",
          "uses:gyeokguk",
          "uses:gunghap"
        ],
        "saju": "ggA.strengthGrade(신강도), ggB.strengthGrade, ggA.gyeokgukName(격국 유형), ggB.gyeokgukName, ggA.cnt(십성 분포), ggB.cnt",
        "mbti": ": N/A",
        "cross": "에너지 강약 궁합의 단순 분류를 넘어, 에너지가 어떤 방향으로 흐르는지라는 '역할의 방향성'을 함께 보면 커플의 구체적인 시너지 방식이 설명된다. 한쪽이 강하고 한쪽이 약한 조합이라도 각자의 에너지 흐름 구조에 따라 시너지의 내용이 완전히 달라진다.",
        "impact": 8
      },
      {
        "id": "P-RLC-069",
        "tier": "B",
        "name": "교차 삼합 오행 × 대운 동기화: 시너지의 시간적 활성화",
        "tags": [
          "unsung:사",
          "relation:삼합",
          "uses:daewoon"
        ],
        "saju": "GH_SAMHAP(삼합 4조 — 두 사람 지지가 합쳐 삼합을 이루는 경우), 삼합 결과 오행(화/수/목/금), dwA.daewoons[currentDWIdx].ss, dwB.daewoons[currentDWIdx].ss, DW_SIPSUNG_KW",
        "mbti": ": N/A",
        "cross": "세 에너지가 하나로 모이는 구조의 존재 여부를 넘어, 그 시너지가 언제 활성화되는지의 시간축을 더하면 훨씬 실용적인 정보가 된다. 같은 구조를 가진 커플이라도 현재 각자의 10년 흐름에 따라 '지금 잘 맞는 시기'인지 '나중에 맞을 시기'인지가 달라진다.",
        "impact": 6
      },
      {
        "id": "P-RLC-067",
        "tier": "B",
        "name": "천간합 궁위 × 일간 물상: 합의 시각적 풍경과 체감 깊이",
        "tags": [
          "relation:천간합",
          "uses:mulsang"
        ],
        "saju": "GH_GANHAP(천간합 5쌍), 합이 성립하는 궁위 조합(pillarG), MULSANG_GAN[일간](물상 이미지), HAP_MULSANG[합종류]",
        "mbti": ": N/A",
        "cross": "하늘 에너지끼리의 결합 존재 여부를 넘어, 그 결합이 인생의 어느 영역에서 작동하는지와 어떤 이미지를 갖는지를 함께 보면 커플이 실제로 체감하는 시너지의 영역과 질감을 동시에 포착할 수 있다.",
        "impact": 8
      },
      {
        "id": "P-RLC-066",
        "tier": "B",
        "name": "오행 보완 × 보완 궁위 위치: 채워주는 방식의 체감 차이",
        "tags": [
          "condition:lack"
        ],
        "saju": "sajuA.lackFull(부족 오행), sajuB.elFull(오행 분포), sajuB.P[궁위별].gi/bi(보완 오행이 위치한 궁위)",
        "mbti": ": N/A",
        "cross": "오행 보완의 존재 여부를 넘어, 그 보완이 인생의 어느 영역을 통해 전달되는지를 특정하면 '왜 이 사람과 있으면 편한가'의 구체적인 이유를 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "P-RLC-082",
        "tier": "B",
        "name": "교차 방합: 같은 계절 에너지를 공유하는 동질적 시너지",
        "tags": [
          "unsung:사",
          "unsung:묘",
          "unsung:절"
        ],
        "saju": "JIJI_BANGHAP(방합 4조: 인묘진=목, 사오미=화, 신유술=금, 해자축=수), sajuA.raw(A 지지), sajuB.raw(B 지지)",
        "mbti": ": N/A",
        "cross": "같은 계절 에너지끼리 뭉치는 방식은 서로 다른 계절 에너지가 조화를 이루는 방식과 달리 동질적인 에너지의 결집이라는 고유한 역학이며, 이것은 사주의 계절 체계에서만 분석 가능하다.",
        "impact": 4
      },
      {
        "id": "P-RLC-081",
        "tier": "B",
        "name": "신살 궁위 교차 시너지: 서로가 서로의 귀인인 구조와 그 작동 영역",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "sinsal:역마",
          "sinsal:화개",
          "sinsal:천을귀인"
        ],
        "saju": "sajuA.specialSals(천을귀인/역마살/화개살 등), sajuB.specialSals, 각 신살이 위치한 궁위(년지/월지/일지/시지), SINSAL_KEYWORDS",
        "mbti": ": N/A",
        "cross": "MBTI에는 특정 에너지에 길흉의 의미를 부여하는 분류가 없다. 귀인 에너지, 이동 에너지, 영적·예술 에너지 등은 사주 고유의 개념이며, 이 에너지들이 인생의 어느 자리에서 작동하는지에 대한 분석도 사주에서만 가능하다.",
        "impact": 4
      }
    ],
    "한 줄 요약": [
      {
        "id": "P-RLC-137",
        "tier": "B",
        "name": "핵심 갈등 축 × 핵심 시너지 축: 관계의 양면성 한 줄",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:월간",
          "pillar:년주",
          "unsung:양",
          "relation:충",
          "relation:천간합",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L2 지지충(가장 임팩트 큰 충: 일지충 > 월지충 > 년지충) + analyzeGunghap L1/L2 천간합/지지합(가장 임팩트 큰 합: 일간합 > 일지합 > 월간합) + P-RLC-083 충 궁위별 갈등 영역 + P-RLC-066 오행 보완 궁위",
        "mbti": ": N/A",
        "cross": "에너지 결합(시너지)과 에너지 충돌(마찰)을 따로 보면 좋은 점과 나쁜 점의 나열이 되지만, 같은 관계 안에서 교차시키면 '이 관계의 역설적 본질'이 드러난다. 시너지만 보면 갈등을 무시하게 되고, 마찰만 보면 시너지를 놓친다. 양면을 동시에 제시하는 것이 핵심이며, 그 역설이 인생의 어느 영역에서 작동하는지를 자리 조합이 특정해준다.",
        "impact": 8
      },
      {
        "id": "P-RLC-136",
        "tier": "B",
        "name": "일주 통합 판정 × 대운 동기화 등급: 관계의 시간적 호흡 한 줄",
        "tags": [
          "dm:기",
          "relation:충",
          "uses:daewoon",
          "uses:ilju",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L8 일주통합(ilju.combo: 쌍합/쌍충/합충공존/일간비화/특수관계없음) + analyzeGunghap L5 대운동기화(dw[].sync: 동반상승기/A끌어올림/B끌어올림/함께인내) + analyzeGunghap L18 timing.bestYear/worstYear",
        "mbti": ": N/A",
        "cross": "관계의 구조적 질감과 현재 각자가 어떤 시기에 있는지는 각각 '어떤 관계인가'와 '지금 어떤 시점인가'를 보여준다. 구조가 같은 커플이라도 함께 상승하는 시기와 함께 버티는 시기에는 완전히 다른 이야기가 나온다. 구조가 같아도 시기가 다르면 체감이 다르고, 시기가 같아도 구조가 다르면 의미가 다르다.",
        "impact": 7
      },
      {
        "id": "P-RLC-135",
        "tier": "B",
        "name": "용신 궁합 × 5신 위치 × 배우자궁 기대-현실 갭: 관계 존재 이유의 한 줄",
        "tags": [
          "uses:yongshin",
          "uses:gunghap",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGunghap L7 용신궁합(yongshin.bForA, yongshin.aForB, yongshin.grade) + SJ_calcOsinChegye → SJ_getOsinLabel(상대 일간 오행의 5신 라벨) 쌍방 + P-RLC-087 배우자궁 기대-현실 갭(jiSS[2].ss vs getSipsung(rB.dg, rA.dg)) 쌍방",
        "mbti": ": N/A",
        "cross": "가장 필요한 에너지를 서로 채워주는지, 상대방이 나에게 이로운 존재인지, 배우자에 대한 기대와 현실이 맞는지는 각각 다른 차원의 관계 의미를 보여준다. 에너지 보완만으로는 역할의 구체성이 없고, 이로움 판단만으로는 보완 정도를 모르고, 배우자에 대한 기대만으로는 에너지적 이로움을 알 수 없다. 세 층을 함께 봐야 '왜 끌리는가, 좋은 관계인가, 기대에 부합하는가'가 동시에 드러난다.",
        "impact": 8
      },
      {
        "id": "P-RLC-134",
        "tier": "B",
        "name": "납음 원형 조합 × 일간 물상 × 강약 궁합: 커플의 상징적 풍경 한 줄",
        "tags": [
          "uses:mulsang",
          "uses:napeum",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L12 납음궁합(napeum.rel, napeum.nameA, napeum.nameB) + NAPEUM_STORY[납음명] + MULSANG_GAN[sajuA.dm].image + MULSANG_GAN[sajuB.dm].image + analyzeGunghap L16 강약궁합(strength.combo)",
        "mbti": ": N/A",
        "cross": "두 사람의 타고난 에너지 상징, 나 자신의 본질적 이미지, 에너지 강약의 역학, 이 세 층이 합쳐져야만 두 사람의 관계를 자연물 풍경으로 구체적으로 비유할 수 있다. 어느 하나만으로는 그 비유가 불가능하다. 에너지 상징만으로는 두 사람의 관계 역학이 안 보이고, 나 자신의 이미지만으로는 원형적 깊이가 없고, 강약만으로는 이미지가 없다.",
        "impact": 6
      }
    ],
    "화해법": [
      {
        "id": "P-RLC-095",
        "tier": "A",
        "name": "용신 궁합 × 과잉 오행 감정 질감: 상대 존재 자체의 화해력",
        "tags": [
          "condition:excess",
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L7 용신궁합(bForA/aForB 점수) + sajuA.elFull/sajuB.elFull 과잉 오행(>=3.0) + OHENG_KW[오행].excess(감정 질감 키워드) + SJ_HEALTH_OH[오행](신체 반응)",
        "mbti": ": N/A",
        "cross": "개인의 감정 질감과 상대방이 나에게 긍정적인 존재인지를 화해 맥락에서 함께 보면, 에너지적 보완도가 높을수록 '의식적으로 화해하려 노력하지 않아도 함께 있으면 자연스럽게 풀리는' 구조인지 알 수 있다. 에너지 보완만으로는 왜 곁에 있으면 감정이 풀리는지의 질감을 모르고, 감정 질감만으로는 상대가 그 감정을 실제로 완화해주는 존재인지를 알 수 없다.",
        "impact": 8
      },
      {
        "id": "P-RLC-102",
        "tier": "A",
        "name": "대운 동기화 × 세운 합충 시기: 화해의 시간적 창(窓)",
        "tags": [
          "dm:기",
          "relation:충",
          "uses:daewoon",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L5 대운동기화(dw sync) + L18 세운타이밍(timing years) + SEUN_HAPCHUNG_KW[합/충](궁위별 의미) + DW_SIPSUNG_KW[십성](strong/weak)",
        "mbti": ": N/A",
        "cross": "10년 흐름의 비동기화가 만드는 마찰을 화해 타이밍으로 전환해서 보면 실용적인 정보가 된다. 10년 흐름의 동기화만으로는 전반적인 운세 방향만 알고, 올해 흐름의 에너지 결합·충돌만으로는 특정 해의 이벤트만 안다. 두 가지를 교차해야 '올해 화해하기 좋은 시기인가, 내년까지 기다리는 것이 나은가'가 결정된다.",
        "impact": 6
      },
      {
        "id": "P-RLC-101",
        "tier": "A",
        "name": "강약 궁합 유형 × 원국 충·형 궁위: 화해 주도권의 비대칭 구조",
        "tags": [
          "pillar:일지",
          "unsung:양",
          "relation:충",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L16 강약궁합(쌍강/쌍약/A강B약/B강A약/균형) + calcRelations 원국 충·형(jijiChung, jijiHyung에서 일지 포함 여부) — 양쪽 각각",
        "mbti": ": N/A",
        "cross": "에너지 강약과 에너지 구조를 화해 주도권으로 구체화하면서, 두 사람 각각의 분노 만성화 경향을 함께 보면 더 정밀한 그림이 나온다. 강약만으로는 누가 더 강한가만 알고, 분노 만성화만으로는 누가 더 오래 화가 나는가만 안다. 교차해야 '에너지가 강한 쪽이 먼저 풀 수 있는 구조인가'가 결정된다.",
        "impact": 6
      },
      {
        "id": "P-RLC-098",
        "tier": "A",
        "name": "5신 위치(상대 일간) × 분노 만성화 구조: 화해 후 회복 속도",
        "tags": [
          "pillar:일지",
          "relation:충",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(A용신오행) → B일간오행의 5신 라벨(용신/희신/한신/구신/기신) + 원국 충·형 궁위(calcRelations: jijiChung, jijiHyung에서 일지 관련 여부)",
        "mbti": ": N/A",
        "cross": "상대방이 나에게 긍정적인 존재인지와 분노 만성화 경향을 함께 보면, 단독으로는 알 수 없는 정보가 나온다. 이 판단만으로는 화해 후 감정 회복 속도를 모르고, 분노 만성화만으로는 상대 곁에 있을 때의 회복 효과를 모른다. 두 변수를 교차해야 '화해 후 같이 있는 것이 빠른 회복에 도움이 되는가, 아니면 잠시 떨어져 있는 것이 나은가'가 결정된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-096",
        "tier": "A",
        "name": "천간합 궁위별 화해 채널: 어디서 풀리는가",
        "tags": [
          "relation:천간합",
          "uses:mulsang",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L1 천간합(CHEONGAN_HAP 5쌍) × 궁위 위치(HAP_GUNGWI_KW) + CHEONGAN_HAP_KW[합종류] + MULSANG_GAN[일간](물상 이미지)",
        "mbti": ": N/A",
        "cross": "에너지 결합의 풍경을 화해 채널로 구체화할 때, 단순히 결합이 있다는 사실보다 '어느 인생 영역의 결합인가'에 따라 화해 방법이 완전히 달라진다. 각 삶의 자리별 심리와 결합의 강도를 함께 봐야만 화해 채널의 구체적인 영역이 결정된다.",
        "impact": 7
      },
      {
        "id": "P-RLC-099",
        "tier": "B",
        "name": "납음 관계 유형 × 일지 12운성 조합: 화해의 상징적 역할 분담",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:napeum",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap L12 납음궁합(napeum.rel: 상생/비화/상극) + NAPEUM_STORY[납음명](상징적 이미지) + 일지 12운성(sajuA.uns[2], sajuB.uns[2]) + UNSUNG_KW[운성]",
        "mbti": ": N/A",
        "cross": "관계의 상징적 원형과 개인의 에너지 흐름 단계를 화해 역할 분담으로 구체화하면, 관계의 상징적 원형만으로는 관계의 원형만 알고 에너지 흐름 단계만으로는 개인의 에너지 상태만 안다. 두 변수를 교차해야 '누가 먼저 손을 내밀고, 어떤 방식으로 화해하는 것이 자연스러운가'가 결정된다.",
        "impact": 5
      },
      {
        "id": "P-RLC-097",
        "tier": "B",
        "name": "조후 보완도 × 분노의 온도: 함께 있으면 자연스럽게 식는가",
        "tags": [
          "condition:lack",
          "pillar:월지",
          "unsung:절",
          "uses:johu"
        ],
        "saju": "ST5_JOHU(월지 계절 결핍) + gg.johuNeeds(조후 필요 오행) + 상대의 elFull에서 해당 오행 보유량 + SJ_HEALTH_OH(건강 오행 대응)",
        "mbti": ": N/A",
        "cross": "태어난 계절의 온도 보완을 화해의 물리적 메커니즘으로 보면, 이것은 심리적 수준이 아니라 체감적·본능적 수준에서 작동한다. 에너지 보완이 '상대 곁에 있으면 에너지적으로 채워지는' 구조라면, 계절 온도 보완은 '상대 곁에 있으면 본능적으로 온도가 맞는' 구조다. 둘 다 '상대 곁에 있으면 감정이 풀리는가'를 다루지만 작동하는 층위가 다르다.",
        "impact": 6
      },
      {
        "id": "P-RLC-100",
        "tier": "S",
        "name": "배우자궁 기대-현실 갭의 방향 × 용신 궁합: 화해의 핵심 열쇠",
        "tags": [
          "pillar:일지",
          "unsung:쇠",
          "uses:yongshin",
          "uses:gunghap",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGunghap L17 배우자궁 십성 교차(spouseGung.A.toPartner, spouseGung.B.toPartner) + 일지 정기 십성(jiSS[2].ss) + SS_CONTEXT[십성].spouse + analyzeGunghap L7 용신궁합(bForA/aForB)",
        "mbti": ": N/A",
        "cross": "배우자에 대한 기대와 현실 사이의 간극, 그리고 에너지 보완 구조를 화해 전략으로 함께 보면, 기대-현실 간극만으로는 갈등의 원인만 알고 에너지 보완만으로는 에너지적 필요만 안다. 두 변수를 교차해야 '이 갈등이 진짜 해결해야 할 문제인가, 아니면 함께 성장하는 과정의 마찰인가'를 판별할 수 있고, 이 판별이 화해 전략의 방향을 결정한다.",
        "impact": 8
      }
    ]
  },
  "colleague": {
    "같이 성장": [
      {
        "id": "CP-WORK-GROW-110",
        "tier": "A",
        "name": "양방향 성장 촉진의 이중 검증 — 상호 용신 보강 × 상호 growthPath 촉진",
        "tags": [
          "unsung:양",
          "uses:yongshin",
          "ref:MT_RELATION"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) → B.elFull + SJ_extractYongshinOh(ggB.yongshin) → A.elFull — 양방향 용신 보강",
        "mbti": ": MT_TYPES[A].growthPath 기능 ∈ MT_TYPES[B].stack[0,1] + MT_TYPES[B].growthPath 기능 ∈ MT_TYPES[A].stack[0,1] — 양방향 growthPath 촉진, MT_RELATION_TYPES.dual/pedagogue 해당 여부",
        "cross": "한쪽이 다른 쪽의 성장을 돕는 단방향 구조와 달리, 양방향 모두 에너지적으로도 심리적으로도 정렬되는 조합은 매우 드물다. 이 교차에서만 '함께 일할수록 서로 모두 성장하는 구조적 보장'이 있는지를 확인할 수 있다. MBTI에서 서로의 약점을 자연스럽게 보완하는 관계라고 해도, 그것이 에너지적으로도 뒷받침되는지는 사주로 함께 살펴봐야 확인된다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-GROW-103",
        "tier": "B",
        "name": "교운기 동기화에 의한 장기 성장 리듬 호환성",
        "tags": [
          "unsung:사",
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi(dwA) × SJ_findGyowoongi(dwB) — 대운 전환점 시기 비교 + DW_TRANSITION_KW[전환패턴]",
        "mbti": ": 없음 (사주 시간축 고유)",
        "cross": "사주 고유의 시간축 체계. 10년 단위로 개인별 에너지 전환 시점이 얼마나 동기화되는지는 다른 어떤 체계로도 설명할 수 없는 고유한 가치다. 3년 함께 일한 동료와 10년 함께 일한 동료의 궤적을 예측하는 데 핵심적인 정보가 된다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-GROW-109",
        "tier": "S",
        "name": "성장 방향 이중 정렬 — 용신 보강 방향 × growthPath 촉진 방향",
        "tags": [
          "uses:yongshin",
          "ref:MT_AXES"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) → B.elFull[해당오행] ≥ 2 (용신 오행 보유 확인) + 역방향",
        "mbti": ": MT_TYPES[A].growthPath에 명시된 기능 → MT_TYPES[B].stack[0,1]에 해당 기능 포함 여부 + 역방향, MT_AXES[해당축].growthDirection",
        "cross": "에너지적 성장 보완만으로는 심리적 성장 방향과 무관할 수 있고, 심리적 성장 촉진만으로는 에너지적 뒷받침이 없을 수 있다. 이 두 가지를 함께 보면 '에너지적으로도 맞고 심리적으로도 맞는 성장 파트너인가'를 두 방향에서 확인할 수 있다. 인정받는 방식의 에너지와 심리 정렬이 '인정받는 법'을 다룬다면, 이것은 '성장 방향'의 에너지와 심리 정렬이다.",
        "impact": 7
      }
    ],
    "대화 팁": [
      {
        "id": "CP-WORK-TALK-087",
        "tier": "A",
        "name": "분노 해소 방식 × 용신 방향 정렬에 의한 갈등 후 복구 대화 키",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "SJ_extractYongshinOh(B용신 오행) + SJ_GAEUN[B용신].message 방향",
        "mbti": ": MT_ANGER.byFunction[B주기능].resolution + MT_ANGER.byFunction[B주기능].duration + MT_CONFLICT_STYLES[B].needsFromOther",
        "cross": "MBTI의 분노 해소 방식은 '어떤 종류의 반응이 필요한지', 즉 인정인지 해결인지 논리인지 시간인지를 알려주고, 사주에서 가장 필요한 에너지는 '그 반응의 핵심 키워드'를 특정해준다. 내면 가치 기반의 분노에 '인정'이 필요하다는 것은 MBTI만으로 알 수 있지만, 그 인정을 효율적 해결책과 함께 줘야 하는지, 아니면 가능성을 열어두는 방식으로 줘야 하는지는 사주의 가장 필요한 에너지와 함께 봐야 나온다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-TALK-082",
        "tier": "B",
        "name": "격국 유형 × 조후 온도에 의한 최적 전달 방식",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "analyzeGyeokguk(B).gyeokgukName + JAPYEONG_GG[격국].role + analyzeGyeokguk(B).seasonName + analyzeGyeokguk(B).johuNeeds",
        "mbti": ": 없음 (사주 내부 교차)",
        "cross": "업무 환경 선호와 업무 방식 선호를 각각 따로 보는 것을 넘어, 에너지 구조와 계절 온도를 교차하면 '대화의 구조와 속도를 동시에 결정하는 두 겹의 필터'가 나온다. 에너지 구조만으로는 대화 속도를, 계절 온도만으로는 대화 구조를 설명할 수 없다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TALK-084",
        "tier": "B",
        "name": "충·형·해 궁위 × 5신 교차에 의한 대화 지뢰 정밀 매핑",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "R.details.ji[type===충||형||해].pA + .pB (궁위쌍) + CHUNG_GUNGWI_KW[궁위쌍] + SJ_calcOsinChegye(B용신) → A일간 오행의 5신 위치",
        "mbti": ": 없음 (사주 내부 교차)",
        "cross": "에너지 충돌·마찰의 자리별 지뢰는 업무 지뢰 영역을, 에너지 흐름 속 위치 인식은 존재 인식을 다룬다. 여기서는 어떤 주제(어느 자리)를 누가(어떤 에너지 흐름에 있는 사람이) 꺼내느냐의 조합이 대화 지뢰의 정확한 위치를 알려준다. 자리만으로는 누가를, 에너지 흐름 속 위치만으로는 어떤 주제를 특정할 수 없다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TALK-085",
        "tier": "B",
        "name": "천간합 궁위에 의한 자연적 공감 채널과 대화 진입점",
        "tags": [
          "unsung:사",
          "relation:천간합"
        ],
        "saju": "R.details.gan[type===천간합].pA + .pB (궁위쌍) + HAP_GUNGWI_KW[궁위쌍] + GAN_HAP[해당쌍].meaning",
        "mbti": ": 없음 (사주 내부 교차)",
        "cross": "에너지 결합 구조가 직장 안정성에 미치는 영향을 다루는 것과 달리, 같은 결합 궁위 데이터가 '대화를 어디서부터 시작해야 편한가'라는 실전 진입점으로 전환된다. 장기적 안정성과 매일의 대화 진입점은 다른 차원의 정보다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-TALK-083",
        "tier": "B",
        "name": "십성 비대칭 × 신강도 차이에 의한 대화 역할 기대 격차",
        "tags": [
          "uses:strength",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(A.dg, B.dg) × getSipsung(B.dg, A.dg) + analyzeGyeokguk(A).strengthGrade × analyzeGyeokguk(B).strengthGrade",
        "mbti": ": 없음 (사주 내부 교차)",
        "cross": "에너지 역할 비대칭에서 오는 구조적 어긋남은 관계 인식을, 에너지 강도에서 오는 존재감 차이는 존재감을 다룬다. 두 변수의 교차점에서 대화 톤의 구체적 불일치 지점이 나온다. 에너지 역할 비대칭만으로는 강도를, 에너지 강도만으로는 방향을 알 수 없다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-TALK-081",
        "tier": "B",
        "name": "용신 기반 설득 프레이밍 × 일간 자연 화법 호환성",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:gaeun"
        ],
        "saju": "SJ_extractYongshinOh(B용신) + SAJU_OH_SANG/SAJU_OH_GEUK(A일간 오행→B용신 오행 관계) + SJ_GAEUN[B용신].message",
        "mbti": ": 없음 (사주 내부 교차)",
        "cross": "에너지 보완 구조가 업무 시너지를 만드는 방식을 다루는 것과 달리, 같은 에너지 데이터가 '실제 대화에서 어떤 단어와 표현 방식을 써야 하는가'라는 행동 지침으로 전환된다. 같은 에너지 데이터라도 동기 호환과 설득 언어 선택은 다른 출력이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TALK-088",
        "tier": "S",
        "name": "조후 대화 페이스 × E/I·상호작용 스타일에 의한 대화 속도 호환성",
        "tags": [
          "uses:johu",
          "uses:gaeun",
          "axis:EI",
          "uses:intensity",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGyeokguk(A).seasonName + johuNeeds × analyzeGyeokguk(B).seasonName + johuNeeds (조후 온도 쌍)",
        "mbti": ": MT_INTENSITY_PROFILES.E/I[A강도] × MT_INTENSITY_PROFILES.E/I[B강도] + MT_INTERACTION_STYLES[A/B]",
        "cross": "사주의 계절 온도는 기질적 에너지 온도에 따른 대화 페이스 선호를 결정하고, MBTI의 내향·외향 강도와 상호작용 스타일은 인지적 에너지 소모 패턴에 따른 소통 속도를 결정한다. 여름에 태어났지만 강한 내향 성향을 가진 사람은 기질적으로는 빠른 대화를 원하지만 인지적으로는 혼자 숙고할 시간이 필요한 이중 구조를 갖는다. 이 사람에게는 핵심을 빠르게 전달하되 반응할 시간을 충분히 주는 전략이 필요하며, 이것은 두 가지를 교차하지 않으면 나올 수 없는 지침이다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-TALK-086",
        "tier": "S",
        "name": "A의 소통 방식 × B의 갈등 트리거 × 십성 인식 — 무의식적 지뢰 밟기 구조",
        "tags": [
          "uses:yongshin",
          "uses:sipsung_rel",
          "ref:MT_CONFLICT"
        ],
        "saju": "getSipsung(A.dg, B.dg) (A→B 십성 인식) + SJ_calcOsinChegye(B용신)→A일간 (A가 B에게 용신/기신)",
        "mbti": ": MT_CONFLICT_STYLES[A].communication (A의 자연 소통 방식) + MT_CONFLICT_STYLES[B].trigger (B의 갈등 트리거) + MT_CONFLICT_STYLES[B].blindSpot (B의 인식 맹점)",
        "cross": "MBTI는 소통 방식과 갈등 유발 요인의 행동적 충돌을 보여주고, 사주의 두 사람 사이 역할과 에너지 방향은 관계의 구조적 맥락을 보여준다. 예를 들어 A가 논리적으로 상대방의 주장을 해체하는 성향이고, A가 B에게 강한 압박감을 주는 존재로 작용하며, 동시에 A가 B의 에너지를 지속적으로 소모시키는 관계라면, 논리적 소통 방식·권위적 관계 인식·에너지 소모가 겹쳐 '대화 자체가 B에게 부담'이 되는 상황이 만들어진다. 이런 상황은 한 가지 관점만으로는 좀처럼 보이지 않는다.",
        "impact": 8
      }
    ],
    "맞춰가야 할 부분": [
      {
        "id": "CP-WORK-ADJ-078",
        "tier": "A",
        "name": "의사결정 흐름 충돌 — A의 맹점이 B의 최우선과 정면충돌",
        "tags": [
          "unsung:사",
          "relation:충",
          "ref:MT_DECISION"
        ],
        "saju": "없음 — MBTI 내부 교차 (두 사람 관계 확장)",
        "mbti": ": MT_DECISION_PROCESS[A].blind × MT_DECISION_PROCESS[B].flow[0] + 역방향",
        "cross": "개인 내부의 의사결정 흐름을 보는 것과 달리, 이 패턴은 두 사람의 판단 흐름이 만날 때 '한쪽이 가장 중요하게 여기는 것이 다른 쪽의 맹점'이라는 충돌을 드러낸다. 관계에서 '이 사람은 왜 항상 중요한 걸 빠뜨리지?'라는 상호 좌절이 생기는 이유가 바로 여기에 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-ADJ-079",
        "tier": "A",
        "name": "배우자궁 십성 교차 × 직장 무의식 역할 기대",
        "tags": [
          "pillar:일지",
          "unsung:사"
        ],
        "saju": "R.details.spouseGung.A.toPartner × R.details.spouseGung.B.toPartner — 일지 정기 십성의 교차",
        "mbti": ": 없음 — 사주 내부 교차 (배우자궁은 무의식적 역할 기대를 반영)",
        "cross": "의식적 역할 인식의 비대칭과 달리, 이 패턴은 무의식적 역할 기대의 비대칭을 다룬다. 의식과 무의식의 불일치가 직장에서 '앞뒤가 다른 사람'이라는 인식을 만드는 원인이 된다. 겉으로 드러나는 자아와 내면 깊숙이 자리한 자아가 서로 다를 때 이 간극이 생긴다는 원리를 활용하여, 두 층위의 차이를 살펴보는 것이 이 패턴만의 특별한 점이다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-ADJ-076",
        "tier": "A",
        "name": "양방향 루프 유발 구조 — A의 자연스러운 업무 방식이 B의 루프를 유발하고 역도 성립",
        "tags": [
          "unsung:사",
          "unsung:양",
          "stress:loop"
        ],
        "saju": "없음 — 사주 변수 없이 MBTI 내부 교차 (두 사람 관계 확장)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop[A유형] × MT_TYPES[B].stack[0,1] + MT_STRESS_STAGES.stage3_loop[B유형] × MT_TYPES[A].stack[0,1]",
        "cross": "개인의 스트레스 유발 업무 환경에 초점을 맞추는 것과 달리, 이 패턴은 '특정 동료의 자연스러운 업무 방식 자체가 상대방의 스트레스 유발 요인'이라는 관계적 현상을 드러낸다. 사주에서 서로 존재 자체로 에너지가 충돌하는 관계가 '존재 자체가 소모적'인 상황을 만드는 것과 유사하게, MBTI 차원에서도 같은 현상이 나타날 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-ADJ-077",
        "tier": "A",
        "name": "인지기능 축 대극 배치 × 십성 비대칭 — 구조적 긴장의 이중 확인",
        "tags": [
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "uses:dominant",
          "ref:MT_AXES"
        ],
        "saju": "R.details.sipsung.AtoB × R.details.sipsung.BtoA — 관성/식상 비대칭",
        "mbti": ": MT_AXES[Fi-Te/Fe-Ti/Ne-Si/Ni-Se] — 두 사람의 주기능이 같은 축의 대극에 위치",
        "cross": "성향 축의 대극만으로는 '이론적으로 긴장 가능성이 있다'는 분석에 그치고, 두 사람 사이의 역할 기대 차이만으로는 '역할 기대가 어긋난다'는 파악에 그친다. 두 체계를 함께 보면 긴장의 강도와 역할 방향이 서로 맞아떨어지는지 확인할 수 있어, '실제로 이 두 사람이 느끼는 긴장의 강도'를 두 방향에서 입체적으로 살펴볼 수 있다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-ADJ-071",
        "tier": "B",
        "name": "기신 오행 상호 자극 구조 — 양방향 에너지 소모",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(A용신) → B일간 오행 위치 + SJ_calcOsinChegye(B용신) → A일간 오행 위치",
        "mbti": ": (없음 — 사주 5신 체계 내부 완결)",
        "cross": "개인의 에너지 소모 반응이나 역할 인식 교차와 달리, 이 패턴은 '양쪽 모두 서로에게 에너지를 소모시키는 존재'인 특수 조합에서만 발생하는 상호 소모 상황을 다룬다. 한쪽만 그런 경우는 회피로 어느 정도 해결이 가능하지만, 양쪽 모두 그런 경우는 협업 구조 자체를 재설계해야 한다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-ADJ-074",
        "tier": "B",
        "name": "십성 역할 기대 비대칭 — 관계 인식의 구조적 어긋남",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "R.details.sipsung.AtoB × R.details.sipsung.BtoA — 비대칭 조합 분석",
        "mbti": ": (없음 — 십성 교차는 사주 내부 완결)",
        "cross": "역할 인식 교차가 여러 체계의 조합을 다루는 것과 달리, 이 패턴은 순수하게 두 사람 사이의 역할 기대 불일치 자체에 집중한다. '나는 너를 이렇게 보는데, 너는 나를 저렇게 본다'는 어긋남이 일상적 업무 마찰에서 가장 흔하게 나타나는 이유다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-ADJ-073",
        "tier": "B",
        "name": "조후 온도차에 의한 업무 리듬 마찰",
        "tags": [
          "unsung:사",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "analyzeGyeokguk(A).season × analyzeGyeokguk(B).season + ST5_JOHU",
        "mbti": ": (없음 — 조후는 사주 고유 변수)",
        "cross": "기질 온도의 전반적 호환성을 보는 것과 달리, 이 패턴은 '극단적 온도차'가 업무 리듬에서 구체적으로 어떤 마찰을 일으키는지를 특정한다. 뜨거운 기질과 차가운 기질의 조합은 '왜 아직 안 하지?'(뜨거운 쪽) vs '왜 그렇게 급하지?'(차가운 쪽)의 반복 루프에 빠지는데, 이것은 성격 차이가 아니라 기질 온도의 차이에서 비롯된다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-ADJ-070",
        "tier": "B",
        "name": "충·형·해 궁위별 마찰 영역 × 갈등 표출 방식 조합",
        "tags": [
          "unsung:사",
          "relation:충"
        ],
        "saju": "R.details.ji[type==='충'||'형'||'해'].gungwi + JIJI_CHUNG_KW + CHUNG_GUNGWI_KW",
        "mbti": ": (없음 — 두 사람의 사주 갈등 표출 방식 profileAnalysis().angerType)",
        "cross": "에너지 충돌·마찰 목록만으로는 '어떻게 표면화되는가'를 알 수 없다. 한 사람은 말로 터뜨리고 다른 사람은 참는 경우 한쪽만 문제인 것처럼 보이고, 둘 다 폭발형이면 회의실이 아수라장이 된다. 마찰이 일어나는 영역과 그것이 표출되는 방식을 함께 봐야 '실제로 맞춰야 할 구체적 행동'이 결정된다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-ADJ-080",
        "tier": "B",
        "name": "합+충 공존 양가 구조의 마찰 양상",
        "tags": [
          "unsung:사",
          "unsung:양",
          "relation:충",
          "relation:천간합"
        ],
        "saju": "R.details.gan[type==='천간합'] + R.details.ji[type==='충'||'형'||'해'] — 합과 충·형·해가 동시에 존재하는 구조 + resolveHapChungPriority() 판정",
        "mbti": ": 없음 — 사주 합충 역학 내부 완결",
        "cross": "서로 부딪히는 관계가 충돌 자체를 다루고, 서로 잘 맞는 관계가 결합을 다루는 반면, 이 패턴은 잘 맞으면서도 부딪히는 양면이 동시에 존재하는 특수 상황의 양가성을 다룬다. 두 가지 면 중 어느 쪽이 더 강하게 작용하는지를 살펴보는 것이 이 패턴의 핵심이다. 양가적 관계는 단순 충돌이나 단순 결합보다 관계 관리가 훨씬 어렵기 때문에, 실제로 맞춰가야 할 부분을 파악하는 데 핵심적인 역할을 한다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-ADJ-072",
        "tier": "B",
        "name": "격국 파격 조합 — 두 사람의 파격이 서로를 자극하는 구조",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).pagyeokInfo × analyzeGyeokguk(B).gyeokgukName + analyzeGyeokguk(B).pagyeokInfo × analyzeGyeokguk(A).gyeokgukName",
        "mbti": ": (없음 — 격국 파격은 사주 고유 개념)",
        "cross": "개인의 성향 자체가 만드는 업무 프레임 선호와 달리, 이 패턴은 '두 사람의 성향이 교차할 때' 발생하는 관계적 긴장을 다룬다. 예를 들어 같은 팀에 권위와 규칙에 저항하는 성향을 가진 사람과 안정·질서를 중시하는 성향을 가진 사람이 있으면, 회의 때마다 충돌이 발생한다. 이것은 개인 성격이 아니라 두 사람의 성향 조합이 만들어내는 역동이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-ADJ-075",
        "tier": "B",
        "name": "원진살 궁위별 은근한 마찰 — 설명할 수 없는 불편함",
        "tags": [
          "unsung:사",
          "unsung:묘"
        ],
        "saju": "R.details.wonjin[].pA, pB 궁위 + WONJIN 6쌍(자미/축오/인유/묘신/진해/사술)",
        "mbti": ": (없음 — 원진살은 사주 고유 신살)",
        "cross": "에너지 충돌은 폭발적이고 원인이 명확하지만, 서로 은근히 불편한 관계는 서서히 쌓이고 원인을 찾기 어렵다. 직장에서 '별 문제 없는데 왜 저 사람이 불편하지?'라는 감정의 원인이 바로 이런 관계에서 비롯된다. 에너지 충돌과 달리 이런 관계는 폭발하지 않고 만성적으로 에너지를 소모시키며, 이것이 장기 협업에서 더 치명적일 수 있다.",
        "impact": 6
      }
    ],
    "상대 눈에 비친 나": [
      {
        "id": "CP-WORK-MYIMG-064",
        "tier": "A",
        "name": "인지기능 관계 유형 × B→A 십성 — 인식의 이중 프레임",
        "tags": [
          "uses:sipsung_rel",
          "ref:MT_RELATION"
        ],
        "saju": "B→A 십성 (getSipsung(rB.dg, rA.dg)) — 본능적 역할 인식",
        "mbti": ": A-B 인지기능 관계 유형 (MT_RELATION_TYPES + MT_RELATION_MATRIX) — 인지적 관계 역학",
        "cross": "사주는 'B 기준에서 A가 어떤 역할인가'라는 관계 구조의 프레임을 제공하고, MBTI의 관계 유형은 두 사람의 성향 구조가 어떻게 보완하거나 충돌하는지를 제공한다. 사주만 보면 역할 구조만 보이고, 왜 인지적으로 보완되거나 충돌하는지는 설명이 안 된다. MBTI만 보면 인지적 관계 역학은 보이지만 관계 구조의 역할 프레임이 빠진다. 두 체계를 함께 봐야 '어떤 역할인가(사주) + 인지적으로 어떤 관계인가(MBTI)'라는 두 방향의 그림이 온전히 나온다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-MYIMG-067",
        "tier": "A",
        "name": "사회적 도구-본능 인식 괴리 × A의 상호작용 스타일 — 겉-속 읽기의 삼중 구조",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "B→A 십성 + A의 월간 십성 (CP-059의 사주 이중 레이어)",
        "mbti": ": A의 상호작용 스타일 (MT_INTERACTION_STYLES[A의 interactionStyle])",
        "cross": "사주만으로는 A의 겉으로 드러나는 모습과 B가 A를 읽는 방식만 보이고, A가 실제로 어떤 행동 양식으로 나타나는지는 빠진다. MBTI만으로는 상호작용 스타일은 보이지만 관계 구조의 층위가 빠진다. 두 체계를 함께 볼 때만 '사회적 모습, 행동 방식, 본능적 인식'이 어우러진 인식 구조가 드러난다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-MYIMG-060",
        "tier": "B",
        "name": "5신 위치-십성 인식 교차",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(B용신)에서 A 일간 오행의 5신 위치 + B→A 십성",
        "mbti": ": (없음 — 사주 내 두 변수 교차)",
        "cross": "무의식적으로 끌리거나 불편한 에너지(내게 가장 필요한 것/나를 방해하는 것)와 관계 속 역할(강한 압박감, 재능·표현 등)은 서로 다른 층위를 측정한다. 이 두 층위를 함께 볼 때만 '왜 이 사람이 나를 불편하게 하면서도 도움이 되는지'를 설명할 수 있다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-MYIMG-059",
        "tier": "B",
        "name": "사회적 도구-본능적 인식 이중 구조",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "B→A 십성(getSipsung(rB.dg, rA.dg)) + A의 월간 십성(getSipsung(rA.dg, rA.mg))",
        "mbti": ": (없음 — 사주 내 이중 레이어 교차)",
        "cross": "B가 A를 어떤 역할로 읽는가와, A가 실제로 직장에서 보여주는 모습이 일치하는지 불일치하는지는 단독으로 파악하기 어렵다. B의 인식 프레임만으로는 A가 실제로 무엇을 보여주는지 모르고, A가 드러내는 모습만으로는 B가 어떻게 받아들이는지 알 수 없다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-MYIMG-061",
        "tier": "B",
        "name": "신강도 차이에 의한 존재감 인식",
        "tags": [
          "uses:strength",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).strengthScore - analyzeGyeokguk(B).strengthScore (단방향: B가 A를 인식)",
        "mbti": ": (없음 — 사주 에너지 총량의 단방향 인식)",
        "cross": "양방향 관계 역학 분석과 달리, 이 패턴은 B가 A를 어떻게 인식하는가라는 단방향 인식을 다룬다. A의 존재감이 아무리 강해도, B의 내면 힘의 크기에 따라 B의 주관적 인식이 달라진다. 같은 강한 존재감의 A라도, B가 내면이 강하면 '대등한 경쟁자'로 인식하고, B가 내면이 약하면 '압도적 존재'로 인식한다. 이 단방향 인식은 양방향 관계 분석만으로는 알기 어렵다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-MYIMG-062",
        "tier": "B",
        "name": "A의 특수 신살에 의한 비언어적 인상",
        "tags": [
          "unsung:사",
          "unsung:양",
          "sinsal:도화",
          "sinsal:역마",
          "sinsal:화개",
          "sinsal:천을귀인",
          "sinsal:양인"
        ],
        "saju": "A의 specialSals(도화살/역마살/화개살/양인살/천을귀인 등) + 해당 신살의 궁위",
        "mbti": ": (없음 — 신살은 사주 고유 변수)",
        "cross": "관계 속 역할이 '어떤 역할인가'를, 내게 필요한 것과 나를 방해하는 것이 '에너지 호불호'를 정의한다면, 매력적인 분위기나 예술적·영적 아우라 같은 특별한 기운은 '분위기와 아우라'를 정의한다. 매력적인 아우라가 있는 사람은 강한 압박감을 주더라도 '카리스마 있는 매력'으로 읽히고, 예술적·영적 깊이가 있으면 같은 압박감이라도 '학자적 깊이'로 읽힌다. 이처럼 특별한 기운이 관계 역할의 색깔을 바꾸는 효과는, 직장 인식이라는 맥락에서 사회적 자아와 내면 자아가 결합할 때 가장 잘 드러난다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-MYIMG-065",
        "tier": "S",
        "name": "존재감의 이중 구조 — 신강도 차이 × 상호작용 스타일",
        "tags": [
          "uses:strength",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "A의 신강도 - B의 신강도 차이 (analyzeGyeokguk(A).strengthScore - analyzeGyeokguk(B).strengthScore, B→A 단방향 인식)",
        "mbti": ": A의 상호작용 스타일 (MT_INTERACTION_STYLES[A의 interactionStyle])",
        "cross": "사주의 내면 힘의 크기는 존재감의 물리적 크기감을 제공하고, MBTI의 상호작용 스타일은 그 존재감이 외부로 어떻게 표출되는가를 제공한다. 사주만 보면 내면 힘의 크기만 있고 표출 방식이 빠진다(힘이 강해도 조용할 수 있다). MBTI만 보면 표출 방식은 있지만 내면 힘의 크기가 없다(주도적으로 보여도 내면 힘이 작을 수 있다). 두 체계를 함께 봐야 내면 힘의 크기와 표출 방식이 어우러진 존재감의 실제 모습이 나온다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-MYIMG-066",
        "tier": "S",
        "name": "A의 갈등 blindSpot이 B에게 노출될 때의 인식 전환 × 십성 기대 배반",
        "tags": [
          "ref:MT_CONFLICT"
        ],
        "saju": "B→A 십성이 만드는 역할 기대 (SIPSUNG_KEYWORD)",
        "mbti": ": A의 갈등 스타일 blindSpot (MT_CONFLICT_STYLES[A].blindSpot)",
        "cross": "사주의 관계 역할 구조는 평시의 역할 기대를 고정시키고, MBTI의 갈등 시 취약점은 위기 상황에서 드러나는 약점이다. 사주만 보면 역할 기대만 있고 갈등 시 실제 행동 예측이 안 된다. MBTI만 보면 갈등 행동은 예측되지만 B가 어떤 기대를 가지고 있었는지(따라서 얼마나 충격받는지)는 빠진다. 두 체계를 함께 봐야 기대했던 모습과 실제로 드러난 모습 사이의 차이에서 오는 인식 전환이 얼마나 클지 가늠할 수 있다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-MYIMG-063",
        "tier": "S",
        "name": "B의 인식 필터 × B→A 본능적 인식 — 상대 눈의 이중 렌즈",
        "tags": [
          "dm:기",
          "uses:sipsung_rel",
          "uses:dominant"
        ],
        "saju": "B→A 십성 (getSipsung(rB.dg, rA.dg)) — B의 일간 기준 A 일간의 십성",
        "mbti": ": B의 주기능 (MT_TYPES[B].stack[0]) — B의 인지적 인식 필터",
        "cross": "사주는 '어떤 존재로 읽히는가'(본능적 역할 프레임)를 제공하고, MBTI는 '무엇을 먼저 보는가'(정보를 받아들이는 방식)를 제공한다. 사주만 보면 B가 A를 어떤 역할로 읽는지만 보이고 B가 어디에 주목하는지는 빠진다. MBTI만 보면 B가 무엇에 주목하는지는 있지만 A가 B에게 어떤 역할로 읽히는지는 빠진다. 두 체계를 함께 봐야 '무엇을 보는가, 어떻게 읽히는가'라는 인식의 두 측면이 온전히 보인다.",
        "impact": 8
      }
    ],
    "선호 방식": [
      {
        "id": "CP-WORK-PREF-041",
        "tier": "A",
        "name": "업무 피로 회복 방식 호환성 — 조후 × 자기돌봄 패턴 조합",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "uses:johu",
          "ref:MT_SELFCARE"
        ],
        "saju": "ST5_JOHU(A월지 계절) × ST5_JOHU(B월지 계절)",
        "mbti": ": MT_SELFCARE(A유형) × MT_SELFCARE(B유형)",
        "cross": "사주의 에너지 균형 상태는 '어떤 에너지가 부족한가'라는 근본 방향을 알려주고, MBTI의 셀프케어 패턴은 '구체적으로 무엇을 해야 충전되는가'라는 실행 방법을 결정한다. 같은 '조용한 회복'이라도 차갑고 가라앉은 기운이 지나치게 많은 사람은 약간의 사회적 자극을 섞어야 균형이 잡히고, 혼자만의 시간 속에서 깊이 생각하는 것을 가장 편하게 느끼는 사람은 순수하게 혼자여야 한다. 이 구분은 두 체계를 함께 볼 때만 나온다.",
        "impact": 4
      },
      {
        "id": "CP-WORK-PREF-035",
        "tier": "B",
        "name": "조후 조합과 업무 환경 선호 호환성",
        "tags": [
          "pillar:월지",
          "unsung:사",
          "unsung:절",
          "uses:johu"
        ],
        "saju": "ST5_JOHU(A월지 계절) × ST5_JOHU(B월지 계절)",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "개인의 기질 온도를 다루는 것과 달리, 이 패턴은 두 사람의 기질 온도 조합이 공유 업무 환경에서 만들어내는 호환과 충돌을 다룬다. 비슷한 기질 온도면 '우리 팀 회의 스타일이 편하다'가 되고, 반대 기질 온도면 '왜 항상 회의가 불편하지?'의 원인이 된다. 이것은 개인 성격이 아니라 두 사람이 같은 공간에서 느끼는 기질 호환의 문제다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-PREF-036",
        "tier": "B",
        "name": "12운성 교차와 업무 페이스 호환성",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:사"
        ],
        "saju": "UNSUNG_KW(A일지 12운성) × UNSUNG_KW(B일지 12운성)",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "개인 내부의 에너지 흐름 차이를 다루는 것과 달리, 이 패턴은 두 사람의 에너지 흐름 조합이 만드는 업무 속도 호환과 불일치를 다룬다. 개인 성격이 아니라 팀 작업 시 마감 접근 방식의 구조적 차이를 설명한다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-PREF-038",
        "tier": "B",
        "name": "용신 방향 교차와 업무 보상/동기 호환성",
        "tags": [
          "unsung:사",
          "uses:yongshin"
        ],
        "saju": "analyzeGyeokguk().yongshin(A 용신 오행 방향) × analyzeGyeokguk().yongshin(B 용신 오행 방향)",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "에너지 보완(내게 필요한 것을 상대가 가지고 있는가)을 다루는 것과 달리, 이 패턴은 내가 자연스럽게 끌리는 방향 자체가 업무 동기와 보상 선호를 결정하고, 두 사람의 방향 일치·불일치가 프로젝트 선택과 업무 만족도에 영향을 미치는 구조를 다룬다. '서로 에너지를 주는가'가 아니라 '같은 것을 원하는가'의 문제다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-PREF-037",
        "tier": "B",
        "name": "격국 파격 조합과 업무 프레임 선호",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk().pagyeokInfo(A) × analyzeGyeokguk().pagyeokInfo(B)",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "에너지 성향의 유형을 다루는 기존 패턴들과 달리, 에너지 성향이 자연스럽게 발휘되는가 아닌가라는 단순한 차이가 두 사람의 업무 프레임 선호를 크게 갈라놓는다는 점이 새롭다. 에너지 성향이 자연스럽게 발휘되지 않는 사람은 '규칙 안에서 불편한 사람'이 되고, 이것이 두 사람 사이에서 업무 방식 충돌의 근본 원인이 된다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-PREF-039",
        "tier": "B",
        "name": "공망 궁위 교차와 업무 동기 맹점 구조",
        "tags": [
          "unsung:사",
          "uses:gongmang"
        ],
        "saju": "calcGongmang(A).affected × calcGongmang(B).affected",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "팀 맹점 증폭이 특정 에너지가 함께 부족한 상황에 초점을 맞추는 것과 달리, 이 패턴은 특정 에너지가 처음부터 아예 없는 상태라는 독립적 메커니즘이 업무 동기의 맹점을 만드는 것을 다룬다. 함께 부족한 상태와 처음부터 없는 상태의 결핍은 원인이 다르다. 함께 부족한 상태는 '에너지 자체가 부족한 것'이고, 처음부터 없는 상태는 '그 에너지가 처음부터 존재하지 않는 것'이다.",
        "impact": 4
      },
      {
        "id": "CP-WORK-PREF-040",
        "tier": "B",
        "name": "오행 흐름 단절 교차와 팀 프로세스 병목",
        "tags": [
          "unsung:사",
          "unsung:절",
          "unsung:병"
        ],
        "saju": "findBrokenChain(A).missing × findBrokenChain(B).missing",
        "mbti": ": 없음 (사주 단독 교차)",
        "cross": "개인의 에너지 흐름에서 막히는 지점을 분석하는 것과 달리, 두 사람의 막히는 지점을 대조하여 팀 프로세스에서 막히는 곳과 서로 보완되는 곳을 살펴보는 것은 새로운 접근이다. 이것은 에너지 보완과도 다르다. 에너지 보완은 '필요한 에너지를 상대가 주는가'의 문제이고, 이것은 '업무 프로세스의 어디에서 팀이 막히는가'의 문제다.",
        "impact": 5
      }
    ],
    "시너지": [
      {
        "id": "CP-WORK-SYN-068",
        "tier": "B",
        "name": "오행 보완 시너지에 의한 팀 역량 확장",
        "tags": [
          "unsung:사",
          "unsung:양"
        ],
        "saju": "findBrokenChain(A).missing × B.elFull[해당오행] ≥ 2 (양방향)",
        "mbti": ": (없음 — 사주 단독)",
        "cross": "프로세스 병목이 문제를 파악하는 것이라면, 이 패턴은 '상대가 내가 막히는 지점을 해소해줌으로써 팀 역량이 확장된다'는 시너지를 살펴보는 것이다. 단순히 부족한 에너지를 상대가 가지고 있는가의 문제가 아니라, 내가 막히는 지점을 상대가 충분히 보완해줄 수 있는가가 동시에 성립해야 한다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-SYN-069",
        "tier": "S",
        "name": "조후 보완 × 상호작용 스타일 보완 — 기질 온도와 팀 역할의 이중 정렬",
        "tags": [
          "pillar:월지",
          "unsung:절",
          "unsung:양",
          "uses:johu",
          "uses:mulsang",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "A.조후(월지 계절 × 일간 물상) + B.조후 — 양방향 온도 보완 여부",
        "mbti": ": A.MT_INTERACTION_STYLES + B.MT_INTERACTION_STYLES — 추진/조절 역할 보완 여부",
        "cross": "이전에 다룬 패턴이 '두 사람이 선호하는 업무 환경이 맞는가'와 '사회적 에너지 도구와 표출 방식의 일치'를 다뤘다면, 이 패턴은 타고난 기질의 온도(선천적으로 뜨겁거나 차가운 기질의 성질)와 상호작용 스타일(팀 안에서 각자가 맡는 역할 방식)의 교차다. '추진하는 역할을 맡은 사람이 실제로 뜨거운 기질인가, 조율하는 역할을 맡은 사람이 실제로 차가운 기질인가'라는 맞음과 어긋남을 살펴본다. 역할과 기질이 맞아떨어지면 그 역할이 자연스러워 에너지 소모가 적고, 어긋나면 역할과 기질 사이의 간극이 팀 피로를 만든다. 이 부분은 사주만으로도, MBTI만으로도 보기 어렵다.",
        "impact": 6
      }
    ],
    "싫어하는 방식": [
      {
        "id": "CP-WORK-DISLIKE-050",
        "tier": "A",
        "name": "갈등 트리거 이중 검증 — 기신 오행 × MBTI 갈등 트리거",
        "tags": [
          "condition:excess",
          "uses:yongshin",
          "cf:Fe",
          "ref:MT_CONFLICT"
        ],
        "saju": "SJ_calcOsinChegye(A).gisin/gusin + OHENG_KW[기신오행].excess",
        "mbti": ": MT_CONFLICT_STYLES[type].trigger + MT_TYPES[type].coreFear",
        "cross": "사주에서 나를 불편하게 만드는 자극은 '어떤 종류의 자극'이 불쾌한지를 알려주고, MBTI의 갈등 유발 요인은 '어떤 상황'이 갈등을 일으키는지를 알려준다. 같은 '싫어하는 것'이라도 에너지 차원(사주)과 인지 차원(MBTI)이 서로 다른 축을 측정하므로, 두 체계가 일치할 때는 같은 결론을 두 방향에서 확인하는 효과가 있고, 불일치할 때는 단일 체계로는 놓칠 숨겨진 지뢰를 발견할 수 있다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-DISLIKE-058",
        "tier": "A",
        "name": "일간 상극과 업무 방식 본능적 거부 — 오행 상극 × 인지기능 축 긴장",
        "tags": [
          "uses:dominant",
          "ref:MT_AXES"
        ],
        "saju": "CHEONGAN_GEUK_KW[A일간극B일간] + OHAENG_TGAN[A.dg] + OHAENG_TGAN[B.dg]",
        "mbti": ": MT_AXES[공유축].tension + MT_FUNCTION_INTERACTIONS[A주기능↔B주기능]",
        "cross": "사주의 에너지 충돌은 '본능적 거부'를, MBTI의 성향 축 긴장은 '인지적 처리 방식 거부'를 각각 보여준다. 두 체계의 거부 방향이 같으면 '관계 근본에서 오는 마찰'이고, 다르면 '서로 다른 차원에서 각각 불편한 복합 거부'가 된다. 사주만으로는 구체적 업무 행동 수준의 마찰을 보기 어렵고, MBTI만으로는 본능적 거부를 알기 어렵다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-052",
        "tier": "A",
        "name": "과잉 에너지 과부하 이중 검증 — 과잉 오행 × 주기능 과잉 사용 스트레스",
        "tags": [
          "condition:excess",
          "unsung:사",
          "uses:dominant"
        ],
        "saju": "sajuA.elFull[과잉오행>=3.0] + OHENG_KW[과잉오행].excess",
        "mbti": ": MT_STRESS_STAGES.stage2_mild.sign + MT_TYPES[type].stressPattern",
        "cross": "사주에서 특정 에너지가 지나치게 한쪽으로 쏠려 있으면 선천적으로 편향된 성향이 생기고, MBTI에서 가장 강한 성향을 과도하게 쓰면 후천적으로 인지적 편향이 생긴다. 이 두 편향이 같은 방향이면 작은 자극에도 쉽게 폭발할 만큼 임계점이 낮아지고, 방향이 다르면 서로 다른 차원에서 동시에 과부하가 걸려 복합적인 스트레스 반응이 나타난다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-055",
        "tier": "A",
        "name": "기질 부정 이중 검증 — 조후 역방향 × 기질 핵심 갈등",
        "tags": [
          "condition:excess",
          "uses:johu",
          "uses:gaeun",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "analyzeGyeokguk().seasonName + johuNeeds + OHENG_KW[반대오행].excess",
        "mbti": ": MT_TEMPERAMENTS[기질].conflict + MT_TEMPERAMENTS[기질].coreNeed",
        "cross": "사주에서 보이는 타고난 기질은 몸과 체질 수준의 성향을 보여주고, MBTI 기질은 인지적 핵심 욕구와 갈등 패턴을 보여준다. 두 기질이 같은 방향으로 부정당하면 존재 자체가 부정당하는 느낌이 들고, 방향이 다르면 몸은 거부하는데 마음은 받아들이는 내적 불일치가 생긴다. 이런 불일치는 한 가지 관점만으로는 알기 어렵다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-DISLIKE-056",
        "tier": "B",
        "name": "열등기능 자극과 업무 지뢰 — 그립 발동 트리거로서의 동료 행동",
        "tags": [
          "uses:inferior",
          "stress:grip",
          "ref:MT_CONFLICT",
          "ref:MT_AXES"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_TYPES[type].stressPattern + MT_STRESS_STAGES.stage4_grip.examples + MT_AXES[축].gripDirection + MT_CONFLICT_STYLES[type].blindSpot",
        "cross": "MBTI에서 가장 약한 성향이 자극받을 때 생기는 취약점은, 사주에서 나를 소모시키고 불편하게 만드는 자극과는 완전히 다른 원리에서 같은 현상(업무 지뢰)을 알려준다. 사주와 MBTI 각각의 지뢰 지도를 함께 보면, 하나만 봤을 때는 발견하기 어려운 숨겨진 취약점까지 파악할 수 있다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-DISLIKE-044",
        "tier": "B",
        "name": "원국 충·형·해 궁위별 업무 지뢰 영역",
        "tags": [
          "relation:충",
          "relation:형",
          "relation:해"
        ],
        "saju": "calcRelations().jijiChung[궁위쌍] + jijiHyung[유형] + jijiHae[궁위쌍] + CHUNG_GUNGWI_KW[궁위쌍] + JIJI_HYUNG_KW[유형] + JIJI_HAE_KW[유형]",
        "mbti": ": 없음",
        "cross": "사주에서 에너지들 사이의 당김·충돌·마찰이 인생의 어떤 영역에서 일어나는지는 사주를 통해 볼 수 있다. 이것이 업무 맥락과 연결되면, 특정 행동이 왜 유독 강한 과민 반응을 일으키는지를 구체적으로 설명해준다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-047",
        "tier": "B",
        "name": "12운성 페이스 침범 반발",
        "tags": [
          "pillar:일지",
          "uses:unsung"
        ],
        "saju": "saju.uns[2] (일지 12운성) + UNSUNG_KW[운성명] + SJ_UNSUNG_MEANING[운성명]",
        "mbti": ": 없음",
        "cross": "나 자신이 현재 어느 흐름의 단계에 있는지에 따라 자연스러운 업무 리듬이 달라진다. 기운이 올라오는 시기, 안정되는 시기, 내려가는 시기마다 몸이 원하는 속도와 방식이 다른데, 이 리듬에 역행하는 외부 요구가 들어올 때 특정인에게 유독 강한 반발이 생기는 이유를 이 흐름으로 설명할 수 있다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-DISLIKE-046",
        "tier": "B",
        "name": "양인살·괴강살과 마이크로매니지먼트 반발",
        "tags": [
          "unsung:양",
          "sinsal:양인"
        ],
        "saju": "calcExtraSinsal().양인살/괴강살 유무 + SINSAL_KEYWORDS[양인살/괴강살]",
        "mbti": ": 없음",
        "cross": "사주에서 특히 강렬하게 작용하는 특별한 기운들이 직장 관계에서 마이크로매니지먼트와 충돌할 때, 일반적인 성격 분석으로는 설명하기 어려운 강한 반발 반응이 왜 생기는지 이해할 수 있다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-DISLIKE-048",
        "tier": "B",
        "name": "공망 궁위 약점 자극 반발",
        "tags": [
          "uses:gongmang"
        ],
        "saju": "calcGongmang(saju).affected[궁위] + GONGMANG_GUNGWI_KW[궁위]",
        "mbti": ": 없음",
        "cross": "사주에서 특정 에너지가 아예 비어 있는 자리는 가장 민감한 영역이다. 외부에서 그 자리를 자극하면 다른 영역보다 훨씬 강한 반발이 나온다. 이것은 단순한 약점 분석과 달리, 왜 그 부분이 구조적으로 취약한지를 설명해준다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-DISLIKE-057",
        "tier": "B",
        "name": "루프 진입 유발 업무 환경 — 부기능 차단과 업무 방식 마찰",
        "tags": [
          "uses:auxiliary",
          "stress:loop"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop.examples + MT_TYPES[type].loop + MT_TYPES[type].stack[1] (부기능)",
        "cross": "심리적 악순환 패턴은 극심한 스트레스 상태에서의 폭발과는 다른 메커니즘이다. 극심한 스트레스 상태는 즉각적인 폭발이지만, 심리적 악순환은 만성적인 악순환이다. 동료의 업무 방식이 자신의 핵심 강점을 발휘하지 못하게 막는 환경을 만들면, 개인은 자각하지 못한 채 서서히 소진된다. 이것은 '갑자기 폭발하는 지뢰'가 아니라 '서서히 독이 퍼지는 업무 환경'이라고 볼 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-042",
        "tier": "B",
        "name": "기신 오행 자극과 업무 불쾌 반응",
        "tags": [
          "condition:excess",
          "uses:yongshin",
          "uses:gaeun"
        ],
        "saju": "SJ_calcOsinChegye(A용신).gisin/gusin + SJ_GAEUN[기신오행 역방향] + OHENG_KW[기신오행].excess",
        "mbti": ": 없음",
        "cross": "가장 필요한 에너지를 중심으로 모든 에너지 요소에 도움이 되는지 방해가 되는지를 분류하는 것은 사주 고유의 방식이다. '싫어하는 것'을 감정이 아닌 에너지 구조로 설명할 수 있어, 본인도 인식하지 못하는 무의식적 반발의 원인을 파악하는 데 유용하다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-DISLIKE-043",
        "tier": "B",
        "name": "격국 파격 조건과 업무 트라우마 패턴",
        "tags": [
          "uses:gyeokguk",
          "condition:패격"
        ],
        "saju": "JAPYEONG_GG[격국명].breaks[].cond + analyzeGyeokguk().pagyeokInfo",
        "mbti": ": 없음",
        "cross": "에너지 구조가 뒤틀린 상태는 건강한 에너지 흐름이 막힌 것이다. 이 뒤틀림이 만드는 과민 반응은 일반적인 성격론으로는 설명할 수 없는, 사주 구조에서만 도출되는 고유한 '업무 트라우마 지도'라고 할 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-045",
        "tier": "B",
        "name": "과잉 오행과 업무 과부하 반발 패턴",
        "tags": [
          "condition:excess"
        ],
        "saju": "sajuA.elFull[과잉오행>=3.0] + OHENG_KW[과잉오행].excess",
        "mbti": ": 없음",
        "cross": "오행의 과부족은 사주 에너지 구조의 불균형을 보여준다. 지나치게 많은 오행의 키워드는 '어떤 업무 행동이 과부하를 일으키는가'를 예측하고, 부족한 오행의 키워드는 '어떤 요구가 불안을 일으키는가'를 예측한다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-DISLIKE-049",
        "tier": "B",
        "name": "조후 역방향 요구와 기질 부정 반발",
        "tags": [
          "condition:excess",
          "uses:johu",
          "uses:gaeun"
        ],
        "saju": "analyzeGyeokguk().seasonName + johuNeeds + OHENG_KW[조후 필요 오행의 반대 오행].excess",
        "mbti": ": 없음",
        "cross": "태어난 달(월지)로 결정되는 기질의 온도는 사주의 기본 바탕이다. 이 온도에 역행하는 업무 요구는 단순히 싫어하는 것이 아니라 기질 자체를 부정당하는 경험이므로, 반발의 깊이가 다른 패턴보다 훨씬 근본적이다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-DISLIKE-051",
        "tier": "S",
        "name": "파격 트라우마 트리거 × 분노 표현 방식 — 폭발의 원인과 양식",
        "tags": [
          "uses:gyeokguk",
          "unsung:양",
          "condition:패격",
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "JAPYEONG_GG[격국명].breaks[].cond + analyzeGyeokguk().pagyeokInfo",
        "mbti": ": MT_ANGER.byType[type] + MT_ANGER.byFunction[주기능]",
        "cross": "사주의 뒤틀린 에너지 구조는 '어떤 자극에 과거 상처가 다시 활성화되는가'를 보여주고, MBTI의 분노 패턴은 '분노가 어떤 행동으로 드러나는가'를 보여준다. 원인(사주)과 표출 방식(MBTI)을 함께 보면 어느 한 체계만으로는 그릴 수 없는 완전한 폭발 시나리오가 만들어진다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-DISLIKE-053",
        "tier": "S",
        "name": "통제 반발의 이중 구조 — 양인살/괴강살 × 상호작용 스타일 불일치",
        "tags": [
          "unsung:양",
          "sinsal:양인",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "calcExtraSinsal().양인살/괴강살 유무 + SINSAL_KEYWORDS[양인살/괴강살]",
        "mbti": ": MT_INTERACTION_STYLES[스타일] + MT_TYPES[type].stressPattern",
        "cross": "사주의 강한 승부 기질이나 카리스마 에너지는 선천적인 통제 민감도를 보여주고, MBTI의 상호작용 스타일은 평소의 행동 표현 방식을 보여준다. 선천적 민감도와 평소 표현이 불일치할 때, 예를 들어 평소에는 조용한 사람인데 통제에는 극도로 민감한 경우, 가장 예측하기 어려운 폭발이 발생한다. 이는 어느 한 체계만으로는 포착할 수 없다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-DISLIKE-054",
        "tier": "S",
        "name": "약점 지도의 이중 레이어 — 공망 궁위 × 핵심 공포",
        "tags": [
          "uses:gongmang",
          "cf:Fe",
          "ref:MT_CONFLICT"
        ],
        "saju": "calcGongmang(saju).affected[궁위] + GONGMANG_GUNGWI_KW[궁위]",
        "mbti": ": MT_TYPES[type].coreFear + MT_CONFLICT_STYLES[type].trigger",
        "cross": "사주에서 에너지가 비어 있는 자리는 선천적인 구조적 결손을 보여주고, MBTI에서 가장 깊이 두려워하는 것은 심리적 취약점을 보여준다. 이 두 가지가 같은 영역에 겹치면 구조적으로도, 심리적으로도 두 겹의 약점이 되어 훨씬 더 정밀하게 취약점을 파악할 수 있다.",
        "impact": 7
      }
    ],
    "업무 스타일": [
      {
        "id": "CP-WORK-STYLE-029",
        "tier": "A",
        "name": "관계 유형 × 격국 조합 — 직장 동료 궁합 종합 판정",
        "tags": [
          "gyeokguk:식신격",
          "gyeokguk:편재격",
          "gyeokguk:정관격",
          "ss:식신",
          "ss:편재",
          "ss:정관",
          "uses:gunghap",
          "ref:MT_RELATION"
        ],
        "saju": "analyzeGyeokguk().gyeokgukName (A와 B 각각의 격국명: 식신격/정관격/편재격 등) + R.details (궁합 종합)",
        "mbti": ": MT_RELATION_TYPES (dual/mirror/activity/conflict/pedagogue/companion/supervisor/quasiIdentical) + MT_RELATION_MATRIX[A,B]",
        "cross": "MBTI 관계 유형만으로는 두 사람이 생각하고 판단하는 방식이 얼마나 잘 맞는지만 보이고 직장에서의 구체적인 역할 분담은 알 수 없다. 사주 에너지 구조 궁합만으로는 역할의 상보성은 보이지만 두 사람의 사고와 판단 방식이 어떻게 맞물리는지는 알 수 없다. 이 둘을 함께 봐야 '이 두 사람이 같은 팀에서 사고 방식으로도, 역할로도 어떤 관계인가'의 입체적인 그림이 나온다.",
        "impact": 9
      },
      {
        "id": "CP-WORK-STYLE-032",
        "tier": "A",
        "name": "두 사람의 갈등 스타일 조합 × 5신 에너지 교차 — 직장 갈등의 구조와 강도",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yongshin",
          "uses:osin",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "SJ_calcOsinChegye(A용신) → B일간 오행 위치 (용신/희신/기신/구신/한신) + 양방향 교차 (R.osinCross)",
        "mbti": ": MT_CONFLICT_STYLES[A].trigger + fightStyle + MT_CONFLICT_STYLES[B].trigger + fightStyle + MT_ANGER.byFunction[A주기능] + MT_ANGER.byFunction[B주기능]",
        "cross": "사주의 에너지 호불호만으로는 갈등이 어떤 방식으로 표출되는지 알 수 없다. MBTI의 갈등 스타일만으로는 표출 패턴은 알지만 '왜 이 두 사람 사이에 유독 갈등이 잦은가'의 에너지적 기반을 알 수 없다. 두 정보를 함께 봐야 갈등의 근본 원인(에너지 구조)과 표출 형태(행동 패턴)가 모두 설명된다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-STYLE-026",
        "tier": "B",
        "name": "강약 궁합과 업무 주도권 (A신강도×B신강도)",
        "tags": [
          "strength:신강+",
          "strength:신약+",
          "uses:strength",
          "unsung:사",
          "uses:gunghap"
        ],
        "saju": "analyzeGyeokguk().strengthGrade 비교 — A와 B의 신강/신약 조합 (쌍강, 쌍약, A강B약, A약B강, 균형)",
        "mbti": ": 없음 — 사주 내부 완결 패턴",
        "cross": "내 에너지가 얼마나 충만한가 하는 개념은 사주 고유의 체계다. 나 자신이 주변 에너지 요소로부터 받는 지지 비율로 계산되며, MBTI에는 이런 '전체 에너지 총량 비교' 개념이 없다. 외향/내향(E/I) 축 강도와 비슷해 보이지만, 이 개념은 사회적 에너지가 아니라 존재 자체의 에너지 총량을 말한다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-STYLE-033",
        "tier": "B",
        "name": "업무 커리어 적성 이중 검증 — MT_CAREER × 격국·십성 직업 지향",
        "tags": [
          "uses:gyeokguk",
          "uses:job",
          "ref:MT_CAREER"
        ],
        "saju": "analyzeGyeokguk().gyeokgukName + SJ_JOB_APTITUDE (격국·십성 기반 직업 적성 판별)",
        "mbti": ": MT_CAREER[code].strengths + weakAreas + idealEnv + stressJob",
        "cross": "MBTI에서 도출된 직업 적성과 사주의 에너지 구조에서 도출된 직업 적성은 완전히 다른 이론적 기반에서 나온다. 두 체계에서 같은 결론이 나오면 서로를 강하게 뒷받침하고, 다른 결론이 나오면 어느 한 체계만으로는 보이지 않는 내적 갈등이 드러난다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-STYLE-022",
        "tier": "B",
        "name": "투출 구조와 업무 전문성 발현 (월지 지장간 투출×십성)",
        "tags": [
          "pillar:월지",
          "unsung:사",
          "uses:tuchul"
        ],
        "saju": "SJ_checkTuchul() — 월지 지장간의 천간 투출 여부 + 투출된 간의 십성",
        "mbti": ": 없음 — 사주 내부 완결 패턴",
        "cross": "이 패턴은 사주 내부 구조, 즉 숨겨진 에너지가 하늘 에너지로 드러나는 흐름으로 완결된다. 이 흐름은 '잠재력의 의식화'라는 사주 고유의 개념이며, 특정 시기의 운에서 해당 에너지가 오면 숨겨진 에너지가 비로소 발현되는 시간축 역학도 포함한다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-STYLE-027",
        "tier": "B",
        "name": "세운 동기화와 업무 타이밍 (A세운 흐름×B세운 흐름)",
        "tags": [
          "pillar:일지",
          "unsung:사",
          "unsung:양",
          "relation:충",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap() L18 — 향후 5년 세운별 양방향 십성 + 일지 합충 교차 점수",
        "mbti": ": 없음 — 사주 내부 완결 패턴 (시간축)",
        "cross": "사주의 시간축(10년 흐름/올해 흐름) 체계는 MBTI에 없는 고유한 차원이다. 매년 변하는 하늘·땅 에너지가 두 사람 각각의 원래 사주와 맺는 결합·충돌 관계를 교차 계산하면 '언제 함께하면 좋고 나쁜가'를 구체적 연도로 특정할 수 있다. 이는 사주만의 고유한 기여다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-STYLE-023",
        "tier": "B",
        "name": "용신 교차와 업무 시너지 (A용신↔B오행 보유량)",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap() L7 — A의 용신 오행이 B 사주에 풍부한 정도, B의 용신 오행이 A 사주에 풍부한 정도",
        "mbti": ": 없음 — 사주 내부 완결 패턴",
        "cross": "두 사람의 사주 데이터를 교차하는 궁합 분석으로, 양쪽 모두 사주 변수다. 가장 필요한 에너지 개념 자체가 사주 고유이며, MBTI에는 '이 사람에게 필요한 핵심 에너지'라는 구조가 없다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-STYLE-025",
        "tier": "B",
        "name": "5신(五神) 교차와 직장 동료 인식 (A 5신 체계에서 B 오행의 위치)",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(A용신) → B의 일간 오행이 A에게 용신/희신/기신/구신/한신 중 어디에 해당하는가",
        "mbti": ": 없음 — 사주 내부 완결 패턴",
        "cross": "가장 필요한 에너지를 기준으로 모든 에너지 요소를 도움이 되는지 방해가 되는지로 분류하는 것은 사주 고유의 에너지 분류법이다. MBTI에는 특정 성향이 나에게 도움이 되는지 방해가 되는지를 체계적으로 분류하는 구조가 없다. 이 에너지 분류 교차는 사주만의 고유한 기여다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-STYLE-024",
        "tier": "B",
        "name": "십성 분포 교차에 의한 자연적 역할 분담 (A십성 cnt×B십성 cnt)",
        "tags": [
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk().cnt 비교 — A의 5그룹 십성 비중과 B의 5그룹 십성 비중, SJ_detectCrossTongbyeon()",
        "mbti": ": 없음 — 사주 내부 완결 패턴",
        "cross": "두 사람의 에너지 성격 분포를 교차 비교하는 순수 사주 궁합 패턴이다. 에너지 흐름의 다양한 조합이 두 사람 합산에서도 감지되므로, 팀 역학을 사주만으로 설명할 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-STYLE-031",
        "tier": "C",
        "name": "4대 기질 × 격국 기질 — 핵심 욕구와 사회적 지향의 정렬/불일치",
        "tags": [
          "uses:gyeokguk",
          "ss:비겁",
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "analyzeGyeokguk().gyeokgukName (격국의 사회적 지향: 식상격=표현, 관성격=질서, 재성격=실리, 인성격=학습, 비겁격=자립)",
        "mbti": ": MT_TEMPERAMENTS[NF/NT/SP/SJ] (핵심 욕구: NF=진정성, NT=능력, SP=자유, SJ=안정) + MT_TEMPERAMENTS[기질].communication + conflict",
        "cross": "MBTI 기질이 직장에서 추구하는 것은 네 글자에서 자동으로 도출되는 상위 기질이고, 사주 에너지 구조의 사회적 지향은 사주 구조에서 도출되는 역할이다. 둘 다 '이 사람이 직장에서 무엇을 추구하는가'를 말하지만 완전히 다른 경로로 도달한다. 두 체계가 같은 방향을 가리키면 이중으로 확인되어 확신이 생기고, 어긋나면 두 체계를 함께 볼 때만 보이는 숨겨진 내적 갈등이 드러난다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-STYLE-030",
        "tier": "S",
        "name": "의사결정 흐름 × 십성 우선순위 — 업무 판단 속도와 방향",
        "tags": [
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "analyzeGyeokguk().cnt (5그룹 십성 비중 우선순위: 관성>식상이면 규율 우선, 식상>재성이면 창작 우선 등)",
        "mbti": ": MT_DECISION_PROCESS[code].flow (인지기능 순서별 의사결정 흐름) + MT_DECISION_PROCESS[code].blind (맹점)",
        "cross": "MBTI만으로는 의사결정할 때 어떤 방식으로 먼저 생각하는가만 알 수 있고, 그 결정에 어떤 에너지적 무게가 실리는지는 알 수 없다. 사주만으로는 에너지적 우선순위만 있고 구체적인 사고 처리 순서가 없다. 이 둘을 함께 봐야 '이 사람이 왜 이 결정을 이 속도로 내리는가'가 설명된다. 두 동료의 의사결정 흐름과 에너지 우선순위를 비교하면 '어디서 합의가 빠르고 어디서 교착이 생기는가'를 예측할 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-STYLE-028",
        "tier": "S",
        "name": "인지기능 상호작용 × 십성 역할 분담 — 업무 팀 역학",
        "tags": [
          "uses:dominant"
        ],
        "saju": "analyzeGyeokguk().cnt (A와 B 각각의 5그룹 십성 비중 비교: 동질/상보 판별)",
        "mbti": ": MT_FUNCTION_INTERACTIONS[A주기능-B주기능] (resonance/tension/complement) + MT_TYPES[A].stack[0] + MT_TYPES[B].stack[0]",
        "cross": "사주만으로는 에너지 성격 분포가 역할 분담만 보여주고 '어떤 방식으로 그 역할을 수행하는가'는 알 수 없다. MBTI만으로는 각 성향이 서로 어떻게 영향을 주고받는지가 보이지만 '직장에서 구체적으로 어떤 역할을 맡는가'는 알 수 없다. 이 둘을 함께 봐야 '이 두 사람이 같은 팀에서 어떤 역학으로 일하는가'의 전체 그림이 나온다. 성향 면에서는 서로를 보완하는데 에너지 성격이 같아서 역할에서 충돌하는 예외적 패턴도 두 체계를 함께 볼 때만 발견된다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-STYLE-034",
        "tier": "S",
        "name": "사회적 도구 조합 × 상호작용 스타일 교차 — 직장 동료 간 협업 도구 호환성",
        "tags": [
          "ss:인성",
          "ss:재성",
          "ss:관성",
          "ss:식상",
          "pillar:월간",
          "unsung:사",
          "relation:충",
          "uses:sipsung_rel",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "A의 월간 십성 + B의 월간 십성 (getSipsung으로 각각 계산) — 십성 조합이 상보적(관성+식상, 재성+인성 등)인지 동질적(관성+관성 등)인지",
        "mbti": ": A의 MT_INTERACTION_STYLES 유형 + B의 MT_INTERACTION_STYLES 유형 (chart-the-course/behind-the-scenes/in-charge/get-things-going) — 호환 조합인지 충돌 조합인지",
        "cross": "사주만으로는 '두 사람의 사회적 에너지 도구가 서로를 보완하는가'는 알 수 있지만 '그 도구를 어떤 방식으로 사용하는가'는 알 수 없다. MBTI의 소통 성향만으로는 소통 방식의 호환성은 알지만 '어떤 에너지적 도구를 꺼내 쓰는가'는 알 수 없다. 명예 에너지를 사회적 도구로 쓰면서 계획적으로 소통하는 사람은 '체계적 규율 수립자'가 되고, 같은 명예 에너지를 쓰면서 배후에서 조용히 소통하는 사람은 '조용히 규칙을 만드는 참모형'이 된다. 같은 에너지 도구가 소통 방식에 따라 완전히 다른 직장 역할로 발현되는 것이다.",
        "impact": 6
      }
    ],
    "이 사람의 성격": [
      {
        "id": "CP-WORK-CHAR-018",
        "tier": "A",
        "name": "의식적 사회 도구 × 상호작용 모드 (월간 십성 × 상호작용 스타일)",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "saju.ss[1].ss (월간 십성) + SS_CONTEXT[월간십성].career",
        "mbti": ": MT_INTERACTION_STYLES[style]",
        "cross": "에너지 구조와 상호작용 스타일의 교차가 '구조적 역할과 소통 방식'을 다룬다면, 이 패턴은 '의식적 에너지 도구와 소통 방식'의 교차다. 에너지 구조는 무의식적인 역할 경향이고 사회/직업 자리의 에너지 성격은 의식적 선택이므로, 직장에서 실제로 관찰되는 행동은 후자와 소통 방식의 조합에 더 가깝다. 에너지 구조는 장기적인 커리어 방향을, 사회/직업 자리의 에너지는 일상적인 업무 행동을 설명한다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-021",
        "tier": "A",
        "name": "장기 마찰 구조 × 갈등 표출 패턴 (원국 형·해 × 갈등 스타일)",
        "tags": [
          "relation:형",
          "relation:해",
          "ref:MT_CONFLICT"
        ],
        "saju": "calcRelations().jijiHyung + calcRelations().jijiHae + JIJI_HYUNG_KW + JIJI_HAE_KW",
        "mbti": ": MT_CONFLICT_STYLES[code].trigger + fightStyle",
        "cross": "급성 갈등을 다루는 패턴이 있다면 이 패턴은 만성 갈등과 미세한 에너지 누수를 다룬다. 사주에서 만성적 마찰과 미세한 에너지 충돌은 급격한 충돌보다 체감이 미묘해서 본인이 원인을 모르는 경우가 많은데, MBTI의 갈등 스타일이 '그 미묘한 마찰이 어떤 행동으로 표출되는가'를 구체화해준다. 사주만으로는 '마찰이 있다'까지 알 수 있고, 두 체계를 함께 보면 '어떻게 행동하는가'까지 알 수 있다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-CHAR-017",
        "tier": "A",
        "name": "환경 통제 욕구 × 관성/식상 비율 (J/P 축 강도 × 관성·식상 비중)",
        "tags": [
          "ss:관성",
          "ss:식상",
          "axis:JP",
          "uses:intensity"
        ],
        "saju": "analyzeGyeokguk().cnt['관성'] vs cnt['식상'] 비율",
        "mbti": ": MT_INTENSITY_PROFILES.J/P[강도]",
        "cross": "사주의 명예 에너지와 표현 에너지의 비율은 '어떤 에너지가 타고났는가'를 말하고, MBTI의 J/P 성향 강도는 '그 에너지를 환경에 어떻게 적용하는가'를 말한다. 사주만으로는 명예 에너지가 우세한 사람이 실제 직장에서 얼마나 강하게 통제를 시도하는지 알 수 없고, MBTI만으로는 J/P 성향의 에너지적 뿌리가 어디서 오는지 설명하지 못한다. 이 둘을 함께 보면 '규율 에너지의 근원과 발현 강도'가 동시에 드러난다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-CHAR-016",
        "tier": "A",
        "name": "결핍 보상 방향 × 열등기능 통합 방향 (오행 결핍 × 열등기능 growthDirection)",
        "tags": [
          "condition:lack",
          "uses:development",
          "uses:inferior"
        ],
        "saju": "sajuA.lackFull (부족 오행) + OHENG_KW[oh].lack/zero (결핍 키워드)",
        "mbti": ": MT_FUNCTIONS[stack[3]].growthDirection (열등기능 통합 방향) + MT_DEVELOPMENT_STAGES (발달 단계)",
        "cross": "사주의 에너지 결핍만으로는 '무엇이 부족한가'는 보이지만 그 결핍을 어떻게 처리하는지, 즉 회피하는지 보상하는지 통합을 시도하는지는 알 수 없다. MBTI에서 상대적으로 약한 성향만으로는 심리적으로 취약한 영역은 보이지만 그것이 이 사람의 에너지 구조에서 어떤 위치에 있는지는 알 수 없다. 이 둘을 함께 보면 '결핍의 에너지적 구조와 결핍을 다루는 방식'이 연결되어 직장 동료의 성장 가능성과 한계를 동시에 볼 수 있다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-CHAR-014",
        "tier": "A",
        "name": "인지기능 성숙도 × 기질 온도 (MT_MATURITY × 조후)",
        "tags": [
          "uses:johu",
          "uses:yongshin",
          "uses:dominant",
          "ref:MT_MATURITY"
        ],
        "saju": "JOHU[dg][mj].johuNeeds + johuDesc (조후용신)",
        "mbti": ": MT_MATURITY[주기능] (immature/developing/mature)",
        "cross": "사주의 기후 균형만으로는 기질의 온도 방향, 즉 뜨거운지 차가운지는 알 수 있지만 그 온도가 건강하게 쓰이는지 파괴적으로 쓰이는지의 질적 차이를 판별하기 어렵다. MBTI의 성향이 얼마나 안정적으로 작동하는지만으로는 그 성향이 작동하는 기질적 배경 온도는 알 수 없다. 이 둘을 함께 보면 '이 온도에서 이 상태로 작동하는 성향'이라는, 같은 유형 내에서도 개인차를 설명하는 프로필이 나온다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-CHAR-012",
        "tier": "A",
        "name": "상호작용 모드 × 사회적 역할 (상호작용 스타일 × 격국)",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:dominant",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGyeokguk().gyeokgukName (격국명) + GYEOKGUK_KW[dominant].strong/weak",
        "mbti": ": MT_INTERACTION_STYLES[style] (상호작용 스타일: behind-the-scenes / chart-the-course / get-things-going / in-charge)",
        "cross": "사주 에너지 구조만으로는 '어떤 역할을 맡는가'는 보이지만 그 역할을 수행하는 소통 방식, 즉 지시형인지 제안형인지 열정적 초대형인지는 보이지 않는다. MBTI의 상호작용 스타일만으로는 소통 방식은 보이지만 이 사람이 '왜 그 포지션에 끌리는가'의 심층 동기는 보이지 않는다. 이 둘을 함께 보면 '이 역할을 이 방식으로 수행한다'는 직장 페르소나의 완전한 프로필이 나온다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-019",
        "tier": "B",
        "name": "원국 합(合) 구조의 직장 안정 패턴 (원국 합 × 천간합/육합 궁위)",
        "tags": [
          "unsung:사",
          "relation:천간합",
          "relation:육합"
        ],
        "saju": "calcRelations().cheonganHap + calcRelations().jijiHap + HAP_GUNGWI_KW[궁위쌍]",
        "mbti": ": (없음 — 사주 단독 패턴)",
        "cross": "이 패턴은 사주 단독으로 성립한다. MBTI에는 '내적 조화 구조'에 해당하는 직접적 개념이 없다. 에너지 결합이 직장 성격에 미치는 영향은 사주 고유의 설명력이다.",
        "impact": 5
      },
      {
        "id": "CP-WORK-CHAR-007",
        "tier": "B",
        "name": "합충형해 구조-성격 발현 교차 (원국 합충×십성 배치)",
        "tags": [
          "unsung:사",
          "relation:충"
        ],
        "saju": "calcRelations() (합충형해 전체) + 해당 궁위의 십성",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "사주의 에너지 결합과 충돌만으로는 '어디서 부딪히는가'만 알 수 있고, 에너지 성격만으로는 '어떤 에너지가 있는가'만 알 수 있다. 이 둘을 함께 보면 '어떤 에너지끼리 부딪히는가'가 나온다. 이것이 직장에서의 내적 갈등의 정체를 정확히 짚어준다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-003",
        "tier": "B",
        "name": "사회적 도구-내면 에너지 괴리 (월간 십성×일지 12운성)",
        "tags": [
          "pillar:일지",
          "pillar:월간",
          "uses:unsung",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "SS_CONTEXT[월간십성].career (사회적 도구) + UNSUNG_KW[일지12운성] (내면 에너지)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "사회/직업 자리의 에너지 성격만으로는 '직장에서 어떤 에너지를 꺼내 쓰는가'만 보이고, 배우자 자리의 에너지 상태만으로는 '내면 에너지 상태'만 보인다. 이 둘을 함께 보면 '꺼내 쓰는 에너지를 뒷받침할 내면 체력이 있는가'가 드러난다. 이 갭이 클수록 직장에서 '겉과 속이 다른 사람'으로 인식된다. 예를 들어 사회적으로는 규율적인 에너지를 쓰는데 내면은 변화무쌍한 상태라면, 겉은 반듯한데 속은 자유로운 영혼인 셈이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-001",
        "tier": "B",
        "name": "본질-역할 교차 (일간×격국)",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:mulsang"
        ],
        "saju": "JEOKCHEONSU[dm] (일간 물상/본질) + analyzeGyeokguk().gyeokgukName (격국명)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "나 자신의 에너지 성질만으로는 '성격의 재질'만 알 수 있고, 에너지 구조만으로는 '사회적 역할'만 알 수 있다. 이 둘이 함께 보여야 '이 재질이 이 역할을 할 때 어떤 특유의 방식이 나오는가'가 설명된다. 예를 들어 같은 재능/표현 에너지 구조라도 밝고 뜨거운 에너지의 사람이라면 화려하게 뿜어내는 표현이 되고, 차갑고 섬세한 에너지의 사람이라면 은은하게 스며드는 표현이 된다. 이 차이는 어느 한쪽만으로는 설명할 수 없다.",
        "impact": 9
      },
      {
        "id": "CP-WORK-CHAR-020",
        "tier": "B",
        "name": "현재 대운 십성의 직장 에너지 오버레이 (대운 십성 × 원국 격국)",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:daewoon"
        ],
        "saju": "dw.daewoons[currentDWIdx].ss (현재 대운 십성) + DW_SIPSUNG_KW[그룹].strong/weak",
        "mbti": ": (없음 — 사주 단독 패턴, 시간축)",
        "cross": "이 패턴은 사주 고유의 시간축 변수다. MBTI에는 10년 주기로 성격 에너지가 변하는 개념이 없다. '같은 사람인데 왜 3년 전과 지금이 다른가'를 설명할 수 있는 유일한 변수가 바로 사주의 시간축이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-005",
        "tier": "B",
        "name": "일주 원형-십성 발현 교차 (일주 고유 특성×십성 분포)",
        "tags": [
          "unsung:사",
          "uses:ilju",
          "uses:shadow"
        ],
        "saju": "ILJU_KW[일주].core/shadow + analyzeGyeokguk().cnt (십성 5그룹 비중)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "60가지 일주 원형만으로는 기본 성격이 나오고, 에너지 성격 분포만으로는 에너지 구조가 나온다. 이 둘을 함께 보면 '이 원형이 이 에너지 구조에서 어떤 버전으로 발현되는가'가 나온다. 예를 들어 같은 강렬하고 과열되기 쉬운 원형이라도 학습 에너지가 우세하면 '학구적 열정가'가 되고, 재물 에너지가 우세하면 '불꽃 사업가'로 전혀 다른 직장 성격이 된다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-CHAR-002",
        "tier": "B",
        "name": "격국-에너지 교차 (격국×신강/신약)",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk().gyeokgukName + analyzeGyeokguk().strengthGrade (극신강~극신약)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "에너지 구조만 보면 '이 사람의 사회적 역할'이 보이고, 에너지가 얼마나 충만한가를 보면 '에너지가 넘치는가 부족한가'가 보인다. 이 둘을 함께 보면 '이 역할을 감당할 힘이 있는가'가 나온다. 같은 카리스마/압박 에너지 구조라도 에너지가 극도로 충만한 사람이라면 압박을 즐기는 장군이 되고, 에너지가 극도로 부족한 사람이라면 압박에 짓눌리는 처지가 된다. 처방도 정반대여서, 에너지가 넘치는 경우는 표현이나 재물 에너지로 흘려보내줘야 하고, 에너지가 부족한 경우는 학습이나 자기 에너지로 채워줘야 한다.",
        "impact": 9
      },
      {
        "id": "CP-WORK-CHAR-008",
        "tier": "B",
        "name": "오행 결핍-보상 행동 패턴 (부족 오행×직업 적성)",
        "tags": [
          "condition:lack",
          "unsung:사",
          "uses:job"
        ],
        "saju": "sajuA.lackFull (부족 오행) + SJ_JOB_APTITUDE (직업 적성) + OHENG_KW[oh].lack/zero (오행 결핍 키워드)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "오행 부족만으로는 '무엇이 없는가'만 알 수 있고, 직업 적성만으로는 '무엇을 잘하는가'만 알 수 있다. 이 둘을 함께 보면 '없는 것을 채우기 위해 어떤 직업적 행동을 하는가'가 나온다. 예를 들어 결단력과 정확성의 에너지가 부족한 사람이 칼같은 결단력을 요하는 직업을 선택하는 것은 보상 행동이다. 이 패턴을 알면 동료의 '의외의 행동'이 이해된다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-CHAR-006",
        "tier": "B",
        "name": "신살-궁위 교차 (특수 신살×배치 궁위)",
        "tags": [
          "unsung:사"
        ],
        "saju": "getSpecialSinsal() / calcExtraSinsal() (신살 목록) + 해당 신살의 궁위 (년/월/일/시)",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "특수 에너지만으로는 '이런 에너지가 있다'는 것만 알 수 있고, 자리만으로는 '이 삶의 영역의 역할'만 알 수 있다. 이 둘을 함께 보면 '이 에너지가 이 삶의 영역에서 어떻게 작동하는가'가 나온다. 직장 동료 성격 분석에서는 특히 사회/직업 자리에 걸린 특수 에너지가 핵심이다. 예를 들어 사회/직업 자리에 매력 에너지와 재능/표현 에너지가 함께 있다면, 직장에서 말솜씨와 매력으로 사람을 끌어모으는 사교 달인이 된다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-CHAR-004",
        "tier": "B",
        "name": "기질 온도 (일간 물상×월지 계절 — 조후)",
        "tags": [
          "pillar:월지",
          "unsung:사",
          "unsung:절",
          "uses:johu",
          "uses:mulsang",
          "uses:yongshin"
        ],
        "saju": "JOHU[dg][mj] (조후용신 120개 테이블) + MULSANG_GAN[dm] + MULSANG_SEASON[월지]",
        "mbti": ": (없음 — 사주 내부 교차)",
        "cross": "나 자신의 타고난 성질만으로는 '어떤 재질인가'만 알 수 있고, 태어난 계절만으로는 '어떤 환경에서 태어났는가'만 알 수 있다. 이 둘을 함께 보면 '이 성질이 이 환경에서 어떤 상태인가'가 비로소 드러난다. 이 조합은 120가지로 세밀하게 정의되어 있으며, 가장 필요한 에너지도 여기서 나온다. 직장에서 '왜 이 사람은 급한가, 느린가, 뜨거운가, 차가운가'의 근본 원인이 바로 이 지점에 있다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-CHAR-015",
        "tier": "S",
        "name": "스트레스 루프·그립 × 겉-속 괴리 확대 (스트레스 단계 × 월간-일지 괴리 + 조후 극단)",
        "tags": [
          "pillar:일지",
          "pillar:월간",
          "uses:unsung",
          "uses:johu",
          "uses:sipsung_rel",
          "uses:inferior",
          "stress:grip",
          "stress:loop"
        ],
        "saju": "SS_CONTEXT[월간십성] + UNSUNG_KW[일지12운성] 괴리 정도 + JOHU 극단값",
        "mbti": ": MT_STRESS_STAGES.stage3_loop.examples[유형] + MT_STRESS_STAGES.stage4_grip.examples[열등기능 grip]",
        "cross": "사주만으로는 '이 사람의 내적 긴장이 높다'는 구조를 보여주지만, 그 긴장이 풀릴 때 어떤 구체적 행동 패턴으로 나타나는지는 알기 어렵다. MBTI만으로는 극심한 스트레스 상황에서 나타나는 행동 패턴은 설명하지만, 왜 같은 유형이라도 어떤 사람은 그 상태에 잘 빠지고 어떤 사람은 안 빠지는지를 설명할 근거가 부족하다. 두 체계를 함께 보면 '스트레스 취약성의 구조적 근거(사주) + 실제 발현 패턴(MBTI)'이 연결되어, 스트레스 상황에서 직장 동료의 행동을 예측하는 데 훨씬 풍부한 정보를 얻을 수 있다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-013",
        "tier": "S",
        "name": "직장 갈등 발현 패턴 (갈등 스타일 × 합충형해·십성)",
        "tags": [
          "relation:충",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "calcRelations() (합충형해) + 해당 궁위 십성 조합",
        "mbti": ": MT_CONFLICT_STYLES[code].trigger + MT_CONFLICT_STYLES[code].fightStyle + MT_ANGER.byFunction[주기능]",
        "cross": "사주의 에너지 결합·충돌·마찰만으로는 '어떤 에너지가 부딪히는가'는 보이지만, 그 충돌이 '어떤 행동으로 표출되는가'(논리적 해체, 감정 폭발, 침묵 후 단절 등)는 특정할 수 없다. MBTI의 갈등 스타일만으로는 표출 패턴은 보이지만, 왜 이 사람에게 유독 갈등이 잦은지의 구조적 원인은 보이지 않는다. 두 체계를 함께 보면 '갈등의 구조적 원인(사주) + 갈등의 행동적 표출(MBTI)'이 연결된다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-CHAR-011",
        "tier": "S",
        "name": "겉-속 괴리의 이중 검증 (월간 십성·일지 12운성 × 부기능·열등기능 긴장)",
        "tags": [
          "pillar:일지",
          "pillar:월간",
          "uses:unsung",
          "unsung:사",
          "uses:sipsung_rel",
          "uses:inferior",
          "uses:auxiliary",
          "ref:MT_AXES"
        ],
        "saju": "SS_CONTEXT[월간십성].career (사회적 도구) + UNSUNG_KW[일지12운성] (내면 에너지)",
        "mbti": ": MT_TYPES[code].stack[1] (부기능) + MT_TYPES[code].stack[3] (열등기능) + MT_AXES[해당축].seesaw",
        "cross": "사주만으로는 '겉과 속이 다르다'는 것을 식별하지만, 그 차이가 어떤 방식으로 발현되는지는 알기 어렵다. MBTI만으로는 겉과 속 사이의 긴장을 설명하지만, 왜 이 특정인의 겉-속 차이가 유난히 큰지를 설명할 근거가 부족하다. 두 체계를 함께 보면 '이 사람의 겉-속 차이가 왜 생겼는가(사주 구조) + 그것이 어떻게 발현되는가(MBTI)'를 동시에 설명할 수 있다. 특히 두 체계 모두 이 차이를 가리킬 때 해석의 신뢰도가 크게 높아진다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-CHAR-010",
        "tier": "S",
        "name": "에너지 총량 동조/불일치 (E/I·J/P 축 강도 × 신강/신약)",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "uses:strength",
          "axis:EI",
          "axis:JP",
          "uses:intensity"
        ],
        "saju": "analyzeGyeokguk().strengthGrade (극신강~극신약)",
        "mbti": ": MT_INTENSITY_PROFILES.E/I[강도] + MT_INTENSITY_PROFILES.J/P[강도]",
        "cross": "사주에서 내 에너지가 얼마나 충만한가만으로는 '에너지가 많다/적다'는 알지만, 그 에너지가 사회적으로 어떻게 표출되는지(외향/내향)와 어떤 방식으로 결정을 내리는지(판단/인식)는 알 수 없다. MBTI의 성향 강도만으로는 '선호의 강도'는 알지만, 그 아래 깔린 에너지 원천의 총량은 알 수 없다. 두 체계를 함께 보면 '에너지 총량 × 에너지 방향 × 에너지를 쓰는 방식'의 세 겹 프로필이 나온다. 특히 두 체계가 맞지 않을 때(예: 사주는 에너지가 부족한데 외향 성향이 강한 경우) '왜 이 사람이 사교적인데 항상 지쳐 보이는가'를 설명할 수 있다.",
        "impact": 9
      },
      {
        "id": "CP-WORK-CHAR-009",
        "tier": "S",
        "name": "핵심 처리 방식 × 본질-역할 교차 (주기능 × 일간·격국)",
        "tags": [
          "uses:gyeokguk",
          "uses:dominant"
        ],
        "saju": "JEOKCHEONSU[dm] (일간 본질) + analyzeGyeokguk().gyeokgukName (격국명)",
        "mbti": ": MT_TYPES[code].stack[0] (주기능) + MT_FUNCTIONS[주기능].coreProcess (핵심 처리 방식)",
        "cross": "사주의 나 자신과 에너지 구조만으로는 역할의 방향은 보이지만 어떻게 생각하고 처리하는지는 보이지 않는다. MBTI의 가장 강한 성향만으로는 처리 방식은 보이지만 이 사람이 어떤 재료로 만들어진 존재인가의 질감이 없다. 교차하면 이 재료(나 자신)가 이 역할(에너지 구조)을 이 방식(가장 강한 성향)으로 수행한다는 3차원 성격 프로필이 나온다. 이것은 어느 한 체계만으로는 도달할 수 없는 입체성이다.",
        "impact": 9
      }
    ],
    "인정받는 법": [
      {
        "id": "CP-WORK-REC-096",
        "tier": "A",
        "name": "보완적 인정 구조의 이중 확인 — 의사결정 맹점 보완 × 십성 역할 인식",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_DECISION"
        ],
        "saju": "getSipsung(rB.dg, rA.dg) — B→A 십성",
        "mbti": ": MT_DECISION_PROCESS[B유형].blind + MT_TYPES[A유형].stack[0,1]",
        "cross": "MBTI 단독으로는 서로의 약한 부분을 보완하는 관계만 보이고, 사주 단독으로는 상대를 어떤 역할로 인식하는지만 보인다. 교차하면 B가 A를 어떤 역할로 인식하는지와 A가 실제로 B의 약점을 보완할 수 있는지의 일치 여부가 드러난다. 두 가지가 맞아떨어질 때 인정이 자연스럽고 강력하며, 어긋날 때는 A가 자신의 역할을 어떻게 다시 보여줄지 구체적인 방향이 나온다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-REC-095",
        "tier": "A",
        "name": "자연적 제공 능력의 이중 검증 — 오행 보유량 × 인지기능 강점",
        "tags": [
          "uses:yongshin",
          "ref:MT_CONFLICT"
        ],
        "saju": "sajuA.elFull[B용신oh] + SJ_extractYongshinOh(ggB.yongshin)",
        "mbti": ": MT_TYPES[A유형].stack[0,1] + MT_CONFLICT_STYLES[B유형].needsFromOther",
        "cross": "사주 단독으로는 에너지를 제공할 수 있는 가능성만 보이고, MBTI 단독으로는 심리적으로 충족될 수 있는 가능성만 보인다. 교차하면 A가 B를 위해 무의식적으로 제공하는 에너지와 행동이 얼마나 일치하는지 구조적으로 파악할 수 있다. 어긋날 때는 어느 쪽을 먼저 강화할지 방향을 잡을 수 있다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-REC-094",
        "tier": "A",
        "name": "인정 기준의 이중 레이어 — 에너지적 욕구 × 심리적 욕구",
        "tags": [
          "uses:gyeokguk",
          "uses:yongshin",
          "cf:Ne",
          "ref:MT_CONFLICT",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "SJ_extractYongshinOh(ggB.yongshin) + analyzeGyeokguk(B).gyeokgukName",
        "mbti": ": MT_CONFLICT_STYLES[B유형].needsFromOther + MT_TEMPERAMENTS[B기질].coreNeed",
        "cross": "사주 단독으로는 B에게 에너지적으로 필요한 것만 보이고, MBTI 단독으로는 B에게 심리적으로 필요한 것만 보인다. 교차하면 두 기준이 맞아떨어지는지 어긋나는지가 드러나며, 어긋날 때는 A가 에너지적 충족과 심리적 충족 중 어느 쪽을 먼저 챙겨야 하는지 전략적 판단이 가능해진다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-REC-090",
        "tier": "B",
        "name": "역할 기대와 에너지 가치의 이중 프레임 — B→A 십성 × B 5신에서 A의 위치",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:osin",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(rB.dg, rA.dg) + SJ_getOsinLabel(SJ_calcOsinChegye(B용신oh), A.dmEl)",
        "mbti": ": (사주 단독)",
        "cross": "상대가 나를 어떤 역할로 보는지만으로는 역할 인식만 알 수 있고, 에너지 가치만으로는 궁합만 알 수 있다. 둘을 교차하면 인식은 좋은데 에너지가 안 맞는 경우, 또는 에너지는 맞는데 역할 인식이 부정적인 경우처럼 양가적인 구조가 드러나며, 이것이 인정받기 위한 전략을 결정한다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-REC-092",
        "tier": "B",
        "name": "파격 치유자 vs 파격 자극자 — B의 격국 파격 조건 × A의 행동 방향",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(B).pagyeokInfo + analyzeGyeokguk(B).gyeokgukName + A의 십성 분포",
        "mbti": ": (사주 단독)",
        "cross": "두 사람의 에너지 구조가 서로를 자극하는 방식을 다루는 패턴이 따로 있다면, 이 패턴은 상대방의 에너지 구조 유형에 따라 A가 구체적으로 어떻게 행동해야 하는지에 초점을 맞춘다. 에너지 구조 유형별로 인정받는 행동과 역효과를 내는 행동이 정반대로 갈린다는 점이 핵심이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-REC-091",
        "tier": "B",
        "name": "자연적 제공 vs 의식적 노력 — A의 오행 보유량 × B의 용신 방향",
        "tags": [
          "unsung:사",
          "uses:yongshin"
        ],
        "saju": "sajuA.elFull[B용신oh] + SJ_extractYongshinOh(ggB.yongshin)",
        "mbti": ": (사주 단독)",
        "cross": "양방향 시너지를 다루는 패턴이 따로 있다면, 이 패턴은 A가 B에게 일방향으로 줄 수 있는 에너지의 양에 초점을 맞춘다. 자연스럽게 할 수 있는 행동, 의식적으로 노력해야 하는 행동, 방향을 바꿔야 하는 행동으로 나눠 구체적인 처방을 도출한다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-REC-089",
        "tier": "B",
        "name": "인정의 이중 기준 — 용신 방향 × 격국 유형",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:yongshin"
        ],
        "saju": "SJ_extractYongshinOh(ggB.yongshin) + analyzeGyeokguk(B).gyeokgukName",
        "mbti": ": (사주 단독)",
        "cross": "가장 필요한 에너지만 보면 어떤 에너지가 필요한지만 알 수 있고, 에너지 구조만 보면 어떤 역할을 선호하는지만 알 수 있다. 이 둘을 함께 보면 '어떤 에너지를 어떤 방식으로 제공해야 상대에게 인정받는가'라는 구체적인 행동 지침이 나온다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-REC-093",
        "tier": "B",
        "name": "시간에 따라 변하는 인정 기준 — B의 현재 대운 십성 × B의 용신 방향",
        "tags": [
          "unsung:사",
          "uses:daewoon",
          "uses:yongshin"
        ],
        "saju": "dwB.daewoons[currentDWIdx].ss + DW_SIPSUNG_KW[해당그룹] + SJ_extractYongshinOh(ggB.yongshin)",
        "mbti": ": (사주 단독)",
        "cross": "가장 필요한 에너지와 에너지 구조의 조합이 상대방의 '변하지 않는 인정 기준'을 다룬다면, 이 패턴은 '지금 이 시기의 인정 기준'을 다룬다. 같은 사람이라도 5년 전과 지금 인정하는 포인트가 다를 수 있다는 시간의 흐름에 따른 처방이 핵심이다.",
        "impact": 6
      }
    ],
    "트러블 대처": [
      {
        "id": "CP-WORK-TRBL-102",
        "tier": "A",
        "name": "트러블 복구 이중 처방 키 — B의 용신 에너지 방향 × B의 갈등 필요",
        "tags": [
          "uses:johu",
          "uses:yongshin",
          "ref:MT_CONFLICT"
        ],
        "saju": "SJ_extractYongshinOh(ggB.yongshin) (B의 용신 오행 방향) + analyzeGyeokguk(B).johuNeeds (B의 조후 필요)",
        "mbti": ": MT_CONFLICT_STYLES[B].needsFromOther (B가 갈등 시 상대에게 필요한 것)",
        "cross": "분노 해소와 가장 필요한 에너지 방향의 조합, 그리고 인정받는 방식은 각각 별개의 맥락에서 다뤄진 주제다. 이것은 트러블 복구라는 특수한 상황에서 사주의 체질적 안정화 조건과 MBTI의 갈등 해소에 필요한 조건을 함께 본다. 체질적 안정화와 갈등 해소는 서로 독립적인 층위이며, 두 처방이 합쳐지면 어느 한 체계만으로는 불가능한 정밀한 조언이 된다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TRBL-097",
        "tier": "B",
        "name": "트러블 원인 이중 진단 — 구조적 마찰 vs 시기적 마찰",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:sewoon"
        ],
        "saju": "calcRelations(A↔B).jijiChung + jijiHyung + jijiHae (원국 교차) + analyzeDWSEvsWonkuk(A,dwA).seun1 + analyzeDWSEvsWonkuk(B,dwB).seun1 (세운 충·합)",
        "mbti": ": 없음 — 사주 시간축 고유 체계",
        "cross": "MBTI만으로는 이 트러블이 일시적인지 오래 가는 것인지 알 수 없다. 사주의 10년 흐름과 올해 흐름 시스템만이 마찰의 시간적 성격을 판별해준다. 원래 사주에 있는 에너지 충돌이 이 관계의 구조적 약점이고, 올해 흐름에서 생기는 충돌은 일시적인 자극이라는 이중 구조는 사주 고유의 관점이다.",
        "impact": 8
      },
      {
        "id": "CP-WORK-TRBL-100",
        "tier": "B",
        "name": "통관 오행 중재자 처방 — 상극 일간 조합의 트러블 해소 키",
        "tags": [
          "unsung:사",
          "relation:해",
          "uses:yongshin",
          "uses:gaeun"
        ],
        "saju": "OHAENG_TGAN[A.dg] × OHAENG_TGAN[B.dg] → 상극 여부 + OH_SANG 상생 체인에서 통관 오행 도출 + SJ_GAEUN[통관오행]",
        "mbti": ": 없음 — 통관용신은 사주 오행 역학 고유",
        "cross": "오행의 상생 흐름에서 서로 충돌하는 두 기운 사이를 중재하는 제3의 기운을 찾는 것은 사주 고유의 방식이다. MBTI에는 두 유형 사이를 동적으로 중재하는 제3의 유형이라는 구조적 개념이 없다. 특정 유형 쌍에 고정된 관계 유형은 있지만, 충돌하는 에너지를 상황에 따라 중재하는 처방과는 다르다.",
        "impact": 6
      },
      {
        "id": "CP-WORK-TRBL-099",
        "tier": "B",
        "name": "합산 통변 흉 공식과 구조적 트러블 패턴",
        "tags": [
          "strength:신약+",
          "ss:비겁",
          "ss:상관",
          "unsung:사",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약",
          "tongbyeon:관살혼잡"
        ],
        "saju": "SJ_detectCrossTongbyeon(ggA, ggB) 중 type==='흉' (비겁탈재, 관살혼잡, 재다신약, 상관견관 등)",
        "mbti": ": 없음 — 합산 통변은 사주 십성 역학 고유",
        "cross": "사주의 에너지 성격 간 흐름은 서로 살리고 억제하는 관계로 작동하며, MBTI의 성향 간 상호작용과는 작동 방식이 완전히 다르다. 두 사람의 에너지를 합쳤을 때 어떤 역학이 자동으로 발생하는가는 사주 에너지 성격 체계 고유의 분석이다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TRBL-098",
        "tier": "B",
        "name": "트러블 복구 시간차 — 조후 온도 조합 × 분노 회복 패턴",
        "tags": [
          "unsung:사",
          "unsung:절",
          "unsung:양",
          "uses:johu",
          "uses:yinyang",
          "uses:gaeun"
        ],
        "saju": "analyzeGyeokguk(A).season + analyzeGyeokguk(B).season (조후 계절) + SJ_calcYinYang(A).label + SJ_calcYinYang(B).label (음양 밸런스)",
        "mbti": ": 없음 — 사주 조후 단독으로 감정 온도 시간차 설명",
        "cross": "사주에는 기질의 온도를 다루는 고유한 체계가 있다. MBTI에는 감정이 달아오르는 속도와 식는 속도를 직접 설명하는 변수가 없다. 트러블 이후 감정적으로 회복되는 데 걸리는 시간의 차이를 구조적으로 예측하는 것은 사주만의 고유한 가치다. 예를 들어 여름 기질과 겨울 기질의 조합, 봄 기질과 가을 기질의 조합은 복구 시간차가 구조적으로 다르게 나타난다.",
        "impact": 7
      },
      {
        "id": "CP-WORK-TRBL-101",
        "tier": "B",
        "name": "트러블 에스컬레이션 연쇄 구조 — angerType 조합 × 양방향 기신 자극",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yongshin"
        ],
        "saju": "profileAnalysis(A).angerType × profileAnalysis(B).angerType + SJ_calcOsinChegye(A용신) → B일간 오행 기신 여부 + 역방향",
        "mbti": ": 없음 — angerType은 일간 오행+십성(상관/겁재)으로 결정되는 사주 내부 변수",
        "cross": "사주에서 분노 유형은 나 자신의 타고난 기운과 표현하고 싶은 충동·앞으로 나아가려는 충동의 강약으로 결정된다. 목(木) 기운은 고집스럽게 버티는 분노, 화(火) 기운은 순간 폭발형, 토(土) 기운은 서서히 흔들리는 지진형, 금(金) 기운은 날카롭게 끊어내는 절단형, 수(水) 기운은 조용히 넘쳐흐르는 범람형으로 나타난다. 상대방의 특정 기운이 존재 자체만으로 내 흐름을 방해한다는 원리는 MBTI의 갈등 스타일 분류에는 없는 개념이다.",
        "impact": 7
      }
    ],
    "한 줄 요약": [
      {
        "id": "CP-WORK-SUM-111",
        "tier": "B",
        "name": "관계 유형별 궁합 격차 구조 — 직장 동료 최적화 판별",
        "tags": [
          "unsung:사",
          "uses:gunghap"
        ],
        "saju": "R.scores.love × R.scores.comm × R.scores.values × R.scores.work + REL_TYPE_WEIGHTS[6종] → bestRelType.score - worstRelType.score = gap",
        "mbti": ": 없음 (사주 18레이어 합산 + 관계 가중치 적용)",
        "cross": "사주의 여러 분석 층위에서 나온 네 가지 축의 점수 분포와 관계 유형별 중요도를 함께 보면, 같은 두 사람이라도 관계의 맥락에 따라 궁합이 극단적으로 달라질 수 있음을 구조적으로 보여준다. 개별 패턴 하나하나에서는 드러나지 않는 전체 조감도 수준의 판별이다.",
        "impact": 7
      }
    ]
  },
  "friend": {
    "감정 표현": [
      {
        "id": "FRIEND-EXPR-001",
        "tier": "B",
        "name": "일간 오행 감정 질감 — 감정이 터지는 물리적 형태",
        "tags": [
          "unsung:사",
          "unsung:태"
        ],
        "saju": "ST5_TGAN_DEEP[A.dm].nature + JEOKCHEONSU[A.dm].strong_img / weak_img",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 분석이 적합한 영역이다. 나 자신의 오행 기운은 감정의 물리적 형태를 결정한다. 폭발하는지, 스며드는지, 잘라내는지, 흔들어버리는지 같은 감정의 형태가 오행으로 결정된다. MBTI의 감정 판단 성향은 감정을 판단 기준으로 얼마나 쓰는지를 측정하는 것으로 차원이 다르다. 목(木) 기운이 강한 사람은 감정 판단 성향과 무관하게 '곧게 뻗는 표현 형태'가 나타난다.",
        "impact": 8
      },
      {
        "id": "FRIEND-EXPR-011",
        "tier": "B",
        "name": "T/F 축 강도별 감정 표현 역치 — 감정이 밖으로 나오는 문턱의 높이",
        "tags": [
          "axis:TF",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "없음",
        "mbti": ": MT_INTENSITY_PROFILES(F/T) 강도 55/68/88",
        "cross": "MBTI 단독 분석이 적합한 영역이다. 사주에서 사회적 압박이 감정 표현을 억누르는 구조라면, 감정 판단 성향의 강도는 감정 자체를 판단 기준으로 얼마나 사용하는지를 나타낸다. 이 억누르는 힘이 강해도 감정 판단 성향이 강하면 감정은 내면에서 강렬하게 느껴지되 표현만 억제된다. 반대로 감정 판단 성향이 약하고 이 억누르는 힘도 약하면 감정 표현 자체가 드물다. 두 차원은 서로 다른 층위에서 작동한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-EXPR-008",
        "tier": "B",
        "name": "식상 × 인성 내부 교차 — 말하려다 삼키는 구조",
        "tags": [
          "ss:인성",
          "ss:식상",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).cnt['식상'] ≥ 1.5 AND analyzeGyeokguk(A).cnt['인성'] ≥ 1.5",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 내부 교차 분석이다. 감정을 밖으로 드러내고 표현하려는 에너지와 안으로 받아들이고 쌓으려는 에너지라는 두 흐름이 동시에 활성화될 때 생기는 감정 표현의 내적 모순을 포착한다. 밖으로 내보내고 싶은 충동과 안으로 담아두고 싶은 충동이 동시에 작동하는 상태인데, MBTI에는 이에 대응하는 단일 변수가 없다.",
        "impact": 7
      },
      {
        "id": "FRIEND-EXPR-009",
        "tier": "B",
        "name": "인지기능별 감정 표현 채널 — 감정이 어떤 심리적 경로로 밖에 나오는가",
        "tags": [
          "ref:MT_ANGER"
        ],
        "saju": "없음",
        "mbti": ": MT_ANGER.byFunction, MT_TYPES(A).stack[0]/stack[1]",
        "cross": "MBTI 단독 분석이 적합한 영역이다. 사주의 오행 기운이 감정의 물리적 형태를 포착한다면, 심리 성향은 감정의 심리적 처리 경로를 포착한다. 목(木) 기운의 직선적 표현은 어떤 심리 성향이든 변하지 않지만, 내면에 축적했다가 폭발하는 성향과 즉각적으로 직접 표현하는 성향은 같은 목(木) 기운이라도 완전히 다른 타이밍과 강도로 나타난다.",
        "impact": 8
      },
      {
        "id": "FRIEND-EXPR-010",
        "tier": "B",
        "name": "유형별 감정 표현 종합 프로필 — 친구에게 감정을 드러내는 방식, 맹점, 필요",
        "tags": [
          "ref:MT_CONFLICT"
        ],
        "saju": "없음",
        "mbti": ": MT_CONFLICT_STYLES(A).fightStyle, .communication, .needsFromOther, .blindSpot",
        "cross": "MBTI 단독 분석이 적합한 영역이다. 사주의 에너지 성격별 감정 구조가 에너지 역학을 설명한다면, MBTI 갈등 스타일은 실제 대인 상황에서 관찰 가능한 행동 패턴을 설명한다. 사주가 왜 이런 감정 구조인지를 설명한다면, MBTI는 실제로 어떤 행동으로 나타나는지를 설명한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-EXPR-007",
        "tier": "B",
        "name": "일지 12운성 감정 표현 강도 — 내면 에너지 상태가 결정하는 표현 볼륨",
        "tags": [
          "uses:unsung",
          "unsung:사",
          "unsung:태"
        ],
        "saju": "A.uns[2] → UNSUNG_KW[해당운성]",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 분석이 적합한 영역이다. 에너지 활성 상태는 사주 특유의 에너지 상태 분류로 MBTI에 직접 대응하는 변수가 없다. 같은 표현 에너지를 가져도 에너지가 힘차게 살아 움직이는 상태이면 크게 표현하고, 에너지가 조용히 가라앉아 있는 상태이면 속에 숨기는 볼륨 차이를 이 변수가 결정한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-EXPR-006",
        "tier": "B",
        "name": "비겁 에너지의 감정 방어 — 감정이 무시당하지 않도록 지키는 힘",
        "tags": [
          "ss:비겁",
          "ss:겁재",
          "ss:비견",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).cnt['비겁'], SJ_countIndividualSS(A)['비견'] vs SJ_countIndividualSS(A)['겁재']",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 분석이 적합한 영역이다. 나 자신을 지키는 에너지의 감정 방어 기능은 MBTI의 내향·외향과 다른 차원이다. 외향형이라도 자기 자신을 지키는 에너지가 약하면 감정 갈등에서 쉽게 물러나고, 내향형이라도 자기 자신을 지키는 에너지가 강하면 한번 표현한 감정은 절대 철회하지 않는다.",
        "impact": 6
      },
      {
        "id": "FRIEND-EXPR-005",
        "tier": "B",
        "name": "궁위별 식상 배치 — 감정 표현이 발동하는 관계 범위",
        "tags": [
          "ss:식신",
          "ss:상관",
          "unsung:사"
        ],
        "saju": "A.ss[0~3].ss 중 식신/상관 위치 (SSP['식신']/SSP['상관'] 궁위별)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독. 인생의 어떤 영역(어린 시절과 외부 환경 / 사회와 직업 / 나 자신 / 자녀와 노년)에 에너지가 놓이는지는 사주 고유의 시공간 배치 개념으로, MBTI에는 이에 대응하는 개념이 없다. 같은 창의적 표현 에너지라도 외부 환경 영역에 있을 때와 노년 영역에 있을 때는 감정 표현의 범위가 완전히 달라진다.",
        "impact": 7
      },
      {
        "id": "FRIEND-EXPR-004",
        "tier": "B",
        "name": "관성 에너지의 감정 억제 — 사회적 자기검열이 감정을 막는 구조",
        "tags": [
          "ss:편관",
          "ss:정관",
          "ss:관성",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).cnt['관성'], SJ_countIndividualSS(A)['정관'] vs SJ_countIndividualSS(A)['편관']",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독. 사회적 압박과 자기 규율을 통해 감정 표현을 억제하는 에너지 메커니즘이다. MBTI의 계획·판단 성향과 교차하는 패턴은 이미 별도로 다뤄지고 있으며, 이 패턴은 감정을 억제하는 에너지가 안정적으로 작동하는 방식과 압박적으로 작동하는 방식을 구분하는 사주 고유의 세분화를 포착한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-EXPR-003",
        "tier": "B",
        "name": "인성 에너지의 감정 흡수 — 감정이 사고로 전환되는 구조",
        "tags": [
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "unsung:사",
          "axis:TF"
        ],
        "saju": "analyzeGyeokguk(A).cnt['인성'], SJ_countIndividualSS(A)['정인'] vs SJ_countIndividualSS(A)['편인']",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독. 배우고 익히는 방식으로 감정을 사고로 전환하는 특성은 MBTI의 논리적으로 분석하는 성향과 표면적으로 유사해 보이지만, 이 전환 방식은 차분하고 정통적인 방식과 독특하고 비정형적인 방식으로 나뉘어 1:1 대응이 되지 않는다. 또한 이 특성은 배움과 보호의 성질을 가진 것이지 논리적 판단이 아니다.",
        "impact": 7
      },
      {
        "id": "FRIEND-EXPR-002",
        "tier": "B",
        "name": "식상 에너지 유무와 유형 — 감정 표현 채널의 존재와 성격",
        "tags": [
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).cnt['식상'], SJ_countIndividualSS(A)['식신'] vs SJ_countIndividualSS(A)['상관']",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 분석이 적합한 영역이다. 감정을 말이나 행동으로 밖으로 꺼낼 수 있는지 여부가 표현 가능 여부를 결정한다. MBTI의 내향·외향은 에너지 방향이지 이 표현 통로의 존재를 결정하지 않는다. 외향형이라도 이 통로가 없으면 감정을 말로 표현하지 못한다.",
        "impact": 9
      },
      {
        "id": "FRIEND-EXPR-012",
        "tier": "S",
        "name": "감정 표현 출구 × 감정 처리 경로 교차 — 출구의 유무/성격과 심리적 경로의 결합",
        "tags": [
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "analyzeGyeokguk(A).cnt['식상'], SJ_countIndividualSS(A)['식신'] vs ['상관']",
        "mbti": ": MT_ANGER.byFunction(주기능 대응), MT_TYPES(A).stack[0]",
        "cross": "감정 표현의 감성·논리 방향을 큰 틀로 포착하는 것과 달리, 이 패턴은 MBTI의 여러 심리 성향 각각이 감정을 처리하는 방식(지속 시간, 해소 방식 포함)과 감정이 밖으로 나오는 방식(부드럽게 흘러나오는 방식 / 날카롭고 강하게 터지는 방식 / 잘 나오지 않고 막혀있는 방식)을 교차하여 실제 감정 표현의 구체적인 양태를 포착한다. 같은 감성형이라도 감정을 내면에 쌓아두다 한꺼번에 터뜨리는 사람과 즉각적으로 관계 속에서 풀어내는 사람은 표현 방식과 결합했을 때 완전히 다른 모습이 나온다. 감성·논리 이분법만으로는 이 차이를 잡을 수 없다.",
        "impact": 7
      }
    ],
    "같이 성장": [
      {
        "id": "FRIEND-GROW-001",
        "tier": "B",
        "name": "대운 성장 동기화 — 인생 10년 리듬의 동시 상승",
        "tags": [
          "uses:daewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.dw (sync 판정) + DW_SIPSUNG_KW[대운십성].strong/weak",
        "mbti": ": 없음",
        "cross": "시간축 분석은 사주의 고유 영역이다. 두 사람의 10년 흐름에서 에너지 방향이 동시에 같은 방향을 가리키는지, 엇갈리는지를 10년 단위로 판별하여 우정의 장기 리듬을 예측한다.",
        "impact": 8
      },
      {
        "id": "FRIEND-GROW-004",
        "tier": "B",
        "name": "끊어진 상생 체인 보완 — 에너지 순환 복원의 열쇠",
        "tags": [
          "unsung:사",
          "unsung:양",
          "unsung:쇠"
        ],
        "saju": "findBrokenChain(sajuA) → missing 오행, sajuB.elFull[missing] ≥ 2 (양방향 검사)",
        "mbti": ": 없음",
        "cross": "에너지 보완이 부족한 기운을 정적으로 채워주는 것이라면, 여기서는 에너지 흐름의 복원이라는 동적 관점에서 성장 구조를 본다. 단순히 없는 것을 채워주는 것이 아니라 흐름이 복원되어 전체가 돌아가기 시작하는 질적 변화를 포착한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GROW-005",
        "tier": "B",
        "name": "격국 파격 상호 교정 — 상대가 내 뒤틀린 에너지를 바로잡는 구조",
        "tags": [
          "uses:gyeokguk",
          "condition:패격"
        ],
        "saju": "analyzeGyeokguk(A).pagyeokInfo + analyzeGyeokguk(A).gyeokgukName → JAPYEONG_GG[격국].breaks[].remedy 필요 십성/오행, B의 해당 에너지 보유 여부",
        "mbti": ": 없음",
        "cross": "가장 필요한 에너지를 보완하는 것이 에너지 보충이라면, 여기서는 구조적 뒤틀림의 교정이다. 부족한 에너지를 채우는 것과 잘못된 에너지 흐름을 바로잡는 것은 차원이 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GROW-008",
        "tier": "B",
        "name": "인생 로드맵 교차 — 두 사람의 인생 단계 맞물림",
        "tags": [
          "unsung:사",
          "unsung:태",
          "uses:daewoon",
          "uses:osin"
        ],
        "saju": "SJ_buildLifeRoadmap(dwA) + SJ_buildLifeRoadmap(dwB) — 대운별 십성 운 + 5신 태그",
        "mbti": ": 없음",
        "cross": "각각의 성장 메커니즘을 개별적으로 다루는 패턴들이 있다면, 여기서는 인생 전체를 조감도로 보여주는 통합 패턴이다. 두 사람의 인생이 어떻게 맞물려 돌아가는지를 한눈에 보여준다.",
        "impact": 8
      },
      {
        "id": "FRIEND-GROW-009",
        "tier": "B",
        "name": "성장 방향 호환성 — 서로의 발달 경로가 자극이 되는 구조",
        "tags": [
          "uses:dominant"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[A].growthPath + MT_TYPES[B].growthPath + MT_TYPES[A/B].stack",
        "cross": "MBTI 단독. 성장 방향은 MBTI의 심리 성향이 어떻게 발달하는가에서 도출되는 것으로, 사주의 시간축 성장과는 다른 차원이다. 사주는 언제 성장하는가를 다루고, MBTI는 어떤 방향으로 성장하는가를 다룬다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GROW-007",
        "tier": "B",
        "name": "삼합 트리거 성장 폭발 — 세운이 완성하는 팀 에너지의 시간적 폭발",
        "tags": [
          "relation:삼합",
          "uses:sewoon"
        ],
        "saju": "SJ_findHapTrigger(sajuA/B) + GH_SAMHAP 교차 삼합 — 원국에 삼합 2글자 보유 + 나머지 1글자가 상대 원국 또는 세운에 존재",
        "mbti": ": 없음",
        "cross": "특정 에너지 조합의 정적인 존재를 다루는 패턴이 따로 있다면, 여기서는 올해 흐름이라는 시간축 트리거가 그 에너지 조합에 불을 붙이는 동적 폭발을 다룬다. 올해 함께 도전하면 터지는 이유를 설명한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-GROW-003",
        "tier": "B",
        "name": "용신 보완의 성장 촉매 — 함께 있으면 성장이 빨라지는 구조",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yongshin"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) → A용신오행, sajuB.elFull[A용신오행] ≥ 2 (양방향 검사)",
        "mbti": ": 없음",
        "cross": "정적인 보완의 편안함을 다루는 패턴이 따로 있다면, 여기서는 시간의 흐름 속에서 나타나는 동적 성장 촉매 효과를 다룬다. 함께 1년, 3년, 10년 지낸 후의 변화 방향을 예측한다.",
        "impact": 8
      },
      {
        "id": "FRIEND-GROW-010",
        "tier": "B",
        "name": "열등기능 안전 연습장 — 상대 곁에서 약점을 키우는 구조",
        "tags": [
          "uses:dominant",
          "uses:inferior"
        ],
        "saju": "없음",
        "mbti": ": MT_TYPES[A].stack[3] (열등기능) === MT_TYPES[B].stack[0] (주기능), MT_STACK_POSITIONS.inferior, MT_STRESS_STAGES.stage5_recovery",
        "cross": "MBTI 단독. 자신이 가장 불편해하는 성향을 조금씩 받아들이고 익숙해져 가는 과정은 심리적 성장의 핵심이며, 사주의 에너지 보완과는 다른 차원의 과정이다. 갈망이 무엇인지를 아는 것과 실제로 성장하는 조건을 아는 것은 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GROW-012",
        "tier": "B",
        "name": "인지기능 성숙도 상호 촉진 — mature 버전의 모델을 보여주는 친구",
        "tags": [
          "ref:MT_MATURITY"
        ],
        "saju": "없음",
        "mbti": ": MT_MATURITY[기능명].mature, MT_TYPES[A].stack[0] === MT_TYPES[B].stack[2] 또는 stack[3]",
        "cross": "MBTI 단독. 심리 성향이 미숙한 단계에서 점차 발전하고 성숙해지는 질적 변화 과정은 사주의 에너지 보완이나 시간축 분석과는 완전히 다른 차원이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-GROW-006",
        "tier": "B",
        "name": "세운 5년 성장 창 — 가까운 미래의 동시 상승 구간",
        "tags": [
          "dm:기",
          "pillar:년주",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.timing.years — 5년간 세운 동기화 점수",
        "mbti": ": 없음",
        "cross": "무엇을 함께 하면 좋은가를 다루는 패턴들이 있다면, 여기서는 언제 함께 하면 좋은가라는 시간축 차원을 다룬다.",
        "impact": 6
      },
      {
        "id": "FRIEND-GROW-011",
        "tier": "B",
        "name": "루프 탈출 상호 도움 — 상대가 내 악순환을 깨는 열쇠",
        "tags": [
          "unsung:쇠",
          "uses:dominant",
          "uses:auxiliary",
          "stress:loop"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES.stage3_loop, MT_TYPES[A].loop, MT_TYPES[A].stack[1] (부기능) === MT_TYPES[B].stack[0] (주기능)",
        "cross": "MBTI 단독. 특정 심리 성향들이 맞물려 만들어내는 만성적 악순환은 MBTI에서 정립된 개념으로, 사주의 10년 주기 에너지 환경 변화와는 시간 단위와 작동 방식이 완전히 다르다. 이 악순환에서 벗어나는 것은 심리적 상태의 전환이고, 10년 주기의 에너지 변화는 외부 환경이 바뀌는 것이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-GROW-002",
        "tier": "B",
        "name": "교운기 동시 발동 — 인생 전환점의 동시 체험",
        "tags": [
          "uses:daewoon",
          "condition:교운기"
        ],
        "saju": "SJ_findGyowoongi(dwA) + SJ_findGyowoongi(dwB) — 대운 전환점 시기",
        "mbti": ": 없음",
        "cross": "10년 주기 에너지 전환점은 사주 고유의 개인별 시간축 변곡점이다. 두 사람의 전환점이 우연히 겹치는 시기를 포착하여 함께 변하는 경험의 가능성을 예측한다.",
        "impact": 7
      }
    ],
    "같이 잘 되는 것": [
      {
        "id": "FRIEND-GOOD-003",
        "tier": "A",
        "name": "교차 삼합 완성 시너지 — 둘이 함께일 때만 활성화되는 팀 에너지",
        "tags": [
          "unsung:사",
          "unsung:묘",
          "relation:삼합",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.samhap → GH_SAMHAP 4조 교차 완성 여부 (해묘미→목, 인오술→화, 사유축→금, 신자진→수)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "혼자서는 잠재된 에너지였던 것이 특정 친구를 만나 완성되는 구조. 관계 자체가 에너지를 창출하는 가장 극적인 사례.",
        "impact": 7
      },
      {
        "id": "FRIEND-GOOD-001",
        "tier": "A",
        "name": "교차 통변 시너지 — 함께할 때만 발현되는 에너지 패턴",
        "tags": [
          "ss:비겁",
          "ss:식상",
          "unsung:사",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "tongbyeon:재관쌍미",
          "tongbyeon:인수생비"
        ],
        "saju": "SJ_detectCrossTongbyeon(ggA, ggB) → 합산 십성 분포에서 발현되는 통변 공식 (식상생재, 살인상생, 재관쌍미, 인수생비, 비겁탈재 등)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "혼자서는 나타나지 않지만 둘이 합쳐졌을 때만 발현되는 에너지 공식. 이것은 두 사람의 관계 자체가 만들어내는 고유한 시너지다.",
        "impact": 8
      },
      {
        "id": "FRIEND-GOOD-004",
        "tier": "B",
        "name": "천간합 궁위별 시너지 영역 — 합이 가리키는 구체적 활동 차원",
        "tags": [
          "pillar:월간",
          "pillar:시주",
          "pillar:년주",
          "unsung:사",
          "relation:천간합",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.gan → 천간합 발생 궁위 (년간-년간, 월간-월간, 일간-일간, 시간-시간 등) × HAP_GUNGWI_KW",
        "mbti": ": 없음 (사주 단독)",
        "cross": "두 사람의 하늘 에너지가 결합하는 방식과 자리를 살펴보는 것에서 나아가, 여기서는 그 결합이 어떤 활동에서 시너지로 나타나는지를 구체화한다. 어디에서 잘 맞는가에서 무엇을 함께 하면 잘 맞는가로의 전환이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GOOD-002",
        "tier": "B",
        "name": "오행 보완 활동 시너지 — 채워진 에너지가 여는 구체적 활동 영역",
        "tags": [
          "condition:lack",
          "unsung:사"
        ],
        "saju": "sajuA.lackFull × sajuB.elFull + OH_EFFECT[보완오행] → 보완되는 오행이 활성화하는 구체적 활동 영역",
        "mbti": ": 없음 (사주 단독)",
        "cross": "서로 부족한 기운을 채워주는 끌림의 이유를 살펴보는 것에서 나아가, 여기서는 그 끌림이 어떤 활동에서 시너지로 나타나는지를 구체화한다. 끌리는 이유가 아니라 시너지가 터지는 영역을 특정한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GOOD-006",
        "tier": "B",
        "name": "용신 보완 개운 시너지 — 친구가 곧 개운법인 관계",
        "tags": [
          "unsung:사",
          "uses:yongshin"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) → A용신오행, sajuB.dmEl → B의 일간 오행이 A용신과 일치하거나 생하는 경우",
        "mbti": ": 없음 (사주 단독)",
        "cross": "두 사람의 에너지 보완 관계를 살펴보는 것에서 나아가, 여기서는 그 보완이 실제로 어떤 활동에서 빛을 발하는지를 구체화한다. 함께 먹으면 좋은 것, 함께 하면 좋은 활동, 관계를 안정시키는 루틴까지 포함하여 무엇을 함께하면 좋은가를 특정한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-GOOD-009",
        "tier": "B",
        "name": "우정 giving-needing 상호 보완 시너지 — 주는 것과 필요한 것의 맞물림",
        "tags": [
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_FRIENDSHIP[A].giving × MT_FRIENDSHIP[B].needing + MT_FRIENDSHIP[B].giving × MT_FRIENDSHIP[A].needing",
        "cross": "왜 편한가의 구조적 이유가 기질·축·스타일의 시너지에서 나온다면, 주고받는 것은 함께 무언가를 할 때 구체적으로 무엇을 주고받는가의 활동 산출물을 포착한다. 같은 관계 유형이라도 주고받는 것의 구체적인 맞물림 양상이 다르면 시너지가 나는 활동이 달라진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-GOOD-007",
        "tier": "B",
        "name": "지지 육합 궁위별 시너지 영역 — 환경적 결합이 여는 활동 차원",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "unsung:사",
          "relation:육합",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.ji → 육합 발생 궁위 (년지-년지, 월지-월지, 일지-일지, 시지-시지 등) × 합화오행",
        "mbti": ": 없음 (사주 단독)",
        "cross": "두 사람 사이의 에너지 결합과 팀 에너지를 살펴보는 것에서 나아가, 여기서는 결합으로 만들어지는 에너지의 성격과 그것이 인생의 어느 자리에서 일어나는지를 함께 보아 어떤 차원에서 어떤 질감의 시너지가 나는지를 구체적으로 특정한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-GOOD-010",
        "tier": "B",
        "name": "기질 조합별 시너지 활동 영역 — 함께하면 잘 되는 구체적 활동 유형",
        "tags": [
          "cf:Ne",
          "ref:MT_TEMPERAMENTS",
          "temperament:NT",
          "temperament:SP",
          "temperament:SJ"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_TEMPERAMENTS[A].coreNeed + MT_TEMPERAMENTS[B].coreNeed → 기질 조합(NF+NT, SP+SJ, NF+SP 등)별 활동 영역",
        "cross": "기질이 맞는 이유를 살펴보는 것에서 나아가, 이 패턴은 기질 조합이 가리키는 구체적인 활동 영역을 특정한다. 같은 기질 시너지라도 감성적이고 직관적인 사람끼리와 직관적이지만 논리적인 사람의 조합은 시너지가 나는 활동이 완전히 다르다.",
        "impact": 5
      },
      {
        "id": "FRIEND-GOOD-005",
        "tier": "B",
        "name": "십성 역할 분담 시너지 — 두 사람의 강점이 맞물리는 활동 구조",
        "tags": [
          "unsung:사",
          "uses:job",
          "uses:dominant"
        ],
        "saju": "analyzeGyeokguk(A).dominant + analyzeGyeokguk(B).dominant → 두 사람의 주력 십성 조합이 SJ_JOB_APTITUDE의 어떤 적성 패턴과 매칭되는가",
        "mbti": ": 없음 (사주 단독)",
        "cross": "개인의 직업 적성이 아니라 '두 사람이 합쳐졌을 때의 활동 적성'. 혼자서는 약한 축이 친구와 함께하면 강해지는 구조.",
        "impact": 6
      },
      {
        "id": "FRIEND-GOOD-008",
        "tier": "B",
        "name": "납음 질감 조화 시너지 — 존재 에너지가 만드는 자연스러운 활동 영역",
        "tags": [
          "unsung:사",
          "uses:napeum"
        ],
        "saju": "getNapeum(A.dg, A.dj).name + getNapeum(B.dg, B.dj).name → 납음 오행 상생/비화 관계에서 도출되는 활동 시너지",
        "mbti": ": 없음 (사주 단독)",
        "cross": "두 사람의 에너지 조화를 살펴보는 것에서 나아가, 여기서는 그 에너지가 만들어내는 구체적인 이미지와 분위기를 활용하여 어떤 환경과 활동이 두 사람에게 가장 자연스러운지를 감각적으로 특정한다.",
        "impact": 5
      }
    ],
    "맞춰가야 할 부분": [
      {
        "id": "FRIEND-ADJ-010",
        "tier": "A",
        "name": "양방향 역할 갈등 × 관계 유형 교차 — 구조적 역할 충돌의 이중 확인",
        "tags": [
          "unsung:양",
          "relation:충",
          "uses:sipsung_rel",
          "ref:MT_RELATION"
        ],
        "saju": "getSipsung(A.dg, B.dg) → A→B 십성 AND getSipsung(B.dg, A.dg) → B→A 십성 → 갈등 조합",
        "mbti": ": MT_RELATION_TYPES (conflict/supervisor/quasiIdentical), MT_RELATION_MATRIX",
        "cross": "사주의 에너지 역할 교차는 누가 누구에게 어떤 영향을 주고받는가를 보고, MBTI의 관계 유형은 각자의 강한 성향이 상대의 어느 성향을 자극하는가를 본다. 두 체계가 같은 방향을 가리키면 그 해석이 더욱 확실해지고, 다른 방향을 가리키면 관계의 복잡한 다면성이 드러난다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-011",
        "tier": "A",
        "name": "에너지 주도권 불균형 × 상호작용 스타일 교차 — 누가 이끄는가의 이중 확인",
        "tags": [
          "uses:gunghap",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "analyzeGunghap.details.strength.combo → 쌍강/쌍약/A강B약/A약B강/균형",
        "mbti": ": MT_INTERACTION_STYLES(A) vs MT_INTERACTION_STYLES(B)",
        "cross": "사주의 에너지 충만도는 선천적인 에너지 밀도이고, MBTI의 상호작용 스타일은 실제 행동 패턴이다. 에너지가 충만해도 뒤에서 조율하는 스타일이면 뒤에서 움직이고, 에너지가 부족해도 앞에 나서는 스타일이면 이끌려 한다. 두 체계가 같은 방향이면 불균형이 뚜렷하게 보이고, 방향이 다르면 에너지와 행동이 어긋나 있어 서로 조율이 필요하다는 신호가 된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-008",
        "tier": "B",
        "name": "음양 리듬 불일치 — 활동/휴식 패턴의 어긋남",
        "tags": [
          "unsung:사",
          "unsung:양",
          "uses:yinyang"
        ],
        "saju": "SJ_calcYinYang(A) vs SJ_calcYinYang(B) → 양/음 비율 차이",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "음양의 균형은 에너지의 방향성과 활동 리듬을 동시에 반영한다. MBTI의 외향·내향 성향과 개념적으로 유사하지만 보는 방식이 다르다. 사주는 하늘·땅 에너지의 홀짝으로 보고, MBTI는 에너지 방향에 대한 자신의 성향으로 본다. 두 체계가 같은 방향이면 확신이 높아지고, 방향이 다르면 내 안에 서로 다른 두 가지 리듬이 공존한다는 신호다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ADJ-006",
        "tier": "B",
        "name": "대운 비동기화 — 인생 리듬의 온도차",
        "tags": [
          "unsung:사",
          "uses:daewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.dw → sync 판정 ('동반 상승기'/'A가 끌어올리는 시기'/'B가 끌어올리는 시기'/'함께 인내하는 시기')",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "시간의 흐름에 따른 에너지 변화는 '같은 두 사람이라도 시기에 따라 관계 온도가 달라지는' 시간축 분석을 제공한다. 이것은 사주 고유의 강점으로, MBTI는 시간에 따른 변화를 설명하는 메커니즘이 약하다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-014",
        "tier": "B",
        "name": "인지기능 축 긴장 — 같은 시소의 반대편에 선 두 친구",
        "tags": [
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "ref:MT_AXES"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_AXES (Fi-Te, Fe-Ti, Ne-Si, Ni-Se), MT_TYPES(A).stack[0], MT_TYPES(B).stack[0]",
        "cross": "가장 강한 성향과 가장 약한 성향이 시소처럼 맞물려 있어서, 한쪽이 강하게 올라가면 반대쪽은 자연스럽게 내려가는 경향이 있다. 극심한 스트레스 상황에서 어느 방향으로 무너지는지도 이 심리적 균형 원리에서 나온다. 사주의 에너지 상극이 유사한 개념이지만, 이 심리적 시소 현상은 MBTI 고유의 설명이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-002",
        "tier": "B",
        "name": "오행 과다 × 기신 충돌 — 함께 있으면 지치는 구조",
        "tags": [
          "condition:excess",
          "unsung:사",
          "relation:충",
          "uses:yongshin"
        ],
        "saju": "A.elFull[오행] ≥ 3.0 (과다) AND B의 SJ_calcOsinChegye(B용신).gisin === 해당 오행",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "특정 에너지가 지나치게 많으면 본인이 통제하기 어려운 자동 발산 에너지가 되고, 나와 맞지 않는 에너지는 무의식적으로 불쾌함을 만드는 채널이 된다. 이 둘이 일치하면 의도 없이 가해와 피해 구조가 만들어진다. MBTI의 외향·내향 성향과 함께 보면 넘치는 에너지가 외부로 발산되는 강도를 조절하는 데 도움이 된다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ADJ-013",
        "tier": "B",
        "name": "의사결정 맹점 충돌 — 한 사람의 마지막 고려가 다른 사람의 첫 번째 기준",
        "tags": [
          "unsung:사",
          "relation:충",
          "ref:MT_DECISION"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_DECISION_PROCESS(A).flow, MT_DECISION_PROCESS(A).blind, MT_DECISION_PROCESS(B).flow, MT_DECISION_PROCESS(B).blind",
        "cross": "의사결정의 흐름과 맹점은 심리 성향들이 작동하는 순서와 우선순위에서 직접 나온다. 사주의 의사결정 관련 변수인 에너지 구조와 가장 필요한 에너지 방향은 작동 원리가 근본적으로 다르다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ADJ-005",
        "tier": "B",
        "name": "원진살 교차 — 미묘하게 밀어내는 지속적 부조화",
        "tags": [
          "unsung:사",
          "unsung:묘",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.wonjin → 원진 목록 (궁위별)",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "설명하기 어려운 미묘한 불편함의 구조적 원인이 사주에 담겨 있다. 에너지 충돌이나 마찰과 달리 의식적으로 감지되지 않아, 이 사람이랑 있으면 왠지 좀 불편한데 이유를 모르겠다는 막연한 느낌의 정체가 된다. MBTI의 상호작용 스타일과 함께 보면 이 미묘한 불편함이 어떤 행동 장면에서 구체적으로 드러나는지 알 수 있다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ADJ-001",
        "tier": "B",
        "name": "교차 충·형·해 궁위 — 두 사람 사이의 구조적 마찰 지점",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "unsung:사",
          "relation:충",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap(A,B).details.ji → 충/형/해 항목 × 궁위(년지/월지/일지/시지)",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "에너지 충돌과 마찰은 두 사람 관계의 구조적 마찰 지점이 인생의 어느 자리(외부환경·사회·내면·미래)에서 생기는지 알려준다. MBTI의 갈등 스타일과 함께 보면 어디서(어느 자리)와 어떻게(갈등 양식) 부딪히는가를 동시에 파악할 수 있다.",
        "impact": 9
      },
      {
        "id": "FRIEND-ADJ-007",
        "tier": "B",
        "name": "교차 통변 흉 패턴 — 둘이 함께할 때 발현되는 구조적 위험",
        "tags": [
          "strength:신약+",
          "ss:비겁",
          "unsung:사",
          "tongbyeon:비겁탈재",
          "uses:tongbyeon",
          "tongbyeon:재다신약",
          "tongbyeon:관살혼잡"
        ],
        "saju": "SJ_detectCrossTongbyeon(ggA, ggB) → 흉 통변(비겁탈재, 관살혼잡, 재다신약 등)",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "두 사주가 만날 때만 나타나는 에너지 패턴은 개인 사주에는 없는 것이다. 혼자일 때는 괜찮은데 같이 있으면 왜 이런 일이 생기는지의 구조적 원인이 여기에 있다. 두 사람이 함께할 때만 생겨나는 고유한 에너지 흐름이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-004",
        "tier": "B",
        "name": "강약 불균형 — 에너지 밀도 차이가 만드는 관계 비대칭",
        "tags": [
          "unsung:사",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.strength.combo → '쌍강'/'쌍약'/'A강B약'/'A약B강'/'균형'",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "에너지 충만도는 자아 에너지의 밀도로, 관계에서 누가 더 밀어붙이는가를 결정한다. MBTI의 외향·내향 성향과 함께 보면 에너지 밀도와 에너지 방향을 함께 파악하여 관계 역학을 더 입체적으로 볼 수 있다. 에너지가 충만하면서 내향적이면 밀도는 높지만 외부 표현이 약하고, 에너지가 부족하면서 외향적이면 밀도는 낮지만 외부 활동은 활발하다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-015",
        "tier": "B",
        "name": "분노 해소 불일치 — 화해 방식의 구조적 어긋남",
        "tags": [
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_ANGER.byFunction(A 주기능), MT_ANGER.byFunction(B 주기능), MT_CONFLICT_STYLES(A).needsFromOther, MT_CONFLICT_STYLES(B).needsFromOther",
        "cross": "각 성향별로 분노가 표현되는 방식, 무엇이 분노를 촉발하는지, 얼마나 지속되는지, 어떻게 해소되는지가 잘 정리되어 있다. 서운함의 질감을 다루는 것과 달리, 여기서는 해소 방식의 불일치와 조율 방법에 초점을 맞춘다. 사주의 타고난 에너지 성격별 감정 반응이 유사하지만, 분노의 심리적 해소 방식은 MBTI가 더 정교하게 설명한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ADJ-012",
        "tier": "B",
        "name": "스트레스 시 상호 이해 불능 — 루프/그립 상태에서 친구가 겪는 당혹",
        "tags": [
          "unsung:태",
          "stress:grip",
          "stress:loop"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_STRESS_STAGES.stage3_loop, MT_STRESS_STAGES.stage4_grip, MT_TYPES(A).loop, MT_TYPES(A).stressPattern, MT_TYPES(B).loop, MT_TYPES(B).stressPattern",
        "cross": "만성적 악순환과 극심한 스트레스 상태는 MBTI의 심리 성향 역학에서만 나오는 현상으로, 사주의 에너지 체계에서는 이에 직접 대응하는 변수가 없다. 스트레스가 극에 달했을 때 평소에 가장 약한 성향이 통제를 잃고 터져나오는 것은 MBTI 고유의 설명력이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ADJ-003",
        "tier": "B",
        "name": "십성 역할 갈등 구조 — 서로에게 부여되는 관계 역할의 충돌",
        "tags": [
          "unsung:사",
          "relation:충",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(A.dg, B.dg) → A→B 십성 AND getSipsung(B.dg, A.dg) → B→A 십성 → 갈등 조합 판별",
        "mbti": ": 없음 (첫 턴 — 사주 단독 제안, 교차 대기)",
        "cross": "에너지 역할은 두 사람 관계에서 자동으로 역할이 배정되는 시스템이다. 한쪽이 다른 쪽에게 강한 영향을 미치거나 반발을 일으키는 조합은 구조적으로 지시와 반발 패턴을 만들고, 서로 비슷한 에너지끼리는 경쟁과 쟁탈 패턴을 만든다. MBTI의 갈등 스타일·상호작용 스타일과 함께 보면 어떤 역할 갈등이 어떤 행동으로 표출되는가를 동시에 파악할 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ADJ-009",
        "tier": "S",
        "name": "갈등 영역 × 갈등 스타일 교차 — 어디서 + 어떻게 부딪히는가",
        "tags": [
          "pillar:일지",
          "pillar:월지",
          "pillar:시주",
          "pillar:년주",
          "relation:충",
          "uses:gunghap",
          "ref:MT_CONFLICT"
        ],
        "saju": "analyzeGunghap(A,B).details.ji → 충/형/해 궁위(년지/월지/일지/시지)",
        "mbti": ": MT_CONFLICT_STYLES(A).fightStyle, MT_CONFLICT_STYLES(B).fightStyle, MT_CONFLICT_STYLES.needsFromOther",
        "cross": "사주만으로는 어디서 부딪히는지는 알지만 어떻게 싸우는지는 모른다. MBTI만으로는 갈등 양식은 알지만 인생의 어떤 영역에서 주로 터지는지는 모른다. 교차하면 갈등의 영역과 양식을 동시에 특정하여, 이 친구와는 직업 얘기할 때 조심하되 터지면 한쪽은 시간을 주고 다른 쪽은 기다리라는 식의 구체적인 조율 가이드가 나온다.",
        "impact": 8
      }
    ],
    "바라는 것": [
      {
        "id": "FRIEND-NEED-020",
        "tier": "A",
        "name": "식상 과다 × 비겁 결핍 → 경청형 친구 갈망",
        "tags": [
          "condition:excess",
          "condition:lack",
          "ss:비겁",
          "ss:식상",
          "uses:dominant",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt['식상']>=2.0 + cnt['비겁']<=0.3",
        "mbti": ": MT_FRIENDSHIP.needing(경청 관련), MT_TYPES.stack[0] 주기능 방향",
        "cross": "사주만 보면 '표현하고 싶은 에너지는 넘치는데 들어줄 사람이 없다'는 결핍 구조가 보이지만, 어떤 방식의 경청을 원하는지는 알 수 없다. MBTI만 보면 경청에 대한 바람이 있다는 것은 알아도, 그 바람이 얼마나 절실한지는 알 수 없다. 사주와 MBTI를 함께 살펴보면 '경청에 대한 갈망의 절실함'과 '원하는 경청의 구체적인 형태'가 결합되어, 이 사람에게 어떤 방식으로 들어줘야 하는지가 비로소 보인다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-001",
        "tier": "A",
        "name": "용신 결핍 갈망 — 친구에게 바라는 근본 에너지",
        "tags": [
          "condition:lack",
          "uses:yongshin",
          "uses:gaeun",
          "cf:Ne"
        ],
        "saju": "analyzeGyeokguk.yongshin, SJ_calcOsinChegye, SJ_extractYongshinOh, SJ_GAEUN, SAJU_GAEUN, OHENG_KW(lack/zero)",
        "mbti": ": MT_TYPES[code].coreNeed (유형별 핵심 욕구)",
        "cross": "사주에서 도출되는 '가장 필요한 에너지'는 구조적 결핍을 보여주고, MBTI에서 나오는 핵심 욕구는 심리적 갈망을 보여준다. 이 두 방향이 같은 곳을 향하는지, 서로 다른 곳을 향하는지에 따라 이 사람의 갈망이 달라진다. 같은 방향이면 매우 일관된 갈망이고, 다른 방향이면 이 사람 안에 두 가지 서로 다른 갈망이 공존하여 친구 관계에서도 다층적인 욕구가 나타난다.",
        "impact": 9
      },
      {
        "id": "FRIEND-NEED-014",
        "tier": "A",
        "name": "인성 결핍 × 열등기능 방향 수렴 — 멘토 갈망의 구체화",
        "tags": [
          "condition:lack",
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "uses:sipsung_rel",
          "uses:inferior",
          "ref:MT_DECISION",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt['인성'], SIPSUNG_REL_KW(인성<=0.3), SS_CONTEXT['정인'/'편인']",
        "mbti": ": MT_TYPES.stack[3] (열등기능), MT_DECISION_PROCESS.blind, MT_FRIENDSHIP.needing",
        "cross": "사주만 보면 '멘토가 필요하다'는 사실만, MBTI만 보면 '어떤 성향이 약하다'는 사실만 알 수 있다. 사주와 MBTI를 함께 살펴보면 '어떤 영역의 멘토를 얼마나 절실하게 바라는가'가 구체화된다. 배움과 보호가 구조적으로 매우 부족하면서 실행력이 가장 약한 성향인 사람은 '실행력을 길러줄 멘토'에 대한 갈망이 구조적으로 깊이 새겨져 있다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-013",
        "tier": "A",
        "name": "부족 오행 × 열등기능 수렴 — 가장 절실한 취약점에서의 친구 갈망",
        "tags": [
          "condition:lack",
          "unsung:절",
          "uses:inferior"
        ],
        "saju": "sajuA.lackFull, OHENG_KW(zero), findBrokenChain, OHENG_FLOW_DESC",
        "mbti": ": MT_TYPES.stack[3] (열등기능), MT_STACK_POSITIONS.inferior, MT_FUNCTIONS(열등기능 해당)",
        "cross": "사주만 보면 '없는 에너지의 결핍'만, MBTI만 보면 '가장 약한 성향의 심리적 결핍'만 보인다. 두 체계가 같은 방향을 가리키면 이 사람의 가장 절실한 취약점이 겹쳐서 더욱 뚜렷해지고, 친구에게 바라는 것의 핵심이 더욱 명확해진다.",
        "impact": 8
      },
      {
        "id": "FRIEND-NEED-021",
        "tier": "A",
        "name": "관성 과다 + 인성 결핍 → 이중 결핍 극심 갈망",
        "tags": [
          "condition:excess",
          "condition:lack",
          "ss:인성",
          "ss:관성",
          "cf:Fe",
          "ref:MT_CONFLICT"
        ],
        "saju": "analyzeGyeokguk.cnt['관성']>=2.0 + cnt['인성']<=0.5",
        "mbti": ": MT_CONFLICT_STYLES.needsFromOther, MT_TYPES.coreFear, MT_STRESS_STAGES",
        "cross": "사주만 보면 '보호와 해방, 두 가지가 동시에 부족한 구조'가 보이지만, 그 보호와 해방이 구체적으로 어떤 형태여야 하는지는 알 수 없다. MBTI만 보면 위기 상황에서 무엇이 필요한지는 알아도, 그 필요가 일시적 선호인지 구조적으로 절실한 것인지는 알 수 없다. 사주와 MBTI를 함께 살펴보면 '두 가지가 동시에 부족한 상태의 절실함'과 '원하는 보호·해방의 구체적인 형태'가 결합된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-019",
        "tier": "A",
        "name": "인성 과다 × 주기능 방향 교차 — 실행력 자극 갈망의 구체화",
        "tags": [
          "condition:excess",
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "uses:sipsung_rel",
          "uses:dominant",
          "ref:MT_DECISION",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt['인성'], SIPSUNG_REL_KW(인성>=2.0, 인성>=3.0), SS_CONTEXT['편인'/'정인']",
        "mbti": ": MT_TYPES.stack[0] (주기능), MT_DECISION_PROCESS.flow, MT_FRIENDSHIP.needing",
        "cross": "사주만 보면 '생각 에너지가 과다해서 생각만 많다'는 일반적인 이야기만, MBTI만 보면 '가장 두드러진 성향의 특성'만 알 수 있다. 사주와 MBTI를 함께 살펴보면 '어떤 종류의 생각 과잉인가'와 '어떤 방식의 실행력 자극이 필요한가'가 구체적으로 특정된다. 큰 그림과 미래 가능성을 즐겨 보는 성향과 생각 에너지 과다가 겹치면 '비전은 넘치는데 시작을 못 하는' 상태라 착수를 도와주는 자극이 필요하고, 다양한 아이디어를 발산하는 성향과 생각 에너지 과다가 겹치면 '아이디어는 많은데 마무리를 못 하는' 상태라 완결을 도와주는 자극이 필요하며, 내면의 가치와 감정을 소중히 여기는 성향과 생각 에너지 과다가 겹치면 '마음속에만 담아두는' 상태라 밖으로 꺼내도록 돕는 자극이 필요하다. 같은 생각 과잉이라도 처방이 전혀 달라진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-003",
        "tier": "A",
        "name": "인성 결핍 → 멘토형 친구 갈망",
        "tags": [
          "condition:lack",
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "uses:sipsung_rel",
          "uses:inferior",
          "ref:MT_DECISION"
        ],
        "saju": "analyzeGyeokguk.cnt['인성'], SIPSUNG_REL_KW(인성<=0.3 조건), SS_CONTEXT['정인'/'편인'], SIPSUNG_GUNGWI_KW['정인'/'편인']",
        "mbti": ": MT_TYPES[code].stack[3] (열등기능 방향) + MT_DECISION_PROCESS[code].blind (의사결정 사각지대)",
        "cross": "배움과 보호가 구조적으로 부재하다는 것이 사주에서 드러나고, 가장 덜 발달한 성향의 방향이 심리적으로 가장 취약한 처리 방식을 보여준다. 이 두 가지를 함께 살펴보면 이 사람이 멘토에게 바라는 구체적인 방향, 즉 따뜻하게 감싸주는 것인지 논리적으로 이끌어주는 것인지 경험을 나눠주는 것인지 새로운 가능성을 열어주는 것인지가 특정된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-005",
        "tier": "A",
        "name": "비겁 결핍 → 존재적 동반자 갈망",
        "tags": [
          "condition:lack",
          "ss:비겁",
          "ss:비견",
          "uses:yukchin",
          "cf:Ne",
          "axis:EI"
        ],
        "saju": "analyzeGyeokguk.cnt['비겁'], SIPSUNG_REL_KW(비겁<=0.3 조건), SJ_YUKCHIN_MAP(비견='형제/친구')",
        "mbti": ": MT_TYPES[code].coreNeed + MT_AXES.EI (E/I 축 선호 강도)",
        "cross": "동료 에너지가 구조적으로 부족하다는 것이 사주에서 드러나고, MBTI의 핵심 욕구와 내향·외향 성향이 이 사람이 사회적 연결을 어떻게 경험하는가를 보여준다. 이 두 가지를 함께 살펴보면, 함께할 동료 에너지가 부족한 사람이 내향적이면 '혼자 있으면서도 외로운' 깊은 고독이, 외향적이면 '사람을 만나면서도 진짜 동지를 못 찾는' 표면적 외로움이 드러나, 갈망의 질이 달라진다.",
        "impact": 8
      },
      {
        "id": "FRIEND-NEED-002",
        "tier": "A",
        "name": "부족 오행 갈망 — 아예 없는 에너지에 대한 무의식적 끌림",
        "tags": [
          "condition:lack",
          "uses:inferior"
        ],
        "saju": "sajuA.lackFull, OHENG_KW(zero), findBrokenChain, OHENG_FLOW_DESC",
        "mbti": ": MT_TYPES[code].stack[3] (열등기능) + MT_SHADOW_BY_TYPE[code] (유형별 그림자 패턴)",
        "cross": "사주에서 아예 없는 에너지는 '구조적으로 완전히 부재한 에너지'이고, 가장 덜 발달한 성향은 '심리적으로 가장 취약한 영역'이다. 둘이 비슷한 영역을 가리키면 이 사람의 가장 취약한 지점이 겹쳐서 확인되어, 친구에게 바라는 것의 가장 절실한 층위가 드러난다. 둘이 다른 영역을 가리키면 이 사람에게 두 가지 서로 다른 취약점이 있어, 친구에게 바라는 것도 다층적이 된다.",
        "impact": 8
      },
      {
        "id": "FRIEND-NEED-017",
        "tier": "A",
        "name": "일지 12운성 × 기질 핵심 욕구 교차 — 내면 에너지 상태와 기질 갈망의 결합",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:태",
          "cf:Ne",
          "ref:MT_INTERACTION_STYLES",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "saju.uns[2] (일지 12운성), SJ_UNSUNG_MEANING, UNSUNG_KW",
        "mbti": ": MT_TEMPERAMENTS.coreNeed, MT_TYPES.coreNeed, MT_INTERACTION_STYLES",
        "cross": "사주만 보면 '현재 에너지의 단계(상승·하강·잠재 등)'만, MBTI만 보면 '기질이 원하는 것의 유형'만 보인다. 현재 에너지 상태가 갈망에 색조를 입힌다. 같은 감성·공감을 소중히 여기는 성향이라도 에너지가 충만한 단계이면 '대등한 깊이의 관계'를, 에너지가 바닥인 단계이면 '함께 올라올 수 있는 깊이의 관계'를, 에너지가 절정인 단계이면 '정상에서 나눌 수 있는 깊이의 관계'를 바라므로 갈망의 질감이 완전히 달라진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-007",
        "tier": "B",
        "name": "일지 12운성 에너지 상태 → 우정에서 바라는 보완",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:태",
          "cf:Ne",
          "uses:inferior"
        ],
        "saju": "saju.uns[2] (일지 12운성), SJ_UNSUNG_MEANING(spouse 키 참조하되 내면 에너지 해석), UNSUNG_KW",
        "mbti": ": MT_TYPES[code].coreNeed + MT_TYPES[code].stack[3] (열등기능의 갈망 방향)",
        "cross": "현재 에너지 흐름의 위치가 '지금 이 사람에게 구조적으로 필요한 것'을 보여주고, MBTI의 핵심 욕구와 가장 덜 발달한 성향이 '타고난 심리적 갈망과 취약점'을 보여준다. 이 두 가지를 함께 살펴보면 '현재 에너지 상태에서 오는 구조적 필요'와 '타고난 심리적 갈망'이 합쳐져, 이 사람이 친구에게 바라는 것의 구체적인 형태가 특정된다. 예를 들어 에너지가 바닥에서 막 올라오는 단계이면서 실행력이 가장 약한 성향이면, '함께 행동으로 옮겨줄 전우'를 절실히 바란다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-011",
        "tier": "B",
        "name": "갈등 시 갈망 원형 — 위기에서 친구에게 바라는 것",
        "tags": [
          "uses:dominant",
          "stress:grip",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_CONFLICT_STYLES.needsFromOther, MT_ANGER.byFunction(주기능), MT_STRESS_STAGES.stage4_grip",
        "cross": "외부 압박 에너지가 과다한 상태와 연결해서 볼 수 있다. 외부에서 오는 압박이 과잉으로 작용하고, 갈등 상황에서의 갈망이 그 압박에서 벗어나는 방법과 연결되므로, 함께 보면 '어떤 방식의 해방을 바라는가'가 구체화된다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-008",
        "tier": "B",
        "name": "관성 과다 → 해방형 친구 갈망",
        "tags": [
          "condition:excess",
          "ss:편관",
          "ss:정관",
          "ss:관성",
          "unsung:태",
          "tongbyeon:관살혼잡",
          "uses:tongbyeon",
          "uses:sipsung_rel",
          "cf:Ne",
          "uses:dominant"
        ],
        "saju": "analyzeGyeokguk.cnt['관성'], SIPSUNG_REL_KW(관성>=2.0 조건들), SS_CONTEXT['편관'/'정관'], SJ_detectTongbyeon(관성태과/관살혼잡)",
        "mbti": ": MT_TYPES[code].coreNeed + MT_TYPES[code].stack[0] (주기능이 향하는 방향)",
        "cross": "외부 압박 에너지가 과잉된 상태가 사주에서 드러나고, MBTI의 핵심 욕구와 가장 두드러진 성향이 이 사람이 근본적으로 갈망하는 방향을 보여준다. 이 두 가지를 함께 살펴보면 '압박에서 벗어나고 싶은 구조적 욕구'와 '근본적인 심리적 갈망'이 합쳐져, 친구에게 바라는 것이 단순한 편안함인지, 자극적인 해방감인지, 지적인 도피처인지가 구체적으로 특정된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-009",
        "tier": "B",
        "name": "유형별 우정 갈망 원형 — 친구에게 필요한 것의 MBTI 기본 틀",
        "tags": [
          "cf:Fe",
          "cf:Ne",
          "ref:MT_FRIENDSHIP",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_FRIENDSHIP.needing, MT_TYPES.coreNeed, MT_TYPES.coreFear, MT_TEMPERAMENTS.coreNeed",
        "cross": "MBTI를 기준으로 파악한 내용이다. 사주의 가장 필요한 에너지, 부족한 에너지 유형, 에너지 성격의 비중과 함께 살펴볼 때 갈망의 강도와 절실함이 결정된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-010",
        "tier": "B",
        "name": "열등기능 결핍 갈망 — 가장 미발달한 영역에 대한 무의식적 끌림",
        "tags": [
          "condition:lack",
          "uses:inferior",
          "stress:grip",
          "ref:MT_RELATION"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_TYPES.stack[3] (열등기능), MT_STACK_POSITIONS.inferior, MT_RELATION_TYPES.dual, MT_STRESS_STAGES.stage4_grip",
        "cross": "사주에서 아예 없는 에너지 유형과 연결해서 볼 수 있다. 가장 덜 발달한 성향이 가리키는 결핍과 부족한 에너지 유형이 가리키는 결핍이 같은 방향이면 취약점이 한 곳으로 모인다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-004",
        "tier": "B",
        "name": "인성 과다 → 실행력 자극형 친구 갈망",
        "tags": [
          "condition:excess",
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "uses:sipsung_rel",
          "uses:dominant"
        ],
        "saju": "analyzeGyeokguk.cnt['인성'], SIPSUNG_REL_KW(인성>=2.0 조건들), SS_CONTEXT['편인'/'정인']",
        "mbti": ": MT_TYPES[code].stack[0] (주기능 방향) + MT_STACK_POSITIONS.dominant",
        "cross": "학습하고 의지하는 것에 익숙한 에너지가 넘치는 사람은 이미 '배우고 기대는 것'에 능숙하다. 가장 자주 쓰고 익숙한 성향도 이미 잘하는 방향을 가리킨다. 이 두 가지를 겹쳐보면 이 사람이 잘하는 것과 부족한 것이 선명하게 대비되는데, 친구에게 바라는 것은 결국 '내가 못하는 것을 대신해주거나 자극해줄 사람'으로 좁혀진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-006",
        "tier": "C",
        "name": "공망 궁위 결핍 → 특정 영역의 채움 갈망",
        "tags": [
          "condition:lack",
          "uses:gongmang",
          "cf:Fe"
        ],
        "saju": "calcGongmang, SJ_buildGongmangFull, GONGMANG_GUNGWI_KW, GONGMANG_FILL_KW, SJ_GONGMANG_GUNGWI",
        "mbti": ": MT_TYPES[code].coreFear (유형별 핵심 두려움)",
        "cross": "아직 채워지지 않은 에너지 영역이 있고, 마음 깊이 두려워하는 것이 있다. 이 둘이 같은 방향을 가리키면 그 갈망은 매우 절실하다. 반대 방향을 가리키면 이 사람 안에 의식적으로 원하는 것과 무의식적으로 두려워하는 것이 따로 존재하는 셈이라, 친구에게 바라는 것도 단순하지 않고 여러 결로 나뉜다.",
        "impact": 6
      },
      {
        "id": "FRIEND-NEED-016",
        "tier": "S",
        "name": "공망 궁위 × coreFear 수렴 — 가장 깊은 우정 갈망",
        "tags": [
          "uses:gongmang",
          "cf:Fe",
          "ref:MT_CONFLICT",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "calcGongmang, SJ_buildGongmangFull, GONGMANG_GUNGWI_KW, GONGMANG_FILL_KW",
        "mbti": ": MT_TYPES.coreFear, MT_CONFLICT_STYLES.trigger, MT_FRIENDSHIP.needing",
        "cross": "에너지 구조로는 아직 채워지지 않은 영역을, 성향 분석으로는 마음 깊이 두려워하는 것을 각각 보여준다. 두 가지가 같은 곳을 가리킬 때 이 사람의 가장 깊은 갈망이 더 선명하게 드러나고, 우정에서 이 갈망이 충족되지 않으면 관계가 오래 가지 못하는 이유도 함께 보인다.",
        "impact": 8
      },
      {
        "id": "FRIEND-NEED-018",
        "tier": "S",
        "name": "관성 과다 × 갈등 시 필요 교차 — 해방 갈망의 구체적 형태",
        "tags": [
          "condition:excess",
          "ss:편관",
          "ss:정관",
          "ss:관성",
          "unsung:태",
          "uses:tongbyeon",
          "uses:sipsung_rel",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER",
          "ref:MT_SELFCARE"
        ],
        "saju": "analyzeGyeokguk.cnt['관성'], SIPSUNG_REL_KW(관성>=2.0), SS_CONTEXT['편관'/'정관'], SJ_detectTongbyeon",
        "mbti": ": MT_CONFLICT_STYLES.needsFromOther, MT_ANGER.byFunction(주기능), MT_SELFCARE.recharge",
        "cross": "에너지 분석으로는 사회적 압박과 책임의 에너지가 얼마나 강한지를, 성향 분석으로는 갈등 상황에서 무엇이 필요한지를 각각 알 수 있다. 이 둘을 합치면 이 사람이 친구에게 바라는 '해방'의 구체적인 모습이 드러난다. 감정적으로 받아주길 원하는지, 지적인 자극을 원하는지, 함께 즐기며 기분 전환을 원하는지, 아니면 안정적인 일상을 함께하길 원하는지가 특정된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-NEED-012",
        "tier": "S",
        "name": "용신 갈망 × 유형 갈망 교차 — 근본 에너지 갈망의 이중 확인",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "cf:Ne",
          "ref:MT_FRIENDSHIP",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "analyzeGyeokguk.yongshin, SJ_calcOsinChegye, SJ_extractYongshinOh, SAJU_GAEUN, OHENG_KW",
        "mbti": ": MT_TYPES.coreNeed, MT_TEMPERAMENTS.coreNeed, MT_FRIENDSHIP.needing",
        "cross": "에너지 분석으로는 어떤 에너지가 필요한지를, 성향 분석으로는 어떤 심리적 방식으로 그것을 원하는지를 알 수 있다. 두 가지를 합치면 '어떤 에너지를 어떤 형태로 바라는가'가 구체화된다. 예를 들어 열정과 활력의 에너지가 필요한 사람이라도, 깊은 감수성을 가진 유형이라면 '열정적이면서도 진정성 있는 깊이를 가진 친구'를 원하고, 즉각적인 행동파 유형이라면 '열정적이면서 바로 함께 움직일 친구'를 원한다. 같은 에너지가 필요해도 성향에 따라 바라는 친구상이 완전히 달라진다는 점이 포인트다.",
        "impact": 8
      },
      {
        "id": "FRIEND-NEED-015",
        "tier": "S",
        "name": "비겁 결핍 × E/I 축 강도 — 동반자 갈망의 표현 강도",
        "tags": [
          "condition:lack",
          "ss:비겁",
          "ss:비견",
          "uses:yukchin",
          "cf:Ne",
          "axis:EI",
          "uses:intensity",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt['비겁'], SIPSUNG_REL_KW(비겁<=0.3), SJ_YUKCHIN_MAP(비견='형제/친구')",
        "mbti": ": MT_INTENSITY_PROFILES(E/I), MT_FRIENDSHIP.style, MT_TYPES.coreNeed",
        "cross": "에너지 분석으로는 자기 자신을 지탱하는 에너지가 충분한지를, 성향 분석으로는 내향인지 외향인지를 각각 알 수 있다. 두 가지를 함께 보면 동반자를 얼마나 간절히 원하는지, 그리고 그 갈망을 채우기 위해 어떻게 행동하는지가 동시에 드러난다. 자기를 지탱하는 에너지가 부족하면서 내향적인 사람은 '절실히 원하지만 찾지 못하는' 구조적 아쉬움을 안고 있고, 자기를 지탱하는 에너지가 부족하면서 외향적인 사람은 '적극적으로 찾아다니지만 깊이 있는 관계가 잘 만들어지지 않는' 허전함을 보인다.",
        "impact": 7
      }
    ],
    "상대 눈에 비친 나": [
      {
        "id": "FRIEND-VIEW-016",
        "tier": "A",
        "name": "A의 사회적 인격 복합상 — 월간 오행과 주기능-부기능의 수렴/발산",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:mulsang",
          "uses:dominant",
          "uses:auxiliary",
          "axis:EI",
          "axis:TF"
        ],
        "saju": "OHAENG_TGAN[A.raw.mg] → MULSANG_GAN[A의 월간] 물상 에너지 (목=성장/화=열정/토=안정/금=결단/수=유연)",
        "mbti": ": MT_TYPES(A).stack[0] (주기능) + stack[1] (부기능) → 인지기능 방향 (외향적 사고/내향적 감정 등)",
        "cross": "사회적 자리에 담긴 타고난 에너지의 성질은 사회적 에너지의 재질이고, 가장 자주 쓰는 성향과 그다음 성향은 그 에너지를 실제로 다루는 도구다. 같은 재질이라도 도구가 다르면 결과물이 달라지고, 같은 도구라도 재질이 다르면 질감이 달라진다. 이 재질과 도구의 조합은 에너지 구조와 성향을 함께 볼 때 비로소 온전히 보인다.",
        "impact": 6
      },
      {
        "id": "FRIEND-VIEW-014",
        "tier": "A",
        "name": "A의 첫인상 에너지 수렴/발산 — 오행 질감과 행동 패턴의 일치도",
        "tags": [
          "pillar:년주",
          "uses:mulsang",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "OHAENG_TGAN[A.raw.yg] → MULSANG_GAN[A의 년간] (첫인상 오행 에너지)",
        "mbti": ": MT_INTERACTION_STYLES(A) → behind-the-scenes / chart-the-course / get-things-going / in-charge",
        "cross": "타고난 에너지의 색감과 온도와 질감은 사주가 보여주는 것이고, 사람을 대하는 리듬과 속도와 방향은 MBTI가 보여주는 것이다. 색감과 리듬이 잘 맞으면 조화로운 인상을 주지만, 차가운 색감에 빠른 리듬이 결합하면 상대에게 '의외성'이라는 독특한 매력으로 전달된다. 이 의외성은 어느 한 체계만으로는 설명할 수 없다.",
        "impact": 6
      },
      {
        "id": "FRIEND-VIEW-020",
        "tier": "A",
        "name": "B가 목격하는 A의 갈등 모습 — 분노 질감과 갈등 행동의 교차",
        "tags": [
          "unsung:절",
          "unsung:양",
          "ref:MT_CONFLICT"
        ],
        "saju": "A의 일간 오행 → ILGAN_KW[A.dm] + ST5_TGAN_DEEP[A.dm] 분노/방어 양식 (목=고집으로버팀/화=폭발후진화/토=침묵으로압박/금=칼같은단절/수=회피후냉각)",
        "mbti": ": MT_CONFLICT_STYLES(A) → conflictStyle (회피/대면/폭발/냉각/논리적반박 등)",
        "cross": "B의 눈에 A의 갈등 모습이 어떻게 보이는가가 이 분석의 초점이다. 시선이 자기 자신에서 상대방으로 바뀐다는 점에서 고유한 의미를 가진다. 분노의 에너지 질감(뜨겁고 격렬한지 차갑고 날카로운지)과 갈등 상황에서의 행동 방식(논리적으로 반박하는지 감정을 표출하는지)이 결합하면, B는 A의 갈등 모습을 훨씬 입체적으로 이해하게 된다.",
        "impact": 6
      },
      {
        "id": "FRIEND-VIEW-019",
        "tier": "A",
        "name": "A의 에너지 성숙도 교차 — 같은 힘이라도 성숙도에 따라 B에게 다르게 보인다",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "uses:dominant",
          "ref:MT_MATURITY"
        ],
        "saju": "analyzeGyeokguk(A).strengthGrade (극신강/신강/중화/신약/극신약)",
        "mbti": ": MT_MATURITY(A) → A의 주기능 성숙도 (immature / developing / mature)",
        "cross": "타고난 에너지의 크기는 변하지 않지만, 그 에너지를 얼마나 성숙하게 다루는지는 후천적으로 달라진다. 이 둘을 함께 보면 '같은 원석을 어떻게 갈았는가'를 알 수 있다. B가 체감하는 A의 인상은 원석 자체가 아니라 갈린 상태이기 때문에, 이 조합 없이는 '같은 사주인데 왜 B에게 다르게 보이는가'를 설명할 수 없다.",
        "impact": 7
      },
      {
        "id": "FRIEND-VIEW-001",
        "tier": "B",
        "name": "B→A 십성 인식 원형 — 친구 눈에 비친 나의 역할",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(B.raw.dg, A.raw.dg) → SS_CONTEXT[해당십성].general",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. B가 A를 어떤 역할로 인식하는지를 보여주는 것은 사주에만 있는 관점이다. 성격 유형론에는 '상대를 어떤 역할로 인식하는가'라는 시각 자체가 없다.",
        "impact": 9
      },
      {
        "id": "FRIEND-VIEW-006",
        "tier": "B",
        "name": "A의 에너지 존재감 — B가 체감하는 A의 밀도",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk(A).strengthGrade (극신강/신강/중화/신약/극신약)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 타고난 에너지가 충분한지 부족한지는 내 안에 쌓인 에너지와 밖으로 쓰이는 에너지의 비율에서 드러나며, 이 비율이 대인 관계에서 에너지를 체감하는 방식으로 이어진다. 성격 유형론에서는 이런 방식으로 에너지의 충만함과 부족함을 파악하기 어렵다.",
        "impact": 6
      },
      {
        "id": "FRIEND-VIEW-004",
        "tier": "B",
        "name": "B의 5신 체계에서 A의 위치 — 무의식적 호불호의 구조",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(B의 용신오행) → SJ_getOsinLabel(osin, A의 일간오행)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 내 에너지 균형을 위해 지금 가장 필요한 것을 기준으로 상대방의 에너지가 나에게 이로운지 방해가 되는지를 살피는 것은 사주 고유의 관계 평가 방식이다. 성격 유형론에는 '특정 상대의 에너지가 내 균형에 이로운가'를 따지는 시각이 없다.",
        "impact": 8
      },
      {
        "id": "FRIEND-VIEW-010",
        "tier": "B",
        "name": "A의 일지 12운성 — B가 감지하는 A의 내면 에너지 상태",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:사",
          "unsung:태"
        ],
        "saju": "A.uns[2] (일지 12운성) → UNSUNG_KW[해당운성]",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 지금 내 에너지가 힘을 키워가는 시기인지 서서히 가라앉는 시기인지를 세밀하게 보여준다. 성격 유형론에는 이런 에너지 흐름의 시기를 읽는 관점이 없다.",
        "impact": 5
      },
      {
        "id": "FRIEND-VIEW-009",
        "tier": "B",
        "name": "A의 월간 십성(B 기준) — 관계 지속 시 B가 읽는 A의 사회적 모습",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(B.raw.dg, A.raw.mg) → SS_CONTEXT[해당십성]",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 마음속 깊이 상대를 바라보는 시선과 사회적으로 상대를 대하는 시선이 다를 때 생기는 '겉과 속의 인식 차이'는 사주의 다층 구조에서만 볼 수 있다. 성격 유형론에는 내면의 인식과 사회적 인식을 분리해 비교하는 방법이 없다.",
        "impact": 6
      },
      {
        "id": "FRIEND-VIEW-002",
        "tier": "B",
        "name": "A의 사회적 페르소나 오행 — 친구가 지속적으로 체감하는 이미지",
        "tags": [
          "pillar:월간",
          "unsung:사",
          "uses:mulsang"
        ],
        "saju": "OHAENG_TGAN[A.raw.mg] → MULSANG_GAN[A의 월간]",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 사회적 관계에서 의식적으로 꺼내 쓰는 나의 겉모습 에너지가 무엇인지는 사주 고유의 관점으로, 다른 체계에서는 이를 같은 방식으로 짚어내기 어렵다.",
        "impact": 7
      },
      {
        "id": "FRIEND-VIEW-008",
        "tier": "B",
        "name": "B의 십성 분포 가중 인식 — B의 내부 구조가 A 인식을 왜곡하는 패턴",
        "tags": [
          "condition:excess",
          "condition:lack",
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "analyzeGyeokguk(B).cnt[십성그룹] 과다/부족 + getSipsung(B.dg, A.dg)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 내 에너지 구조가 상대를 인식하는 방식에 가중치를 부여한다는 것은, 인식하는 사람의 내부 상태가 상대방을 바라보는 시각을 물들인다는 원리를 사주로 보여주는 것이다. 성격 유형론에서는 이런 방식으로 그 영향의 정도를 파악하기 어렵다.",
        "impact": 8
      },
      {
        "id": "FRIEND-VIEW-005",
        "tier": "B",
        "name": "B의 부족 오행 × A의 강한 오행 — 무의식적 끌림의 보완 구조",
        "tags": [
          "condition:lack",
          "unsung:사"
        ],
        "saju": "B.lackFull 또는 B.elFull 중 0.3 미만 오행 vs A.elFull 중 2.0 이상 오행",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 내가 타고나길 부족하게 가진 에너지를 상대가 채워주는지를 구체적으로 살피는 것은 사주 고유의 방식이며, 성격 유형론에서는 이런 방식의 판별이 어렵다.",
        "impact": 7
      },
      {
        "id": "FRIEND-VIEW-013",
        "tier": "B",
        "name": "MBTI 상호작용 스타일 인상",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음",
        "mbti": ": MT_INTERACTION_STYLES(A) → behind-the-scenes/chart-the-course/get-things-going/in-charge",
        "cross": "MBTI만으로 완결되는 분석이다. 사람을 대하는 행동 방식은 대인 행동 패턴을 유형별로 분류한 것으로, 사주 오행의 질감과는 작동 방식이 다르다.",
        "impact": 5
      },
      {
        "id": "FRIEND-VIEW-022",
        "tier": "B",
        "name": "A의 통변 공식이 B에게 전달하는 구조적 인상",
        "tags": [
          "condition:excess",
          "ss:비겁",
          "ss:인성",
          "ss:식상",
          "unsung:사",
          "unsung:태",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "tongbyeon:관살혼잡"
        ],
        "saju": "SJ_detectTongbyeon(A의 gg, A의 ssIndiv) → 식상생재/살인상생/비겁탈재/관살혼잡/인성태과 등 16종 통변 공식",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 사주 내부에서 여러 에너지들이 서로 돕고 억제하고 결합하는 역동적인 상호작용은 MBTI에는 대응하는 개념이 없다. MBTI는 각 성향의 특징을 보여줄 뿐, 에너지들 사이의 역동적인 상호작용을 다루지는 않는다.",
        "impact": 7
      },
      {
        "id": "FRIEND-VIEW-018",
        "tier": "B",
        "name": "MBTI 주기능 성숙도 인상",
        "tags": [
          "uses:dominant",
          "ref:MT_MATURITY"
        ],
        "saju": "없음",
        "mbti": ": MT_MATURITY(A의 주기능 id) → immature/developing/mature 3단계",
        "cross": "MBTI만으로 완결되는 분석이다. 성숙도는 살아가면서 후천적으로 발달하는 개념으로, 사주의 선천적 에너지 구조와는 작동 방식이 다르다.",
        "impact": 5
      },
      {
        "id": "FRIEND-VIEW-003",
        "tier": "B",
        "name": "A의 첫인상 오행 — 처음 만났을 때 B가 받는 느낌",
        "tags": [
          "pillar:년주",
          "unsung:사",
          "uses:mulsang"
        ],
        "saju": "OHAENG_TGAN[A.raw.yg] → MULSANG_GAN[A의 년간]",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 어린 시절의 흔적과 외부 세계를 향한 태도를 동시에 담는 사주의 특정 자리는 다른 체계에서는 찾기 어렵다.",
        "impact": 5
      },
      {
        "id": "FRIEND-VIEW-007",
        "tier": "B",
        "name": "A의 특수 매력 채널 — 신살이 만드는 특별한 인상",
        "tags": [
          "unsung:사",
          "unsung:양",
          "sinsal:도화",
          "sinsal:역마",
          "sinsal:화개",
          "sinsal:천을귀인",
          "sinsal:양인"
        ],
        "saju": "getSpecialSinsal(A) → 도화살/역마살/화개살/천을귀인/양인살 등",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주만으로 완결되는 분석이다. 사주의 배치에서 드러나는 특별한 에너지 포인트는 성격 유형론에는 대응하는 개념이 없다. 사람을 끌어당기는 매력의 에너지와 내면의 깊이를 만드는 예술적 에너지는 사주가 포착하는 고유한 매력의 결이며, 두 에너지는 서로 전혀 다른 방식으로 작동한다.",
        "impact": 5
      },
      {
        "id": "FRIEND-VIEW-011",
        "tier": "B",
        "name": "B→A 관계 유형 인식 원형 — MBTI가 읽는 '이 친구는 나에게 어떤 존재인가'",
        "tags": [
          "ref:MT_RELATION"
        ],
        "saju": "없음",
        "mbti": ": MT_RELATION_TYPES, MT_RELATION_MATRIX (mtGetRelation(B.type, A.type))",
        "cross": "MBTI만으로 완결되는 분석이다. 에너지 구조가 상대를 역할로 인식하는 방식을 보여준다면, 성향 분석은 두 사람의 성향이 얼마나 비슷하고 다른지를 기준으로 서로를 이해하는 방식을 보여준다. 같은 질문에 두 가지 분석이 같은 결론에 도달하는지 엇갈리는지는 두 결과를 함께 놓고 볼 때 확인할 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-VIEW-015",
        "tier": "S",
        "name": "A의 존재감 미스터리 — 에너지 밀도와 에너지 방향의 불일치가 B에게 전달하는 인상",
        "tags": [
          "strength:극신강",
          "strength:극신약",
          "strength:중화",
          "uses:strength",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "analyzeGyeokguk(A).strengthScore → strengthGrade (극신강 80%+ / 신강 55-80% / 중화 45-55% / 신약 30-45% / 극신약 30% 미만)",
        "mbti": ": MT_INTENSITY_PROFILES(A) → E/I 축 강도 (E88 = 극외향 / E68 = 외향 / I68 = 내향 / I88 = 극내향)",
        "cross": "에너지의 불균형이 A 자신에게는 내적 긴장으로 느껴지지만, B의 눈에는 매력 또는 불편함으로 전달된다. 같은 불균형이라도 바라보는 시선이 달라지면 전혀 다른 의미가 된다는 점이 포인트다. 이 관점의 전환은 에너지 구조와 성향을 함께 볼 때만 보인다.",
        "impact": 7
      },
      {
        "id": "FRIEND-VIEW-012",
        "tier": "S",
        "name": "B→A 인식 원형 수렴/발산 — 두 체계가 같은 사람을 같게 보는가",
        "tags": [
          "ss:겁재",
          "ss:비견",
          "ss:식신",
          "ss:상관",
          "ss:편재",
          "ss:정재",
          "ss:편관",
          "ss:정관",
          "ss:편인",
          "ss:정인",
          "unsung:사",
          "uses:sipsung_rel",
          "ref:MT_RELATION"
        ],
        "saju": "getSipsung(B.raw.dg, A.raw.dg) → SS_CONTEXT[해당십성].general (비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인)",
        "mbti": ": MT_RELATION_TYPES, MT_RELATION_MATRIX → mtGetRelation(B.type, A.type) (dual/mirror/activity/conflict/pedagogue/companion/supervisor/quasiIdentical)",
        "cross": "에너지 구조에서 B가 A를 어떤 역할로 인식하는지는 두 사람의 에너지 관계에서 나오고, 성향 분석에서는 두 사람의 성향 구조를 비교한 심리적 결과가 나온다. 두 결론이 같은 방향을 가리키면 그 인식은 매우 강력하다. 반대 방향을 가리키면 B 안에 '왜 그런지 설명하기 어려운 양가감정'이 생긴다. 이 양가감정의 존재 자체는 두 가지 분석을 함께 볼 때만 포착할 수 있다.",
        "impact": 9
      },
      {
        "id": "FRIEND-VIEW-017",
        "tier": "S",
        "name": "B의 무의식적 호불호 수렴/발산 — 5신 위치와 관계 유형의 교차",
        "tags": [
          "uses:yongshin",
          "uses:osin",
          "ref:MT_RELATION"
        ],
        "saju": "SJ_calcOsinChegye(B의 용신오행) → SJ_getOsinLabel(osin, A의 일간오행) → 용신/희신/한신/구신/기신",
        "mbti": ": MT_RELATION_TYPES → mtGetRelation(B.type, A.type) → 호환성 방향 (dual/companion=호환 / conflict/supervisor=긴장)",
        "cross": "내 에너지 균형을 위해 지금 가장 필요한 것을 기준으로 A의 에너지가 B에게 이로운지를 보는 것과, 두 사람의 성향 구조를 비교하는 것은 완전히 다른 각도에서 호불호를 바라보는 방식이다. 두 결과가 같은 방향이면 확신이 생기고, 다른 방향이면 양가감정이 생긴다는 것은 두 가지 분석을 함께 볼 때만 보인다.",
        "impact": 8
      }
    ],
    "서운해하는 것": [
      {
        "id": "FRIEND-ANNOY-013",
        "tier": "A",
        "name": "존재적 서운함 — 핵심 두려움과 기신 방향의 수렴",
        "tags": [
          "uses:yongshin",
          "uses:gaeun",
          "cf:Fe"
        ],
        "saju": "SJ_calcOsinChegye → 기신(忌神) 오행 + 해당 오행의 OHENG_KW/SJ_GAEUN",
        "mbti": ": MT_TYPES[type].coreFear",
        "cross": "마음 깊이 두려워하는 것은 '무엇이 두려운지'를, 내 균형을 방해하는 에너지는 '어떤 에너지가 문제인지'를 각각 알려준다. 두 체계가 같은 취약점을 동시에 가리킬 때 서운함은 단순한 감정이 아니라 존재적인 수준으로 깊어진다. 채워지지 않은 영역을 건드리는 것과 균형을 방해하는 에너지를 직접 투입하는 것은 서로 다른 방식으로 상처를 준다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ANNOY-011",
        "tier": "A",
        "name": "갈등 트리거 교차 — 기신 방향과 유형별 갈등 트리거의 수렴/분산",
        "tags": [
          "uses:yongshin",
          "uses:osin",
          "ref:MT_CONFLICT"
        ],
        "saju": "SJ_calcOsinChegye → 기신(忌神) 오행 방향 + SJ_getOsinLabel",
        "mbti": ": MT_CONFLICT_STYLES[type].trigger",
        "cross": "균형을 방해하는 에너지는 '어떤 에너지가 문제인지'를 에너지 차원에서 알려주고, 갈등이 생기는 상황은 '어떤 상황이 갈등인지'를 인지·행동 차원에서 알려준다. 두 체계가 같은 지점을 가리키면 그 영역에서 극도로 예민해진다는 것이 보인다. 서로 다른 지점을 가리키면 본인도 왜 서운한지 한마디로 설명하기 어려운 복합적인 서운함이 생긴다. 친구에게 필요한 것을 살피는 분석과 맞닿아 있어 두 분석의 설명력이 서로 연결된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-014",
        "tier": "A",
        "name": "우정 파탄점 교차 — 우정이 끝나는 임계 상황의 이중 특정",
        "tags": [
          "condition:lack",
          "uses:yongshin",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "SJ_calcOsinChegye → 기신 오행 + analyzeGyeokguk.cnt (십성 결핍 0.3 미만)",
        "mbti": ": MT_FRIENDSHIP[type].breaking",
        "cross": "우정이 끝나는 상황의 유형은 '어떤 상황에서 관계가 끝나는지'를, 균형을 방해하는 에너지와 채워지지 않은 에너지 영역은 '어떤 에너지가 부족하거나 문제인지'를 각각 알려준다. 두 가지를 함께 보면 이 사람이 이 구체적인 상황에서 이 구체적인 에너지 문제 때문에 우정을 끝내게 된다는 흐름이 보인다. 두 가지가 같은 방향을 가리키면 관계의 한계점이 매우 낮아져 관계가 빨리 끝나고, 서로 다른 방향을 가리키면 여러 방향에서 서서히 소모되다 끝나는 양상을 보인다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-016",
        "tier": "A",
        "name": "서운함 저장 방식 교차 — 일지 12운성 에너지와 분노 지속시간의 결합",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "saju.uns[2] (일지 12운성) + UNSUNG_KW + SJ_UNSUNG_MEANING",
        "mbti": ": MT_ANGER.byFunction[주기능].duration",
        "cross": "현재 에너지 상태는 '에너지 흐름에 따라 감정을 묻어두는지 터뜨리는지'를 보여주고, 감정을 처리하는 데 걸리는 시간은 '서운함을 얼마나 오래 간직하는지'를 알려준다. 두 가지를 함께 보면 이 사람이 서운함을 어떤 방식으로 다루는지, 그리고 얼마나 오래 품고 있는지를 동시에 알 수 있다. 서운함이 어떤 감정인지를 본다면, 이것은 그 감정이 얼마나 오래 이어지는지를 본다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ANNOY-005",
        "tier": "B",
        "name": "십성 결핍별 서운함 트리거 유형",
        "tags": [
          "condition:lack"
        ],
        "saju": "analyzeGyeokguk.cnt (5군 십성 비중) + SIPSUNG_REL_KW",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "균형을 방해하는 에너지를 더 자극받는 불쾌함과, 이미 넘치는 에너지가 더 쌓일 때의 과부하는 같은 에너지 축의 양극단에서 생기는 서운함이다. 겉으로는 비슷해 보여도 서운함이 생겨나는 방식이 서로 다르다는 점이 중요하다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ANNOY-010",
        "tier": "B",
        "name": "서운함 트리거 원형 — 이 사람이 친구에게 서운해하는 기본 상황",
        "tags": [
          "unsung:사",
          "ref:MT_CONFLICT",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_CONFLICT_STYLES[type].trigger + MT_FRIENDSHIP[type].needing",
        "cross": "MBTI만으로 완결되는 분석이다. 사주가 에너지의 흐름으로 서운함을 설명한다면, MBTI는 심리적 필요가 좌절되는 방식으로 설명한다. 각 유형별로 구체적인 서운함 시나리오를 보여주는 MBTI 고유의 접근이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-017",
        "tier": "B",
        "name": "우정 파탄 가속 — 비겁 결핍이 낮추는 우정 임계점",
        "tags": [
          "condition:lack",
          "ss:비겁",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "analyzeGyeokguk.cnt['비겁'] (0.3 미만 결핍)",
        "mbti": ": MT_FRIENDSHIP[type].breaking",
        "cross": "내 에너지가 전반적으로 부족한 상태는 '스스로를 지탱할 힘이 모자란 상태'를, 우정이 끝나는 상황의 유형은 '어떤 상황에서 관계가 끝나는지'를 각각 알려준다. 두 가지를 함께 보면 에너지가 부족한 상태에서 관계를 끝내는 계기를 만나면 한계점이 급격히 낮아진다는 흐름이 보인다. 무엇이 관계를 끝내는가를 본다면, 이것은 얼마나 빨리 그 끝에 도달하는가를 함께 보는 것이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-ANNOY-001",
        "tier": "B",
        "name": "기신 오행 자극 — 친구 관계의 근본적 불쾌 트리거",
        "tags": [
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye → 기신(忌神) 오행 + SJ_getOsinLabel",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "원하는 것의 반대가 서운함의 핵심이다. 내가 가장 원하는 에너지와 나를 방해하는 에너지는 같은 축의 양 끝이기 때문에, 무언가를 간절히 바라는 마음과 서운함을 느끼는 지점은 동전의 양면처럼 맞닿아 있다.",
        "impact": 9
      },
      {
        "id": "FRIEND-ANNOY-003",
        "tier": "B",
        "name": "원국 충·형·해 궁위 — 반복적 서운함의 구조적 패턴",
        "tags": [
          "relation:충",
          "relation:해"
        ],
        "saju": "calcRelations → jijiChung, jijiHyung, jijiHae + CHUNG_GUNGWI_KW + JIJI_HAE_KW",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "균형을 방해하는 에너지나 이미 넘치는 에너지와 달리, 에너지들 사이의 결합·충돌·마찰은 '특정 인생 영역'과 연결된 서운함이다. 에너지 자체의 성질보다는 인생의 특정 영역에서 반복되는 갈등이 서운함의 불씨가 된다는 점이 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-002",
        "tier": "B",
        "name": "과다 오행 과부하 — 넘치는 에너지의 추가 자극 불쾌",
        "tags": [
          "condition:excess"
        ],
        "saju": "saju.elFull (오행별 수치) + OHENG_KW.excess",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "균형을 방해하는 에너지는 '없어야 할 에너지가 들어올 때'의 불쾌함이고, 이미 넘치는 에너지가 더 쌓이는 것은 '이미 넘치는 에너지가 더 쌓일 때'의 과부하다. 겉으로는 비슷해 보여도 서운함이 촉발되는 방식이 서로 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-004",
        "tier": "B",
        "name": "십성 과다별 서운함 트리거 유형",
        "tags": [
          "condition:excess"
        ],
        "saju": "analyzeGyeokguk.cnt (5군 십성 비중) + SIPSUNG_REL_KW",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "균형을 방해하는 에너지는 에너지 균형에서, 이미 넘치는 에너지는 에너지 수치에서, 에너지 충돌은 인생 영역에서 서운함을 짚어내는 반면, 이 패턴은 '에너지가 어떤 방향으로 작동하는가'를 기준으로 서운함을 짚어낸다. 더 행동적이고 구체적인 서운함의 불씨를 보여준다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ANNOY-006",
        "tier": "B",
        "name": "공망 궁위 자극 — 비어있는 영역을 건드리는 서운함",
        "tags": [
          "uses:gongmang"
        ],
        "saju": "calcGongmang → affected 궁위 + GONGMANG_GUNGWI_KW",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "균형을 방해하는 에너지나 이미 넘치는 에너지가 '에너지의 과잉이나 결핍'이 서운함의 불씨라면, 처음부터 비어 있는 에너지 영역은 '그 영역 자체가 존재하지 않는 것'이 불씨다. 스스로도 설명하기 어렵고 무의식 깊은 곳에서 올라오는 서운함이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ANNOY-007",
        "tier": "B",
        "name": "통변 공식 기반 서운함 — 구조적 갈등 패턴의 대인 투사",
        "tags": [
          "unsung:사",
          "uses:tongbyeon"
        ],
        "saju": "SJ_detectTongbyeon (16개 통변 공식) + SJ_TERM_MAP",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "개별 에너지의 과잉이나 결핍이 단일 에너지 차원의 서운함이라면, 두 에너지가 만나면서 생기는 갈등은 더 복합적이고 반복적인 서운함으로 이어진다.",
        "impact": 7
      },
      {
        "id": "FRIEND-ANNOY-008",
        "tier": "B",
        "name": "일간 오행별 서운함 감정 반응 양식",
        "tags": [
          "unsung:양"
        ],
        "saju": "JEOKCHEONSU (적천수 십간론) + ST5_TGAN_DEEP + saju.dm",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "001-007이 '무엇에 서운한가(트리거)'를 다뤘다면, 이 패턴은 '서운할 때 어떻게 반응하는가(양식)'를 다룬다. 트리거와 반응의 분리. 같은 트리거에도 일간에 따라 반응이 완전히 다르므로, 트리거 패턴과 반응 패턴의 조합이 개인별 서운함의 전체 그림을 만든다.",
        "impact": 8
      },
      {
        "id": "FRIEND-ANNOY-009",
        "tier": "B",
        "name": "일지 12운성 에너지 상태별 서운함 체감 강도",
        "tags": [
          "pillar:일지",
          "uses:unsung",
          "unsung:태"
        ],
        "saju": "saju.uns[2] (일지 12운성) + UNSUNG_KW + SJ_UNSUNG_MEANING",
        "mbti": ": (MBTI 측 대응 변수 대기)",
        "cross": "일간 오행이 서운함의 감정적 성질을 결정한다면, 에너지 생명주기는 그 서운함의 강도와 지속 시간을 결정한다. 같은 에너지 유형이라도 에너지가 가장 강한 상태에 있으면 서운함이 폭발적으로 터지고, 에너지가 가장 약한 상태에 있으면 서운함이 무력감으로 변한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ANNOY-015",
        "tier": "S",
        "name": "서운함 표현/억제 교차 — 식상 채널 유무와 외향/내향 에너지의 결합",
        "tags": [
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "analyzeGyeokguk.cnt['식상'] + SJ_countIndividualSS → 식신/상관 개별 비율",
        "mbti": ": MT_INTENSITY_PROFILES(E/I 축 강도)",
        "cross": "표현 에너지만으로는 '표현 채널이 있는가 없는가'를, E/I만으로는 '에너지가 안으로 향하는가 밖으로 향하는가'를 알 수 있다. 두 체계를 함께 보면 네 가지 조합이 나오는데, 특히 표현 에너지는 있지만 내향성이 강한 경우(표현력은 있는데 밖으로 내보내지 않음)와 표현 에너지는 없는데 외향성이 강한 경우(채널은 없는데 밖으로 터짐)가 평소 소통 방식과는 다른 서운함 특유의 양상을 만든다. 평소에는 잘 소통하는 사람도 감정적 압박 상황에서는 전혀 다른 방식으로 표현하거나 억누르기 때문이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-ANNOY-012",
        "tier": "S",
        "name": "서운함 질감 교차 — 일간 오행 감정 반응과 주기능 분노 양식의 결합",
        "tags": [
          "unsung:양",
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_ANGER"
        ],
        "saju": "JEOKCHEONSU[일간] + ST5_TGAN_DEEP[일간] + saju.dm",
        "mbti": ": MT_ANGER.byFunction[주기능/부기능] + MT_ANGER.byFunction[fn].duration",
        "cross": "사주만으로는 '이 에너지 유형은 거리를 둔다'까지이고, MBTI만으로는 '이 성향은 오래 기억한다'까지다. 두 체계를 함께 보면 훨씬 입체적인 그림이 나온다. 거리를 두는 에너지 유형에 내면의 감정을 오래 간직하는 성향이 더해지면 조용히 멀어지면서 내면에서 수년간 타오르는 서운함이 되고, 같은 에너지 유형에 관계 회복을 중시하는 성향이 더해지면 거리를 두고 싶으면서도 화해도 원하는 내적 갈등이 된다. 즉각적이고 활동적인 에너지 유형에 감정을 오래 곱씹는 성향이 더해지면 폭발하고 나서도 내면에서는 한참 더 되새기는 복합적인 반응이 나온다. 이런 입체적인 조합은 어느 한 체계만으로는 만들 수 없다.",
        "impact": 8
      }
    ],
    "우정 스타일": [
      {
        "id": "FRIEND-STYLE-002",
        "tier": "A",
        "name": "우정 소통 방식 — 식상 표현 에너지 × 감정/논리 판단",
        "tags": [
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "uses:sipsung_rel",
          "axis:TF",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "식상(식신+상관) 그룹 비중 (analyzeGyeokguk.cnt['식상'], SS_CONTEXT 식신/상관, SJ_countIndividualSS 식신vs상관 개별 카운트)",
        "mbti": ": T/F 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "표현 에너지는 '이 사람이 얼마나 많이 표현하는가'를 결정하고, T/F는 '그 표현의 내용이 논리인가 감정인가'를 결정한다. 사주만으로는 표현이 많은지 적은지는 알지만 표현의 질까지 세분화하기 어렵고, MBTI만으로는 감정적인지 논리적인지는 알지만 표현 에너지의 총량은 알 수 없다. 특히 날카로운 창의적 표현 에너지에 감정 중심 성향이 더해진 조합은 두 체계를 함께 보지 않으면 포착하기 어려운 독특한 소통 패턴을 만든다.",
        "impact": 8
      },
      {
        "id": "FRIEND-STYLE-001",
        "tier": "A",
        "name": "우정 확장/심화 축 — 비겁 에너지 × 외향/내향 행동",
        "tags": [
          "ss:비겁",
          "ss:겁재",
          "ss:비견",
          "uses:yukchin",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "비겁(비견+겁재) 그룹 비중 (analyzeGyeokguk.cnt['비겁'], SJ_YUKCHIN_MAP['비견'='형제/친구','겁재'='경쟁자'], SIPSUNG_REL_KW 비겁 관련 조건)",
        "mbti": ": E/I 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "동료를 향한 에너지 총량과 E/I는 서로 독립적인 변수다. 동료 에너지가 많아도 내향적이면 행동으로 잘 드러나지 않고, 동료 에너지가 적어도 외향적이면 많은 사람과 어울린다. 이 두 가지를 함께 보지 않으면 '이 사람에게 친구가 많은 이유가 에너지가 많아서인지, 외향적인 행동 방식 때문인지'를 구별할 수 없다.",
        "impact": 9
      },
      {
        "id": "FRIEND-STYLE-003",
        "tier": "A",
        "name": "지적 교류 패턴 — 인성 학습/돌봄 에너지 × 직관/감각 정보 수집",
        "tags": [
          "ss:편인",
          "ss:정인",
          "ss:인성",
          "uses:sipsung_rel",
          "axis:SN",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "인성(정인+편인) 그룹 비중 (analyzeGyeokguk.cnt['인성'], SS_CONTEXT 정인/편인, SIPSUNG_GUNGWI_KW 인성 배치)",
        "mbti": ": N/S 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "학습과 돌봄 에너지의 총량과 N/S는 서로 다른 정보를 준다. 학습·돌봄 에너지가 높아도 현실적이고 감각적인 성향이면 실용적인 정보를 나누는 방식으로, 직관적이고 가능성을 중시하는 성향이면 이론이나 아이디어를 토론하는 방식으로 나타난다. 같은 '멘토형'이라도 내용이 완전히 달라지는 것이다. MBTI만으로는 관심 방향은 알지만 '실제로 친구에게 그것을 나눌 에너지가 있는가'는 알 수 없다.",
        "impact": 7
      },
      {
        "id": "FRIEND-STYLE-004",
        "tier": "A",
        "name": "대인 매력 패턴 — 도화살/화개살 × 외향/내향 행동",
        "tags": [
          "sinsal:도화",
          "sinsal:화개",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "도화살·화개살 유무 및 궁위 (SJ_getDohwa, SJ_getHwagae, SJ_DOHWA_GUNGWI, SJ_HWAGAE_GUNGWI, SINSAL_STORY, getSpecialSinsal)",
        "mbti": ": E/I 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "매력 에너지는 '있다/없다'의 문제이고, 외향/내향은 '얼마나 적극적으로 다가가는가'의 문제다. 매력 에너지가 있어도 내향적이면 그 매력이 겉으로 잘 드러나지 않고, 매력 에너지가 없어도 외향적이면 먼저 적극적으로 다가간다. 특히 매력 에너지+내향 조합은 두 체계를 함께 보지 않으면 '왜 인기는 있는데 친구가 적은가'를 설명할 수 없다. 영적·예술 에너지+외향 조합도 '고독한 탐구자인데 사교적'이라는 겉보기 모순을 설명해준다.",
        "impact": 7
      },
      {
        "id": "FRIEND-STYLE-008",
        "tier": "A",
        "name": "우정의 시간적 에너지 변화 — 궁위별 비겁/식상 배치 × 인지기능 발달 순서",
        "tags": [
          "ss:비겁",
          "ss:겁재",
          "ss:비견",
          "ss:식신",
          "ss:상관",
          "ss:식상",
          "uses:dominant",
          "uses:inferior"
        ],
        "saju": "비겁·식상이 배치된 궁위 (SSP['비견'/'겁재'/'식신'/'상관'][궁위], SIPSUNG_GUNGWI_KW, ST5_PILLAR_PSYCHOLOGY)",
        "mbti": ": 인지기능 스택 발달 순서 (MT_TYPES.stack[0~3], MT_STACK_POSITIONS: dominant→inferior 순서)",
        "cross": "사주의 궁위 체계와 MBTI의 성향 발달 순서는 모두 '같은 에너지라도 발현되는 시기가 다르다'는 원리를 공유하지만, 측정하는 대상이 다르다. 사주 궁위는 '어떤 에너지가 인생의 어느 시기에 활성화되는가'를 보여주고, MBTI 성향 발달 순서는 '어떤 심리적 성향이 언제 발달하는가'를 보여준다. 두 체계를 함께 보지 않으면 '왜 이 사람이 30대까지 친구가 적었는데 40대부터 갑자기 사교적이 됐는가' 같은 시간적 변화를 설명하기 어렵다.",
        "impact": 5
      },
      {
        "id": "FRIEND-STYLE-009",
        "tier": "B",
        "name": "우정의 감정적 체감 온도 — 조후 기질 온도 × T/F 축 + E/I 축",
        "tags": [
          "uses:johu",
          "uses:gaeun",
          "axis:EI",
          "axis:TF",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "조후 기질 온도 (ST5_JOHU, analyzeGyeokguk.seasonName, analyzeGyeokguk.johuDesc)",
        "mbti": ": T/F 축 강도 × E/I 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "태어난 계절이 주는 에너지 온도는 '에너지의 기본 강도'이고, 사고형/감정형과 외향/내향은 '그 온도가 어떤 방식으로 표출되는가'를 결정한다. 같은 여름 태생이라도 사고형+내향이면 뜨거움이 안으로 향하고, 감정형+외향이면 뜨거움이 바깥으로 폭발한다. 사주만으로는 '이 사람이 뜨겁다'는 알지만 '어떻게 뜨거운가'는 세분화하기 어렵고, MBTI만으로는 감정형+외향이라는 것은 알지만 '에너지의 기본 온도가 뜨거운가 차가운가'는 모른다. 특히 여름 태생+사고형+내향 같은 '겉과 속의 온도 차이'는 두 체계를 함께 보지 않으면 포착할 수 없다.",
        "impact": 6
      },
      {
        "id": "FRIEND-STYLE-005",
        "tier": "B",
        "name": "우정 주도/수용 패턴 — 음양 밸런스 × 외향/내향 행동",
        "tags": [
          "unsung:양",
          "uses:yinyang",
          "axis:EI",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "음양 밸런스 (SJ_calcYinYang: 극양/양우세/균형/음우세/극음)",
        "mbti": ": E/I 축 강도 (MT_INTENSITY_PROFILES: 55/68/88)",
        "cross": "사주의 음양 비율은 '에너지의 기본 방향(능동/수동)'이고, 외향/내향은 '행동의 방향'이다. 능동적 에너지가 강해도 내향적이면 안에서만 적극적이고, 수동적 에너지가 강해도 외향적이면 바깥으로는 활발하다. 이 교차가 없으면 '왜 이 사람이 약속은 잘 잡는데 실제로는 맞춰주기만 하는가'처럼, 수동적 에너지가 강하면서 외향적인 사람의 미묘한 우정 패턴을 설명할 수 없다.",
        "impact": 6
      },
      {
        "id": "FRIEND-STYLE-010",
        "tier": "B",
        "name": "우정에서의 약속/계획 스타일 — 음양 에너지 방향 × 구조화/유연 선호",
        "tags": [
          "unsung:양",
          "uses:yinyang",
          "axis:JP",
          "intensity:88",
          "uses:intensity"
        ],
        "saju": "음양 밸런스 (SJ_calcYinYang: 극양yang>=7/양우세yang>=5/균형yang=4/음우세yang<=3/극음yang<=1)",
        "mbti": ": J/P 축 강도 (MT_INTENSITY_PROFILES: J:55/J:68/J:88 또는 P:55/P:68/P:88)",
        "cross": "앞서 살펴본 음양×외향/내향 패턴이 '우정의 주도/수용'을 다룬다면, 이 패턴은 '약속과 계획의 주도/수용'이라는 더 구체적인 행동 차원을 포착한다. 외향/내향은 사교 행동의 방향이고 계획형/즉흥형은 계획 행동의 방향이므로 서로 독립적인 교차다. 사주의 음양만으로는 '능동적 에너지가 강한 사람이 즉흥적인지 계획적인지'를 구분할 수 없고, MBTI의 계획형/즉흥형만으로는 '계획적인 사람이 주도적인지 수동적인지'를 구분할 수 없다.",
        "impact": 5
      },
      {
        "id": "FRIEND-STYLE-007",
        "tier": "B",
        "name": "우정에서의 돌봄 방향 — 식신/상관 + 인성/재성 흐름 × 주기능 유형",
        "tags": [
          "ss:식상",
          "unsung:사",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "uses:dominant",
          "axis:EI",
          "axis:TF"
        ],
        "saju": "식상생재 또는 살인상생 통변 공식 존재 여부 (SJ_detectTongbyeon, analyzeGyeokguk.cnt 십성 그룹 비중)",
        "mbti": ": 주기능 유형 — Fe(외향 감정)/Fi(내향 감정)/Te(외향 사고)/Ti(내향 사고) (MT_TYPES.stack[0], MT_FUNCTIONS)",
        "cross": "사주의 에너지 흐름은 '이 사람의 에너지가 어떤 방향으로 흘러가는가'를 보여주고, MBTI의 가장 강한 성향은 '그 흐름이 어떤 심리적 방식으로 작동하는가'를 보여준다. 사주만으로는 재능이 실질적 도움으로 이어지는 흐름이 있다는 것은 알지만, 그것이 감정적 돌봄인지 효율적 문제 해결인지는 구별하기 어렵다. MBTI만으로는 감정 중심인지 논리 중심인지는 알지만, 실제로 친구에게 그 에너지를 쏟을 구조적 동력이 있는가는 알 수 없다.",
        "impact": 6
      },
      {
        "id": "FRIEND-STYLE-006",
        "tier": "S",
        "name": "동지형 vs 경쟁형 우정 — 비견/겁재 개별 비율 × 판단기능 방향",
        "tags": [
          "ss:비겁",
          "ss:겁재",
          "ss:비견",
          "uses:sipsung_rel",
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "uses:dominant",
          "axis:EI"
        ],
        "saju": "비견 vs 겁재 개별 카운트 (SJ_countIndividualSS, SS_CONTEXT 비견='같은에너지' 겁재='경쟁에너지', SIPSUNG_REL_KW 비겁 관련)",
        "mbti": ": 주기능이 외향 판단(Te/Fe) vs 내향 판단(Ti/Fi) (MT_TYPES.stack[0], MT_FUNCTIONS)",
        "cross": "사주에서 동료 에너지와 경쟁 에너지를 구별하면 '함께하는 힘 vs 이기려는 힘'을 분리할 수 있지만, 그것이 겉으로 드러나는지 안에서만 작동하는지는 MBTI의 판단 방향(외향/내향)이 결정한다. 특히 경쟁 에너지+내면 가치 판단 성향 조합은 '겉으로 보면 좋은 친구인데 속으로 끊임없이 비교하는' 패턴으로, 두 체계를 함께 보지 않으면 포착할 수 없다.",
        "impact": 7
      }
    ],
    "이 사람의 성격": [
      {
        "id": "FRIEND-CHAR-010",
        "tier": "A",
        "name": "사회적 역할 교차 — 친구 관계에서의 포지션",
        "tags": [
          "uses:gyeokguk",
          "unsung:사",
          "uses:dominant",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "격국 유형 (analyzeGyeokguk.gyeokgukName, JAPYEONG_GG)",
        "mbti": ": 상호작용 스타일 (MT_INTERACTION_STYLES) + 주기능 (MT_TYPES.stack[0])",
        "cross": "에너지 구조는 10종 이상의 세분화된 사회적 역할을 보여주고, 상호작용 스타일은 4종의 소통 방식을 보여준다. 에너지 구조가 '무엇을 하는가'(역할의 내용)라면 상호작용 스타일은 '어떻게 하는가'(역할의 방식)다. 두 체계를 교차하면 '재능 표현 구조+주도적 스타일 = 재능을 앞장서서 밀어붙이는 사람' vs '재능 표현 구조+조용한 스타일 = 재능을 묵묵히 발휘하는 사람'처럼, 같은 에너지 구조라도 행동 방식이 갈리는 지점을 포착할 수 있다.",
        "impact": 7
      },
      {
        "id": "FRIEND-CHAR-007",
        "tier": "A",
        "name": "기질 원형 교차 — 세상을 대하는 기본 태도",
        "tags": [
          "unsung:태",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "일간 오행 기질 (TEMPERAMENT_GROUPS, ST5_TGAN_DEEP)",
        "mbti": ": Keirsey 4대 기질 (MT_TEMPERAMENTS)",
        "cross": "5원소와 4기질은 1:1 매핑이 불가능하다(5 vs 4 비대칭). 그러나 바로 이 비대칭이 가치를 만든다 — 사주가 '나무 기운(탐색자)'으로 분류한 사람이 MBTI에서 NF(이상주의자)인지 NT(합리주의자)인지에 따라 탐색의 방향이 '가치 탐색'인지 '지적 탐색'인지가 갈린다. 어느 한 체계만으로는 이 구분이 불가능하다.",
        "impact": 8
      },
      {
        "id": "FRIEND-CHAR-016",
        "tier": "A",
        "name": "십성 에너지 소비 패턴 — 친구 관계에서의 에너지 방향",
        "tags": [
          "uses:sipsung_rel"
        ],
        "saju": "십성 그룹별 비중 (analyzeGyeokguk.cnt, SIPSUNG_REL_KW)",
        "mbti": ": 인지기능 스택 방향성 (MT_TYPES.stack, MT_FUNCTIONS)",
        "cross": "사주의 에너지 분포는 '어디에 에너지가 얼마나 있는가'라는 양적 배분을 보여주고, MBTI의 성향 발달 순서는 '그 에너지를 어떤 방식으로 쓰는가'라는 질적 위계를 보여준다. 양적 분포와 질적 위계는 같은 사람의 서로 다른 측면이다. 두 체계를 함께 보면 '무엇에 에너지가 많은가'와 '그것을 어떻게 쓰는가'가 결합되어 행동 예측의 정밀도가 높아진다.",
        "impact": 7
      },
      {
        "id": "FRIEND-CHAR-017",
        "tier": "A",
        "name": "심리 위치 위계 교차 — 에너지의 의식화 수준",
        "tags": [
          "uses:dominant",
          "uses:inferior",
          "uses:auxiliary",
          "uses:tertiary",
          "temperament:SP"
        ],
        "saju": "궁위별 십성 배치 (SSP, SIPSUNG_GUNGWI_KW, ST5_PILLAR_PSYCHOLOGY)",
        "mbti": ": 인지기능 스택 위치 (MT_STACK_POSITIONS: dominant/auxiliary/tertiary/inferior)",
        "cross": "사주의 궁위 체계는 시간축(유년기·청년기·중년·노년)과 관계축(조상·사회·자아·자녀)을 동시에 반영하고, MBTI의 성향 발달 순서는 심리적 성숙 단계를 반영한다. 두 위계 체계의 원리가 다르기 때문에, 함께 보면 시간적·관계적·심리적 발달이라는 세 가지 차원이 결합되어 한 사람의 성격을 훨씬 깊이 이해할 수 있다. 이것은 어느 한 체계만으로는 달성하기 어려운 다차원적 통찰이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-CHAR-011",
        "tier": "A",
        "name": "성격 원형 교차 — 두 체계의 인물상 대조",
        "tags": [
          "uses:ilju",
          "uses:mulsang"
        ],
        "saju": "60일주 성격 원형 (ILJU_DATA, ST5_ILJU_COMBINATION)",
        "mbti": ": 16유형 풀 프로필 (MT_TYPES)",
        "cross": "60가지 일주는 자연물 이미지를 가진 원형이라 직관적으로 이해하기 쉽고, 16가지 MBTI 유형은 심리적 작동 원리를 구체적으로 설명한다. 60가지 일주가 '이 사람의 이미지'를 주면, MBTI 유형이 '그 이미지 뒤의 심리적 작동 원리'를 제공한다. 예를 들어 큰 나무가 넓은 바다 위에 뿌리를 내린 이미지의 일주라면, INTJ 유형의 장기 비전을 체계적으로 실행하는 성향이 그 이미지 뒤의 작동 원리를 설명해준다. 어느 한 체계만으로는 이미지 또는 작동 원리 중 하나만 얻을 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-CHAR-003",
        "tier": "B",
        "name": "격국 사회적 역할 기질",
        "tags": [
          "uses:gyeokguk",
          "unsung:사"
        ],
        "saju": "격국 — analyzeGyeokguk.gyeokgukName, JAPYEONG_GG, ST5_GYEOKGUK_SYSTEM, GYEOKGUK_KW",
        "mbti": ": MT_TEMPERAMENTS[기질].socialRole + MT_INTERACTION_STYLES (사회적 역할 선호와 기능 활용 방식)",
        "cross": "에너지 구조는 사회적 환경에서 도출되는 역할 기질이므로, 개인의 내적 선호가 아니라 환경이 부여하는 역할에 대한 적응 패턴을 보여준다. MBTI가 내적 선호 기반이라면, 에너지 구조와의 교차는 '하고 싶은 것(내적 선호) vs 맡게 되는 것(환경적 역할)'의 간극을 드러낼 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-CHAR-004",
        "tier": "B",
        "name": "60일주 성격 원형",
        "tags": [
          "uses:ilju",
          "uses:shadow"
        ],
        "saju": "일주 — ILJU_DATA(60종), ILJU_KW(core/shadow), ST5_ILJU_COMBINATION, ST5_SIMILAR_ILJU",
        "mbti": ": MT_TYPES[code] 16유형 풀 프로필 + MT_TYPES[code].stack (인지기능 4단계)",
        "cross": "60가지 일주 원형은 16가지 MBTI 유형보다 훨씬 세분화되어 있으며, 각 원형이 자연물 이미지를 가져 직관적으로 이해하기 쉽다. 또한 비슷해 보이는 일주들 사이의 미세한 차이를 구별하는 방법이 있어, 유사한 원형 간의 차이를 설명할 수 있다. MBTI 유형과 함께 보면 같은 유형 안에서 60가지 일주가 어떻게 분포하는지를 탐색할 수 있어, 유형 내 변이를 훨씬 풍부하게 설명할 수 있다.",
        "impact": 9
      },
      {
        "id": "FRIEND-CHAR-002",
        "tier": "B",
        "name": "신강/신약 에너지 밀도",
        "tags": [
          "strength:신강+",
          "strength:신약+",
          "uses:strength"
        ],
        "saju": "신강도 — getStrengthGrade, SJ_buildStrengthText, analyzeGyeokguk.strengthScore",
        "mbti": ": MT_INTENSITY_PROFILES[축][강도] (55/68/88급 축별 표현 강도 프로필)",
        "cross": "같은 유형이라도 에너지 밀도에 따라 표현이 정반대가 될 수 있다는 것은 사주 고유의 통찰이다. 이것은 유형론의 '같은 유형인데 왜 다른가?'라는 질문에 대한 사주적 답변이며, 상대 체계의 표현 강도 개념과 교차 시 유형 내 변이를 설명하는 강력한 도구가 된다.",
        "impact": 9
      },
      {
        "id": "FRIEND-CHAR-001",
        "tier": "B",
        "name": "일간 오행 기질 원형",
        "tags": [
          "uses:mulsang"
        ],
        "saju": "일간(日干) 오행 — TEMPERAMENT_GROUPS, ST5_TGAN_DEEP, JEOKCHEONSU, MULSANG_GAN",
        "mbti": ": MT_TEMPERAMENTS (Keirsey 4대 기질: NF/NT/SJ/SP) + MT_AXES (E/I·S/N·T/F·J/P 4개 축)",
        "cross": "사주의 기질 분류는 생년월일시라는 객관적 데이터에서 도출되며, 자기보고 편향이 없다. 또한 하늘 에너지 각각에 고유 물상이 있어 같은 오행 내에서도 양의 기운과 음의 기운의 질적 차이가 명확하다. 상대 체계의 기질 축과 교차 시, 자기보고 vs 객관적 데이터의 일치·불일치가 '자기 인식의 정확도'를 파악하는 도구가 될 수 있다.",
        "impact": 10
      },
      {
        "id": "FRIEND-CHAR-005",
        "tier": "B",
        "name": "조후 기질 온도",
        "tags": [
          "uses:johu",
          "uses:mulsang",
          "uses:gaeun"
        ],
        "saju": "조후(調候) — ST5_JOHU, analyzeGyeokguk.seasonName/johuDesc/johuYongshin, MULSANG_SEASON",
        "mbti": ": MT_TEMPERAMENTS[기질].coreNeed + MT_TYPES[code].energyPattern (감정적 온도와 에너지 방향)",
        "cross": "태어난 계절이 주는 에너지 온도는 같은 타입이라도 계절에 따라 처방이 정반대가 되는 구조를 제공한다. 이것은 '환경이 기질의 표현을 어떻게 변조하는가'에 대한 사주 고유의 설명이며, MBTI가 환경 요인을 다루지 않는다면 이 교차에서 고유한 보완 가치가 나온다.",
        "impact": 7
      },
      {
        "id": "FRIEND-CHAR-015",
        "tier": "B",
        "name": "의사결정 흐름 — 이 사람이 결정을 내리는 순서",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "analyzeGyeokguk.flowSummary (오행 흐름 우선순위) + SIPSUNG_REL_KW (십성 비중에 따른 판단 순서)",
        "mbti": ": 유형별 의사결정 프로세스 (MT_DECISION_PROCESS)",
        "cross": "MBTI는 이 사람이 판단을 내릴 때 어떤 성향을 먼저 활성화하는지를 구체적으로 보여준다. 사주에서도 에너지 배치의 우선순위를 통해 '이 사람이 무엇을 먼저 고려하는가'를 파악할 수 있다. 두 체계가 제시하는 의사결정 우선순위를 대조하면, 친구에게 조언할 때 '어떤 방식으로 말해야 이 사람이 잘 받아들이는가'를 알 수 있어 실용적 가치가 높다.",
        "impact": 6
      },
      {
        "id": "FRIEND-CHAR-006",
        "tier": "B",
        "name": "원국 풍경화 — 성격의 감각적 전달",
        "tags": [
          "uses:mulsang"
        ],
        "saju": "물상(物象) — buildNatalLandscape, calcLandscapeHarmony, CHEONGAN_MULSANG, JIJI_MULSANG, WOLJI_SEASON, generateMulsangText",
        "mbti": ": MT_TYPES[code].metaphor + MT_TYPES[code].narrative (유형별 비유 이미지와 내러티브 스타일)",
        "cross": "물상적 접근은 성격을 '설명'이 아니라 '이미지'로 전달하는 고유한 방법론이다. 분석적 언어 대신 감각적 비유를 사용함으로써 비전문가도 즉각적으로 이해할 수 있다. 상대 체계와 교차 시, 유형의 추상적 설명을 물상 이미지로 보완하면 전달력이 극대화된다.",
        "impact": 6
      },
      {
        "id": "FRIEND-CHAR-014",
        "tier": "B",
        "name": "인지기능 스택 — 정보 처리와 판단의 심리적 메커니즘",
        "tags": [
          "unsung:사"
        ],
        "saju": "analyzeGyeokguk.cnt (십성 비중 분포) + SJ_calcOsinChegye (오신 체계 에너지 흐름) + SIPSUNG_GUNGWI_KW (궁위별 에너지 방향)",
        "mbti": ": 인지기능 스택 4단계 (MT_TYPES.stack, MT_STACK_POSITIONS, MT_FUNCTIONS)",
        "cross": "MBTI는 이 사람이 정보를 처리하는 우선순위를 보여주는 핵심 변수다. 사주에서는 에너지 분포가 '이 사람의 에너지가 어디를 향하는가'를 보여주기 때문에, 두 체계를 함께 보면 정보 처리 방향과 에너지 방향을 교차해서 볼 수 있다. 다만 사주 측의 구체적인 대응 변수는 추가 확인이 필요하다.",
        "impact": 9
      },
      {
        "id": "FRIEND-CHAR-013",
        "tier": "C",
        "name": "감정 온도 교차 — 기질의 뜨거움/차가움",
        "tags": [
          "uses:johu",
          "uses:gaeun",
          "axis:EI",
          "axis:TF",
          "uses:intensity"
        ],
        "saju": "조후 기질 온도 (ST5_JOHU, analyzeGyeokguk.seasonName)",
        "mbti": ": T/F 축 강도 + E/I 축 강도 (MT_INTENSITY_PROFILES)",
        "cross": "태어난 계절이 주는 에너지 온도는 외부 조건에서 도출되고, 사고형/감정형 강도는 판단 방식의 내적 선호에서 도출된다. 출발점이 완전히 다르므로 일치하면 매우 강한 확인이 되고, 불일치하면(여름 태생인데 사고형 성향이 매우 강한 경우) '외부 조건은 뜨겁지만 내적 처리는 차가운' 흥미로운 다층성이 드러난다. 다만 이 교차는 비유적 수준이며 정밀한 메커니즘 대응은 아니다.",
        "impact": 4
      },
      {
        "id": "FRIEND-CHAR-008",
        "tier": "S",
        "name": "에너지 밀도 교차 — 성격 표현의 강도",
        "tags": [
          "uses:strength",
          "uses:intensity"
        ],
        "saju": "신강도 (getStrengthGrade, SJ_buildStrengthText)",
        "mbti": ": 4축 선호 강도 (MT_INTENSITY_PROFILES)",
        "cross": "사주의 에너지 강도는 단일 수치(내 편 에너지 비율)인 반면, MBTI는 4개 축 각각에 독립적 강도가 있다. 따라서 교차 시 '어떤 축의 강도와 에너지 강도를 비교하는가'가 중요하다. 예컨대 에너지가 강한 사람의 외향/내향 축 강도가 외향 쪽으로 강하면 '에너지가 강하게 외부로 분출하는 사람'이고, 같은 에너지 강도인데 내향 쪽으로 강하면 '에너지는 강하지만 내부에 축적하는 사람'이다. 에너지 강도 하나만으로는 이 방향성을 알 수 없다.",
        "impact": 9
      },
      {
        "id": "FRIEND-CHAR-012",
        "tier": "S",
        "name": "밝은 면/어두운 면 교차 — 매력과 약점의 이중 확인",
        "tags": [
          "uses:ilju",
          "cf:Fe",
          "cf:Ne",
          "uses:shadow"
        ],
        "saju": "일주 core/shadow 키워드 (ILJU_KW)",
        "mbti": ": coreNeed/coreFear + 그림자 기능 (MT_TYPES, MT_SHADOW_BY_TYPE)",
        "cross": "사주에서 드러나는 어두운 면은 일주 조합에서 고정적으로 나타나는 잠재적 성향이고, MBTI에서 극심한 스트레스 상태에 나타나는 숨겨진 어두운 면은 상황에 따라 동적으로 발현되는 심리적 보호 반응이다. 사주가 '이 사람에게 잠재된 어두운 면'을 보여준다면, MBTI는 '그 어두운 면이 언제, 어떻게 발동하는가'의 흐름을 제공한다. 예를 들어 사주에서 감정적 결정이라는 어두운 면이 있고, 극심한 스트레스 상태에서 내면의 감정이 폭발하는 성향이 겹치면, 극한 상황에서 감정적 결정이 파괴적으로 증폭되는 구체적인 경로가 보인다.",
        "impact": 7
      },
      {
        "id": "FRIEND-CHAR-009",
        "tier": "S",
        "name": "에너지 밀도 불일치 — 내적 긴장 신호",
        "tags": [
          "uses:strength",
          "uses:intensity"
        ],
        "saju": "신강도 (getStrengthGrade)",
        "mbti": ": 4축 선호 강도 (MT_INTENSITY_PROFILES)",
        "cross": "어느 한 체계만으로는 이 불일치를 감지할 수 없다. 사주만 보면 '에너지가 매우 강하니까 강하게 밀어붙이는 사람'이고, MBTI만 보면 '축 강도가 중간이니까 유연한 사람'인데, 두 체계를 함께 보면 '내면은 강렬하지만 겉으로는 유연해 보이는 사람'이라는 더 정밀한 묘사가 가능하다. 이것은 친구 관계에서 '처음엔 부드러워 보이는데 깊이 사귀면 양보를 안 하는' 유형의 친구를 설명한다.",
        "impact": 7
      }
    ],
    "잘 맞는 부분": [
      {
        "id": "FRIEND-FIT-013",
        "tier": "A",
        "name": "성장 자극 수렴 — 상생 관계와 교육자 관계가 겹칠 때",
        "tags": [
          "uses:dominant",
          "uses:auxiliary",
          "ref:MT_RELATION"
        ],
        "saju": "sajuA.dmEl + sajuB.dmEl → 상생(A가 B를 생하거나 B가 A를 생) 판정",
        "mbti": ": MT_RELATION_TYPES.pedagogue (한쪽의 주기능이 상대의 부기능 방향을 자극)",
        "cross": "사주의 에너지 북돋음은 한쪽이 다른 쪽을 밀어주는 일방향 흐름이고, MBTI에서 서로의 성장을 자극하는 관계 구조는 심리적 성향을 깨워주는 방식이다. 에너지 차원의 돌봄과 심리적 성장 자극이 같은 방향을 가리킬 때, 그 관계는 단순한 편안함을 넘어 실질적인 성장을 만들어낸다.",
        "impact": 7
      },
      {
        "id": "FRIEND-FIT-012",
        "tier": "A",
        "name": "공명 수렴 — 비화 관계와 동반자 관계가 겹칠 때",
        "tags": [
          "uses:dominant",
          "ref:MT_RELATION"
        ],
        "saju": "sajuA.dmEl + sajuB.dmEl → 비화(같은 오행) 판정",
        "mbti": ": MT_RELATION_TYPES.companion (같은 주기능 공유), MT_FUNCTION_INTERACTIONS resonance 유형",
        "cross": "사주에서 같은 오행끼리의 에너지 공명은 '같은 기운의 울림'이고, MBTI에서 같은 성향끼리의 심리적 공명은 '같은 방식의 울림'이다. 두 공명이 겹치면 '이 사람은 나의 다른 버전'이라는 느낌이 극대화된다. 그러나 동시에 같은 약점의 공유도 이중으로 확인되므로, 성장 자극 부족의 위험도 두 체계가 함께 경고한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-FIT-011",
        "tier": "A",
        "name": "역할 분담 수렴 — 십성 역할과 우정 스타일이 같은 구조를 가리킬 때",
        "tags": [
          "uses:sipsung_rel",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "getSipsung(A.dg, B.dg) → A→B 십성, getSipsung(B.dg, A.dg) → B→A 십성",
        "mbti": ": MT_FRIENDSHIP(A).giving + MT_FRIENDSHIP(B).needing, MT_FRIENDSHIP(B).giving + MT_FRIENDSHIP(A).needing",
        "cross": "사주의 에너지 흐름은 누가 누구에게 무엇을 주는가라는 방향을 보여주고, MBTI의 우정 스타일은 실제로 어떻게 주고받는가라는 행동 패턴을 보여준다. 학습과 보호를 주는 에너지 구조와 통찰을 나누는 행동 패턴이 같은 방향을 가리킬 때, 에너지 구조가 실제 행동으로 이어지는 경로가 확인된다.",
        "impact": 7
      },
      {
        "id": "FRIEND-FIT-009",
        "tier": "A",
        "name": "이중 보완 수렴 — 에너지 보완과 인지 보완이 같은 방향을 가리킬 때",
        "tags": [
          "condition:lack",
          "ref:MT_RELATION"
        ],
        "saju": "sajuA.lackFull + sajuB.elFull (오행 보완 방향)",
        "mbti": ": MT_RELATION_TYPES (dual/pedagogue 관계 여부), MT_FUNCTION_INTERACTIONS (complement 유형)",
        "cross": "사주만으로는 '왜 편한지'를 에너지 흐름으로 설명하고, MBTI만으로는 심리적 보완으로 설명한다. 두 체계가 같은 방향을 가리킬 때 비로소 '이 우정이 왜 특별한지'를 여러 층위에서 확인할 수 있다. 에너지 보완은 무의식적인 끌림을, 심리적 보완은 실질적인 시너지를 만드는 서로 다른 층위이기 때문에, 두 체계가 일치할 때 설명력은 단순히 더해지는 것이 아니라 곱해지듯 커진다.",
        "impact": 8
      },
      {
        "id": "FRIEND-FIT-007",
        "tier": "B",
        "name": "십성 역할 시너지 — 자연스러운 역할 분담",
        "tags": [
          "unsung:사",
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(A.dg, B.dg) → A→B 십성, getSipsung(B.dg, A.dg) → B→A 십성",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 나와 상대방의 관계성을 10가지 에너지 역할로 분류하는 사주의 방식은 '이 친구와 나는 어떤 역할 관계인가'를 구체적으로 짚어준다. 궁합에서 가장 직관적인 '관계 역할'을 보여주는 분석이다.",
        "impact": 8
      },
      {
        "id": "FRIEND-FIT-008",
        "tier": "B",
        "name": "강약 보완 궁합 — 에너지 밀도의 상보성",
        "tags": [
          "uses:strength",
          "unsung:사",
          "uses:gunghap"
        ],
        "saju": "ggA.strengthGrade + ggB.strengthGrade → 강약 조합 판정",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 에너지 강도는 사주 전체의 에너지 밀도를 하나의 축으로 요약한 것으로, 두 사람의 에너지 밀도 차이가 만드는 보완/충돌 구조를 특정한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-FIT-006",
        "tier": "B",
        "name": "납음 궁합 — 존재 질감의 자연적 조화",
        "tags": [
          "unsung:사",
          "uses:napeum",
          "uses:gunghap"
        ],
        "saju": "getNapeum(A.dg, A.dj) + getNapeum(B.dg, B.dj) → 납음 오행 상생/비화 판정",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 소리의 기운은 하늘 에너지와 땅 에너지의 오행과 별개의 층위로, 표면 오행에서 포착되지 않는 차원의 조화와 부조화를 본다. '왜인지 설명 안 되는데 이 친구랑은 그냥 잘 맞아'의 한 축이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-FIT-016",
        "tier": "B",
        "name": "보완 기질 시너지 — 다른 기질 간 상호 성장",
        "tags": [
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_TEMPERAMENTS (NF/NT/SP/SJ) 다른 기질 조합",
        "cross": "없음",
        "impact": 5
      },
      {
        "id": "FRIEND-FIT-018",
        "tier": "B",
        "name": "인지기능 축 공유 — 같은 언어로 세상을 이야기하는 친구",
        "tags": [
          "cf:Fi",
          "cf:Fe",
          "cf:Ti",
          "cf:Te",
          "cf:Ni",
          "cf:Ne",
          "cf:Si",
          "cf:Se",
          "ref:MT_AXES"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_AXES (Fi-Te, Fe-Ti, Ne-Si, Ni-Se) 공유 여부, MT_TYPES.stack",
        "cross": "없음",
        "impact": 6
      },
      {
        "id": "FRIEND-FIT-015",
        "tier": "B",
        "name": "기질 시너지 — 같은 기질의 즉각적 이해",
        "tags": [
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_TEMPERAMENTS (NF/NT/SP/SJ) 동일 기질 여부",
        "cross": "없음",
        "impact": 6
      },
      {
        "id": "FRIEND-FIT-017",
        "tier": "B",
        "name": "의사결정 보완 시너지 — 서로의 맹점을 커버하는 결정 구조",
        "tags": [
          "unsung:사",
          "ref:MT_DECISION"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_DECISION_PROCESS(A).blind + MT_DECISION_PROCESS(B).flow[0-1], 반대 방향 동일",
        "cross": "없음",
        "impact": 5
      },
      {
        "id": "FRIEND-FIT-001",
        "tier": "B",
        "name": "오행 보완 끌림 — 부족한 것을 채워주는 무의식적 편안함",
        "tags": [
          "condition:lack",
          "unsung:사"
        ],
        "saju": "sajuA.lackFull + sajuB.elFull (오행 보완), sajuB.lackFull + sajuA.elFull",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 오행이라는 5원소 체계로 '왜 이 친구랑 있으면 편한가'의 구조적 이유를 특정한다. 부족 오행별로 채워지는 에너지의 질감이 다르다(목→성장/자극, 화→열정/활기, 토→안정/포용, 금→결단/명확, 수→지혜/유연).",
        "impact": 8
      },
      {
        "id": "FRIEND-FIT-002",
        "tier": "B",
        "name": "일간 오행 호환성 — 본질적 에너지 공명",
        "tags": [
          "unsung:사"
        ],
        "saju": "sajuA.dmEl + sajuB.dmEl → OH_SANG/비화/OH_GEUK 판정",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 일간 오행은 가장 근본적인 에너지 질감이므로, 이 호환성이 우정의 기초 톤을 결정한다. 상생은 '편안함의 방향', 비화는 '공감의 깊이', 상극은 '자극의 강도'를 각각 특정한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-FIT-003",
        "tier": "B",
        "name": "천간합 궁위별 시너지 — 결합하는 에너지의 위치",
        "tags": [
          "pillar:월간",
          "pillar:시주",
          "pillar:년주",
          "unsung:사",
          "relation:천간합"
        ],
        "saju": "CHEONGAN_HAP 5쌍 × 궁위(년간/월간/일간/시간)",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 천간합은 음양이 짝을 이루는 자연적 결합력으로, 합화 오행(갑기→토, 을경→금 등)에 따라 결합 시 생성되는 새로운 에너지의 질감까지 특정할 수 있다.",
        "impact": 7
      },
      {
        "id": "FRIEND-FIT-004",
        "tier": "B",
        "name": "지지 육합/삼합 시너지 — 환경적 결합과 팀 에너지",
        "tags": [
          "unsung:사",
          "relation:육합",
          "relation:삼합"
        ],
        "saju": "JIJI_YUKHAP 6쌍 × 궁위 + JIJI_SAMHAP 교차 완성",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 삼합 교차는 '혼자서는 안 되는데 이 친구랑 함께하면 되는 것'을 구조적으로 특정하는 유일한 도구. 완성되는 오행(화/목/금/수)에 따라 시너지의 질감이 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-FIT-005",
        "tier": "B",
        "name": "용신 보완 궁합 — 핵심 에너지를 채워주는 친구",
        "tags": [
          "unsung:사",
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) → A용신오행, sajuB.elFull[A용신오행] / 반대 방향 동일",
        "mbti": ": 없음 (사주 단독)",
        "cross": "사주 단독 패턴. 가장 필요한 에너지는 사주 전체를 분석한 뒤 도출되는 핵심 에너지로, 단순 오행 보완보다 더 핵심적이다. 단순 오행 보완이 부족한 것을 채워주는 '편안함'이라면, 이것은 가장 필요한 것을 채워주는 '살아나는 느낌'.",
        "impact": 9
      },
      {
        "id": "FRIEND-FIT-019",
        "tier": "B",
        "name": "우정 만들기 스타일 호환 — 친해지는 방식의 자연스러운 맞물림",
        "tags": [
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_FRIENDSHIP(A).making + MT_FRIENDSHIP(B).making, MT_FRIENDSHIP(A).giving + MT_FRIENDSHIP(B).needing",
        "cross": "없음",
        "impact": 5
      },
      {
        "id": "FRIEND-FIT-020",
        "tier": "B",
        "name": "상호작용 스타일 시너지 — 행동 리듬의 조화",
        "tags": [
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음 (MBTI 단독)",
        "mbti": ": MT_INTERACTION_STYLES(A) + MT_INTERACTION_STYLES(B)",
        "cross": "없음",
        "impact": 4
      },
      {
        "id": "FRIEND-FIT-014",
        "tier": "S",
        "name": "에너지 밀도 × E/I 호환 — 끌어주는/받쳐주는 구조의 이중 확인",
        "tags": [
          "uses:strength",
          "axis:EI",
          "uses:intensity"
        ],
        "saju": "ggA.strengthGrade + ggB.strengthGrade → 강약 조합",
        "mbti": ": MT_INTENSITY_PROFILES E/I 축 (55/68/88)",
        "cross": "사주의 에너지 강약은 에너지의 절대적인 밀도를 보고, MBTI의 내향·외향은 에너지의 방향(바깥 vs 안)을 본다. 에너지가 강하다고 외향적인 것은 아니고, 내향적이라고 에너지가 약한 것도 아니다. 두 축이 같은 방향이면 '에너지가 크고 바깥으로 향하는' 명확한 프로필이 되고, 엇갈리면 '에너지는 큰데 안으로 향하는' 미스터리한 프로필이 된다. 궁합에서 이 조합이 어떻게 만나는지가 두 사람의 역할 구조를 결정한다.",
        "impact": 6
      },
      {
        "id": "FRIEND-FIT-010",
        "tier": "S",
        "name": "이중 보완 발산 — 한 체계는 보완이지만 다른 체계는 아닐 때",
        "tags": [
          "condition:lack",
          "ref:MT_RELATION"
        ],
        "saju": "sajuA.lackFull + sajuB.elFull (오행 보완 성립)",
        "mbti": ": MT_RELATION_TYPES (conflict/quasiIdentical 등 비보완 관계)",
        "cross": "한 가지 체계만 보면 '잘 맞는다' 또는 '안 맞는다'는 이분법에 머물지만, 두 체계가 엇갈리는 지점을 포착하면 '어떤 차원에서는 맞고 어떤 차원에서는 안 맞는지'를 분리해서 볼 수 있다. 이것은 어느 한 체계만으로는 설명할 수 없는 관계의 복잡성이다.",
        "impact": 7
      }
    ],
    "한 줄 요약": [
      {
        "id": "FRIEND-SUM-001",
        "tier": "B",
        "name": "물상 풍경 병치 — 두 사람의 관계를 한 장면으로 그리기",
        "tags": [
          "unsung:사",
          "unsung:병",
          "uses:ilju",
          "uses:mulsang",
          "uses:gaeun"
        ],
        "saju": "MULSANG_GAN[A.dm].image + MULSANG_SEASON[A.P[1].b].season + MULSANG_GAN[B.dm].image + MULSANG_SEASON[B.P[1].b].season + ILJU_DATA[A일주].k + ILJU_DATA[B일주].k",
        "mbti": ": 없음",
        "cross": "사주 고유의 물상 체계(천간 10물상 + 월지 12계절 + 60일주 키워드)만이 두 사람의 관계를 자연물 이미지로 응축할 수 있다. MBTI에는 물상/계절/자연 이미지 체계가 없으며, 이것은 한 줄 요약에서 '감각적 전달력'을 담당하는 사주 고유의 가치다.",
        "impact": 7
      },
      {
        "id": "FRIEND-SUM-005",
        "tier": "B",
        "name": "시간적 궤도 수렴 — 이 관계의 현재 온도와 미래 방향",
        "tags": [
          "dm:기",
          "uses:daewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.dw[0].sync (현재 대운 동기화) + analyzeGunghap.details.timing.bestYear + analyzeGunghap.details.timing.worstYear",
        "mbti": ": 없음",
        "cross": "사주만이 두 사람의 시간적 궤도(10년 단위의 큰 흐름과 해마다 바뀌는 변화)를 살필 수 있다. MBTI에는 개인별 시간축 분석 체계가 없다. '이 관계가 시간에 따라 어떻게 변하는가'는 사주 고유의 설명 영역이며, 한 줄 요약에 미래 방향성을 부여하는 유일한 변수다.",
        "impact": 7
      },
      {
        "id": "FRIEND-SUM-002",
        "tier": "B",
        "name": "관계 에너지 원형 — 일간 오행 방향 + 납음 질감의 이중 톤",
        "tags": [
          "uses:napeum"
        ],
        "saju": "OH_SANG/OH_GEUK(A.dmEl, B.dmEl) → 상생/상극/비화 + getNapeum(A.dg, A.dj) + getNapeum(B.dg, B.dj) → 납음 오행 상생/비화/상극",
        "mbti": ": 없음",
        "cross": "일간 오행과 소리의 기운은 같은 사주에서 나오지만 서로 다른 차원을 측정한다. 일간 오행은 의식적인 에너지 방향을, 소리의 기운은 무의식적인 존재의 질감을 담는다. 이 두 층위가 같은 방향이면 한 줄 요약이 단순명쾌해지고, 엇갈리면 복잡한 뉘앙스가 담긴다.",
        "impact": 6
      },
      {
        "id": "FRIEND-SUM-MBTI-001",
        "tier": "B",
        "name": "관계 유형 원형 한 줄 — MBTI가 읽는 이 우정의 구조적 정체성",
        "tags": [
          "ref:MT_RELATION"
        ],
        "saju": "없음",
        "mbti": ": MT_RELATION_TYPES[rel].name + MT_RELATION_TYPES[rel].pattern + MT_RELATION_MATRIX[a,b].note",
        "cross": "사주의 물상 풍경이 관계의 시각적 이미지를 제공한다면, 이 패턴은 관계의 구조적 역학을 한 단어로 정의한다. 물상이 '풍경'이면 관계 유형은 '관계의 문법'이다.",
        "impact": 8
      },
      {
        "id": "FRIEND-SUM-006",
        "tier": "B",
        "name": "교차 통변 핵심 키워드 — 함께일 때만 발현되는 구조적 성격",
        "tags": [
          "ss:비겁",
          "ss:식상",
          "tongbyeon:식상생재",
          "uses:tongbyeon",
          "tongbyeon:살인상생",
          "tongbyeon:비겁탈재",
          "tongbyeon:관살혼잡"
        ],
        "saju": "SJ_detectCrossTongbyeon(ggA, ggB) → 길(식상생재, 살인상생 등) / 흉(비겁탈재, 관살혼잡 등)",
        "mbti": ": 없음",
        "cross": "두 사람의 에너지가 만날 때만 발현되는 고유한 패턴이 있다. 각자의 사주에는 없지만 두 사람이 함께할 때만 생겨나는 이 에너지는 궁합 분석에서만 도출되는 고유한 변수로, 한 줄 요약에서 '이 관계만의 고유한 화학작용'을 전달한다.",
        "impact": 7
      },
      {
        "id": "FRIEND-SUM-MBTI-002",
        "tier": "B",
        "name": "기질 조합 핵심 키워드 — 두 사람의 기질이 만드는 관계의 기본 톤",
        "tags": [
          "unsung:사",
          "cf:Ne",
          "ref:MT_TEMPERAMENTS"
        ],
        "saju": "없음",
        "mbti": ": MT_TEMPERAMENTS[A기질].name + MT_TEMPERAMENTS[B기질].name + MT_TEMPERAMENTS[A기질].coreNeed + MT_TEMPERAMENTS[B기질].coreNeed",
        "cross": "일간 오행의 관계가 에너지적 방향을 제공한다면, 기질 조합은 심리적 욕구가 같은 방향으로 모이는지 서로 다른 방향으로 퍼지는지를 보여준다. 같은 감성·공감 기질이라도 사주에서는 서로 충돌할 수 있고, 사주에서 서로 도움이 되는 관계라도 MBTI 기질이 전혀 다를 수 있다.",
        "impact": 7
      },
      {
        "id": "FRIEND-SUM-003",
        "tier": "B",
        "name": "18레이어 궁합 종합 + 관계유형별 최적 위치",
        "tags": [
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.scores.total + analyzeGunghapSaju.bestRelType + analyzeGunghapSaju.worstRelType + analyzeGunghapSaju.gap",
        "mbti": ": 없음",
        "cross": "사주 궁합 분석만이 동일한 두 사람에 대해 관계 유형별로 6가지 점수를 산출할 수 있다. '친구로는 95점인데 연인으로는 65점'이라는 구조적 통찰은 사주 궁합만이 줄 수 있는 고유한 가치다.",
        "impact": 8
      },
      {
        "id": "FRIEND-SUM-004",
        "tier": "B",
        "name": "핵심 갈망-보완 수렴도 — 이 관계의 상호 필요 밀도",
        "tags": [
          "condition:lack",
          "uses:yongshin"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin) + sajuB.elFull[A용신오행] ≥ 2 여부 + 역방향(B용신 + sajuA.elFull) + sajuA.lackFull ∩ sajuB 강한오행 + 역방향",
        "mbti": ": 없음",
        "cross": "이전 소주제에서 개별적으로 발견된 갈망 패턴과 보완 패턴을 하나의 밀도 점수로 응축한다. 개별 패턴에서는 보이지 않았던 '이 관계의 전체적인 상호 의존도'가 드러난다. 사주의 오행 균형 체계만이 양방향 에너지 보완을 구체적인 수치로 측정할 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-SUM-MBTI-003",
        "tier": "B",
        "name": "우정 호환성 핵심 — giving×needing 양방향 충족도",
        "tags": [
          "unsung:양",
          "relation:충",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음",
        "mbti": ": MT_FRIENDSHIP[A유형].giving + MT_FRIENDSHIP[B유형].needing + MT_FRIENDSHIP[B유형].giving + MT_FRIENDSHIP[A유형].needing",
        "cross": "사주의 핵심 갈망-보완 밀도가 에너지적 필요의 양방향 밀도를 측정한다면, 이 패턴은 행동적 주고받기의 양방향 맞물림을 측정한다. 에너지적으로 보완이 되어도 실제 행동에서 주는 것과 필요한 것이 맞지 않을 수 있고, 그 반대도 가능하다.",
        "impact": 7
      }
    ],
    "회복법": [
      {
        "id": "FRIEND-RECOV-009",
        "tier": "B",
        "name": "십성 관계별 복원 동기",
        "tags": [
          "uses:sipsung_rel"
        ],
        "saju": "getSipsung(B.dg, A.dg) — B→A 십성, SS_CONTEXT[해당십성]",
        "mbti": ": 없음",
        "cross": "두 사람의 에너지 관계를 역할로 파악하는 방식은 '왜 다시 찾게 되는가'라는 동기를 구체적으로 짚어준다. 같은 그리움이라도 배움과 보호에서 오는 지적 갈증과 재능과 표현에서 오는 편안함에 대한 갈증은 질적으로 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-SAJU-014",
        "tier": "B",
        "name": "암합 기반 무의식적 복원 동기 — 겉으로 합이 없어도 지장간에서 끌리는 구조",
        "tags": [
          "relation:암합"
        ],
        "saju": "sajuA.amhap (calcSajuForApp에서 산출), SAJU_AMHAP_LAYERS, AMHAP_TABLE 5쌍, classifyAmhap()",
        "mbti": ": 없음",
        "cross": "사주만으로 분석한 결과다. 숨겨진 끌림은 겉으로 드러난 에너지와 내면 깊이 감춰진 에너지 사이의 보이지 않는 결합으로, MBTI에는 대응하는 개념이 없다. 무의식적 끌림의 작동 방식이 사주와 MBTI에서 완전히 다르게 나타난다. 사주의 숨겨진 끌림은 두 사람의 에너지가 만나는 방식에서 도출되고, MBTI의 무의식적 끌림은 각 성향이 성장하면서 자연스럽게 발달하는 순서에서 도출된다.",
        "impact": 4
      },
      {
        "id": "FRIEND-RECOV-017",
        "tier": "B",
        "name": "스트레스 회복 단계와 관계 복원 — 그립 경험이 만드는 자기 이해의 전환점",
        "tags": [
          "stress:grip"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES.stage5_recovery, MT_STRESS_STAGES.stage4_grip, MT_TYPES[type].stressPattern",
        "cross": "MBTI만으로 분석한 결과다. 자신의 성향에 대한 이해가 깊어지면서 관계 회복으로 이어지는 흐름은, 사주에서 큰 에너지 흐름이 바뀌는 것과 유사해 보이지만 차원이 다르다. 사주의 흐름 전환은 외부 에너지의 변화이고, 이것은 내면의 성장 과정이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-RECOV-016",
        "tier": "B",
        "name": "유형별 도어 슬램 vs 점진적 회복 — 관계 단절 방식이 결정하는 복원 가능성",
        "tags": [
          "unsung:절",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음",
        "mbti": ": MT_CONFLICT_STYLES[type].fightStyle, MT_FRIENDSHIP[type].breaking, MT_ANGER.byType[type]",
        "cross": "MBTI만으로 분석한 결과다. 관계를 완전히 닫아버리는 행동이나 감정이 쌓이다 한꺼번에 터지는 패턴처럼, 성향에 따라 관계 단절이 일어나는 심리적 작동 방식은 사주의 에너지 구조로는 설명할 수 없다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-012",
        "tier": "B",
        "name": "천을귀인 교차의 위기 복원력",
        "tags": [
          "sinsal:천을귀인",
          "uses:gunghap"
        ],
        "saju": "getSpecialSinsal(A) → 천을귀인 여부, getSpecialSinsal(B) → 천을귀인 여부, analyzeGunghap.details.starsCross.chuneul",
        "mbti": ": 없음",
        "cross": "사주만으로 분석한 결과다. 위기 상황에서 도움이 찾아오는 구조적 인연을 포착하는 것은 사주 고유의 개념이다. 우정의 회복력을 이런 방식으로 파악하는 것은 사주 특유의 접근이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-RECOV-005",
        "tier": "B",
        "name": "5신 체계 호불호와 회복 속도",
        "tags": [
          "uses:yongshin",
          "uses:osin"
        ],
        "saju": "SJ_calcOsinChegye(A용신오행), SJ_getOsinLabel(A의5신, B의일간오행)",
        "mbti": ": 없음",
        "cross": "내 사주에서 어떤 에너지가 나와 잘 맞고 어떤 에너지가 나와 맞지 않는지를 구조적으로 파악하는 사주 고유의 분석법이다. 같은 친구라도 이 구조에서 어디에 위치하느냐에 따라 회복 난이도가 구조적으로 다르다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-003",
        "tier": "B",
        "name": "식상 에너지와 화해 표현 채널",
        "tags": [
          "ss:식신",
          "ss:상관",
          "ss:식상"
        ],
        "saju": "analyzeGyeokguk(A).cnt['식상'], SJ_countIndividualSS(A)['식신']/['상관']",
        "mbti": ": 없음",
        "cross": "사주만으로 분석한 결과다. 감정을 말로 꺼내는 힘은 사주에서 '표현의 유무와 방향'을 결정하는 핵심 요소다. 화해의 가장 큰 걸림돌은 '마음이 없어서'가 아니라 '표현을 못 해서'인 경우가 많으며, 이 표현하는 힘이 얼마나 강한지가 그 걸림돌을 직접적으로 보여준다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-001",
        "tier": "B",
        "name": "일간 오행별 화해 접근 형태",
        "tags": [
          "unsung:태"
        ],
        "saju": "ST5_TGAN_DEEP[A.dm], JEOKCHEONSU[A.dm]",
        "mbti": ": 없음",
        "cross": "사주 단독. 일간 오행의 물상(나무/불/산/칼/물 등)이 화해 행동의 물리적 형태를 직접 결정한다. 10가지 원형이 각각 고유한 화해 방식을 만들어내며, 이것은 다른 체계로는 도출할 수 없는 물상 기반의 구체성이다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-002",
        "tier": "B",
        "name": "비겁 에너지와 자존심 장벽",
        "tags": [
          "ss:비겁"
        ],
        "saju": "analyzeGyeokguk(A).cnt['비겁']",
        "mbti": ": 없음",
        "cross": "사주만으로 분석한 결과다. 나를 지키는 힘은 '자신을 보호하는 에너지'이자 '양보를 못 하는 에너지'이기도 하다. 화해에서 가장 큰 장벽은 감정이 아니라 자존심인 경우가 많으며, 이것을 나를 지키는 힘이 얼마나 강한지로 가늠할 수 있다.",
        "impact": 8
      },
      {
        "id": "FRIEND-RECOV-006",
        "tier": "B",
        "name": "천간합 궁위별 회복 채널",
        "tags": [
          "relation:천간합"
        ],
        "saju": "CHEONGAN_HAP (A.dg↔B.dg, A.mg↔B.mg 등), HAP_GUNGWI_KW",
        "mbti": ": 없음",
        "cross": "사주 단독. 에너지들 사이의 자연스러운 결합은 사주 고유의 메커니즘으로, '어떤 채널로 다시 만나게 되는가'를 삶의 각 영역별로 특정한다. 다른 체계에서는 이 구체적 재회 경로를 도출할 수 없다.",
        "impact": 7
      },
      {
        "id": "FRIEND-RECOV-004",
        "tier": "B",
        "name": "용신 궁합의 복원 구심력",
        "tags": [
          "uses:yongshin",
          "uses:gunghap"
        ],
        "saju": "SJ_extractYongshinOh(ggA.yongshin), sajuB.elFull[A용신오행], SJ_extractYongshinOh(ggB.yongshin), sajuA.elFull[B용신오행]",
        "mbti": ": 없음",
        "cross": "사주 단독. 나에게 가장 잘 맞고 힘이 되는 에너지는 사주 고유 개념으로, 관계에서 '왜 이 사람과 있으면 좋은가'의 근본 답이다. 다른 체계에서는 이 구조적 끌림을 도출할 수 없다.",
        "impact": 8
      },
      {
        "id": "FRIEND-RECOV-008",
        "tier": "B",
        "name": "오행 보완의 결핍 체감",
        "tags": [
          "condition:lack"
        ],
        "saju": "sajuA.lackFull, sajuB.elFull[A부족오행], OH_EFFECT",
        "mbti": ": 없음",
        "cross": "사주 단독. 오행 보완은 사주 고유의 에너지 균형 체계에서 도출되며, '왜 이 사람 없으면 허전한가'의 근본 답을 제공한다. 부족 오행이 무엇이냐에 따라 허전함의 질감이 달라진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-007",
        "tier": "B",
        "name": "교차 삼합의 팀 구심력",
        "tags": [
          "relation:삼합"
        ],
        "saju": "GH_SAMHAP (A지지 + B지지 교차 삼합 완성 여부)",
        "mbti": ": 없음",
        "cross": "사주 단독. 세 개의 땅 에너지가 모여 하나의 에너지를 극대화하는 결합은 사주 고유 개념이다. 두 사람의 사주가 교차할 때 생기는 이 결합은 '두 사람이 함께여야만 존재하는 제3의 에너지'를 포착하며, 이것은 개인 분석으로는 나오지 않는다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-013",
        "tier": "B",
        "name": "유형별 화해 시 필요한 것 — 이 사람에게 다가갈 때 반드시 갖춰야 할 조건",
        "tags": [
          "unsung:사",
          "uses:dominant",
          "ref:MT_CONFLICT",
          "ref:MT_ANGER"
        ],
        "saju": "없음",
        "mbti": ": MT_CONFLICT_STYLES[type].needsFromOther, MT_ANGER.byFunction[주기능].resolution",
        "cross": "MBTI만으로 분석한 결과다. 성향별 분노 해소 방식과 갈등 후 필요한 것이 결합되어, '이 사람에게 다가가려면 무엇을 준비해야 하는가'가 구체적으로 특정된다. 화해 접근 방식이 '어떤 형태로 다가가는가'를 다룬다면, 이 패턴은 '무엇을 가져가야 하는가'에 초점을 맞춘다.",
        "impact": 8
      },
      {
        "id": "FRIEND-RECOV-010",
        "tier": "B",
        "name": "대운/세운 동기화와 회복 타이밍",
        "tags": [
          "uses:daewoon",
          "uses:sewoon",
          "uses:gunghap"
        ],
        "saju": "analyzeGunghap.details.dw — sync 판정, DW_SIPSUNG_KW",
        "mbti": ": 없음",
        "cross": "사주 단독. 사주 고유의 시간축 분석은 '언제 회복이 쉬운가'를 예측할 수 있게 해준다. 큰 흐름과 세부 흐름을 함께 보는 이 예측은 다른 체계에서는 불가능하다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-SAJU-013",
        "tier": "B",
        "name": "공망 궁위 채움의 극적 회복 — 비어있던 자리를 상대가 채울 때",
        "tags": [
          "uses:gongmang"
        ],
        "saju": "calcGongmang(A).affected (공망 궁위), GONGMANG_FILL_KW, sajuB의 지지가 A의 공망 지지와 일치 여부",
        "mbti": ": 없음",
        "cross": "오행 보완 분석이 '어떤 에너지가 부족한가'를 포착한다면, 이 패턴은 '삶의 어떤 영역이 비어있는가'를 포착한다. 같은 사람이라도 에너지는 충분한데 특정 삶의 영역에 빈자리가 있으면 그 영역에서만 허전함을 느낀다. 차원이 다른 결핍이다.",
        "impact": 5
      },
      {
        "id": "FRIEND-RECOV-015",
        "tier": "B",
        "name": "우정 파탄 역전 조건 — 이 조건만 피하면 돌아올 수 있다",
        "tags": [
          "ref:MT_CONFLICT",
          "ref:MT_FRIENDSHIP"
        ],
        "saju": "없음",
        "mbti": ": MT_FRIENDSHIP[type].breaking, MT_CONFLICT_STYLES[type].blindSpot",
        "cross": "MBTI만으로 분석한 결과다. 성향이 결정하는 우정 종료 조건과 그 역전 가능성은 사주의 에너지 구조로는 포착할 수 없는 행동 패턴이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-011",
        "tier": "B",
        "name": "신강/신약과 화해 주도권",
        "tags": [
          "strength:신강+",
          "strength:신약+"
        ],
        "saju": "analyzeGyeokguk(A).selfStr, analyzeGyeokguk(A).otherStr, getStrengthGrade",
        "mbti": ": 없음",
        "cross": "사주 단독. 자기 에너지의 밀도가 높은 사람과 낮은 사람은 사주 고유의 방식으로 측정된다. 같은 '먼저 다가가기'라도 이 에너지 밀도에 따라 상대에게 주는 인상과 관계 역학이 달라진다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-014",
        "tier": "B",
        "name": "인지기능별 분노 해소 조건 — 이 사람의 화가 풀리는 열쇠",
        "tags": [
          "unsung:사",
          "unsung:쇠",
          "uses:dominant",
          "ref:MT_ANGER"
        ],
        "saju": "없음",
        "mbti": ": MT_ANGER.byFunction[주기능].resolution, MT_ANGER.byFunction[주기능].duration",
        "cross": "MBTI만으로 분석한 결과다. 정보를 받아들이고 소화하는 방식이 분노 해소의 조건을 결정한다는 것은 사주에서 포착할 수 없는 심리적 특성이다.",
        "impact": 6
      },
      {
        "id": "FRIEND-RECOV-018",
        "tier": "B",
        "name": "상호작용 스타일별 재접근 전략 — 이 사람에게 다시 다가가는 효과적인 방법",
        "tags": [
          "unsung:사",
          "ref:MT_CONFLICT",
          "ref:MT_INTERACTION_STYLES"
        ],
        "saju": "없음",
        "mbti": ": MT_INTERACTION_STYLES (4유형), MT_CONFLICT_STYLES[type].needsFromOther",
        "cross": "MBTI만으로 분석한 결과다. 상호작용 스타일은 성향 조합에서 도출되는 행동 리듬 패턴으로, 사주의 음양 균형과 일부 유사한 면이 있지만 4가지 구체적인 재접근 전략은 MBTI 고유의 분류다.",
        "impact": 5
      },
      {
        "id": "FRIEND-RECOV-MBTI-014",
        "tier": "B",
        "name": "루프 탈출과 부기능 활성화가 만드는 회복의 창 — 악순환을 끊는 순간이 곧 관계 회복의 기회",
        "tags": [
          "uses:auxiliary",
          "stress:loop"
        ],
        "saju": "없음",
        "mbti": ": MT_STRESS_STAGES.stage3_loop, MT_TYPES[type].loop, MT_TYPES[type].growthPath",
        "cross": "이 내용은 MBTI 관점에서만 설명되는 부분이다. 특정 성향이 극심한 스트레스 상태에 빠졌다가 그 상태에서 벗어나는 시점이 관계 회복의 기회가 된다는 흐름은, 사주로는 직접 대응하기 어렵다. 10년 흐름의 전환이 비슷해 보일 수 있지만, 이것은 내면의 심리적 균형이 무너졌다가 회복되는 과정에서 비롯된 것이고, 10년 흐름의 전환은 외부 에너지의 변화이기 때문에 성격이 다르다.",
        "impact": 4
      }
    ]
  }
};

// ══════════════════════════════════════════════
// buildUserTags — 유저 데이터 → 태그 배열
// ══════════════════════════════════════════════

// ── 서버 환경 fallback (engine.js 전역이 없을 때) ──
var _TGAN_KR_SERVER = ['갑','을','병','정','무','기','경','신','임','계'];

var _CF_MAP_SERVER = {
  'INFP':'Fi-Ne-Si-Te','ENFP':'Ne-Fi-Te-Si','INFJ':'Ni-Fe-Ti-Se','ENFJ':'Fe-Ni-Se-Ti',
  'INTP':'Ti-Ne-Si-Fe','ENTP':'Ne-Ti-Fe-Si','INTJ':'Ni-Te-Fi-Se','ENTJ':'Te-Ni-Se-Fi',
  'ISFP':'Fi-Se-Ni-Te','ESFP':'Se-Fi-Te-Ni','ISTP':'Ti-Se-Ni-Fe','ESTP':'Se-Ti-Fe-Ni',
  'ISFJ':'Si-Fe-Ti-Ne','ESFJ':'Fe-Si-Ne-Ti','ISTJ':'Si-Te-Fi-Ne','ESTJ':'Te-Si-Ne-Fi'
};

var _sajuAnalysis;
try { _sajuAnalysis = require('./saju-analysis'); } catch(e) { _sajuAnalysis = null; }

var _sjTheoryForTags;
try { _sjTheoryForTags = require('./saju-theory-server'); } catch(e) { _sjTheoryForTags = null; }

function buildUserTags(saju, gg, dw, mbtiType, intensities) {
  var tags = [];

  // 1. 일간 (engine.js TGAN_KR 글로벌 우선, 서버 fallback)
  if (saju && saju.raw && typeof saju.raw.dg === 'number') {
    if (typeof TGAN_KR !== 'undefined') {
      tags.push('dm:' + TGAN_KR[saju.raw.dg]);
    } else {
      tags.push('dm:' + _TGAN_KR_SERVER[saju.raw.dg]);
    }
  }

  // 2. 신강도 (중화/극신강/극신약 자동 포함)
  if (gg && gg.strengthGrade) {
    var g = gg.strengthGrade;
    tags.push('strength:' + g);
    if (g === '신강' || g === '극신강') tags.push('strength:신강+');
    if (g === '신약' || g === '극신약') tags.push('strength:신약+');
    tags.push('uses:strength');
  }

  // 3. 격국 + 종격/패격 (화격은 패턴 데이터 미사용이라 push 안 함)
  if (gg && gg.gyeokgukName) {
    tags.push('gyeokguk:' + gg.gyeokgukName);
    tags.push('uses:gyeokguk');
  }
  if (gg && gg.isJonggyeok) tags.push('condition:종격');
  if (gg && gg.isPagyeok) tags.push('condition:패격');

  // 4. 십성 비중 + 과다·부족 (gg.cnt는 Korean key)
  if (gg && gg.cnt) {
    var ssNames = ['비겁','식상','재성','관성','인성'];
    for (var i = 0; i < ssNames.length; i++) {
      var c = gg.cnt[ssNames[i]];
      if (c >= 1.5) tags.push('ss:' + ssNames[i]);
      if (c >= 3.0) tags.push('condition:excess');
      if (c === 0) tags.push('condition:lack');
    }
  }

  // 5. pillar — 4기둥 빈도순 unconditional push (패턴: 시주14/일지90/월지33/년주16)
  //    + ss는 saju.jiSS 정확한 인덱스로 push (engine.js:471 P 순서 = 년월일시)
  var pillarMap = ['시주','일지','월지','년주'];
  for (var i = 0; i < pillarMap.length; i++) {
    tags.push('pillar:' + pillarMap[i]);
  }
  if (saju && saju.jiSS && saju.jiSS.length === 4) {
    for (var i = 0; i < 4; i++) {
      if (saju.jiSS[i] && saju.jiSS[i].ss) tags.push('ss:' + saju.jiSS[i].ss);
    }
  }
  // 5b. 월간 (saju.ss[1] = 월간 천간십성 — 패턴 데이터 'pillar:월간' 21회)
  if (saju && saju.ss && saju.ss[1] && saju.ss[1].ss) {
    tags.push('pillar:월간');
    tags.push('ss:' + saju.ss[1].ss);
  }

  // 6. unsung (12운성, 4기둥 중복 제거)
  if (saju && saju.uns && saju.uns.length === 4) {
    var unsSet = {};
    for (var i = 0; i < 4; i++) {
      if (saju.uns[i]) unsSet[saju.uns[i]] = true;
    }
    for (var u in unsSet) tags.push('unsung:' + u);
    tags.push('uses:unsung');
  }

  // 7. sinsal (이름 정규화: '살' 접미사 제거 — 도화/양인/역마/화개)
  if (saju && saju.specialSals && saju.specialSals.length > 0) {
    var sinsalSet = {};
    for (var i = 0; i < saju.specialSals.length; i++) {
      var sname = saju.specialSals[i].name;
      if (!sname) continue;
      sinsalSet[sname.replace(/살$/, '')] = true;
    }
    for (var s in sinsalSet) tags.push('sinsal:' + s);
  }

  // 8. relation (브라우저 calcRelations 우선, 서버 fallback)
  var _calcRel = (typeof calcRelations === 'function') ? calcRelations : (_sajuAnalysis ? _sajuAnalysis.calcRelations : null);
  if (_calcRel && saju) {
    try {
      var rel = _calcRel(saju);
      if (rel.cheonganHap && rel.cheonganHap.length > 0) tags.push('relation:천간합');
      if (rel.jijiHap && rel.jijiHap.length > 0) tags.push('relation:육합');
      if (rel.jijiSamhap && rel.jijiSamhap.length > 0) tags.push('relation:삼합');
      if (rel.jijiChung && rel.jijiChung.length > 0) tags.push('relation:충');
      if (rel.jijiHyung && rel.jijiHyung.length > 0) tags.push('relation:형');
      if (rel.jijiHae && rel.jijiHae.length > 0) tags.push('relation:해');
      if (saju.amhap && saju.amhap.length > 0) tags.push('relation:암합');
    } catch (e) {}
  }

  // 9. tongbyeon (브라우저 SJ_detectTongbyeon 우선, 서버 fallback)
  var _detectTB = (typeof SJ_detectTongbyeon === 'function') ? SJ_detectTongbyeon : (_sjTheoryForTags ? _sjTheoryForTags.SJ_detectTongbyeon : null);
  var _countSS = (typeof SJ_countIndividualSS === 'function') ? SJ_countIndividualSS : (_sjTheoryForTags ? _sjTheoryForTags.SJ_countIndividualSS : null);

  if (_detectTB && gg && saju) {
    try {
      var ssIndiv = _countSS ? _countSS(saju) : {};
      var tongbyeons = _detectTB(gg, ssIndiv);
      if (tongbyeons && tongbyeons.length > 0) {
        for (var i = 0; i < tongbyeons.length; i++) {
          if (tongbyeons[i].name) tags.push('tongbyeon:' + tongbyeons[i].name);
        }
        tags.push('uses:tongbyeon');
      }
    } catch (e) {}
  }

  // 10. 격국 패격 — 효신탈식 텍스트 매처 (engine.js:1083, 1103)
  if (gg && gg.pagyeokInfo && gg.pagyeokInfo.indexOf('효신탈식') >= 0) {
    tags.push('tongbyeon:효신탈식');
  }

  // 11. yongshin (+ 부속 osin/johu uses)
  if (gg && gg.yongshin) {
    tags.push('yongshin:' + gg.yongshin);
    if (gg.yongshinType) tags.push('yongshin_type:' + gg.yongshinType);
    tags.push('uses:yongshin');
    tags.push('uses:osin');
  }
  if (gg && gg.johuYongshin) tags.push('uses:johu');

  // 12. 교운기 (브라우저 SJ_findGyowoongi 우선, 서버 fallback)
  var _findGyo = (typeof SJ_findGyowoongi === 'function') ? SJ_findGyowoongi : (_sjTheoryForTags ? _sjTheoryForTags.SJ_findGyowoongi : null);
  if (_findGyo && dw && dw.currentAge) {
    try {
      var gyo = _findGyo(dw, dw.currentAge);
      if (gyo && gyo.indexOf('⚡지금!') >= 0) tags.push('condition:교운기');
    } catch (e) {}
  }

  // 13. MBTI 기질 + 인지기능 4개 (engine.js:808 TY 글로벌) + 4축 페어 + stress
  if (mbtiType) {
    var tmp = mbtiType.substring(1, 3);
    if (['NF','NT','SP','SJ'].indexOf(tmp) !== -1) tags.push('temperament:' + tmp);

    // 인지기능: 브라우저 TY 우선, 서버 _CF_MAP_SERVER fallback
    var cfStr = null;
    if (typeof TY !== 'undefined' && TY[mbtiType] && TY[mbtiType].cf) {
      cfStr = TY[mbtiType].cf;
    } else if (_CF_MAP_SERVER[mbtiType]) {
      cfStr = _CF_MAP_SERVER[mbtiType];
    }
    if (cfStr) {
      var stack = cfStr.split('-');
      tags.push('cf:' + stack[0]);
      tags.push('cf:' + stack[1]);
      tags.push('cf:' + stack[2]);
      tags.push('cf:' + stack[3]);
      tags.push('uses:dominant');
      tags.push('uses:auxiliary');
      tags.push('uses:tertiary');
      tags.push('uses:inferior');
    }

    // 4축 페어 unconditional (단일축 E/I는 패턴 0회 — 제거)
    tags.push('axis:EI');
    tags.push('axis:SN');
    tags.push('axis:TF');
    tags.push('axis:JP');

    // stress (강도 80%+ 시 grip + loop 동시 push)
    if (intensities) {
      var stressAxes = ['E','I','S','N','T','F','J','P'];
      for (var i = 0; i < stressAxes.length; i++) {
        if (intensities[stressAxes[i]] && intensities[stressAxes[i]] >= 80) {
          tags.push('stress:grip');
          tags.push('stress:loop');
          break;
        }
      }
    }
  }

  // 14. intensity (패턴은 'intensity:88'만 사용)
  if (intensities) {
    var intAxes = ['E','I','S','N','T','F','J','P'];
    for (var i = 0; i < intAxes.length; i++) {
      if (intensities[intAxes[i]] && intensities[intAxes[i]] >= 80) {
        tags.push('intensity:88');
        tags.push('uses:intensity');
        break;
      }
    }
  }

  // 15. 일주 컨텍스트 (uses:ilju)
  if (saju && saju.raw &&
      typeof saju.raw.dg === 'number' && typeof saju.raw.dj === 'number') {
    tags.push('uses:ilju');
  }

  // 16. 육친 컨텍스트 (4기둥 천간 ss 모두 있을 때)
  if (saju && saju.ss && saju.ss.length === 4) {
    tags.push('uses:yukchin');
  }

  // 17. 대운 마커
  if (dw) tags.push('uses:daewoon');

  if (typeof console !== 'undefined') console.log('[TAG-V2]', tags.length, tags);
  return tags;
}

// ══════════════════════════════════════════════
// matchPatterns — 태그 매칭
// ══════════════════════════════════════════════

function matchPatterns(category, subject, userTags, limit, mode) {
  limit = limit || 5;
  mode = mode || 'multiply';

  var results = [];
  var userSet = {};
  for (var i = 0; i < userTags.length; i++) userSet[userTags[i]] = true;

  function scorePatterns(patternList) {
    for (var i = 0; i < patternList.length; i++) {
      var p = patternList[i];
      var overlap = 0;
      for (var j = 0; j < p.tags.length; j++) {
        if (userSet[p.tags[j]]) overlap++;
      }
      if (overlap > 0) {
        results.push({ pattern: p, score: overlap });
      }
    }
  }

  // 1차: 해당 소주제
  if (MBTS_PATTERNS[category] && MBTS_PATTERNS[category][subject]) {
    scorePatterns(MBTS_PATTERNS[category][subject]);
  }

  // 2차: 부족하면 같은 카테고리 전체에서 보충
  if (results.length < limit && MBTS_PATTERNS[category]) {
    var subs = Object.keys(MBTS_PATTERNS[category]);
    for (var s = 0; s < subs.length; s++) {
      if (subs[s] === subject) continue;
      scorePatterns(MBTS_PATTERNS[category][subs[s]]);
    }
  }

  // 정렬
  if (mode === 'multiply') {
    results.sort(function(a, b) {
      return (b.score * b.pattern.impact) - (a.score * a.pattern.impact);
    });
  } else {
    results.sort(function(a, b) {
      return b.score - a.score || b.pattern.impact - a.pattern.impact;
    });
  }

  // 중복 제거
  var seen = {};
  var unique = [];
  for (var i = 0; i < results.length; i++) {
    if (!seen[results[i].pattern.id]) {
      seen[results[i].pattern.id] = true;
      unique.push(results[i]);
    }
  }

  return unique.slice(0, limit);
}

// ── window 등록 ──
// ── 소주제별 매칭 TOP 10 패턴을 프롬프트로 변환 ──
function buildPatternPrompt(category, userTags) {
  if (typeof MBTS_PATTERNS === 'undefined' || !MBTS_PATTERNS[category]) return '';

  // 범용 태그 필터 (점수 계산에서 제외)
  function isSpecificTag(tag) {
    return tag.indexOf('uses:') !== 0 && tag.indexOf('ref:') !== 0;
  }

  // 유저 태그 셋 (구체적 태그만)
  var userSet = {};
  if (userTags) {
    for (var i = 0; i < userTags.length; i++) {
      if (isSpecificTag(userTags[i])) userSet[userTags[i]] = true;
    }
  }

  // 제외 티어
  var excludeTiers = { 'C': true, 'TRASH': true, 'null': true };

  var sections = [];
  var subs = Object.keys(MBTS_PATTERNS[category]);

  for (var si = 0; si < subs.length; si++) {
    var sub = subs[si];
    var patterns = MBTS_PATTERNS[category][sub];
    if (!patterns || patterns.length === 0) continue;

    // C/TRASH/null 제외
    var filtered = [];
    for (var fi = 0; fi < patterns.length; fi++) {
      if (!excludeTiers[patterns[fi].tier]) filtered.push(patterns[fi]);
    }
    if (filtered.length === 0) continue;

    // 태그 매칭 점수 계산
    var scored = [];
    for (var pi = 0; pi < filtered.length; pi++) {
      var pat = filtered[pi];
      var overlap = 0;
      if (pat.tags && userTags) {
        for (var ti = 0; ti < pat.tags.length; ti++) {
          if (isSpecificTag(pat.tags[ti]) && userSet[pat.tags[ti]]) overlap++;
        }
      }
      scored.push({ pattern: pat, score: overlap * pat.impact });
    }

    // 정렬: 점수 높은 순
    scored.sort(function(a, b) { return b.score - a.score; });

    // 10개 이하면 전부, 초과면 TOP 10
    var limit = Math.min(scored.length, 10);
    var selected = scored.slice(0, limit);

    // 선택된 패턴 셔플 (순서 편향 방지)
    for (var j = selected.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var temp = selected[j];
      selected[j] = selected[k];
      selected[k] = temp;
    }

    var lines = [];
    lines.push('### [' + sub + '] (' + selected.length + '개)');
    for (var p = 0; p < selected.length; p++) {
      var pat = selected[p].pattern;
      lines.push('- ' + pat.name);
      lines.push('  사주조건: ' + pat.saju);
      lines.push('  MBTI조건: ' + pat.mbti);
      if (pat.cross) lines.push('  교차해설: ' + pat.cross);
    }
    sections.push(lines.join('\n'));
  }

  return sections.join('\n\n');
}

if (typeof window !== 'undefined') {
  window.MBTS_PATTERNS = MBTS_PATTERNS;
  window.buildUserTags = buildUserTags;
  window.matchPatterns = matchPatterns;
  window.buildPatternPrompt = buildPatternPrompt;
}
if (typeof module !== 'undefined') {
  module.exports = { MBTS_PATTERNS, buildUserTags, matchPatterns, buildPatternPrompt };
}
