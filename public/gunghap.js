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
    var cfA=mbtiObjA.cf.split('-'), cfB=mbtiObjB.cf.split('-');
    var m1=getCFC(cfA[0],cfB[0]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[0],t:'주기능',s:m1.s,d:m1.d});
    var m2=getCFC(cfA[0],cfB[1]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[1],t:'A주↔B부',s:m2.s,d:m2.d});
    var m3=getCFC(cfB[0],cfA[1]); R.details.mbti.push({pair:cfB[0]+'↔'+cfA[1],t:'B주↔A부',s:m3.s,d:m3.d});
    var axN=['EI','SN','TF','JP'];
    for(var xi=0;xi<4;xi++){
      var aAx=mbtiObjA.axes[xi],aBx=mbtiObjB.axes[xi],same=(aAx.side===aBx.side);
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
    if(typeof getNapeumOh==='function'){try{var napA=getNapeumOh(rA.dg,rA.dj),napB=getNapeumOh(rB.dg,rB.dj);if(napA&&napB){var SM={'목':'화','화':'토','토':'금','금':'수','수':'목'},GM={'목':'토','토':'수','수':'화','화':'금','금':'목'};var nr='';if(napA===napB)nr='비화';else if(SM[napA]===napB||SM[napB]===napA)nr='상생';else if(GM[napA]===napB||GM[napB]===napA)nr='상극';else nr='무관';R.details.napeum={A:napA,B:napB,rel:nr};R.keywords.push('납음: '+napA+'↔'+napB+' → '+nr);}}catch(e){}}

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
    R.details.starsCross={dowhaSal:{A:dhA,B:dhB,both:dhA&&dhB},hwagaeSal:{A:hgA,B:hgB,both:hgA&&hgB},yeokma:{A:ymA,B:ymB,both:ymA&&ymB},chuneul:{A:ceA,B:ceB,both:ceA&&ceB}};
    if(dhA&&dhB)R.keywords.push('★도화살 교차: 강렬한 매력');if(hgA&&hgB)R.keywords.push('★화개살 교차: 영적 교감');if(ymA&&ymB)R.keywords.push('역마살 교차');if(ceA&&ceB)R.keywords.push('★천을귀인 교차: 서로가 귀인');

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

    // ── 육친 교차 분석 (saju.js 연동) ──
    if (window.SJ_YUKCHIN_MAP) {
      var gKeyA = (genderA === '여성' || genderA === '여') ? '여' : '남';
      var gKeyB = (genderB === '여성' || genderB === '여') ? '여' : '남';
      var mapA = window.SJ_YUKCHIN_MAP[gKeyA];
      var mapB = window.SJ_YUKCHIN_MAP[gKeyB];
      var bSipsungByA = getSipsung(rA.dg, rB.dg);
      var aSipsungByB = getSipsung(rB.dg, rA.dg);
      var yukchinA = mapA ? (mapA[bSipsungByA] || '') : '';
      var yukchinB = mapB ? (mapB[aSipsungByB] || '') : '';
      if (yukchinA || yukchinB) {
        R.yukchinCross = { aToB: bSipsungByA + '(' + yukchinA + ')', bToA: aSipsungByB + '(' + yukchinB + ')' };
      }
      var bonusYukchin = 0;
      if (gKeyA === '남' && bSipsungByA === '정재') bonusYukchin += 3;
      if (gKeyA === '남' && bSipsungByA === '편재') bonusYukchin += 1;
      if (gKeyA === '여' && bSipsungByA === '정관') bonusYukchin += 3;
      if (gKeyA === '여' && bSipsungByA === '편관') bonusYukchin += 1;
      if (gKeyB === '남' && aSipsungByB === '정재') bonusYukchin += 3;
      if (gKeyB === '남' && aSipsungByB === '편재') bonusYukchin += 1;
      if (gKeyB === '여' && aSipsungByB === '정관') bonusYukchin += 3;
      if (gKeyB === '여' && aSipsungByB === '편관') bonusYukchin += 1;
      if (gKeyA === '여' && bSipsungByA === '상관') bonusYukchin -= 2;
      if (gKeyB === '여' && aSipsungByB === '상관') bonusYukchin -= 2;
      love += bonusYukchin;
      if (bonusYukchin !== 0) R.keywords.push('★육친: A→B=' + bSipsungByA + '(' + yukchinA + ') B→A=' + aSipsungByB + '(' + yukchinB + ')');
    }

    // ── 5신 교차 분석 (saju.js 연동) ──
    if (window.SJ_calcOsinChegye && window.SJ_extractYongshinOh) {
      var ohA5 = window.SJ_extractYongshinOh(ggA.yongshin);
      var ohB5 = window.SJ_extractYongshinOh(ggB.yongshin);
      var osinA = window.SJ_calcOsinChegye(ohA5);
      var osinB = window.SJ_calcOsinChegye(ohB5);
      if (osinA && osinB) {
        var bDmEl = sajuB.dmEl;
        var aDmEl = sajuA.dmEl;
        var bInAOsin = window.SJ_getOsinLabel(osinA, bDmEl);
        var aInBOsin = window.SJ_getOsinLabel(osinB, aDmEl);
        R.osinCross = { aToB: '상대(' + bDmEl + ')는 나에게 ' + bInAOsin, bToA: '나(' + aDmEl + ')는 상대에게 ' + aInBOsin };
        var osinBonus = 0;
        if (bInAOsin.indexOf('용신') >= 0) osinBonus += 5;
        if (bInAOsin.indexOf('희신') >= 0) osinBonus += 3;
        if (bInAOsin.indexOf('기신') >= 0) osinBonus -= 3;
        if (bInAOsin.indexOf('구신') >= 0) osinBonus -= 2;
        if (aInBOsin.indexOf('용신') >= 0) osinBonus += 5;
        if (aInBOsin.indexOf('희신') >= 0) osinBonus += 3;
        if (aInBOsin.indexOf('기신') >= 0) osinBonus -= 3;
        if (aInBOsin.indexOf('구신') >= 0) osinBonus -= 2;
        love += osinBonus;
        if (osinBonus !== 0) R.keywords.push('★5신: ' + R.osinCross.aToB + ' / ' + R.osinCross.bToA);
      }
    }

    // ── 납음 궁합 심화 (saju.js SJ_buildNapeumGunghap 연동) ──
    if (window.SJ_buildNapeumGunghap) {
      var napeumText = window.SJ_buildNapeumGunghap(sajuA, sajuB);
      if (napeumText) {
        R.napeumGunghap = napeumText;
        if (napeumText.indexOf('생') >= 0 && napeumText.indexOf('극') < 0) love += 2;
        else if (napeumText.indexOf('동오행') >= 0 || napeumText.indexOf('비화') >= 0) love += 1;
        else if (napeumText.indexOf('극') >= 0) love -= 1;
        R.keywords.push(napeumText.split('\n')[0]);
      }
    }

    // ── 부부 시너지 리포트 (saju.js 연동) ──
    if (window.SJ_buildCoupleSynergy) {
      var synergy = window.SJ_buildCoupleSynergy(sajuA, ggA, sajuB, ggB);
      if (synergy) {
        R.coupleSynergy = synergy;
      }
    }

    // ★ 최종 클램핑 (딱 1번!)
    love=Math.max(20,Math.min(95,love));comm=Math.max(20,Math.min(95,comm));val=Math.max(20,Math.min(95,val));work=Math.max(20,Math.min(95,work));
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

  // buildGunghapUserPrompt 래핑
  var _origBP=window.buildGunghapUserPrompt;
  window.buildGunghapUserPrompt=function(){var p=_origBP.apply(this,arguments);var gh=arguments[0];if(gh.details.sipsung){p+='\n### 십성\n- A→B:'+gh.details.sipsung.AtoB+' B→A:'+gh.details.sipsung.BtoA+'\n';var gc=gh.details.sipsung.genderContext||{};if(gc.A)p+='- A에게 B는:'+gc.A+'\n';if(gc.B)p+='- B에게 A는:'+gc.B+'\n';}if(gh.details.yongshin)p+='\n### 용신\n- '+gh.details.yongshin.grade+'\n';if(gh.details.ilju)p+='\n### 일주 통합\n- '+gh.details.ilju.combo+'\n';if(gh.details.strength)p+='\n### 강약\n- '+gh.details.strength.combo+':'+gh.details.strength.desc+'\n';if(gh.details.spouseGung){var sg=gh.details.spouseGung;p+='\n### 배우자궁\n- A→B:'+sg.A.toPartner+' B→A:'+sg.B.toPartner+' → '+sg.desc+'\n';}if(gh.details.timing){var tm=gh.details.timing;p+='\n### 5년 타이밍\n';tm.years.forEach(function(t){p+='- '+t.year+'년:'+t.grade+'\n';});p+='→ 최고:'+tm.bestYear.year+'년 조심:'+tm.worstYear.year+'년\n이 타이밍을 장기 전망에 반영하세요.\n';}if(gh.details.starsCross){var sc=gh.details.starsCross;if(sc.dowhaSal.both)p+='\n- ★도화살 교차\n';if(sc.hwagaeSal.both)p+='- ★화개살 교차\n';if(sc.chuneul.both)p+='- ★천을귀인 교차\n';}if(gh.yukchinCross){p+='\n### 육친 교차 분석\n- 나→상대: '+gh.yukchinCross.aToB+'\n- 상대→나: '+gh.yukchinCross.bToA+'\n';}if(gh.osinCross){p+='\n### 5신 교차 분석\n- '+gh.osinCross.aToB+'\n- '+gh.osinCross.bToA+'\n';}if(gh.napeumGunghap){p+='\n### 납음 궁합\n'+gh.napeumGunghap+'\n';}if(gh.coupleSynergy){p+='\n### 부부 시너지\n'+gh.coupleSynergy+'\n';}return p;};


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

  function saveMyData(){if(!window._lastSaju||!window._lastMBTI)return;var s=window._lastSaju;addPerson({id:'me',name:'나',ilju:s.P[2].s+s.P[2].b,mbti:window._lastMBTI,gender:(typeof ST!=='undefined')?ST.gender:'',birthInfo:(typeof ST!=='undefined')?{y:ST.y,m:ST.m,d:ST.d,h:ST.h||'',min:ST.min||''}:{},hasFull:true,saju:s,dw:window._lastDW,gg:window._lastGG,mbtiObj:window._lastMBTIObj,savedAt:Date.now()});renderPeopleList();}
  window.MBTS_People.saveMyData=saveMyData;

  function renderPeopleList(){var c=document.getElementById('people-list-container');if(!c)return;var pp=getPeople();if(pp.length===0){c.innerHTML='<p style="text-align:center;color:var(--text-muted);font-size:13px;padding:20px 0">아직 분석한 사람이 없어요</p>';return;}var h='';pp.forEach(function(p){var d=p.savedAt?new Date(p.savedAt).toLocaleDateString('ko-KR'):'';var badge=p.hasFull?'<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(76,175,125,.1);color:#4CAF7D;border-radius:6px">분석완료 ✨</span>':'<span style="padding:2px 8px;font-size:10px;font-weight:600;background:rgba(201,154,46,.1);color:#c99a2e;border-radius:6px">기본정보</span>';var isMe=p.id==='me';h+='<div class="glass-card" style="padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer" '+(isMe&&p.hasFull?'onclick="viewSavedResult()"':'')+'><div style="width:40px;height:40px;border-radius:12px;background:'+(isMe?'var(--accent-dim)':'rgba(214,51,132,.08)')+';display:flex;align-items:center;justify-content:center;font-size:20px">'+(isMe?'🙋':'👤')+'</div><div style="flex:1"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700;color:var(--text-primary)">'+(p.name||p.ilju)+'</span>'+badge+'</div><div style="font-size:12px;color:var(--text-muted);margin-top:2px">'+p.ilju+'일주 · '+p.mbti+(d?' · '+d:'')+'</div></div>'+(isMe?'<span style="font-size:16px;color:var(--text-muted)">›</span>':'<button onclick="event.stopPropagation();MBTS_People.del(\''+p.id+'\')" style="background:none;border:none;font-size:16px;color:var(--text-muted);cursor:pointer;padding:4px 8px">✕</button>')+'</div>';});c.innerHTML=h;}
  window.MBTS_People.del=function(id){if(confirm('삭제할까요?')){removePerson(id);renderPeopleList();renderGHSelector();}};

  function injectPeopleListUI(){var sc=document.getElementById('home-content-saju');if(!sc||document.getElementById('people-list-container'))return;var s=document.createElement('div');s.style.marginTop='20px';s.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><div style="font-size:13px;font-weight:700;color:var(--text-muted)">📋 분석한 사람 목록</div><button onclick="goPage(\'birth\')" style="background:none;border:1px solid var(--accent);color:var(--accent);font-size:11px;font-weight:600;padding:4px 10px;border-radius:8px;cursor:pointer">+ 새 사람 추가</button></div><div id="people-list-container"></div>';sc.appendChild(s);renderPeopleList();}

  // 궁합 탭 사람 선택
  var GH_SEL_A=null,GH_SEL_B=null,GP_REL='';
  function renderGHSelector(){var c=document.getElementById('gh-people-selector');if(!c)return;var pp=getPeople();if(pp.length<1){c.innerHTML='<div style="text-align:center;padding:16px"><p style="color:var(--text-muted);font-size:13px">먼저 사주 분석을 해주세요!</p><button onclick="switchHomeTab(\'saju\')" style="margin-top:12px;padding:10px 20px;font-size:13px;font-weight:700;color:#fff;background:var(--accent);border:none;border-radius:10px;cursor:pointer">🔮 사주 분석하기</button></div>';return;}var h='';h+='<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">👤 첫 번째 사람</label><div style="display:flex;flex-wrap:wrap;gap:6px">';pp.forEach(function(p){var iS=GH_SEL_A&&GH_SEL_A.id===p.id,iD=GH_SEL_B&&GH_SEL_B.id===p.id;h+='<button onclick="MBTS_People.selA(\''+p.id+'\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px solid '+(iS?'var(--accent)':'var(--border-light)')+';background:'+(iS?'rgba(136,97,154,0.08)':'#fff')+';color:'+(iS?'var(--accent)':(iD?'var(--border-light)':'var(--text-muted)'))+';cursor:'+(iD?'not-allowed':'pointer')+'">'+(p.id==='me'?'🙋 ':'👤 ')+(p.name||p.ilju)+'</button>';});h+='</div></div>';h+='<div style="margin-bottom:14px"><label style="font-size:12px;font-weight:700;color:#d63384;display:block;margin-bottom:6px">👤 두 번째 사람</label><div style="display:flex;flex-wrap:wrap;gap:6px">';pp.forEach(function(p){var iS=GH_SEL_B&&GH_SEL_B.id===p.id,iD=GH_SEL_A&&GH_SEL_A.id===p.id;h+='<button onclick="MBTS_People.selB(\''+p.id+'\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px solid '+(iS?'#d63384':'var(--border-light)')+';background:'+(iS?'rgba(214,51,132,0.08)':'#fff')+';color:'+(iS?'#d63384':(iD?'var(--border-light)':'var(--text-muted)'))+';cursor:'+(iD?'not-allowed':'pointer')+'">'+(p.id==='me'?'🙋 ':'👤 ')+(p.name||p.ilju)+'</button>';});h+='<button onclick="goPage(\'gh-input\')" style="padding:8px 14px;font-size:12px;font-weight:600;border-radius:10px;border:2px dashed var(--border-light);background:#fff;color:var(--text-muted);cursor:pointer">+ 새 사람</button>';h+='</div></div>';if(GH_SEL_A&&GH_SEL_B){h+='<div class="glass-card" style="padding:14px;margin-bottom:4px;background:rgba(136,97,154,0.03)"><div style="display:flex;align-items:center;justify-content:center;gap:12px"><div style="text-align:center"><div style="font-size:20px">'+(GH_SEL_A.id==='me'?'🙋':'👤')+'</div><div style="font-size:13px;font-weight:700">'+(GH_SEL_A.name||GH_SEL_A.ilju)+'</div><div style="font-size:11px;color:var(--text-muted)">'+GH_SEL_A.mbti+'</div></div><div style="font-size:24px">💕</div><div style="text-align:center"><div style="font-size:20px">'+(GH_SEL_B.id==='me'?'🙋':'👤')+'</div><div style="font-size:13px;font-weight:700">'+(GH_SEL_B.name||GH_SEL_B.ilju)+'</div><div style="font-size:11px;color:var(--text-muted)">'+GH_SEL_B.mbti+'</div></div></div></div>';}c.innerHTML=h;}
  window.MBTS_People.selA=function(id){var p=getPeople().find(function(x){return x.id===id;});if(!p||(GH_SEL_B&&GH_SEL_B.id===id))return;GH_SEL_A=p;renderGHSelector();checkGHPReady();};
  window.MBTS_People.selB=function(id){var p=getPeople().find(function(x){return x.id===id;});if(!p||(GH_SEL_A&&GH_SEL_A.id===id))return;GH_SEL_B=p;renderGHSelector();checkGHPReady();};
  window.MBTS_People.pickRel=function(type){GP_REL=type;if(typeof window.GH_REL!=='undefined')window.GH_REL=type;['ssom','lover','family','colleague','friend'].forEach(function(t){var b=document.getElementById('gp-rel-'+t);if(b){b.style.background=(t===type)?'rgba(136,97,154,0.08)':'#fff';b.style.color=(t===type)?'var(--accent)':'var(--text-muted)';b.style.borderColor=(t===type)?'var(--accent)':'var(--border-light)';}});checkGHPReady();};
  function checkGHPReady(){var btn=document.getElementById('btn-gh-people-start'),rel=document.getElementById('gh-people-rel');if(!btn)return;if(GH_SEL_A&&GH_SEL_B){if(rel)rel.style.display='block';}else{if(rel)rel.style.display='none';}var ok=GH_SEL_A&&GH_SEL_B&&GP_REL;btn.style.display=(GH_SEL_A&&GH_SEL_B)?'block':'none';btn.disabled=!ok;if(ok){var cd=GH_CATEGORIES[GP_REL]||{emoji:'💕',label:'궁합'};btn.textContent=cd.emoji+' '+(GH_SEL_A.name||GH_SEL_A.ilju)+' × '+(GH_SEL_B.name||GH_SEL_B.ilju)+' '+cd.label+' 분석!';btn.style.background='#d63384';btn.style.color='#fff';btn.style.cursor='pointer';}else if(GH_SEL_A&&GH_SEL_B){btn.textContent='☝️ 관계를 선택해주세요';btn.style.background='rgba(0,0,0,0.08)';btn.style.color='var(--text-muted)';btn.style.cursor='not-allowed';}}
  function injectGHSelectorUI(){var gc=document.getElementById('home-content-gunghap');if(!gc||document.getElementById('gh-people-selector'))return;var s=document.createElement('div');s.style.marginTop='16px';s.innerHTML='<div class="glass-card" style="padding:24px 20px;margin-bottom:16px"><h3 style="font-size:16px;font-weight:700;color:var(--text-primary);margin-bottom:4px">💑 두 사람을 선택하세요</h3><p style="font-size:12px;color:var(--text-muted);margin-bottom:16px">목록에서 두 사람을 골라 궁합을 볼 수 있어요</p><div id="gh-people-selector"></div><div id="gh-people-rel" style="display:none;margin-top:12px"><label style="font-size:12px;font-weight:700;color:var(--accent);display:block;margin-bottom:6px">우리의 관계</label><div style="display:flex;flex-wrap:wrap;gap:6px"><button onclick="MBTS_People.pickRel(\'ssom\')" id="gp-rel-ssom" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💕 썸</button><button onclick="MBTS_People.pickRel(\'lover\')" id="gp-rel-lover" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">❤️ 연인</button><button onclick="MBTS_People.pickRel(\'family\')" id="gp-rel-family" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">👨‍👩‍👧 가족</button><button onclick="MBTS_People.pickRel(\'colleague\')" id="gp-rel-colleague" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💼 동료</button><button onclick="MBTS_People.pickRel(\'friend\')" id="gp-rel-friend" style="flex:1;min-width:70px;padding:8px 4px;font-size:11px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">🍻 친구</button></div></div><button id="btn-gh-people-start" onclick="MBTS_People.startFromList()" style="display:none;width:100%;padding:14px;font-size:15px;font-weight:700;color:#fff;background:#d63384;border:none;border-radius:12px;margin-top:16px;box-shadow:0 4px 16px rgba(214,51,132,.2);cursor:pointer" disabled>선택해주세요</button></div>';gc.appendChild(s);renderGHSelector();}

  window.MBTS_People.startFromList=async function(){if(!GH_SEL_A||!GH_SEL_B||!GP_REL)return;var pA=GH_SEL_A,pB=GH_SEL_B;window._lastSaju=pA.saju;window._lastDW=pA.dw;window._lastGG=pA.gg;window._lastMBTI=pA.mbti;window._lastMBTIObj=pA.mbtiObj;if(typeof GH_REL!=='undefined')window.GH_REL=GP_REL;if(typeof GH_GENDER!=='undefined')window.GH_GENDER=pB.gender||'남성';if(typeof GH_MBTI_SEL!=='undefined')window.GH_MBTI_SEL=pB.mbti;var apiKey=getApiKey();if(!apiKey){apiKey=await promptApiKey();if(!apiKey)return;}var ghR=analyzeGunghap(pA.saju,pB.saju,pA.dw,pB.dw,pA.gg,pB.gg,pA.mbtiObj,pB.mbtiObj);if(GH_CATEGORIES[GP_REL]){var w=GH_CATEGORIES[GP_REL].scoreWeights;ghR.scores.total=Math.round(ghR.scores.love*w.love+ghR.scores.comm*w.comm+ghR.scores.values*w.values+ghR.scores.work*w.work);}goPage('gh-load');var cd=GH_CATEGORIES[GP_REL]||{emoji:'💕',label:'궁합',categories:['연애 케미','소통 방식','갈등 패턴','장기 전망'],tone:''};var msgs=['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...',cd.emoji+' '+cd.label+' 궁합...',cd.categories[0]+' 분석...',(cd.categories[1]||'소통')+' 분석...',(cd.categories[2]||'전망')+' 분석...','인지기능 궁합 탐색...','이야기를 쓰는 중...'];var p=0,iv=setInterval(function(){p+=Math.random()*1.5+0.4;if(p>95)p=95;document.getElementById('gh-load-bar').style.width=p+'%';document.getElementById('gh-load-pct').textContent=Math.round(p)+'%';document.getElementById('gh-load-msg').textContent=msgs[Math.min(Math.floor(p/12),7)];},900);var up=buildGunghapUserPrompt(ghR,pA.saju,pB.saju,pA.dw,pB.dw,pA.gg,pB.gg,pA.mbtiObj,pB.mbtiObj);up+='\n### 관계: '+cd.label+'\n카테고리:\n';cd.categories.forEach(function(c,i){up+=(i+1)+'. '+c+'\n';});if(cd.tone)up+='\n톤: '+cd.tone+'\n';var sp=getGHSystemPrompt(GP_REL);var ai=null,ae='';try{var at=await streamSonnet(apiKey,sp,up,cd.emoji+' 궁합','gh-load-msg','gh-load-bar','gh-load-pct','/api/gunghap-analyze');try{ai=JSON.parse(at);}catch(e){var fb=at.indexOf('{'),lb=at.lastIndexOf('}');if(fb>=0&&lb>fb)try{ai=JSON.parse(at.substring(fb,lb+1));}catch(e2){}if(!ai){var ln=at.split('\n'),si=-1,ei=-1;for(var li=0;li<ln.length;li++){if(si<0&&ln[li].trim().charAt(0)==='{')si=li;if(ln[li].trim().charAt(0)==='}'||ln[li].trim().slice(-1)==='}')ei=li;}if(si>=0&&ei>=si)try{ai=JSON.parse(ln.slice(si,ei+1).join('\n'));}catch(e3){}}if(!ai){var sn=at.substring(fb>=0?fb:0,(lb>0?lb+1:at.length));sn=sn.replace(/[\x00-\x1F\x7F]/g,function(c){return c==='\n'||c==='\r'||c==='\t'?c:'';});try{ai=JSON.parse(sn);}catch(e4){}}if(ai)ae='';else ae='JSON_PARSE';}}catch(e){ae=e.message||'UNKNOWN';}clearInterval(iv);document.getElementById('gh-load-bar').style.width='100%';document.getElementById('gh-load-pct').textContent='100%';setTimeout(function(){renderGunghapResultV2(ghR,ai,pA.saju,pB.saju,pA.mbtiObj,pB.mbtiObj,pA.gg,pB.gg,ae,GP_REL);goPage('gh-res');},600);};


  // ╔══════════════════════════════════════╗
  // ║  PART C: 관계 유형 선택               ║
  // ╚══════════════════════════════════════╝
  window.GH_REL='';
  window.GH_CATEGORIES={'ssom':{label:'💕 썸',emoji:'💕',categories:['끌림의 정체','밀당 공략법','발전 가능성'],scoreLabels:{love:'끌림',comm:'소통',values:'가치관',work:'일상'},scoreWeights:{love:0.40,comm:0.30,values:0.15,work:0.15},tone:'설렘과 궁금함. 두근거리는 톤.'},'lover':{label:'❤️ 연인',emoji:'❤️',categories:['우리의 케미','싸움 패턴','장기 전망'],scoreLabels:{love:'연애',comm:'소통',values:'가치관',work:'생활'},scoreWeights:{love:0.35,comm:0.25,values:0.25,work:0.15},tone:'현실적이고 깊은 분석. 솔직한 톤.'},'family':{label:'👨‍👩‍👧 가족',emoji:'👨‍👩‍👧',categories:['관계의 본질','갈등 포인트','더 가까워지려면'],scoreLabels:{love:'애정',comm:'소통',values:'가치관',work:'일상'},scoreWeights:{love:0.15,comm:0.35,values:0.35,work:0.15},tone:'따뜻하고 이해 중심. 공감 톤.'},'colleague':{label:'💼 동료',emoji:'💼',categories:['업무 케미','주의사항','같이 성공하려면'],scoreLabels:{love:'친밀도',comm:'소통',values:'가치관',work:'업무'},scoreWeights:{love:0.05,comm:0.30,values:0.25,work:0.40},tone:'프로페셔널하지만 인간적.'},'friend':{label:'🍻 친구',emoji:'🍻',categories:['우정의 본질','조심할 것','평생 친구 되려면'],scoreLabels:{love:'유대감',comm:'소통',values:'가치관',work:'활동'},scoreWeights:{love:0.10,comm:0.35,values:0.30,work:0.25},tone:'편안하고 솔직한 톤.'}};

  function injectRelationUI(){var g=document.getElementById('gh-btn-male');if(!g||document.getElementById('gh-rel-grid'))return;var w=g.parentElement.parentElement;if(!w)return;var d=document.createElement('div');d.style.marginBottom='14px';d.innerHTML='<label style="font-size:11px;color:var(--accent);font-weight:600;display:block;margin-bottom:6px">우리의 관계</label><div style="display:flex;flex-wrap:wrap;gap:6px" id="gh-rel-grid"><button id="gh-rel-ssom" onclick="ghPickRel(\'ssom\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💕 썸</button><button id="gh-rel-lover" onclick="ghPickRel(\'lover\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">❤️ 연인</button><button id="gh-rel-family" onclick="ghPickRel(\'family\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">👨‍👩‍👧 가족</button><button id="gh-rel-colleague" onclick="ghPickRel(\'colleague\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">💼 동료</button><button id="gh-rel-friend" onclick="ghPickRel(\'friend\')" style="flex:1;min-width:75px;padding:10px 4px;font-size:12px;font-weight:600;background:#fff;border:2px solid var(--border-light);border-radius:10px;color:var(--text-muted);cursor:pointer">🍻 친구</button></div>';w.parentNode.insertBefore(d,w.nextSibling);}
  window.ghPickRel=function(type){GH_REL=type;['ssom','lover','family','colleague','friend'].forEach(function(t){var b=document.getElementById('gh-rel-'+t);if(b){b.style.background=(t===type)?'rgba(136,97,154,0.08)':'#fff';b.style.color=(t===type)?'var(--accent)':'var(--text-muted)';b.style.borderColor=(t===type)?'var(--accent)':'var(--border-light)';}});if(typeof checkGHReady==='function')checkGHReady();};
  var _origCGR=window.checkGHReady;window.checkGHReady=function(){if(typeof _origCGR==='function')_origCGR();if(!GH_REL){var b=document.getElementById('btn-gh-start');if(b){b.disabled=true;b.style.background='rgba(0,0,0,0.08)';b.style.color='var(--text-muted)';}}};
  window.getGHSystemPrompt=function(rel){if(!rel||!GH_CATEGORIES[rel])return GUNGHAP_SYSTEM;var c=GH_CATEGORIES[rel],b=GUNGHAP_SYSTEM;var i=b.indexOf('## 구조');if(i<0)return b;var before=b.substring(0,i);return before+'## 관계: '+c.label+'\\n톤: '+c.tone+'\\n\\n## 구조\\n카테고리 '+c.categories.length+'개: '+c.categories.join(', ')+'\\n카테고리당 2~3개 항목, 총 7~9개\\ncontent: 2~3문단\\n\\nJSON만 출력하세요.';};

  // startGunghap 래핑 (수동 입력)
  var _origSG=window.startGunghap;
  window.startGunghap=async function(){if(!GH_REL||!GH_CATEGORIES[GH_REL])return _origSG();var apiKey=getApiKey();if(!apiKey){apiKey=await promptApiKey();if(!apiKey)return;}var bY=+document.getElementById('gh-y').value,bM=+document.getElementById('gh-m').value,bD=+document.getElementById('gh-d').value;var bH=document.getElementById('gh-h').value?+document.getElementById('gh-h').value:null,bMin=document.getElementById('gh-min').value?+document.getElementById('gh-min').value:null;var sajuB=calcSajuForApp(bY,bM,bD,bH,bMin,null),ggB=analyzeGyeokguk(sajuB);var gB=GH_GENDER==='남성'?'남':'여',dwB=calcDaewoon(sajuB,bY,bM,bD,bH||12,bMin||0,gB);var tiB=TY[GH_MBTI_SEL]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};var mbtiB={type:GH_MBTI_SEL,cf:tiB.cf,axes:[{side:GH_MBTI_SEL[0],pct:60},{side:GH_MBTI_SEL[1],pct:60},{side:GH_MBTI_SEL[2],pct:60},{side:GH_MBTI_SEL[3],pct:60}],profile:''};var sajuA=window._lastSaju,dwA=window._lastDW,ggA=window._lastGG,mbtiA=window._lastMBTIObj;if(!sajuA){alert('먼저 내 사주를 분석해주세요!');goPage('birth');return;}var ghR=analyzeGunghap(sajuA,sajuB,dwA,dwB,ggA,ggB,mbtiA,mbtiB);var w=GH_CATEGORIES[GH_REL].scoreWeights;ghR.scores.total=Math.round(ghR.scores.love*w.love+ghR.scores.comm*w.comm+ghR.scores.values*w.values+ghR.scores.work*w.work);goPage('gh-load');var cat=GH_CATEGORIES[GH_REL];var msgs=['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...',cat.emoji+' '+cat.label+' 궁합...',cat.categories[0]+' 분석...',cat.categories[1]+' 분석...',cat.categories[2]+' 분석...','인지기능 궁합 탐색...','이야기를 쓰는 중...'];var p=0,iv=setInterval(function(){p+=Math.random()*1.5+0.4;if(p>95)p=95;document.getElementById('gh-load-bar').style.width=p+'%';document.getElementById('gh-load-pct').textContent=Math.round(p)+'%';document.getElementById('gh-load-msg').textContent=msgs[Math.min(Math.floor(p/12),7)];},900);var up=buildGunghapUserPrompt(ghR,sajuA,sajuB,dwA,dwB,ggA,ggB,mbtiA,mbtiB);up+='\n### 관계: '+cat.label+'\n카테고리:\n';cat.categories.forEach(function(c,i){up+=(i+1)+'. '+c+'\n';});up+='\n톤: '+cat.tone+'\n';var sp=getGHSystemPrompt(GH_REL),ai=null,ae='';try{var at=await streamSonnet(apiKey,sp,up,cat.emoji+' 궁합','gh-load-msg','gh-load-bar','gh-load-pct','/api/gunghap-analyze');try{ai=JSON.parse(at);}catch(e){var fb=at.indexOf('{'),lb=at.lastIndexOf('}');if(fb>=0&&lb>fb)try{ai=JSON.parse(at.substring(fb,lb+1));}catch(e2){}if(!ai){var ln=at.split('\n'),si=-1,ei=-1;for(var li=0;li<ln.length;li++){if(si<0&&ln[li].trim().charAt(0)==='{')si=li;if(ln[li].trim().charAt(0)==='}'||ln[li].trim().slice(-1)==='}')ei=li;}if(si>=0&&ei>=si)try{ai=JSON.parse(ln.slice(si,ei+1).join('\n'));}catch(e3){}}if(!ai){var sn=at.substring(fb>=0?fb:0,(lb>0?lb+1:at.length));sn=sn.replace(/[\x00-\x1F\x7F]/g,function(c){return c==='\n'||c==='\r'||c==='\t'?c:'';});try{ai=JSON.parse(sn);}catch(e4){}}if(ai)ae='';else ae='JSON_PARSE';}}catch(e){ae=e.message||'UNKNOWN';}clearInterval(iv);document.getElementById('gh-load-bar').style.width='100%';document.getElementById('gh-load-pct').textContent='100%';setTimeout(function(){renderGunghapResultV2(ghR,ai,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,ae,GH_REL);goPage('gh-res');},600);try{addPerson({id:genId(),name:sajuB.P[2].s+sajuB.P[2].b+' · '+GH_MBTI_SEL,ilju:sajuB.P[2].s+sajuB.P[2].b,mbti:GH_MBTI_SEL,gender:GH_GENDER,birthInfo:{y:bY,m:bM,d:bD,h:bH||'',min:bMin||''},hasFull:false,saju:sajuB,dw:dwB,gg:ggB,mbtiObj:mbtiB,savedAt:Date.now()});}catch(e){}};

  // 결과 렌더 V2
  window.renderGunghapResultV2=function(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,err,relType){if(!relType||!GH_CATEGORIES[relType])return renderGunghapResult(ghR,aiR,sajuA,sajuB,mbtiA,mbtiB,ggA,ggB,err);var cat=GH_CATEGORIES[relType],sl=cat.scoreLabels,el=document.getElementById('pg-gh-res'),sc=ghR.scores;var title=aiR&&aiR.title?aiR.title:(sajuA.P[2].s+sajuA.P[2].b+'×'+sajuB.P[2].s+sajuB.P[2].b+' · '+mbtiA.type+'×'+mbtiB.type);var quote=aiR&&aiR.quote?aiR.quote:'두 사람만의 특별한 이야기';var h='<div class="res-wrap" style="max-width:640px;margin:0 auto;padding:0 0 40px"><div style="text-align:center;padding:32px 20px 20px;background:linear-gradient(180deg,rgba(136,97,154,.06) 0%,transparent 100%)"><div style="display:flex;justify-content:center;gap:0;margin-bottom:10px"><span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;color:#4CAF7D">M</span><span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;color:#5B8FD4">B</span><span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;color:#E05A5A">T</span><span style="font-family:Nunito,sans-serif;font-weight:800;font-size:28px;color:#E8B84B">S</span></div><div style="font-size:12px;color:var(--text-muted);margin-bottom:4px">'+cat.emoji+' '+cat.label+' 궁합</div><h1 style="font-size:20px;font-weight:800;color:var(--text-primary);margin-bottom:4px">'+title+'</h1></div><div style="display:flex;align-items:center;gap:12px;padding:16px 20px;justify-content:center"><div class="glass-card" style="text-align:center;padding:16px 20px;border-color:var(--accent)"><div style="font-size:28px">🙋</div><div style="font-size:14px;font-weight:700;margin-top:4px">나</div><div style="font-size:11px;color:var(--text-muted)">'+sajuA.P[2].s+sajuA.P[2].b+' · '+mbtiA.type+'</div></div><div style="font-size:28px">'+cat.emoji+'</div><div class="glass-card" style="text-align:center;padding:16px 20px;border-color:#E05A5A"><div style="font-size:28px">🙋</div><div style="font-size:14px;font-weight:700;margin-top:4px">상대방</div><div style="font-size:11px;color:var(--text-muted)">'+sajuB.P[2].s+sajuB.P[2].b+' · '+mbtiB.type+'</div></div></div><div class="glass-card" style="margin:12px 20px;padding:24px"><div style="text-align:center;margin-bottom:16px"><div style="font-size:48px;font-weight:900;color:var(--accent)">'+sc.total+'<span style="font-size:24px">점</span></div><div style="font-size:13px;color:var(--text-muted)">'+cat.label+' 종합</div></div>';[{l:sl.love,v:sc.love,c:'#d63384'},{l:sl.comm,v:sc.comm,c:'#2e8b57'},{l:sl.values,v:sc.values,c:'#c99a2e'},{l:sl.work,v:sc.work,c:'#4682b4'}].forEach(function(b){h+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px"><div style="width:50px;text-align:right;font-size:13px;font-weight:600;color:var(--text-secondary)">'+b.l+'</div><div style="flex:1;height:10px;background:rgba(0,0,0,0.06);border-radius:5px;overflow:hidden"><div style="height:100%;width:'+b.v+'%;background:'+b.c+';border-radius:5px;transition:width 1s"></div></div><div style="width:36px;font-size:13px;font-weight:700;color:var(--text-muted)">'+b.v+'%</div></div>';});h+='</div><div class="glass-card" style="margin:12px 20px;padding:16px 20px;border-left:4px solid var(--accent);font-size:14px;color:var(--text-secondary);line-height:1.6;font-style:italic">"'+quote+'"</div>';if(aiR&&aiR.categories){aiR.categories.forEach(function(c){h+='<div style="margin:16px 20px 0"><h3 style="font-size:16px;font-weight:700;margin-bottom:10px;color:var(--text-primary)">'+(c.icon||'')+' '+c.title+'</h3>';if(c.items)c.items.forEach(function(item){h+='<div class="glass-card" style="padding:20px;margin-bottom:10px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:10px"><span style="font-size:22px">'+(item.icon||cat.emoji)+'</span><span style="font-size:15px;font-weight:700;color:var(--text-primary)">'+(item.catch||'')+'</span></div><div style="font-size:14px;color:var(--text-secondary);line-height:1.7;word-break:keep-all">'+(item.content||'').replace(/\n\n/g,'<br><br>')+'</div>';if(item.insightText){var bg={gold:'rgba(201,154,46,.1)',fire:'rgba(211,47,47,.1)',water:'rgba(70,130,180,.1)',purple:'rgba(136,97,154,.1)'},tx={gold:'#c99a2e',fire:'#d32f2f',water:'#4682b4',purple:'#88619A'};h+='<div style="margin-top:12px;padding:12px 14px;background:'+(bg[item.insightType]||bg.gold)+';border-radius:10px;border:1px solid '+(tx[item.insightType]||tx.gold)+'30;display:flex;align-items:flex-start;gap:8px"><span style="font-size:14px">'+(item.insightIcon||'💡')+'</span><span style="font-size:13px;color:'+(tx[item.insightType]||tx.gold)+';line-height:1.5;font-weight:500">'+item.insightText+'</span></div>';}h+='</div>';});h+='</div>';});}else if(err){h+='<div class="glass-card" style="margin:20px;padding:24px;text-align:center"><p style="color:var(--text-muted)">AI 풀이 생성 실패</p><p style="font-size:12px;margin-top:8px">'+err+'</p></div>';}h+='<div style="padding:20px"><button onclick="shareResult()" style="width:100%;padding:14px;font-size:14px;font-weight:700;color:#191919;background:#FEE500;border:none;border-radius:14px;margin-bottom:10px">💬 공유하기</button><p style="text-align:center;margin-top:12px;font-size:11px;color:var(--text-muted)">참고용 분석이며 의사결정을 대체하지 않습니다.</p></div><div style="height:80px"></div></div><div class="btm-tab"><div class="btm-tab-inner"><div class="btm-tab-item" onclick="goPage(\'home\')"><div class="tab-ic">🏠</div><div class="tab-lb">홈</div></div><div class="btm-tab-item active"><div class="tab-ic">📊</div><div class="tab-lb">결과</div></div><div class="btm-tab-item" onclick="alert(\'준비 중!\')"><div class="tab-ic">💾</div><div class="tab-lb">저장</div></div><div class="btm-tab-item" onclick="alert(\'준비 중!\')"><div class="tab-ic">⚙️</div><div class="tab-lb">설정</div></div></div></div>';el.innerHTML=h;};


  // ╔══════════════════════════════════════╗
  // ║  PART D: 이벤트 훅                    ║
  // ╚══════════════════════════════════════╝
  var _origRR=window.renderResult;if(typeof _origRR==='function'){window.renderResult=function(){_origRR.apply(this,arguments);setTimeout(saveMyData,500);};}
  var _origIGP=window.initGHPage;window.initGHPage=function(){if(typeof _origIGP==='function')_origIGP();GH_REL='';setTimeout(injectRelationUI,50);};
  var _origGP=window.goPage;if(typeof _origGP==='function'){window.goPage=function(pg){_origGP(pg);if(pg==='gh-input')setTimeout(injectRelationUI,100);};}
  var _origSHT=window.switchHomeTab;if(typeof _origSHT==='function'){window.switchHomeTab=function(tab){_origSHT(tab);if(tab==='saju')setTimeout(function(){injectPeopleListUI();renderPeopleList();},100);if(tab==='gunghap')setTimeout(function(){injectGHSelectorUI();renderGHSelector();GH_SEL_A=null;GH_SEL_B=null;GP_REL='';},100);};}
  setTimeout(function(){if(window._lastSaju&&window._lastMBTI)saveMyData();injectPeopleListUI();renderPeopleList();},800);

  console.log('[gunghap.js] v2 로드 완료 ✅ (1~18레이어 독립 + 사람목록 + 관계유형)');
})();
