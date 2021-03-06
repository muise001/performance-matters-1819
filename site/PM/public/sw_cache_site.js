const cacheName = "v4"

const cacheAssets = [
  "./",
  "./history",
  "./khaled",
  "./search?q=appel",
  "./img/noconnection.gif"
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
    caches
      .keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log("SW clearing old cache")
            return caches.delete(cache)
          }
        }))
    })
  )
})

self.addEventListener("fetch", e => {
  const r = new Request(self.location.origin + '/history', {method: 'GET'})
  caches.open(cacheName)
    .then(cache => {
      cache.delete(r).then(res => {
        fetch(r)
          .then(res => console.log(res))
      }).catch(err => console.log("err", err))
  }).catch(err => console.log("err", err))
  console.log('r', r)
  e.respondWith(
    fetch(e.request)
      .then(res => {
        //make clone of response
        const resClone = res.clone()
        //open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to cache
            cache.put(e.request, resClone)
          })
        return res;
      }).catch(err => caches.match(e.request).then(res => res))
  )
})
