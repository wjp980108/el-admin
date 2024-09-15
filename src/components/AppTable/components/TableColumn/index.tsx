import type { AppTable } from '@/typings/table';
import type { PropType } from 'vue';
import { moneyContent } from '@/components/AppTable/components/TableColumn/renderFunc';
import { ElTableColumn } from 'element-plus';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  name: 'TableColumn',
  props: {
    column: {
      type: Object as PropType<AppTable.TableColumn>,
      default: () => null,
    },
  },
  setup(props) {
    props.column.headerAlign = props.column.headerAlign || 'left';
    const { type, renderHeader, renderContent } = props.column;
    const renderFunc: AnyObj = {
      expand: {
        default: renderContent,
      },
      money: {
        header: renderHeader,
        default: moneyContent,
      },
      undefined: {},
    };

    if (type === undefined) {
      if (renderHeader) {
        renderFunc[type!].header = renderHeader;
      }
      if (renderContent) {
        renderFunc[type!].default = renderContent;
      }
    }

    const column = cloneDeep(props.column);
    delete column.renderHeader;

    return () => (
      <ElTableColumn {...column}>
        {{
          ...renderFunc[type!],
        }}
      </ElTableColumn>
    );
  },
});
