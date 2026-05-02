// lib/gunghap-prompt.js -- gunghap prompt builder (server-side)
'use strict';

var core = require('./saju-core');
var analysis = require('./saju-analysis');
var mbtiData = require('./mbti-data');
var _sjTheory = require('./saju-theory-server');
var _mbtiTheory = require('./mbti-theory-server');
var _patternData = require('./pattern-data');
var _patternMatcher = require('./pattern-matcher');

// ── TERM_HINTS: 전문용어 뉘앙스 병기 + 한자 strip (개인분석과 동일) ──
var TERM_HINTS = {
  '편재격': '큰 돈/사업형', '정재격': '안정 관리형',
  '식신격': '재능/표현형', '상관격': '창의/혁신형',
  '편관격': '리더/카리스마형', '정관격': '안정 질서형',
  '편인격': '독창/영감형', '정인격': '학습/보호형',
  '비견격': '독립/개척형', '겁재격': '승부사/경쟁형',
  '극신강': '자기 에너지가 압도적',
  '극신약': '자기 에너지가 매우 약함',
  '신강': '자기 에너지가 강함',
  '신약': '자기 에너지가 약함',
  '중화': '에너지 균형',
  '재관쌍미': '돈과 명예를 동시에 잡는 구조',
  '비겁탈재': '경쟁자가 재물을 빼앗는 흐름',
  '재다신약': '기회는 많은데 잡을 힘이 부족',
  '식상생재': '재능이 돈으로 연결되는 흐름',
  '관인상생': '명예와 학습이 서로 도와주는 흐름',
  '천간충': '에너지 정면충돌/방향 갈등',
  '음양차착': '겉과 속이 반대인 기운',
  '무은지형': '은혜가 원수로 돌아오는 구조',
  '탐합망충': '합이 충을 무력화',
  '교운기': '대운 전환기/인생 변곡점',
  '비견': '동료/자기 힘/독립',
  '겁재': '라이벌/경쟁/승부',
  '식신': '재능/여유/표현력',
  '상관': '창의/날카로움/반항',
  '편재': '큰 돈/투자/사업 감각',
  '정재': '안정 수입/저축/관리',
  '편관': '카리스마/압박/강한 힘',
  '정관': '안정/질서/책임감',
  '편인': '독창성/영감/비주류',
  '정인': '학습/보호/멘토',
  '종격': '한 방향으로 완전히 쏠린 에너지',
  '공망': '비어있는 자리/허무한 에너지',
  '득령': '계절의 도움을 받는 상태',
  '실령': '계절의 도움을 못 받는 상태',
  '암합': '숨겨진 인연/보이지 않는 연결'
};

function applyTermHintsGH(text) {
  text = text.replace(/\([一-龥]+\)/g, '');
  var keys = Object.keys(TERM_HINTS).sort(function(a, b) { return b.length - a.length; });
  keys.forEach(function(term) {
    var re = new RegExp(term + '(?!\\()(?![가-힣])', 'g');
    text = text.replace(re, term + '(' + TERM_HINTS[term] + ')');
  });
  return text;
}

function buildMBTIProfile(label, axes, mbtiType) {
  var leftSides = ['E','S','T','J'];
  var choices = [], intens = [];
  for (var i = 0; i < 4; i++) {
    if (axes && axes[i]) {
      choices.push(leftSides.indexOf(axes[i].side) >= 0 ? 'L' : 'R');
      intens.push(axes[i].pct || 60);
    } else {
      choices.push('R'); intens.push(60);
    }
  }
  var mi = mbtiData.miAllParam(choices, intens);
  var strArr = choices.map(function(c, i) {
    return mbtiData.strLv(intens[i]) + ' ' + (c === 'L' ? mbtiData.DM_AX[i].Ll : mbtiData.DM_AX[i].Rl);
  });
  var txt = '\n### ' + label + '의 MBTI 강도별 행동 프로파일 (' + mbtiType + ')\n';
  for (var i = 0; i < 4; i++) {
    txt += '- ' + strArr[i] + ': ' + mi[i].trait + '\n';
    txt += '  연애: ' + mi[i].love + '\n';
    txt += '  직업: ' + mi[i].work + '\n';
    txt += '  번아웃: ' + mi[i].burn + '\n';
  }
  return txt;
}

// GH_CATEGORIES
var GH_CATEGORIES = {'ssom':{label:'\u{1F495} \uC378',emoji:'\u{1F495}',categories:['\uC0C1\uB300 \uD30C\uC545','\uB098\uC640\uC758 \uAD00\uACC4','\uC2E4\uC804','\uBBF8\uB798'],scoreLabels:{love:'\uB04C\uB9BC',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC77C\uC0C1'},scoreWeights:{love:0.40,comm:0.30,values:0.15,work:0.15},tone:'\uC124\uB818\uACFC \uAD81\uAE08\uD568. \uB450\uADFC\uAC70\uB9AC\uB294 \uD1A4.'},'lover':{label:'\u2764\uFE0F \uC5F0\uC778',emoji:'\u2764\uFE0F',categories:['\uC0C1\uB300 \uD30C\uC545','\uAD81\uD569 \uAD6C\uC870','\uC18C\uD1B5\uACFC \uAC08\uB4F1','\uACB0\uD63C'],scoreLabels:{love:'\uC5F0\uC560',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC0DD\uD65C'},scoreWeights:{love:0.35,comm:0.25,values:0.25,work:0.15},tone:'\uD604\uC2E4\uC801\uC774\uACE0 \uAE4A\uC740 \uBD84\uC11D. \uC194\uC9C1\uD55C \uD1A4.'},'colleague':{label:'\u{1F4BC} \uC9C1\uC7A5 \uB3D9\uB8CC',emoji:'\u{1F4BC}',categories:['\uC0C1\uB300 \uD30C\uC545','\uD611\uC5C5 \uAD6C\uC870','\uC2E4\uC804 \uD301','\uC131\uC7A5'],scoreLabels:{love:'\uCE5C\uBC00\uB3C4',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uC5C5\uBB34'},scoreWeights:{love:0.05,comm:0.30,values:0.25,work:0.40},tone:'\uD504\uB85C\uD398\uC154\uB110\uD558\uC9C0\uB9CC \uC778\uAC04\uC801.'},'friend':{label:'\u{1F37B} \uCE5C\uAD6C',emoji:'\u{1F37B}',categories:['\uC0C1\uB300 \uD30C\uC545','\uC6B0\uB9AC \uAD6C\uC870','\uC720\uC9C0\uC640 \uC2DC\uB108\uC9C0','\uC7A5\uAE30'],scoreLabels:{love:'\uC720\uB300\uAC10',comm:'\uC18C\uD1B5',values:'\uAC00\uCE58\uAD00',work:'\uD65C\uB3D9'},scoreWeights:{love:0.10,comm:0.35,values:0.30,work:0.25},tone:'\uD3B8\uC548\uD558\uACE0 \uC194\uC9C1\uD55C \uD1A4.'}};

// GH_CAT_RANGES
var GH_CAT_RANGES = {
  ssom: [4, 3, 3, 2],
  lover: [4, 3, 2, 3],
  colleague: [4, 3, 3, 2],
  friend: [4, 3, 3, 2]
};

// GUNGHAP_SYSTEM_V2
var GUNGHAP_SYSTEM_V2 = '\uB2F9\uC2E0\uC740 \uB300\uD55C\uBBFC\uAD6D \uCD5C\uC815\uC0C1\uAE09 MBTS(\uC0AC\uC8FC \u00D7 MBTI) \uC804\uBB38\uAC00\uC785\uB2C8\uB2E4.\n\n## \uD575\uC2EC \uC784\uBB34\n\uB450 \uC0AC\uB78C\uC758 \uC0AC\uC8FC\uD314\uC790\uC640 MBTI\uB97C \uAD50\uCC28 \uBD84\uC11D\uD558\uC5EC, "\uC5B4? \uC6B0\uB9AC \uB531 \uC774\uB798!" \uD558\uACE0 \uC18C\uB984 \uB3CB\uB294 \uAD81\uD569 \uD480\uC774\uB97C \uB9CC\uB4DC\uC138\uC694.\n\n## \uC785\uB825 \uB370\uC774\uD130 \uD65C\uC6A9\n\uC720\uC800 \uD504\uB86C\uD504\uD2B8\uC5D0 \uB2E4\uC74C \uB370\uC774\uD130\uAC00 \uB4E4\uC5B4\uC635\uB2C8\uB2E4. \uAD50\uCC28 \uD328\uD134\uC744 \uC911\uC2EC\uC73C\uB85C, \uB098\uBA38\uC9C0\uB294 \uCC38\uACE0 \uC790\uB8CC\uB85C \uD65C\uC6A9\uD558\uC138\uC694:\n- \uB450 \uC0AC\uB78C\uC758 \uC0AC\uC8FC \uC6D0\uAD6D (\uC624\uD589\u00B7\uACA9\uAD6D\u00B7\uC6A9\uC2E0\u00B7\uD569\uCDA9\uD615\u00B712\uC6B4\uC131)\n- \uB450 \uC0AC\uB78C\uC758 MBTI \uAC15\uB3C4\uBCC4 \uD589\uB3D9 \uD504\uB85C\uD30C\uC77C (4\uCD95\uBCC4 \uC131\uD5A5\u00B7\uC5F0\uC560\u00B7\uC9C1\uC5C5\u00B7\uBC88\uC544\uC6C3)\n- MBTI/\uC0AC\uC8FC \uC774\uB860 \uC2EC\uCE35 \uB370\uC774\uD130\n- \uAD50\uCC28 \uD328\uD134 (\uC0AC\uC8FC\u00D7MBTI \uAD50\uCC28\uC5D0\uC11C \uB3C4\uCD9C\uB41C \uD1B5\uCC30)\n- \uAD81\uD569 \uC5D4\uC9C4 \uC810\uC218 \uBC0F \uAD50\uCC28 \uD0A4\uC6CC\uB4DC\n\n\uAC01 \uC18C\uC8FC\uC81C\uC5D0\uC11C \uC774 \uC7AC\uB8CC\uB4E4\uC744 \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uC870\uD569\uD558\uC5EC \uD480\uC774\uD558\uC138\uC694.\n\uC5B4\uB5A4 \uC7AC\uB8CC\uB4E0 \uD559\uC220 \uD1A4 \uADF8\uB300\uB85C \uC62E\uAE30\uC9C0 \uB9D0\uACE0 \uBC18\uB4DC\uC2DC \uAD6C\uC5B4\uCCB4\uB85C \uC7AC\uD574\uC11D\uD558\uC138\uC694.\n\n## \uAD50\uCC28 \uD328\uD134 \uD65C\uC6A9 (\uD575\uC2EC)\n\uAC01 \uC18C\uC8FC\uC81C\uB9C8\uB2E4 \uC81C\uACF5\uB41C \uAD50\uCC28 \uD328\uD134 \uC911 \uC774 \uAD81\uD569\uC5D0 \uAC00\uC7A5 \uAC15\uD558\uAC8C \uD574\uB2F9\uD558\uB294 4\uAC1C\uB97C \uACE8\uB77C,\n\uADF8 \uD328\uD134\uC758 \uAD50\uCC28\uD574\uC124\uC744 \uC18C\uC8FC\uC81C\uC758 \uBF08\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n\uD328\uD134\uC5D0 \uC5C6\uB294 \uB0B4\uC6A9\uC73C\uB85C \uCC44\uC6B0\uC9C0 \uB9C8\uC138\uC694. \uD328\uD134\uC774 \uD480\uC774\uC758 \uC8FC\uC778\uACF5\uC785\uB2C8\uB2E4.\n\n## \uC804\uBB38\uC6A9\uC5B4 \uAE08\uC9C0 (\uC808\uB300 \uADDC\uCE59)\n\uC0AC\uC8FC/MBTI \uC804\uBB38\uC6A9\uC5B4(\uC2ED\uC131\u00B7\uCC9C\uAC04\uC9C0\uC9C0\u00B7\uC2E0\uC0B4\uBA85\u00B7\uACA9\uAD6D\uBA85\u00B712\uC6B4\uC131\uBA85\u00B7\uAD81\uC704\uBA85\u00B7\uC6B4 \uC774\uB984\u00B7\uC624\uD589\uBD84\uC11D\uC6A9\uC5B4\u00B7\uD569\uCDA9\uD615 \uC6A9\uC5B4\u00B7\uAD50\uCC28\uBD84\uC11D \uC6A9\uC5B4\u00B7\uC778\uC9C0\uAE30\uB2A5 \uC2A4\uD0DD \uC6A9\uC5B4) \uBCF8\uBB38 \uB178\uCD9C \uAE08\uC9C0. \uC790\uC5F0\uC5B4\uB85C \uBC88\uC5ED.\n\uB2E8, _blueprint\uC5D0\uB294 \uC804\uBB38\uC6A9\uC5B4 \uADF8\uB300\uB85C. \uAE08\uC9C0\uB294 \uBCF8\uBB38(b)\uC5D0\uB9CC \uC801\uC6A9.\n\uBB3C\uC0C1 \uBE44\uC720\uB294 \uC790\uC720: \uCD1B\uBD88, \uC774\uC2AC, \uCE7C\uB0A0, \uBC14\uC704, \uD638\uC218, \uC528\uC557, \uBAA8\uB2E5\uBD88 \uB4F1\n\n\uC0AC\uC8FC \uC804\uBB38\uC6A9\uC5B4(\uD55C\uC790 \uD3EC\uD568) \uBCF8\uBB38\uC5D0 \uC808\uB300 \uC4F0\uC9C0 \uB9C8\uC138\uC694. \uAD04\uD638 \uC548 \uB258\uC559\uC2A4\uB97C \uCC38\uACE0\uD574\uC11C \uC790\uC5F0\uC5B4\uB85C\uB9CC.\n\uC804\uBB38\uC6A9\uC5B4 \uC606 \uAD04\uD638\uB294 \uB258\uC559\uC2A4 \uD78C\uD2B8\uC77C \uBFD0\uC785\uB2C8\uB2E4. \uADF8\uB300\uB85C \uC62E\uAE30\uC9C0 \uB9C8\uC138\uC694. \uD574\uB2F9 \uC18C\uC8FC\uC81C\uC758 \uB9E5\uB77D\uACFC \uD750\uB984\uC5D0 \uB9DE\uAC8C \uC790\uAE30 \uB9D0\uB85C \uD480\uC5B4\uC4F0\uC138\uC694.\n\uC778\uC9C0\uAE30\uB2A5 \uC124\uBA85: "INFP \uD2B9\uC720\uC758 ~~ \uC131\uD5A5\uC73C\uB85C" \uC2DD\uC73C\uB85C \uC790\uC5F0\uC5B4\uB85C. \uC778\uC9C0\uAE30\uB2A5 \uCF54\uB4DC(Fi, Ni \uB4F1)\u00B7\uD559\uC220\uC6A9\uC5B4("\uC8FC\uAE30\uB2A5", "Ni-Fi \uB8E8\uD504", "\uB0B4\uBA74\uC758 \uC2EC\uD310\uAD00") \uB178\uCD9C \uAE08\uC9C0.\n  \uB098\uC05C \uC608: "\uB0B4\uBA74\uC758 \uC2EC\uD310\uAD00(Fi)\uC774 \uC8FC\uAE30\uB2A5\uC774\uB77C\uC11C..."\n  \uB098\uC05C \uC608: "Ni-Fi \uB8E8\uD504\uC5D0 \uBE60\uC9C0\uBA74..."\n\n## \uCE74\uB4DC\uBCC4 \uADE0\uD615 (\uC808\uB300 \uADDC\uCE59)\n\uAC01 \uC18C\uC8FC\uC81C \uBCF8\uBB38\uC5D0 \uC0AC\uC8FC \uC7AC\uB8CC\uC640 MBTI \uC7AC\uB8CC\uAC00 \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uC5B4\uC6B0\uB7EC\uC838\uC57C \uD568. \uD55C \uC18C\uC8FC\uC81C\uAC00 \uC0AC\uC8FC\uB9CC \uB610\uB294 MBTI\uB9CC\uC73C\uB85C \uCC44\uC6CC\uC9C0\uB294 \uAC83 \uAE08\uC9C0.\n\n## \uAE0D\uC815 \uBA3C\uC800 \uADDC\uCE59\n\uAC01 \uC18C\uC8FC\uC81C\uC758 \uCCAB 1~2\uBB38\uB2E8\uC740 \uB450 \uC0AC\uB78C\uC758 \uAC15\uC810, \uCF00\uBBF8, \uB04C\uB9BC\uC73C\uB85C \uC2DC\uC791\uD558\uC138\uC694.\n\uAC08\uB4F1\uC774\uB098 \uC57D\uC810\uC740 \uC774\uD6C4 \uBB38\uB2E8\uC5D0 \uBC30\uCE58\uD558\uC138\uC694.\n\n## \uBB38\uCCB4\n- \uC804\uCCB4\uC801\uC73C\uB85C \uD76C\uB9DD\uCC28\uACE0 \uB530\uB73B\uD55C \uD1A4. \uC2DC\uC801\uC774\uACE0 \uAC10\uC131\uC801. \uBB3C\uC0C1 \uBE44\uC720 \uC801\uADF9 \uD65C\uC6A9.\n- \uAD6C\uC5B4\uCCB4: ~\uC608\uC694, ~\uAC70\uB4E0\uC694. "\uB2F9\uC2E0", "\uC0C1\uB300\uBC29"\uC73C\uB85C \uD638\uCE6D.\n- \uB0B4\uBA74 \uB3C5\uBC31("~") \uD56D\uBAA9\uB2F9 \uCD5C\uB300 2\uAC1C. \uBAA8\uB4E0 MBTI\uC5D0 \uB530\uB73B\uD55C \uAC10\uC131 \uD1A4.\n- \uB3D9\uB124 \uC5B8\uB2C8/\uC624\uBE60\uCC98\uB7FC \uCE74\uD398\uC5D0\uC11C \uB450 \uC0AC\uB78C \uC774\uC57C\uAE30 \uD574\uC8FC\uB294 \uB290\uB08C\uC73C\uB85C \uC4F0\uC138\uC694.\n- \uC758\uC0AC\uAC00 \uD658\uC790\uC5D0\uAC8C \uC18C\uACAC\uC11C \uC77D\uC5B4\uC8FC\uB294 \uD1A4 \uAE08\uC9C0.\n\n## _blueprint (\uD480\uC774 \uC804 \uBA54\uBAA8 \u2014 \uC0AC\uC6A9\uC790\uC5D0\uAC8C \uD45C\uC2DC \uC548 \uB428)\n\n\uBCF8\uBB38\uC744 \uC4F0\uAE30 \uC804\uC5D0 _blueprint\uB97C \uBA3C\uC800 \uC791\uC131\uD558\uC138\uC694.\n\uAC01 \uC18C\uC8FC\uC81C\uB9C8\uB2E4 \uAD50\uCC28 \uD328\uD134(\uCD5C\uB300 10\uAC1C) \uC911 \uC774 \uAD81\uD569\uC5D0 \uAC00\uC7A5 \uD574\uB2F9\uD558\uB294 4\uAC1C\uB97C \uACE8\uB77C,\n\uB450 \uC0AC\uB78C\uC758 \uC0AC\uC8FC \uB9E5\uB77D\uC5D0 \uB9DE\uAC8C \uAD6C\uC5B4\uCCB4 \uD55C \uC904\uB85C \uBCC0\uD658\uD558\uC138\uC694.\n\n"_blueprint": {\n  "\uC18C\uC8FC\uC81C1": "\uBCC0\uD6581 / \uBCC0\uD6582 / \uBCC0\uD6583 / \uBCC0\uD6584",\n  "\uC18C\uC8FC\uC81C2": "...",\n  ... \uC804\uCCB4 \uC18C\uC8FC\uC81C\n}\n\n_blueprint\uB97C \uC644\uC131\uD55C \uD6C4\uC5D0\uB9CC categories \uBCF8\uBB38\uC744 \uC4F0\uC138\uC694.\n\uBCF8\uBB38\uC740 _blueprint\uC758 \uBCC0\uD658\uB41C \uBB38\uC7A5\uC744 \uBF08\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n\n## \uC791\uC131 \uADDC\uCE59\n- \uAC01 \uC18C\uC8FC\uC81C\uB294 \uAD50\uCC28 \uD328\uD134\uC5D0\uC11C \uACE0\uB978 \uD328\uD134 \uD558\uB098\uB85C \uC2DC\uC791\uD558\uC138\uC694. \uADF8 \uD328\uD134\uC774 \uC774 \uAD81\uD569\uC5D0 \uC65C \uD574\uB2F9\uB418\uB294\uC9C0\uB97C \uC0AC\uC8FC/MBTI \uB370\uC774\uD130\uB85C \uD480\uC5B4\uC8FC\uC138\uC694. \uD328\uD134 \uC5C6\uC774 \uB370\uC774\uD130\uB9CC\uC73C\uB85C \uC4F4 \uC18C\uC8FC\uC81C\uB294 \uAE4A\uC774\uAC00 \uC5C6\uB294 \uC18C\uC8FC\uC81C\uC785\uB2C8\uB2E4.\n- \uAC01 \uC18C\uC8FC\uC81C\uC5D0\uC11C \uD575\uC2EC \uD328\uD134 4\uAC1C \uACE8\uB77C\uC11C \uAE4A\uAC8C \uD480\uC774\uD558\uC138\uC694. \uB098\uC5F4\uD558\uC9C0 \uB9C8\uC138\uC694.\n- \uAC01 \uC18C\uC8FC\uC81C\uB294 \uD574\uB2F9 \uC18C\uC8FC\uC81C\uC758 \uD328\uD134 \uC139\uC158\uC5D0\uC11C\uB9CC \uD328\uD134\uC744 \uACE8\uB77C \uC4F0\uC138\uC694. \uB2E4\uB978 \uC18C\uC8FC\uC81C\uC758 \uD328\uD134\uC744 \uAC00\uC838\uC624\uC9C0 \uB9C8\uC138\uC694.\n\n\n## \uC778\uC0AC\uC774\uD2B8/\uCC98\uBC29\n- \uBCF8\uBB38(b): \uD480\uC774\uB9CC. \uCC98\uBC29\uC740 \uD301\uC5D0\uB9CC.\n- \uCD94\uC0C1\uC801 \uC870\uC5B8 \uAE08\uC9C0. \uC624\uB298 \uB2F9\uC7A5 \uD560 \uC218 \uC788\uB294 \uAD6C\uCCB4\uC801 \uD589\uB3D9.\n- \uAC01 \uC18C\uC8FC\uC81C\uC758 b \uB9C8\uC9C0\uB9C9\uC5D0 \uBC18\uB4DC\uC2DC \uD83D\uDC8A\uB85C \uC2DC\uC791\uD558\uB294 \uC2E4\uCC9C \uD301 1~2\uC904. \uD83D\uDC8A\uB294 \uB0B4\uC6A9\uC5D0 \uB530\uB77C \uB2E4\uC591\uD55C \uC774\uBAA8\uD2F0\uCF58\uC744 \uC368\uB3C4 \uB429\uB2C8\uB2E4.\n\n## \uB370\uC774\uD130 \uBB34\uACB0\uC131\n\uC81C\uACF5\uB41C \uC810\uC218\u00B7\uB098\uC774\u00B7\uAC04\uC9C0\u00B7\uC5F0\uB3C4 \uBCC0\uACBD \uAE08\uC9C0. MBTI \uC720\uD615\u00B7\uC778\uC9C0\uAE30\uB2A5 \uBCC0\uACBD \uAE08\uC9C0.\n\n## JSON \uCD9C\uB825 \uD615\uC2DD\n\n{\n  "_blueprint": { ... },\n  "title": "OO\uC77C\uC8FC\u00D7XX\uC77C\uC8FC \u00B7 XXXX\u00D7YYYY \uAD81\uD569",\n  "quote": "\uB450 \uC0AC\uB78C\uC758 \uC0AC\uC8FC \uBD84\uC704\uAE30\uB97C \uC790\uC5F0 \uC774\uBBF8\uC9C0 \uD55C \uC904\uB85C. \uC801\uCC9C\uC218 \uBB3C\uC0C1 + \uACC4\uC808\uAC10. \uB0A9\uC74C\uC740 \uD55C \uC904 \uC694\uC57D \uC804\uC6A9\uC774\uBBC0\uB85C \uC5EC\uAE30\uC120 \uC4F0\uC9C0 \uB9C8\uC138\uC694.",\n  "totalScore": 87,\n  "categories": [\n    {\n      "n": "\uCE74\uD14C\uACE0\uB9AC\uBA85",\n      "subs": [\n        {\n          "h": "\uC18C\uC8FC\uC81C\uBA85",\n          "b": "\uBB38\uB2E81\\n\\n\uBB38\uB2E82\\n\\n\uD83D\uDC8A \uC2E4\uCC9C \uD301"\n        }\n      ]\n    }\n  ]\n}\n\nb: 3~5\uBB38\uB2E8, \uAC01 3~5\uBB38\uC7A5. \\n\\n\uC73C\uB85C \uAD6C\uBD84. \uB9C8\uC9C0\uB9C9 \uBB38\uB2E8\uC740 \uC774\uBAA8\uC9C0\uB85C \uC2DC\uC791\uD558\uB294 \uC2E4\uCC9C \uD301.\nJSON\uB9CC \uCD9C\uB825\uD558\uC138\uC694.';

// GH_REL_CONFIG
var GH_REL_CONFIG = {
  ssom: {
    title: '\uC378',
    subtitle: '\uC774 \uC0AC\uB78C... \uB098 \uC5B4\uB5BB\uAC8C \uC0DD\uAC01\uD574?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uAC89\uACFC \uC18D, \uC9C4\uC9DC \uC131\uACA9\uC744 \uC9DA\uC5B4\uC918', anchor: 'B\uC77C\uAC04 \uC624\uD589+\uACA9\uAD6D \uC720\uD615+\uAC15\uC57D | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5\xB7EI\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uC88B\uC544\uD558\uBA74 \uC774\uB807\uAC8C \uD589\uB3D9\uD558\uB294 \uC0AC\uB78C', anchor: 'B\uBC30\uC6B0\uC790\uAD81(\uC77C\uC9C0) \uC2ED\uC131+B 12\uC6B4\uC131 | \uBCF4\uC870: MBTI B TF\uCD95+\uAC15\uB3C4' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC88B\uC544\uD558\uB294 \uD0C0\uC785', tone: '\uC5B4\uB5A4 \uC0AC\uB78C\uC5D0\uAC8C \uB04C\uB9AC\uB294\uC9C0', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+B\uBC30\uC6B0\uC790\uAD81 \uC2ED\uC131+\uB3C4\uD654\uC0B4 \uC720\uBB34/\uAD81\uC704 | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5 \uBC18\uC751 \uC5D0\uB108\uC9C0' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uD0C0\uC785', tone: '\uC774\uB7F0 \uC0AC\uB78C\uC740 \uC808\uB300 \uC548 \uB428', anchor: 'B\uACFC\uC78E\uC624\uD589+B 5\uC2E0\uC911 \uAE30\uC2E0 \uC624\uD589+\uACA9\uC7AC\xB7\uD3B8\uAD00 \uACFC\uB2E4 \uC5EC\uBD80 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uAC78 \uB208\uC5D0 \uB098\uB294 \uC5B4\uB5A4 \uC0AC\uB78C\uC77C\uAE4C?', anchor: 'B\u2192A \uC2ED\uC131+\uC131\uBCC4\uB9E5\uB77D \uC2ED\uC131(L14)+A\uC758 \uC6D4\uAC04\uC774 B\uC5D0\uAC8C \uC8FC\uB294 \uC778\uC0C1 | \uBCF4\uC870: MBTI SN\uCD95 \uAD50\uCC28+8\uC790\uC2EC\uB9AC\uC704\uCE58(\uB144\uAC04=\uC678\uBD80\uC778\uC0C1)' },
      { h: '\uC6B0\uB9AC \uC0AC\uC774\uC758 \uB04C\uB9BC', tone: '\uC65C \uC790\uAFB8 \uC2E0\uACBD \uC4F0\uC774\uB294\uC9C0\uC758 \uC815\uCCB4', anchor: '\uC77C\uAC04 \uD569/\uCDA9/\uC0DD/\uADF9/\uBE44\uD654+\uC77C\uC9C0 \uC721\uD569 \uC5EC\uBD80+\uC6A9\uC2E0\u2194\uC624\uD589 \uBCF4\uC644 | \uBCF4\uC870: MBTI \uC8FC\uAE30\uB2A5\u2194\uC8FC\uAE30\uB2A5 \uAD50\uCC28' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC548 \uB9DE\uB294 \uAC74 \uC548 \uB9DE\uB294 \uAC70\uC57C', anchor: '\u26A0\uFE0F \uCDA9\xB7\uD615\xB7\uC6D0\uC9C4\uC0B4\xB7\uD574(\uAC15\uC81C \uC5B8\uAE09)+\uACFC\uC78E \uC624\uD589 \uCDA9\uB3CC+\uC591\uC778\uC0B4 \uC720\uBB34 | \uBCF4\uC870: MBTI JP\uCD95\xB7TF\uCD95 \uCC28\uC774' },
      { h: '\uD1B5\uD558\uB294 \uC811\uADFC\uBC95', tone: '\uC774\uB7EC\uBA74 \uD655\uB960 \uC62C\uB77C\uAC00\uC694', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+\uCC9C\uAC04\uD569 \uAD81\uC704+\uC0BC\uD569 \uACF5\uD1B5 \uC624\uD589 | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(A\uC8FC\u2194B\uBD80)' },
      { h: '\uC5ED\uD6A8\uACFC \uB098\uB294 \uD589\uB3D9', tone: '\uC774\uB7EC\uBA74 \uC9C4\uC9DC \uB05D\uC774\uC5D0\uC694', anchor: '\u26A0\uFE0F \uCDA9\xB7\uD615 \uBC18\uBCF5+B \uACB0\uD541 \uC624\uD589 \uAC74\uB4DC\uB9AC\uB294 \uD328\uD134+\uACF5\uB9DD | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5+JP\uCD95 \uCC28\uC774' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uC0AC\uADC0\uB824\uBA74', tone: '\uD0C0\uC774\uBC0D\uACFC \uD604\uC2E4\uC801 \uC870\uC5B8', anchor: '\uB300\uC6B4 \uB3D9\uAE30\uD654+5\uB144 \uD0C0\uC774\uBC0D(\uC138\uC6B4)+12\uC6B4\uC131 | \uBCF4\uC870: MBTI JP\uCD95+\uC804\uCCB4 \uC720\uD615 \uC870\uD569' },
      { h: '\uC0AC\uADC0\uBA74 \uC5B4\uB5A4 \uCEE4\uD50C\uC774 \uB418\uB294\uC9C0', tone: '\uBBF8\uB9AC \uBCF4\uB294 \uC6B0\uB9AC\uC758 \uC5F0\uC778 \uBC84\uC804', anchor: '\uBC30\uC6B0\uC790\uAD81 \uC2ED\uC131 \uAD50\uCC28+\uB0A9\uC74C \uAD81\uD569(\uC774\uB984 \uD3EC\uD568)+\uAC15\uC57D \uAD81\uD569+\uBD80\uBD80\uC2DC\uB108\uC9C0 | \uBCF4\uC870: MBTI \uC804\uCCB4 \uC720\uD615 \uC870\uD569' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uC18C\uB984 \uB3CB\uB294 \uD55C \uC904', anchor: '\uD0A4\uC6CC\uB4DC \uC694\uC57D(18\uB808\uC774\uC5B4)+\uB0A9\uC74C+MBTS \uAD00\uACC4\uC720\uD615\uBCC4 \uBE44\uAD50(bestRelType) | \uBCF4\uC870: MBTI \uC8FC\uAE30\uB2A5 \uC870\uD569' }
    ]
  },
  lover: {
    title: '\uC5F0\uC778',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uCABD \uAC00\uB3C4 \uB420\uAE4C?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uAC89\uACFC \uC18D, \uC9C4\uC9DC \uC131\uACA9\uC744 \uC9DA\uC5B4\uC918', anchor: 'B\uC77C\uAC04 \uC624\uD589+\uACA9\uAD6D \uC720\uD615+\uAC15\uC57D | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5\xB7EI\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5F0\uC560 \uC2A4\uD0C0\uC77C', tone: '\uC0AC\uB791\uC744 \uD45C\uD604\uD558\uB294 \uBC29\uC2DD', anchor: 'B\uBC30\uC6B0\uC790\uAD81(\uC77C\uC9C0) \uC2ED\uC131+B 12\uC6B4\uC131 | \uBCF4\uC870: MBTI B TF\uCD95+\uAC15\uB3C4' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uCC44\uC6CC\uB2EC\uB77C\uB294 \uBE48\uC790\uB9AC', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+B\uBC30\uC6B0\uC790\uAD81 \uC2ED\uC131+\uC721\uCE5C \uC911 \uC778\uC131\xB7\uC2DD\uC0C1 \uBC30\uCE58 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5(\uCC44\uC6CC\uB2EC\uB77C\uB294 \uACF3)' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC5F0\uC778\uC5D0\uAC8C \uBBFC\uAC10\uD55C \uBD80\uBD84', tone: '\uC774\uAC74 \uB18D\uB2F4\uC73C\uB85C\uB3C4 \uD558\uC9C0 \uB9C8\uC138\uC694', anchor: 'B\uACFC\uC78E\uC624\uD589+B 5\uC2E0\uC911 \uAE30\uC2E0+\uACA9\uC7AC\xB7\uD3B8\uC778\xB7\uD3B8\uAD00 \uACFC\uB2E4+\uC591\uC778\uC0B4 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5+TF\uCD95' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uAC78\uD55C\uD14C \uB0B4\uAC00 \uC5B4\uB5A4 \uC0AC\uB78C\uC778\uC9C0', anchor: 'B\u2192A \uC2ED\uC131+\uC131\uBCC4\uB9E5\uB77D \uC2ED\uC131+A\uC6D4\uAC04\u2192B\uC778\uC0C1 | \uBCF4\uC870: MBTI SN\uCD95 \uAD50\uCC28+8\uC790\uC2EC\uB9AC\uC704\uCE58' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '\uC6B0\uB9AC\uAC00 \uC81C\uC77C \uC798 \uB9DE\uB294 \uC21C\uAC04', anchor: '\uCC9C\uAC04\uD569 \uAD81\uC704+\uC0BC\uD569 \uACF5\uD1B5 \uC624\uD589+\uC624\uD589 \uBCF4\uC644 \uAD00\uACC4 | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(\uC8FC\u2194\uC8FC)' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC124\uAC70\uC9C0 \uB54C\uBB38\uC774 \uC544\uB2C8\uC5C8\uC5B4\uC694', anchor: '\u26A0\uFE0F \uCDA9\xB7\uD615\xB7\uC6D0\uC9C4\uC0B4\xB7\uD574(\uAC15\uC81C)+\uACA9\uAD6D \uAD50\uCC28(\uAC15\uC57D \uCC28\uC774)+\uC591\uC778\uC0B4 | \uBCF4\uC870: MBTI JP\uCD95\xB7TF\uCD95 \uCC28\uC774' },
      { h: '\uC2F8\uC6E0\uC744 \uB54C \uD654\uD574\uBC95', tone: '\uC774 \uCEE4\uD50C \uC804\uC6A9 \uD654\uD574 \uACF5\uC2DD', anchor: '\uC6A9\uC2E0 \uAD81\uD569(\uC11C\uB85C \uD544\uC694\uD55C \uC5D0\uB108\uC9C0)+\uCC9C\uAC04\uD569 \uAD81\uC704 | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(A\uC8FC\u2194B\uBD80, B\uC8FC\u2194A\uBD80)' },
      { h: '\uC6B0\uB9AC\uC5D0\uAC8C \uB9DE\uB294 \uC18C\uD1B5\uBC95', tone: '\uC774 \uAD00\uACC4\uC5D0 \uB9DE\uB294 \uB300\uD654 \uBC29\uBC95', anchor: '\uB0A9\uC74C \uAD81\uD569+\uAC15\uC57D \uAD81\uD569+\uC77C\uC9C0 \uAD50\uCC28 \uAD00\uACC4 | \uBCF4\uC870: MBTI EI\uCD95\xB7SN\uCD95 \uC870\uD569' },
      { h: '\uACB0\uD63C\uD558\uBA74 \uC5B4\uB5A4 \uBD80\uBD80\uAC00 \uB418\uB294\uC9C0', tone: '\uBBF8\uB9AC \uBCF4\uB294 \uC6B0\uB9AC \uAC00\uC815\uC758 \uBAA8\uC2B5', anchor: '\uBC30\uC6B0\uC790\uAD81 \uC2ED\uC131 \uAD50\uCC28+\uB0A9\uC74C \uAD81\uD569+\uBD80\uBD80\uC2DC\uB108\uC9C0+\uAC15\uC57D \uAD81\uD569 | \uBCF4\uC870: MBTI \uC804\uCCB4 \uC720\uD615 \uC870\uD569' },
      { h: '\uACB0\uD63C\uAE4C\uC9C0 \uAC00\uB824\uBA74', tone: '\uD604\uC2E4\uC801 \uD0C0\uC774\uBC0D\uACFC \uC870\uAC74', anchor: '\uB300\uC6B4 \uB3D9\uAE30\uD654+5\uB144 \uD0C0\uC774\uBC0D(\uC138\uC6B4)+12\uC6B4\uC131 | \uBCF4\uC870: MBTI JP\uCD95+\uC804\uCCB4 \uC720\uD615' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uC774 \uC0AC\uB791\uC5D0 \uB300\uD55C \uC18C\uB984 \uB3CB\uB294 \uD55C \uC904', anchor: '\uD0A4\uC6CC\uB4DC \uC694\uC57D(18\uB808\uC774\uC5B4)+\uB0A9\uC74C+MBTS bestRelType | \uBCF4\uC870: MBTI \uC8FC\uAE30\uB2A5 \uC870\uD569' }
    ]
  },
  colleague: {
    title: '\uC9C1\uC7A5 \uB3D9\uB8CC',
    subtitle: '\uC774 \uC0AC\uB78C\uC774\uB791 \uC5B4\uB5BB\uAC8C \uC77C\uD574\uC57C \uD560\uAE4C',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uAC89\uACFC \uC18D, \uC9C4\uC9DC \uC131\uACA9\uC744 \uC9DA\uC5B4\uC918', anchor: 'B\uC77C\uAC04 \uC624\uD589+\uACA9\uAD6D \uC720\uD615+\uAC15\uC57D | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5\xB7EI\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC5C5\uBB34 \uC2A4\uD0C0\uC77C', tone: '\uBCF4\uACE0\uB294 \uC544\uCE68\uC5D0 \uD574, \uACB0\uB860\uBD80\uD130 \uB9D0\uD574', anchor: 'B\uACA9\uAD6D \uC720\uD615+\uAC15\uC57D+B\uC6D4\uAC04 \uC2ED\uC131+B\uC77C\uAC04 \uC2ED\uC131 \uBD84\uD3EC(\uC815\uAD00/\uD3B8\uAD00/\uC815\uC7AC/\uD3B8\uC7AC \uC911\uC2EC) | \uBCF4\uC870: MBTI B JP\uCD95+Te/Ti \uBC30\uCE58' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC120\uD638\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uC774\uB807\uAC8C \uD558\uBA74 \uC88B\uC544\uD558\uB294 \uAC83', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+B\uC778\uC131\xB7\uC2DD\uC0C1 \uBC30\uCE58+B\uC6D4\uAC04 \uD569 \uC5EC\uBD80 | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5+SN\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uC2EB\uC5B4\uD558\uB294 \uC5C5\uBB34 \uBC29\uC2DD', tone: '\uC774\uAC70 \uC798\uBABB \uAC74\uB4DC\uB9AC\uBA74 \uCEE4\uB9AC\uC5B4\uAC00 \uB0A0\uC544\uAC00', anchor: 'B 5\uC2E0\uC911 \uAE30\uC2E0+\uC591\uC778\uC0B4\xB7\uACA9\uC7AC\uACFC\uB2E4\xB7\uD3B8\uAD00\uACFC\uB2E4 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5+TF\uCD95' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uD68C\uC0AC\uC5D0\uC11C\uB294 \uD45C\uC815\uC73C\uB85C \uC77D\uC744 \uC218\uAC00 \uC5C6\uC73C\uB2C8\uAE4C', anchor: 'B\u2192A \uC2ED\uC131+A\uC6D4\uAC04\uC774 B\uC5D0\uAC8C \uC8FC\uB294 \uC778\uC0C1+\uC131\uBCC4\uB9E5\uB77D | \uBCF4\uC870: MBTI SN\uCD95\xB7TF\uCD95 \uAD50\uCC28+8\uC790\uC2EC\uB9AC\uC704\uCE58' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uC2DC\uB108\uC9C0', tone: '\uC774 \uC870\uD569\uC774 \uD130\uC9C0\uB294 \uC870\uAC74', anchor: '\uC624\uD589 \uBCF4\uC644+\uCC9C\uAC04\uD569 \uAD81\uC704(\uD2B9\uD788 \uC6D4\uAC04\uD569)+\uC0BC\uD569 | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(\uC8FC\u2194\uC8FC)+Te/Ti' },
      { h: '\uAC19\uC774 \uC77C\uD560 \uB54C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uC77C \uBABB \uD574\uC11C\uAC00 \uC544\uB2C8\uC57C, \uBC29\uC2DD\uC774 \uB2E4\uB978 \uAC70\uC57C', anchor: '\u26A0\uFE0F \uCDA9\xB7\uD615\xB7\uC6D0\uC9C4\uC0B4\xB7\uD574(\uAC15\uC81C)+\uACA9\uAD6D \uAD50\uCC28(\uC5C5\uBB34\uBC29\uC2DD \uCC28\uC774) | \uBCF4\uC870: MBTI JP\uCD95 \uCC28\uC774+Te vs Ti \uCDA9\uB3CC' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uB300\uD654\uD560 \uB54C \uD301', tone: '\uC5C5\uBB34 \uB300\uD654\uC5D0\uC11C \uD6A8\uACFC\uC801\uC778 \uBC29\uBC95', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+\uCC9C\uAC04\uD569 \uAD81\uC704 | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5 \uC18C\uD1B5 \uBC29\uC2DD' },
      { h: '\uC774 \uC0AC\uB78C\uC5D0\uAC8C \uC778\uC815\uBC1B\uB294 \uBC95', tone: '\uC774 \uC0AC\uB78C\uC774 \uBCF4\uB294 \uAC8C \uBB54\uC9C0 \uC54C\uBA74 \uD5DB\uC218\uACE0\uAC00 \uC904\uC5B4', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+B\u2192A \uC2ED\uC131 | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5 \uBC18\uC751 \uC5D0\uB108\uC9C0' },
      { h: '\uD2B8\uB7EC\uBE14 \uB0AC\uC744 \uB54C \uB300\uCC98\uBC95', tone: '\uAC78\uAC00 \uB098\uD55C\uD14C \uC418\uB294 \uAC70 \uAC1C\uC778\uC801\uC778 \uAC70 \uC544\uB2C8\uC57C', anchor: '\uC6A9\uC2E0 \uAD81\uD569+\uCDA9\xB7\uD615 \uBC18\uBCF5 \uD328\uD134+\uACF5\uB9DD | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(A\uC8FC\u2194B\uBD80)' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uB2F5\uB2F5\uD55C\uB370, \uC774\uAC8C 3\uB144 \uB4A4 \uB0B4 \uBB34\uAE30\uAC00 \uB3FC', anchor: '\uB300\uC6B4 \uB3D9\uAE30\uD654+12\uC6B4\uC131 \uAD50\uCC28+A\uC758 \uC6A9\uC2E0\uACFC B\uC758 \uC624\uD589 | \uBCF4\uC870: MBTI \uC804\uCCB4 \uC720\uD615 \uC870\uD569' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uB0B4\uC77C \uADF8 \uC0AC\uB78C \uBCF4\uBA74 \uC880 \uB2EC\uB77C\uC9C0\uB294 \uD55C \uC904', anchor: '\uD0A4\uC6CC\uB4DC \uC694\uC57D(18\uB808\uC774\uC5B4)+\uB0A9\uC74C+MBTS bestRelType | \uBCF4\uC870: MBTI \uC8FC\uAE30\uB2A5 \uC870\uD569' }
    ]
  },
  friend: {
    title: '\uCE5C\uAD6C',
    subtitle: '\uC6B0\uB9AC \uC9C4\uC9DC \uCE5C\uD55C \uAC70 \uB9DE\uC9C0?',
    subs: [
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC131\uACA9', tone: '\uAC89\uACFC \uC18D, \uC9C4\uC9DC \uC131\uACA9\uC744 \uC9DA\uC5B4\uC918', anchor: 'B\uC77C\uAC04 \uC624\uD589+\uACA9\uAD6D \uC720\uD615+\uAC15\uC57D | \uBCF4\uC870: MBTI B\uC8FC\uAE30\uB2A5\xB7EI\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uC6B0\uC815 \uC2A4\uD0C0\uC77C', tone: '\uCE5C\uAD6C \uAD00\uACC4\uC5D0\uC11C \uC774 \uC0AC\uB78C\uC758 \uD328\uD134', anchor: 'B\uBE44\uACA9\xB7\uC2DD\uC0C1 \uBD84\uD3EC+B\uC77C\uAC04\u2194\uC77C\uC9C0 \uAD00\uACC4 | \uBCF4\uC870: MBTI B EI\uCD95+Fe/Fi\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uBC14\uB77C\uB294 \uAC83', tone: '\uCE5C\uAD6C\uC5D0\uAC8C \uC6D0\uD558\uB294 \uAC83', anchor: 'B\uC6A9\uC2E0 \uBC29\uD5A5+B\uC778\uC131\xB7\uBE44\uACA9 \uBC30\uCE58 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5(\uBB34\uC758\uC2DD\uC801 \uB2C8\uC988)' },
      { h: '\uC774 \uC0AC\uB78C\uC774 \uCE5C\uAD6C\uC5D0\uAC8C \uC11C\uC6B4\uD574\uD558\uB294 \uAC83', tone: '\uCE5C\uAD6C \uAD00\uACC4\uC5D0\uC11C \uC11C\uC6B4\uD574\uD558\uB294 \uD3EC\uC778\uD2B8', anchor: 'B 5\uC2E0\uC911 \uAE30\uC2E0+\uACFC\uC78E \uC624\uD589 \uC790\uADF9 \uD328\uD134+\uC6D0\uC9C4\uC0B4 | \uBCF4\uC870: MBTI B\uC5F4\uB4F1\uAE30\uB2A5+TF\uCD95' },
      { h: '\uC0C1\uB300 \uB208\uC5D0 \uBE44\uCE5C \uB098', tone: '\uAC78 \uB208\uC5D0 \uB098\uB294 \uC5B4\uB5A4 \uC0AC\uB78C\uC77C\uAE4C?', anchor: 'B\u2192A \uC2ED\uC131+B\uBE44\uACA9\xB7\uC2DD\uC0C1\uC774 A\uB97C \uC778\uC2DD\uD558\uB294 \uBC29\uC2DD | \uBCF4\uC870: MBTI SN\uCD95 \uAD50\uCC28+8\uC790\uC2EC\uB9AC\uC704\uCE58' },
      { h: '\uC798 \uB9DE\uB294 \uBD80\uBD84', tone: '3\uC2DC\uAC04\uC774 30\uBD84 \uAC19\uC740 \uC774\uC720', anchor: '\uB0A9\uC74C \uAD81\uD569+\uC0BC\uD569 \uACF5\uD1B5 \uC624\uD589+\uC624\uD589 \uBCF4\uC644 | \uBCF4\uC870: MBTI EI\uCD95\xB7SN\uCD95 \uC870\uD569' },
      { h: '\uC11C\uB85C \uB9DE\uCDB0\uAC00\uC57C \uD560 \uBD80\uBD84', tone: '\uBAA8\uB974\uACE0 \uC9C0\uB098\uCE58\uBA74 \uAE08 \uAC00\uB294 \uD3EC\uC778\uD2B8', anchor: '\u26A0\uFE0F \uCDA9\xB7\uD615\xB7\uC6D0\uC9C4\uC0B4\xB7\uD574(\uAC15\uC81C)+\uACFC\uC78E \uC624\uD589 \uCDA9\uB3CC+\uC591\uC778\uC0B4 \uC720\uBB34 | \uBCF4\uC870: MBTI JP\uCD95\xB7TF\uCD95 \uCC28\uC774' },
      { h: '\uC774 \uC0AC\uB78C\uC758 \uAC10\uC815 \uD45C\uD604 \uBC29\uC2DD', tone: '\uC774 \uC0AC\uB78C\uC774 \uAC10\uC815\uC744 \uB4DC\uB7EC\uB0B4\uB294 \uBC29\uBC95', anchor: 'B\uACA9\uAD6D \uAC15\uC57D+B 12\uC6B4\uC131+B\uC77C\uAC04 \uC74C\uC591 | \uBCF4\uC870: MBTI B TF\uCD95+Fe/Fi\uCD95' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uD558\uBA74 \uC798 \uB418\uB294 \uAC83', tone: '\uD568\uAED8\uD558\uBA74 \uC2DC\uB108\uC9C0 \uB098\uB294 \uAC83', anchor: '\uCC9C\uAC04\uD569 \uAD81\uC704+\uC0BC\uD569 \uACF5\uD1B5 \uC624\uD589+\uC6A9\uC2E0\u2194\uC624\uD589 \uBCF4\uC644+\uBD80\uBD80\uC2DC\uB108\uC9C0(\uD65C\uB3D9\uCD94\uCC9C) | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28(\uC8FC\u2194\uBD80)' },
      { h: '\uBA40\uC5B4\uC84C\uC744 \uB54C \uD68C\uBCF5\uBC95', tone: '\uC5B4\uC0C9\uD574\uC84C\uC744 \uB54C \uB204\uAC00 \uBA3C\uC800 \uC5B4\uB5BB\uAC8C', anchor: '\uC6A9\uC2E0 \uAD81\uD569+\uCC9C\uAC04\uD569 \uAD81\uC704+\uCC9C\uC744\uADC0\uC778 \uAD50\uCC28 | \uBCF4\uC870: MBTI \uC778\uC9C0\uAE30\uB2A5 \uAD50\uCC28+Fe/Fi' },
      { h: '\uC774 \uC0AC\uB78C\uACFC \uAC19\uC774 \uC131\uC7A5\uD558\uB824\uBA74', tone: '\uD568\uAED8 \uBC1C\uC804\uD558\uAE30 \uC704\uD55C \uBC29\uBC95', anchor: '\uB300\uC6B4 \uB3D9\uAE30\uD654+12\uC6B4\uC131 \uAD50\uCC28+\uC624\uD589 \uBCF4\uC644 \uC7A5\uAE30 \uBCC0\uD654 | \uBCF4\uC870: MBTI \uC804\uCCB4 \uC720\uD615 \uC870\uD569' },
      { h: '\uD55C \uC904 \uC694\uC57D', tone: '\uC77D\uACE0 \uB098\uBA74 \uAC78\uD55C\uD14C \uC5F0\uB77D\uD558\uACE0 \uC2F6\uC5B4\uC9C0\uB294 \uD55C \uC904', anchor: '\uD0A4\uC6CC\uB4DC \uC694\uC57D(18\uB808\uC774\uC5B4)+\uB0A9\uC74C+MBTS bestRelType | \uBCF4\uC870: MBTI \uC8FC\uAE30\uB2A5 \uC870\uD569' }
    ]
  }
};

// getGHSystemPrompt
function getGHSystemPrompt(rel) {
  var base = GUNGHAP_SYSTEM_V2;
  var cfg = GH_REL_CONFIG[rel];
  if (!cfg) return base;

  var cat = GH_CATEGORIES[rel];
  var label = cat ? cat.label : rel;

  // v3 categorized subs structure (primary)
  if (cfg.subs && cfg.subs.length > 0) {
    var catNames = (cat && cat.categories) || ['\uC804\uCCB4'];
    var ranges = GH_CAT_RANGES[rel] || [cfg.subs.length];
    var section = '\n## \uAD00\uACC4: ' + label
      + '\n\uBD80\uC81C: ' + (cfg.subtitle || '')
      + '\n\n## categories (' + catNames.length + '\uAC1C \uACE0\uC815, ' + cfg.subs.length + '\uAC1C subs)\n\n';
    var idx = 0;
    for (var c = 0; c < catNames.length; c++) {
      var subNames = [];
      for (var s = 0; s < (ranges[c] || 0); s++) {
        if (idx < cfg.subs.length) {
          subNames.push(cfg.subs[idx].h);
          idx++;
        }
      }
      section += (c + 1) + '. ' + catNames[c] + ': ' + subNames.join(' / ') + '\n';
    }
    section += '\n\u2605 \uAC01 \uCE74\uD14C\uACE0\uB9AC \uC548\uC5D0 subs \uBC30\uC5F4, \uAC01 sub\uB294 {"h":"\uC18C\uC81C\uBAA9","b":"\uBCF8\uBB38"} \uAC1D\uCCB4. \uCE74\uD14C\uACE0\uB9AC\uB97C \uD1B5\uC9F8\uB85C \uD558\uB098\uC758 \uAE00\uB85C \uC4F0\uBA74 \uBD88\uD569\uACA9.\n';
    section += '\uBC18\uB4DC\uC2DC \uC704 \uCE74\uD14C\uACE0\uB9AC\uC640 \uC18C\uC8FC\uC81C \uC804\uBD80\uB97C \uBE60\uC9D0\uC5C6\uC774 \uC21C\uC11C\uB300\uB85C \uC791\uC131\uD558\uC138\uC694.\n';
    section += 'h\uB294 \uC704\uC5D0 \uC815\uC758\uB41C \uC18C\uC8FC\uC81C\uBA85\uC744 \uC815\uD655\uD788 \uADF8\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n';
    return base + section;
  }

  // legacy: nested categories structure (fallback)
  if (cfg.categories && cfg.categories[0] && cfg.categories[0].subs) {
    var section2 = '\n## \uAD00\uACC4: ' + label
      + '\n\uBD80\uC81C: ' + (cfg.subtitle || '')
      + '\n\n## \uC18C\uC8FC\uC81C (\uC21C\uC11C\uB300\uB85C \uC791\uC131)\n\n';
    var subCount = 0;
    cfg.categories.forEach(function(c) {
      section2 += '### ' + c.name + '\n';
      c.subs.forEach(function(s) {
        subCount++;
        section2 += subCount + '. ' + s.h + '\n';
      });
      section2 += '\n';
    });
    section2 += '\n\uBC18\uB4DC\uC2DC \uC704 \uC18C\uC8FC\uC81C \uC804\uBD80\uB97C \uBE60\uC9D0\uC5C6\uC774 \uC21C\uC11C\uB300\uB85C \uC791\uC131\uD558\uC138\uC694.\n';
    section2 += 'h\uB294 \uC704\uC5D0 \uC815\uC758\uB41C \uC18C\uC8FC\uC81C\uBA85\uC744 \uC815\uD655\uD788 \uADF8\uB300\uB85C \uC0AC\uC6A9\uD558\uC138\uC694.\n';
    return base + section2;
  }

  // fallback: simple categories
  var catSection = '\n## \uAD00\uACC4: ' + label + '\n\uCE74\uD14C\uACE0\uB9AC:\n';
  if (cfg.categories) {
    cfg.categories.forEach(function(c, i) { catSection += (i + 1) + '. ' + c + '\n'; });
  }
  return base + catSection;
}

// buildGunghapPrompt
function buildGunghapPrompt(paramsA, paramsB, relType) {
  // paramsA = { y, m, d, h, min, gender, mbtiType, mbtiAxes?: [{side,pct},...] }
  // paramsB = { y, m, d, h, min, gender, mbtiType, mbtiAxes?: [{side,pct},...] }
  // relType = 'ssom' | 'lover' | 'colleague' | 'friend'

  // Calculate person A
  var sajuA = core.calcSajuForApp(+paramsA.y, +paramsA.m, +paramsA.d,
    paramsA.h ? +paramsA.h : null, paramsA.min ? +paramsA.min : null, paramsA.cityLng || null);
  var ggA = analysis.analyzeGyeokguk(sajuA);
  var genderA = (paramsA.gender === '\uB0A8\uC131' || paramsA.gender === '\uB0A8') ? '\uB0A8' : '\uC5EC';
  var dwA = analysis.calcDaewoon(sajuA, +paramsA.y, +paramsA.m, +paramsA.d,
    paramsA.h ? +paramsA.h : 12, paramsA.min ? +paramsA.min : 0, genderA);

  // Build MBTI object A
  var tiA = mbtiData.TY[paramsA.mbtiType] || {n:"\uD0D0\uD5D8\uAC00", cf:"Ni-Te-Fi-Se"};
  var mbtiObjA;
  if (paramsA.mbtiAxes && paramsA.mbtiAxes.length === 4) {
    mbtiObjA = {
      type: paramsA.mbtiType, cf: tiA.cf,
      axes: paramsA.mbtiAxes, profile: ''
    };
  } else {
    mbtiObjA = {
      type: paramsA.mbtiType, cf: tiA.cf,
      axes: [
        {side: paramsA.mbtiType[0], pct: 60},
        {side: paramsA.mbtiType[1], pct: 60},
        {side: paramsA.mbtiType[2], pct: 60},
        {side: paramsA.mbtiType[3], pct: 60}
      ], profile: ''
    };
  }

  // Calculate person B
  var sajuB = core.calcSajuForApp(+paramsB.y, +paramsB.m, +paramsB.d,
    paramsB.h ? +paramsB.h : null, paramsB.min ? +paramsB.min : null, null);
  var ggB = analysis.analyzeGyeokguk(sajuB);
  var genderB = (paramsB.gender === '\uB0A8\uC131' || paramsB.gender === '\uB0A8') ? '\uB0A8' : '\uC5EC';
  var dwB = analysis.calcDaewoon(sajuB, +paramsB.y, +paramsB.m, +paramsB.d,
    paramsB.h ? +paramsB.h : 12, paramsB.min ? +paramsB.min : 0, genderB);

  var tiB = mbtiData.TY[paramsB.mbtiType] || {n:"\uD0D0\uD5D8\uAC00", cf:"Ni-Te-Fi-Se"};
  var mbtiObjB;
  if (paramsB.mbtiAxes && paramsB.mbtiAxes.length === 4) {
    mbtiObjB = {
      type: paramsB.mbtiType, cf: tiB.cf,
      axes: paramsB.mbtiAxes, profile: ''
    };
  } else {
    mbtiObjB = {
      type: paramsB.mbtiType, cf: tiB.cf,
      axes: [
        {side: paramsB.mbtiType[0], pct: 60},
        {side: paramsB.mbtiType[1], pct: 60},
        {side: paramsB.mbtiType[2], pct: 60},
        {side: paramsB.mbtiType[3], pct: 60}
      ], profile: ''
    };
  }

  // Run gunghap engine
  var ghResult = analysis.analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB);

  // Apply score weights
  var cat = GH_CATEGORIES[relType];
  if (cat && cat.scoreWeights) {
    var w = cat.scoreWeights;
    ghResult.scores.total = Math.round(
      ghResult.scores.love * w.love + ghResult.scores.comm * w.comm +
      ghResult.scores.values * w.values + ghResult.scores.work * w.work
    );
  }

  // Build user prompt
  var userPrompt = analysis.buildGunghapUserPrompt(
    ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB
  );

  // ── Phase 3: MBTI 강도별 행동 프로파일 (기본 데이터 영역) ──
  userPrompt += buildMBTIProfile('A', mbtiObjA.axes, paramsA.mbtiType);
  userPrompt += buildMBTIProfile('B', mbtiObjB.axes, paramsB.mbtiType);

  // ── Phase 1-2: 교차 패턴 주입 (★★ 유일한 강조 — 풀이의 뼈대) ──
  try {
    var intensA = mbtiObjA.axes ? mbtiObjA.axes.map(function(a){ return a.pct; }) : null;
    var intensB = mbtiObjB.axes ? mbtiObjB.axes.map(function(a){ return a.pct; }) : null;
    var userTagsA = _patternData.buildUserTags(sajuA, ggA, dwA, paramsA.mbtiType, intensA);
    var userTagsB = _patternData.buildUserTags(sajuB, ggB, dwB, paramsB.mbtiType, intensB);
    var combinedTags = userTagsA.concat(userTagsB);
    var ghPatternText = _patternMatcher.buildPatternPrompt(relType, combinedTags, { showScores: true });
    if (ghPatternText) {
      userPrompt += '\n\n## ★★ 교차 패턴 — 풀이의 뼈대 (이것을 중심으로 풀이하세요) ★★\n' +
        '아래 패턴이 두 사람의 사주×MBTI 교차에서 도출된 핵심 특성이다.\n' +
        '패턴의 교차해설(cross)을 반드시 구어체로 재해석하여 본문에 포함하라.\n' +
        '해당하지 않는 것은 무시하라.\n\n' +
        ghPatternText;
    }
  } catch(e) { console.warn('[gunghap] Pattern 주입 실패:', e.message); }

  // ── Phase 1-1: MBTI theory 주입 (헤더 격하 — "참고") ──
  try {
    var intensA = mbtiObjA.axes ? mbtiObjA.axes.map(function(a){ return a.pct; }) : null;
    var intensB = mbtiObjB.axes ? mbtiObjB.axes.map(function(a){ return a.pct; }) : null;
    var theoryMBTI_A = _mbtiTheory.MT_buildFullContext(paramsA.mbtiType, intensA, null, paramsB.mbtiType);
    var theoryMBTI_B = _mbtiTheory.MT_buildFullContext(paramsB.mbtiType, intensB, null, paramsA.mbtiType);
    if (theoryMBTI_A) userPrompt += '\n\n## A의 MBTI 이론 참고 (필요 시에만)\n' + theoryMBTI_A;
    if (theoryMBTI_B) userPrompt += '\n\n## B의 MBTI 이론 참고 (필요 시에만)\n' + theoryMBTI_B;
  } catch(e) { console.warn('[gunghap] MBTI theory 주입 실패:', e.message); }

  // ── Phase 1-1: 사주 theory 주입 (헤더 격하 — "참고") ──
  try {
    var theorySaju_A = _sjTheory.SJ_buildFullContext(sajuA, ggA, dwA, genderA, sajuB, ggB);
    var theorySaju_B = _sjTheory.SJ_buildFullContext(sajuB, ggB, dwB, genderB, sajuA, ggA);
    if (theorySaju_A) userPrompt += '\n\n## A의 사주 이론 참고 (필요 시에만)\n' + theorySaju_A;
    if (theorySaju_B) userPrompt += '\n\n## B의 사주 이론 참고 (필요 시에만)\n' + theorySaju_B;
  } catch(e) { console.warn('[gunghap] Saju theory 주입 실패:', e.message); }

  // Append relType-specific subs info to user prompt
  var cfg = GH_REL_CONFIG[relType];
  if (cfg && cat) {
    userPrompt += '\n### \uAD00\uACC4: ' + cat.label + '\n';
    if (cfg.subs && cfg.subs.length > 0) {
      userPrompt += '\uBD80\uC81C: ' + (cfg.subtitle || '') + '\n\n';
      for (var i = 0; i < cfg.subs.length; i++) {
        userPrompt += (i + 1) + '. ' + cfg.subs[i].h + '\n';
      }
    } else {
      userPrompt += '\uCE74\uD14C\uACE0\uB9AC:\n';
      cat.categories.forEach(function(c, i) { userPrompt += (i + 1) + '. ' + c + '\n'; });
      if (cat.tone) userPrompt += '\n\uD1A4: ' + cat.tone + '\n';
    }
  }

  // Build system prompt
  var systemPrompt = getGHSystemPrompt(relType);

  userPrompt = applyTermHintsGH(userPrompt);

  return {
    systemPrompt: systemPrompt,
    userPrompt: userPrompt,
    sajuA: sajuA, sajuB: sajuB,
    ggA: ggA, ggB: ggB,
    dwA: dwA, dwB: dwB,
    mtA: paramsA.mbtiType, mtB: paramsB.mbtiType,
    mbtiObjA: mbtiObjA, mbtiObjB: mbtiObjB,
    ghResult: ghResult
  };
}

module.exports = {
  buildGunghapPrompt: buildGunghapPrompt,
  GH_CATEGORIES: GH_CATEGORIES,
  GH_REL_CONFIG: GH_REL_CONFIG,
  getGHSystemPrompt: getGHSystemPrompt
};
