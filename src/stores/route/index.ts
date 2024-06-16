import { useReset } from '@/hooks/useReset'
import { router } from '@/router'
import { createMenus, createRoutes, generateCacheRoutes } from '@/stores/route/method'
import { staticRoutes } from '@/router/routes.static'

interface RoutesStatus {
  // 是否初始化权限路由
  isInitAuthRoute: boolean
  // 菜单数据
  menus: AppRoute.Route[]
  // 路由数据
  rowRoutes: AppRoute.RowRoute[]
  // 当前激活的菜单
  activeMenu: string | null
  // 需要缓存的路由名称
  cacheRoutes: string[]
}

export const useRouteStore = defineStore('route', () => {
  const [state] = useReset<RoutesStatus>({
    isInitAuthRoute: false,
    menus: [],
    rowRoutes: [],
    activeMenu: null,
    cacheRoutes: [],
  })

  const initRouteInfo = async () => {
    state.value.rowRoutes = staticRoutes
    return staticRoutes
  }

  const initAuthRoute = async () => {
    state.value.isInitAuthRoute = false

    // 初始化路由信息
    const rowRoutes = await initRouteInfo()

    state.value.rowRoutes = rowRoutes

    // 配置权限路由
    const routes = createRoutes(rowRoutes)
    routes.forEach((route) => {
      router.addRoute(route)
    })

    // 创建菜单
    state.value.menus = createMenus(rowRoutes)

    // 获取需要缓存的路由名称
    state.value.cacheRoutes = generateCacheRoutes(rowRoutes)

    state.value.isInitAuthRoute = true
  }

  const setActiveMenu = (key: string) => {
    state.value.activeMenu = key
  }

  return {
    ...toRefs(state.value),
    initAuthRoute,
    setActiveMenu,
  }
})
