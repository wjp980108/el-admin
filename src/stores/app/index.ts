import { useReset } from '@/hooks'

export const useAppStore = defineStore('app', () => {
  const [state] = useReset({
    collapsed: false,
  })

  return {
    ...toRefs(state.value),
  }
})
