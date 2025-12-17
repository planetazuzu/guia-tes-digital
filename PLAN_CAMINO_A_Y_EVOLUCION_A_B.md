# PLAN TÉCNICO Y ESTRATÉGICO
## Camino A: Offline-First → Camino B: Plataforma Viva

**Proyecto:** EMERGES TES - Protocolo Rápido  
**Versión del Plan:** 1.0  
**Fecha:** 2024  
**Arquitecto:** Senior Software Architect

---

## TABLA DE CONTENIDOS

1. [Definición de Caminos](#1-definición-de-caminos)
2. [Arquitectura Base](#2-arquitectura-base)
3. [Fases del Camino A](#3-fases-del-camino-a)
4. [Decisiones Arquitectónicas Clave](#4-decisiones-arquitectónicas-clave)
5. [Protocolos Transtelefónicos Específicos – Camino A](#5-protocolos-transtelefónicos-específicos--camino-a)
6. [Requisitos para Camino B](#6-requisitos-para-camino-b)
7. [Plan de Acción Priorizado](#7-plan-de-acción-priorizado)
8. [Checklist Final](#8-checklist-final)

---

## 1. DEFINICIÓN DE CAMINOS

### 1.1 CAMINO A: Aplicación Offline-First

#### Qué ES el Camino A

**Definición:**
Aplicación web PWA (Progressive Web App) completamente autónoma, diseñada para funcionar **100% offline** desde la primera carga. Todos los datos médicos están embebidos en el bundle de la aplicación, permitiendo consulta instantánea sin dependencia de conectividad.

**Características principales:**
- ✅ **Funciona sin internet** después de la primera instalación
- ✅ **Datos embebidos** en el bundle (JSON estático)
- ✅ **Sin backend** ni llamadas a API
- ✅ **Persistencia local** (localStorage/IndexedDB) para preferencias de usuario
- ✅ **Service Worker** para cache agresivo y actualizaciones controladas
- ✅ **PWA instalable** en dispositivos móviles
- ✅ **Rápida y fiable** - sin latencia de red
- ✅ **Responsable médicamente** - contenido validado y versionado

#### Qué NO incluye el Camino A

**Excluido explícitamente:**
- ❌ **Backend/API** - No hay servidor, no hay llamadas HTTP
- ❌ **Autenticación de usuarios** - Aplicación pública
- ❌ **Sincronización entre dispositivos** - Cada dispositivo es independiente
- ❌ **Actualizaciones en tiempo real** - Contenido estático por versión
- ❌ **Chat con IA** - No hay procesamiento en servidor
- ❌ **Búsqueda semántica con embeddings** - Solo búsqueda local por texto
- ❌ **Analytics remotos** - Solo métricas locales opcionales
- ❌ **Contenido dinámico** - Todo el contenido viene en el bundle

**Razón de exclusión:**
El Camino A prioriza **fiabilidad absoluta** y **funcionamiento garantizado** en situaciones críticas (ambulancias sin cobertura, zonas rurales). Cualquier dependencia externa es un punto de fallo inaceptable.

---

### 1.2 CAMINO B: Plataforma Viva con Backend

#### Qué implica el Camino B

**Definición:**
Evolución del Camino A hacia una plataforma completa con backend, manteniendo la capacidad offline como base, pero añadiendo capacidades de sincronización, actualizaciones dinámicas y funcionalidades avanzadas.

**Características adicionales:**
- ✅ **Backend API** para gestión de contenido
- ✅ **Sincronización** de favoritos/historial entre dispositivos
- ✅ **Actualizaciones incrementales** de contenido médico
- ✅ **Autenticación de usuarios** (opcional, para sincronización)
- ✅ **Chat con IA** para consultas avanzadas
- ✅ **Búsqueda semántica** con embeddings
- ✅ **Analytics** de uso (anónimo, con consentimiento)
- ✅ **Versionado de contenido** con historial de cambios
- ✅ **Validación médica** centralizada y auditada

**Principio fundamental:**
El Camino B **extiende** el Camino A, no lo reemplaza. La aplicación debe seguir funcionando **completamente offline** incluso con backend disponible.

---

### 1.3 Qué decisiones actuales facilitan el Camino B

**Decisiones arquitectónicas que ya preparan la evolución:**

1. **Separación de datos y lógica**
   - Datos en archivos separados (`src/data/`)
   - Interfaces TypeScript bien definidas
   - ✅ **Facilita:** Migración a API sin cambiar componentes

2. **Identificadores estables**
   - IDs semánticos (`'rcp-adulto-svb'`, `'adrenalina'`)
   - ✅ **Facilita:** Sincronización y versionado futuro

3. **Componentes desacoplados**
   - Componentes no conocen el origen de datos
   - ✅ **Facilita:** Intercambiar fuente de datos (local → API)

4. **TypeScript estricto**
   - Interfaces bien definidas
   - ✅ **Facilita:** Contratos API consistentes

5. **React Query ya instalado**
   - Aunque no se usa, está listo
   - ✅ **Facilita:** Integración de API sin cambios arquitectónicos

---

## 2. ARQUITECTURA BASE

### 2.1 Principios Arquitectónicos

#### 2.1.1 Offline-First
**Principio:** La aplicación debe funcionar completamente sin conexión. Cualquier funcionalidad online es **opcional y mejorativa**, nunca requerida.

**Implementación:**
- Service Worker cachea todos los assets y datos
- IndexedDB para almacenamiento local robusto
- Estrategia "Cache First" para todos los recursos

#### 2.1.2 Separación de Concerns
**Principio:** Separar claramente:
- **Datos** (qué información se muestra)
- **Lógica de negocio** (cómo se procesa)
- **Presentación** (cómo se muestra)

**Implementación:**
```
src/
├── data/           # Fuente de datos (ahora: archivos TS, futuro: API client)
├── services/       # Lógica de negocio (búsqueda, filtrado, cálculos)
├── stores/         # Estado global (favoritos, historial)
└── components/     # Presentación pura
```

#### 2.1.3 Abstracción de Acceso a Datos
**Principio:** Los componentes **nunca** acceden directamente a arrays de datos. Siempre a través de una capa de abstracción.

**Implementación:**
```typescript
// ❌ MAL (actual)
import { procedures } from '@/data/procedures';
const filtered = procedures.filter(...);

// ✅ BIEN (Camino A preparado para B)
import { dataService } from '@/services/data';
const filtered = await dataService.getProcedures({ category: 'rcp' });
```

**Beneficio:** En Camino B, `dataService` puede cambiar de local a API sin tocar componentes.

#### 2.1.4 Versionado de Contenido
**Principio:** Todo contenido médico debe tener versión y fecha de validación.

**Implementación:**
```typescript
interface ContentMetadata {
  version: string;        // "1.2.3"
  lastValidated: string;  // ISO date
  validatedBy?: string;   // ID del profesional médico
  source?: string;        // Guía oficial de referencia
}
```

---

### 2.2 Estructura de Carpetas Propuesta

```
src/
├── data/                    # Datos estáticos (Camino A)
│   ├── procedures.json      # Migrado desde .ts
│   ├── drugs.json
│   ├── pathologies.json
│   └── metadata.json        # Versión, fecha validación
│
├── services/                # Capa de servicios (NUEVO)
│   ├── data/               # Acceso a datos (abstracción)
│   │   ├── localDataService.ts    # Camino A: lee JSON
│   │   ├── apiDataService.ts      # Camino B: llama API
│   │   └── dataService.ts         # Factory/Adapter
│   ├── search/             # Lógica de búsqueda
│   ├── storage/            # Persistencia local
│   └── sync/               # Sincronización (Camino B)
│
├── stores/                  # Estado global (NUEVO)
│   ├── favorites.ts        # Favoritos (localStorage)
│   ├── history.ts           # Historial de búsquedas
│   └── settings.ts         # Configuración usuario
│
├── hooks/                   # Custom hooks
│   ├── useData.ts          # Hook para acceder a datos (abstracción)
│   └── useStorage.ts       # Hook para persistencia
│
├── components/             # Componentes UI (sin cambios)
├── pages/                  # Páginas (sin cambios)
└── lib/                    # Utilidades
```

---

## 3. FASES DEL CAMINO A

### FASE 1: Arquitectura y Abstracción de Datos

#### Objetivo
Crear la capa de abstracción que permita cambiar de datos locales a API sin reescribir componentes.

#### Qué se implementa AHORA

1. **Servicio de Datos Abstracto**
   ```typescript
   // src/services/data/dataService.ts
   interface DataService {
     getProcedures(filters?: ProcedureFilters): Promise<Procedure[]>;
     getProcedureById(id: string): Promise<Procedure | null>;
     getDrugs(filters?: DrugFilters): Promise<Drug[]>;
     getDrugById(id: string): Promise<Drug | null>;
     // ... otros métodos
   }
   ```

2. **Implementación Local (Camino A)**
   ```typescript
   // src/services/data/localDataService.ts
   class LocalDataService implements DataService {
     // Lee de JSON estático
     // Retorna Promise para mantener misma interfaz que API
   }
   ```

3. **Factory Pattern**
   ```typescript
   // src/services/data/dataService.ts
   export const dataService: DataService = new LocalDataService();
   // En Camino B: cambiar a new ApiDataService()
   ```

4. **Migración de Datos a JSON**
   - Convertir `procedures.ts` → `procedures.json`
   - Convertir `drugs.ts` → `drugs.json`
   - Mantener tipos TypeScript en archivos separados

#### Qué se deja PREPARADO para el futuro

- ✅ Interfaz `DataService` lista para implementación con API
- ✅ Todos los componentes usan `dataService`, no arrays directos
- ✅ Estructura de datos compatible con formato API futuro

#### Qué NO se implementa todavía

- ❌ Llamadas HTTP reales
- ❌ Manejo de errores de red
- ❌ Cache de respuestas API
- ❌ Sincronización

**Esfuerzo estimado:** 3-5 días  
**Prioridad:** 🔴 ALTA (base para todo lo demás)

---

### FASE 2: Gestión de Datos y Versionado

#### Objetivo
Estructurar datos médicos con versionado, validación y metadata para responsabilidad médica.

#### Qué se implementa AHORA

1. **Metadata de Contenido**
   ```typescript
   // src/data/metadata.json
   {
     "version": "1.0.0",
     "lastValidated": "2024-01-15",
     "validatedBy": "Dr. [Nombre]",
     "source": "Guías ERC 2021, SEMES 2023",
     "procedures": {
       "count": 5,
       "lastUpdated": "2024-01-10"
     },
     "drugs": {
       "count": 5,
       "lastUpdated": "2024-01-10"
     }
   }
   ```

2. **Versionado por Entidad**
   ```typescript
   interface Procedure {
     id: string;
     version: string;           // Versión de este protocolo específico
     lastValidated: string;     // Fecha última validación
     // ... resto de campos
   }
   ```

3. **Sistema de Identificadores Estables**
   - IDs semánticos e inmutables
   - No usar IDs numéricos auto-incrementales
   - Formato: `{categoria}-{nombre}-{variante}`

4. **Validación de Datos en Build**
   - Script que valida estructura de JSON
   - Verifica que todos los IDs sean únicos
   - Valida tipos TypeScript

#### Qué se deja PREPARADO para el futuro

- ✅ Estructura de versionado compatible con sistema de actualizaciones
- ✅ Metadata lista para sincronización
- ✅ IDs estables para merge de cambios

#### Qué NO se implementa todavía

- ❌ Sistema de actualizaciones incrementales
- ❌ Comparación de versiones
- ❌ Merge de cambios

**Esfuerzo estimado:** 2-3 días  
**Prioridad:** 🔴 ALTA (responsabilidad médica)

---

### FASE 3: Persistencia Local y Estado de Usuario

#### Objetivo
Implementar almacenamiento local robusto para favoritos, historial y preferencias, preparado para sincronización futura.

#### Qué se implementa AHORA

1. **Capa de Abstracción de Storage**
   ```typescript
   // src/services/storage/storageService.ts
   interface StorageService {
     saveFavorites(favorites: string[]): Promise<void>;
     getFavorites(): Promise<string[]>;
     saveHistory(history: HistoryEntry[]): Promise<void>;
     getHistory(): Promise<HistoryEntry[]>;
   }
   ```

2. **Implementación con IndexedDB**
   - Usar librería `idb` (IndexedDB wrapper)
   - Más robusto que localStorage
   - Permite estructuras complejas
   - Preparado para sincronización

3. **Store de Estado Global**
   ```typescript
   // src/stores/favorites.ts
   // Zustand o Context API simple
   // Gestiona estado reactivo de favoritos
   ```

4. **Funcionalidad Completa de Favoritos**
   - Persistencia real (no solo UI)
   - Página de favoritos
   - Sincronización entre tabs (BroadcastChannel)

5. **Historial de Búsquedas Real**
   - Almacena búsquedas reales del usuario
   - Limpieza automática (últimos 50)
   - Timestamps para ordenamiento

#### Qué se deja PREPARADO para el futuro

- ✅ Estructura de datos compatible con formato de sincronización
- ✅ Timestamps y metadata para merge
- ✅ IDs de usuario (placeholder) para multi-dispositivo

#### Qué NO se implementa todavía

- ❌ Sincronización con servidor
- ❌ Autenticación de usuarios
- ❌ Resolución de conflictos

**Esfuerzo estimado:** 4-5 días  
**Prioridad:** 🟡 MEDIA (mejora UX significativa)

---

### FASE 4: Offline y PWA

#### Objetivo
Garantizar funcionamiento 100% offline y hacer la app instalable como PWA.

#### Qué se implementa AHORA

1. **Service Worker Completo**
   ```typescript
   // public/sw.js
   // Estrategia: Cache First para todo
   // Cache de assets, JSON de datos, HTML
   ```

2. **Manifest PWA**
   ```json
   // public/manifest.json
   {
     "name": "EMERGES TES",
     "short_name": "EMERGES",
     "start_url": "/",
     "display": "standalone",
     "theme_color": "#1a1f2e",
     "background_color": "#1a1f2e",
     "icons": [...]
   }
   ```

3. **Cache Strategy**
   - **Assets estáticos:** Cache permanente
   - **Datos JSON:** Cache con versionado
   - **HTML:** Network First, fallback a cache
   - **Actualizaciones:** Check en background, notificar usuario

4. **Offline Detection**
   - Detectar estado de conexión
   - Mostrar indicador visual
   - Mensaje informativo (no bloqueante)

5. **Actualización de Contenido**
   - Version check en startup
   - Descargar nuevo bundle si hay actualización
   - Actualizar cache automáticamente

#### Qué se deja PREPARADO para el futuro

- ✅ Service Worker preparado para cache de respuestas API
- ✅ Estrategia de actualización compatible con actualizaciones incrementales
- ✅ Sistema de versionado para detectar cambios

#### Qué NO se implementa todavía

- ❌ Actualizaciones incrementales de contenido
- ❌ Sincronización de cache con servidor
- ❌ Push notifications

**Esfuerzo estimado:** 5-7 días  
**Prioridad:** 🔴 ALTA (core del Camino A)

---

### FASE 5: Seguridad y Estabilidad

#### Objetivo
Garantizar que la aplicación no falle en situaciones críticas y maneje errores gracefully.

#### Qué se implementa AHORA

1. **Error Boundaries**
   ```typescript
   // src/components/ErrorBoundary.tsx
   // Captura errores de React
   // Muestra pantalla de error amigable
   // Permite recuperación
   ```

2. **Manejo de Errores en Servicios**
   ```typescript
   // Try/catch en todas las operaciones críticas
   // Logging local (no remoto)
   // Fallbacks cuando sea posible
   ```

3. **Validación de Datos en Runtime**
   - Validar estructura de JSON al cargar
   - Validar tipos con Zod (ya instalado)
   - Fallback a versión anterior si datos corruptos

4. **Testing Básico**
   - Tests unitarios de servicios críticos
   - Tests de componentes de calculadoras
   - Tests de búsqueda y filtrado

5. **Performance Monitoring**
   - Métricas locales de rendimiento
   - Detección de memory leaks
   - Optimización de bundle size

#### Qué se deja PREPARADO para el futuro

- ✅ Estructura de logging compatible con envío remoto (opcional)
- ✅ Error tracking preparado para integración con servicio externo

#### Qué NO se implementa todavía

- ❌ Analytics remotos
- ❌ Error tracking en servidor
- ❌ Performance monitoring remoto

**Esfuerzo estimado:** 4-5 días  
**Prioridad:** 🔴 ALTA (crítico para producción)

---

### FASE 6: Aspectos Legales y Responsabilidad Médica

#### Objetivo
Proteger legalmente el proyecto y asegurar que los usuarios entienden las limitaciones.

#### Qué se implementa AHORA

1. **Disclaimer Médico Prominente**
   ```typescript
   // src/pages/Legal.tsx
   // Página completa de términos y condiciones
   // Disclaimer de responsabilidad médica
   // Aviso de que es herramienta de apoyo, no reemplaza criterio profesional
   ```

2. **Aviso de Versión y Validación**
   - Mostrar versión de contenido en UI
   - Mostrar fecha de última validación
   - Link a fuentes oficiales

3. **Términos de Uso**
   - Uso responsable
   - Limitación de responsabilidad
   - Propiedad intelectual

4. **Consentimiento Inicial (si necesario)**
   - Modal de aceptación en primer uso
   - Almacenar consentimiento localmente

#### Qué se deja PREPARADO para el futuro

- ✅ Estructura legal compatible con términos de servicio online
- ✅ Sistema de consentimiento preparado para GDPR (si aplica)

#### Qué NO se implementa todavía

- ❌ Sistema de usuarios y aceptación de términos por usuario
- ❌ Tracking de consentimientos

**Esfuerzo estimado:** 2-3 días (incluye revisión legal)  
**Prioridad:** 🔴 CRÍTICA (protección legal)

---

### FASE 7: Contenido Médico Expandido

#### Objetivo
Expandir la base de datos de protocolos y fármacos a un nivel útil para producción.

#### Qué se implementa AHORA

1. **Expansión de Protocolos**
   - Mínimo 20-25 protocolos de soporte vital
   - Cobertura de situaciones comunes de emergencia
   - Protocolos pediátricos completos

2. **Expansión de Fármacos**
   - Mínimo 30-40 fármacos de emergencia
   - Cobertura de categorías principales
   - Dosis pediátricas completas

3. **Expansión de Patologías**
   - Mínimo 5-7 patologías por categoría
   - Total: 25-35 patologías

4. **Validación Médica**
   - Revisión por profesional médico
   - Referencias a guías oficiales
   - Documentación de fuentes

#### Qué se deja PREPARADO para el futuro

- ✅ Estructura de datos compatible con importación masiva
- ✅ Sistema de versionado para actualizaciones de contenido

#### Qué NO se implementa todavía

- ❌ CMS para gestión de contenido
- ❌ Sistema de contribuciones
- ❌ Workflow de validación automatizado

**Esfuerzo estimado:** 2-4 semanas (depende de fuente de datos)  
**Prioridad:** 🔴 CRÍTICA (hace la app útil)

---

## 4. DECISIONES ARQUITECTÓNICAS CLAVE

### 4.1 Abstracción de Acceso a Datos

**Decisión:** Crear capa de servicio que abstrae el origen de datos.

**Implementación:**
```typescript
// Interfaz común
interface DataService {
  getProcedures(filters?: Filters): Promise<Procedure[]>;
}

// Camino A: Implementación local
class LocalDataService implements DataService {
  async getProcedures() {
    const data = await import('@/data/procedures.json');
    return data.default;
  }
}

// Camino B: Implementación API (futuro)
class ApiDataService implements DataService {
  async getProcedures(filters) {
    const response = await fetch('/api/procedures', { body: filters });
    return response.json();
  }
}

// Factory
export const dataService: DataService = 
  import.meta.env.VITE_USE_API === 'true'
    ? new ApiDataService()
    : new LocalDataService();
```

**Beneficio:** Cambio de local a API sin tocar componentes.

---

### 4.2 Separación de Contenido y Lógica

**Decisión:** Separar completamente datos (JSON) de código (TypeScript).

**Estructura:**
```
src/data/
├── procedures.json      # Datos puros
├── drugs.json
├── types.ts            # Interfaces TypeScript
└── metadata.json       # Versionado y validación
```

**Beneficio:** 
- Contenido editable sin tocar código
- Preparado para CMS futuro
- Validación independiente

---

### 4.3 Versionado de Contenido Médico

**Decisión:** Todo contenido médico tiene versión y metadata de validación.

**Estructura:**
```typescript
interface ContentItem {
  id: string;
  version: string;           // "1.2.3"
  lastValidated: string;      // ISO date
  validatedBy?: string;      // ID profesional
  source: string;            // Guía de referencia
  createdAt: string;
  updatedAt: string;
}
```

**Beneficio:**
- Trazabilidad de cambios
- Responsabilidad médica
- Preparado para actualizaciones incrementales

---

### 4.4 Identificadores Estables

**Decisión:** Usar IDs semánticos e inmutables, nunca numéricos auto-incrementales.

**Formato:**
- Protocolos: `{categoria}-{nombre}-{variante}`
  - Ejemplo: `rcp-adulto-svb`, `shock-hemorragico`
- Fármacos: `{nombre-generico}`
  - Ejemplo: `adrenalina`, `midazolam`

**Beneficio:**
- IDs no cambian entre versiones
- Compatible con sincronización
- URLs estables para compartir

---

### 4.5 Persistencia Local Preparada para Sincronización

**Decisión:** Estructurar datos locales con metadata para sincronización futura.

**Estructura:**
```typescript
interface Favorite {
  itemId: string;           // ID del protocolo/fármaco
  itemType: 'procedure' | 'drug';
  addedAt: string;          // Timestamp
  syncedAt?: string;        // Timestamp última sincronización (Camino B)
  deviceId?: string;        // ID dispositivo (Camino B)
}
```

**Beneficio:**
- Estructura compatible con sync
- Timestamps para resolución de conflictos
- Preparado para multi-dispositivo

---

## 5. PROTOCOLOS TRANSTELEFÓNICOS ESPECÍFICOS – CAMINO A

### 5.1 Introducción y Alcance

Esta sección documenta protocolos específicos para **soporte transtelefónico** en situaciones de emergencia. Estos protocolos están diseñados para ser consultados rápidamente durante una llamada de emergencia, proporcionando guías estructuradas para el operador que asiste al ciudadano.

**Características del Camino A:**
- ✅ Protocolos estáticos embebidos en la aplicación
- ✅ Consulta rápida sin dependencia de conectividad
- ✅ Estructura clara y secuencial
- ✅ Preparado para evolución a flujos interactivos (Camino B)

**Nota Importante:**
Estos protocolos son **procedimentales** y están pensados para **uso profesional** por operadores de emergencias sanitarias. **No sustituyen la formación reglada** ni el criterio clínico del profesional. El contenido debe ser validado por profesionales médicos antes de su implementación.

---

### 5.2 Sospecha de Parada Cardiorrespiratoria (PCR)

#### 5.2.1 Protocolo de Identificación

**Objetivo:** Identificar rápidamente si se trata de una parada cardiorrespiratoria real.

**Pasos de Identificación:**
1. **Verificar consciencia**
   - Preguntar: "¿Se encuentra bien?" o "¿Me oye?"
   - Si no responde: considerar inconsciencia

2. **Verificar respiración**
   - Instruir al testigo: "Acérquese y compruebe si respira normalmente"
   - Tiempo máximo de verificación: 10 segundos
   - Si no respira o respiración agónica: considerar PCR

3. **Confirmar situación**
   - Si inconsciente y no respira normalmente: **ACTIVAR PROTOCOLO RCP**

**Criterios de Activación:**
- ✅ Inconsciencia confirmada
- ✅ Ausencia de respiración normal o respiración agónica
- ✅ Testigo presente y colaborador

---

#### 5.2.2 RCP Transtelefónica - Adultos

**Objetivo:** Guiar al testigo para realizar RCP básico mientras llegan los servicios de emergencia.

**Secuencia de Instrucciones:**

**FASE 1: Preparación (30 segundos)**
1. Confirmar que la víctima está en el suelo (superficie firme)
2. Pedir al testigo que se coloque de rodillas junto a la víctima
3. Instruir: "Coloque el talón de una mano en el centro del pecho, entre los pezones"
4. Instruir: "Coloque la otra mano encima, entrelazando los dedos"
5. Instruir: "Mantenga los brazos rectos, con los hombros sobre las manos"

**FASE 2: Compresiones Torácicas**
6. Instruir: "Empiece a comprimir fuerte y rápido"
7. Indicar ritmo: "Aproximadamente 2 compresiones por segundo"
8. Indicar profundidad: "Comprima unos 5-6 centímetros"
9. Instruir: "Permita que el pecho se recupere completamente entre compresiones"
10. Continuar: "No pare hasta que le diga"

**FASE 3: Ventilaciones (si testigo entrenado)**
11. Después de 30 compresiones, instruir: "Incline la cabeza hacia atrás"
12. Instruir: "Cierre la nariz con los dedos"
13. Instruir: "Haga un sello con su boca sobre la boca de la víctima"
14. Instruir: "Sople durante 1 segundo, observando que el pecho se eleva"
15. Repetir: "Dé otra respiración"
16. Continuar: "Vuelva a las compresiones: 30 compresiones, luego 2 respiraciones"

**FASE 4: Continuidad**
17. Instruir: "Continúe con ciclos de 30 compresiones y 2 respiraciones"
18. Indicar: "No pare hasta que lleguen los servicios de emergencia o la víctima muestre signos de vida"
19. Reforzar: "Las compresiones son lo más importante. Si duda, priorice las compresiones"

**Puntos Críticos:**
- ⚠️ **Profundidad:** 5-6 cm (no menos, no más)
- ⚠️ **Frecuencia:** 100-120 compresiones/minuto
- ⚠️ **Descompresión completa:** Permitir que el pecho vuelva a su posición
- ⚠️ **Minimizar interrupciones:** Máximo 10 segundos entre ciclos
- ⚠️ **Cambio de reanimador:** Si hay más de una persona, cambiar cada 2 minutos

**Indicadores de Eficacia:**
- Testigo reporta que "siente que algo pasa"
- Posible movimiento o sonido de la víctima
- Llegada de servicios de emergencia

**Cuándo Detener:**
- Llegada de servicios de emergencia
- Signos claros de vida (respiración, movimiento)
- Agotamiento extremo del reanimador (buscar relevo)

---

#### 5.2.3 RCP Transtelefónica - Niños (1 año - pubertad)

**Objetivo:** Adaptar RCP para población pediátrica con técnicas específicas.

**Diferencias Clave con Adultos:**
- **Compresiones:** Una mano o dos manos según tamaño del niño
- **Profundidad:** 1/3 del diámetro anteroposterior del tórax (aproximadamente 5 cm)
- **Frecuencia:** 100-120 compresiones/minuto (igual que adultos)
- **Ratio:** 30:2 (igual que adultos) o 15:2 si hay dos reanimadores

**Secuencia de Instrucciones:**

**FASE 1: Preparación**
1. Confirmar que el niño está en superficie firme
2. Instruir: "Coloque el talón de una mano (o dos si el niño es grande) en el centro del pecho"
3. Instruir: "Mantenga los brazos rectos"

**FASE 2: Compresiones**
4. Instruir: "Comprima fuerte y rápido, aproximadamente 1/3 del grosor del pecho"
5. Indicar: "Unas 2 compresiones por segundo"
6. Continuar: "30 compresiones"

**FASE 3: Ventilaciones**
7. Instruir: "Incline la cabeza hacia atrás (menos que en adulto)"
8. Instruir: "Cierre la nariz y sople suavemente en la boca"
9. Instruir: "Solo lo suficiente para ver que el pecho se eleva"
10. Repetir: "Otra respiración"

**FASE 4: Continuidad**
11. Continuar ciclos 30:2
12. Reforzar: "En niños, la causa más frecuente es respiratoria, las ventilaciones son muy importantes"

**Puntos Críticos Específicos:**
- ⚠️ **Profundidad adaptada:** 1/3 del tórax (no usar profundidad de adulto)
- ⚠️ **Ventilaciones suaves:** No forzar, solo ver elevación del pecho
- ⚠️ **Causa más frecuente:** Respiratoria, no cardíaca (diferente a adultos)

---

#### 5.2.4 RCP Transtelefónica - Lactantes (<1 año)

**Objetivo:** RCP específica para lactantes con técnicas adaptadas.

**Diferencias Clave:**
- **Compresiones:** Dos dedos (índice y medio) o dos pulgares con manos rodeando el tórax
- **Profundidad:** 1/3 del diámetro anteroposterior (aproximadamente 4 cm)
- **Frecuencia:** 100-120 compresiones/minuto
- **Ratio:** 30:2 o 15:2 si hay dos reanimadores

**Secuencia de Instrucciones:**

**FASE 1: Preparación**
1. Confirmar que el lactante está en superficie firme
2. Instruir: "Coloque al bebé boca arriba"
3. Instruir: "Localice el centro del pecho, justo debajo de la línea de los pezones"

**FASE 2: Compresiones**
4. Instruir: "Use dos dedos (índice y medio) o dos pulgares"
5. Instruir: "Comprima aproximadamente 1/3 del grosor del pecho"
6. Indicar: "Unas 2 compresiones por segundo"
7. Continuar: "30 compresiones"

**FASE 3: Ventilaciones**
8. Instruir: "Cubra la boca y la nariz del bebé con su boca"
9. Instruir: "Sople suavemente, solo lo suficiente para ver que el pecho se eleva"
10. Advertir: "No sople fuerte, los pulmones del bebé son pequeños"
11. Repetir: "Otra respiración suave"

**FASE 4: Continuidad**
12. Continuar ciclos 30:2
13. Reforzar: "En bebés, la causa es casi siempre respiratoria. Las ventilaciones son críticas"

**Puntos Críticos Específicos:**
- ⚠️ **Profundidad muy controlada:** Solo 1/3 del tórax (aproximadamente 4 cm)
- ⚠️ **Ventilaciones muy suaves:** Solo ver elevación mínima del pecho
- ⚠️ **Técnica de dos pulgares:** Preferible si hay dos personas (mejor calidad)
- ⚠️ **Causa casi siempre respiratoria:** Priorizar ventilaciones

---

#### 5.2.5 Uso de DESA Guiado por Teléfono

**Objetivo:** Guiar al testigo en el uso de un Desfibrilador Externo Semiautomático (DESA) si está disponible.

**Prerequisitos:**
- DESA disponible en el lugar
- Testigo colaborador y capaz de seguir instrucciones
- Víctima en parada cardiorrespiratoria confirmada

**Secuencia de Instrucciones:**

**FASE 1: Obtención del DESA**
1. Preguntar: "¿Hay un desfibrilador cerca? Busque señales o pregunte a alguien"
2. Si hay DESA: "Tráigalo aquí. No pare las compresiones mientras tanto"
3. Si no hay DESA: "Continúe con las compresiones. Le avisaré si encuentra uno"

**FASE 2: Preparación del DESA**
4. Instruir: "Abra el DESA. Siga las instrucciones que oiga"
5. Instruir: "Conecte los parches al DESA si no están conectados"
6. Instruir: "Retire la ropa del pecho de la víctima. Si está mojado, séquelo"

**FASE 3: Colocación de Parches**
7. Instruir: "Coloque un parche en el lado derecho, debajo de la clavícula"
8. Instruir: "Coloque el otro parche en el lado izquierdo, debajo de la axila"
9. Advertir: "Asegúrese de que los parches estén bien pegados a la piel"
10. Instruir: "Conecte los cables a los parches si no están conectados"

**FASE 4: Análisis y Descarga**
11. Instruir: "El DESA analizará el ritmo. NO toque a la víctima durante el análisis"
12. Instruir: "Siga las instrucciones del DESA"
13. Si el DESA indica descarga:
    - Instruir: "Asegúrese de que nadie toque a la víctima"
    - Instruir: "Presione el botón de descarga cuando el DESA lo indique"
14. Después de la descarga:
    - Instruir: "Inmediatamente, reinicie las compresiones"
    - Instruir: "Continúe 30 compresiones y 2 respiraciones"
    - Instruir: "El DESA le indicará cuándo parar para otro análisis"

**FASE 5: Continuidad**
15. Seguir instrucciones del DESA
16. Continuar RCP entre análisis
17. No quitar los parches hasta que lleguen los servicios de emergencia

**Puntos Críticos:**
- ⚠️ **No tocar durante análisis:** Puede interferir con el análisis
- ⚠️ **Parches bien colocados:** Piel seca, sin joyas, sin medicamentos transdérmicos
- ⚠️ **Reiniciar RCP inmediatamente:** Después de cada descarga
- ⚠️ **Seguir instrucciones del DESA:** El dispositivo guía el proceso

**Contraindicaciones:**
- Víctima con marcapasos visible (evitar colocar parche directamente sobre él)
- Víctima mojada (secar antes)
- Ambiente explosivo (extremar precauciones)

---

#### 5.2.6 Preparación para Camino B

**Evoluciones Futuras Posibles:**

1. **Árbol de Decisión Interactivo**
   - Flujo guiado paso a paso con confirmaciones
   - Adaptación dinámica según respuestas del testigo
   - Validación de comprensión en cada paso

2. **Simulación y Práctica**
   - Modo de práctica sin emergencia real
   - Feedback sobre técnica de compresiones (si hay sensores)
   - Métricas de calidad de RCP

3. **IA de Apoyo (No Diagnóstico)**
   - Análisis de audio para detectar ritmo de compresiones
   - Sugerencias de ajuste en tiempo real
   - Validación de comprensión del testigo

4. **Integración con Servicios de Emergencia**
   - Notificación automática a servicios de emergencia
   - Compartir ubicación GPS
   - Transmisión de estado en tiempo real

5. **Grabación y Análisis Post-Emergencia**
   - Registro de la secuencia seguida (para formación)
   - Análisis de tiempos y calidad
   - Mejora continua de protocolos

---

### 5.3 Obstrucción de Vía Aérea por Cuerpo Extraño (OVACE)

#### 5.3.1 OVACE en Adultos

**Objetivo:** Guiar al testigo para resolver una obstrucción de vía aérea en adulto.

**FASE 1: Identificación**
1. Preguntar: "¿Puede toser, hablar o respirar?"
2. Si puede toser: "Anímele a toser fuerte. Si puede toser, no haga nada más"
3. Si NO puede toser, hablar ni respirar: **OBSTRUCCIÓN GRAVE - ACTIVAR PROTOCOLO**

**FASE 2: Maniobras de Desobstrucción (Consciente)**
4. Instruir: "Colóquese detrás de la persona"
5. Instruir: "Ponga sus brazos alrededor de su cintura"
6. Instruir: "Haga un puño con una mano, colóquelo justo encima del ombligo"
7. Instruir: "Agárrelo con la otra mano"
8. Instruir: "Empuje fuerte hacia adentro y hacia arriba, como si quisiera levantarla"
9. Repetir: "Hágalo 5 veces, fuerte y rápido"
10. Evaluar: "¿Salió el objeto o puede respirar ahora?"

**FASE 3: Alternancia con Golpes**
11. Si no se resuelve: "Dé 5 golpes fuertes en la espalda, entre los omóplatos"
12. Alternar: "5 golpes en la espalda, luego 5 compresiones abdominales"
13. Continuar: "Siga alternando hasta que salga el objeto o la persona pierda el conocimiento"

**FASE 4: Si Pierde el Conocimiento**
14. Instruir: "Bájela al suelo con cuidado"
15. Instruir: "Inicie RCP. Las compresiones pueden expulsar el objeto"
16. Antes de ventilar: "Revise la boca. Si ve el objeto, sáquelo con los dedos"
17. Continuar: "30 compresiones, luego intente ventilar"

**Puntos Críticos:**
- ⚠️ **No interferir si tose:** La tos es el mecanismo más efectivo
- ⚠️ **Compresiones abdominales:** Hacia adentro y arriba, no lateral
- ⚠️ **Embarazadas/obesos:** Usar compresiones torácicas en lugar de abdominales
- ⚠️ **No barrido digital a ciegas:** Solo si ve el objeto

---

#### 5.3.2 OVACE en Niños (1 año - pubertad)

**Objetivo:** Adaptar maniobras de desobstrucción para población pediátrica.

**Diferencias Clave:**
- Técnica similar a adultos pero con menos fuerza
- Posición arrodillada si el niño es pequeño
- Compresiones más suaves pero igualmente efectivas

**Secuencia de Instrucciones:**

**FASE 1: Identificación**
1. Preguntar: "¿Puede toser o hablar?"
2. Si puede toser: "Anímele a toser. No haga nada más"
3. Si NO puede: **ACTIVAR PROTOCOLO**

**FASE 2: Maniobras (Consciente)**
4. Instruir: "Si el niño es pequeño, arrodíllese detrás de él"
5. Instruir: "Coloque sus brazos alrededor de su cintura"
6. Instruir: "Haga un puño, colóquelo justo encima del ombligo"
7. Instruir: "Empuje hacia adentro y arriba, 5 veces"
8. Alternar: "5 golpes en la espalda, luego 5 compresiones"

**FASE 3: Si Pierde el Conocimiento**
9. Instruir: "Bájelo al suelo"
10. Instruir: "Inicie RCP pediátrico"
11. Antes de ventilar: "Revise la boca, retire objeto si lo ve"

**Puntos Críticos Específicos:**
- ⚠️ **Fuerza adaptada:** Menor que en adulto pero suficiente
- ⚠️ **Posición:** Arrodillarse si necesario para estar a la altura correcta

---

#### 5.3.3 OVACE en Lactantes (<1 año)

**Objetivo:** Maniobras específicas para lactantes.

**Técnica Específica:**
- NO usar compresiones abdominales (riesgo de lesión)
- Usar golpes en espalda + compresiones torácicas

**Secuencia de Instrucciones:**

**FASE 1: Identificación**
1. Observar: "¿El bebé puede toser o hacer ruidos?"
2. Si puede toser: "Déjelo toser. No haga nada más"
3. Si NO puede: **ACTIVAR PROTOCOLO**

**FASE 2: Maniobras (Consciente)**
4. Instruir: "Siente al bebé boca abajo sobre su antebrazo"
5. Instruir: "Sujete la cabeza y el cuello con su mano"
6. Instruir: "Mantenga la cabeza más baja que el cuerpo"
7. Instruir: "Dé 5 golpes fuertes en la espalda, entre los omóplatos"
8. Giro: "Voltee al bebé boca arriba, manteniendo la cabeza baja"
9. Instruir: "Dé 5 compresiones torácicas con dos dedos en el centro del pecho"
10. Alternar: "5 golpes en la espalda, luego 5 compresiones torácicas"

**FASE 3: Si Pierde el Conocimiento**
11. Instruir: "Inicie RCP de lactante"
12. Antes de ventilar: "Revise la boca, retire objeto si lo ve"

**Puntos Críticos Específicos:**
- ⚠️ **NUNCA compresiones abdominales:** Solo torácicas
- ⚠️ **Sujetar cabeza:** Siempre mantener cabeza y cuello sujetos
- ⚠️ **Posición inclinada:** Cabeza más baja que el cuerpo

---

#### 5.3.4 Preparación para Camino B

**Evoluciones Futuras Posibles:**

1. **Árbol de Decisión por Edad**
   - Selección automática de protocolo según edad
   - Adaptación de instrucciones según tamaño físico
   - Validación de técnica específica por grupo etario

2. **Guía Visual Interactiva**
   - Animaciones mostrando posición correcta
   - Feedback sobre fuerza aplicada (si hay sensores)
   - Indicadores de eficacia

3. **IA de Apoyo**
   - Análisis de sonidos para detectar tos efectiva
   - Sugerencias de ajuste de técnica
   - Detección de resolución de obstrucción

4. **Integración con RCP**
   - Transición automática si pierde conocimiento
   - Guía unificada RCP + OVACE
   - Optimización de secuencia

---

### 5.4 Sospecha de Síndrome Coronario Agudo (SCA)

#### 5.4.1 Protocolo de Identificación

**Objetivo:** Identificar síntomas sugestivos de SCA para activar protocolo de atención precoz.

**Criterios de Activación:**
- Dolor torácico opresivo
- Dolor irradiado (brazo, mandíbula, espalda)
- Disnea asociada
- Sudoración, náuseas, mareo
- Factores de riesgo cardiovascular

**Secuencia de Identificación:**

**FASE 1: Evaluación de Síntomas**
1. Preguntar: "¿Dónde le duele exactamente?"
2. Preguntar: "¿Cómo es el dolor? ¿Opresivo, como una presión?"
3. Preguntar: "¿Le duele en otro lugar? ¿Brazo, mandíbula, espalda?"
4. Preguntar: "¿Tiene dificultad para respirar?"
5. Preguntar: "¿Está sudando o tiene náuseas?"

**FASE 2: Evaluación de Factores de Riesgo**
6. Preguntar: "¿Tiene antecedentes de problemas de corazón?"
7. Preguntar: "¿Tiene diabetes, hipertensión o colesterol alto?"
8. Preguntar: "¿Fuma?"
9. Preguntar: "¿Cuántos años tiene?"

**FASE 3: Decisión de Activación**
10. Si síntomas sugestivos: **ACTIVAR PROTOCOLO SCA**
11. Si dudoso pero factores de riesgo: **ACTIVAR PROTOCOLO SCA** (mejor sobre-activar)

---

#### 5.4.2 Protocolo de Atención Precoz

**Objetivo:** Estabilizar y preparar al paciente mientras llegan los servicios de emergencia.

**Secuencia de Instrucciones:**

**FASE 1: Posicionamiento y Comodidad**
1. Instruir: "Siéntese o acuéstese en una posición cómoda"
2. Instruir: "No se mueva innecesariamente"
3. Instruir: "Afloje la ropa ajustada, especialmente alrededor del cuello y cintura"

**FASE 2: Medicación (si disponible y no contraindicada)**
4. Preguntar: "¿Tiene aspirina en casa?"
5. Si tiene aspirina y no es alérgico:
   - Instruir: "Tome una aspirina (300 mg si es posible)"
   - Instruir: "Mástiquela o tráguela con agua"
6. Advertir: "NO tome aspirina si es alérgico o tiene úlcera activa"

**FASE 3: Monitorización**
7. Instruir: "Respire lenta y profundamente"
8. Instruir: "Manténgase tranquilo. La ayuda está en camino"
9. Preguntar periódicamente: "¿Cómo se siente? ¿El dolor ha cambiado?"

**FASE 4: Preparación para Llegada de Servicios**
10. Instruir: "Cuando lleguen, dígales exactamente qué le pasa"
11. Instruir: "Mencione si tomó alguna medicación"
12. Instruir: "Tenga a mano su documentación médica si la tiene"

**Puntos Críticos:**
- ⚠️ **NO dar nitroglicerina:** Solo si el paciente ya la tiene prescrita y la toma habitualmente
- ⚠️ **NO forzar actividad:** Reposo relativo
- ⚠️ **Aspirina:** Solo si no hay contraindicaciones
- ⚠️ **Tiempo es músculo:** Activar servicios de emergencia inmediatamente

**Contraindicaciones para Aspirina:**
- Alergia conocida a aspirina
- Úlcera péptica activa
- Hemorragia activa
- Anticoagulantes (consultar, pero generalmente se puede dar)

---

#### 5.4.3 Signos de Alarma - Cuándo Activar RCP

**Objetivo:** Identificar cuando un SCA evoluciona a parada cardiorrespiratoria.

**Signos de Alarma:**
- Pérdida súbita de consciencia
- Ausencia de respiración
- Ausencia de pulso (si testigo puede comprobarlo)
- Convulsiones
- Cianosis (color azulado)

**Acción Inmediata:**
- Si aparece cualquiera de estos signos: **ACTIVAR PROTOCOLO RCP INMEDIATAMENTE**
- No esperar confirmación adicional
- Iniciar compresiones mientras se verifica

---

#### 5.4.4 Preparación para Camino B

**Evoluciones Futuras Posibles:**

1. **Árbol de Decisión Completo**
   - Evaluación estructurada de síntomas
   - Scoring de riesgo (TIMI, GRACE)
   - Recomendaciones personalizadas según perfil

2. **Guía de Medicación Interactiva**
   - Verificación de contraindicaciones
   - Cálculo de dosis según peso/edad
   - Interacciones medicamentosas

3. **IA de Apoyo**
   - Análisis de descripción de síntomas
   - Sugerencias de preguntas adicionales
   - Priorización de casos según gravedad

4. **Integración con ECG Remoto**
   - Transmisión de ECG si hay dispositivo disponible
   - Análisis automático de ritmo
   - Activación automática de código IAM si aplica

5. **Seguimiento Post-Emergencia**
   - Recordatorios de medicación
   - Guía de rehabilitación cardíaca
   - Prevención secundaria

---

### 5.5 Nota Global sobre Uso Profesional

**Importante - Uso Responsable:**

Estos protocolos transtelefónicos están diseñados para ser utilizados por **operadores de emergencias sanitarias** con formación adecuada. Son herramientas de **apoyo procedimental** que:

- ✅ Proporcionan estructura en situaciones de alta presión
- ✅ Reducen variabilidad en la atención
- ✅ Facilitan la comunicación efectiva con testigos
- ✅ Aseguran que no se olviden pasos críticos

**Limitaciones:**

- ❌ **No sustituyen la formación reglada** del profesional
- ❌ **No reemplazan el criterio clínico** del operador
- ❌ **No son algoritmos de diagnóstico** automático
- ❌ **Requieren adaptación** a cada situación específica

**Responsabilidad:**

El operador que utiliza estos protocolos mantiene la **responsabilidad profesional** de:
- Adaptar las instrucciones a la situación real
- Interpretar las respuestas del testigo correctamente
- Tomar decisiones clínicas cuando el protocolo no cubre la situación
- Priorizar la seguridad del paciente sobre el seguimiento estricto del protocolo

**Validación Médica:**

Antes de implementar estos protocolos en producción, deben ser:
- ✅ Revisados por profesionales médicos especializados
- ✅ Validados contra guías oficiales (ERC, AHA, SEMES, etc.)
- ✅ Probados en situaciones simuladas
- ✅ Actualizados según evidencia científica más reciente

---

### 5.6 Integración en la Aplicación (Camino A)

**Estructura de Datos Propuesta:**

```typescript
interface TelephonicProtocol {
  id: string;                    // Ej: "pcr-adulto-transtelefonico"
  title: string;                 // "RCP Transtelefónica - Adultos"
  category: 'pcr' | 'ovace' | 'sca';
  ageGroup: 'adulto' | 'pediatrico' | 'lactante' | 'todos';
  phases: ProtocolPhase[];       // Secuencia de fases
  criticalPoints: string[];      // Puntos críticos a recordar
  contraindications?: string[];  // Si aplica
  version: string;              // Versión del protocolo
  lastValidated: string;         // Fecha validación
  source: string;                // Guía de referencia
}

interface ProtocolPhase {
  id: string;                   // "fase-1-preparacion"
  title: string;                // "FASE 1: Preparación"
  steps: ProtocolStep[];         // Pasos secuenciales
  estimatedTime?: number;        // Tiempo estimado en segundos
}

interface ProtocolStep {
  id: string;                   // "paso-1-confirmar-suelo"
  instruction: string;           // Texto de la instrucción
  type: 'question' | 'instruction' | 'confirmation' | 'warning';
  requiresResponse?: boolean;    // Si necesita respuesta del testigo
  nextStepId?: string;           // Siguiente paso (para flujos interactivos futuro)
}
```

**Implementación en Camino A:**
- Protocolos como datos estáticos en JSON
- Visualización secuencial paso a paso
- Navegación manual entre fases
- Búsqueda rápida por situación

**Preparación para Camino B:**
- Estructura de datos compatible con árboles de decisión
- IDs de pasos preparados para navegación condicional
- Campos para respuestas del usuario (futuro)
- Metadata para flujos interactivos

---

## 6. REQUISITOS PARA CAMINO B

### 5.1 Qué partes ya estarán listas

**Arquitectura:**
- ✅ Capa de abstracción `DataService` - Solo cambiar implementación
- ✅ Componentes desacoplados - No necesitan cambios
- ✅ Estructura de datos compatible - Mismo formato JSON
- ✅ Identificadores estables - Compatibles con BD
- ✅ Versionado de contenido - Sistema ya implementado

**Persistencia:**
- ✅ Estructura de favoritos/historial - Compatible con formato API
- ✅ Timestamps y metadata - Listos para sincronización
- ✅ IndexedDB - Puede coexistir con sync

**Infraestructura:**
- ✅ Service Worker - Preparado para cache de API
- ✅ Error handling - Estructura lista para errores de red
- ✅ TypeScript - Contratos listos para API

---

### 5.2 Qué nuevas piezas habría que añadir

**Backend:**
- ❌ API REST (FastAPI/Express)
- ❌ Base de datos (PostgreSQL/MongoDB)
- ❌ Sistema de autenticación (JWT/OAuth)
- ❌ Endpoints de sincronización
- ❌ Sistema de actualizaciones incrementales

**Frontend:**
- ❌ Implementación `ApiDataService`
- ❌ Sistema de sincronización (conflict resolution)
- ❌ UI de autenticación (opcional)
- ❌ Indicadores de sincronización
- ❌ Manejo de conflictos de datos

**Nuevas Funcionalidades:**
- ❌ Chat con IA (backend)
- ❌ Búsqueda semántica (backend con embeddings)
- ❌ Analytics (opcional, con consentimiento)
- ❌ Push notifications

---

### 5.3 Qué NO habrá que reescribir

**Garantizado:**
- ✅ **Componentes UI** - Cero cambios
- ✅ **Páginas** - Cero cambios
- ✅ **Lógica de búsqueda/filtrado** - Cero cambios
- ✅ **Calculadoras** - Cero cambios
- ✅ **Estructura de datos** - Compatible
- ✅ **Service Worker** - Solo añadir estrategias de API
- ✅ **Persistencia local** - Coexiste con sync

**Principio:**
El Camino B **extiende** el Camino A. La app offline sigue funcionando igual. Las funcionalidades online son **adicionales**, no reemplazan las offline.

---

## 7. PLAN DE ACCIÓN PRIORIZADO

### 6.1 CORTO PLAZO (Semanas 1-4)

#### Semana 1-2: Fundación Arquitectónica

**FASE 1: Arquitectura y Abstracción de Datos**
- [ ] Crear interfaz `DataService`
- [ ] Implementar `LocalDataService`
- [ ] Migrar datos de `.ts` a `.json`
- [ ] Refactorizar componentes para usar `dataService`
- [ ] Crear factory pattern para selección de servicio

**FASE 2: Gestión de Datos y Versionado**
- [ ] Crear estructura de metadata
- [ ] Añadir versionado a entidades
- [ ] Crear script de validación de datos
- [ ] Documentar sistema de IDs

**Esfuerzo:** 1-2 semanas  
**Bloqueante:** Sí (base para todo)

---

#### Semana 3: Persistencia y Estado

**FASE 3: Persistencia Local**
- [ ] Crear `StorageService` abstracto
- [ ] Implementar con IndexedDB
- [ ] Crear stores de estado (Zustand/Context)
- [ ] Implementar favoritos funcionales
- [ ] Implementar historial real

**Esfuerzo:** 1 semana  
**Bloqueante:** No (mejora UX)

---

#### Semana 4: Offline y PWA

**FASE 4: Offline y PWA**
- [ ] Implementar Service Worker completo
- [ ] Crear manifest PWA
- [ ] Configurar cache strategies
- [ ] Implementar detección offline
- [ ] Sistema de actualización de contenido

**Esfuerzo:** 1 semana  
**Bloqueante:** Sí (core del Camino A)

---

### 6.2 MEDIO PLAZO (Semanas 5-8)

#### Semana 5-6: Seguridad y Estabilidad

**FASE 5: Seguridad y Estabilidad**
- [ ] Implementar Error Boundaries
- [ ] Añadir manejo de errores en servicios
- [ ] Validación de datos en runtime
- [ ] Tests básicos de componentes críticos
- [ ] Optimización de bundle

**Esfuerzo:** 2 semanas  
**Bloqueante:** Sí (producción)

---

#### Semana 7: Aspectos Legales

**FASE 6: Aspectos Legales**
- [ ] Crear página de términos y condiciones
- [ ] Disclaimer médico prominente
- [ ] Aviso de versión y validación
- [ ] Revisión legal (abogado)
- [ ] Consentimiento inicial (si necesario)

**Esfuerzo:** 1 semana (incluye revisión)  
**Bloqueante:** Sí (protección legal)

---

#### Semana 8: Contenido Médico (Paralelo)

**FASE 7: Contenido Médico Expandido**
- [ ] Expandir protocolos (20-25 mínimo)
- [ ] Expandir fármacos (30-40 mínimo)
- [ ] Expandir patologías (25-35 mínimo)
- [ ] Validación médica profesional
- [ ] Documentación de fuentes

**Esfuerzo:** 2-4 semanas (puede ser paralelo)  
**Bloqueante:** Sí (hace la app útil)

---

### 6.3 LARGO PLAZO (Post-Camino A)

#### Preparación para Camino B

**Cuando se decida evolucionar:**

1. **Backend API**
   - Diseñar endpoints REST
   - Implementar base de datos
   - Sistema de autenticación

2. **Implementación `ApiDataService`**
   - Reutilizar interfaz existente
   - Añadir manejo de errores de red
   - Cache híbrido (local + API)

3. **Sincronización**
   - Sistema de conflict resolution
   - Merge de cambios
   - Indicadores de sync

4. **Nuevas Funcionalidades**
   - Chat con IA
   - Búsqueda semántica
   - Analytics (opcional)

**Principio:** Todo se añade sin romper funcionalidad offline existente.

---

## 8. CHECKLIST FINAL

### 7.1 Checklist: Camino A Completado

#### Arquitectura
- [ ] Capa de abstracción `DataService` implementada
- [ ] Todos los componentes usan `dataService`, no arrays directos
- [ ] Datos migrados a JSON con tipos TypeScript separados
- [ ] Factory pattern para selección de servicio

#### Versionado y Validación
- [ ] Sistema de metadata implementado
- [ ] Cada entidad tiene versión y fecha de validación
- [ ] Script de validación de datos en build
- [ ] IDs estables y documentados

#### Persistencia
- [ ] `StorageService` abstracto implementado
- [ ] IndexedDB funcionando
- [ ] Favoritos funcionales y persistentes
- [ ] Historial de búsquedas real
- [ ] Stores de estado global funcionando

#### Offline y PWA
- [ ] Service Worker completo y funcionando
- [ ] Manifest PWA configurado
- [ ] App instalable en móviles
- [ ] Funciona 100% offline después de primera carga
- [ ] Sistema de actualización de contenido

#### Seguridad y Estabilidad
- [ ] Error Boundaries en todas las rutas
- [ ] Manejo de errores en servicios críticos
- [ ] Validación de datos en runtime
- [ ] Tests básicos de componentes críticos
- [ ] Bundle optimizado

#### Aspectos Legales
- [ ] Página de términos y condiciones
- [ ] Disclaimer médico prominente
- [ ] Aviso de versión visible en UI
- [ ] Revisión legal completada
- [ ] Consentimiento implementado (si necesario)

#### Contenido Médico
- [ ] Mínimo 20 protocolos implementados
- [ ] Mínimo 30 fármacos implementados
- [ ] Mínimo 25 patologías implementadas
- [ ] Contenido validado por profesional médico
- [ ] Fuentes documentadas

#### UX/UI
- [ ] Todas las funcionalidades core funcionando
- [ ] Búsqueda rápida y efectiva
- [ ] Navegación intuitiva
- [ ] Diseño responsive en todos los dispositivos
- [ ] Performance aceptable (<3s carga inicial)

---

### 7.2 Checklist: Condiciones para Iniciar Camino B

#### Prerequisitos Técnicos
- [ ] Camino A 100% completado y estable
- [ ] Arquitectura de abstracción funcionando
- [ ] Sistema de versionado implementado
- [ ] Persistencia local robusta

#### Prerequisitos de Negocio
- [ ] Decisión estratégica de evolucionar a backend
- [ ] Recursos para desarrollo y mantenimiento de backend
- [ ] Plan de infraestructura (hosting, BD, etc.)
- [ ] Consideraciones de privacidad y GDPR (si aplica)

#### Preparación Técnica
- [ ] Diseño de API REST completado
- [ ] Esquema de base de datos diseñado
- [ ] Plan de migración de datos local → BD
- [ ] Estrategia de sincronización definida
- [ ] Plan de rollback si algo falla

---

## 8. CONSIDERACIONES FINALES

### 8.1 Principios No Negociables

1. **Offline First Siempre**
   - Incluso con backend, la app debe funcionar offline
   - Funcionalidades online son opcionales, no requeridas

2. **Responsabilidad Médica**
   - Todo contenido debe estar validado
   - Versionado y trazabilidad obligatorios
   - Disclaimer médico siempre visible

3. **Fiabilidad sobre Complejidad**
   - Preferir soluciones simples y robustas
   - Evitar dependencias innecesarias
   - Testing crítico para funcionalidades médicas

4. **Preparación sin Sobre-ingeniería**
   - Preparar para futuro sin implementar futuro
   - Abstracciones útiles, no teóricas
   - Refactor cuando sea necesario, no prematuramente

---

### 8.2 Métricas de Éxito del Camino A

**Técnicas:**
- ✅ App funciona 100% offline
- ✅ Tiempo de carga <3 segundos
- ✅ Sin crashes en uso normal
- ✅ Bundle size <2MB (comprimido)

**Funcionales:**
- ✅ Contenido médico suficiente para uso real
- ✅ Búsqueda rápida y efectiva
- ✅ Favoritos e historial funcionando
- ✅ PWA instalable y estable

**Responsabilidad:**
- ✅ Disclaimer médico visible
- ✅ Versión de contenido accesible
- ✅ Términos de uso completos
- ✅ Contenido validado profesionalmente

---

### 8.3 Riesgos y Mitigaciones

**Riesgo: Sobre-ingeniería de abstracciones**
- **Mitigación:** Implementar solo lo necesario para Camino A, preparar interfaces simples

**Riesgo: Contenido médico insuficiente**
- **Mitigación:** Priorizar expansión de contenido como tarea crítica

**Riesgo: Service Worker complejo**
- **Mitigación:** Empezar con estrategia simple (Cache First), evolucionar gradualmente

**Riesgo: Cambios de requisitos para Camino B**
- **Mitigación:** Abstracciones flexibles, no asumir detalles específicos del futuro

---

## FIN DEL DOCUMENTO

**Este plan es un documento vivo.** Debe actualizarse cuando:
- Se completen fases
- Cambien requisitos
- Se descubran nuevas necesidades
- Se decida evolucionar a Camino B

**Mantener este documento sincronizado con el estado real del proyecto.**

---

**Versión:** 1.1  
**Última actualización:** 2024  
**Cambios en esta versión:**
- Añadida sección 5: Protocolos Transtelefónicos Específicos (Camino A)
- Incluye: PCR (adultos, niños, lactantes), OVACE (adultos, niños, lactantes), SCA
- Preparación para evolución a flujos interactivos (Camino B)
- Nota global sobre uso profesional y responsabilidad médica

**Próxima revisión:** Al completar Fase 1

