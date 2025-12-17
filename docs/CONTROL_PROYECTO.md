# Control del Proyecto – Manual TES Digital

**Última actualización:** 2024-12-13  
**Versión del documento:** 1.0

---

## 1) ESTADO ACTUAL

**Fecha:** 2024-12-13  
**Versión del manual:** 1.0  
**Estado general:** En construcción - Manual unificado creado, pendiente validación médica

**Estado por componente:**
- ✅ Manual unificado (`docs/MANUAL_TES_DIGITAL.md`) - Creado
- ✅ Plan maestro (`PLAN_CAMINO_A_Y_EVOLUCION_A_B.md`) - Actualizado con protocolos transtelefónicos
- ⚠️ Validación médica - Pendiente
- ⚠️ Implementación en app - Pendiente
- ⚠️ Separación APP vs DOC - Parcial (etiquetado realizado)

---

## 2) OBJETIVO DEL PROYECTO

**EMERGES TES - Manual TES Digital** es una herramienta de referencia rápida diseñada para Técnicos de Emergencias Sanitarias (TES) y profesionales de emergencias médicas. Proporciona acceso estructurado a protocolos, procedimientos, fármacos y guías de actuación en situaciones de emergencia, optimizado para consulta rápida en situaciones críticas.

**Para quién:** TES, operadores de emergencias sanitarias, profesionales de emergencias médicas con formación reglada.

**Qué NO es:** 
- ❌ No sustituye la formación reglada del profesional
- ❌ No reemplaza el criterio clínico
- ❌ No es un sistema de diagnóstico automático
- ❌ No es una herramienta de IA que toma decisiones clínicas

---

## 3) ROADMAP POR FASES

### Fase A (Sin Backend/IA) - Offline-First

**Objetivo:** Aplicación PWA completamente funcional offline, con contenido médico validado.

#### Contenido y Estructura
- [x] Manual unificado (`docs/MANUAL_TES_DIGITAL.md`)
- [x] Separación APP vs DOC (etiquetado realizado)
- [ ] Crear índice por capítulos navegable
- [ ] Validación médica del contenido completo
- [ ] Revisión contra guías oficiales (ERC, AHA, SEMES)

#### Protocolos Base
- [x] PCR (adultos, niños, lactantes) - Transtelefónico
- [x] OVACE (adultos, niños, lactantes) - Transtelefónico
- [x] SCA (identificación y atención precoz) - Transtelefónico
- [x] RCP Adulto SVB/SVA
- [x] RCP Pediátrico
- [ ] Ictus - Protocolo completo (parcialmente en patologías)
- [ ] Convertir PCR/OVACE/SCA/ICTUS a formato checklist para APP (sin reescribir medicina)

#### Procedimientos TES
- [x] Seguridad en escena (checklist)
- [x] Valoración ABCDE
- [x] Triage START
- [x] Inmovilización espinal
- [x] Extricación vehicular
- [ ] Procedimientos con material específico (O2, electrodos, material IOT)
- [ ] Constantes vitales y rangos normales
- [ ] Guías de dosificación por peso/edad

#### Vademécum y Referencias
- [x] 5 fármacos base (Adrenalina, Amiodarona, Atropina, Midazolam, Salbutamol)
- [x] Abreviaturas comunes
- [ ] Expandir vademécum (mínimo 30-40 fármacos)
- [ ] Interacciones medicamentosas
- [ ] Antídotos y antagonistas

#### Conducción y Comunicación
- [x] Principios de conducción en urgencia
- [x] Uso de luces y sirena
- [x] Comunicación con paciente y familiares
- [x] Gestión del estrés del profesional
- [ ] Técnicas avanzadas de comunicación en situaciones críticas

#### Implementación Técnica
- [ ] Arquitectura de abstracción de datos (`DataService`)
- [ ] Migración de datos a JSON
- [ ] Service Worker para offline
- [ ] Manifest PWA completo
- [ ] Error boundaries
- [ ] Validación de datos en runtime
- [ ] Persistencia local (favoritos, historial)

### Fase B (Evolución) - Interactividad e IA Segura

**Objetivo:** Evolución a flujos interactivos y asistencia inteligente segura (NO diagnóstico).

#### Flujos Interactivos
- [ ] Árboles de decisión para protocolos transtelefónicos
- [ ] Navegación condicional entre pasos
- [ ] Validación de comprensión en pasos críticos
- [ ] Adaptación dinámica según edad/situación/recursos
- [ ] Feedback en tiempo real

#### Simulaciones
- [ ] Modo de práctica para protocolos
- [ ] Simulaciones de escenarios
- [ ] Métricas de calidad de técnica (si hay sensores)
- [ ] Análisis post-simulación

#### IA Segura (NO Diagnóstico)
- [ ] Análisis de audio para validación de ritmo de compresiones
- [ ] Detección de sonidos (tos efectiva, resolución OVACE)
- [ ] Priorización de casos según síntomas (con validación humana)
- [ ] Sugerencias de ajuste de técnica
- [ ] Validación de comprensión del testigo
- [ ] Reformulación de instrucciones según nivel de comprensión

**Principios de IA Segura:**
- ❌ NO diagnóstico médico
- ❌ NO toma de decisiones clínicas
- ✅ Solo apoyo procedimental
- ✅ Validación humana siempre requerida
- ✅ Transparencia total en sugerencias

---

## 4) QUÉ VA A APP VS DOC

### APP (Intervención Rápida) - [APP]

**Criterio:** Contenido necesario durante una intervención activa, consulta rápida en emergencia.

**Incluye:**
- ✅ Protocolos de soporte vital (RCP, OVACE, Shock)
- ✅ Protocolos transtelefónicos (PCR, OVACE, SCA)
- ✅ Vademécum de fármacos (dosis, indicaciones, contraindicaciones)
- ✅ Calculadoras (Glasgow, perfusiones)
- ✅ Guías de actuación en escena (Seguridad, ABCDE, Triage)
- ✅ Patologías por sistemas (clínica y actuación)
- ✅ Tablas de referencia rápida
- ✅ Checklists interactivos
- ✅ Flujos paso a paso

**Características:**
- Consulta en <3 segundos
- Navegación intuitiva
- Optimizado para móvil/tablet
- Funciona offline
- UI optimizada para uso con guantes

### DOC (Lectura/Estudio) - [DOC]

**Criterio:** Contenido formativo, de referencia, o que requiere lectura pausada.

**Incluye:**
- ✅ Avisos legales y responsabilidad médica
- ✅ Principios de comunicación en emergencias
- ✅ Conducción y seguridad vial (principios generales)
- ✅ Comunicación con paciente y familiares
- ✅ Gestión del estrés del profesional
- ✅ Abreviaturas (glosario)
- ✅ Roadmap de evolución
- ✅ Criterios de éxito
- ✅ Estrategia de implementación

**Características:**
- Lectura pausada
- Formación y referencia
- No requiere acceso rápido
- Puede estar en sección separada de la app

---

## 5) BACKLOG PRIORIZADO

### 🔴 Alta Prioridad

**Contenido:**
- [ ] Unificar el plan en `docs/MANUAL_TES_DIGITAL.md` (✅ Completado)
- [ ] Crear índice por capítulos navegable
- [ ] Convertir PCR/OVACE/SCA/ICTUS a formato checklist para APP (sin reescribir medicina)
- [ ] Validación médica del contenido completo
- [ ] Revisión contra guías oficiales (ERC, AHA, SEMES)

**Implementación:**
- [ ] Arquitectura de abstracción de datos (`DataService`)
- [ ] Migración de datos a JSON
- [ ] Service Worker para funcionamiento offline
- [ ] Error boundaries y manejo de errores

**Legal:**
- [ ] Disclaimer médico prominente en app
- [ ] Términos de uso completos
- [ ] Revisión legal del contenido

### 🟡 Media Prioridad

**Contenido:**
- [ ] Expandir vademécum (mínimo 30-40 fármacos)
- [ ] Protocolo Ictus completo (actualmente parcial)
- [ ] Procedimientos con material específico
- [ ] Constantes vitales y rangos normales
- [ ] Interacciones medicamentosas

**Implementación:**
- [ ] Persistencia local (favoritos, historial)
- [ ] Búsqueda avanzada
- [ ] Filtros por categoría/edad/prioridad
- [ ] Compartir protocolos

**UX:**
- [ ] Optimización de UI para uso con guantes
- [ ] Modo oscuro optimizado para ambulancias
- [ ] Accesos rápidos personalizables

### 🟢 Baja Prioridad

**Contenido:**
- [ ] Técnicas avanzadas de comunicación
- [ ] Guías de rehabilitación post-emergencia
- [ ] Prevención secundaria

**Implementación:**
- [ ] Analytics locales (opcional, con consentimiento)
- [ ] Exportar protocolos a PDF
- [ ] Sincronización entre dispositivos (Fase B)

**Evolución:**
- [ ] Flujos interactivos (Fase B)
- [ ] Simulaciones (Fase B)
- [ ] IA segura (Fase B, futuro)

---

## 6) DECISIONES TOMADAS (No debatir salvo cambio)

### Decisiones Fundamentales

1. **El manual es la fuente de la verdad**
   - `docs/MANUAL_TES_DIGITAL.md` es la única fuente de verdad del contenido clínico
   - Todo el contenido debe estar en el manual antes de implementarse en la app
   - Cualquier cambio en contenido debe reflejarse primero en el manual

2. **La IA NO diagnostica ni decide; solo estructura, recuerda o entrena**
   - La IA solo puede usarse para:
     - Estructurar información
     - Recordar protocolos
     - Entrenar/validar técnica (NO diagnóstico)
   - La IA NO puede:
     - Diagnosticar patologías
     - Tomar decisiones clínicas
     - Interpretar pruebas diagnósticas
     - Sustituir el criterio profesional

3. **La APP es "modo intervención" (checklists/flujo rápido), el resto va a DOC**
   - [APP]: Contenido necesario durante intervención activa
   - [DOC]: Contenido formativo, de referencia, o lectura pausada
   - Criterio: Si se necesita en <3 segundos durante emergencia → APP

4. **Offline-First (Fase A)**
   - La aplicación debe funcionar 100% offline
   - Sin dependencia de backend en Fase A
   - Service Worker para cache agresivo
   - Datos embebidos en bundle

5. **Validación Médica Obligatoria**
   - Todo contenido clínico debe ser validado por profesionales médicos
   - Revisión contra guías oficiales antes de producción
   - Versionado de contenido con fecha de validación

6. **Responsabilidad del Profesional**
   - El manual/app es herramienta de apoyo, no sustituye formación reglada
   - El profesional mantiene responsabilidad completa de sus actuaciones
   - Disclaimer médico siempre visible

7. **Preparación para Evolución (Fase B)**
   - Arquitectura preparada para backend futuro
   - Abstracción de acceso a datos desde el inicio
   - Estructura de datos compatible con flujos interactivos
   - IDs estables para sincronización futura

8. **No Sobre-ingeniería**
   - Implementar solo lo necesario para Fase A
   - Preparar interfaces simples para Fase B
   - Refactor cuando sea necesario, no prematuramente

---

## 7) REGISTRO DE CAMBIOS (Changelog)

### 2024-12-13

**Añadido:**
- ✅ Manual unificado (`docs/MANUAL_TES_DIGITAL.md`) creado
  - 9 capítulos principales
  - ~1,200 líneas de contenido clínico
  - Etiquetado [APP], [DOC], [IA_FUTURA]
  - Protocolos transtelefónicos completos (PCR, OVACE, SCA)
  - Vademécum de 5 fármacos
  - 10 patologías por sistemas
  - Calculadoras (Glasgow, perfusiones)

**Actualizado:**
- ✅ Plan maestro (`PLAN_CAMINO_A_Y_EVOLUCION_A_B.md`)
  - Añadida sección 5: Protocolos Transtelefónicos Específicos
  - Versión actualizada a 1.1

**Creado:**
- ✅ Archivo de control del proyecto (`docs/CONTROL_PROYECTO.md`)
- ✅ Resumen del manual (`docs/RESUMEN_MANUAL_TES.md`)

**Estado:**
- Manual unificado completado
- Pendiente: Validación médica
- Pendiente: Implementación en app

---

## 8) NOTAS Y OBSERVACIONES

### Pendientes Críticos
- ⚠️ **Validación médica:** Todo el contenido requiere revisión médica antes de producción
- ⚠️ **Protocolo Ictus:** Actualmente solo parcial en patologías, necesita protocolo completo
- ⚠️ **Vademécum:** Solo 5 fármacos, necesita expansión a 30-40 mínimo

### Próximas Reuniones/Decisiones
- [ ] Revisión médica del manual (fecha pendiente)
- [ ] Decisión sobre formato de checklist para protocolos
- [ ] Priorización de expansión de contenido

### Dependencias Externas
- Guías oficiales (ERC, AHA, SEMES) para validación
- Revisión legal de disclaimer y términos de uso
- Validación médica profesional

---

**Este documento debe actualizarse cada vez que:**
- Se complete una tarea del backlog
- Se tome una decisión importante
- Se añada o modifique contenido
- Cambie el estado del proyecto

**Mantener este documento sincronizado con el estado real del proyecto.**

