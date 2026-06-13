// 병렬 워커 종료 후 accepted 병합 — 소주제 비중첩이라 단순 union(dedup 불요).
// harness_state.json.accepted를 정본으로(falsify_verified 등 인메모리 플래그 포함).
// 사용: node merge-accepted.js [state state_w2 state_w3]
'use strict';
var fs = require('fs');
var path = require('path');
var BASE = __dirname;
var dirs = process.argv.slice(2);
if (!dirs.length) dirs = ['state', 'state_w2', 'state_w3'];

var all = [], seen = {}, perWorker = {}, perSubj = {}, collisions = [];
dirs.forEach(function (d) {
  var hs;
  try { hs = JSON.parse(fs.readFileSync(path.join(BASE, d, 'harness_state.json'), 'utf8')); }
  catch (e) { console.log('  (skip ' + d + ' — harness_state 없음)'); return; }
  var acc = hs.accepted || [];
  perWorker[d] = acc.length;
  acc.forEach(function (p) {
    if (seen[p.id]) { collisions.push(p.id + ' [' + d + ']'); return; } // 소주제 비중첩이면 발생 0이어야 함
    seen[p.id] = 1; all.push(p);
    perSubj[p.subject] = (perSubj[p.subject] || 0) + 1;
  });
});

var outPath = path.join(BASE, 'state', 'merged_pool.jsonl');
fs.writeFileSync(outPath, all.map(function (p) { return JSON.stringify(p); }).join('\n') + '\n', 'utf8');
console.log('병합 완료: ' + all.length + '개 → state/merged_pool.jsonl');
console.log('워커별: ' + JSON.stringify(perWorker));
console.log('소주제별: ' + JSON.stringify(perSubj));
if (collisions.length) {
  console.log('⚠ id 충돌 ' + collisions.length + '건 (소주제 중첩 의심): ' + collisions.slice(0, 10).join(', '));
  process.exit(1);
}
console.log('id 충돌 0 — 병합 무결. ③ 인계 소스 = merged_pool.jsonl');
