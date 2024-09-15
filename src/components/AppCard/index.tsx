import type { PropType } from 'vue';
import { ElCard } from 'element-plus';

export default defineComponent({
  name: 'AppCard',
  props: {
    header: String,
    footer: String,
    bodyClass: {
      type: String,
      default: '',
    },
    shadow: {
      type: String as PropType<'always' | 'hover' | 'never'>,
      default: 'always',
    },
    bottom: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    return () => (
      <ElCard
        {...props}
        bodyStyle={{
          paddingBottom: props.bottom ? '2px' : '',
        }}
      >
        {slots.default?.()}
      </ElCard>
    );
  },
});
