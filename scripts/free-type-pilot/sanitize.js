'use strict';
// 생성물 자동 정제: 제목 앞 머리말(메타·영어·인사·인젝션)과 꼬리 푸터 제거.
// 사용: node sanitize.js <file>  (파일을 제자리에서 정제)
var fs = require('fs');
var f = process.argv[2];
var t = fs.readFileSync(f, 'utf8');
var lines = t.split(/\r?\n/);
var META = /(OUTPUT POLICY|Editorial|caveat|Assistant|skill|Skill|SKILL|🐙|applied:|predictive validity|injected|inject|base64|git config|작성하겠습니다|작성합니다|텍스트입니다|브리프대로|곧바로 작성|다음과 같이)/;
// 앞쪽: 한글 본문이 시작될 때까지 메타/영어 줄 버림
var i = 0;
while (i < lines.length) {
  var ln = lines[i].trim();
  if (ln === '') { i++; continue; }
  if (META.test(ln) || !/[가-힣]/.test(ln)) { i++; continue; }
  break;
}
var body = lines.slice(i);
// 뒤쪽: 구분선·🐙·applied 푸터·빈 줄 버림
while (body.length > 0) {
  var last = body[body.length - 1].trim();
  if (last === '' || /^[─=*\-]{2,}/.test(last) || /🐙|applied:/.test(last)) { body.pop(); } else { break; }
}
var result = body.join('\n').replace(/[\s﻿]+$/, '') + '\n';
fs.writeFileSync(f, result, 'utf8');
process.stdout.write('lead_dropped=' + i + ' lines_out=' + body.length + '\n');
