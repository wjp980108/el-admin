<script setup lang="ts">
import { naiveI18nOptions } from '@/utils'

const naiveLocale = computed(() => {
  return 'zhCN' ? naiveI18nOptions.zhCN : naiveI18nOptions.enUS
})
</script>

<template>
  <n-config-provider class="wh-full" :locale="naiveLocale.locale" :date-locale="naiveLocale.dateLocale">
    <router-view />
  </n-config-provider>
</template>
