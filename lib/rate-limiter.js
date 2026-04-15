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
    console.warn('[rate-limit] query error:', error.message);
    return { allowed: true };
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
