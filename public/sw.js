var BUILD_TIME = '20260501_0957';
// MBTS Service Worker — network-first
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(name) { return caches.delete(name); }));
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', function(event) {
  // API 요청은 서비스 워커가 관여하지 않음
  if (event.request.url.indexOf('/api/') >= 0) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
