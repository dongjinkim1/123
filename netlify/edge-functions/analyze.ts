export default async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('', {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }

  try {
    const body = await req.json();
    const { systemPrompt, userPrompt, model } = body;

    if (!systemPrompt || !userPrompt) {
      return new Response('Missing required fields', { status: 400 });
    }

    const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_KEY) {
      return new Response('API key not configured', { status: 500 });
    }

    const modelMap: Record<string, string> = {
      'claude-sonnet-4-6': 'claude-sonnet-4-20250514',
      'claude-sonnet-4-20250514': 'claude-sonnet-4-20250514'
    };
    const claudeModel = modelMap[model] || model || 'claude-sonnet-4-20250514';

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: claudeModel,
        max_tokens: 16384,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      return new Response(err, { status: claudeRes.status });
    }

    return new Response(claudeRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch(e) {
    return new Response(e.message, { status: 500 });
  }
};

export const config = { path: "/api/analyze" };
