import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ecology_model/',
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  }
});
