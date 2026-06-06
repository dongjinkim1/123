'use strict';
var path = require('path');
var nodefs = require('fs');
var core = require('../../lib/saju-core');
var analysis = require('../../lib/saju-analysis');
var fs = require('../../lib/feature-strength');
var SJ = require('../../lib/saju-theory-server');   // 실행 데이터(①). module.exports.
var sdata = require('../../lib/saju-data');          // OH_SANG / OH_GEUK / JIJI_KR
// ⚠ public/saju-theory.js 는 IIFE+window → require 절대 금지. (②는 readFileSync 텍스트로만)
function need(c, m){ if(!c) throw new Error('[PREFLIGHT FAIL] ' + m); }
// ── 1) 핵심 엔진 export ──
need(typeof core.calcSajuForApp === 'function', 'core.calcSajuForApp 없음');
need(typeof analysis.analyzeGyeokguk === 'function', 'analysis.analyzeGyeokguk 없음');
['calcSipseongStrength','calcSinsalStrength','calcRelationStrength','extractTopFeatures'].forEach(function(f){
  need(typeof fs[f] === 'function', 'fs.' + f + ' 없음');
});
need(fs.STRENGTH_WEIGHTS && fs.STRENGTH_WEIGHTS.position, 'fs.STRENGTH_WEIGHTS.position 없음');
// ── 2) saju-theory-server export (① 실행 데이터 + gilhyung 체인 + 형 소스) ──
['SJ_buildFullContext','SJ_IMPACT_SCORE','SJ_calcOsinChegye','SJ_getOsinLabel','SJ_extractYongshinOh',
 'SJ_detectTongbyeon','SJ_checkSamhyung','SJ_checkTuchul'].forEach(function(f){
  need(SJ[f] !== undefined, 'SJ.' + f + ' 없음(export 확인)');
});
// ── 3) 인벤토리 블록 빌더 (전부 export — 드리프트 가드). HapChung/Pagyeok 미export → 제외 ──
var BLOCK_BUILDERS = ['SJ_buildYinYangText','SJ_buildStrengthText','SJ_buildTongbyeonText','SJ_buildOsinText',
  'SJ_buildGaeunText','SJ_buildYukchinText','SJ_buildUnsungGungwiText','SJ_buildGongmangText','SJ_buildHealthText',
  'SJ_buildJobText','SJ_buildWonkukRelations','SJ_buildHyungText','SJ_checkTuchul','SJ_getWolryulText',
  'SJ_analyzeSpecialSals','SJ_findGyowoongi','SJ_findLoveTiming','SJ_findMoneyTiming','SJ_findHapTrigger',
  'SJ_buildMonthlyHighlight','SJ_buildTaekil','SJ_buildLifeRoadmap','SJ_buildChildAnalysis'];
BLOCK_BUILDERS.forEach(function(b){ need(typeof SJ[b] === 'function', '인벤토리 블록 빌더 SJ.' + b + ' 없음(드리프트)'); });
var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, 126.98);
var gg = analysis.analyzeGyeokguk(saju);
// ── 4) 단일소스 게이트 (gangdo / wuichi / gilhyung) ──
var tf = fs.extractTopFeatures(saju, gg);
need(Array.isArray(tf.topFeatures) && tf.topFeatures.length > 0, 'gangdo: topFeatures 비어있음');
tf.topFeatures.forEach(function(f){ need(f.score >= 0 && f.score <= 1, 'gangdo 범위 이탈: ' + f.name + '=' + f.score); });
need(SJ.SJ_IMPACT_SCORE && SJ.SJ_IMPACT_SCORE['일지'] && typeof SJ.SJ_IMPACT_SCORE['일지'].score === 'number',
  'wuichi: SJ_IMPACT_SCORE 기둥별 .score(number) 아님');
var yoOh = SJ.SJ_extractYongshinOh(gg.yongshin || '');
var chegye = yoOh ? SJ.SJ_calcOsinChegye(yoOh) : null;
if (chegye) need(typeof SJ.SJ_getOsinLabel(chegye, '목') === 'string', 'gilhyung: getOsinLabel string 아님');
// ── 5) interaction 리졸버 게이트 (relation / hyung / saeng / geuk) ──
var dmEl = saju.dmEl;
need(typeof dmEl === 'string' && dmEl, 'interaction: saju.dmEl 없음');
need(sdata.OH_SANG[dmEl] !== undefined, 'interaction.saeng: OH_SANG[' + dmEl + '] 없음');
need(sdata.OH_GEUK[dmEl] !== undefined, 'interaction.geuk: OH_GEUK[' + dmEl + '] 없음');
var rel = fs.calcRelationStrength(saju);
need(rel && typeof rel === 'object', 'interaction.relation: object 아님');
Object.keys(rel).forEach(function(k){ need(typeof rel[k] === 'number', 'interaction.relation 강도 number 아님: ' + k); });
var hyung = SJ.SJ_checkSamhyung(saju);
need(Array.isArray(hyung), 'interaction.hyung: SJ_checkSamhyung array 아님');
need(Array.isArray(saju.P) && saju.P.length >= 3 && typeof sdata.JIJI_KR[saju.P[0].bi] === 'string',
  'interaction: 기둥→지지(JIJI_KR[P[i].bi]) 매핑 불가');
// ── 6) 이론 근거 코퍼스(②, 텍스트 참조) 게이트 ──
var THEORY_PATH = path.join(__dirname, '../../public/saju-theory.js');
var theoryTxt = nodefs.readFileSync(THEORY_PATH, 'utf8');   // ⚠ require 아님(IIFE+window)
need(theoryTxt.length > 100000, '이론 코퍼스 너무 짧음(읽기 실패?): ' + theoryTxt.length);
var partCount = (theoryTxt.match(/PART [1-5]:/g) || []).length;
need(partCount >= 5, '이론 코퍼스 PART 배너 ' + partCount + '개(<5) — 구조 드리프트');
var secCount = (theoryTxt.match(/^\/\/ ={3,}/gm) || []).length;
need(secCount >= 10, '이론 코퍼스 ==== 서브섹션 ' + secCount + '개(<10) — 구조 드리프트');
console.log('[PREFLIGHT OK] blocks=' + BLOCK_BUILDERS.length
  + ' gangdoTop=' + tf.topFeatures[0].name + '(' + tf.topFeatures[0].score + ')'
  + ' yongOh=' + (yoOh || '-') + ' dmEl=' + dmEl + '(생' + sdata.OH_SANG[dmEl] + '/극' + sdata.OH_GEUK[dmEl] + ')'
  + ' rel=' + Object.keys(rel).length + '쌍 hyung=' + hyung.length
  + ' theory=' + theoryTxt.length + '자/PART' + partCount + '/sec' + secCount);
