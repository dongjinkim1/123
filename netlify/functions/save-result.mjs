// netlify/functions/save-result.mjs
export default async (req, context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }
    });
  }
  try {
    const body = await req.json();
    const { type, userId, data } = body;

    const SUPABASE_URL = process.env.SUPABASE_URL || 'https://amexswkqohkhypywuscp.supabase.co';
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZXhzd2txb2hraHlweXd1c2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTk1NTYsImV4cCI6MjA4NjUzNTU1Nn0.FIhu_kqvdagDuf3ljzsp0-llJJlBfvacpBDIGn__Plw';

    const tableName = type === 'saju' ? 'saju_results' : 'gunghap_results';
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${tableName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({ user_id: userId || null, data: data, created_at: new Date().toISOString() })
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ success: false, error: errText }), {
        status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const result = await res.json();
    return new Response(JSON.stringify({ success: true, id: result[0]?.id || null }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const config = { path: '/api/save-result' };
