<script setup lang="ts">
import AppWrapper from '@/layouts/components/AppHeader/components/Wrapper/index.vue';
import SearchMenu from '@/layouts/components/AppHeader/components/SearchMenu/index.vue';

defineOptions({ name: 'AppSearch' });

const show = ref(false);

function handleSearch() {
  show.value = true;
}
</script>

<template>
  <div>
    <n-tooltip>
      <template #trigger>
        <AppWrapper @click="handleSearch">
          <app-icon icon="icon-park-outline:search" />
        </AppWrapper>
      </template>
      <span>搜索</span>
    </n-tooltip>
    <SearchMenu v-model:show="show" />
  </div>
</template>
