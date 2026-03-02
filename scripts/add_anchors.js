#!/usr/bin/env node
'use strict';
var fs = require('fs');

var filePath = require('path').join(__dirname, '..', 'public', 'gunghap.js');
var content = fs.readFileSync(filePath, 'utf8');

// All anchor mappings: [h, anchor, optionalToneForDisambiguation]
var anchors = [
  // ═══ SSOM (14) ═══
  ['첫 만남에서 느낀 그 떨림', '일간 교차 관계 (합/충/생/극/비화) | 보조: 일지 육합 여부 + MBTI EI축 교차'],
  ['자꾸 눈이 가는 진짜 이유', 'A의 용신 + B의 오행 배치 + 도화살 교차 | 보조: MBTI 주기능↔보조기능 교차'],
  ['이 사람의 연애 성향', 'B의 배우자궁(일지) 십성 + B의 격국 강약 | 보조: B의 MBTI TF축 + 강도'],
  ['상대방 눈에 비친 나', 'B 일간 기준 A 일간 십성 + A의 월간·시간이 B에게 주는 인상 | 보조: MBTI SN축 교차'],
  ['나의 어디에 끌릴 수 있을까', 'B의 용신과 A의 오행 배치 관계 | 보조: MBTI A주↔B부 교차'],
  ['반대로, 이건 조심해', '원진살·해 + A의 과잉 오행이 B에게 주는 부담 | 보조: MBTI EI축 차이 + JP축 차이'],
  ['이 사람 마음 여는 방법', 'B의 용신 방향 + B의 격국 | 보조: B의 MBTI 주기능'],
  ['카톡/만남에서 쓸 수 있는 무기', '천간합 궁위 + 삼합 공통 오행 | 보조: MBTI 인지기능 교차 (사주50%+MBTI50% 허용)'],
  ['절대 하면 안 되는 것', '⚠️ 충·형 + B의 신살 중 예민한 것 | 보조: MBTI JP축 차이 + TF축 차이'],
  ['같이 있을 때 흐르는 공기', '납음 궁합 | 보조: 강약 궁합 + 삼합 + MBTI EI축 조합'],
  ['아직 모르는 서로의 반전', '12운성 교차 + 화개살·역마살·천을귀인 교차 | 보조: MBTI 열등기능(4번째)'],
  ['고백하면 될까?', '대운 동기화 + 5년 타이밍 (세운) | 보조: 12운성 + MBTI JP축'],
  ['사귀면 이런 커플이 돼요', '배우자궁 십성 교차 + 육친 교차 | 보조: 오행 보완 + 삼합 + MBTI 전체 유형 조합'],

  // ═══ LOVER (14) ═══
  ['그 사람 눈에 비친 너', 'B 일간 기준 A 일간 십성 + B의 배우자궁(일지) 십성 | 보조: MBTI SN축 교차'],
  ['상대방 앞에서만 나오는 너', 'A의 배우자궁(일지) 십성 + 일지끼리의 관계 (합/충/형) | 보조: MBTI 열등기능(4번째)'],
  ['상대의 사랑법, 내가 못 알아보고 있는 것', 'B의 일간 십성 분포 (정재/편재/정관/편관 위치) + B의 격국 강약 | 보조: B의 MBTI TF축 + 주기능'],
  ['우리만의 최강 조합', '천간합 궁위 + 삼합 공통 오행 | 보조: MBTI 인지기능 교차 (주↔주)'],
  ['그 사람이 절대 말 안 하지만 바라는 것', 'B의 용신과 A의 오행 배치 + B의 12운성 (대운 지지 기준) | 보조: MBTI B의 열등기능(4번째)'],
  ['맨날 싸우는 진짜 이유', '⚠️ 충·형·원진살·해 (강제 언급) | 보조: MBTI TF축 차이 + JP축 차이'],
  ['상대방의 지뢰밭 지도', '양인살·겁재과다·편인과다·편관과다 + B의 과잉/결핍 오행 | 보조: MBTI B의 열등기능 + JP축'],
  ['이 커플 전용 화해 공식', '용신 궁합 (서로가 필요한 에너지) + 천간합 궁위 | 보조: MBTI 인지기능 교차 (A주↔B부, B주↔A부)'],
  ['그 사람이 위기 때 보여줄 진짜 얼굴', '12운성 (대운 지지 기준) + 강약 궁합 | 보조: 격국 유형 (종격/일반격) + MBTI EI축 + TF축'],
  ['이 감정의 유통기한', '대운 동기화 + 5년 타이밍 (세운) | 보조: 도화살 교차 + MBTI SN축'],
  ['상대가 다른 사람한테 끌리는 조건', 'B의 용신 방향 + B의 배우자궁 십성 + 도화살 위치 | 보조: MBTI B의 주기능이 반응하는 에너지 방향'],
  ['우리가 늙으면', '납음 궁합 + 50세 이후 대운 동기화 | 보조: 삼합 + MBTI 전체 유형 조합'],
  ['이 사람이 내 인생을 바꾸고 있는 것', '오행 보완 + A의 용신과 B의 관계 | 보조: 12운성 교차 + MBTI 인지기능 교차'],
  ['이 사랑에 대한 한마디', '키워드 요약 (18레이어 종합) + 납음 궁합 | 보조: MBTI 주기능 조합'],

  // ═══ FRIEND (14) ═══
  ['처음에 왜 끌렸는지', '일간 교차 관계 (합/생/비화 중심) | 보조: MBTI 인지기능 주기능↔주기능 교차'],
  ['이 사람 앞에서만 나오는 나', 'A의 일지 십성 + 일지끼리의 관계 | 보조: MBTI 열등기능(4번째)'],
  ['같이 있으면 왜 이렇게 편한지의 정체', '납음 궁합 + 삼합 공통 오행 | 보조: MBTI EI축 조합 + SN축 조합'],
  ['나한테는 안 하는 말, 속으로 느끼는 것', 'B의 용신과 A의 오행 배치 + B의 12운성 (대운 지지 기준) | 보조: MBTI B의 열등기능(4번째) ※현재 시점 감정/니즈만'],
  ['그 사람이 나한테 진짜인지', '천간합 궁위 + 원진살·해 유무 | 보조: MBTI TF축 교차 ※구조적 진정성 판정만'],
  ['서로한테 없는 걸 채워주고 있는 것', '오행 보완 관계 | 보조: MBTI 인지기능 교차 (A주↔B부, B주↔A부)'],
  // '이 사람한테 내가 기대고 있는 것' - FRIEND version (disambiguate by tone)
  ['이 사람한테 내가 기대고 있는 것', 'A의 용신과 B의 오행 배치 | 보조: MBTI A의 열등기능이 B의 주기능과 만나는 구조', '나도 모르게 이 사람한테 받고 있던 것'],
  ['상대방이 나한테 기대하는 나의 모습', 'B 일간 기준 A 일간 십성 + B의 비겁·식상 분포 | 보조: MBTI B의 주기능이 A에게 기대하는 역할'],
  ['둘이 닮은 것, 둘이 정반대인 것', '강약 궁합 + 격국 교차 | 보조: MBTI 4축 비교'],
  ['이 사이에서 조심해야 할 것', '⚠️ 충·형·원진살·해 (강제 언급) + 과잉 오행끼리 충돌 | 보조: MBTI JP축 차이 + TF축 차이'],
  ['이 사이가 틀어졌을 때 푸는 법', '용신 궁합 + 천간합 궁위 | 보조: MBTI 인지기능 교차'],
  ['그 사람이 내 편인 줄 모르고 있는 순간들', '육친 교차 + 천을귀인 교차 | 보조: MBTI Fe/Fi축'],
  ['이 친구가 내 인생에 가르쳐준 것', '오행 보완 + A의 용신과 B의 관계 | 보조: 12운성 교차 + MBTI 인지기능 교차'],
  ['이 우정에 대한 한마디', '키워드 요약 (18레이어 종합) + 납음 궁합 | 보조: MBTI 주기능 조합'],

  // ═══ COLLEAGUE (14) ═══
  ['그 사람이 나를 어떻게 보고 있는지', 'B 일간 기준 A 일간 십성 + A의 월간이 B에게 주는 인상 | 보조: MBTI SN축 교차 + TF축 교차'],
  ['이 사람의 작동 방식 매뉴얼', 'B의 격국 유형 + B의 강약 + B의 일간 십성 분포 (정관/편관/정재/편재 중심) | 보조: MBTI B의 주기능 + JP축'],
  ['상대방의 지뢰, 절대 건드리면 안 되는 것', '양인살·겁재과다·편관과다 + B의 과잉/결핍 오행 | 보조: MBTI B의 열등기능 + TF축'],
  ['같이 일하면 폭발하는 시너지 조합', '오행 보완 관계 + 천간합 궁위 (특히 월간합) | 보조: MBTI 인지기능 교차 (주↔주) + Te/Ti 배치'],
  ['그 사람이 적인지 아군인지', '천간합·삼합 유무 vs ⚠️ 충·형·원진살·해 유무 (양쪽 동시 판정) | 보조: MBTI TF축 교차'],
  ['맨날 부딪히는 진짜 이유', '⚠️ 충·형·원진살·해 (강제 언급) + 격국 교차 (업무 방식 차이) | 보조: MBTI JP축 차이 + Te vs Ti 충돌'],
  ['이 사람 옆에서 내가 성장하고 있는 것', 'A의 용신과 B의 오행 배치 + 12운성 교차 | 보조: MBTI 인지기능 교차 ※현재 진행형 변화만'],
  ['상대 때문에 퇴사하고 싶은 건지, 진짜 가야 할 때인 건지', '대운 동기화 + 5년 타이밍 (세운) + A의 12운성 (대운 지지 기준) | 보조: MBTI A의 주기능 에너지 상태'],
  ['그 사람이 스트레스받으면 나한테 나오는 패턴', 'B의 격국 강약 + B의 과잉 오행이 A에게 미치는 영향 | 보조: MBTI B의 열등기능 (스트레스 시 발현) + EI축'],
  ['이 관계에서 나를 갉아먹고 있는 것', '12운성 (대운 지지 기준) + A의 과잉/결핍 오행 | 보조: MBTI A의 열등기능이 계속 눌리는 패턴'],
  ['상대방한테 인정받는 법', 'B의 용신 방향 + B 일간 기준 A 일간 십성 | 보조: MBTI B의 주기능이 반응하는 에너지 방향'],
  ['이 사람과 2년 뒤', '대운 동기화 + 세운 2~3년 타이밍 | 보조: MBTI 전체 유형 조합 + SN축'],
  ['이 사람이 내 커리어에 남기는 것', '육친 교차 + 격국 교차 | 보조: 12운성 교차 + MBTI 인지기능 교차 ※이 관계가 끝나도 남는 것만'],

  // ═══ FAMILY (14) ═══
  ['그 사람이 나를 사랑하는 방식, 네가 못 알아보고 있는 것', 'B의 일간 십성 분포 (인성·비겁 중심) + B의 격국 강약 | 보조: MBTI B의 TF축 + 주기능'],
  ['상대방이 나한테 절대 안 하는 말, 근데 느끼고 있는 것', 'B의 용신과 A의 오행 배치 + B의 12운성 (대운 지지 기준) | 보조: MBTI B의 열등기능(4번째)'],
  ['이 사람이 나를 자랑하는 순간', 'B 일간 기준 A 일간 십성 + 천간합 궁위 | 보조: MBTI B의 Fe/Fi축'],
  ['상대 앞에서만 나오는 나', 'A의 일지 십성 + 일지끼리의 관계 (합/충/형) | 보조: MBTI 열등기능(4번째)'],
  ['그 사람도 상처받고 있었다는 것', 'B의 결핍 오행 + B의 12운성 (대운 지지 기준) | 보조: MBTI B의 열등기능 + EI축'],
  // '서로한테 없는 걸 채워주고 있는 것' - same anchor as friend, already handled
  // '둘이 닮은 것, 둘이 정반대인 것' - same anchor as friend, already handled
  // '이 사람한테 내가 기대고 있는 것' - FAMILY version (disambiguate by tone)
  ['이 사람한테 내가 기대고 있는 것', 'A의 용신과 B의 오행 배치 + 육친 교차 | 보조: MBTI A의 열등기능이 B의 주기능과 만나는 구조 ※현재 의존 구조만', '없으면 안 되는 줄 몰랐어'],
  ['상대방의 지뢰, 이것만은 건드리면 안 되는 것', '양인살·편인과다·편관과다 + B의 과잉/결핍 오행 | 보조: MBTI B의 열등기능 + TF축'],
  ['서운한 거 말해도 되는지 삼켜야 하는지', '⚠️ 충·형·원진살·해 (강제 언급) + 용신 궁합 | 보조: MBTI TF축 차이 + JP축 차이'],
  ['우리만의 사랑 언어', '납음 궁합 + 삼합 공통 오행 | 보조: MBTI 인지기능 교차 + Fe/Fi축'],
  ['이 관계가 10년 뒤에는', '대운 동기화 + 10년 단위 타이밍 | 보조: MBTI 전체 유형 조합'],
  ['이 사람이 내 인생에 심어준 것', '육친 교차 + 오행 보완 | 보조: 12운성 교차 + MBTI 인지기능 교차 ※장기적 영향만'],

  // shared across ssom/colleague/family - same anchor
  ['이 인연에 대한 한마디', '키워드 요약 (18레이어 종합) + 납음 궁합 | 보조: MBTI 주기능 조합'],
];

var lines = content.split('\n');
var modified = 0;
var failed = [];

anchors.forEach(function(entry) {
  var h = entry[0];
  var anchor = entry[1];
  var toneHint = entry[2] || null;

  var found = false;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf("h: '" + h + "'") >= 0 && line.indexOf('anchor:') < 0) {
      if (toneHint && line.indexOf("tone: '" + toneHint + "'") < 0) {
        continue;
      }
      var newLine = line.replace(/tone: '([^']*)' \}/, "tone: '$1', anchor: '" + anchor + "' }");
      if (newLine !== line) {
        lines[i] = newLine;
        modified++;
        found = true;
        break;
      }
    }
  }
  if (!found) {
    failed.push(h);
  }
});

content = lines.join('\n');
fs.writeFileSync(filePath, content, 'utf8');

console.log('Modified: ' + modified + ' subs');
if (failed.length > 0) {
  console.log('FAILED (' + failed.length + '):');
  failed.forEach(function(f) { console.log('  - ' + f); });
} else {
  console.log('All anchors added successfully!');
}

// Verify counts per relation
var relNames = ['ssom', 'lover', 'friend', 'colleague', 'family'];
relNames.forEach(function(rel) {
  var relStart = content.indexOf(rel + ':');
  if (relStart < 0) relStart = content.indexOf("'" + rel + "'");
  var nextRelIdx = content.length;
  relNames.forEach(function(r2) {
    if (r2 === rel) return;
    var ri = content.indexOf(r2 + ':', relStart + 10);
    if (ri < 0) ri = content.indexOf("'" + r2 + "':", relStart + 10);
    if (ri > 0 && ri < nextRelIdx) nextRelIdx = ri;
  });
  var relBlock = content.substring(relStart, nextRelIdx);
  var anchorCount = (relBlock.match(/anchor:/g) || []).length;
  console.log(rel + ': ' + anchorCount + ' anchors' + (anchorCount === 14 ? ' ✅' : ' ⚠️'));
});
