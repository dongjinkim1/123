'use strict';
// finalize.js — §9 종료/§10 MAP. state/ 의 passed/escalated 결과를 모아 산출물 3종을 만든다.
// 출력: score-spec.json(기계용 통합 명세) · SAJU_STRENGTH_SCORE_MAP.md(§10) · VERIFY_LOG.md.
// state 스키마:
//   state/manifest.json   = { blocks:[{id,slug,status:"pending|passed|escalated",round}], updatedAt }
//   state/<slug>/spec.json    = producer relevanceSpec
//   state/<slug>/faillog.json = [{round, stage:"machine|myeongri", fails:[...]}]
//   state/<slug>/excerpt.json = { sectionIds, part, section, text }   (이론 발췌)
// ⚠ relevance-eval / verify-machine 는 require OK(module.exports). 레지스트리·OPEN은 거기서 재사용(드리프트 방지).
var path = require('path');
var nodefs = require('fs');
var E = require('./relevance-eval');
var V = require('./verify-machine');

var DIR = __dirname, STATE = path.join(DIR, 'state'), GT = path.join(DIR, 'ground-truth.json');
var REGISTRY_KEYS = Object.keys(E.REGISTRY);
var NORMALIZE_KEYS = Object.keys(E.NORMALIZE);
var FORM_KEYS = Object.keys(E.FORM);
var TRANSFORMS = ['identity', 'sqrt', 'pow:k(k>0)', 'log1p', 'div:c(c>0)'];

function readJSON(p) { try { return JSON.parse(nodefs.readFileSync(p, 'utf8')); } catch (e) { return null; } }
function blockIds(gt) { return Object.keys(gt).filter(function (k) { return k !== '_meta'; }); }

// state/ 에서 manifest + 블록별 spec/faillog 수집(없으면 pending)
function loadState(gt) {
  var manifest = readJSON(path.join(STATE, 'manifest.json')) || { blocks: [], updatedAt: '' };
  var byId = {};
  manifest.blocks.forEach(function (b) { byId[b.id] = b; });
  var out = {};
  blockIds(gt).forEach(function (id) {
    var slug = V.slugOf(id), m = byId[id] || { id: id, slug: slug, status: 'pending', round: 0 };
    out[id] = {
      slug: slug, status: m.status || 'pending', round: m.round || 0,
      spec: readJSON(path.join(STATE, slug, 'spec.json')),
      faillog: readJSON(path.join(STATE, slug, 'faillog.json')) || []
    };
  });
  return { manifest: manifest, blocks: out };
}

function buildScoreSpec(gt, state) {
  var meta = gt._meta || {}, blocks = {};
  blockIds(gt).forEach(function (id) {
    var s = state.blocks[id];
    blocks[id] = s.spec
      ? { spec: s.spec, verify: { status: s.status, round: s.round } }
      : { spec: null, verify: { status: s.status, round: s.round } };
  });
  return {
    meta: {
      case: meta.case, dmEl: meta.dmEl, yongshinOh: meta.yongshinOh, weakOh: meta.weakOh,
      registry: REGISTRY_KEYS, normalize: NORMALIZE_KEYS, transform: TRANSFORMS, form: FORM_KEYS,
      monotonicity: 'wᵢ≥0 · fᵢ∈[0,1] · transform 단조증가 → gangdo factor 단조 비감소(M4)',
      openAxis: V.OPEN_BLOCKS,
      note: '점수 도출·검증 산출물. 프롬프트에 배선하지 않는다.',
      generatedAt: new Date().toISOString()
    },
    blocks: blocks
  };
}

function factorsStr(factors) {
  if (!factors || !factors.length) return '—';
  return factors.map(function (f) {
    return [f.key, f.source, (f.against || '일간'), 'w=' + f.weight, f.normalize || 'identity'].join('·');
  }).join(' / ');
}

function renderMap(scoreSpec, gt) {
  var m = scoreSpec.meta, L = [];
  L.push('# 사주 강도·요소 점수 MAP', '');
  L.push('> 일간 ' + m.dmEl + ' · 용신오행 ' + m.yongshinOh + ' · 최약 ' + m.weakOh +
    ' · 기준 사주 ' + (m.case ? (m.case.y + '-' + m.case.m + '-' + m.case.d) : '') + '. 도출·검증 산출물(프롬프트 미배선).', '');
  L.push('## 고정 레지스트리 (producer 변경 불가)');
  L.push('- source: ' + m.registry.join(' · '));
  L.push('- normalize: ' + m.normalize.join(' · '));
  L.push('- transform(단조증가): ' + m.transform.join(' · '));
  L.push('- form: ' + m.form.join(' · '), '');
  L.push('## 단조성 보증', m.monotonicity, '');
  L.push('## 이론 근거 인용 규칙',
    '각 블록 근거(geunge)는 saju-theory 코퍼스 PART/섹션에서 인용된다(발췌→producer 인용→verify-myeongri 재확인).', '');
  L.push('## 4-OPEN (점수화 보류)', m.openAxis.join(' · ') + ' — gangdoAxis:open.', '');
  L.push('## 블록별 점수 명세');
  L.push('| 블록 | 기둥 | 오행 | gangdoAxis | form | factors (key·source·against·w·normalize) | 근거(PART§) | flag |');
  L.push('|---|---|---|---|---|---|---|---|');
  blockIds(gt).forEach(function (id) {
    var e = scoreSpec.blocks[id], sp = e.spec;
    if (!sp) { L.push('| ' + id + ' | — | — | (' + e.verify.status + ') | — | — | — | — |'); return; }
    var rel = sp.relevance || {};
    L.push('| ' + id + ' | ' + (sp.pillar || '—') + ' | ' + (sp.oh || '—') + ' | ' + (sp.gangdoAxis || '—') +
      ' | ' + (rel.form || '—') + ' | ' + factorsStr(rel.factors) + ' | ' + (sp.geunge || '—') + ' | ' + (sp.flag || '') + ' |');
  });
  L.push('');
  return L.join('\n');
}

function renderVerifyLog(gt, state) {
  var ids = blockIds(gt), cnt = { passed: 0, escalated: 0, pending: 0 }, L = [];
  ids.forEach(function (id) { var st = state.blocks[id].status; cnt[st] = (cnt[st] || 0) + 1; });
  L.push('# VERIFY LOG', '', '생성: ' + new Date().toISOString(),
    '블록 ' + ids.length + '개 · passed ' + cnt.passed + ' · escalated ' + cnt.escalated + ' · pending ' + cnt.pending, '');
  L.push('| 블록 | status | round | machine fails | myeongri fails |');
  L.push('|---|---|---|---|---|');
  ids.forEach(function (id) {
    var s = state.blocks[id], mc = 0, my = 0;
    s.faillog.forEach(function (r) {
      var n = (r.fails && r.fails.length) || 0;
      if (r.stage === 'myeongri') my += n; else mc += n;
    });
    L.push('| ' + id + ' | ' + s.status + ' | ' + s.round + ' | ' + mc + ' | ' + my + ' |');
  });
  L.push('');
  return L.join('\n');
}

function finalize() {
  var gt = readJSON(GT);
  if (!gt) throw new Error('ground-truth.json 없음 — 먼저 extractor 실행');
  var state = loadState(gt);
  var scoreSpec = buildScoreSpec(gt, state);
  return {
    scoreSpec: scoreSpec,
    map: renderMap(scoreSpec, gt),
    verifyLog: renderVerifyLog(gt, state)
  };
}

module.exports = {
  loadState: loadState, buildScoreSpec: buildScoreSpec,
  renderMap: renderMap, renderVerifyLog: renderVerifyLog, finalize: finalize
};

if (require.main === module) {
  var r = finalize();
  nodefs.writeFileSync(path.join(DIR, 'score-spec.json'), JSON.stringify(r.scoreSpec, null, 2) + '\n', 'utf8');
  nodefs.writeFileSync(path.join(DIR, 'SAJU_STRENGTH_SCORE_MAP.md'), r.map, 'utf8');
  nodefs.writeFileSync(path.join(DIR, 'VERIFY_LOG.md'), r.verifyLog, 'utf8');
  var b = r.scoreSpec.blocks, ids = Object.keys(b);
  var done = ids.filter(function (k) { return b[k].spec; }).length;
  process.stdout.write('[FINALIZE OK] ' + ids.length + ' blocks · spec 보유 ' + done +
    ' → score-spec.json · SAJU_STRENGTH_SCORE_MAP.md · VERIFY_LOG.md\n');
}
