import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173, 
    host: true, 
    open: true,  
  },
  build: {
    outDir: 'dist', 
  },
  preview: {
    host: '0.0.0.0', 
    port: 4173,
    allowedHosts: ['url-link-shortner-frontend.onrender.com'],
  },
  define: {
    'process.env.BACKEND_URL': JSON.stringify(
      'https://url-link-shortner-backend.onrender.com/api/v1' 
    ),
  },
});
