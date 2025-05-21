import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://oleh-assistant.netlify.app',
      readable: true,
      generateRobotsTxt: true,
      dynamicRoutes: [
        '/step/healthcare',
        '/step/bank',
        '/step/housing',
        '/step/employment',
        '/step/integration',
        '/step/education',
        '/step/taxes',
        '/step/documents'
        // Добавь другие страницы, если они динамически создаются
      ],
    }),
  ],
});
