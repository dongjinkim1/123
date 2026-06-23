'use strict';
// gen160.js — 160 융합 생성 레이어: theory-excerpter + ground_truth 빌더.
// producer 입력(f + 사주발췌 + MBTI발췌)만 출력. 답(성질/특징/근거)·angle·타 타입 미주입(격리).
// 사용: node gen160.js gt <타입stem>   예: node gen160.js gt 큰물INFP
var path = require('path');
var LIB = path.join(__dirname, '..', '..', 'lib');
var saju = require(path.join(LIB, 'saju-data.js'));
var mbtiT = require(path.join(LIB, 'mbti-theory-server.js'));
var mbtiD = require(path.join(LIB, 'mbti-data.js'));
var axis = require('./ilgan-axis.js');
var features80 = require('./features80.json');

var FEAT_CATS = ['core', 'strength', 'weakness', 'love', 'social'];
var FEAT_LABEL = { core: '핵심기질', strength: '강점', weakness: '약점', love: '연애', social: '사회' };

function parseName(stem) {
  var size, rest;
  if (stem.indexOf('작은') === 0) { size = '작은'; rest = stem.slice(2); }
  else if (stem.indexOf('큰') === 0) { size = '큰'; rest = stem.slice(1); }
  else return null;
  return { size: size, ohaeng: rest.slice(0, -4), mbti: rest.slice(-4) };
}

// f(행동) — features80에서 그 오행+MBTI의 f 문장만 (angle 제외)
function fBehavior(ohaeng, mbti) {
  var e = features80[ohaeng + mbti];
  if (!e || !e.feat) return {};
  var out = {};
  FEAT_CATS.forEach(function (c) {
    out[FEAT_LABEL[c]] = (e.feat[c] || []).map(function (x) { return x.f; });
  });
  return out;
}

// 사주 발췌 — 적천수 천간물상(JEOKCHEONSU) + 천간물상 한 줄(CHEONGAN_MULSANG)
function sajuExcerpt(cheongan) {
  var j = saju.JEOKCHEONSU[cheongan] || {};
  return {
    천간물상: saju.CHEONGAN_MULSANG[cheongan] || '',
    적천수: {
      物象: j.title || '', 본질: j.nature || '',
      왕할때: j.strong_img || '', 쇠할때: j.weak_img || '',
      연애: j.love || '', 직업: j.work || '', 위험: j.danger || ''
    }
  };
}

// MBTI 발췌 — 인지기능 스택(TY) + 각 기능 본문(MT_FUNCTIONS) + 타입설명(MT_TYPES)
function mbtiExcerpt(mbti) {
  var ty = mbtiD.TY[mbti] || {};
  var stack = (ty.cf || '').split('-');
  var fns = {};
  stack.forEach(function (fn, i) {
    var f = (mbtiT.MT_FUNCTIONS && mbtiT.MT_FUNCTIONS[fn]) || null;
    var pos = ['주기능', '부기능', '3차기능', '열등기능'][i] || ('기능' + (i + 1));
    if (f) fns[pos + '(' + fn + ')'] = typeof f === 'string' ? f : (f.desc || f.summary || f.name || JSON.stringify(f));
    else fns[pos + '(' + fn + ')'] = '(발췌 없음)';
  });
  var typeDesc = (mbtiT.MT_TYPES && mbtiT.MT_TYPES[mbti]) || null;
  return {
    역할: ty.n || '', 인지기능스택: ty.cf || '',
    인지기능: fns,
    타입설명: typeDesc ? (typeof typeDesc === 'string' ? typeDesc : (typeDesc.desc || typeDesc.summary || JSON.stringify(typeDesc).slice(0, 600))) : ''
  };
}

function buildGT(stem) {
  var p = parseName(stem);
  if (!p) throw new Error('bad stem: ' + stem);
  var ilgan = axis.ilganOf(p.ohaeng, p.size);     // 예: 임수
  var cheongan = ilgan.charAt(0);                  // 예: 임
  var pole = axis.poleOf(p.ohaeng, p.size);        // 양/음
  var saj = sajuExcerpt(cheongan);
  return {
    type: stem, ohaeng: p.ohaeng, size: p.size, mbti: p.mbti, ilgan: ilgan, 천간: cheongan, 극: pole,
    ground_truth: {
      오행: p.ohaeng,
      천간: ilgan + '(' + (p.size === '큰' ? '큰=양' : '작은=음') + ')',
      f: fBehavior(p.ohaeng, p.mbti),
      물상: [saj.천간물상, saj.적천수.物象].filter(Boolean)
    },
    saju_발췌: saj,
    mbti_발췌: mbtiExcerpt(p.mbti)
  };
}

module.exports = { parseName: parseName, fBehavior: fBehavior, sajuExcerpt: sajuExcerpt, mbtiExcerpt: mbtiExcerpt, buildGT: buildGT };

if (require.main === module) {
  var cmd = process.argv[2];
  if (cmd === 'gt') {
    console.log(JSON.stringify(buildGT(process.argv[3]), null, 1));
  } else {
    console.log('사용: node gen160.js gt <타입stem>');
  }
}
