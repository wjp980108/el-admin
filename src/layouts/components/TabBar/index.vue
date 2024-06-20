<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { renderIcon } from '@/utils'
import { useAppStore, useTabStore } from '@/stores'

defineOptions({ name: 'TabBar' })

const router = useRouter()
const route = useRoute()

const options = computed(() => {
  return [
    {
      label: '刷新',
      key: 'reload',
      icon: renderIcon('icon-park-outline:redo'),
    },
    {
      label: '关闭',
      key: 'close',
      icon: renderIcon('icon-park-outline:close'),
    },
    {
      label: '关闭其他',
      key: 'closeOther',
      icon: renderIcon('icon-park-outline:delete-four'),
    },
    {
      label: '关闭左侧',
      key: 'closeLeft',
      icon: renderIcon('icon-park-outline:to-left'),
    },
    {
      label: '关闭右侧',
      key: 'closeRight',
      icon: renderIcon('icon-park-outline:to-right'),
    },
    {
      label: '关闭全部',
      key: 'closeAll',
      icon: renderIcon('icon-park-outline:fullwidth'),
    },
  ]
})
const dropdown = reactive({
  show: false,
  x: 0,
  y: 0,
})

const notification = useNotification()

function handleClickTab(item: RouteLocationNormalized) {
  if (item.path === route.path) {
    return notification.warning({
      content: '说点啥呢',
      meta: '想不出来',
      duration: 2500,
      keepAliveOnHover: true,
    })
  }
  router.push(item.path)
}

// 点击外边关闭菜单
function handleClickOutside() {
  dropdown.show = false
}

const currentRoute = ref()

const appStore = useAppStore()
const tabStore = useTabStore()

// 点击右击菜单
function handleSelect(key: string) {
  dropdown.show = false
  const actions: AnyObj = {
    reload: appStore.reloadPage,
    close: () => tabStore.closeTab(currentRoute.value!.path),
    closeOther: () => tabStore.closeOtherTabs(currentRoute.value.path),
    closeLeft: () => tabStore.closeLeftTabs(currentRoute.value.path),
    closeRight: () => tabStore.closeRightTabs(currentRoute.value.path),
    closeAll: tabStore.closeAllTabs,
  }
  actions[key]()
}

// 右击 tab 显示菜单
function handleRightClickTab(e: MouseEvent, route: RouteLocationNormalized) {
  currentRoute.value = route
  nextTick().then(() => {
    dropdown.show = true
    dropdown.x = e.clientX
    dropdown.y = e.clientY
  })
}

// 判断 tab 类型
function isTabType(route: RouteLocationNormalized) {
  return route.path === tabStore.currentTabPath ? 'primary' : 'default'
}

// 判断是否可以关闭
function isClosable(route: RouteLocationNormalized) {
  return route.path !== import.meta.env.VITE_HOME_PATH
}

const scroll = ref()

// 点击左侧箭头返回左侧
function handleScrollLeft() {
  scroll.value!.scrollTo({ left: 0, behavior: 'smooth' })
}

// 点击右侧箭头返回右侧
function handleScrollRight() {
  const scrollWidth = scroll.value!.scrollbarInstRef.containerRef.scrollWidth
  scroll.value!.scrollTo({ left: scrollWidth, behavior: 'smooth' })
}
</script>

<template>
  <div class="tab-bar relative h-11 flex-y-center p-(l-12.5 r-12.5)">
    <!--    <div class="absolute left-0 h-100% w-9 flex-center cursor-pointer" @click="handleScrollLeft"> -->
    <!--      <app-icon icon="mdi:chevron-double-left" :size="20" /> -->
    <!--    </div> -->
    <n-button class="absolute left-1 h-100%" :bordered="false" @click="handleScrollLeft">
      <template #icon>
        <app-icon icon="mdi:chevron-double-left" :size="20" />
      </template>
    </n-button>
    <n-scrollbar ref="scroll" class="p-(2 l-0.5 r-0.5)" x-scrollable>
      <n-space :wrap="false">
        <template v-for="item of tabStore.tabs" :key="item.id">
          <n-tag
            class="cursor-pointer"
            :type="isTabType(item)"
            :bordered="false"
            :closable="isClosable(item)"
            @click="handleClickTab(item)"
            @contextmenu.prevent="handleRightClickTab($event, item)"
            @close="tabStore.closeTab(item.path)"
          >
            {{ item.meta.title }}
            <template #icon>
              <app-icon :icon="item.meta.icon" />
            </template>
          </n-tag>
        </template>
      </n-space>
    </n-scrollbar>
    <!--    <div class="absolute right-0 h-100% w-9 flex-center cursor-pointer" @click="handleScrollRight"> -->
    <!--      <app-icon icon="mdi:chevron-double-right" :size="20" /> -->
    <!--    </div> -->
    <n-button class="absolute right-1 h-100%" :bordered="false" @click="handleScrollRight">
      <template #icon>
        <app-icon icon="mdi:chevron-double-right" :size="20" />
      </template>
    </n-button>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="dropdown.x"
      :y="dropdown.y"
      :options="options"
      :show="dropdown.show"
      @clickoutside="handleClickOutside"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped lang="scss">
.tab-bar {
  :deep(.n-scrollbar-rail--horizontal) {
    display: none;
  }

  .tab-box {
    height: 32px;
    padding: 6px;
    border-radius: 3px;
    margin-right: 6px;
    cursor: pointer;
  }
}
</style>
