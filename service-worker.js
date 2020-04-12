console.log('hello from service worker');
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  const {
    precaching,
    routing,
    backgroundSync,
    strategies,
    expiration,
    cacheableResponse
  } = workbox;

  // https://api.adorable.io/avatars/64/Haaris%20Ramadhan.png
  routing.registerRoute(
    new RegExp('^https://api.adorable.io/avatars/64'),
    new strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60
        }),
        new cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200]
        })
      ]
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
