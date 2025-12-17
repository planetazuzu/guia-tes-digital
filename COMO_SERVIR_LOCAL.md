# 🚀 Cómo Servir la Aplicación en Local

## Método Rápido (Recomendado)

```bash
cd /home/planetazuzu/protocolo-r-pido
npm run dev
```

Luego abre en tu navegador: **http://localhost:8080**

---

## ⚠️ Si el Puerto 8080 está Ocupado

### Opción 1: Usar otro puerto

```bash
npm run dev -- --port 3000
```

Luego abre: **http://localhost:3000**

### Opción 2: Liberar el puerto 8080

```bash
# Ver qué proceso usa el puerto
sudo lsof -i :8080

# Matar el proceso (reemplaza PID con el número que aparezca)
kill -9 PID

# O matar directamente
sudo lsof -ti:8080 | xargs kill -9
```

Luego ejecuta:
```bash
npm run dev
```

---

## 📍 URLs de Acceso

- **Local (mismo PC):** http://localhost:8080
- **Red local (otros dispositivos):** http://[TU-IP]:8080

Para encontrar tu IP:
```bash
hostname -I
```

---

## ✅ Verificación

Una vez iniciado el servidor, deberías ver:

```
VITE v5.4.19  ready in XXX ms

➜  Local:   http://localhost:8080/
➜  Network: http://[::]:8080/
```

---

## 🎯 Páginas para Probar

1. **Inicio:** http://localhost:8080/
2. **Manual Completo:** http://localhost:8080/manual
3. **Capítulo ejemplo:** http://localhost:8080/manual/parte-i-fundamentos/bloque-0-fundamentos/1.1.1

---

**¡Listo!** Solo ejecuta `npm run dev` y abre el navegador.
