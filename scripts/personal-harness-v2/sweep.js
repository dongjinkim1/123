// scripts/personal-harness-v2/sweep.js — D11: S급 파생 스윕 (falsify '선언'→'실측' 전환)
// 1세대만(연쇄 금지). 축 식별 실패=스킵(강제 선정 금지 — 함정a). 파생 판정은 일반과 완전 동일.
// ① 패치: temperament 축은 kts: prefix 사용.
'use strict';

var fs = require('fs');
var path = require('path');
var STATE = path.join(__dirname, 'state');
var SWEEP_TIER_MIN = 'S'; // A 확장은 자동 변경 금지(§0-α — 귀가 후 결정)

// falsify 서술 → 축 식별 (서술 내 첫 등장 위치 기준 — 복수 축은 첫 축만+잔여 로그)
var AXIS_PATTERNS = [
  { axis: 'strength', re: /극신강|극신약|신강|신약|중화/ },
  { axis: 'cf', re: /\b(Ni|Ne|Si|Se|Ti|Te|Fi|Fe)\b/ },
  { axis: 'kts', re: /\b(NF|NT|SJ|SP)\b|기질/ },
  { axis: 'dwss', re: /대운/ },
  { axis: 'sess', re: /세운|올해의? 운|올해 운/ },
  { axis: 'yongshin_el', re: /용신/ }
];

function parseFalsifyAxis(falsify) {
  var hits = [];
  AXIS_PATTERNS.forEach(function (ap) {
    var m = ap.re.exec(falsify || '');
    if (m) hits.push({ axis: ap.axis, pos: m.index });
  });
  hits.sort(function (a, b) { return a.pos - b.pos; });
  if (!hits.length) return { axis: null, rest: [] };
  return { axis: hits[0].axis, rest: hits.slice(1).map(function (h) { return h.axis; }) };
}

// 축별 파생 칸 정의 (부모 값 제외, 3~5장 — 자동 결정·결정적)
var CF_NEIGHBOR = { Ni: ['Ne', 'Si', 'Se'], Ne: ['Ni', 'Se', 'Si'], Si: ['Se', 'Ni', 'Ne'], Se: ['Si', 'Ne', 'Ni'],
  Ti: ['Te', 'Fi', 'Fe'], Te: ['Ti', 'Fe', 'Fi'], Fi: ['Fe', 'Ti', 'Te'], Fe: ['Fi', 'Te', 'Ti'] };
var SS_GROUP_REP = { '비견': ['식신', '편재', '편관', '편인'], '겁재': ['상관', '정재', '정관', '정인'],
  '식신': ['비견', '편재', '편관', '편인'], '상관': ['겁재', '정재', '정관', '정인'],
  '편재': ['비견', '식신', '편관', '편인'], '정재': ['겁재', '상관', '정관', '정인'],
  '편관': ['비견', '식신', '편재', '편인'], '정관': ['겁재', '상관', '정재', '정인'],
  '편인': ['비견', '식신', '편재', '편관'], '정인': ['겁재', '상관', '정재', '정관'] };

function sweepCells(axis, parentTag) {
  var val = parentTag.split(':')[1];
  if (axis === 'strength') {
    return ['극신강', '신강', '중화', '신약', '극신약'].filter(function (v) { return v !== val; })
      .map(function (v) { return 'strength:' + v; });
  }
  if (axis === 'cf') return (CF_NEIGHBOR[val] || []).map(function (v) { return 'cf:' + v; });
  if (axis === 'kts') return ['NF', 'NT', 'SJ', 'SP'].filter(function (v) { return v !== val; })
    .map(function (v) { return 'kts:' + v; });
  if (axis === 'dwss' || axis === 'sess') {
    return (SS_GROUP_REP[val] || []).map(function (v) { return axis + ':' + v; });
  }
  if (axis === 'yongshin_el') return ['목', '화', '토', '금', '수'].filter(function (v) { return v !== val; })
    .map(function (v) { return 'yongshin_el:' + v; });
  return [];
}

function holders(tdf, tags) {
  var n = 0;
  tdf.users.forEach(function (u) {
    if (!u._set) { u._set = {}; u.tags.forEach(function (t) { u._set[t] = 1; }); }
    if (tags.every(function (t) { return u._set[t]; })) n++;
  });
  return n;
}

// 트리거 → 파생 주문서 생성 (사이드 큐 적재). 반환: {queued, skipped, reason?}
function trigger(parentRecord, tdf, codes, log) {
  if (parentRecord.tier !== SWEEP_TIER_MIN) return { queued: 0, reason: 'tier≠S' };
  if (parentRecord.derived_from) return { queued: 0, reason: '1세대 가드 — 파생 재트리거 금지' };
  var parsed = parseFalsifyAxis(parentRecord.falsify);
  if (!parsed.axis) { log('[sweep] 축 식별 실패 — 스킵: ' + parentRecord.id); return { queued: 0, reason: '축 식별 실패' }; }
  if (parsed.rest.length) log('[sweep] 복수 축 — 첫 축 ' + parsed.axis + ' 채택, 잔여 ' + parsed.rest.join(','));
  var parentTag = parentRecord.tags.filter(function (t) { return t.indexOf(parsed.axis + ':') === 0; })[0];
  if (!parentTag) { log('[sweep] 부모 태그에 축 부재(' + parsed.axis + ') — 스킵: ' + parentRecord.id); return { queued: 0, reason: '부모 태그에 축 없음' }; }

  var sq = loadSweepQueue();
  var code = codes[parentRecord.subject];
  var family = { parent: parentRecord.id, axis: parsed.axis, subject: parentRecord.subject,
    cells: [], done: [], results: [] };
  var queued = 0;
  sweepCells(parsed.axis, parentTag).slice(0, 5).forEach(function (cell) {
    var newTags = parentRecord.tags.map(function (t) { return t === parentTag ? cell : t; });
    var sup = holders(tdf, newTags);
    sq.seq = (sq.seq || 500) + 1;
    var entry = {
      order_id: code + '-S' + sq.seq, pattern_id: 'H2-' + code + '-' + sq.seq,
      subject: parentRecord.subject, tier: 'SWEEP', kind: 'sweep', format: '파생',
      structure: 'sweep', tags: newTags, support: sup, cell: cell,
      derived_from: parentRecord.id, sweep_axis: parsed.axis,
      parent_mechanism: parentRecord.mechanism, // 토론 입력 — name/scene/falsify/tier 미주입(D11 §5)
      exists: sup > 0
    };
    family.cells.push(entry.order_id);
    if (!sup) { entry.skipped = '실존없음'; family.results.push({ cell: cell, outcome: '실존없음' }); }
    else queued++;
    sq.orders.push(entry);
  });
  sq.families.push(family);
  saveSweepQueue(sq);
  return { queued: queued, axis: parsed.axis };
}

// 파생군 집계 (전 칸 완료 시) — 전멸/전부생존/혼재
function aggregate(family, callFn, log) {
  var outcomes = family.results.map(function (r) { return r.outcome; });
  var real = outcomes.filter(function (o) { return o !== '실존없음'; });
  if (!real.length) return { kind: 'all-nonexistent' };
  if (real.every(function (o) { return o === '소멸'; })) {
    return { kind: 'extinct-all', falsifyVerified: true }; // 부모 falsify_verified=true 역기록
  }
  if (real.every(function (o) { return o === '채택'; })) {
    var mechs = family.results.filter(function (r) { return r.mechanism; })
      .map(function (r) { return '[' + r.cell + '] ' + r.mechanism; }).join('\n');
    var r = callFn('homogeneity',
      '파생군 동질성 검사: 아래 조건별 mechanism들이 실질적으로 구분되는가. {"distinct":true|false,"reason":"1줄"} JSON만.\n\n' + mechs,
      { expectJson: true });
    var distinct = r.json && r.json.distinct;
    if (!distinct) {
      log('[sweep] 전부생존+동질 → 파생군 전체(부모 포함) 재심 제출: ' + family.parent);
      return { kind: 'all-survive-homogeneous', resubmit: true };
    }
    return { kind: 'all-survive-distinct' };
  }
  return { kind: 'mixed-ladder' }; // 정상 — 강도 사다리
}

function loadSweepQueue() {
  try { return JSON.parse(fs.readFileSync(path.join(STATE, 'sweep_queue.json'), 'utf8')); }
  catch (e) { return { seq: 500, orders: [], families: [] }; }
}
function saveSweepQueue(sq) {
  fs.writeFileSync(path.join(STATE, 'sweep_queue.json'), JSON.stringify(sq, null, 1), 'utf8');
}

module.exports = { parseFalsifyAxis: parseFalsifyAxis, sweepCells: sweepCells, trigger: trigger,
  aggregate: aggregate, loadSweepQueue: loadSweepQueue, saveSweepQueue: saveSweepQueue,
  holders: holders, SWEEP_TIER_MIN: SWEEP_TIER_MIN };
