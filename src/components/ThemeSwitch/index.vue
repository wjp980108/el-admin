<script setup lang="ts">
import { NFlex } from 'naive-ui';
import { renderIcon } from '@/utils';
import Wrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue';
import { useAppStore } from '@/stores';

defineOptions({ name: 'ThemeSwitch' });

const appStore = useAppStore();

const options = [
  {
    label: '浅色',
    value: 'light',
    icon: renderIcon('icon-park-outline:sun-one'),
  },
  {
    label: '深色',
    value: 'dark',
    icon: renderIcon('icon-park-outline:moon'),
  },
  {
    label: '跟随系统',
    value: 'auto',
    icon: renderIcon('icon-park-outline:laptop-computer'),
  },
];

// 修改内容，新增图标显示
function renderLabel(option: any) {
  return h(NFlex, { align: 'center' }, {
    default: () => [
      h(option.icon),
      option.label,
    ],
  });
}

// 设置提示文本
function setTooltipText() {
  const themeInfo = {
    light: '浅色主题',
    dark: '深色主题',
    auto: '跟随系统',
  };
  return themeInfo[appStore.storeColorMode];
}
</script>

<template>
  <n-tooltip placement="left">
    <template #trigger>
      <n-popselect :value="appStore.storeColorMode" :render-label="renderLabel" :options="options" trigger="click" @update:value="appStore.setColorMode">
        <Wrapper>
          <app-icon v-show="appStore.storeColorMode === 'light'" icon="icon-park-outline:sun-one" />
          <app-icon v-show="appStore.storeColorMode === 'dark'" icon="icon-park-outline:moon" />
          <app-icon v-show="appStore.storeColorMode === 'auto'" icon="icon-park-outline:laptop-computer" />
        </Wrapper>
      </n-popselect>
    </template>
    <span>{{ setTooltipText() }}</span>
  </n-tooltip>
</template>

<style scoped>

</style>
