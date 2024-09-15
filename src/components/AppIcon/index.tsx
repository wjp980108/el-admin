import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { Icon } from '@iconify/vue';
import { ElIcon } from 'element-plus';

export default defineComponent({
  name: 'AppIcon',
  props: {
    icon: {
      type: String,
      default: '',
      required: true,
    },
    color: String,
    size: [String, Number],
  },
  setup(props) {
    const icons: AnyObj = ElementPlusIconsVue;
    return () => (
      <ElIcon class="app-icon" {...props}>
        {props.icon!.includes(':') ? <Icon icon={props.icon!} /> : h(icons[props.icon!])}
      </ElIcon>
    );
  },
});
