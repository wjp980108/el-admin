<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import { NScrollbar } from 'naive-ui'
import { renderIcon } from '@/utils'
import { useTabStore } from '@/stores'

defineOptions({ name: 'TabBar' })

const tabStore = useTabStore()

const options = computed(() => {
  return [
    {
      label: '刷新',
      key: 'reload',
      icon: renderIcon('icon-park-outline:redo'),
    },
    {
      label: '关闭',
      key: 'closeCurrent',
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

// 点击外边关闭菜单
function onClickOutside() {
  dropdown.show = false
}

function handleSelect() {
}

const currentRoute = ref()

// 右击 tag 显示菜单
function onRightClickTag(e: MouseEvent, route: RouteLocationNormalized) {
  currentRoute.value = route
  nextTick().then(() => {
    dropdown.show = true
    dropdown.x = e.clientX
    dropdown.y = e.clientY
  })
}

// 判断 tag 类型
function isTagType(route: RouteLocationNormalized) {
  return route.path === tabStore.currentTabPath ? 'primary' : 'default'
}

const scroll = ref()

// 点击左侧箭头返回左侧
function onScrollLeft() {
  scroll.value!.scrollTo({ left: 0, behavior: 'smooth' })
}

// 点击右侧箭头返回右侧
function onScrollRight() {
  const scrollWidth = scroll.value!.scrollbarInstRef.containerRef.scrollWidth
  scroll.value!.scrollTo({ left: scrollWidth, behavior: 'smooth' })
}
</script>

<template>
  <div class="tab-bar relative flex-y-center p-(l9 r9)">
    <div class="absolute left-0 h-100% w-9 flex-center cursor-pointer" @click="onScrollLeft">
      <app-icon icon="mdi:chevron-double-left" :size="20" />
    </div>
    <NScrollbar ref="scroll" class="p-(2 l0.5 r0.5)" x-scrollable>
      <n-space :wrap="false">
        <template v-for="item of tabStore.tabs" :key="item.id">
          <n-tag class="cursor-pointer" :type="isTagType(item)" :bordered="false" closable @contextmenu.prevent="onRightClickTag($event, item)">
            {{ item.meta.title }}
            <template #icon>
              <app-icon :icon="item.meta.icon" />
            </template>
          </n-tag>
        </template>
      </n-space>
    </NScrollbar>
    <div class="absolute right-0 h-100% w-9 flex-center cursor-pointer" @click="onScrollRight">
      <app-icon icon="mdi:chevron-double-right" :size="20" />
    </div>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="dropdown.x"
      :y="dropdown.y"
      :options="options"
      :show="dropdown.show"
      @clickoutside="onClickOutside"
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
