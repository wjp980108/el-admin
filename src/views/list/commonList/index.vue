<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

defineOptions({ name: 'CommonList' });
interface Song {
  no: number
  title: string
  length: string
  checked: boolean
}

const columns: DataTableColumns<Song> = [
  { key: 'no', title: 'No.', width: 50, checked: false },
  { key: 'title', title: 'Title', checked: false },
  { key: 'length', title: 'Length', checked: false },
];

const data: Song[] = [
  {
    no: 1,
    title: 'wjp',
    length: '20',
  },
  {
    no: 2,
    title: 'wjp',
    length: '20',
  },
];
</script>

<template>
  <n-flex>
    <n-card>
      <table-search label-width="60">
        <n-form-item-gi span="1" label="输入框">
          <n-input placeholder="搜索" />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="时间">
          <n-date-picker type="daterange" />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="选择框">
          <n-date-picker />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="搜索">
          <n-select />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="搜索">
          <n-select />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="搜索">
          <n-input placeholder="搜索" />
        </n-form-item-gi>
        <n-form-item-gi span="1" label="搜索">
          <n-input placeholder="搜索" />
        </n-form-item-gi>
      </table-search>
    </n-card>
    <n-card>
      <n-space vertical>
        <n-flex align="center" justify="space-between">
          <div class="text-4 font-600">
            常用列表
          </div>
          <n-flex>
            <n-button type="primary">
              新增
            </n-button>
            <n-button>刷新</n-button>
            <table-column-setting v-model:columns="columns" />
          </n-flex>
        </n-flex>
        <n-data-table :columns="columns" :data="data" />
      </n-space>
    </n-card>
  </n-flex>
</template>

<style scoped>

</style>
