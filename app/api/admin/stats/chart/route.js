import { validateToken } from '@/lib/adminAuth'
import { getServiceSupabase } from '@/lib/supabase'

function authCheck(request) {
  var authHeader = request.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  return validateToken(authHeader.replace('Bearer ', ''))
}

export async function GET(request) {
  if (!authCheck(request)) {
    return Response.json({ error: '인증 필요' }, { status: 401 })
  }

  var url = new URL(request.url)
  var metric = url.searchParams.get('metric') || 'saju'
  var from = url.searchParams.get('from')
  var to = url.searchParams.get('to')

  if (!from || !to) {
    return Response.json({ error: 'from, to 필요' }, { status: 400 })
  }

  try {
    var supabase = getServiceSupabase()

    var fromDate = new Date(from + 'T00:00:00')
    var toDate = new Date(to + 'T23:59:59')
    var toNextDay = new Date(toDate.getTime() + 1000)
    var fromISO = fromDate.toISOString()
    var toISO = toNextDay.toISOString()

    // 안전한 쿼리 헬퍼
    var safeQuery = async function(table, columns, filter) {
      try {
        var q = supabase.from(table).select(columns)
        if (filter) q = filter(q)
        var result = await q
        if (result.error) return []
        return result.data || []
      } catch (e) { return [] }
    }

    // 날짜 목록 생성 (from ~ to)
    var dayList = []
    var cursor = new Date(fromDate)
    while (cursor <= toDate) {
      dayList.push(cursor.toISOString().slice(0, 10))
      cursor.setDate(cursor.getDate() + 1)
    }

    var labels = []
    var values = []

    if (metric === 'users' || metric === 'visitors') {
      // 방문자 = 사주+궁합+채팅 유니크 유저
      var results = await Promise.all([
        safeQuery('saju_results', 'created_at, user_id', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) }),
        safeQuery('gunghap_results', 'created_at, user_id', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) }),
        safeQuery('chat_sessions', 'created_at, user_id', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      ])
      var sajuData = results[0]
      var gunghapData = results[1]
      var chatData = results[2]

      for (var i = 0; i < dayList.length; i++) {
        var d = dayList[i]
        var visitors = {}
        for (var s1 = 0; s1 < sajuData.length; s1++) {
          if (sajuData[s1].created_at && sajuData[s1].created_at.slice(0, 10) === d && sajuData[s1].user_id) visitors[sajuData[s1].user_id] = true
        }
        for (var g1 = 0; g1 < gunghapData.length; g1++) {
          if (gunghapData[g1].created_at && gunghapData[g1].created_at.slice(0, 10) === d && gunghapData[g1].user_id) visitors[gunghapData[g1].user_id] = true
        }
        for (var c1 = 0; c1 < chatData.length; c1++) {
          if (chatData[c1].created_at && chatData[c1].created_at.slice(0, 10) === d && chatData[c1].user_id) visitors[chatData[c1].user_id] = true
        }
        labels.push(d.slice(5))
        values.push(Object.keys(visitors).length)
      }

    } else if (metric === 'signups') {
      var signupData = await safeQuery('users', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i2 = 0; i2 < dayList.length; i2++) {
        var d2 = dayList[i2]
        var count = 0
        for (var s2 = 0; s2 < signupData.length; s2++) {
          if (signupData[s2].created_at && signupData[s2].created_at.slice(0, 10) === d2) count++
        }
        labels.push(d2.slice(5))
        values.push(count)
      }

    } else if (metric === 'saju') {
      var sajuData2 = await safeQuery('saju_results', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i3 = 0; i3 < dayList.length; i3++) {
        var d3 = dayList[i3]
        var count3 = 0
        for (var s3 = 0; s3 < sajuData2.length; s3++) {
          if (sajuData2[s3].created_at && sajuData2[s3].created_at.slice(0, 10) === d3) count3++
        }
        labels.push(d3.slice(5))
        values.push(count3)
      }

    } else if (metric === 'gunghap') {
      var ghData = await safeQuery('gunghap_results', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i4 = 0; i4 < dayList.length; i4++) {
        var d4 = dayList[i4]
        var count4 = 0
        for (var g4 = 0; g4 < ghData.length; g4++) {
          if (ghData[g4].created_at && ghData[g4].created_at.slice(0, 10) === d4) count4++
        }
        labels.push(d4.slice(5))
        values.push(count4)
      }

    } else if (metric === 'chat') {
      var chatData2 = await safeQuery('chat_sessions', 'created_at, user_id', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i5 = 0; i5 < dayList.length; i5++) {
        var d5 = dayList[i5]
        var count5 = 0
        for (var c5 = 0; c5 < chatData2.length; c5++) {
          if (chatData2[c5].created_at && chatData2[c5].created_at.slice(0, 10) === d5) count5++
        }
        labels.push(d5.slice(5))
        values.push(count5)
      }

    } else if (metric === 'totalAnalysis') {
      var taResults = await Promise.all([
        safeQuery('saju_results', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) }),
        safeQuery('gunghap_results', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      ])
      var taSaju = taResults[0]
      var taGunghap = taResults[1]
      for (var i6 = 0; i6 < dayList.length; i6++) {
        var d6 = dayList[i6]
        var count6 = 0
        for (var ts = 0; ts < taSaju.length; ts++) {
          if (taSaju[ts].created_at && taSaju[ts].created_at.slice(0, 10) === d6) count6++
        }
        for (var tg = 0; tg < taGunghap.length; tg++) {
          if (taGunghap[tg].created_at && taGunghap[tg].created_at.slice(0, 10) === d6) count6++
        }
        labels.push(d6.slice(5))
        values.push(count6)
      }

    } else if (metric === 'cloverGiven') {
      var cloverData2 = await safeQuery('clover_history', 'created_at, amount', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i8 = 0; i8 < dayList.length; i8++) {
        var d8 = dayList[i8]
        var given = 0
        for (var cg = 0; cg < cloverData2.length; cg++) {
          if (cloverData2[cg].created_at && cloverData2[cg].created_at.slice(0, 10) === d8 && cloverData2[cg].amount > 0) given += cloverData2[cg].amount
        }
        labels.push(d8.slice(5))
        values.push(given)
      }

    } else if (metric === 'cloverUsed') {
      var cloverData3 = await safeQuery('clover_history', 'created_at, amount', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i9 = 0; i9 < dayList.length; i9++) {
        var d9 = dayList[i9]
        var used = 0
        for (var cu = 0; cu < cloverData3.length; cu++) {
          if (cloverData3[cu].created_at && cloverData3[cu].created_at.slice(0, 10) === d9 && cloverData3[cu].amount < 0) used += Math.abs(cloverData3[cu].amount)
        }
        labels.push(d9.slice(5))
        values.push(used)
      }

    } else if (metric === 'errors') {
      var errData = await safeQuery('error_logs', 'created_at', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO) })
      for (var i10 = 0; i10 < dayList.length; i10++) {
        var d10 = dayList[i10]
        var errCount = 0
        for (var ec = 0; ec < errData.length; ec++) {
          if (errData[ec].created_at && errData[ec].created_at.slice(0, 10) === d10) errCount++
        }
        labels.push(d10.slice(5))
        values.push(errCount)
      }

    } else if (metric === 'errorsUnresolved') {
      var errData2 = await safeQuery('error_logs', 'created_at, resolved', function(q) { return q.gte('created_at', fromISO).lt('created_at', toISO).eq('resolved', false) })
      for (var i11 = 0; i11 < dayList.length; i11++) {
        var d11 = dayList[i11]
        var errCount2 = 0
        for (var eu = 0; eu < errData2.length; eu++) {
          if (errData2[eu].created_at && errData2[eu].created_at.slice(0, 10) === d11) errCount2++
        }
        labels.push(d11.slice(5))
        values.push(errCount2)
      }

    } else {
      return Response.json({ error: '알 수 없는 metric: ' + metric }, { status: 400 })
    }

    return Response.json({ labels: labels, values: values, metric: metric })
  } catch (e) {
    console.error('[stats/chart] 에러:', e)
    return Response.json({ error: e.message }, { status: 500 })
  }
}
