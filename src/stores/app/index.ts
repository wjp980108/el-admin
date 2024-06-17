import { useReset } from '@/hooks'

const docEle = ref(document.documentElement)
const { isFullscreen, toggle } = useFullscreen(docEle)

export const useAppStore = defineStore('app', () => {
  const [state] = useReset({
    collapsed: false,
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
