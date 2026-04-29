// lib/mbti-data.js — MBTI 데이터
'use strict';

var TY={INTJ:{n:"전략가",cf:"Ni-Te-Fi-Se"},INTP:{n:"논리술사",cf:"Ti-Ne-Si-Fe"},ENTJ:{n:"통솔자",cf:"Te-Ni-Se-Fi"},ENTP:{n:"변론가",cf:"Ne-Ti-Fe-Si"},INFJ:{n:"옹호자",cf:"Ni-Fe-Ti-Se"},INFP:{n:"중재자",cf:"Fi-Ne-Si-Te"},ENFJ:{n:"선도자",cf:"Fe-Ni-Se-Ti"},ENFP:{n:"활동가",cf:"Ne-Fi-Te-Si"},ISTJ:{n:"현실주의자",cf:"Si-Te-Fi-Ne"},ISFJ:{n:"수호자",cf:"Si-Fe-Ti-Ne"},ESTJ:{n:"경영자",cf:"Te-Si-Ne-Fi"},ESFJ:{n:"집정관",cf:"Fe-Si-Ne-Ti"},ISTP:{n:"장인",cf:"Ti-Se-Ni-Fe"},ISFP:{n:"모험가",cf:"Fi-Se-Ni-Te"},ESTP:{n:"사업가",cf:"Se-Ti-Fe-Ni"},ESFP:{n:"연예인",cf:"Se-Fi-Te-Ni"}};
var DM_AX=[{L:"E",R:"I",Ll:"외향형(E)",Rl:"내향형(I)",Ld:"사람들과 함께할 때 에너지 충전",Rd:"혼자만의 시간에 에너지 충전"},{L:"S",R:"N",Ll:"감각형(S)",Rl:"직관형(N)",Ld:"현실적이고 구체적인 사실 중시",Rd:"가능성과 패턴, 큰 그림 중시"},{L:"T",R:"F",Ll:"사고형(T)",Rl:"감정형(F)",Ld:"논리와 객관적 분석으로 판단",Rd:"가치와 감정, 조화를 중시"},{L:"J",R:"P",Ll:"판단형(J)",Rl:"인식형(P)",Ld:"계획적이고 체계적인 생활 선호",Rd:"유연하고 즉흥적인 생활 선호"}];
var IN_OP=[{r:"50~60%",d:"미세한 성향",v:55},{r:"61~75%",d:"뚜렷한 성향",v:68},{r:"76~100%",d:"매우 확고한 성향",v:88}];
var DC=["#5B8FD4","#2e8b57","#88619A","#c99a2e"],DB=["rgba(91,143,212,.1)","rgba(46,139,87,.1)","rgba(136,97,154,.1)","rgba(201,154,46,.1)"];
function strLv(v){return v>=76?"매우 강한":v>=61?"상대적으로 강한":"상대적으로 약한";}

// getMBTI references ST (browser global) — may not work server-side
function getMBTI(){
  if (typeof ST === 'undefined') return '????';
  return ST.ch.map(function(c,i){return c===null?"?":(c==="L"?DM_AX[i].L:DM_AX[i].R);}).join("");
}

var MI={
  // E/I축
  E:{
    55:{short:'살짝 외향',
      trait:'사교/충전 반반/적당한 거리감/외향인 척 가능',
      love:'같이 있되 매일은 부담/거리두기형 연애',
      work:'하이브리드 근무/완전 고립도 완전 사교도 싫음',
      burn:'사교↔충전 전환 잦아 에너지 관리 필수'},
    68:{short:'확실한 외향',
      trait:'사람=충전기/혼자 있으면 심심/연락 빠름',
      love:'매일 연락 기본/연락 없으면 불안',
      work:'소통 포지션 최적/혼자 작업 오래 못함',
      burn:'사교 과부하 시 역설적 소진/주1일 리셋 필요'},
    88:{short:'극강 외향',
      trait:'혼자=고문/모임 중심/낯선 사람에게도 자연스럽게 말 걸음',
      love:'연애 비중 큼/모든 것 공유 욕구/혼자 시간 길면 불안',
      work:'팀 리더/네트워커/사람 상대 무한 에너지/서류 작업 의지력 필요',
      burn:'잘못된 사람에게서 데미지 극대화/에너지 뱀파이어 구분 필수'}
  },
  I:{
    55:{short:'살짝 내향',
      trait:'소수 깊은 대화 선호/큰 모임도 가능/집 오면 방전',
      love:'처음 경계→마음 열면 적극적/1:1 데이트 선호',
      work:'조용함+협업 균형/미팅 하루 2~3개 한계',
      burn:'외향적 행동 오래 하면 갑자기 배터리 0%'},
    68:{short:'확실한 내향',
      trait:'혼자 시간=생명줄/사교 적정량 명확/전화 기피',
      love:'깊은 1:1 올인/넓은 인맥보다 한 사람/상대 너무 사교적이면 에너지 달림',
      work:'독립 몰입 환경 최고/개인 공간/문서 소통 선호',
      burn:'인간관계 에너지 배분 핵심/안 만나도 되는 사람 과감히 줄이기'},
    88:{short:'극강 내향',
      trait:'내 방=천국/혼자 있을 때 가장 나다움/SNS도 보는 파/파티 빠질 구실 먼저 생각',
      love:'마음 여는 데 오래 걸림/한번 열면 누구보다 깊음/함께 침묵이 편한 관계',
      work:'재택/독립 작업 필수/크리에이터·연구자·개발자·작가형',
      burn:'사회적 의무(명절·회식) 최대 소모원/전후 충전일 필수'}
  },
  // S/N축
  S:{
    55:{short:'살짝 감각',
      trait:'현실 기반+직관도 씀/데이터와 느낌 사이 균형',
      love:'상대 행동(팩트) 중시+분위기도 읽음',
      work:'실무+기획 하이브리드/실행력+큰 그림',
      burn:'디테일↔비전 왔다갔다 에너지 분산'},
    68:{short:'확실한 감각',
      trait:'증거 기반 사고/추상적 이야기에 "구체적으로 뭔데?"/눈에 보이는 것 신뢰',
      love:'말보다 행동/선물 1개 > 사랑해 100번',
      work:'실행력의 왕/아이디어보다 결과물/손에 잡히는 성과',
      burn:'변화 빠르거나 불확실한 상황 스트레스'},
    88:{short:'극강 감각',
      trait:'지금 여기 이 순간/오감 예민/디테일 잡는 눈/미래 상상은 막막',
      love:'감각 경험 공유형 연애/맛집·여행·운동/오늘의 데이트 > 우리의 미래',
      work:'현장 전문가/직접 보고 만지고 경험/이론보다 실전',
      burn:'루틴 깨짐·감각적 불쾌 환경이 생산성 급락'}
  },
  N:{
    55:{short:'살짝 직관',
      trait:'가능성 탐색+현실 체크 균형/아이디어→실현 가능성 동시 검토',
      love:'잠재력도 보면서 현재 모습도 수용',
      work:'기획+실행 올라운더/전략도 짜고 디테일도 챙김',
      burn:'아이디어↔현실 줄타기로 결정 장애'},
    68:{short:'확실한 직관',
      trait:'"왜?"와 "만약에?" 일상/패턴·가능성에 관심/대화 주제 세 번 점프',
      love:'현재보다 잠재력에 끌림/상상 속 상대와 연애 시작 경향',
      work:'기획자·전략가·크리에이터/아이디어 탁월/실행 인내 필요',
      burn:'시작의 왕 완성의 빈곤/아이디어 과다로 하나도 완성 못함'},
    88:{short:'극강 직관',
      trait:'머릿속 평행 우주 5개/현실은 가능성의 한 버전/"어떻게 그런 생각을?"',
      love:'현실 상대보다 이상화된 상대에게 끌림/3개월 후 실망 패턴 경계',
      work:'혁신가·발명가·비전가/안 보이는 연결고리 발견/현실 간극 주의',
      burn:'현실 미착지 시 이상만 높고 실행 0/실행 파트너 필수'}
  },
  // T/F축
  T:{
    55:{short:'살짝 사고',
      trait:'논리적+감정도 고려/맞아↔사람들은 어떻게 느낄까 저울질',
      love:'감정 표현 서투르진 않되 논리로 관계 문제 풀려는 경향',
      work:'분석력+공감력 동시/데이터 기반 결정+팀원 감정 챙김',
      burn:'논리↔감정 사이 고민 길어짐'},
    68:{short:'확실한 사고',
      trait:'팩트 우선/원칙과 논리로 판단/주변에 차갑다는 인상 가능',
      love:'"감정 좀 표현해줘" 자주 들음/마음은 있는데 표현이 논리적',
      work:'분석·전략·시스템 설계 강점/감정 배제 결정에 흔들림 없음',
      burn:'감정 과도 억제→비합리적 폭발/감정 인식 습관 필요'},
    88:{short:'극강 사고',
      trait:'세상=논리와 시스템/감정 호소 안 통함/"근거는?" 자동 반응/비효율 못 참음',
      love:'사랑도 분석/관계 가성비 무의식 계산/"로봇 같다" 들을 수 있음',
      work:'최적 분석가·전략가·아키텍트/순수 논리 영역 무적/팀 관리 약점',
      burn:'모든 것 논리 해결 시도→인간관계 마찰/"맞는 말인데 기분 나쁘게"'}
  },
  F:{
    55:{short:'살짝 감정',
      trait:'감정 중시+논리도 충분히 씀/사람 느낌 먼저 생각+비합리 걸러냄',
      love:'공감+감정 휘둘리지 않음/건강한 관계 유지 유리',
      work:'분위기 읽으면서 논리적 판단/팀 밸런서',
      burn:'감정↔논리 양다리로 결정 지연'},
    68:{short:'확실한 감정',
      trait:'감정 먼저 읽음/조화 중시/이기는 것보다 관계 지키기/타인 상처=내 일',
      love:'상대 기분 직감/자기 감정 뒤로 미루다 쌓이는 패턴 주의',
      work:'상담·교육·HR·서비스 천직/사람 다루는 일',
      burn:'남의 감정 과다 흡수→감정 소진/"이건 내 감정 아니다" 구분 필요'},
    88:{short:'극강 감정',
      trait:'감정 안테나 초고감도/분위기 즉시 읽음/영화 같이 울고 뉴스 같이 분노/공감=축복이자 저주',
      love:'상대 감정에 완전 동화/상대 행복=천국 불행=지옥/감정적 독립이 최대 과제',
      work:'예술·상담·치유·교육 탁월/감정 노동 과다 시 번아웃 위험 매우 높음',
      burn:'감정 스펀지 체질/에너지 뱀파이어 구분 필수/감정 방화벽 필수'}
  },
  // J/P축
  J:{
    55:{short:'살짝 판단',
      trait:'큰 틀 계획+세부 즉흥/유연한 계획형',
      love:'약속 시간 지킴/데이트 코스 유연/상대 계획 변경 OK',
      work:'체계적+변화 적응 가능/프레임워크 안 자유',
      burn:'계획↔즉흥 어중간할 때 결정 피로'},
    68:{short:'확실한 판단',
      trait:'계획 없이 움직이면 불안/할 일 목록·일정표·데드라인=안심/먼저 계획 세우자',
      love:'데이트 미리 계획/기념일 달력 표시/상대 너무 즉흥이면 불안',
      work:'프로젝트 매니저·관리자/마감 준수/프로세스 체계화 강점',
      burn:'예상 못한 변수 연속→통제감 상실 패닉/완벽한 계획은 없다 수용 연습'},
    88:{short:'극강 판단',
      trait:'모든 것 통제 욕구/30분 단위 일정/예상치 못한 상황=스트레스 근원',
      love:'"이 관계 어디로 가?" 자주 확인/모호한 관계 가장 힘듦',
      work:'최고 조직가·완성자/시작→끝 관리/팀원 자율성 존중 연습 필요',
      burn:'통제 불가 상황(타인 행동·불확실 미래) 최대 스트레스/통제 가능한 것에만 집중'}
  },
  P:{
    55:{short:'살짝 인식',
      trait:'유연하되 어느 정도 계획 필요/큰 방향만 정해두면 편함',
      love:'데이트 유연/중요 기념일은 챙김/적절한 서프라이즈',
      work:'프레임워크 안 자유 최적/마감 있되 과정 자유',
      burn:'너무 체계적도 너무 자유로운 것도 스트레스/균형점 찾기'},
    68:{short:'확실한 인식',
      trait:'옵션 열어두기 선호/더 좋은 선택지 있을 수도/여행 즉흥/맛집 발견형',
      love:'자연스러운 흐름/관계 정의보다 지금 이 순간/상대가 빨리 정의하면 부담',
      work:'변화무쌍한 환경/스타트업·프리랜서/반복 업무 천적',
      burn:'마감날 집중 폭발 패턴→만성 스트레스 위험'},
    88:{short:'극강 인식',
      trait:'계획=감옥/5분 후 모르는 게 신남/틀 박힌 일상 질식/탐험가 기질 최고조',
      love:'속박 관계 도망/서로 자유 존중/상대는 "진짜 좋아하는 거 맞아?" 불안',
      work:'정해진 출퇴근·업무·프로세스=지옥/자유 근무·다양한 프로젝트 필수',
      burn:'자유 과하면 방향 상실/이것저것 손대다 1년/최소 구조(주간 목표 1개) 필요'}
  }
};

// ============================================================
// Parameter-based helper functions (no ST dependency)
// ============================================================

function getMBTIFromChoices(mbtiChoices) {
  return mbtiChoices.map(function(c, i) {
    return c === null ? "?" : (c === "L" ? DM_AX[i].L : DM_AX[i].R);
  }).join("");
}

function miKeyParam(axisIdx, mbtiChoices, mbtiIntensities) {
  var side = mbtiChoices[axisIdx] === 'L' ? DM_AX[axisIdx].L : DM_AX[axisIdx].R;
  var rawIt = mbtiIntensities[axisIdx];
  var lv = (rawIt && rawIt >= 76) ? 88 : (rawIt && rawIt >= 61) ? 68 : 55;
  return MI[side][lv];
}

function miAllParam(mbtiChoices, mbtiIntensities) {
  return [miKeyParam(0, mbtiChoices, mbtiIntensities), miKeyParam(1, mbtiChoices, mbtiIntensities), miKeyParam(2, mbtiChoices, mbtiIntensities), miKeyParam(3, mbtiChoices, mbtiIntensities)];
}

// Original miKey/miAll (UI uses ST — TODO: move to UI-only)
function miKey(axisIdx) {
  // TODO: ST reference — only use from UI (index.html)
  if (typeof ST === 'undefined') return miKeyParam(axisIdx, [null,null,null,null], [55,55,55,55]);
  var side = ST.ch[axisIdx] === 'L' ? DM_AX[axisIdx].L : DM_AX[axisIdx].R;
  var rawIt = ST.it[axisIdx];
  var lv = (rawIt && rawIt >= 76) ? 88 : (rawIt && rawIt >= 61) ? 68 : 55;
  return MI[side][lv];
}
function miAll() {
  if (typeof ST === 'undefined') return miAllParam([null,null,null,null], [55,55,55,55]);
  return [miKey(0), miKey(1), miKey(2), miKey(3)];
}

module.exports = {
  TY: TY, DM_AX: DM_AX, MI: MI,
  IN_OP: IN_OP, DC: DC, DB: DB,
  strLv: strLv, getMBTI: getMBTI,
  getMBTIFromChoices: getMBTIFromChoices,
  miKeyParam: miKeyParam, miAllParam: miAllParam,
  miKey: miKey, miAll: miAll
};
