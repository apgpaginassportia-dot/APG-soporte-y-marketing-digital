
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Aseguramos que el entorno de Node sea reconocido durante la configuración
/** @type {any} */
declare var process: any;

export default defineConfig(({ mode }) => {
  // Cargamos variables de entorno de forma segura
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.AIRTABLE_PAT': JSON.stringify(env.AIRTABLE_PAT || ''),
      'process.env.AIRTABLE_BASE_ID': JSON.stringify(env.AIRTABLE_BASE_ID || ''),
      'process.env.AIRTABLE_TABLE_ID': JSON.stringify(env.AIRTABLE_TABLE_ID || ''),
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
      // Optimizamos el chunking para evitar avisos de tamaño
      chunkSizeWarningLimit: 1000
    }
  };
});
