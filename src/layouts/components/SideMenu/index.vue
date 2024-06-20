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
    content-style="display: flex;flex-direction: column;min-height:100%;"
    :collapsed="appStore.collapsed"
    bordered
    show-trigger="bar"
    @collapse="appStore.collapsed = true"
    @expand="appStore.collapsed = false"
  >
    <div
      class="h-60px flex-center cursor-pointer gap-2 p-x-2 text-xl"
      @click="router.push('/')"
    >
      <n-image :width="60" :src="logo" />
      <span v-show="!appStore.collapsed" class="overflow-hidden text-ellipsis whitespace-nowrap">{{ name }}</span>
    </div>
    <n-scrollbar class="flex-1">
      <n-menu :collapsed="appStore.collapsed" :options="routeStore.menus" :value="routeStore.activeMenu" accordion />
    </n-scrollbar>
  </n-layout-sider>
</template>

<style scoped>

</style>
