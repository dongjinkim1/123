export const metadata = {
  title: "MBTS — 사주×MBTI 운명 분석",
  description: "세상에 같은 풀이는 없습니다. 사주와 MBTI를 융합한 AI 퍼스널 분석",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
