import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Declaración para evitar errores de TypeScript con process en el config
declare var process: any;

export default defineConfig(({ mode }) => {
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
      chunkSizeWarningLimit: 2000
    }
  };
});