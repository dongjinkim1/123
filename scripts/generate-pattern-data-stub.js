#!/usr/bin/env node
// DEPRECATED: This script has moved to scripts/generate-pattern-data.js
// Run from repo root: node scripts/generate-pattern-data.js
//
// all_patterns_full.txt must NOT be in public/ (web-accessible).
// Move it to: scripts/patterns/all_patterns_full.txt
//
// If you see this error it means the file was not yet physically moved.
// Manual steps required:
//   mkdir -p scripts/patterns
//   mv public/all_patterns_full.txt scripts/patterns/all_patterns_full.txt
//   mv public/generate-pattern-data.js scripts/generate-pattern-data.js

console.error('ERROR: Run from repo root as: node scripts/generate-pattern-data.js');
console.error('Source file must be at: scripts/patterns/all_patterns_full.txt');
process.exit(1);
