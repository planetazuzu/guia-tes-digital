# Multi-stage build para EMERGES TES
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci --production=false

# Copiar código fuente
COPY . .

# Build de producción
RUN npm run build

# Verificar que el build se completó
RUN test -d dist || (echo "Error: dist directory not found" && exit 1)
RUN test "$(ls -A dist)" || (echo "Error: dist directory is empty" && exit 1)

# Stage 2: Production
FROM node:18-alpine AS production

WORKDIR /app

# Instalar serve globalmente para servir archivos estáticos
RUN npm install -g serve@14.2.1

# Copiar archivos construidos desde builder
COPY --from=builder /app/dist ./dist

# Copiar package.json para mantener metadata (opcional)
COPY --from=builder /app/package.json ./package.json

# Exponer puerto 8607
EXPOSE 8607

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=8607

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8607', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "8607"]
