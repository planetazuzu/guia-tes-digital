# 🔗 Guía: Enlaces de Referencia entre Capítulos

**Fecha:** 2024-12-19  
**Objetivo:** Añadir enlaces cruzados entre capítulos relacionados del manual

---

## 📋 FORMATO ESTÁNDAR

### Sección de Enlaces Recomendados

Añadir al final de cada capítulo (antes de la línea final):

```markdown
---

## 🔗 Enlaces recomendados / Guía de referencia

### Capítulos relacionados
- [Título del Capítulo Relacionado](../ruta/relativa/al/archivo.md)
- [Otro Capítulo Relacionado](../ruta/relativa/al/archivo.md)

### Prerrequisitos
- [Capítulo que debe leerse antes](../ruta/relativa/al/archivo.md)

### Continuación
- [Capítulo siguiente en la secuencia](../ruta/relativa/al/archivo.md)
```

---

## 📁 ESTRUCTURA DE RUTAS

### Desde `MANUAL_TES_DIGITAL/BLOQUE_X/archivo.md`

**Ejemplo:** `MANUAL_TES_DIGITAL/04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md`

#### Enlaces a capítulos del mismo bloque:
```markdown
- [Inmovilización Manual](./BLOQUE_02_2_INMOVILIZACION_MANUAL.md)
- [Tablero Espinal](./BLOQUE_02_5_TABLERO_ESPINAL.md)
```

#### Enlaces a capítulos de otro bloque:
```markdown
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md)
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md)
```

#### Enlaces a capítulos de otra parte:
```markdown
- [Fundamentos de Emergencias](../01_FUNDAMENTOS_Y_CONCEPTOS/BLOQUE_00_FUNDAMENTOS_EMERGENCIAS.md)
```

---

## 🎯 CATEGORÍAS DE ENLACES

### 1. Prerrequisitos (Debe leerse antes)
```markdown
### Prerrequisitos
- [Fundamentos de Emergencias](../01_FUNDAMENTOS_Y_CONCEPTOS/BLOQUE_00_FUNDAMENTOS_EMERGENCIAS.md)
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md)
```

### 2. Relacionados (Temas complementarios)
```markdown
### Capítulos relacionados
- [Inmovilización Manual](./BLOQUE_02_2_INMOVILIZACION_MANUAL.md)
- [Tablero Espinal](./BLOQUE_02_5_TABLERO_ESPINAL.md)
- [Colchón de Vacío](./BLOQUE_02_6_COLCHON_VACIO.md)
```

### 3. Continuación (Siguiente en secuencia)
```markdown
### Continuación
- [Preparación para Traslado](./BLOQUE_08_1_PREPARACION_TRASLADO.md)
- [Gestión durante Traslado](./BLOQUE_08_2_GESTION_DURANTE_TRASLADO.md)
```

### 4. Aplicación práctica (Dónde se usa)
```markdown
### Aplicación práctica
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md)
- [Protocolos Transtelefónicos](../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md)
```

---

## 📝 EJEMPLOS POR BLOQUE

### Bloque 2 - Inmovilización

**Archivo:** `BLOQUE_02_3_COLLARIN_CERVICAL.md`

```markdown
---

## 🔗 Enlaces recomendados / Guía de referencia

### Prerrequisitos
- [Anatomía Operativa](./BLOQUE_02_0_ANATOMIA_OPERATIVA.md)
- [Inmovilización Manual](./BLOQUE_02_2_INMOVILIZACION_MANUAL.md)

### Capítulos relacionados
- [Tablero Espinal](./BLOQUE_02_5_TABLERO_ESPINAL.md)
- [Colchón de Vacío](./BLOQUE_02_6_COLCHON_VACIO.md)
- [Extricación y Movimientos Bloque](./BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md)

### Aplicación práctica
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md)
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md)
```

### Bloque 3 - Oxigenoterapia

**Archivo:** `BLOQUE_03_0_OXIGENOTERAPIA_FUNDAMENTOS.md`

```markdown
---

## 🔗 Enlaces recomendados / Guía de referencia

### Prerrequisitos
- [Constantes Vitales](../02_PROCEDIMIENTOS_BASICOS/1.1_constantes_vitales.md)
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md)

### Capítulos relacionados
- [Dispositivos de Oxigenoterapia](./BLOQUE_03_1_DISPOSITIVOS_OXIGENOTERAPIA.md)
- [Ventilación BVM](./BLOQUE_03_3_BVM.md)
- [Monitorización Básica](./BLOQUE_03_10_MONITORIZACION_BASICA.md)

### Aplicación práctica
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md)
- [Ventilación BVM](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_5_VENTILACION_BVM.md)
```

### Bloque 4 - Soporte Vital

**Archivo:** `BLOQUE_04_1_RCP_ADULTOS.md`

```markdown
---

## 🔗 Enlaces recomendados / Guía de referencia

### Prerrequisitos
- [Reconocimiento de PCR](./BLOQUE_04_0_RECONOCIMIENTO_PCR.md)
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md)

### Capítulos relacionados
- [RCP Pediátrica](./BLOQUE_04_2_RCP_PEDIATRIA.md)
- [RCP Lactantes](./BLOQUE_04_3_RCP_LACTANTES.md)
- [Uso de DESA](./BLOQUE_04_4_USO_DESA.md)
- [Ventilación BVM](./BLOQUE_04_5_VENTILACION_BVM.md)

### Protocolos transtelefónicos
- [RCP Transtelefónica Adultos](../06_PROTOCOLOS_TRANSTELEFONICOS/BLOQUE_05_1_RCP_TRANSTELEFONICA_ADULTOS.md)

### Continuación
- [RCP Pediátrica](./BLOQUE_04_2_RCP_PEDIATRIA.md)
```

---

## 🔧 CONVERSIÓN DE RUTAS

### De ruta de archivo a ruta relativa en Markdown

**Ruta del archivo:** `MANUAL_TES_DIGITAL/04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md`

**Ruta relativa desde otro archivo:**

#### Desde mismo bloque:
```markdown
- [Tablero Espinal](./BLOQUE_02_5_TABLERO_ESPINAL.md)
```

#### Desde bloque diferente (misma parte):
```markdown
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md)
```

#### Desde otra parte:
```markdown
- [Fundamentos](../01_FUNDAMENTOS_Y_CONCEPTOS/BLOQUE_00_FUNDAMENTOS_EMERGENCIAS.md)
```

---

## 📋 CHECKLIST PARA AÑADIR ENLACES

Antes de añadir enlaces a un capítulo:

- [ ] Identificar capítulos relacionados (mismo tema)
- [ ] Identificar prerrequisitos (qué debe leerse antes)
- [ ] Identificar continuación (siguiente en secuencia)
- [ ] Verificar que las rutas relativas son correctas
- [ ] Probar que los enlaces funcionan en la app
- [ ] Añadir sección al final del capítulo (antes de línea final)

---

## 🎯 PRIORIDADES

### Alta Prioridad (Añadir enlaces ahora)
1. **Bloque 2 - Inmovilización** (todos los capítulos están relacionados)
2. **Bloque 3 - Oxigenoterapia** (secuencia lógica clara)
3. **Bloque 4 - Soporte Vital** (RCP adulto → pediátrico → lactante)
4. **Bloque 6 - Farmacología** (principios → preparación → fármacos)

### Media Prioridad
5. **Bloque 5 - Protocolos Transtelefónicos** (relacionados con Bloque 4)
6. **Bloque 8 - Transferencia** (secuencia clara)

### Baja Prioridad
7. Resto de bloques

---

## ✅ EJEMPLO COMPLETO

**Archivo:** `MANUAL_TES_DIGITAL/04_MATERIAL_E_INMOVILIZACION/BLOQUE_02_3_COLLARIN_CERVICAL.md`

Añadir al final:

```markdown
---

## 🔗 Enlaces recomendados / Guía de referencia

### Prerrequisitos
- [Anatomía Operativa](./BLOQUE_02_0_ANATOMIA_OPERATIVA.md) - Fundamentos anatómicos
- [Inmovilización Manual](./BLOQUE_02_2_INMOVILIZACION_MANUAL.md) - Técnica previa

### Capítulos relacionados (Sistema de Inmovilización)
- [Tablero Espinal](./BLOQUE_02_5_TABLERO_ESPINAL.md) - Inmovilización corporal completa
- [Colchón de Vacío](./BLOQUE_02_6_COLCHON_VACIO.md) - Alternativa al tablero
- [Camilla Cuchara](./BLOQUE_02_4_CAMILLA_CUCHARA.md) - Dispositivo de transferencia
- [Extricación y Movimientos Bloque](./BLOQUE_02_7_EXTRICACION_MOVIMIENTOS_BLOQUE.md) - Técnicas de movilización

### Aplicación práctica
- [ABCDE Operativo](../02_PROCEDIMIENTOS_BASICOS/1.2_abcde_operativo.md) - Valoración inicial
- [RCP Adultos](../03_SOPORTE_VITAL_BASICO/BLOQUE_04_1_RCP_ADULTOS.md) - Contexto de uso
- [Transferencia y Movilización](./BLOQUE_02_8_TRANSFERENCIAS_MOVILIZACION.md) - Continuación del proceso

### Errores y prevención
- [Errores Críticos en Inmovilización](./BLOQUE_02_9_ERRORES_CRITICOS.md) - Errores comunes a evitar
```

---

**Última actualización:** 2024-12-19
