self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurant-cache').then(function(cache) {
      return cache.addAll(
        [
          '/',
          '/css/styles.css',
          '/data/restaurants.json',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/index.html',
          '/restaurant.html'
        ]
      );
    }).catch(function(e) {
      console.log(e)
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true})
      .then(function(response) {
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
