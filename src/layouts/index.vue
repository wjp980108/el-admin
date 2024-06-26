<script setup lang="ts">
import SideMenu from '@/layouts/components/SideMenu/index.vue';
import TabBar from '@/layouts/components/TabBar/index.vue';
import AppHeader from '@/layouts/components/AppHeader/index.vue';
import { useAppStore, useRouteStore } from '@/stores';

defineOptions({ name: 'Layout' });
const maxHeight = 'height: calc(100vh - 60px - 45px)';

const scrollbar = ref();

function target() {
  return scrollbar.value!.scrollbarInstRef.containerRef;
}

const appStore = useAppStore();
const routeStore = useRouteStore();
</script>

<template>
  <n-layout class="wh-full" has-sider>
    <SideMenu />
    <n-layout>
      <n-layout-header bordered>
        <AppHeader />
        <TabBar />
      </n-layout-header>
      <n-layout-content embedded>
        <n-scrollbar ref="scrollbar" :style="maxHeight" content-class="p-4">
          <router-view v-slot="{ Component, route }">
            <transition :name="appStore.transitionAnimation" mode="out-in">
              <keep-alive :include="routeStore.cacheRoutes">
                <component :is="Component" v-if="appStore.loadFlag" :key="route.fullPath" />
              </keep-alive>
            </transition>
          </router-view>
        </n-scrollbar>
      </n-layout-content>
    </n-layout>
    <n-back-top :listen-to="target">
      <n-tooltip>
        返回顶部
        <template #trigger>
          <app-icon icon="ic:round-vertical-align-top" :size="26" />
        </template>
      </n-tooltip>
    </n-back-top>
  </n-layout>
</template>
