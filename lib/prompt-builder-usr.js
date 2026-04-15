// lib/prompt-builder-usr.js — User prompt construction for saju analysis
// Extracted from runSajuAnalysis() lines 2676-2974 of saju-engine.js
// This file builds the massive `usr` variable (the user prompt sent to AI).
'use strict';

var data = require('./saju-data');
var analysis = require('./saju-analysis');
var mbti = require('./mbti-data');

var TGAN = data.TGAN;
var TGAN_KR = data.TGAN_KR;
var JIJI = data.JIJI;
var JIJI_KR = data.JIJI_KR;
var JIJANGGAN_DATA = data.JIJANGGAN_DATA;
var getSipsung = data.getSipsung;
var ILJU_DATA = data.ILJU_DATA;
var NAPEUM_STORY = data.NAPEUM_STORY;
var SS_CONTEXT = data.SS_CONTEXT;
var DM_AX = mbti.DM_AX;
var strLv = mbti.strLv;
var miAllParam = mbti.miAllParam;

function buildUserPrompt(params, saju, gg, dw, mt, ti, strArr, mbtiObj) {
  var salTxt=saju.specialSals.map(function(s){return s.name+'('+s.desc+')';}).join(', ');
  var jjgTxt=saju.jjg.map(function(jj,i){return saju.P[i].l+': '+jj.map(function(j){return j.stem+'('+j.oh+')';}).join(' ');}).join(' | ');
  var ilju=saju.P[2].s+saju.P[2].b+'('+TGAN[saju.raw.dg]+JIJI[saju.raw.dj]+')';

  // Cognitive function names
  var cfArr=ti.cf.split('-');
  var cfN={Fi:'내면의 심판관(Fi)',Fe:'분위기 리더기(Fe)',Ne:'가능성 탐색기(Ne)',Ni:'미래 내비게이션(Ni)',Si:'추억 저장소(Si)',Se:'현장 체험러(Se)',Ti:'내장 논리회로(Ti)',Te:'실행력 엔진(Te)'};
  var strongCF=cfN[cfArr[0]]||cfArr[0];
  var weakCF=cfN[cfArr[3]]||cfArr[3];

  // Daewoon text with front/back half split
  var dwTxt=dw.daewoons.map(function(d,i){
    var prefix=(dw.currentDWIdx===i?'\u2605현재 ':'  ');
    var jiJJG=JIJANGGAN_DATA[JIJI_KR.indexOf(d.ji)];
    var jiJeonggiSS=jiJJG?getSipsung(saju.raw.dg,jiJJG[jiJJG.length-1].g):'';
    var jiSS_dw_JJG=JIJANGGAN_DATA[JIJI_KR.indexOf(d.ji)];
    var jiSS_dw=jiSS_dw_JJG?getSipsung(saju.raw.dg,jiSS_dw_JJG[jiSS_dw_JJG.length-1].g):'';
    return prefix+d.startAge+'~'+d.endAge+'세 '+d.gan+d.ji+'('+d.ganH+d.jiH+') — 전반('+d.startAge+'~'+(d.startAge+4)+'세): '+d.gan+'='+d.ss+'운 / 후반('+(d.startAge+5)+'~'+d.endAge+'세): '+d.ji+'='+(jiJeonggiSS||jiSS_dw)+'운';
  }).join('\n');
  var currentDW=dw.currentDWIdx>=0?dw.daewoons[dw.currentDWIdx]:null;
  var seTxt=dw.seun.map(function(s){return s.y+'년 '+s.gan+s.ji+'('+s.ganH+s.jiH+') '+s.ss;}).join(', ');

  // Samjae (three calamities) calculation
  var samjaeTxt = buildSamjaeTxt(saju, dw);

  // Monthly fortune (wolun)
  var wolunResult = buildWolunData(saju, dw);
  var wolunTxt = wolunResult.wolunTxt;
  var wolunArr = wolunResult.wolunArr;
  var wolunYear = wolunResult.wolunYear;
  var wonJiArr = wolunResult.wonJiArr;

  // Relations (hap/chung/hyung)
  var rel=analysis.calcRelations(saju);
  var chungTxt=rel.jijiChung.map(function(c){return c.desc;}).join(', ')||'없음';
  var hapTxt=rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;})).join(', ')||'없음';
  var samhapTxt=rel.jijiSamhap.map(function(h){return h.desc;}).join(', ')||'없음';
  var hyungTxt=rel.jijiHyung.map(function(h){return h.desc;}).join(', ')||'없음';
  var cheonganChungTxt=rel.cheonganChung.map(function(c){return c.desc;}).join(', ')||'없음';
  var jijiHaeTxt=rel.jijiHae.map(function(h){return h.desc;}).join(', ')||'없음';

  // Ilju data
  var iljuKey2=saju.P[2].s+saju.P[2].b;
  var iljuD=ILJU_DATA[iljuKey2]||{k:'독특한 기질',t:'',love:'',job:''};

  // Daewoon transition
  var nextDI=dw.currentDWIdx>=0?dw.currentDWIdx+1:-1;
  var nextDW=nextDI>=0&&nextDI<dw.daewoons.length?dw.daewoons[nextDI]:null;
  var transitionTxt='';
  if(nextDW){var transAge=nextDW.startAge;var transYr=(+params.y)+transAge-1;transitionTxt='\n다음 대운 전환: '+transAge+'세('+transYr+'년경) '+nextDW.gan+nextDW.ji+' '+nextDW.ss+'운으로 전환';}
  var pastDWTxt='';
  if(dw.currentDWIdx>=1){pastDWTxt='\n과거 대운: ';for(var pi=0;pi<dw.currentDWIdx;pi++){var pd=dw.daewoons[pi];pastDWTxt+=pd.startAge+'~'+pd.endAge+'세 '+pd.gan+pd.ji+'('+pd.ss+'), ';}pastDWTxt=pastDWTxt.replace(/, $/,'');}

  // Gongmang
  var gm=analysis.calcGongmang(saju);
  var gmTxt=gm.desc||'없음';

  // Jijanggan ratio
  var jjgRatio=analysis.calcJijangganRatio(saju);
  var jjgRatioTxt=jjgRatio.filter(function(r){return r;}).map(function(r){
    return r.pillar+' '+r.ji+'('+r.items.map(function(it){return it.role+'='+it.gan+it.oh+' '+it.ss+' '+it.pct+'%';}).join(', ')+')';
  }).join(' | ');

  // Enriched sinsal
  var salEnriched=analysis.enrichSinsal(saju);

  // Dynamic keywords
  var dynKW = analysis.generateDynamicKeywords(saju, gg, dw, gm, jjgRatio);
  var dynKWText = formatKeywordsForAI(dynKW);

  // Sinsal compact
  var salSimple = '';
  if (saju.specialSals && saju.specialSals.length > 0) {
    salSimple = saju.specialSals.map(function(s){ return s.name+'('+s.desc+')'; }).join(', ');
  }
  var extraSals = analysis.calcExtraSinsal(saju);
  if (extraSals.length > 0) {
    var existNames = salSimple.split(', ').map(function(s){return s.split('(')[0];});
    extraSals.forEach(function(es){
      if (existNames.indexOf(es.name) < 0) {
        salSimple += (salSimple ? ', ' : '') + es.name+'('+es.desc+')';
      }
    });
  }

  // Johu/yongshin text
  var johuTxt = '';
  if(gg.johuDesc) johuTxt = '\n- 조후: '+gg.seasonName+' · '+gg.johuDesc;
  else if(gg.seasonName) johuTxt = '\n- 계절: '+gg.seasonName+(gg.deukryeong?' · 일간이 월지에서 힘을 얻음(득령)':' · 일간이 월지에서 힘을 잃음(실령)');

  // DW/SE vs wonkuk analysis
  var dwSeAnalysis = analysis.analyzeDWSEvsWonkuk(saju, dw);
  var dwWonTxt = '';
  if(dwSeAnalysis.daewoon.length > 0){
    dwWonTxt = '\n\n## ★ 현재 대운 vs 원국 관계 (핵심!)\n';
    dwSeAnalysis.daewoon.forEach(function(d){
      dwWonTxt += '- '+d.type+': '+d.desc+' (영향: '+d.impact+')\n';
    });
  }
  var seWonTxt = '';
  if(dwSeAnalysis.seun1.length > 0){
    seWonTxt = '\n## ★ '+dw.seun[0].y+'년 세운 vs 원국 관계 (올해 핵심!)\n';
    dwSeAnalysis.seun1.forEach(function(d){
      seWonTxt += '- '+d.type+': '+d.desc+' (영향: '+(d.impact||'전반적')+')\n';
    });
  }
  if(dwSeAnalysis.seun2.length > 0){
    seWonTxt += '\n## '+dw.seun[1].y+'년 세운 vs 원국 관계 (내년)\n';
    dwSeAnalysis.seun2.forEach(function(d){
      seWonTxt += '- '+d.type+': '+d.desc+' (영향: '+(d.impact||'전반적')+')\n';
    });
  }
  if(dwSeAnalysis.dwSeConflict.length > 0){
    seWonTxt += '\n⚠️ '+dwSeAnalysis.dwSeConflict.join(', ')+'\n';
  }

  // Hap-chung priority
  var hapChungResolved = analysis.resolveHapChungPriority(rel);
  var hapChungTxt = '';
  if(hapChungResolved.summary){
    hapChungTxt = '\n- ★합충우선순위: '+hapChungResolved.summary;
  }

  // Pagyeok info
  var pagyeokTxt = '';
  if(gg.pagyeokInfo){
    pagyeokTxt = '\n- ⚠️ 파격: '+gg.pagyeokInfo;
  }

  // True solar time info
  var trueSolarTxt = '';
  if(saju.trueSolarApplied){
    trueSolarTxt = ' (진태양시 보정: '+(saju.trueSolarMin>0?'+':'')+saju.trueSolarMin+'분, 출생지: '+params.city+')';
  }

  // Level A: interpretation context data
  var gungwiCtx = analysis.buildGungwiContext(saju, gg);
  var sinsalStory = analysis.buildSinsalStory(saju);
  var yearHL = analysis.buildYearHighlight(dwSeAnalysis, dw, wolunArr, wonJiArr);

  // Napeum story
  var napeumStory = '';
  if (gg.napeumText) {
    var napeumName = gg.napeumText.split('(')[0].trim();
    if (NAPEUM_STORY[napeumName]) {
      napeumStory = '\n★납음 스토리: ' + gg.napeumText + ' → ' + NAPEUM_STORY[napeumName];
    }
  }

  // Persona (month-gan vs day-gan)
  var personaTxt = '';
  var monthGanSS = saju.ss[1] ? saju.ss[1].ss : '';
  if (monthGanSS && SS_CONTEXT[monthGanSS]) {
    personaTxt = '\n★사회적 페르소나(월간↔일간): 월간=' + saju.ss[1].stem +
      '(' + monthGanSS + ') → 세상에 보여주는 모습: ' + SS_CONTEXT[monthGanSS].general;
    if (monthGanSS === saju.ss[2].ss) {
      personaTxt += '\n  ⚡ 월간=일간 동일! 가면을 안 쓰는 사람. 겉과 속이 같음. 진정성이 강점이자 약점.';
    }
  }

  // Level A: context section assembly
  var contextSection = '\n\n## ★★ AI를 위한 해석 맥락 (이것을 참고하여 풀이하세요) ★★\n';
  if (gungwiCtx.spouse) contextSection += gungwiCtx.spouse + '\n';
  if (gungwiCtx.career) contextSection += gungwiCtx.career + '\n';
  if (gungwiCtx.child) contextSection += gungwiCtx.child + '\n';
  if (gungwiCtx.outer) contextSection += gungwiCtx.outer + '\n';
  if (personaTxt) contextSection += personaTxt + '\n';
  if (napeumStory) contextSection += napeumStory + '\n';
  contextSection += '\n### 신살 스토리 (각 카테고리의 킬링 포인트로 활용)\n';
  contextSection += sinsalStory || '특별한 신살 없음';
  contextSection += '\n\n### 올해 핵심 사건\n';
  contextSection += yearHL.main;
  if (yearHL.hotMonths) contextSection += '\n핵심 달:\n' + yearHL.hotMonths;

  // ★★★ THE MASSIVE USR VARIABLE — copied exactly from runSajuAnalysis ★★★
  var usr='## 의뢰인\n- 생년월일시: '+params.y+'년 '+params.m+'월 '+params.d+'일 '+(params.h?params.h+'시':'시간미상')+trueSolarTxt+'\n- 성별: '+params.gender+' · 한국나이 '+dw.currentAge+'세\n- MBTI: '+mt+' ('+ti.n+')'+(params.h?'':'\n\n⚠️ 시간 미상 사주입니다. 시주(時柱) 기반 해석(자녀운, 말년운, 시지 궁위, 시지 합충)은 절대 하지 마세요. 년·월·일주만으로 풀이하세요. 항목 수는 10~12개로 조정하세요.')+'\n- 인지기능 스택: '+ti.cf+' (가장 강한: '+strongCF+' / 가장 약한: '+weakCF+')\n- 각 축: '+strArr.join(', ')+'\n\n## MBTI 강도별 행동 프로파일 (풀이에 반드시 반영할 것!)\n'+(function(){var m=miAllParam(params.mbtiChoices, params.mbtiIntensities);var axes=['E/I','S/N','T/F','J/P'];var labels=[strArr[0],strArr[1],strArr[2],strArr[3]];return axes.map(function(a,i){return '- '+labels[i]+': '+m[i].trait+'\n  연애: '+m[i].love+'\n  직업: '+m[i].work+'\n  번아웃: '+m[i].burn;}).join('\n');})()+'\n\n## 사주 원국 (절기: '+saju.currentJeolgi+')\n- 사주: '+saju.P.map(function(p){return p.l+' '+p.s+p.b;}).join(' | ')+'\n- 일주: '+ilju+' · 일간: '+saju.dm+'('+saju.dmEl+')\n- 천간십성: '+saju.ss.map(function(s){return s.pillar+' '+s.stem+'('+s.ss+')';}).join(', ')+'\n- ★궁위십성(지지정기 기준): '+saju.jiSS.map(function(j){return j.pillar+' '+j.branch+'='+j.ss+'('+j.gungwi+')';}).join(' | ')+'\n- 오행(표면 8자): 목='+saju.el['목']+' 화='+saju.el['화']+' 토='+saju.el['토']+' 금='+saju.el['금']+' 수='+saju.el['수']+'\n- ★오행(지장간포함): 목='+saju.elFull['목']+' 화='+saju.elFull['화']+' 토='+saju.elFull['토']+' 금='+saju.elFull['금']+' 수='+saju.elFull['수']+(saju.hiddenOh.length>0?'\n  → 표면상 없지만 지장간에 숨어있는 오행: '+saju.hiddenOh.join(',')+' (겉으로 안 보이지만 속에 잠재력으로 존재)':'')+'\n- 12운성: '+saju.P.map(function(p,i){return p.l+'='+saju.uns[i];}).join(', ')+'\n- 합: '+hapTxt+' | 삼합: '+samhapTxt+'\n- 충: '+chungTxt+' | 천간충: '+cheonganChungTxt+'\n- 형: '+hyungTxt+' | 해: '+jijiHaeTxt+hapChungTxt+'\n'+(saju.amhap.length>0?'- ★암합(숨겨진 합): '+saju.amhap.map(function(a){return a.from+'↔'+a.to+'=합화'+a.hapOh+' ['+a.gungwi+'궁 숨겨진 인연]';}).join(', ')+'\n':'')+'\n※ 합과 충이 동시에 존재할 때: 인접한 합이 충을 해소하는지(탐합망충), 충이 합을 깨뜨리는지 판단하여 유기적으로 해석할 것\n\n## 격국 분석\n- ★격국: '+gg.gyeokgukName+' ('+gg.gyeokgukBasis+')\n  → '+gg.gyeokgukDesc+'\n'+(gg.isJonggyeok?'  ⚠️ 종격(從格) 사주! 용신 방향이 일반 사주와 정반대입니다. 강한 쪽을 따라가야 합니다.\n':'')+(gg.isHwakyeok?'  ⚠️ 화격(化格) 사주! 일간이 본래 오행을 버리고 합화 오행으로 변함.\n':'')+pagyeokTxt+'\n- ★납음: '+(gg.napeumText||'정보없음')+'\n- 십성비중: 비겁='+gg.cnt['비겁'].toFixed(1)+' 식상='+gg.cnt['식상'].toFixed(1)+' 재성='+gg.cnt['재성'].toFixed(1)+' 관성='+gg.cnt['관성'].toFixed(1)+' 인성='+gg.cnt['인성'].toFixed(1)+'\n- ★일간 강도: '+gg.strengthGrade+' '+gg.strengthScore+'점 (자기편='+gg.selfStr.toFixed(1)+' vs 상대편='+gg.otherStr.toFixed(1)+')'+(gg.deukryeong?' [득령]':' [실령]')+johuTxt+'\n- 강한: '+gg.dominant[0]+'('+gg.dominant[1].toFixed(1)+') 약한: '+gg.weak[0]+'('+gg.weak[1].toFixed(1)+')\n- 부족오행: '+(saju.lackFull.length>0?saju.lackFull.join(','):'없음')+'\n- 용신: '+gg.yongshin+' ['+gg.yongshinType+'용신]'+(gg.johuYongshin&&gg.yongshinType!=='조후'?' · 조후참고: '+gg.johuYongshin:'')+'\n- ★오행흐름: '+gg.flowSummary+'\n\n## 참고 힌트 (AI 자율 판단 우선, 반드시 사용할 필요 없음)\n'+dynKWText+'\n\n## 대운 흐름 ('+dw.direction+', '+dw.daewoonAge+'세 시작)\n'+dwTxt+'\n현재 대운: '+(currentDW?currentDW.gan+currentDW.ji+'('+currentDW.ganH+currentDW.jiH+') '+currentDW.ss+'운 ('+currentDW.startAge+'~'+currentDW.endAge+'세)':'대운 전')+pastDWTxt+transitionTxt+'\n세운: '+seTxt+'\n- ★삼재: '+(samjaeTxt||'계산불가')+dwWonTxt+seWonTxt+'\n\n## '+wolunYear+'년 월운 (월별 운세)\n'+wolunTxt+'\n\n## 신살 (참고)\n'+(salSimple||'없음')+'\n- 공망: '+gmTxt+contextSection+'\n\nJSON으로 출력하세요.';

  // Theory deep data injection
  try {
    var theoryMBTI = (typeof MT_buildFullContext === 'function') ? MT_buildFullContext(mt, params.mbtiIntensities, dw.currentAge) : '';
    var theorySaju = (typeof SJ_buildFullContext === 'function') ? SJ_buildFullContext(saju, gg, dw, (params.gender === '남성' || params.gender === '남') ? '남' : '여') : '';
    if (theoryMBTI || theorySaju) {
      usr = usr.replace('JSON으로 출력하세요.',
        '\n\n## MBTI 이론 심층 데이터 (교차 분석에 반드시 활용)\n' + theoryMBTI +
        '\n\n## 사주 이론 심층 데이터 (교차 분석에 반드시 활용)\n' + theorySaju +
        '\n\nJSON으로 출력하세요.');
    }
  } catch(e) { console.warn('[MBTS] Theory 주입 실패:', e); }

  // Pattern injection
  try {
    if (typeof buildPatternPrompt === 'function' && typeof buildUserTags === 'function') {
      var userTags = buildUserTags(saju, gg, dw, mt, params.mbtiIntensities);
      var patternText = buildPatternPrompt('premium', userTags);
      if (patternText) {
        usr = usr.replace('JSON으로 출력하세요.',
          '\n\n## 교수 토론 교차 패턴\n' +
          '아래는 이 소주제에 대한 교수 토론 중 나온 패턴들이다.\n' +
          '위 theory 데이터를 기준으로 이 중 실제로 해당하는 3~4개만 골라서 풀이에 녹여라.\n' +
          '해당하지 않는 것은 무시하라.\n\n' +
          patternText +
          '\n\nJSON으로 출력하세요.');
      }
    }
  } catch(e) { console.warn('[MBTS] 패턴 주입 실패:', e); }

  return usr;
}

// --- Helper: Samjae calculation ---
function buildSamjaeTxt(saju, dw) {
  var samjaeGroups = [
    {group:[8,0,4], disaster:[2,3,4]},
    {group:[2,6,10], disaster:[5,6,7]},
    {group:[5,9,1], disaster:[11,0,1]},
    {group:[11,3,7], disaster:[8,9,10]}
  ];
  var birthJi = saju.raw.yj;
  var currentYear = new Date().getFullYear();
  var currentYearJi = ((currentYear + 8) % 12);
  var samjaeTxt = '';
  for (var si = 0; si < samjaeGroups.length; si++) {
    var sg = samjaeGroups[si];
    if (sg.group.indexOf(birthJi) >= 0) {
      var disasterJis = sg.disaster;
      for (var syr = 0; syr < 3; syr++) {
        var checkYearJi = ((currentYear + syr + 8) % 12);
        var disIdx = disasterJis.indexOf(checkYearJi);
        if (disIdx >= 0) {
          var samjaeNames = ['들삼재(시작)','눌삼재(절정)','날삼재(마무리)'];
          if (syr === 0) {
            var samjaeStatus = samjaeNames[disIdx];
            samjaeTxt = currentYear + '년 ' + samjaeStatus + ' — ' + JIJI_KR[disasterJis[0]]+JIJI_KR[disasterJis[1]]+JIJI_KR[disasterJis[2]]+'년 삼재 구간';
          } else if (syr === 1 && !samjaeTxt) {
            samjaeTxt = (currentYear+1) + '년부터 삼재 시작 예정 ('+JIJI_KR[disasterJis[0]]+JIJI_KR[disasterJis[1]]+JIJI_KR[disasterJis[2]]+'년)';
          }
        }
      }
      if (!samjaeTxt) {
        var nextSamjaeStart = disasterJis[0];
        var yearsUntil = ((nextSamjaeStart - currentYearJi) + 12) % 12;
        if (yearsUntil === 0) yearsUntil = 12;
        samjaeTxt = '현재 삼재 아님. 다음 삼재: ' + (currentYear + yearsUntil) + '년 시작';
      }
      break;
    }
  }
  return samjaeTxt;
}

// --- Helper: Monthly fortune (wolun) data ---
function buildWolunData(saju, dw) {
  var currentYear = new Date().getFullYear();
  var wolunYear = currentYear;
  var wolunYearGan = ((wolunYear + 6) % 10);
  var monthStartStem = ((wolunYearGan % 5) * 2 + 2) % 10;
  var monthNames = ['1월(인월)','2월(묘월)','3월(진월)','4월(사월)','5월(오월)','6월(미월)','7월(신월)','8월(유월)','9월(술월)','10월(해월)','11월(자월)','12월(축월)'];
  var monthBranches = [2,3,4,5,6,7,8,9,10,11,0,1];
  var dg = saju.raw.dg;
  var wolunArr = [];
  for (var wi = 0; wi < 12; wi++) {
    var wGan = (monthStartStem + wi) % 10;
    var wJi = monthBranches[wi];
    var wGanSS = getSipsung(dg, wGan);
    var wJiJJG = JIJANGGAN_DATA[wJi];
    var wJiJeonggi = wJiJJG[wJiJJG.length - 1].g;
    var wJiSS = getSipsung(dg, wJiJeonggi);
    var ssGroup = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상','편재':'재성','정재':'재성','편관':'관성','정관':'관성','편인':'인성','정인':'인성'};
    var wGroup = ssGroup[wGanSS] || wGanSS;
    var wolunHint = {
      '비겁':'자기에너지강화, 독립·경쟁의달, 주변과힘겨루기',
      '식상':'표현·창작의달, 말과글이잘풀림, 새아이디어',
      '재성':'재물·실리의달, 수입기회, 현실적성과',
      '관성':'책임·압박의달, 직장변화, 자기관리필요',
      '인성':'학습·휴식의달, 귀인등장, 내면성장'
    };
    wolunArr.push({
      month: monthNames[wi],
      gan: TGAN_KR[wGan], ji: JIJI_KR[wJi],
      ganSS: wGanSS, jiSS: wJiSS,
      group: wGroup,
      hint: wolunHint[wGroup] || ''
    });
  }
  // Wolun with wonkuk hap/chung analysis
  var WOLUN_CHUNG=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var WOLUN_YUKHAP=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var wonJiArr=[{v:saju.raw.yj,l:'년지'},{v:saju.raw.mj,l:'월지'},{v:saju.raw.dj,l:'일지'}];
  if(saju.raw.hj!=null)wonJiArr.push({v:saju.raw.hj,l:'시지'});
  var wGungwi={'년지':'외부환경','월지':'직업','일지':'배우자·건강','시지':'자녀'};
  var wolunTxt = wolunArr.map(function(w){
    var wJiIdx=JIJI_KR.indexOf(w.ji);
    var rels=[];
    wonJiArr.forEach(function(wj){
      WOLUN_CHUNG.forEach(function(cp){if((wJiIdx===cp[0]&&wj.v===cp[1])||(wJiIdx===cp[1]&&wj.v===cp[0]))rels.push(w.ji+wj.l.charAt(0)+JIJI_KR[wj.v]+'충('+wGungwi[wj.l]+')');});
      WOLUN_YUKHAP.forEach(function(yh){if((wJiIdx===yh[0]&&wj.v===yh[1])||(wJiIdx===yh[1]&&wj.v===yh[0]))rels.push(w.ji+JIJI_KR[wj.v]+'합('+wGungwi[wj.l]+')');});
    });
    var relStr=rels.length>0?' | '+rels.join(', '):'';
    return w.month + ' ' + w.gan + w.ji + '(' + w.ganSS + '/' + w.jiSS + ') → ' + w.group + '운' + relStr;
  }).join('\n');
  return { wolunTxt: wolunTxt, wolunArr: wolunArr, wolunYear: wolunYear, wonJiArr: wonJiArr };
}

// --- Helper: format keywords for AI ---
function formatKeywordsForAI(kwObj) {
  if (!kwObj || typeof kwObj !== 'object') return '';
  var lines = [];
  Object.keys(kwObj).forEach(function(key) {
    var val = kwObj[key];
    if (Array.isArray(val)) {
      lines.push('- ' + key + ': ' + val.join(', '));
    } else if (typeof val === 'string') {
      lines.push('- ' + key + ': ' + val);
    }
  });
  return lines.join('\n');
}

module.exports = {
  buildUserPrompt: buildUserPrompt,
  buildSamjaeTxt: buildSamjaeTxt,
  buildWolunData: buildWolunData,
  formatKeywordsForAI: formatKeywordsForAI
};
