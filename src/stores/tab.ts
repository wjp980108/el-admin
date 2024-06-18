import type { RouteLocationNormalized } from 'vue-router'
import { useReset } from '@/hooks'

interface TagState {
  // tab列表
  tabs: RouteLocationNormalized[]
  // 当前tag路径
  currentTabPath: string
}
export const useTabStore = defineStore('tab', () => {
  const [state] = useReset<TagState>({
    tabs: [],
    currentTabPath: '',
  })

  const hasExistTab = (path: string) => {
    const _tags = [...state.value.tabs]
    return _tags.some((item) => {
      return item.path === path
    })
  }

  // 添加tag
  const addTab = (route: RouteLocationNormalized) => {
    if (route.meta.withoutTab)
      return

    if (hasExistTab(route.path))
      return
    state.value.tabs.push(route)
  }

  // 设置当前激活的标签
  const setCurrentTab = (path: string) => {
    state.value.currentTabPath = path
  }

  return {
    ...toRefs(state.value),
    addTab,
    setCurrentTab,
  }
})
