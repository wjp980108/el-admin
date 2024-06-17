import { useReset } from '@/hooks'

const docEle = ref(document.documentElement)
const { isFullscreen, toggle } = useFullscreen(docEle)

interface AppState {
  // 侧边栏是否折叠
  collapsed: boolean
  // 菜单字体大小
  menuFontSize: number
}
export const useAppStore = defineStore('app', () => {
  const [state] = useReset<AppState>({
    collapsed: false,
    menuFontSize: 14,
  })
  // 全屏状态
  const fullscreen = computed(() => isFullscreen.value)

  // 切换全屏
  const toggleFullScreen = () => {
    toggle().then()
  }

  return {
    ...toRefs(state.value),
    fullscreen,
    toggleFullScreen,
  }
})
