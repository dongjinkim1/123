// ============================================================
// people.js — 사람 목록 저장 + 궁합 선택 시스템
// mbts.html 기존 코드를 감싸서 기능을 추가합니다.
// 이 파일을 제거하면 기존 기능이 100% 그대로 동작합니다.
// ============================================================

(function() {
  'use strict';

  // ────────────────────────────────────
  // 1. 사람 목록 저장소 (localStorage)
  // ────────────────────────────────────
  var STORAGE_KEY = 'mbts_people';

  // 사람 목록 불러오기
  function getPeople() {
    try {
      var data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch(e) { return []; }
  }

  // 사람 목록 저장
  function savePeople(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch(e) { console.warn('[people.js] 저장 실패:', e); }
  }

  // 사람 추가/업데이트
  function addPerson(personData) {
    var list = getPeople();
    // 같은 id가 있으면 업데이트, 없으면 추가
    var found = false;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === personData.id) {
        list[i] = personData;
        found = true;
        break;
      }
    }
    if (!found) list.push(personData);
    savePeople(list);
    return list;
  }

  // 사람 삭제
  function removePerson(id) {
    var list = getPeople().filter(function(p) { return p.id !== id; });
    savePeople(list);
    return list;
  }

  // 고유 ID 생성
  function genId() {
    return 'p_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
  }

  // 전역 노출 (gunghap.js에서 접근용)
  window.MBTS_People = {
    get: getPeople,
    save: savePeople,
    add: addPerson,
    remove: removePerson,
    genId: genId
  };


  // ────────────────────────────────────
  // 2. 사주 분석 완료 시 자동 저장 (startAnalysis 래핑 안 함!)
  //    대신 localStorage 저장 시점을 감시해서 people 목록에도 추가
  // ────────────────────────────────────

  // mbts.html이 mbts_lastResult에 저장하는 걸 감시
  // 주기적 체크 대신, 분석 완료 시 renderResult를 래핑

  // 기존 viewSavedResult를 래핑하지 않고,
  // _lastSaju가 설정될 때 people 목록에 자동 추가하는 방식

  // "나" 데이터를 people 목록에 저장하는 함수
  function saveMyDataToPeople() {
    if (!window._lastSaju || !window._lastMBTI) return;

    var saju = window._lastSaju;
    var ilju = saju.P[2].s + saju.P[2].b;
    var mbti = window._lastMBTI;

    var person = {
      id: 'me',  // "나"는 항상 id='me'
      name: '나',
      ilju: ilju,
      mbti: mbti,
      gender: ST.gender || '',
      birthInfo: { y: ST.y, m: ST.m, d: ST.d, h: ST.h || '', min: ST.min || '' },
      hasFull: true,  // 전체 분석 완료
      saju: saju,
      dw: window._lastDW,
      gg: window._lastGG,
      mbtiObj: window._lastMBTIObj,
      savedAt: Date.now()
    };

    addPerson(person);
    renderPeopleList();
  }

  // 궁합 결과에서 상대방 데이터도 저장
  function savePartnerToPeople(sajuB, ggB, dwB, mbtiB, genderB, birthInfo) {
    var ilju = sajuB.P[2].s + sajuB.P[2].b;
    var person = {
      id: genId(),
      name: ilju + ' · ' + mbtiB.type,
      ilju: ilju,
      mbti: mbtiB.type,
      gender: genderB || '',
      birthInfo: birthInfo || {},
      hasFull: false,  // AI 풀이 없음 (사주 데이터만 있음)
      saju: sajuB,
      dw: dwB,
      gg: ggB,
      mbtiObj: mbtiB,
      savedAt: Date.now()
    };
    addPerson(person);
    renderPeopleList();
    return person;
  }

  window.MBTS_People.saveMyData = saveMyDataToPeople;
  window.MBTS_People.savePartner = savePartnerToPeople;


  // ────────────────────────────────────
  // 3. "내 사주" 탭에 사람 목록 UI 렌더링
  // ────────────────────────────────────

  function renderPeopleList() {
    var container = document.getElementById('people-list-container');
    if (!container) return;

    var people = getPeople();
    if (people.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px 0">아직 분석한 사람이 없어요.<br>위에서 사주 분석을 시작해보세요!</p>';
      return;
    }

    var h = '';
    people.forEach(function(p) {
      var dateStr = p.savedAt ? new Date(p.savedAt).toLocaleDateString('ko-KR') : '';
      var statusBadge = p.hasFull
        ? '<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(76,175,125,.1);color:#4CAF7D;border-radius:6px">분석완료</span>'
        : '<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(201,154,46,.1);color:#c99a2e;border-radius:6px">기본정보</span>';
      var isMe = p.id === 'me';

      h += '<div class="glass-card" style="padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;position:relative" ';
      if (isMe && p.hasFull) {
        h += 'onclick="viewSavedResult()"';
      }
      h += '>';
      h += '<div style="width:40px;height:40px;border-radius:12px;background:' + (isMe ? 'var(--accent-dim)' : 'rgba(214,51,132,.08)') + ';display:flex;align-items:center;justify-content:center;font-size:20px">' + (isMe ? '🙋' : '👤') + '</div>';
      h += '<div style="flex:1">';
      h += '<div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px;font-weight:700;color:var(--text-primary)">' + (p.name || p.ilju) + '</span>' + statusBadge + '</div>';
      h += '<div style="font-size:12px;color:var(--text-muted);margin-top:2px">' + p.ilju + '일주 · ' + p.mbti + (dateStr ? ' · ' + dateStr : '') + '</div>';
      h += '</div>';

      // "나"가 아닌 사람만 삭제 버튼
      if (!isMe) {
        h += '<button onclick="event.stopPropagation();MBTS_People.removePerson(\'' + p.id + '\')" style="background:none;border:none;font-size:16px;color:var(--text-muted);cursor:pointer;padding:4px 8px">✕</button>';
      } else {
        h += '<span style="font-size:16px;color:var(--text-muted)">›</span>';
      }

      h += '</div>';
    });

    container.innerHTML = h;
  }

  // 삭제 함수 전역 노출
  window.MBTS_People.removePerson = function(id) {
    if (confirm('이 사람을 목록에서 삭제할까요?')) {
      removePerson(id);
      renderPeopleList();
      renderGunghapPeopleSelector();
    }
  };

  window.MBTS_People.renderList = renderPeopleList;


  // ────────────────────────────────────
  // 4. "내 사주" 탭에 사람 목록 영역 삽입
  // ────────────────────────────────────

  function injectPeopleListUI() {
    var sajuContent = document.getElementById('home-content-saju');
    if (!sajuContent) return;
    if (document.getElementById('people-list-container')) return; // 이미 있으면 스킵

    // 기존 "내 분석 기록" 섹션 다음에 사람 목록 추가
    var listSection = document.createElement('div');
    listSection.style.marginTop = '20px';
    listSection.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
      + '<div style="font-size:13px;font-weight:700;color:var(--text-muted)">📋 분석한 사람 목록</div>'
      + '<button onclick="goPage(\'birth\')" style="background:none;border:1px solid var(--accent);color:var(--accent);font-size:11px;font-weight:600;padding:4px 10px;border-radius:8px;cursor:pointer">+ 새 사람 추가</button>'
      + '</div>'
      + '<div id="people-list-container"></div>';

    sajuContent.appendChild(listSection);
    renderPeopleList();
  }


  // ────────────────────────────────────
  // 5. 궁합 탭에 "사람 선택" UI
  // ────────────────────────────────────

  var GH_SELECTED_A = null;  // 선택된 사람 A
  var GH_SELECTED_B = null;  // 선택된 사람 B

  window.MBTS_People.getSelectedA = function() { return GH_SELECTED_A; };
  window.MBTS_People.getSelectedB = function() { return GH_SELECTED_B; };

  function renderGunghapPeopleSelector() {
    var container = document.getElementById('gh-people-selector');
    if (!container) return;

    var people = getPeople();

    if (people.length < 1) {
      container.innerHTML = '<div class="glass-card" style="padding:20px;text-align:center">'
        + '<p style="color:var(--text-muted);font-size:13px;line-height:1.6">아직 분석한 사람이 없어요.<br>먼저 사주 분석을 해주세요!</p>'
        + '<button onclick="switchHomeTab(\'saju\')" style="margin-top:12px;padding:10px 20px;font-size:13px;font-weight:700;color:#fff;background:var(--accent);border:none;border-radius:10px">🔮 사주 분석하러 가기</button>'
        + '</div>';
      return;
    }

    var h = '';

    // A 선택
    h += '<div style="margin-bottom:16px">';
    h += '<label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">👤 첫 번째 사람</label>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    people.forEach(function(p) {
      var isSelected = GH_SELECTED_A && GH_SELECTED_A.id === p.id;
      var isDisabled = GH_SELECTED_B && GH_SELECTED_B.id === p.id;
      h += '<button onclick="MBTS_People.selectA(\'' + p.id + '\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;cursor:' + (isDisabled ? 'not-allowed' : 'pointer') + ';border:2px solid ' + (isSelected ? 'var(--accent)' : 'var(--border-light)') + ';background:' + (isSelected ? 'rgba(136,97,154,0.08)' : '#fff') + ';color:' + (isSelected ? 'var(--accent)' : (isDisabled ? 'var(--border-light)' : 'var(--text-muted)')) + '">' + (p.id === 'me' ? '🙋 ' : '👤 ') + (p.name || p.ilju) + '</button>';
    });
    h += '</div></div>';

    // B 선택
    h += '<div style="margin-bottom:16px">';
    h += '<label style="font-size:12px;font-weight:700;color:#d63384;display:block;margin-bottom:6px">👤 두 번째 사람</label>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
    people.forEach(function(p) {
      var isSelected = GH_SELECTED_B && GH_SELECTED_B.id === p.id;
      var isDisabled = GH_SELECTED_A && GH_SELECTED_A.id === p.id;
      h += '<button onclick="MBTS_People.selectB(\'' + p.id + '\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;cursor:' + (isDisabled ? 'not-allowed' : 'pointer') + ';border:2px solid ' + (isSelected ? '#d63384' : 'var(--border-light)') + ';background:' + (isSelected ? 'rgba(214,51,132,0.08)' : '#fff') + ';color:' + (isSelected ? '#d63384' : (isDisabled ? 'var(--border-light)' : 'var(--text-muted)')) + '">' + (p.id === 'me' ? '🙋 ' : '👤 ') + (p.name || p.ilju) + '</button>';
    });
    // "새 사람 직접 입력" 버튼
    h += '<button onclick="MBTS_People.goManualInput()" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;cursor:pointer;border:2px dashed var(--border-light);background:#fff;color:var(--text-muted)">+ 새 사람 추가</button>';
    h += '</div></div>';

    // 선택 결과 미리보기
    if (GH_SELECTED_A && GH_SELECTED_B) {
      h += '<div class="glass-card" style="padding:14px;margin-bottom:12px;background:rgba(136,97,154,0.03)">';
      h += '<div style="display:flex;align-items:center;justify-content:center;gap:12px">';
      h += '<div style="text-align:center"><div style="font-size:20px">🙋</div><div style="font-size:13px;font-weight:700;color:var(--text-primary)">' + (GH_SELECTED_A.name || GH_SELECTED_A.ilju) + '</div><div style="font-size:11px;color:var(--text-muted)">' + GH_SELECTED_A.ilju + ' · ' + GH_SELECTED_A.mbti + '</div></div>';
      h += '<div style="font-size:24px">💕</div>';
      h += '<div style="text-align:center"><div style="font-size:20px">🙋</div><div style="font-size:13px;font-weight:700;color:var(--text-primary)">' + (GH_SELECTED_B.name || GH_SELECTED_B.ilju) + '</div><div style="font-size:11px;color:var(--text-muted)">' + GH_SELECTED_B.ilju + ' · ' + GH_SELECTED_B.mbti + '</div></div>';
      h += '</div></div>';
    }

    container.innerHTML = h;
  }

  // 사람 선택 함수
  window.MBTS_People.selectA = function(id) {
    var people = getPeople();
    var person = null;
    for (var i = 0; i < people.length; i++) {
      if (people[i].id === id) { person = people[i]; break; }
    }
    if (!person) return;
    if (GH_SELECTED_B && GH_SELECTED_B.id === id) return; // 같은 사람 선택 방지
    GH_SELECTED_A = person;
    renderGunghapPeopleSelector();
    checkGunghapPeopleReady();
  };

  window.MBTS_People.selectB = function(id) {
    var people = getPeople();
    var person = null;
    for (var i = 0; i < people.length; i++) {
      if (people[i].id === id) { person = people[i]; break; }
    }
    if (!person) return;
    if (GH_SELECTED_A && GH_SELECTED_A.id === id) return;
    GH_SELECTED_B = person;
    renderGunghapPeopleSelector();
    checkGunghapPeopleReady();
  };

  // 새 사람 직접 입력 (기존 궁합 입력 페이지로 이동)
  window.MBTS_People.goManualInput = function() {
    goPage('gh-input');
  };


  // ────────────────────────────────────
  // 6. 궁합 탭 컨텐츠 교체
  // ────────────────────────────────────

  function injectGunghapSelectorUI() {
    var ghContent = document.getElementById('home-content-gunghap');
    if (!ghContent) return;
    if (document.getElementById('gh-people-selector')) return;

    // 기존 궁합 카드 아래에 사람 선택 영역 추가
    var selectorSection = document.createElement('div');
    selectorSection.style.marginTop = '16px';
    selectorSection.innerHTML = ''
      + '<div class="glass-card" style="padding:24px 20px;margin-bottom:16px">'
      + '<h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px">💑 두 사람을 선택하세요</h3>'
      + '<p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">분석한 사람 목록에서 두 사람을 골라 궁합을 볼 수 있어요</p>'
      + '<div id="gh-people-selector"></div>'
      // 관계 선택 (gunghap.js의 UI와 별개로, 여기서도 관계 선택)
      + '<div id="gh-people-rel" style="display:none;margin-top:12px">'
      + '<label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">우리의 관계</label>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px">'
      + '<button onclick="MBTS_People.pickRel(\'ssom\')" id="gp-rel-ssom" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💕 썸</button>'
      + '<button onclick="MBTS_People.pickRel(\'lover\')" id="gp-rel-lover" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">❤️ 연인</button>'
      + '<button onclick="MBTS_People.pickRel(\'family\')" id="gp-rel-family" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">👨‍👩‍👧 가족</button>'
      + '<button onclick="MBTS_People.pickRel(\'colleague\')" id="gp-rel-colleague" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💼 동료</button>'
      + '<button onclick="MBTS_People.pickRel(\'friend\')" id="gp-rel-friend" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">🍻 친구</button>'
      + '</div></div>'
      // 궁합 시작 버튼
      + '<button id="btn-gh-people-start" onclick="MBTS_People.startGunghapFromList()" style="display:none;width:100%;padding:14px;font-size:15px;font-weight:700;color:#fff;background:#d63384;border:none;border-radius:12px;margin-top:16px;box-shadow:0 4px 16px rgba(214,51,132,.2);cursor:pointer" disabled>두 사람을 선택해주세요</button>'
      + '</div>';

    ghContent.appendChild(selectorSection);
    renderGunghapPeopleSelector();
  }

  // 관계 선택
  var GP_REL = '';
  window.MBTS_People.pickRel = function(type) {
    GP_REL = type;
    // GH_REL도 동기화 (gunghap.js에서 사용)
    if (typeof GH_REL !== 'undefined') window.GH_REL = type;
    ['ssom','lover','family','colleague','friend'].forEach(function(t) {
      var btn = document.getElementById('gp-rel-' + t);
      if (btn) {
        btn.style.background = (t === type) ? 'rgba(136,97,154,0.08)' : '#fff';
        btn.style.color = (t === type) ? 'var(--accent)' : 'var(--text-muted)';
        btn.style.borderColor = (t === type) ? 'var(--accent)' : 'var(--border-light)';
      }
    });
    checkGunghapPeopleReady();
  };

  // 준비 상태 체크
  function checkGunghapPeopleReady() {
    var btn = document.getElementById('btn-gh-people-start');
    var relDiv = document.getElementById('gh-people-rel');
    if (!btn) return;

    // 두 사람 선택됐으면 관계 선택 표시
    if (GH_SELECTED_A && GH_SELECTED_B) {
      if (relDiv) relDiv.style.display = 'block';
    } else {
      if (relDiv) relDiv.style.display = 'none';
    }

    var ready = GH_SELECTED_A && GH_SELECTED_B && GP_REL;
    btn.style.display = (GH_SELECTED_A && GH_SELECTED_B) ? 'block' : 'none';
    btn.disabled = !ready;

    if (ready) {
      var cat = (typeof GH_CATEGORIES !== 'undefined' && GH_CATEGORIES[GP_REL]) ? GH_CATEGORIES[GP_REL] : null;
      var emoji = cat ? cat.emoji : '💕';
      var label = cat ? cat.label : '궁합';
      btn.textContent = emoji + ' ' + (GH_SELECTED_A.name || GH_SELECTED_A.ilju) + ' × ' + (GH_SELECTED_B.name || GH_SELECTED_B.ilju) + ' ' + label + ' 분석 시작!';
      btn.style.background = '#d63384';
      btn.style.color = '#fff';
      btn.style.cursor = 'pointer';
    } else if (GH_SELECTED_A && GH_SELECTED_B) {
      btn.textContent = '☝️ 관계를 선택해주세요';
      btn.style.background = 'rgba(0,0,0,0.08)';
      btn.style.color = 'var(--text-muted)';
      btn.style.cursor = 'not-allowed';
    }
  }


  // ────────────────────────────────────
  // 7. 목록에서 궁합 시작! (핵심!)
  // ────────────────────────────────────

  window.MBTS_People.startGunghapFromList = async function() {
    if (!GH_SELECTED_A || !GH_SELECTED_B || !GP_REL) return;

    var pA = GH_SELECTED_A;
    var pB = GH_SELECTED_B;

    // 필요한 전역변수들 설정 (기존 startGunghap이 참조하는 것들)
    window._lastSaju = pA.saju;
    window._lastDW = pA.dw;
    window._lastGG = pA.gg;
    window._lastMBTI = pA.mbti;
    window._lastMBTIObj = pA.mbtiObj;

    // gunghap.js의 GH_REL, GH_GENDER 설정
    if (typeof GH_REL !== 'undefined') window.GH_REL = GP_REL;
    if (typeof GH_GENDER !== 'undefined') window.GH_GENDER = pB.gender || '남성';
    if (typeof GH_MBTI_SEL !== 'undefined') window.GH_MBTI_SEL = pB.mbti;

    // API 키 확인
    var apiKey = getApiKey();
    if (!apiKey) { apiKey = await promptApiKey(); if (!apiKey) return; }

    // 궁합 엔진 실행 (기존 함수 그대로 — gender 파라미터 포함!)
    var ghResult = analyzeGunghap(pA.saju, pB.saju, pA.dw, pB.dw, pA.gg, pB.gg, pA.mbtiObj, pB.mbtiObj, pA.gender || '남성', pB.gender || '남성');

    // 관계별 점수 가중치 재계산 (gunghap.js의 GH_CATEGORIES 활용)
    if (typeof GH_CATEGORIES !== 'undefined' && GH_CATEGORIES[GP_REL]) {
      var w = GH_CATEGORIES[GP_REL].scoreWeights;
      ghResult.scores.total = Math.round(
        ghResult.scores.love * w.love +
        ghResult.scores.comm * w.comm +
        ghResult.scores.values * w.values +
        ghResult.scores.work * w.work
      );
    }

    // 로딩 화면
    goPage('gh-load');
    var cat = (typeof GH_CATEGORIES !== 'undefined' && GH_CATEGORIES[GP_REL]) ? GH_CATEGORIES[GP_REL] : {emoji:'💕',label:'궁합',categories:['연애 케미','소통 방식','갈등 패턴','장기 전망']};
    var msgs = [
      '두 사람의 사주를 펼칩니다...',
      '천간지지 교차 분석 중...',
      cat.emoji + ' ' + cat.label + ' 궁합을 분석합니다...',
      '인지기능 궁합 탐색...',
      cat.categories[0] + ' 분석 중...',
      (cat.categories[1] || '소통 방식') + ' 분석 중...',
      (cat.categories[2] || '장기 전망') + ' 분석 중...',
      '두 사람의 이야기를 쓰고 있습니다...'
    ];
    var p = 0, iv = setInterval(function() {
      p += Math.random() * 1.5 + 0.4;
      if (p > 95) p = 95;
      document.getElementById('gh-load-bar').style.width = p + '%';
      document.getElementById('gh-load-pct').textContent = Math.round(p) + '%';
      document.getElementById('gh-load-msg').textContent = msgs[Math.min(Math.floor(p / 12), 7)];
    }, 900);

    // AI 프롬프트 생성
    var userPrompt = buildGunghapUserPrompt(ghResult, pA.saju, pB.saju, pA.dw, pB.dw, pA.gg, pB.gg, pA.mbtiObj, pB.mbtiObj);

    // 관계 유형 정보 덧붙이기
    userPrompt += '\n### 관계 유형: ' + cat.label + '\n';
    userPrompt += '이 두 사람은 ' + cat.label + ' 관계입니다.\n';
    userPrompt += '아래 카테고리로 풀이하세요:\n';
    cat.categories.forEach(function(c, i) {
      userPrompt += (i + 1) + '. ' + c + '\n';
    });
    userPrompt += '\n톤 지시: ' + (cat.tone || '') + '\n';

    // 시스템 프롬프트 (GUNGHAP_SYSTEM에 관계 정보 추가)
    var systemPrompt = GUNGHAP_SYSTEM;

    // AI 호출
    var aiResult = null, apiError = '';
    try {
      var aiText = await streamSonnet(apiKey, systemPrompt, userPrompt, cat.emoji + ' 궁합 분석', 'gh-load-msg', 'gh-load-bar', 'gh-load-pct', '/api/gunghap-analyze');
      try {
        aiResult = JSON.parse(aiText);
      } catch(e) {
        var fb = aiText.indexOf('{'), lb = aiText.lastIndexOf('}');
        if (fb >= 0 && lb > fb) {
          try { aiResult = JSON.parse(aiText.substring(fb, lb + 1)); } catch(e2) {}
        }
        if (!aiResult) {
          var lines = aiText.split('\n');
          var si = -1, ei = -1;
          for (var li = 0; li < lines.length; li++) {
            if (si < 0 && lines[li].trim().charAt(0) === '{') si = li;
            if (lines[li].trim().charAt(0) === '}' || lines[li].trim().slice(-1) === '}') ei = li;
          }
          if (si >= 0 && ei >= si) {
            try { aiResult = JSON.parse(lines.slice(si, ei + 1).join('\n')); } catch(e3) {}
          }
        }
        if (!aiResult) {
          var sanitized = aiText.substring(fb >= 0 ? fb : 0, (lb > 0 ? lb + 1 : aiText.length));
          sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, function(c) { return c === '\n' || c === '\r' || c === '\t' ? c : ''; });
          try { aiResult = JSON.parse(sanitized); } catch(e4) {}
        }
        if (aiResult) { apiError = ''; } else { apiError = 'JSON_PARSE'; }
      }
    } catch(e) {
      apiError = e.message || 'UNKNOWN';
    }

    clearInterval(iv);
    document.getElementById('gh-load-bar').style.width = '100%';
    document.getElementById('gh-load-pct').textContent = '100%';

    // 결과 렌더링 (기존 renderGunghapResult 사용)
    setTimeout(function() {
      renderGunghapResult(ghResult, aiResult, pA.saju, pB.saju, pA.mbtiObj, pB.mbtiObj, pA.gg, pB.gg, apiError);
      goPage('gh-res');
    }, 600);
  };


  // ────────────────────────────────────
  // 8. goPage 래핑 (people.js 버전)
  // ────────────────────────────────────

  var _origGoPagePeople = window.goPage;
  window.goPage = function(pg) {
    _origGoPagePeople(pg);
  };


  // ────────────────────────────────────
  // 9. 사주 분석 완료 감지 → 자동 저장
  // ────────────────────────────────────

  // renderResult를 래핑해서 분석 완료 시 people에 "나" 저장
  var _origRenderResult = window.renderResult;
  if (typeof _origRenderResult === 'function') {
    window.renderResult = function() {
      // 기존 렌더링 먼저
      _origRenderResult.apply(this, arguments);
      // "나" 데이터를 people에 저장
      setTimeout(saveMyDataToPeople, 500);
    };
  }

  // localStorage 복원 시에도 people에 반영
  setTimeout(function() {
    if (window._lastSaju && window._lastMBTI) {
      saveMyDataToPeople();
    }
  }, 1000);


  // ────────────────────────────────────
  // 10. 페이지 전환 시 UI 주입
  // ────────────────────────────────────

  var _origSwitchHomeTab = window.switchHomeTab;
  if (typeof _origSwitchHomeTab === 'function') {
    window.switchHomeTab = function(tab) {
      _origSwitchHomeTab(tab);
      if (tab === 'saju') {
        setTimeout(function() {
          injectPeopleListUI();
          renderPeopleList();
        }, 100);
      }
      if (tab === 'gunghap') {
        setTimeout(function() {
          injectGunghapSelectorUI();
          renderGunghapPeopleSelector();
          // 선택 초기화
          GH_SELECTED_A = null;
          GH_SELECTED_B = null;
          GP_REL = '';
        }, 100);
      }
    };
  }

  // 초기 로드 시에도 주입
  setTimeout(function() {
    injectPeopleListUI();
    renderPeopleList();
  }, 500);


  console.log('[people.js] 사람 목록 시스템 로드 완료');

})();
