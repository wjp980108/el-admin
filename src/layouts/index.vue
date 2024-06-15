<script setup lang="ts">
import LayoutSider from '@/layouts/components/Sider/index.vue'
import LayoutHeader from '@/layouts/components/Header/index.vue'
import LayoutTab from '@/layouts/components/Tab/index.vue'

defineOptions({ name: 'Layout' })
</script>

<template>
  <n-layout has-sider>
    <LayoutSider />
    <n-layout>
      <LayoutHeader />
      <LayoutTab />
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
