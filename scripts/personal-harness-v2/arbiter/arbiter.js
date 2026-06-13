// arbiter/arbiter.js — D4: 판정자 1인 통합 (접지 3중 + tier·impact + dedup prefilter + 파생군 규칙)
// 적재 컷 = S/A/B (C18). 캘리브레이션 = 기존 풀 동일 저울(C14). 기존 344 인덱스 prefilter 포함(C15).
'use strict';

var fs = require('fs');
var path = require('path');
var lookup = require('./theory-lookup.js');

var STATE = path.join(__dirname, '..', 'state');
var calib = JSON.parse(fs.readFileSync(path.join(STATE, 'calibration.json'), 'utf8'));
var premiumIndex = JSON.parse(fs.readFileSync(path.join(STATE, 'premium_index.json'), 'utf8'));

var TIERS = ['S', 'A', 'B', 'C', 'TRASH'];
var LOAD_CUT = { S: 1, A: 1, B: 1 }; // C18 — C·TRASH 미적재

function tagOverlap(a, b) {
  var set = {}, n = 0;
  a.forEach(function (t) { set[t] = 1; });
  b.forEach(function (t) { if (set[t]) n++; });
  return n;
}

// dedup prefilter (C3·C15): 같은 소주제 + 태그 2+ 공유 — 기채택 전수 + 기존 premium 336
function prefilter(subject, tags, accepted) {
  var cands = [];
  accepted.forEach(function (p) {
    if (p.subject === subject && tagOverlap(p.tags, tags) >= 2) {
      cands.push({ id: p.id, body: p.name + ' :: ' + p.mechanism, origin: 'new' });
    }
  });
  premiumIndex.forEach(function (p) {
    if (p.subject === subject && tagOverlap(p.tags, tags) >= 2) {
      cands.push({ id: p.id, body: p.name + ' :: ' + (p.cross || '').slice(0, 300), origin: 'legacy' });
    }
  });
  return cands.slice(0, 12);
}

// 카드 실보유 태그 검증 (D6 — 교체는 카드 보유 어휘 내에서만)
function tagsValid(outTags, cards) {
  if (!Array.isArray(outTags) || outTags.length < 2 || outTags.length > 4) return false;
  var union = {};
  cards.forEach(function (c) { c.tags.forEach(function (t) { union[t] = 1; }); });
  return outTags.every(function (t) { return union[t]; });
}

function recalcSupport(tags, tdf) {
  var n = 0;
  tdf.users.forEach(function (u) {
    if (!u._set) { u._set = {}; u.tags.forEach(function (t) { u._set[t] = 1; }); }
    if (tags.every(function (t) { return u._set[t]; })) n++;
  });
  return n;
}

function judgePrompt(order, output, cands, theoryExcerpt) {
  return '너는 패턴 품질 판정자다. 기존 풀과 같은 저울로 채점하라.\n\n' +
    '# 캘리브레이션 (기존 premium ' + calib['기준'] + ')\n' +
    'tier 분포: ' + JSON.stringify(calib.tier) + ' / impact 평균 ' + calib['impact_평균'] +
    ', 분포 ' + JSON.stringify(calib['impact_분포']) + '\n\n' +
    '# 후보 패턴\n소주제: ' + order.subject + '\n조건: [' + output.tags.join(' + ') + ']\n' +
    'name: ' + output.name + '\nmechanism: ' + output.mechanism + '\nscene(장식 — 주장 아님): ' +
    (output.scene || '') + '\nfalsify: ' + output.falsify + '\n\n' +
    '# 이론 사전 발췌 (체계 밖 의미 부여=드리프트 → 반려)\n' + (theoryExcerpt || '(발췌 없음)') + '\n\n' +
    (cands.length ? '# 중복 의심 후보 (mechanism 실질 동일 여부 판단)\n' +
      cands.map(function (c) { return c.id + ' [' + c.origin + ']: ' + c.body; }).join('\n') + '\n\n' : '') +
    '# 판정 기준\n반려 사유 축: 병렬(두 체계 나열만) / 평면(조건 없는 일반론) / 바넘(falsify가 반대 조건에서도 성립) / 드리프트(체계 밖 의미).\n' +
    'tier: S(확신·고품질)~B(평균)~C(바넘 경계)~TRASH. impact(1~10 정수): 유저 의사결정·행동에 미치는 영향 폭 — tier와 별개 축.\n' +
    '무의미 조합이면 verdict=스킵.\n\n' +
    '# 산출 (JSON 하나만)\n' +
    '{"verdict":"통과|반려|스킵","reason":"1줄 자유 서술","tier":"S|A|B|C|TRASH","impact":7,"duplicateOf":"중복이면 후보 id, 아니면 null"}';
}

// judge — callFn 주입형. 반환 {decision, record?}
//   decision: accept | reject | skip | trash
function judge(order, output, cards, accepted, tdf, callFn) {
  // 코드 가드 (LLM 전)
  if (!tagsValid(output.tags, cards)) {
    return { decision: 'reject', reason: 'tags 카드 보유 위반(2~4·실보유)', coded: true };
  }
  var cands = prefilter(order.subject, output.tags, accepted);
  var theory = lookup.extract(output.mechanism + ' ' + output.tags.join(' '));
  var r = callFn('arbiter', judgePrompt(order, output, cands, theory), { expectJson: true });
  var v = r.json;
  if (!v || !v.verdict) return { decision: 'reject', reason: '판정 파싱 실패', coded: true };

  if (v.verdict === '스킵') return { decision: 'skip', reason: v.reason || '무의미 조합' };
  if (v.verdict === '반려') return { decision: 'reject', reason: v.reason || '반려' };

  // 통과 — 코드 검증 (C9·C16·C18)
  if (TIERS.indexOf(v.tier) < 0) return { decision: 'reject', reason: 'tier 무효: ' + v.tier, coded: true };
  if (v.tier === 'TRASH') return { decision: 'trash', reason: v.reason || 'TRASH' };
  if (v.tier === 'C') return { decision: 'drop-c', reason: v.reason || 'C(바넘 경계) — 미적재(C18)' };
  if (!(typeof v.impact === 'number' && v.impact >= 1 && v.impact <= 10 && v.impact % 1 === 0)) {
    return { decision: 'reject', reason: 'impact 1~10 정수 미부여 — 채택 차단(TC-19)', coded: true };
  }
  if (!/^H2-[A-Z]{3}-\d{3,}$/.test(order.pattern_id)) {
    // \d{3,}: 스윕 seq가 1000+로 넘어가도 허용(전 소주제 공유 seq라 4자리 도달 가능)
    return { decision: 'reject', reason: 'id 네임스페이스 위반: ' + order.pattern_id, coded: true };
  }
  var idClash = premiumIndex.some(function (p) { return p.id === order.pattern_id; }) ||
    accepted.some(function (p) { return p.id === order.pattern_id; });
  if (idClash) return { decision: 'reject', reason: 'id 충돌(dedupeById 무음 증발 방지)', coded: true };

  // 중복/파생군 분기 (D4) — duplicateOf 지목 시 태그 겹침으로 코드 판정
  var familyId = null, dupReject = null;
  if (v.duplicateOf && v.duplicateOf !== 'null') {
    var cand = cands.filter(function (c) { return c.id === v.duplicateOf; })[0];
    if (cand) {
      var candTags = (cand.origin === 'legacy'
        ? premiumIndex.filter(function (p) { return p.id === cand.id; })[0]
        : accepted.filter(function (p) { return p.id === cand.id; })[0] || {}).tags || [];
      var ov = tagOverlap(candTags, output.tags);
      if (ov >= Math.min(candTags.length, output.tags.length)) {
        dupReject = 'mechanism 동일+조건 겹침 → 중복(' + v.duplicateOf + ')';
      } else {
        familyId = cand.id; // 조건 분리 → 파생군 (루트 = 선채택/기존 id — C13·C15)
      }
    }
  }
  if (dupReject) return { decision: 'reject', reason: dupReject };

  var support = recalcSupport(output.tags, tdf); // D6 — 최종 태그 기준 재계산
  var record = {
    id: order.pattern_id, subject: order.subject, tags: output.tags,
    name: output.name, mechanism: output.mechanism, scene: output.scene || '',
    falsify: output.falsify, format: order.format, order_id: order.order_id,
    support: support, tier: v.tier, impact: v.impact, variations: null,
    model: r.model || 'claude-opus-4-8', transport: 'cc',
    // family_id: 일반 경로=선채택 id(familyId) / 스윕 경로=부모 id(derived_from) — ③ 다양성 페널티 키
    family_id: familyId || (order.derived_from || null), derived_from: order.derived_from || null,
    sweep_axis: order.sweep_axis || null
  };
  return { decision: 'accept', reason: v.reason || '', record: record };
}

module.exports = { judge: judge, prefilter: prefilter, tagsValid: tagsValid,
  recalcSupport: recalcSupport, tagOverlap: tagOverlap, judgePrompt: judgePrompt,
  LOAD_CUT: LOAD_CUT };
