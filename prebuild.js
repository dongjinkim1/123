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

// JS bundle — concat main JS files into single bundle
const jsDir = path.join(__dirname, 'public', 'js');
const bundleFiles = [
  'main-nav.js',
  'main-gunghap.js',
  'main-results.js',
  'main-init.js'
];

let bundle = '// MBTS Bundle — ' + timestamp + '\n';
let totalLines = 0;
for (const file of bundleFiles) {
  const filePath = path.join(jsDir, file);
  if (fs.existsSync(filePath)) {
    const src = fs.readFileSync(filePath, 'utf8');
    const lines = src.split('\n').length;
    totalLines += lines;
    bundle += '\n// ═══ ' + file + ' (' + lines + 'L) ═══\n' + src + '\n';
  }
}

const bundlePath = path.join(jsDir, 'bundle.js');
fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log('[prebuild] js/bundle.js 생성: ' + bundleFiles.length + '개 파일, ' + totalLines + '줄');
