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
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
