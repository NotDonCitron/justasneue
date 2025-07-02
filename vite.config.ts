import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Verschiedene Ports und Hosts für Organisationsnetzwerke
    port: 3000,
    host: '0.0.0.0', // Erlaubt externe Verbindungen
    strictPort: false, // Automatisch anderen Port finden wenn belegt
    
    // Alternative Ports falls Standard blockiert ist
    // port: 8080, // Oft weniger blockiert
    // port: 3001, // Alternative
    // port: 4000, // Weitere Alternative
    
    headers: {
      // COEP Headers für lokale Entwicklung
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    },
    
    // Proxy für blockierte Ressourcen
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 4173,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  }
});