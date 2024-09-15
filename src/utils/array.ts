import type { Ref } from 'vue';
import { cloneDeep } from 'lodash-es';

/**
 * 将具有层级关系的对象的平面数组转换为树形结构。
 * 每个对象必须具有 'id' 和 'parentId' 属性，其中 'parentId' 指向其父对象的 'id'。
 * 如果 'parentId' 不存在或无效，则该对象被视为根节点。
 * @param arr - 输入的平面数组，每个对象应包含 'id' 和 'parentId'。
 * @returns 返回树形结构的数组，每个节点包含 'children' 属性（如果有子节点的话）。
 */
export function arrayToTree(arr: any[]) {
  const _arr = cloneDeep(arr);
  const res: any = [];
  const map = new Map();
  _arr.forEach((item) => {
    map.set(item.id, item);
  });
  _arr.forEach((item) => {
    const parent = item.parentId && map.get(item.parentId);
    if (parent) {
      if (parent?.children)
        parent.children.push(item);
      else
        parent.children = [item];
    }
    else {
      res.push(item);
    }
  });
  return res;
}

/**
 * 根据指定键同步两个数组。此函数将更新原始数组以匹配新数组，添加新项，更新现有项，删除不在新数组中的项。
 *
 * @param  originalList - 包含原始对象数组的 Vue Ref 对象。
 * @param  newList - 与原始数组同步的新对象数组。
 * @param  key - 用于识别数组中唯一项目的键。此键应对每个项目唯一。
 *
 * @example
 * const originalItems = ref([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
 * const newItems = [{ id: 2, name: 'Robert' }, { id: 3, name: 'Charlie' }];
 * syncArraysWithKey(originalItems, newItems, 'id');
 * // originalItems 将变为 [{ id: 2, name: 'Robert' }, { id: 3, name: 'Charlie' }]
 */
export function syncArraysWithKey<T>(originalList: Ref<T[]>, newList: T[], key: keyof T) {
  const newItemsMap = new Map(newList.map(item => [item[key], item]));
  const updatedItemsMap = new Map(originalList.value.map(item => [item[key], item]));

  // 删除原始列表中不再出现的项
  originalList.value.forEach((item) => {
    if (!newItemsMap.has(item[key])) {
      updatedItemsMap.delete(item[key]);
    }
  });

  // 添加或更新原始列表中的项
  newList.forEach((item) => {
    updatedItemsMap.set(item[key], item);
  });

  // 只有在最后一次性更新 originalList.value
  originalList.value = Array.from(updatedItemsMap.values());
}
