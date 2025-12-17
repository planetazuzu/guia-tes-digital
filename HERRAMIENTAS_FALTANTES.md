# 🔧 Herramientas Propuestas que Faltan

**Fecha:** 2025-12-17

---

## 📋 Resumen Ejecutivo

Según el análisis del código y la documentación, estas son las herramientas mencionadas o propuestas que aún **NO están implementadas**:

---

## ❌ Calculadoras Faltantes

### 1. 🔥 Fórmula de Parkland (Quemados)
**Estado:** ✅ **IMPLEMENTADA**  
**Ubicación:** `src/components/tools/ParklandCalculator.tsx`  
**Descripción:** Calculadora para calcular líquidos en pacientes quemados según la fórmula de Parkland.

**Fórmula:**
- **Adultos:** 4 ml × peso (kg) × % superficie corporal quemada
- **Primeras 24h:** 50% en primeras 8h, 50% en siguientes 16h
- **Siguientes 24h:** Mantenimiento + evaporación

**Campos necesarios:**
- Peso del paciente (kg)
- Porcentaje de superficie corporal quemada (%)
- Tiempo desde la quemadura (horas)

**Prioridad:** 🔴 Alta (mencionada explícitamente como "Próximamente disponible")

---

### 2. ⚖️ Dosis Pediátricas por Peso
**Estado:** ✅ **IMPLEMENTADA**  
**Ubicación:** `src/components/tools/PediatricDoseCalculator.tsx`  
**Descripción:** Calculadora para calcular dosis de fármacos pediátricos basada en peso corporal.

**Funcionalidad esperada:**
- Selección de fármaco
- Peso del paciente (kg)
- Cálculo automático de dosis según protocolo pediátrico
- Conversión entre diferentes unidades (mg, ml, mcg)
- Advertencias de dosis máxima/minima

**Prioridad:** 🔴 Alta (mencionada explícitamente como "Próximamente disponible")

---

### 3. ⏱️ Temporizador de RCP
**Estado:** ❌ No implementada  
**Ubicación:** Mencionado en `INFORME_PROYECTO.md` (línea 231)  
**Descripción:** Temporizador para ciclos de RCP con alertas de cambio de reanimador.

**Funcionalidad esperada:**
- Temporizador de 2 minutos por ciclo
- Alertas sonoras/visuales
- Contador de ciclos
- Recordatorio de cambio de reanimador
- Pausa para desfibrilación

**Prioridad:** 🟡 Media (mencionado pero no crítico)

---

### 4. 💨 Calculadora de Duración de Botella de Oxígeno
**Estado:** ❌ No implementada  
**Ubicación:** Mencionado en `manual-tes/CONTROL_PROYECTO.md` (línea 65)  
**Descripción:** Calculadora para estimar cuánto tiempo durará una botella de oxígeno según flujo y presión.

**Fórmula:**
- Tiempo (minutos) = (Presión (PSI) × Factor de conversión) / Flujo (L/min)
- Factor de conversión depende del tamaño de la botella

**Campos necesarios:**
- Tamaño de botella (D, E, M, G, H)
- Presión actual (PSI o bar)
- Flujo de oxígeno (L/min)

**Prioridad:** 🟡 Media (mencionado en manual pero no implementado)

---

## 📊 Tablas y Referencias Faltantes

### 5. 📋 Más Tablas de Perfusión
**Estado:** ⚠️ Parcialmente implementado  
**Ubicación:** `src/pages/Herramientas.tsx` (pestaña "Perfusiones")  
**Implementado:** Dopamina, Noradrenalina  
**Faltante:**
- Adrenalina
- Dobutamina
- Nitroglicerina
- Furosemida
- Otros fármacos de perfusión comunes

**Prioridad:** 🟡 Media

---

### 6. 📐 Calculadora de Superficie Corporal (SC)
**Estado:** ❌ No implementada  
**Descripción:** Cálculo de superficie corporal para dosificación de fármacos.

**Fórmulas:**
- **Mosteller:** SC (m²) = √[(altura (cm) × peso (kg)) / 3600]
- **DuBois:** SC (m²) = 0.007184 × altura (cm)^0.725 × peso (kg)^0.425

**Prioridad:** 🟢 Baja

---

### 7. 🧮 Calculadora de Índice de Masa Corporal (IMC)
**Estado:** ❌ No implementada  
**Descripción:** Cálculo de IMC para evaluación nutricional y dosificación.

**Fórmula:**
- IMC = peso (kg) / altura (m)²

**Prioridad:** 🟢 Baja

---

### 8. 💉 Calculadora de Goteo
**Estado:** ❌ No implementada  
**Descripción:** Conversión entre ml/h, gotas/minuto y tiempo de infusión.

**Fórmulas:**
- Gotas/minuto = (Volumen (ml) × Factor goteo) / Tiempo (minutos)
- Factor goteo: 20 gotas/ml (macrogoteo) o 60 gotas/ml (microgoteo)

**Prioridad:** 🟡 Media

---

## 🛠️ Herramientas de Escena Faltantes

### 9. 📍 Calculadora de Triage START
**Estado:** ⚠️ Parcialmente implementado  
**Ubicación:** `src/pages/Escena.tsx`  
**Descripción:** Herramienta interactiva para clasificar pacientes según protocolo START.

**Funcionalidad esperada:**
- Preguntas guiadas paso a paso
- Cálculo automático de categoría (Rojo, Amarillo, Verde, Negro)
- Recordatorio de criterios
- Historial de triage

**Prioridad:** 🟡 Media

---

### 10. 📏 Calculadora de Talla de Collarín Cervical
**Estado:** ❌ No implementada  
**Ubicación:** Mencionado en `manual-tes/CONTROL_PROYECTO.md` (Bloque 02)  
**Descripción:** Guía para seleccionar la talla correcta de collarín cervical.

**Campos necesarios:**
- Distancia mentón-esternón (cm)
- Altura del paciente (cm)
- Edad aproximada

**Prioridad:** 🟡 Media

---

## 📱 Funcionalidades de Herramientas Faltantes

### 11. 💾 Persistencia de Resultados
**Estado:** ❌ No implementada  
**Descripción:** Guardar resultados de calculadoras para referencia posterior.

**Funcionalidad esperada:**
- Guardar cálculos realizados
- Historial de calculadoras usadas
- Exportar resultados

**Prioridad:** 🟢 Baja

---

### 12. 📤 Compartir Resultados
**Estado:** ❌ No implementada  
**Descripción:** Compartir resultados de calculadoras por WhatsApp, email, etc.

**Prioridad:** 🟢 Baja

---

## 📊 Resumen por Prioridad

### 🔴 Alta Prioridad (Implementar primero)
1. ✅ **Fórmula de Parkland (Quemados)** - Ya mencionada como "Próximamente"
2. ✅ **Dosis Pediátricas por Peso** - Ya mencionada como "Próximamente"

### 🟡 Media Prioridad
3. Temporizador de RCP
4. Calculadora de Duración de Botella de Oxígeno
5. Más Tablas de Perfusión
6. Calculadora de Goteo
7. Calculadora de Triage START (mejora)
8. Calculadora de Talla de Collarín Cervical

### 🟢 Baja Prioridad
9. Calculadora de Superficie Corporal
10. Calculadora de IMC
11. Persistencia de Resultados
12. Compartir Resultados

---

## 📝 Notas Técnicas

### Componentes Existentes que Pueden Reutilizarse
- ✅ `GlasgowCalculator.tsx` - Estructura base para otras calculadoras
- ✅ `InfusionTableView.tsx` - Estructura para tablas
- ✅ Sistema de tabs en `Herramientas.tsx`

### Estructura Sugerida para Nuevas Calculadoras
```typescript
// Ejemplo: src/components/tools/ParklandCalculator.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ParklandCalculator = () => {
  // Estado y lógica de cálculo
  // UI similar a GlasgowCalculator
};
```

---

## ✅ Estado Actual de Herramientas Implementadas

### ✅ Implementadas y Funcionando
- ✅ Calculadora de Glasgow (GCS)
- ✅ Tablas de Perfusión (Dopamina, Noradrenalina)
- ✅ Guía de Terminología Anatómica
- ✅ Sección de Códigos Protocolo (enlaces)

---

**Total de herramientas faltantes identificadas:** 12  
**Prioridad alta:** 2 (1 completada ✅, 1 pendiente)  
**Prioridad media:** 6  
**Prioridad baja:** 4

---

## ✅ Herramientas Completadas

### ✅ Dosis Pediátricas por Peso - COMPLETADA
**Fecha de implementación:** 2025-12-17  
**Archivos creados:**
- `src/components/tools/PediatricDoseCalculator.tsx` - Componente principal
- `src/data/pediatric-drugs.ts` - Base de datos de fármacos pediátricos con dosis

**Funcionalidades implementadas:**
- ✅ Selección de fármaco de lista de 10 fármacos comunes
- ✅ Cálculo automático de dosis por peso (mg/kg)
- ✅ Conversión a volumen (ml) según concentración
- ✅ Aplicación de dosis mínima y máxima
- ✅ Advertencias cuando se excede dosis máxima
- ✅ Información detallada del fármaco (presentación, concentración, vía)
- ✅ Notas importantes por fármaco
- ✅ Validación de inputs
- ✅ Recordatorios de verificación obligatoria
- ✅ UI consistente con el resto de la aplicación

**Fármacos incluidos:**
1. Adrenalina (Anafilaxia) - 0.01 mg/kg IM
2. Adrenalina (PCR) - 0.01 mg/kg IV/IO
3. Amiodarona - 5 mg/kg IV/IO
4. Atropina - 0.02 mg/kg IV/IO
5. Midazolam (Crisis) - 0.2-0.3 mg/kg Intranasal/Bucal
6. Salbutamol (Nebulización) - 0.15 mg/kg
7. Furosemida - 1-2 mg/kg IV/IO
8. Morfina - 0.1-0.2 mg/kg IV/IO
9. Naloxona - 0.01-0.1 mg/kg IV/IO/IM
10. Glucosa (Dextrosa) - 0.5-1 g/kg IV/IO

---

## ✅ Herramientas Completadas

### ✅ Fórmula de Parkland (Quemados) - COMPLETADA
**Fecha de implementación:** 2025-12-17  
**Archivos creados:**
- `src/components/tools/ParklandCalculator.tsx` - Componente principal
- `src/data/calculators.ts` - Función `calculateParkland()` agregada

**Funcionalidades implementadas:**
- ✅ Cálculo de líquidos totales en primeras 24h
- ✅ Distribución 50% primeras 8h / 50% siguientes 16h
- ✅ Cálculo de velocidades de infusión
- ✅ Ajuste según tiempo transcurrido desde la quemadura
- ✅ Cálculo de mantenimiento después de 24h
- ✅ Advertencias y consideraciones clínicas
- ✅ Validación de inputs
- ✅ UI consistente con el resto de la aplicación
