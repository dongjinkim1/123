// observer/observer.js — D7: 편면 거울 — 체크포인트(30장)마다 fable 1콜
// 산출은 state/observer/ 에만 — 토론 ctx 어떤 경로로도 미주입(TC-10·16), 환류는 동진 경유만.
'use strict';

var fs = require('fs');
var path = require('path');
var OBS_DIR = path.join(__dirname, '..', 'state', 'observer');

function summarizeBatch(records) {
  return records.map(function (r) {
    return [r.order_id, r.decision, r.tier || '-', r.impact || '-', r.format,
      (r.tags || []).join('|'), (r.reason || '').slice(0, 60)].join(' / ');
  }).join('\n');
}

function run(checkpointNo, records, callFn) {
  if (!fs.existsSync(OBS_DIR)) fs.mkdirSync(OBS_DIR, { recursive: true });
  var prompt = '너는 패턴 생산 라인의 관찰자다. 최근 ' + records.length +
    '건의 판정 메타(전사 아님)를 보고 다음만 보고하라: (1)편향 경보 — 특정 축·형식·사유 쏠림 ' +
    '(2)미개척 지도 — 시도되지 않은 조건 영역 (3)융합 가설 — 눈에 띄는 교차 아이디어 1~2개.\n' +
    '운영 지시·결론 유도는 금지. 보고서만.\n\n# 판정 메타\n' + summarizeBatch(records);
  var r = callFn('observer', prompt, { expectJson: false });
  var file = path.join(OBS_DIR, 'cp_' + String(checkpointNo).padStart(3, '0') + '.md');
  fs.writeFileSync(file, '# 관찰자 보고 CP' + checkpointNo + '\n\n' + r.text, 'utf8');
  return file;
}

module.exports = { run: run, summarizeBatch: summarizeBatch, OBS_DIR: OBS_DIR };
