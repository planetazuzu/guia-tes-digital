# 🐳 Guía de Despliegue con Docker

Esta guía explica cómo desplegar EMERGES TES usando Docker en tu servidor.

---

## 📋 Requisitos Previos

- **Docker** instalado (versión 20.10+)
- **Docker Compose** instalado (versión 2.0+) o Docker con compose plugin
- **Git** instalado
- **Puerto 8607** disponible
- **Acceso SSH** al servidor (para auto-deploy)

---

## 🚀 Instalación Inicial

### 1. Instalar Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Verificar instalación
docker --version
docker compose version
```

### 2. Clonar el Repositorio

```bash
cd /ruta/donde/quieres/la/app
git clone https://github.com/tu-usuario/guia-tes-digital.git
cd guia-tes-digital
```

### 3. Configurar Script de Deploy

```bash
# Hacer ejecutable
chmod +x deploy-docker.sh

# Probar el script manualmente
./deploy-docker.sh
```

---

## 🔧 Despliegue Manual

### Opción 1: Script de Deploy (Recomendado)

```bash
./deploy-docker.sh
```

Este script:
1. ✅ Actualiza código desde GitHub (`git pull`)
2. ✅ Detiene contenedor existente
3. ✅ Construye imagen Docker
4. ✅ Inicia contenedor en puerto 8607

### Opción 2: Docker Compose Directo

```bash
# Construir e iniciar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Opción 3: Docker Directo

```bash
# Construir imagen
docker build -t emerges-tes:latest .

# Ejecutar contenedor
docker run -d \
  --name emerges-tes \
  -p 8607:8607 \
  --restart unless-stopped \
  emerges-tes:latest

# Ver logs
docker logs -f emerges-tes
```

---

## 🔄 Auto-Deploy desde GitHub

### Configurar GitHub Actions

1. **Añadir Secrets en GitHub:**
   - Ve a: `Settings > Secrets and variables > Actions`
   - Añade estos secrets:
     ```
     SERVER_HOST = tu-servidor-ip-o-dominio
     SERVER_USER = tu-usuario-ssh
     SERVER_SSH_KEY = (contenido de tu clave privada SSH)
     SERVER_PORT = 22 (o el puerto que uses)
     APP_PATH = /ruta/completa/a/tu/app
     ```

2. **El workflow ya está configurado:**
   - Archivo: `.github/workflows/deploy-docker.yml`
   - Se ejecuta automáticamente en cada push a `main`

3. **Probar manualmente:**
   - Ve a: `Actions > Auto Deploy Docker to Server > Run workflow`

---

## 🛠️ Comandos Útiles

### Gestión de Contenedores

```bash
# Ver estado
docker ps | grep emerges-tes

# Ver logs
docker logs emerges-tes

# Ver logs en tiempo real
docker logs -f emerges-tes

# Reiniciar contenedor
docker restart emerges-tes

# Detener contenedor
docker stop emerges-tes

# Iniciar contenedor
docker start emerges-tes

# Eliminar contenedor
docker rm -f emerges-tes
```

### Gestión de Imágenes

```bash
# Ver imágenes
docker images | grep emerges-tes

# Eliminar imagen antigua
docker rmi emerges-tes:latest

# Forzar rebuild
docker-compose build --no-cache
```

### Docker Compose

```bash
# Iniciar
docker-compose up -d

# Detener
docker-compose down

# Reiniciar
docker-compose restart

# Ver logs
docker-compose logs -f

# Rebuild forzado
docker-compose up -d --build --force-recreate
```

---

## 🔍 Verificación y Monitoreo

### Verificar que la App está Corriendo

```bash
# Verificar contenedor
docker ps | grep emerges-tes

# Verificar puerto
netstat -tlnp | grep 8607
# O
ss -tlnp | grep 8607

# Verificar salud
curl http://localhost:8607
```

### Health Check

El contenedor incluye un health check automático:

```bash
# Ver estado de salud
docker inspect emerges-tes | grep -A 10 Health
```

### Acceder a la Aplicación

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

## 🐛 Solución de Problemas

### Error: "Docker no está instalado"

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Error: "docker-compose: command not found"

```bash
# Docker Compose V2 (plugin)
docker compose version

# O instalar Docker Compose V1
sudo apt-get install docker-compose
```

### Error: "Puerto 8607 ya en uso"

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :8607
# O
sudo netstat -tlnp | grep 8607

# Detener contenedor existente
docker stop emerges-tes
docker rm emerges-tes
```

### Error: "Build falla"

```bash
# Limpiar caché de Docker
docker system prune -a

# Rebuild sin caché
docker-compose build --no-cache
```

### Error: "Contenedor no inicia"

```bash
# Ver logs detallados
docker logs emerges-tes

# Verificar que dist/ existe en la imagen
docker run --rm emerges-tes:latest ls -la /app/dist

# Verificar Dockerfile
cat Dockerfile
```

### La app no se actualiza automáticamente

1. **Verificar GitHub Actions:**
   - Ve a: `Actions` en GitHub
   - Ver si el workflow se ejecutó
   - Revisar logs

2. **Verificar que el script se ejecutó:**
   ```bash
   # En el servidor
   docker ps | grep emerges-tes
   docker logs emerges-tes | tail -20
   ```

---

## 📊 Ventajas de Docker

✅ **Aislamiento:** La app corre en su propio contenedor  
✅ **Consistencia:** Mismo entorno en dev y producción  
✅ **Fácil despliegue:** Un solo comando para desplegar  
✅ **Rollback fácil:** Volver a imagen anterior  
✅ **Escalabilidad:** Fácil de escalar horizontalmente  
✅ **Mantenimiento:** Actualizar es tan simple como rebuild  

---

## 🔄 Actualización Manual

```bash
# 1. Actualizar código
git pull origin main

# 2. Rebuild y reiniciar
./deploy-docker.sh --rebuild

# O manualmente:
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📝 Checklist de Despliegue

- [ ] Docker instalado y funcionando
- [ ] Docker Compose instalado
- [ ] Repositorio clonado
- [ ] `deploy-docker.sh` es ejecutable
- [ ] Primer deploy manual exitoso
- [ ] App accesible en `http://servidor:8607`
- [ ] Auto-deploy configurado (GitHub Actions)
- [ ] Health check funcionando
- [ ] Logs accesibles

---

## 🔐 Seguridad

- ✅ No exponer Docker socket públicamente
- ✅ Usar HTTPS si es posible (Let's Encrypt)
- ✅ Configurar firewall (solo puertos necesarios)
- ✅ Mantener Docker actualizado
- ✅ Usar secrets de GitHub para credenciales SSH
- ✅ Limitar acceso SSH (solo desde IPs conocidas)

---

## 📞 Soporte

Si tienes problemas:
1. Revisar logs: `docker logs emerges-tes`
2. Verificar estado: `docker ps | grep emerges-tes`
3. Probar deploy manual: `./deploy-docker.sh`
4. Verificar puerto: `netstat -tlnp | grep 8607`

---

**Última actualización:** 2024-12-19
