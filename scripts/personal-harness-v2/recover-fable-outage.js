// recover-fable-outage.js — fable 미가용 구간의 가짜 reject 복구 (일회성)
// fable 끊긴 후 "산출 null(파싱 실패)" reject들은 실제 토론이 아니라 모델 에러 텍스트다.
// done에서 제거 → fable/opus 재개 후 재토론. journal은 별도 파일로 격리(전사 보존).
'use strict';
var fs = require('fs');
var path = require('path');
var STATE = path.join(__dirname, 'state');

function rd(f) { return fs.readFileSync(path.join(STATE, f), 'utf8'); }
function isFableErr(reason) { return /파싱 실패|산출 null|null\(파싱/.test(reason || ''); }

var dry = process.argv.indexOf('--apply') < 0;
var journal = rd('journal.jsonl').trim().split('\n').map(JSON.parse);
var st = JSON.parse(rd('harness_state.json'));

// fable 끊긴 경계 = 첫 파싱실패 인덱스. 그 이후의 파싱실패 reject만 가짜로 간주.
var firstFailIdx = journal.findIndex(function (j) { return j.decision === 'reject' && isFableErr(j.reason); });
var fake = [], keep = [];
journal.forEach(function (j, i) {
  if (i >= firstFailIdx && j.decision === 'reject' && isFableErr(j.reason)) fake.push(j);
  else keep.push(j);
});

// 안전 검증: accepted 중 가짜 구간 order_id가 섞였는지 (섞이면 안 됨)
var fakeIds = {};
fake.forEach(function (j) { fakeIds[j.order_id] = 1; });
var acceptedContaminated = (st.accepted || []).filter(function (p) { return fakeIds[p.order_id]; });

console.log('=== fable 미가용 복구 ' + (dry ? '(DRY-RUN)' : '(APPLY)') + ' ===');
console.log('journal 총 ' + journal.length + ' / 가짜 reject ' + fake.length + ' / 보존 ' + keep.length);
console.log('done 현재 ' + Object.keys(st.done).length + '개');
console.log('accepted 오염 검사: ' + acceptedContaminated.length + '건 (0이어야 안전)');
console.log('복구 대상 order_id 샘플: ' + fake.slice(0, 3).map(function (j) { return j.order_id; }).join(', ') +
  ' … ' + fake.slice(-1).map(function (j) { return j.order_id; }));

if (acceptedContaminated.length > 0) {
  console.error('중단: accepted에 가짜 구간 id 포함 — 수동 확인 필요'); process.exit(1);
}
if (dry) { console.log('\n--apply 로 실제 복구 실행'); process.exit(0); }

// 1. done에서 가짜 제거 → 재토론 대상화
fake.forEach(function (j) { delete st.done[j.order_id]; });
// 2. rejected 카운트 보정
st.rejected = Math.max(0, (st.rejected || 0) - fake.length);
st.processed = Math.max(0, (st.processed || 0) - fake.length);
// 3. 전사 _fableout 마킹 (fable 에러만 담긴 전사 — 재발굴 자산에서 구분)
var moved = 0;
fake.forEach(function (j) {
  var code = j.order_id.split('-')[0];
  var src = path.join(STATE, 'transcripts', code, j.order_id + '.jsonl');
  if (fs.existsSync(src)) {
    fs.renameSync(src, src.replace('.jsonl', '_fableout.jsonl'));
    moved++;
  }
});
// 4. journal 격리: 가짜 줄을 outage 파일로 이동, 메인 journal은 보존분만
fs.writeFileSync(path.join(STATE, 'journal_fable_outage.jsonl'),
  fake.map(function (j) { return JSON.stringify(j); }).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(STATE, 'journal.jsonl'),
  keep.map(function (j) { return JSON.stringify(j); }).join('\n') + '\n', 'utf8');
fs.writeFileSync(path.join(STATE, 'harness_state.json'), JSON.stringify(st, null, 1), 'utf8');

console.log('\n복구 완료: done에서 ' + fake.length + '건 제거 / 전사 ' + moved + '건 _fableout 마킹');
console.log('journal: ' + keep.length + '줄 보존 / journal_fable_outage.jsonl: ' + fake.length + '줄 격리');
console.log('재개 시 ' + fake.length + '개 주문서 재토론 대상');
