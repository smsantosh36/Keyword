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
            <span className="dot"></span><h1 className="brand">KeywordRadar</h1>
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
              placeholder="Seed keyword Search — yoga classes, coffee shop, digital marketing"
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
            {loading ? "Searching..." : "Get Suggestions"}
          </button>
        </div>
      </div>

      <main>
        <div className="status-bar">
          <div className="count">
            {loading && (
              <>
                <span className="blink">▍</span> &quot;{seed}&quot; We are looking for suggestions for this.
 ({mode} mode)...
              </>
            )}
            {!loading && !errored && results.length > 0 && (
              <>
                <b>{results.length}</b> Here are some keyword ideas for &quot;{seed}&quot;
              </>
            )}
            {!loading && !errored && results.length === 0 && seed === "" && (
              <>Enter a keyword above to begin searching.</>
            )}
            {errored && <>Could not connect to the backend.</>}
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
            <p>The API route did not return a response. Retry the server or check the console for errors.
</p>
          </div>
        )}

        {!loading && !errored && results.length === 0 && (
          <div className="empty-state">
            <div className="glyph">[ _ ]</div>
            <div className="contentboxseo">
              <h2 className="brand">Find Profitable Keywords Faster and Grow Your Organic Traffic</h2>
              <p className="count">Turn a single seed keyword into <b>100+ high-value keyword ideas</b> in seconds. Our keyword research tool automatically expands your keyword into <b>questions, prepositions, and A to Z variations</b> so you can uncover exactly what your audience is searching for.</p>
              <p className="count">Get the data you need to make smarter SEO decisions — including <b>estimated search volume, keyword difficulty, and CPC</b> — all in one place. Whether you're planning blog content, building topic clusters, targeting long-tail keywords, or scaling your SEO strategy, this tool helps you discover ranking opportunities faster. </p>
              <h3 className="brand">Why Use This Keyword Research Tool?</h3>
              <p>Stop guessing what to write about. With one seed keyword, you can instantly find keyword opportunities that are easier to target, more relevant to user intent, and better for driving consistent organic traffic.</p>
              <h3 className="brand">What You’ll Get</h3>
             
                  <p className="count"><b>100+ related keyword ideas</b> from a single keyword</p>
                  <p className="count"><b>Question-based keywords</b> to target informational search intent</p>
                  <p className="count"><b>Preposition keywords</b> to uncover comparison and problem-solving searches</p>
                  <p className="count"><b>A–Z keyword variations</b> for long-tail content ideas</p>
                  <p className="count"><b>Search volume estimates</b> to identify traffic potential</p>
                  <p className="count"><b>Keyword difficulty data</b> to find easier ranking opportunities</p>
                  <p className="count"><b>CPC insights</b> to understand commercial value and advertiser demand</p>
             
              <h3 className="brand"> Built for Faster SEO Growth</h3>
              <p className="count"> tool helps you move from keyword research to content creation without wasting hours on manual brainstorming. Use it to:</p>
              
                  <p className="count">Discover <b>low-competition keyword opportunities</b></p>
                  <p className="count">Build <b>SEO-friendly blog topics</b></p>
                  <p className="count">Create <b>long-form content outlines</b></p>
                  <p className="count">Improve <b>content planning and topical authority</b></p>
                  <p className="count">Find <b>buyer-intent and informational keywords</b></p>
                  <p className="count">Grow your <b>organic traffic with data-backed content ideas</b></p>
             
              <h3 className="brand">Turn One Keyword Into Your Next 100 Content Opportunities</h3>
              <p className="count">Whether you're an <b>SEO professional, blogger, content marketer, startup founder, or agency</b>, this tool gives you the keyword ideas and metrics you need to plan content that can rank faster and bring in more traffic.</p>
            </div>
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

      <footer>Source: Google Autocomplete · Volume, keyword difficulty, and CPC are estimated metrics, not exact data.
</footer>
    </>
  );
}
