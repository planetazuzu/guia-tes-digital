# ✅ Checklist Pre-Deploy

Usa este checklist antes de cada deploy para asegurar que todo funciona correctamente.

## 🔨 Build

- [ ] `npm ci` ejecutado sin errores
- [ ] `npm run build` completado exitosamente
- [ ] Directorio `dist/` creado y contiene archivos
- [ ] No hay errores en consola durante build
- [ ] Tamaño de `dist/` es razonable (<50MB típicamente)

## 📁 Archivos Críticos

- [ ] `dist/index.html` existe
- [ ] `dist/manifest.json` existe
- [ ] `dist/sw.js` existe (si usas service worker)
- [ ] Assets (JS, CSS) están en `dist/assets/`
- [ ] Archivos `.md` del manual están en `dist/manual/` (si aplica)

## 🌐 Nginx

- [ ] Configuración creada en `/etc/nginx/sites-available/`
- [ ] Symlink creado en `/etc/nginx/sites-enabled/`
- [ ] `sudo nginx -t` pasa sin errores
- [ ] Permisos correctos en directorio `dist/`
- [ ] Nginx reiniciado: `sudo systemctl reload nginx`

## 🔒 SSL (si aplica)

- [ ] Certificado SSL válido
- [ ] Redirección HTTP → HTTPS configurada
- [ ] Certbot renovación automática configurada

## 🧪 Pruebas Funcionales

### Desktop
- [ ] Página principal carga correctamente
- [ ] Navegación entre páginas funciona
- [ ] Calculadoras funcionan
- [ ] Búsqueda funciona
- [ ] Footer visible (desktop)
- [ ] Enlace de donaciones funciona

### Móvil
- [ ] Responsive funciona
- [ ] BottomNav visible y funcional
- [ ] Touch funciona correctamente
- [ ] PWA instalable
- [ ] Offline funciona (service worker)

### Rutas SPA
- [ ] `/herramientas` carga
- [ ] `/farmacos` carga
- [ ] `/manual` carga
- [ ] Rutas anidadas funcionan (ej: `/manual/parte/bloque/capitulo`)
- [ ] 404 redirige a página principal

## 🔍 Verificación Técnica

- [ ] Service Worker registrado (DevTools > Application)
- [ ] Cache funciona (offline mode)
- [ ] Console sin errores críticos
- [ ] Network tab: recursos cargan correctamente
- [ ] Lighthouse score >90 (Performance, PWA)

## 📊 Performance

- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Assets comprimidos (gzip)
- [ ] Imágenes optimizadas

## 🔐 Seguridad

- [ ] Headers de seguridad configurados (si aplica)
- [ ] HTTPS funcionando (si aplica)
- [ ] No hay información sensible en código cliente
- [ ] Service Worker no cachea datos sensibles

## 📱 PWA

- [ ] Manifest válido
- [ ] Iconos presentes y correctos
- [ ] Instalable en Android
- [ ] Instalable en iOS
- [ ] Splash screen funciona

## 🎯 Funcionalidad Específica

- [ ] Calculadoras: Glasgow, Parkland, Pediátricas, etc.
- [ ] Protocolos: RCP, Ictus, Shock
- [ ] Fármacos: búsqueda y visualización
- [ ] Manual: navegación y visualización

## 📝 Post-Deploy

- [ ] Monitorear logs: `sudo tail -f /var/log/nginx/error.log`
- [ ] Verificar métricas (si tienes analytics)
- [ ] Probar en diferentes dispositivos
- [ ] Documentar cualquier problema encontrado

## 🚨 Rollback Plan

Si algo falla:
1. Restaurar `dist/` desde backup
2. O hacer `git checkout <commit-anterior>` + rebuild
3. Verificar logs de Nginx
4. Revisar cambios recientes

---

**Fecha de verificación:** _______________  
**Verificado por:** _______________  
**Notas:** _______________
