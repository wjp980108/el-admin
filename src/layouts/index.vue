<script setup lang="ts">
import SideMenu from '@/layouts/components/SideMenu/index.vue'
import TabBar from '@/layouts/components/TabBar/index.vue'
import AppHeader from '@/layouts/components/AppHeader/index.vue'

defineOptions({ name: 'Layout' })
</script>

<template>
  <n-layout class="wh-full" has-sider embedded>
    <SideMenu />
    <n-layout>
      <n-layout-header bordered>
        <AppHeader />
        <TabBar />
      </n-layout-header>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
