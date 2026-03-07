(function() {
  'use strict';

  // ══════════════════════════════════
  // PART A: 상태 변수
  // ══════════════════════════════════

  var chatContext = null;       // null=목록, {type:'me'|'person'|'gunghap', person:{}, ghResult:{}, relType:''}
  var currentMode = 'sweet';   // sweet | fire
  var chatHistory = [];         // 현재 채팅방 대화 기록
  var isChatLoading = false;    // API 호출 중 플래그

  function safeStr(v) {
    if (!v) return '';
    if (typeof v === 'string') return v;
    try { return JSON.stringify(v); } catch(e) { return ''; }
  }

  // ══════════════════════════════════
  // PART B: 목록 화면 렌더링
  // ══════════════════════════════════

  function renderChatList() {
    chatContext = null;
    chatHistory = [];
    var pg = document.getElementById('pgChat');
    if (!pg) return;

    // fortune-target.js에서 내 사주 대상 가져오기
    var myTarget = (typeof getFortuneTarget === 'function') ? getFortuneTarget() : null;
    var hasMySaju = !!(myTarget && myTarget.saju);
    var myIlju = '';
    var myMBTI = (myTarget && myTarget.mbti) ? myTarget.mbti : '';
    if (hasMySaju && myTarget.saju.P && myTarget.saju.P[2]) {
      myIlju = myTarget.saju.P[2].s + myTarget.saju.P[2].b;
    }

    // mbts_history에서 사람 목록 읽기 (내 MBTS 대상 제외)
    var others = [];
    try {
      var histAll = JSON.parse(localStorage.getItem('mbts_history') || '[]');
      var myTargetId = (myTarget && myTarget.id) ? myTarget.id : null;
      for (var i = 0; i < histAll.length; i++) {
        var rec = histAll[i];
        if (rec.id !== myTargetId) {
          others.push({
            id: rec.id,
            name: rec.name || '\uc774\ub984 \uc5c6\uc74c',
            gender: (rec.input && rec.input.gender) ? rec.input.gender : '',
            ilju: rec.animalIlju || ((rec.saju && rec.saju.P && rec.saju.P[2]) ? rec.saju.P[2].s + rec.saju.P[2].b : ''),
            mbti: rec.mbti || '',
            saju: rec.saju,
            gg: rec.gg,
            dw: rec.dw,
            mbtiObj: rec.mbtiObj,
            emoji: rec.animalEmoji || '\ud83c\udf1f',
            tag: rec.animalTag || '',
            aiResult: rec.aiResult || ''
          });
        }
      }
    } catch(e) {}

    var h = '';

    // ─── 상단 바 ───
    h += '<div style="'
      + 'padding:14px 16px;'
      + 'background:rgba(248,247,244,0.95);'
      + 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);'
      + 'border-bottom:1px solid rgba(0,0,0,0.06);'
      + 'display:flex;align-items:center;gap:12px;'
      + 'position:sticky;top:0;z-index:10'
      + '">';
    h += '<button onclick="go(\'pgDash\')" style="'
      + 'background:none;border:none;font-size:14px;color:#8B6CC1;'
      + 'font-weight:600;padding:4px 0;cursor:pointer'
      + '">\u2190 \ub4a4\ub85c</button>';
    h += '<div style="font-size:17px;font-weight:700;flex:1">\ud83d\udc30 \ub2ec\ud1a0 \uc0c1\ub2f4</div>';
    h += '</div>';

    // ─── 본문 시작 ───
    h += '<div style="'
      + 'flex:1;overflow-y:auto;padding:16px;'
      + 'padding-bottom:max(100px,calc(80px + env(safe-area-inset-bottom)))'
      + '">';

    // ─── "나에 대해 상담하기" 카드 ───
    if (hasMySaju) {
      h += '<div onclick="MBTS_Chat.openRoom({type:\'me\'})" style="'
        + 'background:linear-gradient(135deg,rgba(139,108,193,0.08),rgba(139,108,193,0.03));'
        + 'border:1.5px solid rgba(139,108,193,0.15);border-radius:20px;'
        + 'padding:18px 16px;margin-bottom:20px;cursor:pointer;'
        + 'display:flex;align-items:center;gap:14px;'
        + 'transition:all 0.25s ease'
        + '">';
      h += '<div style="'
        + 'width:48px;height:48px;border-radius:14px;'
        + 'background:linear-gradient(135deg,#B8A5D6,#8B6CC1);'
        + 'display:flex;align-items:center;justify-content:center;'
        + 'font-size:24px;color:#fff;flex-shrink:0'
        + '">\ud83d\ude4b</div>';
      h += '<div style="flex:1">';
      h += '<div style="font-size:15px;font-weight:700;margin-bottom:2px">\ub098\uc5d0 \ub300\ud574 \uc0c1\ub2f4\ud558\uae30</div>';
      h += '<div style="font-size:12px;color:#888">' + myIlju + '\uc77c\uc8fc \xb7 ' + myMBTI + '</div>';
      h += '</div>';
      h += '<span style="color:#8B6CC1;font-size:14px">\u203a</span>';
      h += '</div>';
    } else {
      h += '<div style="'
        + 'background:rgba(139,108,193,0.04);'
        + 'border:1.5px solid rgba(139,108,193,0.08);border-radius:20px;'
        + 'padding:18px 16px;margin-bottom:20px;opacity:0.4;pointer-events:none;'
        + 'display:flex;align-items:center;gap:14px'
        + '">';
      h += '<div style="'
        + 'width:48px;height:48px;border-radius:14px;'
        + 'background:rgba(139,108,193,0.15);'
        + 'display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0'
        + '">\ud83d\ude4b</div>';
      h += '<div style="flex:1">';
      h += '<div style="font-size:15px;font-weight:700;margin-bottom:2px;color:#aaa">\ub098\uc5d0 \ub300\ud574 \uc0c1\ub2f4\ud558\uae30</div>';
      h += '<div style="font-size:12px;color:#bbb">\uba3c\uc800 \ub0b4 \ubd84\uc11d\uc744 \ud574\uc8fc\uc138\uc694</div>';
      h += '</div>';
      h += '</div>';
    }

    // ─── "내 사람들" 섹션 ───
    h += '<div style="'
      + 'font-size:13px;font-weight:700;color:#999;'
      + 'margin-bottom:10px;padding-left:4px'
      + '">\ud83d\udc65 \ub0b4 \uc0ac\ub78c\ub4e4</div>';

    if (others.length === 0) {
      h += '<div style="text-align:center;padding:60px 40px">';
      h += '<div style="font-size:48px;margin-bottom:16px">\ud83d\udc30</div>';
      h += '<div style="font-size:14px;color:#999;line-height:1.6">'
        + '\uc544\uc9c1 \ubd84\uc11d\ud55c \uc0ac\ub78c\uc774 \uc5c6\uc5b4\uc694.<br>\uad81\ud569 \ud0ed\uc5d0\uc11c \ucd94\uac00\ud574\ubcf4\uc138\uc694 \ud83d\udc95</div>';
      h += '</div>';
    } else {
      for (var j = 0; j < others.length; j++) {
        var p = others[j];
        var emoji = p.emoji || '\ud83c\udf1f';
        var ilju = p.ilju || '';
        var mbti = p.mbti || '';
        var name = p.name || ilju || '\uc774\ub984 \uc5c6\uc74c';

        h += '<div onclick="MBTS_Chat.openRoom({type:\'person\',person:' + _escJsonAttr(p) + '})" style="'
          + 'display:flex;align-items:center;gap:12px;'
          + 'padding:14px 16px;background:rgba(255,255,255,0.75);'
          + 'border:1px solid rgba(0,0,0,0.04);border-radius:20px;'
          + 'margin-bottom:8px;cursor:pointer;'
          + 'transition:all 0.2s'
          + '">';
        h += '<div style="font-size:24px;width:40px;text-align:center">' + emoji + '</div>';
        h += '<div style="flex:1">';
        h += '<div style="font-size:14px;font-weight:600">' + _esc(name) + '</div>';
        h += '<div style="font-size:12px;color:#999;margin-top:1px">' + _esc(ilju) + '\uc77c\uc8fc \xb7 ' + _esc(mbti) + '</div>';
        h += '</div>';
        h += '<span style="color:#ccc;font-size:14px">\u203a</span>';
        h += '</div>';
      }
    }

    h += '</div>';

    var chatPage = pg.querySelector('.chat-page');
    if (chatPage) {
      chatPage.innerHTML = h;
      chatPage.style.background = '#F8F7F4';
    } else {
      pg.innerHTML = '<div class="chat-page" style="background:#F8F7F4">' + h + '</div>';
    }
  }

  // ══════════════════════════════════
  // PART C: 채팅방 화면
  // ══════════════════════════════════

  function openChatRoom(context) {
    chatContext = context;
    var pg = document.getElementById('pgChat');
    if (!pg) return;

    var type = context.type || 'me';
    var person = context.person || {};
    var relType = context.relType || '';
    var myTarget = (typeof getFortuneTarget === 'function') ? getFortuneTarget() : null;

    // person 클릭 시 light 데이터만 넘어옴 → mbts_history에서 full 데이터 조회
    if (person.id && !person.saju) {
      try {
        var histLookup = JSON.parse(localStorage.getItem('mbts_history') || '[]');
        for (var pi = 0; pi < histLookup.length; pi++) {
          if (histLookup[pi].id === person.id) {
            var found = histLookup[pi];
            context.person = {
              id: found.id,
              name: found.name || '\uc774\ub984 \uc5c6\uc74c',
              gender: (found.input && found.input.gender) ? found.input.gender : '',
              ilju: found.animalIlju || ((found.saju && found.saju.P && found.saju.P[2]) ? found.saju.P[2].s + found.saju.P[2].b : ''),
              mbti: found.mbti || '',
              saju: found.saju,
              gg: found.gg,
              dw: found.dw,
              mbtiObj: found.mbtiObj,
              aiResult: found.aiResult || ''
            };
            person = context.person;
            break;
          }
        }
      } catch(e) {}
    }

    // 저장된 히스토리 복원
    loadChatContext();

    // 맥락 표시 텍스트
    var ctxLabel = '';
    if (type === 'me') {
      var myName = (myTarget && myTarget.name) ? myTarget.name : '';
      if (!myName && myTarget && myTarget.saju && myTarget.saju.P && myTarget.saju.P[2]) {
        myName = myTarget.saju.P[2].s + myTarget.saju.P[2].b + '\uc77c\uc8fc';
      }
      ctxLabel = (myName || '\ub098') + '\ub2d8\uacfc\uc758 \ub300\ud654';
    } else if (type === 'person') {
      ctxLabel = _esc(person.name || person.ilju || '\uc0c1\ub300') + '\ub2d8\uacfc\uc758 \ub300\ud654';
    } else if (type === 'gunghap') {
      ctxLabel = '\uad81\ud569 \uc0c1\ub2f4';
    }

    // 달토 인사 메시지
    var greeting = '';
    if (type === 'me') {
      var gIlju = '';
      if (myTarget && myTarget.saju && myTarget.saju.P && myTarget.saju.P[2]) {
        gIlju = myTarget.saju.P[2].s + myTarget.saju.P[2].b;
      }
      var gMbti = (myTarget && myTarget.mbti) ? myTarget.mbti : '';
      greeting = '\uc548\ub155\ud558\uc138\uc694! ' + gIlju + '\uc77c\uc8fc ' + gMbti + '\ub2d8, \ubb50\uac00 \uad81\uae08\ud558\uc138\uc694? \ud83d\udc30';
    } else if (type === 'person') {
      greeting = _esc(person.name || '\uc0c1\ub300\ubc29') + '\ub2d8\uc5d0 \ub300\ud574 \uad81\uae08\ud55c \uac70 \ubb3c\uc5b4\ubd10\uc694! \ud83d\udc30';
    } else if (type === 'gunghap') {
      var rl = { ssom: '\uc378', lover: '\uc5f0\uc778', friend: '\uce5c\uad6c', colleague: '\ub3d9\ub8cc', family: '\uac00\uc871' };
      greeting = (rl[relType] || '') + ' \uad81\ud569 \uacb0\uacfc, \ub354 \uad81\uae08\ud55c \uac70 \ubb3c\uc5b4\ubd10\uc694! \ud83d\udc30';
    }

    // 퀵 버튼 (맥락별)
    var quickBtns = [];
    if (type === 'me') {
      quickBtns = ['\uc62c\ud574 \uc6b4\uc138 \uc54c\ub824\uc918', '\uc5f0\uc560\uc6b4\uc774 \uad81\uae08\ud574', '\uc774\uc9c1\ud574\ub3c4 \ub420\uae4c?'];
    } else if (type === 'person') {
      quickBtns = ['\uc774 \uc0ac\ub78c \uc131\uaca9 \ubd84\uc11d', '\uacf5\ub7b5\ubc95 \uc54c\ub824\uc918', '\uc798 \ub9de\ub294 \ubd80\ubd84\uc740?'];
    } else if (type === 'gunghap') {
      quickBtns = ['\uad81\ud569 \uc694\uc57d\ud574\uc918', '\uacf5\ub7b5\ubc95 \uc54c\ub824\uc918', '\uc8fc\uc758\ud560 \uc810\uc740?'];
    }

    var hasHistory = chatHistory.length > 0;

    var h = '';

    // ─── 상단 바 ───
    h += '<div style="'
      + 'padding:12px 16px 8px;'
      + 'background:rgba(248,247,244,0.95);'
      + 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);'
      + 'border-bottom:1px solid rgba(0,0,0,0.06);'
      + 'position:sticky;top:0;z-index:10'
      + '">';
    h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">';
    h += '<button onclick="MBTS_Chat.renderList()" style="'
      + 'background:none;border:none;font-size:14px;color:#8B6CC1;'
      + 'font-weight:600;padding:4px 0;cursor:pointer'
      + '">\u2190 \ubaa9\ub85d</button>';
    h += '<div style="font-size:15px;font-weight:700;flex:1">' + ctxLabel + '</div>';
    h += '</div>';
    h += '</div>';

    // ─── 채팅 바디 ───
    h += '<div id="chatBody" style="'
      + 'flex:1;overflow-y:auto;padding:16px;'
      + 'padding-bottom:max(100px,calc(80px + env(safe-area-inset-bottom)));'
      + 'background:#F8F7F4'
      + '">';

    // 달토 인사 메시지 (항상 표시)
    h += _buildAiBubbleHtml(greeting);

    // 저장된 히스토리가 있으면 복원
    if (hasHistory) {
      for (var hi = 0; hi < chatHistory.length; hi++) {
        var msg = chatHistory[hi];
        if (msg.role === 'user') {
          h += _buildUserBubbleHtml(msg.content);
        } else if (msg.role === 'assistant') {
          h += _buildAiBubbleHtml(msg.content);
        }
      }
    }

    // 퀵 버튼
    h += '<div id="chatQuickArea" style="display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 16px 44px' + (hasHistory ? ';display:none' : '') + '">';
    for (var q = 0; q < quickBtns.length; q++) {
      h += '<button onclick="sendChatMessage(\'' + quickBtns[q].replace(/'/g, "\\'") + '\')" style="'
        + 'padding:8px 14px;font-size:13px;font-weight:600;'
        + 'background:#fff;color:#8B6CC1;'
        + 'border:1.5px solid rgba(139,108,193,0.2);border-radius:20px;'
        + 'cursor:pointer;transition:all 0.2s'
        + '">' + quickBtns[q] + '</button>';
    }
    h += '</div>';

    h += '</div>'; // chatBody 끝

    // ─── + 메뉴 (슬라이드업) ───
    h += '<div id="chatPlusMenu" style="'
      + 'display:none;'
      + 'padding:12px 16px;'
      + 'background:rgba(248,247,244,0.98);'
      + 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);'
      + 'border-top:1px solid rgba(0,0,0,0.06)'
      + '">';
    h += '<div style="display:flex;flex-direction:column;gap:2px">';
    h += '<button onclick="showQuickSuggestions()" style="'
      + 'display:flex;align-items:center;gap:12px;padding:14px 12px;'
      + 'background:none;border:none;border-radius:12px;cursor:pointer;'
      + 'font-size:15px;font-weight:600;color:#333;width:100%;text-align:left;'
      + 'transition:background 0.2s'
      + '" onmouseover="this.style.background=\'rgba(139,108,193,0.06)\'" onmouseout="this.style.background=\'none\'">'
      + '<span style="font-size:20px">\ud83d\udd2e</span> \ucd94\ucc9c \uc9c8\ubb38</button>';
    h += '<button onclick="toggleFireMode()" id="fireToggleBtn" style="'
      + 'display:flex;align-items:center;gap:12px;padding:14px 12px;'
      + 'background:none;border:none;border-radius:12px;cursor:pointer;'
      + 'font-size:15px;font-weight:600;color:#333;width:100%;text-align:left;'
      + 'transition:background 0.2s'
      + '" onmouseover="this.style.background=\'rgba(232,81,61,0.06)\'" onmouseout="this.style.background=\'none\'">'
      + '<span style="font-size:20px">' + (currentMode === 'fire' ? '\ud83e\udd0d' : '\ud83d\udd25') + '</span> '
      + (currentMode === 'fire' ? '\uc0c1\ub0e5 \ubaa8\ub4dc\ub85c \uc804\ud658' : '\ud329\ud3ed \ubaa8\ub4dc\ub85c \uc804\ud658') + '</button>';
    h += '<button onclick="resetChatConfirm()" style="'
      + 'display:flex;align-items:center;gap:12px;padding:14px 12px;'
      + 'background:none;border:none;border-radius:12px;cursor:pointer;'
      + 'font-size:15px;font-weight:600;color:#333;width:100%;text-align:left;'
      + 'transition:background 0.2s'
      + '" onmouseover="this.style.background=\'rgba(0,0,0,0.03)\'" onmouseout="this.style.background=\'none\'">'
      + '<span style="font-size:20px">\ud83d\udd04</span> \uc0c8 \ub300\ud654 \uc2dc\uc791\ud558\uae30</button>';
    h += '</div>';
    h += '</div>';

    // ─── 입력창 ───
    h += '<div style="'
      + 'padding:10px 16px;'
      + 'padding-bottom:max(10px,env(safe-area-inset-bottom));'
      + 'background:rgba(248,247,244,0.95);'
      + 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);'
      + 'border-top:1px solid rgba(0,0,0,0.06);'
      + 'display:flex;align-items:center;gap:8px'
      + '">';
    h += '<button onclick="togglePlusMenu()" id="chatPlusBtn" style="'
      + 'width:40px;height:40px;border-radius:50%;border:none;'
      + 'background:#F0ECF5;color:#8B6CC1;font-size:22px;font-weight:700;'
      + 'cursor:pointer;flex-shrink:0;transition:all 0.2s'
      + '">+</button>';
    h += '<input type="text" id="chatInput" placeholder="\ub2ec\ud1a0\uc5d0\uac8c \uc9c8\ubb38\ud558\uae30..." '
      + 'oninput="updateSendBtn()" onkeydown="chatInputKeydown(event)" style="'
      + 'flex:1;padding:12px 16px;font-size:14px;'
      + 'border:1.5px solid rgba(0,0,0,0.06);border-radius:24px;'
      + 'background:#fff;outline:none;'
      + 'transition:border-color 0.2s'
      + '">';
    h += '<button id="chatSendBtn" onclick="sendChatMessage()" style="'
      + 'width:40px;height:40px;border-radius:50%;border:none;'
      + 'background:#8B6CC1;color:#fff;font-size:16px;font-weight:700;'
      + 'cursor:pointer;flex-shrink:0;opacity:0.4;transition:opacity 0.2s'
      + '">\u2191</button>';
    h += '</div>';

    // chat-page에 렌더
    var chatPage = pg.querySelector('.chat-page');
    if (chatPage) {
      chatPage.innerHTML = h;
      chatPage.style.background = '#F8F7F4';
    } else {
      pg.innerHTML = '<div class="chat-page" style="background:#F8F7F4">' + h + '</div>';
    }

    // 스크롤 & 포커스
    setTimeout(function() {
      scrollChatToBottom();
      var inp = document.getElementById('chatInput');
      if (inp) inp.focus();
    }, 100);
  }

  // ══════════════════════════════════
  // PART D: UI 헬퍼 함수
  // ══════════════════════════════════

  // ─── 텍스트→HTML 변환 (XSS 방지 + 줄바꿈) ───
  function textToHtml(text) {
    return String(text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  }

  // ─── AI 버블 HTML 문자열 생성 (정적 렌더용) ───
  function _buildAiBubbleHtml(text) {
    var s = '';
    s += '<div style="display:flex;gap:8px;margin-bottom:12px">';
    s += '<div style="'
      + 'width:36px;height:36px;border-radius:50%;flex-shrink:0;'
      + 'background:linear-gradient(135deg,' + (currentMode === 'fire' ? '#FFE0E0,#F5C0C0' : '#B8A5D6,#8B6CC1') + ');'
      + 'display:flex;align-items:center;justify-content:center;font-size:18px'
      + '">\ud83d\udc30</div>';
    s += '<div style="'
      + 'background:#fff;border-radius:0 16px 16px 16px;padding:12px 16px;'
      + 'font-size:14px;line-height:1.6;color:#333;'
      + 'max-width:75%;box-shadow:0 1px 4px rgba(0,0,0,0.04)'
      + '">' + textToHtml(text) + '</div>';
    s += '</div>';
    return s;
  }

  // ─── User 버블 HTML 문자열 생성 (정적 렌더용) ───
  function _buildUserBubbleHtml(text) {
    var s = '';
    s += '<div style="display:flex;justify-content:flex-end;margin-bottom:12px">';
    s += '<div style="'
      + 'background:#8B6CC1;color:#fff;border-radius:16px 0 16px 16px;'
      + 'padding:12px 16px;font-size:14px;line-height:1.6;max-width:75%'
      + '">' + textToHtml(text) + '</div>';
    s += '</div>';
    return s;
  }

  // ─── 말풍선 동적 추가 ───
  function appendChatBubble(type, text, id) {
    var body = document.getElementById('chatBody');
    if (!body) return;

    if (type === 'ai') {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:8px;margin-bottom:12px';
      row.innerHTML = '<div style="'
        + 'width:36px;height:36px;border-radius:50%;flex-shrink:0;'
        + 'background:linear-gradient(135deg,' + (currentMode === 'fire' ? '#FFE0E0,#F5C0C0' : '#B8A5D6,#8B6CC1') + ');'
        + 'display:flex;align-items:center;justify-content:center;font-size:18px'
        + '">\ud83d\udc30</div>'
        + '<div' + (id ? ' id="' + id + '"' : '') + ' style="'
        + 'background:#fff;border-radius:0 16px 16px 16px;padding:12px 16px;'
        + 'font-size:14px;line-height:1.6;color:#333;'
        + 'max-width:75%;box-shadow:0 1px 4px rgba(0,0,0,0.04)'
        + '">' + (text ? textToHtml(text) : '') + '</div>';
      body.appendChild(row);
    } else {
      var urow = document.createElement('div');
      urow.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:12px';
      urow.innerHTML = '<div style="'
        + 'background:#8B6CC1;color:#fff;border-radius:16px 0 16px 16px;'
        + 'padding:12px 16px;font-size:14px;line-height:1.6;max-width:75%'
        + '">' + textToHtml(text) + '</div>';
      body.appendChild(urow);
    }

    // 시간 표시
    var now = new Date();
    var hr = now.getHours(), mn = now.getMinutes();
    var ampm = hr < 12 ? '\uc624\uc804' : '\uc624\ud6c4';
    var hh = hr % 12; if (hh === 0) hh = 12;
    var timeDiv = document.createElement('div');
    timeDiv.style.cssText = 'font-size:10px;color:#bbb;margin-bottom:8px;'
      + (type === 'user' ? 'text-align:right;padding-right:4px' : 'padding-left:44px');
    timeDiv.textContent = ampm + ' ' + hh + ':' + String(mn).padStart(2, '0');
    body.appendChild(timeDiv);

    scrollChatToBottom();
  }

  // ─── 스트리밍 중 말풍선 업데이트 ───
  function updateChatBubble(id, text) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = textToHtml(text);
  }

  // ─── 타이핑 인디케이터 ───
  function showTypingIndicator() {
    var body = document.getElementById('chatBody');
    if (!body) return;
    var row = document.createElement('div');
    row.id = 'chatTypingRow';
    row.style.cssText = 'display:flex;gap:8px;margin-bottom:12px';
    row.innerHTML = '<div style="'
      + 'width:36px;height:36px;border-radius:50%;flex-shrink:0;'
      + 'background:linear-gradient(135deg,' + (currentMode === 'fire' ? '#FFE0E0,#F5C0C0' : '#B8A5D6,#8B6CC1') + ');'
      + 'display:flex;align-items:center;justify-content:center;font-size:18px'
      + '">\ud83d\udc30</div>'
      + '<div style="'
      + 'background:#fff;border-radius:0 16px 16px 16px;padding:12px 20px;'
      + 'display:flex;gap:4px;align-items:center;'
      + 'box-shadow:0 1px 4px rgba(0,0,0,0.04)'
      + '">'
      + '<span style="width:6px;height:6px;border-radius:50%;background:#8B6CC1;opacity:0.4;animation:typingDot 1.2s ease-in-out infinite"></span>'
      + '<span style="width:6px;height:6px;border-radius:50%;background:#8B6CC1;opacity:0.4;animation:typingDot 1.2s ease-in-out 0.2s infinite"></span>'
      + '<span style="width:6px;height:6px;border-radius:50%;background:#8B6CC1;opacity:0.4;animation:typingDot 1.2s ease-in-out 0.4s infinite"></span>'
      + '</div>';
    body.appendChild(row);

    // 타이핑 애니메이션 CSS (한 번만 주입)
    if (!document.getElementById('chatTypingStyle')) {
      var style = document.createElement('style');
      style.id = 'chatTypingStyle';
      style.textContent = '@keyframes typingDot{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}';
      document.head.appendChild(style);
    }

    scrollChatToBottom();
  }

  function hideTypingIndicator() {
    var el = document.getElementById('chatTypingRow');
    if (el) el.remove();
  }

  // ─── 스크롤 ───
  function scrollChatToBottom() {
    var body = document.getElementById('chatBody');
    if (body) setTimeout(function() { body.scrollTop = body.scrollHeight; }, 50);
  }

  // ─── 퀵 버튼 표시/숨기기 ───
  function showQuickButtons() {
    var el = document.getElementById('chatQuickArea');
    if (el) el.style.display = 'flex';
  }

  function hideQuickButtons() {
    var el = document.getElementById('chatQuickArea');
    if (el) el.style.display = 'none';
  }

  // ─── 전송 버튼 상태 ───
  function updateSendBtn() {
    var inp = document.getElementById('chatInput');
    var btn = document.getElementById('chatSendBtn');
    if (!inp || !btn) return;
    btn.style.opacity = inp.value.trim().length > 0 ? '1' : '0.4';
  }

  // ─── Enter 키 핸들러 ───
  function chatInputKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      sendChatMessage();
    }
  }

  // ══════════════════════════════════
  // PART E: 모드 전환
  // ══════════════════════════════════

  function setMode(mode) {
    currentMode = mode;
    var sw = document.getElementById('chatModeSweet');
    var fi = document.getElementById('chatModeFire');
    if (sw && fi) {
      if (mode === 'sweet') {
        sw.style.background = '#8B6CC1'; sw.style.color = '#fff'; sw.style.borderColor = '#8B6CC1';
        fi.style.background = '#fff'; fi.style.color = '#333'; fi.style.borderColor = 'rgba(0,0,0,0.08)';
      } else {
        fi.style.background = '#E8513D'; fi.style.color = '#fff'; fi.style.borderColor = '#E8513D';
        sw.style.background = '#fff'; sw.style.color = '#333'; sw.style.borderColor = 'rgba(0,0,0,0.08)';
      }
    }
  }

  // + 메뉴 토글
  function togglePlusMenu() {
    var menu = document.getElementById('chatPlusMenu');
    if (!menu) return;
    if (menu.style.display === 'none' || !menu.style.display) {
      menu.style.display = 'block';
      var btn = document.getElementById('chatPlusBtn');
      if (btn) { btn.style.background = '#8B6CC1'; btn.style.color = '#fff'; btn.textContent = '\u00d7'; }
    } else {
      menu.style.display = 'none';
      var btn = document.getElementById('chatPlusBtn');
      if (btn) { btn.style.background = '#F0ECF5'; btn.style.color = '#8B6CC1'; btn.textContent = '+'; }
    }
  }

  // 팩폭 모드 토글 (+ 달토 자동 메시지)
  function toggleFireMode() {
    var newMode = (currentMode === 'fire') ? 'sweet' : 'fire';
    setMode(newMode);
    // 메뉴 닫기
    togglePlusMenu();
    // 달토 자동 메시지
    var msg = '';
    if (newMode === 'fire') {
      msg = '\ud83d\udd25 \ud329\ud3ed \ubaa8\ub4dc ON! \uc194\uc9c1\ud558\uac8c \uac04\ub2e4, \uac01\uc624\ud574.';
    } else {
      msg = '\ud83e\udd0d \ub2e4\uc2dc \uc0c1\ub0e5 \ubaa8\ub4dc~ \ud3b8\ud558\uac8c \ubb3c\uc5b4\ubd10\uc694 \ud83d\udc30';
    }
    appendChatBubble('ai', msg);
    chatHistory.push({ role: 'assistant', content: msg });
    saveChatContext();
    scrollChatToBottom();
    // 버튼 텍스트 업데이트
    var fireBtn = document.getElementById('fireToggleBtn');
    if (fireBtn) {
      fireBtn.innerHTML = '<span style="font-size:20px">' + (newMode === 'fire' ? '\ud83e\udd0d' : '\ud83d\udd25') + '</span> ' + (newMode === 'fire' ? '\uc0c1\ub0e5 \ubaa8\ub4dc\ub85c \uc804\ud658' : '\ud329\ud3ed \ubaa8\ub4dc\ub85c \uc804\ud658');
    }
  }

  // 추천 질문 표시
  function showQuickSuggestions() {
    togglePlusMenu();
    var type = (chatContext && chatContext.type) ? chatContext.type : 'me';
    var suggestions = [];
    if (type === 'me') {
      suggestions = ['\uc62c\ud574 \uc6b4\uc138 \uc54c\ub824\uc918', '\uc5f0\uc560\uc6b4\uc774 \uad81\uae08\ud574', '\uc774\uc9c1\ud574\ub3c4 \ub420\uae4c?', '\uc7ac\ubb3c\uc6b4 \ubcf4\uc5ec\uc918', '\uac74\uac15 \uc8fc\uc758\ud560 \uc810\uc740?', '\uc774\ubc88 \ub2ec \uc6b4\uc138\ub294?'];
    } else if (type === 'person') {
      suggestions = ['\uc774 \uc0ac\ub78c \uc131\uaca9 \ubd84\uc11d', '\uacf5\ub7b5\ubc95 \uc54c\ub824\uc918', '\uc798 \ub9de\ub294 \ubd80\ubd84\uc740?', '\uc8fc\uc758\ud560 \uc810\uc740?', '\uc774 \uc0ac\ub78c \uc5f0\uc560 \uc2a4\ud0c0\uc77c', '\uc62c\ud574 \uc774 \uc0ac\ub78c \uc6b4\uc138'];
    } else if (type === 'gunghap') {
      suggestions = ['\uad81\ud569 \uc694\uc57d\ud574\uc918', '\uacf5\ub7b5\ubc95 \uc54c\ub824\uc918', '\uc8fc\uc758\ud560 \uc810\uc740?', '\uc798 \ub9de\ub294 \ubd80\ubd84\uc740?', '\uc548 \ub9de\ub294 \ubd80\ubd84\uc740?', '\uc7a5\uae30\uc801\uc73c\ub85c \uc5b4\ub54c?'];
    }
    var area = document.getElementById('chatQuickArea');
    if (!area) {
      var body = document.getElementById('chatBody');
      if (body) {
        var div = document.createElement('div');
        div.id = 'chatQuickArea';
        div.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 16px 44px';
        body.appendChild(div);
        area = div;
      }
    }
    if (area) {
      area.style.display = 'flex';
      var qh = '';
      for (var i = 0; i < suggestions.length; i++) {
        qh += '<button onclick="sendChatMessage(\'' + suggestions[i].replace(/'/g, "\\'") + '\')" style="'
          + 'padding:8px 14px;font-size:13px;font-weight:600;'
          + 'background:#fff;color:#8B6CC1;'
          + 'border:1.5px solid rgba(139,108,193,0.2);border-radius:20px;'
          + 'cursor:pointer;transition:all 0.2s'
          + '">' + suggestions[i] + '</button>';
      }
      area.innerHTML = qh;
      scrollChatToBottom();
    }
  }

  // 새 대화 시작
  function resetChatConfirm() {
    togglePlusMenu();
    if (!confirm('\ub300\ud654\ub97c \ucd08\uae30\ud654\ud560\uae4c\uc694?')) return;
    chatHistory = [];
    var cid = '';
    if (chatContext) {
      if (chatContext.type === 'me') cid = 'me';
      else if (chatContext.person && chatContext.person.id) cid = chatContext.person.id;
      else if (chatContext.type === 'gunghap') cid = 'gunghap_' + (chatContext.person && chatContext.person.id ? chatContext.person.id : '');
    }
    if (cid) localStorage.removeItem('mbts_chat_' + cid);
    openChatRoom(chatContext);
  }

  // ══════════════════════════════════
  // PART F: 메시지 전송 (핵심)
  // ══════════════════════════════════

  function sendChatMessage(text) {
    var inp = document.getElementById('chatInput');
    if (!text && inp) text = inp.value;
    if (!text || !text.trim() || isChatLoading) return;
    text = text.trim();

    // 달토 채팅 무료 3회 체크
    var chatCount = parseInt(localStorage.getItem('mbts_chat_count') || '0');

    if (chatCount >= 3) {
      // 4회부터 클로버 차감
      useClover(3, 'chat', function(success) {
        if (!success) return;
        localStorage.setItem('mbts_chat_count', String(chatCount + 1));
        _doSendChat(text);
      });
      return;
    }

    // 무료 3회 이내
    localStorage.setItem('mbts_chat_count', String(chatCount + 1));
    _doSendChat(text);
  }

  function _doSendChat(text) {
    var inp = document.getElementById('chatInput');
    isChatLoading = true;

    // 유저 말풍선
    appendChatBubble('user', text);
    chatHistory.push({ role: 'user', content: text });
    saveChatContext();

    // 입력창 초기화
    if (inp) { inp.value = ''; }
    updateSendBtn();
    hideQuickButtons();
    showTypingIndicator();

    // AI 말풍선 (빈 상태로 먼저 추가)
    var bubbleId = 'chat-ai-' + Date.now();
    appendChatBubble('ai', '', bubbleId);
    hideTypingIndicator();

    // ── engine.js buildChatPrompt 호출 ──
    var _ft = (typeof getFortuneTarget === 'function') ? getFortuneTarget() : null;
    var mySaju = (_ft && _ft.saju) ? _ft.saju : null;
    var myMbti = (_ft && _ft.mbti) ? _ft.mbti : null;
    var myGg = (_ft && _ft.gg) ? _ft.gg : null;
    var myDw = (_ft && _ft.dw) ? _ft.dw : null;

    var prompt = buildChatPrompt(null, null, null, null, chatHistory, currentMode);

    // ── _ft에 보강 데이터 붙여서 통째로 전달 ──
    if (_ft && _ft.saju && _ft.gg && _ft.dw) {
      var gender = (_ft.input && _ft.input.gender) ? _ft.input.gender : '';
      if (typeof SJ_enrichSajuData === 'function') {
        _ft.enriched = SJ_enrichSajuData(_ft.saju, _ft.gg, _ft.dw, gender, _ft.mbti || '');
      }
      if (typeof SJ_calcWolun === 'function') {
        _ft.wolun = SJ_calcWolun(_ft.saju);
      }
      if (typeof SJ_buildWonkukRelations === 'function') {
        _ft.wonkukRelations = SJ_buildWonkukRelations(_ft.saju);
      }
      if (typeof SJ_buildGongmangFull === 'function') {
        _ft.gongmangFull = SJ_buildGongmangFull(_ft.saju);
      }
    }
    if (_ft) {
      prompt.systemPrompt += '\n\n## \uc774 \uc0ac\uc6a9\uc790\uc758 \uc804\uccb4 MBTS \ub370\uc774\ud130 (\uc0ac\uc8fc\uc6d0\uad6d+\uaca9\uad6d+\uc6a9\uc2e0+\ub300\uc6b4+\uc138\uc6b4+\uc6d4\uc6b4+\uc2e0\uc0b4+\uc554\ud569+\ud615\ucda9+\uacf5\ub9dd+12\uc6b4\uc131+\uc624\ud589+MBTI+AI\ud480\uc774+\ubcf4\uac15\ubd84\uc11d \ud3ec\ud568)\n';
      prompt.systemPrompt += '\ubaa8\ub4e0 \ub370\uc774\ud130\ub97c \uc219\uc9c0\ud558\uace0, \uc0ac\uc8fc \uc6a9\uc5b4\uc640 \uc218\uce58\ub97c \uc815\ud655\ud788 \uc778\uc6a9\ud558\uba70, \uae30\uc874 \ud480\uc774\uc640 \uc77c\uad00\ub418\uac8c \ub2f5\ubcc0\ud558\uc138\uc694.\n\n';
      prompt.systemPrompt += safeStr(_ft) + '\n';
    }

    if (chatContext && chatContext.type === 'person' && chatContext.person) {
      var cp = chatContext.person;
      if (cp.saju && cp.gg && cp.dw) {
        var pGender = (cp.input && cp.input.gender) ? cp.input.gender : '';
        if (typeof SJ_enrichSajuData === 'function') {
          cp.enriched = SJ_enrichSajuData(cp.saju, cp.gg, cp.dw, pGender, cp.mbti || '');
        }
        if (typeof SJ_calcWolun === 'function') {
          cp.wolun = SJ_calcWolun(cp.saju);
        }
      }
      prompt.systemPrompt += '\n\n## \uc0c1\ub2f4 \ub300\uc0c1\uc790 \uc804\uccb4 MBTS \ub370\uc774\ud130\n';
      prompt.systemPrompt += safeStr(cp) + '\n';
    }

    // ── 맥락별 시스템 프롬프트 보강 (engine.js 미수정) ──
    if (chatContext && chatContext.type === 'person') {
      var pp = chatContext.person || {};
      prompt.systemPrompt += '\n\n## \uc0c1\ub2f4 \ub300\uc0c1\uc790 \uc815\ubcf4\n';
      prompt.systemPrompt += '\uc774\ub984: ' + (pp.name || '') + '\n';
      prompt.systemPrompt += 'MBTI: ' + (pp.mbti || '') + '\n';
      if (pp.ilju) prompt.systemPrompt += '\uc77c\uc8fc: ' + pp.ilju + '\n';
      if (pp.saju) prompt.systemPrompt += '\uc0ac\uc8fc: ' + JSON.stringify(pp.saju) + '\n';
      if (pp.gg) prompt.systemPrompt += '\uaca9\uad6d: ' + JSON.stringify(pp.gg) + '\n';
      if (pp.dw) prompt.systemPrompt += '\ub300\uc6b4: ' + JSON.stringify(pp.dw) + '\n';
      prompt.systemPrompt += '\n\uc0ac\uc6a9\uc790\uac00 \uc774 \uc0ac\ub78c\uc5d0 \ub300\ud574 \uc9c8\ubb38\ud569\ub2c8\ub2e4. \uc774 \uc0ac\ub78c\uc758 \uc0ac\uc8fc\uc640 MBTI\ub97c \uae30\ubc18\uc73c\ub85c \ubd84\uc11d\ud574\uc8fc\uc138\uc694.\n';
      prompt.systemPrompt += '\uc0ac\uc6a9\uc790\uc758 \uc0ac\uc8fc(\uc704\uc5d0 \uc788\uc74c)\uc640 \ub300\uc0c1\uc790\uc758 \uc0ac\uc8fc\ub97c \uad50\ucc28 \ubd84\uc11d\ud574\uc11c \ub2f5\ubcc0\ud574\uc8fc\uc138\uc694.\n';
    }

    if (chatContext && chatContext.type === 'gunghap') {
      var gp = chatContext.person || {};
      var gr = chatContext.ghResult || {};
      prompt.systemPrompt += '\n\n## \uad81\ud569 \ubd84\uc11d \uacb0\uacfc (\uc774\ubbf8 \uc644\ub8cc)\n';
      prompt.systemPrompt += '\uad00\uacc4: ' + (chatContext.relType || '') + '\n';
      if (gr.scores) prompt.systemPrompt += '\uc810\uc218: ' + JSON.stringify(gr.scores) + '\n';
      prompt.systemPrompt += '\ub300\uc0c1\uc790: ' + (gp.name || '') + '\n';
      if (gp.mbti) prompt.systemPrompt += 'MBTI: ' + gp.mbti + '\n';
      if (gp.saju) prompt.systemPrompt += '\uc0ac\uc8fc: ' + JSON.stringify(gp.saju) + '\n';
      prompt.systemPrompt += '\n\uc774 \uad81\ud569\uc5d0 \ub300\ud574 \ucd94\uac00 \uc9c8\ubb38\ud558\uba74 \uc704 \uacb0\uacfc\ub97c \ubc14\ud0d5\uc73c\ub85c \uc0c1\uc138\ud788 \ub2f5\ubcc0\ud574\uc8fc\uc138\uc694.\n';
      prompt.systemPrompt += '\uc774\ubbf8 \uad81\ud569 \ubd84\uc11d\uc774 \ub05d\ub09c \uc0c1\ud0dc\uc774\ubbc0\ub85c, \uacb0\uacfc\ub97c \ucc38\uace0\ud558\uba74\uc11c \ub354 \uae4a\uc774 \uc788\ub294 \uc870\uc5b8\uc744 \ud574\uc8fc\uc138\uc694.\n';
    }

    // ── engine.js sendChatToAI 호출 ──
    sendChatToAI({
      apiKey: 'server-managed',
      systemPrompt: prompt.systemPrompt,
      messages: chatHistory,
      endpoint: '/api/chat'
    }, {
      onChunk: function(fullText) {
        updateChatBubble(bubbleId, fullText);
        scrollChatToBottom();
      },
      onComplete: function(fullText) {
        chatHistory.push({ role: 'assistant', content: fullText });
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
        saveChatContext();
        isChatLoading = false;
        scrollChatToBottom();
      },
      onError: function(msg) {
        updateChatBubble(bubbleId, '\uc55e, \uc5f0\uacb0\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uacbc\uc5b4\uc694 \ud83e\udd7a \ub2e4\uc2dc \ud55c\ubc88 \ubb3c\uc5b4\ubd10 \uc8fc\uc2dc\uaca0\uc5b4\uc694?');
        isChatLoading = false;
      }
    });
  }

  // ══════════════════════════════════
  // PART G: localStorage 저장/복원
  // ══════════════════════════════════

  function _getContextId() {
    if (!chatContext) return null;
    var type = chatContext.type || 'me';
    if (type === 'me') return 'me';
    var pid = (chatContext.person && chatContext.person.id) || 'unknown';
    if (type === 'person') return 'person_' + pid;
    if (type === 'gunghap') return 'gunghap_' + pid + '_' + (chatContext.relType || '');
    return null;
  }

  function saveChatContext() {
    var cid = _getContextId();
    if (!cid) return;
    try {
      localStorage.setItem('mbts_chat_' + cid, JSON.stringify({
        history: chatHistory,
        mode: currentMode
      }));
    } catch(e) {}
  }

  function loadChatContext() {
    var cid = _getContextId();
    if (!cid) { chatHistory = []; return; }
    try {
      var saved = localStorage.getItem('mbts_chat_' + cid);
      if (!saved) { chatHistory = []; return; }
      var data = JSON.parse(saved);
      if (data.history && data.history.length > 0) {
        chatHistory = data.history;
        if (data.mode) currentMode = data.mode;
      } else {
        chatHistory = [];
      }
    } catch(e) {
      chatHistory = [];
    }
  }

  // ══════════════════════════════════
  // PART H: 유틸
  // ══════════════════════════════════

  function _esc(s) {
    if (!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function _escJsonAttr(obj) {
    var light = {
      id: obj.id || '',
      name: obj.name || '',
      ilju: obj.ilju || '',
      mbti: obj.mbti || '',
      gender: obj.gender || '',
      hasFull: !!obj.hasFull
    };
    var json = JSON.stringify(light);
    return json.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
  }

  // ══════════════════════════════════
  // PART I: 외부 인터페이스
  // ══════════════════════════════════

  window.MBTS_Chat = {
    renderList: renderChatList,
    openRoom: openChatRoom,
    sendMessage: sendChatMessage,
    setMode: setMode,
    openFromGunghap: function(person, relType, ghResult) {
      if (typeof go === 'function') go('pgChat');
      openChatRoom({ type: 'gunghap', person: person, relType: relType, ghResult: ghResult });
    }
  };

  // 전역 호환용 (index.html onclick에서 호출될 수 있으므로)
  window.sendChatMessage = sendChatMessage;
  window.setMode = setMode;
  window.togglePlusMenu = togglePlusMenu;
  window.toggleFireMode = toggleFireMode;
  window.showQuickSuggestions = showQuickSuggestions;
  window.resetChatConfirm = resetChatConfirm;
  window.updateSendBtn = updateSendBtn;
  window.chatInputKeydown = chatInputKeydown;

  // ══════════════════════════════════
  // PART J: go() 함수 후킹
  // ══════════════════════════════════

  var _origGo = window.go;
  if (typeof _origGo === 'function') {
    window.go = function(id, skipPush) {
      _origGo(id, skipPush);
      if (id === 'pgChat') {
        renderChatList();
      }
    };
  }

  console.log('[chatting.js] v2.0 \ub85c\ub4dc \uc644\ub8cc \u2014 \uba54\uc2dc\uc9c0 \uc804\uc1a1 \uae30\ub2a5 \ud65c\uc131\ud654');

})();
