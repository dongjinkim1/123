// scripts/repair-verify/baseline.js
// Grid runner for the engine repair verification (CC_명령서_엔진수리1차_v1 §4 STEP 0 / §5 G1).
//
//   node scripts/repair-verify/baseline.js --gen        regenerate cases.json (random seed frozen once)
//   node scripts/repair-verify/baseline.js --out FILE    run the grid, write results to FILE
//   node scripts/repair-verify/baseline.js --diff A B    classify differences between two result files
//
// cases.json is generated ONCE and reused so that reruns cannot be polluted by
// fresh randomness.
'use strict';

var fs = require('fs');
var path = require('path');
var loader = require('./load-engine');

var DIR = __dirname;
var CASES_FILE = path.join(DIR, 'cases.json');

/* ---------- deterministic PRNG (mulberry32) ---------- */
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- JD -> calendar date ---------- */
function jdToDate(jd) {
  var z = Math.floor(jd + 0.5), f = jd + 0.5 - z;
  var a = z;
  if (z >= 2299161) {
    var alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  var b = a + 1524, c = Math.floor((b - 122.1) / 365.25),
      d = Math.floor(365.25 * c), e = Math.floor((b - d) / 30.6001);
  var day = b - d - Math.floor(30.6001 * e) + f;
  var month = e < 14 ? e - 1 : e - 13;
  var year = month > 2 ? c - 4716 : c - 4715;
  return {y: year, m: month, d: Math.floor(day)};
}
function addDays(dt, n) {
  var t = Date.UTC(dt.y, dt.m - 1, dt.d) + n * 86400000;
  var x = new Date(t);
  return {y: x.getUTCFullYear(), m: x.getUTCMonth() + 1, d: x.getUTCDate()};
}

/* ---------- sandbox with memoized solar-term solver ----------
   findSolarTermJD / getJeolgiTimes are pure and deterministic; memoizing them
   at the sandbox global level speeds the grid up ~50x without touching engine.js. */
function makeSandbox() {
  var s = loader.loadEngine();
  var rawTerm = s.findSolarTermJD, termCache = {};
  s.findSolarTermJD = function (yr, tgt) {
    var k = yr + ':' + tgt;
    if (!(k in termCache)) termCache[k] = rawTerm(yr, tgt);
    return termCache[k];
  };
  var rawJT = s.getJeolgiTimes, jtCache = {};
  s.getJeolgiTimes = function (yr) {
    if (!(yr in jtCache)) jtCache[yr] = rawJT(yr);
    return jtCache[yr];
  };
  return s;
}

/* ---------- case generation ---------- */
var YEAR_FROM = 1940, YEAR_TO = 2030;
var HOURS = [3, 9, 15, 23];

function genCases() {
  var s = makeSandbox();
  var JG = s.JG_LONG;
  var cases = [];

  // (1) solar-term neighbourhood grid: each year x 12 terms x (term day +-3) x 4 hours
  for (var y = YEAR_FROM; y <= YEAR_TO; y++) {
    for (var j = 0; j < JG.length; j++) {
      var jd = s.findSolarTermJD(y, JG[j].l) + 9 / 24; // KST
      var base = jdToDate(jd);
      for (var off = -3; off <= 3; off++) {
        var dt = addDays(base, off);
        if (dt.y < YEAR_FROM - 1 || dt.y > YEAR_TO + 1) continue;
        for (var hi = 0; hi < HOURS.length; hi++) {
          cases.push({k: 'g', y: dt.y, m: dt.m, d: dt.d, h: HOURS[hi], min: 0, lng: null});
        }
      }
    }
  }

  // (2) 500 frozen random cases (some with longitude, some with unknown hour)
  var rnd = rng(20260727);
  for (var i = 0; i < 500; i++) {
    var yy = YEAR_FROM + Math.floor(rnd() * (YEAR_TO - YEAR_FROM + 1));
    var mm = 1 + Math.floor(rnd() * 12);
    var dd = 1 + Math.floor(rnd() * 28);
    var noHour = rnd() < 0.1;
    var hh = noHour ? null : Math.floor(rnd() * 24);
    var mi = noHour ? null : Math.floor(rnd() * 60);
    var lng = rnd() < 0.4 ? Math.round((124 + rnd() * 8) * 100) / 100 : null;
    cases.push({k: 'r', y: yy, m: mm, d: dd, h: hh, min: mi, lng: lng});
  }
  return cases;
}

/* ---------- per-case record ---------- */
function pillars(P) {
  return P.map(function (p) { return (p.s || '?') + (p.b || '?'); }).join('|');
}
function salKey(list) {
  return (list || []).map(function (x) { return x.name + '@' + x.desc; }).sort().join(';');
}
function dwRec(sb, saju, c, gender) {
  try {
    var dw = sb.calcDaewoon(saju, c.y, c.m, c.d, c.h, c.min, gender);
    return {a: dw.daewoonAge, dir: dw.direction, g0: dw.daewoons[0].gan + dw.daewoons[0].ji};
  } catch (e) {
    return {err: String(e.message)};
  }
}

function runCase(sb, c) {
  var saju = sb.calcSajuForApp(c.y, c.m, c.d, c.h, c.min, c.lng);
  var rel = sb.calcRelations(saju);
  var rec = {
    p: pillars(saju.P),
    cj: saju.currentJeolgi,
    sy: saju.sajuYear,
    el: saju.el,
    elF: saju.elFull,
    ss: saju.ss.map(function (x) { return x.ss; }).join(','),
    jiSS: saju.jiSS.map(function (x) { return x.ss; }).join(','),
    uns: saju.uns.join(','),
    sin: saju.sinsal.join(',') + '/' + saju.sinsalDay.join(','),
    sals: salKey(saju.specialSals),
    amh: (saju.amhap || []).length,
    tsm: saju.trueSolarMin,
    // relations
    rHap: (rel.jijiHap || []).map(function (x) { return x.desc; }).sort().join(';'),
    rSam: (rel.jijiSamhap || []).map(function (x) { return x.desc; }).sort().join(';'),
    rChu: (rel.jijiChung || []).map(function (x) { return x.desc; }).sort().join(';'),
    rHyu: (rel.jijiHyung || []).map(function (x) { return x.desc + '(' + x.type + ')'; }).sort().join(';'),
    rPa: (rel.jijiPa || []).map(function (x) { return x.desc; }).sort().join(';'),
    rHae: (rel.jijiHae || []).map(function (x) { return x.desc; }).sort().join(';'),
    hcp: (sb.resolveHapChungPriority(rel).resolved || [])
           .map(function (x) { return x.type + ':' + x.desc; }).sort().join(';'),
    ext: salKey(sb.calcExtraSinsal ? sb.calcExtraSinsal(saju) : []),
    dwM: dwRec(sb, saju, c, '남'),
    dwF: dwRec(sb, saju, c, '여')
  };
  return rec;
}

function runAll(outFile) {
  var cases = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));
  var sb = makeSandbox();
  var out = [], t0 = Date.now();
  for (var i = 0; i < cases.length; i++) {
    try {
      out.push(runCase(sb, cases[i]));
    } catch (e) {
      out.push({ERR: String(e && e.message)});
    }
    if (i % 5000 === 0 && i) process.stderr.write('  ' + i + '/' + cases.length + '\n');
  }
  fs.writeFileSync(outFile, JSON.stringify(out));
  console.log('cases=' + cases.length + ' -> ' + path.basename(outFile) +
              '  (' + ((Date.now() - t0) / 1000).toFixed(1) + 's)');
}

/* ---------- diff classification (§5 G1) ---------- */
var KST_SHIFT = 9 / 24;

// Evidence-based classification: decide from WHICH pillar actually moved, not
// from the case's calendar window alone. A 23:00 case whose year pillar shifted
// is an (a) solar-term effect, not a (b) 자시 effect.
var DW_KEYS = ['dwM', 'dwF'];
var TABLE_KEYS = ['sals', 'ext', 'rHyu', 'rPa', 'rHap', 'rSam', 'rChu', 'rHae', 'hcp'];

function classify(c, a, b, sb) {
  var changed = {};
  Object.keys(a).forEach(function (k) {
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) changed[k] = 1;
  });
  var keys = Object.keys(changed);

  var pa = String(a.p).split('|'), pb = String(b.p).split('|');
  var yearMoved = pa[0] !== pb[0];
  var monthMoved = pa[1] !== pb[1];
  var dayMoved = pa[2] !== pb[2];
  var hourMoved = pa[3] !== pb[3];

  var inZasi = (c.h !== null && c.h !== undefined && +c.h === 23);
  var inTz = isTzWindow(c.y, c.m, c.d);
  var nearTerm = sb ? nearTermFlag(sb, c) : false;

  // 1. Day or hour pillar moved — only 자시 이월(F3) or 표준시/서머타임(F4) may do this.
  if (dayMoved || hourMoved) {
    if (inZasi) return {cls: 'b', keys: keys};
    if (inTz) return {cls: 'c', keys: keys};
    return {cls: 'e', keys: keys};
  }
  // 2. Year or month pillar / 절기 label moved — solar-term boundary effect only.
  if (yearMoved || monthMoved || changed.cj || changed.sy) {
    if (nearTerm) return {cls: 'a', keys: keys};
    if (inTz) return {cls: 'c', keys: keys};
    return {cls: 'e', keys: keys};
  }
  // 3. Pillars identical, only 대운 moved — F2's 0.5-day bias removal,
  //    or (inside a 표준시/서머타임 window) F4's clock normalisation.
  var onlyDw = keys.length > 0 && keys.every(function (k) { return DW_KEYS.indexOf(k) >= 0; });
  if (onlyDw) {
    if (inTz) return {cls: 'c', keys: keys};
    return {cls: nearTerm ? 'a' : 'aprime', keys: keys};
  }
  // 4. Pillars identical, only table-driven verdicts moved — F5~F9.
  var onlyTables = keys.length > 0 && keys.every(function (k) {
    return TABLE_KEYS.indexOf(k) >= 0 || DW_KEYS.indexOf(k) >= 0;
  });
  if (onlyTables) return {cls: 'd', keys: keys};
  return {cls: 'e', keys: keys};
}

function nearTermFlag(sb, c) {
  var jd = sb.dateToJDN(c.y, c.m, c.d) +
           ((c.h === null || c.h === undefined) ? 0.5 : (+c.h) / 24 + (+c.min || 0) / 1440);
  var JG = sb.JG_LONG, min = 1e9;
  for (var y = c.y - 1; y <= c.y + 1; y++) {
    for (var j = 0; j < JG.length; j++) {
      var t = sb.findSolarTermJD(y, JG[j].l) + KST_SHIFT;
      var dd = Math.abs(t - jd);
      if (dd < min) min = dd;
    }
  }
  return min <= 0.5 + 1e-9; // within +-12h of a term boundary
}

// F4 windows: +8:30 standard time and every Korean DST period.
var DST = [
  ['1948-06-01', '1948-09-12'], ['1949-04-03', '1949-09-10'], ['1950-04-01', '1950-09-09'],
  ['1951-05-06', '1951-09-08'], ['1955-05-05', '1955-09-08'], ['1956-05-20', '1956-09-29'],
  ['1957-05-05', '1957-09-21'], ['1958-05-04', '1958-09-20'], ['1959-05-03', '1959-09-19'],
  ['1960-05-01', '1960-09-17'], ['1987-05-10', '1987-10-11'], ['1988-05-08', '1988-10-09']
];
function ymd(c) { return c.y * 10000 + c.m * 100 + c.d; }
function pn(s) { return +s.replace(/-/g, ''); }
function isTzWindow(y, m, d) {
  var v = y * 10000 + m * 100 + d;
  if (v >= 19540321 && v <= 19610809) return true;
  for (var i = 0; i < DST.length; i++) {
    if (v >= pn(DST[i][0]) - 1 && v <= pn(DST[i][1]) + 1) return true;
  }
  return false;
}

function diff(fileA, fileB) {
  var A = JSON.parse(fs.readFileSync(fileA, 'utf8'));
  var B = JSON.parse(fs.readFileSync(fileB, 'utf8'));
  var cases = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));
  if (A.length !== B.length) throw new Error('length mismatch');
  var sb = makeSandbox();
  var tally = {a: 0, aprime: 0, b: 0, c: 0, d: 0, e: 0};
  var eSamples = [], keyTally = {};
  var total = 0;

  for (var i = 0; i < A.length; i++) {
    if (JSON.stringify(A[i]) === JSON.stringify(B[i])) continue;
    total++;
    var r = classify(cases[i], A[i], B[i], sb);
    tally[r.cls]++;
    r.keys.forEach(function (k) { keyTally[k] = (keyTally[k] || 0) + 1; });
    if (r.cls === 'e' && eSamples.length < 25) {
      eSamples.push({i: i, c: cases[i], keys: r.keys,
                     a: pick(A[i], r.keys), b: pick(B[i], r.keys)});
    }
  }
  var out = {totalCases: A.length, changed: total, tally: tally, keyTally: keyTally, eSamples: eSamples};
  console.log(JSON.stringify(out, null, 2).slice(0, 8000));
  fs.writeFileSync(path.join(DIR, 'diff-' + path.basename(fileB, '.json') + '.json'),
                   JSON.stringify(out, null, 2));
  return out;
}
function pick(o, keys) {
  var r = {}; keys.forEach(function (k) { r[k] = o[k]; }); return r;
}

/* ---------- main ---------- */
var argv = process.argv.slice(2);
if (argv[0] === '--gen') {
  var cs = genCases();
  fs.writeFileSync(CASES_FILE, JSON.stringify(cs));
  console.log('cases.json written: ' + cs.length + ' cases');
} else if (argv[0] === '--out') {
  runAll(path.join(DIR, argv[1]));
} else if (argv[0] === '--diff') {
  diff(path.join(DIR, argv[1]), path.join(DIR, argv[2]));
} else {
  console.log('usage: --gen | --out FILE | --diff A B');
}
