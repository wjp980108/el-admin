<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { login } from '@/api';
import avatar from '@/assets/login/avatar.svg';
import bg from '@/assets/login/bg.png';
import illustration from '@/assets/login/illustration.svg';
import { Constant } from '@/constants';
import { useRouteStore, useUserStore } from '@/stores';
import { renderIcon, storage } from '@/utils';
import dayjs from 'dayjs';

defineOptions({ name: 'Login' });

const loading = ref(false);
const checked = ref(false);
const disabled = ref(false);

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};

interface State {
  username: string
  password: string
}

const state = reactive({
  username: 'admin',
  password: '123456',
});

// 获取用户账号
async function getUserConfig() {
  try {
    const rss = await storage.getItem<State>(Constant.LoginAccount, '');

    if (!rss)
      return;

    state.username = rss.username;
    state.password = rss.password;
    checked.value = true;
  }
  catch (e) {
    console.error(e);
  }
}

onMounted(getUserConfig);

const userStore = useUserStore();
const routeStore = useRouteStore();
const router = useRouter();
const formRef = ref<FormInstance | null>(null);

// 点击登录
function handleLogin() {
  formRef.value?.validate(async (valid) => {
    if (!valid)
      return;

    loading.value = true;
    disabled.value = true;
    try {
      if (checked.value) {
        await storage.setItem(Constant.LoginAccount, state);
      }
      else {
        await storage.removeItem(Constant.LoginAccount);
      }

      const res = await login(state);
      userStore.setToken(res.data.token);
      await routeStore.initAuthRoute();
      router.push('/').then(() => {
        ElNotification.success({
          title: '登录成功',
          message: '欢迎回来',
          duration: 2500,
        });
      }).finally(() => {
        disabled.value = false;
      });
    }
    finally {
      loading.value = false;
      disabled.value = false;
    }
  });
}

// 回车登录
useEventListener(document, 'keypress', ({ code }) => {
  if (['Enter', 'NumpadEnter'].includes(code) && !disabled.value && !loading.value)
    handleLogin();
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" alt="">
    <div class="flex-c absolute right-5 top-3">
      <app-theme-switch />
    </div>
    <div class="login-container">
      <div class="img">
        <img :src="illustration" alt="">
      </div>
      <div class="login-box">
        <div class="login-form">
          <img class="avatar" :src="avatar" alt="">
          <h2 class="outline-none">
            运营平台
          </h2>
          <el-form ref="formRef" :model="state" :rules="rules" size="large">
            <el-form-item prop="username">
              <el-input v-model="state.username" clearable placeholder="账号" :prefix-icon="renderIcon('UserFilled')" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="state.password" placeholder="密码" :prefix-icon="renderIcon('bxs:lock')" clearable
                show-password
              />
            </el-form-item>
            <el-form-item>
              <div class="h-[20px] w-full flex items-center justify-between">
                <el-checkbox v-model="checked">
                  记住我
                </el-checkbox>
                <el-link type="primary" :underline="false">
                  &nbsp;忘记密码？
                </el-link>
              </div>
              <el-button class="mt-16 w-full" type="primary" size="default" :loading :disabled @click="handleLogin">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-12 w-full flex-center text-14 text-[rgba(0,0,0,0.6)] line-height-14 dark:text-[rgba(220,220,242,0.8)]"
    >
      Copyright © 2024-{{ dayjs().year() }}
      <el-link href="https://yserp.cc/#/home" target="_blank" :underline="false">
        &nbsp;智选云商
      </el-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wave {
  position: fixed;
  height: 100%;
  width: 80%;
  left: 0;
  bottom: 0;
}

.login-container {
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;

  .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;

    img {
      width: 500px;
    }
  }

  .login-box {
    display: flex;
    align-items: center;
    text-align: center;
    overflow: hidden;

    .login-form {
      width: 360px;

      .avatar {
        width: 350px;
        height: 80px;
      }

      h2 {
        text-transform: uppercase;
        margin: 15px 0;
        color: #999;
        font:
          bold 200% Consolas,
          Monaco,
          monospace;
      }

    }
  }
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;

    .img {
      img {
        width: 360px;
      }
    }

    .login-form {
      width: 290px;

      .avatar {
        width: 280px;
        height: 80px;
      }

      h2 {
        font-size: 2.4rem;
        margin: 8px 0;
      }
    }
  }
}

@media screen and (max-width: 968px) {
  .wave {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;

    .img {
      display: none;
    }

    .login-box {
      justify-content: center;
    }
  }
}
</style>
