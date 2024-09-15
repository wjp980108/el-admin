import type { App } from 'vue';
import NProgress from '@/config/nprogress';
import { routes } from '@/router/routes.inner';
import { useRouteStore, useTabStore, useUserStore } from '@/stores';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export async function installRouter(app: App) {
  const routeStore = useRouteStore();
  const tabStore = useTabStore();
  const userStore = useUserStore();

  router.beforeEach(async (to, from, next) => {
    NProgress.start();

    // 是否已经登录过
    if (!userStore.accessToken) {
      if (to.name === 'login') {
        next();
      }
      else {
        next({ name: 'login' });
      }
      return false;
    }

    // 判断路由有无进行初始化
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute();
      // 初始化标签
      tabStore.initTab();

      // 动态路由加载完回到根路由
      if (to.name === '404') {
        // 等待权限路由加载好了，回到之前的路由,否则404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        });
        return false;
      }
    }
    next();
  });

  router.beforeResolve((to) => {
    // 设置菜单高亮
    routeStore.setActiveMenu(to.meta.activeMenu || to.fullPath);

    // 添加 tag
    tabStore.addTab(to);

    // 设置当前激活的标签
    tabStore.setCurrentTab(to.path);
  });

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${import.meta.env.VITE_APP_NAME}`;

    // 结束 NProgress
    NProgress.done();
  });

  app.use(router);

  await router.isReady();
}
