import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  root: '.',
  publicDir: 'static',
  server: {
    port: 3000,
    open: false,
   allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./static', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./static/index.html', import.meta.url)),
        login: fileURLToPath(new URL('./static/login.html', import.meta.url)),
        dashboard: fileURLToPath(new URL('./static/dashboard.html', import.meta.url)),
        // Add other HTML entry points as needed
      }
    }
  }
});
