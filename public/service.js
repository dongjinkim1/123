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
    if (window._compatMode) return; // 궁합 매칭 모드일 때 재진입 방지
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

    // ── 프리미엄 스타일 헤더 ──
    h += '<div style="text-align:center;padding:36px 20px 16px">';
    h += '<div onclick="go(\'pgDash\')" style="cursor:pointer;display:flex;justify-content:center;gap:0;margin-bottom:8px">';
    h += '<span style="font-weight:800;font-size:28px;line-height:1;color:#4CAF7D">M</span>';
    h += '<span style="font-weight:800;font-size:28px;line-height:1;color:#5B8FD4">B</span>';
    h += '<span style="font-weight:800;font-size:28px;line-height:1;color:#E05A5A">T</span>';
    h += '<span style="font-weight:800;font-size:28px;line-height:1;color:#E8B84B">S</span>';
    h += '</div>';
    h += '<div style="font-size:13px;font-weight:600;color:var(--text-2)">' + userName + '의 운명 동물</div>';
    h += '</div>';

    // ── 동물 카드 + 콘텐츠 영역 (640px) ──
    h += '<div style="max-width:640px;margin:0 auto;padding:0 16px 32px">';

    // 동물 카드 이미지
    h += '<div style="animation:svcImgIn .7s cubic-bezier(.34,1.56,.64,1) both;margin-bottom:16px">';
    h += '<div style="border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);aspect-ratio:2/1">';
    h += '<img src="' + imgUrl + '" alt="' + animal.name + '" style="width:100%;height:100%;object-fit:cover;display:block" ';
    h += 'onerror="this.parentNode.innerHTML=\'<div style=\\\'display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:4/3;font-size:100px;background:' + oc.bg + '\\\'>' + animal.emoji + '</div>\'">';
    h += '</div></div>';

    // 공유 버튼
    h += '<div style="display:flex;gap:8px;margin-bottom:20px">';
    h += '<button style="flex:1;padding:12px;font-size:13px;font-weight:600;color:var(--text-2);background:#fff;border:1px solid var(--border);border-radius:14px;cursor:pointer;font-family:inherit">📷 이미지 저장</button>';
    h += '<button onclick="svcShareKakao&&svcShareKakao()" style="flex:1;padding:12px;font-size:13px;font-weight:700;color:#191919;background:#FEE500;border:1px solid #FEE500;border-radius:14px;cursor:pointer;font-family:inherit">💬 카카오톡 공유</button>';
    h += '</div>';

    // ANIMAL_DETAIL 조회
    var dominantSS = gg.dominant ? gg.dominant[0] : '';
    var detail = null;
    if (typeof ANIMAL_DETAIL !== 'undefined' && ANIMAL_DETAIL[oheng + '_' + dominantSS]) {
      detail = ANIMAL_DETAIL[oheng + '_' + dominantSS][condition];
    }

    if (detail) {
      // ── 카드 1: 성격 ──
      h += '<div class="svc-r-card">';
      h += '<div class="svc-r-label"><span class="svc-r-label-icon">🎭</span><span class="svc-r-label-text">성격</span></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.personality[0] + ' ' + detail.personality[1];
      h += '</div>';
      h += '<div style="height:16px"></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.personality[2] + ' ' + detail.personality[3];
      h += '</div>';
      h += '<div style="height:16px"></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.personality[4];
      h += '</div>';
      h += '<div style="margin-top:14px">';
      for (var j = 0; j < detail.pTags.length; j++) {
        h += '<span class="svc-trait" style="background:' + oc.bg + ';color:' + oc.m + '">#' + detail.pTags[j] + '</span>';
      }
      h += '</div></div>';

      // ── 카드 2: 성향 ──
      h += '<div class="svc-r-card">';
      h += '<div class="svc-r-label"><span class="svc-r-label-icon">🧭</span><span class="svc-r-label-text">성향</span></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.tendency[0] + ' ' + detail.tendency[1];
      h += '</div>';
      h += '<div style="height:16px"></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.tendency[2] + ' ' + detail.tendency[3];
      h += '</div>';
      h += '<div style="height:16px"></div>';
      h += '<div style="font-size:14.5px;line-height:1.85;color:var(--text-2);word-break:keep-all">';
      h += detail.tendency[4];
      h += '</div>';
      h += '<div style="margin-top:14px">';
      for (var j = 0; j < detail.tTags.length; j++) {
        h += '<span class="svc-trait" style="background:' + oc.bg + ';color:' + oc.m + '">#' + detail.tTags[j] + '</span>';
      }
      h += '</div></div>';
    } else {
      // 폴백: 기존 레이아웃
      h += '<div class="svc-r-card">';
      h += '<div style="font-size:15px;color:var(--text-1);line-height:1.8;text-align:center;padding:4px 4px;font-weight:400">' + mod.desc + '</div>';
      h += '</div>';
      h += '<div class="svc-r-card">';
      h += '<div class="svc-r-label"><span class="svc-r-label-icon">🎯</span><span class="svc-r-label-text">나의 특성</span></div>';
      h += '<div>';
      for (var i = 0; i < mod.traits.length; i++) {
        h += '<span class="svc-trait" style="background:' + oc.bg + ';color:' + oc.m + '">#' + mod.traits[i] + '</span>';
      }
      h += '</div></div>';
      h += '<div class="svc-r-card">';
      h += '<div class="svc-r-label"><span class="svc-r-label-icon">💊</span><span class="svc-r-label-text">처방전</span></div>';
      h += '<div style="background:' + oc.bg + ';border-radius:14px;padding:16px 18px;position:relative">';
      h += '<div style="position:absolute;top:10px;left:14px;font-size:24px;opacity:0.1;color:' + oc.m + '">❝</div>';
      h += '<div style="font-size:15px;font-weight:600;color:' + oc.m + ';line-height:1.65;padding-left:6px">' + mod.rx + '</div>';
      h += '</div></div>';
    }

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
    h += '<button class="svc-cta" onclick="renderCompatPage()" style="background:rgba(212,115,139,0.06);color:#D4738B;border:1.5px solid rgba(212,115,139,0.12)">';
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
  // 무료 궁합 동물 매칭 서비스
  // ══════════════════════════════════════

  // 오행 상생 역방향 (나를 생해주는 오행)
  var OH_SANG_REV = {'목':'수','화':'목','토':'화','금':'토','수':'금'};

  // 십성 궁합 매칭 테이블 + 동물별 구체적 이유
  var SS_COMPAT = {
    '비겁': {
      best: { ss:'재성', reason: function(my,tgt){ return my+'의 거친 에너지를 '+tgt+'가 현실 감각으로 잡아줌 — 서로에게 없는 걸 채워주는 최강 보완형'; } },
      good: { ss:'식상', reason: function(my,tgt){ return my+'의 단단함 위에 '+tgt+'의 표현력이 올라타면 시너지 폭발 — 함께 만들어가는 성장형'; } },
      mirror: { ss:'관성', reason: function(my,tgt){ return my+'와 '+tgt+', 서로 밀고 당기며 긴장감 있는 자극 — 말 안 해도 통하는 거울 관계'; } }
    },
    '식상': {
      best: { ss:'관성', reason: function(my,tgt){ return my+'의 자유로운 표현을 '+tgt+'가 방향을 잡아줌 — 날개 달린 안정감'; } },
      good: { ss:'재성', reason: function(my,tgt){ return my+'의 아이디어를 '+tgt+'가 현실로 바꿔줌 — 꿈을 돈으로 만드는 조합'; } },
      mirror: { ss:'인성', reason: function(my,tgt){ return my+'가 표현하고 '+tgt+'가 받아주는 — 정서적으로 가장 편안한 조합'; } }
    },
    '재성': {
      best: { ss:'비겁', reason: function(my,tgt){ return my+'의 현실 감각에 '+tgt+'의 추진력이 합쳐지면 — 목표를 반드시 이루는 파트너'; } },
      good: { ss:'관성', reason: function(my,tgt){ return my+'의 기회 포착력 + '+tgt+'의 책임감 — 서로를 믿고 맡기는 신뢰형'; } },
      mirror: { ss:'식상', reason: function(my,tgt){ return my+'의 계산과 '+tgt+'의 감성이 만나 — 이성과 감성의 완벽 밸런스'; } }
    },
    '관성': {
      best: { ss:'식상', reason: function(my,tgt){ return my+'의 무거운 책임을 '+tgt+'가 유쾌하게 풀어줌 — 삶이 가벼워지는 힐링 관계'; } },
      good: { ss:'인성', reason: function(my,tgt){ return my+'의 원칙 위에 '+tgt+'의 지혜가 더해져 — 함께할수록 단단해지는 조합'; } },
      mirror: { ss:'비겁', reason: function(my,tgt){ return my+'가 이끌고 '+tgt+'가 밀어주는 — 역할이 딱 맞아떨어지는 팀워크'; } }
    },
    '인성': {
      best: { ss:'재성', reason: function(my,tgt){ return my+'의 생각을 '+tgt+'가 행동으로 옮겨줌 — 머릿속 세상을 현실로 만드는 파트너'; } },
      good: { ss:'비겁', reason: function(my,tgt){ return my+'의 깊은 내면을 '+tgt+'가 활기로 깨워줌 — 움츠린 나를 세상 밖으로'; } },
      mirror: { ss:'관성', reason: function(my,tgt){ return my+'의 사색과 '+tgt+'의 실행력 — 생각을 결과로 바꾸는 지적 자극형'; } }
    }
  };

  // 랭크별 배지 스타일
  var RANK_STYLE = [
    { bg:'linear-gradient(135deg,#FFD700,#FFA500)', color:'#fff', label:'🥇 1위', shadow:'rgba(255,165,0,0.3)' },
    { bg:'linear-gradient(135deg,#C0C0C0,#A0A0A0)', color:'#fff', label:'🥈 2위', shadow:'rgba(160,160,160,0.3)' },
    { bg:'linear-gradient(135deg,#CD7F32,#A0522D)', color:'#fff', label:'🥉 3위', shadow:'rgba(160,82,45,0.3)' }
  ];

  // ── 매칭 로직: 내 오행+십성 → TOP 3 동물 ──
  function findCompatAnimals(myOheng, mySipsung, myAnimalName) {
    var results = [];
    if (typeof OH_SANG === 'undefined' || typeof ANIMALS === 'undefined') return results;

    var genMe = OH_SANG_REV[myOheng]; // 나를 생해주는 오행
    var iGen = OH_SANG[myOheng];       // 내가 생해주는 오행
    var ssc = SS_COMPAT[mySipsung];
    if (!ssc) ssc = SS_COMPAT['비겁']; // 폴백

    // 1위: 나를 생해주는 오행 + best 십성
    var k1 = genMe + '_' + ssc.best.ss;
    if (ANIMALS[k1]) {
      var reasonText = ssc.best.reason(myAnimalName, ANIMALS[k1].name);
      results.push({
        rank: 1, key: k1, animal: ANIMALS[k1], mod: ANIMALS[k1].mods[0],
        oheng: genMe, sipsung: ssc.best.ss, reason: reasonText
      });
    }

    // 2위: 내가 생해주는 오행 + good 십성
    var k2 = iGen + '_' + ssc.good.ss;
    if (ANIMALS[k2]) {
      var reasonText2 = ssc.good.reason(myAnimalName, ANIMALS[k2].name);
      results.push({
        rank: 2, key: k2, animal: ANIMALS[k2], mod: ANIMALS[k2].mods[0],
        oheng: iGen, sipsung: ssc.good.ss, reason: reasonText2
      });
    }

    // 3위: 같은 오행 + mirror 십성 (자기 자신과 다른 동물)
    var k3 = myOheng + '_' + ssc.mirror.ss;
    if (ANIMALS[k3] && ANIMALS[k3].name !== myAnimalName) {
      var reasonText3 = ssc.mirror.reason(myAnimalName, ANIMALS[k3].name);
      results.push({
        rank: 3, key: k3, animal: ANIMALS[k3], mod: ANIMALS[k3].mods[0],
        oheng: myOheng, sipsung: ssc.mirror.ss, reason: reasonText3
      });
    }

    return results;
  }

  // ── 이미지 URL 헬퍼 ──
  function getAnimalImgUrl(oheng, animalName) {
    var oh = OH_MAP[oheng] || 'Fi';
    var an = AN_MAP[animalName] || 'Li';
    return '/animals/' + oh + an + 'S.png?v=2';
  }

  // ── 내 동물 정보 추출 헬퍼 ──
  function extractMyAnimalInfo(rec) {
    var info = {
      name: rec.name || '나',
      emoji: rec.animalEmoji || '🌟',
      tag: rec.animalTag || '',
      mbti: rec.mbti || '',
      oheng: (rec.saju && rec.saju.dmEl) ? rec.saju.dmEl : '화',
      ilju: '',
      animalName: '',
      animalTitle: '',
      dominantSS: '비겁',
      condition: '신강',
      birth: ''
    };

    // 일주
    if (rec.saju && rec.saju.P && rec.saju.P[2]) {
      info.ilju = rec.saju.P[2].s + rec.saju.P[2].b;
    }

    // 생년월일 텍스트
    if (rec.input) {
      var parts = [];
      if (rec.input.y) parts.push(rec.input.y);
      if (rec.input.m) parts.push(rec.input.m);
      if (rec.input.d) parts.push(rec.input.d);
      info.birth = parts.join('.');
      if (rec.input.h && rec.input.h !== '모름' && rec.input.h !== '') {
        info.birth += ' ' + rec.input.h + ':' + (rec.input.min || '00');
      }
    }

    // 동물 매칭
    if (rec.saju && rec.gg) {
      info.dominantSS = (rec.gg.dominant && rec.gg.dominant[0]) ? rec.gg.dominant[0] : '비겁';
      if (rec.gg.isJonggyeok || rec.gg.isHwakyeok) info.condition = '특수';
      else if (rec.gg.strengthGrade === '신약' || rec.gg.strengthGrade === '극신약') info.condition = '신약';

      var animalObj = (typeof getAnimalResult === 'function') ? getAnimalResult(info.oheng, info.dominantSS, info.condition) : null;
      if (animalObj) {
        info.animalName = animalObj.name;
        info.animalTitle = animalObj.mod ? animalObj.mod.title : '';
        info.emoji = animalObj.emoji;
        info.tag = animalObj.mod ? animalObj.mod.tag : info.tag;
      }
    }

    info.imgUrl = info.animalName ? getAnimalImgUrl(info.oheng, info.animalName) : '';
    info.oc = OC[info.oheng] || OC['화'];

    return info;
  }

  // ══════════════════════════════════════
  // 궁합 동물 진입점
  // ══════════════════════════════════════
  function renderCompatPage() {
    var rec = null;
    if (typeof getFortuneTarget === 'function') rec = getFortuneTarget();
    if (!rec) {
      try {
        var hist = JSON.parse(localStorage.getItem('mbts_history') || '[]');
        if (hist.length > 0) rec = hist[hist.length - 1];
      } catch(e) {}
    }

    window._compatMode = true;   // go('pgAnimal') → renderAnimalPage() 재진입 방지
    go('pgAnimal');
    window._compatMode = false;

    if (rec && rec.saju) {
      svcRenderConfirm(rec);
    } else {
      svcRenderNoResult();
    }
  }

  // ── 결과 없음 안내 ──
  function svcRenderNoResult() {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    var h = '';
    h += '<style>';
    h += '@keyframes svcReveal{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
    h += '.svc-cta{width:100%;padding:16px;font-size:15px;font-weight:700;border:none;border-radius:16px;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit}';
    h += '.svc-cta:hover{transform:translateY(-2px)}.svc-cta:active{transform:translateY(0)}';
    h += '</style>';
    h += '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--bg)">';
    h += '<div style="text-align:center;max-width:320px;animation:svcReveal .5s ease both">';
    h += '<div style="font-size:64px;margin-bottom:20px">🔮</div>';
    h += '<div style="font-family:\'Noto Serif KR\',serif;font-size:20px;font-weight:700;color:var(--text-1);margin-bottom:10px;line-height:1.5">먼저 내 동물을<br>알아볼까요?</div>';
    h += '<div style="font-size:14px;color:var(--text-2);line-height:1.7;margin-bottom:32px">내 운명 동물을 먼저 확인하면<br>잘 맞는 동물도 알려드려요!</div>';
    h += '<button onclick="renderAnimalPage()" class="svc-cta" style="background:linear-gradient(135deg,var(--rose),#C05875);color:#fff;box-shadow:0 4px 20px rgba(212,115,139,0.3)">';
    h += '🦁 내 동물 알아보기 (무료)</button>';
    h += '<div style="margin-top:16px"><button onclick="go(\'pgDash\');setTab(1)" style="background:none;border:none;font-size:13px;color:var(--text-3);cursor:pointer;font-family:inherit">← 돌아가기</button></div>';
    h += '</div></div>';
    pg.innerHTML = h;
  }

  // ══════════════════════════════════════
  // 확인 화면 — "김동진 · 1993.5.26 · INFP" 보여주기
  // ══════════════════════════════════════
  function svcRenderConfirm(rec) {
    var pg = document.getElementById('pgAnimal');
    if (!pg) return;

    var info = extractMyAnimalInfo(rec);

    var h = '';
    h += '<style>';
    h += '@keyframes svcReveal{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
    h += '.svc-cta{width:100%;padding:16px;font-size:15px;font-weight:700;border:none;border-radius:16px;cursor:pointer;transition:all .25s cubic-bezier(.4,0,.2,1);display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit}';
    h += '.svc-cta:hover{transform:translateY(-2px)}.svc-cta:active{transform:translateY(0)}';
    h += '</style>';

    h += '<div style="min-height:100vh;background:var(--bg)">';

    // 상단 바
    h += '<div style="padding:12px 16px;display:flex;align-items:center;justify-content:space-between">';
    h += '<button onclick="go(\'pgDash\');setTab(1)" style="background:none;border:none;font-size:14px;color:var(--rose);font-weight:600;cursor:pointer;font-family:inherit">← 궁합</button>';
    h += '<span style="font-size:12px;font-weight:600;color:var(--text-3);letter-spacing:0.5px">BEST MATCH</span>';
    h += '<div style="width:40px"></div>';
    h += '</div>';

    // 타이틀
    h += '<div style="padding:32px 20px 0;max-width:400px;margin:0 auto;text-align:center">';
    h += '<div style="font-size:18px;font-weight:800;color:var(--text-1);margin-bottom:8px;animation:svcReveal .5s ease both">💕 나와 잘 맞는 동물 찾기</div>';
    h += '<div style="font-size:13px;color:var(--text-2);margin-bottom:28px;animation:svcReveal .5s ease both;animation-delay:.1s;opacity:0">' + info.name + '님의 결과로 볼게요</div>';

    // ── 동물 카드 (이름 · 생년월일 · MBTI 포함) ──
    h += '<div style="background:#fff;border-radius:24px;padding:28px 24px;margin-bottom:32px;';
    h += 'box-shadow:0 4px 24px rgba(0,0,0,0.06);border:1.5px solid ' + info.oc.m + '15;';
    h += 'animation:svcReveal .5s ease both;animation-delay:.15s;opacity:0">';

    // 동물 이미지
    h += '<div style="width:100px;height:100px;margin:0 auto 16px;border-radius:50%;overflow:hidden;border:3px solid ' + info.oc.m + '20;box-shadow:0 6px 20px ' + info.oc.m + '15;background:#fff">';
    if (info.imgUrl) {
      h += '<img src="' + info.imgUrl + '" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML=\'<div style=\\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:48px;background:' + info.oc.bg + '\\\'>' + info.emoji + '</div>\'">';
    } else {
      h += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:48px;background:' + info.oc.bg + '">' + info.emoji + '</div>';
    }
    h += '</div>';

    // 동물 타이틀
    h += '<div style="font-size:17px;font-weight:800;color:var(--text-1);margin-bottom:6px">' + info.emoji + ' ' + (info.animalTitle || info.name) + '</div>';

    // 태그
    if (info.tag) {
      h += '<div style="display:inline-block;padding:5px 14px;background:' + info.oc.g + ';border-radius:100px;font-size:12px;font-weight:700;color:#fff;margin-bottom:12px">#' + info.tag + '</div>';
    }

    // ★ 핵심: 이름 · 생년월일 · MBTI 한줄 표시
    h += '<div style="font-size:14px;color:var(--text-2);font-weight:600;letter-spacing:-0.2px">';
    var infoParts = [];
    if (info.name && info.name !== '나') infoParts.push(info.name);
    if (info.birth) infoParts.push(info.birth);
    if (info.mbti) infoParts.push(info.mbti);
    h += infoParts.join(' · ');
    h += '</div>';

    h += '</div>'; // 카드 끝

    // ── CTA 버튼 ──
    h += '<div style="display:flex;flex-direction:column;gap:10px;animation:svcReveal .5s ease both;animation-delay:.25s;opacity:0">';

    // 이 결과로 보기
    h += '<button class="svc-cta" onclick="svcStartCompatAnalysis()" style="background:linear-gradient(135deg,var(--rose),#C05875);color:#fff;box-shadow:0 4px 20px rgba(212,115,139,0.3);font-size:16px">';
    h += '💕 이 결과로 보기</button>';

    // 다른 사람으로 할래요 → pgBirth로 (궁합용 새 입력)
    h += '<button class="svc-cta" onclick="window._svcMode=\'free\';go(\'pgBirth\')" style="background:rgba(0,0,0,0.03);color:var(--text-2);font-size:14px;font-weight:600">';
    h += '다른 사람으로 할래요</button>';

    h += '</div>';
    h += '</div></div>';

    pg.innerHTML = h;
    window._compatSrc = rec;
  }

  // ── 궁합 분석 실행 ──
  function svcStartCompatAnalysis() {
    var rec = window._compatSrc;
    if (!rec || !rec.saju) { renderCompatPage(); return; }

    _svcInAnalysis = true; // renderAnimalPage 재진입 방지
    var pg = document.getElementById('pgAnimal');
    svcShowCompatLoading(pg);

    setTimeout(function() {
      var info = extractMyAnimalInfo(rec);
      var matches = findCompatAnimals(info.oheng, info.dominantSS, info.animalName);

      if (matches.length === 0) {
        if (typeof showToast === 'function') showToast('매칭 결과를 찾을 수 없어요');
        go('pgDash');
        return;
      }

      svcRenderCompatResult(pg, rec, matches);
      _svcInAnalysis = false;
    }, 1800);
  }

  // ── 궁합 로딩 화면 ──
  function svcShowCompatLoading(pg) {
    if (!pg) return;
    var h = '';
    h += '<style>';
    h += '@keyframes svcHeartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.1)}70%{transform:scale(1)}}';
    h += '@keyframes svcFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
    h += '@keyframes svcBarCompat{0%{width:0}50%{width:55%}100%{width:92%}}';
    h += '@keyframes svcDot{0%,80%,100%{opacity:0.2}40%{opacity:1}}';
    h += '.svc-dots span{animation:svcDot 1.4s ease-in-out infinite;font-weight:700}';
    h += '.svc-dots span:nth-child(2){animation-delay:0.2s}.svc-dots span:nth-child(3){animation-delay:0.4s}';
    h += '</style>';
    h += '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:var(--bg)">';
    h += '<div style="text-align:center;animation:svcFadeIn .6s ease">';
    h += '<div style="font-size:56px;margin-bottom:24px;animation:svcHeartbeat 1.2s ease-in-out infinite">💕</div>';
    h += '<div style="font-family:\'Noto Serif KR\',serif;font-size:19px;font-weight:700;color:var(--text-1);margin-bottom:10px">오행 궁합을 분석하고 있어요</div>';
    h += '<div style="font-size:13px;color:var(--text-3)">나와 잘 맞는 동물을 찾는 중<span class="svc-dots"><span>.</span><span>.</span><span>.</span></span></div>';
    h += '<div style="margin:32px auto 0;width:200px;height:3px;background:rgba(0,0,0,0.04);border-radius:10px;overflow:hidden">';
    h += '<div style="height:100%;background:linear-gradient(90deg,var(--rose),#C05875);border-radius:10px;animation:svcBarCompat 1.6s ease-in-out forwards"></div>';
    h += '</div>';
    h += '</div></div>';
    pg.innerHTML = h;
  }

  // ══════════════════════════════════════
  // 궁합 동물 결과 화면
  // "🦊 여우 × 잘 맞는 동물 TOP 3" 타이틀 포함
  // ══════════════════════════════════════
  function svcRenderCompatResult(pg, rec, matches) {
    if (!pg) return;

    var info = extractMyAnimalInfo(rec);

    var h = '';
    h += '<style>';
    h += '@keyframes svcReveal{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}';
    h += '@keyframes svcPopIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}';
    h += '@keyframes svcImgIn{from{opacity:0;transform:scale(0.8) rotate(-5deg)}to{opacity:1;transform:scale(1) rotate(0)}}';
    h += '.svc-cta{width:100%;padding:16px;font-size:15px;font-weight:700;border:none;border-radius:16px;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit}';
    h += '.svc-cta:hover{transform:translateY(-2px)}.svc-cta:active{transform:translateY(0)}';
    h += '.svc-match-card{background:#fff;border-radius:20px;padding:20px;margin-bottom:12px;';
    h += 'box-shadow:0 2px 16px rgba(0,0,0,0.035);border:1px solid rgba(0,0,0,0.04);';
    h += 'display:flex;align-items:center;gap:16px;transition:all .25s;cursor:pointer}';
    h += '.svc-match-card:hover{transform:translateX(4px);box-shadow:0 4px 20px rgba(0,0,0,0.06)}';
    h += '</style>';

    h += '<div style="min-height:100vh;background:var(--bg)">';

    // ── 상단 바 ──
    h += '<div style="padding:12px 16px;position:sticky;top:0;z-index:10;';
    h += 'background:rgba(248,247,244,0.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);';
    h += 'display:flex;align-items:center;justify-content:space-between">';
    h += '<button onclick="go(\'pgDash\');setTab(1)" style="background:none;border:none;font-size:14px;color:var(--rose);font-weight:600;cursor:pointer;font-family:inherit">← 궁합</button>';
    h += '<span style="font-size:12px;font-weight:600;color:var(--text-3);letter-spacing:0.5px">BEST MATCH</span>';
    h += '<div style="width:40px"></div>';
    h += '</div>';

    // ── 히어로: 내 동물 + "🦊 여우 × 잘 맞는 동물 TOP 3" 타이틀 ──
    h += '<div style="background:linear-gradient(180deg,rgba(212,115,139,0.06) 0%,rgba(255,220,230,0.15) 40%,var(--bg) 100%);padding:24px 20px 28px;text-align:center">';

    // 내 동물 이미지 (소형)
    h += '<div style="animation:svcImgIn .5s ease both">';
    h += '<div style="width:80px;height:80px;margin:0 auto 14px;border-radius:50%;overflow:hidden;border:3px solid ' + info.oc.m + '25;box-shadow:0 6px 20px ' + info.oc.m + '15;background:#fff">';
    if (info.imgUrl) {
      h += '<img src="' + info.imgUrl + '" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML=\'<div style=\\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:40px;background:' + info.oc.bg + '\\\'>' + info.emoji + '</div>\'">';
    } else {
      h += '<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:40px;background:' + info.oc.bg + '">' + info.emoji + '</div>';
    }
    h += '</div></div>';

    // ★ 핵심: "🦊 여우 × 잘 맞는 동물 TOP 3" 타이틀
    h += '<div style="animation:svcReveal .5s ease both;animation-delay:.1s;opacity:0">';
    h += '<div style="font-family:\'Noto Serif KR\',serif;font-size:22px;font-weight:700;color:var(--text-1);line-height:1.4">';
    h += info.emoji + ' ' + (info.animalName || info.name) + ' ×</div>';
    h += '<div style="font-family:\'Noto Serif KR\',serif;font-size:22px;font-weight:700;color:var(--text-1);line-height:1.4">잘 맞는 동물 <span style="color:var(--rose)">TOP 3</span></div>';

    // 이름 · 생년월일 · MBTI 서브텍스트
    h += '<div style="font-size:12px;color:var(--text-3);margin-top:10px">';
    var subParts = [];
    if (info.name && info.name !== '나') subParts.push(info.name);
    if (info.birth) subParts.push(info.birth);
    if (info.mbti) subParts.push(info.mbti);
    h += subParts.join(' · ');
    h += '</div>';

    h += '</div>';
    h += '</div>';

    // ── TOP 3 카드 영역 ──
    h += '<div style="padding:8px 16px 32px;max-width:480px;margin:0 auto">';

    for (var i = 0; i < matches.length; i++) {
      var mt = matches[i];
      var moc = OC[mt.oheng] || OC['화'];
      var mImgUrl = getAnimalImgUrl(mt.oheng, mt.animal.name);
      var rs = RANK_STYLE[i];
      var delay = (0.2 + i * 0.12).toFixed(2);

      h += '<div class="svc-match-card" style="animation:svcReveal .5s ease both;animation-delay:' + delay + 's;opacity:0">';

      // 동물 이미지 + 랭크 배지
      h += '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0">';
      h += '<div style="width:60px;height:60px;border-radius:50%;overflow:hidden;border:2.5px solid ' + moc.m + '25;box-shadow:0 4px 12px ' + moc.m + '15;background:#fff">';
      h += '<img src="' + mImgUrl + '" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML=\'<div style=\\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:28px;background:' + moc.bg + '\\\'>' + mt.animal.emoji + '</div>\'">';
      h += '</div>';
      h += '<span style="display:inline-block;padding:2px 10px;background:' + rs.bg + ';border-radius:100px;font-size:10px;font-weight:800;color:' + rs.color + ';box-shadow:0 2px 8px ' + rs.shadow + ';white-space:nowrap">' + rs.label + '</span>';
      h += '</div>';

      // 동물 정보 + 구체적 이유
      h += '<div style="flex:1;min-width:0">';
      h += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap">';
      h += '<span style="font-size:16px;font-weight:800;color:var(--text-1)">' + mt.animal.emoji + ' ' + mt.animal.name + '</span>';
      h += '<span style="padding:3px 10px;background:' + moc.bg + ';border-radius:100px;font-size:10px;font-weight:700;color:' + moc.m + '">' + mt.oheng + '(' + moc.hj + ')</span>';
      h += '</div>';
      h += '<div style="display:inline-block;padding:3px 10px;background:' + moc.g + ';border-radius:100px;font-size:11px;font-weight:700;color:#fff;margin-bottom:6px">#' + mt.mod.tag + '</div>';
      // ★ 핵심: 구체적인 매칭 이유
      h += '<div style="font-size:12px;color:var(--text-2);line-height:1.6">' + mt.reason + '</div>';
      h += '</div>';

      h += '</div>';
    }

    // ── 구분선 + CTA ──
    h += '<div style="height:1px;background:rgba(0,0,0,0.04);margin:20px 0"></div>';

    h += '<div style="display:flex;flex-direction:column;gap:10px;animation:svcReveal .5s ease both;animation-delay:.55s;opacity:0">';

    // 궁합 제대로 보기
    h += '<button class="svc-cta" onclick="goToGunghap(\'pgAnimal\')" style="background:linear-gradient(135deg,var(--rose),#C05875);color:#fff;box-shadow:0 4px 20px rgba(212,115,139,0.28)">';
    h += '💕 궁합 제대로 보기 <span style="font-size:11px;opacity:0.75;margin-left:2px">🍀15</span></button>';

    // 카카오 공유
    h += '<button class="svc-cta" onclick="svcShareCompatKakao()" style="background:#FEE500;color:#191919;box-shadow:0 4px 16px rgba(254,229,0,0.35)">';
    h += '📣 내 결과 공유하기</button>';

    // 내 동물 다시 보기
    h += '<button class="svc-cta" onclick="renderAnimalPage()" style="background:rgba(0,0,0,0.03);color:var(--text-2);font-size:14px;font-weight:600">';
    h += '🦁 내 동물 다시 보기</button>';

    h += '</div>';

    h += '<div style="text-align:center;margin-top:16px;padding-bottom:24px">';
    h += '<button onclick="renderCompatPage()" style="background:none;border:none;font-size:13px;color:var(--text-3);cursor:pointer;font-family:inherit;text-decoration:underline">🔄 다시 분석하기</button>';
    h += '</div>';

    h += '</div></div>';

    pg.innerHTML = h;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window._lastCompatResult = { rec: rec, matches: matches };
  }

  // ── 궁합 결과 카카오 공유 ──
  function svcShareCompatKakao() {
    var r = window._lastCompatResult;
    if (!r || !r.matches || r.matches.length === 0) return;
    var info = extractMyAnimalInfo(r.rec);
    var top = r.matches[0];
    var shareUrl = 'https://mbts.kr';
    if (typeof mbtsSession !== 'undefined' && mbtsSession && mbtsSession.userId) {
      shareUrl += '?ref=' + mbtsSession.userId;
    }

    var title = info.emoji + ' ' + (info.animalName || info.name) + '과 잘 맞는 1위: ' + top.animal.emoji + ' ' + top.animal.name;
    var desc = '#' + top.mod.tag + ' — ' + top.reason;

    if (typeof Kakao !== 'undefined' && Kakao.isInitialized()) {
      try {
        Kakao.Share.sendDefault({
          objectType: 'feed',
          content: {
            title: title, description: desc,
            imageUrl: 'https://mbts.kr' + getAnimalImgUrl(top.oheng, top.animal.name).replace('?v=2','') + '?v=2',
            imageWidth: 800, imageHeight: 600,
            link: { mobileWebUrl: shareUrl, webUrl: shareUrl }
          },
          buttons: [{ title: '🔮 나도 알아보기', link: { mobileWebUrl: shareUrl, webUrl: shareUrl } }]
        });
        return;
      } catch(e) {}
    }

    if (navigator.share) {
      navigator.share({ title: title, text: desc + '\n\n나도 알아보기 👉\n' + shareUrl, url: shareUrl }).catch(function(){});
      return;
    }

    var text = title + '\n' + desc + '\n\n' + shareUrl;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function() {
        if (typeof showToast === 'function') showToast('복사되었어요!');
      });
    }
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
  window.renderCompatPage = renderCompatPage;
  window.svcRenderResult = svcRenderResult;
  window.svcStartCompatAnalysis = svcStartCompatAnalysis;
  window.svcShareCompatKakao = svcShareCompatKakao;
  window.svcShareKakao = svcShareKakao;

  // ── 디버그 체크리스트 ──
  console.log('[MBTS][DEBUG] renderCompatPage 존재:', typeof renderCompatPage);
  console.log('[MBTS][DEBUG] renderAnimalPage 존재:', typeof renderAnimalPage);
  console.log('[MBTS][DEBUG] OH_SANG 존재:', typeof OH_SANG);
  console.log('[MBTS][DEBUG] ANIMALS 존재:', typeof ANIMALS);
  console.log('[MBTS][DEBUG] getAnimalResult 존재:', typeof getAnimalResult);
  console.log('[MBTS][DEBUG] getFortuneTarget 존재:', typeof getFortuneTarget);

  console.log('[MBTS] service.js v2 loaded (프리미엄 톤 무료 동물 서비스)');
})();
