import { useStore } from '@nanostores/preact';

import { toast } from '@stores/toastStore';

import styles from './Toast.module.css';

function Toast() {
  const $toast = useStore(toast);

  if (!$toast.visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      class={`fixed top-4 right-4 z-50 ${styles.toast}`}
    >
      <div class="bg-primary border-secondary flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-white shadow-lg">
        <span class="text-sm font-medium">{$toast.message}</span>
      </div>
    </div>
  );
}

export default Toast;
