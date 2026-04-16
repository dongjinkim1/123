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
    var _ghParamsA = {
      y: _ghBirthA.y, m: _ghBirthA.m, d: _ghBirthA.d,
      h: _ghBirthA.h, min: _ghBirthA.min,
      gender: ghA.gender || '여성',
      mbtiType: mbtiObjA.type || 'INFJ',
      mbtiAxes: mbtiObjA.axes || null
    };
    var _ghParamsB = {
      y: _ghBirthB.y, m: _ghBirthB.m, d: _ghBirthB.d,
      h: _ghBirthB.h, min: _ghBirthB.min,
      gender: ghB.gender || '남성',
      mbtiType: mbtiObjB.type || 'INFJ',
      mbtiAxes: mbtiObjB.axes || null
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
    var aiText = await new Promise(function(resolve, reject) {
      var _ghTimer = setInterval(async function() {
        var elapsed = Date.now() - _ghPollStart;

        var msgIdx = Math.min(Math.floor(elapsed / 8000), _ghMsgs.length - 1);
        msg.innerHTML = _ghMsgs[msgIdx] + '<span class="load-dots"><span></span><span></span><span></span></span>';
        var fakePct = Math.min(90, Math.floor(elapsed / 1000) * 1.5);
        bar.style.width = Math.max(fakePct, 5) + '%';

        if (elapsed > 300000) {
          clearInterval(_ghTimer);
          localStorage.removeItem('mbts_active_job');
          reject(new Error('분석 시간 초과'));
          return;
        }

        try {
          var res = await fetch('/api/job-status?id=' + _ghJobId);
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
      extraData={saju:sajuB,dw:dwB,gg:ggB,mbtiObj:mbtiB};
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
