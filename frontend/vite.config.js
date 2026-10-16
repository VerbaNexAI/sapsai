import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const envDir = fs.existsSync(path.resolve(__dirname, '.env')) ? __dirname : path.resolve(__dirname, '..');
  // Load env file based on `mode`
  const env = loadEnv(mode, envDir, '');
  
  return {
    plugins: [react(), tailwindcss()],
    // Explicitly define the env variables to expose to your app
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    // Look for .env in current dir or root dir
    envDir: envDir,
    // Only expose variables with these prefixes to the client
    envPrefix: ['VITE_'],
    
    // For development server
    server: {
      port: 5173,
      strictPort: true,
      host: true,
    },
    // For production build
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: true,
      // This ensures environment variables are embedded in the build
      define: {
        'process.env': {}
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  };
});
