import { useReset } from '@/hooks/useReset';
import { router } from '@/router';
import { staticRoutes } from '@/router/routes.static';
import { useUserStore } from '@/stores';
import { createMenus, createRoutes, generateCacheRoutes, getBreadcrumbsByRoute } from '@/stores/route/method';

interface RoutesStatus {
  // 是否初始化权限路由
  isInitAuthRoute: boolean
  // 菜单数据
  menus: AppRoute.Menu[]
  // 路由数据
  rowRoutes: AppRoute.RowRoute[]
  // 当前激活的菜单
  activeMenu: string
  // 需要缓存的路由名称
  cacheRoutes: string[]
}

export const useRouteStore = defineStore('route-store', () => {
  const [state] = useReset<RoutesStatus>({
    isInitAuthRoute: false,
    menus: [],
    rowRoutes: [],
    activeMenu: '',
    cacheRoutes: [],
  });

  const userStore = useUserStore();
  const initRouteInfo = async () => {
    try {
      // 获取用户信息
      const res = await userStore.getUserInfo();

      if (res.data.menus.length) {
        return res.data.menus;
      }
      else {
        return staticRoutes;
      }
    }
    catch (e) {
      console.error(e);
      return staticRoutes;
    }
  };

  const initAuthRoute = async () => {
    state.value.isInitAuthRoute = false;

    // 初始化路由信息
    const rowRoutes = await initRouteInfo();

    state.value.rowRoutes = rowRoutes;

    // 配置权限路由
    const routes = createRoutes(rowRoutes);
    router.addRoute(routes);

    // 创建菜单
    state.value.menus = createMenus(rowRoutes);

    // 获取需要缓存的路由名称
    state.value.cacheRoutes = generateCacheRoutes(rowRoutes);

    state.value.isInitAuthRoute = true;
  };

  const setActiveMenu = (key: string) => {
    state.value.activeMenu = key;
  };

  // 全局面包屑
  const breadcrumbs = computed(() => {
    const breadcrumbs = getBreadcrumbsByRoute(router.currentRoute.value, state.value.menus);
    const homePath = import.meta.env.VITE_HOME_PATH;

    // 如果面包屑中没有首页，则添加首页
    if (breadcrumbs.findIndex(item => item.key === homePath) === -1) {
      const home = state.value.menus.filter(item => item.key === homePath);
      return [...home, ...breadcrumbs];
    }

    return breadcrumbs;
  });

  return {
    ...toRefs(state.value),
    initAuthRoute,
    setActiveMenu,
    breadcrumbs,
  };
});
