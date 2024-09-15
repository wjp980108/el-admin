import { areObjectsEqualForKeys } from '@/utils';
import { ref } from 'vue';

/**
 * 使用 Vue 的 ref 响应式引用来存储行合并信息。
 * 提供一个函数来计算行合并的索引。
 */
export function useTableSpan() {
  const spanList = ref<number[]>([]);
  let currentRow = 0;

  /**
   * 根据指定的键值合并行。
   * @param data 表格数据，每个元素是一个对象。
   * @param keys 根据这些键合并行，可以是一个字符串或字符串数组。
   */
  const setSpanList = (data: AnyObj[], keys: string | string[]) => {
    spanList.value = [];
    data.forEach((item, index) => {
      if (index === 0) {
        spanList.value.push(1);
        currentRow = 0;
      }
      else {
        const isSameRow = typeof keys === 'string'
          ? item[keys] === data[index - 1][keys]
          : areObjectsEqualForKeys(item, data[index - 1], keys);

        if (isSameRow) {
          spanList.value[currentRow]++;
          spanList.value.push(0);
        }
        else {
          spanList.value.push(1);
          currentRow = index;
        }
      }
    });

    // 计算表格序号 rowIndex，只有在 spanList 中的值大于 0 的情况下递增
    let rowIndex = 1;
    data.forEach((item, index) => {
      if (spanList.value[index] > 0) {
        item.rowIndex = rowIndex++;
      }
    });
  };
  return { spanList, setSpanList };
}
