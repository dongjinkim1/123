# CLAUDE.md — MBTS 프로젝트 규칙

## 절대 규칙
- engine.js 절대 수정 금지
- saju.js 절대 수정 금지
- 한 번에 한 파일만 수정
- 요청하지 않은 파일 수정 금지
- 새 파일 생성 금지 (명시적 요청 시만)

## 배포 규칙
- 모든 커밋 시 sw.js의 BUILD_TIME을 현재 시각으로 자동 갱신할 것
- 형식: var BUILD_TIME = 'YYYYMMDD_HHMM';

## 파일 구조
- index.html: 메인 UI + 렌더링
- engine.js: AI 프롬프트 + 스트리밍 파서 (수정 금지)
- saju.js: 사주 보강 데이터 (수정 금지)
- service.js: 무료 동물 서비스
- gunghap.js: 궁합 분석
- chatting.js: 달토 채팅
- sw.js: 서비스 워커 (BUILD_TIME만 갱신)

## 작업 방식
- 수정 전 현재 코드 반드시 확인
- 수정 후 변경 파일 목록만 보여주기
- git commit 메시지는 한글로
