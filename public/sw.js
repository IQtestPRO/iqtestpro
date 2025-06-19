const CACHE_NAME = "iqtest-v1"
const urlsToCache = [
  "/",
  "/premium",
  "/test",
  "/results",
  "/dashboard",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/images/logo.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)))
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
