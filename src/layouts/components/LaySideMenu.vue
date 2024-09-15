<script setup lang="ts">
import logo from '@/assets/logo.svg';
import LayMenu from '@/layouts/components/LayMenu.vue';
import { useAppStore, useRouteStore } from '@/stores';

defineOptions({ name: 'LaySideMenu' });

const routeStore = useRouteStore();
const { activeMenu, menus } = storeToRefs(routeStore);

const router = useRouter();

const appStore = useAppStore();
const { collapse } = storeToRefs(appStore);

const name = import.meta.env.VITE_APP_NAME;
</script>

<template>
  <el-aside :width="collapse ? '65px' : '210px'">
    <div class="logo flex-center" @click="router.push('/')">
      <el-image class="w-28" :src="logo" alt="Logo" />
      <span v-show="!collapse" class="logo-text">{{ name }}</span>
    </div>
    <el-scrollbar>
      <el-menu
        class="!b-r-0"
        :collapse
        :default-active="activeMenu"
        :collapse-transition="false"
        unique-opened
      >
        <LayMenu :menu-list="menus" />
      </el-menu>
    </el-scrollbar>
    <div class="aside-toggle-bar" @click="collapse = !collapse">
      <div class="aside-toggle-bar-top" />
      <div class="aside-toggle-bar-bottom" />
    </div>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  position: relative;
  z-index: 1;
  overflow: unset;
  color: var(--el-menu-text-color);
  background-color: var(--el-menu-bg-color);
  border-right: 1px solid var(--el-border-color);
  transition: width .3s ease;

  .logo {
    height: 55px;

    .logo-text {
      margin-left: 6px;
      font-size: 22px;
      font-weight: bold;
      white-space: nowrap;
    }
  }

  .el-scrollbar {
    height: calc(100vh - 55px);

    .el-menu {
      width: 100%;
    }
  }

  .aside-toggle-bar {
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    right: -28px;

    &:hover {
      .aside-toggle-bar-top,.aside-toggle-bar-bottom  {
        background-color: var(--app-toggle-bar-color-hover);
      }

      .aside-toggle-bar-top {
        transform: rotate(12deg) scale(1.15) translateY(-2px);
      }
      .aside-toggle-bar-bottom {
        transform: rotate(-12deg) scale(1.15) translateY(2px);
      }
    }

    &-top,&-bottom {
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      transition: background-color .3s var(--app-bezier), transform .3s var(--app-bezier);
      background-color: var(--app-toggle-bar-color);
    }

    &-bottom {
      top: 34px;
    }
  }

  &:has(.el-menu--collapse) {
    :deep(.is-active) {
      .el-sub-menu__title {
        color: var(--el-color-white) !important;
        background-color: var(--el-color-primary-light-2) !important;
      }
    }

    .aside-toggle-bar {
      &:hover {
        .aside-toggle-bar-top {
          transform: rotate(-12deg) scale(1.15) translateY(-2px);
        }
        .aside-toggle-bar-bottom {
          transform: rotate(12deg) scale(1.15) translateY(2px);
        }
      }
    }
  }
}
</style>
