<script setup lang="ts">
import { renderIcon } from '@/utils'

defineOptions({ name: 'AppUser' })

const userOptions = [
  {
    label: '个人中心',
    key: 'userCenter',
    icon: renderIcon('icon-park-outline:user'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '修改密码',
    key: 'editPassword',
    icon: renderIcon('teenyicons:password-outline'),
  },
  {
    type: 'divider',
    key: 'd1',
  },
  {
    label: '退出登录',
    key: 'loginOut',
    icon: renderIcon('icon-park-outline:logout'),
  },
]

function handleSelect() {
}
</script>

<template>
  <n-dropdown trigger="click" :options="userOptions" @select="handleSelect">
    <n-avatar round src="https://avatars.githubusercontent.com/u/54931083?v=4" />
  </n-dropdown>
</template>
