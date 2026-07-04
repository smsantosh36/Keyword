"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [mode, setMode] = useState("quick");
  const [results, setResults] = useState([]);
  const [seed, setSeed] = useState("");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [sortKey, setSortKey] = useState("volume");
  const [sortDir, setSortDir] = useState(-1);
  const inputRef = useRef(null);

  async function runSearch() {
    const keyword = inputRef.current.value.trim();
    if (!keyword) {
      inputRef.current.focus();
      return;
    }

    setLoading(true);
    setErrored(false);
    setSeed(keyword);

    try {
      const res = await fetch(`/api/suggestions?keyword=${encodeURIComponent(keyword)}&mode=${mode}`);
      if (!res.ok) throw new Error("Server error: " + res.status);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setErrored(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") runSearch();
  }

  function sortedResults() {
    const copy = [...results];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string") return sortDir * av.localeCompare(bv);
      return sortDir * (av - bv);
    });
    return copy;
  }

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir(sortDir * -1);
    } else {
      setSortKey(key);
      setSortDir(-1);
    }
  }

  function diffColor(d) {
    if (d < 35) return "var(--accent)";
    if (d < 65) return "var(--accent-2)";
    return "var(--danger)";
  }

  function exportCsv() {
    if (!results.length) return;
    const header = "Keyword,Volume,Difficulty,CPC,Type\n";
    const rows = results
      .map((r) => `"${r.keyword.replace(/"/g, '""')}",${r.volume},${r.difficulty},${r.cpc},${r.type}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "keyword-suggestions.csv";
    a.click();
  }

  const sorted = sortedResults();

  return (
    <>
      <div className="hero">
        <div className="hero-top">
          <div className="brand">
            <span className="dot"></span>KeywordRadar
            <small>SEO KEYWORD SUGGESTION TOOL</small>
          </div>
        </div>
        <div className="search-row">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Seed keyword daalein — jaise: yoga classes, coffee shop, digital marketing"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="mode-toggle">
            <button className={mode === "quick" ? "active" : ""} onClick={() => setMode("quick")}>
              QUICK
            </button>
            <button className={mode === "deep" ? "active" : ""} onClick={() => setMode("deep")}>
              DEEP
            </button>
          </div>
          <button className="go-btn" onClick={runSearch} disabled={loading}>
            {loading ? "Dhoond rahe hain..." : "Suggestions Nikaalein"}
          </button>
        </div>
      </div>

      <main>
        <div className="status-bar">
          <div className="count">
            {loading && (
              <>
                <span className="blink">▍</span> &quot;{seed}&quot; ke liye suggestions dhoond rahe hain ({mode} mode)...
              </>
            )}
            {!loading && !errored && results.length > 0 && (
              <>
                <b>{results.length}</b> keyword ideas mile &quot;{seed}&quot; ke liye
              </>
            )}
            {!loading && !errored && results.length === 0 && seed === "" && (
              <>Search shuru karne ke liye upar keyword type karein.</>
            )}
            {errored && <>Backend se connect nahi ho paaya.</>}
          </div>
          {!loading && results.length > 0 && (
            <div className="toolbar">
              <button onClick={exportCsv}>↓ CSV Export</button>
            </div>
          )}
        </div>

        {loading && <div className="loading-row">Fetching keyword data...</div>}

        {!loading && errored && (
          <div className="empty-state">
            <div className="glyph">[ ! ]</div>
            <p>API route se response nahi mila. Server dobara try karein ya console check karein.</p>
          </div>
        )}

        {!loading && !errored && results.length === 0 && (
          <div className="empty-state">
            <div className="glyph">[ _ ]</div>
            <p>
              Koi bhi seed keyword daalein — tool automatically questions, prepositions, aur alphabet-based 100+
              related keyword ideas nikaal dega, saath mein estimated volume, difficulty aur CPC.
            </p>
          </div>
        )}

        {!loading && !errored && results.length > 0 && (
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("keyword")}>Keyword</th>
                <th onClick={() => handleSort("volume")}>Est. Volume</th>
                <th onClick={() => handleSort("difficulty")}>Difficulty</th>
                <th onClick={() => handleSort("cpc")}>Est. CPC</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div className="kw-cell">
                      <span className="kw-text">{r.keyword}</span>
                      <span className={`tag ${r.type}`}>{r.type}</span>
                    </div>
                  </td>
                  <td className="vol-cell">{r.volume.toLocaleString("en-IN")}/mo</td>
                  <td>
                    <div className="diff-bar-wrap">
                      <div className="diff-track">
                        <div
                          className="diff-fill"
                          style={{ width: `${r.difficulty}%`, background: diffColor(r.difficulty) }}
                        ></div>
                      </div>
                      <span className="diff-num">{r.difficulty}</span>
                    </div>
                  </td>
                  <td className="vol-cell">${r.cpc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer>Data source: Google Autocomplete · Volume/Difficulty/CPC estimates hain, exact figures nahi</footer>
    </>
  );
}
