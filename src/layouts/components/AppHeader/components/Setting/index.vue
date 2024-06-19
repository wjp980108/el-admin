<script setup lang="ts">
import { useAppStore } from '@/stores'
import AppWrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue'

defineOptions({ name: 'AppSetting' })

const showSetting = ref(false)

const appStore = useAppStore()
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
        <n-space align="center" justify="space-between">
          侧边菜单字体
          <n-input-number v-model:value="appStore.menuFontSize" class="w-10em" :min="12" :max="24" :step="2" button-placement="both" placeholder="字体大小">
            <template #suffix>
              px
            </template>
          </n-input-number>
        </n-space>
        <template #footer>
          <n-button>Footer</n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
