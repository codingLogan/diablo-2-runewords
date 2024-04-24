const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    try {
        await cache.addAll(resources);
    } catch (e) {
        console.log("Cache failed", {error: e})
        console.error("Failure building cache")
    }
};
  
try {
    let files = [
        "/index.html",
        "/runes.html",
        "/serviceWorkerApp.js"
    ]

    const basePath = '/diablo-2-runewords'

    files = files.map(file => basePath + file)

    self.addEventListener("install", (event) => {
        event.waitUntil(
            addResourcesToCache(files),
        );
    });

    const putInCache = async (request, response) => {
        const cache = await caches.open("v1");
        await cache.put(request, response);
    };
      
    const cacheFirst = async (request) => {
        const responseFromCache = await caches.match(request);
        if (responseFromCache) {
          return responseFromCache;
        }
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    };
      
    self.addEventListener("fetch", (event) => {
        event.respondWith(cacheFirst(event.request));
    });
      
} catch(e) {
    console.error("Error", e)
}
  