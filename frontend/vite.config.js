import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4173, 
    host: true, // Expose the app to external IPs
  },
  build: {
    outDir: 'dist', // Ensure that build output goes into the 'dist' folder
  },
  preview: {
    allowedHosts: ['url-link-shortner-frontend.onrender.com'], // Allow the Render.com host
  },
});
