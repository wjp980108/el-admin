import { useReset } from '@/hooks';

const docEle = ref(document.documentElement);
const { isFullscreen, toggle } = useFullscreen(docEle);
const { system, store } = useColorMode({
  emitAuto: true,
});

type TransitionAnimation = '' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out';

interface Loading {
  // 是否显示加载中
  loadingShow: boolean
  // 加载中文本
  loadingText?: string
}

interface AppState extends Loading {
  // 侧边栏是否折叠
  collapsed: boolean
  // 菜单字体大小
  menuFontSize: number
  // 过渡动画
  transitionAnimation: TransitionAnimation
  // 页面重载状态
  loadFlag: boolean
}

export const useAppStore = defineStore('app', () => {
  const [state] = useReset<AppState>({
    collapsed: false,
    menuFontSize: 14,
    transitionAnimation: 'fade-slide',
    loadFlag: true,
    loadingShow: false,
    loadingText: '',
  });
  // 全屏状态
  const fullscreen = computed(() => isFullscreen.value);

  // 切换全屏
  const toggleFullScreen = () => {
    toggle().then();
  };

  // 刷新当前页面
  const reloadPage = async (duration = 300) => {
    state.value.loadFlag = false;
    await nextTick();
    if (duration) {
      setTimeout(() => {
        state.value.loadFlag = true;
      }, duration);
    }
    else {
      state.value.loadFlag = true;
    }
  };

  // 设置加载中
  const setLoading = (options: Loading) => {
    state.value.loadingShow = options.loadingShow;
    state.value.loadingText = options.loadingText;
  };

  // 存储颜色模式
  const storeColorMode = computed(() => store.value);
  // 当前使用的颜色模式
  const colorMode = computed(() => {
    return store.value === 'auto' ? system.value : store.value;
  });

  const setColorMode = (mode: 'light' | 'dark' | 'auto') => {
    store.value = mode;
  };

  return {
    ...toRefs(state.value),
    fullscreen,
    toggleFullScreen,
    reloadPage,
    setLoading,
    storeColorMode,
    colorMode,
    setColorMode,
  };
});
