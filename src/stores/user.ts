import { useReset } from '@/hooks';
import { userInfo } from '@/api';

export const useUserStore = defineStore('user', () => {
  const [state] = useReset({
    userInfo: {},
    accessToken: '',
  });

  // 设置 token
  const setToken = async (token: string) => {
    state.value.accessToken = token;
  };

  // 清空 token
  const removeToken = async () => {
    state.value.accessToken = '';
  };

  // 获取用户信息
  const getUserInfo = async () => {
    state.value.userInfo = await userInfo();
  };

  return {
    ...toRefs(state.value),
    setToken,
    removeToken,
    getUserInfo,
  };
}, {
  persist: true,
});
