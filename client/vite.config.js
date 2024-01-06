import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// vite.config.js
export default {
  // Other Vite configurations
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy requests to your Express server
    },
  },
};