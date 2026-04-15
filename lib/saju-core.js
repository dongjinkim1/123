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

function calculateSaju(year,month,day,hourBranch,hour,minute){
  var bjdNoon=dateToJDN(year,month,day);
  var bjd=bjdNoon;
  if(hour!==null&&hour!==undefined&&hour!==''){
    bjd+=(+hour-12)/24;
    if(minute!==null&&minute!==undefined&&minute!=='') bjd+=(+minute)/1440;
  }
  var KST=9/24;
  var jt=getJeolgiTimes(year);
  var ipJD=findSolarTermJD(year,315)+KST,sy=year;if(bjd<ipJD)sy=year-1;
  var yIdx=((sy-4)%60+60)%60,yg=yIdx%10,yj=yIdx%12;
  var mb=2,cj='입춘';for(var i=jt.length-1;i>=0;i--)if(bjd>=jt[i].jd+KST){mb=jt[i].mb;cj=jt[i].n;break;}
  var mss=[2,4,6,8,0],mg=(mss[yg%5]+(mb-2+12)%12)%10,mj=mb;
  var dIdx=((Math.floor(bjdNoon)+50)%60+60)%60,dg=dIdx%10,dj=dIdx%12;
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

function calcSajuForApp(y,m,d,h,min,cityLng){
  var trueSolarMin = 0;
  var trueH = h, trueMin = min;
  if(h!==null && h!==undefined && h!=='' && cityLng && cityLng > 0){
    trueSolarMin = getTrueSolarCorrection(y, m, d, cityLng);
    var totalMin = (+h)*60 + (+min||0) + trueSolarMin;
    if(totalMin < 0) totalMin += 1440;
    if(totalMin >= 1440) totalMin -= 1440;
    trueH = Math.floor(totalMin / 60);
    trueMin = Math.round(totalMin % 60);
  }
  var hb=(trueH!==null&&trueH!==undefined&&trueH!=="")?Math.floor(((+trueH+1)%24)/2):-1;
  var s=calculateSaju(y,m,d,hb,h,min);
  if(hb>=0 && trueSolarMin !== 0){
    var trueHB = Math.floor(((+trueH+1)%24)/2);
    s.hj = trueHB;
    var hss=[0,2,4,6,8]; s.hg=(hss[s.dg%5]+trueHB)%10;
  }
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
  JG_LONG: JG_LONG
};
