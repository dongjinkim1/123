(function() {
  'use strict';

  var svcMBTI = [null, null, null, null];
  var svcGender = null;
  var svcBirthData = {};
  var svcMbtiCur = 0;

  function renderAnimalPage() {
    svcMBTI = [null, null, null, null];
    svcGender = null;
    svcBirthData = {};
    svcMbtiCur = 0;
    svcRenderStep1();
  }

  // ══════════════════════════════════
  // STEP 1: 생년월일 + 성별 (pgBirth 복붙, 이름/시/분/출생지 제거)
  // ══════════════════════════════════
  function svcRenderStep1() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    var h = '';
    h += '<div style="padding:20px;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding-top:48px">';
    h += '<div class="birth-wrap">';

    // 뒤로가기
    h += '<button class="birth-back" onclick="go(\'pgDash\')">\u2190 \ub4a4\ub85c</button>';

    // 프로그레스 (2단계: 생년월일 → MBTI)
    h += '<div class="birth-progress">';
    h += '<div class="birth-step active"><div class="birth-step-icon">1</div></div>';
    h += '<div class="birth-progress-line" id="svc-bLine1"></div>';
    h += '<div class="birth-step" id="svc-bStep2"><div class="birth-step-icon">2</div></div>';
    h += '</div>';

    // 카드
    h += '<div class="birth-card">';
    h += '<div class="birth-title"><span>\uc0dd\ub144\uc6d4\uc77c</span>\uc744 \uc54c\ub824\uc8fc\uc138\uc694</div>';
    h += '<div class="birth-sub">\uc591\ub825 \uae30\uc900 \xb7 \ubb34\ub8cc\ub85c \ub0b4 \uc6b4\uba85 \ub3d9\ubb3c\uc744 \uc54c\uc544\ubcf4\uc138\uc694!</div>';

    // 년/월/일 (pgBirth와 동일 구조, id만 svc-)
    h += '<div class="birth-row">';
    h += '<div class="birth-field wide">';
    h += '<label class="birth-label">\ud0dc\uc5b4\ub09c \ud574</label>';
    h += '<div class="birth-combo">';
    h += '<input class="birth-input" type="number" id="svc-bYear" placeholder="\uc608: 1990" oninput="svcCheckBirthReady()">';
    h += '<span class="birth-combo-arrow" id="svc-bYearArrow" onclick="event.stopPropagation();svcToggleDrop(\'year\')">▼</span>';
    h += '</div>';
    h += '<div class="birth-dropdown" id="svc-dropYear"></div>';
    h += '</div>';
    h += '<div class="birth-field">';
    h += '<label class="birth-label">\uc6d4</label>';
    h += '<div class="birth-combo">';
    h += '<input class="birth-input" type="number" id="svc-bMonthInput" placeholder="\uc6d4" min="1" max="12" oninput="svcOnComboInput(\'month\')">';
    h += '<span class="birth-combo-arrow" id="svc-bMonthArrow" onclick="event.stopPropagation();svcToggleDrop(\'month\')">▼</span>';
    h += '</div>';
    h += '<input type="hidden" id="svc-bMonth">';
    h += '<div class="birth-dropdown" id="svc-dropMonth"></div>';
    h += '</div>';
    h += '<div class="birth-field">';
    h += '<label class="birth-label">\uc77c</label>';
    h += '<div class="birth-combo">';
    h += '<input class="birth-input" type="number" id="svc-bDayInput" placeholder="\uc77c" min="1" max="31" oninput="svcOnComboInput(\'day\')">';
    h += '<span class="birth-combo-arrow" id="svc-bDayArrow" onclick="event.stopPropagation();svcToggleDrop(\'day\')">▼</span>';
    h += '</div>';
    h += '<input type="hidden" id="svc-bDay">';
    h += '<div class="birth-dropdown" id="svc-dropDay"></div>';
    h += '</div>';
    h += '</div>';

    // 성별 (pgBirth와 동일)
    h += '<label class="birth-label">\uc131\ubcc4</label>';
    h += '<div class="birth-gender-row">';
    h += '<button class="birth-gender" id="svc-bMale" onclick="svcPickGender(\'\ub0a8\uc131\')">♂ \ub0a8\uc131</button>';
    h += '<button class="birth-gender" id="svc-bFemale" onclick="svcPickGender(\'\uc5ec\uc131\')">♀ \uc5ec\uc131</button>';
    h += '</div>';

    // 다음 버튼 (pgBirth와 동일)
    h += '<button id="svc-bNextBtn" class="ap-b-next" onclick="svcGoStep2()">\ub2e4\uc74c \u2192</button>';

    h += '</div>'; // birth-card
    h += '</div>'; // birth-wrap
    h += '</div>';

    pg.innerHTML = h;
    svcInitDropdowns();
  }

  // 드롭다운 초기화 (pgBirth 로직 복붙)
  function svcInitDropdowns() {
    // 월 드롭다운
    var dropMonth = document.getElementById('svc-dropMonth');
    if (dropMonth) {
      var mh = '';
      for (var i = 1; i <= 12; i++) mh += '<div class="birth-drop-item" onclick="svcSelectDrop(\'month\',' + i + ')">' + i + '\uc6d4</div>';
      dropMonth.innerHTML = mh;
    }
    // 일 드롭다운
    var dropDay = document.getElementById('svc-dropDay');
    if (dropDay) {
      var dh = '';
      for (var i = 1; i <= 31; i++) dh += '<div class="birth-drop-item" onclick="svcSelectDrop(\'day\',' + i + ')">' + i + '\uc77c</div>';
      dropDay.innerHTML = dh;
    }
    // 년도 드롭다운
    var dropYear = document.getElementById('svc-dropYear');
    if (dropYear) {
      var yh = '';
      for (var i = 2010; i >= 1940; i--) yh += '<div class="birth-drop-item" onclick="svcSelectDrop(\'year\',' + i + ')">' + i + '</div>';
      dropYear.innerHTML = yh;
    }
  }

  function svcToggleDrop(type) {
    var dropId = 'svc-drop' + type.charAt(0).toUpperCase() + type.slice(1);
    var drop = document.getElementById(dropId);
    if (!drop) return;
    var isOpen = drop.classList.contains('show');
    // 다른 드롭다운 닫기
    var allDrops = document.querySelectorAll('#pgAnimal .birth-dropdown');
    for (var i = 0; i < allDrops.length; i++) allDrops[i].classList.remove('show');
    var allArrows = document.querySelectorAll('#pgAnimal .birth-combo-arrow');
    for (var i = 0; i < allArrows.length; i++) allArrows[i].classList.remove('open');
    if (!isOpen) {
      drop.classList.add('show');
      var arrowId = 'svc-b' + type.charAt(0).toUpperCase() + type.slice(1) + 'Arrow';
      var arrow = document.getElementById(arrowId);
      if (arrow) arrow.classList.add('open');
    }
  }

  function svcSelectDrop(type, val) {
    if (type === 'month') {
      document.getElementById('svc-bMonth').value = val;
      document.getElementById('svc-bMonthInput').value = val;
    } else if (type === 'day') {
      document.getElementById('svc-bDay').value = val;
      document.getElementById('svc-bDayInput').value = val;
    } else if (type === 'year') {
      document.getElementById('svc-bYear').value = val;
    }
    svcToggleDrop(type); // 닫기
    svcCheckBirthReady();
  }

  function svcOnComboInput(type) {
    if (type === 'month') {
      var v = document.getElementById('svc-bMonthInput').value;
      document.getElementById('svc-bMonth').value = v;
    } else if (type === 'day') {
      var v = document.getElementById('svc-bDayInput').value;
      document.getElementById('svc-bDay').value = v;
    }
    svcCheckBirthReady();
  }

  function svcPickGender(g) {
    svcGender = g;
    var btnM = document.getElementById('svc-bMale');
    var btnF = document.getElementById('svc-bFemale');
    if (btnM) btnM.className = 'birth-gender' + (g === '\ub0a8\uc131' ? ' active' : '');
    if (btnF) btnF.className = 'birth-gender' + (g === '\uc5ec\uc131' ? ' active' : '');
    svcCheckBirthReady();
  }

  function svcCheckBirthReady() {
    var btn = document.getElementById('svc-bNextBtn');
    if (!btn) return;
    var y = document.getElementById('svc-bYear');
    var m = document.getElementById('svc-bMonth') || document.getElementById('svc-bMonthInput');
    var d = document.getElementById('svc-bDay') || document.getElementById('svc-bDayInput');
    var yVal = y ? y.value : '';
    var mVal = m ? m.value : '';
    var dVal = d ? d.value : '';
    var ready = yVal && mVal && dVal && svcGender;
    btn.className = ready ? 'ap-b-next ready' : 'ap-b-next';
  }

  function svcGoStep2() {
    var y = parseInt(document.getElementById('svc-bYear').value);
    var mEl = document.getElementById('svc-bMonth');
    var dEl = document.getElementById('svc-bDay');
    var m = parseInt(mEl && mEl.value ? mEl.value : document.getElementById('svc-bMonthInput').value);
    var d = parseInt(dEl && dEl.value ? dEl.value : document.getElementById('svc-bDayInput').value);
    if (!y || !m || !d || !svcGender) return;
    svcBirthData = { y: y, m: m, d: d, gender: svcGender };
    svcMbtiCur = 0;
    svcRenderStep2();
  }

  // ══════════════════════════════════
  // STEP 2: MBTI (pgMBTI renderMBTI 복붙, 강도 제거)
  // ══════════════════════════════════
  function svcRenderStep2() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    var cur = svcMbtiCur;
    var d = DM_AX[cur];
    var c = svcMBTI[cur];
    var ac = DC[cur];
    var bg = DB[cur];

    var h = '';
    h += '<div style="padding:20px;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding-top:48px;transition:background .4s">';
    h += '<div class="birth-wrap">';

    // 뒤로가기
    h += '<button class="birth-back" onclick="svcMbtiBack()">\u2190 \ub4a4\ub85c</button>';

    // Progress (renderMBTI 복붙)
    h += '<div style="display:flex;gap:4px;margin-bottom:20px">';
    h += '<div style="flex:1;height:4px;border-radius:2px;background:#5B8FD4"></div>';
    for (var i = 0; i < 4; i++) {
      h += '<div style="flex:1;height:4px;border-radius:2px;background:' + (i <= cur ? DC[i] : DC[i] + '30') + '"></div>';
    }
    h += '</div>';

    // Letters (renderMBTI 복붙)
    h += '<div style="display:flex;justify-content:center;gap:6px;margin-bottom:20px">';
    for (var i = 0; i < 4; i++) {
      var lt = svcMBTI[i] === null ? '?' : svcMBTI[i];
      h += '<div style="width:42px;height:50px;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:900;border-radius:10px;background:' + (i === cur ? DC[i] + '20' : (svcMBTI[i] ? DC[i] + '10' : 'rgba(0,0,0,0.04)')) + ';border:2.5px solid ' + (i === cur ? DC[i] : 'transparent') + ';color:' + (svcMBTI[i] ? DC[i] : 'var(--text-3)') + '">' + lt + '</div>';
    }
    h += '</div>';

    // Card (renderMBTI 복붙)
    h += '<div style="background:#fff;border:1px solid ' + ac + '65;border-radius:20px;box-shadow:0 2px 12px ' + ac + '18,0 0 0 1px ' + ac + '20;padding:28px 22px;transition:border-color .3s,box-shadow .3s">';
    h += '<div style="font-size:11px;color:var(--text-3);text-align:center;letter-spacing:1px;margin-bottom:4px">STEP ' + (cur + 1) + '/4</div>';
    h += '<div style="font-size:17px;font-weight:800;text-align:center;margin-bottom:16px;color:var(--text-1)">\ub2f9\uc2e0\uc740 \uc5b4\ub290 \ucabd\uc5d0 \uac00\uae5c\ub098\uc694?</div>';

    // Choices (renderMBTI 복붙)
    h += '<div style="display:flex;gap:10px;margin-bottom:18px">';
    var sides = ['L', 'R'];
    for (var si = 0; si < sides.length; si++) {
      var side = sides[si];
      var lb = side === 'L' ? d.Ll : d.Rl;
      var lt = side === 'L' ? d.L : d.R;
      var ds = side === 'L' ? d.Ld : d.Rd;
      var sel = c === side;
      var btnBg = sel ? 'linear-gradient(145deg,' + ac + '18,' + ac + '08)' : 'rgba(0,0,0,0.02)';
      var btnBdr = sel ? '2.5px solid ' + ac : '2.5px solid var(--border)';
      var gloss = sel ? '<div style="position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0));border-radius:14px 14px 0 0;pointer-events:none"></div>' : '';
      var shadow = sel ? ';box-shadow:0 4px 20px ' + ac + '25;position:relative;overflow:hidden' : '';
      h += '<button onclick="svcPickMBTI(\'' + side + '\')" style="flex:1;padding:20px 12px;background:' + btnBg + ';border:' + btnBdr + ';border-radius:16px;cursor:pointer;text-align:center;color:var(--text-1);font-family:inherit;transition:all .25s' + shadow + '">' + gloss;
      h += '<div style="font-size:34px;font-weight:900;color:' + (sel ? ac : 'var(--text-3)') + ';margin-bottom:6px;position:relative">' + lt + '</div>';
      h += '<div style="font-size:12.5px;font-weight:700;margin-bottom:4px;color:' + (sel ? ac : 'var(--text-2)') + ';position:relative">' + lb + '</div>';
      h += '<div style="font-size:11px;color:var(--text-3);line-height:1.5;position:relative">' + ds + '</div>';
      h += '</button>';
    }
    h += '</div>';

    // 강도 없음! 바로 선택하면 다음으로

    h += '</div>'; // card
    h += '</div>'; // birth-wrap
    h += '</div>';

    pg.innerHTML = h;
  }

  function svcPickMBTI(side) {
    var d = DM_AX[svcMbtiCur];
    svcMBTI[svcMbtiCur] = (side === 'L') ? d.L : d.R;
    // 선택 이펙트 보여주고 다음으로
    svcRenderStep2();
    setTimeout(function() {
      if (svcMbtiCur < 3) {
        svcMbtiCur++;
        svcRenderStep2();
      } else {
        svcDoAnalyze();
      }
    }, 350);
  }

  function svcMbtiBack() {
    if (svcMbtiCur > 0) {
      svcMBTI[svcMbtiCur] = null;
      svcMbtiCur--;
      svcRenderStep2();
    } else {
      svcRenderStep1();
    }
  }

  // ══════════════════════════════════
  // 분석 + 로딩
  // ══════════════════════════════════
  function svcDoAnalyze() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;
    var h = '';
    h += '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px">';
    h += '<div style="text-align:center">';
    h += '<div style="font-size:64px;margin-bottom:20px;animation:svcBounce 1s infinite">\ud83d\udd2e</div>';
    h += '<div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:8px">\ub2f9\uc2e0\uc758 \uc6b4\uba85 \ub3d9\ubb3c\uc744 \ucc3e\uace0 \uc788\uc5b4\uc694...</div>';
    h += '<div style="font-size:13px;color:var(--text-3)">MBTI \xd7 \uc0ac\uc8fc \uc870\ud569 \ubd84\uc11d \uc911</div>';
    h += '</div></div>';
    h += '<style>@keyframes svcBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}</style>';
    pg.innerHTML = h;

    setTimeout(function() {
      var b = svcBirthData;
      var mbtiStr = svcMBTI.join('');
      var saju = calcSajuForApp(b.y, b.m, b.d, null, null, null);
      if (!saju) { if (typeof showToast === 'function') showToast('\uc0ac\uc8fc \uacc4\uc0b0 \uc2e4\ud328'); return; }
      var gg = analyzeGyeokguk(saju);
      if (!gg) { if (typeof showToast === 'function') showToast('\uaca9\uad6d \ubd84\uc11d \uc2e4\ud328'); return; }
      var oheng = saju.dmEl;
      var dominantSS = gg.dominant[0];
      var condition = '\uc2e0\uac15';
      if (gg.isJonggyeok || gg.isHwakyeok) condition = '\ud2b9\uc218';
      else if (gg.strengthGrade === '\uc2e0\uc57d' || gg.strengthGrade === '\uadf9\uc2e0\uc57d') condition = '\uc2e0\uc57d';
      var animal = getAnimalResult(oheng, dominantSS, condition);
      if (!animal || !animal.mod) { if (typeof showToast === 'function') showToast('\ub3d9\ubb3c \ub9e4\uce6d \uc2e4\ud328'); return; }
      svcRenderResult(pg, animal, mbtiStr, saju, gg, oheng, condition);
    }, 2000);
  }

  // ══════════════════════════════════
  // 결과 (다음 명령어에서 이쁘게 할 예정, 일단 기존 유지)
  // ══════════════════════════════════
  function svcRenderResult(pg, animal, mbti, saju, gg, oheng, condition) {
    var mod = animal.mod;
    var ilju = saju.P[2].s + saju.P[2].b;
    var ohengMap = {'\ubaa9':'Wo','\ud654':'Fi','\ud1a0':'Ea','\uae08':'Me','\uc218':'Wa'};
    var animalNameMap = {'\ub291\ub300':'Wf','\uc5ec\uc6b0':'Fo','\ub2e4\ub78c\uc950':'Sq','\uc0ac\uc2b4':'De','\uace0\uc591\uc774':'Ca','\uc0ac\uc790':'Li','\uacf5\uc791\uc0c8':'Pk','\ubc8c':'Be','\ub3c5\uc218\ub9ac':'Eg','\uc62c\ube7c\ubbf8':'Ow','\uacf0':'Br','\uc218\ub2ec':'Ot','\uc18c':'Ox','\ucf54\ub07c\ub9ac':'El','\uac70\ubd81\uc774':'Tu','\uce58\ud0c0':'Ch','\uc559\ubb34\uc0c8':'Pa','\uc545\uc5b4':'Cr','\uc2dc\ubc14\uacac':'Sb','\ubb38\uc5b4':'Oc','\uc0c1\uc5b4':'Sk','\ub3cc\uace0\ub798':'Do','\ube44\ubc84':'Bv','\uace0\ub798':'Wh','\ud574\ud30c\ub9ac':'Jf'};
    var condMap = {'\uc2e0\uac15':'S','\uc2e0\uc57d':'W','\ud2b9\uc218':'X'};
    var oh = ohengMap[oheng] || 'Fi';
    var an = animalNameMap[animal.name] || 'Li';
    var co = condMap[condition] || 'S';
    var imgUrl = '/animals/' + oh + an + co + '.png?v=2';

    var h = '';
    h += '<div style="min-height:100vh;background:linear-gradient(180deg,#F0EEFF 0%,#FFF8F4 40%,#FFF0F5 100%)">';
    h += '<div style="padding:14px 16px;position:sticky;top:0;z-index:10">';
    h += '<button onclick="renderAnimalPage()" style="background:none;border:none;font-size:14px;color:#8B6CC1;font-weight:600;cursor:pointer">\u2190 \ub2e4\uc2dc \ud558\uae30</button>';
    h += '</div>';
    h += '<div style="padding:0 20px 40px;max-width:480px;margin:0 auto">';
    h += '<div style="text-align:center;margin-bottom:24px">';
    h += '<div style="display:inline-block;padding:16px;background:linear-gradient(135deg,rgba(139,108,193,0.15),rgba(139,108,193,0.05));border-radius:32px">';
    h += '<img src="' + imgUrl + '" alt="' + animal.name + '" style="width:200px;height:200px;border-radius:24px;object-fit:cover;box-shadow:0 8px 32px rgba(139,108,193,0.2)" onerror="this.parentNode.innerHTML=\'<div style=font-size:120px>' + animal.emoji + '</div>\'">';
    h += '</div></div>';
    h += '<div style="text-align:center;margin-bottom:8px"><span style="display:inline-block;padding:4px 14px;background:rgba(139,108,193,0.08);border-radius:20px;font-size:11px;font-weight:700;color:#8B6CC1;letter-spacing:0.5px">MBTS \xb7 ' + ilju + '\uc77c\uc8fc \xb7 ' + mbti + '</span></div>';
    h += '<div style="text-align:center;margin-bottom:6px"><span style="display:inline-block;padding:6px 18px;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border-radius:20px;font-size:14px;font-weight:800;color:#fff">#' + mod.tag + '</span></div>';
    h += '<div style="text-align:center;font-size:22px;font-weight:900;margin-bottom:12px;line-height:1.4;color:var(--text-1)">' + animal.emoji + ' ' + mod.title + '</div>';
    h += '<div style="text-align:center;font-size:15px;color:#666;line-height:1.7;margin-bottom:20px;padding:0 8px">' + mod.desc + '</div>';
    h += '<div style="background:#fff;border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.04)">';
    h += '<div style="font-size:13px;font-weight:700;color:#999;margin-bottom:12px">\ud83c\udfaf \ud2b9\uc131</div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
    for (var i = 0; i < mod.traits.length; i++) {
      h += '<span style="padding:8px 16px;background:rgba(139,108,193,0.06);border-radius:12px;font-size:13px;font-weight:600;color:#8B6CC1">#' + mod.traits[i] + '</span>';
    }
    h += '</div></div>';
    h += '<div style="background:linear-gradient(135deg,rgba(139,108,193,0.06),rgba(232,81,61,0.04));border-radius:20px;padding:20px;margin-bottom:16px">';
    h += '<div style="font-size:13px;font-weight:700;color:#999;margin-bottom:8px">\ud83d\udc8a \ucc98\ubc29\uc804</div>';
    h += '<div style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.5">' + mod.rx + '</div>';
    h += '</div>';
    h += '<div style="display:flex;flex-direction:column;gap:10px">';
    h += '<button onclick="svcShareKakao()" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:#FEE500;color:#191919;border:none;border-radius:14px;cursor:pointer">\ud83d\udcac \uce74\uce74\uc624\ud1a1\uc73c\ub85c \uacf5\uc720\ud558\uae30</button>';
    h += '<button onclick="go(\'pgBirth\')" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);color:#fff;border:none;border-radius:14px;cursor:pointer;box-shadow:0 4px 15px rgba(139,108,193,0.25)">\ud83d\udcdd MBTS \uc804\uccb4 \ubd84\uc11d \ubcf4\uae30 \u2192</button>';
    h += '<button onclick="go(\'pgGunghap\')" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:rgba(232,69,60,0.06);color:#E8453C;border:none;border-radius:14px;cursor:pointer">\ud83d\udc95 \ub098\uc640 \ub9de\ub294 \ub3d9\ubb3c\uc740? \u2192</button>';
    h += '</div>';
    h += '</div></div>';

    pg.innerHTML = h;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window._lastAnimalResult = { animal: animal, mbti: mbti, ilju: ilju, oheng: oheng, condition: condition, imgUrl: imgUrl, emoji: animal.emoji };
  }

  function svcShareKakao() {
    var r = window._lastAnimalResult;
    if (!r) return;
    var shareUrl = 'https://mbts.kr';
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) shareUrl += '?ref=' + mbtsSession.userId;
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: { title: r.emoji + ' ' + r.animal.mod.title, description: r.animal.mod.desc, imageUrl: 'https://mbts.kr' + r.imgUrl.replace('?v=2','') + '?v=2', imageWidth: 800, imageHeight: 600, link: { mobileWebUrl: shareUrl, webUrl: shareUrl } },
          buttons: [{ title: '\ud83d\udd2e \ub098\ub3c4 \ub3d9\ubb3c \uc54c\uc544\ubcf4\uae30', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
        });
        return;
      } catch(e) {}
    }
    if (navigator.share) {
      navigator.share({ title: r.emoji + ' ' + r.animal.mod.title, text: r.animal.mod.desc + '\n\n\ub098\ub3c4 \uc54c\uc544\ubcf4\uae30 \ud83d\udc49\n' + shareUrl, url: shareUrl }).catch(function(){});
      return;
    }
    var text = r.emoji + ' ' + r.animal.mod.title + '\n' + r.animal.mod.desc + '\n\n' + shareUrl;
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function() { if (typeof showToast === 'function') showToast('\ubcf5\uc0ac\ub418\uc5c8\uc5b4\uc694!'); }); }
  }

  // 전역 노출
  window.renderAnimalPage = renderAnimalPage;
  window.svcPickGender = svcPickGender;
  window.svcCheckBirthReady = svcCheckBirthReady;
  window.svcGoStep2 = svcGoStep2;
  window.svcToggleDrop = svcToggleDrop;
  window.svcSelectDrop = svcSelectDrop;
  window.svcOnComboInput = svcOnComboInput;
  window.svcPickMBTI = svcPickMBTI;
  window.svcMbtiBack = svcMbtiBack;
  window.svcShareKakao = svcShareKakao;
})();