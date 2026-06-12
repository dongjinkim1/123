// scripts/personal-harness-v2/order-queue.js — D1: 주문서 큐 생성 (코드가 조건·커버리지·희소성 사전 확정)
// 층화(C19) + 공존 샘플링(df<0.45, 2~4태그) + 시기성 앵커(sess/dwss 분담) + 커버리지 시뮬 자동 보정.
// ① 패치: temperament: 대신 kts: 사용, invalid_tags·generic prefix(meta 로드) 후보 제외.
'use strict';

var fs = require('fs');
var path = require('path');

var LIB = path.join(__dirname, '..', '..', 'lib');
var STATE = path.join(__dirname, 'state');
var SEED_BASE = 20260613;
var DF_MAX = 0.45;

var SUBJ14 = ['고쳐야 할 점', '기회의 시기', '나의 성격', '나의 장점', '남들이 보는 나',
  '대운 흐름', '맞춤 재물 쌓는 법', '연애 스타일', '연애 지뢰', '올해 조언',
  '올해 키워드', '인생 한줄 마무리', '잘 맞는 타입', '직장 적성'];
var TIER_OF = {
  '대운 흐름': 'T1', '올해 키워드': 'T1', '올해 조언': 'T1', '기회의 시기': 'T1', '연애 지뢰': 'T1',
  '나의 장점': 'T2', '연애 스타일': 'T2', '인생 한줄 마무리': 'T2', '직장 적성': 'T2',
  '맞춤 재물 쌓는 법': 'T2', '남들이 보는 나': 'T2',
  '잘 맞는 타입': 'T3', '나의 성격': 'T3', '고쳐야 할 점': 'T3'
};
// 앵커 분담 (동진 확정): 올해* = sess / 대운 흐름·기회의 시기 = dwss
var ANCHOR_AXIS = { '올해 키워드': 'sess', '올해 조언': 'sess', '대운 흐름': 'dwss', '기회의 시기': 'dwss' };
var QUEUE_SIZE = { 'T1앵커': 130, 'T1일반': 50, '연애 지뢰': 120, 'T2': 100, 'T3': 50 };
var FORMATS = ['장면', '쌍둥이대조', '시간서사', '반박라운드', '하이브리드'];
var MONITOR_AXES = ['dm', 'kts', 'cf', 'ss'];
var MONITOR_CAP = 0.4;

function mulberry32(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function loadAssets() {
  var tdf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
  var strata = JSON.parse(fs.readFileSync(path.join(STATE, 'strata.json'), 'utf8'));
  var codes = JSON.parse(fs.readFileSync(path.join(STATE, 'subj_codes.json'), 'utf8'));
  return { tdf: tdf, strata: strata, codes: codes };
}

// 후보 태그 필터: generic 제외 + temperament: 제외(kts 대체) + invalid + df 상한
function eligibleTags(u, tdf) {
  var gen = tdf.meta.genericPrefixes;
  var invalid = tdf.meta.invalid_tags || {};
  return u.tags.filter(function (t) {
    if (gen.some(function (g) { return t.indexOf(g) === 0; })) return false;
    if (t.indexOf('temperament:') === 0) return false; // ① 패치 — kts가 대체
    if (invalid[t]) return false;
    if ((tdf.df[t] || 0) >= DF_MAX) return false;
    return true;
  });
}

function strengthCell(u) {
  var g = u.tags.filter(function (t) { return /^strength:(극신강|신강|중화|신약|극신약)$/.test(t); });
  return g.length ? g[0].replace('strength:', '') : '중화';
}

function axisOf(tag) { var i = tag.indexOf(':'); return i > 0 ? tag.slice(0, i) : tag; }

// 모니터 축 40% 상한 검사 — 큐 내 같은 태그값 포함 주문서 비율
function monitorOk(counts, total, tags) {
  for (var i = 0; i < tags.length; i++) {
    var t = tags[i];
    if (MONITOR_AXES.indexOf(axisOf(t)) < 0) continue;
    if (total > 10 && ((counts[t] || 0) + 1) / (total + 1) > MONITOR_CAP) return false;
  }
  return true;
}

function support(users, tags) {
  var n = 0;
  for (var i = 0; i < users.length; i++) {
    var set = users[i]._set;
    var all = true;
    for (var j = 0; j < tags.length; j++) if (!set[tags[j]]) { all = false; break; }
    if (all) n++;
  }
  return n;
}

// 주문서 1장 생성: 층화 칸에서 시드 유저 → 보유 태그 조합 2~4개 (공존 보장)
function drawOrder(rnd, pool, tdf, counts, total, anchorTag, fixedWant) {
  for (var attempt = 0; attempt < 100; attempt++) {
    var u = pool[Math.floor(rnd() * pool.length)];
    var elig = eligibleTags(u, tdf);
    if (anchorTag) {
      if (u._set[anchorTag]) elig = elig.filter(function (t) { return t !== anchorTag; });
      else continue; // 앵커 미보유 유저 — 재추첨
    }
    if (elig.length < (anchorTag ? 1 : 2)) continue;
    var want = fixedWant != null ? fixedWant
      : (anchorTag ? 1 : 2) + Math.floor(rnd() * (anchorTag ? 3 : 3)); // 일반 2~4, 앵커 1~3(+앵커=2~4)
    want = Math.min(want, elig.length);
    var picked = [];
    var idxs = elig.slice();
    for (var k = 0; k < want; k++) {
      var pi = Math.floor(rnd() * idxs.length);
      picked.push(idxs.splice(pi, 1)[0]);
    }
    var tags = anchorTag ? [anchorTag].concat(picked) : picked;
    if (tags.length < 2 || tags.length > 4) continue;
    if (!monitorOk(counts, total, tags)) continue;
    return { tags: tags, seedCell: strengthCell(u) };
  }
  return null;
}

// 커버리지 시뮬 — 큐를 가상 패턴으로 보고 "태그 전부 보유(풀매치) 주문서 ≥2" 유저 비율
function coverage(users, orders) {
  var ge2 = 0;
  for (var i = 0; i < users.length; i++) {
    var hit = 0;
    for (var j = 0; j < orders.length; j++) {
      var tags = orders[j].tags, all = true;
      for (var k = 0; k < tags.length; k++) if (!users[i]._set[tags[k]]) { all = false; break; }
      if (all && ++hit >= 2) break;
    }
    if (hit >= 2) ge2++;
  }
  return ge2 / users.length;
}

function buildSubjectQueue(subject, assets, sizeOverride) {
  var tdf = assets.tdf, strata = assets.strata.할당, codes = assets.codes;
  if (SUBJ14.indexOf(subject) < 0) throw new Error('SUBJ 14키 불일치: "' + subject + '" — 즉시 중단(C10)');
  var rnd = mulberry32(SEED_BASE + SUBJ14.indexOf(subject) * 101);
  var users = tdf.users;
  users.forEach(function (u) {
    if (!u._set) { u._set = {}; u.tags.forEach(function (t) { u._set[t] = 1; }); }
  });

  // 층화 풀 (strength 칸별 유저)
  var cellPool = {};
  Object.keys(strata).forEach(function (c) { cellPool[c] = users.filter(function (u) { return strengthCell(u) === c; }); });

  var orders = [];
  var counts = {}; // 모니터 축 태그 카운트
  var code = codes[subject];
  var seq = 0;

  function push(o, kind, anchorTag) {
    seq++;
    var id = code + '-' + String(seq).padStart(3, '0');
    orders.push({
      order_id: id, pattern_id: 'H2-' + code + '-' + String(seq).padStart(3, '0'),
      subject: subject, tier: TIER_OF[subject], kind: kind, anchor: anchorTag || null,
      tags: o.tags, support: support(users, o.tags), strataCell: o.seedCell,
      format: FORMATS[(seq - 1) % FORMATS.length],
      structure: 'debate'
    });
    o.tags.forEach(function (t) { if (MONITOR_AXES.indexOf(axisOf(t)) >= 0) counts[t] = (counts[t] || 0) + 1; });
  }

  // 1. 앵커 (시기성 4종) — 서랍 10 × 13장
  var anchorAxis = ANCHOR_AXIS[subject];
  if (anchorAxis) {
    var drawers = tdf.vocab[anchorAxis];
    drawers.forEach(function (dtag) {
      for (var i = 0; i < Math.ceil(QUEUE_SIZE['T1앵커'] / drawers.length); i++) {
        var o = drawOrder(rnd, users, tdf, counts, orders.length, dtag);
        if (o) push(o, 'anchor', dtag);
      }
    });
  }

  // 2. 일반 — 층화 칸 비례
  var generalTarget = sizeOverride != null ? sizeOverride
    : anchorAxis ? QUEUE_SIZE['T1일반']
      : subject === '연애 지뢰' ? QUEUE_SIZE['연애 지뢰']
        : TIER_OF[subject] === 'T2' ? QUEUE_SIZE['T2'] : QUEUE_SIZE['T3'];
  Object.keys(strata).forEach(function (cell) {
    var n = Math.round(generalTarget * strata[cell]);
    for (var i = 0; i < n; i++) {
      var o = drawOrder(rnd, cellPool[cell].length ? cellPool[cell] : users, tdf, counts, orders.length, null);
      if (o) { o.seedCell = cell; push(o, 'general', null); }
    }
  });

  // 3. 커버리지 자동 보정 — ≥2 풀매치 유저 ≥95%까지 2태그 주문서 추가(커버 효율 최대, 상한 +120)
  var cov = coverage(users, orders);
  var added = 0;
  while (cov < 0.95 && added < 120) {
    var uncovered = users.filter(function (u) {
      var hit = 0;
      for (var j = 0; j < orders.length; j++) {
        var all = orders[j].tags.every(function (t) { return u._set[t]; });
        if (all && ++hit >= 2) break;
      }
      return hit < 2;
    });
    if (!uncovered.length) break;
    var o2 = drawOrder(rnd, uncovered, tdf, counts, orders.length, null, 2);
    if (!o2) break;
    push(o2, 'coverage-fill', null);
    added++;
    cov = coverage(users, orders);
  }

  return { subject: subject, tier: TIER_OF[subject], code: code, coverage: +cov.toFixed(4),
    coverageFill: added, orders: orders };
}

function generateAll() {
  var assets = loadAssets();
  var summary = [];
  SUBJ14.forEach(function (subject) {
    var q = buildSubjectQueue(subject, assets);
    fs.writeFileSync(path.join(STATE, 'queue_' + assets.codes[subject] + '.json'),
      JSON.stringify(q, null, 1), 'utf8');
    summary.push(q.code + ' ' + subject + ' [' + q.tier + '] ' + q.orders.length +
      '장 (커버리지 ' + (q.coverage * 100).toFixed(1) + '%, 보정 +' + q.coverageFill + ')');
  });
  return summary;
}

module.exports = { buildSubjectQueue: buildSubjectQueue, generateAll: generateAll,
  loadAssets: loadAssets, eligibleTags: eligibleTags, SUBJ14: SUBJ14, TIER_OF: TIER_OF,
  ANCHOR_AXIS: ANCHOR_AXIS, FORMATS: FORMATS, SEED_BASE: SEED_BASE };

if (require.main === module) {
  var s = generateAll();
  console.log(s.join('\n'));
}
