/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL de la API (p. ej. http://localhost:3000/api/v1). Por defecto: /api/v1 */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
