import type { App } from '@/stores/app/types';
import { colorInfo } from '@/constants';
import { useTheme } from '@/hooks';
import { ElMessageBox } from 'element-plus';
import { cloneDeep } from 'lodash-es';

const docEle = ref(document.documentElement);
const { isFullscreen, toggle } = useFullscreen(docEle);
const { store } = useColorMode({
  emitAuto: true,
});

function data(): App.AppState {
  return {
    collapse: false,
    transitionAnimation: 'fade-slide',
    loadFlag: true,
    themeColor: cloneDeep(colorInfo),
    size: 'default',
    asideInverted: false,
    breadcrumbShow: true,
    breadcrumbIconShow: true,
    isDark: false,
    tabStyle: 'dynamic',
    watermark: false,
  };
}

export const useAppStore = defineStore('app-store', () => {
  const state = reactive<App.AppState>(data());

  // 监听窗口大小, 自动折叠侧边栏
  const { width } = useWindowSize();

  watch(width, useDebounceFn(() => {
    state.collapse = width.value < 1200;
  }, 100));

  // 全屏状态
  const fullscreen = computed(() => isFullscreen.value);

  // 切换全屏
  const toggleFullScreen = () => {
    toggle().then();
  };

  // 刷新当前页面
  const reloadPage = async (duration = 300) => {
    state.loadFlag = false;
    await nextTick();
    if (duration) {
      setTimeout(() => {
        state.loadFlag = true;
      }, duration);
    }
    else {
      state.loadFlag = true;
    }
  };

  // 存储的主题模式
  const storeColorMode = computed(() => store.value);

  // 重置所有设置
  function handleAppReset() {
    ElMessageBox.confirm('是否重置系统设置？', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    }).then(() => {
      Object.assign(state, data());
      store.value = 'auto';
      useTheme().setColorMode(store.value);
    });
  }

  return {
    ...toRefs(state),
    fullscreen,
    toggleFullScreen,
    reloadPage,
    storeColorMode,
    handleAppReset,
  };
}, {
  persist: true,
});
