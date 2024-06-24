<script lang="ts">
import { NButton, buttonProps } from 'naive-ui';
import { resolveDirective, withDirectives } from 'vue';

export default defineComponent({
  name: 'NButton',
  props: buttonProps,
  setup(props, { slots }) {
    const vBlur = resolveDirective('blur');
    return () => withDirectives(h(NButton, props, slots), [[vBlur, true]]);
  },
});
</script>
