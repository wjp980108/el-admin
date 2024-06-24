<script setup lang="ts">
import { useRouteStore } from '@/stores';

const routeStore = useRouteStore();
routeStore.initAuthRoute();
</script>

<template>
  <div>登录{{ routeStore.isInitAuthRoute }}</div>
</template>

<style scoped>

</style>
