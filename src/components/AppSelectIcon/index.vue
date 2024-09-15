<script setup lang="ts">
import {
  type APIv2CollectionResponse,
  type APIv2CollectionsList,
  fetchAllIconCollections,
  fetchIconsByCollection,
} from '@/components/AppSelectIcon/index';
import { renderIcon } from '@/utils';
import { ElInput } from 'element-plus';

defineOptions({ name: 'AppSelectIcon' });

withDefaults(defineProps<Props>(), {
  placeholder: '请选择图标',
  title: '选择图标',
});

interface Props {
  placeholder?: string
  title?: string
}

const isShow = ref(false);
const activeName = ref('all');
const iconValue = defineModel({
  type: String,
  default: '',
});

// 获取所有图标库
const allIconCollections = shallowRef<APIv2CollectionsList[]>([]);
async function getAllIconCollections() {
  const res = await fetchAllIconCollections();
  const list: APIv2CollectionsList[] = [];
  Object.entries(res).forEach(([key, value]) => {
    list.push({ ...value, key });
  });
  allIconCollections.value = list;
}

// 获取所有图标库图标
const iconsByCollection = shallowRef<APIv2CollectionResponse[]>([]);
async function fetchIconAllList(nameList: APIv2CollectionsList[]) {
  const namePromises = nameList.map(item => fetchIconsByCollection(item.key));
  const targets = await Promise.all(namePromises);
  const list: APIv2CollectionResponse[] = [];

  targets.forEach((item) => {
    list.push({
      ...item,
      icons: getVisibleIconsCorrected(item),
    });
  });
  iconsByCollection.value = list;
}

// 获取处理后的图标数据
function getVisibleIconsCorrected(iconData: APIv2CollectionResponse) {
  const icons = new Set<string>();

  // 处理未分类图标
  if (iconData.uncategorized) {
    iconData.uncategorized.forEach(icon => icons.add(`${iconData.prefix}:${icon}`));
  }

  // 处理分类图标
  if (iconData.categories) {
    Object.values(iconData.categories).forEach((category) => {
      category.forEach(icon => icons.add(`${iconData.prefix}:${icon}`));
    });
  }

  return Array.from(icons);
}

const inputRef = ref<InstanceType<typeof ElInput>>();
function handleIcon(val: string) {
  iconValue.value = val;
  isShow.value = false;
  nextTick(() => {
    inputRef.value!.blur();
  });
}

function handleShow() {
  isShow.value = true;
}

onMounted(async () => {
  await getAllIconCollections();
  await fetchIconAllList(allIconCollections.value);
});
</script>

<template>
  <ElInput ref="inputRef" v-model="iconValue" :placeholder clearable @focus="handleShow" @click="handleShow">
    <template #append>
      <el-button :icon="renderIcon(iconValue, { size: 18 })" @focus="handleShow" @click="handleShow" />
    </template>
  </ElInput>
  <app-popup v-model="isShow" class="app-icon-popup" :title width="650" :show-footer="false" append-to-body>
    <el-tabs v-model="activeName" class="h-470" tab-position="left">
      <el-tab-pane label="All" name="all">
        <TabContent v-if="activeName === 'all'" :data="iconsByCollection" :active-name="activeName" @select-icon="handleIcon" />
      </el-tab-pane>
      <el-tab-pane v-for="item of allIconCollections" :key="item.key" :label="item.name" :name="item.name">
        <TabContent v-if="activeName === item.name" :data="iconsByCollection" :active-name="activeName" @select-icon="handleIcon" />
      </el-tab-pane>
    </el-tabs>
  </app-popup>
</template>

<style lang="scss">
.app-icon-popup {
  .el-dialog__body {
    .el-scrollbar {
      .dialog-scrollbar-view {
        padding: 10px 5px 10px 10px !important;

        .el-tabs {
          --el-tabs-header-height: 30px;

          .el-tabs__header {
            .el-tabs__nav-wrap {
              &.is-scrollable {
                padding: 25px 0;

                .el-tabs__nav-prev, .el-tabs__nav-next {
                  height: 25px;
                  line-height: 25px;
                }
                .el-tabs__nav-scroll {
                  .el-tabs__nav {
                    .el-tabs__item {
                      padding: 0 10px 0 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
