<script setup lang="ts">
import LayHeader from '@/layouts/components/LayHeader.vue';
import LaySideMenu from '@/layouts/components/LaySideMenu.vue';
import LayTabs from '@/layouts/components/LayTabs/index.vue';
import { useAppStore, useRouteStore } from '@/stores';

defineOptions({ name: 'Layout' });

const appStore = useAppStore();
const routeStore = useRouteStore();

const {
  transitionAnimation,
  loadFlag,
  watermark,
  isDark,
} = storeToRefs(appStore);

const watermarkConfig = reactive({
  content: '智选云商',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, .15)',
  },
});

watchEffect(() => {
  watermarkConfig.font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
});
</script>

<template>
  <el-watermark class="wh-full" :content="watermark ? watermarkConfig.content : ''" :font="watermarkConfig.font">
    <el-container>
      <LaySideMenu />
      <el-container>
        <el-header>
          <LayHeader />
          <LayTabs />
        </el-header>
        <el-scrollbar class="flex-box" wrap-class="flex-box" view-class="flex-box">
          <el-main class="flex-box bg-[var(--el-bg-color-page)]" style="--el-main-padding: 16px">
            <router-view v-slot="{ Component, route }">
              <transition :name="transitionAnimation" mode="out-in" appear>
                <keep-alive :include="routeStore.cacheRoutes">
                  <component :is="Component" v-if="loadFlag" :key="route.fullPath" />
                </keep-alive>
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
        <el-tooltip content="返回顶部" placement="top">
          <el-backtop target=".el-scrollbar .el-scrollbar__view" :bottom="120" />
        </el-tooltip>
      </el-container>
    </el-container>
  </el-watermark>
</template>
