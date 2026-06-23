'use strict';
// ilgan-axis.js — 일간 양/음 천간 분화 축 (생성기·judge 공용 기준이지 답 아님).
// 본문/유저데이터(seongjil 값·.md 융합문) 노출 금지. 이 모듈은 비공개 채점 기준 전용.
// 큰 = 양천간 극 / 작은 = 음천간 극.
var AXIS = {
  '물':   { '큰':  { ilgan: '임수', pole: '양', flavor: ['역동', '휩쓺', '포용', '큰물'] },
            '작은': { ilgan: '계수', pole: '음', flavor: ['스밈', '섬세', '촉촉', '내밀'] } },
  '불':   { '큰':  { ilgan: '병화', pole: '양', flavor: ['발산', '태양', '드러남'] },
            '작은': { ilgan: '정화', pole: '음', flavor: ['집중', '은근', '촛불', '실속'] } },
  '나무': { '큰':  { ilgan: '갑목', pole: '양', flavor: ['곧음', '뻗음', '거목'] },
            '작은': { ilgan: '을목', pole: '음', flavor: ['유연', '휘감', '적응', '화초'] } },
  '쇠':   { '큰':  { ilgan: '경금', pole: '양', flavor: ['절단', '과감', '강철'] },
            '작은': { ilgan: '신금', pole: '음', flavor: ['예리', '세공', '자존', '보석'] } },
  '흙':   { '큰':  { ilgan: '무토', pole: '양', flavor: ['중후', '포용', '큰산'] },
            '작은': { ilgan: '기토', pole: '음', flavor: ['섬세', '기름짐', '실용', '전답'] } }
};

function entryOf(ohaeng, size) {
  return (AXIS[ohaeng] && AXIS[ohaeng][size]) ? AXIS[ohaeng][size] : null;
}
function ilganOf(ohaeng, size) { var e = entryOf(ohaeng, size); return e ? e.ilgan : null; }
function poleOf(ohaeng, size) { var e = entryOf(ohaeng, size); return e ? e.pole : null; }
function flavorOf(ohaeng, size) { var e = entryOf(ohaeng, size); return e ? e.flavor.slice() : []; }

module.exports = {
  AXIS: AXIS,
  entryOf: entryOf,
  ilganOf: ilganOf,
  poleOf: poleOf,
  flavorOf: flavorOf
};
