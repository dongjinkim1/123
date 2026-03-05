// ============================================================
// openai.js — GPT-5.2 전용 엔진 (Claude와 완전 분리)
// streamSonnet을 래핑 — 사주 계산 데이터는 그대로 활용
// 실패 시 engine.js(Anthropic) 폴백
// engine.js / saju.js 절대 수정 없음
// ============================================================

(function() {

  // ============================================================
  // GPT-5.2 전용 시스템 프롬프트
  // Claude용 PREMIUM_SYSTEM과 동일한 규칙 + 동일한 JSON 스키마
  // GPT-5.2 특성에 맞게 재작성 (명확한 지시, 반복 강조)
  // ============================================================
  var GPT_SYSTEM = "You are Korea's top fortune-telling expert with 60 years of experience in Saju (Four Pillars of Destiny) and MBTI cognitive functions. You speak Korean.\n\n## CRITICAL OUTPUT RULE\nYou MUST output ONLY valid JSON. No markdown. No code blocks. No explanation. No text before or after. Start your response with { and end with }.\n\n## YOUR MISSION\nAnalyze the client's Saju (Four Pillars) and MBTI together to create insights so accurate they feel like \"How did you know that about me?\"\n\n## ABSOLUTE RULES (Follow all 6)\n\n### Rule 1: ZERO Technical Jargon in body text (b fields)\nNEVER use these terms in body text: 십성명(비견,겁재,식신,상관,편재,정재,편관,정관,편인,정인), 신살명(양인살,홍염살,역마살,화개살,도화살,천을귀인 etc), 격국명(양인격,편재격 etc), 천간지지명(갑목,임수 etc), 궁위명(배우자궁,직업궁 etc), 오행분석어(비겁에너지,지장간 etc), 12운성명(장생,관대,건록 etc)\nTRANSLATE everything into natural Korean language using metaphors and scenes.\nEXCEPTION: profile.specialStars array may use technical terms.\n\n### Rule 2: Behavior/Scene First\nEvery sub-topic starts with a specific behavior, situation, or scene. Never start with analysis.\n\n### Rule 3: Saju × MBTI in One Breath\nNever separate Saju and MBTI. Saju 70% + MBTI 30%. MBTI cognitive functions: max 1-2 mentions per sub-topic.\n\n### Rule 4: Saju Leads\nSame MBTI but different Saju = completely different content. If MBTI feels like the protagonist, FAIL.\n\n### Rule 5: Reflect MBTI Intensity\nWeak I ≠ Strong I. Always reflect intensity levels in behavior descriptions.\n\n### Rule 6: Data Integrity\nNever change provided numbers, ages, years. Never invent relationships not in the data.\n\n### Positive First Rule\nFirst 2 paragraphs of every sub's b field: MUST start with strengths, charm, natural gifts.\nWeaknesses/conflicts: paragraph 3 onwards only.\nBad: Starting with deficits\nGood: Starting with what makes them special\n\n## _blueprint (WRITE THIS FIRST - quality foundation)\nBefore writing categories, complete _blueprint. This is your private memo - not shown to users.\nAfter completing _blueprint, write categories using it as reference.\n\n_blueprint structure:\n\"_blueprint\": {\n  \"landscape\": \"Overall Saju scenery in one natural image line\",\n  \"tension\": \"Strongest tension/conflict structure in one line\",\n  \"hidden\": \"What's hidden beneath the surface in one line\",\n  \"subs\": {\n    \"나의 성격\": {\"anchor\": \"chosen anchor material\", \"discovery\": \"independently discovered point\", \"killing\": \"sentence only possible with THIS Saju + THIS MBTI\"},\n    \"나의 장점\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"고쳐야 할 점\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"남들이 보는 나\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"연애 스타일\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"잘 맞는 타입\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"연애 지뢰\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"직장 적성\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"맞춤 재물 쌓는 법\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"올해 키워드\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"올해 조언\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"대운 흐름\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"기회의 시기\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n    \"인생 한줄 마무리\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"}\n  },\n  \"repeat_check\": \"Check if same material appears 3+ times across 14 subs. Replace if so.\"\n}\n\n## Required Anchors Per Sub-Topic\n1. 나의 성격 → 일간 물상 + 월지 계절\n2. 나의 장점 → strongest 신살\n3. 고쳐야 할 점 → strongest 충·형·파격 (or excess element side effects)\n4. 남들이 보는 나 → 월간↔일간 relationship (social persona)\n5. 연애 스타일 → 배우자궁 energy character\n6. 잘 맞는 타입 → energy direction the Saju needs\n7. 연애 지뢰 → 배우자궁 tension structure\n8. 직장 적성 → 직업궁 energy character\n9. 재물 → location and strength of money energy\n10. 올해 키워드 → strongest 합충 this year\n11. 올해 조언 → concrete action the Saju needs\n12. 대운 흐름 → each 대운 age range and energy change\n13. 기회의 시기 → 대운 turning points\n14. 인생 마무리 → 납음 meaning\n\n## Writing Style\n- Korean casual speech: ~예요, ~거든요. Address as \"당신\"\n- MBTI cognitive function nicknames: 내면의 심판관(Fi), 분위기 리더기(Fe), 가능성 탐색기(Ne), 미래 내비게이션(Ni), 추억 저장소(Si), 현장 체험러(Se), 내장 논리회로(Ti), 실행력 엔진(Te)\n- Inner monologue (\"~\") max 2 per sub-topic\n- Tone: like a close friend at a café, 1-on-1\n- NEVER sound like a doctor reading a medical report\n- Each sub: 3-5 paragraphs, 3-5 sentences each, separated by \\n\\n\n- End every sub's b with 💊 practical tip (1-2 lines, specific action, not abstract)\n\n## Diversity Rule for Sub-Topic Openings\nNever use same opening pattern 3+ times across 14 subs.\nPatterns: A)daily scene B)Saju landscape C)paradox/reversal D)time(past↔present) E)others' perspective F)question G)data discovery\n\n## JSON Output Format (EXACTLY this structure)\n\n{\n  \"_blueprint\": {\n    \"landscape\": \"...\",\n    \"tension\": \"...\",\n    \"hidden\": \"...\",\n    \"subs\": {\n      \"나의 성격\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"나의 장점\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"고쳐야 할 점\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"남들이 보는 나\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"연애 스타일\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"잘 맞는 타입\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"연애 지뢰\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"직장 적성\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"맞춤 재물 쌓는 법\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"올해 키워드\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"올해 조언\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"대운 흐름\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"기회의 시기\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"},\n      \"인생 한줄 마무리\": {\"anchor\": \"...\", \"discovery\": \"...\", \"killing\": \"...\"}\n    },\n    \"repeat_check\": \"...\"\n  },\n  \"animal\": {\"oheng\": \"화\", \"dominant_sipsung\": \"비겁\", \"condition\": \"신강\"},\n  \"profile\": {\n    \"seasonNote\": \"입하 (초여름 화왕절)\",\n    \"pillars\": [\n      {\"label\": \"시주\", \"chun\": \"갑\", \"chunOheng\": \"목\", \"ji\": \"진\", \"jiOheng\": \"토\", \"sipsung\": \"식신\", \"unyeong\": \"\", \"isDay\": false},\n      {\"label\": \"일주\", \"chun\": \"임\", \"chunOheng\": \"수\", \"ji\": \"술\", \"jiOheng\": \"토\", \"sipsung\": \"비견\", \"unyeong\": \"관대\", \"isDay\": true},\n      {\"label\": \"월주\", \"chun\": \"정\", \"chunOheng\": \"화\", \"ji\": \"사\", \"jiOheng\": \"화\", \"sipsung\": \"정재\", \"unyeong\": \"절\", \"isDay\": false},\n      {\"label\": \"연주\", \"chun\": \"무\", \"chunOheng\": \"토\", \"ji\": \"진\", \"jiOheng\": \"토\", \"sipsung\": \"편관\", \"unyeong\": \"묘\", \"isDay\": false}\n    ],\n    \"ohengBalance\": [\n      {\"name\": \"목\", \"count\": 1, \"emoji\": \"🌿\"},\n      {\"name\": \"화\", \"count\": 2, \"emoji\": \"🔥\"},\n      {\"name\": \"토\", \"count\": 4, \"emoji\": \"🪨\"},\n      {\"name\": \"금\", \"count\": 0, \"emoji\": \"⚔️\"},\n      {\"name\": \"수\", \"count\": 1, \"emoji\": \"🌊\"}\n    ],\n    \"specialStars\": [\"천을귀인\", \"화개살\"],\n    \"mbtiType\": \"INTP\",\n    \"mbtiName\": \"논리술사\",\n    \"mbtiFunctions\": \"내장 논리회로(Ti),가능성 탐색기(Ne),추억 저장소(Si),분위기 리더기(Fe)\",\n    \"mbtiTags\": [\"#조용한분석가\", \"#겉은평온속은폭풍\"]\n  },\n  \"oneLine\": \"초여름 뙤약볕 아래 깊고 맑은 강 — 바닥은 보이는데 수원지가 없어 조용히 증발 중인 물\",\n  \"categories\": [\n    {\n      \"id\": \"me\",\n      \"title\": \"나란 사람\",\n      \"subs\": [\n        {\"h\": \"나의 성격\", \"b\": \"첫 문단 (강점/매력부터 시작)\\n\\n두번째 문단\\n\\n세번째 문단\\n\\n💊 오늘 당장 할 수 있는 실천 팁\"},\n        {\"h\": \"나의 장점\", \"b\": \"문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁\"},\n        {\"h\": \"고쳐야 할 점\", \"b\": \"문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁\"},\n        {\"h\": \"남들이 보는 나\", \"b\": \"문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁\"}\n      ]\n    },\n    {\n      \"id\": \"love\",\n      \"title\": \"나의 연애\",\n      \"subs\": [\n        {\"h\": \"연애 스타일\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"잘 맞는 타입\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"연애 지뢰\", \"b\": \"...\\n\\n💊 팁\"}\n      ]\n    },\n    {\n      \"id\": \"career\",\n      \"title\": \"일과 돈\",\n      \"subs\": [\n        {\"h\": \"직장 적성\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"맞춤 재물 쌓는 법\", \"b\": \"...\\n\\n💊 팁\"}\n      ]\n    },\n    {\n      \"id\": \"year\",\n      \"title\": \"2026년 나의 운\",\n      \"subs\": [\n        {\"h\": \"올해 키워드\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"올해 조언\", \"b\": \"...\\n\\n💊 팁\"}\n      ]\n    },\n    {\n      \"id\": \"future\",\n      \"title\": \"인생 로드맵\",\n      \"subs\": [\n        {\"h\": \"대운 흐름\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"기회의 시기\", \"b\": \"...\\n\\n💊 팁\"},\n        {\"h\": \"인생 한줄 마무리\", \"b\": \"...\\n\\n💊 팁\"}\n      ]\n    }\n  ]\n}\n\nIMPORTANT REMINDERS:\n- categories MUST have subs array\n- Each sub MUST be {\"h\": \"소제목\", \"b\": \"본문\"} format\n- b field MUST end with 💊 tip\n- Fill profile.pillars and ohengBalance with actual data from the user prompt\n- Output ONLY the JSON object. Nothing else.";

  // ============================================================
  // saju.js까지 로드 완료된 streamSonnet 백업 (Anthropic 폴백용)
  // ============================================================
  var _engineStreamSonnet = window.streamSonnet;

  // ============================================================
  // OpenAI SSE 스트리밍 + JSON 파싱 (engine.js 로직 이식)
  // ============================================================
  async function streamWithGPT(userMsg, label, callbacks) {
    callbacks = callbacks || {};
    var onMessage  = callbacks.onMessage  || function(){};
    var onProgress = callbacks.onProgress || function(){};
    var onPercent  = callbacks.onPercent  || function(){};

    var overloadRetries = 0;
    var MAX_RETRIES = 2;
    var r;

    while (true) {
      var ctrl = new AbortController();
      var connectTid = setTimeout(function(){ ctrl.abort(); }, 60000);
      onMessage(label + ' 연결 중...');

      r = await fetch('/api/openai-analyze', {
        signal: ctrl.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: GPT_SYSTEM,
          userPrompt: userMsg
        })
      });
      clearTimeout(connectTid);

      if (!r.ok) {
        var errBody = await r.text();
        console.error('[openai.js] 실패. Status:', r.status, errBody.substring(0, 200));
        if (r.status === 429 || errBody.indexOf('overloaded') >= 0 || errBody.indexOf('rate_limit') >= 0) {
          if (overloadRetries < MAX_RETRIES) {
            overloadRetries++;
            console.log('[openai.js] 과부하, 30초 후 재시도 (' + overloadRetries + '/' + MAX_RETRIES + ')');
            onMessage('서버가 바쁩니다. 잠시만 기다려주세요... (' + overloadRetries + '/' + MAX_RETRIES + ')');
            onProgress(3);
            await new Promise(function(res){ setTimeout(res, 30000); });
            continue;
          }
        }
        throw new Error('HTTP_' + r.status + ': ' + errBody.substring(0, 150));
      }
      break;
    }

    // OpenAI SSE 읽기 (choices[0].delta.content 형식)
    var reader = r.body.getReader();
    var decoder = new TextDecoder();
    var fullText = '', buffer = '', chunkCount = 0;
    var streamStart = Date.now();

    while (true) {
      if (Date.now() - streamStart > 300000) break;
      var chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, { stream: true });
      var lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (var li = 0; li < lines.length; li++) {
        var line = lines[li].trim();
        if (!line.startsWith('data: ')) continue;
        var jsonStr = line.substring(6);
        if (jsonStr === '[DONE]') continue;
        try {
          var evt = JSON.parse(jsonStr);
          var content = evt.choices && evt.choices[0] && evt.choices[0].delta && evt.choices[0].delta.content;
          if (content) {
            fullText += content;
            chunkCount++;
            var pct = Math.min(94, 5 + Math.round((fullText.length / 8000) * 90));
            onProgress(pct);
            onPercent(pct);
            if (chunkCount % 15 === 0) onMessage(label + ' ' + fullText.length + '자 ✍️');
          }
          if (evt.error) throw new Error('STREAM_ERROR: ' + (evt.error.message || ''));
        } catch(pe) {
          if (pe.message && pe.message.indexOf('STREAM_ERROR') >= 0) throw pe;
        }
      }
    }

    console.log('[openai.js] ' + label + ' 완료: ' + fullText.length + '자');

    // JSON 추출 (engine.js 로직 그대로)
    var cleaned = fullText.replace(/```json|```/g, '').trim();
    try { JSON.parse(cleaned); return cleaned; } catch(e1) {}
    var firstBrace = cleaned.indexOf('{');
    var lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      var extracted = cleaned.substring(firstBrace, lastBrace + 1);
      try { JSON.parse(extracted); return extracted; } catch(e2) {}
    }
    var lines2 = cleaned.split('\n');
    var startIdx = -1, endIdx = -1;
    for (var i = 0; i < lines2.length; i++) {
      if (startIdx < 0 && lines2[i].trim().charAt(0) === '{') startIdx = i;
      if (lines2[i].trim().charAt(0) === '}' || lines2[i].trim().slice(-1) === '}') endIdx = i;
    }
    if (startIdx >= 0 && endIdx >= startIdx) {
      var jsonBlock = lines2.slice(startIdx, endIdx + 1).join('\n');
      try { JSON.parse(jsonBlock); return jsonBlock; } catch(e3) {}
    }
    console.warn('[openai.js] JSON 추출 실패:', cleaned.substring(0, 100));
    return cleaned;
  }

  // ============================================================
  // streamSonnet 래핑 — GPT 먼저, 실패 시 engine.js(Anthropic) 폴백
  // ============================================================
  window.streamSonnet = async function(apiKey, systemPrompt, userMsg, label, callbacks, endpoint) {
    console.log('[openai.js] streamSonnet 진입, label=' + label);

    // 궁합 분석은 별도 endpoint — OpenAI 스킵, engine.js 사용
    var ep = endpoint || '/api/analyze';
    if (ep.indexOf('gunghap') >= 0) {
      console.log('[openai.js] 궁합 — engine.js(Anthropic) 직접 사용');
      return _engineStreamSonnet.call(this, apiKey, systemPrompt, userMsg, label, callbacks, endpoint);
    }

    // 1차: GPT-5.2 (GPT 전용 시스템 프롬프트 사용, userMsg는 engine.js가 계산한 그대로)
    try {
      console.log('[openai.js] GPT-5.2 시도...');
      var result = await streamWithGPT(userMsg, label, callbacks);
      if (result && result.length > 100) {
        console.log('[openai.js] GPT-5.2 성공 ✅');
        return result;
      }
      console.warn('[openai.js] GPT-5.2 응답 불충분 → Anthropic 폴백');
    } catch(err) {
      console.warn('[openai.js] GPT-5.2 실패 → Anthropic 폴백:', err.message);
    }

    // 2차 폴백: engine.js (Anthropic) — Claude 시스템 프롬프트 + Anthropic API
    console.log('[openai.js] engine.js(Anthropic) 폴백 실행');
    return _engineStreamSonnet.call(this, apiKey, systemPrompt, userMsg, label, callbacks, endpoint);
  };

  console.log('[openai.js] 등록 완료 — GPT-5.2 우선, Anthropic 폴백');
})();
