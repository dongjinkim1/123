import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════
// DATA
// ═══════════════════════════════════════
const CITIES = ['모름','서울','부산','대구','인천','광주','대전','울산','세종','수원','성남','고양','용인','창원','청주','천안','전주','안산','안양','남양주','화성','평택','시흥','파주','김포','광명','군포','의왕','하남','오산','이천','양주','구리','포천','동두천','과천','여주','양평','가평','연천','춘천','원주','강릉','동해','태백','속초','삼척','홍천','횡성','영월','평창','정선','철원','화천','양구','인제','고성','양양','충주','제천','보은','옥천','영동','증평','진천','괴산','음성','단양','아산','공주','보령','서산','논산','계룡','당진','금산','부여','서천','청양','홍성','예산','태안','목포','여수','순천','나주','광양','담양','곡성','구례','고흥','보성','화순','장흥','강진','해남','영암','무안','함평','영광','장성','완도','진도','신안','익산','군산','정읍','남원','김제','완주','진안','무주','장수','임실','순창','고창','부안','포항','경주','김천','안동','구미','영주','영천','상주','문경','경산','군위','의성','청송','영양','영덕','청도','고령','성주','칠곡','예천','봉화','울진','울릉','진주','통영','사천','김해','밀양','거제','양산','의령','함안','창녕','고성','남해','하동','산청','함양','거창','합천','제주','서귀포','해외'];

const YEAR_LIST = Array.from({ length: 97 }, (_, i) => 2026 - i);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
const DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);
const HOUR_LIST = Array.from({ length: 24 }, (_, i) => i);
const MIN_LIST = Array.from({ length: 12 }, (_, i) => i * 5);

// ═══════════════════════════════════════
// ComboInput
// ═══════════════════════════════════════
function ComboInput({ value, onChange, placeholder, items, type = "number", renderItem, filterFn, inputMode, maxLen, fieldRef }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const wrapRef = useRef(null);
  const dropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (fieldRef) fieldRef.current = inputRef.current;
  }, [fieldRef]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setFilter("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && dropRef.current) {
      const sel = dropRef.current.querySelector('[data-selected="true"]');
      if (sel) sel.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open]);

  const displayItems = filterFn && filter ? items.filter(i => filterFn(i, filter)) : items;

  const handleInput = (e) => {
    const v = e.target.value;
    setFilter(v);
    if (type === "number") {
      const n = parseInt(v);
      if (!isNaN(n)) onChange(n);
      else if (v === "") onChange("");
    } else {
      onChange(v);
      if (v.length > 0 && filterFn) setOpen(true);
    }
  };

  const pick = (val) => {
    onChange(val);
    setFilter("");
    setOpen(false);
    if (inputRef.current) inputRef.current.blur();
  };

  const isFilled = value !== "" && value !== null && value !== undefined;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          ref={inputRef}
          type="text"
          inputMode={inputMode || (type === "number" ? "numeric" : "text")}
          maxLength={maxLen}
          value={open ? (filter || "") : (isFilled ? String(value) : "")}
          onChange={handleInput}
          onFocus={() => setFilter("")}
          placeholder={placeholder}
          style={{
            width: "100%", padding: "14px 36px 14px 16px", fontSize: 15, fontWeight: isFilled ? 600 : 400,
            border: "1.5px solid", borderColor: isFilled ? "rgba(178,152,120,0.35)" : open ? "rgba(178,152,120,0.4)" : "#ece6dc",
            borderRadius: 14, background: "#ffffff", color: isFilled ? "#1a1520" : "#888",
            outline: "none", fontFamily: "inherit", transition: "all 0.25s", boxSizing: "border-box",
            boxShadow: open ? "0 0 0 3px rgba(201,168,124,0.08)" : "none",
          }}
          autoComplete="off"
        />
        <button
          onClick={(e) => { e.preventDefault(); setOpen(!open); setFilter(""); }}
          style={{
            position: "absolute", right: 4, top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            background: "none", border: "none", cursor: "pointer", padding: "8px 10px",
            fontSize: 9, color: "#bbb", transition: "transform 0.25s ease",
          }}
        >▼</button>
      </div>

      {open && displayItems.length > 0 && (
        <div ref={dropRef} style={{
          position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0, zIndex: 9999,
          background: "#ffffff",
          border: "1px solid #e8e0d5",
          borderRadius: 14,
          boxShadow: "0 12px 36px rgba(30,20,10,0.14), 0 4px 12px rgba(30,20,10,0.08)",
          maxHeight: 200, overflowY: "auto", padding: 5,
        }}>
          {displayItems.map((item, idx) => {
            const isSelected = item.val === value;
            return (
              <div
                key={idx}
                data-selected={isSelected}
                onClick={() => pick(item.val)}
                style={{
                  padding: "10px 14px", fontSize: 14, fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#96784e" : "#4a4050",
                  background: isSelected ? "rgba(201,168,124,0.1)" : "#ffffff",
                  borderRadius: 10, cursor: "pointer", transition: "background 0.12s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!isSelected) e.target.style.background = "#faf6f1"; }}
                onMouseLeave={(e) => { e.target.style.background = isSelected ? "rgba(201,168,124,0.1)" : "#ffffff"; }}
              >
                {renderItem ? renderItem(item, filter) : item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════
export default function App() {
  const [name, setName] = useState("");
  const [isMe, setIsMe] = useState(true);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [cal, setCal] = useState("solar");
  const [leapMonth, setLeapMonth] = useState(false);
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [noTime, setNoTime] = useState(false);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [noCity, setNoCity] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  const refName = useRef(null);
  const refYear = useRef(null);
  const refMonth = useRef(null);
  const refDay = useRef(null);
  const refHour = useRef(null);
  const refMin = useRef(null);
  const refCity = useRef(null);
  const fieldOrder = [refName, refYear, refMonth, refDay, refHour, refMin, refCity];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") {
        const active = document.activeElement;
        const idx = fieldOrder.findIndex(r => r.current === active);
        if (idx >= 0 && idx < fieldOrder.length - 1) {
          e.preventDefault();
          fieldOrder[idx + 1].current?.focus();
        } else if (idx === fieldOrder.length - 1) {
          e.preventDefault();
          active?.blur();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isReady = name.trim() && year !== "" && month !== "" && day !== "" && gender;

  const yearItems = YEAR_LIST.map(y => ({ val: y, label: `${y}년` }));
  const monthItems = MONTH_LIST.map(m => ({ val: m, label: `${m}월` }));
  const dayItems = DAY_LIST.map(d => ({ val: d, label: `${d}일` }));
  const hourItems = [{ val: "", label: "모름" }, ...HOUR_LIST.map(h => ({ val: h, label: `${String(h).padStart(2, "0")}시` }))];
  const minItems = [{ val: "", label: "모름" }, ...MIN_LIST.map(m => ({ val: m, label: `${String(m).padStart(2, "0")}분` }))];
  const cityItems = CITIES.map(c => ({ val: c === "모름" ? "" : c, label: c }));

  const cityFilter = (item, query) => {
    if (!query) return true;
    return item.label !== "모름" && item.label.includes(query);
  };
  const cityRenderItem = (item, query) => {
    if (!query || !item.label.includes(query)) return item.label;
    const i = item.label.indexOf(query);
    return (<span>{item.label.slice(0, i)}<strong style={{ color: "#c9a87c" }}>{query}</strong>{item.label.slice(i + query.length)}</span>);
  };

  const handleNoTime = () => { const n = !noTime; setNoTime(n); if (n) { setHour(""); setMin(""); } };
  const handleNoCity = () => { const n = !noCity; setNoCity(n); if (n) setCity(""); };

  // 섹션별 스타일: 위 섹션일수록 z-index 높게 → 드롭다운이 아래 섹션 위에 뜸
  const sectionStyle = (order, zIdx) => ({
    position: "relative",
    zIndex: zIdx,
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${0.05 + order * 0.06}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.05 + order * 0.06}s`,
  });

  return (
    <div style={{
      minHeight: "100vh", background: "#fcfaf7",
      fontFamily: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;500;700&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes gentleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: #bfb5a8 !important; }
        * { -webkit-tap-highlight-color: transparent; }
        .birth-cta:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(139,116,97,0.35) !important; }
        .birth-cta:active:not(:disabled) { transform: translateY(0) scale(0.99); }
        .gender-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.06) !important; }
        .gender-btn:active { transform: scale(0.97); }
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 380, background: "linear-gradient(180deg, #f0ebe3 0%, #f5f0ea 50%, #fcfaf7 100%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,124,0.06), transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 100, left: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,140,190,0.05), transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 60, right: 28, fontSize: 52, opacity: 0.04, transform: "rotate(15deg)", pointerEvents: "none", animation: "gentleFloat 6s ease-in-out infinite" }}>✦</div>
      <div style={{ position: "absolute", top: 240, left: 18, fontSize: 28, opacity: 0.04, pointerEvents: "none" }}>☽</div>

      {/* ── Main ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 440, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: 48, marginBottom: 28, ...sectionStyle(0, 10) }}>
          <button style={{
            background: "none", border: "none", fontSize: 13, color: "#b5a89c",
            cursor: "pointer", fontFamily: "inherit", fontWeight: 500, marginBottom: 22, padding: 0,
            display: "flex", alignItems: "center", gap: 4,
          }}>← 돌아가기</button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#c9a87c", letterSpacing: 2.5 }}>STEP 01</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,168,124,0.3), transparent)" }} />
            <span style={{ fontSize: 10, color: "#d5ccc0", letterSpacing: 1 }}>01 — 03</span>
          </div>

          <h1 style={{
            fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: 26, fontWeight: 700,
            color: "#1a1520", lineHeight: 1.5, letterSpacing: -1, marginBottom: 8,
          }}>
            당신의 이야기는<br />
            <span style={{ color: "#c9a87c" }}>언제</span> 시작되었나요
          </h1>
          <p style={{ fontSize: 13, color: "#a9a0b0", fontWeight: 400, lineHeight: 1.7 }}>
            시간과 출생지까지 입력하면 더 정확한 풀이가 가능해요
          </p>
        </div>

        {/* ── Form ── */}

        {/* ━━ 이름 ━━ */}
        <div style={{ ...sectionStyle(1, 60), marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7a7080", letterSpacing: 0.5 }}>이름</label>
            <button onClick={() => setIsMe(!isMe)} style={{
              background: "none", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", color: isMe ? "#c9a87c" : "#ccc",
              display: "flex", alignItems: "center", gap: 5, padding: 0, transition: "color 0.25s",
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: 5, display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: isMe ? "#c9a87c" : "transparent", border: isMe ? "none" : "1.5px solid #ddd",
                fontSize: 9, color: "#fff", transition: "all 0.25s", flexShrink: 0,
              }}>{isMe ? "✓" : ""}</span>
              본인
            </button>
          </div>
          <input
            ref={refName}
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="이름 또는 별명" maxLength={10}
            style={{
              width: "100%", padding: "14px 16px", fontSize: 15, fontWeight: name ? 600 : 400,
              border: "1.5px solid", borderColor: name ? "rgba(178,152,120,0.35)" : "#ece6dc",
              borderRadius: 14, background: "#ffffff", color: "#1a1520", outline: "none",
              fontFamily: "inherit", transition: "all 0.3s", boxSizing: "border-box",
            }}
          />
        </div>

        {/* ━━ 생년월일 ━━ */}
        <div style={{ ...sectionStyle(2, 50), marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7a7080", letterSpacing: 0.5 }}>생년월일</label>
            <div style={{ display: "flex", background: "#f3ede5", borderRadius: 9, padding: 2.5 }}>
              {[["solar", "양력"], ["lunar", "음력"]].map(([v, l]) => (
                <button key={v} onClick={() => { setCal(v); if (v === "solar") setLeapMonth(false); }} style={{
                  padding: "5px 14px", borderRadius: 7, border: "none", fontSize: 11, fontWeight: 600,
                  background: cal === v ? "#fff" : "transparent", color: cal === v ? "#96784e" : "#b5a89c",
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
                  boxShadow: cal === v ? "0 1px 5px rgba(0,0,0,0.06)" : "none",
                }}>{l}</button>
              ))}
            </div>
            {cal === "lunar" && (
              <button onClick={() => setLeapMonth(!leapMonth)} style={{
                display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
                fontSize: 11, fontWeight: 600, color: leapMonth ? "#c9a87c" : "#c4b8aa",
                cursor: "pointer", fontFamily: "inherit", padding: 0, transition: "all 0.3s",
              }}>
                <span style={{
                  width: 15, height: 15, borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: leapMonth ? "#c9a87c" : "transparent", border: leapMonth ? "none" : "1.5px solid #d5cfc5",
                  fontSize: 8, color: "#fff", transition: "all 0.25s", flexShrink: 0,
                }}>{leapMonth ? "✓" : ""}</span>
                윤달
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1.5 }}>
              <ComboInput fieldRef={refYear} value={year} onChange={setYear} placeholder="예: 1995" type="number" inputMode="numeric" maxLen={4} items={yearItems} />
            </div>
            <div style={{ flex: 1 }}>
              <ComboInput fieldRef={refMonth} value={month} onChange={setMonth} placeholder="월" type="number" inputMode="numeric" maxLen={2} items={monthItems} />
            </div>
            <div style={{ flex: 1 }}>
              <ComboInput fieldRef={refDay} value={day} onChange={setDay} placeholder="일" type="number" inputMode="numeric" maxLen={2} items={dayItems} />
            </div>
          </div>
        </div>

        {/* ━━ 태어난 시간 ━━ */}
        <div style={{ ...sectionStyle(3, 40), marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7a7080", letterSpacing: 0.5 }}>태어난 시간</label>
            <span style={{ fontSize: 11, color: "#d0c7bb" }}>선택사항</span>
          </div>
          {!noTime ? (
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <ComboInput fieldRef={refHour} value={hour} onChange={setHour} placeholder="시" type="number" inputMode="numeric" maxLen={2} items={hourItems} />
              </div>
              <div style={{ flex: 1 }}>
                <ComboInput fieldRef={refMin} value={min} onChange={setMin} placeholder="분" type="number" inputMode="numeric" maxLen={2} items={minItems} />
              </div>
              <button onClick={handleNoTime} style={{
                flex: 1, padding: "14px 8px", borderRadius: 14, border: "1.5px solid #ece6dc",
                background: "#ffffff", color: "#b5a89c", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s", whiteSpace: "nowrap",
              }}>모름</button>
            </div>
          ) : (
            <div onClick={handleNoTime} style={{
              padding: "16px 20px", borderRadius: 14, background: "#f8f5f0",
              border: "1.5px solid #e8e0d5", display: "flex", alignItems: "center",
              justifyContent: "space-between", cursor: "pointer",
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#8a7e6a", marginBottom: 2 }}>시간 몰라도 괜찮아요 ✦</div>
                <div style={{ fontSize: 11, color: "#b5a99a" }}>시간 없이도 분석할 수 있어요</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#96784e", padding: "5px 12px", borderRadius: 8, background: "rgba(201,168,124,0.1)", border: "1px solid rgba(201,168,124,0.15)" }}>다시 입력</span>
            </div>
          )}
        </div>

        {/* ━━ 출생지 ━━ */}
        <div style={{ ...sectionStyle(4, 30), marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#7a7080", letterSpacing: 0.5 }}>출생지</label>
            <span style={{ fontSize: 11, color: "#d0c7bb" }}>시차 보정에 사용돼요</span>
          </div>
          {!noCity ? (
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}>
                <ComboInput fieldRef={refCity} value={city} onChange={setCity} placeholder="도시명 입력 또는 선택" type="text" items={cityItems} filterFn={cityFilter} renderItem={cityRenderItem} />
              </div>
              <button onClick={handleNoCity} style={{
                padding: "14px 16px", borderRadius: 14, border: "1.5px solid #ece6dc",
                background: "#ffffff", color: "#b5a89c", fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>모름</button>
            </div>
          ) : (
            <div onClick={handleNoCity} style={{
              padding: "16px 20px", borderRadius: 14, background: "#f8f5f0",
              border: "1.5px solid #e8e0d5", display: "flex", alignItems: "center",
              justifyContent: "space-between", cursor: "pointer",
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#8a7e6a", marginBottom: 2 }}>출생지 몰라도 괜찮아요 ✦</div>
                <div style={{ fontSize: 11, color: "#b5a99a" }}>출생지 없이도 분석 가능해요</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#96784e", padding: "5px 12px", borderRadius: 8, background: "rgba(201,168,124,0.1)", border: "1px solid rgba(201,168,124,0.15)" }}>다시 입력</span>
            </div>
          )}
        </div>

        {/* ━━ 성별 ━━ */}
        <div style={{ ...sectionStyle(5, 20), marginBottom: 0 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#7a7080", letterSpacing: 0.5, marginBottom: 8 }}>성별</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[["M", "남성", "#4A90D9"], ["F", "여성", "#D94A78"]].map(([v, label, clr]) => (
              <button key={v} className="gender-btn" onClick={() => setGender(v)} style={{
                flex: 1, padding: "15px 12px", borderRadius: 14, border: "1.5px solid",
                borderColor: gender === v ? `${clr}55` : "#ece6dc",
                background: gender === v ? `${clr}0a` : "#ffffff",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: gender === v ? `0 4px 16px ${clr}15` : "none",
              }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: gender === v ? clr : "#bbb", transition: "color 0.3s" }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ ...sectionStyle(6, 10), marginTop: 36 }}>
          <button
            className="birth-cta"
            disabled={!isReady}
            onClick={() => isReady && alert("✨ MBTI 테스트로 넘어갑니다!")}
            style={{
              width: "100%", padding: "17px", borderRadius: 16, border: "none",
              fontSize: 16, fontWeight: 700, fontFamily: "inherit", letterSpacing: -0.3,
              background: isReady ? "linear-gradient(135deg, #8B7461 0%, #7A6352 100%)" : "rgba(0,0,0,0.04)",
              color: isReady ? "#FFFFFF" : "#ccc",
              cursor: isReady ? "pointer" : "default",
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isReady ? "0 8px 32px rgba(139,116,97,0.3)" : "none",
              position: "relative", overflow: "hidden",
            }}
          >
            {isReady && (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
                backgroundSize: "200% 100%", animation: "shimmer 4s ease-in-out infinite",
              }} />
            )}
            <span style={{ position: "relative" }}>다음 단계 →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
