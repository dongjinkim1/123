export default async function handler(req) {
  console.log('[MBTS] /api/analyze 호출됨');

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

    // GPT 먼저 (스트리밍 OFF — 전체 응답 한번에)
    if (OPENAI_KEY) {
      try {
        console.log('[MBTS] analyze: GPT 호출 시도 (gpt-5.2)');
        const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_KEY
          },
          body: JSON.stringify({
            model: 'gpt-5.2',
            max_completion_tokens: 4096,
            stream: false,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ]
          })
        });

        if (gptRes.ok) {
          const data = await gptRes.json();
          const text = data.choices[0].message.content;
          console.log('[MBTS] analyze: GPT 성공, 길이:', text.length);
          return new Response(text, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        } else {
          const errBody = await gptRes.text().catch(() => '');
          console.log('[MBTS] analyze: GPT 실패 (HTTP ' + gptRes.status + '):', errBody.slice(0, 300));
        }
      } catch(e) {
        console.log('[MBTS] analyze: GPT 에러:', e.message);
      }
    }

    // Claude 폴백 (스트리밍 OFF)
    if (ANTHROPIC_KEY) {
      try {
        console.log('[MBTS] analyze: Claude 폴백 호출');
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
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }]
          })
        });

        if (claudeRes.ok) {
          const data = await claudeRes.json();
          const text = data.content[0].text;
          console.log('[MBTS] analyze: Claude 성공, 길이:', text.length);
          return new Response(text, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        } else {
          const errBody = await claudeRes.text().catch(() => '');
          console.log('[MBTS] analyze: Claude도 실패:', errBody.slice(0, 300));
        }
      } catch(e) {
        console.log('[MBTS] analyze: Claude 에러:', e.message);
      }
    }

    return new Response(JSON.stringify({ error: 'All AI APIs failed' }), { status: 500 });
  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}

export const config = { path: "/api/analyze" };
