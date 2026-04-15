import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

// CJS modules -- dynamic import
let _gp = null
let _ai = null
async function getModules() {
  if (!_gp) {
    const gpMod = await import('@/lib/gunghap-prompt.js')
    _gp = gpMod.default || gpMod
    const aiMod = await import('@/lib/ai-client.js')
    _ai = aiMod.default || aiMod
  }
  return { gp: _gp, ai: _ai }
}

export async function POST(request) {
  console.log('[gunghap-v2] request received')

  try {
    const body = await request.json()
    const { paramsA, paramsB, relType } = body

    if (!paramsA || !paramsB || !relType) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!paramsA.y || !paramsA.m || !paramsA.d || !paramsA.mbtiType) {
      return Response.json({ error: 'Invalid paramsA' }, { status: 400 })
    }
    if (!paramsB.y || !paramsB.m || !paramsB.d || !paramsB.mbtiType) {
      return Response.json({ error: 'Invalid paramsB' }, { status: 400 })
    }

    const { gp, ai } = await getModules()
    const prompts = gp.buildGunghapPrompt(paramsA, paramsB, relType)

    if (!prompts || !prompts.systemPrompt) {
      return Response.json({ error: 'Prompt build failed' }, { status: 500 })
    }

    console.log('[gunghap-v2] prompts built: sys=%d usr=%d',
      prompts.systemPrompt.length, prompts.userPrompt.length)

    const jobId = crypto.randomUUID()
    const supabase = getServiceSupabase()
    const inputParams = { type: 'gunghap', paramsA, paramsB, relType }

    const { error: dbError } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
      status: 'processing',
      params: inputParams,
      updated_at: new Date().toISOString()
    })

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    console.log('[gunghap-v2] job created:', jobId)
    waitUntil(processJob(jobId, prompts, inputParams, ai))

    return Response.json({ jobId, status: 'created' })

  } catch (err) {
    console.error('[gunghap-v2] error:', err.message)
    return Response.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}

async function processJob(jobId, prompts, inputParams, ai) {
  const supabase = getServiceSupabase()

  try {
    const finalSystemPrompt = prompts.systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown, NO comments, NO preamble\n' +
      '5. All string values must use proper JSON escaping\n' +
      '6. Violation = system crash. Comply exactly.'

    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 30000,
      temperature: 0.6,
      system: finalSystemPrompt,
      messages: [{ role: 'user', content: prompts.userPrompt }]
    })

    const finalMessage = await stream.finalMessage()
    const fullText = finalMessage.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('')

    const isComplete = ai.isValidJSON(fullText)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
      status: isComplete ? 'done' : 'partial',
      params: inputParams,
      result: {
        text: fullText,
        length: fullText.length,
        model: finalMessage.model,
        usage: finalMessage.usage
      },
      error: isComplete ? null : 'incomplete_response',
      updated_at: new Date().toISOString()
    })

  } catch (err) {
    console.error('[gunghap-v2] processJob error:', err.message)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'gunghap',
      status: 'failed',
      params: inputParams,
      error: err.message || 'unknown',
      updated_at: new Date().toISOString()
    }).catch(() => {})
  }
}
