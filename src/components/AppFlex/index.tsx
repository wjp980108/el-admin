import type { Property } from 'csstype';
import type { PropType } from 'vue';

export type FlexAlign = Property.AlignItems;

export type FlexJustify = Property.JustifyContent;
export default defineComponent({
  name: 'AppFlex',
  props: {
    // 垂直排列方式，参考 align-items
    align: String as PropType<FlexAlign>,
    // 水平排列方式，参考 justify-content
    justify: {
      type: String as PropType<FlexJustify>,
      default: 'start',
    },
    // 是否为行内元素
    inline: Boolean,
    // 是否垂直布局
    vertical: Boolean,
    // 是否反向
    reverse: Boolean,
    // 水平和垂直间距；为数组时，是 [水平间距, 垂直间距]
    size: {
      type: [Number, Array] as PropType<number | [number, number]>,
      default: [8, 12],
    },
    // 是否换行
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const margin = computed<{ horizontal: number, vertical: number }>(() => {
      const { size } = props;
      if (Array.isArray(size)) {
        return {
          horizontal: size[0],
          vertical: size[1],
        };
      }
      return {
        horizontal: size,
        vertical: size,
      };
    });

    return () => (
      <div
        class="app-flex"
        style={{
          display: props.inline ? 'inline-flex' : 'flex',
          flexDirection: (() => {
            if (props.vertical && !props.reverse)
              return 'column';
            if (props.vertical && props.reverse)
              return 'column-reverse';
            if (!props.vertical && props.reverse)
              return 'row-reverse';
            else return 'row';
          })(),
          justifyContent: props.justify,
          flexWrap: !props.wrap || props.vertical ? 'nowrap' : 'wrap',
          alignItems: props.align,
          gap: `${margin.value.horizontal}px ${margin.value.vertical}px`,
        }}
      >
        {slots.default?.()}
      </div>
    );
  },
});
