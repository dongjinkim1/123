export default async function handler(req) {
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

    let headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'Cache-Control': 'no-cache' };

    // GPT 먼저 (채팅은 gpt-4o-mini로 빠르고 저렴하게)
    if (OPENAI_KEY) {
      try {
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
            model: 'gpt-5',
            max_tokens: 2048,
            stream: true,
            messages: gptMessages
          })
        });

        if (gptRes.ok) {
          const transformStream = new TransformStream({
            async transform(chunk, controller) {
              const text = new TextDecoder().decode(chunk);
              const lines = text.split('\n');
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') continue;
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                      controller.enqueue(new TextEncoder().encode(parsed.choices[0].delta.content));
                    }
                  } catch(e) {}
                }
              }
            }
          });
          return new Response(gptRes.body.pipeThrough(transformStream), { headers });
        } else {
          console.log('[MBTS] Chat GPT 실패, Claude 폴백:', gptRes.status);
        }
      } catch(e) {
        console.log('[MBTS] Chat GPT 에러, Claude 폴백:', e.message);
      }
    }

    // Claude 폴백
    if (ANTHROPIC_KEY) {
      try {
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
            stream: true,
            system: systemPrompt,
            messages: claudeMessages
          })
        });

        if (claudeRes.ok) {
          const transformStream = new TransformStream({
            async transform(chunk, controller) {
              const text = new TextDecoder().decode(chunk);
              const lines = text.split('\n');
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6);
                  if (data === '[DONE]') continue;
                  try {
                    const parsed = JSON.parse(data);
                    if (parsed.type === 'content_block_delta' && parsed.delta && parsed.delta.text) {
                      controller.enqueue(new TextEncoder().encode(parsed.delta.text));
                    }
                  } catch(e) {}
                }
              }
            }
          });
          return new Response(claudeRes.body.pipeThrough(transformStream), { headers });
        }
      } catch(e) {
        console.log('[MBTS] Chat Claude 폴백도 실패:', e.message);
      }
    }

    return new Response(JSON.stringify({ error: 'All AI APIs failed' }), { status: 500 });

  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export const config = { path: "/api/chat" };
