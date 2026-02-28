import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'
import { logError } from '@/lib/errorLog'

export async function POST(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ') || !validateToken(authHeader.replace('Bearer ', ''))) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  var errors = []
  var created = 0
  var skipped = 0

  try {
    var supabase = getServiceSupabase()

    // 먼저 users 테이블 컬럼 확인
    var { data: testQuery, error: testError } = await supabase
      .from('users')
      .select('*')
      .limit(1)

    if (testError) {
      errors.push({ step: 'table_check', message: testError.message, code: testError.code, details: testError.details })
      return Response.json({ success: false, created: 0, skipped: 0, errors: errors })
    }

    // 테이블 컬럼 정보 기록
    var columns = testQuery && testQuery.length > 0 ? Object.keys(testQuery[0]) : []

    var testUsers = [
      { nickname: '테스트유저1', email: 'test1@test.com', kakao_id: 'test_kakao_1', clover_balance: 50, role: 'user', is_blocked: false },
      { nickname: '테스트유저2', email: 'test2@test.com', kakao_id: 'test_kakao_2', clover_balance: 100, role: 'user', is_blocked: true },
      { nickname: '관리자테스트', email: 'admin@test.com', kakao_id: 'test_kakao_3', clover_balance: 200, role: 'admin', is_blocked: false }
    ]

    for (var i = 0; i < testUsers.length; i++) {
      var user = testUsers[i]

      // 1. 이미 존재하는지 확인
      var { data: existing, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('kakao_id', user.kakao_id)
        .maybeSingle()

      if (checkError) {
        errors.push({
          step: 'check_existing',
          user: user.nickname,
          message: checkError.message,
          code: checkError.code,
          details: checkError.details
        })
        continue
      }

      if (existing) {
        skipped++
        continue
      }

      // 2. 유저 생성 — 컬럼 존재 여부에 따라 insert 데이터 구성
      var insertData = {
        nickname: user.nickname,
        email: user.email,
        kakao_id: user.kakao_id
      }

      // clover_balance 컬럼이 존재하면 추가
      if (columns.length === 0 || columns.indexOf('clover_balance') !== -1) {
        insertData.clover_balance = user.clover_balance
      }
      // role 컬럼이 존재하면 추가
      if (columns.length === 0 || columns.indexOf('role') !== -1) {
        insertData.role = user.role
      }
      // is_blocked 컬럼이 존재하면 추가
      if (columns.length === 0 || columns.indexOf('is_blocked') !== -1) {
        insertData.is_blocked = user.is_blocked
      }

      var { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert(insertData)
        .select('id')
        .single()

      if (insertErr) {
        errors.push({
          step: 'insert_user',
          user: user.nickname,
          message: insertErr.message,
          code: insertErr.code,
          details: insertErr.details,
          insertData: insertData
        })
        continue
      }

      if (!newUser || !newUser.id) {
        errors.push({
          step: 'insert_user',
          user: user.nickname,
          message: 'insert 성공했으나 id가 없음',
          result: newUser
        })
        continue
      }

      // 3. clover_history에 signup_bonus 기록
      var { error: cloverErr } = await supabase
        .from('clover_history')
        .insert({
          user_id: newUser.id,
          type: 'signup_bonus',
          amount: user.clover_balance,
          memo: '테스트 시드 가입 보너스'
        })

      if (cloverErr) {
        errors.push({
          step: 'clover_history',
          user: user.nickname,
          message: cloverErr.message,
          code: cloverErr.code,
          details: cloverErr.details
        })
        // clover_history 실패해도 유저는 생성됨
      }

      created++
    }

    // 4. admin_logs에 기록
    var { error: logErr } = await supabase.from('admin_logs').insert({
      admin_id: null,
      action: '테스트 시드 데이터 생성: ' + created + '명 생성, ' + skipped + '명 스킵'
    })

    if (logErr) {
      errors.push({
        step: 'admin_log',
        message: logErr.message,
        code: logErr.code
      })
    }

    return Response.json({
      success: true,
      created: created,
      skipped: skipped,
      errors: errors,
      debug: {
        columns: columns,
        tableExists: !testError
      }
    })
  } catch (error) {
    logError('admin', error.message, { endpoint: '/api/admin/seed' })
    console.error('[admin/seed] 치명적 에러:', error)
    return Response.json({
      success: false,
      created: created,
      skipped: skipped,
      errors: errors.concat([{ step: 'fatal', message: error.message, stack: error.stack }])
    }, { status: 500 })
  }
}
