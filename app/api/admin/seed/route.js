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
      try {
        var tu = testUsers[i]
        var existing = await supabase
          .from('users')
          .select('id')
          .eq('email', tu.email)
          .maybeSingle()

        if (existing.data) {
          userIds.push(existing.data.id)
          skippedCount++
          continue
        }

        var now = new Date()
        var signupDate = new Date(now.getTime() - (i * 3 + 1) * 86400000)

        var insertRes = await supabase.from('users').insert({
          nickname: tu.nickname,
          email: tu.email,
          provider: tu.provider,
          clover_balance: tu.clover_balance,
          is_blocked: false,
          created_at: signupDate.toISOString()
        }).select('id').single()

        if (insertRes.error) {
          errors.push({ step: 'users', message: tu.nickname + ': ' + insertRes.error.message })
        } else {
          userIds.push(insertRes.data.id)
          createdCount++
        }
      } catch (e) {
        errors.push({ step: 'users', message: testUsers[i].nickname + ': ' + e.message })
      }
    }

    // ===== 2. 사주 결과 (유저가 있을 때만) =====
    var sajuCount = 0
    if (userIds.length > 0) {
      var mbtiTypes = ['INTJ', 'ENFP', 'ISTP', 'ESFJ', 'INFP']
      for (var s = 0; s < Math.min(5, userIds.length); s++) {
        try {
          var sDate = new Date(Date.now() - s * 2 * 86400000)
          var sRes = await supabase.from('saju_results').insert({
            user_id: userIds[s],
            birth_year: 1990 + s,
            birth_month: (s % 12) + 1,
            birth_day: (s * 5 % 28) + 1,
            gender: s % 2 === 0 ? '남' : '여',
            mbti_type: mbtiTypes[s],
            result_summary: mbtiTypes[s] + ' 사주 분석 (테스트)',
            created_at: sDate.toISOString()
          })
          if (!sRes.error) sajuCount++
          else errors.push({ step: 'saju', message: sRes.error.message })
        } catch (e) {
          errors.push({ step: 'saju', message: e.message })
        }
      }
    }

    // ===== 3. 궁합 결과 =====
    var ghCount = 0
    if (userIds.length >= 2) {
      var rels = ['lover', 'friend']
      for (var g = 0; g < 2; g++) {
        try {
          var gDate = new Date(Date.now() - g * 3 * 86400000)
          var gRes = await supabase.from('gunghap_results').insert({
            user_id: userIds[g],
            partner_name: testUsers[(g + 1) % testUsers.length].nickname,
            relation_type: rels[g],
            total_score: 72 + g * 10,
            result_summary: rels[g] + ' 궁합 분석 (테스트)',
            created_at: gDate.toISOString()
          })
          if (!gRes.error) ghCount++
          else errors.push({ step: 'gunghap', message: gRes.error.message })
        } catch (e) {
          errors.push({ step: 'gunghap', message: e.message })
        }
      }
    }

    // ===== 4. 클로버 내역 =====
    var cloverCount = 0
    if (userIds.length > 0) {
      var cloverData = [
        { amount: 10, type: 'charge', description: '클로버 충전 (테스트)' },
        { amount: -1, type: 'saju', description: '사주 분석' },
        { amount: -1, type: 'gunghap', description: '궁합 분석' },
        { amount: 50, type: 'charge', description: '클로버 충전 (테스트)' },
        { amount: -1, type: 'chat', description: '달토 채팅' }
      ]
      for (var c = 0; c < cloverData.length; c++) {
        try {
          var cDate = new Date(Date.now() - c * 86400000)
          var cRes = await supabase.from('clover_history').insert({
            user_id: userIds[c % userIds.length],
            amount: cloverData[c].amount,
            balance_after: cloverData[c].amount > 0 ? cloverData[c].amount : 0,
            type: cloverData[c].type,
            description: cloverData[c].description,
            created_at: cDate.toISOString()
          })
          if (!cRes.error) cloverCount++
          else errors.push({ step: 'clover', message: cRes.error.message })
        } catch (e) {
          errors.push({ step: 'clover', message: e.message })
        }
      }
    }

    // ===== 5. 에러 로그 2건 =====
    var errorCount = 0
    try {
      var e1 = await supabase.from('error_logs').insert({
        category: 'analysis',
        message: 'AI API 타임아웃 (테스트)',
        details: JSON.stringify({ endpoint: '/api/analysis', test: true }),
        is_resolved: false,
        created_at: new Date().toISOString()
      })
      if (!e1.error) errorCount++

      var e2 = await supabase.from('error_logs').insert({
        category: 'payment',
        message: '클로버 차감 실패 (테스트)',
        details: JSON.stringify({ endpoint: '/api/clover/use', test: true }),
        is_resolved: true,
        created_at: new Date(Date.now() - 86400000).toISOString()
      })
      if (!e2.error) errorCount++
    } catch (e) {
      errors.push({ step: 'error_logs', message: e.message })
    }

    // ===== 6. 공지사항 1건 =====
    var noticeCount = 0
    try {
      var existNotice = await supabase
        .from('notices')
        .select('id')
        .eq('title', '[테스트] MBTS 오픈 안내')
        .maybeSingle()

      if (!existNotice.data) {
        var nRes = await supabase.from('notices').insert({
          title: '[테스트] MBTS 오픈 안내',
          content: 'MBTS가 오픈했습니다! 사주+MBTI 융합분석을 체험해보세요.',
          category: 'notice',
          is_published: true,
          is_popup: true,
          is_pinned: true,
          created_at: new Date().toISOString()
        })
        if (!nRes.error) noticeCount++
        else errors.push({ step: 'notices', message: nRes.error.message })
      }
    } catch (e) {
      errors.push({ step: 'notices', message: e.message })
    }

    // ===== 7. 방문자 로그 3건 =====
    var visitorCount = 0
    try {
      var visitors = [
        { referrer: 'direct', device: 'mobile' },
        { referrer: 'kakao', device: 'mobile' },
        { referrer: 'google', device: 'desktop' }
      ]
      for (var v = 0; v < visitors.length; v++) {
        var vDate = new Date(Date.now() - v * 86400000)
        var vRes = await supabase.from('visitor_logs').insert({
          referrer: visitors[v].referrer,
          device: visitors[v].device,
          page: '/',
          created_at: vDate.toISOString()
        })
        if (!vRes.error) visitorCount++
      }
    } catch (e) {
      // visitor_logs 실패해도 무시
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
      error: err.message,
      errors: [{ step: 'global', message: err.message }]
    }, { status: 500 })
  }
}
