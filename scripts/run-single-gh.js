#!/usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');

var relType = process.argv[2];
if (!relType) { console.error('Usage: node run-single-gh.js <relType>'); process.exit(1); }

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
var _geval = (0, eval);

try { _geval(fs.readFileSync(path.join(ROOT,'public','engine.js'),'utf8')); console.log('[ok] engine.js'); }
catch(e) { console.error('[fail] engine.js:', e.message); process.exit(1); }

try { _geval(fs.readFileSync(path.join(ROOT,'public','saju.js'),'utf8')); console.log('[ok] saju.js'); }
catch(e) { console.warn('[warn] saju.js:', e.message); }

var ghCode = fs.readFileSync(path.join(ROOT,'public','gunghap.js'),'utf8');
ghCode = ghCode.replace(/\}\)\(\);[\s]*$/, 'window._GH_REL_CONFIG = GH_REL_CONFIG;\n})();\n');
try { _geval(ghCode); console.log('[ok] gunghap.js'); }
catch(e) { console.error('[fail] gunghap.js:', e.message); process.exit(1); }

// ── 테스트 인물 (test_info.txt 기준) ──
var personA = { y:1989, m:12, d:12, h:14, min:21, gender:'남성', mbti:'ENTJ' };
var personB = { y:1992, m:12, d:16, h:18, min:25, gender:'여성', mbti:'ENTP' };

var REL_LABELS = { ssom:'썸', lover:'연인', friend:'친구', colleague:'동료', family:'가족' };

async function runSingleTest(relType, attempt) {
  attempt = attempt || 1;
  console.log('\n========================================');
  console.log('관계: ' + REL_LABELS[relType] + ' (' + relType + ') — 시도 ' + attempt + '/3');
  console.log('A_남: 1989.12.12 14:21 ENTJ');
  console.log('B_여: 1992.12.16 18:25 ENTP');
  console.log('========================================');

  var sajuA = calcSajuForApp(personA.y, personA.m, personA.d, personA.h, personA.min, null);
  var ggA = analyzeGyeokguk(sajuA);
  var dwA = calcDaewoon(sajuA, personA.y, personA.m, personA.d, personA.h, personA.min, '남');

  var sajuB = calcSajuForApp(personB.y, personB.m, personB.d, personB.h, personB.min, null);
  var ggB = analyzeGyeokguk(sajuB);
  var dwB = calcDaewoon(sajuB, personB.y, personB.m, personB.d, personB.h, personB.min, '여');

  var tiA = TY[personA.mbti] || {n:'',cf:'Te-Ni-Se-Fi'};
  var mbtiA = { type:personA.mbti, cf:tiA.cf, axes:[{side:'E',pct:60},{side:'N',pct:60},{side:'T',pct:60},{side:'J',pct:60}], profile:'' };

  var tiB = TY[personB.mbti] || {n:'',cf:'Ne-Ti-Fe-Si'};
  var mbtiB = { type:personB.mbti, cf:tiB.cf, axes:[{side:'E',pct:60},{side:'N',pct:60},{side:'T',pct:60},{side:'P',pct:60}], profile:'' };

  global.GH_REL = relType;
  var ghR = analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);

  var w = GH_CATEGORIES[relType].scoreWeights;
  ghR.scores.total = Math.round(ghR.scores.love*w.love + ghR.scores.comm*w.comm + ghR.scores.values*w.values + ghR.scores.work*w.work);

  var cat = GH_CATEGORIES[relType];
  var up = buildGunghapUserPrompt(ghR, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);

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

  // JSON 파싱
  var parsed = null;
  try {
    parsed = JSON.parse(text);
    console.log('JSON 파싱 OK');
  } catch(e) {
    var fb = text.indexOf('{'), lb = text.lastIndexOf('}');
    if (fb >= 0 && lb > fb) {
      try { parsed = JSON.parse(text.substring(fb, lb+1)); console.log('JSON 파싱 OK (추출)'); }
      catch(e2) { console.log('JSON 파싱 실패'); }
    }
  }

  var totalItems = 0;
  if (parsed && parsed.categories) {
    parsed.categories.forEach(function(c) { totalItems += (c.items||[]).length; });
    console.log('카테고리: ' + parsed.categories.length + '개, 소주제: ' + totalItems + '개' + (totalItems >= 14 ? ' OK' : ' WARNING(<14)'));
  }

  // ── 결과 파일 저장 ──
  var out = '';
  out += '═══ 궁합 테스트 결과: ' + REL_LABELS[relType] + ' (' + relType + ') ═══\n';
  out += '생성 시각: ' + new Date().toLocaleString('ko-KR') + '\n';
  out += 'A_남: 1989.12.12 14시21분, ENTJ\n';
  out += 'B_여: 1992.12.16 18시25분, ENTP\n';
  out += '점수: total=' + ghR.scores.total + ' love=' + ghR.scores.love + ' comm=' + ghR.scores.comm + ' values=' + ghR.scores.values + ' work=' + ghR.scores.work + '\n';
  out += '응답 시간: ' + elapsed + '초 / 응답 길이: ' + text.length + '자\n';
  out += '시스템 프롬프트: ' + sp.length + '자 / 유저 프롬프트: ' + up.length + '자\n';
  out += '카테고리: ' + (parsed ? parsed.categories.length : 0) + '개, 소주제: ' + totalItems + '개\n';
  out += '\n';

  if (parsed) {
    out += '제목: ' + (parsed.title || 'N/A') + '\n';
    out += '인용: ' + (parsed.quote || 'N/A') + '\n\n';

    if (parsed.categories) {
      parsed.categories.forEach(function(c, ci) {
        out += '━━ ' + (c.icon||'') + ' ' + (c.title || 'Category '+(ci+1)) + ' ━━\n\n';
        if (c.items) {
          c.items.forEach(function(item, ii) {
            out += '  [' + (ii+1) + '] ' + (item.catch || '') + '\n';
            if (item.desc) out += '      desc: ' + item.desc + '\n';
            if (item.basis) out += '      basis: ' + item.basis + '\n';
            out += '      content: ' + (item.content || '').substring(0, 200) + (item.content && item.content.length > 200 ? '...' : '') + '\n';
            if (item.insightText) {
              out += '      insight: ' + item.insightText + '\n';
            }
            out += '\n';
          });
        }
        out += '\n';
      });
    }
  } else {
    out += '--- RAW RESPONSE (파싱 실패) ---\n';
    out += text;
    out += '\n--- END ---\n';
  }

  out += '\n══════════════════════════════════════\n';
  out += '유저 프롬프트 (전문)\n';
  out += '══════════════════════════════════════\n';
  out += up;
  out += '\n\n══════════════════════════════════════\n';
  out += 'RAW JSON 응답 (전문)\n';
  out += '══════════════════════════════════════\n';
  out += text;
  out += '\n';

  var outPath = path.join(ROOT, 'after_' + relType + '.txt');
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('\n결과 저장: ' + outPath + ' (' + out.length + '자)');

  return { success: true, relType: relType, totalItems: totalItems, elapsed: elapsed, fileSize: out.length };
}

// ── 메인 (재시도 포함) ──
(async function() {
  var maxRetries = 3;
  for (var attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      var result = await runSingleTest(relType, attempt);
      console.log('\n===== 완료: ' + relType + ' =====');
      process.exit(0);
    } catch(e) {
      console.error('\n시도 ' + attempt + ' 실패:', e.message || e);
      if (attempt < maxRetries) {
        console.log('30초 후 재시도...');
        await new Promise(function(r) { setTimeout(r, 30000); });
      } else {
        console.error('3번 실패 — 에러 로그 저장');
        var errLog = '═══ 에러 로그: ' + relType + ' ═══\n';
        errLog += '시각: ' + new Date().toLocaleString('ko-KR') + '\n';
        errLog += '에러: ' + (e.message || String(e)) + '\n';
        errLog += '스택: ' + (e.stack || 'N/A') + '\n';
        fs.writeFileSync(path.join(ROOT, 'after_' + relType + '.txt'), errLog, 'utf8');
        process.exit(1);
      }
    }
  }
})();
