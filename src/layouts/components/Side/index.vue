<script setup lang="ts">
import { useRouteStore } from '@/stores'

defineOptions({ name: 'LayoutSide' })
const routeStore = useRouteStore()
</script>

<template>
  <n-layout-sider>
    <n-menu :options="routeStore.menus" />
  </n-layout-sider>
</template>

<style scoped>

</style>
