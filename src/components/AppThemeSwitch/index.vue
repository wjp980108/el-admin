<script setup lang="ts">
import { useTheme } from '@/hooks';
import { useAppStore } from '@/stores';
import { renderIcon } from '@/utils';

defineOptions({ name: 'AppThemeSwitch' });

const appStore = useAppStore();

// 设置提示文本
function setTooltipText() {
  const themeInfo = {
    light: '浅色主题',
    dark: '深色主题',
    auto: '跟随系统',
  };
  return themeInfo[appStore.storeColorMode];
}

function isCheck(val: string) {
  return appStore.storeColorMode === val;
}

const { setColorMode } = useTheme();
</script>

<template>
  <el-dropdown class="theme-switch" trigger="click" @command="setColorMode">
    <span>
      <el-tooltip :content="setTooltipText()" placement="left">
        <app-wrapper>
          <app-icon v-if="appStore.storeColorMode === 'light'" icon="icon-park-outline:sun-one" size="16" />
          <app-icon v-if="appStore.storeColorMode === 'dark'" icon="icon-park-outline:moon" />
          <app-icon v-if="appStore.storeColorMode === 'auto'" icon="icon-park-outline:laptop-computer" />
        </app-wrapper>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          :icon="renderIcon('icon-park-outline:sun-one')"
          command="light"
          :disabled="isCheck('light')"
        >
          浅色
        </el-dropdown-item>
        <el-dropdown-item
          :icon="renderIcon('icon-park-outline:moon')"
          command="dark"
          :disabled="isCheck('dark')"
        >
          深色
        </el-dropdown-item>
        <el-dropdown-item
          :icon="renderIcon('icon-park-outline:laptop-computer')"
          command="auto"
          :disabled="isCheck('auto')"
        >
          跟随系统
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
