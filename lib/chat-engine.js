// lib/chat-engine.js — Dalto chat prompt building and AI communication
'use strict';

function buildChatPrompt(saju, mbti, gg, dw, chatHistory, mode) {
  // mode = 'sweet' (warm dalto, default) or 'fire' (fact-bomb dalto)
  mode = mode || 'sweet';

  var sys = '';
  if (mode === 'fire') {
    sys = '당신은 "달토"라는 이름의 사주 전문 AI 상담사입니다. 달토는 귀여운 토끼 캐릭터이지만 팩폭(팩트 폭격) 모드입니다.\n\n';
    sys += '## 달토의 성격 (팩폭 모드)\n';
    sys += '- 직설적이고 냉정한 팩트 전달\n';
    sys += '- 위로보다 현실 직시를 유도\n';
    sys += '- 사주 용어를 정확히 사용하되 핵심만 콕콕 찔러줌\n';
    sys += '- 이모지를 적절히 사용하되 냉소적으로\n';
    sys += '- 답변은 상세하게, 최소 5문장 이상으로\n';
    sys += '- "그래서 어쩌라고?"식 반응 금지. 팩트 지적 후 반드시 실질적 대안 제시\n';
    sys += '- 마크다운 문법 절대 사용하지 마. **볼드**, # 헤더 같은거 쓰지마. 일반 텍스트로만.\n\n';
  } else {
    sys = '당신은 "달토"라는 이름의 사주 전문 AI 상담사입니다. 달토는 귀여운 토끼 캐릭터이지만 사주 분석은 매우 전문적입니다.\n\n';
    sys += '## 달토의 성격\n';
    sys += '- 따뜻하고 공감을 잘 하는 전문 상담사\n';
    sys += '- 사주 용어를 쉽게 풀어서 설명\n';
    sys += '- 긍정적이면서도 현실적인 조언\n';
    sys += '- 이모지를 적절히 사용해서 친근하게\n';
    sys += '- 답변은 상세하게, 최소 5문장 이상으로\n';
    sys += '- 사주학 원리를 근거로 설명하되 쉬운 비유를 곁들여줘\n';
    sys += '- 마크다운 문법 절대 사용하지 마. **볼드**, # 헤더 같은거 쓰지마. 일반 텍스트로만.\n\n';
  }

  if (saju) {
    sys += '## 상담자 사주 정보\n';
    sys += JSON.stringify(saju) + '\n\n';
  }
  if (mbti) {
    sys += '## 상담자 MBTI: ' + mbti + '\n\n';
  }
  sys += '한국어로만 답변하세요.';
  sys += '\n\n[CRITICAL INSTRUCTION] You MUST respond with plain text only. No JSON, no markdown. Just natural conversational Korean text.';

  return { systemPrompt: sys, messages: chatHistory || [] };
}

// NOTE: sendChatToAI calls fetch() with SSE streaming.
// On the server side (Node.js), fetch may not be available natively
// in older versions. This function is preserved as-is for API compatibility
// but may need adaptation for server-side use (e.g., using node-fetch).
async function sendChatToAI(params, callbacks) {
  // params = { apiKey, systemPrompt, messages, endpoint }
  // callbacks = { onChunk(text), onComplete(fullText), onError(err) }
  var endpoint = params.endpoint || '/api/chat';

  try {
    var r = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({systemPrompt: params.systemPrompt, messages: params.messages})
    });

    if (!r.ok) throw new Error('HTTP_' + r.status);

    var reader = r.body.getReader();
    var decoder = new TextDecoder();
    var fullText = '', buffer = '';

    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, {stream: true});
      var lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line.startsWith('data: ')) continue;
        var jsonStr = line.substring(6);
        if (jsonStr === '[DONE]') continue;
        try {
          var evt = JSON.parse(jsonStr);
          if (evt.type === 'content_block_delta' && evt.delta && evt.delta.text) {
            fullText += evt.delta.text;
            if (callbacks.onChunk) callbacks.onChunk(fullText);
          }
        } catch(pe) {}
      }
    }

    if (callbacks.onComplete) callbacks.onComplete(fullText);
    return fullText;
  } catch(err) {
    console.error('[MBTS Chat]', err);
    if (callbacks.onError) callbacks.onError(err.message || 'UNKNOWN');
    return '';
  }
}

module.exports = {
  buildChatPrompt: buildChatPrompt,
  sendChatToAI: sendChatToAI
};
