// reception.js — 수용층 융합 v2 (PLACEMENT-RECV-FUSION-v2). sweep의 형제(채택 후 파생).
// 부모(사주단독 S/A) 1 → MBTI cf 유형별 수용 변형 N. arbiter/card-sampler 재사용(무수정).
// 1단계 계약: MBTI축=cf:만 / 사건코어=production buildUserTags 방출 사주태그만(dwss/sess/yongshin_el 제외)
//   / id=H2-{CODE}-{seq}(arbiter 정규식) / 출력=production 8필드, mbti는 ": " 시작.
'use strict';
var fs = require('fs');
var path = require('path');
var P = require('./prompts/reception-prompts.js');
var cs = require('./card-sampler.js');
var ar = require('./arbiter/arbiter.js');

var STATE = process.env.H2_STATE ? path.resolve(process.env.H2_STATE) : path.join(__dirname, 'state');
var FLOOR = 8;                       // support 바닥(모집단 1%)
// production buildUserTags(:12631~)가 *유저에게 방출하는* 사주 네임스페이스만. dwss/sess/yongshin_el=미방출→매칭0.
var EMITTED_SAJU = /^(strength|gyeokguk|condition|ss|pillar|unsung|sinsal|relation|tongbyeon|yongshin|yongshin_type|dm):/;
var MBTI_TAG = /^(cf|fx|kts|ei|temperament):/; // temperament: 포함 — MBTI 그레인 있는 패턴은 사주단독 아님(검증자 권고)
var TIER_RANK = { S: 0, A: 1, B: 2 };

function hasMbtiTag(tags) { return (tags || []).some(function (t) { return MBTI_TAG.test(t); }); }

function holders(tdf, tags) {
  var n = 0;
  tdf.users.forEach(function (u) {
    if (!u._set) { u._set = {}; u.tags.forEach(function (t) { u._set[t] = 1; }); }
    if (tags.every(function (t) { return u._set[t]; })) n++;
  });
  return n;
}

// 사건 코어 = 방출 사주태그 중 support 최대 2태그. 방출 사주태그 <2면 null(분할 불가 = production 매칭 불가).
function pickCore(tags, tdf) {
  var saju = (tags || []).filter(function (t) { return EMITTED_SAJU.test(t); });
  if (saju.length < 2) return null;
  var best = null, bestSup = -1;
  for (var i = 0; i < saju.length; i++) for (var j = i + 1; j < saju.length; j++) {
    var sup = holders(tdf, [saju[i], saju[j]]);
    if (sup > bestSup) { bestSup = sup; best = [saju[i], saju[j]]; }
  }
  return best;
}

function loadQueue() { try { return JSON.parse(fs.readFileSync(path.join(STATE, 'reception_queue.json'), 'utf8')); } catch (e) { return { seq: 9000, orders: [], done: [] }; } }
function saveQueue(q) { fs.writeFileSync(path.join(STATE, 'reception_queue.json'), JSON.stringify(q, null, 1), 'utf8'); }

// 트리거 — 부모 1건 사이드큐 적재(중복 가드).
function trigger(parent, log) {
  var q = loadQueue();
  if (q.orders.some(function (o) { return o.parentId === parent.id; })) { if (log) log('[reception] 기적재 부모: ' + parent.id); return { queued: 0 }; }
  q.orders.push({ parentId: parent.id, parent: parent, structure: 'reception' });
  saveQueue(q);
  return { queued: 1 };
}

// 부모 1 → 변형 N. accepted = 기존 풀(dedup용). 반환: production 8필드 레코드 배열(빈 배열 = 분할 안 됨, 정상).
function run(parent, tdf, callFn, accepted, log) {
  log = log || function () {};
  accepted = accepted || [];
  if (hasMbtiTag(parent.tags)) { log('[reception] 사주단독 아님 — 스킵: ' + parent.id); return []; }

  var core = pickCore(parent.tags, tdf);
  if (!core) { log('[reception] 방출 사주태그 <2(production 매칭 불가) — 스킵: ' + parent.id); return []; }

  var cards0 = cs.sampleCards({ order_id: 'RCV-' + parent.id, subject: parent.subject, tags: core, format: '장면' }, tdf).cards;
  if (!cards0.length) { log('[reception] 코어 카드 0 — 스킵: ' + parent.id); return []; }

  // ① 수용 갈래 판정 (perceiving/judging/none)
  var ax = (callFn('reception-axis', P.axisPrompt(parent, core, cards0), { expectJson: true }).json) || {};
  if (['perceiving', 'judging'].indexOf(ax.axis) < 0) { log('[reception] 축=' + ax.axis + '(무관) — 분할 안 함: ' + parent.id); return []; }
  var values = ax.axis === 'perceiving' ? P.CF_PERCEIVING : P.CF_JUDGING;

  // support floor — 실존 cf 값만
  var cells = values.map(function (v) { var t = core.concat([v]); return { value: v, tags: t, support: holders(tdf, t) }; }).filter(function (c) { return c.support >= FLOOR; });
  if (cells.length < 2) { log('[reception] floor 통과 cf값 <2 — 분할 안 함: ' + parent.id); return []; }

  // ② cf값별 수용 변형 생성 (production 필드)
  var gen = (callFn('reception-gen', P.ladderPrompt(parent, core, cells.map(function (c) { return c.value; }), cells), { expectJson: true }).json) || {};
  var variants = (gen.variants || []).filter(function (v) { return cells.some(function (c) { return c.value === v.value; }); });
  variants.forEach(function (v) {
    v.tags = core.concat([v.value]);
    v.support = (cells.filter(function (c) { return c.value === v.value; })[0] || {}).support;
    if (!/^\s*:/.test(String(v.mbti || ''))) v.mbti = ': ' + String(v.mbti || '').trim(); // production 렌더 계약(": " 시작)
  });
  if (variants.length < 2) { log('[reception] 생성 변형 <2 — 스킵: ' + parent.id); return []; }

  // ③ 칸별 순차 판정 (arbiter 재사용 — tier/impact만 차용, 레코드는 production 8필드로 자체 구성)
  var q = loadQueue();
  var code = (parent.id.split('-')[1] || 'XXX');
  var pool = accepted.slice(); // sibling dedup: 채택분 누적
  var judged = [];
  variants.forEach(function (v) {
    q.seq = (q.seq || 9000) + 1;
    var pid = 'H2-' + code + '-' + q.seq; // arbiter /^H2-[A-Z]{3}-\d{3,}$/
    var jOrder = { order_id: 'RCV-' + code + '-' + q.seq, pattern_id: pid, subject: parent.subject, tags: v.tags, format: '파생', structure: 'reception', derived_from: parent.id };
    var out = { name: v.name, mechanism: v.cross, scene: '', falsify: v.falsify, tags: v.tags }; // arbiter는 cross를 mechanism으로 평가
    var sample = cs.sampleCards(jOrder, tdf);
    var verdict;
    try { verdict = ar.judge(jOrder, out, sample.cards.concat(sample.twins || []), pool, tdf, callFn); }
    catch (e) { verdict = { decision: 'error', reason: String(e && e.message || e) }; }
    if (verdict.decision === 'accept' && verdict.record && TIER_RANK[verdict.record.tier] != null) {
      pool.push(verdict.record);
      judged.push({ v: v, tier: verdict.record.tier, impact: verdict.record.impact, pid: pid });
    } else {
      log('[reception] ' + v.value + ' → ' + verdict.decision + ' (' + (verdict.reason || '').slice(0, 50) + ')');
    }
  });
  saveQueue(q);
  if (judged.length < 2) { log('[reception] 통과 변형 <2 — 분할 안 함: ' + parent.id); return []; }

  // ④ 트윈게이트 — 같게 받는(병렬) 쌍 병합
  var tw = (callFn('reception-twin', P.twinPrompt(judged.map(function (j) { return j.v; })), { expectJson: true }).json) || {};
  var drop = {};
  (tw.redundant_groups || []).forEach(function (g) {
    if (!g || g.length < 2) return;
    var keep = g.slice().sort(function (a, b) { return (TIER_RANK[judged[a].tier] - TIER_RANK[judged[b].tier]) || (judged[b].v.support - judged[a].v.support); })[0];
    g.forEach(function (i) { if (i !== keep) drop[i] = 1; });
  });
  var kept = judged.filter(function (j, i) { return !drop[i]; });

  // ★ 코어 변별 게이트: 최종 <2 = 유형 변별 없음 → 분할 안 됨(정상). 부모 스킵.
  if (kept.length < 2) { log('[reception] 트윈게이트 후 <2(병렬) — 분할 안 함: ' + parent.id); return []; }

  return kept.map(function (j) {
    return {
      id: j.pid, tier: j.tier, name: j.v.name, tags: j.v.tags,
      saju: j.v.saju, mbti: j.v.mbti, cross: j.v.cross, impact: j.impact,
      subject: parent.subject, reception_of: parent.id // reception_of=내부(production 미수출 가능)
    };
  });
}

module.exports = { trigger: trigger, run: run, pickCore: pickCore, hasMbtiTag: hasMbtiTag, holders: holders, loadQueue: loadQueue, saveQueue: saveQueue, FLOOR: FLOOR, EMITTED_SAJU: EMITTED_SAJU };
