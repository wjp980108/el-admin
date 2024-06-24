import { useReset } from '@/hooks';

const docEle = ref(document.documentElement);
const { isFullscreen, toggle } = useFullscreen(docEle);

type TransitionAnimation = '' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out';

interface AppState {
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

  return {
    ...toRefs(state.value),
    fullscreen,
    toggleFullScreen,
    reloadPage,
  };
});
