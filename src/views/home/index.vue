<script setup lang="ts">
defineOptions({ name: 'Home' })
const showModal = ref(false)
</script>

<template>
  <div>首页</div>
  <n-button @click="showModal = true">
    弹出
  </n-button>
  <app-popup v-model:show="showModal" title="弹窗">
    <div>1</div>
    <div>2</div>
  </app-popup>
</template>

<style scoped>

</style>
