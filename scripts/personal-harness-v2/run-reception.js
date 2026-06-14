// run-reception.js — 수용층 융합 v2 전용 패스 (harness2.js 무수정 = 라이브 오케스트레이터 무영향).
// 기존 채택 풀의 *사주단독 S/A* 패턴을 읽어 MBTI cf 유형별 수용 변형으로 편다.
// 안전: 출력은 별 파일(reception_out.jsonl) — live accepted.jsonl 오염 0. --apply 시에만 합류(기본 미적용).
// 사용: node run-reception.js [--limit N] [--state DIR] [--apply]
'use strict';
var fs = require('fs');
var path = require('path');
var rc = require('./reception.js');
var tp = require('./transport.js');

var ARG = process.argv;
function flag(n) { return ARG.indexOf(n) >= 0; }
function val(n, d) { var i = ARG.indexOf(n); return (i >= 0 && ARG[i + 1]) ? ARG[i + 1] : d; }

var SHARED = path.join(__dirname, 'state');
var STATE = process.env.H2_STATE ? path.resolve(process.env.H2_STATE) : SHARED;
if (!fs.existsSync(STATE)) fs.mkdirSync(STATE, { recursive: true });
var LIMIT = parseInt(val('--limit', '0'), 10) || 0; // 0 = 전부
var APPLY = flag('--apply');
var tdf = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'lib', 'tag-df.json'), 'utf8'));

function log(s) { console.log(s); fs.appendFileSync(path.join(STATE, 'reception_run.log'), '[' + new Date().toISOString().slice(0, 16).replace('T', ' ') + '] ' + s + '\n', 'utf8'); }

// 기존 채택 로드 (워커 3개 합본) — 부모 후보 + dedup 풀
function loadAccepted() {
  var all = [];
  ['state', 'state_w2', 'state_w3'].forEach(function (d) {
    var f = path.join(__dirname, d, 'accepted.jsonl');
    try { fs.readFileSync(f, 'utf8').split('\n').forEach(function (l) { if (l.trim()) try { all.push(JSON.parse(l)); } catch (e) { } }); } catch (e) { }
  });
  return all;
}

function main() {
  var accepted = loadAccepted();
  var parents = accepted.filter(function (p) {
    return (p.tier === 'S' || p.tier === 'A') && !p.derived_from && !rc.hasMbtiTag(p.tags) && rc.pickCore(p.tags, tdf);
  });
  if (LIMIT) parents = parents.slice(0, LIMIT);
  log('수용분할 대상 부모: ' + parents.length + '개 (사주단독 S/A + 방출 사주태그≥2). apply=' + APPLY);

  var outPath = path.join(STATE, 'reception_out.jsonl');
  var pool = accepted.slice(); // dedup 누적(기존 풀 + 신규 변형)
  var made = 0, skipped = 0, byTier = {};
  parents.forEach(function (parent, i) {
    var recs;
    try { recs = rc.run(parent, tdf, tp.call, pool, log); }
    catch (e) { log('[ERR] ' + parent.id + ' — ' + (e && e.message)); recs = []; }
    if (!recs.length) { skipped++; return; }
    recs.forEach(function (r) {
      fs.appendFileSync(outPath, JSON.stringify(r) + '\n', 'utf8');
      pool.push({ id: r.id, subject: r.subject, tags: r.tags, name: r.name, mechanism: r.cross }); // dedup용 최소형
      byTier[r.tier] = (byTier[r.tier] || 0) + 1;
      made++;
    });
    log('[' + (i + 1) + '/' + parents.length + '] ' + parent.id + ' → ' + recs.length + '변형 (' + recs.map(function (r) { return r.tags.filter(function (t) { return /^cf:/.test(t); })[0].split(':')[1] + ':' + r.tier; }).join(' ') + ')');
  });

  log('완료: 부모 ' + parents.length + ' → 변형 ' + made + '개 (' + JSON.stringify(byTier) + ') / 분할안됨 ' + skipped);
  log('출력: ' + outPath + (APPLY ? ' (+ live accepted 합류)' : ' (별 파일 — 검토 후 --apply로 합류)'));
  if (APPLY) {
    var live = path.join(SHARED, 'accepted.jsonl');
    fs.readFileSync(outPath, 'utf8').split('\n').forEach(function (l) { if (l.trim()) fs.appendFileSync(live, l + '\n', 'utf8'); });
    log('live accepted.jsonl 합류 완료.');
  }
  console.log('쿼터: ' + tp.loadQuota().calls + '콜');
}
main();
