<script setup lang="ts">
defineOptions({ name: 'Wrapper' })
</script>

<template>
  <n-el class="el cursor-pointer rounded p-3" tag="div">
    <n-flex class="h-full" align="center">
      <slot />
    </n-flex>
  </n-el>
</template>

<style scoped lang="scss">
.el {
  color: var(--n-text-color);
  transition: 0.3s var(--cubic-bezier-ease-in-out);

  &:hover {
    background-color: var(--button-color-2-hover);
    color: var(--n-text-color-hover);
  }
}
</style>
