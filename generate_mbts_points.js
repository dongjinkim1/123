#!/usr/bin/env node
// ============================================================
// generate_mbts_points.js — MBTS 포인트 960개 배치 생성기
// 일주(60) × MBTI(16) = 960개
// Anthropic API (Sonnet 4.6) 직접 호출
// ============================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

// ── 설정 ──
const CONFIG = {
  model: 'claude-opus-4-6',
  maxTokens: 1024,
  rateDelay: 1500,       // 호출 간 대기 (ms)
  maxRetries: 3,          // 검증 실패 시 최대 재시도
  saveEvery: 10,          // N개마다 중간 저장
  outputFile: path.join(__dirname, 'public', 'mbts_points.js'),
  failLogFile: path.join(__dirname, 'mbts_points_fail.log'),
};

// ── API 키 ──
function getApiKey() {
  // 1) 커맨드라인 --key
  const keyIdx = process.argv.indexOf('--key');
  if (keyIdx >= 0 && process.argv[keyIdx + 1]) return process.argv[keyIdx + 1];

  // 2) 환경변수
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;

  // 3) .env.local 파일
  const envFiles = ['.env.local', '.env'];
  for (const f of envFiles) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
      const lines = fs.readFileSync(p, 'utf8').replace(/\r/g, '').split('\n');
      for (const line of lines) {
        const match = line.match(/^ANTHROPIC_API_KEY=(.+)$/);
        if (match) return match[1].trim();
      }
    }
  }
  return null;
}

// ── 60간지 목록 ──
const TGAN_KR = ['갑','을','병','정','무','기','경','신','임','계'];
const JIJI_KR = ['자','축','인','묘','진','사','오','미','신','유','술','해'];

const ILJU_60 = [];
for (let i = 0; i < 60; i++) {
  ILJU_60.push(TGAN_KR[i % 10] + JIJI_KR[i % 12]);
}

// ── MBTI 16유형 ──
const MBTI_16 = [
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP'
];

// ── 천간/지지 한자 매핑 ──
const TGAN_HJ = {'갑':'甲','을':'乙','병':'丙','정':'丁','무':'戊','기':'己','경':'庚','신':'辛','임':'壬','계':'癸'};
const JIJI_HJ = {'자':'子','축':'丑','인':'寅','묘':'卯','진':'辰','사':'巳','오':'午','미':'未','신':'申','유':'酉','술':'戌','해':'亥'};

// ── 오행 매핑 ──
const GAN_OH = {'갑':'양목','을':'음목','병':'양화','정':'음화','무':'양토','기':'음토','경':'양금','신':'음금','임':'양수','계':'음수'};
const GAN_YY = {'갑':'큰 나무, 곧은 줄기, 위로 뻗는 에너지, 정의감','을':'풀, 덩굴, 유연함, 부드럽게 파고드는 에너지','병':'한낮의 태양, 뜨거움, 밝음, 존재감, 열정','정':'촛불, 은은함, 집중된 빛, 섬세한 따뜻함','무':'큰 산, 무거운 안정감, 묵직함, 신뢰','기':'논밭, 품어주는 땅, 수용력, 실속','경':'강철, 칼날, 결단력, 날카로움, 원칙','신':'보석, 세공, 예리한 감각, 세련됨','임':'바다, 큰 강, 자유로움, 포용, 거침없는 흐름','계':'이슬, 비, 조용한 촉촉함, 직관, 감수성'};
const JI_OH = {'자':'수','축':'토','인':'목','묘':'목','진':'토','사':'화','오':'화','미':'토','신':'금','유':'금','술':'토','해':'수'};
const JI_YY = {'자':'한밤의 시작, 잠재력, 가능성의 씨앗','축':'겨울 끝 땅, 꾹 참는 힘, 뿌리','인':'새벽 호랑이, 시작의 에너지, 추진력','묘':'봄 아침, 부드러운 시작, 감성','진':'봄비 용, 변화의 기운, 야망','사':'뜨거운 시작, 지혜, 전략','오':'한낮, 정점의 에너지, 열정 폭발','미':'여름 끝, 성숙, 여유로운 따뜻함','신':'가을 시작, 실행력, 명쾌함','유':'가을 저녁, 세련됨, 완성미','술':'가을 끝, 충성, 지킴','해':'겨울 시작, 깊은 물, 사색'};

// ── 시스템 프롬프트 (프롬프트 설계서 그대로) ──
const SYSTEM_PROMPT = `너는 MBTS라는 사주×MBTI 서비스의 풀이 작가야.
사주 일주와 MBTI 조합에 따른 "MBTS 포인트"를 써줘.

■ 확정 샘플 (이 톤, 이 흐름을 그대로 따라가)

---샘플: 병오(丙午) × INFP---
사주에서 읽히는 에너지는, 한낮의 태양처럼 따뜻한 사람이에요. 근데 INFP라서 그 따뜻함을 조용히 건네요. 크게 티 안 내는데 옆에 있으면 편안해지는 사람이에요.
따뜻한 열정이 INFP의 이상주의와 만나면, 본인이 믿는 것에는 놀라울 정도로 단단해져요. 겉은 부드러운데 중심이 안 흔들려요.
MBTS에서 읽히는 밝은 기운 덕분에 사람들이 자연스럽게 마음을 열어요. INFP의 공감 능력까지 더해지면 "이 사람한테는 말해도 되겠다" 싶은 존재가 돼요.
본인의 에너지가 강한데 INFP라서 밖으로 안 쓰고 안으로 태워요. 그래서 창작이나 글에 손대면 남들이 못 따라오는 깊이가 나와요.
당신의 MBTS 포인트는 — 태양의 에너지를 내면에 품고 있는 사람이에요. 조용히 빛나는데, 그게 오히려 더 오래가요.
#조용한태양 #안에서타는불꽃 #말없이빛나는사람
---샘플 끝---


■ 양식 규칙 (반드시 지켜)

[구조] 정확히 5줄 + 해시태그 3개
- 1줄: "사주에서 읽히는 에너지는," 으로 시작. 일주의 핵심 에너지를 비유로.
- 2줄: "[특성]이 [MBTI]의 [특성]과 만나면," 교차 인사이트.
- 3줄: "MBTS에서 읽히는 [특성] 덕분에" 사회적 관계/소통 면에서의 교차.
- 4줄: "본인의 에너지가 [특성]인데 [MBTI]라서" 숨은 강점/반전.
- 5줄: "당신의 MBTS 포인트는 —" 한줄 마무리.
- 끝에 해시태그 3개 (#장면기반 #구체적 #캡쳐하고싶은)

[톤]
- "~에요" "~이에요" 친근한 존댓말
- 구체적 장면/비유 필수 ("한낮의 태양", "안으로 태워요", "조용히 빛나는")
- 사주 용어 직접 노출 금지 (천간, 지지, 오행 한자 쓰지 마)
- "사주에서 읽히는", "MBTS에서 읽히는" 이라고만 써서 자연스럽게 녹여

[절대 금지]
- "~해보세요", "~하면 좋겠어요" (조언)
- "~라는 뜻이에요", "~이기 때문이에요" (설명)
- 사주 전문 용어 직접 언급 (丙, 午, 양화, 음화 등)
- MBTI 공식 설명 복붙 ("INFP는 이상주의자로...")
- 뻔한 칭찬 ("리더십이 뛰어난", "공감 능력이 좋은")

[필수]
- 일주의 에너지를 자연/일상 비유로 풀기
- MBTI와 만나서 생기는 "반전" 또는 "시너지"를 구체적으로
- 읽는 사람이 캡쳐해서 카톡에 보내고 싶은 수준
- 해시태그는 풀이 전체를 3단어로 요약, 대화 소재가 되는 수준

■ 출력 포맷 (이것만 출력해. 다른 말 붙이지 마.)

사주에서 읽히는 에너지는, [비유]...
[특성]이 [MBTI]의 [특성]과 만나면, ...
MBTS에서 읽히는 [특성] 덕분에 ...
본인의 에너지가 [특성]인데 [MBTI]라서 ...
당신의 MBTS 포인트는 — ...
#해시태그1 #해시태그2 #해시태그3`;

// ── 유저 프롬프트 생성 ──
function buildUserPrompt(ilju, mbti) {
  const gan = ilju[0]; // 갑
  const ji = ilju[1];  // 자
  const hanja = TGAN_HJ[gan] + JIJI_HJ[ji];

  return `일주: ${ilju}(${hanja})
천간: ${GAN_OH[gan]} (${GAN_YY[gan]})
지지: ${JI_OH[ji]} (${JI_YY[ji]})
MBTI: ${mbti}

이 조합의 MBTS 포인트를 써줘.`;
}

// ── Anthropic API 호출 ──
function callAPI(apiKey, systemPrompt, userPrompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: CONFIG.model,
      max_tokens: CONFIG.maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(`API_ERROR: ${json.error.type} - ${json.error.message}`));
            return;
          }
          const text = json.content && json.content[0] && json.content[0].text;
          if (!text) {
            reject(new Error('EMPTY_RESPONSE'));
            return;
          }
          resolve(text.trim());
        } catch (e) {
          reject(new Error('JSON_PARSE: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error('TIMEOUT')); });
    req.write(body);
    req.end();
  });
}

// ── 검증 ──
function validate(text) {
  const errors = [];
  // 줄 분리 (해시태그 줄 포함해서 6줄)
  const lines = text.split('\n').filter(l => l.trim().length > 0);

  // 해시태그 줄 찾기
  const lastLine = lines[lines.length - 1];
  const hashtagMatch = lastLine.match(/#\S+/g);
  const hasHashtagLine = hashtagMatch && hashtagMatch.length >= 3;

  // 본문 줄 (해시태그 줄 제외)
  let bodyLines;
  if (hasHashtagLine) {
    // 마지막 줄이 해시태그만 있는 경우
    if (lastLine.trim().startsWith('#')) {
      bodyLines = lines.slice(0, lines.length - 1);
    } else {
      // 5번째 줄 끝에 해시태그가 붙어있는 경우
      bodyLines = lines.slice(0, lines.length);
      // 마지막 본문줄에서 해시태그 분리
      const body5 = bodyLines[bodyLines.length - 1].replace(/#\S+/g, '').trim();
      bodyLines[bodyLines.length - 1] = body5;
    }
  } else {
    bodyLines = lines;
    errors.push('해시태그 3개 없음');
  }

  // 5줄 체크
  if (bodyLines.length !== 5) {
    errors.push(`본문 ${bodyLines.length}줄 (5줄이어야 함)`);
  }

  // 1줄 시작
  if (bodyLines[0] && !bodyLines[0].startsWith('사주에서 읽히는 에너지는,')) {
    errors.push('1줄: "사주에서 읽히는 에너지는," 으로 시작 안 함');
  }

  // 5줄 시작
  if (bodyLines[4] && !bodyLines[4].startsWith('당신의 MBTS 포인트는 —') && !bodyLines[4].startsWith('당신의 MBTS 포인트는 -') && !bodyLines[4].startsWith('당신의 MBTS 포인트는—')) {
    errors.push('5줄: "당신의 MBTS 포인트는 —" 으로 시작 안 함');
  }

  // 해시태그 3개
  if (hasHashtagLine && hashtagMatch.length !== 3) {
    errors.push(`해시태그 ${hashtagMatch.length}개 (3개여야 함)`);
  }

  // 사주 전문 용어 체크 (일반 한국어 표현과 구분)
  const forbidden_exact = ['천간','지지','오행','甲','乙','丙','丁','戊','己','庚','辛','壬','癸',
    '子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥',
    '양목','음목','양화','음화','양토','음토','양금','음금','양수','음수',
    '비견','겁재','식신','상관','편재','정재','편관','정관','정인'];

  // "편인" 은 "편인데", "편인지", "편이에요" 같은 일반 표현과 구분해야 함
  const forbidden_context = [
    { term: '편인', exclude: /편인데|편인지|편인걸|편인가|편인듯/ }
  ];

  for (const term of forbidden_exact) {
    if (text.includes(term)) {
      errors.push(`금지어 포함: "${term}"`);
      break;
    }
  }
  if (errors.filter(e => e.startsWith('금지어')).length === 0) {
    for (const fc of forbidden_context) {
      // 먼저 일반 표현 제거 후 체크
      const cleaned = text.replace(fc.exclude, '___');
      if (cleaned.includes(fc.term)) {
        errors.push(`금지어 포함: "${fc.term}"`);
        break;
      }
    }
  }

  // 조언/설명 패턴
  if (/해보세요|하면 좋겠어요|라는 뜻이에요|이기 때문이에요/.test(text)) {
    errors.push('조언/설명 패턴 포함');
  }

  // 톤 체크 (~에요/~이에요)
  if (!text.includes('에요')) {
    errors.push('"~에요" 톤 없음');
  }

  return { valid: errors.length === 0, errors };
}

// ── 결과 파싱 ──
function parseResult(text) {
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  // 해시태그 추출
  const allTags = text.match(/#\S+/g) || [];
  const tags = allTags.slice(-3); // 마지막 3개

  // 본문: 해시태그 제거
  let bodyText = text;
  for (const tag of tags) {
    bodyText = bodyText.replace(tag, '');
  }
  bodyText = bodyText.trim();

  return {
    text: bodyText,
    tags: tags
  };
}

// ── 기존 데이터 로드 ──
function loadExisting() {
  if (!fs.existsSync(CONFIG.outputFile)) return {};
  const content = fs.readFileSync(CONFIG.outputFile, 'utf8');
  // var MBTS_POINTS = {...}; 에서 JSON 추출
  const match = content.match(/var MBTS_POINTS\s*=\s*(\{[\s\S]*\});/);
  if (!match) return {};
  try {
    return JSON.parse(match[1]);
  } catch (e) {
    console.error('⚠️  기존 파일 파싱 실패, 새로 시작합니다.');
    return {};
  }
}

// ── 저장 ──
function saveData(data) {
  const dir = path.dirname(CONFIG.outputFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const json = JSON.stringify(data, null, 2);
  const content = `/* MBTS 포인트 960개 — 자동 생성 파일 */\n/* 생성일: ${new Date().toISOString()} */\n\nvar MBTS_POINTS = ${json};\n`;
  fs.writeFileSync(CONFIG.outputFile, content, 'utf8');
}

// ── 실패 로그 ──
function logFail(key, errors, attempt) {
  const line = `[${new Date().toISOString()}] ${key} (시도 ${attempt}): ${errors.join(', ')}\n`;
  fs.appendFileSync(CONFIG.failLogFile, line, 'utf8');
}

// ── 대기 ──
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── 전체 키 목록 생성 ──
function getAllKeys() {
  const keys = [];
  for (const ilju of ILJU_60) {
    for (const mbti of MBTI_16) {
      keys.push(ilju + '_' + mbti);
    }
  }
  return keys;
}

// ── 진행률 표시 ──
function showProgress(done, total, key, startTime) {
  const pct = ((done / total) * 100).toFixed(1);
  const elapsed = (Date.now() - startTime) / 1000;
  const avgTime = elapsed / done;
  const remaining = Math.round(avgTime * (total - done));
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  process.stdout.write(`\r  [${done}/${total}] ${pct}% | ${key} | 남은시간 ~${mins}분 ${secs}초    `);
}

// ══════════════════════════════════
// 메인 실행
// ══════════════════════════════════
async function main() {
  const args = process.argv.slice(2);

  // 기존 데이터 로드
  const data = loadExisting();
  const existingCount = Object.keys(data).length;

  // 전체 키 목록
  const allKeys = getAllKeys();

  // --status: 진행률만 보여주기 (API 키 불필요)
  if (args.includes('--status')) {
    const total = 960;
    const done = Object.keys(data).length;
    console.log(`\n📊 MBTS 포인트 생성 현황`);
    console.log(`   완료: ${done} / ${total} (${((done/total)*100).toFixed(1)}%)`);
    console.log(`   남은: ${total - done}개`);
    if (done > 0) {
      console.log(`\n   일주별:`);
      for (const ilju of ILJU_60) {
        const count = MBTI_16.filter(m => data[ilju + '_' + m]).length;
        if (count > 0 && count < 16) {
          console.log(`   ${ilju}: ${count}/16`);
        }
      }
    }
    return;
  }

  // --dry-run: 키 목록만 출력 (API 키 불필요)
  if (args.includes('--dry-run')) {
    const missing = allKeys.filter(k => !data[k]);
    console.log(`\n📋 전체: ${allKeys.length}개 | 완료: ${existingCount}개 | 남은: ${missing.length}개\n`);
    if (missing.length <= 20) {
      missing.forEach(k => console.log('   ' + k));
    } else {
      missing.slice(0, 10).forEach(k => console.log('   ' + k));
      console.log(`   ... (${missing.length - 20}개 더)`);
      missing.slice(-10).forEach(k => console.log('   ' + k));
    }
    return;
  }

  // API 키 체크 (여기서부터 API 필요)
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('❌ API 키를 찾을 수 없습니다.');
    console.error('   방법 1: .env.local에 ANTHROPIC_API_KEY=sk-ant-...');
    console.error('   방법 2: node generate_mbts_points.js --key sk-ant-...');
    process.exit(1);
  }
  console.log('✅ API 키 확인됨');

  if (existingCount > 0) {
    console.log(`📂 기존 데이터 ${existingCount}개 로드됨 (이어쓰기)`);
  }

  // --preview: 1개만 생성해서 보여주기
  if (args.includes('--preview')) {
    // 아직 없는 것 중 랜덤 하나
    const missing = allKeys.filter(k => !data[k]);
    const key = missing[Math.floor(Math.random() * missing.length)] || '병오_INFP';
    const [ilju, mbti] = key.split('_');

    console.log(`\n🔍 미리보기: ${key}\n`);
    const userPrompt = buildUserPrompt(ilju, mbti);
    console.log('--- User Prompt ---');
    console.log(userPrompt);
    console.log('-------------------\n');

    try {
      const result = await callAPI(apiKey, SYSTEM_PROMPT, userPrompt);
      console.log('--- AI 응답 ---');
      console.log(result);
      console.log('----------------\n');

      const v = validate(result);
      if (v.valid) {
        console.log('✅ 검증 통과!');
      } else {
        console.log('❌ 검증 실패:');
        v.errors.forEach(e => console.log('   - ' + e));
      }
    } catch (e) {
      console.error('❌ API 오류:', e.message);
    }
    return;
  }

  // --count N: N개만 생성
  const countIdx = args.indexOf('--count');
  let limit = Infinity;
  if (countIdx >= 0 && args[countIdx + 1]) {
    limit = parseInt(args[countIdx + 1]);
    console.log(`🔢 ${limit}개만 생성합니다.`);
  }

  // 생성할 키 목록
  const toGenerate = allKeys.filter(k => !data[k]).slice(0, limit);
  if (toGenerate.length === 0) {
    console.log('\n🎉 모든 960개가 이미 완료되었습니다!');
    return;
  }

  console.log(`\n🚀 생성 시작: ${toGenerate.length}개`);
  console.log(`   모델: ${CONFIG.model}`);
  console.log(`   출력: ${CONFIG.outputFile}\n`);

  const startTime = Date.now();
  let generated = 0;
  let failed = 0;

  for (const key of toGenerate) {
    const [ilju, mbti] = key.split('_');
    const userPrompt = buildUserPrompt(ilju, mbti);

    let success = false;
    for (let attempt = 1; attempt <= CONFIG.maxRetries; attempt++) {
      try {
        const result = await callAPI(apiKey, SYSTEM_PROMPT, userPrompt);
        const v = validate(result);

        if (v.valid) {
          const parsed = parseResult(result);
          data[key] = parsed;
          generated++;
          success = true;
          showProgress(generated + existingCount, 960, key, startTime);
          break;
        } else {
          console.log(`\n⚠️  ${key} 검증 실패 (시도 ${attempt}/${CONFIG.maxRetries}): ${v.errors.join(', ')}`);
          logFail(key, v.errors, attempt);
          if (attempt < CONFIG.maxRetries) await sleep(1000);
        }
      } catch (e) {
        console.log(`\n❌ ${key} API 오류 (시도 ${attempt}/${CONFIG.maxRetries}): ${e.message}`);
        // overloaded면 30초 대기
        if (e.message.includes('overloaded') || e.message.includes('529')) {
          console.log('   ⏳ 서버 과부하, 30초 대기...');
          await sleep(30000);
        } else {
          await sleep(2000);
        }
      }
    }

    if (!success) {
      failed++;
      console.log(`\n💀 ${key} — ${CONFIG.maxRetries}회 실패, 스킵`);
    }

    // 중간 저장
    if ((generated + failed) % CONFIG.saveEvery === 0) {
      saveData(data);
    }

    // rate limit 대기
    await sleep(CONFIG.rateDelay);
  }

  // 최종 저장
  saveData(data);

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n\n✨ 완료!`);
  console.log(`   성공: ${generated}개`);
  console.log(`   실패: ${failed}개`);
  console.log(`   총 저장: ${Object.keys(data).length}/960`);
  console.log(`   소요: ${elapsed}분`);
  console.log(`   파일: ${CONFIG.outputFile}`);
  if (failed > 0) {
    console.log(`   실패 로그: ${CONFIG.failLogFile}`);
  }
}

main().catch(e => {
  console.error('\n💥 치명적 오류:', e.message);
  process.exit(1);
});
