<script setup lang="ts">
import type { FormSetupProps } from 'naive-ui/es/form/src/Form';

defineOptions({ name: 'TableSearch' });

const props = withDefaults(defineProps<FormSetupProps>(), {
  inline: true,
  labelPlacement: 'left',
  showLabel: true,
  showFeedback: true,
});

const emits = defineEmits(['reset', 'search']);

const collapsed = ref(false);
const collapsedIcon = computed(() => collapsed.value ? 'icon-park-outline:down' : 'icon-park-outline:up');
</script>

<template>
  <n-form v-bind="props">
    <n-grid cols="1 s:2 m:2 l:3 xl:5 2xl:5" responsive="screen" item-responsive x-gap="12" :collapsed>
      <slot />
      <slot name="operate">
        <n-form-item-gi span="1" suffix>
          <n-flex justify="end" class="w-full">
            <n-button type="primary" @click="emits('search')">
              搜索
            </n-button>
            <n-button @click="emits('reset')">
              重置
            </n-button>
            <n-button icon-placement="right" text @click="collapsed = !collapsed">
              <template #icon>
                <app-icon :icon="collapsedIcon" />
              </template>
              {{ collapsed ? '展开' : '收起' }}
            </n-button>
          </n-flex>
        </n-form-item-gi>
      </slot>
    </n-grid>
  </n-form>
</template>

<style scoped>

</style>
