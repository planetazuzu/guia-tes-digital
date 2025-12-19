# 📋 Guía: Cómo Añadir Protocolos

**Archivo:** `src/data/procedures.ts`

---

## 📊 PROTOCOLOS ACTUALES (5 protocolos)

1. ✅ `rcp-adulto-svb` - RCP Adulto SVB
2. ✅ `rcp-adulto-sva` - RCP Adulto SVA
3. ✅ `rcp-pediatrico` - RCP Pediátrico
4. ✅ `obstruccion-via-aerea` - OVACE
5. ✅ `shock-hemorragico` - Shock Hemorrágico

---

## 📝 ESTRUCTURA DE UN PROTOCOLO

```typescript
{
  id: 'identificador-unico',           // REQUERIDO: único, sin espacios, minúsculas
  title: 'Título Completo',            // REQUERIDO: título descriptivo completo
  shortTitle: 'Título Corto',          // REQUERIDO: título corto para cards
  category: 'soporte_vital',           // REQUERIDO: 'soporte_vital' | 'patologias' | 'escena'
  subcategory: 'rcp',                  // OPCIONAL: para filtrado (ej: 'rcp', 'via_aerea', 'shock')
  priority: 'critico',                 // REQUERIDO: 'critico' | 'alto' | 'medio' | 'bajo'
  ageGroup: 'adulto',                  // REQUERIDO: 'adulto' | 'pediatrico' | 'neonatal' | 'todos'
  steps: [                             // REQUERIDO: array de pasos (strings)
    'Paso 1 del protocolo',
    'Paso 2 del protocolo',
    // ...
  ],
  warnings: [                          // REQUERIDO: array de advertencias
    'Advertencia importante 1',
    'Advertencia importante 2',
    // ...
  ],
  keyPoints: [                         // OPCIONAL: puntos clave a recordar
    'Punto clave 1',
    'Punto clave 2',
  ],
  equipment: [                         // OPCIONAL: material necesario
    'Material 1',
    'Material 2',
  ],
  drugs: [                             // OPCIONAL: fármacos relacionados
    'Fármaco 1',
    'Fármaco 2',
  ],
}
```

---

## ✅ VALORES PERMITIDOS

### category (REQUERIDO)
- `'soporte_vital'` - Protocolos de soporte vital
- `'patologias'` - Protocolos de patologías
- `'escena'` - Protocolos de actuación en escena

### priority (REQUERIDO)
- `'critico'` - Prioridad crítica (rojo)
- `'alto'` - Prioridad alta (naranja)
- `'medio'` - Prioridad media (amarillo)
- `'bajo'` - Prioridad baja (verde)

### ageGroup (REQUERIDO)
- `'adulto'` - Para adultos
- `'pediatrico'` - Para niños (1 año - pubertad)
- `'neonatal'` - Para neonatos/lactantes (<1 año)
- `'todos'` - Para todos los grupos de edad

### subcategory (OPCIONAL)
Usado para filtrado en la página de Soporte Vital. Valores comunes:
- `'rcp'` - Protocolos de RCP
- `'via_aerea'` - Protocolos de vía aérea
- `'shock'` - Protocolos de shock
- O cualquier otro valor que necesites

---

## 🔍 CÓMO VERIFICAR SI UN PROTOCOLO EXISTE

Cuando añadas un protocolo, verificaré:

1. **ID único:** El `id` debe ser único. Si ya existe, te avisaré.
2. **Título similar:** Si hay títulos muy similares, te sugeriré revisar.
3. **Estructura correcta:** Verificaré que todos los campos requeridos estén presentes.
4. **Valores válidos:** Verificaré que los valores de `category`, `priority`, `ageGroup` sean válidos.

---

## 📝 EJEMPLO DE PROTOCOLO NUEVO

```typescript
{
  id: 'ictus-agudo',
  title: 'Ictus Agudo - Protocolo de Actuación',
  shortTitle: 'Ictus Agudo',
  category: 'soporte_vital',
  subcategory: 'neurologico',
  priority: 'critico',
  ageGroup: 'adulto',
  steps: [
    'Reconocimiento: FAST (Face, Arm, Speech, Time)',
    'Valorar tiempo desde inicio de síntomas',
    'Posición: decúbito supino con cabeza elevada 30°',
    'Oxigenoterapia si SpO₂ <94%',
    'Monitorización continua: TA, FC, SpO₂, Glasgow',
    'NO administrar nada por vía oral',
    'Traslado urgente a hospital con unidad de ictus',
    'Comunicar tiempo de inicio de síntomas',
  ],
  warnings: [
    'Tiempo es cerebro: cada minuto cuenta',
    'NO administrar aspirina hasta confirmar que no es hemorrágico',
    'Mantener TA <185/110 mmHg si es candidato a trombólisis',
    'Evitar hipotensión',
  ],
  keyPoints: [
    'Tiempo desde inicio: crítico para trombólisis',
    'FAST: Face (cara), Arm (brazo), Speech (habla), Time (tiempo)',
    'Hospital con unidad de ictus: reducir tiempo de traslado',
  ],
  equipment: ['Oxímetro', 'Monitor', 'Material de oxigenoterapia'],
  drugs: ['Oxígeno'],
}
```

---

## 🎯 PROCESO RECOMENDADO

1. **Añade el protocolo** al array `procedures` en `src/data/procedures.ts`
2. **Yo verificaré:**
   - Si el ID ya existe → Te avisaré y sugeriré cambios
   - Si hay títulos similares → Te avisaré para revisar
   - Si la estructura es correcta → Te confirmaré
   - Si hay valores inválidos → Te indicaré qué corregir

3. **Si el protocolo es nuevo y correcto:**
   - ✅ Lo dejaré como está
   - ✅ Se mostrará automáticamente en la app

4. **Si hay conflictos o mejoras:**
   - ⚠️ Te sugeriré cambios específicos
   - ⚠️ Te indicaré qué protocolos similares ya existen

---

## 💡 CONSEJOS

1. **IDs descriptivos:** Usa IDs claros (ej: `ictus-agudo`, `anafilaxia`, `crisis-asmatica`)
2. **Títulos claros:** El `title` debe ser descriptivo, el `shortTitle` debe ser corto
3. **Pasos numerados:** Los pasos deben ser claros y secuenciales
4. **Advertencias importantes:** Incluye advertencias críticas en `warnings`
5. **Subcategorías:** Usa subcategorías para facilitar el filtrado

---

## 🔄 SUB categorías actuales

Las subcategorías actuales en uso son:
- `'rcp'` - Para protocolos de RCP
- `'via_aerea'` - Para protocolos de vía aérea
- `'shock'` - Para protocolos de shock

Puedes crear nuevas subcategorías según necesites (ej: `'neurologico'`, `'respiratorio'`, `'cardiologico'`, etc.)

---

**Última actualización:** 2025-01-27
