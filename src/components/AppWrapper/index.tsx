export default defineComponent({
  name: 'AppWrapper',
  setup(props, { slots }) {
    return () => (
      <div class="flex-y-center cursor-pointer rounded-4 p-12 color-[var(--el-text-color-primary)] hover:(bg-[var(--el-color-primary-light-9)] color-[var(--el-color-primary)])">
        {slots.default?.()}
      </div>
    );
  },
});
