# 🚀 Guía de Deployment - EMERGES TES

Esta guía explica cómo desplegar EMERGES TES en un servidor propio (VPS Ubuntu).

## 📋 Requisitos del Servidor

- **OS:** Ubuntu 20.04+ o similar
- **RAM:** Mínimo 512MB (recomendado 1GB+)
- **CPU:** 1 core mínimo
- **Espacio:** 2GB+ para aplicación y dependencias
- **Node.js:** v18+ (solo para build, no necesario en producción)
- **Nginx:** Para servir archivos estáticos

## 🔧 Instalación Inicial

### 1. Instalar Node.js (para build)

```bash
# Usar nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# O instalar directamente
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Instalar Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3. Clonar y preparar proyecto

```bash
# Crear directorio
sudo mkdir -p /var/www/emerges-tes
sudo chown $USER:$USER /var/www/emerges-tes

# Clonar repositorio (o subir archivos)
cd /var/www/emerges-tes
git clone <tu-repo> .

# Instalar dependencias
npm ci
```

## 🏗️ Build de Producción

```bash
# Build estático
npm run build

# Verificar que se creó el directorio dist/
ls -la dist/
```

El directorio `dist/` contiene todos los archivos estáticos listos para servir.

## ⚙️ Configuración Nginx

### 1. Crear configuración

```bash
sudo nano /etc/nginx/sites-available/emerges-tes
```

Copiar contenido de `nginx.conf.example` y ajustar:
- `server_name`: tu dominio
- `root`: ruta a `/var/www/emerges-tes/dist`

### 2. Activar sitio

```bash
sudo ln -s /etc/nginx/sites-available/emerges-tes /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar configuración
sudo systemctl reload nginx
```

### 3. Verificar permisos

```bash
sudo chown -R www-data:www-data /var/www/emerges-tes/dist
sudo chmod -R 755 /var/www/emerges-tes/dist
```

## 🔒 SSL con Let's Encrypt (Opcional pero Recomendado)

```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot --nginx -d emergestes.com -d www.emergestes.com

# Renovación automática (ya configurado)
sudo certbot renew --dry-run
```

## 🔄 Deploy Automático

### Opción 1: Script de deploy

```bash
# Hacer ejecutable
chmod +x deploy.sh

# Ejecutar deploy
./deploy.sh
```

### Opción 2: Deploy manual

```bash
# 1. Actualizar código
git pull origin main

# 2. Instalar dependencias (si hay cambios)
npm ci

# 3. Build
npm run build

# 4. Verificar
ls -la dist/

# 5. Nginx se sirve automáticamente desde dist/
# Si necesitas forzar recarga:
sudo systemctl reload nginx
```

## 📊 Monitoreo (Opcional)

### PM2 (solo si necesitas servidor Node.js)

```bash
# Instalar PM2
npm install -g pm2

# Usar solo para preview/desarrollo
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Configurar inicio automático
```

**Nota:** Para producción, Nginx sirviendo archivos estáticos es más eficiente que PM2.

## 🔍 Verificación Post-Deploy

1. **Verificar que la app carga:**
   ```bash
   curl http://localhost
   ```

2. **Verificar rutas SPA:**
   - Visitar `/herramientas`, `/farmacos`, etc.
   - Todas deben funcionar sin 404

3. **Verificar Service Worker:**
   - Abrir DevTools > Application > Service Workers
   - Debe estar registrado

4. **Verificar PWA:**
   - Debe poder instalarse en móvil
   - Debe funcionar offline

## 🐛 Troubleshooting

### Error 502 Bad Gateway
- Verificar que Nginx está corriendo: `sudo systemctl status nginx`
- Verificar logs: `sudo tail -f /var/log/nginx/error.log`

### Rutas 404 en SPA
- Verificar que `try_files` en nginx incluye `/index.html`
- Verificar que `base` en `vite.config.ts` es correcto

### Service Worker no funciona
- Verificar que `sw.js` está en `dist/`
- Verificar headers de cache en nginx

### Build falla
- Verificar Node.js versión: `node --version` (debe ser 18+)
- Limpiar cache: `rm -rf node_modules dist && npm ci && npm run build`

## 📝 Notas Importantes

- **No necesitas Node.js corriendo en producción** - Nginx sirve archivos estáticos
- **El build se hace en el servidor** - No subir `node_modules` ni `dist/` al repo
- **Actualizaciones:** Solo hacer `git pull` + `npm run build` + recargar Nginx
- **Backup:** Considerar hacer backup de `dist/` antes de cada deploy

## 🔗 Enlaces Útiles

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [Vite Build](https://vitejs.dev/guide/build.html)
