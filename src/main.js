const API = 'https://conference-tracker-production.up.railway.app';

// ── Internal access flag ──────────────────────────────────────
// Visit /internal to permanently unlock the Users nav on this browser
function isInternal() { return localStorage.getItem('ct_internal') === '1'; }

// ── Auth helpers ──────────────────────────────────────────────
function getToken() { return localStorage.getItem('ct_token'); }
function setToken(t) { localStorage.setItem('ct_token', t); }
function clearToken() { localStorage.removeItem('ct_token'); }

async function fetchMe(token) {
    const res = await fetch(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
}

// ── Shared Header ─────────────────────────────────────────────
class SharedHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <header>
        <div class="header-content">
            <a href="./index.html" class="brand">Yanzhi Wang</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./news.html">News</a></li>
                    <li><a href="./publications.html">Publications</a></li>
                    <li><a href="./teaching.html">Teaching</a></li>
                    <li><a href="./students.html">Students</a></li>
                    <li><a href="./opensource.html">Open Source</a></li>
                    <li><a href="./CV.pdf" target="_blank">CV</a></li>
                    ${isInternal() || getToken() ? '<li><a href="#" id="users-nav-link">Users</a></li>' : ''}
                </ul>
            </nav>
        </div>
    </header>
        `;
        this.highlightActiveLink();
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('users-nav-link')?.addEventListener('click', e => {
                e.preventDefault();
                openAuthModal();
            });
        });
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const navLinks = this.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            const filename = currentPath.split('/').pop() || 'index.html';
            const cleanHref = linkHref.replace('./', '').split('?')[0];
            if (cleanHref === filename) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// ── Shared Footer ─────────────────────────────────────────────
class SharedFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p>&copy; 2025 Yanzhi Wang</p>
        </footer>
        `;
    }
}

customElements.define('shared-header', SharedHeader);
customElements.define('shared-footer', SharedFooter);

// ── Auth Modal ────────────────────────────────────────────────
function buildModal() {
    if (document.getElementById('ct-auth-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'ct-auth-modal';
    overlay.style.cssText = `
        display:none; position:fixed; inset:0; z-index:9999;
        background:rgba(0,0,0,0.45); align-items:center; justify-content:center;
    `;
    overlay.innerHTML = `
        <div id="ct-auth-box" style="
            background:#fff; border-radius:8px; width:380px; max-width:90vw;
            overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.2);
        ">
            <div id="ct-auth-tabs" style="display:flex; border-bottom:1px solid #e2e8f0;">
                <button data-tab="login" style="
                    flex:1; padding:0.9rem; border:none; background:none; cursor:pointer;
                    font-size:0.95rem; font-weight:600; color:#3b82f6;
                    border-bottom:2px solid #3b82f6;
                " id="ct-tab-login">Sign In</button>
                <button data-tab="register" style="
                    flex:1; padding:0.9rem; border:none; background:none; cursor:pointer;
                    font-size:0.95rem; font-weight:600; color:#64748b; border-bottom:2px solid transparent;
                " id="ct-tab-register">Register</button>
            </div>

            <div id="ct-pending-msg" style="display:none; padding:1.5rem; text-align:center;">
                <p style="color:#166534; font-weight:600; margin-bottom:0.5rem;">Registration received!</p>
                <p id="ct-pending-text" style="color:#444; font-size:0.9rem;"></p>
                <button id="ct-pending-close" style="
                    margin-top:1rem; padding:0.5rem 1.2rem; background:#3b82f6;
                    color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:0.9rem;
                ">Close</button>
            </div>

            <form id="ct-auth-form" style="padding:1.25rem 1.5rem 1.5rem;">
                <div style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.875rem; margin-bottom:0.4rem; color:#374151;">Email</label>
                    <input id="ct-email" type="email" required placeholder="you@example.com" style="
                        width:100%; padding:0.6rem 0.75rem; border:1px solid #d1d5db;
                        border-radius:6px; font-size:0.95rem; box-sizing:border-box;
                    ">
                </div>
                <div style="margin-bottom:1rem;">
                    <label style="display:block; font-size:0.875rem; margin-bottom:0.4rem; color:#374151;">Password</label>
                    <input id="ct-password" type="password" required placeholder="" style="
                        width:100%; padding:0.6rem 0.75rem; border:1px solid #d1d5db;
                        border-radius:6px; font-size:0.95rem; box-sizing:border-box;
                    ">
                </div>
                <p id="ct-auth-error" style="display:none; color:#991b1b; font-size:0.875rem; margin-bottom:0.75rem;"></p>
                <div style="display:flex; gap:0.5rem;">
                    <button type="submit" id="ct-auth-submit" style="
                        flex:1; padding:0.65rem; background:#3b82f6; color:#fff;
                        border:none; border-radius:6px; cursor:pointer; font-size:0.95rem; font-weight:600;
                    ">Sign In</button>
                    <button type="button" id="ct-auth-cancel" style="
                        padding:0.65rem 1rem; background:#f1f5f9; color:#374151;
                        border:none; border-radius:6px; cursor:pointer; font-size:0.95rem;
                    ">Cancel</button>
                </div>
            </form>

            <div id="ct-logged-in" style="display:none; padding:1.5rem; text-align:center;">
                <p id="ct-logged-email" style="font-weight:600; margin-bottom:1rem; color:#1e293b;"></p>
                <button id="ct-logout-btn" style="
                    padding:0.5rem 1.2rem; background:#ef4444; color:#fff;
                    border:none; border-radius:6px; cursor:pointer; font-size:0.9rem;
                ">Sign Out</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    let currentTab = 'login';

    function switchTab(tab) {
        currentTab = tab;
        const loginBtn = document.getElementById('ct-tab-login');
        const regBtn = document.getElementById('ct-tab-register');
        const submit = document.getElementById('ct-auth-submit');
        const pw = document.getElementById('ct-password');
        if (tab === 'login') {
            loginBtn.style.color = '#3b82f6'; loginBtn.style.borderBottomColor = '#3b82f6';
            regBtn.style.color = '#64748b'; regBtn.style.borderBottomColor = 'transparent';
            submit.textContent = 'Sign In';
            pw.placeholder = '';
        } else {
            regBtn.style.color = '#3b82f6'; regBtn.style.borderBottomColor = '#3b82f6';
            loginBtn.style.color = '#64748b'; loginBtn.style.borderBottomColor = 'transparent';
            submit.textContent = 'Create Account';
            pw.placeholder = 'At least 6 characters';
        }
        document.getElementById('ct-auth-error').style.display = 'none';
    }

    document.getElementById('ct-tab-login').addEventListener('click', () => switchTab('login'));
    document.getElementById('ct-tab-register').addEventListener('click', () => switchTab('register'));

    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.getElementById('ct-auth-cancel').addEventListener('click', closeModal);
    document.getElementById('ct-pending-close').addEventListener('click', closeModal);
    document.getElementById('ct-logout-btn').addEventListener('click', () => {
        clearToken();
        updateSidebarLink(null);
        updateUsersNav(null);
        closeModal();
    });

    document.getElementById('ct-auth-form').addEventListener('submit', async e => {
        e.preventDefault();
        const email = document.getElementById('ct-email').value;
        const password = document.getElementById('ct-password').value;
        const errEl = document.getElementById('ct-auth-error');
        const submit = document.getElementById('ct-auth-submit');
        errEl.style.display = 'none';
        submit.disabled = true;
        submit.textContent = 'Please wait...';
        try {
            const endpoint = currentTab === 'login' ? '/api/auth/login' : '/api/auth/register';
            const res = await fetch(`${API}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                errEl.textContent = data.error || 'Something went wrong.';
                errEl.style.display = 'block';
            } else if (data.pending) {
                document.getElementById('ct-auth-form').style.display = 'none';
                document.getElementById('ct-auth-tabs').style.display = 'none';
                document.getElementById('ct-pending-text').textContent = data.message;
                document.getElementById('ct-pending-msg').style.display = 'block';
            } else {
                setToken(data.token);
                updateSidebarLink(data.user);
                updateUsersNav(data.user);
                closeModal();
            }
        } catch {
            errEl.textContent = 'Network error. Please try again.';
            errEl.style.display = 'block';
        } finally {
            submit.disabled = false;
            switchTab(currentTab);
        }
    });
}

function openAuthModal() {
    const overlay = document.getElementById('ct-auth-modal');
    if (!overlay) return;
    const token = getToken();
    const form = document.getElementById('ct-auth-form');
    const loggedIn = document.getElementById('ct-logged-in');
    const tabs = document.getElementById('ct-auth-tabs');
    const pending = document.getElementById('ct-pending-msg');

    // Reset state
    form.style.display = '';
    loggedIn.style.display = 'none';
    pending.style.display = 'none';
    tabs.style.display = '';
    document.getElementById('ct-auth-error').style.display = 'none';
    document.getElementById('ct-email').value = '';
    document.getElementById('ct-password').value = '';

    if (token) {
        fetchMe(token).then(user => {
            if (user) {
                document.getElementById('ct-logged-email').textContent = user.email;
                form.style.display = 'none';
                tabs.style.display = 'none';
                loggedIn.style.display = 'block';
            }
        });
    }

    overlay.style.display = 'flex';
}

function closeModal() {
    const overlay = document.getElementById('ct-auth-modal');
    if (overlay) overlay.style.display = 'none';
}

// ── Sidebar links (Conference Tracker + News Management + PR Tool) ───────────────
let sidebarLink = null;
let sidebarNewsLink = null;
let sidebarPRLink = null;

function makeSidebarLink(href, text, marginTop) {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = text;
    a.style.cssText = `
        display: block;
        margin-top: ${marginTop};
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        color: #444;
        text-decoration: none;
        border-left: 3px solid #ccc;
        background: #f5f5f5;
        border-radius: 0 4px 4px 0;
        transition: background 0.2s, color 0.2s;
    `;
    a.addEventListener('mouseenter', () => {
        a.style.background = '#e8e8e8';
        a.style.color = '#1d4ed8';
        a.style.textDecoration = 'underline';
    });
    a.addEventListener('mouseleave', () => {
        a.style.background = '#f5f5f5';
        a.style.color = '#444';
        a.style.textDecoration = 'none';
    });
    return a;
}

function updateSidebarLink(user) {
    const logo = document.getElementById('embodyx-sidebar-logo') || document.querySelector('.university-logo');
    if (!logo) return;
    if (user) {
        const isAdminOrOwner = user.role === 'admin' || user.role === 'owner';
        // Order: PR Tool → Conference Tracker → News Management
        if (isAdminOrOwner && !sidebarPRLink) {
            sidebarPRLink = makeSidebarLink('/conferences/#pr-matrix', 'PR Tool', '2rem');
            logo.insertAdjacentElement('afterend', sidebarPRLink);
        } else if (!isAdminOrOwner && sidebarPRLink) {
            sidebarPRLink.remove();
            sidebarPRLink = null;
        }
        if (!sidebarLink) {
            sidebarLink = makeSidebarLink('/conferences/', 'Conference Tracker', '0.5rem');
            (sidebarPRLink || logo).insertAdjacentElement('afterend', sidebarLink);
        }
        if (isAdminOrOwner && !sidebarNewsLink) {
            sidebarNewsLink = makeSidebarLink('/conferences/#news', 'News Management', '0.5rem');
            sidebarLink.insertAdjacentElement('afterend', sidebarNewsLink);
        } else if (!isAdminOrOwner && sidebarNewsLink) {
            sidebarNewsLink.remove();
            sidebarNewsLink = null;
        }
    } else {
        if (sidebarLink) { sidebarLink.remove(); sidebarLink = null; }
        if (sidebarNewsLink) { sidebarNewsLink.remove(); sidebarNewsLink = null; }
        if (sidebarPRLink) { sidebarPRLink.remove(); sidebarPRLink = null; }
    }
}

function updateUsersNav(user) {
    const nav = document.querySelector('.nav-links');
    let link = document.getElementById('users-nav-link');
    // If logging in and the link doesn't exist yet, inject it
    if (user && !link && nav) {
        const li = document.createElement('li');
        li.innerHTML = '<a href="#" id="users-nav-link">Users</a>';
        nav.appendChild(li);
        link = document.getElementById('users-nav-link');
        link.addEventListener('click', e => { e.preventDefault(); openAuthModal(); });
    }
    if (!link) return;
    link.textContent = user ? `${user.email.split('@')[0]} ▾` : 'Users';
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    buildModal();

    // Attach Users nav click (header may render after DOMContentLoaded via custom element)
    setTimeout(() => {
        document.getElementById('users-nav-link')?.addEventListener('click', e => {
            e.preventDefault();
            openAuthModal();
        });
    }, 0);

    // Check existing session
    const token = getToken();
    if (token) {
        const user = await fetchMe(token);
        if (user) {
            updateSidebarLink(user);
            updateUsersNav(user);
        } else {
            clearToken();
        }
    }
});
