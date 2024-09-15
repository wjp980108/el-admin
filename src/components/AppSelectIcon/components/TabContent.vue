<script setup lang="ts">
import type { APIv2CollectionResponse } from '@/components/AppSelectIcon/index';
import { renderIcon } from '@/utils';
import { Icon } from '@iconify/vue';

defineOptions({ name: 'TabContent' });
const props = defineProps<Props>();

const emits = defineEmits(['selectIcon']);
interface Props {
  data: APIv2CollectionResponse[]
  activeName: string
}
const searchIcon = ref('');
const currentPage = ref(1);
const pageSize = ref(120);

// 处理搜索图标
const filterIcons = computed(() => {
  let list = [];
  if (props.activeName === 'all') {
    list = props.data.map(item => item.icons).flat();
  }
  else {
    list = props.data.filter(item => item.title === props.activeName).map(item => item.icons).flat();
  }

  if (!searchIcon.value)
    return list;

  return list.filter(item => item!.includes(searchIcon.value.toLowerCase()));
});

// 分页图标
const paginatedIcons = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filterIcons.value.slice(start, end);
});

function handleIcon(val: string) {
  emits('selectIcon', val);
}
</script>

<template>
  <app-flex vertical :size="4">
    <app-flex>
      <el-input v-model="searchIcon" placeholder="搜索图标" :prefix-icon="renderIcon('line-md:search')" clearable />
      <el-text>共 {{ filterIcons.length }} 个</el-text>
    </app-flex>
    <el-scrollbar height="calc(470px - 14px - 8px - 32px - 32px - 8px)">
      <app-flex :size="0">
        <app-wrapper v-for="(icon, index) of paginatedIcons" :key="index" class="p-7" @click="handleIcon(icon!)">
          <app-flex justify="center" align="center" class="h-26 w-26">
            <Icon :icon="icon!" class="text-26" />
          </app-flex>
        </app-wrapper>
        <el-empty v-if="!paginatedIcons.length" class="w-full" description="暂无图标" />
      </app-flex>
    </el-scrollbar>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      class="self-center"
      layout="prev, pager, next"
      :total="filterIcons.length"
      hide-on-single-page
    />
  </app-flex>
</template>
