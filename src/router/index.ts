import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes } from '@/router/routes1'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export async function installRouter(app: App) {
  app.use(router)

  await router.isReady()
}
