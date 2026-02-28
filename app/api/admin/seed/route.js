import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ') || !validateToken(authHeader.replace('Bearer ', ''))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  var result = { users: 0, saju: 0, gunghap: 0, clover: 0, errors: 0, notices: 0, visitors: 0 }
  var seedErrors = []

  try {
    var supabase = getServiceSupabase()
    var now = new Date()

    // ========== 1. Users (5명) ==========
    var testUsers = [
      { nickname: '테스트유저1', email: 'test1@test.com', kakao_id: 'seed_kakao_1', provider: 'kakao', clover_balance: 50, role: 'user', is_blocked: false },
      { nickname: '테스트유저2', email: 'test2@test.com', kakao_id: 'seed_kakao_2', provider: 'kakao', clover_balance: 100, role: 'user', is_blocked: true },
      { nickname: '관리자테스트', email: 'admin@test.com', kakao_id: 'seed_kakao_3', provider: 'kakao', clover_balance: 200, role: 'admin', is_blocked: false },
      { nickname: '게스트유저', email: null, kakao_id: null, provider: 'test', clover_balance: 10, role: 'user', is_blocked: false },
      { nickname: '헤비유저', email: 'heavy@test.com', kakao_id: 'seed_kakao_5', provider: 'kakao', clover_balance: 500, role: 'user', is_blocked: false }
    ]

    var userIds = []

    for (var i = 0; i < testUsers.length; i++) {
      var u = testUsers[i]

      // 이미 존재하면 스킵
      var checkField = u.kakao_id ? 'kakao_id' : 'nickname'
      var checkVal = u.kakao_id || u.nickname
      var { data: existing } = await supabase.from('users').select('id').eq(checkField, checkVal).maybeSingle()

      if (existing) {
        userIds.push(existing.id)
        continue
      }

      var insertData = { nickname: u.nickname, provider: u.provider, clover_balance: u.clover_balance, role: u.role, is_blocked: u.is_blocked }
      if (u.email) insertData.email = u.email
      if (u.kakao_id) insertData.kakao_id = u.kakao_id

      var { data: newUser, error: uErr } = await supabase.from('users').insert(insertData).select('id').single()
      if (uErr) {
        seedErrors.push({ table: 'users', item: u.nickname, msg: uErr.message })
        userIds.push(null)
      } else {
        userIds.push(newUser ? newUser.id : null)
        result.users++
      }
    }

    // 유효한 유저 ID만 필터
    var validIds = []
    for (var vi = 0; vi < userIds.length; vi++) {
      if (userIds[vi]) validIds.push(userIds[vi])
    }

    // ========== 2. Saju Results (8개) ==========
    if (validIds.length > 0) {
      var sajuData = []
      var names = ['김철수', '이영희', '박민수', '최수진', '정동현', '한지연', '오준혁', '윤서윤']
      var mbtis = ['INFP', 'ENTJ', 'ISFJ', 'ENTP', 'INTJ', 'ESFP', 'INTP', 'ENFJ']

      for (var s = 0; s < 8; s++) {
        var uid = validIds[s % validIds.length]
        var birthDate = new Date(1990 + s, s % 12, (s * 3 + 1) % 28 + 1)
        sajuData.push({
          user_id: uid,
          name: names[s],
          birth_date: birthDate.toISOString().slice(0, 10),
          birth_time: ((6 + s * 2) % 24) + ':' + ((s * 15) % 60 < 10 ? '0' : '') + ((s * 15) % 60),
          is_lunar: s % 3 === 0,
          gender: s % 2 === 0 ? 'male' : 'female',
          mbti_result: mbtis[s],
          saju_summary: names[s] + '님의 사주 분석 결과 — 시드 데이터 #' + (s + 1),
          created_at: new Date(now.getTime() - (8 - s) * 86400000).toISOString()
        })
      }

      var { error: sajuErr } = await supabase.from('saju_results').insert(sajuData)
      if (sajuErr) {
        seedErrors.push({ table: 'saju_results', msg: sajuErr.message })
      } else {
        result.saju = 8
      }

      // ========== 3. Gunghap Results (4개) ==========
      var gunghapData = []
      var pairs = [
        { n1: '김철수', n2: '이영희', score: 87 },
        { n1: '박민수', n2: '최수진', score: 72 },
        { n1: '정동현', n2: '한지연', score: 95 },
        { n1: '오준혁', n2: '윤서윤', score: 63 }
      ]

      for (var g = 0; g < 4; g++) {
        var gUid = validIds[g % validIds.length]
        gunghapData.push({
          user_id: gUid,
          person1_name: pairs[g].n1,
          person2_name: pairs[g].n2,
          total_score: pairs[g].score,
          summary: pairs[g].n1 + ' & ' + pairs[g].n2 + ' 궁합 분석 — 시드 데이터',
          created_at: new Date(now.getTime() - (4 - g) * 86400000).toISOString()
        })
      }

      var { error: ghErr } = await supabase.from('gunghap_results').insert(gunghapData)
      if (ghErr) {
        seedErrors.push({ table: 'gunghap_results', msg: ghErr.message })
      } else {
        result.gunghap = 4
      }

      // ========== 4. Clover History (10개) ==========
      var cloverData = []
      var cloverTypes = ['charge', 'saju', 'gunghap', 'chat', 'charge', 'saju', 'charge', 'gunghap', 'saju', 'chat']
      var cloverAmounts = [50, -1, -1, -1, 100, -1, 30, -1, -1, -1]
      var cloverDescs = [
        '클로버 충전 (test) 50잎 / ₩500',
        '사주 분석 이용',
        '궁합 분석 이용',
        'AI 채팅 이용',
        '클로버 충전 (test) 100잎 / ₩1000',
        '사주 분석 이용',
        '클로버 충전 (test) 30잎 / ₩300',
        '궁합 분석 이용',
        '사주 분석 이용',
        'AI 채팅 이용'
      ]

      var runningBalance = 0
      for (var c = 0; c < 10; c++) {
        var cUid = validIds[c % validIds.length]
        runningBalance += cloverAmounts[c]
        if (runningBalance < 0) runningBalance = 0
        cloverData.push({
          user_id: cUid,
          type: cloverTypes[c],
          amount: cloverAmounts[c],
          balance_after: runningBalance,
          description: cloverDescs[c],
          created_at: new Date(now.getTime() - (10 - c) * 3600000).toISOString()
        })
      }

      var { error: clErr } = await supabase.from('clover_history').insert(cloverData)
      if (clErr) {
        seedErrors.push({ table: 'clover_history', msg: clErr.message })
      } else {
        result.clover = 10
      }
    }

    // ========== 5. Error Logs (3개) ==========
    var errorData = [
      { category: 'analysis', message: '[시드] 사주 분석 중 AI 응답 타임아웃', details: JSON.stringify({ endpoint: '/api/saju/stream', timeout: 30000 }), created_at: new Date(now.getTime() - 7200000).toISOString() },
      { category: 'payment', message: '[시드] 클로버 충전 중 결제 검증 실패', details: JSON.stringify({ endpoint: '/api/clover/charge', method: 'toss' }), created_at: new Date(now.getTime() - 5400000).toISOString() },
      { category: 'auth', message: '[시드] 카카오 로그인 토큰 만료', details: JSON.stringify({ endpoint: '/api/auth/login', provider: 'kakao' }), created_at: new Date(now.getTime() - 3600000).toISOString() }
    ]

    var { error: errLogErr } = await supabase.from('error_logs').insert(errorData)
    if (errLogErr) {
      seedErrors.push({ table: 'error_logs', msg: errLogErr.message })
    } else {
      result.errors = 3
    }

    // ========== 6. Notices (2개) ==========
    var noticeData = [
      { title: '[시드] MBTS 서비스 오픈 안내', content: 'MBTS 사주×MBTI 운명 분석 서비스가 정식 오픈되었습니다. 많은 이용 부탁드립니다!', is_published: true, is_popup: true, created_at: new Date(now.getTime() - 172800000).toISOString() },
      { title: '[시드] 시스템 점검 안내', content: '2월 28일 오전 3시~5시 시스템 점검이 예정되어 있습니다.', is_published: true, is_popup: false, created_at: new Date(now.getTime() - 86400000).toISOString() }
    ]

    var { error: noticeErr } = await supabase.from('notices').insert(noticeData)
    if (noticeErr) {
      seedErrors.push({ table: 'notices', msg: noticeErr.message })
    } else {
      result.notices = 2
    }

    // ========== 7. Visitor Logs (7개) ==========
    var visitorData = []
    var pages = ['/', '/saju', '/gunghap', '/chat', '/clover', '/', '/saju']
    var referrers = ['https://google.com', '', 'https://naver.com', '', 'https://google.com', 'direct', '']

    for (var v = 0; v < 7; v++) {
      visitorData.push({
        page: pages[v],
        referrer: referrers[v],
        user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0) Seed/' + (v + 1),
        ip_address: '192.168.1.' + (v + 10),
        created_at: new Date(now.getTime() - (7 - v) * 7200000).toISOString()
      })
    }

    var { error: visitorErr } = await supabase.from('visitor_logs').insert(visitorData)
    if (visitorErr) {
      seedErrors.push({ table: 'visitor_logs', msg: visitorErr.message })
    } else {
      result.visitors = 7
    }

    // admin_logs에 기록
    await supabase.from('admin_logs').insert({
      admin_id: null,
      action: '풍부한 시드 데이터 생성: users=' + result.users + ', saju=' + result.saju + ', gunghap=' + result.gunghap + ', clover=' + result.clover + ', errors=' + result.errors + ', notices=' + result.notices + ', visitors=' + result.visitors
    })

    return Response.json({ success: true, result: result, errors: seedErrors })
  } catch (e) {
    logError('admin', e.message, { endpoint: '/api/admin/seed' })
    console.error('[admin/seed] 에러:', e)
    return Response.json({ success: false, result: result, errors: seedErrors.concat([{ fatal: e.message }]) }, { status: 500 })
  }
}
