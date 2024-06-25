<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui';
import { useRouteStore } from '@/stores';
import { login } from '@/api';
import { storage } from '@/utils';
import logo from '@/assets/logo.svg';

defineOptions({ name: 'Login' });

const routeStore = useRouteStore();

interface State {
  userName: string
  userPwd: string
}

const state = reactive<State>({
  userName: '',
  userPwd: '',
});

const rules: FormRules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  userPwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};

const isRemember = ref(false);
const isLoading = ref(false);

// 获取用户账号
async function getUserConfig() {
  try {
    const rss = await storage.getItem<State>('loginAccount', '');

    if (!rss)
      return;

    state.userName = rss.userName;
    state.userPwd = rss.userPwd;
    isRemember.value = true;
  }
  catch (e) {
    console.error('获取用户账号失败');
  }
}

onMounted(getUserConfig);

const formRef = ref<FormInst | null>(null);

const notification = useNotification();
// 点击登录
function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors)
      return;

    isLoading.value = true;
    try {
      if (isRemember.value) {
        await storage.setItem('loginAccount', state);
      }
      else {
        await storage.removeItem('loginAccount');
      }

      await login(state);
      await routeStore.initAuthRoute();
      notification.success({
        content: '登录成功',
      });
    }
    finally {
      isLoading.value = false;
    }
  });
}
</script>

<template>
  <div class="wh-full flex-center">
    <n-card class="w-112.5 shadow-[var(--n-box-shadow)]">
      <template #header>
        <n-space align="center">
          <n-image :width="60" :src="logo" preview-disabled />
          <h2>
            登录
          </h2>
        </n-space>
      </template>
      <n-form ref="formRef" :model="state" :rules="rules" :show-label="false">
        <n-form-item path="userName">
          <n-input v-model:value="state.userName" placeholder="请输入用户名" clearable />
        </n-form-item>
        <n-form-item path="userPwd">
          <n-input v-model:value="state.userPwd" type="password" placeholder="请输入密码" show-password-on="mousedown" clearable />
        </n-form-item>
        <n-space vertical :size="20">
          <div class="flex-y-center justify-between">
            <n-checkbox v-model:checked="isRemember">
              记住我
            </n-checkbox>
            <n-button type="primary" text>
              忘记密码?
            </n-button>
          </div>
          <n-button type="primary" size="large" :loading="isLoading" :disabled="isLoading" block @click="handleLogin">
            登录
          </n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>

</style>
