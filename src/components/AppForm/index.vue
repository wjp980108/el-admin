<script setup lang="ts">
defineOptions({ name: 'AppForm' });

withDefaults(defineProps<Props>(), {
  labelWidth: 'auto',
});

interface Props {
  labelWidth?: string | number
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
    <app-grid ref="gridRef">
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
