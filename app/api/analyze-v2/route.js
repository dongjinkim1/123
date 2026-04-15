import Anthropic from '@anthropic-ai/sdk'
import { getServiceSupabase } from '@/lib/supabase'
import { waitUntil } from '@vercel/functions'

export const maxDuration = 300

const client = new Anthropic()
const MODEL = 'claude-sonnet-4-6'

// engine.js is CJS — dynamic import at call time
let _engine = null
async function getEngine() {
  if (!_engine) {
    _engine = await import('@/lib/saju-engine.js')
    // CJS default export
    if (_engine.default) _engine = _engine.default
  }
  return _engine
}

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
  console.log('[analyze-v2] request received')

  try {
    const body = await request.json()
    const { y, m, d, h, min, gender, mbtiChoices, mbtiIntensities, cityLng } = body

    // input validation
    if (!y || !m || !d || !mbtiChoices || !Array.isArray(mbtiChoices) || mbtiChoices.length !== 4) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // server-side saju calculation + prompt build
    const engine = await getEngine()
    let capturedPrompts = null

    try {
      await engine.runSajuAnalysis({
        y: +y, m: +m, d: +d,
        h: h ? +h : null, min: min ? +min : null,
        cityLng: cityLng || null,
        gender: gender || '여성',
        mbtiChoices: mbtiChoices,
        mbtiIntensities: mbtiIntensities || [60, 60, 60, 60],
        apiKey: 'server-managed'
      }, {
        onProgress: function() {},
        onPercent: function() {},
        onMessage: function() {},
        onComplete: function() {},
        onError: function() {}
      })
      capturedPrompts = engine.getCapturedPrompts()
    } catch (e) {
      capturedPrompts = engine.getCapturedPrompts()
    }

    if (!capturedPrompts || !capturedPrompts.systemPrompt) {
      return Response.json({ error: 'Prompt build failed' }, { status: 500 })
    }

    console.log('[analyze-v2] prompts captured: sys=%d usr=%d',
      capturedPrompts.systemPrompt.length, capturedPrompts.userPrompt.length)

    // create job
    const jobId = crypto.randomUUID()
    const supabase = getServiceSupabase()
    const inputParams = {
      type: 'saju', y, m, d, h, min,
      gender, mbtiChoices, mbtiIntensities, cityLng
    }

    const { error: dbError } = await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: 'processing',
      params: inputParams,
      updated_at: new Date().toISOString()
    })

    if (dbError) {
      console.error('[analyze-v2] DB insert error:', dbError.message)
      return Response.json({ error: dbError.message }, { status: 500 })
    }

    console.log('[analyze-v2] job created:', jobId)

    // return immediately, process in background
    waitUntil(processJob(jobId, capturedPrompts, inputParams))

    return Response.json({ jobId, status: 'created' })

  } catch (err) {
    console.error('[analyze-v2] error:', err.message)
    return Response.json({ error: err.message || 'unknown' }, { status: 500 })
  }
}

async function processJob(jobId, prompts, inputParams) {
  const supabase = getServiceSupabase()

  try {
    // JSON enforcement (same as job-create)
    const finalSystemPrompt = prompts.systemPrompt +
      '\n\n[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]\n' +
      'This is an API endpoint, NOT a chat. Your output is fed directly into JSON.parse().\n' +
      'Rules:\n' +
      '1. First character of your response MUST be {\n' +
      '2. Last character MUST be }\n' +
      '3. ZERO text before { or after }\n' +
      '4. NO markdown (```), NO comments, NO apologies, NO preamble\n' +
      '5. All string values must use proper JSON escaping (\\n for newlines, \\\\ for backslash, \\" for quotes)\n' +
      '6. Violation = system crash. Comply exactly.'

    console.log('[analyze-v2] calling Claude API for job:', jobId)

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

    console.log('[analyze-v2] Claude done:', fullText.length, 'chars')

    const isComplete = isValidJSON(fullText)
    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
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

    console.log('[analyze-v2] saved:', isComplete ? 'done' : 'partial', fullText.length, 'chars')

  } catch (err) {
    console.error('[analyze-v2] processJob error:', err.message)

    await supabase.from('analysis_jobs').upsert({
      id: jobId,
      type: 'saju',
      status: 'failed',
      params: inputParams,
      error: err.message || 'unknown',
      updated_at: new Date().toISOString()
    }).catch(() => {})
  }
}
