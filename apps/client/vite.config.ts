import path from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@freezer-tracker/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },

  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // @ts-expect-error process is a nodejs global
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
  },
});
