const CACHE_NAME = "rat-culture-v5";
const CACHE_PREFIX = "rat-culture-";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/splash-1290x2796.png",
  "./icons/splash-1179x2556.png",
  "./icons/splash-1170x2532.png",
  "./icons/splash-1284x2778.png",
  "./icons/splash-828x1792.png",
  "./icons/splash-1242x2688.png",
  "./icons/splash-1125x2436.png",
  "./icons/splash-750x1334.png",
  "./icons/splash-640x1136.png",
  "./icons/favicon.ico"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => undefined);
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match("./index.html")))
  );
});
