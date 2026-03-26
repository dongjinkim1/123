// ============================================================
// mbts-logic.js — MBTS v7.0 이론 엔진
// MBTI × 四柱 Typology System
// 73개 이론 (🟢확립 15 + 🟡유력 42 + 🔵탐색 16)
//
// 의존성: engine.js (calcSajuForApp, analyzeGyeokguk, calcDaewoon, calcRelations)
// 사용법: <script src="mbts-logic.js"></script> (engine.js 뒤에 로드)
// ============================================================

(function() {
  'use strict';

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 1: MBTS 10기능 체계 — 천간 ↔ 인지기능     ║
  // ║  v7.0 핵심 공식 (Ce/Ci 고유 기능 포함)           ║
  // ╚══════════════════════════════════════════════════╝

  // 천간 인덱스: 갑0 을1 병2 정3 무4 기5 경6 신7 임8 계9
  var TGAN_KR = ['갑','을','병','정','무','기','경','신','임','계'];
  var JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var OHENG_TGAN = ['목','목','화','화','토','토','금','금','수','수'];
  var OHENG_JIJI = ['수','토','목','목','토','화','화','토','금','금','토','수'];

  // ═══════════════════════════════════════════════════
  // 1-1. MBTS 10기능 매핑 [🟡유력]
  // 가설 명시: 검증 대기. Phase 2 데이터로 수정/폐기 가능
  // ═══════════════════════════════════════════════════

  var MBTS_FUNCTIONS = {
    0: { id: 'Ne', name: '외향 직관', desc: '가능성 탐색', oh: '목', dir: '양', energy: '직관' },
    1: { id: 'Ni', name: '내향 직관', desc: '깊은 통찰',   oh: '목', dir: '음', energy: '직관' },
    2: { id: 'Fe', name: '외향 감정', desc: '사회적 조화', oh: '화', dir: '양', energy: '감정' },
    3: { id: 'Fi', name: '내향 감정', desc: '개인 가치관', oh: '화', dir: '음', energy: '감정' },
    4: { id: 'Ce', name: '외향 통합', desc: '구조화/안정화', oh: '토', dir: '양', energy: '통합', mbtsOriginal: true },
    5: { id: 'Ci', name: '내향 통합', desc: '수용/포용',   oh: '토', dir: '음', energy: '통합', mbtsOriginal: true },
    6: { id: 'Te', name: '외향 사고', desc: '효율/시스템', oh: '금', dir: '양', energy: '사고' },
    7: { id: 'Ti', name: '내향 사고', desc: '논리적 프레임', oh: '금', dir: '음', energy: '사고' },
    8: { id: 'Se', name: '외향 감각', desc: '현재 경험',   oh: '수', dir: '양', energy: '감각' },
    9: { id: 'Si', name: '내향 감각', desc: '기억/디테일', oh: '수', dir: '음', energy: '감각' }
  };

  // 천간 → MBTS 기능 변환
  function ganToMBTS(ganIdx) {
    if (ganIdx == null || ganIdx < 0 || ganIdx > 9) return null;
    return MBTS_FUNCTIONS[ganIdx];
  }

  // 오행 → MBTS 에너지 그룹
  var OHENG_TO_ENERGY = {
    '목': { energy: '직관', functions: ['Ne','Ni'], desc: '가능성과 통찰' },
    '화': { energy: '감정', functions: ['Fe','Fi'], desc: '감정과 가치관' },
    '토': { energy: '통합', functions: ['Ce','Ci'], desc: '구조와 포용' },
    '금': { energy: '사고', functions: ['Te','Ti'], desc: '효율과 분석' },
    '수': { energy: '감각', functions: ['Se','Si'], desc: '경험과 기억' }
  };

  // ═══════════════════════════════════════════════════
  // 1-2. 사주 8자 심리 위치론 [🟢확립/🟡유력]
  // Beebe 모델 폐기 → 사주 고유 위치론
  // ═══════════════════════════════════════════════════

  var PILLAR_PSYCHOLOGY = {
    dayGan:   { area: '핵심 자아',       desc: '가장 의식적인 기능',            tag: 'established' },
    dayJi:    { area: '무의식/내밀한 자아', desc: '숨겨진 갈망',                 tag: 'established' },
    monthGan: { area: '사회적 도구',      desc: '의식적으로 꺼내 쓰는 기능',      tag: 'probable' },
    monthJi:  { area: '사회적 기반',      desc: '격국의 뿌리, 사회에서의 역할',    tag: 'established' },
    yearGan:  { area: '외부 인상',       desc: '타인이 처음 보는 나',            tag: 'probable' },
    yearJi:   { area: '원초적 기질',      desc: '어린 시절 각인, 세대 에너지',     tag: 'probable' },
    hourGan:  { area: '지향점',          desc: '나이 들며 발달하는 기능',         tag: 'probable' },
    hourJi:   { area: '가장 깊은 잠재력',  desc: '말년 또는 극한 시 발동',        tag: 'exploratory' }
  };

  // ═══════════════════════════════════════════════════
  // 1-3. 천간충 — 반대 기능의 대결 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GAN_CHUNG_MBTS = [
    { a: 0, b: 6, funcs: 'Ne vs Te', meaning: '가능성 vs 효율' },
    { a: 1, b: 7, funcs: 'Ni vs Ti', meaning: '직관 vs 분석' },
    { a: 2, b: 8, funcs: 'Fe vs Se', meaning: '조화 vs 경험' },
    { a: 3, b: 9, funcs: 'Fi vs Si', meaning: '가치관 vs 기억' }
  ];

  // ═══════════════════════════════════════════════════
  // 1-4. 천간합 — 기능 융합 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GAN_HAP_MBTS = [
    { a: 0, b: 5, resultOh: '토', resultFunc: 'Ce/Ci', meaning: '탐색+수용 → 통합 에너지' },
    { a: 1, b: 6, resultOh: '금', resultFunc: 'Te/Ti', meaning: '통찰+효율 → 사고 에너지' },
    { a: 2, b: 7, resultOh: '수', resultFunc: 'Se/Si', meaning: '조화+분석 → 감각 에너지' },
    { a: 3, b: 8, resultOh: '목', resultFunc: 'Ne/Ni', meaning: '가치관+경험 → 직관 에너지' },
    { a: 4, b: 9, resultOh: '화', resultFunc: 'Fe/Fi', meaning: '구조+기억 → 감정 에너지' }
  ];

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 2: 5대 기질 그룹 + 유형 체계               ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 2-1. 60일주 5대 기질 그룹 [🟡유력]
  // ═══════════════════════════════════════════════════

  var TEMPERAMENT_GROUPS = {
    '목': { id: 'explorer',   name: '탐색자', nameEn: 'Explorer',   keywords: '가능성, 성장, 자유, 직관', color: '#4CAF50' },
    '화': { id: 'connector',  name: '연결자', nameEn: 'Connector',  keywords: '감정, 관계, 표현, 영감',   color: '#FF5722' },
    '토': { id: 'stabilizer', name: '안정자', nameEn: 'Stabilizer', keywords: '중심, 포용, 구조, 통합',   color: '#FFC107' },
    '금': { id: 'executor',   name: '실행자', nameEn: 'Executor',   keywords: '결단, 분석, 효율, 정밀',   color: '#9E9E9E' },
    '수': { id: 'adapter',    name: '적응자', nameEn: 'Adapter',    keywords: '유연, 경험, 지혜, 흐름',   color: '#2196F3' }
  };

  function getTemperament(sajuOrDmOh) {
    var oh = typeof sajuOrDmOh === 'string' ? sajuOrDmOh : (sajuOrDmOh && sajuOrDmOh.dmEl);
    return TEMPERAMENT_GROUPS[oh] || null;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 3: 물상(物象) 이론 — 체현적 인지            ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 3-1. 물상 = 체현적 인지 형태 [🟡유력]
  // 근거: Lakoff & Johnson (1980) 체현적 인지 이론
  // ═══════════════════════════════════════════════════

  var MULSANG_GAN = {
    '갑': { image: '큰 나무',  qualities: '상승, 확장, 유연한 강함' },
    '을': { image: '꽃과 덩굴', qualities: '적응, 아름다움, 부드러운 생존력' },
    '병': { image: '태양',     qualities: '밝음, 공평한 빛, 뜨거운 열정' },
    '정': { image: '촛불',     qualities: '따뜻함, 집중, 내밀한 빛' },
    '무': { image: '큰 산',    qualities: '무게, 안정, 움직이지 않는 중심' },
    '기': { image: '논밭',     qualities: '수용, 기름짐, 뭐든 키워내는 포용' },
    '경': { image: '바위/도끼', qualities: '결단, 날카로움, 변하지 않는 원칙' },
    '신': { image: '보석',     qualities: '정밀, 아름다운 날카로움, 빛나는 내면' },
    '임': { image: '큰 강/바다',qualities: '흐름, 거침없음, 세상을 흡수' },
    '계': { image: '빗물/이슬', qualities: '조용한 스며듦, 디테일, 섬세한 기록' }
  };

  var MULSANG_SEASON = {
    '인': { season: '이른 봄', mood: '새싹이 움트는 시작의 에너지' },
    '묘': { season: '완연한 봄', mood: '꽃이 만개하는 생명력' },
    '진': { season: '늦봄', mood: '비 내려 촉촉한 환절기' },
    '사': { season: '초여름', mood: '뜨거운 기운이 시작' },
    '오': { season: '한여름', mood: '가장 뜨겁고 화려한 절정' },
    '미': { season: '늦여름', mood: '무르익은 열기의 끝자락' },
    '신': { season: '초가을', mood: '서늘한 바람이 부는 전환' },
    '유': { season: '완연한 가을', mood: '결실을 맺는 수확' },
    '술': { season: '늦가을', mood: '낙엽 지는 메마른 정리' },
    '해': { season: '초겨울', mood: '차가운 물이 깊어지는 시작' },
    '자': { season: '한겨울', mood: '가장 깊고 고요한 응축' },
    '축': { season: '늦겨울', mood: '봄을 준비하는 마지막 추위' }
  };

  // ═══════════════════════════════════════════════════
  // 3-2. 원국 풍경화 이론 (Natal Landscape) [🟡유력]
  // 3층: 주인공(일간) + 땅(일지) + 계절(월지)
  // ═══════════════════════════════════════════════════

  function buildNatalLandscape(saju) {
    var dm = saju.dm;                    // 일간 한글
    var ilji = saju.P[2].b;             // 일지 한글
    var wolji = saju.P[1].b;            // 월지 한글
    var hero = MULSANG_GAN[dm] || { image: dm, qualities: '' };
    var ground = MULSANG_SEASON[ilji] || { season: '', mood: '' };
    var season = MULSANG_SEASON[wolji] || { season: '', mood: '' };

    return {
      hero: hero,
      ground: ground,
      season: season,
      landscape: season.season + ', ' + season.mood + '. ' + hero.image + '이(가) ' + (ground.mood || ilji) + ' 위에.',
      summary: season.season + '의 ' + hero.image
    };
  }

  // ═══════════════════════════════════════════════════
  // 3-3. 물상 조화도 (Landscape Harmony Index) [🔵탐색]
  // 일간 오행 vs 월지 계절의 에너지 적합성
  // ═══════════════════════════════════════════════════

  // 계절 왕성 오행: 봄=목, 여름=화, 환절기=토, 가을=금, 겨울=수
  var SEASON_OH = { '인':'목','묘':'목','진':'토', '사':'화','오':'화','미':'토', '신':'금','유':'금','술':'토', '해':'수','자':'수','축':'토' };
  // 상생 관계
  var OH_SANG = { '목':'화','화':'토','토':'금','금':'수','수':'목' };
  // 상극 관계
  var OH_GEUK = { '목':'토','토':'수','수':'화','화':'금','금':'목' };

  function calcLandscapeHarmony(saju) {
    var dmOh = saju.dmEl;
    var wolji = saju.P[1].b;
    var seasonOh = SEASON_OH[wolji];
    if (!dmOh || !seasonOh) return { score: 0, type: 'unknown', desc: '' };

    if (dmOh === seasonOh) {
      return { score: 90, type: 'excess_harmony', label: '과잉 조화',
        desc: dmOh + ' 에너지가 ' + seasonOh + ' 계절에서 폭발. 강렬하지만 소진 빠를 수 있음' };
    }
    if (OH_SANG[seasonOh] === dmOh) {
      // 계절이 일간을 생해줌 = 득령
      return { score: 80, type: 'natural_harmony', label: '자연 조화',
        desc: '계절(' + seasonOh + ')이 ' + dmOh + ' 에너지를 지지. 안정적이고 효율적' };
    }
    if (OH_SANG[dmOh] === seasonOh) {
      // 일간이 계절을 생함 = 에너지 유출
      return { score: 50, type: 'energy_drain', label: '에너지 유출',
        desc: dmOh + ' 에너지가 계절(' + seasonOh + ')에 소모됨. 주는 것이 많은 구조' };
    }
    if (OH_GEUK[dmOh] === seasonOh) {
      // 일간이 계절을 극함
      return { score: 60, type: 'mild_disharmony', label: '약한 부조화',
        desc: dmOh + ' 에너지가 계절(' + seasonOh + ')과 긴장. 도전적이지만 성장 가능' };
    }
    if (OH_GEUK[seasonOh] === dmOh) {
      // 계절이 일간을 극함 = 실령
      return { score: 30, type: 'disharmony', label: '부조화',
        desc: '계절(' + seasonOh + ')이 ' + dmOh + ' 에너지를 억누름. 내적 갈등이 깊지만 오히려 창의성의 원천' };
    }
    return { score: 50, type: 'neutral', label: '중립', desc: '특별한 조화/부조화 없음' };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 4: 합충 역학 이론                          ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 4-1. 합충 우선순위 3변수 [🟡유력]
  // 변수: 거리(Proximity) + 기세(Momentum) + 순도(Purity)
  // ═══════════════════════════════════════════════════

  var PILLAR_DISTANCE = {
    'year-month': 1, 'month-day': 1, 'day-hour': 1,
    'year-day': 2, 'month-hour': 2,
    'year-hour': 3
  };

  function getHapChungPriority(relA, relB) {
    // relA, relB = { type:'합'|'충', pillars:'month-day', source:'원국'|'대운' }
    var distA = PILLAR_DISTANCE[relA.pillars] || 2;
    var distB = PILLAR_DISTANCE[relB.pillars] || 2;

    // 변수 1: 거리 — 가까울수록 강함
    var proxA = 4 - distA; // 3,2,1
    var proxB = 4 - distB;

    // 변수 2: 기세 — 대운/세운이 원국보다 강할 수 있음
    var momA = relA.source === '대운' || relA.source === '세운' ? 2 : 1;
    var momB = relB.source === '대운' || relB.source === '세운' ? 2 : 1;

    // 변수 3: 순도 — 1:1은 강함, 투합(2:1)은 약함
    var purA = relA.purity || 1; // 1=순수, 0.5=투합
    var purB = relB.purity || 1;

    var scoreA = proxA * momA * purA;
    var scoreB = proxB * momB * purB;

    return {
      winner: scoreA >= scoreB ? relA : relB,
      loser: scoreA >= scoreB ? relB : relA,
      scoreA: scoreA,
      scoreB: scoreB,
      analysis: scoreA >= scoreB
        ? relA.type + ' 우세 (' + relA.pillars + ') → ' + (relA.type === '합' ? '표면적 안정, 잠재적 긴장' : '표면적 갈등, 잠재적 변화')
        : relB.type + ' 우세 (' + relB.pillars + ') → ' + (relB.type === '합' ? '표면적 안정, 잠재적 긴장' : '표면적 갈등, 잠재적 변화')
    };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 5: 암합 이론 — 3층위 + 의식화 경로         ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 5-1. 암합 3층위 [🔵탐색]
  // ═══════════════════════════════════════════════════

  var AMHAP_LAYERS = {
    'junggi-junggi': { level: '반의식',     desc: '왜인지 모르게 끌리는 수준. 인식하면 빠르게 의식화 가능' },
    'junggi-junggi': { level: '약한 무의식', desc: '나도 모르게 반복되는 패턴. 타인이 지적하면 인식 가능' },
    'yeogi-yeogi':   { level: '깊은 무의식', desc: '존재 자체를 모르는 연결. 장기간 관찰로만 발견' }
  };

  function classifyAmhap(amhap, saju) {
    if (!amhap || !saju || !saju.jjg) return null;
    // 실제 구현: 지장간의 어느 층위(여기/중기/정기)에서 합이 발생하는지 판별
    // 현재는 기본값 반환 (실제 지장간 데이터 연동 시 정밀화)
    return {
      from: amhap.from,
      to: amhap.to,
      hapOh: amhap.hapOh,
      gungwi: amhap.gungwi,
      layer: '반의식',
      consciousnessPath: '암합 → 투출(대운에서 해당 천간 등장 시) → 밝합 → 의식적 선택 가능'
    };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 6: 신강/신약 5단계 + MBTI 강도 3단계       ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 6-1. 신강/신약 5단계 [🟢확립]
  // ═══════════════════════════════════════════════════

  function getStrengthGrade(gg) {
    if (!gg || gg.selfStr == null || gg.otherStr == null) return null;
    var total = gg.selfStr + gg.otherStr;
    if (total === 0) return null;
    var ratio = gg.selfStr / total;
    var pct = Math.round(ratio * 100);

    var grade;
    if (ratio > 0.70) grade = { label: '극신강', level: 5, rx: '재성·관성으로 에너지 분출', desc: '자아 에너지 압도적. 리더십이지만 독재적 경향' };
    else if (ratio > 0.55) grade = { label: '신강', level: 4, rx: '사회활동·재물활동이 건강한 방향', desc: '힘이 넘침. 독립심 강함. 협업이 과제' };
    else if (ratio >= 0.45) grade = { label: '중화', level: 3, rx: '용신 오행을 키우는 게 돌파구', desc: '음양 균형. 유연하지만 강점이 안 보일 수 있음' };
    else if (ratio >= 0.30) grade = { label: '신약', level: 2, rx: '인성(학습)·비겁(동료) 도움', desc: '환경 맞춤 능력 뛰어남. 자기 색깔 지키기가 과제' };
    else grade = { label: '극신약', level: 1, rx: '인성과 비겁이 생명줄', desc: '주변에 압도당하기 쉬운 구조' };

    return { ...grade, pct: pct, selfStr: gg.selfStr, otherStr: gg.otherStr };
  }

  // ═══════════════════════════════════════════════════
  // 6-2. MBTI 강도 3단계 [🟢확립]
  // ═══════════════════════════════════════════════════

  function getMBTILevel(rawIntensity) {
    if (rawIntensity >= 76) return { level: 88, label: '극강', desc: '해당 성향이 압도적' };
    if (rawIntensity >= 61) return { level: 68, label: '확실', desc: '해당 성향이 분명' };
    return { level: 55, label: '살짝', desc: '경계선. 반대쪽 성향도 상당히 있음' };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 7: 사주-MBTI 불일치 분석 (7패턴)           ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 7-1. 불일치 패턴 탐지 [🟡유력]
  // ═══════════════════════════════════════════════════

  function detectDiscrepancy(saju, gg, mbtiType, mbtiIntensities) {
    var results = [];
    var dmOh = saju.dmEl;
    var dmFunc = ganToMBTS(saju.raw.dg);

    // 패턴 1: 억압형 — 관성 과다 + 신약 + E/I 반전
    if (gg.cnt && gg.cnt['관성'] >= 2.5 && !gg.strong) {
      results.push({ type: '억압형', desc: '본래 기질이 환경(관성)에 의해 눌렸을 가능성', confidence: 'probable' });
    }

    // 패턴 4: 조후 불일치 — 여름 출생인데 I형, 겨울 출생인데 E형
    var wolji = saju.P[1].b;
    var seasonOh = SEASON_OH[wolji];
    var eiSide = mbtiType ? mbtiType.charAt(0) : null;
    if (seasonOh === '화' && eiSide === 'I') {
      results.push({ type: '조후 불일치', desc: '여름(火) 출생인데 I형 — "조용한 화산" 구조일 가능성', confidence: 'exploratory' });
    }
    if (seasonOh === '수' && eiSide === 'E') {
      results.push({ type: '조후 불일치', desc: '겨울(水) 출생인데 E형 — "얼음 위의 불꽃" 구조일 가능성', confidence: 'exploratory' });
    }

    // 패턴 5: 종격 적응형
    if (gg.isJonggyeok) {
      results.push({ type: '종격 적응형', desc: 'MBTI 검사 시 매번 다른 결과가 나올 수 있음 — 적응형 유형', confidence: 'probable' });
    }

    // 패턴 7: 공망 지연형
    if (saju.gongmang) {
      var gmJis = saju.gongmang;
      if (gmJis.indexOf(saju.raw.dj) >= 0) {
        results.push({ type: '공망 지연형', desc: '일지(배우자궁) 공망 — 친밀감 관련 기능이 늦게 발달할 가능성', confidence: 'probable' });
      }
    }

    // 오행-MBTI 교차 불일치
    var snSide = mbtiType ? mbtiType.charAt(1) : null;
    var snLevel = mbtiIntensities ? getMBTILevel(mbtiIntensities[1]) : null;
    if (saju.el && saju.el['목'] === 0 && snSide === 'N' && snLevel && snLevel.level >= 68) {
      results.push({ type: '구조적 불일치', desc: '사주에 木(직관 에너지) 0개인데 MBTI N이 ' + snLevel.label + ' → 직관은 강한데 표현 통로가 없는 구조', confidence: 'probable' });
    }
    var tfSide = mbtiType ? mbtiType.charAt(2) : null;
    var tfLevel = mbtiIntensities ? getMBTILevel(mbtiIntensities[2]) : null;
    if (saju.el && saju.el['화'] === 0 && tfSide === 'F' && tfLevel && tfLevel.level >= 68) {
      results.push({ type: '구조적 불일치', desc: '사주에 火(감정 에너지) 0개인데 MBTI F가 ' + tfLevel.label + ' → 감정은 넘치는데 표현할 수 없는 구조. 처방: 火 에너지 활동', confidence: 'probable' });
    }

    return results;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 8: 궁합 4대 축 이론                        ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 8-1. 18레이어 → 4축 분류 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GUNGHAP_AXIS = {
    chemistry: { name: '끌림', layers: [1, 8, 15], desc: '왜 끌리는가' },
    compensation: { name: '보완', layers: [3, 7, 11, 16], desc: '서로 채워주는가' },
    conflict: { name: '갈등', layers: [2, 9, 13, 14], desc: '어디서 부딪히는가' },
    timeline: { name: '시간', layers: [5, 18, 10], desc: '시간이 지나면 어떻게 되는가' }
  };

  // ═══════════════════════════════════════════════════
  // 8-2. 관계 유형별 가중치 [🟡유력]
  // ═══════════════════════════════════════════════════

  var REL_TYPE_WEIGHTS = {
    '연인':  { chemistry: 0.40, compensation: 0.20, conflict: 0.25, timeline: 0.15 },
    '부부':  { chemistry: 0.15, compensation: 0.30, conflict: 0.25, timeline: 0.30 },
    '썸':    { chemistry: 0.50, compensation: 0.15, conflict: 0.25, timeline: 0.10 },
    '짝사랑': { chemistry: 0.45, compensation: 0.20, conflict: 0.25, timeline: 0.10 },
    '친구':  { chemistry: 0.20, compensation: 0.30, conflict: 0.30, timeline: 0.20 },
    '직장':  { chemistry: 0.10, compensation: 0.35, conflict: 0.35, timeline: 0.20 }
  };

  function calcGunghapByRelType(ghResult, relType) {
    var weights = REL_TYPE_WEIGHTS[relType] || REL_TYPE_WEIGHTS['연인'];
    var scores = ghResult.scores || {};
    var weighted = {
      chemistry: (scores.love || 50) * weights.chemistry,
      compensation: ((scores.values || 50) + (scores.work || 50)) / 2 * weights.compensation,
      conflict: (100 - Math.abs((scores.comm || 50) - 50)) * weights.conflict,
      timeline: (scores.work || 50) * weights.timeline
    };
    var total = Math.round(weighted.chemistry + weighted.compensation + weighted.conflict + weighted.timeline);
    return {
      relType: relType,
      total: Math.min(100, Math.max(0, total)),
      axes: weighted,
      weights: weights,
      insight: total >= 75 ? '좋은 궁합' : total >= 55 ? '보통 궁합' : '도전적 궁합'
    };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 9: 교운기 속도 이론                        ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 9-1. 교운기 3변수 속도 계산 [🔵탐색]
  // ═══════════════════════════════════════════════════

  function calcTransitionSpeed(prevDWOh, newDWOh, saju, gg) {
    if (!prevDWOh || !newDWOh) return { months: 18, label: '보통', desc: '기본 전환 기간' };

    // 변수 1: 에너지 거리
    var energyDistance;
    if (prevDWOh === newDWOh) energyDistance = 0; // 비화
    else if (OH_SANG[prevDWOh] === newDWOh || OH_SANG[newDWOh] === prevDWOh) energyDistance = 1; // 상생
    else if (OH_GEUK[prevDWOh] === newDWOh || OH_GEUK[newDWOh] === prevDWOh) energyDistance = 3; // 상극
    else energyDistance = 2;

    // 변수 2: 원국 친화도
    var natalAffinity = 0;
    if (saju && saju.el) {
      natalAffinity = (saju.el[newDWOh] || 0) >= 2 ? -1 : (saju.el[newDWOh] || 0) >= 1 ? 0 : 1;
    }

    // 변수 3: 자아 강도
    var egoStr = 0;
    if (gg) {
      var ratio = gg.selfStr / ((gg.selfStr + gg.otherStr) || 1);
      egoStr = ratio > 0.55 ? -1 : ratio < 0.45 ? 1 : 0;
    }

    var score = energyDistance + natalAffinity + egoStr; // 0~5
    var months, label;
    if (score <= 0) { months = 3; label = '거의 즉시'; }
    else if (score <= 1) { months = 9; label = '빠름 (6개월~1년)'; }
    else if (score <= 2) { months = 18; label: '보통 (1~2년)'; }
    else if (score <= 3) { months = 30; label = '느림 (2~3년)'; }
    else { months = 36; label = '매우 느림 (3년+)'; }

    return {
      months: months,
      label: label,
      energyDistance: energyDistance,
      natalAffinity: natalAffinity,
      egoStr: egoStr,
      desc: prevDWOh + '→' + newDWOh + ' 전환. ' + label
    };
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 10: 개운법 — 행동 활성화 + 앵커링          ║
  // ╚══════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // 10-1. 개운법 시스템 [🟡유력]
  // 방위 삭제. 색상=앵커링. 행동=행동 활성화 이론.
  // ═══════════════════════════════════════════════════

  var GAEUN = {
    '목': {
      actions: ['산책','등산','스트레칭','새로운 시도','식물 키우기','독서'],
      anchor: { color: '초록색', items: '초록 노트, 식물, 숲 사진' },
      food: { taste: '신맛', items: '식초, 레몬, 매실', tag: 'exploratory' },
      message: '직관(Ne/Ni) 에너지 보충. 가능성을 탐색하고, 새로운 것을 시도하세요.'
    },
    '화': {
      actions: ['러닝','댄스','핫요가','감정일기','사람 만나기','표현 연습'],
      anchor: { color: '빨간색/주황색', items: '빨간 노트, 따뜻한 조명' },
      food: { taste: '쓴맛', items: '커피, 다크초콜릿, 쑥', tag: 'exploratory' },
      message: '감정(Fe/Fi) 에너지 보충. 감정을 표현하고, 사람과 연결하세요.'
    },
    '토': {
      actions: ['요가','필라테스','규칙적 루틴','정리정돈','요리','텃밭 가꾸기'],
      anchor: { color: '노란색/베이지', items: '베이지 톤 소품, 도자기' },
      food: { taste: '단맛', items: '꿀, 고구마, 대추', tag: 'exploratory' },
      message: '통합(Ce/Ci) 에너지 보충. 안정적인 루틴을 만들고, 중심을 잡으세요.'
    },
    '금': {
      actions: ['웨이트','수영','호흡운동','결단 연습','불필요한 것 버리기'],
      anchor: { color: '흰색/은색', items: '은색 소품, 미니멀 인테리어' },
      food: { taste: '매운맛', items: '생강, 마늘, 고추', tag: 'exploratory' },
      message: '사고(Te/Ti) 에너지 보충. 결단을 내리고, 효율적으로 정리하세요.'
    },
    '수': {
      actions: ['수영','명상','산책','독서','새로운 경험','여행'],
      anchor: { color: '검정/남색', items: '남색 노트, 물 소리 앱' },
      food: { taste: '짠맛', items: '미역, 다시마, 해산물', tag: 'exploratory' },
      message: '감각(Se/Si) 에너지 보충. 경험을 넓히고, 흐름에 몸을 맡기세요.'
    }
  };

  function getGaeun(yongshinOh) {
    if (!yongshinOh) return null;
    // 오행 추출 (용신 문자열에서)
    var oh5 = ['목','화','토','금','수'];
    var oh = null;
    for (var i = 0; i < oh5.length; i++) {
      if (yongshinOh.indexOf(oh5[i]) >= 0) { oh = oh5[i]; break; }
    }
    return oh ? GAEUN[oh] : null;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 11: 상생상극 = 인지기능 촉진/억제           ║
  // ╚══════════════════════════════════════════════════╝

  var SANGSAENG_MBTS = [
    { from: '목', to: '화', func: 'Ne/Ni → Fe/Fi', meaning: '직관이 감정을 키우는 경향' },
    { from: '화', to: '토', func: 'Fe/Fi → Ce/Ci', meaning: '감정이 구조를 만드는 경향' },
    { from: '토', to: '금', func: 'Ce/Ci → Te/Ti', meaning: '구조가 사고를 키우는 경향' },
    { from: '금', to: '수', func: 'Te/Ti → Se/Si', meaning: '사고가 감각을 키우는 경향' },
    { from: '수', to: '목', func: 'Se/Si → Ne/Ni', meaning: '경험이 직관을 키우는 경향' }
  ];

  var SANGGEUK_MBTS = [
    { from: '목', to: '토', func: 'Ne/Ni → Ce/Ci 억제', meaning: '직관 과다 → 구조 약화 경향' },
    { from: '토', to: '수', func: 'Ce/Ci → Se/Si 억제', meaning: '구조 집착 → 경험 거부 경향' },
    { from: '수', to: '화', func: 'Se/Si → Fe/Fi 억제', meaning: '감각 매몰 → 감정 둔화 경향' },
    { from: '화', to: '금', func: 'Fe/Fi → Te/Ti 억제', meaning: '감정 과다 → 사고 방해 경향' },
    { from: '금', to: '목', func: 'Te/Ti → Ne/Ni 억제', meaning: '분석 과다 → 직관 억제 경향' }
  ];

  // 용신 = 끊어진 상생 체인 복구
  function findBrokenChain(saju) {
    if (!saju || !saju.el) return null;
    var chain = ['목','화','토','금','수'];
    var broken = [];
    for (var i = 0; i < chain.length; i++) {
      if ((saju.el[chain[i]] || 0) === 0) {
        var prev = chain[(i + 4) % 5];
        var next = chain[(i + 1) % 5];
        broken.push({
          missing: chain[i],
          from: prev,
          to: next,
          desc: prev + '→(' + chain[i] + ')→' + next + ' 체인 끊김. ' + chain[i] + '(' + OHENG_TO_ENERGY[chain[i]].energy + ') 보충이 처방'
        });
      }
    }
    return broken;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 12: 바넘 효과 방지 + 풀이 4단계 구조       ║
  // ╚══════════════════════════════════════════════════╝

  var BARNUM_PREVENTION = {
    text: "이 분석에서 '아닌데?'라고 느껴지는 부분이 있나요? " +
          "그 부분이 오히려 가장 중요한 정보일 수 있습니다. " +
          "사주가 보여주는 것과 현재의 당신이 다르다면 — " +
          "그건 당신이 사주를 넘어선 것이거나, 아직 발현되지 않은 잠재력입니다.",
    placement: 'end_of_analysis'
  };

  var ANALYSIS_STAGES = {
    stage1: { name: 'WHO (원국 해부)', focus: '4주 인지기능 매핑, 오행/음양/조후, 합충형해, 신살/공망, 격국/종격' },
    stage2: { name: 'HOW (역학 해석)', focus: '십성 10개 역학, 5신 처방, 통변 워크플로우, 투출, 상생상극' },
    stage3: { name: 'WHEN (시간축 분석)', focus: '대운(간지분리/순역/간합변환), 세운, 월운, 교운기, 합트리거, 공망해소' },
    stage4: { name: 'WHAT (실전 통합)', focus: '불일치분석, 직업/연애/재물 타이밍, 건강, 궁합, 킬링포인트. 진단50%+처방50%' }
  };

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 13: 통합 분석 함수 (MBTS 메인 엔진)        ║
  // ╚══════════════════════════════════════════════════╝

  function analyzeMBTS(saju, gg, dw, mbtiType, mbtiIntensities) {
    var result = {};

    // Stage 1: WHO
    result.coreFunction = ganToMBTS(saju.raw.dg);
    result.temperament = getTemperament(saju);
    result.landscape = buildNatalLandscape(saju);
    result.landscapeHarmony = calcLandscapeHarmony(saju);
    result.strengthGrade = getStrengthGrade(gg);

    // 8자 심리 위치
    result.positions = {};
    var gans = [saju.raw.yg, saju.raw.mg, saju.raw.dg, saju.raw.hg];
    var posKeys = ['yearGan', 'monthGan', 'dayGan', 'hourGan'];
    for (var i = 0; i < 4; i++) {
      if (gans[i] != null) {
        result.positions[posKeys[i]] = {
          func: ganToMBTS(gans[i]),
          area: PILLAR_PSYCHOLOGY[posKeys[i]]
        };
      }
    }

    // Stage 2: HOW
    result.brokenChains = findBrokenChain(saju);
    result.gaeun = gg ? getGaeun(gg.yongshin) : null;

    // 암합 분석
    if (saju.amhap && saju.amhap.length > 0) {
      result.amhap = saju.amhap.map(function(ah) { return classifyAmhap(ah, saju); });
    }

    // Stage 3: WHEN (대운 간합 변환 체크)
    if (dw && dw.daewoons && dw.currentDWIdx >= 0) {
      var currentDW = dw.daewoons[dw.currentDWIdx];
      if (currentDW) {
        // 간합 변환 체크
        var dwGan = currentDW.ganIdx;
        var dgIdx = saju.raw.dg;
        for (var h = 0; h < GAN_HAP_MBTS.length; h++) {
          var hap = GAN_HAP_MBTS[h];
          if ((dwGan === hap.a && dgIdx === hap.b) || (dwGan === hap.b && dgIdx === hap.a)) {
            result.phaseTransition = {
              type: '대운 간합',
              from: ganToMBTS(dgIdx),
              to: hap.resultFunc,
              resultOh: hap.resultOh,
              meaning: hap.meaning
            };
            break;
          }
        }

        // 교운기 속도 (다음 대운과 비교)
        var nextIdx = dw.currentDWIdx + 1;
        if (nextIdx < dw.daewoons.length) {
          var nextDW = dw.daewoons[nextIdx];
          var curOh = OHENG_TGAN[currentDW.ganIdx != null ? currentDW.ganIdx : 0];
          var nextOh = OHENG_TGAN[nextDW.ganIdx != null ? nextDW.ganIdx : 0];
          result.transitionSpeed = calcTransitionSpeed(curOh, nextOh, saju, gg);
        }
      }
    }

    // Stage 4: WHAT
    result.discrepancies = detectDiscrepancy(saju, gg, mbtiType, mbtiIntensities);
    result.barnumPrevention = BARNUM_PREVENTION;

    // MBTI 강도 프로필
    if (mbtiIntensities && mbtiIntensities.length === 4) {
      result.mbtiLevels = mbtiIntensities.map(function(v) { return getMBTILevel(v); });
    }

    return result;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 14: 궁합 MBTS 분석                        ║
  // ╚══════════════════════════════════════════════════╝

  function analyzeGunghapMBTS(ghResult, relType, sajuA, sajuB, ggA, ggB) {
    var result = {};

    // 관계 유형별 가중 점수
    result.relTypeScore = calcGunghapByRelType(ghResult, relType);

    // 모든 관계 유형 비교 (연애≠결혼 원리)
    result.allRelScores = {};
    var types = ['연인','부부','썸','짝사랑','친구','직장'];
    for (var i = 0; i < types.length; i++) {
      result.allRelScores[types[i]] = calcGunghapByRelType(ghResult, types[i]);
    }

    // 최대/최소 차이 분석
    var scores = types.map(function(t) { return { type: t, score: result.allRelScores[t].total }; });
    scores.sort(function(a, b) { return b.score - a.score; });
    result.bestRelType = scores[0];
    result.worstRelType = scores[scores.length - 1];
    result.gap = scores[0].score - scores[scores.length - 1].score;

    if (result.gap >= 20) {
      result.gapInsight = '관계 유형에 따라 ' + result.gap + '점 차이. ' +
        scores[0].type + '으로는 좋지만 ' + scores[scores.length - 1].type + '으로는 도전적인 관계.';
    }

    // 기질 궁합
    if (sajuA && sajuB) {
      var tA = getTemperament(sajuA);
      var tB = getTemperament(sajuB);
      if (tA && tB) {
        result.temperamentMatch = {
          a: tA.name + '(' + tA.nameEn + ')',
          b: tB.name + '(' + tB.nameEn + ')',
          same: tA.id === tB.id,
          desc: tA.id === tB.id
            ? '같은 기질(' + tA.name + ') — 공감대 높지만 보완 부족 경향'
            : tA.name + ' × ' + tB.name + ' — 서로 다른 에너지의 만남'
        };
      }
    }

    return result;
  }

  // ╔══════════════════════════════════════════════════╗
  // ║  PART 15: window 전역 등록                      ║
  // ╚══════════════════════════════════════════════════╝

  // 상수
  window.MBTS_FUNCTIONS      = MBTS_FUNCTIONS;
  window.MBTS_TEMPERAMENTS   = TEMPERAMENT_GROUPS;
  window.MBTS_PILLAR_PSY     = PILLAR_PSYCHOLOGY;
  window.MBTS_GAN_HAP        = GAN_HAP_MBTS;
  window.MBTS_GAN_CHUNG      = GAN_CHUNG_MBTS;
  window.MBTS_SANGSAENG      = SANGSAENG_MBTS;
  window.MBTS_SANGGEUK       = SANGGEUK_MBTS;
  window.MBTS_GAEUN          = GAEUN;
  window.MBTS_GUNGHAP_AXIS   = GUNGHAP_AXIS;
  window.MBTS_REL_WEIGHTS    = REL_TYPE_WEIGHTS;
  window.MBTS_BARNUM         = BARNUM_PREVENTION;
  window.MBTS_STAGES         = ANALYSIS_STAGES;
  window.MBTS_MULSANG_GAN    = MULSANG_GAN;
  window.MBTS_MULSANG_SEASON = MULSANG_SEASON;

  // 함수
  window.ganToMBTS              = ganToMBTS;
  window.getTemperament         = getTemperament;
  window.buildNatalLandscape    = buildNatalLandscape;
  window.calcLandscapeHarmony   = calcLandscapeHarmony;
  window.getStrengthGrade       = getStrengthGrade;
  window.getMBTILevel           = getMBTILevel;
  window.detectDiscrepancy      = detectDiscrepancy;
  window.getHapChungPriority    = getHapChungPriority;
  window.classifyAmhap          = classifyAmhap;
  window.calcTransitionSpeed    = calcTransitionSpeed;
  window.getGaeun               = getGaeun;
  window.findBrokenChain        = findBrokenChain;
  window.calcGunghapByRelType   = calcGunghapByRelType;
  window.analyzeMBTS            = analyzeMBTS;
  window.analyzeGunghapMBTS     = analyzeGunghapMBTS;

  console.log('[mbts-logic.js] v7.0 로드 완료 — MBTS 10기능 + 73개 이론 엔진');

})();
