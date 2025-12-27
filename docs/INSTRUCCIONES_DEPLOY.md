# 🚀 Instrucciones para Configurar Git y Deploy

## 📋 Estado Actual

- ✅ Git ya está inicializado
- ✅ Rama principal: `main`
- ✅ Remoto `origin` configurado (GitHub)

## 🔧 Configurar Remoto de Producción

### Opción 1: Usar el Script (Recomendado)

```bash
# Reemplaza TU_IP con la IP real de tu servidor
./scripts/configurar-remoto-production.sh TU_IP
```

**Ejemplo:**
```bash
./scripts/configurar-remoto-production.sh 192.168.1.100
```

### Opción 2: Comando Manual

```bash
# Agregar remoto de producción
git remote add production root@TU_IP:/var/repos/emerges-tes.git

# O si ya existe, actualizarlo:
git remote set-url production root@TU_IP:/var/repos/emerges-tes.git
```

### Verificar Remotos

```bash
git remote -v
```

Debe mostrar algo como:
```
origin      https://github.com/planetazuzu/guia-tes-digital.git (fetch)
origin      https://github.com/planetazuzu/guia-tes-digital.git (push)
production  root@TU_IP:/var/repos/emerges-tes.git (fetch)
production  root@TU_IP:/var/repos/emerges-tes.git (push)
```

## 📦 Primer Push a Producción

Una vez configurado el remoto:

```bash
# 1. Agregar todos los cambios
git add .

# 2. Hacer commit
git commit -m "Implementación completa: Guías de Refuerzo y mejoras"

# 3. Push a producción
git push production main
```

## 📝 Notas Importantes

1. **Asegúrate de tener acceso SSH** al servidor antes de hacer push
2. **El repositorio en el servidor** debe existir en `/var/repos/emerges-tes.git`
3. **Si es la primera vez**, el servidor debe tener el repositorio bare inicializado:
   ```bash
   # En el servidor:
   mkdir -p /var/repos
   cd /var/repos
   git init --bare emerges-tes.git
   ```

## 🔍 Verificar Estado

```bash
# Ver estado de Git
git status

# Ver remotos configurados
git remote -v

# Ver ramas
git branch -a
```

## 🆘 Solución de Problemas

### Error: "remote production already exists"
```bash
git remote remove production
git remote add production root@TU_IP:/var/repos/emerges-tes.git
```

### Error: "Permission denied"
- Verifica que tienes acceso SSH al servidor
- Prueba: `ssh root@TU_IP`
- Verifica que la clave SSH está configurada

### Error: "Repository not found"
- Asegúrate de que el repositorio existe en el servidor
- Verifica la ruta: `/var/repos/emerges-tes.git`

