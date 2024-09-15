/**
 * 将嵌套的表格数据扁平化处理，通过将每个子元素展开为新的行，并与其父行数据合并。
 * 此函数旨在将层次化或嵌套的数据结构转换为平坦的行数组，适用于渲染到表格格式中，如HTML表格或电子表格。
 *
 * @param dataList - 包含可能含有嵌套数组的数据对象数组。
 * @param [key] - 每个对象中包含嵌套数组的键名，默认为 'children'。如果对象中不存在此键，则该对象将按原样包含在输出中。
 * @returns 返回扁平化后的数据数组，每个元素都是一个合并了父级和子级属性的新对象。
 */
export function flattenTableData<T>(dataList: T[], key: keyof T): T[] {
  const list: T[] = [];
  dataList.forEach((item) => {
    const value = item[key];
    if (Array.isArray(value) && value.length > 0) {
      value.forEach((child: Partial<T>) => {
        // 创建一个新对象，包含item的所有属性，然后用child的属性覆盖同名属性
        list.push({
          ...item,
          ...child,
        });
      });
    }
    else {
      // 如果item[key]不是数组，则直接添加到list中
      list.push(item);
    }
  });
  return list;
}
