# 사주 강도·요소 점수 MAP

> 일간 화 · 용신오행 목 · 최약 금 · 기준 사주 1993-5-26. 도출·검증 산출물(프롬프트 미배선).

## 고정 레지스트리 (producer 변경 불가)
- source: gangdo · wuichi · gilhyung · relation · hyung · saeng · geuk
- normalize: identity · div5 · polarityMag · bool01 · relMag
- transform(단조증가): identity · sqrt · pow:k(k>0) · log1p · div:c(c>0)
- form: weighted_sum · weighted_product · min_gate

## 단조성 보증
wᵢ≥0 · fᵢ∈[0,1] · transform 단조증가 → gangdo factor 단조 비감소(M4)

## 이론 근거 인용 규칙
각 블록 근거(geunge)는 saju-theory 코퍼스 PART/섹션에서 인용된다(발췌→producer 인용→verify-myeongri 재확인).

## 4-OPEN (점수화 보류)
음양 · 투출 · 운성궁위 · 통변 — gangdoAxis:open.

## 블록별 점수 명세
| 블록 | 기둥 | 오행 | gangdoAxis | form | factors (key·source·against·w·normalize) | 근거(PART§) | flag |
|---|---|---|---|---|---|---|---|
| 음양 | — | 화 | open | — | — | 4-OPEN: 음양은 강도(magnitude) 점수화 대상이 아니다. 음양/투출/12운성/통변은 축을 열어 둔다(producer 규칙 #7). |  |
| 신강약 | — | 화 | magnitude | weighted_sum | strength_magnitude·gangdo·일간·w=1·identity / insung_support·saeng·일간·w=0.2·relMag | P1-S45 ⑲ 신강/신약 판정 — 일간 대비 강도 magnitude를 그대로 축으로 삼고, 인성(생) 지원을 보조 가중으로 둔다. |  |
| 통변 | — | 화 | open | — | — | 4-OPEN: 통변(通變)은 해석 서사 영역으로 강도 점수화 대상이 아니다(producer 규칙 #7). |  |
| 오신 | — | 목 | derived | weighted_sum | osin_polarity·gilhyung·목·w=1·polarityMag / yongsin_strength·gangdo·일간·w=0.3·identity | P1-S03 ① 5신 체계(용신·희신·한신·구신·기신) — 오행의 길흉 극성을 polarityMag로 크기화하고, 강도를 보조로 둔다. |  |
| 개운 | — | 목 | derived | weighted_sum | yongsin_alignment·gilhyung·목·w=0.7·polarityMag / element_activation·relation·일간·w=0.2·relMag | P1-S29 ⑬ 개운 — 용신 정렬(길흉 극성)을 주축으로, 합충 활성도를 보조로 둔다. 처방적 성격이라 근거 약함. | 근거약함 |
| 육친 | — | 화 | magnitude | weighted_sum | sipsung_strength·gangdo·일간·w=0.8·identity / saeng_support·saeng·일간·w=0.3·relMag / geuk_pressure·geuk·일간·w=0.3·relMag | P1-S05 ② 육친론 — 십성 강도 magnitude를 주축으로, 생/극 관계를 보조 가중으로 둔다. |  |
| 운성궁위 | — | 화 | open | — | — | 4-OPEN: 12운성(운성궁위)은 강도 점수화 대상이 아니다(producer 규칙 #7). 궁위·운성은 위치/단계 정보로 축을 열어 둔다. |  |
| 공망 | — | 화 | magnitude | weighted_sum | void_palace_strength·gangdo·일간·w=0.6·identity / hap_fill·relation·일간·w=0.3·relMag | P1-S11 ⑤ 공망 — 공망 궁의 강도를 magnitude로 두고, 합으로 메워지는 정도를 보조로 둔다. |  |
| 건강 | — | 금 | magnitude | weighted_sum | weakOh_strength·gangdo·금·w=1·identity / mother_support_to_geum·saeng·금·w=0.5·bool01 | P1-S21 오행 건강론 — '상생 보강 원리: 부족한 오행을 직접 보충하거나, 그 오행을 생하는 모(母) 오행을 보강'(예: 금(폐) 부족 → 토 보강(토생금)). 약오행 금 강도를 magnitude 주축에 두고, ground_truth saeng.generatedBy=토(토생금) 모 오행 보강만 금 강화와 같은 방향으로 bool01 가산한다. 화극금(상극)은 금을 약화시키고 '상극 과다 원리'는 과다 오행 대상이라 부족 오행 금에 적용 불가하므로 factor에서 제외. |  |
| 직업적성 | — | 목 | derived | weighted_sum | sipsung_group_strength·gangdo·일간·w=1·identity / sipsung_subgroup_strength·gangdo·일간·w=0.5·identity | P1-S37 직업 적성 매칭(SJ_JOB_APTITUDE/SJ_buildJobText) — 발췌는 5개 십성군(비겁·식상·재성·관성·인성) 강도 분포에서 dominant·subdominant·weakest를 정렬해 직업을 매칭한다. 주력 십성군 강도를 derived 주축으로, 조합을 결정하는 보조 십성군 강도 분포를 sqrt 압축 보조로 둔다. 발췌에 용신·길흉 라벨이 전무하므로 용신 정렬은 쓰지 않는다. | 근거약함 |
| 원국관계 | — | 화 | activation | weighted_sum | relation_strength·relation·일간·w=1·relMag / chart_strength_activation·gangdo·일간·w=0.5·identity | P2-S26 원국 내 관계(합충형) 활성도를 주축으로, 원국 강도를 활성 보조로 둔다. |  |
| 형 | — | 화 | activation | weighted_sum | hyung_present·hyung·일간·w=1·bool01 / relation_strength·relation·일간·w=0.5·relMag / chart_strength_activation·gangdo·일간·w=0.3·identity | P1-S17 SJ_checkSamhyung — 형의 존재를 bool 게이트로, 관계 강도와 원국 강도를 보조로 둔다. | hyung 0개 — hyung factor는 두되 본 원국에서 0으로 평가됨 |
| 투출 | 월지 | 화 | open | — | — | 4-OPEN: 투출은 강도 점수화 대상이 아니다(producer 규칙 #7). 월지 투간 사실은 기록하되 magnitude 축으로 닫지 않는다. |  |
| 월률 | 월지 | 화 | magnitude | weighted_sum | woljisa_position_weight·wuichi·일간·w=0.6·div5 / month_branch_strength·gangdo·일간·w=1·identity | P1-S27 월률분야(월령) — 월지 궁위 충격도를 div5로 크기화하고, 월지 강도를 magnitude 주축으로 둔다. |  |
| 신살 | — | 화 | magnitude | weighted_sum | sinsal_strength·gangdo·일간·w=1·identity / sinsal_gilshin·gilhyung·일간·w=0.4·bool01 | 신살 강도 magnitude를 주축으로 두되, 발췌 근거가 부족하여 길신/흉신 극성은 bool 보조로만 둔다. | 발췌부족 |
| 교운기 | — | 화 | activation | weighted_sum | transition_relation·relation·일간·w=1·relMag / base_strength·gangdo·일간·w=0.5·identity | P1-S15 ⑦ 대운 교운기 — 교운 시 합충 관계 활성도를 주축으로, 원국 기반 강도를 보조로 둔다. 발췌 근거 부족. | 발췌부족 |
| 러브타이밍 | — | 화 | activation | weighted_sum | ilji_hap_trigger·relation·일간·w=1·relMag / jaegwan_strength·gangdo·일간·w=0.6·identity | P1-S39 ⑯ 연애/결혼 타이밍 — 일지 합 트리거(관계 활성)를 주축으로, 재·관 강도를 보조로 둔다. 발췌 근거 부족. | 발췌부족 |
| 머니타이밍 | — | 화 | activation | weighted_sum | annual_relation_trigger·relation·일간·w=1·relMag / jaeseong_strength·gangdo·일간·w=0.6·identity | P1-S53 재물운 타이밍(SJ_findMoneyTiming) — 발췌 점수 구조는 세운 천간 재성(+3)·세운 지지 재성오행(+2)·대운 재성(+2)·식상생재 시너지(+3) 등 운에서 들어오는 트리거가 지배적이다. activation 블록이므로 세운/대운 트리거 활성(relation)을 주축(w1.0)으로, 원국 재성 강도를 보조(w0.6)로 재배치한다. 러브타이밍과 동일한 trigger-주축 구조. | 발췌부족 |
| 합트리거 | — | 화 | activation | weighted_sum | hapchung_trigger·relation·일간·w=1·relMag / hyung_gate·hyung·일간·w=0.3·bool01 | P2-S28 ⑦ 합충형 — 합충 트리거 활성도를 주축으로, 형 존재를 bool 보조 게이트로 둔다. |  |
| 월간하이라이트 | — | 화 | activation | weighted_sum | monthRelationTrigger·relation·일간·w=1·relMag / osinMonthFavor·gilhyung·일간·w=0.8·polarityMag / dmEnergyActivated·gangdo·일간·w=0.6·identity | P1-S03 ① 5신 체계 — 월별 합충 트리거를 주축으로, 오신 길흉(polarityMag)과 일간 에너지 활성을 보조로 둔다. 발췌 근거 부족. | 발췌부족 |
| 택일 | — | 목 | activation | weighted_sum | dayElementFavor·gilhyung·일간·w=1·polarityMag / hapChungTrigger·relation·일간·w=0.7·relMag / energyToSeize·gangdo·일간·w=0.5·identity | P2-S04 — 택일은 길일 오행 정렬(polarityMag)을 주축으로, 합충 트리거와 강도를 보조로 둔다. 처방적 성격이라 근거 약함. | 근거약함 |
| 인생로드맵 | — | 화 | activation | weighted_sum | daewoonHapChung·relation·일간·w=0.9·relMag / strengthGatedExperience·gangdo·일간·w=0.8·identity / incomingLuckFavor·gilhyung·일간·w=0.6·polarityMag | P2-S04 — 인생 로드맵은 대운 합충 활성을 주축으로, 강도 게이트 경험치와 들어오는 운의 길흉을 보조로 둔다. 발췌 근거 부족. | 발췌부족 |
| 자녀 | 시지 | 화 | magnitude | weighted_sum | dmStrengthBase·gangdo·일간·w=1·identity / siksangChildStar·saeng·토·w=0.7·bool01 / gwanseongChildStar·geuk·수·w=0.7·bool01 / childPalaceImpact·wuichi·일간·w=0.5·div5 | P1-S59 ㉖ 자녀운 분석 — 일간 강도를 magnitude 주축으로, 식상(자녀성)·관성·시지 궁위 충격도를 보조로 둔다. 발췌 근거 부족. | 발췌부족 |
