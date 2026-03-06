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
    const { kakaoId, nickname, profileImage, email } = await request.json();

    if (!kakaoId) {
      return new Response(JSON.stringify({ error: 'Missing kakaoId' }), {
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

    // 기존 유저 조회
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('kakao_id', kakaoId)
      .maybeSingle();

    if (fetchError) {
      return new Response(JSON.stringify({ error: 'DB query failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (existingUser) {
      // 기존 유저 — 닉네임/프로필 업데이트
      await supabase
        .from('users')
        .update({ nickname: nickname || existingUser.nickname, profile_image: profileImage || existingUser.profile_image })
        .eq('id', existingUser.id);

      return new Response(JSON.stringify({
        success: true,
        isNew: false,
        user: {
          id: existingUser.id,
          kakaoId: kakaoId,
          nickname: nickname || existingUser.nickname,
          profileImage: profileImage || existingUser.profile_image,
          cloverBalance: existingUser.clover_balance || 0,
        },
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    } else {
      // 신규 유저 생성 (클로버 50개 보너스)
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          kakao_id: kakaoId,
          nickname: nickname || '사용자',
          profile_image: profileImage || null,
          email: email || null,
          clover_balance: 50,
          role: 'user',
        })
        .select()
        .single();

      if (insertError || !newUser) {
        return new Response(JSON.stringify({ error: 'User creation failed', detail: insertError?.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      // 가입 보너스 내역 기록
      await supabase.from('clover_history').insert({
        user_id: newUser.id,
        amount: 50,
        balance_after: 50,
        type: 'signup_bonus',
        description: '🎉 가입 축하 보너스',
      });

      console.log('[auth-kakao] New user created:', nickname, 'id:', newUser.id);

      return new Response(JSON.stringify({
        success: true,
        isNew: true,
        user: {
          id: newUser.id,
          kakaoId: kakaoId,
          nickname: nickname || '사용자',
          profileImage: profileImage || null,
          cloverBalance: 50,
        },
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
};

export const config = { path: '/api/auth-kakao' };
