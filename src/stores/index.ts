import type { App } from 'vue'
import { createPinia } from 'pinia'

// import piniaPluginPersist from 'pinia-plugin-persist'

export * from './route/index'
export * from './app/index'

export function installPinia(app: App) {
  const pinia = createPinia()
  // pinia.use(piniaPluginPersist)
  app.use(pinia)
}
