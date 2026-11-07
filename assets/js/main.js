
const CONFIG = { whatsapp: "573000000000", company: "Extintores Bogotá" }; // Reemplaza el número por el WhatsApp real, con indicativo 57.
document.querySelectorAll("[data-year]").forEach(x=>x.textContent=new Date().getFullYear());
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hola, quiero información sobre inspección, mantenimiento o recarga de extintores en Bogotá.")}`;});
const form=document.getElementById("quoteForm");
if(form) form.addEventListener("submit",e=>{e.preventDefault();if(!form.reportValidity())return;const v=id=>document.getElementById(id).value.trim();const msg=`Hola, solicito una cotización de extintores.\\nNombre: ${v("nombre")}\\nTeléfono: ${v("telefono")}\\nLocalidad/dirección: ${v("zona")}\\nTipo/cantidad: ${v("equipo")}\\nServicio: ${v("servicio")}\\nObservaciones: ${v("detalle")}`;window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`,"_blank","noopener,noreferrer");});
if("IntersectionObserver" in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");ob.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll(".reveal").forEach(x=>ob.observe(x));}else document.querySelectorAll(".reveal").forEach(x=>x.classList.add("show"));
(()=>{
 const KEY="extintoresBogotaCookieConsent",banner=document.getElementById("cookieBanner"),settings=document.getElementById("cookieSettings"),reopen=document.getElementById("cookieReopen");
 if(!banner||!settings||!reopen)return;
 const analytics=document.getElementById("cookieAnalytics"),marketing=document.getElementById("cookieMarketing");
 const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}};
 const apply=c=>{window.extintoresCookieConsent={necessary:true,analytics:!!c.analytics,marketing:!!c.marketing};window.dispatchEvent(new CustomEvent("extintores:consent",{detail:window.extintoresCookieConsent}));};
 const save=c=>{const v={necessary:true,analytics:!!c.analytics,marketing:!!c.marketing,updatedAt:new Date().toISOString()};try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}apply(v);banner.hidden=true;settings.hidden=true;reopen.hidden=false;};
 const open=()=>{const c=read()||{};analytics.checked=!!c.analytics;marketing.checked=!!c.marketing;settings.hidden=false;};
 document.getElementById("cookieAccept").onclick=()=>save({analytics:true,marketing:true});
 document.getElementById("cookieReject").onclick=()=>save({analytics:false,marketing:false});
 document.getElementById("cookieCustomize").onclick=open;
 document.getElementById("cookieSave").onclick=()=>save({analytics:analytics.checked,marketing:marketing.checked});
 document.getElementById("cookieCancel").onclick=()=>settings.hidden=true;
 reopen.onclick=open;
 document.querySelectorAll("[data-cookie-open]").forEach(x=>x.onclick=e=>{e.preventDefault();open()});
 settings.addEventListener("click",e=>{if(e.target===settings)settings.hidden=true});
 const saved=read();if(saved){apply(saved);reopen.hidden=false}else banner.hidden=false;
})();
