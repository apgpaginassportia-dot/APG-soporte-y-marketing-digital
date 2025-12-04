import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno para que estén disponibles en el build
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Inyecta la variable de entorno para cumplir con el requisito del SDK de Google GenAI
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});