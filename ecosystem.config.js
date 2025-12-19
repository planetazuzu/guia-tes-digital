/**
 * Configuración PM2 para servidor de preview (opcional)
 * Solo necesario si quieres un servidor Node.js para desarrollo/preview
 * Para producción, usar Nginx con archivos estáticos es más eficiente
 */
module.exports = {
  apps: [
    {
      name: 'emerges-tes',
      script: 'npx',
      args: 'serve -s dist -l 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
