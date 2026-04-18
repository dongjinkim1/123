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
