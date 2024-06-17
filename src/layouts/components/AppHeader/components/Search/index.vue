<script setup lang="ts">
import AppWrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue'

defineOptions({ name: 'AppSearch' })
</script>

<template>
  <div>
    <n-tooltip>
      <template #trigger>
        <AppWrapper>
          <app-icon icon="icon-park-outline:search" />
        </AppWrapper>
      </template>
      <span>搜索</span>
    </n-tooltip>
  </div>
</template>
