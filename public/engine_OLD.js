// ============================================================
// engine.js — MBTS 사주 엔진 (순수 계산 + 데이터 + AI)
// 이 파일에는 document, getElementById 등 DOM 코드가 없어야 한다.
// UI는 index.html이 담당한다.
// ============================================================

/* ==========================================
   * 만세력 엔진 (천문학적 태양황경 기반)
   ========================================== */
/* * API 키 설정 — 보안: 사용자가 직접 입력하도록 변경 * */
var API_KEY = '';
function getApiKey(){ return 'server-managed'; }
function promptApiKey(){ return Promise.resolve('server-managed'); }

var TGAN=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
var TGAN_KR=['갑','을','병','정','무','기','경','신','임','계'];
var JIJI=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var JIJI_KR=['자','축','인','묘','진','사','오','미','신','유','술','해'];
var OHAENG_TGAN=['목','목','화','화','토','토','금','금','수','수'];
var OHAENG_JIJI=['수','토','목','목','토','화','화','토','금','금','토','수'];
var EC_DARK={'목':'#2e7d32','화':'#d32f2f','토':'#bf8c00','금':'#757575','수':'#1565c0'};
var EJ={'목':'🌳','화':'🔥','토':'⛰️','금':'⚔️','수':'💧'};

/* ====== 75유형 운명동물 데이터 ====== */
var OHENG_DATA = [
  { key: "목", name: "木 나무", color: "#22A469", bg: "#EDFCF2", bgDark: "#D1FAE5", desc: "성장 · 뻗어나감 · 생명력", emoji: "🌿" },
  { key: "화", name: "火 불꽃", color: "#E8453C", bg: "#FEF1F0", bgDark: "#FEE2E2", desc: "열정 · 주목 · 화려함", emoji: "🔥" },
  { key: "토", name: "土 대지", color: "#C49A2A", bg: "#FDF8EC", bgDark: "#FEF3C7", desc: "안정 · 포용 · 묵직함", emoji: "🪨" },
  { key: "금", name: "金 칼날", color: "#6B7B8D", bg: "#F2F4F6", bgDark: "#E2E8F0", desc: "결단 · 날카로움 · 정밀", emoji: "⚔️" },
  { key: "수", name: "水 물결", color: "#2D7EB5", bg: "#EDF5FC", bgDark: "#DBEAFE", desc: "지혜 · 유연 · 깊이", emoji: "🌊" },
];

var SIPSUNG_DATA = [
  { key: "비겁", name: "비겁", desc: "자아 · 독립 · 경쟁", short: "독립" },
  { key: "식상", name: "식상", desc: "표현 · 창작 · 아이디어", short: "표현" },
  { key: "재성", name: "재성", desc: "재물 · 현실 · 기회", short: "현실" },
  { key: "관성", name: "관성", desc: "책임 · 규율 · 사회", short: "책임" },
  { key: "인성", name: "인성", desc: "학습 · 사색 · 탐구", short: "탐구" },
];

var ANIMALS = {
  // ─── 목(木) ───
  "목_비겁": {
    emoji: "🐺", name: "늑대",
    mods: [
      { label: "신강", tag: "싸한분위기러", title: "아무 말 안 했는데 분위기 싸해지는 늑대", desc: "본인은 평소대로인데 주변이 눈치봄. 그 분위기가 싫은데 고칠 생각은 없음.", traits: ["존재감 과다", "표정관리 불가", "고칠생각 없음"], rx: "가끔은 웃어보기 챌린지" },
      { label: "신약", tag: "츤데레", title: "무리에 끼고 싶지만 혼자인 늑대", desc: "같이 뛰고 싶은데 발이 안 떨어짐. 혼자가 편하다고 자기최면 중.", traits: ["혼자가 편한 척", "외로움 탐", "먼저 연락 못함"], rx: "먼저 손 내밀기 챌린지" },
      { label: "특수", tag: "퇴사상상러", title: "퇴사 상상하다 하루가 끝나는 늑대", desc: "'때려치우고 싶다' 매일 생각하는데 막상 못 나감. 통장 보면 현실.", traits: ["퇴사 시뮬 30회/일", "현실 브레이크", "통장이 족쇄"], rx: "작은 것부터 벗어나보기" }
    ]
  },
  "목_식상": {
    emoji: "🦊", name: "여우",
    mods: [
      { label: "신강", tag: "입담꾼", title: "입만 열면 다 넘어가는 여우", desc: "말빨, 센스, 눈치 삼위일체. 팔면 냉장고도 팔 사람.", traits: ["말빨 미쳤음", "센스 만렙", "분위기 장악"], rx: "진심은 말빨로 안 통해" },
      { label: "신약", tag: "잡생각러", title: "아이디어만 100개인 여우", desc: "이것도 하고 싶고 저것도 하고 싶은데 결국 아무것도 안 함.", traits: ["아이디어 폭포", "실행 부족", "잡생각 대마왕"], rx: "하나만 골라서 일단 시작" },
      { label: "특수", tag: "N잡러", title: "부업이 5개인데 다 중간인 여우", desc: "이것저것 다 하는데 어느 하나 터지진 않음. 근데 멈출 수 없음.", traits: ["N잡 중", "다 중간", "멈추면 불안"], rx: "하나를 터뜨려야 나머지도 산다" }
    ]
  },
  "목_재성": {
    emoji: "🐿️", name: "다람쥐",
    mods: [
      { label: "신강", tag: "짠테크러", title: "도토리 3만개 숨겨놓은 다람쥐", desc: "기회를 냄새로 맡고 놓치지 않는 현실 감각. 알뜰 그 자체.", traits: ["재물감각", "알뜰살뜰", "투자본능"], rx: "가끔은 지르는 맛도 알아야" },
      { label: "신약", tag: "망설이러", title: "도토리 보이는데 손이 안 닿는 다람쥐", desc: "기회는 보이는데 잡을 타이밍을 매번 놓침. 또 늦었어...", traits: ["기회포착은 함", "실행 느림", "타이밍 미스"], rx: "보이면 바로 잡기. 3초 룰." },
      { label: "특수", tag: "공허러", title: "도토리만 모으다 봄을 잊은 다람쥐", desc: "현실적 성공은 했는데... 이게 내가 원한 삶인가?", traits: ["성공했지만 공허", "의미부재", "영혼 텅빈"], rx: "통장 말고 마음을 채우기" }
    ]
  },
  "목_관성": {
    emoji: "🦌", name: "사슴",
    mods: [
      { label: "신강", tag: "괜찮아러", title: "'나 괜찮아'가 입버릇인 사슴", desc: "괜찮지 않은데 괜찮다고 해야 세상이 돌아가는 줄 아는 사람.", traits: ["자기희생", "감정 숨김", "괜찮지 않음"], rx: "오늘만 솔직해보기" },
      { label: "신약", tag: "눈치러", title: "눈치 100만개 장착한 사슴", desc: "발소리만 들어도 도망갈 준비. 세상이 아니라 시선이 무서움.", traits: ["눈치왕", "체면중시", "사회불안"], rx: "남 시선은 내 인생이 아니야" },
      { label: "특수", tag: "자기후순위러", title: "남 챙기느라 자기 밥은 안 먹는 사슴", desc: "다 챙겨주고 정작 본인은 점심을 거름. 근데 본인은 모름.", traits: ["남 챙기기 달인", "자기는 후순위", "무의식 희생"], rx: "오늘은 내 밥 먼저 먹기" }
    ]
  },
  "목_인성": {
    emoji: "🐱", name: "고양이",
    mods: [
      { label: "신강", tag: "알고리즘러", title: "유튜브 알고리즘에 인생 뺏긴 고양이", desc: "한번 빠지면 3시간. 쓸데없는 지식만 늘어남.", traits: ["호기심 무한", "쓸데없는 지식", "시간 블랙홀"], rx: "그 시간에 산책 한 번이라도" },
      { label: "신약", tag: "집콕러", title: "박스만 보면 들어가는 고양이", desc: "세상 밖은 무서우니까 안전한 데서 구경만 할래.", traits: ["안전지대 사랑", "소심한 박학", "나서기 두려움"], rx: "박스 밖도 생각보다 괜찮아" },
      { label: "특수", tag: "속앓이러", title: "다 알지만 입이 안 떨어지는 고양이", desc: "머릿속엔 할 말이 가득한데 입 밖으로 안 나옴.", traits: ["지식풍부", "표현부족", "속앓이"], rx: "일단 한마디만. 그게 시작이야" }
    ]
  },

  // ─── 화(火) ───
  "화_비겁": {
    emoji: "🦁", name: "사자",
    mods: [
      { label: "신강", tag: "지시알러지러", title: "지시받으면 일단 화부터 나는 사자", desc: "시키는 건 다 하는데 기분이 나쁨. 내가 먼저 하려했는데!", traits: ["자존심 끝판왕", "지시 알러지", "내가 먼저!"], rx: "남의 말도 일단 들어보기" },
      { label: "신약", tag: "속으르렁러", title: "으르렁거리고 싶은데 목이 안 나오는 사자", desc: "속으로는 왕인데 밖으로는 표현을 못 하는 답답함.", traits: ["속 왕기질", "겉소심", "내적분노"], rx: "일단 한 번 크게 으르렁" },
      { label: "특수", tag: "혼자텐션러", title: "단톡방에서 혼자 텐션 높은 사자", desc: "본인은 신나는데 나머지는 읽씹. 근데 멈출 수 없음.", traits: ["존재감 폭발", "혼자 신남", "읽씹 당해도 계속"], rx: "무대 아래에서도 너는 너야" }
    ]
  },
  "화_식상": {
    emoji: "🦚", name: "공작새",
    mods: [
      { label: "신강", tag: "셀카장인", title: "셀카 200장 찍고 1장 고르는 공작새", desc: "완벽한 각도를 찾아 헤매는 중. 조명도 중요함.", traits: ["표현욕구 폭발", "완벽한 연출", "관심=산소"], rx: "조명 없어도 이미 빛나" },
      { label: "신약", tag: "방전러", title: "깃털 펴다 힘 빠진 공작새", desc: "보여주고 싶은 건 넘치는데 체력이 안 따라줌.", traits: ["표현하다 방전", "에너지 롤러코스터", "번아웃 상습범"], rx: "에너지 충전 먼저, 깃털은 그 다음" },
      { label: "특수", tag: "참는공작", title: "깃털 펴고 싶은데 눈치 보는 공작새", desc: "화려하고 싶은 속마음 vs 체면 차리는 겉모습. 내적 전쟁 중.", traits: ["속은 화려", "겉은 점잖", "내적 갈등"], rx: "한 번쯤 맘껏 펼쳐봐" }
    ]
  },
  "화_재성": {
    emoji: "🐝", name: "벌",
    mods: [
      { label: "신강", tag: "쉼불안러", title: "쉬는 날에도 뭔가 해야 불안한 벌", desc: "휴일인데 누워있으면 죄책감. 결국 뭐라도 함.", traits: ["워커홀릭", "쉬면 불안", "죄책감 드리븐"], rx: "쉬는 것도 생산성이야" },
      { label: "신약", tag: "무거운날개", title: "꽃은 보이는데 날개가 무거운 벌", desc: "기회는 보여. 근데 몸이 안 따라줌. 마음은 급한데.", traits: ["기회 포착", "체력부족", "마음만 급함"], rx: "무리하지 말고 가까운 꽃부터" },
      { label: "특수", tag: "욕심벌", title: "남의 꿀까지 가져오는 벌", desc: "경쟁적으로 기회를 잡는 공격적 투자파. 남것도 내것.", traits: ["공격적 재테크", "남것도 내것", "승부사"], rx: "남의 꽃밭도 존중하기" }
    ]
  },
  "화_관성": {
    emoji: "🦅", name: "독수리",
    mods: [
      { label: "신강", tag: "분위기얼리러", title: "회의 때 한마디로 분위기 얼리는 독수리", desc: "본인은 팩트를 말한 건데 다들 조용해짐. 왜...?", traits: ["팩트폭행", "분위기 파악 불가", "본의 아닌 카리스마"], rx: "팩트에 쿠션 한 겹 입히기" },
      { label: "신약", tag: "기다림러", title: "높이 날고 싶은데 바람이 안 도와주는 독수리", desc: "책임감과 목표는 높은데 환경이 안 따라줌.", traits: ["목표 높음", "환경 안맞음", "인내가 필요"], rx: "바람은 반드시 바뀐다" },
      { label: "특수", tag: "스펙갑공허러", title: "LinkedIn 프로필이 무서운 독수리", desc: "스펙은 화려한데 본인도 가면 쓴 느낌. 진짜 나는 뭐지?", traits: ["스펙 화려", "정체성 혼란", "가면 속 공허"], rx: "프로필 말고 진짜 나를 찾기" }
    ]
  },
  "화_인성": {
    emoji: "🦉", name: "올빼미",
    mods: [
      { label: "신강", tag: "새벽분석러", title: "새벽 3시에 전 애인 인스타 분석하는 올빼미", desc: "쓸데없는 데 분석력 올인. 남의 피드에서 단서 찾는 중.", traits: ["야행성 분석", "쓸데없는 관찰", "새벽 감성"], rx: "그 분석력을 자기한테 써봐" },
      { label: "신약", tag: "생각러", title: "생각만 하다 해 지는 올빼미", desc: "완벽하게 준비되면 시작할 거야... 그 날은 안 옴.", traits: ["분석마비", "완벽주의", "시작공포"], rx: "70%면 충분해. 일단 시작" },
      { label: "특수", tag: "침묵러", title: "다 보이는데 아무 말 안 하는 올빼미", desc: "눈은 모든 걸 보고 있는데 입이 안 열림. 답답한 건 나.", traits: ["관찰력 극대화", "표현부족", "속답답"], rx: "본 것을 말해야 지혜가 돼" }
    ]
  },

  // ─── 토(土) ───
  "토_비겁": {
    emoji: "🐻", name: "곰",
    mods: [
      { label: "신강", tag: "내꺼진심러", title: "내 과자 하나에 진심인 곰", desc: "큰 건 양보하는데 작은 거에 진심. 내 음식 함부로 손대지 마.", traits: ["영역 의식", "작은 것에 진심", "터지면 무서움"], rx: "모든 과자가 네 영역은 아니야" },
      { label: "신약", tag: "동굴러", title: "동굴에서 나오기 싫은 곰", desc: "세상 나가기 싫어. 안전한 내 공간이 최고.", traits: ["집순이/집돌이", "에너지 부족", "안전지대 사랑"], rx: "동굴 밖에도 맛있는 게 있어" },
      { label: "특수", tag: "모순소비러", title: "꿀 먹으면서 다이어트 한다는 곰", desc: "모으면서 쓰고, 아끼면서 지름. 모순 덩어리 소비습관.", traits: ["모순적 소비", "아끼면서 지름", "합리화 달인"], rx: "인정해. 그냥 먹고 싶었던 거야" }
    ]
  },
  "토_식상": {
    emoji: "🦦", name: "수달",
    mods: [
      { label: "신강", tag: "놀이터러", title: "장난치다 하루가 끝나는 수달", desc: "노는 게 일이고 일이 노는 거. 인생이 놀이터.", traits: ["장난꾸러기", "놀기 대장", "분위기 메이커"], rx: "놀다가도 가끔은 진지하게" },
      { label: "신약", tag: "급잠러", title: "재롱 피우다 잠드는 수달", desc: "귀여움이 무기인데 체력이 안 따라줌. 5분 텐션 후 급잠.", traits: ["귀여움 MAX", "5분 체력", "급속 방전"], rx: "텐션 조절이 곧 생존전략" },
      { label: "특수", tag: "자기검열러", title: "놀고 싶은데 눈치 보이는 수달", desc: "재밌게 살고 싶은데 '이러면 안 되나?' 자기검열 중.", traits: ["놀고싶다", "눈치보임", "자기검열"], rx: "네가 놀아도 세상은 안 무너져" }
    ]
  },
  "토_재성": {
    emoji: "🐂", name: "소",
    mods: [
      { label: "신강", tag: "일단출근러", title: "불만 있어도 일단 출근하는 소", desc: "오늘도 퇴사 생각 하면서 자리에 앉음. 책임감인지 관성인지.", traits: ["묵묵 실행", "불만 삼킴", "관성 출근"], rx: "불만 좀 말해도 괜찮아" },
      { label: "신약", tag: "과부하러", title: "짐이 너무 많아 주저앉은 소", desc: "해야 할 일은 산더미인데 몸이 안 움직임. 과부하.", traits: ["과부하", "쉬고싶다", "의무감에 눌림"], rx: "짐 절반만 내려놔도 갈 수 있어" },
      { label: "특수", tag: "몰래투잡러", title: "본업 하면서 부업 몰래 하는 소", desc: "투잡 뛰는데 들키면 안 됨. 체력은 한계인데 통장이 두 개니까.", traits: ["실속파", "투잡 중", "체력 한계"], rx: "몸이 자본이라는 거 잊지 마" }
    ]
  },
  "토_관성": {
    emoji: "🐘", name: "코끼리",
    mods: [
      { label: "신강", tag: "기억삭제불가러", title: "남이 한 말 10년째 기억하는 코끼리", desc: "상처받은 말은 절대 안 잊음. 용서는 해도 삭제는 안 됨.", traits: ["기억력 무한", "상처 저장소", "용서≠망각"], rx: "가끔은 잊는 것도 능력이야" },
      { label: "신약", tag: "무거운발러", title: "무거운 발걸음의 코끼리", desc: "해야 할 건 알겠는데 발이 안 떨어짐. 느린 게 아니라 무거운 거야.", traits: ["의무과다", "느린게아니라무거운것", "지침"], rx: "한 발짝만. 그것만으로도 대단해" },
      { label: "특수", tag: "상처아카이브러", title: "상처도 교훈도 다 기록하는 코끼리", desc: "일기장 = 상처 아카이브. 근데 그게 약이 되기도 하는 사람.", traits: ["기록 본능", "상처→교훈", "성장형 아픔"], rx: "좋은 기억도 기록해줘" }
    ]
  },
  "토_인성": {
    emoji: "🐢", name: "거북이",
    mods: [
      { label: "신강", tag: "느린조급러", title: "남들 3바퀴 돌 때 1바퀴 확실히 도는 거북이", desc: "속도는 느린데 한 번 간 길은 안 까먹음. 근데 조급함은 있음.", traits: ["자기 페이스", "꾸준함", "속은 조급"], rx: "속도가 아닌 방향이 중요해" },
      { label: "신약", tag: "등껍질러", title: "등껍질 안에서 세상 구경하는 거북이", desc: "안전한 곳에서 세상을 관찰 중. 나가고 싶지만 무서움.", traits: ["안전지대", "관찰중", "세상은 무서워"], rx: "머리만 살짝 내밀어봐" },
      { label: "특수", tag: "이상러", title: "지혜는 깊은데 통장은 얕은 거북이", desc: "아는 건 많은데 돈 버는 건 관심 밖. 이상 높고 현실 낮음.", traits: ["지혜롭지만 가난", "이상주의", "학자형"], rx: "지혜도 현금화할 수 있어" }
    ]
  },

  // ─── 금(金) ───
  "금_비겁": {
    emoji: "🐆", name: "치타",
    mods: [
      { label: "신강", tag: "일단결제러", title: "생각보다 손이 먼저 나가는 치타", desc: "장바구니에 넣기도 전에 결제 완료. 후회는 배송 온 다음에.", traits: ["결단력 미침", "충동적", "후회는 나중에"], rx: "달리기 전에 1초만 앞을 봐" },
      { label: "신약", tag: "생각만치타", title: "달리고 싶은데 발이 안 떨어지는 치타", desc: "머릿속에선 이미 100번 뛰었는데 몸이 안 움직임.", traits: ["머리는 빠름", "몸은 느림", "내적 갈등"], rx: "한 발만 내디뎌. 나머지는 관성" },
      { label: "특수", tag: "실시간공유러", title: "달리면서 인스타 올리는 치타", desc: "하는 것도 바쁜데 그걸 공유 안 하면 안 되는 체질.", traits: ["행동+공유 동시", "실시간 중계", "멈춤 불가"], rx: "가끔은 조용히 달려도 돼" }
    ]
  },
  "금_식상": {
    emoji: "🦜", name: "앵무새",
    mods: [
      { label: "신강", tag: "직설러", title: "할 말은 꼭 하는 앵무새", desc: "날카로운 관찰 + 거침없는 표현. 정곡을 찌르는 한마디의 달인.", traits: ["직설화법", "관찰력", "한마디가 칼"], rx: "정곡도 포장하면 더 잘 먹혀" },
      { label: "신약", tag: "배터리러", title: "떠들다 배터리 나가는 앵무새", desc: "할 말은 100개인데 체력은 10. 미팅 2개면 방전.", traits: ["수다+방전", "텐션 롤러코스터", "5분 집중"], rx: "말 줄이면 체력이 늘어" },
      { label: "특수", tag: "TMI러", title: "알고 있는 걸 다 말해버리는 앵무새", desc: "지식 + 표현 = TMI 폭탄. 멈출 줄 모르는 강의 모드.", traits: ["TMI 폭탄", "지식+수다", "강의본능"], rx: "상대방 턴도 있다는 걸 기억" }
    ]
  },
  "금_재성": {
    emoji: "🐊", name: "악어",
    mods: [
      { label: "신강", tag: "세일알림러", title: "할인 알림 뜨면 새벽에도 일어나는 악어", desc: "기회(=세일)에 반응하는 속도가 비정상. 놓치면 하루 종일 생각남.", traits: ["기회포착 비정상", "세일 알림 = 기상", "놓치면 우울"], rx: "놓아야 할 때를 아는 것도 실력" },
      { label: "신약", tag: "잠복러", title: "물속에서 기회만 기다리는 악어", desc: "때를 기다리는 건 좋은데, 기다리기만 하면 지나감.", traits: ["인내심", "타이밍 중시", "수동적"], rx: "가끔은 먼저 물 밖으로 나가기" },
      { label: "특수", tag: "야생생존러", title: "사수 없이 알아서 크는 야생 악어", desc: "매뉴얼 없이 맨땅에 헤딩. 근데 그게 되긴 됨.", traits: ["야생 생존력", "매뉴얼 없음", "맨땅 헤딩"], rx: "가끔은 물어보는 게 빠르다" }
    ]
  },
  "금_관성": {
    emoji: "🐕", name: "시바견",
    mods: [
      { label: "신강", tag: "거부반응러", title: "싫으면 온몸으로 거부하는 시바견", desc: "하기 싫은 건 죽어도 안 함. 표정 관리 따위 없음.", traits: ["자기룰 철벽", "표정 = 솔직", "타협없음"], rx: "남의 규칙에도 이유가 있어" },
      { label: "신약", tag: "거부러", title: "산책 가기 싫은데 끌려가는 시바견", desc: "하기 싫은 건 온몸으로 거부하는데 결국 끌려감.", traits: ["수동적 저항", "하기싫어", "결국 함"], rx: "가끔은 순순히 가는 게 더 편해" },
      { label: "특수", tag: "투덜러", title: "규칙은 지키는데 한마디씩 하는 시바견", desc: "시킨 건 하는데 불만을 표현 안 하곤 못 배기는 타입.", traits: ["규칙+불만", "한마디 장인", "투덜투덜"], rx: "말투만 바꿔도 세상이 달라져" }
    ]
  },
  "금_인성": {
    emoji: "🐙", name: "문어",
    mods: [
      { label: "신강", tag: "탭30개러", title: "탭 30개 켜놓고 하나도 안 닫는 문어", desc: "동시에 다 하는 것 같지만 실은 아무것도 안 끝남.", traits: ["멀티태스킹(인 척)", "탭 30개", "하나도 안 끝남"], rx: "탭 하나만 남기고 다 닫기" },
      { label: "신약", tag: "숨기러", title: "먹물 뿌리고 숨는 문어", desc: "위기가 오면 일단 숨고 봄. 방어 본능 극대화.", traits: ["회피형", "방어본능", "숨기 달인"], rx: "도망치지 않으면 의외로 별 거 아냐" },
      { label: "특수", tag: "분석만프로러", title: "주식 분석은 프로인데 수익은 마이너스인 문어", desc: "분석 글 100개 읽고 차트 다 봤는데 결국 물림.", traits: ["분석 프로", "수익 마이너스", "이론≠실전"], rx: "분석력을 통장에도 적용해봐" }
    ]
  },

  // ─── 수(水) ───
  "수_비겁": {
    emoji: "🦈", name: "상어",
    mods: [
      { label: "신강", tag: "존재불안러", title: "일 안 하면 존재가치 없다고 느끼는 상어", desc: "쉬면 불안하고, 바쁘면 죽을 것 같고. 그 사이 어딘가.", traits: ["멈춤불가", "존재불안", "쉼=공포"], rx: "멈춰도 안 죽어. 진짜로." },
      { label: "신약", tag: "고독러", title: "깊은 바다에서 혼자 헤엄치는 상어", desc: "강해 보이지만 속은 외롭다. 누구에게도 기대지 않는 습관.", traits: ["강한척", "외로움 숨김", "고독한 독립"], rx: "약한 모습도 보여줘도 돼" },
      { label: "특수", tag: "내맘대로러", title: "팀플에서 결국 다 내 맘대로 하는 상어", desc: "남 의견 듣는 척하고 결국 내 안대로. 근데 결과는 나옴.", traits: ["독단적", "결과는 냄", "협업 스킬 0"], rx: "같이 하면 더 큰 결과 나와" }
    ]
  },
  "수_식상": {
    emoji: "🐬", name: "돌고래",
    mods: [
      { label: "신강", tag: "자동MC러", title: "아무 모임에서나 MC 되는 돌고래", desc: "분위기가 죽으면 자동으로 입이 열림. 본능적 분위기 살리기.", traits: ["분위기 장인", "자동 MC", "본능적 유머"], rx: "매 순간 MC 안 해도 돼" },
      { label: "신약", tag: "떠돌이러", title: "파도에 떠밀려 다니는 돌고래", desc: "흐름은 타는데 방향 설정이 안 됨. 이리저리 떠다님.", traits: ["흐름타기", "방향없음", "자유롭지만 불안"], rx: "방향 하나만 정하면 파도가 밀어줘" },
      { label: "특수", tag: "선두러", title: "무리 앞에서 점프하는 돌고래", desc: "리더십 + 표현력. 앞에 서서 모두를 이끄는 퍼포머.", traits: ["리더+퍼포머", "점프본능", "앞장서기"], rx: "팔로워도 중요한 역할이야" }
    ]
  },
  "수_재성": {
    emoji: "🦫", name: "비버",
    mods: [
      { label: "신강", tag: "묵묵무관심러", title: "아무도 안 알아주는데 묵묵히 짓는 비버", desc: "열심히 만들고 있는데 아무도 관심 없음. 근데 멈출 수 없음.", traits: ["꾸준함", "인정 부재", "묵묵히 축적"], rx: "알아주는 사람은 반드시 나타나" },
      { label: "신약", tag: "허무러", title: "댐 짓다 지쳐서 주저앉은 비버", desc: "열심히 하는데 결과가 안 보임. 지치고 허무한 반복.", traits: ["노력중", "결과없음", "번아웃 직전"], rx: "쌓인 건 보이지 않아도 있어" },
      { label: "특수", tag: "공허러", title: "댐만 짓고 왜 짓는지 모르는 비버", desc: "열심히 사는데 의미를 모르겠음. 바쁜데 공허.", traits: ["바쁘지만 공허", "의미부재", "목적없는 성실"], rx: "왜 짓는지 먼저 물어봐" }
    ]
  },
  "수_관성": {
    emoji: "🐋", name: "고래",
    mods: [
      { label: "신강", tag: "상담사인데상담러", title: "다 품어주다 본인이 터지는 고래", desc: "모두의 고민 상담사. 근데 내 고민은 누구한테? 그게 고민.", traits: ["포용력 MAX", "자기 케어 부족", "터지기 직전"], rx: "남 고민 말고 내 고민 먼저" },
      { label: "신약", tag: "속울음러", title: "깊은 바다에서 조용히 울고 있는 고래", desc: "모두를 위해 참고 있지만 속은 울고 있음.", traits: ["조용한 울음", "참음", "무거운 책임"], rx: "울어도 돼. 고래의 울음도 노래야" },
      { label: "특수", tag: "읽씹당하는리더러", title: "그룹채팅에서 혼자 공지 올리는 고래", desc: "아무도 안 하니까 내가 함. 근데 아무도 안 읽음.", traits: ["혼자 책임", "읽씹 당함", "외로운 리더"], rx: "도움을 구하는 것도 용기야" }
    ]
  },
  "수_인성": {
    emoji: "🪼", name: "해파리",
    mods: [
      { label: "신강", tag: "샤워철학러", title: "샤워하다 인생 의미 생각하는 해파리", desc: "물 맞으면서 철학적 사색 시작. 10분 뒤에 뜨거운 물 다 씀.", traits: ["감수성 극대화", "샤워 = 철학시간", "물값 폭탄"], rx: "때로는 얕은 곳에서 놀아도 돼" },
      { label: "신약", tag: "표류러", title: "조류에 떠밀려 다니는 해파리", desc: "방향 없이 생각에 잠겨 떠다님. 깊긴 깊은데 어디로 가는지 모름.", traits: ["방향없는 사색", "우유부단", "조류따라"], rx: "방향 하나만 정해봐" },
      { label: "특수", tag: "독침러", title: "독 쏘고 도망가는 해파리", desc: "평소엔 조용히 떠다니다가 건드리면 한 방. 수동적 공격의 달인.", traits: ["평소 순함", "건드리면 한방", "수동공격"], rx: "독 쏘기 전에 먼저 말해봐" }
    ]
  },
};

function getAnimalResult(oheng, dominantSipsung, condition) {
  var key = oheng + "_" + dominantSipsung;
  var animal = ANIMALS[key];
  if (!animal) return null;

  var modIndex = 0;
  if (condition === "신약") modIndex = 1;
  else if (condition === "특수") modIndex = 2;

  return {
    emoji: animal.emoji,
    name: animal.name,
    mods: animal.mods,
    mod: animal.mods[modIndex],
    ohengData: OHENG_DATA.filter(function(o){ return o.key === oheng; })[0],
    sipsungData: SIPSUNG_DATA.filter(function(s){ return s.key === dominantSipsung; })[0],
  };
}

/* ====== 진태양시(眞太陽時) 계산 시스템 ====== */
var CITY_DATA = [
  {name:'서울',lng:126.98},{name:'부산',lng:129.08},{name:'대구',lng:128.60},
  {name:'인천',lng:126.71},{name:'광주',lng:126.85},{name:'대전',lng:127.39},
  {name:'울산',lng:129.31},{name:'세종',lng:127.00},{name:'수원',lng:127.01},
  {name:'창원',lng:128.68},{name:'고양',lng:126.83},{name:'용인',lng:127.18},
  {name:'성남',lng:127.14},{name:'청주',lng:127.49},{name:'전주',lng:127.15},
  {name:'천안',lng:127.15},{name:'김해',lng:128.89},{name:'제주',lng:126.53},
  {name:'포항',lng:129.37},{name:'춘천',lng:127.73},{name:'원주',lng:127.95},
  {name:'강릉',lng:128.90},{name:'속초',lng:128.59},{name:'여수',lng:127.66},
  {name:'순천',lng:127.49},{name:'목포',lng:126.39},{name:'군산',lng:126.74},
  {name:'익산',lng:126.96},{name:'안동',lng:128.73},{name:'경주',lng:129.21},
  {name:'진주',lng:128.11},{name:'통영',lng:128.43},{name:'거제',lng:128.62},
  {name:'평택',lng:127.11},{name:'파주',lng:126.78},{name:'김포',lng:126.72},
  {name:'양산',lng:129.04},{name:'구미',lng:128.34},{name:'충주',lng:127.93},
  {name:'제천',lng:128.19},{name:'영주',lng:128.62},{name:'서산',lng:126.45},
  {name:'당진',lng:126.63},{name:'보령',lng:126.61},{name:'논산',lng:127.10},
  {name:'공주',lng:127.12},{name:'아산',lng:127.00},{name:'광양',lng:127.70},
  {name:'나주',lng:126.71},{name:'해남',lng:126.60},{name:'모름',lng:127.50}
];
var KST_LONGITUDE = 135.0; // KST 기준 경도 (UTC+9 = 135°E)

// 균시차(Equation of Time) 계산 — 분(minute) 단위 반환
function equationOfTime(year, month, day) {
  var n = Math.floor(275 * month / 9) - 2 * Math.floor((month + 9) / 12) + day - 30;
  var B = 2 * Math.PI * (n - 81) / 365;
  // Spencer 공식 (정밀도 ±30초)
  return 9.87 * Math.sin(2*B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
}

// KST → 진태양시 변환 (분 단위 보정값 반환)
function getTrueSolarCorrection(year, month, day, longitude) {
  if (!longitude || longitude === 127.50) return 0; // 모름이면 보정 없음
  var eot = equationOfTime(year, month, day); // 균시차 (분)
  var lngCorrection = (longitude - KST_LONGITUDE) * 4; // 경도 1도 = 4분 차이
  return lngCorrection + eot; // 총 보정값 (분)
}

var JIJANGGAN_DATA=[
  [{g:8,d:10},{g:9,d:20}],
  [{g:9,d:9},{g:7,d:3},{g:5,d:18}],
  [{g:4,d:7},{g:2,d:7},{g:0,d:16}],
  [{g:0,d:10},{g:1,d:20}],
  [{g:1,d:9},{g:9,d:3},{g:4,d:18}],
  [{g:4,d:7},{g:6,d:7},{g:2,d:16}],
  [{g:2,d:10},{g:5,d:9},{g:3,d:11}],
  [{g:3,d:9},{g:1,d:3},{g:5,d:18}],
  [{g:5,d:7},{g:8,d:7},{g:6,d:16}],
  [{g:6,d:10},{g:7,d:20}],
  [{g:7,d:9},{g:3,d:3},{g:4,d:18}],
  [{g:4,d:7},{g:0,d:7},{g:8,d:16}]
];

var UNSUNG_NAMES=['장생','목욕','관대','건록','제왕','쇠','병','사','묘','절','태','양'];
var UNSUNG_START=[{s:11,d:1},{s:6,d:-1},{s:2,d:1},{s:9,d:-1},{s:2,d:1},{s:9,d:-1},{s:5,d:1},{s:0,d:-1},{s:8,d:1},{s:3,d:-1}];
function getUnsung(gi,ji){var info=UNSUNG_START[gi];return UNSUNG_NAMES[info.d===1?(ji-info.s+12)%12:(info.s-ji+12)%12];}

var SINSAL12_NAMES=['겁살','재살','천살','지살','년살','월살','망신살','장성살','반안살','역마살','육해살','화개살'];
function getSamhapGroup(ji){return[0,2,1,3,0,2,1,3,0,2,1,3][ji];}
var SINSAL12_START=[5,11,2,8];
function get12Sinsal(basis,target){return SINSAL12_NAMES[(target-SINSAL12_START[getSamhapGroup(basis)]+12)%12];}

var SS_NAMES=['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'];
function getSipsung(dg,tg){var OH=[0,0,1,1,2,2,3,3,4,4],YY=[0,1,0,1,0,1,0,1,0,1],KUK={0:2,1:3,2:4,3:0,4:1};var de=OH[dg],te=OH[tg],same=(YY[dg]===YY[tg]);if(de===te)return same?'비견':'겁재';if((de+1)%5===te)return same?'식신':'상관';if((te+1)%5===de)return same?'편인':'정인';if(KUK[de]===te)return same?'편재':'정재';return same?'편관':'정관';}

/* ====== 납음오행(納音五行) 30종 테이블 ====== */
var NAPEUM_TABLE = [
  {name:'해중금',desc:'바닷속에 잠든 금 — 아직 세상에 드러나지 않은 숨겨진 보석, 때를 기다리는 잠재력'},
  {name:'노중화',desc:'화덕 속의 불 — 뜨겁고 강렬하지만 통제된 열정, 목적이 분명한 에너지'},
  {name:'대림목',desc:'큰 숲의 나무 — 당당하고 우뚝 선 존재감, 주변을 품는 리더십'},
  {name:'노방토',desc:'길가의 흙 — 누구나 밟고 지나가는 겸손한 포용, 묵묵한 헌신'},
  {name:'검봉금',desc:'칼끝의 금 — 날카롭고 결단력 있는 실행자, 한번 정하면 끝까지'},
  {name:'산두화',desc:'산꼭대기 불 — 높은 이상과 고독한 열정, 멀리서도 보이는 존재'},
  {name:'간하수',desc:'시냇물 — 조용히 흐르지만 멈추지 않는 끈기, 꾸준한 전진'},
  {name:'성두토',desc:'성벽의 흙 — 견고하고 방어적인 안정감, 흔들리지 않는 뚝심'},
  {name:'백랍금',desc:'흰 밀랍 금 — 부드럽게 빛나는 세련된 재능, 은은한 카리스마'},
  {name:'양류목',desc:'버드나무 — 유연하고 감성적, 바람에 흔들려도 꺾이지 않는 회복력'},
  {name:'천중수',desc:'우물물 — 깊이 있고 안정적인 내면의 지혜, 마르지 않는 통찰'},
  {name:'옥상토',desc:'지붕의 흙 — 보호하고 감싸는 따뜻한 울타리, 가정의 안식처'},
  {name:'벽력화',desc:'번개불 — 갑작스러운 영감, 폭발적 에너지, 순간의 천재성'},
  {name:'송백목',desc:'소나무·잣나무 — 사시사철 변하지 않는 절개와 끈기, 고고한 품격'},
  {name:'장류수',desc:'긴 강물 — 유유히 흐르는 대범함, 큰 그릇, 어디로든 길을 찾아감'},
  {name:'사중금',desc:'모래속 금 — 겉으로 안 보이지만 파면 나오는 실력, 숨은 강자'},
  {name:'산하화',desc:'석양불 — 뜨겁지만 서서히 지는 아름다움, 성숙한 열정'},
  {name:'평지목',desc:'평지의 나무 — 어디서든 뿌리내리는 적응력, 소박하지만 단단한'},
  {name:'벽상토',desc:'벽의 흙 — 보이지 않는 곳에서 구조를 지탱하는 묵묵한 버팀목'},
  {name:'금박금',desc:'금박 — 화려한 표면, 예술적 감각, 아름다움을 추구하는 심미안'},
  {name:'복등화',desc:'등불 — 어둠을 밝히는 따뜻한 빛, 지혜의 안내자, 주변을 비추는 사람'},
  {name:'천하수',desc:'하늘의 물(비) — 은혜처럼 내리는 영향력, 넓게 퍼지는 감화력'},
  {name:'대역토',desc:'큰 언덕 흙 — 묵직한 안정감, 흔들리지 않는 기반, 듬직한 존재'},
  {name:'차천금',desc:'비녀 금 — 정교하고 섬세한 기술력, 작지만 빛나는 가치'},
  {name:'상자목',desc:'뽕나무 — 실용적이고 양육하는 에너지, 누군가를 키우고 먹이는 사람'},
  {name:'대계수',desc:'큰 시냇물 — 활기차게 흐르는 생명력, 막힘없이 뻗어나가는 추진력'},
  {name:'사중토',desc:'모래흙 — 유동적이지만 쌓이면 거대해지는 잠재력, 변화 속 축적'},
  {name:'천상화',desc:'하늘의 불(태양) — 모두를 비추는 카리스마, 어디서든 중심이 되는 사람'},
  {name:'석류목',desc:'석류나무 — 겉은 단단하고 속은 풍성한 열매, 깊은 내면의 보물'},
  {name:'대해수',desc:'큰 바다 — 끝없는 깊이와 포용, 모든 것을 받아들이는 대범함'}
];
function getNapeum(ganIdx, jiIdx) {
  // 60갑자 인덱스 구한 뒤 2로 나누면 30종 중 하나
  var idx60 = -1;
  for (var k = 0; k < 60; k++) { if (k % 10 === ganIdx && k % 12 === jiIdx) { idx60 = k; break; } }
  if (idx60 < 0) return null;
  return NAPEUM_TABLE[Math.floor(idx60 / 2)];
}

/* ====== 오행 흐름(순환) 단절 해석 ====== */
var OHENG_FLOW_DESC = {
  '목화': {chain:'목→화', meaning:'성장→열정 연결', cut:'아이디어와 계획은 많지만 불꽃처럼 타오르는 추진력이 부족. 시작의 에너지가 약함'},
  '화토': {chain:'화→토', meaning:'열정→결실 연결', cut:'열심히 노력하지만 결과물로 남기기 어려움. 과정은 화려하나 마무리가 약함'},
  '토금': {chain:'토→금', meaning:'안정→결단 연결', cut:'기반과 자원은 있지만 결정적 선택을 못 내림. 기회를 앞에 두고 망설임'},
  '금수': {chain:'금→수', meaning:'실행→지혜 연결', cut:'행동력은 있지만 경험에서 교훈을 추출하지 못함. 같은 실수를 반복할 수 있음'},
  '수목': {chain:'수→목', meaning:'지혜→성장 연결', cut:'생각과 분석은 깊지만 실제 행동으로 옮기지 못함. 완벽주의로 시작이 늦어짐'}
};

function dateToJDN(y,m,d){var yr=y,mo=m;if(mo<=2){yr--;mo+=12;}var A=Math.floor(yr/100);return Math.floor(365.25*(yr+4716))+Math.floor(30.6001*(mo+1))+d+2-A+Math.floor(A/4)-1524.5;}
function solarLongitude(jd){var T=(jd-2451545)/36525,L0=280.46646+36000.76983*T+.0003032*T*T,M=357.52911+35999.05029*T-.0001537*T*T,Mr=M*Math.PI/180,C=(1.914602-.004817*T-.000014*T*T)*Math.sin(Mr)+(.019993-.000101*T)*Math.sin(2*Mr)+.000289*Math.sin(3*Mr),s=L0+C,om=125.04-1934.136*T;s=s-.00569-.00478*Math.sin(om*Math.PI/180);return((s%360)+360)%360;}
function findSolarTermJD(yr,tgt){var nd=function(a,b){var d=a-b;while(d>180)d-=360;while(d<-180)d+=360;return d;};var de=80+(tgt/360)*365.25;if(tgt>270)de=80+((tgt-360)/360)*365.25;var j0=dateToJDN(yr,1,1)+de-30,j1=j0+60;for(var i=0;i<50;i++){var jm=(j0+j1)/2,df=nd(solarLongitude(jm),tgt);if(Math.abs(df)<.0001)return jm;if(df<0)j0=jm;else j1=jm;}return(j0+j1)/2;}

var JG_LONG=[{n:'소한',l:285,mb:1},{n:'입춘',l:315,mb:2},{n:'경칩',l:345,mb:3},{n:'청명',l:15,mb:4},{n:'입하',l:45,mb:5},{n:'망종',l:75,mb:6},{n:'소서',l:105,mb:7},{n:'입추',l:135,mb:8},{n:'백로',l:165,mb:9},{n:'한로',l:195,mb:10},{n:'입동',l:225,mb:11},{n:'대설',l:255,mb:0}];
function getJeolgiTimes(yr){var r=[];for(var y=yr-1;y<=yr+1;y++)for(var j=0;j<JG_LONG.length;j++){var jg=JG_LONG[j];r.push({n:jg.n,mb:jg.mb,jd:findSolarTermJD(y,jg.l)});}r.sort(function(a,b){return a.jd-b.jd;});return r;}

function calculateSaju(year,month,day,hourBranch,hour,minute){
  var bjdNoon=dateToJDN(year,month,day);
  // ★ 절기 비교용: 사용자의 KST 생시를 반영한 JD
  var bjd=bjdNoon;
  if(hour!==null&&hour!==undefined&&hour!==''){
    bjd+=(+hour-12)/24;
    if(minute!==null&&minute!==undefined&&minute!=='') bjd+=(+minute)/1440;
  }
  // ★ KST 보정: 절기 JD(UTC)를 KST로 변환 (+9시간)
  var KST=9/24;
  var jt=getJeolgiTimes(year);
  var ipJD=findSolarTermJD(year,315)+KST,sy=year;if(bjd<ipJD)sy=year-1;
  var yIdx=((sy-4)%60+60)%60,yg=yIdx%10,yj=yIdx%12;
  var mb=2,cj='입춘';for(var i=jt.length-1;i>=0;i--)if(bjd>=jt[i].jd+KST){mb=jt[i].mb;cj=jt[i].n;break;}
  var mss=[2,4,6,8,0],mg=(mss[yg%5]+(mb-2+12)%12)%10,mj=mb;
  // ★ 일주는 날짜(정오) 기준 — 시간에 영향받지 않음
  var dIdx=((Math.floor(bjdNoon)+50)%60+60)%60,dg=dIdx%10,dj=dIdx%12;
  var hg=null,hj=null;
  if(hourBranch>=0){hj=hourBranch;var hss=[0,2,4,6,8];hg=(hss[dg%5]+hourBranch)%10;}
  return{yg:yg,yj:yj,mg:mg,mj:mj,dg:dg,dj:dj,hg:hg,hj:hj,sy:sy,cj:cj};
}

function getSpecialSinsal(yg,yj,mg,mj,dg,dj,hg,hj){
  var R=[],aJ=[],aG=[];
  if(yj!=null)aJ.push({j:yj,l:'년지'});if(mj!=null)aJ.push({j:mj,l:'월지'});if(dj!=null)aJ.push({j:dj,l:'일지'});if(hj!=null)aJ.push({j:hj,l:'시지'});
  if(yg!=null)aG.push({g:yg,l:'년간'});if(dg!=null)aG.push({g:dg,l:'일간'});
  var aGF=[];if(yg!=null)aGF.push({g:yg,l:'년간'});if(mg!=null)aGF.push({g:mg,l:'월간'});if(dg!=null)aGF.push({g:dg,l:'일간'});if(hg!=null)aGF.push({g:hg,l:'시간'});
  var ceM={0:[1,7],4:[1,7],1:[0,8],5:[0,8],2:[11,9],3:[11,9],6:[1,7],7:[2,6],8:[3,5],9:[3,5]};
  for(var a=0;a<aG.length;a++){var ts=ceM[aG[a].g];for(var b=0;b<aJ.length;b++)if(ts.indexOf(aJ[b].j)>=0&&aJ[b].l!==aG[a].l.replace('간','지'))R.push({name:'천을귀인',type:'good',desc:aG[a].l+' '+TGAN_KR[aG[a].g]+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}
  var mcM=[5,6,8,9,8,9,11,0,2,3];
  for(var a=0;a<aG.length;a++){var t=mcM[aG[a].g];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'문창귀인',type:'good',desc:aG[a].l+' → '+aJ[b].l});}
  var dhM=[9,3,6,0],ymM=[2,8,11,5],hgM=[4,10,1,7];
  var bL=[];if(yj!=null)bL.push({j:yj,l:'년지'});if(dj!=null)bL.push({j:dj,l:'일지'});
  for(var a=0;a<bL.length;a++){var g=getSamhapGroup(bL[a].j);
    for(var b=0;b<aJ.length;b++){
      if(aJ[b].j===dhM[g]&&aJ[b].l!==bL[a].l)R.push({name:'도화살',type:'bad',desc:bL[a].l+' → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});
      if(aJ[b].j===ymM[g]&&aJ[b].l!==bL[a].l)R.push({name:'역마살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
      if(aJ[b].j===hgM[g]&&aJ[b].l!==bL[a].l)R.push({name:'화개살',type:'neutral',desc:bL[a].l+' → '+aJ[b].l});
    }
  }
  var yiM={0:3,2:6,4:6,6:9,8:0};
  if(dg!=null&&dg in yiM){var t=yiM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t)R.push({name:'양인살',type:'bad',desc:'일간 '+TGAN_KR[dg]+' → '+aJ[b].l});}
  var cdM={0:{t:'ji',v:5},1:{t:'gan',v:6},2:{t:'gan',v:3},3:{t:'gan',v:8},4:{t:'gan',v:8},5:{t:'gan',v:7},6:{t:'ji',v:11},7:{t:'gan',v:0},8:{t:'gan',v:9},9:{t:'ji',v:2},10:{t:'gan',v:2},11:{t:'gan',v:1}};
  if(mj!=null&&cdM[mj]){var cd=cdM[mj];if(cd.t==='gan'){for(var a=0;a<aGF.length;a++)if(aGF[a].g===cd.v)R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aGF[a].l+' '+TGAN_KR[aGF[a].g]});}else{for(var b=0;b<aJ.length;b++)if(aJ[b].j===cd.v&&aJ[b].l!=='월지')R.push({name:'천덕귀인',type:'good',desc:'월지 → '+aJ[b].l+' '+JIJI_KR[aJ[b].j]});}}
  if(mj!=null){var g2=getSamhapGroup(mj);var wdG=[8,2,6,0][g2];for(var a=0;a<aGF.length;a++)if(aGF[a].g===wdG)R.push({name:'월덕귀인',type:'good',desc:'월지 삼합 → '+aGF[a].l});}
  var gyM=[4,5,7,8,7,8,10,11,1,2];
  if(dg!=null){var t2=gyM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t2)R.push({name:'금여록',type:'good',desc:'일간 → '+aJ[b].l});}
  var gmM=[9,6,7,8,5,4,1,2,3,0,11,10];
  if(dj!=null){var t3=gmM[dj];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t3&&aJ[b].l!=='일지')R.push({name:'귀문관살',type:'bad',desc:'일지 → '+aJ[b].l});}
  var bhM=[4,1,7,2,10,7,4,1,10,7];
  if(dg!=null){var t4=bhM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t4)R.push({name:'백호살',type:'bad',desc:'일간 → '+aJ[b].l});}
  var hdM=[11,6,2,9,2,9,5,0,8,3];
  if(dg!=null){var t5=hdM[dg];for(var b=0;b<aJ.length;b++)if(aJ[b].j===t5)R.push({name:'학당귀인',type:'good',desc:'일간 → '+aJ[b].l});}
  var seen={};return R.filter(function(r){var k=r.name+r.desc;if(seen[k])return false;seen[k]=1;return true;});
}

function calcSajuForApp(y,m,d,h,min,cityLng){
  // ★ 진태양시 보정: 출생지 경도 기반
  var trueSolarMin = 0;
  var trueH = h, trueMin = min;
  if(h!==null && h!==undefined && h!=='' && cityLng && cityLng > 0){
    trueSolarMin = getTrueSolarCorrection(y, m, d, cityLng);
    var totalMin = (+h)*60 + (+min||0) + trueSolarMin;
    // 날짜 변경선 처리
    if(totalMin < 0) totalMin += 1440;
    if(totalMin >= 1440) totalMin -= 1440;
    trueH = Math.floor(totalMin / 60);
    trueMin = Math.round(totalMin % 60);
  }
  var hb=(trueH!==null&&trueH!==undefined&&trueH!=="")?Math.floor(((+trueH+1)%24)/2):-1;
  var s=calculateSaju(y,m,d,hb,h,min); // 절기 비교는 원래 KST 시간 사용
  // 시주만 진태양시 기준으로 재계산
  if(hb>=0 && trueSolarMin !== 0){
    var trueHB = Math.floor(((+trueH+1)%24)/2);
    s.hj = trueHB;
    var hss=[0,2,4,6,8]; s.hg=(hss[s.dg%5]+trueHB)%10;
  }
  var P=[{l:"연주",s:TGAN_KR[s.yg],b:JIJI_KR[s.yj],gi:s.yg,bi:s.yj},{l:"월주",s:TGAN_KR[s.mg],b:JIJI_KR[s.mj],gi:s.mg,bi:s.mj},{l:"일주",s:TGAN_KR[s.dg],b:JIJI_KR[s.dj],gi:s.dg,bi:s.dj},{l:"시주",s:s.hg!=null?TGAN_KR[s.hg]:"?",b:s.hj!=null?JIJI_KR[s.hj]:"?",gi:s.hg,bi:s.hj}];
  var el={'목':0,'화':0,'토':0,'금':0,'수':0};
  P.forEach(function(p){if(p.gi!=null)el[OHAENG_TGAN[p.gi]]++;if(p.bi!=null)el[OHAENG_JIJI[p.bi]]++;});
  var ss=P.map(function(p){return{pillar:p.l,stem:p.s,branch:p.b,ss:p.gi!=null?getSipsung(s.dg,p.gi):''};});
  var jjg=P.map(function(p){if(p.bi==null)return[];return JIJANGGAN_DATA[p.bi].map(function(it){return{stem:TGAN_KR[it.g],oh:OHAENG_TGAN[it.g],days:it.d};});});

  // ★ 수정1: 지지 십성 (정기 기준) — 배우자궁/직업궁 분석 핵심
  var gungwiNames=['조상·외부환경','직업·사회','배우자궁','자녀·노후'];
  var jiSS=P.map(function(p,idx){
    if(p.bi==null)return{pillar:p.l,branch:p.b,ss:'',gungwi:gungwiNames[idx]};
    var jjgArr=JIJANGGAN_DATA[p.bi];
    var jeonggi=jjgArr[jjgArr.length-1]; // 정기=마지막
    var jss=getSipsung(s.dg,jeonggi.g);
    return{pillar:p.l,branch:p.b,ss:jss,gungwi:gungwiNames[idx],jeonggiStem:TGAN_KR[jeonggi.g]};
  });

  // ★ 수정2: 지장간 포함 오행 (AI 정확도용)
  var elFull={'목':0,'화':0,'토':0,'금':0,'수':0};
  // 천간 4개 (각 1점)
  P.forEach(function(p){if(p.gi!=null)elFull[OHAENG_TGAN[p.gi]]++;});
  // 지장간 (정기 0.7, 중기 0.3, 여기 0.15)
  P.forEach(function(p){
    if(p.bi==null)return;
    var jjgArr=JIJANGGAN_DATA[p.bi];
    jjgArr.forEach(function(it,idx){
      var w=(idx===jjgArr.length-1)?0.7:(idx===jjgArr.length-2)?0.3:0.15;
      elFull[OHAENG_TGAN[it.g]]+=w;
    });
  });
  // 소수점 1자리로 정리
  Object.keys(elFull).forEach(function(k){elFull[k]=Math.round(elFull[k]*10)/10;});
  var lackFull=Object.entries(elFull).filter(function(e){return e[1]<0.3;}).map(function(e){return e[0];});
  var hiddenOh=Object.keys(el).filter(function(k){return el[k]===0 && elFull[k]>=0.3;});

  // ★ 수정3: 암합 계산 (천간↔지장간의 숨겨진 합)
  var AMHAP_TABLE=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  var amhapResults=[];
  var ganList=[{v:s.yg,l:'년간'},{v:s.mg,l:'월간'},{v:s.dg,l:'일간'},{v:s.hg,l:'시간'}];
  var jiList=[{jjg:jjg[0],l:'년지',b:P[0].b},{jjg:jjg[1],l:'월지',b:P[1].b},{jjg:jjg[2],l:'일지',b:P[2].b},{jjg:jjg[3],l:'시지',b:P[3].b}];
  var amGungwi={'년지':'조상·외부','월지':'직업·사회','일지':'배우자','시지':'자녀·노후'};
  ganList.forEach(function(gan){
    if(gan.v==null)return;
    jiList.forEach(function(ji){
      ji.jjg.forEach(function(hidden){
        var hg=TGAN_KR.indexOf(hidden.stem);
        if(hg<0)return;
        AMHAP_TABLE.forEach(function(ah){
          if((gan.v===ah[0]&&hg===ah[1])||(gan.v===ah[1]&&hg===ah[0])){
            // 같은 주 내부 암합은 제외 (이미 명시적 관계)
            if(ganList.indexOf(gan)!==jiList.indexOf(ji)){
              amhapResults.push({from:gan.l+TGAN_KR[gan.v],to:ji.l+ji.b+'(지장간 '+hidden.stem+')',hapOh:ah[2],gungwi:amGungwi[ji.l]||''});
            }
          }
        });
      });
    });
  });

  var uns=P.map(function(p){return p.bi!=null?getUnsung(s.dg,p.bi):'';});
  var sinY=P.map(function(p){return p.bi!=null?get12Sinsal(s.yj,p.bi):'';});
  var sinD=P.map(function(p){return p.bi!=null?get12Sinsal(s.dj,p.bi):'';});
  var sals=getSpecialSinsal(s.yg,s.yj,s.mg,s.mj,s.dg,s.dj,s.hg,s.hj);
  return{P:P,el:el,elFull:elFull,lackFull:lackFull,hiddenOh:hiddenOh,dm:TGAN_KR[s.dg],dmEl:OHAENG_TGAN[s.dg],ss:ss,jiSS:jiSS,jjg:jjg,uns:uns,amhap:amhapResults,sinsal:sinY,sinsalDay:sinD,specialSals:sals,raw:s,currentJeolgi:s.cj,sajuYear:s.sy,trueSolarMin:Math.round(trueSolarMin),trueSolarApplied:(trueSolarMin!==0)};
}

/* ====== 대운(大運) 계산 ====== */
function calcDaewoon(saju, birthY, birthM, birthD, birthH, birthMin, gender){
  var raw=saju.raw;
  // 생시 반영한 정밀 JD (시간 미상시 정오 기준)
  var birthJD=dateToJDN(birthY,birthM,birthD);
  if(birthH!==null&&birthH!==undefined&&birthH!==''){birthJD+=(birthH-12)/24;if(birthMin!==null&&birthMin!==undefined&&birthMin!=='')birthJD+=birthMin/1440;}

  // Step 1: 순행/역행 결정 (양남음녀=순행, 음남양녀=역행)
  var isYangGan=(raw.yg%2===0);
  var isMale=(gender==='남성');
  var isForward=(isYangGan&&isMale)||(!isYangGan&&!isMale);

  // Step 2: 전후 절기 찾기 (천문학 계산)
  // ★ KST 보정: 절기 JD(UTC)를 KST로 변환하여 비교
  var KST=9/24;
  var allTerms=[];
  for(var y=birthY-1;y<=birthY+1;y++){
    for(var j=0;j<JG_LONG.length;j++){
      var jt=JG_LONG[j];
      var jd=findSolarTermJD(y,jt.l)+KST;
      allTerms.push({n:jt.n,mb:jt.mb,jd:jd});
    }
  }
  allTerms.sort(function(a,b){return a.jd-b.jd;});

  var prevTerm=null,nextTerm=null;
  for(var i=0;i<allTerms.length;i++){
    if(allTerms[i].jd<=birthJD)prevTerm=allTerms[i];
    if(allTerms[i].jd>birthJD&&!nextTerm)nextTerm=allTerms[i];
  }

  // Step 3: 대운수 계산
  var daysToTerm=isForward?Math.round(nextTerm.jd-birthJD):Math.round(birthJD-prevTerm.jd);
  var daewoonAge=Math.round(daysToTerm/3);
  if(daewoonAge<=0)daewoonAge=1;

  // Step 4: 대운 간지 나열 (월주 기준 순행/역행)
  var ganjiIdx=-1;
  for(var i=0;i<60;i++){if(i%10===raw.mg&&i%12===raw.mj){ganjiIdx=i;break;}}

  var daewoonsArr=[];
  var currentYear=new Date().getFullYear();
  var currentAge=currentYear-birthY+1; // 한국나이
  var currentDWIdx=-1;

  for(var step=1;step<=8;step++){
    var idx=isForward?((ganjiIdx+step)%60+60)%60:((ganjiIdx-step)%60+60)%60;
    var g=idx%10,ji=idx%12;
    var startAge=daewoonAge+(step-1)*10;
    var endAge=startAge+9;
    var ss=getSipsung(raw.dg,g);
    if(currentAge>=startAge&&currentAge<=endAge)currentDWIdx=daewoonsArr.length;
    daewoonsArr.push({
      startAge:startAge,endAge:endAge,
      gan:TGAN_KR[g],ji:JIJI_KR[ji],
      ganH:TGAN[g],jiH:JIJI[ji],
      ss:ss,oh:OHAENG_TGAN[g]
    });
  }

  // 세운 계산 (올해+내년)
  var seYear1=currentYear,seYear2=currentYear+1;
  var seIdx1=((seYear1-4)%60+60)%60,seIdx2=((seYear2-4)%60+60)%60;
  var se1={y:seYear1,gan:TGAN_KR[seIdx1%10],ji:JIJI_KR[seIdx1%12],ganH:TGAN[seIdx1%10],jiH:JIJI[seIdx1%12],ss:getSipsung(raw.dg,seIdx1%10)};
  var se2={y:seYear2,gan:TGAN_KR[seIdx2%10],ji:JIJI_KR[seIdx2%12],ganH:TGAN[seIdx2%10],jiH:JIJI[seIdx2%12],ss:getSipsung(raw.dg,seIdx2%10)};

  return{
    direction:isForward?'순행':'역행',
    daewoonAge:daewoonAge,
    daewoons:daewoonsArr,
    currentDWIdx:currentDWIdx,
    seun:[se1,se2],
    currentAge:currentAge
  };
}

/* ==========================================
   * ★ v28 신규: 대운/세운 vs 원국 합충 분석
   ========================================== */
function analyzeDWSEvsWonkuk(saju, dw){
  var r = saju.raw;
  var wonJis = [];
  if(r.yj!=null) wonJis.push({v:r.yj, l:'년지', kr:JIJI_KR[r.yj]});
  if(r.mj!=null) wonJis.push({v:r.mj, l:'월지', kr:JIJI_KR[r.mj]});
  wonJis.push({v:r.dj, l:'일지', kr:JIJI_KR[r.dj]});
  if(r.hj!=null) wonJis.push({v:r.hj, l:'시지', kr:JIJI_KR[r.hj]});

  var wonGans = [];
  if(r.yg!=null) wonGans.push({v:r.yg, l:'년간', kr:TGAN_KR[r.yg]});
  if(r.mg!=null) wonGans.push({v:r.mg, l:'월간', kr:TGAN_KR[r.mg]});
  wonGans.push({v:r.dg, l:'일간', kr:TGAN_KR[r.dg]});
  if(r.hg!=null) wonGans.push({v:r.hg, l:'시간', kr:TGAN_KR[r.hg]});

  // 천간합 테이블: [a,b,합화오행]
  var GANHAP = [[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
  // 지지충 테이블
  var CHUNG_PAIRS = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  // 지지합(육합) 테이블: [a,b,합화오행]
  var YUKHAP = [[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
  // 지지삼합 원소
  var SAMHAP_CENTER = [[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
  // 지지형
  var HYUNG_PAIRS = [[2,5],[5,8],[8,2],[3,0],[0,3],[4,4],[6,6],[7,7],[10,10],[1,10],[10,7],[1,4]];
  // 지지해
  var HAE_PAIRS = [[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];

  function checkJiRelations(targetJi, targetLabel, targetKr) {
    var results = [];
    // 지지충
    wonJis.forEach(function(wj){
      CHUNG_PAIRS.forEach(function(cp){
        if((targetJi===cp[0]&&wj.v===cp[1])||(targetJi===cp[1]&&wj.v===cp[0]))
          results.push({type:'충',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'충 — 충돌·변동·전환의 에너지',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    // 육합
    wonJis.forEach(function(wj){
      YUKHAP.forEach(function(yh){
        if((targetJi===yh[0]&&wj.v===yh[1])||(targetJi===yh[1]&&wj.v===yh[0]))
          results.push({type:'합',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'합('+yh[2]+') — 결합·협력·새로운 기회',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':wj.l==='년지'?'조상·외부환경':'자녀·노후'});
      });
    });
    // 형
    wonJis.forEach(function(wj){
      HYUNG_PAIRS.forEach(function(hp){
        if(targetJi===hp[0]&&wj.v===hp[1])
          results.push({type:'형',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'형 — 갈등·시련·성장통',
            impact:wj.l==='일지'?'배우자·건강':wj.l==='월지'?'직업·사회':'관계·환경'});
      });
    });
    // 해
    wonJis.forEach(function(wj){
      HAE_PAIRS.forEach(function(hp){
        if((targetJi===hp[0]&&wj.v===hp[1])||(targetJi===hp[1]&&wj.v===hp[0]))
          results.push({type:'해',target:targetLabel+targetKr,won:wj.l+wj.kr,
            desc:targetKr+wj.kr+'해 — 은밀한 손해·배신·오해',
            impact:'대인관계'});
      });
    });
    return results;
  }

  function checkGanRelations(targetGan, targetLabel, targetKr) {
    var results = [];
    // 천간합
    wonGans.forEach(function(wg){
      GANHAP.forEach(function(gh){
        if((targetGan===gh[0]&&wg.v===gh[1])||(targetGan===gh[1]&&wg.v===gh[0]))
          results.push({type:'천간합',target:targetLabel+targetKr,won:wg.l+wg.kr,
            desc:targetKr+wg.kr+'합('+gh[2]+') — 결합·협력의 기운'});
      });
    });
    // 천간충 — CHEONGAN_CHUNG 테이블 직접 참조 (정확한 4쌍만)
    if(targetGan!=null){
      wonGans.forEach(function(wg){
        CHEONGAN_CHUNG.forEach(function(cc){
          if((targetGan===cc[0]&&wg.v===cc[1])||(targetGan===cc[1]&&wg.v===cc[0]))
            results.push({type:'천간충',target:targetLabel+targetKr,won:wg.l+wg.kr,
              desc:targetKr+wg.kr+' 천간충 — 갈등과 대립'});
        });
      });
    }
    return results;
  }

  // 현재 대운 vs 원국
  var dwResults = [];
  if(dw.currentDWIdx >= 0){
    var cdw = dw.daewoons[dw.currentDWIdx];
    var dwGanIdx = TGAN_KR.indexOf(cdw.gan);
    var dwJiIdx = JIJI_KR.indexOf(cdw.ji);
    dwResults = checkJiRelations(dwJiIdx, '대운', cdw.ji).concat(
      checkGanRelations(dwGanIdx, '대운', cdw.gan)
    );
  }

  // 세운(올해) vs 원국
  var seResults = [];
  if(dw.seun && dw.seun[0]){
    var se = dw.seun[0];
    var seGanIdx = TGAN_KR.indexOf(se.gan);
    var seJiIdx = JIJI_KR.indexOf(se.ji);
    seResults = checkJiRelations(seJiIdx, se.y+'세운', se.ji).concat(
      checkGanRelations(seGanIdx, se.y+'세운', se.gan)
    );
  }

  // 세운(내년) vs 원국
  var seResults2 = [];
  if(dw.seun && dw.seun[1]){
    var se2 = dw.seun[1];
    var se2GanIdx = TGAN_KR.indexOf(se2.gan);
    var se2JiIdx = JIJI_KR.indexOf(se2.ji);
    seResults2 = checkJiRelations(se2JiIdx, se2.y+'세운', se2.ji).concat(
      checkGanRelations(se2GanIdx, se2.y+'세운', se2.gan)
    );
  }

  // 대운 vs 세운 (운끼리의 충돌)
  var dwSeConflict = [];
  if(dw.currentDWIdx >= 0 && dw.seun && dw.seun[0]){
    var cdw2 = dw.daewoons[dw.currentDWIdx];
    var dji = JIJI_KR.indexOf(cdw2.ji), sji = JIJI_KR.indexOf(dw.seun[0].ji);
    CHUNG_PAIRS.forEach(function(cp){
      if((dji===cp[0]&&sji===cp[1])||(dji===cp[1]&&sji===cp[0]))
        dwSeConflict.push('대운'+cdw2.ji+'과 세운'+dw.seun[0].ji+' 충 → 운의 방향 급변, 큰 전환점');
    });
  }

  return{
    daewoon: dwResults,
    seun1: seResults,
    seun2: seResults2,
    dwSeConflict: dwSeConflict
  };
}

/* ==========================================
   * ★ v28 신규: 합충 우선순위 엔진
   ========================================== */
function resolveHapChungPriority(relations){
  if(!relations) return {resolved:[], summary:''};
  var haps = (relations.jijiYukhap||[]).concat(relations.jijiSamhap||[]);
  var chungs = relations.jijiChung||[];
  var resolved = [];
  var summary = [];

  // 각 합에 대해, 충이 합을 깨는지(합피충파) 검사
  haps.forEach(function(hap){
    var hapJis = hap.members ? hap.members.map(function(m){return m.v;}) : [];
    var broken = false;
    chungs.forEach(function(chung){
      // 충의 두 지지 중 하나가 합의 구성원이면 → 합 파괴 가능
      if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
        // 인접성 판단: 합 구성원과 충 구성원이 인접 위치(연-월, 월-일, 일-시)면 합이 깨짐
        var hapPositions = hap.members.map(function(m){return m.l;});
        var chungPositions = [chung.a.l, chung.b.l];
        var adjacent = false;
        var posOrder = ['연지','월지','일지','시지'];
        chungPositions.forEach(function(cp){
          hapPositions.forEach(function(hp){
            var ci = posOrder.indexOf(cp), hi = posOrder.indexOf(hp);
            if(Math.abs(ci-hi)<=1) adjacent = true;
          });
        });
        if(adjacent){
          broken = true;
          resolved.push({type:'합피충파', desc: hap.desc + ' → 인접 ' + chung.desc + '에 의해 깨짐'});
          summary.push(hap.desc+'이 '+chung.desc+'에 의해 파괴됨(합피충파)');
        }
      }
    });
    if(!broken){
      // 탐합망충: 합이 충을 흡수하는지
      chungs.forEach(function(chung){
        if(hapJis.indexOf(chung.a.v)>=0 || hapJis.indexOf(chung.b.v)>=0){
          resolved.push({type:'탐합망충', desc: hap.desc + '이 ' + chung.desc + '을 흡수함'});
          summary.push(hap.desc+'이 '+chung.desc+'을 흡수(탐합망충)');
        }
      });
    }
  });

  return {resolved: resolved, summary: summary.join(' / ')};
}

/* ====== MBTI 데이터 ====== */
var TY={INTJ:{n:"전략가",cf:"Ni-Te-Fi-Se"},INTP:{n:"논리술사",cf:"Ti-Ne-Si-Fe"},ENTJ:{n:"통솔자",cf:"Te-Ni-Se-Fi"},ENTP:{n:"변론가",cf:"Ne-Ti-Fe-Si"},INFJ:{n:"옹호자",cf:"Ni-Fe-Ti-Se"},INFP:{n:"중재자",cf:"Fi-Ne-Si-Te"},ENFJ:{n:"선도자",cf:"Fe-Ni-Se-Ti"},ENFP:{n:"활동가",cf:"Ne-Fi-Te-Si"},ISTJ:{n:"현실주의자",cf:"Si-Te-Fi-Ne"},ISFJ:{n:"수호자",cf:"Si-Fe-Ti-Ne"},ESTJ:{n:"경영자",cf:"Te-Si-Ne-Fi"},ESFJ:{n:"집정관",cf:"Fe-Si-Ne-Ti"},ISTP:{n:"장인",cf:"Ti-Se-Ni-Fe"},ISFP:{n:"모험가",cf:"Fi-Se-Ni-Te"},ESTP:{n:"사업가",cf:"Se-Ti-Fe-Ni"},ESFP:{n:"연예인",cf:"Se-Fi-Te-Ni"}};
var DM_AX=[{L:"E",R:"I",Ll:"외향형(E)",Rl:"내향형(I)",Ld:"사람들과 함께할 때 에너지 충전",Rd:"혼자만의 시간에 에너지 충전"},{L:"S",R:"N",Ll:"감각형(S)",Rl:"직관형(N)",Ld:"현실적이고 구체적인 사실 중시",Rd:"가능성과 패턴, 큰 그림 중시"},{L:"T",R:"F",Ll:"사고형(T)",Rl:"감정형(F)",Ld:"논리와 객관적 분석으로 판단",Rd:"가치와 감정, 조화를 중시"},{L:"J",R:"P",Ll:"판단형(J)",Rl:"인식형(P)",Ld:"계획적이고 체계적인 생활 선호",Rd:"유연하고 즉흥적인 생활 선호"}];
var IN_OP=[{r:"50~60%",d:"미세한 성향",v:55},{r:"61~75%",d:"뚜렷한 성향",v:68},{r:"76~100%",d:"매우 확고한 성향",v:88}];
var DC=["#5B8FD4","#2e8b57","#88619A","#c99a2e"],DB=["rgba(91,143,212,.1)","rgba(46,139,87,.1)","rgba(136,97,154,.1)","rgba(201,154,46,.1)"];
function strLv(v){return v>=76?"매우 강한":v>=61?"상대적으로 강한":"상대적으로 약한";}


function getMBTI(){return ST.ch.map(function(c,i){return c===null?"?":(c==="L"?DM_AX[i].L:DM_AX[i].R);}).join("");}

/* ==========================================
   * 분석 엔진 - 5카테고리 아코디언 서사
   ========================================== */

function analyzeGyeokguk(saju){
  var dg=saju.raw.dg,el=saju.el,ss=saju.ss,dmEl=saju.dmEl;
  var elFull=saju.elFull||saju.el; // ★ 수정4: 지장간 포함 오행 (통관용신 판단용)
  var cnt={비겁:0,식상:0,재성:0,관성:0,인성:0};
  // 천간 십성 카운트 (각 1점) — ★ 일주 천간은 일간(기준점) 자신이므로 제외
  ss.forEach(function(s){if(!s.ss)return;if(s.pillar==='일주')return;if(s.ss==='비견'||s.ss==='겁재')cnt['비겁']++;else if(s.ss==='식신'||s.ss==='상관')cnt['식상']++;else if(s.ss==='편재'||s.ss==='정재')cnt['재성']++;else if(s.ss==='편관'||s.ss==='정관')cnt['관성']++;else if(s.ss==='편인'||s.ss==='정인')cnt['인성']++;});

  // ★ 개선: 지장간 가중치 — 월지(index 1) 가중치 0.7, 나머지 0.3
  saju.jjg.forEach(function(jj,pillarIdx){
    var weight = (pillarIdx === 1) ? 0.7 : 0.3; // 월지=사령, 힘이 강함
    jj.forEach(function(j){
      var g=TGAN_KR.indexOf(j.stem);if(g<0)return;
      var s2=getSipsung(dg,g);
      // 정기(마지막)는 가중치 그대로, 중기·여기는 0.7배
      var w = (jj.indexOf(j) === jj.length-1) ? weight : weight * 0.7;
      if(s2==='비견'||s2==='겁재')cnt['비겁']+=w;
      else if(s2==='식신'||s2==='상관')cnt['식상']+=w;
      else if(s2==='편재'||s2==='정재')cnt['재성']+=w;
      else if(s2==='편관'||s2==='정관')cnt['관성']+=w;
      else if(s2==='편인'||s2==='정인')cnt['인성']+=w;
    });
  });

  // ★ 개선: 월지 득령 보정 — 일간 오행이 월지에서 힘을 얻는지
  var mjName = JIJI_KR[saju.raw.mj];
  var seasonOh = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
  var mjOh = seasonOh[mjName] || '';
  var deukryeong = (mjOh === dmEl); // 월지 오행 = 일간 오행이면 득령
  // 인성 오행이 월지면 간접 득령
  var insungOh = {'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl];
  var ganjeobDeuk = (mjOh === insungOh);
  if(deukryeong) cnt['비겁'] += 1.0; // 득령 보너스
  else if(ganjeobDeuk) cnt['인성'] += 0.5; // 간접 득령

  // ★ elFull은 calcSajuForApp에서 이미 계산됨 (775행에서 선언)

  var sorted=Object.entries(cnt).sort(function(a,b){return b[1]-a[1];}),dominant=sorted[0],weak=sorted[sorted.length-1];
  var selfStr=cnt['비겁']+cnt['인성'],otherStr=cnt['식상']+cnt['재성']+cnt['관성'];
  var strong=selfStr>=otherStr;

  // ★ 개선②: 조후(온도) 분석 — 궁통보감 기반 120개 테이블
  var seasonMap = {'인':1,'묘':1,'진':1,'사':2,'오':2,'미':2,'신':3,'유':3,'술':3,'해':4,'자':4,'축':4};
  var season = seasonMap[mjName] || 0;
  var seasonName = ['','봄(목왕절)','여름(화왕절)','가을(금왕절)','겨울(수왕절)'][season];
  var johuNeeds = '';
  var johuDesc = '';
  var johuYongshin = '';

  // 궁통보감(穹通寶鑑) 조후용신 120개 테이블
  // JOHU[일간인덱스(0-9)][월지인덱스(0-11)] = {oh:필요오행, ys:용신명, desc:해설}
  var JOHU={
  0:{0:{oh:'화',ys:'병화(해동)',desc:'한겨울 큰 나무가 얼어붙음, 병화(태양)로 해동이 급선무'},1:{oh:'화',ys:'병화(해동)',desc:'늦겨울 얼어붙은 나무, 병화로 해동 후 경금으로 가지치기'},2:{oh:'화',ys:'병화(온기)+계수(윤택)',desc:'초봄 갑목, 아직 추위 남아 병화 필요. 계수로 뿌리 수분'},3:{oh:'금',ys:'경금(가지치기)+병화',desc:'봄의 큰 나무가 무성, 경금(도끼)으로 다듬어야 재목'},4:{oh:'금',ys:'경금(조각)+임수+병화',desc:'늦봄 갑목 울창, 경금으로 다듬고 임수로 뿌리 보강'},5:{oh:'수',ys:'계수(냉각)+경금',desc:'초여름 큰 나무, 계수(비)로 물주기가 절실'},6:{oh:'수',ys:'계수(냉각)',desc:'한여름 큰 나무, 계수가 없으면 말라죽음'},7:{oh:'수',ys:'계수(윤택)+경금',desc:'늦여름 갑목, 뿌리가 마르니 계수로 수분 보충'},8:{oh:'화',ys:'정화(제련)+경금',desc:'가을 큰 나무, 경금 칼날이 강하니 정화로 금을 녹여 제어'},9:{oh:'화',ys:'정화+경금+병화',desc:'가을 큰 나무, 경금이 너무 강해 정화로 녹여야 삶'},10:{oh:'금',ys:'경금(다듬기)+임수',desc:'늦가을 갑목, 경금으로 다듬고 임수로 뿌리 수분'},11:{oh:'화',ys:'병화(해동)+경금',desc:'초겨울 큰 나무, 병화로 해동이 시급'}},
  1:{0:{oh:'화',ys:'병화(햇볕)',desc:'한겨울 화초, 병화(햇볕)가 생존의 관건'},1:{oh:'화',ys:'병화(해동)',desc:'늦겨울 화초, 병화로 해동해야 뿌리가 살아남'},2:{oh:'화',ys:'병화(온기)+계수(수분)',desc:'초봄 화초, 병화로 따뜻하게 하고 계수로 물주기'},3:{oh:'수',ys:'계수(수분)+병화',desc:'봄의 꽃, 물(계수)과 햇볕(병화)의 조화가 핵심'},4:{oh:'수',ys:'계수(수분)+병화',desc:'늦봄 화초, 계수로 물주고 병화로 성장 촉진'},5:{oh:'수',ys:'계수(냉각)',desc:'초여름 화초, 뜨거운 열기에 계수(이슬비)가 절실'},6:{oh:'수',ys:'계수(생존)+신금',desc:'한여름 화초, 계수 없으면 말라죽음. 신금(수원) 보조'},7:{oh:'수',ys:'계수(윤택)+병화',desc:'늦여름 화초, 건조한 토기운에 계수가 급함'},8:{oh:'화',ys:'병화(온기)+계수',desc:'가을 화초, 금의 서리바람에 병화로 온기 확보'},9:{oh:'화',ys:'병화+계수',desc:'가을 화초, 서릿발에 시들지 않으려면 병화 필요'},10:{oh:'수',ys:'계수(수분)+병화',desc:'늦가을 화초, 메마른 땅에 물과 햇볕 동시에 필요'},11:{oh:'화',ys:'병화(생존)+무토',desc:'초겨울 화초, 병화가 최우선 생존조건'}},
  2:{0:{oh:'목',ys:'갑목(연료)',desc:'한겨울 태양, 갑목(장작) 없으면 빛을 잃음'},1:{oh:'목',ys:'갑목(연료)+경금',desc:'늦겨울 태양, 갑목으로 불씨 유지. 경금으로 벌채 보조'},2:{oh:'수',ys:'임수(균형)',desc:'초봄 태양이 강해짐, 임수로 과열 방지하며 균형'},3:{oh:'수',ys:'임수(균형)+경금',desc:'봄의 태양, 임수로 빛과 물의 조화. 만물을 기르는 형상'},4:{oh:'수',ys:'임수(제어)',desc:'늦봄 태양이 점점 강해짐, 임수로 기운 조절'},5:{oh:'수',ys:'임수(냉각)+경금',desc:'초여름 태양, 타오르기 시작하니 임수로 반드시 냉각'},6:{oh:'수',ys:'임수(필수냉각)',desc:'한여름 태양 극성, 임수 없으면 만물이 타버림'},7:{oh:'수',ys:'임수(냉각)+경금',desc:'늦여름 태양, 임수 없으면 과열 폭주. 경금은 수원'},8:{oh:'수',ys:'임수(세척)+갑목',desc:'가을 태양 서서히 약해짐, 임수로 균형하고 갑목 보조'},9:{oh:'수',ys:'임수+갑목',desc:'가을 태양, 금기운에 빛이 흐려지니 갑목(연료) 보조'},10:{oh:'목',ys:'갑목(연료)+임수',desc:'늦가을 태양이 약해지기 시작, 갑목(연료)이 중요'},11:{oh:'목',ys:'갑목(연료)',desc:'초겨울 태양, 갑목 없으면 불이 꺼짐'}},
  3:{0:{oh:'목',ys:'갑목(장작)',desc:'한겨울 촛불, 갑목(장작) 없으면 바로 꺼짐'},1:{oh:'목',ys:'갑목(장작)+경금',desc:'늦겨울 촛불, 갑목으로 불씨 유지가 급선무'},2:{oh:'목',ys:'갑목(연료)',desc:'초봄 촛불, 갑목(연료)이 있으면 안정적 타오름'},3:{oh:'목',ys:'갑목(연료)+경금',desc:'봄의 촛불, 갑목을 경금으로 쪼개서 태움'},4:{oh:'목',ys:'갑목(연료)',desc:'늦봄 촛불, 습한 토기운에 갑목이 있어야 유지'},5:{oh:'목',ys:'갑목(연료)+임수',desc:'초여름 촛불이 너무 밝아짐, 갑목 유지+임수 조절'},6:{oh:'수',ys:'임수(조절)+갑목',desc:'한여름 촛불 과열 위험, 임수로 조절. 갑목은 꾸준히 필요'},7:{oh:'목',ys:'갑목(연료)+임수',desc:'늦여름 촛불, 건조한 토에서 갑목 연료 확보가 핵심'},8:{oh:'목',ys:'갑목(연료)',desc:'가을 촛불, 금의 바람에 흔들리니 갑목 연료 필수'},9:{oh:'목',ys:'갑목+병화',desc:'가을 촛불, 경금(강풍)이 강해 갑목 절실'},10:{oh:'목',ys:'갑목(연료)+경금',desc:'늦가을 촛불, 경금으로 장작 쪼개고 갑목 연소 유지'},11:{oh:'목',ys:'갑목(연료)+경금',desc:'초겨울 촛불, 갑목이 없으면 소멸'}},
  4:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 산이 얼어붙음, 병화로 땅 녹이기가 최우선'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 산, 아직 동토상태. 병화가 급선무'},2:{oh:'화',ys:'병화(온기)+갑목+계수',desc:'초봄 산, 병화로 따뜻하게 하고 갑목으로 활기'},3:{oh:'목',ys:'갑목(소통)+병화+계수',desc:'봄의 산, 갑목이 뿌리내려야 산이 살아남'},4:{oh:'화',ys:'병화+갑목',desc:'늦봄 산, 토 왕성 시기라 갑목으로 소통+병화로 활력'},5:{oh:'수',ys:'임수(관개)+갑목',desc:'초여름 산, 임수(비)로 건조함 해소가 급함'},6:{oh:'수',ys:'임수(냉각)+갑목',desc:'한여름 산, 갈라진 땅에 임수가 절실'},7:{oh:'수',ys:'계수(윤택)+갑목+병화',desc:'늦여름 산, 건조한 토에 물 필요. 갑목으로 활력 보조'},8:{oh:'화',ys:'병화+계수',desc:'가을 산, 추워지기 전 병화 확보. 계수로 수분 유지'},9:{oh:'화',ys:'병화+계수',desc:'가을 산, 서리 내리기 전 병화(따뜻함) 필요'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 산, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 산, 병화가 최우선. 얼어붙은 땅을 녹여야'}},
  5:{0:{oh:'화',ys:'병화(해동)+갑목',desc:'한겨울 논밭 얼어붙음, 병화로 땅 녹여야 씨앗이 삶'},1:{oh:'화',ys:'병화(해동)+갑목+경금',desc:'늦겨울 논밭, 병화 해동+갑목 밭갈이 준비'},2:{oh:'목',ys:'갑목(경작)+병화+계수',desc:'초봄 논밭, 갑목(쟁기)으로 땅갈고 병화+계수 조화'},3:{oh:'목',ys:'갑목(경작)+계수+병화',desc:'봄의 논밭, 갑목·계수·병화 삼위일체가 풍작의 비결'},4:{oh:'화',ys:'병화+갑목+계수',desc:'늦봄 논밭, 토 두꺼우니 갑목 소통. 적절한 조화'},5:{oh:'수',ys:'계수(관개)+갑목',desc:'초여름 논밭, 가뭄에 계수(관개용수)가 급함'},6:{oh:'수',ys:'계수(생존)+갑목',desc:'한여름 논밭, 계수 없으면 곡식 타버림'},7:{oh:'수',ys:'계수(윤택)+병화+갑목',desc:'늦여름 논밭, 물과 햇볕 조화로 수확 준비'},8:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 수확 후 병화로 다음 시즌 준비'},9:{oh:'화',ys:'병화+계수',desc:'가을 논밭, 서리에 병화로 온기 유지'},10:{oh:'목',ys:'갑목(소통)+계수',desc:'늦가을 논밭, 메마른 땅에 갑목과 계수로 생기'},11:{oh:'화',ys:'병화(해동)+갑목',desc:'초겨울 논밭, 병화가 급선무. 얼면 생명력 소멸'}},
  6:{0:{oh:'화',ys:'병화(제련)+갑목',desc:'한겨울 쇠가 차갑게 굳음, 병화(용광로)로 담금질해야 명검'},1:{oh:'화',ys:'병화(제련)+갑목',desc:'늦겨울 쇠, 차갑게 굳은 쇠를 병화로 달궈야 날이 섬'},2:{oh:'화',ys:'병화(제련)+갑목',desc:'초봄 쇠, 병화(용광로)로 제련해야 비로소 명검'},3:{oh:'화',ys:'병화(제련)+갑목',desc:'봄의 쇠, 목의 극을 받으니 병화로 중재. 불로 단련해야 빛남'},4:{oh:'목',ys:'갑목(용도)+병화+임수',desc:'늦봄 쇠, 갑목 자르는 날카로움 발휘. 임수 세척'},5:{oh:'수',ys:'임수(담금질)+경금',desc:'초여름 쇠, 뜨거운 불에 임수로 담금질. 명검의 조건'},6:{oh:'수',ys:'임수(냉각)+경금',desc:'한여름 쇠가 녹아내림, 임수 냉각 필수'},7:{oh:'수',ys:'임수(냉각)+갑목',desc:'늦여름 쇠, 건조한 토에 묻혀 임수 필요'},8:{oh:'화',ys:'병화(제련)+임수+갑목',desc:'가을 쇠, 금 왕성하니 병화 제련해야 날이 섬'},9:{oh:'화',ys:'병화(제련)+임수',desc:'가을 쇠, 금 과다하니 병화(제련)가 급함'},10:{oh:'목',ys:'갑목(용도)+임수',desc:'늦가을 쇠, 토에 묻히니 갑목으로 쓸모 찾기'},11:{oh:'화',ys:'병화(제련)+갑목',desc:'초겨울 쇠, 병화로 달궈야 날카로운 도구'}},
  7:{0:{oh:'화',ys:'병화(광택)+임수',desc:'한겨울 보석, 병화(햇볕)에 비춰야 빛남'},1:{oh:'화',ys:'병화(광택)+임수',desc:'늦겨울 보석, 진흙에 묻힌 보석을 병화로 빛내기'},2:{oh:'수',ys:'임수(세척)+병화',desc:'초봄 보석, 임수(맑은 물)로 씻어야 광택'},3:{oh:'수',ys:'임수(세척)+병화',desc:'봄의 보석, 임수 세척+병화에 비추면 찬란한 빛'},4:{oh:'수',ys:'임수(세척)+병화',desc:'늦봄 보석, 습한 흙에서 임수로 닦아야 광택'},5:{oh:'수',ys:'임수(냉각)+계수',desc:'초여름 보석, 더위에 임수로 냉각. 광채 유지'},6:{oh:'수',ys:'임수(보호)+계수',desc:'한여름 보석, 녹지 않게 임수로 보호'},7:{oh:'수',ys:'임수(세척)+계수',desc:'늦여름 보석, 흙탕물에서 임수로 세척해야 빛남'},8:{oh:'수',ys:'임수(광택)+병화',desc:'가을 보석, 임수 광택+병화에 비추면 최상의 빛'},9:{oh:'수',ys:'임수(부드러움)+병화',desc:'가을 보석, 너무 날카로우니 임수로 부드럽게'},10:{oh:'수',ys:'임수(세척)+병화',desc:'늦가을 보석, 토에 묻히니 임수 세척+병화 빛내기'},11:{oh:'화',ys:'병화(빛)+임수',desc:'초겨울 보석, 병화(햇볕)가 있어야 보석으로 빛남'}},
  8:{0:{oh:'화',ys:'병화(해동)+무토',desc:'한겨울 강물 얼어붙음, 병화로 해동 절실'},1:{oh:'화',ys:'병화(해동)+갑목',desc:'늦겨울 강물, 병화로 얼음 녹이기'},2:{oh:'화',ys:'병화(온기)+경금',desc:'초봄 강물, 해빙기에 병화로 온기'},3:{oh:'금',ys:'경금(수원)+갑목',desc:'봄의 강물이 초목에 흡수됨, 경금(수원지)으로 보충'},4:{oh:'목',ys:'갑목(설기)+경금+병화',desc:'늦봄 강물, 토가 막으니 갑목으로 물길 뚫기'},5:{oh:'금',ys:'경금(수원)+임수',desc:'초여름 강물 증발, 경금(수원지) 없으면 바닥 드러남'},6:{oh:'금',ys:'경금(수원)+임수',desc:'한여름 강물 말라감, 경금 절실. 수원지 없으면 갈수기'},7:{oh:'금',ys:'경금(수원)+갑목',desc:'늦여름 강물, 토의 제방에 막혀 경금으로 물길 확보'},8:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 금이 물을 생해 넘치니 갑목으로 설기'},9:{oh:'목',ys:'갑목(설기)+경금',desc:'가을 강물, 물이 차고 넘치니 갑목으로 흐름 조절'},10:{oh:'목',ys:'갑목(소통)+병화',desc:'늦가을 강물, 토의 둑에 막혀 갑목 돌파'},11:{oh:'토',ys:'무토(제방)+병화+갑목',desc:'초겨울 강물 범람위험, 무토(둑)로 제어+병화 해동'}},
  9:{0:{oh:'화',ys:'병화(따뜻함)',desc:'한겨울 이슬, 병화 없으면 얼어서 소멸'},1:{oh:'화',ys:'병화(해동)+신금',desc:'늦겨울 이슬, 병화가 생존 조건'},2:{oh:'금',ys:'신금(수원)+병화',desc:'초봄 이슬, 신금(수원)으로 물 보충+병화로 활기'},3:{oh:'금',ys:'경금(수원)+병화',desc:'봄의 이슬, 나무에 흡수되니 경금(수원)으로 보충'},4:{oh:'화',ys:'병화+신금',desc:'늦봄 이슬, 토에 흡수되기 쉬우니 병화+신금 보조'},5:{oh:'금',ys:'경금(수원)+신금',desc:'초여름 이슬 증발위기, 금(수원지)이 절실'},6:{oh:'금',ys:'경금(수원)+신금',desc:'한여름 이슬 완전 증발 위기, 금이 급함'},7:{oh:'금',ys:'경금(수원)+병화',desc:'늦여름 이슬, 건조한 토에 금으로 물 보충'},8:{oh:'화',ys:'병화(온기)+경금',desc:'가을 이슬, 금이 물을 생해주니 병화로 따뜻하게'},9:{oh:'화',ys:'병화+경금',desc:'가을 이슬 차가워짐, 병화 필요'},10:{oh:'금',ys:'신금(수원)+병화+갑목',desc:'늦가을 이슬, 토에 막히니 신금 수원 확보'},11:{oh:'화',ys:'병화(따뜻함)+무토',desc:'초겨울 이슬, 병화 없으면 얼어붙음'}}
  };

  // 조후용신 테이블 조회 (일간 dg + 월지 mj)
  var johuEntry = JOHU[dg] && JOHU[dg][saju.raw.mj];
  if(johuEntry){
    johuNeeds = johuEntry.oh;
    johuYongshin = johuEntry.ys;
    johuDesc = johuEntry.desc;
  }

  // ★ 개선④: 용신 3단계 (조후→통관→억부) + 종격 판별
  var yongshin = '';
  var yongshinType = '';
  var isJonggyeok = false;
  var jonggyeokName = '';
  var jonggyeokDesc = '';

  // ★ 0순위: 종격(從格) 판별 — 한쪽이 압도적이면 따라가야 함
  var totalOh = (el['목']||0)+(el['화']||0)+(el['토']||0)+(el['금']||0)+(el['수']||0);
  var selfRatio = totalOh > 0 ? selfStr / totalOh : 0.5;
  var bigeobInseong = (cnt['비겁']||0) + (cnt['인성']||0);
  
  // ★ 종격 통근 검증: 일간이 지지에서 건록·제왕·관대면 절대 종격 불가
  var anyStrongRoot = false;
  [saju.raw.yj, saju.raw.mj, saju.raw.dj, saju.raw.hj].forEach(function(ji){
    if(ji == null) return;
    var u = getUnsung(dg, ji);
    if(u === '건록' || u === '제왕' || u === '관대') anyStrongRoot = true;
  });

  // 종재격: 재성이 압도적 + 비겁·인성 거의 없음 + 통근 없음
  if ((cnt['재성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종재격';
    jonggyeokDesc = '재성을 따라가는 사주 — 재물·사업에 올인해야 성공하는 구조. 억지로 자존심 세우면 역효과';
    yongshin = '식상→재성 흐름 강화(재물의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종살격(종관격): 관성이 압도적 + 비겁·인성 거의 없음
  else if ((cnt['관성']||0) >= 3 && bigeobInseong <= 0.5 && selfRatio < 0.15 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종살격';
    jonggyeokDesc = '관성을 따라가는 사주 — 조직·권력 속에서 순응해야 성공. 반항하면 깨짐';
    yongshin = '재성→관성 흐름 강화(조직의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종아격: 식상이 압도적 + 인성 거의 없음 (인성이 식상을 극하므로)
  else if ((cnt['식상']||0) >= 3 && (cnt['인성']||0) <= 0.3 && selfRatio < 0.2 && !anyStrongRoot) {
    isJonggyeok = true;
    jonggyeokName = '종아격';
    jonggyeokDesc = '식상을 따라가는 사주 — 표현·창작·예술에 올인해야 성공. 틀에 가두면 폭발';
    yongshin = '비겁→식상 흐름 강화(표현의 흐름을 따라감)';
    yongshinType = '종격';
  }
  // 종강격: 비겁+인성이 압도적 (극신강인데 식상·재성·관성이 거의 없음)
  else if (bigeobInseong >= 5 && (cnt['식상']||0)+(cnt['재성']||0)+(cnt['관성']||0) <= 0.5 && selfRatio > 0.85) {
    isJonggyeok = true;
    jonggyeokName = '종강격';
    jonggyeokDesc = '자기 힘을 따라가는 사주 — 남의 말 안듣고 자기 길을 가야 성공. 독립·자주가 핵심';
    yongshin = '비겁·인성 유지(자기 에너지를 극대화)';
    yongshinType = '종격';
  }

  // 1순위: 조후용신 (종격이 아닐 때만)
  if(!isJonggyeok && johuYongshin){
    yongshin = johuYongshin;
    yongshinType = '조후';
  }

  // ★ 수정7: 1.5순위 — 병약용신 (특정 십성 과다시 제어)
  if(!isJonggyeok && !yongshin){
    if((cnt['관성']||0) >= 3 && (cnt['식상']||0) < 1){
      yongshin='식상(제관—관성 과다를 식상으로 제어)'; yongshinType='병약';
    } else if((cnt['식상']||0) >= 3 && (cnt['인성']||0) < 1){
      yongshin='인성(제식상—식상 과다를 인성으로 제어)'; yongshinType='병약';
    } else if((cnt['재성']||0) >= 3 && selfRatio > 0.15 && (cnt['비겁']||0) < 1){
      yongshin='비겁(방어—재성 과다에 자기 힘 보강)'; yongshinType='병약';
    } else if((cnt['인성']||0) >= 3 && (cnt['재성']||0) < 1){
      yongshin='재성(제인성—인성 과다를 재성으로 제어)'; yongshinType='병약';
    }
  }

  // ★ 수정4: 2순위 통관용신 — 지장간 포함 오행(elFull) 기준으로 판단
  if(!isJonggyeok && !yongshin){
    // 금목상쟁: 금>=2 && 목>=2 → 통관=수
    if((elFull['금']||0)>=2 && (elFull['목']||0)>=2 && (elFull['수']||0)<0.3){
      yongshin='수(금목소통)'; yongshinType='통관';
    }
    // 수화상충: 수>=2 && 화>=2 → 통관=목
    else if((elFull['수']||0)>=2 && (elFull['화']||0)>=2 && (elFull['목']||0)<0.3){
      yongshin='목(수화소통)'; yongshinType='통관';
    }
    // 목토상쟁: 목>=2 && 토>=2 → 통관=화
    else if((elFull['목']||0)>=2 && (elFull['토']||0)>=2 && (elFull['화']||0)<0.3){
      yongshin='화(목토소통)'; yongshinType='통관';
    }
    // 화금상쟁: 화>=2 && 금>=2 → 통관=토
    else if((elFull['화']||0)>=2 && (elFull['금']||0)>=2 && (elFull['토']||0)<0.3){
      yongshin='토(화금소통)'; yongshinType='통관';
    }
    // 토수상쟁: 토>=2 && 수>=2 → 통관=금
    else if((elFull['토']||0)>=2 && (elFull['수']||0)>=2 && (elFull['금']||0)<0.3){
      yongshin='금(토수소통)'; yongshinType='통관';
    }
  }

  // 3순위: 억부용신 (종격이 아닐 때만)
  if(!isJonggyeok && !yongshin){
    yongshinType='억부';
    if(strong){
      yongshin=cnt['식상']<1?'식상(설기)':cnt['재성']<1?'재성(재물)':'관성(절제)';
    }else{
      yongshin=cnt['인성']<1?'인성(학문,귀인)':'비겁(동료,자립)';
    }
  }

  var ohMap={'비겁':dmEl,'식상':{'목':'화','화':'토','토':'금','금':'수','수':'목'}[dmEl],'재성':{'목':'토','화':'금','토':'수','금':'목','수':'화'}[dmEl],'관성':{'목':'금','화':'수','토':'목','금':'화','수':'토'}[dmEl],'인성':{'목':'수','화':'목','토':'화','금':'토','수':'금'}[dmEl]};
  var sr=Object.entries(el).sort(function(a,b){return b[1]-a[1];}),lack=sr.filter(function(e){return e[1]===0;}).map(function(e){return e[0];});

  // ★ 신규①: 정식 격국 분류 (월지 정기 기반)
  var mjData = JIJANGGAN_DATA[saju.raw.mj]; // 월지의 지장간
  var jeonggiGan = mjData[mjData.length - 1].g; // 정기 = 배열 마지막
  var jeonggiSS = getSipsung(dg, jeonggiGan); // 정기의 십성
  var gyeokgukName = '';
  var gyeokgukDesc = '';
  if (jeonggiSS === '비견' || jeonggiSS === '겁재') {
    // 비견/겁재면 건록격 또는 양인격 판별
    var iljuUnsung = getUnsung(dg, saju.raw.mj);
    if (iljuUnsung === '건록') { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 스스로 일어서는 힘이 강하고, 남에게 기대지 않는 자립형'; }
    else if (iljuUnsung === '제왕') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 극강의 추진력과 결단력, 잘 쓰면 장군 못 쓰면 화를 부름'; }
    else if (jeonggiSS === '겁재') { gyeokgukName = '양인격'; gyeokgukDesc = '승부사·결단의 격 — 경쟁심이 강하고 승부에 집착, 한번 물면 놓지 않는 기질'; }
    else { gyeokgukName = '건록격'; gyeokgukDesc = '자수성가·독립의 격 — 뭐든 혼자 해내려는 성향, 독립심이 강한 자립형'; }
  } else {
    var gyeokgukMap = {
      '식신': {name:'식신격', desc:'표현·재능·먹거리의 격 — 무언가를 만들고 표현하고 먹이는 것에 재능, 여유롭고 낙천적'},
      '상관': {name:'상관격', desc:'반항·창의·파격의 격 — 기존 틀을 부수는 창의력, 자유로운 영혼, 조직보다 프리랜서'},
      '편재': {name:'편재격', desc:'투자·사업·모험의 격 — 큰 돈을 굴리는 감각, 사업가 기질, 리스크를 즐김'},
      '정재': {name:'정재격', desc:'안정·저축·성실의 격 — 꾸준히 모으는 재테크 체질, 안정적이고 계획적'},
      '편관': {name:'편관격', desc:'도전·권력·군인의 격 — 거친 환경에서 빛나는 리더십, 카리스마와 추진력'},
      '정관': {name:'정관격', desc:'질서·공직·안정의 격 — 체계와 규칙 속에서 성장, 조직 안에서 출세하는 타입'},
      '편인': {name:'편인격', desc:'비범·연구·고독의 격 — 독특한 사고방식, 한 분야를 깊이 파는 연구자 기질'},
      '정인': {name:'정인격', desc:'학문·귀인·어머니의 격 — 배움을 통해 성장, 주변에 귀인이 나타나는 구조'}
    };
    var gInfo = gyeokgukMap[jeonggiSS];
    if (gInfo) { gyeokgukName = gInfo.name; gyeokgukDesc = gInfo.desc; }
    else { gyeokgukName = jeonggiSS + '격'; gyeokgukDesc = ''; }
  }
  // 격국 근거 텍스트
  var gyeokgukBasis = '월지 '+JIJI_KR[saju.raw.mj]+'의 정기 '+TGAN_KR[jeonggiGan]+' → 일간 '+TGAN_KR[dg]+'에 대해 '+jeonggiSS;

  // ★ v28 신규: 화격(化格) 판별 — 천간합이 성립하고 합화오행이 월지에서 힘을 얻을 때
  var isHwakyeok = false;
  var hwakyeokName = '';
  var hwakyeokDesc = '';
  if(!isJonggyeok) {
    var GANHAP_HWA = [{a:0,b:5,oh:'토',name:'갑기합화토'},{a:1,b:6,oh:'금',name:'을경합화금'},
      {a:2,b:7,oh:'수',name:'병신합화수'},{a:3,b:8,oh:'목',name:'정임합화목'},{a:4,b:9,oh:'화',name:'무계합화화'}];
    var allGans = [saju.raw.yg, saju.raw.mg, dg, saju.raw.hg].filter(function(g){return g!=null;});
    // 일간이 합에 참여하는지 체크
    GANHAP_HWA.forEach(function(gh){
      if(dg !== gh.a && dg !== gh.b) return; // 일간이 합에 포함되어야 함
      var partner = (dg === gh.a) ? gh.b : gh.a;
      // ★ 합 상대가 일간과 인접해야 함 (월간 또는 시간만 가능)
      var adjGans = [saju.raw.mg];
      if(saju.raw.hg != null) adjGans.push(saju.raw.hg);
      if(adjGans.indexOf(partner) < 0) return; // 인접하지 않으면 화격 불가
      // 합화오행이 월지에서 득령하는지 확인
      var seasonOh2 = {'인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수','자':'수','축':'토'};
      var mjOh2 = seasonOh2[JIJI_KR[saju.raw.mj]] || '';
      if(mjOh2 === gh.oh){
        // ★ 합화오행을 극하는 오행이 강하면 화격 불성립
        var kukOh = {'목':'금','화':'수','토':'목','금':'화','수':'토'};
        var attacker = kukOh[gh.oh];
        if(attacker && (elFull[attacker]||0) >= 2) return; // 극오행 강하면 불가
        // 합화 성립 조건: 비겁·인성이 약하고 (자기 오행 힘이 없어야 변할 수 있음)
        if(bigeobInseong <= 1.5){
          isHwakyeok = true;
          hwakyeokName = gh.name + '격';
          hwakyeokDesc = gh.name + ' — 일간이 본래 오행을 버리고 '+gh.oh+'의 성질로 완전히 변함. 극히 드문 특수격';
        }
      }
    });
    if(isHwakyeok){
      gyeokgukName = hwakyeokName;
      gyeokgukDesc = hwakyeokDesc;
      gyeokgukBasis = '화격 판별: 천간합이 월지에서 득령 + 자기오행 미약';
      isJonggyeok = true; // 화격도 특수격으로 취급
    }
  }

  // ★ v28 신규: 파격(破格) 재산정 — 파격 조건 충족시 용신 조정
  var pagyeokInfo = '';
  var originalGyeokguk = gyeokgukName;
  if(!isJonggyeok && !isHwakyeok) {
    // 개별 십성 카운트 (파격 판별용)
    var _raw = {};
    ss.forEach(function(s2){if(s2.ss) _raw[s2.ss] = (_raw[s2.ss]||0)+1;});
    saju.jjg.forEach(function(jj){jj.forEach(function(j){var g2=TGAN_KR.indexOf(j.stem);if(g2>=0){var s3=getSipsung(dg,g2);_raw[s3]=(_raw[s3]||0)+0.5;}});});

    // 식신격 + 편인 → 효신탈식 (파격)
    if(gyeokgukName==='식신격' && (_raw['편인']||0) >= 1 && (_raw['편재']||0) < 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 식신의 재능을 편인이 빼앗음. 재능은 있으나 발휘가 막힘';
      yongshin = '편재(제편인) — 편인을 제어하여 식신을 살려야 함'; yongshinType = '파격조정';
    }
    // 정관격 + 상관 → 상관견관 (파격)
    else if(gyeokgukName==='정관격' && (_raw['상관']||0) >= 1 && (_raw['편인']||0) < 1){
      pagyeokInfo = '상관견관(傷官見官) — 상관이 정관을 공격. 능력은 있으나 조직과 충돌';
      yongshin = '인성(제상관) — 인성으로 상관을 누르고 정관을 보호'; yongshinType = '파격조정';
    }
    // 정재격/편재격 + 겁재 → 겁재탈재 (파격)
    else if((gyeokgukName==='정재격'||gyeokgukName==='편재격') && (_raw['겁재']||0) >= 1){
      pagyeokInfo = '겁재탈재(劫財奪財) — 재물이 들어와도 빠져나감. 동업·보증 주의';
      yongshin = '관성(제겁재) — 관성으로 겁재를 제어하여 재성 보호'; yongshinType = '파격조정';
    }
    // 편관격 + 식신 없음 → 칠살무제 (파격)
    else if(gyeokgukName==='편관격' && (_raw['식신']||0) < 0.5 && (_raw['편인']||0) < 0.5){
      pagyeokInfo = '칠살무제(七殺無制) — 편관의 압박을 제어할 식신이 없음. 극심한 스트레스';
      yongshin = '식신(제살) — 식신으로 편관을 제어해야 안정'; yongshinType = '파격조정';
    }
    // 편인격 + 식신 → 효신탈식 (파격)  
    else if(gyeokgukName==='편인격' && (_raw['식신']||0) >= 1){
      pagyeokInfo = '효신탈식(梟神奪食) — 편인이 식신을 극함. 생각만 많고 표현이 막힘';
      yongshin = '편재(제편인) — 편재로 편인을 제어'; yongshinType = '파격조정';
    }
  }

  // ★ 종격이면 격국명을 종격으로 오버라이드
  if (isJonggyeok && !isHwakyeok) {
    gyeokgukName = jonggyeokName;
    gyeokgukDesc = jonggyeokDesc;
    gyeokgukBasis = '종격 판별: 한쪽 세력이 압도적 (자기편비율 ' + Math.round(selfRatio*100) + '%)';
  }

  // ★ 신규②: 신강도 점수 (0~100)
  var totalStr = selfStr + otherStr;
  var strengthScore = totalStr > 0 ? Math.round(selfStr / totalStr * 100) : 50;
  var strengthGrade = '';
  if (strengthScore >= 80) strengthGrade = '극신강';
  else if (strengthScore >= 60) strengthGrade = '신강';
  else if (strengthScore >= 45) strengthGrade = '중화';
  else if (strengthScore >= 25) strengthGrade = '신약';
  else strengthGrade = '극신약';

  // ★ 신규③: 오행 흐름(순환) 분석
  var ohOrder = ['목','화','토','금','수'];
  var flowCuts = []; // 끊어진 구간
  var flowStrong = []; // 강한 구간
  for (var fi = 0; fi < 5; fi++) {
    var from = ohOrder[fi];
    var to = ohOrder[(fi + 1) % 5];
    var fromCnt = el[from] || 0;
    var toCnt = el[to] || 0;
    var key = from + to;
    if (fromCnt >= 1 && toCnt === 0 && OHENG_FLOW_DESC[key]) {
      flowCuts.push(OHENG_FLOW_DESC[key].chain + ' 단절 (' + OHENG_FLOW_DESC[key].cut + ')');
    }
    if (fromCnt >= 2 && toCnt >= 2) {
      flowStrong.push(from + '→' + to + ' 강력 (에너지가 풍부하게 흐름)');
    }
  }
  var flowText = '';
  if (flowCuts.length > 0) flowText += '단절: ' + flowCuts.join(' / ');
  if (flowStrong.length > 0) flowText += (flowText ? '\n' : '') + '강한흐름: ' + flowStrong.join(', ');
  if (!flowText) flowText = '모든 오행이 고르게 순환하는 구조 (균형형)';
  var flowSummary = '오행분포: ' + ohOrder.map(function(o){ return o + '=' + (el[o]||0); }).join(' ') + '\n' + flowText;

  // ★ 신규④: 납음오행 (일주 기준)
  var napeumInfo = getNapeum(dg, saju.raw.dj);
  var napeumText = napeumInfo ? napeumInfo.name + ' — ' + napeumInfo.desc : '';

  return{cnt:cnt,dominant:dominant,weak:weak,strong:strong,
    yongshin:yongshin,yongshinType:yongshinType,ohMap:ohMap,
    selfStr:selfStr,otherStr:otherStr,lack:lack,domOh:sr[0],
    deukryeong:deukryeong,
    // 조후 정보
    season:season,seasonName:seasonName,johuNeeds:johuNeeds,johuDesc:johuDesc,johuYongshin:johuYongshin,
    // ★ 신규 필드
    gyeokgukName:gyeokgukName, gyeokgukDesc:gyeokgukDesc, gyeokgukBasis:gyeokgukBasis,
    strengthScore:strengthScore, strengthGrade:strengthGrade,
    flowSummary:flowSummary, napeumText:napeumText,
    isJonggyeok:isJonggyeok, jonggyeokName:jonggyeokName,
    pagyeokInfo:pagyeokInfo, isHwakyeok:isHwakyeok
  };
}

// ============================================================
// Part B: 합충형 + 프롬프트 + ILJU_DATA + AI 스트리밍
// ============================================================



// ★★★ Level A: 십성을 "해석 맥락"으로 변환하는 사전 ★★★
var SS_CONTEXT = {
  '비견': {
    general: '나와 같은 에너지. 승부욕, 자존심, 독립심',
    spouse: '배우자가 친구 같은 관계. 동등한 파트너십을 원하지만 주도권 다툼 가능',
    career: '경쟁 환경에서 빛남. 동업보다 독자 노선. 자기 방식을 고수',
    child: '말년에 자기 에너지가 넘침. 독립적인 노후',
    outer: '세상과 대등하게 부딪히려는 에너지'
  },
  '겁재': {
    general: '내 것을 지키려는 강한 에너지. 경쟁심과 소유욕',
    spouse: '연애에서 소유욕이 강해짐. 상대를 내 편으로 만들고 싶은 욕구. 질투의 근원',
    career: '돈을 벌면 빼앗기거나 쓰게 되는 패턴. 동업 주의',
    child: '말년에 재물이 흩어지기 쉬운 구조. 자녀에게 퍼주는 패턴',
    outer: '세상에서 내 몫을 챙기려는 에너지'
  },
  '식신': {
    general: '여유롭게 즐기고 표현하는 에너지. 먹고 놀고 창작',
    spouse: '연애를 천천히 음미하는 스타일. 급하지 않고 여유로움. 상대를 편하게 해주는 매력',
    career: '창의적 직업에 적합. 콘텐츠, 요리, 예술, 교육. 적성이 곧 직업',
    child: '자녀운 좋음. 말년이 풍요로움',
    outer: '세상에 자기를 자연스럽게 드러내는 에너지'
  },
  '상관': {
    general: '강렬하게 표현하고 기존 틀을 부수는 에너지. 반골기질',
    spouse: '연애에서 상대의 권위를 인정하지 않음. 자유로운 관계를 원함. 끊고 맺음이 확실',
    career: '기존 규칙을 싫어함. 프리랜서, 예술, 창업. 조직 안에서는 마찰',
    child: '자녀가 강한 개성을 가짐. 말년에 변화가 많음',
    outer: '세상의 규칙에 도전하는 에너지'
  },
  '편재': {
    general: '움직이는 돈, 사업적 감각. 돈을 쓸 줄 아는 에너지',
    spouse: '여러 인연을 만나기 쉬운 구조. 활발한 연애. 한 사람에 정착이 늦을 수 있음',
    career: '사업가 기질. 영업, 투자, 유통. 여러 수입원. 돈이 크게 들어오고 크게 나감',
    child: '말년에 재물 변동. 자녀와의 관계에서 돈 이슈',
    outer: '세상에서 돈과 기회를 포착하는 에너지'
  },
  '정재': {
    general: '안정적인 돈, 꾸준한 수입. 저축과 관리의 에너지',
    spouse: '한 사람에게 정하면 깊이 빠짐. 헌신적. 안정적 관계 추구',
    career: '월급, 안정적 직장. 재무, 관리직. 꾸준히 쌓아가는 구조',
    child: '말년 재물 안정. 자녀에게 물려줄 것이 있음',
    outer: '세상에서 안정적 위치를 확보하려는 에너지'
  },
  '편관': {
    general: '외부에서 오는 압박, 통제, 도전. 두려움과 각성의 에너지',
    spouse: '강하고 카리스마 있는 상대에게 끌림. 연애에 긴장감. 밀당이 강렬',
    career: '권위 있는 직업. 군인, 경찰, 법조, 의료. 위기에서 빛나는 리더십',
    child: '말년에 책임과 압박. 편하지 않지만 성취감',
    outer: '세상이 나에게 도전장을 던지는 느낌'
  },
  '정관': {
    general: '질서, 규율, 사회적 인정. 명예와 책임의 에너지',
    spouse: '예의 바르고 신뢰할 수 있는 상대. 안정적이지만 답답할 수 있음',
    career: '공무원, 대기업, 전문직. 조직 안에서 인정받는 구조',
    child: '자녀가 반듯함. 말년에 사회적 지위 유지',
    outer: '세상이 부여한 역할을 성실히 수행'
  },
  '편인': {
    general: '특이한 배움, 직관, 영감. 일반적이지 않은 지적 에너지',
    spouse: '상대를 이해하기 어려운 깊이. 정신적 교감을 중시. 독특한 인연',
    career: '특수 분야. 점술, 심리, 예술, IT, 연구. 남다른 시각으로 승부',
    child: '말년에 영적/정신적 성장. 외로울 수 있지만 깊음',
    outer: '세상을 남과 다른 시각으로 봄'
  },
  '정인': {
    general: '배움, 보호, 어머니의 에너지. 지적 탐구와 안정',
    spouse: '상대에게 보호받고 싶은 욕구. 또는 상대를 돌보는 관계',
    career: '교육, 학문, 연구, 출판. 배운 것을 전달하는 직업',
    child: '말년에 학문적 성취. 지적 활동이 노후의 기쁨',
    outer: '세상에서 배움을 통해 성장하는 에너지'
  }
};

// ★★★ Level A: 신살을 "이 사람의 이야기"로 변환 ★★★
var SINSAL_STORY = {
  '천을귀인': '인생의 결정적 순간에 도움의 손길이 옴. 멘토, 선배, 우연한 만남이 방향을 바꿔줌',
  '문창귀인': '글과 말에 재능. 공부, 시험, 문서 작업에서 행운. 표현력이 무기',
  '역마살': '한 곳에 머물기 힘든 에너지. 이동, 변화, 해외와 인연. 움직일 때 운이 열림',
  '학당귀인': '타고난 학습 능력. 새로운 분야를 빠르게 흡수. 배움 자체가 즐거움',
  '양인살': '평소엔 순하지만 위기에 칼날처럼 각성. 극한 집중력. 위험할 때 진가 발휘',
  '홍염살': '타고난 성적 매력과 이성 흡인력. 연애에서 강렬한 끌림을 만듦. 양날의 검',
  '음양차착': '겉으로 보이는 성별 에너지와 속이 반대. 남자인데 섬세하거나, 여자인데 강인. 이 괴리가 매력이자 혼란',
  '괴강살': '극단적 결단력. 한번 결정하면 뒤돌아보지 않음. 올인 아니면 올아웃',
  '화개살': '예술·종교·철학에 끌림. 정신세계가 깊음. 세속적 성공보다 의미를 찾음',
  '도화살': '사람을 끌어당기는 매력. 연예, 서비스, 대인관계에서 빛남',
  '겁살': '갑작스러운 변화에 노출되기 쉬움. 하지만 위기 대응력도 함께 있음',
  '망신살': '체면이 무너지는 순간이 올 수 있음. 하지만 이것이 오히려 진짜 자기를 찾는 계기',
  '천문성': '직관과 영감. 보이지 않는 것을 감지하는 능력. 상담, 심리, 예술에 재능'
};

// ★★★ Level A: 궁위별 해석 맥락 생성 ★★★
function buildGungwiContext(saju, gg) {
  var result = {};
  var jiSSArr = saju.jiSS || [];

  // 배우자궁 (일지)
  var spouseSS = jiSSArr[2] ? jiSSArr[2].ss : null;
  if (spouseSS && SS_CONTEXT[spouseSS]) {
    result.spouse = '★배우자궁 읽기: ' + SS_CONTEXT[spouseSS].spouse;
  }

  // 직업궁 (월지)
  var careerSS = jiSSArr[1] ? jiSSArr[1].ss : null;
  if (careerSS && SS_CONTEXT[careerSS]) {
    result.career = '★직업궁 읽기: ' + SS_CONTEXT[careerSS].career;
  }

  // 자녀궁/노후궁 (시지)
  var childSS = jiSSArr[3] ? jiSSArr[3].ss : null;
  if (childSS && SS_CONTEXT[childSS]) {
    result.child = '★노후궁 읽기: ' + SS_CONTEXT[childSS].child;
  }

  // 외부환경 (년지)
  var outerSS = jiSSArr[0] ? jiSSArr[0].ss : null;
  if (outerSS && SS_CONTEXT[outerSS]) {
    result.outer = '★외부환경 읽기: ' + SS_CONTEXT[outerSS].outer;
  }

  return result;
}

// ★★★ Level A: 신살 스토리 생성 ★★★
function buildSinsalStory(saju) {
  var stories = [];
  if (saju.specialSals) {
    saju.specialSals.forEach(function(s) {
      var story = SINSAL_STORY[s.name];
      if (story) {
        stories.push('★' + s.name + '(' + s.desc + '): ' + story);
      }
    });
  }
  // 추가 신살도
  if (typeof calcExtraSinsal === 'function') {
    var extras = calcExtraSinsal(saju);
    extras.forEach(function(es) {
      var story = SINSAL_STORY[es.name];
      if (story && stories.every(function(s){ return s.indexOf(es.name) < 0; })) {
        stories.push('★' + es.name + '(' + es.desc + '): ' + story);
      }
    });
  }
  return stories.join('\n');
}

// ★★★ Level A: 올해 핵심 사건 요약 ★★★
function buildYearHighlight(dwSeAnalysis, dw, wolunArr, wonJiArr) {
  var highlights = [];

  // 세운 합충 중 가장 강한 것
  if (dwSeAnalysis.seun1.length > 0) {
    dwSeAnalysis.seun1.forEach(function(d) {
      var prefix = '';
      if (d.type.indexOf('충') >= 0) prefix = '⚡변화: ';
      else if (d.type.indexOf('합') >= 0) prefix = '💫기회: ';
      else if (d.type.indexOf('형') >= 0) prefix = '🔥시련: ';
      highlights.push(prefix + d.desc + (d.impact ? ' → ' + d.impact + ' 영역에 영향' : ''));
    });
  }

  // 월운에서 합충이 겹치는 달 찾기
  var hotMonths = [];
  if (wolunArr) {
    wolunArr.forEach(function(w) {
      if (w.group === '관성') hotMonths.push(w.month + ': 책임·압박의 달, 직장에서 긴장 가능');
      if (w.group === '재성') hotMonths.push(w.month + ': 재물 기회의 달, 돈이 움직임');
    });
  }

  return {
    main: highlights.length > 0 ? highlights.join('\n') : '올해 특별한 합충 없음',
    hotMonths: hotMonths.length > 0 ? hotMonths.slice(0, 3).join('\n') : ''
  };
}

// ★★★ Level A: 납음 스토리 변환 ★★★
var NAPEUM_STORY = {
  '해중금': '바다 속에 가라앉은 금. 겉으로 드러나지 않지만 발견되면 엄청난 가치',
  '노중화': '화덕 안의 불. 통제된 열정. 한 곳에 집중하면 무엇이든 녹임',
  '대림목': '큰 숲의 나무. 혼자 서도 장엄하지만 숲 속에서 더 빛남',
  '노방토': '길가의 흙. 많은 사람이 밟고 지나가지만 모든 것의 기초',
  '검봉금': '칼날 위의 금. 날카롭고 결단력 있지만 상처도 쉽게 줌',
  '산두화': '산꼭대기의 불. 높은 이상을 품고 있지만 쉽게 꺼질 수 있음',
  '간하수': '시냇물. 끊임없이 흐르며 장애물을 돌아가는 유연함',
  '성두토': '성벽 위의 흙. 방어와 보호의 에너지. 안전한 공간을 만들어냄',
  '백랍금': '백금. 세공되면 최고의 가치. 시련이 곧 광택',
  '양류목': '버드나무. 유연하게 흔들리지만 뿌리는 깊음. 적응력의 상징',
  '천하수': '하늘에서 내리는 비. 모든 것을 적시는 은혜',
  '대역토': '큰 언덕의 흙. 포용력과 안정감. 많은 것을 품을 수 있는 그릇',
  '사중금': '모래 속의 금. 인내하고 걸러내야 비로소 빛나는 가치',
  '산하화': '산 아래의 불. 따뜻하고 생명력 있는 에너지',
  '평지목': '평지의 나무. 누구에게나 그늘을 제공하는 존재',
  '벽상토': '벽 위의 흙. 장식적이지만 기초가 필요함',
  '금박금': '금박. 화려하지만 얇음. 겉모습과 실속의 괴리',
  '복등화': '등불. 어둠을 밝히는 따뜻한 빛. 주변 사람에게 희망',
  '천상수': '하늘 위의 물(구름). 비전이 크고 이상이 높음',
  '대해수': '큰 바다. 모든 것을 받아들이는 포용력. 깊이를 알 수 없음',
  '상자목': '뽕나무. 실용적이고 생산적. 누에를 먹여 비단을 만듦',
  '대계수': '큰 시내물. 힘차게 흐르며 방향이 확실함',
  '사중토': '모래 흙. 유동적이고 변화가 많음. 적응력',
  '천상화': '하늘의 불(번개). 순간적으로 세상을 밝히는 강렬함',
  '석류목': '석류나무. 겉은 딱딱하지만 안에 풍요로움을 품고 있음',
  '벽력화': '벼락불. 갑작스럽고 강렬. 파괴와 창조를 동시에',
  '송백목': '소나무와 잣나무. 사계절 변하지 않는 절개와 꿋꿋함',
  '장류수': '길게 흐르는 물. 인내와 꾸준함. 결국 바다에 도달',
  '옥상토': '지붕 위의 흙. 높은 곳에서 세상을 내려다보는 시야'
};


var PREMIUM_SYSTEM = `당신은 대한민국 최정상급 명리학자(실전 60년)이자 MBTI 인지기능 전문가입니다.

## 핵심 임무
의뢰인의 사주팔자와 MBTI를 교차 분석하여, "어? 이거 내 얘기인데?" 하고 소름 돋는 풀이를 만드세요.

## ★★★ 절대 규칙 (6개만. 이것만 지키면 됩니다) ★★★

### 규칙1: 전문용어 완전 제거
사주/MBTI 전문용어는 단 한 개도 노출되면 불합격.
십성 이름(비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인),
신살 이름(양인살, 홍염살, 역마살, 화개살, 도화살, 천을귀인, 문창귀인, 학당귀인, 괴강살, 백호살, 원진살, 귀문관살, 음양차착 등),
격국 이름(양인격, 편재격, 식신격 등),
기타(비겁탈재, 살인상생, 식상생재, 재관쌍미, 납음, 천하수, 대해수 등),
천간지지 이름(갑목, 임수, 정화 등),
궁위 이름(배우자궁, 직업궁, 자녀궁, 재물궁 등),
운 이름(편관운, 정인운, 겁재운, 세운, 대운 간지 등),
12운성 이름(장생, 관대, 건록, 제왕, 태 등),
오행 분석 용어(비겁 에너지, 재성이 빈약, 화기, 지장간 등)
→ 이 모든 것을 자연어로 번역해서 써야 함

★ 본문(b)에 단 하나라도 노출되면 불합격인 용어:
납음, 대해수, 천하수, 괴강살, 천을귀인, 문창귀인, 학당귀인, 식신, 정재, 편관, 편재격, 겁재탈재,
극신약, 정임합목, 축술형, 귀문관살, 병임천간충, 인성운, 비견운,
정인운, 편인운, 상관운, 겁재운, 지장간, 배우자궁, 직업궁,
임수, 임술일주, 음양차착, 진진형, 자형, 화개살, 백호살,
원진살, 편재, 정재, 비견, 겁재, 관대, 세운, 대운간지,
편관운, 정관운, 비견운, 식상생재, 살인상생, 비겁탈재, 재관쌍미,
양인살, 홍염살, 역마살

모든 사주 개념은 반드시 자연어/비유로 번역해서 쓰세요.
예) '위기에 각성하는 에너지', '인생 결정적 순간에 도움이 오는 구조',
'큰 판을 짜는 사업가 기질', '에너지가 부족한 구조', '배우자 자리'

★ 단, profile.specialStars 배열에는 전문용어를 그대로 넣으세요. 금지는 본문(b)에만 적용.

■ 물상 비유는 자유: 촛불, 이슬, 칼날, 바위, 호수, 씨앗, 모닥불 등

### 규칙2: 행동/체감 먼저
모든 소주제는 구체적 행동/상황/장면으로 시작. 분석 리포트 금지.

### 규칙3: 사주×MBTI 한 호흡 융합
사주 따로 MBTI 따로 쓰면 불합격. 사주 70% + MBTI 보조 30%. MBTI 인지기능은 소주제당 1~2회.

### 규칙4: 사주가 주도
같은 MBTI라도 사주가 다르면 완전히 다른 글. MBTI가 주인공이면 불합격.

### 규칙5: MBTI 강도 반영 + 왜곡 금지
"상대적으로 약한 I" ≠ "매우 강한 I". 강도별 행동 프로파일 반드시 반영.
E/I, S/N, T/F, J/P 기본 특성은 사주가 어떻든 유지.
사주와 MBTI가 충돌하면 → 겉과 속의 이중주로 풀어내세요 (소름 포인트).

### 규칙6: 데이터 무결성
제공된 숫자·나이·간지·오행개수·세운연도 변경 금지. 없는 합충형 만들기 금지.
대운 나이 범위는 제공 데이터 그대로. MBTI 유형·인지기능 스택 변경 금지.

### ★ 긍정 먼저 규칙
각 sub의 b에서 첫 2문단은 반드시 이 사람의 강점, 매력, 타고난 좋은 점으로 시작하세요.
약점이나 충돌 지점은 3문단 이후에 배치하세요.
독자는 '나 괜찮은 사람이야?'를 확인하러 온 거예요. 첫인상이 결핍이면 이탈합니다.
나쁜 예: '수원지가 없어서 증발하고 있는 강'으로 시작
좋은 예: '깊고 맑은 강이에요. 보통 강은 수면만 반짝이는데, 당신은 바닥까지 투명한 깊이를 가진 사람이에요.'로 시작


## ★★★ 풀이 설계도 — _blueprint (이것이 품질의 핵심) ★★★

categories를 쓰기 전에, 반드시 _blueprint 필드를 먼저 채우세요.
_blueprint는 사용자에게 표시되지 않는 당신의 메모장입니다.
이 메모장을 먼저 완성한 후, 그것을 보면서 본문을 쓰세요.

### _blueprint 구조

"_blueprint": {
  "landscape": "이 사주의 전체 풍경 (자연 이미지 한 줄)",
  "tension": "가장 강한 긴장/갈등 구조 한 줄",
  "hidden": "겉으로 안 보이지만 숨겨진 것 한 줄",
  "subs": {
    "나의 성격": {
      "anchor": "선택한 앵커 재료와 구체적 내용",
      "discovery": "원국에서 자율 발견한 포인트 (앵커보다 강렬하면 이것이 주인공)",
      "killing": "이 사주+이 MBTI가 아니면 절대 못 쓰는 문장 1개"
    },
    "나의 장점": { "anchor":"...", "discovery":"...", "killing":"..." },
    "고쳐야 할 점": { "anchor":"...", "discovery":"...", "killing":"..." },
    "남들이 보는 나": { "anchor":"...", "discovery":"...", "killing":"..." },
    "연애 스타일": { "anchor":"...", "discovery":"...", "killing":"..." },
    "잘 맞는 타입": { "anchor":"...", "discovery":"...", "killing":"..." },
    "연애 지뢰": { "anchor":"...", "discovery":"...", "killing":"..." },
    "직장 적성": { "anchor":"...", "discovery":"...", "killing":"..." },
    "맞춤 재물 쌓는 법": { "anchor":"...", "discovery":"...", "killing":"..." },
    "올해 키워드": { "anchor":"...", "discovery":"...", "killing":"..." },
    "올해 조언": { "anchor":"...", "discovery":"...", "killing":"..." },
    "대운 흐름": { "anchor":"...", "discovery":"...", "killing":"..." },
    "기회의 시기": { "anchor":"...", "discovery":"...", "killing":"..." },
    "인생 한줄 마무리": { "anchor":"...", "discovery":"...", "killing":"..." }
  },
  "repeat_check": "14개 sub에서 같은 재료가 3번 이상 반복되는지 확인. 겹치면 여기서 교체."
}

### _blueprint 작성 규칙

1. landscape/tension/hidden: 사주 원국을 처음 펼쳤을 때 눈에 들어오는 것 3가지. 이것이 전체 풀이의 뼈대.

2. anchor: 아래 "필수 앵커 목록"에서 해당 소주제의 앵커를 확인하고, 이 사주에서 그 앵커가 구체적으로 무엇인지 적으세요.
   예) "나의 장점" → 앵커=신살 → "이 사주에 양인살+천을귀인. 양인살이 사화에 있어서 직업궁에서 위기 각성"

3. discovery: 원국 전체를 보면서, 앵커 외에 이 소주제와 관련된 눈에 띄는 것. 없으면 "없음".
   예) "연애 스타일" → 앵커=일지 십성 → 발견="시간↔일지 암합이 숨겨진 인연 구조를 만듦"

4. killing: "다른 같은 일간 + 같은 MBTI한테는 절대 못 쓰는 문장"을 미리 구상. 이것이 소름 포인트.
   예) "정미일주+INFP: 마른 여름 땅 위의 촛불이라 주변을 태울까 봐 자기가 먼저 불을 줄이는 패턴"

5. repeat_check: 14개 anchor+discovery를 쭉 보면서, 같은 물상이나 같은 에너지가 3번 이상 등장하면 여기서 교체. 이 단계를 건너뛰면 불합격.

★★ _blueprint를 완성한 후에만 categories 본문(b)을 쓰세요. ★★
★★ 본문을 쓸 때 반드시 _blueprint의 killing을 해당 소주제에 포함하세요. ★★


## 필수 앵커 목록

앵커는 "최소한 이것은 포함"이지 "이것만 써라"가 아닙니다.
AI가 원국에서 더 강렬한 것을 발견하면 주인공이 될 수 있습니다.
단, 앵커도 최소 1문단은 포함하세요.

1. 나의 성격 → 앵커: 일간 물상 + 월지 계절 (일간 물상이 주인공인 유일한 소주제)
2. 나의 장점 → 앵커: 신살 중 가장 강렬한 것 1개
3. 고쳐야 할 점 → 앵커: 충·형·파격 중 가장 강한 것 1개 (없으면 과잉오행의 부작용)
4. 남들이 보는 나 → 앵커: 월간↔일간 관계 (사회적 페르소나)
5. 연애 스타일 → 앵커: 배우자궁 에너지 성격 (사용자 데이터의 "배우자궁 읽기" 참조)
6. 잘 맞는 타입 → 앵커: 사주가 원하는 에너지 방향
7. 연애 지뢰 → 앵커: 배우자궁 관련 긴장 구조
8. 직장 적성 → 앵커: 직업궁 에너지 성격 (사용자 데이터의 "직업궁 읽기" 참조)
9. 재물 → 앵커: 돈 에너지의 위치와 강도
10. 올해 키워드 → 앵커: 올해 가장 강한 합충 (사용자 데이터의 "올해 핵심 사건" 참조)
11. 올해 조언 → 앵커: 사주가 원하는 에너지의 구체적 행동
12. 대운 흐름 → 앵커: 각 대운 나이 범위와 에너지 변화
13. 기회의 시기 → 앵커: 대운 전환점
14. 인생 마무리 → 앵커: 납음의 의미


## 소주제별 시작 패턴 다양화 (필수!)

14개 소주제에서 같은 시작 패턴을 3번 이상 쓰면 불합격.
A) 일상 장면  B) 사주 풍경  C) 역설/반전  D) 시간(과거↔현재)
E) 타인 시선  F) 질문  G) 데이터 발견

## 깊이 규칙
각 소주제에서 핵심 포인트 1~2개를 5~7문단으로 깊이. 3개 이상 나열 금지.

## 문체
- 구어체: ~예요, ~거든요. "당신"으로 호칭.
- 인지기능 별명: 내면의 심판관(Fi), 분위기 리더기(Fe), 가능성 탐색기(Ne), 미래 내비게이션(Ni), 추억 저장소(Si), 현장 체험러(Se), 내장 논리회로(Ti), 실행력 엔진(Te). 처음에 별명(약어) 형태, 이후 짧게.
- 내면 독백("~") 항목당 최대 2개. 모든 MBTI에 따뜻한 감성 톤.
- 동네 언니/오빠처럼 카페에서 1:1로 이야기하는 느낌으로 쓰세요.
- 의사가 환자에게 소견서 읽어주는 톤 금지.
- 나쁜 예: '이 사주에서 가장 독특한 건 스스로를 항상 부족하다고 느낀다는 거예요'
- 좋은 예: '사람들은 당신을 보면 깊다고 느껴요. 근데 정작 당신은 늘 부족한 것 같다고 생각하죠?'

## 인사이트/처방
- 본문(b): 풀이만. 처방은 tip에만.
- 추상적 조언 금지. 오늘 당장 할 수 있는 구체적 행동.

## profile 필드
- seasonNote, specialStars, mbtiType, mbtiName, mbtiFunctions, mbtiTags: 제공 데이터 그대로

## oneLine 필드
적천수 물상 + 월지 계절 + 사주 분위기. 자연 이미지 한 줄.

## categories (5개 고정, 14개 subs)
1. id:"me" 나란 사람: 나의 성격 / 나의 장점 / 고쳐야 할 점 / 남들이 보는 나
2. id:"love" 나의 연애: 연애 스타일 / 잘 맞는 타입 / 연애 지뢰
3. id:"career" 일과 돈: 직장 적성 / 맞춤 재물 쌓는 법
4. id:"year" 2026년 나의 운: 올해 키워드 / 올해 조언
5. id:"future" 인생 로드맵: 대운 흐름 / 기회의 시기 / 인생 한줄 마무리

★★★ 반드시 각 카테고리 안에 subs 배열을 만들고, 각 sub는 독립된 {"h":"소제목","b":"본문"} 객체로 작성하세요. 카테고리를 통째로 하나의 글로 쓰면 불합격. ★★★

각 sub의 b: 3~5문단, 문단당 3~5문장. \\n\\n으로 구분.
각 sub의 b 마지막에 반드시 💊로 시작하는 실천 팁 1~2줄을 포함하세요. 💊는 너가 주는 내용에 따라 다양한 이모티콘을 써도 돼

## JSON 출력 형식 (정확히 이 구조를 따르세요)

{
  "_blueprint": {...},
  "profile": {
    "seasonNote": "입하 (초여름 화왕절)",
    "specialStars": ["천을귀인","화개살","백호살","괴강살","음양차착","원진살","귀문관살"],
    "mbtiType": "INTP",
    "mbtiName": "논리술사",
    "mbtiFunctions": "내장 논리회로(Ti),가능성 탐색기(Ne),추억 저장소(Si),분위기 리더기(Fe)",
    "mbtiTags": ["#조용한분석가","#겉은평온속은폭풍","#논리로세상을해부","#감정은숨김"]
  },
  "oneLine": "초여름 뙤약볕 아래 깊고 맑은 강 — 바닥은 보이는데 수원지가 없어 조용히 증발 중인 물",
  "categories": [
    {
      "id": "me",
      "title": "나란 사람",
      "subs": [
        {"h": "나의 성격", "b": "첫 문단 (강점/매력부터)\\n\\n두번째 문단\\n\\n세번째 문단\\n\\n💊 오늘 당장 할 수 있는 실천 팁"},
        {"h": "나의 장점", "b": "문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁"},
        {"h": "고쳐야 할 점", "b": "문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁"},
        {"h": "남들이 보는 나", "b": "문단1\\n\\n문단2\\n\\n문단3\\n\\n💊 실천 팁"}
      ]
    },
    {
      "id": "love",
      "title": "나의 연애",
      "subs": [
        {"h": "연애 스타일", "b": "...\\n\\n💊 팁"},
        {"h": "잘 맞는 타입", "b": "...\\n\\n💊 팁"},
        {"h": "연애 지뢰", "b": "...\\n\\n💊 팁"}
      ]
    },
    {
      "id": "career",
      "title": "일과 돈",
      "subs": [
        {"h": "직장 적성", "b": "...\\n\\n💊 팁"},
        {"h": "맞춤 재물 쌓는 법", "b": "...\\n\\n💊 팁"}
      ]
    },
    {
      "id": "year",
      "title": "2026년 나의 운",
      "subs": [
        {"h": "올해 키워드", "b": "...\\n\\n💊 팁"},
        {"h": "올해 조언", "b": "...\\n\\n💊 팁"}
      ]
    },
    {
      "id": "future",
      "title": "인생 로드맵",
      "subs": [
        {"h": "대운 흐름", "b": "...\\n\\n💊 팁"},
        {"h": "기회의 시기", "b": "...\\n\\n💊 팁"},
        {"h": "인생 한줄 마무리", "b": "...\\n\\n💊 팁"}
      ]
    }
  ]
}

★ 위 JSON 구조를 정확히 따르세요. 특히:
- categories 안에 subs 배열 필수
- 각 sub는 {"h":"소제목", "b":"본문"} 형태
- h는 위에 정의된 소제목 그대로 사용
- b의 마지막에 💊 실천 팁 필수

★ _blueprint를 먼저 완성하고, 그것을 참조하면서 categories를 쓰세요.
JSON만 출력하세요.`;

/* ====== AI 출력 후처리 검증 (v29.1) ====== */
function postValidateAI(result, dw, saju, gg) {
  if (!result || !result.categories) return result;
  var dwRanges = dw.daewoons.map(function(d) {
    return { start: d.startAge, end: d.endAge, text: d.startAge + '~' + d.endAge + '세' };
  });
  var fixCount = 0;
  result.categories.forEach(function(cat) {
    // v2: subs[{h,b}] 또는 구버전 items[{content,insightText}] 모두 지원
    var entries = cat.subs || cat.items || [];
    entries.forEach(function(item) {
      var txt = item.b || item.content;
      if (!txt) return;
      // ① 대운 나이 범위 교정
      txt = txt.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
        var start = parseInt(s), end = parseInt(e), span = end - start;
        if (span >= 8 && span <= 11) {
          var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
          if (!found) {
            var closest = null, minDiff = 999;
            dwRanges.forEach(function(r) {
              var diff = Math.abs(r.start - start);
              if (diff < minDiff) { minDiff = diff; closest = r; }
            });
            if (closest && minDiff <= 5) {
              fixCount++;
              console.log('[PostValidate] 대운 나이 교정:', match, '→', closest.text);
              return closest.text;
            }
          }
        }
        return match;
      });
      // ② insightText도 교정 (구버전 호환)
      if (item.insightText) {
        item.insightText = item.insightText.replace(/(\d{1,2})~(\d{1,2})세/g, function(match, s, e) {
          var start = parseInt(s), end = parseInt(e), span = end - start;
          if (span >= 8 && span <= 11) {
            var found = dwRanges.some(function(r) { return r.start === start && r.end === end; });
            if (!found) {
              var closest = null, minDiff = 999;
              dwRanges.forEach(function(r) {
                var diff = Math.abs(r.start - start);
                if (diff < minDiff) { minDiff = diff; closest = r; }
              });
              if (closest && minDiff <= 5) { fixCount++; return closest.text; }
            }
          }
          return match;
        });
      }
      // ③ 오행 개수 교정 (AI가 오행 숫자를 변조한 경우)
      var ohNames = ['목','화','토','금','수'];
      ohNames.forEach(function(oh) {
        var ohRe = new RegExp(oh + '[=이가] ?(\\d+\\.?\\d*)', 'g');
        txt = txt.replace(ohRe, function(match, num) {
          var aiVal = parseFloat(num);
          var realVal = saju.el[oh];
          if (realVal !== undefined && aiVal !== realVal && Math.abs(aiVal - realVal) >= 1) {
            fixCount++;
            console.log('[PostValidate] 오행 교정:', oh, aiVal, '→', realVal);
            return match.replace(num, String(realVal));
          }
          return match;
        });
      });
      // ④ 세운 연도-간지 불일치 교정
      if (dw.seun) {
        dw.seun.forEach(function(se) {
          var wrongPattern = new RegExp(se.y + '년[^가-힣]*(갑|을|병|정|무|기|경|신|임|계)(자|축|인|묘|진|사|오|미|신|유|술|해)', 'g');
          txt = txt.replace(wrongPattern, function(match, g, j) {
            if (g !== se.gan || j !== se.ji) {
              fixCount++;
              console.log('[PostValidate] 세운 교정:', match, '→', se.y + '년 ' + se.gan + se.ji);
              return se.y + '년 ' + se.gan + se.ji;
            }
            return match;
          });
        });
      }
      // 교정된 텍스트 저장 (v2: b / 구버전: content)
      if (item.b !== undefined) item.b = txt;
      else item.content = txt;
    });
  });
  if (fixCount > 0) console.log('[PostValidate] 총 ' + fixCount + '건 교정 완료');
  return result;
}

// ── 궁합 전용 관계 테이블 ──
var GH_GANHAP=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
var GH_CHUNG_G=[[0,6],[1,7],[2,8],[3,9]];
var GH_YUKHAP=[[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
var GH_CHUNG_J=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
var GH_SAMHAP=[[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
var GH_HYUNG=[[2,5],[5,8],[8,2],[3,0],[0,3]];
var GH_HAE=[[0,7],[1,6],[2,5],[3,4],[8,11],[9,10]];
var OH_SANG={'목':'화','화':'토','토':'금','금':'수','수':'목'};
var OH_GEUK={'목':'토','토':'수','수':'화','화':'금','금':'목'};

// MBTI 인지기능 호환 매트릭스
var CF_COMPAT={
  'Ne-Ne':{s:9,d:'같은 파장으로 아이디어 폭발'},'Ni-Ni':{s:8,d:'말 안 해도 통하는 직관'},
  'Se-Se':{s:9,d:'함께 즐기는 경험 최고'},'Si-Si':{s:7,d:'안정적이지만 변화 부족'},
  'Te-Te':{s:7,d:'효율적 팀워크, 주도권 다툼 주의'},'Ti-Ti':{s:6,d:'지적 교감 최고, 감정 소통 부족'},
  'Fe-Fe':{s:8,d:'세심한 배려, 갈등 회피 주의'},'Fi-Fi':{s:7,d:'가치관 통하면 천생연분'},
  'Ne-Ni':{s:7,d:'가능성과 직관의 만남'},'Se-Si':{s:6,d:'현재와 과거의 조화'},
  'Te-Ti':{s:6,d:'외부 실행력과 내부 분석력'},'Fe-Fi':{s:5,d:'사회적 배려와 내면 가치관 충돌'},
  'Ne-Se':{s:5,d:'미래 vs 현재, 서로 자극'},'Ne-Si':{s:4,d:'새로움 vs 익숙함'},
  'Ni-Se':{s:5,d:'직관과 감각의 밀당'},'Ni-Si':{s:4,d:'미래 비전 vs 과거 경험'},
  'Te-Fe':{s:5,d:'효율 vs 조화'},'Te-Fi':{s:4,d:'외부 기준 vs 내면 기준'},
  'Ti-Fe':{s:5,d:'논리 vs 감정, 고전적 갈등'},'Ti-Fi':{s:4,d:'분석 vs 가치'},
  'Ne-Te':{s:6,d:'아이디어와 실행력'},'Ne-Fe':{s:7,d:'가능성 탐색과 사회적 조화'},
  'Ne-Ti':{s:7,d:'지적 대화 파트너'},'Ne-Fi':{s:6,d:'가능성과 가치'},
  'Ni-Te':{s:8,d:'비전과 실행, 최강 조합'},'Ni-Fe':{s:7,d:'따뜻한 리더십'},
  'Ni-Ti':{s:7,d:'직관과 분석의 깊은 통찰'},'Ni-Fi':{s:6,d:'예술적 교감'},
  'Se-Te':{s:7,d:'행동과 효율'},'Se-Fe':{s:7,d:'경험과 배려'},
  'Se-Ti':{s:5,d:'감각과 논리'},'Se-Fi':{s:6,d:'진짜 좋은 걸 함께 찾는 조합'},
  'Si-Te':{s:7,d:'안정과 효율'},'Si-Fe':{s:8,d:'따뜻한 가정 궁합'},
  'Si-Ti':{s:6,d:'꼼꼼한 조합'},'Si-Fi':{s:7,d:'감성적 교감이 깊음'}
};
function getCFC(a,b){return CF_COMPAT[a+'-'+b]||CF_COMPAT[b+'-'+a]||{s:5,d:'독특한 조합'};}

// 궁합 메인 분석 함수
function analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiObjA, mbtiObjB) {
  var R={scores:{love:50,comm:50,values:50,work:50,total:0},
    details:{gan:[],ji:[],ohBowan:[],mbti:[],dw:[]},keywords:[]};
  var rA=sajuA.raw, rB=sajuB.raw;
  var pillarG=['년간','월간','일간','시간'], pillarJ=['년지','월지','일지','시지'];
  var gungwi=['외부환경','직업사회','배우자건강','자녀노후'];

  // ── PART 1: 천간 교차 ──
  var gA=[rA.yg,rA.mg,rA.dg,rA.hg], gB=[rB.yg,rB.mg,rB.dg,rB.hg];
  // 일간 관계 (핵심)
  var dgRel={ganA:TGAN_KR[rA.dg],ganB:TGAN_KR[rB.dg],rels:[]};
  GH_GANHAP.forEach(function(h){
    if((rA.dg===h[0]&&rB.dg===h[1])||(rA.dg===h[1]&&rB.dg===h[0]))
      dgRel.rels.push({t:'합',d:'일간합('+h[2]+') — 본질이 하나로 합쳐지는 인연'});
  });
  GH_CHUNG_G.forEach(function(c){
    if((rA.dg===c[0]&&rB.dg===c[1])||(rA.dg===c[1]&&rB.dg===c[0]))
      dgRel.rels.push({t:'충',d:'일간충 — 강한 끌림이자 강한 마찰'});
  });
  if(rA.dg===rB.dg) dgRel.rels.push({t:'비화',d:'같은 일간 — 거울 같은 관계'});
  if(dgRel.rels.length===0){
    var oA=OHAENG_TGAN[rA.dg],oB=OHAENG_TGAN[rB.dg];
    if(OH_SANG[oA]===oB) dgRel.rels.push({t:'생',d:'A('+oA+')가 B('+oB+')를 생 — 자연스러운 돌봄'});
    else if(OH_SANG[oB]===oA) dgRel.rels.push({t:'생',d:'B('+oB+')가 A('+oA+')를 생 — 자연스러운 돌봄'});
    else if(OH_GEUK[oA]===oB) dgRel.rels.push({t:'극',d:'A('+oA+')가 B('+oB+')를 극 — 긴장감'});
    else if(OH_GEUK[oB]===oA) dgRel.rels.push({t:'극',d:'B('+oB+')가 A('+oA+')를 극 — 긴장감'});
  }
  R.details.gan.push(dgRel);

  // 전체 천간 교차 합/충
  for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
    if(gA[ai]==null||gB[bi]==null) continue;
    GH_GANHAP.forEach(function(h){
      if((gA[ai]===h[0]&&gB[bi]===h[1])||(gA[ai]===h[1]&&gB[bi]===h[0]))
        R.details.gan.push({type:'천간합',pA:pillarG[ai],pB:pillarG[bi],
          desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'합('+h[2]+') '+pillarG[ai]+'↔'+pillarG[bi],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'});
    });
    GH_CHUNG_G.forEach(function(c){
      if((gA[ai]===c[0]&&gB[bi]===c[1])||(gA[ai]===c[1]&&gB[bi]===c[0]))
        R.details.gan.push({type:'천간충',pA:pillarG[ai],pB:pillarG[bi],
          desc:TGAN_KR[gA[ai]]+TGAN_KR[gB[bi]]+'충 '+pillarG[ai]+'↔'+pillarG[bi],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중'});
    });
  }

  // ── PART 2: 지지 교차 ──
  var jA=[rA.yj,rA.mj,rA.dj,rA.hj], jB=[rB.yj,rB.mj,rB.dj,rB.hj];
  for(var ai=0;ai<4;ai++) for(var bi=0;bi<4;bi++){
    if(jA[ai]==null||jB[bi]==null) continue;
    var ja=jA[ai], jb=jB[bi];
    GH_YUKHAP.forEach(function(h){
      if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0]))
        R.details.ji.push({type:'육합',pA:pillarJ[ai],pB:pillarJ[bi],
          jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],hapOh:h[2],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',
          gungwi:gungwi[ai]+'↔'+gungwi[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'합('+h[2]+') '+pillarJ[ai]+'↔'+pillarJ[bi]});
    });
    GH_CHUNG_J.forEach(function(c){
      if((ja===c[0]&&jb===c[1])||(ja===c[1]&&jb===c[0]))
        R.details.ji.push({type:'충',pA:pillarJ[ai],pB:pillarJ[bi],
          jiA:JIJI_KR[ja],jiB:JIJI_KR[jb],
          imp:(ai===2&&bi===2)?'최상':(ai===2||bi===2)?'상':'중',
          gungwi:gungwi[ai]+'↔'+gungwi[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'충 '+pillarJ[ai]+'↔'+pillarJ[bi]});
    });
    GH_HYUNG.forEach(function(h){
      if(ja===h[0]&&jb===h[1])
        R.details.ji.push({type:'형',pA:pillarJ[ai],pB:pillarJ[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'형 — 갈등을 통한 성장',imp:'중'});
    });
    GH_HAE.forEach(function(h){
      if((ja===h[0]&&jb===h[1])||(ja===h[1]&&jb===h[0]))
        R.details.ji.push({type:'해',pA:pillarJ[ai],pB:pillarJ[bi],
          desc:JIJI_KR[ja]+JIJI_KR[jb]+'해 — 은밀한 오해 주의',imp:'중'});
    });
  }

  // ── PART 3: 오행 보완 ──
  var ohA=sajuA.elFull||sajuA.el, ohB=sajuB.elFull||sajuB.el;
  var lackA=sajuA.lackFull||[], lackB=sajuB.lackFull||[];
  lackA.forEach(function(o){if(ohB[o]&&ohB[o]>=2) R.details.ohBowan.push({dir:'B→A',oh:o,d:'B가 A의 부족한 '+o+' 보완'});});
  lackB.forEach(function(o){if(ohA[o]&&ohA[o]>=2) R.details.ohBowan.push({dir:'A→B',oh:o,d:'A가 B의 부족한 '+o+' 보완'});});
  var dmOhA=sajuA.dmEl, dmOhB=sajuB.dmEl, dmOhRel='';
  if(OH_SANG[dmOhA]===dmOhB){dmOhRel='A생B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')가 B('+dmOhB+')를 생 — 자연스러운 케어'});}
  else if(OH_SANG[dmOhB]===dmOhA){dmOhRel='B생A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')가 A('+dmOhA+')를 생'});}
  else if(OH_GEUK[dmOhA]===dmOhB){dmOhRel='A극B';R.details.ohBowan.push({dir:'A→B',d:'A('+dmOhA+')가 B('+dmOhB+')를 극 — 긴장감'});}
  else if(OH_GEUK[dmOhB]===dmOhA){dmOhRel='B극A';R.details.ohBowan.push({dir:'B→A',d:'B('+dmOhB+')가 A('+dmOhA+')를 극'});}
  else if(dmOhA===dmOhB){dmOhRel='비화';R.details.ohBowan.push({dir:'양방',d:'같은 오행('+dmOhA+') — 공감 최고, 보완 부족'});}

  // ── PART 4: MBTI 궁합 ──
  var cfA=mbtiObjA.cf.split('-'), cfB=mbtiObjB.cf.split('-');
  var m1=getCFC(cfA[0],cfB[0]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[0],t:'주기능',s:m1.s,d:m1.d});
  var m2=getCFC(cfA[0],cfB[1]); R.details.mbti.push({pair:cfA[0]+'↔'+cfB[1],t:'A주↔B부',s:m2.s,d:m2.d});
  var m3=getCFC(cfB[0],cfA[1]); R.details.mbti.push({pair:cfB[0]+'↔'+cfA[1],t:'B주↔A부',s:m3.s,d:m3.d});
  // 축별
  var axisNames=['EI','SN','TF','JP'];
  for(var xi=0;xi<4;xi++){
    var aA=mbtiObjA.axes[xi],aB=mbtiObjB.axes[xi],same=(aA.side===aB.side);
    var axScore=same?7:5;
    if(axisNames[xi]==='SN'&&!same) axScore=4;
    if(axisNames[xi]==='TF'&&!same) axScore=5;
    R.details.mbti.push({axis:axisNames[xi],sA:aA.side,sB:aB.side,same:same,s:axScore,
      d:same?'같은 '+aA.side+'형 — 공감대 높음':'다른 축('+aA.side+'↔'+aB.side+') — 보완과 갈등'});
  }

  // ── PART 5: 대운 동기화 ──
  if(dwA&&dwB&&dwA.daewoons&&dwB.daewoons){
    var cdA=dwA.currentDWIdx>=0?dwA.daewoons[dwA.currentDWIdx]:null;
    var cdB=dwB.currentDWIdx>=0?dwB.daewoons[dwB.currentDWIdx]:null;
    var goodSS=['식신','정재','정관','정인'];
    if(cdA&&cdB){
      var aG=goodSS.indexOf(cdA.ss)>=0, bG=goodSS.indexOf(cdB.ss)>=0;
      R.details.dw.push({type:'현재대운',
        dA:cdA.gan+cdA.ji+'('+cdA.startAge+'~'+cdA.endAge+'세,'+cdA.ss+')',
        dB:cdB.gan+cdB.ji+'('+cdB.startAge+'~'+cdB.endAge+'세,'+cdB.ss+')',
        sync:aG&&bG?'동반 상승기':aG?'A가 B를 끌어올리는 시기':bG?'B가 A를 끌어올리는 시기':'함께 인내하는 시기'});
    }
    if(dwA.seun&&dwB.seun){
      for(var si=0;si<Math.min(dwA.seun.length,dwB.seun.length,3);si++){
        var sA=dwA.seun[si],sB=dwB.seun[si];
        if(sA&&sB){
          var saG=goodSS.indexOf(sA.ss)>=0, sbG=goodSS.indexOf(sB.ss)>=0;
          R.details.dw.push({type:sA.y+'년',
            dA:sA.gan+sA.ji+'('+sA.ss+')',dB:sB.gan+sB.ji+'('+sB.ss+')',
            sync:saG&&sbG?'두 사람 모두 좋은 해':saG?'A에게 유리':sbG?'B에게 유리':'조심해야 할 해'});
        }
      }
    }
  }

  // ── PART 6: 점수 계산 ──
  var love=50,comm=50,val=50,work=50;
  dgRel.rels.forEach(function(r){
    if(r.t==='합')love+=20;else if(r.t==='충')love-=5;else if(r.t==='비화')love+=5;
    else if(r.t==='생')love+=10;else if(r.t==='극')love-=3;
  });
  R.details.ji.forEach(function(r){
    var isDJ=(r.pA==='일지'&&r.pB==='일지');
    var isMJ=(r.pA==='월지'||r.pB==='월지');
    var isYJ=(r.pA==='년지'&&r.pB==='년지');
    if(isDJ){if(r.type==='육합')love+=18;else if(r.type==='충')love-=8;else if(r.type==='형')love-=4;}
    if(isMJ){if(r.type==='육합')comm+=8;else if(r.type==='충')comm-=5;}
    if(isYJ){if(r.type==='육합')val+=8;else if(r.type==='충')val-=4;}
  });
  if(R.details.ohBowan.length>0) love+=Math.min(R.details.ohBowan.length*3,10);
  R.details.mbti.forEach(function(c){
    if(c.t==='주기능')comm+=(c.s-5)*4;
    if(c.t==='A주↔B부'||c.t==='B주↔A부')comm+=(c.s-5)*2;
    if(c.axis==='TF'){love+=(c.s-5)*2;val+=(c.s-5)*3;}
    if(c.axis==='EI')love+=(c.s-5);
    if(c.axis==='SN'){comm+=(c.s-5)*2;val+=(c.s-5)*2;}
    if(c.axis==='JP'){work+=(c.s-5)*3;val+=(c.s-5)*2;}
  });
  R.details.gan.forEach(function(r){if(r.type==='천간합')work+=5;else if(r.type==='천간충')work-=3;});
  if(dmOhRel==='A생B'||dmOhRel==='B생A')val+=8;
  else if(dmOhRel==='비화')val+=5;
  else if(dmOhRel==='A극B'||dmOhRel==='B극A')val-=3;
  love=Math.max(20,Math.min(98,love));comm=Math.max(20,Math.min(98,comm));
  val=Math.max(20,Math.min(98,val));work=Math.max(20,Math.min(98,work));
  R.scores={love:love,comm:comm,values:val,work:work,total:Math.round(love*.35+comm*.25+val*.25+work*.15)};

  // ── PART 7: AI 키워드 ──
  dgRel.rels.forEach(function(r){R.keywords.push('★일간: '+dgRel.ganA+'↔'+dgRel.ganB+' '+r.d);});
  R.details.gan.forEach(function(r){if(r.type)R.keywords.push(r.desc+' ['+r.imp+']');});
  R.details.ji.forEach(function(r){R.keywords.push(r.type+': '+r.desc+' ['+r.imp+'] ('+r.gungwi+')');});
  R.details.ohBowan.forEach(function(r){R.keywords.push('오행보완: '+r.d);});
  R.details.mbti.forEach(function(c){
    if(c.pair)R.keywords.push('인지기능 '+c.pair+'('+c.t+'): '+c.d+' ['+c.s+'/10]');
    else if(c.axis)R.keywords.push(c.axis+'축: '+c.d+' ['+c.s+'/10]');
  });
  R.details.dw.forEach(function(d){R.keywords.push(d.type+': '+d.sync);});

  console.log('[MBTS] 궁합 분석 완료. 종합:'+R.scores.total+'점, 키워드:'+R.keywords.length+'개');
  return R;
}

// ── 궁합 AI 시스템 프롬프트 ──
var GUNGHAP_SYSTEM='당신은 대한민국 최정상급 명리학자이자 MBTI 인지기능 전문가입니다.\\n두 사람의 사주팔자와 MBTI를 교차 분석하여 궁합 풀이를 만드세요.\\n\\n## ★ 절대 규칙 ★\\n개인 분석과 동일한 절대규칙을 모두 따르세요:\\n- 전문용어 완전 제거 (십성, 천간지지, 합충형 이름 등 절대 금지)\\n- 행동/체감 먼저, 분석 금지\\n- 사주×MBTI 한 호흡 융합\\n- MBTI 유형 특성 왜곡 금지\\n- MBTI 강도별 차이 반영\\n\\n## 궁합 풀이 특별 규칙\\n\\n### 관계의 스토리를 써라\\n두 사람이 실제로 겪을 장면을 구체적으로 그려라.\\n나쁜 예: \\\"두 사람의 소통 방식이 다릅니다.\\\"\\n좋은 예: \\\"당신이 아이디어 5개를 쏟아내고 있을 때, 상대방은 조용히 그중 하나를 골라 \\\\\\\"이거 해볼까?\\\\\\\"라고 말해요. 그 순간 짜릿하죠?\\\"\\n\\n### \\\"나\\\"와 \\\"상대방\\\"으로 호칭\\n사람A, 사람B가 아니라 \\\"당신(=나)\\\"과 \\\"상대방\\\"으로.\\n\\n### 좋은 점만 쓰지 마라\\n진짜 소름 돋는 궁합 풀이는 \\\"이럴 때 싸워요\\\"를 정확히 짚어주는 것.\\n갈등 패턴 + 해결법을 반드시 포함하세요.\\n\\n### 인지기능 별명 형식\\n내면의 심판관(Fi), 분위기 리더기(Fe), 가능성 탐색기(Ne), 미래 내비게이션(Ni), 추억 저장소(Si), 현장 체험러(Se), 내장 논리회로(Ti), 실행력 엔진(Te)\\n처음 등장 시 별명(약어) 형태로, 이후 짧은 별명만.\\n\\n## 데이터 무결성\\n제공된 점수, 나이, 간지, 연도를 절대 변경하지 마세요.\\nMBTI 유형과 인지기능 스택을 절대 변경하지 마세요.\\n\\n## JSON 출력 형식\\n{\\\"title\\\":\\\"OO일주×XX일주 · XXXX×YYYY 궁합\\\",\\\"quote\\\":\\\"두 사람을 하나의 자연 이미지로 표현한 문장\\\",\\\"totalScore\\\":87,\\\"categories\\\":[{\\\"title\\\":\\\"카테고리명\\\",\\\"icon\\\":\\\"이모지\\\",\\\"items\\\":[{\\\"icon\\\":\\\"이모지\\\",\\\"catch\\\":\\\"감성 소제목\\\",\\\"desc\\\":\\\"한줄 요약\\\",\\\"basis\\\":\\\"분석 근거 (비표시)\\\",\\\"content\\\":\\\"문단1\\\\n\\\\n문단2\\\\n\\\\n문단3\\\",\\\"insightType\\\":\\\"gold|fire|water|purple\\\",\\\"insightIcon\\\":\\\"이모지\\\",\\\"insightText\\\":\\\"맞춤 처방\\\"}]}]}\\n\\n## 구조\\n카테고리 4개: 연애 케미, 소통 방식, 갈등 패턴, 장기 전망\\n카테고리당 2~3개 항목, 총 8~10개\\ncontent: 2~3문단, 각 3~5문장\\n\\nJSON만 출력하세요.';

// ── 궁합 AI 유저 프롬프트 생성 ──
function buildGunghapUserPrompt(ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB) {
  var cfN={Fi:'내면의 심판관(Fi)',Fe:'분위기 리더기(Fe)',Ne:'가능성 탐색기(Ne)',Ni:'미래 내비게이션(Ni)',Si:'추억 저장소(Si)',Se:'현장 체험러(Se)',Ti:'내장 논리회로(Ti)',Te:'실행력 엔진(Te)'};
  var cfAArr=mbtiA.cf.split('-'), cfBArr=mbtiB.cf.split('-');

  var p='## 궁합 분석 의뢰\n\n';
  p+='### 사람 A (나)\n';
  p+='- 사주: '+sajuA.P.map(function(x){return x.l+' '+x.s+x.b;}).join(' | ')+'\n';
  p+='- 일주: '+sajuA.P[2].s+sajuA.P[2].b+' · 일간: '+sajuA.dm+'('+sajuA.dmEl+')\n';
  p+='- 격국: '+ggA.gyeokgukName+' · 강도: '+ggA.strengthGrade+'\n';
  p+='- MBTI: '+mbtiA.type+' ('+mbtiA.cf+', 주기능: '+(cfN[cfAArr[0]]||cfAArr[0])+')\n';
  p+='- 오행: 목='+sajuA.el['목']+' 화='+sajuA.el['화']+' 토='+sajuA.el['토']+' 금='+sajuA.el['금']+' 수='+sajuA.el['수']+'\n\n';

  p+='### 사람 B (상대방)\n';
  p+='- 사주: '+sajuB.P.map(function(x){return x.l+' '+x.s+x.b;}).join(' | ')+'\n';
  p+='- 일주: '+sajuB.P[2].s+sajuB.P[2].b+' · 일간: '+sajuB.dm+'('+sajuB.dmEl+')\n';
  p+='- 격국: '+ggB.gyeokgukName+' · 강도: '+ggB.strengthGrade+'\n';
  p+='- MBTI: '+mbtiB.type+' ('+mbtiB.cf+', 주기능: '+(cfN[cfBArr[0]]||cfBArr[0])+')\n';
  p+='- 오행: 목='+sajuB.el['목']+' 화='+sajuB.el['화']+' 토='+sajuB.el['토']+' 금='+sajuB.el['금']+' 수='+sajuB.el['수']+'\n\n';

  p+='### 엔진 계산 점수\n';
  p+='종합: '+ghResult.scores.total+'점 · 연애: '+ghResult.scores.love+'% · 소통: '+ghResult.scores.comm+'% · 가치관: '+ghResult.scores.values+'% · 업무: '+ghResult.scores.work+'%\n\n';

  p+='### 교차 분석 키워드 (AI 참고)\n';
  ghResult.keywords.forEach(function(k){p+='- '+k+'\n';});

  p+='\n### 대운 동기화\n';
  ghResult.details.dw.forEach(function(d){p+='- '+d.type+': A='+d.dA+' / B='+d.dB+' → '+d.sync+'\n';});

  if(mbtiA.profile) p+='\n### A의 MBTI 강도\n'+mbtiA.profile+'\n';
  if(mbtiB.profile) p+='\n### B의 MBTI 강도\n'+mbtiB.profile+'\n';

  p+='\n위 데이터를 기반으로 궁합 풀이를 JSON으로 작성하세요. 점수를 그대로 사용하세요.\n';
  return p;
}

/* ====== 합충형 엔진 + 60갑자 + 폴백 ====== */
/* ==========================================
   * 합/충/형 계산 엔진
   ========================================== */

// 천간합: 갑기합토, 을경합금, 병신합수, 정임합목, 무계합화
var CHEONGAN_HAP=[[0,5,'토'],[1,6,'금'],[2,7,'수'],[3,8,'목'],[4,9,'화']];
// 지지육합: 자축합토, 인해합목, 묘술합화, 진유합금, 사신합수, 오미합화
var JIJI_YUKHAP=[[0,1,'토'],[2,11,'목'],[3,10,'화'],[4,9,'금'],[5,8,'수'],[6,7,'화']];
// 지지삼합
var JIJI_SAMHAP=[[8,0,4,'수'],[2,6,10,'화'],[11,3,7,'목'],[5,9,1,'금']];
// 지지방합
var JIJI_BANGHAP=[[11,0,1,'수'],[2,3,4,'목'],[5,6,7,'화'],[8,9,10,'금']];
// 지지충
var JIJI_CHUNG=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
// 지지형
var JIJI_HYUNG=[[2,5,'무은지형'],[5,8,'지세지형'],[2,8,'무은지형'],[3,3,'자형'],[6,6,'자형'],[9,9,'자형'],[0,3,'무례지형'],[1,10,'은혜지형'],[4,4,'자형'],[7,7,'자형'],[11,11,'자형']];
// 지지파
var JIJI_PA=[[0,9],[1,4],[2,11],[3,6],[5,8],[7,10]];
// ★ 천간충 4쌍 (같은 오행 양양끼리 극)
var CHEONGAN_CHUNG=[[0,6,'갑경충'],[1,7,'을신충'],[2,8,'병임충'],[3,9,'정계충']];
// ★ 지지 육해(害) 6쌍
var JIJI_HAE=[[0,7,'자미해'],[1,6,'축오해'],[2,5,'인사해'],[3,4,'묘진해'],[8,11,'신해해'],[9,10,'유술해']];

function calcRelations(saju){
  var r=saju.raw,result={cheonganHap:[],cheonganChung:[],jijiHap:[],jijiSamhap:[],jijiChung:[],jijiHyung:[],jijiPa:[],jijiHae:[]};
  var gans=[],jis=[];
  var labels=['연','월','일','시'];
  if(r.yg!=null)gans.push({v:r.yg,l:'연간'});
  if(r.mg!=null)gans.push({v:r.mg,l:'월간'});
  gans.push({v:r.dg,l:'일간'});
  if(r.hg!=null)gans.push({v:r.hg,l:'시간'});
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});

  // 천간합
  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_HAP.length;k++){
      var h=CHEONGAN_HAP[k];
      if((gans[i].v===h[0]&&gans[j].v===h[1])||(gans[i].v===h[1]&&gans[j].v===h[0]))
        result.cheonganHap.push({a:gans[i],b:gans[j],oh:h[2],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'합'+h[2]});
    }
  }
  // ★ 천간충
  for(var i=0;i<gans.length;i++)for(var j=i+1;j<gans.length;j++){
    for(var k=0;k<CHEONGAN_CHUNG.length;k++){
      var cc=CHEONGAN_CHUNG[k];
      if((gans[i].v===cc[0]&&gans[j].v===cc[1])||(gans[i].v===cc[1]&&gans[j].v===cc[0]))
        result.cheonganChung.push({a:gans[i],b:gans[j],desc:TGAN_KR[gans[i].v]+TGAN_KR[gans[j].v]+'충',name:cc[2]});
    }
  }
  // 지지육합
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_YUKHAP.length;k++){
      var h=JIJI_YUKHAP[k];
      if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
        result.jijiHap.push({a:jis[i],b:jis[j],oh:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'합'+h[2]});
    }
  }
  // 지지삼합
  for(var k=0;k<JIJI_SAMHAP.length;k++){
    var s=JIJI_SAMHAP[k],found=[];
    for(var i=0;i<jis.length;i++){if(jis[i].v===s[0]||jis[i].v===s[1]||jis[i].v===s[2])found.push(jis[i]);}
    if(found.length>=2){
      var hasCenter=found.some(function(f){return f.v===s[1];});
      if(hasCenter)result.jijiSamhap.push({members:found,oh:s[3],desc:found.map(function(f){return JIJI_KR[f.v];}).join('')+(found.length===3?'삼합':'반합')+s[3]});
    }
  }
  // 지지충
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_CHUNG.length;k++){
      var c=JIJI_CHUNG[k];
      if((jis[i].v===c[0]&&jis[j].v===c[1])||(jis[i].v===c[1]&&jis[j].v===c[0]))
        result.jijiChung.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'충'});
    }
  }
  // 지지형
  for(var i=0;i<jis.length;i++)for(var j=i;j<jis.length;j++){
    if(i===j&&jis[i].v===jis[j].v)continue; // skip same position
    for(var k=0;k<JIJI_HYUNG.length;k++){
      var h=JIJI_HYUNG[k];
      if(h[0]===h[1]){// 자형 - needs same branch in different positions
        if(i!==j&&jis[i].v===h[0]&&jis[j].v===h[1])
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }else{
        if((jis[i].v===h[0]&&jis[j].v===h[1])||(jis[i].v===h[1]&&jis[j].v===h[0]))
          result.jijiHyung.push({a:jis[i],b:jis[j],type:h[2],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'형('+h[2]+')'});
      }
    }
  }
  // ★ 지지해(害)
  for(var i=0;i<jis.length;i++)for(var j=i+1;j<jis.length;j++){
    for(var k=0;k<JIJI_HAE.length;k++){
      var hae=JIJI_HAE[k];
      if((jis[i].v===hae[0]&&jis[j].v===hae[1])||(jis[i].v===hae[1]&&jis[j].v===hae[0]))
        result.jijiHae.push({a:jis[i],b:jis[j],desc:JIJI_KR[jis[i].v]+JIJI_KR[jis[j].v]+'해',name:hae[2]});
    }
  }
  return result;
}

/* ==========================================
   * 공망(空亡) 계산 - A/B 교차검증 완료
   ========================================== */
function calcGongmang(saju){
  var r=saju.raw, dg=r.dg, dj=r.dj;
  // 방법A: 수학적 계산
  var idx60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){idx60=k;break;}}
  if(idx60<0)return{gm:[],gmNames:[],affected:[]};
  var xunNum=Math.floor(idx60/10), xunStart=xunNum*10;
  var usedJi=[];for(var k=xunStart;k<xunStart+10;k++)usedJi.push(k%12);
  var gmA=[];for(var j=0;j<12;j++)if(usedJi.indexOf(j)<0)gmA.push(j);
  // 방법B: 테이블
  var GMT={0:[10,11],1:[8,9],2:[6,7],3:[4,5],4:[2,3],5:[0,1]};
  var gmB=GMT[xunNum];
  // 교차검증
  if(gmA[0]!==gmB[0]||gmA[1]!==gmB[1])console.warn('공망 A/B 불일치!');
  var gmNames=gmA.map(function(j){return JIJI_KR[j];});
  // 사주 내 공망 해당 확인
  var pillars=[{v:r.yj,l:'연지'},{v:r.mj,l:'월지'},{v:r.dj,l:'일지'}];
  if(r.hj!=null)pillars.push({v:r.hj,l:'시지'});
  var affected=[];
  pillars.forEach(function(p){if(p.v!=null&&gmA.indexOf(p.v)>=0)affected.push(p.l+'('+JIJI_KR[p.v]+')');});
  return{gm:gmA,gmNames:gmNames,affected:affected,
    desc:gmNames.join('·')+'공망'+(affected.length>0?' → '+affected.join(', ')+'에 해당':'→ 사주 내 해당 없음')};
}

/* ==========================================
   * 지장간 힘 비율 계산
   ========================================== */
function calcJijangganRatio(saju){
  var r=saju.raw, dg=r.dg;
  var labels=['연지','월지','일지','시지'];
  var jiVals=[r.yj,r.mj,r.dj,r.hj];
  var result=[];
  for(var i=0;i<4;i++){
    if(jiVals[i]==null){result.push(null);continue;}
    var jjgRaw=JIJANGGAN_DATA[jiVals[i]];
    var total=0;jjgRaw.forEach(function(it){total+=it.d;});
    var items=jjgRaw.map(function(it,idx){
      var ganName=TGAN_KR[it.g];
      var oh=OHAENG_TGAN[it.g];
      var ss=getSipsung(dg,it.g);
      var pct=Math.round(it.d/total*100);
      var role=idx===jjgRaw.length-1?'정기':idx===0?'여기':'중기';
      return{gan:ganName,oh:oh,ss:ss,days:it.d,pct:pct,role:role};
    });
    result.push({pillar:labels[i],ji:JIJI_KR[jiVals[i]],items:items});
  }
  return result;
}

/* ==========================================
   * 신살 해석 키워드
   ========================================== */
var SINSAL_KEYWORDS={
  '천을귀인':{meaning:'위기 때 예상치 못한 곳에서 도움이 옴',personality:'직감력이 뛰어남, 위험 회피 능력',life:'중요한 순간마다 귀인 출현'},
  '백호살':{meaning:'돌발적 변화나 사고를 겪을 수 있음',personality:'결단력 강함, 극적인 전환점이 많은 삶',life:'수술수 가능성, 예상치 못한 전환'},
  '도화살':{meaning:'이성을 끌어당기는 매력이 강함',personality:'예술적 감수성, 사교성 뛰어남',life:'대인관계 풍부, 감정적 끌림이 강함'},
  '역마살':{meaning:'이동과 변동이 많은 삶',personality:'한곳에 정착 어려움, 새로운 환경 적응력 뛰어남',life:'해외 인연, 잦은 이사나 출장'},
  '화개살':{meaning:'예술·종교·철학에 대한 깊은 관심',personality:'고독한 탐구자, 영적 감수성',life:'혼자만의 세계가 풍부, 학문이나 창작 분야 재능'},
  '겁살':{meaning:'돌발적 손실이나 변화를 겪을 수 있음',personality:'과감한 결단력, 충동 조절 필요',life:'위기에서 오히려 기회를 잡는 타입'},
  '재살':{meaning:'재물 관련 예상치 못한 변동',personality:'재물에 대한 집착과 불안이 공존',life:'투자나 사업에서 기복이 있을 수 있음'},
  '천살':{meaning:'하늘에서 내리는 시련과 교훈',personality:'영적 성찰 능력, 고난을 통한 성장',life:'예측 불가한 외부 변화를 겪기 쉬움'},
  '지살':{meaning:'대인관계에서의 갈등과 교훈',personality:'사람 사이 문제에 예민함',life:'관계의 질을 중시하게 됨'},
  '년살':{meaning:'매년 반복되는 패턴적 시련',personality:'인내심이 강해짐',life:'주기적으로 비슷한 도전이 찾아옴'},
  '월살':{meaning:'문서·계약 관련 주의 필요',personality:'꼼꼼한 확인 습관이 중요',life:'서류나 약속 관련 실수 주의'},
  '망신살':{meaning:'체면이나 명예에 타격이 올 수 있음',personality:'자존심이 강하고 체면을 중시',life:'실수로 인한 당혹감을 겪을 수 있음'},
  '장성살':{meaning:'사회적 성취와 명예를 얻는 기운',personality:'리더십이 뛰어남, 야망이 큼',life:'직업적 성취가 돋보임'},
  '반안살':{meaning:'안정과 편안함을 추구하는 기운',personality:'변화보다 안정을 선호',life:'안정적인 기반 위에서 능력 발휘'},
  '육해살':{meaning:'가까운 사람과의 갈등 주의',personality:'친밀한 관계에서 상처받기 쉬움',life:'배우자나 형제와의 관계에 신경 써야'},
  '괴강살':{meaning:'극단적 카리스마와 추진력',personality:'완벽주의, 타협을 모르는 강한 성격, 한번 결정하면 끝까지 밀어붙임',life:'고독한 리더, 극적인 성취와 좌절'},
  '양인살':{meaning:'날카로운 결단력과 강한 추진력',personality:'승부욕 강함, 칼 같은 에너지, 위기에 강한 돌파력',life:'수술수 가능성, 과감한 행동력'},
  '홍염살':{meaning:'강렬한 이성 매력과 정열적 에너지',personality:'매혹적 분위기, 예술적 감수성, 연애에서 정열적',life:'이성의 관심이 많음, 감정 기복'},
  '간여지동':{meaning:'일간과 일지의 기운이 같은 방향으로 치우침',personality:'고집이 강함, 독립적 성향, 자기 세계가 뚜렷',life:'배우자 관계에 주의, 재혼수'},
  '천라':{meaning:'하늘 그물에 걸린 형상',personality:'노력해도 막히는 느낌, 큰 인내 필요',life:'답답함과 정체감, 돌파하면 크게 성장'},
  '지망':{meaning:'땅 그물에 걸린 형상',personality:'현실적 제약이 많음, 실질적 돌파구 필요',life:'환경적 제약, 극복하면 단단해짐'},
  '음양차착':{meaning:'음양 에너지가 엇갈리는 구조',personality:'이중적 면모, 오해 받기 쉬움',life:'관계에서 엇갈림이 잦음, 독특한 매력'},
  '원진살':{meaning:'서로 밀어내는 미묘한 부조화',personality:'가까운 관계에서 애증 교차, 밀당의 에너지',life:'관계의 갈등과 성장이 반복'},
  '귀문관살':{meaning:'예민한 영적 감수성과 강한 직감',personality:'신경 예민, 꿈이나 영감이 강함',life:'심리적 갈등, 직관력 뛰어남'},
  '천덕귀인':{meaning:'하늘의 덕, 재앙을 막아주는 귀인',personality:'관대하고 인덕이 있음',life:'위기에서 보호받는 기운'},
  '월덕귀인':{meaning:'달의 덕, 재앙을 막아주는 귀인',personality:'너그럽고 복이 있음, 관대한 성품',life:'자연스럽게 도움을 받는 운'}
};
function enrichSinsal(saju){
  var base=saju.specialSals.map(function(s){
    var kw=SINSAL_KEYWORDS[s.name];
    if(!kw)return {name:s.name,text:s.name+'('+s.desc+')'};
    return {name:s.name,text:s.name+'('+s.desc+') — '+kw.meaning+', '+kw.personality};
  });
  var baseNames={};
  base.forEach(function(b){baseNames[b.name]=(baseNames[b.name]||0)+1;});
  var extra=calcExtraSinsal(saju).filter(function(e){
    // 기존에 같은 이름이 있으면 추가 안 함 (중복 방지)
    if(baseNames[e.name])return false;
    return true;
  }).map(function(e){
    return {name:e.name,text:e.name+'('+e.desc+') — '+e.meaning+', '+e.personality};
  });
  return base.concat(extra).map(function(item){return item.text;}).join(' / ');
}

/* ==========================================
   * 추가 신살 계산 (괴강/양인/홍염/간여지동/천라지망/음양차착/원진/귀문관/천덕/월덕)
   ========================================== */
function calcExtraSinsal(saju){
  var r=saju.raw,result=[];
  var dg=r.dg,dj=r.dj;
  var jis=[];
  if(r.yj!=null)jis.push({v:r.yj,l:'연지'});
  if(r.mj!=null)jis.push({v:r.mj,l:'월지'});
  jis.push({v:r.dj,l:'일지'});
  if(r.hj!=null)jis.push({v:r.hj,l:'시지'});
  var allGans=[];
  if(r.yg!=null)allGans.push(r.yg);
  if(r.mg!=null)allGans.push(r.mg);
  allGans.push(r.dg);
  if(r.hg!=null)allGans.push(r.hg);
  var allJis=jis.map(function(j){return j.v;});
  var ilju60=-1;
  for(var k=0;k<60;k++){if(k%10===dg&&k%12===dj){ilju60=k;break;}}

  // ① 괴강살
  if([16,46,28,58].indexOf(ilju60)>=0)
    result.push({name:'괴강살',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'극단적 카리스마와 추진력, 타협을 모르는 강한 성격',
      personality:'완벽주의, 고독한 리더, 한번 결정하면 끝까지 밀어붙임'});

  // ② 양인살: 갑-묘,을-진,병-오,정-미,무-오,기-미,경-유,신-술,임-자,계-축
  var YANGIN=[3,4,6,7,6,7,9,10,0,1];
  var yJi=YANGIN[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===yJi){
      result.push({name:'양인살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'날카로운 결단력과 강한 추진력',
        personality:'승부욕 강함, 위기에 강한 돌파력'});break;}}

  // ③ 홍염살: 갑-오,을-신,병-인,정-미,무-진,기-진,경-술,신-유,임-자,계-신
  var HONGYEOM=[6,8,2,7,4,4,10,9,0,8];
  var hJi=HONGYEOM[dg];
  for(var i=0;i<jis.length;i++){
    if(jis[i].v===hJi){
      result.push({name:'홍염살',desc:'일간 '+TGAN_KR[dg]+' → '+jis[i].l+' '+JIJI_KR[jis[i].v],
        meaning:'강렬한 이성 매력과 정열적 에너지',
        personality:'매혹적 분위기, 예술적 감수성'});break;}}

  // ④ 간여지동: 갑인,을사,무오,경신,신유
  var GANYEO=[[0,2],[1,5],[4,6],[6,8],[7,9]];
  for(var i=0;i<GANYEO.length;i++){
    if(dg===GANYEO[i][0]&&dj===GANYEO[i][1]){
      result.push({name:'간여지동',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
        meaning:'일간과 일지의 기운이 같은 방향으로 치우침',
        personality:'고집이 강함, 독립적 성향'});break;}}

  // ⑤ 천라지망
  var hasJi=function(v){return allJis.indexOf(v)>=0;};
  if(hasJi(10)&&hasJi(11))
    result.push({name:'천라',desc:'술+해 동시 존재',
      meaning:'하늘 그물에 걸린 형상, 답답함과 정체감',
      personality:'노력해도 막히는 느낌, 큰 인내 필요'});
  if(hasJi(4)&&hasJi(5))
    result.push({name:'지망',desc:'진+사 동시 존재',
      meaning:'땅 그물에 걸린 형상, 현실적 제약',
      personality:'환경적 제약이 많음, 실질적 돌파구 필요'});

  // ⑥ 음양차착: 12개 일주
  if([12,13,14,27,28,29,42,43,44,57,58,59].indexOf(ilju60)>=0)
    result.push({name:'음양차착',desc:'일주 '+TGAN_KR[dg]+JIJI_KR[dj],
      meaning:'음양 에너지가 엇갈리는 구조',
      personality:'이중적 면모, 오해 받기 쉬움'});

  // ⑦ 원진살: 자미,축오,인유,묘신,진해,사술
  var WONJIN=[[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<WONJIN.length;w++){
      if((jis[i].v===WONJIN[w][0]&&jis[j].v===WONJIN[w][1])||(jis[i].v===WONJIN[w][1]&&jis[j].v===WONJIN[w][0])){
        result.push({name:'원진살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'서로 밀어내는 미묘한 부조화',
          personality:'가까운 관계에서 애증 교차'});}}}}

  // ⑧ 귀문관살: 자유,축오,인미,묘신,진해,사술
  var GUIMUN=[[0,9],[1,6],[2,7],[3,8],[4,11],[5,10]];
  for(var i=0;i<jis.length;i++){for(var j=i+1;j<jis.length;j++){
    for(var w=0;w<GUIMUN.length;w++){
      if((jis[i].v===GUIMUN[w][0]&&jis[j].v===GUIMUN[w][1])||(jis[i].v===GUIMUN[w][1]&&jis[j].v===GUIMUN[w][0])){
        result.push({name:'귀문관살',desc:jis[i].l+' '+JIJI_KR[jis[i].v]+' ↔ '+jis[j].l+' '+JIJI_KR[jis[j].v],
          meaning:'예민한 영적 감수성과 강한 직감',
          personality:'신경 예민, 꿈이나 영감이 강함'});}}}}

  // ⑨ 천덕귀인 (월지 기준)
  var CHEONDUK=[{t:1,v:5},{t:0,v:6},{t:0,v:3},{t:0,v:7},{t:0,v:8},{t:0,v:7},{t:1,v:11},{t:0,v:0},{t:0,v:9},{t:1,v:2},{t:0,v:2},{t:0,v:1}];
  if(r.mj!=null){var cd=CHEONDUK[r.mj];var cdf=false;
    if(cd.t===0){for(var i=0;i<allGans.length;i++){if(allGans[i]===cd.v){cdf=true;break;}}}
    else{for(var i=0;i<allJis.length;i++){if(allJis[i]===cd.v){cdf=true;break;}}}
    if(cdf)result.push({name:'천덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+(cd.t===0?TGAN_KR[cd.v]:JIJI_KR[cd.v]),
      meaning:'하늘의 덕, 재앙을 막아주는 귀인',
      personality:'관대하고 인덕이 있음, 위기에서 보호'});}

  // ⑩ 월덕귀인 (월지→천간)
  var WOLDUK={2:2,6:2,10:2,8:8,0:8,4:8,5:6,9:6,1:6,11:0,3:0,7:0};
  if(r.mj!=null&&WOLDUK[r.mj]!==undefined){var wdG=WOLDUK[r.mj];
    for(var i=0;i<allGans.length;i++){if(allGans[i]===wdG){
      result.push({name:'월덕귀인',desc:'월지 '+JIJI_KR[r.mj]+' → '+TGAN_KR[wdG],
        meaning:'달의 덕, 재앙을 막아주는 귀인',
        personality:'너그럽고 복이 있음'});break;}}}

  return result;
}

/* ==========================================
   * 60갑자 일주 특성 데이터
   ========================================== */
var ILJU_DATA={
'갑자':{k:'바다 위의 큰 나무',t:'독립심이 강하고 리더십이 있는 개척자. 자수(子水)가 인수(印綬)가 되어 학습 능력이 뛰어나고, 지혜가 깊습니다.',love:'배우자궁에 정인이 있어 지적이고 배려심 깊은 배우자를 만날 운. 다만 의존성이 생기지 않도록 주의.',job:'교육, 연구, 법조, IT 분야'},
'갑인':{k:'울창한 숲 속 거목',t:'자기 주관이 매우 강하고 진취적. 비견이 일지에 있어 독립적이지만 고집이 셀 수 있습니다. 건록에 앉아 에너지가 넘칩니다.',love:'배우자궁이 비견이라 대등한 관계를 원하며, 비슷한 성향의 파트너와 잘 맞습니다.',job:'사업가, 프리랜서, 스타트업, 창작'},
'갑진':{k:'봄비 머금은 언덕의 나무',t:'진토(辰土) 위의 갑목은 습한 토양에 뿌리를 내린 형상. 재성이 풍부하고 현실적 판단력이 좋습니다.',love:'배우자궁에 편재가 있어 매력적이고 활동적인 배우자. 다만 변화가 많을 수 있습니다.',job:'금융, 부동산, 유통, 무역'},
'갑오':{k:'뜨거운 태양 아래 서 있는 나무',t:'화(火)의 기운이 식상을 만들어 표현력이 뛰어납니다. 사(死)에 앉아 있어 겉으로는 화려하지만 내면은 고독할 수 있습니다.',love:'배우자궁에 식신이 있어 다정하고 표현력 좋은 배우자. 예술적 감각이 있는 사람에게 끌립니다.',job:'예술, 디자인, 마케팅, 교육, 방송'},
'갑신':{k:'가을바람에 흔들리는 나무',t:'편관(偏官)이 일지에 있어 압박감 속에서 성장하는 타입. 절지(絶地)에 앉아 파란만장하지만, 극적 반전의 삶을 삽니다.',love:'배우자궁에 편관이 있어 카리스마 있는 배우자. 때로는 갈등이 성장의 동력이 됩니다.',job:'군경, 법률, 의료, 위기관리, 컨설팅'},
'갑술':{k:'마른 언덕 위 고목',t:'술토(戌土) 위의 갑목은 재성이 있되 건조한 환경. 의지가 강하고 인내심이 있으나, 외로움을 느끼기 쉽습니다.',love:'배우자궁에 편재가 있어 활동적인 배우자. 단, 감정 표현이 서투를 수 있어 대화가 중요합니다.',job:'건축, 토목, 재테크, 부동산 개발'},
'을축':{k:'겨울 정원의 작은 풀',t:'편관(偏官)이 일지에 있어 규율과 체계 안에서 능력을 발휘합니다. 쇠(衰)에 앉아 조용하지만 내면의 힘이 있습니다.',love:'배우자궁에 편관이 있어 듬직하고 체계적인 배우자를 만날 운.',job:'공무원, 교사, 회계, 금융'},
'을묘':{k:'봄날 화원의 꽃',t:'비견이 일지에 있어 자존심이 강하고, 건록에 앉아 자생력이 뛰어납니다. 예민한 감수성과 미적 감각이 돋보입니다.',love:'비견이 배우자궁이라 독립적인 관계를 추구. 서로의 자유를 존중하는 파트너.',job:'디자인, 패션, 글쓰기, 상담, 교육'},
'을사':{k:'화산 옆에 핀 꽃',t:'상관(傷官)이 일지에 있어 창의적이고 언변이 뛰어납니다. 병지(病地)에 앉아 에너지 기복이 있지만 표현력은 최상급.',love:'배우자궁에 상관이 있어 재치있고 말 잘하는 배우자. 다만 잔소리 주의.',job:'방송, 작가, 마케팅, 엔터테인먼트'},
'을미':{k:'여름 들판의 풀꽃',t:'편재(偏財)가 일지에 있어 재물 감각이 좋습니다. 양(養)에 앉아 성장 가능성이 무한합니다.',love:'배우자궁에 편재가 있어 넉넉하고 사교적인 배우자와 인연.',job:'서비스업, 요식업, 투자, 유통'},
'을유':{k:'가을 국화',t:'편관(偏官)이 일지에 있어 외부 압력에 강해지는 구조. 절지(絶地)에 앉아 기복이 크지만, 그만큼 반전의 드라마가 있습니다.',love:'배우자궁에 편관이 있어 강한 성격의 배우자. 밀당보다 진심이 통하는 관계.',job:'법률, 의료, 미용, 예술 비평'},
'을해':{k:'겨울 호숫가 버드나무',t:'정인(正印)이 일지에 있어 학문적 자질이 뛰어나고, 사(死)에 앉아 있지만 내면의 지혜가 깊습니다.',love:'배우자궁에 정인이 있어 지적이고 따뜻한 배우자. 정서적으로 깊은 관계.',job:'교수, 연구원, 상담사, 작가'},
'병자':{k:'한밤의 횃불',t:'정관(正官)이 일지에 있어 사회적 체면과 규율을 중시합니다. 태지(胎地)에 앉아 새로운 시작에 강합니다.',love:'배우자궁에 정관이 있어 성실하고 안정적인 배우자. 신뢰를 기반으로 한 관계.',job:'공기업, 관리직, 행정, 외교'},
'병인':{k:'새벽의 태양',t:'편인(偏印)이 일지에 있어 직관력과 독창성이 뛰어납니다. 장생(長生)에 앉아 에너지가 넘치고 낙천적입니다.',love:'배우자궁에 편인이 있어 독특하고 개성적인 배우자. 정신적 교감이 중요한 관계.',job:'IT, 연구개발, 종교, 철학, 대체의학'},
'병진':{k:'봄날의 뜨거운 태양',t:'식신(食神)이 일지에 있어 표현력이 풍부하고, 관대(冠帶)에 앉아 사회적 활동이 왕성합니다.',love:'배우자궁에 식신이 있어 유머 감각 좋고 다정한 배우자.',job:'교육, 요리, 콘텐츠, 예능, 마케팅'},
'병오':{k:'한낮의 뜨거운 태양',t:'겁재(劫財)가 일지에 있어 경쟁 본능이 강하고, 제왕(帝旺)에 앉아 최고의 에너지 상태입니다. 다만 과열 주의.',love:'배우자궁에 겁재가 있어 열정적이지만 경쟁적인 관계가 될 수 있습니다.',job:'사업, 스포츠, 영업, 투자'},
'병신':{k:'석양의 빛',t:'편재(偏財)가 일지에 있어 다재다능하고 현실 감각이 좋습니다. 병지(病地)에 앉아 체력 관리가 핵심.',love:'배우자궁에 편재가 있어 매력적이고 활발한 배우자.',job:'금융, 무역, 부동산, 엔터테인먼트'},
'병술':{k:'노을 지는 산마루 불꽃',t:'식신(食神)이 일지에 있어 표현력이 좋고, 묘지(墓地)에 앉아 깊은 사색과 축적의 기운이 있습니다.',love:'배우자궁에 식신이 있어 따뜻하고 헌신적인 배우자.',job:'교육, 종교, 역사, 연구, 글쓰기'},
'정축':{k:'촛불 아래 옥토',t:'식신(食神)이 일지에 있어 섬세한 표현력이 돋보입니다. 묘지(墓地)에 앉아 내면의 축적과 깊이가 있습니다.',love:'배우자궁에 식신이 있어 요리잘하고 세심한 배우자.',job:'요리, 공예, 교육, 글쓰기, 상담'},
'정묘':{k:'초원에 깜빡이는 반딧불',t:'편인(偏印)이 일지에 있어 독창적 사고방식을 가졌습니다. 병지(病地)에 앉아 에너지 관리가 중요합니다.',love:'배우자궁에 편인이 있어 독특한 매력의 배우자. 정신적 연결이 깊은 관계.',job:'점술, 심리학, 예술, IT, 대안적 분야'},
'정사':{k:'용광로 속 불꽃',t:'겁재(劫財)가 일지에 있어 경쟁심이 강하고, 제왕(帝旺)에 앉아 에너지가 폭발적입니다.',love:'배우자궁에 겁재가 있어 비슷한 에너지의 파트너. 주도권 다툼에 주의.',job:'사업, 투자, 스포츠, 경쟁적 분야'},
'정미':{k:'여름밤 모닥불',t:'비견(比肩)이 일지에 있어 자존심이 강하고 독립적입니다. 관대(冠帶)에 앉아 사회적 인정을 받습니다.',love:'비견이 배우자궁이라 대등하고 독립적인 관계를 추구합니다.',job:'디자인, 패션, 미용, 교육, 상담'},
'정유':{k:'가을 저녁 촛불',t:'정재(正財)가 일지에 있어 안정적인 재물운을 가졌습니다. 장생(長生)에 앉아 꾸준한 성장이 가능합니다.',love:'배우자궁에 정재가 있어 알뜰하고 현실적인 배우자. 안정적인 가정을 꾸립니다.',job:'금융, 회계, 경영, 교육, 서비스'},
'정해':{k:'겨울밤 아궁이 불',t:'정관(正官)이 일지에 있어 사회적 책임감이 강합니다. 태지(胎地)에 앉아 새로운 시작의 에너지가 있습니다.',love:'배우자궁에 정관이 있어 품격있고 신뢰할 수 있는 배우자.',job:'공무원, 기업 관리직, 법률, 외교'},
'무자':{k:'얼어붙은 대지',t:'정재(正財)가 일지에 있어 재물 관리 능력이 뛰어납니다. 태지(胎地)에 앉아 새로운 가능성이 열려있습니다.',love:'배우자궁에 정재가 있어 현실적이고 알뜰한 배우자.',job:'금융, 부동산, 농업, 자원관리'},
'무인':{k:'봄 산의 바위',t:'편관(偏官)이 일지에 있어 도전 정신이 강합니다. 장생(長生)에 앉아 무한한 성장 가능성이 있습니다.',love:'배우자궁에 편관이 있어 강하고 추진력 있는 배우자.',job:'군경, 스포츠, 건설, 모험적 사업'},
'무진':{k:'드넓은 평야',t:'비견(比肩)이 일지에 있어 자기 신념이 확고합니다. 관대(冠帶)에 앉아 사회적 위상이 높습니다.',love:'배우자궁에 비견이라 대등한 파트너십. 각자의 영역을 존중하는 관계.',job:'정치, 경영, 교육, 종교'},
'무오':{k:'화산 위의 대지',t:'정인(正印)이 일지에 있어 학문적 깊이가 있고 지혜롭습니다. 제왕(帝旺)에 앉아 에너지가 최고조.',love:'배우자궁에 정인이 있어 지적이고 따뜻한 배우자.',job:'교수, 연구, 교육, 컨설팅, 종교'},
'무신':{k:'가을 들판의 바위',t:'식신(食神)이 일지에 있어 표현력이 좋고 재능이 다양합니다. 병지(病地)에 앉아 건강 관리가 중요합니다.',love:'배우자궁에 식신이 있어 유머 감각 좋고 재능있는 배우자.',job:'IT, 기술, 콘텐츠, 요리, 제조'},
'무술':{k:'높은 산봉우리',t:'비견(比肩)이 일지에 있어 고집이 세지만 신뢰감을 줍니다. 묘지(墓地)에 앉아 축적과 저장의 기운.',love:'배우자궁에 비견이라 동등한 관계. 서로 자립한 커플.',job:'건축, 부동산, 종교, 철학'},
'기축':{k:'겨울 옥토의 씨앗',t:'비견(比肩)이 일지에 있어 묵묵한 인내력이 강점입니다. 묘지(墓地)에 앉아 축적하는 힘이 있습니다.',love:'배우자궁에 비견이라 서로 돕는 동반자적 관계.',job:'농업, 요식업, 교육, 금융'},
'기묘':{k:'정원사의 화단',t:'편관(偏官)이 일지에 있어 외부 자극에 민감하게 반응합니다. 병지(病地)에 앉아 체력 관리가 중요합니다.',love:'배우자궁에 편관이 있어 때로는 부딪히지만 성장하게 만드는 배우자.',job:'의료, 법률, 미용, 상담'},
'기사':{k:'화산재 위의 옥토',t:'정인(正印)이 일지에 있어 학문과 지혜에 대한 열정이 있습니다. 제왕(帝旺)에 앉아 내면의 힘이 강력합니다.',love:'배우자궁에 정인이 있어 학식있고 깊은 배우자.',job:'교수, 연구, 종교, 한의학, 철학'},
'기미':{k:'한여름 옥토',t:'비견(比肩)이 일지에 있어 자기 세계가 확고합니다. 관대(冠帶)에 앉아 사회적 활동이 활발합니다.',love:'배우자궁에 비견이라 독립적이면서도 동지적 관계.',job:'교육, 부동산, 요식업, 서비스업'},
'기유':{k:'가을 수확의 들판',t:'식신(食神)이 일지에 있어 먹을 복이 있고 표현력이 뛰어납니다. 장생(長生)에 앉아 꾸준한 성장세.',love:'배우자궁에 식신이 있어 다정다감하고 재능있는 배우자.',job:'요리, 교육, 콘텐츠, 서비스, IT'},
'기해':{k:'겨울 호숫가 들판',t:'정재(正財)가 일지에 있어 재물운이 안정적입니다. 태지(胎地)에 앉아 새로운 시도에 열려있습니다.',love:'배우자궁에 정재가 있어 현실적이고 알뜰한 배우자.',job:'금융, 무역, 유통, 경영'},
'경자':{k:'한밤의 검',t:'상관(傷官)이 일지에 있어 말이 날카롭고 통찰력이 뛰어납니다. 사(死)에 앉아 극적인 전환이 있습니다.',love:'배우자궁에 상관이 있어 재치있고 솔직한 배우자. 입담이 센 관계.',job:'변호사, 평론가, 컨설팅, IT, 저널리즘'},
'경인':{k:'봄 숲의 도끼',t:'편재(偏財)가 일지에 있어 재물 감각이 있고 활동적입니다. 절지(絶地)에 앉아 기복이 크지만 반전이 있습니다.',love:'배우자궁에 편재가 있어 활동적이고 매력적인 배우자.',job:'영업, 무역, 투자, 스타트업'},
'경진':{k:'광산 속 원석',t:'편인(偏印)이 일지에 있어 독특한 사고방식을 가졌습니다. 양(養)에 앉아 성장 가능성이 높습니다.',love:'배우자궁에 편인이 있어 개성적이고 지적 자극을 주는 배우자.',job:'연구개발, IT, 발명, 대체의학'},
'경오':{k:'대장간의 불꽃',t:'편관(偏官)이 일지에 있어 단련 속에서 강해집니다. 목욕(沐浴)에 앉아 변화와 변동이 많습니다.',love:'배우자궁에 편관이 있어 강한 성격의 배우자. 서로 단련하며 성장.',job:'군경, 의료, 스포츠, 중장비, 철강'},
'경신':{k:'보석 세공사',t:'비견(比肩)이 일지에 있어 자부심이 강하고 원칙적입니다. 건록(建祿)에 앉아 자립 능력이 뛰어납니다.',love:'배우자궁에 비견이라 대등한 관계. 서로의 전문성을 인정하는 커플.',job:'금융, 법률, 기술, 정밀산업'},
'경술':{k:'사막의 쇳덩이',t:'편인(偏印)이 일지에 있어 독특한 아이디어와 직관이 있습니다. 쇠(衰)에 앉아 안정을 추구합니다.',love:'배우자궁에 편인이 있어 독특하고 깊이있는 배우자.',job:'연구, 발명, IT, 종교, 심리학'},
'신축':{k:'겨울 광산의 보석',t:'식신(食神)이 일지에 있어 먹을 복이 있고 표현력이 뛰어납니다. 양(養)에 앉아 성장 잠재력이 큽니다.',love:'배우자궁에 식신이 있어 따뜻하고 재능있는 배우자.',job:'요리, 교육, 금융, 보석, 기술'},
'신묘':{k:'봄 정원의 가위',t:'편재(偏財)가 일지에 있어 재물 감각이 좋습니다. 절지(絶地)에 앉아 파란만장하지만 반전이 큽니다.',love:'배우자궁에 편재가 있어 활발하고 사교적인 배우자.',job:'미용, 패션, 유통, 투자'},
'신사':{k:'여름의 보석',t:'정관(正官)이 일지에 있어 사회적 품격이 있습니다. 사(死)에 앉아 있지만 내면의 단단함이 있습니다.',love:'배우자궁에 정관이 있어 품격있고 안정적인 배우자.',job:'공무원, 법률, 외교, 금융'},
'신미':{k:'노을빛 보석',t:'편인(偏印)이 일지에 있어 독창성과 직관이 뛰어납니다. 관대(冠帶)에 앉아 사회적 활약이 있습니다.',love:'배우자궁에 편인이 있어 개성적이고 깊이있는 배우자.',job:'예술, IT, 종교, 대안교육'},
'신유':{k:'순금',t:'비견(比肩)이 일지에 있어 자존심이 매우 강하고, 건록(建祿)에 앉아 자립심이 최고입니다.',love:'배우자궁에 비견이라 독립적인 관계. 강한 자존심끼리 부딪힐 수 있습니다.',job:'금융, 보석, 기술, 법률, 정밀산업'},
'신해':{k:'겨울밤 은하수의 별',t:'상관(傷官)이 일지에 있어 언변이 뛰어나고 창의적입니다. 목욕(沐浴)에 앉아 변화를 즐깁니다.',love:'배우자궁에 상관이 있어 말 잘하고 재치있는 배우자.',job:'작가, 방송, 마케팅, 법률, 컨설팅'},
'임자':{k:'깊은 바다',t:'겁재(劫財)가 일지에 있어 경쟁심이 강하고, 제왕(帝旺)에 앉아 에너지가 최고조입니다.',love:'배우자궁에 겁재가 있어 열정적인 관계. 주도권 경쟁에 주의.',job:'무역, 해운, 금융, 투자, 스포츠'},
'임인':{k:'봄비',t:'식신(食神)이 일지에 있어 표현력이 풍부하고, 병지(病地)에 앉아 있지만 창의력이 넘칩니다.',love:'배우자궁에 식신이 있어 다정하고 따뜻한 배우자.',job:'교육, 예술, 콘텐츠, 요리, 상담'},
'임진':{k:'우기의 호수',t:'편관(偏官)이 일지에 있어 자기 절제력이 강합니다. 묘지(墓地)에 앉아 축적과 저장의 힘이 있습니다.',love:'배우자궁에 편관이 있어 강한 추진력의 배우자.',job:'공무원, 군경, 건설, 수자원'},
'임오':{k:'뜨거운 사막의 오아시스',t:'정재(正財)가 일지에 있어 재물운이 좋습니다. 태지(胎地)에 앉아 새로운 시작에 강합니다.',love:'배우자궁에 정재가 있어 현실적이고 안정적인 배우자.',job:'금융, 유통, 서비스업, 부동산'},
'임신':{k:'가을 폭포',t:'편인(偏印)이 일지에 있어 독창적이고 직관적입니다. 장생(長生)에 앉아 지속적 성장이 가능합니다.',love:'배우자궁에 편인이 있어 독특하고 지적인 배우자.',job:'IT, 연구, 대체의학, 심리학'},
'임술':{k:'마른 강바닥',t:'편관(偏官)이 일지에 있어 위기관리 능력이 뛰어납니다. 관대(冠帶)에 앉아 사회적 입지가 있습니다.',love:'배우자궁에 편관이 있어 카리스마 있는 배우자.',job:'법률, 의료, 위기관리, 건설'},
'계축':{k:'겨울 논의 물',t:'편관(偏官)이 일지에 있어 꼼꼼하고 체계적입니다. 관대(冠帶)에 앉아 사회적 활동이 안정적입니다.',love:'배우자궁에 편관이 있어 듬직하고 체계적인 배우자.',job:'회계, 법률, 교육, 연구'},
'계묘':{k:'봄날의 이슬',t:'식신(食神)이 일지에 있어 감성이 풍부하고 표현력이 뛰어납니다. 장생(長生)에 앉아 성장 에너지가 넘칩니다.',love:'배우자궁에 식신이 있어 다정하고 감성적인 배우자.',job:'예술, 교육, 상담, 글쓰기, 콘텐츠'},
'계사':{k:'여름 소나기',t:'정재(正財)가 일지에 있어 재물 감각이 있습니다. 태지(胎地)에 앉아 새로운 시도가 잘 풀립니다.',love:'배우자궁에 정재가 있어 알뜰하고 현실적인 배우자.',job:'금융, 유통, 서비스업, 기술'},
'계미':{k:'여름밤 안개',t:'편관(偏官)이 일지에 있어 자기 관리가 철저합니다. 묘지(墓地)에 앉아 내면의 축적이 있습니다.',love:'배우자궁에 편관이 있어 안정감 있는 배우자.',job:'교육, 종교, 농업, 서비스업'},
'계유':{k:'가을비',t:'편인(偏印)이 일지에 있어 독창적 사고를 합니다. 병지(病地)에 앉아 건강 관리가 중요합니다.',love:'배우자궁에 편인이 있어 독특한 매력의 배우자.',job:'IT, 연구, 음악, 예술, 심리학'},
'계해':{k:'끝없는 대양',t:'비견(比肩)이 일지에 있어 자기 세계가 넓고 깊습니다. 제왕(帝旺)에 앉아 에너지가 넘칩니다.',love:'배우자궁에 비견이라 대등하고 독립적인 관계.',job:'무역, 해운, 연구, IT, 국제업무'}
};

/* ====== 프로파일 분석기 + 새로운 폴백 v2 ====== */

/* ==========================================
   * 프로파일 분석기 - 이 사람의 "특이점"을 찾아내는 엔진
   ========================================== */
function profileAnalysis(saju,gg,rel){
  var dm=saju.dm,dmEl=saju.dmEl;
  var dayBrSS=saju.ss[2]?saju.ss[2].ss:'',dayUns=saju.uns[2]||'';
  var ySS=saju.ss[0]?saju.ss[0].ss:'',mSS=saju.ss[1]?saju.ss[1].ss:'',hSS=saju.ss[3]?saju.ss[3].ss:'';
  var strongUns=['건록','제왕','관대','장생'].indexOf(dayUns)>=0;

  // 십성 카운트
  var ssCount={};
  saju.ss.forEach(function(s){if(s.ss){ssCount[s.ss]=(ssCount[s.ss]||0)+1;}});

  // 특수신살 분류
  var salGood=saju.specialSals.filter(function(s){return s.type==='good';});
  var salBad=saju.specialSals.filter(function(s){return s.type==='bad';});
  var hasDohwa=salBad.some(function(s){return s.name==='도화살';});
  var hasYeokma=saju.specialSals.some(function(s){return s.name==='역마살';});
  var hasBaekho=salBad.some(function(s){return s.name==='백호살';});
  var hasGwimun=salBad.some(function(s){return s.name==='귀문관살';});
  var hasCheonEul=salGood.some(function(s){return s.name==='천을귀인';});

  // 합충형 요약
  var chungList=rel.jijiChung.map(function(c){return c.desc;});
  var hapList=rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;}));
  var samhapList=rel.jijiSamhap.map(function(h){return h.desc;});
  var hyungList=rel.jijiHyung.map(function(h){return h.desc;});

  // 오행 과다/부족 분석
  var elSorted=Object.entries(saju.el).sort(function(a,b){return b[1]-a[1];});
  var maxEl=elSorted[0],minEl=elSorted[elSorted.length-1];
  var excessEl=(maxEl[1]>=4)?maxEl[0]:null;
  var zeroEls=gg.lack;

  // 이 사람의 핵심 키워드들 (에너지 타입)
  var energyType='balanced';
  if(gg.cnt['식상']>=2.5) energyType='expressive';
  else if(gg.cnt['비겁']>=2.5) energyType='independent';
  else if(gg.cnt['재성']>=2.5) energyType='practical';
  else if(gg.cnt['관성']>=2.5) energyType='disciplined';
  else if(gg.cnt['인성']>=2.5) energyType='intellectual';

  // 감정 폭주 유형
  var angerType='suppress'; // default
  if(ssCount['상관']>=1) angerType='verbal';
  else if(ssCount['겁재']>=1) angerType='explosive';
  else if(dmEl==='화') angerType='flashfire';
  else if(dmEl==='수') angerType='flood';
  else if(dmEl==='금') angerType='blade';
  else if(dmEl==='토') angerType='earthquake';
  else if(dmEl==='목') angerType='stubborn';

  // 연애 유형
  var loveType='standard';
  if(hasDohwa) loveType='charming';
  else if(dayBrSS.indexOf('편관')>=0||dayBrSS.indexOf('정관')>=0) loveType='authoritative';
  else if(dayBrSS.indexOf('식신')>=0||dayBrSS.indexOf('상관')>=0) loveType='romantic';
  else if(dayBrSS.indexOf('비견')>=0||dayBrSS.indexOf('겁재')>=0) loveType='independent';
  else if(dayBrSS.indexOf('인')>=0) loveType='intellectual';
  else if(dayBrSS.indexOf('재')>=0) loveType='devoted';

  // 재물 유형
  var wealthType='none';
  if(ssCount['편재']>=2) wealthType='windfall';
  else if(ssCount['정재']>=1&&ssCount['편재']>=1) wealthType='dual';
  else if(ssCount['정재']>=1) wealthType='steady';
  else if(ssCount['편재']>=1) wealthType='venture';
  else if(gg.cnt['식상']>=2) wealthType='talent';
  else wealthType='late';

  return {
    dm:dm,dmEl:dmEl,dayBrSS:dayBrSS,dayUns:dayUns,strongUns:strongUns,
    ySS:ySS,mSS:mSS,hSS:hSS,
    ssCount:ssCount,salGood:salGood,salBad:salBad,
    hasDohwa:hasDohwa,hasYeokma:hasYeokma,hasBaekho:hasBaekho,hasGwimun:hasGwimun,hasCheonEul:hasCheonEul,
    chungList:chungList,hapList:hapList,samhapList:samhapList,hyungList:hyungList,
    excessEl:excessEl,zeroEls:zeroEls,maxEl:maxEl,minEl:minEl,
    energyType:energyType,angerType:angerType,loveType:loveType,wealthType:wealthType,
    elSorted:elSorted
  };
}

var MI={
  // E/I축
  E:{
    55:{short:'살짝 외향',
      trait:'외향이긴 한데, 내향에 꽤 가까운 사람이에요. 사람들 사이에서 에너지를 얻지만, 혼자 시간도 반드시 필요합니다. 회식 끝나면 "오늘은 좀 일찍 빠질게"가 자연스럽고, 주말엔 약속 하나 + 혼자 시간 반반이 가장 편해요.',
      love:'연애할 때도 같이 있으면 좋지만 매일 만나면 지칩니다. 적절한 거리두기가 되는 파트너가 최고.',
      work:'재택과 출근의 하이브리드가 최적. 매일 사람 만나는 건 소모적이지만, 완전 고립도 싫어해요.',
      burn:'사교 모드와 충전 모드의 전환이 빈번해서 에너지 관리가 필수. 약속을 잡을 때 "앞뒤 하루 비우기" 규칙을 세우세요.'},
    68:{short:'확실한 외향',
      trait:'사람을 만나면 충전되는 확실한 외향이에요. 혼자 있으면 심심하고, 주말에 약속 없으면 불안합니다. 카톡 답장 빠르고, 전화 통화를 즐기는 타입.',
      love:'연애할 때 매일 연락, 자주 만남이 기본값이에요. 상대가 연락 안 하면 "나 싫어졌나?"가 먼저 떠오릅니다.',
      work:'사람과 소통하는 포지션에서 빛나요. 영업, 마케팅, 교육, 서비스업. 혼자 작업하는 시간이 길면 스트레스.',
      burn:'사교 일정이 너무 빡빡하면 역설적으로 외향도 지쳐요. 일주일에 하루는 "아무도 안 만나는 날"을 지키세요.'},
    88:{short:'극강 외향',
      trait:'혼자 있는 건 고문이에요. 어디든 사람이 있어야 하고, 모임의 중심에 서야 에너지가 돌아갑니다. 조용한 도서관보다 시끌벅적한 카페가 편하고, 처음 보는 사람에게도 말을 거는 데 전혀 거리낌이 없어요.',
      love:'연애가 삶의 큰 비중을 차지해요. 상대와 거의 모든 걸 공유하고 싶어하고, 혼자 보내는 시간이 길면 관계에 불안을 느껴요.',
      work:'팀 리더, 네트워커, 영업 에이스. 사람을 상대하는 일이라면 에너지가 무한대. 단, 서류 작업이나 혼자 분석하는 일은 엄청난 의지력이 필요.',
      burn:'사람이 에너지원인 만큼, "잘못된 사람"에게서 받는 데미지도 극대화돼요. 에너지 뱀파이어(만나면 지치는 사람)를 구분하는 눈을 키우세요.'}
  },
  I:{
    55:{short:'살짝 내향',
      trait:'내향이지만 외향에 꽤 가까워요. 소수와의 깊은 대화를 선호하지만, 큰 모임도 충분히 즐길 수 있어요. 외향인 척 연기가 가능한 내향, 사회적 상황에서 자연스럽지만 집에 오면 방전.',
      love:'처음에는 조금 경계하지만 마음을 열면 꽤 적극적이에요. 1:1 데이트를 선호하지만 상대 친구 모임도 OK.',
      work:'조용한 환경과 협업 사이의 균형이 중요. 미팅이 하루 2~3개까지는 괜찮지만, 그 이상이면 소모적.',
      burn:'외향적 행동을 오래 하면 갑자기 배터리가 0%가 됩니다. "오늘 좀 많이 외출했다" 싶으면 다음날은 무조건 쉬세요.'},
    68:{short:'확실한 내향',
      trait:'혼자만의 시간이 생명줄이에요. 사람 만나는 건 좋지만 "적정량"이 명확하고, 초과하면 급격히 지쳐요. 문자보다 카톡, 카톡보다 혼자 생각, 전화는 가능하면 피하는 타입.',
      love:'깊은 1:1 관계에 올인하는 스타일. 넓은 인맥보다 한 사람과의 깊은 연결이 중요해요. 단, 상대가 너무 사교적이면 에너지가 달립니다.',
      work:'독립적으로 몰입할 수 있는 환경이 최고. 오픈 오피스보다 개인 공간, 회의보다 메일/문서 소통이 편해요.',
      burn:'인간관계 에너지 배분이 핵심. 꼭 만나야 하는 사람과 안 만나도 되는 사람을 구분하고, 후자를 과감히 줄이세요.'},
    88:{short:'극강 내향',
      trait:'세상은 시끄럽고, 내 방이 천국이에요. 사람을 싫어하는 게 아니라, 혼자 있을 때 가장 나다운 상태가 되는 거예요. 소셜 미디어도 보는 게 편하고, 댓글 다는 건 큰 결심. 파티 초대받으면 먼저 "빠질 구실"을 생각합니다.',
      love:'진짜 마음을 여는 데 시간이 오래 걸려요. 하지만 한번 열면 누구보다 깊은 관계를 맺습니다. 상대에게 "너와 함께 침묵이 편하다"가 최고의 고백.',
      work:'재택근무 또는 독립적 작업 환경이 필수. 크리에이터, 연구자, 개발자, 작가처럼 몰입할 수 있는 일이 최적.',
      burn:'사회적 의무(명절, 회식, 경조사)가 가장 큰 에너지 소모원이에요. 이런 일정 전후로 충전일을 반드시 확보하세요.'}
  },
  // S/N축
  S:{
    55:{short:'살짝 감각',
      trait:'현실적이긴 한데 직관도 꽤 쓰는 사람이에요. 데이터와 사실을 기반으로 판단하지만, 가끔 "그냥 느낌적으로"가 맞을 때도 있다는 걸 알아요.',
      love:'상대의 행동(팩트)을 중시하면서도, 분위기와 느낌도 읽어요. 균형 잡힌 연애관.',
      work:'실무 능력이 뛰어나면서도 큰 그림을 볼 줄 알아요. 실행력 + 기획력의 하이브리드.',
      burn:'디테일과 비전 사이에서 왔다갔다 하느라 에너지가 분산될 수 있어요.'},
    68:{short:'확실한 감각',
      trait:'보이는 것, 만져지는 것, 증명된 것을 신뢰해요. "증거 보여줘"가 기본 사고방식이고, 추상적 이야기에는 "그래서 구체적으로 뭔데?"라고 물어요.',
      love:'말보다 행동을 봐요. "사랑해"라는 말 100번보다 생일에 내가 원하던 그 선물 1개가 더 감동적.',
      work:'실행력의 왕. 아이디어보다 결과물, 계획보다 실행. 손에 잡히는 성과를 만드는 데 탁월.',
      burn:'변화가 너무 빠르거나 불확실한 상황이 스트레스. "일단 해보자"보다 "먼저 계획 세우자"가 편해요.'},
    88:{short:'극강 감각',
      trait:'지금, 여기, 이 순간이 전부예요. 오감이 예민하고, 현실 파악력이 최상급. 음식의 미세한 맛 차이를 알고, 인테리어 디테일을 놓치지 않아요. 반면 "10년 후를 상상해봐"라는 질문에는 막막함을 느껴요.',
      love:'감각적 경험을 공유하는 연애가 최고. 맛집 탐방, 여행, 함께 운동하기. 추상적인 "우리의 미래"보다 오늘의 데이트가 중요.',
      work:'현장 전문가. 직접 보고, 만지고, 경험해야 진가를 발휘해요. 전략 기획보다 현장 운영, 이론보다 실전.',
      burn:'루틴이 깨지거나 감각적으로 불쾌한 환경(소음, 불편한 의자)이 생산성을 급락시켜요.'}
  },
  N:{
    55:{short:'살짝 직관',
      trait:'가능성을 탐색하되 현실도 놓치지 않는 균형형이에요. 아이디어가 떠오르면 "이거 실현 가능한가?"를 같이 체크해요.',
      love:'상대의 잠재력을 보면서도 현재 모습도 있는 그대로 받아들이는 편. 건강한 연애관.',
      work:'기획과 실행을 모두 할 수 있는 올라운더. 전략도 짜고 디테일도 챙기는 사람.',
      burn:'아이디어와 현실 사이에서 줄타기하느라 결정 장애가 올 수 있어요.'},
    68:{short:'확실한 직관',
      trait:'"왜?"와 "만약에?"가 일상인 사람이에요. 눈앞의 현실보다 뒤에 숨은 패턴과 가능성에 더 관심이 가요. 대화할 때 주제가 세 번은 점프합니다.',
      love:'상대의 현재보다 잠재력에 끌려요. "이 사람이 이렇게 되면..."이라는 상상 속의 상대와 연애를 시작하는 경향이 있어요.',
      work:'기획자, 전략가, 크리에이터. 새로운 아이디어를 내는 데 탁월하지만, 실행까지 가는 인내가 필요해요.',
      burn:'아이디어가 너무 많아서 하나도 완성 못 하는 "시작의 왕, 완성의 빈곤" 패턴에 주의.'},
    88:{short:'극강 직관',
      trait:'머릿속에 항상 평행 우주가 5개쯤 돌아가고 있어요. 현실은 가능성의 한 버전일 뿐이고, 다른 가능성이 끊임없이 떠올라요. 사람들이 "어떻게 그런 생각을?"이라고 말하는 아이디어를 일상적으로 내놓아요.',
      love:'현실의 상대보다 상상 속의 이상화된 상대에게 끌리기 쉬워요. 3개월 후 실제 모습을 보고 실망하는 패턴을 경계하세요.',
      work:'혁신가, 발명가, 비전가. 남들이 보지 못하는 연결고리를 찾아내지만, 현실과의 간극이 클 수 있어요.',
      burn:'현실에 발을 딛지 못하면 "이상은 높은데 실행은 0"인 상태에 빠져요. 신뢰할 수 있는 실행 파트너가 필수.'}
  },
  // T/F축
  T:{
    55:{short:'살짝 사고',
      trait:'논리적이지만 감정도 꽤 고려하는 사람이에요. 결정할 때 "이게 맞아"와 "근데 사람들은 어떻게 느낄까"를 같이 저울질해요.',
      love:'감정 표현이 서투른 건 아닌데, 감정보다 논리로 관계 문제를 풀려는 경향이 살짝 있어요.',
      work:'분석력과 공감력을 동시에 쓸 수 있는 포지션이 최적. 데이터 기반 의사결정을 하되 팀원 감정도 챙기는 리더.',
      burn:'논리와 감정 사이에서 고민하는 시간이 길어질 수 있어요.'},
    68:{short:'확실한 사고',
      trait:'"그건 네 감정이고, 팩트는 이거야"가 자연스러운 사람이에요. 감정에 흔들리기보다 원칙과 논리로 판단하는 게 편해요. 다만 이게 주변에 "차갑다"는 인상을 줄 수 있어요.',
      love:'상대에게 "내 감정을 좀 더 표현해줘"라는 요청을 자주 받아요. 마음은 있는데 표현이 논리적이라 감동이 덜한 거예요.',
      work:'분석, 전략, 시스템 설계가 강점. 감정이 개입하면 안 되는 결정에서 흔들리지 않아요.',
      burn:'감정을 너무 억누르면 어느 순간 비합리적 폭발이 올 수 있어요. 감정을 "처리"가 아닌 "인식"하는 습관을 들이세요.'},
    88:{short:'극강 사고',
      trait:'세상을 논리와 시스템으로 이해하는 사람이에요. 감정적 호소에 거의 흔들리지 않고, "근거는?"이 자동 반응이에요. 비효율을 참지 못하고, 비논리적인 것에 짜증이 납니다.',
      love:'사랑도 분석하려 들어요. "이 관계의 가성비"를 무의식적으로 계산하는 자신을 발견하게 됩니다. 상대에게 "로봇 같다"는 말을 들을 수 있어요.',
      work:'최적의 분석가, 전략가, 아키텍트. 감정이 배제된 순수 논리 영역에서 무적. 하지만 팀 관리에서는 "사람 마음"을 읽는 연습이 필요.',
      burn:'모든 걸 논리로 해결하려다 인간관계에서 마찰이 생겨요. "맞는 말인데 기분 나쁘게 말한다"는 피드백을 새겨들으세요.'}
  },
  F:{
    55:{short:'살짝 감정',
      trait:'감정을 중시하지만 논리도 충분히 쓰는 균형형이에요. 결정할 때 "사람들이 어떻게 느낄까"를 먼저 생각하되, 비합리적인 건 걸러내요.',
      love:'공감 능력이 좋으면서도 감정에 휘둘리지 않는 편. 건강한 관계를 유지하는 데 유리해요.',
      work:'팀의 감정적 분위기를 읽으면서도 논리적 판단을 내릴 수 있는 밸런서.',
      burn:'감정과 논리 사이에서 양다리를 걸치다 결정이 늦어질 수 있어요.'},
    68:{short:'확실한 감정',
      trait:'사람의 감정을 먼저 읽고, 조화를 중시해요. 갈등 상황에서 "이기는 것"보다 "관계를 지키는 것"이 더 중요하고, 누군가 상처받으면 자기 일처럼 아파요.',
      love:'공감 능력이 높아서 상대의 기분을 직감적으로 알아요. 다만 자기 감정을 뒤로 미루다가 쌓이는 패턴에 주의.',
      work:'상담, 교육, HR, 고객 서비스에서 빛나요. 사람을 다루는 일이라면 천직.',
      burn:'남의 감정을 너무 많이 흡수해서 감정적으로 소진돼요. "이건 내 감정이 아니다"라고 구분하는 연습이 필요합니다.'},
    88:{short:'극강 감정',
      trait:'감정의 안테나가 초고감도예요. 방에 들어서면 분위기를 즉시 읽고, 누가 기분이 안 좋은지 본능적으로 알아요. 영화 보면 같이 울고, 뉴스 보면 같이 분노하고. 공감 능력이 축복이자 저주인 사람.',
      love:'상대의 감정에 완전히 동화돼요. 상대가 행복하면 천국, 불행하면 같이 지옥. 감정적 독립이 연애의 최대 과제.',
      work:'예술, 상담, 치유, 교육 분야에서 탁월. 하지만 감정 노동이 많은 직장에서는 번아웃 위험이 매우 높아요.',
      burn:'감정 스펀지 체질이라 에너지 뱀파이어 사람을 반드시 구분하세요. 타인의 감정에 잠식당하지 않도록 "감정 방화벽"이 필수입니다.'}
  },
  // J/P축
  J:{
    55:{short:'살짝 판단',
      trait:'계획을 세우긴 하는데, 즉흥도 가능한 유연한 타입이에요. 여행 갈 때 큰 틀은 짜되 세부 일정은 현장에서 결정.',
      love:'약속 시간은 지키지만, 데이트 코스는 유연하게. 상대가 계획을 바꿔도 크게 스트레스 안 받아요.',
      work:'체계적이면서도 변화에 적응할 수 있는 환경이 최적. 어느 정도의 프레임워크 안에서 자유롭게.',
      burn:'계획과 즉흥 사이에서 어중간할 때 결정 피로가 올 수 있어요.'},
    68:{short:'확실한 판단',
      trait:'계획 없이 움직이는 건 불안해요. 할 일 목록, 일정표, 데드라인 — 이런 게 있어야 마음이 편해요. "일단 해보자"보다 "먼저 계획 세우자"가 자연스러워요.',
      love:'데이트도 미리 계획하고, 기념일도 달력에 표시. 상대가 너무 즉흥적이면 불안해져요.',
      work:'프로젝트 매니저, 관리자 적성. 마감을 지키고, 프로세스를 체계화하는 데 강해요.',
      burn:'예상치 못한 변수가 연속으로 터지면 통제감 상실로 패닉이 올 수 있어요. "완벽한 계획은 없다"를 받아들이는 연습.'},
    88:{short:'극강 판단',
      trait:'모든 것을 통제하고 싶은 사람이에요. 일정은 30분 단위로 짜고, 서랍도 정리되어 있어야 하고, 예상치 못한 상황은 스트레스의 근원. "왜 계획대로 안 되지?"가 일상적 좌절.',
      love:'관계에서도 "이 관계는 어디로 가고 있는 거야?"를 자주 확인하고 싶어해요. 모호한 관계를 가장 힘들어합니다.',
      work:'최고의 조직가이자 완성자. 프로젝트를 시작부터 끝까지 관리하는 능력. 하지만 팀원의 자율성을 존중하는 연습이 필요.',
      burn:'통제할 수 없는 상황(타인의 행동, 불확실한 미래)이 가장 큰 스트레스원. "내가 통제할 수 있는 것"에만 집중하는 연습이 핵심.'}
  },
  P:{
    55:{short:'살짝 인식',
      trait:'유연하긴 한데 어느 정도 계획도 필요한 사람이에요. 완전 즉흥은 불안하고, 큰 방향만 정해두면 편해요.',
      love:'데이트에 유연하지만, 중요한 기념일은 챙기는 타입. 적절한 서프라이즈를 즐겨요.',
      work:'프레임워크 안에서의 자유가 최적. 마감은 있되, 과정은 자유롭게.',
      burn:'너무 체계적인 환경도, 너무 자유로운 환경도 스트레스. 균형점을 찾는 게 중요.'},
    68:{short:'확실한 인식',
      trait:'옵션을 열어두는 게 편해요. 결정을 미루는 게 아니라, "더 좋은 선택지가 있을 수도 있잖아"라는 생각. 여행은 즉흥이 최고, 맛집은 걸어가다 발견하는 게 재미.',
      love:'연애도 자연스러운 흐름을 좋아해요. "우리 사이를 정의해야 해?"보다 "지금 이 순간이 좋으면 된 거지".',
      work:'변화무쌍한 환경에서 빛나요. 스타트업, 프리랜서, 멀티태스킹이 필요한 포지션. 반복 업무는 천적.',
      burn:'마감이 주는 압박을 "마지막 날의 집중력 폭발"로 해결하는 패턴. 이게 반복되면 만성 스트레스가 됩니다.'},
    88:{short:'극강 인식',
      trait:'계획은 나에게 감옥이에요. 5분 후도 어떻게 될지 모르는 게 오히려 신나고, 틀에 박힌 일상은 질식할 것 같아요. 탐험가 기질이 최고조.',
      love:'자유로운 연애를 원해요. 속박하는 관계는 도망가고 싶고, 서로의 자유를 존중하는 파트너가 이상적. 하지만 상대는 "너 진짜 나 좋아하는 거 맞아?"라고 불안해할 수 있어요.',
      work:'정해진 출퇴근, 정해진 업무, 정해진 프로세스 = 지옥. 자유로운 근무 환경, 다양한 프로젝트, 수시로 바뀌는 도전이 있어야 살아요.',
      burn:'자유가 너무 과하면 방향을 잃어요. 아무것도 끝내지 못한 채 이것저것 손대다가 1년이 지나있는 패턴. 최소한의 구조(주간 목표 1개)를 만드세요.'}
  }
};

// ============================================================
// 파라미터 기반 헬퍼 함수 (ST 의존 제거)
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

// 원본 miKey/miAll (UI에서 ST 사용 — TODO: UI 전용으로 이동)
function miKey(axisIdx) {
  // TODO: ST 참조 — UI(index.html)에서만 사용할 것
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

// ============================================================
// streamSonnet — 콜백 기반 AI 스트리밍 (DOM 의존 제거)
// callbacks = { onMessage(text), onProgress(pct), onPercent(pct) }
// ============================================================
async function streamSonnet(apiKey, systemPrompt, userMsg, label, callbacks, endpoint) {
  callbacks = callbacks || {};
  var onMessage = callbacks.onMessage || function(){};
  var onProgress = callbacks.onProgress || function(){};
  var onPercent = callbacks.onPercent || function(){};
  var onSub = callbacks.onSub || function(){};
  var onBlueprint = callbacks.onBlueprint || function(){};
  endpoint = endpoint || '/api/analyze';
  var currentModel = 'claude-sonnet-4-6';
  var overloadRetries = 0;
  var MAX_RETRIES = 2;
  var r;
  while(true) {
    var ctrl = new AbortController();
    var connectTid = setTimeout(function(){ ctrl.abort(); }, 60000);
    onMessage(label + ' 연결 중...');
    r = await fetch(endpoint, {
      signal: ctrl.signal, method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({systemPrompt: systemPrompt, userPrompt: userMsg, model: currentModel})
    });
    clearTimeout(connectTid);
    if(!r.ok) {
      var errBody = await r.text();
      console.error('[MBTS] API failed:', endpoint, 'Status:', r.status, errBody.substring(0, 200));
      if(r.status === 529 || errBody.indexOf('overloaded') >= 0) {
        if(overloadRetries < MAX_RETRIES) {
          overloadRetries++;
          console.log('[MBTS] 서버 과부하 (' + currentModel + '), 30초 후 재시도 (' + overloadRetries + '/' + MAX_RETRIES + ')');
          onMessage('서버가 바쁩니다. 잠시만 기다려주세요... (' + overloadRetries + '/' + MAX_RETRIES + ')');
          onProgress(3);
          await new Promise(function(res){ setTimeout(res, 30000); });
          continue;
        }
        if(currentModel !== 'claude-sonnet-4-6') {
          currentModel = 'claude-sonnet-4-6';
          overloadRetries = 0;
          console.log('[MBTS] Opus 과부하 ' + MAX_RETRIES + '회 실패, Sonnet으로 전환');
          onMessage('서버가 바쁩니다. 대체 모델로 시도합니다...');
          continue;
        }
      }
      throw new Error('HTTP_' + r.status + ': ' + errBody.substring(0, 150));
    }
    break;
  }
  var reader = r.body.getReader();
  var decoder = new TextDecoder();
  var fullText = '', buffer = '', chunkCount = 0;
  var SUB_TITLES = ["나의 성격","나의 장점","고쳐야 할 점","남들이 보는 나","연애 스타일","잘 맞는 타입","연애 지뢰","직장 적성","맞춤 재물 쌓는 법","올해 키워드","올해 조언","대운 흐름","기회의 시기","인생 한줄 마무리"];
  var _detectedSubs = 0;
  var _categoriesStarted = false;
  var streamStart = Date.now();
  while(true) {
    if(Date.now() - streamStart > 300000) break;
    var chunk = await reader.read();
    if(chunk.done) break;
    buffer += decoder.decode(chunk.value, {stream: true});
    var lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for(var li = 0; li < lines.length; li++) {
      var line = lines[li].trim();
      if(!line.startsWith('data: ')) continue;
      var jsonStr = line.substring(6);
      if(jsonStr === '[DONE]') continue;
      try {
        var evt = JSON.parse(jsonStr);
        if(evt.type === 'content_block_delta' && evt.delta && evt.delta.text) {
          fullText += evt.delta.text;
          chunkCount++;
          // ── categories 영역 시작 감지 ──
          if(chunkCount === 1 || chunkCount === 50 || chunkCount === 100 || chunkCount === 200) console.log('[STREAM-DBG] chunk#'+chunkCount+' fullText:'+fullText.length+'자 catStarted:'+_categoriesStarted+' subs:'+_detectedSubs);
          if(!_categoriesStarted && fullText.indexOf('"categories"') >= 0) {
            _categoriesStarted = true;
            onBlueprint();
            console.log('[STREAM] categories 시작 감지 — blueprint 완료');
          }
          // ── 다음 sub 제목 감지 → 이전 sub 완성 ──
          if(_categoriesStarted && _detectedSubs < SUB_TITLES.length) {
            if(_detectedSubs === 0 && fullText.indexOf('"h"') >= 0) {
              var sample = fullText.substring(fullText.indexOf('"h"'), fullText.indexOf('"h"') + 30);
              console.log('[STREAM-DBG] h필드 샘플:', JSON.stringify(sample));
            }
            var nextIdx = _detectedSubs + 1;
            if(nextIdx < SUB_TITLES.length) {
              var _nns = '"h":"' + SUB_TITLES[nextIdx] + '"';
              var _nws = '"h": "' + SUB_TITLES[nextIdx] + '"';
              var nextMarker = fullText.indexOf(_nns) >= 0 ? _nns : (fullText.indexOf(_nws) >= 0 ? _nws : null);
              if(nextMarker && _detectedSubs < nextIdx) {
                var prevTitle = SUB_TITLES[_detectedSubs];
                var _pns = '"h":"' + prevTitle + '"';
                var _pws = '"h": "' + prevTitle + '"';
                var prevMarker = fullText.indexOf(_pns) >= 0 ? _pns : (fullText.indexOf(_pws) >= 0 ? _pws : _pns);
                var prevStart = fullText.lastIndexOf('{', fullText.indexOf(prevMarker));
                var nextStart = fullText.lastIndexOf('{', fullText.indexOf(nextMarker));
                if(prevStart >= 0 && nextStart > prevStart) {
                  var subText = fullText.substring(prevStart, nextStart).replace(/,\s*$/, '');
                  try {
                    var subObj = JSON.parse(subText);
                    console.log('[STREAM] sub 완성 #' + (_detectedSubs + 1) + ': ' + subObj.h);
                    onSub(subObj, _detectedSubs);
                  } catch(e) {
                    // 카테고리 경계 파싱 실패 → 첫 번째 완전한 JSON 객체만 추출
                    var _brace = 0, _inStr = false, _esc = false, _end = -1;
                    for(var _si = 0; _si < subText.length; _si++) {
                      var _ch = subText[_si];
                      if(_esc) { _esc = false; continue; }
                      if(_ch === '\\') { _esc = true; continue; }
                      if(_ch === '"') { _inStr = !_inStr; continue; }
                      if(_inStr) continue;
                      if(_ch === '{') _brace++;
                      if(_ch === '}') { _brace--; if(_brace === 0) { _end = _si; break; } }
                    }
                    if(_end > 0) {
                      try {
                        var subObj2 = JSON.parse(subText.substring(0, _end + 1));
                        console.log('[STREAM] sub 완성(경계보정) #' + (_detectedSubs + 1) + ': ' + subObj2.h);
                        onSub(subObj2, _detectedSubs);
                      } catch(e2) {
                        console.log('[STREAM] sub 파싱 실패 #' + (_detectedSubs + 1) + ': ' + prevTitle);
                      }
                    } else {
                      console.log('[STREAM] sub 파싱 실패 #' + (_detectedSubs + 1) + ': ' + prevTitle);
                    }
                  }
                }
                _detectedSubs = nextIdx;
              }
            }
          }
          var pct = Math.min(94, 5 + Math.round((fullText.length / 8000) * 90));
          onProgress(pct);
          onPercent(pct);
          if(chunkCount % 15 === 0) onMessage(label + ' ' + fullText.length + '자 ✍️');
        }
        if(evt.type === 'error') throw new Error('STREAM_ERROR: ' + (evt.error && evt.error.message || ''));
      } catch(pe) { if(pe.message && pe.message.indexOf('STREAM_ERROR') >= 0) throw pe; }
    }
  }
  console.log('[MBTS] ' + label + ' 완료: ' + fullText.length + '자');
  var cleaned = fullText.replace(/```json|```/g, "").trim();
  try { JSON.parse(cleaned); return cleaned; } catch(e1) {}
  var firstBrace = cleaned.indexOf('{');
  var lastBrace = cleaned.lastIndexOf('}');
  if(firstBrace >= 0 && lastBrace > firstBrace) {
    var extracted = cleaned.substring(firstBrace, lastBrace + 1);
    try { JSON.parse(extracted); return extracted; } catch(e2) {}
  }
  var lines2 = cleaned.split('\n');
  var startIdx = -1, endIdx = -1;
  for(var i = 0; i < lines2.length; i++) {
    if(startIdx < 0 && lines2[i].trim().charAt(0) === '{') startIdx = i;
    if(lines2[i].trim().charAt(0) === '}' || lines2[i].trim().slice(-1) === '}') endIdx = i;
  }
  if(startIdx >= 0 && endIdx >= startIdx) {
    var jsonBlock = lines2.slice(startIdx, endIdx + 1).join('\n');
    try { JSON.parse(jsonBlock); return jsonBlock; } catch(e3) {}
  }
  // JSON 미닫힘 자동 보정
  if (cleaned.trim().length > 100 && cleaned.trim().slice(-1) !== '}') {
    console.log('[STREAM] JSON 미닫힘 감지 — 자동 보정');
    var openB = (cleaned.match(/{/g)||[]).length;
    var closeB = (cleaned.match(/}/g)||[]).length;
    var openA = (cleaned.match(/\[/g)||[]).length;
    var closeA = (cleaned.match(/\]/g)||[]).length;
    while (closeA < openA) { cleaned += ']'; closeA++; }
    while (closeB < openB) { cleaned += '}'; closeB++; }
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    try { JSON.parse(cleaned); return cleaned; } catch(e4) {}
  }
  console.warn('[MBTS] JSON 추출 실패, 원본 반환:', cleaned.substring(0, 100));
  return cleaned;
}

// --- runSajuAnalysis (startAnalysis 변환: ST→params, DOM→callbacks) ---
async function runSajuAnalysis(params, callbacks){
  var apiKey = params.apiKey;
  if(!apiKey){ if(callbacks.onError) callbacks.onError("API_KEY_MISSING"); return; }
  var mt=getMBTIFromChoices(params.mbtiChoices),saju=calcSajuForApp(+params.y,+params.m,+params.d,params.h?+params.h:null,params.min?+params.min:null,params.cityLng);
  var ti=TY[mt]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};
  var gg=analyzeGyeokguk(saju);
  var age=2026-(+params.y||1990);
  var msgs=["사주팔자를 펼칩니다...","천간지지 관계를 읽습니다...","십성과 격국을 분석합니다...","오행 균형을 살핍니다...","인지기능×사주 교차 탐색...","카테고리별 풀이 구성 중...","캐치프레이즈를 만듭니다...","당신만의 이야기를 쓰고 있습니다..."];
  var p=0,iv=setInterval(function(){p+=Math.random()*1.5+.4;if(p>95)p=95;if(callbacks.onProgress)callbacks.onProgress(p);if(callbacks.onPercent)callbacks.onPercent(Math.round(p));if(callbacks.onMessage)callbacks.onMessage(msgs[Math.min(Math.floor(p/12),7)]);},900);

  var strArr=params.mbtiChoices.map(function(c,i){return strLv(params.mbtiIntensities[i])+' '+(c==='L'?DM_AX[i].Ll:DM_AX[i].Rl);});
  var salTxt=saju.specialSals.map(function(s){return s.name+'('+s.desc+')';}).join(', ');
  var jjgTxt=saju.jjg.map(function(jj,i){return saju.P[i].l+': '+jj.map(function(j){return j.stem+'('+j.oh+')';}).join(' ');}).join(' | ');
  var ilju=saju.P[2].s+saju.P[2].b+'('+TGAN[saju.raw.dg]+JIJI[saju.raw.dj]+')';

  // 대운 계산
  var dw=calcDaewoon(saju,+params.y,+params.m,+params.d,params.h?+params.h:null,params.min?+params.min:null,params.gender);
  // 궁합용 데이터 (로컬 변수로 구성)
  var mbtiObj={type:mt, cf:ti.cf,
    axes:[{side:params.mbtiChoices[0]==='L'?'E':'I',pct:params.mbtiIntensities[0]||60},{side:params.mbtiChoices[1]==='L'?'S':'N',pct:params.mbtiIntensities[1]||60},
          {side:params.mbtiChoices[2]==='L'?'T':'F',pct:params.mbtiIntensities[2]||60},{side:params.mbtiChoices[3]==='L'?'J':'P',pct:params.mbtiIntensities[3]||60}],
    profile:strArr.join(', ')};

  // ★ 수정5: 대운 전반(천간5년)/후반(지지5년) 분리
  var dwTxt=dw.daewoons.map(function(d,i){
    var prefix=(dw.currentDWIdx===i?'\u2605현재 ':'  ');
    var jiSS_dw_JJG=JIJANGGAN_DATA[JIJI_KR.indexOf(d.ji)];
    var jiSS_dw=jiSS_dw_JJG?getSipsung(saju.raw.dg,jiSS_dw_JJG[jiSS_dw_JJG.length-1].g):'';
    // 지지의 정기 기준 십성 (더 정확)
    var jiJJG=JIJANGGAN_DATA[JIJI_KR.indexOf(d.ji)];
    var jiJeonggiSS=jiJJG?getSipsung(saju.raw.dg,jiJJG[jiJJG.length-1].g):'';
    return prefix+d.startAge+'~'+d.endAge+'세 '+d.gan+d.ji+'('+d.ganH+d.jiH+') — 전반('+d.startAge+'~'+(d.startAge+4)+'세): '+d.gan+'='+d.ss+'운 / 후반('+(d.startAge+5)+'~'+d.endAge+'세): '+d.ji+'='+(jiJeonggiSS||jiSS_dw)+'운';
  }).join('\n');
  var currentDW=dw.currentDWIdx>=0?dw.daewoons[dw.currentDWIdx]:null;
  var seTxt=dw.seun.map(function(s){return s.y+'년 '+s.gan+s.ji+'('+s.ganH+s.jiH+') '+s.ss;}).join(', ');

  // ★ 삼재(三災) 계산
  var samjaeGroups = [
    {group:[8,0,4], disaster:[2,3,4]},   // 신자진띠 → 인묘진년이 삼재
    {group:[2,6,10], disaster:[5,6,7]},   // 인오술띠 → 사오미년이 삼재  
    {group:[5,9,1], disaster:[11,0,1]},   // 사유축띠 → 해자축년이 삼재
    {group:[11,3,7], disaster:[8,9,10]}   // 해묘미띠 → 신유술년이 삼재
  ];
  var birthJi = saju.raw.yj; // 태어난 해의 지지(띠)
  var currentYear = new Date().getFullYear();
  // 올해의 지지 구하기
  var currentYearJi = ((currentYear + 8) % 12);
  var samjaeTxt = '';
  var samjaeStatus = '';
  for (var si = 0; si < samjaeGroups.length; si++) {
    var sg = samjaeGroups[si];
    if (sg.group.indexOf(birthJi) >= 0) {
      var disasterJis = sg.disaster;
      // 올해, 내년, 내후년 체크
      for (var syr = 0; syr < 3; syr++) {
        var checkYearJi = ((currentYear + syr + 8) % 12);
        var disIdx = disasterJis.indexOf(checkYearJi);
        if (disIdx >= 0) {
          var samjaeNames = ['들삼재(시작)','눌삼재(절정)','날삼재(마무리)'];
          if (syr === 0) { // 올해가 삼재
            samjaeStatus = samjaeNames[disIdx];
            samjaeTxt = currentYear + '년 ' + samjaeStatus + ' — ' + JIJI_KR[disasterJis[0]]+JIJI_KR[disasterJis[1]]+JIJI_KR[disasterJis[2]]+'년 삼재 구간';
          } else if (syr === 1 && !samjaeTxt) { // 내년이 삼재 시작
            samjaeTxt = (currentYear+1) + '년부터 삼재 시작 예정 ('+JIJI_KR[disasterJis[0]]+JIJI_KR[disasterJis[1]]+JIJI_KR[disasterJis[2]]+'년)';
          }
        }
      }
      // 올해가 삼재가 아니면 다음 삼재 시기 계산
      if (!samjaeTxt) {
        var nextSamjaeStart = disasterJis[0];
        var yearsUntil = ((nextSamjaeStart - currentYearJi) + 12) % 12;
        if (yearsUntil === 0) yearsUntil = 12;
        samjaeTxt = '현재 삼재 아님. 다음 삼재: ' + (currentYear + yearsUntil) + '년 시작';
      }
      break;
    }
  }

  // ★ 월운(月運) 계산 — 올해 12개월 운세
  var wolunArr = [];
  var wolunYear = currentYear;
  // 올해의 연간 인덱스 구하기
  var wolunYearGan = ((wolunYear + 6) % 10);
  // 월간 시작 공식: (연간%5)*2+2 → 1월(인월)의 천간
  var monthStartStem = ((wolunYearGan % 5) * 2 + 2) % 10;
  var monthNames = ['1월(인월)','2월(묘월)','3월(진월)','4월(사월)','5월(오월)','6월(미월)','7월(신월)','8월(유월)','9월(술월)','10월(해월)','11월(자월)','12월(축월)'];
  var monthBranches = [2,3,4,5,6,7,8,9,10,11,0,1]; // 인~축
  var dg = saju.raw.dg; // 일간 인덱스
  for (var wi = 0; wi < 12; wi++) {
    var wGan = (monthStartStem + wi) % 10;
    var wJi = monthBranches[wi];
    var wGanSS = getSipsung(dg, wGan);
    var wJiJJG = JIJANGGAN_DATA[wJi];
    var wJiJeonggi = wJiJJG[wJiJJG.length - 1].g;
    var wJiSS = getSipsung(dg, wJiJeonggi);
    // 십성 그룹 분류
    var ssGroup = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상','편재':'재성','정재':'재성','편관':'관성','정관':'관성','편인':'인성','정인':'인성'};
    var wGroup = ssGroup[wGanSS] || wGanSS;
    // 월운 간단 해석
    var wolunHint = {
      '비겁':'자기에너지강화, 독립·경쟁의달, 주변과힘겨루기',
      '식상':'표현·창작의달, 말과글이잘풀림, 새아이디어',
      '재성':'재물·실리의달, 수입기회, 현실적성과',
      '관성':'책임·압박의달, 직장변화, 자기관리필요',
      '인성':'학습·휴식의달, 귀인등장, 내면성장'
    };
    wolunArr.push({
      month: monthNames[wi],
      gan: TGAN_KR[wGan], ji: JIJI_KR[wJi],
      ganSS: wGanSS, jiSS: wJiSS,
      group: wGroup,
      hint: wolunHint[wGroup] || ''
    });
  }
  // ★ 수정6: 월운에 원국 합충 분석 추가
  var WOLUN_CHUNG=[[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  var WOLUN_YUKHAP=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  var wonJiArr=[{v:saju.raw.yj,l:'년지'},{v:saju.raw.mj,l:'월지'},{v:saju.raw.dj,l:'일지'}];
  if(saju.raw.hj!=null)wonJiArr.push({v:saju.raw.hj,l:'시지'});
  var wGungwi={'년지':'외부환경','월지':'직업','일지':'배우자·건강','시지':'자녀'};
  var wolunTxt = wolunArr.map(function(w){
    var wJiIdx=JIJI_KR.indexOf(w.ji);
    var rels=[];
    wonJiArr.forEach(function(wj){
      WOLUN_CHUNG.forEach(function(cp){if((wJiIdx===cp[0]&&wj.v===cp[1])||(wJiIdx===cp[1]&&wj.v===cp[0]))rels.push(w.ji+wj.l.charAt(0)+JIJI_KR[wj.v]+'충('+wGungwi[wj.l]+')');});
      WOLUN_YUKHAP.forEach(function(yh){if((wJiIdx===yh[0]&&wj.v===yh[1])||(wJiIdx===yh[1]&&wj.v===yh[0]))rels.push(w.ji+JIJI_KR[wj.v]+'합('+wGungwi[wj.l]+')');});
    });
    var relStr=rels.length>0?' | '+rels.join(', '):'';
    return w.month + ' ' + w.gan + w.ji + '(' + w.ganSS + '/' + w.jiSS + ') → ' + w.group + '운' + relStr;
  }).join('\n');

  // [방법2] 합충형 데이터
  var rel=calcRelations(saju);
  var chungTxt=rel.jijiChung.map(function(c){return c.desc;}).join(', ')||'없음';
  var hapTxt=rel.cheonganHap.map(function(h){return h.desc;}).concat(rel.jijiHap.map(function(h){return h.desc;})).join(', ')||'없음';
  var samhapTxt=rel.jijiSamhap.map(function(h){return h.desc;}).join(', ')||'없음';
  var hyungTxt=rel.jijiHyung.map(function(h){return h.desc;}).join(', ')||'없음';
  var cheonganChungTxt=rel.cheonganChung.map(function(c){return c.desc;}).join(', ')||'없음';
  var jijiHaeTxt=rel.jijiHae.map(function(h){return h.desc;}).join(', ')||'없음';

  // [방법6] 일주론 키워드
  var iljuKey2=saju.P[2].s+saju.P[2].b;
  var iljuD=ILJU_DATA[iljuKey2]||{k:'독특한 기질',t:'',love:'',job:''};

  // [방법7] MBTI 인지기능 스택
  var cfArr=ti.cf.split('-');
  var cfN={Fi:'내면의 심판관(Fi)',Fe:'분위기 리더기(Fe)',Ne:'가능성 탐색기(Ne)',Ni:'미래 내비게이션(Ni)',Si:'추억 저장소(Si)',Se:'현장 체험러(Se)',Ti:'내장 논리회로(Ti)',Te:'실행력 엔진(Te)'};
  var strongCF=cfN[cfArr[0]]||cfArr[0];
  var weakCF=cfN[cfArr[3]]||cfArr[3];
  // [방법9,10] 대운 전환기 + 과거 대운
  var nextDI=dw.currentDWIdx>=0?dw.currentDWIdx+1:-1;
  var nextDW=nextDI>=0&&nextDI<dw.daewoons.length?dw.daewoons[nextDI]:null;
  var transitionTxt='';
  if(nextDW){var transAge=nextDW.startAge;var transYr=(+params.y)+transAge-1;transitionTxt='\n다음 대운 전환: '+transAge+'세('+transYr+'년경) '+nextDW.gan+nextDW.ji+' '+nextDW.ss+'운으로 전환';}
  var pastDWTxt='';
  if(dw.currentDWIdx>=1){pastDWTxt='\n과거 대운: ';for(var pi=0;pi<dw.currentDWIdx;pi++){var pd=dw.daewoons[pi];pastDWTxt+=pd.startAge+'~'+pd.endAge+'세 '+pd.gan+pd.ji+'('+pd.ss+'), ';}pastDWTxt=pastDWTxt.replace(/, $/,'');}
  // 공망 계산
  var gm=calcGongmang(saju);
  var gmTxt=gm.desc||'없음';

  // 지장간 힘 비율
  var jjgRatio=calcJijangganRatio(saju);
  var jjgRatioTxt=jjgRatio.filter(function(r){return r;}).map(function(r){
    return r.pillar+' '+r.ji+'('+r.items.map(function(it){return it.role+'='+it.gan+it.oh+' '+it.ss+' '+it.pct+'%';}).join(', ')+')';
  }).join(' | ');

  // 신살 풍부화
  var salEnriched=enrichSinsal(saju);

  // 동적 키워드 생성
  var dynKW = generateDynamicKeywords(saju, gg, dw, gm, jjgRatio);
  var dynKWText = formatKeywordsForAI(dynKW);

  // 신살 간결화 (이름+위치만)
  var salSimple = '';
  if (saju.specialSals && saju.specialSals.length > 0) {
    salSimple = saju.specialSals.map(function(s){ return s.name+'('+s.desc+')'; }).join(', ');
  }
  var extraSals = calcExtraSinsal(saju);
  if (extraSals.length > 0) {
    var existNames = salSimple.split(', ').map(function(s){return s.split('(')[0];});
    extraSals.forEach(function(es){
      if (existNames.indexOf(es.name) < 0) {
        salSimple += (salSimple ? ', ' : '') + es.name+'('+es.desc+')';
      }
    });
  }

  // 조후/용신 텍스트
  var johuTxt = '';
  if(gg.johuDesc) johuTxt = '\n- 조후: '+gg.seasonName+' · '+gg.johuDesc;
  else if(gg.seasonName) johuTxt = '\n- 계절: '+gg.seasonName+(gg.deukryeong?' · 일간이 월지에서 힘을 얻음(득령)':' · 일간이 월지에서 힘을 잃음(실령)');

  // ★ v28: 대운/세운 vs 원국 합충 분석
  var dwSeAnalysis = analyzeDWSEvsWonkuk(saju, dw);
  var dwWonTxt = '';
  if(dwSeAnalysis.daewoon.length > 0){
    dwWonTxt = '\n\n## ★ 현재 대운 vs 원국 관계 (핵심!)\n';
    dwSeAnalysis.daewoon.forEach(function(d){
      dwWonTxt += '- '+d.type+': '+d.desc+' (영향: '+d.impact+')\n';
    });
  }
  var seWonTxt = '';
  if(dwSeAnalysis.seun1.length > 0){
    seWonTxt = '\n## ★ '+dw.seun[0].y+'년 세운 vs 원국 관계 (올해 핵심!)\n';
    dwSeAnalysis.seun1.forEach(function(d){
      seWonTxt += '- '+d.type+': '+d.desc+' (영향: '+(d.impact||'전반적')+')\n';
    });
  }
  if(dwSeAnalysis.seun2.length > 0){
    seWonTxt += '\n## '+dw.seun[1].y+'년 세운 vs 원국 관계 (내년)\n';
    dwSeAnalysis.seun2.forEach(function(d){
      seWonTxt += '- '+d.type+': '+d.desc+' (영향: '+(d.impact||'전반적')+')\n';
    });
  }
  if(dwSeAnalysis.dwSeConflict.length > 0){
    seWonTxt += '\n⚠️ '+dwSeAnalysis.dwSeConflict.join(', ')+'\n';
  }

  // ★ v28: 합충 우선순위 분석
  var hapChungResolved = resolveHapChungPriority(rel);
  var hapChungTxt = '';
  if(hapChungResolved.summary){
    hapChungTxt = '\n- ★합충우선순위: '+hapChungResolved.summary;
  }

  // ★ v28: 파격 정보
  var pagyeokTxt = '';
  if(gg.pagyeokInfo){
    pagyeokTxt = '\n- ⚠️ 파격: '+gg.pagyeokInfo;
  }

  // ★ v28: 진태양시 정보
  var trueSolarTxt = '';
  if(saju.trueSolarApplied){
    trueSolarTxt = ' (진태양시 보정: '+(saju.trueSolarMin>0?'+':'')+saju.trueSolarMin+'분, 출생지: '+params.city+')';
  }

  // ★★★ Level A: 해석 맥락 데이터 생성 ★★★
  var gungwiCtx = buildGungwiContext(saju, gg);
  var sinsalStory = buildSinsalStory(saju);
  var yearHL = buildYearHighlight(dwSeAnalysis, dw, wolunArr, wonJiArr);

  // 납음 스토리
  var napeumStory = '';
  if (gg.napeumText) {
    var napeumName = gg.napeumText.split('(')[0].trim();
    if (NAPEUM_STORY[napeumName]) {
      napeumStory = '\n★납음 스토리: ' + gg.napeumText + ' → ' + NAPEUM_STORY[napeumName];
    }
  }

  // 월간↔일간 관계 (페르소나)
  var personaTxt = '';
  var monthGanSS = saju.ss[1] ? saju.ss[1].ss : '';
  if (monthGanSS && SS_CONTEXT[monthGanSS]) {
    personaTxt = '\n★사회적 페르소나(월간↔일간): 월간=' + saju.ss[1].stem +
      '(' + monthGanSS + ') → 세상에 보여주는 모습: ' + SS_CONTEXT[monthGanSS].general;
    if (monthGanSS === saju.ss[2].ss) {
      personaTxt += '\n  ⚡ 월간=일간 동일! 가면을 안 쓰는 사람. 겉과 속이 같음. 진정성이 강점이자 약점.';
    }
  }

  // ★★★ Level A: 해석 맥락 섹션 조립 ★★★
  var contextSection = '\n\n## ★★ AI를 위한 해석 맥락 (이것을 참고하여 풀이하세요) ★★\n';

  if (gungwiCtx.spouse) contextSection += gungwiCtx.spouse + '\n';
  if (gungwiCtx.career) contextSection += gungwiCtx.career + '\n';
  if (gungwiCtx.child) contextSection += gungwiCtx.child + '\n';
  if (gungwiCtx.outer) contextSection += gungwiCtx.outer + '\n';
  if (personaTxt) contextSection += personaTxt + '\n';
  if (napeumStory) contextSection += napeumStory + '\n';

  contextSection += '\n### 신살 스토리 (각 카테고리의 킬링 포인트로 활용)\n';
  contextSection += sinsalStory || '특별한 신살 없음';

  contextSection += '\n\n### 올해 핵심 사건\n';
  contextSection += yearHL.main;
  if (yearHL.hotMonths) contextSection += '\n핵심 달:\n' + yearHL.hotMonths;

  var usr='## 의뢰인\n- 생년월일시: '+params.y+'년 '+params.m+'월 '+params.d+'일 '+(params.h?params.h+'시':'시간미상')+trueSolarTxt+'\n- 성별: '+params.gender+' · 한국나이 '+dw.currentAge+'세\n- MBTI: '+mt+' ('+ti.n+')'+(params.h?'':'\n\n⚠️ 시간 미상 사주입니다. 시주(時柱) 기반 해석(자녀운, 말년운, 시지 궁위, 시지 합충)은 절대 하지 마세요. 년·월·일주만으로 풀이하세요. 항목 수는 10~12개로 조정하세요.')+'\n- 인지기능 스택: '+ti.cf+' (가장 강한: '+strongCF+' / 가장 약한: '+weakCF+')\n- 각 축: '+strArr.join(', ')+'\n\n## MBTI 강도별 행동 프로파일 (풀이에 반드시 반영할 것!)\n'+(function(){var m=miAllParam(params.mbtiChoices, params.mbtiIntensities);var axes=['E/I','S/N','T/F','J/P'];var labels=[strArr[0],strArr[1],strArr[2],strArr[3]];return axes.map(function(a,i){return '- '+labels[i]+': '+m[i].trait+'\n  연애: '+m[i].love+'\n  직업: '+m[i].work+'\n  번아웃: '+m[i].burn;}).join('\n');})()+'\n\n## 사주 원국 (절기: '+saju.currentJeolgi+')\n- 사주: '+saju.P.map(function(p){return p.l+' '+p.s+p.b;}).join(' | ')+'\n- 일주: '+ilju+' · 일간: '+saju.dm+'('+saju.dmEl+')\n- 천간십성: '+saju.ss.map(function(s){return s.pillar+' '+s.stem+'('+s.ss+')';}).join(', ')+'\n- ★궁위십성(지지정기 기준): '+saju.jiSS.map(function(j){return j.pillar+' '+j.branch+'='+j.ss+'('+j.gungwi+')';}).join(' | ')+'\n- 오행(표면 8자): 목='+saju.el['목']+' 화='+saju.el['화']+' 토='+saju.el['토']+' 금='+saju.el['금']+' 수='+saju.el['수']+'\n- ★오행(지장간포함): 목='+saju.elFull['목']+' 화='+saju.elFull['화']+' 토='+saju.elFull['토']+' 금='+saju.elFull['금']+' 수='+saju.elFull['수']+(saju.hiddenOh.length>0?'\n  → 표면상 없지만 지장간에 숨어있는 오행: '+saju.hiddenOh.join(',')+' (겉으로 안 보이지만 속에 잠재력으로 존재)':'')+'\n- 12운성: '+saju.P.map(function(p,i){return p.l+'='+saju.uns[i];}).join(', ')+'\n- 합: '+hapTxt+' | 삼합: '+samhapTxt+'\n- 충: '+chungTxt+' | 천간충: '+cheonganChungTxt+'\n- 형: '+hyungTxt+' | 해: '+jijiHaeTxt+hapChungTxt+'\n'+(saju.amhap.length>0?'- ★암합(숨겨진 합): '+saju.amhap.map(function(a){return a.from+'↔'+a.to+'=합화'+a.hapOh+' ['+a.gungwi+'궁 숨겨진 인연]';}).join(', ')+'\n':'')+'\n※ 합과 충이 동시에 존재할 때: 인접한 합이 충을 해소하는지(탐합망충), 충이 합을 깨뜨리는지 판단하여 유기적으로 해석할 것\n\n## 격국 분석\n- ★격국: '+gg.gyeokgukName+' ('+gg.gyeokgukBasis+')\n  → '+gg.gyeokgukDesc+'\n'+(gg.isJonggyeok?'  ⚠️ 종격(從格) 사주! 용신 방향이 일반 사주와 정반대입니다. 강한 쪽을 따라가야 합니다.\n':'')+(gg.isHwakyeok?'  ⚠️ 화격(化格) 사주! 일간이 본래 오행을 버리고 합화 오행으로 변함.\n':'')+pagyeokTxt+'\n- ★납음: '+(gg.napeumText||'정보없음')+'\n- 십성비중: 비겁='+gg.cnt['비겁'].toFixed(1)+' 식상='+gg.cnt['식상'].toFixed(1)+' 재성='+gg.cnt['재성'].toFixed(1)+' 관성='+gg.cnt['관성'].toFixed(1)+' 인성='+gg.cnt['인성'].toFixed(1)+'\n- ★일간 강도: '+gg.strengthGrade+' '+gg.strengthScore+'점 (자기편='+gg.selfStr.toFixed(1)+' vs 상대편='+gg.otherStr.toFixed(1)+')'+(gg.deukryeong?' [득령]':' [실령]')+johuTxt+'\n- 강한: '+gg.dominant[0]+'('+gg.dominant[1].toFixed(1)+') 약한: '+gg.weak[0]+'('+gg.weak[1].toFixed(1)+')\n- 부족오행: '+(saju.lackFull.length>0?saju.lackFull.join(','):'없음')+'\n- 용신: '+gg.yongshin+' ['+gg.yongshinType+'용신]'+(gg.johuYongshin&&gg.yongshinType!=='조후'?' · 조후참고: '+gg.johuYongshin:'')+'\n- ★오행흐름: '+gg.flowSummary+'\n\n## 참고 힌트 (AI 자율 판단 우선, 반드시 사용할 필요 없음)\n'+dynKWText+'\n\n## 대운 흐름 ('+dw.direction+', '+dw.daewoonAge+'세 시작)\n'+dwTxt+'\n현재 대운: '+(currentDW?currentDW.gan+currentDW.ji+'('+currentDW.ganH+currentDW.jiH+') '+currentDW.ss+'운 ('+currentDW.startAge+'~'+currentDW.endAge+'세)':'대운 전')+pastDWTxt+transitionTxt+'\n세운: '+seTxt+'\n- ★삼재: '+(samjaeTxt||'계산불가')+dwWonTxt+seWonTxt+'\n\n## '+wolunYear+'년 월운 (월별 운세)\n'+wolunTxt+'\n\n## 신살 (참고)\n'+(salSimple||'없음')+'\n- 공망: '+gmTxt+contextSection+'\n\nJSON으로 출력하세요.';
  /* ====== 1-Pass AI System (v29 복귀) ====== */
  var result;
  var apiError = null;

  // 스트리밍 함수
  // streamSonnet은 전역 함수로 이동됨 (아래 참고)

  try{
    // apiKey already from params
    console.log('[MBTS] === 1-Pass 분석 시작 ===');

    // ── 프로그레시브 렌더링 연결 ──
    var _progSubQueue = [];
    var _collectedSubs = [];
    var _progInitDone = false;
    var _progCallbacks = {
      onMessage: callbacks.onMessage || function(){},
      onProgress: callbacks.onProgress || function(){},
      onPercent: callbacks.onPercent || function(){},
      onBlueprint: function() {
        console.log('[PROG] blueprint 완료 감지');
      },
      onSub: function(subObj, idx) {
        console.log('[PROG] sub 감지 #' + (idx+1) + ': ' + (subObj?subObj.h:'?'));
        _progSubQueue.push({ sub: subObj, idx: idx });
        _collectedSubs.push(subObj);

        // 3개 모이면 페이지 초기화 + 첫 3개 표시
        if(_progSubQueue.length === 3 && !_progInitDone) {
          _progInitDone = true;
          clearInterval(iv); // 로딩 인터벌 정리
          if(callbacks.onProgress) callbacks.onProgress(100);
          if(callbacks.onPercent) callbacks.onPercent(100);
          if(typeof initProgressivePage === 'function') {
            initProgressivePage(saju, mt, gg, params);
            // 첫 3개 시차 등장
            setTimeout(function(){ appendSubCard(_progSubQueue[0].sub, 0); }, 200);
            setTimeout(function(){ appendSubCard(_progSubQueue[1].sub, 1); }, 450);
            setTimeout(function(){ appendSubCard(_progSubQueue[2].sub, 2); }, 700);
          }
        }

        // 4개째부터는 바로 추가
        if(_progInitDone && _progSubQueue.length > 3) {
          appendSubCard(subObj, idx);
        }
      }
    };

    var aiText = await streamSonnet(apiKey, PREMIUM_SYSTEM, usr, "✨ AI 분석 중", _progCallbacks);

    try {
      result = JSON.parse(aiText);
    } catch(e) {
      console.warn('[MBTS] 1차 JSON 파싱 실패, 추출 시도...');
      // 2차: { ~ } 추출
      var fb = aiText.indexOf('{'), lb = aiText.lastIndexOf('}');
      if (fb >= 0 && lb > fb) {
        try { result = JSON.parse(aiText.substring(fb, lb + 1)); } catch(e2) {}
      }
      // 3차: 줄 단위 추출
      if (!result) {
        var lines = aiText.split('\n');
        var si = -1, ei = -1;
        for (var li = 0; li < lines.length; li++) {
          if (si < 0 && lines[li].trim().charAt(0) === '{') si = li;
          if (lines[li].trim().charAt(0) === '}' || lines[li].trim().slice(-1) === '}') ei = li;
        }
        if (si >= 0 && ei >= si) {
          try { result = JSON.parse(lines.slice(si, ei + 1).join('\n')); } catch(e3) {}
        }
      }
      // 4차: 제어문자 제거 후 재시도
      if (!result) {
        var sanitized = aiText.substring(fb >= 0 ? fb : 0, (lb > 0 ? lb + 1 : aiText.length));
        sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, function(c) { return c === '\n' || c === '\r' || c === '\t' ? c : ''; });
        try { result = JSON.parse(sanitized); } catch(e4) {}
      }
      // 5차: 잘린 JSON 괄호 복구
      if (!result) {
        var rawText = aiText.substring(fb >= 0 ? fb : 0);
        var repaired = rawText;
        var openBraces = (repaired.match(/{/g) || []).length;
        var closeBraces = (repaired.match(/}/g) || []).length;
        var openBrackets = (repaired.match(/\[/g) || []).length;
        var closeBrackets = (repaired.match(/\]/g) || []).length;
        while (closeBrackets < openBrackets) { repaired += ']'; closeBrackets++; }
        while (closeBraces < openBraces) { repaired += '}'; closeBraces++; }
        repaired = repaired.replace(/,\s*([}\]])/g, '$1');
        try { result = JSON.parse(repaired); console.log('[MBTS] 5차 괄호 복구 성공'); } catch(e5) {}
      }
      // 2~5차 성공 시 에러 초기화
      if (result) {
        apiError = '';
        console.log('[MBTS] JSON 추출 성공 (폴백 파서)');
      } else if (_collectedSubs.length >= 3) {
        // 프로그레시브 수집분으로 부분 저장
        result = { _blueprint: {landscape:'', oneLine:''}, categories: _collectedSubs };
        apiError = '';
        console.log('[MBTS] JSON 파싱 실패 — 프로그레시브 수집분으로 부분 저장 (' + _collectedSubs.length + '개 sub)');
      } else {
        apiError = 'JSON_PARSE';
        result = mkFB(saju, mt, gg);
      }
    }
    if(result) console.log('[MBTS] 분석 완료. 항목 수:', (result.categories||[]).reduce(function(s,c){return s+(c.subs||c.items||[]).length;},0));
    // ★ v29.1: 후처리 검증 (대운 나이 등 팩트 교정)
    if(result && !apiError) result = postValidateAI(result, dw, saju, gg);

  }catch(e){
    if (result && result.categories && result.categories.length >= 10) {
      console.log('[MBTS] postValidateAI 실패했지만 categories ' + result.categories.length + '개 확보 — 계속 진행');
    } else {
      console.error('[MBTS] 에러:', e);
      apiError=e.message||'UNKNOWN';
      result=mkFB(saju,mt,gg);
    }
  }

  clearInterval(iv);if(callbacks.onProgress)callbacks.onProgress(100);if(callbacks.onPercent)callbacks.onPercent(100);
  if(apiError){
    var errDetail='';
    if(apiError.indexOf('API_KEY_MISSING')>=0) errDetail='API 키가 없습니다.';
    else if(apiError.indexOf('HTTP_401')>=0) errDetail='API 키가 만료되었거나 유효하지 않습니다.';
    else if(apiError.indexOf('HTTP_429')>=0) errDetail='API 사용량 한도 초과. 1~2분 후 다시 시도해주세요.';
    else if(apiError.indexOf('HTTP_400')>=0||apiError.indexOf('HTTP_404')>=0) errDetail='모델 연결 실패. 콘솔(F12)에서 상세 오류 확인.';
    else if(apiError.indexOf('HTTP_529')>=0||apiError.indexOf('overloaded')>=0) errDetail='AI 서버 과부하. 1~2분 후 재시도.';
    else if(apiError.indexOf('abort')>=0||apiError.indexOf('Abort')>=0) errDetail='연결 타임아웃. 인터넷 확인 후 재시도.';
    else if(apiError.indexOf('Failed to fetch')>=0||apiError.indexOf('NetworkError')>=0||apiError.indexOf('TypeError')>=0) errDetail='네트워크 오류. file:// CORS 차단 → 로컬서버 필요.';
    else if(apiError.indexOf('JSON_PARSE')>=0) errDetail='AI 응답 형식 오류. 재시도하면 해결될 수 있어요.';
    else if(apiError.indexOf('STREAM_ERROR')>=0) errDetail='스트리밍 에러: '+apiError.substring(0,80);
    else errDetail=apiError.substring(0,80);
    if(callbacks.onError) callbacks.onError(errDetail);

  } else {
    if(callbacks.onMessage) callbacks.onMessage("✨ AI 분석 완료!");
  }
  // ── 프로그레시브 완료 처리 ──
  if(_progInitDone && typeof finalizeProgressivePage === 'function') {
    finalizeProgressivePage(result, saju, mt, gg, !apiError);
  }
  if(_progInitDone) result._progressiveRendered = true;
  if(callbacks.onComplete) callbacks.onComplete({result:result, saju:saju, mt:mt, gg:gg, dw:dw, isAI:!apiError, mbtiObj:mbtiObj});
}

// --- runGunghapAnalysis (startGunghap 변환: DOM→callbacks) ---
// paramsA = { saju, dw, gg, mbtiObj, apiKey }
// paramsB = { y, m, d, h, min, gender, mbtiType }
// relType = 관계 유형 문자열 (예: '연인', '부부', '친구' 등)
// callbacks = { onMessage, onProgress, onPercent, onComplete, onError }
async function runGunghapAnalysis(paramsA, paramsB, relType, callbacks){
  var apiKey = paramsA.apiKey;
  if(!apiKey){ if(callbacks.onError) callbacks.onError('API_KEY_MISSING'); return; }

  // 상대방 사주 계산
  var bY=+paramsB.y;
  var bM=+paramsB.m;
  var bD=+paramsB.d;
  var bH=paramsB.h?+paramsB.h:null;
  var bMin=paramsB.min?+paramsB.min:null;

  var sajuB=calcSajuForApp(bY,bM,bD,bH,bMin,null);
  var ggB=analyzeGyeokguk(sajuB);
  var genderB=paramsB.gender==='남성'?'남':'여';
  var dwB=calcDaewoon(sajuB,bY,bM,bD,bH||12,bMin||0,genderB);

  // MBTI B 객체 구성 (강도 없이 기본값)
  var tiB=TY[paramsB.mbtiType]||{n:"탐험가",cf:"Ni-Te-Fi-Se"};
  var mbtiB={type:paramsB.mbtiType, cf:tiB.cf,
    axes:[
      {side:paramsB.mbtiType[0],pct:60},
      {side:paramsB.mbtiType[1],pct:60},
      {side:paramsB.mbtiType[2],pct:60},
      {side:paramsB.mbtiType[3],pct:60}
    ], profile:''};

  // 내 데이터
  var sajuA=paramsA.saju, dwA=paramsA.dw, ggA=paramsA.gg;
  var mbtiA=paramsA.mbtiObj;
  if(!sajuA){ if(callbacks.onError) callbacks.onError('NO_SAJU_DATA'); return; }

  // 궁합 엔진 실행
  var ghResult=analyzeGunghap(sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);

  // 로딩
  var msgs=['두 사람의 사주를 펼칩니다...','천간지지 교차 분석 중...','오행 보완 관계를 읽습니다...','인지기능 궁합 탐색...','연애 케미를 계산합니다...','갈등 패턴을 분석합니다...','장기 전망을 그립니다...','두 사람의 이야기를 쓰고 있습니다...'];
  var p=0,iv=setInterval(function(){p+=Math.random()*1.5+.4;if(p>95)p=95;if(callbacks.onProgress)callbacks.onProgress(p);if(callbacks.onPercent)callbacks.onPercent(Math.round(p));if(callbacks.onMessage)callbacks.onMessage(msgs[Math.min(Math.floor(p/12),7)]);},900);

  // AI 프롬프트 생성 + 호출
  var userPrompt=buildGunghapUserPrompt(ghResult, sajuA, sajuB, dwA, dwB, ggA, ggB, mbtiA, mbtiB);
  var aiResult=null, apiError='';

  try{
    var aiText=await streamSonnet(apiKey, GUNGHAP_SYSTEM, userPrompt, '💕 궁합 분석', callbacks, '/api/gunghap-analyze');
    try {
      aiResult = JSON.parse(aiText);
    } catch(e) {
      console.warn('[MBTS] 궁합 1차 JSON 파싱 실패, 추출 시도...');
      // 2차: { ~ } 추출
      var fb = aiText.indexOf('{'), lb = aiText.lastIndexOf('}');
      if (fb >= 0 && lb > fb) {
        try { aiResult = JSON.parse(aiText.substring(fb, lb + 1)); } catch(e2) {}
      }
      // 3차: 줄 단위 추출
      if (!aiResult) {
        var lines = aiText.split('\n');
        var si = -1, ei = -1;
        for (var li = 0; li < lines.length; li++) {
          if (si < 0 && lines[li].trim().charAt(0) === '{') si = li;
          if (lines[li].trim().charAt(0) === '}' || lines[li].trim().slice(-1) === '}') ei = li;
        }
        if (si >= 0 && ei >= si) {
          try { aiResult = JSON.parse(lines.slice(si, ei + 1).join('\n')); } catch(e3) {}
        }
      }
      // 4차: 제어문자 제거 후 재시도
      if (!aiResult) {
        var sanitized = aiText.substring(fb >= 0 ? fb : 0, (lb > 0 ? lb + 1 : aiText.length));
        sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, function(c) { return c === '\n' || c === '\r' || c === '\t' ? c : ''; });
        try { aiResult = JSON.parse(sanitized); } catch(e4) {}
      }
      // 2~4차 성공 시 에러 초기화
      if (aiResult) {
        apiError = '';
        console.log('[MBTS] JSON 추출 성공 (폴백 파서)');
      } else {
        apiError = 'JSON_PARSE';
      }
    }
  }catch(e){
    console.error('[MBTS] 궁합 에러:', e);
    apiError=e.message||'UNKNOWN';
  }

  clearInterval(iv);
  if(callbacks.onProgress) callbacks.onProgress(100);
  if(callbacks.onPercent) callbacks.onPercent(100);

  // 결과 전달
  if(callbacks.onComplete) callbacks.onComplete({ghResult:ghResult, aiResult:aiResult, sajuA:sajuA, sajuB:sajuB, mbtiA:mbtiA, mbtiB:mbtiB, ggA:ggA, ggB:ggB, apiError:apiError});
}

// ============================================================
// Part C — 키워드 데이터 + 물상 + 폴백 (mbts.html 3929~5834)
// ============================================================

/* ==========================================
   * 십성 × 기둥위치 해석 데이터 (10종 × 4기둥 = 40종)
   ========================================== */
var SSP={
  '비견':{
    '연주':'어린 시절부터 경쟁 환경에서 자랐어요. 형제자매와의 라이벌 의식, 혹은 또래 집단에서 "내가 1등"이라는 에너지. 일찍부터 자립심이 형성된 구조.',
    '월주':'20대에 독립하려는 힘이 강해요. 부모 그늘에서 벗어나 자기 힘으로 서려는 욕구가 커지는 시기. 동료와의 경쟁 속에서 성장합니다.',
    '일주':'자아가 매우 강합니다. 타협보다 소신, 협력보다 독립. 배우자도 대등한 관계를 원하며, 의존적 파트너를 싫어해요.',
    '시주':'말년에도 독립적이고 활동적이에요. 자녀와도 동등한 관계를 추구하며, 은퇴 후에도 자기 일을 찾아 움직이는 구조.'
  },
  '겁재':{
    '연주':'어린 시절 빼앗기거나 경쟁해야 했던 경험이 있어요. 형제간 갈등이나, 가정 내에서 자원을 놓고 다투는 기운. 이 경험이 "내 것을 지키겠다"는 강한 의지를 만들었습니다.',
    '월주':'20대에 강한 경쟁 환경에 놓여요. 동기와의 치열한 경쟁, 혹은 사업에서의 치열한 다툼. 이 시기의 경험이 승부 근성을 만듭니다.',
    '일주':'내면에 강한 경쟁 본능이 있어요. 누군가 자기 영역을 침범하면 본능적으로 반발합니다. 배우자와의 관계에서 주도권 다툼이 생길 수 있어요.',
    '시주':'말년에 재물 손실이나 경쟁에 주의해요. 하지만 이 에너지를 사업적 추진력으로 쓰면 후반부에도 왕성한 활동이 가능합니다.'
  },
  '식신':{
    '연주':'어린 시절부터 표현력이 뛰어났어요. 말을 일찍 배웠거나, 어릴 때부터 "쟤 좀 특이한 아이다"라는 소리를 들었을 가능성. 먹는 것에 대한 행복도 일찍 깨달은 구조.',
    '월주':'20대에 재능이 개화해요. 표현의 분야에서 두각을 나타내는 시기. 글, 말, 요리, 음악, 예술 — 무언가를 만들어내는 활동에서 인정받습니다.',
    '일주':'가까운 사람에게 다정하고 따뜻해요. 요리해주고, 이야기해주고, 편안하게 해주는 사람. 배우자에게 헌신적이며, 먹을 복이 있는 구조.',
    '시주':'말년이 풍요로워요. 자녀가 효도하거나, 취미 활동으로 행복한 노년을 보내는 구조. 은퇴 후 새로운 창작 활동을 시작할 수 있어요.'
  },
  '상관':{
    '연주':'어린 시절부터 반항적이거나 언변이 뛰어났어요. "왜요?"를 입에 달고 사는 아이, 선생님과 자주 부딪히는 학생. 이 에너지가 나중에 창의력의 뿌리가 됩니다.',
    '월주':'20대에 기존 체제에 대한 불만이 커져요. 직장 상사와 부딪히거나, 사회적 규범에 반기를 들거나. 이 시기의 반항이 자기만의 길을 찾는 원동력이 됩니다.',
    '일주':'속마음이 솔직하고 날카로워요. 가까운 사람에게 가장 진솔하지만 가장 아프게도 말하는 양면성. 배우자와의 관계에서 말 조심이 핵심 과제.',
    '시주':'말년에 표현 욕구가 강해져요. 할 말 다 하고 사는 노년이 될 가능성. 자녀와의 관계에서 솔직함이 때로는 갈등의 원인이 됩니다.'
  },
  '편재':{
    '연주':'어린 시절부터 돈에 대한 감각이 있었어요. 용돈을 모으거나, 부모의 사업을 곁에서 본 경험. 경제적으로 활발한 가정 환경에서 자란 구조.',
    '월주':'20대부터 돈을 만지기 시작해요. 여러 아르바이트, 투자 시작, 사업적 감각의 발현. 이 시기에 재물을 다루는 경험이 쌓이면 후반부에 크게 열립니다.',
    '일주':'내면에 강한 재물 욕구가 있어요. 여러 수입원을 추구하고, 새로운 기회에 빠르게 반응합니다. 배우자도 활동적이고 매력적인 사람에게 끌리는 구조.',
    '시주':'말년에 뜻밖의 재물이 들어와요. 투자 수익이나 예상치 못한 수입원이 생기는 구조. 하지만 충동적 투자에 주의.'
  },
  '정재':{
    '연주':'안정적인 가정 환경에서 자랐어요. 부모가 성실하게 가정을 꾸려온 모습을 보며, 자연스럽게 "안정이 최고"라는 가치관이 형성.',
    '월주':'20대에 꾸준한 수입 구조를 만들어요. 취직 후 안정적으로 커리어를 쌓거나, 저축 습관이 형성되는 시기. 이 시기의 안정이 평생의 자산이 됩니다.',
    '일주':'현실적이고 알뜰한 내면이에요. 돈 관리를 잘하고, 불필요한 지출을 싫어해요. 배우자도 안정적이고 현실적인 사람에게 끌립니다.',
    '시주':'말년에 재물이 안정적으로 모여요. 연금, 적금, 부동산 등 차곡차곡 쌓아온 것의 결실을 누리는 구조.'
  },
  '편관':{
    '연주':'어린 시절 권위적 환경에서 자랐어요. 엄격한 아버지, 강한 규율, 혹은 외부 압력(전학, 이사, 환경 변화). 이 압박이 강한 정신력의 뿌리가 되었습니다.',
    '월주':'20대에 외부 압력과 도전에 직면해요. 직장에서의 상사 압박, 사회적 기대, 경쟁적 환경. 이 시기를 잘 버티면 강한 실행력이 만들어집니다.',
    '일주':'내면에 자기 채찍질의 에너지가 있어요. 스스로에게 엄격하고, 편안히 쉬는 것에 죄책감을 느끼기도 합니다. 배우자도 강한 성격일 가능성.',
    '시주':'말년에도 사회적 책임감이 있어요. 은퇴 후에도 역할이 주어지거나, 자녀에 대한 책임을 느끼는 구조. 편하게 쉬는 노년보다 활동적인 노년.'
  },
  '정관':{
    '연주':'질서 잡힌 가정에서 자랐어요. 예의범절, 사회적 체면을 중시하는 환경. "남에게 부끄럽지 않게 살아라"가 무의식에 새겨져 있습니다.',
    '월주':'20대에 사회적 인정을 받기 시작해요. 안정적 직장, 좋은 평판, 주변의 신뢰. 이 시기의 성실함이 커리어의 토대가 됩니다.',
    '일주':'내면에 품격과 질서에 대한 욕구가 있어요. "올바르게 살고 싶다"는 본능. 배우자도 품격있고 신뢰할 수 있는 사람에게 끌립니다.',
    '시주':'말년에 명예로운 위치를 유지해요. 사회적 존경, 후배들의 신뢰, 안정적인 노후. 자녀도 성실하게 자랄 가능성이 높아요.'
  },
  '편인':{
    '연주':'독특한 환경에서 자랐어요. 일반적이지 않은 가정 — 외국 생활, 종교적 환경, 예술적 가정, 혹은 어린 시절 외로운 시간이 많았던 경우. 이 경험이 독창적 사고의 뿌리.',
    '월주':'20대에 비주류적 관심사에 빠져요. 남들과 다른 길을 가려는 욕구, 독특한 분야에 대한 탐구. 이 시기의 "다름"이 나중에 경쟁력이 됩니다.',
    '일주':'내면이 매우 독특해요. 남들과 다른 생각, 비범한 관심사, 일반적이지 않은 취향. 배우자도 개성적이고 지적 자극을 주는 사람에게 끌립니다.',
    '시주':'말년에 종교, 철학, 대안적 삶에 관심이 깊어져요. 세속적 가치보다 정신적 가치를 추구하는 노년. 예술이나 영성 활동으로 행복을 찾습니다.'
  },
  '정인':{
    '연주':'학문적 가정에서 자랐어요. 부모가 교육을 중시하거나, 책이 많은 환경, 혹은 어릴 때부터 학습에 노출된 구조. "공부 잘하는 아이"로 자란 경우가 많아요.',
    '월주':'20대에 학업이나 자기계발에 집중해요. 자격증, 학위, 전문성 축적. 이 시기의 학습이 평생의 지적 자산이 됩니다. 좋은 멘토를 만날 가능성.',
    '일주':'내면이 지적이고 따뜻해요. 배움에 대한 욕구가 깊고, 가까운 사람에게 보호적입니다. 배우자도 지적이고 배려심 깊은 사람에게 끌립니다.',
    '시주':'말년에 학문적 성숙이 깊어져요. 은퇴 후 공부를 다시 시작하거나, 가르치는 활동으로 보람을 느끼는 구조. 자녀에게 정신적 유산을 남깁니다.'
  }
};

/* === 십성 위치 해석 헬퍼 === */
function sspDesc(ssName, pillarLabel){
  // pillarLabel: '연주','월주','일주','시주'
  if(!SSP[ssName]) return '';
  return SSP[ssName][pillarLabel]||'';
}

/* ==========================================
   * mkFB v3 - "데이터 → 발견 → 내용 → 소제목" 구조
   ========================================== */
// ===========================================================
// ① 일간 본질 키워드 (10일간 × 2 강/약 = 20세트)
// ===========================================================
var ILGAN_KW = {
  '갑': {
    strong: ['큰나무의기둥', '리더십', '곧은성격', '자존심강함', '개척자', '우직한추진력', '양보를모름', '목표의식확고'],
    weak: ['바람에흔들리는나무', '의지는있으나힘부족', '남의도움필요', '이상은높으나현실이못따라감', '자존심은강한데뒷받침부족', '귀인이필수']
  },
  '을': {
    strong: ['질긴덩굴', '유연한처세술', '부드러운끈기', '적응력최강', '어디서든살아남음', '타인을감싸안는힘'],
    weak: ['의지할곳을찾는풀', '환경에휘둘림', '주관이약해보임', '눈치가과도함', '스스로결정못내림', '좋은환경이필수']
  },
  '병': {
    strong: ['뜨거운태양', '화려한존재감', '열정폭발', '주목받는사람', '솔직하고정직', '에너지가넘침', '밝고긍정적', '숨기지못하는감정'],
    weak: ['구름낀태양', '열정은있으나지속이어려움', '자신감부족', '인정욕구강함', '타인의시선에민감', '빛나고싶으나기회부족']
  },
  '정': {
    strong: ['활활타오르는촛불', '내면의열정', '섬세한감수성', '예술적감각', '따뜻한카리스마', '집중력뛰어남', '은근한승부욕'],
    weak: ['바람앞의촛불', '감정기복', '쉽게상처받음', '의존적', '내면은뜨거우나표현이약함', '안정적환경필요']
  },
  '무': {
    strong: ['큰산의위엄', '신뢰감', '묵직한포용력', '중심을잡는사람', '고집셈', '변하지않는원칙', '듬직한보호자'],
    weak: ['갈라진대지', '고집은있으나실행력부족', '생각만많고행동느림', '포용은하고싶으나에너지부족', '우유부단', '결단력보강필요']
  },
  '기': {
    strong: ['기름진논밭', '세심한기획력', '뒤에서챙기는실력자', '실용적판단', '사람키우는능력', '꼼꼼한관리', '현실감각뛰어남'],
    weak: ['메마른밭', '신경이예민함', '소심함', '걱정이많음', '남을챙기다자기를못챙김', '실속없이바쁨', '안정적기반필요']
  },
  '경': {
    strong: ['단단한바위', '결단력', '의리', '냉철한판단', '승부사기질', '정의감', '칼같은실행력', '한번결정하면안변함'],
    weak: ['녹슨칼날', '결단은하고싶으나망설임', '냉정해보이지만속은여림', '외로움을잘탐', '인정받고싶은마음', '좋은도구(기회)를만나야빛남']
  },
  '신': {
    strong: ['빛나는보석', '날카로운분석력', '완벽주의', '미적감각', '예민한관찰력', '디테일에강함', '자기기준이확고'],
    weak: ['원석상태', '예민하고날이서있음', '사소한것에상처받음', '겉은차갑고속은불안', '자기비판이심함', '누군가갈고닦아줘야빛남']
  },
  '임': {
    strong: ['넓은바다', '지혜', '적응력', '포용력', '겉잔잔속깊음', '전략가', '흐름을읽는능력', '위기에냉정'],
    weak: ['마르기직전의강', '지혜는있으나밀어붙일힘부족', '속이깊어서외로움', '혼자감당하려함', '도움요청을못함', '동료나귀인이생명줄']
  },
  '계': {
    strong: ['맑은샘물', '직감력', '감수성풍부', '조용한관찰자', '섬세한감정표현', '영감이강함', '물흐르듯유연한대응'],
    weak: ['스며드는이슬', '감정에쉽게잠김', '우울경향', '방향을잃기쉬움', '주관이흔들림', '의지할사람절실', '작은충격에도크게흔들림']
  }
};

// ===========================================================
// ⑤-2 적천수(滴天髓) 십간론 — 천간의 본질과 물상
// ===========================================================
var JEOKCHEONSU = {
  '갑': {
    title:'參天之樹(참천지수) — 하늘을 찌르는 큰 나무',
    nature:'갑목은 하늘을 향해 곧게 뻗는 거목이다. 소나무처럼 꺾이면 부러지지 휘지 않는다. 만물의 시작, 봄의 첫 기운, 리더의 자리에 서는 존재.',
    strong_img:'뿌리 깊은 대나무 숲. 태풍이 와도 흔들릴 뿐 뽑히지 않는다. 자기 길을 묵묵히 가는 사람. 타협을 모르고, 그것이 때로는 고집으로 보이지만, 그게 갑목의 생존 방식이다.',
    weak_img:'가뭄에 시든 큰 나무. 뿌리는 깊은데 물이 없다. 이상은 높으나 현실이 따라주지 않는 답답함. 누군가 물(수)을 줘야 다시 살아난다.',
    love:'첫 만남에 듬직하고 신뢰감을 줌. 하지만 깊어지면 양보를 모름. "내가 옳다"는 확신이 관계를 막힐 때가 있음. 상대가 을목(유연한 사람)이면 최고의 궁합.',
    work:'조직의 기둥. 흔들리는 상황에서 중심을 잡는 사람. 창업자, 경영자, 팀리더에 적합. 남 밑에서 오래 못 견딤.',
    danger:'경금(도끼)을 만나면 잘려나갈 수 있다. 하지만 좋은 경금은 갑목을 재목(材木)으로 만들어주는 스승이기도 하다.'
  },
  '을': {
    title:'花草之木(화초지목) — 담쟁이, 화초, 풀',
    nature:'을목은 바위 틈에서도 자라나는 풀이다. 갑목이 꺾이면 부러지는 반면, 을목은 바람에 눕되 부러지지 않는다. 유연함이 곧 생존력.',
    strong_img:'바위를 감싸고 올라가는 담쟁이. 어떤 환경에서든 뿌리를 내리는 놀라운 적응력. 강한 자 옆에서 더 빛나며, 사람을 통해 성장하는 사람.',
    weak_img:'그늘진 곳의 시든 화초. 햇볕(병화)이 없으면 광합성을 못 한다. 좋은 환경을 만나느냐가 인생을 결정하는 구조.',
    love:'상대에게 감기는 담쟁이처럼, 한번 마음을 주면 깊이 파고든다. 상대의 세계에 동화되는 능력. 다만 자기를 잃기 쉬움.',
    work:'참모, 기획자, 상담사, 디자이너. 전면에 나서기보다 뒤에서 판을 짜는 역할에서 빛남. 인맥이 곧 자산.',
    danger:'토(흙)가 과하면 뿌리가 묻혀서 답답함. 지나친 안정은 오히려 성장을 막는다.'
  },
  '병': {
    title:'太陽之火(태양지화) — 태양',
    nature:'병화는 태양이다. 만물을 비추되 특정인을 편애하지 않는다. 밝고, 뜨겁고, 감출 수 없는 존재. 어디에 있든 눈에 띈다.',
    strong_img:'한여름 정오의 태양. 에너지가 넘치고 주변을 환하게 밝힌다. 열정적이고 솔직하며, 감정을 숨기지 못한다. 사람들이 자연스럽게 모여든다.',
    weak_img:'구름에 가린 태양. 빛나고 싶은데 기회가 없다. 자신감이 흔들리면 급격히 위축되는 구조. 갑목(연료)이 반드시 필요.',
    love:'사랑할 때 화끈하고 아낌없이 준다. 하지만 관심이 식으면 돌아서는 것도 빠름. 밝은 에너지로 상대를 매료시키지만, 유지가 과제.',
    work:'무대 위의 사람. 방송, 강연, 영업, 정치, 엔터테인먼트. 사람 앞에서 빛나는 직업에 최적화. 혼자 일하면 에너지가 사라짐.',
    danger:'임수(큰 물)를 만나면 빛이 꺼질 수 있지만, 적절한 임수는 무지개를 만들어준다. 병임의 만남은 극과 극의 시너지.'
  },
  '정': {
    title:'燈燭之火(등촉지화) — 등불, 촛불',
    nature:'정화는 어둠 속의 촛불이다. 태양이 만물을 비추면, 정화는 한 사람의 마음을 비춘다. 섬세하고 집중적이며, 어둠이 깊을수록 빛난다.',
    strong_img:'캄캄한 밤의 등대. 작지만 확실한 빛으로 길을 밝힌다. 깊은 집중력과 내면의 열정. 겉은 조용하지만 속에 뜨거운 불꽃이 있다.',
    weak_img:'바람에 흔들리는 촛불. 감정의 파도에 휩쓸리기 쉽다. 갑목(장작)이 없으면 금방 꺼진다. 의지할 사람이나 확고한 목표가 생존 조건.',
    love:'한 사람에게 깊이 몰입하는 스타일. 병화가 널리 비추면 정화는 깊이 비춘다. 질투와 집착으로 이어지기도 하지만, 그만큼 진심.',
    work:'연구자, 예술가, 심리상담사, 작가, 프로그래머. 깊이 파고드는 직업에서 진가를 발휘. 넓고 얕은 것보다 좁고 깊은 것.',
    danger:'갑목이 없으면 불이 꺼진다. 정화에게 갑목(후원자, 목표, 신념)은 생명줄.'
  },
  '무': {
    title:'高山之土(고산지토) — 산, 큰 땅, 바위산',
    nature:'무토는 태산이다. 움직이지 않는 것으로 만물을 품는다. 변하지 않는 중심, 듬직한 신뢰, 묵직한 존재감. 산은 스스로 가지 않되, 사람들이 산으로 온다.',
    strong_img:'우뚝 솟은 산. 폭풍이 와도 미동 없는 위엄. 한번 약속하면 반드시 지키는 사람. 느리지만 확실한 실행력. 주변에 안정감을 주는 존재.',
    weak_img:'갈라진 대지, 사막. 포용하고 싶으나 에너지가 없다. 고집은 있는데 실행이 따라주지 않는 답답함. 갑목(나무)과 계수(물)로 생기를 불어넣어야.',
    love:'느리게 다가가지만, 한번 마음먹으면 산처럼 변하지 않는다. 바람을 피울 가능성이 가장 낮은 일간. 다만 표현이 서툴러서 오해를 사기 쉬움.',
    work:'관리자, 경영지원, 부동산, 건축, 안전관리. 조직의 중심을 잡는 역할. 위기 상황에서 가장 믿음직한 사람.',
    danger:'목(나무)이 없으면 민둥산. 민둥산은 비가 오면 산사태가 난다. 무토에게 갑목은 뿌리를 내려주는 존재.'
  },
  '기': {
    title:'田園之土(전원지토) — 논밭, 정원, 습한 흙',
    nature:'기토는 만물을 키우는 논밭이다. 무토가 산이면 기토는 밭. 씨앗을 품고, 물을 머금고, 생명을 틔우는 대지. 세심하고 실용적.',
    strong_img:'기름진 옥토. 심는 대로 거두는 풍요의 땅. 사람을 키우는 능력이 탁월하고, 현실 감각이 뛰어나다. 뒤에서 모든 걸 챙기는 실력자.',
    weak_img:'메마른 밭. 비(수)가 안 오면 곡식이 자라지 않는다. 걱정이 많고 신경이 예민해짐. 남을 챙기다 자기를 못 챙기는 번아웃 패턴.',
    love:'상대를 돌보고 키우는 스타일. 연인에게 밥 잘 챙겨주고, 필요한 것 미리 준비하는 사람. 다만 과도한 돌봄이 통제로 느껴질 수 있음.',
    work:'교육자, HR, 농업, 식품, 의료보조. 사람이나 생명을 키우는 일에 최적화. 꼼꼼한 관리 능력이 핵심 무기.',
    danger:'수(물)가 과하면 밭이 잠긴다. 감정에 휩쓸리면 현실 판단이 흐려지는 패턴.'
  },
  '경': {
    title:'刀劍之金(도검지금) — 칼, 도끼, 큰 쇠',
    nature:'경금은 원석 상태의 거친 쇠다. 불(병화)에 달궈지고 물(임수)에 담금질되어야 비로소 명검이 된다. 날것의 강함, 거친 정의감, 냉철한 결단.',
    strong_img:'잘 벼린 칼날. 한 번에 자르는 결단력. 의리와 정의감이 강하고, 한번 결정하면 돌아보지 않는다. 거친 환경에서 더 빛나는 사람.',
    weak_img:'녹슨 칼. 날카로움은 있으나 기회(불)를 만나지 못해 빛을 발하지 못함. 속은 여린데 겉이 차가워 보여 사람들이 다가오지 않는 외로움.',
    love:'무뚝뚝하지만 진심은 깊다. 사랑하는 사람에게는 한없이 약해지는 타입. 의리로 관계를 유지하며, 배신하지 않는 대신 배신당하면 끝.',
    work:'군인, 경찰, 외과의사, 엔지니어, 구조조정 전문가. 칼로 자르듯 명확한 판단이 필요한 직업. 애매한 상황을 못 견딤.',
    danger:'불(병화)이 없으면 영원히 원석. 시련과 단련을 거쳐야 진짜 가치가 나온다. 편안한 환경이 오히려 경금을 무디게 만든다.'
  },
  '신': {
    title:'珠玉之金(주옥지금) — 보석, 바늘, 장식품',
    nature:'신금은 세공된 보석이다. 경금이 거친 칼이면 신금은 정교한 비수. 날카롭고 섬세하며, 아름다움과 완벽함을 추구한다.',
    strong_img:'다이아몬드. 단단하면서 아름답다. 예리한 분석력으로 본질을 꿰뚫고, 미적 감각이 탁월하다. 자기 기준이 확고하여 타협을 싫어한다.',
    weak_img:'흙에 묻힌 원석. 자기 가치를 알아주는 사람을 만나지 못한 상태. 예민하고 자기비판이 심하며, 완벽주의가 자기를 옥죈다.',
    love:'까다롭지만 한번 마음을 열면 깊다. 상대의 결점을 예리하게 보지만, 진심으로 좋아하면 그 결점까지 세공해주려 한다.',
    work:'보석감정사, 분석가, 프로그래머, 디자이너, 편집자. 디테일과 정밀함이 요구되는 직업. 대충이란 없다.',
    danger:'임수(맑은 물)로 세척해야 빛난다. 신금에게 임수는 자신을 비춰주는 거울이자 정화의 수단.'
  },
  '임': {
    title:'大海之水(대해지수) — 강, 바다, 큰 물',
    nature:'임수는 도도히 흐르는 강이자 끝없는 바다다. 멈추지 않고 흐르며, 막으면 돌아가고, 가두면 넘친다. 지혜와 포용의 상징.',
    strong_img:'유유히 흐르는 대하. 겉은 잔잔하나 속은 깊다. 어떤 상황에서든 길을 찾아내는 전략가. 감정을 드러내지 않되 모든 것을 관찰하고 있다.',
    weak_img:'마르기 직전의 강. 지혜는 있으나 밀어붙일 힘이 없다. 혼자 감당하려다 지치는 패턴. 경금(수원지)이 물을 계속 공급해줘야 생명 유지.',
    love:'깊은 바다처럼 상대를 품는다. 포용력이 넓어 어떤 사람이든 받아들이지만, 정작 자기 속마음은 잘 안 보여준다. "다 괜찮다"면서 혼자 삼킴.',
    work:'전략가, 물류, 무역, IT, 철학자, 교수. 흐름을 읽고 판을 짜는 일. 변화가 빠른 환경에서 적응력 발휘.',
    danger:'무토(둑)가 없으면 범람한다. 적절한 제어가 없으면 에너지가 사방으로 흩어짐. 집중과 방향이 과제.'
  },
  '계': {
    title:'雨露之水(우로지수) — 이슬, 시냇물, 빗물',
    nature:'계수는 새벽 이슬이자 산골 시냇물이다. 임수가 바다면 계수는 샘물. 작지만 맑고, 스며들듯 침투하며, 생명을 틔우는 물.',
    strong_img:'맑은 샘물. 조용히 스며들어 씨앗을 틔운다. 직감과 영감이 뛰어나고, 남들이 못 보는 것을 감지하는 능력. 물 흐르듯 유연하게 대응.',
    weak_img:'증발 직전의 이슬. 너무 예민하고 감정에 쉽게 잠긴다. 방향을 잃으면 이리저리 흘러다님. 신금(수원)이 꾸준히 보충해줘야 마르지 않음.',
    love:'상대의 마음에 스며드는 사람. 말보다 눈빛으로 통하는 관계를 원한다. 감정의 파장이 크고, 사소한 것에도 깊이 감동하고 상처받는다.',
    work:'예술가, 점술가, 심리치료사, 연구원, 작가. 직감과 통찰이 무기인 직업. 논리보다 감(感)으로 승부.',
    danger:'병화(태양)가 없으면 존재감이 사라진다. 계수는 빛을 만나야 무지개가 된다. 자기를 드러낼 무대가 필요.'
  }
};

// ===========================================================
// ⑤-3 자평진전(子平眞詮) 격국론 — 격국별 사회적 역할 + 파격 조건
// ===========================================================
var JAPYEONG_GG = {
  '식신격': {
    role:'세상에 재능을 풀어놓는 사람',
    intact:'식신이 깨끗하면(충·파 없으면) 재능이 자연스럽게 돈이 된다. 표현하는 것 자체가 직업이 되는 구조. 먹을 복, 예술 복이 있다.',
    breaks:[
      {cond:'편인(효신탈식)',desc:'재능은 있는데 뭔가 계속 방해받는 느낌. 시작할 때마다 누군가가 발목을 잡거나, 환경이 허락하지 않음. 편인을 제어하는 재성이 해결 열쇠.'},
      {cond:'과다한 식신',desc:'재능이 너무 많아서 하나에 집중 못 함. 이것저것 벌여놓고 마무리가 안 되는 패턴. 선택과 집중이 파격 탈출법.'},
      {cond:'편관 혼잡',desc:'표현하고 싶은데 사회적 압박(규칙, 상사, 시스템)이 막음. 조직 안에서 답답함을 느끼는 구조.'}
    ]
  },
  '상관격': {
    role:'기존 질서에 도전하는 혁신가',
    intact:'상관이 재성을 생하면(상관생재) 파괴적 창의력이 현실적 부로 전환. 예술가, 사업가, 혁신가의 격.',
    breaks:[
      {cond:'정관 충돌(상관견관)',desc:'윗사람·조직·규칙과 정면충돌하는 운명. 능력은 뛰어나나 "말 안 듣는 사람" 이미지. 프리랜서·창업이 돌파구.'},
      {cond:'인성 제압',desc:'표현하고 싶은데 교육·규범·체면이 막음. "하고 싶은 말을 못 하는" 답답함이 쌓이면 한번에 폭발.'},
      {cond:'식상 혼잡',desc:'식신+상관이 뒤섞여 일관성이 없음. 재능은 넘치는데 방향이 흔들림. 멘토(인성)가 필요한 구조.'}
    ]
  },
  '편재격': {
    role:'기회를 포착하는 사업가',
    intact:'편재가 안정적이면 사업 감각이 뛰어나고 돈의 흐름을 읽는다. 투자, 유통, 영업에서 큰 돈을 움직이는 사람.',
    breaks:[
      {cond:'겁재 탈재',desc:'돈은 버는데 누군가가 빼간다. 동업 실패, 보증 피해, 투자 사기의 패턴. 재물 관리 시스템이 필수.'},
      {cond:'비견 쟁재',desc:'경쟁자가 계속 나타남. 같은 시장에서 치열한 경쟁. 차별화 전략이 생존 조건.'},
      {cond:'편관 과다',desc:'사업에 대한 불안과 압박이 과도. 세금, 규제, 법적 문제로 스트레스. 관성을 다루는 지혜 필요.'}
    ]
  },
  '정재격': {
    role:'안정적 부를 쌓는 실무자',
    intact:'정재가 깨끗하면 꾸준한 수입과 안정적 재물 축적. 성실한 노동이 부로 이어지는 정도(正道)의 격.',
    breaks:[
      {cond:'겁재 파재',desc:'안정적으로 모은 돈이 한순간에 날아가는 패턴. 주변 사람 때문에 재물 손실. 재물 경계가 핵심.'},
      {cond:'상관 과다',desc:'너무 많은 지출, 충동구매, 투자 실패. 들어오는 것보다 나가는 것이 많은 구조.'},
      {cond:'편인 충돌',desc:'일에 대한 보상이 기대에 못 미침. 열심히 하는데 성과가 안 나오는 답답함.'}
    ]
  },
  '편관격': {
    role:'압박 속에서 성장하는 전사',
    intact:'편관(칠살)이 식신에 의해 제어되면(식신제살) 강력한 추진력과 리더십. 위기 상황에서 진가를 발휘하는 실전형 리더.',
    breaks:[
      {cond:'제어 없는 칠살',desc:'스트레스·압박·긴장이 끊이지 않음. 몸이 아프거나 사고가 잦은 패턴. 식신(재능)이나 인성(학문)으로 제어해야.'},
      {cond:'관살혼잡',desc:'정관+편관이 뒤섞여 이중 압박. 직장에서 두 상사를 모시는 형상. 한쪽을 합거(合去)해야 해소.'},
      {cond:'신약 편관',desc:'몸이 약한데 압박이 큼. 능력 밖의 책임을 지게 되는 구조. 인성(귀인)의 도움이 절실.'}
    ]
  },
  '정관격': {
    role:'신뢰받는 조직의 기둥',
    intact:'정관이 깨끗하면 직장 내 승진 순조, 사회적 신뢰도 높음. 공무원, 대기업, 전문직에서 안정적으로 올라가는 격.',
    breaks:[
      {cond:'상관견관',desc:'조직과 계속 충돌. 능력은 인정받지만 "불편한 사람" 취급. 본인은 옳다고 생각하는데 조직이 안 따라줌.'},
      {cond:'관살혼잡',desc:'정관+편관 혼재로 직업이 불안정. 이직 잦거나 두 개의 직업 사이에서 갈등. 하나로 정리해야 안정.'},
      {cond:'형충파해',desc:'정관이 충을 당하면 직업적 위기. 갑작스런 해고, 부서 이동, 계약 파기. 대비와 유연함 필요.'}
    ]
  },
  '편인격': {
    role:'비주류의 지식으로 빛나는 사람',
    intact:'편인이 안정적이면 독특한 전문성으로 차별화. 비주류 학문, 대체의학, IT, 예술 등 "남들이 안 하는 분야"에서 성공.',
    breaks:[
      {cond:'효신탈식',desc:'편인이 식신을 빼앗음. 재능은 있는데 현실로 연결이 안 됨. 먹고사는 문제와 하고 싶은 일 사이의 괴리.'},
      {cond:'편인 과다',desc:'생각이 너무 많고 행동이 없음. 공부만 하고 써먹지 못하는 패턴. 재성(현실감각)이 해독제.'},
      {cond:'재성 파인',desc:'돈을 쫓다가 학문·전문성을 잃음. 본업을 놓치는 패턴.'}
    ]
  },
  '정인격': {
    role:'학문과 교양으로 존경받는 사람',
    intact:'정인이 깨끗하면 학업 성취, 자격증, 전문직으로 안정적 성공. 어머니·스승의 복이 있고, 귀인이 잘 나타남.',
    breaks:[
      {cond:'재성 파인',desc:'돈 때문에 공부를 못 하거나, 경제적 이유로 꿈을 포기하는 패턴. 학비 문제, 생계형 직업 선택.'},
      {cond:'인성 과다',desc:'너무 의존적. 스스로 결정 못 하고 부모·선생·멘토에게 기댐. 자립이 과제.'},
      {cond:'식상 충돌',desc:'배운 것과 표현하고 싶은 것이 충돌. 학문적 틀에 갇히거나 반대로 학문을 무시하는 패턴.'}
    ]
  },
  '건록격': {
    role:'자수성가형, 독립적 개척자',
    intact:'일간이 월지에서 건록을 얻으면 자기 힘으로 일어서는 사람. 남에게 기대지 않는 독립심. 프리랜서, 전문직, 1인기업가.',
    breaks:[
      {cond:'비겁 과다',desc:'독립심은 강한데 혼자 다 하려다 지침. 위임과 협력을 배워야 하는 구조.'},
      {cond:'관성 부재',desc:'제어할 사람이 없어 과신과 독선에 빠지기 쉬움. 스스로를 절제하는 훈련이 필요.'},
      {cond:'재성 부족',desc:'능력은 있는데 돈으로 연결이 안 됨. 실력은 인정받지만 수입이 불안정.'}
    ]
  },
  '양인격': {
    role:'극한 상황의 돌파자',
    intact:'양인이 적절히 제어되면(관살이 양인을 누르면) 극한 상황에서 돌파하는 힘. 군인, 외과의사, 위기관리 전문가의 격.',
    breaks:[
      {cond:'제어 없는 양인',desc:'칼날이 통제 불능. 감정 폭발, 충동적 행동, 사고 위험. 관성(절제)이 반드시 필요.'},
      {cond:'양인+편관',desc:'살인상생의 구조가 되면 오히려 최강. 강력한 리더십과 추진력. 다만 극약처방이라 위험과 성공이 공존.'},
      {cond:'형충 충돌',desc:'양인이 충을 당하면 예상치 못한 사건사고. 건강, 수술, 이별 등 급격한 변화.'}
    ]
  }
};

// ===========================================================
// ⑥ 오행 과부족 체감 키워드
// ===========================================================
var OHENG_KW = {
  '목': {
    excess: ['생각이너무많음', '시작은잘하나마무리약함', '욕심이과함', '분노조절어려움', '간담건강주의'],
    lack: ['추진력부족', '결단못내림', '새로운시작이두려움', '소극적', '봄기운보강필요'],
    zero: ['도전정신결핍', '성장동력이없음', '시작자체를못함', '나무기운(녹색,신맛,동쪽)보강필수']
  },
  '화': {
    excess: ['감정기복심함', '급한성격', '화를잘냄', '열정이과해서번아웃위험', '심장혈압주의'],
    lack: ['열정부족', '동기부여어려움', '차가운인상', '표현력약함', '따뜻한관계필요'],
    zero: ['열정이고갈됨', '삶의재미를못느낌', '무기력', '불기운(빨강,쓴맛,남쪽)보강필수']
  },
  '토': {
    excess: ['생각만많고행동느림', '고민루프에빠짐', '우유부단', '무겁고둔함', '소화기건강주의'],
    lack: ['중심을못잡음', '믿음직하지못함', '안정감부족', '뿌리없는느낌', '기반을다져야함'],
    zero: ['신뢰기반이없음', '불안정한삶', '정착이어려움', '토기운(노랑,단맛,중앙)보강필수']
  },
  '금': {
    excess: ['너무냉정함', '감정을잘라냄', '고독해짐', '융통성부족', '호흡기건강주의'],
    lack: ['결단력약함', '우유부단', '마무리를못함', '흐지부지', '칼같은판단력보강필요'],
    zero: ['결단력완전결핍', '시작만하고끝을못봄', '금기운(흰색,매운맛,서쪽)보강필수']
  },
  '수': {
    excess: ['생각이너무깊어빠져나오기힘듦', '우울경향', '의심이많음', '차가워보임', '비뇨기신장주의'],
    lack: ['지혜와유연함부족', '융통성없음', '마른감성', '적응력약함', '물기운보강필요'],
    zero: ['유연성완전결핍', '딱딱한사고', '감정의흐름이막힘', '수기운(검정,짠맛,북쪽)보강필수']
  }
};

// ===========================================================
// ⑪ 12운성 체감 키워드 (일지 기준)
// ===========================================================
var UNSUNG_KW = {
  '장생': ['성장에너지', '새출발', '배움에목마름', '밝은전망', '학생같은순수함'],
  '목욕': ['감정변화큼', '유혹에약함', '변화를추구', '이성문제가능', '자유로운영혼'],
  '관대': ['사회적활발', '자기표현강함', '인정받고싶음', '옷차림에신경', '화려한에너지'],
  '건록': ['자수성가', '독립심강함', '실력으로인정', '안정적전성기', '주관이뚜렷'],
  '제왕': ['에너지최고조', '주도적', '독단위험', '정상에섰으나외로움', '카리스마'],
  '쇠': ['원숙함', '노련함', '체력저하시작', '경험으로승부', '안정추구'],
  '병': ['건강주의', '에너지하락', '쉽게지침', '마음은급한데몸이안따라감', '관리가중요'],
  '사': ['극적전환점', '끝과시작이공존', '놓아야얻음', '집착하면잃음', '정리의시기'],
  '묘': ['잠재력풍부', '아직드러나지않은능력', '때를기다려야함', '내면에숨은보석', '인내필요'],
  '절': ['기복극심', '바닥에서올라오는힘', '극적반전형인생', '위기가곧기회', '독한생명력'],
  '태': ['새로운가능성', '잉태의에너지', '준비단계', '아직형태가안잡힘', '보호가필요'],
  '양': ['서서히성장중', '키워가는단계', '급하면안됨', '조용한축적', '미래를위한투자기']
};

// ===========================================================
// ⑫ 공망 궁위별 체감 키워드
// ===========================================================
var GONGMANG_GUNGWI_KW = {
  'year': ['어린시절공허함', '조상덕이약함', '사회적배경이약하지만자수성가', '원가족과의거리감'],
  'month': ['직장에서인정받기어려움', '부모덕이약함', '사회활동에공허', '직업적변동많음'],
  'day': ['배우자궁공망=배우자와의인연이특이', '내면의공허감', '자아정체성고민', '정신적방황가능'],
  'hour': ['자식과의인연이특이', '노년기공허감', '말년의변화', '결과물이기대와다름']
};


// ===========================================================
// ④ 십성의 궁위 배치 (10종 × 4궁위 = 40조합)
// ===========================================================
var SIPSUNG_GUNGWI_KW = {
  '비견': {
    year: ['형제자매와경쟁', '또래들과부대끼며성장', '자기주장이일찍발달'],
    month: ['직장에서동료와경쟁', '협업속주도권다툼', '동업기회'],
    day: ['배우자와대등한관계', '부부가라이벌', '독립적파트너십'],
    hour: ['말년에자기사업', '노후자립심강함', '자식보다본인활동']
  },
  '겁재': {
    year: ['어린시절재물경쟁', '형제에게빼앗긴느낌', '나눠야했던유년기'],
    month: ['직장에서재물손실주의', '동료때문에돈나갈일', '공동투자주의'],
    day: ['배우자로인한재물변동', '부부간돈문제', '배우자가쓰는돈이큼'],
    hour: ['노후재물유출', '자식에게재산이나감', '말년재물관리필요']
  },
  '식신': {
    year: ['어린시절먹을복', '안정적유년기', '표현력일찍발달'],
    month: ['직장에서안정적수입', '전문기술로인정', '꾸준한성과'],
    day: ['배우자를잘챙김', '가정에서편안함제공', '내면의여유'],
    hour: ['노후풍요', '자식복', '말년의여유와안정']
  },
  '상관': {
    year: ['어린시절반항기', '규칙에저항', '일찍부터자기표현강함'],
    month: ['직장에서상사와충돌', '조직에안맞음', '창의적직업적합', '프리랜서형'],
    day: ['배우자에게잔소리', '관계에서주도권잡으려함', '표현이과해서갈등'],
    hour: ['말년에자유로운활동', '자식이독특함', '노후에제2의인생']
  },
  '편재': {
    year: ['아버지영향큼', '어린시절돈의흐름을경험', '유동적환경'],
    month: ['사업적수완', '투자감각', '여러수입원', '직장보다사업적합'],
    day: ['배우자가활동적', '연애에적극적', '바깥활동많은파트너'],
    hour: ['말년에사업운', '노후에새로운수입', '움직이는노년']
  },
  '정재': {
    year: ['안정적가정환경', '아버지가안정적', '물질적기반있는유년기'],
    month: ['월급쟁이체질', '꾸준한저축', '안정적직장운', '현실적재물관리'],
    day: ['알뜰한배우자', '가정경제안정', '실속있는결혼생활'],
    hour: ['노후안정적재물', '자식이효도', '말년의경제적안정']
  },
  '편관': {
    year: ['엄격한가정환경', '어린시절규율속성장', '사회적압박일찍경험'],
    month: ['직장에서강한압박', '상사의압력', '조직내긴장감', '위기관리능력발달'],
    day: ['배우자가강한성격', '부부관계에서긴장', '카리스마있는파트너에끌림'],
    hour: ['말년에돌발변화', '자식과의갈등가능', '노후에예상밖도전']
  },
  '정관': {
    year: ['반듯한가정환경', '예의바른성장', '규칙적유년기'],
    month: ['직장에서승진운', '조직내신뢰', '안정적커리어', '관직/공직적합'],
    day: ['예의바른배우자', '안정적결혼생활', '서로존중하는관계'],
    hour: ['말년에사회적인정', '자식이반듯함', '노후의안정']
  },
  '편인': {
    year: ['특이한가정환경', '어머니영향크지만불안정', '일찍부터독학', '외로운유년기'],
    month: ['직장에서비주류', '독특한전문성', '연구직학문적합', '조직보다독립적학습'],
    day: ['내면이복잡함', '배우자를이해하기어려움', '정신적방황', '깊은사색'],
    hour: ['말년에학문/종교몰입', '자식이독특', '노후에정신적성장']
  },
  '정인': {
    year: ['어머니사랑가득한유년기', '배움의기회풍부', '보호받으며성장'],
    month: ['직장에서멘토복', '학습을통한성장', '자격증/학위운', '귀인의도움'],
    day: ['배우자가자신을돌봐줌', '정신적안정', '내면의평화'],
    hour: ['말년에학문/배움', '자식이돌봐줌', '노후의평안']
  }
};

// ===========================================================
// ③ 격국 체감 키워드 (격국유형 + 신강/약 조합)
// ===========================================================
var GYEOKGUK_KW = {
  '비겁': {
    strong: ['자기주장매우강함', '남의말안들음', '독불장군', '경쟁심과다', '혼자다해결하려함', '주변을밀어냄'],
    weak: ['자기주장은있으나뒷받침부족', '의지는강하나체력이못따라감', '동료의도움이절실', '함께할때빛남']
  },
  '식상': {
    strong: ['표현력폭발', '말재주', '창의적아이디어넘침', '가만히있으면답답', '끊임없이뭔가를만들어냄', '예술적재능'],
    weak: ['표현하고싶으나자신감부족', '아이디어는많은데실행이약함', '속으로만삭임', '표현할기회를만들어야함']
  },
  '재성': {
    strong: ['현실감각뛰어남', '돈냄새를맡음', '실용적판단', '기회포착능력', '물질적성공지향', '재테크감각'],
    weak: ['돈에대한감각은있으나모으기어려움', '벌어도새나감', '재물의흐름이불안정', '안정적수입원확보필요']
  },
  '관성': {
    strong: ['외부압박속에서성장', '책임감무거움', '조직안에서두각', '통제받으면반발', '위기관리능력', '규율과자유사이긴장'],
    weak: ['세상이숙제를던지는데혼자풀기벅참', '압박은느끼는데대응할힘부족', '귀인이나보호막필요', '인성보강이용신']
  },
  '인성': {
    strong: ['학습능력뛰어남', '생각이많음', '학위나자격취득', '어머니영향큼', '정신세계풍부', '실행보다생각이앞섬'],
    weak: ['배움에목마르지만기회부족', '멘토가없는느낌', '혼자터득해야함', '보호막이약함', '학습환경만들어야함']
  }
};

// ===========================================================
// ⑤ 십성 간 관계 (주요 패턴 20가지)
// ===========================================================
var SIPSUNG_REL_KW = [
  {cond: function(c){return c['관성']>=2.0 && c['인성']<=1.2;}, kw: ['압박은많은데보호막이없음', '맨땅에헤딩', '스트레스해소구가없음', '혼자버텨야하는느낌']},
  {cond: function(c){return c['관성']>=2.0 && c['인성']>=1.8;}, kw: ['고난이성장의재료', '시련속에서배움', '위기때마다귀인등장', '고진감래형인생']},
  {cond: function(c){return c['관성']>=2.0 && c['식상']>=1.8;}, kw: ['압박받으면말로터뜨림', '참다가폭발', '표현이방어기제', '그런데그게재능이됨']},
  {cond: function(c){return c['관성']>=2.0 && c['비겁']<=1.2;}, kw: ['혼자감당해야함', '도와달라는말을못함', '외로운전쟁', '동료가절실']},
  {cond: function(c){return c['관성']>=2.0 && c['재성']>=1.8;}, kw: ['돈도벌어야하고시련도감당', '현실적압박이이중으로옴', '책임감+재물관리동시부담']},
  {cond: function(c){return c['식상']>=2.0 && c['재성']>=1.8;}, kw: ['재능이돈이됨', '창의력으로수익', '표현활동이곧사업', '아이디어를현금화하는능력']},
  {cond: function(c){return c['식상']>=2.0 && c['관성']>=1.8;}, kw: ['자유와규율의충돌', '표현하고싶은데눈치', '조직에서튀는사람', '독립해야편함']},
  {cond: function(c){return c['식상']>=2.0 && c['인성']<=1.2;}, kw: ['뱉기만하고채우지않음', '에너지소진주의', '학습보다행동이앞섬', '깊이보다속도']},
  {cond: function(c){return c['재성']>=2.0 && c['비겁']<=1.2;}, kw: ['돈은보이는데잡을힘이없음', '기회는오는데실행력부족', '재물이왔다가빠짐', '파트너와함께해야잡음']},
  {cond: function(c){return c['재성']>=2.0 && c['인성']<=1.2;}, kw: ['현실적이지만정신적허기', '돈은벌어도공허함', '바쁘지만의미를못찾음', '영혼의양식필요']},
  {cond: function(c){return c['비겁']>=2.0 && c['관성']<=1.2;}, kw: ['브레이크없는차', '거침없지만무모함', '충고를안들음', '스스로멈추는법을배워야함']},
  {cond: function(c){return c['비겁']>=2.0 && c['재성']>=1.8;}, kw: ['경쟁적으로돈을벌음', '동료와재물다툼', '공격적투자', '승부사형재테크']},
  {cond: function(c){return c['비겁']>=2.0 && c['식상']<=0.8;}, kw: ['에너지는넘치는데표현을못함', '속에서만끓음', '행동력은있으나방향이안잡힘']},
  {cond: function(c){return c['인성']>=2.0 && c['식상']<=1.2;}, kw: ['배우기만하고표현못함', '머릿속에만가득', '아는것을밖으로꺼내야함', '실행력보강필요']},
  {cond: function(c){return c['인성']>=2.0 && c['재성']<=1.2;}, kw: ['이상은높으나현실감각부족', '공부만하고돈을못벌음', '학자형', '현실적감각보강필요']},
  {cond: function(c){return c['인성']>=2.0 && c['관성']>=1.8;}, kw: ['살인상생', '위기를학습으로극복', '어려운환경이오히려스승', '시련이곧공부']},
  {cond: function(c){return c['식상']<=0.3 && c['관성']>=1.8;}, kw: ['표현통로가막힘', '답답함이쌓임', '말을못하고참음', '속앓이', '표현활동이해방구']},
  {cond: function(c){return c['비겁']<=0.3;}, kw: ['의지할곳이없음', '혼자서는한계명확', '에너지가빨리바닥남', '좋은동료가인생을바꿈']},
  {cond: function(c){return c['관성']<=0.3 && c['비겁']>=1.8;}, kw: ['제약이없어서오히려방향을잃음', '자유롭지만목표가흐릿', '외부자극이필요', '적당한압박이약이됨']},
  {cond: function(c){return c['재성']>=2 && c['관성']>=2 && c['인성']<=1.2;}, kw: ['현실과압박의이중고', '돈도벌어야하고스트레스도감당', '보호막없이전선에서있음']},
  {cond: function(c){return c['식상']>=2 && c['비겁']>=1.8;}, kw: ['에너지넘치는표현자', '주변이시끄러움', '활동적이고목소리큼', '열정이과할수있음']},
  {cond: function(c){return c['인성']>=2 && c['비겁']>=1.8;}, kw: ['자기확신이강함', '내가옳다는믿음', '학습+실행력동시보유', '주관이뚜렷한실력자']},
  {cond: function(c){return c['재성']<=0.3;}, kw: ['재물감각이약함', '돈에무관심하거나관리못함', '현실보다이상', '경제관념보강필요']},
  {cond: function(c){return c['인성']<=0.3;}, kw: ['보호막이없음', '멘토부재', '스스로터득해야함', '학습환경을만들어야함', '귀인을찾아야함']},
  // ★ 신규 통변 공식 15개 ★
  // 1. 상관견관 — 가장 유명한 명리 공식
  {cond: function(c){return c['식상']>=1 && c['관성']>=1 && (function(){var ss=c._raw||{};return (ss['상관']||0)>=1 && (ss['정관']||0)>=1;})();}, kw: ['상관견관: 반항아가체제를만남', '조직에서상사와마찰', '비합리적규칙에참지못함', '프리랜서·창업적합', '조직생활은답답']},
  // 2. 식신제살 — 최고 길한 조합
  {cond: function(c){return (c._raw&&(c._raw['식신']||0)>=1) && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['식신제살: 재능으로압박극복', '스트레스를작품으로승화', '마감압박에더좋은결과물', '힘든상황에서오히려빛남']},
  // 3. 살인상생 (편관+인성 세분화)
  {cond: function(c){return (c._raw&&(c._raw['편관']||0)>=1) && c['인성']>=1;}, kw: ['살인상생: 위기→학습→성장선순환', '고생이다실력이됨', '위기에멘토등장', '어려운프로젝트가레벨업기회']},
  // 4. 상관생재
  {cond: function(c){return (c._raw&&(c._raw['상관']||0)>=1) && c['재성']>=1;}, kw: ['상관생재: 창의력→재물연결', '말·글·솜씨로돈을벌수있는구조', '유튜버·작가·강사적합', '표현이곧수입']},
  // 5. 관인상생
  {cond: function(c){return (c._raw&&(c._raw['정관']||0)>=1) && c['인성']>=1;}, kw: ['관인상생: 안정적출세구조', '조직안에서승진정석', '자격증·학위가커리어에직접도움', '공무원·대기업·전문직적합']},
  // 6. 재관쌍미
  {cond: function(c){return c['재성']>=1 && c['관성']>=1 && c._strong;}, kw: ['재관쌍미: 부와명예동시가능', '사회적인정+경제적안정', '신강하여둘다감당가능', '이상적인사회적성공구조']},
  // 7. 관살혼잡
  {cond: function(c){return (c._raw&&(c._raw['편관']||0)>=1) && (c._raw&&(c._raw['정관']||0)>=1);}, kw: ['관살혼잡: 방향혼란', '두상사가다른지시', '직장을자주바꾸거나이직고민', '한쪽을확실히선택하면강해짐']},
  // 8. 비겁탈재
  {cond: function(c){return c['비겁']>=2 && c['재성']>=1;}, kw: ['비겁탈재: 재물경쟁', '주변에서빌려달라투자하자', '공동사업하면손해', '혼자하는사업이유리']},
  // 9. 재다신약
  {cond: function(c){return c['재성']>=2 && !c._strong;}, kw: ['재다신약: 기회는오나체력부족', '먹을건많은데소화못함', '건강이재물의열쇠', '욕심줄이고한가지에집중']},
  // 10. 인수과다
  {cond: function(c){return c['인성']>=3;}, kw: ['인수과다: 생각과다행동부족', '완벽주의→시작못함', '좀더준비하고가입버릇', '실행이최고의공부']},
  // 11. 식상생재 (식신 포함)
  {cond: function(c){return c['식상']>=1 && c['재성']>=1;}, kw: ['식상생재: 표현력→재물파이프라인', '꾸준한콘텐츠로수입', '재능의상업화가가능한구조']},
  // 12. 재성파인
  {cond: function(c){return c['재성']>=2 && c['인성']>=1;}, kw: ['재성파인: 돈이공부를방해', '돈벌이에바빠자기계발못함', '장기적성장이막힐수있음', '학습시간확보필요']},
  // 13. 식상토설 (과다 분출)
  {cond: function(c){return c['식상']>=3;}, kw: ['식상토설: 에너지과다분출', '말과표현이너무많아기운빠짐', 'SNS·수다·창작에에너지소진', '에너지관리가핵심과제']},
  // 14. 양인가살 (양인+편관) — 양인살 여부는 별도 체크 필요, 조건을 겁재+편관으로 근사
  {cond: function(c){return (c._raw&&(c._raw['겁재']||0)>=1) && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['양인가살: 극강추진력', '보통사람이쓰러질압박을즐김', '군인·외과의사·CEO적합', '제어못하면자기가다침']},
  // 15. 인성화살
  {cond: function(c){return c['인성']>=1 && (c._raw&&(c._raw['편관']||0)>=1);}, kw: ['인성화살: 지식으로위기해결', '어려울때책이나멘토에서답을찾음', '학문적해결능력', '배움이방패가되는구조']}
];


// ===========================================================
// ⑦ 합충형 체감 + 궁위 키워드
// ===========================================================

// 천간합 5종 의미
var CHEONGAN_HAP_KW = {
  '갑기합토': ['현실적으로뭉침', '목표를향해합심', '실용적파트너십', '안정을만들어냄'],
  '을경합금': ['부드러움과강함이만남', '유연함속결단력', '서로다른매력에끌림', '이성적끌림강함'],
  '병신합수': ['열정과냉철함이만남', '화려함이차분해짐', '감정이정제됨', '지혜로운변화'],
  '정임합목': ['감성과이성이합쳐져성장', '따뜻함이지혜를만남', '연애에서변화', '부드러워지는계기'],
  '무계합화': ['신뢰와감성이만남', '묵직함이유연해짐', '열정이피어남', '정적인사람이활발해짐']
};

// 궁위별 합의 의미
var HAP_GUNGWI_KW = {
  'year-month': ['성장환경과사회활동이자연스럽게연결', '부모의영향이직업으로이어짐', '가정과직장의조화'],
  'year-day': ['뿌리와자아가하나로', '태생적성향이현재삶에자연스럽게녹아있음', '원가족과의유대'],
  'year-hour': ['과거와미래가연결', '어린시절경험이말년에결실', '장기적인생설계가맞음'],
  'month-day': ['직장생활과내면이조화', '사회적자아와진짜자아가일치', '하는일이적성에맞음'],
  'month-hour': ['직업이노후로연결', '커리어의연속성', '일관된직업경로'],
  'day-hour': ['내면과결과물이일치', '하고싶은것과해야할것이같음', '자아실현가능']
};

// 지지충 6종 의미
var JIJI_CHUNG_KW = {
  '자오충': ['감정과이성의충돌', '마음과머리가다른방향', '관계에서급변', '큰감정적파도'],
  '축미충': ['재물의변동', '가치관충돌', '소유욕과나눔사이', '현실적갈등'],
  '인신충': ['이동과변화많음', '한곳에정착어려움', '직업적변동', '여행이나이사잦음', '교통사고주의'],
  '묘유충': ['대인관계충돌', '예리한갈등', '말로인한상처', '섬세한부분에서부딪힘'],
  '진술충': ['큰전환점', '가치관의근본적변화', '저장된것이터져나옴', '인생의리셋버튼'],
  '사해충': ['활동영역의충돌', '하던것을그만두고새로시작', '방향전환', '여행이나해외인연']
};

// 궁위별 충의 의미
var CHUNG_GUNGWI_KW = {
  'year-month': ['성장환경과직장이충돌', '부모가원하는것과내커리어가다름', '가정을떠나야성공'],
  'year-day': ['뿌리와자아가충돌', '원가족이슈', '고향을떠나야편함', '부모와의갈등', '태생적환경에서벗어나야성장'],
  'year-hour': ['과거와미래가충돌', '어린시절상처가말년에영향', '세대간갈등'],
  'month-day': ['직장과내면이충돌', '사회적역할과진짜하고싶은것이다름', '직업적전환욕구'],
  'month-hour': ['현재직업과미래비전이충돌', '커리어변경욕구', '하던일을그만두고싶은충동'],
  'day-hour': ['내면과결과물이불일치', '하고싶은것과실제산출물이다름', '자아실현에장애']
};

// 지지형 의미
var JIJI_HYUNG_KW = {
  '인사신': ['삼형살=끊임없는시련', '하나해결하면또다른문제', '강인해지지만상처도많음', '역경속성장'],
  '축술미': ['고집의충돌', '세가지가치관이부딪힘', '타협이어려움', '자기방식을고집', '외로운싸움'],
  '자묘': ['무례지형=예의없는갈등', '가까운사이에서상처', '친한사람에게받는상처', '버릇없는관계패턴'],
  '자형': ['자기자신과의싸움', '같은실수반복', '자기파괴적패턴주의', '스스로를가두는습관']
};

// ★ 천간충 의미
var CHEONGAN_CHUNG_KW = {
  '갑경충': ['강한외부충돌', '결단과갈등이동시에옴', '나무를베는칼날같은압박', '수술·이별·전환의에너지'],
  '을신충': ['섬세한갈등', '가위로자르듯예리한상처', '감정적인관계의단절', '예술적긴장감'],
  '병임충': ['열정과냉정의충돌', '폭풍우가불을끄는격', '감정의급격한기복', '이상vs현실의괴리'],
  '정계충': ['내면의미세한갈등', '이슬이촛불을끄듯은은히소멸', '감성적고갈', '정서적피로감']
};

// ★ 지지해(害) 의미
var JIJI_HAE_KW = {
  '자미해': ['가까운사이의은근한견제', '돕는척방해', '가족간미묘한갈등', '속마음을안보여줌'],
  '축오해': ['성과를깎아내리는방해', '노력해도인정못받는느낌', '금전적·정서적소모', '보이지않는경쟁'],
  '인사해': ['믿었던관계의배신감', '동업자와의미묘한불신', '가까운데서오는상처', '협력속의견제'],
  '묘진해': ['친한사이의질투와시기', '가까울수록날이서는관계', '형제·동료간미묘한경쟁', '감정적불화'],
  '신해해': ['파트너와의암묵적긴장', '협력하면서도속으로경쟁', '서로의영역침범', '공동작업시마찰'],
  '유술해': ['가까운사람과의불신', '편인데편하지않은관계', '사소한불만축적', '관계의피로감']
};


// ===========================================================
// ⑧ 대운 전환 체감 (이전 십성→현재 십성 전환 패턴)
// ===========================================================
var DW_TRANSITION_KW = {
  '비겁→비겁': ['경쟁과독립의연장선', '자기에너지가계속주인공', '체력관리가핵심', '같은에너지다른방향으로전환'],
  '비겁→식상': ['자기주장하던시기에서표현의시기로', '경쟁에서창작으로', '에너지방향이외부로확장'],
  '비겁→재성': ['독립에서현실로', '자기중심에서돈과관계로', '사업시작시기'],
  '비겁→관성': ['자유에서규율로', '갑자기책임이무거워짐', '조직안에서역할변화'],
  '비겁→인성': ['행동에서학습으로', '멈추고공부하는시기', '자기성찰'],
  '식상→식상': ['표현의전성기지속', '창작스타일이바뀜', '더넓은무대로', '깊어지는표현력'],
  '식상→비겁': ['표현에서경쟁으로', '창작에서생존으로', '현실의벽을만남'],
  '식상→재성': ['재능이돈이되기시작', '표현활동이수익으로', '아이디어의사업화'],
  '식상→관성': ['자유롭던시기에서제약이생김', '표현이억눌림', '조직적응필요'],
  '식상→인성': ['표현에서내면으로', '쏟아내다가채우는시기', '학습과성찰'],
  '재성→재성': ['재물이계속흘러듦', '투자방향전환', '재테크방식변화', '안정적축적기지속'],
  '재성→비겁': ['안정에서경쟁으로', '모은것을지켜야하는시기', '재물관리주의'],
  '재성→식상': ['현실에서창의로', '돈보다하고싶은일로', '새로운표현욕구'],
  '재성→관성': ['재물에서책임으로', '돈벌다가직위가올라감', '사회적역할확대'],
  '재성→인성': ['현실에서정신세계로', '물질보다내면', '가치관의전환'],
  '관성→관성': ['시련이계속됨', '인내의시기', '조직적도전지속', '이시기를버티면한단계성장'],
  '관성→비겁': ['규율에서독립으로', '조직을벗어남', '자기사업시작', '통제에서해방'],
  '관성→식상': ['압박에서표현으로', '억눌렸던것을터뜨림', '창의적해방기'],
  '관성→재성': ['책임에서현실수확으로', '노력의보상기', '안정적수입'],
  '관성→인성': ['시련에서배움으로', '고난이공부가됨', '귀인을만나는시기'],
  '인성→인성': ['학습이깊어지는시기', '공부방향전환', '새로운분야탐구', '정신적성숙가속'],
  '인성→비겁': ['배움에서실행으로', '드디어행동으로옮기는시기', '공부한것을써먹을때'],
  '인성→식상': ['학습에서창작으로', '배운것을표현', '전문성발휘'],
  '인성→재성': ['지식에서수익으로', '배운것이돈이됨', '현실적성공기'],
  '인성→관성': ['학습에서시련으로', '이론에서실전', '현실의냉정함을만남']
};

// ===========================================================
// ⑨ 나이대×대운 교차 키워드
// ===========================================================
var AGE_DW_KW = {
  '20대': {
    '비겁': ['또래와치열한경쟁', '자기정체성확립', '독립하려는욕구'],
    '식상': ['자기표현폭발', '진로탐색', '다양한시도', '끼발산'],
    '재성': ['일찍돈을벌기시작', '현실감각빠른발달', '또래보다성숙'],
    '관성': ['일찍사회적압박경험', '책임감이무거운20대', '조기성숙'],
    '인성': ['공부에몰입', '자격취득', '대학원이나유학', '멘토의영향']
  },
  '30대': {
    '비겁': ['동료와경쟁심화', '이직이나독립욕구', '자기사업꿈'],
    '식상': ['창의적전성기', '부업이나사이드프로젝트', '자기표현활발'],
    '재성': ['재산축적기', '결혼과가정경제', '투자시작', '현실적안정추구'],
    '관성': ['직장에서승진압박', '조직내정치', '책임감최고조'],
    '인성': ['자기계발몰입', '이직을위한학습', '육아와공부병행']
  },
  '40대': {
    '비겁': ['중년의정체성위기', '새로운경쟁', '제2의독립', '체력과의싸움'],
    '식상': ['인생2막표현', '취미가진로가됨', '중년의새로운도전'],
    '재성': ['재무적전성기', '부동산투자', '노후준비시작'],
    '관성': ['관리자역할', '조직의중심', '책임감무거움', '건강주의'],
    '인성': ['인생의의미를찾는시기', '공부재개', '정신적성숙']
  },
  '50대이후': {
    '비겁': ['노후자립', '새로운활동', '동년배와교류'],
    '식상': ['인생경험을표현', '멘토링', '창작활동'],
    '재성': ['노후재무관리', '안정적수입유지', '재산정리'],
    '관성': ['사회적역할변화', '은퇴압박', '건강관리필수'],
    '인성': ['지혜의시기', '후학양성', '정신적풍요']
  }
};

// ===========================================================
// ⑩ 지장간 정기의 숨은 십성 체감 키워드
// ===========================================================
var JIJANGGAN_HIDDEN_KW = {
  '비견': ['겉으로안보이지만내면에자기주장이숨어있음', '속으로는경쟁심이있음', '필요하면독립심발동'],
  '겁재': ['내면에재물경쟁심', '속으로소유욕이강함', '가까운사이에서은근히다툼'],
  '식신': ['겉으로안드러나지만내면에여유와즐거움', '속으로표현욕구가있음', '은근한먹을복'],
  '상관': ['내면에반항심', '속으로비판적', '겉은순해보여도속은날카로움', '숨겨진표현욕'],
  '편재': ['속으로사업욕구', '내면에투자감각', '겉으로안보이는재물감각'],
  '정재': ['내면에안정욕구', '속으로알뜰함', '저축본능', '은근한현실감각'],
  '편관': ['겉으로안보이지만내면에의무감', '쉬는중에도해야할것생각', '숨겨진책임감'],
  '정관': ['내면의질서의식', '속으로규칙적', '겉은자유로워보여도속은반듯'],
  '편인': ['숨겨진독창성', '내면의독학능력', '겉으로안보이는직감', '비밀스러운관심사'],
  '정인': ['내면의학습욕구', '속으로배움에목마름', '숨겨진지적호기심', '마음속멘토가있음']
};


// ===========================================================
// ② 일주 고유 키워드 (60일주 — 천간+지지 조합의 독특한 케미)
// 일간 키워드(①)와 다른 점: 같은 일간이라도 일지에 따라 달라지는 부분
// ===========================================================
var ILJU_KW = {
  // ── 갑(甲) 일간 ──
  '갑자': {core:['큰나무가깊은물위에앉음','지혜로운리더','속이깊고전략적','인기있음','학문적'],shadow:['고독감','겉과속이다름','감정숨김']},
  '갑인': {core:['큰나무가자기뿌리에앉음','자존감최강','순수한추진력','독립적','왕의기운'],shadow:['고집이과함','남의말안들음','독불장군']},
  '갑진': {core:['나무가비옥한땅에뿌리내림','재물복','안정된성장','실속있는리더십'],shadow:['욕심이생김','변화를두려워함','안주하려는경향']},
  '갑오': {core:['나무에불이붙음','화려한표현력','예술적','성급함','열정적리더'],shadow:['쉽게달아오르고쉽게꺼짐','인내력부족','감정적결정']},
  '갑신': {core:['나무가도끼를만남','자기변화능력','끊임없는자기혁신','결단력'],shadow:['자해적경향','자기를너무몰아붙임','스트레스']},
  '갑술': {core:['가을산의큰나무','고독한지도자','철학적','원칙주의','만년에빛남'],shadow:['외로움','융통성부족','사람을멀리함']},

  // ── 을(乙) 일간 ──
  '을축': {core:['겨울땅의풀','강인한생명력','역경속에서피어남','은근한끈기','현실적'],shadow:['환경이열악함','인정받기어려움','늦게피는꽃']},
  '을묘': {core:['봄날의꽃','매력적','예술적감수성','인기많음','사교적'],shadow:['의지력약함','환경에흔들림','결단력부족']},
  '을사': {core:['덩굴이불을만남','변신능력','적응의달인','영리함','임기응변'],shadow:['정체성혼란','어디에도뿌리못내림','불안정']},
  '을미': {core:['정원의꽃','안정된아름다움','가정적','내면이풍부','예술적자질'],shadow:['소심함','모험을안함','안전지대에머무름']},
  '을유': {core:['꽃이가위를만남','날카로운미적감각','완벽주의','세련됨'],shadow:['예민함','자기비판','타인에게도엄격']},
  '을해': {core:['겨울꽃','독특한매력','비주류','독립적사고','영적감수성'],shadow:['외로움','이해받기어려움','고립감']},

  // ── 병(丙) 일간 ──
  '병자': {core:['한밤의태양','내면에강한빛','모순적매력','역발상','지혜로운열정'],shadow:['갈등이많음','겉과속의괴리','감정기복']},
  '병인': {core:['봄날의태양','생명력넘침','따뜻한리더','만인의귀인','활력'],shadow:['자기과신','에너지소진','번아웃주의']},
  '병진': {core:['구름위의태양','큰그림을그림','비전가','사회적영향력'],shadow:['현실감부족','이상과현실괴리','실행력약함']},
  '병오': {core:['한여름태양','에너지최강','열정폭발','주목받는존재'],shadow:['과열위험','감정조절어려움','급한성격']},
  '병신': {core:['석양의태양','성숙한매력','결단력있는열정','실행력있는비전가'],shadow:['자기변화에대한두려움','완벽주의','자기의심']},
  '병술': {core:['가을해질녘','따뜻한카리스마','후배를챙김','만년에빛남'],shadow:['고독감','에너지하락','번아웃후회복느림']},

  // ── 정(丁) 일간 ──
  '정축': {core:['눈속의촛불','조용한끈기','차가운환경에서빛남','은밀한열정'],shadow:['표현이서투름','마음을잘안열음','내향적']},
  '정묘': {core:['봄밤의촛불','예술적감성','따뜻한분위기메이커','사랑스러운매력'],shadow:['감정에휘둘림','우유부단','의존적']},
  '정사': {core:['활활타오르는불','강한에너지','카리스마','두뇌회전빠름','승부욕'],shadow:['공격적일수있음','자기주장과함','조급함']},
  '정미': {core:['여름밤의촛불','따뜻한가정인','포용력','음식솜씨','안정추구'],shadow:['변화를두려워함','소극적','안전지대에안주']},
  '정유': {core:['보석위의촛불','섬세한아름다움','완벽주의','미적감각탁월'],shadow:['예민함','자기비판심함','완벽하지않으면불안']},
  '정해': {core:['바다위의등대','방향을제시하는사람','비전+감성','독립적인영혼'],shadow:['외로움','이해받지못하는느낌','방황가능']},

  // ── 무(戊) 일간 ──
  '무자': {core:['강가의큰산','풍요와안정','재물감각','현실적리더십'],shadow:['물질에집착','감정보다현실','냉정해보임']},
  '무인': {core:['숲속의큰산','성장하는안정','나무가자라는산','발전적'],shadow:['느림','변화에저항','보수적']},
  '무진': {core:['광활한대지','큰그릇','포용력최강','리더의그릇'],shadow:['고집셈','움직이지않으려함','무거움']},
  '무오': {core:['화산','내면에열정품은산','묵직한카리스마','뜨거운신념'],shadow:['한번터지면걷잡을수없음','분노조절','고집+열정=독단']},
  '무신': {core:['광산','내면에보석을품은산','실속있음','현실적결단력'],shadow:['냉정함','이익중심','감정표현부족']},
  '무술': {core:['사막의큰산','고독한위엄','원칙의화신','변치않는신념'],shadow:['융통성없음','고독','외로운정상']},

  // ── 기(己) 일간 ──
  '기축': {core:['겨울논밭','축적의달인','묵묵히모으는사람','인내력최강'],shadow:['재미없어보임','보수적','변화싫어함']},
  '기묘': {core:['봄정원','사람키우는능력','세심한배려','따뜻한관리자'],shadow:['남을챙기다자기못챙김','과도한배려','번아웃']},
  '기사': {core:['뜨거운밭','열정적기획자','실행력있는세심함','사업감각'],shadow:['급함','완벽주의','자기를몰아붙임']},
  '기미': {core:['여름논밭','풍요로운기획자','결실을만듦','현실적풍요'],shadow:['고집','자기방식고수','변화거부']},
  '기유': {core:['가을정원','세련된관리자','미적감각+실용성','깔끔함'],shadow:['예민한잔소리','과도한기준','타인에게엄격']},
  '기해': {core:['겨울정원','깊은내면','지혜로운관리자','영적감수성'],shadow:['우울경향','감정에잠김','외로움']},

  // ── 경(庚) 일간 ──
  '경자': {core:['물속의칼','지혜로운결단','냉철하지만깊은생각','전략적승부사'],shadow:['감정이차가워보임','외로움','계산적이라는오해']},
  '경인': {core:['숲속의바위','개혁자','기존것을부수고새것을세움','혁명적'],shadow:['파괴적일수있음','주변과충돌','급진적']},
  '경진': {core:['흙속의금','숨은실력자','때를기다리는승부사','큰그릇'],shadow:['드러나지않는답답함','인정욕구','기다림의고통']},
  '경오': {core:['용광로의쇠','단련된강철','시련으로강해지는사람','불속에서빛남'],shadow:['감정기복','자기를너무몰아붙임','극단적']},
  '경신': {core:['순수한쇠','칼같은판단','정의로움','직설적','결단력최강'],shadow:['융통성없음','냉정','독선적일수있음']},
  '경술': {core:['가을바위','원숙한결단력','경험에서오는지혜','만년에빛남'],shadow:['고독','완고함','변화거부']},

  // ── 신(辛) 일간 ──
  '신축': {core:['흙속의보석','세공이필요한원석','늦게빛나는재능','숨겨진아름다움'],shadow:['초반에고생','인정받기어려움','인내가필요']},
  '신묘': {core:['봄의보석','화사한매력','사교적','예술적재능','인기'],shadow:['속이여림','겉은화려하나내면불안','의존적']},
  '신사': {core:['불에단련된금','강한의지','시련으로빛나는보석','변신능력'],shadow:['극적인생','기복큼','안정이어려움']},
  '신미': {core:['정원의보석','안정된아름다움','세련되고따뜻함','미적감각'],shadow:['안주하려함','변화두려움','도전정신부족']},
  '신유': {core:['순수한보석','자기기준확고','날카로운심미안','완벽주의'],shadow:['자기비판심함','타인에게날카로움','외로움']},
  '신해': {core:['바다의진주','깊은내면의아름다움','독립적','신비로운매력'],shadow:['감정에잠김','고립','이해받기어려움']},

  // ── 임(壬) 일간 ──
  '임자': {core:['깊은바다','지혜의극치','포용력최강','전략가','흐름을읽는달인'],shadow:['너무깊어서외로움','감정바다에빠짐','방향을잃을수있음']},
  '임인': {core:['숲속의큰강','생명력넘치는물','만물을키우는힘','교육자질'],shadow:['에너지분산','집중력약함','이것저것손댐']},
  '임진': {core:['호수','재물감각뛰어남','현실적지혜','안정적풍요'],shadow:['욕심이생김','안전지대안주','모험회피']},
  '임오': {core:['뜨거운물','열정적인지혜','감성과이성의공존','독특한매력'],shadow:['내면갈등','감정과이성충돌','기복큼']},
  '임신': {core:['폭포','강한추진력','시원시원한결단','장애물을뚫는힘'],shadow:['급함','주변을배려못할수있음','독단적']},
  '임술': {core:['마른땅위의깊은물','외유내강','고독한개척자','위기에오히려각성','타협을모르는끈기'],shadow:['고독','감정표현서투름','완벽주의피로','주변에벽을세움']},

  // ── 계(癸) 일간 ──
  '계축': {core:['겨울의이슬','조용한축적','인내의결정체','묵묵한실력자'],shadow:['우울경향','드러나지않는답답함','감정표현어려움']},
  '계묘': {core:['봄비','만물을살리는감성','치유능력','따뜻한교감'],shadow:['감정에쉽게잠김','상처받기쉬움','경계가약함']},
  '계사': {core:['온천','뜨거운물','변화의감성','영리한직감','적응력'],shadow:['정체성혼란','감정기복','안정이어려움']},
  '계미': {core:['여름비','풍요로운감성','따뜻한돌봄','가정적'],shadow:['소심함','의존적','스스로결정못내림']},
  '계유': {core:['이슬맺힌보석','섬세한아름다움','날카로운직감','미적감각'],shadow:['예민함','자기비판','완벽주의']},
  '계해': {core:['끝없는바다','직감력극대화','영적감수성','깊은감정의세계'],shadow:['감정의늪','우울경향','현실도피','방향상실']}
};

// 전부 core+shadow 있는지 확인
var missing = [];
Object.keys(ILJU_KW).forEach(function(k){
  if(!ILJU_KW[k].core || !ILJU_KW[k].shadow) missing.push(k);
});

// ===========================================================
// 동적 키워드 생성 함수
// ===========================================================
function formatKeywordsForAI(kwObj) {
  if (!kwObj || typeof kwObj !== 'object') return '';
  var lines = [];
  Object.keys(kwObj).forEach(function(key) {
    var val = kwObj[key];
    if (Array.isArray(val)) {
      lines.push('- ' + key + ': ' + val.join(', '));
    } else if (typeof val === 'string') {
      lines.push('- ' + key + ': ' + val);
    }
  });
  return lines.join('\n');
}

function generateDynamicKeywords(saju, gg, dw, gm, jjgRatio) {
  var result = {};
  var dm = saju.dm;           // 일간 글자 (갑,을,병...)
  var ilju = saju.P[2].s + saju.P[2].b;  // 일주 (임술 등)
  var isStrong = gg.strong;   // 신강/신약

  // ① 일간 본질 키워드
  if (ILGAN_KW[dm]) {
    result['일간본질'] = isStrong ? ILGAN_KW[dm].strong : ILGAN_KW[dm].weak;
  }

  // ② 일주 고유 키워드
  if (ILJU_KW[ilju]) {
    result['일주특성'] = ILJU_KW[ilju].core;
    result['일주그림자'] = ILJU_KW[ilju].shadow;
  }

  // ③ 격국 체감 키워드
  var dominant = gg.dominant[0]; // 가장 강한 십성 그룹
  if (GYEOKGUK_KW[dominant]) {
    result['격국체감'] = isStrong ? GYEOKGUK_KW[dominant].strong : GYEOKGUK_KW[dominant].weak;
  }

  // ④ 십성의 궁위 배치 키워드
  var gungwiKW = [];
  var pillars = ['year','month','day','hour'];
  var pillarNames = ['년주','월주','일지','시주'];
  saju.ss.forEach(function(s, i) {
    var ssName = s.ss; // 비견, 식신, 편관 등
    var pillar = pillars[i];
    if (SIPSUNG_GUNGWI_KW[ssName] && SIPSUNG_GUNGWI_KW[ssName][pillar]) {
      var kws = SIPSUNG_GUNGWI_KW[ssName][pillar];
      gungwiKW.push(pillarNames[i] + ' ' + ssName + ': ' + kws.slice(0,2).join(', '));
    }
  });
  if (gungwiKW.length > 0) result['십성궁위'] = gungwiKW;

  // ⑤ 십성 간 관계 키워드
  var relKW = [];
  // 실수값 십성 비중 사용
  var sCnt = {};
  var grps = ['비겁','식상','재성','관성','인성'];
  grps.forEach(function(g){ sCnt[g] = gg.cnt[g] || 0; });
  // ★ 개별 십성 카운트 (_raw) + 신강 여부 (_strong) 추가 (통변 공식용)
  var rawSS = {};
  saju.ss.forEach(function(s){if(s.ss && s.pillar!=='일주'){rawSS[s.ss]=(rawSS[s.ss]||0)+1;}});
  sCnt._raw = rawSS;
  sCnt._strong = gg.strong;
  
  SIPSUNG_REL_KW.forEach(function(r) {
    if (r.cond(sCnt)) {
      relKW = relKW.concat(r.kw);
    }
  });
  if (relKW.length > 15) relKW = relKW.slice(0, 15);
  if (relKW.length > 0) result['십성관계'] = relKW;

  // ⑥ 오행 과부족 체감 키워드
  var ohKW = [];
  var ohs = ['목','화','토','금','수'];
  ohs.forEach(function(oh) {
    var cnt = saju.el[oh] || 0;
    if (cnt === 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(0): ' + OHENG_KW[oh].zero.slice(0,2).join(', '));
    } else if (cnt >= 3 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '과다): ' + OHENG_KW[oh].excess.slice(0,2).join(', '));
    } else if (cnt <= 1 && cnt > 0 && OHENG_KW[oh]) {
      ohKW.push(oh + '(' + cnt + '부족): ' + OHENG_KW[oh].lack.slice(0,2).join(', '));
    }
  });
  if (ohKW.length > 0) result['오행밸런스'] = ohKW;

  // ⑦ 합충형 체감 키워드
  var hapchungKW = [];
  // 천간합
  var ganPairs = [
    [saju.P[0].s, saju.P[1].s, 'year-month'],
    [saju.P[0].s, saju.P[2].s, 'year-day'],
    [saju.P[1].s, saju.P[2].s, 'month-day'],
    [saju.P[2].s, saju.P[3].s, 'day-hour']
  ];
  var hapMap = {'갑기':'갑기합토','기갑':'갑기합토','을경':'을경합금','경을':'을경합금',
                '병신':'병신합수','신병':'병신합수','정임':'정임합목','임정':'정임합목',
                '무계':'무계합화','계무':'무계합화'};
  ganPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (hapMap[key] && CHEONGAN_HAP_KW[hapMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('합: ' + hapMap[key] + '(' + gungwi + ') — ' + CHEONGAN_HAP_KW[hapMap[key]].slice(0,2).join(', '));
      if (HAP_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + HAP_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  // 지지충
  var jiPairs = [
    [saju.P[0].b, saju.P[1].b, 'year-month'],
    [saju.P[0].b, saju.P[2].b, 'year-day'],
    [saju.P[0].b, saju.P[3].b, 'year-hour'],
    [saju.P[1].b, saju.P[2].b, 'month-day'],
    [saju.P[1].b, saju.P[3].b, 'month-hour'],
    [saju.P[2].b, saju.P[3].b, 'day-hour']
  ];
  var chungMap = {'자오':'자오충','오자':'자오충','축미':'축미충','미축':'축미충',
                  '인신':'인신충','신인':'인신충','묘유':'묘유충','유묘':'묘유충',
                  '진술':'진술충','술진':'진술충','사해':'사해충','해사':'사해충'};
  jiPairs.forEach(function(p) {
    var key = p[0]+p[1];
    if (chungMap[key] && JIJI_CHUNG_KW[chungMap[key]]) {
      var gungwi = p[2];
      hapchungKW.push('충: ' + chungMap[key] + '(' + gungwi + ') — ' + JIJI_CHUNG_KW[chungMap[key]].slice(0,2).join(', '));
      if (CHUNG_GUNGWI_KW[gungwi]) {
        hapchungKW.push('  궁위의미: ' + CHUNG_GUNGWI_KW[gungwi].slice(0,2).join(', '));
      }
    }
  });
  if (hapchungKW.length > 0) result['합충체감'] = hapchungKW;

  // ⑦-b 지지형(刑) 탐지
  var hyungKW = [];
  var allJi = saju.P.map(function(p){return p.b;});
  // 인사신 삼형
  if (allJi.indexOf('인')>=0 && allJi.indexOf('사')>=0 && allJi.indexOf('신')>=0) {
    hyungKW.push('삼형살(인사신): ' + JIJI_HYUNG_KW['인사신'].slice(0,2).join(', '));
  } else {
    // 인사, 사신, 인신 부분형
    [['인','사'],['사','신'],['인','신']].forEach(function(pair){
      if(allJi.indexOf(pair[0])>=0 && allJi.indexOf(pair[1])>=0){
        hyungKW.push('부분형('+pair[0]+pair[1]+'): 갈등의씨앗, 시련속성장');
      }
    });
  }
  // 축술미 삼형
  if (allJi.indexOf('축')>=0 && allJi.indexOf('술')>=0 && allJi.indexOf('미')>=0) {
    hyungKW.push('삼형살(축술미): ' + JIJI_HYUNG_KW['축술미'].slice(0,2).join(', '));
  }
  // 자묘 무례지형
  if (allJi.indexOf('자')>=0 && allJi.indexOf('묘')>=0) {
    hyungKW.push('무례지형(자묘): ' + JIJI_HYUNG_KW['자묘'].slice(0,2).join(', '));
  }
  // 자형 (같은 지지 2개 이상)
  var jiCount = {};
  allJi.forEach(function(j){jiCount[j]=(jiCount[j]||0)+1;});
  Object.keys(jiCount).forEach(function(j){
    if(jiCount[j]>=2){
      hyungKW.push('자형('+j+j+'): ' + JIJI_HYUNG_KW['자형'].slice(0,2).join(', '));
    }
  });
  if (hyungKW.length > 0) {
    if (result['합충체감']) {
      result['합충체감'] = result['합충체감'].concat(hyungKW);
    } else {
      result['합충체감'] = hyungKW;
    }
  }

  // ★ ⑦-b2 천간충 키워드
  var ganPairs = [];
  var ganLabels = ['연간','월간','일간','시간'];
  var allGan = saju.P.map(function(p){return p.s;});
  for(var gi=0;gi<allGan.length;gi++)for(var gj=gi+1;gj<allGan.length;gj++){
    ganPairs.push([allGan[gi],allGan[gj],ganLabels[gi]+'-'+ganLabels[gj]]);
  }
  var cheonganChungMap={'갑경':'갑경충','경갑':'갑경충','을신':'을신충','신을':'을신충','병임':'병임충','임병':'병임충','정계':'정계충','계정':'정계충'};
  var ccKW=[];
  ganPairs.forEach(function(p){
    var key=p[0]+p[1];
    if(cheonganChungMap[key]&&CHEONGAN_CHUNG_KW[cheonganChungMap[key]]){
      ccKW.push('천간충: '+cheonganChungMap[key]+'('+p[2]+') — '+CHEONGAN_CHUNG_KW[cheonganChungMap[key]].slice(0,2).join(', '));
    }
  });
  if(ccKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(ccKW);
    else result['합충체감']=ccKW;
  }

  // ★ ⑦-b3 지지해(害) 키워드
  var haeMap={'자미':'자미해','미자':'자미해','축오':'축오해','오축':'축오해','인사':'인사해','사인':'인사해','묘진':'묘진해','진묘':'묘진해','신해':'신해해','해신':'신해해','유술':'유술해','술유':'유술해'};
  var haeKW=[];
  jiPairs.forEach(function(p){
    var key=p[0]+p[1];
    if(haeMap[key]&&JIJI_HAE_KW[haeMap[key]]){
      haeKW.push('해(害): '+haeMap[key]+'('+p[2]+') — '+JIJI_HAE_KW[haeMap[key]].slice(0,2).join(', '));
    }
  });
  if(haeKW.length>0){
    if(result['합충체감']) result['합충체감']=result['합충체감'].concat(haeKW);
    else result['합충체감']=haeKW;
  }

  // ⑦-c 삼합 탐지
  var samhapSets = [
    {ji:['신','자','진'],oh:'수국',kw:'지혜와적응력의삼합, 물의에너지결집'},
    {ji:['해','묘','미'],oh:'목국',kw:'성장과추진력의삼합, 나무의에너지결집'},
    {ji:['인','오','술'],oh:'화국',kw:'열정과표현력의삼합, 불의에너지결집'},
    {ji:['사','유','축'],oh:'금국',kw:'결단력과실행의삼합, 금의에너지결집'}
  ];
  samhapSets.forEach(function(sh){
    var cnt = 0;
    sh.ji.forEach(function(j){if(allJi.indexOf(j)>=0) cnt++;});
    if(cnt >= 3){
      if(!result['합충체감']) result['합충체감'] = [];
      result['합충체감'].push('삼합('+sh.oh+'): '+sh.kw);
    }
  });

  // ⑧ 대운 전환 체감
  if (dw.daewoons && dw.currentDWIdx >= 1) {
    var prevDW = dw.daewoons[dw.currentDWIdx - 1];
    var currDW = dw.daewoons[dw.currentDWIdx];
    if (prevDW && currDW) {
      // 십성 그룹 매핑
      var ssToGroup = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                       '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                       '편인':'인성','정인':'인성'};
      var prevG = ssToGroup[prevDW.ss] || prevDW.ss;
      var currG = ssToGroup[currDW.ss] || currDW.ss;
      var transKey = prevG + '→' + currG;
      if (DW_TRANSITION_KW[transKey]) {
        result['대운전환'] = [prevDW.ss + '운→' + currDW.ss + '운: ' + DW_TRANSITION_KW[transKey].join(', ')];
      }
    }
  }

  // ⑨ 나이×대운 교차
  if (dw.currentAge && dw.daewoons && dw.currentDWIdx >= 0) {
    var age = dw.currentAge;
    var ageGroup = age < 30 ? '20대' : age < 40 ? '30대' : age < 50 ? '40대' : '50대이후';
    var currDW2 = dw.daewoons[dw.currentDWIdx];
    if (currDW2) {
      var ssToGroup2 = {'비견':'비겁','겁재':'비겁','식신':'식상','상관':'식상',
                        '편재':'재성','정재':'재성','편관':'관성','정관':'관성',
                        '편인':'인성','정인':'인성'};
      var dwGroup = ssToGroup2[currDW2.ss] || currDW2.ss;
      if (AGE_DW_KW[ageGroup] && AGE_DW_KW[ageGroup][dwGroup]) {
        result['나이대운'] = [age + '세 ' + ageGroup + '+' + currDW2.ss + '운: ' + AGE_DW_KW[ageGroup][dwGroup].join(', ')];
      }
    }
  }

  // ⑩ 지장간 정기의 숨은 십성
  if (jjgRatio) {
    var hiddenKW = [];
    jjgRatio.forEach(function(r) {
      if (!r) return;
      // 정기(마지막 item)의 십성
      var jeonggi = r.items[r.items.length - 1];
      if (jeonggi && JIJANGGAN_HIDDEN_KW[jeonggi.ss]) {
        hiddenKW.push(r.pillar + ' ' + r.ji + ' 정기(' + jeonggi.ss + '): ' + JIJANGGAN_HIDDEN_KW[jeonggi.ss][0]);
      }
    });
    if (hiddenKW.length > 0) result['숨은십성'] = hiddenKW;
  }

  // ⑪ 12운성 체감 (일지 기준)
  var iljiUns = saju.uns[2]; // 일지 12운성
  if (iljiUns && UNSUNG_KW[iljiUns]) {
    result['일지운성'] = ['일지 ' + iljiUns + ': ' + UNSUNG_KW[iljiUns].join(', ')];
  }

  // ★ 조후(온도) 체감 키워드
  if (gg.johuDesc) {
    result['조후체감'] = [gg.seasonName + ': ' + gg.johuDesc];
  } else if (gg.seasonName) {
    var deukTxt = gg.deukryeong ? '일간이 계절의 힘을 받아 에너지가 넘침' : '일간이 계절에서 힘을 잃어 외부 도움이 필요';
    result['조후체감'] = [gg.seasonName + ': ' + deukTxt];
  }

  // ⑫ 공망 궁위별 체감
  if (gm && gm.empty && gm.empty.length > 0) {
    var gmKW = [];
    var jiToPillar = {};
    saju.P.forEach(function(p, i) {
      jiToPillar[p.b] = pillars[i];
    });
    gm.empty.forEach(function(e) {
      if (jiToPillar[e] && GONGMANG_GUNGWI_KW[jiToPillar[e]]) {
        gmKW.push(e + '(' + pillarNames[pillars.indexOf(jiToPillar[e])] + '공망): ' + GONGMANG_GUNGWI_KW[jiToPillar[e]].slice(0,2).join(', '));
      }
    });
    if (gmKW.length > 0) result['공망체감'] = gmKW;
  }

  // ⑬ 적천수 십간론 — 일간의 물상·본질·위험
  if (JEOKCHEONSU[dm]) {
    var jc = JEOKCHEONSU[dm];
    result['적천수물상'] = [jc.title];
    result['적천수본질'] = [isStrong ? jc.strong_img : jc.weak_img];
    result['적천수연애'] = [jc.love];
    result['적천수직업'] = [jc.work];
    result['적천수위험'] = [jc.danger];
  }

  // ⑭ 자평진전 격국론 — 격국의 사회적 역할 + 파격 조건
  var ggName = gg.gyeokgukName || '';
  var jpKey = '';
  // 격국명에서 자평진전 키 매칭
  ['식신격','상관격','편재격','정재격','편관격','정관격','편인격','정인격','건록격','양인격'].forEach(function(gk) {
    if (ggName.indexOf(gk) >= 0) jpKey = gk;
  });
  if (jpKey && JAPYEONG_GG[jpKey]) {
    var jp = JAPYEONG_GG[jpKey];
    result['격국역할'] = [jp.role];
    result['격국성격'] = [jp.intact];
    // 파격 조건 체크 — 현재 사주에 해당하는 파격이 있는지 확인
    var breakKW = [];
    jp.breaks.forEach(function(br) {
      // 효신탈식: 편인 있고 식신 있음
      if (br.cond.indexOf('효신탈식') >= 0 && sCnt._raw['편인'] && sCnt._raw['식신']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 상관견관: 상관 있고 정관 있음
      else if (br.cond.indexOf('상관견관') >= 0 && sCnt._raw['상관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 관살혼잡: 편관+정관 동시
      else if (br.cond.indexOf('관살혼잡') >= 0 && sCnt._raw['편관'] && sCnt._raw['정관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 겁재 탈재/파재: 겁재 있고 편재/정재 있음
      else if ((br.cond.indexOf('겁재 탈재') >= 0 || br.cond.indexOf('겁재 파재') >= 0) && sCnt._raw['겁재'] && (sCnt._raw['편재'] || sCnt._raw['정재'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 비견 쟁재: 비견 있고 편재 있음
      else if (br.cond.indexOf('비견 쟁재') >= 0 && sCnt._raw['비견'] && sCnt._raw['편재']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 식상 혼잡: 식신+상관 동시
      else if (br.cond.indexOf('식상 혼잡') >= 0 && sCnt._raw['식신'] && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 인성 제압: 편인 or 정인이 상관을 극
      else if (br.cond.indexOf('인성 제압') >= 0 && (sCnt._raw['편인'] || sCnt._raw['정인']) && sCnt._raw['상관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 재성 파인: 재성이 인성을 극
      else if (br.cond.indexOf('재성 파인') >= 0 && (sCnt._raw['편재'] || sCnt._raw['정재']) && (sCnt._raw['편인'] || sCnt._raw['정인'])) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 편인 과다
      else if (br.cond.indexOf('편인 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 인성 과다
      else if (br.cond.indexOf('인성 과다') >= 0 && gg.cnt['인성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 비겁 과다
      else if (br.cond.indexOf('비겁 과다') >= 0 && gg.cnt['비겁'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 과다한 식신: 식상 과다
      else if (br.cond.indexOf('과다한 식신') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 상관 과다
      else if (br.cond.indexOf('상관 과다') >= 0 && gg.cnt['식상'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 편관 과다
      else if (br.cond.indexOf('편관 과다') >= 0 && gg.cnt['관성'] >= 3) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 제어 없는 칠살/양인: 편관 있는데 식신 없음
      else if (br.cond.indexOf('제어 없는') >= 0 && sCnt._raw['편관'] && !sCnt._raw['식신'] && !sCnt._raw['편인']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 신약 편관: 신약이고 편관 있음
      else if (br.cond.indexOf('신약 편관') >= 0 && !isStrong && sCnt._raw['편관']) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      // 관성/재성 부재
      else if (br.cond.indexOf('관성 부재') >= 0 && gg.cnt['관성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
      else if (br.cond.indexOf('재성 부족') >= 0 && gg.cnt['재성'] < 0.5) {
        breakKW.push('⚠ ' + br.cond + ': ' + br.desc);
      }
    });
    if (breakKW.length > 0) result['격국파격'] = breakKW;
  }

  return result;
}

// ===========================================================
// 물상(物象) 매핑 상수 — B안: 키워드를 자연물 이미지로 변환
// ===========================================================
var CHEONGAN_MULSANG = {
  '갑':'큰 나무','을':'꽃과 덩굴','병':'태양','정':'촛불',
  '무':'큰 산','기':'논밭','경':'바위','신':'보석','임':'큰 강','계':'빗물'
};
var JIJI_MULSANG = {
  '자':'깊은 밤의 물웅덩이','축':'얼어붙은 논밭','인':'이른 봄 숲속',
  '묘':'활짝 핀 봄꽃밭','진':'봄비 내리는 습한 흙','사':'뜨거운 여름 한낮',
  '오':'한여름 타오르는 불꽃','미':'무르익은 여름 정원','신':'서리 내린 가을 바위산',
  '유':'가을 달빛 아래 보석','술':'낙엽 진 메마른 들판','해':'겨울 초입의 차가운 바다'
};
var WOLJI_SEASON = {
  '인':'이른 봄, 새싹이 움트는 계절','묘':'완연한 봄, 꽃이 만개하는 계절',
  '진':'늦봄, 비 내려 땅이 촉촉한 환절기','사':'초여름, 뜨거운 기운이 시작되는 계절',
  '오':'한여름, 가장 뜨거운 계절','미':'늦여름, 무르익은 열기의 끝자락',
  '신':'초가을, 서늘한 바람이 부는 계절','유':'완연한 가을, 결실을 맺는 계절',
  '술':'늦가을, 낙엽 지는 메마른 계절','해':'초겨울, 차가운 물이 깊어지는 계절',
  '자':'한겨울, 가장 깊고 고요한 계절','축':'늦겨울, 봄을 준비하는 마지막 추위'
};
var OHENG_MULSANG = {
  '목':'나무/바람/새싹','화':'불/빛/열기','토':'흙/산/대지',
  '금':'바위/쇠/칼/제방','수':'물/비/강/바다'
};
var HAP_MULSANG = {
  '갑기합토':'나무가 흙에 뿌리 내리듯 결합 → 안정과 결실을 만드는 힘',
  '을경합금':'꽃이 바위에 기대듯 결합 → 부드러움과 단단함의 만남',
  '병신합수':'태양이 바위에 반사되어 물이 되듯 → 열정이 지혜로 변환',
  '정임합목':'촛불이 강물을 만나 나무가 되듯 → 따뜻함과 지혜가 생명력으로',
  '무계합화':'산이 빗물을 받아 불을 피우듯 → 무거운 안정감이 열정으로 변환'
};
var CHUNG_MULSANG = {
  '자오충':'깊은 밤 물과 한낮 불이 정면충돌 → 감정과 열정이 극단적으로 요동',
  '축미충':'겨울 논밭과 여름 정원이 부딪힘 → 저축과 소비, 안정과 변화의 갈등',
  '인신충':'봄 숲과 가을 바위산이 부딪힘 → 성장 욕구와 현실 제약의 충돌',
  '묘유충':'봄꽃과 가을 보석이 부딪힘 → 감성과 이성, 부드러움과 날카로움의 긴장',
  '진술충':'습한 흙과 메마른 들판이 부딪힘 → 발밑이 흔들리는 불안정, 뿌리가 안정되지 못함',
  '사해충':'여름 한낮과 겨울 바다가 부딪힘 → 뜨거운 야망과 차가운 현실의 대립'
};
var GUNGWI_LABEL = {
  'year':'연주(어린시절/뿌리)','month':'월주(사회/직업)',
  'day':'일지(내면/배우자)','hour':'시주(미래/자녀/말년)',
  'year-month':'어린시절↔사회','year-day':'뿌리↔내면',
  'year-hour':'어린시절↔미래','month-day':'사회↔내면',
  'month-hour':'사회↔미래','day-hour':'내면↔미래'
};

// ===========================================================
// 물상 기반 키워드 텍스트 생성 함수 (B안)
// ===========================================================
function generateMulsangText(saju, gg, dynKW) {
  var lines = [];
  var dm = saju.dm; // 일간
  var ilji = saju.P[2].b; // 일지
  var wolji = saju.P[1].b; // 월지

  // ── 1. 원국 풍경 ──
  lines.push('### 원국 풍경 (이 이미지를 기반으로 풀이의 비유를 만드세요)');
  var mainImage = (WOLJI_SEASON[wolji]||'') + '. ';
  mainImage += (JIJI_MULSANG[ilji]||'') + ' 위의 ' + (CHEONGAN_MULSANG[dm]||dm) + '.';
  lines.push(mainImage);

  // 일간+월지 조합 풍경 묘사
  var dmMul = CHEONGAN_MULSANG[dm]||dm;
  var wolMul = JIJI_MULSANG[wolji]||wolji;
  var iljiMul = JIJI_MULSANG[ilji]||ilji;
  lines.push('주인공(' + dmMul + ')이 ' + wolMul + '의 계절을 살고 있고, 발을 딛고 있는 땅은 ' + iljiMul + '.');

  // 신강/신약 풍경
  if (gg.strong) {
    lines.push('→ ' + dmMul + '의 힘이 넘침. 주변을 압도하는 존재감.');
  } else {
    lines.push('→ ' + dmMul + '의 힘이 약함. 주변 환경에서 도움이 필요한 상태.');
  }
  lines.push('');

  // ── 2. 궁위별 풍경 ──
  lines.push('### 사주의 네 기둥 (각 기둥을 자연물 이미지로)');
  var pillarLabels = ['연주(어린시절/뿌리)','월주(사회/직업)','일주(나 자신)','시주(미래/말년)'];
  saju.P.forEach(function(p, i) {
    var stemMul = CHEONGAN_MULSANG[p.s]||p.s;
    var branchMul = JIJI_MULSANG[p.b]||p.b;
    var ss = saju.ss[i] ? saju.ss[i].ss : '';
    lines.push('- ' + pillarLabels[i] + ': ' + stemMul + '이(가) ' + branchMul + ' 위에');
    // 십성 의미를 물상으로 변환
    var ssDesc = '';
    if (ss.indexOf('비견')>=0||ss.indexOf('겁재')>=0) ssDesc = '→ 나와 비슷한 에너지, 경쟁/동료의 기운';
    else if (ss.indexOf('식신')>=0||ss.indexOf('상관')>=0) ssDesc = '→ 내가 표현하고 창작하는 에너지, 재능과 끼의 기운';
    else if (ss.indexOf('편재')>=0||ss.indexOf('정재')>=0) ssDesc = '→ 현실적 재물과 관계의 에너지, 돈과 사람의 기운';
    else if (ss.indexOf('편관')>=0||ss.indexOf('정관')>=0) ssDesc = '→ 규율과 책임의 에너지, 직장과 권위의 기운';
    else if (ss.indexOf('편인')>=0||ss.indexOf('정인')>=0) ssDesc = '→ 배움과 보호의 에너지, 지식과 어머니의 기운';
    if (ssDesc) lines.push('  ' + ssDesc);
  });

  var lines = [];
  var order = ['적천수물상','적천수본질','적천수연애','적천수직업','적천수위험',
               '격국역할','격국성격','격국파격',
               '일간본질','일주특성','일주그림자','격국체감','조후체감','십성궁위',
               '십성관계','오행밸런스','합충체감','대운전환','나이대운',
               '숨은십성','일지운성','공망체감'];
  order.forEach(function(key) {
    if (kw[key] && kw[key].length > 0) {
      var vals = Array.isArray(kw[key][0]) ? kw[key] : kw[key];
      lines.push('- ' + key + ': ' + vals.join(', '));
    }
  });
  return lines.join('\n');
}



function mkFB(saju,mt,gg){
  var ti=TY[mt]||{n:"탐험가",cf:"Ni-Te-Fi-Se"},dm=saju.dm,dmEl=saju.dmEl,cf=(ti.cf||"Ni-Te-Fi-Se").split("-");
  var ilju=saju.P[2].s+saju.P[2].b;
  var iljuD=ILJU_DATA[ilju]||{k:dm+'의 에너지',t:'독특한 기질의 소유자',love:'배우자궁의 기운에 따라 다채로운 연애사',job:'다방면 적성'};
  gg=gg||analyzeGyeokguk(saju);
  var rel=calcRelations(saju);

  /* ─── Phase 0: MBTI 강도 프로파일 로드 ─── */
  var mi0=miKey(0),mi1=miKey(1),mi2=miKey(2),mi3=miKey(3);
  var miShorts=[mi0.short,mi1.short,mi2.short,mi3.short].join(' + ');

  /* ─── Phase 1: 심층 분석 ─── */
  var hasSS=function(t){return saju.ss.some(function(s){return s.ss&&s.ss.indexOf(t)>=0;});};
  var ssAt=function(t){return saju.ss.filter(function(s){return s.ss&&s.ss.indexOf(t)>=0;}).map(function(s){return s.pillar;});};
  var ssCount=function(t){return saju.ss.filter(function(s){return s.ss&&s.ss.indexOf(t)>=0;}).length;};

  var dayBrSS=saju.ss[2]?saju.ss[2].ss:'';
  var dayUns=saju.uns[2]||'';
  var dayStrongUns=['건록','제왕','관대','장생'].indexOf(dayUns)>=0;
  var dayJjg=saju.jjg[2]||[];
  var dayJjgMain=dayJjg.length>0?dayJjg[dayJjg.length-1]:{stem:'',oh:''};

  var ySS=saju.ss[0]?saju.ss[0].ss:'';
  var mSS=saju.ss[1]?saju.ss[1].ss:'';
  var hSS=saju.ss[3]?saju.ss[3].ss:'';

  var hasChung=rel.jijiChung.length>0;
  var hasHap=rel.jijiHap.length>0||rel.cheonganHap.length>0;
  var hasHyung=rel.jijiHyung.length>0;
  var hasSamhap=rel.jijiSamhap.length>0;

  var salGood=saju.specialSals.filter(function(s){return s.type==='good';});
  var salBad=saju.specialSals.filter(function(s){return s.type==='bad';});
  var hasDohwa=salBad.some(function(s){return s.name.indexOf('도화')>=0;});
  var hasYeokma=saju.specialSals.some(function(s){return s.name.indexOf('역마')>=0;});
  var hasBaekho=salBad.some(function(s){return s.name.indexOf('백호')>=0;});
  var hasGuiin=salGood.some(function(s){return s.name.indexOf('귀인')>=0;});

  var ggType=gg.strong?'신강':'신약';
  var _lk=gg.lack.length>0?gg.lack[0]:'';
  var _ex=gg.dominant[0];
  var elArr=Object.entries(saju.el);
  var elMax=elArr.reduce(function(a,b){return b[1]>a[1]?b:a;});
  var elZero=elArr.filter(function(e){return e[1]===0;}).map(function(e){return e[0];});

  var eiL=ST.ch[0]==="L"?"외향":"내향";
  var snL=ST.ch[1]==="L"?"감각":"직관";
  var tfL=ST.ch[2]==="L"?"사고":"감정";
  var jpL=ST.ch[3]==="L"?"판단":"인식";

  // 특징 점수화: 무엇이 이 사람의 가장 두드러진 포인트인가
  var feat={};
  feat.chungStrong = rel.jijiChung.length>=2;
  feat.chungSingle = rel.jijiChung.length===1;
  feat.hapRich = (rel.jijiHap.length+rel.cheonganHap.length+rel.jijiSamhap.length)>=2;
  feat.sikSangStrong = ssCount('식신')+ssCount('상관')>=2;
  feat.gwanStrong = ssCount('편관')+ssCount('정관')>=2;
  feat.jaeStrong = ssCount('편재')+ssCount('정재')>=2;
  feat.inStrong = ssCount('편인')+ssCount('정인')>=2;
  feat.biStrong = ssCount('비견')+ssCount('겁재')>=2;
  feat.elZeroMulti = elZero.length>=2;
  feat.fireHeavy = saju.el['화']>=3;
  feat.waterHeavy = saju.el['수']>=3;
  feat.woodHeavy = saju.el['목']>=3;
  feat.metalHeavy = saju.el['금']>=3;
  feat.earthHeavy = saju.el['토']>=3;
  feat.dohwaMulti = saju.specialSals.filter(function(s){return s.name.indexOf('도화')>=0;}).length>=2;

  /* ─── Phase 2: 톤 세팅 (오행별 문체) ─── */
  var tone={};
  if(dmEl==='화'){
    tone.adj='뜨거운'; tone.verb='타오르는'; tone.energy='불꽃'; tone.crisis='폭발';
    tone.calm='재가 된 뒤의 고요'; tone.metaphor='숯불처럼 겉은 잔잔해도 속은 달궈져 있는';
    tone.style='직관적이고 열정적인';
  }else if(dmEl==='수'){
    tone.adj='깊은'; tone.verb='흘러가는'; tone.energy='파도'; tone.crisis='범람';
    tone.calm='깊은 호수의 정적'; tone.metaphor='잔잔한 수면 아래 거대한 해류가 흐르는';
    tone.style='유연하고 통찰력 있는';
  }else if(dmEl==='목'){
    tone.adj='성장하는'; tone.verb='뻗어나가는'; tone.energy='새싹'; tone.crisis='꺾임';
    tone.calm='뿌리 깊은 나무의 평온'; tone.metaphor='바람에 흔들려도 꺾이지 않는';
    tone.style='진취적이고 생명력 넘치는';
  }else if(dmEl==='금'){
    tone.adj='날카로운'; tone.verb='벼려지는'; tone.energy='칼날'; tone.crisis='부러짐';
    tone.calm='명경지수의 고요함'; tone.metaphor='천 번을 두드려야 완성되는 명검 같은';
    tone.style='결단력 있고 정밀한';
  }else{
    tone.adj='묵직한'; tone.verb='품어내는'; tone.energy='대지'; tone.crisis='지진';
    tone.calm='광야의 침묵'; tone.metaphor='아무리 밟혀도 결국 모든 것을 키워내는';
    tone.style='안정적이고 포용력 있는';
  }

  var _lkDir={"목":"동쪽","화":"남쪽","토":"중앙","금":"서쪽","수":"북쪽"};
  var _lkColor={"목":"초록색","화":"빨간색/주황색","금":"흰색/은색","수":"검정/남색","토":"노란색/베이지"};
  var _lkExercise={"목":"산책·등산·스트레칭","화":"러닝·댄스·핫요가","토":"요가·필라테스·맨몸운동","금":"웨이트·수영·호흡운동","수":"수영·명상·산책"};
  var _lkFood={"목":"신맛(식초,레몬,매실)","화":"쓴맛(커피,다크초콜릿,쑥)","토":"단맛(꿀,고구마,대추)","금":"매운맛(생강,마늘,고추)","수":"짠맛(미역,다시마,해산물)"};
  var elN={"목":"나무","화":"불꽃","토":"대지","금":"칼날","수":"물결"};

  /* ─── Phase 3: 섹션 빌더 - 내용 먼저, 소제목은 내용에서 추출 ─── */

  // ===================================
  // ITEM 1: 본질 — 일주의 핵심 이미지에서 출발
  // ===================================
  var i1_body = ilju+"일주. 사주학에서 이 조합을 '<b>"+iljuD.k+"</b>'라고 부릅니다.\n\n"

  +dm+"("+TGAN[saju.raw.dg]+") 일간이 "+saju.P[2].b+"("+JIJI[saju.raw.dj]+") 위에 앉아있는 형상인데, 이걸 풀어보면 이렇습니다. "+iljuD.t
  +" 12운성으로는 <b>"+dayUns+"</b>에 해당해요. "
  +(dayUns==='건록'?"건록은 녹봉을 받는 자리 — 스스로 먹고살 힘이 있다는 뜻이에요. 남에게 의지하기보다 자기 힘으로 길을 여는 사람입니다."
  :dayUns==='제왕'?"제왕은 에너지가 정점에 오른 상태 — 강렬하고, 존재감이 압도적이지만, 정점 다음은 하강이라는 걸 기억해야 합니다. 달도 차면 기우는 법이니까요."
  :dayUns==='관대'?"관대는 사회에 나가 관을 쓴 상태 — 인정받고 싶은 욕구가 강하고, 실제로 사회적 활동에서 빛을 발합니다."
  :dayUns==='장생'?"장생은 새로 태어나는 에너지 — 어떤 분야든 시작의 힘이 강하고, 꾸준히 성장해가는 기운을 타고났습니다."
  :dayUns==='목욕'?"목욕은 갓 태어나 씻기는 단계 — 변화와 변동 속에서 자기를 재발견하는 기운. 연애나 관계에서 파란이 있을 수 있지만, 그만큼 깊은 경험을 합니다."
  :dayUns==='쇠'?"쇠는 전성기가 지나 안정에 접어드는 단계 — 겉으로는 조용하지만, 경험에서 우러나오는 내공이 있는 사람입니다."
  :dayUns==='병'?"병(病)은 에너지가 약해지는 지점이지만, 역설적으로 감수성과 직관력이 극대화되는 자리예요. 예술가형 기질."
  :dayUns==='사'?"사(死)는 겉으로 소멸하는 단계지만, 사주학에서는 '극적인 전환'을 뜻합니다. 평범한 삶이 아닌 드라마틱한 인생을 사는 구조."
  :dayUns==='묘'?"묘(墓)는 저장과 축적의 자리 — 겉으로 드러내지 않지만 속에 엄청난 것들을 쌓아두는 사람. 한번 터지면 폭발적입니다."
  :dayUns==='절'?"절(絶)은 끊어짐의 자리이자 새로운 시작의 씨앗 — 인생에서 급격한 전환을 여러 번 겪지만, 매번 다시 태어나는 불사조 같은 기운."
  :dayUns==='태'?"태(胎)는 잉태의 에너지 — 무언가 새로운 것을 품고 키워내는 힘이 있습니다. 가능성의 사람이에요."
  :"양(養)은 자라나는 에너지 — 성장 곡선이 완만하지만 멈추지 않는 사람. 나이가 들수록 빛나는 구조입니다.")+"\n\n"

  +"이제 사주 전체를 펼쳐볼게요. 일지의 지장간 속에는 "+dayJjg.map(function(j){return j.stem+"("+j.oh+") "+j.days+"일";}).join(', ')+"이 숨어있어요. "
  +(dayJjgMain.stem?"정기(正氣)인 <b>"+dayJjgMain.stem+"("+dayJjgMain.oh+")</b>가 "+dayBrSS+"을 만들어내는데, 이건 당신이 배우자나 가장 가까운 사람에게 보이는 '진짜 속마음'의 에너지입니다. "
  +(dayBrSS.indexOf('비견')>=0||dayBrSS.indexOf('겁재')>=0?"배우자궁에 비겁이라 동등한 관계를 원하고, 의존하거나 의존당하는 것을 거부하는 자아가 단단한 구조예요."
  :dayBrSS.indexOf('식신')>=0?"배우자궁에 식신이라 다정하고 표현력 있는 에너지가 속에서 흘러나옵니다. 가까운 사람에겐 한없이 따뜻한 사람."
  :dayBrSS.indexOf('상관')>=0?"배우자궁에 상관이라 솔직하고 때로는 날카로운 내면. 가까운 사람에게 가장 진솔한 모습을 보이지만, 그게 때로는 상처가 되기도 합니다."
  :dayBrSS.indexOf('편재')>=0?"배우자궁에 편재라 활동적이고 변화를 즐기는 내면. 관계에서도 새로움을 추구하고, 자유를 중시합니다."
  :dayBrSS.indexOf('정재')>=0?"배우자궁에 정재라 현실적이고 안정을 추구하는 내면. 가정을 단단히 지키려는 본능이 있어요."
  :dayBrSS.indexOf('편관')>=0?"배우자궁에 편관이라 내면에 긴장감과 추진력이 공존합니다. 스스로를 끊임없이 채찍질하는 구조."
  :dayBrSS.indexOf('정관')>=0?"배우자궁에 정관이라 질서와 체면을 중시하는 내면. 품격있는 관계를 추구합니다."
  :dayBrSS.indexOf('편인')>=0?"배우자궁에 편인이라 독창적이고 비범한 내면. 일반적이지 않은 생각과 관심사를 품고 있어요."
  :"배우자궁에 정인이라 지적이고 따뜻한 내면. 배움과 깊은 대화를 통해 에너지를 얻는 구조입니다."):"")
  +"\n\n"

  +"\n\nMBTI 프로파일을 볼게요. 당신은 <b>"+miShorts+"</b>의 조합이에요.\n"
  +"<b>"+mi0.short+"</b>: "+mi0.trait+"\n"
  +"<b>"+mi1.short+"</b>: "+mi1.trait+"\n"
  +"<b>"+mi2.short+"</b>: "+mi2.trait+"\n"
  +"<b>"+mi3.short+"</b>: "+mi3.trait+"\n\n"
  +"여기에 <b>"+mt+"("+ti.n+")</b>의 주기능 "+cf[0]+"이 얹어집니다. "
  +(cf[0]==='Ne'?"Ne는 '이것도 되고 저것도 될 수 있어'라며 끝없이 가능성을 탐색하는 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 상상력이 현실에 발을 딛고 폭발합니다."
  :cf[0]==='Ni'?"Ni는 '이건 결국 이렇게 될 거야'라는 직관의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 예언자적 통찰력이 됩니다."
  :cf[0]==='Se'?"Se는 '지금 이 순간을 온몸으로 느끼자'는 감각의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 현실을 생생하게 살아가는 힘이 됩니다."
  :cf[0]==='Si'?"Si는 '과거의 경험을 촘촘히 기억하고 활용한다'는 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 안정적이면서도 깊이있는 판단력이 됩니다."
  :cf[0]==='Fe'?"Fe는 '주변 사람들의 감정을 읽고 조율하는' 공감의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 사람을 이끄는 카리스마가 됩니다."
  :cf[0]==='Fi'?"Fi는 '내 안의 가치관과 감정에 충실한' 깊은 자기 탐구의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 대체불가능한 진정성이 됩니다."
  :cf[0]==='Te'?"Te는 '논리적으로 체계를 세우고 효율을 추구하는' 실행의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 아이디어를 현실로 만드는 추진력이 됩니다."
  :"Ti는 '독립적으로 원리를 파고드는' 분석의 기능이에요. "+ilju+"일주의 "+tone.adj+" 기질과 만나면, 남들이 놓치는 본질을 꿰뚫는 눈이 됩니다.");

  // 소제목: 일주 이미지 + 실제 12운성에서 파생
  var i1_catch = iljuD.k+", "+dayUns+"에 앉은 "+tone.energy+": "+ilju+"일주가 세상을 사는 법";

  // ===================================
  // ITEM 2: 사주 원국 전체 구조 — 합충형이 핵심 서사
  // ===================================
  var i2_body = "사주 원국의 네 기둥을 나란히 세워보겠습니다.\n\n"
  +"<b>연주 "+saju.P[0].s+saju.P[0].b+"("+ySS+")</b> — 조상과 유년기의 환경, 세상이 당신을 보는 첫인상.\n"
  +"<b>월주 "+saju.P[1].s+saju.P[1].b+"("+mSS+")</b> — 부모와 청년기, 사회적 자아의 뿌리.\n"
  +"<b>일주 "+ilju+"("+dayBrSS+")</b> — 당신 자신, 배우자궁, 가장 진짜인 '나'.\n"
  +"<b>시주 "+saju.P[3].s+saju.P[3].b+"("+hSS+")</b> — 자녀운, 말년, 그리고 당신이 세상에 남기는 것.\n\n";

  // 합충형 서사 — 단순 나열이 아닌 스토리
  if(hasChung){
    var chDesc=rel.jijiChung.map(function(c){return c.desc;}).join(', ');
    i2_body += "가장 먼저 눈에 들어오는 건 <b>"+chDesc+"</b>입니다.\n\n"
    +"충(沖)이란 정반대 에너지가 정면충돌하는 것이에요. ";
    rel.jijiChung.forEach(function(ch){
      var a=ch.a,b=ch.b;
      i2_body += a.l+"의 "+JIJI_KR[a.v]+"와 "+b.l+"의 "+JIJI_KR[b.v]+"가 팽팽하게 대립하고 있는데, ";
      if((a.l==='연지'&&b.l==='월지')||(a.l==='월지'&&b.l==='연지'))
        i2_body += "이건 유년기~청년기 환경에서 갈등이나 급격한 변화가 있었을 가능성을 보여줍니다. 부모님의 이사, 전학, 혹은 가정 환경의 변동. ";
      else if((a.l==='월지'&&b.l==='일지')||(a.l==='일지'&&b.l==='월지'))
        i2_body += "이건 사회적 자아와 본질적 자아 사이의 긴장이에요. '회사에서의 나'와 '집에서의 나'가 꽤 다를 수 있고, 이 간극이 스트레스의 원인이 됩니다. ";
      else if((a.l==='일지'&&b.l==='시지')||(a.l==='시지'&&b.l==='일지'))
        i2_body += "이건 자아와 자녀/미래 사이의 충돌이에요. 자기가 원하는 삶과 자녀에 대한 책임 사이에서 갈등하거나, 중년 이후 삶의 방향이 크게 바뀌는 구조. ";
      else if((a.l==='연지'&&b.l==='시지')||(a.l==='시지'&&b.l==='연지'))
        i2_body += "이건 뿌리(과거)와 미래의 충돌이에요. 원래 자라온 환경과 완전히 다른 방향으로 인생이 전개되는 구조. ";
      else
        i2_body += "이 충돌은 삶에서 주기적으로 '깨짐과 재건'의 패턴을 만듭니다. ";
    });
    i2_body += "\n\n하지만 충은 나쁜 것만이 아닙니다. <b>충이 있는 사주는 변화의 에너지가 있다</b>는 뜻이에요. 아무 일도 안 일어나는 평탄한 삶 대신, 극적인 전환과 도약이 있는 삶. 문제는 이 에너지를 '파괴'가 아닌 '혁신'으로 쓸 수 있느냐입니다.";
  }

  if(hasHap){
    i2_body += "\n\n";
    if(rel.cheonganHap.length>0){
      i2_body += "천간에서 <b>"+rel.cheonganHap.map(function(h){return h.desc;}).join(', ')+"</b>이 형성되어 있어요. 천간합은 의지와 방향의 결합이에요. "
      +rel.cheonganHap.map(function(h){
        return h.a.l+"의 "+TGAN_KR[h.a.v]+"와 "+h.b.l+"의 "+TGAN_KR[h.b.v]+"가 만나 "+h.oh+"로 변하려는 힘이 작용합니다. "
        +(h.a.l==='일간'?"특히 일간이 합에 참여하면 관계에 의해 자기 정체성이 변할 수 있어요. 좋은 인연을 만나면 완전히 달라지는 사람.":"이 합은 해당 영역에서 조화와 결합의 에너지를 만듭니다.");
      }).join(' ');
    }
    if(rel.jijiHap.length>0){
      i2_body += "\n지지에서는 <b>"+rel.jijiHap.map(function(h){return h.desc;}).join(', ')+"</b>이 보여요. 지지육합은 실제 생활에서의 결합 — 사업 파트너, 배우자, 깊은 인연의 만남을 암시합니다.";
    }
    if(rel.jijiSamhap.length>0){
      i2_body += "\n특히 <b>"+rel.jijiSamhap.map(function(h){return h.desc;}).join(', ')+"</b>이 형성되어 있는데, 삼합은 세 개의 지지가 하나의 오행으로 뭉치는 강력한 결합이에요. "+rel.jijiSamhap[0].oh+" 에너지가 크게 강화됩니다.";
    }
  }

  if(hasHyung){
    i2_body += "\n\n또 하나 주목할 것은 <b>"+rel.jijiHyung.map(function(h){return h.desc;}).join(', ')+"</b>이에요. "
    +"형(刑)은 '상처를 주는 관계'인데, ";
    var hyType=rel.jijiHyung[0].type;
    i2_body += (hyType==='무은지형'?"무은지형은 '은혜를 잊는 형벌' — 가까운 사람에게 상처를 주거나 받는 패턴. 은인이 원수가 되거나 그 반대의 일이 생길 수 있어요."
    :hyType==='지세지형'?"지세지형은 '권세를 믿고 무리하는 형벌' — 능력을 과신하다 넘어지는 패턴에 주의."
    :hyType==='자형'?"자형은 스스로를 해치는 에너지 — 자기 비판이 지나치거나, 완벽주의가 스스로를 옥죄는 패턴."
    :hyType==='무례지형'?"무례지형은 예의를 벗어나는 충동 — 순간적인 감정에 의한 행동이 관계를 해칠 수 있어요."
    :"은혜지형은 은혜와 배신이 교차하는 복잡한 관계의 패턴.")+"\n\n"
    +"이 형의 에너지는 삶에서 반복되는 특정 패턴으로 나타납니다. 같은 유형의 갈등이 다른 상대와 반복된다면, 상대의 문제가 아니라 이 원국 구조의 에너지가 작동하는 것일 수 있어요.";
  }

  if(!hasChung&&!hasHap&&!hasHyung){
    i2_body += "네 기둥 사이에 큰 충돌이나 결합 없이 각자 자기 역할을 하는 구조예요. 드라마틱한 파란은 적지만, 그만큼 안정적으로 자기 길을 걸어가는 사주입니다. 대운(大運)에서 들어오는 외부 에너지가 변화의 열쇠가 됩니다.";
  }

  i2_body += "\n\n오행 분포는 "+elArr.map(function(e){return e[0]+' <b>'+e[1]+'</b>';}).join(', ')+"입니다. "
  +(elZero.length>0?"<b>"+elZero.join(', ')+"이 원국에 없어요.</b> 이건 그 기운을 의식적으로 채워야 한다는 뜻입니다.":"전체적으로 고르게 분포되어 있어요.")
  +" "+ggType+"("+(_ex==='비겁'?'자기 에너지가 강한':_ex==='식상'?'표현·창작 에너지가 강한':_ex==='재성'?'현실·재물 에너지가 강한':_ex==='관성'?'통제·규율 에너지가 강한':'학습·사색 에너지가 강한')+") 구조이고, 용신(가장 필요한 오행)은 <b>"+gg.yongshin+"</b>입니다."
  +"\n\n이 원국 구조를 "+mi1.short+"의 눈으로 보면 — "+mi1.trait+" 그래서 같은 사주라도 "+mi1.short+" 성향에서는 "+(ST.ch[1]==="R"?"오행의 흐름을 직관적으로 느끼고 큰 그림에서 해석합니다.":"오행의 구체적 작용을 하나하나 체감하며 현실에서 확인합니다.");

  // 소제목: 가장 두드러진 관계(합/충/형)에서 파생
  var i2_catch = hasChung ? rel.jijiChung.map(function(c){return c.desc;}).join('과 ')+", 부딪혀야 빛나는 사주: 원국 전체 해부"
    : hasHyung ? rel.jijiHyung[0].desc+"의 그림자: 반복되는 패턴의 근원"
    : hasHap ? (rel.cheonganHap.length>0?rel.cheonganHap[0].desc:rel.jijiHap.length>0?rel.jijiHap[0].desc:rel.jijiSamhap[0].desc)+", 끌어당기는 인연의 구조"
    : "고요한 사주, 대운이 열쇠다: 네 기둥의 안정적 배치";

  // ===================================
  // ITEM 3: 십성 배치가 말하는 성격의 결
  // ===================================
  var domSS = _ex; // dominant 십성 카테고리
  var i3_body = "십성(十星)은 사주의 각 글자가 일간과 맺는 관계예요. 일종의 '역할표'인데, 당신의 역할표를 보면:\n\n"
  +"연주 "+saju.P[0].s+saju.P[0].b+": <b>"+ySS+"</b> — "+sspDesc(ySS,'연주')+"\n"
  +"월주 "+saju.P[1].s+saju.P[1].b+": <b>"+mSS+"</b> — "+sspDesc(mSS,'월주')+"\n"
  +"일주 "+ilju+": <b>"+dayBrSS+"</b> — "+sspDesc(dayBrSS,'일주')+"\n"
  +"시주 "+saju.P[3].s+saju.P[3].b+": <b>"+hSS+"</b> — "+sspDesc(hSS,'시주')+"\n\n"

  +"이 배치에서 가장 눈에 띄는 건 <b>"+domSS+"이 강하다</b>는 점이에요. "
  +(domSS==='비겁'?"비겁 과다는 '내가 최고'라는 자부심이자 고집입니다. "+mt+"의 "+cf[0]+"이 여기에 "+tone.adj+" 확신을 더하면, 한번 정한 건 잘 안 바꿉니다. 이건 장점이기도 하지만, 남의 말에 귀를 닫는 순간 독선이 됩니다."
  :domSS==='식상'?"식상 과다는 '표현하지 않으면 죽는' 사람이에요. 머릿속 아이디어가 끊이지 않고, 입이 가만히 있질 못합니다. "+mt+"의 "+cf[0]+"이 이 표현 욕구에 방향을 줘서, 제대로 터지면 창작자·기획자·인플루언서로 빛나지만, 분산되면 뭐 하나 끝내지 못합니다."
  :domSS==='재성'?"재성 과다는 '현실이 전부'인 사람이에요. 꿈과 이상보다 당장의 효율과 결과를 추구합니다. "+mt+"의 "+cf[0]+"이 이 현실 감각과 만나면 탁월한 실행력이 되지만, 때로는 '돈 되는 일만 하다가 정작 하고 싶은 건 못 하는' 함정에 빠집니다."
  :domSS==='관성'?"관성 과다는 '규칙을 지켜야 안심이 되는' 사람이에요. 사회적 평판, 체면, 질서에 민감합니다. "+mt+"의 "+cf[0]+"이 이 성향과 만나면 조직 안에서 빠르게 인정받지만, 자기 욕구를 과도하게 억누르는 패턴이 생길 수 있어요."
  :"인성 과다는 '생각이 너무 많은' 사람이에요. 행동하기 전에 열 번을 고민하고, 완벽하게 준비된 후에야 움직입니다. "+mt+"의 "+cf[0]+"이 이 성향에 깊이를 더하지만, '분석 마비(analysis paralysis)'에 빠지기 쉬운 구조이기도 합니다.")+"\n\n"

  +(feat.sikSangStrong?"특히 식상이 2개 이상 있는 건 <b>표현의 별이 쌍으로 떠있는</b> 구조예요. "+ssAt('식신').concat(ssAt('상관')).join(', ')+"에 식상이 자리하고 있는데, 이 사람이 말을 안 하고 살 수는 없습니다. 블로그든, 유튜브든, 회의에서의 발언이든 — 표현의 출구가 반드시 필요합니다."
  :feat.gwanStrong?"관성이 2개 이상 있는 건 <b>외부의 시선과 기대가 두 겹으로 쌓인</b> 구조예요. 사회적으로 인정받는 삶을 살 가능성이 높지만, 그만큼 스스로에게 가혹한 기준을 세우기도 합니다."
  :feat.jaeStrong?"재성이 2개 이상 있는 건 <b>현실 감각의 레이더가 두 개</b>인 구조예요. 기회를 포착하는 눈이 뛰어나고, 여러 수입원을 만들 수 있는 잠재력이 있습니다."
  :feat.inStrong?"인성이 2개 이상 있는 건 <b>학습과 사색의 엔진이 쌍으로 돌아가는</b> 구조예요. 뭔가 배우고 있을 때 가장 행복하고, 전문성이 깊어질수록 빛나는 사람입니다."
  :feat.biStrong?"비겁이 2개 이상 있는 건 <b>자기 에너지가 매우 강한</b> 구조예요. 독립성이 뛰어나지만, 협력보다 단독 플레이를 선호하는 경향이 있습니다."
  :"각 십성이 고르게 분포되어 다재다능한 구조예요. 어떤 역할이든 적응할 수 있는 유연성이 있습니다.")
  +"\n\n"+mi2.short+" 성향이 이 십성 구조 위에 얹어지면 — "+mi2.trait+" 이건 사주의 "+domSS+" 에너지와 "+( ST.ch[2]==="L"?"논리적 프레임이 결합되어, 판단이 명쾌한 대신 타인의 감정을 놓칠 수 있는 구조":"감정적 깊이가 결합되어, 공감력은 뛰어나지만 객관적 판단이 흐려질 수 있는 구조")+"입니다.";

  var i3_catch = domSS==='식상' ? "입을 열면 세상이 움직인다: "+ssAt('식신').concat(ssAt('상관')).join('·')+"의 식상 에너지가 그리는 당신의 표현법"
    : domSS==='비겁' ? "내 길은 내가 간다: "+saju.P.filter(function(p,i){return saju.ss[i]&&(saju.ss[i].ss.indexOf('비견')>=0||saju.ss[i].ss.indexOf('겁재')>=0);}).map(function(p){return p.s+p.b;}).join('·')+"이 만드는 독립의 기질"
    : domSS==='재성' ? "기회를 냄새로 맡는 사람: 재성이 그리는 현실 감각의 지도"
    : domSS==='관성' ? "무거운 왕관을 쓴 자의 고독: 관성이 말하는 책임과 인정 사이"
    : "생각의 바다가 너무 깊으면: 인성이 만드는 지혜와 우유부단의 경계";

  // ===================================
  // ITEM 4: 겉과 속의 괴리 — 연주 vs 일지
  // ===================================
  var gapExists = ySS !== dayBrSS;
  var i4_body = "";
  if(gapExists){
    i4_body = "세상이 당신을 처음 만났을 때 느끼는 에너지는 연주의 <b>"+ySS+"</b>이에요. "
    +(ySS.indexOf('비견')>=0||ySS.indexOf('겁재')>=0?"첫인상이 '자기 주관이 확실한 사람'."
    :ySS.indexOf('식신')>=0||ySS.indexOf('상관')>=0?"첫인상이 '말 잘하고 재치있는 사람'."
    :ySS.indexOf('편재')>=0||ySS.indexOf('정재')>=0?"첫인상이 '현실적이고 능력있는 사람'."
    :ySS.indexOf('편관')>=0||ySS.indexOf('정관')>=0?"첫인상이 '믿음직하고 진중한 사람'."
    :"첫인상이 '차분하고 지적인 사람'.")
    +"\n\n그런데 일지(진짜 속마음)에는 <b>"+dayBrSS+"</b>이 앉아있어요. "
    +(dayBrSS.indexOf('비견')>=0||dayBrSS.indexOf('겁재')>=0?"속마음은 '아무도 나를 지배할 수 없다'는 강한 독립심."
    :dayBrSS.indexOf('식신')>=0||dayBrSS.indexOf('상관')>=0?"속마음은 '진짜 하고 싶은 말이 너무 많다'는 표현 욕구."
    :dayBrSS.indexOf('편재')>=0||dayBrSS.indexOf('정재')>=0?"속마음은 '이건 내 것이다'라는 강한 소유·획득 욕구."
    :dayBrSS.indexOf('편관')>=0||dayBrSS.indexOf('정관')>=0?"속마음은 '나를 더 채찍질해야 해'라는 자기 통제 욕구."
    :"속마음은 '좀 더 알고 싶다, 좀 더 이해하고 싶다'는 깊은 탐구 욕구.")
    +"\n\n이 간극이 만들어내는 현상: 밖에서는 "+ySS+" 에너지로 행동하지만, 집에 돌아오면 "+dayBrSS+" 에너지로 전환됩니다. 가장 가까운 사람들이 '너 밖에서랑 집에서랑 완전 다른 사람이야'라고 말할 수 있어요.\n\n"
    +mt+"의 구조도 이 간극을 증폭시킵니다. "+cf[0]+"(주기능)은 세상에 보여주는 도구이고, "+cf[3]+"(열등기능)은 감추고 싶은 약점이에요. <b>사주의 겉("+ySS+") + MBTI의 겉("+cf[0]+") = 사람들이 아는 당신.</b> <b>사주의 속("+dayBrSS+") + MBTI의 속("+cf[3]+") = 당신만 아는 당신.</b>\n\n"
    +"이 구조가 나쁜 게 아닙니다. "+tone.metaphor+" 구조 — 겉의 힘과 속의 깊이를 동시에 가진 거예요. 문제는 이 간극이 너무 벌어질 때, '아무도 진짜 나를 모른다'는 외로움이 온다는 점입니다."
  +"\n\n"+mi0.short+" 성향이 이 간극에 미치는 영향: "+mi0.trait+" 그래서 "+(ST.ch[0]==="L"?"겉의 모습이 더 강하게 드러나 속마음과의 괴리가 더 커질 수 있어요.":"속마음이 더 깊이 숨어서, 진짜 나를 아는 사람이 더 적을 수 있어요.");
  }else{
    i4_body = "흥미로운 점이 있어요. 연주의 <b>"+ySS+"</b>와 일지의 <b>"+dayBrSS+"</b>가 같은 계열이에요. 이건 겉과 속이 일관적인 사람이라는 뜻입니다.\n\n"
    +"세상이 보는 당신의 첫인상과, 가장 가까운 사람이 아는 당신의 속마음이 크게 다르지 않아요. '보이는 대로의 사람'이라는 신뢰를 줍니다. 사람들이 당신에게 금방 마음을 여는 이유가 이거예요 — 거짓이 없다는 걸 본능적으로 느끼니까.\n\n"
    +"다만 "+mt+"에서 "+cf[0]+"(주기능)과 "+cf[3]+"(열등기능) 사이의 간극은 존재합니다. 일상에서는 "+cf[0]+"가 앞에 나서지만, 극도로 스트레스를 받거나 피곤할 때 "+cf[3]+"가 갑자기 튀어나와요. 평소와 전혀 다른 반응을 보이는 자신에게 당황하는 순간 — 그게 열등기능의 그림자입니다."
  +"\n\n"+mi0.short+"이기에 이 열등기능의 출현 패턴도 독특해요. "+mi0.burn;
  }

  var i4_catch = gapExists
    ? "밖에서는 "+ySS+", 집에서는 "+dayBrSS+": 아무도 모르는 당신의 진짜 얼굴"
    : "보이는 대로의 사람, "+ySS+"가 관통하는 일관된 자아";

  // ===================================
  // ITEM 5: 감정과 취약점 — 오행 부족/과다에서 파생
  // ===================================
  var i5_body = "";
  var i5_catch = "";

  if(elZero.length>0){
    var zEl=elZero[0];
    var zDesc={"목":"결단력과 시작의 에너지","화":"열정과 표현의 에너지","토":"안정과 중심의 에너지","금":"결단과 정리의 에너지","수":"유연함과 지혜의 에너지"};
    var zSymptom={"목":"우유부단해지거나 새로운 시작이 두려워지는 순간이 옵니다. '해야 하는데...'로 시작하는 문장이 많다면, 목 기운 부족의 신호예요.","화":"감정 표현이 어색해지고, 열정이 식는 순간이 옵니다. 뭘 해도 재미가 없고, 심장이 뛰지 않는 무기력. 이건 화 기운 고갈의 신호입니다.","토":"중심이 흔들리고, 이리저리 휩쓸리는 느낌이 옵니다. '나는 뭘 원하는 거지?'라는 질문이 반복된다면, 토 기운 부족의 신호예요.","금":"매듭을 짓지 못합니다. 관계든, 일이든, 끊어야 할 걸 끊지 못하고 질질 끕니다. 결단력 부족 — 이건 금 기운 고갈이에요.","수":"유연함이 사라지고 경직됩니다. 변화가 두렵고, 새로운 상황에 적응이 느려요. 지혜보다 고집으로 버티게 됩니다."};
    i5_body = "오행 분포를 보면 <b>"+zEl+"이 원국에 0개</b>입니다. "+zEl+"은 "+zDesc[zEl]+"인데, 이게 아예 없다는 건 상당히 의미가 큰 부분이에요.\n\n"
    +"구체적으로 어떻게 나타나느냐 하면 — "+zSymptom[zEl]+"\n\n"
    +mt+"의 열등기능 "+cf[3]+"이 이 취약점을 증폭시킵니다. "
    +(cf[3]==='Se'?"Se 열등은 '현재 순간에 집중하지 못하는' 약점인데, "+zEl+" 부족과 겹치면 현실과의 접점이 더 약해집니다."
    :cf[3]==='Si'?"Si 열등은 '과거 경험을 정리하지 못하는' 약점인데, "+zEl+" 부족과 겹치면 같은 실수 반복의 패턴이 강화됩니다."
    :cf[3]==='Ne'?"Ne 열등은 '새로운 가능성을 탐색하지 못하는' 약점인데, "+zEl+" 부족과 겹치면 변화 앞에서 더 경직됩니다."
    :cf[3]==='Ni'?"Ni 열등은 '장기 비전을 세우지 못하는' 약점인데, "+zEl+" 부족과 겹치면 방향 없는 불안이 깊어집니다."
    :cf[3]==='Fe'?"Fe 열등은 '타인의 감정 조율이 서투른' 약점인데, "+zEl+" 부족과 겹치면 관계에서의 갈등이 잦아집니다."
    :cf[3]==='Fi'?"Fi 열등은 '자기 감정 파악이 느린' 약점인데, "+zEl+" 부족과 겹치면 '나는 뭘 원하는 거지?'의 미궁이 깊어집니다."
    :cf[3]==='Te'?"Te 열등은 '체계적 실행이 약한' 약점인데, "+zEl+" 부족과 겹치면 아이디어만 쌓이고 실행은 안 되는 패턴이 강화됩니다."
    :"Ti 열등은 '독립적 분석이 약한' 약점인데, "+zEl+" 부족과 겹치면 남의 의견에 과도하게 좌우됩니다.")
    +"\n\n<b>이중 취약점의 해법</b>: "+zEl+" 기운을 물리적으로 보충하세요. "
    +(zEl==='목'?"초록색 소품, 식물 키우기, 동쪽 방향, 산책이 직접적 보충법입니다."
    :zEl==='화'?"빨간색·주황색 계열, 남쪽 방향, 햇빛 쬐기, 사람 만나기가 화 기운 보충법이에요."
    :zEl==='토'?"노란색·베이지 계열, 맨발 걷기, 정돈된 환경, 규칙적 루틴이 토 기운 보충법입니다."
    :zEl==='금'?"흰색·은색 계열, 서쪽 방향, 정리정돈, 미니멀한 환경이 금 기운 보충법이에요."
    :"검정·남색 계열, 북쪽 방향, 수영, 명상이 수 기운 보충법입니다.")
    +" 그리고 "+cf[3]+" 열등기능은 억지로 발달시키려 하지 말고, <b>"+cf[1]+"(보조기능)을 통해 우회</b>하세요."
  +"\n\n"+mi2.short+"의 관점에서 이 취약점을 보면: "+mi2.burn;

    i5_catch = elN[zEl]+" 없는 "+iljuD.k+": "+zEl+" 공백이 만드는 "+dm+" 일간의 아킬레스건";
  }else{
    var exEl=elMax[0],exCnt=elMax[1];
    var exDesc={"목":"성장·확장·경쟁 에너지가 넘치는","화":"열정·표현·충동 에너지가 과잉인","토":"고집·안정·보수 에너지가 쌓인","금":"결단·비판·정리 에너지가 날카로운","수":"사색·유연·변화 에너지가 넘치는"};
    i5_body = "오행 분포를 보면 <b>"+exEl+"이 "+exCnt+"개로 과다</b>합니다. "+exDesc[exEl]+" 구조예요.\n\n"
    +"이게 장점일 때는 "+exEl+" 에너지가 요구되는 상황에서 압도적 퍼포먼스를 발휘합니다. 하지만 독이 될 때는 — "
    +(exEl==='화'?"통제 불능의 감정 폭발. 화가 나면 주변이 안 보이고, 후회할 말이 입에서 자동으로 나옵니다."
    :exEl==='목'?"지나친 고집과 독선. '내가 맞아'에서 한 발도 물러서지 못하고, 유연성이 사라집니다."
    :exEl==='수'?"지나친 생각과 우유부단. 분석에 분석을 거듭하다 타이밍을 놓칩니다."
    :exEl==='금'?"지나친 비판과 냉정함. 정확한 지적이지만, 상대에겐 칼로 찌르는 듯한 말."
    :"지나친 집착과 변화 거부. '이게 안전해'에 매달려 새로운 기회를 놓칩니다.")
    +"\n\n"+mt+"의 "+cf[3]+"(열등기능)이 폭주하면 이 "+exEl+" 과다 에너지와 공명을 일으켜서 더 심해집니다. "
    +"\n\n"+mi2.short+"의 관점: "+mi2.burn
  +"\n\n해법은 <b>반대 오행 활동</b>입니다. "+exEl+" 과다를 식히려면 "
    +(exEl==='화'?"수(水) 에너지 — 명상, 수영, 조용한 시간."
    :exEl==='목'?"금(金) 에너지 — 정리, 결단, 불필요한 것 버리기."
    :exEl==='수'?"토(土) 에너지 — 규칙적 루틴, 운동, 발을 땅에 딛는 활동."
    :exEl==='금'?"화(火) 에너지 — 사람 만나기, 웃기, 따뜻한 표현 연습."
    :"목(木) 에너지 — 새로운 시도, 성장 지향적 활동, 여행.");

    i5_catch = exEl+" "+exCnt+"개, "+tone.energy+"가 "+tone.crisis+"하기 전에: "+exEl+" 과잉이 만드는 감정의 함정";
  }

  // ===================================
  // ITEM 6: 감정 폭주 메커니즘 — 어떤 상황에서 터지는가
  // ===================================
  var triggerSS = hasSS('상관') ? '상관' : hasSS('겁재') ? '겁재' : hasSS('편관') ? '편관' : dmEl;
  var i6_body = dm+" 일간이 감정적으로 무너지는 순간을 정밀하게 해부해볼게요.\n\n"
  +"<b>1단계 — 트리거</b>: "
  +(triggerSS==='상관'?"상관(傷官)이 "+ssAt('상관').join(', ')+"에 있어요. 상관은 '기존 권위에 대한 반항'의 에너지입니다. 불합리한 지시, 논리 없는 규칙, 무능한 상사 — 이런 상황에서 내면의 상관이 발동합니다. '이건 아닌데?'라는 생각이 드는 순간, 이미 감정의 시동이 걸린 거예요."
  :triggerSS==='겁재'?"겁재(劫財)가 "+ssAt('겁재').join(', ')+"에 있어요. 겁재는 '내 것을 빼앗기는 것'에 대한 분노의 에너지입니다. 내 노력의 성과를 남이 가져가거나, 내 영역을 침범당할 때 — 평소와 전혀 다른 사람이 됩니다."
  :triggerSS==='편관'?"편관(偏官)이 "+ssAt('편관').join(', ')+"에 있어요. 편관은 '외부의 압력과 통제'에 대한 반발의 에너지입니다. 부당한 압력, 억울한 상황, 무시당하는 느낌 — 이런 순간에 내면의 편관이 폭발합니다."
  :dmEl==='화'?"화(火) 일간은 '무시당했다'는 느낌에 가장 크게 반응해요. 자존심이 건드려지는 순간 — 특히 공개적인 자리에서 — 감정의 불꽃이 순식간에 타오릅니다."
  :dmEl==='수'?"수(水) 일간은 감정을 오래 참다가 한번에 터져요. 트리거는 '누적된 서러움'. 하나하나는 참을 수 있지만, 쌓이고 쌓여서 댐이 무너지듯 폭발합니다."
  :dmEl==='목'?"목(木) 일간은 '자유를 제한당할 때' 가장 크게 반응해요. 통제, 간섭, 억압 — 나무가 천장에 부딪히면 뚫고 나가려 하듯, 반발이 거셉니다."
  :dmEl==='금'?"금(金) 일간은 '원칙이 깨질 때' 가장 크게 반응해요. 약속 불이행, 거짓말, 비효율 — 날카로운 비판이 입에서 자동으로 나옵니다."
  :"토(土) 일간은 '배신당했다'는 느낌에 가장 크게 반응해요. 평소엔 다 받아주지만, 신뢰가 깨지는 순간 — 대지가 갈라지듯 감정이 폭발합니다.")
  +"\n\n<b>2단계 — 증폭</b>: "+mt+"의 "+cf[0]+"(주기능)이 상황을 순간적으로 분석하고, "+cf[1]+"(보조기능)이 강렬한 판단을 붙여요. 이 과정이 0.5초 만에 일어납니다. "
  +"'왜 화가 나는지는 정확히 아는데, 화를 내고 나면 후회하는' 패턴이 반복되는 이유가 바로 이 속도 때문이에요.\n\n"
  +"<b>3단계 — 폭발 혹은 내파</b>: "
  +(ST.ch[0]==="L"?""+mi0.short+" 구조라 감정이 바깥으로 터져요. "+mi0.burn
  :""+mi0.short+" 구조라 감정이 안으로 곪아요. "+mi0.burn)
  +"\n\n<b>4단계 — 수습</b>: "+dm+" 일간의 "+tone.calm+". 폭발 후에는 "+(dmEl==='화'?"빠르게 식지만 죄책감이 밀려옵니다.":dmEl==='수'?"오래 여운이 남고, 그 감정을 곱씹습니다.":dmEl==='목'?"아무 일 없었다는 듯 회복하지만, 상대의 상처는 기억하지 못합니다.":dmEl==='금'?"냉정하게 복기하지만, 사과 타이밍을 놓칩니다.":"느리게 회복하지만, 한번 결심하면 완전히 끊어냅니다.");

  var i6_catch = triggerSS==='상관' ? "상관이 입을 열면 멈출 수 없다: "+dm+" 일간 × "+mt+"의 감정 폭주 해부도"
    : triggerSS==='겁재' ? "내 것을 건드리면 끝이다: 겁재 × "+mt+"의 분노 메커니즘"
    : triggerSS==='편관' ? "억울하면 잠을 못 자는 이유: 편관 × "+mt+"의 압력 반응"
    : dm+" 일간의 "+tone.crisis+" 패턴: "+tone.adj+" "+tone.energy+"가 터지는 순간의 4단계";

  // ===================================
  // ITEM 7: 회복탄력성
  // ===================================
  var i7_body = "넘어진 뒤에 다시 일어나는 속도와 방식은 사람마다 완전히 달라요.\n\n"
  +ilju+"일주, "+dayUns+"에 앉은 "+dm+" 일간의 회복 패턴: "
  +(dayStrongUns?"<b>뿌리가 단단한 나무</b>형입니다. 태풍에 가지가 부러져도 줄기는 살아있어요. 위기에서 중심을 잡는 힘이 있고, 넘어져도 같은 자리에서 다시 일어납니다."
  :dayUns==='묘'||dayUns==='양'||dayUns==='태'?"<b>씨앗</b>형입니다. 완전히 무너져도 그 잔해 속에서 새로운 것이 싹텁니다. 회복이 빠르진 않지만, 회복 후에는 이전보다 더 강해져 있어요."
  :dayUns==='사'||dayUns==='절'?"<b>불사조</b>형입니다. 역설적이게도, 완전히 끝났다고 생각한 순간이 새로운 시작의 지점이에요. 극적인 반전의 인생을 삽니다."
  :"<b>"+tone.calm+"</b>형입니다. 시간이 약이에요. 급하게 회복하려 하지 말고, 자기만의 속도로 천천히 재건하는 것이 이 일주의 회복법입니다.")
  +"\n\n"+mt+"의 회복 시스템은 "+cf[0]+"→"+cf[1]+"→"+cf[2]+"의 순서로 작동합니다. 먼저 "+cf[0]+"가 새로운 가능성이나 해석을 제시하고, "+cf[1]+"가 그것을 검증하고, "+cf[2]+"가 실행에 옮깁니다. "
  +"\n\n"+tone.metaphor+" — 이 이미지를 기억하세요. 지금 힘든 시기라면, 이건 끝이 아니라 "+dayUns+"의 에너지가 작용하는 과정입니다."
  +"\n\n"+mi0.short+" + "+mi3.short+"의 회복 공식: "+(ST.ch[0]==="L"?mi0.trait+" 힘들 때 사람을 만나는 것이 회복의 시작이에요.":mi0.trait+" 혼자만의 시간이 회복의 시작이에요.")+" "+mi3.burn
  +(hasGuiin?" 게다가 사주에 "+salGood.filter(function(s){return s.name.indexOf('귀인')>=0;}).map(function(s){return s.name;}).join(', ')+"이 있어서, 진짜 위기 순간에 뜻밖의 도움이 옵니다. 이 귀인은 새로운 사람일 수도, 우연한 기회일 수도, 갑자기 떠오르는 아이디어일 수도 있어요.":"");

  var i7_catch = dayStrongUns ? dayUns+"에 앉은 "+dm+", 뿌리째 뽑히지 않는 사람: "+ilju+"일주의 회복 DNA"
    : (dayUns==='사'||dayUns==='절') ? "끝이라고 생각한 곳이 시작이다: "+dayUns+"지(地) "+dm+" 일간의 반전력"
    : tone.metaphor+": "+ilju+"일주 "+mt+"가 위기를 돌파하는 법";

  // ===================================
  // ITEM 8: 직업 적성
  // ===================================
  var i8_body = ilju+"일주가 가리키는 직업 DNA를 볼게요. "+iljuD.job+" — 일주 자체가 보여주는 방향이에요.\n\n"
  +"여기에 십성 배치를 겹쳐볼게요. "
  +(feat.sikSangStrong?"식상이 강한 구조라 <b>'표현이 곧 직업'</b>인 사람이에요. 말하기, 쓰기, 만들기, 가르치기 — 무언가를 만들어내고 전달하는 일에서 최고의 퍼포먼스가 나옵니다. 콘텐츠 크리에이터, 교육자, 마케터, 작가, 디자이너가 적성이에요."
  :feat.jaeStrong?"재성이 강한 구조라 <b>'현실 감각이 곧 무기'</b>인 사람이에요. 시장을 읽고, 기회를 포착하고, 효율을 최적화하는 능력. 금융, 영업, 사업, 유통, 부동산에서 빛납니다."
  :feat.gwanStrong?"관성이 강한 구조라 <b>'조직 안에서 올라가는 힘'</b>이 있는 사람이에요. 체계적이고, 책임감이 강하고, 위에서 인정받는 능력. 관리자, 공무원, 임원, 법률가가 적성이에요."
  :feat.inStrong?"인성이 강한 구조라 <b>'전문성이 곧 경쟁력'</b>인 사람이에요. 깊이 파고들면 파고들수록 빛나는 구조. 연구자, 교수, 컨설턴트, 전문직이 적성이에요."
  :"비겁이 강한 구조라 <b>'독립적 영역'</b>에서 빛나는 사람이에요. 남의 밑에서 지시받으며 일하면 에너지가 소모됩니다. 프리랜서, 창업가, 1인 기업가, 전문 장인이 적성이에요.")+"\n\n"

  +mt+"의 MBTI 강도를 직업에 적용하면:\n"
  +"<b>"+mi1.short+"</b> — "+mi1.work+"\n"
  +"<b>"+mi3.short+"</b> — "+mi3.work+"\n"
  +"<b>"+mi0.short+"</b> — "+mi0.work+"\n"
  +"<b>"+mi2.short+"</b> — "+mi2.work+"\n\n"

  +(hasSS('식신')||hasSS('상관')?"<b>식상→재성 루트</b>: 당신의 재능과 표현력이 직접 돈이 되는 구조가 있어요. '좋아하는 일을 하면서 돈도 벌 수 있을까?'라는 질문에 — 당신의 사주는 '그렇다'고 답합니다. 단, 식상이 재성을 생(生)하려면 <b>꾸준한 아웃풋</b>이 필요해요. 한번 대박을 노리지 말고, 매일 조금씩 표현하세요."
  :hasSS('재성')?"<b>재성 직결 루트</b>: 재물이 직접 들어오는 길이 있어요. 현실 감각을 믿고, 기회가 보이면 빠르게 움직이세요."
  :"<b>전문성 축적 루트</b>: 당신은 빨리 돈 버는 스타일보다 전문성이 쌓인 후에 크게 돈 버는 스타일이에요. 조급해하지 마세요. 5년 뒤의 당신이 지금보다 훨씬 높은 곳에 있을 겁니다.");

  var i8_catch = feat.sikSangStrong ? "표현이 곧 돈이 되는 사주: "+ilju+"일주 식상(食傷)의 직업 DNA"
    : feat.jaeStrong ? "기회를 냄새로 맡는 사람: "+ilju+"일주 재성의 현실 감각"
    : feat.gwanStrong ? "조직의 정상에 서는 사주: "+ilju+"일주 관성의 리더십 코드"
    : feat.inStrong ? "깊이가 곧 경쟁력: "+ilju+"일주 인성의 전문가 DNA"
    : "나만의 왕국을 세우는 사람: "+ilju+"일주 비겁의 독립 사업가 기질";

  // ===================================
  // ITEM 9: 재물운
  // ===================================
  var hasJae=hasSS('편재')||hasSS('정재');
  var i9_body = "돈과의 관계를 사주로 해부합니다.\n\n"
  +(hasJae?"재성이 "+ssAt('편재').concat(ssAt('정재')).join(', ')+"에 위치해 있어 <b>돈이 들어오는 길이 원국에 있어요</b>. "
  +(hasSS('편재')?"편재는 뜻밖의 수입, 여러 수입원, 투자 수익을 의미해요. 한 가지 일만 하기보다 포트폴리오형 수입이 유리합니다."
  :"정재는 안정적이고 꾸준한 수입을 의미해요. 월급이나 고정 수입처가 있으면 마음이 안정되고 그때 퍼포먼스가 올라갑니다.")
  :"재성이 원국에 없어요. 이건 '돈이 안 된다'가 아니라 <b>'돈이 자동으로 오진 않는다'</b>는 뜻이에요. 대운(大運)이나 세운(歲運)에서 재성이 들어올 때가 재물의 골든타임입니다. 그 시기를 놓치지 마세요.")
  +"\n\n"+dm+" 일간("+dmEl+")의 재물 스타일: "
  +(dmEl==='화'?"화(火)는 영향력이 곧 돈입니다. 사람들에게 영향을 주는 만큼 돈이 따라와요. 개인 브랜딩, SNS, 강연 — 당신의 에너지 자체가 자산이에요."
  :dmEl==='수'?"수(水)는 흐름이 곧 돈이에요. 돈은 고여있으면 썩듯이, 순환시켜야 합니다. 저축만 하지 말고 적절한 투자와 소비의 균형을 찾으세요."
  :dmEl==='목'?"목(木)은 성장이 곧 돈이에요. 나무처럼 시간을 투자하면 복리로 돌아옵니다. 빨리 돈 벌려고 하지 말고, 5~10년 단위로 생각하세요."
  :dmEl==='금'?"금(金)은 본질적 가치를 보는 눈이 있어요. 유행을 따르지 않고, 진짜 가치있는 것에 투자하면 됩니다."
  :"토(土)는 안정적 축적이 체질이에요. 부동산이나 적금처럼 눈에 보이는 자산이 마음을 편하게 합니다.")
  +"\n\n"+mt+"의 소비 패턴: "+mi1.short+" — "+(ST.ch[1]==="R"?"'이게 나중에 도움이 될 거야'라는 확신으로 지갑을 여는 타입.":"눈앞의 만족을 위해 소비하는 타입.")+" "+mi3.short+" — "+mi3.burn;

  var i9_catch = hasJae
    ? (hasSS('편재') ? "여러 갈래의 돈길이 열린 사주: "+dm+" 일간 편재의 포트폴리오 전략" : "꾸준히 쌓이는 돈의 구조: "+dm+" 일간 정재의 안정적 축적법")
    : "돈이 자동으로 오진 않는 사주, 하지만: "+dm+" 일간이 재물의 골든타임을 잡는 법";

  // ===================================
  // ITEM 10: 연애/배우자 — 도화살·합충에 따라 완전히 다른 서사
  // ===================================
  var i10_body = ilju+"일주의 연애를 해부합니다.\n\n"
  +"배우자궁(일지 "+saju.P[2].b+")에 <b>"+dayBrSS+"</b>이 앉아있어요. "+iljuD.love+"\n\n";

  if(feat.dohwaMulti){
    i10_body += "<b>도화살이 2개 이상</b>이에요. 도화(桃花)는 '복숭아꽃'이란 뜻으로, 이성을 끌어당기는 자력(磁力)입니다. 매력이 넘치는 건 축복이지만, 관계가 복잡해지기 쉬운 구조이기도 해요. 의도하지 않아도 이성의 관심이 따라오고, 그래서 오해를 사기도 합니다.\n\n";
  }else if(hasDohwa){
    i10_body += "<b>도화살</b>이 있어요. 이성에 대한 매력이 특별히 강한 사주입니다. 이건 외모만의 문제가 아니라, '분위기'와 '기운'의 끌림이에요.\n\n";
  }

  i10_body += mt+"의 "+cf[0]+"(주기능)이 연애에서 작동하는 방식: "
  +(cf[0]==='Ne'?"상대의 가능성을 극대화해서 봅니다. '이 사람이 이렇게 되면...'이라는 상상 속의 상대와 연애를 시작하는 경향. 현실의 상대가 상상과 다를 때 실망이 오지만, 그건 상대의 문제가 아니라 Ne의 투영이에요."
  :cf[0]==='Ni'?"'이 사람이다'라는 직관적 확신으로 빠지는 타입. 한번 꽂히면 모든 징후를 긍정적으로 해석합니다. 그 직관이 맞을 때는 운명적 만남이 되지만, 틀릴 때는 깊은 상처가 남아요."
  :cf[0]==='Se'?"현재의 화학적 끌림에 충실한 타입. 분위기, 매력, 순간의 설렘이 중요해요. 현실적이고 감각적인 연애를 하지만, 장기적 비전은 후순위가 되기 쉽습니다."
  :cf[0]==='Si'?"과거의 좋은 기억을 반복하려는 타입. '그때 그 사람 같은 느낌'으로 상대를 고르는 경향. 안정적이지만 새로운 유형의 사람에게는 마음을 열기 어려워요."
  :cf[0]==='Fe'?"상대의 감정을 먼저 읽고 맞춰주는 타입. 배려심이 깊지만, 정작 자기 감정을 뒷전에 두다가 어느 순간 '나만 주고 있었네'라는 깨달음이 옵니다."
  :cf[0]==='Fi'?"자기 가치관과 맞는 사람만 받아들이는 타입. 기준이 높고, 쉽게 마음을 열지 않지만, 한번 열면 깊이가 남다릅니다."
  :cf[0]==='Te'?"효율적으로 연애하려는 타입. 감정보다 상황 판단이 앞서서, 상대가 '나를 분석하는 느낌'을 받을 수 있어요. 머리가 아닌 심장으로 다가가는 연습이 필요합니다."
  :"독립적으로 분석하는 타입. 상대를 이해하려 하지만, 감정 표현이 서툴러서 '도대체 나를 좋아하는 건지 아닌 건지' 모호하게 느끼게 할 수 있어요.")
  +"\n\n"

  +"\n\n<b>"+mi0.short+"의 연애 에너지</b>: "+mi0.love
  +"\n<b>"+mi2.short+"의 관계 판단</b>: "+mi2.love
  +"\n\n"
  +(hasChung?"사주에 충(沖)이 있어 연애에서도 <b>급격한 전환</b>이 올 수 있습니다. 불타오르다 갑자기 식거나, 안 맞다고 생각했는데 갑자기 끌리거나. 이 기복 자체가 연애의 패턴이에요.":"")
  +(hasHap?" 합(合)이 있어 <b>강한 인연의 끌림</b>을 경험합니다. 운명 같은 만남이 올 수 있지만, 합이 너무 강하면 관계에 과도하게 몰입하는 패턴에도 주의.":"")
  +"\n\n<b>당신에게 맞는 파트너</b>: 용신 "+gg.yongshin+" 기운이 강한 사람. "
  +(gg.yongshin==='목'?"성장 지향적이고 새로운 시도를 좋아하는 사람."
  :gg.yongshin==='화'?"열정적이고 표현력이 풍부한 사람."
  :gg.yongshin==='토'?"안정적이고 중심이 잡혀있는 사람."
  :gg.yongshin==='금'?"결단력 있고 원칙적인 사람."
  :"유연하고 지적인 사람.")
  +" 이런 사람이 당신 옆에 있을 때, 부족한 오행이 채워지면서 최상의 상태가 됩니다.";

  var i10_catch = feat.dohwaMulti ? "도화살 2개, 끌림이 끝나지 않는 사주: "+ilju+"일주의 관계 역학"
    : hasDohwa ? "도화의 매력 × "+dayBrSS+"의 속마음: "+ilju+"일주 연애 공략법"
    : hasChung ? "충(沖)이 만드는 극적인 사랑: "+ilju+"일주의 연애 패턴"
    : "배우자궁의 "+dayBrSS+"이 말하는 것: "+ilju+"일주가 사랑에 빠지는 순간";

  // ===================================
  // ITEM 11: 가족운 — 연주·월주·시주 해석
  // ===================================
  var i11_body = "사주의 네 기둥은 시간 순서대로 인생의 네 시기를 보여줍니다.\n\n"
  +"<b>연주 "+saju.P[0].s+saju.P[0].b+"("+ySS+")</b> — 0~15세, 조상과 유년기\n"
  +sspDesc(ySS,'연주')
  +"\n\n<b>월주 "+saju.P[1].s+saju.P[1].b+"("+mSS+")</b> — 15~30세, 부모와 청년기\n"
  +sspDesc(mSS,'월주')
  +"\n\n<b>시주 "+saju.P[3].s+saju.P[3].b+"("+hSS+")</b> — 45세 이후, 자녀운과 말년\n"
  +sspDesc(hSS,'시주')
  +"\n\n"+mt+"("+miShorts+")의 "+cf[0]+"-"+cf[1]+" 조합은 '내 방식대로 살고 싶다'가 본능인 유형이에요. 특히 "+mi0.short+"이기에 "+mi0.love+" 가족의 기대와 자기 욕구 사이의 균형 — 이게 평생의 과제입니다.";

  var i11_catch = ySS+"의 유년기에서 "+hSS+"의 말년까지: "+saju.P[0].s+saju.P[0].b+"→"+saju.P[3].s+saju.P[3].b+"가 그리는 인생 네 장면";

  // ===================================
  // ITEM 12: 인맥과 배신 — 비겁·도화·특수신살에서 파생
  // ===================================
  var i12_body = mt+"는 <b>"+mi0.short+"</b> 유형이에요. "+mi0.trait
  +"\n\n사주에서 인간관계를 보면 — "
  +(feat.biStrong?"비겁이 강해서 <b>동료이자 경쟁자</b>의 에너지가 강합니다. 비슷한 수준의 사람들과 어울리면 서로 자극이 되지만, 돈이 오가면 관계가 깨질 수 있어요. <b>가까운 사람과의 동업·보증은 절대 금물</b>입니다."
  :feat.gwanStrong?"관성이 강해서 <b>상하관계에 예민</b>한 구조예요. 윗사람에게 인정받으면 날아가지만, 부당한 대우를 받으면 깊게 상처받습니다."
  :feat.sikSangStrong?"식상이 강해서 <b>말로 관계를 만들고 말로 관계를 깨는</b> 구조예요. 재치있는 한마디로 호감을 사지만, 날카로운 한마디로 상대를 깊이 상처줄 수 있습니다."
  :"재성이나 인성 위주라 <b>자기 세계에 충실한</b> 구조예요. 인간관계에 크게 에너지를 쓰지 않지만, 그래서 오히려 관계가 소원해지기 쉽습니다.")
  +"\n\n"

  +(hasDohwa?"<b>도화살</b>이 있어 이성간 인간관계가 복잡해질 수 있어요. 매력이 넘치는 건 좋은데, 의도치 않게 오해를 살 수 있습니다.":"")
  +(hasBaekho?" <b>백호살</b>이 있어 가까운 사람과의 돌발 갈등에 주의. 특히 감정적일 때 내뱉는 말이 관계를 크게 훼손합니다.":"")
  +(hasGuiin?" <b>"+salGood.filter(function(s){return s.name.indexOf('귀인')>=0;}).map(function(s){return s.name;}).join(', ')+"</b>이 있어 위기에서 귀인의 도움이 옵니다. 좋은 인연을 알아보는 눈이 있으니 그 감각을 믿으세요.":"")
  +"\n\n올해 새로 만나는 사람 중 '나랑 너무 잘 맞는다' 싶은 사람일수록 한 박자 늦게 마음을 열어보세요. 최소 6개월은 봐야 진짜 모습이 보입니다.";

  var i12_catch = feat.biStrong ? "동지인가 경쟁자인가: 비겁이 강한 "+dm+" 일간의 관계 지뢰밭"
    : hasDohwa ? "도화의 매력은 양날의 검: "+dm+" 일간이 인간관계에서 주의할 것"
    : hasBaekho ? "백호살의 그림자: 가까운 사람과의 돌발 갈등 주의보"
    : hasGuiin ? "귀인을 알아보는 눈: "+dm+" 일간에게 좋은 인연이 찾아오는 법"
    : tone.style+" "+dm+" 일간이 인간관계에서 에너지를 지키는 법";

  // ===================================
  // ITEM 13: 개운법 — 용신 기반 실천법
  // ===================================
  var ys=gg.yongshin;
  // ★ 버그 수정: 용신에서 실제 오행을 추출 (색상/방위/음식 조회용)
  // ys는 "식상(설기)", "수(냉각,균형)", "비겁→식상 흐름 강화..." 등 다양한 형태
  var ysOh = ''; // 용신의 실제 오행 (목/화/토/금/수)
  var ohList = ['목','화','토','금','수'];
  var ssGroupList = ['비겁','식상','재성','관성','인성'];
  if (ohList.indexOf(ys.charAt(0)) >= 0) {
    // 조후/통관용신: "수(냉각,균형)", "화(따뜻함)" → 첫 글자가 오행
    ysOh = ys.charAt(0);
  } else {
    // 억부/종격용신: "식상(설기)", "비겁(동료)" → 십성 그룹명 → ohMap 변환
    for (var _gi = 0; _gi < ssGroupList.length; _gi++) {
      if (ys.indexOf(ssGroupList[_gi]) === 0) {
        ysOh = gg.ohMap[ssGroupList[_gi]] || '';
        break;
      }
    }
  }
  if (!ysOh) ysOh = '수'; // 최후 방어값
  var i13_body = "용신(用神)은 사주에서 가장 필요한 오행이에요. 당신의 용신은 <b>"+ys+"</b>입니다. "
  +(gg.strong?"일간의 에너지가 강한 "+ggType+" 구조라, "+ys+"가 이 에너지를 적절히 풀어주는 역할을 합니다."
  :"일간의 에너지가 약한 "+ggType+" 구조라, "+ys+"가 일간을 도와주고 힘을 보태는 역할을 합니다.")
  +"\n\n<b>1. 색상과 소품</b>\n"
  +(_lk?"부족한 "+_lk+" 기운을 채우기 위해 "+_lkColor[_lk||ysOh]+" 계열을 생활에 더하세요. 옷, 핸드폰 케이스, 인테리어 소품 — 눈에 자주 보이는 곳에 두는 것이 핵심입니다."
  :"용신 "+ys+" 관련 색상("+(_lkColor[ysOh]||"")+")을 생활에 배치하세요.")
  +"\n\n<b>2. 방위</b>\n"
  +"행운의 방위는 <b>"+(_lkDir[ysOh]||"")+"</b>입니다. 이사, 여행, 책상 방향을 정할 때 참고하세요. "
  +(hasYeokma?"역마살이 있어서 이동 자체가 개운 행위예요. 같은 곳에 오래 있으면 운이 정체됩니다.":"")
  +"\n\n<b>3. 운동과 활동</b>\n"
  +(_lkExercise[ysOh]||"")+" — 용신 오행에 맞는 활동이 최고의 개운법이에요. 주 2~3회만 해도 감정 기복이 눈에 띄게 줄어듭니다."
  +"\n\n<b>4. 음식</b>\n"
  +(_lkFood[ysOh]||"")+" 계열의 음식이 용신을 보충합니다."
  +"\n\n<b>5. 관계에서의 개운</b>\n"
  +"용신 "+ys+" 기운이 강한 사람 옆에 있으면 자연스럽게 보충됩니다. "
  +(ysOh==='목'?"봄에 태어난 사람, 성장 지향적인 사람.":ysOh==='화'?"여름에 태어난 사람, 열정적이고 표현력 있는 사람.":ysOh==='토'?"환절기에 태어난 사람, 안정적이고 중심 잡힌 사람.":ysOh==='금'?"가을에 태어난 사람, 결단력 있고 원칙적인 사람.":"겨울에 태어난 사람, 유연하고 지적인 사람.")
  +"\n\n<b>"+mi0.short+"을 위한 개운 팁</b>: "+(ST.ch[0]==="L"?"사람을 통해 운이 옵니다. 좋은 에너지의 사람을 만나는 모임에 참석하세요. "+mi0.burn:"혼자만의 시간에 용신을 충전하세요. 명상, 산책, 독서 — "+mi0.burn)
  +"\n<b>"+mi3.short+"을 위한 개운 팁</b>: "+mi3.burn;

  var i13_catch = "용신 "+ys+"을 일상에 심는 법: "+dm+" 일간이 운을 바꾸는 5가지 실천";

  // ===================================
  // ITEM 14: 번아웃 예방 — 오행 에너지 순환법
  // ===================================
  var i14_body = dm+" 일간("+dmEl+")의 에너지 패턴을 정밀하게 봅니다.\n\n"
  +(dmEl==='화'?"화(火) 에너지는 <b>폭발적으로 타오르다 갑자기 꺼지는</b> 패턴이에요. 석 달 미친 듯이 달리다가 어느 날 아침, 이불 밖이 지옥이 됩니다. 이건 게으른 게 아니라 연료가 소진된 거예요."
  :dmEl==='수'?"수(水) 에너지는 <b>잔잔하다가 갑자기 파도가 치는</b> 패턴이에요. 오랫동안 괜찮다가 한순간에 무너집니다. 문제는 주변 사람들이 '갑자기 왜 그래?'라고 하는데, 사실 오래전부터 쌓이고 있었어요."
  :dmEl==='목'?"목(木) 에너지는 <b>꾸준히 성장하다 한계점에서 꺾이는</b> 패턴이에요. 성장기에는 무적 같지만, 더 이상 성장할 수 없는 환경에 놓이면 급격히 시들어요."
  :dmEl==='금'?"금(金) 에너지는 <b>차갑게 유지하다 과열되면 한번에 무너지는</b> 패턴이에요. 평소에는 완벽하게 관리하지만, 임계점을 넘으면 부러집니다."
  :"토(土) 에너지는 <b>천천히 쌓이다가 지진처럼 터지는</b> 패턴이에요. 평소에는 다 받아주지만, 임계점을 넘으면 땅이 갈라지듯 감정이 분출됩니다.")
  +"\n\n"+mt+"도 같은 패턴이 있어요. "+cf[0]+"(주기능)이 폭주 모드로 에너지를 쏟다가, "+cf[3]+"(열등기능)이 '나 이제 못 버텨'라고 반란을 일으킵니다. <b>사주의 "+dmEl+" 소진 + "+cf[3]+" 반란</b>이 동시에 오면, 꽤 심한 무기력이 올 수 있어요."
  +"\n\n<b>예방 공식</b>: 달리면서 쉬기."
  +"\n매주 한 번 '절반의 날'을 만드세요. 이날은 에너지 사용량을 평소의 50%로 줄입니다. "
  +(dmEl==='화'?"자극을 줄이세요. 조용한 카페, 산책, 물 근처."
  :dmEl==='수'?"집 밖으로 나가세요. 고여있으면 감정이 정체됩니다."
  :dmEl==='목'?"자연 속에서 시간을 보내세요. 광합성이 필요합니다."
  :dmEl==='금'?"미니멀하게 보내세요. 정리정돈 자체가 충전입니다."
  :"루틴을 깨세요. 평소 안 가본 곳, 안 해본 것을 시도하세요.")
  +"\n\n<b>3:1 리듬</b> — 3일 풀가동 → 1일 반충전. 이 리듬을 한 달만 유지하면 번아웃 주기가 눈에 띄게 길어집니다."
  +"\n\n<b>"+mi0.short+"의 번아웃 특성</b>: "+mi0.burn
  +"\n<b>"+mi1.short+"의 번아웃 특성</b>: "+mi1.burn
  +"\n<b>"+mi2.short+"의 번아웃 특성</b>: "+mi2.burn
  +"\n<b>"+mi3.short+"의 번아웃 특성</b>: "+mi3.burn;

  var i14_catch = dmEl==='화' ? "타오르다 꺼지는 "+dm+" 일간의 연료 관리법: 번아웃 예보와 처방전"
    : dmEl==='수' ? "잔잔한 수면 아래 쌓이는 폭풍: "+dm+" 일간의 번아웃 조기 경보 시스템"
    : dmEl==='목' ? "성장이 멈추면 시드는 "+dm+" 일간: 새로운 자극이 필요한 순간들"
    : dmEl==='금' ? "완벽하게 버티다 부러지기 전에: "+dm+" 일간의 에너지 릴리스 밸브"
    : "다 받아주다 터지기 전에: "+dm+" 일간의 감정 지진 예방법";

  /* ─── Phase 4: 카테고리 조립 ─── */
  var _animalMap={'목':{animal:'사슴',emoji:'🦌',r:'목(木) 기운의 성장 에너지와 부드러움'},'화':{animal:'불사조',emoji:'🔥',r:'화(火) 기운의 열정과 빛나는 존재감'},'토':{animal:'곰',emoji:'🐻',r:'토(土) 기운의 묵직한 안정감과 포용력'},'금':{animal:'백호',emoji:'🐯',r:'금(金) 기운의 날카로운 결단력과 카리스마'},'수':{animal:'용',emoji:'🐉',r:'수(水) 기운의 깊은 지혜와 유연한 변화력'}};
  var _aInfo=_animalMap[dmEl]||_animalMap['토'];
  return{
    profileTitle:ilju+"일주 × "+mt,
    quote:'"'+iljuD.k+'" — '+ilju+'일주 '+mt+' '+ti.n+', 세상에 단 하나뿐인 당신의 이야기입니다.',
    destinyAnimal:{animal:_aInfo.animal,emoji:_aInfo.emoji,reason:dm+' 일간('+dmEl+')의 '+_aInfo.r+'이 '+mt+' '+ti.n+'의 성격과 만나 '+_aInfo.animal+'의 에너지를 형성합니다.'},
    categories:[
      {title:"기질 및 성격",subtitle:ilju+"일주 × "+mt+"가 만드는 고유한 당신",items:[
        {catch:i1_catch,content:i1_body,insightType:"gold",insightIcon:"💡",insightText:ilju+"일주의 본질: '"+iljuD.k+"'. "+mt+"의 "+cf[0]+"이 이 기질을 세상 밖으로 표현합니다. 당신만의 고유한 조합을 믿으세요."},
        {catch:i2_catch,content:i2_body,insightType:"purple",insightIcon:"🔮",insightText:"사주 원국은 바뀌지 않지만, 대운과 세운이 매 시기 새로운 에너지를 보내줍니다. 원국의 구조를 알면, 어떤 시기에 어떤 기회가 올지 예측할 수 있어요."},
        {catch:i3_catch,content:i3_body,insightType:"gold",insightIcon:"💡",insightText:domSS+" 에너지가 당신의 핵심 동력입니다. 이 에너지를 억누르지 말고 올바른 방향으로 쓰는 것이 성공의 열쇠예요."}
      ]},
      {title:"감정과 내면",subtitle:dm+" 일간의 "+tone.adj+" 감정 세계 해부",items:[
        {catch:i4_catch,content:i4_body,insightType:"fire",insightIcon:"⚠️",insightText:"겉과 속의 간극을 줄이는 가장 좋은 방법은 '신뢰할 수 있는 한 사람'에게 속마음을 보여주는 것입니다. 완벽한 모습만 보여주려 하지 마세요."},
        {catch:i5_catch,content:i5_body,insightType:"water",insightIcon:"💧",insightText:(_lk?"부족한 "+_lk+" 오행은 의식적으로 채워야 합니다. 색상, 방위, 음식, 활동 — 작은 변화가 큰 차이를 만듭니다.":"과다한 "+elMax[0]+" 에너지는 반대 오행 활동으로 식히세요.")},
        {catch:i6_catch,content:i6_body,insightType:"fire",insightIcon:"⚠️",insightText:"감정이 치밀어 올 때: '나 지금 좀 "+tone.adj+"해서, 정리되면 말할게.' 이 한 문장이 관계를 살립니다."}
      ]},
      {title:"직업과 재물",subtitle:_ex+" 에너지 × "+cf[0]+"이 만드는 커리어 로드맵",items:[
        {catch:i7_catch,content:i7_body,insightType:"gold",insightIcon:"💡",insightText:"위기는 끝이 아니라 "+dayUns+"의 에너지가 작용하는 과정입니다. "+ilju+"일주의 회복력을 믿으세요."},
        {catch:i8_catch,content:i8_body,insightType:"gold",insightIcon:"💡",insightText:"직업 핵심: "+ilju+"일주 "+mt+"는 '"+iljuD.job+"' 분야가 최적. "+domSS+" 에너지가 직업에 녹으면 일이 곧 충전이 됩니다."},
        {catch:i9_catch,content:i9_body,insightType:"water",insightIcon:"💧",insightText:"재물 공식: 월급날 자동이체 3개 — ① 생활비 ② 절대 안 건드리는 적금 ③ 자유 용돈. "+dm+" 일간의 "+dmEl+" 스타일에 맞는 재테크를 찾으세요."}
      ]},
      {title:"관계와 인연",subtitle:"육친(六親)이 그리는 인간관계 지도",items:[
        {catch:i10_catch,content:i10_body,insightType:"fire",insightIcon:"⚠️",insightText:"연애 처방: 새로운 사람을 만나면 '3개월 관찰 기간'을 두세요. "+cf[0]+"의 환상이 가라앉고 실제 모습이 보이기 시작하는 시점입니다."},
        {catch:i11_catch,content:i11_body,insightType:"purple",insightIcon:"🔮",insightText:"인생의 네 시기가 각각 다른 에너지를 가지고 있어요. 지금 어떤 기둥의 영향 아래 있는지 파악하면, 현재 상황이 이해됩니다."},
        {catch:i12_catch,content:i12_body,insightType:"gold",insightIcon:"💡",insightText:"인간관계 핵심 룰: 가까운 사람과 돈 거래 금지. 보증 서지 않기. 감정적일 때 중요한 결정 하지 않기."}
      ]},
      {title:"개운과 에너지",subtitle:"용신 "+ys+"을 활용한 실전 개운 전략",items:[
        {catch:i13_catch,content:i13_body,insightType:"water",insightIcon:"💧",insightText:"즉시 실행 3가지: ① 핸드폰 배경화면을 "+(_lk||ys)+" 이미지로 바꾸기 ② "+(_lkColor[ysOh]||"용신 색상")+" 소품 하나 배치 ③ 하루 10분 조용한 시간 확보"},
        {catch:i14_catch,content:i14_body,insightType:"wood",insightIcon:"🌿",insightText:"에너지 공식: 3일 풀가동 → 1일 반충전. 이 리듬을 한 달만 유지하면 번아웃 주기가 길어집니다. "+dm+" 일간의 "+dmEl+" 에너지를 아끼지 말고 '순환'시키세요."}
      ]}
    ]
  };
}

// --- 채팅 엔진 (sendChatMessage에서 프롬프트 + API 호출 추출) ---

function buildChatPrompt(saju, mbti, gg, dw, chatHistory, mode) {
  // mode = 'sweet' (상냥한 달토, 기본값) or 'fire' (팩폭 달토)
  mode = mode || 'sweet';

  var sys = '';
  if (mode === 'fire') {
    sys = '당신은 "달토"라는 이름의 사주 전문 AI 상담사입니다. 달토는 귀여운 토끼 캐릭터이지만 팩폭(팩트 폭격) 모드입니다.\n\n';
    sys += '## 달토의 성격 (팩폭 모드)\n';
    sys += '- 직설적이고 냉정한 팩트 전달\n';
    sys += '- 위로보다 현실 직시를 유도\n';
    sys += '- 사주 용어를 정확히 사용하되 핵심만 콕콕 찔러줌\n';
    sys += '- 이모지를 적절히 사용하되 냉소적으로\n';
    sys += '- 답변은 상세하게, 최소 5문장 이상으로\n';
    sys += '- "그래서 어쩌라고?"식 반응 금지. 팩트 지적 후 반드시 실질적 대안 제시\n';
    sys += '- 마크다운 문법 절대 사용하지 마. **볼드**, # 헤더 같은거 쓰지마. 일반 텍스트로만.\n\n';
  } else {
    sys = '당신은 "달토"라는 이름의 사주 전문 AI 상담사입니다. 달토는 귀여운 토끼 캐릭터이지만 사주 분석은 매우 전문적입니다.\n\n';
    sys += '## 달토의 성격\n';
    sys += '- 따뜻하고 공감을 잘 하는 전문 상담사\n';
    sys += '- 사주 용어를 쉽게 풀어서 설명\n';
    sys += '- 긍정적이면서도 현실적인 조언\n';
    sys += '- 이모지를 적절히 사용해서 친근하게\n';
    sys += '- 답변은 상세하게, 최소 5문장 이상으로\n';
    sys += '- 사주학 원리를 근거로 설명하되 쉬운 비유를 곁들여줘\n';
    sys += '- 마크다운 문법 절대 사용하지 마. **볼드**, # 헤더 같은거 쓰지마. 일반 텍스트로만.\n\n';
  }

  if (saju) {
    sys += '## 상담자 사주 정보\n';
    sys += JSON.stringify(saju) + '\n\n';
  }
  if (mbti) {
    sys += '## 상담자 MBTI: ' + mbti + '\n\n';
  }
  sys += '한국어로만 답변하세요.';
  sys += '\n\n[CRITICAL INSTRUCTION] You MUST respond with plain text only. No JSON, no markdown. Just natural conversational Korean text.';

  return { systemPrompt: sys, messages: chatHistory || [] };
}

async function sendChatToAI(params, callbacks) {
  // params = { apiKey, systemPrompt, messages, endpoint }
  // callbacks = { onChunk(text), onComplete(fullText), onError(err) }
  var endpoint = params.endpoint || '/api/chat';

  try {
    var r = await fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({systemPrompt: params.systemPrompt, messages: params.messages})
    });

    if (!r.ok) throw new Error('HTTP_' + r.status);

    var reader = r.body.getReader();
    var decoder = new TextDecoder();
    var fullText = '', buffer = '';

    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, {stream: true});
      var lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line.startsWith('data: ')) continue;
        var jsonStr = line.substring(6);
        if (jsonStr === '[DONE]') continue;
        try {
          var evt = JSON.parse(jsonStr);
          if (evt.type === 'content_block_delta' && evt.delta && evt.delta.text) {
            fullText += evt.delta.text;
            if (callbacks.onChunk) callbacks.onChunk(fullText);
          }
        } catch(pe) {}
      }
    }

    if (callbacks.onComplete) callbacks.onComplete(fullText);
    return fullText;
  } catch(err) {
    console.error('[MBTS Chat]', err);
    if (callbacks.onError) callbacks.onError(err.message || 'UNKNOWN');
    return '';
  }
}

/* ====== engine.js 외부 인터페이스 ======
 * 
 * [사주 계산]
 * calcSajuForApp(y, m, d, h, min, cityLng) → 사주 객체
 * analyzeGyeokguk(saju) → 격국 분석 객체
 * calcDaewoon(saju, y, m, d, h, min, gender) → 대운 객체
 * calcRelations(saju) → 합충형 관계
 * calcGongmang(saju) → 공망
 * getAnimalResult(oheng, dominantSipsung, condition) → 운명동물
 *
 * [AI 분석]
 * runSajuAnalysis(params, callbacks) → AI 사주 풀이
 * runGunghapAnalysis(paramsA, paramsB, relType, callbacks) → AI 궁합 풀이
 * buildChatPrompt(saju, mbti, gg, dw, history, mode) → 채팅 프롬프트
 * sendChatToAI(params, callbacks) → 달토 채팅
 * mkFB(saju, mt, gg) → AI 실패 시 폴백
 *
 * [데이터]
 * CITY_DATA, ANIMALS, TY, DM_AX, IN_OP, MI
 * EC_DARK, EJ, TGAN_KR, JIJI_KR
 * ILJU_DATA, ILJU_KW, SSP, GUNGHAP_SYSTEM
 * ======================================= */
