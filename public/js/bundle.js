// MBTS Bundle — 20260418_1550

// ═══ main-nav.js (2400L) ═══
// main-nav.js — navigation, state, profiles, dashboard, birth input, MBTI, gunghap selection
// Page navigation
var pageStack=['pgLanding'];

function getMyProfile() {
  try {
    var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
    for (var i = 0; i < hist.length; i++) {
      if (hist[i].isMyProfile) return hist[i];
    }
  } catch(e) {}
  return null;
}

function cleanupMyProfile() {
  try {
    var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
    var myRecs = [];
    for (var i = 0; i < hist.length; i++) {
      if (hist[i].isMyProfile) myRecs.push(i);
    }
    if (myRecs.length <= 1) return;

    var keepIdx = myRecs[0];
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.nickname) {
      for (var j = 0; j < myRecs.length; j++) {
        if (hist[myRecs[j]].name === mbtsSession.nickname) { keepIdx = myRecs[j]; break; }
      }
    }

    var changed = false;
    for (var k = 0; k < myRecs.length; k++) {
      if (myRecs[k] !== keepIdx) { hist[myRecs[k]].isMyProfile = false; changed = true; }
    }

    if (changed) {
      localStorage.setItem('mbts_history', JSON.stringify(hist));
      localStorage.setItem('mbts_fortuneTarget', hist[keepIdx].id);
      console.log('[MBTS] isMyProfile 중복 정리 완료, 유지:', hist[keepIdx].name);
    }
  } catch(e) {}
}

function renderProfileView() {
  var el = document.getElementById('profileEditContent');
  if (!el) return;
  var titleEl = el.parentElement.querySelector('.save-title');
  if (titleEl) titleEl.textContent = '내 프로필';
  var name = (mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '사용자';
  var mbti = window._lastMBTI || '';
  var saju = window._lastSaju;
  var aiResult = window._lastAIResult;
  var animalEmoji = '🌟', animalTitle = '', animalSub = '', animalIcon = '';
  if (aiResult && aiResult.animal) {
    var aInfo = getAnimalResult(aiResult.animal.oheng, aiResult.animal.dominant_sipsung, aiResult.animal.condition);
    if (aInfo && aInfo.mod) { animalEmoji = aInfo.emoji; animalTitle = aInfo.mod.title; animalSub = aiResult.animal.oheng + ' · ' + aiResult.animal.dominant_sipsung + ' · ' + aiResult.animal.condition; animalIcon = typeof resolveAnimalIcon === 'function' ? resolveAnimalIcon({ saju: saju, gg: window._lastGG }) : ''; }
  }
  var ilju = (saju && saju.P && saju.P[2]) ? saju.P[2].s + saju.P[2].b : '';
  var birthInput = {};
  try { var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]'); var rec = null; for (var i = hist.length - 1; i >= 0; i--) { if (hist[i].isMyProfile) { rec = hist[i]; break; } } if (!rec) for (var j = hist.length - 1; j >= 0; j--) { if (hist[j].input && hist[j].input.y) { rec = hist[j]; break; } } if (rec && rec.input) birthInput = rec.input; } catch(e) {}
  if (!birthInput.y) { try { var saved = JSON.parse(localStorage.getItem('mbts_lastResult') || '{}'); if (saved.input) birthInput = saved.input; } catch(e) {} }
  var gender = birthInput.gender || ST.gender || '';
  var isLunar = birthInput.isLunar || false;
  var birthStr = '';
  if (birthInput.y) { birthStr = birthInput.y + '년 ' + birthInput.m + '월 ' + birthInput.d + '일'; }
  var timeStr = '모름';
  if (birthInput.h && birthInput.h !== '' && birthInput.h !== '모름') { timeStr = birthInput.h + '시'; if (birthInput.min && birthInput.min !== '') timeStr += ' ' + birthInput.min + '분'; }
  var mbtiLetters = mbti ? mbti.split('') : [];
  var mbtiDC = ['#5B8FD4','#2e8b57','#88619A','#c99a2e'];
  var h = '';
  h += '<div style="background:#fff;border-radius:24px;padding:32px 24px 24px;box-shadow:0 4px 24px rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.06)">';
  h += '<div style="text-align:center;margin-bottom:24px">';
  h += '<div style="width:96px;height:96px;border-radius:50%;margin:0 auto 16px;background:linear-gradient(145deg,#F3EDFF,#FFE8F0);display:flex;align-items:center;justify-content:center;font-size:50px;box-shadow:0 6px 24px rgba(139,108,193,0.12);overflow:hidden">';
  if (animalIcon) { h += '<img src="' + animalIcon + '" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'' + animalEmoji + '\'))">'; }
  else { h += animalEmoji; }
  h += '</div>';
  h += '<div style="font-size:17px;font-weight:800;color:#2E1F4E;margin-bottom:4px">' + name + '</div>';
  if (animalTitle) { h += '<div style="font-size:14px;font-weight:600;color:#6B4FA0;margin-bottom:4px">' + animalTitle + '</div>'; h += '<div style="font-size:12px;color:#A99BBF">' + animalSub + (ilju ? ' · ' + ilju + ' 일주' : '') + '</div>'; }
  else { h += '<div style="font-size:13px;color:#A99BBF">분석하면 나의 동물이 나타나요</div>'; }
  h += '</div>';
  h += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 20px"></div>';
  h += '<div style="display:flex;flex-direction:column;gap:14px">';
  if (birthStr) { h += '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:600;color:#A99BBF">생년월일</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + birthStr + ' <span style="font-size:11px;color:#C4B8D8;margin-left:4px">' + (isLunar ? '음력' : '양력') + '</span></span></div>'; }
  h += '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:600;color:#A99BBF">태어난 시간</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + timeStr + '</span></div>';
  h += '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:600;color:#A99BBF">출생지</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + (birthInput.city || '모름') + '</span></div>';
  h += '<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:600;color:#A99BBF">성별</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + (gender === '남' || gender === '남성' ? '남성' : gender === '여' || gender === '여성' ? '여성' : '미설정') + '</span></div>';
  if (mbtiLetters.length === 4) {
    h += '<div><div style="font-size:12px;font-weight:600;color:#A99BBF;margin-bottom:8px">MBTI</div><div style="display:flex;gap:6px">';
    for (var mi = 0; mi < 4; mi++) { h += '<div style="flex:1;text-align:center;padding:10px 0 8px;background:' + mbtiDC[mi] + '10;border-radius:12px;border:1.5px solid ' + mbtiDC[mi] + '30"><div style="font-size:22px;font-weight:900;color:' + mbtiDC[mi] + '">' + mbtiLetters[mi] + '</div></div>'; }
    h += '</div></div>';
  }
  h += '</div>';
  h += '<button onclick="renderProfileEdit()" style="width:100%;padding:15px;font-size:15px;font-weight:700;color:#6B4FA0;background:rgba(139,108,193,0.08);border:1.5px solid rgba(139,108,193,0.15);border-radius:14px;cursor:pointer;font-family:inherit;margin-top:20px;transition:all .2s">✏️ 프로필 수정하기</button>';
  h += '</div>';
  h += '<div style="text-align:center;margin-top:16px;font-size:12px;color:#C4B8D8;line-height:1.6">프로필을 수정하면 사주가 즉시 재계산돼요<br>기존 프리미엄 분석 결과는 유지됩니다</div>';
  el.innerHTML = h;
}

async function renderProfileEdit() {
  var el = document.getElementById('profileEditContent');
  if (!el) return;
  // 페이지 타이틀 변경
  var titleEl2 = el.parentElement.querySelector('.save-title');
  if (titleEl2) titleEl2.textContent = '프로필 수정';

  var name = (mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '사용자';
  var mbti = window._lastMBTI || '';
  var saju = window._lastSaju;
  var aiResult = window._lastAIResult;
  var animalEmoji = '🌟', animalTitle = '', animalSub = '', animalIcon = '';
  if (aiResult && aiResult.animal) {
    var aInfo = getAnimalResult(aiResult.animal.oheng, aiResult.animal.dominant_sipsung, aiResult.animal.condition);
    if (aInfo && aInfo.mod) { animalEmoji = aInfo.emoji; animalTitle = aInfo.mod.title; animalSub = aiResult.animal.oheng + ' · ' + aiResult.animal.dominant_sipsung + ' · ' + aiResult.animal.condition; animalIcon = typeof resolveAnimalIcon === 'function' ? resolveAnimalIcon({ saju: saju, gg: window._lastGG }) : ''; }
  }
  var ilju = (saju && saju.P && saju.P[2]) ? saju.P[2].s + saju.P[2].b : '';
  var birthInput = {};
  try { var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]'); var rec = null; for (var i = hist.length - 1; i >= 0; i--) { if (hist[i].isMyProfile) { rec = hist[i]; break; } } if (!rec) for (var j = hist.length - 1; j >= 0; j--) { if (hist[j].input && hist[j].input.y) { rec = hist[j]; break; } } if (rec && rec.input) birthInput = rec.input; } catch(e) {}
  if (!birthInput.y) { try { var saved = JSON.parse(localStorage.getItem('mbts_lastResult') || '{}'); if (saved.input) birthInput = saved.input; } catch(e) {} }
  if (mbti && mbti.length === 4) { for (var mi = 0; mi < 4; mi++) { _profMbtiCh[mi] = (mbti[mi] === DM_AX[mi].L) ? 'L' : 'R'; } } else { _profMbtiCh = [null,null,null,null]; }
  if (ST.it && ST.it.length === 4) { _profMbtiIt = ST.it.slice(); } else { _profMbtiIt = mbti ? [68,68,68,68] : [null,null,null,null]; }
  _profMbtiCur = 0; _profCalType = (birthInput.isLunar || window._isLunarInput) ? 'lunar' : 'solar';
  _profTimeUnknown = !(birthInput.h && birthInput.h !== '' && birthInput.h !== '모름');
  _profCityUnknown = !(birthInput.city && birthInput.city !== '' && birthInput.city !== '모름');
  _profileGender = birthInput.gender || ST.gender || '';
  var h = '';
  h += '<div style="background:#fff;border-radius:24px;padding:28px 22px;box-shadow:0 4px 24px rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.06)">';
  h += '<div style="text-align:center;margin-bottom:24px"><div style="width:88px;height:88px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(145deg,#F3EDFF,#FFE8F0);display:flex;align-items:center;justify-content:center;font-size:46px;box-shadow:0 6px 20px rgba(139,108,193,0.12);overflow:hidden">';
  if (animalIcon) { h += '<img src="' + animalIcon + '" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'' + animalEmoji + '\'))">'; } else { h += animalEmoji; }
  h += '</div>';
  if (animalTitle) { h += '<div style="font-size:15px;font-weight:700;color:#6B4FA0">' + animalTitle + '</div><div style="font-size:12px;color:#A99BBF;margin-top:3px">' + animalSub + (ilju ? ' · ' + ilju + ' 일주' : '') + '</div>'; }
  else { h += '<div style="font-size:13px;color:#A99BBF">생년월일과 MBTI를 입력하면 동물이 나타나요</div>'; }
  h += '</div>';
  h += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 20px"></div>';
  h += '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center"><label style="font-size:12px;font-weight:700;color:#7B6B99;margin-bottom:6px;display:block">이름</label><span style="font-size:11px;color:#8B6CC1;font-weight:600">✓ 본인</span></div>';
  h += '<input type="text" id="profileNameInput" value="' + name + '" maxlength="10" style="width:100%;padding:12px 14px;font-size:15px;font-family:inherit;border:1.5px solid #E8E4EF;border-radius:12px;background:#fff;outline:none;box-sizing:border-box;color:#2E1F4E"></div>';
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">생년월일</label><div style="display:flex;gap:4px">';
  h += '<button type="button" id="profCalSolar" onclick="setProfileCalType(\'solar\')" style="padding:4px 12px;border-radius:8px;border:none;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .25s;' + (_profCalType === 'solar' ? 'background:#fff;color:#7B5DAF;box-shadow:0 2px 8px rgba(139,108,193,0.1)' : 'background:transparent;color:#B0A0C8;box-shadow:none') + '">양력</button>';
  h += '<button type="button" id="profCalLunar" onclick="setProfileCalType(\'lunar\')" style="padding:4px 12px;border-radius:8px;border:none;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .25s;' + (_profCalType === 'lunar' ? 'background:#fff;color:#7B5DAF;box-shadow:0 2px 8px rgba(139,108,193,0.1)' : 'background:transparent;color:#B0A0C8;box-shadow:none') + '">음력</button></div></div>';
  h += '<div style="display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:6px">';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileYear" type="text" value="' + (birthInput.y || '') + '" placeholder="예: 1995" maxlength="4" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'year\')">▼</span></div><div class="ap-b-dropdown" id="profileDropYear"></div></div>';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileMonth" type="text" value="' + (birthInput.m || '') + '" placeholder="월" maxlength="2" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'month\')">▼</span></div><div class="ap-b-dropdown" id="profileDropMonth"></div></div>';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileDay" type="text" value="' + (birthInput.d || '') + '" placeholder="일" maxlength="2" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'day\')">▼</span></div><div class="ap-b-dropdown" id="profileDropDay"></div></div>';
  h += '</div></div>';
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">태어난 시간</label><span style="font-size:11px;color:#B0A0C8;font-weight:400">선택</span></div><div id="profTimeArea">';
  if (_profTimeUnknown) { h += '<div onclick="restoreProfileTime()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>⏰</span> 시간 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
  else { h += '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileHour" type="number" value="' + (birthInput.h || '') + '" placeholder="시" min="0" max="23" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'hour\')">▼</span></div><div class="ap-b-dropdown" id="profileDropHour"></div></div><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileMin" type="number" value="' + (birthInput.min || '') + '" placeholder="분" min="0" max="59" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'min\')">▼</span></div><div class="ap-b-dropdown" id="profileDropMin"></div></div><button onclick="setProfileTimeUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; }
  h += '</div></div>';
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">출생지</label><span style="font-size:11px;color:#B0A0C8;font-weight:400">시차 보정</span></div><div id="profCityArea">';
  if (_profCityUnknown) { h += '<div onclick="restoreProfileCity()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>📍</span> 출생지 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
  else { h += '<div style="display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileCity" type="text" value="' + (birthInput.city || ST.city || '') + '" placeholder="도시 선택" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'city\')">▼</span></div><div class="ap-b-dropdown" id="profileDropCity"></div></div><button onclick="setProfileCityUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; }
  h += '</div></div>';
  h += '<div style="margin-bottom:18px"><label style="font-size:12px;font-weight:700;color:#7B6B99;display:block;margin-bottom:6px">성별</label><div class="ap-b-gender-row"><button class="ap-b-gender' + (_profileGender === '남' || _profileGender === '남성' ? ' selected' : '') + '" onclick="pickProfileGender(this,\'남\')">남성</button><button class="ap-b-gender' + (_profileGender === '여' || _profileGender === '여성' ? ' selected' : '') + '" onclick="pickProfileGender(this,\'여\')">여성</button></div></div>';
  h += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 18px"></div>';
  var mbtiAllDone = _profMbtiCh.every(function(c){return c!==null;}) && _profMbtiIt.every(function(v){return v!==null;});
  var mbtiStr = _profMbtiCh.map(function(c,idx){return c===null?'?':(c==='L'?DM_AX[idx].L:DM_AX[idx].R);}).join('');
  h += '<div style="margin-bottom:18px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><label style="font-size:14px;font-weight:700;color:#7B6B99">MBTI</label>';
  if (mbtiAllDone) h += '<span style="font-size:13px;font-weight:700;color:#2e8b57">' + mbtiStr + ' ✓</span>';
  h += '</div><div id="profMbtiArea"></div></div>';
  h += '<button onclick="saveProfileFull()" id="profileSaveBtn" style="width:100%;padding:16px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:16px;cursor:pointer;margin-top:4px;box-shadow:0 4px 16px rgba(107,79,160,0.2)"><span>저장하기</span></button>';
  h += '<div style="text-align:center;margin-top:14px;font-size:12px;color:#A99BBF;line-height:1.6">저장하면 사주가 즉시 재계산돼요<br><span style="color:#C4B8D8">프리미엄 AI 풀이는 별도로 분석할 수 있어요</span></div>';
  h += '</div>';
  el.innerHTML = h;
  renderProfileMBTI();
}

var _profileGender = '';
function pickProfileGender(el, g) {
  _profileGender = g;
  var btns = el.parentElement.querySelectorAll('.ap-b-gender');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
  el.classList.add('selected');
}

function renderProfileMBTI() {
  var area = document.getElementById('profMbtiArea');
  if (!area) return;
  var cur = _profMbtiCur, d = DM_AX[cur], c = _profMbtiCh[cur], iv = _profMbtiIt[cur], ac = DC[cur];
  var h = '';
  h += '<div style="display:flex;gap:4px;margin-bottom:14px">';
  for (var i = 0; i < 4; i++) { h += '<div style="flex:1;height:4px;border-radius:2px;background:' + (i <= cur ? DC[i] : DC[i] + '30') + ';transition:background .3s"></div>'; }
  h += '</div>';
  h += '<div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px">';
  for (var i2 = 0; i2 < 4; i2++) {
    var lt = _profMbtiCh[i2] === null ? '?' : (_profMbtiCh[i2] === 'L' ? DM_AX[i2].L : DM_AX[i2].R);
    h += '<div onclick="_profMbtiCur=' + i2 + ';renderProfileMBTI()" style="width:42px;height:48px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;border-radius:10px;cursor:pointer;transition:all .2s;background:' + (i2 === cur ? DC[i2] + '20' : (_profMbtiCh[i2] ? DC[i2] + '10' : 'rgba(0,0,0,0.03)')) + ';border:2.5px solid ' + (i2 === cur ? DC[i2] : 'transparent') + ';color:' + (_profMbtiCh[i2] ? DC[i2] : '#AEAEB2') + '">' + lt + '</div>';
  }
  h += '</div>';
  h += '<div style="font-size:12px;color:#A99BBF;text-align:center;letter-spacing:2px;margin-bottom:6px">STEP ' + (cur + 1) + '/4</div>';
  h += '<div style="font-size:18px;font-weight:800;text-align:center;margin-bottom:16px;color:#2E1F4E">어느 쪽에 가깝나요?</div>';
  h += '<div style="display:flex;gap:10px;margin-bottom:14px">';
  ['L','R'].forEach(function(side) {
    var lb = side === 'L' ? d.Ll : d.Rl; var ltx = side === 'L' ? d.L : d.R; var ds = side === 'L' ? d.Ld : d.Rd; var sel = c === side;
    h += '<button onclick="pickProfMbtiSide(\'' + side + '\')" style="flex:1;padding:18px 10px;text-align:center;cursor:pointer;font-family:inherit;border-radius:16px;transition:all .25s;background:' + (sel ? 'linear-gradient(145deg,' + ac + '18,' + ac + '08)' : 'rgba(0,0,0,0.02)') + ';border:' + (sel ? '2.5px solid ' + ac : '2.5px solid #E8E4EF') + ';' + (sel ? 'box-shadow:0 4px 20px ' + ac + '25' : '') + '">';
    h += '<div style="font-size:32px;font-weight:900;color:' + (sel ? ac : '#AEAEB2') + ';margin-bottom:4px">' + ltx + '</div>';
    h += '<div style="font-size:12px;font-weight:700;color:' + (sel ? ac : '#636366') + ';margin-bottom:3px">' + lb + '</div>';
    h += '<div style="font-size:11px;color:#AEAEB2;line-height:1.5">' + ds + '</div></button>';
  });
  h += '</div>';
  if (c !== null) {
    var selLetter = c === 'L' ? d.L : d.R;
    h += '<div style="animation:up .3s ease"><div style="font-size:13px;color:#636366;text-align:center;margin-bottom:10px"><strong style="color:' + ac + '">' + selLetter + '</strong> 성향의 강도는?</div><div style="display:flex;gap:7px">';
    IN_OP.forEach(function(n) {
      var sel2 = iv === n.v;
      h += '<button onclick="pickProfIntensity(' + n.v + ')" style="flex:1;padding:11px 6px;text-align:center;cursor:pointer;font-family:inherit;border-radius:11px;transition:all .25s;background:' + (sel2 ? 'linear-gradient(145deg,' + ac + '20,' + ac + '08)' : 'rgba(0,0,0,0.02)') + ';border:' + (sel2 ? '2px solid ' + ac : '2px solid #E8E4EF') + ';' + (sel2 ? 'box-shadow:0 3px 14px ' + ac + '20' : '') + '"><div style="font-size:13px;font-weight:700;color:' + (sel2 ? ac : '#AEAEB2') + ';margin-bottom:2px">' + n.r + '</div><div style="font-size:10.5px;color:#AEAEB2">' + n.d + '</div></button>';
    });
    h += '</div></div>';
  }
  var ok = c !== null && iv !== null;
  h += '<div style="display:flex;gap:8px;margin-top:14px">';
  if (cur > 0) h += '<button onclick="profMbtiBack()" style="padding:12px 20px;font-size:14px;font-weight:600;color:#8B6CC1;background:rgba(139,108,193,0.06);border:1.5px solid rgba(139,108,193,0.15);border-radius:12px;cursor:pointer;font-family:inherit">←</button>';
  if (cur < 3) { h += '<button onclick="profMbtiNext()" ' + (ok ? '' : 'disabled') + ' style="flex:1;padding:12px;font-size:15px;font-weight:700;border-radius:12px;border:none;font-family:inherit;cursor:' + (ok ? 'pointer' : 'not-allowed') + ';background:' + (ok ? 'linear-gradient(135deg,' + ac + ',' + ac + 'cc)' : 'rgba(0,0,0,0.06)') + ';color:' + (ok ? '#fff' : '#AEAEB2') + ';' + (ok ? 'box-shadow:0 4px 16px ' + ac + '30' : '') + '">다음 →</button>'; }
  if (cur === 3 && ok) h += '<div style="flex:1;padding:12px 0;font-size:13px;font-weight:600;color:#2e8b57;text-align:center">✓ MBTI 설정 완료</div>';
  h += '</div>';
  area.innerHTML = h;
}
function pickProfMbtiSide(side) { _profMbtiCh[_profMbtiCur] = side; _profMbtiIt[_profMbtiCur] = null; renderProfileMBTI(); }
function pickProfIntensity(v) { _profMbtiIt[_profMbtiCur] = v; renderProfileMBTI(); }
function profMbtiNext() { if (_profMbtiCh[_profMbtiCur] === null || _profMbtiIt[_profMbtiCur] === null) return; if (_profMbtiCur < 3) { _profMbtiCur++; renderProfileMBTI(); } }
function profMbtiBack() { if (_profMbtiCur > 0) { _profMbtiCur--; renderProfileMBTI(); } }
function setProfileCalType(type) { _profCalType = type; var s = document.getElementById('profCalSolar'), l = document.getElementById('profCalLunar'); if (s) { s.style.background = type === 'solar' ? '#fff' : 'transparent'; s.style.color = type === 'solar' ? '#7B5DAF' : '#B0A0C8'; s.style.boxShadow = type === 'solar' ? '0 2px 8px rgba(139,108,193,0.1)' : 'none'; } if (l) { l.style.background = type === 'lunar' ? '#fff' : 'transparent'; l.style.color = type === 'lunar' ? '#7B5DAF' : '#B0A0C8'; l.style.boxShadow = type === 'lunar' ? '0 2px 8px rgba(139,108,193,0.1)' : 'none'; } }
function setProfileTimeUnknown() { _profTimeUnknown = true; var a = document.getElementById('profTimeArea'); if (a) a.innerHTML = '<div onclick="restoreProfileTime()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>⏰</span> 시간 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
function restoreProfileTime() { _profTimeUnknown = false; var a = document.getElementById('profTimeArea'); if (a) { var th = '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileHour" type="number" value="" placeholder="시" min="0" max="23" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'hour\')">▼</span></div><div class="ap-b-dropdown" id="profileDropHour"></div></div><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileMin" type="number" value="" placeholder="분" min="0" max="59" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'min\')">▼</span></div><div class="ap-b-dropdown" id="profileDropMin"></div></div><button onclick="setProfileTimeUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; a.innerHTML = th; } }
function setProfileCityUnknown() { _profCityUnknown = true; var a = document.getElementById('profCityArea'); if (a) a.innerHTML = '<div onclick="restoreProfileCity()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>📍</span> 출생지 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
function restoreProfileCity() { _profCityUnknown = false; var a = document.getElementById('profCityArea'); if (a) { var ch = '<div style="display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="profileCity" type="text" value="" placeholder="도시 선택" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleProfileDrop(\'city\')">▼</span></div><div class="ap-b-dropdown" id="profileDropCity"></div></div><button onclick="setProfileCityUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; a.innerHTML = ch; } }

function toggleProfileDrop(type) {
  var dropIds = {year:'profileDropYear',month:'profileDropMonth',day:'profileDropDay',hour:'profileDropHour',min:'profileDropMin',city:'profileDropCity'};
  var inputIds = {year:'profileYear',month:'profileMonth',day:'profileDay',hour:'profileHour',min:'profileMin',city:'profileCity'};
  var drop = document.getElementById(dropIds[type]);
  if (!drop) return;
  var isOpen = drop.classList.contains('show');
  for (var k in dropIds) { var d = document.getElementById(dropIds[k]); if (d) d.classList.remove('show'); }
  if (isOpen) return;
  var opts = [];
  if (type === 'year') { for (var y = 2010; y >= 1940; y--) opts.push(y); }
  else if (type === 'month') { for (var m = 1; m <= 12; m++) opts.push(m); }
  else if (type === 'day') { for (var d2 = 1; d2 <= 31; d2++) opts.push(d2); }
  else if (type === 'hour') { opts.push('모름'); for (var h = 0; h <= 23; h++) opts.push(h); }
  else if (type === 'min') { opts.push('모름'); for (var m2 = 0; m2 <= 59; m2 += 5) opts.push(m2); }
  else if (type === 'city') { opts = ['모름','서울','부산','대구','인천','광주','대전','울산','세종','수원','창원','청주','전주','포항','제주','천안']; }
  var inp = document.getElementById(inputIds[type]);
  var curVal = inp ? inp.value.trim() : '';
  var html = '';
  for (var i = 0; i < opts.length; i++) {
    var itemVal = String(opts[i]);
    var selected = (curVal && itemVal === curVal) ? ' selected' : '';
    html += '<div class="ap-b-drop-item' + selected + '" onclick="selectProfileDrop(\'' + type + '\',\'' + opts[i] + '\')">' + opts[i] + '</div>';
  }
  drop.innerHTML = html;
  drop.classList.add('show');
}

function selectProfileDrop(type, val) {
  var inputIds = {year:'profileYear',month:'profileMonth',day:'profileDay',hour:'profileHour',min:'profileMin',city:'profileCity'};
  var dropIds = {year:'profileDropYear',month:'profileDropMonth',day:'profileDropDay',hour:'profileDropHour',min:'profileDropMin',city:'profileDropCity'};
  var inp = document.getElementById(inputIds[type]);
  if (inp) inp.value = (val === '모름') ? '' : val;
  for (var k in dropIds) { var d = document.getElementById(dropIds[k]); if (d) d.classList.remove('show'); }
}

// ====================================================================
// pgEditProfile — 별도 수정 페이지 (rec 파라미터 기반)
// ====================================================================
var _editMbtiCur = 0;
var _editMbtiCh = [null,null,null,null];
var _editMbtiIt = [null,null,null,null];
var _editCalType = 'solar';
var _editTimeUnknown = false;
var _editCityUnknown = false;
var _editGender = '';

function renderEditProfile(rec) {
  var el = document.getElementById('editProfileContent');
  if (!el) return;
  window._editTargetRec = rec;
  var isMyRec = !!(rec && rec.isMyProfile);
  var titleEl = document.getElementById('editProfileTitle');
  if(titleEl) titleEl.textContent = isMyRec ? '프로필 수정' : ((rec && rec.name ? rec.name : '사용자') + ' 정보 수정');

  var name = (rec && rec.name) || '사용자';
  var mbti = (rec && rec.mbti) || '';
  var saju = (rec && rec.saju) || null;
  var aiResult = (rec && rec.aiResult) || null;

  var animalEmoji = '🌟', animalTitle = '', animalSub = '', animalIcon = '';
  if (aiResult && aiResult.animal) {
    var aInfo = getAnimalResult(aiResult.animal.oheng, aiResult.animal.dominant_sipsung, aiResult.animal.condition);
    if (aInfo && aInfo.mod) { animalEmoji = aInfo.emoji; animalTitle = aInfo.mod.title; animalSub = aiResult.animal.oheng + ' · ' + aiResult.animal.dominant_sipsung + ' · ' + aiResult.animal.condition; animalIcon = typeof resolveAnimalIcon === 'function' ? resolveAnimalIcon({ saju: saju, gg: rec ? rec.gg : null }) : ''; }
  } else if (rec && rec.animal) {
    var aInfo2 = getAnimalResult(rec.animal.oheng, rec.animal.dominant_sipsung, rec.animal.condition);
    if (aInfo2 && aInfo2.mod) { animalEmoji = aInfo2.emoji; animalTitle = aInfo2.mod.title; animalSub = rec.animal.oheng + ' · ' + rec.animal.dominant_sipsung + ' · ' + rec.animal.condition; animalIcon = typeof resolveAnimalIcon === 'function' ? resolveAnimalIcon({ saju: saju, gg: rec.gg }) : ''; }
  }
  var ilju = (saju && saju.P && saju.P[2]) ? saju.P[2].s + saju.P[2].b : '';

  var birthInput = (rec && rec.input) || {};
  if (mbti && mbti.length === 4) { for (var mi = 0; mi < 4; mi++) { _editMbtiCh[mi] = (mbti[mi] === DM_AX[mi].L) ? 'L' : 'R'; } } else { _editMbtiCh = [null,null,null,null]; }
  if (birthInput.it && birthInput.it.length === 4) { _editMbtiIt = birthInput.it.slice(); } else { _editMbtiIt = mbti ? [68,68,68,68] : [null,null,null,null]; }
  _editMbtiCur = 0;
  _editCalType = birthInput.isLunar ? 'lunar' : 'solar';
  _editTimeUnknown = !(birthInput.h && birthInput.h !== '' && birthInput.h !== '모름');
  _editCityUnknown = !(birthInput.city && birthInput.city !== '' && birthInput.city !== '모름');
  _editGender = birthInput.gender || '';

  var h = '';
  h += '<div style="background:#fff;border-radius:24px;padding:28px 22px;box-shadow:0 4px 24px rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.06)">';

  // Animal icon
  h += '<div style="text-align:center;margin-bottom:24px"><div style="width:88px;height:88px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(145deg,#F3EDFF,#FFE8F0);display:flex;align-items:center;justify-content:center;font-size:46px;box-shadow:0 6px 20px rgba(139,108,193,0.12);overflow:hidden">';
  if (animalIcon) { h += '<img src="' + animalIcon + '" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'' + animalEmoji + '\'))">'; } else { h += animalEmoji; }
  h += '</div>';
  if (animalTitle) { h += '<div style="font-size:15px;font-weight:700;color:#6B4FA0">' + animalTitle + '</div><div style="font-size:12px;color:#A99BBF;margin-top:3px">' + animalSub + (ilju ? ' · ' + ilju + ' 일주' : '') + '</div>'; }
  else { h += '<div style="font-size:13px;color:#A99BBF">생년월일과 MBTI를 입력하면 동물이 나타나요</div>'; }
  h += '</div>';

  h += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 20px"></div>';

  // Name
  h += '<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center"><label style="font-size:12px;font-weight:700;color:#7B6B99;margin-bottom:6px;display:block">이름</label>' + (isMyRec ? '<span style="font-size:11px;color:#8B6CC1;font-weight:600">✓ 본인</span>' : '') + '</div>';
  h += '<input type="text" id="editNameInput" value="' + name + '" maxlength="10" style="width:100%;padding:12px 14px;font-size:15px;font-family:inherit;border:1.5px solid #E8E4EF;border-radius:12px;background:#fff;outline:none;box-sizing:border-box;color:#2E1F4E"></div>';

  // Birthday with calendar type
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">생년월일</label><div style="display:flex;gap:4px">';
  h += '<button type="button" id="editCalSolar" onclick="setEditCalType(\'solar\')" style="padding:4px 12px;border-radius:8px;border:none;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .25s;' + (_editCalType === 'solar' ? 'background:#fff;color:#7B5DAF;box-shadow:0 2px 8px rgba(139,108,193,0.1)' : 'background:transparent;color:#B0A0C8;box-shadow:none') + '">양력</button>';
  h += '<button type="button" id="editCalLunar" onclick="setEditCalType(\'lunar\')" style="padding:4px 12px;border-radius:8px;border:none;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .25s;' + (_editCalType === 'lunar' ? 'background:#fff;color:#7B5DAF;box-shadow:0 2px 8px rgba(139,108,193,0.1)' : 'background:transparent;color:#B0A0C8;box-shadow:none') + '">음력</button></div></div>';
  h += '<div style="display:grid;grid-template-columns:1.6fr 1fr 1fr;gap:6px">';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editYear" type="text" value="' + (birthInput.y || '') + '" placeholder="예: 1995" maxlength="4" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'year\')">▼</span></div><div class="ap-b-dropdown" id="editDropYear"></div></div>';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editMonth" type="text" value="' + (birthInput.m || '') + '" placeholder="월" maxlength="2" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'month\')">▼</span></div><div class="ap-b-dropdown" id="editDropMonth"></div></div>';
  h += '<div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editDay" type="text" value="' + (birthInput.d || '') + '" placeholder="일" maxlength="2" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'day\')">▼</span></div><div class="ap-b-dropdown" id="editDropDay"></div></div>';
  h += '</div></div>';

  // Time
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">태어난 시간</label><span style="font-size:11px;color:#B0A0C8;font-weight:400">선택</span></div><div id="editTimeArea">';
  if (_editTimeUnknown) { h += '<div onclick="restoreEditTime()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>⏰</span> 시간 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
  else { h += '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editHour" type="number" value="' + (birthInput.h || '') + '" placeholder="시" min="0" max="23" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'hour\')">▼</span></div><div class="ap-b-dropdown" id="editDropHour"></div></div><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editMin" type="number" value="' + (birthInput.min || '') + '" placeholder="분" min="0" max="59" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'min\')">▼</span></div><div class="ap-b-dropdown" id="editDropMin"></div></div><button onclick="setEditTimeUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; }
  h += '</div></div>';

  // City
  h += '<div style="margin-bottom:14px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><label style="font-size:12px;font-weight:700;color:#7B6B99">출생지</label><span style="font-size:11px;color:#B0A0C8;font-weight:400">시차 보정</span></div><div id="editCityArea">';
  if (_editCityUnknown) { h += '<div onclick="restoreEditCity()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>📍</span> 출생지 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
  else { h += '<div style="display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editCity" type="text" value="' + (birthInput.city || '') + '" placeholder="도시 선택" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'city\')">▼</span></div><div class="ap-b-dropdown" id="editDropCity"></div></div><button onclick="setEditCityUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; }
  h += '</div></div>';

  // Gender
  h += '<div style="margin-bottom:18px"><label style="font-size:12px;font-weight:700;color:#7B6B99;display:block;margin-bottom:6px">성별</label><div class="ap-b-gender-row"><button class="ap-b-gender' + (_editGender === '남' ? ' selected' : '') + '" onclick="pickEditGender(this,\'남\')">남성</button><button class="ap-b-gender' + (_editGender === '여' ? ' selected' : '') + '" onclick="pickEditGender(this,\'여\')">여성</button></div></div>';

  h += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 18px"></div>';

  // MBTI
  var mbtiAllDone = _editMbtiCh.every(function(c){return c!==null;}) && _editMbtiIt.every(function(v){return v!==null;});
  var mbtiStr2 = _editMbtiCh.map(function(c,idx){return c===null?'?':(c==='L'?DM_AX[idx].L:DM_AX[idx].R);}).join('');
  h += '<div style="margin-bottom:18px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px"><label style="font-size:14px;font-weight:700;color:#7B6B99">MBTI</label>';
  if (mbtiAllDone) h += '<span style="font-size:13px;font-weight:700;color:#2e8b57">' + mbtiStr2 + ' ✓</span>';
  h += '</div><div id="editMbtiArea"></div></div>';

  // Save button
  h += '<button onclick="saveEditProfile()" id="editSaveBtn" style="width:100%;padding:16px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:16px;cursor:pointer;margin-top:4px;box-shadow:0 4px 16px rgba(107,79,160,0.2)"><span>저장하기</span></button>';
  h += '<div style="text-align:center;margin-top:14px;font-size:12px;color:#A99BBF;line-height:1.6">저장하면 사주가 즉시 재계산돼요</div>';

  h += '</div>';
  el.innerHTML = h;
  renderEditMBTI();
}

function renderEditMBTI() {
  var area = document.getElementById('editMbtiArea');
  if (!area) return;
  var cur = _editMbtiCur, d = DM_AX[cur], c = _editMbtiCh[cur], iv = _editMbtiIt[cur], ac = DC[cur];
  var h = '';
  h += '<div style="display:flex;gap:4px;margin-bottom:14px">';
  for (var i = 0; i < 4; i++) { h += '<div style="flex:1;height:4px;border-radius:2px;background:' + (i <= cur ? DC[i] : DC[i] + '30') + ';transition:background .3s"></div>'; }
  h += '</div>';
  h += '<div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px">';
  for (var i2 = 0; i2 < 4; i2++) {
    var lt = _editMbtiCh[i2] === null ? '?' : (_editMbtiCh[i2] === 'L' ? DM_AX[i2].L : DM_AX[i2].R);
    h += '<div onclick="_editMbtiCur=' + i2 + ';renderEditMBTI()" style="width:42px;height:48px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;border-radius:10px;cursor:pointer;transition:all .2s;background:' + (i2 === cur ? DC[i2] + '20' : (_editMbtiCh[i2] ? DC[i2] + '10' : 'rgba(0,0,0,0.03)')) + ';border:2.5px solid ' + (i2 === cur ? DC[i2] : 'transparent') + ';color:' + (_editMbtiCh[i2] ? DC[i2] : '#AEAEB2') + '">' + lt + '</div>';
  }
  h += '</div>';
  h += '<div style="font-size:12px;color:#A99BBF;text-align:center;letter-spacing:2px;margin-bottom:6px">STEP ' + (cur + 1) + '/4</div>';
  h += '<div style="font-size:18px;font-weight:800;text-align:center;margin-bottom:16px;color:#2E1F4E">어느 쪽에 가깝나요?</div>';
  h += '<div style="display:flex;gap:10px;margin-bottom:14px">';
  ['L','R'].forEach(function(side) {
    var lb = side === 'L' ? d.Ll : d.Rl; var ltx = side === 'L' ? d.L : d.R; var ds = side === 'L' ? d.Ld : d.Rd; var sel = c === side;
    h += '<button onclick="pickEditMbtiSide(\'' + side + '\')" style="flex:1;padding:18px 10px;text-align:center;cursor:pointer;font-family:inherit;border-radius:16px;transition:all .25s;background:' + (sel ? 'linear-gradient(145deg,' + ac + '18,' + ac + '08)' : 'rgba(0,0,0,0.02)') + ';border:' + (sel ? '2.5px solid ' + ac : '2.5px solid #E8E4EF') + ';' + (sel ? 'box-shadow:0 4px 20px ' + ac + '25' : '') + '">';
    h += '<div style="font-size:32px;font-weight:900;color:' + (sel ? ac : '#AEAEB2') + ';margin-bottom:4px">' + ltx + '</div>';
    h += '<div style="font-size:12px;font-weight:700;color:' + (sel ? ac : '#636366') + ';margin-bottom:3px">' + lb + '</div>';
    h += '<div style="font-size:11px;color:#AEAEB2;line-height:1.5">' + ds + '</div></button>';
  });
  h += '</div>';
  if (c !== null) {
    var selLetter = c === 'L' ? d.L : d.R;
    h += '<div style="animation:up .3s ease"><div style="font-size:13px;color:#636366;text-align:center;margin-bottom:10px"><strong style="color:' + ac + '">' + selLetter + '</strong> 성향의 강도는?</div><div style="display:flex;gap:7px">';
    IN_OP.forEach(function(n) {
      var sel2 = iv === n.v;
      h += '<button onclick="pickEditIntensity(' + n.v + ')" style="flex:1;padding:11px 6px;text-align:center;cursor:pointer;font-family:inherit;border-radius:11px;transition:all .25s;background:' + (sel2 ? 'linear-gradient(145deg,' + ac + '20,' + ac + '08)' : 'rgba(0,0,0,0.02)') + ';border:' + (sel2 ? '2px solid ' + ac : '2px solid #E8E4EF') + ';' + (sel2 ? 'box-shadow:0 3px 14px ' + ac + '20' : '') + '"><div style="font-size:13px;font-weight:700;color:' + (sel2 ? ac : '#AEAEB2') + ';margin-bottom:2px">' + n.r + '</div><div style="font-size:10.5px;color:#AEAEB2">' + n.d + '</div></button>';
    });
    h += '</div></div>';
  }
  var ok = c !== null && iv !== null;
  h += '<div style="display:flex;gap:8px;margin-top:14px">';
  if (cur > 0) h += '<button onclick="editMbtiBack()" style="padding:12px 20px;font-size:14px;font-weight:600;color:#8B6CC1;background:rgba(139,108,193,0.06);border:1.5px solid rgba(139,108,193,0.15);border-radius:12px;cursor:pointer;font-family:inherit">←</button>';
  if (cur < 3) { h += '<button onclick="editMbtiNext()" ' + (ok ? '' : 'disabled') + ' style="flex:1;padding:12px;font-size:15px;font-weight:700;border-radius:12px;border:none;font-family:inherit;cursor:' + (ok ? 'pointer' : 'not-allowed') + ';background:' + (ok ? 'linear-gradient(135deg,' + ac + ',' + ac + 'cc)' : 'rgba(0,0,0,0.06)') + ';color:' + (ok ? '#fff' : '#AEAEB2') + ';' + (ok ? 'box-shadow:0 4px 16px ' + ac + '30' : '') + '">다음 →</button>'; }
  if (cur === 3 && ok) h += '<div style="flex:1;padding:12px 0;font-size:13px;font-weight:600;color:#2e8b57;text-align:center">✓ MBTI 설정 완료</div>';
  h += '</div>';
  area.innerHTML = h;
}
function pickEditMbtiSide(side) { _editMbtiCh[_editMbtiCur] = side; _editMbtiIt[_editMbtiCur] = null; renderEditMBTI(); }
function pickEditIntensity(v) { _editMbtiIt[_editMbtiCur] = v; renderEditMBTI(); }
function editMbtiNext() { if (_editMbtiCh[_editMbtiCur] === null || _editMbtiIt[_editMbtiCur] === null) return; if (_editMbtiCur < 3) { _editMbtiCur++; renderEditMBTI(); } }
function editMbtiBack() { if (_editMbtiCur > 0) { _editMbtiCur--; renderEditMBTI(); } }
function setEditCalType(type) { _editCalType = type; var s = document.getElementById('editCalSolar'), l = document.getElementById('editCalLunar'); if (s) { s.style.background = type === 'solar' ? '#fff' : 'transparent'; s.style.color = type === 'solar' ? '#7B5DAF' : '#B0A0C8'; s.style.boxShadow = type === 'solar' ? '0 2px 8px rgba(139,108,193,0.1)' : 'none'; } if (l) { l.style.background = type === 'lunar' ? '#fff' : 'transparent'; l.style.color = type === 'lunar' ? '#7B5DAF' : '#B0A0C8'; l.style.boxShadow = type === 'lunar' ? '0 2px 8px rgba(139,108,193,0.1)' : 'none'; } }
function setEditTimeUnknown() { _editTimeUnknown = true; var a = document.getElementById('editTimeArea'); if (a) a.innerHTML = '<div onclick="restoreEditTime()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>⏰</span> 시간 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
function restoreEditTime() { _editTimeUnknown = false; var a = document.getElementById('editTimeArea'); if (a) { var th = '<div style="display:grid;grid-template-columns:1fr 1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editHour" type="number" value="" placeholder="시" min="0" max="23" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'hour\')">▼</span></div><div class="ap-b-dropdown" id="editDropHour"></div></div><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editMin" type="number" value="" placeholder="분" min="0" max="59" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'min\')">▼</span></div><div class="ap-b-dropdown" id="editDropMin"></div></div><button onclick="setEditTimeUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; a.innerHTML = th; } }
function setEditCityUnknown() { _editCityUnknown = true; var a = document.getElementById('editCityArea'); if (a) a.innerHTML = '<div onclick="restoreEditCity()" style="padding:13px 16px;border-radius:12px;background:rgba(139,108,193,0.04);border:1.5px solid rgba(139,108,193,0.1);cursor:pointer;font-size:14px;color:#8B6CC1;font-weight:500;display:flex;align-items:center;gap:6px"><span>📍</span> 출생지 모름 <span style="margin-left:auto;font-size:12px;color:#B0A0C8">탭하여 입력</span></div>'; }
function restoreEditCity() { _editCityUnknown = false; var a = document.getElementById('editCityArea'); if (a) { var ch = '<div style="display:grid;grid-template-columns:1fr auto;gap:6px;align-items:center"><div style="position:relative"><div class="ap-b-combo" style="border-radius:12px"><input class="ap-b-input" id="editCity" type="text" value="" placeholder="도시 선택" style="border-radius:12px"><span class="ap-b-arrow" onclick="toggleEditDrop(\'city\')">▼</span></div><div class="ap-b-dropdown" id="editDropCity"></div></div><button onclick="setEditCityUnknown()" style="padding:12px 16px;border-radius:12px;border:1.5px solid #E8E4EF;background:#fff;font-size:13px;color:#A99BBF;cursor:pointer;font-family:inherit;font-weight:500;white-space:nowrap">모름</button></div>'; a.innerHTML = ch; } }

function pickEditGender(el, g) {
  _editGender = g;
  var btns = el.parentElement.querySelectorAll('.ap-b-gender');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('selected');
  el.classList.add('selected');
}

function toggleEditDrop(type) {
  var dropIds = {year:'editDropYear',month:'editDropMonth',day:'editDropDay',hour:'editDropHour',min:'editDropMin',city:'editDropCity'};
  var inputIds = {year:'editYear',month:'editMonth',day:'editDay',hour:'editHour',min:'editMin',city:'editCity'};
  var drop = document.getElementById(dropIds[type]);
  if (!drop) return;
  var isOpen = drop.classList.contains('show');
  for (var k in dropIds) { var d2 = document.getElementById(dropIds[k]); if (d2) d2.classList.remove('show'); }
  if (isOpen) return;
  var opts = [];
  if (type === 'year') { for (var y = 2010; y >= 1940; y--) opts.push(y); }
  else if (type === 'month') { for (var m = 1; m <= 12; m++) opts.push(m); }
  else if (type === 'day') { for (var d3 = 1; d3 <= 31; d3++) opts.push(d3); }
  else if (type === 'hour') { opts.push('모름'); for (var hh = 0; hh <= 23; hh++) opts.push(hh); }
  else if (type === 'min') { opts.push('모름'); for (var m2 = 0; m2 <= 59; m2 += 5) opts.push(m2); }
  else if (type === 'city') { opts = ['모름','서울','부산','대구','인천','광주','대전','울산','세종','수원','창원','청주','전주','포항','제주','천안']; }
  var inp = document.getElementById(inputIds[type]);
  var curVal = inp ? inp.value.trim() : '';
  var html = '';
  for (var i = 0; i < opts.length; i++) {
    var itemVal = String(opts[i]);
    var selected = (curVal && itemVal === curVal) ? ' selected' : '';
    html += '<div class="ap-b-drop-item' + selected + '" onclick="selectEditDrop(\'' + type + '\',\'' + opts[i] + '\')">' + opts[i] + '</div>';
  }
  drop.innerHTML = html;
  drop.classList.add('show');
}

function selectEditDrop(type, val) {
  var inputIds = {year:'editYear',month:'editMonth',day:'editDay',hour:'editHour',min:'editMin',city:'editCity'};
  var dropIds = {year:'editDropYear',month:'editDropMonth',day:'editDropDay',hour:'editDropHour',min:'editDropMin',city:'editDropCity'};
  var inp = document.getElementById(inputIds[type]);
  if (inp) inp.value = (val === '모름') ? '' : val;
  for (var k in dropIds) { var d2 = document.getElementById(dropIds[k]); if (d2) d2.classList.remove('show'); }
}

async function saveEditProfile() {
  var btn = document.getElementById('editSaveBtn');
  if (btn) { btn.disabled = true; btn.textContent = '저장 중...'; }

  var newName = (document.getElementById('editNameInput') || {}).value || '';
  if (!newName.trim()) { showToast('이름을 입력해주세요'); if(btn){btn.disabled=false;btn.textContent='저장하기';} return; }

  var y = (document.getElementById('editYear') || {}).value || '';
  var m = (document.getElementById('editMonth') || {}).value || '';
  var d = (document.getElementById('editDay') || {}).value || '';
  var ph = (document.getElementById('editHour') || {}).value || '';
  var pmin = (document.getElementById('editMin') || {}).value || '';
  var gender = _editGender || '';
  var city = (document.getElementById('editCity') || {}).value || '';
  var cityLng = 127;
  var CITY_LNG = {'서울':127,'부산':129.08,'대구':128.6,'인천':126.7,'광주':126.85,'대전':127.39,'울산':129.31,'세종':127.01,'수원':127.01,'창원':128.68,'청주':127.49,'전주':127.15,'포항':129.37,'제주':126.53,'천안':127.15};
  if (city && CITY_LNG[city]) cityLng = CITY_LNG[city];
  var newMBTI = _editMbtiCh.map(function(c,i){return c===null?'?':(c==='L'?DM_AX[i].L:DM_AX[i].R);}).join('');
  var newMbtiIt = _editMbtiIt.slice();

  var _valid = true;
  var _yEl = document.getElementById('editYear');
  var _mEl = document.getElementById('editMonth');
  var _dEl = document.getElementById('editDay');

  if (!y || isNaN(parseInt(y)) || parseInt(y) < 1920 || parseInt(y) > 2025) {
    if (_yEl) _yEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_yEl) _yEl.style.borderColor = ''; }

  if (!m || isNaN(parseInt(m)) || parseInt(m) < 1 || parseInt(m) > 12) {
    if (_mEl) _mEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_mEl) _mEl.style.borderColor = ''; }

  if (!d || isNaN(parseInt(d)) || parseInt(d) < 1 || parseInt(d) > 31) {
    if (_dEl) _dEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_dEl) _dEl.style.borderColor = ''; }

  if (!_valid) {
    showToast('생년월일을 정확히 입력해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }
  if (!gender) {
    showToast('성별을 선택해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }

  var rec = window._editTargetRec;
  if (!rec || !rec.id) { showToast('저장 대상을 찾을 수 없어요'); if(btn){btn.disabled=false;btn.textContent='저장하기';} return; }

  try {
    var calcY = parseInt(y), calcM = parseInt(m), calcD = parseInt(d);
    var isLunar = (_editCalType === 'lunar');
    if (isLunar && typeof lunarToSolar === 'function') {
      var solar = lunarToSolar(calcY, calcM, calcD, false);
      if (!solar) {
        showToast('음력 날짜를 확인해주세요');
        if(btn){btn.disabled=false;btn.textContent='저장하기';}
        return;
      }
      calcY = solar.year;
      calcM = solar.month;
      calcD = solar.day;
    }
    var newSaju = calcSajuForApp(calcY, calcM, calcD, ph ? parseInt(ph) : null, pmin ? parseInt(pmin) : null, cityLng);
    var newGG = analyzeGyeokguk(newSaju);
    var newDW = calcDaewoon(newSaju, calcY, calcM, calcD, ph ? parseInt(ph) : 12, pmin ? parseInt(pmin) : 0, gender);

    var _dom = newGG.dominant ? newGG.dominant[0] : '비겁';
    var _cond = '신강';
    if (newGG.isJonggyeok || newGG.isHwakyeok) _cond = '특수';
    else if (newGG.strengthGrade === '신약' || newGG.strengthGrade === '극신약') _cond = '신약';
    var newAnimal = { oheng: newSaju.dmEl || '토', dominant_sipsung: _dom, condition: _cond };

    // isMyProfile인 경우에만 세션/전역 변수 업데이트
    if (rec.isMyProfile) {
      window._lastSaju = newSaju;
      window._lastGG = newGG;
      window._lastDW = newDW;
      window._lastMBTI = newMBTI;
      if (!window._lastAIResult) window._lastAIResult = {};
      window._lastAIResult.animal = newAnimal;

      ST.y = y; ST.m = m; ST.d = d; ST.h = ph; ST.min = pmin; ST.gender = gender; ST.city = city; ST.cityLng = cityLng;
      ST.ch = _editMbtiCh.slice();
      ST.it = newMbtiIt;
      if (newName) ST.name = newName.trim();
      if (newName && typeof mbtsSession !== 'undefined' && mbtsSession) {
        mbtsSession.nickname = newName.trim();
        try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
      }

      try {
        localStorage.setItem('mbts_lastResult', JSON.stringify({
          input: { y:y, m:m, d:d, h:ph, min:pmin, gender:gender, city:city, cityLng:cityLng, isLunar:isLunar, ch:ST.ch||null, it:ST.it||null },
          saju: newSaju, dw: newDW, gg: newGG, mbti: newMBTI,
          mbtiObj: window._lastMBTIObj, aiResult: window._lastAIResult, isAI: window._lastIsAI
        }));
      } catch(e) {}
    }

    // 히스토리에서 rec.id로 매칭하여 업데이트
    try {
      var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
      var animalInfo = getAnimalResult(newAnimal.oheng, newAnimal.dominant_sipsung, newAnimal.condition);
      var myIlju = newSaju.P[2].s + newSaju.P[2].b;
      for (var i = 0; i < hist.length; i++) {
        if (hist[i].id === rec.id) {
          hist[i].name = newName.trim();
          hist[i].input = { y:y, m:m, d:d, h:ph, min:pmin, gender:gender, city:city, cityLng:cityLng, isLunar:isLunar, ch:_editMbtiCh.slice(), it:newMbtiIt };
          hist[i].saju = newSaju; hist[i].dw = newDW; hist[i].gg = newGG; hist[i].mbti = newMBTI;
          hist[i].mbtiObj = { type: newMBTI, ch: _editMbtiCh.slice(), it: newMbtiIt };
          hist[i].animal = newAnimal; hist[i].animalIlju = myIlju;
          if (animalInfo) {
            hist[i].animalIcon = typeof getAnimalIconUrl === 'function' ? getAnimalIconUrl(animalInfo.name) : '';
            hist[i].animalTag = animalInfo.mod ? animalInfo.mod.tag : '';
            hist[i].animalOneLine = animalInfo.mod ? animalInfo.mod.oneLine : '';
          }
          break;
        }
      }
      localStorage.setItem('mbts_history', JSON.stringify(hist));
    } catch(e) { console.warn('[MBTS] 히스토리 갱신 실패:', e); }

    console.log('[MBTS] 수정 저장 완료 — rec.id:', rec.id);

  } catch(calcErr) {
    console.error('[MBTS] 사주 재계산 실패:', calcErr);
    showToast('생년월일을 다시 확인해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }

  // isMyProfile인 경우 Supabase 및 UI 업데이트
  if (rec.isMyProfile) {
    try {
      if (typeof supabase !== 'undefined' && mbtsSession && mbtsSession.userId) {
        var _a = window._lastAIResult.animal || {};
        await supabase.from('users').update({
          nickname: newName.trim(), mbti: newMBTI,
          birth_year: parseInt(y) || null, birth_month: parseInt(m) || null, birth_day: parseInt(d) || null,
          birth_hour: ph ? parseInt(ph) : null, birth_min: pmin ? parseInt(pmin) : null,
          gender: gender, animal_key: _a.oheng ? (_a.oheng + '_' + _a.dominant_sipsung + '_' + _a.condition) : '',
          ilju: window._lastSaju.P[2].s + window._lastSaju.P[2].b, updated_at: new Date().toISOString()
        }).eq('id', mbtsSession.userId);
      }
    } catch(e) { console.warn('[MBTS] Supabase 업데이트 실패:', e); }

    if (mbtsSession) {
      mbtsSession.nickname = newName.trim();
      try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
    }

    if (typeof updateHomeProfile === 'function') updateHomeProfile();
    if (typeof updateMoreProfile === 'function') updateMoreProfile();
    if (typeof updateLoginUI === 'function') updateLoginUI();
    if (typeof updateFortuneTargetUI === 'function') setTimeout(updateFortuneTargetUI, 100);
  }

  showToast('저장되었어요! ✨');
  if(btn){btn.disabled=false;btn.textContent='저장하기';}

  go('pgBirth');
  if (typeof renderSaveCards === 'function') setTimeout(renderSaveCards, 100);
}


// saveProfile — deprecated, saveProfileFull()로 대체됨
async function saveProfile() { return saveProfileFull(); }

async function saveProfileFull() {
  var btn = document.getElementById('profileSaveBtn');
  if (btn) { btn.disabled = true; btn.textContent = '저장 중...'; }

  var newName = (document.getElementById('profileNameInput') || {}).value || '';
  if (!newName.trim()) { showToast('이름을 입력해주세요'); if(btn){btn.disabled=false;btn.textContent='저장하기';} return; }

  var y = (document.getElementById('profileYear') || {}).value || '';
  var m = (document.getElementById('profileMonth') || {}).value || '';
  var d = (document.getElementById('profileDay') || {}).value || '';
  var ph = (document.getElementById('profileHour') || {}).value || '';
  var pmin = (document.getElementById('profileMin') || {}).value || '';
  var gender = _profileGender || '';
  var city = (document.getElementById('profileCity') || {}).value || '';
  var cityLng = 127;
  var CITY_LNG = {'서울':127,'부산':129.08,'대구':128.6,'인천':126.7,'광주':126.85,'대전':127.39,'울산':129.31,'세종':127.01,'수원':127.01,'창원':128.68,'청주':127.49,'전주':127.15,'포항':129.37,'제주':126.53,'천안':127.15};
  if (city && CITY_LNG[city]) cityLng = CITY_LNG[city];
  var newMBTI = _profMbtiCh.map(function(c,i){return c===null?'?':(c==='L'?DM_AX[i].L:DM_AX[i].R);}).join('');
  var newMbtiIt = _profMbtiIt.slice();

  // 인라인 밸리데이션
  var _valid = true;
  var _yEl = document.getElementById('profileYear');
  var _mEl = document.getElementById('profileMonth');
  var _dEl = document.getElementById('profileDay');

  if (!y || isNaN(parseInt(y)) || parseInt(y) < 1920 || parseInt(y) > 2025) {
    if (_yEl) _yEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_yEl) _yEl.style.borderColor = ''; }

  if (!m || isNaN(parseInt(m)) || parseInt(m) < 1 || parseInt(m) > 12) {
    if (_mEl) _mEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_mEl) _mEl.style.borderColor = ''; }

  if (!d || isNaN(parseInt(d)) || parseInt(d) < 1 || parseInt(d) > 31) {
    if (_dEl) _dEl.style.borderColor = '#E8453C';
    _valid = false;
  } else { if (_dEl) _dEl.style.borderColor = ''; }

  if (!_valid) {
    showToast('생년월일을 정확히 입력해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }
  if (!gender) {
    showToast('성별을 선택해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }

  try {
    // 음력→양력 변환 (pgBirth goToMBTI와 동일한 패턴)
    var calcY = parseInt(y), calcM = parseInt(m), calcD = parseInt(d);
    var isLunar = (_profCalType === 'lunar');
    if (isLunar && typeof lunarToSolar === 'function') {
      var solar = lunarToSolar(calcY, calcM, calcD, false);
      if (!solar) {
        showToast('음력 날짜를 확인해주세요');
        if(btn){btn.disabled=false;btn.textContent='저장하기';}
        return;
      }
      calcY = solar.year;
      calcM = solar.month;
      calcD = solar.day;
    }
    var newSaju = calcSajuForApp(calcY, calcM, calcD, ph ? parseInt(ph) : null, pmin ? parseInt(pmin) : null, cityLng);
    var newGG = analyzeGyeokguk(newSaju);
    var newDW = calcDaewoon(newSaju, calcY, calcM, calcD, ph ? parseInt(ph) : 12, pmin ? parseInt(pmin) : 0, gender);

    var _dom = newGG.dominant ? newGG.dominant[0] : '비겁';
    var _cond = '신강';
    if (newGG.isJonggyeok || newGG.isHwakyeok) _cond = '특수';
    else if (newGG.strengthGrade === '신약' || newGG.strengthGrade === '극신약') _cond = '신약';
    var newAnimal = { oheng: newSaju.dmEl || '토', dominant_sipsung: _dom, condition: _cond };

    window._lastSaju = newSaju;
    window._lastGG = newGG;
    window._lastDW = newDW;
    window._lastMBTI = newMBTI;
    if (!window._lastAIResult) window._lastAIResult = {};
    window._lastAIResult.animal = newAnimal;

    ST.y = y; ST.m = m; ST.d = d; ST.h = ph; ST.min = pmin; ST.gender = gender; ST.city = city; ST.cityLng = cityLng;
    ST.ch = _profMbtiCh.slice();
    ST.it = newMbtiIt;
    if (newName) ST.name = newName.trim();
    if (newName && typeof mbtsSession !== 'undefined' && mbtsSession) {
      mbtsSession.nickname = newName.trim();
      try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
    }

    try {
      localStorage.setItem('mbts_lastResult', JSON.stringify({
        input: { y:y, m:m, d:d, h:ph, min:pmin, gender:gender, city:city, cityLng:cityLng, isLunar:isLunar, ch:ST.ch||null, it:ST.it||null },
        saju: newSaju, dw: newDW, gg: newGG, mbti: newMBTI,
        mbtiObj: window._lastMBTIObj, aiResult: window._lastAIResult, isAI: window._lastIsAI
      }));
    } catch(e) {}

    try {
      var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
      var found = false;
      var animalInfo = getAnimalResult(newAnimal.oheng, newAnimal.dominant_sipsung, newAnimal.condition);
      var myIlju = newSaju.P[2].s + newSaju.P[2].b;
      for (var i = 0; i < hist.length; i++) {
        if (hist[i].isMyProfile) {
          hist[i].name = newName.trim();
          hist[i].input = { y:y, m:m, d:d, h:ph, min:pmin, gender:gender, city:city, cityLng:cityLng, isLunar:isLunar };
          hist[i].saju = newSaju; hist[i].dw = newDW; hist[i].gg = newGG; hist[i].mbti = newMBTI;
          hist[i].animal = newAnimal; hist[i].animalIlju = myIlju;
          if (animalInfo) {
            hist[i].animalIcon = getAnimalIconUrl(animalInfo.name);
            hist[i].animalTag = animalInfo.mod ? animalInfo.mod.tag : '';
            hist[i].animalOneLine = animalInfo.mod ? animalInfo.mod.oneLine : '';
          }
          found = true;
          localStorage.setItem('mbts_fortuneTarget', hist[i].id);
          break;
        }
      }
      if (!found) {
        var newRec = {
          id: String(Date.now()) + '_' + String(Math.random()).slice(2,8),
          name: newName.trim(), date: new Date().toISOString().slice(0,10),
          input: { y:y, m:m, d:d, h:ph, min:pmin, gender:gender, city:city, cityLng:cityLng, isLunar:isLunar },
          isMyProfile: true, saju: newSaju, dw: newDW, gg: newGG, mbti: newMBTI,
          mbtiObj: window._lastMBTIObj || null, aiResult: window._lastAIResult || null, isAI: false,
          animal: newAnimal, animalIcon: animalInfo ? getAnimalIconUrl(animalInfo.name) : '',
          animalTag: animalInfo && animalInfo.mod ? animalInfo.mod.tag : '',
          animalIlju: myIlju, animalOneLine: animalInfo && animalInfo.mod ? animalInfo.mod.oneLine : ''
        };
        hist.unshift(newRec);
        localStorage.setItem('mbts_fortuneTarget', newRec.id);
      }
      localStorage.setItem('mbts_history', JSON.stringify(hist));
    } catch(e) { console.warn('[MBTS] 히스토리 갱신 실패:', e); }

    console.log('[MBTS] 프로필 저장 완료 — 사주 재계산:', myIlju, '동물:', animalInfo ? animalInfo.name : 'N/A');

  } catch(calcErr) {
    console.error('[MBTS] 사주 재계산 실패:', calcErr);
    showToast('생년월일을 다시 확인해주세요');
    if(btn){btn.disabled=false;btn.textContent='저장하기';}
    return;
  }

  try {
    if (typeof supabase !== 'undefined' && mbtsSession && mbtsSession.userId) {
      var _a = window._lastAIResult.animal || {};
      await supabase.from('users').update({
        nickname: newName.trim(), mbti: newMBTI,
        birth_year: parseInt(y) || null, birth_month: parseInt(m) || null, birth_day: parseInt(d) || null,
        birth_hour: ph ? parseInt(ph) : null, birth_min: pmin ? parseInt(pmin) : null,
        gender: gender, animal_key: _a.oheng ? (_a.oheng + '_' + _a.dominant_sipsung + '_' + _a.condition) : '',
        ilju: window._lastSaju.P[2].s + window._lastSaju.P[2].b, updated_at: new Date().toISOString()
      }).eq('id', mbtsSession.userId);

      // saju_results에서 isMyProfile 레코드의 full_record도 갱신
      try {
        var hist2 = JSON.parse(localStorage.getItem('mbts_history') || '[]');
        var myRec2 = null;
        for (var k2 = 0; k2 < hist2.length; k2++) { if (hist2[k2].isMyProfile) { myRec2 = hist2[k2]; break; } }
        if (myRec2 && myRec2.id) {
          supabase.from('saju_results').update({
            full_record: JSON.stringify(myRec2),
            name: newName.trim(),
            input_data: JSON.stringify(myRec2.input || {}),
            saju_data: JSON.stringify(myRec2.saju || {}),
            mbti_data: JSON.stringify(myRec2.mbtiObj || {})
          }).eq('user_id', mbtsSession.userId).eq('name', myRec2.name).then(function(r2) {
            if (r2.error) console.warn('[MBTS] saju_results 갱신 실패:', r2.error.message);
            else console.log('[MBTS] saju_results full_record 갱신 완료');
          });
        }
      } catch(e2) { console.warn('[MBTS] saju_results 갱신 에러:', e2); }
    }
  } catch(e) { console.warn('[MBTS] Supabase 업데이트 실패:', e); }

  if (mbtsSession) {
    mbtsSession.nickname = newName.trim();
    try { localStorage.setItem('mbts_session', JSON.stringify(mbtsSession)); } catch(e) {}
  }

  if (typeof updateHomeProfile === 'function') updateHomeProfile();
  if (typeof updateMoreProfile === 'function') updateMoreProfile();
  if (typeof updateLoginUI === 'function') updateLoginUI();
  if (typeof updateFortuneTargetUI === 'function') setTimeout(updateFortuneTargetUI, 100);

  showToast('저장되었어요! 동물이 업데이트됐어요 ✨');
  if(btn){btn.disabled=false;btn.textContent='저장하기';}

  setTimeout(function() { if (typeof renderProfileView === 'function') renderProfileView(); }, 300);
}

function updateHomeProfile() {
  var slot = document.getElementById('homeProfileSlot');
  if (!slot) return;

  var hasResult = !!(window._lastAIResult && window._lastAIResult.animal);

  if (hasResult) {
    var animal = window._lastAIResult.animal;
    var aInfo = getAnimalResult(animal.oheng, animal.dominant_sipsung, animal.condition);
    var icon = aInfo ? resolveAnimalIcon({ saju: window._lastSaju, gg: window._lastGG }) : '';
    var emoji = aInfo ? aInfo.emoji : '🌟';
    var name = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '나';
    var mbti = window._lastMBTI || '';
    var animalName = aInfo ? aInfo.name : '';

    slot.onclick = function() { go('pgProfile'); };
    var h = '<div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#F8F0FF,#FFF0F5);padding:6px 14px 6px 6px;border-radius:22px;box-shadow:0 2px 8px rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.1)">';
    h += '<div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#FFE0EC,#E8DEFF);display:flex;align-items:center;justify-content:center;font-size:20px;overflow:hidden">';
    if (icon) {
      h += '<img src="' + icon + '" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'' + emoji + '\'))">';
    } else {
      h += emoji;
    }
    h += '</div>';
    h += '<div><div style="font-size:12px;font-weight:700;color:#2E1F4E;line-height:1.2">' + name + '</div>';
    h += '<div style="font-size:10px;color:#8B6CC1">' + mbti + (animalName ? ' · ' + animalName : '') + '</div></div>';
    h += '</div>';
    slot.innerHTML = h;
  } else {
    slot.onclick = function(e) { e.stopPropagation(); go('pgAnimal'); };
    var h2 = '<div style="display:flex;align-items:center;gap:8px;background:linear-gradient(135deg,#F0EAFF,#FFE8F0);padding:8px 14px;border-radius:20px;box-shadow:0 2px 8px rgba(139,108,193,0.1)">';
    h2 += '<span style="font-size:12px;font-weight:700;color:#8B6CC1">내 동물 알아보기</span>';
    h2 += '</div>';
    slot.innerHTML = h2;
  }
}

function updateMoreProfile(){
  var emojiEl=document.getElementById('moreProfileEmoji');
  var infoEl=document.getElementById('moreProfileInfo');
  if(!emojiEl||!infoEl) return;
  try{
    var rec=(typeof getMyProfile==='function')?getMyProfile():null;
    if(!rec){
      rec=(typeof getFortuneTarget==='function')?getFortuneTarget():null;
    }
    if(!rec){
      var hist=JSON.parse(localStorage.getItem('mbts_history')||'[]');
      if(hist.length>0) rec=hist[0];
    }
    if(rec){
      var icon=resolveAnimalIcon(rec);
      var mbti=rec.mbti||'';
      var ilju='';
      if(rec.saju&&rec.saju.P&&rec.saju.P[2]) ilju=rec.saju.P[2].s+rec.saju.P[2].b+'일주';
      var tag=rec.animalTag||'';
      var parts=[];
      if(mbti) parts.push(mbti);
      if(ilju) parts.push(ilju);
      if(tag) parts.push('#'+tag);
      if(icon) emojiEl.innerHTML='<img src="'+icon+'" style="width:70%;height:70%;object-fit:contain" onerror="this.parentNode.textContent=\'🌟\'">'; else emojiEl.textContent='🌟';
      infoEl.textContent=parts.length>0?parts.join(' · '):'분석하면 여기에 표시돼요';
    }
  }catch(e){console.warn('[MBTS] 프로필 업데이트 실패:',e);}
}

function go(id,skipPush){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');p.style.display='none'});
  var pg=document.getElementById(id);
  var flexPages=['pgChat','pgMBTI','pgLoad','pgRes'];
  pg.style.display=flexPages.indexOf(id)>=0?'flex':'block';
  pg.classList.add('active');
  // ── 글로벌 네비바 show/hide + active 상태 ──
  var _hideNavPages=['pgLogin','pgBirth','pgMBTI','pgLoad','pgGhLoad','pgChat','pgLanding','pgEditProfile'];
  var _gNav=document.getElementById('globalBottomNav');
  if(_gNav){
    _gNav.style.display=_hideNavPages.indexOf(id)>=0?'none':'flex';
    var _navMap={
      'pgDash':'gnav-home','pgFortune':'gnav-home','pgGunghap':'gnav-home',
      'pgSave':'gnav-save','pgRes':'gnav-save','pgGhRes':'gnav-save',
      'pgClover':'gnav-clover',
      'pgMore':'gnav-more','pgProfile':'gnav-more','pgAbout':'gnav-more',
      'pgNotice':'gnav-more','pgTerms':'gnav-more','pgPrivacy':'gnav-more',
      'pgSupport':'gnav-more','pgInvite':'gnav-more'
    };
    var _activeId=_navMap[id]||'gnav-home';
    _gNav.querySelectorAll('.bnav').forEach(function(b){b.classList.remove('active')});
    var _activeBtn=document.getElementById(_activeId);
    if(_activeBtn) _activeBtn.classList.add('active');
  }
  window.scrollTo({top:0,behavior:'instant'});
  // 비로그인 유저 분석 진입 차단
  if((id==='pgBirth'||id==='pgGunghap')&&typeof isLoggedIn==='function'&&!isLoggedIn()){
    if(typeof showToast==='function') showToast('로그인이 필요합니다 🍀');
    id='pgLogin';
  }
  if(id==='pgBirth'&&typeof prefillBirthForm==='function'){
    setTimeout(prefillBirthForm,50);
    // birthProfileEditSlot 제거됨 — 불필요 코드 정리
  }
  if(id==='pgMore') updateMoreProfile();
  if(id==='pgProfile'&&typeof renderProfileView==='function') renderProfileView();
  // pgAnimal 진입 시 최신 프로필로 사전 세팅
  if(id==='pgAnimal'&&!window._isSharedView&&window._lastSaju&&window._lastMBTI){
    // 이미 데이터 있으면 바로 사용하도록 전역 상태 확인
  }
  if(id==='pgAnimal'&&typeof renderAnimalPage==='function'&&!window._isSharedView) renderAnimalPage();
  if(id==='pgClover'&&typeof loadCloverHistory==='function') loadCloverHistory();
  if(!skipPush){
    var noHistoryPages=['pgLoad','pgGhLoad'];
    if(noHistoryPages.indexOf(id)===-1){
      if(pageStack[pageStack.length-1]!==id){
        pageStack.push(id);
      }
      history.pushState({page:id},'','');
    }
  }
  // pgDash(홈)으로 이동할 때 운세 대상자 UI 갱신
  if(id==='pgDash'&&typeof updateFortuneTargetUI==='function'){
    setTimeout(updateFortuneTargetUI,50);
  }
  if(id==='pgDash'&&typeof updateHomeProfile==='function'){
    setTimeout(updateHomeProfile,50);
  }
  if(id==='pgSave'&&typeof renderSaveCards==='function'){
    setTimeout(renderSaveCards,50);
  }
}
function goPage(id){
  var map={'gh-load':'pgGhLoad','gh-res':'pgGhRes',
           'birth':'pgBirth','home':'pgDash',
           'gh-input':'pgGunghap','result':'pgRes',
           'fortune':'pgFortune'};
  go(map[id]||id);
}
window.goPage=goPage;

// gunghap.js 호환: DOM ID 별칭
(function(){
  var aliases={
    'gh-load-bar':'ghLoadBar',
    'gh-load-msg':'ghLoadMsg',
    'pg-gh-res':'pgGhRes'
  };
  var origGetById=document.getElementById.bind(document);
  document.getElementById=function(id){
    return origGetById(aliases[id]||id);
  };
})();

function goNav(el,id){
  var gNav=document.getElementById('globalBottomNav');
  if(gNav) gNav.querySelectorAll('.bnav').forEach(function(b){b.classList.remove('active')});
  if(el) el.classList.add('active');
  go(id);
  if(id==='pgDash') setTab(0);
  if(id==='pgClover'&&typeof loadCloverHistory==='function') loadCloverHistory();
  if(id==='pgSave'){
    setSaveTab(0);
    renderSaveCards();
    renderGhHistoryCards();
  }
}

// ===== 브라우저 뒤로가기 처리 =====
window.addEventListener('popstate',function(e){
  if(_isAnalyzing){
    history.pushState(null,'','');
    return;
  }
  if(pageStack.length>1){
    pageStack.pop();
  }
  var prevPage=pageStack[pageStack.length-1]||'pgDash';

  // pgLanding에서 뒤로가기 시 앱 이탈 방지
  if(pageStack.length<=1){
    history.pushState({page:prevPage},'','');
  }

  // 궁합 플로우에서 뒤로가기 시 선택 상태 초기화
  var currentPages=document.querySelectorAll('.page.active');
  var currentId=currentPages.length>0?currentPages[0].id:'';
  if(currentId==='pgGunghap'||currentId==='pgGhRes'){
    clearGH();
  }

  go(prevPage,true);

  if(prevPage==='pgDash'){setTab(0);}
  if(prevPage==='pgSave'){renderSaveCards();renderGhHistoryCards();}
});

// Dashboard tabs
function setTab(i){
  document.querySelectorAll('.tab').forEach((t,n)=>t.classList.toggle('active',n===i));
  document.getElementById('tabPill').style.transform=`translateX(${i*100}%)`;
  document.querySelectorAll('.tab-content').forEach((c,n)=>{
    c.classList.toggle('active',n===i);
    if(n===i){c.style.animation='none';c.offsetHeight;c.style.animation='up .4s ease-out';}
  });
}

// Dashboard tab actions → link to new pages
document.querySelector('.compat-hero')?.addEventListener('click',function(){goToGunghap('pgDash')});

// Stars
const sc=document.getElementById('stars');
for(let i=0;i<18;i++){
  const s=document.createElement('div');s.className='star';
  s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*5}s;animation-duration:${2.5+Math.random()*3}s;width:${1.5+Math.random()*1.5}px;height:${1.5+Math.random()*1.5}px`;
  sc.appendChild(s);
}

// Counselor dalto
const cd=document.getElementById('counselorDalto');
if(cd){
  const img=document.querySelector('.login-dalto img');
  if(img){const ci=document.createElement('img');ci.src=img.src;ci.alt='달토';cd.appendChild(ci);}
}

// ===== Edit Mode =====
var editMode=false;
function toggleEditMode(){
  editMode=!editMode;
  var cardList=document.getElementById('cardList');
  var btn=document.getElementById('editBtn');
  if(editMode){
    cardList.classList.add('edit-mode');
    btn.textContent='완료';
    btn.style.color='var(--purple)';
    cardList.querySelectorAll('.animal-card').forEach(function(c){
      c.dataset.origClick=c.getAttribute('onclick')||'';
      c.removeAttribute('onclick');
    });
    /* 이름 편집 input 삽입 */
    cardList.querySelectorAll('.animal-name').forEach(function(n){
      var textNode=n.firstChild;
      var origText=(textNode&&textNode.nodeType===3)?textNode.textContent.trim():'';
      n.dataset.original=origText;
      var inp=document.createElement('input');
      inp.type='text';
      inp.className='name-edit-input';
      inp.value=origText;
      inp.onclick=function(e){e.stopPropagation();};
      n.insertBefore(inp,n.firstChild);
      if(textNode&&textNode.nodeType===3) textNode.textContent='';
    });
  }else{
    /* 이름 편집 완료 — localStorage 업데이트 */
    var hist=[];
    try{hist=JSON.parse(localStorage.getItem('mbts_history'))||[];}catch(e){}
    cardList.querySelectorAll('.animal-card').forEach(function(c){
      var nameEl=c.querySelector('.animal-name');
      if(!nameEl)return;
      var inp=nameEl.querySelector('.name-edit-input');
      var newName=inp?inp.value.trim():(nameEl.dataset.original||'');
      if(!newName) newName=nameEl.dataset.original||'나';
      if(inp) inp.remove();
      var textNode=nameEl.firstChild;
      if(textNode&&textNode.nodeType===3){
        textNode.textContent=newName+' ';
      }else{
        nameEl.insertBefore(document.createTextNode(newName+' '),nameEl.firstChild);
      }
      /* localStorage 히스토리에서 해당 레코드 name 업데이트 */
      var rid=c.dataset.recordId;
      if(rid){
        for(var i=0;i<hist.length;i++){
          if(hist[i].id===rid){hist[i].name=newName;break;}
        }
      }
    });
    localStorage.setItem('mbts_history',JSON.stringify(hist));
    cardList.classList.remove('edit-mode');
    btn.textContent='수정';
    btn.style.color='';
    cardList.querySelectorAll('.animal-card').forEach(function(c){
      if(c.dataset.origClick) c.setAttribute('onclick',c.dataset.origClick);
    });
    /* 카드 다시 렌더링하여 ME 뱃지 등 반영 */
    renderSaveCards();
  }
}

function confirmDelHistory(btn,recordId){
  var card=btn.closest('.animal-card');
  var name=card.querySelector('.animal-name')?card.querySelector('.animal-name').textContent.trim():'';
  showDelDialog(name,function(){
    try{
      var hist=JSON.parse(localStorage.getItem('mbts_history'))||[];
      hist=hist.filter(function(r){return r.id!==recordId;});
      localStorage.setItem('mbts_history',JSON.stringify(hist));
      if(typeof onFortuneTargetHistoryDelete==='function'){
        onFortuneTargetHistoryDelete(recordId);
      }
      // Supabase에서도 삭제 동기화
      if (typeof supabase !== 'undefined' && mbtsSession && mbtsSession.userId) {
        supabase.from('saju_results').delete().eq('user_id', mbtsSession.userId).then(function(delRes) {
          var currentHist = [];
          try { currentHist = JSON.parse(localStorage.getItem('mbts_history') || '[]'); } catch(e2) {}
          currentHist.forEach(function(rec) {
            if (rec && rec.id) {
              supabase.from('saju_results').insert({
                user_id: mbtsSession.userId,
                name: rec.name || '나',
                input_data: JSON.stringify(rec.input || {}),
                saju_data: JSON.stringify(rec.saju || {}),
                mbti_data: JSON.stringify(rec.mbtiObj || {}),
                result_json: typeof rec.aiResult === 'string' ? rec.aiResult : JSON.stringify(rec.aiResult || {}),
                full_record: JSON.stringify(rec)
              }).then(function() {});
            }
          });
          console.log('[MBTS] Supabase 히스토리 삭제 동기화 완료');
        });
      }
    }catch(e){}
    card.style.transition='all .3s';
    card.style.transform='scale(0.8)';
    card.style.opacity='0';
    setTimeout(function(){card.remove();renderSaveCards();},300);
  });
}

function showDelDialog(name,onConfirm){
  var overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;animation:fade .2s ease-out';
  var box=document.createElement('div');
  box.style.cssText='background:#fff;border-radius:16px;padding:28px 24px 20px;width:280px;text-align:center;box-shadow:0 16px 48px rgba(0,0,0,0.15)';
  box.innerHTML='<div style="font-size:16px;font-weight:700;margin-bottom:8px">정말 지울까요?</div>'
    +'<div style="font-size:13px;color:#888;line-height:1.5;margin-bottom:20px">분석 결과는 복구할 수 없어요</div>'
    +'<div style="display:flex;gap:8px">'
    +'<button onclick="this.closest(\'div\').parentElement.parentElement.remove()" style="flex:1;padding:12px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;font-weight:600;color:#888;cursor:pointer">취소</button>'
    +'<button id="delConfirmBtn" style="flex:1;padding:12px;border-radius:10px;border:none;background:rgba(232,69,60,0.9);color:#fff;font-size:14px;font-weight:700;cursor:pointer">지우기</button>'
    +'</div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.onclick=function(e){if(e.target===overlay)overlay.remove()};
  box.querySelector('#delConfirmBtn').onclick=function(){
    overlay.remove();
    onConfirm();
  };
}

// ===== renderSaveCards — localStorage 히스토리 → 카드 렌더링 =====
function renderSaveCards(){
  var cardList=document.getElementById('cardList');
  if(!cardList)return;
  editMode=false;
  var eBtn=document.getElementById('editBtn');
  if(eBtn){eBtn.textContent='수정';eBtn.style.color='';}
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_history'))||[];}catch(e){}
  if(hist.length===0){
    cardList.innerHTML='<div style="text-align:center;padding:48px 20px;color:var(--text-3)">'
      +'<div style="font-size:40px;margin-bottom:12px">📭</div>'
      +'<div style="font-size:14px;font-weight:600;margin-bottom:6px">아직 분석 기록이 없어요</div>'
      +'<div style="font-size:12px">MBTS 풀이를 하면 여기에 자동 저장돼요</div>'
      +'</div>';
    return;
  }
  var ohColors={'목':'#22A469','화':'#E8453C','토':'#C49A2A','금':'#6B7B8D','수':'#2D7EB5'};
  var ohBg={'목':'#EDFCF2,#D1FAE5','화':'#FEF1F0,#FEE2E2','토':'#FDF8EC,#FEF3C7','금':'#F2F4F6,#E2E8F0','수':'#EDF5FC,#DBEAFE'};
  var html='';
  var currentTarget=localStorage.getItem('mbts_fortuneTarget');
  if(!currentTarget&&hist.length>0) currentTarget=hist[0].id;
  var reversed=hist.slice().reverse();
  reversed.forEach(function(rec,idx){
    var icon=resolveAnimalIcon(rec);
    var tag=rec.animalTag||'';
    var mbti=rec.mbti||'';
    var ilju=rec.animalIlju||'';
    var oneLine=rec.animalOneLine||'';
    var name=rec.name||'나';
    var date=rec.date||'';
    var oheng=(rec.saju&&rec.saju.dmEl)?rec.saju.dmEl:'토';
    var dominant=(rec.gg&&rec.gg.dominant)?rec.gg.dominant:'';
    var strength=(rec.gg&&rec.gg.strengthGrade)?rec.gg.strengthGrade:'';
    var clr=ohColors[oheng]||'#888';
    var bg1=ohBg[oheng]||'#f5f5f5,#eee';
    var glowR=parseInt(clr.slice(1,3),16);
    var glowG=parseInt(clr.slice(3,5),16);
    var glowB=parseInt(clr.slice(5,7),16);
    var glow='rgba('+glowR+','+glowG+','+glowB+',0.15)';
    var isMe=(name==='나');
    var meBadge='';
    /* personMap에 등록 (궁합 선택용) */
    personMap[rec.id]={name:name,icon:icon,tag:tag,saju:rec.saju,dw:rec.dw,gg:rec.gg,mbtiObj:rec.mbtiObj};
    var extraClass=(idx>=3)?' extra-card':'';
    var extraStyle=(idx>=3)?'display:none;':'';
    html+='<div class="animal-card'+extraClass+'" data-record-id="'+rec.id+'" onclick="openHistoryRecord(\''+rec.id+'\')" style="'+extraStyle+'--card-glow:'+glow+'">';
    html+='<div class="animal-card-top">';
    html+='<div class="animal-emoji-box" style="background:linear-gradient(135deg,'+bg1+')">'+(icon?'<img src="'+icon+'" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'🌟\'))">':'🌟')+'</div>';
    html+='<div class="animal-info">';
    var isTarget=(rec.id===currentTarget);
    var starBadge=isTarget?' <span class="saju-star" style="color:var(--purple);font-size:13px;" title="더 알아보기 대상">⭐</span>':'';
    var checkUI='<span class="my-saju-check'+(isTarget?' checked':'')+'" onclick="event.stopPropagation();setMyFortune(\''+rec.id+'\')">';
    checkUI+='<span class="check-icon">'+(isTarget?'✓':'')+'</span> 내 MBTS</span>';
    html+='<div class="animal-name">'+name+starBadge+checkUI+'</div>';
    html+='<div>';
    if(tag) html+='<span class="animal-tag" style="background:rgba('+glowR+','+glowG+','+glowB+',0.08);color:'+clr+'">'+tag+'</span>';
    if(mbti) html+='<span class="animal-tag" style="background:rgba(139,108,193,0.08);color:var(--purple)">'+mbti+'</span>';
    html+='</div>';
    html+='<div class="animal-meta">';
    if(ilju) html+='<span>'+ilju+'</span><span>·</span>';
    var dominantLabel = '';
    if(dominant){
      if(Array.isArray(dominant)){
        dominantLabel = dominant[0] || '';
      } else if(typeof dominant === 'string'){
        dominantLabel = dominant.split(',')[0] || '';
      } else {
        dominantLabel = String(dominant);
      }
    }
    html+='<span>'+oheng+(dominantLabel?' · '+dominantLabel:'')+(strength?' · '+strength:'')+'</span>';
    html+='</div>';
    html+='</div>';
    html+='<button class="del-btn" onclick="event.stopPropagation();confirmDelHistory(this,\''+rec.id+'\')">지우기</button>';
    html+='<div class="gh-circle" id="ghc-'+rec.id+'" onclick="event.stopPropagation();toggleGH(\''+rec.id+'\')"></div>';
    html+='</div>';
    html+='<div class="animal-card-bottom">';
    html+='<div class="animal-ilju">'+(oneLine||tag)+'</div>';
    html+='<div class="animal-date">'+date+'</div>';
    html+='</div>';
    html+='</div>';
  });
  if(reversed.length>3){
    html+='<div id="showMoreBtn" onclick="toggleExtraCards()" style="text-align:center;padding:12px 0 8px;cursor:pointer">';
    html+='<span style="font-size:13px;font-weight:600;color:var(--text-3)">더보기 ∨</span>';
    html+='</div>';
  }
  cardList.innerHTML=html;
}

// ===== 궁합 히스토리 동적 렌더링 =====
function renderGhHistoryCards(){
  var cardList=document.getElementById('ghCardList');
  if(!cardList) return;
  ghEditMode=false;
  var ghBtn=document.getElementById('ghEditBtn');
  if(ghBtn){ghBtn.textContent='수정';}
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_gh_history'))||[];}catch(e){}

  if(hist.length===0){
    cardList.innerHTML='<div style="text-align:center;padding:48px 20px;color:var(--text-3)">'
      +'<div style="font-size:40px;margin-bottom:12px">💕</div>'
      +'<div style="font-size:14px;font-weight:600;margin-bottom:6px">아직 궁합 기록이 없어요</div>'
      +'<div style="font-size:12px">궁합 분석을 하면 여기에 자동 저장돼요</div>'
      +'</div>';
    return;
  }

  var html='';
  var reversed=hist.slice().reverse();
  reversed.forEach(function(rec,idx){
    var pA=rec.personA||{};
    var pB=rec.personB||{};
    var total=(rec.scores&&rec.scores.total)?rec.scores.total:0;
    var relLabel=rec.relLabel||'궁합';
    var date=rec.date||'';

    var extraCls=(idx>=3)?' extra-gh':'';
    var extraStyle=(idx>=3)?' display:none;':'';
    html+='<div class="gh-history'+extraCls+'" data-record-id="'+rec.id+'" onclick="openGhHistoryRecord(\''+rec.id+'\')" style="cursor:pointer;'+extraStyle+'">';
    html+='<button class="gh-del-btn" onclick="event.stopPropagation();confirmDelGhHistory(this,\''+rec.id+'\')">지우기</button>';
    html+='<div class="gh-pair">';
    var _ghIconA=resolveGhPersonIcon(pA);
    html+='<div class="gh-pair-unit"><div class="gh-pair-animal" style="background:linear-gradient(135deg,#E8DEFF,#F0E6FF)">'+(_ghIconA?'<img src="'+_ghIconA+'" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'👤\'))">':'👤')+'</div><div class="gh-pair-name" data-side="a">'+(pA.name||'?')+'</div></div>';
    html+='<div class="gh-pair-heart">💕</div>';
    var _ghIconB=resolveGhPersonIcon(pB);
    html+='<div class="gh-pair-unit"><div class="gh-pair-animal" style="background:linear-gradient(135deg,#FFE4E8,#FFF0F3)">'+(_ghIconB?'<img src="'+_ghIconB+'" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'👤\'))">':'👤')+'</div><div class="gh-pair-name" data-side="b">'+(pB.name||'?')+'</div></div>';
    html+='<div class="gh-pair-rel-badge">'+relLabel+' 궁합</div>';
    html+='</div>';
    html+='<div class="gh-score-bar">';
    html+='<div class="gh-score-num">'+total+'</div>';
    html+='<div class="gh-score-track"><div class="gh-score-fill" style="width:'+total+'%"></div></div>';
    html+='</div>';
    html+='<div class="gh-score-date">'+date+'</div>';
    html+='</div>';
  });

  if(reversed.length>3){
    html+='<button onclick="event.stopPropagation();toggleExtraGh()" id="btnMoreGh" style="width:100%;padding:10px;margin-top:8px;background:none;border:1px solid #E5E5EA;border-radius:var(--r-sm);font-size:13px;color:var(--text-3);cursor:pointer">더보기 ∨</button>';
  }

  cardList.innerHTML=html;
}

// ===== 궁합 히스토리 기록 클릭 → 결과 다시 보기 =====
function openGhHistoryRecord(recordId){
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_gh_history'))||[];}catch(e){}
  var rec=null;
  for(var i=0;i<hist.length;i++){if(hist[i].id===recordId){rec=hist[i];break;}}
  if(!rec) return;

  // ghA, ghB 전역변수 복원
  ghA={
    name:rec.personA.name, emoji:rec.personA.emoji, tag:rec.personA.tag,
    saju:rec.personA.saju, mbtiObj:rec.personA.mbtiObj
  };
  ghB={
    name:rec.personB.name, emoji:rec.personB.emoji, tag:rec.personB.tag,
    saju:rec.personB.saju, mbtiObj:rec.personB.mbtiObj
  };
  ghRel=rec.relType||'ssom';

  window._skipGhHistorySave=true;
  go('pgGhRes');
  fillGhResult(rec.ghResult,rec.aiResult,rec.personA.saju,rec.personB.saju,rec.personA.mbtiObj,rec.personB.mbtiObj,rec.relType);
}

// ===== 궁합 히스토리 삭제 =====
function deleteGhHistory(recordId){
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_gh_history'))||[];}catch(e){}
  hist=hist.filter(function(r){return r.id!==recordId;});
  localStorage.setItem('mbts_gh_history',JSON.stringify(hist));
  renderGhHistoryCards();
}

// ===== 궁합 히스토리 편집 모드 =====
var ghEditMode=false;
function toggleGhEditMode(){
  ghEditMode=!ghEditMode;
  var cardList=document.getElementById('ghCardList');
  var btn=document.getElementById('ghEditBtn');
  if(ghEditMode){
    cardList.classList.add('gh-edit-mode');
    btn.textContent='완료';
    cardList.querySelectorAll('.gh-history').forEach(function(c){
      c.dataset.origClick=c.getAttribute('onclick')||'';
      c.removeAttribute('onclick');
    });
    cardList.querySelectorAll('.gh-pair-name').forEach(function(n){
      var origText=n.textContent.trim();
      n.dataset.original=origText;
      var inp=document.createElement('input');
      inp.type='text';
      inp.className='gh-name-edit-input';
      inp.value=origText;
      inp.onclick=function(e){e.stopPropagation();};
      n.textContent='';
      n.appendChild(inp);
    });
  }else{
    var hist=[];
    try{hist=JSON.parse(localStorage.getItem('mbts_gh_history'))||[];}catch(e){}
    cardList.querySelectorAll('.gh-history').forEach(function(c){
      var rid=c.dataset.recordId;
      if(!rid) return;
      var names=c.querySelectorAll('.gh-pair-name');
      var nameA=names[0]?((names[0].querySelector('input')?names[0].querySelector('input').value.trim():'')||names[0].dataset.original||'?'):'?';
      var nameB=names[1]?((names[1].querySelector('input')?names[1].querySelector('input').value.trim():'')||names[1].dataset.original||'?'):'?';
      for(var i=0;i<hist.length;i++){
        if(hist[i].id===rid){
          if(hist[i].personA) hist[i].personA.name=nameA;
          if(hist[i].personB) hist[i].personB.name=nameB;
          break;
        }
      }
    });
    localStorage.setItem('mbts_gh_history',JSON.stringify(hist));
    cardList.classList.remove('gh-edit-mode');
    btn.textContent='수정';
    ghEditMode=false;
    renderGhHistoryCards();
  }
}

function confirmDelGhHistory(btn,recordId){
  showDelDialog('궁합 기록',function(){
    deleteGhHistory(recordId);
  });
}

// ===== 히스토리 기록 클릭 → 결과 다시 보기 =====
function openHistoryRecord(recordId){
  if(editMode)return;
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_history'))||[];}catch(e){}
  var rec=null;
  for(var i=0;i<hist.length;i++){if(hist[i].id===recordId){rec=hist[i];break;}}
  if(!rec)return;

  if(!rec.aiResult){
    if(rec.saju && rec.gg){
      var oheng = rec.saju.dmEl || '토';
      var dominantSS = (rec.gg.dominant && rec.gg.dominant[0]) ? rec.gg.dominant[0] : '비겁';
      var condition = '신강';
      if(rec.gg.isJonggyeok || rec.gg.isHwakyeok) condition = '특수';
      else if(rec.gg.strengthGrade === '신약' || rec.gg.strengthGrade === '극신약') condition = '신약';
      var animal = (typeof getAnimalResult === 'function') ? getAnimalResult(oheng, dominantSS, condition) : null;
      if(animal && animal.mod){
        document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');p.style.display='none'});
        var pg = document.getElementById('pgAnimal');
        pg.style.display = 'block';
        pg.classList.add('active');
        window.scrollTo({top:0,behavior:'instant'});
        if(pageStack[pageStack.length-1]!=='pgAnimal'){
          pageStack.push('pgAnimal');
        }
        history.pushState({page:'pgAnimal'},'','');
        if(typeof window.svcRenderResult === 'function'){
          window.svcRenderResult(pg, animal, rec.mbti || '', rec.saju, rec.gg, oheng, condition, rec.name || '나');
        }
        return;
      }
    }
    return;
  }

  if(rec.input){
    ST.y=rec.input.y||'';ST.m=rec.input.m||'';ST.d=rec.input.d||'';
    ST.h=rec.input.h||'';ST.min=rec.input.min||'';
    ST.gender=rec.input.gender||'';ST.city=rec.input.city||'';
    ST.cityLng=rec.input.cityLng||0;
  }
  ST.name=rec.name||'나';
  window._lastSaju=rec.saju||null;
  window._lastDW=rec.dw||null;
  window._lastGG=rec.gg||null;
  window._lastMBTI=rec.mbti||null;
  window._lastMBTIObj=rec.mbtiObj||null;
  window._lastAIResult=rec.aiResult||null;
  window._lastIsAI=rec.isAI||false;
  window._skipHistorySave=true;
  renderResult(rec.aiResult,rec.saju,rec.mbti,rec.gg,rec.isAI);
  window._skipHistorySave=false;
}

// ===== 저장 탭: Gunghap circle selection =====
var ghSelected=[];
function toggleGH(id){
  var idx=ghSelected.indexOf(id);
  if(idx>-1){
    ghSelected.splice(idx,1);
    var ghEl=document.getElementById('ghc-'+id);
    if(ghEl) ghEl.classList.remove('checked');
  }else if(ghSelected.length<2){
    ghSelected.push(id);
    var ghEl2=document.getElementById('ghc-'+id);
    if(ghEl2) ghEl2.classList.add('checked');
  }
  var bar=document.getElementById('selectBar');
  var btn2=document.getElementById('btnGunghap');
  var cnt=document.getElementById('selectCount');
  if(ghSelected.length>0){
    bar.classList.add('show');
    cnt.textContent=ghSelected.length+'명 선택';
    btn2.classList.toggle('ready',ghSelected.length===2);
  }else{
    bar.classList.remove('show');
  }
}
function clearGH(){
  ghSelected=[];
  document.querySelectorAll('.gh-circle').forEach(function(c){c.classList.remove('checked');});
  document.getElementById('selectBar').classList.remove('show');
}

// ===== 궁합 플로우 =====
var personMap={};
var ghA=null;
var ghB=null;
var ghRel=null;
var ghPrevPage='pgDash';

function resetGunghap(){
  ghA=null;ghB=null;ghRel=null;
  emptySlot('slotA',true);
  emptySlot('slotB',false);
  updatePersonHighlight();
  updatePickingState();
  document.querySelectorAll('.rel-btn').forEach(function(b){b.classList.remove('active')});
  document.getElementById('ghStart').classList.remove('ready');
}

function goBackFromGH(){
  clearGH();
  if(ghPrevPage==='pgSave'){
    go('pgSave');
  } else {
    go('pgDash');
    setTab(1);
  }
}

function goToGunghap(fromPage){
  ghPrevPage=fromPage||'pgHome';
  resetGunghap();
  renderGunghapPeopleList();
  go('pgGunghap');
}

function renderGunghapPeopleList(){
  var list=document.getElementById('ghPeopleList');
  if(!list)return;
  var hist=[];
  try{hist=JSON.parse(localStorage.getItem('mbts_history'))||[];}catch(e){}
  /* 이름+MBTI+일주 조합이 같으면 최신만 (뒤에서부터 탐색) */
  var seen={};
  var unique=[];
  for(var i=hist.length-1;i>=0;i--){
    var key=(hist[i].name||'나')+'|'+(hist[i].mbti||'')+'|'+(hist[i].animalIlju||'');
    if(!seen[key]){seen[key]=true;unique.push(hist[i]);}
  }
  if(unique.length===0){
    list.innerHTML='<div style="text-align:center;padding:24px 16px;color:var(--text-3);font-size:13px">아직 분석한 사람이 없어요.<br>MBTS 풀이를 먼저 해보세요!</div>';
    return;
  }
  var html='';
  unique.forEach(function(rec){
    var icon=resolveAnimalIcon(rec);
    var name=rec.name||'나';
    var tag=rec.animalTag||'';
    var mbti=rec.mbti||'';
    var ilju=rec.animalIlju||'';
    var sub=tag+(mbti?' · '+mbti:'')+(ilju?' · '+ilju:'');
    /* personMap에도 등록 */
    personMap[rec.id]={name:name,icon:icon,tag:tag,saju:rec.saju,dw:rec.dw,gg:rec.gg,mbtiObj:rec.mbtiObj};
    html+='<div class="mini-person" data-rec-id="'+rec.id+'" onclick="pickPersonFromHistory(this,\''+rec.id+'\')">';
    html+='<div class="mini-emoji">'+(icon?'<img src="'+icon+'" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'🌟\'))">':'🌟')+'</div>';
    var _eName=name.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    var _eSub=sub.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    html+='<div class="mini-info"><div class="mini-name">'+_eName+'</div><div class="mini-sub">'+_eSub+'</div></div>';
    html+='</div>';
  });
  list.innerHTML=html;
}

function pickPersonFromHistory(el,recordId){
  var pm=personMap[recordId];
  if(!pm)return;
  var extraData={saju:pm.saju,dw:pm.dw,gg:pm.gg,mbtiObj:pm.mbtiObj};
  pickPersonById(el,recordId,pm.icon,pm.name,pm.tag,extraData);
}

function fillSlot(slotId,data,style){
  var slot=document.getElementById(slotId);
  slot.className='gh-slot '+style;
  slot.innerHTML='<div class="gh-slot-emoji">'+data.emoji+'</div><div class="gh-slot-name">'+data.name+'</div><div class="gh-slot-tag">'+data.tag+'</div>';
}

function emptySlot(slotId,isWaiting){
  var slot=document.getElementById(slotId);
  var cls='gh-slot';
  if(isWaiting) cls+=(slotId==='slotA'?' waiting':' waiting-b');
  slot.className=cls;
  slot.innerHTML='<div class="gh-slot-empty-icon">👤</div><div class="gh-slot-empty">'+(isWaiting?'목록에서 선택해주세요':'')+'</div>';
}

function pickPerson(el,emoji,name,tag,extraData){
  var data={emoji:emoji,name:name,tag:tag};
  // saju 데이터 연결: extraData가 있으면 사용, 없으면 '나'면 _last* 사용
  if(extraData){
    data.saju=extraData.saju;data.dw=extraData.dw;data.gg=extraData.gg;data.mbtiObj=extraData.mbtiObj;
  } else if(name==='나' && window._lastSaju){
    data.saju=window._lastSaju;data.dw=window._lastDW;data.gg=window._lastGG;data.mbtiObj=window._lastMBTIObj;
  }

  // 이미 A에 있으면 → A 해제
  if(ghA && ghA.name===name){
    ghA=null;
    emptySlot('slotA',true);
    updatePersonHighlight();
    updatePickingState();
    checkGHReady();
    return;
  }
  // 이미 B에 있으면 → B 해제
  if(ghB && ghB.name===name){
    ghB=null;
    emptySlot('slotB',!ghA?false:true);
    updatePersonHighlight();
    updatePickingState();
    checkGHReady();
    return;
  }

  // A가 비었으면 → A에 넣기
  if(!ghA){
    ghA=data;
    fillSlot('slotA',data,'filled');
    // B가 비었으면 B를 로즈 깜빡으로
    if(!ghB) emptySlot('slotB',true);
  }
  // B가 비었으면 → B에 넣기
  else if(!ghB){
    // 같은 사람 방지
    if(ghA.name===name) return;
    ghB=data;
    fillSlot('slotB',data,'filled-b');
  }

  updatePersonHighlight();
  updatePersonHighlightById();
  updatePickingState();
  checkGHReady();
}

function pickPersonById(el,id,emoji,name,tag,extraData){
  var data={emoji:emoji,name:name,tag:tag,_id:id};
  if(extraData){
    data.saju=extraData.saju;data.dw=extraData.dw;data.gg=extraData.gg;data.mbtiObj=extraData.mbtiObj;
  }

  // 이미 A에 있으면 → A 해제 (_id로 비교)
  if(ghA&&ghA._id&&ghA._id===id){
    ghA=null;
    emptySlot('slotA',true);
    updatePersonHighlightById();
    updatePickingState();
    checkGHReady();
    return;
  }
  // 이미 B에 있으면 → B 해제
  if(ghB&&ghB._id&&ghB._id===id){
    ghB=null;
    emptySlot('slotB',!ghA?false:true);
    updatePersonHighlightById();
    updatePickingState();
    checkGHReady();
    return;
  }

  if(!ghA){
    ghA=data;
    fillSlot('slotA',data,'filled');
    if(!ghB) emptySlot('slotB',true);
  } else if(!ghB){
    if(ghA._id&&ghA._id===id) return;
    ghB=data;
    fillSlot('slotB',data,'filled-b');
  }

  updatePersonHighlightById();
  updatePickingState();
  checkGHReady();
}

function updatePickingState(){
  var list=document.querySelector('.gh-people-list');
  if(list){
    if(ghA&&!ghB) list.classList.add('picking-b');
    else list.classList.remove('picking-b');
  }
  var addSec=document.querySelector('.gh-add-section');
  if(addSec){
    addSec.classList.remove('theme-a','theme-b','theme-done');
    if(!ghA) addSec.classList.add('theme-a');
    else if(!ghB) addSec.classList.add('theme-b');
    else addSec.classList.add('theme-done');
  }
}

function updatePersonHighlight(){
  document.querySelectorAll('.mini-person').forEach(function(p){
    p.classList.remove('selected-a','selected-b');
    var pName=p.querySelector('.mini-name').textContent;
    if(ghA && pName===ghA.name) p.classList.add('selected-a');
    if(ghB && pName===ghB.name) p.classList.add('selected-b');
  });
}

function updatePersonHighlightById(){
  document.querySelectorAll('.mini-person').forEach(function(p){
    p.classList.remove('selected-a','selected-b');
    var rid=p.getAttribute('data-rec-id');
    if(rid){
      if(ghA&&ghA._id&&rid===ghA._id) p.classList.add('selected-a');
      if(ghB&&ghB._id&&rid===ghB._id) p.classList.add('selected-b');
    } else {
      var pName=p.querySelector('.mini-name');
      if(pName){
        var nm=pName.textContent;
        if(ghA&&!ghA._id&&ghA.name===nm) p.classList.add('selected-a');
        if(ghB&&!ghB._id&&ghB.name===nm) p.classList.add('selected-b');
      }
    }
  });
}

function pickRel(el){
  document.querySelectorAll('.rel-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  ghRel=el.getAttribute('data-rel')||'ssom';
  checkGHReady();
}
function checkGHReady(){
  document.getElementById('ghStart').classList.toggle('ready',!!(ghA&&ghB&&ghRel));
}

function goGunghapWithSelected(){
  if(ghSelected.length!==2) return;
  var pA=Object.assign({},personMap[ghSelected[0]]);
  var pB=Object.assign({},personMap[ghSelected[1]]);
  pA._id=ghSelected[0];
  pB._id=ghSelected[1];
  // '나'면 saju 데이터 연결
  if(pA.name==='나'&&window._lastSaju){pA.saju=window._lastSaju;pA.dw=window._lastDW;pA.gg=window._lastGG;pA.mbtiObj=window._lastMBTIObj;}
  if(pB.name==='나'&&window._lastSaju){pB.saju=window._lastSaju;pB.dw=window._lastDW;pB.gg=window._lastGG;pB.mbtiObj=window._lastMBTIObj;}
  ghPrevPage='pgSave';
  resetGunghap();
  renderGunghapPeopleList();
  go('pgGunghap');
  // Pre-fill slots
  ghA=pA;
  ghB=pB;
  fillSlot('slotA',pA,'filled');
  fillSlot('slotB',pB,'filled-b');
  // Highlight in person list
  updatePersonHighlightById();
  updatePickingState();
  // Scroll to relationship section
  setTimeout(function(){
    document.querySelector('.gh-rel-title').scrollIntoView({behavior:'smooth',block:'center'});
  },300);
}

// Remove animations after first play
document.querySelectorAll('[style*="animation"], .animal-card, .premium, .svc-item, .list-item, .greeting, .content, .gh-history').forEach(function(el){
  el.addEventListener('animationend', function(){
    this.style.animation='none';
  }, {once:true});
});
document.querySelectorAll('.topic').forEach(t=>t.addEventListener('click',function(){go('pgChat')}));

// ===== 분석결과: Sub tabs =====
function setSaveTab(i){
  clearGH();
  document.querySelectorAll('.sub-tab').forEach(function(t,n){
    t.classList.remove('active','active-rose');
    if(n===i) t.classList.add(n===1?'active-rose':'active');
  });
  document.querySelectorAll('.sub-content').forEach((c,n)=>c.classList.toggle('active',n===i));
  if(i===0) renderSaveCards();
  if(i===1) renderGhHistoryCards();
}

// ===== BIRTH INPUT PAGE =====
var birthGender='';
var currentDrop='';
var CITIES=['모름','서울','부산','대구','인천','광주','대전','울산','세종','수원','성남','고양','용인','창원','청주','천안','전주','안산','안양','남양주','화성','평택','시흥','파주','김포','광명','군포','의왕','하남','오산','이천','양주','구리','포천','동두천','과천','여주','양평','가평','연천','춘천','원주','강릉','동해','태백','속초','삼척','홍천','횡성','영월','평창','정선','철원','화천','양구','인제','고성','양양','충주','제천','보은','옥천','영동','증평','진천','괴산','음성','단양','아산','공주','보령','서산','논산','계룡','당진','금산','부여','서천','청양','홍성','예산','태안','목포','여수','순천','나주','광양','담양','곡성','구례','고흥','보성','화순','장흥','강진','해남','영암','무안','함평','영광','장성','완도','진도','신안','익산','군산','정읍','남원','김제','완주','진안','무주','장수','임실','순창','고창','부안','포항','경주','김천','안동','구미','영주','영천','상주','문경','경산','군위','의성','청송','영양','영덕','청도','고령','성주','칠곡','예천','봉화','울진','울릉','진주','통영','사천','김해','밀양','거제','양산','의령','함안','창녕','고성','남해','하동','산청','함양','거창','합천','제주','서귀포'];

function pickBirthGender(g){
  birthGender=g;
  var mBtn=document.getElementById('bMale');
  var fBtn=document.getElementById('bFemale');
  if(g==='남성'){
    mBtn.style.borderColor='#5B8FD450';mBtn.style.background='rgba(91,143,212,0.06)';mBtn.style.color='#5B8FD4';mBtn.style.boxShadow='0 4px 18px #5B8FD418';
    fBtn.style.borderColor='rgba(255,255,255,0.6)';fBtn.style.background='rgba(255,255,255,0.45)';fBtn.style.color='#9B8CB8';fBtn.style.boxShadow='none';
  } else {
    fBtn.style.borderColor='#D4738B50';fBtn.style.background='rgba(212,115,139,0.06)';fBtn.style.color='#D4738B';fBtn.style.boxShadow='0 4px 18px #D4738B18';
    mBtn.style.borderColor='rgba(255,255,255,0.6)';mBtn.style.background='rgba(255,255,255,0.45)';mBtn.style.color='#9B8CB8';mBtn.style.boxShadow='none';
  }
  checkBirthReady();
}

function checkBirthReady(){
  var nm=document.getElementById('bName').value.trim();
  var y=document.getElementById('bYear').value;
  var m=document.getElementById('bMonth').value||document.getElementById('bMonthInput').value;
  var d=document.getElementById('bDay').value||document.getElementById('bDayInput').value;
  var ok=nm&&y&&m&&d&&birthGender;
  var btn=document.getElementById('birthNextBtn');
  btn.classList.toggle('ready',!!ok);
  var shimEl=document.getElementById('birthShimmer');
  if(!shimEl){
    shimEl=document.createElement('div');shimEl.id='birthShimmer';shimEl.className='shimmer';btn.insertBefore(shimEl,btn.firstChild);
  }
  shimEl.style.display=ok?'block':'none';
}

// 타이핑으로 값 입력 시 hidden에도 반영
function onComboInput(type){
  if(type==='month'){
    var v=document.getElementById('bMonthInput').value;
    if(v&&v>=1&&v<=12) document.getElementById('bMonth').value=v;
    else document.getElementById('bMonth').value='';
  }else if(type==='day'){
    var v=document.getElementById('bDayInput').value;
    if(v&&v>=1&&v<=31) document.getElementById('bDay').value=v;
    else document.getElementById('bDay').value='';
  }else if(type==='hour'){
    var v=document.getElementById('bHourInput').value;
    if(v!==''&&v>=0&&v<=23) document.getElementById('bHour').value=v;
    else document.getElementById('bHour').value='';
  }else if(type==='min'){
    var v=document.getElementById('bMinInput').value;
    if(v!==''&&v>=0&&v<=59) document.getElementById('bMin').value=v;
    else document.getElementById('bMin').value='';
  }else if(type==='city'){
    var v=document.getElementById('bCityInput').value.trim();
    document.getElementById('bCity').value=v;
    // 자동완성 드롭다운
    if(v.length>0){
      var filtered=CITIES.filter(function(c){return c!=='모름'&&c.indexOf(v)===0;});
      if(filtered.length>0){
        var drop=document.getElementById('dropCity');
        var html='';
        filtered.forEach(function(c,i){
          html+='<div class="birth-drop-item'+(i===0?' first':'')+'" onclick="pickBirthDrop(\'city\',\''+c+'\')">'+c.replace(v,'<strong style="color:#8B6CC1">'+v+'</strong>')+'</div>';
        });
        drop.innerHTML=html;
        drop.classList.add('show');
        document.getElementById('bCityArrow').classList.add('open');
        currentDrop='city';
      }else{
        closeDropOnly('city');
      }
    }else{
      closeDropOnly('city');
    }
  }
  checkBirthReady();
}

function closeDropOnly(type){
  var ids={year:'dropYear',month:'dropMonth',day:'dropDay',hour:'dropHour',min:'dropMin',city:'dropCity'};
  var arrows={year:'bYearArrow',month:'bMonthArrow',day:'bDayArrow',hour:'bHourArrow',min:'bMinArrow',city:'bCityArrow'};
  if(ids[type]){document.getElementById(ids[type]).classList.remove('show');document.getElementById(arrows[type]).classList.remove('open');}
  if(currentDrop===type) currentDrop='';
}

// 출생지 엔터 키 처리
document.addEventListener('keydown',function(e){
  if(e.key==='Enter'){
    var cityInput=document.getElementById('bCityInput');
    if(document.activeElement===cityInput){
      e.preventDefault();
      var v=cityInput.value.trim();
      // 드롭다운 열려있으면 첫 번째 항목 선택
      var drop=document.getElementById('dropCity');
      var first=drop.querySelector('.birth-drop-item');
      if(drop.classList.contains('show')&&first){
        first.click();
      }else if(v){
        // 정확히 일치하는 도시가 있으면 선택
        var match=CITIES.find(function(c){return c===v;});
        if(match){
          document.getElementById('bCity').value=match;
          cityInput.value=match;
        }
        closeAllDrops();
      }
      cityInput.blur();
      return;
    }
    // 다른 숫자 필드에서 엔터 → 다음 보이는 필드로 포커스
    var fields=['bYear','bMonthInput','bDayInput','bHourInput','bMinInput','bCityInput'];
    var idx=fields.indexOf(document.activeElement.id);
    if(idx>=0){
      e.preventDefault();
      for(var ni=idx+1;ni<fields.length;ni++){
        var nextEl=document.getElementById(fields[ni]);
        if(nextEl&&nextEl.offsetParent!==null){nextEl.focus();return;}
      }
    }
  }
});

function closeAllDrops(){
  document.querySelectorAll('.birth-dropdown').forEach(function(d){d.classList.remove('show')});
  document.querySelectorAll('.birth-combo-arrow').forEach(function(a){a.classList.remove('open')});
  currentDrop='';
}

function toggleBirthDrop(type){
  if(currentDrop===type){closeAllDrops();return;}
  closeAllDrops();
  currentDrop=type;
  var dropId,arrowId,items=[];

  if(type==='year'){
    dropId='dropYear';arrowId='bYearArrow';
    var cur=document.getElementById('bYear').value;
    for(var i=2026;i>=1930;i--) items.push({v:String(i),label:String(i)+'년',sel:cur==String(i)});
  }else if(type==='month'){
    dropId='dropMonth';arrowId='bMonthArrow';
    var cur=document.getElementById('bMonth').value||document.getElementById('bMonthInput').value;
    for(var i=1;i<=12;i++) items.push({v:String(i),label:i+'월',sel:cur==String(i)});
  }else if(type==='day'){
    dropId='dropDay';arrowId='bDayArrow';
    var cur=document.getElementById('bDay').value||document.getElementById('bDayInput').value;
    for(var i=1;i<=31;i++) items.push({v:String(i),label:i+'일',sel:cur==String(i)});
  }else if(type==='hour'){
    dropId='dropHour';arrowId='bHourArrow';
    var cur=document.getElementById('bHour').value;
    items.push({v:'',label:'모름',sel:cur===''});
    for(var i=0;i<=23;i++) items.push({v:String(i),label:i+'시',sel:cur==String(i)});
  }else if(type==='min'){
    dropId='dropMin';arrowId='bMinArrow';
    var cur=document.getElementById('bMin').value;
    items.push({v:'',label:'모름',sel:cur===''});
    for(var i=0;i<=55;i+=5) items.push({v:String(i),label:i+'분',sel:cur==String(i)});
  }else if(type==='city'){
    dropId='dropCity';arrowId='bCityArrow';
    var cur=document.getElementById('bCity').value||document.getElementById('bCityInput').value;
    CITIES.forEach(function(c){items.push({v:c==='모름'?'':c,label:c,sel:(cur===c)||(c==='모름'&&!cur)});});
  }

  var drop=document.getElementById(dropId);
  var html='';
  items.forEach(function(it){
    html+='<div class="birth-drop-item'+(it.sel?' selected':'')+'" onclick="pickBirthDrop(\''+type+'\',\''+it.v+'\')">'+it.label+'</div>';
  });
  drop.innerHTML=html;
  drop.classList.add('show');
  document.getElementById(arrowId).classList.add('open');
  setTimeout(function(){var s=drop.querySelector('.selected');if(s)s.scrollIntoView({block:'center',behavior:'instant'});},50);
}

function pickBirthDrop(type,val){
  if(type==='year'){
    document.getElementById('bYear').value=val;
  }else if(type==='month'){
    document.getElementById('bMonth').value=val;
    document.getElementById('bMonthInput').value=val;
  }else if(type==='day'){
    document.getElementById('bDay').value=val;
    document.getElementById('bDayInput').value=val;
  }else if(type==='hour'){
    document.getElementById('bHour').value=val;
    document.getElementById('bHourInput').value=val;
    if(val==='') document.getElementById('bHourInput').value='';
  }else if(type==='min'){
    document.getElementById('bMin').value=val;
    document.getElementById('bMinInput').value=val;
    if(val==='') document.getElementById('bMinInput').value='';
  }else if(type==='city'){
    document.getElementById('bCity').value=val;
    document.getElementById('bCityInput').value=val||'모름';
  }
  checkBirthReady();
  closeAllDrops();
}

// 바깥 클릭 시 드롭다운 닫기
document.addEventListener('click',function(e){
  if(currentDrop&&!e.target.closest('.birth-field')){closeAllDrops();}
});

// ===== MBTI PAGE =====
var DM_AX=[{L:"E",R:"I",Ll:"외향형(E)",Rl:"내향형(I)",Ld:"사람들과 함께할 때 에너지 충전",Rd:"혼자만의 시간에 에너지 충전"},{L:"S",R:"N",Ll:"감각형(S)",Rl:"직관형(N)",Ld:"현실적이고 구체적인 사실 중시",Rd:"가능성과 패턴, 큰 그림 중시"},{L:"T",R:"F",Ll:"사고형(T)",Rl:"감정형(F)",Ld:"논리와 객관적 분석으로 판단",Rd:"가치와 감정, 조화를 중시"},{L:"J",R:"P",Ll:"판단형(J)",Rl:"인식형(P)",Ld:"계획적이고 체계적인 생활 선호",Rd:"유연하고 즉흥적인 생활 선호"}];
var IN_OP=[{r:"50~60%",d:"미세한 성향",v:55},{r:"61~75%",d:"뚜렷한 성향",v:68},{r:"76~100%",d:"매우 확고한 성향",v:88}];
var DC=["#5B8FD4","#2e8b57","#88619A","#c99a2e"],DB=["rgba(91,143,212,.1)","rgba(46,139,87,.1)","rgba(136,97,154,.1)","rgba(201,154,46,.1)"];
var mbtiCh=[null,null,null,null];
var mbtiIt=[null,null,null,null];
var mbtiCur=0;

window._isLunarInput = false;
window._isMyProfile = true;

function setCalType(type) {
  window._isLunarInput = (type === 'lunar');
  var sBtn = document.getElementById('calSolar');
  var lBtn = document.getElementById('calLunar');
  var leapRow = document.getElementById('leapMonthRow');
  if (type === 'lunar') {
    lBtn.style.background = '#fff';
    lBtn.style.color = '#7B5DAF';
    lBtn.style.boxShadow = '0 2px 8px rgba(139,108,193,0.1)';
    sBtn.style.background = 'transparent';
    sBtn.style.color = '#B0A0C8';
    sBtn.style.boxShadow = 'none';
    if (leapRow) leapRow.style.display = 'flex';
  } else {
    sBtn.style.background = '#fff';
    sBtn.style.color = '#7B5DAF';
    sBtn.style.boxShadow = '0 2px 8px rgba(139,108,193,0.1)';
    lBtn.style.background = 'transparent';
    lBtn.style.color = '#B0A0C8';
    lBtn.style.boxShadow = 'none';
    if (leapRow) leapRow.style.display = 'none';
    document.getElementById('isLeapMonth').value = 'false';
  }
}

function toggleLeapMonth() {
  var el = document.getElementById('isLeapMonth');
  var icon = document.getElementById('leapMonthIcon');
  var btn = document.getElementById('leapMonthRow');
  var isOn = el.value === 'true';
  el.value = isOn ? 'false' : 'true';
  if (!isOn) {
    icon.style.background = 'linear-gradient(135deg,#8B6CC1,#A07DD6)';
    icon.style.border = 'none';
    icon.style.boxShadow = '0 2px 8px rgba(139,108,193,0.25)';
    icon.innerHTML = '✓';
    btn.style.color = '#8B6CC1';
  } else {
    icon.style.background = 'transparent';
    icon.style.border = '1.5px solid #C4B0E8';
    icon.style.boxShadow = 'none';
    icon.innerHTML = '';
    btn.style.color = '#C4B0E8';
  }
}

// ── pgBirth 프리필: 본인 데이터 자동 채움 (Apple Settings 스타일) ──
function prefillBirthForm(){
  var prefillCard=document.getElementById('birthPrefillCard');
  var glassCard=document.querySelector('.birth-glass-card');
  var ctaWrap=document.getElementById('birthCtaWrap');
  if(!prefillCard)return;

  var rec=null;
  try{
    var hist=JSON.parse(localStorage.getItem('mbts_history')||'[]');
    for(var i=hist.length-1;i>=0;i--){
      if(hist[i].isMyProfile){rec=hist[i];break;}
    }
    if(!rec){
      for(var i=hist.length-1;i>=0;i--){
        if(hist[i].input&&hist[i].input.y){rec=hist[i];break;}
      }
    }
  }catch(e){}

  if(!rec||!rec.input){
    prefillCard.style.display='none';
    if(glassCard)glassCard.style.display='';
    if(ctaWrap)ctaWrap.style.display='';
    return;
  }

  var inp=rec.input;
  var nameStr=rec.name||'나';
  var mbtiStr=rec.mbti||'';
  var infoStr=mbtiStr;
  if(inp.y)infoStr+=(infoStr?' · ':'')+inp.y+'.'+inp.m+'.'+inp.d;
  if(inp.gender)infoStr+=' · '+inp.gender;

  var icon=resolveAnimalIcon(rec);
  var isFree=window._svcMode==='free';
  var btnLabel=isFree?'분석하기':'분석하기 🍀15';

  // 오행 색상 계산
  var oheng=(rec.saju&&rec.saju.dmEl)?rec.saju.dmEl:'토';
  var _ohBg={'목':'#EDFCF2,#D1FAE5','화':'#FEF1F0,#FEE2E2','토':'#FDF8EC,#FEF3C7','금':'#F2F4F6,#E2E8F0','수':'#EDF5FC,#DBEAFE'};
  var _ohShadow={'목':'rgba(34,164,105,0.12)','화':'rgba(232,69,60,0.12)','토':'rgba(196,154,42,0.12)','금':'rgba(107,123,141,0.12)','수':'rgba(45,126,181,0.12)'};
  var iconBg=_ohBg[oheng]||'#F2F4F6,#E2E8F0';
  var iconShadow=_ohShadow[oheng]||'rgba(0,0,0,0.08)';

  // 동물 정보 조회
  var animalTitle = '';
  var animalSub2 = '';
  var ilju2 = '';
  if (rec.saju && rec.saju.P && rec.saju.P[2]) { ilju2 = rec.saju.P[2].s + rec.saju.P[2].b; }
  if (rec.animal || (window._lastAIResult && window._lastAIResult.animal)) {
    var _an = rec.animal || window._lastAIResult.animal;
    var _aInfo = getAnimalResult(_an.oheng, _an.dominant_sipsung, _an.condition);
    if (_aInfo && _aInfo.mod) {
      animalTitle = _aInfo.mod.title;
      animalSub2 = _an.oheng + ' · ' + _an.dominant_sipsung + ' · ' + _an.condition + (ilju2 ? ' · ' + ilju2 + ' 일주' : '');
    }
  }

  var birthStr2 = '';
  if (inp.y) birthStr2 = inp.y + '년 ' + inp.m + '월 ' + inp.d + '일';
  var calLabel2 = inp.isLunar ? '음력' : '양력';
  var timeStr2 = '모름';
  if (inp.h && inp.h !== '' && inp.h !== '모름') { timeStr2 = inp.h + '시'; if (inp.min && inp.min !== '') timeStr2 += ' ' + inp.min + '분'; }
  var genderStr2 = (inp.gender === '남' || inp.gender === '남성') ? '남성' : (inp.gender === '여' || inp.gender === '여성') ? '여성' : '미설정';

  var mbtiLetters2 = mbtiStr ? mbtiStr.split('') : [];
  var mbtiDC2 = ['#5B8FD4','#2e8b57','#88619A','#c99a2e'];

  var ch = '';

  // ── 소프트카드 ──
  ch += '<div style="background:#fff;border-radius:24px;padding:28px 22px 22px;box-shadow:0 4px 24px rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.06);margin-bottom:12px">';

  ch += '<div style="text-align:center;margin-bottom:20px">';
  ch += '<div style="width:88px;height:88px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(145deg,#F3EDFF,#FFE8F0);display:flex;align-items:center;justify-content:center;font-size:46px;box-shadow:0 6px 20px rgba(139,108,193,0.12);overflow:hidden">';
  if (icon) { ch += '<img src="' + icon + '" style="width:70%;height:70%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(\'🌟\'))">'; }
  else { ch += '🌟'; }
  ch += '</div>';
  ch += '<div style="font-size:17px;font-weight:800;color:#2E1F4E;margin-bottom:4px">' + nameStr + '</div>';
  if (animalTitle) {
    ch += '<div style="font-size:14px;font-weight:600;color:#6B4FA0;margin-bottom:4px">' + animalTitle + '</div>';
    ch += '<div style="font-size:12px;color:#A99BBF">' + animalSub2 + '</div>';
  }
  ch += '</div>';

  ch += '<div style="height:1px;background:linear-gradient(90deg,transparent,#E8DEFF,transparent);margin:0 0 16px"></div>';

  ch += '<div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px">';
  if (birthStr2) {
    ch += '<div style="display:flex;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:#A99BBF">생년월일</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + birthStr2 + ' <span style="font-size:11px;color:#C4B8D8">' + calLabel2 + '</span></span></div>';
  }
  ch += '<div style="display:flex;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:#A99BBF">태어난 시간</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + timeStr2 + '</span></div>';
  ch += '<div style="display:flex;justify-content:space-between"><span style="font-size:12px;font-weight:600;color:#A99BBF">성별</span><span style="font-size:14px;font-weight:600;color:#2E1F4E">' + genderStr2 + '</span></div>';
  ch += '</div>';

  if (mbtiLetters2.length === 4) {
    ch += '<div style="margin-bottom:18px">';
    ch += '<div style="font-size:12px;font-weight:600;color:#A99BBF;margin-bottom:8px">MBTI</div>';
    ch += '<div style="display:flex;gap:6px">';
    for (var mi2 = 0; mi2 < 4; mi2++) {
      ch += '<div style="flex:1;text-align:center;padding:10px 0 8px;background:' + mbtiDC2[mi2] + '10;border-radius:12px;border:1.5px solid ' + mbtiDC2[mi2] + '30">';
      ch += '<div style="font-size:22px;font-weight:900;color:' + mbtiDC2[mi2] + '">' + mbtiLetters2[mi2] + '</div>';
      ch += '</div>';
    }
    ch += '</div></div>';
  }

  ch += '<div style="display:flex;gap:8px">';
  ch += '<button class="prefill-float" onclick="editPrefillForm()" style="flex:1;padding:14px;font-size:14px;font-weight:600;color:#6B4FA0;background:rgba(139,108,193,0.08);border:1.5px solid rgba(139,108,193,0.15);border-radius:14px;cursor:pointer;font-family:inherit">✏️ 수정</button>';
  ch += '<button class="prefill-float" onclick="usePrefill()" style="flex:2;padding:14px;font-size:16px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:14px;cursor:pointer;font-family:inherit;box-shadow:0 4px 16px rgba(107,79,160,0.2)">🔮 ' + btnLabel + '</button>';
  ch += '</div>';

  ch += '</div>';

  // ── 친구 배너 카드 ──
  ch += '<div class="prefill-float" onclick="showBirthForm()" style="background:linear-gradient(135deg,#FFE0EC,#E8DEFF);border-radius:16px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:14px">';
  ch += '<div style="font-size:28px">✨</div>';
  ch += '<div style="flex:1">';
  ch += '<div style="font-size:14px;font-weight:700;color:#2E1F4E">친구 사주도 궁금하지 않으세요?</div>';
  ch += '<div style="font-size:12px;color:#7B5FB0;margin-top:2px">이름과 생년월일만 입력하면 끝!</div>';
  ch += '</div>';
  ch += '<div style="color:rgba(139,108,193,0.4);font-size:18px">›</div>';
  ch += '</div>';

  prefillCard.innerHTML=ch;
  prefillCard.style.display='block';
  if(glassCard)glassCard.style.display='none';
  if(ctaWrap)ctaWrap.style.display='none';
  window._prefillRec=rec;
}

// ── "분석하기" 클릭 — MBTI 3단계 폴백 + 바로 분석 ──
function usePrefill(){
  if(window._prefillLock)return;
  window._prefillLock=true;
  setTimeout(function(){window._prefillLock=false;},3000);

  var rec=window._prefillRec;
  if(!rec||!rec.input)return;
  var inp=rec.input;

  document.getElementById('bName').value=rec.name||'';
  document.getElementById('bYear').value=inp.y||'';
  document.getElementById('bMonthInput').value=inp.m||'';
  document.getElementById('bMonth').value=inp.m||'';
  document.getElementById('bDayInput').value=inp.d||'';
  document.getElementById('bDay').value=inp.d||'';
  if(inp.h&&inp.h!=='모름'&&inp.h!==''){document.getElementById('bHourInput').value=inp.h;document.getElementById('bHour').value=inp.h;}
  if(inp.min&&inp.min!==''){document.getElementById('bMinInput').value=inp.min;document.getElementById('bMin').value=inp.min;}
  if(inp.city&&inp.city!=='모름'&&inp.city!==''){document.getElementById('bCityInput').value=inp.city;document.getElementById('bCity').value=inp.city;}
  if(inp.gender)pickBirthGender(inp.gender);

  var mObj=rec.mbtiObj;
  var ch=(inp.ch)||(mObj&&mObj.ch)||null;
  var it=(inp.it)||(mObj&&mObj.it)||null;
  if(!ch&&rec.mbti&&rec.mbti.length===4){
    var _m={E:'L',I:'R',S:'L',N:'R',T:'L',F:'R',J:'L',P:'R'};
    ch=rec.mbti.split('').map(function(c){return _m[c]||'R';});
    it=[60,60,60,60];
  }
  if(ch&&it&&ch.indexOf(null)===-1&&it.indexOf(null)===-1){
    mbtiCh=ch.slice();
    mbtiIt=it.slice();
    mbtiCur=3;
    window._isMyProfile=true;
    mbtiGoNext();
  } else {
    window._isMyProfile=true;
    var icon=document.getElementById('myProfileIcon');
    if(icon){icon.style.background='linear-gradient(135deg,#8B6CC1,#A07DD6)';icon.style.border='none';icon.style.boxShadow='0 2px 8px rgba(139,108,193,0.25)';icon.innerHTML='✓';}
    var prefillCard=document.getElementById('birthPrefillCard');
    var glassCard=document.querySelector('.birth-glass-card');
    var ctaWrap=document.getElementById('birthCtaWrap');
    if(prefillCard)prefillCard.style.display='none';
    if(glassCard)glassCard.style.display='';
    if(ctaWrap)ctaWrap.style.display='';
    checkBirthReady();
    if(typeof showToast==='function')showToast('MBTI 선택이 필요해요 ✨');
    window._prefillLock=false;
  }
}

// ── "수정" 클릭 — 프리필 카드 숨기고 기존 입력폼에 데이터 채워서 열기 ──
function editPrefillForm(){
  var rec = window._prefillRec;
  if(!rec||!rec.input) return;
  var inp=rec.input;

  // 프리필 카드 숨기고 입력 폼 표시
  var prefillCard=document.getElementById('birthPrefillCard');
  var glassCard=document.querySelector('.birth-glass-card');
  var ctaWrap=document.getElementById('birthCtaWrap');
  if(prefillCard)prefillCard.style.display='none';
  if(glassCard)glassCard.style.display='';
  if(ctaWrap)ctaWrap.style.display='';

  // 기존 정보로 폼 프리필
  document.getElementById('bName').value=rec.name||'';
  document.getElementById('bYear').value=inp.y||'';
  document.getElementById('bMonthInput').value=inp.m||'';document.getElementById('bMonth').value=inp.m||'';
  document.getElementById('bDayInput').value=inp.d||'';document.getElementById('bDay').value=inp.d||'';
  if(inp.h&&inp.h!=='모름'&&inp.h!==''){document.getElementById('bHourInput').value=inp.h;document.getElementById('bHour').value=inp.h;}
  if(inp.min&&inp.min!==''){document.getElementById('bMinInput').value=inp.min;document.getElementById('bMin').value=inp.min;}
  if(inp.city&&inp.city!=='모름'&&inp.city!==''){document.getElementById('bCityInput').value=inp.city;document.getElementById('bCity').value=inp.city;}
  if(inp.gender)pickBirthGender(inp.gender);

  window._isMyProfile=true;
  var icon=document.getElementById('myProfileIcon');
  if(icon){icon.style.background='linear-gradient(135deg,#8B6CC1,#A07DD6)';icon.style.border='none';icon.style.boxShadow='0 2px 8px rgba(139,108,193,0.25)';icon.innerHTML='✓';}
  checkBirthReady();
}

// ── "다른 사람 분석하기" 클릭 — 빈 폼 열기 ──
function showBirthForm(){
  var prefillCard=document.getElementById('birthPrefillCard');
  var glassCard=document.querySelector('.birth-glass-card');
  var ctaWrap=document.getElementById('birthCtaWrap');
  if(prefillCard)prefillCard.style.display='none';
  if(glassCard)glassCard.style.display='';
  if(ctaWrap)ctaWrap.style.display='';

  document.getElementById('bName').value='';
  document.getElementById('bYear').value='';
  document.getElementById('bMonthInput').value='';document.getElementById('bMonth').value='';
  document.getElementById('bDayInput').value='';document.getElementById('bDay').value='';
  document.getElementById('bHourInput').value='';document.getElementById('bHour').value='';
  document.getElementById('bMinInput').value='';document.getElementById('bMin').value='';
  document.getElementById('bCityInput').value='';document.getElementById('bCity').value='';
  birthGender='';
  var bm=document.getElementById('bMale');if(bm){bm.style.borderColor='rgba(255,255,255,0.6)';bm.style.background='rgba(255,255,255,0.45)';bm.style.color='#9B8CB8';bm.style.boxShadow='none';}
  var bf=document.getElementById('bFemale');if(bf){bf.style.borderColor='rgba(255,255,255,0.6)';bf.style.background='rgba(255,255,255,0.45)';bf.style.color='#9B8CB8';bf.style.boxShadow='none';}

  window._isMyProfile=false;
  var icon=document.getElementById('myProfileIcon');
  if(icon){icon.style.background='transparent';icon.style.border='1.5px solid #C4B0E8';icon.style.boxShadow='none';icon.innerHTML='';}
  var btn=document.getElementById('myProfileCheck');
  if(btn)btn.style.color='#C4B0E8';
  checkBirthReady();
}

function toggleMyProfile() {
  window._isMyProfile = !window._isMyProfile;
  var icon = document.getElementById('myProfileIcon');
  var btn = document.getElementById('myProfileCheck');
  if (window._isMyProfile) {
    icon.style.background = 'linear-gradient(135deg,#8B6CC1,#A07DD6)';
    icon.style.border = 'none';
    icon.style.boxShadow = '0 2px 8px rgba(139,108,193,0.25)';
    icon.innerHTML = '✓';
    btn.style.color = '#8B6CC1';
  } else {
    icon.style.background = 'transparent';
    icon.style.border = '1.5px solid #C4B0E8';
    icon.style.boxShadow = 'none';
    icon.innerHTML = '';
    btn.style.color = '#C4B0E8';
  }
}

function toggleNoTime() {
  var card = document.getElementById('noTimeCard');
  var area = document.getElementById('timeInputArea');
  var isHidden = area.style.display === 'none';
  if (isHidden) {
    area.style.display = 'block';
    card.style.display = 'none';
  } else {
    area.style.display = 'none';
    card.style.display = 'block';
    document.getElementById('bHourInput').value = '';
    document.getElementById('bHour').value = '';
    document.getElementById('bMinInput').value = '';
    document.getElementById('bMin').value = '';
  }
  checkBirthReady();
}
function setTimeUnknown() { toggleNoTime(); }
function restoreTimeInput() { toggleNoTime(); }

function toggleNoCity() {
  var card = document.getElementById('noCityCard');
  var area = document.getElementById('cityInputArea');
  var isHidden = area.style.display === 'none';
  if (isHidden) {
    area.style.display = 'block';
    card.style.display = 'none';
    document.getElementById('bCityInput').value = '';
    document.getElementById('bCity').value = '';
  } else {
    area.style.display = 'none';
    card.style.display = 'block';
    document.getElementById('bCityInput').value = '모름';
    document.getElementById('bCity').value = '모름';
  }
  checkBirthReady();
}
function setCityUnknown() { toggleNoCity(); }
function restoreCityInput() { toggleNoCity(); }

function goToMBTI(){
  if(window._isLunarInput && typeof lunarToSolar === 'function'){
    var ly = parseInt(document.getElementById('bYear').value);
    var lm = parseInt(document.getElementById('bMonth').value || document.getElementById('bMonthInput').value);
    var ld = parseInt(document.getElementById('bDay').value || document.getElementById('bDayInput').value);
    var leap = document.getElementById('isLeapMonth').value === 'true';
    var solar = lunarToSolar(ly, lm, ld, leap);
    if(!solar){
      if(typeof showToast === 'function') showToast('음력 날짜를 확인해주세요');
      return;
    }
    document.getElementById('bYear').value = solar.year;
    document.getElementById('bMonth').value = solar.month;
    document.getElementById('bMonthInput').value = solar.month;
    document.getElementById('bDay').value = solar.day;
    document.getElementById('bDayInput').value = solar.day;
  }
  mbtiCur=0;
  mbtiCh=[null,null,null,null];
  mbtiIt=[null,null,null,null];
  go('pgMBTI');
  renderMBTI();
}

function renderMBTI(){
  var cur=mbtiCur,d=DM_AX[cur],c=mbtiCh[cur],iv=mbtiIt[cur],ac=DC[cur],bg=DB[cur];
  document.getElementById('mbti-step').textContent='STEP '+(cur+1)+'/4';
  var card=document.getElementById('mbti-card');
  card.style.borderColor=ac+'65';
  card.style.boxShadow='0 2px 12px '+ac+'18,0 0 0 1px '+ac+'20';
  // Progress
  var prog='<div style="flex:1;height:4px;border-radius:2px;background:#5B8FD4"></div>';
  for(var i=0;i<4;i++)prog+='<div style="flex:1;height:4px;border-radius:2px;background:'+(i<=cur?DC[i]:DC[i]+'30')+'"></div>';
  document.getElementById('mbti-progress').innerHTML=prog;
  // Letters
  var ltrs='';for(var i=0;i<4;i++){var lt=mbtiCh[i]===null?"?":(mbtiCh[i]==="L"?DM_AX[i].L:DM_AX[i].R);ltrs+='<div style="width:42px;height:50px;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:900;border-radius:10px;background:'+(i===cur?DC[i]+'20':mbtiCh[i]?DC[i]+'10':'rgba(0,0,0,0.04)')+';border:2.5px solid '+(i===cur?DC[i]:'transparent')+';color:'+(mbtiCh[i]?DC[i]:'var(--text-3)')+'">'+lt+'</div>';}
  document.getElementById('mbti-letters').innerHTML=ltrs;
  // Choices
  var ch='';['L','R'].forEach(function(side){
    var lb=side==='L'?d.Ll:d.Rl,lt=side==='L'?d.L:d.R,ds=side==='L'?d.Ld:d.Rd,sel=c===side;
    var btnBg=sel?'linear-gradient(145deg,'+ac+'18,'+ac+'08)':'rgba(0,0,0,0.02)';
    var btnBdr=sel?'2.5px solid '+ac:'2.5px solid var(--border)';
    var gloss=sel?'<div style="position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0));border-radius:14px 14px 0 0;pointer-events:none"></div>':'';
    var shadow=sel?';box-shadow:0 4px 20px '+ac+'25;position:relative;overflow:hidden':'';
    ch+='<button class="mbti-choice-btn" onclick="pickMBTI(\''+side+'\')" style="flex:1;padding:20px 12px;background:'+btnBg+';border:'+btnBdr+';border-radius:16px;cursor:pointer;text-align:center;color:var(--text-1);font-family:inherit;transition:all .25s'+shadow+'">'+gloss+'<div style="font-size:34px;font-weight:900;color:'+(sel?ac:'var(--text-3)')+';margin-bottom:6px;position:relative">'+lt+'</div><div style="font-size:12.5px;font-weight:700;margin-bottom:4px;color:'+(sel?ac:'var(--text-2)')+';position:relative">'+lb+'</div><div style="font-size:11px;color:var(--text-3);line-height:1.5;position:relative">'+ds+'</div></button>';
  });
  document.getElementById('mbti-choices').innerHTML=ch;
  // Intensity
  var selLetter=c?(c==='L'?d.L:d.R):'?';
  var labelColor=c?ac:'var(--text-3)';
  var ihtml='<p style="font-size:13px;color:var(--text-2);text-align:center;margin-bottom:12px"><strong style="color:'+labelColor+'">'+selLetter+'</strong> 성향의 강도는?</p><div style="display:flex;gap:7px">';
  IN_OP.forEach(function(n){
    var sel=iv===n.v;
    var iBg=sel?'linear-gradient(145deg,'+ac+'20,'+ac+'08)':'rgba(0,0,0,0.02)';
    var iBdr=sel?'2px solid '+ac:'2px solid var(--border)';
    var iGloss=sel?'<div style="position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0));border-radius:9px 9px 0 0;pointer-events:none"></div>':'';
    var iShadow=sel?';box-shadow:0 3px 14px '+ac+'20;position:relative;overflow:hidden':'';
    ihtml+='<button class="mbti-int-btn-dyn" onclick="pickIntensity('+n.v+')" style="flex:1;padding:12px 6px;background:'+iBg+';border:'+iBdr+';border-radius:11px;cursor:pointer;text-align:center;font-family:inherit;transition:all .25s'+iShadow+'">'+iGloss+'<div style="font-size:13px;font-weight:700;color:'+(sel?ac:'var(--text-3)')+';margin-bottom:2px;position:relative">'+n.r+'</div><div style="font-size:10.5px;color:var(--text-3);position:relative">'+n.d+'</div></button>';
  });
  ihtml+='</div>';
  document.getElementById('mbti-intensity').innerHTML=ihtml;
  document.getElementById('mbti-intensity').style.display='block';
  // Next button
  var ok=c!==null&&iv!==null;var btn=document.getElementById('mbti-next-btn');btn.disabled=!ok;btn.style.background=ok?'linear-gradient(135deg,'+ac+','+ac+'cc)':'rgba(0,0,0,0.08)';btn.style.cursor=ok?'pointer':'not-allowed';btn.textContent=cur<3?'다음 →':'🔮 나의 운명 분석 시작';btn.style.color=ok?'#fff':'var(--text-3)';if(ok)btn.style.boxShadow='0 4px 16px '+ac+'30';else btn.style.boxShadow='none';
}
function pickMBTI(s){mbtiCh[mbtiCur]=s;mbtiIt[mbtiCur]=null;renderMBTI();}
function pickIntensity(v){mbtiIt[mbtiCur]=v;renderMBTI();}
function mbtiGoNext(){if(mbtiCh[mbtiCur]===null||mbtiIt[mbtiCur]===null)return;if(mbtiCur<3){mbtiCur++;renderMBTI();}else{var mbtiResult=mbtiCh.map(function(c,i){return c==='L'?DM_AX[i].L:DM_AX[i].R;}).join('');go('pgLoad');startLoadAnim();}}
function mbtiGoBack(){if(mbtiCur>0){mbtiCur--;renderMBTI();}else go('pgBirth');}


// ═══ main-gunghap.js (747L) ═══
// main-gunghap.js — gunghap load animation, analysis execution, result filling
function toggleExtraGh(){
  var items=document.querySelectorAll('.extra-gh');
  var btn=document.getElementById('btnMoreGh');
  if(!items.length) return;
  var show=(items[0].style.display==='none');
  for(var i=0;i<items.length;i++){items[i].style.display=show?'':'none';}
  if(btn) btn.textContent=show?'접기 ∧':'더보기 ∨';
}
function toggleExtraCards(){
  var items=document.querySelectorAll('.extra-card');
  var btn=document.getElementById('btnMoreCards');
  if(!items.length) return;
  var show=(items[0].style.display==='none');
  for(var i=0;i<items.length;i++){items[i].style.display=show?'':'none';}
  if(btn) btn.textContent=show?'접기 ∧':'더보기 ∨';
}
// ===== 궁합 로딩 (pgGhLoad) =====
var ghLoadTimer=null;
// ===== 개인 분석 로딩 (pgLoad) =====
function startLoadAnim(){
  var bar=document.getElementById('load-bar');
  var phase=document.getElementById('load-phase');
  var hintBox=document.getElementById('load-hint-box');
  var logo=document.getElementById('load-logo');
  bar.style.width='0%';hintBox.innerHTML='';
  logo.style.animation='logoPulse 2.5s ease-in-out infinite';
  phase.style.fontWeight='300';phase.style.color='var(--text-2)';
  var m=1;
  var steps=[
    {t:0,act:'phase',text:'사주를 펼칩니다'},
    {t:4*m,act:'bar',pct:8},
    {t:8*m,act:'phase',text:'오행과 MBTI를 읽습니다'},
    {t:12*m,act:'bar',pct:15},
    {t:16*m,act:'phase',text:'MBTS를 엮습니다'},
    {t:20*m,act:'bar',pct:22},
    {t:25*m,act:'hint',text:'1995년 을해년생 · 목(木)의 기운이 감지됩니다'},
    {t:25*m,act:'bar',pct:30},
    {t:28*m,act:'phase',text:'천간과 지지를 읽는 중'},
    {t:33*m,act:'hint',text:'일주: 기묘(己卯) · 부드러운 흙 위에 푸른 나무'},
    {t:33*m,act:'bar',pct:42},
    {t:36*m,act:'phase',text:'두 흐름을 잇는 중'},
    {t:42*m,act:'hint',text:'ENFP의 직관 × 을목의 유연함이 만났습니다'},
    {t:42*m,act:'bar',pct:55},
    {t:50*m,act:'hint',text:'오행 비율: 木 35% · 火 20% · 土 25% · 金 10% · 水 10%'},
    {t:50*m,act:'bar',pct:65},
    {t:53*m,act:'phase',text:'당신만의 언어를 찾는 중'},
    {t:60*m,act:'hint',text:'핵심 키워드: #창의적변화 #감성리더'},
    {t:60*m,act:'bar',pct:78},
    {t:66*m,act:'phase',text:'거의 다 읽었습니다'},
    {t:66*m,act:'bar',pct:88},
    {t:66*m,act:'clearhints'},
    {t:72*m,act:'phase',text:'마지막 한 줄을 적는 중'},
    {t:72*m,act:'bar',pct:95},
    {t:78*m,act:'finish'}
  ];
  if(window._loadTimeouts){window._loadTimeouts.forEach(clearTimeout);}
  window._loadTimeouts=[];
  steps.forEach(function(s){
    var tid=setTimeout(function(){
      if(s.act==='phase'){
        phase.style.opacity='0';phase.style.transform='translateY(-8px)';
        setTimeout(function(){
          phase.innerHTML=s.text+'<span class="load-dots"><span></span><span></span><span></span></span>';
          phase.style.opacity='1';phase.style.transform='translateY(0)';
        },300);
      } else if(s.act==='bar'){bar.style.width=s.pct+'%';}
      else if(s.act==='hint'){
        var h=document.createElement('div');h.className='load-hint';h.textContent=s.text;
        if(hintBox.children.length>=2) hintBox.removeChild(hintBox.firstChild);
        hintBox.appendChild(h);
      } else if(s.act==='clearhints'){
        hintBox.style.opacity='0';
        setTimeout(function(){hintBox.innerHTML='';hintBox.style.opacity='1';},400);
      } else if(s.act==='finish'){
        bar.style.width='100%';
        phase.innerHTML='분석이 완료되었습니다 ✨';
        phase.style.fontWeight='600';phase.style.color='var(--purple)';
        logo.style.animation='loadFinish 1s ease both';
        setTimeout(function(){go('pgRes');},1200);
      }
    },s.t*1000);
    window._loadTimeouts.push(tid);
  });
}

function askDalto(question){
  startChatFromResult();
  setTimeout(function(){
    var input=document.getElementById('chatInput');
    if(input) input.value=question;
  },300);
}

function toggleSajuTerms(){
  var panel=document.getElementById('sajuTermPanel');
  var arrow=document.getElementById('sajuTermArrow');
  var btn=document.getElementById('sajuTermToggle');
  if(!panel.style.maxHeight||panel.style.maxHeight==='0px'||panel.style.maxHeight==='0'){
    panel.style.maxHeight=panel.scrollHeight+'px';
    arrow.style.transform='rotate(180deg)';btn.style.borderColor='var(--purple)';btn.style.color='var(--purple)';
  }else{
    panel.style.maxHeight='0px';
    arrow.style.transform='rotate(0deg)';btn.style.borderColor='';btn.style.color='';
  }
}

function startGhLoad(demo){
  /* 레거시 데모 함수 — ghStart 이벤트리스너가 실제 분석 처리 */
}

// ===== 궁합 결과 초기화 =====
function initGhResult(){
  // 점수 카운트업
  var el=document.getElementById('ghScoreNum');
  if(!el) return;
  var target=82, dur=1200, start=performance.now();
  function update(now){
    var p=Math.min((now-start)/dur,1);
    var eased=1-Math.pow(1-p,3);
    el.textContent=Math.round(target*eased);
    if(p<1) requestAnimationFrame(update);
  }
  setTimeout(function(){requestAnimationFrame(update)},800);

  // 스파클
  var container=document.getElementById('ghSparkles');
  if(container){
    container.innerHTML='';
    var colors=['#D4A853','#D4738B','#8B6CC1','#7BA68C','#5B8FD4','#E8B84B'];
    for(var i=0;i<6;i++){
      var s=document.createElement('div');
      s.className='gh-sparkle';
      var angle=(i/6)*Math.PI*2;
      var r=65+Math.random()*15;
      s.style.left=(80+Math.cos(angle)*r-3)+'px';
      s.style.top=(80+Math.sin(angle)*r-3)+'px';
      s.style.animationDelay=(i*0.3)+'s';
      s.style.animationDuration=(1.5+Math.random())+'s';
      s.style.background=colors[i];
      container.appendChild(s);
    }
  }

  // stagger 애니메이션 리셋
  document.querySelectorAll('.stagger-gh').forEach(function(el){
    el.style.animation='none';el.offsetHeight;
    el.style.animation='';
  });
}

// ===== 달토 채팅 연결 (궁합→채팅) =====
function goChatFromGh(el){
  var msg=el?el.querySelector('.dalto-ex-tx')?.textContent:'';
  // 실제 구현 시: 궁합 데이터를 채팅 context에 주입
  // ST.ghContext = { personA, personB, scores, relation }
  go('pgChat');
  // 프리필 메시지가 있으면 입력창에 넣기
  if(msg){
    var input=document.querySelector('.chat-input');
    if(input) input.value=msg;
  }
}

// ===== 궁합 시작 버튼에 실제 AI 분석 연결 =====
document.addEventListener('DOMContentLoaded', function() {
  var ghStartBtn = document.getElementById('ghStart');
  if (ghStartBtn) ghStartBtn.addEventListener('click', function(){
  if(!ghA || !ghB || !ghRel) return;

  // 클로버 차감 후 궁합 분석 진행
  useClover(15, 'gunghap', function(success) {
    if (!success) return;
    _runGunghapAnalysis();
  });
  });
});

async function _runGunghapAnalysis(){
  _isAnalyzing=true;
  go('pgGhLoad');
  var bar=document.getElementById('ghLoadBar');
  var msg=document.getElementById('ghLoadMsg');
  var hintBox=document.getElementById('ghLoadHintBox');
  var ghLogo=document.getElementById('ghload-logo');
  bar.style.width='0%';
  if(hintBox) hintBox.innerHTML='';
  if(ghLogo) ghLogo.style.animation='logoPulse 2.5s ease-in-out infinite';
  msg.innerHTML='두 사람의 사주를 펼칩니다<span class="load-dots"><span></span><span></span><span></span></span>';
  msg.style.fontWeight='';msg.style.color='';

  // 사주 데이터 준비 (ghA, ghB에 저장된 데이터)
  var sajuA=ghA.saju, dwA=ghA.dw, ggA=ghA.gg, mbtiObjA=ghA.mbtiObj;
  var sajuB=ghB.saju, dwB=ghB.dw, ggB=ghB.gg, mbtiObjB=ghB.mbtiObj;

  if(!sajuA || !sajuB){
    msg.textContent='사주 데이터가 부족합니다. 먼저 사주 분석을 해주세요.';
    _isAnalyzing=false;
    return;
  }
  // dw/gg가 없으면 계산
  if(!ggA&&sajuA)try{ggA=analyzeGyeokguk(sajuA);ghA.gg=ggA;}catch(e){}
  if(!ggB&&sajuB)try{ggB=analyzeGyeokguk(sajuB);ghB.gg=ggB;}catch(e){}
  if(!dwA&&sajuA&&ghA._birthInfo){try{var _bi=ghA._birthInfo;dwA=calcDaewoon(sajuA,+_bi.y,+_bi.m,+_bi.d,_bi.h?+_bi.h:12,_bi.min?+_bi.min:0,ghA.gender==='남성'?'남':'여');ghA.dw=dwA;}catch(e){}}
  if(!dwB&&sajuB&&ghB._birthInfo){try{var _biB=ghB._birthInfo;dwB=calcDaewoon(sajuB,+_biB.y,+_biB.m,+_biB.d,_biB.h?+_biB.h:12,_biB.min?+_biB.min:0,ghB.gender==='남성'?'남':'여');ghB.dw=dwB;}catch(e){}}
  // mbtiObj 기본값
  if(!mbtiObjA)mbtiObjA={type:'INFJ',cf:'Ni-Fe-Ti-Se',axes:[{side:'I',pct:60},{side:'N',pct:60},{side:'F',pct:60},{side:'J',pct:60}]};
  if(!mbtiObjB)mbtiObjB={type:'INFJ',cf:'Ni-Fe-Ti-Se',axes:[{side:'I',pct:60},{side:'N',pct:60},{side:'F',pct:60},{side:'J',pct:60}]};

  // 실제 데이터 기반 로딩 힌트
  var mbtiA=mbtiObjA?mbtiObjA.type:'';
  var mbtiB=mbtiObjB?mbtiObjB.type:'';
  var iljuA=sajuA.P[2].s+sajuA.P[2].b;
  var iljuB=sajuB.P[2].s+sajuB.P[2].b;
  var emojiA=ghA.emoji||'👤';
  var emojiB=ghB.emoji||'👤';
  var nameA=ghA.name||'나';
  var nameB=ghB.name||'상대';

  var ghLoadSteps=[
    {t:0, act:'hint', text:emojiA+' '+nameA+'('+mbtiA+') × '+emojiB+' '+nameB+'('+mbtiB+')'},
    {t:3000, act:'phase', text:'오행의 흐름을 비교합니다'},
    {t:3000, act:'bar', pct:10},
    {t:5000, act:'hint', text:iljuA+'일주 × '+iljuB+'일주 · 두 사주를 겹칩니다'},
    {t:5000, act:'bar', pct:20},
    {t:8000, act:'phase', text:'MBTI 궁합을 읽습니다'},
    {t:8000, act:'bar', pct:30},
    {t:10000, act:'hint', text:mbtiA+'의 에너지 × '+mbtiB+'의 에너지'},
    {t:10000, act:'bar', pct:40},
    {t:13000, act:'phase', text:'두 사람만의 케미를 엮습니다'},
    {t:13000, act:'bar', pct:50}
  ];

  if(window._ghLoadTimeouts) window._ghLoadTimeouts.forEach(clearTimeout);
  window._ghLoadTimeouts=[];

  ghLoadSteps.forEach(function(s){
    var tid=setTimeout(function(){
      if(s.act==='phase'){
        msg.style.opacity='0';msg.style.transform='translateY(-8px)';
        setTimeout(function(){
          msg.innerHTML=s.text+'<span class="load-dots"><span></span><span></span><span></span></span>';
          msg.style.opacity='1';msg.style.transform='translateY(0)';
        },300);
      } else if(s.act==='bar'){
        bar.style.width=s.pct+'%';
      } else if(s.act==='hint'){
        if(!hintBox) return;
        var h=document.createElement('div');
        h.className='load-hint';
        h.textContent=s.text;
        if(hintBox.children.length>=2) hintBox.removeChild(hintBox.firstChild);
        hintBox.appendChild(h);
      }
    },s.t);
    window._ghLoadTimeouts.push(tid);
  });

  // 궁합 엔진 호출 (로컬 — 렌더링용)
  var ghResult = analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB);
  if(window.GH_CATEGORIES && window.GH_CATEGORIES[ghRel]){
    var cat=window.GH_CATEGORIES[ghRel];
    var w=cat.scoreWeights;
    ghResult.scores.total=Math.round(
      ghResult.scores.love*w.love + ghResult.scores.comm*w.comm +
      ghResult.scores.values*w.values + ghResult.scores.work*w.work
    );
  }

  try{
    // ── 중복 요청 방지 ──
    if (localStorage.getItem('mbts_active_job')) {
      try {
        var _ej2 = JSON.parse(localStorage.getItem('mbts_active_job'));
        if (Date.now() - _ej2.createdAt < 120000) {
          if (typeof showToast === 'function') showToast('분석이 이미 진행 중이에요 ⏳');
          return;
        }
      } catch(e) {}
      localStorage.removeItem('mbts_active_job');
    }

    // ── 서버에 raw 입력 전송 (프롬프트 아님) ──
    var _ghBirthA = ghA._birthInfo || {};
    var _ghBirthB = ghB._birthInfo || {};
    // Bug 4 fix: mbtiType whitelist — '사주분석' bypasses '|| INFJ' fallback
    var _VALID_MBTI = ['INFP','ENFP','INFJ','ENFJ','INTP','ENTP','INTJ','ENTJ','ISFP','ESFP','ISFJ','ESFJ','ISTP','ESTP','ISTJ','ESTJ'];
    var _mbtiTypeA = (mbtiObjA && _VALID_MBTI.indexOf(mbtiObjA.type) !== -1) ? mbtiObjA.type : 'INFJ';
    var _mbtiTypeB = (mbtiObjB && _VALID_MBTI.indexOf(mbtiObjB.type) !== -1) ? mbtiObjB.type : 'INFJ';
    var _ghParamsA = {
      y: _ghBirthA.y, m: _ghBirthA.m, d: _ghBirthA.d,
      h: _ghBirthA.h, min: _ghBirthA.min,
      gender: ghA.gender || '여성',
      mbtiType: _mbtiTypeA,
      mbtiAxes: (mbtiObjA && mbtiObjA.axes) || null
    };
    var _ghParamsB = {
      y: _ghBirthB.y, m: _ghBirthB.m, d: _ghBirthB.d,
      h: _ghBirthB.h, min: _ghBirthB.min,
      gender: ghB.gender || '남성',
      mbtiType: _mbtiTypeB,
      mbtiAxes: (mbtiObjB && mbtiObjB.axes) || null
    };

    var _ghResp = await fetch('/api/gunghap-v2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paramsA: _ghParamsA,
        paramsB: _ghParamsB,
        relType: ghRel
      })
    });
    var _ghData = await _ghResp.json();
    if (!_ghData.jobId) throw new Error(_ghData.error || 'job 생성 실패');

    var _ghJobId = _ghData.jobId;
    localStorage.setItem('mbts_active_job', JSON.stringify({
      jobId: _ghJobId, type: 'gunghap', createdAt: Date.now(), input: { relType: ghRel }
    }));
    console.log('[MBTS] 궁합 job 생성 완료:', _ghJobId);

    // ── polling ──
    msg.innerHTML = '궁합을 분석하고 있어요<span class="load-dots"><span></span><span></span><span></span></span>';
    var _ghPollStart = Date.now();
    var _ghMsgs = ['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...','오행 보완 관계를 읽습니다...','인지기능 궁합 탐색...','연애 케미를 계산합니다...','갈등 패턴을 분석합니다...','장기 전망을 그립니다...','두 사람의 이야기를 쓰고 있습니다...'];

    var _ghLastProgress = 0;
    var _ghHardDeadline = Date.now() + 900000; // M12: 15-min hard cap
    var _ghUidQs = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) ? ('&userId=' + encodeURIComponent(mbtsSession.userId)) : '';
    var aiText = await new Promise(function(resolve, reject) {
      var _ghTimer = setInterval(async function() {
        var elapsed = Date.now() - _ghPollStart;

        var msgIdx = Math.min(Math.floor(elapsed / 8000), _ghMsgs.length - 1);
        msg.innerHTML = _ghMsgs[msgIdx] + '<span class="load-dots"><span></span><span></span><span></span></span>';
        var fakePct = Math.min(90, Math.floor(elapsed / 1000) * 1.5);
        bar.style.width = Math.max(fakePct, 5) + '%';

        if (Date.now() > _ghHardDeadline) {
          clearInterval(_ghTimer);
          localStorage.removeItem('mbts_active_job');
          reject(new Error('분석 시간 초과 (15분 한도)'));
          return;
        }
        if (elapsed > 300000) {
          clearInterval(_ghTimer);
          localStorage.removeItem('mbts_active_job');
          reject(new Error('분석 시간 초과'));
          return;
        }

        try {
          var res = await fetch('/api/job-status?id=' + _ghJobId + _ghUidQs);
          var data = await res.json();

          // progress advanced = server alive, reset timeout
          if (typeof data.progress === 'number' && data.progress > _ghLastProgress) {
            _ghLastProgress = data.progress;
            _ghPollStart = Date.now();
          }

          if (data.status === 'done' && data.result && data.result.text) {
            clearInterval(_ghTimer);
            localStorage.removeItem('mbts_active_job');
            resolve(data.result.text);
          } else if (data.status === 'failed') {
            clearInterval(_ghTimer);
            localStorage.removeItem('mbts_active_job');
            reject(new Error(data.error || '분석 실패'));
          } else if (data.status === 'partial') {
            clearInterval(_ghTimer);
            localStorage.removeItem('mbts_active_job');
            // partial fallback: try to use incomplete text if any
            if (data.result && data.result.text) {
              resolve(data.result.text);
            } else {
              reject(new Error('분석이 불완전하게 끝났습니다'));
            }
          }
        } catch(e) {
          console.warn('[MBTS] 궁합 polling 에러:', e);
        }
      }, 3000);
    });

    var aiResult=null;
    try{aiResult=JSON.parse(aiText);}catch(e){
      // 2차: { ~ } 추출
      var fb=aiText.indexOf('{'),lb=aiText.lastIndexOf('}');
      if(fb>=0&&lb>fb)try{aiResult=JSON.parse(aiText.substring(fb,lb+1));}catch(e2){}
      // 3차: 줄 단위
      if(!aiResult){
        var lines=aiText.split('\n'),si=-1,ei=-1;
        for(var li=0;li<lines.length;li++){
          if(si<0&&lines[li].trim().charAt(0)==='{')si=li;
          if(lines[li].trim().charAt(0)==='}'||lines[li].trim().slice(-1)==='}')ei=li;
        }
        if(si>=0&&ei>=si)try{aiResult=JSON.parse(lines.slice(si,ei+1).join('\n'));}catch(e3){}
      }
      // 4차: 제어문자 제거
      if(!aiResult){
        var sanitized=aiText.substring(fb>=0?fb:0,(lb>0?lb+1:aiText.length));
        sanitized=sanitized.replace(/[\x00-\x1F\x7F]/g,function(c){return c==='\n'||c==='\r'||c==='\t'?c:'';});
        try{aiResult=JSON.parse(sanitized);}catch(e4){}
      }
      // 5차: 괄호 복구
      if(!aiResult){
        var repaired=aiText.substring(fb>=0?fb:0);
        var oB=(repaired.match(/{/g)||[]).length,cB=(repaired.match(/}/g)||[]).length;
        var oA=(repaired.match(/\[/g)||[]).length,cA=(repaired.match(/\]/g)||[]).length;
        while(cA<oA){repaired+=']';cA++;}
        while(cB<oB){repaired+='}';cB++;}
        repaired=repaired.replace(/,\s*([}\]])/g,'$1');
        try{aiResult=JSON.parse(repaired);console.log('[GH] 5차 괄호 복구 성공');}catch(e5){}
      }
      // 5.5차: sub 경계 자르기 (스택 기반 괄호 닫기)
      if(!aiResult){
        var rawT=aiText.substring(fb>=0?fb:0);
        var lastQB=rawT.lastIndexOf('"}');
        if(lastQB>0){
          var trunc=rawT.substring(0,lastQB+2);
          var _stk=[];
          for(var _si=0;_si<trunc.length;_si++){
            var _ch=trunc[_si];
            if(_ch==='{'||_ch==='[')_stk.push(_ch);
            else if(_ch==='}'&&_stk.length&&_stk[_stk.length-1]==='{')_stk.pop();
            else if(_ch===']'&&_stk.length&&_stk[_stk.length-1]==='[')_stk.pop();
          }
          for(var _sj=_stk.length-1;_sj>=0;_sj--)trunc+=(_stk[_sj]==='{'?'}':']');
          trunc=trunc.replace(/,\s*([}\]])/g,'$1');
          try{aiResult=JSON.parse(trunc);console.log('[GH] 5.5차 sub경계 자르기 성공');}catch(e55){}
        }
      }
      if(aiResult)console.log('[GH] JSON 폴백 파서 성공');
    }

    _isAnalyzing=false;

    if (_ixGhProgInited) {
      // 프로그레시브 모드 → finalize
      if (typeof finalizeGhProgressivePage === 'function') {
        finalizeGhProgressivePage(aiResult, ghResult, sajuA, sajuB, mbtiObjA, mbtiObjB, ggA, ggB, ghRel, _ixGhCollectedSubs);
      }
    } else {
      // 프로그레시브 미진입 → 기존 한방 렌더
      bar.style.width='100%';
      msg.innerHTML='궁합 분석이 완료되었습니다 ✨';
      msg.style.fontWeight='600';
      msg.style.color='var(--rose)';
      if(ghLogo) ghLogo.style.animation='loadFinish 1s ease both';
      if(hintBox) hintBox.style.opacity='0';
      if(window._ghLoadTimeouts) window._ghLoadTimeouts.forEach(clearTimeout);
      await new Promise(function(resolve){setTimeout(resolve,1200);});
      go('pgGhRes');
      fillGhResultProgressive(ghResult,aiResult,sajuA,sajuB,mbtiObjA,mbtiObjB,ghRel);
    }

    // 궁합 결과 localStorage 저장
    if(!window._skipGhHistorySave) try {
      var ghRec = {
        id: String(Date.now()) + String(Math.random()).slice(2,6),
        date: new Date().toISOString().slice(0,10).replace(/-/g,'.'),
        relType: ghRel,
        relLabel: (window.GH_CATEGORIES && window.GH_CATEGORIES[ghRel]) ? window.GH_CATEGORIES[ghRel].label : '궁합',
        personA: {
          name: ghA.name, emoji: ghA.emoji, tag: ghA.tag,
          saju: sajuA, mbti: mbtiObjA ? mbtiObjA.type : '', mbtiObj: mbtiObjA,
          ilju: sajuA.P[2].s + sajuA.P[2].b + '일주'
        },
        personB: {
          name: ghB.name, emoji: ghB.emoji, tag: ghB.tag,
          saju: sajuB, mbti: mbtiObjB ? mbtiObjB.type : '', mbtiObj: mbtiObjB,
          ilju: sajuB.P[2].s + sajuB.P[2].b + '일주'
        },
        scores: ghResult.scores,
        aiResult: aiResult,
        ghResult: ghResult
      };
      var ghHist = [];
      try { ghHist = JSON.parse(localStorage.getItem('mbts_gh_history')) || []; } catch(e4) {}
      ghHist.push(ghRec);
      localStorage.setItem('mbts_gh_history', JSON.stringify(ghHist));
    } catch(e3) { console.warn('[MBTS] 궁합 저장 실패:', e3); }
    window._skipGhHistorySave = false;
  }catch(err){
    _isAnalyzing=false;
    msg.textContent='분석 중 오류: '+err.message;
    console.error('[MBTS] 궁합 AI 분석 오류:',err);
  }
}

// ===== 새 사람 직접 입력 (블러+카드 모달) =====
var addedPersonCount=0;
var apGender='';
var apMbtiCur=0;
var apMbtiCh=[null,null,null,null];
var apMbtiIt=[null,null,null,null];

// 드롭다운 데이터
var AP_HOURS=['모름','자시 (23~01)','축시 (01~03)','인시 (03~05)','묘시 (05~07)','진시 (07~09)','사시 (09~11)','오시 (11~13)','미시 (13~15)','신시 (15~17)','유시 (17~19)','술시 (19~21)','해시 (21~23)'];
var AP_CITIES=['모름','서울','부산','대구','인천','광주','대전','울산','세종','제주'];

function openAddPersonModal(){
  document.getElementById('addPersonModal').classList.add('show');
  document.getElementById('apCard1').style.display='block';
  document.getElementById('apCard2').style.display='none';
  document.getElementById('apName').value='';
  document.getElementById('apYearInput').value='';
  document.getElementById('apMonthInput').value='';
  document.getElementById('apDayInput').value='';
  document.getElementById('apHourInput').value='';
  if(document.getElementById('apMinInput')) document.getElementById('apMinInput').value='';
  document.getElementById('apCityInput').value='';
  apGender='';
  document.querySelectorAll('.ap-b-gender').forEach(b=>b.classList.remove('active'));
  document.getElementById('apNext1').classList.remove('ready');
  // 드롭다운 초기화
  initApDropdowns();
}

function initApDropdowns(){
  // 년
  var yh='';for(var y=2010;y>=1940;y--)yh+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'year\','+y+')">'+y+'년</div>';
  document.getElementById('apDropYear').innerHTML=yh;
  // 월
  var mh='';for(var m=1;m<=12;m++)mh+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'month\','+m+')">'+m+'월</div>';
  document.getElementById('apDropMonth').innerHTML=mh;
  // 일
  var dh='';for(var d=1;d<=31;d++)dh+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'day\','+d+')">'+d+'일</div>';
  document.getElementById('apDropDay').innerHTML=dh;
  // 시 (0~23)
  var hh='<div class="ap-b-drop-item" onclick="apSelectDrop(\'hour\',\'\')">모름</div>';
  for(var hi=0;hi<=23;hi++){
    hh+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'hour\',\''+hi+'\')">'+hi+'시</div>';
  }
  document.getElementById('apDropHour').innerHTML=hh;
  // 분 (0~59, 5분 단위)
  var minh='<div class="ap-b-drop-item" onclick="apSelectDrop(\'apmin\',\'\')">모름</div>';
  for(var mi=0;mi<=59;mi+=5){
    minh+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'apmin\',\''+mi+'\')">'+mi+'분</div>';
  }
  var apMinDrop=document.getElementById('apDropMin');
  if(apMinDrop) apMinDrop.innerHTML=minh;
  // 출생지 (전체 CITIES 사용)
  var ch='';CITIES.forEach(function(c){ch+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'city\',\''+c+'\')">'+c+'</div>';});
  document.getElementById('apDropCity').innerHTML=ch;
}

function onApComboInput(type){
  if(type==='hour'){
    var hv=document.getElementById('apHourInput').value;
    if(hv!==''&&(parseInt(hv)<0||parseInt(hv)>23)) document.getElementById('apHourInput').value='';
  }else if(type==='min'){
    var mv=document.getElementById('apMinInput').value;
    if(mv!==''&&(parseInt(mv)<0||parseInt(mv)>59)) document.getElementById('apMinInput').value='';
  }else if(type==='city'){
    var cv=document.getElementById('apCityInput').value.trim();
    if(cv.length>0){
      var filtered=CITIES.filter(function(c){return c!=='모름'&&c.indexOf(cv)===0;});
      if(filtered.length>0){
        var drop=document.getElementById('apDropCity');
        var html='';
        filtered.forEach(function(c){
          html+='<div class="ap-b-drop-item" onclick="apSelectDrop(\'city\',\''+c+'\')">'+c+'</div>';
        });
        drop.innerHTML=html;
        drop.classList.add('show');
      }else{
        document.getElementById('apDropCity').classList.remove('show');
      }
    }else{
      document.getElementById('apDropCity').classList.remove('show');
    }
  }
  checkApCard1();
}

function toggleApDrop(type){
  var dropMap={year:'apDropYear',month:'apDropMonth',day:'apDropDay',hour:'apDropHour',apmin:'apDropMin',city:'apDropCity'};
  var dropId=dropMap[type]||('apDrop'+type.charAt(0).toUpperCase()+type.slice(1));
  var drop=document.getElementById(dropId);
  var isOpen=drop.classList.contains('show');
  // 다른 드롭다운 닫기
  document.querySelectorAll('.ap-b-dropdown').forEach(d=>d.classList.remove('show'));
  document.querySelectorAll('.ap-b-arrow').forEach(a=>a.classList.remove('open'));
  if(!isOpen){
    drop.classList.add('show');
    drop.previousElementSibling?.querySelector('.ap-b-arrow')?.classList.add('open');
    // 현재 선택값 하이라이트
    var inputMap={year:'apYearInput',month:'apMonthInput',day:'apDayInput',hour:'apHourInput',apmin:'apMinInput',city:'apCityInput'};
    var inp=document.getElementById(inputMap[type]);
    if(inp){
      var curVal=inp.value.trim();
      drop.querySelectorAll('.ap-b-drop-item').forEach(function(item){
        item.classList.remove('selected');
        var itemText=item.textContent.replace(/[년월일시분]/g,'').trim();
        if(curVal&&itemText===curVal) item.classList.add('selected');
      });
    }
  }
}

function apSelectDrop(type,val){
  var inputMap={year:'apYearInput',month:'apMonthInput',day:'apDayInput',hour:'apHourInput',apmin:'apMinInput',city:'apCityInput'};
  var input=document.getElementById(inputMap[type]);
  if(!input) return;
  if(type==='hour'&&(val===''||val==='모름')) input.value='';
  else if(type==='apmin'&&(val===''||val==='모름')) input.value='';
  else if(type==='city'&&(val==='모름'||val==='')) input.value='';
  else input.value=val;
  document.querySelectorAll('.ap-b-dropdown').forEach(d=>d.classList.remove('show'));
  document.querySelectorAll('.ap-b-arrow').forEach(a=>a.classList.remove('open'));
  checkApCard1();
}

function closeAddPerson(){
  document.getElementById('addPersonModal').classList.remove('show');
  document.querySelectorAll('.ap-b-dropdown').forEach(d=>d.classList.remove('show'));
}

function pickApG(el,g){
  apGender=g;
  document.querySelectorAll('.ap-b-gender').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  checkApCard1();
}

function checkApCard1(){
  var name=document.getElementById('apName').value.trim();
  var y=document.getElementById('apYearInput').value.trim();
  var m=document.getElementById('apMonthInput').value.trim();
  var d=document.getElementById('apDayInput').value.trim();
  var ok=name&&y&&m&&d&&apGender;
  document.getElementById('apNext1').classList.toggle('ready',!!ok);
}

function goApCard2(){
  if(!document.getElementById('apNext1').classList.contains('ready'))return;
  document.getElementById('apCard1').style.display='none';
  document.getElementById('apCard2').style.display='block';
  apMbtiCur=0;apMbtiCh=[null,null,null,null];apMbtiIt=[null,null,null,null];
  renderApMbti();
}

function renderApMbti(){
  var cur=apMbtiCur,d=DM_AX[cur],c=apMbtiCh[cur],iv=apMbtiIt[cur],ac=DC[cur];
  var h='';
  h+='<div class="ap-mbti-step">STEP '+(cur+1)+'/4</div>';
  h+='<div class="ap-mbti-q">어느 쪽에 가깝나요?</div>';
  // Choices
  h+='<div class="ap-mbti-opts">';
  ['L','R'].forEach(function(side){
    var lt=side==='L'?d.L:d.R,lb=side==='L'?d.Ll:d.Rl,ds=side==='L'?d.Ld:d.Rd;
    var sel=c===side;
    var bg=sel?'background:linear-gradient(145deg,'+ac+'15,'+ac+'08);border-color:'+ac:'';
    var sh=sel?';box-shadow:0 4px 20px '+ac+'25':'';
    h+='<button class="ap-mbti-opt-btn'+(sel?' sel':'')+'" style="'+bg+sh+'" onclick="apPickMbti(\''+side+'\')">';
    h+='<div class="lt" style="color:'+(sel?ac:'var(--text-3)')+'">'+lt+'</div>';
    h+='<div class="lb" style="color:'+(sel?ac:'var(--text-2)')+'">'+lb+'</div>';
    h+='<div class="ds">'+ds+'</div></button>';
  });
  h+='</div>';
  // Intensity
  var selLt=c?(c==='L'?d.L:d.R):'?';
  h+='<div class="ap-mbti-int-label"><strong style="color:'+ac+'">'+selLt+'</strong> 성향의 강도는?</div>';
  h+='<div class="ap-mbti-ints">';
  IN_OP.forEach(function(n){
    var sel=iv===n.v;
    var bg=sel?'background:linear-gradient(145deg,'+ac+'18,'+ac+'08);border-color:'+ac:'';
    var sh=sel?';box-shadow:0 3px 14px '+ac+'20':'';
    h+='<button class="ap-mbti-int'+(sel?' sel':'')+'" style="'+bg+sh+'" onclick="apPickInt('+n.v+')">';
    h+='<div class="ir" style="color:'+(sel?ac:'var(--text-3)')+'">'+n.r+'</div>';
    h+='<div class="id">'+n.d+'</div></button>';
  });
  h+='</div>';
  // Next
  var ok=c!==null&&iv!==null;
  var btnTxt=cur<3?'다음':'추가 완료';
  var btnBg=ok?'background:linear-gradient(135deg,'+ac+','+ac+'cc);':'';
  h+='<button class="ap-mbti-next'+(ok?' ok':'')+'" style="'+btnBg+'" onclick="apMbtiNext()">'+btnTxt+'</button>';
  document.getElementById('apMbtiContent').innerHTML=h;
}

function apPickMbti(s){apMbtiCh[apMbtiCur]=s;apMbtiIt[apMbtiCur]=null;renderApMbti();}
function apPickInt(v){apMbtiIt[apMbtiCur]=v;renderApMbti();}

function apMbtiNext(){
  if(apMbtiCh[apMbtiCur]===null||apMbtiIt[apMbtiCur]===null)return;
  if(apMbtiCur<3){apMbtiCur++;renderApMbti();}
  else{
    var result=apMbtiCh.map(function(c,i){return c==='L'?DM_AX[i].L:DM_AX[i].R;}).join('');
    finishAddPerson(result);
  }
}

function apSkipMbti(){finishAddPerson('사주분석');}

function finishAddPerson(mbtiStr){
  var name=document.getElementById('apName').value.trim();
  var y=document.getElementById('apYearInput').value.trim();
  var m=document.getElementById('apMonthInput').value.trim();
  var d=document.getElementById('apDayInput').value.trim();
  var hRaw=document.getElementById('apHourInput')?document.getElementById('apHourInput').value.trim():'';
  var minRaw=document.getElementById('apMinInput')?document.getElementById('apMinInput').value.trim():'';
  var cityRaw=document.getElementById('apCityInput')?document.getElementById('apCityInput').value.trim():'';
  var gStr=apGender==='M'?'남':'여';
  var mbtiDisplay=mbtiStr==='사주분석'?'🔮사주만':mbtiStr;
  var sub=y+'.'+String(m).padStart(2,'0')+'.'+String(d).padStart(2,'0')+' · '+gStr+' · '+mbtiDisplay;

  // 사주 데이터 계산
  var extraData=null;
  if(typeof calcSajuForApp==='function'){
    try{
      var bH=hRaw!==''?parseInt(hRaw):null;
      var bMin=minRaw!==''?parseInt(minRaw):null;
      var cityLngVal=typeof getCityLng==='function'&&cityRaw?getCityLng(cityRaw):null;
      var sajuB=calcSajuForApp(parseInt(y),parseInt(m),parseInt(d),bH,bMin,cityLngVal);
      var ggB=typeof analyzeGyeokguk==='function'?analyzeGyeokguk(sajuB):null;
      var dwB=typeof calcDaewoon==='function'?calcDaewoon(sajuB,parseInt(y),parseInt(m),parseInt(d),bH||12,bMin||0,gStr):null;
      var mbtiB=null;
      if(mbtiStr!=='사주분석'&&typeof TY!=='undefined'){
        var tiB=TY[mbtiStr]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};
        mbtiB={type:mbtiStr,cf:tiB.cf,axes:[{side:mbtiStr[0],pct:60},{side:mbtiStr[1],pct:60},{side:mbtiStr[2],pct:60},{side:mbtiStr[3],pct:60}],profile:''};
      }
      // Bug 4 fix: include _birthInfo so gunghap-v2 receives valid y/m/d
      extraData={saju:sajuB,dw:dwB,gg:ggB,mbtiObj:mbtiB,_birthInfo:{y:parseInt(y),m:parseInt(m),d:parseInt(d),h:bH,min:bMin,city:cityRaw}};
    }catch(e){console.warn('[MBTS] 새 사람 사주 계산 실패:',e);}
  }

  var emojis=['🌟','💫','⭐','🌙','☀️','🪐','✨','🌸'];
  var emoji=emojis[addedPersonCount%emojis.length];
  addedPersonCount++;

  var list=document.querySelector('.gh-people-list');
  var card=document.createElement('div');
  card.className='mini-person';
  card.onclick=function(){pickPerson(card,emoji,name,'#새로입력 · '+mbtiStr,extraData)};
  card.innerHTML='<div class="mini-emoji">'+emoji+'</div>'
    +'<div class="mini-info"><div class="mini-name">'+name+' <span class="new-badge">NEW</span></div>'
    +'<div class="mini-sub">'+sub+'</div></div>';
  list.appendChild(card);

  closeAddPerson();
  pickPerson(card,emoji,name,'#새로입력 · '+mbtiStr,extraData);
}


// ═══ main-results.js (2588L) ═══
// main-results.js — result rendering, analysis, showToast, job recovery
// ====================================================================
// MBTS Bridge: engine.js ↔ 파이널 UI
// ====================================================================

// ── 데모 사람 사주 자동 계산 ──
function getDemoData(y,m,d,gender,mbtiStr){
  try{
    var saju=calcSajuForApp(y,m,d,null,null,null);
    var gg=analyzeGyeokguk(saju);
    var gStr=(gender==='남'||gender==='남성')?'남':'여';
    var dw=calcDaewoon(saju,y,m,d,12,0,gStr);
    var ti=TY[mbtiStr]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};
    var mbtiObj={type:mbtiStr,cf:ti.cf,axes:[
      {side:mbtiStr[0],pct:65},{side:mbtiStr[1],pct:65},
      {side:mbtiStr[2],pct:65},{side:mbtiStr[3],pct:65}
    ],profile:''};
    return {saju:saju,dw:dw,gg:gg,mbtiObj:mbtiObj};
  }catch(e){console.warn('[MBTS] 데모 사주 계산 실패:',e);return null;}
}

// ── 궁합 결과를 pgGhRes 기존 디자인에 채워넣기 ──
function fillGhResult(ghResult, aiResult, sajuA, sajuB, mbtiObjA, mbtiObjB, relType){
  // 프로그레시브 렌더러가 있으면 그쪽으로 위임
  if(typeof fillGhResultProgressive==='function'){
    return fillGhResultProgressive(ghResult,aiResult,sajuA,sajuB,mbtiObjA,mbtiObjB,relType);
  }
  var scores=ghResult.scores;
  var cat=(window.GH_CATEGORIES&&window.GH_CATEGORIES[relType])||
    {emoji:'💕',label:'궁합',scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'성장'}};
  var sl=cat.scoreLabels||{love:'연애',comm:'소통',values:'가치관',work:'성장'};

  // 관계별 히어로 그라데이션
  var heroGrads={
    ssom:'linear-gradient(135deg,#D4738B,#E8A0B4)',
    lover:'linear-gradient(135deg,#C05875,#D4738B)',
    family:'linear-gradient(135deg,#7BA68C,#A8D5BA)',
    colleague:'linear-gradient(135deg,#5B8FD4,#92B8E8)',
    friend:'linear-gradient(135deg,#D4A853,#E8CB82)'
  };

  // 1. 히어로 카드
  var heroCard=document.getElementById('ghHeroCard');
  if(heroCard) heroCard.style.background=heroGrads[relType]||heroGrads.ssom;

  var heroBadge=document.getElementById('ghHeroBadge');
  if(heroBadge) heroBadge.textContent=cat.emoji+' '+cat.label+' 궁합';

  var heroEmojiA=document.getElementById('ghHeroEmojiA');
  var heroNameA=document.getElementById('ghHeroNameA');
  var heroSubA=document.getElementById('ghHeroSubA');
  if(heroEmojiA&&ghA) heroEmojiA.textContent=ghA.emoji||'👤';
  if(heroNameA&&ghA) heroNameA.textContent=ghA.name||'나';
  if(heroSubA) heroSubA.textContent=(mbtiObjA?mbtiObjA.type:'')+' · '+sajuA.P[2].s+sajuA.P[2].b+'일주';

  var heroEmojiB=document.getElementById('ghHeroEmojiB');
  var heroNameB=document.getElementById('ghHeroNameB');
  var heroSubB=document.getElementById('ghHeroSubB');
  if(heroEmojiB&&ghB) heroEmojiB.textContent=ghB.emoji||'👤';
  if(heroNameB&&ghB) heroNameB.textContent=ghB.name||'상대방';
  if(heroSubB) heroSubB.textContent=(mbtiObjB?mbtiObjB.type:'')+' · '+sajuB.P[2].s+sajuB.P[2].b+'일주';

  var heroTitle=document.getElementById('ghHeroTitle');
  if(heroTitle){
    if(aiResult&&aiResult.title) heroTitle.innerHTML=aiResult.title;
    else heroTitle.textContent=sajuA.P[2].s+sajuA.P[2].b+' × '+sajuB.P[2].s+sajuB.P[2].b;
  }

  var heroDesc=document.getElementById('ghHeroDesc');
  if(heroDesc&&aiResult&&aiResult.quote) heroDesc.textContent='"'+aiResult.quote+'"';

  // 2. 스코어 링 카운트업
  var scoreNum=document.getElementById('ghScoreNum');
  if(scoreNum){
    var target=scores.total||0;
    var dur=1200,start=performance.now();
    function animScore(now){
      var p=Math.min((now-start)/dur,1);
      var eased=1-Math.pow(1-p,3);
      scoreNum.textContent=Math.round(target*eased);
      if(p<1) requestAnimationFrame(animScore);
    }
    requestAnimationFrame(animScore);
  }

  // 3. SVG 링
  var ring=document.querySelector('.gh-score-ring');
  if(ring){
    var offset=314-(314*(scores.total||0)/100);
    ring.style.setProperty('--target-offset',offset);
  }

  // 4. 스코어 코멘트
  var comment=document.getElementById('ghScoreComment');
  if(comment&&aiResult&&aiResult.quote) comment.textContent='"'+aiResult.quote+'"';

  // 5. 카테고리 바 (4개)
  var barColors=[
    'linear-gradient(90deg,#D4738B,#E8A0B4)',
    'linear-gradient(90deg,#7BA68C,#A8D5BA)',
    'linear-gradient(90deg,#D4A853,#E8CB82)',
    'linear-gradient(90deg,#5B8FD4,#92B8E8)'
  ];
  var catRows=document.querySelectorAll('.gh-cat-row');
  var scoreData=[
    {label:sl.love||'연애',value:scores.love,ic:'❤️'},
    {label:sl.comm||'소통',value:scores.comm,ic:'💬'},
    {label:sl.values||'가치관',value:scores.values,ic:'🧭'},
    {label:sl.work||'성장',value:scores.work,ic:'⚡'}
  ];
  catRows.forEach(function(row,i){
    if(!scoreData[i]) return;
    var lb=row.querySelector('.gh-cat-lb');
    var vl=row.querySelector('.gh-cat-vl');
    var fill=row.querySelector('.gh-cat-fill');
    var ic=row.querySelector('.gh-cat-ic');
    if(lb) lb.textContent=scoreData[i].label;
    if(vl) vl.textContent=scoreData[i].value;
    if(fill){fill.style.setProperty('--target',scoreData[i].value+'%');fill.style.background=barColors[i];}
    if(ic) ic.textContent=scoreData[i].ic;
  });

  // 6. 케미 키워드
  var chemTags=document.getElementById('ghChemTags');
  if(chemTags){
    var kws=(aiResult&&aiResult.keywords)?aiResult.keywords:(ghResult.keywords||[]);
    if(kws.length>0){
      var tagH='';
      kws.forEach(function(kw){
        var cls='gh-chem-tag';
        if(kw.indexOf('주의')>=0||kw.indexOf('조심')>=0||kw.indexOf('충')>=0) cls+=' warn';
        else if(kw.indexOf('상생')>=0||kw.indexOf('좋')>=0||kw.indexOf('합')>=0) cls+=' good';
        tagH+='<span class="'+cls+'">#'+kw.replace(/#/g,'')+'</span>';
      });
      chemTags.innerHTML=tagH;
    }
  }

  // 7. 스티키 탭 + AI 분석 섹션
  var navInner=document.getElementById('ghCatNavInner');
  var analSections=document.getElementById('ghAnalSections');
  var sectionIcons=['❤️','💬','🧭','⚡'];
  var sectionLabels=[sl.love||'연애',sl.comm||'소통',sl.values||'가치관',sl.work||'성장'];

  if(aiResult&&aiResult.categories&&navInner&&analSections){
    var navH='';
    aiResult.categories.forEach(function(c,ci){
      var icon=c.icon||sectionIcons[ci%4];
      var title=c.title?c.title.split('·')[0].replace(/[0-9]/g,'').trim():sectionLabels[ci%4];
      if(title.length>4) title=title.substring(0,4);
      navH+='<div class="gh-cat-pill'+(ci===0?' active':'')+'" onclick="scrollToGhSec('+ci+')" data-sec="'+ci+'">';
      navH+=icon+' '+title+'</div>';
    });
    navInner.innerHTML=navH;

    var secH='';
    aiResult.categories.forEach(function(c,ci){
      secH+='<div class="gh-cat-sec" id="ghSec'+ci+'">';
      secH+='<div class="gh-sec-head">';
      secH+='<div class="gh-sec-num">0'+(ci+1)+'</div>';
      secH+='<div class="gh-sec-title-row">';
      secH+='<span class="gh-sec-icon">'+(c.icon||sectionIcons[ci%4])+'</span>';
      secH+='<span class="gh-sec-title">'+(c.title||sectionLabels[ci%4])+'</span>';
      secH+='</div>';
      if(c.items&&c.items[0]&&c.items[0].catch){
        secH+='<div class="gh-sec-sub">'+c.items[0].catch+'</div>';
      }
      secH+='</div>';

      if(c.items){
        c.items.forEach(function(item){
          secH+='<div class="gh-sub">';
          if(item.catch) secH+='<div class="gh-sub-h">'+item.catch+'</div>';
          if(item.content){
            secH+='<div class="gh-sub-b">'+item.content.replace(/\n\n/g,'</p><p>').replace(/^/,'<p>').replace(/$/,'</p>')+'</div>';
          }
          if(item.insightText){
            secH+='<div class="gh-tip">';
            secH+=(item.insightIcon||'💡')+' '+item.insightText;
            secH+='</div>';
          }
          secH+='</div>';
        });
      }
      secH+='</div>';
    });
    analSections.innerHTML=secH;
  } else if(navInner){
    navInner.innerHTML='';
    if(analSections) analSections.innerHTML='';
  }

  // 8. YOUR RELATIONSHIP IN ONE LINE
  var onelineText=document.getElementById('ghOnelineText');
  if(onelineText){
    if(aiResult&&aiResult.quote) onelineText.innerHTML=aiResult.quote;
    else onelineText.textContent=sajuA.P[2].s+sajuA.P[2].b+'과 '+sajuB.P[2].s+sajuB.P[2].b+'의 만남';
  }

  // 9. 달토 CTA 질문 동적 업데이트
  var daltoExamples=document.querySelectorAll('.dalto-ex-tx');
  if(daltoExamples.length>=3&&mbtiObjA&&mbtiObjB){
    daltoExamples[0].textContent=mbtiObjB.type+'한테 고백하려면 어떻게?';
    daltoExamples[1].textContent=(ghA?ghA.name:'나')+'와 '+(ghB?ghB.name:'상대')+'의 연애 공략법';
    daltoExamples[2].textContent=sajuB.P[2].s+sajuB.P[2].b+'일주가 좋아하는 데이트 스타일은?';
  }

  // 10. 스파클
  var container=document.getElementById('ghSparkles');
  if(container){
    container.innerHTML='';
    var colors=['#D4A853','#D4738B','#8B6CC1','#7BA68C','#5B8FD4','#E8B84B'];
    for(var i=0;i<6;i++){
      var s=document.createElement('div');
      s.className='gh-sparkle';
      var angle=(i/6)*Math.PI*2;
      var r=65+Math.random()*15;
      s.style.left=(80+Math.cos(angle)*r-3)+'px';
      s.style.top=(80+Math.sin(angle)*r-3)+'px';
      s.style.animationDelay=(i*0.3)+'s';
      s.style.animationDuration=(1.5+Math.random())+'s';
      s.style.background=colors[i];
      container.appendChild(s);
    }
  }

  // 11. stagger 애니메이션 리셋
  document.querySelectorAll('.stagger-gh').forEach(function(el){
    el.style.animation='none';el.offsetHeight;
    el.style.animation='';
  });

  // 12. 스크롤 옵저버 초기화
  setTimeout(function(){initGhScrollObserver();},500);
}

// ── 궁합 실시간 스트리밍 렌더 (Phase 5) ──
function initGhStreamPage(ghR, sajuA, sajuB, mbtiA, mbtiB, relType) {
  var el = document.getElementById('ghResContent');
  if (!el) return;
  var cat = (window.GH_CATEGORIES && window.GH_CATEGORIES[relType]) ||
    {emoji:'💕', label:'궁합', scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'성장'}};
  var sl = cat.scoreLabels || {love:'연애',comm:'소통',values:'가치관',work:'성장'};
  var sc = ghR.scores || {total:0,love:0,comm:0,values:0,work:0};
  var ilA = (sajuA && sajuA.P && sajuA.P[2]) ? sajuA.P[2].s + sajuA.P[2].b : '';
  var ilB = (sajuB && sajuB.P && sajuB.P[2]) ? sajuB.P[2].s + sajuB.P[2].b : '';
  var mA = (mbtiA && mbtiA.type) ? mbtiA.type : '';
  var mB = (mbtiB && mbtiB.type) ? mbtiB.type : '';
  var h = '';
  h += '<div style="padding:16px 20px 0"><button onclick="history.back()" style="background:none;border:none;font-size:15px;color:var(--purple);cursor:pointer;padding:4px 0;font-family:inherit;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:18px">←</span> 뒤로</button></div>';
  h += '<div style="text-align:center;padding:16px 20px 16px">';
  h += '<div style="display:flex;justify-content:center;gap:0;margin-bottom:8px">';
  h += '<span style="font-weight:800;font-size:24px;color:#4CAF7D">M</span>';
  h += '<span style="font-weight:800;font-size:24px;color:#5B8FD4">B</span>';
  h += '<span style="font-weight:800;font-size:24px;color:#E05A5A">T</span>';
  h += '<span style="font-weight:800;font-size:24px;color:#E8B84B">S</span>';
  h += '</div>';
  h += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:6px">' + cat.emoji + ' ' + cat.label + ' 궁합</div>';
  h += '<h1 id="ghStreamTitle" style="font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:0">' + ilA + ' × ' + ilB + ' · ' + mA + ' × ' + mB + '</h1>';
  h += '</div>';
  h += '<div class="glass-card" style="margin:12px 20px;padding:20px;text-align:center">';
  h += '<div style="font-size:44px;font-weight:900;color:var(--accent)">' + sc.total + '<span style="font-size:22px">점</span></div>';
  h += '<div style="font-size:12px;color:var(--text-muted);margin-bottom:16px">' + cat.label + ' 종합</div>';
  [{l:sl.love,v:sc.love,c:'#d63384'},{l:sl.comm,v:sc.comm,c:'#2e8b57'},{l:sl.values,v:sc.values,c:'#c99a2e'},{l:sl.work,v:sc.work,c:'#4682b4'}].forEach(function(b){
    h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">';
    h += '<div style="width:44px;text-align:right;font-size:12px;font-weight:600;color:var(--text-secondary)">' + b.l + '</div>';
    h += '<div style="flex:1;height:8px;background:rgba(0,0,0,0.05);border-radius:4px;overflow:hidden"><div style="height:100%;width:' + b.v + '%;background:' + b.c + ';border-radius:4px;transition:width 1s"></div></div>';
    h += '<div style="width:32px;font-size:12px;font-weight:700;color:var(--text-muted)">' + b.v + '</div>';
    h += '</div>';
  });
  h += '</div>';
  h += '<div id="ghStreamQuote" class="glass-card" style="margin:12px 20px;padding:14px 18px;border-left:4px solid var(--accent);font-size:13px;color:var(--text-secondary);line-height:1.6;font-style:italic">분석 중...</div>';
  h += '<div id="ghStreamSubs" style="padding:0 20px"></div>';
  h += '<div id="ghStreamFooter"></div>';
  el.innerHTML = h;
  el.scrollTop = 0;
}

function appendGhStreamSub(sub, index) {
  var container = document.getElementById('ghStreamSubs');
  if (!container) return;
  var card = document.createElement('div');
  card.className = 'glass-card';
  card.style.cssText = 'padding:20px;margin-bottom:12px;opacity:0;transform:translateY(16px);transition:all 0.4s ease';
  var bodyHtml = '';
  if (sub.b && Array.isArray(sub.b)) {
    sub.b.forEach(function(line) {
      if (typeof renderSubBody === 'function') {
        bodyHtml += renderSubBody([line]);
      } else {
        var isTip = (line.charAt(0) === '\uD83D' || line.charAt(0) === '\u2728' || line.indexOf('\uD83D\uDCA1') === 0);
        if (isTip) {
          bodyHtml += '<div style="margin-top:10px;padding:10px 12px;background:rgba(139,108,193,0.06);border-radius:10px;border:1px solid rgba(139,108,193,0.12);font-size:13px;color:#88619A;line-height:1.5">' + line + '</div>';
        } else {
          bodyHtml += '<p style="font-size:14px;color:var(--text-secondary);line-height:1.7;margin-bottom:8px;word-break:keep-all">' + line.replace(/\n/g, '<br>') + '</p>';
        }
      }
    });
  }
  card.innerHTML = '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span style="font-size:20px">\u2728</span><span style="font-size:15px;font-weight:700;color:var(--text-primary)">' + (sub.h || '') + '</span></div>' + bodyHtml;
  container.appendChild(card);
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
  card.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function finalizeGhStream(aiResult) {
  if (aiResult && aiResult.title) {
    var titleEl = document.getElementById('ghStreamTitle');
    if (titleEl) titleEl.textContent = aiResult.title;
  }
  if (aiResult && aiResult.quote) {
    var quoteEl = document.getElementById('ghStreamQuote');
    if (quoteEl) quoteEl.textContent = '"' + aiResult.quote + '"';
  }
  var footer = document.getElementById('ghStreamFooter');
  if (footer) {
    var h = '';
    if (aiResult && aiResult.oneLine) {
      h += '<div style="margin:20px 20px 0;padding:20px;text-align:center;background:linear-gradient(135deg,rgba(139,108,193,0.06),rgba(212,115,139,0.06));border-radius:16px">';
      h += '<div style="font-size:10px;color:var(--text-muted);letter-spacing:2px;margin-bottom:8px">YOUR RELATIONSHIP IN ONE LINE</div>';
      h += '<div style="font-size:16px;font-weight:700;color:var(--text-primary);line-height:1.5">' + aiResult.oneLine + '</div>';
      h += '</div>';
    }
    h += '<div style="padding:24px 20px"><button onclick="shareResult()" style="width:100%;padding:14px;font-size:14px;font-weight:700;color:#191919;background:#FEE500;border:none;border-radius:14px;margin-bottom:10px">\uD83D\uDCAC 공유하기</button>';
    h += '<p style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-muted)">참고용 분석이며 의사결정을 대체하지 않습니다.</p></div>';
    footer.innerHTML = h;
  }
}

function fillGhResultProgressive(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,relType){
  tipColorIndex=0;
  var el=document.getElementById('ghResContent');
  if(!el)return fillGhResult(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,relType);
  var cat=(window.GH_CATEGORIES&&window.GH_CATEGORIES[relType])||{label:'궁합',emoji:'💕',scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'업무'}};
  var sl=cat.scoreLabels||{love:'연애',comm:'소통',values:'가치관',work:'업무'};
  var sc=ghR.scores;
  var title=(aiR&&aiR.title)?aiR.title:(sajuA.P[2].s+sajuA.P[2].b+'×'+sajuB.P[2].s+sajuB.P[2].b);
  var quote=(aiR&&aiR.quote)?aiR.quote:'두 사람만의 이야기';

  // ① 헤더 + 점수 (통일 헬퍼)
  var h='<div class="res-wrap">';
  h+='<div style="padding:16px 16px 0"><button onclick="history.back()" style="background:none;border:none;font-size:15px;color:var(--purple);cursor:pointer;padding:4px 0;font-family:inherit;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:18px">←</span> 뒤로</button></div>';
  h+=_buildGhHeader(sajuA, sajuB, mbtiA, mbtiB, null, null, relType, sc);

  // ③ Quote
  if(quote){
    h+='<div class="r-sub prog-sub-card" style="padding:16px 20px;border-left:3px solid var(--purple);font-size:14px;color:var(--text-2);line-height:1.7;font-style:italic">"'+quote+'"</div>';
  }

  // ④ Sub 컨테이너 + 스켈레톤
  h+='<div id="gh-prog-sub-container"></div>';
  h+='<div id="gh-prog-skeleton" class="r-sub prog-sub-card" style="text-align:center;padding:20px;color:var(--text-3);font-size:13px"><span class="load-dots"><span></span><span></span><span></span></span> 풀이를 펼치는 중</div>';

  // ⑤ CTA (숨김 — 완료 후 표시)
  h+='<div id="gh-prog-cta" style="display:none;padding:20px">';
  h+='<button onclick="go(\'pgDash\')" class="r-cta-btn" style="background:rgba(232,69,60,.1);color:#E8453C">💕 새 궁합 보기</button>';
  h+='<button onclick="shareResult()" class="r-cta-btn" style="background:#FEE500;color:#191919">💬 카카오 공유</button>';
  h+='<p style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-3)">본 풀이는 참고용 분석이며, 개인의 의사결정을 대체하지 않습니다.</p>';
  h+='</div>';

  h+='</div>';
  el.innerHTML=h;

  // 점수 카드와 quote에 revealed 애니메이션
  setTimeout(function(){
    var cards=el.querySelectorAll('.prog-sub-card');
    for(var i=0;i<cards.length;i++) cards[i].classList.add('revealed');
  },100);

  // ⑥ Sub 의사 프로그레시브 — 200ms 간격으로 추가
  if(aiR&&aiR.categories){
    var container=document.getElementById('gh-prog-sub-container');
    var allSubs=[];
    var ghCatMap={};
    var catIdx=0;
    aiR.categories.forEach(function(c){
      var catName=c.n||c.title||'';
      ghCatMap[allSubs.length]=catName;
      var subs=c.subs||c.items||[];
      subs.forEach(function(sub){
        allSubs.push(sub);
      });
      catIdx++;
    });

    var subIdx=0;
    var ghProgTimer=setInterval(function(){
      if(subIdx>=allSubs.length){
        clearInterval(ghProgTimer);
        // 스켈레톤 제거 + CTA 표시
        var skel=document.getElementById('gh-prog-skeleton');
        if(skel)skel.style.display='none';
        var cta=document.getElementById('gh-prog-cta');
        if(cta)cta.style.display='block';
        return;
      }

      // 카테고리 구분자
      if(typeof ghCatMap[subIdx]!=='undefined'){
        var catDiv=document.createElement('div');
        catDiv.className='r-cat-head prog-sub-card';
        catDiv.innerHTML='<div class="r-cat-title-row"><span class="r-cat-title">'+ghCatMap[subIdx]+'</span></div>';
        container.appendChild(catDiv);
        setTimeout(function(){catDiv.classList.add('revealed');},50);
      }

      // Sub 카드 (appendSubCard 패턴 재사용)
      var sub=allSubs[subIdx];
      var subH=sub.h||sub.catch||'';
      var subB=sub.b||(sub.content?(sub.content+(sub.insightText?('\n\n'+(sub.insightIcon||'💊')+' '+sub.insightText):'')):'');
      var bodyHtml=(typeof renderSubBody==='function')?renderSubBody(subB):subB.replace(/\n\n/g,'<br><br>');

      var card=document.createElement('div');
      card.className='r-sub prog-sub-card';
      card.innerHTML='<div class="r-sub-h">'+subH+'</div><div class="r-sub-b">'+bodyHtml+'</div>';
      container.appendChild(card);
      setTimeout(function(){card.classList.add('revealed');},50);

      // 스켈레톤을 항상 마지막으로
      var skel=document.getElementById('gh-prog-skeleton');
      if(skel)container.parentNode.insertBefore(skel,container.nextSibling);

      subIdx++;
    },200);
  } else {
    // AI 실패 시
    var skel=document.getElementById('gh-prog-skeleton');
    if(skel)skel.innerHTML='<p style="color:var(--text-3)">AI 풀이 생성 실패</p>';
  }
}

// ===== 궁합 탭 스크롤 함수 =====
function scrollToGhSec(idx){
  var sec=document.getElementById('ghSec'+idx);
  if(sec){
    sec.scrollIntoView({behavior:'smooth',block:'start'});
    document.querySelectorAll('#ghCatNavInner .gh-cat-pill').forEach(function(p,i){
      p.classList.toggle('active',i===idx);
    });
  }
}

var ghScrollObserver=null;
function initGhScrollObserver(){
  if(ghScrollObserver) ghScrollObserver.disconnect();
  var pills=document.querySelectorAll('#ghCatNavInner .gh-cat-pill');
  if(pills.length===0) return;

  ghScrollObserver=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var id=entry.target.id;
        var idx=parseInt(id.replace('ghSec',''));
        pills.forEach(function(p,i){
          p.classList.toggle('active',i===idx);
        });
      }
    });
  },{threshold:0.3});

  document.querySelectorAll('[id^="ghSec"]').forEach(function(sec){
    ghScrollObserver.observe(sec);
  });
}

// ── go() 확장: 페이지별 초기화 훅 ──
var _originalGo=go;
go=function(id,skipPush){
  _originalGo(id,skipPush);
  if(id==='pgChat')initChatPage();
};

var _profileMBTI = ['E','N','F','P'];
var _profMbtiCur = 0;
var _profMbtiCh = [null,null,null,null];
var _profMbtiIt = [null,null,null,null];
var _profCalType = 'solar';
var _profTimeUnknown = false;
var _profCityUnknown = false;

function toggleProfileMBTI(idx) {
  var pairs = [['E','I'],['N','S'],['F','T'],['P','J']];
  _profileMBTI[idx] = (_profileMBTI[idx] === pairs[idx][0]) ? pairs[idx][1] : pairs[idx][0];
  var el = document.getElementById('profileMBTI' + idx);
  if (el) {
    el.textContent = _profileMBTI[idx];
    el.style.transform = 'scale(0.85)';
    setTimeout(function() { el.style.transform = 'scale(1)'; }, 150);
  }
}

var MBTSUser = {
  load: async function() {
    if (typeof supabase === 'undefined' || !mbtsSession || !mbtsSession.userId) return;
    if (window._lastSaju) return;
    try {
      var res = await supabase.from('users').select('mbti,animal_key,ilju,birth_year,birth_month,birth_day,birth_hour,birth_min,gender').eq('id', mbtsSession.userId).single();
      if (res.error || !res.data || !res.data.animal_key) return;
      var d = res.data;
      window._lastMBTI = d.mbti || '';
      if (!window._lastAIResult) window._lastAIResult = {};
      var parts = d.animal_key.split('_');
      window._lastAIResult.animal = { oheng: parts[0], dominant_sipsung: parts[1], condition: parts[2] || '신강' };
      console.log('[MBTSUser] 서버에서 복원:', d.ilju, d.mbti, d.animal_key);
    } catch(e) { console.warn('[MBTSUser] 로드 실패:', e); }
  },

  loadHistory: async function() {
    if (typeof supabase === 'undefined' || !mbtsSession || !mbtsSession.userId) return;
    try {
      var sajuRes = await supabase.from('saju_results')
        .select('full_record, created_at')
        .eq('user_id', mbtsSession.userId)
        .not('full_record', 'is', null)
        .order('created_at', { ascending: true });
      var ghRes = await supabase.from('gunghap_results')
        .select('full_record, created_at')
        .eq('user_id', mbtsSession.userId)
        .not('full_record', 'is', null)
        .order('created_at', { ascending: true });
      if (sajuRes.data && sajuRes.data.length > 0) {
        var localHist = [];
        try { localHist = JSON.parse(localStorage.getItem('mbts_history') || '[]'); } catch(e) {}
        var localIds = {};
        for (var i = 0; i < localHist.length; i++) { if (localHist[i].id) localIds[localHist[i].id] = true; }
        var added = 0;
        for (var j = 0; j < sajuRes.data.length; j++) {
          try {
            var rec = typeof sajuRes.data[j].full_record === 'string' ? JSON.parse(sajuRes.data[j].full_record) : sajuRes.data[j].full_record;
            if (rec && rec.id && !localIds[rec.id]) { localHist.push(rec); localIds[rec.id] = true; added++; }
          } catch(e2) {}
        }
        if (added > 0) {
          localStorage.setItem('mbts_history', JSON.stringify(localHist));
          console.log('[MBTSUser] 사주 히스토리 ' + added + '건 동기화 완료');
        }
      }
      if (ghRes.data && ghRes.data.length > 0) {
        var localGh = [];
        try { localGh = JSON.parse(localStorage.getItem('mbts_gh_history') || '[]'); } catch(e) {}
        var ghIds = {};
        for (var k = 0; k < localGh.length; k++) { if (localGh[k].id) ghIds[localGh[k].id] = true; }
        var ghAdded = 0;
        for (var l = 0; l < ghRes.data.length; l++) {
          try {
            var ghRec = typeof ghRes.data[l].full_record === 'string' ? JSON.parse(ghRes.data[l].full_record) : ghRes.data[l].full_record;
            if (ghRec && ghRec.id && !ghIds[ghRec.id]) { localGh.push(ghRec); ghIds[ghRec.id] = true; ghAdded++; }
          } catch(e3) {}
        }
        if (ghAdded > 0) {
          localStorage.setItem('mbts_gh_history', JSON.stringify(localGh));
          console.log('[MBTSUser] 궁합 히스토리 ' + ghAdded + '건 동기화 완료');
        }
      }
      if (!window._lastSaju) {
        var hist = [];
        try { hist = JSON.parse(localStorage.getItem('mbts_history') || '[]'); } catch(e) {}
        var myRec = null;
        for (var m = hist.length - 1; m >= 0; m--) { if (hist[m].isMyProfile) { myRec = hist[m]; break; } }
        if (!myRec && hist.length > 0) myRec = hist[hist.length - 1];
        if (myRec && myRec.saju) {
          window._lastSaju = myRec.saju;
          window._lastDW = myRec.dw || null;
          window._lastGG = myRec.gg || null;
          window._lastMBTI = myRec.mbti || '';
          window._lastMBTIObj = myRec.mbtiObj || null;
          window._lastAIResult = myRec.aiResult || null;
          window._lastIsAI = myRec.isAI || false;
          console.log('[MBTSUser] 마지막 분석 결과 복원 완료');
        }
      }
    } catch(e) {
      console.warn('[MBTSUser] 히스토리 동기화 실패:', e);
    }
  },

  sync: function() {
    if (typeof supabase === 'undefined' || !mbtsSession || !mbtsSession.userId || !window._lastSaju) return;
    var s = window._lastSaju;
    var a = (window._lastAIResult && window._lastAIResult.animal) ? window._lastAIResult.animal : {};
    if (!a.oheng) return;
    supabase.from('users').update({
      mbti: window._lastMBTI || '',
      birth_year: parseInt(ST.y) || null,
      birth_month: parseInt(ST.m) || null,
      birth_day: parseInt(ST.d) || null,
      birth_hour: ST.h ? parseInt(ST.h) : null,
      birth_min: ST.min ? parseInt(ST.min) : null,
      gender: ST.gender || '',
      animal_key: a.oheng + '_' + a.dominant_sipsung + '_' + a.condition,
      ilju: s.P[2].s + s.P[2].b
    }).eq('id', mbtsSession.userId).then(function(r) {
      if (r.error) console.warn('[MBTSUser] 동기화 실패:', r.error.message);
      else console.log('[MBTSUser] 프로필 동기화 완료');
    });
  }
};

var MBTSShare = {
  generateCode: function() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    var code = '';
    for (var i = 0; i < 8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  },

  save: async function(type, renderData, preview) {
    var code = MBTSShare.generateCode();
    var url = 'https://mbts.kr?s=' + code;
    try {
      if (typeof supabase !== 'undefined' && supabase && supabase.from) {
        var nickname = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '';
        await supabase.from('shared_results').insert({
          share_code: code,
          result_type: type,
          render_data: renderData,
          nickname: nickname,
          mbti: preview.mbti || '',
          animal_emoji: preview.emoji || '',
          animal_title: preview.title || '',
          animal_desc: preview.desc || '',
          share_image_url: preview.image || '',
          ai_result: {},
          saju_summary: {},
          animal_traits: [],
          animal_rx: '',
          animal_tag: '',
          animal_key: '',
          oheng: ''
        });
        console.log('[MBTS] 공유 저장 완료:', type, code);
      }
    } catch(e) {
      console.warn('[MBTS] 공유 저장 실패:', e);
      url = 'https://mbts.kr';
    }
    return { code: code, url: url };
  },

  load: async function(code) {
    if (typeof supabase === 'undefined' || !supabase || !supabase.from) return null;
    var res = await supabase.from('shared_results').select('*').eq('share_code', code).single();
    if (res.error || !res.data) return null;
    return res.data;
  },

  render: function(data) {
    var type = data.result_type || 'premium';
    var r = data.render_data;

    if (!r && data.ai_result && Object.keys(data.ai_result).length > 0) {
      r = { aiResult: data.ai_result, saju: data.saju_summary, mbti: data.mbti };
      type = 'premium';
    }
    if (!r) return false;

    window._isSharedView = true;
    window._skipHistorySave = true;

    if (type === 'premium') {
      window._lastAIResult = r.aiResult;
      window._lastSaju = r.saju;
      window._lastMBTI = r.mbti;
      window._lastIsAI = true;
      renderResult(r.aiResult, r.saju, r.mbti, null, true);
      go('pgRes');
    } else if (type === 'free') {
      var animal = getAnimalResult(r.oheng, r.dominantSS, r.condition);
      if (animal && typeof svcRenderResult === 'function') {
        var pg = document.getElementById('pgAnimal');
        if (!pg) { pg = document.getElementById('pgRes'); }
        svcRenderResult(pg, animal, r.mbti, r.saju, r.gg, r.oheng, r.condition, r.userName || '');
        go(pg.id);
      } else if (r.aiResult) {
        renderResult(r.aiResult, r.saju, r.mbti, null, false);
        go('pgRes');
      }
    } else if (type === 'gunghap') {
      if (typeof renderGunghapResultV2 === 'function') {
        renderGunghapResultV2(r.ghR, r.aiR, r.sajuA, r.sajuB, r.mbtiA, r.mbtiB, r.ggA, r.ggB, '', r.relType);
        goPage('gh-res');
      }
    }

    window._skipHistorySave = false;
    return true;
  },

  insertCTA: function(nickname) {
    setTimeout(function() {
      var targetPg = document.querySelector('.page[style*="flex"]') || document.getElementById('pgRes');
      if (!targetPg || !window._isSharedView) return;
      var ctaTop = document.createElement('div');
      ctaTop.style.cssText = 'padding:16px 20px;text-align:center;background:#F8F0FF';
      ctaTop.innerHTML = '<div style="font-size:13px;color:#888;margin-bottom:8px">' + (nickname || '친구') + '님의 분석 결과</div><a href="https://mbts.kr" style="display:inline-block;padding:14px 32px;background:#8B6CC1;color:#fff;border-radius:14px;font-size:15px;font-weight:700;text-decoration:none;box-shadow:0 4px 15px rgba(139,108,193,0.3)">✨ 나도 MBTS 분석해보기</a>';
      targetPg.insertBefore(ctaTop, targetPg.firstChild);
      var ctaBottom = document.createElement('div');
      ctaBottom.style.cssText = 'padding:24px 20px 48px;text-align:center;background:linear-gradient(180deg,#fff 0%,#F8F0FF 100%)';
      ctaBottom.innerHTML = '<div style="font-size:15px;color:#666;margin-bottom:14px">나는 어떤 동물일까? 🤔</div><a href="https://mbts.kr" style="display:inline-block;padding:16px 40px;background:#8B6CC1;color:#fff;border-radius:14px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 4px 15px rgba(139,108,193,0.3)">✨ 나도 MBTS 분석해보기</a><div style="margin-top:12px;font-size:12px;color:#aaa">사주 × MBTI × AI 운명 분석</div>';
      targetPg.appendChild(ctaBottom);
    }, 500);
  },

  sendKakao: function(url, preview) {
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: preview.title || 'MBTS 분석 결과',
            description: preview.desc || 'MBTS — 세상에 같은 풀이는 없습니다.',
            imageUrl: preview.image || 'https://mbts.kr/animals/FiLiS.png',
            imageWidth: 800, imageHeight: 600,
            link: { mobileWebUrl: url, webUrl: url }
          },
          buttons: [{ title: '🔮 나도 운명 확인하기', link: { mobileWebUrl: url, webUrl: url } }]
        });
        return true;
      } catch(e) { console.warn('[MBTS] 카카오 공유 실패:', e); }
    }
    return false;
  },

  fallbackShare: function(url, preview) {
    var title = preview.title || 'MBTS 분석 결과';
    var desc = preview.desc || '';
    if (navigator.share) {
      navigator.share({ title: title, text: desc + '\n\n나의 운명도 확인해보세요 👉\n' + url, url: url }).catch(function(){});
      return;
    }
    var text = title + '\n' + desc + '\n\n' + url;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() { showToast('📋 공유 텍스트가 복사되었어요!'); });
    } else {
      var ta = document.createElement('textarea'); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
      showToast('📋 공유 텍스트가 복사되었어요!');
    }
  }
};

function generateShareCode() { return MBTSShare.generateCode(); }

// ── 전역 상태 (renderResult 등에서 참조) ──
var ST={y:"",m:"",d:"",h:"",min:"",gender:"",city:"",cityLng:0,ch:[null,null,null,null],it:[null,null,null,null],cur:0};

var _isAnalyzing=false;

var TITLE_OVERRIDE = {
  'LinkedIn 프로필이 무서운 독수리': '스펙 갑인데 본인은 쫄보인 독수리'
};
window.addEventListener('beforeunload',function(e){
  if(_isAnalyzing){e.preventDefault();e.returnValue='';return '';}
});

// ── 도시 경도 조회 ──
function getCityLng(name){
  if(typeof CITY_DATA==='undefined')return 0;
  var c=CITY_DATA.filter(function(cc){return cc.name===name;})[0];
  return c?c.lng:0;
}

// ====================================================================
// mbtiGoNext 오버라이드 — 실제 분석 연결
// ====================================================================
function mbtiGoNext(){
  if(_isAnalyzing){console.log('⚠️ 분석 진행 중 — 중복 실행 방지');return;}
  console.log('🔍[1] mbtiGoNext 진입, mbtiCur='+mbtiCur);
  if(mbtiCh[mbtiCur]===null||mbtiIt[mbtiCur]===null){console.log('❌ 선택값 null → return');return;}
  if(mbtiCur<3){mbtiCur++;renderMBTI();return;}
  console.log('🔍[2] STEP4 완료, 데이터 수집 시작');
  console.log('🔍[3] bYear='+document.getElementById('bYear').value);
  console.log('🔍[4] bMonth='+document.getElementById('bMonth').value+'|'+document.getElementById('bMonthInput').value);
  console.log('🔍[5] bDay='+document.getElementById('bDay').value+'|'+document.getElementById('bDayInput').value);
  console.log('🔍[6] gender='+birthGender);
  console.log('🔍[7] runSajuAnalysis='+typeof runSajuAnalysis);
  console.log('🔍[8] startRealAnalysis='+typeof startRealAnalysis);

  // 입력값 수집
  var y=document.getElementById('bYear').value;
  var m=document.getElementById('bMonth').value||document.getElementById('bMonthInput').value;
  var d=document.getElementById('bDay').value||document.getElementById('bDayInput').value;
  var h=document.getElementById('bHour')?document.getElementById('bHour').value:'';
  var min=document.getElementById('bMin')?document.getElementById('bMin').value:'';
  var city=document.getElementById('bCity')?document.getElementById('bCity').value:'';
  if(!city) city=document.getElementById('bCityInput')?document.getElementById('bCityInput').value:'';
  var cityLng=getCityLng(city);

  // ST 채우기
  var nameVal=document.getElementById('bName')?document.getElementById('bName').value.trim():'';
  ST.name=nameVal||'나';
  ST.y=y;ST.m=m;ST.d=d;ST.h=h;ST.min=min;
  ST.gender=birthGender;ST.city=city;ST.cityLng=cityLng;
  ST.ch=mbtiCh.slice();ST.it=mbtiIt.slice();

  // API 키
  var apiKey='server-managed';

  var _analysisParams={
    y:parseInt(y),m:parseInt(m),d:parseInt(d),
    h:h?parseInt(h):'',min:min?parseInt(min):'',
    cityLng:cityLng,gender:birthGender,city:city,
    mbtiChoices:mbtiCh.slice(),
    mbtiIntensities:mbtiIt.slice(),
    apiKey:apiKey
  };

  // Bug 1 fix: 동기 lock — 모바일 touchend+click 이중 발화 race 방지
  _isAnalyzing = true;
  // 클로버 차감 후 분석 진행
  useClover(15, 'saju', function(success) {
    if (!success) { _isAnalyzing = false; return; }
    console.log('🔍[9] go(pgLoad) 호출 직전');
    go('pgLoad');
    console.log('🔍[10] go(pgLoad) 성공, startRealAnalysis 호출');
    startRealAnalysis(_analysisParams);
    console.log('🔍[11] startRealAnalysis 호출 완료');
  });
}

// ====================================================================
// 실제 분석 실행 (pgLoad UI 업데이트 + runSajuAnalysis)
// ====================================================================
function startRealAnalysis(params){
  console.log('[MBTS] startRealAnalysis 진입 (서버 분석 v2)');
  _isAnalyzing = true;
  var bar = document.getElementById('load-bar');
  var phase = document.getElementById('load-phase');
  var hintBox = document.getElementById('load-hint-box');
  var logo = document.getElementById('load-logo');
  bar.style.width = '0%'; if(hintBox) hintBox.innerHTML = '';
  logo.style.animation = 'logoPulse 2.5s ease-in-out infinite';
  phase.style.fontWeight = '300'; phase.style.color = 'var(--text-2)';

  /* ── UI 헬퍼 ── */
  function setPhase(text) {
    phase.style.opacity = '0'; phase.style.transform = 'translateY(-8px)';
    setTimeout(function() {
      phase.innerHTML = text + '<span class="load-dots"><span></span><span></span><span></span></span>';
      phase.style.opacity = '1'; phase.style.transform = 'translateY(0)';
    }, 200);
  }
  function addHint(text) {
    if(!hintBox) return;
    var h = document.createElement('div'); h.className = 'load-hint'; h.textContent = text;
    if(hintBox.children.length >= 2) hintBox.removeChild(hintBox.firstChild);
    hintBox.appendChild(h);
  }
  function clearHints() {
    if(!hintBox) return;
    hintBox.style.opacity = '0';
    setTimeout(function(){ hintBox.innerHTML = ''; hintBox.style.opacity = '1'; }, 400);
  }

  /* ── 시퀀스 타이머 ── */
  if(window._loadTimers){ window._loadTimers.forEach(clearTimeout); }
  window._loadTimers = [];
  var seq = [
    {t:0,     fn:function(){ setPhase('사주를 펼칩니다'); }},
    {t:8000,  fn:function(){ setPhase('오행과 MBTI를 읽습니다'); }},
    {t:16000, fn:function(){ setPhase('MBTS를 엮습니다'); }},
    {t:25000, fn:function(){ addHint('사주의 기운이 감지됩니다'); }},
    {t:28000, fn:function(){ setPhase('천간과 지지를 읽는 중'); }},
    {t:33000, fn:function(){ addHint('천간과 지지의 흐름을 분석합니다'); }},
    {t:36000, fn:function(){ setPhase('두 흐름을 잇는 중'); }},
    {t:42000, fn:function(){ addHint('당신의 MBTI 에너지를 읽습니다'); }},
    {t:50000, fn:function(){ addHint('오행 균형과 신살을 계산합니다'); }},
    {t:53000, fn:function(){ setPhase('당신만의 언어를 찾는 중'); }},
    {t:60000, fn:function(){ addHint('핵심 키워드를 조합합니다'); }},
    {t:66000, fn:function(){ setPhase('거의 다 읽었습니다'); clearHints(); }},
    {t:72000, fn:function(){ setPhase('마지막 한 줄을 적는 중'); }}
  ];
  seq.forEach(function(s) {
    window._loadTimers.push(setTimeout(s.fn, s.t));
  });

  /* ── 중복 요청 방지 (M10 강화) ── */
  if (window._MBTS_activePollTimer) {
    try { clearInterval(window._MBTS_activePollTimer); } catch(e) {}
    window._MBTS_activePollTimer = null;
  }
  if (localStorage.getItem('mbts_active_job')) {
    try {
      var _ej = JSON.parse(localStorage.getItem('mbts_active_job'));
      if (Date.now() - _ej.createdAt < 330000) {
        if (typeof showToast === 'function') showToast('분석이 이미 진행 중이에요 ⏳');
        _isAnalyzing = false;
        if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
        return;
      }
    } catch(e) {}
    localStorage.removeItem('mbts_active_job');
  }

  /* ── 서버에 raw 입력 전송 (프롬프트가 아닌 생년월일+MBTI) ── */
  fetch('/api/analyze-v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      y: params.y, m: params.m, d: params.d,
      h: params.h, min: params.min,
      gender: params.gender,
      mbtiChoices: params.mbtiChoices,
      mbtiIntensities: params.mbtiIntensities,
      cityLng: params.cityLng
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (!data.jobId) {
      throw new Error(data.error || 'job 생성 실패');
    }

    // cached result — instant render, no polling needed
    if (data.cached && data.status === 'done' && data.result && data.result.text) {
      console.log('[MBTS] 캐시 히트! 즉시 렌더링');
      if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}

      var aiText = data.result.text;
      var parsed = null;
      var cleaned = aiText.replace(/```json|```/g, '').trim();
      try { parsed = JSON.parse(cleaned); } catch(e) {
        var fb = cleaned.indexOf('{'), lb = cleaned.lastIndexOf('}');
        if (fb >= 0 && lb > fb) try { parsed = JSON.parse(cleaned.substring(fb, lb + 1)); } catch(e2) {}
      }
      if (parsed && parsed.categories) {
        var saju = calcSajuForApp(+params.y, +params.m, +params.d,
          params.h ? +params.h : null, params.min ? +params.min : null, params.cityLng || null);
        var gg = analyzeGyeokguk(saju);
        var mt = getMBTIFromChoices(params.mbtiChoices);
        var gender = params.gender === '남성' ? '남' : '여';
        var dw = calcDaewoon(saju, +params.y, +params.m, +params.d,
          params.h ? +params.h : null, params.min ? +params.min : null, gender);
        var ti = TY[mt] || { n:'탐험가', cf:'Ni-Te-Fi-Se' };
        var mbtiObj = {
          type: mt, cf: ti.cf,
          axes: [
            {side:params.mbtiChoices[0]==='L'?'E':'I',pct:(params.mbtiIntensities||[])[0]||60},
            {side:params.mbtiChoices[1]==='L'?'S':'N',pct:(params.mbtiIntensities||[])[1]||60},
            {side:params.mbtiChoices[2]==='L'?'T':'F',pct:(params.mbtiIntensities||[])[2]||60},
            {side:params.mbtiChoices[3]==='L'?'J':'P',pct:(params.mbtiIntensities||[])[3]||60}
          ], profile: ''
        };
        if (typeof postValidateAI === 'function') {
          try { parsed = postValidateAI(parsed, dw, saju, gg); } catch(e) {}
        }
        window._lastAIResult = parsed;
        window._lastSaju = saju; window._lastDW = dw;
        window._lastGG = gg; window._lastMBTI = mt;
        window._lastMBTIObj = mbtiObj; window._lastIsAI = true;
        if (typeof MBTSUser !== 'undefined') MBTSUser.sync();
        _isAnalyzing = false;
        bar.style.width = '100%';
        phase.style.fontWeight = '600'; phase.style.color = 'var(--purple)';
        phase.innerHTML = '분석이 완료되었습니다 ✨';
        logo.style.animation = 'loadFinish 1s ease both';
        setTimeout(function() { renderResult(parsed, saju, mt, gg, true); }, 800);
      } else {
        _isAnalyzing = false;
        alert('캐시 데이터 파싱 실패. 다시 시도해주세요.');
        setTimeout(function(){ go('pgBirth'); }, 500);
      }
      return;
    }

    var _jobId = data.jobId;
    localStorage.setItem('mbts_active_job', JSON.stringify({
      jobId: _jobId, type: 'saju', createdAt: Date.now(),
      input: {
        y:params.y, m:params.m, d:params.d, h:params.h, min:params.min,
        gender:params.gender, mbtiChoices:params.mbtiChoices,
        mbtiIntensities:params.mbtiIntensities, cityLng:params.cityLng
      }
    }));

    console.log('[MBTS] job 생성 완료:', _jobId);
    bar.style.width = '10%';

    /* ── polling (3초 간격) ── */
    var _pollStart = Date.now();
    var _pollHardDeadline = Date.now() + 900000; // M12: 15-min hard cap
    var _renderedSubCount = 0;
    var _uidQs = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) ? ('&userId=' + encodeURIComponent(mbtsSession.userId)) : '';
    var _pollTimer = setInterval(async function() {
      // M12 hard deadline
      if (Date.now() > _pollHardDeadline) {
        clearInterval(_pollTimer);
        window._MBTS_activePollTimer = null;
        _isAnalyzing = false;
        localStorage.removeItem('mbts_active_job');
        if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
        if (_renderedSubCount >= 5 && typeof finalizeProgressivePage === 'function') {
          finalizeProgressivePage(null, null, null, null, false);
          if (typeof showToast === 'function') showToast('분석이 오래 걸려 중단됐어요 🔄');
          return;
        }
        phase.innerHTML = '분석 시간이 초과됐어요 😢';
        phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
        logo.style.animation = 'none';
        alert('분석 시간 초과 (15분). 다시 시도해주세요.');
        setTimeout(function(){ go('pgBirth'); }, 1000);
        return;
      }
      // idle timeout (no progress for 5 minutes)
      if (Date.now() - _pollStart > 300000) {
        clearInterval(_pollTimer);
        _isAnalyzing = false;
        localStorage.removeItem('mbts_active_job');
        if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
        // partial fallback: 5개 이상 sub가 렌더링됐으면 그걸로 결과 보여주기
        if (_renderedSubCount >= 5 && typeof finalizeProgressivePage === 'function') {
          finalizeProgressivePage(null, null, null, null, false);
          if (typeof showToast === 'function') showToast('일부 항목이 아직 준비 중이에요 🔄');
          return;
        }
        phase.innerHTML = '분석 시간이 초과됐어요 😢';
        phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
        logo.style.animation = 'none';
        alert('분석 시간 초과. 다시 시도해주세요.');
        setTimeout(function(){ go('pgBirth'); }, 1000);
        return;
      }

      // progress bar (use server progress if available)
      var elapsed = Date.now() - _pollStart;
      var fakePct = Math.min(90, Math.floor(elapsed / 1000) * 1.5);
      bar.style.width = Math.max(fakePct, 10) + '%';

      try {
        var res = await fetch('/api/job-status?id=' + _jobId + _uidQs);
        var statusData = await res.json();

        // progressive rendering: render completed subs as they arrive
        if (statusData.partial_subs && statusData.partial_subs.length > _renderedSubCount) {
          if (_renderedSubCount === 0) {
            // first sub arrived — compute saju for rendering and switch to result page
            var _pSaju = calcSajuForApp(+params.y, +params.m, +params.d,
              params.h ? +params.h : null, params.min ? +params.min : null, params.cityLng || null);
            var _pMt = getMBTIFromChoices(params.mbtiChoices);
            var _pGg = analyzeGyeokguk(_pSaju);
            if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
            if (typeof initProgressivePage === 'function') {
              initProgressivePage(_pSaju, _pMt, _pGg, params);
            }
          }
          for (var _pi = _renderedSubCount; _pi < statusData.partial_subs.length; _pi++) {
            if (typeof appendSubCard === 'function') {
              appendSubCard(statusData.partial_subs[_pi], _pi);
            }
          }
          _renderedSubCount = statusData.partial_subs.length;
          _pollStart = Date.now(); // sub arriving = server alive, reset timeout
          // update progress bar with server progress
          if (statusData.progress) {
            bar.style.width = Math.max(statusData.progress, fakePct) + '%';
          }
        }

        if (statusData.status === 'done' && statusData.result && statusData.result.text) {
          clearInterval(_pollTimer);
          localStorage.removeItem('mbts_active_job');
          if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
          console.log('[MBTS] job 완료!');

          /* ── JSON 파싱 (기존 로직 그대로) ── */
          var aiText = statusData.result.text;
          var parsed = null;
          var cleaned = aiText.replace(/```json|```/g, '').trim();
          try { parsed = JSON.parse(cleaned); } catch(e) {
            var fb = cleaned.indexOf('{'), lb = cleaned.lastIndexOf('}');
            if (fb >= 0 && lb > fb) {
              try { parsed = JSON.parse(cleaned.substring(fb, lb + 1)); } catch(e2) {}
            }
          }
          if (!parsed) {
            try {
              var s = cleaned.substring(cleaned.indexOf('{'), cleaned.lastIndexOf('}') + 1)
                .replace(/[\x00-\x1F\x7F]/g, function(ch) { return ch==='\n'||ch==='\r'||ch==='\t'?ch:''; });
              parsed = JSON.parse(s);
            } catch(e3) {}
          }
          if (!parsed) {
            try {
              var raw = cleaned.substring(cleaned.indexOf('{'));
              var oB=(raw.match(/{/g)||[]).length, cB=(raw.match(/}/g)||[]).length;
              var oK=(raw.match(/\[/g)||[]).length, cK=(raw.match(/\]/g)||[]).length;
              while(cK<oK){raw+=']';cK++;}
              while(cB<oB){raw+='}';cB++;}
              raw=raw.replace(/,\s*([}\]])/g,'$1');
              parsed = JSON.parse(raw);
            } catch(e4) {}
          }

          if (parsed && parsed.categories) {
            /* ── 로컬 사주 계산 (렌더링용) ── */
            var saju = calcSajuForApp(+params.y, +params.m, +params.d,
              params.h ? +params.h : null, params.min ? +params.min : null,
              params.cityLng || null);
            var gg = analyzeGyeokguk(saju);
            var mt = getMBTIFromChoices(params.mbtiChoices);
            var gender = params.gender === '남성' ? '남' : '여';
            var dw = calcDaewoon(saju, +params.y, +params.m, +params.d,
              params.h ? +params.h : null, params.min ? +params.min : null, gender);
            var ti = TY[mt] || { n:'탐험가', cf:'Ni-Te-Fi-Se' };
            var mbtiObj = {
              type: mt, cf: ti.cf,
              axes: [
                {side:params.mbtiChoices[0]==='L'?'E':'I',pct:(params.mbtiIntensities||[])[0]||60},
                {side:params.mbtiChoices[1]==='L'?'S':'N',pct:(params.mbtiIntensities||[])[1]||60},
                {side:params.mbtiChoices[2]==='L'?'T':'F',pct:(params.mbtiIntensities||[])[2]||60},
                {side:params.mbtiChoices[3]==='L'?'J':'P',pct:(params.mbtiIntensities||[])[3]||60}
              ], profile: ''
            };

            if (typeof postValidateAI === 'function') {
              try { parsed = postValidateAI(parsed, dw, saju, gg); } catch(e) {}
            }

            window._lastAIResult = parsed;
            window._lastSaju = saju; window._lastDW = dw;
            window._lastGG = gg; window._lastMBTI = mt;
            window._lastMBTIObj = mbtiObj; window._lastIsAI = true;
            if (typeof MBTSUser !== 'undefined') MBTSUser.sync();

            try {
              localStorage.setItem('mbts_lastResult', JSON.stringify({
                input: {y:params.y,m:params.m,d:params.d,h:params.h,min:params.min,
                  gender:params.gender,city:params.city,cityLng:params.cityLng,
                  ch:params.mbtiChoices,it:params.mbtiIntensities},
                saju:saju,dw:dw,gg:gg,mbti:mt,mbtiObj:mbtiObj,aiResult:parsed,isAI:true
              }));
            } catch(e) {}

            _isAnalyzing = false;
            bar.style.width = '100%';

            if (_renderedSubCount > 0 && typeof finalizeProgressivePage === 'function') {
              // Bug 2: dedupe catchup by title (h) — server may skip boundary subs so index compare fails
              var _allSubs = [];
              (parsed.categories || []).forEach(function(c) { (c.subs || []).forEach(function(s) { _allSubs.push(s); }); });
              if (typeof appendSubCard === 'function') {
                window._renderedSubTitles = window._renderedSubTitles || new Set();
                for (var _fi = 0; _fi < _allSubs.length; _fi++) {
                  var _s = _allSubs[_fi];
                  if (!_s || !_s.h) continue;
                  if (window._renderedSubTitles.has(_s.h)) continue;
                  try { appendSubCard(_s, _fi); window._renderedSubTitles.add(_s.h); } catch(e) {}
                }
                _renderedSubCount = _allSubs.length;
              }
              // progressive mode — finalize with full result
              finalizeProgressivePage(parsed, saju, mt, gg, true);
            } else {
              // standard mode — full render
              phase.style.opacity = '0'; phase.style.transform = 'translateY(-8px)';
              setTimeout(function() {
                phase.innerHTML = '분석이 완료되었습니다 ✨';
                phase.style.opacity = '1'; phase.style.transform = 'translateY(0)';
              }, 200);
              phase.style.fontWeight = '600'; phase.style.color = 'var(--purple)';
              logo.style.animation = 'loadFinish 1s ease both';
              setTimeout(function() {
                renderResult(parsed, saju, mt, gg, true);
              }, 1200);
            }

          } else {
            _isAnalyzing = false;
            if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
            phase.innerHTML = '분석 결과를 읽지 못했어요 😢';
            phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
            logo.style.animation = 'none';
            alert('AI 응답 파싱 실패. 다시 시도해주세요.');
            setTimeout(function(){ go('pgBirth'); }, 1000);
          }

        } else if (statusData.status === 'failed') {
          clearInterval(_pollTimer);
          _isAnalyzing = false;
          localStorage.removeItem('mbts_active_job');
          if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
          phase.innerHTML = '분석 중 오류가 발생했어요 😢';
          phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
          logo.style.animation = 'none';
          alert('분석 오류: ' + (statusData.error || '알 수 없는 오류'));
          setTimeout(function(){ go('pgBirth'); }, 1000);

        } else if (statusData.status === 'partial') {
          clearInterval(_pollTimer);
          _isAnalyzing = false;
          localStorage.removeItem('mbts_active_job');
          if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
          phase.innerHTML = '분석이 불완전하게 끝났어요 😢';
          phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
          logo.style.animation = 'none';
          alert('분석이 불완전해요. 다시 시도해주세요.');
          setTimeout(function(){ go('pgBirth'); }, 1000);
        }
      } catch(pollErr) {
        console.warn('[MBTS] polling 에러:', pollErr);
      }
    }, 3000);
    window._MBTS_activePollTimer = _pollTimer; // M10: register active poller
  })
  .catch(function(err) {
    console.error('[MBTS] analyze-v2 호출 실패:', err);
    _isAnalyzing = false;
    localStorage.removeItem('mbts_active_job');
    if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
    phase.innerHTML = '분석 요청 실패 😢';
    phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
    logo.style.animation = 'none';
    alert('서버 연결 실패. 다시 시도해주세요.');
    setTimeout(function(){ go('pgBirth'); }, 1000);
  });
}

// ====================================================================
// startLoadAnim 오버라이드 — dummy animation 비활성화
// (startRealAnalysis가 대신 사용됨)
// ====================================================================
function startLoadAnim(){
  // no-op: 실제 분석은 startRealAnalysis에서 처리
}

// ====================================================================
// UI 렌더링 함수 (mbts.html 5839-6239 기반)
// ====================================================================
function isTipLine(str){
  if(!str||str.length===0)return false;
  var c=str.charCodeAt(0);
  if(c>=0xD800&&c<=0xDBFF)return true;
  if(c>=0x2600&&c<=0x27BF)return true;
  if(c>=0x2500&&c<=0x25FF)return true;
  if(c===0x2B50)return true;
  return false;
}
var tipColorIndex=0;
var tipPalette=[
  {bg:'rgba(136,97,154,0.08)',border:'#886199'},
  {bg:'rgba(100,149,237,0.08)',border:'#6495ED'},
  {bg:'rgba(72,191,145,0.08)',border:'#48BF91'},
  {bg:'rgba(219,112,147,0.08)',border:'#DB7093'},
  {bg:'rgba(210,150,100,0.08)',border:'#D29664'},
  {bg:'rgba(147,130,210,0.08)',border:'#9382D2'}
];
function renderSubBody(text){
  var paras=(text||'').split('\n\n');
  var out='';
  paras.forEach(function(p){
    p=p.trim();if(!p)return;
    var isTip=isTipLine(p);
    if(isTip){
      var tc=tipPalette[tipColorIndex%tipPalette.length];
      tipColorIndex++;
      out+='<div style="border-radius:12px;padding:14px 16px;margin:12px 0;font-size:13px;line-height:1.85;background:'+tc.bg+';border-left:3px solid '+tc.border+';color:var(--text-2)">'+p+'</div>';
    }
    else{out+='<p>'+p+'</p>';}
  });
  return out;
}

function scrollToCat(catId){
  var el=document.getElementById('cat-'+catId);
  if(!el)return;
  var navEl=document.getElementById('r-cat-nav');
  var offset=navEl?navEl.offsetHeight+8:60;
  var top=el.getBoundingClientRect().top+window.pageYOffset-offset;
  window.scrollTo({top:top,behavior:'smooth'});
  document.querySelectorAll('.r-cat-pill').forEach(function(pill){
    pill.classList.toggle('active',pill.getAttribute('data-cat')===catId);
  });
}

function initCatNav(){
  var nav=document.getElementById('r-cat-nav-inner');
  if(!nav)return;
  var sections=document.querySelectorAll('.r-cat-sec');
  if(!sections.length||!('IntersectionObserver' in window))return;
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var catId=entry.target.getAttribute('data-cat-id');
        document.querySelectorAll('.r-cat-pill').forEach(function(pill){
          pill.classList.toggle('active',pill.getAttribute('data-cat')===catId);
        });
        var activePill=nav.querySelector('.r-cat-pill.active');
        if(activePill){var _nl=activePill.offsetLeft,_nw=nav.offsetWidth,_pw=activePill.offsetWidth;nav.scrollTo({left:_nl-(_nw/2)+(_pw/2),behavior:'smooth'});}
      }
    });
  },{rootMargin:'-20% 0px -60% 0px'});
  sections.forEach(function(sec){observer.observe(sec);});
}

function captureAnimalCard(){
  var el=document.getElementById('animal-card-capture');
  if(!el){alert('캡처할 카드가 없어요!');return;}
  if(typeof html2canvas==='undefined'){
    var s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload=function(){doCapture(el);};
    s.onerror=function(){alert('이미지 저장 기능을 불러올 수 없어요.');};
    document.head.appendChild(s);
  }else{doCapture(el);}
}
function doCapture(el){
  var btns=document.querySelectorAll('.r-share-btn');
  btns.forEach(function(b){b.disabled=true;b.textContent='⏳ 저장 중...';});
  html2canvas(el,{
    scale:3,useCORS:true,backgroundColor:null,logging:false,allowTaint:false,
    scrollX:0,scrollY:-window.scrollY,windowWidth:el.scrollWidth,windowHeight:el.scrollHeight
  }).then(function(canvas){
    canvas.toBlob(function(blob){
      if(blob&&navigator.share&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){
        var file=new File([blob],'mbts-animal-card.png',{type:'image/png'});
        navigator.share({files:[file],title:'MBTS 동물카드'}).catch(function(){fallbackDownload(canvas);});
      }else{fallbackDownload(canvas);}
    },'image/png');
  }).catch(function(err){
    console.error('[MBTS] 캡처 실패:',err);
    alert('이미지 저장에 실패했어요. 다시 시도해주세요!');
  }).finally(function(){
    btns.forEach(function(b,i){b.disabled=false;b.textContent=i===0?'📷 이미지 저장':'💬 카카오톡 공유';});
  });
}

function fallbackDownload(canvas){
  var link=document.createElement('a');
  link.download='mbts-동물카드-'+(window._lastMBTI||'result')+'.png';
  link.href=canvas.toDataURL('image/png');
  link.click();
  showToast('📷 동물카드가 저장되었어요!');
}

function showToast(msg){
  var t=document.createElement('div');
  t.textContent=msg;
  t.style.cssText='position:fixed;bottom:80px;left:50%;transform:translateX(-50%);padding:12px 24px;background:rgba(0,0,0,0.8);color:#fff;border-radius:100px;font-size:14px;font-weight:600;z-index:9999;animation:fu .3s ease';
  document.body.appendChild(t);
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove();},300);},2000);
}

async function shareKakao() {
  var animalTitle = '', animalDesc = '', animalEmoji = '', shareImageUrl = 'https://mbts.kr/animals/FiLiS.png';
  if (window._lastAIResult && window._lastAIResult.animal && window._lastSaju) {
    var aInfo = getAnimalResult(window._lastAIResult.animal.oheng, window._lastAIResult.animal.dominant_sipsung, window._lastAIResult.animal.condition);
    if (aInfo && aInfo.mod) { animalEmoji = aInfo.emoji; animalTitle = aInfo.mod.title; animalDesc = aInfo.mod.desc; }
    if (TITLE_OVERRIDE[animalTitle]) animalTitle = TITLE_OVERRIDE[animalTitle];
    var ohengMap = { '목':'Wo', '화':'Fi', '토':'Ea', '금':'Me', '수':'Wa' };
    var animalMap = { '늑대':'Wf','여우':'Fo','다람쥐':'Sq','사슴':'De','고양이':'Ca','사자':'Li','공작새':'Pk','벌':'Be','독수리':'Eg','올빼미':'Ow','곰':'Br','수달':'Ot','소':'Ox','코끼리':'El','거북이':'Tu','치타':'Ch','앵무새':'Pa','악어':'Cr','시바견':'Sb','문어':'Oc','상어':'Sk','돌고래':'Do','비버':'Bv','고래':'Wh','해파리':'Jf' };
    var condMap = { '신강':'S', '신약':'W', '특수':'X' };
    var a = window._lastAIResult.animal;
    var oh = ohengMap[a.oheng] || 'Fi';
    var aInfoImg = getAnimalResult(a.oheng, a.dominant_sipsung, a.condition);
    var anName = aInfoImg ? (animalMap[aInfoImg.name] || 'Li') : 'Li';
    var cond = condMap[a.condition] || 'S';
    shareImageUrl = 'https://mbts.kr/animals/' + oh + anName + cond + '.png?v=2';
  }
  var nickname = (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.nickname) ? mbtsSession.nickname : '';
  var preview = {
    title: animalEmoji + ' ' + (animalTitle || 'MBTS — 사주×MBTI 퍼스널 분석'),
    desc: nickname ? (nickname + '님의 MBTS 결과를 공유드립니다.') : 'MBTS — 세상에 같은 풀이는 없습니다.',
    image: shareImageUrl, mbti: window._lastMBTI || '', emoji: animalEmoji
  };
  var result = await MBTSShare.save('premium', {
    aiResult: window._lastAIResult, saju: window._lastSaju, mbti: window._lastMBTI
  }, preview);
  if (!MBTSShare.sendKakao(result.url, preview)) {
    MBTSShare.fallbackShare(result.url, preview);
  }
}

function adjustColor(hex,factor){
  hex=hex.replace('#','');
  var r=parseInt(hex.substring(0,2),16),g=parseInt(hex.substring(2,4),16),b=parseInt(hex.substring(4,6),16);
  r=Math.round(r*factor);g=Math.round(g*factor);b=Math.round(b*factor);
  return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);
}

// ═══════════════════════════════════════════════════
// 프로그레시브 렌더러 — 스트리밍 sub 실시간 표시
// ═══════════════════════════════════════════════════

var _progState = null; // 프로그레시브 렌더링 상태

function initProgressivePage(saju, mt, gg, params) {
  tipColorIndex = 0;
  var ti = TY[mt] || {n:"탐험가", cf:"Ni-Te-Fi-Se"};
  gg = gg || analyzeGyeokguk(saju);

  // animal 계산 (클라이언트)
  var condition = '신강';
  if(gg.isJonggyeok || gg.isHwakyeok) condition = '특수';
  else if(gg.strengthGrade==='신약'||gg.strengthGrade==='극신약') condition = '신약';
  var animalInfo = getAnimalResult(saju.dmEl||'토', gg.dominant[0]||'비겁', condition);
  var ohD = animalInfo ? animalInfo.ohengData : OHENG_DATA[0];

  // pillars 계산 (클라이언트)
  var _pillarLabels = ['시주','일주','월주','연주'];
  var _pillarKeys = [['hg','hj'],['dg','dj'],['mg','mj'],['yg','yj']];
  var pillars = _pillarLabels.map(function(label, pi) {
    var gIdx = saju.raw[_pillarKeys[pi][0]], jIdx = saju.raw[_pillarKeys[pi][1]];
    return {
      label: label, chun: (gIdx!=null?TGAN_KR[gIdx]:''), chunOheng: (gIdx!=null?OHAENG_TGAN[gIdx]:''),
      ji: (jIdx!=null?JIJI_KR[jIdx]:''), jiOheng: (jIdx!=null?OHAENG_JIJI[jIdx]:''),
      sipsung: (saju.ss[pi]?saju.ss[pi].ss:''), unyeong: (saju.uns?saju.uns[pi]:''), isDay: (pi===1)
    };
  });

  // ohengBalance 계산
  var _ohEmoji = {'목':'🌿','화':'🔥','토':'🪨','금':'⚔️','수':'🌊'};
  var ohengBalance = ['목','화','토','금','수'].map(function(oh) {
    return { name: oh, count: saju.el[oh]||0, emoji: _ohEmoji[oh] };
  });

  var pg = document.getElementById('pgRes');
  pg.style.background = 'var(--bg)';
  pg.style.color = 'var(--text-1)';

  var bdgS = 'display:inline-block;padding:3px 10px;font-size:10px;font-weight:600;border-radius:8px;margin:2px';
  var aiBadge = '<span style="'+bdgS+';background:rgba(46,139,87,.1);color:#2e8b57">✨ AI 프리미엄</span>';
  var trueSolarBadge = saju.trueSolarApplied ? '<span style="'+bdgS+';background:rgba(70,130,180,.1);color:#4682b4">🌍 진태양시</span>' : '';
  var elCls = {'목':'el-wood','화':'el-fire','토':'el-earth','금':'el-metal','수':'el-water'};
  var RDC = ['#5B8FD4','#2e8b57','#88619A','#c99a2e'];

  var h = '<div class="res-wrap">';

  // ① 헤더
  h += '<div class="res-header">';
  h += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">';
  h += '<button onclick="history.back()" style="background:none;border:none;font-size:15px;color:var(--purple);cursor:pointer;padding:4px 0;font-family:inherit;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:18px">←</span> 뒤로</button>';
  h += '<div style="flex:1"></div>';
  h += '<div class="logo-sm" style="cursor:pointer" onclick="go(\'pgDash\')"><span style="color:#4CAF7D">M</span><span style="color:#5B8FD4">B</span><span style="color:#E05A5A">T</span><span style="color:#E8B84B">S</span></div>';
  h += '</div>';
  h += '<p style="font-size:12px;color:var(--text-3);margin-bottom:4px">';
  h += ST.y+'년 '+ST.m+'월 '+ST.d+'일 '+(ST.h?ST.h+'시':'')+(ST.min?ST.min+'분':'')+' · '+ST.gender;
  h += '</p>';
  h += '<div style="display:flex;align-items:center;justify-content:space-between">';
  h += '<button onclick="go(\'pgDash\')" style="font-size:14px;font-weight:600;color:var(--purple);cursor:pointer;background:none;border:none;padding:0">← 돌아가기</button>';
  h += '<div style="font-size:13px;font-weight:600;color:var(--text-2)">당신이라는 사람</div>';
  h += '<div style="width:80px"></div>';
  h += '</div></div>';

  // ② 동물카드
  if(animalInfo && animalInfo.mod) {
    var mod = animalInfo.mod;
    var gFrom = ohD.color, gTo = adjustColor(ohD.color, 0.65);
    h += '<div class="r-animal" style="background:linear-gradient(135deg,'+gFrom+','+gTo+')">';
    var _anIconUrl=getAnimalIconUrl(animalInfo.name);
    h += '<div class="r-animal-emoji">'+(_anIconUrl?'<img src="'+_anIconUrl+'" style="width:100%;height:100%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(animalInfo.emoji))">':animalInfo.emoji)+'</div>';
    var _aTitle = mod.title;
    if(TITLE_OVERRIDE[_aTitle]) _aTitle = TITLE_OVERRIDE[_aTitle];
    h += '<div class="r-animal-tag">'+mod.tag+'</div>';
    h += '<div class="r-animal-title">'+_aTitle+'</div>';
    h += '<div class="r-animal-desc">'+mod.desc+'</div>';
    h += '<div class="r-animal-traits">';
    (mod.traits||[]).forEach(function(t){ h += '<span class="r-animal-trait">#'+t+'</span>'; });
    h += '</div>';
    h += '<div class="r-animal-rx">💊 '+mod.rx+'</div>';
    h += '</div>';
  }

  // ③ MBTI 카드
  h += '<div class="r-profile"><div class="r-mbti-area">';
  h += '<div class="r-mbti-letters">';
  mt.split('').forEach(function(l,i){ h += '<span style="color:'+RDC[i]+'">'+l+'</span>'; });
  h += '</div>';
  h += '<div class="r-mbti-name">'+ti.n+'</div>';
  h += '<div class="r-mbti-cf">인지기능: '+ti.cf+'</div>';
  h += '<div class="r-mbti-tags">';
  ST.ch.forEach(function(c,i){
    var lb = c==='L' ? DM_AX[i].Ll : DM_AX[i].Rl;
    h += '<span class="r-mbti-tag">'+strLv(ST.it[i])+' '+lb+'</span>';
  });
  h += '</div></div></div>';

  // ④ 만세력
  h += '<div class="r-profile">';
  h += '<div class="r-profile-title">📜 만 세 력</div>';
  h += '<div style="text-align:center;padding:0 16px 12px;display:flex;gap:6px;justify-content:center;flex-wrap:wrap">'+aiBadge+trueSolarBadge+'</div>';
  h += '<div class="r-pil-grid">';
  var pRev=[saju.P[3],saju.P[2],saju.P[1],saju.P[0]];
  var ssRev=[saju.ss[3],saju.ss[2],saju.ss[1],saju.ss[0]];
  var unsRev=[saju.uns[3],saju.uns[2],saju.uns[1],saju.uns[0]];
  pRev.forEach(function(p,i){
    var sOh=p.gi!=null?OHAENG_TGAN[p.gi]:'',bOh=p.bi!=null?OHAENG_JIJI[p.bi]:'';
    var isDay=i===1;
    h+='<div class="r-pil-box'+(isDay?' r-pil-day':'')+'">';
    h+='<div class="r-pil-label">'+p.l+'</div>';
    h+='<div class="r-pil-stem '+(elCls[sOh]||'')+'">'+p.s+'</div>';
    h+='<div class="r-pil-info">'+sOh+'</div>';
    h+='<div class="r-pil-ss">'+(ssRev[i]?ssRev[i].ss:'')+'</div>';
    if(unsRev[i])h+='<div class="r-pil-un">'+unsRev[i]+'</div>';
    h+='<div class="r-pil-div"></div>';
    h+='<div class="r-pil-branch '+(elCls[bOh]||'')+'">'+p.b+'</div>';
    h+='<div class="r-pil-info">'+bOh+'</div>';
    h+='</div>';
  });
  h += '</div>';

  // 오행 밸런스
  h+='<div class="r-oh-bar">';
  ['목','화','토','금','수'].forEach(function(e){
    var c=saju.el[e]||0;
    var od=OHENG_DATA.filter(function(o){return o.key===e;})[0]||{};
    h+='<div class="r-oh-item">';
    h+='<div class="r-oh-dot" style="background:'+(c>0?od.bg:'#f5f5f5')+';border:2px solid '+(c>0?od.color:'#eee')+'">'+(od.emoji||EJ[e]||'')+'</div>';
    h+='<div class="r-oh-lbl" style="color:'+(od.color||'#999')+'">'+e+' '+c+'</div>';
    h+='</div>';
  });
  h+='</div></div>';

  // ⑤ sub 카드 컨테이너 (빈 상태)
  h += '<div id="prog-sub-container"></div>';

  // ⑥ 스켈레톤
  h += '<div id="prog-skeleton" class="prog-skeleton">';
  h += '<div class="prog-skel-line"></div><div class="prog-skel-line"></div>';
  h += '<div class="prog-skel-line"></div><div class="prog-skel-line"></div>';
  h += '<div class="prog-skel-line"></div></div>';

  // ⑦ 완료 영역 (숨김)
  h += '<div id="prog-complete" style="display:none"></div>';

  h += '<div style="height:80px"></div></div>';

  // 하단 진행 바
  h += '<div class="prog-bottom-bar" id="prog-bar"><div class="prog-bottom-pill" id="prog-pill">';
  h += '<div class="prog-dots" id="prog-dots"></div>';
  h += '<div class="prog-bottom-text" id="prog-text">1/14 풀이 중</div>';
  h += '</div></div>';

  pg.innerHTML = h;

  // 도트 생성
  var dotsEl = document.getElementById('prog-dots');
  for(var di = 0; di < 14; di++) { var dot = document.createElement('span'); dotsEl.appendChild(dot); }

  // 바 표시
  document.getElementById('prog-bar').classList.add('show');

  // 상태 저장
  _progState = {
    saju: saju, mt: mt, gg: gg, animalInfo: animalInfo,
    subCount: 0, params: params, ti: ti
  };

  // 페이지 이동
  go('pgRes');
  window.scrollTo({ top: 0 });

  console.log('[PROGRESSIVE] 페이지 초기화 완료');
}

function appendSubCard(subObj, index) {
  if(!_progState) return;
  var container = document.getElementById('prog-sub-container');
  if(!container) return;

  // 카테고리 구분자
  var catMap = {
    0:'🔥 나란 사람', 4:'💘 나의 연애', 7:'💼 일과 돈',
    9:'⚡ 2026년 나의 운', 11:'🔮 인생 로드맵'
  };
  if(catMap[index]) {
    var catDiv = document.createElement('div');
    catDiv.className = 'r-cat-head prog-sub-card';
    var catParts = catMap[index].split(' ');
    catDiv.innerHTML = '<div class="r-cat-title-row"><span class="r-cat-icon">'+catParts[0]+'</span><span class="r-cat-title">'+catParts.slice(1).join(' ')+'</span></div>';
    container.appendChild(catDiv);
    setTimeout(function(){ catDiv.classList.add('revealed'); }, 50);
  }

  // Sub 카드
  var card = document.createElement('div');
  card.className = 'r-sub prog-sub-card';
  var bodyHtml = renderSubBody(subObj.b || '');
  var tipHtml = '';
  if(subObj.tip) {
    var _tc = tipPalette[tipColorIndex % tipPalette.length];
    tipColorIndex++;
    tipHtml = '<div style="border-radius:12px;padding:14px 16px;margin:12px 0;font-size:13px;line-height:1.85;background:'+_tc.bg+';border-left:3px solid '+_tc.border+';color:var(--text-2)">'+subObj.tip+'</div>';
  }
  card.innerHTML = '<div class="r-sub-h">'+(subObj.h||'')+'</div>' +
    '<div class="r-sub-b">'+bodyHtml+'</div>' + tipHtml;
  container.appendChild(card);
  setTimeout(function(){ card.classList.add('revealed'); }, 100);

  // 스켈레톤 위치 조정 (항상 마지막에)
  var skel = document.getElementById('prog-skeleton');
  if(skel) container.parentNode.insertBefore(skel, container.nextSibling);

  // 진행 바 업데이트
  _progState.subCount = index + 1;
  updateProgressBar(_progState.subCount);

  console.log('[PROGRESSIVE] sub 추가 #' + (index+1) + ': ' + subObj.h);
}

function updateProgressBar(count) {
  var text = document.getElementById('prog-text');
  var dots = document.getElementById('prog-dots');
  if(text) text.textContent = count + '/14 풀이 중';
  if(dots) {
    var children = dots.children;
    for(var i = 0; i < children.length; i++) {
      if(i < count) children[i].classList.add('filled');
      else children[i].classList.remove('filled');
    }
  }
}

// ══════════════════════════════════════
// 궁합 프로그레시브 스트리밍 렌더 (Phase 8)
// ══════════════════════════════════════
var AN_ICON_MAP = {'늑대':'Wf','여우':'Fo','다람쥐':'Sq','사슴':'De','고양이':'Ca','사자':'Li','공작새':'Pk','벌':'Be','독수리':'Eg','올빼미':'Ow','곰':'Br','수달':'Ot','소':'Ox','코끼리':'El','거북이':'Tu','치타':'Ch','앵무새':'Pa','악어':'Cr','시바견':'Sb','문어':'Oc','상어':'Sk','돌고래':'Do','비버':'Bv','고래':'Wh','해파리':'Jf'};
function getAnimalIconUrl(animalName) {
  var code = AN_ICON_MAP[animalName];
  return code ? '/animals-icon/' + code + '.png' : '';
}

var EMOJI_TO_NAME={'🐺':'늑대','🦊':'여우','🐿️':'다람쥐','🦌':'사슴','🐱':'고양이','🦁':'사자','🦚':'공작새','🐝':'벌','🦅':'독수리','🦉':'올빼미','🐻':'곰','🦦':'수달','🐂':'소','🐘':'코끼리','🐢':'거북이','🐆':'치타','🦜':'앵무새','🐊':'악어','🐕':'시바견','🐙':'문어','🦈':'상어','🐬':'돌고래','🦫':'비버','🐋':'고래','🪼':'해파리'};

function resolveAnimalIcon(rec) {
  if (rec.animalIcon) return rec.animalIcon;
  if (rec.saju && rec.gg && typeof getAnimalResult === 'function') {
    var c = (rec.gg.isJonggyeok || rec.gg.isHwakyeok) ? '특수' : (rec.gg.strengthGrade === '신약' || rec.gg.strengthGrade === '극신약') ? '신약' : '신강';
    var a = getAnimalResult(rec.saju.dmEl || '토', rec.gg.dominant ? rec.gg.dominant[0] : '비겁', c);
    if (a) return getAnimalIconUrl(a.name);
  }
  return '';
}

function resolveGhPersonIcon(p) {
  if (p.icon) return p.icon;
  if (p.emoji && p.emoji.indexOf('/') === 0) return p.emoji;
  if (p.emoji && EMOJI_TO_NAME[p.emoji]) return getAnimalIconUrl(EMOJI_TO_NAME[p.emoji]);
  if (p.saju && p.gg && typeof getAnimalResult === 'function') {
    var c = (p.gg.isJonggyeok || p.gg.isHwakyeok) ? '특수' : (p.gg.strengthGrade === '신약' || p.gg.strengthGrade === '극신약') ? '신약' : '신강';
    var a = getAnimalResult(p.saju.dmEl || '토', p.gg.dominant ? p.gg.dominant[0] : '비겁', c);
    if (a) return getAnimalIconUrl(a.name);
  }
  return '';
}

var GH_ILJU_LINES = {
  '합_육합':'노력 안 해도 통하는 사이','합_삼합':'호흡이 저절로 맞는 사이','합_같은':'말 안 해도 아는 사이','합_무관':'왠지 편한 사이','합_충':'끌리는데 부딪히는 사이','합_형':'좋은데 가끔 긁히는 사이','합_원진':'좋은데 왜 자꾸 어긋나는 사이',
  '충_육합':'싸워도 결국 다시 붙는 사이','충_삼합':'티격태격 팀워크의 사이','충_같은':'밀당이 일상인 사이','충_무관':'긴장감이 감도는 사이','충_충':'만나면 불꽃 튀는 사이','충_형':'자극이 성장이 되는 사이','충_원진':'거리 조절이 필요한 사이',
  '비견_육합':'취향 공유 가능한 사이','비견_삼합':'같은 방향 보고 걷는 사이','비견_같은':'쌍둥이같이 닮은 사이','비견_무관':'같은 결 다른 방향의 사이','비견_충':'닮아서 더 부딪히는 사이','비견_형':'같은데 왜 긁히는 사이','비견_원진':'닮았는데 어긋나는 사이',
  '겁재_육합':'한 끗 차이가 매력인 사이','겁재_삼합':'비슷한 듯 다른 리듬의 사이','겁재_같은':'쌍둥이 같은데 성격 다른 사이','겁재_무관':'닮은 듯 미묘하게 다른 사이','겁재_충':'한 끗 차이로 부딪히는 사이','겁재_형':'닮아서 예민해지는 사이','겁재_원진':'가까운데 멀게 느껴지는 사이',
  '내가생_육합':'같이 있으면 자라나는 사이','내가생_삼합':'키워주는 게 자연스러운 사이','내가생_같은':'뿌리째 품어주는 사이','내가생_무관':'조용히 채워주는 사이','내가생_충':'키워주는데 흔들리는 사이','내가생_형':'성장통이 있는 사이','내가생_원진':'주는데 받는 느낌이 다른 사이',
  '상대가생_육합':'옆에만 있어도 충전되는 사이','상대가생_삼합':'흐름을 타면 편해지는 사이','상대가생_같은':'기대도 되는 사이','상대가생_무관':'몰래 챙겨주는 사이','상대가생_충':'챙겨주는데 흔들리는 사이','상대가생_형':'잘해주는데 방식이 좀 날카로운 사이','상대가생_원진':'고마운데 어색한 사이',
  '내가극_육합':'깎아주는데 미워할 수 없는 사이','내가극_삼합':'날카롭지만 흐름은 맞는 사이','내가극_같은':'단단하게 다듬어주는 사이','내가극_무관':'날카롭지만 필요한 사이','내가극_충':'뜨겁게 부딪히는 사이','내가극_형':'서로를 벼리는 사이','내가극_원진':'멀어질수록 생각나는 사이',
  '상대가극_육합':'아프지만 끌리는 사이','상대가극_삼합':'깎이는데 흐름은 맞는 사이','상대가극_같은':'단련시켜주는 사이','상대가극_무관':'긴장하게 만드는 사이','상대가극_충':'시련이 곧 인연인 사이','상대가극_형':'강해지게 만드는 사이','상대가극_원진':'피하고 싶은데 피할 수 없는 사이'
};

function _getIljuOneLine(sajuA, sajuB) {
  var rA = sajuA.raw, rB = sajuB.raw;
  var dgA = rA.dg, dgB = rB.dg, djA = rA.dj, djB = rB.dj;
  var ganOh = [0,0,1,1,2,2,3,3,4,4];
  var ohSang = [[1],[2],[3],[4],[0]];
  var ohGeuk = [[2],[3],[4],[0],[1]];
  var ganRel = '무관';
  var GANHAP = [[0,5],[1,6],[2,7],[3,8],[4,9]];
  var GANCHUNG = [[0,6],[1,7],[2,8],[3,9]];
  var isGanHap = false, isGanChung = false;
  GANHAP.forEach(function(h) { if ((dgA===h[0]&&dgB===h[1])||(dgA===h[1]&&dgB===h[0])) isGanHap = true; });
  GANCHUNG.forEach(function(c) { if ((dgA===c[0]&&dgB===c[1])||(dgA===c[1]&&dgB===c[0])) isGanChung = true; });
  if (isGanHap) ganRel = '합';
  else if (isGanChung) ganRel = '충';
  else if (dgA === dgB) ganRel = '비견';
  else if (ganOh[dgA] === ganOh[dgB]) ganRel = '겁재';
  else if (ohSang[ganOh[dgA]][0] === ganOh[dgB]) ganRel = '내가생';
  else if (ohSang[ganOh[dgB]][0] === ganOh[dgA]) ganRel = '상대가생';
  else if (ohGeuk[ganOh[dgA]][0] === ganOh[dgB]) ganRel = '내가극';
  else if (ohGeuk[ganOh[dgB]][0] === ganOh[dgA]) ganRel = '상대가극';
  var jiRel = '무관';
  var YUKHAP = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var JICHUNG = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var HYUNG = [[2,5],[5,8],[8,2],[3,0],[0,3]];
  var WONJIN = [[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
  var SAMHAP = [[0,4,8],[1,5,9],[2,6,10],[3,7,11]];
  var found = false;
  YUKHAP.forEach(function(h) { if (!found && ((djA===h[0]&&djB===h[1])||(djA===h[1]&&djB===h[0]))) { jiRel='육합'; found=true; } });
  if (!found) JICHUNG.forEach(function(c) { if (!found && ((djA===c[0]&&djB===c[1])||(djA===c[1]&&djB===c[0]))) { jiRel='충'; found=true; } });
  if (!found) HYUNG.forEach(function(h) { if (!found && ((djA===h[0]&&djB===h[1])||(djA===h[1]&&djB===h[0]))) { jiRel='형'; found=true; } });
  if (!found) WONJIN.forEach(function(w) { if (!found && ((djA===w[0]&&djB===w[1])||(djA===w[1]&&djB===w[0]))) { jiRel='원진'; found=true; } });
  if (!found && djA === djB) { jiRel='같은'; found=true; }
  if (!found) SAMHAP.forEach(function(s) { if (!found && ((djA===s[0]||djA===s[1]||djA===s[2]) && (djB===s[0]||djB===s[1]||djB===s[2]))) { jiRel='삼합'; found=true; } });
  var key = ganRel + '_' + jiRel;
  return GH_ILJU_LINES[key] || '함께 만들어가는 사이';
}

function _buildGhHeader(sajuA, sajuB, mbtiA, mbtiB, ggA, ggB, relType, scores) {
  var cat = (window.GH_CATEGORIES && window.GH_CATEGORIES[relType]) || {label:'궁합', emoji:'💕', scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'업무'}};
  var sl = cat.scoreLabels || {love:'연애',comm:'소통',values:'가치관',work:'업무'};
  var _min = (relType === 'colleague') ? 30 : 50;
  var _range = 100 - _min;
  var _remap = function(v) { return Math.round(_min + (Math.max(20, Math.min(95, v)) - 20) * _range / 75); };
  var sc = { love: _remap(scores.love), comm: _remap(scores.comm), values: _remap(scores.values), work: _remap(scores.work) };
  var _w = cat.scoreWeights || {love:0.35,comm:0.25,values:0.25,work:0.15};
  sc.total = Math.round(sc.love * _w.love + sc.comm * _w.comm + sc.values * _w.values + sc.work * _w.work);
  if (!ggA && sajuA && typeof analyzeGyeokguk === 'function') try { ggA = analyzeGyeokguk(sajuA); } catch(e) {}
  if (!ggB && sajuB && typeof analyzeGyeokguk === 'function') try { ggB = analyzeGyeokguk(sajuB); } catch(e) {}
  var condA = '신강';
  if (ggA && (ggA.isJonggyeok || ggA.isHwakyeok)) condA = '특수';
  else if (ggA && (ggA.strengthGrade === '신약' || ggA.strengthGrade === '극신약')) condA = '신약';
  var animalA = (typeof getAnimalResult === 'function') ? getAnimalResult(sajuA.dmEl || '토', (ggA && ggA.dominant ? ggA.dominant[0] : '비겁'), condA) : null;
  var aEmojiA = animalA ? animalA.emoji : '👤';
  var aTagA = (animalA && animalA.mod) ? animalA.mod.tag : '';
  var aTitleA = (animalA && animalA.mod) ? animalA.mod.title : '';
  var aTraitsA = (animalA && animalA.mod && animalA.mod.traits) ? animalA.mod.traits.slice(0, 2) : [];
  var aOhA = animalA ? animalA.ohengData : {color:'#8B6CC1'};
  var aColorA = aOhA.color || '#8B6CC1';
  var aDarkA = (typeof adjustColor === 'function') ? adjustColor(aColorA, 0.65) : aColorA;
  var condB = '신강';
  if (ggB && (ggB.isJonggyeok || ggB.isHwakyeok)) condB = '특수';
  else if (ggB && (ggB.strengthGrade === '신약' || ggB.strengthGrade === '극신약')) condB = '신약';
  var animalB = (typeof getAnimalResult === 'function') ? getAnimalResult(sajuB.dmEl || '토', (ggB && ggB.dominant ? ggB.dominant[0] : '비겁'), condB) : null;
  var aEmojiB = animalB ? animalB.emoji : '👤';
  var aTagB = (animalB && animalB.mod) ? animalB.mod.tag : '';
  var aTitleB = (animalB && animalB.mod) ? animalB.mod.title : '';
  var aTraitsB = (animalB && animalB.mod && animalB.mod.traits) ? animalB.mod.traits.slice(0, 2) : [];
  var aOhB = animalB ? animalB.ohengData : {color:'#5B8FD4'};
  var aColorB = aOhB.color || '#5B8FD4';
  var aDarkB = (typeof adjustColor === 'function') ? adjustColor(aColorB, 0.65) : aColorB;
  var relLabelColor = {ssom:'#d4839b',lover:'#d4839b',friend:'#6bab8a',colleague:'#b0a0c0',family:'#c4a060'};
  var labelColor = relLabelColor[relType] || '#b0a0c0';
  var oneLine = (typeof _getIljuOneLine === 'function') ? _getIljuOneLine(sajuA, sajuB) : '';
  var _OH = {'목':'Wo','화':'Fi','토':'Ea','금':'Me','수':'Wa'};
  var _AN = {'늑대':'Wf','여우':'Fo','다람쥐':'Sq','사슴':'De','고양이':'Ca','사자':'Li','공작새':'Pk','벌':'Be','독수리':'Eg','올빼미':'Ow','곰':'Br','수달':'Ot','소':'Ox','코끼리':'El','거북이':'Tu','치타':'Ch','앵무새':'Pa','악어':'Cr','시바견':'Sb','문어':'Oc','상어':'Sk','돌고래':'Do','비버':'Bv','고래':'Wh','해파리':'Jf'};
  var _CO = {'신강':'S','신약':'W','특수':'X'};
  var _imgA = (animalA && animalA.name) ? '/animals/' + (_OH[sajuA.dmEl]||'Fi') + (_AN[animalA.name]||'Li') + (_CO[condA]||'S') + '.png?v=2' : '';
  var _imgB = (animalB && animalB.name) ? '/animals/' + (_OH[sajuB.dmEl]||'Fi') + (_AN[animalB.name]||'Li') + (_CO[condB]||'S') + '.png?v=2' : '';
  var h = '';
  h += '<div style="margin:0 8px;background:#fff;border-radius:20px;padding:24px 16px;border:0.5px solid rgba(0,0,0,0.06)">';
  h += '<div style="text-align:center;margin-bottom:20px"><div style="display:flex;justify-content:center;gap:0;cursor:pointer" onclick="go(\'pgDash\')">';
  h += '<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1;color:#4CAF7D">M</span>';
  h += '<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1;color:#5B8FD4">B</span>';
  h += '<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1;color:#E05A5A">T</span>';
  h += '<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;line-height:1;color:#E8B84B">S</span>';
  h += '</div></div>';
  h += '<div style="display:flex;align-items:stretch;justify-content:center;gap:8px;margin-bottom:6px;position:relative">';
  h += '<div style="flex:1;background:linear-gradient(135deg,' + aColorA + ',' + aDarkA + ');border-radius:16px;padding:16px 10px 14px;text-align:center">';
  h += '<div style="font-size:60px;filter:drop-shadow(0 3px 10px rgba(0,0,0,.2));line-height:1;margin-bottom:8px">' + aEmojiA + '</div>';
  if (aTitleA) h += '<div style="font-size:12px;font-weight:800;color:#fff;line-height:1.4;margin-bottom:6px;word-break:keep-all">' + aTitleA + '</div>';
  if (aTagA) h += '<div style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:700;background:rgba(255,255,255,.22);color:#fff;margin-bottom:6px">#' + aTagA + '</div>';
  h += '<div style="font-size:13px;font-weight:800;color:#fff">나</div>';
  if (aTraitsA.length > 0) { h += '<div style="display:flex;justify-content:center;gap:3px;margin-top:8px;flex-wrap:wrap">'; aTraitsA.forEach(function(t) { h += '<span style="padding:2px 7px;border-radius:100px;font-size:9px;font-weight:600;background:rgba(255,255,255,.18);color:rgba(255,255,255,.8)">#' + t + '</span>'; }); h += '</div>'; }
  h += '</div>';
  h += '<div style="flex:1;background:linear-gradient(135deg,' + aColorB + ',' + aDarkB + ');border-radius:16px;padding:16px 10px 14px;text-align:center">';
  h += '<div style="font-size:60px;filter:drop-shadow(0 3px 10px rgba(0,0,0,.2));line-height:1;margin-bottom:8px">' + aEmojiB + '</div>';
  if (aTitleB) h += '<div style="font-size:12px;font-weight:800;color:#fff;line-height:1.4;margin-bottom:6px;word-break:keep-all">' + aTitleB + '</div>';
  if (aTagB) h += '<div style="display:inline-block;padding:3px 10px;border-radius:100px;font-size:10px;font-weight:700;background:rgba(255,255,255,.22);color:#fff;margin-bottom:6px">#' + aTagB + '</div>';
  h += '<div style="font-size:13px;font-weight:800;color:#fff">상대방</div>';
  if (aTraitsB.length > 0) { h += '<div style="display:flex;justify-content:center;gap:3px;margin-top:8px;flex-wrap:wrap">'; aTraitsB.forEach(function(t) { h += '<span style="padding:2px 7px;border-radius:100px;font-size:9px;font-weight:600;background:rgba(255,255,255,.18);color:rgba(255,255,255,.8)">#' + t + '</span>'; }); h += '</div>'; }
  h += '</div>';
  h += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 10px rgba(0,0,0,.1)">' + cat.emoji + '</div>';
  h += '</div>';
  if (oneLine) {
    h += '<div style="text-align:center;margin:14px 0;padding:10px 16px;background:rgba(139,108,193,0.04);border-radius:12px">';
    h += '<div style="font-size:14px;font-weight:700;color:#8B6CC1;letter-spacing:-0.5px">" ' + oneLine + ' "</div>';
    h += '</div>';
  }
  h += '<div style="text-align:center;margin-bottom:12px">';
  h += '<div style="font-size:48px;font-weight:900;color:#8B6CC1;letter-spacing:-2px;line-height:1">' + sc.total + '<span style="font-size:20px;font-weight:700">점</span></div>';
  h += '<div style="font-size:10px;color:' + labelColor + ';font-weight:600;margin-top:4px">' + cat.label + ' 종합</div>';
  h += '</div>';
  h += '<div style="height:0.5px;background:#f0f0f0;margin:12px 0"></div>';
  h += '<div style="display:flex;flex-direction:column;gap:8px">';
  [{l:sl.love||'연애',v:sc.love,c1:'#f0a0b8',c2:'#d63384'},{l:sl.comm||'소통',v:sc.comm,c1:'#6bc4a0',c2:'#2e8b57'},{l:sl.values||'가치관',v:sc.values,c1:'#e8c86b',c2:'#c99a2e'},{l:sl.work||'업무',v:sc.work,c1:'#7eb3d6',c2:'#4682b4'}].forEach(function(b) {
    h += '<div style="display:flex;align-items:center;gap:10px"><div style="width:36px;text-align:right;font-size:11px;font-weight:700;color:#999">' + b.l + '</div><div style="flex:1;height:6px;background:rgba(0,0,0,0.04);border-radius:3px;overflow:hidden"><div style="height:100%;width:' + b.v + '%;background:linear-gradient(90deg,' + b.c1 + ',' + b.c2 + ');border-radius:3px"></div></div><div style="width:20px;font-size:11px;font-weight:700;color:#bbb">' + b.v + '</div></div>';
  });
  h += '</div>';
  h += '<div style="display:flex;gap:8px;margin-top:16px">';
  h += '<button onclick="if(typeof saveResultImage===\'function\')saveResultImage()" style="flex:1;padding:12px;font-size:13px;font-weight:600;color:#666;background:#fff;border:1px solid #e0e0e0;border-radius:14px;cursor:pointer;font-family:inherit">📷 이미지 저장</button>';
  h += '<button onclick="if(typeof shareResult===\'function\')shareResult();else if(typeof shareKakao===\'function\')shareKakao()" style="flex:1;padding:12px;font-size:13px;font-weight:700;color:#191919;background:#FEE500;border:1px solid #FEE500;border-radius:14px;cursor:pointer;font-family:inherit">💬 카카오톡 공유</button>';
  h += '</div>';
  h += '</div>';
  return h;
}

function initGhProgressivePage(ghR, sajuA, sajuB, mbtiA, mbtiB, ggA, ggB, relType) {
  var cat = GH_CATEGORIES[relType];
  if (!cat) return;
  var sl = cat.scoreLabels;
  var sc = ghR.scores;
  var ghCfg = GH_REL_CONFIG[relType];
  var totalSubs = 0;
  if (ghCfg && ghCfg.subs) {
    totalSubs = ghCfg.subs.length;
  } else if (ghCfg && ghCfg.categories) {
    ghCfg.categories.forEach(function(c) { totalSubs += (c.subs || []).length; });
  }
  if (totalSubs === 0) totalSubs = 14;

  var pg = document.getElementById('ghResContent');
  if (!pg) { pg = document.getElementById('pg-gh-res'); }
  if (!pg) return;

  var h = '<div class="res-wrap" style="max-width:640px;margin:0 auto;padding:0 0 40px">';
  h += _buildGhHeader(sajuA, sajuB, mbtiA, mbtiB, ggA, ggB, relType, sc);

  h += '<div id="gh-prog-sub-container"></div>';
  h += '<div id="gh-prog-skeleton" class="prog-skeleton">';
  h += '<div class="prog-skel-line"></div><div class="prog-skel-line"></div>';
  h += '<div class="prog-skel-line"></div><div class="prog-skel-line"></div>';
  h += '<div class="prog-skel-line"></div></div>';
  h += '<div id="gh-prog-complete" style="display:none"></div>';
  h += '<div style="height:80px"></div></div>';

  h += '<div class="prog-bottom-bar" id="gh-prog-bar"><div class="prog-bottom-pill" id="gh-prog-pill">';
  h += '<div class="prog-dots" id="gh-prog-dots"></div>';
  h += '<div class="prog-bottom-text" id="gh-prog-text">1/' + totalSubs + ' 풀이 중</div>';
  h += '</div></div>';

  pg.innerHTML = h;
  var dotsEl = document.getElementById('gh-prog-dots');
  if (dotsEl) { for (var di = 0; di < totalSubs; di++) { var dot = document.createElement('span'); dotsEl.appendChild(dot); } }
  var bar = document.getElementById('gh-prog-bar');
  if (bar) bar.classList.add('show');

  window._ghProgState = { ghR: ghR, sajuA: sajuA, sajuB: sajuB, mbtiA: mbtiA, mbtiB: mbtiB, ggA: ggA, ggB: ggB, relType: relType, subCount: 0, totalSubs: totalSubs };
  goPage('gh-res');
  window.scrollTo({ top: 0 });
}

function appendGhSubCard(subObj, index, relType) {
  if (!window._ghProgState) return;
  var container = document.getElementById('gh-prog-sub-container');
  if (!container) return;

  var ghCfg = GH_REL_CONFIG[relType];
  var catMap = {};
  if (ghCfg && ghCfg.subs) {
    catMap[0] = (GH_CATEGORIES[relType] ? GH_CATEGORIES[relType].emoji : '') + ' ' + (ghCfg.title || '궁합 풀이');
  } else if (ghCfg && ghCfg.categories) {
    var runIdx = 0;
    ghCfg.categories.forEach(function(c) {
      catMap[runIdx] = (GH_CATEGORIES[relType] ? GH_CATEGORIES[relType].emoji : '') + ' ' + c.name;
      runIdx += (c.subs || []).length;
    });
  }

  if (catMap[index] !== undefined) {
    var catDiv = document.createElement('div');
    catDiv.className = 'r-cat-head prog-sub-card';
    var catParts = catMap[index].split(' ');
    catDiv.innerHTML = '<div class="r-cat-title-row"><span class="r-cat-icon">' + catParts[0] + '</span><span class="r-cat-title">' + catParts.slice(1).join(' ') + '</span></div>';
    container.appendChild(catDiv);
    setTimeout(function() { catDiv.classList.add('revealed'); }, 50);
  }

  var card = document.createElement('div');
  card.className = 'r-sub prog-sub-card';
  var bodyHtml = (typeof renderSubBody === 'function') ? renderSubBody(subObj.b || '') : (subObj.b || '').replace(/\n\n/g, '<br><br>');
  card.innerHTML = '<div class="r-sub-h">' + (subObj.h || '') + '</div><div class="r-sub-b">' + bodyHtml + '</div>';
  container.appendChild(card);
  setTimeout(function() { card.classList.add('revealed'); }, 100);

  var skel = document.getElementById('gh-prog-skeleton');
  if (skel) container.parentNode.insertBefore(skel, container.nextSibling);

  window._ghProgState.subCount = index + 1;
  var total = window._ghProgState.totalSubs;
  var text = document.getElementById('gh-prog-text');
  var dots = document.getElementById('gh-prog-dots');
  if (text) text.textContent = (index + 1) + '/' + total + ' 풀이 중';
  if (dots) { var ch = dots.children; for (var i = 0; i < ch.length; i++) { if (i <= index) ch[i].classList.add('filled'); else ch[i].classList.remove('filled'); } }
}

function finalizeGhProgressivePage(aiResult, ghR, sajuA, sajuB, mbtiA, mbtiB, ggA, ggB, relType, collectedSubs) {
  var skel = document.getElementById('gh-prog-skeleton');
  if (skel) skel.remove();

  if (aiResult && aiResult.categories) {
    var existCount = window._ghProgState ? window._ghProgState.subCount : 0;
    var allSubs = [];
    aiResult.categories.forEach(function(cat) {
      (cat.subs || cat.items || []).forEach(function(sub) {
        allSubs.push({ h: sub.h || sub.catch || '', b: sub.b || sub.content || '' });
      });
    });
    for (var i = existCount; i < allSubs.length; i++) {
      appendGhSubCard(allSubs[i], i, relType);
    }
  }

  var pill = document.getElementById('gh-prog-pill');
  var text = document.getElementById('gh-prog-text');
  var dots = document.getElementById('gh-prog-dots');
  if (pill) pill.classList.add('done');
  if (text) text.textContent = '풀이 완성';
  if (dots) { var ch = dots.children; for (var i = 0; i < ch.length; i++) ch[i].classList.add('filled'); }

  setTimeout(function() {
    var bar = document.getElementById('gh-prog-bar');
    if (bar) bar.classList.remove('show');
  }, 3500);

  var completeEl = document.getElementById('gh-prog-complete');
  if (completeEl) {
    var ch = '';
    var quote = (aiResult && aiResult.quote) ? aiResult.quote : '두 사람만의 특별한 이야기';
    ch += '<div class="r-oneline">';
    ch += '<div class="r-oneline-label">TWO OF US IN ONE LINE</div>';
    ch += '<div class="r-oneline-text">' + quote.replace(/\\n/g,'<br>').replace(/\n/g,'<br>') + '</div>';
    ch += '</div>';
    ch += '<div style="margin:24px 16px 20px;text-align:center">';
    ch += '<button onclick="if(window.MBTS_Chat&&window._ghChatData)MBTS_Chat.openFromGunghap(window._ghChatData.person,window._ghChatData.relType,window._ghChatData.ghResult)" style="width:100%;padding:16px;font-size:15px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:14px;cursor:pointer;box-shadow:0 4px 16px rgba(139,108,193,0.25)">🐰 달토한테 이 궁합 더 물어보기</button></div>';
    ch += '<div style="padding:20px"><button onclick="shareResult()" style="width:100%;padding:14px;font-size:14px;font-weight:700;color:#191919;background:#FEE500;border:none;border-radius:14px;margin-bottom:10px">💬 공유하기</button>';
    ch += '<p style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-muted)">참고용 분석이며 의사결정을 대체하지 않습니다.</p></div>';
    completeEl.innerHTML = ch;
    completeEl.style.display = 'block';
  }

  var mBtype = (mbtiB && mbtiB.type) ? mbtiB.type : '';
  window._ghChatData = {
    person: { name: sajuB.P[2].s + sajuB.P[2].b + ' · ' + mBtype, saju: sajuB, mbtiObj: mbtiB, gg: ggB, ilju: sajuB.P[2].s + sajuB.P[2].b, mbti: mBtype },
    relType: relType, ghResult: ghR
  };

  window._ghProgState = null;
}

function finalizeProgressivePage(result, saju, mt, gg, isAI) {
  // 스켈레톤 제거
  var skel = document.getElementById('prog-skeleton');
  if(skel) skel.remove();

  // 누락된 sub 채우기
  if(result && result.categories) {
    var container = document.getElementById('prog-sub-container');
    var existCount = _progState ? _progState.subCount : 0;
    var allSubs = [];
    result.categories.forEach(function(cat) {
      (cat.subs||[]).forEach(function(sub) { allSubs.push(sub); });
    });
    for(var i = existCount; i < allSubs.length; i++) {
      appendSubCard(allSubs[i], i);
    }
  }

  // 진행 바 완료
  var pill = document.getElementById('prog-pill');
  var text = document.getElementById('prog-text');
  var dots = document.getElementById('prog-dots');
  if(pill) pill.classList.add('done');
  if(text) text.textContent = '풀이 완성';
  if(dots) {
    var children = dots.children;
    for(var i = 0; i < children.length; i++) children[i].classList.add('filled');
  }

  // 3초 후 바 숨기기
  setTimeout(function() {
    var bar = document.getElementById('prog-bar');
    if(bar) bar.classList.remove('show');
  }, 3500);

  // oneLine + CTA
  var completeEl = document.getElementById('prog-complete');
  if(completeEl && result) {
    var ch = '';
    if(result.oneLine) {
      ch += '<div class="r-oneline">';
      ch += '<div class="r-oneline-label">YOUR LIFE IN ONE LINE</div>';
      ch += '<div class="r-oneline-text">'+(result.oneLine||'').replace(/\\n/g,'<br>').replace(/\n/g,'<br>')+'</div>';
      ch += '</div>';
    }
    ch += '<div class="r-cta">';
    ch += '<div class="r-cta-row">';
    ch += '<button class="r-cta-btn" onclick="go(\'pgGunghap\')" style="background:rgba(232,69,60,.1);color:#E8453C">💕 궁합 보러가기</button>';
    ch += '<button class="r-cta-btn" onclick="shareKakao()" style="background:#FEE500;color:#191919">💬 카카오 공유</button>';
    ch += '</div>';
    ch += '<p style="margin-top:16px;font-size:11px;color:var(--text-3);opacity:.8">본 풀이는 명리학과 MBTI 이론을 기반한 참고용 분석이며,<br>개인의 의사결정을 대체하지 않습니다.</p>';
    ch += '</div>';
    completeEl.innerHTML = ch;
    completeEl.style.display = 'block';
  }

  // 히스토리 저장 (기존 renderResult와 동일)
  try {
    var hist = JSON.parse(localStorage.getItem('mbts_history')||'[]');
    var dateStr = new Date().toISOString().slice(0,10);
    var animalInfo = _progState ? _progState.animalInfo : null;
    var myIcon = animalInfo ? getAnimalIconUrl(animalInfo.name) : '';
    var myTag = animalInfo && animalInfo.mod ? animalInfo.mod.tag : '· '+mt;
    var myIlju = saju.P[2].s + saju.P[2].b;

    // result.animal 세팅 (shareKakao 등에서 사용)
    if(!result.animal) {
      var _cond = '신강';
      if(gg.isJonggyeok||gg.isHwakyeok) _cond = '특수';
      else if(gg.strengthGrade==='신약'||gg.strengthGrade==='극신약') _cond = '신약';
      result.animal = { oheng: saju.dmEl||'토', dominant_sipsung: gg.dominant[0]||'비겁', condition: _cond };
    }

    window._lastAIResult = result;
    window._lastSaju = saju;
    window._lastIsAI = isAI;
    if (typeof updateHomeProfile === 'function') setTimeout(updateHomeProfile, 100);

    var record = {
      id: String(Date.now())+'_'+String(Math.random()).slice(2,8),
      name: (ST.name||'나'), date: dateStr,
      input: {y:ST.y,m:ST.m,d:ST.d,h:ST.h,min:ST.min,gender:ST.gender,city:ST.city||'',cityLng:ST.cityLng||0,ch:ST.ch||null,it:ST.it||null},
      isMyProfile: window._isMyProfile||false,
      saju: saju, dw: window._lastDW, gg: gg, mbti: mt,
      mbtiObj: window._lastMBTIObj, aiResult: result, isAI: isAI,
      animal: result.animal||null, animalIcon: myIcon, animalTag: myTag,
      animalIlju: myIlju, animalOneLine: animalInfo&&animalInfo.mod?animalInfo.mod.oneLine:''
    };
    hist.push(record);
    localStorage.setItem('mbts_history', JSON.stringify(hist));
    if(hist.length===1) localStorage.setItem('mbts_fortuneTarget', record.id);
  } catch(e3) { console.warn('[PROGRESSIVE] 히스토리 저장 실패:', e3); }

  _progState = null;
  console.log('[PROGRESSIVE] 완료');
}

// ====================================================================
// renderResult — 분석 결과 렌더링 (mbts.html 5985-6239 기반)
// ====================================================================
function renderResult(result,saju,mt,gg,isAI){
  tipColorIndex=0;
  if(result._blueprint) delete result._blueprint;
  var ti=TY[mt]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};
  gg=gg||analyzeGyeokguk(saju);

  /* ── 구버전 JSON 호환 (mkFB fallback) ── */
  var isOld=result.categories&&result.categories[0]&&result.categories[0].items;
  if(isOld){
    var _ci=["🔥","💘","💼","⚡","🔮"];
    var _cid=["me","love","career","year","future"];
    result.categories=result.categories.map(function(cat,ci){
      return{id:_cid[ci]||("cat"+ci),title:cat.title,subtitle:cat.subtitle,icon:_ci[ci]||"📋",
        subs:(cat.items||[]).map(function(item){
          var bdy=(item.content||'');
          if(item.insightText)bdy+='\n\n'+(item.insightIcon||'💡')+' '+item.insightText;
          return{h:item.catch||item.title||'',b:bdy};
        })};
    });
    if(!result.animal)result.animal={oheng:saju.dmEl||'토',dominant_sipsung:'비겁',condition:gg.strengthGrade==='신약'?'신약':'신강'};
    if(!result.oneLine)result.oneLine=result.quote||'';
    if(!result.profile)result.profile={};
  }

  var cats=result.categories||[];
  var prof=result.profile||{};

  /* ── 동물 카드 데이터 ── */
  if(!result.animal){
    var _cond='신강';
    if(gg.isJonggyeok||gg.isHwakyeok) _cond='특수';
    else if(gg.strengthGrade==='신약'||gg.strengthGrade==='극신약') _cond='신약';
    result.animal={oheng:saju.dmEl||'토', dominant_sipsung:gg.dominant[0]||'비겁', condition:_cond};
  }
  var animalInfo=null;
  if(result.animal){animalInfo=getAnimalResult(result.animal.oheng,result.animal.dominant_sipsung,result.animal.condition);}
  var ohD=animalInfo?animalInfo.ohengData:OHENG_DATA[0];

  /* ── 배지 ── */
  var bdgS='display:inline-block;padding:3px 10px;font-size:10px;font-weight:600;border-radius:8px;margin:2px';
  var trueSolarBadge=saju.trueSolarApplied?'<span style="'+bdgS+';background:rgba(70,130,180,.1);color:#4682b4">🌍 진태양시 ('+ST.city+' '+(saju.trueSolarMin>0?'+':'')+saju.trueSolarMin+'분)</span>':'';
  var pagyeokBadge=gg.pagyeokInfo?'<span style="'+bdgS+';background:rgba(211,47,47,.1);color:#d32f2f">⚠️ '+gg.pagyeokInfo.split(' — ')[0]+'</span>':'';
  var aiBadge=isAI?'<span style="'+bdgS+';background:rgba(46,139,87,.1);color:#2e8b57">✨ AI 프리미엄</span>':'<span style="'+bdgS+';background:rgba(201,154,46,.1);color:#c99a2e">📋 기본 분석</span>';

  /* ── 오행 클래스맵 ── */
  var elCls={'목':'el-wood','화':'el-fire','토':'el-earth','금':'el-metal','수':'el-water'};
  var RDC=['#5B8FD4','#2e8b57','#88619A','#c99a2e'];

  /* ── HTML 빌드 ── */
  var pg=document.getElementById('pgRes');
  pg.style.background='var(--bg)';pg.style.color='var(--text-1)';

  var h='<div class="res-wrap">';

  /* ① Header */
  h+='<div class="res-header">';
  h+='<div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">';
  h+='<button onclick="history.back()" style="background:none;border:none;font-size:15px;color:var(--purple);cursor:pointer;padding:4px 0;font-family:inherit;font-weight:600;display:flex;align-items:center;gap:4px"><span style="font-size:18px">←</span> 뒤로</button>';
  h+='<div style="flex:1"></div>';
  h+='<div class="logo-sm" style="cursor:pointer" onclick="go(\'pgDash\')"><span style="color:#4CAF7D">M</span><span style="color:#5B8FD4">B</span><span style="color:#E05A5A">T</span><span style="color:#E8B84B">S</span></div>';
  h+='</div>';
  h+='<p style="font-size:12px;color:var(--text-3);margin-bottom:4px">';
  h+=ST.y+'년 '+ST.m+'월 '+ST.d+'일 '+(ST.h?ST.h+'시':'')+(ST.min?ST.min+'분':'')+' · '+ST.gender;
  h+=(prof.seasonNote?' · '+prof.seasonNote:(saju.currentJeolgi?' · 절기: '+saju.currentJeolgi:''));
  h+='</p>';
  h+='<div style="display:flex;align-items:center;justify-content:space-between">';
  h+='<button onclick="go(\'pgDash\')" style="font-size:14px;font-weight:600;color:var(--purple);cursor:pointer;background:none;border:none;padding:0">← 돌아가기</button>';
  h+='<div style="font-size:13px;font-weight:600;color:var(--text-2)">당신이라는 사람</div>';
  h+='<div style="width:80px"></div>';
  h+='</div>';
  h+='</div>';

  /* ② Animal Card */
  if(animalInfo&&animalInfo.mod){
    var mod=animalInfo.mod;
    var gFrom=ohD.color,gTo=adjustColor(ohD.color,0.65);
    h+='<div id="animal-card-capture" class="r-animal" style="background:linear-gradient(135deg,'+gFrom+','+gTo+')">';
    var _anIconUrl2=getAnimalIconUrl(animalInfo.name);
    h+='<div class="r-animal-emoji">'+(_anIconUrl2?'<img src="'+_anIconUrl2+'" style="width:100%;height:100%;object-fit:contain" onerror="this.replaceWith(document.createTextNode(animalInfo.emoji))">':animalInfo.emoji)+'</div>';
    var _aTitle=mod.title;
    if(TITLE_OVERRIDE[_aTitle])_aTitle=TITLE_OVERRIDE[_aTitle];
    h+='<div class="r-animal-tag">'+mod.tag+'</div>';
    h+='<div class="r-animal-title">'+_aTitle+'</div>';
    h+='<div class="r-animal-desc">'+mod.desc+'</div>';
    h+='<div class="r-animal-traits">';
    (mod.traits||[]).forEach(function(t){h+='<span class="r-animal-trait">#'+t+'</span>';});
    h+='</div>';
    h+='<div class="r-animal-rx">💊 '+mod.rx+'</div>';
    h+='<div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;gap:6px">';
    h+='<span style="font-family:Nunito,sans-serif;font-weight:800;font-size:14px;color:rgba(255,255,255,0.5)">MBTS</span>';
    h+='<span style="font-size:10px;color:rgba(255,255,255,0.3)">사주×MBTI 운명 분석</span>';
    h+='</div>';
    h+='</div>';
  }

  /* ③ Share Row */
  h+='<div class="r-share-row">';
  h+='<button class="r-share-btn" onclick="captureAnimalCard()" style="flex:1">📷 이미지 저장</button>';
  h+='<button class="r-share-btn" onclick="shareKakao()" style="flex:1;background:#FEE500;color:#191919;border-color:#FEE500;font-weight:700">💬 카카오톡 공유</button>';
  h+='</div>';

  /* ④ MBTI 카드 (별도) */
  h+='<div class="r-profile">';
  h+='<div class="r-mbti-area">';
  var mbtiType=prof.mbtiType||mt;
  var mbtiName=prof.mbtiName||ti.n;
  var mbtiFuncs=prof.mbtiFunctions||ti.cf;
  h+='<div class="r-mbti-letters">';
  mbtiType.split('').forEach(function(l,i){h+='<span style="color:'+RDC[i]+'">'+l+'</span>';});
  h+='</div>';
  h+='<div class="r-mbti-name">'+mbtiName+'</div>';
  h+='<div class="r-mbti-cf">인지기능: '+mbtiFuncs+'</div>';
  h+='<div class="r-mbti-tags">';
  if(prof.mbtiTags&&prof.mbtiTags.length>0){
    prof.mbtiTags.forEach(function(tag){h+='<span class="r-mbti-tag">'+tag+'</span>';});
  }else{
    ST.ch.forEach(function(c,i){
      var lb=c==='L'?DM_AX[i].Ll:DM_AX[i].Rl;var lv=strLv(ST.it[i]);
      h+='<span class="r-mbti-tag">'+lv+' '+lb+'</span>';
    });
  }
  h+='</div>';
  h+='</div>';
  h+='</div>';

  /* ⑤ 만세력 카드 (별도) */
  h+='<div class="r-profile">';
  h+='<div class="r-profile-title">📜 만 세 력</div>';
  h+='<div style="text-align:center;padding:0 16px 12px;display:flex;gap:6px;justify-content:center;flex-wrap:wrap">'+aiBadge+trueSolarBadge+pagyeokBadge+'</div>';

  /* 4기둥 그리드 */
  h+='<div class="r-pil-grid">';
  if(!prof.pillars||prof.pillars.length===0){
    var _pillarLabels=['시주','일주','월주','연주'];
    var _pillarKeys=[['hg','hj'],['dg','dj'],['mg','mj'],['yg','yj']];
    prof.pillars=_pillarLabels.map(function(label,pi){
      var gKey=_pillarKeys[pi][0], jKey=_pillarKeys[pi][1];
      var gIdx=saju.raw[gKey], jIdx=saju.raw[jKey];
      return {
        label:label,
        chun:(gIdx!=null?TGAN_KR[gIdx]:''),
        chunOheng:(gIdx!=null?OHAENG_TGAN[gIdx]:''),
        ji:(jIdx!=null?JIJI_KR[jIdx]:''),
        jiOheng:(jIdx!=null?OHAENG_JIJI[jIdx]:''),
        sipsung:(saju.ss[pi]?saju.ss[pi].ss:''),
        unyeong:(saju.uns?saju.uns[pi]:''),
        isDay:(pi===1)
      };
    });
  }
  if(!prof.ohengBalance||prof.ohengBalance.length===0){
    var _ohEmoji={'목':'🌿','화':'🔥','토':'🪨','금':'⚔️','수':'🌊'};
    prof.ohengBalance=['목','화','토','금','수'].map(function(oh){
      return {name:oh, count:saju.el[oh]||0, emoji:_ohEmoji[oh]};
    });
  }
  if(prof.pillars&&prof.pillars.length===4&&prof.pillars[0].chun){
    prof.pillars.forEach(function(pil){
      var isDay=!!pil.isDay;
      var cEl=pil.chunOheng||'',jEl=pil.jiOheng||'';
      var cCls=elCls[cEl]||'',jCls=elCls[jEl]||'';
      var cChar=(pil.chun||'').replace(/\(.*?\)/g,'').trim();
      var jChar=(pil.ji||'').replace(/\(.*?\)/g,'').trim();
      h+='<div class="r-pil-box'+(isDay?' r-pil-day':'')+'">';
      h+='<div class="r-pil-label">'+pil.label+'</div>';
      h+='<div class="r-pil-stem '+cCls+'">'+cChar+'</div>';
      h+='<div class="r-pil-info">'+cEl+'</div>';
      h+='<div class="r-pil-ss">'+(pil.sipsung||'')+'</div>';
      if(pil.unyeong)h+='<div class="r-pil-un">'+pil.unyeong+'</div>';
      h+='<div class="r-pil-div"></div>';
      h+='<div class="r-pil-branch '+jCls+'">'+jChar+'</div>';
      h+='<div class="r-pil-info">'+jEl+'</div>';
      if(pil.jiji)h+='<div class="r-pil-jiji">'+pil.jiji+'</div>';
      h+='</div>';
    });
  }else{
    var pRev=[saju.P[3],saju.P[2],saju.P[1],saju.P[0]];
    var ssRev=[saju.ss[3],saju.ss[2],saju.ss[1],saju.ss[0]];
    var unsRev=[saju.uns[3],saju.uns[2],saju.uns[1],saju.uns[0]];
    pRev.forEach(function(p,i){
      var sOh=p.gi!=null?OHAENG_TGAN[p.gi]:'',bOh=p.bi!=null?OHAENG_JIJI[p.bi]:'';
      var isDay=i===1;
      h+='<div class="r-pil-box'+(isDay?' r-pil-day':'')+'">';
      h+='<div class="r-pil-label">'+p.l+'</div>';
      h+='<div class="r-pil-stem '+(elCls[sOh]||'')+'">'+p.s+'</div>';
      h+='<div class="r-pil-info">'+sOh+'</div>';
      h+='<div class="r-pil-ss">'+(ssRev[i]?ssRev[i].ss:'')+'</div>';
      if(unsRev[i])h+='<div class="r-pil-un">'+unsRev[i]+'</div>';
      h+='<div class="r-pil-div"></div>';
      h+='<div class="r-pil-branch '+(elCls[bOh]||'')+'">'+p.b+'</div>';
      h+='<div class="r-pil-info">'+bOh+'</div>';
      h+='</div>';
    });
  }
  h+='</div>';

  /* 오행 바 */
  h+='<div class="r-oh-bar">';
  if(prof.ohengBalance&&prof.ohengBalance.length===5&&prof.ohengBalance[0].count!=null){
    prof.ohengBalance.forEach(function(ob){
      var od=OHENG_DATA.filter(function(o){return o.key===ob.name;})[0]||{};
      h+='<div class="r-oh-item">';
      h+='<div class="r-oh-dot" style="background:'+(ob.count>0?od.bg:'#f5f5f5')+';border:2px solid '+(ob.count>0?od.color:'#eee')+'">'+(ob.emoji||od.emoji||'')+'</div>';
      h+='<div class="r-oh-lbl" style="color:'+(od.color||'#999')+'">'+ob.name+' '+ob.count+'</div>';
      h+='</div>';
    });
  }else{
    ['목','화','토','금','수'].forEach(function(e){
      var c=saju.el[e]||0;
      var od=OHENG_DATA.filter(function(o){return o.key===e;})[0]||{};
      h+='<div class="r-oh-item">';
      h+='<div class="r-oh-dot" style="background:'+(c>0?od.bg:'#f5f5f5')+';border:2px solid '+(c>0?od.color:'#eee')+'">'+(od.emoji||EJ[e]||'')+'</div>';
      h+='<div class="r-oh-lbl" style="color:'+(od.color||'#999')+'">'+e+' '+c+'</div>';
      h+='</div>';
    });
  }
  h+='</div>';

  /* 특수신살 */
  var stars=prof.specialStars||(saju.specialSals?saju.specialSals.map(function(s){return s.name;}):[]);
  if(stars.length>0){
    h+='<div class="r-sal-tags">';
    stars.forEach(function(s){h+='<span class="r-sal-tag">'+s+'</span>';});
    h+='</div>';
  }
  h+='</div>';

  /* ⑥ 용어집 버튼+패널 */
  var _ssDescMap={'비견':'나와 같은 에너지 · 형제자매, 친구, 동료','겁재':'경쟁하는 에너지 · 라이벌, 빼앗김, 도전','식신':'표현력과 창작 에너지 · 재능, 먹거리, 자녀','상관':'반항과 예술의 에너지 · 끼, 반골 기질, 창의력','편재':'움직이는 재물 · 투자, 유동자산, 아버지','정재':'안정적인 재물 · 월급, 고정 수입, 배우자','편관':'나를 통제하는 에너지 · 직장 상사, 압박, 규율','정관':'나를 바르게 다스리는 에너지 · 명예, 규칙, 사회적 지위','편인':'나를 키우는 이질적 에너지 · 이색 학문, 특이한 재능','정인':'나를 보호하는 에너지 · 어머니, 학업, 지식'};
  var _salDescMap={'역마살':'이동과 변화가 잦은 운 · 해외, 이사, 출장이 많음','도화살':'매력과 이성운 · 사람을 끄는 힘, 예술적 감각','화개살':'예술과 영적 감각 · 종교, 철학, 학문에 끌림','천을귀인':'귀인의 도움 · 어려울 때 도와주는 사람이 나타남','천덕귀인':'하늘의 덕 · 큰 위기에서 구해주는 보호막','월덕귀인':'달의 덕 · 일상에서 작은 행운이 따름','양인살':'날카로운 의지 · 전문직·무술·승부에 강함','백호살':'강렬한 기운 · 사고수, 강한 카리스마','괴강살':'극강의 에너지 · 리더십, 고집, 성공 또는 극단','공망':'비어있는 자리 · 해당 영역에서 허탈감·채워지지 않는 느낌'};
  /* A) 이 사주에 실제 있는 십성만 추출 (중복 제거) */
  var _mySS=[];
  var _ssSet={};
  if(saju.ss&&saju.ss.length){
    saju.ss.forEach(function(item){
      var name=typeof item==='object'?item.ss:item;
      if(name&&!_ssSet[name]){_ssSet[name]=true;_mySS.push(name);}
    });
  }
  /* B) 이 사주에 실제 있는 신살만 추출 */
  var _mySals=[];
  var _salSet={};
  var _salSrc=saju.specialSals||[];
  _salSrc.forEach(function(s){
    var name=typeof s==='object'?s.name:s;
    if(name&&!_salSet[name]){_salSet[name]=true;_mySals.push(name);}
  });
  h+='<div style="margin:0 16px 20px">';
  h+='<button id="sajuTermToggle" onclick="toggleSajuTerms()" style="width:100%;padding:14px 20px;background:#fff;border:1px solid var(--border);border-radius:20px;font-size:14px;font-weight:600;color:var(--text-2);cursor:pointer;display:flex;align-items:center;justify-content:space-between;box-shadow:0 2px 12px rgba(0,0,0,.04);transition:all .3s">';
  h+='<span>📖 내 사주 용어 사전</span>';
  h+='<span id="sajuTermArrow" style="transition:transform .3s;font-size:12px">▼</span>';
  h+='</button>';
  h+='<div id="sajuTermPanel" style="max-height:0;overflow:hidden;transition:max-height .5s cubic-bezier(.4,0,.2,1)">';
  h+='<div style="padding:16px 0 0">';
  /* 십성 카드 — 관측된 것만 */
  if(_mySS.length>0){
  h+='<div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:10px;box-shadow:0 1px 6px rgba(0,0,0,.03)">';
  h+='<div style="font-size:13px;font-weight:700;color:var(--purple);margin-bottom:12px;letter-spacing:1px">🏷️ 십성 — 나와 세상의 관계</div>';
  h+='<div style="display:flex;flex-wrap:wrap;gap:8px">';
  _mySS.forEach(function(name){
    var desc=_ssDescMap[name]||'';
    h+='<div style="display:flex;align-items:flex-start;gap:10px;width:100%"><span style="flex-shrink:0;background:rgba(139,108,193,.08);color:var(--purple);font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px">'+name+'</span><span style="font-size:13px;color:var(--text-2);line-height:1.6">'+desc+'</span></div>';
  });
  h+='</div>';
  h+='</div>';
  }
  /* 특수신살 카드 — 관측된 것만 */
  if(_mySals.length>0){
  h+='<div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:10px;box-shadow:0 1px 6px rgba(0,0,0,.03)">';
  h+='<div style="font-size:13px;font-weight:700;color:var(--purple);margin-bottom:12px;letter-spacing:1px">⭐ 특수신살 — 특수한 기운</div>';
  h+='<div style="display:flex;flex-direction:column;gap:10px">';
  _mySals.forEach(function(name){
    var desc=_salDescMap[name]||name;
    h+='<div style="display:flex;align-items:flex-start;gap:10px"><span style="flex-shrink:0;background:rgba(139,108,193,.08);color:var(--purple);font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px">'+name+'</span><span style="font-size:13px;color:var(--text-2);line-height:1.6">'+desc+'</span></div>';
  });
  h+='</div>';
  h+='</div>';
  }
  /* 격국·용신 카드 — 실제 분석값 표시 */
  h+='<div style="background:#fff;border:1px solid var(--border);border-radius:16px;padding:18px;margin-bottom:10px;box-shadow:0 1px 6px rgba(0,0,0,.03)">';
  h+='<div style="font-size:13px;font-weight:700;color:var(--purple);margin-bottom:12px;letter-spacing:1px">🔮 격국·용신 — 사주의 구조</div>';
  h+='<div style="display:flex;flex-direction:column;gap:10px">';
  h+='<div style="display:flex;align-items:flex-start;gap:10px"><span style="flex-shrink:0;background:rgba(139,108,193,.08);color:var(--purple);font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px">격국</span><span style="font-size:13px;color:var(--text-2);line-height:1.6">'+(gg.gyeokgukName||'미상')+(gg.gyeokgukDesc?' — '+gg.gyeokgukDesc:'')+'</span></div>';
  h+='<div style="display:flex;align-items:flex-start;gap:10px"><span style="flex-shrink:0;background:rgba(139,108,193,.08);color:var(--purple);font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px">용신</span><span style="font-size:13px;color:var(--text-2);line-height:1.6">'+(gg.yongshin||'미상')+'</span></div>';
  h+='<div style="display:flex;align-items:flex-start;gap:10px"><span style="flex-shrink:0;background:rgba(139,108,193,.08);color:var(--purple);font-size:12px;font-weight:700;padding:4px 10px;border-radius:8px">신강/신약</span><span style="font-size:13px;color:var(--text-2);line-height:1.6">'+(gg.strengthGrade||'미상')+(gg.strengthScore!=null?' (점수: '+gg.strengthScore+')':'')+'</span></div>';
  h+='</div>';
  h+='</div>';
  /* 달토 미니 CTA */
  h+='<div onclick="startChatFromResult()" style="margin-top:10px;padding:14px 18px;border-radius:16px;background:linear-gradient(135deg,rgba(139,108,193,0.08),rgba(139,108,193,0.03));border:1px solid rgba(139,108,193,0.12);text-align:center;cursor:pointer">';
  h+='<div style="font-size:13px;color:var(--purple);font-weight:600">🐰 사주 용어 더 궁금한 게 있다면? 달토에게 물어봐!</div>';
  h+='</div>';
  h+='</div>';
  h+='</div>';
  h+='</div>';

  /* ⑤ Category Nav (sticky) */
  if(cats.length>0){
    h+='<div class="r-cat-nav" id="r-cat-nav"><div class="r-cat-nav-inner" id="r-cat-nav-inner">';
    cats.forEach(function(cat,ci){
      h+='<div class="r-cat-pill'+(ci===0?' active':'')+'" data-cat="'+cat.id+'" onclick="scrollToCat(\''+cat.id+'\')">';
      h+=(cat.icon||'')+' '+cat.title+'</div>';
    });
    h+='</div></div>';

    /* ⑥ Category Sections */
    cats.forEach(function(cat,ci){
      h+='<div class="r-cat-sec" id="cat-'+cat.id+'" data-cat-id="'+cat.id+'">';
      h+='<div class="r-cat-head">';
      h+='<div class="r-cat-num">'+String(ci+1).padStart(2,'0')+'</div>';
      h+='<div class="r-cat-title-row"><span class="r-cat-icon">'+(cat.icon||'')+'</span><span class="r-cat-title">'+cat.title+'</span></div>';
      if(cat.subtitle)h+='<div class="r-cat-sub">'+cat.subtitle+'</div>';
      h+='</div>';
      (cat.subs||[]).forEach(function(sub){
        h+='<div class="r-sub">';
        h+='<div class="r-sub-h">'+(sub.h||'')+'</div>';
        h+='<div class="r-sub-b">'+renderSubBody(sub.b)+'</div>';
        if(sub.tip){
          var _tc=tipPalette[tipColorIndex%tipPalette.length];
          tipColorIndex++;
          h+='<div style="border-radius:12px;padding:14px 16px;margin:12px 0;font-size:13px;line-height:1.85;background:'+_tc.bg+';border-left:3px solid '+_tc.border+';color:var(--text-2)">'
            +sub.tip
            +'</div>';
        }
        h+='</div>';
      });
      h+='</div>';
    });
  }

  /* ⑦ OneLine */
  if(result.oneLine){
    h+='<div class="r-oneline">';
    h+='<div class="r-oneline-label">YOUR LIFE IN ONE LINE</div>';
    h+='<div class="r-oneline-text">'+(result.oneLine||'').replace(/\\n/g,'<br>').replace(/\n/g,'<br>')+'</div>';
    h+='</div>';
  }

  /* ⑧ CTA */
  h+='<div class="r-cta">';
  h+='<div class="r-cta-row">';
  h+='<button class="r-cta-btn" onclick="go(\'pgGunghap\')" style="background:rgba(232,69,60,.1);color:#E8453C">💕 궁합 보러가기</button>';
  h+='<button class="r-cta-btn" onclick="shareKakao()" style="background:#FEE500;color:#191919">💬 카카오 공유</button>';
  h+='</div>';
  /* 달토 CTA 카드 */
  h+='<div style="margin:16px 0;padding:22px 18px;border-radius:20px;background:linear-gradient(135deg,rgba(139,108,193,0.08),rgba(139,108,193,0.03));border:1px solid rgba(139,108,193,0.12);text-align:center">';
  h+='<div style="font-size:40px;margin-bottom:8px">🐰</div>';
  h+='<div style="font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:4px">이런 거 더 궁금하지 않으세요?</div>';
  h+='<div style="font-size:12px;color:var(--text-3);margin-bottom:14px">대운 흐름, 월별 운세, 구체적 시기까지<br>달토가 1:1로 알려드려요</div>';
  h+='<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;text-align:left">';
  h+='<div onclick="askDalto(\'나랑 잘 맞는 MBTI가 뭐야?\')" style="padding:10px 16px;border-radius:100px;background:rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.12);color:var(--purple);font-size:13px;font-weight:500;cursor:pointer">💬 "나랑 잘 맞는 MBTI가 뭐야?"</div>';
  h+='<div onclick="askDalto(\'올해 이직하면 어떻게 돼?\')" style="padding:10px 16px;border-radius:100px;background:rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.12);color:var(--purple);font-size:13px;font-weight:500;cursor:pointer">💬 "올해 이직하면 어떻게 돼?"</div>';
  h+='<div onclick="askDalto(\'내 사주에서 가장 강한 게 뭐야?\')" style="padding:10px 16px;border-radius:100px;background:rgba(139,108,193,0.08);border:1px solid rgba(139,108,193,0.12);color:var(--purple);font-size:13px;font-weight:500;cursor:pointer">💬 "내 사주에서 가장 강한 게 뭐야?"</div>';
  h+='</div>';
  h+='<button class="r-cta-btn" onclick="startChatFromResult()" style="width:100%;background:var(--purple);color:#fff;box-shadow:0 4px 15px rgba(139,108,193,0.25)">🐰 달토에게 물어보기</button>';
  h+='</div>';
  h+='<p style="margin-top:16px;font-size:11px;color:var(--text-3);opacity:.8">본 풀이는 명리학과 MBTI 이론을 기반한 참고용 분석이며,<br>개인의 의사결정을 대체하지 않습니다.</p>';
  h+='</div>';

  h+='<div style="height:80px"></div>';
  h+='</div>';

  pg.innerHTML=h;
  pg.style.display='flex';pg.style.opacity='0';
  setTimeout(function(){pg.style.transition='opacity .8s';pg.style.opacity='1';},50);
  document.querySelectorAll('.page').forEach(function(p2){if(p2.id!=='pgRes')p2.style.display='none';});
  setTimeout(function(){initCatNav();},300);

  /* ── 분석 결과 자동 저장 → personMap['나'] + 대시보드 카드 갱신 ── */
  var myIcon=animalInfo?getAnimalIconUrl(animalInfo.name):'';
  var myTag=animalInfo&&animalInfo.mod?animalInfo.mod.tag:'· '+mt;
  var myIlju=(saju&&saju.P&&saju.P[2])?(saju.P[2].s+saju.P[2].b+'일주'):'';
  personMap['나']={name:'나',icon:myIcon,tag:myTag,saju:saju,dw:window._lastDW,gg:gg,mbtiObj:window._lastMBTIObj};
  personMap.me=personMap['나'];
  try{localStorage.setItem('mbts_personMap',JSON.stringify(personMap));}catch(e){}
  var meCard=document.querySelector('.gh-people-list .mini-person');
  if(meCard&&meCard.querySelector('.mini-name')&&meCard.querySelector('.mini-name').textContent.trim()==='나'){
    var _meEmojiEl=meCard.querySelector('.mini-emoji');
    if(myIcon) _meEmojiEl.innerHTML='<img src="'+myIcon+'" style="width:70%;height:70%;object-fit:contain" onerror="this.parentNode.textContent=\'🌟\'">'; else _meEmojiEl.textContent='🌟';
    var subEl=meCard.querySelector('.mini-sub');
    if(subEl) subEl.textContent=myTag+(myIlju?' · '+myIlju:'');
    meCard.onclick=function(){pickPerson(meCard,myIcon,'나',myTag);};
  }

  /* ── 히스토리 localStorage 저장 ── */
  if(!window._skipHistorySave) try{
    var hist=[];
    try{hist=JSON.parse(localStorage.getItem('mbts_history'))||[];}catch(e2){}
    var now=new Date();
    var dateStr=now.getFullYear()+'.'+(now.getMonth()+1<10?'0':'')+(now.getMonth()+1)+'.'+(now.getDate()<10?'0':'')+now.getDate();
    var record={
      id:String(Date.now())+'_'+String(Math.random()).slice(2,8),
      name:(ST.name||'나'),
      date:dateStr,
      input:{y:ST.y,m:ST.m,d:ST.d,h:ST.h,min:ST.min,gender:ST.gender,city:ST.city,cityLng:ST.cityLng,ch:ST.ch||null,it:ST.it||null},
      isMyProfile: window._isMyProfile||false,
      saju:saju,
      dw:window._lastDW,
      gg:gg,
      mbti:mt,
      mbtiObj:window._lastMBTIObj,
      aiResult:result,
      isAI:isAI,
      animal:result.animal||null,
      animalIcon:myIcon,
      animalTag:myTag,
      animalIlju:myIlju,
      animalOneLine:animalInfo&&animalInfo.mod?animalInfo.mod.oneLine:''
    };
    hist.push(record);
    localStorage.setItem('mbts_history',JSON.stringify(hist));
    // 첫 분석이면 자동으로 fortuneTarget 설정
    if(hist.length===1){
      localStorage.setItem('mbts_fortuneTarget',record.id);
    }
  }catch(e3){}
}

// ====================================================================
// 결과 공유 & 초기화
// ====================================================================
async function shareResult() {
  if (window._lastGunghapRenderData) {
    var r = window._lastGunghapRenderData;
    var titleText = '';
    if (r.aiR && r.aiR.title) titleText = r.aiR.title;
    else titleText = r.sajuA.P[2].s + r.sajuA.P[2].b + ' × ' + r.sajuB.P[2].s + r.sajuB.P[2].b + ' 궁합';
    var preview = {
      title: '💕 ' + titleText,
      desc: r.aiR && r.aiR.quote ? r.aiR.quote : '두 사람의 궁합을 확인해보세요',
      image: 'https://mbts.kr/animals/FiLiS.png',
      mbti: (r.mbtiA ? r.mbtiA.type : '') + '×' + (r.mbtiB ? r.mbtiB.type : '')
    };
    var result = await MBTSShare.save('gunghap', r, preview);
    if (!MBTSShare.sendKakao(result.url, preview)) {
      MBTSShare.fallbackShare(result.url, preview);
    }
    return;
  }
  shareKakao();
}
function resetAll(){
  localStorage.removeItem('mbts_lastResult');
  window._lastSaju=null;window._lastDW=null;window._lastGG=null;
  window._lastMBTI=null;window._lastMBTIObj=null;
  window._lastAIResult=null;window._lastIsAI=null;
  ST={y:"",m:"",d:"",h:"",min:"",gender:"",city:"",cityLng:0,ch:[null,null,null,null],it:[null,null,null,null],cur:0};
  var fields=['bYear','bMonthInput','bDayInput','bHourInput','bMinInput','bCityInput'];
  fields.forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  var hFields=['bMonth','bDay','bHour','bMin','bCity'];
  hFields.forEach(function(id){var el=document.getElementById(id);if(el)el.value='';});
  birthGender='';
  var bm=document.getElementById('bMale');if(bm){bm.style.borderColor='rgba(255,255,255,0.6)';bm.style.background='rgba(255,255,255,0.45)';bm.style.color='#9B8CB8';bm.style.boxShadow='none';}
  var bf=document.getElementById('bFemale');if(bf){bf.style.borderColor='rgba(255,255,255,0.6)';bf.style.background='rgba(255,255,255,0.45)';bf.style.color='#9B8CB8';bf.style.boxShadow='none';}
  var timeArea=document.getElementById('timeInputArea');
  var timeCard=document.getElementById('noTimeCard');
  if(timeArea)timeArea.style.display='block';
  if(timeCard)timeCard.style.display='none';
  var cityArea=document.getElementById('cityInputArea');
  var cityCard=document.getElementById('noCityCard');
  if(cityArea)cityArea.style.display='block';
  if(cityCard)cityCard.style.display='none';
  var btn=document.getElementById('birthNextBtn');if(btn)btn.classList.remove('ready');
  var shim=document.getElementById('birthShimmer');if(shim)shim.style.display='none';
  document.getElementById('pgRes').innerHTML='';
  go('pgDash');
}

// ====================================================================
// 달토 채팅 시스템
// ====================================================================
// chatting.js가 채팅 기능을 담당 — 아래는 호출 호환용 stub
function initChatPage(){}
function enterChatRoom(){ go('pgChat'); }
function exitChatRoom(){ go('pgDash'); }
function startChatFromResult(){ go('pgChat'); }

// ====================================================================
// localStorage 복원
// ====================================================================
(function restoreLastResult(){
  try{
    var saved=localStorage.getItem('mbts_lastResult');
    if(!saved)return;
    var data=JSON.parse(saved);
    ST.y=data.input.y;ST.m=data.input.m;ST.d=data.input.d;
    ST.h=data.input.h;ST.min=data.input.min;
    ST.gender=data.input.gender;
    ST.city=data.input.city||'';ST.cityLng=data.input.cityLng||0;
    ST.ch=data.input.ch;ST.it=data.input.it;
    window._lastSaju=data.saju;window._lastDW=data.dw;window._lastGG=data.gg;
    window._lastMBTI=data.mbti;window._lastMBTIObj=data.mbtiObj;
    window._lastAIResult=data.aiResult;window._lastIsAI=data.isAI;
    console.log('[MBTS] localStorage에서 이전 분석 결과 복원됨');
  }catch(e){console.warn('[MBTS] localStorage 복원 실패:',e);}
})();

// 초기 히스토리 상태 설정
// ?s= 공유 파라미터 보존
var _shareParam = new URLSearchParams(window.location.search).get('s');
history.replaceState({page:'pgLanding'},'','');

// ===== 레퍼럴 코드 저장 =====
(function(){
  try{
    var params=new URLSearchParams(window.location.search);
    var ref=params.get('ref');
    if(ref&&ref.length>5){
      localStorage.setItem('mbts_referrer',ref);
      console.log('[MBTS] 레퍼럴 코드 저장:',ref);
      // URL에서 ref 파라미터 제거 (깔끔하게)
      if(window.history&&window.history.replaceState){
        var clean=window.location.pathname;
        window.history.replaceState({},'',clean);
      }
    }
  }catch(e){}
})();

// 카카오 SDK 초기화
if(typeof Kakao!=='undefined'&&!Kakao.isInitialized()){
  Kakao.init('f5a1da53c1f06fc97b3979ac9d7d3421');
  console.log('[MBTS] Kakao SDK 초기화 완료');
}

console.log('[MBTS] index.html bridge loaded — engine.js + UI connected');

// 세션 초기화
if (typeof initLogin === 'function') initLogin();
setTimeout(async function() {
  var _sp = new URLSearchParams(window.location.search);
  if (_sp.get('s')) return;

  if (typeof isLoggedIn === 'function' && isLoggedIn()) {
    await MBTSUser.load();
    await MBTSUser.loadHistory();
    cleanupMyProfile();
    go('pgDash');
    if (typeof renderSaveCards === 'function') setTimeout(renderSaveCards, 200);
    if (typeof updateLoginUI === 'function') updateLoginUI();
    if (typeof updateHomeProfile === 'function') setTimeout(updateHomeProfile, 100);
  }
}, 300);

// ===== Popup Notice (Supabase 직접 연결 예정) =====
function checkPopupNotice(){}

function closePopupNotice(){
  var todayCheck=document.getElementById('popupNoticeToday');
  if(todayCheck && todayCheck.checked){
    var today=new Date().toISOString().slice(0,10);
    try{ localStorage.setItem('mbts_popup_dismissed', today); }catch(e){}
  }
  document.getElementById('popupNoticeOverlay').classList.remove('open');
}

// 페이지 로드 1.5초 후 팝업 체크
setTimeout(function(){ checkPopupNotice(); }, 1500);


// ═══ main-init.js (363L) ═══
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

