# ✅ Sistema de Despliegue Automático - CONFIGURADO

**Fecha:** 2024-12-30  
**Estado:** ✅ Funcionando correctamente

---

## 📋 Configuración Completada

- ✅ **Repositorio bare:** `/var/repos/emerges-tes.git`
- ✅ **Hook post-receive:** Configurado y ejecutable
- ✅ **Directorio de trabajo:** `/var/www/emerges-tes`
- ✅ **Build de producción:** `/var/www/emerges-tes/dist/`
- ✅ **Logs:** `/var/log/emerges-tes-deploy.log`
- ✅ **Node.js:** v18.19.1 instalado
- ✅ **Despliegue manual:** Probado y funcionando
- ✅ **Despliegue automático:** Probado y funcionando

---

## 🔄 Flujo Automático

```
1. git push production main (desde máquina local)
   ↓
2. Hook post-receive se ejecuta automáticamente
   ↓
3. git fetch origin main
   ↓
4. git reset --hard origin/main (checkout limpio)
   ↓
5. git clean -fd (limpiar archivos no rastreados)
   ↓
6. npm install (instalar dependencias)
   ↓
7. npm run build (construir aplicación)
   ↓
8. Aplicación actualizada en /var/www/emerges-tes/dist/
```

---

## 📊 Comandos Útiles

### Ver logs

```bash
# Últimas 50 líneas
tail -n 50 /var/log/emerges-tes-deploy.log

# En tiempo real
tail -f /var/log/emerges-tes-deploy.log

# Buscar errores
grep -i error /var/log/emerges-tes-deploy.log
```

### Verificar estado

```bash
# Estado del repositorio
cd /var/www/emerges-tes && git status

# Verificar build
ls -la /var/www/emerges-tes/dist/

# Ver archivos del build
ls -la /var/www/emerges-tes/dist/assets/ | head -10
```

### Despliegue manual (si es necesario)

```bash
cd /var/www/emerges-tes
git pull origin main
npm install
npm run build
```

---

## 🎯 Próximos Pasos (Opcional)

### Configurar Nginx para servir la aplicación

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    root /var/www/emerges-tes/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Configurar SSL (Let's Encrypt)

```bash
# Instalar certbot
apt-get install certbot python3-certbot-nginx

# Obtener certificado
certbot --nginx -d tu-dominio.com
```

---

## ✅ Verificación Final

El sistema está completamente funcional:

- ✅ Cada `git push production main` actualiza automáticamente la app
- ✅ Los logs registran todo el proceso
- ✅ El build se genera correctamente en `dist/`
- ✅ El sistema es robusto y maneja errores

**Sistema listo para producción** 🚀


