'use strict';
var ELEM_LEX = {
  water: ['물의','물이','물을','물처럼','물줄기','스미','스며','고인','고여','고이','흐르','흐름','잠기','잠겨','가라앉','깊은 물'],
  fire:  ['불의','불이','불을','불씨','불붙','불꽃','불길','타오','타는','태우','태워','활활','열기','뜨거','데우','데워','심지'],
  wood:  ['나무','나무로','뿌리','줄기','자라','곧게','곧은','햇볕','뻗','우직'],
  metal: ['쇠의','쇠가','쇠로','칼날','칼을','칼이','칼로','칼처럼','칼끝','날카','베이','베인','끊어','끊는','끊고','예리'],
  earth: ['흙의','흙이','흙을','흙으로','흙처럼','우물','메마','메말','빚은','빚어','빚는','품어','품고','품는','길어 올','길어가','채워','비옥']
};
// 제목 전용 오행/사물 이미지 union (본문 lex 갭 보강: 바깥형태·바명사·이미지어). 첫 줄에만 적용.
var TITLE_ELEM = [
  '물 한','물에 ','물처럼','물방울','물결','물줄기','빗물','강물','바닷물','깊은 물','물안개','물속','물 위',
  '불씨','불꽃','불길','불티','타오르','잿더미','모닥불','횃불',
  '나무가','나무를','나무처럼','나무 같','나뭇','고목','거목','새싹','떡잎','수풀',
  '칼을','칼이','칼날','칼로','칼처럼','칼 같','무쇠','쇠처럼','쇠를','쇠가 ','쇳','녹슨',
  '흙으로','흙에 ','흙바닥','흙먼지','진흙','흙냄새','우물'
];
// 오그라듦(미화·자기계발·시적) denylist — 전체 텍스트. 고정밀 표현만.
var CRINGE_LEX = [
  '운명','별처럼','별이 되','별빛','윤슬','빛나는','반짝이','반짝여','반짝거','반짝반짝','날개를 펴','날개를 펼',
  '진정한 나','진짜 나를','세상은 당신','세상이 당신','우주가','우주는','특별한 존재',
  '눈부신','눈부시','찬란','마법','꽃길','빛을 잃지','당신은 충분','소중한 당신'
];
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function countOcc(text,word){ var re=new RegExp(escapeRe(word),'g'); var m=text.match(re); return m?m.length:0; }
function elemImageDetail(text,elem){ var lex=ELEM_LEX[elem]; var total=0; var hits=[]; var i; var c; for(i=0;i<lex.length;i++){ c=countOcc(text,lex[i]); if(c>0){ total+=c; hits.push(lex[i]); } } return { count:total, words:hits }; }
function quoteCount(text){ var m=text.match(/"[^"]+"/g); return m?m.length:0; }
function firstLineOf(text){ var lines=text.split('\n'); var i; for(i=0;i<lines.length;i++){ if(lines[i].trim().length>0){ return lines[i].trim(); } } return ''; }
function titleElemHits(text){
  var t=firstLineOf(text); var hits=[]; var i; var w;
  for(i=0;i<TITLE_ELEM.length;i++){ w=TITLE_ELEM[i]; if(t.indexOf(w)!==-1){ hits.push(w.replace(/ $/,'')); } }
  return hits;
}
function cringeHits(text){ var hits=[]; var i; for(i=0;i<CRINGE_LEX.length;i++){ if(text.indexOf(CRINGE_LEX[i])!==-1){ hits.push(CRINGE_LEX[i]); } } return hits; }
function structureCheck(text){
  var reasons=[]; var lines=text.split('\n'); var i;
  var firstLine='';
  for(i=0;i<lines.length;i++){ if(lines[i].trim().length>0){ firstLine=lines[i].trim(); break; } }
  var endsSentence = /[.!?]$/.test(firstLine) || /(요|죠|에요|예요|거든요|잖아요|는데)$/.test(firstLine);
  if(firstLine.length > 40 || endsSentence){ reasons.push('제목 줄 없음 — 첫 줄은 짧은 제목이어야 함(도입 문장으로 시작 금지).'); }
  var need=['강점','약점','연애','사회']; var j; var missing=[];
  for(j=0;j<need.length;j++){
    var found=false; var k;
    for(k=0;k<lines.length;k++){
      var ln=lines[k].trim().replace(/^[\[\(#*"'\-\s]+/,'').replace(/[\]\)#*"'\-\s]+$/,'');
      if(ln===need[j] || (ln.indexOf(need[j])===0 && ln.length<=8)){ found=true; break; }
    }
    if(!found){ missing.push(need[j]); }
  }
  if(missing.length>0){ reasons.push('섹션 누락: '+missing.join(', ')+' (라벨이 독립 줄로 있어야 함).'); }
  if(text.replace(/\s/g,'').length < 350){ reasons.push('분량 부족.'); }
  return reasons;
}
function scoreText(elem,text){
  var ed=elemImageDetail(text,elem); var qc=quoteCount(text); var sr=structureCheck(text);
  var th=titleElemHits(text); var ch=cringeHits(text); var reasons=[]; var k;
  if(ed.count>2){ reasons.push('오행 비유 남발: '+ed.count+'회 (허용 2). 걸린 단어: '+ed.words.join('/')+'. 융합 문장 외 오행 단어 빼고 행동·상황으로.'); }
  if(qc<2){ reasons.push('인용 부족: '+qc+'개 (타인 대사 + 자기 내면 대사 각 1).'); }
  for(k=0;k<sr.length;k++){ reasons.push(sr[k]); }
  if(th.length>0){ reasons.push('제목에 오행/사물 이미지: '+th.join('/')+' — 제목엔 비유 이미지 금지. 담백한 행동·상황 캐치로 다시.'); }
  if(ch.length>0){ reasons.push('오그라듦 표현: '+ch.join('/')+' — 미화·자기계발·시적 표현 빼고 담백하게.'); }
  var gE=(ed.count<=2)?'PASS':'FAIL'; var gQ=(qc>=2)?'PASS':'FAIL'; var gS=(sr.length===0)?'PASS':'FAIL';
  var gT=(th.length===0)?'PASS':'FAIL'; var gC=(ch.length===0)?'PASS':'FAIL';
  return { elemImg:ed.count, elemWords:ed.words, quotes:qc, titleElem:th, cringe:ch,
    gateElem:gE, gateQuote:gQ, gateStruct:gS, gateTitle:gT, gateCringe:gC,
    pass:(gE==='PASS')&&(gQ==='PASS')&&(gS==='PASS')&&(gT==='PASS')&&(gC==='PASS'), failReasons:reasons };
}
module.exports = { elemImageDetail:elemImageDetail, quoteCount:quoteCount, structureCheck:structureCheck, titleElemHits:titleElemHits, cringeHits:cringeHits, scoreText:scoreText };
