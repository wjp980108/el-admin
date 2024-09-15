<script setup lang="ts">
import type { ContextMenuItem } from '@/components/AppDropdown/interface';
import type { App } from '@/stores/app/types';
import type { TabsPaneContext } from 'element-plus';
import { navigationFailure } from '@/constants';
import { useNotification } from '@/hooks';
import { useAppStore, useTabStore } from '@/stores';

defineOptions({ name: 'LayTabs' });

const route = useRoute();
const router = useRouter();
const tabStore = useTabStore();
const appStore = useAppStore();

const tabsMenuValue = ref(tabStore.currentTabPath);

watchEffect(() => {
  tabsMenuValue.value = tabStore.currentTabPath;
});

const { notify } = useNotification();

// 点击 tab 切换路由
function tabClick(tabItem: TabsPaneContext) {
  const fullPath = tabItem.props.name as string;

  if (fullPath === route.path)
    return notify(navigationFailure);

  router.push(fullPath);
}

// 关闭 tab
function tabRemove(name: (string | number)) {
  tabStore.closeTab(name as string);
}

// 判断是否可以关闭
function isClosable(route: AppRoute.Route) {
  return route.path !== import.meta.env.VITE_HOME_PATH;
}

const currentRoute = reactive({
  path: '',
});

const contextmenuRef = ref();

// 右击 tab 显示菜单
function handleRightClickTab(e: MouseEvent, route: AppRoute.Route) {
  Object.assign(currentRoute, route);
  contextmenuRef.value.onShowContextmenu(route, {
    x: e.clientX,
    y: e.clientY,
  });
}

// 点击右击菜单
function handleSelect(menuItem: ContextMenuItem) {
  const actions: AnyObj = {
    reload: appStore.reloadPage,
    close: () => tabStore.closeTab(currentRoute.path),
    closeOther: () => tabStore.closeOtherTabs(currentRoute.path),
    closeLeft: () => tabStore.closeLeftTabs(currentRoute.path),
    closeRight: () => tabStore.closeRightTabs(currentRoute.path),
    closeAll: tabStore.closeAllTabs,
  };
  actions[menuItem.key]();
}

// 右击菜单选项
const options = computed(() => {
  const list: ContextMenuItem[] = [
    {
      label: '刷新',
      key: 'reload',
      disabled: !(currentRoute.path === tabStore.currentTabPath),
      icon: 'icon-park-outline:redo',
    },
    {
      label: '关闭',
      key: 'close',
      show: currentRoute.path !== '/home',
      icon: 'icon-park-outline:close',
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: 'icon-park-outline:delete-four',
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      show: currentRoute.path !== '/home',
      icon: 'icon-park-outline:to-left',
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: 'icon-park-outline:to-right',
    },
    {
      label: '关闭全部',
      key: 'closeAll',
      icon: 'icon-park-outline:fullwidth',
    },
  ];

  return list;
});

// 不同 tab 的样式
const tabMap: Record<App.TabStyle, string> = {
  card: 'card-tab',
  dynamic: 'dynamic-tab',
  simple: 'simple-tab',
};
const tabClass = computed(() => tabMap[appStore.tabStyle]);
</script>

<template>
  <div class="tabs-box" :class="tabClass">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
        <el-tab-pane
          v-for="item in tabStore.tabs" :key="item.path"
          :label="item.meta.title" :name="item.path"
          :closable="isClosable(item)"
        >
          <template #label>
            <div class="tabs-item" @contextmenu.prevent="handleRightClickTab($event, item)">
              <app-icon class="tabs-icon" :icon="item.meta.icon" />
              {{ item.meta.title }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <app-dropdown ref="contextmenuRef" :width="120" :items="options" @menu-click="handleSelect" />
  </div>
</template>

<style scoped lang="scss">
@use "cardTab";
@use "dynamicTab";
@use "simpleTab";

.tabs-box {
  .tabs-menu {
    :deep(.el-tabs) {
      .el-tabs__header {
        margin: 0;

        .el-tabs__nav-wrap {
          .el-tabs__nav {
            border: none;

            .el-tabs__item {
              color: var(--el-text-color-primary);
              padding-left: 0;
              padding-right: 0;

              &:not(.is-closable) {
                .tabs-item {
                  padding-right: 10px;
                }
              }

              .tabs-item {
                display: flex;
                align-items: center;
                height: 100%;
                //padding-left: 10px;

                .tabs-icon {
                  margin-right: 4px;
                  font-size: 14px;
                }
              }

              &.is-active {
                color: var(--el-color-primary);

                .is-icon-close {
                  margin-right: 10px;
                }
              }
            }
          }

          .el-tabs__nav-prev {
            box-shadow: 5px 0 5px -6px #ccc;
          }

          .el-tabs__nav-next {
            box-shadow: -5px 0 5px -6px #ccc;
          }
        }
      }
    }
  }
}
</style>
