import type { RouteLocationNormalized } from 'vue-router';
import { useReset } from '@/hooks';
import { router } from '@/router';

interface TabState {
  // tab列表
  tabs: AppRoute.Route[]
  // 当前tag路径
  currentTabPath: string
}

export const useTabStore = defineStore('tab-store', () => {
  const [state] = useReset<TabState>({
    tabs: [],
    currentTabPath: '',
  });

  const currentTabPath = toRef(state.value, 'currentTabPath');

  // 设置当前激活的标签
  const setCurrentTab = (path: string) => {
    currentTabPath.value = path;
  };

  // 判断标签是否已经存在
  const hasExistTab = (path: string) => {
    const _tags: AppRoute.Route[] = [...state.value.tabs];
    return _tags.some((item) => {
      return item.path === path;
    });
  };

  // 获取当前标签索引
  const getTabIndex = (path: string) => {
    return state.value.tabs.findIndex(item => item.path === path);
  };

  // 如果是只有一个标签，或者只有两个标签且当前点击标签不是首页时返回
  const isTabReturn = (path: string) => {
    return state.value.tabs.length === 1 || (state.value.tabs.length === 2 && path !== '/home');
  };

  // 初始化标签-从路由中获取首页路由并添加到标签中
  const initTab = () => {
    const homeRoute: any = router.getRoutes().find(item => item.path === import.meta.env.VITE_HOME_PATH);
    if (hasExistTab(homeRoute.path))
      return;

    if (homeRoute)
      state.value.tabs.push(homeRoute!);
  };

  // 添加标签
  const addTab = (route: RouteLocationNormalized) => {
    if (route.meta.isWithoutTab)
      return;

    if (hasExistTab(route.path))
      return;

    state.value.tabs.push(route as unknown as AppRoute.Route);
  };

  // 关闭当前标签
  const closeTab = async (path: string) => {
    const index = getTabIndex(path);

    // 如果是当前选中的标签
    if (path === currentTabPath.value) {
      // 如果后边有标签，就跳转到后一个标签
      if (state.value.tabs[index + 1]) {
        await router.push(state.value.tabs[index + 1].path);
      }
      else {
        // 如果前边有标签，就跳转到前一个标签
        await router.push(state.value.tabs[index - 1].path);
      }
    }

    state.value.tabs = state.value.tabs.filter((item) => {
      return item.path !== path;
    });
  };

  // 关闭其他标签
  const closeOtherTabs = async (path: string) => {
    if (isTabReturn(path))
      return;

    // 如果不是当前选中的标签
    if (path !== currentTabPath.value)
      await router.push(path);

    state.value.tabs = state.value.tabs.filter((item) => {
      return item.path === path || item.path === '/home';
    });
  };

  // 关闭当前标签的左侧全部标签
  const closeLeftTabs = async (path: string) => {
    if (isTabReturn(path))
      return;

    const _tabs: AppRoute.Route[] = [...state.value.tabs];
    const index = getTabIndex(path);

    // 左侧是否有标签
    if (_tabs[index - 1] && _tabs[index - 1].path !== '/home') {
      const removeTabs: AppRoute.Route[] = _tabs.splice(0, index);
      const removeIndex = removeTabs.findIndex(item => item.path === currentTabPath.value);

      // 当前标签不是激活状态且关闭的标签中包含激活标签
      if (path !== currentTabPath.value && removeIndex !== -1)
        await router.push(path);

      state.value.tabs = [state.value.tabs[0], ..._tabs];
    }
  };

  // 关闭当前标签的右侧全部标签
  const closeRightTabs = async (path: string) => {
    if (isTabReturn(path))
      return;

    const _tabs: AppRoute.Route[] = [...state.value.tabs];
    const index = getTabIndex(path);

    // 右侧是否有标签
    if (_tabs[index + 1]) {
      // 当前标签不是激活状态
      if (path !== currentTabPath.value)
        await router.push(path);

      _tabs.splice(index + 1);
      state.value.tabs = _tabs;
    }
  };

  // 关闭全部 tag
  const closeAllTabs = async () => {
    if (state.value.tabs.length === 1)
      return;

    state.value.tabs = state.value.tabs.filter((item) => {
      return item.path === '/home';
    });

    await router.push('/home');
  };

  return {
    ...toRefs(state.value),
    setCurrentTab,
    initTab,
    addTab,
    closeTab,
    closeOtherTabs,
    closeLeftTabs,
    closeRightTabs,
    closeAllTabs,
  };
}, {
  persist: {
    storage: sessionStorage,
  },
});
