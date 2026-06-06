'use strict';
// theory-excerpter.js — 결정론(모델 없음): public/saju-theory.js 청킹·인덱스·본문추출만.
// ⚠ "어느 섹션이냐" 선택은 theory-selector(Sonnet)가 함. 여기선 후보 인덱스 + 본문 슬라이스만.
// ⚠ public/saju-theory.js 는 IIFE+window → require 금지. readFileSync 텍스트로만 읽는다.
//
// [§4.1 토픽맵 — 코퍼스 정렬 결정]
//   명령서 하드맵은 "십성→PART1"이지만 실제 코퍼스의 십성 전용 섹션(④십성 궁위배치/⑤십성 간
//   관계/★대운 십성별 체감)은 PART2에 있고 PART1엔 IIFE 서문 상수만 있다. 하드맵 직역 시
//   v2.2의 "겁재→IIFE서문 오결합" 버그가 재발 → v2.3 목적(섹션 정확선택)과 모순.
//   따라서 토픽맵은 코퍼스 정렬(십성→PART1+2+3 등)하고, 후보를 제목/프리뷰 토큰매칭으로
//   랭킹해 진짜 십성 섹션이 IIFE 서문보다 위로 오게 한다. (좁힘 + 좋은 후보 = 맵의 의도 보존.)
var path = require('path');
var nodefs = require('fs');
var THEORY_PATH = path.join(__dirname, '../../public/saju-theory.js');

var CANDIDATE_CAP = 40;
var PREVIEW_LEN = 150;
var SECTION_CAP = 3500;     // getSectionText 본문 상한(윈도우)
var PART_HEAD_LEN = 1500;   // 폴백: PART 헤드 N자

// keyword(substring of blockId) → 후보 PART 번호들. UNION 후 제목/프리뷰 랭킹으로 정밀화.
// PART4(궁합)는 인벤토리에서 제외 → 어떤 키워드도 4로 보내지 않는다.
var KEYWORD_PARTS = {
  '십성':[1,2,3],'비견':[1,2,3],'겁재':[1,2,3],'식신':[1,2,3],'상관':[1,2,3],
  '편재':[1,2,3],'정재':[1,2,3],'편관':[1,2,3],'정관':[1,2,3],'편인':[1,2,3],'정인':[1,2,3],
  '비겁':[1,2,3],'식상':[1,2,3],'재성':[1,2,3],'관성':[1,2,3],'인성':[1,2,3],
  '신살':[1],'도화':[1],'역마':[1],'화개':[1],'귀인':[1],'양인':[1,2],'백호':[1],
  '귀문':[1],'문창':[1],'천을':[1],'천덕':[1],'월덕':[1],'금여':[1],'학당':[1],'특수':[1],
  '육친':[1],'통변':[1],'교운':[1],'건강':[1],'직업':[1],'적성':[1],'오신':[1],'개운':[1],
  '공망':[1],'운성':[1],'궁위':[1],'타이밍':[1],'러브':[1],'머니':[1],'자녀':[1],'월간':[1],
  '격국':[2,3],'대운':[1,2],'합충':[2],'합':[2],'충':[2],'형':[1,2],'투출':[1,2],'일주':[2],
  '월률':[1,2],'택일':[2],'로드맵':[2],'원국':[1,2],'관계':[1,2],
  '음양':[1,3],'오행':[1,3],'물상':[2,3],'결핍':[3],'편중':[3],'중화':[2,3],
  '신강':[1,2,3],'신약':[1,2,3],'밸런스':[1,3],
  '철학':[5],'일반':[5],'프레임':[5]
};

var _cache = null;
function load() {
  if (_cache) return _cache;
  var txt = nodefs.readFileSync(THEORY_PATH, 'utf8'); // require 아님
  var lines = txt.split(/\r?\n/);
  // PART 배너: ║ 코드포인트 의존 회피 — "// ... PART N:" 주석줄로 탐지(전 파일 5개만 존재).
  var banners = [];
  for (var i = 0; i < lines.length; i++) {
    var m = /^\/\/.*PART ([1-5]):/.exec(lines[i]);
    if (m) banners.push({ part: parseInt(m[1], 10), line: i });
  }
  var sections = [];      // flat
  var byPart = {};        // part → [section]
  for (var b = 0; b < banners.length; b++) {
    var part = banners[b].part;
    var startL = banners[b].line;
    var endL = (b + 1 < banners.length) ? banners[b + 1].line : lines.length;
    byPart[part] = byPart[part] || [];
    // 섹션 헤더 = /^\/\/ ={3,}/ 라인. body = 헤더 ~ 다음 헤더(or part end).
    var hdrs = [];
    for (var l = startL; l < endL; l++) if (/^\/\/ ={3,}/.test(lines[l])) hdrs.push(l);
    for (var h = 0; h < hdrs.length; h++) {
      var hs = hdrs[h];
      var he = (h + 1 < hdrs.length) ? hdrs[h + 1] : endL;
      var title = extractTitle(lines, hs, he);
      var body = lines.slice(hs, he).join('\n');
      var id = 'P' + part + '-S' + pad2(byPart[part].length + 1);
      var sec = { id: id, part: part, title: title, body: body, preview: makePreview(body) };
      byPart[part].push(sec);
      sections.push(sec);
    }
  }
  _cache = { txt: txt, lines: lines, banners: banners, sections: sections, byPart: byPart };
  return _cache;
}

function pad2(n) { return (n < 10 ? '0' : '') + n; }
function extractTitle(lines, hs, he) {
  for (var j = hs + 1; j < he; j++) {
    var t = lines[j].replace(/^\/\/\s?/, '').trim();
    if (!t) continue;
    if (/^={3,}/.test(t)) continue;       // 연속 ==== 줄 스킵
    return t.slice(0, 80);
  }
  return '(무제)';
}
function makePreview(body) {
  var s = body.replace(/^\/\/ ={3,}.*$/m, '').replace(/[\r\n]+/g, ' ').replace(/\/\/\s?/g, '').trim();
  return s.slice(0, PREVIEW_LEN);
}
function tokenize(blockId) {
  var parts = String(blockId).split(/[:/]/).map(function (s) { return s.trim(); }).filter(Boolean);
  var toks = parts.slice();
  // 합성 인벤토리명 분해 (운성궁위 → 운성/궁위 등) — 알려진 키워드가 부분문자열이면 추가.
  Object.keys(KEYWORD_PARTS).forEach(function (k) {
    if (String(blockId).indexOf(k) >= 0 && toks.indexOf(k) < 0) toks.push(k);
  });
  return toks;
}
function topicParts(blockId) {
  var set = {};
  Object.keys(KEYWORD_PARTS).forEach(function (k) {
    if (String(blockId).indexOf(k) >= 0) KEYWORD_PARTS[k].forEach(function (p) { set[p] = true; });
  });
  var arr = Object.keys(set).map(Number).sort();
  return arr.length ? arr : [5]; // 누락 → PART5
}

// === API 1: 후보 섹션 (제목+프리뷰만, 본문 X) ===
function listCandidateSections(blockId) {
  var idx = load();
  var parts = topicParts(blockId);
  var toks = tokenize(blockId);
  var pool = [];
  parts.forEach(function (p) { (idx.byPart[p] || []).forEach(function (s) { pool.push(s); }); });
  // 랭킹: 제목 토큰매칭 +3, 프리뷰 +1. 동점은 part·index 순.
  function scoreSec(s) {
    var sc = 0;
    for (var i = 0; i < toks.length; i++) {
      if (toks[i].length < 1) continue;
      if (s.title.indexOf(toks[i]) >= 0) sc += 3;
      else if (s.preview.indexOf(toks[i]) >= 0) sc += 1;
    }
    // IIFE 서문/유틸/상수 섹션 디프라이오리티(v2.2 오결합 방지)
    if (/function\s*\(|무제|헬퍼|상수|매핑 상수|폴백/.test(s.title)) sc -= 2;
    return sc;
  }
  pool.sort(function (a, b) {
    var d = scoreSec(b) - scoreSec(a);
    if (d !== 0) return d;
    if (a.part !== b.part) return a.part - b.part;
    return a.id < b.id ? -1 : 1;
  });
  return pool.slice(0, CANDIDATE_CAP).map(function (s) {
    return { id: s.id, title: s.title, preview: s.preview };
  });
}

// === API 2: 섹션 본문 (≤ SECTION_CAP, 폴백: PART 헤드) ===
function getSectionText(sectionId) {
  var idx = load();
  var m = /^P([1-5])(?:-S(\d+))?$/.exec(String(sectionId || '').trim());
  if (!m) return partHead(1); // 완전 불명 → PART1 헤드(throw 없이)
  var part = parseInt(m[1], 10);
  if (m[2] == null) return partHead(part); // part-only → 헤드 폴백
  var sec = (idx.byPart[part] || []).filter(function (s) { return s.id === sectionId; })[0];
  if (!sec) return partHead(part);          // 범위 밖 → 헤드 폴백
  return sec.body.length > SECTION_CAP ? sec.body.slice(0, SECTION_CAP) : sec.body;
}
function partHead(part) {
  var idx = load();
  var b = null, nb = null;
  for (var i = 0; i < idx.banners.length; i++) {
    if (idx.banners[i].part === part) { b = idx.banners[i].line; nb = (idx.banners[i + 1] || {}).line; break; }
  }
  if (b == null) return '';
  var end = (nb == null) ? idx.lines.length : nb;
  return idx.lines.slice(b, end).join('\n').slice(0, PART_HEAD_LEN);
}

module.exports = {
  load: load, listCandidateSections: listCandidateSections, getSectionText: getSectionText,
  topicParts: topicParts, tokenize: tokenize
};

// === CLI: list <blockId> | text <sectionId> ===
if (require.main === module) {
  var cmd = process.argv[2], arg = process.argv[3];
  if (cmd === 'list') process.stdout.write(JSON.stringify(listCandidateSections(arg), null, 2) + '\n');
  else if (cmd === 'text') process.stdout.write(getSectionText(arg) + '\n');
  else process.stderr.write('usage: node theory-excerpter.js list <blockId> | text <sectionId>\n');
}
