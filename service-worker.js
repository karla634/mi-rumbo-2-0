const CACHE_NAME = "mi-rumbo-2-v1";

const ARCHIVOS = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Instalar y guardar los archivos principales
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARCHIVOS);
    })
  );

  self.skipWaiting();
});

// Activar la nueva versión y limpiar cachés anteriores
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nombres) =>
      Promise.all(
        nombres
          .filter((nombre) => nombre !== CACHE_NAME)
          .map((nombre) => caches.delete(nombre))
      )
    )
  );

  self.clients.claim();
});

// Consultar primero la red y usar la copia guardada si no hay conexión
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match("./index.html")
      )
    );
  }
});
