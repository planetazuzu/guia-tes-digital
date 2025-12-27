// Script para limpiar Service Worker en desarrollo
// Ejecutar en consola del navegador: copiar y pegar todo este código

(async () => {
  console.log('🧹 Limpiando Service Worker...');
  
  // Desregistrar todos los SW
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log(`📋 Encontrados ${registrations.length} Service Worker(s)`);
  
  for (const registration of registrations) {
    const success = await registration.unregister();
    console.log(`✅ SW desregistrado: ${registration.scope}`, success);
  }
  
  // Limpiar todos los caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    console.log(`📦 Encontrados ${cacheNames.length} cache(s)`);
    
    for (const cacheName of cacheNames) {
      const deleted = await caches.delete(cacheName);
      console.log(`🗑️ Cache eliminado: ${cacheName}`, deleted);
    }
  }
  
  console.log('✨ Limpieza completada. Recargando página...');
  setTimeout(() => location.reload(), 500);
})();
