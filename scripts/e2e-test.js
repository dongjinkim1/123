// scripts/e2e-test.js
var puppeteer = require('puppeteer');
var fs = require('fs');

// ── 설정 ──
var BASE = 'http://localhost:3000';
var ADMIN_PW = 'tbn955955!';
var TIMEOUT = 420000; // 7분 (AI 풀이 넉넉하게)

// ── 5명 유저 데이터 ──
var USERS = [
  { name: '김서연', year: 1995, month: 3, day: 22, gender: '여성', mbti: 'ENFP', mbtiSides: ['L','R','R','R'], intensities: [70,70,70,70] },
  { name: '이준호', year: 1988, month: 11, day: 5, gender: '남성', mbti: 'ISTP', mbtiSides: ['R','L','L','R'], intensities: [80,60,70,65] },
  { name: '박지은', year: 2000, month: 7, day: 18, gender: '여성', mbti: 'INFJ', mbtiSides: ['R','R','R','L'], intensities: [75,80,70,65] },
  { name: '최민수', year: 1992, month: 1, day: 30, gender: '남성', mbti: 'ENTJ', mbtiSides: ['L','R','L','L'], intensities: [80,70,75,70] },
  { name: '정하윤', year: 1997, month: 9, day: 3, gender: '여성', mbti: 'ESFJ', mbtiSides: ['L','L','R','L'], intensities: [65,70,75,80] }
];

// 궁합 조합 (사주 끝난 후 클로버 많은 유저끼리)
var GH_PAIRS = [
  { a: 0, b: 1, rel: 'lover' },   // 김서연 × 이준호 (연인)
  { a: 2, b: 3, rel: 'ssom' }     // 박지은 × 최민수 (썸)
];

var report = [];
var userIds = [];
var userClovers = [];

function log(msg) {
  var timestamp = new Date().toLocaleTimeString('ko-KR');
  var line = '[' + timestamp + '] ' + msg;
  console.log(line);
  report.push(line);
}

// ══════════════════════════════════════
// Phase 1: 유저 5명 DB 직접 생성
// ══════════════════════════════════════
async function createUsersDirectDB() {
  log('========== Phase 1: 유저 5명 DB 직접 생성 ==========');

  var dotenv = require('dotenv');
  dotenv.config({ path: '.env.local' });
  var { createClient } = require('@supabase/supabase-js');
  var supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  for (var i = 0; i < USERS.length; i++) {
    var u = USERS[i];
    var email = u.name.replace(/\s/g, '') + '@mbts.test';

    // 이미 존재하면 가져오기
    var { data: existing } = await supabase
      .from('users')
      .select('id, clover_balance')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      userIds.push(existing.id);
      userClovers.push(existing.clover_balance || 0);
      log('♻️ ' + u.name + ' 이미 존재 — ID: ' + existing.id + ' / 클로버: ' + existing.clover_balance);
    } else {
      var { data: newUser, error } = await supabase
        .from('users')
        .insert({
          nickname: u.name,
          email: email,
          clover_balance: 0,
          role: 'user',
          is_blocked: false
        })
        .select()
        .single();

      if (error) {
        log('❌ ' + u.name + ' 생성 실패: ' + error.message);
        userIds.push(null);
        userClovers.push(0);
      } else {
        userIds.push(newUser.id);
        userClovers.push(0);
        log('✅ ' + u.name + ' 생성 완료 — ID: ' + newUser.id);
      }
    }
  }
}

// ══════════════════════════════════════
// Phase 2: admin에서 클로버 랜덤 지급 (브라우저!)
// ══════════════════════════════════════
async function giveCloverFromAdmin(browser) {
  log('');
  log('========== Phase 2: admin에서 클로버 지급 ==========');

  var page = await browser.newPage();
  await page.goto(BASE + '/admin.html', { waitUntil: 'networkidle2', timeout: 30000 });

  // 로그인
  await page.type('#pwInput', ADMIN_PW);
  await page.click('#loginBtn');
  await page.waitForSelector('.tab-bar', { timeout: 15000 });
  log('✅ admin 로그인 성공');

  // 클로버 탭으로 이동
  await page.evaluate(function() { setAdminTab(2); });
  await new Promise(function(r) { setTimeout(r, 1000); });

  for (var i = 0; i < USERS.length; i++) {
    if (!userIds[i]) continue;

    var amount = Math.floor(Math.random() * 46) + 15; // 15~60 랜덤

    // API로 직접 지급 (admin 브라우저 내에서 fetch)
    var directResult = await page.evaluate(async function(userId, amt, adminPw, base) {
      var authRes = await fetch(base + '/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPw })
      });
      var authData = await authRes.json();

      var cloverRes = await fetch(base + '/api/admin/clover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authData.token
        },
        body: JSON.stringify({
          action: 'give',
          userId: userId,
          amount: amt,
          reason: 'E2E 테스트 클로버 지급'
        })
      });
      return await cloverRes.json();
    }, userIds[i], amount, ADMIN_PW, BASE);

    if (directResult && directResult.success) {
      userClovers[i] = amount;
      log('✅ ' + USERS[i].name + ' → 🍀 ' + amount + '개 지급');
    } else {
      log('❌ ' + USERS[i].name + ' 클로버 지급 실패: ' + JSON.stringify(directResult));
    }
  }

  await page.close();
}

// ══════════════════════════════════════
// Phase 3: 5명 동시에 사주 분석!! (서버 부하 테스트)
// ══════════════════════════════════════
async function runSajuForUser(browser, userIndex) {
  var u = USERS[userIndex];
  var userId = userIds[userIndex];

  log('[' + u.name + '] 사주 분석 시작...');

  var page = await browser.newPage();
  page.setDefaultTimeout(TIMEOUT);
  await page.goto(BASE, { waitUntil: 'networkidle2', timeout: 60000 });

  // localStorage에 세션 세팅 (로그인 상태로 만들기)
  if (userId) {
    await page.evaluate(function(uid, name) {
      var session = {
        userId: uid,
        nickname: name,
        provider: 'test',
        cloverBalance: 50
      };
      localStorage.setItem('mbts_session', JSON.stringify(session));
    }, userId, u.name);
    await page.reload({ waitUntil: 'networkidle2' });
  }

  // 랜딩 → pgDash 이동
  await page.evaluate(function() {
    if (typeof go === 'function') go('pgDash');
  });
  await new Promise(function(r) { setTimeout(r, 1000); });

  // pgBirth 이동
  await page.evaluate(function() {
    if (typeof go === 'function') go('pgBirth');
  });
  await new Promise(function(r) { setTimeout(r, 1000); });

  // 이름 입력
  await page.evaluate(function(name) {
    var el = document.getElementById('bName');
    if (el) { el.value = name; el.dispatchEvent(new Event('input')); }
  }, u.name);

  // 생년월일 입력
  await page.evaluate(function(y, m, d) {
    var bYear = document.getElementById('bYear');
    if (bYear) { bYear.value = y; bYear.dispatchEvent(new Event('input')); }

    var bMonthInput = document.getElementById('bMonthInput');
    var bMonth = document.getElementById('bMonth');
    if (bMonthInput) { bMonthInput.value = m; bMonthInput.dispatchEvent(new Event('input')); }
    if (bMonth) bMonth.value = m;

    var bDayInput = document.getElementById('bDayInput');
    var bDay = document.getElementById('bDay');
    if (bDayInput) { bDayInput.value = d; bDayInput.dispatchEvent(new Event('input')); }
    if (bDay) bDay.value = d;

    if (typeof checkBirthReady === 'function') checkBirthReady();
  }, u.year, u.month, u.day);

  // 성별 선택
  await page.evaluate(function(gender) {
    if (typeof pickBirthGender === 'function') pickBirthGender(gender);
  }, u.gender);
  await new Promise(function(r) { setTimeout(r, 500); });

  // 다음 단계 (goToMBTI)
  await page.evaluate(function() {
    if (typeof goToMBTI === 'function') goToMBTI();
  });
  await new Promise(function(r) { setTimeout(r, 800); });

  // MBTI 4축 선택
  for (var axis = 0; axis < 4; axis++) {
    await page.evaluate(function(side) {
      if (typeof pickMBTI === 'function') pickMBTI(side);
    }, u.mbtiSides[axis]);
    await new Promise(function(r) { setTimeout(r, 300); });

    await page.evaluate(function(intensity) {
      if (typeof pickIntensity === 'function') pickIntensity(intensity);
    }, u.intensities[axis]);
    await new Promise(function(r) { setTimeout(r, 300); });

    await page.evaluate(function() {
      if (typeof mbtiGoNext === 'function') mbtiGoNext();
    });
    await new Promise(function(r) { setTimeout(r, 500); });
  }

  // AI 분석 대기 (최대 7분)
  log('[' + u.name + '] AI 분석 대기 중... (최대 7분)');

  var sajuResult = null;
  try {
    await page.waitForFunction(function() {
      var pgRes = document.getElementById('pgRes');
      if (pgRes && pgRes.style.display !== 'none' && pgRes.innerHTML.length > 100) return true;
      if (window._lastAIResult) return true;
      return false;
    }, { timeout: TIMEOUT });

    sajuResult = await page.evaluate(function() {
      return {
        aiResult: window._lastAIResult ? (typeof window._lastAIResult === 'string' ? window._lastAIResult.substring(0, 500) : JSON.stringify(window._lastAIResult).substring(0, 500)) : null,
        saju: window._lastSaju ? JSON.stringify(window._lastSaju).substring(0, 200) : null,
        mbti: window._lastMBTI || null,
        syncLog: 'sync.js 동작 확인은 콘솔 로그 참조'
      };
    });

    log('[' + u.name + '] ✅ 사주 분석 완료! MBTI: ' + (sajuResult.mbti || '?'));
    log('[' + u.name + '] AI 풀이 미리보기: ' + (sajuResult.aiResult || '없음').substring(0, 200) + '...');
  } catch (e) {
    log('[' + u.name + '] ❌ 사주 분석 타임아웃 또는 에러: ' + e.message);
  }

  return { page: page, result: sajuResult };
}

// 5명 동시 사주 분석
async function runAllSajuSimultaneously(browser) {
  log('');
  log('========== Phase 3: 5명 동시 사주 분석 (서버 부하 테스트!) ==========');
  log('⚡ 5명이 동시에 AI 풀이를 요청합니다. 서버가 버티는지 확인!');

  var startTime = Date.now();

  var results = await Promise.all([
    runSajuForUser(browser, 0),
    runSajuForUser(browser, 1),
    runSajuForUser(browser, 2),
    runSajuForUser(browser, 3),
    runSajuForUser(browser, 4)
  ]);

  var elapsed = Math.round((Date.now() - startTime) / 1000);
  log('');
  log('⏱️ 5명 동시 사주 분석 총 소요 시간: ' + elapsed + '초');

  var successCount = 0;
  for (var i = 0; i < results.length; i++) {
    if (results[i].result) successCount++;
  }
  log('📊 성공: ' + successCount + '/5명');

  if (successCount === 5) {
    log('🎉 서버 부하 테스트 통과! 5명 동시 처리 성공!');
  } else {
    log('⚠️ 일부 실패 — 서버 동시 처리 한계 확인 필요');
  }

  return results;
}

// ══════════════════════════════════════
// Phase 4: 궁합 분석
// ══════════════════════════════════════
async function runGunghap(browser, sajuPages, pairIndex) {
  var pair = GH_PAIRS[pairIndex];
  var userA = USERS[pair.a];
  var userB = USERS[pair.b];
  var pageA = sajuPages[pair.a].page;

  var cloverA = userClovers[pair.a];
  if (cloverA < 3) {
    log('[궁합] ' + userA.name + ' 클로버 부족 (' + cloverA + ') — 스킵');
    return null;
  }

  log('');
  log('[궁합] ' + userA.name + ' × ' + userB.name + ' (' + pair.rel + ') 시작...');

  await pageA.evaluate(function() {
    if (typeof go === 'function') go('pgDash');
    if (typeof setTab === 'function') setTab(1);
  });
  await new Promise(function(r) { setTimeout(r, 1500); });

  await pageA.evaluate(function(userBData, relType) {
    if (typeof calcSajuForApp === 'function') {
      try {
        var sajuB = calcSajuForApp(userBData.year, userBData.month, userBData.day, null, null, null);
        var ggB = (typeof analyzeGyeokguk === 'function') ? analyzeGyeokguk(sajuB) : {};
        var gStr = (userBData.gender === '남성') ? '남' : '여';
        var dwB = (typeof calcDaewoon === 'function') ? calcDaewoon(sajuB, userBData.year, userBData.month, userBData.day, 12, 0, gStr) : {};

        var TY_table = (typeof TY !== 'undefined') ? TY : {};
        var ti = TY_table[userBData.mbti] || { n: '유형', cf: 'Ni-Te-Fi-Se' };
        var mbtiObjB = {
          type: userBData.mbti,
          cf: ti.cf,
          axes: [
            { side: userBData.mbti[0], pct: 65 },
            { side: userBData.mbti[1], pct: 65 },
            { side: userBData.mbti[2], pct: 65 },
            { side: userBData.mbti[3], pct: 65 }
          ]
        };

        window.ghB = {
          name: userBData.name,
          saju: sajuB,
          dw: dwB,
          gg: ggB,
          mbti: userBData.mbti,
          mbtiObj: mbtiObjB,
          gender: userBData.gender,
          ilju: (sajuB && sajuB.P) ? sajuB.P[2].s + sajuB.P[2].b : '?'
        };

        if (window._lastSaju) {
          window.ghA = {
            name: '나',
            saju: window._lastSaju,
            dw: window._lastDW,
            gg: window._lastGG,
            mbti: window._lastMBTI,
            mbtiObj: window._lastMBTIObj,
            gender: '',
            ilju: window._lastSaju.P[2].s + window._lastSaju.P[2].b
          };
        }

        window.ghRel = relType;
        return { success: true };
      } catch(e) {
        return { success: false, error: e.message };
      }
    }
    return { success: false, error: 'calcSajuForApp not found' };
  }, userB, pair.rel);

  await new Promise(function(r) { setTimeout(r, 1000); });

  await pageA.evaluate(function() {
    var ghStartBtn = document.getElementById('ghStart');
    if (ghStartBtn) {
      ghStartBtn.classList.add('ready');
      ghStartBtn.click();
    }
  });

  log('[궁합] ' + userA.name + ' × ' + userB.name + ' AI 분석 대기 중... (최대 7분)');

  try {
    await pageA.waitForFunction(function() {
      var ghRes = document.getElementById('pgGhRes');
      if (ghRes && ghRes.style.display !== 'none' && ghRes.innerHTML.length > 100) return true;
      return false;
    }, { timeout: TIMEOUT });

    var ghResult = await pageA.evaluate(function() {
      try {
        var hist = JSON.parse(localStorage.getItem('mbts_gh_history')) || [];
        if (hist.length > 0) {
          var last = hist[hist.length - 1];
          return {
            scores: last.scores,
            aiPreview: typeof last.aiResult === 'string'
              ? last.aiResult.substring(0, 500)
              : JSON.stringify(last.aiResult).substring(0, 500),
            relType: last.relType || last.relLabel
          };
        }
      } catch(e) {}
      return null;
    });

    if (ghResult) {
      log('[궁합] ✅ ' + userA.name + ' × ' + userB.name + ' 완료!');
      log('[궁합] 점수: 총합=' + (ghResult.scores ? ghResult.scores.total : '?'));
      log('[궁합] AI 풀이: ' + (ghResult.aiPreview || '').substring(0, 200) + '...');
    } else {
      log('[궁합] ⚠️ 결과 수집 실패 (페이지는 완료됐으나 localStorage 비어있음)');
    }

    return ghResult;
  } catch (e) {
    log('[궁합] ❌ ' + userA.name + ' × ' + userB.name + ' 타임아웃: ' + e.message);
    return null;
  }
}

// ══════════════════════════════════════
// Phase 5: 달토 채팅
// ══════════════════════════════════════
async function runDaltoChat(sajuPages, userIndex) {
  var u = USERS[userIndex];
  var page = sajuPages[userIndex].page;
  var clover = userClovers[userIndex];

  if (clover < 1) {
    log('[달토] ' + u.name + ' 클로버 없음 — 스킵');
    return null;
  }

  log('');
  log('[달토] ' + u.name + ' 달토 채팅 시작...');

  await page.evaluate(function() {
    if (typeof go === 'function') go('pgChat');
    if (typeof initChatPage === 'function') initChatPage();
  });
  await new Promise(function(r) { setTimeout(r, 2000); });

  var chatQuestion = u.name + '인데, 올해 나한테 가장 좋은 달이 언제야?';

  await page.evaluate(function(msg) {
    var input = document.getElementById('chatInput') || document.querySelector('.chat-input input, .chat-input textarea');
    if (input) {
      input.value = msg;
      input.dispatchEvent(new Event('input'));
    }
  }, chatQuestion);

  await page.evaluate(function() {
    var sendBtn = document.getElementById('chatSend') || document.querySelector('.chat-send, [onclick*="sendChat"]');
    if (sendBtn) sendBtn.click();
    else if (typeof sendChat === 'function') sendChat();
  });

  log('[달토] ' + u.name + ' AI 응답 대기 중...');

  try {
    await page.waitForFunction(function() {
      var messages = document.querySelectorAll('.chat-msg, .chat-bubble, [class*="chat-message"]');
      return messages.length >= 2;
    }, { timeout: 180000 });

    var chatResult = await page.evaluate(function() {
      var messages = document.querySelectorAll('.chat-msg, .chat-bubble, [class*="chat-message"]');
      var texts = [];
      for (var i = 0; i < messages.length; i++) {
        texts.push(messages[i].textContent.trim().substring(0, 300));
      }
      return texts;
    });

    log('[달토] ✅ ' + u.name + ' 채팅 완료!');
    log('[달토] 질문: ' + chatQuestion);
    log('[달토] AI 답변: ' + (chatResult.length > 1 ? chatResult[chatResult.length - 1].substring(0, 200) : '없음') + '...');

    return chatResult;
  } catch (e) {
    log('[달토] ❌ ' + u.name + ' 채팅 타임아웃: ' + e.message);
    return null;
  }
}

// ══════════════════════════════════════
// Phase 6: admin 대시보드 확인
// ══════════════════════════════════════
async function checkAdminDashboard(browser) {
  log('');
  log('========== Phase 6: admin 대시보드 확인 ==========');

  var page = await browser.newPage();

  var dashboard = await page.evaluate(async function(base, pw) {
    var authRes = await fetch(base + '/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    var authData = await authRes.json();

    var dashRes = await fetch(base + '/api/admin/dashboard', {
      headers: { 'Authorization': 'Bearer ' + authData.token }
    });
    return await dashRes.json();
  }, BASE, ADMIN_PW);

  log('📊 대시보드 결과:');
  log('  - 총 유저: ' + (dashboard.users ? dashboard.users.total : '?'));
  log('  - 사주 결과: ' + (dashboard.saju_results ? dashboard.saju_results.total : '?'));
  log('  - 궁합 결과: ' + (dashboard.gunghap_results ? dashboard.gunghap_results.total : '?'));
  log('  - 방문자 (오늘): ' + (dashboard.today ? dashboard.today.visitors : '?'));
  log('  - 에러: ' + (dashboard.errors ? dashboard.errors.total : '?'));
  log('  - 클로버 합계: ' + (dashboard.clover ? dashboard.clover.total : '?'));

  await page.close();
  return dashboard;
}

// ══════════════════════════════════════
// MAIN: 전체 실행
// ══════════════════════════════════════
(async function() {
  log('🚀 MBTS E2E 풀 테스트 시작');
  log('시작 시각: ' + new Date().toLocaleString('ko-KR'));
  log('');

  var browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 430, height: 932 }
  });

  try {
    // Phase 1: 유저 생성
    await createUsersDirectDB();

    // Phase 2: admin에서 클로버 지급
    await giveCloverFromAdmin(browser);

    // 클로버 정리 로그
    log('');
    log('📋 클로버 지급 결과:');
    for (var i = 0; i < USERS.length; i++) {
      log('  ' + USERS[i].name + ': 🍀 ' + userClovers[i] + '개');
    }

    // 클로버 기준으로 활동 결정
    var sorted = userClovers.map(function(c, idx) { return { clover: c, idx: idx }; })
      .sort(function(a, b) { return b.clover - a.clover; });

    log('');
    log('📋 활동 배분 (클로버 기준):');
    log('  궁합: ' + USERS[sorted[0].idx].name + '(' + sorted[0].clover + ') × ' + USERS[sorted[1].idx].name + '(' + sorted[1].clover + ')');
    log('  궁합: ' + USERS[sorted[2].idx].name + '(' + sorted[2].clover + ') × ' + USERS[sorted[3].idx].name + '(' + sorted[3].clover + ')');
    log('  달토: ' + USERS[sorted[4].idx].name + '(' + sorted[4].clover + ')');

    // 궁합 조합 업데이트
    GH_PAIRS[0].a = sorted[0].idx;
    GH_PAIRS[0].b = sorted[1].idx;
    GH_PAIRS[1].a = sorted[2].idx;
    GH_PAIRS[1].b = sorted[3].idx;
    var daltoIdx = sorted[4].idx;

    // Phase 3: 5명 동시 사주 (부하 테스트!)
    var sajuPages = await runAllSajuSimultaneously(browser);

    // Phase 4: 궁합 2쌍 (순차)
    log('');
    log('========== Phase 4: 궁합 분석 (순차, 7분 대기) ==========');
    await runGunghap(browser, sajuPages, 0);
    await runGunghap(browser, sajuPages, 1);

    // Phase 5: 달토 채팅
    log('');
    log('========== Phase 5: 달토 채팅 ==========');
    await runDaltoChat(sajuPages, daltoIdx);

    // Phase 6: admin 대시보드 최종 확인
    var finalDash = await checkAdminDashboard(browser);

    // 모든 페이지 닫기
    for (var p = 0; p < sajuPages.length; p++) {
      if (sajuPages[p] && sajuPages[p].page) {
        try { await sajuPages[p].page.close(); } catch(e) {}
      }
    }

  } catch (e) {
    log('');
    log('💥 치명적 에러: ' + e.message);
    log(e.stack || '');
  } finally {
    await browser.close();
  }

  // result_report.txt 저장
  log('');
  log('========================================');
  log('테스트 완료 시각: ' + new Date().toLocaleString('ko-KR'));
  log('========================================');

  var reportText = report.join('\n');
  fs.writeFileSync('result_report.txt', reportText, 'utf8');
  console.log('\n📄 result_report.txt 저장 완료!\n');
  console.log(reportText);
})();
