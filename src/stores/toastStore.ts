import { atom } from 'nanostores';

export type ToastState = {
  message: string;
  visible: boolean;
};

export const toast = atom<ToastState>({
  message: '',
  visible: false,
});

let timeoutId: NodeJS.Timeout | null = null;

export const showToast = (message: string, duration = 3000) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  toast.set({ message, visible: true });

  timeoutId = setTimeout(() => {
    hideToast();
  }, duration);
};

export const hideToast = () => {
  toast.set({ message: '', visible: false });
};
