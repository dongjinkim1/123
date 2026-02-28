// import를 app/api/admin/dashboard/route.js와 동일하게 맞춤
import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ') || !validateToken(authHeader.replace('Bearer ', ''))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  var errors = []
  var createdCount = 0
  var skippedCount = 0

  try {
    var supabase = getServiceSupabase()

    // ===== 1. 테스트 유저 5명 =====
    var testUsers = [
      { nickname: '봄날의햇살', email: 'spring@test.mbts.kr', provider: 'kakao', clover_balance: 15 },
      { nickname: '달빛산책자', email: 'moon@test.mbts.kr', provider: 'kakao', clover_balance: 3 },
      { nickname: '바람의여행', email: 'wind@test.mbts.kr', provider: 'test', clover_balance: 47 },
      { nickname: '별빛수집가', email: 'star@test.mbts.kr', provider: 'kakao', clover_balance: 0 },
      { nickname: '구름위의꿈', email: 'cloud@test.mbts.kr', provider: 'test', clover_balance: 8 }
    ]

    var userIds = []

    for (var i = 0; i < testUsers.length; i++) {
      var tu = testUsers[i]
      try {
        // 이미 존재하는지 확인
        var { data: existData } = await supabase
          .from('users')
          .select('id')
          .eq('email', tu.email)
          .maybeSingle()

        if (existData) {
          userIds.push(existData.id)
          skippedCount++
          continue
        }

        // 새로 생성
        var signupDate = new Date(Date.now() - (i * 3 + 1) * 86400000)
        var { data: newUser, error: insertErr } = await supabase
          .from('users')
          .insert({
            nickname: tu.nickname,
            email: tu.email,
            provider: tu.provider,
            clover_balance: tu.clover_balance,
            is_blocked: false,
            created_at: signupDate.toISOString()
          })
          .select('id')
          .single()

        if (insertErr) {
          errors.push({ step: 'users', message: tu.nickname + ': ' + insertErr.message })
        } else if (newUser) {
          userIds.push(newUser.id)
          createdCount++
        }
      } catch (e) {
        errors.push({ step: 'users', message: tu.nickname + ': ' + (e.message || String(e)) })
      }
    }

    // ===== 2. 사주 결과 =====
    var sajuCount = 0
    var mbtiList = ['INTJ', 'ENFP', 'ISTP', 'ESFJ', 'INFP']
    for (var s = 0; s < Math.min(5, userIds.length); s++) {
      try {
        var { error: sErr } = await supabase.from('saju_results').insert({
          user_id: userIds[s],
          birth_year: 1990 + s,
          birth_month: (s % 12) + 1,
          birth_day: (s * 5 % 28) + 1,
          gender: s % 2 === 0 ? '남' : '여',
          mbti_type: mbtiList[s],
          result_summary: mbtiList[s] + ' 사주 분석 (시드)',
          created_at: new Date(Date.now() - s * 2 * 86400000).toISOString()
        })
        if (!sErr) sajuCount++
        else errors.push({ step: 'saju', message: sErr.message })
      } catch (e) {
        errors.push({ step: 'saju', message: e.message || String(e) })
      }
    }

    // ===== 3. 궁합 결과 =====
    var ghCount = 0
    if (userIds.length >= 2) {
      try {
        var { error: gErr } = await supabase.from('gunghap_results').insert({
          user_id: userIds[0],
          partner_name: '달빛산책자',
          relation_type: 'lover',
          total_score: 82,
          result_summary: '연인 궁합 (시드)',
          created_at: new Date().toISOString()
        })
        if (!gErr) ghCount++
        else errors.push({ step: 'gunghap', message: gErr.message })
      } catch (e) {
        errors.push({ step: 'gunghap', message: e.message || String(e) })
      }
    }

    // ===== 4. 클로버 내역 =====
    var cloverCount = 0
    for (var c = 0; c < Math.min(3, userIds.length); c++) {
      try {
        var { error: cErr } = await supabase.from('clover_history').insert({
          user_id: userIds[c],
          amount: c === 0 ? 10 : -1,
          balance_after: c === 0 ? 10 : 9,
          type: c === 0 ? 'charge' : 'saju',
          description: c === 0 ? '충전 (시드)' : '사주 분석 (시드)',
          created_at: new Date(Date.now() - c * 86400000).toISOString()
        })
        if (!cErr) cloverCount++
        else errors.push({ step: 'clover', message: cErr.message })
      } catch (e) {
        errors.push({ step: 'clover', message: e.message || String(e) })
      }
    }

    // ===== 5. 에러 로그 2건 =====
    var errorCount = 0
    try {
      var { error: e1 } = await supabase.from('error_logs').insert({
        category: 'analysis',
        message: 'AI API 타임아웃 (시드)',
        details: '{"test":true}',
        is_resolved: false,
        created_at: new Date().toISOString()
      })
      if (!e1) errorCount++

      var { error: e2 } = await supabase.from('error_logs').insert({
        category: 'payment',
        message: '클로버 차감 실패 (시드)',
        details: '{"test":true}',
        is_resolved: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
      })
      if (!e2) errorCount++
    } catch (e) {
      errors.push({ step: 'error_logs', message: e.message || String(e) })
    }

    // ===== 6. 공지사항 1건 =====
    var noticeCount = 0
    try {
      var { data: existNotice } = await supabase
        .from('notices')
        .select('id')
        .eq('title', '[시드] MBTS 오픈 안내')
        .maybeSingle()

      if (!existNotice) {
        var { error: nErr } = await supabase.from('notices').insert({
          title: '[시드] MBTS 오픈 안내',
          content: 'MBTS가 오픈했습니다! 사주+MBTI 융합분석을 체험해보세요.',
          category: 'notice',
          is_published: true,
          is_popup: true,
          is_pinned: true,
          created_at: new Date().toISOString()
        })
        if (!nErr) noticeCount++
        else errors.push({ step: 'notices', message: nErr.message })
      }
    } catch (e) {
      errors.push({ step: 'notices', message: e.message || String(e) })
    }

    // ===== 7. 방문자 로그 =====
    var visitorCount = 0
    try {
      var { error: vErr } = await supabase.from('visitor_logs').insert([
        { referrer: 'direct', device: 'mobile', page: '/', created_at: new Date().toISOString() },
        { referrer: 'kakao', device: 'mobile', page: '/', created_at: new Date(Date.now() - 86400000).toISOString() },
        { referrer: 'google', device: 'desktop', page: '/', created_at: new Date(Date.now() - 172800000).toISOString() }
      ])
      if (!vErr) visitorCount = 3
    } catch (e) {
      // 방문자 실패는 무시
    }

    // ===== 응답 =====
    return Response.json({
      success: true,
      created: createdCount,
      skipped: skippedCount,
      errors: errors,
      detail: {
        users: createdCount,
        saju_results: sajuCount,
        gunghap_results: ghCount,
        clover_history: cloverCount,
        error_logs: errorCount,
        notices: noticeCount,
        visitor_logs: visitorCount,
        total: createdCount + sajuCount + ghCount + cloverCount + errorCount + noticeCount + visitorCount
      }
    })

  } catch (err) {
    logError('admin', err.message, { endpoint: '/api/admin/seed' })
    console.error('[seed] 전체 오류:', err)
    return Response.json({
      success: false,
      created: 0,
      skipped: 0,
      error: err.message || String(err),
      errors: [{ step: 'global', message: err.message || String(err) }]
    }, { status: 500 })
  }
}
