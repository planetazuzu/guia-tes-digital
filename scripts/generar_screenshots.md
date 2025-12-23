# 📸 Guía para Generar Screenshots de la PWA

Los screenshots son importantes para mostrar la aplicación en las tiendas de aplicaciones y mejorar la presentación de la PWA.

## 📋 Screenshots Requeridos

Según el manifest.json, necesitamos:

1. **Desktop (Wide):**
   - `screenshots/home.png` - 1280x720px - Página principal
   - `screenshots/manual.png` - 1280x720px - Manual completo

2. **Mobile (Narrow):**
   - `screenshots/mobile-home.png` - 750x1334px - Vista móvil

## 🛠️ Métodos para Generar Screenshots

### Opción 1: Herramientas del Navegador (Recomendado)

1. **Chrome DevTools:**
   ```bash
   # Abre la aplicación en Chrome
   # Presiona F12 para abrir DevTools
   # Presiona Ctrl+Shift+P (Cmd+Shift+P en Mac)
   # Busca "Capture screenshot"
   # Selecciona "Capture full size screenshot"
   ```

2. **Firefox DevTools:**
   ```bash
   # Abre la aplicación en Firefox
   # Presiona F12
   # Presiona Ctrl+Shift+S (Cmd+Shift+S en Mac)
   # Selecciona "Screenshot"
   ```

### Opción 2: Herramientas de Línea de Comando

#### Usando Puppeteer (Node.js)
```bash
npm install -g puppeteer-cli
puppeteer screenshot --url http://localhost:8607 --width 1280 --height 720 --output screenshots/home.png
```

#### Usando Playwright
```bash
npx playwright install chromium
npx playwright screenshot --url http://localhost:8607 --width 1280 --height 720 --output screenshots/home.png
```

#### Usando wkhtmltoimage
```bash
# Instalar: sudo apt-get install wkhtmltopdf
wkhtmltoimage --width 1280 --height 720 http://localhost:8607 screenshots/home.png
```

### Opción 3: Script Automatizado

Crea un script que capture las páginas automáticamente:

```javascript
// scripts/capturar_screenshots.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Desktop screenshot
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto('http://localhost:8607');
  await page.screenshot({ path: 'public/screenshots/home.png' });
  
  // Manual page
  await page.goto('http://localhost:8607/manual');
  await page.screenshot({ path: 'public/screenshots/manual.png' });
  
  // Mobile screenshot
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:8607');
  await page.screenshot({ path: 'public/screenshots/mobile-home.png' });
  
  await browser.close();
})();
```

## 📝 Notas

- Los screenshots deben mostrar las mejores características de la aplicación
- Usa contenido real, no placeholders
- Asegúrate de que la aplicación esté corriendo antes de capturar
- Los screenshots se actualizarán automáticamente cuando cambies el contenido

## ✅ Verificación

Después de generar los screenshots:

1. Verifica que los archivos existan en `public/screenshots/`
2. Verifica que el manifest.json tenga las rutas correctas
3. Prueba la instalación de la PWA y verifica que los screenshots se muestren

