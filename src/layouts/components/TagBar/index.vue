<script setup lang="ts">
import { useTagStore } from '@/stores'
import { renderIcon } from '@/utils'

defineOptions({ name: 'TagBar' })

const tagStore = useTagStore()

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

const showDropdown = ref(false)

const x = ref(0)

const y = ref(0)

function onClickOutside() {
  showDropdown.value = false
}

function handleSelect() {

}
</script>

<template>
  <div class="p-(2 2)">
    <n-space>
      <template v-for="item of tagStore.tags" :key="item.id">
        <n-tag :bordered="false" checkable>
          {{ item.meta.title }}
        </n-tag>
      </template>
    </n-space>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="x"
      :y="y"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickOutside"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>

</style>
