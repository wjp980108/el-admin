<script setup lang="ts">
import AppWrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue'

defineOptions({ name: 'AppSetting' })
const showSetting = ref(false)
</script>

<template>
  <div>
    <n-tooltip>
      <template #trigger>
        <AppWrapper @click="showSetting = true">
          <app-icon icon="icon-park-outline:setting" />
        </AppWrapper>
      </template>
      <span>系统设置</span>
    </n-tooltip>
    <n-drawer v-model:show="showSetting" :width="360" resizable>
      <n-drawer-content title="系统设置" closable>
        <n-divider>主题设置</n-divider>

        <template #footer>
          <n-button>Footer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
