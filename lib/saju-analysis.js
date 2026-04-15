// lib/saju-analysis.js — 격국, 합충형, 대운, 분석 유틸리티
'use strict';

var data = require('./saju-data');
var TGAN = data.TGAN;
var TGAN_KR = data.TGAN_KR;
var JIJI = data.JIJI;
var JIJI_KR = data.JIJI_KR;
var OHAENG_TGAN = data.OHAENG_TGAN;
var OHAENG_JIJI = data.OHAENG_JIJI;
var JIJANGGAN_DATA = data.JIJANGGAN_DATA;
var NAPEUM_TABLE = data.NAPEUM_TABLE;
var getNapeum = data.getNapeum;
var getSipsung = data.getSipsung;
var get12Sinsal = data.get12Sinsal;
var getUnsung = data.getUnsung;
var getSamhapGroup = data.getSamhapGroup;
var SINSAL12_NAMES = data.SINSAL12_NAMES;
var SS_CONTEXT = data.SS_CONTEXT;
var SINSAL_STORY = data.SINSAL_STORY;
var SINSAL_KEYWORDS = data.SINSAL_KEYWORDS;
var ILJU_DATA = data.ILJU_DATA;
var CF_COMPAT = data.CF_COMPAT;
var getCFC = data.getCFC;
var CHEONGAN_HAP = data.CHEONGAN_HAP;
var JIJI_YUKHAP = data.JIJI_YUKHAP;
var JIJI_SAMHAP = data.JIJI_SAMHAP;
var JIJI_BANGHAP = data.JIJI_BANGHAP;
var JIJI_CHUNG = data.JIJI_CHUNG;
var JIJI_HYUNG = data.JIJI_HYUNG;
var JIJI_PA = data.JIJI_PA;
var CHEONGAN_CHUNG = data.CHEONGAN_CHUNG;
var JIJI_HAE = data.JIJI_HAE;
var GH_GANHAP = data.GH_GANHAP;
var GH_CHUNG_G = data.GH_CHUNG_G;
var GH_YUKHAP = data.GH_YUKHAP;
var GH_CHUNG_J = data.GH_CHUNG_J;
var GH_SAMHAP = data.GH_SAMHAP;
var GH_HYUNG = data.GH_HYUNG;
var GH_HAE = data.GH_HAE;
var OH_SANG = data.OH_SANG;
var OH_GEUK = data.OH_GEUK;
var SSP = data.SSP;
var sspDesc = data.sspDesc;
var ILGAN_KW = data.ILGAN_KW;
var JEOKCHEONSU = data.JEOKCHEONSU;
var JAPYEONG_GG = data.JAPYEONG_GG;
var OHENG_KW = data.OHENG_KW;
var UNSUNG_KW = data.UNSUNG_KW;
var GONGMANG_GUNGWI_KW = data.GONGMANG_GUNGWI_KW;
var SIPSUNG_GUNGWI_KW = data.SIPSUNG_GUNGWI_KW;
var GYEOKGUK_KW = data.GYEOKGUK_KW;
var SIPSUNG_REL_KW = data.SIPSUNG_REL_KW;
var CHEONGAN_HAP_KW = data.CHEONGAN_HAP_KW;
var HAP_GUNGWI_KW = data.HAP_GUNGWI_KW;
var JIJI_CHUNG_KW = data.JIJI_CHUNG_KW;
var CHUNG_GUNGWI_KW = data.CHUNG_GUNGWI_KW;
var JIJI_HYUNG_KW = data.JIJI_HYUNG_KW;
var CHEONGAN_CHUNG_KW = data.CHEONGAN_CHUNG_KW;
var JIJI_HAE_KW = data.JIJI_HAE_KW;
var DW_TRANSITION_KW = data.DW_TRANSITION_KW;
var AGE_DW_KW = data.AGE_DW_KW;
var JIJANGGAN_HIDDEN_KW = data.JIJANGGAN_HIDDEN_KW;
var ILJU_KW = data.ILJU_KW;
var OHENG_FLOW_DESC = data.OHENG_FLOW_DESC;
var formatKeywordsForAI = data.formatKeywordsForAI;
var generateMulsangText = data.generateMulsangText;
var OHENG_DATA = data.OHENG_DATA;
var SS_NAMES = data.SS_NAMES;

// Need dateToJDN, findSolarTermJD, getJeolgiTimes, JG_LONG from saju-core
var core = require('./saju-core');
var dateToJDN = core.dateToJDN;
var findSolarTermJD = core.findSolarTermJD;
var JG_LONG = core.JG_LONG;

module.exports = {
  analyzeGyeokguk: analyzeGyeokguk,
  calcDaewoon: calcDaewoon,
  calcRelations: calcRelations,
  calcGongmang: calcGongmang,
  calcJijangganRatio: calcJijangganRatio,
  analyzeDWSEvsWonkuk: analyzeDWSEvsWonkuk,
  resolveHapChungPriority: resolveHapChungPriority,
  enrichSinsal: enrichSinsal,
  calcExtraSinsal: calcExtraSinsal,
  profileAnalysis: profileAnalysis,
  generateDynamicKeywords: generateDynamicKeywords,
  buildGungwiContext: buildGungwiContext,
  buildSinsalStory: buildSinsalStory,
  buildYearHighlight: buildYearHighlight,
  analyzeGunghap: analyzeGunghap,
  buildGunghapUserPrompt: buildGunghapUserPrompt
};

/* ====== 대운(大運) 계산 ====== */
function calcDaewoon(saju, birthY, birthM, birthD, birthH, birthMin, gender){
  var raw=saju.raw;
  var birthJD=dateToJDN(birthY,birthM,birthD);
  if(birthH!==null&&birthH!==undefined&&birthH!==''){birthJD+=(birthH-12)/24;if(birthMin!==null&&birthMin!==undefined&&birthMin!=='')birthJD+=birthMin/1440;}

  var isYangGan=(raw.yg%2===0);
  var isMale=(gender==='남성'||gender==='남');
  var isForward=(isYangGan&&isMale)||(!isYangGan&&!isMale);

  var KST=9/24;
  var allTerms=[];
  for(var y=birthY-1;y<=birthY+1;y++){
    for(var j=0;j<JG_LONG.length;j++){
      var jt=JG_LONG[j];
      var jd=findSolarTermJD(y,jt.l)+KST;
      allTerms.push({n:jt.n,mb:jt.mb,jd:jd});
    }
  }
  allTerms.sort(function(a,b){return a.jd-b.jd;});

  var prevTerm=null,nextTerm=null;
  for(var i=0;i<allTerms.length;i++){
    if(allTerms[i].jd<=birthJD)prevTerm=allTerms[i];
    if(allTerms[i].jd>birthJD&&!nextTerm)nextTerm=allTerms[i];
  }

  var daysToTerm=isForward?Math.round(nextTerm.jd-birthJD):Math.round(birthJD-prevTerm.jd);
  var daewoonAge=Math.round(daysToTerm/3);
  if(daewoonAge<=0)daewoonAge=1;

  var ganjiIdx=-1;
  for(var i=0;i<60;i++){if(i%10===raw.mg&&i%12===raw.mj){ganjiIdx=i;break;}}

  var daewoonsArr=[];
  var currentYear=new Date().getFullYear();
  var currentAge=currentYear-birthY+1;
  var currentDWIdx=-1;

  for(var step=1;step<=8;step++){
    var idx=isForward?((ganjiIdx+step)%60+60)%60:((ganjiIdx-step)%60+60)%60;
    var g=idx%10,ji=idx%12;
    var startAge=daewoonAge+(step-1)*10;
    var endAge=startAge+9;
    var ss=getSipsung(raw.dg,g);
    if(currentAge>=startAge&&currentAge<=endAge)currentDWIdx=daewoonsArr.length;
    daewoonsArr.push({
      startAge:startAge,endAge:endAge,
      gan:TGAN_KR[g],ji:JIJI_KR[ji],
      ganH:TGAN[g],jiH:JIJI[ji],
      ss:ss,oh:OHAENG_TGAN[g]
    });
  }

  var seYear1=currentYear,seYear2=currentYear+1;
  var seIdx1=((seYear1-4)%60+60)%60,seIdx2=((seYear2-4)%60+60)%60;
  var se1={y:seYear1,gan:TGAN_KR[seIdx1%10],ji:JIJI_KR[seIdx1%12],ganH:TGAN[seIdx1%10],jiH:JIJI[seIdx1%12],ss:getSipsung(raw.dg,seIdx1%10)};
  var se2={y:seYear2,gan:TGAN_KR[seIdx2%10],ji:JIJI_KR[seIdx2%12],ganH:TGAN[seIdx2%10],jiH:JIJI[seIdx2%12],ss:getSipsung(raw.dg,seIdx2%10)};

  return{
    direction:isForward?'순행':'역행',
    daewoonAge:daewoonAge,
    daewoons:daewoonsArr,
    currentDWIdx:currentDWIdx,
    seun:[se1,se2],
    currentAge:currentAge
  };
}

/* ====== 대운/세운 vs 원국 합충 분석 ====== */
function analyzeDWSEvsWonkuk(saju, dw){
  var r = saju.raw;
  var wonJis = [];
  if(r.yj!=null) wonJis.push({v:r.yj, l:'년지', kr:JIJI_KR[r.yj]});
  if(r.mj!=null) wonJis.push({v:r.mj, l:'월지', kr:JIJI_KR[r.mj]});
  wonJis.push({v:r.dj, l:'일지', kr:JIJI_KR[r.dj]});
  if(r.hj!=null) wonJis.push({v:r.hj, l:'시지', kr:JIJI_KR[r.hj]});

  var wonGans = [];
  if(r.yg!=null) wonGans.push({v:r.yg, l:'년간', kr:TGAN_KR[r.yg]});
  if(r.mg!=null) wonGans.push({v:r.mg, l:'월간', kr:TGAN_KR[r.mg]});
  wonGans.push({v:r.dg, l:'일간', kr:TGAN_KR[r.dg]});
  if(r.hg!=null) wonGans.push({v:r.hg, l:'시간', kr:TGAN_KR[r.hg]});

  var GANHAP = [[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  var CHUNG_PAIRS = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var YUKHAP = [[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
  var SAMHAP_CENTER = [[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
  var HYUNG_PAIRS = [[2,5],[5,8],[8,2],[3,0],[0,3],[4,4],[6,6],[7,7],[10,10],[1,10],[10,7],[1,4]];
  var HAE_PAIRS = [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];

  function checkJiRelations(targetJi, targetLabel, targetKr) {
    var results = [];
    wonJis.forEach(function(wj){
      CHUNG_PAIRS.forEach(function(cp){
        if((targetJi===cp[0]&&wj.v===cp[1])||(targetJi===cp[1]&&wj.v===cp[0]))
          results.push({type:'충',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'충 — 충돌·변동·전환의 에너지',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    wonJis.forEach(function(wj){
      YUKHAP.forEach(function(yh){
        if((targetJi===yh[0]&&wj.v===yh[1])||(targetJi===yh[1]&&wj.v===yh[0]))
          results.push({type:'합',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'합('+yh[2]+') — 결합·협력·새로운 기회',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    wonJis.forEach(function(wj){
      HYUNG_PAIRS.forEach(function(hp){
        if(targetJi===hp[0]&&wj.v===hp[1])
          results.push({type:'형',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'형 — 갈등·시련·성장통',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':'관계·환경'});
      });
    });
    wonJis.forEach(function(wj){
      HAE_PAIRS.forEach(function(hp){
        if((targetJi===hp[0]&&wj.v===hp[1])||(targetJi===hp[1]&&wj.v===hp[0]))
          results.push({type:'해',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'해 — 은밀한 손해·배신·오해',
            impact:'대인관계'});
      });
    });
    return results;
  }

  function checkGanRelations(targetGan, targetLabel, targetKr) {
    var results = [];
    wonGans.forEach(function(wg){
      GANHAP.forEach(function(gh){
        if((targetGan===gh[0]&&wg.v===gh[1])||(targetGan===gh[1]&&wg.v===gh[0]))
          results.push({type:'천간합',target:targetLabel+targetKr,won:wg.l+wg.kr,
            desc:targetKr+wg.kr+'합('+gh[2]+') — 결합·협력의 기운'});
      });
    });
    if(targetGan!=null){
      wonGans.forEach(function(wg){
        CHEONGAN_CHUNG.forEach(function(cc){
          if((targetGan===cc[0]&&wg.v===cc[1])||(targetGan===cc[1]&&wg.v===cc[0]))
            results.push({type:'천간충',target:targetLabel+targetKr,won:wg.l+wg.kr,
              desc:targetKr+wg.kr+' 천간충 — 갈등과 대립'});
        });
      });
    }
    return results;
  }

  var dwResults = [];
  if(dw.currentDWIdx >= 0){
    var cdw = dw.daewoons[dw.currentDWIdx];
    var dwGanIdx = TGAN_KR.indexOf(cdw.gan);
    var dwJiIdx = JIJI_KR.indexOf(cdw.ji);
    dwResults = checkJiRelations(dwJiIdx, '대운', cdw.ji).concat(
      checkGanRelations(dwGanIdx, '대운', cdw.gan)
    );
  }

  var seResults = [];
  if(dw.seun && dw.seun[0]){
    var se = dw.seun[0];
    var seGanIdx = TGAN_KR.indexOf(se.gan);
    var seJiIdx = JIJI_KR.indexOf(se.ji);
    seResults = checkJiRelations(seJiIdx, se.y+'세운', se.ji).concat(
      checkGanRelations(seGanIdx, se.y+'세운', se.gan)
    );
  }

  var seResults2 = [];
  if(dw.seun && dw.seun[1]){
    var se2 = dw.seun[1];
    var se2GanIdx = TGAN_KR.indexOf(se2.gan);
    var se2JiIdx = JIJI_KR.indexOf(se2.ji);
    seResults2 = checkJiRelations(se2JiIdx, se2.y+'세운', se2.ji).concat(
      checkGanRelations(se2GanIdx, se2.y+'세운', se2.gan)
    );
  }

  var dwSeConflict = [];
  if(dw.currentDWIdx >= 0 && dw.seun && dw.seun[0]){
    var cdw2 = dw.daewoons[dw.currentDWIdx];
    var dji = JIJI_KR.indexOf(cdw2.ji), sji = JIJI_KR.indexOf(dw.seun[0].ji);
    CHUNG_PAIRS.forEach(function(cp){
      if((dji===cp[0]&&sji===cp[1])||(dji===cp[1]&&sji===cp[0]))
        dwSeConflict.push('대운'+cdw2.ji+'과 세운'+dw.seun[0].ji+' 충 → 운의 방향 급변, 큰 전환점');
    });
  }

  return{
    daewoon: dwResults,
    seun1: seResults,
    seun2: seResults2,
    dwSeConflict: dwSeConflict
  };
}

/* ====== 합충 우선순위 엔진 ====== */
function resolveHapChungPriority(relations){
  if(!relations) return {resolved:[], summary:''};
  var haps = (relations.jijiYukhap||[]).concat(relations.jijiSamhap||[]);
  var chungs = relations.jijiChung||[];
  var resolved = [];
  var summary = [];

  haps.forEach(function(hap){
    var hapJis = hap.members ? hap.members.map(function(m){return m.v;}) : [];
    var broken = false;
    chungs.forEach(function(chung){
      if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
        var hapPositions = hap.members.map(function(m){return m.l;});
        var chungPositions = [chung.a.l, chung.b.l];
        var adjacent = false;
        var posOrder = ['연지','월지','일지','시지'];
        chungPositions.forEach(function(cp){
          hapPositions.forEach(function(hp){
            var ci = posOrder.indexOf(cp), hi = posOrder.indexOf(hp);
            if(Math.abs(ci-hi)<=1) adjacent = true;
          });
        });
        if(adjacent){
          broken = true;
          resolved.push({type:'합피충파', desc: hap.desc + ' → 인접 ' + chung.desc + '에 의해 깨짐'});
          summary.push(hap.desc+'이 '+chung.desc+'에 의해 파괴됨(합피충파)');
        }
      }
    });
    if(!broken){
      chungs.forEach(function(chung){
        if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
          resolved.push({type:'탐합망충', desc: hap.desc + '이 ' + chung.desc + '을 흡수함'});
          summary.push(hap.desc+'이 '+chung.desc+'을 흡수(탐합망충)');
        }
      });
    }
  });

  return {resolved: resolved, summary: summary.join(' / ')};
}

/* ====== 격국 분석 엔진 ====== */
function analyzeGyeokguk(saju){
  var dg=saju.raw.dg,el=saju.el,ss=saju.ss,dmEl=saju.dmEl;
  var elFull=saju.elFull||saju.el;
  var cnt={비겁:0,식상:0,재성:0,관성:0,인성:0};
  ss.forEach(function(s){if(!s.ss)return;if(s.pillar==='일주')return;if(s.ss==='비견'||s.ss==='겁재')cnt['비겁']++;else if(s.ss==='식신'||s.ss==='상관')cnt['식상']++;else if(s.ss==='편재'||s.ss==='정재')cnt['재성']++;else if(s.ss==='편관'||s.ss==='정관')cnt['관성']++;else if(s.ss==='편인'||s.ss==='정인')cnt['인성']++;});

  saju.jjg.forEach(function(jj,pillarIdx){
    var weight = (pillarIdx === 1) ? 0.7 : 0.3;
    jj.forEach(function(j){
      var g=TGAN_KR.indexOf(j.stem);if(g<0)return;
      var s2=getSipsung(dg,g);
      var w = (jj.indexOf(j) === jj.length-1) ? weight : weight * 0.7;
      if(s2==='비견'||s2==='겁재')cnt['비겁']+=w;
      else if(s2==='식신'||s2==='상관')cnt['식상']+=w;
      else if(s2==='편재'||s2==='정재')cnt['재성']+=w;
      else if(s2==='편관'||s2==='정관')cnt['관성']+=w;
      else if(s2==='편인'||s2==='정인')cnt['인성']+=w;
    });
  });

  var mjName = JIJI_KR[saju.raw.mj];
  var seasonOh = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
  var mjOh = seasonOh[mjName] || '';
  var deukryeong = (mjOh === dmEl);
  var insungOh = {'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl];
  var ganjeobDeuk = (mjOh === insungOh);
  if(deukryeong) cnt['비겁'] += 1.0;
  else if(ganjeobDeuk) cnt['인성'] += 0.5;

  var sorted=Object.entries(cnt).sort(function(a,b){return b[1]-a[1];}),dominant=sorted[0],weak=sorted[sorted.length-1];
  var selfStr=cnt['비겁']+cnt['인성'],otherStr=cnt['식상']+cnt['재성']+cnt['관성'];
  var strong=selfStr>=otherStr;

  var seasonMap = {'인':1,'묘':1,'진':1,'사':2,'오':2,'미':2,'신':3,'유':3,'술':3,'해':4,'자':4,'축':4};
  var season = seasonMap[mjName] || 0;
  var seasonName = ['','봄(목왕절)','여름(화왕절)','가을(금왕절)','겨울(수왕절)'][season];
  var johuNeeds = '';
  var johuDesc = '';
  var johuYongshin = '';

  var JOHU={
  0:{0:{oh:'화',ys:'병화(해동)',desc:'한겨울 큰 나무가 얼어붙음, 병화(태양)로 해동이 급선무'},1:{oh:'화',ys:'병화(해동)',desc:'늦겨울 얼어붙은 나무, 병화로 해동 후 경금으로 가지치기'},2:{oh:'화',ys:'병화(온기)+계수(윤택)',desc:'초봄 갑목, 아직 추위 남아 병화 필요. 계수로 뿌리 수분'},3:{oh:'금',ys:'경금(가지치기)+병화',desc:'봄의 큰 나무가 무성, 경금(도끼)으로 다듬어야 재목'},4:{oh:'금',ys:'경금(조각)+임수+병화',desc:'늦봄 갑목 울창, 경금으로 다듬고 임수로 뿌리 보강'},5:{oh:'수',ys:'계수(냉각)+경금',desc:'초여름 큰 나무, 계수(비)로 물주기가 절실'},6:{oh:'수',ys:'계수(냉각)',desc:'한여름 큰 나무, 계수가 없으면 말라죽음'},7:{oh:'수',ys:'계수(윤택)+경금',desc:'늦여름 갑목, 뿌리가 마르니 계수로 수분 보충'},8:{oh:'화',ys:'정화(제련)+경금',desc:'가을 큰 나무, 경금 칼날이 강하니 정화로 금을 녹여 제어'},9:{oh:'화',ys:'정화+경금+병화',desc:'가을 큰 나무, 경금이 너무 강해 정화로 녹여야 삶'},10:{oh:'금',ys:'경금(다듬기)+임수',desc:'늦가을 갑목, 경금으로 다듬고 임수로 뿌리 수분'},11:{oh:'화',ys:'병화(해동)+경금',desc:'초겨울 큰 나무, 병화로 해동이 시급'}},
  1:{0:{oh:'화',ys:'병화(햇볕)',desc:'한겨울 화초, 병화(햇볕)가 생존의 관건'},1:{oh:'화',ys:'병화(해동)',desc:'늦겨울 화초, 병화로 해동해야 뿌리가 살아남'},2:{oh:'화',ys:'병화(온기)+계수(수분)',desc:'초봄 화초, 병화로 따뜻하게 하고 계수로 물주기'},3:{oh:'수',ys:'계수(수분)+병화',desc:'봄의 꽃, 물(계수)과 햇볕(병화)의 조화가 핵심'},4:{oh:'수',ys:'계수(수분)+병화',desc:'늦봄 화초, 계수로 물주고 병화로 성장 촉진'},5:{oh:'수',ys:'계수(냉각)',desc:'초여름 화초, 뜨거운 열기에 계수(이슬비)가 절실'},6:{oh:'수',ys:'계수(생존)+신금',desc:'한여름 화초, 계수 없으면 말라죽음. 신금(수원) 보조'},7:{oh:'수',ys:'계수(윤택)+병화',desc:'늦여름 화초, 건조한 토기운에 계수가 급함'},8:{oh:'화',ys:'병화(온기)+계수',desc:'가을 화초, 금의 서리바람에 병화로 온기 확보'},9:{oh:'화',ys:'병화+계수',desc:'가을 화초, 서릿발에 시들지 않으려면 병화 필요'},10:{oh:'수',ys:'계수(수분)+병화',desc:'늦가을 화초, 메마른 땅에 물과 햇볕 동시에 필요'},11:{oh:'화',ys:'병화(생존)+무토',desc:'초겨울 화초, 병화가 최우선 생존조건'}},
  2:{0:{oh:'목',ys:'갑목(연료)',desc:'한겨울 태양, 갑목(장작) 없으면 빛을 잃음'},1:{oh:'목',ys:'갑목(연료)+경금',desc:'늦겨울 태양, 갑목으로 불씨 유지. 경금으로 벌채 보조'},2:{oh:'수',ys:'임수(균형)',desc:'초봄 태양이 강해짐, 임수로 과열 방지하며 균형'},3:{oh:'수',ys:'임수(균형)+경금',desc:'봄의 태양, 임수로 빛과 물의 조화. 만물을 기르는 형상'},4:{oh:'수',ys:'임수(제어)',desc:'늦봄 태양이 점점 강해짐, 임수로 기운 조절'},5:{oh:'수',ys:'임수(냉각)+경금',desc:'초여름 태양, 타오르기 시작하니 임수로 반드시 냉각'},6:{oh:'수',ys:'임수(필수냉각)',desc:'한여름 태양 극성, 임수 없으면 만물이 타버림'},7:{oh:'수',ys:'임수(냉각)+경금',desc:'늦여름 태양, 임수 없으면 과열 폭주. 경금은 수원'},8:{oh:'수',ys:'임수(세척)+갑목',desc:'가을 태양 서서히 약해짐, 임수로 균형하고 갑목 보조'},9:{oh:'수',ys:'임수+갑목',desc:'가을 태양, 금기운에 빛이 흐려지니 갑목(연료) 보조'},10:{oh:'목',ys:'갑목(연료)+임수',desc:'늦가을 태양이 약해지기 시작, 갑목(연료)이 중요'},11:{oh:'목',ys:'갑목(연료)',desc:'초겨울 태양, 갑목 없으면 불이 꺼짐'}},
  3:{0:{oh:'목',ys:'갑목(장작)',desc:'한겨울 촛불, 갑목(장작) 없으면 바로 꺼짐'},1:{oh:'목',ys:'갑목(장작)+경금',desc:'늦겨울 촛불, 갑목으로 불씨 유지가 급선무'},2:{oh:'목',ys:'갑목(연료)',desc:'초봄 촛불, 갑목(연료)이 있으면 안정적 타오름'},3:{oh:'목',ys:'갑목(연료)+경금',desc:'봄의 촛불, 갑목을 경금으로 쪼개서 태움'},4:{oh:'목',ys:'갑목(연료)',desc:'늦봄 촛불, 습한 토기운에 갑목이 있어야 유지'},5:{oh:'목',ys:'갑목(연료)+임수',desc:'초여름 촛불이 너무 밝아짐, 갑목 유지+임수 조절'},6:{oh:'수',ys:'임수(조절)+갑목',desc:'한여름 촛불 과열 위험, 임수로 조절. 갑목은 꾸준히 필요'},7:{oh:'목',ys:'갑목(연료)+임수',desc:'늦여름 촛불, 건조한 토에서 갑목 연료 확보가 핵심'},8:{oh:'목',ys:'갑목(연료)',desc:'가을 촛불, 금의 바람에 흔들리니 갑목 연료 필수'},9:{oh:'목',ys:'갑목+병화',desc:'가을 촛불, 경금(강풍)이 강해 갑목 절실'},10:{oh:'목',ys:'갑목(연료)+경금',desc:'늦가을 촛불, 경금으로 장작 쪼개고 갑목 연소 유지'},11:{oh:'목',ys:'갑목(연료)+경금',desc:'초겨울 촛불, 갑목이 없으면 소멸'}},
  4:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 산이 얼어붙음, 병화로 땅 녹이기가 최우선'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 산, 아직 동토상태. 병화가 급선무'},2:{oh:'화',ys:'병화(온기)+갑목+계수',desc:'초봄 산, 병화로 따뜻하게 하고 갑목으로 활기'},3:{oh:'목',ys:'갑목(소통)+병화+계수',desc:'봄의 산, 갑목이 뿌리내려야 산이 살아남'},4:{oh:'화',ys:'병화+갑목',desc:'늦봄 산, 토 왕성 시기라 갑목으로 소통+병화로 활력'},5:{oh:'수',ys:'임수(관개)+갑목',desc:'초여름 산, 임수(비)로 건조함 해소가 급함'},6:{oh:'수',ys:'임수(냉각)+갑목',desc:'한여름 산, 갈라진 땅에 임수가 절실'},7:{oh:'수',ys:'계수(윤택)+갑목+병화',desc:'늦여름 산, 건조한 토에 물 필요. 갑목으로 활력 보조'},8:{oh:'화',ys:'병화+계수',desc:'가을 산, 추워지기 전 병화 확보. 계수로 수분 유지'},9:{oh:'화',ys:'병화+계수',desc:'가을 산, 서리 내리기 전 병화(따뜻함) 필요'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 산, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 산, 병화가 최우선. 얼어붙은 땅을 녹여야'}},
  5:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 논밭 얼어붙음, 병화로 땅 녹여야 씨앗이 삶'},1:{oh:'화',ys:'병화(해동)+갑목+경금',desc:'늦겨울 논밭, 병화 해동+갑목 밭갈이 준비'},2:{oh:'목',ys:'갑목(경작)+병화+계수',desc:'초봄 논밭, 갑목(쟁기)으로 땅갈고 병화+계수 조화'},3:{oh:'목',ys:'갑목(경작)+계수+병화',desc:'봄의 논밭, 갑목·계수·병화 삼위일체가 풍작의 비결'},4:{oh:'화',ys:'병화+갑목+계수',desc:'늦봄 논밭, 토 두꺼우니 갑목 소통. 적절한 조화'},5:{oh:'수',ys:'계수(관개)+갑목',desc:'초여름 논밭, 가뭄에 계수(관개용수)가 급함'},6:{oh:'수',ys:'계수(생존)+갑목',desc:'한여름 논밭, 계수 없으면 곡식 타버림'},7:{oh:'수',ys:'계수(윤택)+병화+갑목',desc:'늦여름 논밭, 물과 햇볕 조화로 수확 준비'},8:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 수확 후 병화로 다음 시즌 준비'},9:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 서리에 병화로 온기 유지'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 논밭, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 논밭, 병화가 급선무. 얼면 생명력 소멸'}},
  6:{0:{oh:'화',ys:'병화(제련)+갑목',desc:'한겨울 쇠가 차갑게 굳음, 병화(용광로)로 담금질해야 명검'},1:{oh:'화',ys:'병화(제련)+갑목',desc:'늦겨울 쇠, 차갑게 굳은 쇠를 병화로 달궈야 날이 섬'},2:{oh:'화',ys:'병화(제련)+갑목',desc:'초봄 쇠, 병화(용광로)로 제련해야 비로소 명검'},3:{oh:'화',ys:'병화(제련)+갑목',desc:'봄의 쇠, 목의 극을 받으니 병화로 중재. 불로 단련해야 빛남'},4:{oh:'목',ys:'갑목(용도)+병화+임수',desc:'늦봄 쇠, 갑목 자르는 날카로움 발휘. 임수 세척'},5:{oh:'수',ys:'임수(담금질)+경금',desc:'초여름 쇠, 뜨거운 불에 임수로 담금질. 명검의 조건'},6:{oh:'수',ys:'임수(냉각)+경금',desc:'한여름 쇠가 녹아내림, 임수 냉각 필수'},7:{oh:'수',ys:'임수(냉각)+갑목',desc:'늦여름 쇠, 건조한 토에 묻혀 임수 필요'},8:{oh:'화',ys:'병화(제련)+임수+갑목',desc:'가을 쇠, 금 왕성하니 병화 제련해야 날이 섬'},9:{oh:'화',ys:'병화(제련)+임수',desc:'가을 쇠, 금 과다하니 병화(제련)가 급함'},10:{oh:'목',ys:'갑목(용도)+임수',desc:'늦가을 쇠, 토에 묻히니 갑목으로 쓸모 찾기'},11:{oh:'화',ys:'병화(제련)+갑목',desc:'초겨울 쇠, 병화로 달궈야 날카로운 도구'}},
  7:{0:{oh:'화',ys:'병화(광택)+임수',desc:'한겨울 보석, 병화(햇볕)에 비춰야 빛남'},1:{oh:'화',ys:'병화(광택)+임수',desc:'늦겨울 보석, 진흙에 묻힌 보석을 병화로 빛내기'},2:{oh:'수',ys:'임수(세척)+병화',desc:'초봄 보석, 임수(맑은 물)로 씻어야 광택'},3:{oh:'수',ys:'임수(세척)+병화',desc:'봄의 보석, 임수 세척+병화에 비추면 찬란한 빛'},4:{oh:'수',ys:'임수(세척)+병화',desc:'늦봄 보석, 습한 흙에서 임수로 닦아야 광택'},5:{oh:'수',ys:'임수(냉각)+계수',desc:'초여름 보석, 더위에 임수로 냉각. 광채 유지'},6:{oh:'수',ys:'임수(보호)+계수',desc:'한여름 보석, 녹지 않게 임수로 보호'},7:{oh:'수',ys:'임수(세척)+계수',desc:'늦여름 보석, 흙탕물에서 임수로 세척해야 빛남'},8:{oh:'수',ys:'임수(광택)+병화',desc:'가을 보석, 임수 광택+병화에 비추면 최상의 빛'},9:{oh:'수',ys:'임수(부드러움)+병화',desc:'가을 보석, 너무 날카로우니 임수로 부드럽게'},10:{oh:'수',ys:'임수(세척)+병화',desc:'늦가을 보석, 토에 묻히니 임수 세척+병화 빛내기'},11:{oh:'화',ys:'병화(빛)+임수',desc:'초겨울 보석, 병화(햇볕)가 있어야 보석으로 빛남'}},
  8:{0:{oh:'화',ys:'병화(해동)+무토',desc:'한겨울 강물 얼어붙음, 병화로 해동 절실'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 강물, 병화로 얼음 녹이기'},2:{oh:'화',ys:'병화(온기)+경금',desc:'초봄 강물, 해빙기에 병화로 온기'},3:{oh:'금',ys:'경금(수원)+갑목',desc:'봄의 강물이 초목에 흡수됨, 경금(수원지)으로 보충'},4:{oh:'목',ys:'갑목(설기)+경금+병화',desc:'늦봄 강물, 토가 막으니 갑목으로 물길 뚫기'},5:{oh:'금',ys:'경금(수원)+임수',desc:'초여름 강물 증발, 경금(수원지) 없으면 바닥 드러남'},6:{oh:'금',ys:'경금(수원)+임수',desc:'한여름 강물 말라감, 경금 절실. 수원지 없으면 갈수기'},7:{oh:'금',ys:'경금(수원)+갑목',desc:'늦여름 강물, 토의 제방에 막혀 경금으로 물길 확보'},8:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 금이 물을 생해 넘치니 갑목으로 설기'},9:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 물이 차고 넘치니 갑목으로 흐름 조절'},10:{oh:'목',ys:'갑목(소통)+병화',desc:'늦가을 강물, 토의 둑에 막혀 갑목 돌파'},11:{oh:'토',ys:'무토(제방)+병화+갑목',desc:'초겨울 강물 범람위험, 무토(둑)로 제어+병화 해동'}},
  9:{0:{oh:'화',ys:'병화(따뜻함)',desc:'한겨울 이슬, 병화 없으면 얼어서 소멸'},1:{oh:'화',ys:'병화(해동)+신금',desc:'늦겨울 이슬, 병화가 생존 조건'},2:{oh:'금',ys:'신금(수원)+병화',desc:'초봄 이슬, 신금(수원)으로 물 보충+병화로 활기'},3:{oh:'금',ys:'경금(수원)+병화',desc:'봄의 이슬, 나무에 흡수되니 경금(수원)으로 보충'},4:{oh:'화',ys:'병화+신금',desc:'늦봄 이슬, 토에 흡수되기 쉬우니 병화+신금 보조'},5:{oh:'금',ys:'경금(수원)+신금',desc:'초여름 이슬 증발위기, 금(수원지)이 절실'},6:{oh:'금',ys:'경금(수원)+신금',desc:'한여름 이슬 완전 증발 위기, 금이 급함'},7:{oh:'금',ys:'경금(수원)+병화',desc:'늦여름 이슬, 건조한 토에 금으로 물 보충'},8:{oh:'화',ys:'병화(온기)+경금',desc:'가을 이슬, 금이 물을 생해주니 병화로 따뜻하게'},9:{oh:'화',ys:'병화+경금',desc:'가을 이슬 차가워짐, 병화 필요'},10:{oh:'금',ys:'신금(수원)+병화+갑목',desc:'늦가을 이슬, 토에 막히니 신금 수원 확보'},11:{oh:'화',ys:'병화(따뜻함)+무토',desc:'초겨울 이슬, 병화 없으면 얼어붙음'}}
  };

  var johuEntry = JOHU[dg] && JOHU[dg][saju.raw.mj];
  if(johuEntry){
    johuNeeds = johuEntry.oh;
    johuYongshin = johuEntry.ys;
    johuDesc = johuEntry.desc;
  }

  var yongshin = '';
  var yongshinType = '';
  var isJonggyeok = false;
  var jonggyeokName = '';
  var jonggyeokDesc = '';

  var totalOh = (el['목']||0)+(el['화']||0)+(el['토']||0)+(el['금']||0)+(el['수']||0);
  var selfRatio = totalOh > 0 ? selfStr / totalOh : 0.5;
  var bigeobInseong = (cnt['비겁']||0) + (cnt['인성']||0);

  var anyStrongRoot = false;
  [saju.raw.yj, saju.raw.mj, saju.raw.dj, saju.raw.hj].forEach(function(ji){
    if(ji == null) return;
    var u = getUnsung(dg, ji);
    if(u === '건록' || u === '제왕' || u === '관대') anyStrongRoot = true;
  });

  if ((cnt['재성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종재격';
    jonggyeokDesc = '재성을 따라가는 사주 — 재물·사업에 올인해야 성공하는 구조. 억지로 자존심 세우면 역효과';
    yongshin = '식상→재성 흐름 강화(재물의 흐름을 따라감)';
    yongshinType = '종격';
  }
  else if ((cnt['관성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종살격';
    jonggyeokDesc = '관성을 따라가는 사주 — 조직·권력 속에서 순응해야 성공. 반항하면 깨짐';
    yongshin = '재성→관성 흐름 강화(조직의 흐름을 따라감)';
    yongshinType = '종격';
  }
  else if ((cnt['식상']||0) >= 3 && (cnt['인성']||0) <= 0.3 && selfRatio < 0.2 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종아격';
    jonggyeokDesc = '식상을 따라가는 사주 — 표현·창작·예술에 올인해야 성공. 틀에 가두면 폭발';
    yongshin = '비겁→식상 흐름 강화(표현의 흐름을 따라감)';
    yongshinType = '종격';
  }
  else if (bigeobInseong >= 5 && (cnt['식상']||0)+(cnt['재성']||0)+(cnt['관성']||0) <= 0.5 && selfRatio > 0.85) {
    isJonggyeok = true;
    jonggyeokName = '종강격';
    jonggyeokDesc = '자기 힘을 따라가는 사주 — 남의 말 안듣고 자기 길을 가야 성공. 독립·자주가 핵심';
    yongshin = '비겁·인성 유지(자기 에너지를 극대화)';
    yongshinType = '종격';
  }

  if(!isJonggyeok && johuYongshin){
    yongshin = johuYongshin;
    yongshinType = '조후';
  }

  if(!isJonggyeok && !yongshin){
    if((cnt['관성']||0) >= 3 && (cnt['식상']||0) < 1){
      yongshin='식상(제관—관성 과다를 식상으로 제어)'; yongshinType='병약';
    } else if((cnt['식상']||0) >= 3 && (cnt['인성']||0) < 1){
      yongshin='인성(제식상—식상 과다를 인성으로 제어)'; yongshinType='병약';
    } else if((cnt['재성']||0) >= 3 && selfRatio > 0.15 && (cnt['비겁']||0) < 1){
      yongshin='비겁(방어—재성 과다에 자기 힘 보강)'; yongshinType='병약';
    } else if((cnt['인성']||0) >= 3 && (cnt['재성']||0) < 1){
      yongshin='재성(제인성—인성 과다를 재성으로 제어)'; yongshinType='병약';
    }
  }

  if(!isJonggyeok && !yongshin){
    if((elFull['금']||0)>=2 && (elFull['목']||0)>=2 && (elFull['수']||0)<0.3){
      yongshin='수(금목소통)'; yongshinType='통관';
    }
    else if((elFull['수']||0)>=2 && (elFull['화']||0)>=2 && (elFull['목']||0)<0.3){
      yongshin='목(수화소통)'; yongshinType='통관';
    }
    else if((elFull['목']||0)>=2 && (elFull['토']||0)>=2 && (elFull['화']||0)<0.3){
      yongshin='화(목토소통)'; yongshinType='통관';
    }
    else if((elFull['화']||0)>=2 && (elFull['금']||0)>=2 && (elFull['토']||0)<0.3){
      yongshin='토(화금소통)'; yongshinType='통관';
    }
    else if((elFull['토']||0)>=2 && (elFull['수']||0)>=2 && (elFull['금']||0)<0.3){
      yongshin='금(토수소통)'; yongshinType='통관';
    }
  }

  if(!isJonggyeok && !yongshin){
    yongshinType='억부';
    if(strong){
      yongshin=cnt['식상']<1?'식상(설기)':cnt['재성']<1?'재성(재물)':'관성(절제)';
    }else{
      yongshin=cnt['인성']<1?'인성(학문,귀인)':'비겁(동료,자립)';
    }
  }

  var ohMap={'비겁':dmEl,'식상':{'목':'화','화':'토','토':'금','금':'수','수':'목'}[dmEl],'재성':{'목':'토','화':'금','토':'수','금':'목','수':'화'}[dmEl],'관성':{'목':'금','화':'수','토':'목','금':'화','수':'토'}[dmEl],'인성':{'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl]};
  var sr=Object.entries(el).sort(function(a,b){return b[1]-a[1];}),lack=sr.filter(function(e){return e[1]===0;}).map(function(e){return e[0];});

  var mjData = JIJANGGAN_DATA[saju.raw.mj];
  var jeonggiGan = mjData[mjData.length - 1].g;
  var jeonggiSS = getSipsung(dg, jeonggiGan);
  var gyeokgukName = '';
  var gyeokgukDesc = '';
  if (jeonggiSS === '비견' || jeonggiSS === '겁재') {
    var iljuUnsung = getUnsung(dg, saju.raw.mj);
    if (iljuUnsung === '건록') { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 스스로 일어서는 힘이 강하고, 남에게 기대지 않는 자립형'; }
    else if (iljuUnsung === '제왕') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 극강의 추진력과 결단력, 잘 쓰면 장군 못 쓰면 화를 부름'; }
    else if (jeonggiSS === '겁재') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 경쟁심이 강하고 승부에 집착, 한번 물면 놓지 않는 기질'; }
    else { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 뭐든 혼자 해내려는 성향, 독립심이 강한 자립형'; }
  } else {
    var gyeokgukMap = {
      '식신': {name:'식신격', desc:'표현·재능·먹거리의 격 — 무언가를 만들고 표현하고 먹이는 것에 재능, 여유롭고 낙천적'},
      '상관': {name:'상관격', desc:'반항·창의·파격의 격 — 기존 틀을 부수는 창의력, 자유로운 영혼, 조직보다 프리랜서'},
      '편재': {name:'편재격', desc:'투자·사업·모험의 격 — 큰 돈을 굴리는 감각, 사업가 기질, 리스크를 즐김'},
      '정재': {name:'정재격', desc:'안정·저축·성실의 격 — 꾸준히 모으는 재테크 체질, 안정적이고 계획적'},
      '편관': {name:'편관격', desc:'도전·권력·군인의 격 — 거친 환경에서 빛나는 리더십, 카리스마와 추진력'},
      '정관': {name:'정관격', desc:'질서·공직·안정의 격 — 체계와 규칙 속에서 성장, 조직 안에서 출세하는 타입'},
      '편인': {name:'편인격', desc:'비범·연구·고독의 격 — 독특한 사고방식, 한 분야를 깊이 파는 연구자 기질'},
      '정인': {name:'정인격', desc:'학문·귀인·어머니의 격 — 배움을 통해 성장, 주변에 귀인이 나타나는 구조'}
    };
    var gInfo = gyeokgukMap[jeonggiSS];
    if (gInfo) { gyeokgukName = gInfo.name; gyeokgukDesc = gInfo.desc; }
    else { gyeokgukName = jeonggiSS + '격'; gyeokgukDesc = ''; }
  }
  var gyeokgukBasis = '월지 '+JIJI_KR[saju.raw.mj]+'의 정기 '+TGAN_KR[jeonggiGan]+' → 일간 '+TGAN_KR[dg]+'에 대해 '+jeonggiSS;

  var isHwakyeok = false;
  var hwakyeokName = '';
  var hwakyeokDesc = '';
  if(!isJonggyeok) {
    var GANHAP_HWA = [{a:0,b:5,oh:'토',name:'갑기합화토'},{a:1,b:6,oh:'금',name:'을경합화금'},
      {a:2,b:7,oh:'수',name:'병신합화수'},{a:3,b:8,oh:'목',name:'정임합화목'},{a:4,b:9,oh:'화',name:'무계합화화'}];
    GANHAP_HWA.forEach(function(gh){
      if(dg !== gh.a && dg !== gh.b) return;
      var partner = (dg === gh.a) ? gh.b : gh.a;
      var adjGans = [saju.raw.mg];
      if(saju.raw.hg != null) adjGans.push(saju.raw.hg);
      if(adjGans.indexOf(partner) < 0) return;
      var seasonOh2 = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
      var mjOh2 = seasonOh2[JIJI_KR[saju.raw.mj]] || '';
      if(mjOh2 === gh.oh){
        var kukOh = {'목':'금','화':'수','토':'목','금':'화','수':'토'};
        var attacker = kukOh[gh.oh];
        if(attacker && (elFull[attacker]||0) >= 2) return;
        if(bigeobInseong <= 1.5){
          isHwakyeok = true;
          hwakyeokName = gh.name + '격';
          hwakyeokDesc = gh.name + ' — 일간이 본래 오행을 버리고 '+gh.oh+'의 성질로 완전히 변함. 극히 드문 특수격';
        }
      }
    });
    if(isHwakyeok){
      gyeokgukName = hwakyeokName;
      gyeokgukDesc = hwakyeokDesc;
      gyeokgukBasis = '화격 판별: 천간합이 월지에서 득령 + 자기오행 미약';
      isJonggyeok = true;
    }
  }

  var pagyeokInfo = '';
  var originalGyeokguk = gyeokgukName;
  if(!isJonggyeok && !isHwakyeok) {
    var _raw = {};
    ss.forEach(function(s2){if(s2.ss) _raw[s2.ss] = (_raw[s2.ss]||0)+1;});
    saju.jjg.forEach(function(jj){jj.forEach(function(j){var g2=TGAN_KR.indexOf(j.stem);if(g2>=0){var s3=getSipsung(dg,g2);_raw[s3]=(_raw[s3]||0)+0.5;}});});

    if(gyeokgukName==='식신격' && (_raw['편인']||0) >= 1 && (_raw['편재']||0) < 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 식신의 재능을 편인이 빼앗음. 재능은 있으나 발휘가 막힘';
      yongshin = '편재(제편인) — 편인을 제어하여 식신을 살려야 함'; yongshinType = '파격조정';
    }
    else if(gyeokgukName==='정관격' && (_raw['상관']||0) >= 1 && (_raw['편인']||0) < 1){
      pagyeokInfo = '상관견관(傷官見官) — 상관이 정관을 공격. 능력은 있으나 조직과 충돌';
      yongshin = '인성(제상관) — 인성으로 상관을 누르고 정관을 보호'; yongshinType = '파격조정';
    }
    else if((gyeokgukName==='정재격'||gyeokgukName==='편재격') && (_raw['겁재']||0) >= 1){
      pagyeokInfo = '겁재탈재(劫財奪財) — 재물이 들어와도 빠져나감. 동업·보증 주의';
      yongshin = '관성(제겁재) — 관성으로 겁재를 제어하여 재성 보호'; yongshinType = '파격조정';
    }
    else if(gyeokgukName==='편관격' && (_raw['식신']||0) < 0.5 && (_raw['편인']||0) < 0.5){
      pagyeokInfo = '칠살무제(七殺無制) — 편관의 압박을 제어할 식신이 없음. 극심한 스트레스';
      yongshin = '식신(제살) — 식신으로 편관을 제어해야 안정'; yongshinType = '파격조정';
    }
    else if(gyeokgukName==='편인격' && (_raw['식신']||0) >= 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 편인이 식신을 극함. 생각만 많고 표현이 막힘';
      yongshin = '편재(제편인) — 편재로 편인을 제어'; yongshinType = '파격조정';
    }
  }

  if (isJonggyeok && !isHwakyeok) {
    gyeokgukName = jonggyeokName;
    gyeokgukDesc = jonggyeokDesc;
    gyeokgukBasis = '종격 판별: 한쪽 세력이 압도적 (자기편비율 ' + Math.round(selfRatio*100) + '%)';
  }

  var totalStr = selfStr + otherStr;
  var strengthScore = totalStr > 0 ? Math.round(selfStr / totalStr * 100) : 50;
  var strengthGrade = '';
  if (strengthScore >= 80) strengthGrade = '극신강';
  else if (strengthScore >= 60) strengthGrade = '신강';
  else if (strengthScore >= 45) strengthGrade = '중화';
  else if (strengthScore >= 25) strengthGrade = '신약';
  else strengthGrade = '극신약';

  var ohOrder = ['목','화','토','금','수'];
  var flowCuts = [];
  var flowStrong = [];
  for (var fi = 0; fi < 5; fi++) {
    var from = ohOrder[fi];
    var to = ohOrder[(fi + 1) % 5];
    var fromCnt = el[from] || 0;
    var toCnt = el[to] || 0;
    var key = from + to;
    if (fromCnt >= 1 && toCnt === 0 && OHENG_FLOW_DESC[key]) {
      flowCuts.push(OHENG_FLOW_DESC[key].chain + ' 단절 (' + OHENG_FLOW_DESC[key].cut + ')');
    }
    if (fromCnt >= 2 && toCnt >= 2) {
      flowStrong.push(from + '→' + to + ' 강력 (에너지가 풍부하게 흐름)');
    }
  }
  var flowText = '';
  if (flowCuts.length > 0) flowText += '단절: ' + flowCuts.join(' / ');
  if (flowStrong.length > 0) flowText += (flowText ? '\n' : '') + '강한흐름: ' + flowStrong.join(', ');
  if (!flowText) flowText = '모든 오행이 고르게 순환하는 구조 (균형형)';
  var flowSummary = '오행분포: ' + ohOrder.map(function(o){ return o + '=' + (el[o]||0); }).join(' ') + '\n' + flowText;

  var napeumInfo = getNapeum(dg, saju.raw.dj);
  var napeumText = napeumInfo ? napeumInfo.name + ' — ' + napeumInfo.desc : '';

  return{cnt:cnt,dominant:dominant,weak:weak,strong:strong,
    yongshin:yongshin,yongshinType:yongshinType,ohMap:ohMap,
    selfStr:selfStr,otherStr:otherStr,lack:lack,domOh:sr[0],
    deukryeong:deukryeong,
    season:season,seasonName:seasonName,johuNeeds:johuNeeds,johuDesc:johuDesc,johuYongshin:johuYongshin,
    gyeokgukName:gyeokgukName, gyeokgukDesc:gyeokgukDesc, gyeokgukBasis:gyeokgukBasis,
    strengthScore:strengthScore, strengthGrade:strengthGrade,
    flowSummary:flowSummary, napeumText:napeumText,
    isJonggyeok:isJonggyeok, jonggyeokName:jonggyeokName,
    pagyeokInfo:pagyeokInfo, isHwakyeok:isHwakyeok
  };
}

/* ====== 궁위 컨텍스트 빌더 ====== */
function buildGungwiContext(saju, gg) {
  var result = {};
  var jiSSArr = saju.jiSS || [];

  var spouseSS = jiSSArr[2] ? jiSSArr[2].ss : null;
  if (spouseSS && SS_CONTEXT[spouseSS]) {
    result.spouse = '★배우자궁 읽기: ' + SS_CONTEXT[spouseSS].spouse;
  }

  var careerSS = jiSSArr[1] ? jiSSArr[1].ss : null;
  if (careerSS && SS_CONTEXT[careerSS]) {
    result.career = '★직업궁 읽기: ' + SS_CONTEXT[careerSS].career;
  }

  var childSS = jiSSArr[3] ? jiSSArr[3].ss : null;
  if (childSS && SS_CONTEXT[childSS]) {
    result.child = '★노후궁 읽기: ' + SS_CONTEXT[childSS].child;
  }

  var outerSS = jiSSArr[0] ? jiSSArr[0].ss : null;
  if (outerSS && SS_CONTEXT[outerSS]) {
    result.outer = '★외부환경 읽기: ' + SS_CONTEXT[outerSS].outer;
  }

  return result;
}

/* ====== 신살 스토리 생성 ====== */
function buildSinsalStory(saju) {
  var stories = [];
  if (saju.specialSals) {
    saju.specialSals.forEach(function(s) {
      var story = SINSAL_STORY[s.name];
      if (story) {
        stories.push('★' + s.name + '(' + s.desc + '): ' + story);
      }
    });
  }
  if (typeof calcExtraSinsal === 'function') {
    var extras = calcExtraSinsal(saju);
    extras.forEach(function(es) {
      var story = SINSAL_STORY[es.name];
      if (story && stories.every(function(s){ return s.indexOf(es.name) < 0; })) {
        stories.push('★' + es.name + '(' + es.desc + '): ' + story);
      }
    });
  }
  return stories.join('\n');
}

/* ====== 올해 핵심 사건 요약 ====== */
function buildYearHighlight(dwSeAnalysis, dw, wolunArr, wonJiArr) {
  var highlights = [];

  if (dwSeAnalysis.seun1.length > 0) {
    dwSeAnalysis.seun1.forEach(function(d) {
      var prefix = '';
      if (d.type.indexOf('충') >= 0) prefix = '⚡변화: ';
      else if (d.type.indexOf('합') >= 0) prefix = '💫기회: ';
      else if (d.type.indexOf('형') >= 0) prefix = '🔥시련: ';
      highlights.push(prefix + d.desc + (d.impact ? ' → ' + d.impact + ' 영역에 영향' : ''));
    });
  }

  var hotMonths = [];
  if (wolunArr) {
    wolunArr.forEach(function(w) {
      if (w.group === '관성') hotMonths.push(w.month + ': 책임·압박의 달, 직장에서 긴장 가능');
      if (w.group === '재성') hotMonths.push(w.month + ': 재물 기회의 달, 돈이 움직임');
    });
  }

  return {
    main: highlights.length > 0 ? highlights.join('\n') : '올해 특별한 합충 없음',
    hotMonths: hotMonths.length > 0 ? hotMonths.slice(0, 3).join('\n') : ''
  };
}

/* ====== 궁합 분석 엔진 ====== */
function analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB) {
  var R={scores:{love:50,comm:50,values:50,work:50,total:0},
    details:{gan:[],ji:[],ohBowan:[],mbti:[],dw:[]},keywords:[]};
  var rA=sajuA.raw, rB=sajuB.raw;
  var pillarG=['년간','월간','일간','시간'], pillarJ=['년지','월지','일지','시지'];
  var gungwi=['외부환경','직업사회','배우자건강','자녀노후'];

  var gA=[rA.yg,rA.mg,rA.dg,rA.hg], gB=[rB.yg,rB.mg,rB.dg,rB.hg];
  var dgRel={ganA:TGAN_KR[rA.dg],ganB:TGAN_KR[rB.dg],rels:[]};
  GH_GANHAP.forEach(function(h){
    if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0]))
      dgRel.rels.push({t:'합',d:'일간합('+h[2]+') — 본질이 하나로 합쳐지는 인연'});
  });
  GH_CHUNG_G.forEach(function(c){
    if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0]))
      dgRel.rels.push({t:'충',d:'일간충 — 강한 끌림이자 강한 마찰'});
  });
  if(rA.dg===rB.dg) dgRel.rels.push({t:'비화',d:'같은 일간 — 거울 같은 관계'});
  if(dgRel.rels.length===0){
    var oA=OHAENG_TGAN[rA.dg],oB=OHAENG_TGAN[rB.dg];
    if(OH_SANG[oA]===oB) dgRel.rels.push({t:'생',d:'A('+oA+')가 B('+oB+')를 생 — 자연스러운 돌봄'});
    else if(OH_SANG[oB]===oA) dgRel.rels.push({t:'생',d:'B('+oB+')가 A('+oA+')를 생 — 자연스러운 돌봄'});
    else if(OH_GEUK[oA]===oB) dgRel.rels.push({t:'극',d:'A('+oA+')가 B('+oB+')를 극 — 긴장감'});
    else if(OH_GEUK[oB]===oA) dgRel.rels.push({t:'극',d:'B('+oB+')가 A('+oA+')를 극 — 긴장감'});
  }
  R.details.gan.push(dgRel);

  for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
    if(gA[ai]==null||gB[bi]==null) continue;
    GH_GANHAP.forEach(function(h){
      if((gA[ai]===h[0]&&gB[bi]===h[1])||(gA[ai]===h[1]&&gB[bi]===h[0]))
        R.details.gan.push({type:'천간합',pA:pillarG[ai],pB:pillarG[bi],
          desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'합('+h[2]+') '+pillarG[ai]+'↔'+pillarG[bi],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'});
    });
    GH_CHUNG_G.forEach(function(c){
      if((gA[ai]===c[0]&&gB[bi]===c[1])||(gA[ai]===c[1]&&gB[bi]===c[0]))
        R.details.gan.push({type:'천간충',pA:pillarG[ai],pB:pillarG[bi],
          desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'충 '+pillarG[ai]+'↔'+pillarG[bi],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'});
    });
  }

  var jA=[rA.yj,rA.mj,rA.dj,rA.hj], jB=[rB.yj,rB.mj,rB.dj,rB.hj];
  for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
    if(jA[ai]==null||jB[bi]==null) continue;
    var ja=jA[ai], jb=jB[bi];
    GH_YUKHAP.forEach(function(h){
      if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0]))
        R.details.ji.push({type:'육합',pA:pillarJ[ai],pB:pillarJ[bi],
          jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],hapOh:h[2],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',
          gungwi:gungwi[ai]+'↔'+gungwi[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'합('+h[2]+') '+pillarJ[ai]+'↔'+pillarJ[bi]});
    });
    GH_CHUNG_J.forEach(function(c){
      if((ja===c[0]&&jb===c[1])||(ja===c[1]&&jb===c[0]))
        R.details.ji.push({type:'충',pA:pillarJ[ai],pB:pillarJ[bi],
          jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',
          gungwi:gungwi[ai]+'↔'+gungwi[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'충 '+pillarJ[ai]+'↔'+pillarJ[bi]});
    });
    GH_HYUNG.forEach(function(h){
      if(ja===h[0]&&jb===h[1])
        R.details.ji.push({type:'형',pA:pillarJ[ai],pB:pillarJ[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'형 — 갈등을 통한 성장',imp:'중'});
    });
    GH_HAE.forEach(function(h){
      if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0]))
        R.details.ji.push({type:'해',pA:pillarJ[ai],pB:pillarJ[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'해 — 은밀한 오해 주의',imp:'중'});
    });
  }

  var ohA=sajuA.elFull||sajuA.el, ohB=sajuB.elFull||sajuB.el;
  var lackA=sajuA.lackFull||[], lackB=sajuB.lackFull||[];
  lackA.forEach(function(o){if(ohB[o]&&ohB[o]>=2) R.details.ohBowan.push({dir:'B→A',oh:o,d:'B가 A의 부족한 '+o+' 보완'});});
  lackB.forEach(function(o){if(ohA[o]&&ohA[o]>=2) R.details.ohBowan.push({dir:'A→B',oh:o,d:'A가 B의 부족한 '+o+' 보완'});});
  var dmOhA=sajuA.dmEl, dmOhB=sajuB.dmEl, dmOhRel='';
  if(OH_SANG[dmOhA]===dmOhB){dmOhRel='A생B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')가 B('+dmOhB+')를 생 — 자연스러운 케어'});}
  else if(OH_SANG[dmOhB]===dmOhA){dmOhRel='B생A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')가 A('+dmOhA+')를 생'});}
  else if(OH_GEUK[dmOhA]===dmOhB){dmOhRel='A극B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')가 B('+dmOhB+')를 극 — 긴장감'});}
  else if(OH_GEUK[dmOhB]===dmOhA){dmOhRel='B극A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')가 A('+dmOhA+')를 극'});}
  else if(dmOhA===dmOhB){dmOhRel='비화';R.details.ohBowan.push({dir:'양방',d:'같은 오행('+dmOhA+') — 공감 최고, 보완 부족'});}

  var cfA=mbtiObjA.cf.split('-'), cfB=mbtiObjB.cf.split('-');
  var m1=getCFC(cfA[0],cfB[0]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[0],t:'주기능',s:m1.s,d:m1.d});
  var m2=getCFC(cfA[0],cfB[1]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[1],t:'A주↔B부',s:m2.s,d:m2.d});
  var m3=getCFC(cfB[0],cfA[1]); R.details.mbti.push({pair:cfB[0]+'↔'+cfA[1],t:'B주↔A부',s:m3.s,d:m3.d});
  var axisNames=['EI','SN','TF','JP'];
  for(var xi=0;xi<4;xi++){
    var aA=mbtiObjA.axes[xi],aB=mbtiObjB.axes[xi],same=(aA.side===aB.side);
    var axScore=same?7:5;
    if(axisNames[xi]==='SN'&&!same) axScore=4;
    if(axisNames[xi]==='TF'&&!same) axScore=5;
    R.details.mbti.push({axis:axisNames[xi],sA:aA.side,sB:aB.side,same:same,s:axScore,
      d:same?'같은 '+aA.side+'형 — 공감대 높음':'다른 축('+aA.side+'↔'+aB.side+') — 보완과 갈등'});
  }

  if(dwA&&dwB&&dwA.daewoons&&dwB.daewoons){
    var cdA=dwA.currentDWIdx>=0?dwA.daewoons[dwA.currentDWIdx]:null;
    var cdB=dwB.currentDWIdx>=0?dwB.daewoons[dwB.currentDWIdx]:null;
    var goodSS=['식신','정재','정관','정인'];
    if(cdA&&cdB){
      var aG=goodSS.indexOf(cdA.ss)>=0, bG=goodSS.indexOf(cdB.ss)>=0;
      R.details.dw.push({type:'현재대운',
        dA:cdA.gan+cdA.ji+'('+cdA.startAge+'~'+cdA.endAge+'세,'+cdA.ss+')',
        dB:cdB.gan+cdB.ji+'('+cdB.startAge+'~'+cdB.endAge+'세,'+cdB.ss+')',
        sync:aG&&bG?'동반 상승기':aG?'A가 B를 끌어올리는 시기':bG?'B가 A를 끌어올리는 시기':'함께 인내하는 시기'});
    }
    if(dwA.seun&&dwB.seun){
      for(var si=0;si<Math.min(dwA.seun.length,dwB.seun.length,3);si++){
        var sA=dwA.seun[si],sB=dwB.seun[si];
        if(sA&&sB){
          var saG=goodSS.indexOf(sA.ss)>=0, sbG=goodSS.indexOf(sB.ss)>=0;
          R.details.dw.push({type:sA.y+'년',
            dA:sA.gan+sA.ji+'('+sA.ss+')',dB:sB.gan+sB.ji+'('+sB.ss+')',
            sync:saG&&sbG?'두 사람 모두 좋은 해':saG?'A에게 유리':sbG?'B에게 유리':'조심해야 할 해'});
        }
      }
    }
  }

  var love=50,comm=50,val=50,work=50;
  dgRel.rels.forEach(function(r){
    if(r.t==='합')love+=20;else if(r.t==='충')love-=5;else if(r.t==='비화')love+=5;
    else if(r.t==='생')love+=10;else if(r.t==='극')love-=3;
  });
  R.details.ji.forEach(function(r){
    var isDJ=(r.pA==='일지'&&r.pB==='일지');
    var isMJ=(r.pA==='월지'||r.pB==='월지');
    var isYJ=(r.pA==='년지'&&r.pB==='년지');
    if(isDJ){if(r.type==='육합')love+=18;else if(r.type==='충')love-=8;else if(r.type==='형')love-=4;}
    if(isMJ){if(r.type==='육합')comm+=8;else if(r.type==='충')comm-=5;}
    if(isYJ){if(r.type==='육합')val+=8;else if(r.type==='충')val-=4;}
  });
  if(R.details.ohBowan.length>0) love+=Math.min(R.details.ohBowan.length*3,10);
  R.details.mbti.forEach(function(c){
    if(c.t==='주기능')comm+=(c.s-5)*4;
    if(c.t==='A주↔B부'||c.t==='B주↔A부')comm+=(c.s-5)*2;
    if(c.axis==='TF'){love+=(c.s-5)*2;val+=(c.s-5)*3;}
    if(c.axis==='EI')love+=(c.s-5);
    if(c.axis==='SN'){comm+=(c.s-5)*2;val+=(c.s-5)*2;}
    if(c.axis==='JP'){work+=(c.s-5)*3;val+=(c.s-5)*2;}
  });
  R.details.gan.forEach(function(r){if(r.type==='천간합')work+=5;else if(r.type==='천간충')work-=3;});
  if(dmOhRel==='A생B'||dmOhRel==='B생A')val+=8;
  else if(dmOhRel==='비화')val+=5;
  else if(dmOhRel==='A극B'||dmOhRel==='B극A')val-=3;
  love=Math.max(20,Math.min(98,love));comm=Math.max(20,Math.min(98,comm));
  val=Math.max(20,Math.min(98,val));work=Math.max(20,Math.min(98,work));
  R.scores={love:love,comm:comm,values:val,work:work,total:Math.round(love*.35+comm*.25+val*.25+work*.15)};

  dgRel.rels.forEach(function(r){R.keywords.push('★일간: '+dgRel.ganA+'↔'+dgRel.ganB+' '+r.d);});
  R.details.gan.forEach(function(r){if(r.type)R.keywords.push(r.desc+' ['+r.imp+']');});
  R.details.ji.forEach(function(r){R.keywords.push(r.type+': '+r.desc+' ['+r.imp+'] ('+r.gungwi+')');});
  R.details.ohBowan.forEach(function(r){R.keywords.push('오행보완: '+r.d);});
  R.details.mbti.forEach(function(c){
    if(c.pair)R.keywords.push('인지기능 '+c.pair+'('+c.t+'): '+c.d+' ['+c.s+'/10]');
    else if(c.axis)R.keywords.push(c.axis+'축: '+c.d+' ['+c.s+'/10]');
  });
  R.details.dw.forEach(function(d){R.keywords.push(d.type+': '+d.sync);});

  console.log('[MBTS] 궁합 분석 완료. 종합:'+R.scores.total+'점, 키워드:'+R.keywords.length+'개');
  return R;
}

/* ====== 궁합 AI 유저 프롬프트 생성 ====== */
function buildGunghapUserPrompt(ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB, relType) {
  var cfN={Fi:'내면의 심판관(Fi)',Fe:'분위기 리더기(Fe)',Ne:'가능성 탐색기(Ne)',Ni:'미래 내비게이션(Ni)',Si:'추억 저장소(Si)',Se:'현장 체험러(Se)',Ti:'내장 논리회로(Ti)',Te:'실행력 엔진(Te)'};
  var cfAArr=mbtiA.cf.split('-'), cfBArr=mbtiB.cf.split('-');

  var p='## 궁합 분석 의뢰\n\n';
  p+='### 사람 A (나)\n';
  p+='- 사주: '+sajuA.P.map(function(x){return x.l+' '+x.s+x.b;}).join(' | ')+'\n';
  p+='- 일주: '+sajuA.P[2].s+sajuA.P[2].b+' · 일간: '+sajuA.dm+'('+sajuA.dmEl+')\n';
  p+='- 격국: '+ggA.gyeokgukName+' · 강도: '+ggA.strengthGrade+'\n';
  p+='- MBTI: '+mbtiA.type+' ('+mbtiA.cf+', 주기능: '+(cfN[cfAArr[0]]||cfAArr[0])+')\n';
  p+='- 오행: 목='+sajuA.el['목']+' 화='+sajuA.el['화']+' 토='+sajuA.el['토']+' 금='+sajuA.el['금']+' 수='+sajuA.el['수']+'\n\n';

  p+='### 사람 B (상대방)\n';
  p+='- 사주: '+sajuB.P.map(function(x){return x.l+' '+x.s+x.b;}).join(' | ')+'\n';
  p+='- 일주: '+sajuB.P[2].s+sajuB.P[2].b+' · 일간: '+sajuB.dm+'('+sajuB.dmEl+')\n';
  p+='- 격국: '+ggB.gyeokgukName+' · 강도: '+ggB.strengthGrade+'\n';
  p+='- MBTI: '+mbtiB.type+' ('+mbtiB.cf+', 주기능: '+(cfN[cfBArr[0]]||cfBArr[0])+')\n';
  p+='- 오행: 목='+sajuB.el['목']+' 화='+sajuB.el['화']+' 토='+sajuB.el['토']+' 금='+sajuB.el['금']+' 수='+sajuB.el['수']+'\n\n';

  p+='### 엔진 계산 점수\n';
  p+='종합: '+ghResult.scores.total+'점 · 연애: '+ghResult.scores.love+'% · 소통: '+ghResult.scores.comm+'% · 가치관: '+ghResult.scores.values+'% · 업무: '+ghResult.scores.work+'%\n\n';

  p+='### 교차 분석 키워드 (AI 참고)\n';
  ghResult.keywords.forEach(function(k){p+='- '+k+'\n';});

  p+='\n### 대운 동기화\n';
  ghResult.details.dw.forEach(function(d){p+='- '+d.type+': A='+d.dA+' / B='+d.dB+' → '+d.sync+'\n';});

  if(mbtiA.profile) p+='\n### A의 MBTI 강도\n'+mbtiA.profile+'\n';
  if(mbtiB.profile) p+='\n### B의 MBTI 강도\n'+mbtiB.profile+'\n';

  try {
    if (typeof MT_buildFullContext === 'function') {
      p += '\n\n## A의 MBTI 이론 심층\n' + MT_buildFullContext(mbtiA.type, null, null, mbtiB.type);
      p += '\n\n## B의 MBTI 이론 심층\n' + MT_buildFullContext(mbtiB.type, null, null, mbtiA.type);
    }
    if (typeof SJ_buildFullContext === 'function') {
      p += '\n\n## A의 사주 이론 심층\n' + SJ_buildFullContext(sajuA, ggA, dwA, null, sajuB, ggB);
      p += '\n\n## B의 사주 이론 심층\n' + SJ_buildFullContext(sajuB, ggB, dwB, null, sajuA, ggA);
    }
  } catch(e) { console.warn('[MBTS] 궁합 Theory 주입 실패:', e); }

  try {
    if (typeof buildPatternPrompt === 'function' && typeof buildUserTags === 'function') {
      var userTagsA = buildUserTags(sajuA, ggA, dwA, mbtiA.type, null);
      var userTagsB = buildUserTags(sajuB, ggB, dwB, mbtiB.type, null);
      var combinedTags = userTagsA.concat(userTagsB);
      var ghCatMap = {
        '썸': 'ssom', 'ssom': 'ssom',
        '연인': 'lover', 'lover': 'lover',
        '직장': 'colleague', 'colleague': 'colleague',
        '친구': 'friend', 'friend': 'friend'
      };
      var ghCat = ghCatMap[relType] || 'lover';
      var ghPatternText = buildPatternPrompt(ghCat, combinedTags);
      if (ghPatternText) {
        p += '\n\n## 교수 토론 교차 패턴\n' +
          '아래는 이 소주제에 대한 교수 토론 중 나온 패턴들이다.\n' +
          '위 theory 데이터를 기준으로 이 중 실제로 해당하는 3~4개만 골라서 풀이에 녹여라.\n' +
          '해당하지 않는 것은 무시하라.\n\n' +
          ghPatternText + '\n';
      }
    }
  } catch(e) { console.warn('[MBTS] 궁합 패턴 주입 실패:', e); }

  p+='\n위 데이터를 기반으로 궁합 풀이를 JSON으로 작성하세요. 점수를 그대로 사용하세요.\n';
  return p;
}

/* ====== 합/충/형 계산 엔진 ====== */
function calcRelations(saju){
  var r=saju.raw,result={cheonganHap:[],cheonganChung:[],jijiHap:[],jijiSamhap:[],jijiChung:[],jijiHyung:[],jijiPa:[],jijiHae:[]};
  var gans=[],jis=[];
  var labels=['연','월','일','시'];
  if(r.yg!=null)gans.push({v:r.yg,l:'연간'});
  if(r.mg!=null)gans.push({v:r.mg,l:'월간'});
  gans.push({v:r.dg,l:'일간'});
  if(r.hg!=null)gans.push({v:r.hg,l:'시간'});
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});

  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_HAP.length;k++){
      var h=CHEONGAN_HAP[k];
      if((gans[i].v===h[0]&&gans[j].v===h[1])||(gans[i].v===h[1]&&gans[j].v===h[0]))
        result.cheonganHap.push({a:gans[i],b:gans[j],oh:h[2],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'합'+h[2]});
    }
  }
  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_CHUNG.length;k++){
      var cc=CHEONGAN_CHUNG[k];
      if((gans[i].v===cc[0]&&gans[j].v===cc[1])||(gans[i].v===cc[1]&&gans[j].v===cc[0]))
        result.cheonganChung.push({a:gans[i],b:gans[j],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'충',name:cc[2]});
    }
  }
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_YUKHAP.length;k++){
      var h=JIJI_YUKHAP[k];
      if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
        result.jijiHap.push({a:jis[i],b:jis[j],oh:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'합'+h[2]});
    }
  }
  for(var k=0;k<JIJI_SAMHAP.length;k++){
    var s=JIJI_SAMHAP[k],found=[];
    for(var i=0;i<jis.length;i++){if(jis[i].v===s[0]||jis[i].v===s[1]||jis[i].v===s[2])found.push(jis[i]);}
    if(found.length>=2){
      var hasCenter=found.some(function(f){return f.v===s[1];});
      if(hasCenter)result.jijiSamhap.push({members:found,oh:s[3],desc:found.map(function(f){return JIJI_KR[f.v];}).join('')+(found.length===3?'삼합':'반합')+s[3]});
    }
  }
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_CHUNG.length;k++){
      var c=JIJI_CHUNG[k];
      if((jis[i].v===c[0]&&jis[j].v===c[1])||(jis[i].v===c[1]&&jis[j].v===c[0]))
        result.jijiChung.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'충'});
    }
  }
  for(var i=0;i<jis.length;i++)for(var j=i;j<jis.length;j++){
    if(i===j&&jis[i].v===jis[j].v)continue;
    for(var k=0;k<JIJI_HYUNG.length;k++){
      var h=JIJI_HYUNG[k];
      if(h[0]===h[1]){
        if(i!==j&&jis[i].v===h[0]&&jis[j].v===h[1])
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }else{
        if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }
    }
  }
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_HAE.length;k++){
      var hae=JIJI_HAE[k];
      if((jis[i].v===hae[0]&&jis[j].v===hae[1])||(jis[i].v===hae[1]&&jis[j].v===hae[0]))
        result.jijiHae.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'해',name:hae[2]});
    }
  }
  return result;
}

/* ====== 공망(空亡) 계산 ====== */
function calcGongmang(saju){
  var r=saju.raw, dg=r.dg, dj=r.dj;
  var idx60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){idx60=k;break;}}
  if(idx60<0)return{gm:[],gmNames:[],affected:[]};
  var xunNum=Math.floor(idx60/10), xunStart=xunNum*10;
  var usedJi=[];for(var k=xunStart;k<xunStart+10;k++)usedJi.push(k%12);
  var gmA=[];for(var j=0;j<12;j++)if(usedJi.indexOf(j)<0)gmA.push(j);
  var GMT={0:[10,11],1:[8,9],2:[6,7],3:[4,5],4:[2,3],5:[0,1]};
  var gmB=GMT[xunNum];
  if(gmA[0]!==gmB[0]||gmA[1]!==gmB[1])console.warn('공망 A/B 불일치!');
  var gmNames=gmA.map(function(j){return JIJI_KR[j];});
  var pillars=[{v:r.yj,l:'연지'},{v:r.mj,l:'월지'},{v:r.dj,l:'일지'}];
  if(r.hj!=null)pillars.push({v:r.hj,l:'시지'});
  var affected=[];
  pillars.forEach(function(p){if(p.v!=null&&gmA.indexOf(p.v)>=0)affected.push(p.l+'('+JIJI_KR[p.v]+')');});
  return{gm:gmA,gmNames:gmNames,affected:affected,
    desc:gmNames.join('·')+'공망'+(affected.length>0?' → '+affected.join(', ')+'에 해당':'→ 사주 내 해당 없음')};
}

/* ====== 지장간 힘 비율 계산 ====== */
function calcJijangganRatio(saju){
  var r=saju.raw, dg=r.dg;
  var labels=['연지','월지','일지','시지'];
  var jiVals=[r.yj,r.mj,r.dj,r.hj];
  var result=[];
  for(var i=0;i<4;i++){
    if(jiVals[i]==null){result.push(null);continue;}
    var jjgRaw=JIJANGGAN_DATA[jiVals[i]];
    var total=0;jjgRaw.forEach(function(it){total+=it.d;});
    var items=jjgRaw.map(function(it,idx){
      var ganName=TGAN_KR[it.g];
      var oh=OHAENG_TGAN[it.g];
      var ss=getSipsung(dg,it.g);
      var pct=Math.round(it.d/total*100);
      var role=idx===jjgRaw.length-1?'정기':idx===0?'여기':'중기';
      return{gan:ganName,oh:oh,ss:ss,days:it.d,pct:pct,role:role};
    });
    result.push({pillar:labels[i],ji:JIJI_KR[jiVals[i]],items:items});
  }
  return result;
}

/* ====== 신살 해석 ====== */
function enrichSinsal(saju){
  var base=saju.specialSals.map(function(s){
    var kw=SINSAL_KEYWORDS[s.name];
    if(!kw)return {name:s.name,text:s.name+'('+s.desc+')'};
    return {name:s.name,text:s.name+'('+s.desc+') — '+kw.meaning+', '+kw.personality};
  });
  var baseNames={};
  base.forEach(function(b){baseNames[b.name]=(baseNames[b.name]||0)+1;});
  var extra=calcExtraSinsal(saju).filter(function(e){
    if(baseNames[e.name])return false;
    return true;
  }).map(function(e){
    return {name:e.name,text:e.name+'('+e.desc+') — '+e.meaning+', '+e.personality};
  });
  return base.concat(extra).map(function(item){return item.text;}).join(' / ');
}

/* ====== 추가 신살 계산 ====== */
function calcExtraSinsal(saju){
  var r=saju.raw,result=[];
  var dg=r.dg,dj=r.dj;
  var jis=[];
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});
  var allGans=[];
  if(r.yg!=null)allGans.push(r.yg);
  if(r.mg!=null)allGans.push(r.mg);
  allGans.push(r.dg);
  if(r.hg!=null)allGans.push(r.hg);
  var allJis=jis.map(function(j){return j.v;});
  var ilju60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){ilju60=k;break;}}

  if([16,46,28,58].indexOf(ilju60)>=0)
    result.push({name:'괴강살',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'극단적 카리스마와 추진력, 타협을 모르는 강한 성격',
      personality:'완벽주의, 고독한 리더, 한번 결정하면 끝까지 밀어붙임'});

  var YANGIN=[3,4,6,7,6,7,9,10,0,1];
  var yJi=YANGIN[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===yJi){
      result.push({name:'양인살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'날카로운 결단력과 강한 추진력',
        personality:'승부욕 강함, 위기에 강한 돌파력'});break;}}

  var HONGYEOM=[6,8,2,7,4,4,10,9,0,8];
  var hJi=HONGYEOM[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===hJi){
      result.push({name:'홍염살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'강렬한 이성 매력과 정열적 에너지',
        personality:'매혹적 분위기, 예술적 감수성'});break;}}

  var GANYEO=[[0,2],[1,5],[4,6],[6,8],[7,9]];
  for(var i=0;i<GANYEO.length;i++){
    if(dg===GANYEO[i][0]&&dj===GANYEO[i][1]){
      result.push({name:'간여지동',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
        meaning:'일간과 일지의 기운이 같은 방향으로 치우침',
        personality:'고집이 강함, 독립적 성향'});break;}}

  var hasJi=function(v){return allJis.indexOf(v)>=0;};
  if(hasJi(10)&&hasJi(11))
    result.push({name:'천라',desc:'술+해 동시 존재',
      meaning:'하늘 그물에 걸린 형상, 답답함과 정체감',
      personality:'노력해도 막히는 느낌, 큰 인내 필요'});
  if(hasJi(4)&&hasJi(5))
    result.push({name:'지망',desc:'진+사 동시 존재',
      meaning:'땅 그물에 걸린 형상, 현실적 제약',
      personality:'환경적 제약이 많음, 실질적 돌파구 필요'});

  if([12,13,14,27,28,29,42,43,44,57,58,59].indexOf(ilju60)>=0)
    result.push({name:'음양차착',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'음양 에너지가 엇갈리는 구조',
      personality:'이중적 면모, 오해 받기 쉬움'});

  var WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<WONJIN.length;w++){
      if((jis[i].v===WONJIN[w][0]&&jis[j].v===WONJIN[w][1])||(jis[i].v===WONJIN[w][1]&&jis[j].v===WONJIN[w][0])){
        result.push({name:'원진살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'서로 밀어내는 미묘한 부조화',
          personality:'가까운 관계에서 애증 교차'});}}}}

  var GUIMUN=[[0,9],[1,6],[2,7],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<GUIMUN.length;w++){
      if((jis[i].v===GUIMUN[w][0]&&jis[j].v===GUIMUN[w][1])||(jis[i].v===GUIMUN[w][1]&&jis[j].v===GUIMUN[w][0])){
        result.push({name:'귀문관살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'예민한 영적 감수성과 강한 직감',
          personality:'신경 예민, 꿈이나 영감이 강함'});}}}}

  var CHEONDUK=[{t:1,v:5},{t:0,v:6},{t:0,v:3},{t:0,v:7},{t:0,v:8},{t:0,v:7},{t:1,v:11},{t:0,v:0},{t:0,v:9},{t:1,v:2},{t:0,v:2},{t:0,v:1}];
  if(r.mj!=null){var cd=CHEONDUK[r.mj];var cdf=false;
    if(cd.t===0){for(var i=0;i<allGans.length;i++){if(allGans[i]===cd.v){cdf=true;break;}}}
    else{for(var i=0;i<allJis.length;i++){if(allJis[i]===cd.v){cdf=true;break;}}}
    if(cdf)result.push({name:'천덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+(cd.t===0?TGAN_KR[cd.v]:JIJI_KR[cd.v]),
      meaning:'하늘의 덕, 재앙을 막아주는 귀인',
      personality:'관대하고 인덕이 있음, 위기에서 보호'});}

  var WOLDUK={2:2,6:2,10:2,8:8,0:8,4:8,5:6,9:6,1:6,11:0,3:0,7:0};
  if(r.mj!=null&&WOLDUK[r.mj]!==undefined){var wdG=WOLDUK[r.mj];
    for(var i=0;i<allGans.length;i++){if(allGans[i]===wdG){
      result.push({name:'월덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+TGAN_KR[wdG],
        meaning:'달의 덕, 재앙을 막아주는 귀인',
        personality:'너그럽고 복이 있음'});break;}}}

  return result;
}

/* ====== 프로파일 분석기 ====== */
function profileAnalysis(saju,gg,rel){
  var dm=saju.dm,dmEl=saju.dmEl;
  var dayBrSS=saju.ss[2]?saju.ss[2].ss:'',dayUns=saju.uns[2]||'';
  var ySS=saju.ss[0]?saju.ss[0].ss:'',mSS=saju.ss[1]?saju.ss[1].ss:'',hSS=saju.ss[3]?saju.ss[3].ss:'';
  var strongUns=['건록','제왕','관대','장생'].indexOf(dayUns)>=0;

  var ssCount={};
  saju.ss.forEach(function(s){if(s.ss){ssCount[s.ss]=(ssCount[s.ss]||0)+1;}});

  var salGood=saju.specialSals.filter(function(s){return s.type==='good';});
  var salBad=saju.specialSals.filter(function(s){return s.type==='bad';});
  var hasDohwa=salBad.some(function(s){return s.name==='도화살';});
  var hasYeokma=saju.specialSals.some(function(s){return s.name==='역마살';});
  var hasBaekho=salBad.some(function(s){return s.name==='백호살';});
  var hasGwimun=salBad.some(function(s){return s.name==='귀문관살';});
  var hasCheonEul=salGood.some(function(s){return s.name==='천을귀인';});

  var chungList=rel.jijiChung.map(function(c){return c.desc;});
  var hapList=rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;}));
  var samhapList=rel.jijiSamhap.map(function(h){return h.desc;});
  var hyungList=rel.jijiHyung.map(function(h){return h.desc;});

  var elSorted=Object.entries(saju.el).sort(function(a,b){return b[1]-a[1];});
  var maxEl=elSorted[0],minEl=elSorted[elSorted.length-1];
  var excessEl=(maxEl[1]>=4)?maxEl[0]:null;
  var zeroEls=gg.lack;

  var energyType='balanced';
  if(gg.cnt['식상']>=2.5) energyType='expressive';
  else if(gg.cnt['비겁']>=2.5) energyType='independent';
  else if(gg.cnt['재성']>=2.5) energyType='practical';
  else if(gg.cnt['관성']>=2.5) energyType='disciplined';
  else if(gg.cnt['인성']>=2.5) energyType='intellectual';

  var angerType='suppress';
  if(ssCount['상관']>=1) angerType='verbal';
  else if(ssCount['겁재']>=1) angerType='explosive';
  else if(dmEl==='화') angerType='flashfire';
  else if(dmEl==='수') angerType='flood';
  else if(dmEl==='금') angerType='blade';
  else if(dmEl==='토') angerType='earthquake';
  else if(dmEl==='목') angerType='stubborn';

  var loveType='standard';
  if(hasDohwa) loveType='charming';
  else if(dayBrSS.indexOf('편관')>=0||dayBrSS.indexOf('정관')>=0) loveType='authoritative';
  else if(dayBrSS.indexOf('식신')>=0||dayBrSS.indexOf('상관')>=0) loveType='romantic';
  else if(dayBrSS.indexOf('비견')>=0||dayBrSS.indexOf('겁재')>=0) loveType='independent';
  else if(dayBrSS.indexOf('인')>=0) loveType='intellectual';
  else if(dayBrSS.indexOf('재')>=0) loveType='devoted';

  var wealthType='none';
  if(ssCount['편재']>=2) wealthType='windfall';
  else if(ssCount['정재']>=1&&ssCount['편재']>=1) wealthType='dual';
  else if(ssCount['정재']>=1) wealthType='steady';
  else if(ssCount['편재']>=1) wealthType='venture';
  else if(gg.cnt['식상']>=2) wealthType='talent';
  else wealthType='late';

  return {
    dm:dm,dmEl:dmEl,dayBrSS:dayBrSS,dayUns:dayUns,strongUns:strongUns,
    ySS:ySS,mSS:mSS,hSS:hSS,
    ssCount:ssCount,salGood:salGood,salBad:salBad,
    hasDohwa:hasDohwa,hasYeokma:hasYeokma,hasBaekho:hasBaekho,hasGwimun:hasGwimun,hasCheonEul:hasCheonEul,
    chungList:chungList,hapList:hapList,samhapList:samhapList,hyungList:hyungList,
    excessEl:excessEl,zeroEls:zeroEls,maxEl:maxEl,minEl:minEl,
    energyType:energyType,angerType:angerType,loveType:loveType,wealthType:wealthType,
    elSorted:elSorted
  };
}

/* ====== 동적 키워드 생성 엔진 ====== */
function generateDynamicKeywords(saju, gg, dw, gm, jjgRatio) {
  var result = {};
  var dm = saju.dm;
  var ilju = saju.P[2].s + saju.P[2].b;
  var isStrong = gg.strong;

  if (ILGAN_KW[dm]) {
    result['일간본질'] = isStrong ? ILGAN_KW[dm].strong : ILGAN_KW[dm].weak;
  }

  if (ILJU_KW[ilju]) {
    result['일주특성'] = ILJU_KW[ilju].core;
    result['일주그림자'] = ILJU_KW[ilju].shadow;
  }

  var dominant = gg.dominant[0];
  if (GYEOKGUK_KW[dominant]) {
    result['격국체감'] = isStrong ? GYEOKGUK_KW[dominant].strong : GYEOKGUK_KW[dominant].weak;
  }

  var gungwiKW = [];
  var pillars = ['year','month','day','hour'];
  var pillarNames = ['년주','월주','일지','시주'];
  saju.ss.forEach(function(s, i) {
    var ssName = s.ss;
    var pillar = pillars[i];
    if (SIPSUNG_GUNGWI_KW[ssName] && SIPSUNG_GUNGWI_KW[ssName][pillar]) {
      var kws = SIPSUNG_GUNGWI_KW[ssName][pillar];
      gungwiKW.push(pillarNames[i] + ' ' + ssName + ': ' + kws.slice(0,2).join(', '));
    }
  });
  if (gungwiKW.length > 0) result['십성궁위'] = gungwiKW;

  var relKW = [];
  var sCnt = {};
  var grps = ['비겁','식상','재성','관성','인성'];
  grps.forEach(function(g){ sCnt[g] = gg.cnt[g] || 0; });
  var rawSS = {};
  saju.ss.forEach(function(s){if(s.ss && s.pillar!=='일주'){rawSS[s.ss]=(rawSS[s.ss]||0)+1;}});
  sCnt._raw = rawSS;
  sCnt._strong = gg.strong;

  SIPSUNG_REL_KW.forEach(function(r) {
    if (r.cond(sCnt)) {
      relKW = relKW.concat(r.kw);
    }
  });
  if (relKW.length > 15) relKW = relKW.slice(0, 15);
  if (relKW.length > 0) result['십성관계'] = relKW;

  var ohKW = [];
  var ohs = ['목','화','토','금','수'];
  ohs.forEach(function(oh) {
    var cnt = saju.el[oh] || 0;
    if (cnt === 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(0): ' + OHENG_KW[oh].zero.slice(0,2).join(', '));
    } else if (cnt >= 3 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '과다): ' + OHENG_KW[oh].excess.slice(0,2).join(', '));
    } else if (cnt <= 1 && cnt > 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '부족): ' + OHENG_KW[oh].lack.slice(0,2).join(', '));
    }
  });
  if (ohKW.length > 0) result['오행밸런스'] = ohKW;

  var hapchungKW = [];
  var ganPairs = [
    [saju.P[0].s, saju.P[1].s, 'year-month'],
    [saju.P[0].s, saju.P[2].s, 'year-day'],
    [saju.P[1].s, saju.P[2].s, 'month-day'],
    [saju.P[2].s, saju.P[3].s, 'day-hour']
  ];
  var hapMap = {'갑기':'갑기합토','기갑':'갑기합토','을경':'을경합금','경을':'을경합금',
                '병신':'병신합수','신병':'병신합수','정임':'정임합목','임정':'정임합목',
                '무계':'무계합화','계무':'무계합화'};
  ganPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (hapMap[key] && CHEONGAN_HAP_KW[hapMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('합: ' + hapMap[key] + '(' + gungwi + ') — ' + CHEONGAN_HAP_KW[hapMap[key]].slice(0,2).join(', '));
      if (HAP_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + HAP_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  var jiPairs = [
    [saju.P[0].b, saju.P[1].b, 'year-month'],
    [saju.P[0].b, saju.P[2].b, 'year-day'],
    [saju.P[0].b, saju.P[3].b, 'year-hour'],
    [saju.P[1].b, saju.P[2].b, 'month-day'],
    [saju.P[1].b, saju.P[3].b, 'month-hour'],
    [saju.P[2].b, saju.P[3].b, 'day-hour']
  ];
  var chungMap = {'자오':'자오충','오자':'자오충','축미':'축미충','미축':'축미충',
                  '인신':'인신충','신인':'인신충','묘유':'묘유충','유묘':'묘유충',
                  '진술':'진술충','술진':'진술충','사해':'사해충','해사':'사해충'};
  jiPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (chungMap[key] && JIJI_CHUNG_KW[chungMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('충: ' + chungMap[key] + '(' + gungwi + ') — ' + JIJI_CHUNG_KW[chungMap[key]].slice(0,2).join(', '));
      if (CHUNG_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + CHUNG_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  if (hapchungKW.length > 0) result['합충체감'] = hapchungKW;

  var hyungKW = [];
  var allJi = saju.P.map(function(p){return p.b;});
  if (allJi.indexOf('인')>=0 && allJi.indexOf('사')>=0 && allJi.indexOf('신')>=0) {
    hyungKW.push('삼형살(인사신): ' + JIJI_HYUNG_KW['인사신'].slice(0,2).join(', '));
  } else {
    [['인','사'],['사','신'],['인','신']].forEach(function(pair){
      if(allJi.indexOf(pair[0])>=0 && allJi.indexOf(pair[1])>=0){
        hyungKW.push('부분형('+pair[0]+pair[1]+'): 갈등의씨앗, 시련속성장');
      }
    });
  }
  if (allJi.indexOf('축')>=0 && allJi.indexOf('술')>=0 && allJi.indexOf('미')>=0) {
    hyungKW.push('삼형살(축술미): ' + JIJI_HYUNG_KW['축술미'].slice(0,2).join(', '));
  }
  if (allJi.indexOf('자')>=0 && allJi.indexOf('묘')>=0) {
    hyungKW.push('무례지형(자묘): ' + JIJI_HYUNG_KW['자묘'].slice(0,2).join(', '));
  }
  var jiCount = {};
  allJi.forEach(function(j){jiCount[j]=(jiCount[j]||0)+1;});
  Object.keys(jiCount).forEach(function(j){
    if(jiCount[j]>=2){
      hyungKW.push('자형('+j+j+'): ' + JIJI_HYUNG_KW['자형'].slice(0,2).join(', '));
    }
  });
  if (hyungKW.length > 0) {
    if (result['합충체감']) {
      result['합충체감'] = result['합충체감'].concat(hyungKW);
    } else {
      result['합충체감'] = hyungKW;
    }
  }

  var ganPairs2 = [];
  var ganLabels = ['연간','월간','일간','시간'];
  var allGan = saju.P.map(function(p){return p.s;});
  for(var gi=0;gi<allGan.length;gi++)for(var gj=gi+1;gj<allGan.length;gj++){
    ganPairs2.push([allGan[gi],allGan[gj],ganLabels[gi]+'-'+ganLabels[gj]]);
  }
  var cheonganChungMap={'갑경':'갑경충','경갑':'갑경충','을신':'을신충','신을':'을신충','병임':'병임충','임병':'병임충','정계':'정계충','계정':'정계충'};
  var ccKW=[];
  ganPairs2.forEach(function(p){
    var key=p[0]+p[1];
    if(cheonganChungMap[key]&&CHEONGAN_CHUNG_KW[cheonganChungMap[key]]){
      ccKW.push('천간충: '+cheonganChungMap[key]+'('+p[2]+') — '+CHEONGAN_CHUNG_KW[cheonganChungMap[key]].slice(0,2).join(', '));
    }
  });
  if(ccKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(ccKW);
    else result['합충체감']=ccKW;
  }

  var haeMap={'자미':'자미해','미자':'자미해','축오':'축오해','오축':'축오해','인사':'인사해','사인':'인사해','묘진':'묘진해','진묘':'묘진해','신해':'신해해','해신':'신해해','유술':'유술해','술유':'유술해'};
  var haeKW=[];
  jiPairs.forEach(function(p){
    var key=p[0]+p[1];
    if(haeMap[key]&&JIJI_HAE_KW[haeMap[key]]){
      haeKW.push('해(害): '+haeMap[key]+'('+p[2]+') — '+JIJI_HAE_KW[haeMap[key]].slice(0,2).join(', '));
    }
  });
  if(haeKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(haeKW);
    else result['합충체감']=haeKW;
  }

  var samhapSets = [
    {ji:['신','자','진'],oh:'수국',kw:'지혜와적응력의삼합, 물의에너지결집'},
    {ji:['해','묘','미'],oh:'목국',kw:'성장과추진력의삼합, 나무의에너지결집'},
    {ji:['인','오','술'],oh:'화국',kw:'열정과표현력의삼합, 불의에너지결집'},
    {ji:['사','유','축'],oh:'금국',kw:'결단력과실행의삼합, 금의에너지결집'}
  ];
  samhapSets.forEach(function(sh){
    var cnt = 0;
    sh.ji.forEach(function(j){if(allJi.indexOf(j)>=0) cnt++;});
    if(cnt >= 3){
      if(!result['합충체감']) result['합충체감'] = [];
      result['합충체감'].push('삼합('+sh.oh+'): '+sh.kw);
    }
  });

  if (dw.daewoons && dw.currentDWIdx >= 1) {
    var prevDW = dw.daewoons[dw.currentDWIdx - 1];
    var currDW = dw.daewoons[dw.currentDWIdx];
    if (prevDW && currDW) {
      var ssToGroup = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                       '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                       '편인':'인성','정인':'인성'};
      var prevG = ssToGroup[prevDW.ss] || prevDW.ss;
      var currG = ssToGroup[currDW.ss] || currDW.ss;
      var transKey = prevG + '→' + currG;
      if (DW_TRANSITION_KW[transKey]) {
        result['대운전환'] = [prevDW.ss + '운→' + currDW.ss + '운: ' + DW_TRANSITION_KW[transKey].join(', ')];
      }
    }
  }

  if (dw.currentAge && dw.daewoons && dw.currentDWIdx >= 0) {
    var age = dw.currentAge;
    var ageGroup = age < 30 ? '20대' : age < 40 ? '30대' : age < 50 ? '40대' : '50대이후';
    var currDW2 = dw.daewoons[dw.currentDWIdx];
    if (currDW2) {
      var ssToGroup2 = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                        '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                        '편인':'인성','정인':'인성'};
      var dwGroup = ssToGroup2[currDW2.ss] || currDW2.ss;
      if (AGE_DW_KW[ageGroup] && AGE_DW_KW[ageGroup][dwGroup]) {
        result['나이대운'] = [age + '세 ' + ageGroup + '+' + currDW2.ss + '운: ' + AGE_DW_KW[ageGroup][dwGroup].join(', ')];
      }
    }
  }

  if (jjgRatio) {
    var hiddenKW = [];
    jjgRatio.forEach(function(r) {
      if (!r) return;
      var jeonggi = r.items[r.items.length - 1];
      if (jeonggi && JIJANGGAN_HIDDEN_KW[jeonggi.ss]) {
        hiddenKW.push(r.pillar + ' ' + r.ji + ' 정기(' + jeonggi.ss + '): ' + JIJANGGAN_HIDDEN_KW[jeonggi.ss][0]);
      }
    });
    if (hiddenKW.length > 0) result['숨은십성'] = hiddenKW;
  }

  var iljiUns = saju.uns[2];
  if (iljiUns && UNSUNG_KW[iljiUns]) {
    result['일지운성'] = ['일지 ' + iljiUns + ': ' + UNSUNG_KW[iljiUns].join(', ')];
  }

  if (gg.johuDesc) {
    result['조후체감'] = [gg.seasonName + ': ' + gg.johuDesc];
  } else if (gg.seasonName) {
    var deukTxt = gg.deukryeong ? '일간이 계절의 힘을 받아 에너지가 넘침' : '일간이 계절에서 힘을 잃어 외부 도움이 필요';
    result['조후체감'] = [gg.seasonName + ': ' + deukTxt];
  }

  if (gm && gm.empty && gm.empty.length > 0) {
    var gmKW = [];
    var jiToPillar = {};
    saju.P.forEach(function(p, i) {
      jiToPillar[p.b] = pillars[i];
    });
    gm.empty.forEach(function(e) {
      if (jiToPillar[e] && GONGMANG_GUNGWI_KW[jiToPillar[e]]) {
        gmKW.push(e + '(' + pillarNames[pillars.indexOf(jiToPillar[e])] + '공망): ' + GONGMANG_GUNGWI_KW[jiToPillar[e]].slice(0,2).join(', '));
      }
    });
    if (gmKW.length > 0) result['공망체감'] = gmKW;
  }

  if (JEOKCHEONSU[dm]) {
    var jc = JEOKCHEONSU[dm];
    result['적천수물상'] = [jc.title];
    result['적천수본질'] = [isStrong ? jc.strong_img : jc.weak_img];
    result['적천수연애'] = [jc.love];
    result['적천수직업'] = [jc.work];
    result['적천수위험'] = [jc.danger];
  }

  var ggName = gg.gyeokgukName || '';
  var jpKey = '';
  ['식신격','상관격','편재격','정재격','편관격','정관격','편인격','정인격','건록격','양인격'].forEach(function(gk) {
    if (ggName.indexOf(gk) >= 0) jpKey = gk;
  });
  if (jpKey && JAPYEONG_GG[jpKey]) {
    var jp = JAPYEONG_GG[jpKey];
    result['격국역할'] = [jp.role];
    result['격국성격'] = [jp.intact];
    var breakKW = [];
    jp.breaks.forEach(function(br) {
      if (br.cond.indexOf('효신탈식') >= 0 && sCnt._raw['편인'] && sCnt._raw['식신']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('상관견관') >= 0 && sCnt._raw['상관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('관살혼잡') >= 0 && sCnt._raw['편관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if ((br.cond.indexOf('겁재 탈재') >= 0 || br.cond.indexOf('겁재 파재') >= 0) && sCnt._raw['겁재'] && (sCnt._raw['편재'] || sCnt._raw['정재'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('비견 쟁재') >= 0 && sCnt._raw['비견'] && sCnt._raw['편재']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('식상 혼잡') >= 0 && sCnt._raw['식신'] && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('인성 제압') >= 0 && (sCnt._raw['편인'] || sCnt._raw['정인']) && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('재성 파인') >= 0 && (sCnt._raw['편재'] || sCnt._raw['정재']) && (sCnt._raw['편인'] || sCnt._raw['정인'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('편인 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('인성 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('비겁 과다') >= 0 && gg.cnt['비겁'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('과다한 식신') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('상관 과다') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('편관 과다') >= 0 && gg.cnt['관성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('제어 없는') >= 0 && sCnt._raw['편관'] && !sCnt._raw['식신'] && !sCnt._raw['편인']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('신약 편관') >= 0 && !isStrong && sCnt._raw['편관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('관성 부재') >= 0 && gg.cnt['관성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('재성 부족') >= 0 && gg.cnt['재성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
    });
    if (breakKW.length > 0) result['격국파격'] = breakKW;
  }

  return result;
}
