<script setup lang="ts">
import { useRouteStore } from '@/stores'

defineOptions({ name: 'LayoutSider' })
const routeStore = useRouteStore()
</script>

<template>
  <n-layout-sider>
    <n-menu :options="routeStore.state.menus" />
  </n-layout-sider>
</template>

<style scoped>

</style>
