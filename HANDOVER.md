# MBTS 프로젝트 인수인계서

> 새 AI 세션 / Claude Code 가 프로젝트에 막 들어왔을 때 **5분 안에 구조를 잡기 위한 문서**.
> 작성일: 2026-04-17 · 대상 독자: 다음에 이 프로젝트를 열 AI (또는 사람)

---

## 0. 30초 요약

- **서비스**: 사주 × MBTI × AI 융합 분석 (30대 여성 타겟, SNS 감성)
- **스택**: Next.js 16 (App Router) + React 19 + 순수 HTML/JS 정적 프런트 (`public/` 하이브리드)
- **AI**: Anthropic Claude `claude-sonnet-4-6`, 서버에서 스트리밍 호출 (max_tokens 30000)
- **DB**: Supabase (analysis_jobs / saju_results / gunghap_results / users / 클로버 …)
- **로그인**: Kakao OAuth + Supabase 세션
- **결제**: "클로버" 자체 포인트 시스템
- **배포**: Vercel (maxDuration 300s)

**프론트는 `public/` 에 통짜 정적 파일 (index.html + 여러 .js)** 로 되어 있고, Next.js 의 역할은
주로 **`/app/api/*` 백엔드 라우트 + `/` 를 `/index.html` 로 rewrite** 하는 것.

---

## 1. 금지 / 절대 규칙 (먼저 읽을 것)

`CLAUDE.md` 에 있는 규칙을 **무조건** 따라야 함.

| 규칙 | 내용 |
|---|---|
| 수정 금지 | `public/engine.js` · `public/saju.js` — 한 글자도 건들지 말 것 |
| 한 번에 한 파일 | 동시에 여러 파일 수정 금지 |
| 요청 외 파일 금지 | 사용자가 지정하지 않은 파일은 건드리지 말 것 |
| 새 파일 금지 | 명시적 요청 시에만 파일 생성 |
| sw.js BUILD_TIME | 배포 때마다 `var BUILD_TIME = 'YYYYMMDD_HHMM';` 갱신 (자동화: `prebuild.js`) |
| 커밋 메시지 | 한글 |
| **대형 파일 주의** | `public/js/bundle.js` (6K+줄) · `app/api/analyze-v2/route.js` 같은 큰 파일은 **Edit 도구 대신 Node atomic script**로 수정. Edit tool 에 truncation 버그 있음 (이전에 14줄/200줄 단위로 잘린 사고 2회). 수정 후 반드시 `node -c` + `npm run build` 둘 다 통과 확인 |

**Opus 대화 규칙 (사용자 요청)**: Claude Code 에게 명령 내리기 전에 **반드시 사용자와 먼저
토론해서 방향성 합의 → 허락 → 실행** 순서. 토론 없는 선제 실행 금지.

---

## 1.5. 🚨 현재 살아있는 TEST BYPASS (임시!)

**`nickname === '김동진'` 유저는 클로버 무제한.** 4군데 서버 코드에 하드코딩:

| 파일 | 동작 |
|---|---|
| `app/api/clover-use/route.js` | 차감 건너뛰고 balance 999 반환 |
| `app/api/clover-balance/route.js` | 항상 balance 999 반환 |
| `app/api/analyze-v2/route.js` | 잔액 15 미만 체크 면제 |
| `app/api/gunghap-v2/route.js` | 잔액 15 미만 체크 면제 |

⚠️ **악용 가능**: 유저가 프로필에서 닉네임을 '김동진'으로 변경 가능하면 무제한 획득.

**테스트 완료 후 반드시 제거:**
```bash
grep -rn "TEST BYPASS" app/api
# → 4군데 블록 전부 제거
```

---

## 1.8. 2026-04-14 ~ 2026-04-17 최근 주요 수정 (aef5a3f까지)

### Bug 1: 분석 2번 실행 (모바일 더블탭 race)
- `public/js/bundle.js`: `_isAnalyzing = true` 를 useClover 호출 **직전** 동기 설정 (기존엔 async 콜백 안에서 설정돼 race)
- `public/index.html:1474`: 모바일 더블탭 가드 `targets` 배열에 `'mbtiGoNext'` 추가
- `window._MBTS_activePollTimer` 싱글톤 → 동시 폴러 방지

### Bug 2: 사주 14개 중 일부 소주제 누락
- **서버**: `app/api/analyze-v2/route.js` 의 sub 검출 로직이 `lastIndexOf('{"h"', nmPos)` 우선 역탐색으로 카테고리 경계의 `{"id":...}` 건너뜀. `]}` 잔재도 trim.
- **클라**: `bundle.js` + `main-results.js` 의 done catchup 을 **h-기반 Set (`window._renderedSubTitles`)** 으로 교체 — 인덱스 기반 비교가 서버 누락 sub 있을 때 중복 append 유발하던 문제 해결.

### Bug 3: sync.js `"input_data column not found"` 에러
- 기존: 브라우저의 anon Supabase 클라로 `saju_results` 직접 insert → 프로젝트 A (`amexsw...`) 의 스키마에는 `input_data` 컬럼 없어서 400
- 수정: `POST /api/save-result` 경유 → 서버 service role 로 프로젝트 B 접근 → 정상 동작

### Bug 4: 궁합 `"Invalid paramsA"` 400
- `finishAddPerson` 의 `extraData` 에 `_birthInfo` + `gender` 포함
- **`pickPerson` / `pickPersonById` 에서도 `_birthInfo` + `gender` 전파** (초기엔 누락돼서 반쪽 fix였음)
- `_ghParamsA/B` 구성 시 mbtiType 화이트리스트 ('사주분석' 같은 값 → 'INFJ' 기본값)
- `startRealAnalysis` 성공 시 `window._lastBirthInfo` + `window._lastGender` 세팅 (나 → pickPerson 경로)

### 유료 데이터 유출 차단 (CRITICAL 이었음)
- `public/all_patterns_full.txt` (1.5MB, 841 패턴 원문) → `scripts/patterns/` 로 이동
- `public/generate-pattern-data.js` → deprecation stub (scripts/ 로 이사 메시지만)
- `.gitignore` 에 `/scripts/patterns/`, `/public/all_patterns_full.txt` 추가
- 이전에는 `https://mbts.kr/all_patterns_full.txt` 로 누구나 다운로드 가능했음

### OAuth 보안 강화
- `public/login.js doKakaoLogin`: state 난수 생성 + sessionStorage 저장 (CSRF 방어)
- `public/auth/kakao/callback/index.html`: state null-bypass 엄격화 (`!savedState || returnedState !== savedState`). 이전엔 savedState 가 null 이면 검증 스킵돼서 CSRF silent bypass 가능했음.
- callback/index.html 에 **추천인 리워드 직접 발화** 코드 추가 (기존엔 onLoginSuccess 우회해서 카카오 로그인 유저는 추천 보상 못 받음)
- `doLogout`: sessionStorage, mbts_referrer, mbts_history, mbts_gh_history, mbts_active_job, mbts_lastResult, mbts_chat_me, mbts_chat_count 까지 정리

### next.config.mjs 보안 헤더 추가
- HSTS (63072000, includeSubDomains, preload)
- CSP (Supabase / Kakao / Anthropic / GA 화이트리스트)
- X-Frame-Options: DENY, X-Content-Type-Options: nosniff
- Referrer-Policy, Permissions-Policy
- `/api/*` Cache-Control: no-store

### 서버 API 하드닝
- `app/api/chat/route.js`: `MAX_SYSTEM_CHARS` 40000 → **10000** (비용 DoS 완화)
- `app/api/visitor/track`: rate limit **100/hour per IP** 추가 (table flood 방지)
- `app/api/log-error`: rate limit **10/min per IP** + 429 응답
- `app/api/clover-charge`: **optimistic concurrency** (`.eq('clover_balance', currentBalance)`) + 1회 재시도 — C8 race condition 완화
- `app/api/clover/use`, `clover/charge` 중첩 라우트 → **410 Gone** (기존엔 인증 없이 무제한 충전 가능했음 CRITICAL)

### 패턴 매칭 엔진 v2 (`lib/pattern-matcher.js` 신규)
- "유저한테 맞는 게 왕, 우리 등급은 참고" 공식
- `finalScore = relevance × (1 + impact × tierBonus × 0.1)`
- TIER_BONUS { S: 1.5, A: 1.3, B: 1.1, C: 1.0 }
- PRECISION_BONUS { 1: 0.6, 2: 0.8, 3+: 1.0 }
- GENERIC_RELEVANCE = 20 (uses:/ref: 만으로 구성된 범용 패턴)
- TRASH 티어 제외
- 동점 처리: score → tier (S>A>B>C) → impact
- `lib/prompt-builder-usr.js` 가 소주제별 top 3 주입

### saju.js 서버 이식 (`lib/saju-theory-server.js` 신규)
- `public/saju.js` (클라 14개 보강 로직) 서버 포팅
- 공망(`gongmangText`) 만 주석 처리 (spec)
- `lib/prompt-builder.js` 가 `SJ_enrichSajuData` + `SJ_injectIntoPrompt` 호출

### netlify 완전 삭제
- `netlify.toml` + `netlify/edge-functions/*` (8개) + `netlify/functions/*` (1개) 전부 제거
- Vercel 단일 배포로 통일
- 과거엔 netlify.toml 이 edge-functions 를 선언하지만 실제 파일이 빈 스텁이라 drift 상태였음

### 🚨 배포 사고 복구 (aef5a3f)
- `a5f32c5` 커밋에서 `app/api/analyze-v2/route.js` 가 **Edit 도구 truncation 으로 파일 끝 14줄 손실** → Vercel SWC/turbopack 파서가 `Unexpected token <eof>` 에러로 **5개 커밋 연속 빌드 실패**
- 그 사이 production 은 구버전 (`0f2b3df`, 김동진 바이패스만) 서빙 → 유저는 Bug 1~4 fix 효과 못 봄
- `aef5a3f` 에서 14줄 복구 → 밀렸던 fix 일괄 배포 성공
- **교훈**: `node -c` 는 EOF 미닫힘 객체 리터럴 놓침. **배포 전 반드시 `npm run build` (turbopack)** 실행.

---

## 2. 폴더 구조 한눈에

```
mbts-app/
├── app/                          # Next.js App Router
│   ├── layout.js                 # 최소 루트 레이아웃 ("MBTS — 사주×MBTI 운명 분석")
│   ├── globals.css
│   └── api/                      # 백엔드 라우트 (36개)
│       ├── analyze/              # 사주 AI 분석 (스트리밍)
│       ├── gunghap-analyze/      # 궁합 AI 분석 (스트리밍)
│       ├── chat/                 # 달토 채팅 (스트리밍)
│       ├── job-create/           # 비동기 Job 생성 (백그라운드 Anthropic 호출)
│       ├── job-status/           # Job 폴링 (복구용)
│       ├── save-result/          # 결과 영속화
│       ├── analyze-v2/ gunghap-v2/   # 구버전/실험 라우트
│       ├── auth/login  auth/session  auth-kakao/  kakao-token/
│       ├── clover/{charge,use,history}  + clover-balance clover-charge clover-use
│       ├── admin/{analytics,auth,clover,dashboard,errors,notices,seed,stats,users}
│       ├── referral-reward/  my-results/  notice/popup/  visitor/track/
│       └── log-error/  test-ping/
│
├── public/                       # 실제 유저가 보는 정적 프런트 (이게 메인)
│   ├── index.html                # 메인 UI (1487줄, SPA 형태)
│   ├── engine.js                 # ★ 사주 엔진 + 75유형 데이터 + AI 프롬프트 (5422줄, 금지)
│   ├── saju.js                   # ★ SJ_ 접두사 프롬프트 보강 모듈 (2291줄, 금지)
│   ├── service.js                # 무료 동물 서비스 플로우 (1183줄)
│   ├── gunghap.js                # 궁합 18레이어 엔진 + UI (1465줄)
│   ├── chatting.js               # 달토 채팅 UI (1527줄)
│   ├── sw.js                     # 서비스 워커 (BUILD_TIME 포함)
│   ├── login.js  payment.js  sync.js  fortune.js  fortune-target.js
│   ├── mbts-logic.js             # MBTS 75종 판정 로직
│   ├── mbts_points.js            # MBTS 포인트 텍스트 (1.1MB — 대용량)
│   ├── saju-theory.js mbti-theory.js  # 이론 데이터 (각 400KB+)
│   ├── animal_data.js animal_match.js
│   ├── pattern-data.js           # 패턴 텍스트 (750KB)
│   ├── fortune_data.js  lunar.js
│   ├── admin.html                # 관리자 페이지 (136KB)
│   ├── MBTS_v7_FINAL.md          # 75종 원본 텍스트
│   ├── js/
│   │   ├── bundle.js             # ← prebuild.js 가 main-*.js 들을 합친 결과
│   │   ├── main-nav.js           # 네비게이션 / 페이지 전환
│   │   ├── main-gunghap.js       # 궁합 진입/렌더
│   │   ├── main-results.js       # 결과 렌더링
│   │   ├── main-init.js          # 공유 링크 감지, Job 복구, 프로필 시트
│   │   ├── components/ pages/ legacy/
│   ├── css/styles.css
│   ├── animals/  animals-icon/  icons/  nav-icon/  auth/
│   └── manifest.json  robots.txt  og-image.png
│
├── lib/                          # 서버 전용 라이브러리 (Next.js API 에서 import)
│   ├── index.js                  # 통합 re-export (backward compat)
│   ├── ai-client.js              # Anthropic 응답 JSON 파서 (4단계 fallback)
│   ├── supabase.js               # browser anon + server service_role 클라이언트
│   ├── prompt-builder.js         # buildSajuPrompt() — 사주 프롬프트 조립
│   ├── prompt-builder-usr.js     # user prompt 빌더 (20KB)
│   ├── prompt-system.js          # PREMIUM_SYSTEM / GUNGHAP_SYSTEM 시스템 프롬프트
│   ├── gunghap-prompt.js         # 궁합 프롬프트 (48KB)
│   ├── chat-engine.js            # 달토 채팅 프롬프트 조립
│   ├── saju-core.js              # calcSajuForApp() — 만세력 계산
│   ├── saju-analysis.js          # 격국/대운/관계/공망 분석
│   ├── saju-data.js              # 천간·지지·지장간 데이터 (124KB)
│   ├── saju-theory-server.js     # SJ_ 모듈 서버 포트 (102KB)
│   ├── mbti-data.js              # TY / DM_AX / 16유형 데이터
│   ├── animal-data.js            # 75동물 데이터
│   ├── pattern-data.js pattern-matcher.js  # 패턴 매칭 (pattern-data 766KB)
│   ├── fallback.js fallback-items.js fallback-items2.js  # AI 실패 시 대체 텍스트
│   ├── validators.js             # postValidateAI() — AI 응답 검증
│   ├── rate-limiter.js           # Supabase 기반 rate limit
│   ├── errorLog.js               # 서버 에러 로그 → Supabase
│   └── adminAuth.js              # 관리자 인증
│
├── tests/                        # node tests/*.test.js
├── scripts/                      # 운영 스크립트 (e2e, pattern 생성, 궁합 테스트 등)
├── prebuild.js                   # ★ build 전 훅 (sw.js BUILD_TIME + bundle.js 생성)
├── next.config.mjs               # rewrite / CSP / HSTS 헤더
├── package.json                  # next 16.1.6, react 19.2.3, @anthropic-ai/sdk 0.74
├── CLAUDE.md                     # 금지/배포 규칙 (프로젝트 정책)
├── README.md
└── .env.local                    # 시크릿 (커밋 금지)
```

---

## 3. 메인 플로우 (사용자 → AI 결과)

```
[Browser]
  index.html  (SPA 페이지 스위칭: pgHome → pgBirth → pgMBTI → pgLoading → pgRes)
     │
     │ 스크립트 로드 순서 (대략):
     │   gtag → @supabase/supabase-js CDN → kakao SDK
     │   → engine.js (계산/데이터/프롬프트 상수)
     │   → saju.js (SJ_ 보강 데이터 IIFE 등록)
     │   → service.js / gunghap.js / chatting.js
     │   → /js/bundle.js (main-nav + main-gunghap + main-results + main-init)
     │
     │ 1) 사용자가 생년월일/시/성별/도시경도 + MBTI 4축 선호/강도 입력
     │ 2) engine.js 의 만세력으로 사주 계산 → mbtiObj / gg(격국) / dw(대운) 생성
     │ 3) engine.js + saju.js 의 프롬프트 빌더로 systemPrompt / userPrompt 조립
     │ 4) /api/job-create 에 POST { jobId, systemPrompt, userPrompt, inputParams }
     │    localStorage["mbts_active_job"] 에 jobId/createdAt/type 저장
     │
     ▼
[Next.js API]   app/api/job-create/route.js
     │ ① Supabase `analysis_jobs` 에 status='processing' upsert
     │ ② systemPrompt 뒤에 [CRITICAL MACHINE-TO-MACHINE INSTRUCTION] 강제 JSON 지시 append
     │ ③ Anthropic SDK (claude-sonnet-4-6, max_tokens=30000, temp=0.6) 스트리밍 호출
     │ ④ finalMessage() 로 전체 텍스트 집계
     │ ⑤ isValidJSON(fullText) 검사 → 'done' | 'partial'
     │ ⑥ Supabase `analysis_jobs` 에 result.text 저장 + status 업데이트
     │
     ▼
[Browser]  (스트리밍 수신 경로 OR 복구 경로)
     │
     │ (스트리밍 경로) /api/analyze 를 SSE 로 받아 UI 에 실시간 렌더
     │    — 같은 로직이지만 stream:true 로 event-stream 반환, 실패 시 Supabase 에 보험 저장
     │
     │ (복구 경로) main-init.js 의 recoverJob() 이
     │    localStorage.mbts_active_job 을 읽어 /api/job-status?id=... 폴링 (3s, 최대 5분)
     │    status='done' → handleResult() → parseAI() → renderResult() → go('pgRes')
     │
     │ 3) lib/ai-client.js 의 parseAIResponse() 4단계 fallback 으로 JSON 파싱
     │    (direct → slice{..} → control char 제거 → bracket repair)
     │
     │ 4) 렌더 후 /api/save-result 로 영속화
     │    saju_results (name, input, saju, mbtiObj, aiResult)
     │    gunghap_results (personA, personB, relType, scores, aiResult)
     │
     ▼
[Share / Retention]
   공유 링크 ?s=<code> 감지 → MBTSShare.load(sc) → MBTSShare.render(data)
   (main-init.js 첫 IIFE)
```

### 궁합 플로우 차이
- 엔드포인트: `/api/gunghap-analyze` (max_tokens 16000)
- 클라 엔진: `public/gunghap.js` 가 18레이어 점수(천간교차·지지충합·오행보완·MBTI·대운 등) 선계산 후
  그 요약을 AI 프롬프트에 넣어 호출.

### 달토 채팅 플로우
- 엔드포인트: `/api/chat` (max_tokens 4000, sweet / fire 모드)
- 입력 제한: 메시지 40개 / 각 8000자 / systemPrompt 10000자
- Rate limit: 30 req/min (userId 있으면 userId, 없으면 `x-vercel-forwarded-for`)
- UUID 형식 userId 만 허용.

---

## 4. AI 프롬프트 / 스트리밍 구조

### 시스템 프롬프트 2개
- `lib/prompt-system.js` → `PREMIUM_SYSTEM` (사주 분석), `GUNGHAP_SYSTEM` (궁합)
- 둘 다 본문에 사주 전문용어 노출 금지 규칙이 들어 있음.
  그래서 `saju.js` / `lib/saju-theory-server.js` 의 `SJ_TERM_MAP` 이
  "식상생재 → 표현→재물 연결" 처럼 자연어 변환해서 주입.

### JSON 강제 스펙 (analyze / gunghap-analyze / job-create 공통)
```
[CRITICAL MACHINE-TO-MACHINE INSTRUCTION]
1. First character of your response MUST be {
2. Last character MUST be }
3. ZERO text before { or after }
4. NO markdown, NO comments, NO apologies, NO preamble
5. All string values must use proper JSON escaping
6. Violation = system crash. Comply exactly.
```
이 문장이 systemPrompt 끝에 강제로 붙음. 혹시 이 규칙 바꾸려면 세 라우트 모두 수정해야 함.

### 스트리밍 SSE 포맷
```
data: {"type":"content_block_delta","delta":{"text":"..."}}
data: {"type":"message_stop", ...}
data: [DONE]
```
프런트는 `content_block_delta.delta.text` 만 누적.

### JSON 파서 (`lib/ai-client.js` · `main-init.js` 내 `parseAI`)
4단계 fallback:
1. 원본 그대로 `JSON.parse`
2. 첫 `{` ~ 마지막 `}` 슬라이스
3. 제어문자(`\x00-\x1F\x7F`, 개행/탭 제외) 제거
4. `{ [` 개수 카운트해서 닫는 괄호 채우고 trailing comma 제거
모두 실패 시 `null` — 프런트는 "결과를 읽지 못했어요 😢" 토스트.

---

## 5. MBTS 75종 데이터 구조

### 5.1 75종이 만들어지는 공식
```
오행(5) × 십성(5) × 조건(3: 신강/신약/특수) = 75
```
- 오행: `목 화 토 금 수` (engine.js `OHENG_DATA`)
- 십성: `비겁 식상 재성 관성 인성` (engine.js `SIPSUNG_DATA`)
- 조건: 사주 강약 판정 + 특수 케이스

### 5.2 데이터가 사는 위치 (중복이 좀 있음)
| 위치 | 용도 |
|---|---|
| `public/engine.js` 내 `ANIMALS` | **클라 계산용 정본** (동물명/모드 3종/태그/traits/rx) |
| `public/mbts_points.js` (1.1MB) | 유형별 포인트 설명 텍스트 |
| `public/MBTS_v7_FINAL.md` (68KB) | 75유형 마스터 원고 |
| `MBTS_전체75종_최종본 (1).md` (93KB · 루트) | 더 오래된 원고 |
| `public/animal_data.js` · `animal_match.js` | 동물 이미지 매핑 + 잘맞는동물 매칭 |
| `lib/animal-data.js` | 서버 사이드 미러 |

### 5.3 동물 → 파일명 매핑 (`service.js` 의 `AN_MAP`)
```
늑대=Wf 여우=Fo 다람쥐=Sq 사슴=De 고양이=Ca 사자=Li 공작새=Pk
벌=Be 독수리=Eg 올빼미=Ow 곰=Br 수달=Ot 소=Ox 코끼리=El 거북이=Tu
치타=Ch 앵무새=Pa 악어=Cr 시바견=Sb 문어=Oc 상어=Sk 돌고래=Do
비버=Bv 고래=Wh 해파리=Jf
오행 매핑: 목=Wo 화=Fi 토=Ea 금=Me 수=Wa
조건 매핑: 신강=S 신약=W 특수=X
```
이미지 파일명 예: `public/animals/Wo_Wf_S.png` (목_늑대_신강)

---

## 6. Supabase 테이블 (코드에서 유추)

| 테이블 | 주요 컬럼 | 용도 |
|---|---|---|
| `analysis_jobs` | id, type, status('processing'\|'done'\|'partial'\|'failed'), params, result, error, partial_subs, progress, created_at, updated_at | 비동기 AI Job |
| `saju_results` | id, user_id, name, input_data, saju_data, mbti_data, ai_result | 사주 결과 영속화 |
| `gunghap_results` | id, user_id, person_a, person_b, rel_type, scores, ai_result | 궁합 결과 영속화 |
| (users / clover 충전·사용·이력 / rate_limits / errors / notices / visitors …) | — | 관리자/결제/운영 계열 |

**params 에 `userId` 가 있으면 `job-status` GET 시 소유자 검증** (다른 사람 결과 조회 차단).
응답 시 `params` 는 생년월일 PII 라서 **프런트에 돌려주지 않음**.

---

## 7. 배포 / 환경변수

### 7.1 배포
- Vercel (Next.js 16)
- `package.json` → `"build": "node prebuild.js && next build"`
- `prebuild.js` 가 하는 일:
  1. `public/sw.js` 의 `BUILD_TIME` 을 현재 `YYYYMMDD_HHMM` 으로 치환
  2. `public/js/main-nav.js + main-gunghap.js + main-results.js + main-init.js` 를 합쳐서
     `public/js/bundle.js` 생성 (헤더 주석으로 파일별 라인수 기록)
- 수정된 sw.js 가 새 배포에서 구버전 캐시 삭제 → 강제 리프레시.

### 7.2 필수 환경변수 (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL          # Supabase 프로젝트 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # 브라우저용 anon key
SUPABASE_SERVICE_ROLE_KEY         # 서버 전용 (API route 에서만 사용, 프런트 노출 금지)
ANTHROPIC_API_KEY                 # Claude API 키
NEXT_PUBLIC_KAKAO_REST_API_KEY    # 카카오 로그인
KAKAO_CLIENT_SECRET               # 카카오 토큰 교환
ADMIN_PASSWORD                    # 관리자 페이지
```
실제 값은 `.env.local` 에 들어 있음 (git 에는 커밋되지 않음). Vercel 대시보드에도 동일 세팅 필요.

### 7.3 보안 헤더 (`next.config.mjs`)
- `X-Frame-Options: DENY` (iframe 삽입 금지)
- HSTS max-age=2년 + preload
- CSP: `script-src 'self' 'unsafe-inline' 'unsafe-eval' + jsdelivr + kakaocdn + kakao.com`
  / `connect-src 'self' + supabase.co + kakao.com + api.anthropic.com`
- `/api/*` 는 `Cache-Control: no-store`
- Permissions-Policy: 카메라/마이크/지오로케이션 차단

### 7.4 라우팅 rewrite
```js
'/' → '/index.html'
'/mbts' → '/mbts.html'
```
즉 최상위 도메인은 **Next.js 페이지가 아니라 public/index.html** 을 서빙.

### 7.5 서비스 워커 (`public/sw.js`)
- network-first 전략
- `/api/` 는 SW 가 관여하지 않음 (그대로 네트워크)
- 활성화 시 기존 캐시 전부 삭제 → BUILD_TIME 바뀔 때마다 새 캐시

---

## 8. 알려진 이슈 / 지뢰밭

1. **engine.js / saju.js 수정 금지** — 크기도 크고 내부 의존이 엉켜 있어 리팩터가 힘듦.
   기능 추가는 별도 모듈 (service.js 처럼 IIFE) 로 overlay 해서 얹는 패턴.
2. **클라 / 서버 로직 이중 존재** — 사주 계산·프롬프트 빌더가 `public/engine.js` 와 `lib/` 에 둘 다 있음.
   서버는 "신뢰 가능한 재계산 + 프롬프트 빌드" 용, 클라는 즉시 UI 반영용. 수정할 때는 **양쪽 싱크** 주의.
3. **Job 복구가 3분/10분 두 개 타임아웃** — `mbts_active_job.createdAt` 이 3분 넘으면 `_isAnalyzing`
   stuck 을 해제하고, 10분 넘으면 아예 삭제. 지연이 큰 요청에서 가끔 사용자가 "다시 시도" 봐야 함.
4. **AI JSON 파싱 실패** — Claude 가 종종 앞뒤에 텍스트 붙이거나 제어문자 삽입. `parseAIResponse` 4단계
   fallback 이 잡지만 완전히 실패하면 빈 화면 → "다시 시도" 토스트만 뜸. `analysis_jobs.status='partial'` 기록.
5. **max_tokens 한계** — 사주 30000, 궁합 16000. 모델이 중간에 잘리면 JSON 깨짐 → partial. 늘릴 때는
   Vercel 함수 타임아웃 (maxDuration 300s) 도 같이 고려.
6. **bundle.js 는 수동 regenerate 금지** — `prebuild.js` 가 빌드할 때마다 덮어씀. 직접 수정하면 다음
   빌드에 날아감. 수정하려면 원본 `main-*.js` 를 고쳐야 함.
7. **index.html 의 스크립트 로드 순서가 전역 변수 의존**
   (`ST`, `mbtsSession`, `_lastSaju`, `_lastAIResult`, `_lastMBTIObj` 등이 window 에 그대로 달림).
   순서 바꾸면 TypeError 쏟아짐.
8. **CSP unsafe-inline / unsafe-eval 켜져 있음** — 현재 index.html 인라인 스크립트 + legacy 코드 때문.
   제거하려면 인라인 코드 전부 외부 파일화 필요.
9. **.env.local 에 실제 시크릿이 있음** — 커밋되지 않게 `.gitignore` 확인. 공유 시 주의.
10. **engine_OLD.js 존재** — 롤백 용이지만 헷갈리게 함. 수정할 땐 engine.js 가 정본.

---

## 9. 자주 들어오는 작업 시나리오

| 상황 | 어디를 봐야 하나 |
|---|---|
| "결과 페이지 문구 바꿔" | `public/js/main-results.js` (bundle 원본) |
| "프롬프트 톤 바꿔" | `lib/prompt-system.js` (PREMIUM_SYSTEM / GUNGHAP_SYSTEM) |
| "사주 전문용어가 노출됨" | `public/saju.js` · `lib/saju-theory-server.js` 의 `SJ_TERM_MAP` |
| "75종 중 특정 유형 설명 바꿔" | `public/engine.js` ANIMALS 금지 → 대신 `mbts_points.js` 혹은 `main-results.js` 렌더 단에서 오버라이드 |
| "궁합 점수 계산 바꿔" | `public/gunghap.js` 의 레이어 1~18 |
| "달토 말투 바꿔" | `lib/chat-engine.js` (채팅 시스템 프롬프트 조립) |
| "클로버 차감 로직" | `app/api/clover/{charge,use,history}/route.js` |
| "카카오 로그인 붙이기" | `app/api/auth-kakao/route.js` + `public/login.js` + `public/auth/` |
| "관리자 통계 추가" | `app/api/admin/*` + `public/admin.html` |
| "배포 후 캐시 안 날아감" | `sw.js` BUILD_TIME 갱신 확인 (prebuild.js 실행 여부) |
| "에러 추적" | `lib/errorLog.js` → Supabase `errors` 테이블 + `/api/log-error` |
| "rate limit 풀기" | `lib/rate-limiter.js` 의 checkRateLimit 윈도우/한도 (현재 chat: 60s/30) |

---

## 9.5. 달토 채팅 상세 구조 (chatting.js, 1525 lines)

> "채팅에서 뭐가 어디서 뭐 하는지 잘 모른다" 요청 → 여기가 그 답.

### 9.5.1 파일 위치 & 역할
- **`public/chatting.js`** — 클라이언트 UI + SSE 수신 + 히스토리 관리 (1525줄, 이게 메인)
- **`lib/chat-engine.js`** — 서버에서 채팅 프롬프트 조립 (사용 안 되는 경우 많음 — 현재 클라가 직접 systemPrompt 구성)
- **`app/api/chat/route.js`** — Anthropic SSE 스트리밍 프록시 (인증·rate limit·길이 검증)

### 9.5.2 chatting.js 내부 섹션 지도
```
~ line  200  │ UI 생성: 채팅 버블 / 입력창 / 모드 토글 ("상냥 달토" ↔ "팩폭 달토")
~ line  400  │ 세션 관리: localStorage['mbts_chat_me'] — 최대 20턴 저장
~ line  900  │ 사주 컨텍스트 수집 (getFortuneTarget() from fortune-target.js)
             │   선택된 "나의 인물" 의 saju / gg / dw / enriched / wolun /
             │   wonkukRelations / gongmangFull 을 받아 JSON.stringify 로
             │   systemPrompt 에 통째로 삽입 → 이래서 채팅이 내 사주를 "앎"
  line 1100+ │ 모드 분기:
             │   sweet  → MT_SOOTHING system prompt (상냥 달토)
             │   fire   → MT_ROAST    system prompt (팩폭 달토)
  line 1218  │ 무료 카운터: localStorage['mbts_chat_count']
             │   ⚠️ 클라 전용이라 devtools 로 우회 가능 (TIER 2 미해결)
  line 1260+ │ 메시지 전송:
             │   fetch('/api/chat', { body: { systemPrompt, messages, userId } })
             │   SSE 응답 파싱 → DOM append
  line 1393  │ 히스토리 cap: chatHistory = chatHistory.slice(-20)
             │   ⚠️ 사용자에게 "이전 대화 잘렸다" 고지 없음 (TIER 2)
  line 1491  │ MBTS_Chat.openFromGunghap(person, relType, ghResult)
             │   → 궁합 결과 페이지에서 "달토와 상담" 버튼 눌렀을 때 컨텍스트 주입
```

### 9.5.3 서버 /api/chat 제약
```js
MAX_SYSTEM_CHARS = 10000       // systemPrompt 길이 상한 (DoS 완화)
MAX_MESSAGES     = 40          // messages 배열 개수 상한
MAX_MESSAGE_CHARS = 8000       // 메시지당 content 길이 상한
rate_limit       = 30/min      // userId 또는 trusted proxy IP 기반
```

### 9.5.4 채팅 뭐 바꾸고 싶으면 어디 가는가

| 하고 싶은 것 | 수정할 파일 |
|---|---|
| 달토의 말투/성격 | `public/chatting.js` 의 `MT_SOOTHING` / `MT_ROAST` 문자열 (line 1100+) |
| "내 사주" 어떤 정보 보낼지 | `public/fortune-target.js` 의 `getFortuneTarget` + `public/chatting.js` line 1298-1316 의 보강 데이터 조립 |
| 무료 채팅 횟수 | `public/chatting.js:1218` 의 `mbts_chat_count` 한도 + 아래 서버 측 검증 추가 필요 (TIER 2) |
| 서버 prompt injection 방어 | `app/api/chat/route.js` 에 서버 템플릿 강제 또는 systemPrompt 화이트리스트 도입 (TIER 2) |
| 채팅 히스토리 길이 | `public/chatting.js:1393` `slice(-20)` |
| 궁합 → 채팅 컨텍스트 | `public/chatting.js:1491` `openFromGunghap` |

### 9.5.5 채팅에서 자주 헷갈리는 점
1. "달토가 내 사주를 아는 이유" = **systemPrompt 에 사주 원본 JSON 이 들어감**
2. 그래서 **프롬프트가 10-50KB 로 커짐** → 서버 `MAX_SYSTEM_CHARS=10000` 에 걸릴 수 있음
3. `_ft` 라는 변수가 수집된 사주+MBTI 전체를 가리킴 (fortune-target.js 의 산출물)
4. 무료 카운터가 서버가 아니라 **localStorage** 에 있으므로 devtools 로 바이패스 가능 — 현재는 알려진 리스크
5. 채팅 SSE 포맷은 Anthropic `content_block_delta.delta.text` 만 누적하면 됨

---

## 10. 테스트

```bash
npm run test            # saju-core + pattern-matcher + prompt-builder 3종
npm run test:saju
npm run test:pattern
npm run test:prompt
node scripts/e2e-test.js
node scripts/gunghap-test.js
node scripts/saju-load-test.js
node scripts/saju-safety-test.js
```
npm test 는 `tests/*.test.js` 를 순차 실행.

---

## 11. 체크리스트 (코드 수정할 때)

- [ ] engine.js / saju.js 건드리지 않았는가?
- [ ] 한 번에 한 파일만 수정했는가?
- [ ] 서버/클라 이중 로직이면 양쪽 다 업데이트했는가?
- [ ] 테스트 (`npm test`) 통과하는가?
- [ ] sw.js BUILD_TIME 이 prebuild 에서 갱신되는가?
- [ ] 시크릿이 커밋에 포함되지 않았는가?
- [ ] 커밋 메시지 한글로 작성했는가?

---

## 12. 부록: 주요 글로벌 변수 (프런트 window)

```
ST                  # 현재 입력/세션 상태 (y, m, d, h, min, gender, name …)
mbtsSession         # 로그인 세션 { userId, nickname, … } + localStorage 싱크
_isAnalyzing        # 분석 중 재진입 방지
_lastAIResult       # 최근 AI 파싱 결과
_lastSaju / _lastGG / _lastDW / _lastMBTI / _lastMBTIObj
_lastIsAI           # AI 결과 vs fallback 구분
_shareParam         # ?s=<code> 공유 진입
birthGender         # 입력 UI 의 성별 상태
_MBTS_activePollTimer   # Job 복구 폴링 타이머 (중복 방지)
```

LocalStorage 키: `mbts_active_job` · `mbts_lastResult` · `mbts_session`

---

## 13. 마지막 한마디

- 이 프로젝트는 **레거시 정적 프런트 (public/) + 얇은 Next.js 백엔드 (app/api) + Supabase + Claude** 의
  조합. 유저가 보는 모든 픽셀은 **engine.js 와 bundle.js 에서 나온다**.
- "뭔가 작동 안 함" 은 먼저 브라우저 콘솔 → `main-init.js` 의 Job 복구 로그 → Supabase `analysis_jobs`
  해당 row → Anthropic 응답 길이 순서로 파보면 99% 해결.
- 수정 전엔 **반드시 사용자와 한 번 더 방향 합의**하고 들어갈 것.
