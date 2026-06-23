'use strict';
// seongjil-check.js — 코드 게이트: C0 조인·주입 무결성 + C1 유니크 + C3 누수(코드 1차).
// C2(명사형)·C4(질감수렴)·C5(일간쌍분화)·재확인은 LLM(seongjil-judge) 담당 — 여기 없음.
// 재사용(데이터만): C3 denylist = check.js OHAENG(본문금지·명사형-safe).
//   ★ gate.js ELEM_LEX 금지 — ㅁ-strip 어간과 겹치는 항목이 있어 명사형 골드를 오탐(합성 토큰 회귀로 확인).
// 사용: node seongjil-check.js [features160.json] [mbts_160dir]
var fs = require('fs');
var path = require('path');
var OHAENG = require('./check.js').OHAENG;

var OHAENG_GROUPS = ['물', '불', '나무', '쇠', '흙'];

// 어간복원: 종성 ㅁ/음 strip. 자람→자라, 데움→데우, 받아안음→받아안.
function stripNominalizer(word) {
  if (!word) return word;
  if (word.length >= 2 && word.charAt(word.length - 1) === '음') return word.slice(0, -1);
  var code = word.charCodeAt(word.length - 1) - 0xAC00;
  if (code < 0 || code > 11171) return word;           // 한글 음절 아님
  var jong = code % 28;                                 // 종성 인덱스 (16 = ㅁ)
  if (jong === 16) {
    return word.slice(0, -1) + String.fromCharCode(word.charCodeAt(word.length - 1) - jong);
  }
  return word;
}

// C3: 어간이 OHAENG 항목의 접두거나 그 역이면 누수. (코드 1차 — coarse)
function leakHit(seongjil) {
  var stem = stripNominalizer(seongjil);
  if (stem.length < 2) return null;                     // 1자 어간 과탐 방지
  for (var i = 0; i < OHAENG.length; i++) {
    var w = OHAENG[i];
    if (stem.indexOf(w) === 0 || w.indexOf(stem) === 0) return { stem: stem, ohaengWord: w };
  }
  return null;
}

// 파일명 stem 파싱: 큰/작은 + 오행 + MBTI(끝 4자)
function parseName(stem) {
  var size, rest;
  if (stem.indexOf('작은') === 0) { size = '작은'; rest = stem.slice(2); }
  else if (stem.indexOf('큰') === 0) { size = '큰'; rest = stem.slice(1); }
  else return null;
  return { size: size, ohaeng: rest.slice(0, -4), mbti: rest.slice(-4) };
}

function readMd(dir, key) {
  try { return fs.readFileSync(path.join(dir, key + '.md'), 'utf8'); } catch (e) { return null; }
}

function run(featPath, mdDir) {
  var feats = JSON.parse(fs.readFileSync(featPath, 'utf8'));
  var featKeys = Object.keys(feats);
  var mdFiles = fs.readdirSync(mdDir).filter(function (f) { return /\.md$/.test(f); })
    .map(function (f) { return f.replace(/\.md$/, ''); });

  var fails = [], warns = [];
  var mdSet = {}, featSet = {};
  mdFiles.forEach(function (k) { mdSet[k] = true; });
  featKeys.forEach(function (k) { featSet[k] = true; });

  // C0 조인 1:1
  var missing = mdFiles.filter(function (k) { return !featSet[k]; });
  var orphan = featKeys.filter(function (k) { return !mdSet[k]; });
  missing.forEach(function (k) { fails.push({ c: 'C0', t: k, why: '.md 있으나 features160 엔트리 누락' }); });
  orphan.forEach(function (k) { fails.push({ c: 'C0', t: k, why: 'features160 엔트리 있으나 .md 없음(고아)' }); });

  // C0.5 주입 일치: seongjil ⊂ .md 융합문
  featKeys.forEach(function (key) {
    if (!mdSet[key]) return;
    var txt = readMd(mdDir, key);
    ((feats[key] && feats[key].seongjil) || []).forEach(function (s) {
      if (txt === null || txt.indexOf(s) < 0) fails.push({ c: 'C0.5', t: key, why: '.md 융합문에 미반영', sj: s });
    });
  });

  // 오행 그룹핑
  var byOhaeng = {};
  OHAENG_GROUPS.forEach(function (o) { byOhaeng[o] = []; });
  featKeys.forEach(function (key) {
    var o = (feats[key] && feats[key].ohaeng) || (parseName(key) || {}).ohaeng;
    if (byOhaeng[o]) byOhaeng[o].push(key);
  });

  // C3(누수) per-item + 오행별 리포트 / C1(전역 정확중복) — 전 160 풀
  var report = {}, gpool = {};
  OHAENG_GROUPS.forEach(function (o) {
    var keys = byOhaeng[o], lpool = {}, c3 = 0;
    keys.forEach(function (key) {
      ((feats[key] && feats[key].seongjil) || []).forEach(function (s) {
        (gpool[s] = gpool[s] || []).push(key);
        lpool[s] = true;
        var lk = leakHit(s);
        if (lk) { c3++; fails.push({ c: 'C3', t: key, why: '누수 어간 "' + lk.stem + '" ↔ OHAENG "' + lk.ohaengWord + '"', sj: s }); }
      });
    });
    report[o] = { count: keys.length, pool: Object.keys(lpool).length, c3: c3 };
  });
  // C1: 셀(극×오행) 간 HARD 유니크 + 셀 내 최대 3회 캡.
  // 같은 천간/극 공유는 명리상 자연 — per-타입 변별은 성질·특징·근거 + C7(전역변별)이 담당.
  function cellOf(key) { var pn = parseName(key); return pn ? pn.size + pn.ohaeng : '?'; }
  Object.keys(gpool).forEach(function (s) {
    var cells = {};
    gpool[s].forEach(function (key) { var c = cellOf(key); (cells[c] = cells[c] || []).push(key); });
    var cn = Object.keys(cells);
    if (cn.length >= 2) fails.push({ c: 'C1', t: gpool[s].join(','), why: '셀간 중복 ' + cn.join('/'), sj: s });
    cn.forEach(function (c) { if (cells[c].length > 3) fails.push({ c: 'C1', t: cells[c].join(','), why: '셀내 초과 ' + c + ' ' + cells[c].length + '>3', sj: s }); });
  });

  return { featKeys: featKeys, mdFiles: mdFiles, missing: missing, orphan: orphan, fails: fails, warns: warns, report: report };
}

function print(r) {
  console.log('=== seongjil-check (C0·C1·C3 코드 게이트) ===');
  console.log('엔트리 ' + r.featKeys.length + ' / .md ' + r.mdFiles.length + ' (목표 160/160)');
  console.log('\n-- C0 조인 --');
  console.log('  누락(.md only): ' + r.missing.length + (r.missing.length ? ' → ' + r.missing.join(', ') : ''));
  console.log('  고아(feat only): ' + r.orphan.length + (r.orphan.length ? ' → ' + r.orphan.join(', ') : ''));
  console.log('\n-- 오행별 (C1·C3) --');
  OHAENG_GROUPS.forEach(function (o) {
    var x = r.report[o] || { count: 0, pool: 0, c3: 0 };
    console.log('  ' + o + ': 타입 ' + x.count + ' · seongjil ' + x.pool + ' · C3누수 ' + x.c3);
  });
  console.log('  [전역] C1 정확중복: ' + r.fails.filter(function (f) { return f.c === 'C1'; }).length + '건');
  console.log('\n-- FAIL (' + r.fails.length + ') --');
  r.fails.forEach(function (f) { console.log('  [' + f.c + '] ' + f.t + ' :: ' + f.why + (f.sj ? ' :: "' + f.sj + '"' : '')); });
  console.log('-- WARN (' + r.warns.length + ') --');
  r.warns.forEach(function (w) { console.log('  [' + w.c + '] ' + w.o + ' :: "' + w.a + '" ⊂ "' + w.b + '"'); });
  console.log('\n=== ' + (r.fails.length === 0 ? 'C0·C1·C3 ALL PASS' : 'FAIL ' + r.fails.length + '건') + ' ===');
}

if (require.main === module) {
  var featPath = process.argv[2] || path.join(__dirname, '..', '..', 'features160.json');
  var mdDir = process.argv[3] || path.join(__dirname, '..', '..', 'mbts_160');
  var r = run(featPath, mdDir);
  print(r);
  process.exitCode = r.fails.length === 0 ? 0 : 1;
}

module.exports = { stripNominalizer: stripNominalizer, leakHit: leakHit, parseName: parseName, run: run };
