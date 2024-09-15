import type { NotificationParamsTyped } from 'element-plus/es/components/notification/src/notification';
import { ElNotification } from 'element-plus';

export function useNotification() {
  const notify = (options: NotificationParamsTyped) => {
    ElNotification.closeAll();
    ElNotification(options);
  };
  return {
    notify,
  };
}
