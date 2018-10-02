self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installed')
  event.waitUntil(
    caches.open('restaurant-cache').then(function(cache) {
      console.log('Service worker caching files')
      return cache.addAll(
        [
          '/',
          '/css/styles.css',
          '/data/restaurants.json',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/index.html',
          '/restaurant.html/'
        ]
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetching ' + event.request.url)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('[Service Worker] Fetching resource: '+ event.request.url);
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open('restaurant-cache')
            .then(function(cache) {
              cache.put(event.request, responseToCache)
            });

            return response;
          }
        )
    })
  );
});
