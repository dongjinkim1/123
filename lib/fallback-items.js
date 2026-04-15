// lib/fallback-items.js — Fallback items 1-7 (personality, structure, emotions)
// Extracted from mkFB() Phase 3 items 1-7
'use strict';

function buildItems1to7(ctx) {
  var saju=ctx.saju, mt=ctx.mt, gg=ctx.gg, rel=ctx.rel, ti=ctx.ti, dm=ctx.dm, dmEl=ctx.dmEl, cf=ctx.cf;
  var ilju=ctx.ilju, iljuD=ctx.iljuD, tone=ctx.tone, feat=ctx.feat;
  var mi0=ctx.mi0, mi1=ctx.mi1, mi2=ctx.mi2, mi3=ctx.mi3, miShorts=ctx.miShorts;
  var hasSS=ctx.hasSS, ssAt=ctx.ssAt, ssCount=ctx.ssCount;
  var dayBrSS=ctx.dayBrSS, dayUns=ctx.dayUns, dayStrongUns=ctx.dayStrongUns;
  var dayJjg=ctx.dayJjg, dayJjgMain=ctx.dayJjgMain;
  var ySS=ctx.ySS, mSS=ctx.mSS, hSS=ctx.hSS;
  var hasChung=ctx.hasChung, hasHap=ctx.hasHap, hasHyung=ctx.hasHyung;
  var salGood=ctx.salGood, hasGuiin=ctx.hasGuiin;
  var _ex=ctx._ex, elArr=ctx.elArr, elMax=ctx.elMax, elZero=ctx.elZero, _lk=ctx._lk;
  var sspDesc=ctx.sspDesc, TGAN=ctx.TGAN, JIJI=ctx.JIJI, TGAN_KR=ctx.TGAN_KR, JIJI_KR=ctx.JIJI_KR;
  var ST_ch = ctx.mbtiChoices; // uses mbtiChoices instead of ST.ch
  var elN=ctx.elN;

  // ITEM 1: essence
  var i1_body = ilju+"일주. 사주학에서 이 조합을 '<b>"+iljuD.k+"</b>'라고 부릅니다.\n\n"
  +dm+"("+TGAN[saju.raw.dg]+") 일간이 "+saju.P[2].b+"("+JIJI[saju.raw.dj]+") 위에 앉아있는 형상인데, 이걸 풀어보면 이렇습니다. "+iljuD.t
  +" 12운성으로는 <b>"+dayUns+"</b>에 해당해요. "
  +(dayUns==='건록'?"건록은 녹봉을 받는 자리 — 스스로 먹고살 힘이 있다는 뜻이에요. 남에게 의지하기보다 자기 힘으로 길을 여는 사람입니다."
  :dayUns==='제왕'?"제왕은 에너지가 정점에 오른 상태 — 강렬하고, 존재감이 압도적이지만, 정점 다음은 하강이라는 걸 기억해야 합니다."
  :dayUns==='관대'?"관대는 사회에 나가 관을 쓴 상태 — 인정받고 싶은 욕구가 강하고, 실제로 사회적 활동에서 빛을 발합니다."
  :dayUns==='장생'?"장생은 새로 태어나는 에너지 — 어떤 분야든 시작의 힘이 강하고, 꾸준히 성장해가는 기운을 타고났습니다."
  :dayUns==='목욕'?"목욕은 갓 태어나 씻기는 단계 — 변화와 변동 속에서 자기를 재발견하는 기운."
  :dayUns==='쇠'?"쇠는 전성기가 지나 안정에 접어드는 단계 — 겉으로는 조용하지만, 경험에서 우러나오는 내공이 있는 사람입니다."
  :dayUns==='병'?"병(病)은 에너지가 약해지는 지점이지만, 역설적으로 감수성과 직관력이 극대화되는 자리예요."
  :dayUns==='사'?"사(死)는 겉으로 소멸하는 단계지만, 사주학에서는 '극적인 전환'을 뜻합니다."
  :dayUns==='묘'?"묘(墓)는 저장과 축적의 자리 — 겉으로 드러내지 않지만 속에 엄청난 것들을 쌓아두는 사람."
  :dayUns==='절'?"절(絶)은 끊어짐의 자리이자 새로운 시작의 씨앗 — 매번 다시 태어나는 불사조 같은 기운."
  :dayUns==='태'?"태(胎)는 잉태의 에너지 — 무언가 새로운 것을 품고 키워내는 힘이 있습니다."
  :"양(養)은 자라나는 에너지 — 나이가 들수록 빛나는 구조입니다.")+"\n\n"
  +"이제 사주 전체를 펼쳐볼게요. 일지의 지장간 속에는 "+dayJjg.map(function(j){return j.stem+"("+j.oh+") "+j.days+"일";}).join(', ')+"이 숨어있어요. "
  +(dayJjgMain.stem?"정기(正氣)인 <b>"+dayJjgMain.stem+"("+dayJjgMain.oh+")</b>가 "+dayBrSS+"을 만들어내는데, 이건 당신이 배우자나 가장 가까운 사람에게 보이는 '진짜 속마음'의 에너지입니다. ":"")
  +"\n\nMBTI 프로파일을 볼게요. 당신은 <b>"+miShorts+"</b>의 조합이에요.\n"
  +"<b>"+mi0.short+"</b>: "+mi0.trait+"\n"
  +"<b>"+mi1.short+"</b>: "+mi1.trait+"\n"
  +"<b>"+mi2.short+"</b>: "+mi2.trait+"\n"
  +"<b>"+mi3.short+"</b>: "+mi3.trait+"\n\n"
  +"여기에 <b>"+mt+"("+ti.n+")</b>의 주기능 "+cf[0]+"이 얹어집니다. "
  +(cf[0]==='Ne'?"Ne는 끝없이 가능성을 탐색하는 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 상상력이 현실에 발을 딛고 폭발합니다."
  :cf[0]==='Ni'?"Ni는 직관의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 예언자적 통찰력이 됩니다."
  :cf[0]==='Se'?"Se는 감각의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 현실을 생생하게 살아가는 힘이 됩니다."
  :cf[0]==='Si'?"Si는 과거 경험 활용의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 깊이있는 판단력이 됩니다."
  :cf[0]==='Fe'?"Fe는 공감의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 사람을 이끄는 카리스마가 됩니다."
  :cf[0]==='Fi'?"Fi는 깊은 자기 탐구의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 대체불가능한 진정성이 됩니다."
  :cf[0]==='Te'?"Te는 실행의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 아이디어를 현실로 만드는 추진력이 됩니다."
  :"Ti는 분석의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 남들이 놓치는 본질을 꿰뚫는 눈이 됩니다.");
  var i1_catch = iljuD.k+", "+dayUns+"에 앉은 "+tone.energy+": "+ilju+"일주가 세상을 사는 법";

  // ITEM 2: wonkuk structure (hap/chung/hyung narrative)
  var i2_body = "사주 원국의 네 기둥을 나란히 세워보겠습니다.\n\n"
  +"<b>연주 "+saju.P[0].s+saju.P[0].b+"("+ySS+")</b> — 조상과 유년기의 환경.\n"
  +"<b>월주 "+saju.P[1].s+saju.P[1].b+"("+mSS+")</b> — 부모와 청년기.\n"
  +"<b>일주 "+ilju+"("+dayBrSS+")</b> — 당신 자신, 배우자궁.\n"
  +"<b>시주 "+saju.P[3].s+saju.P[3].b+"("+hSS+")</b> — 자녀운, 말년.\n\n";
  if(hasChung){
    var chDesc=rel.jijiChung.map(function(c){return c.desc;}).join(', ');
    i2_body += "가장 먼저 눈에 들어오는 건 <b>"+chDesc+"</b>입니다. 충(沖)이란 정반대 에너지가 정면충돌하는 것이에요.\n\n"
    +"하지만 충은 나쁜 것만이 아닙니다. <b>충이 있는 사주는 변화의 에너지가 있다</b>는 뜻이에요.";
  }
  if(hasHap){
    i2_body += "\n\n";
    if(rel.cheonganHap.length>0) i2_body += "천간에서 <b>"+rel.cheonganHap.map(function(h){return h.desc;}).join(', ')+"</b>이 형성되어 있어요.\n";
    if(rel.jijiHap.length>0) i2_body += "지지에서는 <b>"+rel.jijiHap.map(function(h){return h.desc;}).join(', ')+"</b>이 보여요.\n";
    if(rel.jijiSamhap.length>0) i2_body += "특히 <b>"+rel.jijiSamhap.map(function(h){return h.desc;}).join(', ')+"</b>이 형성되어 있어요.\n";
  }
  if(!hasChung&&!hasHap&&!hasHyung) i2_body += "네 기둥 사이에 큰 충돌이나 결합 없이 안정적으로 자기 길을 걸어가는 사주입니다.";
  i2_body += "\n\n오행 분포는 "+elArr.map(function(e){return e[0]+' <b>'+e[1]+'</b>';}).join(', ')+"입니다.";
  var i2_catch = hasChung ? rel.jijiChung.map(function(c){return c.desc;}).join('과 ')+", 부딪혀야 빛나는 사주"
    : hasHap ? "끌어당기는 인연의 구조"
    : "고요한 사주, 대운이 열쇠다";

  // ITEM 3: sipsung arrangement
  var domSS = _ex;
  var i3_body = "십성(十星)은 사주의 각 글자가 일간과 맺는 관계예요.\n\n"
  +"연주: <b>"+ySS+"</b> — "+sspDesc(ySS,'연주')+"\n"
  +"월주: <b>"+mSS+"</b> — "+sspDesc(mSS,'월주')+"\n"
  +"일주: <b>"+dayBrSS+"</b> — "+sspDesc(dayBrSS,'일주')+"\n"
  +"시주: <b>"+hSS+"</b> — "+sspDesc(hSS,'시주')+"\n\n"
  +"이 배치에서 가장 눈에 띄는 건 <b>"+domSS+"이 강하다</b>는 점이에요.";
  var i3_catch = domSS==='식상' ? "입을 열면 세상이 움직인다"
    : domSS==='비겁' ? "내 길은 내가 간다"
    : domSS==='재성' ? "기회를 냄새로 맡는 사람"
    : domSS==='관성' ? "무거운 왕관을 쓴 자의 고독"
    : "생각의 바다가 너무 깊으면";

  // ITEM 4: inner vs outer gap
  var gapExists = ySS !== dayBrSS;
  var i4_body = "";
  if(gapExists){
    i4_body = "세상이 당신을 처음 만났을 때 느끼는 에너지는 연주의 <b>"+ySS+"</b>이에요.\n\n"
    +"그런데 일지(진짜 속마음)에는 <b>"+dayBrSS+"</b>이 앉아있어요.\n\n"
    +"이 간극이 만들어내는 현상: 밖에서는 "+ySS+" 에너지로 행동하지만, 집에 돌아오면 "+dayBrSS+" 에너지로 전환됩니다.\n\n"
    +mt+"의 구조도 이 간극을 증폭시킵니다. "+cf[0]+"(주기능)은 세상에 보여주는 도구이고, "+cf[3]+"(열등기능)은 감추고 싶은 약점이에요.";
  }else{
    i4_body = "연주의 <b>"+ySS+"</b>와 일지의 <b>"+dayBrSS+"</b>가 같은 계열이에요. 겉과 속이 일관적인 사람이라는 뜻입니다.\n\n"
    +mt+"에서 "+cf[0]+"(주기능)과 "+cf[3]+"(열등기능) 사이의 간극은 존재합니다.";
  }
  var i4_catch = gapExists ? "밖에서는 "+ySS+", 집에서는 "+dayBrSS+": 당신의 진짜 얼굴" : "보이는 대로의 사람, 일관된 자아";

  // ITEM 5: vulnerability (oheng deficit/excess)
  var i5_body = "", i5_catch = "";
  if(elZero.length>0){
    var zEl=elZero[0];
    var zDesc={"목":"결단력과 시작의 에너지","화":"열정과 표현의 에너지","토":"안정과 중심의 에너지","금":"결단과 정리의 에너지","수":"유연함과 지혜의 에너지"};
    i5_body = "오행 분포를 보면 <b>"+zEl+"이 원국에 0개</b>입니다. "+zEl+"은 "+zDesc[zEl]+"인데, 이게 아예 없다는 건 상당히 의미가 큰 부분이에요.\n\n"
    +mt+"의 열등기능 "+cf[3]+"이 이 취약점을 증폭시킵니다.\n\n"
    +"<b>해법</b>: "+zEl+" 기운을 물리적으로 보충하세요.";
    i5_catch = elN[zEl]+" 없는 "+iljuD.k+": "+zEl+" 공백이 만드는 아킬레스건";
  }else{
    var exEl=elMax[0],exCnt=elMax[1];
    i5_body = "오행 분포를 보면 <b>"+exEl+"이 "+exCnt+"개로 과다</b>합니다.\n\n"
    +mt+"의 "+cf[3]+"(열등기능)이 폭주하면 이 "+exEl+" 과다 에너지와 공명을 일으켜서 더 심해집니다.";
    i5_catch = exEl+" "+exCnt+"개, "+tone.energy+"가 "+tone.crisis+"하기 전에";
  }

  // ITEM 6: emotional explosion mechanism
  var triggerSS = hasSS('상관') ? '상관' : hasSS('겁재') ? '겁재' : hasSS('편관') ? '편관' : dmEl;
  var i6_body = dm+" 일간이 감정적으로 무너지는 순간을 해부해볼게요.\n\n"
  +"<b>1단계 — 트리거</b>: 감정의 시동이 걸리는 지점.\n\n"
  +"<b>2단계 — 증폭</b>: "+mt+"의 "+cf[0]+"(주기능)이 상황을 분석하고, "+cf[1]+"(보조기능)이 판단을 붙여요.\n\n"
  +"<b>3단계 — 폭발 혹은 내파</b>: "+(ST_ch[0]==="L"?mi0.short+" 구조라 감정이 바깥으로 터져요.":mi0.short+" 구조라 감정이 안으로 곪아요.")+"\n\n"
  +"<b>4단계 — 수습</b>: "+dm+" 일간의 "+tone.calm+".";
  var i6_catch = dm+" 일간의 "+tone.crisis+" 패턴: 감정이 터지는 순간의 4단계";

  // ITEM 7: resilience
  var i7_body = "넘어진 뒤에 다시 일어나는 속도와 방식은 사람마다 완전히 달라요.\n\n"
  +ilju+"일주, "+dayUns+"에 앉은 "+dm+" 일간의 회복 패턴: "
  +(dayStrongUns?"<b>뿌리가 단단한 나무</b>형입니다."
  :(dayUns==='묘'||dayUns==='양'||dayUns==='태')?"<b>씨앗</b>형입니다."
  :(dayUns==='사'||dayUns==='절')?"<b>불사조</b>형입니다."
  :"<b>"+tone.calm+"</b>형입니다.")
  +"\n\n"+mt+"의 회복 시스템은 "+cf[0]+"→"+cf[1]+"→"+cf[2]+"의 순서로 작동합니다."
  +"\n\n"+tone.metaphor+" — 이 이미지를 기억하세요."
  +(hasGuiin?" 사주에 "+salGood.filter(function(s){return s.name.indexOf('귀인')>=0;}).map(function(s){return s.name;}).join(', ')+"이 있어서 위기 순간에 뜻밖의 도움이 옵니다.":"");
  var i7_catch = dayStrongUns ? dayUns+"에 앉은 "+dm+", 뿌리째 뽑히지 않는 사람"
    : (dayUns==='사'||dayUns==='절') ? "끝이라고 생각한 곳이 시작이다"
    : tone.metaphor+": "+ilju+"일주 "+mt+"가 위기를 돌파하는 법";

  return {
    i1_body:i1_body, i1_catch:i1_catch,
    i2_body:i2_body, i2_catch:i2_catch,
    i3_body:i3_body, i3_catch:i3_catch, domSS:domSS,
    i4_body:i4_body, i4_catch:i4_catch,
    i5_body:i5_body, i5_catch:i5_catch,
    i6_body:i6_body, i6_catch:i6_catch,
    i7_body:i7_body, i7_catch:i7_catch
  };
}

module.exports = { buildItems1to7: buildItems1to7 };
