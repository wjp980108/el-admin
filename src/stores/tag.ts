import type { RouteLocationNormalized } from 'vue-router'
import { useReset } from '@/hooks'

interface TagState {
  // tag列表
  tags: RouteLocationNormalized[]
  // 当前tag路径
  currentTagPath: string
}
export const useTagStore = defineStore('tag', () => {
  const [state] = useReset<TagState>({
    tags: [],
    currentTagPath: '',
  })

  const hasExistTag = (path: string) => {
    const _tags = [...state.value.tags]
    return _tags.some((item) => {
      return item.path === path
    })
  }

  // 添加tag
  const addTag = (route: RouteLocationNormalized) => {
    if (route.meta.withoutTag)
      return

    if (hasExistTag(route.path))
      return
    state.value.tags.push(route)
  }

  return {
    ...toRefs(state.value),
    addTag,
  }
})
