'use strict';
// extractor.js — §6 ground-truth.json 선펼침(결정론·사실만). 강화/약화·가중·form은 producer.
// 기준 사주 1개(preflight 동일 케이스)에서 23 인벤토리 블록(§5)의 사실 베이스를 펼친다.
// 사실: pillars/oh(힌트) + relations(전역, pillars 태깅) + hyung(SJ_checkSamhyung raw) + saeng/geuk(OH_SANG/GEUK).
// magnitude(topFeatures)는 _meta에 전체 랭킹 보존(재계산 금지) — gangdo 바인딩은 producer가 _meta 보고 결정.
// ⚠ relations/hyung는 블록 pillars로 필터하지 않음(§6 예시가 교차기둥 관계 포함). 블록 차별화는 producer 몫.
// ⚠ lib/* 는 module.exports → require OK. public/saju-theory.js 아님.
var path = require('path');
var nodefs = require('fs');
var core = require('../../lib/saju-core');
var analysis = require('../../lib/saju-analysis');
var fs = require('../../lib/feature-strength');
var SJ = require('../../lib/saju-theory-server');
var sdata = require('../../lib/saju-data');

var CASE = { y: 1993, m: 5, d: 26, h: 8, min: 40, lon: 126.98 };
var OUT = path.join(__dirname, 'ground-truth.json');
var PILLAR_LABELS = ['년지', '월지', '일지', '시지'];

// 23 인벤토리 블록(§5). oh: dm=일간 · yong=용신오행 · weak=최약오행. pillars: all · wol(월지) · hyung(형기둥).
var BLOCKS = [
  { id: '음양', oh: 'dm', pillars: 'all' }, { id: '신강약', oh: 'dm', pillars: 'all' },
  { id: '통변', oh: 'dm', pillars: 'all' }, { id: '오신', oh: 'yong', pillars: 'all' },
  { id: '개운', oh: 'yong', pillars: 'all' }, { id: '육친', oh: 'dm', pillars: 'all' },
  { id: '운성궁위', oh: 'dm', pillars: 'all' }, { id: '공망', oh: 'dm', pillars: 'all' },
  { id: '건강', oh: 'weak', pillars: 'all' }, { id: '직업적성', oh: 'yong', pillars: 'all' },
  { id: '원국관계', oh: 'dm', pillars: 'all' }, { id: '형', oh: 'dm', pillars: 'hyung' },
  { id: '투출', oh: 'dm', pillars: 'wol' }, { id: '월률', oh: 'dm', pillars: 'wol' },
  { id: '신살', oh: 'dm', pillars: 'all' }, { id: '교운기', oh: 'dm', pillars: 'all' },
  { id: '러브타이밍', oh: 'dm', pillars: 'all' }, { id: '머니타이밍', oh: 'dm', pillars: 'all' },
  { id: '합트리거', oh: 'dm', pillars: 'all' }, { id: '월간하이라이트', oh: 'dm', pillars: 'all' },
  { id: '택일', oh: 'yong', pillars: 'all' }, { id: '인생로드맵', oh: 'dm', pillars: 'all' },
  { id: '자녀', oh: 'dm', pillars: 'all' }
];

function revLookup(map, val) { // map[X]==val 인 X (생/극 역방향)
  for (var k in map) if (map.hasOwnProperty(k) && map[k] === val) return k;
  return '';
}
function saengOf(oh) { return { generates: sdata.OH_SANG[oh] || '', generatedBy: revLookup(sdata.OH_SANG, oh) }; }
function geukOf(oh) { return { controls: sdata.OH_GEUK[oh] || '', controlledBy: revLookup(sdata.OH_GEUK, oh) }; }

var KINDS = ['원진', '암합', '합', '충', '형', '파', '해']; // 긴 종류 먼저(calcRelationStrength는 합/충, 방어적)
function parseRelations(relObj, branchToPillar) {
  var out = [];
  Object.keys(relObj || {}).forEach(function (name) {
    var kind = '', body = name, i;
    for (i = 0; i < KINDS.length; i++) { if (name.slice(-KINDS[i].length) === KINDS[i]) { kind = KINDS[i]; body = name.slice(0, name.length - KINDS[i].length); break; } }
    var pillars = [];
    for (i = 0; i < body.length; i++) { var pl = branchToPillar[body[i]]; if (pl && pillars.indexOf(pl) < 0) pillars.push(pl); }
    out.push({ name: name, kind: kind, strength: relObj[name], pillars: pillars });
  });
  return out;
}

function build() {
  var saju = core.calcSajuForApp(CASE.y, CASE.m, CASE.d, CASE.h, CASE.min, CASE.lon);
  var gg = analysis.analyzeGyeokguk(saju);
  var dmEl = saju.dmEl;
  var yongOh = SJ.SJ_extractYongshinOh(gg.yongshin || '') || dmEl;
  var weakOh = (gg.weak && gg.ohMap && gg.ohMap[gg.weak[0]]) || dmEl;
  var ohOf = { dm: dmEl, yong: yongOh, weak: weakOh };

  var branchToPillar = {};
  var pillars = saju.P.map(function (p, i) {
    branchToPillar[p.b] = PILLAR_LABELS[i];
    return { pos: PILLAR_LABELS[i], stem: p.s, branch: p.b, bi: p.bi };
  });

  var relations = parseRelations(fs.calcRelationStrength(saju), branchToPillar);
  var hyung = SJ.SJ_checkSamhyung(saju) || [];
  var hyungPillars = [];
  hyung.forEach(function (h) { PILLAR_LABELS.forEach(function (pl) { if (h.where && h.where.indexOf(pl) >= 0 && hyungPillars.indexOf(pl) < 0) hyungPillars.push(pl); }); });
  var tf = fs.extractTopFeatures(saju, gg);
  var pillarsOf = { all: PILLAR_LABELS.slice(), wol: ['월지'], hyung: hyungPillars };

  var out = {
    _meta: {
      case: CASE, dmEl: dmEl, dmGan: (saju.P[2] && saju.P[2].s) || '',
      yongshin: gg.yongshin || '', yongshinOh: yongOh, weakOh: weakOh,
      pillars: pillars, topFeatures: tf.topFeatures,
      note: '사실만(facts-only). gangdo=topFeatures(재계산 금지), 강화/약화·가중·form=producer.'
    }
  };
  BLOCKS.forEach(function (b) {
    var oh = ohOf[b.oh];
    out[b.id] = {
      pillars: pillarsOf[b.pillars] || PILLAR_LABELS.slice(),
      oh: oh, relations: relations, hyung: hyung,
      saeng: saengOf(oh), geuk: geukOf(oh)
    };
  });
  return out;
}

module.exports = { build: build, BLOCKS: BLOCKS, CASE: CASE };

if (require.main === module) {
  var cmd = process.argv[2], arg = process.argv[3];
  var gt = build();
  if (cmd === 'print') { process.stdout.write(JSON.stringify(arg ? gt[arg] : gt, null, 2) + '\n'); }
  else {
    nodefs.writeFileSync(OUT, JSON.stringify(gt, null, 2) + '\n', 'utf8');
    process.stdout.write('[EXTRACTOR OK] ' + (Object.keys(gt).length - 1) + ' blocks → ' + path.basename(OUT)
      + ' | dmEl=' + gt._meta.dmEl + ' yongOh=' + gt._meta.yongshinOh + ' weakOh=' + gt._meta.weakOh
      + ' rel=' + gt['음양'].relations.length + ' hyung=' + gt['음양'].hyung.length
      + ' topFeat=' + gt._meta.topFeatures.length + '\n');
  }
}
