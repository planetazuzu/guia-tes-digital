# 🚀 Sistema de Despliegue Automático - EMERGES TES

Sistema de despliegue automático usando Git hooks (post-receive) en repositorio bare.

---

## 📋 ARQUITECTURA

```
┌─────────────────┐
│  Máquina Local  │
│  (desarrollo)   │
└────────┬────────┘
         │ git push production main
         ▼
┌─────────────────┐
│  Servidor       │
│                 │
│  /var/repos/    │
│  emerges-tes.git│ ◄── Repositorio bare
│    └─ hooks/    │
│       └─ post-  │
│          receive│ ◄── Hook que se ejecuta automáticamente
└────────┬────────┘
         │
         │ Ejecuta: checkout → npm install → npm run build
         ▼
┌─────────────────┐
│  /var/www/      │
│  emerges-tes/   │ ◄── Directorio de trabajo
│    ├─ .git/     │
│    ├─ src/      │
│    ├─ dist/     │ ◄── Build de producción (servir con Nginx)
│    └─ ...       │
└─────────────────┘
```

---

## 🔧 CONFIGURACIÓN INICIAL (Solo una vez)

### Paso 1: Subir el hook al servidor

Desde tu máquina local:

```bash
cd /home/planetazuzu/guia-tes

# Copiar el hook al servidor
scp scripts/deploy/post-receive root@207.180.226.141:/tmp/post-receive
```

### Paso 2: Configurar en el servidor

Conectarse al servidor:

```bash
ssh root@207.180.226.141
```

En el servidor, ejecutar:

```bash
# Variables
GIT_DIR="/var/repos/emerges-tes.git"
APP_DIR="/var/www/emerges-tes"
HOOK_FILE="$GIT_DIR/hooks/post-receive"

# 1. Copiar el hook
cp /tmp/post-receive "$HOOK_FILE"

# 2. Dar permisos de ejecución
chmod +x "$HOOK_FILE"

# 3. Verificar que el directorio de trabajo existe
if [ ! -d "$APP_DIR" ]; then
    mkdir -p "$APP_DIR"
    # Si el directorio está vacío, clonar
    if [ ! -d "$APP_DIR/.git" ]; then
        git clone "$GIT_DIR" "$APP_DIR"
    fi
fi

# 4. Crear archivo de logs
touch /var/log/emerges-tes-deploy.log
chmod 666 /var/log/emerges-tes-deploy.log
```

---

## 🧪 PROBAR EL DESPLIEGUE

### Desde tu máquina local:

```bash
cd /home/planetazuzu/guia-tes

# Hacer un cambio pequeño (opcional)
echo "# Test deploy $(date)" >> README.md
git add README.md
git commit -m "test: probar despliegue automático"

# Hacer push (esto activará el hook automáticamente)
git push production main
```

### En el servidor, verificar logs:

```bash
# Ver logs en tiempo real
tail -f /var/log/emerges-tes-deploy.log

# O ver las últimas líneas
tail -n 50 /var/log/emerges-tes-deploy.log
```

### Verificar que el build se creó:

```bash
# Verificar que dist/ existe
ls -la /var/www/emerges-tes/dist/

# Verificar que hay archivos HTML/JS
ls -la /var/www/emerges-tes/dist/assets/
```

---

## 📝 QUÉ HACE EL HOOK

El hook `post-receive` se ejecuta automáticamente después de cada `git push` y realiza:

1. **Detecta el push** en la rama `main`
2. **Hace fetch** de los últimos cambios
3. **Checkout limpio** (`git reset --hard`) para asegurar que el código coincide exactamente con el repositorio
4. **Limpia archivos** no rastreados (`git clean -fd`)
5. **Instala dependencias** (`npm install`)
6. **Construye la aplicación** (`npm run build`)
7. **Verifica** que el directorio `dist/` se creó correctamente
8. **Registra todo** en `/var/log/emerges-tes-deploy.log`

---

## 🔍 TROUBLESHOOTING

### El hook no se ejecuta

```bash
# Verificar que el hook existe y es ejecutable
ls -la /var/repos/emerges-tes.git/hooks/post-receive

# Debe mostrar: -rwxr-xr-x (permisos de ejecución)
# Si no, ejecutar:
chmod +x /var/repos/emerges-tes.git/hooks/post-receive
```

### Error: "npm: command not found"

```bash
# Instalar Node.js y npm en el servidor
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

### Error: "Permission denied"

```bash
# Verificar permisos del directorio de trabajo
ls -la /var/www/emerges-tes

# Ajustar propietario si es necesario
sudo chown -R $USER:$USER /var/www/emerges-tes
```

### El build falla

```bash
# Ver logs detallados
tail -f /var/log/emerges-tes-deploy.log

# Probar manualmente en el servidor
cd /var/www/emerges-tes
npm install
npm run build
```

### Verificar que el hook se ejecutó

```bash
# Ver los últimos logs
tail -n 100 /var/log/emerges-tes-deploy.log

# Buscar errores
grep -i error /var/log/emerges-tes-deploy.log
```

---

## 🔄 FLUJO COMPLETO DE DESPLIEGUE

```
1. Desarrollador hace cambios localmente
   └─ git add .
   └─ git commit -m "mensaje"
   └─ git push production main

2. Git envía cambios al servidor
   └─ Se activa el hook post-receive

3. Hook ejecuta automáticamente:
   ├─ git fetch origin main
   ├─ git reset --hard origin/main
   ├─ git clean -fd
   ├─ npm install
   ├─ npm run build
   └─ Verifica dist/

4. Aplicación actualizada en /var/www/emerges-tes/dist/
   └─ Servir con Nginx/Apache
```

---

## 📊 CONFIGURACIÓN NGINX (Opcional)

Si quieres servir la app con Nginx:

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

---

## ✅ VERIFICACIÓN FINAL

Después de configurar, verifica:

```bash
# 1. Hook existe y es ejecutable
test -x /var/repos/emerges-tes.git/hooks/post-receive && echo "✅ Hook OK" || echo "❌ Hook no ejecutable"

# 2. Directorio de trabajo existe
test -d /var/www/emerges-tes && echo "✅ Directorio OK" || echo "❌ Directorio no existe"

# 3. Logs se pueden escribir
test -w /var/log/emerges-tes-deploy.log && echo "✅ Logs OK" || echo "❌ Logs no escribibles"

# 4. Node.js instalado
command -v node >/dev/null && echo "✅ Node.js OK" || echo "❌ Node.js no instalado"
```

---

## 🎯 COMANDOS RÁPIDOS

```bash
# Ver logs en tiempo real
tail -f /var/log/emerges-tes-deploy.log

# Ver último despliegue
tail -n 50 /var/log/emerges-tes-deploy.log

# Forzar despliegue manual (desde servidor)
cd /var/www/emerges-tes
git pull origin main
npm install
npm run build

# Verificar build
ls -la /var/www/emerges-tes/dist/
```

---

**✅ Sistema listo para producción**

Cada `git push production main` desde tu máquina local actualizará automáticamente la aplicación en el servidor.

