export async function POST(request) {
  return Response.json({ ok: true, time: Date.now() });
}

export async function GET(request) {
  return Response.json({ ok: true, time: Date.now() });
}
