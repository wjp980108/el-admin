import type { RouteLocationNormalized } from 'vue-router'
import type { ToRef, UnwrapRef } from 'vue'
import { useReset } from '@/hooks'
import { router } from '@/router'

interface TabState {
  // tab列表
  tabs: RouteLocationNormalized[]
  // 当前tag路径
  currentTabPath: string
}

// 定义 useTabStore 的返回类型
interface TabStore {
  currentTabPath: ToRef<UnwrapRef<TabState>['currentTabPath']>
  addTab: (route: RouteLocationNormalized) => void
  // closeRightTabs: (path: string) => void
  // setCurrentTab: (path: string) => void
  // closeAllTabs: () => void
  // closeLeftTabs: (path: string) => void
  // tabs: ToRef<UnwrapRef<TabState>['tabs']>
  // closeOtherTabs: (path: string) => void
  closeTab: (path: string) => void
}

export const useTabStore = defineStore('tab', (): TabStore => {
  const [state] = useReset<TabState>({
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

  // 关闭当前 tag
  const closeTab = async (path: string) => {
    // 获取关闭的标签索引
    const index = state.value.tabs.findIndex(item => item.path === path)

    // 如果关闭的是当前标签
    if (path === state.value.currentTabPath) {
      // 如果后边有标签，就跳转到后一个标签
      if (state.value.tabs[index + 1]) {
        await router.push(state.value.tabs[index + 1].path)
        state.value.tabs = state.value.tabs.filter((item) => {
          return item.path !== path
        })
      }
      else {
        await router.push(state.value.tabs[index - 1].path)
        state.value.tabs = state.value.tabs.filter((item) => {
          return item.path !== path
        })
      }
    }

    // // 如果动态标签大于一个,才会标签跳转
    // if (state.value.tabs.length > 1) {
    //   // 获取关闭的标签索引
    //   const index = state.value.tabs.findIndex(item => item.path === path)
    //   const isLast = index + 1 === state.value.tabs.length
    //   // 如果是关闭的当前页面，路由跳转到原先标签的后一个标签
    //   if (state.value.currentTabPath === path && !isLast) {
    //     // 跳转到后一个标签
    //     await router.push(state.value.tabs[index + 1].path)
    //   }
    //   if (state.value.currentTabPath === path && isLast) {
    //     // 已经是最后一个了，就跳转前一个
    //     await router.push(state.value.tabs[index - 1].path)
    //   }
    // }
    // // 删除标签
    // state.value.tabs = state.value.tabs.filter((item) => {
    //   return item.path !== path
    // })
    // // 删除后如果清空了，就跳转到默认首页
    // if (state.value.tabs.length - 1 === 0)
    //   await router.push('/')
    // if (path === state.value.currentTabPath)
  }

  // // 关闭除了当前 tag 的其他 tag
  // const closeOtherTabs = (path: string) => {
  //
  // }
  //
  // // 关闭当前 tag 左侧的全部 tag
  // const closeLeftTabs = (path: string) => {
  //
  // }
  //
  // // 关闭当前 tag 右侧的全部 tag
  // const closeRightTabs = (path: string) => {
  //
  // }
  //
  // // 关闭全部 tag
  // const closeAllTabs = () => {
  //
  // }
  //
  // // 设置当前激活的标签
  // const setCurrentTab = (path: string) => {
  //   state.value.currentTabPath = path
  // }

  return {
    ...toRefs(state.value),
    addTab,
    closeTab,
    // closeOtherTabs,
    // closeLeftTabs,
    // closeRightTabs,
    // closeAllTabs,
    // setCurrentTab,
  }
})
