# 하드 정지 보고서 — personal-harness-v2 (명령서② REV4.6)

- **일시**: 2026-06-13 05:02
- **모드**: 자율 주행 (§0-α)
- **정지 코드**: 9 (하드 정지 — launcher 재기동 제외 대상)
- **정지 사유**: 하드 정지 1호 — **① 산출 부재** (`lib/tag-df.json` 미존재)

---

## 1. 정지 사유 상세

| 확인 경로 | 결과 |
|---|---|
| `mbts-app/lib/tag-df.json` | **부재** (Test-Path False) |
| `mbts-app` 전체 글롭 `**/tag-df.json` | 0건 |
| `mbts-harness` 전체 글롭 `**/tag-df.json` | 0건 |
| `buildUserTags` 방출 prefix (pattern-data.js L12631~12835) | `dwss:` / `sess:` / `yongshin_el:` / `mbtiaxis:` **전부 미방출** — ① 미실행 코드 레벨 교차 확인 |
| repo 내 명령서① 사양 문서 | 0건 (인수인계서.md = 5월 동물 아이콘 작업 문서, 전문용어_마스터리스트.md = TERM_HINTS 작업 문서 — 모두 무관) |

§0-α: "이건 승인으로도 못 푸는 게이트라 자동 우회 금지" → **preflight 본 수행·하네스 구현·파일럿·본 실행 전부 미착수.**
구현을 보류한 이유: ① 산출 의존 인터페이스 4건(dwss/sess/yongshin_el/mbtiaxis 어휘 형식, 기존 `axis:`와 `mbtiaxis`의 관계)이 미확정 상태에서의 빌드는 재작업 리스크 + 측정 우선 원칙 위배.

---

## 2. 하드 정지 3종 게이트 최종 상태

| # | 게이트 | 결과 | 실측 |
|---|---|---|---|
| 1 | ① 산출 (tag-df.json) | **FAIL — 정지 사유** | 위 §1 |
| 2 | fable-5 가용 | PASS | `claude -p --model claude-fable-5` → "pong" 수신 (05:02, C:\tmp spawn — Windows `claude.cmd` 경로 실증) |
| 3 | 금지·RO 파일 변조 | PASS | git status clean — 금지 5종(engine/saju/service/bundle/login) + 런타임 lib 3종(pattern-matcher/prompt-builder-usr/pattern-data) 무변조. 미추적 문서 3건은 RO 무관 |

---

## 3. 사전 검증 결과 (read-only — 정지 전 수행분)

| # | preflight 항목 | 결과 | 실측 |
|---|---|---|---|
| 1 | RO 8종 미변조 / 베이스 사본 | PASS(주의) | harness.js 존재하나 **1,518줄** — 명령서 명기 1,722줄과 불일치 |
| 2 | premium 14키 ↔ pattern-data.js diff (C10) | **PASS** | diff 0, 띄어쓰기 포함 원문 완전 일치 (exactMatch=true) |
| 3 | 매처 실측 정합 (V4) | **PASS** | `finalScore = relevance × (1 + impact × tierBonus × 0.1)` (pattern-matcher.js L183) / `DEFAULT_IMPACT=3` (L126) / `TIER_BONUS S2.0 A1.5 B1.0 C0.8` (L123) / `PRECISION_BONUS {1:0.6, 2:0.8, 3+:1.0}` (L124) / `isSpecificTag` L135-137 = `uses:`/`ref:`/`pillar:` **3종** (P6 정정과 일치 — pillar: 큐 제외 유효) |
| 4 | buildUserTags 방출 축 (C11/D11) | **PASS** | 방출 prefix 18종 확인: dm/strength/uses/gyeokguk/condition/ss/pillar/unsung/sinsal/relation/tongbyeon/yongshin/yongshin_type/temperament/cf/axis/stress/intensity. 스윕 기존 축 3종(`strength:` 5등급+신강+/신약+, `cf:` 4기능, `temperament:` 4기질) 방출 확인. `axis:` 4종(EI/SN/TF/JP) 무조건 방출 — ① mbtiaxis와의 관계 확정 필요(P2 보수 기본값 = axis: 재사용) |
| 5 | 기존 premium 분포 추출 (C14) | 완료(변동 발견) | §4 상세 — **명령서 V5 기준치 구식화** |
| 6 | 기존 id 전수 (C16/TC-20 전제) | **PASS** | 336개 전수 unique, `H2-` prefix 충돌 0, id 형식 CROSS-FIX-003 류 확인 |
| 7 | theory-lookup 실확인 (V3) | PASS(주의) | `'편관': '압박/도전'` 키-값 존재 — mbts-harness/saju-theory.js **L63**, lib/saju-theory-server.js **L56** (lookup 구현 가능성 ✓). 단 식신 빈도: 81회(harness) / 20회(lib 서버) — 명령서 명기 94회와 불일치, 기준 파일 확정 필요 |
| 8 | 세션 전략 a/b 실측 | 이월 | 하네스(transport) 구현 필요 — ① 완료 후 |
| 9 | 잔여 9키 generic-fill률 → T2/T3 배정 | 이월 | 〃 |
| 10 | 모집단 800 strength 실분포 → 층화표 (C19) | 이월 | tag-df 자체가 ① 산출 |
| 11 | Supabase 신규 필드 sql | 이월 | P3에 따라 비차단 항목 |
| 12 | 1장 왕복 토큰 → 쿼터캡 | 이월 | 〃 |

---

## 4. 발견 ① — premium 풀 변동: C14 캘리브레이션 좌표 구식화

명령서 V5 실측(2026-06-13)과 현재 HEAD(1fca697) 실측이 다름. **명령서 실측 이후 오늘 커밋 3건이 풀을 변경**한 것으로 추정 (f43fdf8 비성격 14개 분리 / cdf14f5 연애스타일 일원화 / 1fca697 내면모순 5개 제외).

| 항목 | 명령서 V5 | 현재 실측 (HEAD 1fca697) |
|---|---|---|
| premium 총수 | 344 | **336** (-8) |
| tier | S34 / A57 / B249 / C3 / TRASH1 | S34 / **A52** / **B246** / C3 / TRASH1 |
| impact 평균 / 최빈 | 6.64 / 7 | **6.68** / 7 |
| impact 분포 | 3:23 4:3 5:33 6:85 7:106 8:62 9:29 10:3 | 3:20 4:3 5:32 6:83 7:105 8:61 9:29 10:3 |
| specific 0태그 / 1태그 | 86(25%) / 118(34%) | **102(30%)** / **129(38%)** |

**함의**: C14 캘리브레이션 표·C15 dedup 인덱스·③ §9-2 support 재계산이 전부 이 풀을 기준선으로 삼는다.
**권고**: ② 본 실행 preflight 시점에 재추출(명령서 설계대로 자동 보정됨)하되, **②~③ 완료까지 premium 풀 동결**. 동결 불가 시 preflight 시점 git HEAD를 기준 커밋으로 state에 고정 기록하고 이후 변경은 ③ 통합 시 재대조.

---

## 5. 발견 ② — 명령서 고정 수치 3건 drift

| 명령서 명기 | 실측 |
|---|---|
| harness.js 1,722줄 | 1,518줄 |
| premium 344개 | 336개 |
| saju-theory.js 식신 94회 | 81회(mbts-harness) / 20회(lib 서버판) |

구조적 사실(공식·키-값·필드명·L137 등)은 **전부 일치** — 수치만 drift. 본 실행 preflight에서 명령서 내 모든 고정 수치는 재실측값으로 대체할 것(명령서의 측정 우선 원칙과 합치).

---

## 6. 발견 ③ (참고) — 소주제별 현재 패턴 수

올해 조언 5 / 대운 흐름 8 / 올해 키워드 13 / 나의 장점 13 / 기회의 시기 16 / 연애 지뢰 16 / 인생 한줄 마무리 18 / 맞춤 재물 쌓는 법 19 / 직장 적성 28 / 남들이 보는 나 30 / 잘 맞는 타입 33 / 연애 스타일 34 / 고쳐야 할 점 43 / 나의 성격 60

→ T1 5키(올해 조언·대운 흐름·올해 키워드·기회의 시기·연애 지뢰)가 현재 풀에서도 가장 얇음 — F1 적자율 및 T1 우선 실행 순서와 정합 재확인.

---

## 7. 재개 조건 (§0-α 1행)

1. **명령서① 실행** → `lib/tag-df.json` 생성 (fx/dwss/sess/yongshin_el/mbtiaxis 어휘)
2. 인터페이스 체크 4항목: dwss / sess / yongshin_el / mbtiaxis 어휘 존재·형식 PASS
3. PASS 시 ② preflight 자동 연계 착수 — 본 보고서 §3의 PASS 7항목은 빠른 재검만, 이월 5항목 본 수행
4. 그 후: 커밋 단위 1~10 구현 → 파일럿 20장 → 본 실행 (T1→T2→T3)

**명령서① 사양 문서는 repo·작업 디렉토리 어디에도 없음** — ① 실행을 위해서는 동진이 명령서①을 별도 투입해야 함.
