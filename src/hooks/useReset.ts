import type { Ref, UnwrapRef } from 'vue';

/**
 * `useReset` 是一个创建具有重置功能的响应式引用的函数。
 * 当你需要保持对象的原始状态，并在任何时间点将其重置回初始状态时，
 * 此函数非常有用。
 *
 * @param val - 响应式状态的初始值。
 * @returns {[Ref<UnwrapRef<T>>, () => void]} 返回一个数组，第一个元素是响应式状态，第二个元素是一个重置函数，可以将状态重置为初始值。
 *
 * @example
 * const [state, resetState] = useReset({ name: '张三', age: 30 });
 *
 * // 更新状态
 * state.value.name = '李四';
 *
 * // 重置状态到初始值
 * resetState();
 */
export function useReset<T>(val: T): [Ref<UnwrapRef<T>>, () => void] {
  const _val = structuredClone<T>(val);
  const res = ref<T>(val);
  const reset = () => {
    res.value = structuredClone(_val) as UnwrapRef<T>;
  };
  return [res, reset];
}
