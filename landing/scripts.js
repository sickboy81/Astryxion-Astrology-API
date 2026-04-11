// Scroll Reveal Animation (query each time so dynamically added cards work)
const revealOnScroll = () => {
    document.querySelectorAll('.reveal-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < (window.innerHeight - 100);
        if (isVisible) {
            el.classList.add('active');
        }
    });
};

// Initial check
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Navbar background
const header = document.querySelector('.main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '0.8rem 0';
        header.style.background = 'rgba(10, 10, 12, 0.95)';
    } else {
        header.style.padding = '1.5rem 0';
        header.style.background = 'transparent';
    }
});

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

// Code Snippet Injection with Smart URL Detection
const updateCodeSnippet = () => {
    const codeElement = document.querySelector('.code-preview pre');
    if (!codeElement) return;

    const baseUrl = window.API_BASE || 'https://api.vortexastro.com'; // Fallback to prod domain
    const snippetHtml = `
<span class="comment">// 1. Authenticaton</span>
<span class="keyword">const</span> headers = { <span class="string">'Authorization'</span>: <span class="string">'Bearer YOUR_KEY'</span> };

<span class="comment">// 2. Multi-Engine Request</span>
<span class="keyword">const</span> response = <span class="keyword">await</span> fetch(<span class="string">'${baseUrl}/api/v1/horoscope/aries'</span>, { headers });
<span class="keyword">const</span> data = <span class="keyword">await</span> response.json();

<span class="comment">// 3. Vedic High-Precision (Vimshottari Dasha)</span>
<span class="keyword">const</span> vedic = <span class="keyword">await</span> fetch(<span class="string">'${baseUrl}/api/v1/vedic-complete'</span>, {
  method: <span class="string">'POST'</span>,
  body: JSON.stringify({ date: <span class="string">'1990-05-15'</span>, ... })
});`;
    
    codeElement.innerHTML = snippetHtml.trim();
};

// Initial Call
document.addEventListener('DOMContentLoaded', updateCodeSnippet);

function applyLocalDevApiLinks(root) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (!isLocal || !window.API_BASE) return;
    root.querySelectorAll('a.api-link[href^="/"]').forEach((link) => {
        link.href = window.API_BASE + link.getAttribute('href');
    });
}

async function loadLandingPricing() {
    const root = document.getElementById('landing-pricing-grid');
    if (!root) return;

    const base = window.API_BASE || '';
    const url = `${base}/api/v1/system/config`;

    try {
        const res = await fetch(url, { credentials: 'omit' });
        if (!res.ok) throw new Error('config ' + res.status);
        const data = await res.json();
        const tiers = Array.isArray(data.tiers) ? data.tiers : [];
        if (tiers.length === 0) {
            root.innerHTML =
                '<p class="text-center" style="grid-column:1/-1;color:var(--text-muted);">No plans are published yet. Open the <a href="/portal" class="api-link">Developer Portal</a> or contact us.</p>';
            applyLocalDevApiLinks(root);
            return;
        }

        root.replaceChildren();

        tiers.forEach((tier) => {
            const card = document.createElement('div');
            card.className = 'price-card reveal-up';

            if (tier.id === 'mercury') {
                const badge = document.createElement('div');
                badge.className = 'popular-badge';
                badge.textContent = 'MOST POPULAR';
                card.appendChild(badge);
            }

            const h3 = document.createElement('h3');
            h3.textContent = tier.displayName || tier.id;
            card.appendChild(h3);

            const priceDiv = document.createElement('div');
            priceDiv.className = 'price';
            priceDiv.textContent = tier.price || '';
            card.appendChild(priceDiv);

            const ul = document.createElement('ul');
            const feat = Array.isArray(tier.features) ? tier.features : [];
            if (feat.length > 0) {
                feat.forEach((line) => {
                    const li = document.createElement('li');
                    li.textContent = line;
                    ul.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                const n = typeof tier.requestsPerDay === 'number' ? tier.requestsPerDay : Number(tier.requestsPerDay);
                li.textContent = 'Up to ' + (Number.isFinite(n) ? n.toLocaleString() : String(tier.requestsPerDay)) + ' requests per day';
                ul.appendChild(li);
            }
            card.appendChild(ul);

            const a = document.createElement('a');
            a.href = '/portal';
            a.classList.add('api-link');
            if (tier.id === 'free') {
                a.classList.add('btn', 'btn-outline');
                a.textContent = 'Create Account';
            } else if (tier.id === 'saturn') {
                a.classList.add('btn', 'btn-outline');
                a.textContent = 'Contact Us';
            } else {
                a.classList.add('btn', 'btn-primary');
                a.textContent = 'Get Started';
            }
            card.appendChild(a);
            root.appendChild(card);
        });

        applyLocalDevApiLinks(root);
        revealOnScroll();
    } catch {
        root.innerHTML =
            '<p class="text-center" style="grid-column:1/-1;color:var(--text-muted);">Plans are temporarily unavailable. Open the <a href="/portal" class="api-link">Developer Portal</a> to sign up.</p>';
        applyLocalDevApiLinks(root);
    }
}

document.addEventListener('DOMContentLoaded', loadLandingPricing);

// Tab Switching Logic
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panels
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        // Add active class to current button
        btn.classList.add('active');

        // Show corresponding panel
        const tabId = btn.getAttribute('data-tab');
        const panel = document.getElementById(tabId);
        if (panel) {
            panel.classList.add('active');
            // Trigger reveal-up again for new content if needed
            revealOnScroll();
        }
    });
});

// End of script
