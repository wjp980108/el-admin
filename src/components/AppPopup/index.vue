<script setup lang="ts">
import { computed, type PropType } from 'vue';

defineOptions({ name: 'AppPopup' });

const props = defineProps({
  title: {
    type: String,
    default: '弹窗',
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  height: {
    type: [String, Number],
    default: '',
  },
  maxHeight: {
    type: [String, Number],
    default: 500,
  },
  headerBorder: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: '保存',
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showConfirmButton: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  showCancelButton: {
    type: Boolean,
    default: true,
  },
  buttonReverse: {
    type: Boolean,
    default: false,
  },
  footerPosition: {
    type: String as PropType<'left' | 'center' | 'right' | 'space-between'>,
    default: 'right',
  },
});

const emit = defineEmits(['confirm', 'cancel']);

const isPopup = defineModel({
  type: Boolean,
  default: false,
});

// 是否是翻转
const isReverse = computed(() => {
  return props.showCancelButton && props.buttonReverse;
});

// 点击确认
function onConfirm() {
  emit('confirm');
}

// 点击取消
function onCancel() {
  isPopup.value = false;
  emit('cancel');
}

onMounted(() => {
  // 头部是否需要边框线
  const border = props.headerBorder ? '1px' : '0';
  document.documentElement.style.setProperty('--app-popup-header-border', border);

  // 底部按钮位置
  document.documentElement.style.setProperty('--app-popup-footer-position', props.footerPosition);
});
</script>

<template>
  <el-dialog
    v-model="isPopup"
    class="app-popup"
    v-bind="$attrs"
    :close-on-click-modal="closeOnClickModal"
    :title :width :draggable destroy-on-close
    @close="onCancel"
  >
    <template #header>
      <slot name="header" />
    </template>
    <template #default>
      <el-scrollbar view-class="dialog-scrollbar-view" :height :max-height="maxHeight">
        <slot />
      </el-scrollbar>
    </template>
    <template v-if="showFooter" #footer>
      <slot name="footer">
        <el-button v-if="showConfirmButton" :class="{ 'button-reverse': isReverse }" type="primary" @click="onConfirm">
          {{ confirmText }}
        </el-button>
        <el-button v-if="showCancelButton" @click="onCancel">
          {{ cancelText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-dialog.app-popup {
  padding: 0;

  .el-dialog__header {
    height: 45px;
    padding: 10px;
    border-bottom: var(--app-popup-header-border) solid var(--el-border-color);
  }

  .el-dialog__body {
    .el-scrollbar {
      .dialog-scrollbar-view {
        padding: 10px 15px;
      }
    }
  }

  .el-dialog__footer {
    display: flex;
    justify-content: var(--app-popup-footer-position);
    padding: 10px;
    box-shadow: var(--el-box-shadow);

    .button-reverse {
      order: 1;
      margin-left: 12px;

      & + .el-button {
        margin-left: 0;
      }
    }
  }
}
</style>
