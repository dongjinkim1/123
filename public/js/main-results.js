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

  // 클로버 차감 후 분석 진행
  useClover(15, 'saju', function(success) {
    if (!success) return;
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

  /* ── 중복 요청 방지 ── */
  if (localStorage.getItem('mbts_active_job')) {
    try {
      var _ej = JSON.parse(localStorage.getItem('mbts_active_job'));
      if (Date.now() - _ej.createdAt < 120000) {
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
    var _pollTimer = setInterval(async function() {
      // timeout
      if (Date.now() - _pollStart > 300000) {
        clearInterval(_pollTimer);
        _isAnalyzing = false;
        localStorage.removeItem('mbts_active_job');
        if(window._loadTimers){window._loadTimers.forEach(clearTimeout);window._loadTimers=[];}
        phase.innerHTML = '분석 시간이 초과됐어요 😢';
        phase.style.fontWeight = '600'; phase.style.color = '#E8453C';
        logo.style.animation = 'none';
        alert('분석 시간 초과. 다시 시도해주세요.');
        setTimeout(function(){ go('pgBirth'); }, 1000);
        return;
      }

      // progress bar
      var elapsed = Date.now() - _pollStart;
      var fakePct = Math.min(90, Math.floor(elapsed / 1000) * 1.5);
      bar.style.width = Math.max(fakePct, 10) + '%';

      try {
        var res = await fetch('/api/job-status?id=' + _jobId);
        var statusData = await res.json();

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
