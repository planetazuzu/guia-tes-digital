# ✅ Puerto Cambiado a 3000

**Fecha:** 2025-12-17

---

## 🔄 Cambio Realizado

El puerto **8080 estaba ocupado** por otra aplicación, por lo que se cambió el puerto por defecto a **3000**.

---

## 🚀 Cómo Acceder Ahora

### URL Principal

```
http://localhost:3000
```

### Desde Red Local

Tu IP es: **192.168.1.136**

```
http://192.168.1.136:3000
```

---

## 📝 Archivos Modificados

1. ✅ `vite.config.ts` - Puerto cambiado a 3000
2. ✅ `servir-local.sh` - Actualizado con nueva URL
3. ✅ `README.md` - Documentación actualizada

---

## 🎯 Iniciar Servidor

```bash
cd /home/planetazuzu/protocolo-r-pido
npm run dev
```

**Salida esperada:**
```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.136:3000/
```

---

## 🔧 Si Quieres Usar Otro Puerto

Puedes especificar un puerto diferente al iniciar:

```bash
npm run dev -- --port 4000
```

O cambiar permanentemente en `vite.config.ts`:
```typescript
port: 4000, // Tu puerto preferido
```

---

**✅ Listo:** Ahora usa el puerto 3000 en lugar de 8080
