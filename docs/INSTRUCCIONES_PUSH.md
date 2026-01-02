# 🚀 Instrucciones para Push a Producción

## Estado Actual
- ✅ Commit realizado: `6df53a2`
- ⏳ Push pendiente: requiere autenticación SSH

## Opción 1: Configurar Clave SSH (Recomendado)

### Paso 1: Generar clave SSH (si no tienes una)
```bash
ssh-keygen -t ed25519 -C "guia-tes-$(date +%Y%m%d)"
# Presiona Enter para usar la ubicación por defecto
# Opcional: agrega una frase de contraseña
```

### Paso 2: Copiar clave al servidor
```bash
ssh-copy-id root@207.180.226.141
```

Si `ssh-copy-id` no está disponible:
```bash
cat ~/.ssh/id_ed25519.pub | ssh root@207.180.226.141 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'
```

### Paso 3: Probar conexión
```bash
ssh root@207.180.226.141 "echo 'Conexión exitosa'"
```

### Paso 4: Hacer push
```bash
cd /home/planetazuzu/guia-tes
git push production main
```

---

## Opción 2: Usar Script Automático

```bash
cd /home/planetazuzu/guia-tes
./scripts/configurar-ssh-push.sh
```

El script te guiará paso a paso.

---

## Opción 3: Autenticación por Contraseña (Temporal)

Si necesitas hacer push inmediatamente sin configurar SSH:

```bash
cd /home/planetazuzu/guia-tes
GIT_SSH_COMMAND='ssh -o PreferredAuthentications=password' git push production main
```

**Nota:** Te pedirá la contraseña cada vez. No es recomendable para uso continuo.

---

## Verificar Repositorio en Servidor

Si el repositorio no existe en el servidor, créalo:

```bash
ssh root@207.180.226.141
mkdir -p /var/repos
cd /var/repos
git init --bare emerges-tes.git
chown -R root:root emerges-tes.git
```

---

## Troubleshooting

### Error: "Permission denied (publickey,password)"
- Verifica que la clave SSH esté en el servidor
- Verifica permisos: `chmod 600 ~/.ssh/authorized_keys` en el servidor

### Error: "Repository not found"
- Verifica que el repositorio exista en `/var/repos/emerges-tes.git`
- Verifica permisos del directorio

### Error: "Connection refused"
- Verifica que el servidor esté accesible: `ping 207.180.226.141`
- Verifica que el puerto SSH esté abierto: `telnet 207.180.226.141 22`

---

## Estado del Repositorio

```bash
# Ver commits pendientes
git log origin/main..main

# Ver remotos
git remote -v

# Ver estado
git status
```

