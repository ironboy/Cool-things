import { reactEasierViteConfig as revc_ } from 'react-easier/vite-config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { killPortProcess } from 'kill-port-process';

// vite standard port is 5173 - kill anything on that port
await killPortProcess(5173);

// https://vitejs.dev/config/
export default defineConfig(revc_({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false
      }
    }
  }
}));