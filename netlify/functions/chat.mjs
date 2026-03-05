export default async function handler(req) {
  console.log('[MBTS] /api/chat 호출됨');

  if (req.method === 'OPTIONS') {
    return new Response('', {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }

  try {
    const body = await req.json();
    const { systemPrompt, messages } = body;

    if (!systemPrompt || !messages) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const OPENAI_KEY = Netlify.env.get('OPENAI_API_KEY');
    const ANTHROPIC_KEY = Netlify.env.get('ANTHROPIC_API_KEY');

    // GPT 먼저 (스트리밍 OFF)
    if (OPENAI_KEY) {
      try {
        console.log('[MBTS] chat: GPT 호출 시도 (gpt-5.3-chat-latest)');
        var gptMessages = [{ role: 'system', content: systemPrompt }];
        for (var j = 0; j < messages.length; j++) {
          gptMessages.push({ role: messages[j].role, content: messages[j].content });
        }

        const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_KEY
          },
          body: JSON.stringify({
            model: 'gpt-5.3-chat-latest',
            max_completion_tokens: 2048,
            stream: false,
            messages: gptMessages
          })
        });

        if (gptRes.ok) {
          const data = await gptRes.json();
          const text = data.choices[0].message.content;
          console.log('[MBTS] chat: GPT 성공, 길이:', text.length);
          return new Response(text, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        } else {
          const errBody = await gptRes.text().catch(() => '');
          console.log('[MBTS] chat: GPT 실패 (HTTP ' + gptRes.status + '):', errBody.slice(0, 300));
        }
      } catch(e) {
        console.log('[MBTS] chat: GPT 에러:', e.message);
      }
    }

    // Claude 폴백 (스트리밍 OFF)
    if (ANTHROPIC_KEY) {
      try {
        console.log('[MBTS] chat: Claude 폴백 호출');
        var claudeMessages = [];
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].role === 'user' || messages[i].role === 'assistant') {
            claudeMessages.push({ role: messages[i].role, content: messages[i].content });
          }
        }
        if (claudeMessages.length === 0) {
          claudeMessages.push({ role: 'user', content: '안녕하세요' });
        }

        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 2048,
            system: systemPrompt,
            messages: claudeMessages
          })
        });

        if (claudeRes.ok) {
          const data = await claudeRes.json();
          const text = data.content[0].text;
          console.log('[MBTS] chat: Claude 성공, 길이:', text.length);
          return new Response(text, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        } else {
          const errBody = await claudeRes.text().catch(() => '');
          console.log('[MBTS] chat: Claude도 실패:', errBody.slice(0, 300));
        }
      } catch(e) {
        console.log('[MBTS] chat: Claude 에러:', e.message);
      }
    }

    return new Response(JSON.stringify({ error: 'All AI APIs failed' }), { status: 500 });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export const config = { path: "/api/chat" };
