import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/vanilla/iconium.ts'),
      name: 'Iconium',
      formats: ['iife'],
      fileName: () => 'iconium.cdn.js',
    },
    emptyOutDir: false,
    minify: 'esbuild',
    sourcemap: true,
  },
});