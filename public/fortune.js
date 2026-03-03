(function() {
'use strict';

// ══════════════════════════════════════
// fortune.js — 오늘의 운세 데이터 엔진
// engine.js, saju.js 전역 함수 사용 (수정 없음)
// ══════════════════════════════════════

// ── 1. getTodayIljin() ──
function getTodayIljin() {
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
  var jdn = dateToJDN(y, m, d);
  var dIdx = ((Math.floor(jdn) + 50) % 60 + 60) % 60;
  var todayGan = dIdx % 10;
  var todayJi = dIdx % 12;
  return {
    gan: todayGan,
    ji: todayJi,
    ganKr: TGAN_KR[todayGan],
    jiKr: JIJI_KR[todayJi],
    ganjiText: TGAN_KR[todayGan] + JIJI_KR[todayJi],
    ohGan: OHAENG_TGAN[todayGan],
    ohJi: OHAENG_JIJI[todayJi]
  };
}

// ── 2. getFortuneBase(saju) ──
function getFortuneBase(saju) {
  var today = getTodayIljin();
  var myDg = saju.raw.dg;
  var sipsung = getSipsung(myDg, today.gan);
  var unsung = getUnsung(myDg, today.ji);
  return { sipsung: sipsung, unsung: unsung, today: today };
}

// ── 3. checkOverlays(saju, gg, dw) ──
function checkOverlays(saju, gg, dw) {
  var today = getTodayIljin();
  var tj = today.ji;
  var tg = today.gan;
  var r = saju.raw;
  var results = [];

  // ── 신살 오버레이 ──
  // 도화살
  if (typeof SJ_getDohwa === 'function') {
    var dohwa = SJ_getDohwa(r.dj);
    if (dohwa >= 0 && dohwa === tj) results.push('도화살');
  }
  // 역마살
  if (typeof SJ_getYeokma === 'function') {
    var yeokma = SJ_getYeokma(r.dj);
    if (yeokma >= 0 && yeokma === tj) results.push('역마살');
  }
  // 화개살
  if (typeof SJ_getHwagae === 'function') {
    var hwagae = SJ_getHwagae(r.dj);
    if (hwagae >= 0 && hwagae === tj) results.push('화개살');
  }
  // 천을귀인 (일간 기준)
  var ceM = {0:[1,7],4:[1,7],1:[0,8],5:[0,8],2:[11,9],3:[11,9],6:[1,7],7:[2,6],8:[3,5],9:[3,5]};
  if (ceM[r.dg] && ceM[r.dg].indexOf(tj) >= 0) results.push('천을귀인');
  // 양인살
  var yiM = {0:3,2:6,4:6,6:9,8:0};
  if (r.dg in yiM && yiM[r.dg] === tj) results.push('양인살');
  // 홍염살
  var hongMap = {0:6,1:7,2:8,3:9,4:6,5:7,6:8,7:9,8:6,9:7};
  if (hongMap[r.dg] != null && hongMap[r.dg] === tj) results.push('홍염살');

  // ── 합충형 오버레이 ──
  var pillars = [
    {ji: r.yj, label: '년지'},
    {ji: r.mj, label: '월지'},
    {ji: r.dj, label: '일지'},
    {ji: r.hj, label: '시지'}
  ];
  var CHUNG_PAIRS = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var YUKHAP_PAIRS = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];

  for (var p = 0; p < pillars.length; p++) {
    var pji = pillars[p].ji;
    if (pji == null) continue;
    // 충
    for (var c = 0; c < CHUNG_PAIRS.length; c++) {
      if ((pji === CHUNG_PAIRS[c][0] && tj === CHUNG_PAIRS[c][1]) ||
          (pji === CHUNG_PAIRS[c][1] && tj === CHUNG_PAIRS[c][0])) {
        results.push('충_' + pillars[p].label);
      }
    }
    // 합
    for (var h = 0; h < YUKHAP_PAIRS.length; h++) {
      if ((pji === YUKHAP_PAIRS[h][0] && tj === YUKHAP_PAIRS[h][1]) ||
          (pji === YUKHAP_PAIRS[h][1] && tj === YUKHAP_PAIRS[h][0])) {
        results.push('합_' + pillars[p].label);
      }
    }
  }

  // ── 문창/천덕/월덕/학당/금여록/귀문관/백호 ──
  var mcM = [5,6,8,9,8,9,11,0,2,3];
  if (mcM[r.dg] === tj) results.push('문창귀인');
  var gyM = [4,5,7,8,7,8,10,11,1,2];
  if (gyM[r.dg] === tj) results.push('금여록');
  var hdM = [11,6,2,9,2,9,5,0,8,3];
  if (hdM[r.dg] === tj) results.push('학당귀인');
  var gmM = [9,6,7,8,5,4,1,2,3,0,11,10];
  if (r.dj != null && gmM[r.dj] === tj) results.push('귀문관살');
  var bhM = [4,1,7,2,10,7,4,1,10,7];
  if (bhM[r.dg] === tj) results.push('백호살');

  // ── 납음 관계 ──
  if (typeof SJ_getNapeum === 'function' || typeof getNapeum === 'function') {
    var getN = (typeof SJ_getNapeum === 'function') ? SJ_getNapeum : getNapeum;
    var myNapeum = getN(r.dg, r.dj);
    var todayNapeum = getN(tg, tj);
    if (myNapeum && todayNapeum) {
      var myOh = myNapeum.oh || myNapeum;
      var todayOh = todayNapeum.oh || todayNapeum;
      var SANG = {'목':'화','화':'토','토':'금','금':'수','수':'목'};
      var GEUK = {'목':'토','화':'금','토':'수','금':'목','수':'화'};
      if (SANG[todayOh] === myOh) results.push('납음상생');
      else if (GEUK[todayOh] === myOh) results.push('납음상극');
      else if (todayOh === myOh) results.push('납음비화');
      else if (SANG[myOh] === todayOh) results.push('납음역생');
      else if (GEUK[myOh] === todayOh) results.push('납음역극');
    }
  }

  // ── 공망 체크 ──
  var now = new Date();
  var dayIdx60 = ((Math.floor(dateToJDN(now.getFullYear(), now.getMonth() + 1, now.getDate())) + 50) % 60 + 60) % 60;
  var xunStart = Math.floor(dayIdx60 / 10) * 10;
  var gong1 = (xunStart + 10) % 12;
  var gong2 = (xunStart + 11) % 12;
  if (tj === gong1 || tj === gong2) results.push('공망');

  return results;
}

// ── 4. buildCategoryCard 헬퍼 ──
function buildCategoryCard(emoji, title, catData, overlays, catKey) {
  var stars = '';
  for (var s = 0; s < 5; s++) {
    stars += s < catData.stars ? '★' : '☆';
  }
  var html = '<div class="glass-card" style="padding:16px;margin-bottom:12px">';
  html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">';
  html += '<span style="font-size:14px;font-weight:700;color:var(--text-primary)">' + emoji + ' ' + title + '</span>';
  html += '<span style="font-size:13px;color:' + (catData.stars >= 4 ? '#4CAF7D' : catData.stars <= 2 ? '#dc3545' : 'var(--accent)') + '">' + stars + '</span>';
  html += '</div>';
  html += '<div style="font-size:14px;line-height:1.7;color:var(--text-secondary)">' + catData.text + '</div>';

  for (var o = 0; o < overlays.length; o++) {
    var ovKey = overlays[o];
    var ovData = (typeof OVERLAY_TEXT !== 'undefined') ? OVERLAY_TEXT[ovKey] : null;
    if (ovData) {
      var ovText = '';
      if (typeof ovData === 'string') {
        ovText = ovData;
      } else if (ovData[catKey]) {
        ovText = ovData[catKey];
      }
      if (ovText) {
        html += '<div style="margin-top:10px;padding:10px 12px;background:rgba(136,97,154,0.04);border-radius:8px;border-left:3px solid var(--accent)">';
        html += '<div style="font-size:11px;font-weight:700;color:var(--accent);margin-bottom:4px">' + ovKey + ' 발동!</div>';
        html += '<div style="font-size:13px;line-height:1.6;color:var(--text-secondary)">' + ovText + '</div>';
        html += '</div>';
      }
    }
  }

  html += '</div>';
  return html;
}

// ── 5. renderFortuneCard(category) ──
function renderFortuneCard(category) {
  var me = null;
  try {
    var people = JSON.parse(localStorage.getItem('mbts_people') || '[]');
    for (var i = 0; i < people.length; i++) {
      if (people[i].id === 'me') { me = people[i]; break; }
    }
  } catch(e) {}

  if (!me || !me.saju) {
    var container = document.getElementById('fortune-container');
    if (container) {
      container.innerHTML = '<div class="glass-card" style="padding:32px 20px;text-align:center">' +
        '<div style="font-size:48px;margin-bottom:16px">🔮</div>' +
        '<p style="font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:8px">먼저 내 사주를 분석해주세요</p>' +
        '<p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">생년월일 입력 후 운세를 볼 수 있어요</p>' +
        '<button onclick="goPage(\'birth\')" style="padding:12px 24px;font-size:14px;font-weight:700;color:#fff;background:var(--accent);border:none;border-radius:12px;cursor:pointer">🔮 사주 분석하기</button>' +
      '</div>';
    }
    return;
  }

  var saju = me.saju;
  var gg = me.gg;
  var dw = me.dw;

  var base = getFortuneBase(saju);
  var data = (typeof FORTUNE_TEXT !== 'undefined') ? FORTUNE_TEXT[base.sipsung] : null;
  data = data && data[base.unsung];
  if (!data) { console.log('[fortune] 매핑 없음:', base.sipsung, base.unsung); return; }

  var overlays = checkOverlays(saju, gg, dw);

  // 행운 정보
  var luckyInfo = null;
  if (gg && gg.yongshin && typeof SJ_GAEUN !== 'undefined') {
    var yongOh = null;
    var oh5 = ['목','화','토','금','수'];
    for (var oi = 0; oi < oh5.length; oi++) {
      if (gg.yongshin.indexOf(oh5[oi]) >= 0) { yongOh = oh5[oi]; break; }
    }
    if (yongOh && SJ_GAEUN[yongOh]) luckyInfo = SJ_GAEUN[yongOh];
  }

  // 건강 정보
  var healthWarnings = [];
  if (saju.lackFull && typeof SJ_HEALTH_OH !== 'undefined') {
    for (var li = 0; li < saju.lackFull.length; li++) {
      var hd = SJ_HEALTH_OH[saju.lackFull[li]];
      if (hd) healthWarnings.push({ oh: saju.lackFull[li], data: hd });
    }
  }

  // 날짜
  var now = new Date();
  var dateText = (now.getMonth()+1) + '월 ' + now.getDate() + '일 ' +
    ['일','월','화','수','목','금','토'][now.getDay()] + '요일';

  var html = '';

  // 카테고리 탭
  html += '<div style="display:flex;gap:6px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px">';
  var tabs = [
    {key:'all', emoji:'🔮', label:'종합'},
    {key:'money', emoji:'💰', label:'재물'},
    {key:'love', emoji:'💕', label:'연애'},
    {key:'health', emoji:'💪', label:'건강'}
  ];
  for (var ti = 0; ti < tabs.length; ti++) {
    var t = tabs[ti];
    var active = (category === t.key);
    html += '<button onclick="MBTS_Fortune.render(\'' + t.key + '\')" style="' +
      'padding:8px 16px;font-size:13px;font-weight:' + (active?'700':'600') +
      ';border:2px solid ' + (active?'var(--accent)':'var(--border-light)') +
      ';background:' + (active?'rgba(136,97,154,0.08)':'#fff') +
      ';color:' + (active?'var(--accent)':'var(--text-muted)') +
      ';border-radius:10px;cursor:pointer;white-space:nowrap">' +
      t.emoji + ' ' + t.label + '</button>';
  }
  html += '</div>';

  // 헤더 카드
  html += '<div class="glass-card" style="padding:20px;margin-bottom:12px;text-align:center">';
  html += '<div style="font-size:12px;color:var(--text-muted)">' + dateText + '</div>';
  html += '<div style="font-size:18px;font-weight:700;color:var(--text-primary);margin:8px 0">';
  html += '오늘 일진: ' + base.today.ganjiText + '(' + base.today.ohGan + ')일</div>';
  html += '<div style="display:flex;justify-content:center;gap:12px;font-size:13px;color:var(--accent)">';
  html += '<span>나와의 관계: ' + base.sipsung + '</span>';
  html += '<span>활력: ' + base.unsung + '</span>';
  html += '</div>';

  // 오버레이 뱃지
  if (overlays.length > 0) {
    html += '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:4px;margin-top:10px">';
    for (var oi2 = 0; oi2 < overlays.length; oi2++) {
      var ov = overlays[oi2];
      var isGood = (ov.indexOf('귀인') >= 0 || ov.indexOf('합') >= 0 || ov.indexOf('금여록') >= 0 || ov === '학당귀인' || ov.indexOf('상생') >= 0 || ov.indexOf('삼합') >= 0);
      var isBad = (ov.indexOf('살') >= 0 || ov.indexOf('충') >= 0 || ov.indexOf('형') >= 0 || ov.indexOf('극') >= 0 || ov === '공망' || ov.indexOf('해') >= 0);
      var badgeColor = isGood ? 'rgba(76,175,125,.1);color:#4CAF7D' : (isBad ? 'rgba(220,53,69,.1);color:#dc3545' : 'rgba(136,97,154,.1);color:var(--accent)');
      html += '<span style="padding:3px 8px;font-size:10px;font-weight:600;background:' + badgeColor + ';border-radius:6px">' + ov + '</span>';
    }
    html += '</div>';
  }
  html += '</div>';

  // 카테고리별 카드
  if (category === 'all' || category === 'money') {
    html += buildCategoryCard('💰', '재물운', data.money, overlays, 'money');
  }
  if (category === 'all' || category === 'love') {
    html += buildCategoryCard('💕', '연애운', data.love, overlays, 'love');
  }
  if (category === 'all' || category === 'health') {
    html += buildCategoryCard('💪', '건강운', data.health, overlays, 'health');
    if (healthWarnings.length > 0) {
      html += '<div class="glass-card" style="padding:16px;margin-bottom:12px">';
      html += '<div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:8px">🏥 오행별 건강 주의</div>';
      for (var hw = 0; hw < healthWarnings.length; hw++) {
        var w = healthWarnings[hw];
        html += '<div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">';
        html += w.oh + ' 부족 → ' + w.data.organ + ' 약화 (' + w.data.lack + ')';
        html += '</div>';
      }
      html += '</div>';
    }
  }

  // 종합이면 summary
  if (category === 'all') {
    html += '<div class="glass-card" style="padding:16px;margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:8px">⚡ 오늘의 포인트</div>';
    html += '<div style="font-size:14px;line-height:1.6;color:var(--text-secondary)">' + data.summary + '</div>';
    html += '</div>';
  }

  // 행운 정보
  if (luckyInfo) {
    html += '<div class="glass-card" style="padding:16px;margin-bottom:12px">';
    html += '<div style="font-size:12px;font-weight:700;color:var(--accent);margin-bottom:10px">🍀 오늘의 팁</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px;color:var(--text-secondary)">';
    html += '<div>🎨 행운색: ' + luckyInfo.color + '</div>';
    html += '<div>🔢 행운숫자: ' + luckyInfo.number + '</div>';
    html += '<div>🧭 좋은 방위: ' + luckyInfo.direction + '</div>';
    html += '<div>🍽️ 추천 음식: ' + luckyInfo.food + '</div>';
    html += '</div></div>';
  }

  // 달토 연결 버튼
  var daltoMsg = '';
  if (category === 'money') daltoMsg = '오늘 재물운 자세히 알려줘';
  else if (category === 'love') daltoMsg = '오늘 연애운 자세히 알려줘';
  else if (category === 'health') daltoMsg = '오늘 건강운 자세히 알려줘';
  else daltoMsg = '오늘 운세 자세히 알려줘';

  html += '<div style="text-align:center;margin-top:16px;margin-bottom:20px">';
  html += '<button onclick="MBTS_Fortune.askDalto(\'' + daltoMsg + '\')" style="';
  html += 'padding:14px 28px;font-size:14px;font-weight:700;color:#fff;';
  html += 'background:linear-gradient(135deg,var(--accent),#d63384);border:none;';
  html += 'border-radius:14px;cursor:pointer;box-shadow:0 4px 16px rgba(136,97,154,.3)';
  html += '">🐰 달토한테 자세히 물어보기</button>';
  html += '</div>';

  var container = document.getElementById('fortune-container');
  if (container) container.innerHTML = html;
}

// ── 6. askDalto(msg) ──
function askDalto(msg) {
  if (typeof MBTS_Chat !== 'undefined' && MBTS_Chat.openRoom) {
    MBTS_Chat.openRoom({ type: 'me' });
    setTimeout(function() {
      var input = document.getElementById('chat-input');
      if (input) { input.value = msg; }
      if (typeof window.sendChatMessage === 'function') {
        window.sendChatMessage();
      }
    }, 500);
  } else {
    if (typeof goPage === 'function') goPage('pgChat');
  }
}

// ── 7. window 노출 ──
window.MBTS_Fortune = {
  getTodayIljin: getTodayIljin,
  getFortuneBase: getFortuneBase,
  checkOverlays: checkOverlays,
  render: renderFortuneCard,
  askDalto: askDalto
};

console.log('[fortune.js] 로드 완료 — 오늘 일진: ' + getTodayIljin().ganjiText);

})();
