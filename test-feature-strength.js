// test-feature-strength.js — feature-strength.js 검증 (1993.5.26 08:40 남 → 정화 양인격, 1순위 겁재)
'use strict';

var core = require('./lib/saju-core');
var analysis = require('./lib/saju-analysis');
var fs = require('./lib/feature-strength');

function fmt(n){ return (Math.round(n*100)/100).toString(); }
function pad(s,n){ s=String(s); while(s.length<n) s+=' '; return s; }

var saju = core.calcSajuForApp(1993, 5, 26, 8, 40, 126.98);
var gg = analysis.analyzeGyeokguk(saju);

console.log('=== 사주 원국 ===');
console.log('일간:', saju.dm, '(' + saju.dmEl + ')');
console.log('사주:', saju.P.map(function(p){ return p.s + p.b; }).join(' '));
console.log('격국:', gg.gyeokgukName, '|', gg.gyeokgukBasis);
console.log('신강도:', gg.strengthGrade, '(' + gg.strengthScore + ')');
console.log('');

var sipseong = fs.calcSipseongStrength(saju, gg);
console.log('=== 십성 명리강도 (절대) ===');
Object.keys(sipseong).forEach(function(k){
  console.log('  ' + pad(k,4) + ' ' + fmt(sipseong[k]));
});
console.log('');

var distinct = fs.applyDistinctiveness(sipseong);
console.log('=== 십성 변별 가중합 (score) ===');
var distinctEntries = Object.keys(distinct).map(function(k){
  return { name:k, info:distinct[k] };
});
distinctEntries.sort(function(a,b){ return b.info.score - a.info.score; });
distinctEntries.forEach(function(e){
  console.log('  ' + pad(e.name,4) + ' score=' + pad(fmt(e.info.score),5) +
              ' abs=' + pad(fmt(e.info.absolute),5) +
              ' ratio=' + pad(fmt(e.info.ratio),5) + 'x');
});
console.log('');

var result = fs.extractTopFeatures(saju, gg);
console.log('=== topFeatures ===');
result.topFeatures.forEach(function(f, i){
  console.log('  [' + (i+1) + '] ' + pad(f.type,3) + ' ' + pad(f.name,6) +
              ' score=' + pad(fmt(f.score),5) +
              ' ratio=' + pad(fmt(f.ratio),5) +
              ' label=' + f.label);
});
console.log('');
console.log('sinkangForMulsang:', JSON.stringify(result.sinkangForMulsang));
console.log('');

console.log('=== 검증 ===');
var topName = result.topFeatures[0] && result.topFeatures[0].name;
var gyeokOk = /양인격/.test(gg.gyeokgukName);
console.log('① 격국 양인격 포함:', gyeokOk ? 'PASS' : 'FAIL (실제: ' + gg.gyeokgukName + ')');

var sipseongOnly = result.topFeatures.filter(function(f){ return f.type==='십성'; });
var topSipseong = sipseongOnly[0] && sipseongOnly[0].name;
var bigeobMax = (distinct['비견'].score > distinct['겁재'].score) ? '비견' : '겁재';
console.log('② 십성 1순위 비겁계열 (비견/겁재):', (topSipseong==='비견'||topSipseong==='겁재') ? 'PASS (' + topSipseong + ')' : 'FAIL (' + topSipseong + ')');

var bigeobRatio = Math.max(distinct['비견'].ratio, distinct['겁재'].ratio);
console.log('③ 비겁 변별 비율 ≥ 1.5x:', bigeobRatio >= 1.5 ? 'PASS (' + fmt(bigeobRatio) + 'x)' : 'FAIL (' + fmt(bigeobRatio) + 'x)');

var sinkangOk = result.sinkangForMulsang.grade === gg.strengthGrade;
console.log('④ sinkangForMulsang 노출:', sinkangOk ? 'PASS' : 'FAIL');

var noSinkangInTop = result.topFeatures.every(function(f){
  return !/신강|신약|중화|용신/.test(f.name);
});
console.log('⑤ topFeatures에 신강도/용신 없음:', noSinkangInTop ? 'PASS' : 'FAIL');
