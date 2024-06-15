import { useReset } from '@/hooks/useReset'
import { router } from '@/router'
import { createMenus, createRoutes, generateCacheRoutes } from '@/stores/route/method'
import { staticRoutes } from '@/router/routes'

interface RoutesStatus {
  isInitAuthRoute: boolean
  menus: AppRoute.Route[]
  rowRoutes: AppRoute.RowRoute[]
  activeMenu: string | null
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

    // Initialize route information
    const rowRoutes = await initRouteInfo()

    state.value.rowRoutes = rowRoutes

    const routes = createRoutes(rowRoutes)
    router.addRoute(routes)

    state.value.menus = createMenus(rowRoutes)

    state.value.cacheRoutes = generateCacheRoutes(rowRoutes)

    state.value.isInitAuthRoute = true
  }

  return {
    state,
    initAuthRoute,
  }
})
