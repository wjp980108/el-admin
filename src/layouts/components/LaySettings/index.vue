<script setup lang="ts">
import { useTheme } from '@/hooks';
import ColorSettings from '@/layouts/components/LaySettings/components/Color.vue';
import { useAppStore } from '@/stores';

defineOptions({ name: 'LaySettings' });

const showSetting = ref(false);

const appStore = useAppStore();

const {
  storeColorMode,
  size,
  asideInverted,
  breadcrumbShow,
  breadcrumbIconShow,
  transitionAnimation,
  tabStyle,
  watermark,
} = storeToRefs(appStore);

const colorModeOptions = [
  { label: 'light', value: 'light', icon: 'icon-park-outline:sun-one' },
  { label: 'dark', value: 'dark', icon: 'icon-park-outline:moon' },
  { label: 'auto', value: 'auto', icon: 'icon-park-outline:laptop-computer' },
];

const layoutOptions = [
  { label: '默认', value: 'default' },
  { label: '大', value: 'large' },
  { label: '小', value: 'small' },
];
const { setColorMode, setMenuTheme } = useTheme();
</script>

<template>
  <div class="app-setting">
    <el-tooltip content="系统设置">
      <app-wrapper @click="showSetting = true">
        <app-icon icon="icon-park-outline:setting" />
      </app-wrapper>
    </el-tooltip>
    <el-drawer v-model="showSetting" class="text-14" title="系统设置" :size="290">
      <el-divider>布局样式</el-divider>
      <el-segmented v-model="size" :options="layoutOptions" block />
      <el-divider>主题模式</el-divider>
      <app-flex vertical :size="16">
        <el-segmented :model-value="storeColorMode" :options="colorModeOptions" block @change="setColorMode">
          <template #default="{ item }">
            <app-flex justify="center">
              <app-icon :icon="item.icon" />
            </app-flex>
          </template>
        </el-segmented>
        <app-flex align="center">
          <app-flex :size="0">
            侧边栏反转色
            <app-help-info message="侧边栏颜色变为深色模式" />
          </app-flex>
          <el-switch v-model="asideInverted" @change="setMenuTheme" />
        </app-flex>
      </app-flex>
      <el-divider>主题颜色</el-divider>
      <ColorSettings />
      <el-divider>页面设置</el-divider>
      <app-flex justify="space-between" align="center">
        页面切换效果
        <el-select v-model="transitionAnimation" class="!w-120">
          <el-option label="淡入淡出" value="fade" />
          <el-option label="左侧淡出" value="fade-slide" />
          <el-option label="底部消退" value="fade-bottom" />
          <el-option label="缩放消退" value="fade-scale" />
          <el-option label="渐变" value="zoom-fade" />
          <el-option label="闪现" value="zoom-out" />
          <el-option label="无" value=" " />
        </el-select>
      </app-flex>
      <app-flex justify="space-between" align="center">
        面包屑
        <el-switch v-model="breadcrumbShow" active-text="显示" inactive-text="隐藏" inline-prompt />
      </app-flex>
      <app-flex justify="space-between" align="center">
        面包屑图标
        <el-switch v-model="breadcrumbIconShow" active-text="显示" inactive-text="隐藏" inline-prompt />
      </app-flex>
      <app-flex justify="space-between" align="center">
        标签页风格
        <el-select v-model="tabStyle" class="!w-120">
          <el-option label="灵动" value="dynamic" />
          <el-option label="卡片" value="card" />
          <el-option label="朴素" value="simple" />
        </el-select>
      </app-flex>
      <app-flex justify="space-between" align="center">
        水印
        <el-switch v-model="watermark" active-text="显示" inactive-text="隐藏" inline-prompt />
      </app-flex>
      <template #footer>
        <el-button type="danger" @click="appStore.handleAppReset">
          重置
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.app-setting {
  :deep(.el-overlay) {
    .el-drawer {
      --el-drawer-padding-primary: 15px;

      .el-drawer__header {
        margin: 0;
        padding-bottom: var(--el-drawer-padding-primary);
        border-bottom: 1px solid var(--el-border-color);
        color: var(--el-text-color-primary);
      }

      .el-drawer__footer {
        border-top: 1px solid var(--el-border-color);
      }
    }
  }
}
</style>
