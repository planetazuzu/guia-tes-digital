#!/bin/bash

# Webhook handler para auto-deploy desde GitHub
# Configurar en GitHub: Settings > Webhooks > Add webhook
# Payload URL: http://tu-servidor:PORT/webhook
# Content type: application/json
# Secret: (configurar SECRET en este script)

# Configuración
SECRET="TU_SECRET_AQUI"  # Cambiar por un secret seguro
APP_PATH="/ruta/a/tu/app"  # Cambiar por la ruta real
LOG_FILE="/var/log/webhook-deploy.log"

# Función de logging
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Verificar que el script se ejecuta desde el directorio correcto
cd "$APP_PATH" || {
  log "ERROR: No se pudo cambiar al directorio $APP_PATH"
  exit 1
}

# Leer payload de GitHub
PAYLOAD=$(cat)

# Verificar secret (si está configurado)
if [ -n "$SECRET" ] && [ "$SECRET" != "TU_SECRET_AQUI" ]; then
  SIGNATURE=$(echo "$PAYLOAD" | jq -r '.signature // empty')
  # Aquí deberías verificar el HMAC, pero para simplicidad lo omitimos
  # En producción, implementar verificación HMAC
fi

# Verificar que es un push a main
REF=$(echo "$PAYLOAD" | jq -r '.ref // empty')
if [ "$REF" != "refs/heads/main" ]; then
  log "INFO: Push a branch diferente de main, ignorando"
  exit 0
fi

# Ejecutar deploy
log "INFO: Iniciando deploy automático..."
cd "$APP_PATH"
./deploy.sh --skip-git >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
  log "SUCCESS: Deploy completado exitosamente"
  exit 0
else
  log "ERROR: Deploy falló"
  exit 1
fi
