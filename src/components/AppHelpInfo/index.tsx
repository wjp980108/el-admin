import AppIcon from '@/components/AppIcon';
import { ElTooltip } from 'element-plus';

export default defineComponent({
  name: 'AppHelpInfo',
  props: {
    message: String,
    placement: {
      type: String,
      default: 'top',
    },
    color: {
      type: String,
      default: 'var(--el-color-primary)',
    },
    left: String,
    right: String,
  },
  setup(props) {
    const style = computed(() => {
      const styleObj: AnyObj = {};

      // 如果设置了 left 或 right 则添加 margin-left
      if (props.left) {
        styleObj.marginLeft = props.left;
      }
      else if (!props.right) {
        styleObj.marginLeft = '3px';
      }

      // 如果设置了 right 则添加 margin-right
      if (props.right) {
        styleObj.marginRight = props.right;
      }

      return styleObj;
    });

    return () => (
      <ElTooltip content={props.message} placement={props.placement}>
        <AppIcon
          class="cursor-help"
          style={style.value}
          icon="icon-park-outline:help"
          color={props.color}
        />
      </ElTooltip>
    );
  },
});
