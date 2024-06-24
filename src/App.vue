<script setup lang="ts">
import { naiveI18nOptions } from '@/utils';
import NaiveProvider from '@/components/NaiveProvider/index.vue';

const naiveLocale = computed(() => {
  return 'zhCN' ? naiveI18nOptions.zhCN : naiveI18nOptions.enUS;
});
</script>

<template>
  <n-config-provider class="wh-full" :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale">
    <NaiveProvider>
      <router-view />
    </NaiveProvider>
  </n-config-provider>
</template>
