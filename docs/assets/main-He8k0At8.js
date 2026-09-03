(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(o){if(o.ep)return;o.ep=!0;const i=r(o);fetch(o.href,i)}})();const x="https://conference-tracker-a2x1.onrender.com";function w(){return localStorage.getItem("ct_internal")==="1"}function h(){return localStorage.getItem("ct_token")}function L(n){localStorage.setItem("ct_token",n)}function I(){localStorage.removeItem("ct_token")}async function B(n){const t=await fetch(`${x}/api/auth/me`,{headers:{Authorization:`Bearer ${n}`}});return t.ok?t.json():null}class C extends HTMLElement{connectedCallback(){this.innerHTML=`
    <header>
        <div class="header-content">
            <a href="./index.html" class="brand">Yanzhi Wang</a>
            <nav>
                <ul class="nav-links">
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./labprojects.html">Interests & Lab Projects</a></li>
                    <li><a href="./news.html">News</a></li>
                    <li><a href="./publications.html">Publications & Patents</a></li>
                    <li><a href="./teaching.html">Teaching & Students</a></li>
                    <li><a href="./CV.pdf" target="_blank">CV</a></li>
                    ${w()||h()?'<li><a href="#" id="users-nav-link">Users</a></li>':""}
                </ul>
            </nav>
        </div>
    </header>
        `,this.highlightActiveLink(),document.addEventListener("DOMContentLoaded",()=>{var t;(t=document.getElementById("users-nav-link"))==null||t.addEventListener("click",r=>{r.preventDefault(),v()})})}highlightActiveLink(){const t=window.location.pathname;this.querySelectorAll(".nav-links a").forEach(e=>{const o=e.getAttribute("href"),i=t.split("/").pop()||"index.html";o.replace("./","").split("?")[0]===i?e.classList.add("active"):e.classList.remove("active")})}}class T extends HTMLElement{connectedCallback(){this.innerHTML=`
        <footer>
            <p>&copy; 2025 Yanzhi Wang</p>
        </footer>
        `}}customElements.define("shared-header",C);customElements.define("shared-footer",T);function z(){if(document.getElementById("ct-auth-modal"))return;const n=document.createElement("div");n.id="ct-auth-modal",n.style.cssText=`
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
                <a id="ct-admin-btn" href="/conferences/?admin=1" style="
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
    `,document.body.appendChild(n);let t="login";function r(e){t=e;const o=document.getElementById("ct-tab-login"),i=document.getElementById("ct-tab-register"),l=document.getElementById("ct-auth-submit"),s=document.getElementById("ct-password");e==="login"?(o.style.color="#3b82f6",o.style.borderBottomColor="#3b82f6",i.style.color="#64748b",i.style.borderBottomColor="transparent",l.textContent="Sign In",s.placeholder=""):(i.style.color="#3b82f6",i.style.borderBottomColor="#3b82f6",o.style.color="#64748b",o.style.borderBottomColor="transparent",l.textContent="Create Account",s.placeholder="At least 6 characters"),document.getElementById("ct-auth-error").style.display="none"}document.getElementById("ct-tab-login").addEventListener("click",()=>r("login")),document.getElementById("ct-tab-register").addEventListener("click",()=>r("register")),n.addEventListener("click",e=>{e.target===n&&g()}),document.getElementById("ct-auth-cancel").addEventListener("click",g),document.getElementById("ct-pending-close").addEventListener("click",g),document.getElementById("ct-logout-btn").addEventListener("click",()=>{I(),y(null),b(null),g()}),document.getElementById("ct-auth-form").addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("ct-email").value,i=document.getElementById("ct-password").value,l=document.getElementById("ct-auth-error"),s=document.getElementById("ct-auth-submit");l.style.display="none",s.disabled=!0,s.textContent="Please wait...";try{const E=await fetch(`${x}${t==="login"?"/api/auth/login":"/api/auth/register"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:o,password:i})}),f=await E.json();E.ok?f.pending?(document.getElementById("ct-auth-form").style.display="none",document.getElementById("ct-auth-tabs").style.display="none",document.getElementById("ct-pending-text").textContent=f.message,document.getElementById("ct-pending-msg").style.display="block"):(L(f.token),y(f.user),b(f.user),g()):(l.textContent=f.error||"Something went wrong.",l.style.display="block")}catch{l.textContent="Network error. Please try again.",l.style.display="block"}finally{s.disabled=!1,r(t)}})}function v(){const n=document.getElementById("ct-auth-modal");if(!n)return;const t=h(),r=document.getElementById("ct-auth-form"),e=document.getElementById("ct-logged-in"),o=document.getElementById("ct-auth-tabs"),i=document.getElementById("ct-pending-msg");r.style.display="",e.style.display="none",i.style.display="none",o.style.display="",document.getElementById("ct-auth-error").style.display="none",document.getElementById("ct-email").value="",document.getElementById("ct-password").value="",t&&B(t).then(l=>{if(l){document.getElementById("ct-logged-email").textContent=l.email;const s=document.getElementById("ct-admin-btn");if(s){const k=l.role==="admin"||l.role==="owner";s.style.display=k?"inline-block":"none"}r.style.display="none",o.style.display="none",e.style.display="block"}}),n.style.display="flex"}function g(){const n=document.getElementById("ct-auth-modal");n&&(n.style.display="none")}let m=null,d=null,a=null,u=null,c=null;function p(n,t,r){const e=document.createElement("a");return e.href=n,e.target="_blank",e.rel="noopener noreferrer",e.textContent=t,e.style.cssText=`
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
    `,e.addEventListener("mouseenter",()=>{e.style.background="#e8e8e8",e.style.color="#1d4ed8",e.style.textDecoration="underline"}),e.addEventListener("mouseleave",()=>{e.style.background="#f5f5f5",e.style.color="#444",e.style.textDecoration="none"}),e}function y(n){const t=document.getElementById("embodyx-sidebar-logo")||document.querySelector(".university-logo");if(t)if(n){const r=n.role==="admin"||n.role==="owner";u||(u=p("/paper-tracking.html","Paper Tracking","2rem"),t.insertAdjacentElement("afterend",u)),r&&!a?(a=p("/pr-tool.html","PR Tool","0.5rem"),u.insertAdjacentElement("afterend",a)):!r&&a&&(a.remove(),a=null),m||(m=p("/conferences/","Conference Tracker","0.5rem"),(a||u).insertAdjacentElement("afterend",m)),r&&!d?(d=p("/conferences/#news","News Management","0.5rem"),m.insertAdjacentElement("afterend",d)):!r&&d&&(d.remove(),d=null),r&&!c?(c=p("/activity-arrangement.html","Activity Arrangement","0.5rem"),(d||m).insertAdjacentElement("afterend",c)):!r&&c&&(c.remove(),c=null)}else m&&(m.remove(),m=null),d&&(d.remove(),d=null),a&&(a.remove(),a=null),u&&(u.remove(),u=null),c&&(c.remove(),c=null)}function b(n){const t=document.querySelector(".nav-links");let r=document.getElementById("users-nav-link");if(n&&!r&&t){const e=document.createElement("li");e.innerHTML='<a href="#" id="users-nav-link">Users</a>',t.appendChild(e),r=document.getElementById("users-nav-link"),r.addEventListener("click",o=>{o.preventDefault(),v()})}r&&(r.textContent=n?`${n.email.split("@")[0]} ▾`:"Users")}document.addEventListener("DOMContentLoaded",async()=>{z(),setTimeout(()=>{var t;(t=document.getElementById("users-nav-link"))==null||t.addEventListener("click",r=>{r.preventDefault(),v()})},0);const n=h();if(n){const t=await B(n);t?(y(t),b(t)):I()}});
