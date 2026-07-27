// lib/saju-core.js — 만세력 순수 계산
'use strict';

var data = require('./saju-data');
var TGAN_KR = data.TGAN_KR;
var JIJI_KR = data.JIJI_KR;
var OHAENG_TGAN = data.OHAENG_TGAN;
var OHAENG_JIJI = data.OHAENG_JIJI;
var JIJANGGAN_DATA = data.JIJANGGAN_DATA;
var CITY_DATA = data.CITY_DATA;
var KST_LONGITUDE = data.KST_LONGITUDE;
var getSipsung = data.getSipsung;
var get12Sinsal = data.get12Sinsal;
var getUnsung = data.getUnsung;
var getSamhapGroup = data.getSamhapGroup;
var SINSAL12_NAMES = data.SINSAL12_NAMES;
var UNSUNG_NAMES = data.UNSUNG_NAMES;
var UNSUNG_START = data.UNSUNG_START;
var SS_NAMES = data.SS_NAMES;

// Equation of Time calculation — returns minutes
function equationOfTime(year, month, day) {
  var n = Math.floor(275 * month / 9) - 2 * Math.floor((month + 9) / 12) + day - 30;
  var B = 2 * Math.PI * (n - 81) / 365;
  // Spencer formula (accuracy ±30sec)
  return 9.87 * Math.sin(2*B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

// KST → True Solar Time conversion (returns correction in minutes)
function getTrueSolarCorrection(year, month, day, longitude) {
  if (!longitude || longitude === 127.50) return 0; // unknown = no correction
  var eot = equationOfTime(year, month, day);
  var lngCorrection = (longitude - KST_LONGITUDE) * 4; // 1 degree = 4 minutes
  return lngCorrection + eot;
}

function dateToJDN(y,m,d){var yr=y,mo=m;if(mo<=2){yr--;mo+=12;}var A=Math.floor(yr/100);return Math.floor(365.25*(yr+4716))+Math.floor(30.6001*(mo+1))+d+2-A+Math.floor(A/4)-1524.5;}
function solarLongitude(jd){var T=(jd-2451545)/36525,L0=280.46646+36000.76983*T+.0003032*T*T,M=357.52911+35999.05029*T-.0001537*T*T,Mr=M*Math.PI/180,C=(1.914602-.004817*T-.000014*T*T)*Math.sin(Mr)+(.019993-.000101*T)*Math.sin(2*Mr)+.000289*Math.sin(3*Mr),s=L0+C,om=125.04-1934.136*T;s=s-.00569-.00478*Math.sin(om*Math.PI/180);return((s%360)+360)%360;}
function findSolarTermJD(yr,tgt){var nd=function(a,b){var d=a-b;while(d>180)d-=360;while(d<-180)d+=360;return d;};var de=80+(tgt/360)*365.25;if(tgt>270)de=80+((tgt-360)/360)*365.25;var j0=dateToJDN(yr,1,1)+de-30,j1=j0+60;for(var i=0;i<50;i++){var jm=(j0+j1)/2,df=nd(solarLongitude(jm),tgt);if(Math.abs(df)<.0001)return jm;if(df<0)j0=jm;else j1=jm;}return(j0+j1)/2;}

var JG_LONG=[{n:'소한',l:285,mb:1},{n:'입춘',l:315,mb:2},{n:'경칩',l:345,mb:3},{n:'청명',l:15,mb:4},{n:'입하',l:45,mb:5},{n:'망종',l:75,mb:6},{n:'소서',l:105,mb:7},{n:'입추',l:135,mb:8},{n:'백로',l:165,mb:9},{n:'한로',l:195,mb:10},{n:'입동',l:225,mb:11},{n:'대설',l:255,mb:0}];
function getJeolgiTimes(yr){var r=[];for(var y=yr-1;y<=yr+1;y++)for(var j=0;j<JG_LONG.length;j++){var jg=JG_LONG[j];r.push({n:jg.n,mb:jg.mb,jd:findSolarTermJD(y,jg.l)});}r.sort(function(a,b){return a.jd-b.jd;});return r;}

// dayDate: optional {y,m,d} override for the day pillar only (traditional 자시 roll).
function calculateSaju(year,month,day,hourBranch,hour,minute,dayDate){
  // NOTE: dateToJDN returns the JD at 00:00 (midnight) of that date, ending in .5.
  // The name bjdNoon is misleading — the value is midnight-based and is used for the day pillar only.
  var bjdNoon=dateToJDN(year,month,day);
  // Solar-term comparison JD: add the birth time of day. Unknown hour = noon (+0.5).
  var bjd=bjdNoon;
  if(hour!==null&&hour!==undefined&&hour!==''){
    bjd+=(+hour)/24;
    if(minute!==null&&minute!==undefined&&minute!=='') bjd+=(+minute)/1440;
  } else {
    bjd+=0.5;
  }
  var KST=9/24;
  var jt=getJeolgiTimes(year);
  var ipJD=findSolarTermJD(year,315)+KST,sy=year;if(bjd<ipJD)sy=year-1;
  var yIdx=((sy-4)%60+60)%60,yg=yIdx%10,yj=yIdx%12;
  var mb=2,cj='입춘';for(var i=jt.length-1;i>=0;i--)if(bjd>=jt[i].jd+KST){mb=jt[i].mb;cj=jt[i].n;break;}
  var mss=[2,4,6,8,0],mg=(mss[yg%5]+(mb-2+12)%12)%10,mj=mb;
  // Day pillar is date-based; dayDate carries the 자시 roll when present.
  var _dj=dayDate?dateToJDN(dayDate.y,dayDate.m,dayDate.d):bjdNoon;
  var dIdx=((Math.floor(_dj)+50)%60+60)%60,dg=dIdx%10,dj=dIdx%12;
  var hg=null,hj=null;
  if(hourBranch>=0){hj=hourBranch;var hss=[0,2,4,6,8];hg=(hss[dg%5]+hourBranch)%10;}
  return{yg:yg,yj:yj,mg:mg,mj:mj,dg:dg,dj:dj,hg:hg,hj:hj,sy:sy,cj:cj};
}

function getSpecialSinsal(yg,yj,mg,mj,dg,dj,hg,hj){
  var R=[],aJ=[],aG=[];
  if(yj!=null)aJ.push({j:yj,l:'년지'});if(mj!=null)aJ.push({j:mj,l:'월지'});if(dj!=null)aJ.push({j:dj,l:'일지'});if(hj!=null)aJ.push({j:hj,l:'시지'});
  if(yg!=null)aG.push({g:yg,l:'년간'});if(dg!=null)aG.push({g:dg,l:'일간'});
  var aGF=[];if(yg!=null)aGF.push({g:yg,l:'년간'});if(mg!=null)aGF.push({g:mg,l:'월간'});if(dg!=null)aGF.push({g:dg,l:'일간'});if(hg!=null)aGF.push({g:hg,l:'시간'});
  var ceM={0:[1,7],4:[1,7],1:[0,8],5:[0,8],2:[11,9],3:[11,9],6:[1,7],7:[2,6],8:[3,5],9:[3,5]};
  for(var a=0;a<aG.length;a++){var ts=ceM[aG[a].g];for(var b=0;b<aJ.length;b++)if(ts.indexOf(aJ[b].j)>=0&&aJ[b].l!==aG[a].l.replace('간','지'))R.push({name:'천을귀인',type:'good',desc:aG[a].l+' '+TGAN_KR[aG[a].g]+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}
  var mcM=[5,6,8,9,8,9,11,0,2,3];
  for(var a=0;a<aG.length;a++){var t=mcM[aG[a].g];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'문창귀인',type:'good',desc:aG[a].l+' → '+aJ[b].l});}
  var dhM=[9,3,6,0],ymM=[2,8,11,5],hgM=[4,10,1,7];
  var bL=[];if(yj!=null)bL.push({j:yj,l:'년지'});if(dj!=null)bL.push({j:dj,l:'일지'});
  for(var a=0;a<bL.length;a++){var g=getSamhapGroup(bL[a].j);
    for(var b=0;b<aJ.length;b++){
      if(aJ[b].j===dhM[g]&&aJ[b].l!==bL[a].l)R.push({name:'도화살',type:'bad',desc:bL[a].l+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});
      if(aJ[b].j===ymM[g]&&aJ[b].l!==bL[a].l)R.push({name:'역마살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
      if(aJ[b].j===hgM[g]&&aJ[b].l!==bL[a].l)R.push({name:'화개살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
    }
  }
  var yiM={0:3,2:6,4:6,6:9,8:0};
  if(dg!=null&&dg in yiM){var t=yiM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'양인살',type:'bad',desc:'일간 '+TGAN_KR[dg]+' → '+aJ[b].l});}
  var cdM={0:{t:'ji',v:5},1:{t:'gan',v:6},2:{t:'gan',v:3},3:{t:'gan',v:8},4:{t:'gan',v:8},5:{t:'gan',v:7},6:{t:'ji',v:11},7:{t:'gan',v:0},8:{t:'gan',v:9},9:{t:'ji',v:2},10:{t:'gan',v:2},11:{t:'gan',v:1}};
  if(mj!=null&&cdM[mj]){var cd=cdM[mj];if(cd.t==='gan'){for(var a=0;a<aGF.length;a++)if(aGF[a].g===cd.v)R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aGF[a].l+' '+TGAN_KR[aGF[a].g]});}else{for(var b=0;b<aJ.length;b++)if(aJ[b].j===cd.v&&aJ[b].l!=='월지')R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}}
  if(mj!=null){var g2=getSamhapGroup(mj);var wdG=[8,2,6,0][g2];for(var a=0;a<aGF.length;a++)if(aGF[a].g===wdG)R.push({name:'월덕귀인',type:'good',desc:'월지 삼합 → '+aGF[a].l});}
  var gyM=[4,5,7,8,7,8,10,11,1,2];
  if(dg!=null){var t2=gyM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t2)R.push({name:'금여록',type:'good',desc:'일간 → '+aJ[b].l});}
  var gmM=[9,6,7,8,5,4,1,2,3,0,11,10];
  if(dj!=null){var t3=gmM[dj];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t3&&aJ[b].l!=='일지')R.push({name:'귀문관살',type:'bad',desc:'일지 → '+aJ[b].l});}
  var bhM=[4,1,7,2,10,7,4,1,10,7];
  if(dg!=null){var t4=bhM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t4)R.push({name:'백호살',type:'bad',desc:'일간 → '+aJ[b].l});}
  var hdM=[11,6,2,9,2,9,5,0,8,3];
  if(dg!=null){var t5=hdM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t5)R.push({name:'학당귀인',type:'good',desc:'일간 → '+aJ[b].l});}
  var seen={};return R.filter(function(r){var k=r.name+r.desc;if(seen[k])return false;seen[k]=1;return true;});
}

/* ====== Birth-time normalisation (F4 wall clock -> KST, F3 traditional 자시설) ======
   Order: (1) strip DST -> (2) standard time (UTC+8:30) -> KST -> (3) true solar time
          -> (4) roll to next day when >= 23:00 (자시).
   (1) before (2) is mandatory: 1955~60 stacks +1h DST on top of the UTC+8:30 standard. */

// Korea ran on UTC+8:30 over this span (+30 minutes when converted to KST).
var KOREA_HALFHOUR_FROM=19540321, KOREA_HALFHOUR_TO=19610809;
// DST (+1h) spans [startDate,startMin, endDate,endMin). Date-only spans end at 24:00.
var KOREA_DST=[
  [19480601,0,19480912,1440],[19490403,0,19490910,1440],[19500401,0,19500909,1440],
  [19510506,0,19510908,1440],[19550505,0,19550908,1440],[19560520,0,19560929,1440],
  [19570505,0,19570921,1440],[19580504,0,19580920,1440],[19590503,0,19590919,1440],
  [19600501,0,19600917,1440],[19870510,120,19871011,180],[19880508,120,19881009,180]
];

function _addDaysYMD(y,m,d,n){
  var t=new Date(Date.UTC(y,m-1,d));t.setUTCDate(t.getUTCDate()+n);
  return{y:t.getUTCFullYear(),m:t.getUTCMonth()+1,d:t.getUTCDate()};
}
// Shift a wall time by deltaMin (fractional allowed), rolling the date when it crosses midnight.
function _shiftDateTime(y,m,d,h,min,deltaMin){
  var total=(+h)*60+(+min||0)+deltaMin;
  var dayOff=Math.floor(total/1440), rem=total-dayOff*1440;
  var dt=dayOff?_addDaysYMD(y,m,d,dayOff):{y:y,m:m,d:d};
  return{y:dt.y,m:dt.m,d:dt.d,h:Math.floor(rem/60),min:Math.round(rem%60)};
}
// Wall clock at the place of birth -> KST (UTC+9).
// Spring-forward gaps resolve as DST (lenient); fall-back duplicates take DST (first occurrence).
function normalizeWallClockToKST(y,m,d,h,min){
  var v=y*10000+m*100+d, t=(+h)*60+(+min||0), shift=0;
  for(var i=0;i<KOREA_DST.length;i++){
    var w=KOREA_DST[i];
    if(((v>w[0])||(v===w[0]&&t>=w[1]))&&((v<w[2])||(v===w[2]&&t<w[3]))){shift-=60;break;}
  }
  if(v>=KOREA_HALFHOUR_FROM&&v<=KOREA_HALFHOUR_TO)shift+=30;
  return shift?_shiftDateTime(y,m,d,h,min,shift):{y:y,m:m,d:d,h:+h,min:(+min||0)};
}
// kst     — absolute time used for solar-term comparison (year/month pillar).
//           True solar time and the 자시 roll are deliberately NOT applied here.
// dayDate — date used for the day pillar; next day when true-solar time is >= 23:00.
function normalizeBirthTime(y,m,d,h,min,cityLng){
  var hasHour=(h!==null&&h!==undefined&&h!=='');
  var kst=hasHour?normalizeWallClockToKST(y,m,d,h,min):{y:y,m:m,d:d,h:null,min:null};
  var trueSolarMin=0, solar=kst;
  if(hasHour&&cityLng&&cityLng>0){
    trueSolarMin=getTrueSolarCorrection(kst.y,kst.m,kst.d,cityLng);
    if(trueSolarMin!==0)solar=_shiftDateTime(kst.y,kst.m,kst.d,kst.h,kst.min,trueSolarMin);
  }
  var dayDate={y:solar.y,m:solar.m,d:solar.d}, zasiRolled=false;
  if(hasHour&&solar.h>=23){dayDate=_addDaysYMD(solar.y,solar.m,solar.d,1);zasiRolled=true;}
  return{kst:kst,solar:solar,dayDate:dayDate,zasiRolled:zasiRolled,trueSolarMin:trueSolarMin,
         hourBranch:hasHour?Math.floor(((solar.h+1)%24)/2):-1};
}

function calcSajuForApp(y,m,d,h,min,cityLng){
  // Wall clock -> KST -> true solar -> 자시 roll, all in one pass (no double correction).
  var N=normalizeBirthTime(y,m,d,h,min,cityLng);
  var trueSolarMin=N.trueSolarMin;
  var hb=N.hourBranch;
  var s=calculateSaju(N.kst.y,N.kst.m,N.kst.d,hb,N.kst.h,N.kst.min,N.dayDate);
  var P=[{l:"연주",s:TGAN_KR[s.yg],b:JIJI_KR[s.yj],gi:s.yg,bi:s.yj},{l:"월주",s:TGAN_KR[s.mg],b:JIJI_KR[s.mj],gi:s.mg,bi:s.mj},{l:"일주",s:TGAN_KR[s.dg],b:JIJI_KR[s.dj],gi:s.dg,bi:s.dj},{l:"시주",s:s.hg!=null?TGAN_KR[s.hg]:"?",b:s.hj!=null?JIJI_KR[s.hj]:"?",gi:s.hg,bi:s.hj}];
  var el={'목':0,'화':0,'토':0,'금':0,'수':0};
  P.forEach(function(p){if(p.gi!=null)el[OHAENG_TGAN[p.gi]]++;if(p.bi!=null)el[OHAENG_JIJI[p.bi]]++;});
  var ss=P.map(function(p){return{pillar:p.l,stem:p.s,branch:p.b,ss:p.gi!=null?getSipsung(s.dg,p.gi):''};});
  var jjg=P.map(function(p){if(p.bi==null)return[];return JIJANGGAN_DATA[p.bi].map(function(it){return{stem:TGAN_KR[it.g],oh:OHAENG_TGAN[it.g],days:it.d};});});

  var gungwiNames=['조상·외부환경','직업·사회','배우자궁','자녀·노후'];
  var jiSS=P.map(function(p,idx){
    if(p.bi==null)return{pillar:p.l,branch:p.b,ss:'',gungwi:gungwiNames[idx]};
    var jjgArr=JIJANGGAN_DATA[p.bi];
    var jeonggi=jjgArr[jjgArr.length-1];
    var jss=getSipsung(s.dg,jeonggi.g);
    return{pillar:p.l,branch:p.b,ss:jss,gungwi:gungwiNames[idx],jeonggiStem:TGAN_KR[jeonggi.g]};
  });

  var elFull={'목':0,'화':0,'토':0,'금':0,'수':0};
  P.forEach(function(p){if(p.gi!=null)elFull[OHAENG_TGAN[p.gi]]++;});
  P.forEach(function(p){
    if(p.bi==null)return;
    var jjgArr=JIJANGGAN_DATA[p.bi];
    jjgArr.forEach(function(it,idx){
      var w=(idx===jjgArr.length-1)?0.7:(idx===jjgArr.length-2)?0.3:0.15;
      elFull[OHAENG_TGAN[it.g]]+=w;
    });
  });
  Object.keys(elFull).forEach(function(k){elFull[k]=Math.round(elFull[k]*10)/10;});
  var lackFull=Object.entries(elFull).filter(function(e){return e[1]<0.3;}).map(function(e){return e[0];});
  var hiddenOh=Object.keys(el).filter(function(k){return el[k]===0 && elFull[k]>=0.3;});

  var AMHAP_TABLE=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  var amhapResults=[];
  var ganList=[{v:s.yg,l:'년간'},{v:s.mg,l:'월간'},{v:s.dg,l:'일간'},{v:s.hg,l:'시간'}];
  var jiList=[{jjg:jjg[0],l:'년지',b:P[0].b},{jjg:jjg[1],l:'월지',b:P[1].b},{jjg:jjg[2],l:'일지',b:P[2].b},{jjg:jjg[3],l:'시지',b:P[3].b}];
  var amGungwi={'년지':'조상·외부','월지':'직업·사회','일지':'배우자','시지':'자녀·노후'};
  ganList.forEach(function(gan){
    if(gan.v==null)return;
    jiList.forEach(function(ji){
      ji.jjg.forEach(function(hidden){
        var hg=TGAN_KR.indexOf(hidden.stem);
        if(hg<0)return;
        AMHAP_TABLE.forEach(function(ah){
          if((gan.v===ah[0]&&hg===ah[1])||(gan.v===ah[1]&&hg===ah[0])){
            if(ganList.indexOf(gan)!==jiList.indexOf(ji)){
              amhapResults.push({from:gan.l+TGAN_KR[gan.v],to:ji.l+ji.b+'(지장간 '+hidden.stem+')',hapOh:ah[2],gungwi:amGungwi[ji.l]||''});
            }
          }
        });
      });
    });
  });

  var uns=P.map(function(p){return p.bi!=null?getUnsung(s.dg,p.bi):'';});
  var sinY=P.map(function(p){return p.bi!=null?get12Sinsal(s.yj,p.bi):'';});
  var sinD=P.map(function(p){return p.bi!=null?get12Sinsal(s.dj,p.bi):'';});
  var sals=getSpecialSinsal(s.yg,s.yj,s.mg,s.mj,s.dg,s.dj,s.hg,s.hj);
  return{P:P,el:el,elFull:elFull,lackFull:lackFull,hiddenOh:hiddenOh,dm:TGAN_KR[s.dg],dmEl:OHAENG_TGAN[s.dg],ss:ss,jiSS:jiSS,jjg:jjg,uns:uns,amhap:amhapResults,sinsal:sinY,sinsalDay:sinD,specialSals:sals,raw:s,currentJeolgi:s.cj,sajuYear:s.sy,trueSolarMin:Math.round(trueSolarMin),trueSolarApplied:(trueSolarMin!==0)};
}

module.exports = {
  calcSajuForApp: calcSajuForApp,
  equationOfTime: equationOfTime,
  getTrueSolarCorrection: getTrueSolarCorrection,
  dateToJDN: dateToJDN,
  solarLongitude: solarLongitude,
  findSolarTermJD: findSolarTermJD,
  getJeolgiTimes: getJeolgiTimes,
  calculateSaju: calculateSaju,
  getSpecialSinsal: getSpecialSinsal,
  normalizeWallClockToKST: normalizeWallClockToKST,
  normalizeBirthTime: normalizeBirthTime,
  JG_LONG: JG_LONG
};
