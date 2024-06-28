<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';

defineOptions({ name: 'TableColumnSetting' });

const columns = defineModel<TableColumnCheck[]>('columns', {
  required: true,
});
interface TableColumnCheck {
  key: string
  title: string
  checked: boolean
}
</script>

<template>
  <n-popover placement="bottom-end" trigger="click">
    <template #trigger>
      <n-button>列设置</n-button>
    </template>
    <VueDraggable v-model="columns" :animation="150" filter=".none_draggable">
      <n-el v-for="item in columns" :key="item.key" class="h-36px flex-y-center rd-4px hover:(bg-[--primary-color-hover] bg-opacity-20)">
        <app-icon icon="mdi:drag" class="text-icon mr-8px cursor-move" />
        <n-checkbox v-model:checked="item.checked" class="none_draggable flex-1">
          {{ item.title }}
        </n-checkbox>
      </n-el>
    </VueDraggable>
  </n-popover>
</template>

<style scoped>

</style>
