import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes } from '@/router/routes.inner'
import { useRouteStore } from '@/stores'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export async function installRouter(app: App) {
  const routeStore = useRouteStore()
  router.beforeEach(async (to, from, next) => {
    // 判断路由有无进行初始化
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // 动态路由加载完回到根路由
      if (to.name === '404') {
        // 等待权限路由加载好了，回到之前的路由,否则404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return false
      }
    }
    next()
  })

  app.use(router)

  await router.isReady()
}
