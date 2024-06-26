import { URL, fileURLToPath } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      AutoImport({
        dts: 'src/typings/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          'pinia',
          '@vueuse/core',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
      }),
      Components({
        dts: 'src/typings/components.d.ts',
        dirs: ['src/components'],
        resolvers: [NaiveUiResolver()],
      }),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      // 设置端口号
      port: 8080,
      // 配置代理
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
