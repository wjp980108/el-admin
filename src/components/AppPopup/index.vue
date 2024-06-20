<script setup lang="ts">
defineOptions({ name: 'AppPopup' })

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: '弹窗',
  positiveText: '确定',
  negativeText: '取消',
  width: 175,
  height: '',
  maxHeight: 100,
})
const emits = defineEmits(['update:show', 'close', 'submit'])

const showModal = computed({
  get: () => props.show,
  set: (val: boolean) => {
    emits('update:show', val)
  },
})

// 弹窗样式
const popupStyle = computed(() => {
  // 公式：1px / 16px / 4单位 = 0.015625rem
  const unitList = ['px', 'vw', '%']
  const widthIncludesUnit = unitList.some(unit => props.width.toString().includes(unit))

  if (widthIncludesUnit) {
    return `width: ${props.width}`
  }

  return `width: ${Number(props.width) / 4}rem`
})

const contentStyle = computed(() => {
  // 公式：1px / 16px / 4单位 = 0.015625rem
  const unitList = ['px', 'vh', '%']
  let height = props.height && `height: ${Number(props.height) / 4}rem`
  const heightIncludesUnit = unitList.some(unit => props.height.toString().includes(unit))

  if (heightIncludesUnit) {
    height = `max-height: ${props.height}`
  }

  let maxHeight = props.maxHeight && `max-height: ${Number(props.maxHeight) / 4}rem`
  const maxHeightIncludesUnit = unitList.some(unit => props.maxHeight.toString().includes(unit))

  if (maxHeightIncludesUnit) {
    maxHeight = `max-height: ${props.maxHeight}`
  }

  return [height, maxHeight]
})

interface Props {
  // 是否显示弹窗
  show: boolean
  // 弹窗标题
  title?: string
  // 确定按钮文本
  positiveText?: string
  // 取消按钮文本
  negativeText?: string
  // 弹窗宽度（使用的是 unocss 单位）
  width?: string | number
  // 弹窗内容高度（使用的是 unocss 单位）
  height?: string | number
  // 弹窗内容最大高度（使用的是 unocss 单位）
  maxHeight?: string | number
}

// 弹窗拖拽，因存在性能问题，暂时不使用
// const obj = ref({})
//
// function handleAfterEnterer() {
//   obj.value = useDraggable(document.querySelector('.app-popup'), {
//     initialValue: { x: 0, y: 0 },
//   })
// }

// 点击取消按钮
function handleClose() {
  showModal.value = false
  emits('close')
}

// 点击取消按钮
function handleSubmit() {
  emits('submit')
}
</script>

<!-- :style="[{ -->
<!-- transform: `translate(${obj.x}px, ${obj.y}px)`, -->
<!-- }, popupStyle]" -->
<template>
  <n-modal
    v-model:show="showModal"
    class="app-popup"
    header-class="popup-header"
    content-style="padding-right: 0.375rem"
    :style="popupStyle"
    preset="card"
    v-bind="$attrs"
    size="small"
    :segmented="{
      content: true,
      footer: true,
    }"
    :auto-focus="false"
  >
    <template #header>
      <slot name="header">
        {{ title }}
      </slot>
    </template>
    <n-scrollbar class="pr-5" :style="contentStyle">
      <slot />
    </n-scrollbar>
    <template #footer>
      <slot name="footer">
        <n-space justify="end">
          <n-button @click="handleClose">
            {{ negativeText }}
          </n-button>
          <n-button type="primary" @click="handleSubmit">
            {{ positiveText }}
          </n-button>
        </n-space>
      </slot>
    </template>
  </n-modal>
</template>

<style lang="scss">
.popup-header {
  //user-select: none;
  //cursor: move;
}
</style>
