export function generateAdminHTML(serviceName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Super Panel | ${serviceName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #050508;
            --surface: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.08);
            --text: #e0e0f0;
            --text-dim: #94a3b8;
            --accent: #ef4444; /* Red for admin */
            --accent-glow: rgba(239, 68, 68, 0.3);
            --success: #10b981;
            --warning: #f59e0b;
            --info: #3b82f6;
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
        }

        .sidebar {
            position: fixed;
            top: 0; left: 0; bottom: 0; width: 260px;
            background: rgba(10, 10, 15, 0.95);
            border-right: 1px solid var(--border);
            padding: 30px 20px;
            z-index: 100;
        }

        .brand { 
            font-size: 20px; font-weight: 700; margin-bottom: 40px; letter-spacing: 1px;
            background: linear-gradient(135deg, var(--accent) 0%, #fff 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; display: inline-block;
        }
        .brand span { display: none; }

        .nav-item {
            display: block; padding: 12px 16px; margin-bottom: 8px;
            color: var(--text-dim); text-decoration: none; border-radius: 8px;
            transition: all 0.2s; font-size: 14px; font-weight: 500;
        }
        .nav-item:hover, .nav-item.active {
            background: rgba(255, 255, 255, 0.05); color: var(--text);
        }

        .main { margin-left: 260px; padding: 40px; }
        
        .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
        .header h1 { font-size: 24px; font-weight: 600; }
        .logout-btn {
            background: transparent; border: 1px solid var(--border);
            color: var(--text); padding: 8px 16px; border-radius: 8px; cursor: pointer;
        }

        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 30px; }
        
        .card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
        .card h3 { font-size: 13px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 12px; }
        .card .value { font-size: 28px; font-weight: 700; }
        
        .table-container { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th, td { padding: 16px 20px; border-bottom: 1px solid var(--border); font-size: 14px; }
        th { color: var(--text-dim); font-weight: 500; background: rgba(0,0,0,0.2); }
        tbody tr:hover { background: rgba(255,255,255,0.02); }
        
        .badge { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; }
        .badge.active { background: rgba(16, 185, 129, 0.1); color: var(--success); }
        .badge.disabled { background: rgba(239, 68, 68, 0.1); color: var(--accent); }
        .badge.basic { background: rgba(255, 255, 255, 0.1); color: white; }
        .badge.professional { background: rgba(59, 130, 246, 0.1); color: var(--info); }
        .badge.enterprise { background: rgba(245, 158, 11, 0.1); color: var(--warning); }
        .badge.admin { background: rgba(239, 68, 68, 0.1); color: var(--accent); }

        .btn { padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: all 0.2s; }
        .btn-primary { background: var(--accent); color: white; }
        .btn-primary:hover { background: #dc2626; box-shadow: 0 4px 12px var(--accent-glow); }
        .btn-danger { background: transparent; border: 1px solid var(--accent); color: var(--accent); }
        .btn-danger:hover { background: var(--accent); color: white; }
        
        .action-bar { display: flex; justify-content: space-between; padding: 20px; background: rgba(0,0,0,0.2); border-bottom: 1px solid var(--border); }
        
        input[type="text"], input[type="password"] {
            width: 100%; background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border);
            padding: 12px 16px; border-radius: 10px; color: white; font-family: 'Inter', sans-serif;
            outline: none; transition: 0.3s;
        }
        .password-wrapper { position: relative; }
        .toggle-password {
            position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
            background: none; border: none; color: var(--text-dim); cursor: pointer;
            padding: 4px; display: flex; align-items: center; justify-content: center;
            transition: 0.3s;
        }
        .toggle-password:hover { color: var(--accent); }
        input:focus { border-color: var(--accent); }
        select { background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px; }
        
        .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
        .modal.active { display: flex; }
        .modal-content { background: var(--bg); border: 1px solid var(--border); padding: 30px; border-radius: 12px; width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .modal-content h2 { margin-bottom: 20px; font-size: 18px; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 12px; color: var(--text-dim); margin-bottom: 5px; }
        .form-group input, .form-group select { width: 100%; }

        #login-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg);
            z-index: 9999; display: flex; align-items: center; justify-content: center;
        }
        #login-overlay .card { width: 350px; text-align: center; }
    </style>
</head>
<body>

    <div id="login-overlay">
        <div class="card">
            <h2 style="margin-bottom: 8px;">ASTRYXION <span style="color:var(--accent);">ADMIN</span></h2>
            <p style="color: var(--text-dim); font-size: 13px; margin-bottom: 24px;">Login with your administrator account.</p>
            
            <form onsubmit="event.preventDefault(); login(); return false;">
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="auth-email" placeholder="admin@astro.api" autocomplete="username">
                </div>
                <div class="input-wrap">
                    <label>Password</label>
                    <div class="password-wrapper">
                        <input type="password" id="auth-pass" placeholder="••••••••" autocomplete="current-password" onkeyup="if(event.key === 'Enter') login()">
                        <button type="button" class="toggle-password" onclick="togglePassword('auth-pass')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px; padding: 12px;">Access System</button>
            </form>
            <div id="auth-error" style="color: var(--accent); font-size: 12px; margin-top: 16px; min-height: 14px;"></div>
        </div>
    </div>

    <div class="sidebar">
        <div class="brand">ASTRYXION API</div>
        <a href="#" class="nav-item active" onclick="showTab('overview', this)">Overview</a>
        <a href="#" class="nav-item" onclick="showTab('keys', this)">API Keys</a>
        <a href="#" class="nav-item" onclick="showTab('plans', this)">Plans & Pricing</a>
        <a href="#" class="nav-item" onclick="showTab('system', this)">System & Cache</a>
        <a href="#" class="nav-item" onclick="showTab('pdf', this)">PDF Generator</a>
        <a href="/dashboard" class="nav-item" target="_blank">View Playground</a>
    </div>

    <div class="main">
        <div class="header">
            <h1>Super Admin Panel</h1>
            <div id="tab-title" style="font-size: 14px; color: var(--accent); font-weight: 700; text-transform: uppercase; margin-top: 5px;">Overview</div>
            <button class="logout-btn" onclick="logout()">Logout / Clear Token</button>
        </div>

        <!-- OVERVIEW TAB -->
        <div id="tab-overview" class="admin-tab active-tab">
            <div class="grid">
                <div class="card">
                    <h3>Total API Keys</h3>
                    <div class="value" id="stat-keys">--</div>
                </div>
                <div class="card">
                    <h3>System Status</h3>
                    <div class="value" id="stat-sys" style="color: var(--success);">--</div>
                </div>
                <div class="card">
                    <h3>Redis State</h3>
                    <div class="value" id="stat-redis">--</div>
                </div>
                <div class="card">
                    <h3>Security Mode</h3>
                    <div class="value" style="font-size: 18px; line-height: 1.5;" id="stat-sec">--</div>
                </div>
            </div>
        </div>

        <!-- KEYS TAB -->
        <div id="tab-keys" class="admin-tab" style="display:none;">
            <div class="table-container">
                <div class="action-bar">
                    <h3 style="font-size: 16px;">API Key Management</h3>
                    <button class="btn btn-primary" onclick="openModal()">+ Generate New Key</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Hash (First 12 chars)</th>
                            <th>Customer ID</th>
                            <th>Tier</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="keys-table-body">
                        <!-- Loaded via JS -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- PLANS TAB -->
        <div id="tab-plans" class="admin-tab" style="display:none;">
            <div class="table-container">
                <div class="action-bar">
                    <h3 style="font-size: 16px;">Global Plan Configurations</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Internal ID</th>
                            <th>Display Name</th>
                            <th>Req / Day</th>
                            <th>Price</th>
                            <th>Visibility</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="plans-table-body">
                        <!-- Loaded via JS -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- SYSTEM TAB -->
        <div id="tab-system" class="admin-tab" style="display:none;">
            <div class="grid">
                <!-- Redis Stats -->
                <div class="card">
                    <h3 style="color:var(--accent);">🗄️ Redis Cache</h3>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Status</span>
                            <span id="sys-redis-status" class="badge">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Used Memory</span>
                            <span id="sys-redis-mem" style="font-weight:600;">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Cached Keys</span>
                            <span id="sys-redis-keys" style="font-weight:600;">--</span>
                        </div>
                        <button class="btn btn-danger" style="margin-top:10px; width:100%;" onclick="clearCache()">Clear Results Cache</button>
                    </div>
                </div>

                <!-- PDF Infrastructure -->
                <div class="card">
                    <h3 style="color:var(--accent);">📄 PDF Generator</h3>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Pool Load</span>
                            <span id="sys-pdf-pool" style="font-weight:600;">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Active Pages</span>
                            <div style="width:100px; height:8px; background:rgba(255,255,255,0.05); border-radius:4px; overflow:hidden; margin-top:5px;">
                                <div id="sys-pdf-bar" style="height:100%; background:var(--accent); width:0%; transition:width 0.3s;"></div>
                            </div>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Queue Depth</span>
                            <span id="sys-pdf-queue" style="font-weight:600;">--</span>
                        </div>
                        <button class="btn btn-danger" style="margin-top:10px; width:100%;" onclick="restartPool()">Restart Browser Pool</button>
                    </div>
                </div>

                <!-- Server Resources -->
                <div class="card">
                    <h3 style="color:var(--accent);">🖥️ Server Health</h3>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:10px;">
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Process Memory</span>
                            <span id="sys-node-mem" style="font-weight:600;">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">OS Free Memory</span>
                            <span id="sys-os-mem" style="font-weight:600;">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Load Average</span>
                            <span id="sys-os-load" style="font-weight:600;">--</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:13px;">
                            <span style="color:var(--text-dim);">Uptime</span>
                            <span id="sys-node-uptime" style="font-weight:600;">--</span>
                        </div>
                    </div>
                </div>

                <!-- Beta Mode Control -->
                <div class="card">
                    <h3 style="color:var(--accent);">🎁 Public Beta Operations</h3>
                    <div style="margin-top:15px; display:flex; flex-direction:column; gap:15px;">
                        <p style="font-size:12px; color:var(--text-dim); line-height:1.4;">
                            When enabled, registration remains mandatory but all new keys get <b>Mercury Tier</b> for free.
                            Existing "Free" users are dynamically promoted to higher limits during evaluation.
                        </p>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span id="beta-status-label" style="font-size:14px; font-weight:700; color:var(--error);">🔴 PRODUCTION (PAID)</span>
                            <button id="beta-toggle-btn" class="btn btn-primary" onclick="toggleBetaMode()">Activate Beta Mode</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PDF GENERATOR TAB -->
        <div id="tab-pdf" class="admin-tab" style="display:none;">
            <div class="grid" style="grid-template-columns: 1fr 1fr;">
                <div class="card">
                    <h3 style="color: var(--accent); margin-bottom: 20px;">🎴 Natal Chart PDF</h3>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="pdf-natal-name" value="Test User" style="width: 100%;">
                    </div>
                    <div class="form-group">
                        <label>Birth Date (YYYY-MM-DD)</label>
                        <input type="date" id="pdf-natal-date" value="1990-05-15" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Birth Time (HH:MM:SS)</label>
                        <input type="text" id="pdf-natal-time" value="14:30:00" placeholder="14:30:00" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Latitude</label>
                        <input type="number" id="pdf-natal-lat" value="-23.5505" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Longitude</label>
                        <input type="number" id="pdf-natal-lng" value="-46.6333" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Language</label>
                        <select id="pdf-natal-lang" style="width: 100%;">
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                            <option value="es">Español</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="pdf-natal-refresh" style="margin-right: 8px;">
                            Bypass Cache (Force Regenerate)
                        </label>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="generateNatalPDF()">
                        📥 Generate Natal PDF
                    </button>
                    <div id="pdf-natal-status" style="margin-top: 15px; font-size: 12px; min-height: 20px;"></div>
                </div>

                <div class="card">
                    <h3 style="color: var(--accent); margin-bottom: 20px;">📊 Mini Horoscope</h3>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="pdf-mini-name" value="Test User" style="width: 100%;">
                    </div>
                    <div class="form-group">
                        <label>Birth Date</label>
                        <input type="date" id="pdf-mini-date" value="1990-05-15" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Birth Time</label>
                        <input type="text" id="pdf-mini-time" value="14:30:00" placeholder="14:30:00" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Latitude</label>
                        <input type="number" id="pdf-mini-lat" value="-23.5505" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Longitude</label>
                        <input type="number" id="pdf-mini-lng" value="-46.6333" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                    </div>
                    <div class="form-group">
                        <label>Language</label>
                        <select id="pdf-mini-lang" style="width: 100%;">
                            <option value="en">English</option>
                            <option value="pt">Português</option>
                            <option value="es">Español</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="pdf-mini-refresh" style="margin-right: 8px;">
                            Bypass Cache
                        </label>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="generateMiniPDF()">
                        📥 Generate Mini PDF
                    </button>
                    <div id="pdf-mini-status" style="margin-top: 15px; font-size: 12px; min-height: 20px;"></div>
                </div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3 style="color: var(--accent); margin-bottom: 20px;">💕 Matchmaking PDF</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                    <div>
                        <h4 style="color: var(--text-dim); margin-bottom: 15px;">Partner 1</h4>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="pdf-match-name1" value="Partner A" style="width: 100%;">
                        </div>
                        <div class="form-group">
                            <label>Birth Date</label>
                            <input type="date" id="pdf-match-date1" value="1990-05-15" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Birth Time</label>
                            <input type="text" id="pdf-match-time1" value="14:30:00" placeholder="14:30:00" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Latitude</label>
                            <input type="number" id="pdf-match-lat1" value="-23.5505" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Longitude</label>
                            <input type="number" id="pdf-match-lng1" value="-46.6333" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                    </div>
                    <div>
                        <h4 style="color: var(--text-dim); margin-bottom: 15px;">Partner 2</h4>
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="pdf-match-name2" value="Partner B" style="width: 100%;">
                        </div>
                        <div class="form-group">
                            <label>Birth Date</label>
                            <input type="date" id="pdf-match-date2" value="1992-08-20" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Birth Time</label>
                            <input type="text" id="pdf-match-time2" value="10:00:00" placeholder="10:00:00" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Latitude</label>
                            <input type="number" id="pdf-match-lat2" value="40.7128" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                        <div class="form-group">
                            <label>Longitude</label>
                            <input type="number" id="pdf-match-lng2" value="-74.0060" step="0.0001" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px;">
                        </div>
                    </div>
                </div>
                <div class="form-group" style="margin-top: 20px;">
                    <label>Language</label>
                    <select id="pdf-match-lang" style="width: 200px;">
                        <option value="en">English</option>
                        <option value="pt">Português</option>
                        <option value="es">Español</option>
                        <option value="hi">हिन्दी</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="pdf-match-refresh" style="margin-right: 8px;">
                        Bypass Cache
                    </label>
                </div>
                <button class="btn btn-primary" style="margin-top: 10px;" onclick="generateMatchmakingPDF()">
                    📥 Generate Matchmaking PDF
                </button>
                <div id="pdf-match-status" style="margin-top: 15px; font-size: 12px; min-height: 20px;"></div>
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>📈 PDF Health Status</h3>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 20px;">
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--success);" id="pdf-health-status">--</div>
                        <div style="font-size: 11px; color: var(--text-dim); margin-top: 5px;">Service Status</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--info);" id="pdf-health-time">--</div>
                        <div style="font-size: 11px; color: var(--text-dim); margin-top: 5px;">Generation Time</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <div style="font-size: 24px; font-weight: 700; color: var(--warning);" id="pdf-health-cache">--</div>
                        <div style="font-size: 11px; color: var(--text-dim); margin-top: 5px;">Cache Status</div>
                    </div>
                    <div style="text-align: center; padding: 15px; background: rgba(0,0,0,0.2); border-radius: 8px;">
                        <button class="btn btn-primary" style="font-size: 11px; padding: 6px 12px;" onclick="checkPDFHealth()">Refresh</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="createModal">
        <div class="modal-content">
            <h2>Generate API Key</h2>
            <div class="form-group">
                <label>Customer Identifier (Email/UUID)</label>
                <input type="text" id="new-customer" placeholder="user@example.com">
            </div>
            <div class="form-group">
                <label>Billing Tier</label>
                <select id="new-tier">
                    <option value="basic">Basic (Mapped to Display Name)</option>
                    <option value="professional">Professional (Mapped to PRO)</option>
                    <option value="enterprise">Enterprise (Mapped to Ultimate)</option>
                    <option value="admin">Admin System</option>
                </select>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="createKey()">Generate</button>
                <button class="btn btn-danger" style="flex: 1;" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    </div>

    <!-- Edit Plan Modal -->
    <div class="modal" id="planModal">
        <div class="modal-content">
            <h2>Edit API Plan</h2>
            <input type="hidden" id="edit-plan-id">
            <div class="form-group">
                <label>Display Name</label>
                <input type="text" id="edit-plan-name">
            </div>
            <div class="form-group">
                <label>Requests Per Day</label>
                <input type="number" id="edit-plan-req" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); color: white; padding: 8px 12px; border-radius: 6px;">
            </div>
            <div class="form-group">
                <label>Price Label</label>
                <input type="text" id="edit-plan-price">
            </div>
            <div class="form-group">
                <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:500;">
                    <input type="checkbox" id="edit-plan-enabled" style="width:auto;">
                    Show on website & customer portal
                </label>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="savePlan()">Save Changes</button>
                <button class="btn btn-danger" style="flex: 1;" onclick="document.getElementById('planModal').classList.remove('active')">Cancel</button>
            </div>
        </div>
    </div>

    <script>
        let sessionToken = localStorage.getItem("astro_session_token");
        let plansCache = [];

        if (sessionToken) {
            checkSession();
        }

        function showTab(tabId, el) {
            document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
            document.getElementById('tab-' + tabId).style.display = 'block';
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            el.classList.add('active');
            document.getElementById('tab-title').textContent = tabId;

            if (tabId === 'system') {
                loadSystemStats();
            }
        }

        async function checkSession() {
            try {
                const res = await fetch('/api/v1/users/me', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
                const data = await res.json();
                if (res.ok && data.role === 'admin') {
                    document.getElementById("login-overlay").style.display = "none";
                    loadData();
                    loadPlans();
                } else {
                    localStorage.removeItem("astro_session_token");
                }
            } catch (e) { }
        }

        function togglePassword(id) {
            const input = document.getElementById(id);
            const btn = input.nextElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        }

        async function login() {
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-pass").value;
            const err = document.getElementById("auth-error");
            err.textContent = "Authenticating...";
            
            try {
                const res = await fetch('/api/v1/users/login', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                });
                const data = await res.json();
                
                if (res.ok && data.session && data.session.role === 'admin') {
                    sessionToken = data.session.token;
                    localStorage.setItem("astro_session_token", sessionToken);
                    document.getElementById("login-overlay").style.display = "none";
                    loadData();
                    loadPlans();
                } else {
                    err.textContent = data.session && data.session.role !== 'admin' ? 
                        "Access Denied: Admins Only" : (data.message || "Login failed");
                }
            } catch(e) { err.textContent = "Network error"; }
        }

        async function logout() {
            if (sessionToken) {
                await fetch('/api/v1/users/logout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + sessionToken }});
            }
            localStorage.removeItem("astro_session_token");
            location.reload();
        }

        async function api(path, options = {}) {
            const heads = {
                'Authorization': 'Bearer ' + sessionToken,
                ...(options.headers || {})
            };
            if (options.body) {
                heads['Content-Type'] = 'application/json';
            }
            
            const res = await fetch(path, {
                ...options,
                headers: heads
            });
            if(res.status === 401 || res.status === 403) {
                alert("Unauthorized or session expired.");
                logout();
                throw new Error("Unauthorized");
            }
            return res.json();
        }

        async function toggleBetaMode() {
            const currentStatus = document.getElementById("beta-status-label").textContent.includes("OPEN");
            const newMode = !currentStatus;
            
            if (!confirm("Are you sure you want to " + (newMode ? "OPEN" : "CLOSE") + " the API to the public?")) return;

            try {
                const res = await fetch("/admin/api/system/settings", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + sessionToken 
                    },
                    body: JSON.stringify({ betaMode: newMode })
                });
                if (res.ok) {
                    await loadSystemStats();
                }
            } catch (e) {
                alert("Settings sync failed.");
            }
        }

        async function loadData() {
            try {
                const stats = await api('/admin/api/stats');
                document.getElementById('stat-keys').textContent = stats.apiKeys.count ?? 0;
                document.getElementById('stat-sys').textContent = 'Online';
                document.getElementById('stat-redis').textContent = stats.redis.enabled ? stats.redis.status : 'Disabled';
                document.getElementById('stat-sec').textContent = stats.apiKeys.mode;

                const data = await api('/admin/api/keys');
                const tbody = document.getElementById('keys-table-body');
                tbody.innerHTML = '';
                
                data.keys.forEach(k => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = \`
                        <td style="font-family: monospace;">\${k.hash.substring(0, 12)}...</td>
                        <td>\${k.customerId || '<em>N/A</em>'}</td>
                        <td><span class="badge \${k.tier}">\${k.tier}</span></td>
                        <td><span class="badge \${k.status}">\${k.status}</span></td>
                        <td>
                            <button class="btn \${k.status === 'active' ? 'btn-danger' : 'btn-primary'}" 
                                onclick="toggleStatus('\${k.hash}', '\${k.status === 'active' ? 'disabled' : 'active'}')">
                                \${k.status === 'active' ? 'Revoke' : 'Activate'}
                            </button>
                            <button class="btn btn-danger" style="margin-left: 5px;" onclick="deleteKey('\${k.hash}')">Delete</button>
                        </td>
                    \`;
                    tbody.appendChild(tr);
                });
            } catch (err) { console.error(err); }
        }

        async function loadSystemStats() {
            try {
                const data = await api('/admin/api/system/info');
                
                // Redis
                const rStatus = document.getElementById('sys-redis-status');
                rStatus.textContent = data.redis.status;
                rStatus.className = 'badge ' + (data.redis.status === 'ready' ? 'active' : 'disabled');
                document.getElementById('sys-redis-mem').textContent = data.redis.usedMemory || 'N/A';
                document.getElementById('sys-redis-keys').textContent = data.redis.keys || '0';

                // PDF
                const poolTotal = data.pdf.maxPages;
                const poolActive = data.pdf.activePages;
                const pct = Math.round((poolActive / poolTotal) * 100);
                document.getElementById('sys-pdf-pool').textContent = \`\${poolActive} / \${poolTotal}\`;
                document.getElementById('sys-pdf-bar').style.width = pct + '%';
                document.getElementById('sys-pdf-queue').textContent = data.pdf.queueLength;

                // Server
                document.getElementById('sys-node-mem').textContent = data.resources.memory.rss + ' MB';
                document.getElementById('sys-os-mem').textContent = data.resources.os.freeMem + ' / ' + data.resources.os.totalMem + ' MB';
                document.getElementById('sys-os-load').textContent = data.resources.os.loadAvg.map(l => l.toFixed(2)).join(', ');
                
                const up = data.service.uptime;
                const hrs = Math.floor(up / 3600);
                const mins = Math.floor((up % 3600) / 60);
                document.getElementById('sys-node-uptime').textContent = \`\${hrs}h \${mins}m\`;

                // Runtime (Safely check if cards exist)
                const nodeV = document.getElementById('sys-node-v');
                if (nodeV) nodeV.textContent = data.service.nodeVersion;
                
                const instId = document.getElementById('sys-inst-id');
                if (instId) instId.textContent = data.service.instanceId;
                
                const platform = document.getElementById('sys-platform');
                if (platform) platform.textContent = data.service.platform;

                // Refresh Beta Status
                try {
                    const setRes = await fetch("/admin/api/system/settings", {
                        headers: { "Authorization": "Bearer " + sessionToken }
                    });
                    if (setRes.ok) {
                        const { settings } = await setRes.json();
                        const label = document.getElementById("beta-status-label");
                        const btn = document.getElementById("beta-toggle-btn");
                        const secMode = document.getElementById("stat-sec");

                        if (settings.betaMode) {
                            label.textContent = "🟢 BETA REGISTERED ONLY";
                            label.style.color = "var(--success)";
                            btn.textContent = "Deactivate Beta Mode";
                            if (secMode) secMode.innerHTML = "Secure Key Grid<br><span style='font-size:12px; color:var(--success);'>[ BETA PROMOTION ACTIVE ]</span>";
                        } else {
                            label.textContent = "🔴 PRODUCTION (PAID)";
                            label.style.color = "var(--error)";
                            btn.textContent = "Activate Beta Mode";
                            if (secMode) secMode.innerHTML = "Secure Key Grid<br><span style='font-size:12px; color:var(--text-dim);'>[ Standard Limits ]</span>";
                        }
                    }
                } catch (e) { }

            } catch (err) { console.error(err); }
        }

        async function clearCache() {
            if(!confirm("Are you sure? This will remove all cached horoscopes and PDF results to free up memory, but it will NOT affect your API Keys or Users.")) return;
            try {
                const res = await api('/admin/api/system/cache/clear', { method: 'POST' });
                alert(res.message || "Cache cleared successfully.");
                loadSystemStats();
            } catch (e) { alert("Failed to clear cache."); }
        }

        async function restartPool() {
            if(!confirm("This will close the current Puppeteer process and clear the request queue. Proceed?")) return;
            try {
                await api('/admin/api/system/pool/restart', { method: 'POST' });
                alert("Browser pool reset triggered.");
                loadSystemStats();
            } catch (e) { alert("Failed to restart pool."); }
        }

        async function loadPlans() {
            try {
                const data = await api('/admin/api/config/tiers');
                plansCache = data.tiers || [];
                const tbody = document.getElementById('plans-table-body');
                tbody.innerHTML = '';
                data.tiers.forEach(p => {
                    const tr = document.createElement('tr');
                    const vis = p.enabled !== false;
                    if (!vis) tr.style.opacity = '0.7';
                    tr.innerHTML = \`
                        <td><code style="color: var(--accent);">\${p.id}</code></td>
                        <td><strong>\${String(p.displayName).replace(/</g,'&lt;')}</strong></td>
                        <td>\${p.requestsPerDay.toLocaleString()}</td>
                        <td>\${String(p.price).replace(/</g,'&lt;')}</td>
                        <td>\${vis ? '<span class="badge" style="background:rgba(34,197,94,0.15);color:#86efac">Visible</span>' : '<span class="badge" style="background:rgba(239,68,68,0.15);color:#fca5a5">Hidden</span>'}</td>
                        <td style="display:flex;flex-wrap:wrap;gap:8px;">
                            <button type="button" class="btn btn-secondary" style="font-size:11px;padding:6px 10px;" onclick="togglePlanVisibility('\${p.id}')">\${vis ? 'Hide plan' : 'Show plan'}</button>
                            <button type="button" class="btn btn-primary" style="font-size:11px;padding:6px 10px;" onclick="openPlanModal('\${p.id}')">Edit</button>
                        </td>
                    \`;
                    tbody.appendChild(tr);
                });
            } catch (e) { }
        }

        async function togglePlanVisibility(id) {
            const p = plansCache.find(x => x.id === id);
            if (!p) return;
            const nowOn = p.enabled !== false;
            try {
                await api('/admin/api/config/tiers', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: p.id,
                        displayName: p.displayName,
                        requestsPerDay: p.requestsPerDay,
                        price: p.price,
                        features: Array.isArray(p.features) ? p.features : [],
                        enabled: !nowOn
                    })
                });
                loadPlans();
            } catch (e) { alert('Failed to update plan visibility'); }
        }

        function openPlanModal(id) {
            const p = plansCache.find(x => x.id === id);
            if (!p) return;
            document.getElementById('edit-plan-id').value = p.id;
            document.getElementById('edit-plan-name').value = p.displayName;
            document.getElementById('edit-plan-req').value = p.requestsPerDay;
            document.getElementById('edit-plan-price').value = p.price;
            document.getElementById('edit-plan-enabled').checked = p.enabled !== false;
            document.getElementById('planModal').classList.add('active');
        }

        async function savePlan() {
            const id = document.getElementById('edit-plan-id').value;
            const displayName = document.getElementById('edit-plan-name').value;
            const requestsPerDay = parseInt(document.getElementById('edit-plan-req').value);
            const price = document.getElementById('edit-plan-price').value;
            const enabled = document.getElementById('edit-plan-enabled').checked;

            try {
                await api('/admin/api/config/tiers', {
                    method: 'POST',
                    body: JSON.stringify({ id, displayName, requestsPerDay, price, enabled })
                });
                document.getElementById('planModal').classList.remove('active');
                loadPlans();
                alert("Plan updated successfully!");
            } catch (e) { alert("Error updating plan"); }
        }

        function openModal() { document.getElementById('createModal').classList.add('active'); }
        function closeModal() { document.getElementById('createModal').classList.remove('active'); }

        async function createKey() {
            const customerId = document.getElementById('new-customer').value;
            const tier = document.getElementById('new-tier').value;
            try {
                const res = await api('/admin/api/keys', {
                    method: 'POST',
                    body: JSON.stringify({ tier, customerId, status: 'active' })
                });
                closeModal();
                alert("API KEY CREATED:\\n\\n" + res.apiKey + "\\n\\nWARNING: Save this now. It will not be shown again.");
                loadData();
            } catch (e) { alert("Error creating key"); }
        }

        async function toggleStatus(hash, newStatus) {
            if(!confirm(\`Change status to \${newStatus}?\`)) return;
            try {
                await api(\`/admin/api/keys/\${hash}/status\`, {
                    method: 'POST',
                    body: JSON.stringify({ status: newStatus })
                });
                loadData();
            } catch(e) {}
        }

        async function deleteKey(hash) {
            if(!confirm("DELETE KEY PERMANENTLY? This cannot be undone.")) return;
            try {
                await api(\`/admin/api/keys/\${hash}\`, { method: 'DELETE' });
                loadData();
            } catch(e) {}
        }

        // ============================================================================
        // PDF GENERATOR FUNCTIONS
        // ============================================================================

        async function generateNatalPDF() {
            const btn = document.querySelector('#tab-pdf .btn-primary');
            const status = document.getElementById('pdf-natal-status');
            status.innerHTML = '<span style="color: var(--info);">⏳ Generating Natal PDF...</span>';
            btn.disabled = true;

            const payload = {
                fullName: document.getElementById('pdf-natal-name').value,
                date: document.getElementById('pdf-natal-date').value,
                timeUtc: document.getElementById('pdf-natal-time').value,
                latitude: parseFloat(document.getElementById('pdf-natal-lat').value),
                longitude: parseFloat(document.getElementById('pdf-natal-lng').value),
                lang: document.getElementById('pdf-natal-lang').value
            };

            const refresh = document.getElementById('pdf-natal-refresh').checked;
            const url = '/api/v1/reports/natal-pdf' + (refresh ? '?refresh=true' : '');

            try {
                const startTime = Date.now();
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + sessionToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error?.message || err.message || 'Failed to generate PDF');
                }

                const blob = await res.blob();
                const generationTime = res.headers.get('X-Generation-Time-Ms');
                const cacheHit = res.headers.get('X-Cache-Hit');
                const duration = Date.now() - startTime;

                // Download
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = \`natal_\${payload.fullName.replace(/\\s/g, '_')}.pdf\`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);

                const cacheColor = cacheHit === 'HIT' ? 'var(--success)' : 'var(--warning)';
                status.innerHTML = \`
                    <span style="color: var(--success);">✅ Natal PDF generated!</span><br>
                    <span style="color: var(--text-dim);">
                        Server time: \${generationTime}ms |
                        Total time: \${duration}ms |
                        Cache: <span style="color: \${cacheColor};">\${cacheHit}</span>
                    </span>
                \`;
            } catch (err) {
                status.innerHTML = \`<span style="color: var(--accent);">❌ Error: \${err.message}</span>\`;
            } finally {
                btn.disabled = false;
            }
        }

        async function generateMiniPDF() {
            const status = document.getElementById('pdf-mini-status');
            status.innerHTML = '<span style="color: var(--info);">⏳ Generating Mini PDF...</span>';

            const payload = {
                fullName: document.getElementById('pdf-mini-name').value,
                date: document.getElementById('pdf-mini-date').value,
                timeUtc: document.getElementById('pdf-mini-time').value,
                latitude: parseFloat(document.getElementById('pdf-mini-lat').value),
                longitude: parseFloat(document.getElementById('pdf-mini-lng').value),
                lang: document.getElementById('pdf-mini-lang').value
            };

            const refresh = document.getElementById('pdf-mini-refresh').checked;
            const url = '/api/v1/reports/mini-horoscope' + (refresh ? '?refresh=true' : '');

            try {
                const startTime = Date.now();
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + sessionToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error?.message || 'Failed to generate PDF');
                }

                const blob = await res.blob();
                const generationTime = res.headers.get('X-Generation-Time-Ms');
                const cacheHit = res.headers.get('X-Cache-Hit');
                const duration = Date.now() - startTime;

                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = \`mini_\${payload.fullName.replace(/\\s/g, '_')}.pdf\`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);

                const cacheColor = cacheHit === 'HIT' ? 'var(--success)' : 'var(--warning)';
                status.innerHTML = \`
                    <span style="color: var(--success);">✅ Mini PDF generated!</span><br>
                    <span style="color: var(--text-dim);">
                        Server time: \${generationTime}ms |
                        Total time: \${duration}ms |
                        Cache: <span style="color: \${cacheColor};">\${cacheHit}</span>
                    </span>
                \`;
            } catch (err) {
                status.innerHTML = \`<span style="color: var(--accent);">❌ Error: \${err.message}</span>\`;
            }
        }

        async function generateMatchmakingPDF() {
            const status = document.getElementById('pdf-match-status');
            status.innerHTML = '<span style="color: var(--info);">⏳ Generating Matchmaking PDF...</span>';

            const payload = {
                personA: {
                    fullName: document.getElementById('pdf-match-name1').value,
                    date: document.getElementById('pdf-match-date1').value,
                    timeUtc: document.getElementById('pdf-match-time1').value,
                    latitude: parseFloat(document.getElementById('pdf-match-lat1').value),
                    longitude: parseFloat(document.getElementById('pdf-match-lng1').value)
                },
                personB: {
                    fullName: document.getElementById('pdf-match-name2').value,
                    date: document.getElementById('pdf-match-date2').value,
                    timeUtc: document.getElementById('pdf-match-time2').value,
                    latitude: parseFloat(document.getElementById('pdf-match-lat2').value),
                    longitude: parseFloat(document.getElementById('pdf-match-lng2').value)
                },
                lang: document.getElementById('pdf-match-lang').value
            };

            const refresh = document.getElementById('pdf-match-refresh').checked;
            const url = '/api/v1/reports/matchmaking' + (refresh ? '?refresh=true' : '');

            try {
                const startTime = Date.now();
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + sessionToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error?.message || 'Failed to generate PDF');
                }

                const blob = await res.blob();
                const generationTime = res.headers.get('X-Generation-Time-Ms');
                const cacheHit = res.headers.get('X-Cache-Hit');
                const duration = Date.now() - startTime;

                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = \`matchmaking_\${payload.personA.fullName}_\${payload.personB.fullName}.pdf\`.replace(/\\s/g, '_').slice(0, 100);
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(downloadUrl);

                const cacheColor = cacheHit === 'HIT' ? 'var(--success)' : 'var(--warning)';
                status.innerHTML = \`
                    <span style="color: var(--success);">✅ Matchmaking PDF generated!</span><br>
                    <span style="color: var(--text-dim);">
                        Server time: \${generationTime}ms |
                        Total time: \${duration}ms |
                        Cache: <span style="color: \${cacheColor};">\${cacheHit}</span>
                    </span>
                \`;
            } catch (err) {
                status.innerHTML = \`<span style="color: var(--accent);">❌ Error: \${err.message}</span>\`;
            }
        }

        async function checkPDFHealth() {
            document.getElementById('pdf-health-status').textContent = '⏳';
            document.getElementById('pdf-health-time').textContent = '--';
            document.getElementById('pdf-health-cache').textContent = '--';

            try {
                const res = await fetch('/api/v1/reports/health');
                const data = await res.json();

                if (data.status === 'healthy') {
                    document.getElementById('pdf-health-status').textContent = '✅';
                    document.getElementById('pdf-health-status').style.color = 'var(--success)';
                    document.getElementById('pdf-health-time').textContent = data.pdfGeneration.generationTimeMs + 'ms';
                    document.getElementById('pdf-health-cache').textContent = data.pdfGeneration.cached ? 'HIT' : 'MISS';
                } else {
                    document.getElementById('pdf-health-status').textContent = '❌';
                    document.getElementById('pdf-health-status').style.color = 'var(--accent)';
                }
            } catch (err) {
                document.getElementById('pdf-health-status').textContent = '❌';
                document.getElementById('pdf-health-status').style.color = 'var(--accent)';
            }
        }

        // Check PDF health - attach to PDF tab nav item
        const pdfNavItem = document.querySelector('.nav-item:nth-child(4)');
        if (pdfNavItem) {
            pdfNavItem.addEventListener('click', checkPDFHealth);
        }
    </script>
</body>
</html>`;
}
