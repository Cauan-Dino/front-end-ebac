/// <reference types="vite/client" />

// Tipa a variável de ambiente usada pelo serviço da API.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
