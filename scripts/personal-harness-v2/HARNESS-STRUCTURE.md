# 현재 하네스 구조 — personal-harness-v2 (사실 스냅샷)

> **이건 v2 제안이 아니라 *지금 돌아가는 시스템*의 사실 기록.** 수정해서 들고오기 위한 베이스.
> `file:line`은 실측. 추정은 ⓘ로 표시. 이슈는 §14.

---

## 0. 한 줄 정의

생일+성별+MBTI로부터 사주·MBTI 태그를 실계산한 **합성 모집단 800명**(`lib/tag-df.json`)을 근거로,
LLM **두 교수(사주↔MBTI) 디베이트 → 판정자 채점 → 적재**를 돌려 사주×MBTI 교차 패턴을 생성하는 자율 하네스.
산출(채택 패턴)은 production 앱(`public/pattern-data.js`)의 프리미엄 풀로 들어감. **구독 쿼터 전용**(opus-4-8).

---

## 1. 파일·컴포넌트 맵

```
scripts/personal-harness-v2/
├ harness2.js          메인 오케스트레이터 (--pilot | --run [--subjects CODES])
├ debate.js            디베이트 3종: runDebate(4턴) / runSolo / runSweepDebate
├ transport.js         LLM 호출 (claude.exe -p --model opus-4-8, spawnSync)
├ card-sampler.js      주문서 → 실존 카드 + 쌍둥이(트윈) 샘플
├ sweep.js             파생(sweep): S급 falsify 축 치환 검증
├ slow-loop.js         느린 루프 — 반려 사유 누적 → 교정지시(correction)  ⓘ
├ balance-guard.js     채택 strength 분포 가드 → 대기 큐 재정렬
├ arbiter/
│  ├ arbiter.js        판정자 1인 (접지·tier·impact·dedup·파생군)
│  └ theory-lookup.js  이론 사전 발췌(드리프트 판정용)  ⓘ
├ observer/observer.js 체크포인트(30장) 관찰자 — 산출 격리(토론 미주입)
├ prompts/formats.js   시작형식 5종·페르소나·OUTPUT_SPEC·sweepPrompt
├ merge-accepted.js    워커별 accepted 병합 → merged_pool.jsonl
├ launcher_w1/w2/w3.bat 워커 런처(루프·재기동·exit코드 처리)
└ state/ , state_w2/ , state_w3/   워커별 상태(§2.3)

lib/  (RO — 수정 금지)
├ tag-df.json          모집단 800명 (frozen, seed 20260613)
├ saju-core.js / saju-analysis.js   사주 엔진 (strengthGrade 등)
├ mbti-profile.v2.js   MBTI cf 스택
└ ai-client.js         parseAIResponse (4단 JSON 파서)

scripts/vocab/
├ gen-tag-df.js        모집단 생성 (balanced-v2, commit 5d88770)
└ build-user-tags-v2.js  유저별 태그 실방출

public/pattern-data.js (RO) production 풀(841) + matchPatterns + buildPatternPrompt
```

---

## 2. 데이터 모델

### 2.1 `lib/tag-df.json` (모집단, frozen)
```
{ meta, vocab, df, users[800] }
user = { uid:"U000", birth:"1978-10-19", hour, min, gender:"남성", mbti:"INTJ", tags:[...] }
```
- `tags` = 엔진 실방출 unique. prefix: `strength: dwss: sess: ss: gyeokguk: unsung: sinsal: tongbyeon: relation: yongshin: dm: cf: fx: kts: axis: uses: pillar:` 등.
- `df` = 태그별 보유율(0~1). `vocab` = prefix별 값 목록.
- 강도 어휘: strength 7종(극신강/신강/중화/신약/극신약 + 신강+/신약+ 그룹). MBTI: cf 8 / fx 24 / kts 4 / axis 4(전원보유=변별0).

### 2.2 오더 큐 `state/queue_{CODE}.json`
```
order = { order_id:"DWF-001", pattern_id:"H2-DWF-001", subject:"대운 흐름",
          tier:"T1|T2|T3", kind:"anchor", anchor:"dwss:겁재",
          tags:[...], support:38, strataCell:"신약",
          format:"장면|쌍둥이대조|시간서사|반박라운드|하이브리드",
          structure:"debate|solo" }
```
- 14 큐(소주제별), 총 ~1928 오더. 태그수 분포: 2태그 886 / 3태그 500 / 4태그 542 (오더는 저차 다수).
- 공존샘플링으로 사전 생성됨. tier T1/T2/T3 = 처리 우선순위.

### 2.3 워커 상태 디렉토리 (`state/`, `state_w2/`, `state_w3/`)
```
harness_state.json   { processed, rejected, skipped, trash, dropC, accepted[], done{}, guard{}, slow{}, cpNo }
journal.jsonl        판정 1줄/주문 { at, order_id, subject, decision, reason, format, structure }
accepted.jsonl       채택 레코드(아래 스키마) append
sweep_queue.json     { seq, orders[], families[] }
quota.json           { calls, tokensIn, tokensOut, rateLimitHits }
transcripts/{CODE}/{order_id}.jsonl   디베이트 전사(턴별 { at, role, model, tokens, ms, text })
reports/checkpoint_NNN.md             체크포인트 보고서
snapshots/cp_NNN/                     30장마다 핵심파일 사본
observer/cp_NNN.md                    관찰자 보고
pending_upload.jsonl                  Supabase 보류분
auto_decisions.log                    자율주행 결정 로그
```
**공유(SHARED=state/)**: queue_*.json, subj_codes.json, calibration.json, premium_index.json, strata.json, pool_freeze.json — 워커 전부 *읽기*. 쓰기는 각자 STATE(H2_STATE env).

### 2.4 채택 레코드 스키마 (arbiter.js:124)
```
{ id, subject, tags, name, mechanism, scene, falsify, format, order_id,
  support, tier, impact, variations, model, transport,
  family_id, derived_from, sweep_axis }
```
- production 스키마({id,tier,name,tags,saju,mbti,cross,impact})와 **불일치** — mechanism/scene/falsify vs saju/mbti/cross (§14).

---

## 3. 실행 파이프라인 (메인 루프, harness2.js:215 `main`)

```
1. 부팅: harness_state 로드. 큐 적재(loadQueues:192 — 담당 소주제만, tier 정렬).
2. _aborted 처리(219): 저널에 없는데 전사 존재 = 중단분 → *_aborted 리네임 후 재토론.
3. for 각 주문(228):
   - done이면 skip(재개).
   - processOrder(order)   ← 핵심(§3.1)
   - 인터리브(234): 메인 5장마다 sweep 사이드 큐 1장 처리 (INTERLEAVE=5)
   - 30장마다(239): checkpoint(72) + balance-guard 대기큐 재정렬(244)
   - 매 주문 harness_state 저장
4. exit 코드: 0=완료 / 9=MODEL_UNAVAILABLE(하드정지,재기동X) or rate 24h / 7=QUOTA_WAIT(1h 후 재기동) / 1=비정상
```

### 3.1 주문 1장 처리 (processOrder, harness2.js:98)
```
order
 → makeCall(order)                     역할별 transport 콜 바인딩
 → cs.sampleCards(order, tdf)          공존 실카드 3장 + (필요시)쌍둥이. 카드0 → skip
 → sl.correction(slow)                 느린 루프 교정지시(있으면 시스템 말미 1줄)
 → 구조 분기(103):
     structure==='sweep' → runSweepDebate(parent_mechanism, tags, cards)   [단일 콜]
     structure==='solo'  → runSolo(order, cards, twins)                    [단일 콜]
     else                → runDebate(order, cards, twins)                  [4턴+서기]
 → (sweep) out.tags := order.tags 강제(112, LLM 키워드 차단)
 → validOutput(out) 가드(debate.js:55): name/mechanism/falsify/tags2~4. 소멸선언은 통과
 → 소멸선언이면 → journal 'extinct' + sweepResult('소멸')
 → ar.judge(order, out, cards+twins, accepted, tdf, call)   판정(§6)
 → reject & !_retried → 1회 재토론(123) / 재reject → skip
 → decide(st, order, verdict)          반영(§3.2)
```

### 3.2 판정 반영 (decide, harness2.js:132)
- **accept**: accepted push, accepted.jsonl append, upload 보류, balance-guard onAccept(tags), journal.
  - sweep 셀이면 sweepResult('채택', mechanism).
  - **비-sweep & tier==='S' & !pilot → sw.trigger(rec)** (파생 family 충전, §7).
- **trash** / **drop-c**(C tier 미적재) / **skip** / **reject** → 카운트 + journal.

### 3.3 체크포인트 (checkpoint, harness2.js:72)
- 보고서 `reports/checkpoint_NNN.md` 작성(80) **← reports/ mkdir 안 함(§14 버그)**.
- 스냅샷 `snapshots/cp_NNN/`(83, mkdir 함). 관찰자 observer.run(별도).
- 대기 없이 계속(§0-α).

---

## 4. 디베이트 상세 (debate.js)

### 4.1 정상 (runDebate:10) — 4턴 핑퐁 + 서기
| 턴 | role | 페르소나 | 지시 |
|---|---|---|---|
| 1 | debate-saju | PERSONA_SAJU | 사주 체계로 첫 발언 |
| 2 | debate-mbti | PERSONA_MBTI | 응답(동의/반박+근거) |
| 3 | debate-saju | | MBTI 응답에 답, 논점 좁힘 |
| 4 | debate-mbti | | 핵심 합의/이견 정리 |
| 산출 | debate-synth | (서기) | "살아남은 결론만 조립, 새 주장 금지" → OUTPUT_SPEC JSON |
- MAX_TURNS=4. 전사 누적 재전달(b전략).

### 4.2 단독 (runSolo:41) — solo 1콜 (혼자 양 체계 교차검증)
### 4.3 파생 (runSweepDebate:48) — **sweep 1콜** (양교수 디베이트 *없음*). sweepPrompt = 부모 mechanism + 치환조건 + 카드 → 발현/변형/소멸/역전.

### 4.4 시작형식 5종 (formats.js OPENERS)
`장면 / 쌍둥이대조 / 시간서사 / 반박라운드 / 하이브리드`. 형식은 오더가 지정(체크포인트마다 형식 가중 ⓘ).

### 4.5 OUTPUT_SPEC (formats.js:46)
```
{ name, mechanism, scene(장식), falsify(반대조건 1줄), tags(2~4, 카드 보유 태그로 교체·추가 가능) }
```
→ "추가 가능"이 4태그 패딩 유발(§14).

---

## 5. 카드 샘플러 (card-sampler.js) — ★트윈 테스트의 출처

- `sampleCards(order, tdf)`(53): 오더 태그 *전부 보유*한 유저 필터 → 시드 랜덤 3장(CARDS_PER_ORDER=3). 카드 = `{uid, mbti, tags}`(생년월일 폐기).
- **쌍둥이(twins)**: 형식이 `쌍둥이대조`/`하이브리드`일 때만(73). 첫 카드의 **MBTI 4축 전부 플립**(flipMBTI) → *같은 사주·MBTI만 다른* 가상인물. engineTags로 실계산.
- → **이게 "MBTI가 사주 결과를 바꾸나?" 반증 도구.** 쌍둥이가 같은 해석 = MBTI는 그 사건 원인 아님(드리프트).

---

## 6. 판정자 (arbiter/arbiter.js:76 `judge`)

```
1. tagsValid(40): tags 2~4 & 전부 카드 union 보유. 위반 → reject(coded)
2. prefilter(24): 같은 소주제 + 태그 2+ 겹침 후보 (기채택 accepted + premium_index 336). 최대 12
3. theory-lookup.extract: 이론 사전 발췌(드리프트 판정 재료)
4. LLM judge 1콜(judgePrompt:56): 캘리브(기존 풀 tier/impact 분포) + 후보 + 이론 →
     { verdict:"통과|반려|스킵", reason, tier:"S|A|B|C|TRASH", impact:1~10, duplicateOf }
   반려 축: 병렬/평면/바넘/드리프트
5. 코드 검증: tier 유효 / TRASH→trash / C→drop-c(미적재) / impact 1~10 정수 /
   pattern_id 정규식 /^H2-[A-Z]{3}-\d{3,}$/ / idClash(중복 id)
6. 중복·파생군 분기(107): duplicateOf 지목 시 태그겹침으로 코드판정 —
     겹침 ≥ min(len) → 중복 reject / 아니면 family_id = 후보 id (파생군)
7. recalcSupport(47): 최종 태그 기준 holders 재계산
8. record 생성(124) → accept
```
- 적재 컷 LOAD_CUT = S/A/B (C·TRASH 미적재).
- **calibration.json + premium_index.json은 `../state`에서 로드(9~11) — H2_STATE 무시, 항상 라이브**(§14).

---

## 7. 파생 (sweep.js)

- `trigger(parentRecord)`(69): **tier==='S'만**. `derived_from` 있으면 차단(1세대, 연쇄금지).
- `parseFalsifyAxis(falsify)`(23): 부모 falsify에서 축 키워드 **첫 등장 1개**(strength/cf/kts/dwss/sess/yongshin_el). 복수면 첫 축, 나머지 로그만. 못 찾으면 스킵.
- `sweepCells(axis, parentTag)`(43): 그 축의 **다른 값들**(부모값 제외, 3~5칸). 예 strength→{극신강·신강·중화·신약·극신약}−부모.
- 각 칸: holders로 support 계산. support 0 → '실존없음' 스킵. sweep_queue.orders에 적재(structure='sweep').
- 셀 처리: runSweepDebate(단일 콜) → arbiter 판정(정상과 동일).
- `aggregate(family)`(116, 전 칸 완료 시): 전멸(소멸)→부모 falsify_verified / 전부생존+동질→resubmit:true(**미구현 스텁**, §14) / 전부생존+구분 / 혼재(강도사다리).
- SWEEP_TIER_MIN='S'.

---

## 8. 워커 병렬 구조

- 소주제 14개를 3워커로 분할(ASCII 코드로 `--subjects`):
  - **W1** `state/` : OPP,YAD,MNY,JOB
  - **W2** `state_w2/` : DWF,STR,LIF,MAT,PSN
  - **W3** `state_w3/` : YKW,LVM,IMG,LVS,FIX
- 각 워커 = 독립 node 프로세스. `H2_STATE` env로 STATE 격리. 큐·캘리브는 SHARED(state/) 읽기.
- launcher_wN.bat: `:loop` → node 실행 → exit코드 분기(9=종료 / 0=종료 / 7=3600s 대기 후 재기동 / else=60s 후 재기동).
- 워커 내부는 **순차**(transport spawnSync=블로킹). 동시 claude = 워커당 1 → 3워커 동시 3.
- merge-accepted.js: 종료 후 워커별 accepted 합집합(소주제 비중첩이라 충돌0) → merged_pool.jsonl.
- 소주제 코드(ASCII): FIX·OPP·PSN·STR·IMG·DWF·MNY·LVS·LVM·YAD·YKW·LIF·MAT·JOB.

---

## 9. transport (transport.js) — LLM 호출

- `call(role, prompt, opts)`(90): `spawnSync(claude.exe, ['-p','--model','claude-opus-4-8'], {input:prompt, cwd:C:\tmp, timeout 240s, env:SUBSCRIPTION_ENV})`.
- **SUBSCRIPTION_ENV**(20): ANTHROPIC_API_KEY / AUTH_TOKEN / CLAUDE_API_KEY *삭제* → OAuth 구독만(종량 과금 차단).
- CLAUDE_BIN: `~/.local/bin/claude.exe`(네이티브) 우선, 없으면 claude.cmd(shell).
- isModelUnavailable(48): 모델 안내문 감지 → MODEL_UNAVAILABLE throw(하드정지9). isRateLimited(42): rate/quota/429 → QUOTA_WAIT(코드7).
- expectJson 시 ai.parseAIResponse(4단 파서) + 1회 재시도.
- effort/thinking 파라미터 미설정(기본). 역할별 세션 분리(sessions{}).

---

## 10. 부속

- **observer/observer.js**: 체크포인트(30장)마다 판정 메타(전사 아님)로 편향·미개척·융합가설 1콜 보고. 산출은 `state/observer/`에만 — **토론에 어떤 경로로도 미주입**(Goodhart 방지). 환류는 사람 경유만.
- **slow-loop.js** ⓘ: 반려 사유 누적 → correction(교정지시) 생성, 디베이트 시스템 말미 1줄로만.
- **balance-guard.js**: 채택 strength 분포 추적, 쏠리면 대기 큐 재정렬(rebalance) + balance log.

---

## 11. 모집단 생성 (scripts/vocab)

- **gen-tag-df.js**: 800명 생성. **balanced-v2**(commit 5d88770): strength rejection-sampling(버킷 쿼터) + MBTI 16종 쿼터 균등. SEED=20260613, BASE_YEAR=2026, birthRange 1960~2007, hourNull 10%. **frozen 보호 가드**(--force 없이 lib/tag-df.json 덮어쓰기 거부). ※ 현 라이브는 *원본*(쏠린) frozen 사용 중, balanced는 미적용.
- **build-user-tags-v2.js**: saju+gg+dw+mbti → 유저 태그 실방출(합성 금지).

---

## 12. production 연동 (public/pattern-data.js, RO)

- `MBTS_PATTERNS = { premium: { "<소주제>": [패턴...] } }` 총 841.
- 패턴 스키마: `{ id, tier, name, tags, saju, mbti, cross, impact }`. (mbti 빈값 0 — 사주단독은 `": 없음"` 160개)
- `matchPatterns(cat, subj, userTags, limit, 'multiply')`(12841): tag overlap × impact 정렬, id 중복만 제거.
- `buildPatternPrompt(cat, userTags)`(12902): 소주제별 top10, 셔플 → `- name / 사주조건:saju / MBTI조건:mbti / 교차해설:cross` 렌더.
- impact 분포(841): 3~10 정상 분산(7이 최빈 36%).

---

## 13. 주요 상수·설정

| 상수 | 값 | 위치 |
|---|---|---|
| 모델 | claude-opus-4-8 | transport.js:15 |
| 콜 타임아웃 | 240s | transport.js:16 |
| CP_EVERY | 30 | harness2.js:24 |
| INTERLEAVE (메인:사이드) | 5:1 | harness2.js:25 |
| ORDER_T | T1,T2,T3 | harness2.js:23 |
| MAX_TURNS | 4 | debate.js:7 |
| CARDS_PER_ORDER | 3 | card-sampler.js:14 |
| 모집단 N / SEED | 800 / 20260613 | gen-tag-df.js |
| LOAD_CUT | S/A/B | arbiter.js:14 |
| SWEEP_TIER_MIN | S | sweep.js:10 |
| tier / impact | S/A/B/C/TRASH / 1~10 | |

---

## 14. 알려진 이슈 (이 세션 발견 — 수정 후보)

| # | 이슈 | 근거 |
|---|---|---|
| 1 | **reports/ mkdir 누락** → 신규 워커가 체크포인트(30장)마다 ENOENT 크래시(exit1). | harness2.js:80 (snapshots는 84서 mkdir). *폴더 생성으로 임시 차단함* |
| 2 | **impact flat-7** — 채택 292개 중 7이 79%(범위 5~8). 매처 overlap×impact의 impact 항 사실상 죽음. | verify/summary |
| 3 | **support 과적합** — 중앙값 4, 최소 0. 4태그 패턴의 76%가 support<8. | |
| 4 | **4태그 패딩** — 오더는 2~3태그 다수인데 synth가 +1~2 추가(61%) → 4태그 93%. | OUTPUT_SPEC "추가 가능" |
| 5 | **MBTI 저융합** — 69% 사주단독(MBTI 태그 0). 기존 풀(~19% 사주단독)보다 심함. | 어휘 카디널리티 격차(사주≫MBTI) |
| 6 | **sweep 실발화 ~0** — S급 19개 다 4태그라 치환 칸 support 미달 + parseFalsifyAxis 반사격(7/19, falsify 대조표현에 격발). 파생27 falsify_verified0. | sweep.js |
| 7 | **죽은 축**: resubmit(스텁,소비처0) / family_id 다양성페널티(소비처0) | harness2.js:174, grep |
| 8 | **arbiter STATE 하드코딩** — calibration/premium_index를 항상 ../state서 읽음(H2_STATE 무시). | arbiter.js:9 |
| 9 | **파생에 적대 디베이트 없음** — sweep=단일콜. 변형/역전도 단일콜로 풀에 진입. | debate.js:48 |
| 10 | **MBTI 교수 역할 모호** — 정상 디베이트엔 있으나, 수용분할(v2 제안) 템플릿화 시 분할변수로 전락 우려. | 설계 논의 |

---

## 15. 검증 산출물 (현 풀 실측, 참고)

- `verify/summary.md` — 292패턴 tier/impact/소주제 분포
- `verify/patterns.md` — 채택 전수(기제+반증)
- `verify/sample-debates.md` — 대화 전문 4건
- `SWEEP-REDESIGN.md` — 파생 재설계(별 트랙)
- `SPEC-reception-fusion-v2.md` — 수용층 융합 v2 제안(별 문서)

---

## 16. 흐름 요약도

```
모집단(tag-df 800)
   │ 공존샘플링(사전)
   ▼
오더 큐(queue_*.json, ~1928, tier T1/T2/T3)
   │ 워커3 분할(소주제)
   ▼
[processOrder]  카드샘플(+트윈) → 디베이트(사주↔MBTI 4턴+서기 / solo / sweep단일)
   │ validOutput
   ▼
[arbiter] 접지·tier·impact·dedup·파생군 → accept/reject/skip/trash/drop-c
   │ accept
   ├─ accepted.jsonl  (+ S급이면 sweep.trigger → 사이드큐)
   ▼
30장마다 checkpoint(보고서·스냅샷·observer) + balance-guard 재정렬
   ▼
(종료 후) merge-accepted → merged_pool.jsonl → ③ production 풀 인계
```
```
```
