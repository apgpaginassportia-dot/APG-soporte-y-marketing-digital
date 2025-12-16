
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Shim process for TypeScript in config file
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. Carga variables desde archivo .env (para Local)
  const envFile = loadEnv(mode, process.cwd(), '');
  
  // 2. Prioriza variables del sistema (para Producción/Render) sobre .env
  // process.env contiene las variables del sistema operativo/servidor
  const finalEnv = {
    API_KEY: process.env.API_KEY || envFile.API_KEY,
    AIRTABLE_PAT: process.env.AIRTABLE_PAT || envFile.AIRTABLE_PAT,
    AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID || envFile.AIRTABLE_BASE_ID,
    AIRTABLE_TABLE_ID: process.env.AIRTABLE_TABLE_ID || envFile.AIRTABLE_TABLE_ID,
  };

  return {
    plugins: [react()],
    define: {
      // Inyecta las variables de entorno de forma segura en el código cliente
      'process.env.API_KEY': JSON.stringify(finalEnv.API_KEY || ''),
      'process.env.AIRTABLE_PAT': JSON.stringify(finalEnv.AIRTABLE_PAT || ''),
      'process.env.AIRTABLE_BASE_ID': JSON.stringify(finalEnv.AIRTABLE_BASE_ID || ''),
      'process.env.AIRTABLE_TABLE_ID': JSON.stringify(finalEnv.AIRTABLE_TABLE_ID || ''),
    }
  };
});
