# MÓDULO 2: PROTOCOLOS TRANSTELEFÓNICOS

## ✅ IMPLEMENTACIÓN COMPLETADA

**Fecha:** 2024-12-13  
**Estado:** Completado y listo para uso  
**Compatibilidad:** 100% aditivo, no modifica código existente

---

## 📁 ARCHIVOS CREADOS (NUEVOS)

### 1. `src/data/telephone-protocols.ts`
- **Tipo:** Archivo de datos TypeScript
- **Contenido:**
  - Tipos TypeScript: `ProtocolCategory`, `AgeGroup`, `ProtocolStep`, `TelephoneProtocol`
  - 6 protocolos implementados:
    - `rcpTelephoneAdult`: RCP Transtelefónica - Adultos (10 pasos)
    - `rcpTelephonePediatric`: RCP Transtelefónica - Pediatría (9 pasos)
    - `desaTelephone`: DESA Guiado por Teléfono (10 pasos)
    - `ovaceTelephoneAdult`: OVACE Transtelefónica - Adultos (8 pasos)
    - `scaTelephone`: Sospecha de SCA (6 pasos)
    - `ictusTelephone`: Sospecha de Ictus (7 pasos)
  - Funciones helper: `getProtocolById`, `getProtocolsByCategory`, `getProtocolsByAgeGroup`
- **Fuente:** Manual TES Digital (Bloques 4.1, 4.2, 4.4, 4.6, 5.6, 5.7)

### 2. `src/components/telephone-protocols/TelephoneProtocolViewer.tsx`
- **Tipo:** Componente React reutilizable
- **Funcionalidad:**
  - Visualización interactiva de protocolos transtelefónicos
  - Evaluación inicial (preguntas al testigo)
  - Navegación paso a paso con instrucciones para leer
  - Verificación de cada paso (checkboxes)
  - Notas para el operador (ocultas por defecto)
  - Alertas para pasos críticos sin verificar
  - Botón "Reiniciar" para volver al inicio
- **Dependencias:** Componentes UI existentes (Button, Card, Alert, Badge)

### 3. Nueva página: `src/pages/Telefono.tsx`
- **Tipo:** Página completa de React
- **Funcionalidad:**
  - Lista de protocolos disponibles
  - Filtrado por categoría (RCP, DESA, OVACE, SCA, Ictus)
  - Filtrado por grupo etario (Adulto, Pediatría, Lactante)
  - Visualizador de protocolo seleccionado
  - Navegación entre lista y protocolo
- **Ruta:** `/telefono`

### 4. Integración en `src/App.tsx`
- **Cambios realizados:**
  - ✅ Añadida ruta `/telefono` para la nueva página
  - ✅ Importado componente Telefono
- **NO modificado:**
  - ❌ Ninguna ruta existente
  - ❌ Ninguna página existente
  - ❌ Ninguna funcionalidad existente

### 5. Integración en `src/components/layout/MenuSheet.tsx`
- **Cambios realizados:**
  - ✅ Añadido enlace "Protocolos Transtelefónicos" en el menú lateral
  - ✅ Icono Phone
  - ✅ Navegación a `/telefono`
- **NO modificado:**
  - ❌ Ningún otro item del menú
  - ❌ Estructura del menú
  - ❌ Funcionalidad existente

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. Protocolo: RCP Transtelefónica - Adultos
- **Evaluación inicial:** 3 preguntas
- **10 pasos:**
  1. Activar 112
  2. Colocar en superficie firme
  3. Abrir vía aérea
  4. Verificar respiración
  5. Iniciar compresiones (posición)
  6. Compresiones (técnica)
  7. Ritmo de compresiones
  8. Ventilaciones
  9. Continuar ciclos
  10. Cambio de reanimador (si aplica)
- **Notas importantes:** 4 notas para el operador

### 2. Protocolo: RCP Transtelefónica - Pediatría
- **Evaluación inicial:** 4 preguntas
- **9 pasos:**
  - Adaptaciones pediátricas (una o dos manos según tamaño)
  - Ratio 15:2 si hay dos personas, 30:2 si está solo
  - Ventilación cubriendo boca Y nariz
- **Notas importantes:** 4 notas para el operador

### 3. Protocolo: DESA Guiado por Teléfono
- **Evaluación inicial:** 3 preguntas
- **10 pasos:**
  1. Continuar RCP mientras se trae DESA
  2. Encender DESA
  3. Preparar tórax (secar, afeitar si necesario)
  4. Colocar parches
  5. Conectar cable
  6. Analizar ritmo (¡todos fuera!)
  7. Seguir órdenes del DESA
  8. Descarga si indicada (verificación de seguridad)
  9. Reanudar RCP
  10. Continuar ciclos con DESA
- **Notas importantes:** 4 notas para el operador

### 4. Protocolo: OVACE Transtelefónica - Adultos
- **Evaluación inicial:** 4 preguntas
- **8 pasos:**
  - Evaluación de gravedad (tos efectiva vs. inefectiva)
  - OVACE leve (animar a toser)
  - OVACE grave consciente (Heimlich)
  - Compresiones abdominales
  - Reevaluación
  - Si inconsciente (RCP)
  - Adaptación para embarazadas/obesos
- **Notas importantes:** 4 notas para el operador

### 5. Protocolo: SCA Transtelefónico
- **Evaluación inicial:** 5 preguntas
- **6 pasos:**
  1. Activar 112
  2. Posición cómoda
  3. Aflojar ropa
  4. Aspirina (si protocolo contempla)
  5. Monitorizar
  6. Preparar para traslado
- **Notas importantes:** 4 notas para el operador

### 6. Protocolo: Ictus Transtelefónico
- **Evaluación inicial:** 4 preguntas
- **7 pasos:**
  1. Activar 112 (tiempo crítico)
  2. Test FAST
  3. Posición segura
  4. No dar comida/bebida
  5. Monitorizar consciencia
  6. Anotar hora de inicio
  7. Preparar para traslado
- **Notas importantes:** 5 notas para el operador

---

## 🔗 INTEGRACIÓN CON EXISTENTE

### Reutiliza:
- ✅ Componentes UI existentes (Button, Card, Alert, Badge)
- ✅ Sistema de routing existente (React Router)
- ✅ Estilos existentes (Tailwind, clases personalizadas)
- ✅ Estructura de páginas existente
- ✅ Menú lateral existente (añadido enlace, no modificado)

### No toca:
- ❌ `src/data/procedures.ts` (sin cambios)
- ❌ `src/data/drugs.ts` (sin cambios)
- ❌ `src/data/calculators.ts` (sin cambios)
- ❌ `src/data/decision-trees.ts` (sin cambios)
- ❌ `src/data/material-checklists.ts` (sin cambios)
- ❌ Componentes existentes (sin modificaciones)
- ❌ Otras páginas (sin cambios)
- ❌ BottomNav (sin cambios)

---

## 📱 USO EN LA APP

### Acceso:
1. **Opción 1:** Menú lateral (☰) → "Protocolos Transtelefónicos"
2. **Opción 2:** URL directa: `/telefono`
3. **Opción 3:** Desde código (navegación programática)

### Flujo de uso:
1. Abrir página Telefono
2. Filtrar por categoría (opcional): Todos, RCP, DESA, OVACE, SCA, Ictus
3. Filtrar por grupo etario (opcional): Todos, Adulto, Pediatría, Lactante
4. Seleccionar protocolo
5. Realizar evaluación inicial (preguntas al testigo)
6. Comenzar guía paso a paso
7. Leer instrucción al testigo
8. Verificar que se está haciendo (checkbox)
9. Continuar al siguiente paso
10. Navegar hacia atrás si es necesario

### Características:
- ✅ Instrucciones claras para leer al testigo
- ✅ Preguntas de verificación para cada paso
- ✅ Pasos críticos destacados (badge rojo)
- ✅ Notas para el operador (ocultas por defecto)
- ✅ Navegación hacia adelante/atrás
- ✅ Bloqueo de avance si paso crítico no verificado
- ✅ Evaluación inicial antes de comenzar

---

## 🚀 PRÓXIMOS PASOS (MÓDULOS FUTUROS)

Este módulo está **completamente funcional** y listo para uso. Los siguientes módulos se añadirán de forma similar:

- **Módulo 3:** Guiones de Comunicación Operativa (pendiente)
- **Módulo 5:** Material e Inmovilización (pendiente)

---

## ✅ CONFIRMACIÓN DE COMPATIBILIDAD

### ✅ No rompe nada existente:
- Todas las páginas existentes funcionan igual
- Todas las rutas existentes intactas
- Todos los datos existentes intactos
- Todos los componentes existentes sin modificaciones
- Menú lateral funciona igual (añadido enlace, no modificado)

### ✅ Es completamente aditivo:
- Nuevos archivos en nuevas carpetas
- Nueva página añadida (no modifica existentes)
- Nueva ruta añadida (no conflictos)
- Nuevos tipos TypeScript (no conflictos)
- Nuevos componentes (no dependencias circulares)
- Enlace en menú lateral (añadido, no modificado)

### ✅ Compatible hacia atrás:
- Funciona con estructura existente
- Reutiliza componentes UI existentes
- Sigue patrones de código existentes
- No requiere cambios en configuración
- Build exitoso sin errores

---

## 📝 NOTAS TÉCNICAS

### Estructura de datos:
```typescript
TelephoneProtocol {
  id: string
  title: string
  category: 'rcp' | 'desa' | 'ovace' | 'sca' | 'ictus' | 'comunicacion'
  ageGroup: 'adulto' | 'pediatrico' | 'lactante' | 'todos'
  initialAssessment: string[]
  steps: ProtocolStep[]
  importantNotes?: string[]
}

ProtocolStep {
  id: string
  order: number
  instruction: string  // Para leer al testigo
  verification?: string  // Pregunta para verificar
  notes?: string  // Notas para el operador (no se leen)
  critical?: boolean
}
```

### Características técnicas:
- **Estado local:** Cada protocolo mantiene su estado de pasos verificados
- **Navegación:** Hacia adelante/atrás con validación de pasos críticos
- **Persistencia:** No persistente (se reinicia al recargar) - puede extenderse con localStorage si se requiere
- **Performance:** Renderizado eficiente con navegación paso a paso
- **Accesibilidad:** Botones y enlaces accesibles, estructura semántica

### Extensibilidad:
- Fácil añadir nuevos protocolos: solo añadir a `telephoneProtocols[]`
- Fácil añadir nuevos pasos: solo añadir al array `steps`
- Fácil añadir nuevas categorías: extender tipo `ProtocolCategory`
- Fácil añadir nuevos grupos etarios: extender tipo `AgeGroup`

---

## 🎯 CASOS DE USO REALES

### Escenario 1: Centro Coordinador
- Operador recibe llamada de testigo con PCR
- Abre app → Protocolos Transtelefónicos → RCP Adulto
- Sigue evaluación inicial
- Guía paso a paso al testigo
- Verifica cada paso crítico antes de continuar

### Escenario 2: TES en Ambulancia
- TES recibe llamada de coordinador pidiendo guiar RCP
- Abre app → Protocolos Transtelefónicos → RCP Pediátrico
- Sigue protocolo adaptado a pediatría
- Verifica que testigo está siguiendo instrucciones

### Escenario 3: DESA Disponible
- Testigo tiene DESA disponible
- Operador guía uso del DESA paso a paso
- Verifica seguridad antes de cada descarga
- Integra DESA con RCP en curso

---

**✅ MÓDULO 2 COMPLETADO Y LISTO PARA USO**
