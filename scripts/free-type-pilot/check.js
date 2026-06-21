'use strict';
var fs = require('fs');
// 본문 금지: 오행 비유 "동사 활용형"만. (도입 융합문의 명사형 '고임/기운/기질'은 안 걸리게 설계)
var OHAENG = [
  // 물
  '가라앉','스며','스민','출렁','차올라','차오르','물꼬','잠겨','잠긴','잠기','적셔','적시','젖어','젖는',
  // 불
  '타오르','타올라','불씨','활활','솟구','사그라','끓어','끓는','달아올라','달아오르',
  // 나무
  '뿌리내','뿌리를','뿌리가','자라나','자라요','자라는',
  // 쇠
  '벼리','벼려','칼날','칼끝','단칼','날카','잘라내',
  // 흙
  '묵혀','묵힌','삭이','삭여','지반','발효','곪아','곪는'
];
// 오버/시적 denylist
var CRINGE = ['귀신같이','도가 텄','눈부','반짝','찬란','운명처럼','진정한 나','별처럼','날개를','한껏'];
function check(file){
  var t = fs.readFileSync(file,'utf8');
  var lines = t.split(/\n/);
  var hits = [];
  lines.forEach(function(ln,i){
    OHAENG.forEach(function(w){ if(ln.indexOf(w)>=0) hits.push('  L'+(i+1)+' [오행동사:'+w+'] '+ln.trim()); });
    CRINGE.forEach(function(w){ if(ln.indexOf(w)>=0) hits.push('  L'+(i+1)+' [오버:'+w+'] '+ln.trim()); });
  });
  // 장면/3인칭 시작 금지: 도입 첫 문장은 '당신~' 성격 단정으로 시작해야 함
  var nb = t.split(/\n/).filter(function(l){return l.trim();});
  if(nb[1] && nb[1].trim().indexOf('당신')!==0){
    hits.push('  [장면시작] 도입이 "당신~"으로 안 시작: '+nb[1].trim().slice(0,28));
  }
  return hits;
}
var dir = process.argv[2] || '.';
var files = fs.readdirSync(dir).filter(function(f){return /\.md$/.test(f);}).sort();
var allPass = true;
files.forEach(function(f){
  var h = check(dir+'/'+f);
  if(h.length===0){ console.log('PASS  '+f); }
  else { allPass=false; console.log('FAIL  '+f); h.forEach(function(x){console.log(x);}); }
});
console.log('\n=== '+(allPass?'ALL PASS':'FAIL 있음')+' ('+files.length+'개) ===');
