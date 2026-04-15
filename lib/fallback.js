// lib/fallback.js — AI failure local fallback content generator
// Extracted from saju-engine.js mkFB() (lines 4527-5145)
// TODO: This file exceeds 300 lines. Split into fallback-items.js when
// saju-data.js extraction is complete and dependencies are stable.
'use strict';

var data = require('./saju-data');
var analysis = require('./saju-analysis');
var mbti = require('./mbti-data');

var TY = mbti.TY;
var DM_AX = mbti.DM_AX;
var MI = mbti.MI;
var TGAN = data.TGAN;
var JIJI = data.JIJI;
var TGAN_KR = data.TGAN_KR;
var JIJI_KR = data.JIJI_KR;
var ILJU_DATA = data.ILJU_DATA;
var SSP = data.SSP;
var ILGAN_KW = data.ILGAN_KW;
var JEOKCHEONSU = data.JEOKCHEONSU;

// miKeyParam equivalent for server-side use (no ST global)
function miKeyParam(axisIdx, mbtiChoices, mbtiIntensities) {
  var side = mbtiChoices[axisIdx] === 'L' ? DM_AX[axisIdx].L : DM_AX[axisIdx].R;
  var rawIt = mbtiIntensities[axisIdx];
  var lv = (rawIt && rawIt >= 76) ? 88 : (rawIt && rawIt >= 61) ? 68 : 55;
  return MI[side][lv];
}

function sspDesc(ssName, pillarLabel){
  if(!SSP[ssName]) return '';
  return SSP[ssName][pillarLabel]||'';
}

// NOTE: mkFB depends on ST global (UI state) for MBTI choices/intensities.
// In server context, these must be passed via params.
// For now, mkFB uses miKey() which falls back to defaults when ST is undefined.
function mkFB(saju, mt, gg, params) {
  // params is optional — when provided, used for MBTI intensities
  var mbtiChoices = (params && params.mbtiChoices) || [null,null,null,null];
  var mbtiIntensities = (params && params.mbtiIntensities) || [55,55,55,55];

  var ti=TY[mt]||{n:"탐험가",cf:"Ni-Te-Fi-Se"},dm=saju.dm,dmEl=saju.dmEl,cf=(ti.cf||"Ni-Te-Fi-Se").split("-");
  var ilju=saju.P[2].s+saju.P[2].b;
  var iljuD=ILJU_DATA[ilju]||{k:dm+'의 에너지',t:'독특한 기질의 소유자',love:'배우자궁의 기운에 따라 다채로운 연애사',job:'다방면 적성'};
  gg=gg||analysis.analyzeGyeokguk(saju);
  var rel=analysis.calcRelations(saju);

  /* --- Phase 0: MBTI intensity profile --- */
  var mi0=miKeyParam(0, mbtiChoices, mbtiIntensities);
  var mi1=miKeyParam(1, mbtiChoices, mbtiIntensities);
  var mi2=miKeyParam(2, mbtiChoices, mbtiIntensities);
  var mi3=miKeyParam(3, mbtiChoices, mbtiIntensities);
  var miShorts=[mi0.short,mi1.short,mi2.short,mi3.short].join(' + ');

  /* --- Phase 1: deep analysis --- */
  var hasSS=function(t){return saju.ss.some(function(s){return s.ss&&s.ss.indexOf(t)>=0;});};
  var ssAt=function(t){return saju.ss.filter(function(s){return s.ss&&s.ss.indexOf(t)>=0;}).map(function(s){return s.pillar;});};
  var ssCount=function(t){return saju.ss.filter(function(s){return s.ss&&s.ss.indexOf(t)>=0;}).length;};

  var dayBrSS=saju.ss[2]?saju.ss[2].ss:'';
  var dayUns=saju.uns[2]||'';
  var dayStrongUns=['건록','제왕','관대','장생'].indexOf(dayUns)>=0;
  var dayJjg=saju.jjg[2]||[];
  var dayJjgMain=dayJjg.length>0?dayJjg[dayJjg.length-1]:{stem:'',oh:''};

  var ySS=saju.ss[0]?saju.ss[0].ss:'';
  var mSS=saju.ss[1]?saju.ss[1].ss:'';
  var hSS=saju.ss[3]?saju.ss[3].ss:'';

  var hasChung=rel.jijiChung.length>0;
  var hasHap=rel.jijiHap.length>0||rel.cheonganHap.length>0;
  var hasHyung=rel.jijiHyung.length>0;
  var hasSamhap=rel.jijiSamhap.length>0;

  var salGood=saju.specialSals.filter(function(s){return s.type==='good';});
  var salBad=saju.specialSals.filter(function(s){return s.type==='bad';});
  var hasDohwa=salBad.some(function(s){return s.name.indexOf('도화')>=0;});
  var hasYeokma=saju.specialSals.some(function(s){return s.name.indexOf('역마')>=0;});
  var hasBaekho=salBad.some(function(s){return s.name.indexOf('백호')>=0;});
  var hasGuiin=salGood.some(function(s){return s.name.indexOf('귀인')>=0;});

  var ggType=gg.strong?'신강':'신약';
  var _lk=gg.lack.length>0?gg.lack[0]:'';
  var _ex=gg.dominant[0];
  var elArr=Object.entries(saju.el);
  var elMax=elArr.reduce(function(a,b){return b[1]>a[1]?b:a;});
  var elZero=elArr.filter(function(e){return e[1]===0;}).map(function(e){return e[0];});

  // MBTI axis labels (using params instead of ST global)
  var eiL=mbtiChoices[0]==="L"?"외향":"내향";
  var snL=mbtiChoices[1]==="L"?"감각":"직관";
  var tfL=mbtiChoices[2]==="L"?"사고":"감정";
  var jpL=mbtiChoices[3]==="L"?"판단":"인식";

  // Feature scoring
  var feat={};
  feat.chungStrong = rel.jijiChung.length>=2;
  feat.chungSingle = rel.jijiChung.length===1;
  feat.hapRich = (rel.jijiHap.length+rel.cheonganHap.length+rel.jijiSamhap.length)>=2;
  feat.sikSangStrong = ssCount('식신')+ssCount('상관')>=2;
  feat.gwanStrong = ssCount('편관')+ssCount('정관')>=2;
  feat.jaeStrong = ssCount('편재')+ssCount('정재')>=2;
  feat.inStrong = ssCount('편인')+ssCount('정인')>=2;
  feat.biStrong = ssCount('비견')+ssCount('겁재')>=2;
  feat.elZeroMulti = elZero.length>=2;
  feat.fireHeavy = saju.el['화']>=3;
  feat.waterHeavy = saju.el['수']>=3;
  feat.woodHeavy = saju.el['목']>=3;
  feat.metalHeavy = saju.el['금']>=3;
  feat.earthHeavy = saju.el['토']>=3;
  feat.dohwaMulti = saju.specialSals.filter(function(s){return s.name.indexOf('도화')>=0;}).length>=2;

  /* --- Phase 2: tone setting (by oheng) --- */
  var tone={};
  if(dmEl==='화'){
    tone.adj='뜨거운'; tone.verb='타오르는'; tone.energy='불꽃'; tone.crisis='폭발';
    tone.calm='재가 된 뒤의 고요'; tone.metaphor='숯불처럼 겉은 잔잔해도 속은 달궈져 있는';
    tone.style='직관적이고 열정적인';
  }else if(dmEl==='수'){
    tone.adj='깊은'; tone.verb='흘러가는'; tone.energy='파도'; tone.crisis='범람';
    tone.calm='깊은 호수의 정적'; tone.metaphor='잔잔한 수면 아래 거대한 해류가 흐르는';
    tone.style='유연하고 통찰력 있는';
  }else if(dmEl==='목'){
    tone.adj='성장하는'; tone.verb='뻗어나가는'; tone.energy='새싹'; tone.crisis='꺾임';
    tone.calm='뿌리 깊은 나무의 평온'; tone.metaphor='바람에 흔들려도 꺾이지 않는';
    tone.style='진취적이고 생명력 넘치는';
  }else if(dmEl==='금'){
    tone.adj='날카로운'; tone.verb='벼려지는'; tone.energy='칼날'; tone.crisis='부러짐';
    tone.calm='명경지수의 고요함'; tone.metaphor='천 번을 두드려야 완성되는 명검 같은';
    tone.style='결단력 있고 정밀한';
  }else{
    tone.adj='묵직한'; tone.verb='품어내는'; tone.energy='대지'; tone.crisis='지진';
    tone.calm='광야의 침묵'; tone.metaphor='아무리 밟혀도 결국 모든 것을 키워내는';
    tone.style='안정적이고 포용력 있는';
  }

  var _lkDir={"목":"동쪽","화":"남쪽","토":"중앙","금":"서쪽","수":"북쪽"};
  var _lkColor={"목":"초록색","화":"빨간색/주황색","금":"흰색/은색","수":"검정/남색","토":"노란색/베이지"};
  var _lkExercise={"목":"산책·등산·스트레칭","화":"러닝·댄스·핫요가","토":"요가·필라테스·맨몸운동","금":"웨이트·수영·호흡운동","수":"수영·명상·산책"};
  var _lkFood={"목":"신맛(식초,레몬,매실)","화":"쓴맛(커피,다크초콜릿,쑥)","토":"단맛(꿀,고구마,대추)","금":"매운맛(생강,마늘,고추)","수":"짠맛(미역,다시마,해산물)"};
  var elN={"목":"나무","화":"불꽃","토":"대지","금":"칼날","수":"물결"};

  // Build fallback items via sub-modules
  var items = require('./fallback-items');
  var items2 = require('./fallback-items2');

  var ctx = {
    saju:saju, mt:mt, gg:gg, rel:rel, ti:ti, dm:dm, dmEl:dmEl, cf:cf,
    ilju:ilju, iljuD:iljuD, tone:tone, feat:feat,
    mi0:mi0, mi1:mi1, mi2:mi2, mi3:mi3, miShorts:miShorts,
    hasSS:hasSS, ssAt:ssAt, ssCount:ssCount,
    dayBrSS:dayBrSS, dayUns:dayUns, dayStrongUns:dayStrongUns,
    dayJjg:dayJjg, dayJjgMain:dayJjgMain,
    ySS:ySS, mSS:mSS, hSS:hSS,
    hasChung:hasChung, hasHap:hasHap, hasHyung:hasHyung, hasSamhap:hasSamhap,
    salGood:salGood, salBad:salBad,
    hasDohwa:hasDohwa, hasYeokma:hasYeokma, hasBaekho:hasBaekho, hasGuiin:hasGuiin,
    ggType:ggType, _lk:_lk, _ex:_ex, elArr:elArr, elMax:elMax, elZero:elZero,
    eiL:eiL, snL:snL, tfL:tfL, jpL:jpL,
    _lkDir:_lkDir, _lkColor:_lkColor, _lkExercise:_lkExercise, _lkFood:_lkFood, elN:elN,
    mbtiChoices:mbtiChoices,
    sspDesc:sspDesc, TGAN:TGAN, JIJI:JIJI, TGAN_KR:TGAN_KR, JIJI_KR:JIJI_KR
  };

  var r1 = items.buildItems1to7(ctx);
  var r2 = items2.buildItems8to14(ctx);

  /* --- Phase 4: category assembly --- */
  var _animalMap={'목':{animal:'사슴',emoji:'🦌',r:'목(木) 기운의 성장 에너지와 부드러움'},'화':{animal:'불사조',emoji:'🔥',r:'화(火) 기운의 열정과 빛나는 존재감'},'토':{animal:'곰',emoji:'🐻',r:'토(土) 기운의 묵직한 안정감과 포용력'},'금':{animal:'백호',emoji:'🐯',r:'금(金) 기운의 날카로운 결단력과 카리스마'},'수':{animal:'용',emoji:'🐉',r:'수(水) 기운의 깊은 지혜와 유연한 변화력'}};
  var _aInfo=_animalMap[dmEl]||_animalMap['토'];
  return{
    profileTitle:ilju+"일주 × "+mt,
    quote:'"'+iljuD.k+'" — '+ilju+'일주 '+mt+' '+ti.n+', 세상에 단 하나뿐인 당신의 이야기입니다.',
    destinyAnimal:{animal:_aInfo.animal,emoji:_aInfo.emoji,reason:dm+' 일간('+dmEl+')의 '+_aInfo.r+'이 '+mt+' '+ti.n+'의 성격과 만나 '+_aInfo.animal+'의 에너지를 형성합니다.'},
    categories:[
      {title:"기질 및 성격",subtitle:ilju+"일주 × "+mt+"가 만드는 고유한 당신",items:[
        {catch:r1.i1_catch,content:r1.i1_body,insightType:"gold",insightIcon:"💡",insightText:ilju+"일주의 본질: '"+iljuD.k+"'. "+mt+"의 "+cf[0]+"이 이 기질을 세상 밖으로 표현합니다. 당신만의 고유한 조합을 믿으세요."},
        {catch:r1.i2_catch,content:r1.i2_body,insightType:"purple",insightIcon:"🔮",insightText:"사주 원국은 바뀌지 않지만, 대운과 세운이 매 시기 새로운 에너지를 보내줍니다. 원국의 구조를 알면, 어떤 시기에 어떤 기회가 올지 예측할 수 있어요."},
        {catch:r1.i3_catch,content:r1.i3_body,insightType:"gold",insightIcon:"💡",insightText:r1.domSS+" 에너지가 당신의 핵심 동력입니다. 이 에너지를 억누르지 말고 올바른 방향으로 쓰는 것이 성공의 열쇠예요."}
      ]},
      {title:"감정과 내면",subtitle:dm+" 일간의 "+tone.adj+" 감정 세계 해부",items:[
        {catch:r1.i4_catch,content:r1.i4_body,insightType:"fire",insightIcon:"⚠️",insightText:"겉과 속의 간극을 줄이는 가장 좋은 방법은 '신뢰할 수 있는 한 사람'에게 속마음을 보여주는 것입니다. 완벽한 모습만 보여주려 하지 마세요."},
        {catch:r1.i5_catch,content:r1.i5_body,insightType:"water",insightIcon:"💧",insightText:(_lk?"부족한 "+_lk+" 오행은 의식적으로 채워야 합니다. 색상, 방위, 음식, 활동 — 작은 변화가 큰 차이를 만듭니다.":"과다한 "+elMax[0]+" 에너지는 반대 오행 활동으로 식히세요.")},
        {catch:r1.i6_catch,content:r1.i6_body,insightType:"fire",insightIcon:"⚠️",insightText:"감정이 치밀어 올 때: '나 지금 좀 "+tone.adj+"해서, 정리되면 말할게.' 이 한 문장이 관계를 살립니다."}
      ]},
      {title:"직업과 재물",subtitle:_ex+" 에너지 × "+cf[0]+"이 만드는 커리어 로드맵",items:[
        {catch:r1.i7_catch,content:r1.i7_body,insightType:"gold",insightIcon:"💡",insightText:"위기는 끝이 아니라 "+dayUns+"의 에너지가 작용하는 과정입니다. "+ilju+"일주의 회복력을 믿으세요."},
        {catch:r2.i8_catch,content:r2.i8_body,insightType:"gold",insightIcon:"💡",insightText:"직업 핵심: "+ilju+"일주 "+mt+"는 '"+iljuD.job+"' 분야가 최적. "+r1.domSS+" 에너지가 직업에 녹으면 일이 곧 충전이 됩니다."},
        {catch:r2.i9_catch,content:r2.i9_body,insightType:"water",insightIcon:"💧",insightText:"재물 공식: 월급날 자동이체 3개 — ① 생활비 ② 절대 안 건드리는 적금 ③ 자유 용돈. "+dm+" 일간의 "+dmEl+" 스타일에 맞는 재테크를 찾으세요."}
      ]},
      {title:"관계와 인연",subtitle:"육친(六親)이 그리는 인간관계 지도",items:[
        {catch:r2.i10_catch,content:r2.i10_body,insightType:"fire",insightIcon:"⚠️",insightText:"연애 처방: 새로운 사람을 만나면 '3개월 관찰 기간'을 두세요. "+cf[0]+"의 환상이 가라앉고 실제 모습이 보이기 시작하는 시점입니다."},
        {catch:r2.i11_catch,content:r2.i11_body,insightType:"purple",insightIcon:"🔮",insightText:"인생의 네 시기가 각각 다른 에너지를 가지고 있어요. 지금 어떤 기둥의 영향 아래 있는지 파악하면, 현재 상황이 이해됩니다."},
        {catch:r2.i12_catch,content:r2.i12_body,insightType:"gold",insightIcon:"💡",insightText:"인간관계 핵심 룰: 가까운 사람과 돈 거래 금지. 보증 서지 않기. 감정적일 때 중요한 결정 하지 않기."}
      ]},
      {title:"개운과 에너지",subtitle:"용신 "+gg.yongshin+"을 활용한 실전 개운 전략",items:[
        {catch:r2.i13_catch,content:r2.i13_body,insightType:"water",insightIcon:"💧",insightText:"즉시 실행 3가지: ① 핸드폰 배경화면을 "+(_lk||gg.yongshin)+" 이미지로 바꾸기 ② "+(_lkColor[r2.ysOh]||"용신 색상")+" 소품 하나 배치 ③ 하루 10분 조용한 시간 확보"},
        {catch:r2.i14_catch,content:r2.i14_body,insightType:"wood",insightIcon:"🌿",insightText:"에너지 공식: 3일 풀가동 → 1일 반충전. 이 리듬을 한 달만 유지하면 번아웃 주기가 길어집니다. "+dm+" 일간의 "+dmEl+" 에너지를 아끼지 말고 '순환'시키세요."}
      ]}
    ]
  };
}

module.exports = { mkFB: mkFB };
