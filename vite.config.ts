import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'Images/*.jpg', 'Images/*.jpeg'],
      manifest: {
        name: 'Justas Lange - DJ & Electronic Music',
        short_name: 'Justas Lange',
        description: 'Electronic music DJ from Lithuania, specializing in bass and house music',
        theme_color: '#ef4444',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['music', 'entertainment'],
        lang: 'de-DE',
        icons: [
          {
            src: 'Images/364268621_248985811283826_4097087762299984333_n.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: 'Images/364268621_248985811283826_4097087762299984333_n.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}']
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Verschiedene Ports und Hosts für Organisationsnetzwerke
    port: 4173,
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