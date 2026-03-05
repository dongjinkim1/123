#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

// ── .env.local 로드 ──
var envPath = path.join(__dirname, '..', '.env.local');
try {
  fs.readFileSync(envPath, 'utf8').replace(/\r/g, '').split('\n').forEach(function(line) {
    line = line.trim();
    if (!line || line.charAt(0) === '#') return;
    var idx = line.indexOf('=');
    if (idx > 0) {
      var key = line.substring(0, idx).trim();
      var val = line.substring(idx + 1).trim();
      process.env[key] = val;
    }
  });
} catch(e) { console.error('.env.local 로드 실패'); process.exit(1); }

// ── 브라우저 목 ──
global.window = global;
global.document = {
  getElementById: function() { return { value:'',style:{},parentElement:{parentElement:null},innerHTML:'',parentNode:{insertBefore:function(){}},textContent:'',addEventListener:function(){},classList:{add:function(){},remove:function(){}} }; },
  createElement: function() { return { style:{},innerHTML:'',appendChild:function(){},setAttribute:function(){},classList:{add:function(){},remove:function(){}} }; },
  querySelectorAll: function() { return []; },
  querySelector: function() { return null; },
  body: { appendChild:function(){},style:{} },
  head: { appendChild:function(){} },
  addEventListener: function() {}
};
global.localStorage = { getItem:function(){return null;}, setItem:function(){}, removeItem:function(){} };
global.sessionStorage = global.localStorage;
global.alert = function(){};
global.confirm = function(){return true;};
global.prompt = function(){return '';};
try { Object.defineProperty(global, 'navigator', { value: { userAgent:'node', language:'ko' }, writable:true, configurable:true }); } catch(e) {}
try { Object.defineProperty(global, 'location', { value: { href:'', search:'', hash:'', pathname:'/' }, writable:true, configurable:true }); } catch(e) {}
global.history = { pushState:function(){}, replaceState:function(){} };
global.XMLHttpRequest = function(){this.open=function(){};this.send=function(){};this.setRequestHeader=function(){};};
global.Image = function(){};
global.Audio = function(){this.play=function(){};};
global.Event = function(){};
global.CustomEvent = function(){};
global.MutationObserver = function(){this.observe=function(){};this.disconnect=function(){};};
global.IntersectionObserver = function(){this.observe=function(){};};
global.ResizeObserver = function(){this.observe=function(){};};
global.matchMedia = function(){return {matches:false,addEventListener:function(){}};};
global.getComputedStyle = function(){return {};};
global.requestAnimationFrame = function(cb){return setTimeout(cb,0);};
// fetch, Headers, Request, Response, AbortController는 Node 24 내장 사용
global.goPage = function(){};
global.renderResult = function(){};
global.initGHPage = function(){};
global.switchHomeTab = function(){};
global.startGunghap = function(){};
global.checkGHReady = function(){};
global.renderGunghapResult = function(){};
global.getApiKey = function(){return 'test';};
global.promptApiKey = function(){return 'test';};
global.streamSonnet = function(){return '';};
global.shareResult = function(){};

// ── JS 파일 로드 ──
var ROOT = path.join(__dirname, '..');

var _geval = (0, eval); // indirect eval → global scope

try { _geval(fs.readFileSync(path.join(ROOT,'public','engine.js'),'utf8')); console.log('[✓] engine.js'); }
catch(e) { console.error('[✗] engine.js:', e.message); process.exit(1); }

try { _geval(fs.readFileSync(path.join(ROOT,'public','saju.js'),'utf8')); console.log('[✓] saju.js'); }
catch(e) { console.warn('[!] saju.js:', e.message); }

var ghCode = fs.readFileSync(path.join(ROOT,'public','gunghap.js'),'utf8');
ghCode = ghCode.replace(/\}\)\(\);[\s]*$/, 'window._GH_REL_CONFIG = GH_REL_CONFIG;\n})();\n');
try { _geval(ghCode); console.log('[✓] gunghap.js'); }
catch(e) { console.error('[✗] gunghap.js:', e.message); process.exit(1); }

// ── 테스트 함수 ──
async function runTest(testName, relType, personA, personB) {
  console.log('\n════════════════════════════════════════');
  console.log('테스트: ' + testName);
  console.log('════════════════════════════════════════');

  var sajuA = calcSajuForApp(personA.y, personA.m, personA.d, personA.h||null, personA.min||null, null);
  var ggA = analyzeGyeokguk(sajuA);
  var gA = personA.gender === '남성' ? '남' : '여';
  var dwA = calcDaewoon(sajuA, personA.y, personA.m, personA.d, personA.h||12, personA.min||0, gA);

  var sajuB = calcSajuForApp(personB.y, personB.m, personB.d, personB.h||null, personB.min||null, null);
  var ggB = analyzeGyeokguk(sajuB);
  var gB = personB.gender === '남성' ? '남' : '여';
  var dwB = calcDaewoon(sajuB, personB.y, personB.m, personB.d, personB.h||12, personB.min||0, gB);

  var tiA = TY[personA.mbti] || {n:'',cf:'Fi-Ne-Si-Te'};
  var mbtiA = { type:personA.mbti, cf:tiA.cf, axes:[{side:personA.mbti[0],pct:60},{side:personA.mbti[1],pct:60},{side:personA.mbti[2],pct:60},{side:personA.mbti[3],pct:60}], profile:'' };

  var tiB = TY[personB.mbti] || {n:'',cf:'Ti-Ne-Si-Fe'};
  var mbtiB = { type:personB.mbti, cf:tiB.cf, axes:[{side:personB.mbti[0],pct:60},{side:personB.mbti[1],pct:60},{side:personB.mbti[2],pct:60},{side:personB.mbti[3],pct:60}], profile:'' };

  global.GH_REL = relType;
  var ghR = analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);

  var w = GH_CATEGORIES[relType].scoreWeights;
  ghR.scores.total = Math.round(ghR.scores.love*w.love + ghR.scores.comm*w.comm + ghR.scores.values*w.values + ghR.scores.work*w.work);

  var cat = GH_CATEGORIES[relType];

  var up = buildGunghapUserPrompt(ghR, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);

  // 카테고리 정보 추가 (startGunghap과 동일)
  var ghCfg = global._GH_REL_CONFIG ? global._GH_REL_CONFIG[relType] : null;
  up += '\n### 관계: ' + cat.label + '\n';
  if (ghCfg && ghCfg.categories && ghCfg.categories[0] && ghCfg.categories[0].subs) {
    up += '부제: ' + (ghCfg.subtitle || '') + '\n\n';
    var sc = 0;
    ghCfg.categories.forEach(function(gc) {
      up += '【' + gc.name + '】\n';
      gc.subs.forEach(function(s) {
        sc++;
        up += sc + '. ' + s.h + ' (톤: ' + s.tone + ')\n';
      });
      up += '\n';
    });
  } else {
    up += '카테고리:\n';
    cat.categories.forEach(function(c, i) { up += (i+1) + '. ' + c + '\n'; });
    up += '\n톤: ' + cat.tone + '\n';
  }

  var sp = getGHSystemPrompt(relType);

  var finalSP = sp +
    '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
    'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
    'Rules:\n' +
    '1. First character of your response MUST be {\n' +
    '2. Last character MUST be }\n' +
    '3. ZERO text before { or after }\n' +
    '4. NO markdown (```), NO comments, NO apologies, NO preamble\n' +
    '5. All string values must use proper JSON escaping (\\n for newlines, \\\\ for backslash, \\" for quotes)\n' +
    '6. Violation = system crash. Comply exactly.';

  console.log('시스템 프롬프트: ' + sp.length + '자');
  console.log('유저 프롬프트: ' + up.length + '자');
  console.log('점수: ' + JSON.stringify(ghR.scores));
  console.log('\nAPI 호출 중... (1~2분 소요)');

  var Anthropic;
  try {
    var mod = require('@anthropic-ai/sdk');
    Anthropic = mod.default || mod;
  } catch(e) {
    var mod2 = await import('@anthropic-ai/sdk');
    Anthropic = mod2.default;
  }

  var client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, dangerouslyAllowBrowser: true });
  var startTime = Date.now();

  var response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    temperature: 0.8,
    system: finalSP,
    messages: [{ role: 'user', content: up }],
  });

  var elapsed = Math.round((Date.now() - startTime) / 1000);
  var text = response.content[0].text;
  console.log('응답 완료 (' + elapsed + '초, ' + text.length + '자)');

  var parsed = null;
  try {
    parsed = JSON.parse(text);
    console.log('JSON 파싱 ✅');
  } catch(e) {
    var fb = text.indexOf('{'), lb = text.lastIndexOf('}');
    if (fb >= 0 && lb > fb) {
      try { parsed = JSON.parse(text.substring(fb, lb+1)); console.log('JSON 파싱 ✅ (추출)'); }
      catch(e2) { console.log('JSON 파싱 ❌'); }
    }
  }

  if (parsed && parsed.categories) {
    var totalItems = 0;
    parsed.categories.forEach(function(c) { totalItems += (c.items||[]).length; });
    console.log('카테고리: ' + parsed.categories.length + '개, 소주제: ' + totalItems + '개' + (totalItems >= 14 ? ' ✅' : ' ⚠️ (14개 미만)'));
  }

  return {
    testName: testName, relType: relType, scores: ghR.scores,
    elapsed: elapsed, spLen: sp.length, upLen: up.length, resLen: text.length,
    raw: text, parsed: parsed, userPrompt: up, systemPrompt: sp
  };
}

// ── 메인 ──
(async function() {
  try {
    var r1 = await runTest(
      '썸: A_남(1993.5.26 INFP) × B_여(1988.5.7 INTP)',
      'ssom',
      { y:1993, m:5, d:26, gender:'남성', mbti:'INFP' },
      { y:1988, m:5, d:7, gender:'여성', mbti:'INTP' }
    );

    var r2 = await runTest(
      '동료: A_남(1993.5.26 INFP) × C_남(1995.11.3 ENTJ)',
      'colleague',
      { y:1993, m:5, d:26, gender:'남성', mbti:'INFP' },
      { y:1995, m:11, d:3, gender:'남성', mbti:'ENTJ' }
    );

    // ── 결과 저장 ──
    var out = '';
    out += '══════════════════════════════════════════════════════════\n';
    out += '궁합 v3.1 테스트 결과\n';
    out += '테스트 시간: ' + new Date().toLocaleString('ko-KR') + '\n';
    out += '══════════════════════════════════════════════════════════\n\n';

    [r1, r2].forEach(function(r, idx) {
      out += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      out += '테스트 ' + (idx+1) + ': ' + r.testName + '\n';
      out += '관계: ' + r.relType + '\n';
      out += '점수: total=' + r.scores.total + ' love=' + r.scores.love + ' comm=' + r.scores.comm + ' values=' + r.scores.values + ' work=' + r.scores.work + '\n';
      out += '응답 시간: ' + r.elapsed + '초\n';
      out += '프롬프트: 시스템 ' + r.spLen + '자 / 유저 ' + r.upLen + '자\n';
      out += '응답 길이: ' + r.resLen + '자\n';
      out += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

      if (r.parsed) {
        out += '제목: ' + (r.parsed.title || 'N/A') + '\n';
        out += '인용: ' + (r.parsed.quote || 'N/A') + '\n\n';

        if (r.parsed.categories) {
          r.parsed.categories.forEach(function(c, ci) {
            out += '━━ ' + (c.icon||'') + ' ' + (c.title || 'Category '+(ci+1)) + ' ━━\n\n';
            if (c.items) {
              c.items.forEach(function(item, ii) {
                out += '  ▸ ' + (item.catch || '') + '\n';
                out += '    ' + (item.content || '').replace(/\\n\\n/g, '\n\n    ').replace(/\\n/g, '\n    ') + '\n';
                if (item.insightText) {
                  out += '    💡 ' + item.insightText + '\n';
                }
                out += '\n';
              });
            }
            out += '\n';
          });
        }
      } else {
        out += '--- RAW RESPONSE (파싱 실패) ---\n';
        out += r.raw;
        out += '\n--- END ---\n';
      }

      out += '\n\n';
    });

    // 프롬프트도 별도 저장
    out += '══════════════════════════════════════════════════════════\n';
    out += '부록: 유저 프롬프트\n';
    out += '══════════════════════════════════════════════════════════\n\n';

    [r1, r2].forEach(function(r, idx) {
      out += '--- 테스트 ' + (idx+1) + ' 유저 프롬프트 ---\n';
      out += r.userPrompt;
      out += '\n--- END ---\n\n';
    });

    var outPath = path.join(ROOT, 'gunghap-test-results.txt');
    fs.writeFileSync(outPath, out, 'utf8');
    console.log('\n\n✅ 결과 저장 완료: ' + outPath);

  } catch(e) {
    console.error('\n테스트 실패:', e);
    process.exit(1);
  }
})();
