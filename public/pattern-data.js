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
        "cross": "사주의 일주 그림자는 천간+지지 조합이라는 물상적 이미지에서 도출되고(갑오의 shadow='쉽게 꺼짐/인내력 부족'은 나무+불의 물상), 상대의 그림자 기능은 인지기능 스택의 반전 위치에서 도출된다. 출발점이 다른 두 체계가 같은 '어두운 면'을 가리키면 해당 그림자의 실재성이 강화된다.",
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
        "cross": "사주는 '돈의 에너지가 구조적으로 어디로 흐르는가'(재성의 방향)를 진단하고, MBTI는 '인지적으로 어디서 재정 판단이 실패하는가'(열등기능의 재정적 발현)를 진단한다. 전자는 외부적 재정 환경(동업/투자/보증)에서, 후자는 내부적 소비 행동(충동구매/과잉절약)에서 더 강하다. 둘이 같은 방향이면 '이 사람의 가장 큰 재정적 약점'에 대한 양면 진단이 된다.",
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
        "cross": "격국 패격은 '에너지 구조 수준에서 재능이 왜곡되는 경로'이고, 의사결정 사각지대는 '인지 구조 수준에서 판단이 왜곡되는 경로'다. 둘이 같은 영역의 약점을 가리키면 '이 사람의 가장 아쉬운 점'에 대한 이중 확인이 된다. 다른 영역을 가리키면 두 가지 별개의 약점이 존재한다는 독립 진단.",
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
        "cross": "사주의 신강도는 '나 vs 세상' 전체 비율이라는 거시적 치우침, 상대 축 편향은 특정 기능 쌍 내의 미시적 치우침. 둘 다 극단값일 때만 '고쳐야 할 점'으로 부상한다는 공통 트리거를 가지며, 동시에 극단이면 교정의 시급성이 단독 진단보다 높아진다.",
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
        "cross": "CROSS-FIX-005가 '갈등 맹점×형살'이라면 이것은 '우정 파괴×형살'이다. 같은 형살이라도 갈등 맥락과 우정 맥락에서 다르게 발현될 수 있다. 무은지형은 갈등에서는 '의도를 과도 해석'(인지적)으로 나타나고, 우정에서는 '설명 없이 사라짐'(행동적)으로 나타날 수 있다 — 같은 구조적 마찰이 관계 맥락에 따라 다른 증상으로 발현.",
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
        "cross": "형살은 관계의 '구조적 마찰 지점'(어떤 종류의 관계 패턴이 반복되는가)이고, blindSpot은 '인지적 왜곡 지점'(갈등 시 무엇을 못 보는가)이다. 전자가 관계의 무대를 설정하고 후자가 무대 위의 행동을 결정한다. 둘이 같은 방향이면 '왜 이 사람이 같은 관계 실패를 반복하는가'에 대한 입체적 설명이 가능하다.",
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
        "cross": "사주 과다=구조적 고정값(elFull 수치), 상대 미성숙=발달적 변동값. 교차 가치는 '같은 과잉 증상에 대해 구조적 원인(사주)과 발달적 원인(상대)을 동시에 파악하면 처방이 입체적이 된다'는 점.",
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
        "cross": "사주 단독. ILJU_KW의 shadow는 60일주 각각에 대한 고유 데이터이며, JEOKCHEONSU의 danger는 적천수(滴天髓) 원전 기반. 둘의 결합은 이 코드베이스 고유.",
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
        "cross": "사주 단독. SAJU-CHAR-003과 유사하나 여기서는 '성격 사각지대'가 아니라 '구체적으로 무엇을 고쳐야 하는가'라는 행동 처방 관점. SJ_GAEUN의 actions/anchor/food가 직접 처방을 제공.",
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
        "cross": "사주 단독. SJ_HEALTH_OH의 오행-장부 대응은 황제내경(黃帝內經)+동의보감(東醫寶鑑) 오행배속론에 기반. 코드 주석에 각 대응의 의학적 근거가 명시되어 있음.",
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
        "cross": "사주 단독. 오행 밸런스는 천간+지장간 가중치(elFull)로 계산되며, 과다 판별 기준 3.0은 saju.js의 SJ_buildHealthText에서 사용하는 실무 기준.",
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
        "cross": "MBTI 단독. 열등기능은 인지기능 이론의 핵심 성장 모델이며, 사주의 어떤 변수보다 명확하게 '무엇이 가장 약한가'를 4개 위치 중 마지막으로 특정한다.",
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
        "cross": "사주 단독. 통변 흉 공식은 십성 비중의 구조적 불균형에서 자동으로 도출되므로 별도 교차 불필요. 이 패턴 자체가 사주 명리학의 핵심 진단 도구.",
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
        "cross": "사주 단독. 대운 전환 속도 계산은 calcTransitionSpeed의 energyDistance/natalAffinity/egoStr 3변수 모델이며, DW_TRANSITION_KW의 25개 전환 조합별 키워드와 결합.",
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
        "cross": "사주 단독. 격국 성패론은 자평진전(子平眞詮) 고유 이론으로, 월지 정기 십성 + 원국 내 방해 십성의 조합으로만 진단 가능.",
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
        "cross": "사주 단독. 형살은 지지 간 특정 조합에서만 발생하는 사주 고유 관계 역학. 충(沖)이 한순간의 충격이라면 형(刑)은 장기간 반복되는 마찰 패턴.",
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
        "cross": "사주 단독. 세운/월운 vs 원국 합충은 시간축 트리거로서 사주 고유. '고쳐야 할 점이 언제 가장 위험한가'라는 예측적 경고를 제공한다는 점에서 다른 모든 FIX 패턴의 시기적 보완.",
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
        "cross": "사주 단독. 5신 체계는 용신 기반 상생상극 순환으로만 산출 가능하며, 기신·구신의 개념 자체가 명리학 고유. 결핍 오행(SAJU-FIX-004)이 '없는 것'이라면 기신은 '있지만 해로운 것'이라는 점에서 교정 방향이 다르다.",
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
        "cross": "사주 단독. 5신 판별(에너지 방향의 길흉)과 합충 발동(구조적 충격 타이밍)이 동시 작동하는 '이중 필터'는 사주 시간축 분석의 가장 정교한 수준이다. 단일 필터(기신 달만 보기 또는 충만 보기)보다 정밀한 위험 예측을 제공한다.",
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
        "cross": "사주 단독. 음양 비율은 사주 8자의 가장 기본적인 에너지 방향을 결정하며, 신강도·격국·오행 밸런스와 독립적으로 작동하는 별개의 축이다. 같은 극신강이라도 극양+극신강='불도저형 독불장군'이고 극음+극신강='고집은 강한데 표현 안 하는 속왕형'이라서 교정 방향이 완전히 다르다.",
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
        "cross": "MBTI 단독. 열등기능(MBTI-FIX-001)이 구조적 약점이라면, 의사결정 사각지대는 그것이 일상에서 매일 반복되는 행동적 표현이다. CROSS-FIX-001(통변 흉 × 루프)의 MBTI 측 근거를 일상적 의사결정 수준으로 구체화.",
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
        "cross": "MBTI 단독. 루프 개념은 학술 문헌이 아닌 MBTI 실무 커뮤니티에서 발전한 경험적 프레임워크임을 MT_METHODOLOGY.loopConcept이 명시한다. 통제된 실증 연구는 부재하나 임상적 관찰에서 반복 보고된다. CROSS-FIX-001의 교차에서 사주의 흉 공식(실증적 수치 기반)이 외부 검증 역할을 할 수 있다는 점이 흥미롭다.",
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
        "cross": "MBTI 단독. SNS darkside는 열등기능(MBTI-FIX-001)과 의사결정 사각지대(MBTI-FIX-003)가 디지털 환경에서 증폭되는 것이다. 갈등 맹점(MBTI-FIX-002)이 관계 맥락, 소비 함정(MBTI-FIX-007)이 재정 맥락이라면, 이것은 디지털 맥락이라는 점에서 동일 구조적 약점의 새로운 표현 영역.",
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
        "cross": "사주 단독. 오행 상생 단절은 '에너지 순환의 구조적 병목'을 진단하며, 개별 오행의 과다/결핍보다 '기능 간 연결'에 초점을 맞춘다. 처방: 끊어진 오행을 보충하거나, 해당 오행을 생하는 모(母) 오행을 활성화.",
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
        "cross": "MBTI 단독. 그립은 Quenk(2002) 'Was That Really Me?'에 학술적 근거가 있어 루프보다 학술적 지위가 높다(MT_REFERENCES.primary.quenk2002). 사주의 통변 흉 공식이 '평소의 반복 회로'라면, 그립은 '극한 스트레스에서의 폭발'이라는 점에서 시점과 강도가 다르다.",
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
        "cross": "MBTI 단독. 연애 갈등 패턴은 갈등 맹점(MBTI-FIX-002)의 친밀 관계 특화 버전이며, 열등기능(MBTI-FIX-001)이 가장 민감하게 자극받는 영역이 친밀 관계라는 점에서 impactScore가 높다.",
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
        "cross": "사주 단독. 대운 십성별 과제는 SJ_findGyowoongi의 교운기 탐지, DW_TRANSITION_KW의 전환 키워드와 연동되어 '이전 대운에서 현재 대운으로의 전환'까지 포함한다. '고쳐야 할 점'이 시간에 따라 변한다는 것은 명리학의 핵심 차별점이다.",
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
        "cross": "사주 단독. 공망은 일주의 순(旬)에서 빠진 두 지지라는 순수 명리 개념. GONGMANG_FILL_KW는 대운/세운에서 공망 지지가 채워질 때의 변화도 예측.",
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
        "cross": "MBTI 단독. 소비 함정은 열등기능(MBTI-FIX-001)과 의사결정 사각지대(MBTI-FIX-003)가 재정 맥락에서 구체화된 것이다. 갈등 맹점(MBTI-FIX-002)이 관계 맥락, 연애 갈등(MBTI-FIX-006)이 친밀 관계 맥락이라면, 이것은 재정 맥락이라는 점에서 동일한 구조적 약점의 다른 표현.",
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
        "cross": "사주 단독. 육친론은 성별×십성×궁위의 3차원 매핑으로 관계별 과제를 특정하며, 이것은 명리학 고유의 관계 분석 프레임워크다. SSP 40종(10십성×4기둥)이 구체적 행동 기술을 제공하므로 풀이에서 직접 활용 가능.",
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
        "cross": "사주 단독. 암합은 지장간 이론에 기반한 명리학 고유의 '무의식' 탐색 도구이며, 의식-반의식-무의식 3층위(AMHAP_LAYERS)는 심리학적 의식 층위와 구조적 유사성이 있지만 산출 방법이 완전히 다르다(간지 조합 vs 자기보고/분석).",
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
        "cross": "MBTI 단독. 갈등 맹점은 인지기능 이론에서 '열등기능이 관계 맥락에서 어떻게 발현되는가'를 구체화한 것이며, 의사결정 사각지대(MBTI-FIX-003)가 판단 맥락이라면 이것은 갈등 맥락이라는 점에서 상호 보완적이다.",
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
        "cross": "MBTI 단독. 연애 갈등(MBTI-FIX-006)이 친밀 관계의 파괴 패턴이라면, 이것은 우정 관계의 파괴 패턴이다. 같은 열등기능 약점이 관계 유형에 따라 다르게 발현되므로, '고쳐야 할 점'의 관계적 범위를 확장한다.",
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
        "cross": "사주 단독. 신강도는 자기편(비겁+인성) vs 상대편(식상+재성+관성) 비율이라는 사주 고유 계산. 극단값일 때만 '고쳐야 할 점'으로 부상.",
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
        "cross": "CROSS-FIX-007이 '만성 증상×만성 회로'와 '급성 트리거×급성 폭발'의 시간적 매핑이었다면, 이것은 '발달적 성장 테마×발달적 성장 과제'의 시간적 매핑이다. 사주는 '이 10년에 어떤 에너지 과제가 오는가'를, MBTI는 '이 나이에 어떤 인지적 과제가 오는가'를 진단하므로, 교차 시 '이 시기에 이 사람에게 가장 중요한 성장 방향'이 이중으로 특정된다. META-FIX-009의 세 계층(구조적/상황적/발달적) 중 마지막을 구현한다.",
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
        "cross": "CROSS-FIX-001이 내용적 수렴(같은 행동 증상)을 다뤘다면, 이 패턴은 시간적 수렴(같은 지속성/급성도)을 다룬다. 만성 패턴끼리, 급성 패턴끼리 매핑함으로써 '처방의 시급도'가 구체화된다: 만성 교차→평생 의식적 관리, 급성 교차→특정 시기에 집중 대비.",
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
        "cross": "사주의 흉 공식은 십성 비중 수치에서 자동 산출(객관적 입력), 상대의 루프는 인지기능 스택 이론에서 도출(이론적 구조). 서로 다른 방법론이 같은 증상을 포착하면 진단의 확신이 단독 체계보다 높아진다. 이것이 교차 진단의 본질적 가치.",
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
        "cross": "사주 단독 완결. 연애 타이밍은 세운 십성, 일지 육합, 도화살, 홍염살, 대운 십성의 5변수 중첩으로만 예측 가능하다.",
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
        "cross": "사주 단독 완결. 10년 단위의 기회 장르 분류는 명리학 고유 시간축 예측 영역이며, 대운 십성×신강도의 교차가 기회의 공격/방어 분화를 결정한다.",
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
        "cross": "사주 단독 완결. 재물 타이밍은 세운 십성, 지지 오행, 대운, 통변 구조, 5신의 5변수 중첩으로만 예측 가능하다.",
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
        "cross": "사주 단독 완결. 5신 체계는 용신이라는 개인화된 기준점에서 모든 외부 에너지를 길흉으로 분류하는 명리학 고유 시스템이다.",
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
        "cross": "사주 단독 완결. 전환 속도 예측은 오행 관계 구조, 원국 배치, 신강도라는 3가지 사주 변수의 조합으로만 가능하다.",
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
        "cross": "사주 단독 완결. 12운성은 에너지의 강약이 아닌 생명주기적 위치(시작-성장-정점-하강-재생)를 보여주는 별도 차원이다.",
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
        "cross": "사주 단독 완결. 월운 단위 5신 분화는 명리학의 미시적 시간축 예측이다.",
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
        "cross": "사주 단독 완결. 목적별 최적 월은 십성, 5신, 합충, 신살의 다변수 가중치 합산으로만 결정 가능하다.",
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
        "cross": "사주 단독 완결. 삼합 트리거는 원국 지지 배치와 세운 지지의 교차에서만 감지 가능한 명리학 고유 예측이다.",
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
        "cross": "사주 단독 완결. 대운 합충 발동은 10년 단위 변동 영역을 궁위 수준으로 특정하는 명리학 고유 예측이다.",
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
        "cross": "사주 단독 완결. 세운 십성은 올해의 사회적 역할 에너지를 10종으로 분류하는 명리학 고유 체계다.",
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
        "cross": "사주 단독 완결. 공망 해소는 60갑자 순(旬) 구조와 궁위론의 교차에서만 도출되는 명리학 고유 개념이다.",
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
        "cross": "사주 단독 완결. 80년 통합 시간축은 명리학만이 제공하는 인생 전체의 에너지 지도다.",
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
        "cross": "사주 단독 완결. 대운(10년)과 세운(1년)의 이중 필터는 '큰 그림 속 올해의 위치'를 특정하는 명리학 고유 시간축 구조다.",
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
        "cross": "사주 단독 완결. 대운 전환은 명리학에서만 예측 가능한 10년 단위 인생 모드 전환이다.",
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
        "cross": "사주 단독 완결. 세운 지지가 원국 특정 궁위에 걸리는 합충형해는 명리학만의 연간 변동 영역 특정 체계다.",
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
        "cross": "P-CHAR-025/032가 '분노의 양식과 방향'을 교차했다면, P-CHAR-037은 '분노를 실행할 힘의 강도'를 교차한다. 사주의 신강도(에너지 총량)와 상대 체계의 F/T 강도(인지 편향 강도)는 측정 대상이 다르다: 신강도는 '밀어붙일 수 있는 에너지 총량', F/T 강도는 '감정/논리에 대한 인지적 편향 정도'. 따라서 교차의 고유 가치는 '에너지가 넘치는데(극신강) 감정에 절대적(F 88)이면 폭주'라는 단순 합산이 아니라, '에너지가 부족한데(신약) 감정에 절대적(F 88)이면 겉은 수용적인데 속은 용광로'라는 괴리의 발견에 있다. 이 괴리는 어느 한 체계만으로는 포착하기 어렵다.",
        "impact": 3
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
        "cross": "사주 단독으로 십성 비중 순위가 판단 우선순위를 보여주고, MBTI 단독으로 인지기능 스택이 의사결정 서열을 보여준다. 교차의 가치는 세 가지: ①같은 방향이면 구조적 확신 증폭, ②다른 방향이면 '에너지 구조(타고난 것) vs 인지 선호(자기보고)의 괴리' 발견, ③blind spot 일치 시 해당 영역의 에너지 소모까지 이중 확인. 특히 ③은 MBTI 단독의 '열등기능 에너지 소모'(MT_STACK_POSITIONS.inferior.energyCost)와 사주 단독의 '해당 십성 부재 시 체감 키워드'가 각각 다른 언어로 같은 취약점을 포착하는 삼각 검증이다.",
        "impact": 3
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
        "cross": "상생 체인 단절은 '에너지 유형'의 빈 자리를 보여주고(예: 화 부족=추진력 결핍), 3차 기능 미발달은 '인지적 처리 단계'의 빈 자리를 보여준다(예: INFP의 Si 미발달=과거 경험 활용 부족). 교차하면 '이 사람에게 화 에너지(추진력)가 부족하고(상생 단절), 동시에 감각적 경험 활용(Si)도 미발달인 이유는, 두 체계가 같은 구조적 빈 자리를 다른 언어로 지목하고 있기 때문일 수 있다'는 이중 진단이 가능해진다. 단독 체계에서는 '화 부족'(추상적) 또는 'Si 미발달'(인지적)이라고만 말하지만, 교차하면 처방도 이중으로 구체화된다: 화 에너지 보충(SJ_GAEUN['화'].actions='러닝, 댄스, 핫요가, 감정일기')과 Si 의식적 활성화(구체적 감각 경험 기록)를 동시에 처방할 수 있다.",
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
        "cross": "사주 단독으로 용신/기신 체계가 에너지 효율 최적 활동을 보여주고, 상대 체계 단독으로 인지기능 스택 기반 회복 처방을 보여준다. 교차의 가치는 두 가지: ①같은 방향이면 회복 처방의 확신 증폭, ②반대 방향이면 '에너지 구조(사주)의 필요와 인지 선호(상대 체계)의 편안함이 다른' 지점 발견 → 통합적 처방 도출. 특히 기신 활동과 상대 체계의 warning(과잉 시 위험) 교차가 가치 있다: 사주에서 기신이 토(과도한 루틴=소진)인 사람이 상대 체계에서도 'Si 루프 위험'(과거 반추)이면, '안정 추구가 오히려 함정'이라는 이중 경고.",
        "impact": 3
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
        "cross": "사주 단독으로 비겁/식상 배치가 우정의 에너지 구조를 보여주고, 상대 체계 단독으로 인지기능 스택이 우정 스타일을 보여준다. 교차의 가치는 두 가지: ①같은 방향이면 우정 패턴의 확신 증폭, ②다른 방향이면 '에너지 구조(사주)가 원하는 우정과 인지적으로 편안한 우정(상대 체계)이 다른' 지점 발견. 특히 breaking(관계 파괴) 패턴 교차가 가치 있다: 사주에서 겁재가 강하면 '재물/영역 침범 시 관계 절단'이고, 상대 체계 INFP의 breaking은 '가치관이 배반당했다고 느끼면 조용히 떠남'. 두 체계의 breaking 트리거가 다르면, 이 사람은 상황에 따라 다른 방식으로 관계를 끊는다는 복합적 분석이 가능.",
        "impact": 3
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
        "cross": "사주 단독으로 5신 체계가 오행별 에너지 효율을 완결적으로 보여준다. 상대 체계 단독으로 인지기능 스택 위치가 에너지 소모를 보여준다. 교차의 가치: 두 체계의 '에너지 소진 영역'이 같은 활동 영역을 가리키면 해당 영역의 회피/조절이 구조적으로 필요하다는 이중 확인. 특히 처방 교차가 핵심: 사주의 구체적 활동 처방(SJ_GAEUN)과 상대 체계의 인지적 처방(MT_SELFCARE)을 통합하면 '무엇을(사주) 어떤 방식으로(상대 체계) 해야 하는가'라는 통합적 처방이 가능해진다.",
        "impact": 3
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
        "cross": "P-CHAR-025가 '분노 양식의 방향'을 교차했다면, P-CHAR-032는 '분노의 강도'를 교차한다. F/T 축 강도가 55인지 88인지에 따라 같은 일간 분노 양식 + 같은 인지기능 갈등 스타일이라도 실제 발현이 완전히 다르다. F 88 + 상관 부재 = 극심한 내적 갈등은 MBTI 단독(F 88 burn)이나 사주 단독(상관 부재 속앓이)으로도 나오지만, 교차의 고유 가치는 '감정적 절대성(MBTI F 88)과 표현 에너지 부재(사주 상관 없음)의 결합이 만드는 극심한 내적 압력'이라는 구체적 메커니즘의 특정이다.",
        "impact": 3
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
        "cross": "P-CHAR-035가 연애 패턴의 정적 교차(배우자궁 에너지 × 연애 스타일)를 다뤘다면, P-CHAR-044는 연애의 시간적 진행에 따른 교차 방향의 변화를 다룬다. earlyDating에서는 시너지였던 교차가 deepRelation에서는 괴리로 전환될 수 있다. 이것은 사주 단독(배우자궁 에너지는 고정적)이나 MBTI 단독(earlyDating/deepRelation 구분은 있지만 에너지 변동은 없음)으로는 포착하기 어려운 동적 분기다. 특히 growthInLove와 일지 십성의 교차는 '관계 성장의 방향'에 대한 구체적 처방을 이중으로 제공한다.",
        "impact": 3
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
        "cross": "상대 체계는 갈등/조화의 '구조적 위치'(어떤 궁위 간 합/충인지)를 보고, 인지기능은 갈등의 '심리적 메커니즘'(루프의 악순환 구조, 그립의 폭발 경로)을 설명한다. 교차하면 '어디서 갈등이 생기는가'(궁위)와 '어떤 패턴으로 갈등이 진행되는가'(정상→경미→루프→그립→회복의 5단계)를 동시에 설명할 수 있다. 특히 MT_STRESS_STAGES.stage5_recovery의 '그립 경험 이후 열등기능에 대한 이해가 깊어짐, 성장의 기회'는 상대의 '충이 반드시 나쁜 것이 아니라 필요한 변화를 촉발'과 같은 성장 지향적 관점을 공유한다.",
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
        "cross": "인지 성숙도는 '의식적 노력과 경험에 의해 같은 기능의 질이 변하는 것'이고, 에너지 성숙도는 '에너지 크기(신강도)와 대운 경험 누적에 의해 같은 격국의 발휘가 변하는 것'이다. 이 둘은 같은 현상의 다른 축이다. 예를 들어 Fi immature인 INFP가 극신강 식상격이면, '표현 욕구는 폭발하는데 자기감정을 절대진리로 여기므로 타인의 비판을 수용하지 못하는 창작자 — 재능은 있지만 피드백 수용 불가'가 된다. 같은 INFP가 Fi mature이고 중화 식상격이면, '표현이 적절하고 타인의 다른 가치도 존중하는 협력적 창작자'가 된다. 단독 체계에서는 '미성숙 Fi'(인지기능) 또는 '극신강 식상격'(명리)이라고만 말하지만, 교차하면 '이 사람의 미성숙이 에너지적으로 어떤 형태를 취하는가'까지 구체화된다.",
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
        "cross": "상대 체계는 '어디서 갈등이 생기는가'(궁위별 충의 의미)를, 인지기능은 '어떻게 갈등을 처리하는가'(유형별 분노 표현, 갈등 스타일)를 설명한다. 교차하면 갈등의 '구조적 원인'과 '심리적 발현'을 동시에 볼 수 있다. 예를 들어 월지-일지 충(사회적 역할과 내면의 충돌)이 있는 INFP라면, MT_CONFLICT_STYLES.INFP.trigger인 '가치가 무시될 때'가 직장 영역에서 구조적으로 반복된다는 예측이 가능해진다.",
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
        "cross": "명리학은 겉-속 괴리의 '구조적 크기'를 측정할 수 있고(일간-일지 관계, 충의 개수), 인지기능 이론은 그 괴리가 '자기인식에 미치는 구체적 영향'을 설명할 수 있다(오인 패턴, opposing 기능의 방어적 발현). 교차하면 '이 사람은 구조적으로 겉-속 괴리가 크기 때문에(명리), 자기 유형을 이렇게 오인할 가능성이 높다(인지기능)'라는 예측이 가능해진다. 단독으로는 '겉과 속이 다르다'(명리) 또는 '유형을 잘못 인식할 수 있다'(인지기능)라고만 말하지만, 교차하면 '왜 이 사람이 특히 자기를 잘못 이해하는가'에 대한 구조적 설명이 된다.",
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
        "cross": "인지기능의 자기돌봄은 '인지적 방식'(글쓰기, 새로운 경험, 지적 탐구 등)으로 회복을 설명하고, 조후/용신은 '에너지 유형'(수 에너지 필요, 화 에너지 과잉 등)으로 필요를 설명한다. 교차하면 '이 사람에게는 수 에너지(냉각/유연성)가 필요한데(조후), 그것을 인지적으로는 Ne 활성화(새로운 가능성 탐색)로 실현할 수 있다(자기돌봄)'라는 구체적 처방이 가능해진다. 단독으로는 '수 에너지가 필요하다'(추상적)이거나 'Ne를 활용하라'(일반적)이지만, 교차하면 '왜 Ne가 이 사람에게 특히 필요한가'에 대한 이중 근거가 생긴다.",
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
        "cross": "사주 단독으로 일간 오행+상관+충 조합이 갈등 반응의 에너지 구조를 보여주고, 상대 체계 단독으로 인지기능 기반 갈등 스타일을 보여준다. 교차의 가치는 세 가지: ①같은 방향이면 갈등 반응 패턴의 이중 확인, ②다른 방향이면 '타고난 에너지 구조(사주) vs 학습된 인지 선호(상대 체계)의 갈등 반응 괴리' 발견, ③특히 상관 유무와 상대 체계의 분노 duration 교차가 가치 있다 — 사주에서 상관이 없어 표현을 못 하는 사람이 상대 체계에서도 분노 duration이 '매우 길다'이면, 감정 축적이 구조적임을 이중 확인.",
        "impact": 3
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
        "cross": "사주 단독으로 재성 배치가 물질적 감각의 에너지 구조를 보여주고, MBTI 단독으로 인지기능 스택이 소비 심리를 보여준다. 교차의 가치는 두 가지: ①같은 방향이면 소비 패턴의 이중 확인, ②다른 방향이면 '타고난 물질 감각(사주)과 인지적 소비 방식(MBTI)의 괴리' 발견. 특히 trap 교차가 가치 있다: 사주에서 편재가 강하면(SIPSUNG_GUNGWI_KW.편재: '큰돈을움직이는감각, 투기적성향')이고 MBTI에서 ENFP(trap: '새로운 것에 대한 무한 투자 → 미완성 프로젝트 = 돈 낭비')라면, '큰 판에 즉흥적으로 투자하는' 위험이 이중 확인된다.",
        "impact": 3
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
        "cross": "사주 단독으로 배우자궁 4변수가 연애 에너지 구조를 완결적으로 보여준다. 상대 체계 단독으로 인지기능 스택이 연애 인지 스타일을 보여준다. 교차의 고유 가치는 세 가지: ①두 체계가 같은 방향이면 연애 패턴 이중 확인, ②다른 방향이면 '에너지적 끌림(사주)과 인지적 선호(상대)의 괴리' 발견 — 특히 일지 편재+도화(다양한 인연 에너지)+INFP(깊은 한 사람)의 괴리는 구조적 연애 갈등의 근원, ③dealbreaker의 시간적 트리거(세운 일지 충)가 사주에서만 가능한 '언제'를 추가하여 상대 체계의 '무엇'과 결합.",
        "impact": 3
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
        "cross": "상대 체계는 '무엇이 없는가'(5종 에너지 중 결핍)를 구체적으로 지목하고, 인지기능은 '없는 것이 어떻게 작동하는가'(그립, 그림자 발현 메커니즘)를 설명한다. 교차하면 결핍의 '내용'과 '역동'을 동시에 잡을 수 있다. 특히 MT_STRESS_STAGES.stage4_grip의 예시들은 결핍 기능이 스트레스 하에서 어떤 구체적 행동으로 나타나는지를 유형별로 명시하여, 상대의 오행 결핍 키워드보다 행동 예측이 정밀하다.",
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
        "cross": "인지기능의 상호작용 스타일은 '이 사람이 집단에서 자연스럽게 맡는 역할'을 4종으로 분류하고, 상대의 격국은 '이 사람의 에너지가 향하는 사회적 방향'을 분류한다. 교차하면 '에너지 방향'과 '역할 방식'이 일치하는지 충돌하는지를 볼 수 있다. 예: 상대 체계에서 관성격(규율/체계 방향)인 사람이 MT_INTERACTION_STYLES['get-things-going'](분위기 메이커)이면, 에너지 방향은 규율인데 사회적 역할은 열정적 참여 유도 — '규율을 열정적으로 전파하는 사람'이거나 '규율 vs 자유 사이에서 갈등하는 사람'이 된다. 단독 체계에서는 '규율 지향' 또는 '분위기 메이커' 중 하나만 보이지만, 교차하면 이 두 면이 어떻게 공존하는지가 드러난다.",
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
        "cross": "인지기능의 발달 단계는 보편적(모든 유형이 같은 순서)이고, 상대의 대운은 개인적(각 사주마다 다른 10년 주기)이다. 교차하면 '보편적 발달 과제'와 '개인적 에너지 변화'가 합쳐져서, '왜 이 사람은 35세에 위기가 왔는데 저 사람은 28세에 왔는가'를 설명할 수 있다. 인지기능만으로는 '30대에 3차기능이 올라온다'는 보편 법칙밖에 말할 수 없지만, 개인의 대운 주기와 교차하면 '이 사람의 30대 초반은 3차기능 자각+특정 에너지 모드 전환이 겹쳐서 특히 격변기'라는 정밀한 예측이 가능해진다.",
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
        "cross": "상대 체계는 격국(방향)×신강도(강도)의 2차원이고, 인지기능은 유형(방향)×선호강도(강도)×성숙도(MT_MATURITY의 immature/developing/mature)의 3차원이다. 교차하면 방향+강도+성숙도의 다차원 분화가 가능해진다. 특히 MT_MATURITY.Fi.immature는 '자기감정=절대진리, 비판을 공격으로 받아들임'이고 mature는 '확고한 내면 가치 + 타인의 다른 가치도 존중'인데, 같은 강도라도 성숙도에 따라 건강한 표현과 병리적 표현이 갈린다. 이 '성숙도' 축은 단독 체계에서는 잡기 어려운 교차의 고유가치다.",
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
        "cross": "P-CHAR-037이 '에너지 총량(신강도) × 인지 편향 강도(F/T)'를 교차했다면, P-CHAR-040은 '같은 F 강도 내에서 Fi vs Fe의 질적 차이'를 추가로 세분화한다. MBTI 단독으로 Fi/Fe 구분은 이미 존재하고(MT_ANGER.byFunction), 사주 단독으로 신강도 분기도 존재한다. 교차의 고유 가치는 'Fi-F88+신약'과 'Fe-F88+신약'이 만드는 완전히 다른 갈등 양상의 특정이다. Fi+신약은 '축적형 도어 슬램'이고 Fe+신약은 '자기 소진형 수용'이다. 이 두 양상은 에너지 총량(신약)이라는 동일 조건에서도 인지기능의 질적 차이(Fi vs Fe)에 의해 분기된다.",
        "impact": 3
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
        "cross": "사주 단독으로 정재/편재 비중+통변 공식이 재물 에너지 구조를 보여주고, 상대 체계 단독으로 인지기능 기반 소비 심리를 보여준다. 교차의 고유 가치: 특히 trap 교차가 핵심이다. 사주에서 비겁탈재(돈이 새는 구조적 패턴)가 있고 상대 체계에서도 trap이 '공유/나눔 과다'형이면, '구조적 재물 손실 경향+인지적 나눔 과다'가 이중으로 확인되어 재무적 경고의 확신도가 높아진다. 이것은 어느 한 체계만으로는 볼 수 없는 교차 고유의 가치다.",
        "impact": 3
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
        "cross": "사주 단독으로 합충형해의 궁위별 의미를 완결적으로 분석할 수 있다. MBTI 단독으로 인지기능 간 tension/complement/resonance를 분석할 수 있다. 교차의 가치는 '이 사람 안에 에너지 충돌이 있느냐 없느냐'를 두 체계가 독립적으로 확인하는 것에 있다. 단, 궁위 세분화는 사주 고유 메커니즘이므로 교차 범위를 제한한다.",
        "impact": 3
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
        "cross": "사주 단독으로 격국을 통해 사회적 역할을 예측할 수 있고, MBTI 단독으로 기질+상호작용 스타일로 예측할 수 있다. 교차의 가치는 두 예측이 일치하면 확신도 증폭, 불일치하면 '잠재력 vs 현재 행동' 사이의 격차를 발견하는 데 있다. MBTI에서 in-charge의 stress는 '통제권을 잃거나 비효율이 방치될 때'(MT_INTERACTION_STYLES['in-charge'].stress)이고, behind-the-scenes의 stress는 '의견을 묻지 않고 일방적으로 결정될 때'이므로, 격국과의 교차로 스트레스 취약점도 이중 진단할 수 있다.",
        "impact": 3
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
        "cross": "사주 단독으로도 겉-속 괴리를 진단할 수 있고(일간-일지 상극), MBTI 단독으로도 가능하다(축 불균형/그립 빈도). 교차의 가치는 두 체계의 예측이 일치할 때 확신도 증폭, 불일치할 때 더 깊은 개인차 탐구 필요성 발견에 있다. 특히 MBTI에서 축 불균형을 MT_STRESS_STAGES.stage4_grip의 예시로 구체화할 수 있고, 사주에서는 일간-일지의 특정 상극 패턴으로 구체화할 수 있어서, 두 체계가 각각 다른 언어로 같은 현상의 다른 층위를 포착한다.",
        "impact": 3
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
        "cross": "신살은 오행/십성 체계와 별도의 독립 변수로 작동하여 성격에 '예측 불가능한 특수성'을 부여한다. 같은 격국, 같은 신강도라도 도화살 유무에 따라 대인관계 양상이 완전히 달라진다. 이 '특수 각인' 개념은 유형론으로 포착할 수 없는 개인차를 설명한다.",
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
        "cross": "단일 유형론으로는 포착 불가능한 '겉-속 괴리'를 구조적으로 설명. 일간(의식)과 일지(무의식)의 오행이 상극이면 내면 갈등이 만성화되고, 상생이면 자연스러운 흐름이 된다. 60일주별로 이 조합이 모두 다르다.",
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
        "cross": "그림자 기능은 일상에서는 잘 드러나지 않지만, 위기 상황에서 성격의 파괴적 면을 결정한다. 상대의 '합충형해가 만드는 구조적 긴장'이 이 그림자 기능의 발동 조건과 교차될 수 있다. 특히 MT_SHADOW_BY_TYPE의 demon 기능은 상대의 '극한 충'과 같은 수준의 파괴적 에너지를 설명한다.",
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
        "cross": "조후는 성격의 '무드/톤'을 결정하는 배경 변수. 같은 일주, 같은 격국이라도 태어난 달에 따라 에너지의 '온도'가 다르다. 이것은 다른 성격 분석 체계에 없는 고유 변수이며, '왜 같은 일주인데 느낌이 다른가'를 설명하는 핵심 열쇠.",
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
        "cross": "(상대 체계와의 교차는 추후. 단독으로도 성격의 '자기 인식 수준'을 설명하는 고유 변수.)",
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
        "cross": "합충형해는 성격의 '역동성'을 설명한다. 합만 있는 사주는 안정적이지만 변화 동력이 약하고, 충이 있는 사주는 불안정하지만 성장 동력이 강하다. ST5_RELATIONS_PHILOSOPHY에 따르면 '충이 반드시 나쁜 것이 아니라 필요한 변화를 촉발하는 계기'. 이 관점은 성격의 갈등을 병리가 아닌 성장 에너지로 재해석한다.",
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
        "cross": "오인 패턴은 인지기능 분석에서 '이 사람의 진짜 유형을 정확히 잡는 것'의 어려움을 보여준다. 상대 체계의 일간-일지 이중구조가 '겉과 속이 다른 이유'를 에너지 구조로 설명한다면, 오인 패턴은 '겉과 속이 다른 사람이 자기 자신을 어떻게 오해하는가'를 인지 구조로 설명한다. 교차하면 '왜 이 사람이 자기 유형을 잘못 인식하는가'에 대한 이중 설명이 가능해진다 — 상대 체계에서 일간-일지 괴리가 크면 인지기능 자기 평가도 오류가 클 것이라는 예측이 가능하다.",
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
        "cross": "인지기능만으로는 '어떤 순서로 판단하는가'를 알 수 있지만 '무엇을 향해 판단하는가'는 유형 기술에 의존한다. 상대의 격국은 '사회적 역할 방향'이라는 구체적 목적지를 제공한다. 교차하면 의사결정의 '과정(process)'과 '목적(direction)'이 결합된다. MT_DECISION_PROCESS.INFP.blind인 '효율 분석 마지못해'가 상대의 '식상격+신약=아이디어는 많은데 실행이 약함'과 만나면, 의사결정 맹점의 이중 확인이 된다.",
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
        "cross": "MBTI 단독 패턴이지만, 상대 체계의 P-CHAR-004(신살 성격 특이점)와 잠재적 교차가 있다. 신살이 '보통 사람에게 없는 특이점'을 만든다고 했는데, 그림자 기능도 '평소에는 보이지 않지만 특정 상황에서 발현되는 특이 행동'을 설명한다. 다만 메커니즘이 다르다: 신살은 지지 간 수학적 관계에서 도출되고, 그림자 기능은 인지기능 스택의 의식-무의식 위계에서 도출된다.",
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
        "cross": "성격이 시간에 따라 변한다는 것은 명리학만의 고유 설명력. ST5_PRINCIPLES.p5_timeAxis에 따르면 '같은 사람도 20대와 40대의 에너지 구조가 다르다'. 이 시간축 변화는 정적 유형론과 근본적으로 다른 동적 성격 모델을 제공한다.",
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
        "cross": "이 패턴은 인지기능 분석의 기본 골격이다. 상대 체계의 일간(핵심 자아)이 인지기능의 주기능과 대응하고, 격국(사회적 역할)이 부기능 또는 유형 전체와 대응한다. 단독으로도 의미가 크지만, 상대 체계와 교차하면 '에너지의 종류'(상대)와 '인지의 구조'(MBTI)가 결합된 다차원 성격 모델이 된다.",
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
        "cross": "격국은 '방향'을 정하고 신강도는 '속도/강도'를 정한다. 이 두 변수의 교차가 실제 행동 양태를 결정한다. 격국만으로는 '무엇을 하고 싶은가'만 알 수 있고, 신강도를 교차해야 '실제로 하는가/못 하는가'를 예측할 수 있다.",
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
        "cross": "사주 단독으로 격국이 사회적 역할 경향을 보여주고, MBTI 단독으로 인지기능 스택이 직업 적성을 보여준다. 교차의 고유 가치는 두 가지: ①같은 방향이면 커리어 방향의 이중 확인, ②다른 방향이면 '사회적 역할 에너지(사주)와 인지적 강점(MBTI)의 괴리' 발견. 특히 stressJob 교차가 고유하다: 사주의 기신 활동과 MBTI의 stressJob이 같은 직업 환경을 가리키면, 그 환경에서의 소진이 이중으로 확인되어 '절대 피해야 할 직업 유형'이 특정된다. 이것은 P-CHAR-029(5신 에너지 효율 지도)의 직업 영역 적용이다.",
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
        "cross": "MBTI 단독으로 인지기능 스택 기반 연애 패턴이 완결적으로 설명된다. 상대 체계에서 배우자 궁 분석이 교차 가능하다면, '사주의 배우자 궁 에너지 구조 + MBTI의 인지적 연애 스타일'이 교차되어 '이 사람이 연애에서 어떤 에너지를 원하고(사주) 어떤 인지 양식으로 연애하는가(MBTI)'를 이중으로 분석할 수 있다. 특히 dealbreaker 교차가 가치 있다: 사주에서 일간-일지가 상극(배우자와의 구조적 긴장)이고 MBTI에서도 dealbreaker가 관계 단절형(예: INFJ의 '피상적 관계')이면, 친밀 관계에서의 취약점이 이중 확인된다.",
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
        "cross": "사주 단독으로 격국-십성 비중 괴리가 사회적 역할 vs 내적 에너지의 불일치를 보여준다. 이것은 상대 체계의 P-CHAR-008(격국 × 기질/상호작용 스타일 교차)에 사주 측 정밀도를 추가한다. 교차의 가치: 사주에서 격국-비중 괴리가 있는 사람이 상대 체계에서도 표면적 상호작용 스타일과 내적 동기가 불일치하면, '이 사람의 사회적 페르소나는 구조적으로 본성과 다르다'는 삼중 확인(사주 격국 + 사주 비중 + 상대 체계 스타일).",
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
        "cross": "MBTI 단독의 세분화 도구이다. 상대의 12운성이 12단계 질감을 제공한다면, MBTI의 성숙도(3단계) × 스트레스(5단계) = 15개 조합이 대응한다. 교차의 가치는 상대의 12운성이 예측하는 무의식 질감과 MBTI의 성숙도-스트레스 조합이 예측하는 인지기능 질감이 같은 방향인지 확인하는 데 있다.",
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
        "cross": "음양 비율은 천간과 지지의 홀짝(양간=갑병무경임, 음간=을정기신계)에서 도출되는 사주 고유 변수다. 상대 체계의 E/I 축과 형식적으로 유사하지만, 음양은 8자 전체의 에너지 방향이고 E/I는 인지적 에너지의 방향이므로 측정 차원이 다르다. 다만 극양인데 상대 체계에서 I 88이면 '에너지 구조는 외향적인데 인지 선호는 극내향'이라는 흥미로운 괴리가 발견될 수 있다.",
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
        "mbti": ": (대응 MBTI 변수 아직 미제시)",
        "cross": "신살은 지지(12지지) 간의 수학적 관계에서 도출되는 사주 고유 개념. 특히 궁위별 차이(같은 신살이 어느 기둥에 있느냐에 따라 의미 다름)는 사주에만 있는 세분화. 상대측 체계에서 '특이한 성격 변수(outlier traits)' 관련 개념이 있다면 교차 가능.",
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
        "mbti": ": (대응 MBTI 변수 아직 미제시)",
        "cross": "통변 공식은 십성 간의 수치적 관계에서 자동 감지되는 사주 고유 메커니즘. 특히 상반된 공식의 공존(예: 길+흉 동시)은 사주에서만 나오는 구조적 모순 감지. 상대측 체계에서 '내적 모순/양가감정' 관련 변수가 있다면 교차 가능.",
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
        "mbti": ": (대응 MBTI 변수 아직 미제시)",
        "cross": "격국은 월지라는 특정 기둥에서 결정되며, 파격 조건은 사주 내 십성 배치에 의해 결정됨. 이것은 사주 고유 구조. 상대측 체계의 '사회적 역할' 관련 변수와 교차 시 의미 있을 수 있음.",
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
        "mbti": ": (대응 MBTI 변수 아직 미제시)",
        "cross": "사주 단독으로 60가지 원형을 구별할 수 있음. 일간+일지의 오행 상생/상극/비화 관계가 겉-속 일치도를 결정하는 것은 사주 고유 메커니즘. 상대측 체계에서 유사한 겉-속 프레임이 있다면 교차점 논의 가능.",
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
        "cross": "MBTI 단독 패턴이다. 4축 강도 프로필은 MBTI 측정 도구(Step I 연속 점수)에서 나오는 고유 데이터이다. 상대가 언급한 신강도 5등급과 형식적으로 유사하지만(둘 다 스펙트럼 내 강도를 구분), 측정하는 차원이 완전히 다르다. 신강도는 '자아 에너지 vs 환경 에너지'의 총량 비교이고, MBTI 강도는 '4개 인지 선호 축 각각의 편향 정도'이다.",
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
        "cross": "결핍 오행은 '없는 것'이기 때문에 본인이 자각하지 못하는 맹점. 다른 성격 분석에서 '약점'으로 나타나는 것의 구조적 원인을 오행 밸런스로 설명할 수 있다. 또한 findBrokenChain 함수가 보여주듯, 결핍 오행은 상생 순환의 단절점이 되어 에너지 흐름 전체에 영향을 준다.",
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
        "cross": "기질은 인지기능보다 상위의 추상 레벨에서 '이 사람이 근본적으로 무엇을 원하는가'를 잡아낸다. 상대의 격국이 '사회적 역할 방향'이라면, 기질은 '존재론적 욕구 방향'이다. 교차하면 '사회적 역할'과 '존재론적 욕구'가 일치하는지/충돌하는지를 볼 수 있어 성격의 근본적 만족/불만족을 예측할 수 있다.",
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
        "cross": "(단독 패턴. 인지기능 이론의 고유 강점. 상대 체계에 '같은 에너지의 질적 성숙도'를 직접 측정하는 변수가 없다. 신강도는 에너지 크기이지 성숙도가 아니다.)",
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
        "cross": "MBTI 단독 패턴이다. 인지기능 스택 기반 에너지 회복 처방은 MBTI 고유의 설명 체계이며, 각 스트레스 단계에 맞춤화된 intervention이 제공된다.",
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
        "cross": "MBTI 단독 패턴이다. 우정 역학은 인지기능 스택에서 직접 도출되는 관계 패턴이며, 상대 체계에서 관계를 분석하는 변수가 있다면 교차 가능성이 열린다.",
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
        "mbti": ": (대응 MBTI 변수 아직 미제시)",
        "cross": "조후론은 '태어난 시점의 천문학적 조건이 기질에 영향을 미친다'는 사주 고유 이론. 월지 계절에 의한 120개 세분화는 사주에만 있는 구조. 상대측 체계에서 '기질의 온도/에너지 수준' 관련 변수가 있다면 교차 가능.",
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
        "cross": "명리학의 통변 공식은 에너지 간 '관계 법칙'이고, 인지기능의 스택 흐름은 '처리 순서 법칙'이다. 교차하면 '어떤 에너지가 어디로 흐르는가(통변)'와 '어떤 순서로 처리하는가(인지 흐름)'가 결합된다. 특히 통변 공식 중 길(吉)한 것(식상생재, 살인상생)과 흉(凶)한 것(비겁탈재, 관살혼잡)의 구분은, 인지기능에서 건강한 기능 사용(주기능-부기능 교대)과 불건강한 사용(루프/그립)의 구분과 구조적으로 같다. 단독 체계로는 '왜 이 사람은 재능을 돈으로 잘 바꾸는가'(식상생재)를 설명할 수 있지만, 교차하면 '어떤 인지적 과정으로 재능이 현실적 성과로 전환되는가'까지 설명할 수 있다.",
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
        "cross": "이것은 MBTI 단독 패턴이다. 인지기능 스택의 순서에 의한 의사결정 서열은 MBTI 고유 메커니즘이며, 상대 체계의 어떤 변수와도 직접 교차하지 않는다. 상대 체계에서 '판단 우선순위'를 결정하는 변수가 있다면 교차를 시도할 수 있으나, 현재로서는 단독 패턴으로 제시한다.",
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
        "cross": "이것은 MBTI 단독 패턴이다. 인지기능 성숙도 레벨과 연령별 발달 단계는 MBTI 고유의 설명 체계이다. 상대 체계에서 '대운/세운에 의한 시간적 변화'가 있다고 언급했으므로, 향후 교차 가능성이 있으나 현재 턴에서는 단독 패턴으로 제시한다.",
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
        "cross": "사주 단독으로 식상/관성 배치가 표현 에너지와 사회적 체면 의식의 구조를 보여주고, MBTI 단독으로 인지기능 스택이 디지털 행동 패턴을 보여준다. 교차의 가치: ①같은 방향이면 SNS 행동의 이중 확인, ②다른 방향이면 '타고난 표현 에너지(사주)와 인지적 소통 선호(MBTI)의 괴리' 발견. 특히 darkside 교차가 가치 있다: 사주에서 비겁이 강하면(자존심 에너지) + MBTI에서 darkside가 '비교 함정'이면, 자존심이 높은 사람이 비교에 취약하다는 구조적 위험이 이중 확인.",
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
        "cross": "투출은 천간과 지장간의 일치 여부에서 도출되는 사주 고유 메커니즘이다. '잠재 에너지의 의식화'라는 개념은 사주에서 매우 독특한 분석 축이며, 같은 십성이 있어도 투출 여부에 따라 성격 표현이 완전히 달라진다.",
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
        "cross": "12운성은 일간과 일지의 관계에서 도출되는 사주 고유 변수다. 상생/상극이라는 이분법을 12단계로 세분화하므로, 교차 진단 시 사주 측 예측의 정밀도가 올라간다. 상대 체계에서 주기능-열등기능 긴장의 '강도'나 '질감'을 세분화하는 변수가 있다면 더 깊은 교차가 가능하다.",
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
        "cross": "MBTI 단독 패턴이다. 인지기능별 분노 표현과 유형별 갈등 스타일은 MBTI 고유의 설명 체계이다. 상대 체계에서 갈등 반응을 결정하는 변수(예: 특정 십성 조합에 따른 갈등 패턴)가 제시되면 교차 가능성이 열린다.",
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
        "cross": "합충형해는 천간/지지 간의 수학적 관계에서 도출되는 사주 고유 메커니즘이다. 특히 궁위별 의미 분화(같은 충이라도 월지-일지 충과 년지-시지 충의 의미가 다름)는 사주에만 있는 세분화. 상대 체계에서 '성격 내 에너지가 묶이거나 충돌하는 구조'를 설명하는 변수가 있다면 교차 가능성이 열린다.",
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
        "cross": "사주 단독으로 조후 분석이 가능하고, MBTI 단독으로 coreFear/coreNeed 분석이 가능하다. 교차의 가치는 두 체계가 각각 다른 측정 도구로 같은 심리적 현상(근본 결핍감)의 서로 다른 층위를 포착한다는 점이다. MBTI는 인지기능의 선호와 회피를 통해, 사주는 에너지 밸런스의 구조적 편향을 통해 접근한다. 동일 현상에 대한 삼각 검증(triangulation) 효과가 있다.",
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
        "cross": "사주 단독으로 십성 비중 순위가 판단 우선순위를 보여주고, 상대 체계 단독으로 인지기능 스택이 의사결정 서열을 보여준다. 교차의 가치는 두 측정이 같은 방향이면 확신 증폭, 다른 방향이면 '에너지 구조(타고난 것)와 인지 선호(학습된 것)의 괴리' 발견에 있다. 특히 blind spot이 일치하면 그 영역의 취약성이 구조적임을 이중 확인할 수 있다.",
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
        "cross": "상대 체계는 60일주라는 정밀한 조합으로 '어떤 이중성인가'를 구체적으로 분류하고, 인지기능 이론은 그립(grip) 모델로 '이중성이 어떤 메커니즘으로 폭발하는가'를 설명한다. MT_STRESS_STAGES.stage4_grip에 따르면 INFP의 Te 그립은 '갑자기 공격적 효율 추구, 냉혹한 비판'으로 나타나는데, 이것은 상대의 '일지 에너지가 표면화되는 순간'과 같은 현상을 다른 언어로 설명하는 것이다. 교차하면 '무엇이 숨어있는가(60일주 정밀도)'와 '어떻게 터져나오는가(그립 역학)'를 동시에 설명할 수 있어 단독보다 강력하다.",
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
        "cross": "사주 단독으로 투출 여부가 잠재 에너지의 의식화를 보여준다. 상대 체계 단독으로 posting 패턴을 보여준다. 교차의 고유 가치: 같은 식상 수치+같은 상대 유형이라도 투출 여부에 따라 실제 행동이 다르다는 세분화. 이것은 '왜 같은 유형인데 어떤 사람은 표현하고 어떤 사람은 안 하는가'에 대한 사주 측 추가 설명이다. 특히 대운/세운에 의한 투출 시점 예측은 사주에서만 가능한 시간축 가치다.",
        "impact": 3
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
        "cross": "P-CHAR-026이 '어떤 활동이 충전/소진인가'를 교차했다면, P-CHAR-033은 '어떤 스트레스 단계에서 어떤 교차 처방이 적합한가'를 세분화한다. stage2에서의 교차 처방과 stage4에서의 교차 처방은 완전히 다르다 — stage2는 '부기능 활성화'이므로 용신과 부기능의 교차가 핵심이고, stage4는 '열등기능 소량 사용'이므로 기신과 열등기능의 교차가 핵심이다. 이 단계별 분기는 사주 단독(용신/기신은 단계 구분 없음)이나 MBTI 단독(5단계 모델은 있지만 오행별 활동 처방 없음)으로는 나올 수 없는 교차 고유의 가치다.",
        "impact": 3
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
        "cross": "사주 단독으로 통변 갈등을 감지할 수 있고, MBTI 단독으로 루프/그립을 분석할 수 있다. 교차의 핵심 가치는 시간 축의 차이: 사주는 '항상 있는 구조적 모순'을, MBTI는 '스트레스 시 발동하는 상태적 모순'을 포착한다. 이 두 층위를 겹치면 '이 사람의 내적 갈등이 구조적인가 상태적인가'를 변별할 수 있다.",
        "impact": 3
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
        "cross": "사주 단독으로 십성 비중이 에너지 구조를 보여주고, MBTI 단독으로 혼동 쌍의 구분 기준(testQuestion)이 있다. 교차의 고유 가치: MBTI의 testQuestion이 '주관적 자기 보고'에 의존하는 반면(MT_PSYCHOMETRIC_STATUS.critiques.dichotomy: '강제 이분법 문제'), 사주의 십성 비중은 출생 데이터에서 계산되는 '객관적 에너지 구조'이므로, 자기 보고의 편향을 보완할 수 있다. 예를 들어 자기 보고에서 INFJ라고 하지만 사주에서 관성이 극도로 약하면, '정말 Fe가 2번째 기능인가?'라는 검증 질문을 던질 수 있다. 이것은 어느 한 체계만으로는 나올 수 없는 교차 검증이다.",
        "impact": 3
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
        "cross": "사주 단독으로 대운의 용신/기신 흐름이 에너지 충전/소진의 시간 패턴을 보여주고, MBTI 단독으로 발달 단계가 인지기능의 일반적 성장 시기를 보여준다. 교차의 고유 가치: MBTI의 발달 단계는 '일반적 연령대'만 제시하고(30~40대에 3차기능 발달), 개인별로 이 발달이 가속되는지 지연되는지는 예측하지 못한다. 사주의 대운이 같은 방향의 에너지를 해당 시기에 제공하면 발달 가속, 반대 방향이면 발달 지연 또는 통합적 경로가 필요하다는 개인별 예측이 가능해진다. 특히 교운기와 midlife transition의 시간적 겹침은 어느 한 체계만으로는 나올 수 없는 교차 고유의 통찰이다.",
        "impact": 3
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
        "cross": "기질이 '무엇을 원하는가'를 정하고 용신이 '무엇이 필요한가'를 정한다. 원하는 것과 필요한 것이 다를 때 성격의 가장 깊은 긴장이 생긴다. 이 긴장은 단독 체계로는 포착할 수 없다 — 기질만 보면 '이 사람은 의미를 추구한다'고 끝나고, 용신만 보면 '이 사람은 재성 활동이 필요하다'고 끝난다. 교차해야 '의미를 추구하면서도 재물 활동을 해야 하는 모순'이 드러난다.",
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
        "cross": "음양과 E/I가 일치하면(극양+E 또는 극음+I) 성격이 일관적이고, 불일치하면(극양+I 또는 극음+E) 겉과 속의 괴리가 생긴다. 이 불일치는 두 체계를 교차해야만 발견할 수 있는 고유 패턴이다. 단독 체계에서는 '일관된 외향인'으로만 보이는 사람이 교차 분석에서는 '에너지 방향은 외향이지만 충전은 내향 — 사회활동 후 극심한 피로'라는 모순 구조를 드러낼 수 있다. 다만 이 대응의 엄밀성은 탐색적 수준(exploratory)이다 — 음양과 E/I가 정확히 같은 것을 측정하는지는 검증되지 않았다.",
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
        "cross": "격국 성패는 '원국에 구조적으로 결정된 조건(패격 요소 유무)'에 의해 에너지의 건강/뒤틀림이 결정되고, 인지 성숙도는 '나이와 의식적 노력에 의해 같은 기능의 사용 방법이 변하는 것'이다. 핵심 차이는 '외적 조건(대운에 의한 패격 해소) vs 내적 발달(경험에 의한 성숙)'이다. 교차하면 '이 사람의 에너지가 구조적으로 뒤틀려 있는가(격국 성패)'와 '그 에너지를 인지적으로 얼마나 건강하게 처리하는가(성숙도)'라는 이중 진단이 가능해진다. 단독으로는 '패격이다/아니다'(이진 판단) 또는 'immature/mature'(3단계)라고만 말하지만, 교차하면 '패격이면서 immature'(최악 — 구조도 뒤틀리고 사용법도 미숙)부터 '성격이면서 mature'(최선 — 구조도 건강하고 사용법도 성숙)까지 2×3=6가지 조합으로 세분화된다. 가장 흥미로운 것은 '패격이면서 mature' — 구조적으로는 불리하지만 경험과 노력으로 에너지 사용법을 터득한 사람. 이것이 상대가 말한 '사주를 넘",
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
        "cross": "인지기능 이론에는 '계절'이라는 변수가 없다. 같은 INFP라도 여름생과 겨울생의 에너지 톤이 다르다는 것은 명리학만이 설명할 수 있는 고유 변수다. 교차하면 인지기능 유형이 '무엇을 하는가'를 정하고, 조후가 '어떤 온도/톤으로 하는가'를 정한다. 단독으로는 '이 사람은 감정 중심'이라고만 말할 수 있지만, 교차하면 '이 사람은 감정 중심인데 뜨거운 감정(여름생)인지 차가운 감정(겨울생)인지'까지 구분된다.",
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
        "cross": "사주 단독으로 대운/세운 5신 변동이 에너지 흐름의 시간적 패턴을 보여준다. 상대 체계 단독으로 스트레스 5단계 모델이 상태 진단과 처방을 보여준다. 교차의 고유 가치: 상대 체계는 '지금 어떤 단계인가'(상태 진단)는 가능하지만 '언제 이 단계에 진입하는가'(시간 예측)는 불가능하다. 사주는 대운/세운으로 '언제 에너지가 소진/충전되는가'를 예측할 수 있다. 이 둘을 결합하면 '예방적 처방'이 가능해진다 — 기신 세운이 오기 전에 미리 용신 활동을 강화하는 것. 이것은 어느 한 체계만으로는 나올 수 없는 교차 고유의 가치다.",
        "impact": 3
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
        "cross": "사주 단독으로 '사회적 역할 강점'을 매우 구체적으로 진단 가능(JAPYEONG_GG 10종 × 성패 × 신강도). MBTI 측에서 '인지기능 스택의 사회적 발현(주기능의 능숙한 사용)'을 제시하면, 같은 강점을 두 체계가 확인하는지 vs 다른 강점을 보는지에 따라 교차 가치가 결정된다. 현재는 사주 단독 패턴이나 교차 확장 가능성이 높다.",
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
        "cross": "60일주 체계는 사주 고유의 극도로 세밀한 성격 원형 분류다. MBTI의 16유형보다 3.75배 많은 분류 체계이며, '같은 INFP라도 갑자 INFP와 갑오 INFP는 다르다'는 수준의 개인화가 가능하다. MBTI와 교차하면 '16유형 × 60일주 = 960종'의 세분화가 이론적으로 가능하나, 현재 패턴에서는 사주 단독으로 장점을 기술한다.",
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
        "cross": "신살은 사주 고유 메커니즘이며 MBTI에 직접 대응물이 없다. 도화살의 '대인 매력'은 MBTI의 E/I나 Fe/Fi와 형식적으로 유사할 수 있으나, 도화살은 궁위별로 발현 영역이 달라지는(년지 도화 = 어릴 때부터 인기, 일지 도화 = 배우자 매력) 세밀함이 있어 사주 단독으로 완결적이다.",
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
        "cross": "투출 개념은 사주 고유 메커니즘이며 MBTI에 직접 대응물이 없다(심판 결과에서 S급 교차 'P-CHAR-투출×SNS'가 인정됨). 투출 여부가 같은 오행 수치에서도 행동을 분기시키는 것은 사주 고유의 강력한 변수다. MBTI와 교차하면 '같은 유형이라도 투출 여부에 따라 해당 재능의 발현 수준이 다르다'는 통찰이 가능하지만, 현재 패턴에서는 사주 단독으로 장점 구조를 기술한다.",
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
        "cross": "주기능의 건강한 발현은 MBTI 단독으로 매우 완결적이다. 사주의 일주 고유 강점(P-MERIT-004)이나 격국 사회적 강점(P-MERIT-001)과 교차하면 '두 체계가 같은 강점을 가리키는가'를 확인할 수 있으나, 현재는 MBTI 단독으로 제시한다. 상대 교수의 구체적 변수 제시를 기다려 교차 여부를 판단하겠다.",
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
        "cross": "사주의 직업 적성은 십성 비중이라는 에너지 구조에 기반하고, MBTI의 커리어 적성은 인지기능 선호에 기반한다. 두 체계의 적성 방향이 일치하면 '확신', 다르면 '숨겨진 적성 발견'이라는 교차 가치가 있다. 그러나 사주 단독으로도 12종 적성이 매우 구체적(직업명 포함)이어서 완결적이다.",
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
        "cross": "사주의 신강도는 에너지 총량이고 MBTI의 E/I는 에너지 원천 방향이다. 측정 차원이 다르므로 교차 시 새로운 조합이 나올 수 있다(심판 결과에서 S급 교차 '음양×E/I'가 인정됨). 그러나 '장점' 관점에서는 사주 단독으로 신강도별 강점을 충분히 기술 가능하다.",
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
        "cross": "오행 순환 분석은 사주 고유 메커니즘이다. MBTI의 인지기능 간 시너지(주기능-부기능 발달 시 자연스러운 흐름)와 형식적으로 유사하나, 오행 순환은 5원소 × 상생/상극이라는 다른 체계로 작동한다.",
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
        "cross": "용신은 사주 고유의 에너지 처방 체계다. MBTI에는 '무엇을 하면 에너지가 충전되는가'(E/I, 인지기능 회복)가 있어 교차 가능성이 높다(심판 결과 A급 '자기돌봄 교차'). 그러나 용신은 방향·색상·직업까지 포함하는 포괄적 처방이어서 사주 단독으로 매우 완결적이다.",
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
        "cross": "합충형해는 사주 고유 메커니즘이다(심판 결과 B-사주단독 판정 다수). 그러나 합이 만드는 '에너지 결합'은 MBTI의 '주기능-부기능 시너지'와 형식적으로 유사하여, '어떤 종류의 결합인가(오행적 결합 vs 인지적 결합)'라는 교차 통찰이 가능하다. 현재는 사주 단독으로 장점 구조를 기술한다.",
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
        "cross": "통변 공식은 사주 십성 간 상호작용의 고유 메커니즘으로, 다른 성격 분석 체계에는 없는 '에너지 흐름 패턴'이다. MBTI의 인지기능 간 상호작용(예: Ni-Fe 시너지)과 형식적 유사성은 있으나, 통변 공식은 구체적 수치 기준(1.5 이상 등)이 있어 사주 단독으로 완결적이다.",
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
        "cross": "12운성은 사주 고유의 12단계 에너지 질감 분류다. MBTI에는 이런 세밀한 에너지 상태 분류가 없다. 12운성×60일주 조합은 매우 세밀한 개인화를 가능하게 한다.",
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
        "cross": "핵심 교차 가치: 사주(일주 core)는 출생 시점에 고정된 구조적 강점이고, MBTI(주기능)는 자기보고에 기반한 인식된 강점이다. 두 체계의 강점 방향이 일치하면 '자기 강점을 정확히 아는 사람'이라는 확신이 생기고, 불일치하면 '자각하지 못한 구조적 강점'이라는 새로운 정보가 나온다. 심판 결과에서 S급으로 인정된 '의식-무의식 이중구조(주기능-열등기능 × 겉-속 이중자아)'의 장점 소주제 적용이다. 불일치 시 '왜 이 강점을 느끼지 못하는가?'라는 질문이 자기 이해의 돌파구가 된다.",
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
        "cross": "존재감이라는 단일 현상을 세 개의 독립적 변수로 삼중 진단. 세 변수의 일치/불일치 패턴이 '왜 이 사람의 존재감이 맥락에 따라 다른가'를 구조적으로 설명. 특히 불일치 조합이 만드는 독특한 인상(에너지는 큰데 안 보이는 사람, 에너지는 작은데 자꾸 나오는 사람)은 세 변수를 교차해야만 포착 가능.",
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
        "cross": "에너지의 질감(무엇으로 느껴지는가)과 행동의 양식(어떻게 행동하는가)이라는 서로 다른 차원을 교차하여 첫인상의 다면성을 포착. 한쪽만으로는 '어떤 느낌의 사람인데 어떻게 행동하는지'를 동시에 설명 불가.",
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
        "cross": "갈등 시 타인 인식을 행동 패턴(인지기능 기반)과 관계 맥락(궁위 기반)의 교차로 진단. '어떤 관계에서 어떤 방식의 갈등이 보이는가'를 두 축으로 특정하여, 같은 유형이라도 궁위 배치에 따라 갈등 인상이 달라지는 이유를 설명.",
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
        "cross": "인지기능의 내향/외향 태도라는 단일 변수로 '왜 타인이 이 사람의 핵심을 못 보는가'를 구조적으로 설명. 주기능이 내향인 8개 유형은 구조적으로 오해받기 쉽고, 외향인 8개 유형은 구조적으로 읽히기 쉽다는 체계적 예측이 가능하다.",
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
        "cross": "타인 인식의 시간적 변화를 10년 단위로 예측할 수 있는 것은 사주 고유. '왜 5년 전과 지금 이 사람이 달라 보이는가'의 시간축 답변.",
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
        "cross": "첫인상의 에너지 색채를 오행 물상으로 구체화할 수 있는 것은 사주 고유. 년간이라는 특정 위치가 '외부 인상' 전담이라는 궁위론이 근거.",
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
        "cross": "사회적 페르소나를 십성이라는 관계론적 에너지로 설명하는 것은 사주 고유. 같은 사람이 직장에서와 집에서 다르게 보이는 이유를 궁위(월주 vs 일주)로 구조적으로 설명.",
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
        "cross": "납음의 30종 존재 상징(사주 고유)과 기질의 4대 동기 구조(MBTI 고유)가 결합하여 120가지 '존재적 인상' 조합을 생성. 납음 단독으로는 '어떤 이미지인가'만 설명하고, 기질 단독으로는 '어떤 동기의 사람인가'만 설명하지만, 교차하면 '어떤 이미지의 어떤 동기를 가진 사람'이라는 입체적 존재 인상이 된다.",
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
        "cross": "첫인상과 실제 자아의 괴리를 두 궁위 간 오행 관계로 정량적으로 측정할 수 있다는 것이 사주 고유의 구조. 관계(상생/상극/비화)에 따라 괴리의 질감까지 설명 가능.",
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
        "cross": "격국이라는 사회적 역할 코드가 타인의 기대를 형성한다는 관점. 성격이 아니라 역할이 타인 인식의 단위라는 사주 고유의 프레임.",
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
        "cross": "존재감의 크기를 자기편 에너지 비율이라는 정량적 지표로 5등급화할 수 있는 것이 사주 고유. '왜 이 사람은 조용한데 깊어 보이는가'를 구조적으로 설명.",
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
        "cross": "물상이라는 체현적 인지(Lakoff & Johnson) 기반의 이미지화가 사주 고유의 설명 방식. '이 사람은 어떤 풍경인가'라는 직관적 접근으로 타인 인상을 설명.",
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
        "cross": "상호작용 스타일은 인지기능 스택이 외부에 투사되는 행동 패턴의 유형화로, 개별 기능이 아닌 전체 스택의 사회적 발현 양식을 포착한다. 4개 유형으로의 범주화가 타인 인식의 즉각적 분류를 가능하게 한다.",
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
        "cross": "같은 유형 내에서도 축 강도에 따라 타인 인식이 완전히 달라진다는 스펙트럼 관점. 유형론의 이분법적 한계를 강도 변수로 보완하여 '같은 INFP인데 왜 사교성이 다르게 보이는가'를 설명.",
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
        "cross": "갈등 상황이라는 특정 맥락에서의 타인 인식을 분리하여 분석. 평소 인상과 갈등 시 인상의 괴리 자체가 타인에게 '이 사람은 겉과 속이 다르다'는 판단의 근거가 된다.",
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
        "cross": "디지털 환경이라는 현대적 맥락에서의 타인 인식을 인지기능 패턴으로 분석. 오프라인 인상과 온라인 인상의 괴리가 유형별로 어떻게 구조화되는지를 설명.",
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
        "cross": "사회적 페르소나를 관계론적 에너지(십성)와 행동/동기 유형(기질·상호작용 스타일)으로 이중 진단. 십성은 '이 사람이 사회에서 어떤 역할 에너지를 쓰는가', 기질/스타일은 '이 사람이 사회에서 어떤 방식으로 행동하는가'를 각각 설명하여 페르소나의 입체성이 높아진다.",
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
        "cross": "타인 인식이 '나'의 고유 속성이 아니라 '나와 상대의 관계 함수'라는 관계론적 프레임. 같은 사람이 A에게는 편안한 사람이고 B에게는 위협적인 사람이 되는 이유를 십성의 상대적 관계로 구조적으로 설명.",
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
        "cross": "연애 관계라는 특정 맥락에서 타인(파트너) 인식이 시간에 따라 5단계로 분화되는 것을 추적. 일반적 첫인상(P-LOOK-011)이나 갈등 시 인상(P-LOOK-015)과 달리, 친밀 관계의 심화에 따른 인상 변화 궤적을 제공.",
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
        "cross": "신살이라는 사주 고유의 특수 에너지가 타인 인식에 특수색을 입히는 것. 일반적 성격 분석에서는 포착할 수 없는 '특정 종류의 매력/위협/신비'를 설명.",
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
        "cross": "8자 전체의 음양 비율이라는 단일 지표로 에너지 방향성을 진단하는 것이 사주 고유. 전체적인 '느낌'의 근거를 음양이라는 가장 원초적 이항 대립으로 설명.",
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
        "cross": "투출이라는 사주 고유 개념이 '왜 이 능력이 남에게 안 보이는가'를 구조적으로 설명. 지장간 3겹 구조(여기/중기/정기)에 의한 의식화 수준 차이가 가시성의 근거.",
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
        "cross": "같은 에너지가 궁위(맥락)에 따라 완전히 다르게 발현/인식된다는 것은 사주의 궁위론 고유의 통찰. 타인 인식이 관계 맥락에 따라 분화되는 이유를 구조적으로 설명.",
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
        "cross": "기질은 개별 인지기능보다 상위 수준의 사회적 범주화 도구. 타인이 세부 인지기능을 모르더라도 기질 수준에서는 직관적으로 읽을 수 있다는 점에서 '남들이 보는 나'에 직접적.",
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
        "cross": "오인이 발생하는 구조적 이유를 인지기능 수준에서 설명. '왜 남들이 나를 잘못 읽는가'에 대한 체계적 답변이 가능하다.",
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
        "cross": "그림자 기능이라는 무의식 방어 메커니즘이 타인에게 투사되는 '위기 시 페르소나'를 설명. 평소의 의식적 기능과 위기 시 무의식적 기능의 괴리가 '남들이 보는 나'의 비일관성을 만든다.",
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
        "cross": "사회적 역할을 두 개의 독립적 체계로 이중 진단. 일치하면 역할 정체성이 명확해지고, 불일치하면 역할 혼란의 구조적 원인을 특정할 수 있다. 한쪽만으로는 '왜 이 사람의 역할이 명확하지 않은가'를 설명하기 어렵다.",
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
        "cross": "유형 오인이라는 현상의 원인을 인지기능 구조(rootCause)와 에너지적 괴리(년간-일간 관계, 투출 여부)로 이중 진단. 오인이 단순히 '비슷해 보여서'가 아니라 에너지적 불일치까지 겹쳐 강화되는 구조를 포착. '왜 이 사람은 유독 오인을 많이 당하는가'에 대한 이중 답변.",
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
        "cross": "타인 인식 변화의 시간축을 두 개의 독립적 발달 체계(대운 10년 주기 vs 인지기능 연령별 발달)로 이중 진단. 두 시간축이 동기화되면 변화가 급격하고 탈동기화되면 느려진다는 예측이 교차에서만 가능.",
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
        "cross": "겉-속 괴리를 두 개의 독립적 메커니즘(궁위 간 오행 관계 vs 인지기능 태도)으로 이중 진단. 두 진단의 일치/불일치가 괴리의 질적 차이를 만든다 — 에너지적 괴리(사주)와 인지적 괴리(MBTI)를 분리하여 '어떤 종류의 겉-속 다름인가'를 특정 가능.",
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
        "cross": "사주 단독 완결. 합충형해의 궁위별 충격도(SJ_IMPACT_SCORE) 정량 체계와 대운-원국 교차 분석(analyzeDWSEvsWonkuk)이 '10년간 어디가 흔들리는가'를 구체적으로 특정한다.",
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
        "cross": "사주 단독 완결. 대운 전환의 '방향'(어디서 어디로)과 '시점'(몇 세)을 동시에 특정하는 체계. 인지기능 발달 단계(MT_DEVELOPMENT_STAGES)는 수십 년 단위여서 교운기의 정밀한 시점 예측과 대응하지 않는다.",
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
        "cross": "사주 단독 완결. 오행-장부 대응론(황제내경 기반)과 대운 시간축의 교차로, '어떤 10년에 어떤 건강 영역이 취약해지는가'를 예측한다. SJ_HEALTH_OH의 과다/부족 각 장부 매핑이 근거.",
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
        "cross": "사주 단독 완결. 대운 전환 속도를 3가지 독립 변수로 정량 예측하는 체계. 오행 상생/상극이라는 관계 구조가 적응 속도의 물리적 근거가 된다는 점이 고유하다.",
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
        "cross": "사주 단독 완결. 10년 흐름과 1년 파도의 이중 구조가 만드는 '전략적 타이밍 판단' — 언제 움직이고 언제 참을지의 구체적 근거. 이전 소주제 '올해 키워드'에서 확립된 세운 분석과 연결되지만, 여기서는 대운이라는 상위 구조 안에서 세운의 의미가 달라지는 점에 초점.",
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
        "cross": "사주 단독 완결. 대운 십성+신강도 조합으로 10년간의 삶의 주제(theme)와 에너지 활용 방향(공격/방어)이 동시에 결정된다. MBTI에는 10년 단위 에너지 전환 변수가 없다.",
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
        "cross": "사주 단독 완결. 5신 체계(용신 기반 오행 역할 배정)가 대운의 '절대적 길흉'을 판정하는 구조. 같은 '재성운'이라도 용신이면 최고의 재물 시기이고 기신이면 재물이 오히려 독이 되는 시기이다.",
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
        "cross": "사주 단독 완결. P-DW-001(십성 모드) + P-DW-005(5신 등급) + 육친론을 하나의 로드맵으로 통합한 최종 산출물. 80년 인생의 에너지 흐름을 시각적으로 조망하는 것은 명리학만의 고유 강점이다.",
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
        "cross": "MBTI 단독 완결. MT_STRESS_STAGES.stage4_grip은 열등기능의 원시적 폭발이라는 인지기능 고유 메커니즘이며, 사주에는 '인지적 스트레스 반응에 의한 소비 행동 변화'에 대응하는 변수가 없다. 사주는 기신 시기에 재물 에너지가 하락한다고 보여주지만, '구체적으로 어떤 방식의 소비 파괴가 일어나는가'는 그립 모델만이 포착한다.",
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
        "cross": "사주 단독 완결. 10년 주기의 에너지 모드 전환에 의한 재물 전략 전환은 MBTI에 대응 개념이 없다. SJ_TRANSITION의 16가지 전환 패턴이 각각 다른 재물 전략 전환을 지시한다.",
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
        "cross": "사주 단독 완결. 재성의 정/편 비율과 식상생재 통변 공식의 유무가 재물 축적의 기본 방향을 결정한다. 이 분류 없이 재물 조언을 하면 모든 사람에게 같은 조언이 되어 바넘 효과에 빠진다.",
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
        "cross": "사주 단독 완결. 시간축에 의한 재물 에너지 변동 예측은 MBTI에 대응 개념이 없다. SJ_findMoneyTiming의 6가지 조건(세운 천간 십성, 세운 지지 오행, 대운 재성, 식상생재 시너지, 5신 판정, 기신 감점)이 통합된 점수 시스템이다.",
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
        "cross": "사주 단독 완결. 신강도는 자기편 에너지(비겁+인성) vs 환경 에너지(식상+재성+관성)의 비율이며, MBTI에 대응하는 에너지 총량 지표가 없다.",
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
        "cross": "사주 단독 완결. SJ_GAEUN의 6차원 구체적 처방은 MBTI에 대응하는 환경 최적화 체계가 없다. 특히 방향/색상/숫자 같은 물리적 환경 조정은 사주 개운법의 고유 영역이다.",
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
        "cross": "사주 단독 완결. 육친론은 십성을 성별+관계 맥락으로 변환하는 사주 고유 체계이며, MBTI에 관계별 에너지 흐름 모델이 없다.",
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
        "cross": "사주 단독 완결. 납음은 60갑자 일주를 30쌍으로 묶어 각각에 물상적 존재 상징을 부여하는 사주 고유 체계이며, MBTI에 대응 개념이 없다. SJ_getNapeum 함수와 NAPEUM_TABLE/NAPEUM_STORY가 데이터를 제공한다.",
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
        "cross": "사주 단독 완결. 용신 체계는 MBTI에 대응 개념이 없다. SJ_GAEUN의 6가지 구체적 처방(방향/색상/숫자/계절/직업/음식)이 재물 전략을 일상 수준까지 구체화한다.",
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
        "cross": "사주 단독 완결. 통변 공식은 십성 비중의 특정 조합이 만드는 에너지 변환 회로이며, 이 개념은 MBTI에 존재하지 않는다. 특히 길+흉 공식 동시 보유는 사주만이 포착하는 양가적 재물 구조다.",
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
        "cross": "사주 단독 완결. 격국은 월지 정기 십성에 의해 결정되는 사주 고유 개념이며, MBTI에 대응하는 구조가 없다. 특히 패격 조건에 의한 재물 경로 왜곡은 사주만이 포착하는 진단이다.",
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
        "cross": "사주 단독 완결. 월운 단위의 재물 에너지 변동은 MBTI에 대응 개념이 없다. SJ_calcWolun의 12개월 십성 그룹 분류와 SJ_buildTaekil의 개업 적기 산출이 핵심.",
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
        "cross": "사주 단독 완결. 오행 상생 체인의 단절은 MBTI에 대응하는 에너지 흐름 모델이 없다. OHENG_FLOW_DESC가 각 단절의 구체적 의미와 처방을 제공한다.",
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
        "cross": "사주 단독 완결. 삼합 트리거 예측은 원국의 지지 구성과 세운 지지의 상호작용에 의한 것으로, MBTI에 대응 개념이 없다.",
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
        "cross": "사주 단독 완결. SJ_HEALTH_OH의 오행-장부 대응과 과다/결핍 증상 매핑은 황제내경/동의보감 기반이며, MBTI에 신체 건강 대응 체계가 없다.",
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
        "cross": "MBTI 단독 완결. MT_MONEY.trap은 인지기능 스택에서 필연적으로 발생하는 소비 함정을 유형별로 특정하며, 사주의 재성/통변 체계에는 '인지적 소비 패턴'에 대응하는 변수가 없다. 사주는 재물 에너지의 구조/방향/타이밍을 보여주지만, '왜 이 사람이 이런 방식으로 돈을 쓰는가'의 인지적 메커니즘은 설명하지 못한다.",
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
        "cross": "MBTI 단독 완결. MT_DECISION_PROCESS.blind는 인지기능 스택 순서에서 열등기능이 마지막에 고려되는 구조적 필연이며, 사주에는 '정보처리 우선순위'에 대응하는 변수가 없다. 사주는 재물의 에너지 방향을 보여주지만, '판단 과정에서 어떤 정보를 빠뜨리는가'는 인지기능 스택만이 포착한다.",
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
        "cross": "MBTI 단독 완결. MT_TEMPERAMENTS.coreNeed는 Keirsey 기질론에 기반한 4대 핵심 욕구이며, 사주에는 '왜 돈을 모으는가'의 동기론에 대응하는 변수가 없다. 사주는 재물의 구조/방향/타이밍을 보여주지만, 재물 축적의 심리적 동기는 기질론만이 포착한다.",
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
        "cross": "이 교차는 P-CHAR-036(소비 심리 교차)과 다른 차원이다. P-CHAR-036은 '일상적 소비 패턴'의 교차였고, 여기서는 '재물 축적 전략의 방향성' 자체의 수렴/모순을 진단한다. 재성 구조의 4분류(정재형/편재형/식상생재형/재성부재형)는 재물 '경로'를 결정하고, MT_MONEY.style은 재물 '태도'를 결정한다. 경로와 태도가 일치하는지 여부가 재물 전략의 실행 용이성을 좌우한다. 사주 단독으로는 '편재형이니 투자하세요'만 나오고, MBTI 단독으로는 '저축형이니 아끼세요'만 나오지만, 교차하면 '편재 에너지를 안전 저축 방식으로 충족하는 중간 전략'이라는 맞춤 처방이 나온다.",
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
        "cross": "신강도(에너지 크기)와 상호작용 스타일(에너지 양식)이 서로 다른 차원에서 주도성을 결정하므로, 교차해야만 '크기 × 양식'의 4분류가 가능하다. 특히 (2)번 '극신강 + behind-the-scenes'는 어느 체계 단독으로도 포착하기 어려운 복잡한 패턴.",
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
        "cross": "격국의 연애 역할(에너지 방향)과 상호작용 스타일의 연애 역할(행동 양식)은 서로 다른 차원이므로, 교차해야만 '에너지 × 양식'의 수렴/괴리를 진단할 수 있다. 특히 괴리 조합에서 '본인은 이 역할을 하고 있다고 생각하지만 파트너는 체감하지 못하는' 소통 단절의 구조적 원인을 밝히는 것이 고유한 가치. CROSS-LOOK-003(사회적 역할 기대의 이중 진단)의 연애 맥락 심화.",
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
        "cross": "기저 톤(에너지 질감)과 표현 양식(행동 형태)은 서로 다른 차원이므로, 교차해야만 '어떤 에너지로 어떤 형태의 사랑을 하는가'라는 완전한 그림이 그려진다. 같은 유형 내에서 일간에 따른 개인차를 설명하는 고유한 가치.",
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
        "cross": "사주 단독으로는 '이 해에 인연이 온다'까지만 알 수 있고, 인지기능 단독으로는 '이 사람의 연애 역량 수준'까지만 알 수 있다. 교차하면 '인연이 왔을 때 실현 확률'이라는 고유한 예측이 가능하다. 시간축(사주) × 역량(인지기능)의 교차에서만 나오는 '기회 실현 가능성' 진단이 핵심 가치.",
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
        "cross": "인지기능 전환이 '어떤 기능이 활성화되느냐'를 설명하고, 대운 십성이 '그 기능이 어떤 에너지 맥락에서 발동하느냐'를 결정한다. 같은 earlyDating 단계라도 재성 대운과 식상 대운에서 활성화되는 인지기능의 구체적 표현이 완전히 달라진다. 이것은 연애 단계(상대 측) × 시간축 에너지(사주 측)의 교차에서만 나오는 고유한 가치.",
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
        "cross": "기질 수준의 분석은 16유형 수준보다 거칠지만, '이 사람의 연애에서 절대 양보할 수 없는 것'을 가장 간결하게 지목한다. MT_TEMPERAMENTS.conflict가 '이 기질이 연애에서 가장 취약한 지점'을 명시.",
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
        "cross": "스트레스 단계에 따른 연애 행동 변화는 성격 유형론만으로는 설명할 수 없는 '상태 의존적 변이'를 포착한다. 같은 유형이 건강할 때와 병적일 때 완전히 다른 연애를 한다는 점에서, 유형 고정 분석의 한계를 보완하는 고유한 가치.",
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
        "cross": "통변 공식은 십성 비중의 조합이 만드는 에너지 역학이므로, 단일 십성 분석으로는 보이지 않는 '구조적 패턴'을 포착. 특히 흉(凶) 공식이 연애에서 반복되는 실패 회로(SAJU-FIX-001과 연결)를 설명.",
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
        "cross": "SS_CONTEXT 10종의 spouse 필드가 각각 고유한 배우자 기대치를 정의. 이것은 의식적 선호(내가 좋다고 말하는 타입)와 무의식적 끌림(실제로 끌리는 타입)의 괴리를 설명하는 구조적 근거. ST5_PILLAR_PSYCHOLOGY.dayJi = '숨겨진 갈망'이라는 위치론과 정확히 대응.",
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
        "cross": "납음은 사주 고유의 30종 존재 상징 체계로, 다른 어떤 성격 분석에도 없는 '존재적 질감' 변수. ILJU_DATA.love와 결합하면 일주별 연애 이미지가 구체적 이야기로 전환된다. P-LOOK-009(물상 원국 풍경)의 연애 맥락 심화.",
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
        "cross": "격국론은 사주의 사회적 역할 체계이므로, 연애라는 관계에서도 '이 사람이 자연스럽게 맡는 역할'을 구조적으로 지목한다. 성격(成格) vs 패격(敗格)의 분기가 같은 격국이라도 건강한 연애 역할과 뒤틀린 연애 역할로 분화시키는 점이 고유 가치. P-CHAR-002(격국 사회적 페르소나)의 연애 맥락 적용.",
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
        "cross": "합충형해의 궁위별 의미가 연애 맥락에 구체적으로 적용될 때, '왜 이 사람은 연애가 직장과 항상 충돌하는가'(일지-월지 충) 같은 구조적 질문에 답을 준다. P-CHAR-016(원국 합충형해의 성격 구조)의 연애 맥락 심화.",
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
        "cross": "축 역학은 '왜 좋아하는 것과 파괴하는 것이 같은 근원인가'라는 연애의 핵심 역설에 대한 구조적 설명을 제공한다. earlyDating의 이상화와 conflict의 그립 폭발이 같은 축 위에 있다는 점이 이 패턴의 고유한 통찰.",
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
        "cross": "유형 간 관계 역학은 단순 성격 매칭을 넘어 인지기능 교차 분석에 기반한 구조적 보완/충돌 패턴을 제공한다. MT_RELATION_MATRIX의 note가 각 조합의 구체적 역학을 설명하고, MT_LOVE.deepRelation/conflict가 개인 수준의 경험을 보충하는 이중 구조.",
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
        "cross": "육친론은 성별에 따라 완전히 다른 해석 체계를 적용하는 사주 고유의 관계론. 같은 십성이라도 성별에 따라 의미가 180도 달라지는 구조적 특성. SJ_YUKCHIN_MAP의 남/여 분기가 이를 코드 수준에서 지원.",
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
        "cross": "JEOKCHEONSU의 love 필드 10종이 물상 기반으로 연애 스타일을 체현적으로 설명. ST5_TGAN_DEEP의 inRelation과 결합하면 '관계에서 이 사람이 주는 느낌'까지 커버. 추상적 성격 서술이 아니라 자연물 이미지(나무/불/물 등)로 직관적 이해 가능.",
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
        "cross": "시간축 분석은 사주의 최대 차별점(ST5_PRINCIPLES.p5_timeAxis). 성격 분석만으로는 '이 사람이 어떻게 연애하는가'만 알 수 있지만, 시간축 분석으로 '언제 연애가 시작/심화/위기를 맞는가'까지 예측. SJ_findLoveTiming의 5개 변수 점수화 체계가 구체적 시기를 특정.",
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
        "cross": "의사결정의 '서열' 구조가 연애에 적용될 때, 단순한 성격 묘사를 넘어 '왜 이 사람이 항상 같은 실수를 반복하는가'의 인지적 메커니즘을 제공한다. blind 필드가 연애 맹점을 구조적으로 지목하는 고유한 가치.",
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
        "cross": "사주 단독의 월 단위 연애 에너지 분석. P-LOVE-009(연간 타이밍)를 12배 해상도로 세분화하여 '어떤 달에 소개팅/데이트가 유리한가'라는 즉각적 처방을 제공한다. 월운은 세운(년간) 분석과 달리 월별 궁위 합충까지 포함하므로, 배우자궁 직접 활성화 여부를 판별할 수 있다는 점이 고유 가치.",
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
        "cross": "연애 성장 방향을 유형 수준(growthInLove), 축 수준(healthyBalance), 기능 수준(growthDirection)의 3층위로 삼중 지목하는 구조. 모두 같은 방향을 가리키면 명확한 성장 처방, 다르면 복잡한 성장 과제.",
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
        "cross": "공망은 사주 고유의 '빈 자리' 개념으로, 다른 어떤 성격 분석 체계에도 없는 구조. 특히 '빈 자리가 채워지는 시점'이라는 시간축 분석이 연애 타이밍(P-LOVE-009)과 결합하면 실용적 가치가 극대화된다.",
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
        "cross": "4축 강도에 의한 세분화는 '같은 INFP라도 F55 INFP와 F88 INFP는 완전히 다른 연애를 한다'는 핵심적 개인차를 포착. 유형 수준의 일반화를 넘어 개인 수준의 정밀 분석을 가능하게 하는 고유한 가치.",
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
        "cross": "5신 체계는 용신을 중심으로 나머지 4오행의 역할(희신/기신/구신/한신)을 배정하는 구조이므로, 단순히 '좋은 오행/나쁜 오행'이 아니라 '에너지의 관계적 맥락'을 제공. 파트너의 일간 오행이 내 5신 중 무엇인지로 관계의 에너지 역학을 진단.",
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
        "cross": "암합은 표면 오행에 드러나지 않는 숨겨진 연결이므로, 다른 어떤 분석 체계로도 포착할 수 없는 사주 고유의 무의식 끌림 메커니즘. classifyAmhap의 consciousnessPath(암합→투출→밝합→의식적선택)가 시간축에서의 끌림 발현 경로를 설명.",
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
        "cross": "신강도는 연애 스타일의 '방향'이 아니라 '강도'를 결정하는 메타 변수. 같은 배우자궁 십성이라도 극신강의 정재와 극신약의 정재는 완전히 다른 관계 역학을 만든다. 전자는 '재물을 지배하는 사랑', 후자는 '재물에 이끌리는 사랑'.",
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
        "cross": "연애 단계에 따라 스택의 다른 위치가 활성화된다는 구조적 설명은 '시간에 따라 보이는 성격이 달라지는' 연애 경험을 인지기능 위치론으로 정밀하게 포착. MT_STACK_POSITIONS의 발달 시기(developAge)와 에너지 비용(energyCost)이 단계별 변화의 메커니즘을 제공하는 고유한 가치.",
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
        "cross": "같은 자리(일지)에서 두 가지 다른 분석 체계(12운성 vs 십성)가 겹치면서 수렴/모순의 2분류가 생김. 수렴이면 impactScore가 높아지고(확실한 패턴), 모순이면 P-CHAR-005(통변 내적 갈등)와 연결되는 파생 가능성.",
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
        "cross": "SJ_DOHWA_GUNGWI 4종이 궁위별 맥락을 명확히 정의. 도화살의 유무뿐 아니라 '어디에 있느냐'가 결정적이라는 점에서 단순 신살 해석을 넘어선 궁위론적 분석.",
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
        "cross": "두 체계가 같은 질문('왜 끌리는가')에 대해 서로 다른 층위의 답을 내놓고, 그 답이 수렴/괴리하는지가 '자기 인식의 정확도'를 진단하는 도구가 된다. 단독으로는 수렴/괴리 여부 자체를 알 수 없고, 교차해야만 보이는 고유한 가치.",
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
        "cross": "통변 공식이 '어떤 구조에서 실패하는가'를, 인지적 갈등 스타일이 '그 실패를 어떻게 처리하는가'를 설명하므로, 교차해야만 '구조 × 처리 방식'의 완전한 실패 시나리오가 그려진다. 단독으로는 실패의 절반만 보인다.",
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
        "cross": "합충의 궁위 연결(일지-월지 = 배우자-직장)이 '어디서 충돌이 발생하느냐'를 지목하고, 인지기능의 루프 메커니즘이 '그 충돌이 어떻게 연애 영역으로 전이되느냐'의 구체적 경로를 설명한다. 합충 없이는 전이 경로가 없고, 인지기능 없이는 전이 메커니즘이 없다. 교차해야만 '직장→연애 전이'의 완전한 시나리오가 그려진다.",
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
        "cross": "사주 내부 진단(P-LOVE-004)과 교차 진단(CROSS-LOVE-001)을 결합해야만 나오는 4분류. 특히 (2)번(사주 수렴 + 교차 괴리)과 (3)번(사주 모순 + 교차 수렴)은 어느 한쪽 체계만으로는 진단 불가능한 복잡한 연애 패턴.",
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
        "cross": "같은 현상(끌림-파괴 역설)에 대해 에너지 역학(사주)과 인지 역학(인지기능 축)이 독립적 설명을 제공하고, 두 설명의 수렴/괴리가 역설의 강도를 결정한다. 단독으로는 역설의 한쪽 메커니즘만 보이고, 교차해야만 '이 역설이 얼마나 강한가'를 진단할 수 있다.",
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
        "cross": "인지기능 성숙도는 유형 고정 분석의 한계를 극복하는 핵심 변수다. 같은 INFP라도 Fi immature vs mature에서 연애의 질적 수준이 천지차이. MT_MATURITY의 3단계(immature/developing/mature)가 연애 각 단계에서의 구체적 행동 차이를 설명하는 고유한 가치.",
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
        "cross": "사주 단독 완결 패턴. 배우자궁 십성(SS_CONTEXT의 spouse 맥락)이 욕구의 방향을 결정하고, 12운성(UNSUNG_KW)이 욕구의 강도와 자각 수준을 결정하여, 지뢰의 '내용'과 '폭발력'을 동시에 특정한다.",
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
        "cross": "사주 단독 완결. 5신 체계는 용신을 기준으로 기신/구신을 수학적으로 도출하므로, '이 사람에게 해로운 에너지 방향'을 객관적으로 특정할 수 있다. 이것은 성격 분석이 아니라 에너지 역학 분석이다.",
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
        "cross": "사주 단독 완결. SJ_detectTongbyeon의 16개 통변 공식 중 흉 공식이 연애 맥락에서 '자기 지뢰'로 발현되는 경로를 구조적으로 특정한다. 같은 사람이 반복하는 연애 실패 패턴의 근본 원인.",
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
        "cross": "사주 단독 완결. CHUNG_GUNGWI_KW와 JIJI_CHUNG_KW가 충의 궁위별 의미를 특정하므로, '어떤 화제가 왜 이 사람에게 지뢰인가'를 궁위 구조로 설명할 수 있다.",
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
        "cross": "사주 단독 완결. calcGongmang의 일지 공망 여부 + GONGMANG_GUNGWI_KW.day가 '채워지지 않는 구조적 빈자리'를 특정하고, GONGMANG_FILL_KW.day가 해소 시점을 예측한다.",
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
        "cross": "사주 단독 완결. analyzeGyeokguk의 strengthScore/strengthGrade가 지뢰의 핵심 방향(통제 vs 유기)을 결정하고, SJ_buildStrengthText의 처방이 지뢰 완화 방향을 제시한다.",
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
        "cross": "MBTI 단독 완결 패턴. MT_TYPES.coreFear가 지뢰의 '핵심 방향'을, MT_LOVE.dealbreaker가 '구체적 트리거'를, MT_CONFLICT_STYLES.trigger가 '갈등 발화점'을 3중으로 특정한다. 세 변수가 모두 주기능 핵심 욕구의 부정에서 수렴한다는 것이 인지기능 이론의 설명력.",
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
        "cross": "사주 단독 완결. calcRelations의 jijiHae + JIJI_HAE_KW가 해의 궁위별 에너지 소진 패턴을 특정한다. P-MINE-004(충)의 즉각적 지뢰, P-MINE-005(형)의 반복적 지뢰와 구분되는 제3유형 — '만성적 소진 지뢰'. ST5_RELATIONS_PHILOSOPHY.hae의 '미묘한 방해' 철학이 이론적 근거.",
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
        "cross": "사주 단독 완결. SJ_checkSamhyung이 형살 유형을 특정하고, 각 유형의 관계적 의미(ST5_RELATIONS_PHILOSOPHY.hyung.fourTypes)가 연애 내 구체적 지뢰 시나리오를 제공한다.",
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
        "cross": "사주 단독 완결. SINSAL_KEYWORDS['양인살']과 calcExtraSinsal의 궁위 정보가 결합하여, '어떤 상황에서 과도한 단절이 발동하는가'를 궁위별로 세분화한다.",
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
        "cross": "사주 단독 완결. ST5_TGAN_DEEP 10천간 심화 성격론과 JEOKCHEONSU 적천수 십간론이 지뢰 폭발의 물상적 양상을 10종으로 세분화한다. 지뢰의 '내용'이 아니라 '폭발 형태'를 결정하는 변수.",
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
        "cross": "사주 단독 완결. calcSajuForApp의 amhapResults가 암합의 궁위와 합화오행을 특정하고, SAJU_AMHAP_LAYERS가 의식 수준(yeogi/junggi/jeonggi)을 3단계로 분류한다. '본인조차 원인을 모르는 지뢰'를 구조적으로 특정할 수 있는 유일한 변수.",
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
        "cross": "사주 단독 완결. JAPYEONG_GG의 격국별 파격 조건이 연애 맥락에서 구체적으로 어떤 자기-지뢰를 만드는지 특정한다. P-MINE-003(통변 흉공식)이 에너지 역학적 회로를 보여준다면, 이 패턴은 격국론이라는 사회적 역할 틀에서의 왜곡을 보여준다.",
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
        "cross": "사주 단독 완결. SJ_buildOsinText의 세운/대운 5신 판별 + SJ_buildMonthlyHighlight의 월운 기신 달 특정이 결합하여, '언제 어떤 지뢰가 특히 위험한가'의 시간축 예측을 제공한다.",
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
        "cross": "배우자궁 십성은 에너지 역학(일지 지장간 정기)에서 도출되고, coreFear/trigger는 인지기능 스택 구조에서 도출된다. 두 변수는 메커니즘이 완전히 다르므로, 수렴하면 '이중 확인'의 진단적 가치가 있고, 모순하면 '이 사람은 자기도 모르는 이중 지뢰를 가진다'는 고유한 발견이 된다. CROSS-LOVE-001(끌림의 수렴/모순)의 역방향이지만, 지뢰에서의 모순은 '관계 파괴 경로가 복수 존재'라는 실전적 위험 진단을 제공하므로 끌림 맥락과 독립적 가치가 있다.",
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
        "cross": "신강도(에너지 총량 기반 지뢰 방향)와 E/I 축 강도(표현 채널)는 완전히 독립적인 변수다. 신강도는 자아 에너지의 양(selfStr/otherStr 비율)이고, E/I는 에너지가 외부/내부로 향하는 선호다. 같은 극신강이라도 E88은 '폭발이 목격되는' 지뢰이고 I88은 '폭발이 통보되는' 지뢰다. 이 구분은 상대방의 대응 전략을 완전히 다르게 만든다 — E88 폭발은 '즉각 진화'가 필요하고, I88 통보는 '사전 감지'가 필요하다.",
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
        "cross": "사주 단독 완결. 대운-세운 2겹 시간축 교차는 명리학 고유 구조. P-YEAR-004가 '에너지 구조'를 다뤘다면, P-YEAR-018은 '그래서 올해 어떻게 행동해야 하는가'의 전략 분기를 다룬다. 4분류(길길/길흉/흉길/흉흉)는 실전 조언의 톤과 방향을 완전히 바꾸는 핵심 분기점.",
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
        "cross": "사주 단독 완결. 건강 오행 경고(P-FIX-010)의 시간축 구체화. P-FIX-010이 '평생 주의할 건강 영역'이라면, P-YEAR-015는 '올해 특히 주의할 건강 영역'이다. 세운 5신이 기신/구신이면서 동시에 건강 취약 오행을 자극하는 복합 조건이 발동할 때 경고 강도가 최대화된다.",
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
        "cross": "사주 단독 완결. 개운법(SJ_GAEUN)은 오행 에너지 보충이라는 명리학 고유 처방 체계이며, 월별 5신 분화와 결합하면 '올해 어느 달에 어떤 오행 활동을 강화/회피하라'는 시간축 처방이 된다. MBTI의 자기돌봄(recharge/warning)은 상시적 처방이지 월별 분화가 없다.",
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
        "cross": "사주 단독 완결. 월운 단위의 목적별 타이밍 분화는 MBTI에 대응 변수가 없다. P-YEAR-005(월운 하이라이트)가 5신 기반 월별 분화를 다루지만, 택일은 목적(결혼/이사/개업/시험)별로 다른 변수를 적용하여 같은 달이라도 결혼에는 좋고 개업에는 나쁜 분화를 만든다는 점에서 독립적이다.",
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
        "cross": "사주 단독 완결. 육친론은 명리학 고유의 관계 분류 체계이며, MBTI에는 성별 기반 관계 에너지 방향 분화가 없다. 세운 십성 → 육친 매핑은 SJ_YUKCHIN_MAP의 남/여 분기에 의해 결정되며, 같은 세운이라도 성별에 따라 완전히 다른 관계가 활성화된다.",
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
        "cross": "사주 단독 완결. 세운과 원국의 관계 역학은 올해 '어떤 영역에서 이벤트가 발생하는가'를 구조적으로 특정하는 유일한 도구.",
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
        "cross": "사주 단독 완결. 재물 타이밍은 세운 십성+오행+5신의 복합 판별이며, 올해 재물 전략의 공격/방어를 결정.",
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
        "cross": "사주 단독 완결. 5신 에너지 색채와 합충 구조 변동이 동일 시점에 겹치는 것은 단순 합산이 아니라 증폭 효과를 만든다 — 기신+충은 개별 효과의 합보다 크다.",
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
        "cross": "사주 단독 완결. 교운기는 대운 주기의 전환점이며, 올해 키워드가 '평범한 한 해'인지 '인생 전환의 해'인지를 결정하는 메타 변수.",
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
        "cross": "사주 단독 완결. 5신 체계는 용신 기준의 에너지 효율 판별이며, 올해 키워드의 기저 톤을 결정하는 가장 근본적인 변수.",
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
        "cross": "사주 단독 완결. 12운성은 5신·합충·십성과 독립적인 축으로, 올해 에너지의 생명 주기적 리듬을 제공한다. 같은 기신 세운이라도 장생이면 '방해가 있지만 성장 중'이고 절이면 '방해+급변'으로 체감이 완전히 다르다.",
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
        "cross": "사주 단독 완결. 십성은 일간과 세운 천간의 관계에서 도출되므로 개인화된 올해 역할을 특정.",
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
        "cross": "사주 단독 완결. 대운과 세운의 이중 구조는 '장기 추세 vs 단기 변동'이라는 시간적 계층 분석이며, 올해 키워드의 맥락적 깊이를 결정.",
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
        "cross": "사주 단독 완결. 월운 단위 분석은 올해 키워드를 '실행 가능한 달력'으로 전환하는 유일한 도구.",
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
        "cross": "사주 단독 완결. 삼합 완성 트리거는 원국 구조와 세운의 시간적 만남에서만 발생하는 사건이며, '미리 준비할 수 있는 폭발적 기회/위험'을 특정.",
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
        "cross": "사주 단독 완결. 공망 해소는 원국의 구조적 빈자리가 시간축에서 채워지는 사건이며, 올해 키워드에 '오랫동안 비어있던 것이 비로소 실현되는' 특수한 의미를 부여.",
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
        "cross": "사주 단독 완결. 배우자성 세운+일지 합+도화 발동의 복합 조건은 '올해 연애 확률'을 구조적으로 특정하는 유일한 도구.",
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
        "cross": "사주 단독 완결. 신살 발동은 일지 기준 삼합 그룹에서 결정되는 고정 위치에 세운 지지가 시간적으로 들어오는 것이며, 올해 키워드에 '특수 에너지 활성화'라는 별도 차원을 추가한다.",
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
        "cross": "사주 단독 완결. 조후론은 궁통보감(穹通寶鑑) 기반의 명리학 고유 체계로, 월지(태어난 달)의 계절 에너지가 일간의 기본 '온도'를 결정한다. 인지기능 이론에는 '태어난 계절이 성격 톤을 결정한다'는 대응 변수가 없다. 조후의 핵심은 '뜨거운 사주는 식혀줘야 하고 차가운 사주는 데워줘야 한다'는 에너지 처방 원리이며, 이것은 물리적 온도 메타포를 통한 체현적 성격 이론이다.",
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
        "cross": "사주 단독 완결. 합충형해는 12지지 간의 기하학적 관계(정반대=충, 대칭=합, 비스듬한 각도=형)에서 파생되는 명리학 고유의 에너지 역학이다. '이 사람 안에 구조적 전쟁이 있는가'를 기하학적 배치에서 읽어내는 것은 인지기능 스택에서는 불가능한 접근이다.",
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
        "cross": "사주 단독 완결. '지금 이 사람'의 시간적 위치를 한줄에 넣는 것은 사주 대운 체계만이 제공할 수 있는 고유한 차원이다. MBTI에는 '올해' 또는 '이 10년'에 대응하는 시간 변수가 없다.",
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
        "cross": "사주 단독 완결. 5신 체계는 용신 오행을 중심으로 나머지 4개 오행을 길흉 등급으로 배정하는 명리학 고유의 에너지 처방 체계다. '필요한 것'과 '피해야 할 것'을 하나의 축에서 동시에 지목하는 것은 오행 상생상극의 순환 구조에서만 가능하다 — 용신을 극하는 오행이 자동으로 기신이 되는 구조적 연동이 있기 때문이다. 인지기능 이론에서는 '열등기능을 키워라'는 있지만 '이 기능을 피하라'는 없다 — 모든 기능은 발달 대상이지 회피 대상이 아니기 때문이다. 이 차이가 두 처방 체계의 근본적 설계 차이를 보여준다.",
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
        "cross": "사주 단독 완결. 육친론(六親論)은 십성을 성별에 따라 가족 관계(아내/남편/아버지/어머니/자녀 등)로 변환하는 명리학 고유의 관계 분류 체계다. 십성이라는 에너지 변수가 성별 맥락에 따라 관계적 의미로 전환되는 것은 사주만의 고유한 2단계 변환이다.",
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
        "cross": "사주 단독 완결. 일간 물상(적천수), 격국 역할(자평진전), 12운성(에너지 생명주기)이라는 세 개의 독립적 사주 변수의 교차점에서 한줄이 나온다. 단일 변수로는 불가능한 구체성을 3축 조합이 제공한다.",
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
        "cross": "MBTI 단독 완결. 기질 체계(Keirsey)와 유형별 핵심 욕구/공포는 인지기능 이론의 고유 구조다. 4기질 × 16유형의 이중 구조가 '왜 이 사람이 이것을 갈망하는가'를 인지적으로 설명한다.",
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
        "cross": "MBTI 단독 완결. 8개 인지기능 각각의 핵심 질문(keyQuestion)은 MT_FUNCTIONS의 고유 필드다. 하나의 질문으로 존재를 압축하는 것은 사주의 물상적 압축(일간 이미지)과 질적으로 다른 접근 — 이미지가 아닌 질문으로의 압축이다.",
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
        "cross": "MBTI 단독 완결. 루프 개념은 인지기능 스택의 1번-3번 기능이 2번(부기능)을 건너뛰고 직결되는 MBTI 고유의 메커니즘이다(MT_METHODOLOGY.loopConcept). 부기능의 균형 역할이 사라지는 구조적 설명이 한줄에 구체적 반전을 넣는다.",
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
        "cross": "사주 단독 완결. 납음은 천간과 지지를 동시에 사용하여 일주 전체를 하나의 '소리의 기운'으로 변환하는 고유한 변환 체계다. 십성·격국·12운성 어디에도 환원되지 않는 독립적 해석 레이어.",
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
        "cross": "사주 단독 완결. 킬링포인트는 통변 공식의 모순적 공존, 교운기 임박, 5신 충돌 등 사주 내부의 다변수 교차에서 자동 생성된다. 단일 변수에서는 나올 수 없는 구조적 모순/반전이 핵심.",
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
        "cross": "사주 단독 완결. 용신 체계는 조후→통관→억부의 3단계 우선순위로 결정되는 사주 고유의 처방 시스템. 한줄 마무리에 실천적 방향을 넣는 유일한 구조.",
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
        "cross": "MBTI 단독 완결. 인지기능 성숙도(MT_MATURITY)는 같은 기능의 질적 차이를 3단계로 구분하는 MBTI 고유 구조다. 같은 유형이라도 성숙도에 따라 완전히 다른 한줄이 나온다는 것은 바넘 방지의 핵심 장치이기도 하다.",
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
        "cross": "사주 단독 완결. 오행 결핍은 천간4+지지4+지장간의 전체 오행 분포에서 산출되는 구조적 공백이다. '없는 오행'은 '약한 오행'과 질적으로 다르며(0.0 vs 0.3~0.7), 결핍의 절대성이 갈망의 강도를 결정한다.",
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
        "cross": "MBTI 단독 완결. 인지기능 축(axis)의 시소 역학이라는 고유 메커니즘에서 한줄의 뼈대가 나온다. 주기능과 열등기능의 대극적 긴장(MT_AXES[축].seesaw)은 MBTI 인지기능 이론에만 존재하는 구조다. 사주의 3축 압축(일간×격국×12운성)이 에너지적 존재 정의라면, 이것은 인지적 존재 정의다.",
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
        "cross": "MBTI 단독 완결. Linda Berens의 상호작용 스타일 모델(MT_INTERACTION_STYLES)은 인지기능 스택과 독립적으로 사회적 행동 양식을 분류하는 MBTI 확장 프레임워크다. 내적 정보처리(인지기능)가 아닌 외적 행동 양식이라는 별도의 차원을 한줄에 추가한다.",
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
        "cross": "사주 단독 완결. 통변 공식은 오행 상생상극 관계에서 파생되는 에너지 변환 패턴으로, 인지기능 스택의 정보처리 위계와는 메커니즘이 근본적으로 다르다.",
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
        "cross": "MBTI 단독 완결. MT_INTENSITY_PROFILES는 같은 선호(예: I) 내에서도 55/68/88의 3단계 스펙트럼으로 체감 차이를 구분하는 MBTI 고유 구조다. 같은 I라도 55와 88은 MT_INTENSITY_PROFILES.I.55.trait('내향이지만 큰 모임도 OK')과 MT_INTENSITY_PROFILES.I.88.trait('세상은 시끄럽고 내 방이 천국')으로 완전히 다른 존재다. 이것은 연속 스펙트럼에서의 위치 특정이며, 상대 체계의 이산적 분류(10일간, 12지지)와는 분류 원리가 근본적으로 다르다.",
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
        "cross": "단독 MBTI 패턴. 인지기능 축(axis)의 시소 역학에서 도출되는 보완 원리. 4개 축 각각에서 반대편 주기능자가 최적 보완자가 되는 16유형×16유형 매트릭스의 구조적 근거를 제공한다.",
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
        "cross": "원국 합충 구조만으로는 '에너지적 긴장의 크기'만 알고, 갈등 호환성만으로는 '인지적 갈등 대응 호환'만 안다. 교차하면 '이 사람에게 갈등 호환이 얼마나 중요한가'의 가중치를 에너지 구조에서 산출할 수 있다. 원국 충이 2개 이상인 사람에게는 P-TYPE-022의 impactScore가 사실상 8~9로 올라가고, 충이 없는 사람에게는 5로 내려간다.",
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
        "cross": "단독 사주 패턴. 단일 변수가 아니라 다변수 수렴/모순을 진단하는 메타 패턴. 이 모순 구조 자체가 '왜 연애가 반복적으로 실패하는가'를 설명하는 핵심 진단이다.",
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
        "cross": "단독 사주 패턴. '잘 맞는 타입'의 역(逆)으로, '절대 피해야 할 타입'을 구조적으로 지목하는 것은 사주의 처방론적 강점.",
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
        "cross": "단독 MBTI 패턴. 8개 인지기능 간 28가지 조합 각각의 시너지/갈등 패턴을 매트릭스로 제공. 두 사람의 주기능 조합만 알면 관계의 기본 역학을 즉시 예측할 수 있는 도구.",
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
        "cross": "단독 MBTI 패턴. 8종 관계 유형론은 Socionics에서 차용한 구조로, 단순히 '잘 맞는/안 맞는'이 아니라 '어떤 방식으로 잘 맞는/안 맞는'을 8가지로 분화하여 진단한다. MT_METHODOLOGY.socionicsAdaptation에서 MBTI 체계에 재매핑되었음을 명시.",
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
        "cross": "사주만의 '독이 되는 에너지 방향'(P-TYPE-013)과 MBTI만의 'dealbreaker+conflict 역학'은 각각 단면적이다. 교차하면 '왜 독인가'를 에너지(만나면 피곤) + 인지(소통 불가, 갈등 맹점 충돌) 양면에서 설명하여 경고의 설득력이 배가된다.",
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
        "cross": "납음만으로는 '존재적 조화'만, 기질만으로는 '소통적 조화'만 진단한다. 교차하면 '편안함의 두 층위(존재적/소통적)'를 동시에 진단하여 '왜 좋은데 뭔가 안 맞는' 또는 '왜 안 맞는데 같이 있으면 편한'이라는 미묘한 관계 경험의 원인을 설명한다.",
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
        "cross": "원국 합충 구조만으로는 '어떤 지지가 필요한가'만 알고, 관계 역학만으로는 '어떤 인지적 역학이 최적인가'만 안다. 교차하면 '이 지지를 가진 + 이 역학을 제공하는' 파트너로 프로필이 2차원으로 특정된다. 단, 특정 지지와 특정 MBTI 유형 간에는 직접 대응이 없으므로, 이 교차는 '확률적 수렴'이지 '결정론적 특정'이 아니다.",
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
        "cross": "단독 사주 패턴. 암합의 3층위 무의식 구조는 사주 고유의 개념으로, '본인도 모르는 끌림의 패턴'을 설명하는 유일한 변수.",
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
        "cross": "단독 MBTI 패턴. 16유형을 4개 기질 그룹으로 묶어 관계의 '기초 소통 호환성'을 진단한다. 인지기능 스택 분석이 개별 기능 수준이라면, 기질은 '대화의 기본 주파수가 맞는가'를 진단하는 상위 레이어.",
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
        "cross": "단독 MBTI 패턴. attract-dealbreaker-growthInLove의 삼각 구조가 '끌림→갈등→성장'의 전체 경로를 하나의 유형 프로필 안에서 예측한다. 사주의 P-TYPE-011(다변수 수렴/모순)과 구조적으로 유사하지만, 변수가 다르다.",
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
        "cross": "단독 사주 패턴. 오행 결핍론은 '왜 나와 완전히 다른 사람에게 끌리는가'를 구조적으로 설명한다.",
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
        "cross": "단독 사주 패턴. 용신론은 사주의 처방 체계이며, 파트너를 '개운 수단'으로 보는 독특한 관점을 제공한다.",
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
        "cross": "단독 사주 패턴. JEOKCHEONSU는 고전 적천수의 물상론으로, 10일간 각각의 파트너 필요를 자연물 비유로 설명하는 유일한 데이터.",
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
        "cross": "단독 사주 패턴. 12운성은 십성과 독립적인 '에너지 수준' 변수로, 같은 십성이라도 12운성에 따라 관계 질감이 완전히 달라진다.",
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
        "cross": "단독 사주 패턴. 육친론은 사주 고유의 '관계 에너지 매핑 체계'로, 십성을 인간관계로 변환하는 유일한 구조.",
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
        "cross": "단독 사주 패턴. 조후론은 사주 고유의 '기질 온도' 개념으로, 파트너 적합성을 기후 비유로 설명하는 유일한 체계.",
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
        "cross": "단독 사주 패턴. '어떤 타입이 맞는가'에서 '그 타입이 언제 나타나는가'로 확장하는 시간축 예측. 사주 고유의 삼합 메커니즘으로, 대운/세운의 지지 변화가 원국의 잠재적 삼합을 완성시키는 시점을 특정한다.",
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
        "cross": "단독 사주 패턴. 도화살은 12신살 중 매력/끌림에 특화된 신살로, 궁위별 분화가 '매력 수신 채널'이라는 고유한 관점을 제공한다.",
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
        "cross": "단독 사주 패턴. 신강도는 같은 십성이라도 필요한 파트너의 '강도'를 분화시킨다. 극신강에게 극신강 파트너는 충돌, 극신약에게 극신약 파트너는 무력.",
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
        "cross": "단독 사주 패턴. 배우자궁이라는 궁위론의 핵심 개념으로, 60일주마다 고유한 파트너 원형이 존재한다.",
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
        "cross": "단독 사주 패턴. P-TYPE-020(삼합 트리거)이 '특정 지지 에너지 파트너의 출현 시점'을 예측한다면, 이 패턴은 '특정 십성 에너지에 대한 끌림 강도의 연별 변동'을 예측한다. 삼합은 지지 메커니즘이고 세운 십성은 천간 메커니즘이므로 독립적 변수다. CROSS-TYPE-005(대운×발달)가 10년 단위 변동이라면 이것은 1년 단위 변동으로, 실질적 행동 예측에 더 적합하다.",
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
        "cross": "단독 사주 패턴. 통변 공식은 에너지 흐름의 '회로도'로, 파트너를 '회로에 꽂아야 할 부품'으로 보는 독특한 관점.",
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
        "cross": "단독 사주 패턴. 납음은 십성·오행·12운성과 독립적인 '60갑자 고유 물상 분류 체계'로, 파트너 조화를 자연물 비유로 설명하는 유일한 변수. 분석적이 아니라 직관적/상징적 수준의 파트너 적합성 진단.",
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
        "cross": "단독 사주 패턴. 파트너를 '성격'이 아니라 '에너지 구조의 퍼즐 조각'으로 보는 관점. 특정 지지를 가진 사람이 원국의 합을 완성시키거나 충을 가중시키는 구조적 예측이 가능하다.",
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
        "cross": "단독 MBTI 패턴. P-TYPE-014~018이 '이 사람에게 구조적으로 잘 맞는 유형'을 진단한다면, 이 패턴은 '이 사람과 갈등이 생겼을 때 관계가 살아남을 수 있는 유형'을 진단한다. 장기 관계에서 평소 궁합보다 위기 궁합이 관계 존속을 더 강하게 결정한다는 점에서 독립적 예측 가치가 있다.",
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
        "cross": "단독 MBTI 패턴. P-TYPE-014의 추상적 보완 원리('열등기능을 주기능으로 가진 파트너')를 일상적 의사결정 수준으로 구체화한다. '무엇을 빠뜨리는가'(blind)와 '무엇을 먼저 보는가'(flow ①)의 정확한 대응이 보완의 실제 작동 메커니즘을 보여준다.",
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
        "cross": "신강도만으로는 '어떤 에너지가 필요한가'만 알고, 상호작용 스타일만으로는 '어떤 방식으로 관계를 운영하는가'만 안다. 교차하면 '에너지 방향 + 운영 방식'의 조합으로 파트너 프로필이 2차원으로 정밀해진다.",
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
        "cross": "배우자궁 십성만으로는 '원하는 파트너'만 알고, 갈등 스타일만으로는 '위기 때 필요한 것'만 안다. 교차하면 '이 사람이 원하는 파트너가 위기 때도 맞는가'의 일관성을 진단한다. 모순이 발견되면 '끌리는 사람과 갈등 때 필요한 사람이 다르다'는 구조적 연애 난제를 설명할 수 있다.",
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
        "cross": "결핍 끌림(사주)과 열등기능 끌림(MBTI)이 수렴하면 '이 사람이 끌리는 타입'이 이중으로 확정되고, 모순하면 '끌림의 방향 혼란'이 이중으로 진단된다. 단독으로는 각각 한쪽만 보이지만, 교차하면 끌림의 건강성까지 양면에서 평가할 수 있다.",
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
        "cross": "사주 10변수만의 수렴/모순(P-TYPE-011)은 에너지 차원의 진단이고, MBTI 변수만의 attract/dealbreaker 모순(P-TYPE-017)은 인지적 차원의 진단이다. 교차하면 '에너지적으로 끌리는 방향'과 '인지적으로 끌리는 방향'이 같은지 다른지까지 진단하여, 모순의 위치를 '에너지 내부/인지 내부/에너지-인지 간'으로 세분화할 수 있다.",
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
        "cross": "대운 전환만으로는 '에너지적으로 지금 맞는 타입'만 변동하고, 인지기능 발달만으로는 '인지적으로 지금 끌리는 타입'만 변동한다. 교차하면 '이 시기에 에너지적으로도 인지적으로도 맞는 타입'을 동시에 특정하거나, '두 방향이 엇갈리는 시기'를 경고할 수 있다.",
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
        "cross": "대운 단독으로는 에너지 모드 전환만, 발달 단계 단독으로는 인지 성숙 방향만 알 수 있다. 교차하면 '이 시기에 이 에너지가 이 발달 과제와 만났을 때 어떤 직업적 결과가 나오는가'의 시간적 교차점이 드러난다. P-CHAR-042(성장 시기 교차 예측)의 직업 맥락 특화 버전이지만, 직업 적성에서는 구체적 커리어 전환 판단에 직접 적용된다.",
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
        "cross": "조후론 단독으로는 에너지 온도만, 기질 단독으로는 심리적 욕구만 알 수 있다. 교차하면 '이 온도에서 이 욕구가 어떻게 발현되는가'의 구체적 환경 처방이 나온다. 특히 모순 조합에서 단독 체계의 처방이 충돌할 때, 양쪽을 모두 만족시키는 '좁은 최적해'를 찾을 수 있다.",
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
        "cross": "개별 교차 패턴(CROSS-WORK-001~007)은 각각 2개 변수의 교차만 보지만, 이 통합 프레임은 전체 교차점의 수렴 밀도를 메타 수준에서 진단한다. 밀도가 높을수록 처방의 구체성이 올라가고, 낮을수록 유연성이 필요하다는 것은 어느 단독 교차에서도 나올 수 없는 메타 통찰이다. '이 사람에게 확정적 직업 조언이 가능한가 아닌가'를 결정하는 것 자체가 상담의 첫 번째 판단이다.",
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
        "cross": "용신 직업 방향 단독으로는 '어떤 업종'만, 기질 단독으로는 '어떤 환경 질'만 알 수 있다. 교차하면 '이 업종에서 이 질의 환경을 찾아라'는 구체적 처방이 나온다. CROSS-WORK-004(조후 × 기질)보다 용신이 직업 처방 변수로서 더 직접적이고 구체적이므로, 조후 교차보다 실무적 가치가 높다. 20개 조합이 각각 구체적 직업 리스트를 생산한다.",
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
        "cross": "두 체계가 독립적으로 도출한 직업 적성이 수렴하면 확신이 2배가 되고, 모순되면 단독 체계로는 설명할 수 없는 내적 갈등의 구조가 드러난다. 수렴 시에는 구체적 직업군까지 좁힐 수 있고, 모순 시에는 '왜 이 사람이 직업 선택에서 항상 갈등하는가'의 구조적 답이 된다.",
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
        "cross": "사주 단독 완결. 조후론은 궁통보감(穹通寶鑑) 기반의 120개 테이블(JOHU[일간][월지])에서 도출되며, 같은 일간이라도 태어난 달에 따라 필요한 직업 환경이 정반대가 된다. 이것은 격국이나 십성으로는 포착할 수 없는 '기저 온도'의 차원이다.",
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
        "cross": "사주 단독 완결. 신강도는 자기편(비겁+인성) vs 상대편(식상+재성+관성) 비율이라는 객관적 수치에서 도출된다. 같은 정관격이라도 극신강 정관격='조직 내 독재적 리더'이고 극신약 정관격='좋은 상사 밑에서 꽃피는 직원'이다. 격국(P-WORK-001)과 조합하면 직업 표현의 강도와 방향이 세밀하게 분화된다.",
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
        "cross": "사주 단독 완결. 오행 순환 단절은 직업적 능력이 '왜 중간에 끊기는가'를 구조적으로 설명하는 유일한 프레임워크다. 재능이 있는데 성과가 안 나오는 사람에게 '어디서 끊기는가'를 정확히 지목한다.",
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
        "cross": "MBTI 단독 완결. MT_DECISION_PROCESS.blind는 '왜 이 사람이 업무에서 같은 실수를 반복하는가'의 인지적 구조를 정확히 지목한다. 4번째(열등기능) 고려 사항은 '마지못해' 사용되므로 시간 압박이 있는 업무 환경에서 구조적으로 누락된다.",
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
        "cross": "사주 단독 완결. SJ_JOB_APTITUDE의 12개 SS/SW 조합은 천간+지장간 가중치를 포함한 실수값 십성 비중에서 도출되므로 정밀도가 높다. 격국(P-WORK-001)이 '어떤 역할인가'를 보여준다면, 이 패턴은 '구체적으로 어떤 직업군인가'를 지목한다.",
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
        "cross": "사주 단독 완결. 격국은 월지 정기라는 객관적 천문 데이터에서 도출되며, 10종 격국 × 성격/패격 분기로 직업적 역할의 뼈대를 결정한다. JAPYEONG_GG의 breaks 배열이 '왜 재능이 직업으로 안 이어지는가'의 구조적 원인을 지목한다.",
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
        "cross": "사주 단독 완결. 투출 개념은 지장간 3겹 구조(ST5_JIJANGGAN_LAYERS)의 실무적 적용이다. 직업 적성 진단에서 '왜 재능이 있는데 쓰지 못하는가'의 구조적 답을 제공한다.",
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
        "cross": "사주 단독 완결. 시간축 변화는 사주의 고유한 차별점이다. 같은 사람이 20대(식상 대운)에는 크리에이터로 빛나다가 30대(관성 대운)에는 조직 안에서 시련을 겪는 것을 구조적으로 설명한다. DW_SIPSUNG_KW가 신강/신약에 따라 같은 대운 십성도 다른 체감을 만드는 것까지 세분화한다.",
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
        "cross": "사주 단독 완결. 5신 용신 방향은 격국·십성과 독립적인 제3의 직업 축이다. 격국='역할 원형', 십성='구체적 직업군', 용신='직업 에너지 환경'이라는 3축이 겹쳐야 가장 정밀한 직업 처방이 나온다. META-WORK-001의 4계층에 '용신 에너지 방향'이라는 추가 레이어가 생긴다.",
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
        "cross": "사주 단독 완결. 원국 합충의 직업궁 영향은 사주 고유의 구조적 진단이다. 격국(P-WORK-001)이 '어떤 직업인가'를, 이 패턴은 '그 직업이 안정적인가 불안정한가'를 결정한다. 같은 식신격이라도 월지에 충이 있으면 '창작 분야에서 자주 바뀜'이고, 합이 있으면 '한 분야에서 꾸준히 쌓음'이다.",
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
        "cross": "MBTI 단독 완결. 상호작용 스타일은 '같은 직업 안에서도 어떤 역할에 배치되어야 하는가'를 결정한다. 같은 마케팅 팀이라도 in-charge는 팀장, behind-the-scenes는 전략가, get-things-going은 대외 커뮤니케이션, chart-the-course는 프로젝트 매니저가 최적이다.",
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
        "cross": "사주 단독 완결. 60일주는 천간(10)+지지(12)의 조합으로 같은 격국 안에서도 개인차를 만든다. ILJU_DATA의 job, ILJU_KW의 core, JEOKCHEONSU의 work가 삼중으로 직업 방향을 세밀하게 지목한다.",
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
        "cross": "MBTI 단독 완결. 인지기능 스택은 '무엇이 자연스러운 도구이고 무엇이 에너지를 과도하게 소모하는가'를 구조적으로 설명한다. MT_FUNCTIONS의 energyCost 개념(MT_STACK_POSITIONS.dominant.energyCost='가장 적은 에너지로 가장 큰 효과' vs inferior.energyCost='극도로 높은 에너지 소모')이 직업적 지속가능성을 결정한다. 열등기능을 주로 사용하는 직업은 단기간 가능하지만 장기 소진이 구조적으로 예정되어 있다.",
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
        "cross": "MBTI 단독 완결. MT_STRESS_STAGES의 5단계 모델(정상→경미→루프→그립→회복)이 직업적 번아웃의 진행 과정을 인지기능 역학으로 설명한다. stage3_loop.intervention='부기능을 의식적으로 사용하는 활동'이 직업적 번아웃 초기 개입의 구체적 처방을 제공한다.",
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
        "cross": "MBTI 단독 완결. MT_CONFLICT_STYLES.blindSpot이 '왜 이 사람이 직장에서 같은 마찰을 반복하는가'의 인지적 사각지대를 정확히 지목한다. 이것은 성격이나 의지가 아니라 인지기능 구조의 문제다.",
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
        "cross": "MBTI 단독 완결. Jung의 개성화(individuation) 이론에 기반한 발달 시간축은 '같은 사람이 나이에 따라 다른 직업 환경을 필요로 하는 이유'를 구조적으로 설명한다. 단, 상대 체계의 대운(P-WORK-005)도 10년 단위 시간축 변화를 다루므로, 교차 가능성은 2턴에서 탐색하겠다.",
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
        "cross": "MBTI 단독 완결. 기질론은 '같은 직업이라도 어떤 환경에서 하느냐'에 따라 성과가 극적으로 달라지는 이유를 설명한다. NF 기질의 프로그래머가 의미 있는 프로젝트(NGO 시스템)에서는 빛나지만 의미 없는 반복 유지보수에서는 소진되는 것은 코딩 능력이 아니라 기질 욕구의 문제다.",
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
        "cross": "사주 단독 완결. 월간은 직장에서의 '업무용 나'를 결정하는 가장 직접적인 변수다. 일간(진짜 나)과 월간(직장의 나)이 다르면 '직장에서 연기하는 느낌'이 생기고, 같으면 '자연스러운 직업 생활'이 된다.",
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
        "cross": "사주 단독 완결. 통변 공식은 십성 비중의 수학적 조합에서 감지되며, 직업적 행동 패턴의 '왜'를 구조적으로 설명한다. 비겁탈재가 있는 사람은 동업할 때마다 돈이 새는 패턴을 반복하는데, 이것은 성격이 아니라 에너지 구조의 문제다.",
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
        "cross": "MBTI 단독 완결. 4축 강도는 유형 분류를 넘어서 개인차를 포착하는 핵심 변수다. MT_INTENSITY_PROFILES.burn이 '어떤 환경에서 소진되는가'를 강도별로 세분화한다. T88.burn='감정적 동료와의 강제 협업 시 소진', F88.burn='감정적으로 안전하지 않은 환경에서 신체 증상' — 이 차이가 같은 유형 내에서도 팀 배치를 달리해야 하는 이유다.",
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
        "cross": "월지 충 단독으로는 '직업이 잦게 바뀐다'만 알 수 있고, 상호작용 스타일 stress 단독으로는 '이 상황에서 소진된다'만 알 수 있다. 교차하면 '직업 변동이 이 사람의 인지적 스트레스 트리거를 정확히 어떻게 발동시키는가'의 구체적 경로가 나온다. chart-the-course에게 직업 변동은 존재론적 위협이지만 get-things-going에게는 새 시작의 기회가 될 수도 있다 — 같은 월지 충이라도 인지 구조에 따라 위기인지 기회인지가 갈린다.",
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
        "cross": "통변 흉공식 단독으로는 '무엇이 반복되는가'만 알 수 있고, 의사결정 blind 단독으로는 '무엇을 빠뜨리는가'만 알 수 있다. 교차하면 '이 에너지 구조가 이 인지적 사각지대를 통해 어떤 구체적 실패로 이어지는가'의 경로가 드러난다. 처방도 이중 — 에너지 구조를 바꿀 수는 없지만, 인지적 사각지대를 의식적으로 보완하면 같은 에너지 구조에서도 실패를 줄일 수 있다.",
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
        "cross": "신강도 단독으로는 '에너지 크기'만, 상호작용 스타일 단독으로는 '운용 방식'만 알 수 있다. 교차하면 '이 크기의 에너지를 이 방식으로 쓸 때 어떤 일이 발생하는가'의 구체적 조합이 나온다. 특히 모순 조합(③④)은 단독 체계에서 예측할 수 없는 직업적 긴장을 드러낸다.",
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
        "cross": "패턴 1(천간합)이 양자 간 1:1 끌림의 이중 공명이라면, 패턴 9는 '함께 있을 때 둘 다 더 커지는' 시너지 끌림이다. 사주 단독으로는 삼합이 관계의 질감인지 단순히 오행 에너지 증폭인지 구분이 안 되고, MBTI 단독으로는 기능 커버율이 관계 만족도와 직결되는지 불확실하다. 교차시켜야 '이 시너지가 끌림으로 체험되는 구조인지 단순히 효율적인 파트너십인지'가 구분된다. 삼합+고커버율이면 '운명적 팀'의 느낌, 삼합+저커버율이면 '에너지는 공명하는데 소통이 어려운' 역설이 생긴다.",
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
        "cross": "천간합은 '에너지적 인력'이고 인지기능 상보성은 '정보처리적 보완'이다. 둘 다 단독으로는 한 차원의 끌림만 설명하지만, 교차하면 '에너지적으로도 인지적으로도 반대편에서 끌리는' 이중 공명 구조가 드러난다. 이 이중 공명이 있을 때만 '설명 불가능한 운명적 끌림'이라는 체험이 성립한다.",
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
        "cross": "오행 보완은 에너지 균형의 충족이고, 열등기능 커버는 정보처리 약점의 충족이다. 단독으로는 각각 '에너지적 편안함' 또는 '인지적 안정감'만 설명하지만, 교차하면 '완전해지는 느낌'의 전체 구조가 드러난다. 두 보완이 같은 방향인지 다른 방향인지가 보완 효과의 체감 크기를 결정하며, 이는 교차 없이 알 수 없다.",
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
        "cross": "용신 교차는 '에너지적 필요의 충족'이고, 인지기능 약점 보완은 '정보처리적 필요의 충족'이다. CHEM-002(오행 부족 보완 × 열등기능 커버)와 유사하지만, 002는 부족오행(결핍)을 채우는 것이고 005는 용신(핵심 필요)을 채우는 것이라는 점에서 다르다. 부족오행은 '없는 것'이고 용신은 '가장 필요한 것'이다. 부족오행이 채워지면 '편하다'이고 용신이 채워지면 '살아난다'이다. 이 차이가 끌림의 강도를 결정한다.",
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
        "cross": "12운성 조합은 '에너지 리듬의 궁합'이고 J/P 조합은 '생활 리듬의 궁합'이다. 단독으로는 각각 추상적 수준에서만 맞다/안 맞다를 말하지만, 교차하면 '구체적으로 데이트를 어떻게 하고 연락을 어떻게 하는가'의 패턴이 결정된다. 12운성이 같은 방향인데 J/P가 다르면 '에너지는 맞는데 속도가 안 맞는' 구조, J/P가 같은데 12운성이 다르면 '속도는 맞는데 에너지가 안 맞는' 구조가 된다.",
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
        "cross": "신강도는 '에너지 볼륨과 자기 주장의 강도'이고, 상호작용 스타일은 '관계에서 목표를 달성하는 방식'이다. 에너지 볼륨이 큰데(신강) 상호작용 스타일도 주도적이면(in-charge) 썸에서 '밀어붙이는' 접근이 되고, 에너지는 큰데(신강) 스타일이 behind-the-scenes이면 '강한 에너지를 뒤에서 운용하는' 전략적 접근이 된다. 두 사람의 조합에서 이 교차가 '자연스러운 배분'인지 '권력 다툼'인지를 결정한다.",
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
        "cross": "사주 오행 관계는 '에너지의 흐름 방향'(상생=자연스러운 흐름, 상극=제어/긴장)이고, MBTI 기질 조합은 '핵심 욕구의 충돌/공명'이다. 에너지가 자연스럽게 흐르는데(상생) 핵심 욕구도 공명하면(NF×NF) 끌림이 즉각적이고 자연스럽다. 에너지는 긴장인데(상극) 핵심 욕구는 공명하면 '자극적이지만 편한' 묘한 끌림이 된다. 교차에서만 끌림의 '질감'(자연스러운/자극적인/안정적인/긴장되는)이 결정된다.",
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
        "cross": "천간합(패턴1)이 '자연스럽게 하나가 되는' 끌림이라면, 천간충은 '부딪혀서 불꽃이 튀는' 끌림이다. 사주 단독으로는 충이 끌림인지 거부인지 판단하기 어렵고, MBTI 단독으로는 그립 자극이 매력인지 위협인지 판단하기 어렵다. 교차시켜야 비로소 '이 충돌이 성장의 촉매인지 파괴의 시작인지'가 결정된다. 특히 충+그립 자극이 양방향이면 소진 속도와 변화 속도가 모두 극대화되는 고유한 역학이 나온다.",
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
        "cross": "대운 동기화는 '시간적 에너지 흐름'의 일치이고, 인지기능 발달 동기화는 '정신적 성장 방향'의 일치이다. 대운만 보면 에너지는 맞는데 성장 방향이 다를 수 있고, 인지 발달만 보면 성장 방향은 같은데 에너지적으로 힘든 시기일 수 있다. 교차해야 '지금 이 시기에 함께 성장할 수 있는가'라는 시간적 궁합의 전체 그림이 나온다.",
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
        "cross": "사주의 충·형·해는 '어디서 부딪히는가'를 알려주고, MBTI T/F는 '어떻게 아파하는가'를 알려준다. 사주 단독으로는 마찰의 위치만 보이고, MBTI 단독으로는 갈등 처리 스타일만 보인다. 교차하면 '일지 인신충인데 TF 쌍이면 → B의 직업적 이동을 A가 감정적으로 배신으로 해석'처럼 구체적 시나리오 예측이 가능해진다.",
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
        "cross": "사주 신강도는 '누가 밀어붙이는가'의 에너지 볼륨을 결정하고, MBTI E/I+T/F는 '갈등이 어디로 흘러가는가'의 경로를 결정한다. 단독으로는 볼륨만 보이거나 경로만 보이지만, 교차하면 '극신강+EF × 신약+IT = A가 감정적으로 밀어붙이면 B는 조용히 냉소적으로 관계를 평가하다가 갑자기 차단'이라는 구체적 궤적이 보인다.",
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
        "cross": "사주 격국은 '무엇이 충돌하는가'(표현 vs 통제, 창의 vs 질서)를 보여주고, J/P는 '그 충돌이 일상에서 어떤 빈도로 발현되는가'를 결정한다. 격국이 상극이어도 J/P가 충돌을 완화하면 일상적 마찰은 낮고, 격국이 중립이어도 JJ/PP 조합이 리듬 차이를 만들면 의외의 마찰이 생긴다.",
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
        "cross": "CHEM-003이 '리듬이 맞으면 끌림이 강해진다'였다면, 이것은 '리듬이 안 맞으면 어디서 마찰이 생기는가'이다. 12운성은 '에너지 볼륨의 차이'를 보여주고, J/P는 '그 차이를 일상에서 어떻게 경험하는가'를 결정한다. 끌림의 반대편.",
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
        "cross": "HATE-001이 '0 or 1'의 거부 반응이라면, 이것은 '서서히 쌓이는 0.3씩의 마찰'이다. 사주의 상극 방향은 '어떤 에너지가 어떤 에너지를 누르는가'를 보여주고, MBTI의 열등기능은 '어디가 취약한가'를 보여준다. 두 취약점이 겹치면 만성 스트레스, 겹치지 않으면 완충 가능.",
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
        "cross": "MBTI의 blindSpot은 '본인이 모르는 자기 약점'이고, 사주의 마찰 에너지는 '관계에 내재된 구조적 긴장'이다. 둘이 교차하면 '구조적 긴장이 있는데 자기 맹점이 그걸 감지하지 못하거나 악화시킨다'는 이중 맹점이 만들어진다. 사주 단독으로는 마찰의 존재만 알 수 있고, MBTI 단독으로는 맹점의 존재만 알 수 있다. 교차하면 '이 사람은 이 방향의 마찰을 자각하지 못한 채 악화시킬 것이다'라는 구체적 경고가 가능해진다.",
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
        "cross": "Ne 주기능자(ENFP, ENTP)는 '가능성 탐색'으로 여러 사람을 동시에 탐색하므로 사주 타이밍이 열려도 '하나로 수렴'하기 어렵다. 반면 Ni 주기능자는 타이밍이 열리면 단 한 사람에게 강력하게 수렴한다. 이 차이는 사주 타이밍이라는 동일한 변수에 대한 인지적 반응 방식의 구조적 차이다. 사주만으로는 왜 같은 타이밍에 어떤 사람은 한 명에게 올인하고 어떤 사람은 여전히 탐색 중인지 설명 못하고, MBTI만으로는 왜 갑자기 Ni의 확신이 이 시기에 발동했는지 설명 못한다.",
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
        "cross": "ANTI-004는 '기대를 배반하면 역효과'라는 부정적 방향이었다. 여기서는 '기대에 부합하면 사귀기가 얼마나 수월해지는가'라는 긍정적 방향이다. 같은 변수 교차지만 방향이 반대여서 별도 패턴으로 가치가 있다. 또한 여기서는 '정합하지 않을 때 어떤 의식적 조율이 필요한가'라는 처방적 차원이 추가된다.",
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
        "cross": "사주 단독으로는 '올해 연애 인연이 열린다'만 말할 수 있고, MBTI 단독으로는 'J는 빨리 정의하고 P는 천천히'만 말할 수 있다. 교차하면 '올해 인연이 열리는데, J-J 쌍이면 3개월 내 사귀고, P-P 쌍이면 그 해를 넘길 수도 있고, J-P 쌍이면 J가 주도하되 P의 유보가 긴장을 만든다'는 구체적 시나리오가 나온다.",
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
        "cross": "사주 궁합 단독으로는 '2026년이 최고의 해'만 알려주고, MBTI 단독으로는 'EJ는 적극적, IP는 소극적'만 말한다. 교차하면 '2026년이 최고의 해인데, IP-IP 쌍이면 그 해에 공통 친구의 소개나 이벤트 참여 같은 외부 촉매를 의식적으로 만들어야 한다'는 실행 시나리오가 나온다.",
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
        "cross": "CHEM-004에서 '함께 성장하는 느낌'으로 끌림의 맥락에서 다뤘다면, 여기서는 '관계 성립의 구조적 전제 조건'으로 재해석한다. 끌림이 있어도 대운이 엇갈리면 사귀기 어렵고, 끌림이 약해도 대운이 동기화되면 자연스럽게 관계가 형성된다는 새로운 축이다.",
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
        "cross": "사주 단독으로는 '교운기에 전환이 온다'만 말하고, MBTI 단독으로는 'E는 외향적, I는 내향적'만 말한다. 교차하면 '교운기에 E88은 새 인연을 적극적으로 만나 관계가 성립하지만, I88은 같은 시기에 내면 정리에 몰두하여 인연을 인식하지 못하므로, I88의 교운기에는 천천히 반복적으로 존재감을 노출시키는 전략이 필요하다'는 실전 타이밍 전술이 나온다.",
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
        "cross": "J/P 축의 계획-유연 차이(TIMING-001)와 달리, Fi-Te 축은 '무엇을 먼저 확인하는가'라는 의사결정 순서의 차이다. J/P는 관계 정의의 속도를 결정하지만, Fi-Te는 관계 정의의 내용(가치적 확신 vs 행동적 실행)에서 시간차를 만든다. 사주 타이밍이 같은 시점에 열려도, Fi 주기능자는 '마음은 정해졌는데 말을 못하는' 상태이고, Te 주기능자는 '말은 했는데 감정은 나중에 따라오는' 상태다. 이 비대칭은 J/P 축만으로는 포착할 수 없다.",
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
        "cross": "신살 단독은 A에게 매력 에너지가 있다는 사실만 알려주고 B가 그것을 어떻게 체험하는지 알 수 없다. 지각 기능 단독은 B의 일반적 인식 방식만 알려주고 A의 구체적 매력에 대한 반응은 알 수 없다. 교차해야 'B가 A의 매력을 감각적/익숙한/가능성적/직감적 중 어떤 채널로 수신하는가'가 결정된다. LOVE-004(홍염살 × 주기능)가 A 자신의 매혹 발산 방식을 다뤘다면, 이 패턴은 수신자 B의 지각 방식에 초점을 맞춘다.",
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
        "cross": "B→A 십성 단독으로는 '에너지 유형'만 알 수 있고 B가 그것을 어떤 방식으로 수신하는지 알 수 없다. MBTI 주기능 단독으로는 일반적 인식 패턴만 알 수 있고 A라는 특정 에너지에 대한 반응은 알 수 없다. 교차해야 'B가 A를 구체적으로 어떻게 인식하는가'가 결정된다. 십성이 인식의 내용을, 주기능이 인식의 방식을 결정하는 구조.",
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
        "cross": "년간 오행 단독은 첫인상의 에너지 유형만 알려주고, 실제 행동 패턴은 알 수 없다. E/I 단독은 일반적 사교 방식만 알려주고, B가 A에게 기대하는 첫인상과의 괴리는 알 수 없다. 교차해야 '첫인상 역전'이라는 썸 초기 핵심 경험이 설명된다.",
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
        "cross": "월간 십성 단독은 사회적 에너지 방향만 알려주고 구체적 표현 방식은 알 수 없다. 부기능 단독은 의식적 도구만 알려주고 사주적 사회적 역할과의 일관성/불일치를 알 수 없다. 교차해야 B가 A를 사회적 장면에서 '일관되게 읽을 수 있는가 vs 혼란스러운가'가 결정된다.",
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
        "cross": "신강도 단독은 A의 객관적 존재감 볼륨만 알려주고 B가 그것을 어떻게 수신하는지 알 수 없다. B의 E/I 단독은 일반적 에너지 수신 방식만 알려주고 A의 구체적 볼륨에 대한 반응은 알 수 없다. 교차해야 'B가 A의 존재감을 어떻게 체험하는가 — 압도/동등/보호/무관'이 결정된다.",
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
        "cross": "사주의 원진살은 '이유 없는 밀어냄'이라는 독특한 관계 역학을 제공하고, MBTI 인지기능 축 불일치는 '같은 영역인데 방향이 다른 답답함'을 제공한다. 교차하면 이 '이유 없는 거부감'의 실체가 이중으로 설명된다 — 에너지적으로도 밀어내고 인지적으로도 어긋나므로, 둘 다 논리적인데 결론이 다르고, 둘 다 감성적인데 감동 포인트가 다르다. 사주 단독으로는 '원진이니 안 맞아'이고, MBTI 단독으로는 '축이 달라서 안 맞아'인데, 교차하면 '이 사람이 구체적으로 어떤 순간에 밀어내는 느낌을 받는가'가 특정된다.",
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
        "cross": "LOVE-009는 부족한 오행 방향의 회피(기신=나에게 해로운 에너지)이고, 이 패턴은 과잉 오행 방향의 포화 거부다. 두 체계가 같은 방향(과잉 오행의 열등기능도 해당 영역)을 가리킬 때 거부 강도가 극대화된다는 구조적 교차가 핵심. 사주 단독으로는 '화 과다면 화 에너지를 가진 상대가 불편하다'까지만 말할 수 있고, MBTI 단독으로는 '열등기능을 자극하면 불편하다'까지만 말할 수 있지만, 교차하면 '어떤 구체적 행동이 이 사람을 폭발시키는가'가 특정된다.",
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
        "cross": "사주 단독으로 겁재 과다는 '소유욕과 경쟁심이 강한 사람'이라는 것만 알려주고, 어떤 영역의 침범이 가장 민감한지는 말해주지 못한다. MBTI 단독으로 T/F는 판단 방식의 차이만 알려준다. 교차하면 '이 사람의 영역 방어가 논리 영역인지 감정 영역인지'가 특정되고, 선호 강도에 따라 '참을 수 있는 불편인지 폭발적 거부인지'가 결정된다. 겁재+양인+T(88)면 '자기 결정을 뒤집는 사람에게 칼같이 돌아서는' 패턴이 되고, 겁재+F(55)면 '가치관 폄하에 서운해하지만 참는' 패턴이 된다.",
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
        "cross": "LOVE-006(배우자궁 십성 교차 × 인지축 조화도)은 끌림 단계의 구조였지만, 이 패턴은 사귄 후 일상에서 '기대 충족/좌절'의 반복 역학을 다룬다. 단독으로 배우자궁 십성만 보면 '정재=안정 추구'라는 일반론에 머물고, MBTI만 보면 소통 스타일만 나온다. 교차해야 '정재 기대 + IF 상대 = 조용한 헌신으로 충족' vs '정재 기대 + ET 상대 = 적극적이지만 감성 부족으로 불만' 같은 구체적 커플 역학이 나온다.",
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
        "cross": "CHEM-004는 성장 동기화의 끌림이었다면, 이 패턴은 비동기화의 체감 강도이다. 사주의 대운 방향이 '어느 쪽으로 성장하는가'를, MBTI의 J/P 쌍이 '그 엇갈림을 얼마나 불편하게 느끼는가'를 결정한다. 단독으로는 사주는 '성장 방향의 객관적 엇갈림'만, MBTI는 '계획 불일치의 주관적 불편'만 보이지만, 교차하면 '객관적으로 같은 방향인데 J/P 차이로 체감이 다른 경우'와 '객관적으로 다른 방향인데 P/P라서 못 느끼는 경우'라는 역설적 조합이 드러난다.",
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
        "cross": "CHEM-007은 썸에서 '누가 먼저 다가가나'였다면, 이 패턴은 관계 안정화 후 '누가 결정하고 누가 따르나'의 일상 역학이다. 사주의 에너지 강도가 '원형적 주도력'을, MBTI의 상호작용 스타일이 '구체적 소통 방식'을, J/P가 '계획 영역의 주도권'을 각각 결정하여 삼중 분화가 일어난다. 단독으로는 사주는 에너지 크기만, MBTI는 소통 방식만 보여주지만, 교차하면 '에너지는 큰데 소통은 뒤에서 조율하는 사람(신강+behind-the-scenes)'이라는 역설적 커플 역학이 드러난다.",
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
        "cross": "CHEM-002는 개인의 부족을 상대가 채우는 '보완'의 끌림이고, COUPLE-003은 그 보완이 '의존'으로 변질되는 장기 리스크다. 이 패턴은 그 둘과 완전히 다른 질문을 던진다 — '보완한 후에도 커플 단위로 여전히 빈 구멍이 있는가?'. 개인 수준에서는 서로 채워줘도 커플 단위에서는 공유 맹점이 존재할 수 있다. 이것은 두 체계(오행 5행 + 인지기능 8개)가 독립적으로 '전체 커버율'이라는 동일한 질문을 던지는 구조적 교차이다.",
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
        "cross": "CHEM-002는 '보완=끌림'이었다면, 이 패턴은 '보완=의존 위험'이라는 시간축의 전환이다. 사주의 오행 보완이 에너지 차원의 의존을, MBTI의 열등기능 대행이 심리적 성장 차원의 의존을 각각 만드는데, 둘이 같은 방향이면 의존이 이중화된다. 단독으로는 사주는 '에너지 의존'만, MBTI는 MT_AXES의 시소 역학에서 '기능 미발달'만 보이지만, 교차하면 '에너지도 부족하고 그 기능도 미발달인 영역을 상대가 전부 커버해주는' 완전한 의존 구조가 드러난다. 이것은 MT_DEVELOPMENT_STAGES의 개성화(individuation) 과정을 관계가 대체해버리는 위험이다.",
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
        "cross": "ADJUST-001이 '같은 충이 T/F에 따라 다른 상처를 만드는 구조'였다면, 이 패턴은 '갈등 스타일 쌍 전체의 역학 + 마찰 궁위가 특정하는 싸움의 영역'이다. MBTI 단독으로는 MT_CONFLICT_STYLES가 두 유형의 싸움 방식을 보여주지만 '무엇을 두고 싸우는가'는 모른다. 사주 단독으로는 마찰 궁위가 갈등 영역을 보여주지만 '어떤 방식으로 싸우는가'는 모른다. 교차하면 '내밀한 영역(일지 충)에서 INFP-ESTJ 스타일로 싸우는 커플 — 참다가 폭발하면 가장 아픈 곳을 치는 구조'라는 구체적 커플 역학이 드러난다.",
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
        "cross": "사주가 '어디서 마찰이 나는지' 궁위를 지목하고, MBTI가 '왜 A가 거기서 계속 같은 실수를 하는지' 반복 메커니즘을 설명한다. ET는 일지충에서 직접 부딪혀 상처를 키우고, IF는 월지충에서 침묵으로 갈등을 축적한다. 결합 시 반복 역효과의 전체 경로(지뢰 위치+밟는 방식+반복 이유)가 단일 구조로 드러난다.",
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
        "cross": "사주 단독으로 양인살/겁재의 영역 방어 본능을 파악하고, MBTI 단독으로 A의 접근 강도를 파악한다. 교차의 고유 가치는 E 접근과 I 접근이 양인살을 건드리는 방식이 질적으로 다르다는 점. E는 직접 충돌(칼날에 손을 대는 격), I는 간접 의심(칼날이 어디 있는지 모르고 돌아다니는 격). 단독 분석으로는 이 미세한 접근 강도 조절이 불가능.",
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
        "cross": "사주 단독으로는 기신 자극 시 불쾌 반응을 예측하고, MBTI 단독으로는 열등기능 자극 시 방어적 퇴행을 예측한다. 교차 시 두 지뢰가 같은 방향이면 폭발력이 극대화되고(이중 직격), 다른 방향이면 지뢰밭이 넓어져 A가 피해야 할 영역 자체가 분산된다. 이 구조적 매핑이 어느 한쪽만으로는 파악 불가능한 고유 가치.",
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
        "cross": "사주 단독으로 기신 진입 시기를 예측하고, MBTI 단독으로 스트레스 시 퇴행 패턴을 예측한다. 교차의 고유 가치는 시간축(사주)과 심리 메커니즘(MBTI)의 결합. 기신 진입기에 그립이 동시에 활성화되면 B의 방어막이 이중으로 올라가므로, 평소라면 괜찮았을 A의 행동도 역효과가 되는 시기적 역효과 구조가 드러난다. 시기와 메커니즘의 결합은 어느 한쪽만으로 불가능.",
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
        "cross": "사주 단독으로 A의 반복 행동 패턴을 파악하고, MBTI 단독으로 B의 스트레스 취약점을 파악할 수 있다. 교차의 고유 가치는 A의 자연스러운 행동이 B의 가장 약한 지점을 찌르는 구조적 경로를 발견하는 것. 이것은 어느 한쪽의 문제가 아니라 두 사람 사이의 구조적 역효과이며, 단독 분석으로는 이 관계 특유의 독성 경로를 짚을 수 없다.",
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
        "cross": "사주 단독으로 B의 연인 기대치를 읽고, MBTI 단독으로 A의 자연스러운 행동 기질을 파악한다. 교차의 고유 가치는 A의 기본값과 B의 기대값 사이의 구조적 불일치를 발견하는 것. 이것은 A가 잘못한 것이 아니라 두 체계가 가리키는 방향이 교차하면서 발생하는 관계 특유의 역효과이며, 한쪽 분석만으로는 '왜 이 사람에게만 역효과인가'를 설명할 수 없다.",
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
        "cross": "홍염살 단독으로는 '뜨거운 매력이 있다'는 정보만 제공. 인지기능 단독으로는 인식/판단 방식만 제공. 교차하면 '뜨거운 매력의 구체적 질감'이 결정된다 — 같은 홍염살이라도 Se면 육체적, Ni면 신비적, Fe면 정서적, Ti면 지적으로 완전히 다른 매혹이 된다. 이것은 썸 상대의 '어떤 점이 끌리는가'를 구체적으로 설명할 수 있는 유일한 교차.",
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
        "cross": "도화살 단독으로는 '매력이 있다/어느 영역에서 발산된다'까지만 알 수 있다. E/I 단독으로는 에너지 방향만 안다. 교차하면 '이 사람의 매력이 적극적으로 표출되는가 vs 은근히 스며드는가'가 결정된다. 일지 도화+I는 사주만 보면 '매력적인 사람'인데 MBTI만 보면 '조용한 사람'이라 모순처럼 보이지만, 실제로는 '조용한데 묘하게 끌리는 사람'이라는 독특한 패턴.",
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
        "cross": "십성 교차만으로는 에너지 역학적 끌림만 알고, 인지 차원의 끌림은 모른다. 인지기능 상보성만으로는 인식/판단 차원 끌림만 알고, 에너지 역학적 구조를 모른다. 교차하면 '에너지적으로도 인지적으로도 끌리는 쌍방향 구조'인지 '한 차원에서만 끌리는 일방적 구조'인지를 구별할 수 있다. 십성 좋고 인지도 상보적이면 최강 궁합, 십성 좋은데 인지가 동일하면 안정적이지만 밋밋한 궁합.",
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
        "cross": "오행 상생/상극만으로는 에너지 역학의 방향만 알고, 그것이 행동으로 어떻게 나타나는지 모른다. E/I만으로는 에너지 방향만 알고, 왜 그 방향인지의 구조적 이유를 모른다. 교차하면 '이 사람이 왜 이런 방식으로 다가오는가(또는 못 다가오는가)'의 구조적 설명이 가능해진다. 특히 A극B+A가I는 어느 체계 단독으로도 설명 불가능한 '끌리는데 무서워서 피하는' 패턴.",
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
        "cross": "사주만으로는 '어떤 에너지에 끌리는가'까지만 알고, 그 끌림이 감정적 채널로 작동하는지 논리적 채널로 작동하는지를 구별할 수 없다. MBTI만으로는 T/F의 일반적 판단 양식만 알고, 연애에서 구체적으로 어떤 에너지에 끌리는지 알 수 없다. 교차하면 '이 사람은 강한 상대를 좋아하는데, 그 강함을 감정적 따뜻함으로 확인하려 한다(편관+F)' vs '능력으로 확인하려 한다(편관+T)'로 분화된다.",
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
        "cross": "12운성 spouse만으로는 '어떤 에너지의 배우자를 원하는가'까지 알 수 있고, J/P만으로는 생활양식만 안다. 교차하면 '원하는 관계 에너지'와 '그것을 운영하는 방식' 사이의 조화/역설이 드러난다. 목욕+J의 역설은 어느 체계 단독으로도 포착 불가 — 사주만 보면 '변화를 즐기는 연애'이고 MBTI만 보면 '계획적인 사람'인데, 합치면 '계획적으로 변화를 추구하는 모순적 연인'이라는 독특한 패턴.",
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
        "cross": "신강/신약만으로는 '에너지 총량과 방향'만 보이고, T/F만으로는 '판단 기준'만 보인다. 교차하면 '어떤 힘으로 어떤 방식으로 밀어붙이는가'가 구체화된다. 신강+T의 사람이 갈등 상황에서 보이는 패턴(논리로 제압)과 신강+F의 패턴(감정으로 압도)은 질적으로 다르며, 이 차이는 썸 관계에서 상대의 갈등 대응 방식을 예측하는 데 핵심이다.",
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
        "cross": "격국만으로는 '어떤 역할'인지만 보이고, S/N만으로는 '정보를 어떻게 받아들이는가'만 보인다. 교차하면 '어떤 역할을 어떤 방식으로 수행하는가'가 구체화된다. 같은 식신격이라도 유튜버가 될지 셰프가 될지의 분기가 여기서 결정된다. 이 패턴은 썸 상대의 직업적 지향과 대화 스타일을 동시에 예측하게 해준다.",
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
        "cross": "사주의 shadow는 일주 고유의 억압된 성향이고, MBTI의 grip은 인지기능 체계의 취약점이다. 두 체계의 취약점이 동시에 발동할 때 나타나는 패턴은 어느 한 쪽만으로 예측 불가. 썸 상대의 '최악의 순간'을 이해하는 유일한 도구.",
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
        "cross": "격국(패턴 3)이 역할의 방향이라면 십성 분포는 에너지의 실제 흐름이다. MBTI의 인지기능은 정보 처리의 방식이다. 교차에서 '이 에너지 흐름이 이 인지적 방식으로 구현된다'는 가장 구체적인 행동 예측이 나온다.",
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
        "cross": "패턴 1(음양×E/I)이 에너지의 '방향' 괴리를 본다면, 이 패턴은 에너지의 '질감' 수준에서 MBTI 주기능과 사주 일간의 구조적 공명/긴장을 본다. Fi의 섬세함이 강한 추진 에너지와 만나면 어떤 사람이 되는가 — 이것은 어느 체계 단독으로도 예측할 수 없는 교차 고유의 정보다.",
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
        "cross": "조후만으로는 '계절적 기질 온도'만 보이고, MBTI 강도만으로는 '선호의 확실성'만 보인다. 교차하면 '기질적 온도와 행동적 선명도의 조합'이 나타난다. 뜨거운 기질+확실한 유형은 '타오르는 불꽃'이고, 차가운 기질+약한 유형은 '안개 속의 호수'다. 이 조합은 썸에서 '이 사람이 어떤 속도로 마음을 드러내는가'를 예측하는 데 결정적이다.",
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
        "cross": "물상만으로는 '원형적 이미지'만 있고, MBTI만으로는 '행동 유형'만 있다. 교차하면 '이 사람을 한 문장으로 그릴 수 있는 생생한 캐릭터 이미지'가 탄생한다. 이것은 썸 상대를 직관적으로 이해하게 해주는 가장 강력한 설명 도구다. '이 사람은 ENFP입니다'보다 '이 사람은 모든 곳을 비추려는 태양 같은 ENFP입니다'가 100배 생생하다.",
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
        "cross": "사주 음양만으로는 '에너지가 양적이다/음적이다'는 경향만 보이고, MBTI E/I만으로는 '사교적 행동을 하는가'만 보인다. 교차하면 '타고난 에너지 경향과 실제 행동 패턴의 일치/불일치'를 잡아낼 수 있다. 양우세+I인 사람은 혼자 있어도 에너지가 충만하지만 그것을 밖으로 안 드러내는 것이고, 음우세+E인 사람은 사교적으로 행동하지만 속은 지쳐있을 수 있다. 이 괴리 정보는 어느 한 체계만으로는 잡히지 않는다.",
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
        "cross": "사주만으로는 '겉과 속의 구조적 괴리'를 알 수 있고, MBTI만으로는 '본인이 인지하는 자기 성격'을 알 수 있다. 교차하면 'MBTI 결과가 이 사람의 겉을 반영한 것인지 속을 반영한 것인지'를 판별할 수 있다. 이것은 어느 한 체계만으로는 절대 불가능한 메타 분석이다. 썸에서 '이 사람이 보여주는 모습이 진짜인가?'에 대한 구조적 답을 제공한다.",
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
        "cross": "12운성만으로는 '무의식 에너지 리듬'만 보이고, J/P만으로는 '외부 세계를 구조화하는 선호'만 보인다. 교차하면 '내면의 리듬과 외부의 구조화 방식이 조화로운가 충돌하는가'가 드러난다. 목욕+J의 모순(변화를 원하면서 계획을 세움)이나 건록+P의 역설(독립적인데 자유분방)은 어느 한 체계만으로는 설명 불가능한 성격의 복잡성이다.",
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
        "cross": "MBTI 단독으로는 루프의 '내용'(어떤 기능이 연결되는가)만 알고, 사주 단독으로는 에너지 강도만 안다. 교차에서 루프의 '외부 표현 강도'가 나온다 — 같은 루프라도 신강하면 폭발적이고 신약하면 내파적이다. 썸 상대의 스트레스 신호를 정확히 읽는 데 필수적.",
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
        "cross": "사주 용신은 '이 사람에게 필요한 에너지 방향'을 객관적으로 지시하고, MBTI 유형은 '본인이 이미 보유한 행동 패턴'을 보여준다. 이 둘의 일치/불일치가 '같은 유형에 끌리는가 반대 유형에 끌리는가'라는 연애의 근본 패턴을 결정한다. 사주 단독으로는 용신 방향만 알고, MBTI 단독으로는 자기 유형만 안다. 교차해야 보상적/강화적 끌림의 구조가 드러난다.",
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
        "cross": "배우자궁 십성(일지)이 '무의식적 끌림'이라면, 월간 십성은 '사회적 장면에서의 의식적 이상형'이다. 이 둘이 다르면 '사회적으로 원하는 타입'과 '진짜 끌리는 타입'이 다른 사람이 된다. MBTI E/I는 이 의식적 이상형을 '어떻게 탐색하는가'를 결정한다. 사주 단독으로는 의식적/무의식적 이상형의 차이를 알고, MBTI 단독으로는 탐색 방식만 안다. 교차해야 '어떤 장면에서 어떤 사람을 어떻게 찾는가'가 완성된다.",
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
        "cross": "사주 기신은 에너지적 부적합을 객관적으로 지시하고, MBTI 열등기능은 심리적 미성숙 영역을 보여준다. 둘이 같은 방향이면 회피가 극대화되고, 다른 방향이면 불편함이 분산된다. 사주 단독으로는 '어떤 오행이 해로운가'만 알고, MBTI 단독으로는 '어떤 기능이 미숙한가'만 안다. 교차해야 '이 사람이 연애에서 절대 못 견디는 구체적 인간 유형'이 나온다.",
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
        "cross": "ILJU_DATA.love는 '어떤 사람에게 끌리는가(what)'를 제공하고, MBTI 부기능은 '어떻게 다가가는가(how)'를 제공한다. 사주만으로는 끌리는 유형은 알지만 접근 방법은 모르고, MBTI만으로는 행동 패턴은 알지만 무의식적 끌림 방향은 모른다. 교차하면 what+how가 결합된 구체적 연애 전략이 나온다.",
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
        "cross": "LOVE-003이 '연애 리듬의 역설'을 다뤘다면, 이 패턴은 '접근 속도의 실전 최적화'다. 12운성은 에너지의 양과 방향(상승/하강/잠재)을 결정하고, J/P는 행동의 템포를 결정한다. 두 변수가 곱해져야 '언제, 얼마나 빠르게 다가가라'는 구체적 처방이 나온다. 12운성 단독으로는 '배우자궁 에너지가 높다/낮다'이고, J/P 단독으로는 '계획적/즉흥적'이지만, 교차하면 '이 사람에게는 이 속도로 다가가라'가 된다.",
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
        "cross": "LOVE-007이 '왜 끌리는가(보상적 vs 강화적)'를 설명했다면, 이 패턴은 '그 끌림을 어떤 행동으로 작동시키는가'의 실전 전술이다. 용신은 상대의 결핍 에너지이므로, 이것을 채워주는 행위 자체가 접근법이 된다. E/I는 그 채움의 채널(사회적 vs 개인적)을 결정한다. 두 변수가 곱해져야만 '구체적으로 무엇을 하라'는 처방이 나온다. 용신만으로는 '화 에너지를 줘라'인데, E/I가 곱해지면 '같이 축제 가라(E)' vs '촛불 켜고 둘이 대화하라(I)'로 분화한다.",
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
        "cross": "GAZE-003(월간 × 부기능)이 '보여주는 나의 이중 페르소나'를 다뤘다면, 이 패턴은 '상대의 사회적 페르소나에 맞춰 어떤 장면에서 접근하는가'의 채널 선택이다. 월간 십성 단독으로는 '이 사람은 사회적으로 이런 에너지'이고, E/I 단독으로는 '나는 외향적/내향적'이지만, 교차하면 'E인 나는 상대의 월간 에너지에 맞는 사회적 장면을 만들어라' vs 'I인 나는 사회적 장면을 우회하여 내면에 직접 다가가라'는 전략이 나온다. 접근의 장소(사회적 vs 개인적)를 결정하는 교차다.",
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
        "cross": "합 트리거는 사주 고유의 시간축 변수로, MBTI에는 없는 '언제'의 정보를 제공한다. MBTI 단독으로는 접근 시기를 알 수 없고, 합 트리거 단독으로는 접근 방식을 알 수 없다. 교차하면 '이 시기에 이 방식으로'라는 시기+전술의 완전한 처방이 나온다. CHEM-009(교차 삼합 완성 × 인지기능 커버율)가 '둘이 만나면 세계가 확장되는 시너지'를 다뤘다면, 이 패턴은 '그 시너지가 발동하는 정확한 시기에 맞춰 어떻게 다가가라'는 타이밍 전술이다.",
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
        "cross": "천간합은 '자연적 끌림의 구조'이고 CHEM-001이 이미 다뤘지만, 이 패턴은 '그 구조를 접근 행동으로 번역'하는 것이다. MBTI가 곱해지면 같은 천간합이라도 접근 방식이 완전히 달라진다. 합화 오행이 '토'인데 A가 F형이면 정서적 안정감을, T형이면 실질적 안정감을 제공하는 채널이 열린다. 천간합 단독으로는 '끌린다'이고, MBTI 단독으로는 '소통 방식'이지만, 교차하면 '이 끌림을 이 방식으로 강화하라'는 맞춤 처방이 나온다.",
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
        "cross": "사주는 에너지 구조로 '어떤 관계일 때 가장 조화로운가'를 산출하고, MBTI는 소통 역학으로 '어떤 관계 패턴이 자연스러운가'를 결정한다. 이 둘이 동시에 같은 관계유형을 가리킬 확률은 높지 않으며, 일치할 때는 '운명적 확신'을, 불일치할 때는 '의식적 조율 필요'라는 메타 판정을 내린다. 단독으로는 불가능한 '관계의 정체에 대한 이중 검증'이 이 교차의 고유 가치다.",
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
        "cross": "격국 파격은 사회적 에너지의 뒤틀림이고 배우자궁 십성은 관계 영역의 기대 구조다. 교차하면 '내 인생이 꼬여 있는데 결혼이 그걸 풀어주는가 악화시키는가'라는 핵심 질문에 답할 수 있다. 파격만 보면 결혼과의 관계를 모르고, 배우자궁만 보면 파격의 영향을 모른다.",
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
        "cross": "개인 타이밍과 커플 타이밍은 각각 다른 변수에서 도출된다. 개인 타이밍은 일간 기준의 십성·육합·도화이고, 커플 타이밍은 두 사람의 일지와 세운 지지의 관계다. 교차하면 '나는 결혼하고 싶은데 이 관계에서 가능한가'라는 실전적 판정이 가능해진다. 어느 한쪽만으로는 '결혼은 좋은 해인데 이 사람과는 아닌 해'를 구별할 수 없다.",
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
        "cross": "12운성은 배우자 에너지의 정적 상태를, 대운 십성은 현재 에너지 모드의 동적 방향을 각각 제공한다. 교차하면 '배우자 에너지의 상태 × 현재 에너지 흐름의 방향'이라는 2축 좌표가 만들어져, 단순히 '결혼운이 좋다/나쁘다'가 아니라 '왜 지금 결혼을 원하는가/원하지 않는가'의 내적 동기를 구조적으로 설명할 수 있다.",
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
        "cross": "N/A — MBTI 단독. coreFear가 결혼이라는 특정 선택과 충돌하는 구조를 유형별로 구체화한다. 같은 P유형이라도 coreFear의 내용에 따라 결혼 공포의 양상이 완전히 다르다.",
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
        "cross": "교운기는 에너지 방향의 전환 시점이고, 결혼 타이밍은 연애/결혼 인연의 활성화 시점이다. 둘이 겹치면 '인생의 전환점에서 결혼이라는 큰 결정이 함께 오는' 구조가 되어, 결혼의 의미와 무게가 완전히 달라진다. 교운기 없이 타이밍만 보면 '결혼 적기'의 심리적 무게를 알 수 없고, 타이밍 없이 교운기만 보면 '전환점이 결혼으로 이어지는가'를 알 수 없다.",
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
        "cross": "공망의 '결핍 구조'와 공망 충전의 '해소 시기'는 같은 변수의 양면이다. 교차하면 '왜 결혼이 늦는가(구조적 원인)'와 '언제 결혼의 문이 열리는가(시간적 해소)'를 하나의 프레임으로 설명할 수 있다. 공망 없이 타이밍만 보면 '왜 좋은 해인데 안 되는가'를 설명할 수 없고, 타이밍 없이 공망만 보면 '언제 풀리는가'를 알 수 없다.",
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
        "cross": "N/A — MBTI 단독. 인지기능 스택 순서가 결혼 결심의 구체적 병목 지점을 예측한다. 사주의 결혼 타이밍(P-RLC-118)이 '언제'를 다루면 이것은 '왜 그 시기에 막히는가'의 심리적 메커니즘을 다룬다.",
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
        "cross": "N/A — MBTI 단독. 4기질의 결혼 의미 차이가 커플 조합별로 어떤 구체적 갈등을 만드는지 예측한다. 결혼 '조건'이 아닌 결혼 '정의'의 갈등이라는 점에서 더 근본적인 층위를 다룬다.",
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
        "cross": "N/A — MBTI 단독. J/P 강도의 55/68/88 차이가 결혼 준비라는 구체적 맥락에서 어떤 행동 패턴 차이를 만드는지를 설명한다.",
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
        "cross": "N/A — MBTI 단독. 결혼 결심이라는 특정 고압 상황에서의 그립 발동 패턴을 유형별로 구체화한다. 그립 반응이 '진짜 마음'과 다르다는 인식이 실전적으로 매우 중요.",
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
        "cross": "N/A — MBTI 단독. 4가지 상호작용 스타일의 결혼 준비 역학을 커플 조합별로 예측한다. 특히 behind-the-scenes × behind-the-scenes 조합의 무기한 지연 패턴은 실전적 예측력이 높다.",
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
        "cross": "N/A — MBTI 단독. 4개 축(Fi-Te, Fe-Ti, Ne-Si, Ni-Se)의 시소 역학이 결혼 결심이라는 구체적 맥락에서 어떤 과제를 강제하는지를 체계적으로 설명한다. 결혼이 단순한 관계 이벤트가 아니라 인지기능 성장의 강제 장치임을 밝힌다.",
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
        "cross": "N/A — MBTI 단독. dealbreaker가 '연애→결혼' 프레임 전환에서 급부상하는 시간적 메커니즘을 설명한다. 유형별 dealbreaker의 내용이 구체적이므로 어떤 영역에서 급부상하는지 예측 가능.",
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
        "cross": "N/A — MBTI 단독. 의사결정 순서의 교차 분석으로 결혼 결심에서의 상호 보완 메커니즘을 구체화한다. P-RLC-074(관계 유형)와 연결되지만, 결혼 결심이라는 특정 의사결정에서의 보완 구조를 새로 밝힌다.",
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
        "cross": "신살 교차는 결혼의 질적 톤을, 세운 타이밍은 결혼의 시간적 창을 각각 제공한다. 교차하면 '이 해에 결혼하면 어떤 톤의 결혼이 되는가'라는 통합 판정이 가능하다. 신살만 보면 '좋은 인연인데 언제?'이고, 타이밍만 보면 '좋은 해인데 이 관계가 어떤 질인가?'를 모른다.",
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
        "cross": "P-RLC-071에서 조후 보완을 다뤘으나 그것은 '관계의 온도 조절'이었다. 이 패턴은 결혼이라는 장기적 동거 맥락에서 '매일 함께 있을 때의 만성적 에너지 온도'에 초점을 맞춘다. 연인일 때는 가끔 만나므로 조후 불일치가 심각하지 않지만, 결혼 후 매일 함께하면 조후 보완/불보완의 효과가 누적되어 관계의 기본 온도를 결정한다.",
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
        "cross": "세 변수는 각각 다른 차원을 측정한다: 용신은 에너지 균형, 강약은 힘의 대칭/비대칭, 배우자궁은 기대와 현실의 매칭. 어느 하나만으로는 결혼 지속 가능성을 온전히 판정할 수 없다. 세 층의 조합이 8가지 분기(모두 양호/1층만 불량/2층만 불량/3층만 불량/1+2 불량/1+3 불량/2+3 불량/모두 불량)를 만들어 결혼 컨설팅의 핵심 프레임이 된다.",
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
        "cross": "P-RLC-070(강약×격국)과 P-RLC-087(배우자궁 기대-현실)을 각각 단독으로 보면 '역할 분담이 자연스러운가'와 '기대가 충족되는가'가 별개 결론이 나올 수 있다. 세 변수를 동시에 교차해야 '결혼 후 첫 1년의 적응 속도'와 '장기 안정성'을 함께 판단할 수 있다. 특히 배우자궁 기대가 충족되지만 강약이 쌍강이면 '만족하지만 주도권 다툼'이라는 결혼 특유의 모순이 드러난다.",
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
        "cross": "교차 통변 단독으로는 '두 사주가 합쳐졌을 때의 에너지 흐름'만 보인다. 용신 궁합 단독으로는 '서로의 필요를 채워주는가'만 보인다. 교차하면 '에너지 흐름이 길한데 필요도 채워지는가(최적)', '흐름은 길한데 필요는 안 채워지는가(겉은 좋지만 속 공허)', '흐름은 흉한데 필요는 채워지는가(위기 시 버팀목)', '둘 다 흉한가(구조적 위험)'의 4분면이 만들어진다. 이 4분면은 결혼 생활의 재물+건강+방향성을 동시에 설명한다.",
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
        "cross": "SJ_buildChildAnalysis는 개인 단위 자녀운만 본다. SSP[십성]['시주']는 개인의 시주 에너지만 본다. 이 패턴은 두 사람의 시주 에너지를 교차하여 '양육관의 일치/충돌' + '자녀 복의 비대칭'이라는 부부 고유의 조합을 만든다. 연애에서는 자녀 논의가 먼 미래이지만 결혼에서는 핵심 이슈이므로, 이 교차가 결혼 소주제에서만 작동하는 고유 패턴이다.",
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
        "cross": "납음 단독은 상징적 서사만 제공. 음양 단독은 에너지 방향만 제공. 오행 보완 단독은 구체적 결핍 보충만 제공. 세 변수를 동시에 보아야 결혼의 '이야기(납음) + 리듬(음양) + 실속(오행)'이 일치하는지 판단할 수 있다. 이 정합성이 높을수록 '설명할 수 없지만 함께하면 좋은 부부', 낮을수록 '좋아하는데 왜 힘든지 모르겠는 부부'가 된다.",
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
        "cross": "P-RLC-088(대운 비동기화)은 에너지 차이의 마찰만 본다. P-RLC-087(배우자궁 기대-현실)은 정적 구조만 본다. 이 패턴은 시간축(대운+세운)과 공간(배우자궁)을 동시에 교차하여, '언제 어디서 무엇이 터지는가'를 특정한다. 결혼의 핵심은 '시간에 따른 변화'이므로, 이 시간-공간 교차가 결혼 소주제에서 가장 실용적인 패턴이다.",
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
        "cross": "P-RLC-026은 '상대가 치료제인가 독약인가'를 판별하지만 빈도 변수가 없다. P-RLC-012(신강도×12운성)는 개인의 에너지 지속성만 본다. 이 패턴은 5신 효과에 '매일 함께하는 결혼'이라는 빈도 변수와 12운성의 방사 강도를 곱하여, 결혼 특유의 '만성적 체감'을 설명한다. 연애에서는 기신이어도 가끔 만나니 괜찮지만, 결혼하면 매일이므로 누적 효과가 완전히 다르다.",
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
        "cross": "강약만으로는 에너지 양의 차이만 알고, 격국만으로는 역할 성향만 안다. 교차해야 '강한 쪽이 표현(식상격)을 맡고 약한 쪽이 관리(관성격)를 맡는 자연스러운 분업' 같은 구체적 역할 분담 구조가 나온다. 특히 쌍강+동일격국의 극심한 주도권 마찰은 어느 한쪽만으로 설명 불가.",
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
        "cross": "P-RLC-062가 개인 단위에서 '기대-현실 매칭'을 다뤘다면, 이 패턴은 쌍방향으로 A의 기대 vs B의 제공, B의 기대 vs A의 제공을 동시에 보아 '누가 더 조율해야 하는가', '어느 방향으로 조율해야 하는가'를 특정한다.",
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
        "cross": "충의 유형만으로는 '어떤 질감의 충돌인지'만 알고, 궁위만으로는 '어느 영역인지'만 알고, 십성만으로는 '무엇에 대한 것인지'만 안다. 세 변수를 교차해야 비로소 '배우자 영역에서 감정 폭발적 형태로 주도권에 대해 충돌한다'처럼 갈등의 3차원 좌표가 완성된다.",
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
        "cross": "MBTI 단독 패턴. 인지기능별 분노 지속시간이라는 구체적 변수를 커플 단위로 교차하여, 갈등 '이후'의 구조적 마찰을 보여준다. 갈등 자체보다 갈등 이후 회복 타이밍의 불일치가 관계를 더 갉아먹는 경우가 많다.",
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
        "cross": "원진살만으로는 '밀어내는 미묘한 부조화'만 알고, 해만으로는 '합을 깨뜨리는 방해'만 안다. 두 가지는 메커니즘이 다르다 — 원진은 정반대가 아닌 비스듬한 부조화이고, 해는 육합의 짝을 빼앗는 구조다. 같은 궁위에서 겹치면 두 메커니즘이 동시에 작동하여 원인 불명의 만성 피로가 된다.",
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
        "cross": "대운 비동기화만으로는 '10년간 에너지 방향이 다르다'는 정적 정보이고, 세운 타이밍만으로는 '올해 합충 여부'라는 단년 정보다. 교차해야 '대운이 비동기화된 상태에서 세운마저 한쪽에만 충이 걸리면 위기의 해'라는 시간적 마찰의 리듬이 나온다.",
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
        "cross": "MBTI 단독 패턴. 개인 단위 그립(P-RLC-009, P-RLC-051)과 달리, 커플 단위에서 '한쪽의 위기 시 다른 쪽이 방파제가 되는가 함께 침몰하는가'를 구조적으로 판정한다. 이것은 장기 관계의 지속 가능성에 직접적으로 영향.",
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
        "cross": "MBTI 단독 패턴. P-RLC-076(갈등 해소 정합성)을 needsFromOther라는 구체적 변수로 세분화. 갈등 해소에서 '상대가 자연스럽게 주는 것'과 '내가 진짜 필요한 것'의 구조적 갭을 보여준다. 이것이 '맞춰가야 할 부분'의 가장 실용적인 조언이 된다.",
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
        "cross": "용신 보완만으로는 원국 구조적 필요가 채워지는지만 알고, 조후만으로는 체감 온도가 맞는지만 안다. 둘 다 '에너지 보완'이지만 차원이 다르다. 용신은 십성/오행 균형이고 조후는 계절적 냉열(冷熱) 균형이다. 교차해야 '구조적으로도 맞고 체감적으로도 맞다'는 이중 확인이 가능하다.",
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
        "cross": "MBTI 단독 패턴. 두 사람의 갈등 스타일을 교차 분석하여 '의도 없이 상대를 건드리는 구조적 지뢰'를 식별한다. 개인 단위 갈등 스타일(P-RLC-052 등)과 달리, 두 사람의 스타일이 맞물릴 때 발생하는 악순환 루프를 보여준다.",
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
        "cross": "MBTI 단독 패턴. blindSpot은 본인이 인식하지 못하는 영역이고 coreNeed는 상대의 가장 깊은 욕구이므로, 이 교차는 '의식되지 않는 상처'를 구조적으로 보여준다. P-RLC-090(트리거 교차)이 의식적 갈등의 악순환이라면, 이것은 무의식적 갈등의 만성화 구조.",
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
        "cross": "조후론은 '계절적으로 무엇이 필요한가(외부 환경 기반)'를, 과잉 오행은 '원국 내부에서 무엇이 넘치는가'를 각각 독립적으로 설명한다. 교차하면 '넘치는 것과 부족한 것이 정확히 반대편에 있는' 극단적 온도 불균형 구조가 드러난다. 조후 단독으로는 '필요한 것'만, 오행 분포 단독으로는 '넘치는 것'만 보인다.",
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
        "cross": "공망 단독으로는 '어디가 비어있는가'만, 파격 단독으로는 '에너지가 어떻게 뒤틀렸는가'만 설명한다. 교차하면 '비어있는 자리에 뒤틀린 에너지까지 겹친 이중 결핍'이라는 민감 구조가 드러난다. 이것은 두 변수 모두 사주 원국의 서로 다른 레이어(공간적 결핍 vs 에너지적 뒤틀림)에서 독립적으로 도출되므로 교차가 정당하다.",
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
        "cross": "MBTI 단독으로는 opposing 기능이 '어떤 상황에서 발동하는가'를 설명하지만 '언제 특히 강하게 발동하는가'의 시간적 특정이 불가능하다. 사주 단독으로는 기신 대운의 스트레스는 설명하지만 '방어 반응의 구체적 심리적 양상'을 설명할 수 없다. 교차하면 '10년 단위로 언제 어떤 방어적 민감 반응이 극대화되는가'가 특정된다.",
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
        "cross": "MBTI 단독으로는 '분노를 어떻게 처리하는가(축적 vs 소각 vs 기록)'를 설명하고, 사주 단독으로는 '어떤 영역이 만성적으로 자극되는가'를 설명한다. 교차하면 '만성 자극 영역 × 분노 처리 방식 = 관계 내 갈등의 구조적 패턴(축적형 폭발 / 반복형 소각 / 기록형 심판)'이 나온다.",
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
        "cross": "원진살은 '어떤 궁위 쌍이 미묘하게 불편한가'를, 일간 물상은 '이 사람의 근본적 반응 방식이 어떤 자연물에 가까운가'를 각각 독립적으로 설명한다. 교차하면 '불편함에 대한 구체적 반응 양식'이 드러난다. 원진살만으로는 '어디가 불편'만, 물상만으로는 '이 사람의 기본 스타일'만 알 수 있다.",
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
        "cross": "신살 단독으로는 '칼날이 있다'만, 신강도 단독으로는 '힘의 크기'만 설명한다. 교차하면 '칼날의 방향'(밖으로 vs 안으로)이 결정된다. 같은 양인살이라도 신강이면 외폭형, 신약이면 내폭형 — 이것은 양인살만으로도 신강도만으로도 예측 불가능하다.",
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
        "cross": "5신 체계와 오행 분포를 교차함으로써, 단순히 '이 오행이 싫다'가 아니라 '이 오행이 넘쳐서 싫은가 vs 없어서 거부하는가'를 구분할 수 있다. 같은 기신이라도 반응 양상이 정반대. 이것은 5신 단독으로도, 오행 분포 단독으로도 설명 불가능한 교차 고유 통찰.",
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
        "cross": "MBTI의 F/T 축은 감정의 '온도나 질감'을 설명하지 못한다(패스 합의 사항). 그러나 갈등 해소라는 구체적 맥락에서 과잉 오행의 감정 질감이 작용하면, F/T로는 도달할 수 없는 설명력이 생긴다. 사주만으로는 '이 사람이 갈등 후 어떤 절차를 밟는가'를 특정할 수 없다. MBTI의 갈등 해소 방식이 절차를, 사주의 과잉 오행이 절차 안의 질감을 결정하여, 교차 고유의 '화해 양상'이 나온다.",
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
        "cross": "dealbreaker는 인지기능 구조에서 도출된 '관계 종료의 심리적 트리거'이고, 조후 결핍은 원국 계절에서 도출된 '에너지적 갈증'이다. 교차하면 '심리적 트리거와 에너지적 갈증이 같은 방향인가 반대 방향인가'라는 구조가 드러나며, 같은 방향이면 치명적 민감 지점이, 반대 방향이면 자기 모순적 민감 지점이 형성된다.",
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
        "cross": "coreFear는 인지기능 구조에서 '무엇이 두려운가'를 도출하고, 기신은 원국 오행 균형에서 '어떤 에너지가 해로운가'를 도출한다. 도출 원리가 완전히 독립적이므로, 두 결과가 같은 방향을 가리키면 그것은 양 체계에서 독립적으로 확인된 구조적 취약성이다. MBTI 단독으로는 '두려움의 에너지적 질감'을, 사주 단독으로는 '기신이 심리적으로 어떤 두려움을 만드는지'를 설명할 수 없다.",
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
        "cross": "12운성은 '에너지 상태(강/약)'를, 십성은 '에너지의 성격(보호/압박/경쟁 등)'을 각각 독립적으로 설명한다. 교차하면 '약한 상태에서 어떤 성격의 에너지에 노출되는가'라는 취약점의 정체가 잡힌다. 12운성만으로는 '약하다'만, 십성만으로는 '무슨 에너지인지'만 알 수 있다.",
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
        "cross": "MBTI만으로는 trigger가 왜 '일반적 불쾌'를 넘어 '존재적 위협'이 되는지 설명할 수 없다(같은 INFP인데 왜 어떤 사람은 가치 무시에 폭발하고 어떤 사람은 견디는가). 사주의 파격이 trigger의 '존재적 깊이'를 결정한다. 사주만으로는 파격이 연인 관계에서 '구체적으로 어떤 상황에서' 발동하는지 특정할 수 없다. MBTI의 갈등 trigger가 구체적 발동 상황을 제공한다.",
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
        "cross": "격국 파격은 '에너지의 구조적 뒤틀림'을, 충·형 궁위는 '어떤 삶의 영역이 흔들리는가'를 각각 독립적으로 설명한다. 교차하면 '왜 민감한가(파격) + 어디서 민감한가(궁위)'가 동시에 잡힌다. 파격 단독으로는 '무엇이 뒤틀렸는지'만, 충·형 단독으로는 '어디가 흔들리는지'만 알 수 있다.",
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
        "cross": "MBTI 단독으로는 그립의 '내용(what)'만 알 수 있고, 사주 단독으로는 폭발의 '방향(where)'만 알 수 있다. 교차하면 '무엇이 어느 방향으로 폭발하는가'라는 구체적인 극한 반응 양상이 나온다. 이것은 연인이 '이 사람이 한계에 몰렸을 때 나한테 뭘 할 것인가'를 예측하는 데 결정적이다.",
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
        "cross": "MBTI만으로는 '상대의 어떤 결핍을 찌르는지' 특정할 수 없고, 사주만으로는 '왜 그 자리가 반복적으로 찔리는지의 메커니즘' 설명이 안 된다. 교차하면 '무의식적 가해자의 행동 패턴(blindSpot) + 무의식적 피해자의 결핍 지점(공망)'이라는 관계 내 만성 상처 구조가 드러난다. 이것은 두 사람의 데이터가 있어야만 작동하는 궁합 전용 교차 패턴이다.",
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
        "cross": "공망은 '구조적으로 비어있는 자리'라는 독특한 개념으로, 일반적 부족(오행 부족 등)과 질적으로 다르다. 부족은 '적은 것'이지만 공망은 '없는 것'이며, 없는 것이 채워지는 순간의 급변은 양적 보충과 질적으로 다른 체험이다.",
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
        "cross": "N/A — MBTI 단독 패턴. 인지기능 스택의 시소 역학(MT_AXES)과 축 강도(MT_INTENSITY_PROFILES)가 결합하여 '무의식적 갈망의 투사 강도'를 설명하는 것은 MBTI 고유의 메커니즘이다.",
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
        "cross": "조후는 월지(계절)에서 파생되는 '온도적 결핍'으로, 억부용신(십성 균형)이나 통관용신(오행 소통)과 독립적인 별도 축이다. 같은 용신=화라도 조후에서 온 화(따뜻함 자체가 필요)와 억부에서 온 화(표현력이 필요)는 연인에게 바라는 것의 질이 다르다.",
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
        "cross": "N/A — MBTI 단독 패턴. coreFear→coreNeed→dealbreaker→grip의 연쇄 구조가 '바라는 것의 최심층'을 설명하며, 이 연쇄는 인지기능 스택에서 일관되게 도출된다.",
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
        "cross": "격국 파격은 단순한 십성 과다/부족이 아니라 '특정 십성 조합의 역학적 실패'이므로, 통변 공식보다 구체적인 원인-결과를 보여준다. 이 구체적 실패가 연인에게 투사되는 메커니즘은 일지 십성이라는 별도 변수가 채널을 결정할 때만 완전히 설명된다.",
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
        "cross": "용신은 평생 변하지 않는 근본 결핍이고, 대운 십성은 10년마다 바뀌는 시대적 에너지. 두 시간축(고정 vs 변동)의 교차가 '바라는 것의 시간적 층위'를 만든다. 단일 변수로는 이 시간적 모순을 설명할 수 없다.",
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
        "cross": "5신 체계는 용신을 기준으로 5개 오행 모두에 역할(용/희/기/구/한)을 부여하므로, 단순 상생상극을 넘어 '이 특정 사주에서 이 특정 오행이 어떤 의미를 갖는가'를 개인화하여 판정한다. 범용적 오행 궁합과 질적으로 다른 개인화된 궁합.",
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
        "cross": "N/A — MBTI 단독 패턴. 루프 상태는 MBTI 실무 커뮤니티에서 정립된 고유 프레임워크(MT_METHODOLOGY.loopConcept)로, 인지기능 스택의 2번 위치 차단이 관계 기대의 급변을 만드는 메커니즘을 설명한다.",
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
        "cross": "단일 변수(용신만 또는 일지 십성만)로는 '바라는 것의 내적 모순'을 설명할 수 없다. 세 독립 변수의 정합성/불일치가 바라는 것의 복잡성 자체를 구조적으로 보여준다.",
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
        "cross": "N/A — MBTI 단독 패턴. Socionics에서 차용한 관계 유형론(MT_METHODOLOGY.socionicsAdaptation)이 '두 사람이 서로에게 바라는 것의 구조적 매칭'을 분류하는 것은 MBTI/Socionics 고유의 유형 간 역학 모델이다.",
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
        "cross": "N/A — MBTI 단독 패턴. MT_DECISION_PROCESS의 flow가 연인에게 바라는 것의 '심리적 우선순위'를 4단계로 구조화하고, blind가 '무의식적으로 간과하는 욕구'를 특정한다. 이 순서 구조는 사주에 대응 개념이 없다.",
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
        "cross": "사주 단독 패턴. 통변 공식이 에너지 흐름의 구조적 패턴을, 용신이 근본적 결핍을 제공하여, '바라는 것의 구조적 프레임'과 '근본적 우선순위'를 동시에 결정한다.",
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
        "cross": "N/A — MBTI 단독 패턴. Berens의 상호작용 스타일(MT_INTERACTION_STYLES)과 J/P 강도가 결합하여 '바라는 것의 전달 방식'을 4가지 채널로 분류하는 것은 MBTI 고유의 대인 역학 모델이다.",
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
        "cross": "N/A — MBTI 단독 패턴. Keirsey 4기질(MT_TEMPERAMENTS)이 바라는 것의 최상위 분류 체계를 제공하며, 기질 간 불일치가 관계 갈등의 가장 근본적 원인이 된다.",
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
        "cross": "사주 단독 패턴. 육친론의 성별 분화 × 일지의 무의식적 기대 × 원국 전체의 의식적 필요라는 3변수가 '바라는 것의 의식/무의식 모순'을 구조적으로 설명한다.",
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
        "cross": "MBTI 단독으로는 루프의 심리적 메커니즘과 바라는 것의 변화를 설명하지만, '언제 루프에 빠질 가능성이 높은가'를 시간적으로 예측하지 못한다. 사주 단독으로는 기신 시기의 스트레스를 설명하지만, 그 스트레스가 '관계에서 바라는 것을 어떻게 왜곡하는가'의 심리적 메커니즘을 설명 못 한다. 교차하면 '이 사람이 기신 대운 3년차에 루프에 빠져 연인에게 Ne적 역할을 과도하게 기대하게 된다'는 시기+메커니즘+결과를 통합 설명할 수 있다.",
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
        "cross": "MBTI 단독으로는 열등기능 대면이 '35-50세 어딘가'라는 넓은 범위밖에 못 줌. 사주의 대운 전환이 개인별 10년 단위로 특정. 사주 단독으로는 대운의 에너지가 '심리적으로 어떤 갈망을 활성화하는가'를 설명 못 함. 교차하면 '이 사람이 42세에 재성대운 진입과 함께 열등 Te가 활성화되어 연인에게 바라는 것이 근본적으로 바뀐다'는 개인별 타이밍을 설명할 수 있다.",
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
        "cross": "MBTI 단독으로는 열등기능 투사의 심리적 강도를 설명하지만, 그 투사를 관계 안에서 얼마나 지속적으로 유지할 에너지가 있는지를 설명하지 못한다(MBTI에 에너지 총량 개념 없음). 사주 단독으로는 관계 에너지의 총량과 리듬을 설명하지만, 그 에너지가 '심리적으로 어떤 갈망을 향하는가'를 설명하지 못한다. 교차하면 '갈망의 방향+깊이(MBTI) × 갈망의 지구력+리듬(사주)'이라는 2차원 프로필이 완성된다.",
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
        "cross": "P-RLC-043(기신 오행×과잉/결핍 오행)은 한 사람 내부의 민감 지점이었다. 이 패턴은 '상대방의 기신과 나의 존재가 어떤 관계인가'라는 궁합적 교차다. 5신 체계(P-RLC-026/059)가 '나는 상대에게 전반적으로 약인가 독인가'의 거시적 판정이라면, 이 패턴은 '상대의 특정 약점을 내가 건드리는가 해소하는가'의 미시적 판정이다. 둘 다 필요하다.",
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
        "cross": "B→A 십성 단독으로는 '나는 상대에게 정재다'에 그치지만, 격국을 교차하면 '왜 상대가 나를 그렇게 필요로 하는가'의 구조적 이유가 나온다. 식신격의 B가 나를 정재로 보면 '재능을 현금화해주는 파트너'이고, 정관격의 B가 나를 정재로 보면 '명예의 기반을 닦아주는 내조자'이다. 이 차이는 십성 단독으로 설명 불가능하다.",
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
        "cross": "P-RLC-026은 5신 단독이었다. 조후를 교차하면 '왜 끌리는지의 본능적 차원(온도)'까지 설명된다. 5신은 원국 균형 기반 이성적 판정이고, 조후는 계절 기반 체감적 판정이다. 겨울 태생 B에게 화 일간 A는 5신과 무관하게 '따뜻하다'고 느껴진다. 두 판정이 일치하면 '운명적 끌림'의 구조적 근거, 불일치하면 '끌리는데 왜 불편하지?'의 원인이 된다.",
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
        "cross": "P-RLC-008(첫인상 vs 실제)은 A 자신의 겉/속이었다. 이 패턴은 B가 A를 대하는 겉/속이라는 방향 전환이다. 월간(사회적 도구)과 일지(무의식)는 SAJU_PILLAR_PSY에서 서로 다른 심리층으로 명확히 구분되어 있다. 이 두 층의 불일치가 클수록 B는 A에게 '읽히지 않는 사람'이 되고, A는 B의 진심을 파악하기 어려워진다. 궁합 상담에서 '걔가 날 좋아하는 건지 모르겠어요'의 구조적 원인.",
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
        "cross": "MBTI 단독 패턴. 같은 인지기능이라도 성숙도에 따라 '상대 눈에 비친 나'가 성장 촉진자에서 위협 요인으로 완전히 뒤집힌다. 사주는 오행의 양/질을 구분하지만 '성숙도'라는 발달심리학적 차원은 MBTI 고유의 설명력이다.",
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
        "cross": "MBTI 단독 패턴. 사주의 십성 분류와 달리 인지기능 위치는 '상대의 어떤 처리 과정이 나에게 어떤 심리적 반응을 일으키는가'를 설명한다. 십성이 역할(재물/권력/학문)을 부여한다면, 인지기능 위치는 심리적 편안함/이질감/위협감의 기제를 설명한다.",
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
        "cross": "사주의 5신 체계(에너지 균형 기반 필요성)와 MBTI의 인지기능 위치(심리적 편안함/이질감)를 교차한다. 5신은 '이 사람이 내게 필요한가'를 판정하고, 인지기능 위치는 '이 사람과 함께 있을 때 편안한가'를 판정한다. 필요하다고 반드시 편안한 것은 아니고, 편안하다고 반드시 필요한 것은 아니다. 이 정합/불일치가 관계의 질을 결정한다. 어느 한 체계만으로는 이 이중 구조를 설명할 수 없다.",
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
        "cross": "P-RLC-002(배우자궁 십성×12운성)는 A 자신이 배우자에게 기대하는 패턴이었다. 이 패턴은 B의 기대와 A의 실제 제공 에너지의 매칭이라는 '궁합적 교차'다. 배우자궁 십성(무의식적 기대)과 실제 십성(현실적 에너지)은 독립적으로 결정되므로 불일치가 구조적으로 가능하다. 이 불일치의 크기와 방향이 '상대 눈에 비친 나의 만족도/불만족도'를 결정한다.",
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
        "cross": "월간 교차는 일간 교차(본질적 관계)와 다른 차원이다. 일간은 '이 사람이 근본적으로 나에게 어떤 존재인가'이고, 월간은 '이 사람이 실제로 말할 때 어떤 느낌인가'이다. 일간은 정재(안정적 파트너)인데 월간이 편관(압박)이면 '좋은 사람인 건 아는데 말투가 무서워'가 된다. 이 갭이 소통 오해의 핵심 구조.",
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
        "cross": "조후 온도 차이만으로는 '빠르다/느리다'만 알 수 있고, 과잉 오행만으로는 '개인의 말투'만 알 수 있다. 교차하면 '커플 간 소통 속도+질감의 갭'이 드러난다. 화왕절+화 과다 vs 수왕절+금 과다이면 '한쪽은 불처럼 쏟아붓는데 다른 쪽은 칼로 자르듯 받아치는' 극적 미스매치. 같은 계절+같은 과잉 오행이면 리듬은 맞지만 새로운 관점이 없음. 이 교차는 '왜 타이밍이 안 맞는가'의 핵심 답.",
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
        "cross": "12운성만으로는 '대화의 에너지 상태'만 알 수 있고(건록=강함, 절=약함), 배우자궁 십성만으로는 '대화의 내용/방향'만 알 수 있다(식신=편안, 편관=긴장). 교차하면 '어떤 강도로 어떤 내용의 깊은 대화가 가능한가'가 드러남. 건록+식신이면 '강하고 따뜻한 깊은 대화' = 최상의 내밀한 소통. 절+편관이면 '에너지도 없는데 긴장까지' = 깊은 대화가 트라우마가 될 수 있음. 이 조합이 '이 커플이 속마음을 얼마나 편하게 나눌 수 있는가'의 핵심 지표.",
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
        "cross": "일간 오행 관계가 소통의 기저 '언어 호환성'을 결정하고, 식상/인성 비율이 소통의 '방향과 양'을 결정한다. 이 두 변수의 교차로 소통 구조의 4분면이 나온다: ①상생+식상/인성 균형=이상적 소통 ②상생+식상 편중=편향적 소통(한쪽만 말함) ③상극+식상/인성 균형=노력형 소통(말은 하는데 안 먹힘) ④상극+식상 편중=좌절형 소통(말해도 안 통하고 안 말해도 답답). 오행 관계만으로는 소통의 양을 모르고, 식상/인성만으로는 소통의 질감을 모른다.",
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
        "cross": "합과 충이 다른 궁위에 동시 존재하면 '대화 주제별 소통 격차'가 발생한다. 월간합+일지충이면 '밖에서는 베프인데 집에서는 못 말하는 것이 있는' 커플. 일간합+월지충이면 '속은 통하는데 현실적 대화가 안 되는' 커플. 이 궁위별 조합이 '어디서 말이 통하고 어디서 막히는가'의 지도를 그린다. 합만으로는 막히는 영역을 모르고, 충만으로는 통하는 영역을 모른다.",
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
        "cross": "강약만으로는 '밀어붙이는 정도'만 알 수 있고, 식상/인성만으로는 '표현 vs 수용 성향'만 알 수 있다. 교차하면 '소통 주도권이 어디에 고정되는가'의 구조적 패턴이 드러남. 신강인데 인성이 강하면 '자기 주장이 강하지만 남의 말도 듣는' 의외의 조합 — 소통에서 유리. 신약인데 식상이 강하면 '힘은 없는데 할 말은 다 하는' 사람 — 상대에게 '약하면서 왜 이렇게 말이 많아'라는 혼란을 줄 수 있음.",
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
        "cross": "납음만으로는 관계의 추상적 리듬을 알 수 있고, 물상만으로는 개인의 이미지를 알 수 있다. 교차하면 '이 커플의 대화가 어떤 풍경인가'라는 시각적·감각적 비유가 가능해진다. 이것은 정량적 분석이 아니라 풀이에서 '느낌'을 전달하는 도구다. 해중금(바다 속 금)+노중화(화로 불)의 커플은 '깊은 바다에서 불꽃을 찾는 대화' — 쉽지 않지만 찾으면 보석. 이 상징적 차원은 다른 패턴에서는 접근할 수 없는 고유한 가치.",
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
        "cross": "용신 궁합만으로는 '에너지적으로 받아들이기 쉬운가'만 알 수 있고, 십성만으로는 '어떤 역할로 느끼는가'만 알 수 있다. 교차하면 '내용의 수용성 × 형식의 수용성'이 동시에 드러남. 용신 보완도 높은데 십성이 편관이면 '약은 쓰지만 효과 있는' 소통, 용신 보완도 낮은데 십성이 식신이면 '달콤하지만 영양 없는' 소통. 이 교차가 '왜 좋은 말인데 안 먹히는가' 혹은 '왜 거친 말인데 효과 있는가'의 답.",
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
        "cross": "사주 단독으로는 에너지 총량(신강도)과 리듬(12운성)만 알 수 있고, MBTI 단독으로는 에너지 방향(E/I)과 충전 방식(selfcare)만 알 수 있다. 교차하면 '이 사람의 관계 에너지가 얼마나(신강도) × 어디서 충전되고(E/I) × 어떤 리듬으로 흐르는가(12운성)'라는 3차원 에너지 맵이 그려진다. 특히 신강도와 E/I가 불일치할 때 — 신강인데 I88(에너지는 많은데 혼자 충전), 신약인데 E88(에너지는 적은데 외부 충전 필요) — 관계에서 독특한 역설이 나타나고, 이것은 교차에서만 포착 가능하다.",
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
        "cross": "사주 단독으로는 '이 10년의 외적 에너지 테마'만 알 수 있고, MBTI 단독으로는 '이 나이대의 심리적 발달 과제'만 알 수 있다. 교차하면 '외적 에너지 테마와 내적 발달 과제가 같은 방향인가(시너지) 다른 방향인가(갈등)'를 판별할 수 있다. 식상대운+Ne 발달기는 시너지(표현의 폭발), 관성대운+Te 발달기도 시너지(책임감의 통합), 그러나 재성대운+Fi 심화기는 갈등(돈 벌기 vs 가치 탐색)이 될 수 있다. 시간축에서의 조화/불협화를 이중으로 읽는 것은 교차에서만 가능하다.",
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
        "cross": "사주 단독으로는 격국의 성패(건강한/불건강한 발현)를 알 수 있지만, 그것이 심리적으로 어떤 메커니즘인지는 설명하기 어렵다. MBTI 단독으로는 인지기능 성숙도 레벨을 알 수 있지만, 그것이 어떤 사회적 역할 맥락에서 발현되는지는 알기 어렵다. 교차하면 '이 사람의 연애 스타일이 왜 지금 이 수준인가'를 구조(격국 성패) × 심리(인지기능 성숙도)로 이중 진단할 수 있다. 특히 두 체계의 성숙도가 불일치할 때 — 격국은 건강한데 인지기능이 미성숙, 또는 그 반대 — 연애에서 기묘한 불균형이 나타난다.",
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
        "cross": "P-RLC-001~P-RLC-007이 타고난 구조를 설명한다면, 이 패턴은 '지금 이 시점'의 연애 모드를 설명한다. 사주의 최대 차별점인 시간축을 연애 스타일에 적용한 것. 같은 사람이라도 20대와 40대의 연애 스타일이 구조적으로 다를 수밖에 없는 이유를 대운×나이로 설명한다. 연인이 '왜 요즘 이 사람이 변한 것 같지?'라고 느끼는 현상의 구조적 원인.",
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
        "cross": "사주 단독 패턴. 납음은 60갑자를 30자연물로 압축하는 고유한 분류 체계로, 천간-지지의 조합 에너지를 상징적 이미지로 변환한다. 일간 물상(10분류)보다 세밀하고, 배우자궁 십성(10분류)보다 통합적이다. MBTI에 대응 개념이 없으므로 교차 대상이 아니다.",
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
        "cross": "음양은 에너지의 방향(외향/내향)이고, 오행 과부족은 에너지의 내용(무엇이 넘치고 부족한가)이다. 이 둘의 교차는 '이 사람이 감정을 표현할 때 상대가 실제로 느끼는 체감'을 결정한다. 양우세라도 수과다면 외향적으로 보이지만 감정은 깊이 가라앉아 있고, 음우세라도 화과다면 겉은 조용한데 속은 불타고 있어 언젠가 폭발한다. 단독 음양론이나 단독 오행론으로는 이 복합 체감을 설명할 수 없다.",
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
        "cross": "사주 단독 패턴. 용신(처방 에너지)과 배우자궁 십성(기대 에너지)의 정합성을 비교하는 것은 명리학 내에서도 자주 간과되는 분석이다. '좋은 사람인데 뭔가 부족한 느낌'의 구조적 원인을 설명하며, 궁합 분석에서도 '상대가 내 용신을 채워주는가 vs 내 일지 기대를 채워주는가'를 구분하는 데 핵심적이다.",
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
        "cross": "P-RLC-001이 주도권(방향)을 설명하고 P-RLC-002가 기대(내용)를 설명한다면, 이 패턴은 지속성(리듬)을 설명한다. 같은 신강이라도 12운성이 제왕이면 폭발적이고, 쇠면 원숙하며, 절이면 기복이 극심하다. 연인이 '왜 이 사람은 한동안 잘하다가 갑자기 무관심해지는지'를 에너지 리듬으로 설명할 수 있다.",
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
        "cross": "P-RLC-004가 천간 합충의 내면 구조를 설명한다면, 이 패턴은 지지 합충형해의 생활 영역 구조를 설명한다. 천간은 의식 수준이고 지지는 환경/행동 수준이다. 연인이 체감하는 '이 사람의 모순'은 대부분 지지 충·형·해의 궁위 교차에서 온다. '왜 이 부분만 유독 일관성이 없는지'를 궁위 간 에너지 충돌로 설명한다.",
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
        "cross": "P-RLC-002가 '배우자에게 기대하는 것'(수신)을 설명한다면, 이 패턴은 '배우자에게 주는 것'(발신)을 설명한다. 같은 일지 십성이라도 일간 물상에 따라 발현 양상이 완전히 다르다. 적천수 물상론은 추상적 오행을 구체적 자연물로 번역하여 '이 사람이 사랑할 때 어떤 느낌인가'를 체감적으로 전달할 수 있게 한다.",
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
        "cross": "통변 공식은 에너지 흐름의 '방향과 구조'(어디서 어디로 흐르는가)를 제공하고, MBTI 의사결정 프로세스는 그 흐름을 '어떤 심리적 순서로 실행하는가'를 제공한다. 사주만으로는 '이 사람에게 식상생재 에너지가 있다'는 구조적 정보만 있고, MBTI만으로는 '이 사람의 의사결정 순서는 Fi→Ne→Si→Te'라는 심리적 정보만 있다. 교차할 때 '식상생재의 표현→결과 흐름에서 Ne 단계는 자연스럽지만 Te 단계에서 막힌다'는 구체적 병목 지점이 드러나며, 이것이 연애에서 '의도는 좋은데 실행이 어긋나는 이유'를 정밀하게 설명한다.",
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
        "cross": "사주 단독으로는 '어떤 궁위 사이에서 갈등이 있다'는 위치 정보만 제공한다. MBTI 단독으로는 '이 유형이 루프에 빠지면 이런 패턴'이라는 심리적 메커니즘만 제공한다. 교차하면 '이 사람의 연애에서 왜 하필 이 영역(직장-가정, 현재-미래)에서만 루프가 반복 발동하는가'를 설명할 수 있다. 궁위 충이 루프의 트리거 지점을 특정하고, 루프가 충의 심리적 확대 메커니즘을 설명한다.",
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
        "cross": "사주 단독으로는 '사랑의 에너지 유형(물상×십성)'만 알 수 있고, MBTI 단독으로는 '사랑의 심리적 전달 방식(인지기능+F/T)'만 알 수 있다. 교차하면 '이 사람이 어떤 에너지를 어떤 방식으로 전달하는가'라는 완전한 사랑 표현 프로필이 나온다. 예: '촛불처럼 한 사람만 비추는 에너지(정화+정재)'가 'Fi 깊은 내면 가치 기반으로 전달'되면 극도로 깊은 1:1 헌신이 되지만, 'Fe 사회적 조화 기반으로 전달'되면 상대를 빛나게 해주는 헌신이 된다. 같은 에너지, 다른 전달 — 이것은 교차에서만 보인다.",
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
        "cross": "도화/화개 궁위는 매력이 '어디서' 발동하는지(공간적 좌표)를 제공하고, MBTI의 attract+상호작용 스타일은 '어떤 종류의' 매력인지(심리적 좌표)를 제공한다. 사주 단독으로는 매력의 영역(사회적/사적)과 적극/수동만 알 수 있고, MBTI 단독으로는 매력의 종류(지적/감각적/카리스마적)만 알 수 있다. 교차할 때 비로소 '이 사람은 1:1에서 지적 깊이로 매력을 발산한다' vs '이 사람은 사회적 장면에서 감각적 에너지로 매력을 발산한다'는 구체적 매력 좌표가 완성된다.",
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
        "cross": "이것은 MBTI 내부 교차(갈등 스타일×J/P 강도)로, 연인 관계에서 갈등이 '어떻게 전개되는가'의 시간적 패턴을 결정한다. 사주에서 합/충의 시간적 발동과 대응 가능하나, MBTI는 갈등의 인지적 처리 방식(직면 vs 회피)이 성격 강도에 의해 결정된다는 고유한 설명을 제공한다. J/P 강도가 갈등의 '시간 축'을 결정한다는 점이 이 교차의 고유 가치다.",
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
        "cross": "이것은 MBTI 내부의 인지기능 스택×강도 교차로, 사주 대응 변수 없이도 독립적으로 의미가 있다. 사주에서 첫인상을 설명하는 구조(예: 년주=사회적 외면)와 교차 가능하지만, 이 소주제에서는 'B의 성격이 연인에게 어떻게 비치는가'라는 맥락이므로 첫인상 패턴은 핵심이다. MBTI만으로도 주기능(진짜 자기)과 부기능(사회적 자기)의 노출 비율이 E/I 강도에 따라 달라진다는 고유한 설명이 가능하다.",
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
        "cross": "이것은 MBTI 내부 교차(그립 유형×축 강도)로, 연인 관계에서 '이 사람의 위기 성격'을 예측하는 데 핵심적이다. 사주에서 대응하는 구조(예: 운에서의 충극이 성격 변화를 일으키는 메커니즘)와 교차 가능하나, 이 소주제에서는 MBTI의 그립 이론이 '왜 평소와 다른 사람이 되는가'의 인지적 메커니즘을 고유하게 설명한다. F/T 강도와의 교차는 그립의 폭발 강도를 예측 가능하게 만든다는 점에서 단순 그립 설명을 넘어선다.",
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
        "cross": "도화살/화개살만으로는 '매력이 있다/감성적이다'는 존재 여부만 안다. 음양만으로는 '활동적/수동적'이라는 일반론에 불과하다. 교차하면 '어떤 매력을 어떤 방식으로 표현하는가'가 구체화되어, 연인 관계에서 상대방이 느끼는 매력의 질감을 정밀하게 읽을 수 있다.",
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
        "cross": "공망만으로는 '이 자리가 비어있다'는 구조만 안다. 격국만으로는 '이 역할을 지향한다'는 방향만 안다. 교차하면 '지향하는 역할의 기반이 비어있는 고통' 또는 '안 맞는 역할의 기반이 비어있어서 오히려 자유'처럼, 공망의 심리적 체감을 격국 맥락에서 정확히 짚을 수 있다.",
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
        "cross": "통변 공식만으로는 '재능이 돈이 되는 구조(식상생재)'라는 역학 패턴만 안다. 오행 분포만으로는 '화가 많다/수가 많다'는 양적 정보만 있다. 교차하면 그 역학이 어떤 기질 위에서 작동하는지가 결정되어, 같은 공식이라도 성격 표현이 180도 달라지는 이유를 설명한다.",
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
        "cross": "합/충의 존재만으로는 '합이 있다/충이 있다'는 사실만 안다. 궁위만으로는 '사회궁과 자아궁의 관계'라는 추상적 틀만 있다. 교차하면 '사회적 자아와 본질이 합쳐져 편안한 구조' 또는 '본질과 미래 지향이 충돌하여 주기적으로 흔들리는 구조'처럼, 성격의 안정/불안정 패턴의 원인을 정확히 짚을 수 있다.",
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
        "cross": "십성만으로는 기대 유형(정관=안정적, 편관=카리스마)만 알고 그 기대가 얼마나 실현 가능한지 모른다. 운성만으로는 에너지 상태(건록=활발, 절=끊김)만 알고 무엇에 대한 에너지인지 모른다. 교차 시 '무엇을(십성) 어떤 상태로(운성) 기대하는가'가 되어 연인의 관계 기대치를 입체적으로 그릴 수 있다.",
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
        "cross": "일간 오행만으로는 '이 사람은 나무 같은 사람'이라는 바넘적 서술에 그치고, 강약만으로는 '신강이라 강하다'는 양적 정보에 불과하다. 둘이 교차할 때 비로소 '뿌리 깊은 큰 나무라 밀어붙이는 사람'인지 '뿌리 마른 큰 나무라 겉은 크지만 속은 불안한 사람'인지가 구별된다. 연인 관계에서 이 구별이 핵심이다.",
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
        "cross": "격국만으로는 '무엇을 하는 사람인가(역할)'만 알 수 있고, 조후만으로는 '뜨거운/차가운 사주'라는 기질만 알 수 있다. 교차하면 '뜨거운 표현자(식신격+여름)'와 '차가운 표현자(식신격+겨울)'처럼 같은 역할이 정반대 인상을 주는 이유를 설명할 수 있다.",
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
        "cross": "사주의 일간 오행 관계(상생/상극/비화)와 표면적으로 유사하지만, 인지기능 상호작용은 정보처리 방식의 시너지/갈등이고 오행 관계는 에너지 흐름의 방향이다. 측정 대상이 다르므로 독립적 정보를 제공한다.",
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
        "cross": "사주에는 인지기능 스택 교차라는 개념이 없다. 관계 유형 판별은 8개 인지기능의 위치 비교에서만 가능하며, 이는 MBTI 고유 분석이다.",
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
        "cross": "사주 단독. 오행 보완(레이어3)이 '무엇이 부족한가'를 보는 반면, 조후 보완은 '태어난 계절의 온도 결핍'이라는 더 근본적 층위에서 보완을 설명한다. 같은 수 부족이라도 겨울생의 수 부족과 여름생의 수 부족은 의미가 다르다. 조후 보완은 P-RLC-030(본능적으로 끌리는 에너지의 온도)과 연결되는 궁합 버전이다.",
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
        "cross": "사주의 격국 유형 간 궁합(P-RLC-070: 격국 보완)과 같은 '유형 간 시너지' 주제이지만, 기질은 인지기능 조합에서 나오고 격국은 오행 역학에서 나온다. NF≠식상격, NT≠관성격이므로 1:1 대응이 불가능하며, 각각 독립적 프레임을 제공한다.",
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
        "cross": "사주의 강약 궁합(신강-신약 역할 분담, P-RLC-070)과 구조적으로 유사한 '역할 분담' 주제를 다루지만, 상호작용 스타일은 외부 세계를 향한 행동 양식이고 신강도는 내부 에너지 총량이다. 같은 사람이 신강+behind-the-scenes일 수 있으므로(에너지는 강하지만 행동은 조율형) 독립적 정보.",
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
        "cross": "사주 단독. P-RLC-026(5신 위치)과 P-RLC-062(배우자궁 기대-현실)를 결합한 메타 패턴. 두 독립 레이어가 동시에 긍정이면 '천생연분' 체감, 엇갈리면 '끌리는데 뭔가 안 맞는' 모순적 체감의 근거.",
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
        "cross": "사주 단독 — MBTI에는 지장간이라는 숨겨진 에너지 층위가 없으므로 암합 구조를 설명할 수 없다. 명시적 합이 '의식적 끌림'이라면 암합은 '무의식적 끌림'이며, 이 구분은 사주의 지장간 3겹 구조에서만 가능하다.",
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
        "cross": "사주의 사랑 표현 방식(P-RLC-011: 일간 물상 × 배우자궁 십성)과 같은 '사랑 표현' 주제지만, MBTI의 loveLanguage는 인지기능 선호에서 파생된 심리적 욕구이고, 사주의 사랑 표현은 오행 에너지와 십성 역학에서 파생된 행동 양식이다. 같은 사람이 MBTI적으로 '대화형'인데 사주적으로 '행동형'일 수 있으며, 이 간극 자체가 P-RLC-016에서 다뤄진 바 있다.",
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
        "cross": "사주의 갈등 구조(충·형 궁위, 기신 활성화)는 갈등의 발생 조건을 기술하고, MBTI의 갈등 스타일 정합성은 갈등의 해소 가능성을 기술한다. 둘은 서로 다른 단계(발생 vs 해소)를 다루므로 독립적 정보다.",
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
        "cross": "사주 단독. 십성 교차(레이어6)의 단순 십성 라벨을 넘어서, 육친론(SJ_YUKCHIN_MAP)의 성별별 관계 해석을 적용하여 '이 십성이 연인 맥락에서 무엇을 의미하는가'를 구체화한다. analyzeGunghap의 레이어14(성별 맥락)를 더 풍부하게 확장.",
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
        "cross": "사주 단독. 납음 궁합(레이어12)의 단순 상생/상극 판정을 넘어서, 납음의 시적 이미지(해중금, 대림목 등)와 12운성의 에너지 리듬(장생, 건록, 쇠 등)을 결합하여 관계의 상징적 원형을 그린다. 이것은 커플에게 '우리 관계의 이미지'를 제공하여 관계 정체성을 형성하는 데 기여한다.",
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
        "cross": "사주 단독. 강약 궁합(레이어16)의 단순 분류(A강B약/쌍강/쌍약)를 넘어서, 격국이라는 '역할의 방향성'을 겹쳐 커플의 구체적 시너지 파이프라인을 설명한다. 같은 A강B약이라도 격국 조합에 따라 완전히 다른 시너지가 나온다.",
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
        "cross": "사주 단독. 삼합의 존재 여부(레이어10)를 넘어서, 삼합 시너지가 언제 활성화되는지의 시간축을 추가. 같은 삼합 구조를 가진 커플이라도 현재 대운 조합에 따라 '지금 잘 맞는 시기'인지 '나중에 맞을 시기'인지가 달라진다.",
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
        "cross": "사주 단독. 천간합의 존재 여부를 넘어서, 합이 작동하는 궁위(인생 영역)와 합의 물상적 이미지를 결합하여 커플이 체감하는 시너지의 영역과 질감을 동시에 포착한다.",
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
        "cross": "사주 단독. 오행 보완의 존재 여부(레이어3)를 넘어서 보완이 전달되는 채널(궁위)을 특정함으로써 '왜 이 사람과 있으면 편한가'의 구체적 메커니즘을 설명한다.",
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
        "cross": "사주 단독 — MBTI에는 계절 에너지 공유라는 개념이 없다. 방합은 삼합과 달리 '같은 계절의 동질적 결집'이라는 고유한 역학이며, 이것은 사주의 12지지 계절 체계에서만 분석 가능하다.",
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
        "cross": "사주 단독 — MBTI에는 신살이라는 길흉 에너지 분류가 없다. 천을귀인, 역마살, 화개살 등은 사주 고유의 개념이며 궁위별 작동 영역 분석은 사주의 궁위 체계에서만 가능하다.",
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
        "cross": "합(시너지)과 충(마찰)을 별개로 보면 '좋은 점'과 '나쁜 점'의 나열이지만, 동일한 한 줄 안에 교차시키면 '이 관계의 역설적 본질'이 드러난다. 합만으로는 갈등을 무시하고, 충만으로는 시너지를 놓친다. 양면성의 동시 제시가 한 줄 요약의 핵심 가치이며, 궁위 조합이 그 역설이 어떤 영역에서 작동하는지를 특정한다.",
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
        "cross": "일주 통합 판정(구조적 질감)과 대운 동기화(시간적 위치)는 각각 '어떤 관계인가'와 '지금 어떤 시기인가'를 보여준다. 동일한 쌍합이라도 동반상승기와 함께인내기에서는 완전히 다른 한 줄이 나온다. 구조가 같아도 시간이 다르면 체감이 다르고, 시간이 같아도 구조가 다르면 의미가 다르다.",
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
        "cross": "용신 궁합(원국 균형 기여), 5신 위치(길흉 라벨), 배우자궁 갭(역할 기대)은 각각 다른 차원의 '관계 의미'를 보여준다. 용신만으로는 역할의 구체성이 없고, 5신만으로는 보완 정도를 모르고, 배우자궁만으로는 에너지적 이로움을 모른다. 세 층의 교차로만 '왜 끌리는가 + 좋은가 나쁜가 + 기대에 부합하는가'가 동시에 판정된다.",
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
        "cross": "납음(상징적 원형), 일간 물상(본질적 이미지), 강약 궁합(역학적 방향)의 세 층이 합쳐져야만 만들어지는 자연물 풍경이다. 어느 하나만으로는 구체적 비유가 불가능하다. 납음만으로는 두 사람의 관계 역학이 안 보이고, 물상만으로는 원형적 깊이가 없고, 강약만으로는 이미지가 없다.",
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
        "cross": "P-RLC-057(개인의 감정 질감)과 P-RLC-026(5신 위치)을 화해 맥락에서 결합. 용신 보완도가 높을수록 '의식적 화해 노력 없이도 함께 있으면 풀리는' 구조가 되는데, 이것은 어떤 단독 변수로도 설명 불가. 용신 궁합만으로는 '왜 곁에 있으면 풀리는지'의 감정 질감을 모르고, 과잉 오행 질감만으로는 '상대가 그 질감을 제어하는 존재인지'를 모른다.",
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
        "cross": "P-RLC-088(대운 비동기화의 마찰)을 화해 타이밍으로 전환. 대운 동기화만으로는 '전반적 운세 방향'만 알고, 세운 합충만으로는 '특정 해의 이벤트'만 안다. 교차해야 '올해 화해하기 좋은가 vs 내년까지 기다리는 것이 나은가'가 결정된다.",
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
        "cross": "P-RLC-084(강약×격국)를 화해 주도권으로 구체화하면서 P-RLC-053(분노 만성화)의 쌍방 비교를 결합. 강약만으로는 '누가 더 강한가'만 알고, 분노 만성화만으로는 '누가 더 오래 화가 나는가'만 안다. 교차해야 '강한 쪽이 먼저 풀 수 있는 구조인가'가 결정된다.",
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
        "cross": "P-RLC-026(5신 위치)과 P-RLC-053(분노 만성화)의 교차. 5신 위치만으로는 '화해 후 회복 속도'를 모르고(에너지 방향만 앎), 분노 만성화만으로는 '상대 곁에서의 회복 효과'를 모른다. 두 변수가 교차해야 '화해 후 같이 있을 때 vs 떨어져 있을 때 어느 것이 더 빨리 회복되는가'가 결정된다.",
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
        "cross": "P-RLC-067(합의 풍경)을 화해 채널로 구체화. 단순히 '합이 있다'가 아니라 '어느 궁위의 합이냐'에 따라 화해 방법이 완전히 달라진다. 궁위 심리론(PILLAR_PSYCHOLOGY)과 합의 결합력이 교차해야만 화해 채널의 구체적 영역이 결정된다.",
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
        "cross": "P-RLC-072(납음×12운성)를 화해 역할 분담으로 구체화. 납음만으로는 관계의 상징적 원형만 알고, 12운성만으로는 개인의 에너지 상태만 안다. 두 변수가 교차해야 '누가 먼저 손 내밀고, 어떤 방식으로 화해하는 것이 자연스러운가'가 결정된다.",
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
        "cross": "P-RLC-071(조후 보완)을 화해의 물리적 메커니즘으로 구체화. 조후는 계절 온도이므로 심리적 수준이 아니라 체감적/본능적 수준에서 작동한다. 용신 궁합(P-RLC-095)이 에너지적 보완이라면, 조후 보완은 온도적 보완이다. 둘 다 '상대 곁에 있으면 풀리는가'를 다루지만 작동 층위가 다르다.",
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
        "cross": "P-RLC-062/087(기대-현실 갭)과 P-RLC-068(용신-배우자궁 이중 정합)을 화해 전략으로 결합. 기대-현실 갭만으로는 '갈등의 원인'만 알고, 용신 궁합만으로는 '에너지적 필요'만 안다. 두 변수가 교차해야 '이 갈등이 진짜 문제인가 vs 성장통인가'를 판별할 수 있고, 이 판별이 곧 화해 전략의 방향이 된다.",
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
        "cross": "단방향 성장 촉진(CP-109)과 달리, 양방향 모두 이중 정렬되는 조합은 매우 희귀하다. 이 교차에서만 '장기적으로 함께 일할수록 서로 모두 성장하는 구조적 보장'이 있는지를 판별할 수 있다. MT_RELATION_TYPES.dual이 '서로의 약점을 자연스럽게 보완'이라면, 이 패턴은 dual 역학이 에너지적으로도 뒷받침되는지를 사주로 검증한다.",
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
        "cross": "사주 고유의 시간축 체계. 10년 단위 개인별 에너지 전환 시점의 동기화는 다른 어떤 체계로도 설명할 수 없는 고유 가치. 직장에서 3년 동료 vs 10년 동료의 궤적 예측에 핵심.",
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
        "cross": "용신 보강(에너지적 성장)만으로는 심리적 성장 방향과 무관할 수 있고, growthPath 촉진(심리적 성장)만으로는 에너지적 뒷받침이 없을 수 있다. 이 교차에서만 '에너지적으로도 맞고 심리적으로도 맞는 성장 파트너인가'를 이중 검증할 수 있다. CP-094(인정 기준의 이중 레이어)가 '인정받는 법'의 에너지×심리 정렬이라면, 이것은 '성장 방향'의 에너지×심리 정렬이다. 방향이 A→B 성장 촉진이고 변수 조합(용신+growthPath)이 완전히 다르다.",
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
        "cross": "MBTI의 분노 해소 방식은 '어떤 종류의 반응이 필요한지(인정/해결/논리/시간)'를 알려주고, 사주의 용신은 '그 반응의 핵심 키워드(성장/인정/안정/효율/유연)'를 특정한다. Fi 분노에 '인정'이 필요하다는 것은 MBTI만으로 알 수 있지만, 그 인정을 '효율적 해결책과 함께'(금) 줘야 하는지 '가능성을 열어두며'(목) 줘야 하는지는 용신과 교차해야 나온다.",
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
        "cross": "CP-035(조후 조합 환경 호환)은 '업무 환경 선호'를, CP-037(격국 파격 프레임 선호)는 '업무 방식 선호'를 다뤘다. 여기서는 격국과 조후의 교차 지점에서 '대화의 구조와 속도를 동시에 결정하는 이중 필터'가 나온다. 격국만으로는 속도를, 조후만으로는 구조를 설명할 수 없다.",
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
        "cross": "CP-044(충·형·해 궁위별 지뢰)는 '업무 지뢰 영역'을, CP-060(5신 위치 인식)은 '존재 인식'을 다뤘다. 여기서는 '어떤 주제(궁위)를 누가(5신 위치) 꺼내느냐'의 조합이 대화 지뢰의 정밀 좌표를 제공한다. 궁위만으로는 '누가'를, 5신만으로는 '어떤 주제'를 특정할 수 없다.",
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
        "cross": "CP-019(원국 합 구조 직장 안정 패턴)는 합이 직장 안정성에 미치는 영향을 다뤘다. 여기서는 같은 합 궁위 데이터가 '대화를 어디서부터 시작해야 편한가'라는 실전 진입점으로 전환된다. 안정성(장기 구조)과 대화 진입점(매일의 행동)은 다른 차원의 출력이다.",
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
        "cross": "CP-074(십성 비대칭 구조적 어긋남)은 '관계 인식'을, CP-061(신강도 존재감 인식)은 '존재감'을 다뤘다. 여기서는 두 변수의 교차점에서 '대화 톤의 구체적 불일치 지점'이 나온다. 십성 비대칭만으로는 강도를, 신강도만으로는 방향을 알 수 없다.",
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
        "cross": "CP-038(용신 교차와 업무 시너지)은 '업무 보완 구조'를 다뤘고, 여기서는 '실제 대화에서 어떤 단어와 프레이밍을 써야 하는가'라는 행동 지침으로 전환된다. 같은 용신 데이터이지만 '동기 호환'과 '설득 언어 선택'은 다른 출력이다.",
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
        "cross": "사주의 조후는 '기질적 에너지 온도'에 의한 페이스 선호를, MBTI의 E/I 강도와 상호작용 스타일은 '인지적 에너지 소모 패턴'에 의한 소통 속도를 결정한다. 여름생인데 I88이면 기질적으로는 빠른 대화를 원하지만 인지적으로는 혼자 숙고할 시간이 필요한 이중 구조가 나온다. 이 사람에게는 '빠르게 핵심을 전달하되 반응 시간을 충분히 주는' 전략이 필요하다 — 이것은 교차 없이는 나올 수 없는 지침이다.",
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
        "cross": "MBTI는 '소통 방식 vs 트리거'의 행동 차원 충돌을, 사주의 십성+5신은 '관계적 에너지의 방향과 본질'을 보여준다. A가 INTP(논리 해체형)이고 A→B가 편관이며 A가 B의 기신이면, 논리적 소통 + 권위적 관계 인식 + 에너지 소모가 삼중으로 겹쳐 '대화 자체가 B에게 독'이 된다. 이 삼중 구조는 단일 체계로는 절대 보이지 않는다.",
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
        "cross": "CP-030(의사결정 흐름 × 십성)은 개인 내부의 판단 흐름이었다. 이 패턴은 두 사람의 판단 흐름이 만날 때 '한쪽의 맹점이 다른 쪽의 최우선'이라는 구조적 충돌을 밝힌다. 관계에서 '이 사람은 왜 항상 중요한 걸 빠뜨리지?'라는 상호 좌절의 원인.",
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
        "cross": "CP-074가 '의식적 역할 인식(일간 교차 십성)'의 비대칭을 다루는 반면, 이 패턴은 '무의식적 역할 기대(일지 정기 교차 십성)'를 다룬다. 의식과 무의식의 불일치가 직장에서 '앞뒤가 다른 사람'이라는 인식을 만드는 구조적 원인을 밝힌다. 사주 궁위론에서 일간=의식, 일지=무의식이라는 원리를 활용한 두 층위의 분리가 이 패턴의 고유 가치다.",
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
        "cross": "CP-057(루프 유발 업무 환경)은 개인에 초점이었다. 이 패턴은 '특정 동료의 자연스러운 업무 방식 자체가 상대의 루프 트리거'라는 관계적 구조를 밝힌다. 사주의 기신 자극(CP-071)과 유사한 '존재 자체가 소모적'인 구조의 MBTI 버전이다.",
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
        "cross": "인지기능 축 대극만으로는 '이론적으로 긴장 가능성이 있다'는 구조적 분석이고, 십성 비대칭만으로는 '역할 기대 어긋남'이다. 교차하면 축 긴장의 강도가 십성 방향과 일치하는지를 검증하여 '실제로 이 두 사람이 긴장을 느끼는 강도'를 이중 진단할 수 있다.",
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
        "cross": "CP-042는 개인의 기신 자극 반응이고, CP-060은 5신 위치의 인식 교차다. 이 패턴은 '양방향 기신'이라는 특수 조합에서만 발생하는 상호 소모 구조를 포착한다. 한쪽 기신은 회피로 해결 가능하지만 양쪽 기신은 협업 구조 자체를 재설계해야 한다.",
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
        "cross": "CP-060(5신 위치-십성 인식 교차)은 5신 체계와 십성의 교차다. 이 패턴은 순수하게 십성 비대칭 자체가 만드는 관계 기대 불일치에 집중한다. '나는 너를 이렇게 보는데 너는 나를 저렇게 본다'는 구조적 어긋남이 일상적 업무 마찰의 가장 흔한 원인이다.",
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
        "cross": "CP-035는 조후 호환성의 전반적 판정이다. 이 패턴은 '극단적 온도차'가 업무 리듬에서 구체적으로 어떤 마찰을 일으키는지를 특정한다. 여름생+겨울생 조합은 '왜 아직 안 하지?'(여름) vs '왜 그렇게 급하지?'(겨울)의 반복 루프에 빠지며, 이것은 성격이 아니라 기질 온도의 구조적 차이다.",
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
        "cross": "단순 충·형·해 목록만으로는 '어떻게 표면화되는가'를 알 수 없다. A가 verbal(말로 터뜨림)이고 B가 suppress(참음)이면 A만 문제인 것처럼 보이고, 둘 다 explosive면 회의실이 폭발한다. 궁위(마찰 영역) × 표출 방식(마찰 양상)의 교차가 '맞춰야 할 구체적 행동'을 결정한다.",
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
        "cross": "CP-070(충·형·해 마찰)이 충돌 자체를 다루고, 기존 합 패턴이 결합을 다루는 반면, 이 패턴은 합과 충이 동시에 존재하는 특수 상황의 양가성을 다룬다. 합피충파/탐합망충이라는 우선순위 판정을 통해 '결국 어느 쪽이 우세한가'를 결정하는 것이 고유 가치다. 양가 관계는 단순 충돌이나 단순 결합보다 관계 관리가 어렵기 때문에 '맞춰가야 할 부분'에서 핵심적이다.",
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
        "cross": "CP-037은 격국 파격 자체의 업무 프레임 선호를 다뤘다. 이 패턴은 '두 사람의 파격 조건과 격국이 교차할 때' 발생하는 관계적 긴장을 다룬다. 같은 팀에 상관견관 파격자와 정관격이 있으면 회의 때마다 구조적 충돌이 발생하며, 이는 개인 성향이 아니라 격국 조합의 역학이다.",
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
        "cross": "충은 폭발적이고 원인이 명확하지만, 원진은 서서히 쌓이고 원인을 못 찾는다. 직장에서 '별 문제 없는데 왜 저 사람이 불편하지?'라는 감정의 구조적 원인을 설명한다. CP-044(충·형·해 지뢰)와 달리 원진은 폭발하지 않고 만성적으로 에너지를 소모시키며, 이것이 장기 협업에서 더 치명적일 수 있다.",
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
        "cross": "사주의 B→A 십성은 에너지적 역할 관계(B 기준에서 A의 역할)를 제공한다. MBTI 관계 유형은 인지기능 스택의 구조적 관계(주기능-열등기능 보완, 기능 순서 차이 등)를 제공한다. 사주 단독이면 십성 역할만 보이고, 왜 그 사람이 인지적으로 보완/충돌하는지 설명 불가. MBTI 단독이면 인지적 관계 역학은 보이지만 에너지적 역할 프레임이 빠진다. 교차해야만 '에너지적으로 어떤 역할이고(사주) + 인지적으로 어떤 관계인가(MBTI)'라는 이중 프레임이 완성된다.",
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
        "cross": "CP-059(사주 내부 이중 레이어)에 MBTI의 행동적 레이어를 추가하여 삼중 구조가 된다. 사주만으로는 A의 에너지적 겉(월간)과 B의 에너지적 읽기(십성)만 보이고, A가 실제로 어떤 행동 양식으로 나타나는지는 빠진다. MBTI만으로는 상호작용 스타일은 보이지만 에너지적 층위가 빠진다. 삼중 교차에서만 '사회적 에너지(사주) × 사회적 행동(MBTI) × 본능적 인식(사주)'의 완전한 인식 구조가 드러난다.",
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
        "cross": "5신 단독은 이전 패스로 합의했으나, 여기서는 '5신 위치(용신/기신) × B→A 십성(편관/식신 등)'의 일치/불일치가 핵심이다. 5신이 무의식적 에너지 호불호, 십성이 관계 역할이므로 두 층위의 교차에서만 '왜 이 사람이 나를 불편하게 하면서도 도움이 되는지'를 설명할 수 있다.",
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
        "cross": "B→A 십성은 B의 주관적 에너지 프레임이고, A의 월간 십성은 A가 실제로 직장에서 보여주는 도구다. 이 둘의 일치/불일치를 따로 보는 것은 어떤 단독 변수로도 불가능하다. B→A 십성만으로는 A가 실제로 뭘 보여주는지 모르고, 월간 십성만으로는 B가 어떻게 받아들이는지 모른다.",
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
        "cross": "강약 궁합(패스 합의)은 양방향 주도권 판정(R.details.strength.combo)이다. 여기서는 B→A 단방향 인식이며, B의 신강도 대비 A의 신강도가 B의 주관적 인식에 미치는 영향을 다룬다. 같은 극신강 A라도, B가 극신강이면 '대등한 경쟁자'로 인식하고, B가 극신약이면 '압도적 존재'로 인식한다. 이 단방향 인식은 양방향 궁합으로는 포착 불가.",
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
        "cross": "B→A 십성이 '관계 역할'을, 5신이 '에너지 호불호'를 정의한다면, 신살은 '분위기/아우라'를 정의한다. 도화살이 있는 사람은 십성이 편관이더라도 '카리스마 있는 매력'으로 읽히고, 화개살이 있으면 같은 편관이더라도 '학자적 깊이'로 읽힌다. 신살이 십성의 색조를 바꾸는 것은 신살 단독으로도 의미가 있지만, 직장 인식이라는 맥락에서 월주/일주 궁위와 결합할 때 고유 가치가 극대화된다.",
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
        "cross": "사주의 신강도 차이는 에너지 총량의 물리적 크기감을 제공한다. MBTI의 상호작용 스타일은 그 에너지가 외부로 어떻게 표출되는가를 제공한다. 사주 단독이면 에너지 크기만 있고 표출 방식이 빠진다(극신강이어도 조용할 수 있음). MBTI 단독이면 표출 방식은 있지만 에너지 총량이 없다(in-charge여도 에너지가 작을 수 있음). 교차해야만 '에너지 크기 × 표출 방식'이라는 존재감의 완전한 구조가 나온다.",
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
        "cross": "사주의 B→A 십성은 평시의 역할 기대를 고정시킨다. MBTI의 갈등 blindSpot은 위기 시 드러나는 인지적 약점이다. 사주 단독이면 역할 기대만 있고 갈등 시 실제 행동 예측이 안 된다. MBTI 단독이면 갈등 행동은 예측되지만 B가 어떤 기대를 가지고 있었는지(따라서 얼마나 충격받는지)는 빠진다. 교차해야만 '기대(사주) × 현실(MBTI)'의 격차에서 오는 인식 전환의 강도를 예측할 수 있다.",
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
        "cross": "사주는 '어떤 에너지로 읽히는가'(본능적 역할 프레임)를 제공하고, MBTI는 '무엇을 먼저 보는가'(인지적 포착 채널)를 제공한다. 사주 단독이면 B→A 십성이 전부이고 B의 인지적 편향은 빠진다. MBTI 단독이면 B의 인식 채널은 있지만 A가 B에게 어떤 역할 에너지로 읽히는지는 빠진다. 교차해야만 '무엇을 보는가 × 어떻게 읽히는가'라는 인식의 완전한 이중 구조가 드러난다.",
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
        "cross": "조후는 '어떤 에너지가 부족한가'(차가운 사람에게 따뜻한 자극, 뜨거운 사람에게 차분한 환경)의 근본 방향을, 셀프케어 패턴은 '구체적으로 무엇을 해야 충전되는가'(혼자 독서 vs 팀 운동 vs 지적 토론)의 실행 방법을 결정한다. 같은 '조용한 회복'이라도 조후가 수 과다인 사람은 약간의 사회적 자극을 섞어야 균형이 잡히고, Ni 주기능자는 순수하게 혼자여야 한다. 이 구분은 교차에서만 나온다.",
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
        "cross": "기존 CP-004가 개인의 조후를 다뤘다면, 이 패턴은 두 사람의 조후 조합이 공유 업무 환경에서 만들어내는 호환/충돌을 다룬다. 같은 계절 출생이면 '우리 팀 회의 스타일 편하다'가 되고, 반대 계절이면 '왜 항상 회의가 불편하지?'의 원인이 된다. 이것은 개인 성격이 아니라 두 사람이 같은 공간에서 느끼는 에너지 호환의 문제다.",
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
        "cross": "CP-003이 월간 십성×일지 12운성의 개인 내부 괴리를 다뤘다면, 이 패턴은 두 사람의 12운성 조합이 만드는 업무 속도 호환/불일치를 다룬다. 개인 성격이 아니라 팀 작업 시 마감 접근 방식의 구조적 차이를 설명한다.",
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
        "cross": "CP-023이 A용신이 B오행에 있는지(에너지 보완)를 다뤘다면, 이 패턴은 용신 방향 자체가 업무 동기/보상 선호를 결정하고, 두 사람의 방향 일치/불일치가 프로젝트 선택과 업무 만족도에 영향을 미치는 구조를 다룬다. '서로 에너지를 주는가'가 아니라 '같은 것을 원하는가'의 문제다.",
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
        "cross": "기존 패턴들이 격국의 유형을 다뤘지만, 파격 여부의 이진 판별이 두 사람의 업무 프레임 선호를 구조적으로 갈라놓는다는 점은 새롭다. 파격은 '규칙 안에서 불편한 사람'이고, 이것이 두 사람 사이에서 업무 방식 충돌의 근본 원인이 된다.",
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
        "cross": "CP-WORK-STYLE-V026이 '팀 맹점 증폭'을 다뤘지만 그것은 십성 결핍 동일에 초점이었다. 이 패턴은 공망이라는 독립적 메커니즘(빈 궁위)이 업무 동기의 구조적 맹점을 만드는 것을 다룬다. 십성 결핍과 공망 결핍은 원인이 다르다 — 십성은 '에너지 부족', 공망은 '자리 자체가 비어있음'.",
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
        "cross": "findBrokenChain()은 개인의 오행 단절을 분석하지만, 두 사람의 단절 지점을 대조하여 팀 프로세스의 구조적 병목/보완을 판별하는 것은 새롭다. 이것은 오행 보완(CP-023의 용신↔오행)과 다르다 — 용신은 '필요한 에너지를 주는가'이고, 이것은 '업무 프로세스의 어디에서 팀이 막히는가'의 문제다.",
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
        "cross": "CP-040은 '프로세스 병목'이라는 문제 진단이었다면, 이 패턴은 '상대가 내 병목을 해소해줌으로써 팀 역량이 확장된다'는 시너지 진단이다. 단순히 부족 오행 보유 여부가 아니라 findBrokenChain의 구조적 단절 + 상대의 해당 오행 충분 보유가 동시에 성립해야 한다.",
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
        "cross": "CP-035(조후 조합 + 환경 선호 호환성)는 '두 사람이 선호하는 업무 환경이 맞는가'를 다뤘고, CP-034(사회적 도구 × 상호작용 스타일)는 '월간 십성과 표출 방식의 일치'를 다뤘다. 이 패턴은 기질 온도(선천적 에너지 성질)와 상호작용 스타일(인지기능 기반 팀 역할 모드)의 교차로, '추진하는 사람이 실제로 뜨거운 기질인가, 조절하는 사람이 실제로 차가운 기질인가'라는 정렬/불일치를 본다. 정렬 시 역할이 자연스러워 에너지 소모가 적고, 불일치 시 역할과 기질의 괴리가 팀 피로를 만든다. 이 진단은 사주 단독(조후만)으로도, MBTI 단독(상호작용 스타일만)으로도 불가능하다.",
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
        "cross": "사주의 기신 오행은 5행 에너지 기반으로 '어떤 종류의 자극'이 불쾌한지를 포착하고, MBTI의 갈등 트리거는 인지기능 기반으로 '어떤 상황'이 갈등을 일으키는지를 포착한다. 같은 '싫어하는 것'이라도 에너지 차원(사주)과 인지 차원(MBTI)이 다른 축을 측정하므로, 일치 시 이중 확인 효과가 있고, 불일치 시 단일 체계로는 놓칠 숨겨진 지뢰를 발견한다.",
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
        "cross": "사주의 오행 상극은 '에너지적 본능 거부'를, MBTI의 인지기능 축 긴장은 '인지적 처리 방식 거부'를 각각 보여줌. 두 체계의 거부 방향이 같으면 '관계 근본의 마찰'이고, 다르면 '다른 차원에서 각각 불편한 복합 거부'가 됨 — 사주만으로는 구체적 업무 행동 수준의 마찰을 못 보고, MBTI만으로는 에너지적 본능 거부를 못 봄",
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
        "cross": "사주의 과잉 오행은 선천적 에너지 편향을 보여주고, MBTI의 주기능 과잉 사용은 후천적 인지 편향을 보여준다. 두 편향의 방향이 일치하면 과부하 임계점이 낮아지고(작은 자극에도 폭발), 불일치하면 서로 다른 차원의 과잉이 존재하므로 복합적 스트레스 반응이 나타난다.",
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
        "cross": "사주 조후는 선천적 에너지 온도(신체/기질 수준)를 보여주고, MBTI 기질은 인지적 핵심 욕구와 갈등 패턴을 보여준다. 두 기질 체계가 같은 방향으로 부정당하면 '존재 기반 부정'이, 다른 방향으로 부정당하면 '내적 분열(몸은 거부하지만 마음은 수용)'이 발생하며, 이 분열 패턴은 단일 체계로는 포착 불가능하다.",
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
        "cross": "MBTI 열등기능 자극은 인지기능 스택의 구조적 취약점에서 발생하는 것으로, 사주의 기신 오행 자극과는 완전히 다른 이론적 기반(Jung의 보상 원리 vs 오행 상극)에서 같은 현상(업무 지뢰)을 포착한다. CP-050과 결합하면 에너지 차원(사주)과 인지 차원(MBTI)의 이중 지뢰 지도가 완성된다.",
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
        "cross": "충·형·해의 궁위별 의미는 '어떤 인생 영역에서 구조적 긴장이 있는가'를 보여주는 사주 고유 체계다. 이것이 업무 맥락과 만나면 해당 영역을 건드리는 행위가 왜 유독 과민 반응을 일으키는지를 구조적으로 설명한다.",
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
        "cross": "12운성은 일간 에너지의 생명 주기상 위치를 나타내는 사주 고유 시스템이다. 각 단계마다 자연스러운 업무 리듬이 다르며, 이 리듬에 역행하는 외부 요구가 왜 특정인에게 유독 강한 반발을 일으키는지를 생명 주기 관점에서 설명한다.",
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
        "cross": "양인살과 괴강살은 사주 신살 체계에서 가장 강렬한 에너지 표지다. 이 신살이 직장 관계에서 어떤 구체적 행동(마이크로매니지먼트)과 충돌하는지를 매핑하면, 일반적 성격론으로는 설명할 수 없는 과격한 반발 반응의 원인을 진단할 수 있다.",
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
        "cross": "공망은 사주에서 '에너지가 비어있는 궁위'를 보여주는 고유 체계다. 비어있는 곳은 가장 민감한 곳이며, 외부에서 그곳을 자극하면 반발의 강도가 다른 영역보다 훨씬 크다. 이것은 일반적 약점 분석과 다르게, 구조적으로 '왜 여기가 약한가'를 설명한다.",
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
        "cross": "루프 패턴은 그립(열등기능 폭발)과 다른 메커니즘이다 — 그립은 즉각적 폭발이지만 루프는 만성적 악순환이다. 동료의 업무 방식이 부기능을 차단하는 구조적 환경을 만들면, 개인은 자각 없이 루프에 빠져 서서히 소진된다. 이것은 '갑자기 폭발하는 지뢰'가 아니라 '서서히 독이 퍼지는 업무 환경'이다.",
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
        "cross": "5신 체계는 용신을 중심으로 모든 오행에 길흉 라벨을 부여하는 사주 고유 시스템이다. '싫어하는 것'을 감정이 아닌 에너지 구조로 설명할 수 있어, 본인도 인식하지 못하는 무의식적 반발의 원인을 진단한다.",
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
        "cross": "파격은 격국의 건강한 에너지 흐름이 뒤틀린 구조다. 이 뒤틀림이 만드는 과민 반응은 일반적 성격론으로 설명할 수 없는, 사주 구조에서만 도출되는 고유한 '업무 트라우마 지도'다.",
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
        "cross": "오행 과부족은 사주 에너지 구조의 불균형이다. 과잉 오행의 excess 키워드가 직접적으로 '어떤 업무 행동이 과부하를 일으키는가'를 예측한다. 부족 오행의 lack 키워드는 '어떤 요구가 불안을 일으키는가'를 예측한다.",
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
        "cross": "조후는 월지(태어난 달)로 결정되는 사주의 기본 기질 온도다. 이 온도에 역행하는 업무 요구는 단순한 '싫어하는 것'이 아니라 기질 자체를 부정당하는 경험이므로, 반발의 깊이가 다른 패턴보다 근본적이다.",
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
        "cross": "사주 파격은 원국 내 에너지 구조의 파괴 패턴으로 '어떤 자극에 과거 상처가 재활성화되는가'를 보여주고, MBTI 분노 패턴은 인지기능 역학으로 '분노가 어떤 행동으로 외현화되는가'를 보여준다. 원인(사주)과 양식(MBTI)의 교차는 단일 체계로는 불가능한 완전한 폭발 시나리오를 생성한다.",
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
        "cross": "사주의 양인살/괴강살은 선천적 통제 민감도를 보여주고, MBTI 상호작용 스타일은 평소의 행동 표현 양식을 보여준다. 선천적 민감도와 평소 표현이 불일치할 때(조용한 사람인데 통제에 극도로 민감) 가장 예측 불가능한 폭발이 발생하며, 이것은 단일 체계로는 포착할 수 없다.",
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
        "cross": "사주 공망은 에너지 구조의 결손(선천적 빈 공간)을 보여주고, MBTI coreFear는 인지적 핵심 공포(심리적 취약점)를 보여준다. 에너지 결손과 심리적 공포가 같은 영역에 겹치면 구조적+심리적 이중 취약점이 되며, 이는 단일 체계의 분석보다 훨씬 정밀한 약점 지도를 제공한다.",
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
        "cross": "MBTI 관계 유형만으로는 '인지적 궁합'만 보이고 직장에서의 구체적 역할 분담은 알 수 없다. 사주 격국 궁합만으로는 역할 상보성은 보이지만 두 사람의 사고/판단 방식이 어떻게 맞물리는지 알 수 없다. 교차해야 '이 두 사람이 같은 팀에서 인지적으로도 역할적으로도 어떤 관계인가'의 입체적 판정이 가능하다.",
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
        "cross": "사주 5신 교차만으로는 '에너지적 호불호'는 알지만 갈등이 어떤 인지적 패턴으로 표출되는지 모른다. MBTI 갈등 스타일만으로는 표출 패턴은 알지만 '왜 이 두 사람 사이에 유독 갈등이 잦은가'의 에너지적 기반을 모른다. 교차해야 갈등의 '근본 원인(에너지 구조)'과 '표출 형태(인지적 패턴)'가 모두 설명된다.",
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
        "cross": "신강/신약 개념은 사주 고유의 에너지 총량 체계다. 일간이 주변 오행으로부터 받는 지지 비율로 계산되며, MBTI에는 이런 '전체 에너지 총량 비교' 개념이 없다. E/I 축 강도와 유사해 보이지만, 신강/신약은 사회적 에너지가 아니라 존재론적 에너지 총량이다.",
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
        "cross": "MT_CAREER는 인지기능 스택에서 도출된 적성이고, SJ_JOB_APTITUDE는 격국·십성·오행에서 도출된 적성이다. 완전히 다른 이론적 기반에서 같은 결론이 나오면 강력한 이중 검증이 되고, 다른 결론이 나오면 한 체계만으로는 보이지 않는 내적 갈등이 드러난다.",
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
        "cross": "이 패턴은 사주 내부 구조(지장간→천간 투출)로 완결된다. 투출은 '잠재력의 의식화'라는 사주 고유 개념이며, 대운에서 해당 천간이 오면 미투출 에너지가 발현되는 시간축 역학도 포함한다.",
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
        "cross": "사주의 시간축(대운/세운) 체계는 MBTI에 존재하지 않는 고유 차원이다. 매년 변하는 천간지지가 두 사람 각각의 원국과 맺는 합충 관계를 교차 계산하여 '언제 함께하면 좋고 나쁜가'를 구체적 연도로 특정할 수 있다. 이는 사주만의 고유 기여다.",
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
        "cross": "두 사람의 사주 데이터를 교차하는 궁합 분석이지만, 양쪽 모두 사주 변수다. 용신 개념 자체가 사주 고유이며, MBTI에는 '이 사람에게 필요한 핵심 에너지'라는 구조가 없다.",
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
        "cross": "5신 체계는 사주 고유의 에너지 분류법으로, 용신을 기준으로 모든 오행을 길흉으로 분류한다. MBTI에는 '특정 인지기능이 나에게 도움이 되는가 방해가 되는가'를 체계적으로 분류하는 구조가 없다. 5신 교차는 사주만의 고유 기여다.",
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
        "cross": "두 사주의 십성 분포를 교차 비교하는 순수 사주 궁합 패턴이다. 통변 공식(식상생재, 살인상생 등) 16개가 두 사람 합산에서도 감지되므로, 팀 역학을 사주만으로 설명할 수 있다.",
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
        "cross": "MT_TEMPERAMENTS의 핵심 욕구는 MBTI 4글자에서 자동 도출되는 상위 기질이고, 격국의 사회적 지향은 사주 구조에서 도출되는 역할이다. 둘 다 '이 사람이 직장에서 무엇을 추구하는가'를 말하지만 완전히 다른 경로로 도달한다. 정렬되면 이중 확인으로 확신이 생기고, 불일치하면 두 체계만이 보여줄 수 있는 '숨겨진 내적 갈등'이 드러난다.",
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
        "cross": "MBTI 단독으로는 의사결정의 인지적 순서(어떤 렌즈로 먼저 보는가)만 알 수 있고, 그 결정에 어떤 에너지적 무게가 실리는지는 모른다. 사주 단독으로는 에너지적 우선순위만 있고 구체적 인지 처리 순서가 없다. 교차해야 '이 사람이 왜 이 결정을 이 속도로 내리는가'가 설명된다. 두 동료의 의사결정 흐름×십성 우선순위를 비교하면 '어디서 합의가 빠르고 어디서 교착이 생기는가'를 예측할 수 있다.",
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
        "cross": "사주 단독으로는 십성 분포가 역할 분담만 보여주고 '어떤 인지적 방식으로 그 역할을 수행하는가'는 알 수 없다. MBTI 단독으로는 인지기능 상호작용이 보여주지만 '직장에서 구체적으로 어떤 역할을 맡는가'는 알 수 없다. 교차해야만 '이 두 사람이 같은 팀에서 어떤 역학으로 일하는가'의 전체 그림이 나온다. complement인데 동질 십성이면 '인지적으로는 보완하지만 역할에서 충돌'하는 예외적 패턴도 교차에서만 발견된다.",
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
        "cross": "사주만으로는 '두 사람의 사회적 도구가 상보적인가'는 알 수 있지만 '그 도구를 어떤 방식으로 사용하는가'는 모른다. 인지기능만으로는 '소통 방식의 호환성'은 알지만 '어떤 에너지적 도구를 꺼내 쓰는가'는 모른다. 관성 월간(규율 도구) + chart-the-course(계획적 소통)은 '체계적 규율 수립자'이고, 관성 월간 + behind-the-scenes(배후 소통)은 '조용히 규칙을 만드는 참모형'이다. 같은 관성 도구가 소통 방식에 따라 완전히 다른 직장 역할로 발현된다.",
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
        "cross": "CP-012(격국×상호작용 스타일)가 '구조적 역할×소통 방식'이라면, 이 패턴은 '의식적 도구×소통 방식'이다. 격국은 무의식적 역할 경향이고 월간 십성은 의식적 선택이므로, 직장에서 실제로 관찰되는 행동은 월간 십성×상호작용 스타일이 더 가깝다. 격국은 장기적 커리어 방향, 월간은 일상적 업무 행동.",
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
        "cross": "CP-013이 충(급성 갈등)을 다루었다면 이 패턴은 형(만성 갈등)과 해(미세 에너지 누수)를 다룬다. 사주에서 형과 해는 충보다 체감이 미묘해서 본인이 원인을 모르는 경우가 많은데, MBTI 갈등 스타일이 '그 미묘한 마찰이 어떤 행동으로 표출되는가'를 구체화한다. 사주 단독으로는 '마찰이 있다'까지, 교차하면 '어떻게 행동하는가'까지.",
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
        "cross": "사주의 관성/식상 비율은 '어떤 에너지가 타고났는가'를 말하고, J/P 축 강도는 '그 에너지를 환경에 어떻게 적용하는가'를 말한다. 사주 단독으로는 관성 우세자가 실제 직장에서 얼마나 강하게 통제를 시도하는지 알 수 없고, MBTI 단독으로는 J/P 성향의 에너지적 뿌리가 어디서 오는지 설명 못 한다. 교차하면 '규율 에너지의 근원(사주)과 발현 강도(MBTI)'가 동시에 드러난다.",
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
        "cross": "사주 오행 결핍만으로는 '무엇이 부족한가'는 보이지만 그 결핍이 인지적으로 어떻게 처리되는지(회피, 보상, 통합 시도)를 모른다. MBTI 열등기능만으로는 인지적 미발달 영역은 보이지만 그것이 이 사람의 에너지 구조에서 어떤 위치에 있는지를 모른다. 교차하면 '결핍의 에너지적 구조(사주) + 결핍의 인지적 처리 방식(MBTI)'이 연결되어 직장 동료의 성장 가능성과 한계를 동시에 본다.",
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
        "cross": "사주 조후만으로는 기질의 온도 방향(뜨겁다/차갑다)은 보이지만 그 온도가 '건강하게 쓰이는가 vs 파괴적으로 쓰이는가'의 질적 차이를 판별할 도구가 부족하다. MBTI 성숙도만으로는 기능의 건강도는 보이지만 그 기능이 작동하는 '기질적 배경 온도'를 모른다. 교차하면 '이 온도(조후)에서 이 수준(성숙도)으로 작동하는 기능'이라는, 같은 유형 내에서도 개인차를 설명하는 프로필이 나온다.",
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
        "cross": "사주 격국만으로는 '어떤 역할을 맡는가'는 보이지만 그 역할을 수행하는 '소통 방식'(지시형인가, 제안형인가, 열정적 초대형인가)이 안 보인다. MBTI 상호작용 스타일만으로는 소통 방식은 보이지만 이 사람이 '왜 그 포지션에 끌리는가'의 심층 동기가 안 보인다. 교차하면 '이 역할을(격국) 이 방식으로(상호작용 스타일) 수행한다'는 직장 페르소나의 완전한 프로필이 나온다.",
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
        "cross": "이 패턴은 MBTI 교차 없이 사주 단독으로 성립한다. MBTI에 '내적 조화 구조'에 해당하는 직접적 개념이 없다. 합의 직장 성격 영향은 사주 고유의 설명력이다.",
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
        "cross": "합충만으로는 '어디서 부딪히는가'만 알고, 십성만으로는 '어떤 에너지가 있는가'만 안다. 교차하면 '어떤 에너지끼리 부딪히는가'가 나온다. 이것이 직장에서의 '내적 갈등의 정체'를 정확히 짚어준다. ST5_RELATIONS_PHILOSOPHY.chung.psychological: '내면의 모순이 터져나옴'.",
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
        "cross": "월간 십성만으로는 '직장에서 어떤 에너지를 쓰는가'만 보이고, 일지 12운성만으로는 '내면 에너지 상태'만 보인다. 교차하면 '꺼내 쓰는 에너지를 뒷받침할 내면 체력이 있는가'가 드러난다. 이 괴리가 클수록 직장에서 '겉과 속이 다른 사람'으로 인식된다. 예: 월간 정관(규율적)+일지 목욕(변화무쌍) = 겉은 반듯한데 속은 자유로운 영혼.",
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
        "cross": "일간만으로는 '성격의 재질'만 알 수 있고, 격국만으로는 '사회적 역할'만 알 수 있다. 이 둘이 교차해야 '이 재질이 이 역할을 할 때 어떤 특유의 방식이 나오는가'가 설명된다. 예: 같은 식신격이라도 병화 일간이면 화려하게 뿜어내는 표현이고, 계수 일간이면 은은하게 스며드는 표현이다. 이 차이는 어느 한쪽만으로는 설명 불가.",
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
        "cross": "이 패턴은 사주 고유의 시간축 변수다. MBTI에는 10년 주기로 성격 에너지가 변하는 개념이 없다. 사주의 최대 차별점인 시간축(ST5_PRINCIPLES.p5_timeAxis)이 직장 성격에도 적용된다. '같은 사람인데 왜 3년 전과 지금이 다른가?'를 설명하는 유일한 변수.",
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
        "cross": "ILJU_KW만으로는 60가지 원형 성격이 나오고, 십성 분포만으로는 에너지 구조가 나온다. 교차하면 '이 원형이 이 에너지 구조에서 어떤 버전으로 발현되는가'가 나온다. 같은 병오(에너지 최강, 과열 위험)라도 인성 우세면 '학구적 열정가', 재성 우세면 '불꽃 사업가'로 전혀 다른 직장 성격이 된다.",
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
        "cross": "격국만 보면 '이 사람의 사회적 역할'이 보이고, 신강만 보면 '에너지가 넘치는가 부족한가'가 보인다. 교차하면 '이 역할을 감당할 힘이 있는가'가 나온다. 같은 편관격이라도 극신강이면 압박을 즐기는 장군이고, 극신약이면 압박에 짓눌리는 졸병이다. 처방도 정반대: 신강 편관격은 에너지를 빼줘야(식상/재성), 신약 편관격은 에너지를 채워줘야(인성/비겁).",
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
        "cross": "오행 부족만으로는 '무엇이 없는가'만 알고, 직업 적성만으로는 '무엇을 잘하는가'만 안다. 교차하면 '없는 것을 채우기 위해 어떤 직업적 행동을 하는가'가 나온다. 금(金) 부족한 사람이 칼같은 결단력을 요하는 직업을 선택하는 것은 보상 행동이다. 이 패턴을 알면 동료의 '의외의 행동'이 이해된다.",
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
        "cross": "신살만으로는 '이런 에너지가 있다'는 것만 알고, 궁위만으로는 '이 자리의 역할'만 안다. 교차하면 '이 에너지가 이 삶의 영역에서 어떻게 작동하는가'가 나온다. 직장 동료 성격 분석에서는 특히 월주(직업궁)에 걸린 신살이 핵심이다. 월지 도화살+월간 식신 = '직장에서 말솜씨와 매력으로 사람을 끌어모으는 사교 달인'.",
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
        "cross": "일간 오행만으로는 '어떤 재질인가'만 알고, 월지만으로는 '어떤 계절에 태어났는가'만 안다. 교차하면 '이 재질이 이 계절에서 어떤 상태인가'가 나온다. 궁통보감(JOHU 테이블)이 이 교차를 120가지로 세밀하게 정의하고 있다. 처방(용신)도 이 교차에서 나온다. 직장 성격에서 '왜 이 사람은 급한가/느린가/뜨거운가/차가운가'의 근본 원인.",
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
        "cross": "사주만으로는 '이 사람의 내적 긴장이 높다'는 구조를 보여주지만 그 긴장이 풀릴 때 어떤 구체적 행동 패턴(루프 순환, 그립 폭발)으로 나타나는지를 특정하지 못한다. MBTI만으로는 루프/그립의 메커니즘은 설명하지만 왜 같은 유형이라도 어떤 사람은 루프에 잘 빠지고 어떤 사람은 안 빠지는지를 설명할 근거가 부족하다. 교차하면 '루프/그립 취약성의 구조적 근거(사주) + 발현 메커니즘(MBTI)'이 연결되어, 스트레스 시 직장 동료의 행동을 예측하는 데 두 체계 모두 필요한 정보를 제공한다.",
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
        "cross": "사주 합충형해만으로는 '어떤 에너지가 충돌하는가'는 보이지만 그 충돌이 '어떤 행동 패턴으로 표출되는가'(논리적 해체, 감정 폭발, 침묵 후 단절 등)를 특정할 수 없다. MBTI 갈등 스타일만으로는 표출 패턴은 보이지만 왜 이 사람에게 유독 갈등이 잦은지의 구조적 원인이 안 보인다. 교차하면 '갈등의 구조적 원인(사주) + 갈등의 행동적 표출(MBTI)'이 연결된다.",
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
        "cross": "사주만으로는 '겉과 속이 다르다'는 것을 식별하지만 그 괴리가 어떤 인지적 메커니즘으로 발현되는지 모른다. MBTI만으로는 축 긴장의 역학을 설명하지만 왜 이 특정인의 괴리가 유난히 큰지를 설명할 근거가 부족하다. 교차하면 '이 사람의 겉-속 괴리가 왜 생겼는가(사주 구조) + 그것이 어떻게 발현되는가(MBTI 축 긴장)'를 동시에 설명한다. 특히 두 체계 모두 괴리를 가리킬 때 해석의 신뢰도가 급상승한다.",
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
        "cross": "사주 신강/신약만으로는 '에너지가 많다/적다'는 알지만 그 에너지가 사회적으로 어떻게 표출되는지(외향/내향)와 어떤 방식으로 조직되는지(판단/인식)를 모른다. MBTI 축 강도만으로는 '선호의 강도'는 알지만 그 아래 깔린 에너지 원천의 총량을 모른다. 교차하면 '에너지 총량 × 에너지 방향 × 에너지 조직화 방식'의 3중 프로필이 나온다. 특히 두 체계가 불일치할 때(예: 사주 신약인데 E축 88) '왜 이 사람이 사교적인데 항상 지쳐 보이는가'를 설명할 수 있다.",
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
        "cross": "사주 일간×격국만으로는 '역할의 방향'은 보이지만 '인지적 처리 전략'이 안 보인다. MBTI 주기능만으로는 '처리 방식'은 보이지만 '이 사람이 어떤 재료로 만들어진 존재인가'의 질감이 없다. 교차하면 '이 재료(일간)가 이 역할(격국)을 이 방식(주기능)으로 수행한다'는 3차원 성격 프로필이 나온다. 이것은 어느 한 체계만으로 도달할 수 없는 입체성이다.",
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
        "cross": "MBTI 단독으로는 인지기능 보완만 보이고, 사주 단독으로는 십성 역할 인식만 보인다. 교차하면 'B가 A를 어떤 역할로 인식하는지(십성)'와 'A가 실제로 B의 약점을 보완할 수 있는지(blind 커버)'의 정렬/불일치가 드러난다. 정렬 시 인정이 자연스럽고 강력하며, 불일치 시 A가 역할 재프레이밍을 해야 하는 구체적 방향이 도출된다.",
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
        "cross": "사주 단독으로는 '에너지 제공 가능성'만 보이고, MBTI 단독으로는 '심리적 충족 가능성'만 보인다. 교차하면 A가 B를 위해 무의식적으로 제공하는 에너지와 행동이 얼마나 일치하는지 구조적으로 진단할 수 있다. 불일치 시 어느 채널을 우선 강화할지 처방이 가능하다.",
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
        "cross": "사주 단독으로는 B의 에너지적 필요만 보이고, MBTI 단독으로는 B의 심리적 필요만 보인다. 교차하면 두 기준의 정렬/불일치가 드러나며, 불일치 시 A가 어떤 행동을 우선해야 하는지(에너지적 충족 vs 심리적 충족)의 전략적 판단이 가능해진다.",
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
        "cross": "B→A 십성 단독으로는 역할 인식만, 5신 단독으로는 에너지 가치만 알 수 있다. 둘의 교차에서 '인식은 좋은데 에너지가 안 맞는' 또는 '에너지는 맞는데 역할 인식이 부정적인' 양가 구조가 드러나며, 이것이 인정받기 위한 전략을 결정한다.",
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
        "cross": "CP-037(격국 파격 조합)이 두 사람의 파격이 서로 자극하는 구조를 다뤘다면, 이 패턴은 B의 파격에 대한 A의 구체적 행동 처방에 초점을 맞춘다. 파격 유형별로 인정받는 행동과 지뢰 행동이 정반대로 갈리는 것이 핵심 가치.",
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
        "cross": "CP-023이 양방향 시너지를 다뤘다면, 이 패턴은 A→B 단방향의 '에너지 제공 가능량'에 초점을 맞춰 구체적 행동 처방(자연적 행동 vs 의식적 노력 vs 채널 전환)을 도출한다.",
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
        "cross": "용신 단독으로는 필요 에너지만, 격국 단독으로는 역할 선호만 알 수 있다. 둘의 교차에서 '어떤 에너지를 어떤 방식으로 제공해야 인정받는가'의 구체적 행동 지침이 도출된다.",
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
        "cross": "CP-089(용신×격국)가 B의 '항구적 인정 기준'을 다뤘다면, 이 패턴은 '현재 시기의 인정 기준'을 다룬다. 같은 B라도 5년 전과 지금 인정하는 포인트가 다를 수 있다는 시간축 동적 처방이 핵심 가치.",
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
        "cross": "CP-087(분노 해소 × 용신 방향)은 사주 내부에서 angerType과 용신의 조합이었고, CP-094(인정 이중 레이어)는 '인정받는 법' 맥락이었다. 이것은 '트러블 복구'라는 특수 맥락에서 용신 에너지 방향(사주의 체질적 안정화 조건)과 needsFromOther(MBTI의 인지적 갈등 해소 조건)를 교차한다. 체질적 안정화와 인지적 갈등 해소는 독립적 레이어이며, 두 처방이 합치되면 단일 체계로는 불가능한 정밀 처방이 된다.",
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
        "cross": "MBTI에는 시간축이 없으므로 '이 트러블이 일시적인지 영구적인지'를 진단할 수 없다. 사주의 대운/세운 시스템만이 마찰의 시간적 성격을 판별한다. 원국 충·형·해가 '이 관계의 구조적 약점'이고, 세운 충이 '올해의 일시적 자극'이라는 이중 구조는 사주 고유의 진단 프레임이다.",
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
        "cross": "통관용신은 오행 상생 체인(목→화→토→금→수)에서 상극 관계를 중재하는 제3의 오행을 찾는 사주 고유의 메커니즘이다. MBTI에는 '두 유형 사이를 중재하는 제3의 유형'이라는 구조적 개념이 없다. MT_RELATION_TYPES에 benefactor(수호자) 관계가 있으나 이것은 특정 유형 쌍에 고정된 것이지 상극 관계의 동적 중재 처방이 아니다.",
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
        "cross": "통변 공식은 십성 간 에너지 흐름의 생극 관계(상생/상극/설기/극출)로 작동하며, MBTI의 인지기능 상호작용(complement, tension)과는 작동 메커니즘이 완전히 다르다. '두 사람의 에너지를 합산했을 때 어떤 역학이 자동 발생하는가'는 사주 십성 체계 고유의 분석이다.",
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
        "cross": "조후론은 사주 고유의 기질 온도 체계이다. MBTI에는 '감정의 달아오르는 속도와 식는 속도'를 직접 설명하는 변수가 없다. MT_SELFCARE의 recharge/warning은 일반적 피로 회복 패턴이지 트러블 후 감정적 회복의 시간차를 다루지 않는다. 조후 조합(여름×겨울, 봄×가을)이 복구 시간차를 구조적으로 예측하는 것은 사주 단독의 고유 가치다.",
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
        "cross": "angerType은 일간 오행(목=stubborn, 화=flashfire, 토=earthquake, 금=blade, 수=flood) + 상관/겁재 보유 여부로 결정되는 사주 고유의 분노 유형화이다. 5신 기신과의 연쇄 자극 구조도 사주 에너지 역학 내부에서 완결된다. MBTI의 갈등 스타일(avoidant/competitive 등)과 유사하나, 상대의 특정 오행 에너지가 '존재 자체로 기신을 자극한다'는 메커니즘은 MBTI에 없다.",
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
        "cross": "사주 18레이어의 4축 점수 분포와 관계 유형별 가중치의 교차로, 같은 두 사람이라도 관계 맥락에 따라 궁합이 극단적으로 달라질 수 있음을 구조적으로 보여준다. 이것은 개별 패턴(CP-001~110)에서는 드러나지 않는 메타 수준의 판별이다.",
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
        "cross": "사주 단독. 일간 오행은 감정의 물리적 형태(폭발/침투/잘라냄/지진 등)를 결정하며, MBTI의 T/F는 '감정을 판단 기준으로 쓰는 정도'를 측정한다. 갑목 T형이든 갑목 F형이든 '곧게 뻗는 표현 형태'는 동일하다. 차원이 다르므로 교차보다 사주 단독이 적절하다.",
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
        "cross": "MBTI 단독. 사주의 관성 에너지(EXPR-004)가 '사회적 자기 검열로 감정을 막는 구조'라면, T/F 축 강도는 '감정 자체를 판단 기준으로 사용하는 정도'이다. 관성이 강해도 F88이면 감정은 내면에서 강렬하게 느껴지되 표현만 억제되고(눈물이 그렁그렁한데 꾹 참음), T88이면서 관성이 약해도 감정 표현 자체가 드물다(감정 자체가 약하게 인식됨). 차원이 다르다.",
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
        "cross": "사주 내부 교차. 식상과 인성이라는 두 십성 그룹의 동시 활성이 만드는 감정 표현의 내적 모순을 포착한다. MBTI에서 이에 대응하는 단일 변수가 없다(T/F는 판단 방향이지 '표현 충동과 흡수 충동의 동시 작동'이 아님).",
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
        "cross": "MBTI 단독. 사주의 일간 오행 감정 질감(EXPR-001)이 감정의 '물리적 형태'를 포착한다면, 인지기능은 감정의 '심리적 처리 경로'를 포착한다. 갑목의 '직선적 표현'은 Te든 Fi든 변하지 않지만, Fi의 '내면 축적 후 폭발'과 Te의 '즉각적 직접 표현'은 같은 갑목이라도 완전히 다른 타이밍과 강도로 발현된다.",
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
        "cross": "MBTI 단독. 사주의 십성별 감정 구조(식상=표현채널, 인성=흡수, 관성=억제)가 에너지 역학이라면, MBTI 갈등 스타일은 '실제 대인 상황에서 관찰 가능한 행동 패턴'이다. 사주가 '왜 이런 감정 구조인가'를 설명한다면, MBTI는 '실제로 어떤 행동으로 나타나는가'를 설명한다.",
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
        "cross": "사주 단독. 12운성은 사주 특유의 에너지 상태 분류(12단계)로 MBTI에 직접 대응 변수가 없다. 같은 식상 에너지를 가져도 건록이면 크게 표현하고 묘이면 속에 숨기는 볼륨 차이를 이 변수가 결정한다.",
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
        "cross": "사주 단독. 비겁의 '감정 방어'는 MBTI의 E/I(에너지 방향)와 다른 차원이다. E형이라도 비겁이 약하면 감정 갈등에서 쉽게 물러나고, I형이라도 비겁이 강하면 한번 표현한 감정은 절대 철회하지 않는다.",
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
        "cross": "사주 단독. 궁위(년/월/일/시)는 사주 고유의 시공간 배치 개념으로 MBTI에 대응 변수가 없다. 같은 식신이라도 년주 식신과 시주 식신은 완전히 다른 감정 표현 범위를 만든다.",
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
        "cross": "사주 단독. 관성은 '사회적 압박/자기 규율'이 감정 표현을 억제하는 메커니즘이다. MBTI J/P와 패스 합의가 이미 있으며(관성×J/P 패스), 이 패턴은 관성 내부의 정관/편관 구분이라는 사주 고유의 세분화를 포착한다.",
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
        "cross": "사주 단독. 인성의 '감정→사고 전환'은 MBTI Ti(내향 사고)와 표면적으로 유사하지만, 인성은 정인(정규 학습적 전환)과 편인(비정규/독특한 전환)으로 나뉘어 Ti와 1:1 대응이 안 된다. 또한 인성은 '학문적 에너지'이지 '논리적 판단'이 아니다.",
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
        "cross": "사주 단독. 식상은 감정의 '출구 채널'이고 이것의 유무가 표현 가능 여부를 결정한다. MBTI의 E/I는 에너지 방향이지 표현 채널의 존재를 결정하지 않는다. E형이라도 식상이 없으면 감정을 말로 표현하지 못한다.",
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
        "cross": "FRIEND-STYLE-002(식상×T/F)가 소통의 감정/논리 방향을 4축 이분법으로 포착했다면, 이 패턴은 8개 인지기능 각각의 감정 처리 형태(duration, resolution 포함)와 식상의 출구 성격(식신=부드러움/상관=날카로움/부재=막힘)을 교차하여 실제 감정 표현의 구체적 양태를 포착한다. 같은 F형이라도 Fi(내면 축적 후 폭발)와 Fe(즉각적 관계 조율)는 식상과 결합했을 때 완전히 다른 표현이 나온다. T/F 이분법으로는 이 차이를 잡을 수 없다.",
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
        "cross": "시간축 분석은 사주의 고유 영역이다. 두 사람의 대운 십성이 동시에 같은 방향을 가리키는지, 엇갈리는지를 10년 단위로 판별하여 우정의 장기 리듬을 예측한다.",
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
        "cross": "FIT-001(오행 보완)이 부족 오행의 정태적 채움이라면, 여기서는 상생 체인의 '흐름 복원'이라는 동태적 관점에서 성장 구조를 본다. 단순히 '없는 걸 채워주는' 것이 아니라 '흐름이 복원되어 전체가 돌아가기 시작하는' 질적 변화를 포착한다.",
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
        "cross": "FIT-005(용신 보완)가 에너지 보충이라면, 여기서는 구조적 뒤틀림의 교정이다. 용신은 '부족한 에너지를 채우는' 것이고, 파격 교정은 '잘못된 에너지 흐름을 바로잡는' 것으로 차원이 다르다.",
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
        "cross": "개별 패턴(GROW-001~007)이 각각의 메커니즘을 다뤘다면, 여기서는 인생 전체를 조감도로 보여주는 통합 패턴이다. 두 사람의 인생이 어떻게 맞물려 돌아가는지를 한눈에 보여준다.",
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
        "cross": "MBTI 단독. growthPath는 인지기능 스택에서 도출되는 발달 방향으로 사주의 시간축 성장과 다른 차원이다. 사주는 언제 성장하는가, MBTI는 어떤 방향으로 성장하는가를 다룬다.",
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
        "cross": "GOOD-003이 삼합의 정태적 존재를 다뤘다면, 여기서는 세운이라는 시간축 트리거가 삼합에 불을 붙이는 동태적 폭발을 다룬다. '올해 함께 도전하면 터지는 이유'를 설명한다.",
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
        "cross": "FIT-005가 정태적 보완의 편안함을 다뤘다면, 여기서는 시간축에서의 동태적 성장 촉매 효과를 다룬다. 함께 1년, 3년, 10년 지낸 후의 변화 방향을 예측한다.",
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
        "cross": "MBTI 단독. 열등기능의 점진적 통합은 인지기능 발달 이론(Jung 개성화 과정)의 핵심이며, 사주의 에너지 보완과는 다른 차원의 심리적 성장 메커니즘이다. NEED-010이 갈망이라면 이것은 실제 성장 조건.",
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
        "cross": "MBTI 단독. 인지기능 성숙도 모델(immature→developing→mature)은 심리적 발달의 질적 단계를 다루며, 사주의 에너지 보완이나 시간축 분석과는 완전히 다른 차원이다.",
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
        "cross": "GOOD 시리즈가 '무엇을 함께 하면 좋은가'를 다뤘다면, 여기서는 '언제 함께 하면 좋은가'라는 시간축 차원을 다룬다.",
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
        "cross": "MBTI 단독. 루프는 MBTI 실무 커뮤니티에서 정립된 인지기능 악순환 개념으로, 사주에서 가장 가까운 대응인 교운기와는 시간 단위와 메커니즘이 완전히 다르다. 루프 탈출은 심리적 상태 전환이고 교운기는 10년 주기 에너지 환경 변화다.",
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
        "cross": "교운기는 사주 고유의 개인별 시간축 전환점이다. 두 사람의 전환점이 우연히 겹치는 시기를 포착하여 '같이 변하는 경험'의 가능성을 예측한다.",
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
        "cross": "혼자서는 잠재 에너지(반삼합)였던 것이 특정 친구를 만나 완성되는 구조. 관계 자체가 에너지를 창출하는 가장 극적인 사례.",
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
        "cross": "FIT-003에서 천간합의 존재와 궁위를 다뤘으나, 여기서는 '어떤 활동에서 시너지가 나는가'로 변환. 위치(어디) → 활동(무엇)으로의 구체화.",
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
        "cross": "FIT-001의 보완 끌림을 '어떤 활동에서 시너지가 나는가'로 구체화. 끌림의 이유가 아니라 시너지의 영역을 특정.",
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
        "cross": "FIT-005에서 용신 보완의 존재를 다뤘으나, 여기서는 SJ_GAEUN의 구체적 활동 추천(actions, food, anchor)과 결합하여 '무엇을 함께하면 좋은가'를 특정.",
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
        "cross": "FIT 소주제의 기질/축/스타일 시너지가 '왜 편한가'의 구조적 이유를 포착했다면, giving-needing은 '함께 뭘 할 때 구체적으로 뭘 주고받는가'의 활동 산출물을 포착한다. 같은 관계 유형(dual, mirror 등)이라도 giving-needing의 구체적 맞물림 양상이 다르면 시너지 나는 활동이 달라진다.",
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
        "cross": "FIT-004에서 육합의 존재와 팀 에너지를 다뤘으나, 여기서는 합화오행 × 궁위를 결합하여 '어떤 차원에서 어떤 질감의 시너지가 나는가'를 이중 특정.",
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
        "cross": "FIT-015/016이 '기질이 맞는 이유'를 포착했다면, 이 패턴은 '기질 조합이 가리키는 구체적 활동 영역'을 특정한다. 같은 기질 시너지라도 NF+NF vs NF+NT는 시너지 나는 활동이 완전히 다르다.",
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
        "cross": "FIT-006에서 납음 조화를 다뤘으나, 여기서는 납음 물상의 이미지(NAPEUM_STORY)를 활용하여 '어떤 환경/활동이 두 사람에게 가장 자연스러운가'를 감각적으로 특정.",
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
        "cross": "사주의 십성 교차는 '에너지 역할'(누가 누구를 압박/지원/경쟁하는가)을 보고, MBTI 관계 유형은 '인지기능 역학'(주기능이 상대의 어느 기능을 자극하는가)을 본다. 메커니즘이 다르므로 수렴하면 강력한 확증이고, 발산하면 관계의 복잡한 다면성을 드러낸다.",
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
        "cross": "사주의 강약은 '선천적 에너지 밀도'이고 MBTI의 상호작용 스타일은 '실제 행동 패턴'이다. 에너지가 강해도 behind-the-scenes 스타일이면 뒤에서 조율하고, 에너지가 약해도 in-charge면 앞에서 이끌려 한다. 두 체계의 수렴은 불균형을 확증하고, 발산은 '에너지와 행동의 미스매치'라는 조율 과제를 드러낸다.",
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
        "cross": "사주 단독: 음양 밸런스는 에너지의 방향성(외향/내향)과 활동 리듬(주도/수용)을 동시에 반영한다. MBTI의 E/I와 개념적으로 유사하지만 측정 메커니즘이 다르다(사주는 천간지지의 홀짝, MBTI는 에너지 방향 자기보고). 교차 시 수렴하면 확신적, 발산하면 내적 모순.",
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
        "cross": "사주 단독: 대운/세운은 '같은 두 사람이라도 시기에 따라 관계 온도가 달라지는' 시간축 분석을 제공한다. 이것은 사주 고유의 강점으로, MBTI는 시간에 따른 변화를 설명하는 메커니즘이 약하다.",
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
        "cross": "MBTI 단독 패턴. 인지기능 축의 시소 역학과 그립 방향은 Jung의 보상 원리에서 도출된다. 사주의 오행 상극이 유사한 개념이지만, '한 기능이 올라가면 반대 기능이 내려간다'는 심리적 시소 메커니즘은 인지기능 이론 고유의 설명이다.",
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
        "cross": "사주 단독: 과다 오행은 본인이 통제하기 어려운 자동 발산 에너지이고, 5신 기신은 무의식적 불쾌 채널. 이 둘의 일치는 '의도 없는 가해-피해 구조'를 만든다. MBTI 교차 시 에너지 방향(E/I)과 결합하면 과다 에너지의 외부 발산 강도를 조절할 수 있다.",
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
        "cross": "MBTI 단독 패턴. 의사결정 흐름과 맹점은 인지기능 스택 순서에서 직접 도출된다. 사주의 의사결정 관련 변수(격국의 용신 방향 등)는 메커니즘이 근본적으로 다르다.",
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
        "cross": "사주 단독: 원진은 '설명 불가능한 미묘한 불편함'의 구조적 원인을 제공한다. 충/형과 달리 의식적으로 감지되지 않아 '왜 이 사람이랑 있으면 좀...' 하는 막연한 느낌의 정체. MBTI 교차 시 상호작용 스타일과 결합하면 이 미묘한 불편함이 어떤 행동 장면에서 구체적으로 발현되는지 특정 가능.",
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
        "cross": "사주 단독: 충·형·해는 두 사람 관계의 구조적 마찰 지점을 궁위(어린시절/사회/내면/미래)별로 특정한다. MBTI 교차 시 갈등 스타일(MT_CONFLICT_STYLES)과 결합하면 '어디서(궁위) × 어떻게(갈등 양식) 부딪히는가'가 동시 특정 가능.",
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
        "cross": "사주 단독: 교차 통변은 개인 사주에는 없지만 두 사주가 합쳐질 때만 나타나는 에너지 패턴. '혼자일 때는 괜찮은데 같이 있으면 왜 이런 일이' 생기는 구조적 원인. 관계 고유의 에너지 역학.",
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
        "cross": "사주 단독: 신강/신약은 자아 에너지 밀도로, 관계에서 '누가 더 밀어붙이는가'를 결정한다. MBTI 교차 시 E/I 에너지 방향과 결합하면 '에너지 밀도(사주) × 에너지 방향(MBTI)'의 이중 판정으로 관계 역학이 더 정밀해진다 — 신강+I는 밀도는 높지만 외부 표현이 약하고, 신약+E는 밀도는 낮지만 외부 활동은 활발.",
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
        "cross": "MBTI 단독 패턴. 인지기능별 분노의 표현 양식, 트리거, 지속시간, 해소 조건이 MT_ANGER에 체계적으로 정리되어 있다. FRIEND-ANNOY-012에서 서운함 질감 교차를 다뤘지만, 여기서는 '해소 불일치'와 '조율 방법'에 초점을 맞춘다. 사주의 일간 오행별 감정 반응(ANNOY-008)이 유사하지만 분노의 심리적 해소 메커니즘은 인지기능 이론이 더 정교하다.",
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
        "cross": "MBTI 단독 패턴. 루프와 그립은 인지기능 스택 역학에서만 도출되는 현상으로, 사주의 에너지 체계에서는 이 메커니즘에 직접 대응하는 변수가 없다. 스트레스 시 인지기능의 역전(열등기능 폭발)은 MBTI 고유의 설명력이다.",
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
        "cross": "사주 단독: 십성은 두 사람 관계의 자동 역할 배정 시스템. 편관-상관 조합은 구조적으로 '지시-반발' 패턴을 만들고, 겁재-겁재는 '경쟁-쟁탈' 패턴을 만든다. MBTI 교차 시 갈등 스타일/상호작용 스타일과 결합하면 '어떤 역할 갈등이 × 어떤 행동으로 표출되는가'를 동시 특정 가능.",
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
        "cross": "사주만으로는 '어디서' 부딪히는지는 알지만 '어떻게' 싸우는지 모른다. MBTI만으로는 갈등 양식은 알지만 인생의 어떤 영역에서 주로 터지는지 모른다. 교차하면 갈등의 영역과 양식을 동시에 특정하여 '이 친구와는 직업 얘기할 때(월지충) 조심하되, 터지면 A는 시간을 주고 B는 기다려라(needsFromOther)' 같은 구체적 조율 가이드가 나온다.",
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
        "cross": "사주만으로는 '표현 에너지가 넘치는데 청중이 없다'는 구조적 결핍을 보여주지만, 어떤 종류의 경청을 바라는지는 알 수 없다. MBTI만으로는 needing에 경청이 있어도 그것이 얼마나 절실한지 알 수 없다. 교차하면 '경청 갈망의 절실함(사주) × 경청의 구체적 형태(MBTI)'가 결합되어, 이 사람에게 어떤 방식으로 들어줘야 하는지가 드러난다.",
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
        "mbti": ": (대기: MT_TYPES.coreNeed)",
        "cross": "용신은 사주 전체의 균형 분석에서 도출되는 '구조적 결핍'이고, coreNeed는 심리적 갈망이다. 교차하면 '구조적 결핍과 심리적 갈망이 같은 방향인가 다른 방향인가'가 드러난다. 같은 방향이면 매우 일관된 갈망이고, 다른 방향이면 이 사람 안에 두 가지 서로 다른 갈망이 공존하여 친구 관계에서도 다층적 욕구가 나타난다.",
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
        "cross": "사주 단독으로는 '멘토가 필요하다'는 사실만, MBTI 단독으로는 '어떤 기능이 약하다'는 사실만 안다. 교차하면 '어떤 영역의 멘토를 얼마나 절실하게 바라는가'가 구체화된다. 인성이 0.3 이하이면서 열등기능이 Te인 사람은 '실행력을 길러줄 멘토'에 대한 갈망이 구조적으로 깊이 각인되어 있다.",
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
        "cross": "사주 단독으로는 '없는 오행의 에너지적 결핍'만, MBTI 단독으로는 '미발달 기능의 심리적 결핍'만 보인다. 교차하면 두 체계가 같은 방향을 가리키는지 확인할 수 있다. 수렴하면 '이 사람의 가장 절실한 취약점'이 두 체계로 교차 확인되므로 신뢰도가 높아지고, 친구에게 바라는 것의 핵심이 명확해진다.",
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
        "cross": "사주 단독으로는 '이중 결핍의 구조'를 보여주지만, 보호와 해방이 구체적으로 어떤 형태여야 하는지는 알 수 없다. MBTI 단독으로는 needsFromOther가 위기 시 필요를 보여주지만, 그 필요가 일시적 선호인지 구조적 절실함인지 알 수 없다. 교차하면 '이중 결핍의 절실함(사주) × 보호/해방의 구체적 형태(MBTI)'가 결합된다.",
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
        "cross": "사주 단독으로는 '인성 과다 = 생각만 많음'이라는 일반적 진단만, MBTI 단독으로는 '주기능 특성'만 안다. 교차하면 '어떤 유형의 생각 과잉인가'와 '어떤 유형의 실행력 자극이 필요한가'가 특정된다. Ni+인성과다는 '비전의 과잉 → 착수 자극', Ne+인성과다는 '아이디어의 과잉 → 완결 자극', Fi+인성과다는 '가치의 내면화 과잉 → 외부화 자극'으로 전혀 다른 처방이 나온다.",
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
        "mbti": ": (대기: MT_TYPES.stack[3] 열등기능 방향, MT_DECISION_PROCESS.blind)",
        "cross": "인성 결핍이 '배움과 보호의 구조적 부재'를 보여주고, 열등기능 방향이 '심리적으로 가장 미발달한 처리 방식'을 보여준다. 교차하면 '이 사람이 멘토에게 바라는 구체적 방향' — 감정적 보호인지, 논리적 지도인지, 경험적 안내인지, 가능성 제시인지 — 가 특정된다.",
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
        "mbti": ": (대기: MT_TYPES.coreNeed, E/I 축 강도)",
        "cross": "비겁 결핍이 '동료 에너지의 구조적 부재'를 보여주고, coreNeed와 E/I가 '이 사람이 사회적 연결을 어떻게 경험하는가'를 보여준다. 교차하면 비겁이 부족한 사람이 I형이면 '혼자 있으면서도 외로운' 깊은 고독이, E형이면 '사람을 만나면서도 진짜 동지를 못 찾는' 표면적 외로움이 드러나, 갈망의 질이 달라진다.",
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
        "mbti": ": (대기: MT_TYPES.stack[3] 열등기능, MT_SHADOW_BY_TYPE)",
        "cross": "부족 오행은 '구조적으로 아예 없는 에너지'이고 열등기능은 '발달이 가장 미약한 심리 기능'이다. 둘이 유사한 영역을 가리키면 '이 사람의 가장 취약한 지점'이 이중 확인되어 친구에게 바라는 것의 가장 절실한 층위가 드러난다. 둘이 다른 영역이면 이 사람에게 두 가지 서로 다른 취약점이 있어, 친구에게 바라는 것도 다층적이 된다.",
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
        "cross": "사주 단독으로는 '내면 에너지의 단계(상승/하강/잠재 등)'만, MBTI 단독으로는 '기질이 원하는 것의 유형'만 보인다. 교차하면 에너지 상태가 갈망에 색조를 입힌다 — 같은 NF 기질이라도 건록이면 '대등한 깊이'를, 절이면 '함께 올라올 깊이'를, 제왕이면 '정상의 깊이'를 바라므로 갈망의 질감이 완전히 달라진다.",
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
        "mbti": ": (대기: MT_TYPES.coreNeed 또는 stack[3] 열등기능)",
        "cross": "12운성이 '에너지의 생애 주기적 위치'를 보여주고, coreNeed/열등기능이 '심리적 갈망/취약점'을 보여준다. 교차하면 '현재 에너지 상태에서 오는 구조적 필요'와 '타고난 심리적 갈망'이 합쳐져, 이 사람이 친구에게 바라는 것의 구체적 형태가 특정된다. 예: 일지 절(바닥에서 올라오는 힘)+열등Te(실행력 미발달)이면 '함께 행동으로 옮겨줄 전우'를 절실히 바란다.",
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
        "cross": "사주의 관성 과다(FRIEND-NEED-008)와 교차 가능. 관성이 외부 압박이고, 갈등 시 갈망이 그 압박에서의 해방 방법이므로, 교차하면 '어떤 방식의 해방을 바라는가'가 구체화된다.",
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
        "mbti": ": (대기: MT_TYPES.coreNeed 또는 주기능 방향)",
        "cross": "관성 과다가 '외부 압박의 구조적 과잉'을 보여주고, coreNeed/주기능이 '이 사람이 근본적으로 갈망하는 방향'을 보여준다. 교차하면 '압박에서 벗어나고 싶은 구조적 욕구'와 '근본적 심리 갈망'이 합쳐져, 친구에게 바라는 것이 단순한 '편안함'인지 '자극적 해방'인지 '지적 도피처'인지가 특정된다.",
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
        "cross": "사주 교차 전 MBTI 단독 원형. 이 패턴이 교차의 기준선이 된다. 사주의 용신/부족 오행/십성 비중과 교차할 때 갈망의 강도와 절실함이 결정된다.",
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
        "cross": "사주의 부족 오행(FRIEND-NEED-002)과 교차 가능. 열등기능이 가리키는 결핍과 부족 오행이 가리키는 결핍이 같은 방향이면 취약점이 수렴한다.",
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
        "mbti": ": (대기: MT_TYPES.stack 주기능 방향)",
        "cross": "인성 과다가 '사고 에너지 포화'를 보여주고, MBTI 주기능 방향이 '이미 능숙한 기능'을 보여준다. 교차하면 '이 사람이 이미 잘하는 것(인성+주기능)과 결핍된 것(식상/재성+열등기능)의 구체적 대비'가 드러나, 친구에게 바라는 것이 '내가 못하는 것을 대신/자극해줄 사람'으로 특정된다.",
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
        "mbti": ": (대기: MT_TYPES.coreFear)",
        "cross": "공망이 '구조적으로 비어 있는 자리'이고, coreFear가 '근본적 두려움'이다. 교차하면 '비어 있는 자리에 대한 불안'과 '근본적 두려움'이 같은 방향이면 갈망이 절실하고, 다른 방향이면 이 사람 안에 의식적 갈망(공망)과 무의식적 두려움(coreFear)이 별도로 존재하여 친구에게 바라는 것이 다층적이 된다.",
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
        "cross": "사주 단독으로는 '비어 있는 궁위'만, MBTI 단독으로는 '근본 두려움'만 보인다. 교차하면 두 체계가 같은 공백을 가리키는지 확인할 수 있다. 수렴 시 '이 사람의 가장 깊은 갈망'이 교차 확인되어 해석의 확신도가 높아지고, 우정에서 이 갈망이 충족되지 않으면 관계가 오래 가지 못하는 근본 원인도 설명된다.",
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
        "cross": "사주 단독으로는 '압박이 크다, 해방이 필요하다'만 알 수 있고, MBTI 단독으로는 '갈등 시 이런 것이 필요하다'만 안다. 교차하면 '압박의 크기(관성 수치)'와 '해방의 구체적 형태(MBTI 갈등 필요)'가 결합하여, 이 사람이 친구에게 바라는 '해방'이 감정적 수용인지, 지적 자극인지, 감각적 즐거움인지, 안정적 루틴인지가 특정된다.",
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
        "cross": "사주 단독으로는 '필요한 에너지의 오행'만 알 수 있고, MBTI 단독으로는 '심리적 갈망의 유형'만 알 수 있다. 교차하면 '어떤 에너지를 어떤 심리적 형태로 바라는가'가 구체화된다. 용신이 화인 사람이 INFP인 경우 '열정적이되 진정성 있는 깊이를 가진 친구'를 바라고, ESTP인 경우 '열정적이되 즉각 행동으로 함께할 친구'를 바란다 — 같은 용신이어도 MBTI에 따라 바라는 친구상이 완전히 달라진다.",
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
        "cross": "사주 단독으로는 '동료 에너지 부재'만, MBTI 단독으로는 '내향/외향 행동 패턴'만 보인다. 교차하면 '동반자를 갈망하는 강도'와 '그 갈망을 채우기 위한 행동 방식'이 동시에 드러난다. 비겁 결핍+I 강함은 '절실히 원하지만 찾지 못하는' 구조적 비극을, 비겁 결핍+E 강함은 '적극적으로 찾지만 깊이가 부족한' 구조적 허전함을 보여준다.",
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
        "cross": "월간 오행은 선천적 사회 에너지의 '재질'이고, 주기능-부기능은 후천적 인지 도구의 '작동 방식'이다. 같은 재질이라도 도구가 다르면 결과물이 다르고, 같은 도구라도 재질이 다르면 질감이 다르다. 이 재질×도구 교차는 어느 체계 단독으로 포착 불가.",
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
        "cross": "년간 오행은 선천적 에너지의 '색감/온도/질감'이고, 상호작용 스타일은 후천적 대인행동의 '리듬/속도/방향'이다. 색감과 리듬이 맞으면 조화로운 인상이지만, 차가운 색감에 빠른 리듬이면 B에게 '의외성'이라는 독특한 매력을 전달한다. 이 의외성은 어느 체계 단독으로 설명 불가.",
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
        "cross": "FRIEND-ANNOY-012(서운함 질감 교차)는 'A가 서운해하는 방식'이었고, 여기는 'B가 목격하는 A의 갈등 모습 — B의 시선에서 어떻게 보이는가'다. 같은 교차 구조지만 관점 전환(자기→타인)이 독자적 풀이 가치를 만든다. 분노의 오행 질감(뜨거운 불 vs 차가운 금속)과 인지적 갈등 행동(논리적 반박 vs 감정 표출)의 결합은 B에게 A의 갈등 이미지를 입체적으로 전달한다.",
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
        "cross": "신강/신약은 선천적이고 변하지 않는 에너지 구조이고, 성숙도는 후천적이고 변하는 발달 수준이다. 선천×후천 교차는 '같은 원석을 어떻게 갈았는가'를 보여준다. B가 체감하는 A의 인상은 원석(사주) 자체가 아니라 갈린 상태(성숙도)이므로, 이 교차 없이는 '같은 사주인데 왜 B에게 다르게 보이는가'를 설명할 수 없다.",
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
        "cross": "사주 단독 패턴. B→A 십성은 B의 일간이라는 고정 기준점에서 A를 '역할'로 환원하는 유일한 메커니즘이다. 성격 유형론에서는 '상대를 어떤 역할로 인식하는가'라는 개념 자체가 없다.",
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
        "cross": "사주 단독. 신강/신약은 자기편 에너지(비겁+인성) 대 외부 에너지(식상+재성+관성)의 비율로 산출되며, 이 비율이 대인 관계에서의 '에너지 밀도 체감'으로 전환된다. 성격 유형론에서 이 수준의 에너지 밀도 정량화가 불가능하다.",
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
        "cross": "사주 단독. 5신 체계는 개인의 균형점(용신)을 기준으로 타인의 에너지를 '나에게 이로운가/해로운가'로 판별하는 사주 고유의 관계 평가 메커니즘이다. 성격 유형론에는 '특정 타인의 에너지가 내 균형에 이로운가'를 판별하는 구조가 없다.",
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
        "cross": "사주 단독. 12운성은 일간과 지지의 관계에서 에너지의 생장수장(生長收藏) 주기를 12단계로 나눈 것으로, '현재 에너지가 성장기인지 쇠퇴기인지'를 특정한다. 성격 유형론에서 이 수준의 에너지 주기 개념이 없다.",
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
        "cross": "사주 단독. 일간-일간 vs 월간-일간의 십성 차이가 만드는 '겉과 속의 괴리 인식'은 사주 궁위론의 다층 구조에서만 도출 가능하다. 성격 유형론에서는 '본질적 인식'과 '사회적 인식'을 분리하여 대조하는 메커니즘이 없다.",
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
        "cross": "사주 단독. 월간의 '사회적 도구' 기능은 사주 궁위론 고유의 개념으로, 다른 체계에서 '의식적으로 꺼내 쓰는 사회적 페르소나 에너지'를 구조적으로 특정하는 메커니즘이 없다.",
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
        "cross": "사주 단독. B의 십성 분포(내부 에너지 구조)가 A의 인식에 가중치를 부여하는 메커니즘은 '인식 주체의 내부 구조가 인식 대상을 왜곡한다'는 투사 원리를 사주 변수로 구현한 것이다. 성격 유형론에서는 '인식 주체의 에너지 과부족이 타인 인식을 왜곡하는 정도'를 정량적으로 산출하는 메커니즘이 없다.",
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
        "cross": "사주 단독. 오행 보완 관계는 '내가 구조적으로 결핍한 에너지를 상대가 채워주는가'를 수치적으로 측정하는 메커니즘이며, 성격 유형론에서 이 수준의 정량적 보완 판별이 불가능하다.",
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
        "cross": "MBTI 단독. 상호작용 스타일은 대인 행동 패턴의 4분류로, 사주 오행 질감과 메커니즘이 다름.",
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
        "cross": "통변 공식은 사주 내부의 십성 간 역학으로, MBTI에는 이에 대응하는 '인지기능 간 역학 패턴'이 없다. 인지기능 스택은 위계(dominant→inferior)이지 역학(생/극/합)이 아니다. 사주 단독으로만 포착되는 고유 패턴.",
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
        "cross": "MBTI 단독. 성숙도는 후천적 발달 개념으로, 사주의 선천적 에너지 구조와 메커니즘이 다름.",
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
        "cross": "사주 단독. 년간의 '외부 인상' 기능은 궁위론에서 시간축(어린시절/조상)과 공간축(외부 세계)을 동시에 담는 독특한 위치로, 다른 체계에서 이 이중 의미를 가진 변수가 없다.",
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
        "cross": "사주 단독. 신살은 출생 시간의 천문학적 배치에서 도출된 특수 에너지 포인트로, 성격 유형론에서 이에 대응하는 개념이 없다. 특히 도화살(이성 매력)과 화개살(영적 깊이)은 사주 고유의 매력 분류 체계.",
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
        "cross": "이것은 MBTI 단독 패턴이다. 사주의 십성 인식(VIEW-001)이 오행 관계에서 역할을 부여하는 것과 달리, MBTI 관계 유형은 인지기능 스택의 구조적 유사성/상보성에서 '이 사람과 나의 정보 처리 방식이 얼마나 같고 다른가'를 측정한다. 같은 질문(B가 A를 어떤 존재로 보는가)에 완전히 다른 메커니즘으로 답하며, 두 체계의 답이 수렴하는지 발산하는지가 VIEW-012에서 포착된다.",
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
        "cross": "FRIEND-CHAR-009(에너지 밀도 불일치)는 A 자신의 내적 긴장이었지만, 여기서는 'B가 이 불일치를 어떻게 읽는가'에 초점. 같은 불일치라도 A 내면에서는 '갈등'이지만 B 눈에는 '매력' 또는 '불편함'으로 전달된다. 이 관점 전환은 교차 자체에서만 나온다.",
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
        "cross": "십성은 B의 일간에서 A의 일간까지의 오행 거리(천문학적 주기 기반)이고, 관계 유형은 두 사람의 인지기능 스택 대칭 비교(심리학 기반)다. 완전히 다른 메커니즘이 같은 결론에 도달하면 그 인식은 매우 강력하고, 다른 결론이면 B의 내면에 '설명할 수 없는 양가감정'이 생긴다. 이 양가감정의 존재 자체를 어느 체계 단독으로는 포착할 수 없다.",
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
        "cross": "5신은 B의 용신(보충이 필요한 에너지) 기준으로 A의 오행을 배치하는 것이고, 관계 유형은 두 사람의 인지기능 스택 대칭 비교다. 완전히 다른 축에서 호불호를 측정하므로, 수렴이면 확신, 발산이면 양가감정이라는 결론은 교차에서만 나온다.",
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
        "cross": "coreFear 단독은 '무엇이 두려운지'를 알려주고, 기신 단독은 '어떤 에너지가 방해인지'를 알려준다. 수렴할 때 두 체계가 동시에 경보를 울리므로 서운함이 존재적 수준으로 깊어진다. 이것은 단순히 두 변수의 합산이 아니라, 두 체계가 같은 취약점을 독립적으로 지목하는 교차 검증이다. 공망 × coreFear는 '빈자리를 건드림'이고, 기신 × coreFear는 '방해 에너지를 직접 투입'이므로 메커니즘이 다르다.",
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
        "cross": "사주의 기신은 '어떤 에너지가 방해인지'를 오행 차원에서 특정하고, MBTI의 trigger는 '어떤 상황이 갈등인지'를 인지·행동 차원에서 특정한다. 수렴 시 양 체계가 같은 지점을 가리키므로 해당 영역에서 극도의 민감성이 확인된다. 분산 시 본인도 왜 서운한지 한마디로 설명 못 하는 다층적 서운함이 발생한다. FRIEND-NEED-012(용신 × coreNeed)의 구조적 역전이므로 대칭적 설명력을 가진다.",
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
        "cross": "breaking 단독은 '어떤 상황에서 우정이 끝나는지'를 유형 수준에서 알려준다. 기신/십성결핍 단독은 '어떤 에너지가 부족하거나 방해인지'를 오행/십성 수준에서 알려준다. 교차하면 '이 사람이 이 구체적 상황에서 이 구체적 에너지 결핍/자극 때문에 우정을 끝낸다'는 정밀 예측이 가능하다. 두 체계의 파탄 조건이 수렴하면 임계점이 매우 낮아지고(빨리 끝남), 분산하면 여러 방향에서 소모되다 서서히 끝난다.",
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
        "cross": "12운성 단독은 '에너지 상태에 따른 저장 방식'(묘지=묻음, 절지=무너짐)이고, duration 단독은 '인지 처리의 시간적 특성'(Fi=길다, Se=짧다)이다. 교차하면 '이 사람이 서운함을 어떤 방식으로(묻는지/터뜨리는지) + 얼마나 오래(수년/수분) 보관하는지'가 입체적으로 드러난다. FRIEND-ANNOY-012(일간 오행 × 주기능 분노)가 서운함의 '질감'이라면, 이것은 서운함의 '수명'이다.",
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
        "cross": "과다(004)가 '넘치는 에너지를 더 자극할 때'의 불쾌라면, 결핍(005)은 '부족한 에너지를 채워주지 않을 때'의 허전함. 같은 십성 축의 양극단에서 서운함의 메커니즘이 다르다.",
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
        "cross": "사주 측 기신/십성/공망 트리거가 '에너지 방향'으로 서운함을 설명하는 반면, MBTI는 '인지적 필요의 좌절'로 설명한다. 교차 없이도 16유형별로 구체적인 서운함 시나리오를 제공하는 MBTI 단독 패턴.",
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
        "cross": "비겁 결핍 단독은 '동반자 에너지 부족'이고, breaking 단독은 '유형별 파탄 상황'이다. 교차하면 '에너지가 부족한 상태에서 파탄 트리거를 만나면 임계점이 급락한다'는 가속 메커니즘이 드러난다. FRIEND-ANNOY-014(기신/결핍 × breaking)와 다른 점: 014는 '트리거의 수렴'이고 017은 '임계점의 하락'이다. 014는 무엇이 파탄을 유발하는지, 017은 얼마나 빨리 파탄에 도달하는지를 설명한다.",
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
        "cross": "FRIEND-NEED-001(용신 갈망)의 정확한 역전. 바라는 것의 반대가 서운함의 핵심이라는 구조적 대칭. 5신 체계에서 용신↔기신은 같은 축의 양끝이므로, 갈망 패턴과 서운함 패턴이 동전의 양면임을 보여준다.",
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
        "cross": "기신·과다와 달리, 충·형·해는 '특정 인생 영역(궁위)'과 연결된 서운함이다. 오행의 성질이 아니라 인생 영역의 구조적 갈등이 트리거.",
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
        "cross": "기신(FRIEND-ANNOY-001)은 '없어야 할 에너지가 들어올 때'의 불쾌이고, 과다 오행은 '이미 넘치는 에너지가 더 쌓일 때'의 과부하. 트리거의 메커니즘이 다르다.",
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
        "cross": "기신(001)은 5신 체계 기반, 과다(002)는 오행 수치 기반, 충형해(003)는 궁위 기반인 반면, 이 패턴은 '십성 기능 방향'을 기반으로 서운함을 특정한다. 더 행동적이고 구체적인 트리거를 설명.",
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
        "cross": "기신·과다·십성은 '에너지의 과잉/결핍'이 트리거인 반면, 공망은 '존재 자체가 비어있는 영역'의 자극이 트리거. 가장 설명하기 어렵고 무의식적인 서운함.",
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
        "cross": "개별 십성 과다/결핍(004/005)이 단일 십성 차원의 서운함이라면, 통변 공식은 '두 십성의 조합'에서 발생하는 구조적 갈등이 서운함으로 작용. 더 복합적이고 반복적인 패턴.",
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
        "cross": "일간 오행(008)이 '서운함의 감정 성질'이라면, 12운성은 '서운함의 에너지 강도/지속시간'을 결정한다. 같은 갑목이라도 제왕에 앉으면 서운함이 폭발적이고, 절지에 앉으면 서운함이 무력감으로 변한다.",
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
        "cross": "식상 단독은 '표현 채널의 유무'를, E/I 단독은 '에너지의 내외 방향'을 알려준다. 교차하면 4가지 조합이 나오며, 특히 식상 있음+I 강함(표현력 있으나 안 내보냄)과 식상 없음+E 강함(채널 없는데 밖으로 터짐)이 FRIEND-STYLE-002와 구분되는 서운함 특유의 양상이다. 스타일 소주제에서는 '평소 소통 방식'이었지만, 서운함 맥락에서는 '감정 압력 하에서의 표현/억제'이므로 행동이 달라진다.",
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
        "cross": "사주만으로는 '갑목은 거리를 둔다'까지이고, MBTI만으로는 'Fi는 오래 기억한다'까지다. 교차하면 '갑목+Fi = 거리를 두면서 내면에서 수년간 타오르는 조용한 서운함', '갑목+Fe = 거리를 두고 싶은데 관계 회복도 원해서 내적 갈등', '병화+Se = 폭발하고 5분 후 잊음', '병화+Fi = 즉각 화를 내지만 내면에서는 오래 곱씹는 이중 반응' 등 질감의 조합이 생긴다. 단독 체계로는 이 입체성을 만들 수 없다.",
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
        "cross": "식상은 '표현 에너지의 존재 여부와 양'이고, T/F는 '표현의 내용이 논리인가 감정인가'를 결정한다. 사주만으로는 '이 사람이 많이 표현하는가'는 알지만 '표현의 질'까지는 세분화하기 어렵고, MBTI만으로는 '감정적/논리적'은 알지만 '표현 에너지의 총량'은 모른다. 특히 상관+F 조합은 두 체계를 교차하지 않으면 포착 불가능한 독특한 소통 패턴이다.",
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
        "cross": "비겁은 '동료를 향한 에너지 총량'이고 E/I는 '사교적 행동 빈도'인데, 이 둘은 독립적 변수다. 비겁이 많아도 I면 행동으로 안 나타나고, 비겁이 적어도 E면 많은 사람과 어울린다. 이 교차 없이는 '친구가 많은 이유'(에너지가 많은 건지, 행동이 외향적인 건지)를 구별할 수 없다.",
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
        "cross": "인성은 '지식/돌봄 에너지의 총량'이고, N/S는 '관심사의 방향(추상적/구체적)'이다. 인성이 높아도 S면 실용 정보 공유이고 N이면 이론/가능성 토론이다 — 같은 '멘토형'이라도 내용이 완전히 다르다. MBTI만으로는 N/S 관심 방향은 알지만 '실제로 친구에게 그것을 나누는 에너지가 있는가'는 모른다.",
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
        "cross": "도화살은 '매력의 존재/유무'라는 이진 변수이고, E/I는 '사교 행동의 강도'라는 연속 변수다. 도화살이 있어도 I면 매력이 겉으로 안 드러나고, 도화살이 없어도 E면 적극적으로 다가간다. 특히 도화살+I 조합은 두 체계를 교차하지 않으면 '왜 인기가 있는데 친구가 적은가'를 설명할 수 없다. 화개살+E 조합도 '고독한 탐구자인데 사교적'이라는 겉보기 모순을 설명한다.",
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
        "cross": "궁위(년월일시)와 인지기능 스택(주→열등)은 모두 '같은 에너지라도 발현 시기가 다르다'는 시간축 원리를 공유하지만, 측정하는 대상이 다르다. 사주 궁위는 '어떤 십성 에너지가 언제 활성화되는가'이고, 인지기능 스택은 '어떤 심리 기능이 언제 발달하는가'이다. 이 교차가 없으면 '왜 이 사람이 30대까지 친구가 적었는데 40대부터 갑자기 사교적이 됐는가' 같은 시간적 변화를 설명할 수 없다.",
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
        "cross": "조후는 '에너지의 절대 온도'이고, T/F와 E/I는 '그 온도가 어떤 방식으로 표출되는가'를 결정한다. 같은 여름 태생이라도 T+I면 뜨거움이 안으로 향하고, F+E면 뜨거움이 바깥으로 폭발한다. 사주만으로는 '이 사람이 뜨겁다'는 알지만 '어떻게 뜨거운가'는 세분화하기 어렵고, MBTI만으로는 'F+E'라는 것은 알지만 '에너지의 기본 온도가 뜨거운가 차가운가'는 모른다. 특히 여름조후+T+I 같은 '겉과 속의 온도 차이'는 교차 없이 포착 불가능하다.",
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
        "cross": "음양 밸런스는 '에너지의 기본 방향(능동/수동)'이고, E/I는 '행동의 외향/내향'이다. 양이 많아도 I면 안에서만 적극적이고, 음이 많아도 E면 바깥으로는 활발하다. 이 교차가 없으면 '왜 이 사람이 약속은 잘 잡는데 실제로는 맞춰주기만 하는가'(음우세+E) 같은 미묘한 우정 패턴을 설명할 수 없다.",
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
        "cross": "FRIEND-STYLE-005(음양 × E/I)가 '우정의 주도/수용'이라면 이 패턴은 '약속과 계획의 주도/수용'이라는 더 구체적인 행동 차원을 포착한다. E/I는 사교 행동의 방향이고 J/P는 계획 행동의 방향이므로 독립적 교차다. 사주의 음양만으로는 '양 우세인 사람이 즉흥적인지 계획적인지'를 구분할 수 없고, MBTI의 J/P만으로는 '계획적인 사람이 주도적인지 수동적인지'를 구분할 수 없다.",
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
        "cross": "통변 공식은 '이 사람의 에너지 흐름이 어떤 방향으로 흘러가는가'를 보여주고, 주기능은 '그 흐름이 어떤 심리적 메커니즘으로 작동하는가'를 보여준다. 사주만으로는 식상생재가 '실질적 도움'이라는 것은 알지만, 그것이 감정적 케어인지(Fe) 효율적 해결인지(Te)는 구별 못 한다. MBTI만으로는 Fe/Te 경향은 알지만, '이 사람에게 실제로 그 에너지를 친구에게 쏟을 구조적 동력(통변 흐름)이 있는가'는 모른다.",
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
        "cross": "사주에서 비견과 겁재를 구별하면 '동지 에너지 vs 경쟁 에너지'를 분리할 수 있지만, 그것이 겉으로 드러나는지 안에서만 작동하는지는 MBTI의 판단기능 방향(외향/내향)이 결정한다. 특히 겁재+Fi(내향 가치 판단) 조합은 '겉으로 보면 좋은 친구인데 속으로 끊임없이 비교하는' 패턴으로, 교차하지 않으면 포착 불가능하다.",
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
        "cross": "격국은 10종 이상의 세분화된 사회적 역할이고, 상호작용 스타일은 4종의 소통 방식이다. 격국이 '무엇을 하는가'(역할의 내용)라면 상호작용 스타일은 '어떻게 하는가'(역할의 방식)다. 교차하면 '식신격+in-charge = 재능을 주도적으로 밀어붙이는 사람' vs '식신격+behind-the-scenes = 재능을 조용히 발휘하는 사람'처럼, 같은 격국이라도 행동 방식이 갈리는 지점을 포착할 수 있다.",
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
        "cross": "5원소와 4기질은 1:1 매핑이 불가능하다(5 vs 4 비대칭). 그러나 바로 이 비대칭이 가치를 만든다 — 사주가 '목(탐색자)'로 분류한 사람이 MBTI에서 NF(이상주의자)인지 NT(합리주의자)인지에 따라 탐색의 방향이 '가치 탐색'인지 '지적 탐색'인지가 갈린다. 어느 한 체계만으로는 이 구분이 불가능하다.",
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
        "cross": "사주의 십성 분포는 '에너지의 양적 배분'을 보여주고(예: 식상 2.5, 관성 0.8), MBTI 인지기능 스택은 '정보처리의 질적 위계'를 보여준다(예: Ne>Fi>Si>Te). 양적 분포와 질적 위계는 같은 현상의 다른 측면이다. 십성 분포가 '어디에 에너지가 많은가'라면, 인지기능 스택은 '그 에너지를 어떤 방식으로 쓰는가'다. 교차하면 '무엇에 + 어떻게'가 결합되어 행동 예측의 정밀도가 올라간다.",
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
        "cross": "사주의 궁위 체계는 시간축(년=유년기/월=청년기/일=중년/시=노년)과 관계축(년=조상/월=사회/일=자아/시=자녀)을 동시에 반영하고, MBTI의 스택 위치는 심리적 발달 단계(주기능=가장 먼저 발달, 열등=가장 늦게 발달)를 반영한다. 두 위계 체계의 원리가 다르기 때문에, 교차 시 '시간적+관계적+심리적 발달'의 삼중 구조가 형성되어 성격의 깊이 있는 이해가 가능해진다. 이것은 어느 한 체계만으로는 달성할 수 없는 다차원적 통찰이다.",
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
        "cross": "60일주는 30쌍의 자연물 조합(천간+지지)이라 해상도가 높고, 16유형은 인지기능 스택이라 심리적 메커니즘이 구체적이다. 60일주가 '이 사람의 이미지'를 주면, 16유형이 '그 이미지 뒤의 심리적 작동 원리'를 제공한다. 예: 갑자가 '바다 위 큰 나무'라는 이미지를 주면, INTJ의 Ni-Te 스택이 '비전을 체계적으로 실행하는 메커니즘'을 설명한다. 한 체계만으로는 이미지 또는 메커니즘 중 하나만 가능하다.",
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
        "mbti": ": (대기: 상대 체계의 사회적 역할/기능 선호 변수)",
        "cross": "격국은 월지라는 '사회적 환경'에서 도출되는 역할 기질이므로, 개인의 내적 선호가 아니라 환경이 부여하는 역할에 대한 적응 패턴을 보여준다. 상대 체계가 내적 선호 기반이라면, 격국과의 교차는 '하고 싶은 것(내적 선호) vs 맡게 되는 것(환경적 역할)'의 간극을 드러낼 수 있다.",
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
        "mbti": ": (대기: 상대 체계의 세부 유형 분류)",
        "cross": "60가지 원형은 상대 체계의 16유형보다 3.75배 세분화되어 있으며, 각 원형이 자연물 이미지(ILJU_DATA.k)를 가져 직관적 이해가 가능하다. 또한 '비슷해 보이는 일주 구별법'(ST5_SIMILAR_ILJU)이 있어 유사 원형 간 미세 차이를 설명할 수 있다. 상대 체계와 교차 시, 16유형 내에서 60일주가 어떻게 분포하는지를 탐색하면 유형 내 변이를 훨씬 풍부하게 설명할 수 있다.",
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
        "mbti": ": (대기: 상대 체계의 유형 표현 강도 변수)",
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
        "mbti": ": (대기: 상대 체계의 기본 기질 축)",
        "cross": "사주의 기질 분류는 생년월일시라는 객관적 데이터에서 도출되며, 자기보고 편향이 없다. 또한 10천간 각각에 고유 물상이 있어 같은 오행 내에서도 양간(갑)과 음간(을)의 질적 차이가 명확하다. 상대 체계의 기질 축과 교차 시, 자기보고 vs 객관적 데이터의 일치·불일치가 '자기 인식의 정확도'를 측정하는 도구가 될 수 있다.",
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
        "mbti": ": (대기: 상대 체계의 감정적 온도/에너지 변수)",
        "cross": "조후는 같은 일간이라도 태어난 계절에 따라 처방이 정반대가 되는 구조를 제공한다. 이것은 '환경이 기질의 표현을 어떻게 변조하는가'에 대한 사주 고유의 설명이며, 상대 체계가 환경 요인을 다루지 않는다면 이 교차에서 고유한 보완 가치가 나온다.",
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
        "saju": "(대기: 사주 측 대응 변수 탐색)",
        "mbti": ": 유형별 의사결정 프로세스 (MT_DECISION_PROCESS)",
        "cross": "MBTI의 의사결정 프로세스는 '인지기능의 순차적 활성화'라는 심리적 메커니즘을 구체적으로 기술한다. 사주에서 '이 사람이 판단을 내릴 때 무엇을 우선하는가'에 대응하는 변수(용신/기신 배치, 십성 우선순위 등)가 있다면, 두 체계가 제시하는 의사결정 우선순위를 대조할 수 있다. 이 교차는 친구에게 조언할 때 '어떤 방식으로 말해야 이 사람이 받아들이는가'를 알려주므로 실용적 가치가 높다.",
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
        "mbti": ": (대기: 상대 체계의 유형 비유/내러티브 방식)",
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
        "saju": "(대기: 사주 측 대응 변수 탐색)",
        "mbti": ": 인지기능 스택 4단계 (MT_TYPES.stack, MT_STACK_POSITIONS, MT_FUNCTIONS)",
        "cross": "이것은 MBTI 단독의 핵심 변수이며, 사주 측에서 직접 대응하는 단일 변수를 찾기 어려울 수 있다. 그러나 사주의 십성 배치(식상, 재성, 관성, 인성, 비겁의 분포)가 '이 사람의 에너지가 어디를 향하는가'를 보여준다면, 인지기능 스택의 '정보처리 우선순위'와 방향적 교차가 가능할 수 있다. 사주 측의 구체적 대응 변수는 상대 교수에게 확인이 필요하다.",
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
        "cross": "조후는 태어난 계절이라는 외부 조건에서 도출되고, T/F 강도는 판단 기능의 내적 선호에서 도출된다. 출발점이 완전히 다르므로 일치하면 매우 강한 확인이 되고, 불일치하면(여름 태생인데 T:88) '외부 조건은 뜨겁지만 내적 처리는 차가운' 흥미로운 다층성이 드러난다. 다만 이 교차는 비유적 수준이며 정밀한 메커니즘 대응은 아니다.",
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
        "cross": "사주의 신강도는 단일 수치(자기편 에너지 비율)인 반면, MBTI는 4개 축 각각에 독립적 강도가 있다. 따라서 교차 시 '어떤 축의 강도와 신강도를 비교하는가'가 중요하다. 예컨대 신강한 사람의 E/I 축 강도가 88이면 '에너지가 강하게 외부로 분출하는 사람'이고, 같은 신강인데 I:88이면 '에너지는 강하지만 내부에 축적하는 사람'이다. 신강도 하나로는 이 방향성을 알 수 없다.",
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
        "cross": "사주의 shadow는 일주 조합에서 고정적으로 도출되는 '어두운 면'이고, MBTI의 그림자 기능(MT_SHADOW_BY_TYPE)은 스트레스 시 동적으로 발현되는 방어 기제다. 사주가 '이 사람에게 잠재된 어두운 면'을 정적으로 보여주면, MBTI가 '그 어두운 면이 언제, 어떻게 발동하는가'의 메커니즘을 제공한다. 예: 일주 shadow='감정적 결정'이면서 MT_SHADOW_BY_TYPE의 demon이 Fi 관련이면, 극한 스트레스 시 감정적 결정이 파괴적으로 증폭되는 구체적 경로가 보인다.",
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
        "cross": "어느 한 체계만으로는 이 불일치를 감지할 수 없다. 사주만 보면 '극신강이니까 강하게 밀어붙이는 사람'이고, MBTI만 보면 '축 강도 55이니까 유연한 사람'인데, 교차하면 '내면은 강렬하지만 겉으로는 유연해 보이는 사람'이라는 더 정밀한 묘사가 가능하다. 이것은 친구 관계에서 '처음엔 부드러워 보이는데 깊이 사귀면 양보를 안 하는' 유형의 친구를 설명한다.",
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
        "cross": "사주의 상생은 에너지를 '생해주는' 일방향 흐름이고, MBTI의 pedagogue는 인지기능을 '자극하는' 구조이다. 에너지 차원의 돌봄(상생)이 인지 차원의 성장 자극(pedagogue)과 수렴할 때, 그 관계는 단순한 편안함을 넘어 실질적 성장을 만든다.",
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
        "cross": "사주의 비화는 '같은 오행의 에너지 공명'이고 MBTI의 companion은 '같은 인지기능의 심리적 공명'이다. 두 공명이 겹치면 '이 사람은 나의 다른 버전'이라는 느낌이 극대화된다. 그러나 동시에 같은 약점의 공유도 이중으로 확인되므로, 성장 자극 부족의 위험도 두 체계가 함께 경고한다.",
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
        "cross": "사주의 십성은 에너지 흐름의 방향(누가 누구에게 무엇을 주는가)을, MBTI의 우정 스타일은 심리적 행동 패턴(실제로 어떻게 주고받는가)을 본다. 십성이 '정인'이라는 에너지 구조와 MBTI가 '통찰 공유'라는 행동 패턴이 수렴할 때, 에너지 구조가 실제 행동으로 번역되는 경로가 확인된다.",
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
        "cross": "사주만으로는 '왜 편한지' 에너지 흐름으로 설명하고, MBTI만으로는 인지적 보완으로 설명하지만, 두 체계가 같은 방향을 가리킬 때 비로소 '이 우정이 왜 특별한지'의 다층적 확증이 가능하다. 에너지 보완(무의식적 끌림)과 인지 보완(실질적 시너지)은 서로 다른 레이어이므로 수렴 시 설명력이 단순 합산이 아니라 곱셈적으로 증가한다.",
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
        "cross": "사주 단독 패턴. 십성은 일간 대 일간의 관계성을 10가지로 분류하는 체계로, '이 친구와 나는 어떤 역할 관계인가'를 구조적으로 특정한다. 궁합에서 가장 직관적인 '관계 역할' 코드.",
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
        "cross": "사주 단독 패턴. 신강/신약은 사주 전체의 에너지 밀도를 하나의 축으로 요약한 것으로, 두 사람의 에너지 밀도 차이가 만드는 보완/충돌 구조를 특정한다.",
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
        "cross": "사주 단독 패턴. 납음은 천간+지지의 오행과 별개의 '소리의 기운'으로, 표면 오행에서 포착 안 되는 차원의 조화/부조화를 본다. '왜인지 설명 안 되는데 이 친구랑은 그냥 잘 맞아'의 한 축.",
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
        "cross": "사주 단독 패턴. 용신은 사주 전체를 분석한 뒤 도출되는 '가장 필요한 에너지'로, 단순 오행 보완(FIT-001)보다 더 핵심적이다. FIT-001이 부족한 것을 채워주는 '편안함'이라면, FIT-005는 가장 필요한 것을 채워주는 '살아나는 느낌'.",
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
        "cross": "사주의 신강/신약은 에너지의 절대량(밀도)을 본다. MBTI의 E/I는 에너지의 방향(외부 vs 내부)을 본다. 밀도가 높다고 외향인 것은 아니고, 내향이라고 밀도가 낮은 것은 아니다. 이 두 축이 수렴하면 '에너지가 크고 바깥으로 향하는' 명확한 프로필이 되고, 발산하면 '에너지는 큰데 안으로 향하는' 미스터리한 프로필이 된다. 궁합에서 이 조합이 어떻게 만나는지가 역할 구조를 결정한다.",
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
        "cross": "단일 체계만으로는 '잘 맞는다' 또는 '안 맞는다'의 이분법이 되지만, 두 체계의 발산을 포착하면 '어떤 차원에서 맞고 어떤 차원에서 안 맞는지'를 분리할 수 있다. 이것은 어느 체계 단독으로도 설명할 수 없는 관계의 복잡성이다.",
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
        "cross": "사주만이 두 사람의 시간적 궤도(대운 10년 주기 + 세운 연간 변화)를 산출할 수 있다. MBTI에는 개인별 시간축 분석 체계가 없다. '이 관계가 시간에 따라 어떻게 변하는가'는 사주 고유의 설명 영역이며, 한 줄 요약에 미래 방향성을 부여하는 유일한 변수다.",
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
        "cross": "일간 오행과 납음은 같은 사주에서 나오지만 다른 차원을 측정한다. 일간 오행은 천간 수준의 의식적 에너지 방향, 납음은 60갑자 수준의 무의식적 존재 질감. 이 두 레이어의 수렴/발산이 한 줄 요약의 '단순함/복잡함'을 결정한다.",
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
        "cross": "사주의 물상 풍경(SUM-001)이 관계의 시각적 이미지를 제공한다면, 이 패턴은 관계의 구조적 역학을 한 단어로 정의한다. 물상이 '풍경'이면 관계 유형은 '관계의 문법'이다.",
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
        "cross": "교차 통변은 각자의 사주에는 없지만 두 사람이 만나야만 발현되는 에너지 패턴이다. 이것은 궁합 분석에서만 도출되는 고유 변수로, 한 줄 요약에서 '이 관계만의 고유한 화학작용'을 전달한다.",
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
        "cross": "사주의 일간 오행 관계(SUM-002)가 에너지적 방향을 제공한다면, 기질 조합은 심리적 욕구의 수렴/발산을 제공한다. 같은 NF기질이라도 사주에서 상극일 수 있고, 사주에서 상생이라도 NT×SP처럼 MBTI 기질이 다를 수 있다.",
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
        "cross": "사주 궁합 엔진(analyzeGunghap)만이 동일한 두 사람에 대해 6종 관계유형별 점수를 산출할 수 있다. '친구로는 95점인데 연인으로는 65점'이라는 구조적 통찰은 사주 궁합 고유의 가치다.",
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
        "cross": "이전 소주제에서 개별적으로 발견된 갈망(NEED) 패턴과 보완(FIT) 패턴을 하나의 밀도 점수로 응축한다. 개별 패턴에서는 보이지 않았던 '이 관계의 전체적인 상호 의존도'가 드러난다. 사주의 오행 균형 체계만이 양방향 에너지 보완을 정량적으로 측정할 수 있다.",
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
        "cross": "사주의 핵심 갈망-보완 수렴도(SUM-004)가 에너지적 필요의 양방향 밀도를 측정한다면, 이 패턴은 행동적 주고받기의 양방향 맞물림을 측정한다. 에너지적으로 보완이 되어도 실제 행동에서 주는 것과 필요한 것이 맞지 않을 수 있고, 그 반대도 가능하다.",
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
        "cross": "사주 단독. 십성은 사주에서 두 사람의 일간 관계를 10가지 역할로 분류하는 고유 체계다. '왜 다시 찾는가'의 동기를 십성별로 특정할 수 있으며, 같은 '그리움'이라도 정인(지적 갈증)과 식신(편안함 갈증)은 질적으로 다르다.",
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
        "cross": "사주 단독. 암합은 천간과 지장간의 숨겨진 결합으로, MBTI에 전혀 대응 변수가 없다. 인지기능 체계의 무의식적 끌림(열등기능 투사)과는 메커니즘이 완전히 다르다 — 암합은 간지 조합의 수학적 관계에서 도출되고, 열등기능 투사는 인지기능 스택의 발달 순서에서 도출된다.",
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
        "cross": "MBTI 단독. 인지기능 발달 이론에 기반한 자기 이해의 전환이 관계 복원으로 이어지는 메커니즘은 사주의 대운 전환과 유사하지만, 대운은 외부 에너지 변화이고 이것은 내적 발달 과정이라 차원이 다르다.",
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
        "cross": "MBTI 단독. 관계 단절의 인지적 메커니즘(도어 슬램=Ni+Fe 조합의 극단적 수렴, 축적 폭발=Si의 에피소드 기억 누적)은 사주의 에너지 구조로는 설명할 수 없다.",
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
        "cross": "사주 단독. 천을귀인은 사주 고유의 귀인 개념으로, '위기에 도움이 오는 구조적 인연'을 포착한다. 우정의 회복력을 신살로 진단하는 것은 사주 특유의 접근이다.",
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
        "cross": "사주 단독. 5신 체계는 용신을 중심으로 다른 오행의 역할을 분류하는 사주 고유의 에너지 호불호 판별법이다. 같은 친구라도 나의 5신 체계에서 어디에 위치하느냐에 따라 회복 난이도가 구조적으로 다르다.",
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
        "cross": "사주 단독. 식상은 사주에서 '표현 에너지'의 유무와 방향을 결정하는 유일한 십성이다. 화해의 가장 큰 병목은 '마음이 없어서'가 아니라 '표현을 못 해서'인 경우가 많으며, 식상 수치가 이 병목을 직접 진단한다.",
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
        "cross": "사주 단독. 비겁 에너지는 '나를 지키는 힘'이자 '양보를 못 하는 힘'이다. 화해에서 가장 큰 장벽은 감정이 아니라 자존심이며, 이것을 비겁 수치로 정량화할 수 있다.",
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
        "cross": "사주 단독. 천간합은 사주 고유의 간지 결합 메커니즘으로, '어떤 채널로 다시 만나게 되는가'를 궁위별로 특정한다. 다른 체계에서는 이 구체적 재회 경로를 도출할 수 없다.",
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
        "cross": "사주 단독. 용신은 '가장 필요한 에너지'라는 사주 고유 개념으로, 관계에서 '왜 이 사람과 있으면 좋은가'의 근본 답이다. 다른 체계에서는 이 구조적 끌림을 도출할 수 없다.",
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
        "cross": "사주 단독. 삼합은 세 지지가 모여 하나의 오행 에너지를 극대화하는 사주 고유 개념이다. 교차 삼합은 '두 사람이 함께여야만 존재하는 제3의 에너지'를 포착하며, 이것은 개인 분석으로는 나오지 않는다.",
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
        "cross": "MBTI 단독. 인지기능별 분노 해소 메커니즘과 유형별 갈등 후 필요가 결합하여, '이 사람에게 다가가려면 무엇을 준비해야 하는가'를 구체적으로 특정한다. 사주의 화해 접근 형태(RECOV-001)가 '어떤 형태로 다가가는가'라면, 이 패턴은 '무엇을 가져가야 하는가'다.",
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
        "cross": "사주 단독. 대운/세운은 사주 고유의 시간축 분석이다. '언제 회복이 쉬운가'를 예측할 수 있으며, 이것은 다른 체계에서 불가능한 시간적 예측이다.",
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
        "cross": "RECOV-008(오행 보완)이 '어떤 에너지가 부족한가'를 포착한다면, 이 패턴은 '어떤 궁위(삶의 영역)가 비어있는가'를 포착한다. 같은 사람이라도 오행은 충분한데 공망 궁위가 있으면 특정 영역에서만 허전함을 느낀다. 차원이 다른 결핍이다.",
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
        "cross": "MBTI 단독. 인지기능 스택이 결정하는 우정 종료 조건과 그 역전은 사주의 에너지 구조(합/충/용신)로는 포착할 수 없는 행동 패턴이다.",
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
        "cross": "사주 단독. 신강/신약은 사주에서 자아 에너지의 밀도를 측정하는 고유 개념이다. 같은 '먼저 다가가기'라도 에너지 밀도에 따라 상대에게 주는 인상과 관계 역학이 달라진다.",
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
        "cross": "MBTI 단독. 인지기능의 정보 처리 방식이 분노 해소의 조건을 결정한다는 것은 사주에서 포착할 수 없는 심리적 메커니즘이다.",
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
        "cross": "MBTI 단독. 상호작용 스타일은 인지기능 조합에서 도출되는 행동 리듬 패턴으로, 사주의 음양 밸런스와 일부 유사하지만 4가지 구체적 재접근 전략은 MBTI 고유의 분류다.",
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
        "cross": "MBTI 단독. 루프라는 인지기능 악순환 구조와 그 탈출 시점이 관계 회복의 기회가 된다는 메커니즘은 사주에 대응 변수가 없다. 대운 전환이 유사하나, 루프는 인지 내부의 기능 간 불균형이고 대운은 외부 에너지 변화다.",
        "impact": 4
      }
    ]
  }
};

// ══════════════════════════════════════════════
// buildUserTags — 유저 데이터 → 태그 배열
// ══════════════════════════════════════════════

function buildUserTags(saju, gg, dw, mbtiType, intensities) {
  var tags = [];

  // 1. 일간 (engine.js TGAN_KR 글로벌 사용 — 단일 진실 소스)
  if (saju && saju.raw && typeof saju.raw.dg === 'number' &&
      typeof TGAN_KR !== 'undefined') {
    tags.push('dm:' + TGAN_KR[saju.raw.dg]);
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

  // 8. relation (calcRelations 직접 호출 — engine.js:2050)
  if (typeof calcRelations === 'function' && saju) {
    try {
      var rel = calcRelations(saju);
      if (rel.cheonganHap && rel.cheonganHap.length > 0) tags.push('relation:천간합');
      if (rel.jijiHap && rel.jijiHap.length > 0) tags.push('relation:육합');
      if (rel.jijiSamhap && rel.jijiSamhap.length > 0) tags.push('relation:삼합');
      if (rel.jijiChung && rel.jijiChung.length > 0) tags.push('relation:충');
      if (rel.jijiHyung && rel.jijiHyung.length > 0) tags.push('relation:형');
      if (rel.jijiHae && rel.jijiHae.length > 0) tags.push('relation:해');
      if (saju.amhap && saju.amhap.length > 0) tags.push('relation:암합');
    } catch (e) {}
  }

  // 9. tongbyeon (saju-theory.js:265 + 772의 ssIndiv 정확히 채워서 호출)
  if (typeof SJ_detectTongbyeon === 'function' && gg && saju) {
    try {
      var ssIndiv = (typeof SJ_countIndividualSS === 'function')
        ? SJ_countIndividualSS(saju)
        : {};
      var tongbyeons = SJ_detectTongbyeon(gg, ssIndiv);
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

  // 12. 교운기 (saju-theory.js:438 SJ_findGyowoongi의 ⚡지금! 마커)
  if (typeof SJ_findGyowoongi === 'function' && dw && dw.currentAge) {
    try {
      var gyo = SJ_findGyowoongi(dw, dw.currentAge);
      if (gyo && gyo.indexOf('⚡지금!') >= 0) tags.push('condition:교운기');
    } catch (e) {}
  }

  // 13. MBTI 기질 + 인지기능 4개 (engine.js:808 TY 글로벌) + 4축 페어 + stress
  if (mbtiType) {
    var tmp = mbtiType.substring(1, 3);
    if (['NF','NT','SP','SJ'].indexOf(tmp) !== -1) tags.push('temperament:' + tmp);

    // 인지기능: TY[type].cf = "Fi-Ne-Si-Te" → split
    if (typeof TY !== 'undefined' && TY[mbtiType] && TY[mbtiType].cf) {
      var stack = TY[mbtiType].cf.split('-');
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
