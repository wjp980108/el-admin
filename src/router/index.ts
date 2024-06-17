import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes } from '@/router/routes.inner'
import { useRouteStore, useTagStore } from '@/stores'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export async function installRouter(app: App) {
  const routeStore = useRouteStore()

  const tagStore = useTagStore()

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

  router.beforeResolve((to) => {
    // 设置菜单高亮
    routeStore.setActiveMenu((to.meta.activeMenu as string) ?? to.fullPath)
    // 添加 tag
    tagStore.addTag(to)
    // // 设置高亮标签;
    // tabStore.setCurrentTab(to.path as string)
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_NAME}`
    // // 结束 loadingBar
    // appStore.showProgress && window.$loadingBar?.finish()
  })

  app.use(router)

  await router.isReady()
}
