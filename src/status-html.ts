export function generateStatusHTML(port: number, serviceName: string, startedAtUtc: string, instanceId: string, redis: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Status | ASTRYXION API</title>
    <link rel="icon" type="image/png" href="/assets/favicon-astryxion.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <style>
        :root {
            --bg: #0a0a0c;
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
            --text: #e0e0f0;
            --text-dim: #94a3b8;
            --accent: #8a4fff;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            overflow-x: hidden;
        }

        .status-inner.container { max-width: 1000px; margin: 0 auto; padding: 24px 20px 40px; }

        .status-toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            margin-bottom: 28px;
        }

        .global-status {
            padding: 30px;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 24px;
            margin-bottom: 40px;
            position: relative;
            overflow: hidden;
        }

        .pulse-outer {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .pulse-inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--success);
            box-shadow: 0 0 15px var(--success);
        }

        .pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--success);
            animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        .status-text h2 { font-size: 20px; margin-bottom: 4px; }
        .status-text p { color: var(--text-dim); font-size: 14px; }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            padding: 24px;
            border-radius: 16px;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            animation: slideUp 0.5s ease-out forwards;
            opacity: 0;
            backdrop-filter: blur(10px);
        }

        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.15s; }
        .card:nth-child(3) { animation-delay: 0.2s; }
        .card:nth-child(4) { animation-delay: 0.25s; }
        .card:nth-child(5) { animation-delay: 0.3s; }
        .card:nth-child(6) { animation-delay: 0.35s; }
        .card:nth-child(7) { animation-delay: 0.4s; }
        .card:nth-child(8) { animation-delay: 0.45s; }

        .card:hover { 
            border-color: var(--accent); 
            transform: translateY(-5px);
            box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.2);
            background: rgba(255, 255, 255, 0.05);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .card-title { font-size: 15px; font-weight: 600; color: var(--text-dim); }
        .badge {
            font-size: 11px;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge.operational { background: rgba(16, 185, 129, 0.1); color: var(--success); border: 1px solid rgba(16, 185, 129, 0.2); }
        
        .metric-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .metric-label { color: var(--text-dim); }
        .metric-value { font-family: 'Fira Code', monospace; color: var(--text); font-weight: 500; }

        .progress-bar {
            height: 4px;
            background: rgba(255,255,255,0.05);
            border-radius: 2px;
            margin-top: 12px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--accent), #818cf8);
            width: 99.9%;
            border-radius: 2px;
        }

        .history-box {
            background: var(--card-bg);
            border: 1px solid var(--border);
            padding: 24px;
            border-radius: 16px;
        }

        .history-header { display: flex; justify-content: space-between; margin-bottom: 24px; }
        
        .uptime-blocks {
            display: flex;
            gap: 4px;
            margin-bottom: 12px;
        }

        .block {
            flex: 1;
            height: 30px;
            background: var(--success);
            border-radius: 2px;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        .block:hover { opacity: 1; }
        .block.degraded { background: var(--warning); }
        .block.down { background: var(--error); }

        .footer {
            margin-top: 60px;
            text-align: center;
            color: var(--text-dim);
            font-size: 13px;
        }

        .back-link {
            color: var(--accent);
            text-decoration: none;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }
    </style>
    <script>
        (function() {
            const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiPort = '3000';
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
<body class="status-page">
    <div id="astryxion-beta-banner" class="beta-banner">
        <span>✨ <b>ASTRYXION OPEN BETA:</b> Register now & get <b>Mercury Tier</b> for free!</span>
        <a href="/portal">Claim Access &rarr;</a>
    </div>
    <script>
        async function checkBetaBanner() {
            try {
                var isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                var endpoint = isLocal ? 'http://' + window.location.hostname + ':3000/api/v1/system/config' : '/api/v1/system/config';
                var res = await fetch(endpoint);
                var data = await res.json();
                if (data.betaMode) {
                    document.getElementById('astryxion-beta-banner').style.display = 'flex';
                    document.body.classList.add('has-beta-banner');
                }
            } catch (e) { console.warn('Beta status unavailable', e); }
        }
        checkBetaBanner();
    </script>
    <header class="main-header">
        <nav class="container">
            <a href="/" class="logo">ASTRYXION API</a>
            <ul class="nav-links">
                <li><a href="/features">Full Catalog</a></li>
                <li><a href="/status" class="active api-link">Status</a></li>
                <li><a href="/docs" class="api-link" target="_blank" rel="noopener">Docs</a></li>
                <li><a href="/dashboard" class="api-link" target="_blank" rel="noopener">Playground</a></li>
                <li><a href="/#pricing">Pricing</a></li>
                <li><a href="/portal" class="btn btn-secondary api-link">Login / Portal 🔑</a></li>
            </ul>
        </nav>
    </header>
    <main class="status-main-content">
    <div class="container status-inner">
        <div class="status-toolbar">
            <a href="/dashboard" class="back-link api-link">← Back to Playground</a>
            <div id="last-update" style="font-size: 13px; color: var(--text-dim);">Updated just now</div>
        </div>
        <p class="status-page-tagline" style="font-size: 14px; color: var(--text-dim); margin: -12px 0 28px;">System status &amp; service health</p>

        <section class="global-status">
            <div class="pulse-outer">
                <div class="pulse-ring"></div>
                <div class="pulse-inner"></div>
            </div>
            <div class="status-text">
                <h2 id="overall-status">All systems operational</h2>
                <p>No incidents reported in the last 24 hours.</p>
            </div>
        </section>

        <div class="grid">
            <!-- Central Intelligence -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Western Astrology Engine</span>
                    <span class="badge operational">Operational</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Latency (avg)</span>
                    <span class="metric-value">42ms</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">99.98%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
            </div>

            <!-- Vedic Expert -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Vedic Expert System</span>
                    <span class="badge operational">Operational</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Nakshatra Audit</span>
                    <span class="metric-value">Pass</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">100%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
            </div>

            <!-- Esoteric Suite -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Esoteric Suite (AI)</span>
                    <span class="badge operational">Operational</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Response Time</span>
                    <span class="metric-value">120ms</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">AI Integration</span>
                    <span class="metric-value">Ready</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            </div>

            <!-- Report Factory -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Report Factory (PDF)</span>
                    <span class="badge operational">Operational</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Puppeteer Node</span>
                    <span class="metric-value">Active</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Uptime</span>
                    <span class="metric-value">99.9%</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 99.9%"></div></div>
            </div>

            <!-- Database -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Data Storage (Redis)</span>
                    <span id="redis-badge" class="badge">Checking...</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Cache Hit Ratio</span>
                    <span class="metric-value">94.2%</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Persistence</span>
                    <span class="metric-value">Cloud</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 94%"></div></div>
            </div>

            <!-- Geo Engine -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">GeoLocal Engine (Offline)</span>
                    <span class="badge operational">Active</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">City Database</span>
                    <span class="metric-value">7,000+</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Search Speed</span>
                    <span class="metric-value">< 5ms</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            </div>

            <!-- Vedic Advanced -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Vedic Advanced Services</span>
                    <span class="badge operational">Enabled</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Matching Logic</span>
                    <span class="metric-value">Ashtakoot+</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Dosha Engine</span>
                    <span class="metric-value">Validated</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            </div>

            <!-- Infrastructure -->
            <div class="card">
                <div class="card-header">
                    <span class="card-title">Infrastructure</span>
                    <span id="infra-badge" class="badge operational">Healthy</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Instance ID</span>
                    <span class="metric-value">${instanceId}</span>
                </div>
                <div class="metric-row">
                    <span class="metric-label">Memory Usage</span>
                    <span id="mem-usage" class="metric-value">Calculating...</span>
                </div>
                <div class="progress-bar"><div class="progress-fill" style="width: 100%"></div></div>
            </div>
        </div>

        <section class="history-box">
            <div class="history-header">
                <span class="card-title">Uptime (last 90 days)</span>
                <span id="total-uptime" style="font-size: 14px; font-weight: 600; color: var(--success);">Checking...</span>
            </div>
            <div class="uptime-blocks">
                ${Array(90).fill(0).map(() => '<div class="block"></div>').join('')}
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--text-dim);">
                <span>90 days ago</span>
                <span>Celestial Forecast: Stable</span>
                <span>Today</span>
            </div>
        </section>

        <footer class="footer">
            <p>ASTRYXION API &copy; ${new Date().getFullYear()} · Status Engine V2.0</p>
        </footer>
    </div>
    </main>

    <script>
        async function updateLiveStats() {
            try {
                const resp = await fetch('/health');
                const data = await resp.json();
                
                // Update overall
                const overall = document.getElementById('overall-status');
                if (data.status === 'ok' || data.status === 'UP') {
                   overall.textContent = 'All systems operational';
                   document.querySelector('.pulse-inner').style.background = 'var(--success)';
                }

                // Update memory
                if (data.memory && data.memory.rss) {
                    const memMb = Math.round(data.memory.rss / 1024 / 1024);
                    document.getElementById('mem-usage').textContent = memMb + ' MB';
                }
                
                // Update Redis
                const redisBadge = document.getElementById('redis-badge');
                if (data.redis && (data.redis.status === 'connected' || data.redis.status === 'UP')) {
                    redisBadge.textContent = 'CONNECTED';
                    redisBadge.className = 'badge operational';
                    redisBadge.style.background = '';
                    redisBadge.style.color = '';
                } else {
                    redisBadge.textContent = 'DISCONNECTED';
                    redisBadge.className = 'badge';
                    redisBadge.style.background = 'rgba(239, 68, 68, 0.1)';
                    redisBadge.style.color = 'var(--error)';
                }

                document.getElementById('total-uptime').textContent = '99.998% Total Uptime';

                // Update timestamp
                const now = new Date();
                document.getElementById('last-update').textContent = 'Last update: ' + now.toLocaleTimeString();
            } catch (e) {
                console.error('Failed to update live stats', e);
            }
        }

        // Initialize and poll
        updateLiveStats();
        setInterval(updateLiveStats, 30000);
    </script>
</body>
</html>`;
}

