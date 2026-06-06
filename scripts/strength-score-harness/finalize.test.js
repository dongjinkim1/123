'use strict';
// finalize.test.js — §9/§10 산출물 빌더 검증(합성 state 픽스처 + 실 state/ loadState).
var assert = require('assert');
var path = require('path');
var nodefs = require('fs');
var F = require('./finalize');
var E = require('./relevance-eval');
var V = require('./verify-machine');

var passed = 0, failed = 0;
function test(n, f) { try { f(); passed++; console.log('  PASS ' + n); } catch (e) { failed++; console.log('  FAIL ' + n + ': ' + e.message); } }

function gtFix() {
  return { _meta: { case: { y: 1993, m: 5, d: 26 }, dmEl: '화', yongshinOh: '목', weakOh: '금' }, '오신': {}, '음양': {} };
}
function stateFix() {
  return {
    manifest: { blocks: [], updatedAt: '' },
    blocks: {
      '오신': {
        slug: '오신', status: 'passed', round: 1, faillog: [{ round: 0, stage: 'machine', fails: [{ code: 'M2' }] }],
        spec: { block: '오신', pillar: null, oh: '목', gangdoAxis: 'magnitude', flag: '', geunge: 'PART2 오신 섹션',
          relevance: { form: 'weighted_sum', factors: [{ key: 'g', source: 'gangdo', normalize: 'identity', transform: 'identity', weight: 1 }] } }
      },
      '음양': { slug: '음양', status: 'passed', round: 0, faillog: [],
        spec: { block: '음양', oh: '화', gangdoAxis: 'open', relevance: null, geunge: '4-OPEN', flag: '' } }
    }
  };
}

console.log('\n=== finalize tests ===\n');

// 1) buildScoreSpec: meta 레지스트리 = relevance-eval 단일 출처, 블록 verify 상태 보존
test('buildScoreSpec meta/blocks 구조', function () {
  var ss = F.buildScoreSpec(gtFix(), stateFix());
  assert.deepStrictEqual(ss.meta.registry, Object.keys(E.REGISTRY), 'registry 드리프트');
  assert.deepStrictEqual(ss.meta.openAxis, V.OPEN_BLOCKS, 'openAxis 드리프트');
  assert.strictEqual(ss.blocks['오신'].verify.status, 'passed');
  assert.ok(ss.blocks['오신'].spec && ss.blocks['오신'].spec.gangdoAxis === 'magnitude');
});

// 2) renderMap: 헤더 + 레지스트리 + 블록 행 + factors 문자열
test('renderMap 헤더/행/factors', function () {
  var ss = F.buildScoreSpec(gtFix(), stateFix());
  var md = F.renderMap(ss, gtFix());
  assert.ok(md.indexOf('# 사주 강도·요소 점수 MAP') >= 0, '제목 없음');
  assert.ok(md.indexOf('source: gangdo') >= 0, '레지스트리 헤더 없음');
  assert.ok(/\| 오신 \|.*magnitude.*weighted_sum.*g·gangdo·일간·w=1·identity/.test(md), '오신 행/factors 없음');
  assert.ok(/\| 음양 \|.*open/.test(md), 'open 블록 행 없음');
});

// 3) renderVerifyLog: 카운트 + 블록별 fail 집계
test('renderVerifyLog 카운트/집계', function () {
  var log = F.renderVerifyLog(gtFix(), stateFix());
  assert.ok(log.indexOf('passed 2') >= 0, 'passed 카운트 없음: \n' + log);
  assert.ok(/\| 오신 \| passed \| 1 \| 1 \| 0 \|/.test(log), '오신 집계행 불일치');
});

// 4) loadState: 실 state/ — 등재 블록은 manifest status 병합, 미등재 블록은 pending·null 폴백
test('loadState 실 state/ → manifest 병합 + 미등재 폴백', function () {
  var gt = JSON.parse(nodefs.readFileSync(path.join(__dirname, 'ground-truth.json'), 'utf8'));
  var st = F.loadState(gt);
  var ids = Object.keys(gt).filter(function (k) { return k !== '_meta'; });
  assert.ok(ids.length >= 20, '블록 수 비정상: ' + ids.length);
  ids.forEach(function (id) {
    assert.ok(st.blocks[id], id + ' 항목 누락');
    assert.ok(['pending', 'passed', 'escalated'].indexOf(st.blocks[id].status) >= 0, id + ' status 비정상: ' + st.blocks[id].status);
  });
  // 미등재 블록: manifest/디스크에 없으면 pending·null 폴백
  var st2 = F.loadState({ _meta: {}, '__missing__': {} });
  assert.strictEqual(st2.blocks['__missing__'].status, 'pending', '미등재 status 폴백 실패');
  assert.strictEqual(st2.blocks['__missing__'].spec, null, '미등재 spec 폴백 실패');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed\n');
process.exit(failed ? 1 : 0);
