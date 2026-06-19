'use strict';
// 교차슬롯 제목 디덥: out/*.md 제목들을 모아 (1)오프너 중복 (2)모티프 과용을 잡는다.
// 단일 파일 게이트가 구조상 못 보는 '슬롯 간 반복'을 코드로 검출. 사용: node dedup.js <outdir>
var fs = require('fs'), path = require('path');
var dir = process.argv[2];
var files = fs.readdirSync(dir).filter(function (f) { return /\.md$/.test(f) && f !== 'REPORT.md'; });
function titleOf(f) {
  var lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) { if (lines[i].trim()) return lines[i].trim(); }
  return '';
}
var items = files.map(function (f) { return { f: f, t: titleOf(f) }; });
// 1) 오프너(첫 어절) 중복
var byOpener = {};
items.forEach(function (x) { var o = x.t.split(/\s+/)[0]; (byOpener[o] = byOpener[o] || []).push(x.f); });
// 2) 모티프 과용 — 수렴 단골 단어
var MOTIF = ['조용한', '조용히', '혼자', '새벽', '노트북', '관찰', '묵묵', '곱씹', '끝물'];
var motif = {};
MOTIF.forEach(function (m) {
  var hit = items.filter(function (x) { return x.t.indexOf(m) !== -1; });
  if (hit.length >= 2) motif[m] = hit.map(function (x) { return x.f; });
});
console.log('제목 ' + items.length + '개');
console.log('-- 오프너 중복(첫 어절 2+) --');
var anyO = false;
Object.keys(byOpener).forEach(function (o) { if (byOpener[o].length >= 2) { anyO = true; console.log('  [' + o + '] ' + byOpener[o].join(', ')); } });
if (!anyO) console.log('  (없음)');
console.log('-- 모티프 과용(2+ 제목) --');
var anyM = false;
Object.keys(motif).forEach(function (m) { anyM = true; console.log('  [' + m + '] ' + motif[m].join(', ')); });
if (!anyM) console.log('  (없음)');
