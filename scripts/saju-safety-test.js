/**
 * Safety Test: saju.js 비활성화 시 engine.js + gunghap.js 정상 동작 확인
 */
var puppeteer = require('puppeteer');

(async function() {
  var browser, page;
  try {
    browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    page = await browser.newPage();
    var errs = [];
    var logs = [];
    page.on('pageerror', function(e) { errs.push(e.message); });
    page.on('console', function(m) { logs.push(m.text()); });

    // saju.js 요청을 차단하여 비활성화 시뮬레이션
    await page.setRequestInterception(true);
    page.on('request', function(req) {
      if (req.url().indexOf('saju.js') >= 0) {
        console.log('  [BLOCKED] saju.js 요청 차단됨');
        req.abort();
      } else {
        req.continue();
      }
    });

    console.log('=== SAFETY TEST: saju.js 비활성화 상태 ===');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(function(r) { setTimeout(r, 2000); });

    // iframe 찾기
    var frames = page.frames();
    var af = page.mainFrame();
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].url().indexOf('index.html') >= 0) { af = frames[i]; break; }
    }

    // engine.js 함수 확인
    var engineOk = await af.evaluate(function() {
      return {
        calcSajuForApp: typeof window.calcSajuForApp === 'function',
        analyzeGyeokguk: typeof window.analyzeGyeokguk === 'function',
        calcDaewoon: typeof window.calcDaewoon === 'function',
        runSajuAnalysis: typeof window.runSajuAnalysis === 'function',
        streamSonnet: typeof window.streamSonnet === 'function'
      };
    });

    // gunghap.js 함수 확인
    var gunghapOk = await af.evaluate(function() {
      return {
        buildGunghapUserPrompt: typeof window.buildGunghapUserPrompt === 'function'
      };
    });

    // SJ_ 함수가 없는지 확인
    var sjMissing = await af.evaluate(function() {
      return typeof window.SJ_calcOsinChegye === 'undefined';
    });

    // 에러 확인
    var critErr = errs.filter(function(e) {
      return e.indexOf('engine') >= 0 || e.indexOf('gunghap') >= 0 || e.indexOf('calcSaju') >= 0 || e.indexOf('runSaju') >= 0;
    });

    // saju.js 로드 메시지 없음 확인
    var sajuLogMissing = logs.every(function(l) { return l.indexOf('[saju.js]') < 0; });

    console.log('');
    console.log('  engine.js 함수:', JSON.stringify(engineOk));
    console.log('  gunghap.js 함수:', JSON.stringify(gunghapOk));
    console.log('  SJ_ 함수 부재 확인:', sjMissing ? 'PASS' : 'FAIL');
    console.log('  saju.js 로드 안됨:', sajuLogMissing ? 'PASS' : 'FAIL');
    console.log('  engine/gunghap 관련 에러:', critErr.length === 0 ? 'NONE (PASS)' : JSON.stringify(critErr));
    console.log('  전체 페이지 에러 수:', errs.length);
    if (errs.length > 0) {
      errs.forEach(function(e) { console.log('    ERR:', e.substring(0, 150)); });
    }

    var allOk = engineOk.calcSajuForApp && engineOk.analyzeGyeokguk && engineOk.calcDaewoon &&
                engineOk.runSajuAnalysis && engineOk.streamSonnet &&
                gunghapOk.buildGunghapUserPrompt && sjMissing && sajuLogMissing && critErr.length === 0;
    console.log('');
    console.log('  === SAFETY TEST: ' + (allOk ? 'PASSED' : 'FAILED') + ' ===');

    await browser.close();
    process.exit(allOk ? 0 : 1);
  } catch(e) {
    console.error('Fatal error:', e.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
