// Service Worker para PWA
// Cache First Strategy para funcionamiento offline

// Detectar si estamos en desarrollo
const isDevelopment = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1' ||
                      self.location.hostname === '[::1]';

// En desarrollo, desactivar el SW inmediatamente
if (isDevelopment) {
  self.addEventListener('install', (event) => {
    console.log('[SW] Development mode detected, skipping installation');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('[SW] Development mode detected, unregistering...');
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UNREGISTER' });
        });
      }).then(() => {
        // Desregistrar este SW
        return self.registration.unregister();
      })
    );
  });
  
  // No interceptar peticiones en desarrollo
  self.addEventListener('fetch', (event) => {
    // Dejar que todas las peticiones pasen directamente sin interceptar
    return;
  });
  
  // Salir temprano - no ejecutar el resto del código
  // (El código de abajo solo se ejecuta en producción)
}

// Versión del cache - Incrementar cuando hay cambios importantes
// v1.0.3: Eliminación definitiva de vendor-other - forzar actualización completa
const CACHE_VERSION = 'v1.0.3';
const CACHE_NAME = `emerges-tes-${CACHE_VERSION}`;
const RUNTIME_CACHE = `emerges-tes-runtime-${CACHE_VERSION}`;

// Detectar base path dinámicamente (para GitHub Pages)
const BASE_PATH = self.location.pathname.split('/').slice(0, -1).join('/') || '/';
const normalizePath = (path) => {
  if (path.startsWith('/')) {
    return BASE_PATH === '/' ? path : `${BASE_PATH}${path}`;
  }
  return `${BASE_PATH}/${path}`;
};

// Archivos estáticos a cachear en la instalación
const STATIC_ASSETS = [
  normalizePath('/'),
  normalizePath('/index.html'),
  normalizePath('/manifest.json'),
  normalizePath('/favicon.ico'),
  // Nota: Las imágenes en /assets/infografias/ se cachearán automáticamente
  // cuando se soliciten (cache-first strategy para imágenes)
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        // Cachear recursos uno por uno para manejar errores individualmente
        return Promise.allSettled(
          STATIC_ASSETS.map(url => 
            cache.add(url).catch(err => {
              console.warn(`[SW] Failed to cache ${url}:`, err);
              return null; // Continuar aunque falle uno
            })
          )
        );
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        self.skipWaiting(); // Activar inmediatamente
      })
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
        // Continuar aunque falle la instalación
        self.skipWaiting();
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Eliminar caches antiguos
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
    .then(() => self.clients.claim()) // Tomar control de todas las páginas
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar peticiones no GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar peticiones a APIs externas (si las hay)
  if (url.origin !== location.origin) {
    return;
  }

  // En desarrollo (localhost), ignorar peticiones de Vite HMR y módulos
  // Esto evita conflictos con el servidor de desarrollo
  if (
    url.hostname === 'localhost' || 
    url.hostname === '127.0.0.1' ||
    url.hostname === '[::1]'
  ) {
    // Ignorar peticiones de Vite (HMR, módulos ES, WebSocket, etc.)
    if (
      url.pathname.startsWith('/src/') ||
      url.pathname.startsWith('/@') ||
      url.pathname.startsWith('/node_modules/') ||
      url.pathname.includes('?t=') || // Vite añade timestamps
      url.pathname.endsWith('.tsx') ||
      url.pathname.endsWith('.ts') ||
      url.pathname.includes('node_modules') ||
      url.searchParams.has('import') || // Vite import queries
      url.protocol === 'ws:' || // WebSocket para HMR
      url.protocol === 'wss:' // WebSocket seguro
    ) {
      return; // Dejar que Vite maneje estas peticiones directamente
    }
  }

  // Estrategia: Cache First para assets estáticos
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.endsWith('.md') ||
    url.pathname.includes('/assets/infografias/') ||
    url.pathname.includes('/assets/')
  ) {
    event.respondWith(cacheFirst(request));
  } else {
    // Network First para HTML y otros
    event.respondWith(networkFirst(request));
  }
});

// Cache First Strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    // Si es una imagen, retornar una imagen placeholder
    if (request.destination === 'image') {
      return new Response('', { status: 404 });
    }
    throw error;
  }
}

// Network First Strategy
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    // Si no hay cache y estamos offline, retornar index.html para SPA
    if (request.mode === 'navigate') {
      const indexCache = await caches.open(CACHE_NAME);
      const indexHtml = await indexCache.match(normalizePath('/index.html'));
      if (indexHtml) {
        return indexHtml;
      }
    }
    throw error;
  }
}

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
});
