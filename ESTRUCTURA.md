# 📁 Estructura del Proyecto guia-tes

## Carpetas Principales

```
guia-tes/
├── 📂 assets/              # Recursos multimedia (imágenes, videos, slides)
│   ├── checklists_app/
│   ├── consent_privacy/
│   ├── images/             # Imágenes organizadas por bloques (bloque_00 a bloque_08)
│   ├── slides/             # Presentaciones organizadas por bloques
│   ├── templates/
│   └── videos/             # Videos organizados por bloques
│
├── 📂 src/                 # Código fuente de la aplicación React
│   ├── components/         # Componentes React organizados por categoría
│   │   ├── communication-scripts/
│   │   ├── content/
│   │   ├── decision-trees/
│   │   ├── drugs/
│   │   ├── layout/
│   │   ├── manual/
│   │   ├── material-checklists/
│   │   ├── procedures/
│   │   ├── references/
│   │   ├── shared/
│   │   ├── telephone-protocols/
│   │   ├── tools/
│   │   └── ui/
│   ├── data/               # Datos y configuraciones
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilidades de librerías
│   ├── pages/              # Páginas principales de la aplicación
│   └── utils/              # Funciones utilitarias
│
├── 📂 public/              # Archivos públicos estáticos
│   ├── assets/            # Recursos públicos (diagramas, infografías)
│   └── manual/            # Archivos Markdown del manual (93 archivos)
│       ├── BLOQUE_0_FUNDAMENTOS/
│       ├── BLOQUE_1_PROCEDIMIENTOS_BASICOS/
│       ├── BLOQUE_2_MATERIAL_E_INMOVILIZACION/
│       ├── BLOQUE_3_MATERIAL_SANITARIO_Y_OXIGENOTERAPIA/
│       ├── BLOQUE_4_SOPORTE_VITAL_BASICO_Y_RCP/
│       ├── BLOQUE_5_PROTOCOLOS_TRANSTELEFONICOS/
│       ├── BLOQUE_6_FARMACOLOGIA/
│       ├── BLOQUE_7_CONDUCCION_Y_SEGURIDAD_VIAL/
│       ├── BLOQUE_8_GESTION_OPERATIVA_Y_DOCUMENTACION/
│       ├── BLOQUE_9_MEDICINA_EMERGENCIAS_APLICADA/
│       ├── BLOQUE_10_SITUACIONES_ESPECIALES/
│       ├── BLOQUE_11_PROTOCOLOS_TRAUMA/
│       ├── BLOQUE_12_MARCO_LEGAL_ETICO_PROFESIONAL/
│       ├── BLOQUE_13_COMUNICACION_RELACION_PACIENTE/
│       ├── BLOQUE_14_SEGURIDAD_PERSONAL_SALUD_TES/
│       └── BLOQUE_15_ALTERACIONES_PSIQUIATRICAS_Y_CONTENCION/
│
├── 📂 scripts/             # Scripts de utilidad y automatización
├── 📂 docs/                # Documentación del proyecto
│   ├── archivo/
│   └── consolidado/
├── 📂 dist/                # Archivos compilados para producción
├── 📂 config_backup/       # Configuraciones de respaldo
└── 📂 node_modules/        # Dependencias de Node.js (no editar)
```

## Archivos Principales en la Raíz

- `package.json` - Configuración del proyecto y dependencias
- `vite.config.ts` - Configuración de Vite (build tool)
- `tsconfig.json` - Configuración de TypeScript
- `tailwind.config.ts` - Configuración de Tailwind CSS
- `index.html` - Punto de entrada HTML
- `manifest.json` - Configuración PWA
- Scripts de despliegue: `deploy.sh`, `deploy-docker.sh`
- Scripts de limpieza: `cleanup_project.sh`, `cleanup_completo.sh`
- Scripts de utilidad: `integrate_assets.py`, `generar_documentos_word.py`

## Estadísticas

- **Total archivos:** ~1,232
- **Total carpetas:** ~229
- **Archivos del manual:** 93 archivos .md
- **Componentes React:** ~85 componentes

## Cómo Ver la Estructura

1. **Desde la terminal:**
   ```bash
   ./mostrar-estructura.sh
   ```

2. **Desde el explorador de archivos:**
   - Abre la carpeta `/home/planetazuzu/guia-tes`
   - Si no ves carpetas ocultas, presiona `Ctrl+H` para mostrarlas

3. **Ver este archivo:**
   ```bash
   cat ESTRUCTURA.md
   ```

