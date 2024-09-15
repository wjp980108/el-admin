<script setup lang="ts">
import type { AppTable } from '@/typings/table';
import type { TableInstance, TableProps } from 'element-plus';
import type { PropType } from 'vue';

defineOptions({ name: 'AppTable' });

const props = withDefaults(defineProps<Props>(), {
  border: true,
  fit: true,
  showHeader: true,
  rowKey: 'id',
  loading: false,
  loadingText: '加载中',
  selectOnIndeterminate: true,
  indent: 16,
});

const emits = defineEmits(['refresh']);

interface Props extends TableProps<any> {
  title?: string
  columns: AppTable.TableColumns
  loading?: boolean
  loadingText?: string
}

const columnChecks = defineModel<AppTable.TableColumnChecks>('columnChecks', { required: true });
const pagination = defineModel('pagination', {
  type: Object as PropType<AppTable.Pagination>,
  default: () => null,
});

const tableRef = ref<TableInstance>();
const itemKey = ref(0);

watchEffect(() => {
  if (props.columns || props.data) {
    itemKey.value = Math.random();
  }
});

defineExpose({ table: tableRef });

// 点击刷新
function handleRefresh() {
  emits('refresh');
}
</script>

<template>
  <el-card class="flex-box" body-class="flex-box">
    <app-flex v-loading="loading!" class="w-full flex-1" :size="16" vertical :element-loading-text="loadingText">
      <table-header v-model="columnChecks" :title>
        <slot name="header" />
        <el-button @click="handleRefresh">
          <template #icon>
            <app-icon :class="loading ? 'is-loading' : ''" icon="Refresh" />
          </template>
          刷新
        </el-button>
      </table-header>
      <el-table ref="tableRef" :key="itemKey" class="flex-1" v-bind="$props" :border :row-key="rowKey" title="">
        <table-column v-for="column of columns" :key="column.prop" :column />
      </el-table>
      <el-pagination
        v-if="pagination"
        v-bind="pagination"
        v-model:page-size="pagination!.pageSize"
        v-model:current-page="pagination!.currentPage"
        @change="pagination.change"
      />
    </app-flex>
  </el-card>
</template>
