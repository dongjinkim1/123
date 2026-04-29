// ======================================================================
// saju-theory.js — 통합 사주 이론 모듈
// 
// 4개 파트 통합:
//   Part 1: saju.js    (1,942줄) — 신살, 십성, 육친, 통변, 교운기, 건강, 직업
//   Part 2: engine.js  (3,238줄) — 사주 계산 코어, 격국, 대운, 합충형해, 일주 데이터
//   Part 3: mbts-logic (514줄)   — 물상 이론, 오행 밸런스, 궁합 축, 바넘 방지
//   Part 4: gunghap.js (442줄)   — 17레이어 궁합 엔진, 관계 유형, 점수 산출
//
// MBTI 오염: 0건 (전 파트 검증 완료)
// 용도: 토론 시스템의 "명리학자" 참조 데이터
// 참고: 각 파트는 독립 IIFE — 상수 중복(TGAN_KR 등)은 스코프 내 격리됨
// ======================================================================


// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║  PART 1: saju.js 기반 — 신살, 십성, 육친, 통변, 교운기             ║
// ║  (1,942줄)                                                         ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

// ======================================================================
// saju-theory-part1.js — saju.js 기반 사주 이론 모듈
// 원본: saju.js v1.0 (2314줄) → MBTI 교차 코드 + 배포 코드만 제거
// 제거 목록 (5개):
//   1. SJ_stripTerms — UI용 전문용어 변환기
//   2. SJ_yinYangMBTICross — 음양×MBTI E/I 교차 (토론에서 발견해야 할 내용)
//   3. SJ_buildYinYangText 중 MBTI 참조 — 위와 동일
//   4. SJ_enrichSajuData — 프롬프트 주입용 카테고리 분류 (배포 로직)
//   5. SJ_injectIntoPrompt + 런타임 훅 — 프롬프트 배관 (배포 로직)
// 나머지 전체 유지: 계산 함수, 텍스트 빌더, 헬퍼, 데이터 전부 포함
// ======================================================================
(function() {
'use strict';

// ── 오행 상수 ──
var SJ_OH = ['목','화','토','금','수'];

// ── 전문용어 → 자연어 변환기 ──
// engine.js PREMIUM_SYSTEM이 본문에 전문용어 노출을 금지하므로
// saju.js가 프롬프트에 넣는 텍스트에서도 제거해야 함
var SJ_TERM_MAP = {
  '식상생재': '표현→재물 연결',
  '살인상생': '압박→지혜 전환',
  '재관쌍미': '재물+명예 동시',
  '인수생비': '배움→힘 전환',
  '식신제살': '재능으로 위기 극복',
  '비겁탈재': '에너지 유출 (동업/보증 위험)',
  '재다신약': '기회 많으나 체력 부족',
  '관살혼잡': '이중 압박 구조',
  '인성태과': '생각 과잉 → 행동 부족',
  '식상태과': '표현 과잉 → 구설수',
  '비겁태과': '자존심 과잉',
  '재성태과': '물질 집착',
  '관성태과': '스트레스 과다',
  '상관견관': '규칙 vs 자유 갈등',
  '상관패인': '파격 창의력',
  '재생관살': '돈이 압박을 부름',
  '비견': '같은 에너지', '겁재': '경쟁 에너지',
  '식신': '표현/여유 에너지', '상관': '반항/창의 에너지',
  '편재': '도전적 재물', '정재': '안정적 재물',
  '편관': '압박/도전', '정관': '안정적 명예',
  '편인': '특수 학문', '정인': '정규 학문/보호',
  '비겁': '자기편 에너지', '식상': '표현 에너지',
  '재성': '재물 에너지', '관성': '직장/압박 에너지', '인성': '학습/보호 에너지',
  '용신(최길)': '핵심 에너지(최길)', '희신(길)': '보조 에너지(길)',
  '기신(흉)': '방해 에너지(흉)', '구신(소흉)': '소방해(소흉)', '한신(중립)': '중립 에너지',
  '용신': '핵심에너지', '희신': '보조에너지', '기신': '방해에너지', '구신': '소방해', '한신': '중립',
  '도화살': '매력 에너지', '역마살': '이동 에너지', '화개살': '영적/예술 에너지',
  '천을귀인': '귀인 에너지', '양인살': '결단 에너지', '홍염살': '매혹 에너지',
  '납음': '소리의 기운', '지장간': '숨겨진 에너지',
  '배우자궁': '배우자 자리', '직업궁': '직업 자리',
  '장생': '시작', '목욕': '변화', '관대': '화려', '건록': '독립',
  '제왕': '정점', '쇠': '안정', '병': '내리막', '사': '멈춤',
  '묘': '잠재', '절': '끊고다시', '태': '새싹', '양': '성장준비'
};

// [REMOVED for theory module] SJ_stripTerms — UI용 전문용어→자연어 변환기. 토론에서는 전문용어 그대로 사용.


// ======================================================================
// ① 5신 체계 (五神 體系)
// ======================================================================

// 용신 텍스트에서 오행 추출
function SJ_extractYongshinOh(txt) {
  if (!txt) return '';
  var i, ch;
  // 1순위: 텍스트에서 직접 오행 이름 매칭
  for (i = 0; i < SJ_OH.length; i++) {
    if (txt.indexOf(SJ_OH[i]) === 0) return SJ_OH[i];
  }
  // 2순위: 첫 글자가 천간이면 해당 오행
  ch = txt.charAt(0);
  var tIdx = TGAN_KR.indexOf(ch);
  if (tIdx >= 0) return OHAENG_TGAN[tIdx];
  // 3순위: 텍스트 내 오행 이름 탐색
  for (i = 0; i < SJ_OH.length; i++) {
    if (txt.indexOf(SJ_OH[i]) >= 0) return SJ_OH[i];
  }
  // 4순위: 텍스트 내 천간 이름 탐색
  for (i = 0; i < TGAN_KR.length; i++) {
    if (txt.indexOf(TGAN_KR[i]) >= 0) return OHAENG_TGAN[i];
  }
  return '';
}

// 5신 배정
function SJ_calcOsinChegye(yongshinOh) {
  var idx = SJ_OH.indexOf(yongshinOh);
  if (idx < 0) return null;
  return {
    yongsin: SJ_OH[idx],
    huisin:  SJ_OH[(idx + 4) % 5],
    gisin:   SJ_OH[(idx + 3) % 5],
    gusin:   SJ_OH[(idx + 2) % 5],
    hansin:  SJ_OH[(idx + 1) % 5]
  };
}

// 대상 오행이 5신 중 무엇인지 라벨링
function SJ_getOsinLabel(osin, targetOh) {
  if (!osin) return '';
  if (targetOh === osin.yongsin) return '용신(최길)';
  if (targetOh === osin.huisin)  return '희신(길)';
  if (targetOh === osin.gisin)   return '기신(흉)';
  if (targetOh === osin.gusin)   return '구신(소흉)';
  if (targetOh === osin.hansin)  return '한신(중립)';
  return '';
}

function SJ_buildOsinText(gg, dw) {
  var yoh = SJ_extractYongshinOh(gg.yongshin || '');
  if (!yoh) return '';
  var osin = SJ_calcOsinChegye(yoh);
  if (!osin) return '';
  var lines = [];
  lines.push('★5신 체계 (용신 기준):');
  lines.push('  용신=' + osin.yongsin + ' / 희신=' + osin.huisin + '(용신을 생) / 기신=' + osin.gisin + '(용신을 극) / 구신=' + osin.gusin + '(기신을 생) / 한신=' + osin.hansin);

  // 현재 대운/세운 5신 판별
  if (dw && dw.currentDWIdx >= 0 && dw.daewoons[dw.currentDWIdx]) {
    var cdw = dw.daewoons[dw.currentDWIdx];
    var dwGanOh = cdw.ganH || '';
    var dwJiOh = cdw.jiH || '';
    var ganLabel = SJ_getOsinLabel(osin, dwGanOh);
    var jiLabel = SJ_getOsinLabel(osin, dwJiOh);
    if (ganLabel || jiLabel) {
      lines.push('  현재 대운 ' + cdw.gan + cdw.ji + ': 천간=' + dwGanOh + (ganLabel ? '(' + ganLabel + ')' : '') + ', 지지=' + dwJiOh + (jiLabel ? '(' + jiLabel + ')' : ''));
    }
  }
  if (dw && dw.seun && dw.seun.length > 0) {
    var se = dw.seun[0];
    var seGanOh = se.ganH || '';
    var seJiOh = se.jiH || '';
    var sgLabel = SJ_getOsinLabel(osin, seGanOh);
    var sjLabel = SJ_getOsinLabel(osin, seJiOh);
    if (sgLabel || sjLabel) {
      lines.push('  ' + se.y + '년 세운 ' + se.gan + se.ji + ': 천간=' + seGanOh + (sgLabel ? '(' + sgLabel + ')' : '') + ', 지지=' + seJiOh + (sjLabel ? '(' + sjLabel + ')' : ''));
    }
  }
  return lines.join('\n');
}


// ======================================================================
// ② 육친론 (六親論)
// ======================================================================

var SJ_YUKCHIN_MAP = {
  '남': {
    '비견':'형제/친구', '겁재':'이복형제/경쟁자',
    '식신':'장모/손자/여유', '상관':'할머니/표현욕',
    '편재':'아버지/애인(여)/사업', '정재':'아내/안정적재물',
    '편관':'아들/직장상사/압박', '정관':'딸/명예/사회적인정',
    '편인':'계모/의모/특수학문', '정인':'어머니/정규학문/보호'
  },
  '여': {
    '비견':'자매/친구', '겁재':'이복자매/경쟁자',
    '식신':'딸/표현/여유', '상관':'아들/반항/자유',
    '편재':'시어머니/투자', '정재':'아버지/안정적재물',
    '편관':'애인(남)/카리스마남', '정관':'남편/안정적남자',
    '편인':'계모/의모/특수학문', '정인':'어머니/정규학문/보호'
  }
};

var SJ_GUNGWI_DESC = {
  0: '조상·어린시절. 이 자리의 육친은 태어난 환경의 에너지',
  1: '사회·직업. 이 자리의 육친은 사회에서 만나는 사람/에너지',
  2: '배우자궁. 이 자리의 육친은 배우자 에너지',
  3: '자녀·말년. 이 자리의 육친은 말년의 사람/에너지'
};

function SJ_buildYukchinText(saju, gender) {
  var gKey = (gender === '여성' || gender === '여') ? '여' : '남';
  var map = SJ_YUKCHIN_MAP[gKey];
  var lines = ['★육친 배치 (' + gKey + '):'];
  var labels = ['년간','월간','일간(본인)','시간'];
  var gungwiNames = ['조상·어린시절','사회·직업','본인','자녀·말년'];

  // 천간 십성
  for (var i = 0; i < saju.ss.length; i++) {
    var s = saju.ss[i];
    if (i === 2) continue; // 일간은 본인이므로 스킵
    var yk = map[s.ss] || s.ss;
    lines.push('  ' + labels[i] + ' = ' + s.ss + '(' + yk + ') → ' + SJ_GUNGWI_DESC[i]);
  }

  // 일지 정기 = 배우자궁
  if (saju.jiSS && saju.jiSS[2]) {
    var djiSS = saju.jiSS[2].ss;
    var dyk = map[djiSS] || djiSS;
    lines.push('  일지정기 = ' + djiSS + '(' + dyk + ') → 배우자궁에 ' + dyk + ' 에너지');
  }

  return lines.join('\n');
}


// ======================================================================
// ③ 12운성 궁위별 의미
// ======================================================================

var SJ_UNSUNG_MEANING = {
  '장생': { spouse:'배우자가 성장 에너지를 줌. 함께 발전하는 관계', career:'새로운 시작에 적성. 창업/신규사업에 강함', child:'자녀가 발전적. 말년에 새 시작', outer:'세상과 성장하는 관계' },
  '목욕': { spouse:'매력적이지만 변화무쌍한 배우자. 외도 주의', career:'직업 변동 잦음. 자유로운 환경이 적성', child:'자녀가 자유분방', outer:'사교적이지만 구설수 주의' },
  '관대': { spouse:'배우자가 화려하고 사교적. 체면 중시', career:'사회적 지위 상승. 직장에서 인정', child:'자녀가 당당함', outer:'세상에서 당당한 자기표현' },
  '건록': { spouse:'배우자가 독립적이고 자기주장 강함. 대등한 관계', career:'자기 힘으로 밥벌이. 프로의식', child:'자녀가 독립적', outer:'세상에서 자기 몫을 확실히 챙김' },
  '제왕': { spouse:'배우자 에너지가 극강. 강한 사람에게 끌림', career:'최고를 지향. 리더십', child:'자녀가 강한 개성', outer:'세상의 중심에 서려는 에너지' },
  '쇠':   { spouse:'편안하지만 열정이 식어가는 구조', career:'안정적이지만 정체기 가능', child:'자녀가 안정적', outer:'세상과 편안한 관계' },
  '병':   { spouse:'건강/에너지 이슈로 관계에 부담 가능', career:'직업 변동 주의', child:'자녀 건강 주의', outer:'세상과의 관계에 피로감' },
  '사':   { spouse:'배우자궁 에너지 약함. 스스로 서는 구조', career:'전환점. 낡은 것을 버려야', child:'자녀와 거리감', outer:'세상과 한발 물러선 관계' },
  '묘':   { spouse:'잠재적 인연. 드러나지 않는 깊은 정', career:'숨어있는 재능 발견', child:'자녀가 조용히 실력 쌓음', outer:'드러나지 않는 저력' },
  '절':   { spouse:'인연이 끊겼다 다시 이어지는 패턴', career:'완전히 새로운 출발', child:'자녀와 인연이 끊겼다 이어짐', outer:'세상과 단절 후 재연결' },
  '태':   { spouse:'새 인연의 시작. 설렘', career:'새 아이디어 잉태기', child:'자녀 잉태/출산 운', outer:'새 씨앗을 뿌리는 시기' },
  '양':   { spouse:'인연이 자라나는 중. 아직 미완성', career:'성장 준비기. 기반 다지기', child:'자녀가 천천히 성장', outer:'세상과의 관계가 조금씩 넓어짐' }
};

function SJ_buildUnsungGungwiText(saju) {
  if (!saju.uns || saju.uns.length < 4) return '';
  var gungwiMap = [
    { idx: 0, key: 'outer',  label: '년주(외부환경)' },
    { idx: 1, key: 'career', label: '월주(직업)' },
    { idx: 2, key: 'spouse', label: '일지(배우자)' },
    { idx: 3, key: 'child',  label: '시주(자녀·말년)' }
  ];
  var lines = ['★12운성 궁위별 의미:'];
  for (var i = 0; i < gungwiMap.length; i++) {
    var g = gungwiMap[i];
    var unsName = saju.uns[g.idx];
    var meaning = SJ_UNSUNG_MEANING[unsName];
    if (meaning && meaning[g.key]) {
      lines.push('  ' + g.label + ' ' + unsName + ' → ' + meaning[g.key]);
    }
  }
  return lines.join('\n');
}


// ======================================================================
// ④ 통변 공식 16개
// ======================================================================

function SJ_detectTongbyeon(gg, ssIndiv) {
  var cnt = gg.cnt;
  var selfRatio = (cnt['비겁'] + cnt['인성']) / ((cnt['비겁'] + cnt['인성'] + cnt['식상'] + cnt['재성'] + cnt['관성']) || 1);
  var result = [];

  // 길(吉)
  if (cnt['식상'] >= 1.5 && cnt['재성'] >= 1.5)
    result.push({ name:'식상생재', type:'길', desc:'표현력→수입 파이프라인/창작·콘텐츠·교육으로 전환 가능' });
  if (cnt['관성'] >= 1.5 && cnt['인성'] >= 1.5)
    result.push({ name:'살인상생', type:'길', desc:'시련→지혜 전환 체질/전문가·학자형 성장 회로' });
  if (cnt['재성'] >= 1.5 && cnt['관성'] >= 1.5)
    result.push({ name:'재관쌍미', type:'길', desc:'재물+명예 동시 포착 가능/두 트랙 병행 체질' });
  if (cnt['인성'] >= 1.5 && cnt['비겁'] >= 1.5)
    result.push({ name:'인수생비', type:'길', desc:'학습→내면 강화 회로/배울수록 단단해지는 구조' });
  if ((ssIndiv['식신'] || 0) >= 1 && cnt['관성'] >= 1.5)
    result.push({ name:'식신제살', type:'길', desc:'재능이 방패/위기 상황에서 표현력이 돌파구' });

  // 흉(凶)
  if (cnt['비겁'] >= 2.0 && cnt['재성'] >= 1.0)
    result.push({ name:'비겁탈재', type:'흉', desc:'재물 유출 패턴/공동 사업·보증 리스크 높음/독립 수익 유리' });
  if (cnt['재성'] >= 2.5 && selfRatio < 0.35)
    result.push({ name:'재다신약', type:'흉', desc:'기회 과다+체력 부족/선택과 집중 필수/파트너 활용' });
  if ((ssIndiv['편관'] || 0) >= 1 && (ssIndiv['정관'] || 0) >= 1)
    result.push({ name:'관살혼잡', type:'흉', desc:'이중 압박 구조/방향 정리가 핵심 과제' });
  if (cnt['인성'] >= 3.0)
    result.push({ name:'인성태과', type:'흉', desc:'사고 과잉→행동 지연/실행 트리거 필요' });
  if (cnt['식상'] >= 3.0)
    result.push({ name:'식상태과', type:'흉', desc:'표현 과잉→구설 리스크/절제가 무기' });
  if (cnt['비겁'] >= 3.0)
    result.push({ name:'비겁태과', type:'흉', desc:'자존심 과열/협업에서 마찰/양보가 성장 포인트' });
  if (cnt['재성'] >= 3.0)
    result.push({ name:'재성태과', type:'흉', desc:'재물 집착 경향/관계 균형 필요' });
  if (cnt['관성'] >= 3.0)
    result.push({ name:'관성태과', type:'흉', desc:'외부 압박 과다/자기 공간 확보가 생존 전략' });
  if ((ssIndiv['상관'] || 0) >= 1 && (ssIndiv['정관'] || 0) >= 1)
    result.push({ name:'상관견관', type:'흉', desc:'체제 vs 자유 내면 충돌/독립적 환경에서 발휘' });
  if (cnt['식상'] >= 1.5 && cnt['인성'] >= 1.5)
    result.push({ name:'상관패인', type:'반길반흉', desc:'파격적 창의력. 천재와 괴짜의 경계' });
  if (cnt['재성'] >= 1.5 && cnt['관성'] >= 1.5 && cnt['인성'] < 0.5)
    result.push({ name:'재생관살', type:'흉', desc:'돈이 압박을 부르는 구조' });

  return result;
}

function SJ_buildTongbyeonText(tongbyeons) {
  if (!tongbyeons || tongbyeons.length === 0) return '';
  var lines = ['★통변 공식 감지:'];
  for (var i = 0; i < tongbyeons.length; i++) {
    var t = tongbyeons[i];
    lines.push('  ' + t.name + ' [' + t.type + '] — ' + t.desc);
  }
  return lines.join('\n');
}


// ======================================================================
// ⑤ 공망 궁위별 의미
// ======================================================================

var SJ_GONGMANG_GUNGWI = {
  '년지': '조상/어린시절 자리가 비어있음. 조상 덕 약하거나 고향 일찍 떠남. 스스로 개척하는 힘',
  '월지': '직업/사회 자리가 비어있음. 남이 만든 자리보다 스스로 만든 자리에서 빛남',
  '일지': '배우자 자리가 비어있음. 인연이 늦거나 특이한 형태. 채우면 더 강해짐',
  '시지': '자녀/말년 자리가 비어있음. 자녀 인연 늦거나 말년 전환. 영적 성장 계기'
};

function SJ_buildGongmangText(saju) {
  var gm;
  if (typeof calcGongmang === 'function') {
    gm = calcGongmang(saju);
  } else {
    // 직접 계산
    var r = saju.raw, dg = r.dg, dj = r.dj;
    var idx60 = -1;
    for (var k = 0; k < 60; k++) { if (k % 10 === dg && k % 12 === dj) { idx60 = k; break; } }
    if (idx60 < 0) return '';
    var xunStart = Math.floor(idx60 / 10) * 10;
    var usedJi = [];
    for (var k2 = xunStart; k2 < xunStart + 10; k2++) usedJi.push(k2 % 12);
    var gmArr = [];
    for (var j = 0; j < 12; j++) { if (usedJi.indexOf(j) < 0) gmArr.push(j); }
    var pillars = [{ v: r.yj, l: '년지' }, { v: r.mj, l: '월지' }, { v: r.dj, l: '일지' }];
    if (r.hj != null) pillars.push({ v: r.hj, l: '시지' });
    var affected = [];
    pillars.forEach(function(p) { if (p.v != null && gmArr.indexOf(p.v) >= 0) affected.push(p.l); });
    gm = { gm: gmArr, affected: affected };
  }

  if (!gm || !gm.affected || gm.affected.length === 0) return '';
  var lines = ['★공망 궁위 해석:'];
  for (var i = 0; i < gm.affected.length; i++) {
    var name = gm.affected[i].replace(/\(.*\)/, ''); // '연지(자)' → '연지'
    // 연지→년지 변환
    var key = name;
    if (key === '연지') key = '년지';
    var desc = SJ_GONGMANG_GUNGWI[key];
    if (desc) {
      lines.push('  ' + gm.affected[i] + ': ' + desc);
    }
  }
  return lines.length > 1 ? lines.join('\n') : '';
}


// ======================================================================
// ⑥ 음양 밸런스
// ======================================================================

function SJ_calcYinYang(saju) {
  var r = saju.raw;
  var yang = 0;
  // 천간 (짝수=양)
  var gans = [r.yg, r.mg, r.dg, r.hg];
  for (var i = 0; i < gans.length; i++) {
    if (gans[i] != null && gans[i] % 2 === 0) yang++;
  }
  // 지지 (짝수=양)
  var jis = [r.yj, r.mj, r.dj, r.hj];
  for (var j = 0; j < jis.length; j++) {
    if (jis[j] != null && jis[j] % 2 === 0) yang++;
  }
  var total = 0;
  gans.forEach(function(v) { if (v != null) total++; });
  jis.forEach(function(v) { if (v != null) total++; });
  var yin = total - yang;
  var label, desc;
  if (yang >= 7) { label = '극양'; desc = '추진력 극강, 앞만 보고 달림'; }
  else if (yang >= 5) { label = '양우세'; desc = '활동적이고 주도적'; }
  else if (yang === 4) { label = '균형'; desc = '음양 조화. 유연한 전환'; }
  else if (yang >= 2) { label = '음우세'; desc = '신중하고 깊이 있는 사유'; }
  else { label = '극음'; desc = '내면세계 풍부. 행동보다 생각'; }
  return { yang: yang, yin: yin, label: label, desc: desc };
}

// [REMOVED for theory module] SJ_yinYangMBTICross — 음양×MBTI E/I 교차. 토론에서 발견해야 할 내용.

function SJ_buildYinYangText(saju) {
  var yy = SJ_calcYinYang(saju);
  return '★음양 밸런스: 양=' + yy.yang + ' 음=' + yy.yin + ' → ' + yy.label + '(' + yy.desc + ')';
}


// ======================================================================
// ⑦ 대운 교운기
// ======================================================================

var SJ_SS_GROUP = {
  '비견':'비겁', '겁재':'비겁',
  '식신':'식상', '상관':'식상',
  '편재':'재성', '정재':'재성',
  '편관':'관성', '정관':'관성',
  '편인':'인성', '정인':'인성'
};

var SJ_TRANSITION = {
  '관성→인성': '싸움에서 배움으로',
  '인성→비겁': '배움 끝나고 실전 투입',
  '비겁→식상': '혼자 하던 것을 표현 시작',
  '식상→재성': '표현이 돈이 되기 시작',
  '재성→관성': '돈 벌다 책임 따라옴',
  '관성→비겁': '압박에서 독립',
  '비겁→재성': '자기 힘으로 돈 벌기 시작',
  '재성→인성': '물질에서 정신으로',
  '인성→식상': '쌓은 지식을 표현',
  '식상→관성': '자유에 규율이 들어옴',
  '인성→관성': '학습에서 사회활동으로',
  '식상→비겁': '표현에서 독립으로',
  '재성→식상': '실리에서 자기표현으로',
  '관성→식상': '압박에서 해방',
  '비겁→인성': '독립에서 학습으로',
  '관성→재성': '명예에서 재물로'
};

function SJ_findGyowoongi(dw, currentAge) {
  if (!dw || !dw.daewoons || dw.daewoons.length < 2) return '';
  var lines = ['★교운기(대운 전환점):'];
  var found = 0;
  var birthYear = new Date().getFullYear() - (currentAge || dw.currentAge || 30);

  for (var i = 0; i < dw.daewoons.length - 1; i++) {
    var curr = dw.daewoons[i];
    var next = dw.daewoons[i + 1];
    var currGroup = SJ_SS_GROUP[curr.ss] || curr.ss;
    var nextGroup = SJ_SS_GROUP[next.ss] || next.ss;

    if (currGroup === nextGroup) continue;

    var transAge = next.startAge;
    var ageNow = currentAge || dw.currentAge || 30;
    var diff = transAge - ageNow;

    if (diff < -2 || diff > 15) continue;

    var transYear = birthYear + transAge;
    var key = currGroup + '→' + nextGroup;
    var meaning = SJ_TRANSITION[key] || currGroup + '에서 ' + nextGroup + '으로 전환';
    var marker = '';
    if (diff >= -2 && diff <= 2) marker = ' ⚡지금!';
    else if (diff <= 5) marker = ' 곧';

    lines.push('  ' + transAge + '세(' + transYear + '년)' + marker + ' — ' + curr.ss + '운→' + next.ss + '운: ' + meaning);
    found++;
  }

  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑧ 형 상세 (삼형살)
// ======================================================================

function SJ_checkSamhyung(saju) {
  var r = saju.raw;
  var jis = [r.yj, r.mj, r.dj];
  if (r.hj != null) jis.push(r.hj);
  var jiLabels = ['년지','월지','일지','시지'];
  var result = [];

  // 인사신(2,5,8) 무은지형
  var inSaSin = [2, 5, 8];
  var inSaSinFound = [];
  for (var i = 0; i < jis.length; i++) {
    if (inSaSin.indexOf(jis[i]) >= 0) inSaSinFound.push(jiLabels[i] + '(' + JIJI_KR[jis[i]] + ')');
  }
  if (inSaSinFound.length >= 2) {
    result.push({
      name: '무은지형(인사신)',
      type: inSaSinFound.length >= 3 ? '완전체' : '부분체',
      where: inSaSinFound.join(', '),
      desc: '은혜↔배신 에너지/신뢰 관계에서 반전 리스크',
      health: '화상, 교통사고, 수술'
    });
  }

  // 축술미(1,10,7) 지세지형
  var chukSulMi = [1, 10, 7];
  var csmFound = [];
  for (var j = 0; j < jis.length; j++) {
    if (chukSulMi.indexOf(jis[j]) >= 0) csmFound.push(jiLabels[j] + '(' + JIJI_KR[jis[j]] + ')');
  }
  if (csmFound.length >= 2) {
    result.push({
      name: '지세지형(축술미)',
      type: csmFound.length >= 3 ? '완전체' : '부분체',
      where: csmFound.join(', '),
      desc: '권력다툼. 서로 빼앗으려는 형국',
      health: '위장, 피부'
    });
  }

  // 자묘(0,3) 무례지형
  var hasJa = false, hasMyo = false;
  var jaMyo = [];
  for (var k = 0; k < jis.length; k++) {
    if (jis[k] === 0) { hasJa = true; jaMyo.push(jiLabels[k] + '(자)'); }
    if (jis[k] === 3) { hasMyo = true; jaMyo.push(jiLabels[k] + '(묘)'); }
  }
  if (hasJa && hasMyo) {
    result.push({
      name: '무례지형(자묘)',
      type: '성립',
      where: jaMyo.join(', '),
      desc: '예의 없는 충돌. 감정 폭발',
      health: '심장, 신장'
    });
  }

  // 자형(진진/오오/유유/해해)
  var jaHyungTargets = [4, 6, 9, 11];
  for (var t = 0; t < jaHyungTargets.length; t++) {
    var target = jaHyungTargets[t];
    var jhFound = [];
    for (var m = 0; m < jis.length; m++) {
      if (jis[m] === target) jhFound.push(jiLabels[m] + '(' + JIJI_KR[target] + ')');
    }
    if (jhFound.length >= 2) {
      result.push({
        name: '자형(' + JIJI_KR[target] + JIJI_KR[target] + ')',
        type: '성립',
        where: jhFound.join(', '),
        desc: '스스로를 해침. 자기 파괴적',
        health: '정신건강'
      });
    }
  }

  return result;
}

function SJ_buildHyungText(hyungs) {
  if (!hyungs || hyungs.length === 0) return '';
  var lines = ['★형살 상세:'];
  for (var i = 0; i < hyungs.length; i++) {
    var h = hyungs[i];
    lines.push('  ' + h.name + ' [' + h.type + '] — ' + h.where);
    lines.push('    의미: ' + h.desc);
    lines.push('    건강주의: ' + h.health);
  }
  return lines.join('\n');
}


// ======================================================================
// ⑨ 건강 오행 대응
// ======================================================================

var SJ_HEALTH_OH = {
  '목': { organ:'간, 담', body:'눈, 근육, 손발톱', excess:'두통, 눈충혈, 근육경련', lack:'시력저하, 만성피로' },
  '화': { organ:'심장, 소장', body:'혈관, 혀, 얼굴', excess:'불면, 가슴두근거림', lack:'저혈압, 냉증, 우울' },
  '토': { organ:'위, 비장', body:'입, 소화기', excess:'소화불량, 비만, 당뇨주의', lack:'식욕부진, 빈혈' },
  '금': { organ:'폐, 대장', body:'코, 피부, 체모', excess:'피부트러블, 변비', lack:'기관지, 면역저하' },
  '수': { organ:'신장, 방광', body:'귀, 뼈, 치아', excess:'부종, 냉증', lack:'요통, 탈모, 골다공증' }
};

// ===========================================================
// ★ 오행 건강론 이론 — 왜 특정 오행이 특정 장부에 영향을 미치는가
// 출처: 황제내경(黃帝內經) 장부론 + 동의보감(東醫寶鑑) 오행배속론
// ===========================================================
// 오행과 장부 대응 원리:
//   木(목) → 肝膽(간담): 나무가 위로 뻗듯 간은 기(氣)를 위로 올림. 소설(疏泄) 기능.
//     목 과다 → 간기울결(肝氣鬱結): 분노·두통·눈충혈·근육경련. 목 부족 → 간혈부족: 시력저하·만성피로·손톱갈라짐
//   火(화) → 心小腸(심장소장): 불이 위로 타오르듯 심장은 혈을 전신에 순환.
//     화 과다 → 심화상염(心火上炎): 불면·가슴두근거림·구내염·안면홍조. 화 부족 → 심양부족: 저혈압·냉증·우울·무기력
//   土(토) → 脾胃(비장위장): 흙이 만물을 키우듯 비위는 음식을 소화하여 기혈을 생산.
//     토 과다 → 비습(脾濕): 소화불량·비만·당뇨·부종·무거움. 토 부족 → 비기허(脾氣虛): 식욕부진·빈혈·사지무력
//   金(금) → 肺大腸(폐대장): 금속이 차갑고 수축하듯 폐는 기를 아래로 내림(숙강).
//     금 과다 → 폐조(肺燥): 피부건조·변비·기침. 금 부족 → 폐기허: 기관지약·면역저하·잔병치레·피부트러블
//   水(수) → 腎膀胱(신장방광): 물이 아래로 흐르듯 신장은 정(精)을 저장하고 생명의 근본.
//     수 과다 → 수습(水濕): 부종·냉증·하체비만. 수 부족 → 신정부족: 요통·탈모·골다공증·이명·건망증
//
// ※ 상생 보강 원리: 부족한 오행을 직접 보충하거나, 그 오행을 생하는 모(母) 오행을 보강
//   예: 금(폐) 부족 → 토(비위) 보강(토생금), 또는 직접 금기운(흰색·매운맛·서쪽) 보충
// ※ 상극 과다 원리: 과다한 오행은 그것을 극하는 오행으로 제어
//   예: 화(심장) 과다 → 수(신장) 보강(수극화)

function SJ_buildHealthText(saju, gg) {
  var lines = ['★건강 오행 주의:'];
  var found = 0;

  // 부족 오행
  if (saju.lackFull && saju.lackFull.length > 0) {
    for (var i = 0; i < saju.lackFull.length; i++) {
      var oh = saju.lackFull[i];
      var h = SJ_HEALTH_OH[oh];
      if (h) {
        lines.push('  ' + oh + ' 부족 → ' + h.organ + ' 약화 주의 (' + h.lack + ')');
        found++;
      }
    }
  }

  // 과다 오행 (elFull 3.0 이상)
  var elFull = saju.elFull || saju.el;
  for (var j = 0; j < SJ_OH.length; j++) {
    var ohName = SJ_OH[j];
    if ((elFull[ohName] || 0) >= 3.0) {
      var hData = SJ_HEALTH_OH[ohName];
      if (hData) {
        lines.push('  ' + ohName + ' 과다(' + elFull[ohName].toFixed(1) + ') → ' + hData.organ + ' 과부하 (' + hData.excess + ')');
        found++;
      }
    }
  }

  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑩ 천간 투출
// ======================================================================

function SJ_checkTuchul(saju) {
  if (!saju.jjg || !saju.jjg[1]) return '';
  var wolJJG = saju.jjg[1]; // 월지 지장간
  var stemIdxArr = [];
  if (saju.raw.yg != null) stemIdxArr.push(saju.raw.yg);
  if (saju.raw.mg != null) stemIdxArr.push(saju.raw.mg);
  if (saju.raw.dg != null) stemIdxArr.push(saju.raw.dg);
  if (saju.raw.hg != null) stemIdxArr.push(saju.raw.hg);

  var lines = ['★천간 투출 (월지 지장간 → 천간):'];
  var found = 0;
  for (var i = 0; i < wolJJG.length; i++) {
    var jj = wolJJG[i];
    var gIdx = jj.g;
    var stemName = jj.stem || TGAN_KR[gIdx];
    var oh = OHAENG_TGAN[gIdx];
    var ss = (typeof getSipsung === 'function') ? getSipsung(saju.raw.dg, gIdx) : '';
    var isTuchul = stemIdxArr.indexOf(gIdx) >= 0;
    if (isTuchul) {
      lines.push('  ' + stemName + '(' + oh + '/' + ss + ') → 투출 ✅ 월지의 에너지가 겉으로 드러남');
      found++;
    } else {
      lines.push('  ' + stemName + '(' + oh + '/' + ss + ') → 미투출 — 숨어있는 에너지');
      found++;
    }
  }

  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑪ 궁합용 교차 통변
// ======================================================================

function SJ_detectCrossTongbyeon(ggA, ggB) {
  if (!ggA || !ggB || !ggA.cnt || !ggB.cnt) return [];
  var avgCnt = {};
  var groups = ['비겁','식상','재성','관성','인성'];
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    avgCnt[g] = ((ggA.cnt[g] || 0) + (ggB.cnt[g] || 0)) / 2;
  }
  var fakeGG = { cnt: avgCnt };
  return SJ_detectTongbyeon(fakeGG, {});
}


// ======================================================================
// ⑫ 월률분야
// ======================================================================

var SJ_WOLRYUL_DATA = [
  { ji: '자', entries: [{stem:'임',days:10},{stem:'계',days:20}] },
  { ji: '축', entries: [{stem:'계',days:9},{stem:'신',days:3},{stem:'기',days:18}] },
  { ji: '인', entries: [{stem:'무',days:7},{stem:'병',days:7},{stem:'갑',days:16}] },
  { ji: '묘', entries: [{stem:'갑',days:10},{stem:'을',days:20}] },
  { ji: '진', entries: [{stem:'을',days:9},{stem:'계',days:3},{stem:'무',days:18}] },
  { ji: '사', entries: [{stem:'무',days:7},{stem:'경',days:7},{stem:'병',days:16}] },
  { ji: '오', entries: [{stem:'병',days:10},{stem:'기',days:9},{stem:'정',days:11}] },
  { ji: '미', entries: [{stem:'정',days:9},{stem:'을',days:3},{stem:'기',days:18}] },
  { ji: '신', entries: [{stem:'기',days:7},{stem:'임',days:7},{stem:'경',days:16}] },
  { ji: '유', entries: [{stem:'경',days:10},{stem:'신',days:20}] },
  { ji: '술', entries: [{stem:'신',days:9},{stem:'정',days:3},{stem:'무',days:18}] },
  { ji: '해', entries: [{stem:'무',days:7},{stem:'갑',days:5},{stem:'임',days:18}] }
];

function SJ_getWolryulText(saju) {
  var mj = saju.raw.mj;
  if (mj == null || mj < 0 || mj > 11) return '';
  var data = SJ_WOLRYUL_DATA[mj];
  var lines = ['★월률분야 (' + data.ji + '월):'];
  for (var i = 0; i < data.entries.length; i++) {
    var e = data.entries[i];
    var gIdx = TGAN_KR.indexOf(e.stem);
    var oh = gIdx >= 0 ? OHAENG_TGAN[gIdx] : '';
    var ss = (typeof getSipsung === 'function' && gIdx >= 0) ? getSipsung(saju.raw.dg, gIdx) : '';
    var role = (i === data.entries.length - 1) ? '정기(사령)' : (i === 0 ? '여기' : '중기');
    lines.push('  ' + e.stem + '(' + oh + '/' + ss + ') ' + e.days + '일간 — ' + role);
  }
  return lines.join('\n');
}


// ======================================================================
// ⑬ 개운 방향/색상
// ======================================================================

var SJ_GAEUN = {
  '목': { direction:'동쪽', color:'초록, 청록', number:'3, 8', season:'봄', career:'교육, 출판, 패션, 의류', food:'신맛, 푸른채소' },
  '화': { direction:'남쪽', color:'빨강, 보라, 주황', number:'2, 7', season:'여름', career:'방송, 에너지, 외식, IT', food:'쓴맛, 붉은음식' },
  '토': { direction:'중앙', color:'노랑, 갈색, 베이지', number:'5, 10', season:'환절기', career:'부동산, 건설, 농업, 중개', food:'단맛, 곡류' },
  '금': { direction:'서쪽', color:'흰색, 금색, 은색', number:'4, 9', season:'가을', career:'금융, 법률, 의료, 기계', food:'매운맛' },
  '수': { direction:'북쪽', color:'검정, 남색, 파랑', number:'1, 6', season:'겨울', career:'무역, 물류, 수산, 관광', food:'짠맛, 해산물' }
};

function SJ_buildGaeunText(yongshinOh) {
  if (!yongshinOh) return '';
  var g = SJ_GAEUN[yongshinOh];
  if (!g) return '';
  var lines = ['★개운법 (용신 ' + yongshinOh + ' 기준):'];
  lines.push('  방향: ' + g.direction + ' | 색상: ' + g.color + ' | 숫자: ' + g.number);
  lines.push('  계절: ' + g.season + ' | 직업: ' + g.career);
  lines.push('  음식: ' + g.food);
  return lines.join('\n');
}


// ======================================================================
// ⑭ 충격도
// ======================================================================

var SJ_IMPACT_SCORE = {
  '일지':   { score: 5, stars: '★★★★★', desc: '배우자·건강 직격' },
  '월지':   { score: 4, stars: '★★★★☆', desc: '직업·사회 강타' },
  '일간':   { score: 4, stars: '★★★★☆', desc: '자아 정체성 흔들림' },
  '년지':   { score: 3, stars: '★★★☆☆', desc: '외부환경 변화' },
  '시지':   { score: 3, stars: '★★★☆☆', desc: '자녀·노후 변동' },
  '월간':   { score: 3, stars: '★★★☆☆', desc: '사회적 위치 변동' },
  '년간':   { score: 2, stars: '★★☆☆☆', desc: '외부 관계 변화' },
  '시간':   { score: 2, stars: '★★☆☆☆', desc: '말년/계획 조정' }
};

function SJ_getImpactTag(pillarLabel) {
  var data = SJ_IMPACT_SCORE[pillarLabel];
  if (!data) return '';
  return data.stars + '(' + data.score + '점) ' + data.desc;
}


// ======================================================================
// 개별 십성 카운트 헬퍼
// ======================================================================

function SJ_countIndividualSS(saju) {
  var indiv = {};
  var names = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
  for (var n = 0; n < names.length; n++) indiv[names[n]] = 0;

  // 천간 (일주 제외 = index 2)
  if (saju.ss) {
    for (var i = 0; i < saju.ss.length; i++) {
      if (i === 2) continue;
      var s = saju.ss[i];
      if (s.ss && indiv.hasOwnProperty(s.ss)) indiv[s.ss]++;
    }
  }
  // 지지 정기 (가중 0.7)
  if (saju.jiSS) {
    for (var j = 0; j < saju.jiSS.length; j++) {
      var js = saju.jiSS[j];
      if (js.ss && indiv.hasOwnProperty(js.ss)) indiv[js.ss] += 0.7;
    }
  }
  return indiv;
}


// ======================================================================
// 헬퍼: 육합/충/도화/역마/화개
// ======================================================================

function SJ_isYukhap(ji1, ji2) {
  var pairs = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  for (var i = 0; i < pairs.length; i++) {
    if ((ji1 === pairs[i][0] && ji2 === pairs[i][1]) ||
        (ji1 === pairs[i][1] && ji2 === pairs[i][0])) return true;
  }
  return false;
}

function SJ_isChung(ji1, ji2) {
  return ji1 >= 0 && ji2 >= 0 && Math.abs(ji1 - ji2) === 6;
}

function SJ_getDohwa(ilji) {
  var m = {2:3,6:3,10:3, 5:6,9:6,1:6, 8:9,0:9,4:9, 11:0,3:0,7:0};
  return m[ilji] != null ? m[ilji] : -1;
}

function SJ_getYeokma(ilji) {
  var m = {2:8,6:8,10:8, 5:11,9:11,1:11, 8:2,0:2,4:2, 11:5,3:5,7:5};
  return m[ilji] != null ? m[ilji] : -1;
}

function SJ_getHwagae(ilji) {
  var m = {2:10,6:10,10:10, 5:1,9:1,1:1, 8:4,0:4,4:4, 11:7,3:7,7:7};
  return m[ilji] != null ? m[ilji] : -1;
}


// ======================================================================
// ⑮ 직업 적성 매칭
// ======================================================================

var SJ_JOB_APTITUDE = [
  {d:'식상',s:'재성',t:'SS',jobs:'프리랜서, 크리에이터, 자영업, 콘텐츠, 유튜버, 디자이너',reason:'재능을 돈으로 바꾸는 구조. 자기 이름으로 벌 때 극대화'},
  {d:'관성',s:'인성',t:'SS',jobs:'공무원, 교수, 연구원, 법조인, 의사, 컨설턴트',reason:'체계와 학문을 동시에 다루는 구조. 전문직에 최적화'},
  {d:'비겁',s:'식상',t:'SS',jobs:'운동선수, 영업, 강사, 방송인, 인플루언서, 리더',reason:'자기 에너지를 표현하는 구조. 몸과 입으로 벌 때 빛남'},
  {d:'재성',s:'관성',t:'SS',jobs:'경영인, 금융, 부동산, 무역, CEO',reason:'돈과 권력을 동시에 다루는 구조. 조직의 정상 지향'},
  {d:'인성',s:'비겁',t:'SS',jobs:'학자, 교사, 작가, 종교인, 상담사, 코치',reason:'배운 것을 자기 것으로 만드는 구조. 가르치고 이끌 때 빛남'},
  {d:'식상',s:'인성',t:'SS',jobs:'예술가, 발명가, 연구개발, 철학자, 크리에이티브 디렉터',reason:'깊이 있는 사고 + 독특한 표현. 창의적 전문가'},
  {d:'비겁',s:'재성',t:'SS',jobs:'영업, 체육, 건설, 군인/경찰',reason:'경쟁하면서 돈을 버는 구조. 단, 동업은 금지'},
  {d:'관성',w:'식상',t:'SW',jobs:'관리자, 행정, 감사, 심사역, 품질관리',reason:'규율은 강한데 표현은 약함. 시스템 관리에 최적'},
  {d:'재성',w:'인성',t:'SW',jobs:'장사, 트레이딩, 중개, 실전 투자',reason:'돈 감각은 좋은데 이론보다 실전파. 현장에서 빛남'},
  {d:'식상',w:'관성',t:'SW',jobs:'예술, 자유직, 프리랜서, 1인기업',reason:'표현욕 강한데 규율 싫음. 조직보다 자유로운 환경'},
  {d:'인성',w:'식상',t:'SW',jobs:'연구직, 데이터분석, 아카이브, 도서관사서',reason:'깊이는 있지만 표현이 약함. 뒤에서 깊이 파는 일'},
  {d:'관성',w:'비겁',t:'SW',jobs:'비서, 보좌관, 참모, 전문 어시스턴트',reason:'규율에 순응하지만 자기 주장이 약함. 보좌역에 적합'}
];

function SJ_buildJobText(gg) {
  if (!gg || !gg.cnt) return '';
  var groups = ['비겁','식상','재성','관성','인성'];
  var sorted = groups.slice().sort(function(a, b) { return (gg.cnt[b] || 0) - (gg.cnt[a] || 0); });
  var dominant = sorted[0];
  var subdominant = sorted[1];
  var weakest = sorted[sorted.length - 1];
  var lines = ['★직업 적성:'];
  var found = 0;
  var i, apt;
  for (i = 0; i < SJ_JOB_APTITUDE.length; i++) {
    apt = SJ_JOB_APTITUDE[i];
    if (apt.t === 'SS' && ((apt.d === dominant && apt.s === subdominant) || (apt.d === subdominant && apt.s === dominant))) {
      lines.push('  주력: ' + apt.d + '+' + apt.s + ' → ' + apt.jobs);
      lines.push('    (' + apt.reason + ')');
      found++;
      break;
    }
  }
  for (i = 0; i < SJ_JOB_APTITUDE.length; i++) {
    apt = SJ_JOB_APTITUDE[i];
    if (apt.t === 'SW' && apt.d === dominant && apt.w === weakest) {
      lines.push('  부력: ' + apt.d + '+' + apt.w + '약 → ' + apt.jobs);
      lines.push('    (' + apt.reason + ')');
      found++;
      break;
    }
  }
  if (found === 0) {
    var def = {'비겁':'독립사업, 영업, 체육, 리더십 분야','식상':'크리에이터, 예술, 교육, 표현 분야','재성':'금융, 부동산, 무역, 영업 분야','관성':'공무원, 관리직, 법조, 조직 분야','인성':'학자, 교사, 연구, 상담 분야'};
    lines.push('  주력: ' + dominant + ' 강세 → ' + (def[dominant] || ''));
  }
  return lines.join('\n');
}


// ======================================================================
// ⑯ 연애/결혼 타이밍
// ======================================================================

function SJ_findLoveTiming(saju, gg, dw, gender) {
  if (!dw || !dw.seun || dw.seun.length === 0) return '';
  var r = saju.raw;
  var ilji = r.dj;
  var gKey = (gender === '여성' || gender === '여') ? '여' : '남';
  var dohwa = SJ_getDohwa(ilji);
  var hongMap = {0:6,1:7,2:8,3:9,4:6,5:7,6:8,7:9,8:6,9:7};
  var hong = hongMap[r.dg] != null ? hongMap[r.dg] : -1;
  var dwSS = '';
  if (dw.currentDWIdx >= 0 && dw.daewoons && dw.daewoons[dw.currentDWIdx]) {
    dwSS = SJ_SS_GROUP[dw.daewoons[dw.currentDWIdx].ss] || '';
  }
  var lines = ['★연애/결혼 타이밍 (향후 5년):'];
  var found = 0;
  var count = Math.min(dw.seun.length, 5);
  for (var i = 0; i < count; i++) {
    var se = dw.seun[i];
    var score = 0;
    var reasons = [];
    var seGanIdx = TGAN_KR.indexOf(se.gan);
    var seJiIdx = JIJI_KR.indexOf(se.ji);
    var seSS = (typeof getSipsung === 'function' && seGanIdx >= 0) ? getSipsung(r.dg, seGanIdx) : '';
    var seSSGroup = SJ_SS_GROUP[seSS] || '';
    if (gKey === '남' && seSSGroup === '재성') { score += 3; reasons.push(seSS + '운'); }
    if (gKey === '여' && seSSGroup === '관성') { score += 3; reasons.push(seSS + '운'); }
    if (seJiIdx >= 0 && SJ_isYukhap(ilji, seJiIdx)) { score += 4; reasons.push('일지합'); }
    if (dohwa >= 0 && seJiIdx === dohwa) { score += 2; reasons.push('도화발동'); }
    if (hong >= 0 && seJiIdx === hong) { score += 1; reasons.push('홍염살'); }
    if (gKey === '남' && dwSS === '재성') { score += 2; reasons.push('대운재성'); }
    if (gKey === '여' && dwSS === '관성') { score += 2; reasons.push('대운관성'); }
    if (score >= 2) {
      var label = '';
      if (score >= 6) label = '★★★ — 결혼/중대한 인연의 해';
      else if (score >= 4) label = '★★ — 새 인연 가능성 높은 해';
      else label = '★ — 이성 관심 증가';
      lines.push('  ' + se.y + '년(' + reasons.join(', ') + ') ' + label);
      found++;
    }
  }
  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑰ 도화살/역마살/화개살 심화
// ======================================================================

var SJ_DOHWA_GUNGWI = [
  '태어날 때부터 인기쟁이. 어릴 때부터 이성에게 관심받음',
  '직장/사회에서 매력 발산. 서비스업·연예계 적성',
  '배우자가 매력적. 본인도 이성 매력 강함. 외도 주의',
  '말년에 이성 인연 활발. 나이 들어도 매력적'
];
var SJ_YEOKMA_GUNGWI = [
  '어린 시절 이사 잦음. 타향에서 성공하는 구조',
  '직업이 이동성. 출장/무역/운송/여행업 적성',
  '배우자와 먼 곳에서 만남. 또는 배우자가 바쁜 사람',
  '말년에 여행/이동 많음. 한 곳에 정착 어려움'
];
var SJ_HWAGAE_GUNGWI = [
  '집안에 종교/예술 배경. 영적 감수성 타고남',
  '직업이 예술/종교/학문 쪽. 고독한 전문가',
  '배우자가 예술적/철학적. 또는 고독한 결혼생활',
  '말년에 종교/명상/예술에 빠짐. 고독한 노년'
];

function SJ_analyzeSpecialSals(saju) {
  var r = saju.raw;
  var ilji = r.dj;
  var jis = [r.yj, r.mj, r.dj];
  if (r.hj != null) jis.push(r.hj);
  var gungNames = ['년지','월지','일지','시지'];
  var dohwa = SJ_getDohwa(ilji);
  var yeokma = SJ_getYeokma(ilji);
  var hwagae = SJ_getHwagae(ilji);
  var lines = ['★특수 신살 심화:'];
  var found = 0;
  var i, arr;

  arr = [];
  if (dohwa >= 0) { for (i = 0; i < jis.length; i++) { if (jis[i] === dohwa) arr.push(gungNames[i] + '(' + SJ_DOHWA_GUNGWI[i] + ')'); } }
  lines.push('  도화살: ' + (arr.length > 0 ? arr.join(' / ') : '해당 없음'));
  if (arr.length > 0) found++;

  arr = [];
  if (yeokma >= 0) { for (i = 0; i < jis.length; i++) { if (jis[i] === yeokma) arr.push(gungNames[i] + '(' + SJ_YEOKMA_GUNGWI[i] + ')'); } }
  lines.push('  역마살: ' + (arr.length > 0 ? arr.join(' / ') : '해당 없음'));
  if (arr.length > 0) found++;

  arr = [];
  if (hwagae >= 0) { for (i = 0; i < jis.length; i++) { if (jis[i] === hwagae) arr.push(gungNames[i] + '(' + SJ_HWAGAE_GUNGWI[i] + ')'); } }
  lines.push('  화개살: ' + (arr.length > 0 ? arr.join(' / ') : '해당 없음'));
  if (arr.length > 0) found++;

  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑱ 세운 월운 하이라이트
// ======================================================================

function SJ_buildMonthlyHighlight(saju, gg, osin) {
  if (!osin) return '';
  var r = saju.raw;
  var curYear = new Date().getFullYear();
  var yearGanIdx = (curYear - 4) % 10;
  var startGanMap = [2, 4, 6, 8, 0]; // 갑/기→병, 을/경→무, 병/신→경, 정/임→임, 무/계→갑
  var monthStartGan = startGanMap[yearGanIdx % 5];
  var lines = ['★월운 하이라이트 (' + curYear + '년):'];
  var found = 0;
  for (var m = 0; m < 12; m++) {
    var mGanIdx = (monthStartGan + m) % 10;
    var mJiIdx = (2 + m) % 12; // 1월=인(2)~12월=축(1)
    var mGanOh = OHAENG_TGAN[mGanIdx];
    var label = SJ_getOsinLabel(osin, mGanOh);
    var extra = [];
    if (SJ_isChung(mJiIdx, r.dj)) extra.push('일지충 주의');
    if (SJ_isYukhap(mJiIdx, r.dj)) extra.push('배우자궁합');
    if (SJ_isChung(mJiIdx, r.mj)) extra.push('직업변동 주의');
    var isGood = label.indexOf('용신') >= 0 || label.indexOf('희신') >= 0;
    var isBad = label.indexOf('기신') >= 0 || label.indexOf('구신') >= 0;
    if (isGood || isBad || extra.length > 0) {
      var mStr = (m + 1) + '월(' + TGAN_KR[mGanIdx] + JIJI_KR[mJiIdx] + ')';
      var goodBad = isGood ? (label.indexOf('용신') >= 0 ? ' 최고의 달' : ' 좋은 달') : (isBad ? ' 조심' : '');
      var extraStr = extra.length > 0 ? ' + ' + extra.join(', ') : '';
      lines.push('  ' + mStr + ' ' + mGanOh + '=' + label + goodBad + extraStr);
      found++;
    }
  }
  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ⑲ 신강/신약 체감 텍스트
// ======================================================================

function SJ_buildStrengthText(gg) {
  if (!gg || gg.selfStr == null || gg.otherStr == null) return '';
  var total = gg.selfStr + gg.otherStr;
  if (total === 0) return '';
  var ratio = gg.selfStr / total;
  var pct = Math.round(ratio * 100);
  var label, desc, rx;
  if (ratio > 0.70) {
    label = '극신강'; desc = '자기 에너지가 압도적. 왕처럼 밀어붙이는 스타일. 독재적 경향 주의';
    rx = '재성(재물활동)·관성(사회활동)으로 에너지를 빼줘야 균형';
  } else if (ratio > 0.55) {
    label = '신강'; desc = '자기 힘이 넘치는 구조. 리더십/독립심 강함. 양보와 협업이 과제';
    rx = '사회활동(관성)이나 재물활동(재성)으로 에너지 분출이 건강한 방향';
  } else if (ratio >= 0.45) {
    label = '중화'; desc = '음양 균형. 어디서든 적응하는 유연함. 단, 뚜렷한 강점이 없어 보일 수 있음';
    rx = '용신 오행을 키우는 게 돌파구';
  } else if (ratio >= 0.30) {
    label = '신약'; desc = '환경에 맞추는 능력이 뛰어남. 유연하지만 자기 색깔 지키기가 과제';
    rx = '공부(인성)로 자신감 보충, 동료(비겁)의 도움이 필요';
  } else {
    label = '극신약'; desc = '주변 환경에 압도당하기 쉬운 구조. 자기를 지키는 것 자체가 과제';
    rx = '인성(학습/멘토)과 비겁(동료/자기주장)이 생명줄';
  }
  var lines = ['★신강/신약 체감:'];
  lines.push('  ' + label + '(자기편 비율 ' + pct + '%) — ' + desc);
  lines.push('  처방: ' + rx);
  return lines.join('\n');
}


// ======================================================================
// ⑳ 합 트리거 예보
// ======================================================================

function SJ_findHapTrigger(saju, dw, osin) {
  if (!dw || !dw.seun || dw.seun.length === 0) return '';
  var r = saju.raw;
  var jis = [r.yj, r.mj, r.dj];
  if (r.hj != null) jis.push(r.hj);
  var samhap = [
    {name:'해묘미', jis:[11,3,7], oh:'목'},
    {name:'인오술', jis:[2,6,10], oh:'화'},
    {name:'사유축', jis:[5,9,1], oh:'금'},
    {name:'신자진', jis:[8,0,4], oh:'수'}
  ];
  var lines = ['★합 트리거 예보:'];
  var found = 0;
  for (var s = 0; s < samhap.length; s++) {
    var sh = samhap[s];
    var have = [];
    var missing = [];
    for (var j = 0; j < sh.jis.length; j++) {
      if (jis.indexOf(sh.jis[j]) >= 0) { have.push(JIJI_KR[sh.jis[j]]); }
      else { missing.push(sh.jis[j]); }
    }
    if (have.length === 2 && missing.length === 1) {
      var misJi = missing[0];
      var misName = JIJI_KR[misJi];
      lines.push('  사주에 ' + have.join('+') + ' 보유 → ' + misName + '이 오면 ' + sh.name + ' ' + sh.oh + '국 삼합 완성');
      found++;
      var cnt = Math.min(dw.seun.length, 5);
      for (var k = 0; k < cnt; k++) {
        var se = dw.seun[k];
        var seJiIdx = JIJI_KR.indexOf(se.ji);
        if (seJiIdx === misJi) {
          var oLabel = osin ? SJ_getOsinLabel(osin, sh.oh) : '';
          var oStr = oLabel ? ' = ' + oLabel : '';
          lines.push('  ' + se.y + '년(' + se.gan + se.ji + ') ' + misName + '이 옴! → ' + sh.oh + ' 에너지 폭발' + oStr);
        }
      }
    }
  }
  return found > 0 ? lines.join('\n') : '';
}


// ======================================================================
// ㉑ 납음 궁합 활용
// ======================================================================

var SJ_NAPEUM_TABLE = [
  {name:'해중금',oh:'금',desc:'바다 속 금'}, {name:'노중화',oh:'화',desc:'화로 속 불'},
  {name:'대림목',oh:'목',desc:'큰 숲 나무'}, {name:'노방토',oh:'토',desc:'길가의 흙'},
  {name:'검봉금',oh:'금',desc:'칼날의 금'}, {name:'산두화',oh:'화',desc:'산꼭대기 불'},
  {name:'간하수',oh:'수',desc:'계곡물'},     {name:'성두토',oh:'토',desc:'성벽의 흙'},
  {name:'백랍금',oh:'금',desc:'백랍의 금'}, {name:'양류목',oh:'목',desc:'버드나무'},
  {name:'천중수',oh:'수',desc:'샘물'},       {name:'옥상토',oh:'토',desc:'지붕의 흙'},
  {name:'벽력화',oh:'화',desc:'번개불'},     {name:'송백목',oh:'목',desc:'소나무'},
  {name:'장류수',oh:'수',desc:'긴 강물'},    {name:'사중금',oh:'금',desc:'모래 속 금'},
  {name:'산하화',oh:'화',desc:'산 아래 불'}, {name:'평지목',oh:'목',desc:'평야의 나무'},
  {name:'벽상토',oh:'토',desc:'벽의 흙'},    {name:'금박금',oh:'금',desc:'금박'},
  {name:'복등화',oh:'화',desc:'등불'},       {name:'천하수',oh:'수',desc:'은하수'},
  {name:'대역토',oh:'토',desc:'역참의 흙'}, {name:'차천금',oh:'금',desc:'비녀 금'},
  {name:'상자목',oh:'목',desc:'뽕나무'},     {name:'대계수',oh:'수',desc:'큰 시내'},
  {name:'사중토',oh:'토',desc:'모래 속 흙'}, {name:'천상화',oh:'화',desc:'하늘의 불'},
  {name:'석류목',oh:'목',desc:'석류나무'},   {name:'대해수',oh:'수',desc:'큰 바다'}
];

function SJ_getNapeum(ganIdx, jiIdx) {
  if (ganIdx % 2 !== jiIdx % 2) return null; // 홀짝 불일치=유효하지 않은 간지
  var n = (ganIdx * 36 + jiIdx * 25) % 60;
  return SJ_NAPEUM_TABLE[Math.floor(n / 2)] || null;
}

function SJ_buildNapeumGunghap(sajuA, sajuB) {
  if (!sajuA || !sajuB || !sajuA.raw || !sajuB.raw) return '';
  var nA = SJ_getNapeum(sajuA.raw.dg, sajuA.raw.dj);
  var nB = SJ_getNapeum(sajuB.raw.dg, sajuB.raw.dj);
  if (!nA || !nB) return '';
  var ohA = nA.oh, ohB = nB.oh;
  var sangMap = {'목':{s:'화',g:'토'},'화':{s:'토',g:'금'},'토':{s:'금',g:'수'},'금':{s:'수',g:'목'},'수':{s:'목',g:'화'}};
  var relation, comment;
  if (ohA === ohB) {
    relation = '동오행(비화)'; comment = '같은 기운. 편안하지만 변화가 적은 관계';
  } else if (sangMap[ohA] && sangMap[ohA].s === ohB) {
    relation = ohA + '생' + ohB; comment = nA.desc + '이(가) ' + nB.desc + '에게 에너지를 주는 관계';
  } else if (sangMap[ohB] && sangMap[ohB].s === ohA) {
    relation = ohB + '생' + ohA; comment = nB.desc + '이(가) ' + nA.desc + '에게 에너지를 주는 관계';
  } else if (sangMap[ohA] && sangMap[ohA].g === ohB) {
    relation = ohA + '극' + ohB; comment = nA.desc + '이(가) ' + nB.desc + '을(를) 압도하는 관계. 갈등 소지';
  } else if (sangMap[ohB] && sangMap[ohB].g === ohA) {
    relation = ohB + '극' + ohA; comment = nB.desc + '이(가) ' + nA.desc + '을(를) 압도하는 관계';
  } else {
    relation = '특수'; comment = '특이한 기운 조합';
  }
  var lines = ['★납음 궁합:'];
  lines.push('  A 일주 납음: ' + nA.name + '(' + nA.desc + ', ' + ohA + ')');
  lines.push('  B 일주 납음: ' + nB.name + '(' + nB.desc + ', ' + ohB + ')');
  lines.push('  관계: ' + relation + ' — ' + comment);
  return lines.join('\n');
}


// ======================================================================
// ㉒ 킬링 포인트 자동 생성
// ======================================================================

function SJ_generateKillingPoints(saju, gg, sjData) {
  if (!sjData) return '';
  var points = [];
  var r = saju.raw;

  // 1. 통변 모순: 식상생재 + 비겁탈재 동시
  if (sjData.tongbyeons) {
    var hasSSJR = false, hasBGTR = false;
    for (var t = 0; t < sjData.tongbyeons.length; t++) {
      if (sjData.tongbyeons[t].name === '식상생재') hasSSJR = true;
      if (sjData.tongbyeons[t].name === '비겁탈재') hasBGTR = true;
    }
    if (hasSSJR && hasBGTR) {
      points.push('재능 수익+재물 유출 동시 구조 → 독립 vs 협업 선택이 핵심');
    }
  }

  // [REMOVED for theory module] 음양×MBTI 반전 — 토론에서 발견해야 할 교차점

  // 3. 교운기 임박
  if (sjData.gyowoongiText && sjData.gyowoongiText.indexOf('지금!') >= 0) {
    points.push('대운 전환기 진입 → 방향 재설정 시점');
  }

  // 4. 12운성 반전: 일지 사/절/묘 + 배우자 정재/정관
  if (saju.uns && saju.uns[2]) {
    var iljiUns = saju.uns[2];
    if ((iljiUns === '사' || iljiUns === '절' || iljiUns === '묘') && saju.jiSS && saju.jiSS[2]) {
      var spSS = saju.jiSS[2].ss;
      if (spSS === '정재' || spSS === '정관') {
        points.push('배우자궁 약+배우자 에너지 길 → 늦되 깊은 인연 구조');
      }
    }
  }

  // 5. 5신 충돌: 세운 기신 + 대운 희신 (or 반대)
  if (sjData.osinText) {
    var oLines = sjData.osinText.split('\n');
    var dwLine = '', seLine = '';
    for (var ol = 0; ol < oLines.length; ol++) {
      if (oLines[ol].indexOf('대운') >= 0) dwLine = oLines[ol];
      if (oLines[ol].indexOf('세운') >= 0) seLine = oLines[ol];
    }
    if (seLine.indexOf('기신') >= 0 && dwLine.indexOf('희신') >= 0) {
      points.push('대운 길+세운 흉 → 올해 인내/큰 흐름 신뢰');
    } else if (seLine.indexOf('희신') >= 0 && dwLine.indexOf('기신') >= 0) {
      points.push('대운 흉+세운 길 → 올해가 윈도우/신속 실행');
    }
  }

  // 6. 공망 반전: 월지 공망 + 식상생재
  if (sjData.gongmangText && sjData.gongmangText.indexOf('월지') >= 0 && sjData.tongbyeons) {
    for (var t2 = 0; t2 < sjData.tongbyeons.length; t2++) {
      if (sjData.tongbyeons[t2].name === '식상생재') {
        points.push('월지 공망+재능 수익 구조 → 조직보다 독립형 수익이 유리');
        break;
      }
    }
  }

  // 7. 삼합 트리거 + 용신
  if (sjData.hapTriggerText) {
    var curY = new Date().getFullYear();
    if (sjData.hapTriggerText.indexOf(curY + '년') >= 0 && sjData.hapTriggerText.indexOf('용신') >= 0) {
      points.push('삼합 트리거+용신 활성 → 올해 에너지 폭발 타이밍');
    }
  }

  // 8. 도화+건록 조합
  if (saju.uns && saju.uns[2] === '건록') {
    var dohwa8 = SJ_getDohwa(r.dj);
    if (dohwa8 >= 0 && r.dj === dohwa8) {
      points.push('이성 흡인력+자기 주도 에너지 공존 → 독립적 매력');
    }
  }

  // 9. 건강 경고: 부족오행이 기신/구신
  if (saju.lackFull && saju.lackFull.length > 0 && sjData.osin) {
    for (var l = 0; l < saju.lackFull.length; l++) {
      var lackOh = saju.lackFull[l];
      var olbl = SJ_getOsinLabel(sjData.osin, lackOh);
      if (olbl.indexOf('기신') >= 0 || olbl.indexOf('구신') >= 0) {
        var hd = SJ_HEALTH_OH[lackOh];
        if (hd) {
          points.push(hd.organ + ' 건강 리스크/부족오행이 흉신 → 예방 집중');
          break;
        }
      }
    }
  }

  // 10. 연애 타이밍 집중: ★★★
  if (sjData.loveTimingText && sjData.loveTimingText.indexOf('★★★') >= 0) {
    points.push('연애·결혼 에너지 최고조 구간 진입');
  }

  if (points.length > 5) points = points.slice(0, 5);
  if (points.length === 0) return '';
  var lines = ['킬링 포인트 참고:'];
  for (var p = 0; p < points.length; p++) {
    lines.push('  ' + (p + 1) + '. ' + points[p]);
  }
  return lines.join('\n');
}


// ======================================================================
// ㉓ 재물운 타이밍
// ======================================================================

function SJ_findMoneyTiming(saju, gg, dw, osin) {
  if (!saju || !dw || !dw.seun || dw.seun.length === 0) return '';
  var r = saju.raw;
  // 일간 오행 → 재성 오행 (내가 극하는 오행)
  var OI = [0,0,1,1,2,2,3,3,4,4], ON = ['목','화','토','금','수'];
  var GEUK_MAP = {'목':'토','화':'금','토':'수','금':'목','수':'화'};
  var myOh = ON[OI[r.dg]];
  var jaeOh = GEUK_MAP[myOh];

  // 통변에서 식상생재 여부
  var hasSSGJ = false;
  if (gg && gg.cnt) {
    hasSSGJ = (gg.cnt['식상'] >= 1.5 && gg.cnt['재성'] >= 1.5);
  }

  // 현재 대운 십성
  var curDWSS = '';
  if (dw.currentDWIdx >= 0 && dw.daewoons && dw.daewoons[dw.currentDWIdx]) {
    curDWSS = dw.daewoons[dw.currentDWIdx].ss || '';
  }
  var dwIsJae = (curDWSS === '편재' || curDWSS === '정재');

  var years = [];
  var limit = Math.min(dw.seun.length, 5);
  for (var i = 0; i < limit; i++) {
    var se = dw.seun[i];
    if (!se) continue;
    var pts = 0;
    var tags = [];

    // 조건 1: 세운 천간 십성이 재성
    var seGanIdx = ((se.y - 4) % 10 + 10) % 10;
    var seJiIdx = ((se.y - 4) % 12 + 12) % 12;
    var seSS = (typeof getSipsung === 'function') ? getSipsung(r.dg, seGanIdx) : (se.ss || '');
    if (seSS === '편재' || seSS === '정재') {
      pts += 3;
      tags.push(seSS + '운');
    }

    // 조건 2: 세운 지지 오행이 재성 오행
    var seJiOh = OHAENG_JIJI[seJiIdx];
    if (seJiOh === jaeOh) {
      pts += 2;
      tags.push('재성지지');
    }

    // 조건 3: 대운 재성
    if (dwIsJae) {
      pts += 2;
      tags.push('대운재성');
    }

    // 조건 4: 식상생재 시너지
    if (hasSSGJ && (seSS === '편재' || seSS === '정재')) {
      pts += 3;
      tags.push('식상생재시너지');
    }

    // 조건 5: 용신/희신 세운
    if (osin) {
      var seGanOh = OHAENG_TGAN[seGanIdx];
      var osinLabel = SJ_getOsinLabel(osin, seGanOh);
      if (osinLabel.indexOf('용신') >= 0) { pts += 1; tags.push('용신'); }
      else if (osinLabel.indexOf('희신') >= 0) { pts += 1; tags.push('희신'); }
      // 조건 6: 기신/구신 감점
      else if (osinLabel.indexOf('기신') >= 0) { pts -= 2; tags.push('기신주의'); }
      else if (osinLabel.indexOf('구신') >= 0) { pts -= 2; tags.push('구신주의'); }
    }

    if (pts >= 2) {
      var grade, desc;
      if (pts >= 6) { grade = '★★★'; desc = '재물 대박의 해. 투자/사업 확장/이직 적기'; }
      else if (pts >= 4) { grade = '★★'; desc = '재물운 상승. 부업/투자 수익 가능성. 적극적으로'; }
      else { grade = '★'; desc = '소소한 재물 기회. 작은 행운. 과욕 금지'; }
      years.push('  ' + se.y + '년(' + tags.join('+') + ') ' + grade + ' — ' + desc);
    }
  }

  // 재물 성향 텍스트
  var styleText = '';
  if (gg && gg._ssArr) {
    var ssArr = gg._ssArr;
    var jj = (ssArr['정재'] || 0), pj = (ssArr['편재'] || 0);
    var hasJae = jj + pj > 0;
    if (hasSSGJ) styleText = '  재물성향: 재능→수익 전환형. 프리랜서·크리에이터 스타일';
    else if (gg.cnt && gg.cnt['비겁'] >= 2.0 && hasJae) styleText = '  재물성향: 돈은 버는데 나가는 것도 많음. 절약·단독행동이 답';
    else if (jj > pj && hasJae) styleText = '  재물성향: 꾸준한 월급/안정 수입형. 직장인·공무원 스타일';
    else if (pj > jj && hasJae) styleText = '  재물성향: 한방/투자/사업형. 큰 돈을 노리는 스타일';
    else if (!hasJae) styleText = '  재물성향: 돈에 관심 적거나 가치 추구형. 전문직으로 우회';
  }

  if (years.length === 0 && !styleText) return '';
  var lines = ['★재물운 타이밍 (향후 5년):'];
  for (var y = 0; y < years.length; y++) lines.push(years[y]);
  if (styleText) lines.push(styleText);
  return lines.join('\n');
}


// ======================================================================
// ㉔ 택일 가이드
// ======================================================================

function SJ_buildTaekil(saju, gg, osin) {
  if (!saju || !saju.raw) return '';
  var r = saju.raw;
  var curYear = new Date().getFullYear();
  // 년간 인덱스로 1월(인월) 천간 결정
  var yearGanIdx = ((curYear - 4) % 10 + 10) % 10;
  var baseMonthGan = (yearGanIdx % 5) * 2 + 2; // 1월 인월 천간

  var OI = [0,0,1,1,2,2,3,3,4,4], ON = ['목','화','토','금','수'];
  var GEUK_MAP = {'목':'토','화':'금','토':'수','금':'목','수':'화'};
  var myOh = ON[OI[r.dg]];
  var jaeOh = GEUK_MAP[myOh];

  // 성별 판단 (ST 전역)
  var genderStr = (typeof ST !== 'undefined' && ST.gender) ? ST.gender : '';
  var isMale = (genderStr === '남성' || genderStr === '남');

  var months = [];
  for (var mi = 0; mi < 12; mi++) {
    var mGanIdx = (baseMonthGan + mi) % 10;
    var mJiIdx = (mi + 2) % 12; // 1월=인(2), 2월=묘(3), ...
    var mSS = (typeof getSipsung === 'function') ? getSipsung(r.dg, mGanIdx) : '';
    var mGanOh = OHAENG_TGAN[mGanIdx];
    var mJiOh = OHAENG_JIJI[mJiIdx];

    // 5신 판별
    var osinTag = '';
    if (osin) {
      var oLabel = SJ_getOsinLabel(osin, mGanOh);
      if (oLabel.indexOf('용신') >= 0) osinTag = '용신';
      else if (oLabel.indexOf('희신') >= 0) osinTag = '희신';
      else if (oLabel.indexOf('기신') >= 0) osinTag = '기신';
      else if (oLabel.indexOf('구신') >= 0) osinTag = '구신';
    }

    // 충/합 판별
    var isChungDJ = SJ_isChung(mJiIdx, r.dj);
    var isYukhapDJ = SJ_isYukhap(mJiIdx, r.dj);
    var isChungYJ = SJ_isChung(mJiIdx, r.yj);
    var isDohwa = (SJ_getDohwa(r.dj) === mJiIdx);
    var isYeokma = (SJ_getYeokma(r.dj) === mJiIdx);
    var isHwagae = (SJ_getHwagae(r.dj) === mJiIdx);

    // 결혼 점수
    var wedding = 0;
    var wTags = [];
    if (isMale && (mSS === '정재' || mSS === '편재')) { wedding += 3; wTags.push('배우자성'); }
    if (!isMale && (mSS === '정관' || mSS === '편관')) { wedding += 3; wTags.push('배우자성'); }
    if (isYukhapDJ) { wedding += 4; wTags.push('육합'); }
    if (isDohwa) { wedding += 2; wTags.push('도화'); }
    if (osinTag === '용신' || osinTag === '희신') { wedding += 1; wTags.push(osinTag); }
    if (isChungDJ) { wedding -= 5; wTags.push('일지충'); }

    // 이사 점수
    var moving = 0;
    var mvTags = [];
    if (isYeokma) { moving += 3; mvTags.push('역마'); }
    if (osinTag === '용신' || osinTag === '희신') { moving += 2; mvTags.push(osinTag); }
    if (isYukhapDJ) { moving += 2; mvTags.push('합'); }
    if (isChungYJ) { moving -= 3; mvTags.push('년지충'); }

    // 개업 점수
    var biz = 0;
    var bzTags = [];
    if (mSS === '편재' || mSS === '정재') { biz += 3; bzTags.push('재성'); }
    if (osinTag === '용신' || osinTag === '희신') { biz += 2; bzTags.push(osinTag); }
    if (mJiOh === jaeOh) { biz += 2; bzTags.push('재성지지'); }
    if (osinTag === '기신' || osinTag === '구신') { biz -= 3; bzTags.push(osinTag); }

    // 시험 점수
    var exam = 0;
    var exTags = [];
    if (mSS === '편인' || mSS === '정인') { exam += 3; exTags.push('인성'); }
    if (osinTag === '용신' || osinTag === '희신') { exam += 2; exTags.push(osinTag); }
    if (isHwagae) { exam += 1; exTags.push('화개'); }
    if (mSS === '식신' || mSS === '상관') { exam -= 1; exTags.push('식상분산'); }

    // 위험 달 판별
    var isDanger = isChungDJ && (osinTag === '기신' || osinTag === '구신');

    months.push({
      month: mi + 1,
      ganJi: TGAN_KR[mGanIdx] + JIJI_KR[mJiIdx],
      wedding: wedding, wTags: wTags,
      moving: moving, mvTags: mvTags,
      biz: biz, bzTags: bzTags,
      exam: exam, exTags: exTags,
      isDanger: isDanger,
      dangerTags: isDanger ? [osinTag, '일지충'] : []
    });
  }

  // 각 목적별 상위 2~3개월
  function topN(arr, key, tKey, n) {
    var sorted = arr.slice().sort(function(a, b) { return b[key] - a[key]; });
    var res = [];
    for (var i = 0; i < sorted.length && res.length < n; i++) {
      if (sorted[i][key] >= 2) {
        res.push(sorted[i].month + '월(' + sorted[i].ganJi + ', ' + sorted[i][tKey].join('+') + ')');
      }
    }
    return res;
  }

  var wTop = topN(months, 'wedding', 'wTags', 3);
  var mTop = topN(months, 'moving', 'mvTags', 3);
  var bTop = topN(months, 'biz', 'bzTags', 3);
  var eTop = topN(months, 'exam', 'exTags', 3);

  // 위험 달
  var dangers = [];
  for (var d = 0; d < months.length; d++) {
    if (months[d].isDanger) dangers.push(months[d].month + '월(' + months[d].ganJi + ', ' + months[d].dangerTags.join('+') + ')');
  }

  if (wTop.length === 0 && mTop.length === 0 && bTop.length === 0 && eTop.length === 0) return '';
  var lines = ['★택일 가이드 (' + curYear + '년):'];
  if (wTop.length > 0) lines.push('  💍 결혼 적기: ' + wTop.join(', '));
  if (mTop.length > 0) lines.push('  🏠 이사 적기: ' + mTop.join(', '));
  if (bTop.length > 0) lines.push('  💰 개업 적기: ' + bTop.join(', '));
  if (eTop.length > 0) lines.push('  📚 시험 적기: ' + eTop.join(', '));
  if (dangers.length > 0) lines.push('  ⛔ 피해야 할 달: ' + dangers.join(', '));
  return lines.join('\n');
}


// ======================================================================
// ㉕ 인생 로드맵
// ======================================================================

function SJ_buildLifeRoadmap(dw, saju, gg, gender) {
  if (!dw || !dw.daewoons || dw.daewoons.length === 0) return '';
  var r = saju ? saju.raw : null;

  // 5신 계산
  var osin = null;
  if (gg) {
    var yoh = SJ_extractYongshinOh(gg.yongshin || '');
    if (yoh) osin = SJ_calcOsinChegye(yoh);
  }

  // 십성별 시기 해석
  var SS_PERIOD = {
    '비견': '독립기. 자기 힘으로 개척. 경쟁이 많지만 성장도 빠름',
    '겁재': '경쟁기. 라이벌 출현. 승부사 기질 발동. 도박/모험 주의',
    '식신': '표현기. 재능 발현. 먹고 즐기는 여유. 건강 좋음',
    '상관': '반항기/창의기. 기존 틀을 깨뜨림. 파격적 행보. 구설수 주의',
    '편재': '도전기. 큰 돈/사업/투자. 리스크와 기회 공존',
    '정재': '안정기. 꾸준한 수입. 결혼/가정',
    '편관': '시련기. 직장 압박/사회적 도전. 하지만 성장통',
    '정관': '인정기. 사회적 지위 상승. 명예',
    '편인': '전환기. 특수 학문/영적 관심. 새로운 관점',
    '정인': '학습기. 공부/자격증/멘토. 안정과 보호'
  };

  // 성별별 육친 인연 추가
  var SS_REL_MALE = {
    '편재': '아버지 인연', '정재': '아내 인연', '편관': '아들 인연', '정관': '딸 인연', '정인': '어머니 인연', '편인': '의모 인연'
  };
  var SS_REL_FEMALE = {
    '편재': '시모 인연', '정재': '아버지 인연', '편관': '애인 인연', '정관': '남편 인연', '상관': '아들 인연', '식신': '딸 인연', '정인': '어머니 인연', '편인': '의모 인연'
  };
  var isMale = (gender === '남성' || gender === '남' || gender === 'male');
  var relMap = isMale ? SS_REL_MALE : SS_REL_FEMALE;

  // 5신 태그
  var OSIN_TAG = {
    '용신': '[최길🔥]',
    '희신': '[길✅]',
    '한신': '[보통➖]',
    '구신': '[주의⚠️]',
    '기신': '[흉🚫]'
  };

  var lines = ['★인생 로드맵:'];
  for (var i = 0; i < dw.daewoons.length; i++) {
    var d = dw.daewoons[i];
    var ss = d.ss || '';
    var desc = SS_PERIOD[ss] || ss;
    var relExtra = relMap[ss] ? '. ' + relMap[ss] : '';

    // 5신 태그
    var tag = '';
    if (osin && d.gan) {
      var dGanIdx = TGAN_KR.indexOf(d.gan);
      if (dGanIdx >= 0) {
        var dOh = OHAENG_TGAN[dGanIdx];
        var oLabel = SJ_getOsinLabel(osin, dOh);
        for (var k in OSIN_TAG) {
          if (OSIN_TAG.hasOwnProperty(k) && oLabel.indexOf(k) >= 0) { tag = ' ' + OSIN_TAG[k]; break; }
        }
      }
    }

    var cur = (i === dw.currentDWIdx) ? ' ★현재' : '';
    var ageRange = d.startAge + '~' + d.endAge + '세';
    lines.push('  ' + ageRange + '  ' + d.gan + d.ji + '(' + ss + '운)' + tag + ' — ' + desc + relExtra + cur);
  }
  return lines.join('\n');
}


// ======================================================================
// ㉖ 자녀운 분석
// ======================================================================

function SJ_buildChildAnalysis(saju, gg, gender) {
  if (!saju || !saju.raw) return '';
  var r = saju.raw;
  var isMale = (gender === '남성' || gender === '남' || gender === 'male');

  // 시간 십성
  var hgSS = '';
  if (r.hg != null && typeof getSipsung === 'function') {
    hgSS = getSipsung(r.dg, r.hg);
  }

  // 십성별 자녀 성격
  var CHILD_SS = {
    '비견': '자녀가 독립적. 부모와 대등한 관계. 자기주장 강함',
    '겁재': '자녀가 경쟁적. 형제간 라이벌 구도. 활발하지만 충돌도',
    '식신': '자녀가 순한 편. 재능 있고 먹는 거 좋아함. 건강함',
    '상관': '자녀가 반항적이지만 창의적. 틀에 안 맞는 아이. 재능 특출',
    '편재': '자녀가 돈에 밝음. 사업 감각. 일찍부터 경제관념',
    '정재': '자녀가 안정적이고 성실. 꾸준한 노력파',
    '편관': '자녀가 규율적. 리더십 있지만 반항기 강할 수 있음',
    '정관': '자녀가 모범적. 사회성 좋고 예의 바름',
    '편인': '자녀가 독특한 관심사. 특수 분야 재능. 영재 가능성',
    '정인': '자녀가 학문적. 공부 잘함. 효자/효녀 타입'
  };

  var lines = ['★자녀운 분석:'];

  // 1. 시간 십성 → 자녀 성격
  if (hgSS && CHILD_SS[hgSS]) {
    lines.push('  시간 = ' + hgSS + ' → ' + CHILD_SS[hgSS]);
  } else if (r.hg == null) {
    lines.push('  시간 미입력 — 자녀운 분석 제한적');
  }

  // 2. 시지 12운성 → 자녀 인연
  if (r.hj != null) {
    // 12운성 계산: engine.js의 calcUnsung이 있으면 사용, 없으면 SJ_UNSUNG_MEANING 키 매칭
    var unsNames = ['장생','목욕','관대','건록','제왕','쇠','병','사','묘','절','태','양'];
    // 12운성 시작 인덱스 (일간 오행별): 甲→亥, 乙→午, 丙→寅, 丁→酉, ...
    var UNS_START = [11,6,2,9,2,9,5,0,8,3]; // 갑을병정무기경신임계
    var unsIdx = ((r.hj - UNS_START[r.dg]) % 12 + 12) % 12;
    var unsName = unsNames[unsIdx];
    var unsMeaning = SJ_UNSUNG_MEANING[unsName];
    if (unsMeaning && unsMeaning.child) {
      lines.push('  시지 12운성 = ' + unsName + ' → ' + unsMeaning.child);
    }
  }

  // 3. 시지 특수 신살
  if (r.hj != null) {
    if (SJ_getDohwa(r.dj) === r.hj) lines.push('  시지 신살: 도화 → 자녀가 매력적. 인기 많은 아이');
    if (SJ_getYeokma(r.dj) === r.hj) lines.push('  시지 신살: 역마 → 자녀가 활동적. 유학/해외 가능성');
    if (SJ_getHwagae(r.dj) === r.hj) lines.push('  시지 신살: 화개 → 자녀가 예술적/철학적. 종교/명상 관심');
    // 공망 확인
    if (typeof calcGongmang === 'function') {
      try {
        var gm = calcGongmang(r.dg, r.dj);
        if (gm && gm.indexOf(r.hj) >= 0) lines.push('  시지 신살: 공망 → 자녀 인연이 늦거나 특이한 형태. 채우면 오히려 더 강해짐');
      } catch (e) {}
    }
  }

  // 4. 자녀 성별 경향
  if (hgSS) {
    var genderHint = '';
    if (isMale) {
      if (hgSS === '편관') genderHint = '아들 경향 (편관=아들, 참고용)';
      else if (hgSS === '정관') genderHint = '딸 경향 (정관=딸, 참고용)';
    } else {
      if (hgSS === '상관') genderHint = '아들 경향 (상관=아들, 참고용)';
      else if (hgSS === '식신') genderHint = '딸 경향 (식신=딸, 참고용)';
    }
    if (genderHint) lines.push('  자녀 성향: ' + genderHint);
  }

  // 5. 식상 수로 자녀 시기 힌트
  if (gg && gg._ssArr) {
    var ssArr = gg._ssArr;
    var sikCnt = (ssArr['식신'] || 0) + (ssArr['상관'] || 0);
    if (sikCnt >= 3) lines.push('  자녀 시기: 식상 ' + sikCnt + '개 → 자녀 복 좋음. 자녀 인연 빠를 가능성');
    else if (sikCnt >= 1) lines.push('  자녀 시기: 식상 ' + sikCnt + '개 → 자녀 인연 보통');
    else lines.push('  자녀 시기: 식상 없음 → 자녀 인연이 늦을 수 있음 (대운에서 보충 가능)');
  }

  return lines.length <= 1 ? '' : lines.join('\n');
}


// ======================================================================
// ㉗ 부부 시너지 리포트 (gunghap.js용)
// ======================================================================

function SJ_buildCoupleSynergy(sajuA, ggA, sajuB, ggB) {
  if (!sajuA || !sajuB || !ggA || !ggB) return '';
  var lines = ['★부부 시너지 리포트:'];

  // 1. 교차 통변 시너지
  var cntA = ggA.cnt || {}, cntB = ggB.cnt || {};
  var merged = {};
  var groups = ['비겁','식상','재성','관성','인성'];
  for (var gi = 0; gi < groups.length; gi++) {
    merged[groups[gi]] = ((cntA[groups[gi]] || 0) + (cntB[groups[gi]] || 0)) / 2;
  }

  var synergies = [];
  if (merged['식상'] >= 1.5 && merged['재성'] >= 1.5)
    synergies.push({name:'합산 식상생재', desc:'둘이 같이 콘텐츠/교육 사업하면 시너지', act:'공동 창작, 유튜브, 부부 가게, 요리/여행 블로그'});
  if (merged['관성'] >= 1.5 && merged['인성'] >= 1.5)
    synergies.push({name:'합산 살인상생', desc:'둘이 같이 공부/연구하면 시너지', act:'함께 공부, 독서 모임, 자격증 도전, 세미나'});
  if (merged['재성'] >= 1.5 && merged['관성'] >= 1.5)
    synergies.push({name:'합산 재관쌍미', desc:'둘이 같이 사업하면 돈+명예 동시', act:'부부 공동 사업, 투자, 부동산'});
  if (merged['인성'] >= 1.5 && merged['비겁'] >= 1.5)
    synergies.push({name:'합산 인수생비', desc:'서로에게 배우는 관계. 함께 성장', act:'명상, 종교활동, 문화생활, 전시회'});
  if (merged['비겁'] >= 2.0 && merged['재성'] >= 1.0)
    synergies.push({name:'합산 비겁탈재', desc:'돈 관리 따로 해야. 공동 재산 주의', act:'운동, 등산, 경쟁적 취미 (보드게임, 스포츠)'});

  if (synergies.length > 0) {
    lines.push('  교차 통변: ' + synergies[0].name + ' → ' + synergies[0].desc);
  }

  // 2. 부족오행 보완
  var OH_EFFECT = {
    '목': '성장, 계획력, 인내심, 새로운 시작의 에너지',
    '화': '열정, 활력, 결단력, 표현력, 사교성',
    '토': '안정감, 중재력, 신뢰, 포용력',
    '금': '결단력, 실행력, 마무리 능력, 원칙',
    '수': '지혜, 유연성, 소통능력, 적응력'
  };
  var lackA = sajuA.lackFull || [];
  var lackB = sajuB.lackFull || [];
  var ohB = sajuB.elFull || sajuB.el || {};
  var ohA = sajuA.elFull || sajuA.el || {};
  var bowanLines = [];
  for (var li = 0; li < lackA.length; li++) {
    if (ohB[lackA[li]] && ohB[lackA[li]] >= 2) {
      bowanLines.push('B가 A의 부족한 ' + lackA[li] + '(' + (OH_EFFECT[lackA[li]] || '') + ')를 채워줌');
    }
  }
  for (var lj = 0; lj < lackB.length; lj++) {
    if (ohA[lackB[lj]] && ohA[lackB[lj]] >= 2) {
      bowanLines.push('A가 B의 부족한 ' + lackB[lj] + '(' + (OH_EFFECT[lackB[lj]] || '') + ')를 채워줌');
    }
  }
  if (bowanLines.length > 0) {
    lines.push('  오행 보완: ' + bowanLines[0]);
    for (var bi = 1; bi < bowanLines.length; bi++) {
      lines.push('             ' + bowanLines[bi]);
    }
  }

  // 3. 음양 궁합
  var yyA = SJ_calcYinYang(sajuA);
  var yyB = SJ_calcYinYang(sajuB);
  if (yyA && yyB) {
    var aRatio = yyA.yang / ((yyA.yang + yyA.yin) || 1);
    var bRatio = yyB.yang / ((yyB.yang + yyB.yin) || 1);
    var yyDesc = '';
    if (aRatio >= 0.7 && bRatio >= 0.7) yyDesc = '둘 다 극양 → 불꽃 커플. 열정적이지만 충돌도 격렬. 양보가 과제';
    else if (aRatio <= 0.3 && bRatio <= 0.3) yyDesc = '둘 다 극음 → 고요한 커플. 깊은 이해. 하지만 추진력 부족';
    else if ((aRatio >= 0.7 && bRatio <= 0.3) || (aRatio <= 0.3 && bRatio >= 0.7)) yyDesc = '극양+극음 → 끌림이 강한 조합. 서로 없는 것을 채워줌. 이상적이지만 소통이 과제';
    else if (aRatio >= 0.4 && aRatio <= 0.6 && bRatio >= 0.4 && bRatio <= 0.6) yyDesc = '둘 다 균형 → 안정적인 커플. 큰 파도 없이 잔잔한 관계';
    else yyDesc = '양우세+음우세 → 자연스러운 균형. 한쪽이 이끌고 한쪽이 받쳐주는 구조';
    lines.push('  음양 궁합: ' + yyDesc);
  }

  // 4. 함께하면 좋은 활동
  if (synergies.length > 0) {
    var acts = [];
    for (var si = 0; si < synergies.length; si++) {
      if (synergies[si].act) acts.push(synergies[si].act);
    }
    if (acts.length > 0) lines.push('  추천 활동: ' + acts[0]);
  }

  return lines.length <= 1 ? '' : lines.join('\n');
}


// [REMOVED for theory module] SJ_enrichSajuData — 프롬프트 주입용 카테고리 분류 로직. 배포 코드.
// [REMOVED for theory module] SJ_injectIntoPrompt — 프롬프트에 텍스트를 끼워넣는 배포 배관.
// [REMOVED for theory module] streamSonnet/runSajuAnalysis 런타임 오버라이드 — 배포 코드.


// ======================================================================
// window 전역 등록
// ======================================================================

// [REMOVED] window.SJ_enrichSajuData — 배포 코드
window.SJ_calcOsinChegye       = SJ_calcOsinChegye;
window.SJ_extractYongshinOh    = SJ_extractYongshinOh;
window.SJ_getOsinLabel         = SJ_getOsinLabel;
window.SJ_detectTongbyeon      = SJ_detectTongbyeon;
window.SJ_detectCrossTongbyeon = SJ_detectCrossTongbyeon;
window.SJ_calcYinYang          = SJ_calcYinYang;
window.SJ_YUKCHIN_MAP          = SJ_YUKCHIN_MAP;
window.SJ_HEALTH_OH            = SJ_HEALTH_OH;
window.SJ_GAEUN                = SJ_GAEUN;
window.SJ_getImpactTag         = SJ_getImpactTag;
window.SJ_buildGaeunText       = SJ_buildGaeunText;
window.SJ_checkSamhyung        = SJ_checkSamhyung;
window.SJ_IMPACT_SCORE         = SJ_IMPACT_SCORE;
window.SJ_UNSUNG_MEANING       = SJ_UNSUNG_MEANING;
window.SJ_buildOsinText        = SJ_buildOsinText;
window.SJ_buildYukchinText     = SJ_buildYukchinText;
window.SJ_buildUnsungGungwiText= SJ_buildUnsungGungwiText;
window.SJ_buildTongbyeonText   = SJ_buildTongbyeonText;
window.SJ_buildGongmangText    = SJ_buildGongmangText;
window.SJ_buildYinYangText     = SJ_buildYinYangText;
window.SJ_findGyowoongi        = SJ_findGyowoongi;
window.SJ_buildHyungText       = SJ_buildHyungText;
window.SJ_buildHealthText      = SJ_buildHealthText;
window.SJ_checkTuchul          = SJ_checkTuchul;
window.SJ_getWolryulText       = SJ_getWolryulText;
// [REMOVED] window.SJ_injectIntoPrompt — 배포 코드
window.SJ_findLoveTiming       = SJ_findLoveTiming;
window.SJ_analyzeSpecialSals   = SJ_analyzeSpecialSals;
window.SJ_buildMonthlyHighlight= SJ_buildMonthlyHighlight;
window.SJ_buildNapeumGunghap   = SJ_buildNapeumGunghap;
window.SJ_NAPEUM_TABLE         = SJ_NAPEUM_TABLE;
window.SJ_isYukhap             = SJ_isYukhap;
window.SJ_getDohwa             = SJ_getDohwa;
window.SJ_getYeokma            = SJ_getYeokma;
window.SJ_getHwagae            = SJ_getHwagae;
window.SJ_buildJobText         = SJ_buildJobText;
window.SJ_buildStrengthText    = SJ_buildStrengthText;
window.SJ_findHapTrigger       = SJ_findHapTrigger;
window.SJ_generateKillingPoints= SJ_generateKillingPoints;
window.SJ_getNapeum            = SJ_getNapeum;
window.SJ_findMoneyTiming      = SJ_findMoneyTiming;
window.SJ_buildTaekil          = SJ_buildTaekil;
window.SJ_buildLifeRoadmap     = SJ_buildLifeRoadmap;
window.SJ_buildChildAnalysis   = SJ_buildChildAnalysis;
window.SJ_buildCoupleSynergy   = SJ_buildCoupleSynergy;
// [REMOVED] window.SJ_stripTerms — UI용 코드
window.SJ_TERM_MAP             = SJ_TERM_MAP;

function SJ_calcWolun(saju) {
  if (!saju || !saju.raw) return null;
  var TGAN_KR = ['갑','을','병','정','무','기','경','신','임','계'];
  var JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var JIJANGGAN_JEONGGI = [9,5,0,1,4,2,3,5,6,7,4,8];
  var SS_NAMES = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
  var ssGroupMap = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상','편재':'재성','정재':'재성','편관':'관성','정관':'관성','편인':'인성','정인':'인성'};
  var wolunHintMap = {
    '비겁':'자기에너지강화, 독립·경쟁의달',
    '식상':'표현·창작의달, 새아이디어',
    '재성':'재물·실리의달, 수입기회',
    '관성':'책임·압박의달, 직장변화',
    '인성':'학습·휴식의달, 귀인등장'
  };
  var CHUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var YUKHAP = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var monthNames = ['1월(인월)','2월(묘월)','3월(진월)','4월(사월)','5월(오월)','6월(미월)','7월(신월)','8월(유월)','9월(술월)','10월(해월)','11월(자월)','12월(축월)'];
  var monthBranches = [2,3,4,5,6,7,8,9,10,11,0,1];
  var gungwiMap = {'년지':'외부환경','월지':'직업','일지':'배우자·건강','시지':'자녀'};
  function getSS(dg, tg) { return SS_NAMES[((tg - dg) % 10 + 10) % 10] || ''; }
  var currentYear = new Date().getFullYear();
  var yearGan = ((currentYear + 6) % 10);
  var monthStartStem = ((yearGan % 5) * 2 + 2) % 10;
  var dg = saju.raw.dg;
  var wonJi = [{v:saju.raw.yj,l:'년지'},{v:saju.raw.mj,l:'월지'},{v:saju.raw.dj,l:'일지'}];
  if (saju.raw.hj != null) wonJi.push({v:saju.raw.hj,l:'시지'});
  var arr = [];
  for (var i = 0; i < 12; i++) {
    var wGan = (monthStartStem + i) % 10;
    var wJi = monthBranches[i];
    var ganSS = getSS(dg, wGan);
    var jiSS = getSS(dg, JIJANGGAN_JEONGGI[wJi]);
    var group = ssGroupMap[ganSS] || ganSS;
    var rels = [];
    for (var j = 0; j < wonJi.length; j++) {
      for (var c = 0; c < CHUNG.length; c++) {
        if ((wJi === CHUNG[c][0] && wonJi[j].v === CHUNG[c][1]) || (wJi === CHUNG[c][1] && wonJi[j].v === CHUNG[c][0]))
          rels.push(JIJI_KR[wJi] + JIJI_KR[wonJi[j].v] + '충(' + gungwiMap[wonJi[j].l] + ')');
      }
      for (var h = 0; h < YUKHAP.length; h++) {
        if ((wJi === YUKHAP[h][0] && wonJi[j].v === YUKHAP[h][1]) || (wJi === YUKHAP[h][1] && wonJi[j].v === YUKHAP[h][0]))
          rels.push(JIJI_KR[wJi] + JIJI_KR[wonJi[j].v] + '합(' + gungwiMap[wonJi[j].l] + ')');
      }
    }
    arr.push({ month: monthNames[i], gan: TGAN_KR[wGan], ji: JIJI_KR[wJi], ganSS: ganSS, jiSS: jiSS, group: group, hint: wolunHintMap[group] || '', relations: rels });
  }
  return { year: currentYear, months: arr };
}
window.SJ_calcWolun = SJ_calcWolun;

// ── 원국 지지 간 충/합/해 전체 관계 분석 ──
function SJ_buildWonkukRelations(saju) {
  if (!saju || !saju.raw) return '';
  var r = saju.raw;
  var JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var pillars = [{v:r.yj,l:'년지'},{v:r.mj,l:'월지'},{v:r.dj,l:'일지'}];
  if (r.hj != null) pillars.push({v:r.hj,l:'시지'});
  var gungwi = {'년지':'외부환경/조상','월지':'직업/부모','일지':'배우자/건강','시지':'자녀/말년'};

  var CHUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var YUKHAP = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var SAMHAP = [[2,6,10],[5,9,1],[8,0,4],[11,3,7]];
  var BANGHAP = [[2,3,4],[5,6,7],[8,9,10],[11,0,1]];
  var JIHAE = [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];

  var results = [];

  // 충
  for (var i = 0; i < pillars.length; i++) {
    for (var j = i + 1; j < pillars.length; j++) {
      for (var c = 0; c < CHUNG.length; c++) {
        if ((pillars[i].v === CHUNG[c][0] && pillars[j].v === CHUNG[c][1]) || (pillars[i].v === CHUNG[c][1] && pillars[j].v === CHUNG[c][0])) {
          results.push(pillars[i].l + JIJI_KR[pillars[i].v] + '↔' + pillars[j].l + JIJI_KR[pillars[j].v] + ' 충 (' + gungwi[pillars[i].l] + '↔' + gungwi[pillars[j].l] + ')');
        }
      }
    }
  }

  // 육합
  for (var i = 0; i < pillars.length; i++) {
    for (var j = i + 1; j < pillars.length; j++) {
      for (var h = 0; h < YUKHAP.length; h++) {
        if ((pillars[i].v === YUKHAP[h][0] && pillars[j].v === YUKHAP[h][1]) || (pillars[i].v === YUKHAP[h][1] && pillars[j].v === YUKHAP[h][0])) {
          results.push(pillars[i].l + JIJI_KR[pillars[i].v] + '↔' + pillars[j].l + JIJI_KR[pillars[j].v] + ' 육합 (' + gungwi[pillars[i].l] + '↔' + gungwi[pillars[j].l] + ')');
        }
      }
    }
  }

  // 삼합 (3개 이상 일치)
  var jiVals = pillars.map(function(p) { return p.v; });
  for (var s = 0; s < SAMHAP.length; s++) {
    var matched = [];
    for (var k = 0; k < SAMHAP[s].length; k++) {
      if (jiVals.indexOf(SAMHAP[s][k]) >= 0) matched.push(JIJI_KR[SAMHAP[s][k]]);
    }
    if (matched.length >= 2) {
      results.push('삼합 ' + matched.join('·') + (matched.length === 3 ? ' (완전삼합)' : ' (반삼합)'));
    }
  }

  // 방합
  for (var b = 0; b < BANGHAP.length; b++) {
    var bMatched = [];
    for (var k = 0; k < BANGHAP[b].length; k++) {
      if (jiVals.indexOf(BANGHAP[b][k]) >= 0) bMatched.push(JIJI_KR[BANGHAP[b][k]]);
    }
    if (bMatched.length >= 2) {
      results.push('방합 ' + bMatched.join('·') + (bMatched.length === 3 ? ' (완전방합)' : ' (반방합)'));
    }
  }

  // 지지해
  for (var i = 0; i < pillars.length; i++) {
    for (var j = i + 1; j < pillars.length; j++) {
      for (var d = 0; d < JIHAE.length; d++) {
        if ((pillars[i].v === JIHAE[d][0] && pillars[j].v === JIHAE[d][1]) || (pillars[i].v === JIHAE[d][1] && pillars[j].v === JIHAE[d][0])) {
          results.push(pillars[i].l + JIJI_KR[pillars[i].v] + '↔' + pillars[j].l + JIJI_KR[pillars[j].v] + ' 해 (' + gungwi[pillars[i].l] + '↔' + gungwi[pillars[j].l] + ')');
        }
      }
    }
  }

  if (results.length === 0) return '★원국 지지 관계: 특별한 충합형해 없음';
  return '★원국 지지 관계:\n  ' + results.join('\n  ');
}
window.SJ_buildWonkukRelations = SJ_buildWonkukRelations;

// ── 공망 상세 (빈 궁위 없어도 공망 지지 자체를 알려줌) ──
function SJ_buildGongmangFull(saju) {
  if (!saju || !saju.raw) return '';
  var JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var r = saju.raw, dg = r.dg, dj = r.dj;
  var idx60 = -1;
  for (var k = 0; k < 60; k++) { if (k % 10 === dg && k % 12 === dj) { idx60 = k; break; } }
  if (idx60 < 0) return '';
  var xunStart = Math.floor(idx60 / 10) * 10;
  var usedJi = [];
  for (var k2 = xunStart; k2 < xunStart + 10; k2++) usedJi.push(k2 % 12);
  var gmArr = [];
  for (var j = 0; j < 12; j++) { if (usedJi.indexOf(j) < 0) gmArr.push(j); }
  var gmNames = gmArr.map(function(g) { return JIJI_KR[g]; });

  var pillars = [{v:r.yj,l:'년지'},{v:r.mj,l:'월지'},{v:r.dj,l:'일지'}];
  if (r.hj != null) pillars.push({v:r.hj,l:'시지'});
  var gungwi = {'년지':'조상/어린시절','월지':'직업/사회','일지':'배우자/건강','시지':'자녀/말년'};

  var affected = [];
  for (var i = 0; i < pillars.length; i++) {
    if (pillars[i].v != null && gmArr.indexOf(pillars[i].v) >= 0) {
      affected.push(pillars[i].l + '(' + JIJI_KR[pillars[i].v] + ') → ' + gungwi[pillars[i].l] + ' 자리 공망');
    }
  }

  var lines = ['★공망: ' + gmNames.join('·') + '공망'];
  if (affected.length > 0) {
    lines.push('  해당 궁위: ' + affected.join(', '));
    lines.push('  → 해당 자리의 에너지가 비어있거나 늦게 채워지는 구조');
  } else {
    lines.push('  원국 지지에 공망이 걸리지 않음 (공망 영향 미미)');
  }
  return lines.join('\n');
}
window.SJ_buildGongmangFull = SJ_buildGongmangFull;

console.log('[saju.js] v4.0 로드 완료 — 경중 재분류 (격국5+맥락4+대운2+힌트6+원국1 = 18개 주입, 6개 gunghap전용)');

})();


// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║  PART 2: engine.js 기반 — 사주 계산 코어, 격국, 대운, 일주 데이터  ║
// ║  (3,238줄)                                                         ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

// ======================================================================
// saju-theory-part2.js — engine.js 기반 사주 이론 데이터
// 원본: engine.js → 순수 사주 계산/이론만 추출
// 제거: MBTI 데이터(TY/DM_AX/IN_OP/MI/getMBTI 등) + 프롬프트/UI/API 코드
// 유지: 사주 계산 엔진, 신살, 격국, 대운, 합충형해, 일주 데이터 전부
// ======================================================================


// [REMOVED for theory module] Lines 10-14: API 키 관련 — 배포 코드

var TGAN=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
var TGAN_KR=['갑','을','병','정','무','기','경','신','임','계'];
var JIJI=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var JIJI_KR=['자','축','인','묘','진','사','오','미','신','유','술','해'];
var OHAENG_TGAN=['목','목','화','화','토','토','금','금','수','수'];
var OHAENG_JIJI=['수','토','목','목','토','화','화','토','금','금','토','수'];
var EC_DARK={'목':'#2e7d32','화':'#d32f2f','토':'#bf8c00','금':'#757575','수':'#1565c0'};
var EJ={'목':'🌳','화':'🔥','토':'⛰️','금':'⚔️','수':'💧'};

/* ====== 75유형 운명동물 데이터 ====== */
var OHENG_DATA = [
  { key: "목", name: "木 나무", color: "#22A469", bg: "#EDFCF2", bgDark: "#D1FAE5", desc: "성장 · 뻗어나감 · 생명력", emoji: "🌿" },
  { key: "화", name: "火 불꽃", color: "#E8453C", bg: "#FEF1F0", bgDark: "#FEE2E2", desc: "열정 · 주목 · 화려함", emoji: "🔥" },
  { key: "토", name: "土 대지", color: "#C49A2A", bg: "#FDF8EC", bgDark: "#FEF3C7", desc: "안정 · 포용 · 묵직함", emoji: "🪨" },
  { key: "금", name: "金 칼날", color: "#6B7B8D", bg: "#F2F4F6", bgDark: "#E2E8F0", desc: "결단 · 날카로움 · 정밀", emoji: "⚔️" },
  { key: "수", name: "水 물결", color: "#2D7EB5", bg: "#EDF5FC", bgDark: "#DBEAFE", desc: "지혜 · 유연 · 깊이", emoji: "🌊" },
];

var SIPSUNG_DATA = [
  { key: "비겁", name: "비겁", desc: "자아 · 독립 · 경쟁", short: "독립" },
  { key: "식상", name: "식상", desc: "표현 · 창작 · 아이디어", short: "표현" },
  { key: "재성", name: "재성", desc: "재물 · 현실 · 기회", short: "현실" },
  { key: "관성", name: "관성", desc: "책임 · 규율 · 사회", short: "책임" },
  { key: "인성", name: "인성", desc: "학습 · 사색 · 탐구", short: "탐구" },
];

var ANIMALS = {
  // ─── 목(木) ───
  "목_비겁": {
    emoji: "🐺", name: "늑대",
    mods: [
      { label: "신강", tag: "싸한분위기러", title: "아무 말 안 했는데 분위기 싸해지는 늑대", desc: "본인은 평소대로인데 주변이 눈치봄. 그 분위기가 싫은데 고칠 생각은 없음.", traits: ["존재감 과다", "표정관리 불가", "고칠생각 없음"], rx: "가끔은 웃어보기 챌린지" },
      { label: "신약", tag: "츤데레", title: "무리에 끼고 싶지만 혼자인 늑대", desc: "같이 뛰고 싶은데 발이 안 떨어짐. 혼자가 편하다고 자기최면 중.", traits: ["혼자가 편한 척", "외로움 탐", "먼저 연락 못함"], rx: "먼저 손 내밀기 챌린지" },
      { label: "특수", tag: "퇴사상상러", title: "퇴사 상상하다 하루가 끝나는 늑대", desc: "'때려치우고 싶다' 매일 생각하는데 막상 못 나감. 통장 보면 현실.", traits: ["퇴사 시뮬 30회/일", "현실 브레이크", "통장이 족쇄"], rx: "작은 것부터 벗어나보기" }
    ]
  },
  "목_식상": {
    emoji: "🦊", name: "여우",
    mods: [
      { label: "신강", tag: "입담꾼", title: "입만 열면 다 넘어가는 여우", desc: "말빨, 센스, 눈치 삼위일체. 팔면 냉장고도 팔 사람.", traits: ["말빨 미쳤음", "센스 만렙", "분위기 장악"], rx: "진심은 말빨로 안 통해" },
      { label: "신약", tag: "잡생각러", title: "아이디어만 100개인 여우", desc: "이것도 하고 싶고 저것도 하고 싶은데 결국 아무것도 안 함.", traits: ["아이디어 폭포", "실행 부족", "잡생각 대마왕"], rx: "하나만 골라서 일단 시작" },
      { label: "특수", tag: "N잡러", title: "부업이 5개인데 다 중간인 여우", desc: "이것저것 다 하는데 어느 하나 터지진 않음. 근데 멈출 수 없음.", traits: ["N잡 중", "다 중간", "멈추면 불안"], rx: "하나를 터뜨려야 나머지도 산다" }
    ]
  },
  "목_재성": {
    emoji: "🐿️", name: "다람쥐",
    mods: [
      { label: "신강", tag: "짠테크러", title: "도토리 3만개 숨겨놓은 다람쥐", desc: "기회를 냄새로 맡고 놓치지 않는 현실 감각. 알뜰 그 자체.", traits: ["재물감각", "알뜰살뜰", "투자본능"], rx: "가끔은 지르는 맛도 알아야" },
      { label: "신약", tag: "망설이러", title: "도토리 보이는데 손이 안 닿는 다람쥐", desc: "기회는 보이는데 잡을 타이밍을 매번 놓침. 또 늦었어...", traits: ["기회포착은 함", "실행 느림", "타이밍 미스"], rx: "보이면 바로 잡기. 3초 룰." },
      { label: "특수", tag: "공허러", title: "도토리만 모으다 봄을 잊은 다람쥐", desc: "현실적 성공은 했는데... 이게 내가 원한 삶인가?", traits: ["성공했지만 공허", "의미부재", "영혼 텅빈"], rx: "통장 말고 마음을 채우기" }
    ]
  },
  "목_관성": {
    emoji: "🦌", name: "사슴",
    mods: [
      { label: "신강", tag: "괜찮아러", title: "'나 괜찮아'가 입버릇인 사슴", desc: "괜찮지 않은데 괜찮다고 해야 세상이 돌아가는 줄 아는 사람.", traits: ["자기희생", "감정 숨김", "괜찮지 않음"], rx: "오늘만 솔직해보기" },
      { label: "신약", tag: "눈치러", title: "눈치 100만개 장착한 사슴", desc: "발소리만 들어도 도망갈 준비. 세상이 아니라 시선이 무서움.", traits: ["눈치왕", "체면중시", "사회불안"], rx: "남 시선은 내 인생이 아니야" },
      { label: "특수", tag: "자기후순위러", title: "남 챙기느라 자기 밥은 안 먹는 사슴", desc: "다 챙겨주고 정작 본인은 점심을 거름. 근데 본인은 모름.", traits: ["남 챙기기 달인", "자기는 후순위", "무의식 희생"], rx: "오늘은 내 밥 먼저 먹기" }
    ]
  },
  "목_인성": {
    emoji: "🐱", name: "고양이",
    mods: [
      { label: "신강", tag: "알고리즘러", title: "유튜브 알고리즘에 인생 뺏긴 고양이", desc: "한번 빠지면 3시간. 쓸데없는 지식만 늘어남.", traits: ["호기심 무한", "쓸데없는 지식", "시간 블랙홀"], rx: "그 시간에 산책 한 번이라도" },
      { label: "신약", tag: "집콕러", title: "박스만 보면 들어가는 고양이", desc: "세상 밖은 무서우니까 안전한 데서 구경만 할래.", traits: ["안전지대 사랑", "소심한 박학", "나서기 두려움"], rx: "박스 밖도 생각보다 괜찮아" },
      { label: "특수", tag: "속앓이러", title: "다 알지만 입이 안 떨어지는 고양이", desc: "머릿속엔 할 말이 가득한데 입 밖으로 안 나옴.", traits: ["지식풍부", "표현부족", "속앓이"], rx: "일단 한마디만. 그게 시작이야" }
    ]
  },

  // ─── 화(火) ───
  "화_비겁": {
    emoji: "🦁", name: "사자",
    mods: [
      { label: "신강", tag: "지시알러지러", title: "지시받으면 일단 화부터 나는 사자", desc: "시키는 건 다 하는데 기분이 나쁨. 내가 먼저 하려했는데!", traits: ["자존심 끝판왕", "지시 알러지", "내가 먼저!"], rx: "남의 말도 일단 들어보기" },
      { label: "신약", tag: "속으르렁러", title: "으르렁거리고 싶은데 목이 안 나오는 사자", desc: "속으로는 왕인데 밖으로는 표현을 못 하는 답답함.", traits: ["속 왕기질", "겉소심", "내적분노"], rx: "일단 한 번 크게 으르렁" },
      { label: "특수", tag: "혼자텐션러", title: "단톡방에서 혼자 텐션 높은 사자", desc: "본인은 신나는데 나머지는 읽씹. 근데 멈출 수 없음.", traits: ["존재감 폭발", "혼자 신남", "읽씹 당해도 계속"], rx: "무대 아래에서도 너는 너야" }
    ]
  },
  "화_식상": {
    emoji: "🦚", name: "공작새",
    mods: [
      { label: "신강", tag: "셀카장인", title: "셀카 200장 찍고 1장 고르는 공작새", desc: "완벽한 각도를 찾아 헤매는 중. 조명도 중요함.", traits: ["표현욕구 폭발", "완벽한 연출", "관심=산소"], rx: "조명 없어도 이미 빛나" },
      { label: "신약", tag: "방전러", title: "깃털 펴다 힘 빠진 공작새", desc: "보여주고 싶은 건 넘치는데 체력이 안 따라줌.", traits: ["표현하다 방전", "에너지 롤러코스터", "번아웃 상습범"], rx: "에너지 충전 먼저, 깃털은 그 다음" },
      { label: "특수", tag: "참는공작", title: "깃털 펴고 싶은데 눈치 보는 공작새", desc: "화려하고 싶은 속마음 vs 체면 차리는 겉모습. 내적 전쟁 중.", traits: ["속은 화려", "겉은 점잖", "내적 갈등"], rx: "한 번쯤 맘껏 펼쳐봐" }
    ]
  },
  "화_재성": {
    emoji: "🐝", name: "벌",
    mods: [
      { label: "신강", tag: "쉼불안러", title: "쉬는 날에도 뭔가 해야 불안한 벌", desc: "휴일인데 누워있으면 죄책감. 결국 뭐라도 함.", traits: ["워커홀릭", "쉬면 불안", "죄책감 드리븐"], rx: "쉬는 것도 생산성이야" },
      { label: "신약", tag: "무거운날개", title: "꽃은 보이는데 날개가 무거운 벌", desc: "기회는 보여. 근데 몸이 안 따라줌. 마음은 급한데.", traits: ["기회 포착", "체력부족", "마음만 급함"], rx: "무리하지 말고 가까운 꽃부터" },
      { label: "특수", tag: "욕심벌", title: "남의 꿀까지 가져오는 벌", desc: "경쟁적으로 기회를 잡는 공격적 투자파. 남것도 내것.", traits: ["공격적 재테크", "남것도 내것", "승부사"], rx: "남의 꽃밭도 존중하기" }
    ]
  },
  "화_관성": {
    emoji: "🦅", name: "독수리",
    mods: [
      { label: "신강", tag: "분위기얼리러", title: "회의 때 한마디로 분위기 얼리는 독수리", desc: "본인은 팩트를 말한 건데 다들 조용해짐. 왜...?", traits: ["팩트폭행", "분위기 파악 불가", "본의 아닌 카리스마"], rx: "팩트에 쿠션 한 겹 입히기" },
      { label: "신약", tag: "기다림러", title: "높이 날고 싶은데 바람이 안 도와주는 독수리", desc: "책임감과 목표는 높은데 환경이 안 따라줌.", traits: ["목표 높음", "환경 안맞음", "인내가 필요"], rx: "바람은 반드시 바뀐다" },
      { label: "특수", tag: "스펙갑공허러", title: "LinkedIn 프로필이 무서운 독수리", desc: "스펙은 화려한데 본인도 가면 쓴 느낌. 진짜 나는 뭐지?", traits: ["스펙 화려", "정체성 혼란", "가면 속 공허"], rx: "프로필 말고 진짜 나를 찾기" }
    ]
  },
  "화_인성": {
    emoji: "🦉", name: "올빼미",
    mods: [
      { label: "신강", tag: "새벽분석러", title: "새벽 3시에 전 애인 인스타 분석하는 올빼미", desc: "쓸데없는 데 분석력 올인. 남의 피드에서 단서 찾는 중.", traits: ["야행성 분석", "쓸데없는 관찰", "새벽 감성"], rx: "그 분석력을 자기한테 써봐" },
      { label: "신약", tag: "생각러", title: "생각만 하다 해 지는 올빼미", desc: "완벽하게 준비되면 시작할 거야... 그 날은 안 옴.", traits: ["분석마비", "완벽주의", "시작공포"], rx: "70%면 충분해. 일단 시작" },
      { label: "특수", tag: "침묵러", title: "다 보이는데 아무 말 안 하는 올빼미", desc: "눈은 모든 걸 보고 있는데 입이 안 열림. 답답한 건 나.", traits: ["관찰력 극대화", "표현부족", "속답답"], rx: "본 것을 말해야 지혜가 돼" }
    ]
  },

  // ─── 토(土) ───
  "토_비겁": {
    emoji: "🐻", name: "곰",
    mods: [
      { label: "신강", tag: "내꺼진심러", title: "내 과자 하나에 진심인 곰", desc: "큰 건 양보하는데 작은 거에 진심. 내 음식 함부로 손대지 마.", traits: ["영역 의식", "작은 것에 진심", "터지면 무서움"], rx: "모든 과자가 네 영역은 아니야" },
      { label: "신약", tag: "동굴러", title: "동굴에서 나오기 싫은 곰", desc: "세상 나가기 싫어. 안전한 내 공간이 최고.", traits: ["집순이/집돌이", "에너지 부족", "안전지대 사랑"], rx: "동굴 밖에도 맛있는 게 있어" },
      { label: "특수", tag: "모순소비러", title: "꿀 먹으면서 다이어트 한다는 곰", desc: "모으면서 쓰고, 아끼면서 지름. 모순 덩어리 소비습관.", traits: ["모순적 소비", "아끼면서 지름", "합리화 달인"], rx: "인정해. 그냥 먹고 싶었던 거야" }
    ]
  },
  "토_식상": {
    emoji: "🦦", name: "수달",
    mods: [
      { label: "신강", tag: "놀이터러", title: "장난치다 하루가 끝나는 수달", desc: "노는 게 일이고 일이 노는 거. 인생이 놀이터.", traits: ["장난꾸러기", "놀기 대장", "분위기 메이커"], rx: "놀다가도 가끔은 진지하게" },
      { label: "신약", tag: "급잠러", title: "재롱 피우다 잠드는 수달", desc: "귀여움이 무기인데 체력이 안 따라줌. 5분 텐션 후 급잠.", traits: ["귀여움 MAX", "5분 체력", "급속 방전"], rx: "텐션 조절이 곧 생존전략" },
      { label: "특수", tag: "자기검열러", title: "놀고 싶은데 눈치 보이는 수달", desc: "재밌게 살고 싶은데 '이러면 안 되나?' 자기검열 중.", traits: ["놀고싶다", "눈치보임", "자기검열"], rx: "네가 놀아도 세상은 안 무너져" }
    ]
  },
  "토_재성": {
    emoji: "🐂", name: "소",
    mods: [
      { label: "신강", tag: "일단출근러", title: "불만 있어도 일단 출근하는 소", desc: "오늘도 퇴사 생각 하면서 자리에 앉음. 책임감인지 관성인지.", traits: ["묵묵 실행", "불만 삼킴", "관성 출근"], rx: "불만 좀 말해도 괜찮아" },
      { label: "신약", tag: "과부하러", title: "짐이 너무 많아 주저앉은 소", desc: "해야 할 일은 산더미인데 몸이 안 움직임. 과부하.", traits: ["과부하", "쉬고싶다", "의무감에 눌림"], rx: "짐 절반만 내려놔도 갈 수 있어" },
      { label: "특수", tag: "몰래투잡러", title: "본업 하면서 부업 몰래 하는 소", desc: "투잡 뛰는데 들키면 안 됨. 체력은 한계인데 통장이 두 개니까.", traits: ["실속파", "투잡 중", "체력 한계"], rx: "몸이 자본이라는 거 잊지 마" }
    ]
  },
  "토_관성": {
    emoji: "🐘", name: "코끼리",
    mods: [
      { label: "신강", tag: "기억삭제불가러", title: "남이 한 말 10년째 기억하는 코끼리", desc: "상처받은 말은 절대 안 잊음. 용서는 해도 삭제는 안 됨.", traits: ["기억력 무한", "상처 저장소", "용서≠망각"], rx: "가끔은 잊는 것도 능력이야" },
      { label: "신약", tag: "무거운발러", title: "무거운 발걸음의 코끼리", desc: "해야 할 건 알겠는데 발이 안 떨어짐. 느린 게 아니라 무거운 거야.", traits: ["의무과다", "느린게아니라무거운것", "지침"], rx: "한 발짝만. 그것만으로도 대단해" },
      { label: "특수", tag: "상처아카이브러", title: "상처도 교훈도 다 기록하는 코끼리", desc: "일기장 = 상처 아카이브. 근데 그게 약이 되기도 하는 사람.", traits: ["기록 본능", "상처→교훈", "성장형 아픔"], rx: "좋은 기억도 기록해줘" }
    ]
  },
  "토_인성": {
    emoji: "🐢", name: "거북이",
    mods: [
      { label: "신강", tag: "느린조급러", title: "남들 3바퀴 돌 때 1바퀴 확실히 도는 거북이", desc: "속도는 느린데 한 번 간 길은 안 까먹음. 근데 조급함은 있음.", traits: ["자기 페이스", "꾸준함", "속은 조급"], rx: "속도가 아닌 방향이 중요해" },
      { label: "신약", tag: "등껍질러", title: "등껍질 안에서 세상 구경하는 거북이", desc: "안전한 곳에서 세상을 관찰 중. 나가고 싶지만 무서움.", traits: ["안전지대", "관찰중", "세상은 무서워"], rx: "머리만 살짝 내밀어봐" },
      { label: "특수", tag: "이상러", title: "지혜는 깊은데 통장은 얕은 거북이", desc: "아는 건 많은데 돈 버는 건 관심 밖. 이상 높고 현실 낮음.", traits: ["지혜롭지만 가난", "이상주의", "학자형"], rx: "지혜도 현금화할 수 있어" }
    ]
  },

  // ─── 금(金) ───
  "금_비겁": {
    emoji: "🐆", name: "치타",
    mods: [
      { label: "신강", tag: "일단결제러", title: "생각보다 손이 먼저 나가는 치타", desc: "장바구니에 넣기도 전에 결제 완료. 후회는 배송 온 다음에.", traits: ["결단력 미침", "충동적", "후회는 나중에"], rx: "달리기 전에 1초만 앞을 봐" },
      { label: "신약", tag: "생각만치타", title: "달리고 싶은데 발이 안 떨어지는 치타", desc: "머릿속에선 이미 100번 뛰었는데 몸이 안 움직임.", traits: ["머리는 빠름", "몸은 느림", "내적 갈등"], rx: "한 발만 내디뎌. 나머지는 관성" },
      { label: "특수", tag: "실시간공유러", title: "달리면서 인스타 올리는 치타", desc: "하는 것도 바쁜데 그걸 공유 안 하면 안 되는 체질.", traits: ["행동+공유 동시", "실시간 중계", "멈춤 불가"], rx: "가끔은 조용히 달려도 돼" }
    ]
  },
  "금_식상": {
    emoji: "🦜", name: "앵무새",
    mods: [
      { label: "신강", tag: "직설러", title: "할 말은 꼭 하는 앵무새", desc: "날카로운 관찰 + 거침없는 표현. 정곡을 찌르는 한마디의 달인.", traits: ["직설화법", "관찰력", "한마디가 칼"], rx: "정곡도 포장하면 더 잘 먹혀" },
      { label: "신약", tag: "배터리러", title: "떠들다 배터리 나가는 앵무새", desc: "할 말은 100개인데 체력은 10. 미팅 2개면 방전.", traits: ["수다+방전", "텐션 롤러코스터", "5분 집중"], rx: "말 줄이면 체력이 늘어" },
      { label: "특수", tag: "TMI러", title: "알고 있는 걸 다 말해버리는 앵무새", desc: "지식 + 표현 = TMI 폭탄. 멈출 줄 모르는 강의 모드.", traits: ["TMI 폭탄", "지식+수다", "강의본능"], rx: "상대방 턴도 있다는 걸 기억" }
    ]
  },
  "금_재성": {
    emoji: "🐊", name: "악어",
    mods: [
      { label: "신강", tag: "세일알림러", title: "할인 알림 뜨면 새벽에도 일어나는 악어", desc: "기회(=세일)에 반응하는 속도가 비정상. 놓치면 하루 종일 생각남.", traits: ["기회포착 비정상", "세일 알림 = 기상", "놓치면 우울"], rx: "놓아야 할 때를 아는 것도 실력" },
      { label: "신약", tag: "잠복러", title: "물속에서 기회만 기다리는 악어", desc: "때를 기다리는 건 좋은데, 기다리기만 하면 지나감.", traits: ["인내심", "타이밍 중시", "수동적"], rx: "가끔은 먼저 물 밖으로 나가기" },
      { label: "특수", tag: "야생생존러", title: "사수 없이 알아서 크는 야생 악어", desc: "매뉴얼 없이 맨땅에 헤딩. 근데 그게 되긴 됨.", traits: ["야생 생존력", "매뉴얼 없음", "맨땅 헤딩"], rx: "가끔은 물어보는 게 빠르다" }
    ]
  },
  "금_관성": {
    emoji: "🐕", name: "시바견",
    mods: [
      { label: "신강", tag: "거부반응러", title: "싫으면 온몸으로 거부하는 시바견", desc: "하기 싫은 건 죽어도 안 함. 표정 관리 따위 없음.", traits: ["자기룰 철벽", "표정 = 솔직", "타협없음"], rx: "남의 규칙에도 이유가 있어" },
      { label: "신약", tag: "거부러", title: "산책 가기 싫은데 끌려가는 시바견", desc: "하기 싫은 건 온몸으로 거부하는데 결국 끌려감.", traits: ["수동적 저항", "하기싫어", "결국 함"], rx: "가끔은 순순히 가는 게 더 편해" },
      { label: "특수", tag: "투덜러", title: "규칙은 지키는데 한마디씩 하는 시바견", desc: "시킨 건 하는데 불만을 표현 안 하곤 못 배기는 타입.", traits: ["규칙+불만", "한마디 장인", "투덜투덜"], rx: "말투만 바꿔도 세상이 달라져" }
    ]
  },
  "금_인성": {
    emoji: "🐙", name: "문어",
    mods: [
      { label: "신강", tag: "탭30개러", title: "탭 30개 켜놓고 하나도 안 닫는 문어", desc: "동시에 다 하는 것 같지만 실은 아무것도 안 끝남.", traits: ["멀티태스킹(인 척)", "탭 30개", "하나도 안 끝남"], rx: "탭 하나만 남기고 다 닫기" },
      { label: "신약", tag: "숨기러", title: "먹물 뿌리고 숨는 문어", desc: "위기가 오면 일단 숨고 봄. 방어 본능 극대화.", traits: ["회피형", "방어본능", "숨기 달인"], rx: "도망치지 않으면 의외로 별 거 아냐" },
      { label: "특수", tag: "분석만프로러", title: "주식 분석은 프로인데 수익은 마이너스인 문어", desc: "분석 글 100개 읽고 차트 다 봤는데 결국 물림.", traits: ["분석 프로", "수익 마이너스", "이론≠실전"], rx: "분석력을 통장에도 적용해봐" }
    ]
  },

  // ─── 수(水) ───
  "수_비겁": {
    emoji: "🦈", name: "상어",
    mods: [
      { label: "신강", tag: "존재불안러", title: "일 안 하면 존재가치 없다고 느끼는 상어", desc: "쉬면 불안하고, 바쁘면 죽을 것 같고. 그 사이 어딘가.", traits: ["멈춤불가", "존재불안", "쉼=공포"], rx: "멈춰도 안 죽어. 진짜로." },
      { label: "신약", tag: "고독러", title: "깊은 바다에서 혼자 헤엄치는 상어", desc: "강해 보이지만 속은 외롭다. 누구에게도 기대지 않는 습관.", traits: ["강한척", "외로움 숨김", "고독한 독립"], rx: "약한 모습도 보여줘도 돼" },
      { label: "특수", tag: "내맘대로러", title: "팀플에서 결국 다 내 맘대로 하는 상어", desc: "남 의견 듣는 척하고 결국 내 안대로. 근데 결과는 나옴.", traits: ["독단적", "결과는 냄", "협업 스킬 0"], rx: "같이 하면 더 큰 결과 나와" }
    ]
  },
  "수_식상": {
    emoji: "🐬", name: "돌고래",
    mods: [
      { label: "신강", tag: "자동MC러", title: "아무 모임에서나 MC 되는 돌고래", desc: "분위기가 죽으면 자동으로 입이 열림. 본능적 분위기 살리기.", traits: ["분위기 장인", "자동 MC", "본능적 유머"], rx: "매 순간 MC 안 해도 돼" },
      { label: "신약", tag: "떠돌이러", title: "파도에 떠밀려 다니는 돌고래", desc: "흐름은 타는데 방향 설정이 안 됨. 이리저리 떠다님.", traits: ["흐름타기", "방향없음", "자유롭지만 불안"], rx: "방향 하나만 정하면 파도가 밀어줘" },
      { label: "특수", tag: "선두러", title: "무리 앞에서 점프하는 돌고래", desc: "리더십 + 표현력. 앞에 서서 모두를 이끄는 퍼포머.", traits: ["리더+퍼포머", "점프본능", "앞장서기"], rx: "팔로워도 중요한 역할이야" }
    ]
  },
  "수_재성": {
    emoji: "🦫", name: "비버",
    mods: [
      { label: "신강", tag: "묵묵무관심러", title: "아무도 안 알아주는데 묵묵히 짓는 비버", desc: "열심히 만들고 있는데 아무도 관심 없음. 근데 멈출 수 없음.", traits: ["꾸준함", "인정 부재", "묵묵히 축적"], rx: "알아주는 사람은 반드시 나타나" },
      { label: "신약", tag: "허무러", title: "댐 짓다 지쳐서 주저앉은 비버", desc: "열심히 하는데 결과가 안 보임. 지치고 허무한 반복.", traits: ["노력중", "결과없음", "번아웃 직전"], rx: "쌓인 건 보이지 않아도 있어" },
      { label: "특수", tag: "공허러", title: "댐만 짓고 왜 짓는지 모르는 비버", desc: "열심히 사는데 의미를 모르겠음. 바쁜데 공허.", traits: ["바쁘지만 공허", "의미부재", "목적없는 성실"], rx: "왜 짓는지 먼저 물어봐" }
    ]
  },
  "수_관성": {
    emoji: "🐋", name: "고래",
    mods: [
      { label: "신강", tag: "상담사인데상담러", title: "다 품어주다 본인이 터지는 고래", desc: "모두의 고민 상담사. 근데 내 고민은 누구한테? 그게 고민.", traits: ["포용력 MAX", "자기 케어 부족", "터지기 직전"], rx: "남 고민 말고 내 고민 먼저" },
      { label: "신약", tag: "속울음러", title: "깊은 바다에서 조용히 울고 있는 고래", desc: "모두를 위해 참고 있지만 속은 울고 있음.", traits: ["조용한 울음", "참음", "무거운 책임"], rx: "울어도 돼. 고래의 울음도 노래야" },
      { label: "특수", tag: "읽씹당하는리더러", title: "그룹채팅에서 혼자 공지 올리는 고래", desc: "아무도 안 하니까 내가 함. 근데 아무도 안 읽음.", traits: ["혼자 책임", "읽씹 당함", "외로운 리더"], rx: "도움을 구하는 것도 용기야" }
    ]
  },
  "수_인성": {
    emoji: "🪼", name: "해파리",
    mods: [
      { label: "신강", tag: "샤워철학러", title: "샤워하다 인생 의미 생각하는 해파리", desc: "물 맞으면서 철학적 사색 시작. 10분 뒤에 뜨거운 물 다 씀.", traits: ["감수성 극대화", "샤워 = 철학시간", "물값 폭탄"], rx: "때로는 얕은 곳에서 놀아도 돼" },
      { label: "신약", tag: "표류러", title: "조류에 떠밀려 다니는 해파리", desc: "방향 없이 생각에 잠겨 떠다님. 깊긴 깊은데 어디로 가는지 모름.", traits: ["방향없는 사색", "우유부단", "조류따라"], rx: "방향 하나만 정해봐" },
      { label: "특수", tag: "독침러", title: "독 쏘고 도망가는 해파리", desc: "평소엔 조용히 떠다니다가 건드리면 한 방. 수동적 공격의 달인.", traits: ["평소 순함", "건드리면 한방", "수동공격"], rx: "독 쏘기 전에 먼저 말해봐" }
    ]
  },
};

function getAnimalResult(oheng, dominantSipsung, condition) {
  var key = oheng + "_" + dominantSipsung;
  var animal = ANIMALS[key];
  if (!animal) return null;

  var modIndex = 0;
  if (condition === "신약") modIndex = 1;
  else if (condition === "특수") modIndex = 2;

  return {
    emoji: animal.emoji,
    name: animal.name,
    mods: animal.mods,
    mod: animal.mods[modIndex],
    ohengData: OHENG_DATA.filter(function(o){ return o.key === oheng; })[0],
    sipsungData: SIPSUNG_DATA.filter(function(s){ return s.key === dominantSipsung; })[0],
  };
}

/* ====== 진태양시(眞太陽時) 계산 시스템 ====== */
var CITY_DATA = [
  {name:'서울',lng:126.98},{name:'부산',lng:129.08},{name:'대구',lng:128.60},
  {name:'인천',lng:126.71},{name:'광주',lng:126.85},{name:'대전',lng:127.39},
  {name:'울산',lng:129.31},{name:'세종',lng:127.00},{name:'수원',lng:127.01},
  {name:'창원',lng:128.68},{name:'고양',lng:126.83},{name:'용인',lng:127.18},
  {name:'성남',lng:127.14},{name:'청주',lng:127.49},{name:'전주',lng:127.15},
  {name:'천안',lng:127.15},{name:'김해',lng:128.89},{name:'제주',lng:126.53},
  {name:'포항',lng:129.37},{name:'춘천',lng:127.73},{name:'원주',lng:127.95},
  {name:'강릉',lng:128.90},{name:'속초',lng:128.59},{name:'여수',lng:127.66},
  {name:'순천',lng:127.49},{name:'목포',lng:126.39},{name:'군산',lng:126.74},
  {name:'익산',lng:126.96},{name:'안동',lng:128.73},{name:'경주',lng:129.21},
  {name:'진주',lng:128.11},{name:'통영',lng:128.43},{name:'거제',lng:128.62},
  {name:'평택',lng:127.11},{name:'파주',lng:126.78},{name:'김포',lng:126.72},
  {name:'양산',lng:129.04},{name:'구미',lng:128.34},{name:'충주',lng:127.93},
  {name:'제천',lng:128.19},{name:'영주',lng:128.62},{name:'서산',lng:126.45},
  {name:'당진',lng:126.63},{name:'보령',lng:126.61},{name:'논산',lng:127.10},
  {name:'공주',lng:127.12},{name:'아산',lng:127.00},{name:'광양',lng:127.70},
  {name:'나주',lng:126.71},{name:'해남',lng:126.60},{name:'모름',lng:127.50}
];
var KST_LONGITUDE = 135.0; // KST 기준 경도 (UTC+9 = 135°E)

// 균시차(Equation of Time) 계산 — 분(minute) 단위 반환
function equationOfTime(year, month, day) {
  var n = Math.floor(275 * month / 9) - 2 * Math.floor((month + 9) / 12) + day - 30;
  var B = 2 * Math.PI * (n - 81) / 365;
  // Spencer 공식 (정밀도 ±30초)
  return 9.87 * Math.sin(2*B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

// KST → 진태양시 변환 (분 단위 보정값 반환)
function getTrueSolarCorrection(year, month, day, longitude) {
  if (!longitude || longitude === 127.50) return 0; // 모름이면 보정 없음
  var eot = equationOfTime(year, month, day); // 균시차 (분)
  var lngCorrection = (longitude - KST_LONGITUDE) * 4; // 경도 1도 = 4분 차이
  return lngCorrection + eot; // 총 보정값 (분)
}

var JIJANGGAN_DATA=[
  [{g:8,d:10},{g:9,d:20}],
  [{g:9,d:9},{g:7,d:3},{g:5,d:18}],
  [{g:4,d:7},{g:2,d:7},{g:0,d:16}],
  [{g:0,d:10},{g:1,d:20}],
  [{g:1,d:9},{g:9,d:3},{g:4,d:18}],
  [{g:4,d:7},{g:6,d:7},{g:2,d:16}],
  [{g:2,d:10},{g:5,d:9},{g:3,d:11}],
  [{g:3,d:9},{g:1,d:3},{g:5,d:18}],
  [{g:5,d:7},{g:8,d:7},{g:6,d:16}],
  [{g:6,d:10},{g:7,d:20}],
  [{g:7,d:9},{g:3,d:3},{g:4,d:18}],
  [{g:4,d:7},{g:0,d:7},{g:8,d:16}]
];

// ※ 학파 차이(學派 差異): 음간(乙丁己辛癸) 12운성 순역행 논쟁
//    다수설(본 모듈 채택): 음간역행 — 淵海子平, 三命通會 계통. 甲亥순→乙午역, 丙寅순→丁酉역 등
//    소수설: 음간순행 — 일부 현대 학자. 乙도 甲과 같은 방향으로 순행한다는 주장
//    본 모듈은 전통적 다수설(음간역행)을 채택하되, 이 논쟁이 존재함을 명시함
var UNSUNG_NAMES=['장생','목욕','관대','건록','제왕','쇠','병','사','묘','절','태','양'];
var UNSUNG_START=[{s:11,d:1},{s:6,d:-1},{s:2,d:1},{s:9,d:-1},{s:2,d:1},{s:9,d:-1},{s:5,d:1},{s:0,d:-1},{s:8,d:1},{s:3,d:-1}];
function getUnsung(gi,ji){var info=UNSUNG_START[gi];return UNSUNG_NAMES[info.d===1?(ji-info.s+12)%12:(info.s-ji+12)%12];}

var SINSAL12_NAMES=['겁살','재살','천살','지살','년살','월살','망신살','장성살','반안살','역마살','육해살','화개살'];
function getSamhapGroup(ji){return[0,2,1,3,0,2,1,3,0,2,1,3][ji];}
var SINSAL12_START=[5,11,2,8];
function get12Sinsal(basis,target){return SINSAL12_NAMES[(target-SINSAL12_START[getSamhapGroup(basis)]+12)%12];}

var SS_NAMES=['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
function getSipsung(dg,tg){var OH=[0,0,1,1,2,2,3,3,4,4],YY=[0,1,0,1,0,1,0,1,0,1],KUK={0:2,1:3,2:4,3:0,4:1};var de=OH[dg],te=OH[tg],same=(YY[dg]===YY[tg]);if(de===te)return same?'비견':'겁재';if((de+1)%5===te)return same?'식신':'상관';if((te+1)%5===de)return same?'편인':'정인';if(KUK[de]===te)return same?'편재':'정재';return same?'편관':'정관';}

/* ====== 납음오행(納音五行) 30종 테이블 ====== */
var NAPEUM_TABLE = [
  {name:'해중금',desc:'바닷속에 잠든 금 — 아직 세상에 드러나지 않은 숨겨진 보석, 때를 기다리는 잠재력'},
  {name:'노중화',desc:'화덕 속의 불 — 뜨겁고 강렬하지만 통제된 열정, 목적이 분명한 에너지'},
  {name:'대림목',desc:'큰 숲의 나무 — 당당하고 우뚝 선 존재감, 주변을 품는 리더십'},
  {name:'노방토',desc:'길가의 흙 — 누구나 밟고 지나가는 겸손한 포용, 묵묵한 헌신'},
  {name:'검봉금',desc:'칼끝의 금 — 날카롭고 결단력 있는 실행자, 한번 정하면 끝까지'},
  {name:'산두화',desc:'산꼭대기 불 — 높은 이상과 고독한 열정, 멀리서도 보이는 존재'},
  {name:'간하수',desc:'시냇물 — 조용히 흐르지만 멈추지 않는 끈기, 꾸준한 전진'},
  {name:'성두토',desc:'성벽의 흙 — 견고하고 방어적인 안정감, 흔들리지 않는 뚝심'},
  {name:'백랍금',desc:'흰 밀랍 금 — 부드럽게 빛나는 세련된 재능, 은은한 카리스마'},
  {name:'양류목',desc:'버드나무 — 유연하고 감성적, 바람에 흔들려도 꺾이지 않는 회복력'},
  {name:'천중수',desc:'우물물 — 깊이 있고 안정적인 내면의 지혜, 마르지 않는 통찰'},
  {name:'옥상토',desc:'지붕의 흙 — 보호하고 감싸는 따뜻한 울타리, 가정의 안식처'},
  {name:'벽력화',desc:'번개불 — 갑작스러운 영감, 폭발적 에너지, 순간의 천재성'},
  {name:'송백목',desc:'소나무·잣나무 — 사시사철 변하지 않는 절개와 끈기, 고고한 품격'},
  {name:'장류수',desc:'긴 강물 — 유유히 흐르는 대범함, 큰 그릇, 어디로든 길을 찾아감'},
  {name:'사중금',desc:'모래속 금 — 겉으로 안 보이지만 파면 나오는 실력, 숨은 강자'},
  {name:'산하화',desc:'석양불 — 뜨겁지만 서서히 지는 아름다움, 성숙한 열정'},
  {name:'평지목',desc:'평지의 나무 — 어디서든 뿌리내리는 적응력, 소박하지만 단단한'},
  {name:'벽상토',desc:'벽의 흙 — 보이지 않는 곳에서 구조를 지탱하는 묵묵한 버팀목'},
  {name:'금박금',desc:'금박 — 화려한 표면, 예술적 감각, 아름다움을 추구하는 심미안'},
  {name:'복등화',desc:'등불 — 어둠을 밝히는 따뜻한 빛, 지혜의 안내자, 주변을 비추는 사람'},
  {name:'천하수',desc:'하늘의 물(비) — 은혜처럼 내리는 영향력, 넓게 퍼지는 감화력'},
  {name:'대역토',desc:'큰 언덕 흙 — 묵직한 안정감, 흔들리지 않는 기반, 듬직한 존재'},
  {name:'차천금',desc:'비녀 금 — 정교하고 섬세한 기술력, 작지만 빛나는 가치'},
  {name:'상자목',desc:'뽕나무 — 실용적이고 양육하는 에너지, 누군가를 키우고 먹이는 사람'},
  {name:'대계수',desc:'큰 시냇물 — 활기차게 흐르는 생명력, 막힘없이 뻗어나가는 추진력'},
  {name:'사중토',desc:'모래흙 — 유동적이지만 쌓이면 거대해지는 잠재력, 변화 속 축적'},
  {name:'천상화',desc:'하늘의 불(태양) — 모두를 비추는 카리스마, 어디서든 중심이 되는 사람'},
  {name:'석류목',desc:'석류나무 — 겉은 단단하고 속은 풍성한 열매, 깊은 내면의 보물'},
  {name:'대해수',desc:'큰 바다 — 끝없는 깊이와 포용, 모든 것을 받아들이는 대범함'}
];
function getNapeum(ganIdx, jiIdx) {
  // 60갑자 인덱스 구한 뒤 2로 나누면 30종 중 하나
  var idx60 = -1;
  for (var k = 0; k < 60; k++) { if (k % 10 === ganIdx && k % 12 === jiIdx) { idx60 = k; break; } }
  if (idx60 < 0) return null;
  return NAPEUM_TABLE[Math.floor(idx60 / 2)];
}

/* ====== 오행 흐름(순환) 단절 해석 ====== */
var OHENG_FLOW_DESC = {
  '목화': {chain:'목→화', meaning:'성장→열정 연결', cut:'아이디어와 계획은 많지만 불꽃처럼 타오르는 추진력이 부족. 시작의 에너지가 약함'},
  '화토': {chain:'화→토', meaning:'열정→결실 연결', cut:'열심히 노력하지만 결과물로 남기기 어려움. 과정은 화려하나 마무리가 약함'},
  '토금': {chain:'토→금', meaning:'안정→결단 연결', cut:'기반과 자원은 있지만 결정적 선택을 못 내림. 기회를 앞에 두고 망설임'},
  '금수': {chain:'금→수', meaning:'실행→지혜 연결', cut:'행동력은 있지만 경험에서 교훈을 추출하지 못함. 같은 실수를 반복할 수 있음'},
  '수목': {chain:'수→목', meaning:'지혜→성장 연결', cut:'생각과 분석은 깊지만 실제 행동으로 옮기지 못함. 완벽주의로 시작이 늦어짐'}
};

function dateToJDN(y,m,d){var yr=y,mo=m;if(mo<=2){yr--;mo+=12;}var A=Math.floor(yr/100);return Math.floor(365.25*(yr+4716))+Math.floor(30.6001*(mo+1))+d+2-A+Math.floor(A/4)-1524.5;}
function solarLongitude(jd){var T=(jd-2451545)/36525,L0=280.46646+36000.76983*T+.0003032*T*T,M=357.52911+35999.05029*T-.0001537*T*T,Mr=M*Math.PI/180,C=(1.914602-.004817*T-.000014*T*T)*Math.sin(Mr)+(.019993-.000101*T)*Math.sin(2*Mr)+.000289*Math.sin(3*Mr),s=L0+C,om=125.04-1934.136*T;s=s-.00569-.00478*Math.sin(om*Math.PI/180);return((s%360)+360)%360;}
function findSolarTermJD(yr,tgt){var nd=function(a,b){var d=a-b;while(d>180)d-=360;while(d<-180)d+=360;return d;};var de=80+(tgt/360)*365.25;if(tgt>270)de=80+((tgt-360)/360)*365.25;var j0=dateToJDN(yr,1,1)+de-30,j1=j0+60;for(var i=0;i<50;i++){var jm=(j0+j1)/2,df=nd(solarLongitude(jm),tgt);if(Math.abs(df)<.0001)return jm;if(df<0)j0=jm;else j1=jm;}return(j0+j1)/2;}

var JG_LONG=[{n:'소한',l:285,mb:1},{n:'입춘',l:315,mb:2},{n:'경칩',l:345,mb:3},{n:'청명',l:15,mb:4},{n:'입하',l:45,mb:5},{n:'망종',l:75,mb:6},{n:'소서',l:105,mb:7},{n:'입추',l:135,mb:8},{n:'백로',l:165,mb:9},{n:'한로',l:195,mb:10},{n:'입동',l:225,mb:11},{n:'대설',l:255,mb:0}];
function getJeolgiTimes(yr){var r=[];for(var y=yr-1;y<=yr+1;y++)for(var j=0;j<JG_LONG.length;j++){var jg=JG_LONG[j];r.push({n:jg.n,mb:jg.mb,jd:findSolarTermJD(y,jg.l)});}r.sort(function(a,b){return a.jd-b.jd;});return r;}

function calculateSaju(year,month,day,hourBranch,hour,minute){
  var bjdNoon=dateToJDN(year,month,day);
  // ★ 절기 비교용: 사용자의 KST 생시를 반영한 JD
  var bjd=bjdNoon;
  if(hour!==null&&hour!==undefined&&hour!==''){
    bjd+=(+hour-12)/24;
    if(minute!==null&&minute!==undefined&&minute!=='') bjd+=(+minute)/1440;
  }
  // ★ KST 보정: 절기 JD(UTC)를 KST로 변환 (+9시간)
  var KST=9/24;
  var jt=getJeolgiTimes(year);
  var ipJD=findSolarTermJD(year,315)+KST,sy=year;if(bjd<ipJD)sy=year-1;
  var yIdx=((sy-4)%60+60)%60,yg=yIdx%10,yj=yIdx%12;
  var mb=2,cj='입춘';for(var i=jt.length-1;i>=0;i--)if(bjd>=jt[i].jd+KST){mb=jt[i].mb;cj=jt[i].n;break;}
  var mss=[2,4,6,8,0],mg=(mss[yg%5]+(mb-2+12)%12)%10,mj=mb;
  // ★ 일주는 날짜(정오) 기준 — 시간에 영향받지 않음
  var dIdx=((Math.floor(bjdNoon)+50)%60+60)%60,dg=dIdx%10,dj=dIdx%12;
  var hg=null,hj=null;
  if(hourBranch>=0){hj=hourBranch;var hss=[0,2,4,6,8];hg=(hss[dg%5]+hourBranch)%10;}
  return{yg:yg,yj:yj,mg:mg,mj:mj,dg:dg,dj:dj,hg:hg,hj:hj,sy:sy,cj:cj};
}

function getSpecialSinsal(yg,yj,mg,mj,dg,dj,hg,hj){
  var R=[],aJ=[],aG=[];
  if(yj!=null)aJ.push({j:yj,l:'년지'});if(mj!=null)aJ.push({j:mj,l:'월지'});if(dj!=null)aJ.push({j:dj,l:'일지'});if(hj!=null)aJ.push({j:hj,l:'시지'});
  if(yg!=null)aG.push({g:yg,l:'년간'});if(dg!=null)aG.push({g:dg,l:'일간'});
  var aGF=[];if(yg!=null)aGF.push({g:yg,l:'년간'});if(mg!=null)aGF.push({g:mg,l:'월간'});if(dg!=null)aGF.push({g:dg,l:'일간'});if(hg!=null)aGF.push({g:hg,l:'시간'});
  var ceM={0:[1,7],4:[1,7],1:[0,8],5:[0,8],2:[11,9],3:[11,9],6:[1,7],7:[2,6],8:[3,5],9:[3,5]};
  for(var a=0;a<aG.length;a++){var ts=ceM[aG[a].g];for(var b=0;b<aJ.length;b++)if(ts.indexOf(aJ[b].j)>=0&&aJ[b].l!==aG[a].l.replace('간','지'))R.push({name:'천을귀인',type:'good',desc:aG[a].l+' '+TGAN_KR[aG[a].g]+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}
  var mcM=[5,6,8,9,8,9,11,0,2,3];
  for(var a=0;a<aG.length;a++){var t=mcM[aG[a].g];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'문창귀인',type:'good',desc:aG[a].l+' → '+aJ[b].l});}
  var dhM=[9,3,6,0],ymM=[2,8,11,5],hgM=[4,10,1,7];
  var bL=[];if(yj!=null)bL.push({j:yj,l:'년지'});if(dj!=null)bL.push({j:dj,l:'일지'});
  for(var a=0;a<bL.length;a++){var g=getSamhapGroup(bL[a].j);
    for(var b=0;b<aJ.length;b++){
      if(aJ[b].j===dhM[g]&&aJ[b].l!==bL[a].l)R.push({name:'도화살',type:'bad',desc:bL[a].l+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});
      if(aJ[b].j===ymM[g]&&aJ[b].l!==bL[a].l)R.push({name:'역마살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
      if(aJ[b].j===hgM[g]&&aJ[b].l!==bL[a].l)R.push({name:'화개살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
    }
  }
  var yiM={0:3,2:6,4:6,6:9,8:0};
  if(dg!=null&&dg in yiM){var t=yiM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'양인살',type:'bad',desc:'일간 '+TGAN_KR[dg]+' → '+aJ[b].l});}
  var cdM={0:{t:'ji',v:5},1:{t:'gan',v:6},2:{t:'gan',v:3},3:{t:'gan',v:8},4:{t:'gan',v:8},5:{t:'gan',v:7},6:{t:'ji',v:11},7:{t:'gan',v:0},8:{t:'gan',v:9},9:{t:'ji',v:2},10:{t:'gan',v:2},11:{t:'gan',v:1}};
  if(mj!=null&&cdM[mj]){var cd=cdM[mj];if(cd.t==='gan'){for(var a=0;a<aGF.length;a++)if(aGF[a].g===cd.v)R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aGF[a].l+' '+TGAN_KR[aGF[a].g]});}else{for(var b=0;b<aJ.length;b++)if(aJ[b].j===cd.v&&aJ[b].l!=='월지')R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}}
  if(mj!=null){var g2=getSamhapGroup(mj);var wdG=[8,2,6,0][g2];for(var a=0;a<aGF.length;a++)if(aGF[a].g===wdG)R.push({name:'월덕귀인',type:'good',desc:'월지 삼합 → '+aGF[a].l});}
  var gyM=[4,5,7,8,7,8,10,11,1,2];
  if(dg!=null){var t2=gyM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t2)R.push({name:'금여록',type:'good',desc:'일간 → '+aJ[b].l});}
  var gmM=[9,6,7,8,5,4,1,2,3,0,11,10];
  if(dj!=null){var t3=gmM[dj];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t3&&aJ[b].l!=='일지')R.push({name:'귀문관살',type:'bad',desc:'일지 → '+aJ[b].l});}
  var bhM=[4,1,7,2,10,7,4,1,10,7];
  if(dg!=null){var t4=bhM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t4)R.push({name:'백호살',type:'bad',desc:'일간 → '+aJ[b].l});}
  var hdM=[11,6,2,9,2,9,5,0,8,3];
  if(dg!=null){var t5=hdM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t5)R.push({name:'학당귀인',type:'good',desc:'일간 → '+aJ[b].l});}
  var seen={};return R.filter(function(r){var k=r.name+r.desc;if(seen[k])return false;seen[k]=1;return true;});
}

function calcSajuForApp(y,m,d,h,min,cityLng){
  // ★ 진태양시 보정: 출생지 경도 기반
  var trueSolarMin = 0;
  var trueH = h, trueMin = min;
  if(h!==null && h!==undefined && h!=='' && cityLng && cityLng > 0){
    trueSolarMin = getTrueSolarCorrection(y, m, d, cityLng);
    var totalMin = (+h)*60 + (+min||0) + trueSolarMin;
    // 날짜 변경선 처리
    if(totalMin < 0) totalMin += 1440;
    if(totalMin >= 1440) totalMin -= 1440;
    trueH = Math.floor(totalMin / 60);
    trueMin = Math.round(totalMin % 60);
  }
  var hb=(trueH!==null&&trueH!==undefined&&trueH!=="")?Math.floor(((+trueH+1)%24)/2):-1;
  var s=calculateSaju(y,m,d,hb,h,min); // 절기 비교는 원래 KST 시간 사용
  // 시주만 진태양시 기준으로 재계산
  if(hb>=0 && trueSolarMin !== 0){
    var trueHB = Math.floor(((+trueH+1)%24)/2);
    s.hj = trueHB;
    var hss=[0,2,4,6,8]; s.hg=(hss[s.dg%5]+trueHB)%10;
  }
  var P=[{l:"연주",s:TGAN_KR[s.yg],b:JIJI_KR[s.yj],gi:s.yg,bi:s.yj},{l:"월주",s:TGAN_KR[s.mg],b:JIJI_KR[s.mj],gi:s.mg,bi:s.mj},{l:"일주",s:TGAN_KR[s.dg],b:JIJI_KR[s.dj],gi:s.dg,bi:s.dj},{l:"시주",s:s.hg!=null?TGAN_KR[s.hg]:"?",b:s.hj!=null?JIJI_KR[s.hj]:"?",gi:s.hg,bi:s.hj}];
  var el={'목':0,'화':0,'토':0,'금':0,'수':0};
  P.forEach(function(p){if(p.gi!=null)el[OHAENG_TGAN[p.gi]]++;if(p.bi!=null)el[OHAENG_JIJI[p.bi]]++;});
  var ss=P.map(function(p){return{pillar:p.l,stem:p.s,branch:p.b,ss:p.gi!=null?getSipsung(s.dg,p.gi):''};});
  var jjg=P.map(function(p){if(p.bi==null)return[];return JIJANGGAN_DATA[p.bi].map(function(it){return{stem:TGAN_KR[it.g],oh:OHAENG_TGAN[it.g],days:it.d};});});

  // ★ 수정1: 지지 십성 (정기 기준) — 배우자궁/직업궁 분석 핵심
  var gungwiNames=['조상·외부환경','직업·사회','배우자궁','자녀·노후'];
  var jiSS=P.map(function(p,idx){
    if(p.bi==null)return{pillar:p.l,branch:p.b,ss:'',gungwi:gungwiNames[idx]};
    var jjgArr=JIJANGGAN_DATA[p.bi];
    var jeonggi=jjgArr[jjgArr.length-1]; // 정기=마지막
    var jss=getSipsung(s.dg,jeonggi.g);
    return{pillar:p.l,branch:p.b,ss:jss,gungwi:gungwiNames[idx],jeonggiStem:TGAN_KR[jeonggi.g]};
  });

  // ★ 수정2: 지장간 포함 오행 (AI 정확도용)
  var elFull={'목':0,'화':0,'토':0,'금':0,'수':0};
  // 천간 4개 (각 1점)
  P.forEach(function(p){if(p.gi!=null)elFull[OHAENG_TGAN[p.gi]]++;});
  // 지장간 (정기 0.7, 중기 0.3, 여기 0.15)
  P.forEach(function(p){
    if(p.bi==null)return;
    var jjgArr=JIJANGGAN_DATA[p.bi];
    jjgArr.forEach(function(it,idx){
      var w=(idx===jjgArr.length-1)?0.7:(idx===jjgArr.length-2)?0.3:0.15;
      elFull[OHAENG_TGAN[it.g]]+=w;
    });
  });
  // 소수점 1자리로 정리
  Object.keys(elFull).forEach(function(k){elFull[k]=Math.round(elFull[k]*10)/10;});
  var lackFull=Object.entries(elFull).filter(function(e){return e[1]<0.3;}).map(function(e){return e[0];});
  var hiddenOh=Object.keys(el).filter(function(k){return el[k]===0 && elFull[k]>=0.3;});

  // ★ 수정3: 암합 계산 (천간↔지장간의 숨겨진 합)
  var AMHAP_TABLE=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  var amhapResults=[];
  var ganList=[{v:s.yg,l:'년간'},{v:s.mg,l:'월간'},{v:s.dg,l:'일간'},{v:s.hg,l:'시간'}];
  var jiList=[{jjg:jjg[0],l:'년지',b:P[0].b},{jjg:jjg[1],l:'월지',b:P[1].b},{jjg:jjg[2],l:'일지',b:P[2].b},{jjg:jjg[3],l:'시지',b:P[3].b}];
  var amGungwi={'년지':'조상·외부','월지':'직업·사회','일지':'배우자','시지':'자녀·노후'};
  ganList.forEach(function(gan){
    if(gan.v==null)return;
    jiList.forEach(function(ji){
      ji.jjg.forEach(function(hidden){
        var hg=TGAN_KR.indexOf(hidden.stem);
        if(hg<0)return;
        AMHAP_TABLE.forEach(function(ah){
          if((gan.v===ah[0]&&hg===ah[1])||(gan.v===ah[1]&&hg===ah[0])){
            // 같은 주 내부 암합은 제외 (이미 명시적 관계)
            if(ganList.indexOf(gan)!==jiList.indexOf(ji)){
              amhapResults.push({from:gan.l+TGAN_KR[gan.v],to:ji.l+ji.b+'(지장간 '+hidden.stem+')',hapOh:ah[2],gungwi:amGungwi[ji.l]||''});
            }
          }
        });
      });
    });
  });

  var uns=P.map(function(p){return p.bi!=null?getUnsung(s.dg,p.bi):'';});
  var sinY=P.map(function(p){return p.bi!=null?get12Sinsal(s.yj,p.bi):'';});
  var sinD=P.map(function(p){return p.bi!=null?get12Sinsal(s.dj,p.bi):'';});
  var sals=getSpecialSinsal(s.yg,s.yj,s.mg,s.mj,s.dg,s.dj,s.hg,s.hj);
  return{P:P,el:el,elFull:elFull,lackFull:lackFull,hiddenOh:hiddenOh,dm:TGAN_KR[s.dg],dmEl:OHAENG_TGAN[s.dg],ss:ss,jiSS:jiSS,jjg:jjg,uns:uns,amhap:amhapResults,sinsal:sinY,sinsalDay:sinD,specialSals:sals,raw:s,currentJeolgi:s.cj,sajuYear:s.sy,trueSolarMin:Math.round(trueSolarMin),trueSolarApplied:(trueSolarMin!==0)};
}

/* ====== 대운(大運) 계산 ====== */
function calcDaewoon(saju, birthY, birthM, birthD, birthH, birthMin, gender){
  var raw=saju.raw;
  // 생시 반영한 정밀 JD (시간 미상시 정오 기준)
  var birthJD=dateToJDN(birthY,birthM,birthD);
  if(birthH!==null&&birthH!==undefined&&birthH!==''){birthJD+=(birthH-12)/24;if(birthMin!==null&&birthMin!==undefined&&birthMin!=='')birthJD+=birthMin/1440;}

  // Step 1: 순행/역행 결정 (양남음녀=순행, 음남양녀=역행)
  var isYangGan=(raw.yg%2===0);
  var isMale=(gender==='남성');
  var isForward=(isYangGan&&isMale)||(!isYangGan&&!isMale);

  // Step 2: 전후 절기 찾기 (천문학 계산)
  // ★ KST 보정: 절기 JD(UTC)를 KST로 변환하여 비교
  var KST=9/24;
  var allTerms=[];
  for(var y=birthY-1;y<=birthY+1;y++){
    for(var j=0;j<JG_LONG.length;j++){
      var jt=JG_LONG[j];
      var jd=findSolarTermJD(y,jt.l)+KST;
      allTerms.push({n:jt.n,mb:jt.mb,jd:jd});
    }
  }
  allTerms.sort(function(a,b){return a.jd-b.jd;});

  var prevTerm=null,nextTerm=null;
  for(var i=0;i<allTerms.length;i++){
    if(allTerms[i].jd<=birthJD)prevTerm=allTerms[i];
    if(allTerms[i].jd>birthJD&&!nextTerm)nextTerm=allTerms[i];
  }

  // Step 3: 대운수 계산
  var daysToTerm=isForward?Math.round(nextTerm.jd-birthJD):Math.round(birthJD-prevTerm.jd);
  var daewoonAge=Math.round(daysToTerm/3);
  if(daewoonAge<=0)daewoonAge=1;

  // Step 4: 대운 간지 나열 (월주 기준 순행/역행)
  var ganjiIdx=-1;
  for(var i=0;i<60;i++){if(i%10===raw.mg&&i%12===raw.mj){ganjiIdx=i;break;}}

  var daewoonsArr=[];
  var currentYear=new Date().getFullYear();
  var currentAge=currentYear-birthY+1; // 한국나이
  var currentDWIdx=-1;

  for(var step=1;step<=8;step++){
    var idx=isForward?((ganjiIdx+step)%60+60)%60:((ganjiIdx-step)%60+60)%60;
    var g=idx%10,ji=idx%12;
    var startAge=daewoonAge+(step-1)*10;
    var endAge=startAge+9;
    var ss=getSipsung(raw.dg,g);
    if(currentAge>=startAge&&currentAge<=endAge)currentDWIdx=daewoonsArr.length;
    daewoonsArr.push({
      startAge:startAge,endAge:endAge,
      gan:TGAN_KR[g],ji:JIJI_KR[ji],
      ganH:TGAN[g],jiH:JIJI[ji],
      ss:ss,oh:OHAENG_TGAN[g]
    });
  }

  // 세운 계산 (올해+내년)
  var seYear1=currentYear,seYear2=currentYear+1;
  var seIdx1=((seYear1-4)%60+60)%60,seIdx2=((seYear2-4)%60+60)%60;
  var se1={y:seYear1,gan:TGAN_KR[seIdx1%10],ji:JIJI_KR[seIdx1%12],ganH:TGAN[seIdx1%10],jiH:JIJI[seIdx1%12],ss:getSipsung(raw.dg,seIdx1%10)};
  var se2={y:seYear2,gan:TGAN_KR[seIdx2%10],ji:JIJI_KR[seIdx2%12],ganH:TGAN[seIdx2%10],jiH:JIJI[seIdx2%12],ss:getSipsung(raw.dg,seIdx2%10)};

  return{
    direction:isForward?'순행':'역행',
    daewoonAge:daewoonAge,
    daewoons:daewoonsArr,
    currentDWIdx:currentDWIdx,
    seun:[se1,se2],
    currentAge:currentAge
  };
}

/* ==========================================
   * ★ v28 신규: 대운/세운 vs 원국 합충 분석
   ========================================== */
function analyzeDWSEvsWonkuk(saju, dw){
  var r = saju.raw;
  var wonJis = [];
  if(r.yj!=null) wonJis.push({v:r.yj, l:'년지', kr:JIJI_KR[r.yj]});
  if(r.mj!=null) wonJis.push({v:r.mj, l:'월지', kr:JIJI_KR[r.mj]});
  wonJis.push({v:r.dj, l:'일지', kr:JIJI_KR[r.dj]});
  if(r.hj!=null) wonJis.push({v:r.hj, l:'시지', kr:JIJI_KR[r.hj]});

  var wonGans = [];
  if(r.yg!=null) wonGans.push({v:r.yg, l:'년간', kr:TGAN_KR[r.yg]});
  if(r.mg!=null) wonGans.push({v:r.mg, l:'월간', kr:TGAN_KR[r.mg]});
  wonGans.push({v:r.dg, l:'일간', kr:TGAN_KR[r.dg]});
  if(r.hg!=null) wonGans.push({v:r.hg, l:'시간', kr:TGAN_KR[r.hg]});

  // 천간합 테이블: [a,b,합화오행]
  var GANHAP = [[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  // 지지충 테이블
  var CHUNG_PAIRS = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  // 지지합(육합) 테이블: [a,b,합화오행]
  // ※ 학술 주석: 육합의 합화(合化) 성립 조건
  //    단순히 두 지지가 인접해 있다고 합화가 되는 것이 아님. 합화 성립 요건:
  //    (1) 합화오행이 월령(月令)을 얻거나 사주 전체에서 세력이 강해야 함
  //    (2) 충이나 형으로 합이 파괴되지 않아야 함
  //    (3) 천간 합화(化格)와 달리, 지지 육합의 합화는 학파간 합화 인정 범위가 다름
  //    본 모듈에서는 합화오행을 참조 데이터로만 제공하며, 실제 합화 판별은 별도 로직 필요
  var YUKHAP = [[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
  // 지지삼합 원소
  var SAMHAP_CENTER = [[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
  // 지지형
  var HYUNG_PAIRS = [[2,5],[5,8],[8,2],[3,0],[0,3],[4,4],[6,6],[7,7],[10,10],[1,10],[10,7],[1,4]];
  // 지지해
  var HAE_PAIRS = [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];

  function checkJiRelations(targetJi, targetLabel, targetKr) {
    var results = [];
    // 지지충
    wonJis.forEach(function(wj){
      CHUNG_PAIRS.forEach(function(cp){
        if((targetJi===cp[0]&&wj.v===cp[1])||(targetJi===cp[1]&&wj.v===cp[0]))
          results.push({type:'충',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'충 — 충돌·변동·전환의 에너지',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    // 육합
    wonJis.forEach(function(wj){
      YUKHAP.forEach(function(yh){
        if((targetJi===yh[0]&&wj.v===yh[1])||(targetJi===yh[1]&&wj.v===yh[0]))
          results.push({type:'합',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'합('+yh[2]+') — 결합·협력·새로운 기회',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    // 형
    wonJis.forEach(function(wj){
      HYUNG_PAIRS.forEach(function(hp){
        if(targetJi===hp[0]&&wj.v===hp[1])
          results.push({type:'형',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'형 — 갈등·시련·성장통',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':'관계·환경'});
      });
    });
    // 해
    wonJis.forEach(function(wj){
      HAE_PAIRS.forEach(function(hp){
        if((targetJi===hp[0]&&wj.v===hp[1])||(targetJi===hp[1]&&wj.v===hp[0]))
          results.push({type:'해',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'해 — 은밀한 손해·배신·오해',
            impact:'대인관계'});
      });
    });
    return results;
  }

  function checkGanRelations(targetGan, targetLabel, targetKr) {
    var results = [];
    // 천간합
    wonGans.forEach(function(wg){
      GANHAP.forEach(function(gh){
        if((targetGan===gh[0]&&wg.v===gh[1])||(targetGan===gh[1]&&wg.v===gh[0]))
          results.push({type:'천간합',target:targetLabel+targetKr,won:wg.l+wg.kr,
            desc:targetKr+wg.kr+'합('+gh[2]+') — 결합·협력의 기운'});
      });
    });
    // 천간충 — CHEONGAN_CHUNG 테이블 직접 참조 (정확한 4쌍만)
    if(targetGan!=null){
      wonGans.forEach(function(wg){
        CHEONGAN_CHUNG.forEach(function(cc){
          if((targetGan===cc[0]&&wg.v===cc[1])||(targetGan===cc[1]&&wg.v===cc[0]))
            results.push({type:'천간충',target:targetLabel+targetKr,won:wg.l+wg.kr,
              desc:targetKr+wg.kr+' 천간충 — 갈등과 대립'});
        });
      });
    }
    return results;
  }

  // 현재 대운 vs 원국
  var dwResults = [];
  if(dw.currentDWIdx >= 0){
    var cdw = dw.daewoons[dw.currentDWIdx];
    var dwGanIdx = TGAN_KR.indexOf(cdw.gan);
    var dwJiIdx = JIJI_KR.indexOf(cdw.ji);
    dwResults = checkJiRelations(dwJiIdx, '대운', cdw.ji).concat(
      checkGanRelations(dwGanIdx, '대운', cdw.gan)
    );
  }

  // 세운(올해) vs 원국
  var seResults = [];
  if(dw.seun && dw.seun[0]){
    var se = dw.seun[0];
    var seGanIdx = TGAN_KR.indexOf(se.gan);
    var seJiIdx = JIJI_KR.indexOf(se.ji);
    seResults = checkJiRelations(seJiIdx, se.y+'세운', se.ji).concat(
      checkGanRelations(seGanIdx, se.y+'세운', se.gan)
    );
  }

  // 세운(내년) vs 원국
  var seResults2 = [];
  if(dw.seun && dw.seun[1]){
    var se2 = dw.seun[1];
    var se2GanIdx = TGAN_KR.indexOf(se2.gan);
    var se2JiIdx = JIJI_KR.indexOf(se2.ji);
    seResults2 = checkJiRelations(se2JiIdx, se2.y+'세운', se2.ji).concat(
      checkGanRelations(se2GanIdx, se2.y+'세운', se2.gan)
    );
  }

  // 대운 vs 세운 (운끼리의 충돌)
  var dwSeConflict = [];
  if(dw.currentDWIdx >= 0 && dw.seun && dw.seun[0]){
    var cdw2 = dw.daewoons[dw.currentDWIdx];
    var dji = JIJI_KR.indexOf(cdw2.ji), sji = JIJI_KR.indexOf(dw.seun[0].ji);
    CHUNG_PAIRS.forEach(function(cp){
      if((dji===cp[0]&&sji===cp[1])||(dji===cp[1]&&sji===cp[0]))
        dwSeConflict.push('대운'+cdw2.ji+'과 세운'+dw.seun[0].ji+' 충 → 운의 방향 급변, 큰 전환점');
    });
  }

  return{
    daewoon: dwResults,
    seun1: seResults,
    seun2: seResults2,
    dwSeConflict: dwSeConflict
  };
}

/* ==========================================
   * ★ v28 신규: 합충 우선순위 엔진
   * ※ 학파 차이(學派 差異): 합과 충이 동시에 존재할 때의 우선순위 논쟁
   *    (1) 합피충파(合被沖破) — 淵海子平 계통: 충이 합을 깨뜨린다. 본 모듈 채택.
   *    (2) 합선충후(合先沖後) — 일부 실무파: 합이 먼저 성립하면 충이 작용 못 한다.
   *    (3) 거합(去合) — 三命通會 계통: 충이 합의 한쪽을 가져가면 합이 해소된다.
   *    본 모듈은 (1) 합피충파를 기본으로 하되, 충의 두 지지 중 하나가 합의 구성원이면
   *    합이 파괴되는 것으로 처리한다.
   ========================================== */
function resolveHapChungPriority(relations){
  if(!relations) return {resolved:[], summary:''};
  var haps = (relations.jijiYukhap||[]).concat(relations.jijiSamhap||[]);
  var chungs = relations.jijiChung||[];
  var resolved = [];
  var summary = [];

  // 각 합에 대해, 충이 합을 깨는지(합피충파) 검사
  haps.forEach(function(hap){
    var hapJis = hap.members ? hap.members.map(function(m){return m.v;}) : [];
    var broken = false;
    chungs.forEach(function(chung){
      // 충의 두 지지 중 하나가 합의 구성원이면 → 합 파괴 가능
      if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
        // 인접성 판단: 합 구성원과 충 구성원이 인접 위치(연-월, 월-일, 일-시)면 합이 깨짐
        var hapPositions = hap.members.map(function(m){return m.l;});
        var chungPositions = [chung.a.l, chung.b.l];
        var adjacent = false;
        var posOrder = ['연지','월지','일지','시지'];
        chungPositions.forEach(function(cp){
          hapPositions.forEach(function(hp){
            var ci = posOrder.indexOf(cp), hi = posOrder.indexOf(hp);
            if(Math.abs(ci-hi)<=1) adjacent = true;
          });
        });
        if(adjacent){
          broken = true;
          resolved.push({type:'합피충파', desc: hap.desc + ' → 인접 ' + chung.desc + '에 의해 깨짐'});
          summary.push(hap.desc+'이 '+chung.desc+'에 의해 파괴됨(합피충파)');
        }
      }
    });
    if(!broken){
      // 탐합망충: 합이 충을 흡수하는지
      chungs.forEach(function(chung){
        if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
          resolved.push({type:'탐합망충', desc: hap.desc + '이 ' + chung.desc + '을 흡수함'});
          summary.push(hap.desc+'이 '+chung.desc+'을 흡수(탐합망충)');
        }
      });
    }
  });

  return {resolved: resolved, summary: summary.join(' / ')};
}


// [REMOVED for theory module] Lines 807-820: MBTI 데이터 (TY, DM_AX, IN_OP, DC, DB, strLv, getMBTI)

function analyzeGyeokguk(saju){
  var dg=saju.raw.dg,el=saju.el,ss=saju.ss,dmEl=saju.dmEl;
  var elFull=saju.elFull||saju.el; // ★ 수정4: 지장간 포함 오행 (통관용신 판단용)
  var cnt={비겁:0,식상:0,재성:0,관성:0,인성:0};
  // 천간 십성 카운트 (각 1점) — ★ 일주 천간은 일간(기준점) 자신이므로 제외
  ss.forEach(function(s){if(!s.ss)return;if(s.pillar==='일주')return;if(s.ss==='비견'||s.ss==='겁재')cnt['비겁']++;else if(s.ss==='식신'||s.ss==='상관')cnt['식상']++;else if(s.ss==='편재'||s.ss==='정재')cnt['재성']++;else if(s.ss==='편관'||s.ss==='정관')cnt['관성']++;else if(s.ss==='편인'||s.ss==='정인')cnt['인성']++;});

  // ★ 개선: 지장간 가중치 — 월지(index 1) 가중치 0.7, 나머지 0.3
  saju.jjg.forEach(function(jj,pillarIdx){
    var weight = (pillarIdx === 1) ? 0.7 : 0.3; // 월지=사령, 힘이 강함
    jj.forEach(function(j){
      var g=TGAN_KR.indexOf(j.stem);if(g<0)return;
      var s2=getSipsung(dg,g);
      // 정기(마지막)는 가중치 그대로, 중기·여기는 0.7배
      var w = (jj.indexOf(j) === jj.length-1) ? weight : weight * 0.7;
      if(s2==='비견'||s2==='겁재')cnt['비겁']+=w;
      else if(s2==='식신'||s2==='상관')cnt['식상']+=w;
      else if(s2==='편재'||s2==='정재')cnt['재성']+=w;
      else if(s2==='편관'||s2==='정관')cnt['관성']+=w;
      else if(s2==='편인'||s2==='정인')cnt['인성']+=w;
    });
  });

  // ★ 개선: 월지 득령 보정 — 일간 오행이 월지에서 힘을 얻는지
  var mjName = JIJI_KR[saju.raw.mj];
  var seasonOh = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
  var mjOh = seasonOh[mjName] || '';
  var deukryeong = (mjOh === dmEl); // 월지 오행 = 일간 오행이면 득령
  // 인성 오행이 월지면 간접 득령
  var insungOh = {'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl];
  var ganjeobDeuk = (mjOh === insungOh);
  if(deukryeong) cnt['비겁'] += 1.0; // 득령 보너스
  else if(ganjeobDeuk) cnt['인성'] += 0.5; // 간접 득령

  // ★ elFull은 calcSajuForApp에서 이미 계산됨 (775행에서 선언)

  var sorted=Object.entries(cnt).sort(function(a,b){return b[1]-a[1];}),dominant=sorted[0],weak=sorted[sorted.length-1];
  var selfStr=cnt['비겁']+cnt['인성'],otherStr=cnt['식상']+cnt['재성']+cnt['관성'];
  var strong=selfStr>=otherStr;

  // ★ 개선②: 조후(온도) 분석 — 궁통보감 기반 120개 테이블
  var seasonMap = {'인':1,'묘':1,'진':1,'사':2,'오':2,'미':2,'신':3,'유':3,'술':3,'해':4,'자':4,'축':4};
  var season = seasonMap[mjName] || 0;
  var seasonName = ['','봄(목왕절)','여름(화왕절)','가을(금왕절)','겨울(수왕절)'][season];
  var johuNeeds = '';
  var johuDesc = '';
  var johuYongshin = '';

  // 궁통보감(穹通寶鑑) 조후용신 120개 테이블
  // JOHU[일간인덱스(0-9)][월지인덱스(0-11)] = {oh:필요오행, ys:용신명, desc:해설}
  var JOHU={
  0:{0:{oh:'화',ys:'정화(丁先)+경금(庚後)+병화(佐/해동)',desc:'한겨울 큰 나무가 얼어붙음, 정화를 먼저 쓰고 경금은 나중에. 병화가 해동을 보좌(丁先庚後 丙火佐之)'},1:{oh:'화',ys:'정화(丁先)+경금(庚後)+병화(佐)',desc:'늦겨울 얼어붙은 나무, 정화 먼저 경금 나중. 병화 해동 보좌 후 경금으로 가지치기'},2:{oh:'화',ys:'병화(온기)+계수(윤택)',desc:'초봄 갑목, 아직 추위 남아 병화 필요. 계수로 뿌리 수분'},3:{oh:'금',ys:'경금(가지치기)+병화',desc:'봄의 큰 나무가 무성, 경금(도끼)으로 다듬어야 재목'},4:{oh:'금',ys:'경금(조각)+임수+병화',desc:'늦봄 갑목 울창, 경금으로 다듬고 임수로 뿌리 보강'},5:{oh:'수',ys:'계수(냉각)+경금',desc:'초여름 큰 나무, 계수(비)로 물주기가 절실'},6:{oh:'수',ys:'계수(냉각)',desc:'한여름 큰 나무, 계수가 없으면 말라죽음'},7:{oh:'수',ys:'계수(윤택)+경금',desc:'늦여름 갑목, 뿌리가 마르니 계수로 수분 보충'},8:{oh:'화',ys:'정화(제련)+경금',desc:'가을 큰 나무, 경금 칼날이 강하니 정화로 금을 녹여 제어'},9:{oh:'화',ys:'정화+경금+병화',desc:'가을 큰 나무, 경금이 너무 강해 정화로 녹여야 삶'},10:{oh:'금',ys:'경금(다듬기)+임수',desc:'늦가을 갑목, 경금으로 다듬고 임수로 뿌리 수분'},11:{oh:'화',ys:'정화(丁先)+경금(庚後)+병화(佐/해동)',desc:'초겨울 큰 나무, 정화 먼저 경금 나중. 병화가 해동 보좌'}},
  1:{0:{oh:'화',ys:'병화(햇볕)',desc:'한겨울 화초, 병화(햇볕)가 생존의 관건'},1:{oh:'화',ys:'병화(해동)',desc:'늦겨울 화초, 병화로 해동해야 뿌리가 살아남'},2:{oh:'화',ys:'병화(온기)+계수(수분)',desc:'초봄 화초, 병화로 따뜻하게 하고 계수로 물주기'},3:{oh:'수',ys:'계수(수분)+병화',desc:'봄의 꽃, 물(계수)과 햇볕(병화)의 조화가 핵심'},4:{oh:'수',ys:'계수(수분)+병화',desc:'늦봄 화초, 계수로 물주고 병화로 성장 촉진'},5:{oh:'수',ys:'계수(냉각)',desc:'초여름 화초, 뜨거운 열기에 계수(이슬비)가 절실'},6:{oh:'수',ys:'계수(생존)+신금',desc:'한여름 화초, 계수 없으면 말라죽음. 신금(수원) 보조'},7:{oh:'수',ys:'계수(윤택)+병화',desc:'늦여름 화초, 건조한 토기운에 계수가 급함'},8:{oh:'화',ys:'병화(온기)+계수',desc:'가을 화초, 금의 서리바람에 병화로 온기 확보'},9:{oh:'화',ys:'병화+계수',desc:'가을 화초, 서릿발에 시들지 않으려면 병화 필요'},10:{oh:'수',ys:'계수(수분)+병화',desc:'늦가을 화초, 메마른 땅에 물과 햇볕 동시에 필요'},11:{oh:'화',ys:'병화(생존)+무토',desc:'초겨울 화초, 병화가 최우선 생존조건'}},
  2:{0:{oh:'목',ys:'갑목(연료)',desc:'한겨울 태양, 갑목(장작) 없으면 빛을 잃음'},1:{oh:'목',ys:'갑목(연료)+경금',desc:'늦겨울 태양, 갑목으로 불씨 유지. 경금으로 벌채 보조'},2:{oh:'수',ys:'임수(균형)',desc:'초봄 태양이 강해짐, 임수로 과열 방지하며 균형'},3:{oh:'수',ys:'임수(균형)+경금',desc:'봄의 태양, 임수로 빛과 물의 조화. 만물을 기르는 형상'},4:{oh:'수',ys:'임수(제어)',desc:'늦봄 태양이 점점 강해짐, 임수로 기운 조절'},5:{oh:'수',ys:'임수(냉각)+경금',desc:'초여름 태양, 타오르기 시작하니 임수로 반드시 냉각'},6:{oh:'수',ys:'임수(필수냉각)',desc:'한여름 태양 극성, 임수 없으면 만물이 타버림'},7:{oh:'수',ys:'임수(냉각)+경금',desc:'늦여름 태양, 임수 없으면 과열 폭주. 경금은 수원'},8:{oh:'수',ys:'임수(세척)+갑목',desc:'가을 태양 서서히 약해짐, 임수로 균형하고 갑목 보조'},9:{oh:'수',ys:'임수+갑목',desc:'가을 태양, 금기운에 빛이 흐려지니 갑목(연료) 보조'},10:{oh:'목',ys:'갑목(연료)+임수',desc:'늦가을 태양이 약해지기 시작, 갑목(연료)이 중요'},11:{oh:'목',ys:'갑목(연료)',desc:'초겨울 태양, 갑목 없으면 불이 꺼짐'}},
  3:{0:{oh:'목',ys:'갑목(장작)',desc:'한겨울 촛불, 갑목(장작) 없으면 바로 꺼짐'},1:{oh:'목',ys:'갑목(장작)+경금',desc:'늦겨울 촛불, 갑목으로 불씨 유지가 급선무'},2:{oh:'목',ys:'갑목(연료)',desc:'초봄 촛불, 갑목(연료)이 있으면 안정적 타오름'},3:{oh:'목',ys:'갑목(연료)+경금',desc:'봄의 촛불, 갑목을 경금으로 쪼개서 태움'},4:{oh:'목',ys:'갑목(연료)',desc:'늦봄 촛불, 습한 토기운에 갑목이 있어야 유지'},5:{oh:'목',ys:'갑목(연료)+임수',desc:'초여름 촛불이 너무 밝아짐, 갑목 유지+임수 조절'},6:{oh:'수',ys:'임수(조절)+갑목',desc:'한여름 촛불 과열 위험, 임수로 조절. 갑목은 꾸준히 필요'},7:{oh:'목',ys:'갑목(연료)+임수',desc:'늦여름 촛불, 건조한 토에서 갑목 연료 확보가 핵심'},8:{oh:'목',ys:'갑목(연료)',desc:'가을 촛불, 금의 바람에 흔들리니 갑목 연료 필수'},9:{oh:'목',ys:'갑목+병화',desc:'가을 촛불, 경금(강풍)이 강해 갑목 절실'},10:{oh:'목',ys:'갑목(연료)+경금',desc:'늦가을 촛불, 경금으로 장작 쪼개고 갑목 연소 유지'},11:{oh:'목',ys:'갑목(연료)+경금',desc:'초겨울 촛불, 갑목이 없으면 소멸'}},
  4:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 산이 얼어붙음, 병화로 땅 녹이기가 최우선'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 산, 아직 동토상태. 병화가 급선무'},2:{oh:'화',ys:'병화(온기)+갑목+계수',desc:'초봄 산, 병화로 따뜻하게 하고 갑목으로 활기'},3:{oh:'목',ys:'갑목(소통)+병화+계수',desc:'봄의 산, 갑목이 뿌리내려야 산이 살아남'},4:{oh:'화',ys:'병화+갑목',desc:'늦봄 산, 토 왕성 시기라 갑목으로 소통+병화로 활력'},5:{oh:'수',ys:'임수(관개)+갑목',desc:'초여름 산, 임수(비)로 건조함 해소가 급함'},6:{oh:'수',ys:'임수(냉각)+갑목',desc:'한여름 산, 갈라진 땅에 임수가 절실'},7:{oh:'수',ys:'계수(윤택)+갑목+병화',desc:'늦여름 산, 건조한 토에 물 필요. 갑목으로 활력 보조'},8:{oh:'화',ys:'병화+계수',desc:'가을 산, 추워지기 전 병화 확보. 계수로 수분 유지'},9:{oh:'화',ys:'병화+계수',desc:'가을 산, 서리 내리기 전 병화(따뜻함) 필요'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 산, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 산, 병화가 최우선. 얼어붙은 땅을 녹여야'}},
  5:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 논밭 얼어붙음, 병화로 땅 녹여야 씨앗이 삶'},1:{oh:'화',ys:'병화(해동)+갑목+경금',desc:'늦겨울 논밭, 병화 해동+갑목 밭갈이 준비'},2:{oh:'목',ys:'갑목(경작)+병화+계수',desc:'초봄 논밭, 갑목(쟁기)으로 땅갈고 병화+계수 조화'},3:{oh:'목',ys:'갑목(경작)+계수+병화',desc:'봄의 논밭, 갑목·계수·병화 삼위일체가 풍작의 비결'},4:{oh:'화',ys:'병화+갑목+계수',desc:'늦봄 논밭, 토 두꺼우니 갑목 소통. 적절한 조화'},5:{oh:'수',ys:'계수(관개)+갑목',desc:'초여름 논밭, 가뭄에 계수(관개용수)가 급함'},6:{oh:'수',ys:'계수(생존)+갑목',desc:'한여름 논밭, 계수 없으면 곡식 타버림'},7:{oh:'수',ys:'계수(윤택)+병화+갑목',desc:'늦여름 논밭, 물과 햇볕 조화로 수확 준비'},8:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 수확 후 병화로 다음 시즌 준비'},9:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 서리에 병화로 온기 유지'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 논밭, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 논밭, 병화가 급선무. 얼면 생명력 소멸'}},
  6:{0:{oh:'화',ys:'정화(제련)+병화(해동)+갑목',desc:'한겨울 쇠가 차갑게 굳음, 정화(용광로)로 제련하고 병화(태양)로 해동. 갑목은 정화의 연료'},1:{oh:'화',ys:'정화(제련)+병화(해동)+갑목',desc:'늦겨울 쇠, 정화로 달궈야 날이 서고 병화로 한기 제거. 갑목 벽갑의 준비'},2:{oh:'화',ys:'정화(제련)+갑목',desc:'초봄 쇠, 정화로 제련해야 비로소 명검. 갑목이 정화의 연료'},3:{oh:'화',ys:'정화(제련)+갑목',desc:'봄의 쇠, 목의 극을 받으니 정화로 중재. 丁庚甲 세트로 단련해야 빛남'},4:{oh:'목',ys:'갑목(용도)+정화+임수',desc:'늦봄 쇠, 갑목 자르는 날카로움 발휘. 정화 보조, 임수 세척'},5:{oh:'수',ys:'임수(담금질)+경금',desc:'초여름 쇠, 뜨거운 불에 임수로 담금질. 명검의 조건'},6:{oh:'수',ys:'임수(냉각)+경금',desc:'한여름 쇠가 녹아내림, 임수 냉각 필수'},7:{oh:'수',ys:'임수(냉각)+갑목',desc:'늦여름 쇠, 건조한 토에 묻혀 임수 필요'},8:{oh:'화',ys:'정화(제련)+임수+갑목',desc:'가을 쇠, 금 왕성하니 정화 제련해야 날이 섬. 임수로 담금질'},9:{oh:'화',ys:'정화(제련)+임수',desc:'가을 쇠, 금 과다하니 정화(제련)가 급함. 임수 세척 보조'},10:{oh:'목',ys:'갑목(용도)+임수',desc:'늦가을 쇠, 토에 묻히니 갑목으로 쓸모 찾기'},11:{oh:'화',ys:'정화(제련)+병화(해동)+갑목',desc:'초겨울 쇠, 정화로 제련하고 병화로 해동. 갑목은 벽갑의 재료'}},
  7:{0:{oh:'화',ys:'병화(광택)+임수',desc:'한겨울 보석, 병화(햇볕)에 비춰야 빛남'},1:{oh:'화',ys:'병화(광택)+임수',desc:'늦겨울 보석, 진흙에 묻힌 보석을 병화로 빛내기'},2:{oh:'수',ys:'임수(세척)+병화',desc:'초봄 보석, 임수(맑은 물)로 씻어야 광택'},3:{oh:'수',ys:'임수(세척)+병화',desc:'봄의 보석, 임수 세척+병화에 비추면 찬란한 빛'},4:{oh:'수',ys:'임수(세척)+병화',desc:'늦봄 보석, 습한 흙에서 임수로 닦아야 광택'},5:{oh:'수',ys:'임수(냉각)+계수',desc:'초여름 보석, 더위에 임수로 냉각. 광채 유지'},6:{oh:'수',ys:'임수(보호)+계수',desc:'한여름 보석, 녹지 않게 임수로 보호'},7:{oh:'수',ys:'임수(세척)+계수',desc:'늦여름 보석, 흙탕물에서 임수로 세척해야 빛남'},8:{oh:'수',ys:'임수(광택)+병화',desc:'가을 보석, 임수 광택+병화에 비추면 최상의 빛'},9:{oh:'수',ys:'임수(부드러움)+병화',desc:'가을 보석, 너무 날카로우니 임수로 부드럽게'},10:{oh:'수',ys:'임수(세척)+병화',desc:'늦가을 보석, 토에 묻히니 임수 세척+병화 빛내기'},11:{oh:'화',ys:'병화(빛)+임수',desc:'초겨울 보석, 병화(햇볕)가 있어야 보석으로 빛남'}},
  8:{0:{oh:'화',ys:'병화(해동)+무토',desc:'한겨울 강물 얼어붙음, 병화로 해동 절실'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 강물, 병화로 얼음 녹이기'},2:{oh:'화',ys:'병화(온기)+경금',desc:'초봄 강물, 해빙기에 병화로 온기'},3:{oh:'금',ys:'경금(수원)+갑목',desc:'봄의 강물이 초목에 흡수됨, 경금(수원지)으로 보충'},4:{oh:'목',ys:'갑목(설기)+경금+병화',desc:'늦봄 강물, 토가 막으니 갑목으로 물길 뚫기'},5:{oh:'금',ys:'경금(수원)+임수',desc:'초여름 강물 증발, 경금(수원지) 없으면 바닥 드러남'},6:{oh:'금',ys:'경금(수원)+임수',desc:'한여름 강물 말라감, 경금 절실. 수원지 없으면 갈수기'},7:{oh:'금',ys:'경금(수원)+갑목',desc:'늦여름 강물, 토의 제방에 막혀 경금으로 물길 확보'},8:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 금이 물을 생해 넘치니 갑목으로 설기'},9:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 물이 차고 넘치니 갑목으로 흐름 조절'},10:{oh:'목',ys:'갑목(소통)+병화',desc:'늦가을 강물, 토의 둑에 막혀 갑목 돌파'},11:{oh:'토',ys:'무토(제방)+병화+갑목',desc:'초겨울 강물 범람위험, 무토(둑)로 제어+병화 해동'}},
  9:{0:{oh:'화',ys:'병화(따뜻함)',desc:'한겨울 이슬, 병화 없으면 얼어서 소멸'},1:{oh:'화',ys:'병화(해동)+신금',desc:'늦겨울 이슬, 병화가 생존 조건'},2:{oh:'금',ys:'신금(수원)+병화',desc:'초봄 이슬, 신금(수원)으로 물 보충+병화로 활기'},3:{oh:'금',ys:'경금(수원)+병화',desc:'봄의 이슬, 나무에 흡수되니 경금(수원)으로 보충'},4:{oh:'화',ys:'병화+신금',desc:'늦봄 이슬, 토에 흡수되기 쉬우니 병화+신금 보조'},5:{oh:'금',ys:'경금(수원)+신금',desc:'초여름 이슬 증발위기, 금(수원지)이 절실'},6:{oh:'금',ys:'경금(수원)+신금',desc:'한여름 이슬 완전 증발 위기, 금이 급함'},7:{oh:'금',ys:'경금(수원)+병화',desc:'늦여름 이슬, 건조한 토에 금으로 물 보충'},8:{oh:'화',ys:'병화(온기)+경금',desc:'가을 이슬, 금이 물을 생해주니 병화로 따뜻하게'},9:{oh:'화',ys:'병화+경금',desc:'가을 이슬 차가워짐, 병화 필요'},10:{oh:'금',ys:'신금(수원)+병화+갑목',desc:'늦가을 이슬, 토에 막히니 신금 수원 확보'},11:{oh:'화',ys:'병화(따뜻함)+무토',desc:'초겨울 이슬, 병화 없으면 얼어붙음'}}
  };

  // 조후용신 테이블 조회 (일간 dg + 월지 mj)
  var johuEntry = JOHU[dg] && JOHU[dg][saju.raw.mj];
  if(johuEntry){
    johuNeeds = johuEntry.oh;
    johuYongshin = johuEntry.ys;
    johuDesc = johuEntry.desc;
  }

  // ★ 개선④: 용신 3단계 (조후→통관→억부) + 종격 판별
  var yongshin = '';
  var yongshinType = '';
  var isJonggyeok = false;
  var jonggyeokName = '';
  var jonggyeokDesc = '';

  // ★ 0순위: 종격(從格) 판별 — 한쪽이 압도적이면 따라가야 함
  // ※ 학파 차이(學派 差異): 종격 판별 기준
  //    (1) 적천수 계통: "强衆而不可敵, 以從其勢" — 기세를 따른다. 비율보다 기세 중심.
  //    (2) 자평진전 계통: 월령(月令) 중심. 일간이 월지에서 전혀 힘을 못 받으면 종격 고려.
  //    (3) 본 모듈: 수치 기반(selfRatio < 0.15~0.20) + 통근 검증(건록/제왕/관대면 종격 불가).
  //       임계값 0.15/0.20은 실무 감정 통계 기반 경험치이며, 학파별로 차이가 있을 수 있음.
  //       통근 검증은 "일간이 지지에서 강한 뿌리가 있으면 절대 종격 불가"라는 원칙(다수설).
  var totalOh = (el['목']||0)+(el['화']||0)+(el['토']||0)+(el['금']||0)+(el['수']||0);
  var selfRatio = totalOh > 0 ? selfStr / totalOh : 0.5;
  var bigeobInseong = (cnt['비겁']||0) + (cnt['인성']||0);
  
  // ★ 종격 통근 검증: 일간이 지지에서 건록·제왕·관대면 절대 종격 불가
  var anyStrongRoot = false;
  [saju.raw.yj, saju.raw.mj, saju.raw.dj, saju.raw.hj].forEach(function(ji){
    if(ji == null) return;
    var u = getUnsung(dg, ji);
    if(u === '건록' || u === '제왕' || u === '관대') anyStrongRoot = true;
  });

  // 종재격: 재성이 압도적 + 비겁·인성 거의 없음 + 통근 없음
  if ((cnt['재성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종재격';
    jonggyeokDesc = '재성을 따라가는 사주 — 재물·사업에 올인해야 성공하는 구조. 억지로 자존심 세우면 역효과';
    yongshin = '식상→재성 흐름 강화(재물의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종살격(종관격): 관성이 압도적 + 비겁·인성 거의 없음
  else if ((cnt['관성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종살격';
    jonggyeokDesc = '관성을 따라가는 사주 — 조직·권력 속에서 순응해야 성공. 반항하면 깨짐';
    yongshin = '재성→관성 흐름 강화(조직의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종아격: 식상이 압도적 + 인성 거의 없음 (인성이 식상을 극하므로)
  else if ((cnt['식상']||0) >= 3 && (cnt['인성']||0) <= 0.3 && selfRatio < 0.2 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종아격';
    jonggyeokDesc = '식상을 따라가는 사주 — 표현·창작·예술에 올인해야 성공. 틀에 가두면 폭발';
    yongshin = '비겁→식상 흐름 강화(표현의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종강격: 비겁+인성이 압도적 (극신강인데 식상·재성·관성이 거의 없음)
  else if (bigeobInseong >= 5 && (cnt['식상']||0)+(cnt['재성']||0)+(cnt['관성']||0) <= 0.5 && selfRatio > 0.85) {
    isJonggyeok = true;
    jonggyeokName = '종강격';
    jonggyeokDesc = '자기 힘을 따라가는 사주 — 남의 말 안듣고 자기 길을 가야 성공. 독립·자주가 핵심';
    yongshin = '비겁·인성 유지(자기 에너지를 극대화)';
    yongshinType = '종격';
  }

  // 1순위: 조후용신 (종격이 아닐 때만)
  if(!isJonggyeok && johuYongshin){
    yongshin = johuYongshin;
    yongshinType = '조후';
  }

  // ★ 수정7: 1.5순위 — 병약용신 (특정 십성 과다시 제어)
  if(!isJonggyeok && !yongshin){
    if((cnt['관성']||0) >= 3 && (cnt['식상']||0) < 1){
      yongshin='식상(제관—관성 과다를 식상으로 제어)'; yongshinType='병약';
    } else if((cnt['식상']||0) >= 3 && (cnt['인성']||0) < 1){
      yongshin='인성(제식상—식상 과다를 인성으로 제어)'; yongshinType='병약';
    } else if((cnt['재성']||0) >= 3 && selfRatio > 0.15 && (cnt['비겁']||0) < 1){
      yongshin='비겁(방어—재성 과다에 자기 힘 보강)'; yongshinType='병약';
    } else if((cnt['인성']||0) >= 3 && (cnt['재성']||0) < 1){
      yongshin='재성(제인성—인성 과다를 재성으로 제어)'; yongshinType='병약';
    }
  }

  // ★ 수정4: 2순위 통관용신 — 지장간 포함 오행(elFull) 기준으로 판단
  if(!isJonggyeok && !yongshin){
    // 금목상쟁: 금>=2 && 목>=2 → 통관=수
    if((elFull['금']||0)>=2 && (elFull['목']||0)>=2 && (elFull['수']||0)<0.3){
      yongshin='수(금목소통)'; yongshinType='통관';
    }
    // 수화상충: 수>=2 && 화>=2 → 통관=목
    else if((elFull['수']||0)>=2 && (elFull['화']||0)>=2 && (elFull['목']||0)<0.3){
      yongshin='목(수화소통)'; yongshinType='통관';
    }
    // 목토상쟁: 목>=2 && 토>=2 → 통관=화
    else if((elFull['목']||0)>=2 && (elFull['토']||0)>=2 && (elFull['화']||0)<0.3){
      yongshin='화(목토소통)'; yongshinType='통관';
    }
    // 화금상쟁: 화>=2 && 금>=2 → 통관=토
    else if((elFull['화']||0)>=2 && (elFull['금']||0)>=2 && (elFull['토']||0)<0.3){
      yongshin='토(화금소통)'; yongshinType='통관';
    }
    // 토수상쟁: 토>=2 && 수>=2 → 통관=금
    else if((elFull['토']||0)>=2 && (elFull['수']||0)>=2 && (elFull['금']||0)<0.3){
      yongshin='금(토수소통)'; yongshinType='통관';
    }
  }

  // 3순위: 억부용신 (종격이 아닐 때만)
  if(!isJonggyeok && !yongshin){
    yongshinType='억부';
    if(strong){
      yongshin=cnt['식상']<1?'식상(설기)':cnt['재성']<1?'재성(재물)':'관성(절제)';
    }else{
      yongshin=cnt['인성']<1?'인성(학문,귀인)':'비겁(동료,자립)';
    }
  }

  var ohMap={'비겁':dmEl,'식상':{'목':'화','화':'토','토':'금','금':'수','수':'목'}[dmEl],'재성':{'목':'토','화':'금','토':'수','금':'목','수':'화'}[dmEl],'관성':{'목':'금','화':'수','토':'목','금':'화','수':'토'}[dmEl],'인성':{'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl]};
  var sr=Object.entries(el).sort(function(a,b){return b[1]-a[1];}),lack=sr.filter(function(e){return e[1]===0;}).map(function(e){return e[0];});

  // ★ 신규①: 정식 격국 분류 (월지 정기 기반)
  var mjData = JIJANGGAN_DATA[saju.raw.mj]; // 월지의 지장간
  var jeonggiGan = mjData[mjData.length - 1].g; // 정기 = 배열 마지막
  var jeonggiSS = getSipsung(dg, jeonggiGan); // 정기의 십성
  var gyeokgukName = '';
  var gyeokgukDesc = '';
  if (jeonggiSS === '비견' || jeonggiSS === '겁재') {
    // 비견/겁재면 건록격 또는 양인격 판별
    var iljuUnsung = getUnsung(dg, saju.raw.mj);
    if (iljuUnsung === '건록') { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 스스로 일어서는 힘이 강하고, 남에게 기대지 않는 자립형'; }
    else if (iljuUnsung === '제왕') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 극강의 추진력과 결단력, 잘 쓰면 장군 못 쓰면 화를 부름'; }
    else if (jeonggiSS === '겁재') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 경쟁심이 강하고 승부에 집착, 한번 물면 놓지 않는 기질'; }
    else { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 뭐든 혼자 해내려는 성향, 독립심이 강한 자립형'; }
  } else {
    var gyeokgukMap = {
      '식신': {name:'식신격', desc:'표현·재능·먹거리의 격 — 무언가를 만들고 표현하고 먹이는 것에 재능, 여유롭고 낙천적'},
      '상관': {name:'상관격', desc:'반항·창의·파격의 격 — 기존 틀을 부수는 창의력, 자유로운 영혼, 조직보다 프리랜서'},
      '편재': {name:'편재격', desc:'투자·사업·모험의 격 — 큰 돈을 굴리는 감각, 사업가 기질, 리스크를 즐김'},
      '정재': {name:'정재격', desc:'안정·저축·성실의 격 — 꾸준히 모으는 재테크 체질, 안정적이고 계획적'},
      '편관': {name:'편관격', desc:'도전·권력·군인의 격 — 거친 환경에서 빛나는 리더십, 카리스마와 추진력'},
      '정관': {name:'정관격', desc:'질서·공직·안정의 격 — 체계와 규칙 속에서 성장, 조직 안에서 출세하는 타입'},
      '편인': {name:'편인격', desc:'비범·연구·고독의 격 — 독특한 사고방식, 한 분야를 깊이 파는 연구자 기질'},
      '정인': {name:'정인격', desc:'학문·귀인·어머니의 격 — 배움을 통해 성장, 주변에 귀인이 나타나는 구조'}
    };
    var gInfo = gyeokgukMap[jeonggiSS];
    if (gInfo) { gyeokgukName = gInfo.name; gyeokgukDesc = gInfo.desc; }
    else { gyeokgukName = jeonggiSS + '격'; gyeokgukDesc = ''; }
  }
  // 격국 근거 텍스트
  var gyeokgukBasis = '월지 '+JIJI_KR[saju.raw.mj]+'의 정기 '+TGAN_KR[jeonggiGan]+' → 일간 '+TGAN_KR[dg]+'에 대해 '+jeonggiSS;

  // ★ v28 신규: 화격(化格) 판별 — 천간합이 성립하고 합화오행이 월지에서 힘을 얻을 때
  var isHwakyeok = false;
  var hwakyeokName = '';
  var hwakyeokDesc = '';
  if(!isJonggyeok) {
    var GANHAP_HWA = [{a:0,b:5,oh:'토',name:'갑기합화토'},{a:1,b:6,oh:'금',name:'을경합화금'},
      {a:2,b:7,oh:'수',name:'병신합화수'},{a:3,b:8,oh:'목',name:'정임합화목'},{a:4,b:9,oh:'화',name:'무계합화화'}];
    var allGans = [saju.raw.yg, saju.raw.mg, dg, saju.raw.hg].filter(function(g){return g!=null;});
    // 일간이 합에 참여하는지 체크
    GANHAP_HWA.forEach(function(gh){
      if(dg !== gh.a && dg !== gh.b) return; // 일간이 합에 포함되어야 함
      var partner = (dg === gh.a) ? gh.b : gh.a;
      // ★ 합 상대가 일간과 인접해야 함 (월간 또는 시간만 가능)
      var adjGans = [saju.raw.mg];
      if(saju.raw.hg != null) adjGans.push(saju.raw.hg);
      if(adjGans.indexOf(partner) < 0) return; // 인접하지 않으면 화격 불가
      // 합화오행이 월지에서 득령하는지 확인
      var seasonOh2 = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
      var mjOh2 = seasonOh2[JIJI_KR[saju.raw.mj]] || '';
      if(mjOh2 === gh.oh){
        // ★ 합화오행을 극하는 오행이 강하면 화격 불성립
        var kukOh = {'목':'금','화':'수','토':'목','금':'화','수':'토'};
        var attacker = kukOh[gh.oh];
        if(attacker && (elFull[attacker]||0) >= 2) return; // 극오행 강하면 불가
        // 합화 성립 조건: 비겁·인성이 약하고 (자기 오행 힘이 없어야 변할 수 있음)
        if(bigeobInseong <= 1.5){
          isHwakyeok = true;
          hwakyeokName = gh.name + '격';
          hwakyeokDesc = gh.name + ' — 일간이 본래 오행을 버리고 '+gh.oh+'의 성질로 완전히 변함. 극히 드문 특수격';
        }
      }
    });
    if(isHwakyeok){
      gyeokgukName = hwakyeokName;
      gyeokgukDesc = hwakyeokDesc;
      gyeokgukBasis = '화격 판별: 천간합이 월지에서 득령 + 자기오행 미약';
      isJonggyeok = true; // 화격도 특수격으로 취급
    }
  }

  // ★ v28 신규: 파격(破格) 재산정 — 파격 조건 충족시 용신 조정
  var pagyeokInfo = '';
  var originalGyeokguk = gyeokgukName;
  if(!isJonggyeok && !isHwakyeok) {
    // 개별 십성 카운트 (파격 판별용)
    var _raw = {};
    ss.forEach(function(s2){if(s2.ss) _raw[s2.ss] = (_raw[s2.ss]||0)+1;});
    saju.jjg.forEach(function(jj){jj.forEach(function(j){var g2=TGAN_KR.indexOf(j.stem);if(g2>=0){var s3=getSipsung(dg,g2);_raw[s3]=(_raw[s3]||0)+0.5;}});});

    // 식신격 + 편인 → 효신탈식 (파격)
    if(gyeokgukName==='식신격' && (_raw['편인']||0) >= 1 && (_raw['편재']||0) < 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 식신의 재능을 편인이 빼앗음. 재능은 있으나 발휘가 막힘';
      yongshin = '편재(제편인) — 편인을 제어하여 식신을 살려야 함'; yongshinType = '파격조정';
    }
    // 정관격 + 상관 → 상관견관 (파격)
    else if(gyeokgukName==='정관격' && (_raw['상관']||0) >= 1 && (_raw['편인']||0) < 1){
      pagyeokInfo = '상관견관(傷官見官) — 상관이 정관을 공격. 능력은 있으나 조직과 충돌';
      yongshin = '인성(제상관) — 인성으로 상관을 누르고 정관을 보호'; yongshinType = '파격조정';
    }
    // 정재격/편재격 + 겁재 → 겁재탈재 (파격)
    else if((gyeokgukName==='정재격'||gyeokgukName==='편재격') && (_raw['겁재']||0) >= 1){
      pagyeokInfo = '겁재탈재(劫財奪財) — 재물이 들어와도 빠져나감. 동업·보증 주의';
      yongshin = '관성(제겁재) — 관성으로 겁재를 제어하여 재성 보호'; yongshinType = '파격조정';
    }
    // 편관격 + 식신 없음 → 칠살무제 (파격)
    else if(gyeokgukName==='편관격' && (_raw['식신']||0) < 0.5 && (_raw['편인']||0) < 0.5){
      pagyeokInfo = '칠살무제(七殺無制) — 편관의 압박을 제어할 식신이 없음. 극심한 스트레스';
      yongshin = '식신(제살) — 식신으로 편관을 제어해야 안정'; yongshinType = '파격조정';
    }
    // 편인격 + 식신 → 효신탈식 (파격)  
    else if(gyeokgukName==='편인격' && (_raw['식신']||0) >= 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 편인이 식신을 극함. 생각만 많고 표현이 막힘';
      yongshin = '편재(제편인) — 편재로 편인을 제어'; yongshinType = '파격조정';
    }
  }

  // ★ 종격이면 격국명을 종격으로 오버라이드
  if (isJonggyeok && !isHwakyeok) {
    gyeokgukName = jonggyeokName;
    gyeokgukDesc = jonggyeokDesc;
    gyeokgukBasis = '종격 판별: 한쪽 세력이 압도적 (자기편비율 ' + Math.round(selfRatio*100) + '%)';
  }

  // ★ 신규②: 신강도 점수 (0~100)
  var totalStr = selfStr + otherStr;
  var strengthScore = totalStr > 0 ? Math.round(selfStr / totalStr * 100) : 50;
  var strengthGrade = '';
  if (strengthScore >= 80) strengthGrade = '극신강';
  else if (strengthScore >= 60) strengthGrade = '신강';
  else if (strengthScore >= 45) strengthGrade = '중화';
  else if (strengthScore >= 25) strengthGrade = '신약';
  else strengthGrade = '극신약';

  // ★ 신규③: 오행 흐름(순환) 분석
  var ohOrder = ['목','화','토','금','수'];
  var flowCuts = []; // 끊어진 구간
  var flowStrong = []; // 강한 구간
  for (var fi = 0; fi < 5; fi++) {
    var from = ohOrder[fi];
    var to = ohOrder[(fi + 1) % 5];
    var fromCnt = el[from] || 0;
    var toCnt = el[to] || 0;
    var key = from + to;
    if (fromCnt >= 1 && toCnt === 0 && OHENG_FLOW_DESC[key]) {
      flowCuts.push(OHENG_FLOW_DESC[key].chain + ' 단절 (' + OHENG_FLOW_DESC[key].cut + ')');
    }
    if (fromCnt >= 2 && toCnt >= 2) {
      flowStrong.push(from + '→' + to + ' 강력 (에너지가 풍부하게 흐름)');
    }
  }
  var flowText = '';
  if (flowCuts.length > 0) flowText += '단절: ' + flowCuts.join(' / ');
  if (flowStrong.length > 0) flowText += (flowText ? '\n' : '') + '강한흐름: ' + flowStrong.join(', ');
  if (!flowText) flowText = '모든 오행이 고르게 순환하는 구조 (균형형)';
  var flowSummary = '오행분포: ' + ohOrder.map(function(o){ return o + '=' + (el[o]||0); }).join(' ') + '\n' + flowText;

  // ★ 신규④: 납음오행 (일주 기준)
  var napeumInfo = getNapeum(dg, saju.raw.dj);
  var napeumText = napeumInfo ? napeumInfo.name + ' — ' + napeumInfo.desc : '';

  return{cnt:cnt,dominant:dominant,weak:weak,strong:strong,
    yongshin:yongshin,yongshinType:yongshinType,ohMap:ohMap,
    selfStr:selfStr,otherStr:otherStr,lack:lack,domOh:sr[0],
    deukryeong:deukryeong,
    // 조후 정보
    season:season,seasonName:seasonName,johuNeeds:johuNeeds,johuDesc:johuDesc,johuYongshin:johuYongshin,
    // ★ 신규 필드
    gyeokgukName:gyeokgukName, gyeokgukDesc:gyeokgukDesc, gyeokgukBasis:gyeokgukBasis,
    strengthScore:strengthScore, strengthGrade:strengthGrade,
    flowSummary:flowSummary, napeumText:napeumText,
    isJonggyeok:isJonggyeok, jonggyeokName:jonggyeokName,
    pagyeokInfo:pagyeokInfo, isHwakyeok:isHwakyeok
  };
}

// ============================================================
// Part B: 합충형 + 프롬프트 + ILJU_DATA + AI 스트리밍
// ============================================================



// ★★★ Level A: 십성을 "해석 맥락"으로 변환하는 사전 ★★★
var SS_CONTEXT = {
  '비견': {
    general: '나와 같은 에너지. 승부욕, 자존심, 독립심',
    spouse: '배우자가 친구 같은 관계. 동등한 파트너십을 원하지만 주도권 다툼 가능',
    career: '경쟁 환경에서 빛남. 동업보다 독자 노선. 자기 방식을 고수',
    child: '말년에 자기 에너지가 넘침. 독립적인 노후',
    outer: '세상과 대등하게 부딪히려는 에너지'
  },
  '겁재': {
    general: '내 것을 지키려는 강한 에너지. 경쟁심과 소유욕',
    spouse: '연애에서 소유욕이 강해짐. 상대를 내 편으로 만들고 싶은 욕구. 질투의 근원',
    career: '돈을 벌면 빼앗기거나 쓰게 되는 패턴. 동업 주의',
    child: '말년에 재물이 흩어지기 쉬운 구조. 자녀에게 퍼주는 패턴',
    outer: '세상에서 내 몫을 챙기려는 에너지'
  },
  '식신': {
    general: '여유롭게 즐기고 표현하는 에너지. 먹고 놀고 창작',
    spouse: '연애를 천천히 음미하는 스타일. 급하지 않고 여유로움. 상대를 편하게 해주는 매력',
    career: '창의적 직업에 적합. 콘텐츠, 요리, 예술, 교육. 적성이 곧 직업',
    child: '자녀운 좋음. 말년이 풍요로움',
    outer: '세상에 자기를 자연스럽게 드러내는 에너지'
  },
  '상관': {
    general: '강렬하게 표현하고 기존 틀을 부수는 에너지. 반골기질',
    spouse: '연애에서 상대의 권위를 인정하지 않음. 자유로운 관계를 원함. 끊고 맺음이 확실',
    career: '기존 규칙을 싫어함. 프리랜서, 예술, 창업. 조직 안에서는 마찰',
    child: '자녀가 강한 개성을 가짐. 말년에 변화가 많음',
    outer: '세상의 규칙에 도전하는 에너지'
  },
  '편재': {
    general: '움직이는 돈, 사업적 감각. 돈을 쓸 줄 아는 에너지',
    spouse: '여러 인연을 만나기 쉬운 구조. 활발한 연애. 한 사람에 정착이 늦을 수 있음',
    career: '사업가 기질. 영업, 투자, 유통. 여러 수입원. 돈이 크게 들어오고 크게 나감',
    child: '말년에 재물 변동. 자녀와의 관계에서 돈 이슈',
    outer: '세상에서 돈과 기회를 포착하는 에너지'
  },
  '정재': {
    general: '안정적인 돈, 꾸준한 수입. 저축과 관리의 에너지',
    spouse: '한 사람에게 정하면 깊이 빠짐. 헌신적. 안정적 관계 추구',
    career: '월급, 안정적 직장. 재무, 관리직. 꾸준히 쌓아가는 구조',
    child: '말년 재물 안정. 자녀에게 물려줄 것이 있음',
    outer: '세상에서 안정적 위치를 확보하려는 에너지'
  },
  '편관': {
    general: '외부에서 오는 압박, 통제, 도전. 두려움과 각성의 에너지',
    spouse: '강하고 카리스마 있는 상대에게 끌림. 연애에 긴장감. 밀당이 강렬',
    career: '권위 있는 직업. 군인, 경찰, 법조, 의료. 위기에서 빛나는 리더십',
    child: '말년에 책임과 압박. 편하지 않지만 성취감',
    outer: '세상이 나에게 도전장을 던지는 느낌'
  },
  '정관': {
    general: '질서, 규율, 사회적 인정. 명예와 책임의 에너지',
    spouse: '예의 바르고 신뢰할 수 있는 상대. 안정적이지만 답답할 수 있음',
    career: '공무원, 대기업, 전문직. 조직 안에서 인정받는 구조',
    child: '자녀가 반듯함. 말년에 사회적 지위 유지',
    outer: '세상이 부여한 역할을 성실히 수행'
  },
  '편인': {
    general: '특이한 배움, 직관, 영감. 일반적이지 않은 지적 에너지',
    spouse: '상대를 이해하기 어려운 깊이. 정신적 교감을 중시. 독특한 인연',
    career: '특수 분야. 점술, 심리, 예술, IT, 연구. 남다른 시각으로 승부',
    child: '말년에 영적/정신적 성장. 외로울 수 있지만 깊음',
    outer: '세상을 남과 다른 시각으로 봄'
  },
  '정인': {
    general: '배움, 보호, 어머니의 에너지. 지적 탐구와 안정',
    spouse: '상대에게 보호받고 싶은 욕구. 또는 상대를 돌보는 관계',
    career: '교육, 학문, 연구, 출판. 배운 것을 전달하는 직업',
    child: '말년에 학문적 성취. 지적 활동이 노후의 기쁨',
    outer: '세상에서 배움을 통해 성장하는 에너지'
  }
};

// ★★★ Level A: 신살을 "이 사람의 이야기"로 변환 ★★★
var SINSAL_STORY = {
  '천을귀인': '인생의 결정적 순간에 도움의 손길이 옴. 멘토, 선배, 우연한 만남이 방향을 바꿔줌',
  '문창귀인': '글과 말에 재능. 공부, 시험, 문서 작업에서 행운. 표현력이 무기',
  '역마살': '한 곳에 머물기 힘든 에너지. 이동, 변화, 해외와 인연. 움직일 때 운이 열림',
  '학당귀인': '타고난 학습 능력. 새로운 분야를 빠르게 흡수. 배움 자체가 즐거움',
  '양인살': '평소엔 순하지만 위기에 칼날처럼 각성. 극한 집중력. 위험할 때 진가 발휘',
  '홍염살': '타고난 성적 매력과 이성 흡인력. 연애에서 강렬한 끌림을 만듦. 양날의 검',
  '음양차착': '겉으로 보이는 성별 에너지와 속이 반대. 남자인데 섬세하거나, 여자인데 강인. 이 괴리가 매력이자 혼란',
  '괴강살': '극단적 결단력. 한번 결정하면 뒤돌아보지 않음. 올인 아니면 올아웃',
  '화개살': '예술·종교·철학에 끌림. 정신세계가 깊음. 세속적 성공보다 의미를 찾음',
  '도화살': '사람을 끌어당기는 매력. 연예, 서비스, 대인관계에서 빛남',
  '겁살': '갑작스러운 변화에 노출되기 쉬움. 하지만 위기 대응력도 함께 있음',
  '망신살': '체면이 무너지는 순간이 올 수 있음. 하지만 이것이 오히려 진짜 자기를 찾는 계기',
  '천문성': '직관과 영감. 보이지 않는 것을 감지하는 능력. 상담, 심리, 예술에 재능'
};

// ★★★ Level A: 궁위별 해석 맥락 생성 ★★★
function buildGungwiContext(saju, gg) {
  var result = {};
  var jiSSArr = saju.jiSS || [];

  // 배우자궁 (일지)
  var spouseSS = jiSSArr[2] ? jiSSArr[2].ss : null;
  if (spouseSS && SS_CONTEXT[spouseSS]) {
    result.spouse = '★배우자궁 읽기: ' + SS_CONTEXT[spouseSS].spouse;
  }

  // 직업궁 (월지)
  var careerSS = jiSSArr[1] ? jiSSArr[1].ss : null;
  if (careerSS && SS_CONTEXT[careerSS]) {
    result.career = '★직업궁 읽기: ' + SS_CONTEXT[careerSS].career;
  }

  // 자녀궁/노후궁 (시지)
  var childSS = jiSSArr[3] ? jiSSArr[3].ss : null;
  if (childSS && SS_CONTEXT[childSS]) {
    result.child = '★노후궁 읽기: ' + SS_CONTEXT[childSS].child;
  }

  // 외부환경 (년지)
  var outerSS = jiSSArr[0] ? jiSSArr[0].ss : null;
  if (outerSS && SS_CONTEXT[outerSS]) {
    result.outer = '★외부환경 읽기: ' + SS_CONTEXT[outerSS].outer;
  }

  return result;
}

// ★★★ Level A: 신살 스토리 생성 ★★★
function buildSinsalStory(saju) {
  var stories = [];
  if (saju.specialSals) {
    saju.specialSals.forEach(function(s) {
      var story = SINSAL_STORY[s.name];
      if (story) {
        stories.push('★' + s.name + '(' + s.desc + '): ' + story);
      }
    });
  }
  // 추가 신살도
  if (typeof calcExtraSinsal === 'function') {
    var extras = calcExtraSinsal(saju);
    extras.forEach(function(es) {
      var story = SINSAL_STORY[es.name];
      if (story && stories.every(function(s){ return s.indexOf(es.name) < 0; })) {
        stories.push('★' + es.name + '(' + es.desc + '): ' + story);
      }
    });
  }
  return stories.join('\n');
}

// ★★★ Level A: 올해 핵심 사건 요약 ★★★
function buildYearHighlight(dwSeAnalysis, dw, wolunArr, wonJiArr) {
  var highlights = [];

  // 세운 합충 중 가장 강한 것
  if (dwSeAnalysis.seun1.length > 0) {
    dwSeAnalysis.seun1.forEach(function(d) {
      var prefix = '';
      if (d.type.indexOf('충') >= 0) prefix = '⚡변화: ';
      else if (d.type.indexOf('합') >= 0) prefix = '💫기회: ';
      else if (d.type.indexOf('형') >= 0) prefix = '🔥시련: ';
      highlights.push(prefix + d.desc + (d.impact ? ' → ' + d.impact + ' 영역에 영향' : ''));
    });
  }

  // 월운에서 합충이 겹치는 달 찾기
  var hotMonths = [];
  if (wolunArr) {
    wolunArr.forEach(function(w) {
      if (w.group === '관성') hotMonths.push(w.month + ': 책임·압박의 달, 직장에서 긴장 가능');
      if (w.group === '재성') hotMonths.push(w.month + ': 재물 기회의 달, 돈이 움직임');
    });
  }

  return {
    main: highlights.length > 0 ? highlights.join('\n') : '올해 특별한 합충 없음',
    hotMonths: hotMonths.length > 0 ? hotMonths.slice(0, 3).join('\n') : ''
  };
}

// ★★★ Level A: 납음 스토리 변환 ★★★
var NAPEUM_STORY = {
  '해중금': '바다 속에 가라앉은 금. 겉으로 드러나지 않지만 발견되면 엄청난 가치',
  '노중화': '화덕 안의 불. 통제된 열정. 한 곳에 집중하면 무엇이든 녹임',
  '대림목': '큰 숲의 나무. 혼자 서도 장엄하지만 숲 속에서 더 빛남',
  '노방토': '길가의 흙. 많은 사람이 밟고 지나가지만 모든 것의 기초',
  '검봉금': '칼날 위의 금. 날카롭고 결단력 있지만 상처도 쉽게 줌',
  '산두화': '산꼭대기의 불. 높은 이상을 품고 있지만 쉽게 꺼질 수 있음',
  '간하수': '시냇물. 끊임없이 흐르며 장애물을 돌아가는 유연함',
  '성두토': '성벽 위의 흙. 방어와 보호의 에너지. 안전한 공간을 만들어냄',
  '백랍금': '백금. 세공되면 최고의 가치. 시련이 곧 광택',
  '양류목': '버드나무. 유연하게 흔들리지만 뿌리는 깊음. 적응력의 상징',
  '천하수': '하늘에서 내리는 비. 모든 것을 적시는 은혜',
  '대역토': '큰 언덕의 흙. 포용력과 안정감. 많은 것을 품을 수 있는 그릇',
  '사중금': '모래 속의 금. 인내하고 걸러내야 비로소 빛나는 가치',
  '산하화': '산 아래의 불. 따뜻하고 생명력 있는 에너지',
  '평지목': '평지의 나무. 누구에게나 그늘을 제공하는 존재',
  '벽상토': '벽 위의 흙. 장식적이지만 기초가 필요함',
  '금박금': '금박. 화려하지만 얇음. 겉모습과 실속의 괴리',
  '복등화': '등불. 어둠을 밝히는 따뜻한 빛. 주변 사람에게 희망',
  '천상수': '하늘 위의 물(구름). 비전이 크고 이상이 높음',
  '대해수': '큰 바다. 모든 것을 받아들이는 포용력. 깊이를 알 수 없음',
  '상자목': '뽕나무. 실용적이고 생산적. 누에를 먹여 비단을 만듦',
  '대계수': '큰 시내물. 힘차게 흐르며 방향이 확실함',
  '사중토': '모래 흙. 유동적이고 변화가 많음. 적응력',
  '천상화': '하늘의 불(번개). 순간적으로 세상을 밝히는 강렬함',
  '석류목': '석류나무. 겉은 딱딱하지만 안에 풍요로움을 품고 있음',
  '벽력화': '벼락불. 갑작스럽고 강렬. 파괴와 창조를 동시에',
  '송백목': '소나무와 잣나무. 사계절 변하지 않는 절개와 꿋꿋함',
  '장류수': '길게 흐르는 물. 인내와 꾸준함. 결국 바다에 도달',
  '옥상토': '지붕 위의 흙. 높은 곳에서 세상을 내려다보는 시야'
};



// [REMOVED for theory module] Lines 1384-1633: PREMIUM_SYSTEM 프롬프트 텍스트

function postValidateAI(result, dw, saju, gg) {
  if (!result || !result.categories) return result;
  var dwRanges = dw.daewoons.map(function(d) {
    return { start: d.startAge, end: d.endAge, text: d.startAge + '~' + d.endAge + '세' };
  });
  var fixCount = 0;
  result.categories.forEach(function(cat) {
    // v2: subs[{h,b}] 또는 구버전 items[{content,insightText}] 모두 지원
    var entries = cat.subs || cat.items || [];
    entries.forEach(function(item) {
      var txt = item.b || item.content;
      if (!txt) return;
      // ① 대운 나이 범위 교정
      txt = txt.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
        var start = parseInt(s), end = parseInt(e), span = end - start;
        if (span >= 8 && span <= 11) {
          var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
          if (!found) {
            var closest = null, minDiff = 999;
            dwRanges.forEach(function(r) {
              var diff = Math.abs(r.start - start);
              if (diff < minDiff) { minDiff = diff; closest = r; }
            });
            if (closest && minDiff <= 5) {
              fixCount++;
              console.log('[PostValidate] 대운 나이 교정:', match, '→', closest.text);
              return closest.text;
            }
          }
        }
        return match;
      });
      // ② insightText도 교정 (구버전 호환)
      if (item.insightText) {
        item.insightText = item.insightText.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
          var start = parseInt(s), end = parseInt(e), span = end - start;
          if (span >= 8 && span <= 11) {
            var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
            if (!found) {
              var closest = null, minDiff = 999;
              dwRanges.forEach(function(r) {
                var diff = Math.abs(r.start - start);
                if (diff < minDiff) { minDiff = diff; closest = r; }
              });
              if (closest && minDiff <= 5) { fixCount++; return closest.text; }
            }
          }
          return match;
        });
      }
      // ③ 오행 개수 교정 (AI가 오행 숫자를 변조한 경우)
      var ohNames = ['목','화','토','금','수'];
      ohNames.forEach(function(oh) {
        var ohRe = new RegExp(oh + '[=이가] ?(\\d+\\.?\\d*)', 'g');
        txt = txt.replace(ohRe, function(match, num) {
          var aiVal = parseFloat(num);
          var realVal = saju.el[oh];
          if (realVal !== undefined && aiVal !== realVal && Math.abs(aiVal - realVal) >= 1) {
            fixCount++;
            console.log('[PostValidate] 오행 교정:', oh, aiVal, '→', realVal);
            return match.replace(num, String(realVal));
          }
          return match;
        });
      });
      // ④ 세운 연도-간지 불일치 교정
      if (dw.seun) {
        dw.seun.forEach(function(se) {
          var wrongPattern = new RegExp(se.y + '년[^가-힣]*(갑|을|병|정|무|기|경|신|임|계)(자|축|인|묘|진|사|오|미|신|유|술|해)', 'g');
          txt = txt.replace(wrongPattern, function(match, g, j) {
            if (g !== se.gan || j !== se.ji) {
              fixCount++;
              console.log('[PostValidate] 세운 교정:', match, '→', se.y + '년 ' + se.gan + se.ji);
              return se.y + '년 ' + se.gan + se.ji;
            }
            return match;
          });
        });
      }
      // 교정된 텍스트 저장 (v2: b / 구버전: content)
      if (item.b !== undefined) item.b = txt;
      else item.content = txt;
    });
  });
  if (fixCount > 0) console.log('[PostValidate] 총 ' + fixCount + '건 교정 완료');
  return result;
}

// ── 궁합 전용 관계 테이블 ──
var GH_GANHAP=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
var GH_CHUNG_G=[[0,6],[1,7],[2,8],[3,9]];
var GH_YUKHAP=[[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
var GH_CHUNG_J=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
var GH_SAMHAP=[[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
var GH_HYUNG=[[2,5],[5,8],[8,2],[3,0],[0,3]];
var GH_HAE=[[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];
var OH_SANG={'목':'화','화':'토','토':'금','금':'수','수':'목'};
var OH_GEUK={'목':'토','토':'수','수':'화','화':'금','금':'목'};


// [REMOVED for theory module] Lines 1733-1973: CF_COMPAT, getCFC, analyzeGunghap, GUNGHAP_SYSTEM, buildGunghapUserPrompt — MBTI 궁합 + 프롬프트

/* ====== 합충형 엔진 + 60갑자 + 폴백 ====== */
/* ==========================================
   * 합/충/형 계산 엔진
   ========================================== */

// 천간합: 갑기합토, 을경합금, 병신합수, 정임합목, 무계합화
var CHEONGAN_HAP=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
// 지지육합: 자축합토, 인해합목, 묘술합화, 진유합금, 사신합수, 오미합화
var JIJI_YUKHAP=[[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
// 지지삼합
var JIJI_SAMHAP=[[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
// 지지방합
var JIJI_BANGHAP=[[11,0,1,'수'],[2,3,4,'목'],[5,6,7,'화'],[8,9,10,'금']];
// 지지충
var JIJI_CHUNG=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
// 지지형
var JIJI_HYUNG=[[2,5,'무은지형'],[5,8,'지세지형'],[2,8,'무은지형'],[3,3,'자형'],[6,6,'자형'],[9,9,'자형'],[0,3,'무례지형'],[1,10,'은혜지형'],[4,4,'자형'],[7,7,'자형'],[11,11,'자형']];
// 지지파
var JIJI_PA=[[0,9],[1,4],[2,11],[3,6],[5,8],[7,10]];
// ★ 천간충 4쌍 (같은 오행 양양끼리 극)
var CHEONGAN_CHUNG=[[0,6,'갑경충'],[1,7,'을신충'],[2,8,'병임충'],[3,9,'정계충']];
// ★ 지지 육해(害) 6쌍
var JIJI_HAE=[[0,7,'자미해'],[1,6,'축오해'],[2,5,'인사해'],[3,4,'묘진해'],[8,11,'신해해'],[9,10,'유술해']];

function calcRelations(saju){
  var r=saju.raw,result={cheonganHap:[],cheonganChung:[],jijiHap:[],jijiSamhap:[],jijiChung:[],jijiHyung:[],jijiPa:[],jijiHae:[]};
  var gans=[],jis=[];
  var labels=['연','월','일','시'];
  if(r.yg!=null)gans.push({v:r.yg,l:'연간'});
  if(r.mg!=null)gans.push({v:r.mg,l:'월간'});
  gans.push({v:r.dg,l:'일간'});
  if(r.hg!=null)gans.push({v:r.hg,l:'시간'});
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});

  // 천간합
  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_HAP.length;k++){
      var h=CHEONGAN_HAP[k];
      if((gans[i].v===h[0]&&gans[j].v===h[1])||(gans[i].v===h[1]&&gans[j].v===h[0]))
        result.cheonganHap.push({a:gans[i],b:gans[j],oh:h[2],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'합'+h[2]});
    }
  }
  // ★ 천간충
  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_CHUNG.length;k++){
      var cc=CHEONGAN_CHUNG[k];
      if((gans[i].v===cc[0]&&gans[j].v===cc[1])||(gans[i].v===cc[1]&&gans[j].v===cc[0]))
        result.cheonganChung.push({a:gans[i],b:gans[j],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'충',name:cc[2]});
    }
  }
  // 지지육합
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_YUKHAP.length;k++){
      var h=JIJI_YUKHAP[k];
      if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
        result.jijiHap.push({a:jis[i],b:jis[j],oh:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'합'+h[2]});
    }
  }
  // 지지삼합
  for(var k=0;k<JIJI_SAMHAP.length;k++){
    var s=JIJI_SAMHAP[k],found=[];
    for(var i=0;i<jis.length;i++){if(jis[i].v===s[0]||jis[i].v===s[1]||jis[i].v===s[2])found.push(jis[i]);}
    if(found.length>=2){
      var hasCenter=found.some(function(f){return f.v===s[1];});
      if(hasCenter)result.jijiSamhap.push({members:found,oh:s[3],desc:found.map(function(f){return JIJI_KR[f.v];}).join('')+(found.length===3?'삼합':'반합')+s[3]});
    }
  }
  // 지지충
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_CHUNG.length;k++){
      var c=JIJI_CHUNG[k];
      if((jis[i].v===c[0]&&jis[j].v===c[1])||(jis[i].v===c[1]&&jis[j].v===c[0]))
        result.jijiChung.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'충'});
    }
  }
  // 지지형
  for(var i=0;i<jis.length;i++)for(var j=i;j<jis.length;j++){
    if(i===j&&jis[i].v===jis[j].v)continue; // skip same position
    for(var k=0;k<JIJI_HYUNG.length;k++){
      var h=JIJI_HYUNG[k];
      if(h[0]===h[1]){// 자형 - needs same branch in different positions
        if(i!==j&&jis[i].v===h[0]&&jis[j].v===h[1])
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }else{
        if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }
    }
  }
  // ★ 지지해(害)
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_HAE.length;k++){
      var hae=JIJI_HAE[k];
      if((jis[i].v===hae[0]&&jis[j].v===hae[1])||(jis[i].v===hae[1]&&jis[j].v===hae[0]))
        result.jijiHae.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'해',name:hae[2]});
    }
  }
  return result;
}

/* ==========================================
   * 공망(空亡) 계산 - A/B 교차검증 완료
   ========================================== */
function calcGongmang(saju){
  var r=saju.raw, dg=r.dg, dj=r.dj;
  // 방법A: 수학적 계산
  var idx60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){idx60=k;break;}}
  if(idx60<0)return{gm:[],gmNames:[],affected:[]};
  var xunNum=Math.floor(idx60/10), xunStart=xunNum*10;
  var usedJi=[];for(var k=xunStart;k<xunStart+10;k++)usedJi.push(k%12);
  var gmA=[];for(var j=0;j<12;j++)if(usedJi.indexOf(j)<0)gmA.push(j);
  // 방법B: 테이블
  var GMT={0:[10,11],1:[8,9],2:[6,7],3:[4,5],4:[2,3],5:[0,1]};
  var gmB=GMT[xunNum];
  // 교차검증
  if(gmA[0]!==gmB[0]||gmA[1]!==gmB[1])console.warn('공망 A/B 불일치!');
  var gmNames=gmA.map(function(j){return JIJI_KR[j];});
  // 사주 내 공망 해당 확인
  var pillars=[{v:r.yj,l:'연지'},{v:r.mj,l:'월지'},{v:r.dj,l:'일지'}];
  if(r.hj!=null)pillars.push({v:r.hj,l:'시지'});
  var affected=[];
  pillars.forEach(function(p){if(p.v!=null&&gmA.indexOf(p.v)>=0)affected.push(p.l+'('+JIJI_KR[p.v]+')');});
  return{gm:gmA,gmNames:gmNames,affected:affected,
    desc:gmNames.join('·')+'공망'+(affected.length>0?' → '+affected.join(', ')+'에 해당':'→ 사주 내 해당 없음')};
}

/* ==========================================
   * 지장간 힘 비율 계산
   ========================================== */
function calcJijangganRatio(saju){
  var r=saju.raw, dg=r.dg;
  var labels=['연지','월지','일지','시지'];
  var jiVals=[r.yj,r.mj,r.dj,r.hj];
  var result=[];
  for(var i=0;i<4;i++){
    if(jiVals[i]==null){result.push(null);continue;}
    var jjgRaw=JIJANGGAN_DATA[jiVals[i]];
    var total=0;jjgRaw.forEach(function(it){total+=it.d;});
    var items=jjgRaw.map(function(it,idx){
      var ganName=TGAN_KR[it.g];
      var oh=OHAENG_TGAN[it.g];
      var ss=getSipsung(dg,it.g);
      var pct=Math.round(it.d/total*100);
      var role=idx===jjgRaw.length-1?'정기':idx===0?'여기':'중기';
      return{gan:ganName,oh:oh,ss:ss,days:it.d,pct:pct,role:role};
    });
    result.push({pillar:labels[i],ji:JIJI_KR[jiVals[i]],items:items});
  }
  return result;
}

/* ==========================================
   * 신살 해석 키워드
   ========================================== */
var SINSAL_KEYWORDS={
  '천을귀인':{meaning:'위기 때 예상치 못한 곳에서 도움이 옴',personality:'직감력이 뛰어남, 위험 회피 능력',life:'중요한 순간마다 귀인 출현'},
  '백호살':{meaning:'돌발적 변화나 사고를 겪을 수 있음',personality:'결단력 강함, 극적인 전환점이 많은 삶',life:'수술수 가능성, 예상치 못한 전환'},
  '도화살':{meaning:'이성을 끌어당기는 매력이 강함',personality:'예술적 감수성, 사교성 뛰어남',life:'대인관계 풍부, 감정적 끌림이 강함'},
  '역마살':{meaning:'이동과 변동이 많은 삶',personality:'한곳에 정착 어려움, 새로운 환경 적응력 뛰어남',life:'해외 인연, 잦은 이사나 출장'},
  '화개살':{meaning:'예술·종교·철학에 대한 깊은 관심',personality:'고독한 탐구자, 영적 감수성',life:'혼자만의 세계가 풍부, 학문이나 창작 분야 재능'},
  '겁살':{meaning:'돌발적 손실이나 변화를 겪을 수 있음',personality:'과감한 결단력, 충동 조절 필요',life:'위기에서 오히려 기회를 잡는 타입'},
  '재살':{meaning:'재물 관련 예상치 못한 변동',personality:'재물에 대한 집착과 불안이 공존',life:'투자나 사업에서 기복이 있을 수 있음'},
  '천살':{meaning:'하늘에서 내리는 시련과 교훈',personality:'영적 성찰 능력, 고난을 통한 성장',life:'예측 불가한 외부 변화를 겪기 쉬움'},
  '지살':{meaning:'대인관계에서의 갈등과 교훈',personality:'사람 사이 문제에 예민함',life:'관계의 질을 중시하게 됨'},
  '년살':{meaning:'매년 반복되는 패턴적 시련',personality:'인내심이 강해짐',life:'주기적으로 비슷한 도전이 찾아옴'},
  '월살':{meaning:'문서·계약 관련 주의 필요',personality:'꼼꼼한 확인 습관이 중요',life:'서류나 약속 관련 실수 주의'},
  '망신살':{meaning:'체면이나 명예에 타격이 올 수 있음',personality:'자존심이 강하고 체면을 중시',life:'실수로 인한 당혹감을 겪을 수 있음'},
  '장성살':{meaning:'사회적 성취와 명예를 얻는 기운',personality:'리더십이 뛰어남, 야망이 큼',life:'직업적 성취가 돋보임'},
  '반안살':{meaning:'안정과 편안함을 추구하는 기운',personality:'변화보다 안정을 선호',life:'안정적인 기반 위에서 능력 발휘'},
  '육해살':{meaning:'가까운 사람과의 갈등 주의',personality:'친밀한 관계에서 상처받기 쉬움',life:'배우자나 형제와의 관계에 신경 써야'},
  '괴강살':{meaning:'극단적 카리스마와 추진력',personality:'완벽주의, 타협을 모르는 강한 성격, 한번 결정하면 끝까지 밀어붙임',life:'고독한 리더, 극적인 성취와 좌절'},
  '양인살':{meaning:'날카로운 결단력과 강한 추진력',personality:'승부욕 강함, 칼 같은 에너지, 위기에 강한 돌파력',life:'수술수 가능성, 과감한 행동력'},
  '홍염살':{meaning:'강렬한 이성 매력과 정열적 에너지',personality:'매혹적 분위기, 예술적 감수성, 연애에서 정열적',life:'이성의 관심이 많음, 감정 기복'},
  '간여지동':{meaning:'일간과 일지의 기운이 같은 방향으로 치우침',personality:'고집이 강함, 독립적 성향, 자기 세계가 뚜렷',life:'배우자 관계에 주의, 재혼수'},
  '천라':{meaning:'하늘 그물에 걸린 형상',personality:'노력해도 막히는 느낌, 큰 인내 필요',life:'답답함과 정체감, 돌파하면 크게 성장'},
  '지망':{meaning:'땅 그물에 걸린 형상',personality:'현실적 제약이 많음, 실질적 돌파구 필요',life:'환경적 제약, 극복하면 단단해짐'},
  '음양차착':{meaning:'음양 에너지가 엇갈리는 구조',personality:'이중적 면모, 오해 받기 쉬움',life:'관계에서 엇갈림이 잦음, 독특한 매력'},
  '원진살':{meaning:'서로 밀어내는 미묘한 부조화',personality:'가까운 관계에서 애증 교차, 밀당의 에너지',life:'관계의 갈등과 성장이 반복'},
  '귀문관살':{meaning:'예민한 영적 감수성과 강한 직감',personality:'신경 예민, 꿈이나 영감이 강함',life:'심리적 갈등, 직관력 뛰어남'},
  '천덕귀인':{meaning:'하늘의 덕, 재앙을 막아주는 귀인',personality:'관대하고 인덕이 있음',life:'위기에서 보호받는 기운'},
  '월덕귀인':{meaning:'달의 덕, 재앙을 막아주는 귀인',personality:'너그럽고 복이 있음, 관대한 성품',life:'자연스럽게 도움을 받는 운'}
};
function enrichSinsal(saju){
  var base=saju.specialSals.map(function(s){
    var kw=SINSAL_KEYWORDS[s.name];
    if(!kw)return {name:s.name,text:s.name+'('+s.desc+')'};
    return {name:s.name,text:s.name+'('+s.desc+') — '+kw.meaning+', '+kw.personality};
  });
  var baseNames={};
  base.forEach(function(b){baseNames[b.name]=(baseNames[b.name]||0)+1;});
  var extra=calcExtraSinsal(saju).filter(function(e){
    // 기존에 같은 이름이 있으면 추가 안 함 (중복 방지)
    if(baseNames[e.name])return false;
    return true;
  }).map(function(e){
    return {name:e.name,text:e.name+'('+e.desc+') — '+e.meaning+', '+e.personality};
  });
  return base.concat(extra).map(function(item){return item.text;}).join(' / ');
}

/* ==========================================
   * 추가 신살 계산 (괴강/양인/홍염/간여지동/천라지망/음양차착/원진/귀문관/천덕/월덕)
   ========================================== */
function calcExtraSinsal(saju){
  var r=saju.raw,result=[];
  var dg=r.dg,dj=r.dj;
  var jis=[];
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});
  var allGans=[];
  if(r.yg!=null)allGans.push(r.yg);
  if(r.mg!=null)allGans.push(r.mg);
  allGans.push(r.dg);
  if(r.hg!=null)allGans.push(r.hg);
  var allJis=jis.map(function(j){return j.v;});
  var ilju60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){ilju60=k;break;}}

  // ※ 특수 신살 출처 명시:
  //    ① 괴강살(魁罡殺): 三命通會. 庚辰·庚戌·壬辰·壬戌 4일주. "魁罡者, 天之樞紐."
  //    ④ 간여지동(干與支同): 淵海子平. 천간과 지지 정기가 동일한 일주.
  //    ⑥ 음양차착(陰陽差錯): 淵海子平. 12일주(丙子~癸亥). 혼인·인연에 파란이 있는 구조.

  // ① 괴강살
  if([16,46,28,58].indexOf(ilju60)>=0)
    result.push({name:'괴강살',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'극단적 카리스마와 추진력, 타협을 모르는 강한 성격',
      personality:'완벽주의, 고독한 리더, 한번 결정하면 끝까지 밀어붙임'});

  // ② 양인살: 갑-묘,을-진,병-오,정-미,무-오,기-미,경-유,신-술,임-자,계-축
  var YANGIN=[3,4,6,7,6,7,9,10,0,1];
  var yJi=YANGIN[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===yJi){
      result.push({name:'양인살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'날카로운 결단력과 강한 추진력',
        personality:'승부욕 강함, 위기에 강한 돌파력'});break;}}

  // ③ 홍염살: 갑-오,을-신,병-인,정-미,무-진,기-진,경-술,신-유,임-자,계-신
  var HONGYEOM=[6,8,2,7,4,4,10,9,0,8];
  var hJi=HONGYEOM[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===hJi){
      result.push({name:'홍염살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'강렬한 이성 매력과 정열적 에너지',
        personality:'매혹적 분위기, 예술적 감수성'});break;}}

  // ④ 간여지동(干與支同): 천간과 지지 정기가 동일한 일주 (출처: 淵海子平)
  //    甲寅(寅정기=甲), 乙卯(卯정기=乙), 戊辰(辰정기=戊), 己未(未정기=己), 庚申(申정기=庚), 辛酉(酉정기=辛)
  //    ※ v29 수정: 乙巳(巳정기=丙≠乙)→乙卯, 戊午(午정기=丁≠戊)→戊辰 교정, 己未 추가
  var GANYEO=[[0,2],[1,3],[4,4],[5,7],[6,8],[7,9]];
  for(var i=0;i<GANYEO.length;i++){
    if(dg===GANYEO[i][0]&&dj===GANYEO[i][1]){
      result.push({name:'간여지동',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
        meaning:'일간과 일지의 기운이 같은 방향으로 치우침',
        personality:'고집이 강함, 독립적 성향'});break;}}

  // ⑤ 천라지망
  var hasJi=function(v){return allJis.indexOf(v)>=0;};
  if(hasJi(10)&&hasJi(11))
    result.push({name:'천라',desc:'술+해 동시 존재',
      meaning:'하늘 그물에 걸린 형상, 답답함과 정체감',
      personality:'노력해도 막히는 느낌, 큰 인내 필요'});
  if(hasJi(4)&&hasJi(5))
    result.push({name:'지망',desc:'진+사 동시 존재',
      meaning:'땅 그물에 걸린 형상, 현실적 제약',
      personality:'환경적 제약이 많음, 실질적 돌파구 필요'});

  // ⑥ 음양차착: 12개 일주
  if([12,13,14,27,28,29,42,43,44,57,58,59].indexOf(ilju60)>=0)
    result.push({name:'음양차착',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'음양 에너지가 엇갈리는 구조',
      personality:'이중적 면모, 오해 받기 쉬움'});

  // ⑦ 원진살: 자미,축오,인유,묘신,진해,사술
  var WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<WONJIN.length;w++){
      if((jis[i].v===WONJIN[w][0]&&jis[j].v===WONJIN[w][1])||(jis[i].v===WONJIN[w][1]&&jis[j].v===WONJIN[w][0])){
        result.push({name:'원진살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'서로 밀어내는 미묘한 부조화',
          personality:'가까운 관계에서 애증 교차'});}}}}

  // ⑧ 귀문관살: 자유,축오,인미,묘신,진해,사술
  var GUIMUN=[[0,9],[1,6],[2,7],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<GUIMUN.length;w++){
      if((jis[i].v===GUIMUN[w][0]&&jis[j].v===GUIMUN[w][1])||(jis[i].v===GUIMUN[w][1]&&jis[j].v===GUIMUN[w][0])){
        result.push({name:'귀문관살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'예민한 영적 감수성과 강한 직감',
          personality:'신경 예민, 꿈이나 영감이 강함'});}}}}

  // ⑨ 천덕귀인 (월지 기준)
  var CHEONDUK=[{t:1,v:5},{t:0,v:6},{t:0,v:3},{t:0,v:7},{t:0,v:8},{t:0,v:7},{t:1,v:11},{t:0,v:0},{t:0,v:9},{t:1,v:2},{t:0,v:2},{t:0,v:1}];
  if(r.mj!=null){var cd=CHEONDUK[r.mj];var cdf=false;
    if(cd.t===0){for(var i=0;i<allGans.length;i++){if(allGans[i]===cd.v){cdf=true;break;}}}
    else{for(var i=0;i<allJis.length;i++){if(allJis[i]===cd.v){cdf=true;break;}}}
    if(cdf)result.push({name:'천덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+(cd.t===0?TGAN_KR[cd.v]:JIJI_KR[cd.v]),
      meaning:'하늘의 덕, 재앙을 막아주는 귀인',
      personality:'관대하고 인덕이 있음, 위기에서 보호'});}

  // ⑩ 월덕귀인 (월지→천간)
  var WOLDUK={2:2,6:2,10:2,8:8,0:8,4:8,5:6,9:6,1:6,11:0,3:0,7:0};
  if(r.mj!=null&&WOLDUK[r.mj]!==undefined){var wdG=WOLDUK[r.mj];
    for(var i=0;i<allGans.length;i++){if(allGans[i]===wdG){
      result.push({name:'월덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+TGAN_KR[wdG],
        meaning:'달의 덕, 재앙을 막아주는 귀인',
        personality:'너그럽고 복이 있음'});break;}}}

  return result;
}

/* ==========================================
   * 60갑자 일주 특성 데이터
   ========================================== */
var ILJU_DATA={
'갑자':{k:'바다 위의 큰 나무',t:'독립심이 강하고 리더십이 있는 개척자. 자수(子水)가 인수(印綬)가 되어 학습 능력이 뛰어나고, 지혜가 깊습니다.',love:'배우자궁에 정인이 있어 지적이고 배려심 깊은 배우자를 만날 운. 다만 의존성이 생기지 않도록 주의.',job:'교육, 연구, 법조, IT 분야'},
'갑인':{k:'울창한 숲 속 거목',t:'자기 주관이 매우 강하고 진취적. 비견이 일지에 있어 독립적이지만 고집이 셀 수 있습니다. 건록에 앉아 에너지가 넘칩니다.',love:'배우자궁이 비견이라 대등한 관계를 원하며, 비슷한 성향의 파트너와 잘 맞습니다.',job:'사업가, 프리랜서, 스타트업, 창작'},
'갑진':{k:'봄비 머금은 언덕의 나무',t:'진토(辰土) 위의 갑목은 습한 토양에 뿌리를 내린 형상. 재성이 풍부하고 현실적 판단력이 좋습니다.',love:'배우자궁에 편재가 있어 매력적이고 활동적인 배우자. 다만 변화가 많을 수 있습니다.',job:'금융, 부동산, 유통, 무역'},
'갑오':{k:'뜨거운 태양 아래 서 있는 나무',t:'화(火)의 기운이 식상을 만들어 표현력이 뛰어납니다. 사(死)에 앉아 있어 겉으로는 화려하지만 내면은 고독할 수 있습니다.',love:'배우자궁에 식신이 있어 다정하고 표현력 좋은 배우자. 예술적 감각이 있는 사람에게 끌립니다.',job:'예술, 디자인, 마케팅, 교육, 방송'},
'갑신':{k:'가을바람에 흔들리는 나무',t:'편관(偏官)이 일지에 있어 압박감 속에서 성장하는 타입. 절지(絶地)에 앉아 파란만장하지만, 극적 반전의 삶을 삽니다.',love:'배우자궁에 편관이 있어 카리스마 있는 배우자. 때로는 갈등이 성장의 동력이 됩니다.',job:'군경, 법률, 의료, 위기관리, 컨설팅'},
'갑술':{k:'마른 언덕 위 고목',t:'술토(戌土) 위의 갑목은 재성이 있되 건조한 환경. 의지가 강하고 인내심이 있으나, 외로움을 느끼기 쉽습니다.',love:'배우자궁에 편재가 있어 활동적인 배우자. 단, 감정 표현이 서투를 수 있어 대화가 중요합니다.',job:'건축, 토목, 재테크, 부동산 개발'},
'을축':{k:'겨울 정원의 작은 풀',t:'편관(偏官)이 일지에 있어 규율과 체계 안에서 능력을 발휘합니다. 쇠(衰)에 앉아 조용하지만 내면의 힘이 있습니다.',love:'배우자궁에 편관이 있어 듬직하고 체계적인 배우자를 만날 운.',job:'공무원, 교사, 회계, 금융'},
'을묘':{k:'봄날 화원의 꽃',t:'비견이 일지에 있어 자존심이 강하고, 건록에 앉아 자생력이 뛰어납니다. 예민한 감수성과 미적 감각이 돋보입니다.',love:'비견이 배우자궁이라 독립적인 관계를 추구. 서로의 자유를 존중하는 파트너.',job:'디자인, 패션, 글쓰기, 상담, 교육'},
'을사':{k:'화산 옆에 핀 꽃',t:'상관(傷官)이 일지에 있어 창의적이고 언변이 뛰어납니다. 병지(病地)에 앉아 에너지 기복이 있지만 표현력은 최상급.',love:'배우자궁에 상관이 있어 재치있고 말 잘하는 배우자. 다만 잔소리 주의.',job:'방송, 작가, 마케팅, 엔터테인먼트'},
'을미':{k:'여름 들판의 풀꽃',t:'편재(偏財)가 일지에 있어 재물 감각이 좋습니다. 양(養)에 앉아 성장 가능성이 무한합니다.',love:'배우자궁에 편재가 있어 넉넉하고 사교적인 배우자와 인연.',job:'서비스업, 요식업, 투자, 유통'},
'을유':{k:'가을 국화',t:'편관(偏官)이 일지에 있어 외부 압력에 강해지는 구조. 절지(絶地)에 앉아 기복이 크지만, 그만큼 반전의 드라마가 있습니다.',love:'배우자궁에 편관이 있어 강한 성격의 배우자. 밀당보다 진심이 통하는 관계.',job:'법률, 의료, 미용, 예술 비평'},
'을해':{k:'겨울 호숫가 버드나무',t:'정인(正印)이 일지에 있어 학문적 자질이 뛰어나고, 사(死)에 앉아 있지만 내면의 지혜가 깊습니다.',love:'배우자궁에 정인이 있어 지적이고 따뜻한 배우자. 정서적으로 깊은 관계.',job:'교수, 연구원, 상담사, 작가'},
'병자':{k:'한밤의 횃불',t:'정관(正官)이 일지에 있어 사회적 체면과 규율을 중시합니다. 태지(胎地)에 앉아 새로운 시작에 강합니다.',love:'배우자궁에 정관이 있어 성실하고 안정적인 배우자. 신뢰를 기반으로 한 관계.',job:'공기업, 관리직, 행정, 외교'},
'병인':{k:'새벽의 태양',t:'편인(偏印)이 일지에 있어 직관력과 독창성이 뛰어납니다. 장생(長生)에 앉아 에너지가 넘치고 낙천적입니다.',love:'배우자궁에 편인이 있어 독특하고 개성적인 배우자. 정신적 교감이 중요한 관계.',job:'IT, 연구개발, 종교, 철학, 대체의학'},
'병진':{k:'봄날의 뜨거운 태양',t:'식신(食神)이 일지에 있어 표현력이 풍부하고, 관대(冠帶)에 앉아 사회적 활동이 왕성합니다.',love:'배우자궁에 식신이 있어 유머 감각 좋고 다정한 배우자.',job:'교육, 요리, 콘텐츠, 예능, 마케팅'},
'병오':{k:'한낮의 뜨거운 태양',t:'겁재(劫財)가 일지에 있어 경쟁 본능이 강하고, 제왕(帝旺)에 앉아 최고의 에너지 상태입니다. 다만 과열 주의.',love:'배우자궁에 겁재가 있어 열정적이지만 경쟁적인 관계가 될 수 있습니다.',job:'사업, 스포츠, 영업, 투자'},
'병신':{k:'석양의 빛',t:'편재(偏財)가 일지에 있어 다재다능하고 현실 감각이 좋습니다. 병지(病地)에 앉아 체력 관리가 핵심.',love:'배우자궁에 편재가 있어 매력적이고 활발한 배우자.',job:'금융, 무역, 부동산, 엔터테인먼트'},
'병술':{k:'노을 지는 산마루 불꽃',t:'식신(食神)이 일지에 있어 표현력이 좋고, 묘지(墓地)에 앉아 깊은 사색과 축적의 기운이 있습니다.',love:'배우자궁에 식신이 있어 따뜻하고 헌신적인 배우자.',job:'교육, 종교, 역사, 연구, 글쓰기'},
'정축':{k:'촛불 아래 옥토',t:'식신(食神)이 일지에 있어 섬세한 표현력이 돋보입니다. 묘지(墓地)에 앉아 내면의 축적과 깊이가 있습니다.',love:'배우자궁에 식신이 있어 요리잘하고 세심한 배우자.',job:'요리, 공예, 교육, 글쓰기, 상담'},
'정묘':{k:'초원에 깜빡이는 반딧불',t:'편인(偏印)이 일지에 있어 독창적 사고방식을 가졌습니다. 병지(病地)에 앉아 에너지 관리가 중요합니다.',love:'배우자궁에 편인이 있어 독특한 매력의 배우자. 정신적 연결이 깊은 관계.',job:'점술, 심리학, 예술, IT, 대안적 분야'},
'정사':{k:'용광로 속 불꽃',t:'겁재(劫財)가 일지에 있어 경쟁심이 강하고, 제왕(帝旺)에 앉아 에너지가 폭발적입니다.',love:'배우자궁에 겁재가 있어 비슷한 에너지의 파트너. 주도권 다툼에 주의.',job:'사업, 투자, 스포츠, 경쟁적 분야'},
'정미':{k:'여름밤 모닥불',t:'비견(比肩)이 일지에 있어 자존심이 강하고 독립적입니다. 관대(冠帶)에 앉아 사회적 인정을 받습니다.',love:'비견이 배우자궁이라 대등하고 독립적인 관계를 추구합니다.',job:'디자인, 패션, 미용, 교육, 상담'},
'정유':{k:'가을 저녁 촛불',t:'정재(正財)가 일지에 있어 안정적인 재물운을 가졌습니다. 장생(長生)에 앉아 꾸준한 성장이 가능합니다.',love:'배우자궁에 정재가 있어 알뜰하고 현실적인 배우자. 안정적인 가정을 꾸립니다.',job:'금융, 회계, 경영, 교육, 서비스'},
'정해':{k:'겨울밤 아궁이 불',t:'정관(正官)이 일지에 있어 사회적 책임감이 강합니다. 태지(胎地)에 앉아 새로운 시작의 에너지가 있습니다.',love:'배우자궁에 정관이 있어 품격있고 신뢰할 수 있는 배우자.',job:'공무원, 기업 관리직, 법률, 외교'},
'무자':{k:'얼어붙은 대지',t:'정재(正財)가 일지에 있어 재물 관리 능력이 뛰어납니다. 태지(胎地)에 앉아 새로운 가능성이 열려있습니다.',love:'배우자궁에 정재가 있어 현실적이고 알뜰한 배우자.',job:'금융, 부동산, 농업, 자원관리'},
'무인':{k:'봄 산의 바위',t:'편관(偏官)이 일지에 있어 도전 정신이 강합니다. 장생(長生)에 앉아 무한한 성장 가능성이 있습니다.',love:'배우자궁에 편관이 있어 강하고 추진력 있는 배우자.',job:'군경, 스포츠, 건설, 모험적 사업'},
'무진':{k:'드넓은 평야',t:'비견(比肩)이 일지에 있어 자기 신념이 확고합니다. 관대(冠帶)에 앉아 사회적 위상이 높습니다.',love:'배우자궁에 비견이라 대등한 파트너십. 각자의 영역을 존중하는 관계.',job:'정치, 경영, 교육, 종교'},
'무오':{k:'화산 위의 대지',t:'정인(正印)이 일지에 있어 학문적 깊이가 있고 지혜롭습니다. 제왕(帝旺)에 앉아 에너지가 최고조.',love:'배우자궁에 정인이 있어 지적이고 따뜻한 배우자.',job:'교수, 연구, 교육, 컨설팅, 종교'},
'무신':{k:'가을 들판의 바위',t:'식신(食神)이 일지에 있어 표현력이 좋고 재능이 다양합니다. 병지(病地)에 앉아 건강 관리가 중요합니다.',love:'배우자궁에 식신이 있어 유머 감각 좋고 재능있는 배우자.',job:'IT, 기술, 콘텐츠, 요리, 제조'},
'무술':{k:'높은 산봉우리',t:'비견(比肩)이 일지에 있어 고집이 세지만 신뢰감을 줍니다. 묘지(墓地)에 앉아 축적과 저장의 기운.',love:'배우자궁에 비견이라 동등한 관계. 서로 자립한 커플.',job:'건축, 부동산, 종교, 철학'},
'기축':{k:'겨울 옥토의 씨앗',t:'비견(比肩)이 일지에 있어 묵묵한 인내력이 강점입니다. 묘지(墓地)에 앉아 축적하는 힘이 있습니다.',love:'배우자궁에 비견이라 서로 돕는 동반자적 관계.',job:'농업, 요식업, 교육, 금융'},
'기묘':{k:'정원사의 화단',t:'편관(偏官)이 일지에 있어 외부 자극에 민감하게 반응합니다. 병지(病地)에 앉아 체력 관리가 중요합니다.',love:'배우자궁에 편관이 있어 때로는 부딪히지만 성장하게 만드는 배우자.',job:'의료, 법률, 미용, 상담'},
'기사':{k:'화산재 위의 옥토',t:'정인(正印)이 일지에 있어 학문과 지혜에 대한 열정이 있습니다. 제왕(帝旺)에 앉아 내면의 힘이 강력합니다.',love:'배우자궁에 정인이 있어 학식있고 깊은 배우자.',job:'교수, 연구, 종교, 한의학, 철학'},
'기미':{k:'한여름 옥토',t:'비견(比肩)이 일지에 있어 자기 세계가 확고합니다. 관대(冠帶)에 앉아 사회적 활동이 활발합니다.',love:'배우자궁에 비견이라 독립적이면서도 동지적 관계.',job:'교육, 부동산, 요식업, 서비스업'},
'기유':{k:'가을 수확의 들판',t:'식신(食神)이 일지에 있어 먹을 복이 있고 표현력이 뛰어납니다. 장생(長生)에 앉아 꾸준한 성장세.',love:'배우자궁에 식신이 있어 다정다감하고 재능있는 배우자.',job:'요리, 교육, 콘텐츠, 서비스, IT'},
'기해':{k:'겨울 호숫가 들판',t:'정재(正財)가 일지에 있어 재물운이 안정적입니다. 태지(胎地)에 앉아 새로운 시도에 열려있습니다.',love:'배우자궁에 정재가 있어 현실적이고 알뜰한 배우자.',job:'금융, 무역, 유통, 경영'},
'경자':{k:'한밤의 검',t:'상관(傷官)이 일지에 있어 말이 날카롭고 통찰력이 뛰어납니다. 사(死)에 앉아 극적인 전환이 있습니다.',love:'배우자궁에 상관이 있어 재치있고 솔직한 배우자. 입담이 센 관계.',job:'변호사, 평론가, 컨설팅, IT, 저널리즘'},
'경인':{k:'봄 숲의 도끼',t:'편재(偏財)가 일지에 있어 재물 감각이 있고 활동적입니다. 절지(絶地)에 앉아 기복이 크지만 반전이 있습니다.',love:'배우자궁에 편재가 있어 활동적이고 매력적인 배우자.',job:'영업, 무역, 투자, 스타트업'},
'경진':{k:'광산 속 원석',t:'편인(偏印)이 일지에 있어 독특한 사고방식을 가졌습니다. 양(養)에 앉아 성장 가능성이 높습니다.',love:'배우자궁에 편인이 있어 개성적이고 지적 자극을 주는 배우자.',job:'연구개발, IT, 발명, 대체의학'},
'경오':{k:'대장간의 불꽃',t:'편관(偏官)이 일지에 있어 단련 속에서 강해집니다. 목욕(沐浴)에 앉아 변화와 변동이 많습니다.',love:'배우자궁에 편관이 있어 강한 성격의 배우자. 서로 단련하며 성장.',job:'군경, 의료, 스포츠, 중장비, 철강'},
'경신':{k:'보석 세공사',t:'비견(比肩)이 일지에 있어 자부심이 강하고 원칙적입니다. 건록(建祿)에 앉아 자립 능력이 뛰어납니다.',love:'배우자궁에 비견이라 대등한 관계. 서로의 전문성을 인정하는 커플.',job:'금융, 법률, 기술, 정밀산업'},
'경술':{k:'사막의 쇳덩이',t:'편인(偏印)이 일지에 있어 독특한 아이디어와 직관이 있습니다. 쇠(衰)에 앉아 안정을 추구합니다.',love:'배우자궁에 편인이 있어 독특하고 깊이있는 배우자.',job:'연구, 발명, IT, 종교, 심리학'},
'신축':{k:'겨울 광산의 보석',t:'식신(食神)이 일지에 있어 먹을 복이 있고 표현력이 뛰어납니다. 양(養)에 앉아 성장 잠재력이 큽니다.',love:'배우자궁에 식신이 있어 따뜻하고 재능있는 배우자.',job:'요리, 교육, 금융, 보석, 기술'},
'신묘':{k:'봄 정원의 가위',t:'편재(偏財)가 일지에 있어 재물 감각이 좋습니다. 절지(絶地)에 앉아 파란만장하지만 반전이 큽니다.',love:'배우자궁에 편재가 있어 활발하고 사교적인 배우자.',job:'미용, 패션, 유통, 투자'},
'신사':{k:'여름의 보석',t:'정관(正官)이 일지에 있어 사회적 품격이 있습니다. 사(死)에 앉아 있지만 내면의 단단함이 있습니다.',love:'배우자궁에 정관이 있어 품격있고 안정적인 배우자.',job:'공무원, 법률, 외교, 금융'},
'신미':{k:'노을빛 보석',t:'편인(偏印)이 일지에 있어 독창성과 직관이 뛰어납니다. 관대(冠帶)에 앉아 사회적 활약이 있습니다.',love:'배우자궁에 편인이 있어 개성적이고 깊이있는 배우자.',job:'예술, IT, 종교, 대안교육'},
'신유':{k:'순금',t:'비견(比肩)이 일지에 있어 자존심이 매우 강하고, 건록(建祿)에 앉아 자립심이 최고입니다.',love:'배우자궁에 비견이라 독립적인 관계. 강한 자존심끼리 부딪힐 수 있습니다.',job:'금융, 보석, 기술, 법률, 정밀산업'},
'신해':{k:'겨울밤 은하수의 별',t:'상관(傷官)이 일지에 있어 언변이 뛰어나고 창의적입니다. 목욕(沐浴)에 앉아 변화를 즐깁니다.',love:'배우자궁에 상관이 있어 말 잘하고 재치있는 배우자.',job:'작가, 방송, 마케팅, 법률, 컨설팅'},
'임자':{k:'깊은 바다',t:'겁재(劫財)가 일지에 있어 경쟁심이 강하고, 제왕(帝旺)에 앉아 에너지가 최고조입니다.',love:'배우자궁에 겁재가 있어 열정적인 관계. 주도권 경쟁에 주의.',job:'무역, 해운, 금융, 투자, 스포츠'},
'임인':{k:'봄비',t:'식신(食神)이 일지에 있어 표현력이 풍부하고, 병지(病地)에 앉아 있지만 창의력이 넘칩니다.',love:'배우자궁에 식신이 있어 다정하고 따뜻한 배우자.',job:'교육, 예술, 콘텐츠, 요리, 상담'},
'임진':{k:'우기의 호수',t:'편관(偏官)이 일지에 있어 자기 절제력이 강합니다. 묘지(墓地)에 앉아 축적과 저장의 힘이 있습니다.',love:'배우자궁에 편관이 있어 강한 추진력의 배우자.',job:'공무원, 군경, 건설, 수자원'},
'임오':{k:'뜨거운 사막의 오아시스',t:'정재(正財)가 일지에 있어 재물운이 좋습니다. 태지(胎地)에 앉아 새로운 시작에 강합니다.',love:'배우자궁에 정재가 있어 현실적이고 안정적인 배우자.',job:'금융, 유통, 서비스업, 부동산'},
'임신':{k:'가을 폭포',t:'편인(偏印)이 일지에 있어 독창적이고 직관적입니다. 장생(長生)에 앉아 지속적 성장이 가능합니다.',love:'배우자궁에 편인이 있어 독특하고 지적인 배우자.',job:'IT, 연구, 대체의학, 심리학'},
'임술':{k:'마른 강바닥',t:'편관(偏官)이 일지에 있어 위기관리 능력이 뛰어납니다. 관대(冠帶)에 앉아 사회적 입지가 있습니다.',love:'배우자궁에 편관이 있어 카리스마 있는 배우자.',job:'법률, 의료, 위기관리, 건설'},
'계축':{k:'겨울 논의 물',t:'편관(偏官)이 일지에 있어 꼼꼼하고 체계적입니다. 관대(冠帶)에 앉아 사회적 활동이 안정적입니다.',love:'배우자궁에 편관이 있어 듬직하고 체계적인 배우자.',job:'회계, 법률, 교육, 연구'},
'계묘':{k:'봄날의 이슬',t:'식신(食神)이 일지에 있어 감성이 풍부하고 표현력이 뛰어납니다. 장생(長生)에 앉아 성장 에너지가 넘칩니다.',love:'배우자궁에 식신이 있어 다정하고 감성적인 배우자.',job:'예술, 교육, 상담, 글쓰기, 콘텐츠'},
'계사':{k:'여름 소나기',t:'정재(正財)가 일지에 있어 재물 감각이 있습니다. 태지(胎地)에 앉아 새로운 시도가 잘 풀립니다.',love:'배우자궁에 정재가 있어 알뜰하고 현실적인 배우자.',job:'금융, 유통, 서비스업, 기술'},
'계미':{k:'여름밤 안개',t:'편관(偏官)이 일지에 있어 자기 관리가 철저합니다. 묘지(墓地)에 앉아 내면의 축적이 있습니다.',love:'배우자궁에 편관이 있어 안정감 있는 배우자.',job:'교육, 종교, 농업, 서비스업'},
'계유':{k:'가을비',t:'편인(偏印)이 일지에 있어 독창적 사고를 합니다. 병지(病地)에 앉아 건강 관리가 중요합니다.',love:'배우자궁에 편인이 있어 독특한 매력의 배우자.',job:'IT, 연구, 음악, 예술, 심리학'},
'계해':{k:'끝없는 대양',t:'비견(比肩)이 일지에 있어 자기 세계가 넓고 깊습니다. 제왕(帝旺)에 앉아 에너지가 넘칩니다.',love:'배우자궁에 비견이라 대등하고 독립적인 관계.',job:'무역, 해운, 연구, IT, 국제업무'}
};

/* ====== 프로파일 분석기 + 새로운 폴백 v2 ====== */

/* ==========================================
   * 프로파일 분석기 - 이 사람의 "특이점"을 찾아내는 엔진
   ========================================== */
function profileAnalysis(saju,gg,rel){
  var dm=saju.dm,dmEl=saju.dmEl;
  var dayBrSS=saju.ss[2]?saju.ss[2].ss:'',dayUns=saju.uns[2]||'';
  var ySS=saju.ss[0]?saju.ss[0].ss:'',mSS=saju.ss[1]?saju.ss[1].ss:'',hSS=saju.ss[3]?saju.ss[3].ss:'';
  var strongUns=['건록','제왕','관대','장생'].indexOf(dayUns)>=0;

  // 십성 카운트
  var ssCount={};
  saju.ss.forEach(function(s){if(s.ss){ssCount[s.ss]=(ssCount[s.ss]||0)+1;}});

  // 특수신살 분류
  var salGood=saju.specialSals.filter(function(s){return s.type==='good';});
  var salBad=saju.specialSals.filter(function(s){return s.type==='bad';});
  var hasDohwa=salBad.some(function(s){return s.name==='도화살';});
  var hasYeokma=saju.specialSals.some(function(s){return s.name==='역마살';});
  var hasBaekho=salBad.some(function(s){return s.name==='백호살';});
  var hasGwimun=salBad.some(function(s){return s.name==='귀문관살';});
  var hasCheonEul=salGood.some(function(s){return s.name==='천을귀인';});

  // 합충형 요약
  var chungList=rel.jijiChung.map(function(c){return c.desc;});
  var hapList=rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;}));
  var samhapList=rel.jijiSamhap.map(function(h){return h.desc;});
  var hyungList=rel.jijiHyung.map(function(h){return h.desc;});

  // 오행 과다/부족 분석
  var elSorted=Object.entries(saju.el).sort(function(a,b){return b[1]-a[1];});
  var maxEl=elSorted[0],minEl=elSorted[elSorted.length-1];
  var excessEl=(maxEl[1]>=4)?maxEl[0]:null;
  var zeroEls=gg.lack;

  // 이 사람의 핵심 키워드들 (에너지 타입)
  var energyType='balanced';
  if(gg.cnt['식상']>=2.5) energyType='expressive';
  else if(gg.cnt['비겁']>=2.5) energyType='independent';
  else if(gg.cnt['재성']>=2.5) energyType='practical';
  else if(gg.cnt['관성']>=2.5) energyType='disciplined';
  else if(gg.cnt['인성']>=2.5) energyType='intellectual';

  // 감정 폭주 유형
  var angerType='suppress'; // default
  if(ssCount['상관']>=1) angerType='verbal';
  else if(ssCount['겁재']>=1) angerType='explosive';
  else if(dmEl==='화') angerType='flashfire';
  else if(dmEl==='수') angerType='flood';
  else if(dmEl==='금') angerType='blade';
  else if(dmEl==='토') angerType='earthquake';
  else if(dmEl==='목') angerType='stubborn';

  // 연애 유형
  var loveType='standard';
  if(hasDohwa) loveType='charming';
  else if(dayBrSS.indexOf('편관')>=0||dayBrSS.indexOf('정관')>=0) loveType='authoritative';
  else if(dayBrSS.indexOf('식신')>=0||dayBrSS.indexOf('상관')>=0) loveType='romantic';
  else if(dayBrSS.indexOf('비견')>=0||dayBrSS.indexOf('겁재')>=0) loveType='independent';
  else if(dayBrSS.indexOf('인')>=0) loveType='intellectual';
  else if(dayBrSS.indexOf('재')>=0) loveType='devoted';

  // 재물 유형
  var wealthType='none';
  if(ssCount['편재']>=2) wealthType='windfall';
  else if(ssCount['정재']>=1&&ssCount['편재']>=1) wealthType='dual';
  else if(ssCount['정재']>=1) wealthType='steady';
  else if(ssCount['편재']>=1) wealthType='venture';
  else if(gg.cnt['식상']>=2) wealthType='talent';
  else wealthType='late';

  return {
    dm:dm,dmEl:dmEl,dayBrSS:dayBrSS,dayUns:dayUns,strongUns:strongUns,
    ySS:ySS,mSS:mSS,hSS:hSS,
    ssCount:ssCount,salGood:salGood,salBad:salBad,
    hasDohwa:hasDohwa,hasYeokma:hasYeokma,hasBaekho:hasBaekho,hasGwimun:hasGwimun,hasCheonEul:hasCheonEul,
    chungList:chungList,hapList:hapList,samhapList:samhapList,hyungList:hyungList,
    excessEl:excessEl,zeroEls:zeroEls,maxEl:maxEl,minEl:minEl,
    energyType:energyType,angerType:angerType,loveType:loveType,wealthType:wealthType,
    elSorted:elSorted
  };
}


// [REMOVED for theory module] Lines 2435-2611: MI (MBTI 강도 프로파일), getMBTIFromChoices, miKeyParam, miAllParam, miKey, miAll — MBTI 함수


// ============================================================

// [REMOVED for theory module] Lines 2614-3331: streamSonnet, runSajuAnalysis, runGunghapAnalysis — API 호출 + 프롬프트 조립


// ============================================================
// Part C — 키워드 데이터 + 물상 + 폴백 (mbts.html 3929~5834)
// ============================================================

/* ==========================================
   * 십성 × 기둥위치 해석 데이터 (10종 × 4기둥 = 40종)
   ========================================== */
var SSP={
  '비견':{
    '연주':'어린 시절부터 경쟁 환경에서 자랐어요. 형제자매와의 라이벌 의식, 혹은 또래 집단에서 "내가 1등"이라는 에너지. 일찍부터 자립심이 형성된 구조.',
    '월주':'20대에 독립하려는 힘이 강해요. 부모 그늘에서 벗어나 자기 힘으로 서려는 욕구가 커지는 시기. 동료와의 경쟁 속에서 성장합니다.',
    '일주':'자아가 매우 강합니다. 타협보다 소신, 협력보다 독립. 배우자도 대등한 관계를 원하며, 의존적 파트너를 싫어해요.',
    '시주':'말년에도 독립적이고 활동적이에요. 자녀와도 동등한 관계를 추구하며, 은퇴 후에도 자기 일을 찾아 움직이는 구조.'
  },
  '겁재':{
    '연주':'어린 시절 빼앗기거나 경쟁해야 했던 경험이 있어요. 형제간 갈등이나, 가정 내에서 자원을 놓고 다투는 기운. 이 경험이 "내 것을 지키겠다"는 강한 의지를 만들었습니다.',
    '월주':'20대에 강한 경쟁 환경에 놓여요. 동기와의 치열한 경쟁, 혹은 사업에서의 치열한 다툼. 이 시기의 경험이 승부 근성을 만듭니다.',
    '일주':'내면에 강한 경쟁 본능이 있어요. 누군가 자기 영역을 침범하면 본능적으로 반발합니다. 배우자와의 관계에서 주도권 다툼이 생길 수 있어요.',
    '시주':'말년에 재물 손실이나 경쟁에 주의해요. 하지만 이 에너지를 사업적 추진력으로 쓰면 후반부에도 왕성한 활동이 가능합니다.'
  },
  '식신':{
    '연주':'어린 시절부터 표현력이 뛰어났어요. 말을 일찍 배웠거나, 어릴 때부터 "쟤 좀 특이한 아이다"라는 소리를 들었을 가능성. 먹는 것에 대한 행복도 일찍 깨달은 구조.',
    '월주':'20대에 재능이 개화해요. 표현의 분야에서 두각을 나타내는 시기. 글, 말, 요리, 음악, 예술 — 무언가를 만들어내는 활동에서 인정받습니다.',
    '일주':'가까운 사람에게 다정하고 따뜻해요. 요리해주고, 이야기해주고, 편안하게 해주는 사람. 배우자에게 헌신적이며, 먹을 복이 있는 구조.',
    '시주':'말년이 풍요로워요. 자녀가 효도하거나, 취미 활동으로 행복한 노년을 보내는 구조. 은퇴 후 새로운 창작 활동을 시작할 수 있어요.'
  },
  '상관':{
    '연주':'어린 시절부터 반항적이거나 언변이 뛰어났어요. "왜요?"를 입에 달고 사는 아이, 선생님과 자주 부딪히는 학생. 이 에너지가 나중에 창의력의 뿌리가 됩니다.',
    '월주':'20대에 기존 체제에 대한 불만이 커져요. 직장 상사와 부딪히거나, 사회적 규범에 반기를 들거나. 이 시기의 반항이 자기만의 길을 찾는 원동력이 됩니다.',
    '일주':'속마음이 솔직하고 날카로워요. 가까운 사람에게 가장 진솔하지만 가장 아프게도 말하는 양면성. 배우자와의 관계에서 말 조심이 핵심 과제.',
    '시주':'말년에 표현 욕구가 강해져요. 할 말 다 하고 사는 노년이 될 가능성. 자녀와의 관계에서 솔직함이 때로는 갈등의 원인이 됩니다.'
  },
  '편재':{
    '연주':'어린 시절부터 돈에 대한 감각이 있었어요. 용돈을 모으거나, 부모의 사업을 곁에서 본 경험. 경제적으로 활발한 가정 환경에서 자란 구조.',
    '월주':'20대부터 돈을 만지기 시작해요. 여러 아르바이트, 투자 시작, 사업적 감각의 발현. 이 시기에 재물을 다루는 경험이 쌓이면 후반부에 크게 열립니다.',
    '일주':'내면에 강한 재물 욕구가 있어요. 여러 수입원을 추구하고, 새로운 기회에 빠르게 반응합니다. 배우자도 활동적이고 매력적인 사람에게 끌리는 구조.',
    '시주':'말년에 뜻밖의 재물이 들어와요. 투자 수익이나 예상치 못한 수입원이 생기는 구조. 하지만 충동적 투자에 주의.'
  },
  '정재':{
    '연주':'안정적인 가정 환경에서 자랐어요. 부모가 성실하게 가정을 꾸려온 모습을 보며, 자연스럽게 "안정이 최고"라는 가치관이 형성.',
    '월주':'20대에 꾸준한 수입 구조를 만들어요. 취직 후 안정적으로 커리어를 쌓거나, 저축 습관이 형성되는 시기. 이 시기의 안정이 평생의 자산이 됩니다.',
    '일주':'현실적이고 알뜰한 내면이에요. 돈 관리를 잘하고, 불필요한 지출을 싫어해요. 배우자도 안정적이고 현실적인 사람에게 끌립니다.',
    '시주':'말년에 재물이 안정적으로 모여요. 연금, 적금, 부동산 등 차곡차곡 쌓아온 것의 결실을 누리는 구조.'
  },
  '편관':{
    '연주':'어린 시절 권위적 환경에서 자랐어요. 엄격한 아버지, 강한 규율, 혹은 외부 압력(전학, 이사, 환경 변화). 이 압박이 강한 정신력의 뿌리가 되었습니다.',
    '월주':'20대에 외부 압력과 도전에 직면해요. 직장에서의 상사 압박, 사회적 기대, 경쟁적 환경. 이 시기를 잘 버티면 강한 실행력이 만들어집니다.',
    '일주':'내면에 자기 채찍질의 에너지가 있어요. 스스로에게 엄격하고, 편안히 쉬는 것에 죄책감을 느끼기도 합니다. 배우자도 강한 성격일 가능성.',
    '시주':'말년에도 사회적 책임감이 있어요. 은퇴 후에도 역할이 주어지거나, 자녀에 대한 책임을 느끼는 구조. 편하게 쉬는 노년보다 활동적인 노년.'
  },
  '정관':{
    '연주':'질서 잡힌 가정에서 자랐어요. 예의범절, 사회적 체면을 중시하는 환경. "남에게 부끄럽지 않게 살아라"가 무의식에 새겨져 있습니다.',
    '월주':'20대에 사회적 인정을 받기 시작해요. 안정적 직장, 좋은 평판, 주변의 신뢰. 이 시기의 성실함이 커리어의 토대가 됩니다.',
    '일주':'내면에 품격과 질서에 대한 욕구가 있어요. "올바르게 살고 싶다"는 본능. 배우자도 품격있고 신뢰할 수 있는 사람에게 끌립니다.',
    '시주':'말년에 명예로운 위치를 유지해요. 사회적 존경, 후배들의 신뢰, 안정적인 노후. 자녀도 성실하게 자랄 가능성이 높아요.'
  },
  '편인':{
    '연주':'독특한 환경에서 자랐어요. 일반적이지 않은 가정 — 외국 생활, 종교적 환경, 예술적 가정, 혹은 어린 시절 외로운 시간이 많았던 경우. 이 경험이 독창적 사고의 뿌리.',
    '월주':'20대에 비주류적 관심사에 빠져요. 남들과 다른 길을 가려는 욕구, 독특한 분야에 대한 탐구. 이 시기의 "다름"이 나중에 경쟁력이 됩니다.',
    '일주':'내면이 매우 독특해요. 남들과 다른 생각, 비범한 관심사, 일반적이지 않은 취향. 배우자도 개성적이고 지적 자극을 주는 사람에게 끌립니다.',
    '시주':'말년에 종교, 철학, 대안적 삶에 관심이 깊어져요. 세속적 가치보다 정신적 가치를 추구하는 노년. 예술이나 영성 활동으로 행복을 찾습니다.'
  },
  '정인':{
    '연주':'학문적 가정에서 자랐어요. 부모가 교육을 중시하거나, 책이 많은 환경, 혹은 어릴 때부터 학습에 노출된 구조. "공부 잘하는 아이"로 자란 경우가 많아요.',
    '월주':'20대에 학업이나 자기계발에 집중해요. 자격증, 학위, 전문성 축적. 이 시기의 학습이 평생의 지적 자산이 됩니다. 좋은 멘토를 만날 가능성.',
    '일주':'내면이 지적이고 따뜻해요. 배움에 대한 욕구가 깊고, 가까운 사람에게 보호적입니다. 배우자도 지적이고 배려심 깊은 사람에게 끌립니다.',
    '시주':'말년에 학문적 성숙이 깊어져요. 은퇴 후 공부를 다시 시작하거나, 가르치는 활동으로 보람을 느끼는 구조. 자녀에게 정신적 유산을 남깁니다.'
  }
};

/* === 십성 위치 해석 헬퍼 === */
function sspDesc(ssName, pillarLabel){
  // pillarLabel: '연주','월주','일주','시주'
  if(!SSP[ssName]) return '';
  return SSP[ssName][pillarLabel]||'';
}

/* ==========================================
   * mkFB v3 - "데이터 → 발견 → 내용 → 소제목" 구조
   ========================================== */
// ===========================================================
// ① 일간 본질 키워드 (10일간 × 2 강/약 = 20세트)
// ===========================================================
var ILGAN_KW = {
  '갑': {
    strong: ['큰나무의기둥', '리더십', '곧은성격', '자존심강함', '개척자', '우직한추진력', '양보를모름', '목표의식확고'],
    weak: ['바람에흔들리는나무', '의지는있으나힘부족', '남의도움필요', '이상은높으나현실이못따라감', '자존심은강한데뒷받침부족', '귀인이필수']
  },
  '을': {
    strong: ['질긴덩굴', '유연한처세술', '부드러운끈기', '적응력최강', '어디서든살아남음', '타인을감싸안는힘'],
    weak: ['의지할곳을찾는풀', '환경에휘둘림', '주관이약해보임', '눈치가과도함', '스스로결정못내림', '좋은환경이필수']
  },
  '병': {
    strong: ['뜨거운태양', '화려한존재감', '열정폭발', '주목받는사람', '솔직하고정직', '에너지가넘침', '밝고긍정적', '숨기지못하는감정'],
    weak: ['구름낀태양', '열정은있으나지속이어려움', '자신감부족', '인정욕구강함', '타인의시선에민감', '빛나고싶으나기회부족']
  },
  '정': {
    strong: ['활활타오르는촛불', '내면의열정', '섬세한감수성', '예술적감각', '따뜻한카리스마', '집중력뛰어남', '은근한승부욕'],
    weak: ['바람앞의촛불', '감정기복', '쉽게상처받음', '의존적', '내면은뜨거우나표현이약함', '안정적환경필요']
  },
  '무': {
    strong: ['큰산의위엄', '신뢰감', '묵직한포용력', '중심을잡는사람', '고집셈', '변하지않는원칙', '듬직한보호자'],
    weak: ['갈라진대지', '고집은있으나실행력부족', '생각만많고행동느림', '포용은하고싶으나에너지부족', '우유부단', '결단력보강필요']
  },
  '기': {
    strong: ['기름진논밭', '세심한기획력', '뒤에서챙기는실력자', '실용적판단', '사람키우는능력', '꼼꼼한관리', '현실감각뛰어남'],
    weak: ['메마른밭', '신경이예민함', '소심함', '걱정이많음', '남을챙기다자기를못챙김', '실속없이바쁨', '안정적기반필요']
  },
  '경': {
    strong: ['단단한바위', '결단력', '의리', '냉철한판단', '승부사기질', '정의감', '칼같은실행력', '한번결정하면안변함'],
    weak: ['녹슨칼날', '결단은하고싶으나망설임', '냉정해보이지만속은여림', '외로움을잘탐', '인정받고싶은마음', '좋은도구(기회)를만나야빛남']
  },
  '신': {
    strong: ['빛나는보석', '날카로운분석력', '완벽주의', '미적감각', '예민한관찰력', '디테일에강함', '자기기준이확고'],
    weak: ['원석상태', '예민하고날이서있음', '사소한것에상처받음', '겉은차갑고속은불안', '자기비판이심함', '누군가갈고닦아줘야빛남']
  },
  '임': {
    strong: ['넓은바다', '지혜', '적응력', '포용력', '겉잔잔속깊음', '전략가', '흐름을읽는능력', '위기에냉정'],
    weak: ['마르기직전의강', '지혜는있으나밀어붙일힘부족', '속이깊어서외로움', '혼자감당하려함', '도움요청을못함', '동료나귀인이생명줄']
  },
  '계': {
    strong: ['맑은샘물', '직감력', '감수성풍부', '조용한관찰자', '섬세한감정표현', '영감이강함', '물흐르듯유연한대응'],
    weak: ['스며드는이슬', '감정에쉽게잠김', '우울경향', '방향을잃기쉬움', '주관이흔들림', '의지할사람절실', '작은충격에도크게흔들림']
  }
};

// ===========================================================
// ⑤-2 적천수(滴天髓) 십간론 — 천간의 본질과 물상
// ===========================================================
// ※ 원전 인용(滴天髓 天干論):
//   甲: "甲木參天, 脫胎要火. 春不容金, 秋不容土. 火熾乘龍, 水宕騎虎. 地潤天和, 植立千古."
//   乙: "乙木雖柔, 刲羊解牛. 懷丁抱丙, 跨鳳乘猴. 虛濕之地, 騎馬亦憂. 藤蘿繫甲, 可春可秋."
//   丙: "丙火猛烈, 欺霜侮雪. 能鍛庚金, 逢辛反怯. 土衆成慈, 水猖顯節. 虎馬犬鄕, 甲來成滅."
//   丁: "丁火柔中, 內性昭融. 抱乙而孝, 合壬而忠. 旺而不烈, 衰而不窮. 如有嫡母, 可秋可冬."
//   戊: "戊土固重, 旣中且正. 靜翕動闢, 萬物司令. 水潤物生, 火燥物病. 若在艮坤, 怕沖宜靜."
//   己: "己土卑濕, 中正蓄藏. 不愁木盛, 不畏水狂. 火少火晦, 金多金光. 若要物旺, 宜助宜幫."
//   庚: "庚金帶殺, 剛健爲最. 得水而淸, 得火而銳. 土潤則生, 土乾則脆. 能贏甲兄, 輸於乙妹."
//   辛: "辛金軟弱, 溫潤而淸. 畏土之多, 樂水之盈. 能扶社稷, 能救生靈. 熱則喜母, 寒則喜丁."
//   壬: "壬水通河, 能泄金氣. 剛中之德, 周流不滯. 通根透癸, 沖天奔地. 化則有情, 從則相濟."
//   癸: "癸水至弱, 達於天津. 龍德而運, 功化斯神. 不愁火土, 不論庚辛. 合戊見火, 化象斯眞."
var JEOKCHEONSU = {
  '갑': {
    title:'參天之樹(참천지수) — 하늘을 찌르는 큰 나무',
    nature:'갑목은 하늘을 향해 곧게 뻗는 거목이다. 소나무처럼 꺾이면 부러지지 휘지 않는다. 만물의 시작, 봄의 첫 기운, 리더의 자리에 서는 존재.',
    strong_img:'뿌리 깊은 대나무 숲. 태풍이 와도 흔들릴 뿐 뽑히지 않는다. 자기 길을 묵묵히 가는 사람. 타협을 모르고, 그것이 때로는 고집으로 보이지만, 그게 갑목의 생존 방식이다.',
    weak_img:'가뭄에 시든 큰 나무. 뿌리는 깊은데 물이 없다. 이상은 높으나 현실이 따라주지 않는 답답함. 누군가 물(수)을 줘야 다시 살아난다.',
    love:'첫 만남에 듬직하고 신뢰감을 줌. 하지만 깊어지면 양보를 모름. "내가 옳다"는 확신이 관계를 막힐 때가 있음. 상대가 을목(유연한 사람)이면 최고의 궁합.',
    work:'조직의 기둥. 흔들리는 상황에서 중심을 잡는 사람. 창업자, 경영자, 팀리더에 적합. 남 밑에서 오래 못 견딤.',
    danger:'경금(도끼)을 만나면 잘려나갈 수 있다. 하지만 좋은 경금은 갑목을 재목(材木)으로 만들어주는 스승이기도 하다.'
  },
  '을': {
    title:'花草之木(화초지목) — 담쟁이, 화초, 풀',
    nature:'을목은 바위 틈에서도 자라나는 풀이다. 갑목이 꺾이면 부러지는 반면, 을목은 바람에 눕되 부러지지 않는다. 유연함이 곧 생존력.',
    strong_img:'바위를 감싸고 올라가는 담쟁이. 어떤 환경에서든 뿌리를 내리는 놀라운 적응력. 강한 자 옆에서 더 빛나며, 사람을 통해 성장하는 사람.',
    weak_img:'그늘진 곳의 시든 화초. 햇볕(병화)이 없으면 광합성을 못 한다. 좋은 환경을 만나느냐가 인생을 결정하는 구조.',
    love:'상대에게 감기는 담쟁이처럼, 한번 마음을 주면 깊이 파고든다. 상대의 세계에 동화되는 능력. 다만 자기를 잃기 쉬움.',
    work:'참모, 기획자, 상담사, 디자이너. 전면에 나서기보다 뒤에서 판을 짜는 역할에서 빛남. 인맥이 곧 자산.',
    danger:'토(흙)가 과하면 뿌리가 묻혀서 답답함. 지나친 안정은 오히려 성장을 막는다.'
  },
  '병': {
    title:'太陽之火(태양지화) — 태양',
    nature:'병화는 태양이다. 만물을 비추되 특정인을 편애하지 않는다. 밝고, 뜨겁고, 감출 수 없는 존재. 어디에 있든 눈에 띈다.',
    strong_img:'한여름 정오의 태양. 에너지가 넘치고 주변을 환하게 밝힌다. 열정적이고 솔직하며, 감정을 숨기지 못한다. 사람들이 자연스럽게 모여든다.',
    weak_img:'구름에 가린 태양. 빛나고 싶은데 기회가 없다. 자신감이 흔들리면 급격히 위축되는 구조. 갑목(연료)이 반드시 필요.',
    love:'사랑할 때 화끈하고 아낌없이 준다. 하지만 관심이 식으면 돌아서는 것도 빠름. 밝은 에너지로 상대를 매료시키지만, 유지가 과제.',
    work:'무대 위의 사람. 방송, 강연, 영업, 정치, 엔터테인먼트. 사람 앞에서 빛나는 직업에 최적화. 혼자 일하면 에너지가 사라짐.',
    danger:'임수(큰 물)를 만나면 빛이 꺼질 수 있지만, 적절한 임수는 무지개를 만들어준다. 병임의 만남은 극과 극의 시너지.'
  },
  '정': {
    title:'燈燭之火(등촉지화) — 등불, 촛불',
    nature:'정화는 어둠 속의 촛불이다. 태양이 만물을 비추면, 정화는 한 사람의 마음을 비춘다. 섬세하고 집중적이며, 어둠이 깊을수록 빛난다.',
    strong_img:'캄캄한 밤의 등대. 작지만 확실한 빛으로 길을 밝힌다. 깊은 집중력과 내면의 열정. 겉은 조용하지만 속에 뜨거운 불꽃이 있다.',
    weak_img:'바람에 흔들리는 촛불. 감정의 파도에 휩쓸리기 쉽다. 갑목(장작)이 없으면 금방 꺼진다. 의지할 사람이나 확고한 목표가 생존 조건.',
    love:'한 사람에게 깊이 몰입하는 스타일. 병화가 널리 비추면 정화는 깊이 비춘다. 질투와 집착으로 이어지기도 하지만, 그만큼 진심.',
    work:'연구자, 예술가, 심리상담사, 작가, 프로그래머. 깊이 파고드는 직업에서 진가를 발휘. 넓고 얕은 것보다 좁고 깊은 것.',
    danger:'갑목이 없으면 불이 꺼진다. 정화에게 갑목(후원자, 목표, 신념)은 생명줄.'
  },
  '무': {
    title:'高山之土(고산지토) — 산, 큰 땅, 바위산',
    nature:'무토는 태산이다. 움직이지 않는 것으로 만물을 품는다. 변하지 않는 중심, 듬직한 신뢰, 묵직한 존재감. 산은 스스로 가지 않되, 사람들이 산으로 온다.',
    strong_img:'우뚝 솟은 산. 폭풍이 와도 미동 없는 위엄. 한번 약속하면 반드시 지키는 사람. 느리지만 확실한 실행력. 주변에 안정감을 주는 존재.',
    weak_img:'갈라진 대지, 사막. 포용하고 싶으나 에너지가 없다. 고집은 있는데 실행이 따라주지 않는 답답함. 갑목(나무)과 계수(물)로 생기를 불어넣어야.',
    love:'느리게 다가가지만, 한번 마음먹으면 산처럼 변하지 않는다. 바람을 피울 가능성이 가장 낮은 일간. 다만 표현이 서툴러서 오해를 사기 쉬움.',
    work:'관리자, 경영지원, 부동산, 건축, 안전관리. 조직의 중심을 잡는 역할. 위기 상황에서 가장 믿음직한 사람.',
    danger:'목(나무)이 없으면 민둥산. 민둥산은 비가 오면 산사태가 난다. 무토에게 갑목은 뿌리를 내려주는 존재.'
  },
  '기': {
    title:'田園之土(전원지토) — 논밭, 정원, 습한 흙',
    nature:'기토는 만물을 키우는 논밭이다. 무토가 산이면 기토는 밭. 씨앗을 품고, 물을 머금고, 생명을 틔우는 대지. 세심하고 실용적.',
    strong_img:'기름진 옥토. 심는 대로 거두는 풍요의 땅. 사람을 키우는 능력이 탁월하고, 현실 감각이 뛰어나다. 뒤에서 모든 걸 챙기는 실력자.',
    weak_img:'메마른 밭. 비(수)가 안 오면 곡식이 자라지 않는다. 걱정이 많고 신경이 예민해짐. 남을 챙기다 자기를 못 챙기는 번아웃 패턴.',
    love:'상대를 돌보고 키우는 스타일. 연인에게 밥 잘 챙겨주고, 필요한 것 미리 준비하는 사람. 다만 과도한 돌봄이 통제로 느껴질 수 있음.',
    work:'교육자, HR, 농업, 식품, 의료보조. 사람이나 생명을 키우는 일에 최적화. 꼼꼼한 관리 능력이 핵심 무기.',
    danger:'수(물)가 과하면 밭이 잠긴다. 감정에 휩쓸리면 현실 판단이 흐려지는 패턴.'
  },
  '경': {
    title:'刀劍之金(도검지금) — 칼, 도끼, 큰 쇠',
    nature:'경금은 원석 상태의 거친 쇠다. 불(병화)에 달궈지고 물(임수)에 담금질되어야 비로소 명검이 된다. 날것의 강함, 거친 정의감, 냉철한 결단.',
    strong_img:'잘 벼린 칼날. 한 번에 자르는 결단력. 의리와 정의감이 강하고, 한번 결정하면 돌아보지 않는다. 거친 환경에서 더 빛나는 사람.',
    weak_img:'녹슨 칼. 날카로움은 있으나 기회(불)를 만나지 못해 빛을 발하지 못함. 속은 여린데 겉이 차가워 보여 사람들이 다가오지 않는 외로움.',
    love:'무뚝뚝하지만 진심은 깊다. 사랑하는 사람에게는 한없이 약해지는 타입. 의리로 관계를 유지하며, 배신하지 않는 대신 배신당하면 끝.',
    work:'군인, 경찰, 외과의사, 엔지니어, 구조조정 전문가. 칼로 자르듯 명확한 판단이 필요한 직업. 애매한 상황을 못 견딤.',
    danger:'불(병화)이 없으면 영원히 원석. 시련과 단련을 거쳐야 진짜 가치가 나온다. 편안한 환경이 오히려 경금을 무디게 만든다.'
  },
  '신': {
    title:'珠玉之金(주옥지금) — 보석, 바늘, 장식품',
    nature:'신금은 세공된 보석이다. 경금이 거친 칼이면 신금은 정교한 비수. 날카롭고 섬세하며, 아름다움과 완벽함을 추구한다.',
    strong_img:'다이아몬드. 단단하면서 아름답다. 예리한 분석력으로 본질을 꿰뚫고, 미적 감각이 탁월하다. 자기 기준이 확고하여 타협을 싫어한다.',
    weak_img:'흙에 묻힌 원석. 자기 가치를 알아주는 사람을 만나지 못한 상태. 예민하고 자기비판이 심하며, 완벽주의가 자기를 옥죈다.',
    love:'까다롭지만 한번 마음을 열면 깊다. 상대의 결점을 예리하게 보지만, 진심으로 좋아하면 그 결점까지 세공해주려 한다.',
    work:'보석감정사, 분석가, 프로그래머, 디자이너, 편집자. 디테일과 정밀함이 요구되는 직업. 대충이란 없다.',
    danger:'임수(맑은 물)로 세척해야 빛난다. 신금에게 임수는 자신을 비춰주는 거울이자 정화의 수단.'
  },
  '임': {
    title:'大海之水(대해지수) — 강, 바다, 큰 물',
    nature:'임수는 도도히 흐르는 강이자 끝없는 바다다. 멈추지 않고 흐르며, 막으면 돌아가고, 가두면 넘친다. 지혜와 포용의 상징.',
    strong_img:'유유히 흐르는 대하. 겉은 잔잔하나 속은 깊다. 어떤 상황에서든 길을 찾아내는 전략가. 감정을 드러내지 않되 모든 것을 관찰하고 있다.',
    weak_img:'마르기 직전의 강. 지혜는 있으나 밀어붙일 힘이 없다. 혼자 감당하려다 지치는 패턴. 경금(수원지)이 물을 계속 공급해줘야 생명 유지.',
    love:'깊은 바다처럼 상대를 품는다. 포용력이 넓어 어떤 사람이든 받아들이지만, 정작 자기 속마음은 잘 안 보여준다. "다 괜찮다"면서 혼자 삼킴.',
    work:'전략가, 물류, 무역, IT, 철학자, 교수. 흐름을 읽고 판을 짜는 일. 변화가 빠른 환경에서 적응력 발휘.',
    danger:'무토(둑)가 없으면 범람한다. 적절한 제어가 없으면 에너지가 사방으로 흩어짐. 집중과 방향이 과제.'
  },
  '계': {
    title:'雨露之水(우로지수) — 이슬, 시냇물, 빗물',
    nature:'계수는 새벽 이슬이자 산골 시냇물이다. 임수가 바다면 계수는 샘물. 작지만 맑고, 스며들듯 침투하며, 생명을 틔우는 물.',
    strong_img:'맑은 샘물. 조용히 스며들어 씨앗을 틔운다. 직감과 영감이 뛰어나고, 남들이 못 보는 것을 감지하는 능력. 물 흐르듯 유연하게 대응.',
    weak_img:'증발 직전의 이슬. 너무 예민하고 감정에 쉽게 잠긴다. 방향을 잃으면 이리저리 흘러다님. 신금(수원)이 꾸준히 보충해줘야 마르지 않음.',
    love:'상대의 마음에 스며드는 사람. 말보다 눈빛으로 통하는 관계를 원한다. 감정의 파장이 크고, 사소한 것에도 깊이 감동하고 상처받는다.',
    work:'예술가, 점술가, 심리치료사, 연구원, 작가. 직감과 통찰이 무기인 직업. 논리보다 감(感)으로 승부.',
    danger:'병화(태양)가 없으면 존재감이 사라진다. 계수는 빛을 만나야 무지개가 된다. 자기를 드러낼 무대가 필요.'
  }
};

// ===========================================================
// ⑤-3 자평진전(子平眞詮) 격국론 — 격국별 사회적 역할 + 파격 조건
// ===========================================================
var JAPYEONG_GG = {
  '식신격': {
    role:'세상에 재능을 풀어놓는 사람',
    intact:'식신이 깨끗하면(충·파 없으면) 재능이 자연스럽게 돈이 된다. 표현하는 것 자체가 직업이 되는 구조. 먹을 복, 예술 복이 있다.',
    breaks:[
      {cond:'편인(효신탈식)',desc:'재능은 있는데 뭔가 계속 방해받는 느낌. 시작할 때마다 누군가가 발목을 잡거나, 환경이 허락하지 않음. 편인을 제어하는 재성이 해결 열쇠.'},
      {cond:'과다한 식신',desc:'재능이 너무 많아서 하나에 집중 못 함. 이것저것 벌여놓고 마무리가 안 되는 패턴. 선택과 집중이 파격 탈출법.'},
      {cond:'편관 혼잡',desc:'표현하고 싶은데 사회적 압박(규칙, 상사, 시스템)이 막음. 조직 안에서 답답함을 느끼는 구조.'}
    ]
  },
  '상관격': {
    role:'기존 질서에 도전하는 혁신가',
    intact:'상관이 재성을 생하면(상관생재) 파괴적 창의력이 현실적 부로 전환. 예술가, 사업가, 혁신가의 격.',
    breaks:[
      {cond:'정관 충돌(상관견관)',desc:'윗사람·조직·규칙과 정면충돌하는 운명. 능력은 뛰어나나 "말 안 듣는 사람" 이미지. 프리랜서·창업이 돌파구.'},
      {cond:'인성 제압',desc:'표현하고 싶은데 교육·규범·체면이 막음. "하고 싶은 말을 못 하는" 답답함이 쌓이면 한번에 폭발.'},
      {cond:'식상 혼잡',desc:'식신+상관이 뒤섞여 일관성이 없음. 재능은 넘치는데 방향이 흔들림. 멘토(인성)가 필요한 구조.'}
    ]
  },
  '편재격': {
    role:'기회를 포착하는 사업가',
    intact:'편재가 안정적이면 사업 감각이 뛰어나고 돈의 흐름을 읽는다. 투자, 유통, 영업에서 큰 돈을 움직이는 사람.',
    breaks:[
      {cond:'겁재 탈재',desc:'돈은 버는데 누군가가 빼간다. 동업 실패, 보증 피해, 투자 사기의 패턴. 재물 관리 시스템이 필수.'},
      {cond:'비견 쟁재',desc:'경쟁자가 계속 나타남. 같은 시장에서 치열한 경쟁. 차별화 전략이 생존 조건.'},
      {cond:'편관 과다',desc:'사업에 대한 불안과 압박이 과도. 세금, 규제, 법적 문제로 스트레스. 관성을 다루는 지혜 필요.'}
    ]
  },
  '정재격': {
    role:'안정적 부를 쌓는 실무자',
    intact:'정재가 깨끗하면 꾸준한 수입과 안정적 재물 축적. 성실한 노동이 부로 이어지는 정도(正道)의 격.',
    breaks:[
      {cond:'겁재 파재',desc:'안정적으로 모은 돈이 한순간에 날아가는 패턴. 주변 사람 때문에 재물 손실. 재물 경계가 핵심.'},
      {cond:'상관 과다',desc:'너무 많은 지출, 충동구매, 투자 실패. 들어오는 것보다 나가는 것이 많은 구조.'},
      {cond:'편인 충돌',desc:'일에 대한 보상이 기대에 못 미침. 열심히 하는데 성과가 안 나오는 답답함.'}
    ]
  },
  '편관격': {
    role:'압박 속에서 성장하는 전사',
    intact:'편관(칠살)이 식신에 의해 제어되면(식신제살) 강력한 추진력과 리더십. 위기 상황에서 진가를 발휘하는 실전형 리더.',
    breaks:[
      {cond:'제어 없는 칠살',desc:'스트레스·압박·긴장이 끊이지 않음. 몸이 아프거나 사고가 잦은 패턴. 식신(재능)이나 인성(학문)으로 제어해야.'},
      {cond:'관살혼잡',desc:'정관+편관이 뒤섞여 이중 압박. 직장에서 두 상사를 모시는 형상. 한쪽을 합거(合去)해야 해소.'},
      {cond:'신약 편관',desc:'몸이 약한데 압박이 큼. 능력 밖의 책임을 지게 되는 구조. 인성(귀인)의 도움이 절실.'}
    ]
  },
  '정관격': {
    role:'신뢰받는 조직의 기둥',
    intact:'정관이 깨끗하면 직장 내 승진 순조, 사회적 신뢰도 높음. 공무원, 대기업, 전문직에서 안정적으로 올라가는 격.',
    breaks:[
      {cond:'상관견관',desc:'조직과 계속 충돌. 능력은 인정받지만 "불편한 사람" 취급. 본인은 옳다고 생각하는데 조직이 안 따라줌.'},
      {cond:'관살혼잡',desc:'정관+편관 혼재로 직업이 불안정. 이직 잦거나 두 개의 직업 사이에서 갈등. 하나로 정리해야 안정.'},
      {cond:'형충파해',desc:'정관이 충을 당하면 직업적 위기. 갑작스런 해고, 부서 이동, 계약 파기. 대비와 유연함 필요.'}
    ]
  },
  '편인격': {
    role:'비주류의 지식으로 빛나는 사람',
    intact:'편인이 안정적이면 독특한 전문성으로 차별화. 비주류 학문, 대체의학, IT, 예술 등 "남들이 안 하는 분야"에서 성공.',
    breaks:[
      {cond:'효신탈식',desc:'편인이 식신을 빼앗음. 재능은 있는데 현실로 연결이 안 됨. 먹고사는 문제와 하고 싶은 일 사이의 괴리.'},
      {cond:'편인 과다',desc:'생각이 너무 많고 행동이 없음. 공부만 하고 써먹지 못하는 패턴. 재성(현실감각)이 해독제.'},
      {cond:'재성 파인',desc:'돈을 쫓다가 학문·전문성을 잃음. 본업을 놓치는 패턴.'}
    ]
  },
  '정인격': {
    role:'학문과 교양으로 존경받는 사람',
    intact:'정인이 깨끗하면 학업 성취, 자격증, 전문직으로 안정적 성공. 어머니·스승의 복이 있고, 귀인이 잘 나타남.',
    breaks:[
      {cond:'재성 파인',desc:'돈 때문에 공부를 못 하거나, 경제적 이유로 꿈을 포기하는 패턴. 학비 문제, 생계형 직업 선택.'},
      {cond:'인성 과다',desc:'너무 의존적. 스스로 결정 못 하고 부모·선생·멘토에게 기댐. 자립이 과제.'},
      {cond:'식상 충돌',desc:'배운 것과 표현하고 싶은 것이 충돌. 학문적 틀에 갇히거나 반대로 학문을 무시하는 패턴.'}
    ]
  },
  '건록격': {
    role:'자수성가형, 독립적 개척자',
    intact:'일간이 월지에서 건록을 얻으면 자기 힘으로 일어서는 사람. 남에게 기대지 않는 독립심. 프리랜서, 전문직, 1인기업가.',
    breaks:[
      {cond:'비겁 과다',desc:'독립심은 강한데 혼자 다 하려다 지침. 위임과 협력을 배워야 하는 구조.'},
      {cond:'관성 부재',desc:'제어할 사람이 없어 과신과 독선에 빠지기 쉬움. 스스로를 절제하는 훈련이 필요.'},
      {cond:'재성 부족',desc:'능력은 있는데 돈으로 연결이 안 됨. 실력은 인정받지만 수입이 불안정.'}
    ]
  },
  '양인격': {
    role:'극한 상황의 돌파자',
    intact:'양인이 적절히 제어되면(관살이 양인을 누르면) 극한 상황에서 돌파하는 힘. 군인, 외과의사, 위기관리 전문가의 격.',
    breaks:[
      {cond:'제어 없는 양인',desc:'칼날이 통제 불능. 감정 폭발, 충동적 행동, 사고 위험. 관성(절제)이 반드시 필요.'},
      {cond:'양인+편관',desc:'살인상생의 구조가 되면 오히려 최강. 강력한 리더십과 추진력. 다만 극약처방이라 위험과 성공이 공존.'},
      {cond:'형충 충돌',desc:'양인이 충을 당하면 예상치 못한 사건사고. 건강, 수술, 이별 등 급격한 변화.'}
    ]
  }
};

// ===========================================================
// ⑥ 오행 과부족 체감 키워드
// ===========================================================
var OHENG_KW = {
  '목': {
    excess: ['생각이너무많음', '시작은잘하나마무리약함', '욕심이과함', '분노조절어려움', '간담건강주의'],
    lack: ['추진력부족', '결단못내림', '새로운시작이두려움', '소극적', '봄기운보강필요'],
    zero: ['도전정신결핍', '성장동력이없음', '시작자체를못함', '나무기운(녹색,신맛,동쪽)보강필수']
  },
  '화': {
    excess: ['감정기복심함', '급한성격', '화를잘냄', '열정이과해서번아웃위험', '심장혈압주의'],
    lack: ['열정부족', '동기부여어려움', '차가운인상', '표현력약함', '따뜻한관계필요'],
    zero: ['열정이고갈됨', '삶의재미를못느낌', '무기력', '불기운(빨강,쓴맛,남쪽)보강필수']
  },
  '토': {
    excess: ['생각만많고행동느림', '고민루프에빠짐', '우유부단', '무겁고둔함', '소화기건강주의'],
    lack: ['중심을못잡음', '믿음직하지못함', '안정감부족', '뿌리없는느낌', '기반을다져야함'],
    zero: ['신뢰기반이없음', '불안정한삶', '정착이어려움', '토기운(노랑,단맛,중앙)보강필수']
  },
  '금': {
    excess: ['너무냉정함', '감정을잘라냄', '고독해짐', '융통성부족', '호흡기건강주의'],
    lack: ['결단력약함', '우유부단', '마무리를못함', '흐지부지', '칼같은판단력보강필요'],
    zero: ['결단력완전결핍', '시작만하고끝을못봄', '금기운(흰색,매운맛,서쪽)보강필수']
  },
  '수': {
    excess: ['생각이너무깊어빠져나오기힘듦', '우울경향', '의심이많음', '차가워보임', '비뇨기신장주의'],
    lack: ['지혜와유연함부족', '융통성없음', '마른감성', '적응력약함', '물기운보강필요'],
    zero: ['유연성완전결핍', '딱딱한사고', '감정의흐름이막힘', '수기운(검정,짠맛,북쪽)보강필수']
  }
};

// ===========================================================
// ⑪ 12운성 체감 키워드 (일지 기준)
// ===========================================================
var UNSUNG_KW = {
  '장생': ['성장에너지', '새출발', '배움에목마름', '밝은전망', '학생같은순수함'],
  '목욕': ['감정변화큼', '유혹에약함', '변화를추구', '이성문제가능', '자유로운영혼'],
  '관대': ['사회적활발', '자기표현강함', '인정받고싶음', '옷차림에신경', '화려한에너지'],
  '건록': ['자수성가', '독립심강함', '실력으로인정', '안정적전성기', '주관이뚜렷'],
  '제왕': ['에너지최고조', '주도적', '독단위험', '정상에섰으나외로움', '카리스마'],
  '쇠': ['원숙함', '노련함', '체력저하시작', '경험으로승부', '안정추구'],
  '병': ['건강주의', '에너지하락', '쉽게지침', '마음은급한데몸이안따라감', '관리가중요'],
  '사': ['극적전환점', '끝과시작이공존', '놓아야얻음', '집착하면잃음', '정리의시기'],
  '묘': ['잠재력풍부', '아직드러나지않은능력', '때를기다려야함', '내면에숨은보석', '인내필요'],
  '절': ['기복극심', '바닥에서올라오는힘', '극적반전형인생', '위기가곧기회', '독한생명력'],
  '태': ['새로운가능성', '잉태의에너지', '준비단계', '아직형태가안잡힘', '보호가필요'],
  '양': ['서서히성장중', '키워가는단계', '급하면안됨', '조용한축적', '미래를위한투자기']
};

// ===========================================================
// ⑫ 공망 궁위별 체감 키워드
// ===========================================================
var GONGMANG_GUNGWI_KW = {
  'year': ['어린시절공허함', '조상덕이약함', '사회적배경이약하지만자수성가', '원가족과의거리감'],
  'month': ['직장에서인정받기어려움', '부모덕이약함', '사회활동에공허', '직업적변동많음'],
  'day': ['배우자궁공망=배우자와의인연이특이', '내면의공허감', '자아정체성고민', '정신적방황가능'],
  'hour': ['자식과의인연이특이', '노년기공허감', '말년의변화', '결과물이기대와다름']
};

// ===========================================================
// ★ 공망(空亡) 대운/세운 진입 해석 — "空이 實이 되는 시기"
// 공망된 지지가 대운/세운에서 실제로 들어올 때의 의미
// ===========================================================
var GONGMANG_FILL_KW = {
  'year': {desc:'어린 시절 비어있던 조상 자리가 채워짐. 뿌리를 되찾는 시기. 가문 관련 이벤트(상속, 제사, 족보), 사회적 배경이 생김. 늦깎이 후원자 등장'},
  'month': {desc:'비어있던 직업/사회 자리가 채워짐. 드디어 사회적 인정을 받는 시기. 평생직장을 찾거나 천직을 발견. 부모와의 관계 재정립'},
  'day': {desc:'비어있던 배우자 자리가 채워짐. 연애/결혼 인연이 실제로 들어옴. 자아정체성 확립. 내면의 공허가 충만으로 바뀌는 전환점'},
  'hour': {desc:'비어있던 자녀/말년 자리가 채워짐. 자녀 인연 실현, 노후 계획 확정. 그동안 결과가 안 나오던 일에 결실. 말년의 방향 설정'}
};
// ※ 공망이 채워지는 시기는 희비가 교차: 비어있어서 오히려 자유롭던 것이 채워지면
//    책임과 구속이 따라옴. "빈 방에 가구가 들어오면 편해지지만 청소도 해야 한다"


// ===========================================================
// ④ 십성의 궁위 배치 (10종 × 4궁위 = 40조합)
// ===========================================================
var SIPSUNG_GUNGWI_KW = {
  '비견': {
    year: ['형제자매와경쟁', '또래들과부대끼며성장', '자기주장이일찍발달'],
    month: ['직장에서동료와경쟁', '협업속주도권다툼', '동업기회'],
    day: ['배우자와대등한관계', '부부가라이벌', '독립적파트너십'],
    hour: ['말년에자기사업', '노후자립심강함', '자식보다본인활동']
  },
  '겁재': {
    year: ['어린시절재물경쟁', '형제에게빼앗긴느낌', '나눠야했던유년기'],
    month: ['직장에서재물손실주의', '동료때문에돈나갈일', '공동투자주의'],
    day: ['배우자로인한재물변동', '부부간돈문제', '배우자가쓰는돈이큼'],
    hour: ['노후재물유출', '자식에게재산이나감', '말년재물관리필요']
  },
  '식신': {
    year: ['어린시절먹을복', '안정적유년기', '표현력일찍발달'],
    month: ['직장에서안정적수입', '전문기술로인정', '꾸준한성과'],
    day: ['배우자를잘챙김', '가정에서편안함제공', '내면의여유'],
    hour: ['노후풍요', '자식복', '말년의여유와안정']
  },
  '상관': {
    year: ['어린시절반항기', '규칙에저항', '일찍부터자기표현강함'],
    month: ['직장에서상사와충돌', '조직에안맞음', '창의적직업적합', '프리랜서형'],
    day: ['배우자에게잔소리', '관계에서주도권잡으려함', '표현이과해서갈등'],
    hour: ['말년에자유로운활동', '자식이독특함', '노후에제2의인생']
  },
  '편재': {
    year: ['아버지영향큼', '어린시절돈의흐름을경험', '유동적환경'],
    month: ['사업적수완', '투자감각', '여러수입원', '직장보다사업적합'],
    day: ['배우자가활동적', '연애에적극적', '바깥활동많은파트너'],
    hour: ['말년에사업운', '노후에새로운수입', '움직이는노년']
  },
  '정재': {
    year: ['안정적가정환경', '아버지가안정적', '물질적기반있는유년기'],
    month: ['월급쟁이체질', '꾸준한저축', '안정적직장운', '현실적재물관리'],
    day: ['알뜰한배우자', '가정경제안정', '실속있는결혼생활'],
    hour: ['노후안정적재물', '자식이효도', '말년의경제적안정']
  },
  '편관': {
    year: ['엄격한가정환경', '어린시절규율속성장', '사회적압박일찍경험'],
    month: ['직장에서강한압박', '상사의압력', '조직내긴장감', '위기관리능력발달'],
    day: ['배우자가강한성격', '부부관계에서긴장', '카리스마있는파트너에끌림'],
    hour: ['말년에돌발변화', '자식과의갈등가능', '노후에예상밖도전']
  },
  '정관': {
    year: ['반듯한가정환경', '예의바른성장', '규칙적유년기'],
    month: ['직장에서승진운', '조직내신뢰', '안정적커리어', '관직/공직적합'],
    day: ['예의바른배우자', '안정적결혼생활', '서로존중하는관계'],
    hour: ['말년에사회적인정', '자식이반듯함', '노후의안정']
  },
  '편인': {
    year: ['특이한가정환경', '어머니영향크지만불안정', '일찍부터독학', '외로운유년기'],
    month: ['직장에서비주류', '독특한전문성', '연구직학문적합', '조직보다독립적학습'],
    day: ['내면이복잡함', '배우자를이해하기어려움', '정신적방황', '깊은사색'],
    hour: ['말년에학문/종교몰입', '자식이독특', '노후에정신적성장']
  },
  '정인': {
    year: ['어머니사랑가득한유년기', '배움의기회풍부', '보호받으며성장'],
    month: ['직장에서멘토복', '학습을통한성장', '자격증/학위운', '귀인의도움'],
    day: ['배우자가자신을돌봐줌', '정신적안정', '내면의평화'],
    hour: ['말년에학문/배움', '자식이돌봐줌', '노후의평안']
  }
};

// ===========================================================
// ③ 격국 체감 키워드 (격국유형 + 신강/약 조합)
// ===========================================================
var GYEOKGUK_KW = {
  '비겁': {
    strong: ['자기주장매우강함', '남의말안들음', '독불장군', '경쟁심과다', '혼자다해결하려함', '주변을밀어냄'],
    weak: ['자기주장은있으나뒷받침부족', '의지는강하나체력이못따라감', '동료의도움이절실', '함께할때빛남']
  },
  '식상': {
    strong: ['표현력폭발', '말재주', '창의적아이디어넘침', '가만히있으면답답', '끊임없이뭔가를만들어냄', '예술적재능'],
    weak: ['표현하고싶으나자신감부족', '아이디어는많은데실행이약함', '속으로만삭임', '표현할기회를만들어야함']
  },
  '재성': {
    strong: ['현실감각뛰어남', '돈냄새를맡음', '실용적판단', '기회포착능력', '물질적성공지향', '재테크감각'],
    weak: ['돈에대한감각은있으나모으기어려움', '벌어도새나감', '재물의흐름이불안정', '안정적수입원확보필요']
  },
  '관성': {
    strong: ['외부압박속에서성장', '책임감무거움', '조직안에서두각', '통제받으면반발', '위기관리능력', '규율과자유사이긴장'],
    weak: ['세상이숙제를던지는데혼자풀기벅참', '압박은느끼는데대응할힘부족', '귀인이나보호막필요', '인성보강이용신']
  },
  '인성': {
    strong: ['학습능력뛰어남', '생각이많음', '학위나자격취득', '어머니영향큼', '정신세계풍부', '실행보다생각이앞섬'],
    weak: ['배움에목마르지만기회부족', '멘토가없는느낌', '혼자터득해야함', '보호막이약함', '학습환경만들어야함']
  }
};

// ===========================================================
// ⑤ 십성 간 관계 (주요 패턴 20가지)
// ===========================================================
var SIPSUNG_REL_KW = [
  {cond: function(c){return c['관성']>=2.0 && c['인성']<=1.2;}, kw: ['압박은많은데보호막이없음', '맨땅에헤딩', '스트레스해소구가없음', '혼자버텨야하는느낌']},
  {cond: function(c){return c['관성']>=2.0 && c['인성']>=1.8;}, kw: ['고난이성장의재료', '시련속에서배움', '위기때마다귀인등장', '고진감래형인생']},
  {cond: function(c){return c['관성']>=2.0 && c['식상']>=1.8;}, kw: ['압박받으면말로터뜨림', '참다가폭발', '표현이방어기제', '그런데그게재능이됨']},
  {cond: function(c){return c['관성']>=2.0 && c['비겁']<=1.2;}, kw: ['혼자감당해야함', '도와달라는말을못함', '외로운전쟁', '동료가절실']},
  {cond: function(c){return c['관성']>=2.0 && c['재성']>=1.8;}, kw: ['돈도벌어야하고시련도감당', '현실적압박이이중으로옴', '책임감+재물관리동시부담']},
  {cond: function(c){return c['식상']>=2.0 && c['재성']>=1.8;}, kw: ['재능이돈이됨', '창의력으로수익', '표현활동이곧사업', '아이디어를현금화하는능력']},
  {cond: function(c){return c['식상']>=2.0 && c['관성']>=1.8;}, kw: ['자유와규율의충돌', '표현하고싶은데눈치', '조직에서튀는사람', '독립해야편함']},
  {cond: function(c){return c['식상']>=2.0 && c['인성']<=1.2;}, kw: ['뱉기만하고채우지않음', '에너지소진주의', '학습보다행동이앞섬', '깊이보다속도']},
  {cond: function(c){return c['재성']>=2.0 && c['비겁']<=1.2;}, kw: ['돈은보이는데잡을힘이없음', '기회는오는데실행력부족', '재물이왔다가빠짐', '파트너와함께해야잡음']},
  {cond: function(c){return c['재성']>=2.0 && c['인성']<=1.2;}, kw: ['현실적이지만정신적허기', '돈은벌어도공허함', '바쁘지만의미를못찾음', '영혼의양식필요']},
  {cond: function(c){return c['비겁']>=2.0 && c['관성']<=1.2;}, kw: ['브레이크없는차', '거침없지만무모함', '충고를안들음', '스스로멈추는법을배워야함']},
  {cond: function(c){return c['비겁']>=2.0 && c['재성']>=1.8;}, kw: ['경쟁적으로돈을벌음', '동료와재물다툼', '공격적투자', '승부사형재테크']},
  {cond: function(c){return c['비겁']>=2.0 && c['식상']<=0.8;}, kw: ['에너지는넘치는데표현을못함', '속에서만끓음', '행동력은있으나방향이안잡힘']},
  {cond: function(c){return c['인성']>=2.0 && c['식상']<=1.2;}, kw: ['배우기만하고표현못함', '머릿속에만가득', '아는것을밖으로꺼내야함', '실행력보강필요']},
  {cond: function(c){return c['인성']>=2.0 && c['재성']<=1.2;}, kw: ['이상은높으나현실감각부족', '공부만하고돈을못벌음', '학자형', '현실적감각보강필요']},
  {cond: function(c){return c['인성']>=2.0 && c['관성']>=1.8;}, kw: ['살인상생', '위기를학습으로극복', '어려운환경이오히려스승', '시련이곧공부']},
  {cond: function(c){return c['식상']<=0.3 && c['관성']>=1.8;}, kw: ['표현통로가막힘', '답답함이쌓임', '말을못하고참음', '속앓이', '표현활동이해방구']},
  {cond: function(c){return c['비겁']<=0.3;}, kw: ['의지할곳이없음', '혼자서는한계명확', '에너지가빨리바닥남', '좋은동료가인생을바꿈']},
  {cond: function(c){return c['관성']<=0.3 && c['비겁']>=1.8;}, kw: ['제약이없어서오히려방향을잃음', '자유롭지만목표가흐릿', '외부자극이필요', '적당한압박이약이됨']},
  {cond: function(c){return c['재성']>=2 && c['관성']>=2 && c['인성']<=1.2;}, kw: ['현실과압박의이중고', '돈도벌어야하고스트레스도감당', '보호막없이전선에서있음']},
  {cond: function(c){return c['식상']>=2 && c['비겁']>=1.8;}, kw: ['에너지넘치는표현자', '주변이시끄러움', '활동적이고목소리큼', '열정이과할수있음']},
  {cond: function(c){return c['인성']>=2 && c['비겁']>=1.8;}, kw: ['자기확신이강함', '내가옳다는믿음', '학습+실행력동시보유', '주관이뚜렷한실력자']},
  {cond: function(c){return c['재성']<=0.3;}, kw: ['재물감각이약함', '돈에무관심하거나관리못함', '현실보다이상', '경제관념보강필요']},
  {cond: function(c){return c['인성']<=0.3;}, kw: ['보호막이없음', '멘토부재', '스스로터득해야함', '학습환경을만들어야함', '귀인을찾아야함']},
  // ★ 신규 통변 공식 15개 ★
  // 1. 상관견관 — 가장 유명한 명리 공식
  {cond: function(c){return c['식상']>=1 && c['관성']>=1 && (function(){var ss=c._raw||{};return (ss['상관']||0)>=1 && (ss['정관']||0)>=1;})();}, kw: ['상관견관: 반항아가체제를만남', '조직에서상사와마찰', '비합리적규칙에참지못함', '프리랜서·창업적합', '조직생활은답답']},
  // 2. 식신제살 — 최고 길한 조합
  {cond: function(c){return (c._raw&&(c._raw['식신']||0)>=1) && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['식신제살: 재능으로압박극복', '스트레스를작품으로승화', '마감압박에더좋은결과물', '힘든상황에서오히려빛남']},
  // 3. 살인상생 (편관+인성 세분화)
  {cond: function(c){return (c._raw&&(c._raw['편관']||0)>=1) && c['인성']>=1;}, kw: ['살인상생: 위기→학습→성장선순환', '고생이다실력이됨', '위기에멘토등장', '어려운프로젝트가레벨업기회']},
  // 4. 상관생재
  {cond: function(c){return (c._raw&&(c._raw['상관']||0)>=1) && c['재성']>=1;}, kw: ['상관생재: 창의력→재물연결', '말·글·솜씨로돈을벌수있는구조', '유튜버·작가·강사적합', '표현이곧수입']},
  // 5. 관인상생
  {cond: function(c){return (c._raw&&(c._raw['정관']||0)>=1) && c['인성']>=1;}, kw: ['관인상생: 안정적출세구조', '조직안에서승진정석', '자격증·학위가커리어에직접도움', '공무원·대기업·전문직적합']},
  // 6. 재관쌍미
  {cond: function(c){return c['재성']>=1 && c['관성']>=1 && c._strong;}, kw: ['재관쌍미: 부와명예동시가능', '사회적인정+경제적안정', '신강하여둘다감당가능', '이상적인사회적성공구조']},
  // 7. 관살혼잡
  {cond: function(c){return (c._raw&&(c._raw['편관']||0)>=1) && (c._raw&&(c._raw['정관']||0)>=1);}, kw: ['관살혼잡: 방향혼란', '두상사가다른지시', '직장을자주바꾸거나이직고민', '한쪽을확실히선택하면강해짐']},
  // 8. 비겁탈재
  {cond: function(c){return c['비겁']>=2 && c['재성']>=1;}, kw: ['비겁탈재: 재물경쟁', '주변에서빌려달라투자하자', '공동사업하면손해', '혼자하는사업이유리']},
  // 9. 재다신약
  {cond: function(c){return c['재성']>=2 && !c._strong;}, kw: ['재다신약: 기회는오나체력부족', '먹을건많은데소화못함', '건강이재물의열쇠', '욕심줄이고한가지에집중']},
  // 10. 인수과다
  {cond: function(c){return c['인성']>=3;}, kw: ['인수과다: 생각과다행동부족', '완벽주의→시작못함', '좀더준비하고가입버릇', '실행이최고의공부']},
  // 11. 식상생재 (식신 포함)
  {cond: function(c){return c['식상']>=1 && c['재성']>=1;}, kw: ['식상생재: 표현력→재물파이프라인', '꾸준한콘텐츠로수입', '재능의상업화가가능한구조']},
  // 12. 재성파인
  {cond: function(c){return c['재성']>=2 && c['인성']>=1;}, kw: ['재성파인: 돈이공부를방해', '돈벌이에바빠자기계발못함', '장기적성장이막힐수있음', '학습시간확보필요']},
  // 13. 식상토설 (과다 분출)
  {cond: function(c){return c['식상']>=3;}, kw: ['식상토설: 에너지과다분출', '말과표현이너무많아기운빠짐', 'SNS·수다·창작에에너지소진', '에너지관리가핵심과제']},
  // 14. 양인가살 (양인+편관) — 양인살 여부는 별도 체크 필요, 조건을 겁재+편관으로 근사
  {cond: function(c){return (c._raw&&(c._raw['겁재']||0)>=1) && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['양인가살: 극강추진력', '보통사람이쓰러질압박을즐김', '군인·외과의사·CEO적합', '제어못하면자기가다침']},
  // 15. 인성화살
  {cond: function(c){return c['인성']>=1 && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['인성화살: 지식으로위기해결', '어려울때책이나멘토에서답을찾음', '학문적해결능력', '배움이방패가되는구조']}
];


// ===========================================================
// ⑦ 합충형 체감 + 궁위 키워드
// ===========================================================

// 천간합 5종 의미
var CHEONGAN_HAP_KW = {
  '갑기합토': ['현실적으로뭉침', '목표를향해합심', '실용적파트너십', '안정을만들어냄'],
  '을경합금': ['부드러움과강함이만남', '유연함속결단력', '서로다른매력에끌림', '이성적끌림강함'],
  '병신합수': ['열정과냉철함이만남', '화려함이차분해짐', '감정이정제됨', '지혜로운변화'],
  '정임합목': ['감성과이성이합쳐져성장', '따뜻함이지혜를만남', '연애에서변화', '부드러워지는계기'],
  '무계합화': ['신뢰와감성이만남', '묵직함이유연해짐', '열정이피어남', '정적인사람이활발해짐']
};

// 궁위별 합의 의미
var HAP_GUNGWI_KW = {
  'year-month': ['성장환경과사회활동이자연스럽게연결', '부모의영향이직업으로이어짐', '가정과직장의조화'],
  'year-day': ['뿌리와자아가하나로', '태생적성향이현재삶에자연스럽게녹아있음', '원가족과의유대'],
  'year-hour': ['과거와미래가연결', '어린시절경험이말년에결실', '장기적인생설계가맞음'],
  'month-day': ['직장생활과내면이조화', '사회적자아와진짜자아가일치', '하는일이적성에맞음'],
  'month-hour': ['직업이노후로연결', '커리어의연속성', '일관된직업경로'],
  'day-hour': ['내면과결과물이일치', '하고싶은것과해야할것이같음', '자아실현가능']
};

// 지지충 6종 의미
var JIJI_CHUNG_KW = {
  '자오충': ['감정과이성의충돌', '마음과머리가다른방향', '관계에서급변', '큰감정적파도'],
  '축미충': ['재물의변동', '가치관충돌', '소유욕과나눔사이', '현실적갈등'],
  '인신충': ['이동과변화많음', '한곳에정착어려움', '직업적변동', '여행이나이사잦음', '교통사고주의'],
  '묘유충': ['대인관계충돌', '예리한갈등', '말로인한상처', '섬세한부분에서부딪힘'],
  '진술충': ['큰전환점', '가치관의근본적변화', '저장된것이터져나옴', '인생의리셋버튼'],
  '사해충': ['활동영역의충돌', '하던것을그만두고새로시작', '방향전환', '여행이나해외인연']
};

// 궁위별 충의 의미
var CHUNG_GUNGWI_KW = {
  'year-month': ['성장환경과직장이충돌', '부모가원하는것과내커리어가다름', '가정을떠나야성공'],
  'year-day': ['뿌리와자아가충돌', '원가족이슈', '고향을떠나야편함', '부모와의갈등', '태생적환경에서벗어나야성장'],
  'year-hour': ['과거와미래가충돌', '어린시절상처가말년에영향', '세대간갈등'],
  'month-day': ['직장과내면이충돌', '사회적역할과진짜하고싶은것이다름', '직업적전환욕구'],
  'month-hour': ['현재직업과미래비전이충돌', '커리어변경욕구', '하던일을그만두고싶은충동'],
  'day-hour': ['내면과결과물이불일치', '하고싶은것과실제산출물이다름', '자아실현에장애']
};

// 지지형 의미
var JIJI_HYUNG_KW = {
  '인사신': ['삼형살=끊임없는시련', '하나해결하면또다른문제', '강인해지지만상처도많음', '역경속성장'],
  '축술미': ['고집의충돌', '세가지가치관이부딪힘', '타협이어려움', '자기방식을고집', '외로운싸움'],
  '자묘': ['무례지형=예의없는갈등', '가까운사이에서상처', '친한사람에게받는상처', '버릇없는관계패턴'],
  '자형': ['자기자신과의싸움', '같은실수반복', '자기파괴적패턴주의', '스스로를가두는습관']
};

// ★ 천간충 의미
var CHEONGAN_CHUNG_KW = {
  '갑경충': ['강한외부충돌', '결단과갈등이동시에옴', '나무를베는칼날같은압박', '수술·이별·전환의에너지'],
  '을신충': ['섬세한갈등', '가위로자르듯예리한상처', '감정적인관계의단절', '예술적긴장감'],
  '병임충': ['열정과냉정의충돌', '폭풍우가불을끄는격', '감정의급격한기복', '이상vs현실의괴리'],
  '정계충': ['내면의미세한갈등', '이슬이촛불을끄듯은은히소멸', '감성적고갈', '정서적피로감']
};

// ★ 지지해(害) 의미
var JIJI_HAE_KW = {
  '자미해': ['가까운사이의은근한견제', '돕는척방해', '가족간미묘한갈등', '속마음을안보여줌'],
  '축오해': ['성과를깎아내리는방해', '노력해도인정못받는느낌', '금전적·정서적소모', '보이지않는경쟁'],
  '인사해': ['믿었던관계의배신감', '동업자와의미묘한불신', '가까운데서오는상처', '협력속의견제'],
  '묘진해': ['친한사이의질투와시기', '가까울수록날이서는관계', '형제·동료간미묘한경쟁', '감정적불화'],
  '신해해': ['파트너와의암묵적긴장', '협력하면서도속으로경쟁', '서로의영역침범', '공동작업시마찰'],
  '유술해': ['가까운사람과의불신', '편인데편하지않은관계', '사소한불만축적', '관계의피로감']
};


// ===========================================================
// ★ 천간 상극(剋) 5쌍 풀이 — 충(沖)과 구분
// 충(沖)은 같은 음양의 정면충돌, 극(剋)은 오행 상극 관계
// ===========================================================
var CHEONGAN_GEUK_KW = {
  '갑극무': {meaning:'큰 나무가 흙을 뚫음', desc:'목극토 — 자기 신념으로 현실의 안정을 뒤흔드는 에너지. 개혁가 기질. 흙이 약하면 산사태, 흙이 강하면 나무가 뿌리를 내림'},
  '을극기': {meaning:'풀이 밭을 덮음', desc:'목극토 — 부드럽게 스며들어 기존 질서를 바꿈. 갑극무가 혁명이면 을극기는 혁신. 서서히 잠식하는 에너지'},
  '병극경': {meaning:'태양이 쇠를 녹임', desc:'화극금 — 뜨거운 열정이 원칙과 결단을 무르게 만듦. 병화가 강하면 경금이 녹아 무용지물, 적절하면 제련하여 명검'},
  '정극신': {meaning:'촛불이 보석을 다듬음', desc:'화극금 — 섬세한 열로 보석을 세공. 정화가 신금을 만나면 예술적 정밀함. 과하면 보석이 녹아 사라짐'},
  '무극임': {meaning:'산이 강물을 막음', desc:'토극수 — 뚝(제방)으로 물길을 통제. 무토가 강하면 물이 범람 못 하지만, 물이 과하면 뚝이 무너짐(토붕)'},
  '기극계': {meaning:'논밭이 이슬을 흡수', desc:'토극수 — 흙이 물을 머금음. 적절하면 기름진 옥토, 과하면 물이 고여 썩음. 습한 관계'},
  '경극갑': {meaning:'도끼가 나무를 벰', desc:'금극목 — 벽갑(劈甲)의 에너지. 경금이 갑목을 자르면 재목(材木)이 됨. 적절한 극은 성장의 조건, 과도한 극은 파괴'},
  '신극을': {meaning:'가위가 꽃을 자름', desc:'금극목 — 정밀한 가지치기. 신금이 을목을 다듬으면 아름다운 분재, 과하면 생명력 상실'},
  '임극병': {meaning:'큰 물이 불을 끔', desc:'수극화 — 폭우가 태양을 가림. 임수가 과하면 병화의 열정이 소멸. 적절하면 무지개(水火旣濟)'},
  '계극정': {meaning:'이슬이 촛불을 끔', desc:'수극화 — 작은 물방울이 불씨를 꺼뜨림. 은밀하고 서서히 진행되는 소멸. 감성의 고갈'}
};

// ===========================================================
// ★ 지지충 궁위 교차 해석 — "어떤 궁위 사이의 충인가"
// 충의 의미는 궁위 조합에 따라 완전히 달라짐
// ===========================================================
var CHUNG_GUNGWI_KW = {
  '년지-월지': {meaning:'뿌리와 줄기의 충돌', desc:'조상/가문의 기대와 사회적 역할이 충돌. 부모가 원하는 길과 내가 가는 길이 다름. 이른 독립, 고향 일찍 떠남'},
  '년지-일지': {meaning:'조상과 배우자의 갈등', desc:'집안 기대와 결혼 상대가 안 맞음. 가문 반대 결혼, 시댁/처가 갈등의 씨앗. 또는 어린 시절 환경과 현재 내면의 괴리'},
  '년지-시지': {meaning:'시작과 끝의 충돌', desc:'태어난 환경과 말년 환경이 극적으로 다름. 고향과 완전히 다른 곳에서 노년. 인생의 큰 반전'},
  '월지-일지': {meaning:'사회와 내면의 갈등', desc:'직장에서 보여주는 나와 진짜 나의 괴리. 직업적 역할이 본성과 안 맞음. 이직 충동, 워라밸 갈등'},
  '월지-시지': {meaning:'직업과 자녀의 충돌', desc:'일과 가정의 양립 어려움. 직장 때문에 자녀 돌봄 부족, 또는 자녀 때문에 커리어 포기. 시간 배분 갈등'},
  '일지-시지': {meaning:'배우자와 자녀의 갈등', desc:'부부 관계와 자녀 양육에서 마찰. 배우자와 자녀 교육관 차이. 또는 자기 내면과 미래 지향의 불일치'}
};

// ===========================================================
// ★ 세운(歲運) 지지 vs 원국 지지 합충 체감 키워드
// "올해 어떤 에너지가 오는가"
// ===========================================================
var SEUN_HAPCHUNG_KW = {
  '충': {
    desc:'올해 원국의 특정 기둥이 흔들림. 변동·전환·이별·이사·이직의 해',
    '년지': '가문/외부 환경에 큰 변화. 조상 관련 이벤트(제사, 상속, 가족 갈등)',
    '월지': '직업적 대변동. 이직, 부서 이동, 사업 전환. 부모와의 관계 변화',
    '일지': '배우자궁 충 — 관계의 위기 또는 재정립. 건강 변화. 이사',
    '시지': '자녀 관련 이벤트. 노후 계획 변경. 진로 방향 전환'
  },
  '합': {
    desc:'올해 원국의 특정 기둥에 새로운 인연이 묶임. 결합·계약·인연의 해',
    '년지': '새로운 사회적 연결. 인맥 확장, 조직 합류, 가문 경사',
    '월지': '직업적 안정 또는 새 계약. 파트너십 형성. 멘토 등장',
    '일지': '배우자궁 합 — 연애/결혼 인연. 또는 기존 관계의 재결합',
    '시지': '자녀 경사. 새로운 프로젝트 시작. 미래 계획 확정'
  },
  '형': {
    desc:'올해 원국에 형(刑)이 걸림. 법적 문제, 건강 이슈, 인간관계 마찰의 해',
    '년지': '가문/사회적 문제. 법적 분쟁, 명예 실추 주의',
    '월지': '직장 내 갈등, 상사와 충돌, 계약 분쟁',
    '일지': '건강 문제, 배우자와 깊은 갈등, 수술수',
    '시지': '자녀 문제, 노후 건강 주의, 투자 손실'
  }
};


// ===========================================================
// ⑧ 대운 전환 체감 (이전 십성→현재 십성 전환 패턴)
// ===========================================================
var DW_TRANSITION_KW = {
  '비겁→비겁': ['경쟁과독립의연장선', '자기에너지가계속주인공', '체력관리가핵심', '같은에너지다른방향으로전환'],
  '비겁→식상': ['자기주장하던시기에서표현의시기로', '경쟁에서창작으로', '에너지방향이외부로확장'],
  '비겁→재성': ['독립에서현실로', '자기중심에서돈과관계로', '사업시작시기'],
  '비겁→관성': ['자유에서규율로', '갑자기책임이무거워짐', '조직안에서역할변화'],
  '비겁→인성': ['행동에서학습으로', '멈추고공부하는시기', '자기성찰'],
  '식상→식상': ['표현의전성기지속', '창작스타일이바뀜', '더넓은무대로', '깊어지는표현력'],
  '식상→비겁': ['표현에서경쟁으로', '창작에서생존으로', '현실의벽을만남'],
  '식상→재성': ['재능이돈이되기시작', '표현활동이수익으로', '아이디어의사업화'],
  '식상→관성': ['자유롭던시기에서제약이생김', '표현이억눌림', '조직적응필요'],
  '식상→인성': ['표현에서내면으로', '쏟아내다가채우는시기', '학습과성찰'],
  '재성→재성': ['재물이계속흘러듦', '투자방향전환', '재테크방식변화', '안정적축적기지속'],
  '재성→비겁': ['안정에서경쟁으로', '모은것을지켜야하는시기', '재물관리주의'],
  '재성→식상': ['현실에서창의로', '돈보다하고싶은일로', '새로운표현욕구'],
  '재성→관성': ['재물에서책임으로', '돈벌다가직위가올라감', '사회적역할확대'],
  '재성→인성': ['현실에서정신세계로', '물질보다내면', '가치관의전환'],
  '관성→관성': ['시련이계속됨', '인내의시기', '조직적도전지속', '이시기를버티면한단계성장'],
  '관성→비겁': ['규율에서독립으로', '조직을벗어남', '자기사업시작', '통제에서해방'],
  '관성→식상': ['압박에서표현으로', '억눌렸던것을터뜨림', '창의적해방기'],
  '관성→재성': ['책임에서현실수확으로', '노력의보상기', '안정적수입'],
  '관성→인성': ['시련에서배움으로', '고난이공부가됨', '귀인을만나는시기'],
  '인성→인성': ['학습이깊어지는시기', '공부방향전환', '새로운분야탐구', '정신적성숙가속'],
  '인성→비겁': ['배움에서실행으로', '드디어행동으로옮기는시기', '공부한것을써먹을때'],
  '인성→식상': ['학습에서창작으로', '배운것을표현', '전문성발휘'],
  '인성→재성': ['지식에서수익으로', '배운것이돈이됨', '현실적성공기'],
  '인성→관성': ['학습에서시련으로', '이론에서실전', '현실의냉정함을만남']
};

// ===========================================================
// ★ 대운 십성별 체감 풀이 (10종 × 신강/신약 = 20조합)
// 대운에 특정 십성이 들어올 때 10년간 체감하는 에너지
// ===========================================================
var DW_SIPSUNG_KW = {
  '비겁': {
    strong: {theme:'경쟁과 독립의 10년', desc:'자기 힘이 넘쳐 독립/창업 욕구 폭발. 동업은 금물 — 경쟁자로 변함. 운동/체력 관리에 에너지 쏟으면 길. 형제·친구 관계 재편'},
    weak:   {theme:'동지를 만나는 10년', desc:'그동안 부족했던 자기 힘이 보충됨. 든든한 동료·파트너 등장. 자존감 회복기. 다만 너무 의지하면 자립 기회를 놓침'}
  },
  '식상': {
    strong: {theme:'표현 폭발의 10년', desc:'말·글·창작 에너지가 폭주. 콘텐츠 창작, 프리랜서, 이직 충동. 재능이 돈이 되지만 입이 화를 부를 수도. 구설수 주의. 여성은 출산·자녀 인연'},
    weak:   {theme:'재능 발견의 10년', desc:'숨겨진 표현 욕구가 깨어남. 새로운 취미·부업 시작. 에너지 분산 주의 — 한 곳에 집중해야 성과. 자녀 인연이 들어오는 시기'}
  },
  '재성': {
    strong: {theme:'재물과 욕망의 10년', desc:'돈이 보이고 기회가 옴. 사업 확장, 투자 기회. 그러나 신강이면 돈을 잡을 힘이 있으나 과욕 주의. 여성 인연(남성), 아버지 관련 이벤트'},
    weak:   {theme:'기회는 오는데 힘이 없는 10년', desc:'재다신약 — 돈은 보이는데 잡을 체력이 없음. 과로·건강 악화 주의. 파트너 도움이 필수. 무리한 투자 금지'}
  },
  '관성': {
    strong: {theme:'시련과 성장의 10년', desc:'외부 압박·책임·규율이 강해짐. 승진하지만 스트레스도 극대. 직장 내 정치, 법적 문제 주의. 신강이면 이 압박을 이겨내고 지위 상승'},
    weak:   {theme:'벅찬 짐을 지는 10년', desc:'감당 안 되는 책임이 옴. 건강·스트레스 적신호. 인성(학습/귀인)으로 보호막을 쳐야 버팀. 무리한 직급 욕심 금지. 남성은 자녀, 여성은 남편 관련 변동'}
  },
  '인성': {
    strong: {theme:'학습과 귀인의 10년', desc:'공부·자격·학위의 적기. 멘토 등장, 어머니 영향 강해짐. 그러나 생각만 많고 행동이 없어지는 함정. 현실 감각(재성) 유지 필수'},
    weak:   {theme:'보호막을 얻는 10년', desc:'그동안 없던 보호자·후원자가 나타남. 학습 기회, 정신적 안정. 자격증·학위 취득 적기. 다만 의존적으로 빠지지 않도록 주의'}
  }
};

// ===========================================================
// ⑨ 나이대×대운 교차 키워드
// ===========================================================
var AGE_DW_KW = {
  '20대': {
    '비겁': ['또래와치열한경쟁', '자기정체성확립', '독립하려는욕구'],
    '식상': ['자기표현폭발', '진로탐색', '다양한시도', '끼발산'],
    '재성': ['일찍돈을벌기시작', '현실감각빠른발달', '또래보다성숙'],
    '관성': ['일찍사회적압박경험', '책임감이무거운20대', '조기성숙'],
    '인성': ['공부에몰입', '자격취득', '대학원이나유학', '멘토의영향']
  },
  '30대': {
    '비겁': ['동료와경쟁심화', '이직이나독립욕구', '자기사업꿈'],
    '식상': ['창의적전성기', '부업이나사이드프로젝트', '자기표현활발'],
    '재성': ['재산축적기', '결혼과가정경제', '투자시작', '현실적안정추구'],
    '관성': ['직장에서승진압박', '조직내정치', '책임감최고조'],
    '인성': ['자기계발몰입', '이직을위한학습', '육아와공부병행']
  },
  '40대': {
    '비겁': ['중년의정체성위기', '새로운경쟁', '제2의독립', '체력과의싸움'],
    '식상': ['인생2막표현', '취미가진로가됨', '중년의새로운도전'],
    '재성': ['재무적전성기', '부동산투자', '노후준비시작'],
    '관성': ['관리자역할', '조직의중심', '책임감무거움', '건강주의'],
    '인성': ['인생의의미를찾는시기', '공부재개', '정신적성숙']
  },
  '50대이후': {
    '비겁': ['노후자립', '새로운활동', '동년배와교류'],
    '식상': ['인생경험을표현', '멘토링', '창작활동'],
    '재성': ['노후재무관리', '안정적수입유지', '재산정리'],
    '관성': ['사회적역할변화', '은퇴압박', '건강관리필수'],
    '인성': ['지혜의시기', '후학양성', '정신적풍요']
  }
};

// ===========================================================
// ⑩ 지장간 정기의 숨은 십성 체감 키워드
// ===========================================================
var JIJANGGAN_HIDDEN_KW = {
  '비견': ['겉으로안보이지만내면에자기주장이숨어있음', '속으로는경쟁심이있음', '필요하면독립심발동'],
  '겁재': ['내면에재물경쟁심', '속으로소유욕이강함', '가까운사이에서은근히다툼'],
  '식신': ['겉으로안드러나지만내면에여유와즐거움', '속으로표현욕구가있음', '은근한먹을복'],
  '상관': ['내면에반항심', '속으로비판적', '겉은순해보여도속은날카로움', '숨겨진표현욕'],
  '편재': ['속으로사업욕구', '내면에투자감각', '겉으로안보이는재물감각'],
  '정재': ['내면에안정욕구', '속으로알뜰함', '저축본능', '은근한현실감각'],
  '편관': ['겉으로안보이지만내면에의무감', '쉬는중에도해야할것생각', '숨겨진책임감'],
  '정관': ['내면의질서의식', '속으로규칙적', '겉은자유로워보여도속은반듯'],
  '편인': ['숨겨진독창성', '내면의독학능력', '겉으로안보이는직감', '비밀스러운관심사'],
  '정인': ['내면의학습욕구', '속으로배움에목마름', '숨겨진지적호기심', '마음속멘토가있음']
};


// ===========================================================
// ② 일주 고유 키워드 (60일주 — 천간+지지 조합의 독특한 케미)
// 일간 키워드(①)와 다른 점: 같은 일간이라도 일지에 따라 달라지는 부분
// ===========================================================
var ILJU_KW = {
  // ── 갑(甲) 일간 ──
  '갑자': {core:['큰나무가깊은물위에앉음','지혜로운리더','속이깊고전략적','인기있음','학문적'],shadow:['고독감','겉과속이다름','감정숨김']},
  '갑인': {core:['큰나무가자기뿌리에앉음','자존감최강','순수한추진력','독립적','왕의기운'],shadow:['고집이과함','남의말안들음','독불장군']},
  '갑진': {core:['나무가비옥한땅에뿌리내림','재물복','안정된성장','실속있는리더십'],shadow:['욕심이생김','변화를두려워함','안주하려는경향']},
  '갑오': {core:['나무에불이붙음','화려한표현력','예술적','성급함','열정적리더'],shadow:['쉽게달아오르고쉽게꺼짐','인내력부족','감정적결정']},
  '갑신': {core:['나무가도끼를만남','자기변화능력','끊임없는자기혁신','결단력'],shadow:['자해적경향','자기를너무몰아붙임','스트레스']},
  '갑술': {core:['가을산의큰나무','고독한지도자','철학적','원칙주의','만년에빛남'],shadow:['외로움','융통성부족','사람을멀리함']},

  // ── 을(乙) 일간 ──
  '을축': {core:['겨울땅의풀','강인한생명력','역경속에서피어남','은근한끈기','현실적'],shadow:['환경이열악함','인정받기어려움','늦게피는꽃']},
  '을묘': {core:['봄날의꽃','매력적','예술적감수성','인기많음','사교적'],shadow:['의지력약함','환경에흔들림','결단력부족']},
  '을사': {core:['덩굴이불을만남','변신능력','적응의달인','영리함','임기응변'],shadow:['정체성혼란','어디에도뿌리못내림','불안정']},
  '을미': {core:['정원의꽃','안정된아름다움','가정적','내면이풍부','예술적자질'],shadow:['소심함','모험을안함','안전지대에머무름']},
  '을유': {core:['꽃이가위를만남','날카로운미적감각','완벽주의','세련됨'],shadow:['예민함','자기비판','타인에게도엄격']},
  '을해': {core:['겨울꽃','독특한매력','비주류','독립적사고','영적감수성'],shadow:['외로움','이해받기어려움','고립감']},

  // ── 병(丙) 일간 ──
  '병자': {core:['한밤의태양','내면에강한빛','모순적매력','역발상','지혜로운열정'],shadow:['갈등이많음','겉과속의괴리','감정기복']},
  '병인': {core:['봄날의태양','생명력넘침','따뜻한리더','만인의귀인','활력'],shadow:['자기과신','에너지소진','번아웃주의']},
  '병진': {core:['구름위의태양','큰그림을그림','비전가','사회적영향력'],shadow:['현실감부족','이상과현실괴리','실행력약함']},
  '병오': {core:['한여름태양','에너지최강','열정폭발','주목받는존재'],shadow:['과열위험','감정조절어려움','급한성격']},
  '병신': {core:['석양의태양','성숙한매력','결단력있는열정','실행력있는비전가'],shadow:['자기변화에대한두려움','완벽주의','자기의심']},
  '병술': {core:['가을해질녘','따뜻한카리스마','후배를챙김','만년에빛남'],shadow:['고독감','에너지하락','번아웃후회복느림']},

  // ── 정(丁) 일간 ──
  '정축': {core:['눈속의촛불','조용한끈기','차가운환경에서빛남','은밀한열정'],shadow:['표현이서투름','마음을잘안열음','내향적']},
  '정묘': {core:['봄밤의촛불','예술적감성','따뜻한분위기메이커','사랑스러운매력'],shadow:['감정에휘둘림','우유부단','의존적']},
  '정사': {core:['활활타오르는불','강한에너지','카리스마','두뇌회전빠름','승부욕'],shadow:['공격적일수있음','자기주장과함','조급함']},
  '정미': {core:['여름밤의촛불','따뜻한가정인','포용력','음식솜씨','안정추구'],shadow:['변화를두려워함','소극적','안전지대에안주']},
  '정유': {core:['보석위의촛불','섬세한아름다움','완벽주의','미적감각탁월'],shadow:['예민함','자기비판심함','완벽하지않으면불안']},
  '정해': {core:['바다위의등대','방향을제시하는사람','비전+감성','독립적인영혼'],shadow:['외로움','이해받지못하는느낌','방황가능']},

  // ── 무(戊) 일간 ──
  '무자': {core:['강가의큰산','풍요와안정','재물감각','현실적리더십'],shadow:['물질에집착','감정보다현실','냉정해보임']},
  '무인': {core:['숲속의큰산','성장하는안정','나무가자라는산','발전적'],shadow:['느림','변화에저항','보수적']},
  '무진': {core:['광활한대지','큰그릇','포용력최강','리더의그릇'],shadow:['고집셈','움직이지않으려함','무거움']},
  '무오': {core:['화산','내면에열정품은산','묵직한카리스마','뜨거운신념'],shadow:['한번터지면걷잡을수없음','분노조절','고집+열정=독단']},
  '무신': {core:['광산','내면에보석을품은산','실속있음','현실적결단력'],shadow:['냉정함','이익중심','감정표현부족']},
  '무술': {core:['사막의큰산','고독한위엄','원칙의화신','변치않는신념'],shadow:['융통성없음','고독','외로운정상']},

  // ── 기(己) 일간 ──
  '기축': {core:['겨울논밭','축적의달인','묵묵히모으는사람','인내력최강'],shadow:['재미없어보임','보수적','변화싫어함']},
  '기묘': {core:['봄정원','사람키우는능력','세심한배려','따뜻한관리자'],shadow:['남을챙기다자기못챙김','과도한배려','번아웃']},
  '기사': {core:['뜨거운밭','열정적기획자','실행력있는세심함','사업감각'],shadow:['급함','완벽주의','자기를몰아붙임']},
  '기미': {core:['여름논밭','풍요로운기획자','결실을만듦','현실적풍요'],shadow:['고집','자기방식고수','변화거부']},
  '기유': {core:['가을정원','세련된관리자','미적감각+실용성','깔끔함'],shadow:['예민한잔소리','과도한기준','타인에게엄격']},
  '기해': {core:['겨울정원','깊은내면','지혜로운관리자','영적감수성'],shadow:['우울경향','감정에잠김','외로움']},

  // ── 경(庚) 일간 ──
  '경자': {core:['물속의칼','지혜로운결단','냉철하지만깊은생각','전략적승부사'],shadow:['감정이차가워보임','외로움','계산적이라는오해']},
  '경인': {core:['숲속의바위','개혁자','기존것을부수고새것을세움','혁명적'],shadow:['파괴적일수있음','주변과충돌','급진적']},
  '경진': {core:['흙속의금','숨은실력자','때를기다리는승부사','큰그릇'],shadow:['드러나지않는답답함','인정욕구','기다림의고통']},
  '경오': {core:['용광로의쇠','단련된강철','시련으로강해지는사람','불속에서빛남'],shadow:['감정기복','자기를너무몰아붙임','극단적']},
  '경신': {core:['순수한쇠','칼같은판단','정의로움','직설적','결단력최강'],shadow:['융통성없음','냉정','독선적일수있음']},
  '경술': {core:['가을바위','원숙한결단력','경험에서오는지혜','만년에빛남'],shadow:['고독','완고함','변화거부']},

  // ── 신(辛) 일간 ──
  '신축': {core:['흙속의보석','세공이필요한원석','늦게빛나는재능','숨겨진아름다움'],shadow:['초반에고생','인정받기어려움','인내가필요']},
  '신묘': {core:['봄의보석','화사한매력','사교적','예술적재능','인기'],shadow:['속이여림','겉은화려하나내면불안','의존적']},
  '신사': {core:['불에단련된금','강한의지','시련으로빛나는보석','변신능력'],shadow:['극적인생','기복큼','안정이어려움']},
  '신미': {core:['정원의보석','안정된아름다움','세련되고따뜻함','미적감각'],shadow:['안주하려함','변화두려움','도전정신부족']},
  '신유': {core:['순수한보석','자기기준확고','날카로운심미안','완벽주의'],shadow:['자기비판심함','타인에게날카로움','외로움']},
  '신해': {core:['바다의진주','깊은내면의아름다움','독립적','신비로운매력'],shadow:['감정에잠김','고립','이해받기어려움']},

  // ── 임(壬) 일간 ──
  '임자': {core:['깊은바다','지혜의극치','포용력최강','전략가','흐름을읽는달인'],shadow:['너무깊어서외로움','감정바다에빠짐','방향을잃을수있음']},
  '임인': {core:['숲속의큰강','생명력넘치는물','만물을키우는힘','교육자질'],shadow:['에너지분산','집중력약함','이것저것손댐']},
  '임진': {core:['호수','재물감각뛰어남','현실적지혜','안정적풍요'],shadow:['욕심이생김','안전지대안주','모험회피']},
  '임오': {core:['뜨거운물','열정적인지혜','감성과이성의공존','독특한매력'],shadow:['내면갈등','감정과이성충돌','기복큼']},
  '임신': {core:['폭포','강한추진력','시원시원한결단','장애물을뚫는힘'],shadow:['급함','주변을배려못할수있음','독단적']},
  '임술': {core:['마른땅위의깊은물','외유내강','고독한개척자','위기에오히려각성','타협을모르는끈기'],shadow:['고독','감정표현서투름','완벽주의피로','주변에벽을세움']},

  // ── 계(癸) 일간 ──
  '계축': {core:['겨울의이슬','조용한축적','인내의결정체','묵묵한실력자'],shadow:['우울경향','드러나지않는답답함','감정표현어려움']},
  '계묘': {core:['봄비','만물을살리는감성','치유능력','따뜻한교감'],shadow:['감정에쉽게잠김','상처받기쉬움','경계가약함']},
  '계사': {core:['온천','뜨거운물','변화의감성','영리한직감','적응력'],shadow:['정체성혼란','감정기복','안정이어려움']},
  '계미': {core:['여름비','풍요로운감성','따뜻한돌봄','가정적'],shadow:['소심함','의존적','스스로결정못내림']},
  '계유': {core:['이슬맺힌보석','섬세한아름다움','날카로운직감','미적감각'],shadow:['예민함','자기비판','완벽주의']},
  '계해': {core:['끝없는바다','직감력극대화','영적감수성','깊은감정의세계'],shadow:['감정의늪','우울경향','현실도피','방향상실']}
};

// 전부 core+shadow 있는지 확인
var missing = [];
Object.keys(ILJU_KW).forEach(function(k){
  if(!ILJU_KW[k].core || !ILJU_KW[k].shadow) missing.push(k);
});

// ===========================================================
// 동적 키워드 생성 함수
// ===========================================================
function formatKeywordsForAI(kwObj) {
  if (!kwObj || typeof kwObj !== 'object') return '';
  var lines = [];
  Object.keys(kwObj).forEach(function(key) {
    var val = kwObj[key];
    if (Array.isArray(val)) {
      lines.push('- ' + key + ': ' + val.join(', '));
    } else if (typeof val === 'string') {
      lines.push('- ' + key + ': ' + val);
    }
  });
  return lines.join('\n');
}

function generateDynamicKeywords(saju, gg, dw, gm, jjgRatio) {
  var result = {};
  var dm = saju.dm;           // 일간 글자 (갑,을,병...)
  var ilju = saju.P[2].s + saju.P[2].b;  // 일주 (임술 등)
  var isStrong = gg.strong;   // 신강/신약

  // ① 일간 본질 키워드
  if (ILGAN_KW[dm]) {
    result['일간본질'] = isStrong ? ILGAN_KW[dm].strong : ILGAN_KW[dm].weak;
  }

  // ② 일주 고유 키워드
  if (ILJU_KW[ilju]) {
    result['일주특성'] = ILJU_KW[ilju].core;
    result['일주그림자'] = ILJU_KW[ilju].shadow;
  }

  // ③ 격국 체감 키워드
  var dominant = gg.dominant[0]; // 가장 강한 십성 그룹
  if (GYEOKGUK_KW[dominant]) {
    result['격국체감'] = isStrong ? GYEOKGUK_KW[dominant].strong : GYEOKGUK_KW[dominant].weak;
  }

  // ④ 십성의 궁위 배치 키워드
  var gungwiKW = [];
  var pillars = ['year','month','day','hour'];
  var pillarNames = ['년주','월주','일지','시주'];
  saju.ss.forEach(function(s, i) {
    var ssName = s.ss; // 비견, 식신, 편관 등
    var pillar = pillars[i];
    if (SIPSUNG_GUNGWI_KW[ssName] && SIPSUNG_GUNGWI_KW[ssName][pillar]) {
      var kws = SIPSUNG_GUNGWI_KW[ssName][pillar];
      gungwiKW.push(pillarNames[i] + ' ' + ssName + ': ' + kws.slice(0,2).join(', '));
    }
  });
  if (gungwiKW.length > 0) result['십성궁위'] = gungwiKW;

  // ⑤ 십성 간 관계 키워드
  var relKW = [];
  // 실수값 십성 비중 사용
  var sCnt = {};
  var grps = ['비겁','식상','재성','관성','인성'];
  grps.forEach(function(g){ sCnt[g] = gg.cnt[g] || 0; });
  // ★ 개별 십성 카운트 (_raw) + 신강 여부 (_strong) 추가 (통변 공식용)
  var rawSS = {};
  saju.ss.forEach(function(s){if(s.ss && s.pillar!=='일주'){rawSS[s.ss]=(rawSS[s.ss]||0)+1;}});
  sCnt._raw = rawSS;
  sCnt._strong = gg.strong;
  
  SIPSUNG_REL_KW.forEach(function(r) {
    if (r.cond(sCnt)) {
      relKW = relKW.concat(r.kw);
    }
  });
  if (relKW.length > 15) relKW = relKW.slice(0, 15);
  if (relKW.length > 0) result['십성관계'] = relKW;

  // ⑥ 오행 과부족 체감 키워드
  var ohKW = [];
  var ohs = ['목','화','토','금','수'];
  ohs.forEach(function(oh) {
    var cnt = saju.el[oh] || 0;
    if (cnt === 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(0): ' + OHENG_KW[oh].zero.slice(0,2).join(', '));
    } else if (cnt >= 3 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '과다): ' + OHENG_KW[oh].excess.slice(0,2).join(', '));
    } else if (cnt <= 1 && cnt > 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '부족): ' + OHENG_KW[oh].lack.slice(0,2).join(', '));
    }
  });
  if (ohKW.length > 0) result['오행밸런스'] = ohKW;

  // ⑦ 합충형 체감 키워드
  var hapchungKW = [];
  // 천간합
  var ganPairs = [
    [saju.P[0].s, saju.P[1].s, 'year-month'],
    [saju.P[0].s, saju.P[2].s, 'year-day'],
    [saju.P[1].s, saju.P[2].s, 'month-day'],
    [saju.P[2].s, saju.P[3].s, 'day-hour']
  ];
  var hapMap = {'갑기':'갑기합토','기갑':'갑기합토','을경':'을경합금','경을':'을경합금',
                '병신':'병신합수','신병':'병신합수','정임':'정임합목','임정':'정임합목',
                '무계':'무계합화','계무':'무계합화'};
  ganPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (hapMap[key] && CHEONGAN_HAP_KW[hapMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('합: ' + hapMap[key] + '(' + gungwi + ') — ' + CHEONGAN_HAP_KW[hapMap[key]].slice(0,2).join(', '));
      if (HAP_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + HAP_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  // 지지충
  var jiPairs = [
    [saju.P[0].b, saju.P[1].b, 'year-month'],
    [saju.P[0].b, saju.P[2].b, 'year-day'],
    [saju.P[0].b, saju.P[3].b, 'year-hour'],
    [saju.P[1].b, saju.P[2].b, 'month-day'],
    [saju.P[1].b, saju.P[3].b, 'month-hour'],
    [saju.P[2].b, saju.P[3].b, 'day-hour']
  ];
  var chungMap = {'자오':'자오충','오자':'자오충','축미':'축미충','미축':'축미충',
                  '인신':'인신충','신인':'인신충','묘유':'묘유충','유묘':'묘유충',
                  '진술':'진술충','술진':'진술충','사해':'사해충','해사':'사해충'};
  jiPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (chungMap[key] && JIJI_CHUNG_KW[chungMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('충: ' + chungMap[key] + '(' + gungwi + ') — ' + JIJI_CHUNG_KW[chungMap[key]].slice(0,2).join(', '));
      if (CHUNG_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + CHUNG_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  if (hapchungKW.length > 0) result['합충체감'] = hapchungKW;

  // ⑦-b 지지형(刑) 탐지
  var hyungKW = [];
  var allJi = saju.P.map(function(p){return p.b;});
  // 인사신 삼형
  if (allJi.indexOf('인')>=0 && allJi.indexOf('사')>=0 && allJi.indexOf('신')>=0) {
    hyungKW.push('삼형살(인사신): ' + JIJI_HYUNG_KW['인사신'].slice(0,2).join(', '));
  } else {
    // 인사, 사신, 인신 부분형
    [['인','사'],['사','신'],['인','신']].forEach(function(pair){
      if(allJi.indexOf(pair[0])>=0 && allJi.indexOf(pair[1])>=0){
        hyungKW.push('부분형('+pair[0]+pair[1]+'): 갈등의씨앗, 시련속성장');
      }
    });
  }
  // 축술미 삼형
  if (allJi.indexOf('축')>=0 && allJi.indexOf('술')>=0 && allJi.indexOf('미')>=0) {
    hyungKW.push('삼형살(축술미): ' + JIJI_HYUNG_KW['축술미'].slice(0,2).join(', '));
  }
  // 자묘 무례지형
  if (allJi.indexOf('자')>=0 && allJi.indexOf('묘')>=0) {
    hyungKW.push('무례지형(자묘): ' + JIJI_HYUNG_KW['자묘'].slice(0,2).join(', '));
  }
  // 자형 (같은 지지 2개 이상)
  var jiCount = {};
  allJi.forEach(function(j){jiCount[j]=(jiCount[j]||0)+1;});
  Object.keys(jiCount).forEach(function(j){
    if(jiCount[j]>=2){
      hyungKW.push('자형('+j+j+'): ' + JIJI_HYUNG_KW['자형'].slice(0,2).join(', '));
    }
  });
  if (hyungKW.length > 0) {
    if (result['합충체감']) {
      result['합충체감'] = result['합충체감'].concat(hyungKW);
    } else {
      result['합충체감'] = hyungKW;
    }
  }

  // ★ ⑦-b2 천간충 키워드
  var ganPairs = [];
  var ganLabels = ['연간','월간','일간','시간'];
  var allGan = saju.P.map(function(p){return p.s;});
  for(var gi=0;gi<allGan.length;gi++)for(var gj=gi+1;gj<allGan.length;gj++){
    ganPairs.push([allGan[gi],allGan[gj],ganLabels[gi]+'-'+ganLabels[gj]]);
  }
  var cheonganChungMap={'갑경':'갑경충','경갑':'갑경충','을신':'을신충','신을':'을신충','병임':'병임충','임병':'병임충','정계':'정계충','계정':'정계충'};
  var ccKW=[];
  ganPairs.forEach(function(p){
    var key=p[0]+p[1];
    if(cheonganChungMap[key]&&CHEONGAN_CHUNG_KW[cheonganChungMap[key]]){
      ccKW.push('천간충: '+cheonganChungMap[key]+'('+p[2]+') — '+CHEONGAN_CHUNG_KW[cheonganChungMap[key]].slice(0,2).join(', '));
    }
  });
  if(ccKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(ccKW);
    else result['합충체감']=ccKW;
  }

  // ★ ⑦-b3 지지해(害) 키워드
  var haeMap={'자미':'자미해','미자':'자미해','축오':'축오해','오축':'축오해','인사':'인사해','사인':'인사해','묘진':'묘진해','진묘':'묘진해','신해':'신해해','해신':'신해해','유술':'유술해','술유':'유술해'};
  var haeKW=[];
  jiPairs.forEach(function(p){
    var key=p[0]+p[1];
    if(haeMap[key]&&JIJI_HAE_KW[haeMap[key]]){
      haeKW.push('해(害): '+haeMap[key]+'('+p[2]+') — '+JIJI_HAE_KW[haeMap[key]].slice(0,2).join(', '));
    }
  });
  if(haeKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(haeKW);
    else result['합충체감']=haeKW;
  }

  // ⑦-c 삼합 탐지
  var samhapSets = [
    {ji:['신','자','진'],oh:'수국',kw:'지혜와적응력의삼합, 물의에너지결집'},
    {ji:['해','묘','미'],oh:'목국',kw:'성장과추진력의삼합, 나무의에너지결집'},
    {ji:['인','오','술'],oh:'화국',kw:'열정과표현력의삼합, 불의에너지결집'},
    {ji:['사','유','축'],oh:'금국',kw:'결단력과실행의삼합, 금의에너지결집'}
  ];
  samhapSets.forEach(function(sh){
    var cnt = 0;
    sh.ji.forEach(function(j){if(allJi.indexOf(j)>=0) cnt++;});
    if(cnt >= 3){
      if(!result['합충체감']) result['합충체감'] = [];
      result['합충체감'].push('삼합('+sh.oh+'): '+sh.kw);
    }
  });

  // ⑧ 대운 전환 체감
  if (dw.daewoons && dw.currentDWIdx >= 1) {
    var prevDW = dw.daewoons[dw.currentDWIdx - 1];
    var currDW = dw.daewoons[dw.currentDWIdx];
    if (prevDW && currDW) {
      // 십성 그룹 매핑
      var ssToGroup = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                       '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                       '편인':'인성','정인':'인성'};
      var prevG = ssToGroup[prevDW.ss] || prevDW.ss;
      var currG = ssToGroup[currDW.ss] || currDW.ss;
      var transKey = prevG + '→' + currG;
      if (DW_TRANSITION_KW[transKey]) {
        result['대운전환'] = [prevDW.ss + '운→' + currDW.ss + '운: ' + DW_TRANSITION_KW[transKey].join(', ')];
      }
    }
  }

  // ⑨ 나이×대운 교차
  if (dw.currentAge && dw.daewoons && dw.currentDWIdx >= 0) {
    var age = dw.currentAge;
    var ageGroup = age < 30 ? '20대' : age < 40 ? '30대' : age < 50 ? '40대' : '50대이후';
    var currDW2 = dw.daewoons[dw.currentDWIdx];
    if (currDW2) {
      var ssToGroup2 = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                        '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                        '편인':'인성','정인':'인성'};
      var dwGroup = ssToGroup2[currDW2.ss] || currDW2.ss;
      if (AGE_DW_KW[ageGroup] && AGE_DW_KW[ageGroup][dwGroup]) {
        result['나이대운'] = [age + '세 ' + ageGroup + '+' + currDW2.ss + '운: ' + AGE_DW_KW[ageGroup][dwGroup].join(', ')];
      }
    }
  }

  // ⑩ 지장간 정기의 숨은 십성
  if (jjgRatio) {
    var hiddenKW = [];
    jjgRatio.forEach(function(r) {
      if (!r) return;
      // 정기(마지막 item)의 십성
      var jeonggi = r.items[r.items.length - 1];
      if (jeonggi && JIJANGGAN_HIDDEN_KW[jeonggi.ss]) {
        hiddenKW.push(r.pillar + ' ' + r.ji + ' 정기(' + jeonggi.ss + '): ' + JIJANGGAN_HIDDEN_KW[jeonggi.ss][0]);
      }
    });
    if (hiddenKW.length > 0) result['숨은십성'] = hiddenKW;
  }

  // ⑪ 12운성 체감 (일지 기준)
  var iljiUns = saju.uns[2]; // 일지 12운성
  if (iljiUns && UNSUNG_KW[iljiUns]) {
    result['일지운성'] = ['일지 ' + iljiUns + ': ' + UNSUNG_KW[iljiUns].join(', ')];
  }

  // ★ 조후(온도) 체감 키워드
  if (gg.johuDesc) {
    result['조후체감'] = [gg.seasonName + ': ' + gg.johuDesc];
  } else if (gg.seasonName) {
    var deukTxt = gg.deukryeong ? '일간이 계절의 힘을 받아 에너지가 넘침' : '일간이 계절에서 힘을 잃어 외부 도움이 필요';
    result['조후체감'] = [gg.seasonName + ': ' + deukTxt];
  }

  // ⑫ 공망 궁위별 체감
  if (gm && gm.empty && gm.empty.length > 0) {
    var gmKW = [];
    var jiToPillar = {};
    saju.P.forEach(function(p, i) {
      jiToPillar[p.b] = pillars[i];
    });
    gm.empty.forEach(function(e) {
      if (jiToPillar[e] && GONGMANG_GUNGWI_KW[jiToPillar[e]]) {
        gmKW.push(e + '(' + pillarNames[pillars.indexOf(jiToPillar[e])] + '공망): ' + GONGMANG_GUNGWI_KW[jiToPillar[e]].slice(0,2).join(', '));
      }
    });
    if (gmKW.length > 0) result['공망체감'] = gmKW;
  }

  // ⑬ 적천수 십간론 — 일간의 물상·본질·위험
  if (JEOKCHEONSU[dm]) {
    var jc = JEOKCHEONSU[dm];
    result['적천수물상'] = [jc.title];
    result['적천수본질'] = [isStrong ? jc.strong_img : jc.weak_img];
    result['적천수연애'] = [jc.love];
    result['적천수직업'] = [jc.work];
    result['적천수위험'] = [jc.danger];
  }

  // ⑭ 자평진전 격국론 — 격국의 사회적 역할 + 파격 조건
  var ggName = gg.gyeokgukName || '';
  var jpKey = '';
  // 격국명에서 자평진전 키 매칭
  ['식신격','상관격','편재격','정재격','편관격','정관격','편인격','정인격','건록격','양인격'].forEach(function(gk) {
    if (ggName.indexOf(gk) >= 0) jpKey = gk;
  });
  if (jpKey && JAPYEONG_GG[jpKey]) {
    var jp = JAPYEONG_GG[jpKey];
    result['격국역할'] = [jp.role];
    result['격국성격'] = [jp.intact];
    // 파격 조건 체크 — 현재 사주에 해당하는 파격이 있는지 확인
    var breakKW = [];
    jp.breaks.forEach(function(br) {
      // 효신탈식: 편인 있고 식신 있음
      if (br.cond.indexOf('효신탈식') >= 0 && sCnt._raw['편인'] && sCnt._raw['식신']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 상관견관: 상관 있고 정관 있음
      else if (br.cond.indexOf('상관견관') >= 0 && sCnt._raw['상관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 관살혼잡: 편관+정관 동시
      else if (br.cond.indexOf('관살혼잡') >= 0 && sCnt._raw['편관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 겁재 탈재/파재: 겁재 있고 편재/정재 있음
      else if ((br.cond.indexOf('겁재 탈재') >= 0 || br.cond.indexOf('겁재 파재') >= 0) && sCnt._raw['겁재'] && (sCnt._raw['편재'] || sCnt._raw['정재'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 비견 쟁재: 비견 있고 편재 있음
      else if (br.cond.indexOf('비견 쟁재') >= 0 && sCnt._raw['비견'] && sCnt._raw['편재']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 식상 혼잡: 식신+상관 동시
      else if (br.cond.indexOf('식상 혼잡') >= 0 && sCnt._raw['식신'] && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 인성 제압: 편인 or 정인이 상관을 극
      else if (br.cond.indexOf('인성 제압') >= 0 && (sCnt._raw['편인'] || sCnt._raw['정인']) && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 재성 파인: 재성이 인성을 극
      else if (br.cond.indexOf('재성 파인') >= 0 && (sCnt._raw['편재'] || sCnt._raw['정재']) && (sCnt._raw['편인'] || sCnt._raw['정인'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 편인 과다
      else if (br.cond.indexOf('편인 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 인성 과다
      else if (br.cond.indexOf('인성 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 비겁 과다
      else if (br.cond.indexOf('비겁 과다') >= 0 && gg.cnt['비겁'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 과다한 식신: 식상 과다
      else if (br.cond.indexOf('과다한 식신') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 상관 과다
      else if (br.cond.indexOf('상관 과다') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 편관 과다
      else if (br.cond.indexOf('편관 과다') >= 0 && gg.cnt['관성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 제어 없는 칠살/양인: 편관 있는데 식신 없음
      else if (br.cond.indexOf('제어 없는') >= 0 && sCnt._raw['편관'] && !sCnt._raw['식신'] && !sCnt._raw['편인']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 신약 편관: 신약이고 편관 있음
      else if (br.cond.indexOf('신약 편관') >= 0 && !isStrong && sCnt._raw['편관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 관성/재성 부재
      else if (br.cond.indexOf('관성 부재') >= 0 && gg.cnt['관성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('재성 부족') >= 0 && gg.cnt['재성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
    });
    if (breakKW.length > 0) result['격국파격'] = breakKW;
  }

  return result;
}

// ===========================================================
// 물상(物象) 매핑 상수 — B안: 키워드를 자연물 이미지로 변환
// ===========================================================
var CHEONGAN_MULSANG = {
  '갑':'큰 나무','을':'꽃과 덩굴','병':'태양','정':'촛불',
  '무':'큰 산','기':'논밭','경':'바위','신':'보석','임':'큰 강','계':'빗물'
};
var JIJI_MULSANG = {
  '자':'깊은 밤의 물웅덩이','축':'얼어붙은 논밭','인':'이른 봄 숲속',
  '묘':'활짝 핀 봄꽃밭','진':'봄비 내리는 습한 흙','사':'뜨거운 여름 한낮',
  '오':'한여름 타오르는 불꽃','미':'무르익은 여름 정원','신':'서리 내린 가을 바위산',
  '유':'가을 달빛 아래 보석','술':'낙엽 진 메마른 들판','해':'겨울 초입의 차가운 바다'
};
var WOLJI_SEASON = {
  '인':'이른 봄, 새싹이 움트는 계절','묘':'완연한 봄, 꽃이 만개하는 계절',
  '진':'늦봄, 비 내려 땅이 촉촉한 환절기','사':'초여름, 뜨거운 기운이 시작되는 계절',
  '오':'한여름, 가장 뜨거운 계절','미':'늦여름, 무르익은 열기의 끝자락',
  '신':'초가을, 서늘한 바람이 부는 계절','유':'완연한 가을, 결실을 맺는 계절',
  '술':'늦가을, 낙엽 지는 메마른 계절','해':'초겨울, 차가운 물이 깊어지는 계절',
  '자':'한겨울, 가장 깊고 고요한 계절','축':'늦겨울, 봄을 준비하는 마지막 추위'
};
var OHENG_MULSANG = {
  '목':'나무/바람/새싹','화':'불/빛/열기','토':'흙/산/대지',
  '금':'바위/쇠/칼/제방','수':'물/비/강/바다'
};
var HAP_MULSANG = {
  '갑기합토':'나무가 흙에 뿌리 내리듯 결합 → 안정과 결실을 만드는 힘',
  '을경합금':'꽃이 바위에 기대듯 결합 → 부드러움과 단단함의 만남',
  '병신합수':'태양이 바위에 반사되어 물이 되듯 → 열정이 지혜로 변환',
  '정임합목':'촛불이 강물을 만나 나무가 되듯 → 따뜻함과 지혜가 생명력으로',
  '무계합화':'산이 빗물을 받아 불을 피우듯 → 무거운 안정감이 열정으로 변환'
};
var CHUNG_MULSANG = {
  '자오충':'깊은 밤 물과 한낮 불이 정면충돌 → 감정과 열정이 극단적으로 요동',
  '축미충':'겨울 논밭과 여름 정원이 부딪힘 → 저축과 소비, 안정과 변화의 갈등',
  '인신충':'봄 숲과 가을 바위산이 부딪힘 → 성장 욕구와 현실 제약의 충돌',
  '묘유충':'봄꽃과 가을 보석이 부딪힘 → 감성과 이성, 부드러움과 날카로움의 긴장',
  '진술충':'습한 흙과 메마른 들판이 부딪힘 → 발밑이 흔들리는 불안정, 뿌리가 안정되지 못함',
  '사해충':'여름 한낮과 겨울 바다가 부딪힘 → 뜨거운 야망과 차가운 현실의 대립'
};
var GUNGWI_LABEL = {
  'year':'연주(어린시절/뿌리)','month':'월주(사회/직업)',
  'day':'일지(내면/배우자)','hour':'시주(미래/자녀/말년)',
  'year-month':'어린시절↔사회','year-day':'뿌리↔내면',
  'year-hour':'어린시절↔미래','month-day':'사회↔내면',
  'month-hour':'사회↔미래','day-hour':'내면↔미래'
};

// ===========================================================
// 물상 기반 키워드 텍스트 생성 함수 (B안)
// ===========================================================
function generateMulsangText(saju, gg, dynKW) {
  var lines = [];
  var dm = saju.dm; // 일간
  var ilji = saju.P[2].b; // 일지
  var wolji = saju.P[1].b; // 월지

  // ── 1. 원국 풍경 ──
  lines.push('### 원국 풍경 (이 이미지를 기반으로 풀이의 비유를 만드세요)');
  var mainImage = (WOLJI_SEASON[wolji]||'') + '. ';
  mainImage += (JIJI_MULSANG[ilji]||'') + ' 위의 ' + (CHEONGAN_MULSANG[dm]||dm) + '.';
  lines.push(mainImage);

  // 일간+월지 조합 풍경 묘사
  var dmMul = CHEONGAN_MULSANG[dm]||dm;
  var wolMul = JIJI_MULSANG[wolji]||wolji;
  var iljiMul = JIJI_MULSANG[ilji]||ilji;
  lines.push('주인공(' + dmMul + ')이 ' + wolMul + '의 계절을 살고 있고, 발을 딛고 있는 땅은 ' + iljiMul + '.');

  // 신강/신약 풍경
  if (gg.strong) {
    lines.push('→ ' + dmMul + '의 힘이 넘침. 주변을 압도하는 존재감.');
  } else {
    lines.push('→ ' + dmMul + '의 힘이 약함. 주변 환경에서 도움이 필요한 상태.');
  }
  lines.push('');

  // ── 2. 궁위별 풍경 ──
  lines.push('### 사주의 네 기둥 (각 기둥을 자연물 이미지로)');
  var pillarLabels = ['연주(어린시절/뿌리)','월주(사회/직업)','일주(나 자신)','시주(미래/말년)'];
  saju.P.forEach(function(p, i) {
    var stemMul = CHEONGAN_MULSANG[p.s]||p.s;
    var branchMul = JIJI_MULSANG[p.b]||p.b;
    var ss = saju.ss[i] ? saju.ss[i].ss : '';
    lines.push('- ' + pillarLabels[i] + ': ' + stemMul + '이(가) ' + branchMul + ' 위에');
    // 십성 의미를 물상으로 변환
    var ssDesc = '';
    if (ss.indexOf('비견')>=0||ss.indexOf('겁재')>=0) ssDesc = '→ 나와 비슷한 에너지, 경쟁/동료의 기운';
    else if (ss.indexOf('식신')>=0||ss.indexOf('상관')>=0) ssDesc = '→ 내가 표현하고 창작하는 에너지, 재능과 끼의 기운';
    else if (ss.indexOf('편재')>=0||ss.indexOf('정재')>=0) ssDesc = '→ 현실적 재물과 관계의 에너지, 돈과 사람의 기운';
    else if (ss.indexOf('편관')>=0||ss.indexOf('정관')>=0) ssDesc = '→ 규율과 책임의 에너지, 직장과 권위의 기운';
    else if (ss.indexOf('편인')>=0||ss.indexOf('정인')>=0) ssDesc = '→ 배움과 보호의 에너지, 지식과 어머니의 기운';
    if (ssDesc) lines.push('  ' + ssDesc);
  });

  var lines = [];
  var order = ['적천수물상','적천수본질','적천수연애','적천수직업','적천수위험',
               '격국역할','격국성격','격국파격',
               '일간본질','일주특성','일주그림자','격국체감','조후체감','십성궁위',
               '십성관계','오행밸런스','합충체감','대운전환','나이대운',
               '숨은십성','일지운성','공망체감'];
  order.forEach(function(key) {
    if (dynKW[key] && dynKW[key].length > 0) {
      var vals = Array.isArray(dynKW[key][0]) ? dynKW[key] : dynKW[key];
      lines.push('- ' + key + ': ' + vals.join(', '));
    }
  });
  return lines.join('\n');
}




// [REMOVED for theory module] Lines 4623-5241: mkFB — 폴백 함수 (MBTI 깊이 의존, 판단 로직은 profileAnalysis/generateDynamicKeywords에 이미 존재)


// [REMOVED for theory module] Lines 5242-5354: buildChatPrompt, sendChatToAI — 채팅 AI 코드 + 인터페이스 주석


// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║  PART 3: mbts-logic 기반 — 물상 이론, 오행 밸런스, 궁합 축         ║
// ║  (514줄)                                                           ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

// ======================================================================
// saju-theory-part3.js — mbts-logic.js + mbts-logic-v2.js 기반 사주 이론
// 원본: mbts-logic.js + mbts-logic-v2.js (v1 풍부한 버전 우선) → 순수 사주 이론만 추출
// 제거: MBTS 인지기능 매핑(MBTS_FUNCTIONS/ganToMBTS/OHENG_TO_ENERGY)
//       + MBTI 교차(detectDiscrepancy/getMBTILevel/analyzeMBTS)
//       + 배포 코드(buildMBTSPrompt/런타임 훅/console.log)
// 유지: 물상 이론, 오행 밸런스, 교운기 속도, 개운법, 궁합 축,
//       관계 가중치, 바넘 방지, 원국 풍경, 신강 등급, 끊어진 고리,
//       합충 우선순위, 암합 분류, 궁합 분석 전부
// ======================================================================

(function() {
  'use strict';

  // ╔══════════════════════════════════════════════════════════╗
  // ║  기초 참조 배열 (출처: mbts-logic.js)                     ║
  // ╚══════════════════════════════════════════════════════════╝

  var TGAN_KR = ['갑','을','병','정','무','기','경','신','임','계'];
  var JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
  var OHENG_TGAN = ['목','목','화','화','토','토','금','금','수','수'];
  var OHENG_JIJI = ['수','토','목','목','토','화','화','토','금','금','토','수'];

  // ╔══════════════════════════════════════════════════════════╗
  // ║  5대 기질 그룹 (출처: mbts-logic.js — color 포함 버전)     ║
  // ╚══════════════════════════════════════════════════════════╝

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

  // ╔══════════════════════════════════════════════════════════╗
  // ║  8자 심리 위치론 (출처: mbts-logic.js — tag 포함 버전)     ║
  // ╚══════════════════════════════════════════════════════════╝

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

  // ╔══════════════════════════════════════════════════════════╗
  // ║  천간충 (funcs 필드 제거 — 인지기능 매핑은 MBTI 영역)      ║
  // ╚══════════════════════════════════════════════════════════╝

  var GAN_CHUNG = [
    { a: 0, b: 6, meaning: '가능성 vs 효율' },
    { a: 1, b: 7, meaning: '직관 vs 분석' },
    { a: 2, b: 8, meaning: '조화 vs 경험' },
    { a: 3, b: 9, meaning: '가치관 vs 기억' }
  ];

  // ╔══════════════════════════════════════════════════════════╗
  // ║  천간합 (resultFunc 필드 제거 — 인지기능 매핑은 MBTI 영역) ║
  // ╚══════════════════════════════════════════════════════════╝

  var GAN_HAP = [
    { a: 0, b: 5, resultOh: '토', meaning: '탐색+수용 → 통합 에너지' },
    { a: 1, b: 6, resultOh: '금', meaning: '통찰+효율 → 사고 에너지' },
    { a: 2, b: 7, resultOh: '수', meaning: '조화+분석 → 감각 에너지' },
    { a: 3, b: 8, resultOh: '목', meaning: '가치관+경험 → 직관 에너지' },
    { a: 4, b: 9, resultOh: '화', meaning: '구조+기억 → 감정 에너지' }
  ];

  // ╔══════════════════════════════════════════════════════════╗
  // ║  물상 이론 — 체현적 인지 (Lakoff & Johnson, 1980)         ║
  // ╚══════════════════════════════════════════════════════════╝

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
    '인': { season: '이른 봄',    mood: '새싹이 움트는 시작의 에너지' },
    '묘': { season: '완연한 봄',   mood: '꽃이 만개하는 생명력' },
    '진': { season: '늦봄',      mood: '비 내려 촉촉한 환절기' },
    '사': { season: '초여름',     mood: '뜨거운 기운이 시작' },
    '오': { season: '한여름',     mood: '가장 뜨겁고 화려한 절정' },
    '미': { season: '늦여름',     mood: '무르익은 열기의 끝자락' },
    '신': { season: '초가을',     mood: '서늘한 바람이 부는 전환' },
    '유': { season: '완연한 가을',  mood: '결실을 맺는 수확' },
    '술': { season: '늦가을',     mood: '낙엽 지는 메마른 정리' },
    '해': { season: '초겨울',     mood: '차가운 물이 깊어지는 시작' },
    '자': { season: '한겨울',     mood: '가장 깊고 고요한 응축' },
    '축': { season: '늦겨울',     mood: '봄을 준비하는 마지막 추위' }
  };

  // ╔══════════════════════════════════════════════════════════╗
  // ║  상생상극 (func 필드 제거 — 인지기능 매핑은 MBTI 영역)     ║
  // ╚══════════════════════════════════════════════════════════╝

  var OH_SANG = { '목':'화','화':'토','토':'금','금':'수','수':'목' };
  var OH_GEUK = { '목':'토','토':'수','수':'화','화':'금','금':'목' };
  var SEASON_OH = { '인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토' };

  var SANGSAENG = [
    { from: '목', to: '화', meaning: '직관이 감정을 키우는 경향' },
    { from: '화', to: '토', meaning: '감정이 구조를 만드는 경향' },
    { from: '토', to: '금', meaning: '구조가 사고를 키우는 경향' },
    { from: '금', to: '수', meaning: '사고가 감각을 키우는 경향' },
    { from: '수', to: '목', meaning: '경험이 직관을 키우는 경향' }
  ];

  var SANGGEUK = [
    { from: '목', to: '토', meaning: '직관 과다 → 구조 약화 경향' },
    { from: '토', to: '수', meaning: '구조 집착 → 경험 거부 경향' },
    { from: '수', to: '화', meaning: '감각 매몰 → 감정 둔화 경향' },
    { from: '화', to: '금', meaning: '감정 과다 → 사고 방해 경향' },
    { from: '금', to: '목', meaning: '분석 과다 → 직관 억제 경향' }
  ];

  // ╔══════════════════════════════════════════════════════════╗
  // ║  개운법 (출처: mbts-logic.js — 풍부한 food 객체 버전)      ║
  // ║  message에서 인지기능 표기(Ne/Ni 등) 제거                  ║
  // ╚══════════════════════════════════════════════════════════╝

  var GAEUN = {
    '목': {
      actions: ['산책','등산','스트레칭','새로운 시도','식물 키우기','독서'],
      anchor: { color: '초록색', items: '초록 노트, 식물, 숲 사진' },
      food: { taste: '신맛', items: '식초, 레몬, 매실', tag: 'exploratory' },
      message: '직관 에너지 보충. 가능성을 탐색하고, 새로운 것을 시도하세요.'
    },
    '화': {
      actions: ['러닝','댄스','핫요가','감정일기','사람 만나기','표현 연습'],
      anchor: { color: '빨간색/주황색', items: '빨간 노트, 따뜻한 조명' },
      food: { taste: '쓴맛', items: '커피, 다크초콜릿, 쑥', tag: 'exploratory' },
      message: '감정 에너지 보충. 감정을 표현하고, 사람과 연결하세요.'
    },
    '토': {
      actions: ['요가','필라테스','규칙적 루틴','정리정돈','요리','텃밭 가꾸기'],
      anchor: { color: '노란색/베이지', items: '베이지 톤 소품, 도자기' },
      food: { taste: '단맛', items: '꿀, 고구마, 대추', tag: 'exploratory' },
      message: '통합 에너지 보충. 안정적인 루틴을 만들고, 중심을 잡으세요.'
    },
    '금': {
      actions: ['웨이트','수영','호흡운동','결단 연습','불필요한 것 버리기'],
      anchor: { color: '흰색/은색', items: '은색 소품, 미니멀 인테리어' },
      food: { taste: '매운맛', items: '생강, 마늘, 고추', tag: 'exploratory' },
      message: '사고 에너지 보충. 결단을 내리고, 효율적으로 정리하세요.'
    },
    '수': {
      actions: ['수영','명상','산책','독서','새로운 경험','여행'],
      anchor: { color: '검정/남색', items: '남색 노트, 물 소리 앱' },
      food: { taste: '짠맛', items: '미역, 다시마, 해산물', tag: 'exploratory' },
      message: '감각 에너지 보충. 경험을 넓히고, 흐름에 몸을 맡기세요.'
    }
  };

  function getGaeun(yongshinOh) {
    if (!yongshinOh) return null;
    var oh5 = ['목','화','토','금','수'];
    var oh = null;
    for (var i = 0; i < oh5.length; i++) {
      if (yongshinOh.indexOf(oh5[i]) >= 0) { oh = oh5[i]; break; }
    }
    return oh ? GAEUN[oh] : null;
  }

  // ╔══════════════════════════════════════════════════════════╗
  // ║  암합 3층위 (출처: mbts-logic-v2.js)                     ║
  // ╚══════════════════════════════════════════════════════════╝

  var AMHAP_LAYERS = {
    'junggi':         { level: '반의식',     desc: '왜인지 모르게 끌리는 수준' },
    'junggi-junggi':  { level: '약한 무의식', desc: '나도 모르게 반복되는 패턴' },
    'yeogi':          { level: '깊은 무의식', desc: '존재 자체를 모르는 연결' }
  };

  // 암합 분류 (출처: mbts-logic.js)
  function classifyAmhap(amhap, saju) {
    if (!amhap || !saju || !saju.jjg) return null;
    return {
      from: amhap.from,
      to: amhap.to,
      hapOh: amhap.hapOh,
      gungwi: amhap.gungwi,
      layer: '반의식',
      consciousnessPath: '암합 → 투출(대운에서 해당 천간 등장 시) → 밝합 → 의식적 선택 가능'
    };
  }

  // ╔══════════════════════════════════════════════════════════╗
  // ║  합충 역학 — 궁위 거리 + 우선순위 3변수                    ║
  // ╚══════════════════════════════════════════════════════════╝

  var PILLAR_DISTANCE = {
    'year-month': 1, 'month-day': 1, 'day-hour': 1,
    'year-day': 2, 'month-hour': 2,
    'year-hour': 3
  };

  // 합충 우선순위 (출처: mbts-logic.js 고유)
  function getHapChungPriority(relA, relB) {
    var distA = PILLAR_DISTANCE[relA.pillars] || 2;
    var distB = PILLAR_DISTANCE[relB.pillars] || 2;

    var proxA = 4 - distA;
    var proxB = 4 - distB;

    var momA = relA.source === '대운' || relA.source === '세운' ? 2 : 1;
    var momB = relB.source === '대운' || relB.source === '세운' ? 2 : 1;

    var purA = relA.purity || 1;
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

  // ╔══════════════════════════════════════════════════════════╗
  // ║  궁합 4대 축 + 관계별 가중치                              ║
  // ╚══════════════════════════════════════════════════════════╝

  var GUNGHAP_AXIS = {
    chemistry:    { name: '끌림', layers: [1, 8, 15], desc: '왜 끌리는가' },
    compensation: { name: '보완', layers: [3, 7, 11, 16], desc: '서로 채워주는가' },
    conflict:     { name: '갈등', layers: [2, 9, 13, 14], desc: '어디서 부딪히는가' },
    timeline:     { name: '시간', layers: [5, 18, 10], desc: '시간이 지나면 어떻게 되는가' }
  };

  var REL_TYPE_WEIGHTS = {
    '연인':  { chemistry: 0.40, compensation: 0.20, conflict: 0.25, timeline: 0.15 },
    '부부':  { chemistry: 0.15, compensation: 0.30, conflict: 0.25, timeline: 0.30 },
    '썸':    { chemistry: 0.50, compensation: 0.15, conflict: 0.25, timeline: 0.10 },
    '짝사랑': { chemistry: 0.45, compensation: 0.20, conflict: 0.25, timeline: 0.10 },
    '친구':  { chemistry: 0.20, compensation: 0.30, conflict: 0.30, timeline: 0.20 },
    '직장':  { chemistry: 0.10, compensation: 0.35, conflict: 0.35, timeline: 0.20 }
  };

  // ╔══════════════════════════════════════════════════════════╗
  // ║  바넘 효과 방지 + 풀이 4단계 (출처: mbts-logic.js 풍부 버전)║
  // ╚══════════════════════════════════════════════════════════╝

  var BARNUM_PREVENTION = {
    text: "이 분석에서 '아닌데?'라고 느껴지는 부분이 있나요? " +
          "그 부분이 오히려 가장 중요한 정보일 수 있습니다. " +
          "사주가 보여주는 것과 현재의 당신이 다르다면 — " +
          "그건 당신이 사주를 넘어선 것이거나, 아직 발현되지 않은 잠재력입니다.",
    placement: 'end_of_analysis'
  };

  var ANALYSIS_STAGES = {
    stage1: { name: 'WHO (원국 해부)', focus: '4주 매핑, 오행/음양/조후, 합충형해, 신살/공망, 격국/종격' },
    stage2: { name: 'HOW (역학 해석)', focus: '십성 10개 역학, 5신 처방, 통변 워크플로우, 투출, 상생상극' },
    stage3: { name: 'WHEN (시간축 분석)', focus: '대운(간지분리/순역/간합변환), 세운, 월운, 교운기, 합트리거, 공망해소' },
    stage4: { name: 'WHAT (실전 통합)', focus: '불일치분석, 직업/연애/재물 타이밍, 건강, 궁합, 킬링포인트. 진단50%+처방50%' }
  };

  // ╔══════════════════════════════════════════════════════════╗
  // ║  분석 함수들                                             ║
  // ╚══════════════════════════════════════════════════════════╝

  // 원국 풍경화 (출처: mbts-logic-v2.js — null 체크 포함 버전)
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

  // 물상 조화도 (출처: mbts-logic.js — score/type/label 포함 풍부 버전)
  function calcLandscapeHarmony(saju) {
    if (!saju || !saju.dmEl || !saju.P) return null;
    var dmOh = saju.dmEl;
    var wolji = saju.P[1].b;
    var seasonOh = SEASON_OH[wolji];
    if (!dmOh || !seasonOh) return { score: 0, type: 'unknown', desc: '' };

    if (dmOh === seasonOh) {
      return { score: 90, type: 'excess_harmony', label: '과잉 조화',
        desc: dmOh + ' 에너지가 ' + seasonOh + ' 계절에서 폭발. 강렬하지만 소진 빠를 수 있음' };
    }
    if (OH_SANG[seasonOh] === dmOh) {
      return { score: 80, type: 'natural_harmony', label: '자연 조화',
        desc: '계절(' + seasonOh + ')이 ' + dmOh + ' 에너지를 지지. 안정적이고 효율적' };
    }
    if (OH_SANG[dmOh] === seasonOh) {
      return { score: 50, type: 'energy_drain', label: '에너지 유출',
        desc: dmOh + ' 에너지가 계절(' + seasonOh + ')에 소모됨. 주는 것이 많은 구조' };
    }
    if (OH_GEUK[dmOh] === seasonOh) {
      return { score: 60, type: 'mild_disharmony', label: '약한 부조화',
        desc: dmOh + ' 에너지가 계절(' + seasonOh + ')과 긴장. 도전적이지만 성장 가능' };
    }
    if (OH_GEUK[seasonOh] === dmOh) {
      return { score: 30, type: 'disharmony', label: '부조화',
        desc: '계절(' + seasonOh + ')이 ' + dmOh + ' 에너지를 억누름. 내적 갈등이 깊지만 오히려 창의성의 원천' };
    }
    return { score: 50, type: 'neutral', label: '중립', desc: '특별한 조화/부조화 없음' };
  }

  // 신강 5단계 (출처: mbts-logic.js — level/selfStr/otherStr 포함 풍부 버전)
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

    grade.pct = pct;
    grade.selfStr = gg.selfStr;
    grade.otherStr = gg.otherStr;
    return grade;
  }

  // 끊어진 상생 체인 (출처: mbts-logic.js — from/to 포함 풍부 버전, OHENG_TO_ENERGY 참조 제거)
  function findBrokenChain(saju) {
    if (!saju || !saju.el) return [];
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
          desc: prev + '→(' + chain[i] + ')→' + next + ' 체인 끊김. ' + chain[i] + ' 보충이 처방'
        });
      }
    }
    return broken;
  }

  // 교운기 속도 (출처: mbts-logic.js — label/세부변수 포함 풍부 버전, 라인469 버그 수정)
  function calcTransitionSpeed(prevDWOh, newDWOh, saju, gg) {
    if (!prevDWOh || !newDWOh) return { months: 18, label: '보통', desc: '기본 전환 기간' };

    var energyDistance;
    if (prevDWOh === newDWOh) energyDistance = 0;
    else if (OH_SANG[prevDWOh] === newDWOh || OH_SANG[newDWOh] === prevDWOh) energyDistance = 1;
    else if (OH_GEUK[prevDWOh] === newDWOh || OH_GEUK[newDWOh] === prevDWOh) energyDistance = 3;
    else energyDistance = 2;

    var natalAffinity = 0;
    if (saju && saju.el) {
      natalAffinity = (saju.el[newDWOh] || 0) >= 2 ? -1 : (saju.el[newDWOh] || 0) >= 1 ? 0 : 1;
    }

    var egoStr = 0;
    if (gg) {
      var ratio = gg.selfStr / ((gg.selfStr + gg.otherStr) || 1);
      egoStr = ratio > 0.55 ? -1 : ratio < 0.45 ? 1 : 0;
    }

    var score = energyDistance + natalAffinity + egoStr;
    var months, label;
    if (score <= 0) { months = 3; label = '거의 즉시'; }
    else if (score <= 1) { months = 9; label = '빠름 (6개월~1년)'; }
    else if (score <= 2) { months = 18; label = '보통 (1~2년)'; }
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

  // 궁합 관계별 점수 (출처: mbts-logic.js — axes/insight 포함 풍부 버전)
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

  // 궁합 분석 (출처: mbts-logic.js 고유 — 순수 사주 부분만)
  function analyzeGunghapSaju(ghResult, relType, sajuA, sajuB, ggA, ggB) {
    var result = {};

    result.relTypeScore = calcGunghapByRelType(ghResult, relType);

    result.allRelScores = {};
    var types = ['연인','부부','썸','짝사랑','친구','직장'];
    for (var i = 0; i < types.length; i++) {
      result.allRelScores[types[i]] = calcGunghapByRelType(ghResult, types[i]);
    }

    var scoreArr = types.map(function(t) { return { type: t, score: result.allRelScores[t].total }; });
    scoreArr.sort(function(a, b) { return b.score - a.score; });
    result.bestRelType = scoreArr[0];
    result.worstRelType = scoreArr[scoreArr.length - 1];
    result.gap = scoreArr[0].score - scoreArr[scoreArr.length - 1].score;

    if (result.gap >= 20) {
      result.gapInsight = '관계 유형에 따라 ' + result.gap + '점 차이. ' +
        scoreArr[0].type + '으로는 좋지만 ' + scoreArr[scoreArr.length - 1].type + '으로는 도전적인 관계.';
    }

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

  // ╔══════════════════════════════════════════════════════════╗
  // ║  window 전역 등록                                       ║
  // ╚══════════════════════════════════════════════════════════╝

  // 상수
  window.SAJU_TGAN_KR         = TGAN_KR;
  window.SAJU_JIJI_KR         = JIJI_KR;
  window.SAJU_OHENG_TGAN      = OHENG_TGAN;
  window.SAJU_OHENG_JIJI      = OHENG_JIJI;
  window.SAJU_TEMPERAMENTS    = TEMPERAMENT_GROUPS;
  window.SAJU_PILLAR_PSY      = PILLAR_PSYCHOLOGY;
  window.SAJU_GAN_HAP         = GAN_HAP;
  window.SAJU_GAN_CHUNG       = GAN_CHUNG;
  window.SAJU_SANGSAENG       = SANGSAENG;
  window.SAJU_SANGGEUK        = SANGGEUK;
  window.SAJU_GAEUN           = GAEUN;
  window.SAJU_GUNGHAP_AXIS    = GUNGHAP_AXIS;
  window.SAJU_REL_WEIGHTS     = REL_TYPE_WEIGHTS;
  window.SAJU_BARNUM          = BARNUM_PREVENTION;
  window.SAJU_STAGES          = ANALYSIS_STAGES;
  window.SAJU_MULSANG_GAN     = MULSANG_GAN;
  window.SAJU_MULSANG_SEASON  = MULSANG_SEASON;
  window.SAJU_OH_SANG         = OH_SANG;
  window.SAJU_OH_GEUK         = OH_GEUK;
  window.SAJU_SEASON_OH       = SEASON_OH;
  window.SAJU_AMHAP_LAYERS    = AMHAP_LAYERS;
  window.SAJU_PILLAR_DISTANCE = PILLAR_DISTANCE;

  // 함수
  window.getTemperament         = getTemperament;
  window.buildNatalLandscape    = buildNatalLandscape;
  window.calcLandscapeHarmony   = calcLandscapeHarmony;
  window.getStrengthGrade       = getStrengthGrade;
  window.getHapChungPriority    = getHapChungPriority;
  window.classifyAmhap          = classifyAmhap;
  window.calcTransitionSpeed    = calcTransitionSpeed;
  window.getGaeun               = getGaeun;
  window.findBrokenChain        = findBrokenChain;
  window.calcGunghapByRelType   = calcGunghapByRelType;
  window.analyzeGunghapSaju     = analyzeGunghapSaju;

})();


// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║  PART 4: gunghap.js 기반 — 17레이어 궁합 엔진, 관계 유형           ║
// ║  (442줄)                                                           ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

// ======================================================================
// saju-theory-part4.js — gunghap.js 기반 사주 궁합 이론 데이터
// 원본: gunghap.js → 순수 사주 궁합 엔진만 추출
// 제거: MBTI 궁합 레이어(4번) + 프롬프트/UI/파서 코드
// 유지: 18레이어 중 17개 + 합충형해 교차 + 6종 관계유형 + 점수 산출 전부
// ======================================================================

(function() {
  'use strict';

  // ╔══════════════════════════════════════╗
  // ║  사주 궁합 엔진 (17레이어)           ║
  // ╚══════════════════════════════════════╝

  window.analyzeGunghap = function(sajuA, sajuB, dwA, dwB, ggA, ggB) {
    var R = { scores:{love:45,comm:45,values:45,work:45,total:0}, details:{gan:[],ji:[],ohBowan:[],mbti:[],dw:[]}, keywords:[] };
    var rA = sajuA.raw, rB = sajuB.raw;
    var pillarG = ['년간','월간','일간','시간'], pillarJ = ['년지','월지','일지','시지'];
    var gungwi = ['외부환경','직업사회','배우자건강','자녀노후'];

    // ── 레이어 1: 천간 교차 ──
    var gA=[rA.yg,rA.mg,rA.dg,rA.hg], gB=[rB.yg,rB.mg,rB.dg,rB.hg];
    var dgRel = {ganA:TGAN_KR[rA.dg], ganB:TGAN_KR[rB.dg], rels:[]};
    GH_GANHAP.forEach(function(h){ if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0])) dgRel.rels.push({t:'합',d:'일간합('+h[2]+') — 본질이 하나로 합쳐지는 인연'}); });
    GH_CHUNG_G.forEach(function(c){ if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0])) dgRel.rels.push({t:'충',d:'일간충 — 강한 끌림이자 강한 마찰'}); });
    if(rA.dg===rB.dg) dgRel.rels.push({t:'비화',d:'같은 일간 — 거울 같은 관계'});
    if(dgRel.rels.length===0){
      var oA=OHAENG_TGAN[rA.dg], oB=OHAENG_TGAN[rB.dg];
      if(OH_SANG[oA]===oB) dgRel.rels.push({t:'생',d:'A('+oA+')→B('+oB+') 생 — 자연스러운 돌봄'});
      else if(OH_SANG[oB]===oA) dgRel.rels.push({t:'생',d:'B('+oB+')→A('+oA+') 생 — 자연스러운 돌봄'});
      else if(OH_GEUK[oA]===oB) dgRel.rels.push({t:'극',d:'A('+oA+')→B('+oB+') 극 — 긴장감'});
      else if(OH_GEUK[oB]===oA) dgRel.rels.push({t:'극',d:'B('+oB+')→A('+oA+') 극 — 긴장감'});
    }
    R.details.gan.push(dgRel);
    for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
      if(gA[ai]==null||gB[bi]==null) continue;
      GH_GANHAP.forEach(function(h){ if((gA[ai]===h[0]&&gB[bi]===h[1])||(gA[ai]===h[1]&&gB[bi]===h[0])) R.details.gan.push({type:'천간합',pA:pillarG[ai],pB:pillarG[bi],desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'합('+h[2]+') '+pillarG[ai]+'↔'+pillarG[bi],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'}); });
      GH_CHUNG_G.forEach(function(c){ if((gA[ai]===c[0]&&gB[bi]===c[1])||(gA[ai]===c[1]&&gB[bi]===c[0])) R.details.gan.push({type:'천간충',pA:pillarG[ai],pB:pillarG[bi],desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'충 '+pillarG[ai]+'↔'+pillarG[bi],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'}); });
    }

    // ── 레이어 2: 지지 교차 ──
    var jA=[rA.yj,rA.mj,rA.dj,rA.hj], jB=[rB.yj,rB.mj,rB.dj,rB.hj];
    for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
      if(jA[ai]==null||jB[bi]==null) continue;
      var ja=jA[ai], jb=jB[bi];
      GH_YUKHAP.forEach(function(h){ if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0])) R.details.ji.push({type:'육합',pA:pillarJ[ai],pB:pillarJ[bi],jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],hapOh:h[2],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',gungwi:gungwi[ai]+'↔'+gungwi[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'합('+h[2]+') '+pillarJ[ai]+'↔'+pillarJ[bi]}); });
      GH_CHUNG_J.forEach(function(c){ if((ja===c[0]&&jb===c[1])||(ja===c[1]&&jb===c[0])) R.details.ji.push({type:'충',pA:pillarJ[ai],pB:pillarJ[bi],jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',gungwi:gungwi[ai]+'↔'+gungwi[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'충 '+pillarJ[ai]+'↔'+pillarJ[bi]}); });
      GH_HYUNG.forEach(function(h){ if(ja===h[0]&&jb===h[1]) R.details.ji.push({type:'형',pA:pillarJ[ai],pB:pillarJ[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'형 — 갈등을 통한 성장',imp:'중',gungwi:gungwi[ai]+'↔'+gungwi[bi]}); });
      GH_HAE.forEach(function(h){ if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0])) R.details.ji.push({type:'해',pA:pillarJ[ai],pB:pillarJ[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'해 — 은밀한 오해 주의',imp:'중',gungwi:gungwi[ai]+'↔'+gungwi[bi]}); });
    }

    // ── 레이어 3: 오행 보완 ──
    var ohA=sajuA.elFull||sajuA.el, ohB=sajuB.elFull||sajuB.el;
    var lackA=sajuA.lackFull||[], lackB=sajuB.lackFull||[];
    lackA.forEach(function(o){ if(ohB[o]&&ohB[o]>=2) R.details.ohBowan.push({dir:'B→A',oh:o,d:'B가 A의 부족한 '+o+' 보완'}); });
    lackB.forEach(function(o){ if(ohA[o]&&ohA[o]>=2) R.details.ohBowan.push({dir:'A→B',oh:o,d:'A가 B의 부족한 '+o+' 보완'}); });
    var dmOhA=sajuA.dmEl, dmOhB=sajuB.dmEl, dmOhRel='';
    if(OH_SANG[dmOhA]===dmOhB){dmOhRel='A생B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')→B('+dmOhB+') 생 — 자연스러운 케어'});}
    else if(OH_SANG[dmOhB]===dmOhA){dmOhRel='B생A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')→A('+dmOhA+') 생'});}
    else if(OH_GEUK[dmOhA]===dmOhB){dmOhRel='A극B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')→B('+dmOhB+') 극 — 긴장감'});}
    else if(OH_GEUK[dmOhB]===dmOhA){dmOhRel='B극A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')→A('+dmOhA+') 극'});}
    else if(dmOhA===dmOhB){dmOhRel='비화';R.details.ohBowan.push({dir:'양방',d:'같은 오행('+dmOhA+') — 공감 최고, 보완 부족'});}

    // ── 레이어 4: [REMOVED — MBTI 궁합] ──
    // ── 레이어 5: 대운 동기화 ──
    if(dwA&&dwB&&dwA.daewoons&&dwB.daewoons){
      var cdA=dwA.currentDWIdx>=0?dwA.daewoons[dwA.currentDWIdx]:null;
      var cdB=dwB.currentDWIdx>=0?dwB.daewoons[dwB.currentDWIdx]:null;
      var goodDW=['식신','정재','정관','정인'];
      if(cdA&&cdB){var aGd=goodDW.indexOf(cdA.ss)>=0,bGd=goodDW.indexOf(cdB.ss)>=0;R.details.dw.push({type:'현재대운',dA:cdA.gan+cdA.ji+'('+cdA.startAge+'~'+cdA.endAge+'세,'+cdA.ss+')',dB:cdB.gan+cdB.ji+'('+cdB.startAge+'~'+cdB.endAge+'세,'+cdB.ss+')',sync:aGd&&bGd?'동반 상승기':aGd?'A가 끌어올리는 시기':bGd?'B가 끌어올리는 시기':'함께 인내하는 시기'});}
      if(dwA.seun&&dwB.seun){for(var si=0;si<Math.min(dwA.seun.length,dwB.seun.length,3);si++){var sAd=dwA.seun[si],sBd=dwB.seun[si];if(sAd&&sBd){var saG=goodDW.indexOf(sAd.ss)>=0,sbG=goodDW.indexOf(sBd.ss)>=0;R.details.dw.push({type:sAd.y+'년',dA:sAd.gan+sAd.ji+'('+sAd.ss+')',dB:sBd.gan+sBd.ji+'('+sBd.ss+')',sync:saG&&sbG?'둘 다 좋은 해':saG?'A에게 유리':sbG?'B에게 유리':'조심해야 할 해'});}}}
    }

    // ── 레이어 6: 십성 관계 ──
    var ssAtoB=getSipsung(rA.dg,rB.dg), ssBtoA=getSipsung(rB.dg,rA.dg);
    var ssMap={'비견':{l:3,c:5},'겁재':{l:-2,c:-3},'식신':{l:5,c:3},'상관':{l:2,c:-2},'편재':{l:8,c:2},'정재':{l:10,c:5},'편관':{l:3,c:-3},'정관':{l:8,c:5},'편인':{l:-2,c:3},'정인':{l:5,c:8}};
    R.details.sipsung={AtoB:ssAtoB,BtoA:ssBtoA,desc:'A→B='+ssAtoB+' / B→A='+ssBtoA};
    R.keywords.push('★십성: A→B='+ssAtoB+' / B→A='+ssBtoA);

    // ── 레이어 7: 용신 궁합 ──
    function extractYongOh(str,dg){if(!str)return null;var oh5=['목','화','토','금','수'];if(oh5.indexOf(str.charAt(0))>=0)return str.charAt(0);var ganOh={'갑':'목','을':'목','병':'화','정':'화','무':'토','기':'토','경':'금','신':'금','임':'수','계':'수'};if(ganOh[str.charAt(0)])return ganOh[str.charAt(0)];var OI=[0,0,1,1,2,2,3,3,4,4],ON=['목','화','토','금','수'],my=OI[dg];if(str.indexOf('비겁')>=0||str.indexOf('비견')>=0||str.indexOf('겁재')>=0)return ON[my];if(str.indexOf('식상')>=0||str.indexOf('식신')>=0||str.indexOf('상관')>=0)return ON[(my+1)%5];if(str.indexOf('재성')>=0||str.indexOf('정재')>=0||str.indexOf('편재')>=0)return ON[(my+2)%5];if(str.indexOf('관성')>=0||str.indexOf('정관')>=0||str.indexOf('편관')>=0)return ON[(my+3)%5];if(str.indexOf('인성')>=0||str.indexOf('정인')>=0||str.indexOf('편인')>=0)return ON[(my+4)%5];return null;}
    var yongA=extractYongOh(ggA.yongshin,rA.dg),yongB=extractYongOh(ggB.yongshin,rB.dg);
    if(yongA&&yongB){var bFA=(ohB[yongA]||0),aFB=(ohA[yongB]||0);var gY='';if(bFA>=3&&aFB>=3)gY='서로 살려주는 최고 궁합';else if(bFA>=2||aFB>=2)gY='한쪽이 채워주는 관계';else if(bFA>=1||aFB>=1)gY='약간의 보완';else gY='용신 보완 부족';R.details.yongshin={A:yongA,B:yongB,bForA:bFA,aForB:aFB,grade:gY};R.keywords.push('★용신: A='+yongA+'(B가'+bFA+'개) B='+yongB+'(A가'+aFB+'개) → '+gY);}

    // ── 레이어 8: 일주 통합 판정 ──
    var iljuCombo=[];var dgHap=false,djHap=false,dgChung=false,djChung=false;
    GH_GANHAP.forEach(function(h){if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0]))dgHap=true;});
    GH_YUKHAP.forEach(function(h){if((rA.dj===h[0]&&rB.dj===h[1])||(rA.dj===h[1]&&rB.dj===h[0]))djHap=true;});
    GH_CHUNG_G.forEach(function(c){if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0]))dgChung=true;});
    GH_CHUNG_J.forEach(function(c){if((rA.dj===c[0]&&rB.dj===c[1])||(rA.dj===c[1]&&rB.dj===c[0]))djChung=true;});
    if(dgHap&&djHap)iljuCombo.push('쌍합');if(dgChung&&djChung)iljuCombo.push('쌍충');if(dgHap&&djChung)iljuCombo.push('합충공존');if(dgChung&&djHap)iljuCombo.push('충합공존');if(rA.dg===rB.dg)iljuCombo.push('일간비화');
    R.details.ilju={combo:iljuCombo.length>0?iljuCombo.join('+'):'특수관계 없음'};
    if(iljuCombo.length>0)R.keywords.push('★일주: '+iljuCombo.join('+'));

    // ── 레이어 9: 원진살 ──
    var WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
    var wonjinList=[];
    for(var ai=0;ai<4;ai++)for(var bi=0;bi<4;bi++){if(jA[ai]==null||jB[bi]==null)continue;WONJIN.forEach(function(w){if(jA[ai]===w[0]&&jB[bi]===w[1])wonjinList.push({pA:ai,pB:bi,isDJ:ai===2&&bi===2});});}

    // ── 레이어 10: 교차 삼합 ──
    var SAMHAP=[[0,4,8,'수'],[1,5,9,'금'],[2,6,10,'목'],[3,7,11,'화']];
    var samhapList=[];
    SAMHAP.forEach(function(s){var all=jA.concat(jB).filter(function(j){return j!=null;});if(all.indexOf(s[0])>=0&&all.indexOf(s[1])>=0&&all.indexOf(s[2])>=0){var hA=(jA.indexOf(s[0])>=0||jA.indexOf(s[1])>=0||jA.indexOf(s[2])>=0);var hB=(jB.indexOf(s[0])>=0||jB.indexOf(s[1])>=0||jB.indexOf(s[2])>=0);if(hA&&hB){samhapList.push(s[3]);R.keywords.push('교차삼합: '+JIJI_KR[s[0]]+JIJI_KR[s[1]]+JIJI_KR[s[2]]+'('+s[3]+')');}};});

    // ── 레이어 11: 공망 교차 ──
    var gmInfo=null;
    if(typeof calcGongmang==='function'){try{var gmA=calcGongmang(rA.dg,rA.dj),gmB=calcGongmang(rB.dg,rB.dj);gmInfo={A:gmA.indexOf(rA.dj)>=0,B:gmB.indexOf(rB.dj)>=0};R.details.gongmang=gmInfo;}catch(e){}}

    // ── 레이어 12: 납음 궁합 ──
    if(typeof getNapeum==='function'){try{var nObjA=getNapeum(rA.dg,rA.dj),nObjB=getNapeum(rB.dg,rB.dj);if(nObjA&&nObjB&&nObjA.name&&nObjB.name){var napA=nObjA.name.charAt(nObjA.name.length-1),napB=nObjB.name.charAt(nObjB.name.length-1);var oh5=['금','화','목','토','수'];if(oh5.indexOf(napA)>=0&&oh5.indexOf(napB)>=0){var SM={'목':'화','화':'토','토':'금','금':'수','수':'목'},GM={'목':'토','토':'수','수':'화','화':'금','금':'목'};var nr='';if(napA===napB)nr='비화';else if(SM[napA]===napB||SM[napB]===napA)nr='상생';else if(GM[napA]===napB||GM[napB]===napA)nr='상극';else nr='무관';R.details.napeum={A:napA,B:napB,rel:nr,nameA:nObjA.name,nameB:nObjB.name};R.keywords.push('납음: '+nObjA.name+'('+napA+')↔'+nObjB.name+'('+napB+') → '+nr);}}}catch(e){}}

    // ── 레이어 13: 전체 천간 교차 십성 ──
    var crossSS=[];for(var ai=0;ai<4;ai++)for(var bi=0;bi<4;bi++){if(gA[ai]==null||gB[bi]==null)continue;if(ai===2||bi===2)crossSS.push({pA:ai,pB:bi,ss:getSipsung(gA[ai],gB[bi])});}
    R.details.crossSS=crossSS;

    // ── 레이어 14: 성별 맥락 십성 ──
    var genderA=(typeof ST!=='undefined'&&ST.gender)?ST.gender:'';
    var genderB=(typeof GH_GENDER!=='undefined')?GH_GENDER:'';
    var gCtx={};
    if(genderA==='남성'){if(ssAtoB==='정재')gCtx.A='천생 아내감';else if(ssAtoB==='편재')gCtx.A='강렬한 끌림';}
    else if(genderA==='여성'){if(ssAtoB==='정관')gCtx.A='천생 남편감';else if(ssAtoB==='편관')gCtx.A='카리스마 끌림';}
    if(genderB==='남성'){if(ssBtoA==='정재')gCtx.B='천생 아내감';else if(ssBtoA==='편재')gCtx.B='강렬한 끌림';}
    else if(genderB==='여성'){if(ssBtoA==='정관')gCtx.B='천생 남편감';else if(ssBtoA==='편관')gCtx.B='카리스마 끌림';}
    R.details.sipsung.genderContext=gCtx;
    if(gCtx.A)R.keywords.push('성별맥락A: '+gCtx.A);if(gCtx.B)R.keywords.push('성별맥락B: '+gCtx.B);

    // ── 레이어 15: 신살 교차 ──
    var slA=(sajuA.specialSals||[]).map(function(s){return s.name;}),slB=(sajuB.specialSals||[]).map(function(s){return s.name;});
    var dhA=slA.indexOf('도화살')>=0,dhB=slB.indexOf('도화살')>=0,hgA=slA.indexOf('화개살')>=0,hgB=slB.indexOf('화개살')>=0;
    var ymA=slA.indexOf('역마살')>=0,ymB=slB.indexOf('역마살')>=0,ceA=slA.indexOf('천을귀인')>=0,ceB=slB.indexOf('천을귀인')>=0;
    var yrA=slA.indexOf('양인살')>=0,yrB=slB.indexOf('양인살')>=0;
    R.details.starsCross={dowhaSal:{A:dhA,B:dhB,both:dhA&&dhB},hwagaeSal:{A:hgA,B:hgB,both:hgA&&hgB},yeokma:{A:ymA,B:ymB,both:ymA&&ymB},chuneul:{A:ceA,B:ceB,both:ceA&&ceB},yangin:{A:yrA,B:yrB,both:yrA&&yrB}};
    if(dhA&&dhB)R.keywords.push('★도화살 교차: 강렬한 매력');if(hgA&&hgB)R.keywords.push('★화개살 교차: 영적 교감');if(ymA&&ymB)R.keywords.push('역마살 교차');if(ceA&&ceB)R.keywords.push('★천을귀인 교차: 서로가 귀인');if(yrA||yrB)R.keywords.push('양인살: '+(yrA&&yrB?'둘 다 양인 — 강렬한 충돌 주의':yrA?'A에 양인 — A의 결단력/공격성':'B에 양인 — B의 결단력/공격성'));

    // ── 레이어 16: 일간 강약 궁합 ──
    var strA=ggA.strengthGrade||'중화',strB=ggB.strengthGrade||'중화';
    var isStrA=(strA==='극신강'||strA==='신강'),isWkA=(strA==='신약'||strA==='극신약');
    var isStrB=(strB==='극신강'||strB==='신강'),isWkB=(strB==='신약'||strB==='극신약');
    var stCombo='',stDesc='';
    if(isStrA&&isWkB){stCombo='A강B약';stDesc='A가 이끌어주는 관계';}else if(isWkA&&isStrB){stCombo='A약B강';stDesc='B가 이끌어주는 관계';}else if(isStrA&&isStrB){stCombo='쌍강';stDesc='주도권 다툼 주의';}else if(isWkA&&isWkB){stCombo='쌍약';stDesc='추진력 부족 주의';}else{stCombo='균형';stDesc='안정적 조합';}
    R.details.strength={A:strA,B:strB,combo:stCombo,desc:stDesc};R.keywords.push('★강약: '+stCombo+' — '+stDesc);

    // ── 레이어 17: 배우자궁 십성 교차 ──
    if(typeof JIJANGGAN_DATA!=='undefined'){try{var djDA=JIJANGGAN_DATA[rA.dj],djDB=JIJANGGAN_DATA[rB.dj];if(djDA&&djDB){var jgA=djDA[djDA.length-1],jgB=djDB[djDB.length-1];var spA=getSipsung(rB.dg,jgA.g),spB=getSipsung(rA.dg,jgB.g);var spGd=['정재','정관','식신','정인'],spGr=['정재','정관'];var aG=spGr.indexOf(spA)>=0,bG=spGr.indexOf(spB)>=0,aOk=spGd.indexOf(spA)>=0,bOk=spGd.indexOf(spB)>=0;var spDesc='';if(aG&&bG)spDesc='결혼 궁합 최상급';else if(aOk&&bOk)spDesc='결혼 후에도 좋은 관계';else if(aOk||bOk)spDesc='한쪽이 더 헌신';else spDesc='결혼 후 조율 필요';R.details.spouseGung={A:{toPartner:spA},B:{toPartner:spB},desc:spDesc};R.keywords.push('★배우자궁: A→B='+spA+' B→A='+spB+' → '+spDesc);}}catch(e){}}

    // ── 레이어 18: 5년 타이밍 ──
    var curYr=new Date().getFullYear(),goodT=['정재','식신','정관','정인'],timing5=[];
    for(var yr=curYr;yr<=curYr+4;yr++){var seI=((yr-4)%60+60)%60,seG=seI%10,seJ=seI%12;var ssAy=getSipsung(rA.dg,seG),ssByy=getSipsung(rB.dg,seG);var ys=0;if(goodT.indexOf(ssAy)>=0)ys+=2;if(goodT.indexOf(ssByy)>=0)ys+=2;GH_YUKHAP.forEach(function(h){if((seJ===h[0]&&rA.dj===h[1])||(seJ===h[1]&&rA.dj===h[0]))ys+=2;if((seJ===h[0]&&rB.dj===h[1])||(seJ===h[1]&&rB.dj===h[0]))ys+=2;});GH_CHUNG_J.forEach(function(c){if((seJ===c[0]&&rA.dj===c[1])||(seJ===c[1]&&rA.dj===c[0]))ys-=2;if((seJ===c[0]&&rB.dj===c[1])||(seJ===c[1]&&rB.dj===c[0]))ys-=2;});var yg=ys>=6?'최고의 해':ys>=4?'좋은 해':ys>=2?'무난':ys>=0?'평범':'조심';timing5.push({year:yr,ganKr:TGAN_KR[seG],jiKr:JIJI_KR[seJ],ssA:ssAy,ssB:ssByy,score:ys,grade:yg});}
    var best=timing5.reduce(function(b,c){return c.score>b.score?c:b;},timing5[0]);
    var worst=timing5.reduce(function(w,c){return c.score<w.score?c:w;},timing5[0]);
    R.details.timing={years:timing5,bestYear:best,worstYear:worst};
    R.keywords.push('★타이밍: 최고='+best.year+'년('+best.grade+') 조심='+worst.year+'년('+worst.grade+')');

    // ══════════════════════════════════════
    // ★ 통합 점수 계산 (1번만 클램핑!)
    // ══════════════════════════════════════
    var love=45,comm=45,val=45,work=45;
    // L1 일간
    dgRel.rels.forEach(function(r){if(r.t==='합')love+=20;else if(r.t==='충')love-=5;else if(r.t==='비화')love+=5;else if(r.t==='생')love+=10;else if(r.t==='극')love-=3;});
    // L2 지지
    R.details.ji.forEach(function(r){var isDJ=(r.pA==='일지'&&r.pB==='일지'),isMJ=(r.pA==='월지'||r.pB==='월지'),isYJ=(r.pA==='년지'&&r.pB==='년지');if(isDJ){if(r.type==='육합')love+=18;else if(r.type==='충')love-=8;else if(r.type==='형')love-=4;}if(isMJ){if(r.type==='육합')comm+=8;else if(r.type==='충')comm-=5;}if(isYJ){if(r.type==='육합')val+=8;else if(r.type==='충')val-=4;}});
    // L3 오행
    if(R.details.ohBowan.length>0)love+=Math.min(R.details.ohBowan.length*3,10);
    if(dmOhRel==='A생B'||dmOhRel==='B생A')val+=8;else if(dmOhRel==='비화')val+=5;else if(dmOhRel==='A극B'||dmOhRel==='B극A')val-=3;
    // L4 MBTI → [REMOVED]
    // L1+ 천간합충
    R.details.gan.forEach(function(r){if(r.type==='천간합')work+=5;else if(r.type==='천간충')work-=3;});
    // L6 십성
    var sA=ssMap[ssAtoB]||{l:0,c:0},sB=ssMap[ssBtoA]||{l:0,c:0};love+=Math.round((sA.l+sB.l)/2);comm+=Math.round((sA.c+sB.c)/2);
    // L7 용신
    if(R.details.yongshin){var yd=R.details.yongshin;if(yd.bForA>=3&&yd.aForB>=3){love+=10;val+=8;}else if(yd.bForA>=2||yd.aForB>=2){love+=5;val+=4;}else if(yd.bForA>=1||yd.aForB>=1)love+=2;else love-=3;}
    // L8 일주통합
    if(iljuCombo.indexOf('쌍합')>=0)love+=20;if(iljuCombo.indexOf('쌍충')>=0)love-=10;if(iljuCombo.indexOf('합충공존')>=0)love+=5;if(iljuCombo.indexOf('충합공존')>=0)love+=3;if(iljuCombo.indexOf('일간비화')>=0)love+=3;
    // L9 원진
    wonjinList.forEach(function(w){if(w.isDJ){love-=8;R.keywords.push('★원진살: 일지끼리 원진');}else comm-=3;});
    // L10 삼합
    samhapList.forEach(function(){love+=5;val+=3;});
    // L11 공망
    if(gmInfo){if(gmInfo.A&&gmInfo.B){love-=5;R.keywords.push('공망: 둘 다 일지 공망');}else if(gmInfo.A||gmInfo.B){love-=2;R.keywords.push('공망: 한쪽 일지 공망');}}
    // L12 납음
    if(R.details.napeum){var nr=R.details.napeum.rel;if(nr==='비화')val+=3;else if(nr==='상생'){val+=5;love+=3;}else if(nr==='상극')val-=3;}
    // L13 교차십성
    if(crossSS.filter(function(c){return['정재','정관','식신','정인'].indexOf(c.ss)>=0;}).length>=3)comm+=5;
    // L14 성별
    if(genderA&&genderB&&genderA!==genderB){if((genderA==='남성'&&ssAtoB==='정재'&&ssBtoA==='정관')||(genderA==='여성'&&ssAtoB==='정관'&&ssBtoA==='정재')){love+=10;R.keywords.push('★성별맥락: 정재↔정관 — 천생연분!');}}
    // L15 신살
    if(dhA&&dhB)love+=5;if(hgA&&hgB)val+=5;if(ymA&&ymB)work+=3;if(ceA&&ceB){love+=3;val+=3;}
    // L16 강약
    if((isStrA&&isWkB)||(isWkA&&isStrB)){love+=3;comm+=2;}else if(isStrA&&isStrB)comm-=3;else if(isWkA&&isWkB)work-=3;else val+=3;
    // L17 배우자궁
    if(R.details.spouseGung){var sp=R.details.spouseGung.desc;if(sp==='결혼 궁합 최상급'){love+=12;val+=8;}else if(sp==='결혼 후에도 좋은 관계'){love+=8;val+=5;}else if(sp==='한쪽이 더 헌신')love+=4;else love-=3;}
    // L18 타이밍
    if(timing5[0].score>=4)love+=5;if(timing5[0].score<0)love-=3;

    // ══════════════════════════════════════════════════
    // ★ saju.js 연동 블록 — window.SJ_* 함수 안전 호출
    // saju.js가 없어도 기존 18레이어 100% 정상 동작
    // ══════════════════════════════════════════════════

    // --- 육친 교차 분석 ---
    try {
      if (window.SJ_YUKCHIN_MAP && sajuA.dm && sajuB.dm && sajuA.ss && sajuB.ss) {
        var gA = (window._lastGender === '남성' || (typeof ST !== 'undefined' && ST.gender === '남성')) ? '남' : '여';
        var gB = (typeof GH_GENDER !== 'undefined' && GH_GENDER === '남성') ? '남' : '여';
        var mapA = SJ_YUKCHIN_MAP[gA] || {};
        var mapB = SJ_YUKCHIN_MAP[gB] || {};

        // A→B: A의 일간 기준으로 B의 일간이 어떤 십성인지
        var ssAtoB_yuk = '';
        if (sajuA.ss) {
          // sajuB.dm을 sajuA 기준에서 찾기
          ssAtoB_yuk = ssAtoB || '';
        }

        var ycA = mapA[ssAtoB_yuk] || ssAtoB_yuk;
        var ycB = mapB[ssBtoA] || ssBtoA;

        R.yukchinCross = {
          aToB: '나에게 상대방은 ' + ycA + ' (' + ssAtoB_yuk + ')',
          bToA: '상대방에게 나는 ' + ycB + ' (' + ssBtoA + ')'
        };
        R.keywords.push('육친: A→B=' + ycA + ' / B→A=' + ycB);
      }
    } catch (e) { console.warn('[gunghap] 육친 교차 실패:', e); }

    // --- 5신 교차 분석 ---
    try {
      if (window.SJ_calcOsinChegye && window.SJ_extractYongshinOh && window.SJ_getOsinLabel) {
        var yohA = SJ_extractYongshinOh(ggA.yongshin || '');
        var yohB = SJ_extractYongshinOh(ggB.yongshin || '');

        if (yohA) {
          var osinA = SJ_calcOsinChegye(yohA);
          var bDmEl = sajuB.dmEl || '';
          var labelBforA = SJ_getOsinLabel(osinA, bDmEl);

          R.osinCross = R.osinCross || {};
          R.osinCross.bToA = '상대방의 일간(' + bDmEl + ')은 나에게 ' + labelBforA;

          // 용신이면 점수 보너스
          if (labelBforA.indexOf('용신') >= 0 || labelBforA.indexOf('핵심') >= 0) {
            love += 10; val += 8;
            R.keywords.push('★5신: 상대방이 나의 핵심 에너지!');
          } else if (labelBforA.indexOf('희신') >= 0 || labelBforA.indexOf('보조') >= 0) {
            love += 5; val += 4;
          } else if (labelBforA.indexOf('기신') >= 0 || labelBforA.indexOf('방해') >= 0) {
            love -= 3;
          }
        }

        if (yohB) {
          var osinB = SJ_calcOsinChegye(yohB);
          var aDmEl = sajuA.dmEl || '';
          var labelAforB = SJ_getOsinLabel(osinB, aDmEl);

          R.osinCross = R.osinCross || {};
          R.osinCross.aToB = '나의 일간(' + aDmEl + ')은 상대방에게 ' + labelAforB;

          if (labelAforB.indexOf('용신') >= 0 || labelAforB.indexOf('핵심') >= 0) {
            love += 10; val += 8;
            R.keywords.push('★5신: 내가 상대방의 핵심 에너지!');
          } else if (labelAforB.indexOf('희신') >= 0 || labelAforB.indexOf('보조') >= 0) {
            love += 5; val += 4;
          } else if (labelAforB.indexOf('기신') >= 0 || labelAforB.indexOf('방해') >= 0) {
            love -= 3;
          }
        }
      }
    } catch (e) { console.warn('[gunghap] 5신 교차 실패:', e); }

    // --- 납음 궁합 스토리 (saju.js 버전) ---
    try {
      if (window.SJ_buildNapeumGunghap) {
        var napeumStory = SJ_buildNapeumGunghap(sajuA, sajuB, ggA, ggB);
        if (napeumStory) {
          R.napeumGunghap = napeumStory;
        }
      }
    } catch (e) { console.warn('[gunghap] 납음 궁합 실패:', e); }

    // --- 부부 시너지 ---
    try {
      if (window.SJ_buildCoupleSynergy) {
        var synergy = SJ_buildCoupleSynergy(sajuA, ggA, sajuB, ggB);
        if (synergy) {
          R.coupleSynergy = synergy;
        }
      }
    } catch (e) { console.warn('[gunghap] 부부 시너지 실패:', e); }

    // --- 교차 통변 ---
    try {
      if (window.SJ_detectCrossTongbyeon) {
        var crossTB = SJ_detectCrossTongbyeon(sajuA, sajuB, ggA, ggB);
        if (crossTB && crossTB.length > 0) {
          R.crossTongbyeon = crossTB;
          crossTB.forEach(function(tb) {
            R.keywords.push('교차통변: ' + tb.name + ' (' + tb.label + ')');
          });
        }
      }
    } catch (e) { console.warn('[gunghap] 교차 통변 실패:', e); }

    // --- 연동 로그 ---
    console.log('[gunghap] saju.js 연동 완료 —',
      'yukchin=' + (!!R.yukchinCross),
      'osin=' + (!!R.osinCross),
      'napeum=' + (!!R.napeumGunghap),
      'synergy=' + (!!R.coupleSynergy),
      'crossTB=' + (!!R.crossTongbyeon)
    );

    // R.details에 누락된 필드 보장
    if (!R.details.dg) {
      R.details.dg = {
        dgA: sajuA.dm + '(' + sajuA.dmEl + ')',
        dgB: sajuB.dm + '(' + sajuB.dmEl + ')',
        ohRel: dmOhRel || '',
        rels: dgRel ? dgRel.rels : []
      };
    }
    if (!R.details.wonjin) R.details.wonjin = wonjinList || [];
    if (!R.details.samhap) R.details.samhap = samhapList || [];
    if (!R.details.gongmang) R.details.gongmang = gmInfo || {};
    if (!R.details.sipsung) {
      R.details.sipsung = {
        AtoB: ssAtoB, BtoA: ssBtoA,
        genderContext: R.details.genderSS || {}
      };
    }
    if (!R.details.ilju) {
      R.details.ilju = { combo: iljuCombo || '', desc: '' };
    }
    if (!R.details.strength) {
      R.details.strength = {
        combo: (ggA.strengthGrade || '') + ' vs ' + (ggB.strengthGrade || ''),
        desc: ''
      };
    }
    if (!R.details.spouseGung) R.details.spouseGung = null;
    if (!R.details.starsCross) R.details.starsCross = {};
    if (!R.details.timing) R.details.timing = null;

    // ★ 최종 클램핑 (딱 1번!)
    love=Math.max(65,Math.min(95,love));comm=Math.max(65,Math.min(95,comm));val=Math.max(65,Math.min(95,val));work=Math.max(65,Math.min(95,work));
    R.scores={love:love,comm:comm,values:val,work:work,total:Math.round(love*0.35+comm*0.25+val*0.25+work*0.15)};

    // AI 키워드
    dgRel.rels.forEach(function(r){R.keywords.push('★일간: '+dgRel.ganA+'↔'+dgRel.ganB+' '+r.d);});
    R.details.gan.forEach(function(r){if(r.type)R.keywords.push(r.desc+' ['+r.imp+']');});
    R.details.ji.forEach(function(r){if(r.gungwi)R.keywords.push(r.type+': '+r.desc+' ['+r.imp+'] ('+r.gungwi+')');});
    R.details.ohBowan.forEach(function(r){R.keywords.push('오행보완: '+r.d);});
    // MBTI 키워드 → [REMOVED]
    R.details.dw.forEach(function(d){R.keywords.push(d.type+': '+d.sync);});

    console.log('[gunghap.js] 18레이어 완료. 종합:'+R.scores.total+'점, 키워드:'+R.keywords.length+'개');
    return R;
  };

  // ══════════════════════════════════════
  // 관계 유형 정의 (이론 데이터)
  // ══════════════════════════════════════
  window.GH_CATEGORIES={'ssom':{label:'💕 썸',emoji:'💕',categories:['상대 파악','나와의 관계','실전','미래'],scoreLabels:{love:'끌림',comm:'소통',values:'가치관',work:'일상'},scoreWeights:{love:0.40,comm:0.30,values:0.15,work:0.15},tone:'설렘과 궁금함. 두근거리는 톤.'},'lover':{label:'❤️ 연인',emoji:'❤️',categories:['상대 파악','궁합 구조','소통과 갈등','결혼'],scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'생활'},scoreWeights:{love:0.35,comm:0.25,values:0.25,work:0.15},tone:'현실적이고 깊은 분석. 솔직한 톤.'},'colleague':{label:'💼 직장 동료',emoji:'💼',categories:['상대 파악','협업 구조','실전 팁','성장'],scoreLabels:{love:'친밀도',comm:'소통',values:'가치관',work:'업무'},scoreWeights:{love:0.05,comm:0.30,values:0.25,work:0.40},tone:'프로페셔널하지만 인간적.'},'friend':{label:'🍻 친구',emoji:'🍻',categories:['상대 파악','우리 구조','유지와 시너지','장기'],scoreLabels:{love:'유대감',comm:'소통',values:'가치관',work:'활동'},scoreWeights:{love:0.10,comm:0.35,values:0.30,work:0.25},tone:'편안하고 솔직한 톤.'}};

  // ── 관계 유형별 플랫 12 subs + anchor (v3 감사 기반) ──
  var GH_REL_CONFIG = {
    ssom: {
      title: '썸',
      subtitle: '이 사람... 나 어떻게 생각해?',
      subs: [
        { h: '이 사람의 성격', tone: '겉과 속, 진짜 성격을 짚어줘', anchor: 'B일간 오행+격국 유형+강약' },
        { h: '이 사람의 연애 스타일', tone: '좋아하면 이렇게 행동하는 사람', anchor: 'B배우자궁(일지) 십성+B 12운성' },
        { h: '이 사람이 좋아하는 타입', tone: '어떤 사람에게 끌리는지', anchor: 'B용신 방향+B배우자궁 십성+도화살 유무/궁위' },
        { h: '이 사람이 싫어하는 타입', tone: '이런 사람은 절대 안 됨', anchor: 'B과잉오행+B 5신중 기신 오행+겁재·편관 과다 여부' },
        { h: '상대 눈에 비친 나', tone: '걔 눈에 나는 어떤 사람일까?', anchor: 'B→A 십성+성별맥락 십성(L14)+A의 월간이 B에게 주는 인상' },
        { h: '우리 사이의 끌림', tone: '왜 자꾸 신경 쓰이는지의 정체', anchor: '일간 합/충/생/극/비화+일지 육합 여부+용신↔오행 보완' },
        { h: '서로 맞춰가야 할 부분', tone: '안 맞는 건 안 맞는 거야', anchor: '⚠️ 충·형·원진살·해(강제 언급)+과잉 오행 충돌+양인살 유무' },
        { h: '통하는 접근법', tone: '이러면 확률 올라가요', anchor: 'B용신 방향+천간합 궁위+삼합 공통 오행' },
        { h: '역효과 나는 행동', tone: '이러면 진짜 끝이에요', anchor: '⚠️ 충·형 반복+B 결핍 오행 건드리는 패턴+공망' },
        { h: '이 사람과 사귀려면', tone: '타이밍과 현실적 조언', anchor: '대운 동기화+5년 타이밍(세운)+12운성' },
        { h: '사귀면 어떤 커플이 되는지', tone: '미리 보는 우리의 연인 버전', anchor: '배우자궁 십성 교차+납음 궁합(이름 포함)+강약 궁합+부부시너지' },
        { h: '한 줄 요약', tone: '소름 돋는 한 줄', anchor: '키워드 요약(18레이어)+납음+MBTS 관계유형별 비교(bestRelType)' }
      ]
    },
    lover: {
      title: '연인',
      subtitle: '이 사람이랑 쭉 가도 될까?',
      subs: [
        { h: '이 사람의 성격', tone: '겉과 속, 진짜 성격을 짚어줘', anchor: 'B일간 오행+격국 유형+강약' },
        { h: '이 사람의 연애 스타일', tone: '사랑을 표현하는 방식', anchor: 'B배우자궁(일지) 십성+B 12운성' },
        { h: '이 사람이 연인에게 바라는 것', tone: '채워달라는 빈자리', anchor: 'B용신 방향+B배우자궁 십성+육친 중 인성·식상 배치' },
        { h: '이 사람이 연인에게 민감한 부분', tone: '이건 농담으로도 하지 마세요', anchor: 'B과잉오행+B 5신중 기신+겁재·편인·편관 과다+양인살' },
        { h: '상대 눈에 비친 나', tone: '걔한테 내가 어떤 사람인지', anchor: 'B→A 십성+성별맥락 십성+A월간→B인상' },
        { h: '잘 맞는 부분', tone: '우리가 제일 잘 맞는 순간', anchor: '천간합 궁위+삼합 공통 오행+오행 보완 관계' },
        { h: '서로 맞춰가야 할 부분', tone: '설거지 때문이 아니었어요', anchor: '⚠️ 충·형·원진살·해(강제)+격국 교차(강약 차이)+양인살' },
        { h: '싸웠을 때 화해법', tone: '이 커플 전용 화해 공식', anchor: '용신 궁합(서로 필요한 에너지)+천간합 궁위' },
        { h: '우리에게 맞는 소통법', tone: '이 관계에 맞는 대화 방법', anchor: '납음 궁합+강약 궁합+일지 교차 관계' },
        { h: '결혼하면 어떤 부부가 되는지', tone: '미리 보는 우리 가정의 모습', anchor: '배우자궁 십성 교차+납음 궁합+부부시너지+강약 궁합' },
        { h: '결혼까지 가려면', tone: '현실적 타이밍과 조건', anchor: '대운 동기화+5년 타이밍(세운)+12운성' },
        { h: '한 줄 요약', tone: '이 사랑에 대한 소름 돋는 한 줄', anchor: '키워드 요약(18레이어)+납음+MBTS bestRelType' }
      ]
    },
    colleague: {
      title: '직장 동료',
      subtitle: '이 사람이랑 어떻게 일해야 할까',
      subs: [
        { h: '이 사람의 성격', tone: '겉과 속, 진짜 성격을 짚어줘', anchor: 'B일간 오행+격국 유형+강약' },
        { h: '이 사람의 업무 스타일', tone: '보고는 아침에 해, 결론부터 말해', anchor: 'B격국 유형+강약+B월간 십성+B일간 십성 분포(정관/편관/정재/편재 중심)' },
        { h: '이 사람이 선호하는 업무 방식', tone: '이렇게 하면 좋아하는 것', anchor: 'B용신 방향+B인성·식상 배치+B월간 합 여부' },
        { h: '이 사람이 싫어하는 업무 방식', tone: '이거 잘못 건드리면 커리어가 날아가', anchor: 'B 5신중 기신+양인살·겁재과다·편관과다' },
        { h: '상대 눈에 비친 나', tone: '회사에서는 표정으로 읽을 수가 없으니까', anchor: 'B→A 십성+A월간이 B에게 주는 인상+성별맥락' },
        { h: '같이 일할 때 시너지', tone: '이 조합이 터지는 조건', anchor: '오행 보완+천간합 궁위(특히 월간합)+삼합' },
        { h: '같이 일할 때 맞춰가야 할 부분', tone: '일 못 해서가 아니야, 방식이 다른 거야', anchor: '⚠️ 충·형·원진살·해(강제)+격국 교차(업무방식 차이)' },
        { h: '이 사람과 대화할 때 팁', tone: '업무 대화에서 효과적인 방법', anchor: 'B용신 방향+천간합 궁위' },
        { h: '이 사람에게 인정받는 법', tone: '이 사람이 보는 게 뭔지 알면 헛수고가 줄어', anchor: 'B용신 방향+B→A 십성' },
        { h: '트러블 났을 때 대처법', tone: '걔가 나한테 쏘는 거 개인적인 거 아니야', anchor: '용신 궁합+충·형 반복 패턴+공망' },
        { h: '이 사람과 같이 성장하려면', tone: '답답한데, 이게 3년 뒤 내 무기가 돼', anchor: '대운 동기화+12운성 교차+A의 용신과 B의 오행' },
        { h: '한 줄 요약', tone: '내일 그 사람 보면 좀 달라지는 한 줄', anchor: '키워드 요약(18레이어)+납음+MBTS bestRelType' }
      ]
    },
    friend: {
      title: '친구',
      subtitle: '우리 진짜 친한 거 맞지?',
      subs: [
        { h: '이 사람의 성격', tone: '겉과 속, 진짜 성격을 짚어줘', anchor: 'B일간 오행+격국 유형+강약' },
        { h: '이 사람의 우정 스타일', tone: '친구 관계에서 이 사람의 패턴', anchor: 'B비겁·식상 분포+B일간↔일지 관계' },
        { h: '이 사람이 친구에게 바라는 것', tone: '친구에게 원하는 것', anchor: 'B용신 방향+B인성·비겁 배치' },
        { h: '이 사람이 친구에게 서운해하는 것', tone: '친구 관계에서 서운해하는 포인트', anchor: 'B 5신중 기신+과잉 오행 자극 패턴+원진살' },
        { h: '상대 눈에 비친 나', tone: '걔 눈에 나는 어떤 사람일까?', anchor: 'B→A 십성+B비겁·식상이 A를 인식하는 방식' },
        { h: '잘 맞는 부분', tone: '3시간이 30분 같은 이유', anchor: '납음 궁합+삼합 공통 오행+오행 보완' },
        { h: '서로 맞춰가야 할 부분', tone: '모르고 지나치면 금 가는 포인트', anchor: '⚠️ 충·형·원진살·해(강제)+과잉 오행 충돌+양인살' },
        { h: '이 사람의 감정 표현 방식', tone: '이 사람이 감정을 드러내는 방법', anchor: 'B격국 강약+B 12운성+B일간 음양' },
        { h: '이 사람과 같이 하면 잘 되는 것', tone: '함께하면 시너지 나는 것', anchor: '천간합 궁위+삼합 공통 오행+용신↔오행 보완+부부시너지(활동추천)' },
        { h: '멀어졌을 때 회복법', tone: '어색해졌을 때 누가 먼저 어떻게', anchor: '용신 궁합+천간합 궁위+천을귀인 교차' },
        { h: '이 사람과 같이 성장하려면', tone: '함께 발전하기 위한 방법', anchor: '대운 동기화+12운성 교차+오행 보완 장기 변화' },
        { h: '한 줄 요약', tone: '읽고 나면 걔한테 연락하고 싶어지는 한 줄', anchor: '키워드 요약(18레이어)+납음+MBTS bestRelType' }
      ]
    }
  };
  window.GH_REL_CONFIG = GH_REL_CONFIG;

})();


// ╔════════════════════════════════════════════════════════════════════╗
// ║                                                                    ║
// ║  PART 5: 사주 이론 철학적 프레임워크 (코드에 없던 뼈대)             ║
// ║  출처: MBTS_v7_FINAL.md 73개 이론 + 명리학 고전                    ║
// ║  주의: MBTI 개념 0건. 순수 사주 명리학만.                           ║
// ║                                                                    ║
// ╚════════════════════════════════════════════════════════════════════╝

(function() {
'use strict';


// ══════════════════════════════════════════════════
// 섹션 A: 사주학 5원칙 — 이 학문의 근본 철학
// ══════════════════════════════════════════════════

var ST5_PRINCIPLES = {
  p1_tendency: {
    name: '경향론 (Non-Determinism)',
    core: '사주는 경향과 가능성을 보여주며, 결정하지 않는다.',
    detail: '같은 사주라도 환경, 선택, 노력에 따라 다른 삶을 산다. 사주는 기상예보와 같다 — 비가 올 확률을 알려주지만, 우산을 쓸지 말지는 본인이 결정한다.',
    implication: '풀이에서 "~합니다"가 아니라 "~하는 경향이 있습니다"로 표현해야 하는 이유'
  },
  p2_honesty: {
    name: '가설 정직성 (Hypothesis Honesty)',
    core: '모든 해석은 근거 강도를 명시한다.',
    levels: { confirmed: '확립 — 고전+실증 다수 일치', probable: '유력 — 구조적 근거 있으나 검증 부족', exploratory: '탐색 — 가설 단계. 흥미롭지만 근거 약함' },
    implication: '"이 해석이 틀릴 수도 있다"를 인정하는 것이 오히려 신뢰를 높인다'
  },
  p3_growth: {
    name: '성장 지향 (Growth Orientation)',
    core: '모든 분석은 진단(50%)과 성장 처방(50%)으로 구성된다.',
    detail: '약점을 지적하고 끝내면 점술이다. 약점을 지적하고 구체적 행동 처방을 제시하면 컨설팅이다.',
    implication: '처방은 반드시 "구체적 행동"을 포함. "조심하세요"가 아니라 "매주 수요일에 이것을 하세요"'
  },
  p4_selfVerify: {
    name: '자기 검증 (Self-Verification)',
    core: '모든 풀이는 "맞지 않는 부분"을 찾도록 유도한다.',
    detail: '불일치는 오류가 아니라 더 깊은 통찰의 시작점. 사주와 현재가 다르면 — 사주를 넘어선 것이거나 아직 발현 안 된 잠재력.',
    barnum: '바넘 효과 방지의 핵심. "아닌데?"라고 느끼는 부분이 가장 중요한 정보'
  },
  p5_timeAxis: {
    name: '시간축 (Temporal Dynamics)',
    core: '사주의 최대 차별점은 시간에 따른 변화를 설명할 수 있다는 것.',
    detail: '대운(10년 주기), 세운(매년), 월운(매월)으로 에너지가 변한다. 같은 사람도 20대와 40대의 에너지 구조가 다르다.',
    implication: '"지금은 이래도 5년 후에는 달라진다"는 예측이 가능'
  }
};


// ══════════════════════════════════════════════════
// 섹션 B: 사주 8자 심리 위치론 — 4기둥의 심리적 의미
// ══════════════════════════════════════════════════

var ST5_PILLAR_PSYCHOLOGY = {
  yearPillar: {
    name: '년주 (年柱)',
    psychArea: '외부 세계·조상·유년기',
    ganMeaning: '년간 = 세상에 보여주는 첫인상. 처음 만난 사람이 느끼는 에너지.',
    jiMeaning: '년지 = 태어난 환경의 기저 에너지. 유전적/가정적 배경.',
    ageRange: '0~15세 경험에 대응',
    depth: '가장 바깥층. 의식 표면.'
  },
  monthPillar: {
    name: '월주 (月柱)',
    psychArea: '사회·직업·부모',
    ganMeaning: '월간 = 사회에서 꺼내 쓰는 도구(페르소나). 의식적으로 사용하는 에너지.',
    jiMeaning: '월지 = 격국의 뿌리. 사회적 역할의 기반. 사주에서 가장 영향력 큰 자리 중 하나.',
    ageRange: '15~30세 경험에 대응',
    depth: '사회적 자아. 직업적 정체성.'
  },
  dayPillar: {
    name: '일주 (日柱)',
    psychArea: '핵심 자아·배우자',
    ganMeaning: '일간 = 나 자신. 가장 근본적인 에너지. 사주의 중심축.',
    jiMeaning: '일지 = 무의식·배우자궁. 숨겨진 욕구. 배우자에게서 기대하는 에너지.',
    ageRange: '30~45세 경험에 대응',
    depth: '가장 깊은 핵심. 진짜 나.'
  },
  hourPillar: {
    name: '시주 (時柱)',
    psychArea: '자녀·말년·잠재력',
    ganMeaning: '시간 = 나이 들면서 발달하는 에너지. 말년의 방향성.',
    jiMeaning: '시지 = 가장 깊은 잠재력. 극한 상황이나 말년에 발동.',
    ageRange: '45세 이후에 대응',
    depth: '가장 안쪽. 숨겨진 가능성.'
  },
  coreInsight: '일주(일간+일지) = 사주의 핵심 유형 코드. 60일주 = 60가지 기본 성격 원형. 같은 일간이라도 일지가 다르면 완전히 다른 사람.'
};


// ══════════════════════════════════════════════════
// 섹션 C: 지장간 3겹 무의식 구조
// ══════════════════════════════════════════════════

var ST5_JIJANGGAN_LAYERS = {
  concept: '12지지 각각은 내부에 1~3개의 천간 에너지를 품고 있다. 겉(천간)에 안 보이지만 속(지지)에 숨어있는 에너지.',
  layers: {
    yeogi:   { name: '여기 (餘氣)', consciousness: '무의식', desc: '남들은 보는데 본인만 모르는 것. 가장 미약하지만 가장 원초적.' },
    junggi:  { name: '중기 (中氣)', consciousness: '반의식', desc: '가끔 튀어나오는 성향. "어? 나 이런 면도 있었어?"' },
    jeonggi: { name: '정기 (正氣)', consciousness: '의식 가능', desc: '자각하고 있는 숨은 능력. 가장 강한 지장간 에너지.' }
  },
  tuchul: {
    name: '투출 (透出)',
    desc: '지장간의 에너지가 천간에 같은 천간으로 나타나는 것. 잠재 에너지가 의식화된 상태.',
    meaning: '투출된 에너지는 의도적으로 사용 가능한 무기. 미투출 에너지는 잠재력으로만 존재.'
  },
  practicalInsight: '표면 오행(천간4+지지4)에 없는 오행이 지장간에 있으면 → "겉으로 안 보이지만 속에 있는 에너지". 대운에서 해당 오행이 오면 폭발적으로 터질 수 있음.'
};


// ══════════════════════════════════════════════════
// 섹션 D: 격국 성패론 — 건강한 에너지 vs 뒤틀린 에너지
// ══════════════════════════════════════════════════

var ST5_GYEOKGUK_SYSTEM = {

  // 격국이란 무엇인가
  concept: '월지의 정기 십성으로 결정. "사회에서 어떤 역할을 맡을 경향이 있는가"를 보여줌. 타고난 직업적 기질.',

  // 10격국 성격/패격
  types: {
    '식신격': {
      role: '세상에 재능을 풀어놓는 사람',
      intact: '재능이 자연스럽게 돈이 됨. 표현 자체가 직업. 먹을 복, 예술 복.',
      broken: [
        { condition: '편인(효신탈식)', effect: '재능은 있는데 뭔가 계속 방해. 시작할 때마다 발목 잡힘.', remedy: '편인을 제어하는 재성 활동' },
        { condition: '식신 과다', effect: '재능이 너무 많아서 하나에 집중 못함. 벌여만 놓음.', remedy: '선택과 집중' },
        { condition: '편관 혼잡', effect: '표현하고 싶은데 사회적 압박이 막음.', remedy: '독립적 환경 조성' }
      ]
    },
    '상관격': {
      role: '기존 질서에 도전하는 혁신가',
      intact: '파괴적 창의력이 현실적 부로 전환(상관생재). 예술가·사업가·혁신가.',
      broken: [
        { condition: '상관견관', effect: '윗사람·조직과 정면충돌. 능력은 뛰어나나 "말 안 듣는 사람".', remedy: '프리랜서·창업이 돌파구' },
        { condition: '인성 제압', effect: '표현하고 싶은데 교육·규범·체면이 막음.', remedy: '자기 표현 채널 확보' },
        { condition: '식상 혼잡', effect: '식신+상관이 뒤섞여 일관성 없음.', remedy: '멘토(인성) 필요' }
      ]
    },
    '편재격': {
      role: '기회를 포착하는 사업가',
      intact: '사업 감각 뛰어남. 돈의 흐름을 읽음. 투자·유통·영업.',
      broken: [
        { condition: '겁재 탈재', effect: '돈은 버는데 누군가가 빼감. 동업 실패·보증 피해.', remedy: '재물 관리 시스템 필수' },
        { condition: '비견 쟁재', effect: '경쟁자가 계속 나타남.', remedy: '차별화 전략' },
        { condition: '편관 과다', effect: '사업 압박이 과도. 세금·규제·법적 문제.', remedy: '관성 다루는 지혜' }
      ]
    },
    '정재격': {
      role: '안정적 부를 쌓는 실무자',
      intact: '꾸준한 수입. 성실한 노동이 부로 이어지는 정도(正道).',
      broken: [
        { condition: '겁재 파재', effect: '모은 돈이 한순간에 날아감. 주변 사람 때문에 손실.', remedy: '재물 경계' },
        { condition: '상관 과다', effect: '지출 과다. 충동구매.', remedy: '지출 관리 시스템' }
      ]
    },
    '편관격': {
      role: '압박 속에서 성장하는 전사',
      intact: '식신제살 시 강력한 리더십. 위기에서 진가 발휘. 실전형 리더.',
      broken: [
        { condition: '제어 없는 칠살', effect: '스트레스·압박이 끊이지 않음. 몸이 아프거나 사고 잦음.', remedy: '식신이나 인성으로 제어' },
        { condition: '관살혼잡', effect: '이중 압박. 두 상사를 모시는 형상.', remedy: '한쪽을 합거(합으로 제거)' },
        { condition: '신약 편관', effect: '몸이 약한데 압박 큼. 능력 밖 책임.', remedy: '인성(귀인)의 도움' }
      ]
    },
    '정관격': {
      role: '질서와 체계의 관리자',
      intact: '조직 안에서 출세. 규율과 질서 속에서 성장. 공직·관리직 적성.',
      broken: [
        { condition: '상관 충돌', effect: '조직 내 갈등. 상사와 마찰.', remedy: '인성으로 상관 제어' },
        { condition: '관살혼잡', effect: '편관이 섞여 규율이 흔들림.', remedy: '합거 또는 식신제살' }
      ]
    },
    '편인격': {
      role: '비범한 사고의 연구자',
      intact: '독특한 사고방식. 한 분야를 깊이 파는 연구자. 비정규적 학문.',
      broken: [
        { condition: '효신탈식', effect: '독특한 생각은 있는데 표현 통로가 막힘.', remedy: '재성으로 편인 제어' },
        { condition: '편인 과다', effect: '생각이 너무 독특해서 현실과 괴리.', remedy: '재성(현실 감각) 보강' }
      ]
    },
    '정인격': {
      role: '학문과 귀인의 보호자',
      intact: '배움을 통해 성장. 주변에 귀인이 나타나는 구조. 교육·학문 적성.',
      broken: [
        { condition: '재성 파인', effect: '현실적 문제(돈)가 배움을 방해.', remedy: '학습 환경 확보' },
        { condition: '인성 과다', effect: '생각만 하고 행동 안 함.', remedy: '식상(표현) 활성화' }
      ]
    },
    '건록격': {
      role: '자수성가의 독립인',
      intact: '스스로 일어서는 힘이 강함. 남에게 기대지 않는 자립형.',
      broken: [
        { condition: '비겁 과다', effect: '자존심이 지나쳐 고립.', remedy: '재성/관성으로 에너지 분출' }
      ]
    },
    '양인격': {
      role: '승부사·결단의 전사',
      intact: '극강의 추진력과 결단력. 잘 쓰면 장군.',
      broken: [
        { condition: '제어 없는 양인', effect: '공격성이 통제 안 됨. 화를 부름.', remedy: '관성(규율)이나 인성(지혜)으로 제어' }
      ]
    }
  },

  // 종격 (특수격)
  specialTypes: {
    '종아격': { condition: '식상이 압도적', meaning: '자아를 표현에 녹이는 경향. 예술가·창작자.' },
    '종재격': { condition: '재성이 압도적', meaning: '자아를 성과에 녹이는 경향. 사업가·재물인.' },
    '종관격': { condition: '관성이 압도적', meaning: '자아를 조직에 녹이는 경향. 관리자·공직자.' },
    '종강격': { condition: '비겁이 압도적', meaning: '자아가 극대화. 강한 독립성과 주도력.' }
  },

  maturityInsight: '같은 격국이라도 성격(成格)이면 건강한 표현, 패격(敗格)이면 뒤틀린 표현. 이것은 타고난 것이 아니라 환경과 선택에 의해 달라질 수 있다 (경향론).'
};


// ══════════════════════════════════════════════════
// 섹션 E: 합충형해 의미 체계 — "왜 이런 효과가 나는가"
// ══════════════════════════════════════════════════

var ST5_RELATIONS_PHILOSOPHY = {

  hap: {
    name: '합 (合)',
    philosophy: '두 에너지가 끌려서 하나로 결합하려는 힘. 인력(引力).',
    why: '양(陽)과 음(陰)이 만나면 결합하려는 것은 자연의 원리. 천간합은 음양이 짝을 이루는 것, 지지합(육합)은 계절의 순환에서 대칭 위치끼리 끌리는 것.',
    effect: '합이 되면 원래 에너지가 약해지고 새로운 에너지(합화 오행)가 탄생할 수 있음.',
    psychological: '두 가지 성향이 융합되어 새로운 특성이 나타남. 갈등의 해소, 또는 기존 강점의 약화.',
    types: {
      cheonganHap: '천간합 5쌍 (갑기→토, 을경→금, 병신→수, 정임→목, 무계→화) — 근본 에너지의 결합',
      yukhap: '육합 6쌍 (자축→토, 인해→목, 묘술→화, 진유→금, 사신→수, 오미→토) — 환경 에너지의 결합',
      samhap: '삼합 4조 (인오술→화, 사유축→금, 신자진→수, 해묘미→목) — 세 에너지가 팀을 이뤄 하나의 오행을 극대화',
      banghap: '방합 (인묘진→목, 사오미→화, 신유술→금, 해자축→수) — 같은 계절끼리 결집'
    }
  },

  chung: {
    name: '충 (衝)',
    philosophy: '정반대 에너지의 정면충돌. 척력(斥力).',
    why: '12지지에서 인덱스 차이 6인 것은 정확히 반대편에 위치. 계절로 보면 봄↔가을, 여름↔겨울. 정반대 에너지라서 충돌.',
    effect: '기존 구조가 깨지고 변화가 강제됨. 파괴적이지만 동시에 변화의 에너지를 제공.',
    psychological: '내면의 모순이 터져나옴. "바꿔야 하는데 못 바꾸던 것"이 강제로 바뀜.',
    sixPairs: '자오충, 축미충, 인신충, 묘유충, 진술충, 사해충',
    practicalNote: '충이 반드시 나쁜 것이 아니다. 필요한 변화를 촉발하는 계기가 됨. 문제는 준비 없이 올 때.'
  },

  hyung: {
    name: '형 (刑)',
    philosophy: '마찰을 통한 성장. 합처럼 끌리지도, 충처럼 밀려나지도 않는 — 비비면서 갈리는 관계.',
    why: '형은 충처럼 정면이 아니라 비스듬한 각도의 충돌. 서서히 쌓이는 마찰.',
    fourTypes: {
      '무은지형 (인사신)': '은혜를 모르는 형벌. 도와줬는데 배신당하는 패턴. 혁명적 변화의 에너지.',
      '지세지형 (축술미)': '세력을 믿는 형벌. 극단적 자기 성찰. 자기 파괴와 재건의 반복.',
      '무례지형 (자묘)': '예의 없는 형벌. 관계 경계선 문제. 가까운 사이에서 넘어서는 안 될 선을 넘음.',
      '자형 (동지)': '같은 지지가 두 개 이상. 해당 에너지의 극단적 과잉. 에너지가 안으로 곪음.'
    },
    psychological: '형은 "아프지만 성장시키는" 관계. 충이 한순간의 충격이라면, 형은 장기간의 연마.'
  },

  hae: {
    name: '해 (害/穿)',
    philosophy: '미묘한 방해. 합을 깨뜨리는 힘.',
    why: '육합의 짝을 빼앗아가는 관계. 예: 자축합인데 오가 와서 자오충을 만듦 → 축의 입장에서 오는 "해".',
    effect: '에너지 누수. 보이지 않는 곳에서 힘이 빠짐.',
    psychological: '겉으로는 괜찮은데 뭔가 계속 잘 안 되는 느낌. 원인을 찾기 어려운 미세한 방해.',
    sixPairs: '자미해, 축오해, 인사해, 묘진해, 신해해, 유술해'
  },

  combined: {
    hapAndChung: '합과 충이 동시에 있으면 양가감정. 끌리면서 동시에 밀어내는 구조. 합피충파(합이 충에 깨짐) 또는 탐합망충(합이 충을 흡수) 판정.',
    multipleRelations: '한 사주에 합과 충이 여러 개 있으면 내면이 복잡함. 단순한 사람이 아님.',
    timing: '원국의 합충형해는 타고난 성격 구조. 대운/세운에서 새로 생기는 합충형해는 해당 시기의 변화 이벤트.'
  }
};


// ══════════════════════════════════════════════════
// 섹션 F: 사주학의 학술적 위치와 한계
// ══════════════════════════════════════════════════

var ST5_ACADEMIC_POSITION = {
  historicalBasis: {
    origin: '약 3000년 역사. 중국 음양오행 사상에 뿌리. 당나라 이허중(李虛中)이 년월일 3주 체계 정립, 송나라 서자평(徐子平)이 일간 중심 4주 체계 완성.',
    classics: '적천수(滴天髓), 자평진전(子平眞詮), 궁통보감(窮通寶鑑), 연해자평(淵海子平) 등이 핵심 고전.',
    koreanContext: '한국에서는 조선시대부터 널리 사용. 현대에도 대중적 인기가 높으나 학술적 체계화는 부족.'
  },
  strengths: {
    timeAxis: '시간에 따른 변화를 설명할 수 있는 유일한 성격 분석 체계. 대운/세운으로 "언제 어떤 변화가 오는가" 예측.',
    objectiveInput: '생년월일시라는 객관적 데이터 기반. 자기보고 편향이 없음.',
    relationalAnalysis: '두 사람 사이의 관계 역학(궁합)을 구조적으로 분석할 수 있음.',
    granularity: '60일주 × 격국 × 신살 × 대운 조합으로 매우 세밀한 개인화 가능.'
  },
  limitations: {
    empirical: '통계적·실험적 검증이 부족. 대부분 실무자의 경험적 판단에 의존.',
    mechanism: '왜 생년월일시가 성격에 영향을 미치는지 물리적 메커니즘이 불명.',
    terminology: '전문용어 장벽이 높아 일반인 접근성 낮음.',
    determinism: '경향론을 주장하면서도 실무에서 결정론적 풀이가 만연.',
    inconsistency: '유파별로 해석이 다름. 같은 사주를 다르게 읽는 경우 빈번.'
  },
  modernPosition: '"대중적으로 가장 오래 사용된 동양 성격 분석 체계. 학술적 엄밀성은 부족하지만, 3000년 경험적 관찰의 축적은 무시할 수 없는 가치를 가진다. 과학적 검증을 통해 유효한 부분을 선별하는 것이 현대 명리학의 과제."'
};


// ══════════════════════════════════════════════════
// 섹션 G: 10천간 심화 성격론 — 60일주의 기반
// ══════════════════════════════════════════════════

var ST5_TGAN_DEEP = {
  '갑': {
    image: '큰 나무, 거목, 대들보',
    nature: '곧고 크다. 위로만 자란다. 정의롭고 직선적. 한번 방향을 정하면 꺾이지 않는다.',
    strength: '정직, 리더십, 책임감, 선구자 기질. 새로운 것을 시작하는 힘.',
    weakness: '유연함 부족. 타협을 모름. 고집이 부러뜨림의 원인이 됨.',
    inRelation: '든든하지만 무겁다. 그늘을 만들어주지만 그 아래 자유가 없을 수 있다.',
    needsFromEnvironment: '을목(덩굴)의 유연함, 정화(햇볕)의 따뜻함, 계수(빗물)의 윤택함'
  },
  '을': {
    image: '풀, 덩굴, 꽃, 유연한 식물',
    nature: '부드럽고 유연하다. 바람에 눕지만 꺾이지 않는다. 적응력의 대가.',
    strength: '유연성, 적응력, 인내, 외교력. 어디서든 살아남는 생존력.',
    weakness: '의존적 경향. 자기 주관이 약해 보일 수 있음. 줏대 없다는 오해.',
    inRelation: '편안하고 맞춰주지만, 속마음을 안 보여줘서 답답할 수 있다.',
    needsFromEnvironment: '갑목(큰 나무)의 보호, 병화(태양)의 빛, 계수(비)의 영양'
  },
  '병': {
    image: '태양, 대형 화염, 용광로',
    nature: '밝고 뜨겁다. 세상을 비추고 싶어한다. 숨길 수 없는 존재감.',
    strength: '카리스마, 열정, 솔직함, 공정함. 어둠을 밝히는 힘.',
    weakness: '지나친 직설, 과시욕, 타인을 태울 수 있음. 밤(혼자 시간)이 부족하면 소진.',
    inRelation: '함께 있으면 에너지가 충전되지만, 그 열기가 부담이 될 수도.',
    needsFromEnvironment: '임수(바다/강)의 조절, 무토(산)의 안정, 갑목(나무)의 연료'
  },
  '정': {
    image: '촛불, 등불, 별빛, 모닥불',
    nature: '작지만 따뜻하다. 어둠 속에서 빛나는 존재. 섬세하고 내밀한 불.',
    strength: '섬세함, 예술적 감수성, 따뜻한 배려, 집중력. 한 사람을 깊이 비추는 힘.',
    weakness: '쉽게 꺼짐. 바람(외부 변화)에 약함. 감정 기복.',
    inRelation: '1:1에서 최고의 따뜻함. 많은 사람 앞에서는 에너지 소진.',
    needsFromEnvironment: '갑목(땔감)의 에너지 공급, 계수(이슬)의 조절 — 임수(폭우)는 꺼뜨림'
  },
  '무': {
    image: '산, 둑, 대지, 성벽',
    nature: '크고 묵직하다. 움직이지 않는다. 안정과 신뢰의 상징.',
    strength: '신뢰감, 포용력, 안정성, 중심 잡기. 주변을 안정시키는 힘.',
    weakness: '고집, 변화 거부, 느린 반응. 한번 자리잡으면 움직이기 어려움.',
    inRelation: '가장 든든한 사람이지만 답답할 수 있다. 변하지 않는 것이 장점이자 단점.',
    needsFromEnvironment: '갑목(나무)의 뿌리가 흙을 활성화, 임수(강)가 산을 윤택하게'
  },
  '기': {
    image: '논밭, 정원, 부드러운 흙',
    nature: '부드럽고 비옥하다. 무엇이든 받아들이고 키운다. 어머니의 대지.',
    strength: '포용, 양육, 실용성, 적응력. 씨앗을 틔우는 힘.',
    weakness: '자기 주장 약함. 지나친 수용은 경계 부재. 흙탕물처럼 흐려질 수 있음.',
    inRelation: '무엇이든 받아주는 사람. 하지만 자기를 잃으면 관계가 불균형.',
    needsFromEnvironment: '병화(태양)의 따뜻함, 계수(비)의 적당한 수분 — 과하면 질척'
  },
  '경': {
    image: '바위, 칼날, 철, 도끼',
    nature: '단단하고 날카롭다. 결단력이 칼날 같다. 의리와 정의.',
    strength: '결단력, 의리, 추진력, 강한 의지. 어려운 결정을 내리는 힘.',
    weakness: '무뚝뚝함, 감정 표현 부족, 지나친 강경함. 부드러움 부족.',
    inRelation: '믿음직하지만 차가워 보인다. 행동으로 사랑을 표현.',
    needsFromEnvironment: '정화(모닥불)가 쇠를 녹여 형태를 만들어줌. 변화와 유연성의 불'
  },
  '신': {
    image: '보석, 가위, 바늘, 정교한 금속',
    nature: '작지만 정교하다. 날카롭고 아름답다. 예민하고 완벽주의.',
    strength: '심미안, 정교함, 분석력, 자존심. 세밀한 것을 다루는 힘.',
    weakness: '예민, 상처 잘 받음, 완벽주의 강박. 작은 흠에도 견디지 못함.',
    inRelation: '세련되고 매력적이지만 까다롭다. 상대방의 작은 실수에 예민.',
    needsFromEnvironment: '임수(물)가 보석을 씻어 빛나게. 무토(흙)가 보석을 품어 보호.'
  },
  '임': {
    image: '바다, 큰 강, 폭포',
    nature: '넓고 깊고 거침없다. 어디든 흘러간다. 지혜와 자유의 물.',
    strength: '지혜, 적응력, 포용력, 자유로움. 어떤 환경에도 맞추는 힘.',
    weakness: '방향 없으면 범람. 적절한 제어(무토=둑)가 없으면 에너지 낭비.',
    inRelation: '깊고 넓은 사랑이지만 가두려 하면 도망간다. 자유가 사랑의 조건.',
    needsFromEnvironment: '무토(둑)의 방향 제시, 갑목(나무)이 물을 흡수하여 활용'
  },
  '계': {
    image: '이슬, 시냇물, 빗물, 샘물',
    nature: '작고 맑다. 스며들듯 침투한다. 직감과 영감의 물.',
    strength: '직감, 감수성, 침투력, 섬세함. 보이지 않는 것을 감지하는 힘.',
    weakness: '너무 예민. 쉽게 증발(소진). 방향 잃으면 이리저리 흘러다님.',
    inRelation: '상대 마음에 스며드는 사람. 깊이 감동하고 깊이 상처받는다.',
    needsFromEnvironment: '신금(수원지)이 꾸준히 보충, 병화(태양)가 이슬을 무지개로 만듦'
  }
};


// ══════════════════════════════════════════════════
// 섹션 H: 12지지 환경/에너지 심화
// ══════════════════════════════════════════════════

var ST5_JIJI_DEEP = {
  '자': { season: '한겨울 밤', oh: '수', nature: '가장 깊은 어둠. 잠재력이 응축된 시점. 고요하지만 내부에서 새로운 시작이 준비됨.' },
  '축': { season: '늦겨울 새벽', oh: '토', nature: '얼어붙은 땅. 인내와 축적. 아직 봄은 아니지만 씨앗이 발아를 준비.' },
  '인': { season: '초봄', oh: '목', nature: '봄의 시작. 호랑이의 에너지. 힘차게 뻗어나가는 성장의 첫 발걸음.' },
  '묘': { season: '봄 한가운데', oh: '목', nature: '완연한 봄. 부드러운 바람. 꽃이 피는 때. 사교적이고 매력적인 에너지.' },
  '진': { season: '늦봄', oh: '토', nature: '봄과 여름의 전환점. 용(龍)의 자리. 변화와 전환의 에너지. 무덤(墓)의 자리이기도.' },
  '사': { season: '초여름', oh: '화', nature: '뜨거워지기 시작. 뱀의 지혜. 날카로운 직감과 은밀한 전략.' },
  '오': { season: '한여름', oh: '화', nature: '태양이 가장 높은 때. 에너지의 정점. 밝고 뜨겁고 화려하지만 이후 하강 시작.' },
  '미': { season: '늦여름', oh: '토', nature: '여름과 가을의 전환점. 무르익는 때. 결실의 준비. 감성적이고 따뜻한 에너지.' },
  '신': { season: '초가을', oh: '금', nature: '서늘해지기 시작. 결단과 정리의 시작. 날카롭고 명확한 에너지.' },
  '유': { season: '가을 한가운데', oh: '금', nature: '완연한 가을. 수확의 때. 아름답지만 쓸쓸함. 예술적이고 완벽주의적.' },
  '술': { season: '늦가을', oh: '토', nature: '가을과 겨울의 전환점. 무덤(墓)의 자리. 정리와 마무리. 화개(華蓋)의 에너지.' },
  '해': { season: '초겨울', oh: '수', nature: '겨울의 시작. 돼지의 에너지. 내면으로 들어가는 때. 축적과 준비.' }
};

var ST5_ILJU_COMBINATION = {
  principle: '일주 = 천간(나) + 지지(내가 서 있는 땅). 같은 "나"라도 어떤 땅 위에 서 있느냐에 따라 완전히 다른 삶.',
  examples: {
    sameGan: '갑자 vs 갑오: 둘 다 큰 나무(갑). 갑자는 한밤중(자)의 나무 → 조용히 자라는 인내형. 갑오는 한낮(오)의 나무 → 햇빛 가득한 도전형.',
    sameJi: '갑자 vs 임자: 둘 다 한밤중(자). 갑자는 어둠 속의 나무 → 보이지 않는 곳에서 성장. 임자는 밤바다 → 끝없는 깊이와 지혜.',
    opposite: '병자 vs 임오: 병(태양)+자(밤) = 밤에 빛나는 태양 → 내면의 빛. 임(바다)+오(낮) = 한낮의 바다 → 반짝이는 표면.'
  },
  debateKey: '같은 천간이라도 지지에 따라 에너지 표현이 완전히 달라짐. 이것이 "같은 일간인데 왜 다른가?"의 답.'
};


// ══════════════════════════════════════════════════
// 섹션 I: 비슷해 보이는 일주 구별법
// ══════════════════════════════════════════════════

var ST5_SIMILAR_ILJU = [
  { pair: ['갑인','갑진'], similarity: '둘 다 갑목+목/토 지지', difference: '갑인: 봄 숲의 나무 — 성장 에너지 극대화, 자기 세상을 만듦. 갑진: 용(龍) 위의 나무 — 변화의 에너지, 예측불가한 돌파력.' },
  { pair: ['을묘','을사'], similarity: '둘 다 을목(풀)', difference: '을묘: 봄 정원의 꽃 — 매력 극대화, 사교성. 을사: 여름 덩굴 — 뜨거운 환경에서 생존하는 강인함.' },
  { pair: ['병오','병인'], similarity: '둘 다 병화(태양)', difference: '병오: 한낮의 태양 — 에너지 정점, 화려하지만 소진 위험. 병인: 봄의 태양 — 따뜻하고 성장을 도움, 더 온화.' },
  { pair: ['임자','임신'], similarity: '둘 다 임수(큰 물)', difference: '임자: 밤바다 — 깊이와 고요. 통찰력 극대화. 임신: 가을 강 — 날카롭고 거침없는 추진력.' },
  { pair: ['정미','정사'], similarity: '둘 다 정화(촛불)', difference: '정미: 여름 저녁 촛불 — 따뜻하고 감성적. 로맨틱. 정사: 여름 낮 촛불 — 강렬하지만 태양(병)에 가려질 수 있는 존재감 고민.' },
  { pair: ['경신','경술'], similarity: '둘 다 경금(바위/칼)', difference: '경신: 가을 바위 — 본연의 힘 극대화. 결단력 최강. 경술: 늦가을 바위 — 정리와 마무리의 결단. 과거를 끊는 힘.' },
  { pair: ['무진','무술'], similarity: '둘 다 무토(산) + 토 지지', difference: '무진: 봄 산 — 용의 에너지와 만나 역동적. 무술: 가을 산 — 무덤(墓) 위의 산, 깊은 성찰과 영적 에너지.' },
  { pair: ['기미','기축'], similarity: '둘 다 기토(논밭) + 토 지지', difference: '기미: 여름 논밭 — 무르익는 비옥함. 기축: 겨울 논밭 — 얼어붙었지만 아래에 씨앗. 인내의 수확.' }
];


// ══════════════════════════════════════════════════
// 섹션 J: 조후론 — 사주의 기질 온도
// ══════════════════════════════════════════════════

var ST5_JOHU = {
  concept: '월지(태어난 달)의 계절이 사주의 기본 "온도"를 결정. 뜨거운 사주는 식혀줘야 하고, 차가운 사주는 데워줘야 한다.',
  seasons: {
    spring: { months: '인묘진 (1~3월)', character: '성장 모드. 낙관적. 새로 시작하는 에너지.', need: '화(따뜻함)가 있으면 성장 가속. 금(가위)이 적절히 있으면 방향 정리.' },
    summer: { months: '사오미 (4~6월)', character: '표현 모드. 열정적. 소진 위험.', need: '수(물)가 반드시 필요 — 없으면 타버림. 금(서늘함)도 도움.' },
    autumn: { months: '신유술 (7~9월)', character: '정리 모드. 결단력. 냉정할 수 있음.', need: '화(따뜻함)가 있으면 냉정함 완화. 수(물)가 있으면 예리함에 깊이 추가.' },
    winter: { months: '해자축 (10~12월)', character: '축적 모드. 신중. 느릴 수 있음.', need: '화(불)가 반드시 필요 — 없으면 얼어붙음. 목(나무)이 있으면 화를 생해줌.' }
  },
  practicalInsight: '같은 갑목이라도 여름에 태어나면 "타는 나무"이고 겨울에 태어나면 "얼어붙은 나무". 처방이 정반대.'
};


// ══════════════════════════════════════════════════
// 전역 노출
// ══════════════════════════════════════════════════
window.ST5_PRINCIPLES = ST5_PRINCIPLES;
window.ST5_PILLAR_PSYCHOLOGY = ST5_PILLAR_PSYCHOLOGY;
window.ST5_JIJANGGAN_LAYERS = ST5_JIJANGGAN_LAYERS;
window.ST5_GYEOKGUK_SYSTEM = ST5_GYEOKGUK_SYSTEM;
window.ST5_RELATIONS_PHILOSOPHY = ST5_RELATIONS_PHILOSOPHY;
window.ST5_ACADEMIC_POSITION = ST5_ACADEMIC_POSITION;
window.ST5_TGAN_DEEP = ST5_TGAN_DEEP;
window.ST5_JIJI_DEEP = ST5_JIJI_DEEP;
window.ST5_ILJU_COMBINATION = ST5_ILJU_COMBINATION;
window.ST5_SIMILAR_ILJU = ST5_SIMILAR_ILJU;
window.ST5_JOHU = ST5_JOHU;


// ═══════════════════════════════════════════════════
// 마스터 함수: 개인분석 + 궁합 겸용
// sajuB, ggB가 있으면 궁합 관계 분석도 포함
// ═══════════════════════════════════════════════════
function SJ_buildFullContext(saju, gg, dw, gender, sajuB, ggB) {
  var t = [];

  // === 개인분석 (항상 실행) ===
  try { t.push(SJ_buildYinYangText(saju)); } catch(e) { console.warn('[SJ] YinYang:', e.message); }
  try { t.push(SJ_buildStrengthText(gg)); } catch(e) { console.warn('[SJ] Strength:', e.message); }

  var ssIndiv, tongbyeons;
  try {
    ssIndiv = SJ_countIndividualSS(saju);
    tongbyeons = SJ_detectTongbyeon(gg, ssIndiv);
    t.push(SJ_buildTongbyeonText(tongbyeons));
  } catch(e) { console.warn('[SJ] Tongbyeon:', e.message); tongbyeons = []; }

  var yongshinOh, osin;
  try {
    yongshinOh = SJ_extractYongshinOh(gg.yongshin);
    osin = SJ_calcOsinChegye(yongshinOh);
    t.push(SJ_buildOsinText(gg, dw));
    t.push(SJ_buildGaeunText(yongshinOh));
  } catch(e) { console.warn('[SJ] Osin/Gaeun:', e.message); osin = null; }

  try { t.push(SJ_buildYukchinText(saju, gender)); } catch(e) {}
  try { t.push(SJ_buildUnsungGungwiText(saju)); } catch(e) {}
  try { t.push(SJ_buildGongmangText(saju)); } catch(e) {}
  try { t.push(SJ_buildGongmangFull(saju)); } catch(e) {}
  try { t.push(SJ_buildHealthText(saju, gg)); } catch(e) {}
  try { t.push(SJ_buildJobText(gg)); } catch(e) {}
  try { t.push(SJ_buildWonkukRelations(saju)); } catch(e) {}

  try {
    var hyungs = SJ_checkSamhyung(saju);
    if (hyungs && hyungs.length > 0) t.push(SJ_buildHyungText(hyungs));
  } catch(e) {}

  try {
    var tuchul = SJ_checkTuchul(saju);
    if (tuchul) t.push(typeof tuchul === 'string' ? tuchul : JSON.stringify(tuchul));
  } catch(e) {}

  try { t.push(SJ_getWolryulText(saju)); } catch(e) {}
  try { t.push(SJ_analyzeSpecialSals(saju)); } catch(e) {}

  // 시간축 분석
  if (dw) {
    var currentAge = dw.currentAge || 30;
    try {
      var gyowoongi = SJ_findGyowoongi(dw, currentAge);
      if (gyowoongi) t.push(typeof gyowoongi === 'string' ? gyowoongi : JSON.stringify(gyowoongi));
    } catch(e) {}
    try { t.push(SJ_findLoveTiming(saju, gg, dw, gender)); } catch(e) {}
    try { t.push(SJ_findMoneyTiming(saju, gg, dw, osin)); } catch(e) {}
    try { t.push(SJ_findHapTrigger(saju, dw, osin)); } catch(e) {}
    try { t.push(SJ_buildMonthlyHighlight(saju, gg, osin)); } catch(e) {}
    try { t.push(SJ_buildTaekil(saju, gg, osin)); } catch(e) {}
    try { t.push(SJ_buildLifeRoadmap(dw, saju, gg, gender)); } catch(e) {}
  }

  try { t.push(SJ_buildChildAnalysis(saju, gg, gender)); } catch(e) {}

  try {
    var killingPoints = SJ_generateKillingPoints(saju, gg, {tongbyeons: tongbyeons || [], osin: osin});
    if (killingPoints) t.push(typeof killingPoints === 'string' ? killingPoints : JSON.stringify(killingPoints));
  } catch(e) {}

  // === 궁합 (sajuB가 있을 때만) ===
  if (sajuB && ggB) {
    t.push('\n[궁합 사주 이론]');
    try { t.push(SJ_buildCoupleSynergy(saju, gg, sajuB, ggB)); } catch(e) {}
    try { t.push(SJ_buildNapeumGunghap(saju, sajuB)); } catch(e) {}
    try {
      var crossTong = SJ_detectCrossTongbyeon(gg, ggB);
      if (crossTong) t.push(typeof crossTong === 'string' ? crossTong : JSON.stringify(crossTong));
    } catch(e) {}
  }

  return t.filter(Boolean).join('\n\n');
}

window.SJ_buildFullContext = SJ_buildFullContext;

})();
