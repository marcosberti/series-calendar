"use strict";

import { precacheStaticAssets, ALL_CACHES } from "./sw/caches";

self.addEventListener("install", function onInstall(event) {
  //precache
  event.waitUntil(precacheStaticAssets());
  //por ahora no importa si hay otro sw asique forzamos el nuevo sw
  self.skipWaiting();
});

async function handleActivation() {
  await clients.claim();
  //limpiar cache vieja
}

self.addEventListener("activate", function onActivate(event) {
  event.waitUntil(handleActivation());
});

async function router(fetchEvent) {
  const requestUrl = new URL(fetchEvent.request.url);
  const isLocal = new URL(fetchEvent.request.url).origin === location.origin;
  const isFromApi = requestUrl.host === "api.tvmaze.com";
  const { request } = fetchEvent;
  let res;

  if (isLocal && !isFromApi) {
    try {
      return await fetch(fetchEvent.request);
    } catch (error) {
      return caches.match(requestUrl.pathname, {
        cacheName: ALL_CACHES.prefetch
      });
    }
  }

  if (isFromApi) {
    res = await caches.match(requestUrl.href, { cacheName: ALL_CACHES.data });
    if (res) {
      console.log("return from cache");
      return res;
    }

    try {
      let fetchOptions = {
        method: request.method,
        headers: request.headers,
        mode: request.mode,
        cache: "no-store"
      };
      res = await fetch(requestUrl, fetchOptions);
      if (res.ok) {
        const cache = await caches.open(ALL_CACHES.data);
        cache.put(requestUrl.href, res.clone());
        return res;
      }

      return errorFetchingData();
    } catch (error) {
      return errorFetchingData();
    }
  }

  return fetch(fetchEvent);
}

function errorFetchingData() {
  return new Response("", {
    ok: false,
    status: 200,
    statusText: "No fetch"
  });
}

self.addEventListener("fetch", function onFetch(event) {
  event.respondWith(router(event));
});
