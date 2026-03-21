import { getServiceSupabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    var { userId } = await request.json()

    if (!userId) {
      return Response.json({ error: 'Missing userId' }, { status: 400 })
    }

    var supabase = getServiceSupabase()

    var { data, error } = await supabase
      .from('users')
      .select('clover_balance, nickname')
      .eq('id', userId)
      .maybeSingle()

    if (error || !data) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    return Response.json({ success: true, balance: data.clover_balance || 0, nickname: data.nickname || '' })
  } catch (err) {
    console.error('[clover-balance] Error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
