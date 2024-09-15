import { colorInfo } from '@/constants';
import { useAppStore } from '@/stores';
import { menuTheme } from '@/styles/theme';
import { getDarkColor, getLightColor } from '@/utils';

const { system, store } = useColorMode({
  emitAuto: true,
});
export function useTheme() {
  const appStore = useAppStore();
  const { themeColor, asideInverted, isDark } = storeToRefs(appStore);

  const predefineColors = [
    '#2C78DA',
    '#337ecc',
    '#67C23A',
    '#529b2e',
    '#E6A23C',
    '#b88230',
    '#F56C6C',
    '#c45656',
    '#909399',
    '#73767a',
  ];

  // 设置主题模式
  function setColorMode(mode: 'light' | 'dark' | 'auto') {
    store.value = mode;
    setColor();
  }

  // 当前使用的主题模式
  const colorMode = computed(() => {
    return store.value === 'auto' ? system.value : store.value;
  });

  // 修改主题颜色
  function changeTheme(val: string | null, type: string) {
    if (!val) {
      val = colorInfo[type].color;
      ElMessage({ type: 'success', message: `${colorInfo[type].desc}颜色已重置为 ${val}` });
    }

    const typeText = `--el-color-${type}`;
    // 计算主题颜色变化
    document.documentElement.style.setProperty(typeText, val);
    document.documentElement.style.setProperty(
      `${typeText}-dark-2`,
      colorMode.value === 'dark' ? `${getLightColor(val!, 0.2)}` : `${getDarkColor(val!, 0.3)}`,
    );

    // 设置主题颜色变化
    for (let i = 1; i <= 9; i++) {
      const primaryColor = colorMode.value === 'dark' ? `${getDarkColor(val!, i / 10)}` : `${getLightColor(val!, i / 10)}`;
      document.documentElement.style.setProperty(`${typeText}-light-${i}`, primaryColor);
    }
    themeColor.value[type].color = val!;
  }

  // 设置主题颜色
  function setColor() {
    for (const key in themeColor.value) {
      changeTheme(themeColor.value[key].color, key);
    }
    setMenuTheme();
    // 设置是否是暗黑模式
    isDark.value = colorMode.value === 'dark';
  }

  function setMenuTheme() {
    let type = 'light';
    if (asideInverted.value)
      type = 'inverted';
    if (colorMode.value === 'dark')
      type = 'dark';

    const theme = menuTheme[type!];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  }

  return {
    initTheme: setColor,
    predefineColors,
    changeTheme,
    setColorMode,
    setMenuTheme,
  };
}
