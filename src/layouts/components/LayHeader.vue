<script setup lang="ts">
import LayBreadcrumb from '@/layouts/components/LayBreadcrumb.vue';
import LaySearch from '@/layouts/components/LaySearch.vue';
import LaySettings from '@/layouts/components/LaySettings/index.vue';
import LayUser from '@/layouts/components/LayUser.vue';
import { useAppStore } from '@/stores';

defineOptions({ name: 'LayHeader' });

const appStore = useAppStore();
const { loadFlag, breadcrumbShow, fullscreen } = storeToRefs(appStore);
</script>

<template>
  <app-flex class="p-[5px_10px] border-b" justify="space-between" align="center">
    <app-flex class="overflow-hidden" :size="5" align="center">
      <el-tooltip content="刷新页面">
        <app-wrapper @click="appStore.reloadPage">
          <app-icon :class="loadFlag ? '' : 'is-loading'" icon="icon-park-outline:refresh" />
        </app-wrapper>
      </el-tooltip>
      <LayBreadcrumb v-if="breadcrumbShow" />
    </app-flex>
    <app-flex :size="5" align="center">
      <LaySearch />
      <el-tooltip content="切换全屏">
        <app-wrapper @click="appStore.toggleFullScreen">
          <app-icon v-if="fullscreen" icon="icon-park-outline:off-screen-one" />
          <app-icon v-else icon="icon-park-outline:full-screen-one" />
        </app-wrapper>
      </el-tooltip>
      <app-theme-switch />
      <LaySettings />
      <LayUser />
    </app-flex>
  </app-flex>
</template>
