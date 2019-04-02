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
  // if (e.request.mode === 'navigate') {
  //   console.log(e, e.request)
  // }
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (e.request.mode === 'navigate' && e.request.url.includes('search?')) {
          console.log(res, e.request)
          const r = new Request(self.localtion.origin + '/history', {method: 'GET'})
          console.log('r', r)
          fetch(r)
            .then(result => {
              console.log('resulttttttttttttttttTTTTTTTt', result)
              const resultClone = result.clone()
              caches
                .open(cacheName)
                .then(cache => {
                  console.log('cache', cache)
                  // Add response to cache
                  cache.put(r.request, resultClone)
                })
            })
        }
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
