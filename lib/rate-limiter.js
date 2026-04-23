var store = new Map()

export async function checkRateLimit(supabase, identifier, action, windowMs, maxRequests) {
  var key = action + ':' + identifier
  var now = Date.now()
  var windowStart = now - windowMs

  var entries = store.get(key) || []
  entries = entries.filter(function (t) { return t > windowStart })

  if (entries.length >= maxRequests) {
    var oldest = entries[0]
    var retryAfter = Math.ceil((oldest + windowMs - now) / 1000)
    return { allowed: false, retryAfter: retryAfter }
  }

  entries.push(now)
  store.set(key, entries)
  return { allowed: true }
}
