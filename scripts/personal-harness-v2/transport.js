// scripts/personal-harness-v2/transport.js — D8: CC 헤드리스 transport (fable-5 단일, C22)
// cc = claude.cmd -p spawn(stdin 전달, 호출마다 새 프로세스). 역할별 세션 분리(오염 방지).
// 세션 전략: (b)전사 재전달 기본 / (a)--resume 옵션 — 파일럿 실측으로 확정(§0-α ④).
// opus 폴백 = 자동 모드 금지(플래그 파일 + 수동 승인 없이는 발동 불가).
'use strict';

var fs = require('fs');
var path = require('path');
var cp = require('child_process');
var ai = require(path.join(__dirname, '..', '..', 'lib', 'ai-client.js'));

var STATE = path.join(__dirname, 'state');
var MODEL = 'claude-fable-5';
var CALL_TIMEOUT_MS = 240000;
var QUOTA_FILE = path.join(STATE, 'quota.json');

// 역할별 CLI 세션 id 저장 (전략 a용) — 같은 fable이라도 페르소나 세션 공유 금지
var sessions = {};

function loadQuota() {
  try { return JSON.parse(fs.readFileSync(QUOTA_FILE, 'utf8')); }
  catch (e) { return { calls: 0, tokensIn: 0, tokensOut: 0, rateLimitHits: 0 }; }
}
function saveQuota(q) {
  if (!fs.existsSync(STATE)) fs.mkdirSync(STATE, { recursive: true });
  fs.writeFileSync(QUOTA_FILE, JSON.stringify(q), 'utf8');
}
function estTokens(s) { return Math.ceil((s || '').length / 4); }

function isRateLimited(text) {
  return /rate.?limit|overloaded|429|quota|exceeded|too many requests|usage limit/i.test(text || '');
}

// QuotaWaitError — harness2가 잡아 저장→대기→재개
function QuotaWaitError(msg) { var e = new Error(msg); e.code = 'QUOTA_WAIT'; return e; }

function opusForbidden() {
  // 자동 주행 중 폴백 발동 불가 — 수동 승인 플래그 파일이 있어도 모델은 로그로만 전환 가능 설계
  var flag = path.join(STATE, 'OPUS_FALLBACK_APPROVED.flag');
  return !fs.existsSync(flag);
}

// 1회 spawn. systemHint+payload는 stdin으로 (Windows argv 32KB 제한 회피).
function spawnOnce(prompt, opts) {
  var args = ['-p', '--model', MODEL];
  if (opts && opts.resumeSession) args.push('--resume', opts.resumeSession);
  if (opts && opts.captureSession) args.push('--output-format', 'json');
  var r = cp.spawnSync('claude.cmd', args, {
    input: prompt, encoding: 'utf8', timeout: CALL_TIMEOUT_MS,
    cwd: 'C:\\tmp', shell: false, windowsHide: true,
    maxBuffer: 16 * 1024 * 1024
  });
  if (r.error && r.error.code === 'ETIMEDOUT') return { ok: false, out: '', err: 'TIMEOUT' };
  var out = (r.stdout || '').trim();
  var err = (r.stderr || '').trim();
  if (r.status !== 0 && !out) return { ok: false, out: out, err: err || ('exit ' + r.status) };
  return { ok: true, out: out, err: err };
}

// call(role, prompt, opts) → { text, json?, model, transport, tokens, ms }
//   opts: { expectJson, resume(전략 a), retryLeft }
function call(role, prompt, opts) {
  opts = opts || {};
  if (opusForbidden() === false) {
    // 플래그가 있어도 자동 모드에서는 기록만 — 모델 전환은 구현적으로 차단(C22)
    appendLog('[opus 플래그 감지 — 자동 모드에서는 무시(§0-α)]');
  }
  var q = loadQuota();
  var t0 = Date.now();
  var sessOpt = {};
  if (opts.resume && sessions[role]) sessOpt.resumeSession = sessions[role];
  if (opts.resume && !sessions[role]) sessOpt.captureSession = true;

  var r = spawnOnce(prompt, sessOpt);
  var ms = Date.now() - t0;

  if (!r.ok || isRateLimited(r.out) || isRateLimited(r.err)) {
    if (isRateLimited(r.out) || isRateLimited(r.err)) {
      q.rateLimitHits++; saveQuota(q);
      throw QuotaWaitError('rate limit: ' + (r.err || r.out).slice(0, 200));
    }
    if ((opts.retryLeft == null ? 1 : opts.retryLeft) > 0) {
      return call(role, prompt, Object.assign({}, opts, { retryLeft: 0 }));
    }
    throw new Error('transport 실패(' + role + '): ' + (r.err || 'empty').slice(0, 300));
  }

  var text = r.out;
  // 전략 a: --output-format json이면 {result, session_id} 래핑
  if (sessOpt.captureSession) {
    var wrap = ai.parseAIResponse(text);
    if (wrap && wrap.session_id) { sessions[role] = wrap.session_id; text = wrap.result || text; }
  }

  var json = null;
  if (opts.expectJson) {
    json = ai.parseAIResponse(text); // 4단 파서
    if (!json && (opts.retryLeft == null ? 1 : opts.retryLeft) > 0) {
      var retry = call(role, prompt + '\n\n직전 출력이 JSON 파싱에 실패했다. 유효한 JSON 객체 하나만 다시 출력하라.',
        Object.assign({}, opts, { retryLeft: 0 }));
      return retry;
    }
  }

  q.calls++; q.tokensIn += estTokens(prompt); q.tokensOut += estTokens(text);
  saveQuota(q);
  return { text: text, json: json, model: MODEL, transport: 'cc', tokens: estTokens(prompt) + estTokens(text), ms: ms };
}

// Supabase 적재 — P3 비차단: 로컬 정본, 실패/미설정분은 pending_upload.jsonl 보류
function uploadOrDefer(record) {
  var pending = path.join(STATE, 'pending_upload.jsonl');
  fs.appendFileSync(pending, JSON.stringify(record) + '\n', 'utf8');
  return { deferred: true };
}

function appendLog(line) {
  fs.appendFileSync(path.join(STATE, 'auto_decisions.log'),
    '[' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ']' + line + '\n', 'utf8');
}

function ping() {
  var r = spawnOnce('pong이라고 한 단어만 출력해', {});
  return r.ok && /pong/i.test(r.out);
}

module.exports = { call: call, ping: ping, uploadOrDefer: uploadOrDefer,
  loadQuota: loadQuota, estTokens: estTokens, isRateLimited: isRateLimited,
  MODEL: MODEL, _sessions: sessions };
