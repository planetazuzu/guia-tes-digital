# 🖼️ Organizador de Infografías y Medios

Herramienta para organizar automáticamente las infografías y medios según la estructura definida en `LISTADO_COMPLETO_MEDIOS_FALTANTES.md`.

## 📋 Descripción

Este script permite:
- ✅ Seleccionar archivos de imágenes (SVG, PNG, JPG, etc.)
- ✅ Identificar automáticamente a qué infografía corresponde cada archivo
- ✅ Mover y renombrar archivos según la estructura correcta
- ✅ Manejar series de imágenes (paso a paso)
- ✅ Crear las carpetas necesarias automáticamente

## 🚀 Uso

### Opción 1: Ejecutar desde el directorio raíz del proyecto

```bash
# Desde el directorio raíz del proyecto
python scripts/organizar_infografias.py
```

### Opción 2: Ejecutar directamente

```bash
# Hacer ejecutable (solo la primera vez)
chmod +x scripts/organizar_infografias.py

# Ejecutar
./scripts/organizar_infografias.py
```

## 📖 Ejemplo de Uso

### Escenario 1: Archivos en el directorio actual

1. Coloca las imágenes en el directorio raíz del proyecto (o donde prefieras)
2. Ejecuta el script:
   ```bash
   python scripts/organizar_infografias.py
   ```
3. Presiona Enter cuando te pida los archivos (buscará automáticamente)
4. Selecciona la infografía correspondiente para cada archivo
5. El script moverá y renombrará los archivos automáticamente

### Escenario 2: Especificar archivos manualmente

1. Ejecuta el script:
   ```bash
   python scripts/organizar_infografias.py
   ```
2. Ingresa las rutas de los archivos separadas por comas:
   ```
   Archivos: imagen1.svg, imagen2.png, /ruta/completa/imagen3.svg
   ```
3. Selecciona la infografía correspondiente para cada archivo

## 🎯 Características

### Identificación Automática

El script intenta identificar automáticamente a qué infografía corresponde cada archivo basándose en palabras clave en el nombre del archivo:

- **Collarín/Collarin**: Infografías relacionadas con collarín cervical
- **Tablero**: Infografías del tablero espinal
- **Colchón**: Infografías del colchón de vacío
- **Oxígeno/Oxigeno**: Infografías de oxigenoterapia
- **GPS**: Infografías de configuración GPS
- etc.

### Series de Imágenes

Para imágenes que son parte de una serie (como "Colocación de Collarín Paso a Paso"), el script:

1. Detecta automáticamente el número de paso del nombre del archivo
2. Si no lo detecta, pregunta al usuario
3. Renombra el archivo como: `colocacion-collarín-paso-1.svg`, `colocacion-collarín-paso-2.svg`, etc.

### Estructura de Carpetas

Los archivos se organizan automáticamente en:

```
public/assets/infografias/
├── bloque-0-fundamentos/
├── bloque-2-inmovilizacion/
├── bloque-3-material-sanitario/
├── bloque-7-conduccion/
└── bloque-12-marco-legal/
```

## 📝 Infografías Soportadas

El script reconoce todas las infografías listadas en `LISTADO_COMPLETO_MEDIOS_FALTANTES.md`:

### Bloque 0: Fundamentos
- Diagrama de Selección de Dispositivo de Oxigenoterapia
- Tabla Visual de Rangos de FiO2
- Guía de Colocación de Dispositivos de Oxigenoterapia

### Bloque 2: Material e Inmovilización
- Componentes del Sistema de Inmovilización
- Selección de Talla de Collarín Cervical
- Colocación de Collarín Paso a Paso (serie de 6 pasos)
- Verificaciones Post-Colocación
- Errores Frecuentes
- Posición del TES en Inmovilización Manual
- Técnica de Sujeción Manual
- Situaciones que Requieren Inmovilización
- Secuencia de Transición
- Coordinación del Equipo
- Componentes del Tablero Espinal
- Colocación de Tablero Espinal Paso a Paso (serie)
- Componentes del Colchón de Vacío
- Colocación de Colchón de Vacío Paso a Paso (serie de 10 pasos)
- Componentes de la Camilla Cuchara

### Bloque 3: Material Sanitario
- Configuración para Máxima FiO2

### Bloque 7: Conducción
- Configuración de GPS Antes de Salir

### Bloque 12: Marco Legal
- Diagrama de Decisiones Éticas en Urgencias

## ⚠️ Notas Importantes

1. **El script COPIA los archivos**, no los mueve. Los archivos originales permanecen en su ubicación original.

2. **Si un archivo ya existe** en el destino, el script preguntará antes de sobrescribirlo.

3. **Formato de archivos soportados**: SVG, PNG, JPG, JPEG, WEBP

4. **Nombres de archivos**: El script normaliza los nombres automáticamente (minúsculas, guiones, sin caracteres especiales)

## 🔧 Personalización

Si necesitas agregar más infografías o modificar la estructura, edita el diccionario `INFORGRAFIAS` en `scripts/organizar_infografias.py`.

## ❓ Solución de Problemas

### Error: "No existe el directorio public/assets/infografias"
**Solución**: Ejecuta primero:
```bash
mkdir -p public/assets/infografias/{bloque-0-fundamentos,bloque-2-inmovilizacion,bloque-3-material-sanitario,bloque-7-conduccion,bloque-12-marco-legal}
```

### No encuentra coincidencias automáticas
**Solución**: El script mostrará un menú completo de todas las infografías disponibles. Selecciona manualmente la que corresponda.

### Archivo no se renombra correctamente
**Solución**: Verifica que el nombre del archivo tenga palabras clave relacionadas con la infografía, o selecciona manualmente del menú.

---

**Última actualización:** 2025-01-27
