<script setup lang="ts">
import type { AppTable } from '@/typings/table';
import { cloneDeep } from 'lodash-es';
import { VueDraggable } from 'vue-draggable-plus';

defineOptions({ name: 'TableHeader' });

withDefaults(defineProps<Props>(), {
  title: '列表',
});

interface Props {
  title?: string
}

const columns = defineModel<AppTable.TableColumnChecks>({
  required: true,
});

// 全选
const checkAll = computed<boolean>({
  get: () => columns.value.every(item => item.checked),
  set: (val) => {
    columns.value.forEach((item) => {
      item.checked = val;
    });
  },
});

// 是否半选
const isIndeterminate = computed<boolean>(() => {
  const checkedCount = columns.value.filter(item => item.checked).length;
  return checkedCount > 0 && checkedCount < columns.value.length;
});

// 初始列
const initialColumns = ref<AppTable.TableColumnChecks>([]);

onMounted(() => {
  initialColumns.value = cloneDeep(columns.value);
});

// 重置
function handleRepossess() {
  columns.value = cloneDeep(initialColumns.value);
}

// 点击固定
function handleFixed(val: AppTable.TableColumnCheck, type: 'left' | 'right') {
  nextTick(() => {
    columns.value.forEach((item) => {
      if (item.prop === val.prop) {
        item.fixed = type;
      }
    });
  });
}
</script>

<template>
  <app-flex class="table-header" align="center" justify="space-between">
    <div class="text-16 font-600">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <app-flex>
      <slot />
      <el-dropdown trigger="click" :hide-on-click="false">
        <el-button>列设置</el-button>
        <template #dropdown>
          <div class="flex-y-center justify-between p-[2px_10px_0] border-b">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate">
              全选
            </el-checkbox>
            <el-link type="primary" :underline="false" @click="handleRepossess">
              重置
            </el-link>
          </div>
          <el-scrollbar max-height="36vh">
            <el-dropdown-menu>
              <VueDraggable v-model="columns" handle=".handle" :animation="300" draggable=".noFixed">
                <el-dropdown-item v-for="item in columns" :key="item.prop" :class="item.fixed ? '' : 'noFixed'">
                  <app-flex class="w-100%" align="center" justify="space-between">
                    <app-flex align="center" :size="2">
                      <app-icon class="handle" :class="item.fixed ? 'cursor-not-allowed' : 'cursor-move'" icon="Rank" size="16" />
                      <el-checkbox v-model="item.checked">
                        {{ item.label }}
                      </el-checkbox>
                    </app-flex>
                    <app-flex :size="2">
                      <el-tooltip content="固定到左侧">
                        <app-icon icon="icon-park-outline:to-left" size="16" @click="handleFixed(item, 'left')" />
                      </el-tooltip>
                      <el-tooltip content="固定到右侧">
                        <app-icon icon="icon-park-outline:to-right" size="16" @click="handleFixed(item, 'right')" />
                      </el-tooltip>
                    </app-flex>
                  </app-flex>
                </el-dropdown-item>
              </VueDraggable>
            </el-dropdown-menu>
          </el-scrollbar>
        </template>
      </el-dropdown>
    </app-flex>
  </app-flex>
</template>

<style scoped lang="scss">
.table-header {
  :deep(.el-button) {
    &+.el-button {
      margin-left: 0;
    }
  }
}
</style>
