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
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const OPENAI_KEY = Netlify.env.get('OPENAI_API_KEY');
    const ANTHROPIC_KEY = Netlify.env.get('ANTHROPIC_API_KEY');
    let headers = { 'Content-Type': 'text/plain; charset=utf-8', 'Transfer-Encoding': 'chunked', 'Cache-Control': 'no-cache' };
    let gptFailed = false;

    // GPT 먼저 시도 (메인)
    if (OPENAI_KEY) {
      try {
        console.log('[MBTS] gunghap: GPT 호출 시도 (gpt-5.2)');
        const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_KEY
          },
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
          console.log('[MBTS] gunghap: GPT 성공');
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
          const errBody = await gptRes.text().catch(() => '');
          console.log('[MBTS] gunghap: GPT 실패 (HTTP ' + gptRes.status + '):', errBody.slice(0, 200));
          gptFailed = true;
        }
      } catch(e) {
        console.log('[MBTS] gunghap: GPT 에러:', e.message);
        gptFailed = true;
      }
    } else {
      console.log('[MBTS] gunghap: OPENAI_API_KEY 없음, Claude로 진행');
      gptFailed = true;
    }

    // Claude 폴백
    if (gptFailed && ANTHROPIC_KEY) {
      try {
        console.log('[MBTS] gunghap: Claude 폴백 호출 (claude-sonnet-4-20250514)');
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
          console.log('[MBTS] gunghap: Claude 성공');
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
        } else {
          const errBody = await claudeRes.text().catch(() => '');
          console.log('[MBTS] gunghap: Claude도 실패 (HTTP ' + claudeRes.status + '):', errBody.slice(0, 200));
        }
      } catch(e) {
        console.log('[MBTS] gunghap: Claude 에러:', e.message);
      }
    }

    console.log('[MBTS] gunghap: 모든 AI API 실패');
    return new Response(JSON.stringify({ error: 'All AI APIs failed' }), { status: 500 });

  } catch(e) {
    console.log('[MBTS] gunghap: 요청 처리 에러:', e.message);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export const config = { path: "/api/gunghap-analyze" };
