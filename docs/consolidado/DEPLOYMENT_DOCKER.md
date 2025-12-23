# 🐳 Guía de Despliegue con Docker

**Proyecto:** EMERGES TES - Protocolo Rápido  
**Fecha:** 2024-12-19  
**Puerto:** 8607

---

## 📋 Requisitos Previos

- **Docker** 20.10+ instalado
- **Docker Compose** 2.0+ instalado
- **Git** instalado
- **Puerto 8607** disponible

---

## 🚀 Despliegue Rápido

### Opción 1: Script de Deploy Automático (Recomendado)

```bash
# Ejecutar script de deploy con Docker
./deploy-docker.sh
```

Este script:
1. ✅ Actualiza código desde GitHub
2. ✅ Construye imagen Docker
3. ✅ Inicia contenedores
4. ✅ Verifica que todo funciona

---

### Opción 2: Comandos Manuales

#### Desarrollo

```bash
# Construir e iniciar contenedores
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

#### Producción

```bash
# Usar archivo de producción
docker-compose -f docker-compose.prod.yml up -d --build

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Detener
docker-compose -f docker-compose.prod.yml down
```

---

## 📁 Archivos Docker

### Dockerfile

**Ubicación:** `Dockerfile`

**Características:**
- Multi-stage build (optimizado)
- Node.js 18 Alpine (imagen ligera)
- Build de producción con Vite
- Servidor `serve` en puerto 8607
- Healthcheck configurado

**Etapas:**
1. **Dependencies:** Instala dependencias npm
2. **Build:** Construye aplicación con Vite
3. **Production:** Imagen final con solo archivos necesarios

---

### docker-compose.yml (Desarrollo)

**Ubicación:** `docker-compose.yml`

**Servicios:**
- `emerges-tes`: Aplicación principal
  - Puerto: `8607:8607`
  - Volúmenes: Código fuente montado (hot reload)
  - Red: `emerges-network`

**Uso:**
```bash
docker-compose up --build
```

---

### docker-compose.prod.yml (Producción)

**Ubicación:** `docker-compose.prod.yml`

**Características:**
- Sin volúmenes (imagen optimizada)
- Restart policy: `always`
- Healthcheck activado
- Logs configurados

**Uso:**
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` (opcional):

```env
NODE_ENV=production
PORT=8607
```

O usar variables en `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=8607
```

---

## 📊 Comandos Útiles

### Gestión de Contenedores

```bash
# Ver contenedores corriendo
docker ps

# Ver logs en tiempo real
docker-compose logs -f emerges-tes

# Ver logs de las últimas 100 líneas
docker-compose logs --tail=100 emerges-tes

# Reiniciar contenedor
docker-compose restart emerges-tes

# Detener y eliminar contenedores
docker-compose down

# Detener y eliminar contenedores + volúmenes
docker-compose down -v

# Eliminar imágenes también
docker-compose down --rmi all
```

### Build y Rebuild

```bash
# Rebuild sin caché
docker-compose build --no-cache

# Rebuild solo un servicio
docker-compose build emerges-tes

# Ver tamaño de imágenes
docker images | grep emerges-tes
```

### Inspección

```bash
# Ver configuración del servicio
docker-compose config

# Ver procesos dentro del contenedor
docker-compose exec emerges-tes ps aux

# Entrar al contenedor (shell)
docker-compose exec emerges-tes sh

# Ver uso de recursos
docker stats emerges-tes
```

---

## 🔄 Auto-Deploy desde GitHub

### Opción 1: GitHub Actions con Docker

Actualizar `.github/workflows/deploy.yml`:

```yaml
name: Auto Deploy Docker

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: emerges-tes:latest
      
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd ${{ secrets.APP_PATH }}
            ./deploy-docker.sh
```

---

### Opción 2: Webhook con Docker

Actualizar `webhook-deploy.sh`:

```bash
#!/bin/bash
cd /ruta/a/tu/app
./deploy-docker.sh
```

---

## 🐛 Solución de Problemas

### Error: "Port 8607 is already in use"

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :8607
# O
sudo netstat -tlnp | grep 8607

# Detener contenedor Docker
docker-compose down

# O cambiar puerto en docker-compose.yml
ports:
  - "8608:8607"  # Puerto externo diferente
```

### Error: "Cannot connect to Docker daemon"

```bash
# Verificar que Docker está corriendo
sudo systemctl status docker

# Iniciar Docker
sudo systemctl start docker

# Añadir usuario al grupo docker (si es necesario)
sudo usermod -aG docker $USER
# Luego cerrar sesión y volver a entrar
```

### Error: "Build failed"

```bash
# Rebuild sin caché
docker-compose build --no-cache

# Ver logs detallados
docker-compose build --progress=plain

# Verificar Dockerfile
docker build -t test-image .
```

### Contenedor se detiene inmediatamente

```bash
# Ver logs del contenedor
docker-compose logs emerges-tes

# Verificar healthcheck
docker inspect emerges-tes | grep -A 10 Health

# Ejecutar comando manualmente
docker-compose run --rm emerges-tes sh
```

---

## 📈 Optimización

### Tamaño de Imagen

**Estrategias:**
- ✅ Multi-stage build (ya implementado)
- ✅ Alpine Linux (imagen base ligera)
- ✅ Solo archivos necesarios en imagen final
- ✅ .dockerignore configurado

**Verificar tamaño:**
```bash
docker images | grep emerges-tes
```

### Caché de Build

Docker usa caché automáticamente. Para forzar rebuild completo:

```bash
docker-compose build --no-cache
```

---

## 🔒 Seguridad

### Buenas Prácticas

1. ✅ No exponer credenciales en Dockerfile
2. ✅ Usar variables de entorno para secrets
3. ✅ Usar usuario no-root en contenedor (si es posible)
4. ✅ Mantener imágenes actualizadas
5. ✅ Escanear imágenes con `docker scan`

### Escanear Vulnerabilidades

```bash
docker scan emerges-tes:latest
```

---

## 📝 Checklist de Despliegue

- [ ] Docker y Docker Compose instalados
- [ ] Puerto 8607 disponible
- [ ] Archivo `.env` configurado (opcional)
- [ ] `docker-compose.yml` revisado
- [ ] Build exitoso: `docker-compose build`
- [ ] Contenedor inicia: `docker-compose up -d`
- [ ] App accesible: `http://localhost:8607`
- [ ] Logs sin errores: `docker-compose logs`
- [ ] Healthcheck OK: `docker inspect`
- [ ] Auto-deploy configurado (opcional)

---

## 🆚 Comparación: Docker vs PM2

| Característica | Docker | PM2 |
|---------------|--------|-----|
| Aislamiento | ✅ Completo | ❌ No |
| Portabilidad | ✅ Alta | ⚠️ Media |
| Gestión | ✅ docker-compose | ✅ PM2 |
| Recursos | ⚠️ Más uso | ✅ Menos uso |
| Escalabilidad | ✅ Fácil | ⚠️ Manual |
| Dependencias | ✅ Incluidas | ❌ Requiere Node |

**Recomendación:** Usar Docker para producción, PM2 para desarrollo rápido.

---

## 📞 Soporte

Si tienes problemas:
1. Revisar logs: `docker-compose logs -f`
2. Verificar configuración: `docker-compose config`
3. Rebuild sin caché: `docker-compose build --no-cache`
4. Verificar puerto: `netstat -tlnp | grep 8607`

---

**Última actualización:** 2024-12-19
