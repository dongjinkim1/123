const fs = require('fs');
const lines = fs.readFileSync('c:/Users/김쪨리/Desktop/mbts-app/public/mbts.html','utf8').split('\n');
const line = lines[1749]; // 0-indexed

// Find categories section
let catIdx = line.indexOf('★ categories');
if (catIdx === -1) catIdx = line.indexOf('categories 필드');
if (catIdx === -1) {
  console.log('categories section not found, trying other patterns...');
  catIdx = line.indexOf('"me"');
  if (catIdx === -1) catIdx = line.indexOf('"core"');
}

if (catIdx !== -1) {
  // Show 3000 chars around the categories section
  let start = Math.max(0, catIdx - 200);
  let end = Math.min(line.length, catIdx + 5000);
  console.log('=== CATEGORIES SECTION (offset ' + start + '-' + end + ') ===');
  console.log(line.substring(start, end));
} else {
  console.log('Could not find categories section');
  // Show some key markers
  let markers = ['카테고리', 'categories', 'core', 'weapon', 'weakness'];
  markers.forEach(m => {
    let idx = line.indexOf(m);
    if (idx !== -1) console.log(`Found "${m}" at offset ${idx}`);
  });
}

// Also find 깊이 규칙 section
let depthIdx = line.indexOf('깊이 규칙');
if (depthIdx === -1) depthIdx = line.indexOf('깊이규칙');
if (depthIdx !== -1) {
  let start = Math.max(0, depthIdx - 100);
  let end = Math.min(line.length, depthIdx + 500);
  console.log('\n=== 깊이 규칙 SECTION ===');
  console.log(line.substring(start, end));
}

// Also find JSON example section
let jsonIdx = line.indexOf('"categories":[');
if (jsonIdx === -1) jsonIdx = line.indexOf('"categories": [');
if (jsonIdx !== -1) {
  let start = Math.max(0, jsonIdx - 100);
  let end = Math.min(line.length, jsonIdx + 8000);
  console.log('\n=== JSON EXAMPLE SECTION (offset ' + start + '-' + end + ') ===');
  console.log(line.substring(start, end));
}
