<script setup lang="ts">
import { useRouteStore } from '@/stores/route'

defineOptions({ name: 'Home' })
const routeStore = useRouteStore()
routeStore.initAuthRoute()
</script>

<template>
  <div>首页</div>
</template>

<style scoped>

</style>
