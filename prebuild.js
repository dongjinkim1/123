// prebuild.js — 배포 전 sw.js에 빌드 타임스탬프 주입
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, 'public', 'sw.js');

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const timestamp = now.getFullYear()
  + pad(now.getMonth() + 1)
  + pad(now.getDate())
  + '_'
  + pad(now.getHours())
  + pad(now.getMinutes());

let content = fs.readFileSync(swPath, 'utf8');
content = content.replace(/BUILD_TIME\s*=\s*'[^']*'/, "BUILD_TIME = '" + timestamp + "'");
fs.writeFileSync(swPath, content, 'utf8');

console.log('[prebuild] sw.js BUILD_TIME 갱신: ' + timestamp);
