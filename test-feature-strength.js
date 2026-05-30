// test-feature-strength.js — feature-strength.js 검증 (정규화 0~1 + 회귀 케이스)
'use strict';

var core = require('./lib/saju-core');
var analysis = require('./lib/saju-analysis');
var fs = require('./lib/feature-strength');

function fmt(n){ return (Math.round(n*1000)/1000).toString(); }
function pad(s,n){ s=String(s); while(s.length<n) s+=' '; return s; }

function runCase(label, y, m, d, h, min, lng){
  console.log('\n========== ' + label + ' ==========');
  var saju = core.calcSajuForApp(y, m, d, h, min, lng);
  var gg = analysis.analyzeGyeokguk(saju);
  console.log('일간:', saju.dm, '(' + saju.dmEl + ') | 사주:', saju.P.map(function(p){return p.s+p.b;}).join(' '));
  console.log('격국:', gg.gyeokgukName, '| 신강도:', gg.strengthGrade, '(' + gg.strengthScore + ')');

  var sipseong = fs.calcSipseongStrength(saju, gg);
  var distinct = fs.applyDistinctiveness(sipseong);
  var result = fs.extractTopFeatures(saju, gg);

  console.log('-- topFeatures --');
  result.topFeatures.forEach(function(f, i){
    console.log('  [' + (i+1) + '] ' + pad(f.type,3) + ' ' + pad(f.name,8) +
                ' score=' + pad(fmt(f.score),6) +
                ' ratio=' + pad(fmt(f.ratio),5) +
                ' label=' + f.label);
  });
  console.log('sinkangForMulsang:', JSON.stringify(result.sinkangForMulsang));
  return { saju:saju, gg:gg, sipseong:sipseong, distinct:distinct, result:result };
}

// 회귀 케이스 1: 1993.5.26 08:40 남 (정화 양인격 → 겁재 1순위)
var c1 = runCase('CASE1: 1993.5.26 08:40 남 (정화 양인격)', 1993, 5, 26, 8, 40, 126.98);

// 추가 케이스 2: 1990.3.15 14:00 여 (신약 추정)
var c2 = runCase('CASE2: 1990.3.15 14:00 여', 1990, 3, 15, 14, 0, 126.98);

// 추가 케이스 3: 1998.8.22 20:00 여 (극신강 추정)
var c3 = runCase('CASE3: 1998.8.22 20:00 여', 1998, 8, 22, 20, 0, 126.98);

console.log('\n========== 검증 ==========');

// ① CASE1 양인격
console.log('① CASE1 격국 양인격:', /양인격/.test(c1.gg.gyeokgukName) ? 'PASS' : 'FAIL (' + c1.gg.gyeokgukName + ')');

// ② CASE1 십성 1순위 비겁계열
var c1sip = c1.result.topFeatures.filter(function(f){return f.type==='십성';});
var c1top = c1sip[0] && c1sip[0].name;
console.log('② CASE1 십성 1순위 비겁계열:', (c1top==='비견'||c1top==='겁재') ? 'PASS (' + c1top + ')' : 'FAIL (' + c1top + ')');

// ③ score 0~1 범위
function allInUnitRange(list){ return list.every(function(f){ return f.score >= 0 && f.score <= 1; }); }
var c1ok = allInUnitRange(c1.result.topFeatures);
var c2ok = allInUnitRange(c2.result.topFeatures);
var c3ok = allInUnitRange(c3.result.topFeatures);
console.log('③ score 0~1 범위 (3 케이스):', (c1ok && c2ok && c3ok) ? 'PASS' : 'FAIL (c1=' + c1ok + ' c2=' + c2ok + ' c3=' + c3ok + ')');

// ④ sinkangForMulsang 노출
console.log('④ sinkangForMulsang 노출:',
  c1.result.sinkangForMulsang.grade === c1.gg.strengthGrade ? 'PASS' : 'FAIL');

// ⑤ topFeatures에 신강도/용신 단어 없음
function noSinkangNames(list){ return list.every(function(f){ return !/신강|신약|중화|용신/.test(f.name); }); }
console.log('⑤ topFeatures에 신강도/용신 단어 없음:',
  (noSinkangNames(c1.result.topFeatures) && noSinkangNames(c2.result.topFeatures) && noSinkangNames(c3.result.topFeatures)) ? 'PASS' : 'FAIL');

// ⑥ CASE1 비겁(비견/겁재) 변별 비율 ≥ 1.5x (절대 명리강도 기반은 그대로)
var bigeobRatio = Math.max(c1.distinct['비견'].ratio, c1.distinct['겁재'].ratio);
console.log('⑥ CASE1 비겁 변별 비율 ≥ 1.5x:', bigeobRatio >= 1.5 ? 'PASS (' + fmt(bigeobRatio) + 'x)' : 'FAIL (' + fmt(bigeobRatio) + 'x)');
