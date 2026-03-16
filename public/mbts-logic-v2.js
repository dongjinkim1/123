// ============================================================
// mbts-logic.js — MBTS v7.0 이론 엔진 + 자동 연동
// 
// ★★★ 기존 파일 수정 0줄 ★★★
// engine.js, saju.js, gunghap.js 절대 안 건드림.
// 이 파일을 추가하기만 하면 자동으로 기존 파이프라인에 연결됨.
// 제거하면 기존 코드가 그대로 동작함.
//
// 원리: saju.js가 engine.js를 래핑한 것과 동일한 패턴으로,
//       이 파일이 saju.js를 한 번 더 래핑함.
//
// 로드 순서: engine.js → saju.js → mbts-logic.js (맨 마지막)
// ============================================================

(function() {
  'use strict';

  // ╔══════════════════════════════════════════════════════════╗
  // ║                                                          ║
  // ║  PART A: MBTS v7.0 순수 이론 데이터                      ║
  // ║  (73개 이론의 코드 구현. 활용 로직 없는 순수 데이터)       ║
  // ║                                                          ║
  // ╚══════════════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // A-1. MBTS 10기능 체계 [🟡유력]
  // Ce/Ci = MBTS 고유 기능 (J/P 매핑 폐기)
  // ═══════════════════════════════════════════════════

  var MBTS_FUNCTIONS = {
    0: { id: 'Ne', name: '외향 직관', desc: '가능성 탐색', oh: '목', energy: '직관' },
    1: { id: 'Ni', name: '내향 직관', desc: '깊은 통찰',   oh: '목', energy: '직관' },
    2: { id: 'Fe', name: '외향 감정', desc: '사회적 조화', oh: '화', energy: '감정' },
    3: { id: 'Fi', name: '내향 감정', desc: '개인 가치관', oh: '화', energy: '감정' },
    4: { id: 'Ce', name: '외향 통합', desc: '구조화/안정화', oh: '토', energy: '통합', mbtsOriginal: true },
    5: { id: 'Ci', name: '내향 통합', desc: '수용/포용',   oh: '토', energy: '통합', mbtsOriginal: true },
    6: { id: 'Te', name: '외향 사고', desc: '효율/시스템', oh: '금', energy: '사고' },
    7: { id: 'Ti', name: '내향 사고', desc: '논리적 프레임', oh: '금', energy: '사고' },
    8: { id: 'Se', name: '외향 감각', desc: '현재 경험',   oh: '수', energy: '감각' },
    9: { id: 'Si', name: '내향 감각', desc: '기억/디테일', oh: '수', energy: '감각' }
  };

  function ganToMBTS(ganIdx) {
    if (ganIdx == null || ganIdx < 0 || ganIdx > 9) return null;
    return MBTS_FUNCTIONS[ganIdx];
  }

  // ═══════════════════════════════════════════════════
  // A-2. 5대 기질 그룹 [🟡유력]
  // ═══════════════════════════════════════════════════

  var TEMPERAMENT_GROUPS = {
    '목': { id: 'explorer',   name: '탐색자', nameEn: 'Explorer',   keywords: '가능성, 성장, 자유, 직관' },
    '화': { id: 'connector',  name: '연결자', nameEn: 'Connector',  keywords: '감정, 관계, 표현, 영감' },
    '토': { id: 'stabilizer', name: '안정자', nameEn: 'Stabilizer', keywords: '중심, 포용, 구조, 통합' },
    '금': { id: 'executor',   name: '실행자', nameEn: 'Executor',   keywords: '결단, 분석, 효율, 정밀' },
    '수': { id: 'adapter',    name: '적응자', nameEn: 'Adapter',    keywords: '유연, 경험, 지혜, 흐름' }
  };

  function getTemperament(sajuOrOh) {
    var oh = typeof sajuOrOh === 'string' ? sajuOrOh : (sajuOrOh && sajuOrOh.dmEl);
    return TEMPERAMENT_GROUPS[oh] || null;
  }

  // ═══════════════════════════════════════════════════
  // A-3. 8자 심리 위치론 [🟢확립]
  // Beebe 모델 폐기 → 사주 고유 위치론
  // ═══════════════════════════════════════════════════

  var PILLAR_PSYCHOLOGY = {
    dayGan:   { area: '핵심 자아',       desc: '가장 의식적인 기능' },
    dayJi:    { area: '무의식/내밀한 자아', desc: '숨겨진 갈망' },
    monthGan: { area: '사회적 도구',      desc: '의식적으로 꺼내 쓰는 기능' },
    monthJi:  { area: '사회적 기반',      desc: '격국의 뿌리' },
    yearGan:  { area: '외부 인상',       desc: '타인이 처음 보는 나' },
    yearJi:   { area: '원초적 기질',      desc: '세대 에너지' },
    hourGan:  { area: '지향점',          desc: '나이 들며 발달하는 기능' },
    hourJi:   { area: '가장 깊은 잠재력',  desc: '말년 또는 극한 시 발동' }
  };

  // ═══════════════════════════════════════════════════
  // A-4. 천간충 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GAN_CHUNG_MBTS = [
    { a: 0, b: 6, funcs: 'Ne vs Te', meaning: '가능성 vs 효율' },
    { a: 1, b: 7, funcs: 'Ni vs Ti', meaning: '직관 vs 분석' },
    { a: 2, b: 8, funcs: 'Fe vs Se', meaning: '조화 vs 경험' },
    { a: 3, b: 9, funcs: 'Fi vs Si', meaning: '가치관 vs 기억' }
  ];

  // ═══════════════════════════════════════════════════
  // A-5. 천간합 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GAN_HAP_MBTS = [
    { a: 0, b: 5, resultOh: '토', resultFunc: 'Ce/Ci', meaning: '탐색+수용 → 통합' },
    { a: 1, b: 6, resultOh: '금', resultFunc: 'Te/Ti', meaning: '통찰+효율 → 사고' },
    { a: 2, b: 7, resultOh: '수', resultFunc: 'Se/Si', meaning: '조화+분석 → 감각' },
    { a: 3, b: 8, resultOh: '목', resultFunc: 'Ne/Ni', meaning: '가치관+경험 → 직관' },
    { a: 4, b: 9, resultOh: '화', resultFunc: 'Fe/Fi', meaning: '구조+기억 → 감정' }
  ];

  // ═══════════════════════════════════════════════════
  // A-6. 물상 = 체현적 인지 형태 [🟡유력]
  // 근거: Lakoff & Johnson (1980)
  // ═══════════════════════════════════════════════════

  var MULSANG_GAN = {
    '갑': { image: '큰 나무',   qualities: '상승, 확장, 유연한 강함' },
    '을': { image: '꽃과 덩굴',  qualities: '적응, 아름다움, 부드러운 생존력' },
    '병': { image: '태양',      qualities: '밝음, 공평한 빛, 뜨거운 열정' },
    '정': { image: '촛불',      qualities: '따뜻함, 집중, 내밀한 빛' },
    '무': { image: '큰 산',     qualities: '무게, 안정, 움직이지 않는 중심' },
    '기': { image: '논밭',      qualities: '수용, 기름짐, 뭐든 키워내는 포용' },
    '경': { image: '바위/도끼',  qualities: '결단, 날카로움, 변하지 않는 원칙' },
    '신': { image: '보석',      qualities: '정밀, 아름다운 날카로움, 빛나는 내면' },
    '임': { image: '큰 강/바다', qualities: '흐름, 거침없음, 세상을 흡수' },
    '계': { image: '빗물/이슬',  qualities: '조용한 스며듦, 디테일, 섬세한 기록' }
  };

  var MULSANG_SEASON = {
    '인': { season: '이른 봄',   mood: '새싹이 움트는 시작의 에너지' },
    '묘': { season: '완연한 봄',  mood: '꽃이 만개하는 생명력' },
    '진': { season: '늦봄',     mood: '비 내려 촉촉한 환절기' },
    '사': { season: '초여름',    mood: '뜨거운 기운이 시작' },
    '오': { season: '한여름',    mood: '가장 뜨겁고 화려한 절정' },
    '미': { season: '늦여름',    mood: '무르익은 열기의 끝자락' },
    '신': { season: '초가을',    mood: '서늘한 바람이 부는 전환' },
    '유': { season: '완연한 가을', mood: '결실을 맺는 수확' },
    '술': { season: '늦가을',    mood: '낙엽 지는 메마른 정리' },
    '해': { season: '초겨울',    mood: '차가운 물이 깊어지는 시작' },
    '자': { season: '한겨울',    mood: '가장 깊고 고요한 응축' },
    '축': { season: '늦겨울',    mood: '봄을 준비하는 마지막 추위' }
  };

  // ═══════════════════════════════════════════════════
  // A-7. 상생상극 = 인지기능 촉진/억제 [🟡유력]
  // ═══════════════════════════════════════════════════

  var OH_SANG = { '목':'화','화':'토','토':'금','금':'수','수':'목' };
  var OH_GEUK = { '목':'토','토':'수','수':'화','화':'금','금':'목' };
  var SEASON_OH = { '인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토' };

  var SANGSAENG_MBTS = [
    { from: '목', to: '화', meaning: '직관이 감정을 키우는 경향' },
    { from: '화', to: '토', meaning: '감정이 구조를 만드는 경향' },
    { from: '토', to: '금', meaning: '구조가 사고를 키우는 경향' },
    { from: '금', to: '수', meaning: '사고가 감각을 키우는 경향' },
    { from: '수', to: '목', meaning: '경험이 직관을 키우는 경향' }
  ];

  var SANGGEUK_MBTS = [
    { from: '목', to: '토', meaning: '직관 과다 → 구조 약화 경향' },
    { from: '토', to: '수', meaning: '구조 집착 → 경험 거부 경향' },
    { from: '수', to: '화', meaning: '감각 매몰 → 감정 둔화 경향' },
    { from: '화', to: '금', meaning: '감정 과다 → 사고 방해 경향' },
    { from: '금', to: '목', meaning: '분석 과다 → 직관 억제 경향' }
  ];

  // ═══════════════════════════════════════════════════
  // A-8. 개운법 [🟡유력] — 방위 삭제됨
  // ═══════════════════════════════════════════════════

  var GAEUN = {
    '목': { actions: ['산책','등산','스트레칭','새로운 시도'], anchor: { color: '초록색', items: '초록 노트, 식물' }, food: '신맛(식초,레몬,매실)', message: '직관 에너지 보충. 가능성을 탐색하고 새로운 것을 시도하세요.' },
    '화': { actions: ['러닝','댄스','핫요가','감정일기','사람 만나기'], anchor: { color: '빨간색/주황색', items: '빨간 노트, 따뜻한 조명' }, food: '쓴맛(커피,다크초콜릿)', message: '감정 에너지 보충. 감정을 표현하고 사람과 연결하세요.' },
    '토': { actions: ['요가','필라테스','규칙적 루틴','정리정돈'], anchor: { color: '노란색/베이지', items: '베이지 톤 소품' }, food: '단맛(꿀,고구마,대추)', message: '통합 에너지 보충. 안정적인 루틴을 만들고 중심을 잡으세요.' },
    '금': { actions: ['웨이트','수영','호흡운동','결단 연습'], anchor: { color: '흰색/은색', items: '미니멀 인테리어' }, food: '매운맛(생강,마늘)', message: '사고 에너지 보충. 결단을 내리고 효율적으로 정리하세요.' },
    '수': { actions: ['수영','명상','산책','독서','여행'], anchor: { color: '검정/남색', items: '남색 노트' }, food: '짠맛(미역,다시마)', message: '감각 에너지 보충. 경험을 넓히고 흐름에 몸을 맡기세요.' }
  };

  // ═══════════════════════════════════════════════════
  // A-9. 암합 3층위 [🔵탐색]
  // ═══════════════════════════════════════════════════

  var AMHAP_LAYERS = {
    'junggi': { level: '반의식', desc: '왜인지 모르게 끌리는 수준' },
    'junggi-junggi': { level: '약한 무의식', desc: '나도 모르게 반복되는 패턴' },
    'yeogi':  { level: '깊은 무의식', desc: '존재 자체를 모르는 연결' }
  };

  // ═══════════════════════════════════════════════════
  // A-10. 합충 역학 3변수 [🟡유력]
  // ═══════════════════════════════════════════════════

  var PILLAR_DISTANCE = {
    'year-month': 1, 'month-day': 1, 'day-hour': 1,
    'year-day': 2, 'month-hour': 2, 'year-hour': 3
  };

  // ═══════════════════════════════════════════════════
  // A-11. 궁합 4대 축 + 관계별 가중치 [🟡유력]
  // ═══════════════════════════════════════════════════

  var GUNGHAP_AXIS = {
    chemistry:    { name: '끌림', layers: [1,8,15] },
    compensation: { name: '보완', layers: [3,7,11,16] },
    conflict:     { name: '갈등', layers: [2,9,13,14] },
    timeline:     { name: '시간', layers: [5,18,10] }
  };

  var REL_TYPE_WEIGHTS = {
    '연인':  { chemistry: 0.40, compensation: 0.20, conflict: 0.25, timeline: 0.15 },
    '부부':  { chemistry: 0.15, compensation: 0.30, conflict: 0.25, timeline: 0.30 },
    '썸':    { chemistry: 0.50, compensation: 0.15, conflict: 0.25, timeline: 0.10 },
    '짝사랑': { chemistry: 0.45, compensation: 0.20, conflict: 0.25, timeline: 0.10 },
    '친구':  { chemistry: 0.20, compensation: 0.30, conflict: 0.30, timeline: 0.20 },
    '직장':  { chemistry: 0.10, compensation: 0.35, conflict: 0.35, timeline: 0.20 }
  };

  // ═══════════════════════════════════════════════════
  // A-12. 바넘 효과 방지 + 풀이 4단계 [🟢확립]
  // ═══════════════════════════════════════════════════

  var BARNUM_PREVENTION = {
    text: "이 분석에서 '아닌데?'라고 느껴지는 부분이 있나요? " +
          "그 부분이 오히려 가장 중요한 정보일 수 있습니다. " +
          "사주가 보여주는 것과 현재의 당신이 다르다면 — " +
          "그건 당신이 사주를 넘어선 것이거나, 아직 발현되지 않은 잠재력입니다."
  };

  var ANALYSIS_STAGES = {
    stage1: { name: 'WHO', focus: '원국 해부' },
    stage2: { name: 'HOW', focus: '역학 해석' },
    stage3: { name: 'WHEN', focus: '시간축 분석' },
    stage4: { name: 'WHAT', focus: '실전 통합 (진단50%+처방50%)' }
  };

  // ╔══════════════════════════════════════════════════════════╗
  // ║                                                          ║
  // ║  PART B: 분석 함수들                                      ║
  // ║                                                          ║
  // ╚══════════════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // B-1. 원국 풍경화 [🟡유력]
  // ═══════════════════════════════════════════════════

  function buildNatalLandscape(saju) {
    if (!saju || !saju.dm || !saju.P) return null;
    var dm = saju.dm, ilji = saju.P[2].b, wolji = saju.P[1].b;
    var hero = MULSANG_GAN[dm] || { image: dm, qualities: '' };
    var ground = MULSANG_SEASON[ilji] || { season: '', mood: '' };
    var season = MULSANG_SEASON[wolji] || { season: '', mood: '' };
    return {
      hero: hero, ground: ground, season: season,
      landscape: season.season + ', ' + season.mood + '. ' + hero.image + '이(가) ' + (ground.mood || ilji) + ' 위에.',
      summary: season.season + '의 ' + hero.image
    };
  }

  // ═══════════════════════════════════════════════════
  // B-2. 물상 조화도 [🔵탐색]
  // ═══════════════════════════════════════════════════

  function calcLandscapeHarmony(saju) {
    if (!saju || !saju.dmEl || !saju.P) return null;
    var dmOh = saju.dmEl, seasonOh = SEASON_OH[saju.P[1].b];
    if (!seasonOh) return null;
    if (dmOh === seasonOh) return { label: '과잉 조화', desc: dmOh + ' 에너지 폭발. 강렬하지만 소진 빠를 수 있음' };
    if (OH_SANG[seasonOh] === dmOh) return { label: '자연 조화', desc: '계절이 ' + dmOh + ' 에너지를 지지. 안정적' };
    if (OH_SANG[dmOh] === seasonOh) return { label: '에너지 유출', desc: dmOh + ' 에너지가 계절에 소모. 주는 것이 많은 구조' };
    if (OH_GEUK[seasonOh] === dmOh) return { label: '부조화', desc: '계절이 ' + dmOh + ' 에너지를 억누름. 내적 갈등이 깊지만 창의성의 원천' };
    if (OH_GEUK[dmOh] === seasonOh) return { label: '약한 부조화', desc: dmOh + ' 에너지가 계절과 긴장. 도전적이지만 성장 가능' };
    return { label: '중립', desc: '' };
  }

  // ═══════════════════════════════════════════════════
  // B-3. 신강 5단계 [🟢확립]
  // ═══════════════════════════════════════════════════

  function getStrengthGrade(gg) {
    if (!gg || gg.selfStr == null) return null;
    var total = gg.selfStr + gg.otherStr;
    if (total === 0) return null;
    var ratio = gg.selfStr / total, pct = Math.round(ratio * 100);
    var g;
    if (ratio > 0.70) g = { label: '극신강', rx: '재성·관성으로 에너지 분출', desc: '자아 에너지 압도적' };
    else if (ratio > 0.55) g = { label: '신강', rx: '사회활동·재물활동이 건강한 방향', desc: '힘이 넘침. 독립심 강함' };
    else if (ratio >= 0.45) g = { label: '중화', rx: '용신 오행을 키우는 게 돌파구', desc: '음양 균형. 유연함' };
    else if (ratio >= 0.30) g = { label: '신약', rx: '인성(학습)·비겁(동료) 도움', desc: '환경 맞춤 능력 뛰어남' };
    else g = { label: '극신약', rx: '인성과 비겁이 생명줄', desc: '주변에 압도당하기 쉬운 구조' };
    g.pct = pct;
    return g;
  }

  // ═══════════════════════════════════════════════════
  // B-4. MBTI 강도 3단계 [🟢확립]
  // ═══════════════════════════════════════════════════

  function getMBTILevel(raw) {
    if (raw >= 76) return { level: 88, label: '극강' };
    if (raw >= 61) return { level: 68, label: '확실' };
    return { level: 55, label: '살짝' };
  }

  // ═══════════════════════════════════════════════════
  // B-5. 불일치 탐지 [🟡유력]
  // ═══════════════════════════════════════════════════

  function detectDiscrepancy(saju, gg, mbtiType, mbtiIntensities) {
    var results = [];
    if (gg && gg.cnt && gg.cnt['관성'] >= 2.5 && !gg.strong)
      results.push({ type: '억압형', desc: '본래 기질이 환경(관성)에 의해 눌렸을 가능성' });
    if (saju && saju.P && mbtiType) {
      var seasonOh = SEASON_OH[saju.P[1].b], ei = mbtiType.charAt(0);
      if (seasonOh === '화' && ei === 'I') results.push({ type: '조후 불일치', desc: '여름(火) 출생인데 I형 — "조용한 화산" 구조' });
      if (seasonOh === '수' && ei === 'E') results.push({ type: '조후 불일치', desc: '겨울(水) 출생인데 E형 — "얼음 위의 불꽃" 구조' });
    }
    if (gg && gg.isJonggyeok) results.push({ type: '종격 적응형', desc: 'MBTI 검사 시 매번 다른 결과 가능 — 적응형 유형' });
    if (saju && saju.el && mbtiType && mbtiIntensities) {
      if (saju.el['목'] === 0 && mbtiType.charAt(1) === 'N' && mbtiIntensities[1] >= 61)
        results.push({ type: '구조적 불일치', desc: '사주에 木(직관)=0인데 N이 강함 → 직관 표현 통로 없음' });
      if (saju.el['화'] === 0 && mbtiType.charAt(2) === 'F' && mbtiIntensities[2] >= 61)
        results.push({ type: '구조적 불일치', desc: '사주에 火(감정)=0인데 F가 강함 → 감정은 넘치는데 표현 못 하는 구조' });
    }
    return results;
  }

  // ═══════════════════════════════════════════════════
  // B-6. 끊어진 상생 체인 [🟡유력]
  // ═══════════════════════════════════════════════════

  function findBrokenChain(saju) {
    if (!saju || !saju.el) return [];
    var chain = ['목','화','토','금','수'], broken = [];
    for (var i = 0; i < 5; i++) {
      if ((saju.el[chain[i]] || 0) === 0) {
        broken.push({
          missing: chain[i],
          desc: chain[(i+4)%5] + '→(' + chain[i] + ')→' + chain[(i+1)%5] + ' 체인 끊김. ' + chain[i] + ' 보충이 처방'
        });
      }
    }
    return broken;
  }

  // ═══════════════════════════════════════════════════
  // B-7. 교운기 속도 [🔵탐색]
  // ═══════════════════════════════════════════════════

  function calcTransitionSpeed(prevOh, newOh, saju, gg) {
    if (!prevOh || !newOh) return null;
    var dist = 2;
    if (prevOh === newOh) dist = 0;
    else if (OH_SANG[prevOh] === newOh || OH_SANG[newOh] === prevOh) dist = 1;
    else if (OH_GEUK[prevOh] === newOh || OH_GEUK[newOh] === prevOh) dist = 3;
    var natal = (saju && saju.el && (saju.el[newOh]||0) >= 2) ? -1 : (saju && saju.el && (saju.el[newOh]||0) >= 1) ? 0 : 1;
    var ego = 0;
    if (gg) { var r = gg.selfStr/((gg.selfStr+gg.otherStr)||1); ego = r>0.55 ? -1 : r<0.45 ? 1 : 0; }
    var score = dist + natal + ego;
    if (score <= 0) return { months: 3, desc: prevOh+'→'+newOh+' 거의 즉시 전환' };
    if (score <= 1) return { months: 9, desc: prevOh+'→'+newOh+' 빠른 전환 (6개월~1년)' };
    if (score <= 2) return { months: 18, desc: prevOh+'→'+newOh+' 보통 전환 (1~2년)' };
    if (score <= 3) return { months: 30, desc: prevOh+'→'+newOh+' 느린 전환 (2~3년)' };
    return { months: 36, desc: prevOh+'→'+newOh+' 매우 느린 전환 (3년+)' };
  }

  // ═══════════════════════════════════════════════════
  // B-8. 궁합 관계별 점수 [🟡유력]
  // ═══════════════════════════════════════════════════

  function calcGunghapByRelType(ghResult, relType) {
    var w = REL_TYPE_WEIGHTS[relType] || REL_TYPE_WEIGHTS['연인'];
    var s = ghResult.scores || {};
    var total = Math.round(
      (s.love||50)*w.chemistry + ((s.values||50)+(s.work||50))/2*w.compensation +
      (s.comm||50)*w.conflict + (s.work||50)*w.timeline
    );
    return { relType: relType, total: Math.min(100, Math.max(0, total)) };
  }

  // ═══════════════════════════════════════════════════
  // B-9. 통합 분석 (메인 엔진)
  // ═══════════════════════════════════════════════════

  function analyzeMBTS(saju, gg, dw, mbtiType, mbtiIntensities) {
    var r = {};
    r.coreFunction = ganToMBTS(saju.raw.dg);
    r.temperament = getTemperament(saju);
    r.landscape = buildNatalLandscape(saju);
    r.landscapeHarmony = calcLandscapeHarmony(saju);
    r.strengthGrade = getStrengthGrade(gg);
    r.brokenChains = findBrokenChain(saju);
    r.discrepancies = detectDiscrepancy(saju, gg, mbtiType, mbtiIntensities);

    // 개운법
    var yoh = null;
    if (gg && gg.yongshin) {
      var oh5 = ['목','화','토','금','수'];
      for (var i=0;i<5;i++) { if (gg.yongshin.indexOf(oh5[i])>=0) { yoh=oh5[i]; break; } }
    }
    r.gaeun = yoh ? GAEUN[yoh] : null;

    // 8자 심리 위치
    r.positions = {};
    var gans = [saju.raw.yg, saju.raw.mg, saju.raw.dg, saju.raw.hg];
    var keys = ['yearGan','monthGan','dayGan','hourGan'];
    for (var j=0;j<4;j++) { if (gans[j]!=null) r.positions[keys[j]] = { func: ganToMBTS(gans[j]), area: PILLAR_PSYCHOLOGY[keys[j]] }; }

    // 암합
    if (saju.amhap && saju.amhap.length > 0) {
      r.amhap = saju.amhap.map(function(ah) {
        return { from: ah.from, to: ah.to, hapOh: ah.hapOh, gungwi: ah.gungwi, layer: '반의식',
          path: '암합→투출→밝합→의식적 선택' };
      });
    }

    // 대운 간합 변환
    if (dw && dw.daewoons && dw.currentDWIdx >= 0) {
      var cd = dw.daewoons[dw.currentDWIdx];
      if (cd && cd.ganIdx != null) {
        for (var h=0;h<GAN_HAP_MBTS.length;h++) {
          var hap = GAN_HAP_MBTS[h];
          if ((cd.ganIdx===hap.a && saju.raw.dg===hap.b)||(cd.ganIdx===hap.b && saju.raw.dg===hap.a)) {
            r.phaseTransition = { from: ganToMBTS(saju.raw.dg), to: hap.resultFunc, meaning: hap.meaning };
            break;
          }
        }
        // 교운기 속도
        var OHENG_TGAN = ['목','목','화','화','토','토','금','금','수','수'];
        var ni = dw.currentDWIdx + 1;
        if (ni < dw.daewoons.length && dw.daewoons[ni].ganIdx != null) {
          r.transitionSpeed = calcTransitionSpeed(OHENG_TGAN[cd.ganIdx], OHENG_TGAN[dw.daewoons[ni].ganIdx], saju, gg);
        }
      }
    }

    // MBTI 강도
    if (mbtiIntensities && mbtiIntensities.length === 4) {
      r.mbtiLevels = mbtiIntensities.map(getMBTILevel);
    }

    return r;
  }

  // ═══════════════════════════════════════════════════
  // B-10. MBTS 프롬프트 빌더
  // ═══════════════════════════════════════════════════

  function buildMBTSPrompt(mbtsResult) {
    if (!mbtsResult) return '';
    var L = [];

    // 풍경 씨앗 (MBTS 고유)
    if (mbtsResult.landscape) {
      L.push('## 이 사람의 풍경 (이야기의 씨앗)');
      L.push(mbtsResult.landscape.landscape);
      if (mbtsResult.landscapeHarmony) L.push('조화도: ' + mbtsResult.landscapeHarmony.label + ' — ' + mbtsResult.landscapeHarmony.desc);
      L.push('');
    }

    // 핵심 포인트 (MBTS 고유)
    L.push('## ★ MBTS 핵심 포인트');
    if (mbtsResult.temperament) L.push('기질: ' + mbtsResult.temperament.name + '(' + mbtsResult.temperament.nameEn + ') — ' + mbtsResult.temperament.keywords);
    if (mbtsResult.strengthGrade) L.push('자아강도: ' + mbtsResult.strengthGrade.label + '(' + mbtsResult.strengthGrade.pct + '%) — ' + mbtsResult.strengthGrade.desc + '. 처방: ' + mbtsResult.strengthGrade.rx);
    if (mbtsResult.gaeun) L.push('개운: ' + mbtsResult.gaeun.message);
    L.push('');

    // 특이점 (MBTS 고유)
    var sp = false;
    if (mbtsResult.discrepancies && mbtsResult.discrepancies.length > 0) {
      if (!sp) { L.push('## ☆ 특이점'); sp = true; }
      mbtsResult.discrepancies.forEach(function(d) { L.push('- 불일치(' + d.type + '): ' + d.desc); });
    }
    if (mbtsResult.phaseTransition) {
      if (!sp) { L.push('## ☆ 특이점'); sp = true; }
      L.push('- 간합변환: ' + (mbtsResult.phaseTransition.from?mbtsResult.phaseTransition.from.id:'') + '→' + mbtsResult.phaseTransition.to);
    }
    if (mbtsResult.brokenChains && mbtsResult.brokenChains.length > 0) {
      if (!sp) { L.push('## ☆ 특이점'); sp = true; }
      mbtsResult.brokenChains.forEach(function(bc) { L.push('- 상생체인: ' + bc.desc); });
    }
    if (sp) L.push('');

    // 바넘 방지 (짧게)
    L.push('## 바넘 방지');
    L.push(BARNUM_PREVENTION.text);

    return L.join('\n');
  }

  // ╔══════════════════════════════════════════════════════════╗
  // ║                                                          ║
  // ║  PART C: 자동 래핑 — 기존 코드 수정 0줄                    ║
  // ║  saju.js가 engine.js를 래핑한 것과 동일한 패턴              ║
  // ║                                                          ║
  // ╚══════════════════════════════════════════════════════════╝

  // ═══════════════════════════════════════════════════
  // C-1. runSajuAnalysis 래핑 — 분석 전 MBTS 데이터 생성
  // ═══════════════════════════════════════════════════

  var _prevRunSaju = window.runSajuAnalysis;

  if (typeof _prevRunSaju === 'function') {
    window.runSajuAnalysis = function(params, callbacks) {
      // MBTS 분석을 미리 실행하여 데이터 준비
      try {
        var saju = calcSajuForApp(
          +params.y, +params.m, +params.d,
          params.h ? +params.h : null,
          params.min ? +params.min : null,
          params.cityLng || null
        );
        var gg = analyzeGyeokguk(saju);
        var mt = (typeof getMBTIFromChoices === 'function') ? getMBTIFromChoices(params.mbtiChoices) : '';
        var dw = calcDaewoon(
          saju, +params.y, +params.m, +params.d,
          params.h ? +params.h : null,
          params.min ? +params.min : null,
          params.gender
        );

        var mbtsResult = analyzeMBTS(saju, gg, dw, mt, params.mbtiIntensities || [55,55,55,55]);
        window._MBTS_result = mbtsResult;
        window._MBTS_saju = saju;
        window._MBTS_gg = gg;
        window._MBTS_dw = dw;
        window._MBTS_mt = mt;
        console.log('[mbts-logic] MBTS v7.0 분석 완료:', Object.keys(mbtsResult).length + '개 항목');
      } catch(e) {
        console.warn('[mbts-logic] MBTS 분석 에러 (기존 파이프라인으로 계속):', e.message);
        window._MBTS_result = null;
      }

      // 원래의 runSajuAnalysis 호출 (saju.js 래핑 포함)
      return _prevRunSaju.call(this, params, callbacks);
    };
    console.log('[mbts-logic] runSajuAnalysis 래핑 완료');
  }

  // ═══════════════════════════════════════════════════
  // C-2. streamSonnet 래핑 — AI 호출 직전 MBTS 프롬프트 주입
  // ═══════════════════════════════════════════════════

  var _prevStreamSonnet = window.streamSonnet;

  if (typeof _prevStreamSonnet === 'function') {
    window.streamSonnet = function(apiKey, systemPrompt, userMsg, label, callbacks, endpoint) {
      // 궁합이 아닌 일반 분석일 때 MBTS 프롬프트 주입
      if (label && label.indexOf('궁합') < 0 && window._MBTS_result) {
        try {
          var mbtsPrompt = buildMBTSPrompt(window._MBTS_result);
          if (mbtsPrompt && mbtsPrompt.length > 100) {
            var marker = '## 참고 힌트';
            var idx = userMsg.indexOf(marker);
            if (idx >= 0) {
              userMsg = userMsg.substring(0, idx) +
                '\n## MBTS v7.0 분석 재료 (이야기의 씨앗으로 활용)\n' +
                mbtsPrompt + '\n\n' +
                userMsg.substring(idx);
            } else {
              userMsg += '\n\n## MBTS v7.0 분석 재료\n' + mbtsPrompt;
            }
            console.log('[mbts-logic] MBTS 프롬프트 주입 완료 — ' + mbtsPrompt.length + '자');
          }
        } catch(e) {
          console.warn('[mbts-logic] MBTS 프롬프트 주입 실패 (기존 프롬프트 사용):', e.message);
        }
        // MBTS 결과만 정리. _SJ_pendingData는 saju.js가 자체 처리하도록 유지
        window._MBTS_result = null;
      }

      // 원래의 streamSonnet 호출
      return _prevStreamSonnet.call(this, apiKey, systemPrompt, userMsg, label, callbacks, endpoint);
    };
    console.log('[mbts-logic] streamSonnet 래핑 완료');
  }

  // ╔══════════════════════════════════════════════════════════╗
  // ║  PART D: window 전역 등록                                ║
  // ╚══════════════════════════════════════════════════════════╝

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

  window.ganToMBTS            = ganToMBTS;
  window.getTemperament       = getTemperament;
  window.buildNatalLandscape  = buildNatalLandscape;
  window.calcLandscapeHarmony = calcLandscapeHarmony;
  window.getStrengthGrade     = getStrengthGrade;
  window.getMBTILevel         = getMBTILevel;
  window.detectDiscrepancy    = detectDiscrepancy;
  window.findBrokenChain      = findBrokenChain;
  window.calcTransitionSpeed  = calcTransitionSpeed;
  window.calcGunghapByRelType = calcGunghapByRelType;
  window.analyzeMBTS          = analyzeMBTS;
  window.buildMBTSPrompt      = buildMBTSPrompt;

  // ═══ 디버그: 래핑 체인 검증 ═══
  console.log('[mbts-debug] window.runSajuAnalysis 존재:', typeof window.runSajuAnalysis);
  console.log('[mbts-debug] window.streamSonnet 존재:', typeof window.streamSonnet);
  console.log('[mbts-debug] _prevRunSaju 캡처됨:', typeof _prevRunSaju);
  console.log('[mbts-debug] _prevStreamSonnet 캡처됨:', typeof _prevStreamSonnet);
  console.log('[mbts-debug] analyzeMBTS 존재:', typeof window.analyzeMBTS);
  console.log('[mbts-debug] buildMBTSPrompt 존재:', typeof window.buildMBTSPrompt);
  console.log('[mbts-debug] buildNatalLandscape 존재:', typeof window.buildNatalLandscape);

  console.log('[mbts-logic.js] v7.0 로드 완료 — 기존 코드 수정 0줄, 래핑으로 자동 연동');

})();
