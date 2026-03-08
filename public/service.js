// ============================================================
// service.js v2 — MBTS 무료 동물 서비스 (프리미엄 톤 리디자인)
// engine.js 절대 수정 없음 — 읽기 전용 참조만
// pgBirth → pgMBTI 기존 플로우 재활용 + 무료 결과 렌더링
// ============================================================

(function() {
  'use strict';

  // ══════════════════════════════════════
  // 오행별 컬러 시스템
  // ══════════════════════════════════════
  var OC = {
    '목': { m:'#22A469', bg:'#EDFCF2', bD:'#D1FAE5', g:'linear-gradient(135deg,#22A469,#1B8A56)', lg:'linear-gradient(180deg,#EDFCF2 0%,#D1FAE5 40%,var(--bg) 100%)', hj:'木', emoji:'🌿' },
    '화': { m:'#E8453C', bg:'#FEF1F0', bD:'#FEE2E2', g:'linear-gradient(135deg,#E8453C,#C73830)', lg:'linear-gradient(180deg,#FEF1F0 0%,#FEE2E2 40%,var(--bg) 100%)', hj:'火', emoji:'🔥' },
    '토': { m:'#C49A2A', bg:'#FDF8EC', bD:'#FEF3C7', g:'linear-gradient(135deg,#C49A2A,#A67F1E)', lg:'linear-gradient(180deg,#FDF8EC 0%,#FEF3C7 40%,var(--bg) 100%)', hj:'土', emoji:'🪨' },
    '금': { m:'#6B7B8D', bg:'#F2F4F6', bD:'#E2E8F0', g:'linear-gradient(135deg,#6B7B8D,#556270)', lg:'linear-gradient(180deg,#F2F4F6 0%,#E2E8F0 40%,var(--bg) 100%)', hj:'金', emoji:'⚔️' },
    '수': { m:'#2D7EB5', bg:'#EDF5FC', bD:'#DBEAFE', g:'linear-gradient(135deg,#2D7EB5,#1E6A9C)', lg:'linear-gradient(180deg,#EDF5FC 0%,#DBEAFE 40%,var(--bg) 100%)', hj:'水', emoji:'🌊' }
  };

  // 이미지 URL 조합용 맵
  var OH_MAP = {'목':'Wo','화':'Fi','토':'Ea','금':'Me','수':'Wa'};
  var AN_MAP = {'늑대':'Wf','여우':'Fo','다람쥐':'Sq','사슴':'De','고양이':'Ca','사자':'Li','공작새':'Pk','벌':'Be','독수리':'Eg','올빼미':'Ow','곰':'Br','수달':'Ot','소':'Ox','코끼리':'El','거북이':'Tu','치타':'Ch','앵무새':'Pa','악어':'Cr','시바견':'Sb','문어':'Oc','상어':'Sk','돌고래':'Do','비버':'Bv','고래':'Wh','해파리':'Jf'};
  var COND_MAP = {'신강':'S','신약':'W','특수':'X'};

  // ── 재진입 방지 플래그 ──
  var _svcInAnalysis = false;

  // ══════════════════════════════════════
  // 진입점: 무료 동물 서비스 시작
  // go('pgAnimal') → renderAnimalPage() → go('pgBirth')
  // ══════════════════════════════════════
  function renderAnimalPage() {
    if (_svcInAnalysis) return; // 분석 중 재진입 방지
    window._svcMode = 'free';
    go('pgBirth');
  }

  // ══════════════════════════════════════
  // DOMContentLoaded 후 mbtiGoNext 래핑
  // service.js는 index.html 인라인 스크립트보다 먼저 로드되지만,
  // DOMContentLoaded는 모든 스크립트 실행 후 발생하므로
  // 이 시점에서 원본 mbtiGoNext를 캡처할 수 있음
  // ══════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function() {
    var _origMbtiGoNext = window.mbtiGoNext;

    if (typeof _origMbtiGoNext !== 'function') {
      console.warn('[MBTS service.js] mbtiGoNext 원본을 찾을 수 없음');
      return;
    }

    window.mbtiGoNext = function() {
      // ── 프리미엄 모드: 원본 실행 ──
      if (window._svcMode !== 'free') {
        return _origMbtiGoNext.apply(this, arguments);
      }

      // ── 무료 모드 ──
      if (typeof mbtiCh === 'undefined' || typeof mbtiIt === 'undefined') return;
      if (mbtiCh[mbtiCur] === null || mbtiIt[mbtiCur] === null) return;
      if (mbtiCur < 3) { mbtiCur++; renderMBTI(); return; }

      // 입력값 수집
      var y = parseInt(document.getElementById('bYear').value);
      var mEl = document.getElementById('bMonth');
      var dEl = document.getElementById('bDay');
      var m = parseInt(mEl && mEl.value ? mEl.value : document.getElementById('bMonthInput').value);
      var d = parseInt(dEl && dEl.value ? dEl.value : document.getElementById('bDayInput').value);
      var hEl = document.getElementById('bHour');
      var minEl = document.getElementById('bMin');
      var h = (hEl && hEl.value) ? hEl.value : '';
      var min = (minEl && minEl.value) ? minEl.value : '';
      var nameEl = document.getElementById('bName');
      var nameVal = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
      var gender = (typeof birthGender !== 'undefined') ? birthGender : '남성';

      var mbtiStr = mbtiCh.map(function(c, i) {
        return c === 'L' ? DM_AX[i].L : DM_AX[i].R;
      }).join('');

      // pgAnimal 로딩 화면 표시 (go() 사용 — 재진입 방지 플래그 ON)
      _svcInAnalysis = true;
      go('pgAnimal');
      svcShowLoading();

      // 로컬 분석 실행 (AI 없음, 클로버 차감 없음)
      setTimeout(function() {
        try {
          var saju = calcSajuForApp(y, m, d, h || null, min || null, null);
          if (!saju) { _fail('사주 계산에 실패했어요'); return; }
          var gg = analyzeGyeokguk(saju);
          if (!gg) { _fail('격국 분석에 실패했어요'); return; }

          var oheng = saju.dmEl;
          var dominantSS = gg.dominant[0];
          var condition = '신강';
          if (gg.isJonggyeok || gg.isHwakyeok) condition = '특수';
          else if (gg.strengthGrade === '신약' || gg.strengthGrade === '극신약') condition = '신약';

          var animal = getAnimalResult(oheng, dominantSS, condition);
          if (!animal || !animal.mod) { _fail('동물 매칭에 실패했어요'); return; }

          // ── 히스토리 저장 ──
          var ilju = saju.P[2].s + saju.P[2].b;
          var record = {
            id: 'svc_' + Date.now(),
            name: nameVal || '나',
            input: { y:y, m:m, d:d, h:h, min:min, gender:gender },
            saju: saju, gg: gg,
            mbti: mbtiStr,
            mbtiObj: { ch: mbtiCh.slice(), it: mbtiIt.slice() },
            animalEmoji: animal.emoji,
            animalTag: animal.mod.tag,
            animalIlju: ilju
          };
          try {
            var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
            hist.push(record);
            localStorage.setItem('mbts_history', JSON.stringify(hist));
          } catch(e) { console.warn('[MBTS] 히스토리 저장 실패:', e); }

          // ── 결과 렌더링 ──
          var pg = document.getElementById('pgAnimal');
          svcRenderResult(pg, animal, mbtiStr, saju, gg, oheng, condition, nameVal || '나');

        } catch(err) {
          console.error('[MBTS] 무료 분석 오류:', err);
          _fail('분석 중 오류가 발생했어요');
        } finally {
          window._svcMode = null;
          _svcInAnalysis = false;
        }
      }, 2200);

      function _fail(msg) {
        if (typeof showToast === 'function') showToast(msg);
        _svcInAnalysis = false;
        window._svcMode = null;
        go('pgDash');
      }
    };

    console.log('[MBTS] mbtiGoNext 무료/프리미엄 분기 래핑 완료');
  });

  // ══════════════════════════════════════
  // 로딩 화면
  // ══════════════════════════════════════
  function svcShowLoading() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    var h = '';
    h += '<style>';
    h += '@keyframes svcPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0.8}}';
    h += '@keyframes svcFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
    h += '@keyframes svcFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    h += '@keyframes svcBar{0%{width:0}60%{width:65%}100%{width:95%}}';
    h += '@keyframes svcDot{0%,80%,100%{opacity:0.2}40%{opacity:1}}';
    h += '.svc-dots span{animation:svcDot 1.4s ease-in-out infinite;font-weight:700}';
    h += '.svc-dots span:nth-child(2){animation-delay:0.2s}';
    h += '.svc-dots span:nth-child(3){animation-delay:0.4s}';
    h += '</style>';

    h += '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--bg)">';
    h += '<div style="text-align:center;animation:svcFadeIn .6s ease">';

    // 크리스탈볼
    h += '<div style="width:100px;height:100px;margin:0 auto 28px;border-radius:50%;background:linear-gradient(135deg,rgba(139,108,193,0.12),rgba(139,108,193,0.04));display:flex;align-items:center;justify-content:center;animation:svcPulse 2.5s ease-in-out infinite">';
    h += '<span style="font-size:52px;animation:svcFloat 2s ease-in-out infinite">🔮</span>';
    h += '</div>';

    // 텍스트
    h += '<div style="font-family:\'Noto Serif KR\',serif;font-size:19px;font-weight:700;color:var(--text-1);margin-bottom:10px;letter-spacing:-0.3px">당신의 운명 동물을 찾고 있어요</div>';
    h += '<div style="font-size:13px;color:var(--text-3)">MBTI × 사주 조합 분석 중<span class="svc-dots"><span>.</span><span>.</span><span>.</span></span></div>';

    // 프로그레스 바
    h += '<div style="margin:32px auto 0;width:200px;height:3px;background:rgba(0,0,0,0.04);border-radius:10px;overflow:hidden">';
    h += '<div style="width:0%;height:100%;background:linear-gradient(90deg,var(--purple),var(--purple-deep));border-radius:10px;animation:svcBar 2s ease-in-out forwards"></div>';
    h += '</div>';

    h += '</div></div>';
    pg.innerHTML = h;
  }

  // ══════════════════════════════════════
  // 결과 화면 렌더링 (핵심 리디자인)
  // ══════════════════════════════════════
  function svcRenderResult(pg, animal, mbti, saju, gg, oheng, condition, userName) {
    var mod = animal.mod;
    var ilju = saju.P[2].s + saju.P[2].b;
    var oc = OC[oheng] || OC['화'];

    // 이미지 URL
    var oh = OH_MAP[oheng] || 'Fi';
    var an = AN_MAP[animal.name] || 'Li';
    var co = COND_MAP[condition] || 'S';
    var imgUrl = '/animals/' + oh + an + co + '.png?v=2';

    var h = '';

    // ── CSS 애니메이션 ──
    h += '<style>';
    h += '@keyframes svcReveal{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
    h += '@keyframes svcImgIn{from{opacity:0;transform:scale(0.8) rotate(-5deg)}to{opacity:1;transform:scale(1) rotate(0)}}';
    h += '@keyframes svcTagPop{from{opacity:0;transform:scale(0.6) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}';
    h += '@keyframes svcGlow{0%,100%{box-shadow:0 0 0 0 ' + oc.m + '20}50%{box-shadow:0 0 0 12px ' + oc.m + '00}}';
    h += '@keyframes svcShimmer{0%{background-position:-200% center}100%{background-position:200% center}}';
    h += '.svc-r-card{background:#fff;border-radius:20px;padding:22px 20px;margin-bottom:14px;';
    h += 'box-shadow:0 2px 16px rgba(0,0,0,0.035);border:1px solid rgba(0,0,0,0.04);animation:svcReveal .6s ease both}';
    h += '.svc-r-card:nth-child(2){animation-delay:.08s}.svc-r-card:nth-child(3){animation-delay:.16s}';
    h += '.svc-r-card:nth-child(4){animation-delay:.24s}.svc-r-card:nth-child(5){animation-delay:.32s}';
    h += '.svc-r-label{display:flex;align-items:center;gap:6px;margin-bottom:14px}';
    h += '.svc-r-label-icon{font-size:16px}.svc-r-label-text{font-size:14px;font-weight:700;color:var(--text-1)}';
    h += '.svc-trait{display:inline-block;padding:8px 16px;border-radius:12px;font-size:13px;font-weight:600;';
    h += 'margin:0 6px 8px 0;transition:transform .2s}.svc-trait:active{transform:scale(0.95)}';
    h += '.svc-cta{width:100%;padding:16px;font-size:15px;font-weight:700;border:none;border-radius:16px;';
    h += 'cursor:pointer;transition:all .25s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit}';
    h += '.svc-cta:hover{transform:translateY(-2px)}.svc-cta:active{transform:translateY(0);opacity:0.9}';
    h += '</style>';

    // ══════════════════════════════════
    // 메인 레이아웃
    // ══════════════════════════════════
    h += '<div style="min-height:100vh;background:var(--bg)">';

    // ── 상단 네비게이션 바 ──
    h += '<div style="padding:12px 16px;position:sticky;top:0;z-index:10;';
    h += 'background:rgba(248,247,244,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);';
    h += 'display:flex;align-items:center;justify-content:space-between">';
    h += '<button onclick="go(\'pgDash\')" style="background:none;border:none;font-size:14px;color:' + oc.m + ';font-weight:600;cursor:pointer;font-family:inherit">← 홈</button>';
    h += '<span style="font-size:12px;font-weight:600;color:var(--text-3);letter-spacing:0.5px">MY MBTS ANIMAL</span>';
    h += '<div style="width:40px"></div>';
    h += '</div>';

    // ── 히어로 영역 (오행 그라데이션) ──
    h += '<div style="background:' + oc.lg + ';padding:28px 20px 36px;text-align:center">';

    // 동물 이미지
    h += '<div style="animation:svcImgIn .7s cubic-bezier(.34,1.56,.64,1) both">';
    h += '<div style="width:172px;height:172px;margin:0 auto 20px;position:relative">';
    // 글로우 링
    h += '<div style="position:absolute;inset:-8px;border-radius:50%;border:2.5px solid ' + oc.m + '18;animation:svcGlow 2.5s ease-in-out infinite"></div>';
    // 이미지 컨테이너
    h += '<div style="width:172px;height:172px;border-radius:50%;overflow:hidden;border:4px solid #fff;';
    h += 'box-shadow:0 12px 40px ' + oc.m + '20,0 4px 12px rgba(0,0,0,0.06);position:relative;background:#fff">';
    h += '<img src="' + imgUrl + '" alt="' + animal.name + '" style="width:100%;height:100%;object-fit:cover" ';
    h += 'onerror="this.parentNode.innerHTML=\'<div style=\\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:80px;background:' + oc.bg + '\\\'>' + animal.emoji + '</div>\'">';
    h += '</div></div></div>';

    // 태그 뱃지
    h += '<div style="animation:svcTagPop .5s cubic-bezier(.34,1.56,.64,1) both;animation-delay:.35s;opacity:0">';
    h += '<span style="display:inline-block;padding:7px 20px;background:' + oc.g + ';border-radius:100px;';
    h += 'font-size:13px;font-weight:800;color:#fff;letter-spacing:0.3px;';
    h += 'box-shadow:0 4px 16px ' + oc.m + '30">#' + mod.tag + '</span>';
    h += '</div>';

    // 동물 타이틀
    h += '<div style="animation:svcReveal .6s ease both;animation-delay:.45s;opacity:0">';
    h += '<h1 style="font-family:\'Noto Serif KR\',serif;font-size:22px;font-weight:700;color:var(--text-1);';
    h += 'margin:16px 0 0;line-height:1.45;letter-spacing:-0.5px">';
    h += animal.emoji + ' ' + mod.title + '</h1>';
    h += '</div>';

    // 정보 뱃지 라인
    h += '<div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:14px;flex-wrap:wrap;';
    h += 'animation:svcReveal .6s ease both;animation-delay:.55s;opacity:0">';
    h += '<span style="padding:5px 12px;background:rgba(255,255,255,0.75);border-radius:100px;font-size:11px;font-weight:700;color:' + oc.m + ';border:1px solid ' + oc.m + '25;backdrop-filter:blur(4px)">' + oc.hj + ' ' + oheng + '</span>';
    h += '<span style="padding:5px 12px;background:rgba(255,255,255,0.75);border-radius:100px;font-size:11px;font-weight:600;color:var(--text-2);backdrop-filter:blur(4px)">' + ilju + '일주</span>';
    h += '<span style="padding:5px 12px;background:rgba(255,255,255,0.75);border-radius:100px;font-size:11px;font-weight:600;color:var(--text-2);backdrop-filter:blur(4px)">' + mbti + '</span>';
    h += '</div>';

    h += '</div>'; // 히어로 끝

    // ══════════════════════════════════
    // 카드 영역
    // ══════════════════════════════════
    h += '<div style="padding:20px 16px 32px;max-width:480px;margin:0 auto">';

    // ── 카드 1: 한줄 설명 ──
    h += '<div class="svc-r-card">';
    h += '<div style="font-size:15px;color:var(--text-1);line-height:1.8;text-align:center;padding:4px 4px;font-weight:400">' + mod.desc + '</div>';
    h += '</div>';

    // ── 카드 2: 특성 ──
    h += '<div class="svc-r-card">';
    h += '<div class="svc-r-label"><span class="svc-r-label-icon">🎯</span><span class="svc-r-label-text">나의 특성</span></div>';
    h += '<div>';
    for (var i = 0; i < mod.traits.length; i++) {
      h += '<span class="svc-trait" style="background:' + oc.bg + ';color:' + oc.m + '">#' + mod.traits[i] + '</span>';
    }
    h += '</div></div>';

    // ── 카드 3: 처방전 ──
    h += '<div class="svc-r-card">';
    h += '<div class="svc-r-label"><span class="svc-r-label-icon">💊</span><span class="svc-r-label-text">처방전</span></div>';
    h += '<div style="background:' + oc.bg + ';border-radius:14px;padding:16px 18px;position:relative">';
    h += '<div style="position:absolute;top:10px;left:14px;font-size:24px;opacity:0.1;color:' + oc.m + '">❝</div>';
    h += '<div style="font-size:15px;font-weight:600;color:' + oc.m + ';line-height:1.65;padding-left:6px">' + mod.rx + '</div>';
    h += '</div></div>';

    // ── 카드 4: 더 깊은 풀이 (잠금/티저 — 추후 확장 영역) ──
    h += '<div class="svc-r-card" style="position:relative;overflow:hidden">';
    h += '<div class="svc-r-label"><span class="svc-r-label-icon">🔮</span><span class="svc-r-label-text">더 깊은 운명 풀이</span></div>';

    // 블러 텍스트 (티저)
    h += '<div style="position:relative;min-height:100px">';
    h += '<div style="filter:blur(5px);-webkit-filter:blur(5px);user-select:none;pointer-events:none;padding:4px 0">';
    h += '<div style="font-size:14px;color:var(--text-2);line-height:1.85">';
    h += userName + '님의 ' + oc.hj + ' 에너지는 ' + ilju + '일주와 만나 ';
    h += '독특한 흐름을 만들어냅니다. ' + mbti + ' 성향이 이 에너지 위에 올라타면서 ';
    h += '당신만의 운명 지도가 그려지고 있어요. 이 조합은 약 5,150억 가지 중 단 하나뿐입니다.';
    h += '</div></div>';

    // 잠금 오버레이
    h += '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;';
    h += 'background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.92) 35%,#fff 100%)">';
    h += '<div style="width:44px;height:44px;border-radius:50%;background:' + oc.bg + ';';
    h += 'display:flex;align-items:center;justify-content:center;margin-bottom:10px;';
    h += 'box-shadow:0 4px 16px ' + oc.m + '12"><span style="font-size:20px">🔒</span></div>';
    h += '<div style="font-size:14px;font-weight:700;color:var(--text-1);margin-bottom:3px">프리미엄에서 확인하세요</div>';
    h += '<div style="font-size:12px;color:var(--text-3)">18레이어 교차 분석 · AI 맞춤 풀이</div>';
    h += '</div>';
    h += '</div>';
    h += '</div>';

    // ══════════════════════════════════
    // CTA 버튼 영역
    // ══════════════════════════════════
    h += '<div style="display:flex;flex-direction:column;gap:10px;margin-top:8px;animation:svcReveal .6s ease both;animation-delay:.4s;opacity:0">';

    // 카카오 공유
    h += '<button class="svc-cta" onclick="svcShareKakao()" style="background:#FEE500;color:#191919;box-shadow:0 4px 16px rgba(254,229,0,0.35)">';
    h += '📣 카카오톡으로 공유하기</button>';

    // 프리미엄 전체 분석
    h += '<button class="svc-cta" onclick="go(\'pgBirth\')" style="background:' + oc.g + ';color:#fff;box-shadow:0 4px 20px ' + oc.m + '28">';
    h += '📝 MBTS 전체 분석 보기 <span style="font-size:11px;opacity:0.75;margin-left:2px">🍀15</span></button>';

    // 궁합
    h += '<button class="svc-cta" onclick="goToGunghap(\'pgAnimal\')" style="background:rgba(212,115,139,0.06);color:#D4738B;border:1.5px solid rgba(212,115,139,0.12)">';
    h += '💕 나와 맞는 동물은?</button>';

    h += '</div>';

    // 다시 분석하기
    h += '<div style="text-align:center;margin-top:20px;padding-bottom:24px">';
    h += '<button onclick="renderAnimalPage()" style="background:none;border:none;font-size:13px;color:var(--text-3);cursor:pointer;font-family:inherit;text-decoration:underline">🔄 다시 분석하기</button>';
    h += '</div>';

    h += '</div>'; // 카드 영역 끝
    h += '</div>'; // 전체 끝

    pg.innerHTML = h;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 공유용 데이터 저장
    window._lastAnimalResult = {
      animal: animal, mbti: mbti, ilju: ilju,
      oheng: oheng, condition: condition,
      imgUrl: imgUrl, emoji: animal.emoji
    };
  }

  // ══════════════════════════════════════
  // 카카오 공유
  // ══════════════════════════════════════
  function svcShareKakao() {
    var r = window._lastAnimalResult;
    if (!r) return;
    var shareUrl = 'https://mbts.kr';
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) {
      shareUrl += '?ref=' + mbtsSession.userId;
    }

    // 카카오 SDK 공유
    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: r.emoji + ' ' + r.animal.mod.title,
            description: r.animal.mod.desc,
            imageUrl: 'https://mbts.kr' + r.imgUrl.replace('?v=2', '') + '?v=2',
            imageWidth: 800, imageHeight: 600,
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl }
          },
          buttons: [{ title: '🔮 나도 동물 알아보기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
        });
        return;
      } catch(e) { console.warn('[MBTS] 카카오 공유 실패:', e); }
    }

    // Web Share API 폴백
    if (navigator.share) {
      navigator.share({
        title: r.emoji + ' ' + r.animal.mod.title,
        text: r.animal.mod.desc + '\n\n나도 알아보기 👉\n' + shareUrl,
        url: shareUrl
      }).catch(function(){});
      return;
    }

    // 클립보드 폴백
    var text = r.emoji + ' ' + r.animal.mod.title + '\n' + r.animal.mod.desc + '\n\n' + shareUrl;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        if (typeof showToast === 'function') showToast('복사되었어요!');
      });
    }
  }

  // ══════════════════════════════════════
  // 전역 노출
  // ══════════════════════════════════════
  window.renderAnimalPage = renderAnimalPage;
  window.svcShareKakao = svcShareKakao;

  console.log('[MBTS] service.js v2 loaded (프리미엄 톤 무료 동물 서비스)');
})();
