import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

function isValidJSON(text) {
  if (!text || text.length < 100) return false
  try {
    const cleaned = text.replace(/```json|```/g, '').trim()
    let target = cleaned
    const fb = cleaned.indexOf('{')
    const lb = cleaned.lastIndexOf('}')
    if (fb >= 0 && lb > fb) target = cleaned.substring(fb, lb + 1)
    const obj = JSON.parse(target)
    return !!(obj && obj.categories && obj.categories.length > 0)
  } catch (e) {
    return false
  }
}

export async function POST(request) {
  console.log('[job-create] 요청 시작')
  let jobId = null
  let inputParams = null
  let type = 'saju'

  try {
    const body = await request.json()
    const { systemPrompt, userPrompt, model } = body
    jobId = body.jobId || null
    inputParams = body.inputParams || null
    type = (inputParams && inputParams.type) || body.type || 'saju'

    if (!jobId || !systemPrompt || !userPrompt) {
      return Response.json(
        { error: 'jobId, systemPrompt, userPrompt가 필요합니다.' },
        { status: 400 }
      )
    }

    const supabase = getServiceSupabase()

    // processing 마킹
    try {
      await supabase.from('analysis_jobs').upsert({
        id: jobId,
        type: type,
        status: 'processing',
        params: inputParams || {},
        updated_at: new Date().toISOString()
      })
    } catch (e) {
      console.warn('[job-create] processing 마킹 실패:', e.message)
    }

    // ★ analyze/route.js와 동일한 JSON 강제 보강
    const finalSystemPrompt = systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character of your response MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown (```), NO comments, NO apologies, NO preamble\n' +
      '5. All string values must use proper JSON escaping (\\n for newlines, \\\\ for backslash, \\" for quotes)\n' +
      '6. Violation = system crash. Comply exactly.'

    const useModel = model || MODEL
    console.log(`[job-create] 모델: ${useModel}, jobId: ${jobId}`)

    // Anthropic 스트리밍 호출 (SDK 제약: max_tokens 큰 경우 stream 필요)
    const stream = client.messages.stream({
      model: useModel,
      max_tokens: 30000,
      temperature: 0.6,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })

    const finalMessage = await stream.finalMessage()
    const fullText = finalMessage.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    console.log('[job-create] Anthropic 완료:', fullText.length, '자')

    // 결과 저장 (analyze와 동일한 isValidJSON 검증)
    const isComplete = isValidJSON(fullText)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: type,
      status: isComplete ? 'done' : 'partial',
      params: inputParams || {},
      result: { text: fullText, length: fullText.length, model: finalMessage.model, usage: finalMessage.usage },
      error: isComplete ? null : 'incomplete_response',
      updated_at: new Date().toISOString()
    })

    console.log('[job-create] Supabase 저장 완료 (' + (isComplete ? 'done' : 'partial') + ', ' + fullText.length + '자)')

    return Response.json({ status: isComplete ? 'done' : 'partial', jobId: jobId })

  } catch (err) {
    console.error('[job-create] 에러:', err.message)

    if (jobId) {
      try {
        const supabase = getServiceSupabase()
        await supabase.from('analysis_jobs').upsert({
          id: jobId,
          type: type,
          status: 'failed',
          params: inputParams || {},
          error: err.message || 'unknown',
          updated_at: new Date().toISOString()
        })
      } catch (e) {}
    }

    if (err.status === 529 || (err.error && err.error.type === 'overloaded_error')) {
      return Response.json({ status: 'failed', error: 'overloaded_error' }, { status: 529 })
    }

    return Response.json({ status: 'failed', error: err.message || 'unknown' }, { status: 500 })
  }
}
