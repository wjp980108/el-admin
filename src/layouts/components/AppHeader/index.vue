<script setup lang="ts">
import { useAppStore } from '@/stores';
import AppSetting from '@/layouts/components/AppHeader/components/Setting/index.vue';
import AppSearch from '@/layouts/components/AppHeader/components/Search/index.vue';
import AppUser from '@/layouts/components/AppHeader/components/User/index.vue';
import AppWrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue';

defineOptions({ name: 'AppHeader' });

const appStore = useAppStore();
</script>

<template>
  <div class="h-15 flex-y-center justify-between b-b-(1 #EFEFF5 solid)">
    <div>left</div>
    <div class="h-full flex-y-center gap-1 p-x-xl">
      <AppSearch />
      <n-tooltip>
        <template #trigger>
          <AppWrapper @click="appStore.toggleFullScreen">
            <app-icon v-if="appStore.fullscreen" icon="icon-park-outline:off-screen-one" />
            <app-icon v-else icon="icon-park-outline:full-screen-one" />
          </AppWrapper>
        </template>
        <span>切换全屏</span>
      </n-tooltip>
      <AppSetting />
      <AppUser />
    </div>
  </div>
</template>
