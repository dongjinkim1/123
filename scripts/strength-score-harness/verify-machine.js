'use strict';
// verify-machine.js — §8 결정론 게이트 M1~M6 + autofix + 블록 CLI.
// 입력: 블록 relevanceSpec(state/<slug>/spec.json) + §6 ground-truth.json(사실 + _meta.topFeatures).
// M1 강도 재계산 금지(gangdo=topFeatures recall) + STRENGTH_WEIGHTS 인용수치=코드값(autofix).
// M2 (분류+spec)|open(4-OPEN 강제). M3 sweep [0,1]·NaN/음수/초과 없음. M4 gangdo sweep 단조(없으면 N/A).
// M5 블록당 gangdoAxis 1개. M6 무예외 + 전 source 레지스트리 + interaction이 §6 필드 읽음.
// ⚠ relevance-eval / lib/feature-strength 는 module.exports → require OK. public/* 아님.
var path = require('path');
var nodefs = require('fs');
var E = require('./relevance-eval');
var fst = require('../../lib/feature-strength');

var CATEGORY = fst.STRENGTH_WEIGHTS.category;          // {십성:1.0, 신살:0.8, 합충:0.7}
var OPEN_BLOCKS = ['음양', '투출', '운성궁위', '통변'];  // 4-OPEN(점수화 대상 아님)
var VALID_AXES = ['magnitude', 'derived', 'impact', 'activation', 'none', 'open'];
var INTERACTION = { relation: 'relations', hyung: 'hyung', saeng: 'saeng', geuk: 'geuk' };
var SWEEP = [0.1, 0.3, 0.5, 0.7, 0.9];
var GT = path.join(__dirname, 'ground-truth.json');
var STATE = path.join(__dirname, 'state');

function slugOf(id) { return String(id).replace(/:/g, '__'); }
function isOpenSpec(spec) { return !!(spec && spec.gangdoAxis === 'open' && spec.relevance == null); }
function factorsOf(spec) { return (spec && spec.relevance && spec.relevance.factors) || []; }
function hasGangdo(spec) { return factorsOf(spec).some(function (f) { return f.source === 'gangdo'; }); }

function buildCtx(block, meta, score) {
  return {
    score: (typeof score === 'number') ? score : null,
    yongshin: (meta && meta.yongshin) || '',
    dmEl: (meta && meta.dmEl) || (block && block.oh) || '',
    relations: (block && block.relations) || [],
    hyung: (block && block.hyung) || [],
    saeng: (block && block.saeng) || null,
    geuk: (block && block.geuk) || null
  };
}

// M1: gangdo 재계산 금지 + STRENGTH_WEIGHTS 인용수치=코드값(autofix)
function M1(spec, block, meta) {
  var fails = [], autofix = [];
  if (spec.gangdoAxis === 'magnitude' && !hasGangdo(spec))
    fails.push({ code: 'M1', detail: 'magnitude 축인데 gangdo factor 없음(강도 재계산 의심)' });
  // 블록 id가 특정 feature를 지명하면 topFeatures에서 recall 가능해야(엔진 산출물 = 진실)
  if (hasGangdo(spec)) {
    var names = ((meta && meta.topFeatures) || []).map(function (t) { return t.name; });
    var named = String(spec.block || '').split(':')[1];
    if (named && names.length && names.indexOf(named) < 0)
      fails.push({ code: 'M1', detail: 'gangdo 대상 "' + named + '"가 topFeatures에 없음(recall 실패)' });
  }
  // geunge가 카테고리 가중을 명시 인용했으면 코드값과 일치해야(불일치 → autofix)
  var g = String(spec.geunge || '');
  Object.keys(CATEGORY).forEach(function (cat) {
    var re = new RegExp(cat + '\\s*(?:카테고리|category)?\\s*(?:가중치|가중|weight|계수)\\s*[=:은는]?\\s*([01](?:\\.[0-9]+)?)');
    var m = re.exec(g);
    if (m && Math.abs(parseFloat(m[1]) - CATEGORY[cat]) > 1e-9)
      autofix.push({ path: 'geunge', from: m[1], to: String(CATEGORY[cat]) });
  });
  return { fails: fails, autofix: autofix };
}

// M2: (분류 + relevance) 또는 (open). 4-OPEN 블록은 반드시 open.
function M2(spec) {
  var fails = [], open = isOpenSpec(spec);
  if (OPEN_BLOCKS.indexOf(spec.block) >= 0 && !open)
    fails.push({ code: 'M2', detail: '4-OPEN 블록인데 open 아님: ' + spec.block });
  if (!open) {
    if (VALID_AXES.indexOf(spec.gangdoAxis) < 0)
      fails.push({ code: 'M2', detail: 'gangdoAxis 불명: ' + spec.gangdoAxis });
    if (!spec.relevance || !spec.relevance.form || !factorsOf(spec).length)
      fails.push({ code: 'M2', detail: '분류는 있으나 relevance(form/factors) 누락' });
  }
  return { fails: fails, autofix: [] };
}

// M3: sweep 전 구간 결과 ∈ [0,1] · NaN/음수/초과 없음 (open = N/A)
function M3(spec, block, meta) {
  if (isOpenSpec(spec)) return { fails: [], autofix: [] };
  var fails = [];
  for (var i = 0; i < SWEEP.length; i++) {
    var v;
    try { v = E.evalRelevance(spec, buildCtx(block, meta, SWEEP[i])); }
    catch (e) { fails.push({ code: 'M3', detail: 'eval throw @score=' + SWEEP[i] + ': ' + e.message }); break; }
    if (v === null) continue;
    if (typeof v !== 'number' || isNaN(v) || v < 0 || v > 1) {
      fails.push({ code: 'M3', detail: '[0,1] 이탈 @score=' + SWEEP[i] + ' v=' + v }); break;
    }
  }
  return { fails: fails, autofix: [] };
}

// M4: gangdo factor 있을 때만 — score sweep 단조 비감소 (없으면 N/A)
function M4(spec, block, meta) {
  if (isOpenSpec(spec) || !hasGangdo(spec)) return { fails: [], autofix: [] };
  var fails = [], prev = -Infinity;
  for (var i = 0; i < SWEEP.length; i++) {
    var v;
    try { v = E.evalRelevance(spec, buildCtx(block, meta, SWEEP[i])); } catch (e) { break; }
    if (typeof v !== 'number') continue;
    if (v < prev - 1e-12) { fails.push({ code: 'M4', detail: 'gangdo 단조 위반 @score=' + SWEEP[i] + ' v=' + v + ' < prev=' + prev }); break; }
    prev = v;
  }
  return { fails: fails, autofix: [] };
}

// M5: 블록당 gangdoAxis 정확히 1개(단일 문자열 · 유효 enum)
function M5(spec) {
  var fails = [];
  if (typeof spec.gangdoAxis !== 'string' || VALID_AXES.indexOf(spec.gangdoAxis) < 0)
    fails.push({ code: 'M5', detail: 'gangdoAxis 단일 유효값 아님: ' + JSON.stringify(spec.gangdoAxis) });
  return { fails: fails, autofix: [] };
}

// M6: 무예외 + 전 source 레지스트리 + interaction source가 §6 필드를 읽음
function M6(spec, block, meta) {
  if (isOpenSpec(spec)) return { fails: [], autofix: [] };
  var fails = [];
  factorsOf(spec).forEach(function (f) {
    if (!E.REGISTRY[f.source]) { fails.push({ code: 'M6', detail: '레지스트리 밖 source: ' + f.source }); return; }
    var field = INTERACTION[f.source];
    if (field && (block == null || block[field] == null))
      fails.push({ code: 'M6', detail: 'interaction source "' + f.source + '"인데 §6 ' + field + ' 필드 없음' });
  });
  try { E.evalRelevance(spec, buildCtx(block, meta, 0.5)); }
  catch (e) { fails.push({ code: 'M6', detail: 'eval throw: ' + e.message }); }
  return { fails: fails, autofix: [] };
}

var GATES = [M1, M2, M3, M4, M5, M6];

function verifyBlock(spec, block, meta) {
  var fails = [], autofix = [];
  GATES.forEach(function (g) {
    var r = g(spec, block, meta);
    if (r.fails.length) fails = fails.concat(r.fails);
    if (r.autofix.length) autofix = autofix.concat(r.autofix);
  });
  return { pass: fails.length === 0, fails: fails, autofix: autofix };
}

module.exports = {
  M1: M1, M2: M2, M3: M3, M4: M4, M5: M5, M6: M6,
  verifyBlock: verifyBlock, buildCtx: buildCtx, slugOf: slugOf,
  OPEN_BLOCKS: OPEN_BLOCKS, VALID_AXES: VALID_AXES, SWEEP: SWEEP
};

// CLI: node verify-machine.js <blockId>
if (require.main === module) {
  var id = process.argv[2];
  if (!id) { process.stderr.write('usage: node verify-machine.js <blockId>\n'); process.exit(2); }
  var gt = JSON.parse(nodefs.readFileSync(GT, 'utf8'));
  var block = gt[id], meta = gt._meta;
  function emit(res, code) { process.stdout.write(JSON.stringify(res, null, 2) + '\n'); process.exit(code); }
  if (!block) emit({ pass: false, fails: [{ code: 'M0', detail: '블록 없음(ground-truth): ' + id }], autofix: [] }, 1);
  var specPath = path.join(STATE, slugOf(id), 'spec.json');
  if (!nodefs.existsSync(specPath)) emit({ pass: false, fails: [{ code: 'M0', detail: 'spec.json 없음: ' + specPath }], autofix: [] }, 1);
  var spec = JSON.parse(nodefs.readFileSync(specPath, 'utf8'));
  var res = verifyBlock(spec, block, meta);
  emit(res, res.pass ? 0 : 1);
}
