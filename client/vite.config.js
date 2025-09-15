import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'static',
  build: {
    outDir: 'public',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'jwt-decode']
        }
      },
      onwarn: () => {
        // Suppress all warnings to prevent build hanging
        return;
      }
    }
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})