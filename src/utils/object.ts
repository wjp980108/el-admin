/**
 * 检查两个对象在给定的多个键上是否相等
 * @param obj1 - 第一个对象
 * @param obj2 - 第二个对象
 * @param keys - 需要对比的键数组
 * @returns 如果在所有给定键上对象相等则返回 true，否则返回 false
 */
export function areObjectsEqualForKeys(obj1: AnyObj, obj2: AnyObj, keys: string[]): boolean {
  // 检查输入是否为有效对象
  if (!obj1 || !obj2) {
    return false;
  }

  // 使用every方法检查每个键的值是否相等
  return keys.every(key => obj1[key] === obj2[key]);
}
