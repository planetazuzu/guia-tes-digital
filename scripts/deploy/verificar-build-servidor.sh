#!/bin/bash
# Script para verificar qué build tiene el servidor

SERVER_IP="207.180.226.141"
APP_DIR="/var/www/emerges-tes"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔍 VERIFICANDO BUILD EN SERVIDOR                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"

echo "Conectando al servidor..."
ssh "root@$SERVER_IP" << EOF
  cd "$APP_DIR" || { echo "❌ Error: No se pudo cambiar al directorio $APP_DIR"; exit 1; }
  
  echo ""
  echo "📦 Chunks vendor en dist/assets/:"
  echo "───────────────────────────────────────────────────────────────"
  ls -lh dist/assets/ | grep vendor || echo "❌ No se encontraron chunks vendor"
  
  echo ""
  echo "🔍 Verificando prefijos numéricos (0-, 1-, 2-):"
  echo "───────────────────────────────────────────────────────────────"
  if ls dist/assets/0-vendor-react* 2>/dev/null; then
    echo "✅ 0-vendor-react encontrado (correcto)"
  else
    echo "❌ 0-vendor-react NO encontrado (build antiguo)"
  fi
  
  if ls dist/assets/1-vendor-utils* 2>/dev/null; then
    echo "✅ 1-vendor-utils encontrado (correcto)"
  else
    echo "❌ 1-vendor-utils NO encontrado (build antiguo)"
  fi
  
  if ls dist/assets/2-vendor-markdown* 2>/dev/null; then
    echo "✅ 2-vendor-markdown encontrado (correcto)"
  else
    echo "❌ 2-vendor-markdown NO encontrado (build antiguo)"
  fi
  
  echo ""
  echo "🔍 Verificando build antiguo (sin prefijos):"
  echo "───────────────────────────────────────────────────────────────"
  if ls dist/assets/vendor-utils-ClLzZSLi.js 2>/dev/null; then
    echo "❌ ERROR: Build antiguo encontrado (vendor-utils-ClLzZSLi.js)"
    echo "   El servidor está sirviendo el build ANTIGUO"
  else
    echo "✅ No se encontró build antiguo"
  fi
  
  echo ""
  echo "📄 Verificando index.html:"
  echo "───────────────────────────────────────────────────────────────"
  if grep -q "0-vendor-react" dist/index.html 2>/dev/null; then
    echo "✅ index.html referencia 0-vendor-react (correcto)"
  else
    echo "❌ index.html NO referencia 0-vendor-react (build antiguo)"
  fi
  
  if grep -q "vendor-utils-ClLzZSLi" dist/index.html 2>/dev/null; then
    echo "❌ ERROR: index.html referencia vendor-utils-ClLzZSLi.js (build antiguo)"
  else
    echo "✅ index.html NO referencia build antiguo"
  fi
  
  echo ""
  echo "📅 Última modificación de dist/:"
  echo "───────────────────────────────────────────────────────────────"
  ls -ld dist/ | awk '{print "   "$6" "$7" "$8}'
  
  echo ""
  echo "📅 Última modificación de dist/assets/:"
  echo "───────────────────────────────────────────────────────────────"
  ls -ld dist/assets/ | awk '{print "   "$6" "$7" "$8}'
  
EOF

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Verificación completada"
else
  echo ""
  echo "❌ Error al verificar el servidor"
fi

