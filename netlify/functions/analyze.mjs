// netlify/functions/analyze.mjs
// OpenAI gpt-5.2 우선 → 실패 시 Anthropic claude-sonnet 폴백
// engine.js가 Anthropic SSE 형식을 기대하므로 OpenAI 응답도 그 형식으로 변환
// engine.js는 절대 수정하지 않음

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
    const { systemPrompt, userPrompt } = body;
    // body.model 은 engine.js가 보내는 값이지만 무시함
    // 서버에서 gpt-5.2 → claude-sonnet 순서로 자체 결정

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

    // ══════════════════════════════════════════
    // 1차: OpenAI gpt-5.2
    // ══════════════════════════════════════════
    if (OPENAI_API_KEY) {
      try {
        console.log('[analyze] OpenAI gpt-5.2 시도...');

        const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-5.2',
            max_completion_tokens: 4000,
            stream: true,
            response_format: { type: 'json_object' },
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user',   content: userPrompt   }
            ]
          })
        });

        if (openaiRes.ok) {
          console.log('[analyze] OpenAI gpt-5.2 성공 ✅');

          // OpenAI SSE → Anthropic SSE 형식 변환
          // engine.js가 {"type":"content_block_delta","delta":{"text":"..."}} 를 기대함
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
        console.warn('[analyze] OpenAI gpt-5.2 실패:', openaiRes.status, errText.substring(0, 150));

      } catch (openaiErr) {
        console.warn('[analyze] OpenAI 오류, 폴백 진행:', openaiErr.message);
      }
    }

    // ══════════════════════════════════════════
    // 2차 폴백: Anthropic claude-sonnet
    // ══════════════════════════════════════════
    console.log('[analyze] Anthropic claude-sonnet 폴백 시도...');

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
        max_tokens: 4000,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('[analyze] Anthropic 폴백도 실패:', anthropicRes.status);
      return new Response(JSON.stringify({ error: errText }), {
        status: anthropicRes.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('[analyze] Anthropic 폴백 성공 ✅');
    // Anthropic은 이미 engine.js가 기대하는 형식 → 그대로 파이프
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
    console.error('[analyze] 치명적 오류:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = { path: '/api/analyze' };
