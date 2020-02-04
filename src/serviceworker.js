"use strict";

const version = 2;
const date = new Date();
const cacheName = `calendario-series-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
var isOnline;

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);

main().catch(console.error);

async function main() {
  console.log("main");
}

function onInstall(e) {
  console.log(`Service worker (${version}) installed`);
  self.skipWaiting();
}

function onActivate(e) {
  e.waitUntil(handleActivation());
}

function onMessage({ data }) {
  if ("statusUpdate" in data) {
    ({ isOnline } = data.statusUpdate);
    console.log(
      `Service Worker (${version}) status update... isOnline:${isOnline}`
    );
  }
}

function onFetch(e) {
  e.respondWith(router(e.request));
}

async function handleActivation() {
  await clients.claim();
  console.log(`Service worker (${version}) activated`);
  sendMessage({ updateLocation: true });
}

async function router(req) {
  const url = new URL(req.url);
  const cache = await caches.open(cacheName);
  let res;

  if (url.origin == location.origin || url.origin.includes("api")) {
    res = await cache.match(req.url);
    if (res) {
      console.log("return from cache");
      return res;
    }

    if (isOnline) {
      let fetchOptions = {
        method: req.method,
        headers: req.headers,
        cache: "no-store"
      };
      res = await fetch(req.url, fetchOptions);
      if (res.ok) {
        await cache.put(req.url, res.clone());
        return res;
      }
    }

    return new Response("", { ok: false, status: 200, statusText: "No fetch" });
  }

  return fetch(req);
}

async function sendMessage(msg) {
  var allClients = await clients.matchAll({ includeUncontrolled: true });
  return Promise.all(
    allClients.map(function sendTo(client) {
      var chan = new MessageChannel();
      chan.port1.onmessage = onMessage;
      return client.postMessage(msg, [chan.port2]);
    })
  );
}

// async function safeRequest(
//   reqURL,
//   req,
//   options,
//   cacheResponse = false,
//   checkCacheFirst = false,
//   checkCacheLast = false,
//   useRequestDirectly = false
// ) {
//   const cache = await caches.open(cacheName);
//   let res;

//   if (checkCacheFirst) {
//     res = await cache.match(req.url);
//     if (res) {
//       console.log("return from cache", res.clone());
//       return res;
//     }
//   }

//   if (isOnline) {
//     try {
//       console.log(req.url, req);
//       if (useRequestDirectly) {
//         res = await fetch(req, options);
//       } else {
//         res = await fetch(req.url, options);
//       }

//       // if (res && (res.ok || res.type == "opaqueredirect")) {
//       if (res && res.ok) {
//         if (cacheResponse) {
//           console.log("cache response", res.clone());
//           await cache.put(req.url, res.clone());
//         }
//         return res;
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   if (checkCacheLast) {
//     res = await cache.match(req.url);
//     if (res) {
//       return res;
//     }
//   }
// }
