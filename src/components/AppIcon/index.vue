<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({ name: 'AppIcon' })

withDefaults(defineProps<IconProps>(), {
  size: 18,
})

interface IconProps {
  /* 图标名称 */
  icon: string
  /* 图标颜色 */
  color?: string
  /* 图标大小 */
  size?: number
  /* 图标深度 */
  depth?: 1 | 2 | 3 | 4 | 5
}
</script>

<template>
  <n-icon :size="size" :depth="depth" :color="color">
    <Icon :icon="icon!" />
  </n-icon>
</template>
