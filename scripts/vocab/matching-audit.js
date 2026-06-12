// scripts/vocab/matching-audit.js — W-D4: 매칭 감사 리포트 (코드 전용, ③ 인계물)
//   1) 죽은 태그 양방향  2) 신규 4축 커버리지  3) T1 시기성 4종 generic-fill 시뮬
'use strict';

var fs = require('fs');
var path = require('path');

var LIB = path.join(__dirname, '..', '..', 'lib');
var matcher = require(path.join(LIB, 'pattern-matcher.js'));
var v2 = require('./build-user-tags-v2.js');

var tagDf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var PREMIUM = matcher.MBTS_PATTERNS.premium;
var N = tagDf.users.length;

var out = [];
function w(line) { out.push(line == null ? '' : line); }

w('═══ matching-audit 리포트 — ' + new Date().toISOString().slice(0, 10) + ' ═══');
w('모집단 ' + N + '명 (시드 ' + tagDf.meta['시드'] + ', baseYear ' + tagDf.meta.baseYear +
  ', 엔진 ' + tagDf.meta['엔진커밋'] + ')');
w();

// ── 1. 죽은 태그 양방향 ──
var patternTagSet = {};
var patternTagCount = 0;
Object.keys(PREMIUM).forEach(function (subj) {
  PREMIUM[subj].forEach(function (p) {
    (p.tags || []).forEach(function (t) {
      if (!patternTagSet[t]) { patternTagSet[t] = 0; patternTagCount++; }
      patternTagSet[t]++;
    });
  });
});

// 모집단 한계(intensities=null)로만 죽은 태그 — 실유저(강도 보유)에선 산 태그
var INTENSITY_DEPENDENT = { 'intensity:88': 1, 'stress:grip': 1, 'stress:loop': 1, 'uses:intensity': 1 };

var deadPatternSide = Object.keys(patternTagSet).filter(function (t) { return !tagDf.df[t]; }).sort();
w('── 1a. 패턴측 죽은 태그 (premium 사용 태그 중 800명 보유 0) ──');
w('premium 태그 종수 ' + Object.keys(patternTagSet).length + ' / 죽은 태그 ' + deadPatternSide.length + '종');
w('※ [모집단한계] = intensities=null인 본 모집단에서만 죽음(실유저는 방출) / 그 외 = 구조적 죽음(buildUserTags 미방출)');
deadPatternSide.forEach(function (t) {
  var note = INTENSITY_DEPENDENT[t] ? ' [모집단한계]'
    : (t === 'temperament:SJ' || t === 'temperament:SP')
      ? ' [방출버그 — substring(1,3)이 S기질 미포착: ISTJ→"ST"≠SJ. 런타임 RO라 보고만]'
      : (t === 'condition:패격')
        ? ' [서버 gg에 isPagyeok 필드 부재 — analyzeGyeokguk 반환은 pagyeokInfo뿐]'
        : '';
  w('  ' + t + ' (패턴 슬롯 ' + patternTagSet[t] + '개)' + note);
});
w();

var userTagAll = Object.keys(tagDf.df);
var newPrefixSet = ['dwss:', 'sess:', 'fx:', 'yongshin_el:', 'kts:'];
function isNewAxis(t) { return newPrefixSet.some(function (p) { return t.indexOf(p) === 0; }); }
var deadUserSide = userTagAll.filter(function (t) { return !patternTagSet[t] && !isNewAxis(t); }).sort();
var deadUserNew = userTagAll.filter(function (t) { return !patternTagSet[t] && isNewAxis(t); }).sort();
w('── 1b. 유저측 죽은 태그 (방출되나 premium 패턴 매칭 0) ──');
w('유저 방출 태그 종수 ' + userTagAll.length + ' / 죽은 태그(기존 평면) ' + deadUserSide.length + '종');
var deadYongshin = deadUserSide.filter(function (t) { return t.indexOf('yongshin:') === 0; });
w('  그중 yongshin: 자유 문자열 ' + deadYongshin.length + '종 — W3 죽은 태그 재현 확인');
deadUserSide.filter(function (t) { return t.indexOf('yongshin:') !== 0; })
  .forEach(function (t) { w('  ' + t + ' (보유 ' + Math.round(tagDf.df[t] * N) + '명)'); });
w('신규 4축 태그(패턴 미공급 — ②가 공급 예정인 의도 상태) ' + deadUserNew.length + '종: 생략');
w();

// ── 2. 신규 4축 커버리지 (스윕 "실존없음" 칸 사전 지도) ──
w('── 2. 신규 4축 커버리지 ──');
['dwss', 'sess', 'fx', 'yongshin_el'].forEach(function (ax) {
  var vals = tagDf.vocab[ax] || [];
  var zero = vals.filter(function (t) { return !(tagDf.df[t] > 0); });
  w('[' + ax + '] ' + vals.length + '칸, 보유자 0 칸 ' + zero.length + '개' +
    (zero.length ? ' → ' + zero.join(',') : ''));
  vals.forEach(function (t) {
    w('  ' + t + ' = ' + Math.round(tagDf.df[t] * N) + '명 (' + (tagDf.df[t] * 100).toFixed(1) + '%)');
  });
});
w('[axis] ' + (tagDf.vocab.axis || []).join(' ') + ' — 전원 보유(변별 0), mbtiaxis 판정: ' +
  tagDf.meta.mbtiaxis.decision);
w();

// ── 3. T1 시기성 4종 generic-fill 시뮬 (전 = 기존 태그 / 후 = 신규 축 포함) ──
// spec-hit 슬롯 = 슬롯 패턴의 specific 태그(uses:/ref:/pillar: 제외)가 유저 태그와 ≥1 교집합.
// generic-fill률 = (5 - spec-hit 슬롯)/5 — F1("T1 90~100% generic 적자")과 동일 잣대.
var T1 = ['대운 흐름', '올해 키워드', '올해 조언', '기회의 시기'];
w('── 3. T1 시기성 4종 × ' + N + '명 matchPatterns(limit 5) 시뮬 ──');
w('generic-fill률 = top5 슬롯 중 spec-hit 아닌(specific 0매칭·빈) 슬롯 비율 — F1 잣대');
w();
function specHit(pattern, userTagSet) {
  var spec = matcher.classifyTags(pattern.tags || []);
  for (var i = 0; i < spec.length; i++) if (userTagSet[spec[i]]) return true;
  return false;
}
var identical = 0, totalRuns = 0;
T1.forEach(function (subj) {
  var statsB = { hit: 0, fill: 0, ge1: 0, ge2: 0 };
  var statsA = { hit: 0, fill: 0, ge1: 0, ge2: 0 };
  tagDf.users.forEach(function (u) {
    var baseTags = v2.stripNewAxes(u.tags);
    var before = matcher.matchPatterns('premium', subj, baseTags, 5);
    var after = matcher.matchPatterns('premium', subj, u.tags, 5);
    [[before, baseTags, statsB], [after, u.tags, statsA]].forEach(function (trio) {
      var res = trio[0], st = trio[2];
      var set = {};
      trio[1].forEach(function (t) { set[t] = true; });
      var hits = res.filter(function (r) { return specHit(r.pattern, set); }).length;
      st.hit += hits;
      st.fill += 5 - hits;
      if (hits >= 1) st.ge1++;
      if (hits >= 2) st.ge2++;
    });
    totalRuns++;
    if (JSON.stringify(before.map(function (r) { return r.pattern.id; })) ===
        JSON.stringify(after.map(function (r) { return r.pattern.id; }))) identical++;
  });
  function fillP(st) { return (st.fill / (N * 5) * 100).toFixed(1); }
  function p(x) { return (x / N * 100).toFixed(1); }
  w('[' + subj + '] (premium 풀 ' + PREMIUM[subj].length + '패턴)');
  w('  전(기존 태그): generic-fill ' + fillP(statsB) + '% | spec-hit≥1 유저 ' + p(statsB.ge1) +
    '% | ≥2 유저 ' + p(statsB.ge2) + '%');
  w('  후(신규 포함): generic-fill ' + fillP(statsA) + '% | spec-hit≥1 유저 ' + p(statsA.ge1) +
    '% | ≥2 유저 ' + p(statsA.ge2) + '%');
});
w();
w('전/후 결과 동일 ' + identical + '/' + totalRuns + ' — 패턴측 신규 태그 0이므로 동일=정상(라이브 회귀 0).');
w('해석: 신규 축은 유저측 준비 완료 — generic-fill 해소는 ②의 패턴 공급(앵커 큐)이 담당.');
w('F1 베이스라인 갱신치는 위 "전" 수치. ③ 매칭 v3는 본 리포트의 죽은 태그 목록을 인계받는다.');

var report = out.join('\n');
fs.writeFileSync(path.join(__dirname, 'audit-report.txt'), report, 'utf8');
console.log(report);
