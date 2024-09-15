<script setup lang="ts">
import type { MenuItemRegistered } from 'element-plus';
import { navigationFailure } from '@/constants';
import { useNotification } from '@/hooks';

defineOptions({ name: 'LayMenu' });
defineProps<{ menuList: AppRoute.Menu[] }>();

const router = useRouter();
const route = useRoute();

const { notify } = useNotification();

// 点击菜单切换路由
function handleClickMenu(item: MenuItemRegistered) {
  if (item.index === route.path)
    return notify(navigationFailure);

  if (item.index) {
    router.push(item.index);
  }
}
</script>

<template>
  <template v-for="menu of menuList" :key="menu.key">
    <el-sub-menu v-if="menu.children" :index="menu.key">
      <template #title>
        <app-icon v-if="menu.icon" :icon="menu.icon" :size="20" />
        <span class="truncate">{{ menu.label }}</span>
      </template>
      <lay-menu :menu-list="menu.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="menu.key" @click="handleClickMenu">
      <app-icon v-if="menu.icon" :icon="menu.icon" :size="20" />
      <template #title>
        <span class="truncate">{{ menu.label }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
.el-sub-menu {
  :deep(.el-sub-menu__title) {
    &:hover {
      color: var(--el-menu-hover-text-color) !important;
      background-color: transparent !important;
    }
  }
}

.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }

  &.is-active {
    color: var(--el-menu-active-color);
    background-color: var(--el-menu-active-bg-color);

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
</style>
