// lib/validators.js — AI output post-validation and input validation
'use strict';

/* ====== AI output post-validation (v29.1) ====== */
function postValidateAI(result, dw, saju, gg) {
  if (!result || !result.categories) return result;
  var dwRanges = dw.daewoons.map(function(d) {
    return { start: d.startAge, end: d.endAge, text: d.startAge + '~' + d.endAge + '세' };
  });
  var fixCount = 0;
  result.categories.forEach(function(cat) {
    // v2: subs[{h,b}] or legacy items[{content,insightText}]
    var entries = cat.subs || cat.items || [];
    entries.forEach(function(item) {
      var txt = item.b || item.content;
      if (!txt) return;
      // 1. Daewoon age range correction
      txt = txt.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
        var start = parseInt(s), end = parseInt(e), span = end - start;
        if (span >= 8 && span <= 11) {
          var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
          if (!found) {
            var closest = null, minDiff = 999;
            dwRanges.forEach(function(r) {
              var diff = Math.abs(r.start - start);
              if (diff < minDiff) { minDiff = diff; closest = r; }
            });
            if (closest && minDiff <= 5) {
              fixCount++;
              console.log('[PostValidate] 대운 나이 교정:', match, '→', closest.text);
              return closest.text;
            }
          }
        }
        return match;
      });
      // 2. insightText correction (legacy compat)
      if (item.insightText) {
        item.insightText = item.insightText.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
          var start = parseInt(s), end = parseInt(e), span = end - start;
          if (span >= 8 && span <= 11) {
            var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
            if (!found) {
              var closest = null, minDiff = 999;
              dwRanges.forEach(function(r) {
                var diff = Math.abs(r.start - start);
                if (diff < minDiff) { minDiff = diff; closest = r; }
              });
              if (closest && minDiff <= 5) { fixCount++; return closest.text; }
            }
          }
          return match;
        });
      }
      // 3. Oheng count correction (when AI altered numbers)
      var ohNames = ['목','화','토','금','수'];
      ohNames.forEach(function(oh) {
        var ohRe = new RegExp(oh + '[=이가] ?(\\d+\\.?\\d*)', 'g');
        txt = txt.replace(ohRe, function(match, num) {
          var aiVal = parseFloat(num);
          var realVal = saju.el[oh];
          if (realVal !== undefined && aiVal !== realVal && Math.abs(aiVal - realVal) >= 1) {
            fixCount++;
            console.log('[PostValidate] 오행 교정:', oh, aiVal, '→', realVal);
            return match.replace(num, String(realVal));
          }
          return match;
        });
      });
      // 4. Seun year-ganji mismatch correction
      if (dw.seun) {
        dw.seun.forEach(function(se) {
          var wrongPattern = new RegExp(se.y + '년[^가-힣]*(갑|을|병|정|무|기|경|신|임|계)(자|축|인|묘|진|사|오|미|신|유|술|해)', 'g');
          txt = txt.replace(wrongPattern, function(match, g, j) {
            if (g !== se.gan || j !== se.ji) {
              fixCount++;
              console.log('[PostValidate] 세운 교정:', match, '→', se.y + '년 ' + se.gan + se.ji);
              return se.y + '년 ' + se.gan + se.ji;
            }
            return match;
          });
        });
      }
      // Store corrected text (v2: b / legacy: content)
      if (item.b !== undefined) item.b = txt;
      else item.content = txt;
    });
  });
  if (fixCount > 0) console.log('[PostValidate] 총 ' + fixCount + '건 교정 완료');
  return result;
}

// Input parameter validation
function validateInput(params) {
  if (!params.y || !params.m || !params.d) return 'Missing birth date';
  if (!params.mbtiChoices || !Array.isArray(params.mbtiChoices) || params.mbtiChoices.length !== 4) return 'Invalid MBTI choices';
  return null;
}

module.exports = {
  postValidateAI: postValidateAI,
  validateInput: validateInput
};
