
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Shim process for TypeScript in config file
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables desde archivo .env (para Local)
  const envFile = loadEnv(mode, process.cwd(), '');
  
  // En Vercel, las variables están en process.env durante el build.
  // Vite reemplazará estas cadenas en el código fuente.
  const API_KEY = process.env.API_KEY || envFile.API_KEY || '';
  const AIRTABLE_PAT = process.env.AIRTABLE_PAT || envFile.AIRTABLE_PAT || '';
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || envFile.AIRTABLE_BASE_ID || '';
  const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID || envFile.AIRTABLE_TABLE_ID || '';

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env.AIRTABLE_PAT': JSON.stringify(AIRTABLE_PAT),
      'process.env.AIRTABLE_BASE_ID': JSON.stringify(AIRTABLE_BASE_ID),
      'process.env.AIRTABLE_TABLE_ID': JSON.stringify(AIRTABLE_TABLE_ID),
    },
    build: {
      outDir: 'dist',
      sourcemap: true // Útil para depurar en producción
    }
  };
});
