// 병렬 워커 종료 후 accepted 병합 — 소주제 비중첩이라 단순 union(dedup 불요).
// harness_state.json.accepted를 정본으로(falsify_verified 등 인메모리 플래그 포함).
// 사용: node merge-accepted.js [state state_w2 state_w3]
'use strict';
var fs = require('fs');
var path = require('path');
var BASE = __dirname;
var ARGV = process.argv.slice(2);
var dirs = ARGV.filter(function (a) { return a.indexOf('--') !== 0; }); // 플래그(--emit 등) 제외
if (!dirs.length) dirs = ['state', 'state_w2', 'state_w3'];
var EMIT = ARGV.indexOf('--emit') >= 0; // production 8필드 변환 산출

var all = [], seen = {}, perWorker = {}, perSubj = {}, collisions = [];
dirs.forEach(function (d) {
  var hs;
  try { hs = JSON.parse(fs.readFileSync(path.join(BASE, d, 'harness_state.json'), 'utf8')); }
  catch (e) { console.log('  (skip ' + d + ' — harness_state 없음)'); return; }
  var acc = hs.accepted || [];
  perWorker[d] = acc.length;
  acc.forEach(function (p) {
    if (seen[p.id]) { collisions.push(p.id + ' [' + d + ']'); return; } // 소주제 비중첩이면 발생 0이어야 함
    seen[p.id] = 1; all.push(p);
    perSubj[p.subject] = (perSubj[p.subject] || 0) + 1;
  });
});

var outPath = path.join(BASE, 'state', 'merged_pool.jsonl');
fs.writeFileSync(outPath, all.map(function (p) { return JSON.stringify(p); }).join('\n') + '\n', 'utf8');
console.log('병합 완료: ' + all.length + '개 → state/merged_pool.jsonl');
console.log('워커별: ' + JSON.stringify(perWorker));
console.log('소주제별: ' + JSON.stringify(perSubj));
if (collisions.length) {
  console.log('⚠ id 충돌 ' + collisions.length + '건 (소주제 중첩 의심): ' + collisions.slice(0, 10).join(', '));
  process.exit(1);
}
console.log('id 충돌 0 — 병합 무결. ③ 인계 소스 = merged_pool.jsonl');

// ── production 8필드 변환 (--emit) — LLM 재해석 어댑터 ──
// arbiter 레코드(mechanism/scene/falsify) → production {id,tier,name,tags,saju,mbti,cross,impact}.
// reception 산출은 이미 8필드라 패스스루. LLM 실패 시 결정적 폴백(배치 중단 없음).
if (EMIT) emitProduction(all);

var MBTI_TAG = /^(cf|fx|kts|axis|ei|temperament):/;

function normMbti(mbti, tags) {
  var hasMbti = (tags || []).some(function (t) { return MBTI_TAG.test(t); });
  if (!hasMbti) return ': 없음';
  var s = String(mbti || '').trim();
  if (!s || s === ':') return ': 없음';
  return /^\s*:/.test(s) ? s : ': ' + s; // production 렌더 계약(": " 시작)
}

function adapterPrompt(rec) {
  var mbtiTags = (rec.tags || []).filter(function (t) { return MBTI_TAG.test(t); });
  var sajuTags = (rec.tags || []).filter(function (t) { return !MBTI_TAG.test(t); });
  return '아래 검증된 패턴을 production 표시용 3필드로 분해하라. 새로 지어내지 말고 mechanism에서 충실히 추출하라.\n\n' +
    'name: ' + rec.name + '\nmechanism: ' + rec.mechanism + '\nfalsify: ' + (rec.falsify || '') + '\n' +
    '사주 조건 태그: [' + sajuTags.join(', ') + ']\n' +
    'MBTI 조건 태그: [' + (mbtiTags.length ? mbtiTags.join(', ') : '없음(사주단독)') + ']\n\n' +
    '산출 (JSON 하나만):\n' +
    '  saju: 사주 조건을 한 줄로 (위 사주 태그 기반)\n' +
    '  mbti: ' + (mbtiTags.length ? 'MBTI 기능의 수용·대응 방식 1줄, 반드시 ": "로 시작' : '반드시 정확히 ": 없음" (사주단독)') + '\n' +
    '  cross: 사주 × ' + (mbtiTags.length ? 'MBTI' : '사건') + ' 교차해설 ~130자 — mechanism 핵심을 유저가 읽을 문장으로\n' +
    '{"saju":"...","mbti":"' + (mbtiTags.length ? ': ...' : ': 없음') + '","cross":"..."}';
}

function fallbackProd(rec) {
  var mbtiTags = (rec.tags || []).filter(function (t) { return MBTI_TAG.test(t); });
  var sajuTags = (rec.tags || []).filter(function (t) { return !MBTI_TAG.test(t); });
  return { id: rec.id, tier: rec.tier, name: rec.name, tags: rec.tags,
    saju: sajuTags.join(', '), mbti: mbtiTags.length ? ': ' + mbtiTags.join(', ') : ': 없음',
    cross: rec.mechanism || '', impact: rec.impact };
}

function emitProduction(records) {
  var tp = require('./transport.js');
  var out = [], llm = 0, pass = 0, fb = 0;
  records.forEach(function (rec, i) {
    var prod;
    if (rec.saju != null && rec.cross != null) { // reception 산출 = 이미 production 8필드
      prod = { id: rec.id, tier: rec.tier, name: rec.name, tags: rec.tags,
        saju: rec.saju, mbti: normMbti(rec.mbti, rec.tags), cross: rec.cross, impact: rec.impact };
      pass++;
    } else {
      try {
        var r = tp.call('schema-adapter', adapterPrompt(rec), { expectJson: true });
        var j = r.json;
        if (!j || !j.cross) throw new Error('빈 산출');
        prod = { id: rec.id, tier: rec.tier, name: rec.name, tags: rec.tags,
          saju: j.saju || '', mbti: normMbti(j.mbti, rec.tags), cross: j.cross, impact: rec.impact };
        llm++;
      } catch (e) { prod = fallbackProd(rec); fb++; console.log('  폴백 ' + rec.id + ': ' + (e && e.message || e)); }
    }
    out.push(prod);
    if ((i + 1) % 20 === 0) console.log('  변환 ' + (i + 1) + '/' + records.length + '...');
  });
  fs.writeFileSync(path.join(BASE, 'state', 'production_pool.jsonl'),
    out.map(function (x) { return JSON.stringify(x); }).join('\n') + '\n', 'utf8');
  console.log('production 변환 완료: ' + out.length + '개 → state/production_pool.jsonl (LLM ' +
    llm + ' / 패스스루 ' + pass + ' / 폴백 ' + fb + ')');
}
