'use strict';
var ELEM_LEX = {
  water: ['물의','물이','물을','물처럼','물줄기','스미','스며','고인','고여','고이','흐르','흐름','잠기','잠겨','가라앉','깊은 물'],
  fire:  ['불의','불이','불을','불씨','불붙','불꽃','불길','타오','타는','태우','태워','활활','열기','뜨거','데우','데워','심지'],
  wood:  ['나무','나무로','뿌리','줄기','자라','곧게','곧은','햇볕','뻗','우직'],
  metal: ['쇠의','쇠가','쇠로','칼','칼날','날카','베이','베인','끊어','끊는','끊고','예리'],
  earth: ['흙의','흙이','흙을','흙으로','흙처럼','우물','메마','메말','빚은','빚어','빚는','품어','품고','품는','길어 올','길어가','채워','비옥']
};
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function countOcc(text,word){ var re=new RegExp(escapeRe(word),'g'); var m=text.match(re); return m?m.length:0; }
function elemImageDetail(text,elem){ var lex=ELEM_LEX[elem]; var total=0; var hits=[]; var i; var c; for(i=0;i<lex.length;i++){ c=countOcc(text,lex[i]); if(c>0){ total+=c; hits.push(lex[i]); } } return { count:total, words:hits }; }
function quoteCount(text){ var m=text.match(/"[^"]+"/g); return m?m.length:0; }
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
  var ed=elemImageDetail(text,elem); var qc=quoteCount(text); var sr=structureCheck(text); var reasons=[]; var k;
  if(ed.count>2){ reasons.push('오행 비유 남발: '+ed.count+'회 (허용 2). 걸린 단어: '+ed.words.join('/')+'. 융합 문장 외 오행 단어 빼고 행동·상황으로.'); }
  if(qc<2){ reasons.push('인용 부족: '+qc+'개 (타인 대사 + 자기 내면 대사 각 1).'); }
  for(k=0;k<sr.length;k++){ reasons.push(sr[k]); }
  var gE=(ed.count<=2)?'PASS':'FAIL'; var gQ=(qc>=2)?'PASS':'FAIL'; var gS=(sr.length===0)?'PASS':'FAIL';
  return { elemImg:ed.count, elemWords:ed.words, quotes:qc, gateElem:gE, gateQuote:gQ, gateStruct:gS, pass:(gE==='PASS')&&(gQ==='PASS')&&(gS==='PASS'), failReasons:reasons };
}
module.exports = { elemImageDetail:elemImageDetail, quoteCount:quoteCount, structureCheck:structureCheck, scoreText:scoreText };
