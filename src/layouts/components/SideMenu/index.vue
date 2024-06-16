<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/stores'
import logo from '@/assets/logo.svg'

defineOptions({ name: 'SideMenu' })

const routeStore = useRouteStore()

const router = useRouter()

const appStore = useAppStore()

const name = import.meta.env.VITE_APP_NAME
</script>

<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger="bar"
    content-style="display: flex;flex-direction: column;min-height:100%;"
    :collapsed="appStore.collapsed"
    bordered
    @collapse="appStore.collapsed = true"
    @expand="appStore.collapsed = false"
  >
    <div
      class="h-60px text-xl flex-center cursor-pointer gap-2 p-x-2"
      @click="router.push('/')"
    >
      <n-image :width="60" :src="logo" />
      <span v-show="!appStore.collapsed" class="text-ellipsis overflow-hidden whitespace-nowrap">{{ name }}</span>
    </div>
    <n-scrollbar class="flex-1">
      <n-menu :collapsed="appStore.collapsed" :options="routeStore.menus" :value="routeStore.activeMenu" accordion />
    </n-scrollbar>
  </n-layout-sider>
</template>

<style scoped>

</style>
