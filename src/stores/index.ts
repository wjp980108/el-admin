import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// import piniaPluginPersist from 'pinia-plugin-persist'

export * from './app/index';
export * from './route/index';
export * from './tab';
export * from './user';

export function installPinia(app: App) {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
}
