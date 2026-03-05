// netlify/functions/chat.mjs
// 달토 채팅 — OpenAI gpt-5.2 우선 → 실패 시 Anthropic claude-sonnet 폴백

export default async (req, context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    const body = await req.json();
    const { systemPrompt, messages } = body;

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    // 1차: OpenAI gpt-5.2
    if (OPENAI_API_KEY) {
      try {
        console.log('[chat] OpenAI gpt-5.2 시도...');

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-5.2',
            max_completion_tokens: 1000,
            stream: true,
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages
            ]
          })
        });

        if (openaiRes.ok) {
          console.log('[chat] OpenAI gpt-5.2 성공 ✅');

          const { readable, writable } = new TransformStream({
            transform(chunk, controller) {
              const text = new TextDecoder().decode(chunk);
              const lines = text.split('\n');
              for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const jsonStr = line.substring(6).trim();
                if (jsonStr === '[DONE]') continue;
                try {
                  const evt = JSON.parse(jsonStr);
                  const content = evt.choices?.[0]?.delta?.content;
                  if (content) {
                    const converted = {
                      type: 'content_block_delta',
                      delta: { type: 'text_delta', text: content }
                    };
                    controller.enqueue(
                      new TextEncoder().encode(`data: ${JSON.stringify(converted)}\n\n`)
                    );
                  }
                } catch (e) {}
              }
            }
          });

          openaiRes.body.pipeTo(writable).catch(() => {});

          return new Response(readable, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
              'Access-Control-Allow-Origin': '*',
              'X-Accel-Buffering': 'no',
            }
          });
        }

        const errText = await openaiRes.text();
        console.warn('[chat] OpenAI gpt-5.2 실패:', openaiRes.status, errText.substring(0, 150));

      } catch (openaiErr) {
        console.warn('[chat] OpenAI 오류, 폴백 진행:', openaiErr.message);
      }
    }

    // 2차 폴백: Anthropic claude-sonnet
    console.log('[chat] Anthropic claude-sonnet 폴백 시도...');

    if (!ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key 없음' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        stream: true,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('[chat] Anthropic 폴백도 실패:', anthropicRes.status);
      return new Response(JSON.stringify({ error: errText }), {
        status: anthropicRes.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('[chat] Anthropic 폴백 성공 ✅');
    return new Response(anthropicRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
      }
    });

  } catch (err) {
    console.error('[chat] 치명적 오류:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = { path: '/api/chat' };
