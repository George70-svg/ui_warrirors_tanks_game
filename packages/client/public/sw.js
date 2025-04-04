const CACHE_NAME = 'battle-city-cache-v1'

const URLS = [
  '/game',
  '/images/brick.png',
  '/images/computer-tank.png',
  '/images/game-bg.jpg',
  '/images/metal.png',
  '/images/tank.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(URLS))
      .catch((err) => console.error('Cache open failed: ', err))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              console.log(`Deleting old cache: ${name}`)
              return caches.delete(name)
            }
          })
        )
      })
      .then(() => {
        console.log('Claiming clients...')
        return self.clients.claim()
      })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      return fetch(event.request).then((response) => {
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
