const CACHE_NAME = "fetch-first";

async function respondCached(event) {
  const cache = await caches.open(CACHE_NAME);
  return fetch(event.request.url)
    .then((fetchedResponse) => {
      cache.put(event.request, fetchedResponse.clone());
      return fetchedResponse;
    })
    .catch(() => {
      return cache.match(event.request.url);
    });
}

self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    return;
  }

  event.respondWith(respondCached(event));
});
self.addEventListener("activate", (event) => {
  self.clients.claim();
});
