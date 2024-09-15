<script setup lang="ts">
import SearchMenu from '@/layouts/components/LaySearchMenu.vue';

defineOptions({ name: 'LaySearch' });

const show = ref(false);

function handleSearch() {
  show.value = true;
}
</script>

<template>
  <div>
    <el-tooltip content="搜索">
      <app-wrapper @click="handleSearch">
        <app-icon icon="icon-park-outline:search" />
      </app-wrapper>
    </el-tooltip>
    <SearchMenu v-model="show" />
  </div>
</template>
