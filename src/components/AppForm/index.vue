<script setup lang="ts">
import type { ResponsiveValue } from '@/components/AppGrid/interface';

defineOptions({ name: 'AppForm' });

withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  collapsedRows: 1,
  rowGap: 0,
  colGap: 15,
});

interface Props {
  labelWidth?: string | number
  cols: ResponsiveValue
  collapsedRows?: number
  rowGap?: number | ResponsiveValue
  colGap?: number | ResponsiveValue
  search: () => void
  reset: () => void
}

const collapsed = ref(true);

const gridRef = ref();

// const showCollapse = computed(() => {
//   return gridRef.value?.gridContext.overflow;
// });
</script>

<template>
  <el-form :label-width="labelWidth">
    <app-grid ref="gridRef" :cols :collapsed :row-gap="rowGap" :col-gap="colGap" :collapsed-rows="collapsedRows">
      <slot />
      <app-form-item suffix>
        <app-flex>
          <el-button type="primary" @click="search">
            查询
          </el-button>
          <el-button class="!m-0" @click="reset">
            重置
          </el-button>
          <el-button type="primary" link class="!m-0" @click="collapsed = !collapsed">
            {{ collapsed ? "展开" : "合并" }}
            <app-icon :icon="collapsed ? 'ArrowDown' : 'ArrowUp'" />
          </el-button>
        </app-flex>
      </app-form-item>
    </app-grid>
  </el-form>
</template>
