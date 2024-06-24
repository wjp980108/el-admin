import type { App } from 'vue';

/**
 * 点击后自动失焦指令
 * @description v-blur
 */
function blurDirective(app: App<Element>) {
  app.directive('blur', {
    mounted(el) {
      useEventListener(el, 'focus', () => el.blur());
    },
  });
}

// 统一管理全局自定义指令
export function setupGlobalDirectives(APP: App<Element>) {
  // 点击后自动失焦
  blurDirective(APP);
}
