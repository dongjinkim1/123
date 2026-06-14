# personal-harness-v2 — 전체 구조 + 파생(sweep) 재설계 (외부 검증용)

> 목적: 아래 (A) 현재 구조와 (B) 제안 재설계가 타당한지 제3자 검증을 받기 위함.
> 표기: ✅=코드 검증됨(file:line) / ⚠️=추정·미검증 / 🔧=제안(미구현).
> 작성 기준 커밋: `5d88770` (2026-06-14).

---

## 0. 한 줄 정의

사주(Saju)×MBTI 교차 성격 패턴을 LLM 토론으로 생성→판정→적재하는 자율 하네스.
산출물(채택 패턴)은 프로덕션 앱의 프리미엄 패턴 풀로 들어감. **구독 쿼터 전용**(종량 API 금지).

---

## A. 현재 구조 (CURRENT)

### A-1. 컴포넌트 (파일별 역할) ✅

| 파일 | 역할 |
|---|---|
| `harness2.js` | 오케스트레이터. 큐 적재·주문 1장 처리(`processOrder`)·판정 반영(`decide`)·저널 |
| `debate.js` | 토론 실행 3종: `runDebate`(4턴)·`runSolo`(1콜)·`runSweepDebate`(1콜) |
| `transport.js` | LLM 콜. `spawnSync(claude.exe -p --model claude-opus-4-8)`. **동기·블로킹** |
| `arbiter/arbiter.js` | 판정자. 접지 3중 + tier/impact + dedup prefilter + 파생군 규칙 |
| `sweep.js` | 파생 엔진. 축 식별·칸 생성·support·트리거·집계 |
| `prompts/formats.js` | 시작형식 5종·OUTPUT_SPEC·`sweepPrompt`(개방형) |
| `observer/observer.js` | 체크포인트(30장)마다 관찰 1콜. 산출은 격리(토론 미주입) |
| `merge-accepted.js` | 워커별 accepted 병합(소주제 비중첩 → union) |

### A-2. 병렬 모델 ✅

- **소주제(subject) 단위 3워커.** 각 워커 = 독립 Node 프로세스.
  - W1 `state/`(OPP·YAD·MNY·JOB) / W2 `state_w2/`(DWF·STR·LIF·MAT·PSN) / W3 `state_w3/`(YKW·LVM·IMG·LVS·FIX)
  - `H2_STATE` env로 STATE 경로 격리. 큐는 SHARED(동결)에서 읽기 전용.
- **워커 내부는 순차.** `transport.call`이 `spawnSync`라 한 워커당 동시 claude 1개. (병렬콜 능력 없음 ✅)
- 동시성 상한 = RAM. claude.exe 1개 ≈ 424MB, 여유 ~1.4–2GB → 3워커가 한도.

### A-3. 데이터 모델 ✅

- `lib/tag-df.json` — 모집단 800명(frozen, seed 20260613). `{meta, vocab, df, users[800]}`.
  - user = `{uid, birth, hour, min, gender, mbti, tags[]}`. tags는 엔진 실계산(strength/cf/kts/dwss/sess/yongshin_el…).
- `queue_{CODE}.json` — 소주제별 주문서. 공존샘플링으로 사전 생성.
- `harness_state.json` — `{done{}, accepted[], processed, …}`.
- `sweep_queue.json` — `{seq, orders[], families[]}`.
- `accepted.jsonl` / `journal.jsonl` — 채택·판정 로그.

### A-4. 주문 1장 처리 흐름 ✅ (`processOrder` harness2.js:98)

```
order
 → makeCall(order)                         # 역할별 transport 콜 바인딩
 → cs.sampleCards(order, tdf)               # 공존 카드(실존 인물)+쌍둥이 샘플. 카드 0 → skip
 → 구조 분기 (harness2.js:103)
     normal → runDebate   : 사주교수 ↔ MBTI교수 4턴 핑퐁 + 서기(synth) 1콜   [5콜]
     solo   → runSolo     : 단독 1콜
     sweep  → runSweepDebate : 단일 sweep 1콜                                [1콜]
 → (sweep면) out.tags := order.tags 강제 고정 (LLM 키워드 차단, harness2.js:112)
 → validOutput 가드 (debate.js:55)          # name/mechanism/falsify/tags2~4. 소멸선언은 통과
 → 소멸선언이면 → journal 'extinct' + sweepResult('소멸')  (harness2.js:116)
 → arbiter.judge(order, out, cards+twins, accepted, tdf)   # 접지3중·tier·impact·dedup
 → reject면 1회 재토론(harness2.js:123) → 재reject = skip
 → decide()
```

### A-5. 판정 반영 ✅ (`decide` harness2.js:132)

- **accept** → accepted push·jsonl append·upload·dedup guard 갱신·journal.
  - sweep 셀이면 → `sweepResult('채택', mechanism)`.
  - **비-sweep & tier==='S' & !pilot** → `sw.trigger(rec)` 로 파생 family 충전 (harness2.js:141).
- trash / drop-c / skip / reject → 카운트 + journal.

### A-6. 파생(sweep) 세부 ✅ (`sweep.js`)

**트리거** (`trigger` sweep.js:69):
- `tier==='S'`만 (sweep.js:71). A/B/C 안 함.
- `derived_from` 있으면 차단 — **1세대 가드, 연쇄 금지** (sweep.js:72).
- `parseFalsifyAxis(falsify)` — 부모 **falsify 문장**에서 축 키워드 탐지, **첫 등장 축 1개만** 채택. 복수면 첫 축만, **잔여 축은 로그만 하고 무시** (sweep.js:75). 축 못 찾으면 **스킵**(강제 선정 금지, sweep.js:74).
- 축 = {strength, cf, kts, dwss, sess, yongshin_el} (sweep.js:13).
- `sweepCells` — 그 축의 **부모 값 제외 다른 값들**(3~5칸). 예: strength면 {극신강·신강·중화·신약·극신약}−부모값.
- 각 칸: `holders(tdf, newTags)`로 support 계산. support 0이면 `skipped='실존없음'`. 칸을 `sweep_queue.orders`에 적재(kind='sweep', structure='sweep').

**셀 처리**: 일반 주문과 동일 경로지만 `runSweepDebate`(단일 콜) + `sweepPrompt`(개방형, **부모 name/scene/falsify/tier 미주입** — formats.js:60). 출력은 발현/변형/역전(=패턴) 또는 `{소멸선언:true}`.

**집계** (`aggregate` sweep.js:116, 전 칸 완료 시):
- 전부 소멸 → `falsifyVerified:true` → 부모 `falsify_verified=true` 역기록 (harness2.js:170).
- 전부 채택 → `homogeneity` **1콜**로 "mechanism들이 구분되나?" → 동질이면 `resubmit:true`.
- 채택+소멸 혼재 → `mixed-ladder`(정상, 강도 사다리).

---

## A-7. 확인된 문제점 (ISSUES)

1. **파생에 적대 토론이 전혀 없음** ✅
   - 셀 = 단일 sweep 콜(페르소나조차 없음). family 집계 = `homogeneity` 단일 콜.
   - 그런데 생존한 파생(특히 **변형/역전**)은 풀에 **정상 패턴과 같은 tier**로 들어감 → 생성단 검증 비대칭(1콜 vs 5콜). 변형/역전은 사실상 새 메커니즘인데 단일 콜 통과.
   - 완화책: arbiter는 정상과 동일(접지/tier/dedup), 1세대 가드, ⚠️③ family 다양성 페널티(family_id 키, TC-13c 기준 추정).

2. **`resubmit`(재심)은 미구현 스텁** ✅
   - `aggregate`가 `{resubmit:true}` 반환(sweep.js:132), 주석은 "파생군 전체(부모 포함) 재심 제출"(sweep.js:131).
   - 그러나 소비처는 **로그 한 줄뿐** (`harness2.js:174` `aLog(...)`). grep 결과 재큐잉/재토론 코드 0. 설계 의도만 있고 wiring 안 됨.

3. **모집단 strength 쏠림** ✅ (별건, 이미 대응 빌드됨 — D 참조)
   - frozen 800명: strength 편차 **34.9배**(극신강 10명). 강도축 파생이 극신강 칸으로 치환 시 support thin/0 → 실존없음 스킵 빈발.

---

## B. 제안 재설계 (PROPOSED) 🔧

### B-1. 핵심 아이디어 — "단일 작성자 사다리(single-writer ladder)"

부모 패턴은 이미 토론으로 *이론*이 검증됨 → 파생은 *발굴*이 아니라 "그 이론이 조건축 따라 어떻게 펴지나" **서술**. 따라서 파생에 토론 불필요. 대신:

> **축당: support 필터 → 비교 사다리 콜 1번 → 분할 → 칸별 판정**

```
S 패턴 채택
 → 축 선정 (현행 parseFalsifyAxis 재사용 — 부모 falsify의 첫 축)
 → support 필터: 그 축의 값들 중 holders>0 인 값만 (예: strength면 극신강 빠질 수 있음)
 → 비교 사다리 콜 1번:
     입력 = 부모 mechanism + [support 있는 값 목록] + 공존 카드
     지시 = "검증된 이론이다. 각 값에서 발현/변형/역전을 서술하라.
             값끼리 명시적으로 차등화하라. 동일하면 '동일' 선언, 성립 안 하면 '소멸' 선언.
             각 값마다 구체 falsify 필수(바넘 금지)."
     출력 = 값별 {name, mechanism, scene, falsify} | {소멸} | {동일}
 → 분할: 값별 결과를 개별 레코드로
 → 칸별 판정: 각 결과를 arbiter.judge (현행과 동일 — tier/impact/dedup 독립)
```

### B-2. 무엇을 대체하나

이 1개 흐름이 현행의 **(per-cell sweep 콜 N개) + (homogeneity 콜) + (미구현 resubmit 스텁)** 을 통째로 대체.

### B-3. 이점

- **차등화가 생성에 내장** → 별도 homogeneity 체크 불필요(겹침·모순이 애초에 안 생김).
- **쿼터**: family당 생성콜 N → **1**. (판정은 칸별 유지 → 총 ~2N+1 → ~N+1.)
- **병렬 fan-out 불필요** → A-2의 RAM 제약 우회(생성 레이턴시가 1콜로 떨어짐).
- 토론 생략의 정당성 = 부모 디베이트가 이론 검증 + arbiter가 산출 게이트.

### B-4. 가드 (필수 유지) 🔧

- **support 사전필터** — 실존 인물 있는 값만 서술(없는 칸 서술 = 허구 양산 방지).
- **falsify + 바넘 컷** — 동질성 독립 교차검증을 잃는 대신, 각 변형에 구체 falsify 강제 + arbiter의 "모든 사주에 통하는 서술=실패작" 컷 엄격 적용.
- **칸별 독립 판정** — tier/impact/dedup 독립 유지.
- **1세대 가드 유지** — 파생의 파생 금지.

### B-5. MBTI 축 처리 🔧 (주의)

- 사용자 요청 "각 MBTI 발현"을 **16종 한 콜**로 넣지 말 것 — 출력 희석·품질 저하·중복(같은 인지기능 공유).
- 패턴의 MBTI 의존은 `cf`/`kts` 태그로 인코딩 → strength와 동일하게 그 축(≤4값)을 사다리.
- (16종 전수는 *발굴*이 아니라 *프로덕션 커버리지* 목적일 때만 별도 검토 — 중복/희석 감수.)

---

## C. 제약 (CONSTRAINTS) — 검증 시 전제

- **구독 쿼터 전용.** 종량 API 키 폴백 절대 금지(`SUBSCRIPTION_ENV`가 키 제거).
- **모델 = claude-opus-4-8** (fable-5 정부 차단 영구). transport 모델 id만.
- **RAM** ~1.4–2GB 여유, claude 1개 424MB → 동시 ~3개 한도.
- **라이브 런 진행 중**(frozen 풀). 코드 변경은 **다음 유지보수/재생성 때** 반영(런 무중단).
- **RO 파일**: public/engine.js·saju.js·service.js 등 + lib/pattern-*.js. 수정 금지.
- 1세대 가드·접지 3중·dedup은 기존 불변식.

---

## D. 이미 빌드됨·이월 (DEFERRED)

- **balanced-v2 샘플링** (`gen-tag-df.js`, commit 5d88770): strength rejection + MBTI 쿼터 균등.
  - 프리뷰 실측: 편차 34.9→2.67배(극신강 10→90), MBTI/kts 균등.
  - frozen 보호 가드(--force 없이 거부). 적용 = 다음 재생성 때(큐 재빌드 동반).

---

## E. 리뷰어에게 — 검증해 줄 것 (OPEN QUESTIONS)

1. **토론 생략의 타당성**: 부모 디베이트 + arbiter만으로 파생(특히 **역전** = 메커니즘 반전)의 검증이 충분한가? 단일 작성자 + 단일 판정자(=2 voice, 적대성 0)가 새 주장을 통과시키는 위험은?
2. **바넘 스무딩**: 한 작성자에게 "5강도 차등화하라" 하면 없는 그라디언트를 지어낼 위험. falsify 강제 + arbiter 바넘 컷이 이걸 실제로 막는가? 독립 homogeneity 체크를 없애도 되나?
3. **MBTI 축**: cf/kts(≤4)로 좁히는 게 맞나, 아니면 16종 전수가 필요한 유스케이스가 있나?
4. **판정 배치 여부**: 칸별 판정 유지 vs 1콜 배치 판정(쿼터 더 절약하지만 per-cell dedup/tier 독립성 상실) — 어느 쪽?
5. **잔여 축**(falsify에 잡혔으나 버려지는 2축 이상): 2차 사다리로 돌릴 가치 있나, 조합 폭발 위험 대비?
6. **support 필터 임계**: holders>0이면 충분한가, 최소 N(예: ≥5) floor가 필요한가? (frozen 극신강 10에서 특히)

---

## F. 실측 검증 결과 (프로토타입 v1·v2) + 결정 브리프 (2026-06-14)

격리 프로토타입(`C:\tmp\sweep-ladder-test*.js`, balanced 풀, 실제 Opus 콜, 라이브 무영향)으로 routed-ladder 전 흐름을 2회 실행, 독립 검증자 2명 통과(2차 APPROVE). 부모 = 실채택 H2-OPP-056(A급).

### F-1. 입증된 것 ✅ (A급 부모 데모 기준)
- **Stage0 support 필터** 작동 — floor=8에서 극신강(balanced16/frozen2) 등 thin 칸 정확히 제외.
- **Stage1 ladder** — 단일 콜이 강도값별로 발현/변형/역전을 실제로 차등 서술(바넘 스무딩 없이).
- **Stage2 ROUTER** — v1(힌트無)은 신약 변형을 "사후구제 날조"로 **KILL**(라우터 살상 작동 입증).
- **Stage3 칸별 순차 판정** + 형제 dedup 셋 누적 작동. **Stage4 gradient 감사** 실행됨.
- 비용: family당 ~6–9콜(생성 N→1 절감 확인).

### F-2. 노출된 문제 ⚠️❌
- **❌❌ [최우선] S급 sweep 사실상 inert**: S급 비파생 19개 중 — 7개 parseFalsifyAxis 반사격(falsify 반사실 대조에 격발, 축이 패턴 태그에 없음→skip), 3개 축 미검출, 나머지 9개도 4태그 conjunction이라 support floor 미달. **frozen·balanced 둘 다 실질 sweep 가능 0.** 채택 93%가 4태그. → 800명(또는 balanced 800)으로는 고차 conjunction을 못 지탱. 트리거가 S-only라 **현 파이프라인은 단 1건도 발화 안 함.**
- **🐛 parseFalsifyAxis 반사격**: falsify의 "신강이면 아님" 같은 *대조* 표현에 축이 격발 → 패턴 실제 변이축이 아닌 축을 잡음. 수정: 검출 축은 **패턴 태그에 존재하는 것** 우선(태그에 없으면 다음 축 시도). 현 가드(sweep.js:77)는 skip만 함.
- **⚠️ 라우터 프롬프트 취약**: 용신/기신 힌트 1줄로 신약 verdict가 KILL(v1)↔생존(v2) 뒤집힘. 힌트가 대부분 strength 변화에 적용돼 적대콜을 과관대화. → adversary에 도메인 프리앰블을 **고정**(per-call 주입 금지)해 행동 안정화. 회의/관대 임계는 튜닝값.
- **🐛 arbiter dedup 누수**: 동일 태그 near-dup 주입 시 LLM이 "3분지 패밀리"로 오인해 통과(코드 dupReject 미도달). 실 ladder는 값당 1변형이라 동일값 중복은 자연발생 X(저위험)이나, **인접값 화장 중복**은 Stage4 감사 몫 — 미스트레스테스트.

### F-3. 결정 브리프 (사용자 결정 필요 — 명령서 전)
1. **[차단·범위] 트리거 tier**: S-only = 0 발화. 선택 — (a) S+A로 확대(A는 일부 sweep가능, 단 의도 변경) / (b) 풀 ~5배(≈4000명) 성장까지 대기 / (c) 3태그로 축소 재설계(고차 1태그 드롭, "sweep" 의미 변경) / (d) sweep 보류(쿼터를 1차 생성에 집중). ※ 균형풀(800)도 이 문제 해결 못 함 — 모집단 크기 문제.
2. **[차단·코드] parseFalsifyAxis 반사격 수정**: 축은 패턴 태그에 있는 것 우선. (다음 유지보수)
3. **[비차단·튜닝] adversary 힌트 정책**: 고정 프리앰블 vs per-call. 프로덕션 전 lock.
4. **[비차단·미측정] Stage4 화장 스트레스테스트**: 인접값 화장 중복 1건 주입해 감사가 잡는지 확인(프로덕션 게이트 전).

### F-4. 근본 함의
고특이도(4태그) 패턴의 falsify는 **공존샘플링으로 실측 검증 불가** — 대조 칸에 실존 인물이 없기 때문(800명 한). 즉 채택분 93%의 falsify는 현 방식으론 영구히 "선언"으로 남음. sweep의 가치(falsify 선언→실측)는 저차 패턴에만 유효. 이건 설계 버그가 아니라 모집단 크기의 구조적 한계.
