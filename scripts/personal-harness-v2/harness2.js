// scripts/personal-harness-v2/harness2.js — 메인 오케스트레이터 (--pilot | --run)
// C20: 전사 턴 단위 append+flush, 저널 재개(완료 스킵·중단분 _aborted 후 재토론).
// D9: T1→T2→T3, 메인5:사이드1 인터리브, 30장 체크포인트(observer·스냅샷·형식 가중).
'use strict';

var fs = require('fs');
var path = require('path');
var tp = require('./transport.js');
var cs = require('./card-sampler.js');
var db = require('./debate.js');
var ar = require('./arbiter/arbiter.js');
var sl = require('./slow-loop.js');
var bg = require('./balance-guard.js');
var ob = require('./observer/observer.js');
var sw = require('./sweep.js');

var STATE = path.join(__dirname, 'state');
var LIB = path.join(__dirname, '..', '..', 'lib');
var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var codes = JSON.parse(fs.readFileSync(path.join(STATE, 'subj_codes.json'), 'utf8'));
var ORDER_T = ['T1', 'T2', 'T3'];
var CP_EVERY = 30;
var INTERLEAVE = 5; // 메인 5 : 사이드 1 (§0-α 기본값)

function now() { return new Date().toISOString().slice(0, 16).replace('T', ' '); }
function aLog(line) { fs.appendFileSync(path.join(STATE, 'auto_decisions.log'), '[' + now() + ']' + line + '\n', 'utf8'); }

function loadJSON(f, dflt) {
  try { return JSON.parse(fs.readFileSync(path.join(STATE, f), 'utf8')); } catch (e) { return dflt; }
}
function saveJSON(f, v) { fs.writeFileSync(path.join(STATE, f), JSON.stringify(v, null, 1), 'utf8'); }

// ── 전사 영속 (C20) — 턴 단위 append + 즉시 flush ──
function tDir(subject) {
  var d = path.join(STATE, 'transcripts', codes[subject] || 'X');
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  return d;
}
function tPath(order) { return path.join(tDir(order.subject), order.order_id + '.jsonl'); }
function appendTurn(order, turn) {
  var fd = fs.openSync(tPath(order), 'a');
  fs.writeSync(fd, JSON.stringify(turn) + '\n');
  fs.fsyncSync(fd); fs.closeSync(fd);
}
function makeCall(order) {
  return function (role, prompt, opts) {
    var r = tp.call(role, prompt, opts);
    appendTurn(order, { at: now(), role: role, model: r.model, tokens: r.tokens, ms: r.ms, text: r.text });
    return r;
  };
}

// ── 체크포인트 ──
function checkpoint(st, recent) {
  st.cpNo = (st.cpNo || 0) + 1;
  try { ob.run(st.cpNo, recent, tp.call); } catch (e) { aLog('[observer 실패 — 비차단] ' + e.message); }
  // 형식 가중 (티어 분포 기반, 하한 10%)
  var byFmt = {};
  st.accepted.forEach(function (p) {
    byFmt[p.format] = byFmt[p.format] || { n: 0, score: 0 };
    byFmt[p.format].n++;
    byFmt[p.format].score += { S: 3, A: 2, B: 1 }[p.tier] || 0;
  });
  var report = ['# 체크포인트 ' + st.cpNo + ' — ' + now(), '',
    '처리 ' + st.processed + '장 / 채택 ' + st.accepted.length + ' / 반려 ' + st.rejected +
    ' / 스킵 ' + st.skipped + ' / TRASH ' + st.trash + ' / C컷 ' + st.dropC,
    '티어: ' + JSON.stringify(tally(st.accepted, 'tier')),
    'impact: ' + JSON.stringify(tally(st.accepted, 'impact')),
    '형식: ' + JSON.stringify(byFmt),
    '채택 풀 strength 분포: ' + JSON.stringify(st.guard.counts || {}),
    '가드 발동: ' + (st.guardFires || 0) + '회 / 쿼터: ' + JSON.stringify(tp.loadQuota())];
  fs.writeFileSync(path.join(STATE, 'reports', 'checkpoint_' + String(st.cpNo).padStart(3, '0') + '.md'),
    report.join('\n'), 'utf8');
  // 스냅샷(디렉토리 사본 — zip 대체)
  var snap = path.join(STATE, 'snapshots', 'cp_' + String(st.cpNo).padStart(3, '0'));
  if (!fs.existsSync(snap)) fs.mkdirSync(snap, { recursive: true });
  ['journal.jsonl', 'accepted.jsonl', 'harness_state.json'].forEach(function (f) {
    var src = path.join(STATE, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(snap, f));
  });
  aLog('[체크포인트 ' + st.cpNo + '] 보고서 저장 — 대기 없이 계속(§0-α)');
}
function tally(arr, key) {
  var t = {};
  arr.forEach(function (p) { t[p[key]] = (t[p[key]] || 0) + 1; });
  return t;
}

// ── 주문서 1장 처리 ──
function processOrder(order, st, isPilot) {
  var call = makeCall(order);
  var sample = cs.sampleCards(order, tdf);
  if (!sample.cards.length) { journal(st, order, 'skip', '보유 카드 0'); return; }
  var corr = sl.correction(st.slow || {});
  var isSweep = order.structure === 'sweep';
  var run = isSweep
    ? db.runSweepDebate(order.parent_mechanism, order.tags, sample.cards, call)
    : (order.structure === 'solo'
      ? db.runSolo(order, sample.cards, sample.twins, call, corr)
      : db.runDebate(order, sample.cards, sample.twins, call, corr));

  var out = run.output;
  // 파생 조건 태그는 치환 조합으로 고정(D11 §4) — LLM 자유 키워드 차단 (코드 강제)
  if (isSweep && out && !out['소멸선언']) out.tags = order.tags.slice();
  var invalid = db.validOutput(out);
  if (invalid && out && out['소멸선언']) invalid = null;
  if (invalid) { decide(st, order, { decision: 'reject', reason: '산출 가드: ' + invalid }, null, isPilot); return; }
  if (out['소멸선언']) {
    journal(st, order, 'extinct', out['사유'] || '소멸 선언');
    sweepResult(st, order, '소멸', null);
    return;
  }
  var verdict = ar.judge(order, out, sample.cards.concat(sample.twins || []), st.accepted, tdf, call);
  // 반려 1회 재토론 → 재반려 = 스킵
  if (verdict.decision === 'reject' && !order._retried) {
    order._retried = true;
    appendTurn(order, { at: now(), role: 'harness', text: '반려 재토론: ' + verdict.reason });
    return processOrder(order, st, isPilot);
  }
  if (verdict.decision === 'reject' && order._retried) verdict = { decision: 'skip', reason: '재반려: ' + verdict.reason };
  decide(st, order, verdict, out, isPilot);
}

function decide(st, order, verdict, out, isPilot) {
  if (verdict.decision === 'accept') {
    var rec = verdict.record;
    st.accepted.push(rec);
    fs.appendFileSync(path.join(STATE, 'accepted.jsonl'), JSON.stringify(rec) + '\n', 'utf8');
    tp.uploadOrDefer(rec);
    bg.onAccept(st.guard, rec.tags);
    journal(st, order, 'accept', verdict.reason + ' [' + rec.tier + '/i' + rec.impact + ']');
    if (order.structure === 'sweep') sweepResult(st, order, '채택', rec.mechanism);
    else if (rec.tier === 'S' && !isPilot) {
      var tr = sw.trigger(rec, tdf, codes, aLog);
      if (tr.queued) aLog('[sweep 충전] ' + rec.id + ' → ' + tr.queued + '장(' + tr.axis + ')');
    }
  } else if (verdict.decision === 'trash') {
    sl.record(st.slow = st.slow || {}, verdict.reason);
    st.trash++; journal(st, order, 'trash', verdict.reason);
  } else if (verdict.decision === 'drop-c') {
    st.dropC++; journal(st, order, 'drop-c', verdict.reason);
  } else if (verdict.decision === 'skip') {
    st.skipped++; journal(st, order, 'skip', verdict.reason);
    if (order.structure === 'sweep') sweepResult(st, order, '스킵', null);
  } else {
    st.rejected++; journal(st, order, 'reject', verdict.reason);
  }
}

function sweepResult(st, order, outcome, mechanism) {
  var sq = sw.loadSweepQueue();
  var fam = sq.families.filter(function (f) { return f.cells.indexOf(order.order_id) >= 0; })[0];
  if (!fam) return;
  fam.results.push({ cell: order.cell, outcome: outcome, mechanism: mechanism });
  fam.done.push(order.order_id);
  var pendingCells = sq.orders.filter(function (o) {
    return fam.cells.indexOf(o.order_id) >= 0 && !o.skipped && fam.done.indexOf(o.order_id) < 0;
  });
  if (!pendingCells.length) {
    var agg = sw.aggregate(fam, tp.call, aLog);
    fam.aggregate = agg.kind;
    if (agg.falsifyVerified) {
      st.accepted.forEach(function (p) { if (p.id === fam.parent) p.falsify_verified = true; });
      aLog('[파생군 전멸] 부모 falsify_verified=true: ' + fam.parent);
    }
    if (agg.resubmit) aLog('[파생군 재심 제출] ' + fam.parent + ' (전부생존+동질)');
  }
  sw.saveSweepQueue(sq);
}

function journal(st, order, decision, reason) {
  st.processed++;
  st.done[order.order_id] = decision;
  fs.appendFileSync(path.join(STATE, 'journal.jsonl'), JSON.stringify({
    at: now(), order_id: order.order_id, subject: order.subject, decision: decision,
    reason: (reason || '').slice(0, 200), format: order.format, structure: order.structure
  }) + '\n', 'utf8');
}

// ── 큐 적재·재개 ──
function loadQueues(pilot) {
  var all = [];
  Object.keys(codes).forEach(function (subj) {
    var q = loadJSON('queue_' + codes[subj] + '.json', null);
    if (q) all.push(q);
  });
  all.sort(function (a, b) { return ORDER_T.indexOf(a.tier) - ORDER_T.indexOf(b.tier); });
  if (pilot) {
    var yad = all.filter(function (q) { return q.code === 'YAD'; })[0];
    var orders = yad.orders.slice(0, 20).map(function (o, i) {
      return Object.assign({}, o, {
        format: ['장면', '쌍둥이대조', '시간서사', '반박라운드', '하이브리드'][i % 5],
        structure: (i % 10) < 5 ? 'debate' : 'solo' // 5형식×2구조×2장
      });
    });
    return orders;
  }
  var flat = [];
  all.forEach(function (q) { q.orders.forEach(function (o) { flat.push(o); }); });
  return flat;
}

function main() {
  var pilot = process.argv.indexOf('--pilot') >= 0;
  var st = loadJSON('harness_state.json', { processed: 0, rejected: 0, skipped: 0, trash: 0, dropC: 0,
    accepted: [], done: {}, guard: {}, slow: {}, cpNo: 0 });
  // 중단분 _aborted 처리 (저널에 없는 전사 = 중단 주문서)
  var queue = loadQueues(pilot);
  queue.forEach(function (o) {
    if (!st.done[o.order_id] && fs.existsSync(tPath(o))) {
      fs.renameSync(tPath(o), tPath(o).replace('.jsonl', '_aborted_' + Date.now() + '.jsonl'));
    }
  });
  var sinceMain = 0;
  try {
    for (var i = 0; i < queue.length; i++) {
      var order = queue[i];
      if (st.done[order.order_id]) continue;
      processOrder(order, st, pilot);
      sinceMain++;
      // 사이드 큐 인터리브 (메인 5 : 사이드 1)
      if (!pilot && sinceMain % INTERLEAVE === 0) {
        var sq = sw.loadSweepQueue();
        var side = sq.orders.filter(function (o2) { return !o2.skipped && !st.done[o2.order_id]; })[0];
        if (side) processOrder(side, st, false);
      }
      if (st.processed > 0 && st.processed % CP_EVERY === 0) {
        var recent = loadJSON('journal_recent_cache.json', []);
        checkpoint(st, readRecentJournal(CP_EVERY));
        // balance-guard 재정렬 (대기 큐)
        var rest = queue.slice(i + 1);
        var sorted = bg.rebalance(st.guard, rest, tdf.df, function (e) {
          st.guardFires = (st.guardFires || 0) + 1; bg.appendBalanceLog(e);
        });
        queue = queue.slice(0, i + 1).concat(sorted);
      }
      saveJSON('harness_state.json', st);
    }
    saveJSON('harness_state.json', st);
    if (pilot) { require('./pilot-report.js').write(st); aLog('[파일럿 완료] 보고서 저장'); }
    console.log((pilot ? '파일럿' : '본 실행') + ' 완료 — 처리 ' + st.processed + ' 채택 ' + st.accepted.length);
    process.exit(0);
  } catch (e) {
    saveJSON('harness_state.json', st);
    if (e && e.code === 'MODEL_UNAVAILABLE') {
      // 하드 정지 2호 — fable 미가용. opus 자동 폴백 금지(C22·§0-α 품질 불변).
      // 코드 9 = launcher 재기동 제외(무한 가짜 reject로 쿼터 태우는 것 방지).
      aLog('[하드 정지 2호] ' + e.message + ' — 코드9 정지. opus 자동 폴백 금지(동진 승인 필요).');
      console.error('HARD-STOP(9): ' + e.message);
      process.exit(9);
    }
    if (e && e.code === 'QUOTA_WAIT') {
      aLog('[rate limit] 저장 후 대기 종료(코드 7) — launcher가 1시간 후 재기동');
      var rl = loadJSON('ratelimit.json', { since: now() });
      saveJSON('ratelimit.json', rl);
      if ((Date.now() - new Date(rl.since.replace(' ', 'T'))) > 24 * 3600 * 1000) {
        aLog('[하드 정지] fable 24시간 미가용 — 코드 9'); process.exit(9);
      }
      process.exit(7);
    }
    aLog('[비정상 종료] ' + (e && e.message)); console.error(e);
    process.exit(1);
  }
}

function readRecentJournal(n) {
  try {
    var lines = fs.readFileSync(path.join(STATE, 'journal.jsonl'), 'utf8').trim().split('\n');
    return lines.slice(-n).map(function (l) { return JSON.parse(l); });
  } catch (e) { return []; }
}

if (require.main === module) main();
module.exports = { processOrder: processOrder, makeCall: makeCall, loadQueues: loadQueues,
  appendTurn: appendTurn, tPath: tPath, journal: journal };
