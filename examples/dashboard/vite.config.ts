import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@prism/tokens': resolve(__dirname, '../../packages/tokens/src'),
      '@prism/core': resolve(__dirname, '../../packages/core/src'),
      '@prism/components': resolve(__dirname, '../../packages/components/src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});