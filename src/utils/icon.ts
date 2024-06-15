import type { IconProps } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { Icon } from '@iconify/vue'

/**
 * `renderIcon` 是一个创建用于显示图标的 Vue 组件的函数。
 *
 * @param icon - 要显示的图标的名称。
 * @param [props] - 自定义图标组件的可选属性。
 *
 * @returns 一个函数，当被调用时，返回表示 Vue 组件的 JSX 表达式。
 *
 * @example
 * const MyIcon = renderIcon('my-icon', { size: 'large' });
 */
export function renderIcon(icon: string, props?: IconProps) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}
