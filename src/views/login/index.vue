<script setup lang="ts">
import { useRouteStore } from '@/stores';
import { login } from '@/api';
import { useReset } from '@/hooks';

const routeStore = useRouteStore();

const [state] = useReset({
  userName: '',
  userPwd: '',
});

async function setLogin() {
  await login(state.value);
  await routeStore.initAuthRoute();
}
</script>

<template>
  <div>
    <n-input v-model:value="state.userName" />
    <n-input v-model:value="state.userPwd" type="password" />
    <n-button @click="setLogin">
      登录
    </n-button>
  </div>
</template>

<style scoped>

</style>
