'use strict';
// MBTS 무료타입 텍스트 게이트 — gold(물INTP) 기준 캘리브레이션
// 핵심 변별자: (1) 오행 비유 남발 (gold=1, 융합 한 줄만) (2) 인용 유무
var ELEM_LEX = {
  water: ['물의','물이','물을','물도','물처럼','물줄기','스미','스며','고인','고여','고이','흐르','흐름','잠기','잠겨','가라앉','깊은 물'],
  fire:  ['불의','불이','불을','불씨','불붙','타오','타는','태우','태워','활활','열기','뜨거','데우','데워','심지'],
  wood:  ['나무','뿌리','줄기','자라','곧게','곧은','햇볕','뻗','우직'],
  metal: ['쇠의','쇠가','칼','칼날','날이','날을','베이','베인','끊어','끊는','끊고','예리'],
  earth: ['흙의','흙이','흙을','우물','메마','메말','품어','품고','품는','길어 올','길어가','채워','비옥']
};
function escapeRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function countOccurrences(text,word){ var re=new RegExp(escapeRe(word),'g'); var m=text.match(re); return m?m.length:0; }
function elemImageCount(text,elem){ var lex=ELEM_LEX[elem]; var n=0; var i; for(i=0;i<lex.length;i++){ n+=countOccurrences(text,lex[i]); } return n; }
function quoteCount(text){ var m=text.match(/"[^"]+"/g); return m?m.length:0; }
function buildFailReasons(ec,qc){ var r=[]; if(ec>2){ r.push('오행 비유 남발: 이미지 '+ec+'회 (허용 2회 이하 — 융합 한 줄에서만). 비유를 걷어내고 구체 행동·상황·인용으로 다시 써.'); } if(qc<2){ r.push('인용 부족: 대사 '+qc+'개 (타인 대사 + 자기 내면 대사 최소 각 1개).'); } return r; }
function scoreText(elem,text){ var ec=elemImageCount(text,elem); var qc=quoteCount(text); var gE=(ec<=2)?'PASS':'FAIL'; var gQ=(qc>=2)?'PASS':'FAIL'; return { elemImg:ec, quotes:qc, gateElem:gE, gateQuote:gQ, pass:(gE==='PASS')&&(gQ==='PASS'), failReasons:buildFailReasons(ec,qc) }; }
module.exports = { elemImageCount:elemImageCount, quoteCount:quoteCount, scoreText:scoreText };
