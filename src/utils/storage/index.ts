import type { CreateStorageParams } from '@/utils/storage/storage';
import { createStorage } from '@/utils/storage/storage';

type OptionType = Optional<CreateStorageParams, 'name' | 'description'>;

const createOptions: OptionType = {
  prefixKey: `${import.meta.env.VITE_APP_TITLE}__`,
  timeout: null,
};

export const storage = createStorage({
  name: 'erpStorage',
  description: '进销存全局本地存储',
  ...createOptions,
});

export const tableStorage = createStorage({
  name: 'tableStorage',
  description: '进销存表格本地存储',
  ...createOptions,
});
