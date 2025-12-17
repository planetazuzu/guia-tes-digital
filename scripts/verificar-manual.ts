#!/usr/bin/env node
/**
 * Script de verificación del Manual TES Digital
 * 
 * Verifica:
 * 1. Que todos los 93 archivos .md sean accesibles
 * 2. Que las rutas funcionen correctamente
 * 3. Que la navegación básica funcione
 * 4. Que el search encuentre capítulos del manual
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { manualIndex, getAllCapitulos, getCapituloById } from '../src/data/manual-index';

const BASE_DIR = process.cwd();
const PUBLIC_MANUAL_DIR = join(BASE_DIR, 'public', 'manual');

interface VerificacionResult {
  archivosAccesibles: {
    total: number;
    encontrados: number;
    faltantes: string[];
    errores: Array<{ archivo: string; error: string }>;
  };
  rutas: {
    total: number;
    validas: number;
    invalidas: Array<{ capitulo: string; ruta: string; problema: string }>;
  };
  navegacion: {
    total: number;
    validas: number;
    invalidas: Array<{ capitulo: string; problema: string }>;
  };
  busqueda: {
    totalPruebas: number;
    exitosas: number;
    fallidas: Array<{ query: string; problema: string }>;
  };
}

const resultados: VerificacionResult = {
  archivosAccesibles: {
    total: 0,
    encontrados: 0,
    faltantes: [],
    errores: [],
  },
  rutas: {
    total: 0,
    validas: 0,
    invalidas: [],
  },
  navegacion: {
    total: 0,
    validas: 0,
    invalidas: [],
  },
  busqueda: {
    totalPruebas: 0,
    exitosas: 0,
    fallidas: [],
  },
};

// 1. Verificar que todos los archivos .md sean accesibles
function verificarArchivosAccesibles() {
  console.log('\n📁 Verificando archivos .md accesibles...\n');
  
  const todosLosCapitulos = getAllCapitulos();
  resultados.archivosAccesibles.total = todosLosCapitulos.length;

  todosLosCapitulos.forEach((capitulo) => {
    // Construir ruta del archivo en public/manual/
    const rutaArchivo = capitulo.rutaArchivo;
    const nombreArchivo = rutaArchivo.split('/').pop();
    const carpetaBloque = rutaArchivo.split('/').slice(-2, -1)[0];
    const rutaCompleta = join(PUBLIC_MANUAL_DIR, carpetaBloque, nombreArchivo || '');

    if (!existsSync(rutaCompleta)) {
      resultados.archivosAccesibles.faltantes.push(rutaCompleta);
      console.log(`❌ FALTANTE: ${capitulo.id} - ${rutaCompleta}`);
    } else {
      resultados.archivosAccesibles.encontrados++;
      
      // Verificar que el archivo se puede leer
      try {
        const contenido = readFileSync(rutaCompleta, 'utf-8');
        if (contenido.trim().length === 0) {
          resultados.archivosAccesibles.errores.push({
            archivo: rutaCompleta,
            error: 'Archivo vacío',
          });
          console.log(`⚠️  VACÍO: ${capitulo.id} - ${rutaCompleta}`);
        }
      } catch (error: any) {
        resultados.archivosAccesibles.errores.push({
          archivo: rutaCompleta,
          error: error.message,
        });
        console.log(`❌ ERROR: ${capitulo.id} - ${error.message}`);
      }
    }
  });

  console.log(`\n✅ Encontrados: ${resultados.archivosAccesibles.encontrados}/${resultados.archivosAccesibles.total}`);
  if (resultados.archivosAccesibles.faltantes.length > 0) {
    console.log(`❌ Faltantes: ${resultados.archivosAccesibles.faltantes.length}`);
  }
  if (resultados.archivosAccesibles.errores.length > 0) {
    console.log(`⚠️  Errores: ${resultados.archivosAccesibles.errores.length}`);
  }
}

// 2. Verificar que las rutas funcionen correctamente
function verificarRutas() {
  console.log('\n🔗 Verificando rutas...\n');
  
  const todosLosCapitulos = getAllCapitulos();
  resultados.rutas.total = todosLosCapitulos.length;

  todosLosCapitulos.forEach((capitulo) => {
    // Verificar formato de rutaUrl
    const rutaUrl = capitulo.rutaUrl;
    
    // Debe seguir el formato: /manual/parte-X/bloque-X/codigo
    const partesRuta = rutaUrl.split('/').filter(Boolean);
    
    if (partesRuta.length !== 4 || partesRuta[0] !== 'manual') {
      resultados.rutas.invalidas.push({
        capitulo: capitulo.id,
        ruta: rutaUrl,
        problema: 'Formato de ruta inválido',
      });
      console.log(`❌ RUTA INVÁLIDA: ${capitulo.id} - ${rutaUrl}`);
      return;
    }

    // Verificar que el código del capítulo coincida
    const codigoEnRuta = partesRuta[3];
    if (codigoEnRuta !== capitulo.id) {
      resultados.rutas.invalidas.push({
        capitulo: capitulo.id,
        ruta: rutaUrl,
        problema: `Código no coincide: esperado ${capitulo.id}, encontrado ${codigoEnRuta}`,
      });
      console.log(`❌ CÓDIGO NO COINCIDE: ${capitulo.id} - ${rutaUrl}`);
      return;
    }

    resultados.rutas.validas++;
  });

  console.log(`\n✅ Rutas válidas: ${resultados.rutas.validas}/${resultados.rutas.total}`);
  if (resultados.rutas.invalidas.length > 0) {
    console.log(`❌ Rutas inválidas: ${resultados.rutas.invalidas.length}`);
  }
}

// 3. Verificar que la navegación básica funcione
function verificarNavegacion() {
  console.log('\n🧭 Verificando navegación...\n');
  
  const todosLosCapitulos = getAllCapitulos();
  resultados.navegacion.total = todosLosCapitulos.length;

  todosLosCapitulos.forEach((capitulo) => {
    // Verificar navegación anterior
    if (capitulo.navegacion.anterior !== null) {
      const anterior = getCapituloById(capitulo.navegacion.anterior);
      if (!anterior) {
        resultados.navegacion.invalidas.push({
          capitulo: capitulo.id,
          problema: `Capítulo anterior "${capitulo.navegacion.anterior}" no existe`,
        });
        console.log(`❌ ANTERIOR NO EXISTE: ${capitulo.id} -> ${capitulo.navegacion.anterior}`);
      } else {
        // Verificar que el anterior apunta al siguiente correctamente
        if (anterior.navegacion.siguiente !== capitulo.id) {
          resultados.navegacion.invalidas.push({
            capitulo: capitulo.id,
            problema: `Navegación inconsistente: anterior "${capitulo.navegacion.anterior}" no apunta a este capítulo`,
          });
          console.log(`⚠️  NAVEGACIÓN INCONSISTENTE: ${capitulo.id} <- ${capitulo.navegacion.anterior}`);
        } else {
          resultados.navegacion.validas++;
        }
      }
    } else {
      // Es el primer capítulo, está bien
      resultados.navegacion.validas++;
    }

    // Verificar navegación siguiente
    if (capitulo.navegacion.siguiente !== null) {
      const siguiente = getCapituloById(capitulo.navegacion.siguiente);
      if (!siguiente) {
        resultados.navegacion.invalidas.push({
          capitulo: capitulo.id,
          problema: `Capítulo siguiente "${capitulo.navegacion.siguiente}" no existe`,
        });
        console.log(`❌ SIGUIENTE NO EXISTE: ${capitulo.id} -> ${capitulo.navegacion.siguiente}`);
      } else {
        // Verificar que el siguiente apunta al anterior correctamente
        if (siguiente.navegacion.anterior !== capitulo.id) {
          resultados.navegacion.invalidas.push({
            capitulo: capitulo.id,
            problema: `Navegación inconsistente: siguiente "${capitulo.navegacion.siguiente}" no apunta a este capítulo`,
          });
          console.log(`⚠️  NAVEGACIÓN INCONSISTENTE: ${capitulo.id} -> ${capitulo.navegacion.siguiente}`);
        }
      }
    }
  });

  console.log(`\n✅ Navegación válida: ${resultados.navegacion.validas}/${resultados.navegacion.total}`);
  if (resultados.navegacion.invalidas.length > 0) {
    console.log(`❌ Problemas de navegación: ${resultados.navegacion.invalidas.length}`);
  }
}

// 4. Verificar que el search encuentre capítulos del manual
function verificarBusqueda() {
  console.log('\n🔍 Verificando búsqueda...\n');
  
  const todosLosCapitulos = getAllCapitulos();
  
  // Queries de prueba
  const queriesPrueba = [
    'RCP',
    'ABCDE',
    'Glasgow',
    'Triage',
    'Oxigenoterapia',
    'Inmovilización',
    'Farmacología',
    'Protocolo',
    'Emergencia',
    'Adulto',
    'Pediatría',
    '1.1.1', // ID específico
    '2.1.3', // ID específico
  ];

  resultados.busqueda.totalPruebas = queriesPrueba.length;

  queriesPrueba.forEach((query) => {
    const queryLower = query.toLowerCase();
    let encontrados = 0;

    // Buscar en toda la estructura (partes, bloques y capítulos)
    manualIndex.forEach((parte) => {
      const parteCoincide = parte.nombre.toLowerCase().includes(queryLower);
      
      parte.bloques.forEach((bloque) => {
        const bloqueCoincide = bloque.nombre.toLowerCase().includes(queryLower);
        
        bloque.capitulos.forEach((capitulo) => {
          // Buscar en título
          if (capitulo.titulo.toLowerCase().includes(queryLower)) {
            encontrados++;
            return;
          }

          // Buscar en palabras clave
          if (capitulo.palabrasClave.some((kw) => kw.toLowerCase().includes(queryLower))) {
            encontrados++;
            return;
          }

          // Buscar en ID
          if (capitulo.id.toLowerCase().includes(queryLower)) {
            encontrados++;
            return;
          }

          // Buscar en nombre de parte o bloque
          if (parteCoincide || bloqueCoincide) {
            encontrados++;
            return;
          }
        });
      });
    });

    if (encontrados > 0) {
      resultados.busqueda.exitosas++;
      console.log(`✅ "${query}": ${encontrados} resultado(s)`);
    } else {
      resultados.busqueda.fallidas.push({
        query,
        problema: 'No se encontraron resultados',
      });
      console.log(`❌ "${query}": Sin resultados`);
    }
  });

  console.log(`\n✅ Búsquedas exitosas: ${resultados.busqueda.exitosas}/${resultados.busqueda.totalPruebas}`);
  if (resultados.busqueda.fallidas.length > 0) {
    console.log(`❌ Búsquedas fallidas: ${resultados.busqueda.fallidas.length}`);
  }
}

// Función principal
function ejecutarVerificacion() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  VERIFICACIÓN DEL MANUAL TES DIGITAL');
  console.log('═══════════════════════════════════════════════════════');

  try {
    verificarArchivosAccesibles();
    verificarRutas();
    verificarNavegacion();
    verificarBusqueda();

    // Resumen final
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('  RESUMEN FINAL');
    console.log('═══════════════════════════════════════════════════════\n');

    const totalErrores =
      resultados.archivosAccesibles.faltantes.length +
      resultados.archivosAccesibles.errores.length +
      resultados.rutas.invalidas.length +
      resultados.navegacion.invalidas.length +
      resultados.busqueda.fallidas.length;

    console.log(`📁 Archivos: ${resultados.archivosAccesibles.encontrados}/${resultados.archivosAccesibles.total} encontrados`);
    console.log(`🔗 Rutas: ${resultados.rutas.validas}/${resultados.rutas.total} válidas`);
    console.log(`🧭 Navegación: ${resultados.navegacion.validas}/${resultados.navegacion.total} válidas`);
    console.log(`🔍 Búsqueda: ${resultados.busqueda.exitosas}/${resultados.busqueda.totalPruebas} exitosas`);

    if (totalErrores === 0) {
      console.log('\n✅ ¡TODAS LAS VERIFICACIONES PASARON!');
      process.exit(0);
    } else {
      console.log(`\n❌ Se encontraron ${totalErrores} problema(s)`);
      process.exit(1);
    }
  } catch (error: any) {
    console.error('\n❌ Error durante la verificación:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Ejecutar verificación
ejecutarVerificacion();
