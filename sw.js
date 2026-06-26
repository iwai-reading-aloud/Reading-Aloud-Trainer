// Reading-Aloud Trainer Service Worker
const CACHE_NAME = "reading-aloud-trainer-v2";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  // Network-first to avoid stale index.html during development.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
