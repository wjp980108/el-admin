import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';
import { arrayToTree } from '@/utils';
import { clone, omit, pick } from 'lodash-es';

const metaFields: AppRoute.MetaKeys[] = ['title', 'icon', 'isKeepAlive', 'isHide', 'activeMenu', 'type'];

/**
 * 此函数用于标准化给定的路由，通过克隆它们并设置它们的元字段。
 * 它接受一个原始路由数组作为输入，并返回一个标准化的路由数组。
 *
 * @param route - 原始路由数组。
 * @returns - 标准化的路由数组。
 */
function standardizedRoutes(route: AppRoute.RowRoute[]) {
  return clone(route).map((i) => {
    // 这行代码使用 'lodash-es' 库中的 'omit' 函数创建一个新对象，
    // 该对象是原始对象（i）的副本，但排除了 'metaFields' 数组中指定的属性。
    const route = omit(i, metaFields);

    // 这行代码使用 'Reflect.set' 方法向 'route' 对象添加 'meta' 属性。
    // 'meta' 属性的值是一个新对象，它是原始对象 (i) 的副本，
    // 但仅包含 'metaFields' 数组中指定的属性。
    Reflect.set(route, 'meta', pick(i, metaFields));
    return route;
  }) as AppRoute.Route[];
}

/**
 * 此函数用于为应用程序创建路由。
 * 它以原始路由数组作为输入，对其进行标准化，为它们分配组件，
 * 将它们转换为树结构，并设置正确的重定向路径。
 *
 * @param routes - 原始路由数组。
 * @returns - 标准化路由数组。
 */
export function createRoutes(routes: AppRoute.RowRoute[]) {
  // 构建元字段数据
  let resultRouter = standardizedRoutes(routes);

  // 路由配置对应组件路径，有重定向的路由无需配置
  const modules = import.meta.glob('@/views/**/*.vue');
  resultRouter = resultRouter.map((item: AppRoute.Route) => {
    if (item.componentPath && !item.redirect) {
      item.component = modules[`/src/views${item.componentPath}`];
    }

    return item;
  });

  // 将路由数组转换为树结构，生成完整的路由结构数据
  resultRouter = arrayToTree(resultRouter) as AppRoute.Route[];

  const appRootRoute: RouteRecordRaw = {
    path: '/appRoot',
    name: 'appRoot',
    redirect: import.meta.env.VITE_HOME_PATH,
    component: Layout,
    meta: {
      title: '',
      icon: 'icon-park-outline:home',
    },
    children: [],
  };

  // 为路由设置正确的重定向路径
  setRedirect(resultRouter);

  appRootRoute.children = resultRouter as unknown as RouteRecordRaw[];

  return appRootRoute;
}

/**
 * 此函数生成需要保持活动的路由名称数组。
 * 它将路由数组作为输入并返回路由名称数组。
 *
 * @param routes - 路由数组。
 * @returns - 需要保持活动的路由名称数组。
 */
export function generateCacheRoutes(routes: AppRoute.RowRoute[]) {
  return routes
    .filter(i => i.isKeepAlive)
    .map(i => i.name);
}

/**
 * 此函数设置给定路由数组中每条路由的重定向路径。
 * 它迭代每条路由，如果该路由有子路由，则默认将路由的重定向路径设置为第一个可见子路由的路径。如果有具有“order”属性的子路由，则将路由的重定向路径设置为具有最小“order”值的子路由的路径。
 * 它还递归设置每条子路由的重定向路径。
 *
 * @param routes - 路由数组。
 */
function setRedirect(routes: AppRoute.Route[]) {
  routes.forEach((route) => {
    if (route.children) {
      if (!route.redirect) {
        // 过滤掉非隐藏的子元素集合
        const visibleChildren = route.children.filter(child => !child.meta.isHide);

        // 默认将页面重定向到第一个子元素的路径
        const target = visibleChildren[0];

        if (target)
          route.redirect = target.path;
      }

      setRedirect(route.children);
    }
  });
}

/**
 * 此函数为应用程序创建菜单。
 * 它以用户路由数组作为输入，对其进行标准化，过滤掉不需要显示的路由，
 * 然后将剩余的路由转换为树结构以生成侧面菜单。
 *
 * @param userRoutes - 用户路由数组。
 * @returns - 树结构中的菜单选项数组。
 */
export function createMenus(userRoutes: AppRoute.RowRoute[]) {
  const resultMenus = standardizedRoutes(userRoutes);

  // 不需要显示的过滤菜单
  const visibleMenus = resultMenus.filter(route => !route.meta.isHide);
  // 生成侧边菜单
  return arrayToTree(transformAuthRoutesToMenus(visibleMenus));
}

/**
 * 此函数将给定的用户路由数组转换为菜单选项数组。
 * 它遍历每个用户路由并为每个用户路由创建一个新的菜单选项对象。
 * 菜单选项对象包括用户路由的 id、parentId、标签、键和图标。
 * 菜单选项的标签是一个函数，如果用户路由的菜单类型为“页面”或未指定，则返回 RouterLink 组件。
 * 否则，标签是一个函数，返回用户路由的标题。
 * 菜单选项的图标是一个函数，如果存在用户路由，则呈现用户路由的图标。
 *
 * @param userRoutes - 用户路由数组。
 * @returns - 菜单选项数组。
 */
function transformAuthRoutesToMenus(userRoutes: AppRoute.Route[]) {
  // 转换为侧菜单数据结构
  const target: AppRoute.Menu[] = userRoutes.map((item) => {
    return {
      id: item.id,
      parentId: item.parentId,
      label: item.meta.title,
      key: item.path,
      icon: item.meta.icon,
    };
  });
  return target;
}

/**
 * 根据当前路由和菜单项列表获取面包屑。
 * 此函数遍历提供的菜单项以找到与当前路由匹配的项。
 * 如果找到匹配项，则返回表示面包屑路径的菜单项数组。
 * 面包屑路径是通过匹配路由的路径或其活动菜单键与菜单项的键来确定的。
 * 如果菜单项有子项，则函数递归搜索子项以找到匹配项。
 * 这允许生成反映导航的层次结构的面包屑路径。
 *
 * @param route - 当前路由对象，包括路径和可能的活动菜单键。
 * @param menus - 要搜索以生成面包屑路径的菜单项数组。
 * @returns 表示当前路由面包屑路径的菜单项数组。
 */
export function getBreadcrumbsByRoute(
  route: RouteLocationNormalizedLoaded,
  menus: AppRoute.Menu[],
): AppRoute.Menu[] {
  const key = route.path;
  const activeKey = route.meta?.activeMenu;
  const menuKey = activeKey || key;

  for (const menu of menus) {
    if (menu.key === menuKey) {
      return [menu];
    }

    if (menu.children?.length) {
      const result = getBreadcrumbsByRoute(route, menu.children);
      if (result.length > 0) {
        return [menu, ...result];
      }
    }
  }

  return [];
}
