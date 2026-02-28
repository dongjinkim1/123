import { getServiceSupabase } from '@/lib/supabase'

export async function GET(request) {
  try {
    var url = new URL(request.url)
    var userId = url.searchParams.get('userId')

    if (!userId) {
      return Response.json({ valid: false })
    }

    var supabase = getServiceSupabase()
    var { data: user, error } = await supabase
      .from('users')
      .select('nickname, clover_balance, role, is_blocked')
      .eq('id', userId)
      .maybeSingle()

    if (error || !user || user.is_blocked) {
      return Response.json({ valid: false })
    }

    return Response.json({
      valid: true,
      nickname: user.nickname,
      clover_balance: user.clover_balance,
      role: user.role || 'user'
    })

  } catch (e) {
    console.error('[auth/session] 에러:', e)
    return Response.json({ valid: false })
  }
}
