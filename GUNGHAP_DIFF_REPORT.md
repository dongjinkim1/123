# 개인분석 vs 궁합 — 전체 차이 리포트

**생성일**: 2026-05-01
**분석 방법**: 9개 sub-agent 병렬 비교 분석
**비교 대상**:
- 개인분석: `lib/prompt-system.js`(PREMIUM_SYSTEM) + `lib/prompt-builder-usr.js` + `app/api/analyze-v2/route.js` + `public/js/main-results.js`
- 궁합: `lib/gunghap-prompt.js`(GUNGHAP_SYSTEM_V2) + `lib/saju-analysis.js`(buildGunghapUserPrompt) + `app/api/gunghap-v2/route.js` + `public/js/main-gunghap.js`

**프롬프트 길이 (실측)**:
| | 개인 | 궁합 |
|---|---:|---:|
| systemPrompt | 4,466자 | 6,915자 |
| userPrompt | 60,508자 | 65,157자 |

---

## 1. 시스템 프롬프트 차이

| 항목 | 개인분석 | 궁합 | 상태 |
|---|---|---|---|
| AI 인격 | "최정상급 MBTS(사주×MBTI) 전문가" + "이거 내 얘기" 톤 | "최정상급 MBTS(사주×MBTI) 전문가" + "우리 딱 이래" 톤 | ✅ |
| 전문용어 금지 범위 | 12 카테고리 + 한자 포함 명시 | 12 카테고리 + **50+ 세부 금지 용어 목록** | ⚠️ 궁합이 더 엄격 |
| 전문용어 예외 | `specialStars` 배열만 | `basis`, `_blueprint` 필드까지 | ⚠️ |
| _blueprint 구조 | 14개 카드 sub map (단순 문자열) | landscape/chemistry/tension/a_core/b_core/collision + subs별 anchor/discovery | ❌ 한쪽 없음 (구조 차원이 다름) |
| 소주제별 톤 가이드 | **14개 카드별 상세** (시적/확신/직설/로맨틱/코칭…) | 12 sub의 `tone` 필드 (약식, 1줄) | ⚠️ 궁합이 더 약함 |
| 인지기능 별명 | "INFP 특유의" 자연어, **별명 금지** | 별명 8개 허용 (Fi=내면의 심판관 등) | ⚠️ 정반대 정책 |
| JSON 출력 구조 | `profile/oneLine/categories(5)/subs(14)` | `_blueprint+title+quote+totalScore+1 category(12 subs)` | ❌ 완전 다름 |
| 교차 패턴 ★★ | 8개 풀 → 4개 선택 → 뼈대 | 18레이어 + 앵커 방식 | ⚠️ |
| 긍정 먼저 규칙 | 첫 1~2문단 강점 | 첫 2문단 케미/강점 (더 강조) | ✅ 유사 |
| 데이터 무결성 | 간지·오행·세운 | 간지·연도·MBTI 유형 | ✅ |
| 호칭 | "당신" 단일 | **"당신(=나)" + "상대방"** 이분 | ⚠️ |
| 카드별 균형 (사주70/MBTI30) | ✅ 명시 | ✅ 명시 | ✅ |
| 깊이 규칙 | 명시 없음 | "5~7문단 깊이" 명시 | ❌ 개인 없음 |
| 보강 데이터 경중 (🔴🟡🟢) | 없음 | **있음** (뼈대/맥락/힌트) | ❌ 개인 없음 |
| 시작 패턴 다양화 | 톤만 명시 | "7가지 패턴 3회 이상 금지" | ❌ 개인 없음 |
| 관계 스토리/갈등 패턴 | N/A | **필수 규칙** | ❌ 개인 N/A |
| oneLine vs quote | `oneLine`(자연 이미지) | `quote`(관계 이미지) | ⚠️ |
| 인사이트/처방 | 💊 필수 | 각 sub b 마지막 💊 | ✅ |

**핵심 인사이트**: 두 프롬프트는 동일한 철학(사주70%+MBTI30%, 구어체, 무결성)을 공유하지만, **궁합은 관계 역학을 더 정밀하게 풀기 위해 구조적 깊이와 맥락 지시를 대폭 강화**. 반면 **소주제별 톤 가이드는 개인이 더 정밀**.

---

## 2. 유저 프롬프트 데이터 차이 (체크리스트)

| 항목 | 개인분석 | 궁합 | 상태 |
|---|---|---|---|
| 의뢰인 기본정보 | 생년월일시·성별·나이·MBTI·인지기능 스택 | A/B 분리 (각각 사주·격국·MBTI·오행) | ✅ 동등 |
| MBTI 강도별 행동 프로파일 | 4축 (trait/love/work/burn) | A/B 각각 동일 | ✅ |
| 사주 원국 | 천간십성+궁위십성+오행(표면+지장간)+12운성 모두 | A/B 기본정보만 (천간십성/지장간 생략) | ⚠️ 궁합이 1/2 수준 |
| 합충형해 (암합 포함) | 전체 명시 | 교차 분석 키워드로 통합 | ⚠️ |
| 격국 분석 | 격국·납음·십성비중·강도점수·용신·오행흐름 | 격국명·강도만 | ⚠️ 궁합이 1/4 수준 |
| 참고 힌트 / 동적 키워드 | 15개 항목 (일간본질·일주특성·일주그림자·격국체감…) | **없음** (교차 패턴이 대체) | ❌ 궁합 없음 |
| 대운 (전체 8기 80년) | 전체 목록+전환기 | A/B 현재 대운만 | ⚠️ 궁합 대폭 축소 |
| 세운 vs 원국 | 2026/2027 세운 십성 | 5신 판별로 통합 | ⚠️ 개념 다름 |
| 월운 12개월 | 2026 월별 12줄 | **없음** | ❌ 궁합 없음 |
| 삼재 | 현재/다음 시작 연도 | **없음** | ❌ 궁합 없음 |
| 신살 (참고) | 9개 신살 전체 | A의 신살만 교차 패턴서 언급 | ⚠️ 궁합 부분 |
| 공망 | 인·묘공망 판정 | **없음** | ❌ 궁합 없음 |
| 납음 스토리 | 적천수 물상 | **없음** | ❌ 궁합 없음 |
| 교차 패턴 (★★) | **N/A** (개인분석은 교차 패턴이 본인 단독) | **40개 패턴** (끌림/맞춰갈부분/사귀려면/상대눈에비친나 각 10개) | ✅ 궁합만 |
| MBTI 이론 심층 | 참고용 1개 | A/B 각각 (2개) | ✅ 양쪽 |
| 사주 이론 심층 | 참고용 1개 | A/B 각각 (2개) | ✅ 양쪽 |
| TERM_HINTS 적용 | ✅ 38개 용어 병기 | ✅ 38개 동일 적용 | ✅ |
| 한자 strip | ✅ 0건 잔존 | ✅ 0건 잔존 | ✅ |
| 엔진 계산 점수 | 없음 | **66점 종합 + 4항목 %** | ❌ 궁합만 |

### 개인분석에만 있는 항목
- **참고 힌트** (15 항목: 일간본질·일주특성·일주그림자·격국체감 등)
- **대운 8기 80년 전체** (현재 + 과거 + 미래)
- **월운 12개월** (2026)
- **삼재** (현재/다음)
- **공망**
- **납음** (천하수 물상)
- **5신 체계** (개운법, 건강 오행 주의, 직업 적성, 합 트리거 예보, 자녀운)

### 궁합에만 있는 항목 → ## 2-B 별도 섹션 참조

### 형식/상세도 차이
| 구분 | 개인 | 궁합 | 비율 |
|---|---|---|---|
| 원국 정보 | 천간십성+궁위+지장간 | 기본정보+오행 | 개인 2배 |
| 격국 분석 | 6개 차원 | 2개 차원 | 개인 4배 |
| 대운 | 80년 로드맵 | 현재 1기만 | 개인 8배 |
| 세운/월운 | 구체적 간지 | 5신 성질 | 개념 다름 |

---

## 2-B. 궁합에만 있는 고유 데이터 (개인분석 없음)

### ✅ 코드+프롬프트 반영

1. **18레이어 교차 분석 엔진** (`public/gunghap.js:1-376`)
   - 18개 계산 레이어: 천간/지지/오행/MBTI/대운/십성/용신/일주통합/원진/삼합/공망/납음/교차십성/성별맥락/신살/일간강약/배우자궁/5년타이밍
   - `ghResult.keywords` 281개 + `ghResult.details` 18 필드
   - 프롬프트 반영: `gh_usr.txt:18-47`

2. **엔진 계산 점수** (`public/gunghap.js:174-211`)
   - 초기 45점 → 18레이어 조정 → 65~95 클램핑
   - scoreWeights 4종 (love/comm/values/work)
   - 프롬프트 반영: `gh_usr.txt:18` "종합: 66점 · 연애: 75% · 소통: 56%"

3. **대운 동기화** (`public/gunghap.js:82-89`, 레이어 5)
   - A/B 현재대운 + 2026~2028 세운 비교
   - "동반 상승기/한쪽 상승/함께 인내" 판별
   - 프롬프트 반영: `gh_usr.txt:42-45`

4. **A↔B 천간 교차 (합/충)** (레이어 1, `gunghap.js:23-41`)
   - 일간합+삼합+비화+생/극
   - GH_GANHAP, GH_CHUNG_G 16조합
   - 궁위 가중치(일간=최상)
   - 프롬프트 반영: `gh_usr.txt:21`

5. **A↔B 지지 교차 (육합/삼합/충/형/해)** (레이어 2, `gunghap.js:43-52`)
   - GH_YUKHAP, GH_CHUNG_J, GH_HYUNG, GH_HAE
   - 프롬프트 반영: `gh_usr.txt:27-28`

6. **A↔B 오행 보완 관계** (레이어 3, `gunghap.js:54-64`)
   - 부족 오행 보완 + dmOhRel ('A생B'/'비화'/'A극B' 등)
   - 프롬프트 반영: `gh_usr.txt:30`

7. **A↔B 인지기능 교차 점수** (레이어 4, `gunghap.js:66-81`)
   - 주↔주, A주↔B부, B주↔A부 (0~10점)
   - 프롬프트 반영: `gh_usr.txt:31-33`

8. **A↔B 축별(EI/SN/TF/JP) 교차 점수** (`gunghap.js:74-80`)
   - 같은 축 7점 / 다른 축 5점 / SN 다름 4점
   - 프롬프트 반영: `gh_usr.txt:34-37`

### ⚠️ 코드는 있지만 프롬프트 미반영 (Dead/Unused)

1. **GH_CATEGORIES.scoreWeights** (`lib/gunghap-prompt.js:86-87`)
   - 관계유형별 가중치 정의 (썸: love 0.40, 직장: work 0.40 등)
   - **미반영 이유**: 엔진(`gunghap.js`)이 고정 공식(0.35/0.25/0.25/0.15) 사용 → 동적 가중치 무시

2. **GH_REL_CONFIG.subs** (`gunghap-prompt.js:262-334`)
   - 관계유형별 14 소주제 (썸/연인/동료/친구 각 14개)
   - 각 sub: `h(제목)` + `tone(톤)` + `anchor(데이터 힌트)`
   - **반영 상태**: 프롬프트 본문에는 있지만 AI 응답 JSON 구조엔 미반영

3. **GH_REL_CONFIG.tone** (관계유형별)
   - 썸: "설레함과 궁금함" / 연인: "현실적 깊이" / 직장: "프로페셔널" / 친구: "편안하고 솔직"
   - 시스템 프롬프트 텍스트에만 포함

4. **십성 관계 (레이어 6)** (`gunghap.js:91-95`)
   - R.details.sipsung = {AtoB, BtoA, genderContext}
   - keyword에만 추가, 본문 상세 풀이 없음

5. **용신 궁합 (레이어 7)** (`gunghap.js:97-101`)
   - R.details.yongshin (A/B/bForA/aForB/grade)
   - keyword 형태로만 노출

6. **신살 교차 (레이어 15)** (`gunghap.js:144-150`)
   - 도화/화개/역마/천을귀인/양인 쌍 검출
   - keyword에만, 풀이 없음

7. **배우자궁 십성 교차 (레이어 17)** (`gunghap.js:160-161`)
   - B 일지 → 지장간 추출 → A 일간으로 십성 판별
   - keyword에만 "결혼 궁합 최상급" 형식

8. **5년 타이밍 (레이어 18)** (`gunghap.js:163-169`)
   - R.details.timing.years[5개] (year/ganKr/jiKr/ssA/ssB/score/grade)
   - 프롬프트엔 현재/2026/2027만 (5년 풀 미포함)

### ❌ 부재

- **시스템 프롬프트의 호칭 규칙 ("당신/상대방")**: ✅ 반영됨 (오해 정정)
- **소주제별 앵커**: ⚠️ 반쪽 — anchor 필드는 있으나 AI 사용 강제 없음

---

## 3. API route 차이

| 항목 | analyze-v2 | gunghap-v2 | 상태 |
|---|---|---|---|
| Model | claude-sonnet-4-6 | claude-sonnet-4-6 | ✅ |
| max_tokens | 30,000 | 30,000 | ✅ |
| temperature | 0.5 | 0.5 | ✅ |
| stream 방식 | `messages.stream()` | `messages.stream()` | ✅ |
| JSON 강제 지시문 | CRITICAL MACHINE-TO-MACHINE | 동일 | ✅ |
| 에러 처리 | logError() | logError() | ✅ |
| Rate limit | `'analyze', 60s, 5회` | `'gunghap', 60s, 5회` | ⚠️ 키만 다름 |
| COST | 15 | 15 | ✅ |
| Atomic 차감 + 재시도 | 2회 retry | 2회 retry | ✅ |
| **input_hash 7일 캐시** | ✅ 있음 (line 136-173) | ❌ **없음** | ❌ |
| **M9 dedupe 30s window** | ✅ 있음 | ❌ **없음** | ❌ |
| userId UUID 검증 | ✅ | ✅ | ✅ |
| 게스트 처리 | 캐시에선 'guest' 지원 | 필수 userId | ⚠️ |
| analysis_jobs upsert | input_hash 포함 | input_hash 없음 | ⚠️ |
| **stream.on('text') 이벤트** | ✅ partial_subs 실시간 업데이트 | ❌ finalMessage()만 | ❌ |
| **부분 응답 저장 (progressive)** | ✅ progress 업데이트 | ❌ 없음 | ❌ |
| IP 헤더 | x-vercel-forwarded-for 신뢰 | x-forwarded-for 일반 | ⚠️ |

**핵심 차이**:
- **캐시 & dedupe**: analyze-v2만 7일 캐시 + 30s 동시 dedupe
- **progressive rendering**: analyze-v2는 stream.on('text')로 실시간 partial_subs 업데이트, gunghap-v2는 finalMessage 동기 대기
- **IP 추적**: analyze-v2는 Vercel-specific, gunghap-v2는 범용

---

## 4. 클라이언트 렌더링 차이

| 항목 | main-results.js | main-gunghap.js | 상태 |
|---|---|---|---|
| JSON 파싱 | 5단계 폴백 + `postValidateAI()` | 5단계 폴백 (postValidate 없음) | ⚠️ 개인이 더 검증 |
| 렌더링 | `renderResult()` 동물카드+MBTI+만세력 | `fillGhResult()` 진입 → `fillGhResultProgressive()` (200ms 간격 sub 추가) | ⚠️ |
| 카테고리 처리 | 5 categories × 14 subs | `categories[].subs[]` or `items[]` 양쪽 지원 | ⚠️ 궁합이 호환 |
| profile 필드 | ✅ pillars[], mbtiType/Name/Functions/Tags, seasonNote | ❌ | ❌ 개인만 |
| oneLine 필드 | ✅ | ❌ (대신 `quote`) | ⚠️ |
| 점수 표시 | ❌ | ✅ 카운트업(1.2s) + 4 progressbar + SVG ring | ❌ 궁합만 |
| 로딩 UI | 11단계 78초 시나리오 | 5-10단계 hint 박스 (max 2개) | ⚠️ |
| localStorage | mbts_history | mbts_gh_history (personA/personB 분리, relType/Label) | ⚠️ |
| 공유 | 카카오톡 + 이미지 저장 + OG 이미지 자동 + 동물 아이콘 | 카카오톡만 | ⚠️ 개인이 풍부 |
| Progressive | partial_subs 폴링 → appendSubCard 즉시 | _ixGhProgInited 플래그 → finalizeGhProgressivePage | ⚠️ |
| 에러 처리 | alert() + 상태 복구 | 단순 메시지 (line 498) | ⚠️ |

**핵심**: 궁합은 **점수 시각화**에 최적화, 개인은 **복합 프로필**(동물카드/만세력/OG 이미지) + **상세 로딩 스토리**.

---

## 보강 A. _blueprint 구조 비교

### 개인분석 _blueprint
- **필드**: 14개 카드명 sub map
- **형식**: 단순 문자열 ("패턴1 / 패턴2 / 패턴3 / 패턴4")
- **작성 규칙**: 카드별 4개 패턴을 구어체 한 줄로 변환
- **본문 활용**: 변환된 패턴이 본문 뼈대

### 궁합 _blueprint
- **필드**: 구조화 객체
  - `landscape` — 관계 자연 이미지 1줄
  - `chemistry` — 가장 강한 케미 1줄
  - `tension` — 가장 뜨거운 갈등 1줄
  - `a_core` / `b_core` — 각 사람 핵심
  - `collision` — A 핵심 + B 핵심 = 결과
  - `subs[]` — 각 sub의 anchor(필수) + discovery(선택)
- **작성 규칙**: 전체 관계 뼈대 → 각 sub 앵커 정렬
- **본문 활용**: anchor/discovery가 sub 본문 근거

**차이**: 개인은 14 카드 독립 "나열형", 궁합은 전체 관계 이미지 → 세부 배치 "구조형".

---

## 보강 B. GH_CATEGORIES & GH_REL_CONFIG (관계 유형 4종 동적성)

### GH_CATEGORIES — 4 관계 유형

| 유형 | 카테고리 4개 | scoreWeights | tone |
|---|---|---|---|
| **ssom** (썸) | 상대 파악 / 나와의 관계 / 실전 / 미래 | love:0.40 comm:0.30 values:0.15 work:0.15 | 설레고 궁금. 두근거림 |
| **lover** (연인) | 상대 파악 / 궁합 구조 / 소통과 갈등 / 결혼 | love:0.35 comm:0.25 values:0.25 work:0.15 | 현실적·깊은 분석 |
| **colleague** (직장동료) | 상대 파악 / 협업 구조 / 실전 팁 / 성장 | love:0.05 comm:0.30 values:0.25 work:0.40 | 프로페셔널·인간적 |
| **friend** (친구) | 상대 파악 / 우리 구조 / 유지와 시너지 / 장기 | love:0.10 comm:0.35 values:0.30 work:0.25 | 편안·솔직 |

### GH_REL_CONFIG.subs — relType별 14 sub

각 relType: **14개 sub 고정**, 단 sub 제목(h)·tone·anchor가 relType별로 완전히 재구성됨.

### 동적성 비교
- **개인분석**: 5 category × 14 subs **완전 고정** (모든 MBTI 동일 구조)
- **궁합**: 14 sub 슬롯은 같지만 relType별로 제목/톤/앵커/가중치 **동적 변경**

**결론**: 궁합이 더 동적. 그러나 scoreWeights는 엔진이 무시(고정 공식 사용) → 불완전한 동적화.

---

## 보강 C. TERM_HINTS / 한자 strip 패리티

| 항목 | 개인 | 궁합 | 상태 |
|---|---|---|---|
| TERM_HINTS 용어 수 | 38 | 38 | ✅ 동일 |
| 38개 키 일치 | 100% | 100% | ✅ 완벽 동기화 |
| 한자 strip regex | `/\([一-龥]+\)/g` | 동일 | ✅ |
| 호출 시점 | `usr` 조립 후, theory 후, return 직전 | `userPrompt` return 직전 | ✅ 동일 위치 |
| 한자 잔존 | 0건 | 0건 | ✅ |
| 뉘앙스 병기 작동 | ✅ `(자기 에너지가 강함)` | ✅ `(큰 돈/사업형)` | ✅ |

**결론**: 완벽 동기화. 함수명만 `applyTermHints` vs `applyTermHintsGH` (충돌 방지).

---

## 보강 D. 인격 / 톤 가이드 비교

| 항목 | 개인분석 | 궁합 | 상태 |
|---|---|---|---|
| AI 인격 | 최정상급 MBTS 전문가 + "이거 내 얘기" | 최정상급 MBTS 전문가 + "우리 딱 이래" | ✅ 동일 기조 |
| 소주제별 톤 가이드 | **14 카드별 상세** (시적/확신/직설/로맨틱/코칭/타이밍/감동) | 14 sub의 `tone` 약식 (1줄) | ⚠️ 궁합 약함 |
| 인지기능 별명 | 자연어 전용, **별명 금지** | 별명 8개 **허용** | ❌ 정반대 |
| 호칭 | "당신" 단일 | "당신(=나)" + "상대방" | ⚠️ |
| 구어체 (~예요/~거든요) | ✅ | ✅ | ✅ |
| 따뜻한 감성 | ✅ | ✅ | ✅ |
| 카페 1:1 톤 | ✅ | ✅ | ✅ |

---

## 5. 발견사항 / 잠재 이슈

### 🔴 우선순위 높음

1. **gunghap-v2 캐시 부재** — analyze-v2와 동일한 input_hash 7일 캐시 + 30초 dedupe 적용 권장. 매 요청마다 30초+ AI 호출 + 클로버 차감으로 사용자 비용 부담.

2. **gunghap-v2 progressive rendering 부재** — 개인분석은 30초 동안 부분 결과 실시간 표시. 궁합은 모든 응답 대기. UX 격차 큼.

3. **scoreWeights 동적 적용 안 됨** — GH_CATEGORIES에 관계별 가중치 정의되어 있으나 엔진이 고정 공식(0.35/0.25/0.25/0.15) 사용. 직장 관계인데 work를 5%만 반영하는 구조 모순.

4. **인지기능 별명 정책 충돌** — 개인은 자연어 전용 강제, 궁합은 별명 허용. 같은 사용자가 두 결과를 비교할 때 일관성 깨짐.

### 🟡 중간 우선순위

5. **gunghap에서 사주 원국 정보 축약** — 개인분석은 천간십성+궁위십성+지장간 모두 포함. 궁합은 기본정보만으로 풀이 깊이 한계. A의 격국·신살 정보를 14 sub 풀이에 활용하기 어려움.

6. **레이어 7/15/17/18 (용신/신살/배우자궁/5년타이밍) keyword 형태만 노출** — 풍부한 데이터지만 본문 풀이 근거로 사용되지 않음. 프롬프트 반영 강화 필요.

7. **궁합에 월운/삼재/공망 부재** — 사용자가 "올해 우리 어때?" 질문 시 답할 데이터가 부족.

8. **소주제별 톤 가이드 격차** — 개인은 14개 카드 톤 명시, 궁합은 약식 1줄. 궁합도 카드별 차별화된 톤 필요.

### 🟢 낮은 우선순위 (정합/일관성)

9. **호칭 규칙 분리는 의도적 OK** — 궁합 "당신(=나)/상대방"은 적절.

10. **JSON 구조 차이 (categories 5개 vs 1개)는 의도적** — 클라 렌더 분리되어 있어 OK.

11. **temperature 0.5 양쪽 동일** — analyze-v2와 gunghap-v2 일관성 ✅.

12. **TERM_HINTS / 한자 strip 완벽 동기화** ✅.

### 🐙 권장 후속 작업

- **Phase 4** 후보: gunghap-v2 캐시 + progressive rendering 적용 (analyze-v2 패턴 복제)
- **Phase 5** 후보: scoreWeights 동적 적용 + 레이어 7/15/17/18 본문 풀이 반영
- **Phase 6** 후보: 인지기능 별명 정책 통일 + 궁합 톤 가이드 14 카드별 상세화
- **Phase 7** 후보: 궁합에 월운/삼재/공망 데이터 일부 반영 (관계 시기 판정용)

---

**📅 분석 일자**: 2026-05-01
**🔍 분석 도구**: 9개 sub-agent 병렬 비교 + Node 검증 (`indiv_sys/usr.txt` + `gh_sys/usr.txt`)
**📂 원본 파일 위치**: `C:\tmp\indiv_sys.txt`, `C:\tmp\indiv_usr.txt`, `C:\tmp\gh_sys.txt`, `C:\tmp\gh_usr.txt`
