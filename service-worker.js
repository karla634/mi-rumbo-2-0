const CACHE_NAME="mi-rumbo-2-v4";
const APP_FILES=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_FILES)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("mi-rumbo-2-")&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==self.location.origin)return;if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put("./index.html",cp));}return res;}).catch(()=>caches.match("./index.html")));return;}e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(CACHE_NAME).then(x=>x.put(r,cp));}return res;})));});
