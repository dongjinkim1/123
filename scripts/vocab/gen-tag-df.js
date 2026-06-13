// scripts/vocab/gen-tag-df.js — W-D3: 모집단 800명 엔진 실계산 → lib/tag-df.json
// 합성 태그 금지 — 전부 buildUserTagsV2 실방출. 시드 고정(재현성 — ② V1/support 전제).
// 2026-06-14 balanced sampling (동진): strength rejection-sampling + MBTI quota even.
//   strength is engine-derived from birthdate → over-quota draws are rejected and a new
//   birthdate is drawn ("치우치면 넘기고 다른 인물로"). MBTI is quota-assigned (independent of birth).
//   Safety: the frozen lib/tag-df.json is refused without --force (preview via TAGDF_OUT).
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var LIB = path.join(__dirname, '..', '..', 'lib');
var core = require(path.join(LIB, 'saju-core.js'));
var ana = require(path.join(LIB, 'saju-analysis.js'));
var profile = require(path.join(LIB, 'mbti-profile.v2.js'));
var v2 = require('./build-user-tags-v2.js');

var SEED = 20260613;          // preflight 확정 — 이후 ②·③ 전 단계 동일 시드
var BASE_YEAR = 2026;         // dwss/sess 기준 연도 (연 단위 갱신 시 재산출)
var N = 800;
var BIRTH_Y_MIN = 1960, BIRTH_Y_MAX = 2007; // 2026 기준 20~67세 (대운 진입 보장)
var HOUR_NULL_RATE = 0.1;     // 시간 미상 유저 근사
var GENERIC_PREFIXES = ['uses:', 'ref:', 'pillar:']; // isSpecificTag L137 실측 — ② 큐가 소비

// Balanced sampling quotas (동진 2026-06-14) — sum=N. Compresses the natural 34.9x strength
// skew (극신강 1.25%) to ~2.7x. Keeps the shape (신약>중화>...) but softens the extremes so
// rare grades stay discoverable (support floor). Tunable.
var STRENGTH_QUOTA = { '극신약': 130, '신약': 240, '중화': 200, '신강': 140, '극신강': 90 };
var MBTI_PER = N / 16;        // exact even (=50/type); MBTI is birth-independent → unbiased quota
var MAX_ATTEMPTS = 400000;    // headroom to fill 극신강 (~1.25% natural → ~7k draws expected)

// Output path — defaults to the frozen file, but refuses to overwrite it without --force.
var OUT = process.env.TAGDF_OUT ? path.resolve(process.env.TAGDF_OUT) : path.join(LIB, 'tag-df.json');
var FORCE = process.argv.indexOf('--force') >= 0;

function mulberry32(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

var MBTI16 = Object.keys(profile.STACK);
var DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Draw birthdate + gender only (no MBTI — assigned by quota after strength is accepted).
function drawCandidate(rnd) {
  var y = BIRTH_Y_MIN + Math.floor(rnd() * (BIRTH_Y_MAX - BIRTH_Y_MIN + 1));
  var m = 1 + Math.floor(rnd() * 12);
  var maxD = DAYS[m - 1] + ((m === 2 && y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 1 : 0);
  var d = 1 + Math.floor(rnd() * maxD);
  var hasHour = rnd() >= HOUR_NULL_RATE;
  var h = hasHour ? Math.floor(rnd() * 24) : null;
  var min = hasHour ? Math.floor(rnd() * 60) : null;
  var gender = rnd() < 0.5 ? '남성' : '여성';
  return { y: y, m: m, d: d, h: h, min: min, gender: gender };
}

function main() {
  // Protect the live run: if the default output is the existing frozen file, refuse without --force.
  if (OUT === path.join(LIB, 'tag-df.json') && fs.existsSync(OUT) && !FORCE) {
    console.error('[SAFETY] frozen lib/tag-df.json exists — refusing to overwrite. ' +
      'Preview with TAGDF_OUT=<path>, or regenerate live with --force (after stopping the run).');
    process.exit(2);
  }
  var rnd = mulberry32(SEED);
  var users = [];
  var errors = [];
  var yongshinRaw = {};   // 원문 → { count, el, dmEl 표본 }
  var rawTagLists = [];   // V2 raw(중복 포함) — 검증·보고용

  // Balance counters (function-scoped — also read by the report below).
  var strCount = {}, strReject = {}, mbtiCount = {};
  Object.keys(STRENGTH_QUOTA).forEach(function (s) { strCount[s] = 0; strReject[s] = 0; });
  MBTI16.forEach(function (mm) { mbtiCount[mm] = 0; });
  var attempts = 0;

  var origLog = console.log;
  console.log = function () {}; // buildUserTags [TAG-V2] 콘솔 억제 (산출 데이터 무영향)
  while (users.length < N && attempts < MAX_ATTEMPTS) {
    attempts++;
    var p = drawCandidate(rnd);
    var saju, gg;
    try {
      saju = core.calcSajuForApp(p.y, p.m, p.d, p.h, p.min, null);
      gg = ana.analyzeGyeokguk(saju);
    } catch (e) {
      errors.push({ birth: p.y + '-' + p.m + '-' + p.d, err: String(e && e.message || e) });
      continue;
    }
    // strength rejection — over-quota grade is skipped, a new birthdate is drawn next loop.
    var grade = gg.strengthGrade;
    if (!(grade in STRENGTH_QUOTA)) continue; // unknown grade guard
    if (strCount[grade] >= STRENGTH_QUOTA[grade]) { strReject[grade]++; continue; }
    // MBTI quota assignment (birth-independent) — random among types with remaining quota.
    var avail = MBTI16.filter(function (mm) { return mbtiCount[mm] < MBTI_PER; });
    if (!avail.length) avail = MBTI16;
    var mbti = avail[Math.floor(rnd() * avail.length)];
    try {
      var dw = ana.calcDaewoon(saju, p.y, p.m, p.d, p.h, p.min, p.gender);
      var tags = v2.buildUserTagsV2(saju, gg, dw, mbti, null, { baseYear: BASE_YEAR, birthYear: p.y });
      if (gg && gg.yongshin) {
        var key = gg.yongshin;
        if (!yongshinRaw[key]) {
          yongshinRaw[key] = { count: 0, el: v2.extractYongshinEl(key, saju.dmEl), dmElSample: saju.dmEl };
        }
        yongshinRaw[key].count++;
      }
      var uniq = [];
      var seen = {};
      for (var t = 0; t < tags.length; t++) { if (!seen[tags[t]]) { seen[tags[t]] = 1; uniq.push(tags[t]); } }
      var idx = users.length;
      users.push({
        uid: 'U' + String(idx).padStart(3, '0'),
        birth: p.y + '-' + String(p.m).padStart(2, '0') + '-' + String(p.d).padStart(2, '0'),
        hour: p.h, min: p.min, gender: p.gender, mbti: mbti, tags: uniq
      });
      rawTagLists.push(tags);
      strCount[grade]++; mbtiCount[mbti]++;
    } catch (e) {
      errors.push({ birth: p.y + '-' + p.m + '-' + p.d, err: String(e && e.message || e) });
    }
  }
  console.log = origLog;

  // df — unique 태그 보유율
  var df = {};
  users.forEach(function (u) { u.tags.forEach(function (t) { df[t] = (df[t] || 0) + 1; }); });
  Object.keys(df).forEach(function (t) { df[t] = +(df[t] / users.length).toFixed(4); });

  // vocab — prefix별 값 목록 (기존 방출 전 prefix + 신규 4축)
  var vocab = {};
  Object.keys(df).forEach(function (t) {
    var c = t.indexOf(':');
    var pre = c > 0 ? t.slice(0, c) : '_';
    (vocab[pre] = vocab[pre] || []).push(t);
  });
  Object.keys(vocab).forEach(function (k) { vocab[k].sort(); });

  // invalid_tags — 패턴 평면 전체에서 temperament: 비정상 값 마킹 (① 패치: ② 큐 후보 제외용)
  var VALID_KTS = { 'temperament:NF': 1, 'temperament:NT': 1, 'temperament:SJ': 1, 'temperament:SP': 1 };
  var pdata = require(path.join(LIB, 'pattern-data.js'));
  var invalidTags = {};
  Object.keys(pdata.MBTS_PATTERNS).forEach(function (cat) {
    Object.keys(pdata.MBTS_PATTERNS[cat]).forEach(function (subj) {
      pdata.MBTS_PATTERNS[cat][subj].forEach(function (p) {
        (p.tags || []).forEach(function (t) {
          if (t.indexOf('temperament:') === 0 && !VALID_KTS[t]) {
            if (!invalidTags[t]) invalidTags[t] = { reason: 'Keirsey 4기질(NF/NT/SJ/SP) 외 값', slots: 0, where: [] };
            invalidTags[t].slots++;
            if (invalidTags[t].where.indexOf(cat + '/' + subj) < 0) invalidTags[t].where.push(cat + '/' + subj);
          }
        });
      });
    });
  });

  // mbtiaxis 자동 판정 (W-D2/P2): axis: 방출이 축×강도 칸을 제공하는가
  var axisVals = vocab['axis'] || [];
  var axisHasIntensityCells = axisVals.some(function (t) { return !/^axis:(EI|SN|TF|JP)$/.test(t); });
  var axisAllCovered = axisVals.length > 0 && axisVals.every(function (t) { return df[t] > 0; });
  var mbtiaxisDecision = (axisHasIntensityCells && axisAllCovered)
    ? { decision: 'reuse-axis', reason: 'axis: 동적 칸 존재 + 전 칸 보유자 ≥1' }
    : {
        decision: 'axis-fixed-4-registered--mbtiaxis-deferred',
        reason: 'axis: 방출은 고정 4종(EI/SN/TF/JP, 전원 보유 — 변별 0)뿐이라 축×강도 칸 미제공. ' +
          'mbtiaxis:{축}_{강도} 신설은 모집단 intensities=null이라 강도 칸 산출 불가 — ' +
          'fx 점수 컷과 동일하게 유저 실강도 데이터 축적 후 재검토로 이월. vocab에는 기존 axis: 4종 등재(② "mbtiaxis-또는-axis" 충족).'
      };

  // 엔진 커밋 해시
  var commit = '';
  try { commit = cp.execSync('git rev-parse --short HEAD', { cwd: LIB }).toString().trim(); } catch (e) { commit = 'unknown'; }

  var tagDf = {
    meta: {
      '생성일': new Date().toISOString().slice(0, 10),
      '모집단': users.length, '시드': SEED, '엔진커밋': commit, 'baseYear': BASE_YEAR,
      'birthRange': [BIRTH_Y_MIN, BIRTH_Y_MAX], 'hourNullRate': HOUR_NULL_RATE,
      'mbti분포': '16종 쿼터 균등(' + MBTI_PER + '/종)',
      'samplingMode': 'balanced-v2', 'strengthQuota': STRENGTH_QUOTA, 'samplingAttempts': attempts,
      'genericPrefixes': GENERIC_PREFIXES,
      'mbtiaxis': mbtiaxisDecision,
      'invalid_tags': invalidTags,
      'queueRules': {
        'temperamentAxis': 'kts',
        '비고': '① 패치(2026-06-13): ② 주문서 후보·모니터 축·쌍둥이 가변 태그는 temperament: 대신 kts: 사용. ' +
          'invalid_tags는 큐 후보에서 제외. 라이브 temperament:는 substring(1,3) 버그로 SJ/SP 영구 미포착(RO 유지).'
      },
      'users비고': 'tags는 실방출 unique. birth/hour/min/gender/mbti 보존 — ② 쌍둥이 엔진 실계산용(D2)'
    },
    vocab: vocab,
    df: df,
    users: users
  };

  fs.writeFileSync(OUT, JSON.stringify(tagDf, null, 1), 'utf8');

  var stateDir = path.join(__dirname, 'state');
  if (!fs.existsSync(stateDir)) fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(path.join(stateDir, 'yongshin_raw.json'), JSON.stringify(yongshinRaw, null, 1), 'utf8');

  // 리포트
  var ys = Object.keys(yongshinRaw);
  var ysFail = ys.filter(function (k) { return !yongshinRaw[k].el; });
  var ysFailUsers = ysFail.reduce(function (s, k) { return s + yongshinRaw[k].count; }, 0);
  var newAxes = ['dwss', 'sess', 'fx', 'yongshin_el', 'kts'];
  var rep = [];
  rep.push('gen-tag-df 리포트 — ' + new Date().toISOString());
  rep.push('모집단 ' + users.length + '명 / 에러 ' + errors.length + '건 / 시드 ' + SEED + ' / baseYear ' + BASE_YEAR + ' / 엔진 ' + commit);
  rep.push('태그 0개 유저: ' + users.filter(function (u) { return u.tags.length === 0; }).length + '명');
  rep.push('[balanced] 추첨 ' + attempts + '회 → 채택 ' + users.length +
    ' / strength reject ' + Object.keys(strReject).map(function (s) { return s + ':' + strReject[s]; }).join(' '));
  rep.push('  strength 최종: ' + Object.keys(strCount).map(function (s) { return s + '=' + strCount[s]; }).join(' '));
  rep.push('  MBTI 최종(종별): ' + MBTI16.map(function (mm) { return mbtiCount[mm]; }).join('/'));
  rep.push('  출력: ' + OUT);
  rep.push('');
  newAxes.forEach(function (ax) {
    var vals = vocab[ax] || [];
    rep.push('[' + ax + '] ' + vals.length + '칸');
    vals.forEach(function (t) { rep.push('  ' + t + ' = ' + Math.round(df[t] * users.length) + '명 (' + (df[t] * 100).toFixed(1) + '%)'); });
  });
  rep.push('');
  rep.push('[yongshin_el 추출] 원문 ' + ys.length + '종 / 실패 ' + ysFail.length + '종 (' + ysFailUsers + '명, ' +
    (users.length ? (ysFailUsers / users.length * 100).toFixed(1) : 0) + '%)');
  ysFail.forEach(function (k) { rep.push('  실패 원문: "' + k + '" × ' + yongshinRaw[k].count); });
  rep.push('');
  rep.push('[axis 분포] ' + (vocab['axis'] || []).map(function (t) { return t + '=' + (df[t] * 100).toFixed(0) + '%'; }).join(' '));
  rep.push('[mbtiaxis 판정] ' + mbtiaxisDecision.decision + ' — ' + mbtiaxisDecision.reason);
  rep.push('[invalid_tags] ' + (Object.keys(invalidTags).length ?
    Object.keys(invalidTags).map(function (t) { return t + '(' + invalidTags[t].slots + '슬롯)'; }).join(' ') : '없음'));
  if (errors.length) { rep.push(''); rep.push('[에러]'); errors.forEach(function (e) { rep.push('  ' + JSON.stringify(e)); }); }

  fs.writeFileSync(path.join(stateDir, 'gen_report.txt'), rep.join('\n'), 'utf8');
  console.log(rep.join('\n'));
}

main();
