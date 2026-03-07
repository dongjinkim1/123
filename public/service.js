(function() {
  'use strict';

  var svcMBTI = [null, null, null, null];
  var svcGender = null;
  var svcStep = 1;
  var svcMBTICur = 0;
  var svcBirthData = {};

  var MBTI_AXES = [
    { L:'E', R:'I', Lname:'\uc678\ud5a5\ud615(E)', Rname:'\ub0b4\ud5a5\ud615(I)', Ldesc:'\uc0ac\ub78c\ub4e4\uacfc \ud568\uaed8\ud560 \ub54c \uc5d0\ub108\uc9c0 \ucda9\uc804', Rdesc:'\ud63c\uc790\ub9cc\uc758 \uc2dc\uac04\uc5d0 \uc5d0\ub108\uc9c0 \ucda9\uc804' },
    { L:'S', R:'N', Lname:'\uac10\uac01\ud615(S)', Rname:'\uc9c1\uad00\ud615(N)', Ldesc:'\ud604\uc7ac\uc640 \uc0ac\uc2e4\uc5d0 \uc9d1\uc911', Rdesc:'\ubbf8\ub798\uc640 \uac00\ub2a5\uc131\uc5d0 \uc9d1\uc911' },
    { L:'T', R:'F', Lname:'\uc0ac\uace0\ud615(T)', Rname:'\uac10\uc815\ud615(F)', Ldesc:'\ub17c\ub9ac\uc640 \ubd84\uc11d\uc73c\ub85c \ud310\ub2e8', Rdesc:'\uac10\uc815\uacfc \uacf5\uac10\uc73c\ub85c \ud310\ub2e8' },
    { L:'J', R:'P', Lname:'\uacc4\ud68d\ud615(J)', Rname:'\ud0d0\uc0c9\ud615(P)', Ldesc:'\uacc4\ud68d\uc801\uc774\uace0 \uccb4\uacc4\uc801', Rdesc:'\uc720\uc5f0\ud558\uace0 \uc790\uc720\ub85c\uc6c0' }
  ];

  function renderAnimalPage() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;
    svcStep = 1;
    svcMBTICur = 0;
    svcMBTI = [null, null, null, null];
    svcGender = null;
    svcBirthData = {};
    renderStep1(pg);
  }

  // ══════════════════════════════════
  // STEP 1: 생년월일 + 성별
  // ══════════════════════════════════
  function renderStep1(pg) {
    var h = '';
    h += '<div style="padding:20px;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding-top:48px">';
    h += '<div class="birth-wrap">';
    h += '<button class="birth-back" onclick="go(\'pgDash\')">\u2190 \ub4a4\ub85c</button>';

    // 진행 바
    h += '<div style="display:flex;gap:4px;margin-bottom:28px">';
    h += '<div style="flex:1;height:4px;border-radius:2px;background:#8B6CC1"></div>';
    h += '<div style="flex:1;height:4px;border-radius:2px;background:rgba(0,0,0,0.06)"></div>';
    h += '</div>';

    // 카드
    h += '<div class="birth-card">';
    h += '<div class="birth-title"><span>\uc0dd\ub144\uc6d4\uc77c</span>\uc744 \uc54c\ub824\uc8fc\uc138\uc694</div>';
    h += '<div class="birth-sub">\uc591\ub825 \uae30\uc900 \xb7 \ubb34\ub8cc\ub85c \ub0b4 \uc6b4\uba85 \ub3d9\ubb3c\uc744 \uc54c\uc544\ubcf4\uc138\uc694</div>';

    // 년/월/일
    h += '<div class="birth-row">';
    h += '<div class="birth-field wide">';
    h += '<label class="birth-label">\ud0dc\uc5b4\ub09c \ud574</label>';
    h += '<input class="birth-input" type="number" id="svcYear" placeholder="\uc608: 1990" oninput="svcCheckStep1()">';
    h += '</div>';
    h += '<div class="birth-field">';
    h += '<label class="birth-label">\uc6d4</label>';
    h += '<input class="birth-input" type="number" id="svcMonth" placeholder="\uc6d4" min="1" max="12" oninput="svcCheckStep1()">';
    h += '</div>';
    h += '<div class="birth-field">';
    h += '<label class="birth-label">\uc77c</label>';
    h += '<input class="birth-input" type="number" id="svcDay" placeholder="\uc77c" min="1" max="31" oninput="svcCheckStep1()">';
    h += '</div>';
    h += '</div>';

    // 성별
    h += '<label class="birth-label">\uc131\ubcc4</label>';
    h += '<div class="birth-gender-row">';
    h += '<button class="birth-gender" id="svcGenderM" onclick="svcPickGender(\'\ub0a8\')">\u2642 \ub0a8\uc131</button>';
    h += '<button class="birth-gender" id="svcGenderF" onclick="svcPickGender(\'\uc5ec\')">\u2640 \uc5ec\uc131</button>';
    h += '</div>';

    // 다음 버튼
    h += '<button id="svcNextBtn" class="ap-b-next" onclick="svcGoStep2()">\ub2e4\uc74c \u2192</button>';

    h += '</div>'; // birth-card
    h += '</div>'; // birth-wrap
    h += '</div>';

    pg.innerHTML = h;
  }

  function svcPickGender(g) {
    svcGender = g;
    var btnM = document.getElementById('svcGenderM');
    var btnF = document.getElementById('svcGenderF');
    if (btnM) btnM.className = 'birth-gender' + (g === '\ub0a8' ? ' active' : '');
    if (btnF) btnF.className = 'birth-gender' + (g === '\uc5ec' ? ' active' : '');
    svcCheckStep1();
  }

  function svcCheckStep1() {
    var btn = document.getElementById('svcNextBtn');
    if (!btn) return;
    var y = document.getElementById('svcYear');
    var m = document.getElementById('svcMonth');
    var d = document.getElementById('svcDay');
    var ready = y && m && d && y.value && m.value && d.value && svcGender;
    btn.className = ready ? 'ap-b-next ready' : 'ap-b-next';
  }

  function svcGoStep2() {
    var y = parseInt(document.getElementById('svcYear').value);
    var m = parseInt(document.getElementById('svcMonth').value);
    var d = parseInt(document.getElementById('svcDay').value);
    if (!y || !m || !d || !svcGender) return;
    svcBirthData = { y: y, m: m, d: d, gender: svcGender };
    svcStep = 2;
    svcMBTICur = 0;
    var pg = document.getElementById('pgAnimal');
    if (pg) renderStep2(pg);
  }

  // ══════════════════════════════════
  // STEP 2: MBTI 4문항 (강도 없이)
  // ══════════════════════════════════
  function renderStep2(pg) {
    var cur = svcMBTICur;
    var d = DM_AX[cur];
    var ac = DC[cur];
    var bg = DB[cur];
    var h = '';

    h += '<div style="padding:20px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:background .4s;background:' + bg + '">';
    h += '<div style="width:100%;max-width:440px">';

    // 뒤로
    h += '<button onclick="svcMBTIBack()" style="background:none;border:none;font-size:14px;color:#8B6CC1;font-weight:600;padding:4px 0;cursor:pointer;margin-bottom:12px">\u2190 \ub4a4\ub85c</button>';

    // 진행바 (축별 색상)
    h += '<div style="display:flex;gap:4px;margin-bottom:20px">';
    h += '<div style="flex:1;height:4px;border-radius:2px;background:#5B8FD4"></div>';
    for (var i = 0; i < 4; i++) {
      h += '<div style="flex:1;height:4px;border-radius:2px;background:' + (i <= cur ? DC[i] : DC[i] + '30') + '"></div>';
    }
    h += '</div>';

    // MBTI 글자 미리보기
    h += '<div style="display:flex;justify-content:center;gap:8px;margin-bottom:24px">';
    for (var i = 0; i < 4; i++) {
      var lt = svcMBTI[i] ? svcMBTI[i] : '?';
      var isCur = (i === cur);
      h += '<div style="width:42px;height:50px;display:flex;align-items:center;justify-content:center;font-size:21px;font-weight:900;border-radius:10px;background:' + (isCur ? DC[i] + '20' : (svcMBTI[i] ? DC[i] + '10' : 'rgba(0,0,0,0.04)')) + ';border:2.5px solid ' + (isCur ? DC[i] : 'transparent') + ';color:' + (svcMBTI[i] ? DC[i] : 'var(--text-3)') + '">' + lt + '</div>';
    }
    h += '</div>';

    // 카드 (글로시)
    h += '<div style="background:#fff;border:1px solid ' + ac + '65;border-radius:20px;box-shadow:0 2px 12px ' + ac + '18,0 0 0 1px ' + ac + '20;padding:28px 22px;transition:border-color .3s,box-shadow .3s">';
    h += '<div style="font-size:11px;color:var(--text-3);text-align:center;letter-spacing:1px;margin-bottom:4px">STEP ' + (cur + 1) + '/4</div>';
    h += '<div style="font-size:17px;font-weight:800;text-align:center;margin-bottom:16px;color:var(--text-1)">\ub2f9\uc2e0\uc740 \uc5b4\ub290 \ucabd\uc5d0 \uac00\uae5c\ub098\uc694?</div>';

    // 선택지 (기존 renderMBTI 그대로)
    h += '<div style="display:flex;gap:10px;margin-bottom:18px">';
    var sides = ['L', 'R'];
    for (var si = 0; si < sides.length; si++) {
      var side = sides[si];
      var lb = side === 'L' ? d.Ll : d.Rl;
      var lt = side === 'L' ? d.L : d.R;
      var ds = side === 'L' ? d.Ld : d.Rd;
      var sel = (svcMBTI[cur] === lt);
      var btnBg = sel ? 'linear-gradient(145deg,' + ac + '18,' + ac + '08)' : 'rgba(0,0,0,0.02)';
      var btnBdr = sel ? '2.5px solid ' + ac : '2.5px solid var(--border)';
      var gloss = sel ? '<div style="position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,0.5),rgba(255,255,255,0));border-radius:14px 14px 0 0;pointer-events:none"></div>' : '';
      var shadow = sel ? ';box-shadow:0 4px 20px ' + ac + '25;position:relative;overflow:hidden' : '';
      h += '<button onclick="svcPickMBTIStep(\'' + lt + '\')" style="flex:1;padding:20px 12px;background:' + btnBg + ';border:' + btnBdr + ';border-radius:16px;cursor:pointer;text-align:center;color:var(--text-1);font-family:inherit;transition:all .25s' + shadow + '">' + gloss;
      h += '<div style="font-size:34px;font-weight:900;color:' + (sel ? ac : 'var(--text-3)') + ';margin-bottom:6px;position:relative">' + lt + '</div>';
      h += '<div style="font-size:12.5px;font-weight:700;margin-bottom:4px;color:' + (sel ? ac : 'var(--text-2)') + ';position:relative">' + lb + '</div>';
      h += '<div style="font-size:11px;color:var(--text-3);line-height:1.5;position:relative">' + ds + '</div>';
      h += '</button>';
    }
    h += '</div>';

    h += '</div>'; // 카드 끝
    h += '</div>'; // max-width
    h += '</div>'; // 전체

    pg.innerHTML = h;
  }

  function svcPickMBTIStep(val) {
    svcMBTI[svcMBTICur] = val;
    // 선택 이펙트 보여주고 자동 다음
    var pg = document.getElementById('pgAnimal');
    if (pg) renderStep2(pg);
    setTimeout(function() {
      if (svcMBTICur < 3) {
        svcMBTICur++;
        if (pg) renderStep2(pg);
      } else {
        svcDoAnalyze();
      }
    }, 400);
  }

  function svcMBTIBack() {
    if (svcMBTICur > 0) {
      svcMBTI[svcMBTICur] = null;
      svcMBTICur--;
      var pg = document.getElementById('pgAnimal');
      if (pg) renderStep2(pg);
    } else {
      svcStep = 1;
      var pg = document.getElementById('pgAnimal');
      if (pg) renderStep1(pg);
    }
  }

  // ══════════════════════════════════
  // 분석 + 로딩
  // ══════════════════════════════════
  function svcDoAnalyze() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    // 로딩 화면
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
  // 결과 페이지
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

    // 뒤로 버튼
    h += '<div style="padding:14px 16px;position:sticky;top:0;z-index:10">';
    h += '<button onclick="renderAnimalPage()" style="background:none;border:none;font-size:14px;color:#8B6CC1;font-weight:600;cursor:pointer">\u2190 \ub2e4\uc2dc \ud558\uae30</button>';
    h += '</div>';

    h += '<div style="padding:0 20px 40px;max-width:480px;margin:0 auto">';

    // 동물 이미지 (크게)
    h += '<div style="text-align:center;margin-bottom:24px">';
    h += '<div style="display:inline-block;padding:16px;background:linear-gradient(135deg,rgba(139,108,193,0.15),rgba(139,108,193,0.05));border-radius:32px">';
    h += '<img src="' + imgUrl + '" alt="' + animal.name + '" style="width:200px;height:200px;border-radius:24px;object-fit:cover;box-shadow:0 8px 32px rgba(139,108,193,0.2)" onerror="this.parentNode.innerHTML=\'<div style=font-size:120px>' + animal.emoji + '</div>\'">';
    h += '</div></div>';

    // MBTS 뱃지
    h += '<div style="text-align:center;margin-bottom:8px">';
    h += '<span style="display:inline-block;padding:4px 14px;background:rgba(139,108,193,0.08);border-radius:20px;font-size:11px;font-weight:700;color:#8B6CC1;letter-spacing:0.5px">MBTS \xb7 ' + ilju + '\uc77c\uc8fc \xb7 ' + mbti + '</span>';
    h += '</div>';

    // 태그
    h += '<div style="text-align:center;margin-bottom:6px">';
    h += '<span style="display:inline-block;padding:6px 18px;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border-radius:20px;font-size:14px;font-weight:800;color:#fff">#' + mod.tag + '</span>';
    h += '</div>';

    // 타이틀
    h += '<div style="text-align:center;font-size:22px;font-weight:900;margin-bottom:12px;line-height:1.4;color:var(--text-1)">' + animal.emoji + ' ' + mod.title + '</div>';

    // 설명
    h += '<div style="text-align:center;font-size:15px;color:#666;line-height:1.7;margin-bottom:20px;padding:0 8px">' + mod.desc + '</div>';

    // 특성 카드
    h += '<div style="background:#fff;border-radius:20px;padding:20px;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.04)">';
    h += '<div style="font-size:13px;font-weight:700;color:#999;margin-bottom:12px">\ud83c\udfaf \ud2b9\uc131</div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
    for (var i = 0; i < mod.traits.length; i++) {
      h += '<span style="padding:8px 16px;background:rgba(139,108,193,0.06);border-radius:12px;font-size:13px;font-weight:600;color:#8B6CC1">#' + mod.traits[i] + '</span>';
    }
    h += '</div></div>';

    // 처방전 카드
    h += '<div style="background:linear-gradient(135deg,rgba(139,108,193,0.06),rgba(232,81,61,0.04));border-radius:20px;padding:20px;margin-bottom:16px">';
    h += '<div style="font-size:13px;font-weight:700;color:#999;margin-bottom:8px">\ud83d\udc8a \ucc98\ubc29\uc804</div>';
    h += '<div style="font-size:15px;font-weight:700;color:var(--text-1);line-height:1.5">' + mod.rx + '</div>';
    h += '</div>';

    // 사주 요약 카드
    h += '<div style="background:#fff;border-radius:20px;padding:20px;margin-bottom:28px;box-shadow:0 2px 12px rgba(0,0,0,0.04)">';
    h += '<div style="font-size:13px;font-weight:700;color:#999;margin-bottom:12px">\ud83d\udd2e \uc0ac\uc8fc \uc694\uc57d</div>';
    h += '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text-2);line-height:2">';
    h += '<div>\uc77c\uc8fc: <b>' + ilju + '</b></div>';
    h += '<div>\uaca9\uad6d: <b>' + gg.gyeokgukName + '</b></div>';
    h += '<div>\uac15\uc57d: <b>' + gg.strengthGrade + '</b></div>';
    h += '</div></div>';

    // CTA 버튼
    h += '<div style="display:flex;flex-direction:column;gap:10px">';
    h += '<button onclick="svcShareKakao()" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:#FEE500;color:#191919;border:none;border-radius:14px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.06)">\ud83d\udcac \uce74\uce74\uc624\ud1a1\uc73c\ub85c \uacf5\uc720\ud558\uae30</button>';
    h += '<button onclick="go(\'pgBirth\')" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);color:#fff;border:none;border-radius:14px;cursor:pointer;box-shadow:0 4px 15px rgba(139,108,193,0.25)">\ud83d\udcdd MBTS \uc804\uccb4 \ubd84\uc11d \ubcf4\uae30 \u2192</button>';
    h += '<button onclick="go(\'pgGunghap\')" style="width:100%;padding:15px;font-size:15px;font-weight:700;background:rgba(232,69,60,0.06);color:#E8453C;border:none;border-radius:14px;cursor:pointer">\ud83d\udc95 \ub098\uc640 \ub9de\ub294 \ub3d9\ubb3c\uc740? \u2192</button>';
    h += '</div>';

    h += '</div>'; // max-width
    h += '</div>'; // background

    pg.innerHTML = h;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window._lastAnimalResult = { animal: animal, mbti: mbti, ilju: ilju, oheng: oheng, condition: condition, imgUrl: imgUrl, emoji: animal.emoji };
  }

  // ══════════════════════════════════
  // 카카오 공유
  // ══════════════════════════════════
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
  window.svcCheckStep1 = svcCheckStep1;
  window.svcGoStep2 = svcGoStep2;
  window.svcPickMBTIStep = svcPickMBTIStep;
  window.svcMBTIBack = svcMBTIBack;
  window.svcShareKakao = svcShareKakao;
})();
