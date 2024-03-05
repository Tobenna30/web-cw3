var cacheName = "lessonapp-v1";
var cacheFiles = [
    "index.html",
   //"lessons.js",
   
   "images/icon-32.png",
   "images/icon-512.png",

];
self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
       caches.open(cacheName).then(function(cache) {
          console.log("[Service Worker] Caching files");
          return cache.addAll(cacheFiles);
 }) );
 });
 self.addEventListener("fetch", function (e) {
    // Check if the request is made over http or https
    if (!e.request.url.startsWith('http') && !e.request.url.startsWith('https')) {
        console.log("[Service Worker] Skip caching for non-http/https request: " + e.request.url);
        return fetch(e.request);
    }

    e.respondWith(
        caches.match(e.request).then(function (cachedFile) {
            if (cachedFile) {
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else {
                return fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, response.clone());
                        console.log("[Service Worker] Resource fetched and saved in the cache for: " + e.request.url);
                        return response;
                    });
                });
            }
        })
    );
});
