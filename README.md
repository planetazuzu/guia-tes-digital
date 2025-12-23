# EMERGES TES - Protocolo Rápido

Aplicación PWA para protocolos médicos de emergencia.

## 🚑 Características

- **Protocolos de emergencia** (RCP, vía aérea, shock, etc.)
- **Vademécum de fármacos** con dosis, indicaciones y contraindicaciones
- **Calculadoras médicas** (Glasgow, perfusiones)
- **Guías de actuación en escena** (seguridad, ABCDE, triage)
- **Diseño optimizado para móvil** y uso nocturno
- **Funciona offline** (PWA)

## 🛠️ Stack Tecnológico

- **React 18** + **TypeScript 5.8**
- **Vite 5.4** - Build tool
- **Tailwind CSS 3.4** + **shadcn/ui** - UI Framework
- **React Router 6.3** - Navegación SPA
- **PWA** - Service Worker + Manifest

## 📦 Instalación

```bash
npm install
npm run dev      # Desarrollo (localhost:8096)
npm run build    # Producción
```

## 🚀 Despliegue Principal

- **Servidor:** PM2 en puerto 8607
- **Docker:** `docker-compose up --build`
- **CI/CD:** GitHub Actions

## 📚 Documentación

Ver `docs/consolidado/` para documentación completa:
- Despliegue (Docker, PM2, GitHub Actions)
- PWA y Service Worker
- Estado de funcionalidades
- Análisis técnico

## 📄 Licencia

[Especificar licencia si aplica]

---

**Desarrollado para Técnicos de Emergencias Sanitarias**
