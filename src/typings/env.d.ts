/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly MODE: string
  readonly BASE_URL: string
  readonly VITE_APP_ENV: string
  readonly VITE_BASE_URL: string
  readonly VITE_APP_PREFIX: string
  readonly VITE_APP_NAME: string
  readonly VITE_HOME_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
