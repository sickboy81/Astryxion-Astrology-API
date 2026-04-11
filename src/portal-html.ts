export function generatePortalHTML(serviceName: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Developer Portal | ${serviceName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Fira+Code&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0a0a0c;
            --surface: rgba(20, 20, 25, 0.7);
            --surface-bright: rgba(255, 255, 255, 0.05);
            --border: rgba(138, 79, 255, 0.2);
            --text: #f0f0f2;
            --text-dim: #a0a0b0;
            --accent: #8a4fff;
            --accent-glow: rgba(138, 79, 255, 0.4);
            --secondary: #ffb700;
            --success: #00f2fe;
            --error: #ff3e3e;
            --primary-gradient: linear-gradient(135deg, #8a4fff 0%, #4f46e5 100%);
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            background-image: 
                radial-gradient(circle at 20% 30%, rgba(138, 79, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 183, 0, 0.02) 0%, transparent 50%);
            overflow-x: hidden;
        }

        .header {
            padding: 15px 40px;
            border-bottom: 1px solid var(--border);
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(3, 3, 8, 0.9); backdrop-filter: blur(20px);
            position: sticky; top: 0; z-index: 100;
        }

        .brand { 
            font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: 2px; 
            background: linear-gradient(135deg, var(--accent) 0%, #fff 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text; display: inline-block;
        }

        .user-nav { display: flex; align-items: center; gap: 20px; }
        .user-nav span { font-size: 13px; color: var(--text-dim); }

        .container { max-width: 1200px; margin: 40px auto; padding: 0 40px; }
        
        .page-header { margin-bottom: 40px; }
        .page-header h1 { font-family: 'Outfit', sans-serif; font-size: 32px; margin-bottom: 8px; }
        .page-header p { color: var(--text-dim); font-size: 16px; }

        .grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; }
        
        .section-title { font-family: 'Outfit', sans-serif; font-size: 14px; color: var(--accent); letter-spacing: 1px; margin-bottom: 20px; text-transform: uppercase; display: flex; align-items: center; gap: 10px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        .card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 30px;
            backdrop-filter: blur(10px);
            margin-bottom: 30px;
            position: relative; overflow: hidden;
        }
        .card::before {
            content: ''; position: absolute; top:0; left:0; width: 100%; height: 2px;
            background: linear-gradient(90deg, transparent, var(--accent), transparent);
            opacity: 0.3;
        }

        /* Table Style */
        .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
        .data-table th { text-align: left; padding: 12px; color: var(--text-dim); border-bottom: 1px solid var(--border); font-weight: 600; }
        .data-table td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .data-table tr:hover { background: rgba(255,255,255,0.02); }

        /* API Key Section */
        .key-input-group { margin-top: 20px; display: flex; flex-direction: column; gap: 15px; }
        .input-wrap { position: relative; }
        .input-wrap label { display: block; font-size: 12px; color: var(--text-dim); margin-bottom: 8px; font-weight: 600; }
        .input-wrap input, .input-wrap select { 
            width: 100%; background: rgba(0,0,0,0.3); border: 1px solid var(--border);
            padding: 12px 16px; border-radius: 10px; color: white; font-family: 'Inter', sans-serif;
            outline: none; transition: 0.3s;
        }
        .input-wrap input:focus { border-color: var(--accent); box-shadow: 0 0 10px var(--accent-glow); }
        .password-wrapper { position: relative; }
        .toggle-password {
            position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
            background: none; border: none; color: var(--text-dim); cursor: pointer;
            padding: 4px; display: flex; align-items: center; justify-content: center;
            transition: 0.3s;
        }
        .toggle-password:hover { color: var(--accent); }

        .api-key-result {
            margin-top: 20px; background: rgba(0,0,0,0.5); border: 1px solid var(--border);
            padding: 20px; border-radius: 12px; display: none; border-left: 4px solid var(--success);
        }
        .key-display { font-family: 'Fira Code', monospace; color: var(--success); font-size: 14px; word-break: break-all; }

        /* Pricing Tiers */
        .tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 10px; }
        .tier-card {
            background: rgba(255,255,255,0.02); border: 1px solid var(--border);
            padding: 24px; border-radius: 16px; transition: 0.3s; cursor: pointer;
            display: flex; flex-direction: column;
        }
        .tier-card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.04); border-color: var(--accent); }
        .tier-card.active { border-color: var(--accent); background: rgba(138, 79, 255, 0.05); }
        .tier-name { font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 5px; text-transform: uppercase; }
        .tier-price { font-size: 24px; font-weight: 800; margin-bottom: 15px; }
        .tier-features { list-style: none; font-size: 12px; color: var(--text-dim); flex: 1; }
        .tier-features li { margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px; }
        .tier-features li::before { content: '✦'; color: var(--accent); font-size: 10px; margin-top: 2px; }

        /* Sandbox */
        .sandbox-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        .sandbox-response {
            background: #000; border: 1px solid var(--border); border-radius: 12px;
            padding: 20px; font-family: 'Fira Code', monospace; font-size: 12px;
            height: 350px; overflow: auto; color: #a1a1aa; white-space: pre-wrap;
            position: relative;
        }
        .sandbox-label { position: absolute; top: 10px; right: 20px; font-size: 10px; color: var(--text-dim); text-transform: uppercase; }

        .btn {
            background: var(--surface-bright); color: var(--text);
            border: 1px solid var(--border); padding: 12px 24px;
            border-radius: 10px; cursor: pointer; font-family: 'Outfit', sans-serif;
            font-size: 12px; font-weight: 600; text-transform: uppercase;
            transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-primary { background: var(--primary-gradient); color: white; border: none; box-shadow: 0 4px 20px var(--accent-glow); }
        .btn-primary:hover { transform: scale(1.02); box-shadow: 0 6px 25px var(--accent-glow); }
        .btn-sm { padding: 6px 12px; font-size: 11px; border-radius: 8px; }
        .btn-danger { color: #ff5555; border-color: rgba(255, 85, 85, 0.2); }
        .btn-danger:hover { background: rgba(255, 85, 85, 0.1); border-color: #ff5555; }

        .badge { font-size: 10px; padding: 2px 8px; border-radius: 12px; font-weight: bold; text-transform: uppercase; }
        .badge-active { background: rgba(0, 242, 254, 0.1); color: var(--success); border: 1px solid var(--success); }
        .badge-disabled { background: rgba(255, 62, 62, 0.1); color: var(--error); border: 1px solid var(--error); }

        /* Login Overlay */
        #login-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: var(--bg); z-index: 9999; display: flex; 
            align-items: center; justify-content: center;
        }
        #login-overlay .card { width: 420px; border-color: var(--accent); background: rgba(10, 10, 20, 0.95); box-shadow: 0 0 100px rgba(138, 79, 255, 0.1); }
    </style>
</head>
<body>

    <div id="login-overlay">
        <div class="card" style="text-align: center;">
            <div class="brand" style="font-size: 32px; margin-bottom: 10px; letter-spacing: 4px;">ASTRYXION API</div>
            <p style="color: var(--text-dim); font-size: 14px; margin-bottom: 30px;">Professional Esoteric Data Infrastructure</p>
            
            <form id="login-form" onsubmit="event.preventDefault(); doLogin();">
                <div class="input-wrap" style="text-align: left; margin-bottom: 20px;">
                    <label>Developer Email</label>
                    <input type="email" id="auth-email" placeholder="dev@universe.com" required autocomplete="email">
                </div>
                <div class="input-wrap" style="text-align: left; margin-bottom: 30px;">
                    <label>Security Key</label>
                    <div class="password-wrapper">
                        <input type="password" id="auth-pass" placeholder="••••••••" required autocomplete="current-password">
                        <button type="button" class="toggle-password" onclick="togglePassword('auth-pass')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                    </div>
                </div>
                
                <div style="display:flex; gap:15px;">
                    <button type="submit" class="btn btn-primary" style="flex:1;">Authenticate</button>
                    <button type="button" class="btn" style="flex:1;" onclick="doRegister()">Join Network</button>
                </div>
            </form>
            <div id="auth-error" style="color: var(--error); font-size: 12px; margin-top: 20px; min-height: 14px; font-weight: 600;"></div>
        </div>
    </div>

    <header class="header">
        <div class="brand">ASTRYXION API</div>
        <div class="user-nav">
            <span id="user-display">Checking session...</span>
            <a href="/features.html" class="btn btn-sm">Catalog</a>
            <button class="btn btn-sm" onclick="logout()">Logout</button>
        </div>
    </header>

    <div class="container">
        <div class="page-header">
            <h1>Developer <span>Portal</span></h1>
            <p>Orchestrate your keys, authorize domains, and experiment with the data grid.</p>
        </div>

        <div class="grid">
            <div class="main-content">
                
                <!-- API Keys Table -->
                <div class="section-title">🛡️ Identity & Access Tokens</div>
                <div class="card" style="padding-top: 20px;">
                    <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                         <p style="font-size: 13px; color: var(--text-dim);">Manage your active credentials for the ASTRYXION grid.</p>
                         <button class="btn btn-sm btn-primary" onclick="showCreateKey()">New Key</button>
                    </div>
                    
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Token Identifier (Hash)</th>
                                <th>Tier</th>
                                <th>Restriction</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="keys-body">
                            <tr><td colspan="5" style="text-align:center; padding: 40px; color: var(--text-dim);">Connect your session to view identity data.</td></tr>
                        </tbody>
                    </table>

                    <div id="new-key-feedback" class="api-key-result">
                        <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <span style="font-size: 12px; font-weight: 700; color: var(--accent);">NEW SECRECY TOKEN GENERATED</span>
                            <button class="btn btn-sm" onclick="copyKey('new-key-text')">Copy Secret</button>
                        </div>
                        <div class="key-display" id="new-key-text">...</div>
                        <p style="margin-top: 15px; font-size: 11px; color: var(--secondary);">⚠️ Make a copy now. We do not store plain secrets for your security.</p>
                    </div>
                </div>

                <!-- Sandbox Area -->
                <div class="section-title">🧪 Experiments Sandbox</div>
                <div class="card">
                    <div class="sandbox-controls">
                        <div class="input-wrap">
                            <label>Target Grid Endpoint</label>
                            <select id="sb-endpoint" onchange="updatePayloadHint()">
                                <option value="/numerology/complete">Numerology Complete</option>
                                <option value="/tarot/draw">Tarot Draw</option>
                                <option value="/runes/draw">Rune Casting</option>
                                <option value="/vedic/horoscope">Vedic Horoscope</option>
                                <option value="/natal/planets">Natal Positions</option>
                            </select>
                        </div>
                        <div class="input-wrap">
                            <label>Use Key</label>
                            <select id="sb-key-select">
                                <option value="">No keys available...</option>
                            </select>
                        </div>
                    </div>
                    <div class="input-wrap" style="margin-bottom: 20px;">
                        <label>Payload (JSON)</label>
                        <input type="text" id="sb-payload" style="font-family: 'Fira Code', monospace; text-transform: none;" placeholder='{"fullName":"Maria", "dateOfBirth":"1990-01-01"}'>
                    </div>

                    <div id="endpoint-info" style="background: rgba(138, 79, 255, 0.05); border: 1px dashed var(--border); border-radius: 12px; padding: 15px; margin-bottom: 20px; font-size: 11px;">
                        <span style="color:var(--accent); font-weight:700; display:block; margin-bottom:5px;">ENDPOINT INTELLIGENCE</span>
                        <div id="ep-desc" style="color: var(--text-dim);">Detailed calculation of Numerology charts based on Pythagorean algorithms.</div>
                        <div id="ep-url" style="color: var(--success); margin-top: 8px; font-family: 'Fira Code', monospace;">POST /api/v1/numerology/complete</div>
                    </div>

                    <div style="display:flex; gap:10px; margin-bottom: 20px;">
                        <button class="btn btn-primary" style="flex:2;" onclick="runSandbox()">Execute Request</button>
                        <button class="btn" style="flex:1;" onclick="copyCurl()">Copy cURL</button>
                    </div>
                    
                    <div class="sandbox-response" style="border-top-left-radius: 4px; border-top-right-radius: 4px;">
                        <div class="sandbox-label">Response Grid Output</div>
                        <div id="sb-response">// Session required for experimentation...</div>
                    </div>
                </div>

                <!-- Billing & Plans -->
                <div class="section-title">💳 Network Tiers</div>
                <div class="card">
                    <div class="tiers" id="tiers-container">
                        <p style="color: var(--text-dim); text-align: center; width: 100%; padding: 20px;">Authenticating network status...</p>
                    </div>
                    <button class="btn btn-sm" style="margin-top: 25px; width: 100%;" disabled>Upgrade Flow (Stripe Beta Coming Soon)</button>
                </div>

            </div>

            <div class="side-content">
                <div class="section-title">🌐 Universal Directive</div>
                <div class="card">
                    <p style="font-size: 11px; color: var(--text-dim); margin-bottom: 15px; line-height: 1.4;">
                        Define the default language for all ASTRYXION network transmissions. This value will be applied to all your keys unless a specific language is provided in the request.
                    </p>
                    <div class="input-wrap">
                        <select id="global-lang" onchange="saveSettings(this.value)">
                            <option value="en" style="background: var(--bg); color: white;">United States (EN)</option>
                            <option value="pt" style="background: var(--bg); color: white;">Brasil (PT)</option>
                            <option value="es" style="background: var(--bg); color: white;">España (ES)</option>
                            <option value="hi" style="background: var(--bg); color: white;">India (HI)</option>
                        </select>
                    </div>
                    <div id="settings-status" style="font-size: 10px; margin-top: 10px; min-height: 14px; transition: 0.3s; opacity: 0;">Synchronized with the grid...</div>
                </div>

                <div class="section-title">📊 Network Activity</div>
                <div class="card">
                    <div style="font-size: 32px; font-weight: 800; font-family: 'Outfit', sans-serif;" id="usage-val">--</div>
                    <p style="font-size: 12px; color: var(--text-dim);" id="usage-label">7-Day Grid Activity</p>
                    <div id="usage-chart" style="margin-top: 20px; height: 100px; display: flex; align-items: flex-end; gap: 8px;">
                        <!-- Rendered dynamically -->
                    </div>
                </div>

                <div class="section-title">📂 Integration Archive</div>
                <div class="card" style="font-size: 12px; line-height: 1.6;">
                    <div style="margin-bottom: 20px;">
                        <span style="color: var(--accent); font-weight: 800; display: block; margin-bottom: 5px;">🤖 AI AGENT SETUP (MCP)</span>
                        <p style="color: var(--text-dim); margin-bottom: 8px;">Connect Claude, Cursor or Zed directly to the grid.</p>
                        <code style="display: block; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; font-family: 'Fira Code', monospace; font-size: 10px; margin-bottom: 10px;">Endpoint: /api/mcp/list_tools</code>
                        <a href="https://modelcontextprotocol.io" target="_blank" style="color: var(--secondary); text-decoration: none;">View MCP Standard &rarr;</a>
                    </div>
                    
                    <div style="margin-bottom: 20px; border-top: 1px solid var(--border); padding-top: 15px;">
                        <span style="color: var(--accent); font-weight: 800; display: block; margin-bottom: 5px;">🧩 CHATGPT ACTIONS / CUSTOM GPTS</span>
                        <p style="color: var(--text-dim); margin-bottom: 8px;">Import the full spec into OpenAI to create a Custom GPT.</p>
                        <code style="display: block; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; font-family: 'Fira Code', monospace; font-size: 10px;">URL: /api/v1/openapi.json</code>
                    </div>

                    <div style="border-top: 1px solid var(--border); padding-top: 15px;">
                        <span style="color: var(--accent); font-weight: 800; display: block; margin-bottom: 5px;">🛠️ SDK GENERATION</span>
                        <p style="color: var(--text-dim); margin-bottom: 8px;">Generate a typed client in any language.</p>
                        <code style="display: block; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; font-family: 'Fira Code', monospace; font-size: 9px;">npx openapi-generator-cli generate -i [URL] -g typescript-axios</code>
                    </div>
                </div>

                <div class="section-title">📚 Resources</div>
                <div class="card">
                    <p style="font-size: 13px; color: var(--text-dim); margin-bottom: 15px;">Explore the full documentation grid.</p>
                    <a href="/docs" target="_blank" class="btn" style="width: 100%; margin-bottom: 10px;">Interactive Swagger UI</a>
                    <a href="/status" target="_blank" class="btn" style="width: 100%;">Grid Health Status</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <div id="key-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; align-items:center; justify-content:center;">
        <div class="card" style="width: 400px;">
            <h3 style="margin-bottom: 20px;">New Access Token</h3>
            <div class="input-wrap" style="margin-bottom: 20px;">
                <label>Authorized Domain (Optional)</label>
                <input type="text" id="new-key-domain" placeholder="example.com">
                <small style="color: var(--text-dim); font-size: 10px; margin-top: 5px; display: block;">Restrict usage to this domain only.</small>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn btn-primary" style="flex:1;" onclick="createKey()">Generate</button>
                <button class="btn" style="flex:1;" onclick="closeKeyModal()">Cancel</button>
            </div>
        </div>
    </div>

    <div id="edit-key-modal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; align-items:center; justify-content:center;">
        <div class="card" style="width: 400px;">
            <h3 style="margin-bottom: 20px;">Edit Token Restrictions</h3>
            <input type="hidden" id="edit-key-hash">
            <div class="input-wrap" style="margin-bottom: 20px;">
                <label>Authorized Domain (Optional)</label>
                <input type="text" id="edit-key-domain" placeholder="example.com">
                <small style="color: var(--text-dim); font-size: 10px; margin-top: 5px; display: block;">Restrict usage to this domain only. Leave blank to allow all.</small>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn btn-primary" style="flex:1;" onclick="submitEditKey()">Save Rules</button>
                <button class="btn" style="flex:1;" onclick="closeEditKeyModal()">Cancel</button>
            </div>
        </div>
    </div>

    <script>
        let sessionToken = localStorage.getItem("astro_session_token");
        let availableTiers = [];

        async function init() {
            if (!sessionToken) {
                document.getElementById("login-overlay").style.display = "flex";
                document.getElementById("user-display").textContent = "Not Authenticated";
                return;
            }
            const user = await checkSession();
            if (user) {
                updatePayloadHint(); // Populate sandbox info early
                await Promise.all([
                    fetchUsage().catch(e => console.error("Usage fetch failed", e)),
                    fetchTiers().catch(e => console.error("Tiers fetch failed", e)),
                    fetchKeys().catch(e => console.error("Keys fetch failed", e))
                ]);
            } else {
                console.warn("[Portal] Session check failed.");
            }
        }
        init();

        async function checkSession() {
            try {
                const res = await fetch('/api/v1/users/me', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
                if (res.ok) {
                    const user = await res.json();
                    document.getElementById("user-display").textContent = user.email;
                    if (localStorage.getItem('astryxion_lang')) {
                        document.getElementById('global-lang').value = localStorage.getItem('astryxion_lang');
                    }
                    document.getElementById("login-overlay").style.display = "none";
                    return user;
                } else { 
                    localStorage.removeItem("astro_session_token");
                    location.reload(); 
                }
            } catch (e) { return null; }
        }

        async function fetchTiers() {
            try {
                const res = await fetch('/api/v1/portal/tiers', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
                if (!res.ok) return;
                const data = await res.json();
                availableTiers = data.tiers;
                renderTiers(data.tiers);
            } catch (e) { }
        }

        function renderTiers(tiers) {
            const container = document.getElementById('tiers-container');
            if (!tiers || tiers.length === 0) {
                container.innerHTML = '<p style="padding:20px;color:var(--text-dim);text-align:center;">No subscription plans are listed right now. Contact support for access options.</p>';
                return;
            }
            var highlightId = tiers.some(function(t) { return t.id === 'free'; }) ? 'free' : tiers[0].id;
            container.innerHTML = tiers.map(function(t) {
                return '<div class="tier-card ' + (t.id === highlightId ? "active" : "") + '">' +
                    '<div class="tier-name">' + t.displayName + '</div>' +
                    '<div class="tier-price">' + t.price + '</div>' +
                    '<ul class="tier-features">' +
                        '<li>' + t.requestsPerDay.toLocaleString() + ' requests / day</li>' +
                        t.features.map(function(f) { return '<li>' + f + '</li>'; }).join('') +
                    '</ul>' +
                '</div>';
            }).join('');
        }

        async function fetchKeys() {
            try {
                const res = await fetch('/api/v1/portal/keys', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
                if (!res.ok) return;
                const data = await res.json();
                renderKeys(data.keys);
                populateSandboxKeys(data.keys);
            } catch (e) { }
        }

        function renderKeys(keys) {
            const body = document.getElementById('keys-body');
            if (keys.length === 0) {
                body.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px;">No keys found. Create one to start.</td></tr>';
                return;
            }
            body.innerHTML = keys.map(k => {
                return '<tr>' +
                    '<td><code style="color:var(--text-dim)">' + k.hash.substring(0, 12) + '...</code></td>' +
                    '<td><span class="badge" style="background:rgba(138,79,255,0.1); color:var(--accent)">' + k.tier + '</span></td>' +
                    '<td>' + (k.authorizedDomains.length ? '<code style="font-size:11px">' + k.authorizedDomains[0] + '</code>' : '<span style="opacity:0.3">None</span>') + '</td>' +
                    '<td><span class="badge ' + (k.status === "active" ? "badge-active" : "badge-disabled") + '">' + k.status + '</span></td>' +
                    '<td>' +
                        '<button class="btn btn-sm" style="margin-right: 5px;" onclick="showEditKey(\\'' + k.hash + '\\', \\'' + (k.authorizedDomains[0] || '') + '\\')">Edit</button>' +
                        '<button class="btn btn-sm btn-danger" onclick="deleteKey(\\'' + k.hash + '\\')">Delete</button>' +
                    '</td>' +
                '</tr>';
            }).join('');
        }

        function populateSandboxKeys(keys) {
            const select = document.getElementById('sb-key-select');
            const activeKeys = keys.filter(k => k.status === 'active');
            if (activeKeys.length === 0) {
                select.innerHTML = '<option value="">No active secrets</option>';
                return;
            }
            select.innerHTML = activeKeys.map(k => '<option value="' + k.hash + '">' + k.hash.substring(0,8) + '... (Hash)</option>').join('');
            select.innerHTML += '<option value="manual">+ Use manual secret...</option>';
        }

        async function fetchUsage() {
            try {
                const res = await fetch('/api/v1/portal/usage', { headers: { 'Authorization': 'Bearer ' + sessionToken } });
                if (!res.ok) return;
                const data = await res.json();
                document.getElementById('usage-val').textContent = data.today;
                
                const chart = document.getElementById('usage-chart');
                const history = Array.isArray(data.history) ? data.history.map(Number) : [0];
                const max = Math.max(...history, 1);
                chart.innerHTML = history.map(h => {
                    const pct = (h / max) * 100;
                    return '<div style="flex:1; height:' + pct + '%; background:var(--accent); opacity:0.3; border-radius:4px; transition: 0.5s;" title="' + h + ' hits"></div>';
                }).join('');
            } catch (e) { console.error("Error rendering usage chart", e); }
        }

        function showCreateKey() { document.getElementById('key-modal').style.display = 'flex'; }
        function closeKeyModal() { document.getElementById('key-modal').style.display = 'none'; }

        async function createKey() {
            const domain = document.getElementById('new-key-domain').value;
            try {
                const res = await fetch('/api/v1/portal/keys', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionToken },
                    body: JSON.stringify({ domain })
                });
                const data = await res.json();
                if (res.ok && data.ok) {
                    closeKeyModal();
                    await fetchKeys();
                    
                    const feedback = document.getElementById('new-key-feedback');
                    const text = document.getElementById('new-key-text');
                    text.textContent = data.apiKey;
                    feedback.style.display = 'block';
                    window.lastSecret = data.apiKey; 
                } else {
                    alert("Grid Rejection: " + (data.error?.message || "Token generation failed. Check domain constraints."));
                }
            } catch (e) { alert("Matrix Paradox: Could not reach the grid service."); }
        }

        async function deleteKey(hash) {
            if (!confirm("Are you sure? This token will be permanently revoked.")) return;
            try {
                await fetch('/api/v1/portal/keys/' + hash, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer ' + sessionToken }
                });
                await fetchKeys();
            } catch (e) { }
        }

        function updatePayloadHint() {
            const ep = document.getElementById('sb-endpoint').value;
            const input = document.getElementById('sb-payload');
            const desc = document.getElementById('ep-desc');
            const url = document.getElementById('ep-url');

            const metadata = {
                "/numerology/complete": {
                    hint: '{"fullName":"Maria Silva", "dateOfBirth":"1990-05-15"}',
                    desc: "Comprehensive Pythagorean numerology analysis including Destiny, Soul, and Personality numbers.",
                    url: "POST /api/v1/numerology/complete"
                },
                "/tarot/draw": {
                    hint: '{"question":"Will I thrive?", "spread":"single"}',
                    desc: "Direct access to the Major and Minor Arcana. Supports multiple spreads and mystical interpretation.",
                    url: "POST /api/v1/tarot/draw"
                },
                "/runes/draw": {
                    hint: '{"question":"What to expect?", "count":1}',
                    desc: "Ancient Elder Futhark rune casting. Provides symbolic guidance and elemental associations.",
                    url: "POST /api/v1/runes/draw"
                },
                "/vedic/horoscope": {
                    hint: '{"nakshatra":"ashwini", "period":"daily"}',
                    desc: "Vedic (Jyotish) planetary calculations based on Nakshatras and current Moon transitions.",
                    url: "POST /api/v1/vedic/horoscope"
                },
                "/natal/planets": {
                    hint: '{"date":"1990-01-01", "timeUtc":"12:00:00", "latitude":-23.55, "longitude":-46.63}',
                    desc: "Precise astronomical ephemeris computing the exact positions of celestial bodies at birth.",
                    url: "POST /api/v1/natal/planets"
                }
            };

            const data = metadata[ep] || { hint: "{}", desc: "Execute custom endpoint request.", url: "POST /api/v1" + ep };
            input.value = data.hint;
            desc.textContent = data.desc;
            url.textContent = data.url;
        }

        function showEditKey(hash, domain) {
            document.getElementById('edit-key-hash').value = hash;
            document.getElementById('edit-key-domain').value = domain;
            document.getElementById('edit-key-modal').style.display = 'flex';
        }
        function closeEditKeyModal() {
            document.getElementById('edit-key-modal').style.display = 'none';
        }

        async function submitEditKey() {
            const hash = document.getElementById('edit-key-hash').value;
            const domain = document.getElementById('edit-key-domain').value;
            try {
                const res = await fetch('/api/v1/portal/keys/' + hash, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionToken },
                    body: JSON.stringify({ domain })
                });
                if (res.ok) {
                    closeEditKeyModal();
                    await fetchKeys();
                } else {
                    alert("Failed to update key restrictions.");
                }
            } catch (e) {
                alert("Network error."); 
            }
        }

        function copyCurl() {
            const ep = document.getElementById('sb-endpoint').value;
            const payloadRaw = document.getElementById('sb-payload').value;
            let key = window.lastSecret || "ask_YOUR_SECRET_KEY";
            if (document.getElementById('sb-key-select').value === "internal") {
                key = "ask_... (Hidden Hash)";
            }
            const curl = "curl -X POST https://api.astryxion.com/api/v1" + ep + "\\n" +
                         "  -H \\"Content-Type: application/json\\"\\n" +
                         "  -H \\"Authorization: Bearer " + key + "\\"\\n" +
                         "  -d '" + payloadRaw + "'";
            navigator.clipboard.writeText(curl);
            alert("cURL command copied to clipboard!");
        }

        function highlightJson(json) {
            if (typeof json != 'string') {
                json = JSON.stringify(json, undefined, 2);
            }
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'color: #fca5a5;'; // string
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'color: var(--accent); font-weight: bold;'; // key
                    } else {
                        cls = 'color: #86efac;'; // string
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'color: var(--secondary);'; // boolean
                } else if (/null/.test(match)) {
                    cls = 'color: #9ca3af;'; // null
                } else {
                    cls = 'color: #60a5fa;'; // number
                }
                return "<span style='" + cls + "'>" + match + "</span>";
            });
        }

        async function runSandbox() {
            const ep = document.getElementById('sb-endpoint').value;
            const payloadRaw = document.getElementById('sb-payload').value;
            const keySelect = document.getElementById('sb-key-select').value;
            const output = document.getElementById('sb-response');
            
            let key = window.lastSecret || "";
            let useProxy = false;

            if (keySelect === "manual") {
                if (!key) {
                    key = prompt("Please enter your API Secret Key (the 'ask_...' token):");
                }
                if (!key) return;
            } else if (keySelect) {
                useProxy = true;
            } else {
                alert("Please select or create an API Key first.");
                return;
            }

            output.innerHTML = "<span style='color:var(--text-dim)'>// Initiating grid request...<br>// Mode: " + (useProxy ? "Secure Proxy" : "Direct Client") + "<br>// Endpoint: " + ep + "</span>";
            
            try {
                let parsedBody = {};
                const lang = document.getElementById('global-lang').value;
                try {
                    parsedBody = JSON.parse(payloadRaw);
                    if (!parsedBody.lang) parsedBody.lang = lang;
                } catch (e) { /* fallback to empty if invalid json */ }

                let res, data;

                if (useProxy) {
                    res = await fetch('/api/v1/portal/sandbox/proxy', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + sessionToken
                        },
                        body: JSON.stringify({
                            endpoint: ep,
                            body: parsedBody,
                            keyHash: keySelect
                        })
                    });
                } else {
                    res = await fetch('/api/v1' + ep, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + key
                        },
                        body: JSON.stringify(parsedBody)
                    });
                }

                data = await res.json();
                const statusColor = res.ok ? 'var(--success)' : 'var(--error)';
                
                output.innerHTML = "<span style='color:" + statusColor + "; font-weight:bold'>// STATUS: " + res.status + " " + res.statusText + "</span><br>" + 
                                   "<span style='color:var(--text-dim)'>// TIMESTAMP: " + new Date().toISOString() + "</span><br><br>" + 
                                   highlightJson(data);
            } catch (e) {
                output.innerHTML = "<span style='color:var(--error)'>// GRID ERROR: " + e.message + "</span>";
            }
        }

        async function saveSettings(lang) {
            localStorage.setItem('astryxion_lang', lang);
            const status = document.getElementById('settings-status');
            status.style.opacity = "1";
            status.textContent = "Sincronizando preferências...";
            status.style.color = "var(--accent)";
            
            try {
                const res = await fetch('/api/v1/portal/settings', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionToken },
                    body: JSON.stringify({ lang })
                });
                if (res.ok) {
                    status.textContent = "Preferências sincronizadas.";
                    status.style.color = "var(--success)";
                    setTimeout(() => status.style.opacity = "0", 3000);
                } else {
                    status.textContent = "Erro na sincronização.";
                    status.style.color = "var(--error)";
                }
            } catch (e) {
                status.textContent = "Erro de conexão.";
                status.style.color = "var(--error)";
            }
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

        async function doLogin() {
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-pass").value;
            const err = document.getElementById("auth-error");
            if (!email || !password) return;

            err.textContent = "Negotiating handshake...";
            try {
                const res = await fetch('/api/v1/users/login', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                });
                const data = await res.json();
                if (res.ok && data.session) {
                    sessionToken = data.session.token;
                    localStorage.setItem("astro_session_token", sessionToken);
                    location.reload();
                } else { err.textContent = data.message || "Credential rejection"; }
            } catch(e) { err.textContent = "Grid network failure"; }
        }

        async function doRegister() {
            const email = document.getElementById("auth-email").value;
            const password = document.getElementById("auth-pass").value;
            const err = document.getElementById("auth-error");
            if (!email || !password) {
                err.textContent = "Email and Password are required.";
                return;
            }
            err.textContent = "Registering new identity...";
            try {
                const res = await fetch('/api/v1/users/register', {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password})
                });
                const data = await res.json();
                if (res.ok && data.session) {
                    sessionToken = data.session.token;
                    localStorage.setItem("astro_session_token", sessionToken);
                    location.reload();
                } else { err.textContent = data.message || "Registration failed"; }
            } catch(e) { err.textContent = "Grid network failure"; }
        }

        function logout() {
            localStorage.removeItem("astro_session_token");
            location.reload();
        }

        function copyKey(id) {
            const text = document.getElementById(id).textContent;
            navigator.clipboard.writeText(text);
            alert("Secret key copied. Keep it safe!");
        }
    </script>
</body>
</html>`;
}
