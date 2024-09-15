<script setup lang="ts">
import type { FormItemProps } from 'element-plus';
import type { ResponsiveValue } from '../interface';
import { computed, inject, onUnmounted, ref, toRefs, watchEffect } from 'vue';
import { GridContextInjectionKey, GridDataCollectorInjectionKey } from '../context';
import { useIndex } from '../hook/use-index';
import { useResponsiveState } from '../hook/use-responsive-state';
import { resolveItemData } from '../utils';

defineOptions({ name: 'AppFormItem' });
const props = withDefaults(defineProps<Props>(), {
  labelWidth: '',
  labelPosition: '',
  inlineMessage: '',
  showMessage: true,
  offset: 0,
  span: 1,
  suffix: false,
});

interface Props extends FormItemProps {
  // 栅格左侧的间隔格数
  offset?: number | ResponsiveValue
  // 栅格占据的列数，为 0 的时候会隐藏
  span?: number | ResponsiveValue
  // 栅格后缀
  suffix?: boolean
}

const prefixCls = 'app-grid-item';
const domRef = ref<HTMLDivElement>();
const { computedIndex } = useIndex({
  itemRef: domRef,
  selector: `.${prefixCls}`,
});
const gridContext = inject(GridContextInjectionKey, {
  overflow: false,
  displayIndexList: [],
  cols: 24,
  colGap: 0,
});
const gridDataCollector = inject(GridDataCollectorInjectionKey);
const visible = computed(() =>
  gridContext?.displayIndexList?.includes(computedIndex.value),
);
const { span: propSpan, offset: propOffset } = toRefs(props);
const rSpan = useResponsiveState(propSpan, 1);
const rOffset = useResponsiveState(propOffset, 0);
const itemData = computed(() =>
  resolveItemData(gridContext.cols, {
    ...props,
    span: rSpan.value,
    offset: rOffset.value,
  }),
);

const classNames = computed(() => [prefixCls]);
const offsetStyle = computed(() => {
  const { offset, span } = itemData.value;
  const { colGap } = gridContext;
  if (offset > 0) {
    const oneSpan = `(100% - ${colGap * (span - 1)}px) / ${span}`;
    return {
      'margin-left': `calc((${oneSpan} * ${offset}) + ${
        colGap * offset
      }px)`,
    };
  }
  return {};
});
const columnStart = computed(() => {
  const { suffix, span } = itemData.value;
  const { cols } = gridContext;
  if (suffix) {
    return `${cols - span + 1}`;
  }
  return `span ${span}`;
});
const style = computed(() => {
  const { span } = itemData.value;
  if (domRef.value) {
    return [
      {
        'grid-column': `${columnStart.value} / span ${span}`,
      },
      offsetStyle.value,
      !visible.value || span === 0 ? { display: 'none' } : {},
    ];
  }
  return [];
});

const overflow = computed(() => gridContext.overflow);

watchEffect(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.collectItemData(computedIndex.value, itemData.value);
  }
});

onUnmounted(() => {
  if (computedIndex.value !== -1) {
    gridDataCollector?.removeItemData(computedIndex.value);
  }
});
</script>

<template>
  <div ref="domRef" :class="classNames" :style="style">
    <el-form-item v-bind="props">
      <slot :overflow="overflow" />
      <template v-if="$slots.label" #label>
        <slot name="label" />
      </template>
      <template #error>
        <slot name="error" />
      </template>
    </el-form-item>
  </div>
</template>
