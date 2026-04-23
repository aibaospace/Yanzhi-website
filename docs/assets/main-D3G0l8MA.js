(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const E="https://conference-tracker-production.up.railway.app";function I(){return localStorage.getItem("ct_internal")==="1"}function y(){return localStorage.getItem("ct_token")}function B(n){localStorage.setItem("ct_token",n)}function k(){localStorage.removeItem("ct_token")}async function x(n){const e=await fetch(`${E}/api/auth/me`,{headers:{Authorization:`Bearer ${n}`}});return e.ok?e.json():null}class w extends HTMLElement{connectedCallback(){this.innerHTML=`
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
                    ${I()||y()?'<li><a href="#" id="users-nav-link">Users</a></li>':""}
                </ul>
            </nav>
        </div>
    </header>
        `,this.highlightActiveLink(),document.addEventListener("DOMContentLoaded",()=>{var e;(e=document.getElementById("users-nav-link"))==null||e.addEventListener("click",r=>{r.preventDefault(),b()})})}highlightActiveLink(){const e=window.location.pathname;this.querySelectorAll(".nav-links a").forEach(t=>{const o=t.getAttribute("href"),i=e.split("/").pop()||"index.html";o.replace("./","").split("?")[0]===i?t.classList.add("active"):t.classList.remove("active")})}}class L extends HTMLElement{connectedCallback(){this.innerHTML=`
        <footer>
            <p>&copy; 2025 Yanzhi Wang</p>
        </footer>
        `}}customElements.define("shared-header",w);customElements.define("shared-footer",L);function C(){if(document.getElementById("ct-auth-modal"))return;const n=document.createElement("div");n.id="ct-auth-modal",n.style.cssText=`
        display:none; position:fixed; inset:0; z-index:9999;
        background:rgba(0,0,0,0.45); align-items:center; justify-content:center;
    `,n.innerHTML=`
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
                <a id="ct-admin-btn" href="/internal/pr-tool.html" style="
                    display:none; margin-bottom:0.5rem;
                    padding:0.5rem 1.2rem; background:#1e293b; color:#fff;
                    border:none; border-radius:6px; cursor:pointer; font-size:0.9rem;
                    text-decoration:none; font-weight:600;
                ">Admin Panel</a>
                <button id="ct-logout-btn" style="
                    padding:0.5rem 1.2rem; background:#ef4444; color:#fff;
                    border:none; border-radius:6px; cursor:pointer; font-size:0.9rem;
                ">Sign Out</button>
            </div>
        </div>
    `,document.body.appendChild(n);let e="login";function r(t){e=t;const o=document.getElementById("ct-tab-login"),i=document.getElementById("ct-tab-register"),l=document.getElementById("ct-auth-submit"),a=document.getElementById("ct-password");t==="login"?(o.style.color="#3b82f6",o.style.borderBottomColor="#3b82f6",i.style.color="#64748b",i.style.borderBottomColor="transparent",l.textContent="Sign In",a.placeholder=""):(i.style.color="#3b82f6",i.style.borderBottomColor="#3b82f6",o.style.color="#64748b",o.style.borderBottomColor="transparent",l.textContent="Create Account",a.placeholder="At least 6 characters"),document.getElementById("ct-auth-error").style.display="none"}document.getElementById("ct-tab-login").addEventListener("click",()=>r("login")),document.getElementById("ct-tab-register").addEventListener("click",()=>r("register")),n.addEventListener("click",t=>{t.target===n&&u()}),document.getElementById("ct-auth-cancel").addEventListener("click",u),document.getElementById("ct-pending-close").addEventListener("click",u),document.getElementById("ct-logout-btn").addEventListener("click",()=>{k(),g(null),p(null),u()}),document.getElementById("ct-auth-form").addEventListener("submit",async t=>{t.preventDefault();const o=document.getElementById("ct-email").value,i=document.getElementById("ct-password").value,l=document.getElementById("ct-auth-error"),a=document.getElementById("ct-auth-submit");l.style.display="none",a.disabled=!0,a.textContent="Please wait...";try{const v=await fetch(`${E}${e==="login"?"/api/auth/login":"/api/auth/register"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:i})}),m=await v.json();v.ok?m.pending?(document.getElementById("ct-auth-form").style.display="none",document.getElementById("ct-auth-tabs").style.display="none",document.getElementById("ct-pending-text").textContent=m.message,document.getElementById("ct-pending-msg").style.display="block"):(B(m.token),g(m.user),p(m.user),u()):(l.textContent=m.error||"Something went wrong.",l.style.display="block")}catch{l.textContent="Network error. Please try again.",l.style.display="block"}finally{a.disabled=!1,r(e)}})}function b(){const n=document.getElementById("ct-auth-modal");if(!n)return;const e=y(),r=document.getElementById("ct-auth-form"),t=document.getElementById("ct-logged-in"),o=document.getElementById("ct-auth-tabs"),i=document.getElementById("ct-pending-msg");r.style.display="",t.style.display="none",i.style.display="none",o.style.display="",document.getElementById("ct-auth-error").style.display="none",document.getElementById("ct-email").value="",document.getElementById("ct-password").value="",e&&x(e).then(l=>{if(l){document.getElementById("ct-logged-email").textContent=l.email;const a=document.getElementById("ct-admin-btn");if(a){const h=l.role==="admin"||l.role==="owner";a.style.display=h?"inline-block":"none"}r.style.display="none",o.style.display="none",t.style.display="block"}}),n.style.display="flex"}function u(){const n=document.getElementById("ct-auth-modal");n&&(n.style.display="none")}let c=null,s=null,d=null;function f(n,e,r){const t=document.createElement("a");return t.href=n,t.target="_blank",t.rel="noopener noreferrer",t.textContent=e,t.style.cssText=`
        display: block;
        margin-top: ${r};
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        color: #444;
        text-decoration: none;
        border-left: 3px solid #ccc;
        background: #f5f5f5;
        border-radius: 0 4px 4px 0;
        transition: background 0.2s, color 0.2s;
    `,t.addEventListener("mouseenter",()=>{t.style.background="#e8e8e8",t.style.color="#1d4ed8",t.style.textDecoration="underline"}),t.addEventListener("mouseleave",()=>{t.style.background="#f5f5f5",t.style.color="#444",t.style.textDecoration="none"}),t}function g(n){const e=document.getElementById("embodyx-sidebar-logo")||document.querySelector(".university-logo");if(e)if(n){const r=n.role==="admin"||n.role==="owner";r&&!d?(d=f("/pr-tool.html","PR Tool","2rem"),e.insertAdjacentElement("afterend",d)):!r&&d&&(d.remove(),d=null),c||(c=f("/conferences/","Conference Tracker","0.5rem"),(d||e).insertAdjacentElement("afterend",c)),r&&!s?(s=f("/conferences/#news","News Management","0.5rem"),c.insertAdjacentElement("afterend",s)):!r&&s&&(s.remove(),s=null)}else c&&(c.remove(),c=null),s&&(s.remove(),s=null),d&&(d.remove(),d=null)}function p(n){const e=document.querySelector(".nav-links");let r=document.getElementById("users-nav-link");if(n&&!r&&e){const t=document.createElement("li");t.innerHTML='<a href="#" id="users-nav-link">Users</a>',e.appendChild(t),r=document.getElementById("users-nav-link"),r.addEventListener("click",o=>{o.preventDefault(),b()})}r&&(r.textContent=n?`${n.email.split("@")[0]} ▾`:"Users")}document.addEventListener("DOMContentLoaded",async()=>{C(),setTimeout(()=>{var e;(e=document.getElementById("users-nav-link"))==null||e.addEventListener("click",r=>{r.preventDefault(),b()})},0);const n=y();if(n){const e=await x(n);e?(g(e),p(e)):k()}});
