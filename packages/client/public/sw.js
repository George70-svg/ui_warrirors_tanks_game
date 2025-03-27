const CACHE_NAME = 'battle-city-cache-v1'

const URLS = [
  '/game',
  '/images/brick.png',
  '/images/computer-tank.png',
  '/images/game-bg.jpg',
  '/images/metal.png',
  '/images/tank.png',
]

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS)
      })
      .catch((err) => {
        console.error(err)
        throw err
      })
  )
})

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => caches.delete(name)))
    })
  )
})

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })
        return response
      })
    })
  )
})
