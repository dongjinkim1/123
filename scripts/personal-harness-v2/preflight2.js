// scripts/personal-harness-v2/preflight2.js — ② preflight: 가드 체크 + arbiter 입력 자산 생성
// 풀 동결(동진 확정 2026-06-13): 현재 premium 풀 기준 1회 고정 — 변동 감지 시 경고 로그+스냅샷 유지.
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var crypto = require('crypto');

var ROOT = path.join(__dirname, '..', '..');
var LIB = path.join(ROOT, 'lib');
var STATE = path.join(__dirname, 'state');
var pd = require(path.join(LIB, 'pattern-data.js'));

var SUBJ14 = ['고쳐야 할 점', '기회의 시기', '나의 성격', '나의 장점', '남들이 보는 나',
  '대운 흐름', '맞춤 재물 쌓는 법', '연애 스타일', '연애 지뢰', '올해 조언',
  '올해 키워드', '인생 한줄 마무리', '잘 맞는 타입', '직장 적성'];

// 주문서·패턴 id용 소주제 코드 (C16 — 결정적, auto_decisions.log 기록)
var SUBJ_CODE = {
  '고쳐야 할 점': 'FIX', '기회의 시기': 'OPP', '나의 성격': 'PSN', '나의 장점': 'STR',
  '남들이 보는 나': 'IMG', '대운 흐름': 'DWF', '맞춤 재물 쌓는 법': 'MNY', '연애 스타일': 'LVS',
  '연애 지뢰': 'LVM', '올해 조언': 'YAD', '올해 키워드': 'YKW', '인생 한줄 마무리': 'LIF',
  '잘 맞는 타입': 'MAT', '직장 적성': 'JOB'
};

function fail(msg) { console.error('✗ HARD-STOP: ' + msg); process.exit(9); }
function ok(msg) { console.log('✓ ' + msg); }

function main() {
  if (!fs.existsSync(STATE)) fs.mkdirSync(STATE, { recursive: true });
  ['reports', 'transcripts', 'observer', 'snapshots'].forEach(function (d) {
    var p = path.join(STATE, d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });

  // 1. RO 무변조 (금지 5종 + 런타임 lib 3종)
  var RO = ['public/engine.js', 'public/saju.js', 'public/service.js', 'public/js/bundle.js',
    'public/login.js', 'lib/pattern-matcher.js', 'lib/prompt-builder-usr.js', 'lib/pattern-data.js'];
  var diff = cp.execSync('git diff --name-only HEAD', { cwd: ROOT }).toString();
  var touched = RO.filter(function (f) { return diff.indexOf(f) >= 0; });
  if (touched.length) fail('RO 변조: ' + touched.join(','));
  ok('RO 8종 무변조');

  // 2. 베이스 사본
  var basePath = path.join(__dirname, 'base', 'harness.js.bak');
  if (!fs.existsSync(basePath)) fail('베이스 사본 없음');
  var baseLines = fs.readFileSync(basePath, 'utf8').split('\n').length;
  ok('베이스 사본 확보 (' + baseLines + '줄 — 명령서 1,722줄 명기와 불일치는 기보고)');

  // 3. ① 산출 tag-df.json — 5축 + queueRules(kts 패치)
  var tdfPath = path.join(LIB, 'tag-df.json');
  if (!fs.existsSync(tdfPath)) fail('lib/tag-df.json 부재 — ① 미실행');
  var tdf = JSON.parse(fs.readFileSync(tdfPath, 'utf8'));
  ['dwss', 'sess', 'fx', 'yongshin_el', 'kts'].forEach(function (ax) {
    if (!tdf.vocab[ax] || !tdf.vocab[ax].length) fail('① 축 미등재: ' + ax);
  });
  if (!tdf.vocab['axis']) fail('axis 미등재 (mbtiaxis-또는-axis)');
  if (!tdf.meta.queueRules || tdf.meta.queueRules.temperamentAxis !== 'kts') fail('queueRules.kts 부재');
  ok('tag-df 5축+axis+queueRules(kts) 등재 — users ' + tdf.users.length + '명, 시드 ' + tdf.meta['시드']);

  // 4. 14키 diff (C10)
  var premKeys = Object.keys(pd.MBTS_PATTERNS.premium).sort();
  if (JSON.stringify(premKeys) !== JSON.stringify(SUBJ14.slice().sort())) {
    fail('premium 14키 불일치: ' + JSON.stringify(premKeys));
  }
  ok('premium 14키 원문 diff 0');

  // 5. 풀 동결 스냅샷 (동진 지시 4 — 변동 = 경고+스냅샷 기준 유지, 하드 정지 아님)
  var all = [];
  premKeys.forEach(function (s) { pd.MBTS_PATTERNS.premium[s].forEach(function (p) { all.push({ s: s, p: p }); }); });
  var poolHash = crypto.createHash('sha1')
    .update(JSON.stringify(all.map(function (x) { return [x.p.id, x.p.tier, x.p.impact, x.p.tags]; })))
    .digest('hex').slice(0, 12);
  var freezePath = path.join(STATE, 'pool_freeze.json');
  if (fs.existsSync(freezePath)) {
    var prev = JSON.parse(fs.readFileSync(freezePath, 'utf8'));
    if (prev.hash !== poolHash) {
      console.log('⚠ 풀 변동 감지 (' + prev.hash + '→' + poolHash + ') — 동결 시점 스냅샷 기준 유지(경고만)');
      appendLog('[풀 변동 경고] ' + prev.hash + '→' + poolHash + ' — 캘리브레이션·인덱스는 동결분 유지');
    } else ok('풀 동결 일치 (' + poolHash + ', ' + all.length + '개)');
  } else {
    fs.writeFileSync(freezePath, JSON.stringify({ hash: poolHash, count: all.length, frozenAt: '2026-06-13' }), 'utf8');
    ok('풀 동결 스냅샷 생성 (' + poolHash + ', ' + all.length + '개)');
  }

  // 6. C14 캘리브레이션 표 (arbiter 상시 입력)
  var tierDist = {}, impDist = {}, impSum = 0, impN = 0;
  all.forEach(function (x) {
    tierDist[x.p.tier || 'NONE'] = (tierDist[x.p.tier || 'NONE'] || 0) + 1;
    var iv = (typeof x.p.impact === 'number') ? x.p.impact : null;
    if (iv != null) { impDist[iv] = (impDist[iv] || 0) + 1; impSum += iv; impN++; }
  });
  var calib = {
    '기준': '기존 premium ' + all.length + '개 — 동일 저울 지시(C14)', 'poolHash': poolHash,
    'tier': tierDist, 'impact_분포': impDist, 'impact_평균': +(impSum / impN).toFixed(2)
  };
  fs.writeFileSync(path.join(STATE, 'calibration.json'), JSON.stringify(calib, null, 1), 'utf8');
  ok('캘리브레이션 표 생성 — tier ' + JSON.stringify(tierDist) + ', impact 평균 ' + calib['impact_평균']);

  // 7. 기존 premium dedup 인덱스 (C15 — 대조 본문 = name+cross)
  var index = all.map(function (x) {
    return { id: x.p.id, subject: x.s, tags: x.p.tags || [], name: x.p.name || '', cross: x.p.cross || '', tier: x.p.tier };
  });
  fs.writeFileSync(path.join(STATE, 'premium_index.json'), JSON.stringify(index), 'utf8');
  var h2 = index.filter(function (x) { return /^H2-/.test(x.id); });
  if (h2.length) fail('기존 id에 H2- 충돌: ' + h2.map(function (x) { return x.id; }).join(','));
  ok('dedup 인덱스 ' + index.length + '개 (H2- 충돌 0)');

  // 8. C19 층화 목표표 (strength 비례+하한 5%)
  var GR = ['극신강', '신강', '중화', '신약', '극신약'];
  var N = tdf.users.length;
  var props = GR.map(function (g) { return (tdf.df['strength:' + g] || 0); });
  var floored = props.map(function (p) { return Math.max(p, 0.05); });
  var sum = floored.reduce(function (a, b) { return a + b; }, 0);
  var strata = {};
  GR.forEach(function (g, i) { strata[g] = +(floored[i] / sum).toFixed(4); });
  fs.writeFileSync(path.join(STATE, 'strata.json'), JSON.stringify({
    '모집단': props.map(function (p, i) { return GR[i] + ':' + Math.round(p * N); }).join(' '),
    '할당': strata, '하한': 0.05,
    '모니터축': { '상한': 0.4, '축': ['dm', 'kts', 'cf', 'ss'] }
  }, null, 1), 'utf8');
  ok('층화 목표표: ' + JSON.stringify(strata));

  // 9. subj 코드 테이블
  SUBJ14.forEach(function (s) { if (!SUBJ_CODE[s]) fail('subj 코드 누락: ' + s); });
  fs.writeFileSync(path.join(STATE, 'subj_codes.json'), JSON.stringify(SUBJ_CODE, null, 1), 'utf8');
  ok('subj 코드 14키 확정');

  // 10. generic prefix (① meta 소비 — 하드코딩 금지 P6)
  if (JSON.stringify(tdf.meta.genericPrefixes) !== JSON.stringify(['uses:', 'ref:', 'pillar:'])) {
    console.log('⚠ genericPrefixes 변동: ' + JSON.stringify(tdf.meta.genericPrefixes) + ' — meta 기준 사용');
  }
  ok('generic prefix = ' + tdf.meta.genericPrefixes.join(' '));

  console.log('\npreflight2 전 항목 PASS — fable 실핑·세션 전략·왕복 토큰은 파일럿에서 실측(§0-α)');
}

function appendLog(line) {
  fs.appendFileSync(path.join(STATE, 'auto_decisions.log'),
    '[' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ']' + line + '\n', 'utf8');
}

main();
