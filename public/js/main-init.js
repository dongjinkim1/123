// main-init.js — shared result, job recovery IIFE, profile sheet

// ── client error reporting ──
window.onerror = function(msg, url, line, col, err) {
  try {
    fetch('/api/log-error', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'client_js',
        message: String(msg).slice(0, 300),
        context: { url: url, line: line, col: col, stack: err && err.stack ? err.stack.slice(0, 500) : null }
      })
    }).catch(function(){});
  } catch(e) {}
};

// ── 공유 코드 감지 → 결과 열람 ──
(async function checkSharedResult() {
  var sc = _shareParam;
  if (!sc) {
    sc = new URLSearchParams(window.location.search).get('s');
  }
  if (!sc) return;
  console.log('[MBTS] 공유코드 감지:', sc);
  try {
    if (typeof MBTSShare === 'undefined') { console.warn('[MBTS] MBTSShare 미로드'); return; }
    var data = await MBTSShare.load(sc);
    if (!data) { console.warn('[MBTS] 공유 결과 없음:', sc); return; }
    var ok = MBTSShare.render(data);
    if (ok) MBTSShare.insertCTA(data.nickname);
    else console.warn('[MBTS] 공유 결과 렌더링 실패');
  } catch(e) { console.warn('[MBTS] 공유 로드 실패:', e); }
})();

// ── MBTS Job 복구 (앱 재진입 시 미완료 분석 복원) ──
(function() {
  var POLL_INTERVAL = 3000;
  var MAX_POLL_WAIT = 300000;

  async function recoverJob() {
    if (typeof _isAnalyzing !== 'undefined' && _isAnalyzing) {
      var activeJob = localStorage.getItem('mbts_active_job');
      if (activeJob) {
        try {
          var aj = JSON.parse(activeJob);
          if (Date.now() - aj.createdAt > 180000) {
            if (typeof _isAnalyzing !== 'undefined') _isAnalyzing = false;
            console.log('[MBTS] 복구: _isAnalyzing stuck 해제 (3분 초과)');
          } else {
            return;
          }
        } catch(e) { return; }
      } else {
        return;
      }
    }

    var stored = localStorage.getItem('mbts_active_job');
    if (!stored) return;

    var job;
    try { job = JSON.parse(stored); } catch(e) {
      localStorage.removeItem('mbts_active_job'); return;
    }

    if (Date.now() - job.createdAt > 600000) {
      localStorage.removeItem('mbts_active_job');
      return;
    }

    console.log('[MBTS] 복구: 미완료 job 발견 (' + job.type + ')');

    var _uidQs = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) ? ('&userId=' + encodeURIComponent(mbtsSession.userId)) : '';
    try {
      var res = await fetch('/api/job-status?id=' + job.jobId + _uidQs);
      var data = await res.json();

      if (data.status === 'done') {
        handleResult(job, data);
      } else if (data.status === 'partial') {
        localStorage.removeItem('mbts_active_job');
        if (typeof showToast === 'function')
          showToast('분석이 불완전하게 끝났어요. 다시 시도해주세요 🔄');
      } else if (data.status === 'failed') {
        localStorage.removeItem('mbts_active_job');
        if (typeof showToast === 'function')
          showToast('백그라운드 분석이 실패했어요. 다시 시도해주세요');
      } else if (data.status === 'processing' || data.status === 'pending' || data.status === 'running') {
        if (typeof showToast === 'function')
          showToast('분석이 아직 진행 중이에요... ⏳');
        startPolling(job);
      } else if (data.status === 'not_found' || data.error === 'Job not found') {
        localStorage.removeItem('mbts_active_job');
      }
    } catch(e) {
      console.warn('[MBTS] 복구 조회 실패:', e);
    }
  }

  function startPolling(job) {
    // M10: stop any previously-registered poller before starting a new one
    if (window._MBTS_activePollTimer) {
      try { clearInterval(window._MBTS_activePollTimer); } catch(e) {}
      window._MBTS_activePollTimer = null;
    }
    var start = Date.now();
    var _uidQs = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) ? ('&userId=' + encodeURIComponent(mbtsSession.userId)) : '';
    var timer = setInterval(async function() {
      if (Date.now() - start > MAX_POLL_WAIT) {
        clearInterval(timer);
        window._MBTS_activePollTimer = null;
        localStorage.removeItem('mbts_active_job');
        if (typeof showToast === 'function')
          showToast('분석 대기 시간이 초과됐어요. 다시 시도해주세요');
        return;
      }
      try {
        var res = await fetch('/api/job-status?id=' + job.jobId + _uidQs);
        var data = await res.json();
        if (data.status === 'done') {
          clearInterval(timer);
          window._MBTS_activePollTimer = null;
          handleResult(job, data);
        } else if (data.status === 'failed' || data.status === 'partial') {
          clearInterval(timer);
          window._MBTS_activePollTimer = null;
          localStorage.removeItem('mbts_active_job');
          if (typeof showToast === 'function')
            showToast(data.status === 'partial'
              ? '분석이 불완전해요 🔄' : '분석이 실패했어요');
        }
      } catch(e) {}
    }, POLL_INTERVAL);
    window._MBTS_activePollTimer = timer;
  }

  function handleResult(job, data) {
    localStorage.removeItem('mbts_active_job');
    var aiText = (data.result && data.result.text) ? data.result.text : '';
    var parsed = parseAI(aiText);
    if (!parsed) {
      if (typeof showToast === 'function')
        showToast('결과를 읽지 못했어요. 다시 시도해주세요 😢');
      return;
    }
    if (job.type === 'saju') recoverSaju(parsed, data, job);
    else if (job.type === 'gunghap') recoverGunghap(parsed, data, job);
  }

  function recoverSaju(parsed, data, job) {
    var inp = null;
    if (data.params && data.params.y) inp = data.params;
    if (!inp && job.input && job.input.y) inp = job.input;
    if (!inp) {
      try {
        var lr = JSON.parse(localStorage.getItem('mbts_lastResult'));
        if (lr && lr.input) inp = lr.input;
      } catch(e) {}
    }
    if (!inp) {
      if (typeof showToast === 'function')
        showToast('복구 데이터가 부족해요. 다시 분석해주세요');
      return;
    }
    try {
      var saju = calcSajuForApp(+inp.y, +inp.m, +inp.d,
        inp.h ? +inp.h : null, inp.min ? +inp.min : null, inp.cityLng || null);
      var gg = analyzeGyeokguk(saju);
      var mt = inp.mbtiChoices ? getMBTIFromChoices(inp.mbtiChoices)
             : (inp.mbti || 'INFP');
      var dw = calcDaewoon(saju, +inp.y, +inp.m, +inp.d,
        inp.h ? +inp.h : null, inp.min ? +inp.min : null, inp.gender || '여성');
      var ti = TY[mt] || { n:'탐험가', cf:'Ni-Te-Fi-Se' };
      var mbtiObj = {
        type: mt, cf: ti.cf,
        axes: inp.mbtiChoices ? [
          { side: inp.mbtiChoices[0]==='L'?'E':'I', pct: (inp.mbtiIntensities||[])[0]||60 },
          { side: inp.mbtiChoices[1]==='L'?'S':'N', pct: (inp.mbtiIntensities||[])[1]||60 },
          { side: inp.mbtiChoices[2]==='L'?'T':'F', pct: (inp.mbtiIntensities||[])[2]||60 },
          { side: inp.mbtiChoices[3]==='L'?'J':'P', pct: (inp.mbtiIntensities||[])[3]||60 }
        ] : [], profile: ''
      };
      window._lastAIResult = parsed;
      window._lastSaju = saju; window._lastDW = dw;
      window._lastGG = gg; window._lastMBTI = mt;
      window._lastMBTIObj = mbtiObj; window._lastIsAI = true;
      try {
        localStorage.setItem('mbts_lastResult', JSON.stringify({
          input: inp, saju: saju, dw: dw, gg: gg,
          mbti: mt, mbtiObj: mbtiObj, aiResult: parsed, isAI: true
        }));
      } catch(e) {}
      if (typeof showToast === 'function')
        showToast('백그라운드에서 분석이 완료됐어요! ✨');
      setTimeout(function() {
        if (typeof renderResult === 'function')
          renderResult(parsed, saju, mt, gg, true);
        if (typeof go === 'function') go('pgRes');
      }, 500);
    } catch(err) {
      console.error('[MBTS] 복구 재계산 실패:', err);
      if (typeof showToast === 'function')
        showToast('복구에 실패했어요. 다시 분석해주세요');
    }
  }

  function recoverGunghap(parsed, data, job) {
    if (typeof showToast === 'function')
      showToast('백그라운드에서 궁합 분석이 완료됐어요! 💕');
    if (typeof renderGunghapResultV2 === 'function') {
      var relType = (data.params && data.params.relType)
                 || (job.input && job.input.relType)
                 || '연인';
      setTimeout(function() {
        renderGunghapResultV2(parsed, relType);
        if (typeof go === 'function') go('pgGhRes');
      }, 500);
    }
  }

  function parseAI(text) {
    if (!text) return null;
    var c = text.replace(/```json|```/g, '').trim();
    try { return JSON.parse(c); } catch(e) {}
    var fb = c.indexOf('{'), lb = c.lastIndexOf('}');
    if (fb >= 0 && lb > fb) {
      try { return JSON.parse(c.substring(fb, lb + 1)); } catch(e) {}
    }
    if (fb >= 0) {
      var s = c.substring(fb, lb + 1).replace(/[\x00-\x1F\x7F]/g,
        function(ch) { return ch==='\n'||ch==='\r'||ch==='\t'?ch:''; });
      try { return JSON.parse(s); } catch(e) {}
    }
    if (fb >= 0) {
      var raw = c.substring(fb);
      var oB=(raw.match(/{/g)||[]).length, cB=(raw.match(/}/g)||[]).length;
      var oK=(raw.match(/\[/g)||[]).length, cK=(raw.match(/\]/g)||[]).length;
      while(cK<oK){raw+=']';cK++;}
      while(cB<oB){raw+='}';cB++;}
      raw=raw.replace(/,\s*([}\]])/g,'$1');
      try { return JSON.parse(raw); } catch(e) {}
    }
    return null;
  }

  setTimeout(recoverJob, 2000);
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') setTimeout(recoverJob, 1000);
  });
})();

// ── 프로필 편집 바텀시트 ──
function openProfileSheet() {
  var body = document.getElementById('profileSheetBody');
  if (!body) return;

  var myTarget = (typeof getFortuneTarget === 'function') ? getFortuneTarget() : null;
  var input = (myTarget && myTarget.input) ? myTarget.input : {};
  if (!input.y && window._lastSaju) {
    try {
      var saved = JSON.parse(localStorage.getItem('mbts_lastResult') || '{}');
      if (saved.input) input = saved.input;
    } catch(e) {}
  }

  var name = (mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '';
  var gender = input.gender || ST.gender || '';
  var isMale = (gender === '남' || gender === '남성');
  var isFemale = (gender === '여' || gender === '여성');

  var h = '';
  h += '<div class="field-row"><div class="field-label">이름</div>';
  h += '<input type="text" id="sheetName" value="' + (name || '') + '" maxlength="10" placeholder="이름 입력"></div>';

  h += '<div class="field-row"><div class="field-label">생년월일</div>';
  h += '<div style="display:flex;gap:6px">';
  h += '<input type="number" id="sheetYear" value="' + (input.y || '') + '" placeholder="년" style="flex:2" min="1920" max="2025">';
  h += '<input type="number" id="sheetMonth" value="' + (input.m || '') + '" placeholder="월" style="flex:1" min="1" max="12">';
  h += '<input type="number" id="sheetDay" value="' + (input.d || '') + '" placeholder="일" style="flex:1" min="1" max="31">';
  h += '</div></div>';

  h += '<div class="field-row"><div class="field-label">태어난 시간</div>';
  h += '<div style="display:flex;gap:6px">';
  h += '<input type="number" id="sheetHour" value="' + (input.h || '') + '" placeholder="시 (0~23)" style="flex:1" min="0" max="23">';
  h += '<input type="number" id="sheetMin" value="' + (input.min || '') + '" placeholder="분 (0~59)" style="flex:1" min="0" max="59">';
  h += '</div></div>';

  h += '<div class="field-row"><div class="field-label">성별</div>';
  h += '<div class="gender-row">';
  h += '<div class="gender-btn' + (isMale ? ' selected' : '') + '" onclick="selectSheetGender(this,\'남\')">남자</div>';
  h += '<div class="gender-btn' + (isFemale ? ' selected' : '') + '" onclick="selectSheetGender(this,\'여\')">여자</div>';
  h += '</div></div>';

  h += '<button class="save-btn" onclick="saveProfileSheet()">저장하고 반영하기</button>';
  body.innerHTML = h;

  document.getElementById('profileSheetOverlay').classList.add('open');
}

function closeProfileSheet() {
  document.getElementById('profileSheetOverlay').classList.remove('open');
}

var _sheetGender = '';
function selectSheetGender(el, g) {
  _sheetGender = g;
  el.parentElement.querySelectorAll('.gender-btn').forEach(function(b) { b.classList.remove('selected'); });
  el.classList.add('selected');
}

function saveProfileSheet() {
  var y = (document.getElementById('sheetYear') || {}).value || '';
  var m = (document.getElementById('sheetMonth') || {}).value || '';
  var d = (document.getElementById('sheetDay') || {}).value || '';
  var h = (document.getElementById('sheetHour') || {}).value || '';
  var min = (document.getElementById('sheetMin') || {}).value || '';
  var name = (document.getElementById('sheetName') || {}).value || '';
  var gender = _sheetGender || ST.gender || '';

  if (!y || !m || !d) { showToast('생년월일을 입력해주세요'); return; }
  if (!gender) { showToast('성별을 선택해주세요'); return; }

  ST.y = y; ST.m = m; ST.d = d; ST.h = h; ST.min = min;
  ST.gender = gender;
  if (name) ST.name = name;

  var fields = {bYear: y, bMonth: m, bDay: d, bHour: h, bMin: min};
  for (var key in fields) {
    var el = document.getElementById(key);
    if (el) el.value = fields[key];
    var visMap = {bMonth:'bMonthInput', bDay:'bDayInput', bHour:'bHourInput', bMin:'bMinInput'};
    if (visMap[key]) {
      var vis = document.getElementById(visMap[key]);
      if (vis) vis.value = fields[key];
    }
  }

  birthGender = gender;
  var bm = document.getElementById('bMale');
  var bf = document.getElementById('bFemale');
  if (bm && bf) {
    if (gender === '남' || gender === '남성') {
      bm.style.borderColor = 'var(--purple)'; bm.style.background = 'rgba(139,108,193,0.15)'; bm.style.color = 'var(--purple)';
      bf.style.borderColor = 'rgba(255,255,255,0.6)'; bf.style.background = 'rgba(255,255,255,0.45)'; bf.style.color = '#9B8CB8';
    } else {
      bf.style.borderColor = 'var(--purple)'; bf.style.background = 'rgba(139,108,193,0.15)'; bf.style.color = 'var(--purple)';
      bm.style.borderColor = 'rgba(255,255,255,0.6)'; bm.style.background = 'rgba(255,255,255,0.45)'; bm.style.color = '#9B8CB8';
    }
  }

  if (name && mbtsSession) {
    mbtsSession.nickname = name.trim();
    try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
  }

  closeProfileSheet();
  showToast('정보가 반영되었어요 ✨');

  var btn = document.getElementById('birthNextBtn');
  if (btn) btn.classList.add('ready');
}
