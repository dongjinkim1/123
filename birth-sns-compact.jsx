import { useState, useRef, useEffect } from "react";

const CITIES = ['모름','서울','부산','대구','인천','광주','대전','울산','세종','수원','성남','고양','용인','창원','청주','천안','전주','춘천','원주','강릉','제주','서귀포','해외'];
const YEAR_LIST = Array.from({ length: 97 }, (_, i) => 2026 - i);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => i + 1);
const DAY_LIST = Array.from({ length: 31 }, (_, i) => i + 1);
const HOUR_LIST = Array.from({ length: 24 }, (_, i) => i);
const MIN_LIST = Array.from({ length: 12 }, (_, i) => i * 5);

function ComboInput({ value, onChange, placeholder, items, type = "number", renderItem, filterFn, inputMode, maxLen, fieldRef }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const wrapRef = useRef(null);
  const dropRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { if (fieldRef) fieldRef.current = inputRef.current; }, [fieldRef]);
  useEffect(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) { setOpen(false); setFilter(""); } };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open && dropRef.current) { const s = dropRef.current.querySelector('[data-selected="true"]'); if (s) s.scrollIntoView({ block: "center", behavior: "instant" }); } }, [open]);
  const displayItems = filterFn && filter ? items.filter(i => filterFn(i, filter)) : items;
  const handleInput = (e) => { const v = e.target.value; setFilter(v); if (type === "number") { const n = parseInt(v); if (!isNaN(n)) onChange(n); else if (v === "") onChange(""); } else { onChange(v); if (v.length > 0 && filterFn) setOpen(true); } };
  const pick = (val) => { onChange(val); setFilter(""); setOpen(false); if (inputRef.current) inputRef.current.blur(); };
  const isFilled = value !== "" && value !== null && value !== undefined;
  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <input ref={inputRef} type="text" inputMode={inputMode || (type === "number" ? "numeric" : "text")} maxLength={maxLen}
          value={open ? (filter || "") : (isFilled ? String(value) : "")} onChange={handleInput} onFocus={() => setFilter("")} placeholder={placeholder}
          style={{ width: "100%", padding: "12px 36px 12px 14px", fontSize: 15, fontWeight: isFilled ? 600 : 400, border: "1.5px solid", borderColor: isFilled ? "rgba(139,108,193,0.25)" : open ? "rgba(139,108,193,0.3)" : "rgba(255,255,255,0.6)", borderRadius: 14, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", color: isFilled ? "#3D2E5C" : "#9B8CB8", outline: "none", fontFamily: "inherit", transition: "all 0.3s", boxSizing: "border-box", boxShadow: open ? "0 0 0 3px rgba(139,108,193,0.06), 0 4px 20px rgba(139,108,193,0.06)" : isFilled ? "0 2px 12px rgba(139,108,193,0.04)" : "none" }} autoComplete="off" />
        <button onClick={(e) => { e.preventDefault(); setOpen(!open); setFilter(""); }}
          style={{ position: "absolute", right: 6, top: "50%", transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`, background: "none", border: "none", cursor: "pointer", padding: "8px", fontSize: 9, color: "#B0A0C8", transition: "transform 0.25s ease" }}>▼</button>
      </div>
      {open && displayItems.length > 0 && (
        <div ref={dropRef} style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 9999, background: "#ffffff", border: "1px solid rgba(139,108,193,0.1)", borderRadius: 16, boxShadow: "0 16px 48px rgba(80,50,120,0.12), 0 4px 12px rgba(80,50,120,0.06)", maxHeight: 200, overflowY: "auto", padding: 6 }}>
          {displayItems.map((item, idx) => {
            const isS = item.val === value;
            return (<div key={idx} data-selected={isS} onClick={() => pick(item.val)} style={{ padding: "11px 14px", fontSize: 14, fontWeight: isS ? 700 : 500, color: isS ? "#7B5DAF" : "#4a4050", background: isS ? "rgba(139,108,193,0.07)" : "#fff", borderRadius: 11, cursor: "pointer", transition: "background 0.12s", fontFamily: "inherit" }}
              onMouseEnter={(e) => { if (!isS) e.target.style.background = "rgba(139,108,193,0.03)"; }}
              onMouseLeave={(e) => { e.target.style.background = isS ? "rgba(139,108,193,0.07)" : "#fff"; }}>
              {renderItem ? renderItem(item, filter) : item.label}</div>);
          })}
        </div>
      )}
    </div>
  );
}

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
  useEffect(() => { requestAnimationFrame(() => setLoaded(true)); }, []);

  const refName = useRef(null); const refYear = useRef(null); const refMonth = useRef(null);
  const refDay = useRef(null); const refHour = useRef(null); const refMin = useRef(null); const refCity = useRef(null);

  const isReady = name.trim() && year !== "" && month !== "" && day !== "" && gender;
  const yearItems = YEAR_LIST.map(y => ({ val: y, label: `${y}년` }));
  const monthItems = MONTH_LIST.map(m => ({ val: m, label: `${m}월` }));
  const dayItems = DAY_LIST.map(d => ({ val: d, label: `${d}일` }));
  const hourItems = [{ val: "", label: "모름" }, ...HOUR_LIST.map(h => ({ val: h, label: `${String(h).padStart(2, "0")}시` }))];
  const minItems = [{ val: "", label: "모름" }, ...MIN_LIST.map(m => ({ val: m, label: `${String(m).padStart(2, "0")}분` }))];
  const cityItems = CITIES.map(c => ({ val: c === "모름" ? "" : c, label: c }));
  const cityFilter = (item, q) => !q ? true : item.label !== "모름" && item.label.includes(q);
  const cityRenderItem = (item, q) => { if (!q || !item.label.includes(q)) return item.label; const i = item.label.indexOf(q); return (<span>{item.label.slice(0, i)}<strong style={{ color: "#8B6CC1" }}>{q}</strong>{item.label.slice(i + q.length)}</span>); };

  const handleNoTime = () => { const n = !noTime; setNoTime(n); if (n) { setHour(""); setMin(""); } };
  const handleNoCity = () => { const n = !noCity; setNoCity(n); if (n) setCity(""); };

  const sec = (order, z) => ({
    position: "relative", zIndex: z,
    opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + order * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + order * 0.08}s`,
  });

  const lab = { fontSize: 12, fontWeight: 700, color: "#5A4580", letterSpacing: 0.3 };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F6F9", fontFamily: "'Pretendard Variable', -apple-system, sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;500;700&display=swap');
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 25%{transform:translate(18px,-12px) scale(1.03)} 50%{transform:translate(-8px,16px) scale(0.97)} 75%{transform:translate(12px,6px) scale(1.01)} }
        @keyframes twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.7} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes gentleSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        input::placeholder { color: #B0A0C8 !important; font-weight: 400 !important; }
        * { -webkit-tap-highlight-color: transparent; }
        .b-cta:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(107,79,160,0.35) !important; }
        .b-cta:active:not(:disabled) { transform: translateY(0) scale(0.98); }
        .g-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .g-btn:active { transform: scale(0.97); }
        .no-card:hover { background: rgba(139,108,193,0.06) !important; }
      `}</style>

      {/* ══ Ambient: 그라데이션 + orbs + 별 ══ */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* Main gradient */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(165deg, rgba(210,195,240,0.5) 0%, rgba(230,215,250,0.35) 25%, rgba(245,225,235,0.25) 50%, rgba(248,246,249,0) 100%)" }} />
        {/* Orbs */}
        <div style={{ position: "absolute", top: -60, right: -40, width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,108,193,0.12) 0%, transparent 65%)", filter: "blur(50px)", animation: "orbDrift 25s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 250, left: -90, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,176,232,0.1) 0%, transparent 65%)", filter: "blur(50px)", animation: "orbDrift 25s ease-in-out infinite", animationDelay: "-8s" }} />
        <div style={{ position: "absolute", top: 500, right: -50, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,170,190,0.08) 0%, transparent 65%)", filter: "blur(45px)", animation: "orbDrift 25s ease-in-out infinite", animationDelay: "-16s" }} />
        <div style={{ position: "absolute", bottom: 100, left: 30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,200,240,0.06) 0%, transparent 65%)", filter: "blur(40px)", animation: "orbDrift 25s ease-in-out infinite", animationDelay: "-12s" }} />
        {/* Stars */}
        {[
          { top: 80, left: "15%", size: 3, delay: 0 }, { top: 140, right: "20%", size: 2, delay: 0.8 },
          { top: 220, left: "8%", size: 2.5, delay: 1.6 }, { top: 60, right: "35%", size: 2, delay: 2.4 },
          { top: 320, right: "12%", size: 3, delay: 0.4 }, { top: 180, left: "42%", size: 1.5, delay: 3 },
          { top: 400, left: "25%", size: 2, delay: 1.2 }, { top: 110, left: "55%", size: 2, delay: 2 },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", top: s.top, left: s.left, right: s.right, width: s.size, height: s.size, borderRadius: "50%", background: "rgba(180,160,220,0.8)", animation: `twinkle ${2.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${s.delay}s` }} />
        ))}
        {/* Moon */}
        <div style={{ position: "absolute", top: 45, right: 45, fontSize: 22, opacity: 0.12, animation: "float 5s ease-in-out infinite" }}>☽</div>
        {/* Sparkle */}
        <div style={{ position: "absolute", top: 165, left: 35, fontSize: 14, opacity: 0.08, animation: "float 4s ease-in-out infinite", animationDelay: "-1.5s" }}>✦</div>
      </div>

      {/* ══ Content ══ */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 420, margin: "0 auto", padding: "0 24px 40px" }}>

        {/* ── Header ── */}
        <div style={{ paddingTop: 36, marginBottom: 18, ...sec(0, 10) }}>
          <button style={{ background: "none", border: "none", fontSize: 13, color: "#8B6CC1", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, marginBottom: 16, padding: 0, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ fontSize: 16 }}>←</span> 돌아가기
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "#8B6CC1", letterSpacing: 3, textTransform: "uppercase" }}>Step 01</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(139,108,193,0.2), transparent)" }} />
            <span style={{ fontSize: 10, color: "#C4B0E8", letterSpacing: 1.5, fontWeight: 500 }}>01 — 03</span>
          </div>

          <h1 style={{ fontFamily: "'Noto Serif KR', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#2E1F4E", lineHeight: 1.5, letterSpacing: -1, marginBottom: 6 }}>
            당신의 이야기는 <span style={{ background: "linear-gradient(135deg, #8B6CC1, #B88ED8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>언제</span> 시작되었나요
          </h1>
          <p style={{ fontSize: 12.5, color: "#9B8CB8", fontWeight: 400, lineHeight: 1.6 }}>
            시간과 출생지까지 입력하면 더 정확한 풀이가 가능해요
          </p>
        </div>

        {/* ── Card ── */}
        <div style={{
          background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)", borderRadius: 24,
          padding: "20px 20px 24px", boxShadow: "0 4px 16px rgba(139,108,193,0.05), 0 12px 48px rgba(100,70,150,0.07), 0 0 0 1px rgba(139,108,193,0.03)",
        }}>

          {/* ━━ 이름 ━━ */}
          <div style={{ ...sec(1, 60), marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={lab}>이름</label>
              <button onClick={() => setIsMe(!isMe)} style={{
                background: "none", border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", color: isMe ? "#8B6CC1" : "#C4B0E8",
                display: "flex", alignItems: "center", gap: 5, padding: 0, transition: "color 0.25s",
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 5, display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: isMe ? "linear-gradient(135deg, #8B6CC1, #A07DD6)" : "transparent",
                  border: isMe ? "none" : "1.5px solid #C4B0E8",
                  fontSize: 9, color: "#fff", transition: "all 0.25s", flexShrink: 0,
                  boxShadow: isMe ? "0 2px 8px rgba(139,108,193,0.25)" : "none",
                }}>{isMe ? "✓" : ""}</span>
                본인
              </button>
            </div>
            <input ref={refName} type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="이름 또는 별명" maxLength={10}
              style={{
                width: "100%", padding: "12px 14px", fontSize: 15, fontWeight: name ? 600 : 400,
                border: "1.5px solid", borderColor: name ? "rgba(139,108,193,0.25)" : "rgba(255,255,255,0.6)",
                borderRadius: 14, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)",
                color: "#3D2E5C", outline: "none", fontFamily: "inherit", transition: "all 0.3s", boxSizing: "border-box",
                boxShadow: name ? "0 2px 12px rgba(139,108,193,0.05)" : "none",
              }}
            />
          </div>

          {/* ━━ 생년월일 ━━ */}
          <div style={{ ...sec(2, 50), marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
              <label style={lab}>생년월일</label>
              <div style={{ display: "flex", background: "rgba(139,108,193,0.06)", borderRadius: 10, padding: 3 }}>
                {[["solar", "양력"], ["lunar", "음력"]].map(([v, l]) => (
                  <button key={v} onClick={() => { setCal(v); if (v === "solar") setLeapMonth(false); }} style={{
                    padding: "5px 14px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 600,
                    background: cal === v ? "#fff" : "transparent", color: cal === v ? "#7B5DAF" : "#B0A0C8",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
                    boxShadow: cal === v ? "0 2px 8px rgba(139,108,193,0.1)" : "none",
                  }}>{l}</button>
                ))}
              </div>
              {cal === "lunar" && (
                <button onClick={() => setLeapMonth(!leapMonth)} style={{
                  display: "flex", alignItems: "center", gap: 4, background: "none", border: "none",
                  fontSize: 11, fontWeight: 600, color: leapMonth ? "#8B6CC1" : "#C4B0E8",
                  cursor: "pointer", fontFamily: "inherit", padding: 0,
                }}>
                  <span style={{
                    width: 15, height: 15, borderRadius: 4, display: "inline-flex", alignItems: "center", justifyContent: "center",
                    background: leapMonth ? "linear-gradient(135deg, #8B6CC1, #A07DD6)" : "transparent",
                    border: leapMonth ? "none" : "1.5px solid #C4B0E8", fontSize: 8, color: "#fff", transition: "all 0.25s",
                  }}>{leapMonth ? "✓" : ""}</span>
                  윤달
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1.5 }}><ComboInput fieldRef={refYear} value={year} onChange={setYear} placeholder="예: 1995" type="number" inputMode="numeric" maxLen={4} items={yearItems} /></div>
              <div style={{ flex: 1 }}><ComboInput fieldRef={refMonth} value={month} onChange={setMonth} placeholder="월" type="number" inputMode="numeric" maxLen={2} items={monthItems} /></div>
              <div style={{ flex: 1 }}><ComboInput fieldRef={refDay} value={day} onChange={setDay} placeholder="일" type="number" inputMode="numeric" maxLen={2} items={dayItems} /></div>
            </div>
          </div>

          {/* ━━ 시간 ━━ */}
          <div style={{ ...sec(3, 40), marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <label style={lab}>태어난 시간</label>
              <span style={{ fontSize: 10, color: "#C4B0E8", fontWeight: 500 }}>선택</span>
            </div>
            {!noTime ? (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}><ComboInput fieldRef={refHour} value={hour} onChange={setHour} placeholder="시" type="number" inputMode="numeric" maxLen={2} items={hourItems} /></div>
                <div style={{ flex: 1 }}><ComboInput fieldRef={refMin} value={min} onChange={setMin} placeholder="분" type="number" inputMode="numeric" maxLen={2} items={minItems} /></div>
                <button onClick={handleNoTime} style={{
                  flex: 0.85, padding: "12px 8px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.45)", color: "#9B8CB8", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s", whiteSpace: "nowrap",
                }}>모름</button>
              </div>
            ) : (
              <div className="no-card" onClick={handleNoTime} style={{
                padding: "13px 16px", borderRadius: 14, background: "rgba(139,108,193,0.04)",
                border: "1.5px solid rgba(139,108,193,0.1)", display: "flex", alignItems: "center",
                justifyContent: "space-between", cursor: "pointer", transition: "background 0.2s",
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#6B5A80", marginBottom: 2 }}>시간 몰라도 괜찮아요 ✦</div>
                  <div style={{ fontSize: 11, color: "#9B8CB8" }}>시간 없이도 분석할 수 있어요</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#8B6CC1", padding: "5px 12px", borderRadius: 8, background: "rgba(139,108,193,0.06)", border: "1px solid rgba(139,108,193,0.1)" }}>다시 입력</span>
              </div>
            )}
          </div>

          {/* ━━ 출생지 ━━ */}
          <div style={{ ...sec(4, 30), marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <label style={lab}>출생지</label>
              <span style={{ fontSize: 10, color: "#C4B0E8", fontWeight: 500 }}>시차 보정</span>
            </div>
            {!noCity ? (
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}><ComboInput fieldRef={refCity} value={city} onChange={setCity} placeholder="도시명 입력 또는 선택" type="text" items={cityItems} filterFn={cityFilter} renderItem={cityRenderItem} /></div>
                <button onClick={handleNoCity} style={{
                  padding: "12px 12px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.45)", color: "#9B8CB8", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s", whiteSpace: "nowrap", flexShrink: 0,
                }}>모름</button>
              </div>
            ) : (
              <div className="no-card" onClick={handleNoCity} style={{
                padding: "13px 16px", borderRadius: 14, background: "rgba(139,108,193,0.04)",
                border: "1.5px solid rgba(139,108,193,0.1)", display: "flex", alignItems: "center",
                justifyContent: "space-between", cursor: "pointer", transition: "background 0.2s",
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#6B5A80", marginBottom: 2 }}>출생지 몰라도 괜찮아요 ✦</div>
                  <div style={{ fontSize: 11, color: "#9B8CB8" }}>출생지 없이도 분석 가능해요</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#8B6CC1", padding: "5px 12px", borderRadius: 8, background: "rgba(139,108,193,0.06)", border: "1px solid rgba(139,108,193,0.1)" }}>다시 입력</span>
              </div>
            )}
          </div>

          {/* ━━ 성별 ━━ */}
          <div style={{ ...sec(5, 20), marginBottom: 0 }}>
            <label style={{ display: "block", ...lab, marginBottom: 6 }}>성별</label>
            <div style={{ display: "flex", gap: 10 }}>
              {[["M", "남성", "#5B8FD4", "rgba(91,143,212,0.06)"], ["F", "여성", "#D4738B", "rgba(212,115,139,0.06)"]].map(([v, label, clr, bg]) => (
                <button key={v} className="g-btn" onClick={() => setGender(v)} style={{
                  flex: 1, padding: "12px 10px", borderRadius: 14, border: "1.5px solid",
                  borderColor: gender === v ? `${clr}50` : "rgba(255,255,255,0.6)",
                  background: gender === v ? bg : "rgba(255,255,255,0.45)",
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: gender === v ? `0 4px 18px ${clr}18` : "none",
                  backdropFilter: "blur(8px)",
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: gender === v ? clr : "#9B8CB8", transition: "color 0.3s" }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ ...sec(6, 10), marginTop: 20 }}>
          <button className="b-cta" disabled={!isReady}
            onClick={() => isReady && alert("✨ MBTI 테스트로 넘어갑니다!")}
            style={{
              width: "100%", padding: "16px", borderRadius: 18, border: "none",
              fontSize: 16, fontWeight: 700, fontFamily: "inherit", letterSpacing: -0.3,
              background: isReady ? "linear-gradient(135deg, #8B6CC1 0%, #7B5DAF 50%, #6B4FA0 100%)" : "rgba(139,108,193,0.08)",
              color: isReady ? "#fff" : "#C4B0E8",
              cursor: isReady ? "pointer" : "default",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isReady ? "0 8px 36px rgba(107,79,160,0.3)" : "none",
              position: "relative", overflow: "hidden",
            }}>
            {isReady && (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)", backgroundSize: "200% 100%", animation: "shimmer 3s ease-in-out infinite" }} />
            )}
            <span style={{ position: "relative" }}>다음 단계 →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
