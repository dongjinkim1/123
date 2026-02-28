// ======================================================================
// saju.js v1.0 — engine.js 보강 모듈 (14개 항목)
// engine.js를 수정하지 않고, 읽기 전용으로 참조하여 AI 프롬프트에 주입
// 규칙: SJ_ 접두사, ES5 문법, engine.js 무수정
// ======================================================================
(function() {
'use strict';

// ── 오행 상수 ──
var SJ_OH = ['목','화','토','금','수'];

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
    result.push({ name:'식상생재', type:'길', desc:'재능을 돈으로 바꾸는 구조. 창작/기술/콘텐츠로 수입' });
  if (cnt['관성'] >= 1.5 && cnt['인성'] >= 1.5)
    result.push({ name:'살인상생', type:'길', desc:'압박이 지혜로 변하는 구조. 학자·전문가 적성' });
  if (cnt['재성'] >= 1.5 && cnt['관성'] >= 1.5)
    result.push({ name:'재관쌍미', type:'길', desc:'돈과 명예를 동시에 잡는 구조' });
  if (cnt['인성'] >= 1.5 && cnt['비겁'] >= 1.5)
    result.push({ name:'인수생비', type:'길', desc:'배움이 힘이 되는 구조' });
  if ((ssIndiv['식신'] || 0) >= 1 && cnt['관성'] >= 1.5)
    result.push({ name:'식신제살', type:'길', desc:'재능으로 위기를 넘기는 구조' });

  // 흉(凶)
  if (cnt['비겁'] >= 2.0 && cnt['재성'] >= 1.0)
    result.push({ name:'비겁탈재', type:'흉', desc:'돈이 새는 구조. 동업·보증 절대 금지' });
  if (cnt['재성'] >= 2.5 && selfRatio < 0.35)
    result.push({ name:'재다신약', type:'흉', desc:'돈은 보이는데 잡을 힘이 없는 구조' });
  if ((ssIndiv['편관'] || 0) >= 1 && (ssIndiv['정관'] || 0) >= 1)
    result.push({ name:'관살혼잡', type:'흉', desc:'이중 압박. 결단력 필요' });
  if (cnt['인성'] >= 3.0)
    result.push({ name:'인성태과', type:'흉', desc:'생각이 너무 많아 행동이 늦음' });
  if (cnt['식상'] >= 3.0)
    result.push({ name:'식상태과', type:'흉', desc:'말/표현이 과해 화를 부름' });
  if (cnt['비겁'] >= 3.0)
    result.push({ name:'비겁태과', type:'흉', desc:'자존심 과잉. 양보를 모름' });
  if (cnt['재성'] >= 3.0)
    result.push({ name:'재성태과', type:'흉', desc:'돈에 집착. 인간관계 소홀' });
  if (cnt['관성'] >= 3.0)
    result.push({ name:'관성태과', type:'흉', desc:'스트레스 과다. 자유 억압' });
  if ((ssIndiv['상관'] || 0) >= 1 && (ssIndiv['정관'] || 0) >= 1)
    result.push({ name:'상관견관', type:'흉', desc:'규칙 vs 자유의 내면 갈등' });
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

function SJ_yinYangMBTICross(yy, mbtiType) {
  if (!yy || !mbtiType) return '';
  var first = mbtiType.charAt(0); // E or I
  var crosses = [];
  if (yy.label === '극양' && first === 'I')
    crosses.push('겉은 조용, 속은 화산. 혼자 있을 때 폭발적 에너지');
  if (yy.label === '극음' && first === 'E')
    crosses.push('사교적이지만 에너지 소모 극심. 혼자 충전 필수');
  if (yy.label === '양우세' && first === 'I')
    crosses.push('안에서 추진력 넘치는데 밖에서 표현 안 함');
  if (yy.label === '음우세' && first === 'E')
    crosses.push('사람 좋아하지만 에너지 빨리 바닥남. 소수정예가 답');
  if (yy.label === '극양' && first === 'E')
    crosses.push('에너지 풀가동. 멈추면 불안한 타입. 번아웃 주의');
  if (yy.label === '극음' && first === 'I')
    crosses.push('사주와 MBTI 모두 내향. 깊은 내면세계의 소유자. 밖으로 나와야 운이 열림');
  if (yy.label === '양우세' && first === 'E')
    crosses.push('활동력과 사교성 모두 높음. 리더/영업/무대 적성');
  if (yy.label === '음우세' && first === 'I')
    crosses.push('사주와 MBTI 모두 내향. 연구/예술/글쓰기 적성. 의도적 외향 활동 필요');
  return crosses.length > 0 ? crosses[0] : '';
}

function SJ_buildYinYangText(saju, mbtiType) {
  var yy = SJ_calcYinYang(saju);
  var cross = SJ_yinYangMBTICross(yy, mbtiType);
  var line = '★음양 밸런스: 양=' + yy.yang + ' 음=' + yy.yin + ' → ' + yy.label + '(' + yy.desc + ')';
  if (cross) line += '\n  ⚡ 사주(' + yy.label + ')×MBTI(' + mbtiType.charAt(0) + '): ' + cross;
  return line;
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
      desc: '은혜를 원수로 갚는 형국. 보증 금지',
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
      points.push('"혼자 벌면 대박, 동업하면 쪽박. 파트너 선택이 인생을 가름" (식상생재+비겁탈재)');
    }
  }

  // 2. 음양×MBTI 반전
  if (sjData.yinYangText) {
    if (sjData.yinYangText.indexOf('극양') >= 0 && sjData.yinYangText.indexOf('MBTI(I)') >= 0) {
      points.push('"겉과 속이 정반대인 사람. 오해를 자주 받지만, 그게 매력" (극양+I)');
    } else if (sjData.yinYangText.indexOf('극음') >= 0 && sjData.yinYangText.indexOf('MBTI(E)') >= 0) {
      points.push('"사교적이지만 에너지 소모 극심. 겉과 속의 갭이 매력" (극음+E)');
    }
  }

  // 3. 교운기 임박
  if (sjData.gyowoongiText && sjData.gyowoongiText.indexOf('지금!') >= 0) {
    points.push('"지금이 인생 최대 전환점. 삶의 방향이 바뀌는 중" (교운기 임박)');
  }

  // 4. 12운성 반전: 일지 사/절/묘 + 배우자 정재/정관
  if (saju.uns && saju.uns[2]) {
    var iljiUns = saju.uns[2];
    if ((iljiUns === '사' || iljiUns === '절' || iljiUns === '묘') && saju.jiSS && saju.jiSS[2]) {
      var spSS = saju.jiSS[2].ss;
      if (spSS === '정재' || spSS === '정관') {
        points.push('"배우자궁은 약한데 배우자 에너지는 좋음. 만남이 늦지만 만나면 깊음" (12운성 반전)');
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
      points.push('"큰 흐름은 좋은데 올해만 조심. 인내가 답" (세운기신+대운희신)');
    } else if (seLine.indexOf('희신') >= 0 && dwLine.indexOf('기신') >= 0) {
      points.push('"큰 흐름은 나쁜데 올해는 기회. 올해 안에 움직여라" (세운희신+대운기신)');
    }
  }

  // 6. 공망 반전: 월지 공망 + 식상생재
  if (sjData.gongmangText && sjData.gongmangText.indexOf('월지') >= 0 && sjData.tongbyeons) {
    for (var t2 = 0; t2 < sjData.tongbyeons.length; t2++) {
      if (sjData.tongbyeons[t2].name === '식상생재') {
        points.push('"직장은 안 맞는데 자기 사업하면 대박나는 구조" (월지공망+식상생재)');
        break;
      }
    }
  }

  // 7. 삼합 트리거 + 용신
  if (sjData.hapTriggerText) {
    var curY = new Date().getFullYear();
    if (sjData.hapTriggerText.indexOf(curY + '년') >= 0 && sjData.hapTriggerText.indexOf('용신') >= 0) {
      points.push('"올해 에너지가 폭발. 인생 최고의 기회" (삼합 트리거+용신)');
    }
  }

  // 8. 도화+건록 조합
  if (saju.uns && saju.uns[2] === '건록') {
    var dohwa8 = SJ_getDohwa(r.dj);
    if (dohwa8 >= 0 && r.dj === dohwa8) {
      points.push('"매력적이면서 독립적. 쉽게 안 넘어가는 매력" (도화+건록)');
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
          points.push('"' + hd.organ + ' 건강 특별히 주의. 부족오행이 흉신" (건강 경고)');
          break;
        }
      }
    }
  }

  // 10. 연애 타이밍 집중: ★★★
  if (sjData.loveTimingText && sjData.loveTimingText.indexOf('★★★') >= 0) {
    points.push('"가까운 시일 내 인생 최대 연애/결혼 타이밍" (연애 타이밍 집중)');
  }

  if (points.length > 5) points = points.slice(0, 5);
  if (points.length === 0) return '';
  var lines = ['★AI 킬링 포인트 후보 (풀이에 자연스럽게 녹여서 사용):'];
  for (var p = 0; p < points.length; p++) {
    lines.push('  ' + (p + 1) + '. ' + points[p]);
  }
  return lines.join('\n');
}


// ======================================================================
// 통합 함수: SJ_enrichSajuData
// ======================================================================

function SJ_enrichSajuData(saju, gg, dw, gender, mbtiType) {
  // 개별 십성 카운트를 gg에 첨부
  var ssIndiv = SJ_countIndividualSS(saju);
  gg._ssArr = ssIndiv;

  // 용신 오행 추출
  var yoh = SJ_extractYongshinOh(gg.yongshin || '');
  var osin = yoh ? SJ_calcOsinChegye(yoh) : null;

  // 각 항목 계산
  var osinText = SJ_buildOsinText(gg, dw);
  var yukchinText = SJ_buildYukchinText(saju, gender);
  var unsungText = SJ_buildUnsungGungwiText(saju);
  var tongbyeons = SJ_detectTongbyeon(gg, ssIndiv);
  var tongbyeonText = SJ_buildTongbyeonText(tongbyeons);
  var gongmangText = SJ_buildGongmangText(saju);
  var yinYangText = SJ_buildYinYangText(saju, mbtiType);
  var gyowoongiText = SJ_findGyowoongi(dw, dw ? dw.currentAge : null);
  var hyungs = SJ_checkSamhyung(saju);
  var hyungText = SJ_buildHyungText(hyungs);
  var healthText = SJ_buildHealthText(saju, gg);
  var tuchulText = SJ_checkTuchul(saju);
  var wolryulText = SJ_getWolryulText(saju);
  var gaeunText = SJ_buildGaeunText(yoh);

  // ⑮~⑳ 추가 8개 항목
  var jobText = SJ_buildJobText(gg);
  var strengthText = SJ_buildStrengthText(gg);
  var loveTimingText = SJ_findLoveTiming(saju, gg, dw, gender);
  var specialSalsText = SJ_analyzeSpecialSals(saju);
  var monthlyText = SJ_buildMonthlyHighlight(saju, gg, osin);
  var hapTriggerText = SJ_findHapTrigger(saju, dw, osin);

  var result = {
    osinText: osinText,
    yukchinText: yukchinText,
    unsungText: unsungText,
    tongbyeonText: tongbyeonText,
    gongmangText: gongmangText,
    yinYangText: yinYangText,
    gyowoongiText: gyowoongiText,
    hyungText: hyungText,
    healthText: healthText,
    tuchulText: tuchulText,
    wolryulText: wolryulText,
    gaeunText: gaeunText,
    jobText: jobText,
    strengthText: strengthText,
    loveTimingText: loveTimingText,
    specialSalsText: specialSalsText,
    monthlyText: monthlyText,
    hapTriggerText: hapTriggerText,
    // 메타
    osin: osin,
    tongbyeons: tongbyeons,
    hyungs: hyungs,
    yongshinOh: yoh
  };

  // ㉒ 킬링 포인트 (모든 데이터 종합 필요하므로 마지막)
  result.killingPointsText = SJ_generateKillingPoints(saju, gg, result);
  return result;
}


// ======================================================================
// 프롬프트 주입 함수: SJ_injectIntoPrompt
// ======================================================================

function SJ_injectIntoPrompt(userMsg, sjData) {
  if (!sjData || !userMsg) return userMsg;
  var msg = userMsg;

  // ① 오행흐름 뒤에 5신 체계 삽입
  if (sjData.osinText) {
    var ohFlowMarker = '★오행흐름:';
    var ohIdx = msg.indexOf(ohFlowMarker);
    if (ohIdx >= 0) {
      var lineEnd = msg.indexOf('\n', ohIdx);
      if (lineEnd >= 0) {
        msg = msg.substring(0, lineEnd) + '\n' + sjData.osinText + msg.substring(lineEnd);
      }
    }
  }

  // ② ③ ⑨ ⑥ ④ → "### 신살 스토리" 앞에 삽입
  var sinsalMarker = '### 신살 스토리';
  var sinsalIdx = msg.indexOf(sinsalMarker);
  if (sinsalIdx >= 0) {
    var insertBlock = '';
    if (sjData.unsungText)    insertBlock += sjData.unsungText + '\n\n';
    if (sjData.yukchinText)   insertBlock += sjData.yukchinText + '\n\n';
    if (sjData.healthText)    insertBlock += sjData.healthText + '\n\n';
    if (sjData.yinYangText)   insertBlock += sjData.yinYangText + '\n\n';
    if (sjData.tongbyeonText) insertBlock += sjData.tongbyeonText + '\n\n';
    if (sjData.jobText)       insertBlock += sjData.jobText + '\n\n';
    if (sjData.strengthText)  insertBlock += sjData.strengthText + '\n\n';
    if (insertBlock) {
      msg = msg.substring(0, sinsalIdx) + insertBlock + msg.substring(sinsalIdx);
    }
  }

  // ⑤ ⑧ → "### 올해 핵심 사건" 앞에 삽입
  var yearMarker = '### 올해 핵심 사건';
  var yearIdx = msg.indexOf(yearMarker);
  if (yearIdx >= 0) {
    var yearBlock = '';
    if (sjData.gongmangText) yearBlock += sjData.gongmangText + '\n\n';
    if (sjData.hyungText)        yearBlock += sjData.hyungText + '\n\n';
    if (sjData.specialSalsText) yearBlock += sjData.specialSalsText + '\n\n';
    if (yearBlock) {
      msg = msg.substring(0, yearIdx) + yearBlock + msg.substring(yearIdx);
    }
  }

  // ⑦ ⑯ ⑱ ⑳ → "세운: " 뒤에 삽입
  var seunBlock = '';
  if (sjData.gyowoongiText)  seunBlock += sjData.gyowoongiText + '\n';
  if (sjData.loveTimingText) seunBlock += sjData.loveTimingText + '\n';
  if (sjData.monthlyText)    seunBlock += sjData.monthlyText + '\n';
  if (sjData.hapTriggerText) seunBlock += sjData.hapTriggerText + '\n';
  if (seunBlock) {
    var seunMarker = '세운: ';
    var seunIdx = msg.indexOf(seunMarker);
    if (seunIdx >= 0) {
      var seunLineEnd = msg.indexOf('\n', seunIdx);
      if (seunLineEnd >= 0) {
        msg = msg.substring(0, seunLineEnd) + '\n' + seunBlock + msg.substring(seunLineEnd);
      }
    }
  }

  // ⑩ ⑫ ⑬ → "## 참고 힌트" 섹션 끝에 삽입
  var hintMarker = '## 참고 힌트';
  var hintIdx = msg.indexOf(hintMarker);
  if (hintIdx >= 0) {
    // 다음 ## 섹션 찾기
    var nextSection = msg.indexOf('\n## ', hintIdx + hintMarker.length);
    var insertPos = nextSection >= 0 ? nextSection : msg.indexOf('\n\n## ', hintIdx + hintMarker.length);
    if (insertPos < 0) {
      // ## 참고 힌트 내용의 끝 찾기 (다음 빈 줄 2개)
      var hintEnd = msg.indexOf('\n\n\n', hintIdx);
      insertPos = hintEnd >= 0 ? hintEnd : msg.length;
    }
    var hintBlock = '\n';
    if (sjData.tuchulText)  hintBlock += '\n' + sjData.tuchulText;
    if (sjData.wolryulText) hintBlock += '\n' + sjData.wolryulText;
    if (sjData.gaeunText)           hintBlock += '\n' + sjData.gaeunText;
    if (sjData.killingPointsText)  hintBlock += '\n\n' + sjData.killingPointsText;
    if (hintBlock.length > 1) {
      msg = msg.substring(0, insertPos) + hintBlock + msg.substring(insertPos);
    }
  }

  return msg;
}


// ======================================================================
// 프롬프트 래핑: runSajuAnalysis + streamSonnet 오버라이드
// ======================================================================

// 원본 백업
var _originalRunSaju = window.runSajuAnalysis;
var _origStreamSonnet = window.streamSonnet;

// streamSonnet 래핑 — AI 호출 직전에 프롬프트 주입
window.streamSonnet = function(apiKey, systemPrompt, userMsg, label, callbacks, endpoint) {
  // 궁합 분석이 아닐 때만 주입
  if (label && label.indexOf('궁합') < 0 && window._SJ_pendingData) {
    try {
      userMsg = SJ_injectIntoPrompt(userMsg, window._SJ_pendingData);
      console.log('[saju.js] 프롬프트 주입 완료 — 총 ' + userMsg.length + '자');
    } catch (e) {
      console.error('[saju.js] 프롬프트 주입 에러:', e);
    }
    window._SJ_pendingData = null;
  }
  return _origStreamSonnet.call(this, apiKey, systemPrompt, userMsg, label, callbacks, endpoint);
};

// runSajuAnalysis 래핑 — 분석 전에 보강 데이터 생성
window.runSajuAnalysis = function(params, callbacks) {
  try {
    // params에서 사주/격국/대운 계산 (engine.js 전역 함수 사용)
    var saju = calcSajuForApp(
      +params.y, +params.m, +params.d,
      params.h ? +params.h : null,
      params.min ? +params.min : null,
      params.cityLng || null
    );
    var gg = analyzeGyeokguk(saju);
    var mt = (typeof getMBTIFromChoices === 'function') ? getMBTIFromChoices(params.mbtiChoices) : '';
    var genderStr = params.gender;
    var dw = calcDaewoon(
      saju, +params.y, +params.m, +params.d,
      params.h ? +params.h : null,
      params.min ? +params.min : null,
      genderStr
    );

    // SJ 보강 데이터 생성 + 저장
    var sjData = SJ_enrichSajuData(saju, gg, dw, genderStr, mt);
    window._SJ_pendingData = sjData;
    console.log('[saju.js] 보강 데이터 생성 완료:', Object.keys(sjData).filter(function(k) { return sjData[k]; }).length + '개 항목');
  } catch (e) {
    console.error('[saju.js] 보강 데이터 생성 에러:', e);
    window._SJ_pendingData = null;
  }

  // 원본 runSajuAnalysis 호출
  return _originalRunSaju.call(this, params, callbacks);
};


// ======================================================================
// window 전역 등록
// ======================================================================

window.SJ_enrichSajuData      = SJ_enrichSajuData;
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
window.SJ_injectIntoPrompt     = SJ_injectIntoPrompt;
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

console.log('[saju.js] v2.0 로드 완료 — 22개 보강 모듈 활성화');

})();
