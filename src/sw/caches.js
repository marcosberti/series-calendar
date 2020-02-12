const CACHE_VERSION = 1;
const CACHE_PREFIX = `CDS-v${CACHE_VERSION}`;

const date = new Date();
const API_CACHE = `API-${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export const ALL_CACHES = {
  prefetch: cacheName("PREFETCH"),
  data: cacheName(API_CACHE)
};

function cacheName(name) {
  return `${CACHE_PREFIX}-${name}`;
}

////////////////////
// PREFETCH CACHE //
////////////////////
const ASSET_MANIFEST_URL = `${self.location.protocol}//${self.location.host}/asset-manifest.json`;
const RESOURCES_TO_PRECACHE = [
  //   /^index\.html$/,
  /^index\.js$/,
  /^index\.css$/,
  /\.ico$/
];

/**
 * Check whether a given filename represents a resource
 * that should be precached
 *
 * @private
 * @param {string} fileName
 * @return {boolean}
 */
function _shouldPrecacheFile(fileName) {
  for (let i = 0; i < RESOURCES_TO_PRECACHE.length; i++)
    if (RESOURCES_TO_PRECACHE[i].test(fileName)) return true;
  return false;
}

export function precacheStaticAssets() {
  return fetch(ASSET_MANIFEST_URL)
    .then(response => response.json())
    .then(({ files }) => {
      let toPrefetch = Object.keys(files)
        .filter(_shouldPrecacheFile)
        .map(k => files[k]);
      toPrefetch.push("/");
      console.log("prefetch", toPrefetch);
      return caches
        .open(ALL_CACHES.prefetch)
        .then(cache => cache.addAll(toPrefetch));
    });
}
