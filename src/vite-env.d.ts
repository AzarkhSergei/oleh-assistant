/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    // Добавь сюда другие переменные, если нужно
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  