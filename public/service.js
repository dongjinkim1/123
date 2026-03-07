(function() {
  'use strict';

  var svcMBTI = [null, null, null, null];
  var svcGender = null;

  function renderAnimalPage() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;
    var h = '';

    h += '<div style="padding:14px 16px;background:rgba(248,247,244,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,0.06);display:flex;align-items:center;gap:12px;position:sticky;top:0;z-index:10">';
    h += '<button onclick="go(\'pgDash\')" style="background:none;border:none;font-size:14px;color:#8B6CC1;font-weight:600;padding:4px 0;cursor:pointer">\u2190 \ub4a4\ub85c</button>';
    h += '<div style="font-size:17px;font-weight:700;flex:1">\ud83e\udd81 \ub0b4 MBTS \ub3d9\ubb3c \uc54c\uc544\ubcf4\uae30</div>';
    h += '</div>';

    h += '<div style="padding:24px 16px;max-width:480px;margin:0 auto">';

    h += '<div style="text-align:center;margin-bottom:28px">';
    h += '<div style="font-size:48px;margin-bottom:12px">\ud83d\udd2e</div>';
    h += '<div style="font-size:18px;font-weight:800;margin-bottom:6px">MBTI \xd7 \uc0ac\uc8fc\ub85c \ub9cc\ub098\ub294</div>';
    h += '<div style="font-size:18px;font-weight:800;color:#8B6CC1;margin-bottom:8px">\ub098\uc758 \uc6b4\uba85 \ub3d9\ubb3c</div>';
    h += '<div style="font-size:13px;color:#888">\ubb34\ub8cc \xb7 \ub85c\uadf8\uc778 \ubd88\ud544\uc694 \xb7 30\ucd08\uba74 \ub05d!</div>';
    h += '</div>';

    h += '<div style="margin-bottom:24px">';
    h += '<div style="font-size:14px;font-weight:700;margin-bottom:10px;color:#555">\ud83e\udde0 MBTI</div>';
    var axes = [
      {L:'E',R:'I',Ln:'\uc678\ud5a5',Rn:'\ub0b4\ud5a5'},
      {L:'S',R:'N',Ln:'\uac10\uac01',Rn:'\uc9c1\uad00'},
      {L:'T',R:'F',Ln:'\uc0ac\uace0',Rn:'\uac10\uc815'},
      {L:'J',R:'P',Ln:'\uacc4\ud68d',Rn:'\ud0d0\uc0c9'}
    ];
    for (var i = 0; i < axes.length; i++) {
      var a = axes[i];
      h += '<div style="display:flex;gap:8px;margin-bottom:8px">';
      h += '<button onclick="svcPickMBTI(' + i + ',\'' + a.L + '\')" id="svcM' + i + 'L" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;background:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s">' + a.L + ' ' + a.Ln + '</button>';
      h += '<button onclick="svcPickMBTI(' + i + ',\'' + a.R + '\')" id="svcM' + i + 'R" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;background:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s">' + a.R + ' ' + a.Rn + '</button>';
      h += '</div>';
    }
    h += '<div id="svcMBTIDisplay" style="text-align:center;font-size:13px;color:#8B6CC1;font-weight:700;margin-top:4px"></div>';
    h += '</div>';

    h += '<div style="margin-bottom:24px">';
    h += '<div style="font-size:14px;font-weight:700;margin-bottom:10px;color:#555">\ud83d\udcc5 \uc0dd\ub144\uc6d4\uc77c</div>';
    h += '<div style="display:flex;gap:8px;margin-bottom:8px">';
    h += '<input type="number" id="svcYear" placeholder="\ub144\ub3c4" min="1920" max="2025" style="flex:2;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;font-size:14px;font-weight:600;text-align:center;outline:none">';
    h += '<input type="number" id="svcMonth" placeholder="\uc6d4" min="1" max="12" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;font-size:14px;font-weight:600;text-align:center;outline:none">';
    h += '<input type="number" id="svcDay" placeholder="\uc77c" min="1" max="31" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;font-size:14px;font-weight:600;text-align:center;outline:none">';
    h += '</div>';
    h += '<div style="display:flex;gap:8px">';
    h += '<button onclick="svcPickGender(\'남\')" id="svcGenderM" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;background:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s">\u2642\ufe0f \ub0a8\uc131</button>';
    h += '<button onclick="svcPickGender(\'여\')" id="svcGenderF" style="flex:1;padding:12px;border:2px solid rgba(0,0,0,0.08);border-radius:12px;background:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s">\u2640\ufe0f \uc5ec\uc131</button>';
    h += '</div>';
    h += '</div>';

    h += '<button onclick="svcAnalyze()" id="svcAnalyzeBtn" style="width:100%;padding:16px;font-size:16px;font-weight:800;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:14px;cursor:pointer;opacity:0.4;transition:all 0.3s;box-shadow:0 4px 15px rgba(139,108,193,0.3)">\ud83d\udd2e \ub0b4 \ub3d9\ubb3c \uc54c\uc544\ubcf4\uae30</button>';
    h += '<div id="svcResult" style="display:none;margin-top:32px"></div>';
    h += '</div>';

    pg.innerHTML = h;
    svcMBTI = [null, null, null, null];
    svcGender = null;
  }

  function svcPickMBTI(axis, val) {
    svcMBTI[axis] = val;
    var btnL = document.getElementById('svcM' + axis + 'L');
    var btnR = document.getElementById('svcM' + axis + 'R');
    if (btnL && btnR) {
      if (val === btnL.textContent.charAt(0)) {
        btnL.style.background = '#8B6CC1'; btnL.style.color = '#fff'; btnL.style.borderColor = '#8B6CC1';
        btnR.style.background = '#fff'; btnR.style.color = '#333'; btnR.style.borderColor = 'rgba(0,0,0,0.08)';
      } else {
        btnR.style.background = '#8B6CC1'; btnR.style.color = '#fff'; btnR.style.borderColor = '#8B6CC1';
        btnL.style.background = '#fff'; btnL.style.color = '#333'; btnL.style.borderColor = 'rgba(0,0,0,0.08)';
      }
    }
    var display = document.getElementById('svcMBTIDisplay');
    if (display) display.textContent = svcMBTI.map(function(v) { return v || '?'; }).join('');
    svcCheckReady();
  }

  function svcPickGender(g) {
    svcGender = g;
    var btnM = document.getElementById('svcGenderM');
    var btnF = document.getElementById('svcGenderF');
    if (g === '\ub0a8') {
      if (btnM) { btnM.style.background = '#8B6CC1'; btnM.style.color = '#fff'; btnM.style.borderColor = '#8B6CC1'; }
      if (btnF) { btnF.style.background = '#fff'; btnF.style.color = '#333'; btnF.style.borderColor = 'rgba(0,0,0,0.08)'; }
    } else {
      if (btnF) { btnF.style.background = '#8B6CC1'; btnF.style.color = '#fff'; btnF.style.borderColor = '#8B6CC1'; }
      if (btnM) { btnM.style.background = '#fff'; btnM.style.color = '#333'; btnM.style.borderColor = 'rgba(0,0,0,0.08)'; }
    }
    svcCheckReady();
  }

  function svcCheckReady() {
    var btn = document.getElementById('svcAnalyzeBtn');
    if (!btn) return;
    var y = document.getElementById('svcYear');
    var m = document.getElementById('svcMonth');
    var d = document.getElementById('svcDay');
    var ready = svcMBTI[0] && svcMBTI[1] && svcMBTI[2] && svcMBTI[3] && svcGender && y && m && d && y.value && m.value && d.value;
    btn.style.opacity = ready ? '1' : '0.4';
  }

  function svcAnalyze() {
    var y = parseInt(document.getElementById('svcYear').value);
    var m = parseInt(document.getElementById('svcMonth').value);
    var d = parseInt(document.getElementById('svcDay').value);
    if (!y || !m || !d || !svcMBTI[0] || !svcGender) {
      if (typeof showToast === 'function') showToast('\ubaa8\ub4e0 \ud56d\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694');
      return;
    }
    var mbtiStr = svcMBTI.join('');
    var saju = calcSajuForApp(y, m, d, null, null, null);
    if (!saju) { if (typeof showToast === 'function') showToast('\uc0ac\uc8fc \uacc4\uc0b0\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694'); return; }
    var gg = analyzeGyeokguk(saju);
    if (!gg) { if (typeof showToast === 'function') showToast('\uaca9\uad6d \ubd84\uc11d\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694'); return; }
    var oheng = saju.dmEl;
    var dominantSS = gg.dominant[0];
    var condition = '\uc2e0\uac15';
    if (gg.isJonggyeok || gg.isHwakyeok) condition = '\ud2b9\uc218';
    else if (gg.strengthGrade === '\uc2e0\uc57d' || gg.strengthGrade === '\uadf9\uc2e0\uc57d') condition = '\uc2e0\uc57d';
    var animal = getAnimalResult(oheng, dominantSS, condition);
    if (!animal || !animal.mod) { if (typeof showToast === 'function') showToast('\ub3d9\ubb3c \ub9e4\uce6d\uc5d0 \uc2e4\ud328\ud588\uc5b4\uc694'); return; }
    svcRenderResult(animal, mbtiStr, saju, gg, oheng, condition);
  }

  function svcRenderResult(animal, mbti, saju, gg, oheng, condition) {
    var resultDiv = document.getElementById('svcResult');
    if (!resultDiv) return;
    var mod = animal.mod;
    var ilju = saju.P[2].s + saju.P[2].b;
    var ohengMap = {'\ubaa9':'Wo','\ud654':'Fi','\ud1a0':'Ea','\uae08':'Me','\uc218':'Wa'};
    var animalMap = {'\ub291\ub300':'Wf','\uc5ec\uc6b0':'Fo','\ub2e4\ub78c\uc950':'Sq','\uc0ac\uc2b4':'De','\uace0\uc591\uc774':'Ca','\uc0ac\uc790':'Li','\uacf5\uc791\uc0c8':'Pk','\ubc8c':'Be','\ub3c5\uc218\ub9ac':'Eg','\uc62c\ube7c\ubbf8':'Ow','\uacf0':'Br','\uc218\ub2ec':'Ot','\uc18c':'Ox','\ucf54\ub07c\ub9ac':'El','\uac70\ubd81\uc774':'Tu','\uce58\ud0c0':'Ch','\uc559\ubb34\uc0c8':'Pa','\uc545\uc5b4':'Cr','\uc2dc\ubc14\uacac':'Sb','\ubb38\uc5b4':'Oc','\uc0c1\uc5b4':'Sk','\ub3cc\uace0\ub798':'Do','\ube44\ubc84':'Bv','\uace0\ub798':'Wh','\ud574\ud30c\ub9ac':'Jf'};
    var condMap = {'\uc2e0\uac15':'S','\uc2e0\uc57d':'W','\ud2b9\uc218':'X'};
    var oh = ohengMap[oheng] || 'Fi';
    var an = animalMap[animal.name] || 'Li';
    var co = condMap[condition] || 'S';
    var imgUrl = 'https://mbts.kr/animals/' + oh + an + co + '.png?v=2';

    var h = '';
    h += '<div style="background:linear-gradient(135deg,#FFF8F0,#FFF0F5,#F0F0FF);border-radius:24px;padding:32px 20px;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.08)">';
    h += '<div style="margin-bottom:16px"><img src="' + imgUrl + '" alt="' + animal.name + '" style="width:140px;height:140px;border-radius:50%;object-fit:cover;box-shadow:0 4px 20px rgba(0,0,0,0.1)" onerror="this.style.display=\'none\'"></div>';
    h += '<div style="display:inline-block;padding:6px 16px;background:rgba(139,108,193,0.1);border-radius:20px;font-size:13px;font-weight:700;color:#8B6CC1;margin-bottom:12px">' + mod.tag + '</div>';
    h += '<div style="font-size:20px;font-weight:900;margin-bottom:8px;line-height:1.4">' + mod.title + '</div>';
    h += '<div style="font-size:14px;color:#666;line-height:1.6;margin-bottom:16px">' + mod.desc + '</div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px">';
    for (var i = 0; i < mod.traits.length; i++) {
      h += '<span style="padding:6px 14px;background:rgba(139,108,193,0.06);border-radius:20px;font-size:12px;font-weight:600;color:#8B6CC1">#' + mod.traits[i] + '</span>';
    }
    h += '</div>';
    h += '<div style="background:rgba(255,255,255,0.7);border-radius:14px;padding:14px 16px;margin-bottom:20px">';
    h += '<div style="font-size:12px;color:#999;margin-bottom:4px">\ud83d\udc8a \ucc98\ubc29\uc804</div>';
    h += '<div style="font-size:14px;font-weight:600;color:#333">' + mod.rx + '</div>';
    h += '</div>';
    h += '<div style="font-size:12px;color:#999;margin-bottom:4px">' + ilju + '\uc77c\uc8fc \xb7 ' + mbti + ' \xb7 ' + gg.strengthGrade + ' \xb7 ' + gg.gyeokgukName + '</div>';
    h += '</div>';

    h += '<div style="margin-top:20px;display:flex;flex-direction:column;gap:10px">';
    h += '<button onclick="svcShareKakao()" style="width:100%;padding:14px;font-size:15px;font-weight:700;background:#FEE500;color:#191919;border:none;border-radius:12px;cursor:pointer">\ud83d\udcac \uce74\uce74\uc624\ud1a1 \uacf5\uc720</button>';
    h += '<button onclick="go(\'pgBirth\')" style="width:100%;padding:14px;font-size:15px;font-weight:700;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);color:#fff;border:none;border-radius:12px;cursor:pointer;box-shadow:0 4px 15px rgba(139,108,193,0.3)">\ud83d\udcdd MBTS \uc804\uccb4 \ubd84\uc11d \ubcf4\uae30 \u2192</button>';
    h += '<button onclick="go(\'pgGunghap\')" style="width:100%;padding:14px;font-size:15px;font-weight:700;background:rgba(232,69,60,0.08);color:#E8453C;border:none;border-radius:12px;cursor:pointer">\ud83d\udc95 \ub098\uc640 \ub9de\ub294 \ub3d9\ubb3c\uc740? \u2192</button>';
    h += '</div>';

    resultDiv.style.display = 'block';
    resultDiv.innerHTML = h;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    window._lastAnimalResult = { animal: animal, mbti: mbti, ilju: ilju, oheng: oheng, condition: condition, imgUrl: imgUrl };
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
          content: { title: r.animal.emoji + ' ' + r.animal.mod.title, description: r.animal.mod.desc, imageUrl: r.imgUrl, imageWidth: 800, imageHeight: 600, link: { mobileWebUrl: shareUrl, webUrl: shareUrl } },
          buttons: [{ title: '\ud83d\udd2e \ub098\ub3c4 \ub3d9\ubb3c \uc54c\uc544\ubcf4\uae30', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
        });
        return;
      } catch(e) {}
    }
    if (navigator.share) {
      navigator.share({ title: r.animal.emoji + ' ' + r.animal.mod.title, text: r.animal.mod.desc + '\n\n\ub098\ub3c4 \uc54c\uc544\ubcf4\uae30 \ud83d\udc49\n' + shareUrl, url: shareUrl }).catch(function(e) {});
      return;
    }
    var text = r.animal.emoji + ' ' + r.animal.mod.title + '\n' + r.animal.mod.desc + '\n\n' + shareUrl;
    if (navigator.clipboard) { navigator.clipboard.writeText(text).then(function() { if (typeof showToast === 'function') showToast('\ubcf5\uc0ac\ub418\uc5c8\uc5b4\uc694!'); }); }
  }

  function svcBindInputs() {
    setTimeout(function() {
      var ids = ['svcYear', 'svcMonth', 'svcDay'];
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.addEventListener('input', svcCheckReady);
      }
    }, 100);
  }

  window.svcPickMBTI = svcPickMBTI;
  window.svcPickGender = svcPickGender;
  window.svcAnalyze = svcAnalyze;
  window.svcShareKakao = svcShareKakao;
  window.renderAnimalPage = function() { renderAnimalPage(); svcBindInputs(); };
})();
