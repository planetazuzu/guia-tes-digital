# REPORTE 3: RECOMENDACIONES PARA ESTRUCTURA DE APP

**Fecha:** 2025-12-17 10:34:50

---

## 📱 ESTRUCTURA DE CARPETAS IDEAL PARA APP


### Propuesta de Estructura:

```

app-manual-tes/

├── contenido/

│   ├── parte-i-fundamentos/

│   │   ├── bloque-0-fundamentos/

│   │   │   ├── 1.1.1-fundamentos-emergencias.md

│   │   │   └── metadata.json

│   │   └── bloque-1-procedimientos-basicos/

│   │       ├── 1.2.1-constantes-vitales.md

│   │       ├── 1.2.2-abcde-operativo.md

│   │       ├── 1.2.3-glasgow-operativo.md

│   │       ├── 1.2.4-triage-start.md

│   │       └── metadata.json

│   ├── parte-ii-soporte-vital/

│   │   ├── bloque-4-rcp/

│   │   └── bloque-9-medicina-emergencias/

│   ├── parte-iii-material/

│   │   ├── bloque-2-inmovilizacion/

│   │   └── bloque-3-oxigenoterapia/

│   ├── parte-iv-farmacologia/

│   │   └── bloque-6-farmacologia/

│   ├── parte-v-protocolos/

│   │   ├── bloque-5-transtelefonicos/

│   │   └── bloque-8-gestion/

│   ├── parte-vi-conduccion/

│   │   └── bloque-7-conduccion/

│   ├── parte-vii-situaciones-especiales/

│   │   ├── bloque-10-situaciones-especiales/

│   │   └── bloque-11-trauma/

│   └── parte-viii-habilidades/

│       ├── bloque-12-marco-legal/

│       ├── bloque-13-comunicacion/

│       └── bloque-14-seguridad/

├── assets/

│   ├── imagenes/

│   ├── videos/

│   └── iconos/

├── data/

│   ├── indice.json

│   └── metadata-global.json

└── public/

    └── (archivos estáticos)

```


---

## 📋 METADATOS NECESARIOS EN CADA .MD


### Front Matter Propuesto (YAML):

```yaml

---

id: '1.1.1'

titulo: 'Fundamentos de Emergencias'

subtitulo: 'Marco conceptual y operativo'

parte: 1

bloque: 0

bloque_nombre: 'Fundamentos de Emergencias Prehospitalarias'

parte_nombre: 'Fundamentos y Evaluación Inicial'

nivel_dificultad: 'basico'

importancia: 'alta'

palabras_clave:

  - 'emergencias'

  - 'soporte vital'

  - 'cadena supervivencia'

tipo_contenido: 'formativo'

tiempo_lectura: 15

version: '1.0'

fecha_actualizacion: '2024-12-13'

autor: 'Manual TES Digital'

navegacion:

  anterior: null

  siguiente: '1.2.1'

  relacionados:

    - '1.2.1'

    - '2.1.1'

---

```


### Campos Explicados:

- **id**: Identificador único del capítulo (formato X.Y.Z)

- **titulo**: Título principal del capítulo

- **subtitulo**: Descripción breve

- **parte/bloque**: Números para organización jerárquica

- **nivel_dificultad**: 'basico', 'intermedio', 'avanzado'

- **importancia**: 'alta', 'media', 'baja'

- **palabras_clave**: Array de términos para búsqueda

- **tipo_contenido**: 'formativo', 'operativo', 'referencia'

- **tiempo_lectura**: Minutos estimados

- **navegacion**: Enlaces a capítulos relacionados


---

## 🧭 SISTEMA DE NAVEGACIÓN RECOMENDADO


### 1. Menú Lateral Jerárquico

```

📚 Manual TES Digital

├── 📖 Parte I: Fundamentos

│   ├── 🔹 Bloque 0: Fundamentos

│   │   └── 1.1.1 Fundamentos de Emergencias

│   └── 🔹 Bloque 1: Procedimientos Básicos

│       ├── 1.2.1 Constantes Vitales

│       ├── 1.2.2 ABCDE Operativo

│       ├── 1.2.3 Glasgow Operativo

│       └── 1.2.4 Triage START

├── 💉 Parte II: Soporte Vital

│   ├── 🔹 Bloque 4: RCP

│   └── 🔹 Bloque 9: Medicina Emergencias

└── ... (resto de partes)

```


**Características:**

- Expandible/colapsable por niveles

- Indicador visual del capítulo actual

- Búsqueda rápida integrada

- Favoritos/marcadores


### 2. Breadcrumbs (Migas de Pan)

```

Inicio > Parte I > Bloque 1 > 1.2.1 Constantes Vitales

```


**Funcionalidad:**

- Navegación rápida a niveles superiores

- Contexto visual de ubicación

- Click en cualquier nivel para ir directamente


### 3. Navegación Anterior/Siguiente

```

← Capítulo Anterior: 1.1.1 Fundamentos

Capítulo Siguiente: 1.2.2 ABCDE Operativo →

```


**Funcionalidad:**

- Botones flotantes o en footer

- Navegación secuencial lógica

- Atajos de teclado (← →)


### 4. Índice Rápido

**Características:**

- Modal o sidebar deslizable

- Búsqueda instantánea

- Filtros por parte/bloque

- Acceso desde cualquier página


---

## 🔍 FUNCIONALIDADES ADICIONALES RECOMENDADAS


### Búsqueda Avanzada

- Búsqueda por texto completo

- Filtros por parte, bloque, tipo de contenido

- Búsqueda por palabras clave

- Historial de búsquedas


### Modo Offline

- Cache de contenido para acceso offline

- Service Worker para PWA

- Sincronización cuando hay conexión


### Personalización

- Modo oscuro/claro

- Tamaño de fuente ajustable

- Favoritos personalizados

- Notas/annotaciones por capítulo


### Tests/Autoevaluaciones

- Preguntas por capítulo

- Tests por bloque/parte

- Historial de resultados

- Modo estudio vs modo examen


---

## 📐 ESTRUCTURA DE DATOS JSON RECOMENDADA


### indice.json

```json

{

  "version": "1.0",

  "fecha": "2024-12-15",

  "partes": [

    {

      "id": 1,

      "nombre": "Fundamentos y Evaluación Inicial",

      "bloques": [

        {

          "id": 0,

          "nombre": "Fundamentos de Emergencias",

          "capitulos": [

            {

              "id": "1.1.1",

              "titulo": "Fundamentos de Emergencias",

              "ruta": "parte-i-fundamentos/bloque-0-fundamentos/1.1.1-fundamentos-emergencias.md"

            }

          ]

        }

      ]

    }

  ]

}

```


---

## ✅ CHECKLIST DE IMPLEMENTACIÓN


### Fase 1: Estructura Base

- [ ] Crear estructura de carpetas propuesta

- [ ] Migrar archivos .md a nueva estructura

- [ ] Agregar front matter a todos los archivos

- [ ] Generar indice.json desde estructura


### Fase 2: Navegación

- [ ] Implementar menú lateral jerárquico

- [ ] Agregar breadcrumbs

- [ ] Implementar navegación anterior/siguiente

- [ ] Crear índice rápido con búsqueda


### Fase 3: Funcionalidades

- [ ] Implementar búsqueda avanzada

- [ ] Agregar modo offline (PWA)

- [ ] Implementar personalización

- [ ] Crear sistema de tests/autoevaluaciones


---
