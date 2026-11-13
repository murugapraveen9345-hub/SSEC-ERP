import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  appType: 'spa',
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI icon library
          'vendor-lucide': ['lucide-react'],
          // Chart libraries (heavy — isolated chunk)
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          // Animation library
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
})

