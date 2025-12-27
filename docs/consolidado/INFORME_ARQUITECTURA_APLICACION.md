# 📋 Informe de Arquitectura - EMERGES TES

**Fecha de análisis:** 2025-12-23  
**Analista:** Arquitecto Senior de Aplicaciones Web y Móviles  
**Versión de la aplicación:** 1.0.0

---

## 1️⃣ Visión General de la Aplicación

### Tipo de Aplicación
**Aplicación Web Progresiva (PWA)** de consulta rápida para profesionales sanitarios de emergencias.

### Funcionalidad Principal
Guía digital de protocolos médicos de emergencias prehospitalarias diseñada específicamente para **Técnicos de Emergencias Sanitarias (TES)**.

### Problema que Resuelve
- **Acceso rápido a información crítica** durante emergencias médicas
- **Consulta offline** de protocolos, fármacos y calculadoras médicas
- **Estandarización de procedimientos** según guías oficiales (ERC, AHA, SEMES)
- **Reducción de errores** mediante acceso inmediato a dosis, contraindicaciones y pasos de protocolos
- **Formación continua** con manual completo estructurado y navegable

### Usuario Final
**Técnicos de Emergencias Sanitarias (TES)** que trabajan en:
- Ambulancias de emergencias
- Servicios de urgencias prehospitalarias
- Equipos de respuesta rápida
- Situaciones de emergencia donde el acceso rápido a información puede salvar vidas

**Contexto de uso:**
- Ambiente de alta presión y estrés
- Necesidad de información inmediata (< 30 segundos)
- Uso frecuente en condiciones adversas (móvil, offline, bajo presión)
- Requisito de precisión absoluta (errores pueden ser críticos)

---

## 2️⃣ Estructura Técnica

### Stack Tecnológico

**Frontend Framework:**
- **React 18.3.1** con TypeScript
- **Vite 5.4.19** como build tool (SWC para compilación rápida)
- **React Router DOM 6.30.1** para navegación SPA

**UI Framework:**
- **Tailwind CSS 3.4.17** para estilos
- **Radix UI** (componentes headless accesibles)
- **shadcn/ui** (componentes pre-construidos sobre Radix)
- **Lucide React** para iconografía

**Estado y Datos:**
- **TanStack Query (React Query) 5.83.0** para gestión de estado del servidor (aunque no hay backend)
- **localStorage** para persistencia de favoritos
- **sessionStorage** para historial de búsquedas
- **Datos estáticos en TypeScript** (`src/data/*.ts`)

**Procesamiento de Contenido:**
- **react-markdown 10.1.0** para renderizado de Markdown
- **remark/rehype** plugins para procesamiento avanzado de Markdown
- **highlight.js** para syntax highlighting en código

**PWA:**
- **Service Worker** personalizado (`public/sw.js`)
- **Manifest.json** configurado para instalación
- **Workbox** no usado (Service Worker manual)

**Temas:**
- **next-themes 0.3.0** para gestión de temas (claro/oscuro/sistema)

### Organización de Carpetas

```
guia-tes/
├── public/
│   ├── manual/              # 94 archivos .md organizados en bloques temáticos
│   ├── assets/infografias/  # Imágenes médicas e infografías
│   ├── sw.js                # Service Worker
│   └── manifest.json        # PWA manifest
├── src/
│   ├── components/          # Componentes React organizados por dominio
│   │   ├── layout/         # Header, Footer, BottomNav, SearchModal, etc.
│   │   ├── drugs/          # Componentes de fármacos
│   │   ├── tools/          # Calculadoras médicas
│   │   ├── procedures/     # Tarjetas de protocolos
│   │   ├── content/        # MarkdownViewer
│   │   ├── decision-trees/ # Árboles de decisión interactivos
│   │   └── ui/             # Componentes UI base (shadcn)
│   ├── pages/              # 25 páginas principales
│   ├── data/               # 14 archivos de datos estáticos TypeScript
│   ├── hooks/              # 6 hooks personalizados
│   ├── lib/                # Utilidades (cn, utils)
│   └── utils/              # Utilidades específicas (markdownUtils)
└── docs/                   # Documentación del proyecto
```

### Componentes Principales

**Layout (Estructura Global):**
- `Header.tsx`: Barra superior fija con logo, búsqueda, menú, estado online/offline
- `BottomNav.tsx`: Navegación inferior con 6 iconos principales
- `Footer.tsx`: Información legal y enlaces
- `SearchModal.tsx`: Modal de búsqueda global con filtros
- `MenuSheet.tsx`: Menú lateral deslizable con acceso a todas las secciones
- `InstallBanner.tsx`: Banner para instalar PWA
- `UpdateNotification.tsx`: Notificación de actualizaciones del Service Worker

**Páginas Principales (25 páginas):**
1. `Index.tsx` - Home con acceso rápido a emergencias críticas
2. `SoporteVital.tsx` - Protocolos de soporte vital básico
3. `Patologias.tsx` - Patologías por sistemas (respiratorias, circulatorias, etc.)
4. `Escena.tsx` - Seguridad, ABCDE, Triage, Inmovilización
5. `Farmacos.tsx` - Vademécum completo con búsqueda y filtros
6. `Herramientas.tsx` - Calculadoras, tablas de perfusión, códigos
7. `Material.tsx` - Checklists de material sanitario
8. `Telefono.tsx` - Protocolos transtelefónicos
9. `Comunicacion.tsx` - Guiones de comunicación
10. `ManualIndex.tsx` - Índice navegable del manual completo
11. `ManualViewer.tsx` - Visor de capítulos del manual (Markdown)
12. `RCP.tsx` - Protocolo RCP detallado (adulto/pediátrico)
13. `Ictus.tsx` - Código Ictus
14. `Shock.tsx` - Protocolo de Shock
15. `ViaAerea.tsx` - Vía Aérea y OVACE
16. `Favoritos.tsx` - Lista de favoritos del usuario
17. `Historial.tsx` - Historial de búsquedas recientes
18. `Ajustes.tsx` - Configuración (tema, limpieza de datos)
19. `Acerca.tsx` - Información sobre la app
20. `GaleriaImagenes.tsx` - Galería de infografías
21. `Privacidad.tsx` - Política de privacidad
22. `DescargoResponsabilidad.tsx` - Descargo de responsabilidad médica
23. `AvisoLegal.tsx` - Aviso legal
24. `NotFound.tsx` - Página 404

**Componentes de Dominio:**
- `DrugCard.tsx` - Tarjeta de fármaco con información completa
- `TESMedicationCard.tsx` - Medicación específica TES
- `ProcedureCard.tsx` - Tarjeta de protocolo con pasos
- `MarkdownViewer.tsx` - Visor de archivos Markdown con procesamiento avanzado
- `DecisionTreeViewer.tsx` - Árboles de decisión interactivos
- `GlasgowCalculator.tsx` - Calculadora de Escala de Glasgow
- `ParklandCalculator.tsx` - Calculadora de fórmula de Parkland (quemaduras)
- `PediatricDoseCalculator.tsx` - Calculadora de dosis pediátricas
- `RCPTimer.tsx` - Temporizador para RCP
- Y 5 calculadoras más...

### Gestión del Estado

**Estado Global:**
- **NO hay estado global** (no usa Redux, Zustand, Context API global)
- Estado local por componente con `useState`
- `TanStack Query` configurado pero no usado activamente (no hay backend)

**Persistencia Local:**
- **localStorage**: Favoritos (`emerges-tes-favorites`)
- **sessionStorage**: Historial de búsquedas (`emerges-tes-search-history`)
- **localStorage**: Banner PWA cerrado (`pwa-install-dismissed`)

**Hooks Personalizados:**
1. `useFavorites.ts` - Gestión de favoritos (CRUD completo)
2. `useSearchHistory.ts` - Historial de búsquedas (máx 20 items, evita duplicados)
3. `usePWAInstall.ts` - Detección y promoción de instalación PWA
4. `useServiceWorker.ts` - Gestión de actualizaciones del Service Worker
5. `use-mobile.tsx` - Detección de dispositivo móvil
6. `use-toast.ts` - Sistema de notificaciones toast

### Comunicación con Backend / Base de Datos

**NO HAY BACKEND:**
- Aplicación completamente estática
- Sin API REST, GraphQL, ni WebSockets
- Sin base de datos (ni SQL ni NoSQL)
- Sin autenticación ni autorización
- Sin sincronización de datos

**Fuentes de Datos:**
- **Archivos TypeScript estáticos** en `src/data/`:
  - `procedures.ts` - Protocolos médicos
  - `drugs.ts` - Vademécum de fármacos
  - `tes-medication.ts` - Medicación específica TES
  - `calculators.ts` - Datos de calculadoras
  - `manual-index.ts` - Índice completo del manual (94 capítulos)
  - `decision-trees.ts` - Árboles de decisión
  - `telephone-protocols.ts` - Protocolos transtelefónicos
  - `communication-scripts.ts` - Guiones de comunicación
  - `material-checklists.ts` - Checklists de material
  - Y 5 archivos más...

- **Archivos Markdown** en `public/manual/`:
  - 94 archivos `.md` organizados en 15 bloques temáticos
  - Cargados dinámicamente mediante `fetch()` en `MarkdownViewer`
  - Procesados con `react-markdown` y plugins

**Estrategia de Carga:**
- **Code Splitting**: Lazy loading de páginas con `React.lazy()`
- **Carga bajo demanda**: Archivos Markdown se cargan solo cuando se visualizan
- **Caché del navegador**: Service Worker cachea recursos estáticos

---

## 3️⃣ Flujo de Usuario

### Pantalla Inicial (Home - `/`)

**Al entrar, el usuario ve:**

1. **Barra de búsqueda** (botón clickeable que abre modal)
   - Placeholder: "Buscar protocolo, fármaco, calculadora..."
   - Acceso rápido a búsqueda global

2. **Grid de Emergencias Críticas** (2x2)
   - Botón grande "RCP / Parada" (crítico, rojo)
   - Botón "Código Ictus" (alto, naranja)
   - Botón "Shock" (medio, amarillo)
   - Botón "Vía Aérea" (crítico, rojo)
   - Cada botón tiene icono, título y subtítulo

3. **Accesos Rápidos** (chips horizontales)
   - OVACE, Glasgow, Triage, Código Ictus, Dopamina, Politrauma
   - Navegación rápida a secciones específicas

4. **Últimas Consultas** (historial reciente)
   - Máximo 3 búsquedas recientes
   - Con timestamp relativo ("hace 5 minutos")
   - Vacío si no hay historial

5. **Botón flotante de emergencia** (esquina inferior derecha)
   - Botón circular grande con icono de alerta
   - Siempre visible, acceso directo a RCP
   - Animación de pulso para llamar la atención

**Header fijo superior:**
- Logo "TES" con nombre de la app
- Indicador de estado online/offline
- Botón de búsqueda
- Botón de menú

**Bottom Navigation fija inferior:**
- 6 iconos: Home, Soporte, Patologías, Escena, Fármacos, Herramientas
- Navegación rápida entre secciones principales

### Pantallas Principales

**1. Soporte Vital (`/soporte-vital`)**
- Lista de protocolos de soporte vital básico
- Tarjetas con título, categoría, prioridad, grupo de edad
- Filtros por categoría y prioridad
- Acceso directo a RCP, OVACE, etc.

**2. Patologías (`/patologias`)**
- Tabs por sistemas: Respiratorias, Circulatorias, Neurológicas, Endocrinas, Intoxicaciones
- Cada patología muestra: Clínica, Actuación, Puntos clave
- Formato de tarjetas expandibles

**3. Escena (`/escena`)**
- Tabs: Seguridad, ABCDE, Triage, Decisiones, Inmovilización, Extricación
- Checklists interactivos
- Árboles de decisión para protocolos
- Guías paso a paso

**4. Fármacos (`/farmacos`)**
- Dos secciones: Medicación TES y Vademécum General
- Filtros por categoría (cardiovascular, respiratorio, etc.)
- Búsqueda por nombre genérico, comercial o indicación
- Cada fármaco muestra: Dosis adulto/pediátrica, vías, indicaciones, contraindicaciones, puntos críticos TES

**5. Herramientas (`/herramientas`)**
- Tabs: Calculadoras, Perfusiones, Anatomía, Códigos
- 9 calculadoras interactivas (Glasgow, Parkland, Dosis pediátricas, etc.)
- Tablas de perfusión (Dopamina, Noradrenalina)
- Guía de terminología anatómica
- Enlaces a códigos de protocolo

**6. Manual Completo (`/manual`)**
- Vista de árbol expandible
- Estructura: Parte → Bloque → Capítulo
- 94 capítulos organizados en 15 bloques temáticos
- Búsqueda y filtrado
- Navegación jerárquica

**7. Manual Viewer (`/manual/:parte/:bloque/:capitulo`)**
- Visor de capítulo individual
- Renderizado de Markdown con estilos
- Navegación anterior/siguiente
- Breadcrumbs de ubicación
- Metadata del capítulo (tiempo lectura, importancia)

### Navegación

**Rutas Principales:**
- **Home**: `/`
- **Contenido**: `/soporte-vital`, `/patologias`, `/escena`, `/farmacos`, `/herramientas`
- **Manual**: `/manual` (índice), `/manual/:parte/:bloque/:capitulo` (visor)
- **Protocolos específicos**: `/rcp`, `/ictus`, `/shock`, `/via-aerea`
- **Utilidades**: `/favoritos`, `/historial`, `/ajustes`
- **Información**: `/acerca`, `/privacidad`, `/aviso-legal`

**Métodos de Navegación:**
1. **Bottom Navigation**: 6 iconos principales siempre visibles
2. **Menú lateral**: Acceso completo a todas las secciones
3. **Búsqueda global**: Modal con resultados instantáneos
4. **Enlaces contextuales**: Dentro del contenido (protocolos relacionados, fármacos mencionados)
5. **Breadcrumbs**: En páginas de manual
6. **Botón "Volver"**: En header cuando no estás en home

### Acciones del Usuario

**Búsqueda:**
- Abrir modal de búsqueda (botón en header o home)
- Escribir mínimo 2 caracteres
- Ver resultados en tiempo real
- Filtrar por tipo (procedimientos, fármacos) y categoría
- Click en resultado → navegar y añadir a historial

**Favoritos:**
- Marcar cualquier protocolo, fármaco o herramienta como favorito
- Ver lista en `/favoritos`
- Agrupar por tipo (procedimientos, fármacos, herramientas, manual)
- Eliminar individual o limpiar todo

**Calculadoras:**
- Seleccionar calculadora en `/herramientas`
- Introducir valores en formularios
- Ver resultados instantáneos
- Interpretación automática de resultados (ej: Glasgow → severidad)

**Visualización de Contenido:**
- Expandir/colapsar secciones
- Navegar entre tabs
- Scroll infinito en listas largas
- Click en tarjetas para ver detalles

**Instalación PWA:**
- Banner automático después de 5 segundos (solo en desarrollo)
- Botón de instalación en menú
- Instalación como app nativa

---

## 4️⃣ Cómo se Muestra la Información

### Tipos de Datos

**1. Protocolos Médicos:**
- **Formato**: Tarjetas (`ProcedureCard`)
- **Información mostrada**:
  - Título y título corto
  - Categoría (soporte_vital, patologias, escena)
  - Prioridad (crítico, alto, medio, bajo) con badge de color
  - Grupo de edad (adulto, pediátrico, neonatal)
  - Lista de pasos numerados
  - Advertencias destacadas
  - Puntos clave
  - Equipamiento necesario
  - Fármacos relacionados
- **Prioridad visual**: 
  - Color según prioridad (rojo=crítico, naranja=alto, amarillo=medio)
  - Iconos según categoría
  - Badges de estado

**2. Fármacos:**
- **Formato**: Tarjetas expandibles (`DrugCard`)
- **Información mostrada**:
  - Nombre genérico y comercial
  - Categoría farmacológica
  - Presentación
  - Dosis adulto (texto descriptivo)
  - Dosis pediátrica (si aplica)
  - Vías de administración (badges)
  - Dilución (si aplica)
  - Indicaciones (lista)
  - Contraindicaciones (lista destacada)
  - Efectos secundarios
  - Antídoto (si aplica)
  - Notas importantes
  - **Puntos críticos TES** (sección especial destacada)
- **Prioridad visual**:
  - Sección expandida por defecto si es medicación TES
  - Puntos críticos TES en color destacado
  - Contraindicaciones en rojo/amarillo

**3. Calculadoras:**
- **Formato**: Formularios interactivos con resultados en tiempo real
- **Información mostrada**:
  - Campos de entrada (inputs numéricos, selects)
  - Resultado calculado
  - Interpretación del resultado (ej: "TCE Grave - IOT" para Glasgow)
  - Explicación del cálculo
  - Referencias o fórmulas
- **Prioridad visual**:
  - Resultado destacado en grande
  - Interpretación con color según severidad
  - Campos de entrada claramente marcados

**4. Manual (Markdown):**
- **Formato**: Renderizado de Markdown con estilos personalizados
- **Información mostrada**:
  - Título del capítulo
  - Contenido estructurado (títulos, listas, tablas, código)
  - Imágenes embebidas (infografías médicas)
  - Enlaces internos y externos
  - Metadata (tiempo lectura, importancia, nivel dificultad)
- **Prioridad visual**:
  - Títulos jerárquicos claros
  - Cajas destacadas para información crítica
  - Tablas con estilos médicos
  - Imágenes responsivas

**5. Patologías:**
- **Formato**: Tarjetas por sistema con información estructurada
- **Información mostrada**:
  - Nombre de la patología
  - Clínica (signos y síntomas)
  - Actuación (pasos de protocolo)
  - Puntos clave adicionales
- **Prioridad visual**:
  - Agrupación por sistemas (tabs)
  - Información clínica vs actuación claramente separada
  - Listas numeradas para pasos

**6. Historial y Favoritos:**
- **Formato**: Lista de items con iconos
- **Información mostrada**:
  - Título del item
  - Tipo (procedimiento, fármaco, herramienta, manual)
  - Timestamp relativo (historial)
  - Fecha de añadido (favoritos)
- **Prioridad visual**:
  - Agrupación por tipo en favoritos
  - Orden cronológico inverso
  - Iconos según tipo

### Formatos de Visualización

**Tarjetas (Cards):**
- Uso: Protocolos, fármacos, patologías
- Estilo: Borde, fondo, hover effect
- Expandible/colapsable según necesidad

**Listas:**
- Uso: Pasos de protocolos, indicaciones, contraindicaciones
- Estilo: Numeradas o con viñetas
- Priorización visual con colores

**Tablas:**
- Uso: Tablas de perfusión, dosis comparativas
- Estilo: Filas alternadas, headers destacados
- Responsive con scroll horizontal en móvil

**Formularios:**
- Uso: Calculadoras
- Estilo: Inputs con labels claros, validación visual
- Resultados destacados

**Árboles de Decisión:**
- Uso: Protocolos con decisiones condicionales
- Estilo: Nodos con preguntas/acciones, flechas de navegación
- Interactivo: click para avanzar

**Markdown Renderizado:**
- Uso: Manual completo
- Estilo: Tipografía médica, espaciado generoso
- Syntax highlighting para código

### Información Prioritaria vs Secundaria

**Prioritaria (siempre visible o destacada):**
- **Título y subtítulo** de protocolos/fármacos
- **Pasos numerados** de protocolos críticos
- **Dosis** de fármacos (adulto y pediátrica)
- **Contraindicaciones** (en rojo/amarillo)
- **Puntos críticos TES** (sección especial)
- **Resultados de calculadoras** (grande y destacado)
- **Advertencias** en protocolos (cajas destacadas)

**Secundaria (expandible o en segundo nivel):**
- Efectos secundarios de fármacos
- Notas adicionales
- Referencias bibliográficas
- Metadata del manual (tiempo lectura, autor)
- Información legal (en páginas dedicadas)

**Oculta hasta interacción:**
- Detalles técnicos de fármacos
- Explicaciones extensas
- Checklists completos (expandibles)
- Árboles de decisión (navegación paso a paso)

---

## 5️⃣ Roles y Permisos

### Tipos de Usuario

**NO HAY SISTEMA DE ROLES:**
- La aplicación es completamente abierta y pública
- No requiere registro ni autenticación
- No hay diferenciación de usuarios
- Todos los usuarios tienen acceso completo a todo el contenido

### Acceso al Contenido

**Acceso Universal:**
- ✅ Todos los protocolos médicos
- ✅ Todo el vademécum de fármacos
- ✅ Todas las calculadoras
- ✅ Manual completo (94 capítulos)
- ✅ Checklists de material
- ✅ Protocolos transtelefónicos
- ✅ Guiones de comunicación

**Sin Restricciones:**
- No hay contenido premium
- No hay contenido por suscripción
- No hay contenido por nivel de certificación
- No hay contenido geográfico restringido

### Personalización por Usuario

**Limitada a datos locales:**
- **Favoritos**: Cada usuario puede marcar sus propios favoritos (almacenado en localStorage)
- **Historial**: Cada usuario tiene su propio historial de búsquedas (almacenado en sessionStorage)
- **Tema**: Preferencia de tema claro/oscuro (almacenado en localStorage por next-themes)

**Sin sincronización:**
- Los favoritos no se sincronizan entre dispositivos
- El historial se pierde al cerrar el navegador
- No hay perfil de usuario ni configuración en la nube

---

## 6️⃣ Lógica Funcional

### Reglas Importantes

**1. Búsqueda:**
- Mínimo 2 caracteres para activar búsqueda
- Búsqueda en tiempo real (sin botón de buscar)
- Busca en: títulos, subtítulos, indicaciones, palabras clave
- Filtros combinables: tipo (procedimiento/fármaco) + categoría
- Resultados ordenados por relevancia (no explícita, implícita por orden en datos)

**2. Historial:**
- Máximo 20 items en historial
- Evita duplicados recientes (mismo item en últimos 5 minutos actualiza timestamp)
- Ordenado por fecha (más reciente primero)
- Se limpia al cerrar navegador (sessionStorage)
- Se puede limpiar manualmente desde Ajustes

**3. Favoritos:**
- Sin límite de favoritos
- Agrupados por tipo (procedimientos, fármacos, herramientas, manual)
- Ordenados por fecha de añadido (más reciente primero)
- Persisten entre sesiones (localStorage)
- Se pueden eliminar individualmente o limpiar todos

**4. Calculadoras:**
- Validación de inputs (rangos numéricos, valores requeridos)
- Cálculo automático al cambiar valores
- Interpretación automática de resultados (ej: Glasgow → severidad)
- Sin guardado de resultados (cada uso es independiente)

**5. Service Worker:**
- Cachea recursos estáticos en instalación
- Estrategia Cache-First para assets (imágenes, CSS, JS)
- Estrategia Network-First para HTML
- Actualiza automáticamente cuando hay nueva versión
- Notifica al usuario cuando hay actualización disponible

**6. PWA Install:**
- Banner automático después de 5 segundos (solo en desarrollo)
- Detección de capacidad de instalación (beforeinstallprompt)
- Instalación como app nativa en móviles y escritorio
- Funciona offline después de instalación

### Decisiones Automáticas

**1. Carga de Contenido:**
- **Lazy loading**: Páginas se cargan solo cuando se navega a ellas
- **Code splitting**: Chunks separados por página y librería
- **Carga bajo demanda**: Archivos Markdown se cargan solo al visualizarlos

**2. Renderizado:**
- **Suspense boundaries**: Muestra loader mientras carga componente lazy
- **Error boundaries**: Captura errores y muestra mensaje amigable
- **Fallbacks**: Si falla carga de Markdown, muestra mensaje de error

**3. Tema:**
- **Detección automática**: Usa tema del sistema por defecto
- **Persistencia**: Guarda preferencia del usuario
- **Transición suave**: Cambio de tema sin flash

**4. Navegación:**
- **SPA routing**: Todas las rutas manejadas por React Router
- **Fallback a index.html**: Rutas no encontradas redirigen a 404
- **Historial del navegador**: Usa history API para navegación

**5. Búsqueda:**
- **Debounce implícito**: Búsqueda se ejecuta en cada cambio (sin debounce explícito)
- **Filtrado automático**: Resultados se filtran según filtros activos
- **Ordenamiento**: Resultados ordenados por orden en datos (no por relevancia calculada)

### Dependencias del Usuario vs Automáticas

**Automáticas (sin intervención del usuario):**
- ✅ Carga de contenido bajo demanda
- ✅ Caché de recursos por Service Worker
- ✅ Detección de actualizaciones del Service Worker
- ✅ Cálculo de resultados en calculadoras
- ✅ Filtrado de resultados en búsqueda
- ✅ Agrupación de favoritos por tipo
- ✅ Ordenamiento de historial por fecha
- ✅ Detección de tema del sistema
- ✅ Detección de estado online/offline

**Requieren acción del usuario:**
- ❌ Marcar/desmarcar favoritos
- ❌ Realizar búsqueda (escribir query)
- ❌ Seleccionar filtros en búsqueda
- ❌ Introducir valores en calculadoras
- ❌ Expandir/colapsar secciones
- ❌ Navegar entre tabs
- ❌ Instalar PWA (requiere confirmación)
- ❌ Aplicar actualización del Service Worker (requiere confirmación)
- ❌ Cambiar tema manualmente
- ❌ Limpiar favoritos/historial

---

## 7️⃣ Puntos Fuertes y Limitaciones Actuales

### Puntos Fuertes

**1. Arquitectura Técnica:**
- ✅ **Stack moderno y mantenible**: React 18 + TypeScript + Vite
- ✅ **Code splitting eficiente**: Lazy loading de páginas reduce bundle inicial
- ✅ **PWA funcional**: Service Worker bien implementado, funciona offline
- ✅ **TypeScript**: Tipado fuerte reduce errores
- ✅ **Componentes reutilizables**: shadcn/ui + Radix UI bien estructurados
- ✅ **Responsive design**: Funciona bien en móvil y escritorio

**2. Organización del Código:**
- ✅ **Separación clara de responsabilidades**: pages, components, data, hooks
- ✅ **Datos estructurados**: TypeScript interfaces bien definidas
- ✅ **Hooks personalizados**: Lógica reutilizable bien encapsulada
- ✅ **Nomenclatura consistente**: Convenciones claras en todo el código

**3. Experiencia de Usuario:**
- ✅ **Navegación intuitiva**: Bottom nav + menú lateral + búsqueda
- ✅ **Acceso rápido a emergencias**: Botones grandes en home
- ✅ **Búsqueda eficiente**: Modal con resultados instantáneos
- ✅ **Offline-first**: Funciona sin conexión después de instalación
- ✅ **Tema claro/oscuro**: Adaptación a preferencias del usuario

**4. Contenido:**
- ✅ **Manual completo**: 94 capítulos bien estructurados
- ✅ **Datos médicos completos**: Protocolos, fármacos, calculadoras
- ✅ **Información crítica destacada**: Puntos TES, contraindicaciones
- ✅ **Formato adecuado**: Markdown permite fácil mantenimiento

**5. Performance:**
- ✅ **Carga rápida inicial**: Bundle pequeño gracias a code splitting
- ✅ **Caché eficiente**: Service Worker cachea recursos estáticos
- ✅ **Lazy loading**: Contenido se carga solo cuando se necesita

### Limitaciones Actuales

**1. Arquitectura:**
- ⚠️ **Sin backend**: No hay sincronización, no hay actualizaciones dinámicas
- ⚠️ **Datos estáticos**: Todo hardcodeado en TypeScript, difícil de actualizar
- ⚠️ **Sin autenticación**: No hay usuarios, no hay personalización avanzada
- ⚠️ **Sin base de datos**: No hay persistencia centralizada, solo localStorage

**2. Escalabilidad:**
- ⚠️ **Manual hardcodeado**: 94 archivos Markdown estáticos, difícil de mantener
- ⚠️ **Datos en código**: Fármacos y protocolos en archivos TS, requiere rebuild para actualizar
- ⚠️ **Sin CMS**: No hay interfaz para editar contenido sin tocar código
- ⚠️ **Sin versionado de contenido**: No hay historial de cambios del manual

**3. Funcionalidad:**
- ⚠️ **Búsqueda básica**: Solo búsqueda por texto, sin ranking de relevancia
- ⚠️ **Sin sugerencias**: No hay autocompletado en búsqueda
- ⚠️ **Sin filtros avanzados**: Filtros limitados a tipo y categoría
- ⚠️ **Sin historial de uso**: No hay analytics ni tracking de uso
- ⚠️ **Sin compartir**: No hay forma de compartir protocolos específicos (solo URL)

**4. UX/UI:**
- ⚠️ **Sin feedback visual avanzado**: No hay animaciones de transición entre páginas
- ⚠️ **Sin modo de lectura**: No hay modo de lectura optimizado para manual
- ⚠️ **Sin marcadores**: No hay forma de marcar posición en manual
- ⚠️ **Sin notas**: No hay forma de añadir notas personales a protocolos

**5. Contenido:**
- ⚠️ **Sin validación médica explícita**: No hay indicador de validación médica por protocolo
- ⚠️ **Sin versionado de protocolos**: No se muestra versión de guía (ERC, AHA) por protocolo
- ⚠️ **Sin referencias cruzadas**: Enlaces entre protocolos relacionados son limitados
- ⚠️ **Sin casos clínicos**: No hay ejemplos prácticos de aplicación

**6. Performance:**
- ⚠️ **Carga inicial de Markdown**: Archivos Markdown se cargan con fetch, puede ser lento
- ⚠️ **Sin pre-carga**: No hay pre-carga de contenido probablemente necesario
- ⚠️ **Bundle grande**: Aunque hay code splitting, el bundle inicial sigue siendo considerable

**7. PWA:**
- ⚠️ **Sin push notifications**: No hay notificaciones de actualizaciones de protocolos
- ⚠️ **Sin sincronización**: Favoritos no se sincronizan entre dispositivos
- ⚠️ **Sin actualizaciones automáticas**: Contenido requiere rebuild para actualizar

**8. Seguridad y Privacidad:**
- ⚠️ **Sin HTTPS requerido**: Aunque es PWA, no hay validación de HTTPS
- ⚠️ **Datos locales sin encriptación**: localStorage sin encriptación
- ⚠️ **Sin política de retención**: No hay límite de tiempo para datos locales

### Partes MVP o Provisionales

**1. Búsqueda:**
- Implementación básica funcional pero mejorable
- Sin ranking de relevancia
- Sin autocompletado
- Sin búsqueda por voz (útil en emergencias)

**2. Manual:**
- Estructura funcional pero rígida
- Sin editor de contenido
- Sin versionado
- Sin colaboración

**3. Analytics:**
- Sin tracking de uso
- Sin métricas de performance
- Sin feedback de usuarios

**4. Actualizaciones:**
- Sistema básico de notificación de actualizaciones
- Sin actualizaciones incrementales
- Sin rollback de versiones

**5. Internacionalización:**
- Solo español
- Sin soporte multi-idioma
- Sin traducción de contenido

---

## 8️⃣ Resumen Final

### Descripción para Otro Desarrollador

**EMERGES TES** es una **aplicación web progresiva (PWA)** diseñada como guía de consulta rápida para Técnicos de Emergencias Sanitarias. Es esencialmente una **enciclopedia médica offline** especializada en protocolos de emergencias prehospitalarias.

**Arquitectura:**
La aplicación está construida con **React 18 + TypeScript + Vite**, usando **React Router** para navegación SPA. No tiene backend ni base de datos; todo el contenido está **hardcodeado en archivos TypeScript** (`src/data/`) y **94 archivos Markdown** (`public/manual/`). Usa **localStorage** para favoritos y **sessionStorage** para historial de búsquedas.

**Estructura de datos:**
El contenido médico está organizado en **14 archivos TypeScript** que definen protocolos, fármacos, calculadoras, árboles de decisión, etc. El manual completo son **94 capítulos Markdown** organizados en 15 bloques temáticos. Todo se carga estáticamente; no hay API ni base de datos.

**Flujo principal:**
1. Usuario entra y ve home con acceso rápido a emergencias críticas
2. Puede buscar protocolos/fármacos mediante modal de búsqueda
3. Navega entre secciones mediante bottom nav o menú lateral
4. Visualiza contenido en formato de tarjetas (protocolos, fármacos) o Markdown (manual)
5. Puede marcar favoritos y ver historial de búsquedas
6. Todo funciona offline después de instalación PWA

**Características clave:**
- **Offline-first**: Service Worker cachea todo, funciona sin internet
- **Code splitting**: Páginas se cargan bajo demanda para reducir bundle inicial
- **Búsqueda global**: Modal que busca en protocolos y fármacos simultáneamente
- **Tema claro/oscuro**: Adaptación a preferencias del sistema/usuario
- **Responsive**: Funciona bien en móvil y escritorio

**Limitaciones principales:**
- **Sin backend**: Todo es estático, requiere rebuild para actualizar contenido
- **Datos hardcodeados**: Fármacos y protocolos en código TypeScript
- **Búsqueda básica**: Sin ranking de relevancia ni autocompletado
- **Sin usuarios**: No hay autenticación ni personalización avanzada
- **Sin sincronización**: Favoritos no se sincronizan entre dispositivos

**Estado actual:**
La aplicación está **funcional y desplegada**, con contenido médico completo (94 capítulos de manual, protocolos, fármacos, calculadoras). Es un **MVP sólido** que cumple su función principal (consulta rápida offline), pero tiene limitaciones de escalabilidad y mantenimiento debido a la arquitectura completamente estática.

**Tecnologías destacadas:**
- React 18 con TypeScript para type safety
- Vite para build rápido y code splitting
- React Router para SPA navigation
- Service Worker manual para PWA offline
- react-markdown para renderizado de contenido médico
- Tailwind CSS + shadcn/ui para UI consistente
- TanStack Query configurado pero no usado activamente (sin backend)

**En resumen:** Es una **enciclopedia médica offline** bien estructurada técnicamente, con contenido completo y funcionalidad básica sólida, pero con limitaciones arquitectónicas que dificultan la escalabilidad y el mantenimiento a largo plazo debido a la ausencia de backend y la naturaleza estática de los datos.

---

**Fin del Informe**

*Este informe describe la aplicación tal como existe actualmente, sin proponer mejoras ni refactorizaciones.*

