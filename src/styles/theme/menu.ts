interface MenuTheme {
  light: AnyObj
  inverted: AnyObj
  dark: AnyObj
  [key: string]: AnyObj
}

export const menuTheme: MenuTheme = {
  light: {
    '--el-menu-bg-color': 'var(--el-color-white)',
    '--el-menu-hover-bg-color': '#ebedf0',
    '--el-menu-text-color': 'var(--el-text-color-primary)',
    '--el-menu-hover-text-color': 'var(--el-text-color-primary)',
    '--el-menu-active-color': 'var(--el-color-primary)',
    '--el-menu-active-bg-color': 'var(--el-color-primary-light-9)',
  },
  inverted: {
    '--el-menu-bg-color': '#2b3743',
    '--el-menu-hover-bg-color': '#242d35',
    '--el-menu-text-color': '#a3a7ac',
    '--el-menu-hover-text-color': 'var(--el-color-white)',
    '--el-menu-active-color': 'var(--el-color-primary)',
    '--el-menu-active-bg-color': 'var(--el-color-primary-light-7)',
  },
  dark: {
    '--el-menu-bg-color': 'var(--el-bg-color)',
    '--el-menu-hover-bg-color': 'var(--el-bg-color-page)',
    '--el-menu-text-color': 'var(--el-text-color-primary)',
    '--el-menu-hover-text-color': 'var(--el-color-white)',
    '--el-menu-active-color': 'var(--el-color-primary)',
    '--el-menu-active-bg-color': 'var(--el-color-primary-light-9)',
  },
};
