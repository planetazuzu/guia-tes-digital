# ✅ Resumen: Despliegue en Puerto 8607 Configurado

## 🎯 Lo que se ha configurado

### 1. **Configuración PM2 (Puerto 8607)**
- ✅ `ecosystem.config.js` actualizado para puerto 8607
- ✅ Configuración optimizada con límites de memoria
- ✅ Logs configurados en `./logs/`

### 2. **Script de Deploy Mejorado**
- ✅ `deploy.sh` con validaciones completas
- ✅ Soporte para `--skip-git` (útil para webhooks)
- ✅ Colores y logging mejorado
- ✅ Verificación de entorno (Node.js, npm, PM2)
- ✅ Verificación de build exitoso

### 3. **Auto-Deploy desde GitHub**
Tres opciones disponibles:

#### ⭐ Opción 1: GitHub Actions (Recomendado)
- ✅ Workflow creado: `.github/workflows/deploy.yml`
- ✅ Se ejecuta automáticamente en cada push a `main`
- ✅ Requiere configurar secrets en GitHub

#### Opción 2: Webhook de GitHub
- ✅ Script creado: `webhook-deploy.sh`
- ✅ Requiere servidor webhook en el servidor

#### Opción 3: Polling con Cron
- ✅ Documentado en `DEPLOYMENT_SERVER.md`
- ✅ Verifica cambios cada 5 minutos

### 4. **Documentación Completa**
- ✅ `DEPLOYMENT_SERVER.md` con guía paso a paso
- ✅ Solución de problemas
- ✅ Comandos útiles
- ✅ Checklist de despliegue

---

## 🚀 Próximos Pasos en el Servidor

### Paso 1: Configurar GitHub Actions (Recomendado)

1. **Añadir Secrets en GitHub:**
   - Ve a: `https://github.com/tu-usuario/guia-tes-digital/settings/secrets/actions`
   - Añade estos secrets:
     ```
     SERVER_HOST = tu-servidor-ip-o-dominio
     SERVER_USER = tu-usuario-ssh
     SERVER_SSH_KEY = (contenido de tu clave privada SSH)
     SERVER_PORT = 22 (o el puerto que uses)
     APP_PATH = /ruta/completa/a/tu/app
     ```

2. **Probar el workflow:**
   - Ve a: `Actions > Auto Deploy to Server > Run workflow`
   - O simplemente haz un push a `main`

### Paso 2: Configuración Inicial en el Servidor

```bash
# 1. Clonar repositorio
cd /ruta/donde/quieres/la/app
git clone https://github.com/tu-usuario/guia-tes-digital.git
cd guia-tes-digital

# 2. Hacer ejecutable el script
chmod +x deploy.sh

# 3. Primer deploy manual
./deploy.sh

# 4. Verificar que funciona
pm2 list
pm2 logs emerges-tes

# 5. Configurar PM2 para iniciar al boot
pm2 startup
pm2 save
```

### Paso 3: Verificar Acceso

- **Local:** `http://localhost:8607`
- **Red:** `http://tu-servidor-ip:8607`

---

## 📋 Archivos Creados/Modificados

1. ✅ `ecosystem.config.js` - Configuración PM2 (puerto 8607)
2. ✅ `deploy.sh` - Script de deploy mejorado
3. ✅ `.github/workflows/deploy.yml` - GitHub Actions workflow
4. ✅ `webhook-deploy.sh` - Script webhook alternativo
5. ✅ `DEPLOYMENT_SERVER.md` - Documentación completa
6. ✅ `package.json` - Actualizado `start:production` a puerto 8607

---

## 🔍 Comandos Rápidos

```bash
# Deploy manual completo
./deploy.sh

# Deploy sin git pull (para webhooks)
./deploy.sh --skip-git

# Ver estado PM2
pm2 list

# Ver logs
pm2 logs emerges-tes

# Reiniciar manualmente
pm2 restart emerges-tes
```

---

## ⚠️ Importante

1. **Secrets de GitHub:** No compartas tus secrets públicamente
2. **SSH Key:** Usa una clave SSH dedicada para GitHub Actions
3. **Firewall:** Asegúrate de que el puerto 8607 esté abierto
4. **Permisos:** Verifica que el usuario tenga permisos para ejecutar PM2

---

## 📞 Si algo falla

1. Revisar logs: `pm2 logs emerges-tes`
2. Verificar estado: `pm2 list`
3. Probar deploy manual: `./deploy.sh`
4. Verificar puerto: `netstat -tlnp | grep 8607`
5. Revisar documentación: `DEPLOYMENT_SERVER.md`

---

**Todo está listo para desplegar en el puerto 8607 con auto-actualización desde GitHub! 🎉**
