// scripts/vocab/test-tagdf.js — TW-2 / TW-4 / TW-6 / TW-7 / TW-8 (tag-df.json 산출물 검증)
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var LIB = path.join(__dirname, '..', '..', 'lib');
var matcher = require(path.join(LIB, 'pattern-matcher.js'));
var v2 = require('./build-user-tags-v2.js');

var tagDf = JSON.parse(fs.readFileSync(path.join(LIB, 'tag-df.json'), 'utf8'));
var yongshinRaw = JSON.parse(fs.readFileSync(path.join(__dirname, 'state', 'yongshin_raw.json'), 'utf8'));

var fails = [];
function check(name, cond, detail) {
  if (!cond) fails.push(name + (detail ? ' — ' + detail : ''));
}

// ── TW-2: 전수 무에러 — 800명, 태그 0개 유저 0명 ──
(function tw2() {
  var before = fails.length;
  check('TW-2-count', tagDf.users.length === 800, 'users ' + tagDf.users.length);
  check('TW-2-meta', tagDf.meta['모집단'] === 800, 'meta ' + tagDf.meta['모집단']);
  var zero = tagDf.users.filter(function (u) { return !u.tags || u.tags.length === 0; });
  check('TW-2-zerotag', zero.length === 0, '태그 0개 ' + zero.length + '명');
  var uids = {};
  tagDf.users.forEach(function (u) { uids[u.uid] = (uids[u.uid] || 0) + 1; });
  check('TW-2-uid', Object.keys(uids).length === 800, 'uid 중복');
  console.log('[TW-2] 전수 무에러: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-4: yongshin_el — 추출 성공률 + 5칸 전부 보유자 ≥1 ──
(function tw4() {
  var before = fails.length;
  var keys = Object.keys(yongshinRaw);
  var failed = keys.filter(function (k) { return !yongshinRaw[k].el; });
  console.log('[TW-4] yongshin 원문 ' + keys.length + '종, 추출 실패 ' + failed.length + '종');
  failed.forEach(function (k) { console.log('  실패: "' + k + '"'); });
  v2.OH.forEach(function (el) {
    var t = 'yongshin_el:' + el;
    check('TW-4-cell', tagDf.df[t] > 0, t + ' 보유자 0');
  });
  // 추출값이 5오행 밖이 아닌지
  keys.forEach(function (k) {
    var el = yongshinRaw[k].el;
    if (el != null) check('TW-4-valid', v2.OH.indexOf(el) >= 0, '"' + k + '" → ' + el);
  });
  console.log('[TW-4] 5칸 보유 + 값 유효: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-6: axis 대조 — 분포 추출 + mbtiaxis 판정 자료 ──
(function tw6() {
  var before = fails.length;
  var axisVals = tagDf.vocab['axis'] || [];
  check('TW-6-exists', axisVals.length === 4, 'axis 칸 ' + axisVals.length);
  var allFull = axisVals.every(function (t) { return tagDf.df[t] === 1; });
  console.log('[TW-6] axis 분포: ' + axisVals.map(function (t) {
    return t + '=' + (tagDf.df[t] * 100).toFixed(0) + '%';
  }).join(' ') + (allFull ? ' (전원 보유 — 변별 0)' : ''));
  check('TW-6-decision', !!(tagDf.meta.mbtiaxis && tagDf.meta.mbtiaxis.decision), 'mbtiaxis 판정 미기록');
  console.log('[TW-6] 판정: ' + tagDf.meta.mbtiaxis.decision + ' — ' +
    (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-7: df 자기 정합 — users 재계산 일치 ──
(function tw7() {
  var before = fails.length;
  var recount = {};
  tagDf.users.forEach(function (u) { u.tags.forEach(function (t) { recount[t] = (recount[t] || 0) + 1; }); });
  var dfKeys = Object.keys(tagDf.df);
  check('TW-7-keys', dfKeys.length === Object.keys(recount).length,
    'df ' + dfKeys.length + ' vs 재계산 ' + Object.keys(recount).length);
  var bad = 0;
  dfKeys.forEach(function (t) {
    var expect = recount[t] / tagDf.users.length;
    if (Math.abs(tagDf.df[t] - expect) > 0.00005 + 1e-9) bad++;
  });
  check('TW-7-vals', bad === 0, '불일치 ' + bad + '건');
  console.log('[TW-7] df 자기 정합 ' + dfKeys.length + '태그: ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

// ── TW-8: 라이브 회귀 — 런타임 diff 0 + 신규 태그가 매칭 결과를 바꾸지 않음 ──
(function tw8() {
  var before = fails.length;
  // (a) 런타임 RO 무변조 (git working tree)
  var RO = ['public/engine.js', 'public/saju.js', 'public/service.js', 'public/js/bundle.js',
    'public/login.js', 'lib/pattern-matcher.js', 'lib/prompt-builder-usr.js', 'lib/pattern-data.js'];
  var diff = '';
  try {
    diff = cp.execSync('git diff --name-only HEAD', { cwd: path.join(__dirname, '..', '..') }).toString();
  } catch (e) { diff = 'GIT_ERROR'; }
  var touched = RO.filter(function (f) { return diff.indexOf(f) >= 0; });
  check('TW-8-ro', touched.length === 0, 'RO 변조: ' + touched.join(','));
  // (b) 표본 10명 × 2소주제: full태그 vs 신규제거 태그 → matchPatterns 결과 동일
  var SUBJECTS = ['올해 조언', '나의 성격'];
  var diffCnt = 0;
  for (var i = 0; i < 10; i++) {
    var u = tagDf.users[i * 79]; // 시드 산출물에서 결정적 표본
    SUBJECTS.forEach(function (subj) {
      var rFull = matcher.matchPatterns('premium', subj, u.tags, 5)
        .map(function (r) { return r.pattern.id + ':' + r.score.toFixed(3) + ':' + r.source; });
      var rBase = matcher.matchPatterns('premium', subj, v2.stripNewAxes(u.tags), 5)
        .map(function (r) { return r.pattern.id + ':' + r.score.toFixed(3) + ':' + r.source; });
      if (JSON.stringify(rFull) !== JSON.stringify(rBase)) diffCnt++;
    });
  }
  check('TW-8-match', diffCnt === 0, '매칭 결과 변동 ' + diffCnt + '건');
  console.log('[TW-8] 라이브 회귀(RO diff 0 + 매칭 불변 10명×2): ' + (fails.length === before ? 'PASS' : 'FAIL'));
})();

if (fails.length) {
  console.log('\nFAIL 상세:');
  fails.forEach(function (f) { console.log('  ✗ ' + f); });
  process.exit(1);
}
console.log('\n전체 PASS (TW-2·4·6·7·8)');
