# 🚀 Comandos para Push Manual

Como la autenticación SSH requiere interacción, ejecuta estos comandos **en tu terminal**:

## Opción 1: Usar el script automático

```bash
cd /home/planetazuzu/guia-tes
./scripts/push-produccion.sh
```

Este script:
1. Instala `sshpass` si es necesario
2. Copia tu clave SSH al servidor
3. Hace el push

---

## Opción 2: Comandos manuales paso a paso

### Paso 1: Instalar sshpass (si no está instalado)
```bash
sudo apt-get install sshpass
```

### Paso 2: Copiar clave SSH al servidor
```bash
cat ~/.ssh/id_ed25519.pub | sshpass -p "941259018a" ssh -o StrictHostKeyChecking=no root@207.180.226.141 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### Paso 3: Probar conexión
```bash
sshpass -p "941259018a" ssh -o StrictHostKeyChecking=no root@207.180.226.141 "echo 'Conexión exitosa'"
```

### Paso 4: Hacer push
```bash
cd /home/planetazuzu/guia-tes
git push production main
```

---

## Opción 3: Sin sshpass (más seguro a largo plazo)

### Paso 1: Copiar clave manualmente (te pedirá la contraseña)
```bash
ssh-copy-id root@207.180.226.141
# Contraseña: 941259018a
```

### Paso 2: Hacer push (ya no pedirá contraseña)
```bash
cd /home/planetazuzu/guia-tes
git push production main
```

---

## ✅ Estado Actual

- ✅ Clave SSH generada: `~/.ssh/id_ed25519`
- ✅ Commit listo: `6df53a2`
- ⏳ Push pendiente: ejecuta uno de los métodos arriba

---

## 🔒 Seguridad

Después del primer push exitoso, puedes:
1. Eliminar la contraseña del script (ya no será necesaria)
2. La clave SSH permitirá acceso sin contraseña

