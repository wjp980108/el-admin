<script setup lang="ts">
defineOptions({ name: 'LayoutHeader' })

const options = computed(() => {
  return [
    {
      label: '个人中心',
      key: 'userCenter',

    },
    {
      type: 'divider',
      key: 'd1',
    },
    {
      label: '退出登录',
      key: 'loginOut',

    },
  ]
})
function handleSelect() {
}
</script>

<template>
  <div class="pl-2 pr-5 h-60px flex-y-center justify-between b-b b-b-solid b-b-#EFEFF5">
    <div>left</div>
    <n-space align="center">
      <span>设置</span>
      <n-dropdown
        trigger="click"
        :options="options"
        @select="handleSelect"
      >
        <n-avatar round src="https://avatars.githubusercontent.com/u/54931083?v=4" />
      </n-dropdown>
    </n-space>
  </div>
</template>

<style scoped>

</style>
