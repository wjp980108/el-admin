import type { ColorInfo } from '@/constants';

declare namespace App {

  type lang = 'zhCN' | 'enUS';

  type TransitionAnimation = '' | 'fade' | 'fade-slide' | 'fade-bottom' | 'fade-scale' | 'zoom-fade' | 'zoom-out';

  type TabStyle = 'dynamic' | 'card' | 'simple';

  interface AppState {
    // 侧边栏是否折叠
    collapse: boolean
    // 过渡动画
    transitionAnimation: TransitionAnimation
    // 页面重载状态
    loadFlag: boolean
    // 主题颜色
    themeColor: ColorInfo
    // 全局组件大小
    size: 'small' | 'default' | 'large'
    // 侧边栏是否反色
    asideInverted: boolean
    // 面包屑是否显示
    breadcrumbShow: boolean
    // 面包屑图标是否显示
    breadcrumbIconShow: boolean
    // 是否暗黑模式
    isDark: boolean
    // 标签页风格
    tabStyle: TabStyle
    // 水印
    watermark: boolean
  }
}
