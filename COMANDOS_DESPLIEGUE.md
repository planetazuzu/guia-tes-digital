# 🚀 Comandos de Despliegue

## Estado Actual
✅ **Aplicación desplegada y corriendo**
- **Puerto:** 8607
- **URL:** http://localhost:8607
- **Gestor:** PM2
- **Estado:** Online

## Comandos Útiles

### Ver estado de la aplicación
```bash
pm2 list
pm2 status emerges-tes
pm2 info emerges-tes
```

### Ver logs
```bash
# Ver logs en tiempo real
pm2 logs emerges-tes

# Ver últimas 50 líneas
pm2 logs emerges-tes --lines 50 --nostream

# Ver solo errores
pm2 logs emerges-tes --err
```

### Gestionar la aplicación
```bash
# Reiniciar
pm2 restart emerges-tes

# Detener
pm2 stop emerges-tes

# Iniciar
pm2 start emerges-tes

# Eliminar del gestor PM2
pm2 delete emerges-tes
```

### Monitor en tiempo real
```bash
pm2 monit
```

### Guardar configuración PM2
```bash
pm2 save
```

## Opciones de Despliegue

### 1. Deploy con PM2 (Actual)
```bash
./deploy.sh --skip-git
```
- Puerto: 8607
- Gestión automática de procesos
- Reinicio automático

### 2. Deploy con Docker
```bash
./deploy-docker.sh --skip-git
```
- Puerto: 8607
- Contenedor aislado
- Opciones adicionales:
  - `--rebuild` - Reconstruir imagen desde cero
  - `--stop` - Detener contenedor
  - `--logs` - Ver logs

### 3. Servidor de preview (desarrollo)
```bash
npm run preview
```
- Puerto: 4173
- Solo para pruebas locales
- Se detiene al cerrar terminal

### 4. Script interactivo
```bash
./desplegar.sh
```
- Menú interactivo con todas las opciones

## Verificar que funciona

### Desde el navegador
Abre: http://localhost:8607

### Desde la terminal
```bash
curl http://localhost:8607
```

### Verificar puerto
```bash
netstat -tlnp | grep 8607
# o
ss -tlnp | grep 8607
```

## Solución de Problemas

### Si la aplicación no responde
```bash
# Ver logs de errores
pm2 logs emerges-tes --err

# Reiniciar
pm2 restart emerges-tes

# Verificar que el puerto esté libre
lsof -i :8607
```

### Si necesitas cambiar el puerto
Edita `ecosystem.config.cjs` y cambia el puerto en:
- `args: 'serve -s dist -l [NUEVO_PUERTO]'`
- `PORT: [NUEVO_PUERTO]`

Luego reinicia:
```bash
pm2 restart emerges-tes
```

### Si necesitas reconstruir
```bash
npm run build
pm2 restart emerges-tes
```

## Acceso Remoto

Si quieres acceder desde otra máquina en la misma red:

1. Verifica tu IP local:
```bash
hostname -I
# o
ip addr show
```

2. Accede desde otro dispositivo usando:
```
http://[TU_IP_LOCAL]:8607
```

**Nota:** Asegúrate de que el firewall permita conexiones en el puerto 8607.

