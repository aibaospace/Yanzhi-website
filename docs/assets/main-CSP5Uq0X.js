(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const v="https://conference-tracker-production.up.railway.app";function x(){return localStorage.getItem("ct_internal")==="1"}function y(){return localStorage.getItem("ct_token")}function I(n){localStorage.setItem("ct_token",n)}function E(){localStorage.removeItem("ct_token")}async function k(n){const t=await fetch(`${v}/api/auth/me`,{headers:{Authorization:`Bearer ${n}`}});return t.ok?t.json():null}class B extends HTMLElement{connectedCallback(){this.innerHTML=`
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
                    ${x()||y()?'<li><a href="#" id="users-nav-link">Users</a></li>':""}
                </ul>
            </nav>
        </div>
    </header>
        `,this.highlightActiveLink(),document.addEventListener("DOMContentLoaded",()=>{var t;(t=document.getElementById("users-nav-link"))==null||t.addEventListener("click",r=>{r.preventDefault(),b()})})}highlightActiveLink(){const t=window.location.pathname;this.querySelectorAll(".nav-links a").forEach(e=>{const o=e.getAttribute("href"),i=t.split("/").pop()||"index.html";o.replace("./","").split("?")[0]===i?e.classList.add("active"):e.classList.remove("active")})}}class w extends HTMLElement{connectedCallback(){this.innerHTML=`
        <footer>
            <p>&copy; 2025 Yanzhi Wang</p>
        </footer>
        `}}customElements.define("shared-header",B);customElements.define("shared-footer",w);function L(){if(document.getElementById("ct-auth-modal"))return;const n=document.createElement("div");n.id="ct-auth-modal",n.style.cssText=`
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
                <button id="ct-logout-btn" style="
                    padding:0.5rem 1.2rem; background:#ef4444; color:#fff;
                    border:none; border-radius:6px; cursor:pointer; font-size:0.9rem;
                ">Sign Out</button>
            </div>
        </div>
    `,document.body.appendChild(n);let t="login";function r(e){t=e;const o=document.getElementById("ct-tab-login"),i=document.getElementById("ct-tab-register"),l=document.getElementById("ct-auth-submit"),c=document.getElementById("ct-password");e==="login"?(o.style.color="#3b82f6",o.style.borderBottomColor="#3b82f6",i.style.color="#64748b",i.style.borderBottomColor="transparent",l.textContent="Sign In",c.placeholder=""):(i.style.color="#3b82f6",i.style.borderBottomColor="#3b82f6",o.style.color="#64748b",o.style.borderBottomColor="transparent",l.textContent="Create Account",c.placeholder="At least 6 characters"),document.getElementById("ct-auth-error").style.display="none"}document.getElementById("ct-tab-login").addEventListener("click",()=>r("login")),document.getElementById("ct-tab-register").addEventListener("click",()=>r("register")),n.addEventListener("click",e=>{e.target===n&&u()}),document.getElementById("ct-auth-cancel").addEventListener("click",u),document.getElementById("ct-pending-close").addEventListener("click",u),document.getElementById("ct-logout-btn").addEventListener("click",()=>{E(),g(null),p(null),u()}),document.getElementById("ct-auth-form").addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("ct-email").value,i=document.getElementById("ct-password").value,l=document.getElementById("ct-auth-error"),c=document.getElementById("ct-auth-submit");l.style.display="none",c.disabled=!0,c.textContent="Please wait...";try{const h=await fetch(`${v}${t==="login"?"/api/auth/login":"/api/auth/register"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:i})}),m=await h.json();h.ok?m.pending?(document.getElementById("ct-auth-form").style.display="none",document.getElementById("ct-auth-tabs").style.display="none",document.getElementById("ct-pending-text").textContent=m.message,document.getElementById("ct-pending-msg").style.display="block"):(I(m.token),g(m.user),p(m.user),u()):(l.textContent=m.error||"Something went wrong.",l.style.display="block")}catch{l.textContent="Network error. Please try again.",l.style.display="block"}finally{c.disabled=!1,r(t)}})}function b(){const n=document.getElementById("ct-auth-modal");if(!n)return;const t=y(),r=document.getElementById("ct-auth-form"),e=document.getElementById("ct-logged-in"),o=document.getElementById("ct-auth-tabs"),i=document.getElementById("ct-pending-msg");r.style.display="",e.style.display="none",i.style.display="none",o.style.display="",document.getElementById("ct-auth-error").style.display="none",document.getElementById("ct-email").value="",document.getElementById("ct-password").value="",t&&k(t).then(l=>{l&&(document.getElementById("ct-logged-email").textContent=l.email,r.style.display="none",o.style.display="none",e.style.display="block")}),n.style.display="flex"}function u(){const n=document.getElementById("ct-auth-modal");n&&(n.style.display="none")}let s=null,d=null,a=null;function f(n,t,r){const e=document.createElement("a");return e.href=n,e.target="_blank",e.rel="noopener noreferrer",e.textContent=t,e.style.cssText=`
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
    `,e.addEventListener("mouseenter",()=>{e.style.background="#e8e8e8",e.style.color="#1d4ed8",e.style.textDecoration="underline"}),e.addEventListener("mouseleave",()=>{e.style.background="#f5f5f5",e.style.color="#444",e.style.textDecoration="none"}),e}function g(n){const t=document.getElementById("embodyx-sidebar-logo")||document.querySelector(".university-logo");if(t)if(n){s||(s=f("/conferences/","Conference Tracker","2rem"),t.insertAdjacentElement("afterend",s));const r=n.role==="admin"||n.role==="owner";r&&!d?(d=f("/conferences/#news","News Management","0.5rem"),s.insertAdjacentElement("afterend",d)):!r&&d&&(d.remove(),d=null),r&&!a?(a=f("/pr-tool.html","PR Tool","0.5rem"),(d||s).insertAdjacentElement("afterend",a)):!r&&a&&(a.remove(),a=null)}else s&&(s.remove(),s=null),d&&(d.remove(),d=null),a&&(a.remove(),a=null)}function p(n){const t=document.querySelector(".nav-links");let r=document.getElementById("users-nav-link");if(n&&!r&&t){const e=document.createElement("li");e.innerHTML='<a href="#" id="users-nav-link">Users</a>',t.appendChild(e),r=document.getElementById("users-nav-link"),r.addEventListener("click",o=>{o.preventDefault(),b()})}r&&(r.textContent=n?`${n.email.split("@")[0]} ▾`:"Users")}document.addEventListener("DOMContentLoaded",async()=>{L(),setTimeout(()=>{var t;(t=document.getElementById("users-nav-link"))==null||t.addEventListener("click",r=>{r.preventDefault(),b()})},0);const n=y();if(n){const t=await k(n);t?(g(t),p(t)):E()}});
