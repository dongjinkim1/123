// lib/feature-strength.js — 사주 특징 강도 추출 엔진 (2층 공식: 명리강도 × 변별 가중합)
'use strict';

var data = require('./saju-data');
var JIJI_KR=data.JIJI_KR, OHAENG_JIJI=data.OHAENG_JIJI, JIJANGGAN_DATA=data.JIJANGGAN_DATA, SS_NAMES=data.SS_NAMES, getSipsung=data.getSipsung;

var STRENGTH_WEIGHTS = {
  position: { '월지':1.5, '일지':1.3, '시지':1.0, '년지':0.8, '월간':1.0, '년간':0.7, '시간':0.7 },
  uns: { '제왕':1.25, '건록':1.25, '관대':1.15, '장생':1.1, '목욕':1.0, '양':1.0, '태':0.95, '쇠':0.9, '병':0.85, '사':0.8, '묘':0.8, '절':0.8 },
  deukryeong: { match:1.5, generate:1.2, neutral:1.0, drain:0.8 },
  tonggeun: { rooted:1.3, floating:0.6 },
  jijanggan: { '정기':1.0, '중기':0.5, '여기':0.3 },
  blend: { absolute:0.6, distinct:0.4 },
  distinctCap: 3.0,
  category: { '십성':1.0, '신살':0.8, '합충':0.7 }
};

var OH_LIST = ['목','화','토','금','수'];
function ohIdx(oh){ return OH_LIST.indexOf(oh); }
function ohGenerates(a,b){ var ai=ohIdx(a),bi=ohIdx(b); return ai>=0&&bi>=0&&(ai+1)%5===bi; }

var SS_DIST = {'비견':0,'겁재':0,'식신':1,'상관':1,'편재':2,'정재':2,'편관':3,'정관':3,'편인':4,'정인':4};
function sipsungToOh(ss, dmEl){
  var i = ohIdx(dmEl); var d = SS_DIST[ss];
  return (i<0 || d==null) ? '' : OH_LIST[(i+d)%5];
}

function deukCoeff(ssOh, mjOh){
  if(!ssOh||!mjOh) return STRENGTH_WEIGHTS.deukryeong.neutral;
  if(ssOh===mjOh) return STRENGTH_WEIGHTS.deukryeong.match;
  if(ohGenerates(mjOh, ssOh)) return STRENGTH_WEIGHTS.deukryeong.generate;
  if(ohGenerates(ssOh, mjOh)) return STRENGTH_WEIGHTS.deukryeong.drain;
  return STRENGTH_WEIGHTS.deukryeong.neutral;
}

function hasTonggeun(ssOh, branchOhs){
  for(var i=0;i<branchOhs.length;i++) if(branchOhs[i]===ssOh) return true;
  return false;
}

function emptySipseongMap(){
  var m={}; for(var i=0;i<SS_NAMES.length;i++) m[SS_NAMES[i]]=0; return m;
}

function calcSipseongStrength(saju, gg){
  var dg = saju.raw.dg;
  var dmEl = saju.dmEl;
  var mjBranch = saju.raw.mj;
  var mjOh = (mjBranch!=null) ? OHAENG_JIJI[mjBranch] : '';
  var P = saju.P || [];
  var branchOhs = [];
  for(var bi0=0;bi0<P.length;bi0++){ if(P[bi0].bi!=null) branchOhs.push(OHAENG_JIJI[P[bi0].bi]); }

  var scores = emptySipseongMap();

  var stemPositions = [{idx:0,label:'년간'},{idx:1,label:'월간'},{idx:2,label:null},{idx:3,label:'시간'}];
  for(var si=0; si<stemPositions.length; si++){
    var sp = stemPositions[si];
    var pillar = P[sp.idx];
    if(!pillar || pillar.gi==null || sp.label==null) continue;
    var ss = getSipsung(dg, pillar.gi);
    if(!ss) continue;
    var posW = STRENGTH_WEIGHTS.position[sp.label] || 1.0;
    var ssOh = sipsungToOh(ss, dmEl);
    var deuk = deukCoeff(ssOh, mjOh);
    var tg = hasTonggeun(ssOh, branchOhs) ? STRENGTH_WEIGHTS.tonggeun.rooted : STRENGTH_WEIGHTS.tonggeun.floating;
    scores[ss] += STRENGTH_WEIGHTS.jijanggan['정기'] * posW * deuk * tg;
  }

  var branchPositions = [{idx:0,label:'년지'},{idx:1,label:'월지'},{idx:2,label:'일지'},{idx:3,label:'시지'}];
  for(var bi=0; bi<branchPositions.length; bi++){
    var bp = branchPositions[bi];
    var pillar2 = P[bp.idx];
    if(!pillar2 || pillar2.bi==null) continue;
    var posW2 = STRENGTH_WEIGHTS.position[bp.label] || 1.0;
    var uns = (saju.uns && saju.uns[bp.idx]) || '';
    var unsW = STRENGTH_WEIGHTS.uns[uns] || 1.0;
    var jjgArr = JIJANGGAN_DATA[pillar2.bi] || [];
    var jjgLen = jjgArr.length;
    for(var ji=0; ji<jjgLen; ji++){
      var item = jjgArr[ji];
      var role = (ji===jjgLen-1) ? '정기' : (ji===jjgLen-2 ? '중기' : '여기');
      var jjgW = STRENGTH_WEIGHTS.jijanggan[role] || 0;
      var ss2 = getSipsung(dg, item.g);
      if(!ss2) continue;
      var ssOh2 = sipsungToOh(ss2, dmEl);
      var deuk2 = deukCoeff(ssOh2, mjOh);
      var tg2 = hasTonggeun(ssOh2, branchOhs) ? STRENGTH_WEIGHTS.tonggeun.rooted : STRENGTH_WEIGHTS.tonggeun.floating;
      scores[ss2] += jjgW * posW2 * unsW * deuk2 * tg2;
    }
  }

  for(var k in scores){
    if(Object.prototype.hasOwnProperty.call(scores,k)){
      scores[k] = Math.round(scores[k]*100)/100;
    }
  }
  return scores;
}

function applyDistinctiveness(strengthMap){
  var keys = Object.keys(strengthMap);
  var total = 0;
  var maxAbs = 0;
  for(var i=0;i<keys.length;i++){
    var v = strengthMap[keys[i]];
    total += v;
    if(v > maxAbs) maxAbs = v;
  }
  var mean = keys.length>0 ? total / keys.length : 0;
  var result = {};
  var cap = STRENGTH_WEIGHTS.distinctCap;
  var aW = STRENGTH_WEIGHTS.blend.absolute;
  var dW = STRENGTH_WEIGHTS.blend.distinct;
  for(var j=0;j<keys.length;j++){
    var name = keys[j];
    var abs = strengthMap[name];
    var ratio = mean>0 ? abs / mean : 0;
    var capped = Math.min(ratio, cap);
    var absNorm = maxAbs>0 ? abs / maxAbs : 0;
    var distNorm = cap>0 ? capped / cap : 0;
    var blended = aW * absNorm + dW * distNorm;
    result[name] = {
      absolute: Math.round(abs*100)/100,
      distinct: Math.round(capped*100)/100,
      ratio: Math.round(ratio*100)/100,
      score: Math.round(blended*1000)/1000
    };
  }
  return result;
}

function calcSinsalStrength(saju){
  var sals = saju.specialSals || [];
  var BASE = {
    '천을귀인':1.5,'문창귀인':1.0,'천덕귀인':1.2,'월덕귀인':1.0,'금여록':0.8,'학당귀인':0.9,
    '도화살':1.2,'역마살':1.2,'화개살':1.0,'양인살':1.5,'백호살':1.4,'귀문관살':1.2
  };
  var result = {};
  for(var i=0;i<sals.length;i++){
    var s = sals[i];
    var base = BASE[s.name] || 0.8;
    var posMul = 1.0;
    var dsc = s.desc || '';
    if(/일지|월지/.test(dsc)) posMul = 1.3;
    else if(/시지|년지/.test(dsc)) posMul = 1.0;
    result[s.name] = (result[s.name]||0) + base * posMul;
  }
  for(var k in result){
    if(Object.prototype.hasOwnProperty.call(result,k)){
      result[k] = Math.round(result[k]*100)/100;
    }
  }
  return result;
}

function calcRelationStrength(saju){
  var P = saju.P || [];
  var branches = P.map(function(p){ return p.bi; });
  var result = {};
  function distMul(i,j){ var d=Math.abs(i-j); if(d===1) return 1.0; if(d===2) return 0.7; return 0.5; }
  var CHUNG_PAIRS = [[0,6],[3,9],[2,8],[5,11],[4,10],[1,7]];
  var HAP_PAIRS = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  for(var i=0;i<branches.length;i++){
    if(branches[i]==null) continue;
    for(var j=i+1;j<branches.length;j++){
      if(branches[j]==null) continue;
      var a=branches[i], b=branches[j];
      var mul = distMul(i,j);
      for(var ci=0;ci<CHUNG_PAIRS.length;ci++){
        var cp = CHUNG_PAIRS[ci];
        if((a===cp[0]&&b===cp[1])||(a===cp[1]&&b===cp[0])){
          var nm = JIJI_KR[cp[0]]+JIJI_KR[cp[1]]+'충';
          result[nm] = (result[nm]||0) + 1.0 * mul;
        }
      }
      for(var hi=0;hi<HAP_PAIRS.length;hi++){
        var hp = HAP_PAIRS[hi];
        if((a===hp[0]&&b===hp[1])||(a===hp[1]&&b===hp[0])){
          var nm2 = JIJI_KR[hp[0]]+JIJI_KR[hp[1]]+'합';
          result[nm2] = (result[nm2]||0) + 0.8 * mul;
        }
      }
    }
  }
  for(var k2 in result){
    if(Object.prototype.hasOwnProperty.call(result,k2)){
      result[k2] = Math.round(result[k2]*100)/100;
    }
  }
  return result;
}

function labelStrength(ratio){
  if(ratio >= 1.5) return '강';
  if(ratio >= 1.0) return '중';
  return '약';
}

function extractTopFeatures(saju, gg, opts){
  opts = opts || {};
  var threshold = (opts.threshold!=null) ? opts.threshold : 0.4;
  var minN = (opts.min!=null) ? opts.min : 3;
  var maxN = (opts.max!=null) ? opts.max : 7;

  var sipseong = calcSipseongStrength(saju, gg);
  var sipseongDistinct = applyDistinctiveness(sipseong);
  var sinsal = calcSinsalStrength(saju);
  var relation = calcRelationStrength(saju);

  var catW = STRENGTH_WEIGHTS.category;
  var features = [];

  // 십성: sipseongDistinct.score는 이미 0~1 정규화 → category 가중치만 곱
  Object.keys(sipseongDistinct).forEach(function(name){
    var info = sipseongDistinct[name];
    var sc = info.score * (catW['십성']||1.0);
    features.push({
      type:'십성', name:name,
      score: Math.round(sc*1000)/1000,
      distinct: info.distinct,
      ratio: info.ratio,
      absolute: info.absolute,
      label: labelStrength(info.ratio)
    });
  });

  // 신살: max로 정규화 후 category 가중
  var sinsalKeys = Object.keys(sinsal);
  var sinsalMax = 0;
  sinsalKeys.forEach(function(nm){ if(sinsal[nm] > sinsalMax) sinsalMax = sinsal[nm]; });
  sinsalKeys.forEach(function(nm){
    var raw = sinsal[nm];
    var norm = sinsalMax>0 ? raw / sinsalMax : 0;
    var sc = norm * (catW['신살']||1.0);
    features.push({
      type:'신살', name:nm,
      score: Math.round(sc*1000)/1000,
      distinct: Math.round(norm*1000)/1000,
      ratio: Math.round(norm*100)/100,
      absolute: Math.round(raw*100)/100,
      label: norm>=0.66?'강':(norm>=0.33?'중':'약')
    });
  });

  // 합충: max로 정규화 후 category 가중
  var relKeys = Object.keys(relation);
  var relMax = 0;
  relKeys.forEach(function(nm){ if(relation[nm] > relMax) relMax = relation[nm]; });
  relKeys.forEach(function(nm){
    var raw2 = relation[nm];
    var norm2 = relMax>0 ? raw2 / relMax : 0;
    var sc2 = norm2 * (catW['합충']||1.0);
    features.push({
      type:'합충', name:nm,
      score: Math.round(sc2*1000)/1000,
      distinct: Math.round(norm2*1000)/1000,
      ratio: Math.round(norm2*100)/100,
      absolute: Math.round(raw2*100)/100,
      label: norm2>=0.66?'강':(norm2>=0.33?'중':'약')
    });
  });

  // threshold 통과한 것만 유지 후 점수순 정렬
  var passed = features.filter(function(f){ return f.score >= threshold; });
  passed.sort(function(a,b){ return b.score - a.score; });
  var topFeatures = passed.slice(0, maxN);

  // min 미달이면 모든 features에서 보충
  if(topFeatures.length < minN){
    var allSorted = features.slice().sort(function(a,b){ return b.score - a.score; });
    topFeatures = allSorted.slice(0, minN);
  }

  var sinkangForMulsang = {
    grade: (gg && gg.strengthGrade) ? gg.strengthGrade : '',
    score: (gg && gg.strengthScore!=null) ? gg.strengthScore : 0
  };

  return { topFeatures:topFeatures, sinkangForMulsang:sinkangForMulsang };
}

module.exports = {
  STRENGTH_WEIGHTS: STRENGTH_WEIGHTS,
  calcSipseongStrength: calcSipseongStrength,
  applyDistinctiveness: applyDistinctiveness,
  calcSinsalStrength: calcSinsalStrength,
  calcRelationStrength: calcRelationStrength,
  extractTopFeatures: extractTopFeatures,
  labelStrength: labelStrength
};
