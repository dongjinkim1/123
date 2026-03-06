// prebuild.js — 배포 전 sw.js에 빌드 타임스탬프 주입
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, 'public', 'sw.js');
const timestamp = Date.now().toString(36);

let content = fs.readFileSync(swPath, 'utf8');
content = content.replace("'__BUILD__'", "'" + timestamp + "'");
fs.writeFileSync(swPath, content, 'utf8');

console.log('[prebuild] sw.js 캐시 버전 갱신: mbts-' + timestamp);
