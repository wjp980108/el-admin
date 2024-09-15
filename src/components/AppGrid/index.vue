<script setup lang="ts">
import type { GridItemData, ResponsiveValue } from './interface';
import { GridContextInjectionKey, GridDataCollectorInjectionKey } from './context';
import { useResponsiveState } from './hook/use-responsive-state';
import { setItemVisible } from './utils';

defineOptions({ name: 'AppGrid' });

const props = withDefaults(defineProps<Props>(), {
  cols: 24,
  rowGap: 0,
  colGap: 0,
  collapsed: false,
  collapsedRows: 1,
});

interface Props {
  cols: number | ResponsiveValue
  rowGap: number | ResponsiveValue
  colGap: number | ResponsiveValue
  collapsed: boolean
  collapsedRows: number
}

const {
  cols: propCols,
  rowGap: propRowGap,
  colGap: propColGap,
  collapsedRows,
  collapsed,
} = toRefs(props);
const cols = useResponsiveState(propCols, 24);
const colGap = useResponsiveState(propColGap, 0);
const rowGap = useResponsiveState(propRowGap, 0);
const style = computed(() => [
  {
    'gap': `${rowGap.value}px ${colGap.value}px`,
    'grid-template-columns': `repeat(${cols.value}, minmax(0px, 1fr))`,
  },
]);
const itemDataMap = reactive<Map<number, GridItemData>>(new Map());
const itemDataList = computed(() => {
  const list: GridItemData[] = [];
  for (const [index, itemData] of itemDataMap.entries()) {
    list[index] = itemData;
  }
  return list;
});
const gridContext = reactive<{
  overflow: boolean
  displayIndexList: number[]
  cols: number
  colGap: number
}>({
  overflow: false,
  displayIndexList: [],
  cols: cols.value,
  colGap: colGap.value,
});

watchEffect(() => {
  gridContext.cols = cols.value;
  gridContext.colGap = colGap.value;
});
watchEffect(() => {
  const displayInfo = setItemVisible({
    cols: cols.value,
    collapsed: collapsed.value,
    collapsedRows: collapsedRows.value,
    itemDataList: itemDataList.value,
  });
  gridContext.overflow = displayInfo.overflow;
  gridContext.displayIndexList = displayInfo.displayIndexList;
});

provide(GridContextInjectionKey, gridContext);
provide(GridDataCollectorInjectionKey, {
  collectItemData(index, itemData) {
    itemDataMap.set(index, itemData);
  },
  removeItemData(index) {
    itemDataMap.delete(index);
  },
});
defineExpose({ gridContext });
</script>

<template>
  <div class="app-grid" :style="style">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.app-grid {
  display: grid;
}
</style>
