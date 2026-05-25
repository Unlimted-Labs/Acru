'use client';

import { useUIStore } from '../store/ui.store';

export function useToast() {
  const { toasts, addToast, removeToast } = useUIStore();

  const toast = {
    success: (message: string) => addToast({ type: 'success', message }),
    error: (message: string) => addToast({ type: 'error', message }),
    info: (message: string) => addToast({ type: 'info', message }),
    warning: (message: string) => addToast({ type: 'warning', message }),
  };

  return { toasts, toast, removeToast };
}
