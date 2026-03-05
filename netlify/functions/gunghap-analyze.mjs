export default async function handler(req) {
  console.log('[MBTS] /api/gunghap-analyze 호출됨');

  if (req.method === 'OPTIONS') {
    return new Response('', {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }

  try {
    const body = await req.json();
    const { systemPrompt, userPrompt } = body;
    if (!systemPrompt || !userPrompt) {
      return new Response('Missing required fields', { status: 400 });
    }

    const OPENAI_KEY = Netlify.env.get('OPENAI_API_KEY');
    const ANTHROPIC_KEY = Netlify.env.get('ANTHROPIC_API_KEY');
    const resHeaders = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' };

    // GPT 먼저
    if (OPENAI_KEY) {
      try {
        console.log('[MBTS] gunghap: GPT 호출 (gpt-5.2)');
        const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + OPENAI_KEY },
          body: JSON.stringify({
            model: 'gpt-5.2',
            max_completion_tokens: 4096,
            stream: true,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
          })
        });

        if (gptRes.ok) {
          console.log('[MBTS] gunghap: GPT 연결 성공, 스트리밍 시작');
          const reader = gptRes.body.getReader();
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();

          const readable = new ReadableStream({
            async pull(controller) {
              try {
                const { done, value } = await reader.read();
                if (done) { controller.close(); return; }
                const text = decoder.decode(value, { stream: true });
                const lines = text.split('\n');
                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') continue;
                    try {
                      const parsed = JSON.parse(data);
                      const content = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
                      if (content) {
                        controller.enqueue(encoder.encode(content));
                      }
                    } catch(e) {}
                  }
                }
              } catch(e) {
                controller.close();
              }
            }
          });

          return new Response(readable, { headers: resHeaders });
        } else {
          const err = await gptRes.text().catch(() => '');
          console.log('[MBTS] gunghap: GPT 실패 (' + gptRes.status + '):', err.slice(0, 200));
        }
      } catch(e) {
        console.log('[MBTS] gunghap: GPT 에러:', e.message);
      }
    }

    // Claude 폴백
    if (ANTHROPIC_KEY) {
      try {
        console.log('[MBTS] gunghap: Claude 폴백 호출');
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
          console.log('[MBTS] gunghap: Claude 연결 성공, 스트리밍 시작');
          const reader = claudeRes.body.getReader();
          const decoder = new TextDecoder();
          const encoder = new TextEncoder();

          const readable = new ReadableStream({
            async pull(controller) {
              try {
                const { done, value } = await reader.read();
                if (done) { controller.close(); return; }
                const text = decoder.decode(value, { stream: true });
                const lines = text.split('\n');
                for (const line of lines) {
                  if (line.startsWith('data: ')) {
                    const data = line.slice(6).trim();
                    if (data === '[DONE]') continue;
                    try {
                      const parsed = JSON.parse(data);
                      if (parsed.type === 'content_block_delta' && parsed.delta && parsed.delta.text) {
                        controller.enqueue(encoder.encode(parsed.delta.text));
                      }
                    } catch(e) {}
                  }
                }
              } catch(e) {
                controller.close();
              }
            }
          });

          return new Response(readable, { headers: resHeaders });
        } else {
          const err = await claudeRes.text().catch(() => '');
          console.log('[MBTS] gunghap: Claude 실패:', err.slice(0, 200));
        }
      } catch(e) {
        console.log('[MBTS] gunghap: Claude 에러:', e.message);
      }
    }

    return new Response('All AI APIs failed', { status: 500 });
  } catch(e) {
    return new Response(e.message, { status: 500 });
  }
}

export const config = { path: "/api/gunghap-analyze" };
