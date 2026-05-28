// ============================================================
// gunghap.js — 궁합 올인원 모듈 v2
// 1~18레이어 완전 독립 실행 (HTML 함수 덮어쓰기)
// + 사람 목록 저장 + 관계 유형 선택
// HTML의 기존 코드를 건드리지 않습니다.
// 이 파일을 제거하면 HTML의 기본 궁합이 그대로 동작합니다.
// ============================================================

(function() {
  'use strict';

  // ╔══════════════════════════════════════╗
  // ║  PART A: 궁합 엔진 1~18레이어        ║
  // ║  HTML 함수를 완전히 덮어씀            ║
  // ╚══════════════════════════════════════╝

  window.analyzeGunghap = function(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB) {
    var R = { scores:{love:45,comm:45,values:45,work:45,total:0}, details:{gan:[],ji:[],ohBowan:[],mbti:[],dw:[]}, keywords:[] };
    var rA = sajuA.raw, rB = sajuB.raw;
    var pillarG = ['년간','월간','일간','시간'], pillarJ = ['년지','월지','일지','시지'];
    var gungwi = ['외부환경','직업사회','배우자건강','자녀노후'];

    // ── 레이어 1: 천간 교차 ──
    var gA=[rA.yg,rA.mg,rA.dg,rA.hg], gB=[rB.yg,rB.mg,rB.dg,rB.hg];
    var dgRel = {ganA:TGAN_KR[rA.dg], ganB:TGAN_KR[rB.dg], rels:[]};
    GH_GANHAP.forEach(function(h){ if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0])) dgRel.rels.push({t:'합',d:'일간합('+h[2]+') — 본질이 하나로 합쳐지는 인연'}); });
    GH_CHUNG_G.forEach(function(c){ if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0])) dgRel.rels.push({t:'충',d:'일간충 — 강한 끌림이자 강한 마찰'}); });
    if(rA.dg===rB.dg) dgRel.rels.push({t:'비화',d:'같은 일간 — 거울 같은 관계'});
    if(dgRel.rels.length===0){
      var oA=OHAENG_TGAN[rA.dg], oB=OHAENG_TGAN[rB.dg];
      if(OH_SANG[oA]===oB) dgRel.rels.push({t:'생',d:'A('+oA+')→B('+oB+') 생 — 자연스러운 돌봄'});
      else if(OH_SANG[oB]===oA) dgRel.rels.push({t:'생',d:'B('+oB+')→A('+oA+') 생 — 자연스러운 돌봄'});
      else if(OH_GEUK[oA]===oB) dgRel.rels.push({t:'극',d:'A('+oA+')→B('+oB+') 극 — 긴장감'});
      else if(OH_GEUK[oB]===oA) dgRel.rels.push({t:'극',d:'B('+oB+')→A('+oA+') 극 — 긴장감'});
    }
    R.details.gan.push(dgRel);
    for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
      if(gA[ai]==null||gB[bi]==null) continue;
      GH_GANHAP.forEach(function(h){ if((gA[ai]===h[0]&&gB[bi]===h[1])||(gA[ai]===h[1]&&gB[bi]===h[0])) R.details.gan.push({type:'천간합',pA:pillarG[ai],pB:pillarG[bi],desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'합('+h[2]+') '+pillarG[ai]+'↔'+pillarG[bi],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'}); });
      GH_CHUNG_G.forEach(function(c){ if((gA[ai]===c[0]&&gB[bi]===c[1])||(gA[ai]===c[1]&&gB[bi]===c[0])) R.details.gan.push({type:'천간충',pA:pillarG[ai],pB:pillarG[bi],desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'충 '+pillarG[ai]+'↔'+pillarG[bi],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'}); });
    }

    // ── 레이어 2: 지지 교차 ──
    var jA=[rA.yj,rA.mj,rA.dj,rA.hj], jB=[rB.yj,rB.mj,rB.dj,rB.hj];
    for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
      if(jA[ai]==null||jB[bi]==null) continue;
      var ja=jA[ai], jb=jB[bi];
      GH_YUKHAP.forEach(function(h){ if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0])) R.details.ji.push({type:'육합',pA:pillarJ[ai],pB:pillarJ[bi],jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],hapOh:h[2],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',gungwi:gungwi[ai]+'↔'+gungwi[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'합('+h[2]+') '+pillarJ[ai]+'↔'+pillarJ[bi]}); });
      GH_CHUNG_J.forEach(function(c){ if((ja===c[0]&&jb===c[1])||(ja===c[1]&&jb===c[0])) R.details.ji.push({type:'충',pA:pillarJ[ai],pB:pillarJ[bi],jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',gungwi:gungwi[ai]+'↔'+gungwi[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'충 '+pillarJ[ai]+'↔'+pillarJ[bi]}); });
      GH_HYUNG.forEach(function(h){ if(ja===h[0]&&jb===h[1]) R.details.ji.push({type:'형',pA:pillarJ[ai],pB:pillarJ[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'형 — 갈등을 통한 성장',imp:'중',gungwi:gungwi[ai]+'↔'+gungwi[bi]}); });
      GH_HAE.forEach(function(h){ if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0])) R.details.ji.push({type:'해',pA:pillarJ[ai],pB:pillarJ[bi],desc:JIJI_KR[ja]+JIJI_KR[jb]+'해 — 은밀한 오해 주의',imp:'중',gungwi:gungwi[ai]+'↔'+gungwi[bi]}); });
    }

    // ── 레이어 3: 오행 보완 ──
    var ohA=sajuA.elFull||sajuA.el, ohB=sajuB.elFull||sajuB.el;
    var lackA=sajuA.lackFull||[], lackB=sajuB.lackFull||[];
    lackA.forEach(function(o){ if(ohB[o]&&ohB[o]>=2) R.details.ohBowan.push({dir:'B→A',oh:o,d:'B가 A의 부족한 '+o+' 보완'}); });
    lackB.forEach(function(o){ if(ohA[o]&&ohA[o]>=2) R.details.ohBowan.push({dir:'A→B',oh:o,d:'A가 B의 부족한 '+o+' 보완'}); });
    var dmOhA=sajuA.dmEl, dmOhB=sajuB.dmEl, dmOhRel='';
    if(OH_SANG[dmOhA]===dmOhB){dmOhRel='A생B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')→B('+dmOhB+') 생 — 자연스러운 케어'});}
    else if(OH_SANG[dmOhB]===dmOhA){dmOhRel='B생A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')→A('+dmOhA+') 생'});}
    else if(OH_GEUK[dmOhA]===dmOhB){dmOhRel='A극B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')→B('+dmOhB+') 극 — 긴장감'});}
    else if(OH_GEUK[dmOhB]===dmOhA){dmOhRel='B극A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')→A('+dmOhA+') 극'});}
    else if(dmOhA===dmOhB){dmOhRel='비화';R.details.ohBowan.push({dir:'양방',d:'같은 오행('+dmOhA+') — 공감 최고, 보완 부족'});}

    // ── 레이어 4: MBTI 궁합 ──
    var _cfStrA=(mbtiObjA&&mbtiObjA.cf)?mbtiObjA.cf:'Ni-Fe-Ti-Se';
    var _cfStrB=(mbtiObjB&&mbtiObjB.cf)?mbtiObjB.cf:'Ni-Fe-Ti-Se';
    var cfA=_cfStrA.split('-'), cfB=_cfStrB.split('-');
    var m1=getCFC(cfA[0],cfB[0]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[0],t:'주기능',s:m1.s,d:m1.d});
    var m2=getCFC(cfA[0],cfB[1]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[1],t:'A주↔B부',s:m2.s,d:m2.d});
    var m3=getCFC(cfB[0],cfA[1]); R.details.mbti.push({pair:cfB[0]+'↔'+cfA[1],t:'B주↔A부',s:m3.s,d:m3.d});
    var axN=['EI','SN','TF','JP'];
    var _axA=(mbtiObjA&&mbtiObjA.axes&&mbtiObjA.axes.length===4)?mbtiObjA.axes:[{side:'I',pct:60},{side:'N',pct:60},{side:'F',pct:60},{side:'J',pct:60}];
    var _axB=(mbtiObjB&&mbtiObjB.axes&&mbtiObjB.axes.length===4)?mbtiObjB.axes:[{side:'I',pct:60},{side:'N',pct:60},{side:'F',pct:60},{side:'J',pct:60}];
    for(var xi=0;xi<4;xi++){
      var aAx=_axA[xi],aBx=_axB[xi],same=(aAx.side===aBx.side);
      var axS=same?7:5; if(axN[xi]==='SN'&&!same)axS=4; if(axN[xi]==='TF'&&!same)axS=5;
      R.details.mbti.push({axis:axN[xi],sA:aAx.side,sB:aBx.side,same:same,s:axS,d:same?'같은 '+aAx.side+'형 — 공감대 높음':'다른 축('+aAx.side+'↔'+aBx.side+') — 보완과 갈등'});
    }

    // ── 레이어 5: 대운 동기화 ──
    if(dwA&&dwB&&dwA.daewoons&&dwB.daewoons){
      var cdA=dwA.currentDWIdx>=0?dwA.daewoons[dwA.currentDWIdx]:null;
      var cdB=dwB.currentDWIdx>=0?dwB.daewoons[dwB.currentDWIdx]:null;
      var goodDW=['식신','정재','정관','정인'];
      if(cdA&&cdB){var aGd=goodDW.indexOf(cdA.ss)>=0,bGd=goodDW.indexOf(cdB.ss)>=0;R.details.dw.push({type:'현재대운',dA:cdA.gan+cdA.ji+'('+cdA.startAge+'~'+cdA.endAge+'세,'+cdA.ss+')',dB:cdB.gan+cdB.ji+'('+cdB.startAge+'~'+cdB.endAge+'세,'+cdB.ss+')',sync:aGd&&bGd?'동반 상승기':aGd?'A가 끌어올리는 시기':bGd?'B가 끌어올리는 시기':'함께 인내하는 시기'});}
      if(dwA.seun&&dwB.seun){for(var si=0;si<Math.min(dwA.seun.length,dwB.seun.length,3);si++){var sAd=dwA.seun[si],sBd=dwB.seun[si];if(sAd&&sBd){var saG=goodDW.indexOf(sAd.ss)>=0,sbG=goodDW.indexOf(sBd.ss)>=0;R.details.dw.push({type:sAd.y+'년',dA:sAd.gan+sAd.ji+'('+sAd.ss+')',dB:sBd.gan+sBd.ji+'('+sBd.ss+')',sync:saG&&sbG?'둘 다 좋은 해':saG?'A에게 유리':sbG?'B에게 유리':'조심해야 할 해'});}}}
    }

    // ── 레이어 6: 십성 관계 ──
    var ssAtoB=getSipsung(rA.dg,rB.dg), ssBtoA=getSipsung(rB.dg,rA.dg);
    var ssMap={'비견':{l:3,c:5},'겁재':{l:-2,c:-3},'식신':{l:5,c:3},'상관':{l:2,c:-2},'편재':{l:8,c:2},'정재':{l:10,c:5},'편관':{l:3,c:-3},'정관':{l:8,c:5},'편인':{l:-2,c:3},'정인':{l:5,c:8}};
    R.details.sipsung={AtoB:ssAtoB,BtoA:ssBtoA,desc:'A→B='+ssAtoB+' / B→A='+ssBtoA};
    R.keywords.push('★십성: A→B='+ssAtoB+' / B→A='+ssBtoA);

    // ── 레이어 7: 용신 궁합 ──
    function extractYongOh(str,dg){if(!str)return null;var oh5=['목','화','토','금','수'];if(oh5.indexOf(str.charAt(0))>=0)return str.charAt(0);var ganOh={'갑':'목','을':'목','병':'화','정':'화','무':'토','기':'토','경':'금','신':'금','임':'수','계':'수'};if(ganOh[str.charAt(0)])return ganOh[str.charAt(0)];var OI=[0,0,1,1,2,2,3,3,4,4],ON=['목','화','토','금','수'],my=OI[dg];if(str.indexOf('비겁')>=0||str.indexOf('비견')>=0||str.indexOf('겁재')>=0)return ON[my];if(str.indexOf('식상')>=0||str.indexOf('식신')>=0||str.indexOf('상관')>=0)return ON[(my+1)%5];if(str.indexOf('재성')>=0||str.indexOf('정재')>=0||str.indexOf('편재')>=0)return ON[(my+2)%5];if(str.indexOf('관성')>=0||str.indexOf('정관')>=0||str.indexOf('편관')>=0)return ON[(my+3)%5];if(str.indexOf('인성')>=0||str.indexOf('정인')>=0||str.indexOf('편인')>=0)return ON[(my+4)%5];return null;}
    var yongA=extractYongOh(ggA.yongshin,rA.dg),yongB=extractYongOh(ggB.yongshin,rB.dg);
    if(yongA&&yongB){var bFA=(ohB[yongA]||0),aFB=(ohA[yongB]||0);var gY='';if(bFA>=3&&aFB>=3)gY='서로 살려주는 최고 궁합';else if(bFA>=2||aFB>=2)gY='한쪽이 채워주는 관계';else if(bFA>=1||aFB>=1)gY='약간의 보완';else gY='용신 보완 부족';R.details.yongshin={A:yongA,B:yongB,bForA:bFA,aForB:aFB,grade:gY};R.keywords.push('★용신: A='+yongA+'(B가'+bFA+'개) B='+yongB+'(A가'+aFB+'개) → '+gY);}

    // ── 레이어 8: 일주 통합 판정 ──
    var iljuCombo=[];var dgHap=false,djHap=false,dgChung=false,djChung=false;
    GH_GANHAP.forEach(function(h){if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0]))dgHap=true;});
    GH_YUKHAP.forEach(function(h){if((rA.dj===h[0]&&rB.dj===h[1])||(rA.dj===h[1]&&rB.dj===h[0]))djHap=true;});
    GH_CHUNG_G.forEach(function(c){if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0]))dgChung=true;});
    GH_CHUNG_J.forEach(function(c){if((rA.dj===c[0]&&rB.dj===c[1])||(rA.dj===c[1]&&rB.dj===c[0]))djChung=true;});
    if(dgHap&&djHap)iljuCombo.push('쌍합');if(dgChung&&djChung)iljuCombo.push('쌍충');if(dgHap&&djChung)iljuCombo.push('합충공존');if(dgChung&&djHap)iljuCombo.push('충합공존');if(rA.dg===rB.dg)iljuCombo.push('일간비화');
    R.details.ilju={combo:iljuCombo.length>0?iljuCombo.join('+'):'특수관계 없음'};
    if(iljuCombo.length>0)R.keywords.push('★일주: '+iljuCombo.join('+'));

    // ── 레이어 9: 원진살 ──
    var WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
    var wonjinList=[];
    for(var ai=0;ai<4;ai++)for(var bi=0;bi<4;bi++){if(jA[ai]==null||jB[bi]==null)continue;WONJIN.forEach(function(w){if(jA[ai]===w[0]&&jB[bi]===w[1])wonjinList.push({pA:ai,pB:bi,isDJ:ai===2&&bi===2});});}

    // ── 레이어 10: 교차 삼합 ──
    var SAMHAP=[[0,4,8,'수'],[1,5,9,'금'],[2,6,10,'목'],[3,7,11,'화']];
    var samhapList=[];
    SAMHAP.forEach(function(s){var all=jA.concat(jB).filter(function(j){return j!=null;});if(all.indexOf(s[0])>=0&&all.indexOf(s[1])>=0&&all.indexOf(s[2])>=0){var hA=(jA.indexOf(s[0])>=0||jA.indexOf(s[1])>=0||jA.indexOf(s[2])>=0);var hB=(jB.indexOf(s[0])>=0||jB.indexOf(s[1])>=0||jB.indexOf(s[2])>=0);if(hA&&hB){samhapList.push(s[3]);R.keywords.push('교차삼합: '+JIJI_KR[s[0]]+JIJI_KR[s[1]]+JIJI_KR[s[2]]+'('+s[3]+')');}};});

    // ── 레이어 11: 공망 교차 ──
    var gmInfo=null;
    if(typeof calcGongmang==='function'){try{var gmA=calcGongmang(rA.dg,rA.dj),gmB=calcGongmang(rB.dg,rB.dj);gmInfo={A:gmA.indexOf(rA.dj)>=0,B:gmB.indexOf(rB.dj)>=0};R.details.gongmang=gmInfo;}catch(e){}}

    // ── 레이어 12: 납음 궁합 ──
    if(typeof getNapeum==='function'){try{var nObjA=getNapeum(rA.dg,rA.dj),nObjB=getNapeum(rB.dg,rB.dj);if(nObjA&&nObjB&&nObjA.name&&nObjB.name){var napA=nObjA.name.charAt(nObjA.name.length-1),napB=nObjB.name.charAt(nObjB.name.length-1);var oh5=['금','화','목','토','수'];if(oh5.indexOf(napA)>=0&&oh5.indexOf(napB)>=0){var SM={'목':'화','화':'토','토':'금','금':'수','수':'목'},GM={'목':'토','토':'수','수':'화','화':'금','금':'목'};var nr='';if(napA===napB)nr='비화';else if(SM[napA]===napB||SM[napB]===napA)nr='상생';else if(GM[napA]===napB||GM[napB]===napA)nr='상극';else nr='무관';R.details.napeum={A:napA,B:napB,rel:nr,nameA:nObjA.name,nameB:nObjB.name};R.keywords.push('납음: '+nObjA.name+'('+napA+')↔'+nObjB.name+'('+napB+') → '+nr);}}}catch(e){}}

    // ── 레이어 13: 전체 천간 교차 십성 ──
    var crossSS=[];for(var ai=0;ai<4;ai++)for(var bi=0;bi<4;bi++){if(gA[ai]==null||gB[bi]==null)continue;if(ai===2||bi===2)crossSS.push({pA:ai,pB:bi,ss:getSipsung(gA[ai],gB[bi])});}
    R.details.crossSS=crossSS;

    // ── 레이어 14: 성별 맥락 십성 ──
    var genderA=(typeof ST!=='undefined'&&ST.gender)?ST.gender:'';
    var genderB=(typeof GH_GENDER!=='undefined')?GH_GENDER:'';
    var gCtx={};
    if(genderA==='남성'){if(ssAtoB==='정재')gCtx.A='천생 아내감';else if(ssAtoB==='편재')gCtx.A='강렬한 끌림';}
    else if(genderA==='여성'){if(ssAtoB==='정관')gCtx.A='천생 남편감';else if(ssAtoB==='편관')gCtx.A='카리스마 끌림';}
    if(genderB==='남성'){if(ssBtoA==='정재')gCtx.B='천생 아내감';else if(ssBtoA==='편재')gCtx.B='강렬한 끌림';}
    else if(genderB==='여성'){if(ssBtoA==='정관')gCtx.B='천생 남편감';else if(ssBtoA==='편관')gCtx.B='카리스마 끌림';}
    R.details.sipsung.genderContext=gCtx;
    if(gCtx.A)R.keywords.push('성별맥락A: '+gCtx.A);if(gCtx.B)R.keywords.push('성별맥락B: '+gCtx.B);

    // ── 레이어 15: 신살 교차 ──
    var slA=(sajuA.specialSals||[]).map(function(s){return s.name;}),slB=(sajuB.specialSals||[]).map(function(s){return s.name;});
    var dhA=slA.indexOf('도화살')>=0,dhB=slB.indexOf('도화살')>=0,hgA=slA.indexOf('화개살')>=0,hgB=slB.indexOf('화개살')>=0;
    var ymA=slA.indexOf('역마살')>=0,ymB=slB.indexOf('역마살')>=0,ceA=slA.indexOf('천을귀인')>=0,ceB=slB.indexOf('천을귀인')>=0;
    var yrA=slA.indexOf('양인살')>=0,yrB=slB.indexOf('양인살')>=0;
    R.details.starsCross={dowhaSal:{A:dhA,B:dhB,both:dhA&&dhB},hwagaeSal:{A:hgA,B:hgB,both:hgA&&hgB},yeokma:{A:ymA,B:ymB,both:ymA&&ymB},chuneul:{A:ceA,B:ceB,both:ceA&&ceB},yangin:{A:yrA,B:yrB,both:yrA&&yrB}};
    if(dhA&&dhB)R.keywords.push('★도화살 교차: 강렬한 매력');if(hgA&&hgB)R.keywords.push('★화개살 교차: 영적 교감');if(ymA&&ymB)R.keywords.push('역마살 교차');if(ceA&&ceB)R.keywords.push('★천을귀인 교차: 서로가 귀인');if(yrA||yrB)R.keywords.push('양인살: '+(yrA&&yrB?'둘 다 양인 — 강렬한 충돌 주의':yrA?'A에 양인 — A의 결단력/공격성':'B에 양인 — B의 결단력/공격성'));

    // ── 레이어 16: 일간 강약 궁합 ──
    var strA=ggA.strengthGrade||'중화',strB=ggB.strengthGrade||'중화';
    var isStrA=(strA==='극신강'||strA==='신강'),isWkA=(strA==='신약'||strA==='극신약');
    var isStrB=(strB==='극신강'||strB==='신강'),isWkB=(strB==='신약'||strB==='극신약');
    var stCombo='',stDesc='';
    if(isStrA&&isWkB){stCombo='A강B약';stDesc='A가 이끌어주는 관계';}else if(isWkA&&isStrB){stCombo='A약B강';stDesc='B가 이끌어주는 관계';}else if(isStrA&&isStrB){stCombo='쌍강';stDesc='주도권 다툼 주의';}else if(isWkA&&isWkB){stCombo='쌍약';stDesc='추진력 부족 주의';}else{stCombo='균형';stDesc='안정적 조합';}
    R.details.strength={A:strA,B:strB,combo:stCombo,desc:stDesc};R.keywords.push('★강약: '+stCombo+' — '+stDesc);

    // ── 레이어 17: 배우자궁 십성 교차 ──
    if(typeof JIJANGGAN_DATA!=='undefined'){try{var djDA=JIJANGGAN_DATA[rA.dj],djDB=JIJANGGAN_DATA[rB.dj];if(djDA&&djDB){var jgA=djDA[djDA.length-1],jgB=djDB[djDB.length-1];var spA=getSipsung(rB.dg,jgA.g),spB=getSipsung(rA.dg,jgB.g);var spGd=['정재','정관','식신','정인'],spGr=['정재','정관'];var aG=spGr.indexOf(spA)>=0,bG=spGr.indexOf(spB)>=0,aOk=spGd.indexOf(spA)>=0,bOk=spGd.indexOf(spB)>=0;var spDesc='';if(aG&&bG)spDesc='결혼 궁합 최상급';else if(aOk&&bOk)spDesc='결혼 후에도 좋은 관계';else if(aOk||bOk)spDesc='한쪽이 더 헌신';else spDesc='결혼 후 조율 필요';R.details.spouseGung={A:{toPartner:spA},B:{toPartner:spB},desc:spDesc};R.keywords.push('★배우자궁: A→B='+spA+' B→A='+spB+' → '+spDesc);}}catch(e){}}

    // ── 레이어 18: 5년 타이밍 ──
    var curYr=new Date().getFullYear(),goodT=['정재','식신','정관','정인'],timing5=[];
    for(var yr=curYr;yr<=curYr+4;yr++){var seI=((yr-4)%60+60)%60,seG=seI%10,seJ=seI%12;var ssAy=getSipsung(rA.dg,seG),ssByy=getSipsung(rB.dg,seG);var ys=0;if(goodT.indexOf(ssAy)>=0)ys+=2;if(goodT.indexOf(ssByy)>=0)ys+=2;GH_YUKHAP.forEach(function(h){if((seJ===h[0]&&rA.dj===h[1])||(seJ===h[1]&&rA.dj===h[0]))ys+=2;if((seJ===h[0]&&rB.dj===h[1])||(seJ===h[1]&&rB.dj===h[0]))ys+=2;});GH_CHUNG_J.forEach(function(c){if((seJ===c[0]&&rA.dj===c[1])||(seJ===c[1]&&rA.dj===c[0]))ys-=2;if((seJ===c[0]&&rB.dj===c[1])||(seJ===c[1]&&rB.dj===c[0]))ys-=2;});var yg=ys>=6?'최고의 해':ys>=4?'좋은 해':ys>=2?'무난':ys>=0?'평범':'조심';timing5.push({year:yr,ganKr:TGAN_KR[seG],jiKr:JIJI_KR[seJ],ssA:ssAy,ssB:ssByy,score:ys,grade:yg});}
    var best=timing5.reduce(function(b,c){return c.score>b.score?c:b;},timing5[0]);
    var worst=timing5.reduce(function(w,c){return c.score<w.score?c:w;},timing5[0]);
    R.details.timing={years:timing5,bestYear:best,worstYear:worst};
    R.keywords.push('★타이밍: 최고='+best.year+'년('+best.grade+') 조심='+worst.year+'년('+worst.grade+')');

    // ══════════════════════════════════════
    // ★ 통합 점수 계산 (1번만 클램핑!)
    // ══════════════════════════════════════
    var love=45,comm=45,val=45,work=45;
    // L1 일간
    dgRel.rels.forEach(function(r){if(r.t==='합')love+=20;else if(r.t==='충')love-=5;else if(r.t==='비화')love+=5;else if(r.t==='생')love+=10;else if(r.t==='극')love-=3;});
    // L2 지지
    R.details.ji.forEach(function(r){var isDJ=(r.pA==='일지'&&r.pB==='일지'),isMJ=(r.pA==='월지'||r.pB==='월지'),isYJ=(r.pA==='년지'&&r.pB==='년지');if(isDJ){if(r.type==='육합')love+=18;else if(r.type==='충')love-=8;else if(r.type==='형')love-=4;}if(isMJ){if(r.type==='육합')comm+=8;else if(r.type==='충')comm-=5;}if(isYJ){if(r.type==='육합')val+=8;else if(r.type==='충')val-=4;}});
    // L3 오행
    if(R.details.ohBowan.length>0)love+=Math.min(R.details.ohBowan.length*3,10);
    if(dmOhRel==='A생B'||dmOhRel==='B생A')val+=8;else if(dmOhRel==='비화')val+=5;else if(dmOhRel==='A극B'||dmOhRel==='B극A')val-=3;
    // L4 MBTI
    R.details.mbti.forEach(function(c){if(c.t==='주기능')comm+=(c.s-5)*3;if(c.t==='A주↔B부'||c.t==='B주↔A부')comm+=(c.s-5)*2;if(c.axis==='TF'){love+=(c.s-5)*2;val+=(c.s-5)*3;}if(c.axis==='EI')love+=(c.s-5);if(c.axis==='SN'){comm+=(c.s-5)*2;val+=(c.s-5)*2;}if(c.axis==='JP'){work+=(c.s-5)*3;val+=(c.s-5)*2;}});
    // L1+ 천간합충
    R.details.gan.forEach(function(r){if(r.type==='천간합')work+=5;else if(r.type==='천간충')work-=3;});
    // L6 십성
    var sA=ssMap[ssAtoB]||{l:0,c:0},sB=ssMap[ssBtoA]||{l:0,c:0};love+=Math.round((sA.l+sB.l)/2);comm+=Math.round((sA.c+sB.c)/2);
    // L7 용신
    if(R.details.yongshin){var yd=R.details.yongshin;if(yd.bForA>=3&&yd.aForB>=3){love+=10;val+=8;}else if(yd.bForA>=2||yd.aForB>=2){love+=5;val+=4;}else if(yd.bForA>=1||yd.aForB>=1)love+=2;else love-=3;}
    // L8 일주통합
    if(iljuCombo.indexOf('쌍합')>=0)love+=20;if(iljuCombo.indexOf('쌍충')>=0)love-=10;if(iljuCombo.indexOf('합충공존')>=0)love+=5;if(iljuCombo.indexOf('충합공존')>=0)love+=3;if(iljuCombo.indexOf('일간비화')>=0)love+=3;
    // L9 원진
    wonjinList.forEach(function(w){if(w.isDJ){love-=8;R.keywords.push('★원진살: 일지끼리 원진');}else comm-=3;});
    // L10 삼합
    samhapList.forEach(function(){love+=5;val+=3;});
    // L11 공망
    if(gmInfo){if(gmInfo.A&&gmInfo.B){love-=5;R.keywords.push('공망: 둘 다 일지 공망');}else if(gmInfo.A||gmInfo.B){love-=2;R.keywords.push('공망: 한쪽 일지 공망');}}
    // L12 납음
    if(R.details.napeum){var nr=R.details.napeum.rel;if(nr==='비화')val+=3;else if(nr==='상생'){val+=5;love+=3;}else if(nr==='상극')val-=3;}
    // L13 교차십성
    if(crossSS.filter(function(c){return['정재','정관','식신','정인'].indexOf(c.ss)>=0;}).length>=3)comm+=5;
    // L14 성별
    if(genderA&&genderB&&genderA!==genderB){if((genderA==='남성'&&ssAtoB==='정재'&&ssBtoA==='정관')||(genderA==='여성'&&ssAtoB==='정관'&&ssBtoA==='정재')){love+=10;R.keywords.push('★성별맥락: 정재↔정관 — 천생연분!');}}
    // L15 신살
    if(dhA&&dhB)love+=5;if(hgA&&hgB)val+=5;if(ymA&&ymB)work+=3;if(ceA&&ceB){love+=3;val+=3;}
    // L16 강약
    if((isStrA&&isWkB)||(isWkA&&isStrB)){love+=3;comm+=2;}else if(isStrA&&isStrB)comm-=3;else if(isWkA&&isWkB)work-=3;else val+=3;
    // L17 배우자궁
    if(R.details.spouseGung){var sp=R.details.spouseGung.desc;if(sp==='결혼 궁합 최상급'){love+=12;val+=8;}else if(sp==='결혼 후에도 좋은 관계'){love+=8;val+=5;}else if(sp==='한쪽이 더 헌신')love+=4;else love-=3;}
    // L18 타이밍
    if(timing5[0].score>=4)love+=5;if(timing5[0].score<0)love-=3;

    // ══════════════════════════════════════════════════
    // ★ saju.js 연동 블록 — window.SJ_* 함수 안전 호출
    // saju.js가 없어도 기존 18레이어 100% 정상 동작
    // ══════════════════════════════════════════════════

    // --- 육친 교차 분석 ---
    try {
      if (window.SJ_YUKCHIN_MAP && sajuA.dm && sajuB.dm && sajuA.ss && sajuB.ss) {
        var gA = (window._lastGender === '남성' || (typeof ST !== 'undefined' && ST.gender === '남성')) ? '남' : '여';
        var gB = (typeof GH_GENDER !== 'undefined' && GH_GENDER === '남성') ? '남' : '여';
        var mapA = SJ_YUKCHIN_MAP[gA] || {};
        var mapB = SJ_YUKCHIN_MAP[gB] || {};

        // A→B: A의 일간 기준으로 B의 일간이 어떤 십성인지
        var ssAtoB_yuk = '';
        if (sajuA.ss) {
          // sajuB.dm을 sajuA 기준에서 찾기
          ssAtoB_yuk = ssAtoB || '';
        }

        var ycA = mapA[ssAtoB_yuk] || ssAtoB_yuk;
        var ycB = mapB[ssBtoA] || ssBtoA;

        R.yukchinCross = {
          aToB: '나에게 상대방은 ' + ycA + ' (' + ssAtoB_yuk + ')',
          bToA: '상대방에게 나는 ' + ycB + ' (' + ssBtoA + ')'
        };
        R.keywords.push('육친: A→B=' + ycA + ' / B→A=' + ycB);
      }
    } catch (e) { console.warn('[gunghap] 육친 교차 실패:', e); }

    // --- 5신 교차 분석 ---
    try {
      if (window.SJ_calcOsinChegye && window.SJ_extractYongshinOh && window.SJ_getOsinLabel) {
        var yohA = SJ_extractYongshinOh(ggA.yongshin || '');
        var yohB = SJ_extractYongshinOh(ggB.yongshin || '');

        if (yohA) {
          var osinA = SJ_calcOsinChegye(yohA);
          var bDmEl = sajuB.dmEl || '';
          var labelBforA = SJ_getOsinLabel(osinA, bDmEl);

          R.osinCross = R.osinCross || {};
          R.osinCross.bToA = '상대방의 일간(' + bDmEl + ')은 나에게 ' + labelBforA;

          // 용신이면 점수 보너스
          if (labelBforA.indexOf('용신') >= 0 || labelBforA.indexOf('핵심') >= 0) {
            love += 10; val += 8;
            R.keywords.push('★5신: 상대방이 나의 핵심 에너지!');
          } else if (labelBforA.indexOf('희신') >= 0 || labelBforA.indexOf('보조') >= 0) {
            love += 5; val += 4;
          } else if (labelBforA.indexOf('기신') >= 0 || labelBforA.indexOf('방해') >= 0) {
            love -= 3;
          }
        }

        if (yohB) {
          var osinB = SJ_calcOsinChegye(yohB);
          var aDmEl = sajuA.dmEl || '';
          var labelAforB = SJ_getOsinLabel(osinB, aDmEl);

          R.osinCross = R.osinCross || {};
          R.osinCross.aToB = '나의 일간(' + aDmEl + ')은 상대방에게 ' + labelAforB;

          if (labelAforB.indexOf('용신') >= 0 || labelAforB.indexOf('핵심') >= 0) {
            love += 10; val += 8;
            R.keywords.push('★5신: 내가 상대방의 핵심 에너지!');
          } else if (labelAforB.indexOf('희신') >= 0 || labelAforB.indexOf('보조') >= 0) {
            love += 5; val += 4;
          } else if (labelAforB.indexOf('기신') >= 0 || labelAforB.indexOf('방해') >= 0) {
            love -= 3;
          }
        }
      }
    } catch (e) { console.warn('[gunghap] 5신 교차 실패:', e); }

    // --- 납음 궁합 스토리 (saju.js 버전) ---
    try {
      if (window.SJ_buildNapeumGunghap) {
        var napeumStory = SJ_buildNapeumGunghap(sajuA, sajuB, ggA, ggB);
        if (napeumStory) {
          R.napeumGunghap = napeumStory;
        }
      }
    } catch (e) { console.warn('[gunghap] 납음 궁합 실패:', e); }

    // --- 부부 시너지 ---
    try {
      if (window.SJ_buildCoupleSynergy) {
        var synergy = SJ_buildCoupleSynergy(sajuA, ggA, sajuB, ggB);
        if (synergy) {
          R.coupleSynergy = synergy;
        }
      }
    } catch (e) { console.warn('[gunghap] 부부 시너지 실패:', e); }

    // --- 교차 통변 ---
    try {
      if (window.SJ_detectCrossTongbyeon) {
        var crossTB = SJ_detectCrossTongbyeon(sajuA, sajuB, ggA, ggB);
        if (crossTB && crossTB.length > 0) {
          R.crossTongbyeon = crossTB;
          crossTB.forEach(function(tb) {
            R.keywords.push('교차통변: ' + tb.name + ' (' + tb.label + ')');
          });
        }
      }
    } catch (e) { console.warn('[gunghap] 교차 통변 실패:', e); }

    // --- 연동 로그 ---
    console.log('[gunghap] saju.js 연동 완료 —',
      'yukchin=' + (!!R.yukchinCross),
      'osin=' + (!!R.osinCross),
      'napeum=' + (!!R.napeumGunghap),
      'synergy=' + (!!R.coupleSynergy),
      'crossTB=' + (!!R.crossTongbyeon)
    );

    // R.details에 누락된 필드 보장 (Part 2의 buildGunghapUserPrompt에서 참조)
    if (!R.details.dg) {
      R.details.dg = {
        dgA: sajuA.dm + '(' + sajuA.dmEl + ')',
        dgB: sajuB.dm + '(' + sajuB.dmEl + ')',
        ohRel: dmOhRel || '',
        rels: dgRel ? dgRel.rels : []
      };
    }
    if (!R.details.wonjin) R.details.wonjin = wonjinList || [];
    if (!R.details.samhap) R.details.samhap = samhapList || [];
    if (!R.details.gongmang) R.details.gongmang = gmInfo || {};
    if (!R.details.sipsung) {
      R.details.sipsung = {
        AtoB: ssAtoB, BtoA: ssBtoA,
        genderContext: R.details.genderSS || {}
      };
    }
    if (!R.details.ilju) {
      R.details.ilju = { combo: iljuCombo || '', desc: '' };
    }
    if (!R.details.strength) {
      R.details.strength = {
        combo: (ggA.strengthGrade || '') + ' vs ' + (ggB.strengthGrade || ''),
        desc: ''
      };
    }
    if (!R.details.spouseGung) R.details.spouseGung = null;
    if (!R.details.starsCross) R.details.starsCross = {};
    if (!R.details.timing) R.details.timing = null;

    // ★ 최종 클램핑 (딱 1번!)
    love=Math.max(65,Math.min(95,love));comm=Math.max(65,Math.min(95,comm));val=Math.max(65,Math.min(95,val));work=Math.max(65,Math.min(95,work));
    R.scores={love:love,comm:comm,values:val,work:work,total:Math.round(love*0.35+comm*0.25+val*0.25+work*0.15)};

    // AI 키워드
    dgRel.rels.forEach(function(r){R.keywords.push('★일간: '+dgRel.ganA+'↔'+dgRel.ganB+' '+r.d);});
    R.details.gan.forEach(function(r){if(r.type)R.keywords.push(r.desc+' ['+r.imp+']');});
    R.details.ji.forEach(function(r){if(r.gungwi)R.keywords.push(r.type+': '+r.desc+' ['+r.imp+'] ('+r.gungwi+')');});
    R.details.ohBowan.forEach(function(r){R.keywords.push('오행보완: '+r.d);});
    R.details.mbti.forEach(function(c){if(c.pair)R.keywords.push('인지기능 '+c.pair+'('+c.t+'): '+c.d+' ['+c.s+'/10]');else if(c.axis)R.keywords.push(c.axis+'축: '+c.d+' ['+c.s+'/10]');});
    R.details.dw.forEach(function(d){R.keywords.push(d.type+': '+d.sync);});

    console.log('[gunghap.js] 18레이어 완료. 종합:'+R.scores.total+'점, 키워드:'+R.keywords.length+'개');
    return R;
  };

  // ══════════════════════════════════════════════════
  // ★ buildGunghapUserPrompt V2 — 완전 교체
  // engine.js의 원본을 호출하지 않고 직접 조립
  // ══════════════════════════════════════════════════

  var _origBP = window.buildGunghapUserPrompt;

  window.buildGunghapUserPrompt = function(ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB) {

    // ── 인지기능 별명 ──
    var cfN = {
      Fi: '내면의 심판관(Fi)', Fe: '분위기 리더기(Fe)',
      Ne: '가능성 탐색기(Ne)', Ni: '미래 내비게이션(Ni)',
      Si: '추억 저장소(Si)', Se: '현장 체험러(Se)',
      Ti: '내장 논리회로(Ti)', Te: '실행력 엔진(Te)'
    };
    var cfAArr = mbtiA.cf ? mbtiA.cf.split('-') : [];
    var cfBArr = mbtiB.cf ? mbtiB.cf.split('-') : [];

    var p = '궁합 분석 의뢰\n\n';

    // ════════════════════════════════════════
    // 섹션 1: A(나)의 정보 — 풍부하게
    // ════════════════════════════════════════
    p += '### ═══ A (나) ═══\n';
    p += '- 사주: ' + sajuA.P.map(function(x) { return x.l + ' ' + x.s + x.b; }).join(' | ') + '\n';
    p += '- 일주: ' + sajuA.P[2].s + sajuA.P[2].b + ' · 일간: ' + sajuA.dm + '(' + sajuA.dmEl + ')\n';
    p += '- 격국: ' + (ggA.gyeokgukName||'미분석') + ' · 강도: ' + (ggA.strengthGrade||'중화') + '\n';
    p += '- MBTI: ' + mbtiA.type + ' (' + (mbtiA.cf || '') + ', 주기능: ' + (cfN[cfAArr[0]] || cfAArr[0] || '') + ')\n';
    p += '- 오행: 목=' + sajuA.el['목'] + ' 화=' + sajuA.el['화'] + ' 토=' + sajuA.el['토'] + ' 금=' + sajuA.el['금'] + ' 수=' + sajuA.el['수'] + '\n';

    // 12운성
    if (sajuA.uns) {
      p += '- 12운성: ' + sajuA.P.map(function(pi, i) { return pi.l + '=' + (sajuA.uns[i] || '?'); }).join(', ') + '\n';
    }

    // 십성
    if (sajuA.ss && sajuA.ss.length > 0) {
      p += '- 천간십성: ' + sajuA.ss.map(function(s) { return s.pillar + ' ' + s.stem + '(' + s.ss + ')'; }).join(', ') + '\n';
    }

    // 용신
    if (ggA.yongshin) {
      p += '- 용신: ' + ggA.yongshin + '\n';
    }

    // 납음
    if (ggA.napeumText) {
      p += '- 납음: ' + ggA.napeumText + '\n';
    }

    // 신살 (간략)
    if (sajuA.specialSals && sajuA.specialSals.length > 0) {
      p += '- 신살: ' + sajuA.specialSals.map(function(s) { return s.name; }).join(', ') + '\n';
    }

    // MBTI 강도
    if (mbtiA.profile) p += '- MBTI 강도: ' + mbtiA.profile + '\n';

    // ★ P1-wiring: A의 5신 체계
    try {
      if (window.SJ_extractYongshinOh && window.SJ_calcOsinChegye && window.SJ_getOsinLabel && ggA.yongshin) {
        var _yohA = SJ_extractYongshinOh(ggA.yongshin);
        if (_yohA) {
          var _osinA = SJ_calcOsinChegye(_yohA);
          p += '- 5신체계: 용신=' + _osinA.yongsin + ' 희신=' + _osinA.huisin + ' 기신=' + _osinA.gisin + ' 구신=' + _osinA.gusin + ' 한신=' + _osinA.hansin + '\n';
          var _bLabelForA = SJ_getOsinLabel(_osinA, sajuB.dmEl);
          p += '- ★B의 일간(' + sajuB.dmEl + ')은 A에게: ' + _bLabelForA + '\n';
        }
      }
    } catch (e) { console.warn('[gunghap] A 5신 wiring 실패:', e); }

    // ★ P1-wiring: A의 도화살/역마살/화개살 궁위 상세
    try {
      if (window.SJ_analyzeSpecialSals) {
        var _salTextA = SJ_analyzeSpecialSals(sajuA);
        if (_salTextA) p += '- 신살궁위상세: ' + _salTextA.replace(/\n/g, ' / ').replace(/★특수 신살 심화:\s*/, '') + '\n';
      }
    } catch (e) {}

    // ★ P1-wiring: A의 개별 십성 분포
    try {
      if (window.SJ_countIndividualSS) {
        var _ssA = SJ_countIndividualSS(sajuA);
        if (_ssA) {
          var _ssItemsA = [];
          var _ssNamesA = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
          for (var _siA = 0; _siA < _ssNamesA.length; _siA++) {
            if (_ssA[_ssNamesA[_siA]] > 0) _ssItemsA.push(_ssNamesA[_siA] + ':' + _ssA[_ssNamesA[_siA]].toFixed(1));
          }
          if (_ssItemsA.length > 0) p += '- 개별십성분포: ' + _ssItemsA.join(', ') + '\n';
        }
      }
    } catch (e) {}

    // ★ A의 개인 분석 AI 풀이 결과 (있으면 전체 전달)
    var aiA = null;
    try {
      // 1순위: people에서 가져오기
      var people = window.MBTS_People ? window.MBTS_People.get() : [];
      for (var pi = 0; pi < people.length; pi++) {
        if (people[pi].aiResult && people[pi].saju &&
            people[pi].saju.P && sajuA.P &&
            people[pi].saju.P[2].s === sajuA.P[2].s &&
            people[pi].saju.P[2].b === sajuA.P[2].b) {
          aiA = people[pi].aiResult;
          break;
        }
      }
      // 2순위: window._lastAIResult
      if (!aiA && window._lastAIResult) aiA = window._lastAIResult;
    } catch (e) {}

    if (aiA) {
      p += '\n### A의 개인 분석 AI 풀이 결과 (이미 분석된 것 — 궁합 맥락에서 재해석하세요)\n';
      if (aiA.oneLine) p += '- 전체 인상: ' + aiA.oneLine + '\n';
      if (aiA.categories) {
        aiA.categories.forEach(function(cat) {
          var subs = cat.subs || cat.items || [];
          subs.forEach(function(sub) {
            var title = sub.h || sub.catch || '';
            var body = sub.b || sub.content || '';
            if (title && body) {
              p += '- [' + title + ']: ' + body.substring(0, 300) + (body.length > 300 ? '...' : '') + '\n';
            }
          });
        });
      }
    }

    // ════════════════════════════════════════
    // 섹션 2: B(상대방)의 정보 — 풍부하게
    // ════════════════════════════════════════
    p += '\n### ═══ B (상대방) ═══\n';
    p += '- 사주: ' + sajuB.P.map(function(x) { return x.l + ' ' + x.s + x.b; }).join(' | ') + '\n';
    p += '- 일주: ' + sajuB.P[2].s + sajuB.P[2].b + ' · 일간: ' + sajuB.dm + '(' + sajuB.dmEl + ')\n';
    p += '- 격국: ' + (ggB.gyeokgukName||'미분석') + ' · 강도: ' + (ggB.strengthGrade||'중화') + '\n';
    p += '- MBTI: ' + mbtiB.type + ' (' + (mbtiB.cf || '') + ', 주기능: ' + (cfN[cfBArr[0]] || cfBArr[0] || '') + ')\n';
    p += '- 오행: 목=' + sajuB.el['목'] + ' 화=' + sajuB.el['화'] + ' 토=' + sajuB.el['토'] + ' 금=' + sajuB.el['금'] + ' 수=' + sajuB.el['수'] + '\n';

    if (sajuB.uns) {
      p += '- 12운성: ' + sajuB.P.map(function(pi, i) { return pi.l + '=' + (sajuB.uns[i] || '?'); }).join(', ') + '\n';
    }
    if (sajuB.ss && sajuB.ss.length > 0) {
      p += '- 천간십성: ' + sajuB.ss.map(function(s) { return s.pillar + ' ' + s.stem + '(' + s.ss + ')'; }).join(', ') + '\n';
    }
    if (ggB.yongshin) p += '- 용신: ' + ggB.yongshin + '\n';
    if (ggB.napeumText) p += '- 납음: ' + ggB.napeumText + '\n';
    if (sajuB.specialSals && sajuB.specialSals.length > 0) {
      p += '- 신살: ' + sajuB.specialSals.map(function(s) { return s.name; }).join(', ') + '\n';
    }
    if (mbtiB.profile) p += '- MBTI 강도: ' + mbtiB.profile + '\n';

    // ★ P1-wiring: B의 5신 체계
    try {
      if (window.SJ_extractYongshinOh && window.SJ_calcOsinChegye && window.SJ_getOsinLabel && ggB.yongshin) {
        var _yohB = SJ_extractYongshinOh(ggB.yongshin);
        if (_yohB) {
          var _osinB = SJ_calcOsinChegye(_yohB);
          p += '- 5신체계: 용신=' + _osinB.yongsin + ' 희신=' + _osinB.huisin + ' 기신=' + _osinB.gisin + ' 구신=' + _osinB.gusin + ' 한신=' + _osinB.hansin + '\n';
          var _aLabelForB = SJ_getOsinLabel(_osinB, sajuA.dmEl);
          p += '- ★A의 일간(' + sajuA.dmEl + ')은 B에게: ' + _aLabelForB + '\n';
        }
      }
    } catch (e) { console.warn('[gunghap] B 5신 wiring 실패:', e); }

    // ★ P1-wiring: B의 도화살/역마살/화개살 궁위 상세
    try {
      if (window.SJ_analyzeSpecialSals) {
        var _salTextB = SJ_analyzeSpecialSals(sajuB);
        if (_salTextB) p += '- 신살궁위상세: ' + _salTextB.replace(/\n/g, ' / ').replace(/★특수 신살 심화:\s*/, '') + '\n';
      }
    } catch (e) {}

    // ★ P1-wiring: B의 개별 십성 분포
    try {
      if (window.SJ_countIndividualSS) {
        var _ssB = SJ_countIndividualSS(sajuB);
        if (_ssB) {
          var _ssItems = [];
          var _ssNames = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
          for (var _si = 0; _si < _ssNames.length; _si++) {
            if (_ssB[_ssNames[_si]] > 0) _ssItems.push(_ssNames[_si] + ':' + _ssB[_ssNames[_si]].toFixed(1));
          }
          if (_ssItems.length > 0) p += '- 개별십성분포: ' + _ssItems.join(', ') + '\n';
        }
      }
    } catch (e) {}

    // ★ B의 개인 분석 AI 풀이 결과 (있으면)
    var aiB = null;
    try {
      var people2 = window.MBTS_People ? window.MBTS_People.get() : [];
      for (var pi2 = 0; pi2 < people2.length; pi2++) {
        if (people2[pi2].aiResult && people2[pi2].saju &&
            people2[pi2].saju.P && sajuB.P &&
            people2[pi2].saju.P[2].s === sajuB.P[2].s &&
            people2[pi2].saju.P[2].b === sajuB.P[2].b &&
            people2[pi2].id !== 'me') {
          aiB = people2[pi2].aiResult;
          break;
        }
      }
    } catch (e) {}

    if (aiB) {
      p += '\n### B의 개인 분석 AI 풀이 결과\n';
      if (aiB.oneLine) p += '- 전체 인상: ' + aiB.oneLine + '\n';
      if (aiB.categories) {
        aiB.categories.forEach(function(cat) {
          var subs = cat.subs || cat.items || [];
          subs.forEach(function(sub) {
            var title = sub.h || sub.catch || '';
            var body = sub.b || sub.content || '';
            if (title && body) {
              p += '- [' + title + ']: ' + body.substring(0, 300) + (body.length > 300 ? '...' : '') + '\n';
            }
          });
        });
      }
    }

    // ════════════════════════════════════════
    // 섹션 3: 엔진 계산 점수
    // ════════════════════════════════════════
    p += '\n### ═══ 엔진 교차 분석 결과 ═══\n';
    p += '종합: ' + ghResult.scores.total + '점 · 연애: ' + ghResult.scores.love + '% · 소통: ' + ghResult.scores.comm + '% · 가치관: ' + ghResult.scores.values + '% · 업무: ' + ghResult.scores.work + '%\n';
    p += '★ 위 점수를 totalScore에 그대로 사용하세요.\n\n';

    // ════════════════════════════════════════
    // 섹션 4: 18레이어 상세 데이터
    // ════════════════════════════════════════

    // L1: 일간 교차
    if (ghResult.details && ghResult.details.dg) {
      var dg = ghResult.details.dg;
      p += '일간 교차 (★핵심)\n';
      p += '- A일간(' + dg.dgA + ') ↔ B일간(' + dg.dgB + '): 오행관계=' + (dg.ohRel || '') + '\n';
      if (dg.rels) {
        dg.rels.forEach(function(r) {
          p += '  → ' + r.t + (r.oh ? '(' + r.oh + ')' : '') + '\n';
        });
      }
    }

    // L2: 지지 교차
    if (ghResult.details && ghResult.details.ji && ghResult.details.ji.length > 0) {
      p += '\n지지 교차 (궁위별)\n';
      ghResult.details.ji.forEach(function(r) {
        p += '- ' + r.pA + '(' + r.brA + ') ↔ ' + r.pB + '(' + r.brB + '): ' + r.type;
        if (r.oh) p += '(' + r.oh + ')';
        if (r.pA === '일지' && r.pB === '일지') p += ' ★배우자궁 교차!';
        p += '\n';
      });
    }

    // L1+: 천간 교차
    if (ghResult.details && ghResult.details.gan && ghResult.details.gan.length > 0) {
      p += '\n천간 교차\n';
      ghResult.details.gan.forEach(function(r) {
        p += '- ' + (r.pA || '') + ' ↔ ' + (r.pB || '') + ': ' + r.type + '\n';
      });
    }

    // L3: 오행 보완
    if (ghResult.details && ghResult.details.ohBowan && ghResult.details.ohBowan.length > 0) {
      p += '\n오행 보완 (서로 채워주는 것)\n';
      ghResult.details.ohBowan.forEach(function(r) {
        p += '- ' + r + '\n';
      });
    }

    // L4: MBTI 교차
    if (ghResult.details && ghResult.details.mbti && ghResult.details.mbti.length > 0) {
      p += '\nMBTI 인지기능 교차\n';
      ghResult.details.mbti.forEach(function(c) {
        p += '- ' + c.t + ': ' + (c.desc || c.axis || '') + ' (점수: ' + c.s + ')\n';
      });
    }

    // L5: 대운 동기화
    if (ghResult.details && ghResult.details.dw && ghResult.details.dw.length > 0) {
      p += '\n대운 동기화\n';
      ghResult.details.dw.forEach(function(d) {
        p += '- ' + d.type + ': A=' + d.dA + ' / B=' + d.dB + ' → ' + d.sync + '\n';
      });
    }

    // L6: 십성 관계
    if (ghResult.details && ghResult.details.sipsung) {
      var ss = ghResult.details.sipsung;
      p += '\n★십성 관계 (핵심)\n';
      p += '- A→B: ' + (ss.AtoB || '?') + ' (나에게 상대방은?)\n';
      p += '- B→A: ' + (ss.BtoA || '?') + ' (상대방에게 나는?)\n';
      if (ss.genderContext) {
        if (ss.genderContext.A) p += '- A성별 맥락: ' + ss.genderContext.A + '\n';
        if (ss.genderContext.B) p += '- B성별 맥락: ' + ss.genderContext.B + '\n';
      }
    }

    // L7: 용신 궁합
    if (ghResult.details && ghResult.details.yongshin) {
      var yd = ghResult.details.yongshin;
      p += '\n★용신 궁합\n';
      p += '- ' + (yd.grade || yd.desc || '') + '\n';
      if (yd.bForA !== undefined) p += '- B가 A에게 주는 용신 에너지: ' + yd.bForA + '개\n';
      if (yd.aForB !== undefined) p += '- A가 B에게 주는 용신 에너지: ' + yd.aForB + '개\n';
    }

    // L8: 일주 통합
    if (ghResult.details && ghResult.details.ilju) {
      p += '\n★일주 통합 판정\n';
      p += '- ' + (ghResult.details.ilju.combo || '') + '\n';
      if (ghResult.details.ilju.desc) p += '- ' + ghResult.details.ilju.desc + '\n';
    }

    // L9: 원진살
    if (ghResult.details && ghResult.details.wonjin && ghResult.details.wonjin.length > 0) {
      p += '\n⚠️ 원진살\n';
      ghResult.details.wonjin.forEach(function(w) {
        p += '- ' + (w.brA || '') + '↔' + (w.brB || '') + (w.isDJ ? ' ★일지 원진! (핵심 갈등)' : '') + '\n';
      });
    }

    // L15: 신살 교차
    if (ghResult.details && ghResult.details.starsCross) {
      var sc = ghResult.details.starsCross;
      var starItems = [];
      if (sc.dowhaSal && sc.dowhaSal.both) starItems.push('도화살 교차 (서로 매력적)');
      if (sc.dowhaSal && sc.dowhaSal.A && !sc.dowhaSal.both) starItems.push('A에 도화살 (A가 더 매력적)');
      if (sc.dowhaSal && sc.dowhaSal.B && !sc.dowhaSal.both) starItems.push('B에 도화살 (B가 더 매력적)');
      if (sc.hwagaeSal && sc.hwagaeSal.both) starItems.push('화개살 교차 (영적 연결)');
      if (sc.yeokma && sc.yeokma.both) starItems.push('역마살 교차 (함께 이동/여행)');
      if (sc.chuneul && sc.chuneul.both) starItems.push('천을귀인 교차 (서로 귀인)');
      if (starItems.length > 0) {
        p += '\n신살 교차\n';
        starItems.forEach(function(s) { p += '- ' + s + '\n'; });
      }
    }

    // L16: 강약 궁합
    if (ghResult.details && ghResult.details.strength) {
      var st = ghResult.details.strength;
      p += '\n강약 궁합\n';
      p += '- ' + (st.combo || '') + ': ' + (st.desc || '') + '\n';
    }

    // L17: 배우자궁 교차
    if (ghResult.details && ghResult.details.spouseGung) {
      var sg = ghResult.details.spouseGung;
      p += '\n★배우자궁 십성 교차\n';
      p += '- A의 배우자 자리→B: ' + (sg.A ? sg.A.toPartner : '?') + '\n';
      p += '- B의 배우자 자리→A: ' + (sg.B ? sg.B.toPartner : '?') + '\n';
      if (sg.desc) p += '- ' + sg.desc + '\n';
    }

    // L18: 5년 타이밍
    if (ghResult.details && ghResult.details.timing) {
      var tm = ghResult.details.timing;
      p += '\n5년 타이밍\n';
      if (tm.years) {
        tm.years.forEach(function(t) {
          p += '- ' + t.year + '년: ' + t.grade + '\n';
        });
      }
      if (tm.bestYear) p += '→ 최고: ' + tm.bestYear.year + '년\n';
      if (tm.worstYear) p += '→ 조심: ' + tm.worstYear.year + '년\n';
      p += '이 타이밍을 장기 전망에 반영하세요.\n';
    }

    // L10: 교차 삼합
    if (ghResult.details && ghResult.details.samhap && ghResult.details.samhap.length > 0) {
      p += '\n교차 삼합\n';
      ghResult.details.samhap.forEach(function(s) {
        p += '- ' + (s.desc || JSON.stringify(s)) + '\n';
      });
    }

    // L11: 공망 교차
    if (ghResult.details && ghResult.details.gongmang) {
      var gm = ghResult.details.gongmang;
      if (gm.A || gm.B) {
        p += '\n공망 교차\n';
        if (gm.A && gm.B) p += '- 둘 다 일지 공망 (빈 자리끼리 만남)\n';
        else if (gm.A) p += '- A만 일지 공망\n';
        else if (gm.B) p += '- B만 일지 공망\n';
      }
    }

    // L12: 납음 궁합 (P0-fix로 이름 포함)
    if (ghResult.details && ghResult.details.napeum) {
      var np = ghResult.details.napeum;
      p += '\n납음 궁합\n';
      p += '- A: ' + (np.nameA || np.A || '?') + '(' + (np.A || '?') + ') / B: ' + (np.nameB || np.B || '?') + '(' + (np.B || '?') + ') → ' + (np.rel || '?') + '\n';
    }

    // ════════════════════════════════════════
    // 섹션 5: saju.js 연동 데이터 (있으면)
    // ════════════════════════════════════════

    // 육친 교차
    if (ghResult.yukchinCross) {
      p += '\n육친 교차 분석\n';
      p += '- 나→상대: ' + ghResult.yukchinCross.aToB + '\n';
      p += '- 상대→나: ' + ghResult.yukchinCross.bToA + '\n';
    }

    // 5신 교차
    if (ghResult.osinCross) {
      p += '\n5신 교차 분석\n';
      p += '- ' + ghResult.osinCross.aToB + '\n';
      p += '- ' + ghResult.osinCross.bToA + '\n';
    }

    // 납음 궁합 스토리 (saju.js)
    if (ghResult.napeumGunghap) {
      p += '\n납음 궁합 스토리\n' + ghResult.napeumGunghap + '\n';
    }

    // 부부 시너지
    if (ghResult.coupleSynergy) {
      p += '\n부부 시너지\n' + ghResult.coupleSynergy + '\n';
    }

    // ★ P1-wiring: MBTS 궁합 분석 (관계 유형별 비교 + 기질 궁합)
    try {
      if (typeof analyzeGunghapMBTS === 'function') {
        var _relType = window.GH_REL || window.GP_REL || 'ssom';
        var _mbtsGH = analyzeGunghapMBTS(ghResult, _relType === 'ssom' ? '썸' : _relType === 'lover' ? '연인' : _relType === 'colleague' ? '직장 동료' : '친구', sajuA, sajuB, ggA, ggB);
        if (_mbtsGH) {
          p += '\nMBTS 관계 유형별 비교\n';
          if (_mbtsGH.bestRelType) p += '- 최고 궁합 유형: ' + _mbtsGH.bestRelType.type + ' (' + _mbtsGH.bestRelType.score + '점)\n';
          if (_mbtsGH.worstRelType) p += '- 최저 궁합 유형: ' + _mbtsGH.worstRelType.type + ' (' + _mbtsGH.worstRelType.score + '점)\n';
          if (_mbtsGH.gapInsight) p += '- ★ ' + _mbtsGH.gapInsight + '\n';
          if (_mbtsGH.temperamentMatch) p += '- 기질 궁합: ' + _mbtsGH.temperamentMatch.desc + '\n';
        }
      }
    } catch (e) { console.warn('[gunghap] MBTS 궁합 wiring 실패:', e); }

    // ★ P1-wiring: PILLAR_PSYCHOLOGY (8자 심리 위치)
    try {
      if (window.MBTS_PILLAR_PSY && window.ganToMBTS) {
        var _psy = MBTS_PILLAR_PSY;
        var _rA = sajuA.raw, _rB = sajuB.raw;
        p += '\n8자 심리 위치 (궁합 맥락)\n';
        var _bYearGan = ganToMBTS(_rB.yg);
        var _bMonthGan = ganToMBTS(_rB.mg);
        var _bDayJi = ganToMBTS(_rB.dj % 10);
        if (_bYearGan) p += '- B의 외부인상(년간): ' + _bYearGan.id + '(' + _bYearGan.name + ') — ' + _psy.yearGan.desc + '\n';
        if (_bMonthGan) p += '- B의 사회적도구(월간): ' + _bMonthGan.id + '(' + _bMonthGan.name + ') — ' + _psy.monthGan.desc + '\n';
        var _aYearGan = ganToMBTS(_rA.yg);
        if (_aYearGan) p += '- A의 외부인상(년간): ' + _aYearGan.id + '(' + _aYearGan.name + ') — ' + _psy.yearGan.desc + '\n';
      }
    } catch (e) { console.warn('[gunghap] PILLAR_PSY wiring 실패:', e); }

    // ════════════════════════════════════════
    // 섹션 6: 키워드 요약
    // ════════════════════════════════════════
    if (ghResult.keywords && ghResult.keywords.length > 0) {
      p += '\n교차 분석 키워드 요약\n';
      ghResult.keywords.forEach(function(k) { p += '- ' + k + '\n'; });
    }

    // MBTS 전체 데이터 주입
    var _relMap = {ssom:'썸',lover:'연인',friend:'친구',colleague:'직장',family:'부부'};
    var _mbtsRel = _relMap[ghResult._relType || window.GH_REL] || '연인';

    p += '\nMBTS 궁합 교차 분석\n';
    var mbtsGH = analyzeGunghapMBTS(ghResult, _mbtsRel, sajuA, sajuB, ggA, ggB);
    var ax = mbtsGH.relTypeScore.axes;
    p += '4축: 끌림=' + Math.round(ax.chemistry) + ' 보완=' + Math.round(ax.compensation) + ' 갈등=' + Math.round(ax.conflict) + ' 시간=' + Math.round(ax.timeline) + '\n';
    p += '최적 관계: ' + mbtsGH.bestRelType.type + '(' + mbtsGH.bestRelType.score + ') / 최저: ' + mbtsGH.worstRelType.type + '(' + mbtsGH.worstRelType.score + ')\n';
    if (mbtsGH.gapInsight) p += mbtsGH.gapInsight + '\n';
    if (mbtsGH.temperamentMatch) p += '기질 매칭: ' + mbtsGH.temperamentMatch.desc + '\n';

    p += '\nMBTS 기질\n';
    var tA = getTemperament(sajuA), tB = getTemperament(sajuB);
    p += 'A: ' + tA.name + '(' + tA.nameEn + ') — ' + tA.keywords + '\n';
    p += 'B: ' + tB.name + '(' + tB.nameEn + ') — ' + tB.keywords + '\n';

    p += '\n원국 풍경화\n';
    var lsA = buildNatalLandscape(sajuA), lsB = buildNatalLandscape(sajuB);
    p += 'A: ' + JSON.stringify(lsA) + '\n';
    p += 'B: ' + JSON.stringify(lsB) + '\n';
    var lhA = calcLandscapeHarmony(sajuA), lhB = calcLandscapeHarmony(sajuB);
    p += '풍경 조화도 A: ' + lhA.label + '(' + lhA.score + ') — ' + lhA.desc + '\n';
    p += '풍경 조화도 B: ' + lhB.label + '(' + lhB.score + ') — ' + lhB.desc + '\n';

    p += '\nMBTS 인지기능 교차\n';
    var mfA = ganToMBTS(sajuA.raw.dg), mfB = ganToMBTS(sajuB.raw.dg);
    p += 'A 일간: ' + mfA.id + '(' + mfA.name + ') — ' + mfA.desc + ' / 에너지: ' + mfA.energy + '\n';
    p += 'B 일간: ' + mfB.id + '(' + mfB.name + ') — ' + mfB.desc + ' / 에너지: ' + mfB.energy + '\n';

    var dgA = sajuA.raw.dg, dgB = sajuB.raw.dg;
    MBTS_GAN_HAP.forEach(function(h) {
      if ((dgA===h.a&&dgB===h.b)||(dgA===h.b&&dgB===h.a))
        p += '일간합 MBTS: ' + h.resultFunc + ' — ' + h.meaning + '\n';
    });
    MBTS_GAN_CHUNG.forEach(function(c) {
      if ((dgA===c.a&&dgB===c.b)||(dgA===c.b&&dgB===c.a))
        p += '일간충 MBTS: ' + c.funcs + ' — ' + c.meaning + '\n';
    });

    p += '\nMBTS 상생 해석\n';
    MBTS_SANGSAENG.forEach(function(s) { p += s.from + '→' + s.to + ': ' + s.func + ' — ' + s.meaning + '\n'; });

    p += '\nMBTS 상극 해석\n';
    MBTS_SANGGEUK.forEach(function(s) { p += s.from + '→' + s.to + ': ' + s.func + ' — ' + s.meaning + '\n'; });

    p += '\nMBTS 기둥 심리학\n';
    ['dayGan','dayJi','monthGan','monthJi','yearGan','yearJi','hourGan','hourJi'].forEach(function(k) {
      var pp = MBTS_PILLAR_PSY[k];
      p += k + ': ' + pp.area + ' — ' + pp.desc + '\n';
    });

    p += '\nMBTS 강약 등급\n';
    var sgA = getStrengthGrade(ggA), sgB = getStrengthGrade(ggB);
    p += 'A: ' + sgA.label + ' — ' + sgA.desc + '\n';
    p += 'B: ' + sgB.label + ' — ' + sgB.desc + '\n';

    p += '\nMBTS 개인 분석 A\n';
    var mbtiAInt = (mbtiA && mbtiA.axes) ? mbtiA.axes.map(function(a){return a.pct||60;}) : [60,60,60,60];
    var mbtiBInt = (mbtiB && mbtiB.axes) ? mbtiB.axes.map(function(a){return a.pct||60;}) : [60,60,60,60];
    var mbtsA = analyzeMBTS(sajuA, ggA, dwA, (mbtiA&&mbtiA.type)||'', mbtiAInt);
    p += JSON.stringify(mbtsA) + '\n';

    p += '\nMBTS 개인 분석 B\n';
    var mbtsB = analyzeMBTS(sajuB, ggB, dwB, (mbtiB&&mbtiB.type)||'', mbtiBInt);
    p += JSON.stringify(mbtsB) + '\n';

    p += '\nMBTS 궁합 4축 정의\n';
    ['chemistry','compensation','conflict','timeline'].forEach(function(k) {
      var a = MBTS_GUNGHAP_AXIS[k];
      p += a.name + ': ' + a.desc + ' (레이어 ' + a.layers.join(',') + ')\n';
    });

    p += '\nMBTS 관계별 가중치\n' + JSON.stringify(MBTS_REL_WEIGHTS) + '\n';

    p += '\n★ 위 데이터를 기반으로 궁합 풀이를 JSON으로 작성하세요.\n';
    p += '★ totalScore는 엔진 계산 점수(' + ghResult.scores.total + ')를 그대로 사용하세요.\n';
    p += '★ 개인 분석 결과가 있으면 반드시 참고하되, 문장을 복사하지 말고 두 사람의 맥락으로 재해석하세요.\n';

    console.log('[gunghap] V2 유저 프롬프트 조립 완료 (' + p.length + '자, aiA=' + (!!aiA) + ', aiB=' + (!!aiB) + ')');
    return p;
  };


  // ╔══════════════════════════════════════╗
  // ║  PART B: 사람 목록 저장 시스템        ║
  // ╚══════════════════════════════════════╝
  var STORAGE_KEY='mbts_people';
  function getPeople(){try{var d=localStorage.getItem(STORAGE_KEY);return d?JSON.parse(d):[];}catch(e){return[];}}
  function savePeople(l){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(l));}catch(e){}}
  function addPerson(p){var l=getPeople();var f=false;for(var i=0;i<l.length;i++){if(l[i].id===p.id){l[i]=p;f=true;break;}}if(!f)l.push(p);savePeople(l);return l;}
  function removePerson(id){var l=getPeople().filter(function(p){return p.id!==id;});savePeople(l);return l;}
  function genId(){return 'p_'+Date.now()+'_'+Math.random().toString(36).substr(2,5);}
  window.MBTS_People={get:getPeople,save:savePeople,add:addPerson,remove:removePerson,genId:genId};

  function saveMyData(){if(!window._lastSaju||!window._lastMBTI)return;var s=window._lastSaju;addPerson({id:'me',name:'나',ilju:s.P[2].s+s.P[2].b,mbti:window._lastMBTI,gender:(typeof ST!=='undefined')?ST.gender:'',birthInfo:(typeof ST!=='undefined')?{y:ST.y,m:ST.m,d:ST.d,h:ST.h||'',min:ST.min||''}:{},hasFull:true,saju:s,dw:window._lastDW,gg:window._lastGG,mbtiObj:window._lastMBTIObj,aiResult:window._lastAIResult||null,enriched:(typeof SJ_enrichSajuData==='function'&&window._lastGG&&window._lastDW)?SJ_enrichSajuData(s,window._lastGG,window._lastDW,(typeof ST!=='undefined'?ST.gender:''),window._lastMBTI):null,savedAt:Date.now()});try{var _h=JSON.parse(localStorage.getItem('mbts_history')||'[]');for(var _i=0;_i<_h.length;_i++){if(_h[_i].isMyProfile){if(window._lastDW)_h[_i].dw=window._lastDW;if(window._lastGG)_h[_i].gg=window._lastGG;if(window._lastMBTIObj)_h[_i].mbtiObj=window._lastMBTIObj;_h[_i].mbti=window._lastMBTI;_h[_i].saju=s;break;}}localStorage.setItem('mbts_history',JSON.stringify(_h));}catch(_e){console.warn('[MBTS] saveMyData history sync fail:',_e);}renderPeopleList();}
  window.MBTS_People.saveMyData=saveMyData;

  function renderPeopleList(){var c=document.getElementById('people-list-container');if(!c)return;var pp=getPeople();if(pp.length===0){c.innerHTML='<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px 0">아직 분석한 사람이 없어요</p>';return;}var h='';pp.forEach(function(p){var d=p.savedAt?new Date(p.savedAt).toLocaleDateString('ko-KR'):'';var badge=p.hasFull?'<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(76,175,125,.1);color:#4CAF7D;border-radius:6px">분석완료 ✨</span>':'<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(201,154,46,.1);color:#c99a2e;border-radius:6px">기본정보</span>';var isMe=p.id==='me';h+='<div class="glass-card" style="padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer" '+(isMe&&p.hasFull?'onclick="viewSavedResult()"':'')+'><div style="width:40px;height:40px;border-radius:12px;background:'+(isMe?'var(--accent-dim)':'rgba(214,51,132,.08)')+';display:flex;align-items:center;justify-content:center;font-size:20px">'+(isMe?'🙋':'👤')+'</div><div style="flex:1"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700;color:var(--text-primary)">'+(p.name||p.ilju)+'</span>'+badge+'</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">'+p.ilju+'일주 · '+p.mbti+(d?' · '+d:'')+'</div></div>'+(isMe?'<span style="font-size:16px;color:var(--text-muted)">›</span>':'<button onclick="event.stopPropagation();MBTS_People.del(\''+p.id+'\')" style="background:none;border:none;font-size:16px;color:var(--text-muted);cursor:pointer;padding:4px 8px">✕</button>')+'</div>';});c.innerHTML=h;}
  window.MBTS_People.del=function(id){if(confirm('삭제할까요?')){removePerson(id);renderPeopleList();renderGHSelector();}};

  function injectPeopleListUI(){var sc=document.getElementById('home-content-saju');if(!sc||document.getElementById('people-list-container'))return;var s=document.createElement('div');s.style.marginTop='20px';s.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="font-size:13px;font-weight:700;color:var(--text-muted)">📋 분석한 사람 목록</div><button onclick="goPage(\'birth\')" style="background:none;border:1px solid var(--accent);color:var(--accent);font-size:11px;font-weight:600;padding:4px 10px;border-radius:8px;cursor:pointer">+ 새 사람 추가</button></div><div id="people-list-container"></div>';sc.appendChild(s);renderPeopleList();}

  // 궁합 탭 사람 선택
  var GH_SEL_A=null,GH_SEL_B=null,GP_REL='';
  function renderGHSelector(){var c=document.getElementById('gh-people-selector');if(!c)return;var pp=getPeople();if(pp.length<1){c.innerHTML='<div style="text-align:center;padding:16px"><p style="color:var(--text-muted);font-size:13px">먼저 사주 분석을 해주세요!</p><button onclick="switchHomeTab(\'saju\')" style="margin-top:12px;padding:10px 20px;font-size:13px;font-weight:700;color:#fff;background:var(--accent);border:none;border-radius:10px;cursor:pointer">🔮 사주 분석하기</button></div>';return;}var h='';h+='<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">👤 첫 번째 사람</label><div style="display:flex;flex-wrap:wrap;gap:6px">';pp.forEach(function(p){var iS=GH_SEL_A&&GH_SEL_A.id===p.id,iD=GH_SEL_B&&GH_SEL_B.id===p.id;h+='<button onclick="MBTS_People.selA(\''+p.id+'\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px solid '+(iS?'var(--accent)':'var(--border-light)')+';background:'+(iS?'rgba(136,97,154,0.08)':'#fff')+';color:'+(iS?'var(--accent)':(iD?'var(--border-light)':'var(--text-muted)'))+';cursor:'+(iD?'not-allowed':'pointer')+'">'+(p.id==='me'?'🙋 ':'👤 ')+(p.name||p.ilju)+'</button>';});h+='</div></div>';h+='<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;color:#d63384;display:block;margin-bottom:6px">👤 두 번째 사람</label><div style="display:flex;flex-wrap:wrap;gap:6px">';pp.forEach(function(p){var iS=GH_SEL_B&&GH_SEL_B.id===p.id,iD=GH_SEL_A&&GH_SEL_A.id===p.id;h+='<button onclick="MBTS_People.selB(\''+p.id+'\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px solid '+(iS?'#d63384':'var(--border-light)')+';background:'+(iS?'rgba(214,51,132,0.08)':'#fff')+';color:'+(iS?'#d63384':(iD?'var(--border-light)':'var(--text-muted)'))+';cursor:'+(iD?'not-allowed':'pointer')+'">'+(p.id==='me'?'🙋 ':'👤 ')+(p.name||p.ilju)+'</button>';});h+='<button onclick="goPage(\'gh-input\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px dashed var(--border-light);background:#fff;color:var(--text-muted);cursor:pointer">+ 새 사람</button>';h+='</div></div>';if(GH_SEL_A&&GH_SEL_B){h+='<div class="glass-card" style="padding:14px;margin-bottom:4px;background:rgba(136,97,154,0.03)"><div style="display:flex;align-items:center;justify-content:center;gap:12px"><div style="text-align:center"><div style="font-size:20px">'+(GH_SEL_A.id==='me'?'🙋':'👤')+'</div><div style="font-size:13px;font-weight:700">'+(GH_SEL_A.name||GH_SEL_A.ilju)+'</div><div style="font-size:11px;color:var(--text-muted)">'+GH_SEL_A.mbti+'</div></div><div style="font-size:24px">💕</div><div style="text-align:center"><div style="font-size:20px">'+(GH_SEL_B.id==='me'?'🙋':'👤')+'</div><div style="font-size:13px;font-weight:700">'+(GH_SEL_B.name||GH_SEL_B.ilju)+'</div><div style="font-size:11px;color:var(--text-muted)">'+GH_SEL_B.mbti+'</div></div></div></div>';}c.innerHTML=h;}
  window.MBTS_People.selA=function(id){var p=getPeople().find(function(x){return x.id===id;});if(!p||(GH_SEL_B&&GH_SEL_B.id===id))return;GH_SEL_A=p;renderGHSelector();checkGHPReady();};
  window.MBTS_People.selB=function(id){var p=getPeople().find(function(x){return x.id===id;});if(!p||(GH_SEL_A&&GH_SEL_A.id===id))return;GH_SEL_B=p;renderGHSelector();checkGHPReady();};
  window.MBTS_People.pickRel=function(type){GP_REL=type;if(typeof window.GH_REL!=='undefined')window.GH_REL=type;['ssom','lover','colleague','friend'].forEach(function(t){var b=document.getElementById('gp-rel-'+t);if(b){b.style.background=(t===type)?'rgba(136,97,154,0.08)':'#fff';b.style.color=(t===type)?'var(--accent)':'var(--text-muted)';b.style.borderColor=(t===type)?'var(--accent)':'var(--border-light)';}});checkGHPReady();};
  function checkGHPReady(){var btn=document.getElementById('btn-gh-people-start'),rel=document.getElementById('gh-people-rel');if(!btn)return;if(GH_SEL_A&&GH_SEL_B){if(rel)rel.style.display='block';}else{if(rel)rel.style.display='none';}var ok=GH_SEL_A&&GH_SEL_B&&GP_REL;btn.style.display=(GH_SEL_A&&GH_SEL_B)?'block':'none';btn.disabled=!ok;if(ok){var cd=GH_CATEGORIES[GP_REL]||{emoji:'💕',label:'궁합'};btn.textContent=cd.emoji+' '+(GH_SEL_A.name||GH_SEL_A.ilju)+' × '+(GH_SEL_B.name||GH_SEL_B.ilju)+' '+cd.label+' 분석!';btn.style.background='#d63384';btn.style.color='#fff';btn.style.cursor='pointer';}else if(GH_SEL_A&&GH_SEL_B){btn.textContent='☝️ 관계를 선택해주세요';btn.style.background='rgba(0,0,0,0.08)';btn.style.color='var(--text-muted)';btn.style.cursor='not-allowed';}}
  function injectGHSelectorUI(){var gc=document.getElementById('home-content-gunghap');if(!gc||document.getElementById('gh-people-selector'))return;var s=document.createElement('div');s.style.marginTop='16px';s.innerHTML='<div class="glass-card" style="padding:24px 20px;margin-bottom:16px"><h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px">💑 두 사람을 선택하세요</h3><p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">목록에서 두 사람을 골라 궁합을 볼 수 있어요</p><div id="gh-people-selector"></div><div id="gh-people-rel" style="display:none;margin-top:12px"><label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">우리의 관계</label><div style="display:flex;flex-wrap:wrap;gap:6px"><button onclick="MBTS_People.pickRel(\'ssom\')" id="gp-rel-ssom" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💕 썸</button><button onclick="MBTS_People.pickRel(\'lover\')" id="gp-rel-lover" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">❤️ 연인</button><button onclick="MBTS_People.pickRel(\'colleague\')" id="gp-rel-colleague" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💼 직장 동료</button><button onclick="MBTS_People.pickRel(\'friend\')" id="gp-rel-friend" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">🍻 친구</button></div></div><button id="btn-gh-people-start" onclick="MBTS_People.startFromList()" style="display:none;width:100%;padding:14px;font-size:15px;font-weight:700;color:#fff;background:#d63384;border:none;border-radius:12px;margin-top:16px;box-shadow:0 4px 16px rgba(214,51,132,.2);cursor:pointer" disabled>선택해주세요</button></div>';gc.appendChild(s);renderGHSelector();}

  window.MBTS_People.startFromList=async function(){if(!GH_SEL_A||!GH_SEL_B||!GP_REL)return;var pA=GH_SEL_A,pB=GH_SEL_B;window._lastSaju=pA.saju;window._lastDW=pA.dw;window._lastGG=pA.gg;window._lastMBTI=pA.mbti;window._lastMBTIObj=pA.mbtiObj;if(typeof GH_REL!=='undefined')window.GH_REL=GP_REL;if(typeof GH_GENDER!=='undefined')window.GH_GENDER=pB.gender||'남성';if(typeof GH_MBTI_SEL!=='undefined')window.GH_MBTI_SEL=pB.mbti;var apiKey=getApiKey();if(!apiKey){apiKey=await promptApiKey();if(!apiKey)return;}var ghR=analyzeGunghap(pA.saju,pB.saju,pA.dw,pB.dw,pA.gg,pB.gg,pA.mbtiObj,pB.mbtiObj);if(GH_CATEGORIES[GP_REL]){var w=GH_CATEGORIES[GP_REL].scoreWeights;ghR.scores.total=Math.round(ghR.scores.love*w.love+ghR.scores.comm*w.comm+ghR.scores.values*w.values+ghR.scores.work*w.work);}goPage('gh-load');var cd=GH_CATEGORIES[GP_REL]||{emoji:'💕',label:'궁합',categories:['연애 케미','소통 방식','갈등 패턴','장기 전망'],tone:''};var msgs=['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...',cd.emoji+' '+cd.label+' 궁합...',cd.categories[0]+' 분석...',(cd.categories[1]||'소통')+' 분석...',(cd.categories[2]||'전망')+' 분석...','인지기능 궁합 탐색...','이야기를 쓰는 중...'];var p=0,iv=setInterval(function(){p+=Math.random()*1.5+0.4;if(p>95)p=95;document.getElementById('gh-load-bar').style.width=p+'%';document.getElementById('gh-load-pct').textContent=Math.round(p)+'%';document.getElementById('gh-load-msg').textContent=msgs[Math.min(Math.floor(p/12),7)];},900);var up=buildGunghapUserPrompt(ghR,pA.saju,pB.saju,pA.dw,pB.dw,pA.gg,pB.gg,pA.mbtiObj,pB.mbtiObj);var ghCfg=GH_REL_CONFIG[GP_REL];up+='\n### 관계: '+cd.label+'\n';if(ghCfg&&ghCfg.subs&&ghCfg.subs.length>0){up+='부제: '+(ghCfg.subtitle||'')+'\n\n';for(var _si2=0;_si2<ghCfg.subs.length;_si2++){up+=(_si2+1)+'. '+ghCfg.subs[_si2].h+' (톤: '+ghCfg.subs[_si2].tone+')\n';}}else if(ghCfg&&ghCfg.categories&&ghCfg.categories[0]&&ghCfg.categories[0].subs){up+='부제: '+(ghCfg.subtitle||'')+'\n\n';var sc2=0;ghCfg.categories.forEach(function(gc){up+='【'+gc.name+'】\n';gc.subs.forEach(function(s){sc2++;up+=sc2+'. '+s.h+' (톤: '+s.tone+')\n';});up+='\n';});}else{up+='카테고리:\n';cd.categories.forEach(function(c,i){up+=(i+1)+'. '+c+'\n';});if(cd.tone)up+='\n톤: '+cd.tone+'\n';}var sp=getGHSystemPrompt(GP_REL);var ai=null,ae='';var ghSubTitles3=[];var ghCfg3=GH_REL_CONFIG[GP_REL];if(ghCfg3&&ghCfg3.subs){ghCfg3.subs.forEach(function(s){ghSubTitles3.push(s.h);});}else if(ghCfg3&&ghCfg3.categories){ghCfg3.categories.forEach(function(c){(c.subs||[]).forEach(function(s){ghSubTitles3.push(s.h);});});}var _ghProgQueue2=[],_ghProgInitDone2=false,_ghCollectedSubs2=[];try{var at=await streamSonnet(apiKey,sp,up,cd.emoji+' 궁합',{subTitles:ghSubTitles3,onMessage:function(m){if(!_ghProgInitDone2){var el=document.getElementById('gh-load-msg');if(el)el.textContent=m;}},onProgress:function(pct){if(!_ghProgInitDone2){var b=document.getElementById('gh-load-bar');if(b)b.style.width=Math.min(pct,100)+'%';}},onPercent:function(pct){if(!_ghProgInitDone2){var pe=document.getElementById('gh-load-pct');if(pe)pe.textContent=Math.round(pct)+'%';}},onBlueprint:function(){},onSub:function(subObj,idx){console.log('[GH-STREAM] sub #'+(idx+1)+': '+subObj.h);_ghProgQueue2.push({sub:subObj,idx:idx});_ghCollectedSubs2.push(subObj);if(_ghProgQueue2.length===1&&!_ghProgInitDone2){_ghProgInitDone2=true;clearInterval(iv);if(typeof initGhProgressivePage==='function')initGhProgressivePage(ghR,pA.saju,pB.saju,pA.mbtiObj,pB.mbtiObj,pA.gg,pB.gg,GP_REL);setTimeout(function(){appendGhSubCard(_ghProgQueue2[0].sub,0,GP_REL);},200);}if(_ghProgInitDone2&&_ghProgQueue2.length>1){appendGhSubCard(subObj,idx,GP_REL);}}},'/api/gunghap-analyze');try{ai=JSON.parse(at);}catch(e){var fb=at.indexOf('{'),lb=at.lastIndexOf('}');if(fb>=0&&lb>fb)try{ai=JSON.parse(at.substring(fb,lb+1));}catch(e2){}if(!ai){var ln=at.split('\n'),si=-1,ei=-1;for(var li=0;li<ln.length;li++){if(si<0&&ln[li].trim().charAt(0)==='{')si=li;if(ln[li].trim().charAt(0)==='}'||ln[li].trim().slice(-1)==='}')ei=li;}if(si>=0&&ei>=si)try{ai=JSON.parse(ln.slice(si,ei+1).join('\n'));}catch(e3){}}if(!ai){var sn=at.substring(fb>=0?fb:0,(lb>0?lb+1:at.length));sn=sn.replace(/[\x00-\x1F\x7F]/g,function(c){return c==='\n'||c==='\r'||c==='\t'?c:'';});try{ai=JSON.parse(sn);}catch(e4){}}if(ai)ae='';else ae='JSON_PARSE';}}catch(e){ae=e.message||'UNKNOWN';}if(ai)ai=postValidateGH(ai,ghR,pA.dw,pB.dw);if(!window._skipGhHistorySave)try{var _ghRec={id:String(Date.now())+String(Math.random()).slice(2,6),date:new Date().toISOString().slice(0,10).replace(/-/g,'.'),relType:GP_REL,relLabel:(GH_CATEGORIES[GP_REL]||{}).label||'궁합',personA:{name:pA.name||pA.ilju||'나',emoji:'',tag:'',saju:pA.saju,mbti:pA.mbtiObj?pA.mbtiObj.type:pA.mbti||'',mbtiObj:pA.mbtiObj,gg:pA.gg,ilju:pA.saju.P[2].s+pA.saju.P[2].b+'일주'},personB:{name:pB.name||pB.ilju||'상대',emoji:'',tag:'',saju:pB.saju,mbti:pB.mbtiObj?pB.mbtiObj.type:pB.mbti||'',mbtiObj:pB.mbtiObj,gg:pB.gg,ilju:pB.saju.P[2].s+pB.saju.P[2].b+'일주'},scores:ghR.scores,aiResult:ai,ghResult:ghR};var _ghHist2=[];try{_ghHist2=JSON.parse(localStorage.getItem('mbts_gh_history'))||[];}catch(e4){}if(_ghHist2.length>50)_ghHist2=_ghHist2.slice(-50);_ghHist2.push(_ghRec);localStorage.setItem('mbts_gh_history',JSON.stringify(_ghHist2));}catch(e3){console.warn('[MBTS] startFromList 궁합 저장 실패:',e3);}window._skipGhHistorySave=false;clearInterval(iv);document.getElementById('gh-load-bar').style.width='100%';document.getElementById('gh-load-pct').textContent='100%';setTimeout(function(){if(_ghProgInitDone2){if(typeof finalizeGhProgressivePage==='function')finalizeGhProgressivePage(ai,ghR,pA.saju,pB.saju,pA.mbtiObj,pB.mbtiObj,pA.gg,pB.gg,GP_REL,_ghCollectedSubs2);}else{renderGunghapResultV2(ghR,ai,pA.saju,pB.saju,pA.mbtiObj,pB.mbtiObj,pA.gg,pB.gg,ae,GP_REL);goPage('gh-res');}},600);};


  // ╔══════════════════════════════════════╗
  // ║  PART C: 관계 유형 선택               ║
  // ╚══════════════════════════════════════╝
  window.GH_REL='';
  window.GH_CATEGORIES={'ssom':{label:'💕 썸',emoji:'💕',categories:['상대 파악','나와의 관계','실전','미래'],scoreLabels:{love:'끌림',comm:'소통',values:'가치관',work:'일상'},scoreWeights:{love:0.40,comm:0.30,values:0.15,work:0.15},tone:'설렘과 궁금함. 두근거리는 톤.'},'lover':{label:'❤️ 연인',emoji:'❤️',categories:['상대 파악','궁합 구조','소통과 갈등','결혼'],scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'생활'},scoreWeights:{love:0.35,comm:0.25,values:0.25,work:0.15},tone:'현실적이고 깊은 분석. 솔직한 톤.'},'colleague':{label:'💼 직장 동료',emoji:'💼',categories:['상대 파악','협업 구조','실전 팁','성장'],scoreLabels:{love:'친밀도',comm:'소통',values:'가치관',work:'업무'},scoreWeights:{love:0.05,comm:0.30,values:0.25,work:0.40},tone:'프로페셔널하지만 인간적.'},'friend':{label:'🍻 친구',emoji:'🍻',categories:['상대 파악','우리 구조','유지와 시너지','장기'],scoreLabels:{love:'유대감',comm:'소통',values:'가치관',work:'활동'},scoreWeights:{love:0.10,comm:0.35,values:0.30,work:0.25},tone:'편안하고 솔직한 톤.'}};

  function injectRelationUI(){var g=document.getElementById('gh-btn-male');if(!g||document.getElementById('gh-rel-grid'))return;var w=g.parentElement.parentElement;if(!w)return;var d=document.createElement('div');d.style.marginBottom='14px';d.innerHTML='<label style="font-size:11px;color:var(--accent);font-weight:600;display:block;margin-bottom:6px">우리의 관계</label><div style="display:flex;flex-wrap:wrap;gap:6px" id="gh-rel-grid"><button id="gh-rel-ssom" onclick="ghPickRel(\'ssom\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💕 썸</button><button id="gh-rel-lover" onclick="ghPickRel(\'lover\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">❤️ 연인</button><button id="gh-rel-colleague" onclick="ghPickRel(\'colleague\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💼 직장 동료</button><button id="gh-rel-friend" onclick="ghPickRel(\'friend\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">🍻 친구</button></div>';w.parentNode.insertBefore(d,w.nextSibling);}
  window.ghPickRel=function(type){GH_REL=type;['ssom','lover','colleague','friend'].forEach(function(t){var b=document.getElementById('gh-rel-'+t);if(b){b.style.background=(t===type)?'rgba(136,97,154,0.08)':'#fff';b.style.color=(t===type)?'var(--accent)':'var(--text-muted)';b.style.borderColor=(t===type)?'var(--accent)':'var(--border-light)';}});if(typeof checkGHReady==='function')checkGHReady();};
  var _origCGR=window.checkGHReady;window.checkGHReady=function(){if(typeof _origCGR==='function')_origCGR();if(!GH_REL){var b=document.getElementById('btn-gh-start');if(b){b.disabled=true;b.style.background='rgba(0,0,0,0.08)';b.style.color='var(--text-muted)';}}};
  // ══════════════════════════════════════════════════
  // ★ 궁합 시스템 프롬프트 V2 — lib/gunghap-prompt.js와 자동 동기화
  // ⚠️ 이 블록은 scripts/sync-public-prompts.js가 매 빌드마다 재생성합니다.
  //    직접 수정 금지. 변경하려면 lib/gunghap-prompt.js를 수정하고 npm run build.
  // ══════════════════════════════════════════════════

  var GUNGHAP_SYSTEM_V2 = `당신은 대한민국 최정상급 MBTS(사주 × MBTI) 전문가입니다.

## 핵심 임무
두 사람의 사주팔자와 MBTI를 교차 분석하여, "어? 우리 딱 이래!" 하고 소름 돋는 궁합 풀이를 만드세요.

## 재료 계층 (★ 중요)
【1군 — 반드시 사용】 풀이의 뼈대.
- ★★ A/B 캐릭터 프로파일 (premium 패턴 — 각 사람의 사주×MBTI 교차 분석)
- 두 사람의 핵심 특성: 일주 물상, 격국, 용신
- 궁합 원국 데이터: 합충 분석, 오행 궁합, 용신 궁합

【2군 — 보조】 1군을 풍성하게 만드는 살.
- A/B MBTI 강도별 행동 프로파일
- A/B 대운·세운 요약, 합충형해
- 카드별 출발 힌트

【3군 — 필요할 때만】
- MBTI 이론 심층, 사주 이론 심층, 월운, 지장간 비율, 신살, 동적 키워드

## 교차 패턴 활용 (핵심)
각 소주제마다 제공된 교차 패턴 중 이 궁합에 가장 강하게 해당하는 4개를 골라,
그 패턴의 교차해설을 소주제의 뼈대로 사용하세요.
패턴에 없는 내용으로 채우지 마세요. 패턴이 풀이의 주인공입니다.

## 전문용어 금지 (절대 규칙)
사주/MBTI 전문용어(십성·천간지지·신살명·격국명·12운성명·궁위명·운 이름·오행분석용어) 본문 노출 금지. 자연어로 번역.
금지는 본문(b)에만 적용.
물상 비유는 자유: 촛불, 이슬, 칼날, 바위, 호수, 씨앗, 모닥불 등

- 사주 전문용어(한자 포함)를 본문에 절대 쓰지 마세요. 괄호 안 뉘앙스를 참고해서 자연어로만 쓰세요.
전문용어 옆 괄호는 뉘앙스 힌트일 뿐입니다. 그대로 옮기지 마세요. 해당 소주제의 맥락과 흐름에 맞게 자기 말로 풀어쓰세요. 같은 용어라도 소주제마다 다르게 표현하세요.

## 소주제별 균형 (절대 규칙)
각 소주제 본문에 사주 재료와 MBTI 재료가 자연스럽게 어우러져야 함. 한 소주제가 사주만 또는 MBTI만으로 채워지는 것 금지.

## 긍정 먼저 규칙
각 소주제의 b에서 첫 1~2문단은 두 사람의 강점, 케미, 끌림으로 시작하세요.
나머지는 두 사람의 관계에 발현하는 강한 특징과 mbts패턴 위주로 풀이하세요.

## 문체
- 구어체: ~예요, ~거든요. 유저 프롬프트 상단에 명시된 이름(예: ○○님)으로 호칭하세요. "당신", "상대방" 같은 대명사 사용 금지.
- 인지기능 설명: "INFP 특유의 ~~ 성향으로" 식으로 자연어로. 인지기능 코드(Fi, Ni 등)·학술용어("주기능", "Ni-Fi 루프")·인지기능 별명("내면의 심판관", "분위기 리더기", "가능성 탐색기", "미래 내비게이션", "추억 저장소", "현장 스캐너", "내장 논리회로", "실행력 엔진" 등) 노출 금지.
  나쁜 예: "내면의 심판관(Fi)이 주기능이라서..."
  나쁜 예: "Ni-Fi 루프에 빠지면..."
- 내면 독백("~") 항목당 최대 2개. 모든 MBTI에 따뜻한 감성 톤.
- 동네 언니/오빠처럼 카페에서 두 사람 이야기 해주는 느낌으로 쓰세요.
- 의사가 환자에게 소견서 읽어주는 톤 금지.

## _blueprint (풀이 전 메모 — 사용자에게 표시 안 됨)

본문을 쓰기 전에 _blueprint를 먼저 작성하세요. _blueprint는 세 단계입니다:

STEP 1: 각 소주제마다, A/B 캐릭터 프로파일과 궁합 원국 데이터에서 해당 소주제에 가장 관련 있는 특성 4개를 골라 적으세요.
- B 전용 소주제(성격/연애/좋아하는/싫어하는): B의 캐릭터에서 선택
- A→B 소주제(접근법/역효과/사귀려면): A의 캐릭터 + 궁합 데이터에서 선택
- A↔B 소주제(끌림/맞춰가야/어떤 커플/한줄): A·B 캐릭터를 교차 + 궁합 데이터에서 선택

STEP 2: 12개 소주제 전체를 훑어보고, 같은 테마가 2개 이상의 소주제에 등장하면 한 소주제에만 남기고 나머지에서는 다른 특성으로 교체하세요.

STEP 3: 각 소주제마다 다음을 적으세요:
- keyword: 그 소주제의 핵심 메시지 한 단어 (12개 중 의미 겹침 금지)
- cross_axis: 두 사람 각각의 사주×MBTI 교차점을 한 줄로 (같은 축 조합 반복 금지)
  예: "A(화일간×직관형) ↔ B(수용신×감정형)"
      "A(배우자궁 편관×J성향) ↔ B(식상과다×P성향)"
      "A↔B 일지충 × A(내향)↔B(외향) 소통 차이"

"_blueprint": {
  "소주제1": {"patterns": ["패턴A","패턴B","패턴C","패턴D"], "keyword": "한단어", "cross_axis": "A(사주×MBTI) ↔ B(사주×MBTI)"},
  "소주제2": {"patterns": [...], "keyword": "...", "cross_axis": "..."},
  ...위 categories에 정의된 소주제 전부
}

_blueprint를 완성한 후에만 categories 본문을 쓰세요.
각 소주제의 첫 문단에서 선택한 cross_axis가 이 궁합에 왜 해당되는지를 풀어쓰세요.

## 소주제 간 중복 방지 (절대 규칙)
- _blueprint STEP 2에서 중복을 제거했으면, 본문에서도 지키세요.
- 같은 테마(예: "실행력 부족", "감정을 혼자 삭임", "경쟁 기질")가 2개 이상의 소주제에서 주요 문단으로 등장하면 안 됩니다.
- 한 소주제에서 주요 테마로 다룬 내용은 다른 소주제에서 한 문장 이내로만 언급할 수 있습니다.

## 신강도 쿼터제 (절대 규칙)
신강도·에너지 강약을 직접 언급하는 것은 전체 풀이에서 최대 3회까지.
"에너지가 약한", "에너지가 부족한", "에너지가 강한" 같은 직접 표현 대신 물상 비유를 사용하세요.
예: "에너지가 약한 사람" → "촛불 하나로 버티는 사람", "뿌리가 얕은 나무", "조용한 샘물 같은 구조"
캐릭터 프로파일에 다양한 특성이 있으니, 매 소주제마다 다른 특성으로 인물을 그리세요.

## 작성 규칙
- 각 소주제는 캐릭터 프로파일에서 선택한 특성으로 시작하고, 궁합 원국 데이터로 뒷받침하세요.
- 각 소주제에서 핵심 패턴 4개 골라서 깊게 풀이하세요. 나열하지 마세요.
각 소주제에서 캐릭터 프로파일의 다양한 특성을 골라 쓰세요. 한 가지 특성(예: 에너지 강약)에 의존하지 말고, 매 소주제마다 다른 각도로 인물을 그리세요.
- 끝낼 곳에서 끝내세요.

## 소주제별 시점 (절대 규칙)
각 소주제에는 시점(speaker)이 지정되어 있습니다. 반드시 해당 시점에서 풀이하세요.
- "B에 대해" → B의 특성을 A에게 설명. 주어는 B(이름).
- "B → A 시점" → B가 A를 바라보는 방향. B의 눈으로 A가 어떻게 보이는지.
- "A → B 방향" → A가 B에게 다가가거나 대처하는 방향. A에게 코칭하는 시점.
- "A ↔ B 양방향" → 둘 사이의 관계를 조망. 어느 한쪽에 치우치지 않게.
시점을 무시하고 일반적인 궁합론을 쓰면 불합격입니다.

## 소주제별 톤 (패턴 선택 후 적용)
해당 소주제의 패턴 4개를 먼저 고른 뒤, 유저 프롬프트에 동봉된 톤 가이드대로 풀어쓰세요.
톤은 재료를 고르는 기준이 아니라 표현 방식입니다.
전체적으로 희망차고 따뜻한 톤을 유지하세요.

## 인사이트/처방
- 본문(b): 풀이만. 처방은 tip에만.
- 추상적 조언 금지. 오늘 당장 할 수 있는 구체적 행동.
- 각 sub의 b 마지막에 반드시 💊로 시작하는 실천 팁 1~2줄. 💊는 내용에 따라 다양한 이모티콘을 써도 돼.

## 데이터 무결성
제공된 점수·숫자·나이·간지·오행개수·세운연도 변경 금지. 없는 합충형 만들기 금지.
대운 나이 범위는 제공 데이터 그대로. MBTI 유형·인지기능 스택 변경 금지.

## quote 필드
적천수 물상 + 계절감 + 두 사람의 사주 분위기. 자연 이미지 한 줄. 납음은 한 줄 요약 전용이므로 여기서는 쓰지 마세요.

## categories 구조
유저 프롬프트에 명시된 카테고리와 소주제 순서를 그대로 따르세요.
★ 각 카테고리 안에 subs 배열, 각 sub는 {"h":"소제목","b":"본문"} 객체. 카테고리를 통째로 하나의 글로 쓰면 불합격.
h는 유저 프롬프트에 정의된 소주제명을 정확히 그대로 사용하세요.

## JSON 출력 형식

{
  "title": "OO일주×XX일주 · XXXX×YYYY 궁합",
  "quote": "자연 이미지 한 줄",
  "totalScore": 87,
  "categories": [
    {
      "n": "카테고리명",
      "subs": [
        {
          "h": "소주제명",
          "b": "문단1\\
\\
문단2\\
\\
💊 실천 팁"
        }
      ]
    }
  ]
}

b: 3~5문단, 각 3~5문장. \\
\\
으로 구분. 마지막 문단은 이모지로 시작하는 실천 팁.
JSON만 출력하세요.`;

  var GH_REL_CONFIG = {
  ssom: {
    title: '\uC378',
    subtitle: '\uC774 \uC0AC\uB78C... \uB098 \uC5B4\uB5BB\uAC8C \uC0DD\uAC01\uD574?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uC124\uB808\uB294 \uD1A4. \uB85C\uB9E8\uD2F1.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC560\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC88B\uC544\uD558\uB294 \uD0C0\uC785', tone: '\uAD6C\uCCB4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801. \uBA85\uD655\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uB04C\uB9AC\uB294 \uC0AC\uB78C\uC758 \uD2B9\uC9D5.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uD0C0\uC785', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uAC70\uBD80\uAC10 \uB290\uB07C\uB294 \uC0AC\uB78C\uC758 \uD2B9\uC9D5.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC6B0\uB9AC \uC0AC\uC774\uC758 \uB04C\uB9BC', tone: '\uC124\uB808\uB294 \uD1A4. \uD655\uC2E0.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uC0AC\uC774\uC5D0 \uD750\uB974\uB294 \uC5D0\uB108\uC9C0.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uD1B5\uD558\uB294 \uC811\uADFC\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uC790\uC2E0\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uB2E4\uAC00\uAC08 \uB54C.' },
      { h: '\uC5ED\uD6A8\uACFC \uB098\uB294 \uD589\uB3D9', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uD558\uBA74 \uC548 \uB418\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uC0AC\uADC0\uB824\uBA74', tone: '\uD604\uC2E4\uC801\uC774\uACE0 \uC804\uB7B5\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uC0AC\uADC0\uAE30 \uC704\uD55C \uC804\uB7B5.' },
      { h: '\uC0AC\uADC0\uBA74 \uC5B4\uB5A4 \uCEE4\uD50C\uC774 \uB418\uB294\uC9C0', tone: '\uB530\uB73B\uD55C \uC0C1\uC0C1. \uAE30\uB300\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uB9CC\uB4E4\uC5B4\uAC08 \uCEE4\uD50C\uC0C1.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  lover: {
    title: '\uC5F0\uC778',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uCABD \uAC00\uB3C4 \uB420\uAE4C?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uB530\uB73B\uD558\uACE0 \uB85C\uB9E8\uD2F1.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC560\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uACF5\uAC10\uD558\uB294 \uD1A4. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC778\uC5D0\uAC8C \uAE30\uB300\uD558\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBBFC\uAC10\uD55C \uBD80\uBD84', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC5F0\uC778\uC5D0\uAC8C\uC11C \uC608\uBBFC\uD574\uC9C0\uB294 \uC9C0\uC810.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uC798 \uB9DE\uB294 \uC9C0\uC810.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC2F8\uC6E0\uC744 \uB54C \uD654\uD574\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uD654\uD574\uD560 \uB54C \uBC29\uBC95.' },
      { h: '\uC6B0\uB9AC\uC5D0\uAC8C \uB9DE\uB294 \uC18C\uD1B5\uBC95', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC5D0\uAC8C \uB9DE\uB294 \uB300\uD654 \uBC29\uC2DD.' },
      { h: '\uACB0\uD63C\uD558\uBA74 \uC5B4\uB5A4 \uBD80\uBD80\uAC00 \uB418\uB294\uC9C0', tone: '\uD604\uC2E4\uC801\uC774\uACE0 \uC804\uB7B5\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uB9CC\uB4E4\uC5B4\uAC08 \uBD80\uBD80\uC0C1.' },
      { h: '\uACB0\uD63C\uAE4C\uC9C0 \uAC00\uB824\uBA74', tone: '\uB530\uB73B\uD55C \uC0C1\uC0C1. \uAE30\uB300\uAC10.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uACB0\uD63C\uAE4C\uC9C0 \uAC00\uAE30 \uC704\uD574 \uB458\uC774 \uD574\uC57C \uD560 \uAC83.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  colleague: {
    title: '\uC9C1\uC7A5 \uB3D9\uB8CC',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uC5B4\uB5BB\uAC8C \uC77C\uD574\uC57C \uD560\uAE4C',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5C5\uBB34 \uC2A4\uD0C0\uC77C', tone: '\uAD00\uCC30\uC790 \uD1A4. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC120\uD638\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uCF54\uCE6D \uD1A4. \uC2E4\uC6A9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC88B\uC544\uD558\uB294 \uBC29\uC2DD.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uC77C\uD560 \uB54C \uC2EB\uC5B4\uD558\uB294 \uBC29\uC2DD.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uB3D9\uB8CC\uB85C\uC11C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uC2DC\uB108\uC9C0', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC77C\uD560 \uB54C \uB098\uB294 \uD798.' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uD611\uC5C5 \uC2DC \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uB300\uD654\uD560 \uB54C \uD301', tone: '\uC2E4\uC6A9\uC801 \uCF54\uCE6D. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uB9D0 \uAC78 \uB54C.' },
      { h: '\uC774 \uC0AC\uB78C\uC5D0\uAC8C \uC778\uC815\uBC1B\uB294 \uBC95', tone: '\uCC28\uBD84\uD558\uACE0 \uAC1D\uAD00\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC5D0\uAC8C \uC778\uC815\uBC1B\uC73C\uB824\uBA74.' },
      { h: '\uD2B8\uB7EC\uBE14 \uB0AC\uC744 \uB54C \uB300\uCC98\uBC95', tone: '\uCC28\uBD84\uD558\uACE0 \uAC1D\uAD00\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uBD80\uB52A\uD614\uC744 \uB54C.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uD070 \uADF8\uB9BC. \uD76C\uB9DD\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC131\uC7A5\uD558\uAE30 \uC704\uD574.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  },
  friend: {
    title: '\uCE5C\uAD6C',
    subtitle: '\uC6B0\uB9AC \uC9C4\uC9DC \uCE5C\uD55C \uAC70 \uB9DE\uC9C0?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uD65C\uC6A9.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. A\uC5D0\uAC8C B\uB97C \uC124\uBA85\uD574\uC8FC\uB294 \uC2DC\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC6B0\uC815 \uC2A4\uD0C0\uC77C', tone: '\uB530\uB73B\uD55C \uAD00\uCC30. \uB2F4\uBC31\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC640 \uC9C0\uB0BC \uB54C \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uACF5\uAC10\uD558\uB294 \uD1A4. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC5D0\uAC8C \uAE30\uB300\uD558\uB294 \uAC83.' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uC11C\uC6B4\uD574\uD558\uB294 \uAC83', tone: '\uAC71\uC815\uD574\uC8FC\uB294 \uD1A4. \uC9C1\uC124\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uCE5C\uAD6C\uC5D0\uAC8C\uC11C \uC11C\uC6B4\uD574\uC9C0\uB294 \uC9C0\uC810.' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD638\uAE30\uC2EC \uC790\uADF9\uD558\uB294 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B \u2192 A \uC2DC\uC810. B\uAC00 A\uB97C \uCE5C\uAD6C\uB85C\uC11C \uC5B4\uB5BB\uAC8C \uB290\uB07C\uB294\uC9C0.' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '\uC790\uC2E0\uAC10 \uBD88\uC5B4\uB123\uAE30. \uD655\uC2E0 \uD1A4.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uC798 \uB9DE\uB294 \uC9C0\uC810.' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC194\uC9C1\uD558\uACE0 \uC9C1\uC124\uC801. \uB530\uB73B\uD55C \uC870\uC5B8.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458 \uB2E4 \uC870\uC728\uD560 \uC9C0\uC810.' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uAC10\uC815 \uD45C\uD604 \uBC29\uC2DD', tone: '\uAC10\uC131\uC801 \uAD00\uCC30. \uB530\uB73B\uD558\uAC8C.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'B\uC5D0 \uB300\uD574. B\uAC00 \uAC10\uC815\uC744 \uB4DC\uB7EC\uB0B4\uB294 \uBC29\uC2DD.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uD558\uBA74 \uC798 \uB418\uB294 \uAC83', tone: '\uB530\uB73B\uD55C \uCF54\uCE6D.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8\uD560 \uB54C \uC2DC\uB108\uC9C0 \uB098\uB294 \uC601\uC5ED.' },
      { h: '\uBA40\uC5B4\uC84C\uC744 \uB54C \uD68C\uBCF5\uBC95', tone: '\uB530\uB73B\uD55C \uCF54\uCE6D.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2192 B \uBC29\uD5A5. A\uAC00 B\uC640 \uBA40\uC5B4\uC84C\uC744 \uB54C \uB2E4\uC2DC \uAC00\uAE4C\uC6CC\uC9C0\uB824\uBA74.' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uD070 \uADF8\uB9BC. \uD76C\uB9DD\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uB458\uC774 \uD568\uAED8 \uC131\uC7A5\uD558\uAE30 \uC704\uD574.' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uAC00\uC7A5 \uC2DC\uC801. \uC5EC\uC6B4 \uB0A8\uAC8C. \uAC10\uB3D9\uC801.', anchor: '\uD574\uB2F9 \uC18C\uC8FC\uC81C \uD328\uD134 \uC139\uC158\uC5D0\uC11C 4\uAC1C \uC120\uD0DD', speaker: 'A \u2194 B \uC591\uBC29\uD5A5. \uC774 \uAD81\uD569\uC758 \uBCF8\uC9C8 \uD55C \uC904.' }
    ]
  }
};
  window.GH_REL_CONFIG = GH_REL_CONFIG;

  var GH_SUB_TONE = {
  ssom: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 연애 스타일': '설레는 톤. 로맨틱.',
    '이 사람이 좋아하는 타입': '구체적이고 실용적. 명확하게.',
    '이 사람이 싫어하는 타입': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '우리 사이의 끌림': '설레는 톤. 확신.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '통하는 접근법': '실용적 코칭. 자신감.',
    '역효과 나는 행동': '걱정해주는 톤. 직설적.',
    '이 사람과 사귀려면': '현실적이고 전략적.',
    '사귀면 어떤 커플이 되는지': '따뜻한 상상. 기대감.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  lover: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 연애 스타일': '따뜻하고 로맨틱.',
    '이 사람이 연인에게 바라는 것': '공감하는 톤. 따뜻하게.',
    '이 사람이 연인에게 민감한 부분': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '잘 맞는 부분': '자신감 불어넣기. 확신 톤.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '싸웠을 때 화해법': '실용적 코칭. 따뜻하게.',
    '우리에게 맞는 소통법': '실용적 코칭. 따뜻하게.',
    '결혼하면 어떤 부부가 되는지': '현실적이고 전략적.',
    '결혼까지 가려면': '따뜻한 상상. 기대감.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  colleague: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 업무 스타일': '관찰자 톤. 담백하게.',
    '이 사람이 선호하는 업무 방식': '코칭 톤. 실용적.',
    '이 사람이 싫어하는 업무 방식': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '같이 일할 때 시너지': '자신감 불어넣기. 확신 톤.',
    '같이 일할 때 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '이 사람과 대화할 때 팁': '실용적 코칭. 담백하게.',
    '이 사람에게 인정받는 법': '차분하고 객관적.',
    '트러블 났을 때 대처법': '차분하고 객관적.',
    '이 사람과 같이 성장하려면': '큰 그림. 희망적.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  },
  friend: {
    '이 사람의 성격': '시적이고 감성적. 물상 비유 활용.',
    '이 사람의 우정 스타일': '따뜻한 관찰. 담백하게.',
    '이 사람이 친구에게 바라는 것': '공감하는 톤. 따뜻하게.',
    '이 사람이 친구에게 서운해하는 것': '걱정해주는 톤. 직설적.',
    '상대 눈에 비친 나': '호기심 자극하는 톤.',
    '잘 맞는 부분': '자신감 불어넣기. 확신 톤.',
    '서로 맞춰가야 할 부분': '솔직하고 직설적. 따뜻한 조언.',
    '이 사람의 감정 표현 방식': '감성적 관찰. 따뜻하게.',
    '이 사람과 같이 하면 잘 되는 것': '따뜻한 코칭.',
    '멀어졌을 때 회복법': '따뜻한 코칭.',
    '이 사람과 같이 성장하려면': '큰 그림. 희망적.',
    '한 줄 요약': '가장 시적. 여운 남게. 감동적.'
  }
};
  window.GH_SUB_TONE = GH_SUB_TONE;

  // ── getGHSystemPrompt (lib/gunghap-prompt.js와 동일 로직) ──
  window.getGHSystemPrompt = function(rel) {
    var base = GUNGHAP_SYSTEM_V2;
    var cfg = GH_REL_CONFIG[rel];
    if (!cfg) return base;
    var cat = (typeof GH_CATEGORIES !== 'undefined') ? GH_CATEGORIES[rel] : null;
    var label = cat ? cat.label : (cfg.title || rel);
    if (cfg.subs && cfg.subs.length > 0) {
      var catNames = (cat && cat.categories) || ['전체'];
      var ranges = (typeof GH_CAT_RANGES !== 'undefined' && GH_CAT_RANGES[rel]) ? GH_CAT_RANGES[rel] : [cfg.subs.length];
      var section = '\n## 관계: ' + label + '\n부제: ' + (cfg.subtitle || '') + '\n\n## categories (' + catNames.length + '개 고정, ' + cfg.subs.length + '개 subs)\n\n';
      var idx = 0;
      for (var c = 0; c < catNames.length; c++) {
        var subNames = [];
        for (var s = 0; s < (ranges[c] || 0); s++) {
          if (idx < cfg.subs.length) { subNames.push(cfg.subs[idx].h); idx++; }
        }
        section += (c + 1) + '. ' + catNames[c] + ': ' + subNames.join(' / ') + '\n';
      }
      var toneMap = GH_SUB_TONE[rel] || {};
      section += '\n## 소주제별 톤 가이드\n';
      for (var ti = 0; ti < cfg.subs.length; ti++) {
        var subH = cfg.subs[ti].h;
        var subTone = toneMap[subH] || '담백한 톤.';
        section += (ti + 1) + '. ' + subH + ' — 톤: "' + subTone + '"\n';
        section += '   앵커: 해당 소주제 패턴 섹션에서 4개 선택\n';
      }
      section += '\n★ 각 카테고리 안에 subs 배열, 각 sub는 {"h":"소제목","b":"본문"} 객체. 카테고리를 통째로 하나의 글로 쓰면 불합격.\n';
      section += '반드시 위 카테고리와 소주제 전부를 빠짐없이 순서대로 작성하세요.\n';
      section += 'h는 위에 정의된 소주제명을 정확히 그대로 사용하세요.\n';
      return base + section;
    }
    return base;
  };

  console.log('[gunghap] V2 시스템 프롬프트 + 관계별 앵커 로드 완료');

  // startGunghap 래핑 (수동 입력)
  var _origSG=window.startGunghap;
  window.startGunghap=async function(){if(!GH_REL||!GH_CATEGORIES[GH_REL])return _origSG();var apiKey=getApiKey();if(!apiKey){apiKey=await promptApiKey();if(!apiKey)return;}var bY=+document.getElementById('gh-y').value,bM=+document.getElementById('gh-m').value,bD=+document.getElementById('gh-d').value;var bH=document.getElementById('gh-h').value?+document.getElementById('gh-h').value:null,bMin=document.getElementById('gh-min').value?+document.getElementById('gh-min').value:null;var sajuB=calcSajuForApp(bY,bM,bD,bH,bMin,null),ggB=analyzeGyeokguk(sajuB);var gB=GH_GENDER==='남성'?'남':'여',dwB=calcDaewoon(sajuB,bY,bM,bD,bH||12,bMin||0,gB);var tiB=TY[GH_MBTI_SEL]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};var mbtiB={type:GH_MBTI_SEL,cf:tiB.cf,axes:[{side:GH_MBTI_SEL[0],pct:60},{side:GH_MBTI_SEL[1],pct:60},{side:GH_MBTI_SEL[2],pct:60},{side:GH_MBTI_SEL[3],pct:60}],profile:''};var sajuA=window._lastSaju,dwA=window._lastDW,ggA=window._lastGG,mbtiA=window._lastMBTIObj;if(!sajuA){alert('먼저 내 사주를 분석해주세요!');goPage('birth');return;}var ghR=analyzeGunghap(sajuA,sajuB,dwA,dwB,ggA,ggB,mbtiA,mbtiB);var w=GH_CATEGORIES[GH_REL].scoreWeights;ghR.scores.total=Math.round(ghR.scores.love*w.love+ghR.scores.comm*w.comm+ghR.scores.values*w.values+ghR.scores.work*w.work);goPage('gh-load');var cat=GH_CATEGORIES[GH_REL];var msgs=['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...',cat.emoji+' '+cat.label+' 궁합...',cat.categories[0]+' 분석...',cat.categories[1]+' 분석...',cat.categories[2]+' 분석...','인지기능 궁합 탐색...','이야기를 쓰는 중...'];var p=0,iv=setInterval(function(){p+=Math.random()*1.5+0.4;if(p>95)p=95;document.getElementById('gh-load-bar').style.width=p+'%';document.getElementById('gh-load-pct').textContent=Math.round(p)+'%';document.getElementById('gh-load-msg').textContent=msgs[Math.min(Math.floor(p/12),7)];},900);var up=buildGunghapUserPrompt(ghR,sajuA,sajuB,dwA,dwB,ggA,ggB,mbtiA,mbtiB);var ghCfg=GH_REL_CONFIG[GH_REL];up+='\n### 관계: '+cat.label+'\n';if(ghCfg&&ghCfg.subs&&ghCfg.subs.length>0){up+='부제: '+(ghCfg.subtitle||'')+'\n\n';for(var _si=0;_si<ghCfg.subs.length;_si++){up+=(_si+1)+'. '+ghCfg.subs[_si].h+' (톤: '+ghCfg.subs[_si].tone+')\n';}}else if(ghCfg&&ghCfg.categories&&ghCfg.categories[0]&&ghCfg.categories[0].subs){up+='부제: '+(ghCfg.subtitle||'')+'\n\n';var sc=0;ghCfg.categories.forEach(function(gc){up+='【'+gc.name+'】\n';gc.subs.forEach(function(s){sc++;up+=sc+'. '+s.h+' (톤: '+s.tone+')\n';});up+='\n';});}else{up+='카테고리:\n';cat.categories.forEach(function(c,i){up+=(i+1)+'. '+c+'\n';});if(cat.tone)up+='\n톤: '+cat.tone+'\n';}var sp=getGHSystemPrompt(GH_REL),ai=null,ae='';var ghSubTitles=[];var ghCfg2=GH_REL_CONFIG[GH_REL];if(ghCfg2&&ghCfg2.subs){ghCfg2.subs.forEach(function(s){ghSubTitles.push(s.h);});}else if(ghCfg2&&ghCfg2.categories){ghCfg2.categories.forEach(function(c){(c.subs||[]).forEach(function(s){ghSubTitles.push(s.h);});});}var _ghProgQueue=[],_ghProgInitDone=false,_ghCollectedSubs=[];try{var at=await streamSonnet(apiKey,sp,up,cat.emoji+' 궁합',{subTitles:ghSubTitles,onMessage:function(m){if(!_ghProgInitDone){var el=document.getElementById('gh-load-msg');if(el)el.textContent=m;}},onProgress:function(pct){if(!_ghProgInitDone){var b=document.getElementById('gh-load-bar');if(b)b.style.width=Math.min(pct,100)+'%';}},onPercent:function(pct){if(!_ghProgInitDone){var pe=document.getElementById('gh-load-pct');if(pe)pe.textContent=Math.round(pct)+'%';}},onBlueprint:function(){},onSub:function(subObj,idx){console.log('[GH-STREAM] sub #'+(idx+1)+': '+subObj.h);_ghProgQueue.push({sub:subObj,idx:idx});_ghCollectedSubs.push(subObj);if(_ghProgQueue.length===1&&!_ghProgInitDone){_ghProgInitDone=true;clearInterval(iv);if(typeof initGhProgressivePage==='function')initGhProgressivePage(ghR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,GH_REL);setTimeout(function(){appendGhSubCard(_ghProgQueue[0].sub,0,GH_REL);},200);}if(_ghProgInitDone&&_ghProgQueue.length>1){appendGhSubCard(subObj,idx,GH_REL);}}},'/api/gunghap-analyze');try{ai=JSON.parse(at);}catch(e){var fb=at.indexOf('{'),lb=at.lastIndexOf('}');if(fb>=0&&lb>fb)try{ai=JSON.parse(at.substring(fb,lb+1));}catch(e2){}if(!ai){var ln=at.split('\n'),si=-1,ei=-1;for(var li=0;li<ln.length;li++){if(si<0&&ln[li].trim().charAt(0)==='{')si=li;if(ln[li].trim().charAt(0)==='}'||ln[li].trim().slice(-1)==='}')ei=li;}if(si>=0&&ei>=si)try{ai=JSON.parse(ln.slice(si,ei+1).join('\n'));}catch(e3){}}if(!ai){var sn=at.substring(fb>=0?fb:0,(lb>0?lb+1:at.length));sn=sn.replace(/[\x00-\x1F\x7F]/g,function(c){return c==='\n'||c==='\r'||c==='\t'?c:'';});try{ai=JSON.parse(sn);}catch(e4){}}if(ai)ae='';else ae='JSON_PARSE';}}catch(e){ae=e.message||'UNKNOWN';}if(ai)ai=postValidateGH(ai,ghR,dwA,dwB);clearInterval(iv);document.getElementById('gh-load-bar').style.width='100%';document.getElementById('gh-load-pct').textContent='100%';setTimeout(function(){if(_ghProgInitDone){if(typeof finalizeGhProgressivePage==='function')finalizeGhProgressivePage(ai,ghR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,GH_REL,_ghCollectedSubs);}else{renderGunghapResultV2(ghR,ai,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,ae,GH_REL);goPage('gh-res');}},600);try{addPerson({id:genId(),name:sajuB.P[2].s+sajuB.P[2].b+' · '+GH_MBTI_SEL,ilju:sajuB.P[2].s+sajuB.P[2].b,mbti:GH_MBTI_SEL,gender:GH_GENDER,birthInfo:{y:bY,m:bM,d:bD,h:bH||'',min:bMin||''},hasFull:false,saju:sajuB,dw:dwB,gg:ggB,mbtiObj:mbtiB,savedAt:Date.now()});}catch(e){}};

  // 결과 렌더 V2
  window.renderGunghapResultV2=function(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,err,relType){if(!relType||!GH_CATEGORIES[relType])return renderGunghapResult(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,err);var cat=GH_CATEGORIES[relType],sl=cat.scoreLabels,el=document.getElementById('ghResContent'),sc=ghR.scores;var title=aiR&&aiR.title?aiR.title:(sajuA.P[2].s+sajuA.P[2].b+'×'+sajuB.P[2].s+sajuB.P[2].b+' · '+mbtiA.type+'×'+mbtiB.type);var quote=aiR&&aiR.quote?aiR.quote:'두 사람만의 특별한 이야기';var h='<div class="res-wrap" style="max-width:640px;margin:0 auto;padding:0 0 40px">';h+=(typeof _buildGhHeader==='function')?_buildGhHeader(sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,relType,sc):'';h+='<div class="glass-card" style="margin:12px 20px;padding:16px 20px;border-left:4px solid var(--accent);font-size:14px;color:var(--text-secondary);line-height:1.6;font-style:italic">"'+quote+'"</div>';if(aiR&&aiR.categories){aiR.categories.forEach(function(c){var catName=c.n||c.title||'';h+='<div style="margin:16px 20px 0"><h3 style="font-size:16px;font-weight:700;margin-bottom:10px;color:var(--text-primary)">'+catName+'</h3>';var subs=c.subs||c.items||[];subs.forEach(function(sub){var subH=sub.h||sub.catch||'';var subB=sub.b||(sub.content?(sub.content+(sub.insightText?('\n\n'+(sub.insightIcon||'💊')+' '+sub.insightText):'')):'');var bodyHtml=(typeof renderSubBody==='function')?renderSubBody(subB):subB.replace(/\n\n/g,'<br><br>');h+='<div class="glass-card" style="padding:20px;margin-bottom:10px"><div class="r-sub-h">'+subH+'</div><div class="r-sub-b">'+bodyHtml+'</div></div>';});h+='</div>';});}else if(err){h+='<div class="glass-card" style="margin:20px;padding:24px;text-align:center"><p style="color:var(--text-muted)">AI 풀이 생성 실패</p><p style="font-size:12px;margin-top:8px">'+err+'</p></div>';}h+='<div style="margin:24px 16px 20px;text-align:center"><button onclick="if(window.MBTS_Chat&&window._ghChatData)MBTS_Chat.openFromGunghap(window._ghChatData.person,window._ghChatData.relType,window._ghChatData.ghResult)" style="width:100%;padding:16px;font-size:15px;font-weight:700;color:#fff;background:linear-gradient(135deg,#8B6CC1,#6B4FA0);border:none;border-radius:14px;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgba(139,108,193,0.25)">🐰 달토한테 이 궁합 더 물어보기</button></div>';h+='<div style="padding:20px"><button onclick="shareResult()" style="width:100%;padding:14px;font-size:14px;font-weight:700;color:#191919;background:#FEE500;border:none;border-radius:14px;margin-bottom:10px">💬 공유하기</button><p style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-muted)">참고용 분석이며 의사결정을 대체하지 않습니다.</p></div></div>';window._ghChatData={person:{name:sajuB.P[2].s+sajuB.P[2].b+' \xb7 '+mbtiB.type,saju:sajuB,mbtiObj:mbtiB,gg:ggB,ilju:sajuB.P[2].s+sajuB.P[2].b,mbti:mbtiB.type},relType:relType,ghResult:ghR};el.innerHTML=h;};


  // ══════════════════════════════════════════════════
  // ★ aiResult 저장 시스템 — engine.js 안 건드림
  // ══════════════════════════════════════════════════

  // engine.js의 runSajuAnalysis가 onComplete 콜백을 호출할 때
  // result를 가로채서 저장하는 래퍼
  (function() {
    var _origRunSaju = window.runSajuAnalysis;
    if (!_origRunSaju) {
      console.warn('[gunghap] runSajuAnalysis not found yet, will retry');
      return;
    }

    window.runSajuAnalysis = function(params, callbacks) {
      // 원본 onComplete를 래핑
      var _origOnComplete = callbacks.onComplete;
      callbacks.onComplete = function(data) {
        // ★ AI 풀이 결과를 전역에 저장
        if (data && data.result) {
          window._lastAIResult = data.result;
          console.log('[gunghap] AI 풀이 결과 저장 완료 (categories:',
            (data.result.categories || []).reduce(function(s, c) {
              return s + (c.subs || c.items || []).length;
            }, 0), '개)');
        }

        // 원본 콜백 호출
        if (_origOnComplete) _origOnComplete(data);

        // ★ people 목록에도 aiResult 추가 저장
        try {
          if (data && data.result && window._lastSaju) {
            var people = MBTS_People.get();
            for (var i = 0; i < people.length; i++) {
              if (people[i].id === 'me') {
                people[i].aiResult = data.result;
                MBTS_People.save(people);
                console.log('[gunghap] people "me"에 aiResult 저장 완료');
                break;
              }
            }
          }
        } catch (e) {
          console.warn('[gunghap] aiResult people 저장 실패:', e);
        }
      };

      return _origRunSaju.call(this, params, callbacks);
    };
  })();


  // ══════════════════════════════════════════════════
  // ★ postValidateGH — 궁합 전용 후처리 (대운/점수/세운 교정)
  // ══════════════════════════════════════════════════
  function postValidateGH(aiResult, ghResult, dwA, dwB) {
    if (!aiResult || !aiResult.categories) return aiResult;
    var fixCount = 0;

    var dwRangesA = dwA && dwA.daewoons ? dwA.daewoons.map(function(d) {
      return { start: d.startAge, end: d.endAge, text: d.startAge + '~' + d.endAge + '세' };
    }) : [];
    var dwRangesB = dwB && dwB.daewoons ? dwB.daewoons.map(function(d) {
      return { start: d.startAge, end: d.endAge, text: d.startAge + '~' + d.endAge + '세' };
    }) : [];
    var allRanges = dwRangesA.concat(dwRangesB);

    aiResult.categories.forEach(function(cat) {
      var subs = cat.subs || cat.items || [];
      subs.forEach(function(item) {
        var txt = item.b || item.content || '';

        // ① 대운 나이 범위 교정 (A+B 양쪽)
        txt = txt.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
          var start = parseInt(s), end = parseInt(e), span = end - start;
          if (span >= 8 && span <= 11) {
            var found = allRanges.some(function(r) { return r.start === start && r.end === end; });
            if (!found) {
              var closest = null, minDiff = 999;
              allRanges.forEach(function(r) {
                var diff = Math.abs(r.start - start);
                if (diff < minDiff) { minDiff = diff; closest = r; }
              });
              if (closest && minDiff <= 5) {
                fixCount++;
                console.log('[PostValidateGH] 대운 나이 교정:', match, '→', closest.text);
                return closest.text;
              }
            }
          }
          return match;
        });

        // ② totalScore 교정
        if (ghResult && ghResult.scores) {
          var scoreRe = /총[합점]?\s*:?\s*(\d+)/g;
          txt = txt.replace(scoreRe, function(match, num) {
            var aiScore = parseInt(num);
            if (aiScore !== ghResult.scores.total && Math.abs(aiScore - ghResult.scores.total) >= 3) {
              fixCount++;
              console.log('[PostValidateGH] 점수 교정:', aiScore, '→', ghResult.scores.total);
              return match.replace(num, String(ghResult.scores.total));
            }
            return match;
          });
        }

        // ③ 세운 연도-간지 불일치 교정 (A+B 양쪽)
        var allSeun = [];
        if (dwA && dwA.seun) allSeun = allSeun.concat(dwA.seun);
        if (dwB && dwB.seun) allSeun = allSeun.concat(dwB.seun);
        allSeun.forEach(function(se) {
          var wrongPattern = new RegExp(se.y + '년[^가-힣]*(갑|을|병|정|무|기|경|신|임|계)(자|축|인|묘|진|사|오|미|신|유|술|해)', 'g');
          txt = txt.replace(wrongPattern, function(match, g, j) {
            if (g !== se.gan || j !== se.ji) {
              fixCount++;
              console.log('[PostValidateGH] 세운 교정:', match, '→', se.y + '년 ' + se.gan + se.ji);
              return se.y + '년 ' + se.gan + se.ji;
            }
            return match;
          });
        });

        // 구버전 호환: insightText도 교정
        if (item.insightText) {
          item.insightText = item.insightText.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
            var start = parseInt(s), end = parseInt(e), span = end - start;
            if (span >= 8 && span <= 11) {
              var found = allRanges.some(function(r) { return r.start === start && r.end === end; });
              if (!found) {
                var closest = null, minDiff = 999;
                allRanges.forEach(function(r) {
                  var diff = Math.abs(r.start - start);
                  if (diff < minDiff) { minDiff = diff; closest = r; }
                });
                if (closest && minDiff <= 5) { fixCount++; return closest.text; }
              }
            }
            return match;
          });
        }
        // ④ 괄호 스트리핑 — (57%), (음 6, 양 2) 등 수치 표현 제거
        txt = txt.replace(/\s*\([^)]*\)/g, '');
        if (item.insightText) {
          item.insightText = item.insightText.replace(/\s*\([^)]*\)/g, '');
        }

        // 새 구조(b)와 구 구조(content) 모두 교정 결과 반영
        if (item.b) item.b = txt;
        else item.content = txt;
      });
    });

    if (fixCount > 0) console.log('[PostValidateGH] 총 ' + fixCount + '건 교정 완료');
    return aiResult;
  }

  // ╔══════════════════════════════════════╗
  // ║  PART D: 이벤트 훅                    ║
  // ╚══════════════════════════════════════╝
  var _origRR=window.renderResult;if(typeof _origRR==='function'){window.renderResult=function(){_origRR.apply(this,arguments);setTimeout(saveMyData,500);};}
  var _origIGP=window.initGHPage;window.initGHPage=function(){if(typeof _origIGP==='function')_origIGP();GH_REL='';setTimeout(injectRelationUI,50);};
  var _origGP=window.goPage;if(typeof _origGP==='function'){window.goPage=function(pg){_origGP(pg);if(pg==='gh-input')setTimeout(injectRelationUI,100);};}
  var _origSHT=window.switchHomeTab;if(typeof _origSHT==='function'){window.switchHomeTab=function(tab){_origSHT(tab);if(tab==='saju')setTimeout(function(){injectPeopleListUI();renderPeopleList();},100);if(tab==='gunghap')setTimeout(function(){injectGHSelectorUI();renderGHSelector();GH_SEL_A=null;GH_SEL_B=null;GP_REL='';},100);};}
  setTimeout(function(){if(window._lastSaju&&window._lastMBTI)saveMyData();injectPeopleListUI();renderPeopleList();},800);

  // parseGhNewSubs 제거됨 — onSub 콜백 방식으로 전환 완료

  console.log('[gunghap.js] v3.0 로드 완료 — V2 시스템프롬프트 + 18레이어 상세전달 + aiResult 연동 + saju.js 5개 연동');
})();
