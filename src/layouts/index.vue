<script setup lang="ts">
import SideMenu from '@/layouts/components/SideMenu/index.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'
import AppHeader from '@/layouts/components/AppHeader/index.vue'

defineOptions({ name: 'Layout' })
const maxHeight = 'max-height: calc(100vh - 60px - 45px)'

const scrollbar = ref()
function target() {
  return scrollbar.value!.scrollbarInstRef.containerRef
}
</script>

<template>
  <n-layout class="wh-full" embedded has-sider>
    <SideMenu />
    <n-layout>
      <n-layout-header bordered>
        <AppHeader />
        <TabBar />
      </n-layout-header>
      <n-scrollbar ref="scrollbar" :style="maxHeight">
        <n-layout-content content-class="p-4">
          <router-view />
        </n-layout-content>
      </n-scrollbar>
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
