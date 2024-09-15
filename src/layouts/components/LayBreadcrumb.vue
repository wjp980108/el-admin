<script setup lang="ts">
import { useAppStore, useRouteStore } from '@/stores';
import { renderIcon } from '@/utils';

defineOptions({ name: 'LayBreadcrumb' });

const routeStore = useRouteStore();
const appStore = useAppStore();
</script>

<template>
  <el-breadcrumb class="flex-center" :separator-icon="renderIcon('ArrowRight')">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item of routeStore.breadcrumbs" :key="item.key" :to="item.key">
        <app-flex class="whitespace-nowrap" :size="5" align="center">
          <app-icon v-if="appStore.breadcrumbIconShow" :icon="item.icon" :size="16" />
          {{ item.label }}
        </app-flex>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
