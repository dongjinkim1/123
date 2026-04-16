// lib/pattern-matcher.js — pattern matching engine (NEW, per MBTS 최종 공식)
// Philosophy: "유저한테 맞는 게 왕, 우리 등급은 참고"
//
// This module is the authoritative matching engine. pattern-data.js still exports
// its legacy matchPatterns/buildPatternPrompt for backward compat (window.* in the
// browser), but all SERVER-side prompt construction now flows through this file.
'use strict';

var patternData = require('./pattern-data');
var MBTS_PATTERNS = patternData.MBTS_PATTERNS;

// ══════════════════════════════════════════════
// Constants (per spec)
// ══════════════════════════════════════════════

var TIER_BONUS = { S: 1.5, A: 1.3, B: 1.1, C: 1.0 };
var PRECISION_BONUS = { 1: 0.6, 2: 0.8 }; // 3+ defaults to 1.0
var GENERIC_RELEVANCE = 20;
var DEFAULT_IMPACT = 3;
var TIER_ORDER = { S: 4, A: 3, B: 2, C: 1 };

// ══════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════

// Generic tags (uses:*, ref:*) have no discriminative power and are excluded from
// relevance calculations.
function isSpecificTag(tag) {
  if (typeof tag !== 'string') return false;
  return tag.indexOf('uses:') !== 0 && tag.indexOf('ref:') !== 0;
}

// Tag classification helper — splits a pattern's tags into specific vs generic.
function classifyTags(tags) {
  var specific = [];
  if (!tags) return specific;
  for (var i = 0; i < tags.length; i++) {
    if (isSpecificTag(tags[i])) specific.push(tags[i]);
  }
  return specific;
}

// ══════════════════════════════════════════════
// scorePattern — finalScore per spec
// ══════════════════════════════════════════════
//
// Returns:
//   -1  if pattern is TRASH (must be excluded)
//    0  if specific-tagged pattern has zero overlap (fails prerequisite)
//   >0  otherwise — finalScore = relevance × (1 + impact × tierBonus × 0.1)
function scorePattern(p, userSet) {
  if (!p) return 0;
  if (p.tier === 'TRASH') return -1;

  var impact = (typeof p.impact === 'number' && p.impact > 0) ? p.impact : DEFAULT_IMPACT;
  var tierBonus = TIER_BONUS[p.tier] || 1.0;

  var specificTags = classifyTags(p.tags);
  var relevance;

  if (specificTags.length === 0) {
    // Generic pattern — fixed relevance
    relevance = GENERIC_RELEVANCE;
  } else {
    var overlap = 0;
    for (var j = 0; j < specificTags.length; j++) {
      if (userSet[specificTags[j]]) overlap++;
    }
    if (overlap === 0) return 0;

    var rawRelevance = (overlap / specificTags.length) * 100;
    var precision = PRECISION_BONUS[specificTags.length] || 1.0;
    relevance = rawRelevance * precision;
  }

  return relevance * (1 + impact * tierBonus * 0.1);
}

// ══════════════════════════════════════════════
// matchPatterns — finalScore-sorted top N for a subject
// ══════════════════════════════════════════════
//
// Returns: Array<{ pattern, score, source }>
//   score  = finalScore from scorePattern
//   source = 'subject' (primary match) | 'generic' (fallback fill)
//
// Fallback: if the subject yields < limit patterns, fill from GENERIC patterns
// in the SAME category only — never invade other subjects' patterns.
function matchPatterns(category, subject, userTags, limit) {
  limit = limit || 5;

  var userSet = {};
  if (userTags) {
    for (var i = 0; i < userTags.length; i++) {
      if (isSpecificTag(userTags[i])) userSet[userTags[i]] = true;
    }
  }

  var results = [];

  // Primary pass: the requested subject
  if (MBTS_PATTERNS[category] && MBTS_PATTERNS[category][subject]) {
    var list = MBTS_PATTERNS[category][subject];
    for (var pi = 0; pi < list.length; pi++) {
      var p = list[pi];
      var s = scorePattern(p, userSet);
      if (s > 0) results.push({ pattern: p, score: s, source: 'subject' });
    }
  }

  // Sort by finalScore (spec tiebreaker: tier → impact)
  results.sort(compareMatchResults);

  // Dedupe by id (defensive — shouldn't happen in single subject, but guard)
  results = dedupeById(results);

  // Fallback: if fewer than `limit`, fill from generic patterns in same category.
  // "다른 소주제 패턴 침범 안 함" — we only pull GENERIC (zero specific tags) patterns.
  if (results.length < limit && MBTS_PATTERNS[category]) {
    var genericPool = [];
    var subs = Object.keys(MBTS_PATTERNS[category]);
    var seen = {};
    for (var ri = 0; ri < results.length; ri++) seen[results[ri].pattern.id] = true;

    for (var si = 0; si < subs.length; si++) {
      var pats = MBTS_PATTERNS[category][subs[si]];
      for (var xi = 0; xi < pats.length; xi++) {
        var gp = pats[xi];
        if (seen[gp.id]) continue;
        if (classifyTags(gp.tags).length !== 0) continue; // generic only
        var gs = scorePattern(gp, userSet);
        if (gs > 0) genericPool.push({ pattern: gp, score: gs, source: 'generic' });
      }
    }
    genericPool.sort(compareMatchResults);
    while (results.length < limit && genericPool.length > 0) {
      results.push(genericPool.shift());
    }
  }

  return results.slice(0, limit);
}

// Comparator implementing spec tiebreakers: finalScore → tier → impact
function compareMatchResults(a, b) {
  if (b.score !== a.score) return b.score - a.score;
  var tierDiff = (TIER_ORDER[b.pattern.tier] || 0) - (TIER_ORDER[a.pattern.tier] || 0);
  if (tierDiff !== 0) return tierDiff;
  var ai = (typeof a.pattern.impact === 'number') ? a.pattern.impact : DEFAULT_IMPACT;
  var bi = (typeof b.pattern.impact === 'number') ? b.pattern.impact : DEFAULT_IMPACT;
  return bi - ai;
}

function dedupeById(results) {
  var seen = {};
  var out = [];
  for (var i = 0; i < results.length; i++) {
    var id = results[i].pattern.id;
    if (seen[id]) continue;
    seen[id] = true;
    out.push(results[i]);
  }
  return out;
}

// ══════════════════════════════════════════════
// buildPatternPrompt — top 3 per subject (per spec) with optional debug scores
// ══════════════════════════════════════════════
//
// options.showScores — include (score: N) alongside each pattern name (debug)
// options.limit      — patterns per subject (default 3 per spec)
function buildPatternPrompt(category, userTags, options) {
  options = options || {};
  var perSubject = options.limit || 3;
  var showScores = !!options.showScores;

  if (!MBTS_PATTERNS[category]) return '';

  var sections = [];
  var subs = Object.keys(MBTS_PATTERNS[category]);

  for (var si = 0; si < subs.length; si++) {
    var sub = subs[si];
    var matched = matchPatterns(category, sub, userTags, perSubject);
    if (matched.length === 0) continue;

    var lines = [];
    lines.push('### [' + sub + '] (' + matched.length + '개)');
    for (var p = 0; p < matched.length; p++) {
      var pat = matched[p].pattern;
      var scoreTag = showScores ? ' (score: ' + Math.round(matched[p].score) + ')' : '';
      lines.push('- ' + pat.name + scoreTag);
      if (pat.saju) lines.push('  사주조건: ' + pat.saju);
      if (pat.mbti) lines.push('  MBTI조건: ' + pat.mbti);
    }
    sections.push(lines.join('\n'));
  }

  return sections.join('\n\n');
}

// ══════════════════════════════════════════════
// Exports
// ══════════════════════════════════════════════
module.exports = {
  // Primary API
  matchPatterns: matchPatterns,
  buildPatternPrompt: buildPatternPrompt,
  scorePattern: scorePattern,

  // Helpers (exposed for tests)
  isSpecificTag: isSpecificTag,
  classifyTags: classifyTags,

  // Constants (exposed for tests)
  TIER_BONUS: TIER_BONUS,
  PRECISION_BONUS: PRECISION_BONUS,
  GENERIC_RELEVANCE: GENERIC_RELEVANCE,
  DEFAULT_IMPACT: DEFAULT_IMPACT,

  // Re-export for convenience
  MBTS_PATTERNS: MBTS_PATTERNS,
  buildUserTags: patternData.buildUserTags
};
