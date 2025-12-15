
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Shim process for TypeScript in config file
declare var process: any;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno para que estén disponibles en el build
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Inyecta las variables de entorno de forma segura
      // Usamos || '' para evitar que sea undefined si falta el archivo .env
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.AIRTABLE_PAT': JSON.stringify(env.AIRTABLE_PAT || ''),
      'process.env.AIRTABLE_BASE_ID': JSON.stringify(env.AIRTABLE_BASE_ID || ''),
      'process.env.AIRTABLE_TABLE_ID': JSON.stringify(env.AIRTABLE_TABLE_ID || ''),
    }
  };
});
