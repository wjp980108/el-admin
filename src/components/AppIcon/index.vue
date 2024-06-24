<script lang="ts">
import type { PropType } from 'vue';
import { NIcon } from 'naive-ui';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'AppIcon',
  props: {
    /* 图标名称 */
    icon: String,
    /* 图标颜色 */
    color: String,
    /* 图标大小 */
    size: {
      type: Number,
      default: 16,
    },
    /* 图标深度 */
    depth: Number as PropType<1 | 2 | 3 | 4 | 5>,
  },
  setup(props) {
    return () => h(NIcon, props, () => h(Icon, { icon: props.icon! }));
  },
});
</script>
