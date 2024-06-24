<script setup lang="ts">
defineOptions({ name: 'NaiveProvider' });
</script>

<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider :max="3">
        <n-message-provider>
          <slot />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<style scoped></style>
