if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let o={};const d=e=>i(e,c),l={module:{uri:c},exports:o,require:d};n[c]=Promise.all(s.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-5e95ba19.js",revision:null},{url:"assets/index-7cc36e4f.css",revision:null},{url:"assets/index.es-742b81c9.js",revision:null},{url:"assets/purify.es-cf254a40.js",revision:null},{url:"assets/ReactToastify-55fec1ff.css",revision:null},{url:"assets/ToDo-045e40c0.css",revision:null},{url:"index.html",revision:"dc91e90c928d7fc553de158ed0e99b63"},{url:"registerSW.js",revision:"3b9da13de94e7849b2c6d6cfec969afe"},{url:"icons/android-launchericon-48-48.png",revision:"e0e3eaa2508f2921728137d67075171c"},{url:"icons/android-launchericon-72-72.png",revision:"db719d472a22e0b17c483e43300a326e"},{url:"icons/android-launchericon-96-96.png",revision:"9ac68f6f00fba483d99b1ef9abc21bc2"},{url:"icons/android-launchericon-144-144.png",revision:"d031a1d3e5501a342a7a8af1ae2d7483"},{url:"icons/android-launchericon-192-192.png",revision:"db22b8c78cf662a286ae6c361554e6ed"},{url:"icons/android-launchericon-512-512.png",revision:"d8003b5dc2e8e8fa622f060d638b7712"},{url:"manifest.webmanifest",revision:"dfe556eb07d419e84cfd102f93917c31"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
