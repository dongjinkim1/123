# 하네스 전체 코드 리뷰 — 2026-06-13 (동진 요청)

라이브 운영 중 전 컴포넌트 정독 리뷰. 명확한 버그는 수정·테스트 완료, 위험/이득 따져 보류한 건은 NOTE.

## 라이브 풀 건강도 (실측, 저널 53건 시점)
- 채택 46 / 반려 5 / 스킵 2 = **채택률 87%**
- **dedup 중복 반려 3건** — 반복 패턴이 실제로 걸러지고 있음(동진 "비슷한거만" 우려에 대한 직접 반증)
- 파싱실패 0 (fable outage 복구 후 깨끗) / 최근 20건 채택18·스킵2·반려0
- 모델 출처: model 필드로 fable 41 / opus 신규 구분, family_id로 파생 추적

## 수정 완료 (테스트 통과, 다음 재기동 시 활성)

### [HIGH] 1. 스윕 파생 family_id 누락 → ③ 다양성 페널티 무력
- 증상: 파생(OPP-513·514)이 derived_from은 있는데 family_id=null. ③의 "같은 family_id 동시선택 페널티"가 family_id 기반이라 부모+파생이 한 유저 top-N에 같이 뜰 수 있음(명령서 D11 §8 "파생 도배" 리스크 현실화).
- 수정: arbiter `family_id = familyId || derived_from || null` (스키마 정의 "파생 경로=부모 id"와 일치)
- ③ 인계 규칙: **family 루트 = `family_id || derived_from || id`** (기존 파생 2건은 derived_from으로 자동 커버 — 위험한 백필 불요)
- 회귀: TC-13c 신설

### [HIGH·잠복] 2. arbiter id 정규식 `\d{3}` → 스윕 seq 1000+ 전량 반려
- 증상: `/^H2-[A-Z]{3}-\d{3}$/`는 정확히 3자리만 허용. 스윕 seq는 전 소주제 공유·500부터 시작 → S 패턴 ~120개 더 나오면 seq 1000 돌파 → 이후 **모든 파생이 "id 위반" 반려**(며칠 내 도달 가능). 메인 큐는 소주제당 <1000이라 안전.
- 수정: `\d{3,}` (3자리 이상 허용). 회귀: TC-13c-id4 신설

### [LOW] 3. model 폴백 문자열 stale
- `r.model || 'claude-fable-5'` → `'claude-opus-4-8'`. r.model은 transport가 항상 세팅하므로 실발동 0(위생 수정).

## NOTE — 보류 (위험/이득 판단)

### [LOW·자가치유] 4. 크래시 중복 창
- decide()가 accepted.jsonl append → (수 µs 후) harness_state 저장 순서. 그 사이 크래시 시 해당 주문서가 재토론 → 같은 id 중복 → **라이브 dedupeById가 로드 시 자동 제거**. 확률 ~1e-6, 자가치유. 근본 수정(startup에 accepted.jsonl 정본 재로드)은 falsify_verified 인메모리 플래그 회귀 위험이 있어 보류.

### [PERF] 5. harness_state.json O(n²) 쓰기
- 매 주문서마다 커지는 accepted[] 전체를 JSON으로 재기록 → 본 실행 종료 시점 누적 ~GB급 디스크 쓰기. 정합성 문제 아님(쓰기 낭비·주문서당 수십ms). 권고: 유지보수 재기동 시 startup에 accepted.jsonl에서 재구성 + harness_state에서 accepted 제거. 지금은 미적용(재개 로직 변경 = 라이브 리스크).

### [LOW] 6. 쿼터 소진 감지 미검증
- isRateLimited = `usage limit|quota|exceeded|rate limit|429|overloaded` — CC 구독 소진 메시지를 잡을 가능성 높으나 정확한 문자열 미확인. 미스 시 code1 → launcher 60s 재기동(새 코드 로드)으로 1~2사이클 내 자가보정. 광범위 정규식 확장은 **정상 산출 오탐→영구 stall** 위험이 커서 보류. 액션: 첫 실제 쿼터-hit 때 launcher_out.log에서 정확한 문자열 캡처 후 튜닝.

### [LOW] 7. dedup 후보 12개 상한
- prefilter `cands.slice(0,12)`. 같은 소주제·태그 2+ 공유 패턴이 12개 초과면 그 너머 중복 누락 가능. 라이브 dedupeById + ③ 재랭크가 백스톱. 프롬프트 크기 트레이드오프라 유지.

### [관찰·설계대로] 8. dwss 앵커 서랍 클러스터링
- 기회의 시기 앵커축 dwss가 balance-guard 축(strength/dm/kts/cf/ss)에 없음 → 서랍 순차 처리로 겁재→비견→… 묶여 보임. 메커니즘은 구분됨(중복 3건은 걸러짐). 단일 유저 노출은 ③ 다양성 재랭크가 제어. 버그 아님.

## 적용
모든 .js 수정은 실행 중 프로세스(구 코드 로드됨)에 무영향 — **다음 launcher 재기동 시 활성**. 강제 재기동 불요(2번 잠복버그는 seq 1000까지 며칠 여유, 1번은 그동안 ③ derived_from 규칙이 커버, 6번은 재기동이 자가보정). 즉시 활성 원하면 강제 재기동 가능(비용: 진행 중 1주문서 재토론).
