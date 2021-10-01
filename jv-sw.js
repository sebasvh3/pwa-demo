// self.importScripts('data/games.js');

const cacheName = 'caches_3311';
const appShellFiles = [
  '/pwa-examples/js13kpwa/',
  '/pwa-examples/js13kpwa/index.html',
  '/pwa-examples/js13kpwa/app.js',
  '/pwa-examples/js13kpwa/style.css',
  '/pwa-examples/js13kpwa/fonts/graduate.eot',
  '/pwa-examples/js13kpwa/fonts/graduate.ttf',
  '/pwa-examples/js13kpwa/fonts/graduate.woff',
  '/pwa-examples/js13kpwa/favicon.ico',
  '/pwa-examples/js13kpwa/img/js13kgames.png',
  '/pwa-examples/js13kpwa/img/bg.png',
  '/pwa-examples/js13kpwa/icons/icon-32.png',
  '/pwa-examples/js13kpwa/icons/icon-64.png',
  '/pwa-examples/js13kpwa/icons/icon-96.png',
  '/pwa-examples/js13kpwa/icons/icon-128.png',
  '/pwa-examples/js13kpwa/icons/icon-168.png',
  '/pwa-examples/js13kpwa/icons/icon-192.png',
  '/pwa-examples/js13kpwa/icons/icon-256.png',
  '/pwa-examples/js13kpwa/icons/icon-512.png',
];
// const gamesImages = [];
// for (let i = 0; i < games.length; i++) {
//   gamesImages.push(`data/img/${games[i].slug}.jpg`);
// }

//const contentToCache = appShellFiles.concat(gamesImages);


const contentToCache = ['app.js','index.html'];


self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('jv -> [Service Worker] Caching all: app shell and content');
    await cache.addAll(contentToCache);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);

    console.log("fetch e.request",e.request);

    if (r) {
      console.log(`jv -> [Service Worker] Recovering previous response: ${e.request.url}`);
      return r; 
    }

    const response = await fetch(e.request);
    
    if(!e.request.url.includes('/api/nocache')) {
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      console.log(`jv -> [Service Worker] Caching new resource: ${e.request.url}`);
    } else {
      console.log(`jv -> [Service Worker] NO Caching new resource: ${e.request.url}`)
    }
    
    return response;
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keyList) => {
    console.log(`jv -> [Service Worker] Activate resource: ${e}`);
    return Promise.all(keyList.map((key) => {
      if (key === cacheName) { return; }
      return caches.delete(key);
    }))
  }));
});