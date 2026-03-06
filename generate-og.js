const sharp = require('sharp');
const path = require('path');

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect width="${W}" height="4" fill="#8B6CC1"/>

  <!-- MBTS 로고 -->
  <text x="50%" y="230" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="88">
    <tspan fill="#4CAF7D">M</tspan><tspan fill="#5B8FD4">B</tspan><tspan fill="#E05A5A">T</tspan><tspan fill="#E8B84B">S</tspan>
  </text>

  <!-- 서브타이틀 -->
  <text x="50%" y="310" text-anchor="middle" font-family="Arial,sans-serif" font-weight="600" font-size="28" fill="#444444">My Birth Time Story</text>

  <!-- 슬로건 -->
  <text x="50%" y="380" text-anchor="middle" font-family="Arial,sans-serif" font-weight="400" font-size="22" fill="#666666">사주×MBTI 퍼스널 분석</text>

  <!-- 하단 구분선 -->
  <rect x="550" y="440" width="100" height="1" fill="#E5E5EA"/>

  <!-- 하단 슬로건2 -->
  <text x="50%" y="490" text-anchor="middle" font-family="serif" font-weight="400" font-size="18" fill="#999999">세상에 같은 풀이는 없습니다.</text>

  <!-- URL -->
  <text x="50%" y="570" text-anchor="middle" font-family="Arial,sans-serif" font-weight="400" font-size="16" fill="#AAAAAA">mbts.kr</text>
</svg>
`;

const outputPath = path.join(__dirname, 'public', 'og-image.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(function() {
    console.log('[generate-og] public/og-image.png 생성 완료! (' + W + 'x' + H + ')');
  })
  .catch(function(err) {
    console.error('[generate-og] 생성 실패:', err);
  });
