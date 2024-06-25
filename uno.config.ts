import { defineConfig, presetAttributify, presetUno, transformerVariantGroup } from 'unocss';

// https://github.com/unocss/unocss

export default defineConfig({
  presets: [presetUno({ dark: 'class' }), presetAttributify()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'commands': 'h-5.5 w-5.5 flex-center b-rd-0.5 bg-[rgba(125,125,125,0.1)] text-2.5 color-#909399 shadow-commands',
  },
  rules: [
    ['shadow-commands', {
      'box-shadow': 'inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4)',
    }],
  ],
  transformers: [
    transformerVariantGroup(),
  ],
});
