
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Shim process for TypeScript in config file
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables desde archivo .env (para Local)
  const envFile = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Priorizamos process.env.API_KEY que es inyectado por el entorno de ejecución
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || envFile.API_KEY || ''),
      'process.env.AIRTABLE_PAT': JSON.stringify(process.env.AIRTABLE_PAT || envFile.AIRTABLE_PAT || ''),
      'process.env.AIRTABLE_BASE_ID': JSON.stringify(process.env.AIRTABLE_BASE_ID || envFile.AIRTABLE_BASE_ID || ''),
      'process.env.AIRTABLE_TABLE_ID': JSON.stringify(process.env.AIRTABLE_TABLE_ID || envFile.AIRTABLE_TABLE_ID || ''),
    }
  };
});
