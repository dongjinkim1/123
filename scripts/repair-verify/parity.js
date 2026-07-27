// scripts/repair-verify/parity.js
// Gate G3 — exhaustive client(engine.js) vs server(lib/*) re-comparison.
// public/saju-theory.js (dead client copy) is compared too where the symbol exists.
//
//   node scripts/repair-verify/parity.js
'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var loader = require('./load-engine');

var ROOT = path.join(__dirname, '..', '..');
var core = require(path.join(ROOT, 'lib', 'saju-core'));
var analysis = require(path.join(ROOT, 'lib', 'saju-analysis'));
var data = require(path.join(ROOT, 'lib', 'saju-data'));

var C = loader.loadEngine();          // client: public/engine.js

// public/saju-theory.js — dead copy; load it in its own sandbox if it stands alone.
var T = null, tErr = null;
try {
  var tSand = loader.loadEngine({prelude: true});
  var src = fs.readFileSync(path.join(ROOT, 'public', 'saju-theory.js'), 'utf8');
  var ctx = vm.createContext(tSand);
  vm.runInContext(src, ctx, {filename: 'public/saju-theory.js'});
  T = tSand;
} catch (e) { tErr = e.message; }

var pass = 0, fail = 0, failures = [], failByCheck = {}, passByCheck = {};
function chk(name, a, b, extra) {
  var sa = JSON.stringify(a), sb = JSON.stringify(b);
  if (sa === sb) { pass++; passByCheck[name] = (passByCheck[name] || 0) + 1; return true; }
  fail++;
  failByCheck[name] = (failByCheck[name] || 0) + 1;
  if (failures.length < 40) failures.push({t: name, client: sa, server: sb, at: extra});
  return false;
}

/* ── 1. getSipsung 10x10 ── */
for (var i = 0; i < 10; i++) for (var j = 0; j < 10; j++)
  chk('getSipsung', C.getSipsung(i, j), data.getSipsung(i, j), i + ',' + j);

/* ── 2. getUnsung 10x12 ── */
for (var i = 0; i < 10; i++) for (var j = 0; j < 12; j++)
  chk('getUnsung', C.getUnsung(i, j), data.getUnsung(i, j), i + ',' + j);

/* ── 3. 지장간 12지지 deep-equal ── */
for (var j = 0; j < 12; j++)
  chk('JIJANGGAN', C.JIJANGGAN_DATA[j], data.JIJANGGAN_DATA[j], 'ji=' + j);

/* ── 4. 공망 60갑자 ── */
for (var k = 0; k < 60; k++) {
  var dg = k % 10, dj = k % 12;
  var saju = {raw: {dg: dg, dj: dj, yg: 0, yj: 0, mg: 0, mj: 0, hg: 0, hj: 0}};
  var cli = (typeof C.calcGongmang === 'function') ? C.calcGongmang(saju) : null;
  var srv = analysis.calcGongmang(saju);
  if (cli !== null) chk('calcGongmang', cli, srv, 'gz=' + k);
}

/* ── 5. getSpecialSinsal sweep: 년주 6 x 월지 12 x 일주 60 x 시지 12 ── */
var YEAR_SAMPLES = [[0, 0], [1, 7], [4, 4], [6, 8], [7, 9], [9, 11]];
var sinsalCount = 0;
for (var y = 0; y < YEAR_SAMPLES.length; y++) {
  var yg = YEAR_SAMPLES[y][0], yj = YEAR_SAMPLES[y][1];
  for (var mj = 0; mj < 12; mj++) {
    var mg = (([2, 4, 6, 8, 0])[yg % 5] + (mj - 2 + 12) % 12) % 10;
    for (var ilju = 0; ilju < 60; ilju++) {
      var dg = ilju % 10, dj = ilju % 12;
      for (var hj = 0; hj < 12; hj++) {
        var hg = (([0, 2, 4, 6, 8])[dg % 5] + hj) % 10;
        var a = C.getSpecialSinsal(yg, yj, mg, mj, dg, dj, hg, hj);
        var b = core.getSpecialSinsal(yg, yj, mg, mj, dg, dj, hg, hj);
        sinsalCount++;
        chk('getSpecialSinsal', a, b, [yg, yj, mg, mj, dg, dj, hg, hj].join('/'));
      }
    }
  }
}

/* ── 6. calcExtraSinsal — same sweep shape, via calcSajuForApp-like raw ── */
var extraCount = 0;
for (var y = 0; y < YEAR_SAMPLES.length; y++) {
  var yg = YEAR_SAMPLES[y][0], yj = YEAR_SAMPLES[y][1];
  for (var mj = 0; mj < 12; mj++) {
    var mg = (([2, 4, 6, 8, 0])[yg % 5] + (mj - 2 + 12) % 12) % 10;
    for (var ilju = 0; ilju < 60; ilju++) {
      var dg = ilju % 10, dj = ilju % 12;
      for (var hj = 0; hj < 12; hj += 3) {
        var hg = (([0, 2, 4, 6, 8])[dg % 5] + hj) % 10;
        var sj = {raw: {yg: yg, yj: yj, mg: mg, mj: mj, dg: dg, dj: dj, hg: hg, hj: hj}};
        extraCount++;
        chk('calcExtraSinsal', C.calcExtraSinsal(sj), analysis.calcExtraSinsal(sj),
            [yg, yj, mg, mj, dg, dj, hg, hj].join('/'));
      }
    }
  }
}

/* ── 7. calculateSaju — 870 pseudo-random births 1940~2026 ── */
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
var r1 = rng(870870);
for (var n = 0; n < 870; n++) {
  var y = 1940 + Math.floor(r1() * 87), m = 1 + Math.floor(r1() * 12), d = 1 + Math.floor(r1() * 28);
  var h = Math.floor(r1() * 24), mi = Math.floor(r1() * 60);
  var hb = Math.floor(((h + 1) % 24) / 2);
  chk('calculateSaju', C.calculateSaju(y, m, d, hb, h, mi), core.calculateSaju(y, m, d, hb, h, mi),
      [y, m, d, h, mi].join('-'));
}

/* ── 8. calcSajuForApp — 220 births incl. true-solar longitudes ── */
var r2 = rng(220220);
for (var n = 0; n < 220; n++) {
  var y = 1940 + Math.floor(r2() * 87), m = 1 + Math.floor(r2() * 12), d = 1 + Math.floor(r2() * 28);
  var noH = r2() < 0.1;
  var h = noH ? null : Math.floor(r2() * 24), mi = noH ? null : Math.floor(r2() * 60);
  var lng = r2() < 0.5 ? Math.round((124 + r2() * 8) * 100) / 100 : null;
  chk('calcSajuForApp', C.calcSajuForApp(y, m, d, h, mi, lng), core.calcSajuForApp(y, m, d, h, mi, lng),
      [y, m, d, h, mi, lng].join('-'));
  // calcDaewoon both genders
  var sj = core.calcSajuForApp(y, m, d, h, mi, lng);
  ['남', '여'].forEach(function (g) {
    var cd = C.calcDaewoon(sj, y, m, d, h, mi, g), sd = analysis.calcDaewoon(sj, y, m, d, h, mi, g);
    chk('calcDaewoon', {a: cd.daewoonAge, dir: cd.direction, ds: cd.daewoons},
                       {a: sd.daewoonAge, dir: sd.direction, ds: sd.daewoons},
        [y, m, d, h, mi, g].join('-'));
  });
  // calcRelations + resolveHapChungPriority (F5 — same input must give same verdict)
  var cr = C.calcRelations(sj), sr = analysis.calcRelations(sj);
  chk('calcRelations', cr, sr, [y, m, d, h, mi].join('-'));
  var chp = C.resolveHapChungPriority(cr), shp = analysis.resolveHapChungPriority(sr);
  chk('resolveHapChungPriority.types',
      (chp.resolved || []).map(function (x) { return x.type; }).sort(),
      (shp.resolved || []).map(function (x) { return x.type; }).sort(),
      [y, m, d, h, mi].join('-'));
}

/* ── 9. saju-theory.js (dead copy) — table-level equality with engine.js ── */
var theoryReport = [];
if (T) {
  ['JIJI_HYUNG', 'JIJI_PA', 'JIJI_YUKHAP', 'JIJI_CHUNG', 'JIJI_HAE', 'JIJI_SAMHAP'].forEach(function (k) {
    if (T[k] === undefined || C[k] === undefined) { theoryReport.push(k + ': (absent)'); return; }
    var same = JSON.stringify(T[k]) === JSON.stringify(C[k]);
    theoryReport.push(k + ': ' + (same ? 'MATCH' : 'DIFF'));
    chk('saju-theory.' + k, C[k], T[k], k);
  });
  var r3 = rng(303030);
  for (var n = 0; n < 120; n++) {
    var y = 1940 + Math.floor(r3() * 87), m = 1 + Math.floor(r3() * 12), d = 1 + Math.floor(r3() * 28);
    var h = Math.floor(r3() * 24), mi = Math.floor(r3() * 60);
    chk('saju-theory.calcSajuForApp', C.calcSajuForApp(y, m, d, h, mi, null),
        T.calcSajuForApp(y, m, d, h, mi, null), [y, m, d, h, mi].join('-'));
    var sjt = C.calcSajuForApp(y, m, d, h, mi, null);
    chk('saju-theory.calcExtraSinsal', C.calcExtraSinsal(sjt), T.calcExtraSinsal(sjt), [y, m, d].join('-'));
  }
} else {
  theoryReport.push('saju-theory.js not loadable standalone: ' + tErr);
}

/* ── report ── */
console.log('\n=== G3 client/server parity ===');
console.log('  getSpecialSinsal sweep: ' + sinsalCount + ' combos');
console.log('  calcExtraSinsal sweep : ' + extraCount + ' combos');
console.log('  saju-theory.js        : ' + theoryReport.join(' | '));
console.log('\n  PASS ' + pass + '  FAIL ' + fail);
console.log('\n  per-check tally (fail/total):');
Object.keys(passByCheck).concat(Object.keys(failByCheck)).filter(function (v, i, a) { return a.indexOf(v) === i; })
  .sort().forEach(function (k) {
    var f = failByCheck[k] || 0, p = passByCheck[k] || 0;
    console.log('    ' + (f ? 'FAIL ' : '  ok ') + k + ': ' + f + '/' + (f + p));
  });
if (fail) {
  console.log('\n  first failures:');
  failures.forEach(function (f) {
    console.log('   - ' + f.t + ' @' + f.at);
    console.log('       client: ' + String(f.client).slice(0, 220));
    console.log('       server: ' + String(f.server).slice(0, 220));
  });
}
process.exit(fail > 0 ? 1 : 0);
