<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
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

// 点击外边关闭菜单
function onClickOutside() {
  dropdown.show = false
}

function handleSelect() {
}
</script>

<template>
  <div class="tab-bar flex-y-center p-(2 l-8 r-8)">
    <div class="absolute left-1 h-9 w-9 flex-y-center">
      <app-icon icon="mdi:chevron-double-left" :size="20" />
    </div>
    <div class="overflow-x-auto">
      <template v-for="item of tabStore.tabs" :key="item.id">
        <div class="tab-box flex-y-center" @contextmenu.prevent="onRightClickTag($event, item)">
          <span>{{ item.meta.title }}</span>
          <div>
            <span>{{ item.meta.title }}</span>
          </div>
          <div class="flex-y-center">
            <app-icon icon="icon-park-outline:close" :size="12" />
          </div>
        </div>
      </template>
    </div>
    <div class="absolute right-1 h-9 w-9 flex-y-center">
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
  position: relative;

  .tab-box {
    background-color: #eee;
    height: 32px;
    padding: 6px;
    border-radius: 3px;
    margin-right: 6px;
    cursor: pointer;
    //display: inline-block;
  }
}
</style>
