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
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const { referrerId, newUserId } = await request.json();

    if (!referrerId || !newUserId) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // 자기 자신 추천 방지
    if (referrerId === newUserId) {
      return new Response(JSON.stringify({ error: 'Self referral' }), {
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

    // 추천인 존재 확인 + 잔액 조회
    const { data: referrer, error: fetchError } = await supabase
      .from('users')
      .select('id, clover_balance, nickname')
      .eq('id', referrerId)
      .maybeSingle();

    if (fetchError || !referrer) {
      return new Response(JSON.stringify({ error: 'Referrer not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // 추천인에게 클로버 2잎 지급
    const REWARD = 2;
    const newBalance = (referrer.clover_balance || 0) + REWARD;

    const { error: updateError } = await supabase
      .from('users')
      .update({ clover_balance: newBalance })
      .eq('id', referrerId);

    if (updateError) {
      return new Response(JSON.stringify({ error: 'Failed to reward referrer' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    // 내역 기록
    await supabase.from('clover_history').insert({
      user_id: referrerId,
      amount: REWARD,
      balance_after: newBalance,
      type: 'referral',
      description: '🎁 친구 초대 보상',
    });

    console.log('[referral] ' + referrerId + ' rewarded ' + REWARD + ' clovers');

    return new Response(JSON.stringify({ success: true, reward: REWARD }), {
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

export const config = { path: '/api/referral-reward' };
