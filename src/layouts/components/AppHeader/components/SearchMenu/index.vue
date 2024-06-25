<script setup lang="ts">
import { useRouteStore } from '@/stores';

defineOptions({ name: 'SearchMenu' });

const showModal = defineModel<boolean>('show', { required: true });

const routeStore = useRouteStore();

// 搜索菜单的名字
const menuName = ref('');

// 获取菜单信息
const getMenus = computed(() => {
  if (!menuName.value)
    return [];
  return routeStore.rowRoutes.filter(item => item.title.includes(menuName.value));
});

// 是否按下了上键或下键（用于解决和 mouseenter 事件的冲突）
const isPressUpOrDown = ref(false);

// 当前选中的菜单
const activeMenuPath = ref('');

// 鼠标划入
function onMouseenter(path: string) {
  if (isPressUpOrDown.value)
    return;

  activeMenuPath.value = path;
}

const router = useRouter();

// 关闭回调
function handleClose() {
  menuName.value = '';
  activeMenuPath.value = '';
  showModal.value = false;
}

// 按下回车键或点击
function handleKeyEnter() {
  if (!activeMenuPath.value)
    return;

  router.push(activeMenuPath.value);
  handleClose();
}

const scrollbarRef = ref();

// 根据下标位置进行滚动
function scrollTo(index: number) {
  // 保持2个选项在可视区域内,2个后开始滚动
  const keepIndex = 2;
  // 单个元素的高度，包括了元素的gap和容器的padding
  const elHeight = 63;
  const distance = index * elHeight > keepIndex * elHeight ? index * elHeight - keepIndex * elHeight : 0;
  scrollbarRef.value!.scrollTo({ top: distance });
}

// 按下上键
function handleKeyUp() {
  const { length } = getMenus.value;

  if (!length)
    return;

  isPressUpOrDown.value = true;

  // 获取该菜单第一次出现的位置
  const index = getMenus.value.findIndex(item => item.path === activeMenuPath.value);

  if (index === 0) {
    // 获取最后一个菜单
    activeMenuPath.value = getMenus.value[length - 1].path;
    scrollTo(length - 1);
  }
  else {
    // 获取上一个菜单
    activeMenuPath.value = getMenus.value[index - 1].path;
    scrollTo(index - 1);
  }
}

// 按下下键
function handleKeyDown() {
  const { length } = getMenus.value;

  if (!length)
    return;

  isPressUpOrDown.value = true;

  // 获取该菜单第一次出现的位置
  const index = getMenus.value.findIndex(item => item.path === activeMenuPath.value);

  if (index === length - 1) {
    // 获取第一个菜单
    activeMenuPath.value = getMenus.value[0].path;
    scrollTo(0);
  }
  else {
    // 获取下一个菜单
    activeMenuPath.value = getMenus.value[index + 1].path;
    scrollTo(index + 1);
  }
}

// 松开上键或下键
function handleKeyUpDown() {
  isPressUpOrDown.value = false;
}

// 注册快捷键
function registerShortcut() {
  onKeyStroke('Enter', handleKeyEnter);
  onKeyStroke('ArrowUp', handleKeyUp);
  onKeyStroke('ArrowDown', handleKeyDown);
  onKeyStroke(['ArrowUp', 'ArrowDown'], handleKeyUpDown, { eventName: 'keyup' });
  onKeyStroke('k', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      showModal.value = !showModal.value;
    }
  });
}

registerShortcut();
</script>

<template>
  <n-modal
    v-model:show="showModal"
    class="m-t-5vh w-125"
    preset="card"
    size="small"
    :closable="false"
    :segmented="{
      content: true,
      footer: true,
    }"
    @after-leave="handleClose"
  >
    <template #header>
      <n-input v-model:value="menuName" placeholder="搜索菜单" size="large" clearable>
        <template #prefix>
          <app-icon icon="icon-park-outline:search" />
        </template>
      </n-input>
    </template>
    <n-el v-if="getMenus.length">
      <div class="text-[var(--primary-color)]">
        搜索结果
      </div>
      <n-scrollbar ref="scrollbarRef" class="max-h-100">
        <n-flex :size="5" vertical>
          <n-card
            v-for="item of getMenus"
            :key="item.path"
            :class="{ 'text-[var(--base-color)] bg-[var(--primary-color-hover)!important]': item.path === activeMenuPath }"
            @mouseenter="onMouseenter(item.path)"
            @click="handleKeyEnter"
          >
            <n-flex justify="space-between" align="center">
              <span>{{ item.title }}</span>
              <app-icon v-show="item.path === activeMenuPath" icon="fluent:arrow-enter-left-24-regular" color="var(--base-color)" />
            </n-flex>
          </n-card>
        </n-flex>
      </n-scrollbar>
    </n-el>
    <n-empty v-else description="暂无搜索结果" />
    <template #footer>
      <n-space :size="15">
        <n-flex :size="5">
          <div class="commands">
            ctrl
          </div>
          <div class="commands" style="font-size: 10px">
            k
          </div>
          <span>打开/关闭搜索面板</span>
        </n-flex>
        <n-flex :size="5">
          <div class="commands">
            <app-icon icon="fluent:arrow-enter-left-24-regular" />
          </div>
          <span>确认</span>
        </n-flex>
        <n-flex :size="5">
          <div class="commands">
            <app-icon icon="icon-park-outline:arrow-down" />
          </div>
          <div class="commands">
            <app-icon icon="icon-park-outline:arrow-up" />
          </div>
          <span>切换</span>
        </n-flex>
        <n-flex :size="5">
          <div class="commands" style="font-size: 10px">
            esc
          </div>
          <span>关闭</span>
        </n-flex>
      </n-space>
    </template>
  </n-modal>
</template>
