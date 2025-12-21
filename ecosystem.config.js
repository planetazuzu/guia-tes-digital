/**
 * Configuración PM2 para EMERGES TES
 * Servidor de producción en puerto 8607
 */
module.exports = {
  apps: [
    {
      name: 'emerges-tes',
      script: 'npx',
      args: 'serve -s dist -l 8607',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 8607,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // Reiniciar si el proceso usa más de 500MB
      max_memory_restart: '500M',
      // Esperar 10 segundos antes de considerar que el proceso no responde
      kill_timeout: 10000,
      // Esperar 3 segundos antes de reiniciar tras un crash
      wait_ready: false,
      listen_timeout: 10000,
    },
  ],
};
