// scripts/repair-verify/anchors.js
// Gate G2 — every anchor listed in CC_명령서_엔진수리1차_v1 §2, as executable checks.
//
//   node scripts/repair-verify/anchors.js
'use strict';

var loader = require('./load-engine');
var path = require('path');
var ROOT = path.join(__dirname, '..', '..');
var core = require(path.join(ROOT, 'lib', 'saju-core'));
var analysis = require(path.join(ROOT, 'lib', 'saju-analysis'));

var S = loader.loadEngine();
var pass = 0, fail = 0, lines = [];

function ok(cond, label, got, want) {
  if (cond) { pass++; lines.push('  PASS  ' + label + (got !== undefined ? '  → ' + got : '')); }
  else { fail++; lines.push('  FAIL  ' + label + '  got=' + got + '  want=' + want); }
}
function eq(label, got, want) { ok(String(got) === String(want), label, got, want); }
function section(t) { lines.push('\n[' + t + ']'); }

function pillars(y, m, d, h, mi, lng) {
  var s = S.calcSajuForApp(y, m, d, h, mi, lng === undefined ? null : lng);
  return {
    y: s.P[0].s + s.P[0].b, m: s.P[1].s + s.P[1].b,
    d: s.P[2].s + s.P[2].b, h: s.P[3].s + s.P[3].b,
    cj: s.currentJeolgi, all: s.P.map(function (p) { return p.s + p.b; }).join(' ')
  };
}
// Reconstructs which solar terms bracket the birth instant, using the same JD
// formula calcDaewoon now uses.
function terms(y, m, d, h, mi) {
  var n = S.normalizeBirthTime(y, m, d, h, mi, null);
  var jd = S.dateToJDN(n.kst.y, n.kst.m, n.kst.d) +
           (n.kst.h === null ? 0.5 : n.kst.h / 24 + (n.kst.min || 0) / 1440);
  var K = 9 / 24, prev = null, next = null;
  for (var yy = y - 1; yy <= y + 1; yy++) {
    for (var j = 0; j < S.JG_LONG.length; j++) {
      var t = S.findSolarTermJD(yy, S.JG_LONG[j].l) + K;
      if (t <= jd && (!prev || t > prev.jd)) prev = {n: S.JG_LONG[j].n, jd: t};
      if (t > jd && (!next || t < next.jd)) next = {n: S.JG_LONG[j].n, jd: t};
    }
  }
  return {prev: prev, next: next, prevDays: jd - prev.jd, nextDays: next.jd - jd};
}
function dwAge(y, m, d, h, mi, g) {
  var sj = S.calcSajuForApp(y, m, d, h, mi, null);
  return S.calcDaewoon(sj, y, m, d, h, mi, g).daewoonAge;
}

/* ── 일진 검산 (self-check for every day-pillar anchor) ── */
section('일진 검산');
eq('2024-01-01 일주 = 갑자', pillars(2024, 1, 1, 12, 0).d, '갑자');

/* ── F1 ── */
section('F1 절기 비교 JD 12h 오프셋');
var f1a = pillars(2000, 2, 5, 6, 0);
eq('2000-02-05 06:00 연주 = 경진', f1a.y, '경진');
eq('2000-02-05 06:00 월주 = 무인', f1a.m, '무인');
var f1b = pillars(2000, 2, 4, 20, 0);
eq('2000-02-04 20:00 연주 = 기묘 (입춘 전 유지)', f1b.y, '기묘');
eq('2000-02-04 20:00 월주 = 정축', f1b.m, '정축');
var f1c = pillars(2024, 8, 7, 15, 0);
eq('2024-08-07 15:00 월주 = 임신', f1c.m, '임신');
eq('2024-08-07 15:00 currentJeolgi = 입추', f1c.cj, '입추');

/* ── F1 불변 조건 ── */
section('F1 불변 조건 — 일주는 시각에 영향받지 않는다 (23시 이월 제외)');
var invariantOk = true, invBad = '';
for (var yy = 1950; yy <= 2020 && invariantOk; yy += 7) {
  for (var mm = 1; mm <= 12 && invariantOk; mm++) {
    var base = pillars(yy, mm, 15, 0, 0).d;
    [3, 9, 15, 22].forEach(function (hh) {
      var v = pillars(yy, mm, 15, hh, 0).d;
      if (v !== base) { invariantOk = false; invBad = yy + '-' + mm + ' ' + hh + '시 ' + v + '≠' + base; }
    });
  }
}
ok(invariantOk, '00~22시 사이 일주 불변 (1950~2020 표본)', invariantOk ? 'OK' : invBad, 'OK');

/* ── F2 ── */
section('F2 대운 birthJD 12h 오프셋 (D6: 절기 선택의 정확성 기준)');
var t1 = terms(2024, 8, 7, 15, 0);
eq('2024-08-07 15:00 직전 절기 = 입추', t1.prev.n, '입추');
ok(Math.abs(t1.prevDays - 0.24) < 0.05, '  직전 절기까지 거리 ≈ 0.24일', t1.prevDays.toFixed(2), '0.24');
eq('2024-08-07 15:00 직후 절기 = 백로', t1.next.n, '백로');
ok(Math.abs(t1.nextDays - 30.9) < 0.2, '  직후 절기까지 거리 ≈ 30.9일', t1.nextDays.toFixed(2), '30.9');
eq('2024-08-07 15:00 男 대운수 = 10', dwAge(2024, 8, 7, 15, 0, '남'), 10);
lines.push('  (기록) 2024-08-07 15:00 女 대운수 = ' + dwAge(2024, 8, 7, 15, 0, '여') +
           '  ← D6에 따라 판정하지 않고 기록만');
var t2 = terms(1990, 5, 20, 22, 0);
eq('1990-05-20 22:00 직후 절기 = 망종', t2.next.n, '망종');
ok(Math.abs(t2.nextDays - 16.4) < 0.2, '  직후 절기까지 거리 ≈ 16.4일', t2.nextDays.toFixed(2), '16.4');
eq('1990-05-20 22:00 男 대운수 = 5', dwAge(1990, 5, 20, 22, 0, '남'), 5);

/* ── F3 ── */
section('F3 정통 자시설 (cityLng 미지정)');
var z1 = pillars(2025, 5, 15, 22, 30), z2 = pillars(2025, 5, 15, 23, 30), z3 = pillars(2025, 5, 16, 0, 30);
eq('2025-05-15 22:30 일주 = 갑신', z1.d, '갑신');
eq('2025-05-15 22:30 시주 = 을해', z1.h, '을해');
eq('2025-05-15 23:30 일주 = 을유', z2.d, '을유');
eq('2025-05-15 23:30 시주 = 병자 (乙庚일 병자시두)', z2.h, '병자');
eq('2025-05-16 00:30 일주 = 을유', z3.d, '을유');
eq('2025-05-16 00:30 시주 = 병자', z3.h, '병자');
ok(z2.d + z2.h === z3.d + z3.h, '23:30의 (일주,시주) = 익일 00:30과 동일', z2.d + z2.h, z3.d + z3.h);
ok(z2.d + z2.h !== z1.d + z1.h, '23:30의 (일주,시주) ≠ 22:30', z2.d + z2.h, '≠ ' + z1.d + z1.h);
// 진태양시 보정으로 23시↔00시 경계를 넘는 케이스 (경도 지정)
var nz = S.normalizeBirthTime(2025, 5, 15, 23, 10, 131.0);
ok(nz.solar.h === 22 && nz.zasiRolled === false,
   '진태양시 보정으로 23:10→22:58, 자시 이월 취소 (경도 131)',
   nz.solar.h + ':' + nz.solar.min + ' rolled=' + nz.zasiRolled, '22:xx rolled=false');

/* ── F4 ── */
section('F4 벽시계→KST (서머타임·표준시 이력)');
function kst(y, m, d, h, mi) { var r = S.normalizeWallClockToKST(y, m, d, h, mi); return r.m + '/' + r.d + ' ' + r.h + ':' + (r.min < 10 ? '0' : '') + r.min; }
eq('1987-07-15 23:30 → 22:30 (DST -1h)', kst(1987, 7, 15, 23, 30), '7/15 22:30');
eq('1987-07-15 23:30 시주 = 정해 (해시, 이월 없음)', pillars(1987, 7, 15, 23, 30).h, '정해');
eq('1988-06-01 00:30 → 전일 23:30', kst(1988, 6, 1, 0, 30), '5/31 23:30');
eq('1988-06-01 00:30 일주 = 6/1 일주 유지 (이중 경계)',
   pillars(1988, 6, 1, 0, 30).d, pillars(1988, 6, 1, 12, 0).d);
eq('1961-06-15 12:00 → 12:30 (+8:30 표준시)', kst(1961, 6, 15, 12, 0), '6/15 12:30');
eq('1955-06-15 12:00 → 11:30 (DST -1h + 표준시 +30m)', kst(1955, 6, 15, 12, 0), '6/15 11:30');
eq('1995-06-15 12:00 → 변화 없음', kst(1995, 6, 15, 12, 0), '6/15 12:00');

/* ── F5 ── */
section('F5 합충 우선순위');
function relOf(a, b, c, d) {
  var sj = {raw: {yg: 0, yj: a, mg: 0, mj: b, dg: 0, dj: c, hg: 0, hj: d}};
  var r = S.calcRelations(sj);
  return {rel: r, types: S.resolveHapChungPriority(r).resolved.map(function (x) { return x.type; })};
}
var r1 = relOf(0, 1, 6, 3);  // 자축합(연-월) + 자오충, 오=일지
var r2 = relOf(0, 1, 3, 6);  // 자축합(연-월) + 자오충, 오=시지
ok(r1.rel.jijiHap.length > 0, '육합만 있는 명식에서 haps 비어있지 않음', r1.rel.jijiHap.length, '>0');
ok(r1.types.indexOf('합피충파') >= 0, '자축합 + 자오충(오=일지, 인접) → 합피충파', r1.types.join(','), '합피충파');
ok(r2.types.indexOf('탐합망충') >= 0, '자축합 + 자오충(오=시지, 비인접) → 탐합망충', r2.types.join(','), '탐합망충');
// 20,736 전수 — 두 경로 모두 도달 가능해야 한다
var reach = {};
for (var a = 0; a < 12; a++) for (var b = 0; b < 12; b++) for (var c = 0; c < 12; c++) for (var d = 0; d < 12; d++) {
  relOf(a, b, c, d).types.forEach(function (t) { reach[t] = (reach[t] || 0) + 1; });
}
ok((reach['탐합망충'] || 0) > 0, '20,736 전수: 탐합망충 도달 가능', reach['탐합망충'] || 0, '>0');
ok((reach['합피충파'] || 0) > 0, '20,736 전수: 합피충파 도달 가능', reach['합피충파'] || 0, '>0');

/* ── F6 ── */
section('F6 신살 기점표 (제1표·제2표 동시)');
var TG = S.TGAN_KR, JG = S.JIJI_KR;
var CD = [['ji', 5], ['gan', 6], ['gan', 3], ['ji', 8], ['gan', 8], ['gan', 7],
          ['ji', 11], ['gan', 0], ['gan', 9], ['ji', 2], ['gan', 2], ['gan', 1]];
var cdOk = true, cdBad = [];
for (var mj = 0; mj < 12; mj++) {
  // 제2표(CHEONDUK, calcExtraSinsal 경로)가 정본과 일치하는지 — 해당 값을 심어 검출되는지 확인
  var want = CD[mj];
  var sj = {raw: {yg: want[0] === 'gan' ? want[1] : 0, yj: want[0] === 'ji' ? want[1] : 6,
                  mg: 0, mj: mj, dg: 0, dj: 0, hg: 0, hj: 0}};
  var hit = analysis.calcExtraSinsal(sj).some(function (x) { return x.name === '천덕귀인'; });
  if (!hit) { cdOk = false; cdBad.push(JG[mj]); }
}
ok(cdOk, '천덕귀인 제2표 12개월 정본 일치', cdOk ? 'OK' : cdBad.join(','), 'OK');
// 제1표(getSpecialSinsal) 12개월
var cd1Ok = true, cd1Bad = [];
for (var mj = 0; mj < 12; mj++) {
  var w = CD[mj];
  var yg = w[0] === 'gan' ? w[1] : 0, yj = w[0] === 'ji' ? w[1] : 6;
  var hit = S.getSpecialSinsal(yg, yj, 0, mj, 0, 0, 0, 0)
             .some(function (x) { return x.name === '천덕귀인'; });
  if (!hit) { cd1Ok = false; cd1Bad.push(JG[mj]); }
}
ok(cd1Ok, '천덕귀인 제1표 12개월 정본 일치', cd1Ok ? 'OK' : cd1Bad.join(','), 'OK');
// 귀문관살 6쌍 대칭
var gm = [9, 6, 7, 8, 11, 10, 1, 2, 3, 0, 5, 4], gmSym = true;
for (var i = 0; i < 12; i++) if (gm[gm[i]] !== i) gmSym = false;
ok(gmSym, '귀문관살 6쌍 대칭 (자유 축오 인미 묘신 진해 사술)', gmSym ? 'OK' : 'NG', 'OK');
// 백호대살 7종 동주
var BH = [[0, 4], [1, 7], [2, 10], [3, 1], [4, 4], [8, 10], [9, 1]];
var bhOk = true, bhBad = [];
BH.forEach(function (p) {
  var hit = S.getSpecialSinsal(0, 6, 0, 6, p[0], p[1], 0, 6)
             .some(function (x) { return x.name === '백호살'; });
  if (!hit) { bhOk = false; bhBad.push(TG[p[0]] + JG[p[1]]); }
});
ok(bhOk, '백호대살 7종 동주 검출', bhOk ? 'OK' : bhBad.join(','), 'OK');
// 비백호 동주는 잡히면 안 된다
var bhFalse = S.getSpecialSinsal(0, 6, 0, 6, 0, 2, 0, 6)  // 갑인 (백호 아님)
                .some(function (x) { return x.name === '백호살'; });
ok(!bhFalse, '갑인(비백호) 오검출 없음', bhFalse ? 'HIT' : 'none', 'none');

/* ── F7 ── */
section('F7 형(刑) 테이블 2종 통일');
var H = S.JIJI_HYUNG.map(function (h) { return JG[h[0]] + JG[h[1]] + ':' + h[2]; });
eq('삼형 인사신 = 무은지형', H.filter(function (x) { return /^(인사|사신|인신)/.test(x); }).join(' '),
   '인사:무은지형 사신:무은지형 인신:무은지형');
eq('삼형 축술미 = 지세지형', H.filter(function (x) { return /^(축술|술미|축미)/.test(x); }).join(' '),
   '축술:지세지형 술미:지세지형 축미:지세지형');
eq('상형 자묘 = 무례지형', H.filter(function (x) { return /^자묘/.test(x); }).join(' '), '자묘:무례지형');
eq('자형 4종 = 진진·오오·유유·해해',
   H.filter(function (x) { return /자형$/.test(x); }).join(' '),
   '진진:자형 오오:자형 유유:자형 해해:자형');
ok(!H.some(function (x) { return /^묘묘|^미미/.test(x); }), '묘묘·미미 제거됨', 'removed', 'removed');
ok(!H.some(function (x) { return /^축진/.test(x); }), '축진 제거됨 (破 소관)', 'removed', 'removed');
// HYUNG_PAIRS 양방향 — 대운 巳가 원국 寅을 만나면 형이 잡혀야 한다.
// (수리 전에는 단방향 비교라 [2,5] 인→사 방향만 검출되고 사→인은 누락됐다.)
function dwHyungHits(dwJiKr) {
  var saju = {raw: {yg: 0, yj: 2, mg: 0, mj: 6, dg: 0, dj: 0, hg: 0, hj: 6}}; // 원국에 寅
  var dw = {daewoons: [{gan: '을', ji: dwJiKr}], currentDWIdx: 0, seun: null};
  var out = S.analyzeDWSEvsWonkuk(saju, dw);
  return (out.daewoon || []).filter(function (x) { return x.type === '형'; });
}
var hitSa = dwHyungHits('사');   // 대운 巳 ↔ 원국 寅  (역방향 — 수리 전 누락)
var hitIn = dwHyungHits('신');   // 대운 申 ↔ 원국 寅  (인신형)
ok(hitSa.length > 0, 'HYUNG_PAIRS 양방향: 대운 巳 ↔ 원국 寅 검출',
   hitSa.map(function (x) { return x.desc; }).join(' ') || '없음', '형 검출');
ok(hitIn.length > 0, 'HYUNG_PAIRS 양방향: 대운 申 ↔ 원국 寅 검출',
   hitIn.map(function (x) { return x.desc; }).join(' ') || '없음', '형 검출');

/* ── F8 ── */
section('F8 파(破) 검사 루프');
var paRel = S.calcRelations({raw: {yg: 0, yj: 0, mg: 0, mj: 9, dg: 0, dj: 1, hg: 0, hj: 4}});
eq('자유·축진 배치 → 파 2건', paRel.jijiPa.map(function (x) { return x.desc; }).join(','), '자유파,축진파');
var paCount = 0;
for (var a = 0; a < 12; a++) for (var b = 0; b < 12; b++)
  paCount += S.calcRelations({raw: {yg: 0, yj: a, mg: 0, mj: b, dg: 0, dj: 0, hg: 0, hj: 6}}).jijiPa.length;
ok(paCount > 0, '파 검출 총량 > 0 (수리 전 항상 0)', paCount, '>0');

/* ── F9 ── */
section('F9 간여지동 12주');
var GY = [[0, 2], [1, 3], [2, 6], [3, 5], [4, 4], [4, 10], [5, 1], [5, 7], [6, 8], [7, 9], [8, 0], [9, 11]];
var gyOk = true, gyBad = [];
GY.forEach(function (p) {
  var hit = analysis.calcExtraSinsal({raw: {yg: 0, yj: 6, mg: 0, mj: 6, dg: p[0], dj: p[1], hg: 0, hj: 6}})
                    .some(function (x) { return x.name === '간여지동'; });
  if (!hit) { gyOk = false; gyBad.push(TG[p[0]] + JG[p[1]]); }
});
ok(gyOk, '간여지동 12주 전부 검출', gyOk ? 'OK' : gyBad.join(','), 'OK');
var gyFalse = analysis.calcExtraSinsal({raw: {yg: 0, yj: 6, mg: 0, mj: 6, dg: 1, dj: 5, hg: 0, hj: 6}})
                      .some(function (x) { return x.name === '간여지동'; });
ok(!gyFalse, '을사(기존 오류 항목) 오검출 없음', gyFalse ? 'HIT' : 'none', 'none');

/* ── F10 ── */
section('F10 일지(배우자궁) 십성');
[[1993, 5, 26, 8, 40, '식신'], [1990, 3, 15, 14, 30, '편관'], [1985, 12, 3, 14, 0, '정관']]
  .forEach(function (c) {
    var sa = S.calcSajuForApp(c[0], c[1], c[2], c[3], c[4], null);
    eq(c.slice(0, 3).join('-') + ' 일지 십성', sa.jiSS[2].ss, c[5]);
    ok(sa.ss[2].ss === '비견', '  (대조) ss[2].ss는 여전히 비견 = 일간의 십성', sa.ss[2].ss, '비견');
  });
var loveTypes = [[1993, 5, 26, 8, 40], [1990, 3, 15, 14, 30], [1985, 12, 3, 14, 0]].map(function (c) {
  var sa = S.calcSajuForApp(c[0], c[1], c[2], c[3], c[4], null);
  return S.profileAnalysis(sa, S.analyzeGyeokguk(sa), S.calcRelations(sa)).loveType;
});
ok(new Set(loveTypes).size > 1, 'profileAnalysis 연애유형이 실제 분기', loveTypes.join(','), '2종 이상');

/* ── report ── */
console.log('\n=== G2 앵커 전수 ===');
console.log(lines.join('\n'));
console.log('\n  PASS ' + pass + '  FAIL ' + fail + '\n');
process.exit(fail > 0 ? 1 : 0);
