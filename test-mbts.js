/**
 * MBTS AI 품질 자동 테스트 스크립트
 *
 * 사용법:
 *   1. npm install puppeteer (아직 안 했으면)
 *   2. 서버 실행 확인: http://localhost:3000/mbts.html
 *   3. node test-mbts.js
 *
 * 예상 소요: 20명 × 약 4분 = 약 80분 (1시간 20분)
 * 예상 비용: 20명 × 약 550원 = 약 11,000원
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ========== 설정 ==========
const TOTAL_TESTS = 20;
const BASE_URL = 'http://localhost:3000/mbts.html';
const OUTPUT_DIR = path.join(__dirname, 'test-results');
const TIMEOUT_MS = 300000; // 5분 (AI 응답 대기 - 넉넉하게)
const DELAY_BETWEEN = 8000; // 테스트 간 8초 대기 (rate limit + 서버 쿨다운)

// ========== 출생지 목록 ==========
const CITIES = [
  {name:'서울',lng:126.98},{name:'부산',lng:129.08},{name:'대구',lng:128.60},
  {name:'인천',lng:126.71},{name:'광주',lng:126.85},{name:'대전',lng:127.39},
  {name:'울산',lng:129.31},{name:'수원',lng:127.01},{name:'창원',lng:128.68},
  {name:'전주',lng:127.15},{name:'제주',lng:126.53},{name:'춘천',lng:127.73},
  {name:'강릉',lng:128.90},{name:'여수',lng:127.66},{name:'경주',lng:129.21},
  {name:'모름',lng:127.50}
];

// ========== 전문용어 금지 목록 ==========
const JARGON_LIST = [
  '비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인',
  '양인살', '홍염살', '역마살', '화개살', '천을귀인', '문창귀인', '학당귀인',
  '괴강살', '백호살', '원진살', '귀문관살', '음양차착', '납음', '대해수', '천하수',
  '비겁탈재', '살인상생', '식상생재', '재관쌍미', '겁재탈재',
  '갑목', '을목', '병화', '정화', '무토', '기토', '경금', '신금', '임수', '계수',
  '지장간', '배우자궁', '직업궁', '자녀궁', '노후궁',
  '극신약', '극신강', '신약', '신강',
  '편재격', '양인격', '식신격', '정관격',
  '비겁', '재성', '관성', '인성', '식상',
  '세운', '대운간지', '겁재운', '정인운', '편관운', '정관운', '비견운', '편인운', '상관운',
  '화기', '관대', '건록', '제왕', '장생', '태', '절',
  '진술충', '축술형', '인사형', '병임충', '천간충',
  '정임합', '오미합', '인사해',
  '임술일주', '정미일주', '갑진일주', '을사일주', '병오일주'
];

// 부정어 (첫 문단 체크용)
const NEGATIVE_WORDS = ['부족', '결핍', '없어서', '마르', '증발', '약한', '위험', '고갈', '부재', '결여', '모자라'];

// MBTI 16개 유형
const MBTI_TYPES = [
  'ISTJ','ISFJ','INFJ','INTJ',
  'ISTP','ISFP','INFP','INTP',
  'ESTP','ESFP','ENFP','ENTP',
  'ESTJ','ESFJ','ENFJ','ENTJ'
];

// MBTI 유형 -> ch/it 변환
function mbtiToChIt(mbti) {
  const map = { E:'L', I:'R', S:'L', N:'R', T:'L', F:'R', J:'L', P:'R' };
  const ch = [map[mbti[0]], map[mbti[1]], map[mbti[2]], map[mbti[3]]];
  const intensities = [55, 68, 88];
  const it = ch.map(() => intensities[Math.floor(Math.random() * 3)]);
  return { ch, it };
}

// 랜덤 테스트 데이터 생성
function generateTestData(index) {
  const year = 1950 + Math.floor(Math.random() * 56); // 1950~2005
  const month = 1 + Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  const hasHour = Math.random() > 0.3; // 70%는 시간 있음
  const hour = hasHour ? Math.floor(Math.random() * 24) : null;
  const gender = Math.random() > 0.5 ? '남성' : '여성';
  const mbti = MBTI_TYPES[Math.floor(Math.random() * 16)];
  const { ch, it } = mbtiToChIt(mbti);
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];

  return {
    index: index + 1,
    year, month, day, hour, gender, mbti, ch, it,
    cityName: city.name,
    cityLng: city.lng,
    label: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} ${hasHour ? String(hour).padStart(2,'0')+'시' : '미상'} ${gender} ${mbti} ${city.name}`
  };
}

// 자동 채점
function scoreResult(data, result, isAI) {
  const scores = {
    isAI: isAI,
    sub_count: 0,
    sub_count_pass: false,
    sub_headers_ok: 0,
    sub_headers_total: 0,
    pill_count: 0,
    jargon_found: [],
    jargon_count: 0,
    blueprint_leak: false,
    profile_valid: false,
    positive_start_fail: [],
    categories_count: 0,
    overall: 'FAIL'
  };

  if (!result || !result.categories) return scores;

  scores.categories_count = result.categories.length;
  scores.blueprint_leak = !!result._blueprint;

  // profile 체크
  const prof = result.profile || {};
  const pillarsOk = Array.isArray(prof.pillars) && prof.pillars.length >= 3
    && prof.pillars.every(p => p && p.chun && p.chun !== '');
  const ohengOk = Array.isArray(prof.ohengBalance) && prof.ohengBalance.length === 5
    && prof.ohengBalance.every(o => o && typeof o.count === 'number');
  scores.profile_valid = pillarsOk && ohengOk;

  // sub 체크
  let allBodyText = '';
  const cats = result.categories || [];
  cats.forEach((cat, ci) => {
    const subs = cat.subs || cat.items || [];
    subs.forEach((sub, si) => {
      scores.sub_count++;
      scores.sub_headers_total++;

      const h = sub.h || sub.catch || sub.title || '';
      if (h && h !== 'undefined' && h.trim().length > 0) {
        scores.sub_headers_ok++;
      }

      const b = sub.b || sub.content || '';
      allBodyText += b + '\n';

      if (b.includes('\u{1F48A}')) scores.pill_count++;  // 💊

      // 긍정 시작 체크
      const firstPara = b.split(/\\n\\n|\n\n/)[0] || '';
      const negFound = NEGATIVE_WORDS.filter(w => firstPara.includes(w));
      if (negFound.length > 0) {
        scores.positive_start_fail.push(`${cat.title||cat.id}>${h}: [${negFound.join(',')}]`);
      }
    });
  });

  // 전문용어 체크
  JARGON_LIST.forEach(term => {
    const regex = new RegExp(term, 'g');
    const matches = allBodyText.match(regex);
    if (matches && matches.length > 0) {
      scores.jargon_found.push({ term, count: matches.length });
      scores.jargon_count += matches.length;
    }
  });

  scores.sub_count_pass = scores.sub_count >= (data.hour !== null ? 12 : 8);

  // 판정
  const structureOk = scores.sub_count >= 10
    && scores.sub_headers_ok >= scores.sub_count - 1
    && scores.pill_count >= scores.sub_count - 2
    && !scores.blueprint_leak
    && scores.profile_valid;

  if (structureOk && scores.jargon_count === 0 && scores.positive_start_fail.length === 0) {
    scores.overall = 'PASS';
  } else if (structureOk) {
    scores.overall = 'WARN';
  } else {
    scores.overall = 'FAIL';
  }

  return scores;
}

// 개별 결과 txt 생성
function makeResultTxt(data, result, scores, elapsed) {
  let txt = '';
  txt += `========================================\n`;
  txt += `MBTS AI 품질 테스트 #${String(data.index).padStart(2,'0')}\n`;
  txt += `========================================\n\n`;

  txt += `[테스트 정보]\n`;
  txt += `생년월일: ${data.year}년 ${data.month}월 ${data.day}일 ${data.hour !== null ? data.hour + '시' : '시간미상'}\n`;
  txt += `성별: ${data.gender}\n`;
  txt += `MBTI: ${data.mbti}\n`;
  txt += `출생지: ${data.cityName}\n`;
  txt += `소요시간: ${elapsed}초\n\n`;

  txt += `[자동 채점]\n`;
  txt += `전체 판정: ${scores.overall}\n`;
  txt += `AI 분석: ${scores.isAI ? 'O AI' : 'X 폴백'}\n`;
  txt += `카테고리: ${scores.categories_count}개\n`;
  txt += `Sub 수: ${scores.sub_count}개 ${scores.sub_count_pass ? 'O' : 'X'}\n`;
  txt += `소제목 정상: ${scores.sub_headers_ok}/${scores.sub_headers_total} ${scores.sub_headers_ok >= scores.sub_headers_total - 1 ? 'O' : 'X'}\n`;
  txt += `말풍선: ${scores.pill_count}/${scores.sub_count} ${scores.pill_count >= scores.sub_count - 2 ? 'O' : 'X'}\n`;
  txt += `전문용어: ${scores.jargon_count}개 ${scores.jargon_count === 0 ? 'O' : 'X'}\n`;
  txt += `_blueprint 유출: ${scores.blueprint_leak ? 'X 있음' : 'O 없음'}\n`;
  txt += `profile 정상: ${scores.profile_valid ? 'O' : 'X'}\n`;
  txt += `긍정시작 위반: ${scores.positive_start_fail.length}개 ${scores.positive_start_fail.length === 0 ? 'O' : '!'}\n`;

  if (scores.jargon_found.length > 0) {
    txt += `\n[발견된 전문용어]\n`;
    scores.jargon_found.forEach(j => {
      txt += `  - ${j.term} (${j.count}회)\n`;
    });
  }

  if (scores.positive_start_fail.length > 0) {
    txt += `\n[부정 시작 위반]\n`;
    scores.positive_start_fail.forEach(f => {
      txt += `  - ${f}\n`;
    });
  }

  // oneLine
  if (result && result.oneLine) {
    txt += `\n────────────────────────────────\n`;
    txt += `한줄 요약: ${result.oneLine}\n`;
  }

  // 본문 전체
  if (result && result.categories) {
    txt += `\n────────────────────────────────\n`;
    txt += `[전체 분석 결과]\n`;
    txt += `────────────────────────────────\n`;

    result.categories.forEach((cat, ci) => {
      txt += `\n${'='.repeat(40)}\n`;
      txt += `${cat.title || cat.id || ('카테고리' + (ci+1))}\n`;
      txt += `${'='.repeat(40)}\n`;

      const subs = cat.subs || cat.items || [];
      subs.forEach((sub, si) => {
        const h = sub.h || sub.catch || sub.title || '(소제목 없음)';
        const b = (sub.b || sub.content || '(내용 없음)')
          .replace(/\\n\\n/g, '\n\n')
          .replace(/\\n/g, '\n');

        txt += `\n--- ${h} ---\n\n`;
        txt += b + '\n';
      });
    });
  }

  // profile 정보
  if (result && result.profile) {
    txt += `\n────────────────────────────────\n`;
    txt += `[Profile 데이터]\n`;
    txt += `────────────────────────────────\n`;
    const prof = result.profile;
    if (prof.pillars) {
      txt += `만세력: ${prof.pillars.map(p => `${p.label}:${p.chun}${p.ji}`).join(' | ')}\n`;
    }
    if (prof.ohengBalance) {
      txt += `오행: ${prof.ohengBalance.map(o => `${o.name}=${o.count}`).join(' ')}\n`;
    }
    if (prof.specialStars) {
      txt += `신살: ${prof.specialStars.join(', ')}\n`;
    }
    if (prof.mbtiType) {
      txt += `MBTI: ${prof.mbtiType} (${prof.mbtiName})\n`;
    }
  }

  return txt;
}

// 경과 시간 포맷
function formatTime(ms) {
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const s = sec % 60;
  return min > 0 ? `${min}분 ${s}초` : `${s}초`;
}

// ========== 메인 실행 ==========
async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const totalStart = Date.now();
  console.log('');
  console.log('========================================');
  console.log('  MBTS AI 품질 자동 테스트');
  console.log('  총 ' + TOTAL_TESTS + '명 | 모델: claude-sonnet-4-6');
  console.log('========================================');
  console.log('');

  // 테스트 데이터 생성
  const testCases = [];
  for (let i = 0; i < TOTAL_TESTS; i++) {
    testCases.push(generateTestData(i));
  }

  const dataPreview = testCases.map(d => `#${String(d.index).padStart(2,'0')} ${d.label}`).join('\n');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'test-data.txt'), dataPreview);
  console.log('테스트 대상:');
  testCases.forEach(d => console.log(`  ${d.label}`));
  console.log('');
  console.log(`예상 소요: 약 ${TOTAL_TESTS * 4}분 (${TOTAL_TESTS}명 x ~4분)`);
  console.log('커피 한 잔 하고 오세요!\n');

  // 브라우저 실행
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 60000,
    protocolTimeout: 360000  // 6분 (AI 응답 대기용)
  });

  const allScores = [];
  const jargonTotal = {};
  let passCount = 0, warnCount = 0, failCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const data = testCases[i];
    const remaining = TOTAL_TESTS - i;
    console.log(`\n----------------------------------------`);
    console.log(`[${i+1}/${TOTAL_TESTS}] ${data.label}`);
    console.log(`남은 예상: ~${remaining * 4}분`);
    console.log(`----------------------------------------`);

    const startTime = Date.now();
    let result = null;
    let isAI = false;
    let error = null;
    let page = null;

    try {
      page = await browser.newPage();
      page.setDefaultTimeout(TIMEOUT_MS);
      page.setDefaultNavigationTimeout(60000);

      // 콘솔 로그 포워딩
      page.on('console', msg => {
        const txt = msg.text();
        if (txt.includes('분석 완료') || txt.includes('저장 완료') || txt.includes('overloaded') || txt.includes('재시도')) {
          console.log(`  >> ${txt.substring(0, 120)}`);
        }
      });

      console.log('  페이지 로딩...');
      await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(() => typeof window.calcSajuForApp === 'function', { timeout: 15000 });
      console.log('  페이지 준비 완료');

      console.log('  AI 분석 시작... (3~5분 소요)');

      const analysisResult = await page.evaluate(async (d) => {
        return new Promise(async (resolve) => {
          try {
            ST.y = String(d.year);
            ST.m = String(d.month);
            ST.d = String(d.day);
            ST.h = d.hour !== null ? String(d.hour) : '';
            ST.min = '';
            ST.gender = d.gender;
            ST.city = d.cityName;
            ST.cityLng = d.cityLng;
            ST.ch = d.ch;
            ST.it = d.it;
            ST.cur = 3;

            goPage('load');
            await startAnalysis();

            var saved = localStorage.getItem('mbts_lastResult');
            if (saved) {
              var parsed = JSON.parse(saved);
              resolve({ result: parsed.aiResult, isAI: parsed.isAI, error: null });
            } else {
              resolve({ result: window._lastAIResult || null, isAI: window._lastIsAI || false, error: 'localStorage 없음' });
            }
          } catch (e) {
            resolve({ result: null, isAI: false, error: e.message });
          }
        });
      }, data);

      result = analysisResult.result;
      isAI = analysisResult.isAI;
      error = analysisResult.error;

    } catch (e) {
      error = e.message;
      console.log(`  에러: ${error.substring(0, 100)}`);
    } finally {
      if (page) { try { await page.close(); } catch(e) {} }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    // 채점
    const scores = scoreResult(data, result, isAI);
    scores.error = error;
    scores.elapsed = elapsed;
    allScores.push({ data, scores });

    scores.jargon_found.forEach(j => {
      jargonTotal[j.term] = (jargonTotal[j.term] || 0) + j.count;
    });

    if (scores.overall === 'PASS') passCount++;
    else if (scores.overall === 'WARN') warnCount++;
    else failCount++;

    // 개별 txt 저장
    const txt = makeResultTxt(data, result, scores, elapsed);
    const fname = `test-${String(i + 1).padStart(2, '0')}.txt`;
    fs.writeFileSync(path.join(OUTPUT_DIR, fname), txt, 'utf-8');

    const emoji = scores.overall === 'PASS' ? 'PASS' : scores.overall === 'WARN' ? 'WARN' : 'FAIL';
    console.log(`  결과: ${emoji} | sub:${scores.sub_count} pill:${scores.pill_count} jargon:${scores.jargon_count} | ${elapsed}초`);
    console.log(`  저장: ${fname}`);
    console.log(`  현재 집계: PASS=${passCount} WARN=${warnCount} FAIL=${failCount} / ${i+1}명`);

    if (i < testCases.length - 1) {
      console.log(`  ${DELAY_BETWEEN/1000}초 쿨다운...`);
      await new Promise(r => setTimeout(r, DELAY_BETWEEN));
    }
  }

  await browser.close();
  const totalElapsed = Date.now() - totalStart;

  // ========== 요약 리포트 ==========
  let summary = '';
  summary += `========================================\n`;
  summary += `MBTS AI 품질 테스트 요약 리포트\n`;
  summary += `========================================\n\n`;
  summary += `테스트 일시: ${new Date().toLocaleString('ko-KR')}\n`;
  summary += `총 테스트: ${TOTAL_TESTS}명\n`;
  summary += `모델: claude-sonnet-4-6\n`;
  summary += `총 소요시간: ${formatTime(totalElapsed)}\n\n`;

  summary += `=== 전체 판정 ===\n`;
  summary += `PASS: ${passCount}/${TOTAL_TESTS} (${(passCount/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `WARN: ${warnCount}/${TOTAL_TESTS} (${(warnCount/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `FAIL: ${failCount}/${TOTAL_TESTS} (${(failCount/TOTAL_TESTS*100).toFixed(0)}%)\n\n`;

  const subCountPass = allScores.filter(s => s.scores.sub_count >= 10).length;
  const headerPass = allScores.filter(s => s.scores.sub_headers_ok >= s.scores.sub_headers_total - 1).length;
  const pillPass = allScores.filter(s => s.scores.pill_count >= s.scores.sub_count - 2).length;
  const pillPerfect = allScores.filter(s => s.scores.pill_count >= s.scores.sub_count).length;
  const jargonZero = allScores.filter(s => s.scores.jargon_count === 0).length;
  const jargonUnder5 = allScores.filter(s => s.scores.jargon_count < 5).length;
  const bpPass = allScores.filter(s => !s.scores.blueprint_leak).length;
  const profPass = allScores.filter(s => s.scores.profile_valid).length;
  const posPass = allScores.filter(s => s.scores.positive_start_fail.length === 0).length;
  const aiPass = allScores.filter(s => s.scores.isAI).length;

  summary += `=== 항목별 통과율 ===\n`;
  summary += `AI 분석 성공:    ${aiPass}/${TOTAL_TESTS} (${(aiPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `Sub 10개 이상:   ${subCountPass}/${TOTAL_TESTS} (${(subCountPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `소제목 정상:     ${headerPass}/${TOTAL_TESTS} (${(headerPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `말풍선 거의있음: ${pillPass}/${TOTAL_TESTS} (${(pillPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `말풍선 전부있음: ${pillPerfect}/${TOTAL_TESTS} (${(pillPerfect/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `전문용어 0개:    ${jargonZero}/${TOTAL_TESTS} (${(jargonZero/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `전문용어 5미만:  ${jargonUnder5}/${TOTAL_TESTS} (${(jargonUnder5/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `_blueprint 없음: ${bpPass}/${TOTAL_TESTS} (${(bpPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `profile 정상:    ${profPass}/${TOTAL_TESTS} (${(profPass/TOTAL_TESTS*100).toFixed(0)}%)\n`;
  summary += `긍정 시작:       ${posPass}/${TOTAL_TESTS} (${(posPass/TOTAL_TESTS*100).toFixed(0)}%)\n\n`;

  const sortedJargon = Object.entries(jargonTotal).sort((a, b) => b[1] - a[1]);
  if (sortedJargon.length > 0) {
    summary += `=== 가장 많이 노출된 전문용어 TOP 20 ===\n`;
    sortedJargon.slice(0, 20).forEach(([term, count], idx) => {
      summary += `${String(idx + 1).padStart(2, ' ')}. ${term} (${count}회)\n`;
    });
    summary += `\n`;
  }

  const avgSub = (allScores.reduce((s, x) => s + x.scores.sub_count, 0) / TOTAL_TESTS).toFixed(1);
  const avgPill = (allScores.reduce((s, x) => s + x.scores.pill_count, 0) / TOTAL_TESTS).toFixed(1);
  const avgJargon = (allScores.reduce((s, x) => s + x.scores.jargon_count, 0) / TOTAL_TESTS).toFixed(1);
  const avgTime = (allScores.reduce((s, x) => s + parseFloat(x.scores.elapsed), 0) / TOTAL_TESTS).toFixed(0);

  summary += `=== 평균 통계 ===\n`;
  summary += `평균 Sub 수: ${avgSub}개\n`;
  summary += `평균 말풍선: ${avgPill}개\n`;
  summary += `평균 전문용어: ${avgJargon}개\n`;
  summary += `평균 소요시간: ${avgTime}초\n\n`;

  summary += `=== 개별 결과 ===\n`;
  allScores.forEach((s, i) => {
    const d = s.data;
    const sc = s.scores;
    summary += `#${String(i + 1).padStart(2, '0')} ${d.label}`;
    summary += ` | ${sc.overall}`;
    summary += ` | sub:${sc.sub_count} pill:${sc.pill_count} jargon:${sc.jargon_count}`;
    summary += ` | ${sc.elapsed}s`;
    if (sc.error) summary += ` | ERR`;
    summary += `\n`;
  });

  const fails = allScores.filter(s => s.scores.overall === 'FAIL');
  if (fails.length > 0) {
    summary += `\n=== FAIL 케이스 상세 ===\n`;
    fails.forEach(s => {
      summary += `\n#${String(s.data.index).padStart(2, '0')} ${s.data.label}\n`;
      summary += `  sub: ${s.scores.sub_count}개, pill: ${s.scores.pill_count}개\n`;
      summary += `  AI: ${s.scores.isAI}, profile: ${s.scores.profile_valid}, blueprint: ${s.scores.blueprint_leak}\n`;
      if (s.scores.error) summary += `  에러: ${s.scores.error.substring(0, 100)}\n`;
      if (s.scores.jargon_found.length > 0) {
        summary += `  전문용어: ${s.scores.jargon_found.map(j => `${j.term}(${j.count})`).join(', ')}\n`;
      }
    });
  }

  const warns = allScores.filter(s => s.scores.overall === 'WARN');
  if (warns.length > 0) {
    summary += `\n=== WARN 케이스 요약 ===\n`;
    warns.forEach(s => {
      summary += `#${String(s.data.index).padStart(2, '0')} ${s.data.label}`;
      if (s.scores.jargon_count > 0) summary += ` | 전문용어 ${s.scores.jargon_count}개`;
      if (s.scores.positive_start_fail.length > 0) summary += ` | 부정시작 ${s.scores.positive_start_fail.length}곳`;
      summary += `\n`;
    });
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'summary.txt'), summary, 'utf-8');

  console.log('');
  console.log('========================================');
  console.log('  테스트 완료!');
  console.log('========================================');
  console.log(`\n총 소요: ${formatTime(totalElapsed)}`);
  console.log(`\nPASS: ${passCount}  WARN: ${warnCount}  FAIL: ${failCount}`);
  console.log(`\n결과 폴더: test-results/`);
  console.log(`  summary.txt     <- Claude한테 이것만 보내세요!`);
  console.log(`  test-01~20.txt  <- 궁금한 것만 골라서 보내세요`);
  console.log('');
}

main().catch(e => {
  console.error('\n치명적 에러:', e.message);
  console.error('\n확인사항:');
  console.error('  1. 서버 실행 중? -> node server.js');
  console.error('  2. puppeteer 설치? -> npm install puppeteer');
  console.error('  3. http://localhost:3000/mbts.html 접속 되나요?');
  process.exit(1);
});
