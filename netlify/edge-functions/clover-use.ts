import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export default async (request: Request) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { userId, amount, type } = await request.json();

    if (!userId || !amount || !type) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. 최신 잔액 조회
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('clover_balance')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError || !user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const balance = user.clover_balance || 0;

    if (balance < amount) {
      return new Response(JSON.stringify({ error: 'Insufficient clover', balance }), {
        status: 402,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const newBalance = balance - amount;

    // 2. 잔액 차감
    const { error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', userId);

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Failed to update balance' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // 3. 내역 기록
    const labels: Record<string, string> = { saju: '사주', gunghap: '궁합', chat: '달토 채팅' };
    const { error: historyError } = await supabase.from('clover_history').insert({
      user_id: userId,
      amount: -amount,
      balance_after: newBalance,
      type: type,
      description: (labels[type] || '서비스') + ' 분석',
    });
    if (historyError) {
      console.error('[clover-use] history insert error:', historyError);
    }

    return new Response(JSON.stringify({ success: true, balance: newBalance }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const config = { path: '/api/clover-use' };
