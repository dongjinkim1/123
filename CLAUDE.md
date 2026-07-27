# CLAUDE.md — MBTS 프로젝트 규칙

## 절대 규칙

> **2026-07-27 개정 — 동진 지시로 파일 수정 금지 전면 해제.**
> 기존의 `engine.js`·`saju.js` 동결 조항은 폐지됐다. 레포 전 파일 수정 가능.
> 단 아래 운영 수칙은 유지된다.

- **push 금지** — 로컬 커밋까지만. push(=Vercel 자동배포)는 **동진 승인 후**에만
- `_archive/engine_OLD.js` 보존 — 롤백용 백업이므로 수정하지 말 것
- `public/js/bundle.js` 직접 편집 금지 — `prebuild.js`가 `public/js/main-*.js`를 concat해
  생성하는 **산출물**이다. 소스를 고치고 `node prebuild.js`로 재생성할 것
- 한 번에 한 파일만 수정 (커밋도 한 파일 = 한 커밋)
- 요청하지 않은 파일 수정 금지 / 요청 범위 밖 리팩터·정리 금지
- 새 파일 생성 금지 (명시적 요청 시만)

## 배포 규칙
- 모든 커밋 시 sw.js의 BUILD_TIME을 현재 시각으로 갱신 — `.git/hooks/pre-commit`이 자동 처리
- 형식: var BUILD_TIME = 'YYYYMMDD_HHMM';
- `npm run build`는 `prebuild.js` 선행 → BUILD_TIME 주입 + lib→public 프롬프트 동기화 + bundle.js 재생성

## 파일 구조
- index.html: 메인 UI + 렌더링
- engine.js: AI 프롬프트 + 스트리밍 파서
- saju.js: 사주 보강 데이터 (2026-07-27 이전 동결 대상이었으나 해제됨)
- service.js: 무료 동물 서비스
- gunghap.js: 궁합 분석
- chatting.js: 달토 채팅
- sw.js: 서비스 워커 (BUILD_TIME만 갱신)

## 작업 방식
- 수정 전 현재 코드 반드시 확인
- 수정 후 변경 파일 목록만 보여주기
- git commit 메시지는 한글로
