// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal-up');

const revealOnScroll = () => {
    revealElements.forEach(el => {
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
