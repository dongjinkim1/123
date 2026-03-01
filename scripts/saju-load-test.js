/**
 * saju.js 로드 확인 + 프롬프트 주입 검증 + 궁합 테스트
 * Puppeteer 기반 브라우저 테스트
 */
var puppeteer = require('puppeteer');

var SJ_EXPORTS = [
  'SJ_calcOsinChegye','SJ_extractYongshinOh','SJ_getOsinLabel',
  'SJ_detectCrossTongbyeon','SJ_calcYinYang','SJ_YUKCHIN_MAP',
  'SJ_HEALTH_OH','SJ_GAEUN','SJ_getImpactTag','SJ_buildGaeunText',
  'SJ_checkSamhyung','SJ_IMPACT_SCORE','SJ_UNSUNG_MEANING',
  'SJ_buildOsinText','SJ_buildYukchinText','SJ_buildUnsungGungwiText',
  'SJ_buildTongbyeonText','SJ_buildGongmangText','SJ_buildYinYangText',
  'SJ_findGyowoongi','SJ_buildHyungText','SJ_buildHealthText',
  'SJ_checkTuchul','SJ_getWolryulText','SJ_injectIntoPrompt',
  'SJ_enrichSajuData'
];

(async function() {
  var browser, page;
  var pass = 0, fail = 0;

  function log(ok, msg) {
    if (ok) { pass++; console.log('  PASS ' + msg); }
    else    { fail++; console.log('  FAIL ' + msg); }
  }

  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    page = await browser.newPage();

    // 콘솔 메시지 수집
    var consoleLogs = [];
    page.on('console', function(m) { consoleLogs.push(m.text()); });

    // 에러 수집
    var pageErrors = [];
    page.on('pageerror', function(e) { pageErrors.push(e.message); });

    console.log('\n=== TEST 1: 로드 확인 ===');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(function(r){ setTimeout(r, 2000); });

    // index.html이 iframe 안에서 로드되므로 iframe 컨텍스트 획득
    var frames = page.frames();
    var appFrame = null;
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].url().indexOf('index.html') >= 0) { appFrame = frames[i]; break; }
    }
    if (!appFrame) {
      // iframe 없으면 메인 프레임 사용
      appFrame = page.mainFrame();
      console.log('  INFO: iframe 없음, 메인 프레임 사용');
    } else {
      console.log('  INFO: index.html iframe 발견');
    }

    // 1-1. 콘솔에 saju.js 로드 메시지 확인
    var sajuLoaded = consoleLogs.some(function(l) { return l.indexOf('[saju.js]') >= 0; });
    log(sajuLoaded, 'saju.js 콘솔 로드 메시지 확인');

    // 1-2. 모든 SJ_ 함수/변수가 window에 존재하는지 확인
    var missingExports = await appFrame.evaluate(function(exports) {
      var missing = [];
      for (var i = 0; i < exports.length; i++) {
        if (typeof window[exports[i]] === 'undefined') missing.push(exports[i]);
      }
      return missing;
    }, SJ_EXPORTS);

    log(missingExports.length === 0, 'SJ_ exports 전체 등록 (' + (SJ_EXPORTS.length - missingExports.length) + '/' + SJ_EXPORTS.length + ')');
    if (missingExports.length > 0) console.log('    Missing:', missingExports.join(', '));

    // 1-3. runSajuAnalysis와 streamSonnet이 래핑되었는지 확인
    var wrapped = await appFrame.evaluate(function() {
      var runStr = (typeof runSajuAnalysis === 'function') ? runSajuAnalysis.toString().substring(0, 800) : '';
      var streamStr = (typeof streamSonnet === 'function') ? streamSonnet.toString().substring(0, 800) : '';
      return {
        runWrapped: runStr.indexOf('SJ_enrichSajuData') >= 0 || runStr.indexOf('_SJ_pending') >= 0,
        streamWrapped: streamStr.indexOf('_SJ_pending') >= 0 || streamStr.indexOf('SJ_injectIntoPrompt') >= 0
      };
    });
    log(wrapped.runWrapped, 'runSajuAnalysis 래핑 확인');
    log(wrapped.streamWrapped, 'streamSonnet 래핑 확인');

    // 1-4. 페이지 에러 없음 확인
    var criticalErrors = pageErrors.filter(function(e) { return e.indexOf('SJ_') >= 0 || e.indexOf('saju') >= 0; });
    log(criticalErrors.length === 0, 'saju.js 관련 페이지 에러 없음');
    if (criticalErrors.length > 0) console.log('    Errors:', criticalErrors);

    // 1-5. engine.js 핵심 함수 존재 확인
    var engineFns = await appFrame.evaluate(function() {
      return {
        calcSajuForApp: typeof window.calcSajuForApp === 'function',
        analyzeGyeokguk: typeof window.analyzeGyeokguk === 'function',
        calcDaewoon: typeof window.calcDaewoon === 'function',
        calcGongmang: typeof window.calcGongmang === 'function'
      };
    });
    log(engineFns.calcSajuForApp && engineFns.analyzeGyeokguk && engineFns.calcDaewoon && engineFns.calcGongmang,
        'engine.js 핵심 함수 4종 확인');

    console.log('\n=== TEST 2: 프롬프트 주입 검증 ===');
    var promptTest = await appFrame.evaluate(function() {
      try {
        // SJ_calcOsinChegye 테스트 (한글 오행)
        var osin = SJ_calcOsinChegye('목');
        var hasOsinKeys = osin && osin.yongsin && osin.huisin && osin.gisin && osin.gusin && osin.hansin;

        // SJ_calcYinYang 테스트 (saju.raw 형식: 숫자 인덱스)
        var fakeSaju = {
          raw: { yg: 0, yj: 0, mg: 2, mj: 2, dg: 4, dj: 4, hg: 6, hj: 6 }
        };
        var yy = SJ_calcYinYang(fakeSaju);
        var hasYinYang = yy && typeof yy.yang === 'number' && typeof yy.yin === 'number';

        // SJ_injectIntoPrompt 테스트 (v4.0 카테고리 구조)
        var fakeMsg = [
          '★오행흐름: 테스트',
          '',
          '### 신살 스토리',
          '내용',
          '### 올해 핵심 사건',
          '세운: 甲辰',
          '## 참고 힌트',
          '끝'
        ].join('\n');
        var sjData = {
          gyeokguk: {
            osinText: '【5신】테스트5신'
          },
          context: {
            yukchinText: '【육친】테스트육친',
            gongmangText: '【공망】테스트공망'
          },
          daewoon: {
            gyowoongiText: '【교운기】테스트교운기'
          },
          hints: {
            healthText: '【건강】테스트건강',
            gaeunText: '【개운】테스트개운'
          }
        };
        var result = SJ_injectIntoPrompt(fakeMsg, sjData);

        return {
          osinOk: !!hasOsinKeys,
          yinYangOk: !!hasYinYang,
          has5sin: result.indexOf('【5신】') >= 0,
          hasYukchin: result.indexOf('【육친】') >= 0,
          hasGongmang: result.indexOf('【공망】') >= 0,
          hasGyowoongi: result.indexOf('【교운기】') >= 0,
          hasHealth: result.indexOf('【건강】') >= 0,
          hasGaeun: result.indexOf('【개운】') >= 0
        };
      } catch(e) {
        return { error: e.message + ' | ' + e.stack };
      }
    });

    if (promptTest.error) {
      log(false, '프롬프트 주입 테스트 에러: ' + promptTest.error);
    } else {
      log(promptTest.osinOk, 'SJ_calcOsinChegye 정상 동작');
      log(promptTest.yinYangOk, 'SJ_calcYinYang 정상 동작');
      log(promptTest.has5sin, '주입 A: 격국 보강 — 5신');
      log(promptTest.hasYukchin, '주입 B: 해석 맥락 — 육친');
      log(promptTest.hasGongmang, '주입 B: 해석 맥락 — 공망');
      log(promptTest.hasGyowoongi, '주입 C: 대운 흐름 — 교운기');
      log(promptTest.hasHealth, '주입 D: 참고 힌트 — 건강');
      log(promptTest.hasGaeun, '주입 D: 참고 힌트 — 개운');
    }

    console.log('\n=== TEST 3: 궁합 테스트 ===');
    var gunghapTest = await appFrame.evaluate(function() {
      try {
        return {
          hasBuildPrompt: typeof window.buildGunghapUserPrompt === 'function',
          hasCrossTongbyeon: typeof window.SJ_detectCrossTongbyeon === 'function',
          hasYukchinMap: typeof window.SJ_YUKCHIN_MAP === 'object' && window.SJ_YUKCHIN_MAP !== null,
          gunghapLoaded: !!document.querySelector('script[src="gunghap.js"]')
        };
      } catch(e) {
        return { error: e.message };
      }
    });

    if (gunghapTest.error) {
      log(false, '궁합 테스트 에러: ' + gunghapTest.error);
    } else {
      log(gunghapTest.hasBuildPrompt, 'buildGunghapUserPrompt 함수 존재');
      log(gunghapTest.hasCrossTongbyeon, 'SJ_detectCrossTongbyeon 함수 존재');
      log(gunghapTest.hasYukchinMap, 'SJ_YUKCHIN_MAP 객체 존재');
      log(gunghapTest.gunghapLoaded, 'gunghap.js 스크립트 로드 확인');
    }

    console.log('\n=== 총 결과 ===');
    console.log('  PASS: ' + pass + '  FAIL: ' + fail);
    console.log('  ' + (fail === 0 ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'));

    if (pageErrors.length > 0) {
      console.log('\n=== 전체 페이지 에러 ===');
      pageErrors.forEach(function(e) { console.log('  WARN  ' + e.substring(0, 200)); });
    }

  } catch(e) {
    console.error('Fatal error:', e.message);
    fail++;
  } finally {
    if (browser) await browser.close();
    process.exit(fail > 0 ? 1 : 0);
  }
})();
