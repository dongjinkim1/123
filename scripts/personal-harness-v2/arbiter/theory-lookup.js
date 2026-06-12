// arbiter/theory-lookup.js — D4 접지①: 이론 사전 발췌 (V3 — grep식, 결정적)
'use strict';

var fs = require('fs');
var path = require('path');

var SAJU_THEORY = 'C:\\Users\\김쪨리\\Desktop\\mbts-harness\\saju-theory.js';
var MBTI_THEORY = 'C:\\Users\\김쪨리\\Desktop\\mbts-harness\\mbti-theory.js';

var KEYWORDS = {
  saju: ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인',
    '비겁', '식상', '재성', '관성', '인성', '신강', '신약', '중화', '용신',
    '목', '화', '토', '금', '수', '대운', '세운', '도화', '역마', '화개', '양인',
    '장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'],
  mbti: ['Ni', 'Ne', 'Si', 'Se', 'Ti', 'Te', 'Fi', 'Fe', 'NF', 'NT', 'SJ', 'SP',
    'dominant', 'auxiliary', 'inferior', 'grip', 'loop']
};

var cache = {};
function lines(file) {
  if (!cache[file]) {
    try { cache[file] = fs.readFileSync(file, 'utf8').split('\n'); }
    catch (e) { cache[file] = []; }
  }
  return cache[file];
}

// 텍스트에서 키워드 추출 → 사전 라인 발췌 (키워드당 최대 2줄, 전체 최대 24줄)
function extract(text) {
  var found = { saju: [], mbti: [] };
  ['saju', 'mbti'].forEach(function (side) {
    KEYWORDS[side].forEach(function (kw) {
      if (text.indexOf(kw) >= 0 && found[side].indexOf(kw) < 0) found[side].push(kw);
    });
  });
  var out = [];
  [['saju', SAJU_THEORY], ['mbti', MBTI_THEORY]].forEach(function (pair) {
    var kws = found[pair[0]], ls = lines(pair[1]);
    kws.slice(0, 8).forEach(function (kw) {
      var hit = 0;
      for (var i = 0; i < ls.length && hit < 2; i++) {
        var L = ls[i].trim();
        if (L.indexOf(kw) >= 0 && L.indexOf(':') > 0 && L.length > 10 && L.length < 300 &&
            !/^(\/\/|function|var |const )/.test(L)) {
          out.push('[' + kw + '] ' + L.replace(/^['"]|['"],?$/g, '').slice(0, 200));
          hit++;
        }
      }
    });
  });
  return out.slice(0, 24).join('\n');
}

module.exports = { extract: extract, KEYWORDS: KEYWORDS };
