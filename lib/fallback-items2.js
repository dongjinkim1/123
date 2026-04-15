// lib/fallback-items2.js — Fallback items 8-14 (career, love, fortune, energy)
// Extracted from mkFB() Phase 3 items 8-14
'use strict';

function buildItems8to14(ctx) {
  var saju=ctx.saju, mt=ctx.mt, gg=ctx.gg, rel=ctx.rel, ti=ctx.ti, dm=ctx.dm, dmEl=ctx.dmEl, cf=ctx.cf;
  var ilju=ctx.ilju, iljuD=ctx.iljuD, tone=ctx.tone, feat=ctx.feat;
  var mi0=ctx.mi0, mi1=ctx.mi1, mi2=ctx.mi2, mi3=ctx.mi3;
  var hasSS=ctx.hasSS, ssAt=ctx.ssAt;
  var dayBrSS=ctx.dayBrSS, ySS=ctx.ySS, mSS=ctx.mSS, hSS=ctx.hSS;
  var hasChung=ctx.hasChung, hasHap=ctx.hasHap;
  var salGood=ctx.salGood, salBad=ctx.salBad;
  var hasDohwa=ctx.hasDohwa, hasYeokma=ctx.hasYeokma, hasBaekho=ctx.hasBaekho, hasGuiin=ctx.hasGuiin;
  var _ex=ctx._ex, _lk=ctx._lk;
  var _lkDir=ctx._lkDir, _lkColor=ctx._lkColor, _lkExercise=ctx._lkExercise, _lkFood=ctx._lkFood;
  var sspDesc=ctx.sspDesc;
  var ST_ch = ctx.mbtiChoices;

  // ITEM 8: career aptitude
  var i8_body = ilju+"일주가 가리키는 직업 DNA를 볼게요. "+iljuD.job+"\n\n"
  +(feat.sikSangStrong?"식상이 강한 구조라 <b>'표현이 곧 직업'</b>인 사람이에요."
  :feat.jaeStrong?"재성이 강한 구조라 <b>'현실 감각이 곧 무기'</b>인 사람이에요."
  :feat.gwanStrong?"관성이 강한 구조라 <b>'조직 안에서 올라가는 힘'</b>이 있는 사람이에요."
  :feat.inStrong?"인성이 강한 구조라 <b>'전문성이 곧 경쟁력'</b>인 사람이에요."
  :"비겁이 강한 구조라 <b>'독립적 영역'</b>에서 빛나는 사람이에요.")+"\n\n"
  +mt+"의 MBTI 강도를 직업에 적용하면:\n"
  +"<b>"+mi1.short+"</b> — "+mi1.work+"\n"
  +"<b>"+mi3.short+"</b> — "+mi3.work+"\n"
  +"<b>"+mi0.short+"</b> — "+mi0.work+"\n"
  +"<b>"+mi2.short+"</b> — "+mi2.work;
  var i8_catch = feat.sikSangStrong ? "표현이 곧 돈이 되는 사주"
    : feat.jaeStrong ? "기회를 냄새로 맡는 사람"
    : feat.gwanStrong ? "조직의 정상에 서는 사주"
    : feat.inStrong ? "깊이가 곧 경쟁력"
    : "나만의 왕국을 세우는 사람";

  // ITEM 9: wealth
  var hasJae=hasSS('편재')||hasSS('정재');
  var i9_body = "돈과의 관계를 사주로 해부합니다.\n\n"
  +(hasJae?"재성이 위치해 있어 <b>돈이 들어오는 길이 원국에 있어요</b>."
  :"재성이 원국에 없어요. 이건 '돈이 안 된다'가 아니라 <b>'돈이 자동으로 오진 않는다'</b>는 뜻이에요.")
  +"\n\n"+dm+" 일간("+dmEl+")의 재물 스타일: "
  +(dmEl==='화'?"화(火)는 영향력이 곧 돈입니다."
  :dmEl==='수'?"수(水)는 흐름이 곧 돈이에요."
  :dmEl==='목'?"목(木)은 성장이 곧 돈이에요."
  :dmEl==='금'?"금(金)은 본질적 가치를 보는 눈이 있어요."
  :"토(土)는 안정적 축적이 체질이에요.")
  +"\n\n"+mt+"의 소비 패턴: "+mi1.short+" — "+(ST_ch[1]==="R"?"확신으로 지갑을 여는 타입.":"눈앞의 만족을 위해 소비하는 타입.");
  var i9_catch = hasJae
    ? (hasSS('편재') ? "여러 갈래의 돈길이 열린 사주" : "꾸준히 쌓이는 돈의 구조")
    : "돈이 자동으로 오진 않는 사주, 하지만";

  // ITEM 10: romance
  var i10_body = ilju+"일주의 연애를 해부합니다.\n\n"
  +"배우자궁(일지)에 <b>"+dayBrSS+"</b>이 앉아있어요. "+iljuD.love+"\n\n"
  +(feat.dohwaMulti?"<b>도화살이 2개 이상</b>이에요. 매력이 넘치는 구조.\n\n"
  :hasDohwa?"<b>도화살</b>이 있어요. 이성에 대한 매력이 특별히 강한 사주입니다.\n\n":"")
  +mt+"의 "+cf[0]+"(주기능)이 연애에서 작동하는 방식이 독특합니다.\n\n"
  +(hasChung?"사주에 충이 있어 연애에서도 <b>급격한 전환</b>이 올 수 있습니다.":"")
  +(hasHap?" 합이 있어 <b>강한 인연의 끌림</b>을 경험합니다.":"")
  +"\n\n<b>당신에게 맞는 파트너</b>: 용신 "+gg.yongshin+" 기운이 강한 사람.";
  var i10_catch = feat.dohwaMulti ? "도화살 2개, 끌림이 끝나지 않는 사주"
    : hasDohwa ? "도화의 매력 × "+dayBrSS+"의 속마음"
    : hasChung ? "충(沖)이 만드는 극적인 사랑"
    : "배우자궁의 "+dayBrSS+"이 말하는 것";

  // ITEM 11: family fortune
  var i11_body = "사주의 네 기둥은 시간 순서대로 인생의 네 시기를 보여줍니다.\n\n"
  +"<b>연주("+ySS+")</b> — 0~15세, 조상과 유년기\n"+sspDesc(ySS,'연주')
  +"\n\n<b>월주("+mSS+")</b> — 15~30세, 부모와 청년기\n"+sspDesc(mSS,'월주')
  +"\n\n<b>시주("+hSS+")</b> — 45세 이후, 자녀운과 말년\n"+sspDesc(hSS,'시주');
  var i11_catch = ySS+"의 유년기에서 "+hSS+"의 말년까지: 인생 네 장면";

  // ITEM 12: relationships and betrayal
  var i12_body = mt+"는 <b>"+mi0.short+"</b> 유형이에요. "+mi0.trait
  +"\n\n사주에서 인간관계를 보면 — "
  +(feat.biStrong?"비겁이 강해서 <b>동료이자 경쟁자</b>의 에너지가 강합니다. <b>가까운 사람과의 동업·보증은 절대 금물</b>입니다."
  :feat.gwanStrong?"관성이 강해서 <b>상하관계에 예민</b>한 구조예요."
  :feat.sikSangStrong?"식상이 강해서 <b>말로 관계를 만들고 말로 관계를 깨는</b> 구조예요."
  :"<b>자기 세계에 충실한</b> 구조예요.")
  +(hasDohwa?"\n\n<b>도화살</b>이 있어 이성간 인간관계가 복잡해질 수 있어요.":"")
  +(hasBaekho?" <b>백호살</b>이 있어 가까운 사람과의 돌발 갈등에 주의.":"")
  +(hasGuiin?" <b>"+salGood.filter(function(s){return s.name.indexOf('귀인')>=0;}).map(function(s){return s.name;}).join(', ')+"</b>이 있어 위기에서 귀인의 도움이 옵니다.":"");
  var i12_catch = feat.biStrong ? "동지인가 경쟁자인가"
    : hasDohwa ? "도화의 매력은 양날의 검"
    : hasBaekho ? "백호살의 그림자"
    : hasGuiin ? "귀인을 알아보는 눈"
    : tone.style+" "+dm+" 일간이 인간관계에서 에너지를 지키는 법";

  // ITEM 13: fortune improvement (gaewoon)
  var ys=gg.yongshin;
  var ysOh = '';
  var ohList = ['목','화','토','금','수'];
  var ssGroupList = ['비겁','식상','재성','관성','인성'];
  if (ohList.indexOf(ys.charAt(0)) >= 0) {
    ysOh = ys.charAt(0);
  } else {
    for (var _gi = 0; _gi < ssGroupList.length; _gi++) {
      if (ys.indexOf(ssGroupList[_gi]) === 0) {
        ysOh = gg.ohMap[ssGroupList[_gi]] || '';
        break;
      }
    }
  }
  if (!ysOh) ysOh = '수';

  var i13_body = "용신(用神)은 사주에서 가장 필요한 오행이에요. 당신의 용신은 <b>"+ys+"</b>입니다.\n\n"
  +"<b>1. 색상과 소품</b>\n"+(_lk?"부족한 "+_lk+" 기운을 채우기 위해 "+_lkColor[_lk||ysOh]+" 계열을 생활에 더하세요."
  :"용신 "+ys+" 관련 색상을 생활에 배치하세요.")
  +"\n\n<b>2. 방위</b>\n행운의 방위는 <b>"+(_lkDir[ysOh]||"")+"</b>입니다."
  +(hasYeokma?" 역마살이 있어서 이동 자체가 개운 행위예요.":"")
  +"\n\n<b>3. 운동과 활동</b>\n"+(_lkExercise[ysOh]||"")
  +"\n\n<b>4. 음식</b>\n"+(_lkFood[ysOh]||"")+" 계열의 음식이 용신을 보충합니다."
  +"\n\n<b>5. 관계에서의 개운</b>\n용신 "+ys+" 기운이 강한 사람 옆에 있으면 자연스럽게 보충됩니다.";
  var i13_catch = "용신 "+ys+"을 일상에 심는 법: "+dm+" 일간이 운을 바꾸는 5가지 실천";

  // ITEM 14: burnout prevention
  var i14_body = dm+" 일간("+dmEl+")의 에너지 패턴을 정밀하게 봅니다.\n\n"
  +(dmEl==='화'?"화(火) 에너지는 <b>폭발적으로 타오르다 갑자기 꺼지는</b> 패턴이에요."
  :dmEl==='수'?"수(水) 에너지는 <b>잔잔하다가 갑자기 파도가 치는</b> 패턴이에요."
  :dmEl==='목'?"목(木) 에너지는 <b>꾸준히 성장하다 한계점에서 꺾이는</b> 패턴이에요."
  :dmEl==='금'?"금(金) 에너지는 <b>차갑게 유지하다 과열되면 한번에 무너지는</b> 패턴이에요."
  :"토(土) 에너지는 <b>천천히 쌓이다가 지진처럼 터지는</b> 패턴이에요.")
  +"\n\n"+mt+"도 같은 패턴이 있어요. "+cf[0]+"(주기능)이 폭주 모드로 에너지를 쏟다가, "+cf[3]+"(열등기능)이 반란을 일으킵니다."
  +"\n\n<b>예방 공식</b>: 달리면서 쉬기. 매주 한 번 '절반의 날'을 만드세요."
  +"\n\n<b>3:1 리듬</b> — 3일 풀가동 → 1일 반충전. 이 리듬을 한 달만 유지하면 번아웃 주기가 눈에 띄게 길어집니다."
  +"\n\n<b>"+mi0.short+"의 번아웃 특성</b>: "+mi0.burn
  +"\n<b>"+mi1.short+"의 번아웃 특성</b>: "+mi1.burn
  +"\n<b>"+mi2.short+"의 번아웃 특성</b>: "+mi2.burn
  +"\n<b>"+mi3.short+"의 번아웃 특성</b>: "+mi3.burn;
  var i14_catch = dmEl==='화' ? "타오르다 꺼지는 "+dm+" 일간의 연료 관리법"
    : dmEl==='수' ? "잔잔한 수면 아래 쌓이는 폭풍"
    : dmEl==='목' ? "성장이 멈추면 시드는 "+dm+" 일간"
    : dmEl==='금' ? "완벽하게 버티다 부러지기 전에"
    : "다 받아주다 터지기 전에";

  return {
    i8_body:i8_body, i8_catch:i8_catch,
    i9_body:i9_body, i9_catch:i9_catch,
    i10_body:i10_body, i10_catch:i10_catch,
    i11_body:i11_body, i11_catch:i11_catch,
    i12_body:i12_body, i12_catch:i12_catch,
    i13_body:i13_body, i13_catch:i13_catch, ysOh:ysOh,
    i14_body:i14_body, i14_catch:i14_catch
  };
}

module.exports = { buildItems8to14: buildItems8to14 };
