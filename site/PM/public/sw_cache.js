const cacheName = "v2"

const cacheAssets = [
  "./",
  "./history",
  "./khaled",
  "./search?q=appel"
]

self.addEventListener("install", e => {
  console.log("installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Sercive Worker: Caching files")
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", e => {
  console.log("service worker activated");
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all()
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log("SW clearing old cache")
            return caches.delete(cache)
          }
        })
    })
  )
})

self.addEventListener("fetch", e => {
  console.log("FETCHED")
  e.respondWitch(
    fetch(e.request).catch(() => caches.match(e.request))
  )
})
