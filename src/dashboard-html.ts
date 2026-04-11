// ============================================================
// DASHBOARD HTML GENERATOR - Astryxion API Playground
// ============================================================

import type { Redis } from "ioredis";

export function generateDashboardHTML(
  port: number,
  serviceName: string,
  startedAtUtc: string,
  instanceId: string,
  redis: Redis | null
): string {
  /** Never embed real keys in HTML sent to browsers in production. */
  const devPlaygroundDefaultKey = process.env.NODE_ENV === "production" ? "" : "dev_test_key";
  const playgroundKeyHelpText =
    process.env.NODE_ENV === "production"
      ? "Paste an API key from the developer portal. Keys are stored only in this browser."
      : "Optional: paste a portal key. If empty, the playground uses <code>dev_test_key</code> when the server allows it.";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Playground | ASTRYXION API</title>
    <link rel="icon" type="image/png" href="/assets/favicon-astryxion.png">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg: #0a0a0c;
        --card: rgba(20, 20, 25, 0.85);
        --border: rgba(138, 79, 255, 0.2);
        --text: #f0f0f2;
        --text-muted: #a0a0b0;
        --accent: #8a4fff;
        --accent-glow: rgba(138, 79, 255, 0.3);
        --success: #00f2fe;
        --warning: #ffb700;
        --danger: #ef4444;
        --gradient: linear-gradient(135deg, #8a4fff 0%, #4f46e5 50%, #ffb700 100%);
        --sun: #FFD700; --moon: #C0C0C0; --mercury: #B0B0B0; --venus: #FFB6C1;
        --mars: #FF4500; --jupiter: #FFA500; --saturn: #8B4513;
        --uranus: #00CED1; --neptune: #4169E1; --pluto: #8B008B;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', sans-serif;
        background: var(--bg); color: var(--text); min-height: 100vh;
        background-image:
          radial-gradient(800px 400px at 10% 0%, rgba(138, 79, 255, 0.08), transparent 60%),
          radial-gradient(800px 400px at 90% 10%, rgba(255, 183, 0, 0.03), transparent 55%),
          radial-gradient(900px 500px at 50% 100%, rgba(138, 79, 255, 0.05), transparent 50%);
      }
      a { color: var(--accent); text-decoration: none; }
      a:hover { text-decoration: underline; }
      .wrap { max-width: 1400px; margin: 0 auto; padding: 20px; }

      /* Topbar */
      .topbar {
        display: flex; align-items: center; justify-content: space-between; gap: 16px;
        padding: 16px 20px; border: 1px solid var(--border); border-radius: 16px;
        backdrop-filter: blur(12px); background: var(--card);
        position: sticky; top: 0; z-index: 100;
      }
      .topbar-brand { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
      .topbar-logo {
        margin: 0; font-size: 18px; font-family: 'Outfit', sans-serif; font-weight: 700;
        background: linear-gradient(135deg, var(--accent) 0%, #fff 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
        text-decoration: none;
      }
      .topbar-logo:hover { text-decoration: none; }
      .topbar-brand .sub { opacity: 0.7; font-size: 12px; font-weight: 500; color: var(--text-muted); }
      .topbar-nav { display: flex; flex-wrap: wrap; gap: 8px 16px; font-size: 13px; align-items: center; justify-content: flex-end; }
      .topbar-nav a {
        padding: 6px 10px; border-radius: 8px; transition: background 0.2s, color 0.2s;
        color: var(--text-muted); text-decoration: none;
      }
      .topbar-nav a:hover { background: rgba(138, 79, 255, 0.12); color: var(--text); text-decoration: none; }
      .topbar-nav a.topbar-nav-active { color: var(--accent); font-weight: 600; }
      .topbar-nav .topbar-portal {
        border: 1px solid var(--border); background: rgba(20, 20, 25, 0.85); color: var(--text);
      }
      .topbar-nav .topbar-portal:hover { color: var(--text); }

      /* Hero */
      .hero { padding: 32px 0 20px; text-align: center; }
      .hero h2 { font-size: 36px; letter-spacing: -0.02em; margin-bottom: 12px; font-family: 'Outfit', sans-serif; font-weight: 700;
        background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .hero p { max-width: 70ch; opacity: 0.8; line-height: 1.6; margin: 0 auto; }

      /* Pills & Stats */
      .pill { display: inline-flex; align-items: center; gap: 8px;
        border: 1px solid var(--border); border-radius: 999px; padding: 6px 12px;
        font-size: 12px; background: var(--card); }
      .pill .dot { width: 8px; height: 8px; border-radius: 50%; }
      .pill .dot.green { background: var(--success); box-shadow: 0 0 8px var(--success); }
      .metaRow { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 16px; }

      .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 12px; }
      .stat { text-align: center; padding: 12px; background: rgba(10, 10, 15, 0.5); border-radius: 8px; }
      .stat-value { font-size: 24px; font-weight: 700; background: var(--gradient);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .stat-label { font-size: 11px; opacity: 0.7; margin-top: 4px; }

      /* Cards */
      .grid-4col { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px; }
      @media (min-width: 768px) { .grid-4col { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1200px) { .grid-4col { grid-template-columns: repeat(4, 1fr); } }

      /* Main layout: form + results */
      .main-layout { display: flex; flex-direction: column; gap: 20px; }
      @media (min-width: 1024px) { .main-layout { flex-direction: row; align-items: flex-start; } }
      .sidebar { width: 100%; flex-shrink: 0; }
      @media (min-width: 1024px) { .sidebar { width: 320px; position: sticky; top: 90px; } }
      .results-area { flex-grow: 1; min-width: 0; }

      /* Tool cards */
      .tools-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
      @media (min-width: 768px) { .tools-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (min-width: 1200px) { .tools-grid { grid-template-columns: repeat(3, 1fr); } }
      .tool-full { grid-column: 1 / -1; }
      .tool-half { grid-column: span 2; }

      .card {
        border: 1px solid var(--border); border-radius: 16px; padding: 20px;
        background: var(--card); backdrop-filter: blur(10px);
      }
      .card h3 {
        margin: 0 0 16px; font-size: 14px; letter-spacing: 0.3px;
        text-transform: uppercase; display: flex; align-items: center; gap: 8px;
      }
      .card.accent { border-left: 4px solid var(--accent); }

      /* Forms */
      .form-group { margin-bottom: 14px; }
      label { display: block; font-size: 12px; opacity: 0.85; margin-bottom: 6px; }
      input, select, textarea {
        width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 10px;
        background: rgba(10, 10, 15, 0.6); color: var(--text); font-size: 14px;
      }
      input:focus, select:focus { outline: none; border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow); }

      /* Buttons */
      .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px;
        border: none; border-radius: 10px; font-size: 14px; font-weight: 500;
        cursor: pointer; transition: all 0.2s; }
      .btn-primary { background: var(--gradient); color: white; box-shadow: 0 4px 16px var(--accent-glow); }
      .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px var(--accent-glow); }
      .btn-full { width: 100%; justify-content: center; }
      .btn-secondary { background: rgba(0, 210, 255, 0.15); color: var(--accent); border: 1px solid var(--border); }
      .btn-code { background: rgba(0,0,0,0.15); color: var(--text-muted); padding: 6px 10px;
        border-radius: 6px; font-size: 12px; cursor: pointer; border: 1px solid var(--border); }
      .btn-code:hover { background: rgba(0,0,0,0.25); color: var(--text); }

      /* Results */
      .result-box {
        padding: 16px; border-radius: 12px; background: rgba(10, 10, 15, 0.8);
        border: 1px solid var(--border); max-height: 600px; overflow-y: auto;
        font-family: 'Fira Code', 'Consolas', monospace; font-size: 12px;
        line-height: 1.6; white-space: pre-wrap; word-break: break-all;
      }

      /* Tabs */
      .tabs { display: flex; gap: 4px; margin-bottom: 16px; border-bottom: 1px solid var(--border); }
      .tab { padding: 8px 16px; border: none; background: none; color: var(--text-muted);
        cursor: pointer; font-size: 13px; border-bottom: 2px solid transparent; transition: all 0.2s; }
      .tab.active { color: var(--accent); border-bottom-color: var(--accent); }
      .tab:hover { color: var(--text); }
      .tab-content { display: none; }
      .tab-content.active { display: block; }

      /* Chart */
      .chart-container { display: flex; justify-content: center; padding: 20px;
        background: radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%);
        border-radius: 12px; margin: 16px 0; }
      .planet-legend { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px; margin-top: 16px; }
      .planet-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px;
        border-radius: 8px; background: rgba(10, 10, 15, 0.5); font-size: 12px; }
      .planet-dot { width: 10px; height: 10px; border-radius: 50%; }

      /* Loading */
      .loading { display: none; text-align: center; padding: 20px; }
      .loading.active { display: block; }
      .spinner { width: 32px; height: 32px; border: 3px solid var(--border);
        border-top-color: var(--accent); border-radius: 50%;
        animation: spin 0.8s linear infinite; margin: 0 auto 12px; }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* Footer */
      .footer { text-align: center; padding: 32px 0; opacity: 0.6; font-size: 12px; }

      /* Code Modal */
      #code-modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(0,0,0,0.8); z-index:9999; align-items:center; justify-content:center; }
      .modal-content { background:#1a1a1e; color:white; padding:24px; border-radius:12px;
        width:90%; max-width:700px; border:1px solid #333; }
      pre.snippet { background:#0a0a0c; color:#a6accd; padding:20px; border-radius:8px;
        font-size:12px; overflow-x:auto; margin-top:12px; border:1px solid #222; }
      .lang-tabs { display:flex; gap:10px; border-bottom:1px solid #333; padding-bottom:12px; margin-bottom:16px; }
      .lang-tab { cursor:pointer; padding:6px 12px; font-size:13px; border-radius:6px; color:#999; }
      .lang-tab.active { background:var(--accent); color:white; }
      
      /* Numerology Results Styling */
      .num-result-wrap { display: flex; flex-direction: column; gap: 16px; font-family: sans-serif; }
      .num-section { border-bottom: 1px solid var(--border); padding-bottom: 12px; }
      .num-section:last-child { border-bottom: none; }
      .num-title { font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
      .num-item { margin-bottom: 8px; }
      .num-label { font-size: 11px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.5px; }
      .num-val-row { display: flex; align-items: baseline; gap: 10px; }
      .num-val { font-size: 18px; font-weight: bold; color: var(--text); }
      .num-meaning { font-size: 13px; opacity: 0.85; line-height: 1.4; }
      .num-advice { font-size: 12px; font-style: italic; color: var(--accent); opacity: 0.9; margin-top: 2px; }
      .loshu-grid { display: grid; grid-template-columns: repeat(3, 40px); gap: 4px; margin-top: 10px; }
      .loshu-cell { width: 40px; height: 40px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; }
    </style>
    <script>
      (function() {
        var isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        var apiPort = '3000';
        window.API_BASE = isLocalDev ? 'http://' + window.location.hostname + ':' + apiPort : '';
        document.addEventListener('DOMContentLoaded', function() {
          document.querySelectorAll('.api-link').forEach(function(link) {
            var relativePath = link.getAttribute('data-href') || link.getAttribute('href');
            if (isLocalDev && relativePath && relativePath.startsWith('/')) {
              link.href = window.API_BASE + relativePath;
            }
          });
        });
      })();
    </script>
  </head>
  <body>
    <div class="wrap">

      <!-- Top Bar -->
      <div class="topbar">
        <div class="topbar-brand">
          <a href="/" class="topbar-logo">ASTRYXION API</a>
          <span class="sub">Playground</span>
        </div>
        <nav class="topbar-nav" aria-label="Primary">
          <a href="/features" class="api-link">Full Catalog</a>
          <a href="/status" class="api-link">Status</a>
          <a href="/docs" class="api-link" target="_blank" rel="noopener">Docs</a>
          <a href="/dashboard" class="topbar-nav-active api-link">Playground</a>
          <a href="/#pricing" class="api-link">Pricing</a>
          <a href="/portal" class="topbar-portal api-link">Login / Portal 🔑</a>
        </nav>
      </div>

      <div class="card" style="margin-top:14px;padding:14px 18px;border:1px solid var(--border);border-radius:16px;">
        <label for="playground-api-key-input" style="display:block;font-size:12px;opacity:0.88;margin-bottom:8px;">API key (Bearer)</label>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <input type="password" id="playground-api-key-input" placeholder="From /portal — not sent to our servers except as Authorization on API calls" autocomplete="off" style="flex:1;min-width:220px;max-width:520px;" />
          <button type="button" class="btn btn-secondary" onclick="savePlaygroundApiKey()">Save in browser</button>
          <button type="button" class="btn btn-secondary" onclick="clearPlaygroundApiKey()" style="opacity:0.85;">Clear</button>
          <span id="playground-key-status" style="font-size:11px;opacity:0.75;"></span>
        </div>
        <p style="font-size:11px;opacity:0.65;margin-top:10px;line-height:1.45;">${playgroundKeyHelpText}</p>
      </div>

      <!-- Hero -->
      <div class="hero">
        <h2>ASTRYXION API</h2>
        <p>The universal astrological calculation ecosystem. Birth Charts, Vedic Astrology, Synastry, and AI-ready MCP context.</p>
        <div class="metaRow">
          <div class="pill"><span class="dot green"></span> Online</div>
          <div class="pill">🚀 Port: ${port}</div>
          <div class="pill">🕐 ${startedAtUtc}</div>
          <div class="pill">${instanceId}</div>
          ${redis ? '<div class="pill"><span class="dot green"></span> Redis</div>' : '<div class="pill">No Redis</div>'}
        </div>
      </div>

      <!-- Live Panchang Bar -->
      <div id="live-panchang-bar" style="margin-bottom: 20px; display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px;">
        <div class="pill" style="border-color: var(--accent);">🌑 Moon: <span id="hdr-moon-phase">---</span></div>
        <div class="pill">📜 Tithi: <span id="hdr-tithi">---</span></div>
        <div class="pill">🧘 Yoga: <span id="hdr-yoga">---</span></div>
        <div class="pill">🦁 Nakshatra: <span id="hdr-nakshatra">---</span></div>
        <div class="pill" style="border-color: var(--danger); background: rgba(239,68,68,0.05);">🛡️ Rahu Kaal: <span id="hdr-rahu">---</span></div>
      </div>

      <!-- Geo + Stats Row -->
      <div class="grid-4col">
        <div class="card accent">
          <h3 style="color: var(--accent);">📍 Geo-Locator</h3>
          <div class="form-group" style="position: relative; margin-bottom: 0;">
            <input type="text" id="city-query" placeholder="City name..." onkeyup="if(event.key==='Enter') searchCity()" />
            <button class="btn btn-primary" style="position: absolute; right: 4px; top: 4px; padding: 6px 10px; font-size: 11px;" onclick="searchCity()">Search</button>
          </div>
          <div id="city-results-list" style="margin-top: 8px;"></div>
        </div>
        <div class="card" style="grid-column: span 3;">
          <h3>⚡ Engine Capabilities</h3>
          <div class="stats-grid">
            <div class="stat"><div class="stat-value">18</div><div class="stat-label">API Models</div></div>
            <div class="stat"><div class="stat-value">27</div><div class="stat-label">Nakshatras</div></div>
            <div class="stat"><div class="stat-value">12</div><div class="stat-label">Vedic Calcs</div></div>
            <div class="stat"><div class="stat-value">7k+</div><div class="stat-label">Offline Cities</div></div>
            <div class="stat"><div class="stat-value">AI</div><div class="stat-label">MCP Ready</div></div>
          </div>
        </div>
      </div>

      <!-- ===== NATAL CHART: Sidebar + Results ===== -->
      <div class="main-layout">
        <div class="sidebar">
          <div class="card">
            <h3>🌟 Natal Chart</h3>
            <div class="form-group"><label>Birth Date</label><input type="date" id="natal-date" value="1990-05-15" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="natal-time" value="14:30" /></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="form-group"><label>Latitude</label><input type="number" id="natal-lat" value="-23.5505" step="0.0001" /></div>
              <div class="form-group"><label>Longitude</label><input type="number" id="natal-lon" value="-46.6333" step="0.0001" /></div>
            </div>
            <div class="form-group"><label>House System</label>
              <select id="natal-house">
                <option value="placidus">Placidus</option>
                <option value="koch">Koch</option>
                <option value="equal">Equal</option>
                <option value="whole_sign">Whole Sign</option>
                <option value="regiomontanus">Regiomontanus</option>
                <option value="campanus">Campanus</option>
                <option value="porphyry">Porphyry</option>
                <option value="alcabitius">Alcabitius</option>
              </select>
            </div>
            <button class="btn btn-primary btn-full" onclick="calculateNatalChart()">Calculate</button>
            <div id="natal-loading" class="loading"><div class="spinner"></div></div>
          </div>

          <div class="card" style="margin-top: 16px;">
            <h3>♈ Daily Horoscope</h3>
            <div class="form-group">
              <select id="horo-sign">
                <option value="aries">Aries</option><option value="taurus">Taurus</option><option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option><option value="leo">Leo</option><option value="virgo">Virgo</option>
                <option value="libra">Libra</option><option value="scorpio">Scorpio</option><option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option><option value="aquarius">Aquarius</option><option value="pisces">Pisces</option>
              </select>
            </div>
            <button class="btn btn-primary btn-full" onclick="getHoroscope()">Get Insight</button>
          </div>
        </div>

        <!-- Results Area -->
        <div class="results-area">
          <div class="card" style="min-height: 550px;">
            <div class="tabs">
              <button class="tab active" onclick="switchResultTab('visual')">Chart</button>
              <button class="tab" onclick="switchResultTab('json')">JSON</button>
              <button class="tab" onclick="switchResultTab('desc')">Interpret</button>
            </div>
            <div id="res-visual" class="tab-content active">
              <div class="chart-container">
                <svg id="birth-chart-svg" width="500" height="500" viewBox="0 0 500 500"></svg>
              </div>
              <div id="planet-legend" class="planet-legend"></div>
            </div>
            <div id="res-json" class="tab-content">
              <div id="natal-result-content" class="result-box">Results appear here...</div>
            </div>
            <div id="res-desc" class="tab-content">
              <div id="interpretation-content" class="result-box" style="background: rgba(255,255,255,0.02); font-family: sans-serif; font-size: 14px;">
                Interpretations appear here.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== TOOL CARDS GRID ===== -->
      <h2 style="margin: 32px 0 20px; font-size: 22px; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Tools</h2>

      <div class="tools-grid">

        <!-- Synastry -->
        <div class="card tool-half" id="synastry-card">
          <h3>💕 Synastry</h3>
          <h4 style="margin-bottom:10px; opacity:0.8;">Person 1</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;">
            <div class="form-group"><label>Date</label><input type="date" id="syn1-date" value="1990-05-15" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="syn1-time" value="14:30" /></div>
            <div class="form-group"><label>Lat</label><input type="number" id="syn1-lat" value="-23.5505" step="0.0001" /></div>
            <div class="form-group"><label>Lon</label><input type="number" id="syn1-lon" value="-46.6333" step="0.0001" /></div>
          </div>
          <h4 style="margin:10px 0; opacity:0.8;">Person 2</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;">
            <div class="form-group"><label>Date</label><input type="date" id="syn2-date" value="1992-08-20" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="syn2-time" value="10:00" /></div>
            <div class="form-group"><label>Lat</label><input type="number" id="syn2-lat" value="-22.9068" step="0.0001" /></div>
            <div class="form-group"><label>Lon</label><input type="number" id="syn2-lon" value="-43.1729" step="0.0001" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateSynastry()" style="margin-top:10px;">Calculate Synastry</button>
          <div id="synastry-loading" class="loading"><div class="spinner"></div></div>
          <div id="synastry-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Astrocartography -->
        <div class="card" id="astro-card">
          <h3>🌍 Astrocartography</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Date</label><input type="date" id="astro-date" value="1990-05-15" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="astro-time" value="14:30" /></div>
            <div class="form-group"><label>Latitude</label><input type="number" id="astro-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="astro-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateAstrocartography()">Calculate</button>
          <div id="astro-loading" class="loading"><div class="spinner"></div></div>
          <div id="astro-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Annual Predictions -->
        <div class="card" id="annual-card">
          <h3>📅 Annual Predictions</h3>
          <div class="form-group"><label>Date</label><input type="date" id="annual-date" value="1990-05-15" /></div>
          <div class="form-group"><label>UTC Time</label><input type="time" id="annual-time" value="14:30" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Latitude</label><input type="number" id="annual-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="annual-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <div class="form-group"><label>Year</label><input type="number" id="annual-year" value="2026" min="2000" max="2100" /></div>
          <button class="btn btn-primary btn-full" onclick="getAnnualPredictions()">Predict</button>
          <div id="annual-loading" class="loading"><div class="spinner"></div></div>
          <div id="annual-result" class="result-box" style="margin-top:14px;">Click to predict...</div>
        </div>

        <!-- Solar Arc -->
        <div class="card" id="solar-arc-card">
          <h3>📐 Solar Arc (true Sun arc)</h3>
          <p style="opacity:0.75;font-size:13px;margin:0 0 10px;">Directed positions = natal + (Sun<sub>directed</sub> − Sun<sub>birth</sub>). Houses recomputed for the directed instant.</p>
          <div class="form-group"><label>Birth date</label><input type="date" id="sarc-date" value="1990-05-15" /></div>
          <div class="form-group"><label>Birth UTC</label><input type="time" id="sarc-time" value="14:30" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Latitude</label><input type="number" id="sarc-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="sarc-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <div class="form-group"><label>Directed date</label><input type="date" id="sarc-dir-date" value="2026-04-10" /></div>
          <div class="form-group"><label>Directed UTC</label><input type="time" id="sarc-dir-time" value="12:00" /></div>
          <div class="form-group"><label>House system</label>
            <select id="sarc-house">
              <option value="placidus">Placidus</option>
              <option value="whole_sign">Whole Sign</option>
              <option value="koch">Koch</option>
              <option value="equal">Equal</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateSolarArc()">Calculate Solar Arc</button>
          <div id="sarc-loading" class="loading"><div class="spinner"></div></div>
          <div id="sarc-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Solar Return -->
        <div class="card" id="sr-card">
          <h3>☀️ Solar Return</h3>
          <div class="form-group"><label>Date</label><input type="date" id="sr-date" value="1990-05-15" /></div>
          <div class="form-group"><label>UTC Time</label><input type="time" id="sr-time" value="14:30" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Latitude</label><input type="number" id="sr-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="sr-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <div class="form-group"><label>Year</label><input type="number" id="sr-year" value="2026" min="2000" max="2100" /></div>
          <button class="btn btn-primary btn-full" onclick="calculateSolarReturn()">Calculate</button>
          <div id="sr-loading" class="loading"><div class="spinner"></div></div>
          <div id="sr-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Transits -->
        <div class="card tool-half" id="transit-card">
          <h3>🔄 Transits</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;">
            <div class="form-group"><label>Date</label><input type="date" id="transit-date" value="1990-05-15" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="transit-time" value="14:30" /></div>
            <div class="form-group"><label>Latitude</label><input type="number" id="transit-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="transit-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateTransits()">Show Transits</button>
          <div id="transit-loading" class="loading"><div class="spinner"></div></div>
          <div id="transit-result" class="result-box" style="margin-top:14px;">Click to show...</div>
        </div>

        <!-- Eclipses -->
        <div class="card" id="eclipse-card">
          <h3>🌑 Eclipses</h3>
          <div class="form-group"><label>Year</label><input type="number" id="eclipse-year" value="2026" min="2000" max="2100" /></div>
          <button class="btn btn-primary btn-full" onclick="getEclipses()">Find Eclipses</button>
          <div id="eclipse-loading" class="loading"><div class="spinner"></div></div>
          <div id="eclipse-result" class="result-box" style="margin-top:14px;">Click to search...</div>
        </div>

        <!-- Composite Chart -->
        <div class="card" id="comp-card">
          <h3>🔗 Composite Chart</h3>
          <h4 style="margin-bottom:8px; opacity:0.8;">Person 1</h4>
          <div class="form-group"><label>Date</label><input type="date" id="comp1-date" value="1990-05-15" /></div>
          <div class="form-group"><label>UTC Time</label><input type="time" id="comp1-time" value="14:30" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Latitude</label><input type="number" id="comp1-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="comp1-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <h4 style="margin:10px 0 8px; opacity:0.8;">Person 2</h4>
          <div class="form-group"><label>Date</label><input type="date" id="comp2-date" value="1992-08-20" /></div>
          <div class="form-group"><label>UTC Time</label><input type="time" id="comp2-time" value="10:00" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Latitude</label><input type="number" id="comp2-lat" value="-22.91" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="comp2-lon" value="-43.17" step="0.0001" /></div>
          </div>
          <button class="btn btn-primary btn-full" style="margin-top:10px;" onclick="calculateComposite()">Calculate</button>
          <div id="comp-loading" class="loading"><div class="spinner"></div></div>
          <div id="comp-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Vedic Astrology -->
        <div class="card tool-full" id="vedic-card">
          <h3>🕉️ Vedic Astrology</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;">
            <div class="form-group"><label>Date</label><input type="date" id="vedic-date" value="1990-05-15" /></div>
            <div class="form-group"><label>UTC Time</label><input type="time" id="vedic-time" value="14:30" /></div>
            <div class="form-group"><label>Latitude</label><input type="number" id="vedic-lat" value="-23.55" step="0.0001" /></div>
            <div class="form-group"><label>Longitude</label><input type="number" id="vedic-lon" value="-46.63" step="0.0001" /></div>
          </div>
          <div class="form-group"><label>Calculation Type</label>
            <select id="vedic-type">
              <option value="complete">Complete (Map + Nakshatras + Dasha + Yogas + Remedies)</option>
              <option value="chart">Vedic Chart</option>
              <option value="nakshatras">Nakshatras</option>
              <option value="dasha">Vimshottari Dasha</option>
              <option value="yogas">Planetary Yogas</option>
              <option value="remedies">Vedic Remedies</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateVedic()">Calculate</button>
          <div id="vedic-loading" class="loading"><div class="spinner"></div></div>
          <div id="vedic-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Universal Numerology -->
        <div class="card tool-half" id="num-card">
          <h3>🔢 Universal Numerology Engine</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Full Name</label><input type="text" id="numerology-name" value="Maria Silva" /></div>
            <div class="form-group"><label>Birth Date</label><input type="date" id="numerology-date" value="1990-05-14" /></div>
            <div class="form-group"><label>Comparison Name (Optional)</label><input type="text" id="numerology-comp" placeholder="Partner's name..." /></div>
            <div class="form-group"><label>Target Year (Optional)</label><input type="number" id="numerology-year" value="2026" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateUniversalNumerology()">Calculate All Systems</button>
          <div id="numerology-loading" class="loading"><div class="spinner"></div></div>
          <div id="numerology-result" class="result-box" style="margin-top:14px; height: 400px;">Click to calculate...</div>
        </div>

        <!-- Vedic Matching -->
        <div class="card" id="match-card">
          <h3>💍 Vedic Matching</h3>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div class="form-group"><label>Boy Moon Lon</label><input type="number" id="match-boy-lon" value="25.5" step="0.01" /></div>
            <div class="form-group"><label>Girl Moon Lon</label><input type="number" id="match-girl-lon" value="145.2" step="0.01" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="calculateMatching()">Compatibility</button>
          <div id="match-loading" class="loading"><div class="spinner"></div></div>
          <div id="match-result" class="result-box" style="margin-top:14px;">Click to check...</div>
        </div>

        <!-- Tarot -->
        <div class="card" id="tarot-card">
          <h3>🃏 Tarot</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group"><label>Spread</label>
              <select id="tarot-spread">
                <option value="single">Daily Card (1)</option>
                <option value="3_card">Past/Present/Future (3)</option>
                <option value="9_card">9-Card Matrix</option>
                <option value="celtic_cross">Celtic Cross (10)</option>
              </select>
            </div>
            <div class="form-group"><label>Context</label>
              <select id="tarot-context">
                <option value="general">General Advice</option>
                <option value="love">Relationships / Love</option>
                <option value="career">Career / Finance</option>
                <option value="spiritual">Spiritual Path</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary btn-full" onclick="drawTarot()">Draw Cards</button>
          <div id="tarot-loading" class="loading"><div class="spinner"></div></div>
          <div id="tarot-result" class="result-box" style="margin-top:14px;">Click to draw...</div>
        </div>

        <!-- Runes -->
        <div class="card" id="runes-card">
          <h3>ᚠ Runes</h3>
          <div class="form-group"><label>Spread</label>
            <select id="runes-spread">
              <option value="single">Single Advice</option>
              <option value="three_norns">3 Norns (Past/Pres/Fut)</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" onclick="drawRunes()">Draw Runes</button>
          <div id="runes-loading" class="loading"><div class="spinner"></div></div>
          <div id="runes-result" class="result-box" style="margin-top:14px;">Click to draw...</div>
        </div>

        <!-- I Ching -->
        <div class="card" id="iching-card">
          <h3>☯️ I Ching</h3>
          <div class="form-group"><label>Question</label><input type="text" id="iching-question" placeholder="What path should I take?" /></div>
          <button class="btn btn-primary btn-full" onclick="consultIChing()">Cast Coins</button>
          <div id="iching-loading" class="loading"><div class="spinner"></div></div>
          <div id="iching-result" class="result-box" style="margin-top:14px;">Ask your question...</div>
        </div>

        <!-- Palmistry -->
        <div class="card" id="palm-card">
          <h3>✋ Palmistry</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="form-group"><label>Life Line</label>
              <select id="palm-life"><option value="long_deep">Deep/Long</option><option value="short_faint">Short</option><option value="chained">Chained</option><option value="broken">Broken</option></select></div>
            <div class="form-group"><label>Heart Line</label>
              <select id="palm-heart"><option value="curved">Curved</option><option value="straight">Straight</option><option value="chained">Chained</option><option value="forked_end">Forked</option></select></div>
            <div class="form-group"><label>Head Line</label>
              <select id="palm-head"><option value="long_straight">Long/Straight</option><option value="short">Short</option><option value="curved_down">Curved</option><option value="forked">Forked</option></select></div>
            <div class="form-group"><label>Fate Line</label>
              <select id="palm-fate"><option value="strong">Strong</option><option value="weak_broken">Weak</option><option value="absent">Absent</option></select></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="interpretPalmistry()">Interpret</button>
          <div id="palm-loading" class="loading"><div class="spinner"></div></div>
          <div id="palm-result" class="result-box" style="margin-top:14px;">Select lines...</div>
        </div>

        <!-- Panchang -->
        <div class="card" id="panchang-card">
          <h3>📅 Panchang</h3>
          <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:8px;">
            <div class="form-group"><label>Date</label><input type="date" id="pnc-date" value="2026-04-02" /></div>
            <div class="form-group"><label>Lat</label><input type="number" id="pnc-lat" value="-23.55" step="0.01" /></div>
            <div class="form-group"><label>Lon</label><input type="number" id="pnc-lon" value="-46.63" step="0.01" /></div>
          </div>
          <button class="btn btn-primary btn-full" onclick="getDetailedPanchang()">Calculate</button>
          <div id="pnc-loading" class="loading"><div class="spinner"></div></div>
          <div id="pnc-result" class="result-box" style="margin-top:14px;">Click to calculate...</div>
        </div>

        <!-- Doshas -->
        <div class="card" id="dosha-card">
          <h3>🦂 Dosha Check</h3>
          <p style="font-size:12px; opacity:0.7; margin-bottom:12px;">Mangal Dosha & Sade-Sati (uses your natal chart data)</p>
          <button class="btn btn-secondary btn-full" onclick="checkDoshas()">Check Doshas</button>
          <div id="dosha-result" class="result-box" style="margin-top:14px;">Click to check...</div>
        </div>

      </div><!-- /tools-grid -->

      <div class="footer">
        <p>${serviceName} · Built with Fastify + Swiss Ephemeris · ${new Date().getFullYear()}</p>
      </div>
    </div>

    <!-- Code Modal -->
    <div id="code-modal">
      <div class="modal-content">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="margin:0">Code Snippet</h3>
          <button onclick="closeModal()" style="border:none;background:none;cursor:pointer;font-size:20px;">&times;</button>
        </div>
        <div class="lang-tabs">
          <div class="lang-tab active" onclick="updateSnippet('js')">JavaScript</div>
          <div class="lang-tab" onclick="updateSnippet('python')">Python</div>
          <div class="lang-tab" onclick="updateSnippet('php')">PHP</div>
          <div class="lang-tab" onclick="updateSnippet('curl')">cURL</div>
        </div>
        <pre id="snippet-box" class="snippet"></pre>
        <button class="btn btn-primary" onclick="copySnippet()">Copy Code</button>
      </div>
    </div>

    <script>
      const API_BASE = '/api/v1';
      const __PLAYGROUND_DEV_DEFAULT__ = ${JSON.stringify(devPlaygroundDefaultKey)};
      const SNIPPET_KEY_PLACEHOLDER = 'YOUR_API_KEY';
      function getPlaygroundApiKey() {
        try {
          var k = localStorage.getItem('astryxion_playground_key');
          if (k && String(k).trim()) return String(k).trim();
        } catch (e) {}
        return __PLAYGROUND_DEV_DEFAULT__ || '';
      }
      function playgroundAuthHeaders() {
        var k = getPlaygroundApiKey();
        var h = { 'Content-Type': 'application/json' };
        if (k) h['Authorization'] = 'Bearer ' + k;
        return h;
      }
      function savePlaygroundApiKey() {
        var el = document.getElementById('playground-api-key-input');
        var v = el && el.value ? String(el.value).trim() : '';
        try {
          if (v) localStorage.setItem('astryxion_playground_key', v);
          else localStorage.removeItem('astryxion_playground_key');
        } catch (e) {}
        var st = document.getElementById('playground-key-status');
        if (st) { st.textContent = v ? 'Saved locally.' : 'Cleared.'; setTimeout(function() { st.textContent = ''; }, 2500); }
      }
      function clearPlaygroundApiKey() {
        var el = document.getElementById('playground-api-key-input');
        if (el) el.value = '';
        try { localStorage.removeItem('astryxion_playground_key'); } catch (e) {}
        var st = document.getElementById('playground-key-status');
        if (st) { st.textContent = 'Cleared.'; setTimeout(function() { st.textContent = ''; }, 2500); }
      }
      document.addEventListener('DOMContentLoaded', function() {
        var inp = document.getElementById('playground-api-key-input');
        if (inp) {
          try {
            var s = localStorage.getItem('astryxion_playground_key');
            if (s) inp.value = s;
          } catch (e) {}
        }
      });

      /* ===== Helpers ===== */
      function showLoading(id) { const el = document.getElementById(id); if (el) el.classList.add('active'); }
      function hideLoading(id) { const el = document.getElementById(id); if (el) el.classList.remove('active'); }
      function showResult(id, data) { const el = document.getElementById(id); if (el) el.textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2); }

      function switchResultTab(tabId) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        const btn = document.getElementById('tab-btn-' + tabId);
        if (btn) btn.classList.add('active');
        const content = document.getElementById('res-' + tabId);
        if (content) content.classList.add('active');
      }

      /* ===== Natal Chart ===== */
      const PLANET_COLORS = {
        Sun:'#FFD700', Moon:'#C0C0C0', Mercury:'#B0B0B0', Venus:'#FFB6C1',
        Mars:'#FF4500', Jupiter:'#FFA500', Saturn:'#8B4513', Uranus:'#00CED1',
        Neptune:'#4169E1', Pluto:'#8B008B', Lilith:'#696969'
      };
      const ASPECT_COLORS = {
        conjunction:'#FFD700', sextile:'#22c55e', square:'#ef4444',
        trine:'#6366f1', opposition:'#f59e0b', quincunx:'#ec4899'
      };
      const ZODIAC_SYMBOLS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];

      function drawBirthChart(data) {
        const svg = document.getElementById('birth-chart-svg');
        const cx = 250, cy = 250, outerR = 220, innerR = 180, planetR = 150, centerR = 100;
        let s = '';
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+(outerR+10)+'" fill="rgba(10,10,15,0.8)" stroke="rgba(100,100,140,0.3)" stroke-width="1"/>';
        for (let i = 0; i < 12; i++) {
          const sa = (i*30-90)*Math.PI/180, ea = ((i+1)*30-90)*Math.PI/180;
          const x1o=cx+outerR*Math.cos(sa), y1o=cy+outerR*Math.sin(sa), x2o=cx+outerR*Math.cos(ea), y2o=cy+outerR*Math.sin(ea);
          const x1i=cx+innerR*Math.cos(sa), y1i=cy+innerR*Math.sin(sa), x2i=cx+innerR*Math.cos(ea), y2i=cy+innerR*Math.sin(ea);
          s += '<path d="M '+x1i+' '+y1i+' L '+x1o+' '+y1o+' A '+outerR+' '+outerR+' 0 0 1 '+x2o+' '+y2o+' L '+x2i+' '+y2i+' A '+innerR+' '+innerR+' 0 0 0 '+x1i+' '+y1i+'" fill="rgba(0,210,255,0.03)" stroke="rgba(100,100,140,0.4)" stroke-width="0.5"/>';
          const ma = ((i+0.5)*30-90)*Math.PI/180;
          s += '<text x="'+(cx+(outerR+innerR)/2*Math.cos(ma))+'" y="'+(cy+(outerR+innerR)/2*Math.sin(ma))+'" text-anchor="middle" dominant-baseline="central" fill="rgba(224,224,240,0.7)" font-size="16">'+ZODIAC_SYMBOLS[i]+'</text>';
        }
        if (data.houses && data.houses.cusps) {
          data.houses.cusps.forEach((house, i) => {
            const a = (house-90)*Math.PI/180;
            s += '<line x1="'+(cx+innerR*Math.cos(a))+'" y1="'+(cy+innerR*Math.sin(a))+'" x2="'+(cx+centerR*Math.cos(a))+'" y2="'+(cy+centerR*Math.sin(a))+'" stroke="rgba(100,100,140,0.3)" stroke-width="0.5"/>';
            s += '<text x="'+(cx+(innerR-15)*Math.cos(a))+'" y="'+(cy+(innerR-15)*Math.sin(a))+'" text-anchor="middle" dominant-baseline="central" fill="rgba(224,224,240,0.5)" font-size="10">'+(i+1)+'</text>';
          });
        }
        const pp = {};
        if (data.planets) {
          data.planets.forEach((p, i) => {
            const a = (p.longitude-90)*Math.PI/180, r = planetR-(i%3)*15;
            const px = cx+r*Math.cos(a), py = cy+r*Math.sin(a);
            pp[p.name] = { x:px, y:py };
            const col = PLANET_COLORS[p.name] || '#e0e0f0';
            s += '<circle cx="'+px+'" cy="'+py+'" r="8" fill="'+col+'" opacity="0.9"/>';
            s += '<text x="'+px+'" y="'+py+'" text-anchor="middle" dominant-baseline="central" fill="#0a0a0f" font-size="8" font-weight="bold">'+(p.name||'?')[0]+'</text>';
          });
        }
        if (data.aspects) {
          data.aspects.forEach(a => {
            const p1 = pp[a.a], p2 = pp[a.b];
            if (p1 && p2) {
              const col = ASPECT_COLORS[a.type] || 'rgba(224,224,240,0.3)';
              s += '<line x1="'+p1.x+'" y1="'+p1.y+'" x2="'+p2.x+'" y2="'+p2.y+'" stroke="'+col+'" stroke-width="1" opacity="0.4"/>';
            }
          });
        }
        s += '<circle cx="'+cx+'" cy="'+cy+'" r="'+centerR+'" fill="rgba(10,10,15,0.9)" stroke="rgba(100,100,140,0.3)" stroke-width="1"/>';
        s += '<text x="'+cx+'" y="'+(cy-8)+'" text-anchor="middle" fill="rgba(224,224,240,0.8)" font-size="14" font-weight="bold">Birth Chart</text>';
        if (data.angles) {
          s += '<text x="'+cx+'" y="'+(cy+10)+'" text-anchor="middle" fill="rgba(224,224,240,0.6)" font-size="10">ASC: '+Math.floor((data.angles.ascendant%30))+'° MC: '+Math.floor((data.angles.midheaven%30))+'°</text>';
        }
        svg.innerHTML = s;
        const leg = document.getElementById('planet-legend');
        if (data.planets) {
          leg.innerHTML = data.planets.map(p => {
            const col = PLANET_COLORS[p.name] || '#e0e0f0';
            return '<div class="planet-item"><span class="planet-dot" style="background:'+col+'"></span>'+p.name+': '+(p.sign||'?')+' '+Math.floor(p.degree||0)+'°</div>';
          }).join('');
        }
      }

      async function calculateNatalChart() {
        showLoading('natal-loading');
        try {
          const body = {
            date: document.getElementById('natal-date').value,
            timeUtc: document.getElementById('natal-time').value + ':00',
            latitude: parseFloat(document.getElementById('natal-lat').value),
            longitude: parseFloat(document.getElementById('natal-lon').value),
            houseSystem: document.getElementById('natal-house').value,
          };
          const resp = await fetch(API_BASE + '/natal-chart', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('natal-result-content', data);
          drawBirthChart(data);
          // Interpretation
          const sunP = data.planets?.find(p => p.name === 'Sun');
          const moonP = data.planets?.find(p => p.name === 'Moon');
          document.getElementById('interpretation-content').innerHTML =
            '<h4 style="color:var(--accent);margin-bottom:10px;">Sun in '+(sunP?.sign||'—')+'</h4>'+
            '<p style="opacity:0.8;line-height:1.5;margin-bottom:16px;">Core identity illuminated by '+(sunP?.sign||'').toLowerCase()+' energy.</p>'+
            '<h4 style="color:var(--accent);margin-bottom:10px;">Moon in '+(moonP?.sign||'—')+'</h4>'+
            '<p style="opacity:0.8;line-height:1.5;margin-bottom:16px;">Emotional landscape governed by '+(moonP?.sign||'').toLowerCase()+' rhythms.</p>'+
            '<h4 style="color:var(--accent);margin-bottom:10px;">Ascendant</h4>'+
            '<p style="opacity:0.8;line-height:1.5;">Ascendant at '+(sunP?.sign||'?')+', House System: '+(body.houseSystem||'placidus')+'</p>';
          switchResultTab('visual');
        } catch (e) { alert('Error: ' + e.message); }
        hideLoading('natal-loading');
      }

      async function getHoroscope() {
        const sign = document.getElementById('horo-sign').value;
        try {
          const resp = await fetch(API_BASE + '/horoscope/' + sign, { headers: playgroundAuthHeaders() });
          const data = await resp.json();
          showResult('natal-result-content', data);
          switchResultTab('json');
        } catch (e) { alert(e.message); }
      }

      /* ===== Synastry ===== */
      async function calculateSynastry() {
        showLoading('synastry-loading');
        try {
          const body = {
            person1: {
              date: document.getElementById('syn1-date').value,
              timeUtc: document.getElementById('syn1-time').value + ':00',
              latitude: parseFloat(document.getElementById('syn1-lat').value),
              longitude: parseFloat(document.getElementById('syn1-lon').value),
            },
            person2: {
              date: document.getElementById('syn2-date').value,
              timeUtc: document.getElementById('syn2-time').value + ':00',
              latitude: parseFloat(document.getElementById('syn2-lat').value),
              longitude: parseFloat(document.getElementById('syn2-lon').value),
            },
          };
          const resp = await fetch(API_BASE + '/synastry', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('synastry-result', data);
        } catch (e) { showResult('synastry-result', { error: e.message }); }
        hideLoading('synastry-loading');
      }

      /* ===== Astrocartography ===== */
      async function calculateAstrocartography() {
        showLoading('astro-loading');
        try {
          const body = {
            date: document.getElementById('astro-date').value,
            timeUtc: document.getElementById('astro-time').value + ':00',
            latitude: parseFloat(document.getElementById('astro-lat').value),
            longitude: parseFloat(document.getElementById('astro-lon').value),
          };
          const resp = await fetch(API_BASE + '/astrocartography', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('astro-result', data);
        } catch (e) { showResult('astro-result', { error: e.message }); }
        hideLoading('astro-loading');
      }

      /* ===== Annual Predictions ===== */
      async function getAnnualPredictions() {
        showLoading('annual-loading');
        try {
          const body = {
            date: document.getElementById('annual-date').value,
            timeUtc: document.getElementById('annual-time').value + ':00',
            latitude: parseFloat(document.getElementById('annual-lat').value),
            longitude: parseFloat(document.getElementById('annual-lon').value),
            year: parseInt(document.getElementById('annual-year').value),
          };
          const resp = await fetch(API_BASE + '/annual-predictions', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('annual-result', data);
        } catch (e) { showResult('annual-result', { error: e.message }); }
        hideLoading('annual-loading');
      }

      /* ===== Solar Arc ===== */
      async function calculateSolarArc() {
        showLoading('sarc-loading');
        try {
          const t = document.getElementById('sarc-time').value;
          const dt = document.getElementById('sarc-dir-time').value;
          const body = {
            date: document.getElementById('sarc-date').value,
            timeUtc: t.length === 5 ? t + ':00' : t,
            latitude: parseFloat(document.getElementById('sarc-lat').value),
            longitude: parseFloat(document.getElementById('sarc-lon').value),
            directedDate: document.getElementById('sarc-dir-date').value,
            directedTimeUtc: dt.length === 5 ? dt + ':00' : dt,
            houseSystem: document.getElementById('sarc-house').value,
          };
          const resp = await fetch(API_BASE + '/solar-arc', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('sarc-result', data);
        } catch (e) { showResult('sarc-result', { error: e.message }); }
        hideLoading('sarc-loading');
      }

      /* ===== Solar Return ===== */
      async function calculateSolarReturn() {
        showLoading('sr-loading');
        try {
          const body = {
            date: document.getElementById('sr-date').value,
            timeUtc: document.getElementById('sr-time').value + ':00',
            latitude: parseFloat(document.getElementById('sr-lat').value),
            longitude: parseFloat(document.getElementById('sr-lon').value),
            year: parseInt(document.getElementById('sr-year').value),
          };
          const resp = await fetch(API_BASE + '/solar-return', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('sr-result', data);
        } catch (e) { showResult('sr-result', { error: e.message }); }
        hideLoading('sr-loading');
      }

      /* ===== Transits ===== */
      async function calculateTransits() {
        showLoading('transit-loading');
        try {
          const body = {
            natalDate: document.getElementById('transit-date').value,
            natalTimeUtc: document.getElementById('transit-time').value + ':00',
            natalLatitude: parseFloat(document.getElementById('transit-lat').value),
            natalLongitude: parseFloat(document.getElementById('transit-lon').value),
          };
          const resp = await fetch(API_BASE + '/transits', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('transit-result', data);
        } catch (e) { showResult('transit-result', { error: e.message }); }
        hideLoading('transit-loading');
      }

      /* ===== Eclipses ===== */
      async function getEclipses() {
        showLoading('eclipse-loading');
        try {
          const body = { year: parseInt(document.getElementById('eclipse-year').value) };
          const resp = await fetch(API_BASE + '/eclipses', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('eclipse-result', data);
        } catch (e) { showResult('eclipse-result', { error: e.message }); }
        hideLoading('eclipse-loading');
      }

      /* ===== Composite ===== */
      async function calculateComposite() {
        showLoading('comp-loading');
        try {
          const body = {
            person1: {
              date: document.getElementById('comp1-date').value,
              timeUtc: document.getElementById('comp1-time').value + ':00',
              latitude: parseFloat(document.getElementById('comp1-lat').value),
              longitude: parseFloat(document.getElementById('comp1-lon').value),
            },
            person2: {
              date: document.getElementById('comp2-date').value,
              timeUtc: document.getElementById('comp2-time').value + ':00',
              latitude: parseFloat(document.getElementById('comp2-lat').value),
              longitude: parseFloat(document.getElementById('comp2-lon').value),
            },
          };
          const resp = await fetch(API_BASE + '/composite', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('comp-result', data);
        } catch (e) { showResult('comp-result', { error: e.message }); }
        hideLoading('comp-loading');
      }

      /* ===== Vedic ===== */
      async function calculateVedic() {
        showLoading('vedic-loading');
        try {
          const vedicType = document.getElementById('vedic-type').value;
          const body = {
            date: document.getElementById('vedic-date').value,
            timeUtc: document.getElementById('vedic-time').value + ':00',
            latitude: parseFloat(document.getElementById('vedic-lat').value),
            longitude: parseFloat(document.getElementById('vedic-lon').value),
          };
          const endpoint = '/vedic-complete';
          const resp = await fetch(API_BASE + endpoint, { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const rawData = await resp.json();
          
          if (rawData.error) {
            throw new Error(rawData.error.message || JSON.stringify(rawData.error));
          }

          const data = rawData.vedicChart || rawData;
          let formatted = '';

          if (vedicType === 'chart') {
            formatted = 'VEDIC MAP RESULTS\\n';
            formatted += '--------------------------------------------------\\n\\n';
            if (data.planets) {
              formatted += 'PLANETS (Sidereal)\\n';
              formatted += '----------------------------------------\\n';
              data.planets.forEach(p => {
                const deg = Math.floor(p.degree || 0);
                const min = Math.floor(((p.degree || 0) % 1) * 60);
                formatted += p.name + ': ' + (p.sign || 'N/A') + ' ' + deg + '°' + min + "'";
                if (p.retrograde) formatted += ' [R]';
                formatted += '\\n';
              });
              formatted += '\\n';
            }
            if (data.nakshatra) {
              formatted += 'MOON NAKSHATRA\\n';
              formatted += '----------------------------------------\\n';
              formatted += data.nakshatra.name + ': ' + (data.nakshatra.lord || '') + ' | ' + (data.nakshatra.deity || '') + '\\n';
              formatted += '\\n';
            }
            if (data.dasha) {
              formatted += 'DASHA\\n';
              formatted += '----------------------------------------\\n';
              formatted += 'Mahadasha: ' + (data.dasha.currentMahadasha?.planet || data.dasha.currentMahadasha || 'N/A') + '\\n';
              formatted += 'Antardasha: ' + (data.dasha.currentAntardasha?.planet || data.dasha.antardasha || 'N/A') + '\\n\\n';
            }
          } else if (vedicType === 'nakshatras') {
            formatted = JSON.stringify({ nakshatra: data.nakshatra }, null, 2);
          } else if (vedicType === 'dasha') {
            formatted = JSON.stringify({ dasha: data.dasha }, null, 2);
          } else if (vedicType === 'yogas') {
            formatted = JSON.stringify({ yogas: data.yogas }, null, 2);
          } else if (vedicType === 'remedies') {
            formatted = JSON.stringify({ remedies: data.remedies || data.vedicRemedies }, null, 2);
          } else {
            formatted = JSON.stringify(data, null, 2);
          }
          showResult('vedic-result', formatted);
        } catch (e) { showResult('vedic-result', 'ERROR: ' + e.message); }
        hideLoading('vedic-loading');
      }

      async function calculateUniversalNumerology() {
        showLoading('numerology-loading');
        try {
          const body = { 
            fullName: document.getElementById('numerology-name').value, 
            dateOfBirth: document.getElementById('numerology-date').value,
            comparisonName: document.getElementById('numerology-comp').value || undefined,
            targetYear: parseInt(document.getElementById('numerology-year').value) || undefined
          };
          const resp = await fetch(API_BASE + '/numerology/complete', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          
          // Render HTML
          let html = '<div class="num-result-wrap">';
          
          // 1. Pythagorean
          html += '<div class="num-section"><div class="num-title">📐 Pythagorean System</div>';
          const p = data.pythagorean;
          const pItems = [
            { label: 'Life Path', d: p.lifePath }, { label: 'Expression', d: p.expression },
            { label: 'Soul Urge', d: p.soulUrge }, { label: 'Personality', d: p.personality },
            { label: 'Destiny', d: p.destiny }, { label: 'Personal Year', d: p.personalYear }
          ];
          pItems.forEach(i => {
            html += '<div class="num-item"><div class="num-label">' + i.label + '</div><div class="num-val-row"><span class="num-val">' + i.d.value + '</span><span class="num-meaning">' + i.d.meaning + '</span></div></div>';
          });
          html += '</div>';

          // 2. Chaldean
          html += '<div class="num-section"><div class="num-title">🏺 Chaldean Tradition</div>';
          const c = data.chaldean;
          const cItems = [
            { label: 'Psychic Number', d: c.psychicNumber },
            { label: 'Destiny Number', d: c.destinyNumber },
            { label: 'Name Vibration', d: c.nameNumber }
          ];
          cItems.forEach(i => {
            html += '<div class="num-item"><div class="num-label">' + i.label + '</div><div class="num-val-row"><span class="num-val">' + i.d.value + '</span><span class="num-meaning">Compound ' + i.d.compound + ': ' + i.d.compoundMeaning + '</span></div><div class="num-advice">' + i.d.finalMeaning + '</div></div>';
          });
          html += '<div class="num-item"><div class="num-label">Correction Hint</div><div class="num-advice">' + c.correctionHint + '</div></div>';
          html += '</div>';

          // 3. Vedic
          html += '<div class="num-section"><div class="num-title">🕉️ Vedic (Sankhya Shastra)</div>';
          const v = data.vedic;
          const vItems = [
            { label: 'Psychic Number', d: v.psychicNumber },
            { label: 'Destiny Number', d: v.destinyNumber },
            { label: 'Name Number', d: v.nameNumber }
          ];
          vItems.forEach(i => {
            html += '<div class="num-item"><div class="num-label">' + i.label + '</div><div class="num-val-row"><span class="num-val">' + i.d.value + '</span><span class="num-meaning">Planet: ' + i.d.planet + '</span></div><div class="num-advice">' + i.d.advice + '</div></div>';
          });
          html += '<div class="num-item"><div class="num-label">Compatibility Harmony</div><div class="num-advice">' + v.harmonyScore + '</div></div>';
          html += '</div>';

          // 4. Kabbalah
          html += '<div class="num-section"><div class="num-title">✡️ Kabbalah System</div>';
          const k = data.kabbalah;
          html += '<div class="num-item"><div class="num-label">Soul Motivation</div><div class="num-val-row"><span class="num-val">' + k.motivation.value + '</span><span class="num-meaning">' + k.motivation.label + '</span></div></div>';
          html += '<div class="num-item"><div class="num-label">Inverted Triangle (First 5 Rows)</div><div style="font-family: monospace; font-size: 10px; opacity:0.7; margin-top:4px;">' + k.invertedTriangle.slice(0,5).map(r => r.join(' ')).join('<br>') + '</div></div>';
          html += '</div>';

          // 5. Lo Shu Grid
          const ls = data.loShuGrid;
          html += '<div class="num-section"><div class="num-title">🏁 Lo Shu Grid (Birth Square)</div>';
          html += '<div style="display:flex; gap:30px; align-items:center;">';
          html += '<div class="loshu-grid">';
          ls.grid.forEach(row => row.forEach(val => { 
            const style = val > 0 ? "background:rgba(0,210,255,0.1); border-color:var(--accent);" : "";
            html += '<div class="loshu-cell" style="' + style + '">' + (val > 0 ? val : "") + '</div>'; 
          }));
          html += '</div>';
          html += '<div style="font-size:12px; opacity:0.8;">Missing Elements: ' + (ls.missing.join(', ') || 'None') + '<br>Planes: M:' + ls.planes.mental + ' / P:' + ls.planes.physical + ' / E:' + ls.planes.emotional + '</div>';
          html += '</div></div>';

          if (data.compatibility) {
            html += '<div class="num-section"><div class="num-title">👫 Compatibility</div><div class="num-val-row"><span class="num-val">' + data.compatibility.score + '%</span><span class="num-meaning">' + data.compatibility.rating + '</span></div></div>';
          }

          html += '</div>';
          
          const resBox = document.getElementById('numerology-result');
          resBox.innerHTML = html;
          resBox.style.whiteSpace = 'normal'; 
        } catch (e) { showResult('numerology-result', 'ERROR: ' + e.message); }
        hideLoading('numerology-loading');
      }

      /* ===== Tarot ===== */
      async function drawTarot() {
        showLoading('tarot-loading');
        try {
          const body = { 
            spread: document.getElementById('tarot-spread').value,
            context: document.getElementById('tarot-context').value
          };
          const resp = await fetch(API_BASE + '/tarot/draw', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          let formatted = 'TAROT READING (' + data.spread + ')\\n========================\\n\\n';
          if (data.cards) {
            data.cards.forEach(c => {
              const m = c.meaning?.en || c.meaning || "N/A";
              formatted += '[' + c.positionName + ']\\nCard: ' + c.card.name + (c.isReversed ? ' (Reversed)' : ' (Upright)') + '\\n\\nMeaning: ' + m + '\\n\\n';
            });
            if (data.synthesis) {
              formatted += 'SYNTHESIS\\n------------------------\\n';
              formatted += 'Dominant Energy: ' + data.synthesis.dominantEnergy + '\\n';
              formatted += 'Overview: ' + data.synthesis.overview + '\\n';
            }
          } else { formatted += JSON.stringify(data, null, 2); }
          showResult('tarot-result', formatted);
        } catch (e) { showResult('tarot-result', 'ERROR: ' + e.message); }
        hideLoading('tarot-loading');
      }

      /* ===== Runes ===== */
      async function drawRunes() {
        showLoading('runes-loading');
        try {
          const body = { spread: document.getElementById('runes-spread').value };
          const resp = await fetch(API_BASE + '/runes/draw', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          let formatted = 'RUNES CAST\\n========================\\n\\n';
          if (data.runes) {
            data.runes.forEach(r => {
              formatted += '[' + r.position + ']\\nRune: ' + r.rune.symbol + ' (' + r.rune.name + ')' + (r.isMerkstave ? ' (Reversed)' : '') + '\\nMeaning: ' + r.meaning + '\\n\\n';
            });
          }
          showResult('runes-result', formatted);
        } catch (e) { showResult('runes-result', 'ERROR: ' + e.message); }
        hideLoading('runes-loading');
      }

      /* ===== I Ching ===== */
      async function consultIChing() {
        showLoading('iching-loading');
        try {
          const body = { question: document.getElementById('iching-question').value };
          const resp = await fetch(API_BASE + '/iching/consult', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          let formatted = 'I CHING READING\\n========================\\n\\n';
          const p = data.results?.primary;
          if (p) {
            formatted += 'Primary: ' + p.number + '. ' + p.name + ' (' + p.pinyin + ')\\n';
            formatted += 'Judgment: ' + p.judgment + '\\n';
            formatted += 'Image: ' + p.image + '\\n\\n';
          }
          if (data.results?.future) {
            const f = data.results.future;
            formatted += 'Future Hex: ' + f.number + '. ' + f.name + '\\n';
          } else { formatted += 'No changing lines.\\n'; }
          showResult('iching-result', formatted);
        } catch (e) { showResult('iching-result', 'ERROR: ' + e.message); }
        hideLoading('iching-loading');
      }

      /* ===== Palmistry ===== */
      async function interpretPalmistry() {
        showLoading('palm-loading');
        try {
          const body = {
            lifeLine: document.getElementById('palm-life').value,
            heartLine: document.getElementById('palm-heart').value,
            headLine: document.getElementById('palm-head').value,
            fateLine: document.getElementById('palm-fate').value,
          };
          const resp = await fetch(API_BASE + '/palmistry/interpret', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          let formatted = 'PALMISTRY READING\\n========================\\n\\n';
          if (data.interpretation) {
            for (const [k, v] of Object.entries(data.interpretation)) formatted += '• ' + k.toUpperCase() + ': ' + v + '\\n\\n';
          } else { formatted += JSON.stringify(data, null, 2); }
          showResult('palm-result', formatted);
        } catch (e) { showResult('palm-result', 'ERROR: ' + e.message); }
        hideLoading('palm-loading');
      }

      /* ===== Vedic Matching ===== */
      async function calculateMatching() {
        showLoading('match-loading');
        try {
          const body = {
            boyMoonLon: parseFloat(document.getElementById('match-boy-lon').value),
            girlMoonLon: parseFloat(document.getElementById('match-girl-lon').value),
          };
          const resp = await fetch(API_BASE + '/vedic/matching', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('match-result', data);
        } catch (e) { showResult('match-result', { error: e.message }); }
        hideLoading('match-loading');
      }

      /* ===== Panchang ===== */
      async function getDetailedPanchang() {
        showLoading('pnc-loading');
        try {
          const body = {
            date: document.getElementById('pnc-date').value + 'T12:00:00Z',
            latitude: parseFloat(document.getElementById('pnc-lat').value),
            longitude: parseFloat(document.getElementById('pnc-lon').value),
            timezone: 'UTC'
          };
          const resp = await fetch(API_BASE + '/vedic/panchang-detailed', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          showResult('pnc-result', data);
        } catch (e) { showResult('pnc-result', { error: e.message }); }
        hideLoading('pnc-loading');
      }

      /* ===== Doshas ===== */
      async function checkDoshas() {
        try {
          const natalResp = await fetch(API_BASE + '/natal-chart', {
            method: 'POST', headers: playgroundAuthHeaders(),
            body: JSON.stringify({
              date: document.getElementById('natal-date').value,
              timeUtc: document.getElementById('natal-time').value + ':00',
              latitude: parseFloat(document.getElementById('natal-lat').value),
              longitude: parseFloat(document.getElementById('natal-lon').value),
            })
          });
          const natalData = await natalResp.json();
          const planets = (natalData.planets || []).map(p => ({ name: p.name, house: p.house, longitude: p.longitude }));
          const resp = await fetch(API_BASE + '/vedic/doshas', {
            method: 'POST', headers: playgroundAuthHeaders(),
            body: JSON.stringify({ planets, currentSaturnLon: 300 })
          });
          const data = await resp.json();
          showResult('dosha-result', data);
        } catch (e) { showResult('dosha-result', { error: e.message }); }
      }

      /* ===== Geo Search ===== */
      async function searchCity() {
        const query = document.getElementById('city-query').value;
        if (!query) return;
        try {
          const resp = await fetch(API_BASE + '/geo/search?q=' + encodeURIComponent(query), { headers: playgroundAuthHeaders() });
          const cities = await resp.json();
          const list = document.getElementById('city-results-list');
          list.innerHTML = cities.map(c => {
            const tz = c.timezone.replace(/'/g, '');
            return '<div class="pill" style="cursor:pointer;border-color:var(--accent);margin-bottom:4px;" onclick="fillCoords('+c.latitude+','+c.longitude+')">'+
              '<b>'+c.location_name+'</b>, '+c.country+' <small>('+c.latitude.toFixed(2)+','+c.longitude.toFixed(2)+')</small></div>';
          }).join('');
        } catch (e) { console.error(e); }
      }

      function fillCoords(lat, lon) {
        const fields = ['natal','syn1','syn2','astro','annual','sr','transit','vedic','pnc'];
        fields.forEach(f => {
          if (document.getElementById(f+'-lat')) document.getElementById(f+'-lat').value = lat;
          if (document.getElementById(f+'-lon')) document.getElementById(f+'-lon').value = lon;
        });
      }

      /* ===== Live Header ===== */
      async function updateLiveHeader() {
        try {
          const body = { date: new Date().toISOString(), latitude: -23.55, longitude: -46.63, timezone: 'America/Sao_Paulo' };
          const resp = await fetch(API_BASE + '/vedic/panchang-detailed', { method: 'POST', headers: playgroundAuthHeaders(), body: JSON.stringify(body) });
          const data = await resp.json();
          document.getElementById('hdr-moon-phase').textContent = data.tithi.number ? 'Phase ' + data.tithi.number : '—';
          document.getElementById('hdr-tithi').textContent = data.tithi.name || '—';
          document.getElementById('hdr-yoga').textContent = data.yoga || '—';
          document.getElementById('hdr-nakshatra').textContent = data.nakshatra ? data.nakshatra.name : '—';
          
          if (data.periods && data.periods.rahuKalam) {
            // Very roughly convert the JD fraction to hours for display (UTC -> Local conversion depends on user timezone, but we'll approximate just the time fraction)
            const fmt = (jd) => {
              const f = (jd + 0.5) % 1; 
              const h = Math.floor(f * 24);
              const m = Math.floor((f * 24 - h) * 60);
              return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
            };
            document.getElementById('hdr-rahu').textContent = fmt(data.periods.rahuKalam.start) + ' - ' + fmt(data.periods.rahuKalam.end) + ' UTC';
          } else {
            document.getElementById('hdr-rahu').textContent = '—';
          }
        } catch (e) {}
      }

      /* ===== Code Snippet Modal ===== */
      let currentContext = { endpoint: '', body: {} };
      function openSnippet(endpoint, bodyId) {
        currentContext.endpoint = endpoint;
        const inputs = document.querySelectorAll('#' + bodyId + ' input, #' + bodyId + ' select');
        const payloadLocal = {};
        inputs.forEach(i => {
          let key = i.id.split('-')[1] || 'val';
          if (i.id.startsWith('palm-')) key += 'Line';
          if (key === 'name') key = 'fullName';
          if (key === 'date') key = 'dateOfBirth';
          if (key === 'lat') key = 'latitude';
          if (key === 'lon') key = 'longitude';
          if (key === 'time') key = 'timeUtc';
          let val = i.value;
          if (i.type === 'number') val = parseFloat(val) || 0;
          payloadLocal[key] = val;
        });
        currentContext.body = payloadLocal;
        document.getElementById('code-modal').style.display = 'flex';
        updateSnippet('js');
      }
      function closeModal() { document.getElementById('code-modal').style.display = 'none'; }
      function updateSnippet(lang) {
        document.querySelectorAll('.lang-tab').forEach(function(t) { t.classList.toggle('active', t.textContent.toLowerCase().includes(lang)); });
        var endpoint = currentContext.endpoint;
        var payload = currentContext.body;
        var url = window.location.origin + API_BASE + endpoint;
        var code, Q = "'";
        if (lang === 'js') {
          code = 'fetch(' + Q + url + Q + ', {\\n';
          code += '  method: "POST",\\n  headers: {\\n';
          code += '    "Authorization": "Bearer ' + SNIPPET_KEY_PLACEHOLDER + '",\\n';
          code += '    "Content-Type": "application/json"\\n';
          code += '  },\\n  body: JSON.stringify(' + JSON.stringify(payload, null, 2) + ')\\n';
          code += '}).then(r => r.json()).then(console.log);';
        } else if (lang === 'python') {
          code = 'import requests\\n\\n';
          code += 'url = ' + Q + url + Q + '\\n';
          code += 'headers = {' + Q + 'Authorization' + Q + ': ' + Q + 'Bearer ' + SNIPPET_KEY_PLACEHOLDER + Q + '}\\n';
          code += 'payload = ' + JSON.stringify(payload, null, 2) + '\\n\\n';
          code += 'r = requests.post(url, json=payload, headers=headers)\\nprint(r.json())';
        } else if (lang === 'php') {
          code = '<?php\\n';
          code += '$ch = curl_init(' + Q + url + Q + ');\\n';
          code += 'curl_setopt($ch, CURLOPT_POST, true);\\n';
          code += 'curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(' + JSON.stringify(payload, null, 2) + '));\\n';
          code += 'curl_setopt($ch, CURLOPT_HTTPHEADER, [' + Q + 'Authorization: Bearer ' + SNIPPET_KEY_PLACEHOLDER + Q + ', ' + Q + 'Content-Type: application/json' + Q + ']);\\n';
          code += 'curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\\n';
          code += 'echo curl_exec($ch);\\ncurl_close($ch);';
        } else {
          code = 'curl -X POST ' + Q + url + Q + ' \\\\\\n';
          code += '  -H "Authorization: Bearer ' + SNIPPET_KEY_PLACEHOLDER + '" \\\\\\n';
          code += '  -H "Content-Type: application/json" \\\\\\n';
          code += '  -d ' + Q + JSON.stringify(payload, null, 2) + Q;
        }
        document.getElementById('snippet-box').textContent = code;
      }
      function copySnippet() { navigator.clipboard.writeText(document.getElementById('snippet-box').textContent); alert('Copied!'); }

      function initDashboard() {
        updateLiveHeader();
        ensureGlobalFunctions();
      }

      function ensureGlobalFunctions() {
        // Ensure all calculation functions are accessible as global window properties
        // This is needed because some frameworks/spa routers may shadow the scope
        window.calculateNatalChart = calculateNatalChart;
        window.getHoroscope = getHoroscope;
        window.calculateSynastry = calculateSynastry;
        window.calculateAstrocartography = calculateAstrocartography;
        window.getAnnualPredictions = getAnnualPredictions;
        window.calculateSolarReturn = calculateSolarReturn;
        window.calculateTransits = calculateTransits;
        window.getEclipses = getEclipses;
        window.calculateComposite = calculateComposite;
        window.calculateVedic = calculateVedic;
        window.calculateUniversalNumerology = calculateUniversalNumerology;
        window.drawTarot = drawTarot;
        window.drawRunes = drawRunes;
        window.consultIChing = consultIChing;
        window.interpretPalmistry = interpretPalmistry;
        window.calculateMatching = calculateMatching;
        window.getDetailedPanchang = getDetailedPanchang;
        window.checkDoshas = checkDoshas;
        window.searchCity = searchCity;
        window.fillCoords = fillCoords;
        window.switchResultTab = switchResultTab;
        window.closeModal = closeModal;
        window.updateSnippet = updateSnippet;
        window.copySnippet = copySnippet;
        window.openSnippet = openSnippet;
        window.showLoading = showLoading;
        window.hideLoading = hideLoading;
        window.showResult = showResult;
        window.drawBirthChart = drawBirthChart;
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDashboard);
      } else {
        initDashboard();
      }
      window.addEventListener('load', initDashboard);
    </script>
  </body>
</html>`;
}
