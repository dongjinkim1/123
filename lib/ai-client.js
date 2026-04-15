// lib/ai-client.js — Claude API JSON parsing utilities
'use strict';

// JSON validation (checks if text contains a valid saju analysis response)
function isValidJSON(text) {
  if (!text || text.length < 100) return false;
  try {
    var cleaned = text.replace(/```json|```/g, '').trim();
    var target = cleaned;
    var fb = cleaned.indexOf('{');
    var lb = cleaned.lastIndexOf('}');
    if (fb >= 0 && lb > fb) target = cleaned.substring(fb, lb + 1);
    var obj = JSON.parse(target);
    return !!(obj && obj.categories && obj.categories.length > 0);
  } catch (e) {
    return false;
  }
}

// Multi-stage JSON parser with progressive fallback
function parseAIResponse(rawText) {
  var cleaned = rawText.replace(/```json|```/g, '').trim();

  // 1st: direct parse
  try { return JSON.parse(cleaned); } catch(e) {}

  // 2nd: extract { to }
  var fb = cleaned.indexOf('{'), lb = cleaned.lastIndexOf('}');
  if (fb >= 0 && lb > fb) {
    try { return JSON.parse(cleaned.substring(fb, lb + 1)); } catch(e) {}
  }

  // 3rd: control char removal
  try {
    var s = cleaned.substring(fb >= 0 ? fb : 0, lb > 0 ? lb + 1 : cleaned.length)
      .replace(/[\x00-\x1F\x7F]/g, function(ch) { return ch==='\n'||ch==='\r'||ch==='\t'?ch:''; });
    return JSON.parse(s);
  } catch(e) {}

  // 4th: bracket repair
  try {
    var raw = cleaned.substring(fb >= 0 ? fb : 0);
    var oB=(raw.match(/{/g)||[]).length, cB=(raw.match(/}/g)||[]).length;
    var oK=(raw.match(/\[/g)||[]).length, cK=(raw.match(/\]/g)||[]).length;
    while(cK<oK){raw+=']';cK++;}
    while(cB<oB){raw+='}';cB++;}
    raw=raw.replace(/,\s*([}\]])/g,'$1');
    return JSON.parse(raw);
  } catch(e) {}

  return null;
}

module.exports = {
  isValidJSON: isValidJSON,
  parseAIResponse: parseAIResponse
};
