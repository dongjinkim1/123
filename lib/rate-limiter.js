// lib/rate-limiter.js — Supabase-based rate limiting
'use strict';

async function checkRateLimit(supabase, identifier, action, windowMs, maxRequests) {
  windowMs = windowMs || 60000;
  maxRequests = maxRequests || 3;

  var since = new Date(Date.now() - windowMs).toISOString();

  var { count, error } = await supabase
    .from('rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('identifier', identifier)
    .eq('action', action)
    .gte('created_at', since);

  if (error) {
    // M5: fail-deny — DB error must not open the rate limit.
    // Allow a short retry window so the client surfaces the outage rather than looping silently.
    console.warn('[rate-limit] query error (fail-deny):', error.message);
    return { allowed: false, retryAfter: 10, reason: 'rate_limit_db_error' };
  }

  if (count >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil(windowMs / 1000) };
  }

  var { error: insertErr } = await supabase.from('rate_limits').insert({
    identifier: identifier,
    action: action
  });
  if (insertErr) console.warn('[rate-limit] insert error:', insertErr.message);

  return { allowed: true };
}

module.exports = { checkRateLimit: checkRateLimit };
