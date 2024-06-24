<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui';

defineOptions({ name: 'Home' });

interface Song {
  no: number
  title: string
  length: string
}

const columns: DataTableColumns<Song> = [
  { key: 'no', title: 'No.', width: 50 },
  { key: 'title', title: 'Title' },
  { key: 'length', title: 'Length' },
];

const pagination = {
  pageSize: 50,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
};

const data: Song[] = [
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' },
];
</script>

<template>
  <n-card>
    <n-button strong secondary circle>
      <template #icon>
        <app-icon icon="mdi:chevron-double-left" :size="20" />
      </template>
    </n-button>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :bordered="false"
    />
  </n-card>
</template>

<style scoped>

</style>
