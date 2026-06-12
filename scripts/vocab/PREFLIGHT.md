# 명령서① REV2 preflight 결과 — vocab-wiring (2026-06-13)

자율 주행 모드: 전 항목 PASS → 구현·산출 자동 진행 완료. §5 인터페이스 체크는 본 문서 말미.

## §3 preflight 체크리스트

| 항목 | 결과 | 실측 |
|---|---|---|
| 금지 5종 + 런타임 RO unmodified | **PASS** | git diff 0 (TW-8a에서 기계 검증 — engine/saju/service/bundle/login + lib 3종) |
| 확정 반영 확인 (sess 채택·앵커 분담 / fx 위치 기반) | **PASS** | sess: 10서랍 방출 구현, fx: STACK dom/aux/inf 3슬롯·tert 제외 (TW-5) — W-D2 확정안과 일치 |
| dw 인자 실데이터 구조 덤프 (표본 3명) | **PASS** | `{direction, daewoonAge, daewoons[8]:{startAge,endAge,gan,ji,ganH,jiH,ss,oh}, currentDWIdx, seun[2], currentAge}` — dwss 경로 = daewoons[현재].gan/ji → getSipsung(천간) + 지장간 정기(지지). currentDWIdx·seun은 new Date 의존 → 래퍼가 baseYear 파라미터로 재계산(TW-3d·e) |
| yongshin 자유 문자열 수집 → 추출 규칙 + 실패율 | **PASS** | 800명 원문 **99종** (W3 명기 96종과 근접 — 모집단 차이), 템플릿 5형 확인(조후형 "갑목(경작)+계수+병화"는 grep 미포착 신규 발견). 규칙 5단계(조후 천간+오행 / 통관 오행단독 / 흐름 도착십성 / 병렬 첫항 / 십성시작) — **실패율 0.0%** (state/yongshin_raw.json) |
| 기존 axis: 동적 방출 분포 → mbtiaxis 자동 판정 | **PASS(판정 완료)** | W5의 "axis:{축}{suffix} 동적 방출"은 **실재하지 않음** — buildUserTags는 고정 4종(EI/SN/TF/JP) 무조건 방출뿐(L12789-12792), 800명 전원 보유(변별 0). 판정 = `axis-fixed-4-registered--mbtiaxis-deferred`: 강도 칸 미제공 + 모집단 intensities=null이라 mbtiaxis:{축}_{강도} 신설 불가 → 기존 axis: 4종 vocab 등재(② "mbtiaxis-또는-axis" 충족), 신설은 유저 실강도 축적 후 재검토 이월(fx 점수 컷과 동일). state/auto_decisions.log 기록 |
| 매처 generic 제외 prefix 확정 | **PASS** | `uses:` `ref:` `pillar:` 3종 (isSpecificTag L135-137 실측 — 주석은 2종, 코드가 진실). tag-df meta.genericPrefixes에 기록 — ② 큐가 이 목록 소비 |
| 시드 값 확정 | **PASS** | **SEED = 20260613** (이후 ②·③ 전 단계 동일 시드). baseYear = 2026 동시 고정 — tag-df meta 기록 |

## 테스트 결과 (TW-1~8 전체 PASS)

- TW-1 무변형 50명: V2 산출 − 신규 prefix = 기존 buildUserTags 산출, diff 0
- TW-2 전수 무에러: 800명 에러 0, 태그 0개 유저 0, uid 중복 0
- TW-3 dwss·sess 정합 10명: 대운 선택=엔진 currentDWIdx 일치(a) / 세운 간지=calcDaewoon seun[0] 일치(b) / 천간십성=엔진 기계산 ss 일치·지지 정기십성 수계산 일치(c) / baseYear=2027 재산출 가능(d) / 2027=정미 확인(e)
- TW-4 yongshin_el: 원문 99종 실패 0종, 5칸 전부 보유자 ≥1 (토 17명이 최소)
- TW-5 fx: 16타입 × 정확히 3슬롯, tert 미방출, 8기능×3위치 = 24칸 완전 등재
- TW-6 axis 대조: 4종 전원 100% — 변별 0 확인, mbtiaxis 판정 meta 기록
- TW-7 df 자기 정합: 285태그 전수 users 재계산과 일치
- TW-8 라이브 회귀: RO 8종 git diff 0 + 신규 태그 포함/제외 matchPatterns 결과 10명×2소주제 완전 동일 (audit에서 3200/3200 동일 재확인)

## 산출물

| 파일 | 내용 |
|---|---|
| `lib/tag-df.json` | meta(시드·엔진커밋 1fca697·baseYear·genericPrefixes·mbtiaxis 판정) + vocab(전 prefix 값 목록) + df(285태그 보유율) + users(800명 — birth/hour/gender/mbti 보존: ② 쌍둥이 엔진 실계산용) |
| `scripts/vocab/build-user-tags-v2.js` | 4축 래퍼 (기존 방출 무변형) |
| `scripts/vocab/gen-tag-df.js` | 모집단 생성기 (시드 결정적) |
| `scripts/vocab/matching-audit.js` + `audit-report.txt` | 죽은 태그 양방향·4축 커버리지·T1 시뮬 — ③ 인계물 |
| `scripts/vocab/state/` | yongshin_raw.json · gen_report.txt · auto_decisions.log · test_log.txt |

## 주요 발견 (③ 인계 + 라이브 개선 후보)

1. **F1 베이스라인 갱신** (spec-hit 기준, 현 풀): 올해 조언 generic-fill **86.9%**(≥2 유저 **0.0%**) / 대운 흐름 62.8%(≥2 58.1%) / 올해 키워드 41.5% / 기회의 시기 27.5%. 명령서 F1(90~100%)보다 완화된 것은 당일 풀 변동·측정 정의 차이 — 방향 동일, 올해 조언이 최악인 구조 불변.
2. **패턴측 죽은 태그 36종** (premium 112종 중 32%) — ref:MT_* 16종, uses:sewoon(37슬롯)·uses:job(24슬롯) 등 구조적 미방출 30종 + 모집단한계(intensities) 4종 + 방출버그 2종.
3. **temperament SJ/SP 방출 버그**: buildUserTags L12767 `substring(1,3)`은 ISTJ→"ST"라 S기질을 영원히 미포착 — temperament:SJ/SP 패턴 슬롯 2개 사장. 런타임 RO이므로 보고만(수정은 별도 게이트).
4. **condition:패격 서버 미방출**: analyzeGyeokguk 반환에 isPagyeok 필드 없음(pagyeokInfo만) — buildUserTags L12658 조건 불성립.
5. **유저측 죽은 태그 160종** — yongshin: 99종(W3 재현) 외 cf:Ni/Se/Si/Te/Ti, strength:신강/신약(패턴은 +형·극형만 사용), dm: 9종 등 — ③ 매칭 v3 설계 입력.

## §5 ②와의 인터페이스 체크 (완료 조건)

- [x] `lib/tag-df.json` 존재 + fx/dwss/**sess**/yongshin_el/**axis**(mbtiaxis-또는-axis) 등재 — vocab에 5축 전부 (mbtiaxis는 판정에 따라 axis 4종으로 충족)
- [x] `users` 800명 — uid+tags(unique) + birth/hour/min/gender/mbti, ② 공존 샘플링·support 재계산 코드 수정 없이 소비 가능
- [x] dwss·sess 전 서랍(각 10칸) 보유자 ≥1 — 최소 134명/칸 (V1 10서랍×13장 앵커 생성 가능)
- [x] audit-report — 죽은 태그 목록 ③ 인계 준비 완료

**4항목 전부 PASS → §0-α에 따라 명령서② preflight 자동 연계 대상.**
