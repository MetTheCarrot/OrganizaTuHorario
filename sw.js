if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),c={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-5e95ba19.js",revision:null},{url:"assets/index-7cc36e4f.css",revision:null},{url:"assets/index.es-742b81c9.js",revision:null},{url:"assets/purify.es-cf254a40.js",revision:null},{url:"assets/ReactToastify-55fec1ff.css",revision:null},{url:"assets/ToDo-045e40c0.css",revision:null},{url:"index.html",revision:"dc91e90c928d7fc553de158ed0e99b63"},{url:"registerSW.js",revision:"3b9da13de94e7849b2c6d6cfec969afe"},{url:"manifest.webmanifest",revision:"dfe556eb07d419e84cfd102f93917c31"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
