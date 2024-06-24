<script setup lang="ts">
import { naiveI18nOptions } from '@/utils';
import NaiveProvider from '@/components/NaiveProvider/index.vue';
import { useAppStore } from '@/stores';

const naiveLocale = computed(() => {
  return 'zhCN' ? naiveI18nOptions.zhCN : naiveI18nOptions.enUS;
});

const appStore = useAppStore();
</script>

<template>
  <n-config-provider class="wh-full" :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale">
    <NaiveProvider>
      <n-spin :show="appStore.loadingShow" :description="appStore.loadingText">
        <router-view />
      </n-spin>
    </NaiveProvider>
  </n-config-provider>
</template>
