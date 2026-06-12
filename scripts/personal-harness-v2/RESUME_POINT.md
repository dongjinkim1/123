# RESUME_POINT — ② 하네스 (본 실행 가동 중)

- 갱신: 2026-06-13 08:30
- 상태: **본 실행 가동** — launcher.bat(분리 프로세스) → harness2.js --run (08:28 기동, node PID 8476)
- 완료된 전 단계:
  1. ① vocab-wiring + kts 패치 — tag-df.json (시드 20260613)
  2. ② 커밋 1~10 — TC 22종 PASS, 풀 동결 336(d959b546aa10)
  3. 파일럿 20장 — 채택 19/20(S4·A13·B2), §0-α 4확정(토론 유지/4.3콜·8009토큰/장/반려 5%/세션 b)
  4. 조건부 스윕(H2-YAD-006 sess) — 4/4 채택(변형1·역전3), all-survive-distinct, 파생 채택률 100%
  5. 파일럿 발견 버그 4건 수정(sess 파서·파생 tags 고정·trigger 중복 가드·tc-sweep 백업)
- 본 실행 규모: 메인 큐 1,928장(T1→T2→T3, 파일럿 20장 기완료 스킵) + 파생 사이드 큐(체크포인트 충전)
  실측 기준 ~4.8분/장 → 총 ~6일 전망. 30장마다 체크포인트 보고서(state/reports/) + 스냅샷.
- 모니터링 지점: state/launcher.log(종료·재기동) · state/journal.jsonl(진행) · state/quota.json(쿼터)
  · state/reports/checkpoint_*.md · state/auto_decisions.log
- 중단/재개: launcher가 자동 재기동(rate limit=1h 대기, 코드 9 하드 정지만 제외).
  완전 수동 재개 = `launcher.bat` 재실행 (저널이 완료분 스킵).
- 남은 수동 항목(동진): 인간 스팟체크(이월 — pilot_report.md) / Supabase sql 적용(선택, P3 비차단)
  / 절전 해제 확인: powercfg /change standby-timeout-ac 0
