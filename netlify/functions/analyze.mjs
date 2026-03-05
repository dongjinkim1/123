export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response('', {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }

  try {
    const body = await req.json();
    const { systemPrompt, userPrompt } = body;

    if (!systemPrompt || !userPrompt) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // GPT 먼저 시도 (메인)
    const OPENAI_KEY = Netlify.env.get('OPENAI_API_KEY');
    const ANTHROPIC_KEY = Netlify.env.get('ANTHROPIC_API_KEY');

    let stream;
    let headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'Cache-Control': 'no-cache' };

    if (OPENAI_KEY) {
      try {
        const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_KEY
          },
          body: JSON.stringify({
            model: 'gpt-5',
            max_tokens: 4096,
            stream: true,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
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

          stream = gptRes.body.pipeThrough(transformStream);
          return new Response(stream, { headers });
        } else {
          console.log('[MBTS] GPT API 실패, Claude 폴백:', gptRes.status);
        }
      } catch(e) {
        console.log('[MBTS] GPT API 에러, Claude 폴백:', e.message);
      }
    }

    // Claude 폴백
    if (ANTHROPIC_KEY) {
      const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          stream: true,
          system: systemPrompt,
          messages: [{ role: 'user', content: userPrompt }]
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

        stream = claudeRes.body.pipeThrough(transformStream);
        return new Response(stream, { headers });
      }
    }

    return new Response(JSON.stringify({ error: 'All AI APIs failed' }), { status: 500 });

  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export const config = { path: "/api/analyze" };
