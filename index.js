import{i as a,S as h}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const y="48468658-42ed6d7129c3b4c82c2d48fe1",g="https://pixabay.com/api/";async function b(t,o=1,n=12){const s=new URLSearchParams({key:y,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:n}),e=await fetch(`${g}?${s}`);if(!e.ok)throw new Error("Failed to fetch images");return e.json()}function L(t){return t.map(({webformatURL:o,largeImageURL:n,tags:s,likes:e,views:r,comments:i,downloads:p})=>`
          <li class="gallery-item">
            <a href="${n}" class="gallery-link">
              <img src="${o}" alt="${s}" loading="lazy" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${e}</p>
              <p><b>Views:</b> ${r}</p>
              <p><b>Comments:</b> ${i}</p>
              <p><b>Downloads:</b> ${p}</p>
            </div>
          </li>
        `).join("")}function w(t){t.innerHTML=""}function P(t){t.hidden=!1}function S(t){t.hidden=!0}const c=document.querySelector("#search-form"),u=document.querySelector("#gallery"),f=document.querySelector("#loader");let l,d="",m=1;c.addEventListener("submit",t=>{t.preventDefault();const o=c.query.value.trim();if(!o){a.error({title:"Error",message:"Please enter a search term."});return}d=o,m=1,w(u),P(f),b(d,m).then(n=>{if(n.hits.length===0){a.warning({title:"No Results",message:"Sorry, no images matched your search query. Please try again."});return}u.innerHTML=L(n.hits),l?l.refresh():l=new h(".gallery-link")}).catch(n=>{a.error({title:"Error",message:n.message})}).finally(()=>{S(f)})});
//# sourceMappingURL=index.js.map
