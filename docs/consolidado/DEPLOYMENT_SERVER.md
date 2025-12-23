# 🚀 Guía de Despliegue en Servidor (Puerto 8607)

Esta guía explica cómo desplegar EMERGES TES en tu servidor propio con auto-actualización desde GitHub.

**Opciones de despliegue:**
- 🐳 **Docker** (Recomendado) - Ver sección [Despliegue con Docker](#despliegue-con-docker)
- 📦 **PM2 + Node.js** - Ver sección [Despliegue con PM2](#despliegue-con-pm2)

---

## 🐳 DESPLIEGUE CON DOCKER (Recomendado)

### Ventajas de Docker

- ✅ Aislamiento completo de dependencias
- ✅ Reproducible en cualquier entorno
- ✅ Fácil actualización y rollback
- ✅ Gestión simplificada con docker-compose
- ✅ Health checks automáticos
- ✅ Recursos limitados (CPU/memoria)

### Requisitos Previos Docker

- **Docker** 20.10+ instalado
- **Docker Compose** 2.0+ (o `docker compose` plugin)
- **Git** instalado
- **Puerto 8607** disponible

### Instalación Inicial con Docker

#### 1. Instalar Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verificar instalación
docker --version
docker compose version
```

#### 2. Clonar el repositorio

```bash
cd /ruta/donde/quieres/la/app
git clone https://github.com/tu-usuario/guia-tes-digital.git
cd guia-tes-digital
```

#### 3. Configurar Docker

```bash
# Hacer ejecutable el script de deploy
chmod +x deploy-docker.sh

# Verificar que los archivos Docker existen
ls -la Dockerfile docker-compose.yml
```

#### 4. Primer despliegue

```bash
# Deploy completo (con git pull + build + start)
./deploy-docker.sh

# O sin actualizar git (útil para webhooks)
./deploy-docker.sh --skip-git
```

### Comandos Docker Útiles

```bash
# Deploy completo
./deploy-docker.sh

# Reconstruir imagen desde cero
./deploy-docker.sh --rebuild

# Ver logs en tiempo real
./deploy-docker.sh --logs
# O directamente:
docker-compose logs -f

# Detener contenedor
./deploy-docker.sh --stop
# O directamente:
docker-compose down

# Ver estado
docker ps | grep emerges-tes

# Entrar al contenedor (debug)
docker exec -it emerges-tes sh

# Ver uso de recursos
docker stats emerges-tes
```

### Auto-Deploy con Docker

#### Opción 1: GitHub Actions + Docker

El workflow `.github/workflows/deploy.yml` puede actualizarse para usar Docker:

```yaml
- name: Desplegar con Docker
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SERVER_HOST }}
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SERVER_SSH_KEY }}
    script: |
      cd ${{ secrets.APP_PATH }}
      ./deploy-docker.sh --skip-git
```

#### Opción 2: Webhook + Docker

Actualizar `webhook-deploy.sh` para usar Docker:

```bash
# En webhook-deploy.sh, cambiar:
./deploy.sh --skip-git
# Por:
./deploy-docker.sh --skip-git
```

#### Opción 3: Cron + Docker

```bash
# Crear script
nano /usr/local/bin/check-github-updates-docker.sh
```

```bash
#!/bin/bash
cd /ruta/a/tu/app
git fetch origin
if [ $(git rev-parse HEAD) != $(git rev-parse origin/main) ]; then
  ./deploy-docker.sh
fi
```

```bash
chmod +x /usr/local/bin/check-github-updates-docker.sh

# Añadir a crontab
crontab -e
# Añadir:
*/5 * * * * /usr/local/bin/check-github-updates-docker.sh >> /var/log/docker-deploy.log 2>&1
```

### Verificación y Monitoreo Docker

```bash
# Verificar que el contenedor está corriendo
docker ps | grep emerges-tes

# Ver logs
docker-compose logs -f emerges-tes

# Ver health check
docker inspect emerges-tes | grep -A 10 Health

# Ver uso de recursos
docker stats emerges-tes

# Verificar puerto
netstat -tlnp | grep 8607
# O
ss -tlnp | grep 8607
```

### Acceder a la aplicación

- **Local:** `http://localhost:8607`
- **Red:** `http://tu-servidor-ip:8607`
- **Dominio:** `http://tu-dominio.com:8607`

### Solución de Problemas Docker

**Error: "Cannot connect to Docker daemon"**
```bash
# Añadir usuario al grupo docker
sudo usermod -aG docker $USER
# Reiniciar sesión o:
newgrp docker
```

**Error: "Port 8607 already in use"**
```bash
# Ver qué usa el puerto
sudo lsof -i :8607
# Detener contenedor anterior
docker-compose down
```

**Error: "Build failed"**
```bash
# Limpiar y reconstruir
docker-compose down
docker system prune -f
./deploy-docker.sh --rebuild
```

**Contenedor se detiene inmediatamente**
```bash
# Ver logs
docker-compose logs emerges-tes
# Verificar Dockerfile
cat Dockerfile
```

### Configuración Avanzada Docker

#### Usar docker-compose.prod.yml para producción

```bash
# Usar archivo de producción
docker-compose -f docker-compose.prod.yml up -d

# O actualizar deploy-docker.sh para usar este archivo
```

#### Variables de entorno personalizadas

Crear `.env`:
```env
NODE_ENV=production
PORT=8607
```

Y usar en `docker-compose.yml`:
```yaml
env_file:
  - .env
```

#### Límites de recursos

Ya configurado en `docker-compose.prod.yml`:
- CPU: 1.0 máximo, 0.5 reservado
- Memoria: 512MB máximo, 256MB reservado

---

## 📦 DESPLIEGUE CON PM2 (Alternativa)

---

## 📋 Requisitos Previos (PM2)

- **Servidor Linux** (Ubuntu/Debian recomendado)
- **Node.js 18+** instalado
- **npm** instalado
- **PM2** instalado globalmente
- **Git** instalado
- **Acceso SSH** al servidor
- **Puerto 8607** disponible

---

## 🔧 Instalación Inicial

### 1. Instalar Node.js y npm

```bash
# Usando nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# O usando apt (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Instalar PM2

```bash
npm install -g pm2
```

### 3. Clonar el repositorio

```bash
cd /ruta/donde/quieres/la/app
git clone https://github.com/tu-usuario/guia-tes-digital.git
cd guia-tes-digital
```

### 4. Configurar el script de deploy

```bash
# Hacer el script ejecutable
chmod +x deploy.sh

# Probar el script manualmente
./deploy.sh
```

---

## 🚀 Despliegue Manual

### Opción 1: Script de Deploy Rápido

```bash
./deploy.sh
```

Este script:
1. ✅ Actualiza código desde GitHub (`git pull`)
2. ✅ Instala dependencias (`npm ci`)
3. ✅ Construye la aplicación (`npm run build`)
4. ✅ Reinicia PM2 en puerto 8607

### Opción 2: Deploy sin actualizar Git

Si ya tienes el código actualizado:

```bash
./deploy.sh --skip-git
```

---

## 🔄 Auto-Deploy desde GitHub

Tienes **3 opciones** para auto-actualizar cuando haces push a GitHub:

### Opción 1: GitHub Actions (Recomendado) ⭐

**Ventajas:**
- ✅ No requiere configuración en el servidor
- ✅ Ejecuta el build en GitHub (más rápido)
- ✅ Historial de deployments en GitHub
- ✅ Notificaciones automáticas

**Configuración:**

1. **Añadir secrets en GitHub:**
   - Ve a: `Settings > Secrets and variables > Actions`
   - Añade estos secrets:
     - `SERVER_HOST`: IP o dominio de tu servidor
     - `SERVER_USER`: Usuario SSH (ej: `root` o `ubuntu`)
     - `SERVER_SSH_KEY`: Clave privada SSH (contenido completo)
     - `SERVER_PORT`: Puerto SSH (opcional, default: 22)
     - `APP_PATH`: Ruta completa donde está la app (ej: `/home/usuario/guia-tes-digital`)

2. **El workflow ya está configurado:**
   - Archivo: `.github/workflows/deploy.yml`
   - Se ejecuta automáticamente en cada push a `main`

3. **Probar manualmente:**
   - Ve a: `Actions > Auto Deploy to Server > Run workflow`

**Nota:** El workflow usa `deploy.sh --skip-git` porque el código ya está en el servidor.

---

### Opción 2: Webhook de GitHub

**Ventajas:**
- ✅ Ejecuta directamente en el servidor
- ✅ Más control sobre el proceso

**Configuración:**

1. **Instalar dependencias en el servidor:**
   ```bash
   sudo apt-get install -y jq  # Para parsear JSON
   ```

2. **Configurar webhook handler:**
   ```bash
   # Editar webhook-deploy.sh
   nano webhook-deploy.sh
   
   # Cambiar:
   SECRET="tu-secret-seguro-aqui"
   APP_PATH="/ruta/completa/a/tu/app"
   ```

3. **Crear servicio webhook (usando Node.js simple o nginx):**

   **Opción A: Servidor Node.js simple (webhook-server.js):**
   ```javascript
   const http = require('http');
   const { exec } = require('child_process');
   const crypto = require('crypto');
   
   const SECRET = 'tu-secret';
   const PORT = 9000;
   const APP_PATH = '/ruta/a/tu/app';
   
   http.createServer((req, res) => {
     if (req.method === 'POST' && req.url === '/webhook') {
       let body = '';
       req.on('data', chunk => body += chunk);
       req.on('end', () => {
         const payload = JSON.parse(body);
         if (payload.ref === 'refs/heads/main') {
           exec(`cd ${APP_PATH} && ./deploy.sh --skip-git`, (error, stdout, stderr) => {
             console.log(stdout);
             if (error) console.error(stderr);
           });
         }
         res.writeHead(200);
         res.end('OK');
       });
     } else {
       res.writeHead(404);
       res.end('Not Found');
     }
   }).listen(PORT);
   ```

   **Ejecutar con PM2:**
   ```bash
   pm2 start webhook-server.js --name webhook-deploy
   pm2 save
   ```

4. **Configurar webhook en GitHub:**
   - Ve a: `Settings > Webhooks > Add webhook`
   - **Payload URL:** `http://tu-servidor:9000/webhook`
   - **Content type:** `application/json`
   - **Secret:** (el mismo que configuraste en el script)
   - **Events:** Solo `push`

---

### Opción 3: Polling con Cron

**Ventajas:**
- ✅ Simple, no requiere configuración externa
- ✅ Funciona sin abrir puertos adicionales

**Configuración:**

1. **Crear script de polling:**
   ```bash
   nano /usr/local/bin/check-github-updates.sh
   ```

   ```bash
   #!/bin/bash
   cd /ruta/a/tu/app
   git fetch origin
   if [ $(git rev-parse HEAD) != $(git rev-parse origin/main) ]; then
     ./deploy.sh
   fi
   ```

2. **Hacer ejecutable:**
   ```bash
   chmod +x /usr/local/bin/check-github-updates.sh
   ```

3. **Configurar cron (cada 5 minutos):**
   ```bash
   crontab -e
   ```

   Añadir:
   ```
   */5 * * * * /usr/local/bin/check-github-updates.sh >> /var/log/github-poll.log 2>&1
   ```

---

## 🔍 Verificación y Monitoreo

### Verificar que la app está corriendo

```bash
# Ver estado de PM2
pm2 list

# Ver logs en tiempo real
pm2 logs emerges-tes

# Ver monitor de recursos
pm2 monit

# Verificar que el puerto 8607 está escuchando
netstat -tlnp | grep 8607
# O
ss -tlnp | grep 8607
```

### Acceder a la aplicación

- **Local:** `http://localhost:8607`
- **Red:** `http://tu-servidor-ip:8607`
- **Dominio:** `http://tu-dominio.com:8607`

---

## 🔒 Configurar Nginx como Reverse Proxy (Opcional)

Si quieres usar un dominio y puerto 80/443:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:8607;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Luego:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🛠️ Comandos Útiles

### PM2

```bash
# Iniciar aplicación
pm2 start ecosystem.config.js

# Reiniciar aplicación
pm2 restart emerges-tes

# Detener aplicación
pm2 stop emerges-tes

# Ver logs
pm2 logs emerges-tes

# Ver logs de las últimas 100 líneas
pm2 logs emerges-tes --lines 100

# Reiniciar automáticamente al reiniciar el servidor
pm2 startup
pm2 save
```

### Deploy

```bash
# Deploy completo (con git pull)
./deploy.sh

# Deploy sin git pull (útil para webhooks)
./deploy.sh --skip-git

# Ver qué haría el deploy sin ejecutarlo
bash -n deploy.sh  # Verifica sintaxis
```

### Git

```bash
# Verificar estado
git status

# Ver últimos commits
git log --oneline -5

# Forzar actualización
git fetch origin
git reset --hard origin/main
```

---

## 🐛 Solución de Problemas

### Error: "PM2 no está instalado"

```bash
npm install -g pm2
```

### Error: "Puerto 8607 ya en uso"

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :8607
# O
sudo netstat -tlnp | grep 8607

# Detener PM2 y reiniciar
pm2 stop emerges-tes
pm2 restart emerges-tes
```

### Error: "Build falla"

```bash
# Limpiar y reinstalar
rm -rf node_modules dist
npm ci
npm run build
```

### Error: "Git pull falla"

```bash
# Verificar permisos
ls -la .git

# Verificar remoto
git remote -v

# Forzar actualización
git fetch origin
git reset --hard origin/main
```

### La app no se actualiza automáticamente

1. **Verificar GitHub Actions:**
   - Ve a: `Actions` en GitHub
   - Ver si el workflow se ejecutó
   - Revisar logs

2. **Verificar webhook (si usas):**
   - Ve a: `Settings > Webhooks` en GitHub
   - Ver últimos deliveries
   - Revisar logs del servidor

3. **Verificar cron (si usas):**
   ```bash
   tail -f /var/log/github-poll.log
   ```

---

## 📝 Checklist de Despliegue

- [ ] Node.js 18+ instalado
- [ ] PM2 instalado globalmente
- [ ] Repositorio clonado
- [ ] `deploy.sh` es ejecutable
- [ ] `ecosystem.config.js` configurado para puerto 8607
- [ ] Primer deploy manual exitoso
- [ ] App accesible en `http://servidor:8607`
- [ ] Auto-deploy configurado (GitHub Actions, webhook, o cron)
- [ ] PM2 configurado para iniciar al boot (`pm2 startup`)
- [ ] Logs configurados y accesibles

---

## 🔐 Seguridad

- ✅ No exponer secrets en el código
- ✅ Usar HTTPS si es posible (Let's Encrypt)
- ✅ Configurar firewall (solo puertos necesarios)
- ✅ Mantener Node.js y dependencias actualizadas
- ✅ Usar secrets de GitHub para credenciales SSH
- ✅ Limitar acceso SSH (solo desde IPs conocidas)

---

## 📞 Soporte

Si tienes problemas:
1. Revisar logs: `pm2 logs emerges-tes`
2. Verificar estado: `pm2 list`
3. Probar deploy manual: `./deploy.sh`
4. Verificar puerto: `netstat -tlnp | grep 8607`

---

**Última actualización:** 2025-12-23
