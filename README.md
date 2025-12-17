# EMERGES TES - Protocolo Rápido

Aplicación web móvil-first de referencia rápida para Técnicos de Emergencias Sanitarias (TES). Guía de protocolos médicos de emergencias, fármacos, calculadoras y herramientas para uso en ambulancias y situaciones de emergencia.

## 🚑 Características

- **Protocolos de emergencia** (RCP, vía aérea, shock, etc.)
- **Vademécum de fármacos** con dosis, indicaciones y contraindicaciones
- **Calculadoras médicas** (Glasgow, perfusiones)
- **Guías de actuación en escena** (seguridad, ABCDE, triage)
- **Diseño optimizado para móvil** y uso nocturno
- **Funciona offline** (PWA)

## 🛠️ Tecnologías

Este proyecto está construido con:

- **Vite** - Build tool y dev server
- **TypeScript** - Type safety
- **React** - Framework UI
- **shadcn/ui** - Componentes UI
- **Tailwind CSS** - Estilos
- **React Router** - Navegación

## 📦 Instalación

### Requisitos

- Node.js 18+ y npm (o yarn/pnpm)
- Recomendado: usar [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para gestionar versiones de Node

### Pasos

```sh
# 1. Clonar el repositorio
git clone <YOUR_GIT_URL>

# 2. Navegar al directorio del proyecto
cd protocolo-r-pido

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:8096`

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo con hot-reload
- `npm run build` - Construye la aplicación para producción
- `npm run build:dev` - Construye en modo desarrollo
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter

## 📱 Despliegue

### Build de Producción

```sh
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos listos para desplegar en cualquier servidor web estático.

### Opciones de Despliegue

- **Vercel** - `vercel deploy`
- **Netlify** - Arrastrar carpeta `dist/` o conectar repositorio
- **GitHub Pages** - Configurar GitHub Actions
- **Servidor propio** - Subir carpeta `dist/` a servidor web

## 📂 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── drugs/     # Componentes de fármacos
│   ├── layout/    # Header, navegación
│   ├── procedures/ # Componentes de protocolos
│   ├── shared/    # Componentes compartidos
│   ├── tools/     # Calculadoras
│   └── ui/        # Componentes base shadcn/ui
├── data/          # Datos estáticos (protocolos, fármacos)
├── hooks/         # Custom hooks
├── lib/           # Utilidades
└── pages/         # Páginas principales
```

## ⚠️ Disclaimer Médico

Esta aplicación es una **herramienta de referencia** para profesionales sanitarios. No reemplaza el criterio clínico ni la formación adecuada. El contenido debe ser validado por profesionales médicos antes de su uso en situaciones reales.

## 📄 Licencia

[Especificar licencia si aplica]

## 🤝 Contribuciones

[Instrucciones de contribución si aplica]

---

**Desarrollado para Técnicos de Emergencias Sanitarias**
