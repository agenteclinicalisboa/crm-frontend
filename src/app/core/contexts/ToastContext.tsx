import React from 'react';

import { toast, Toaster } from 'sonner';

import { ToastContext, type Toast } from '@/app/core/hooks/useToast';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const showToast = ({ type = 'info', title, description, data }: Toast) => {
    const typeConfig: Record<
      NonNullable<Toast['type']>,
      { fn: (message: string, data?: Toast['data']) => string | number; className?: string }
    > = {
      success: { fn: toast.success, className: '!text-green-600 !bg-green-200' },
      warning: { fn: toast.warning, className: '!text-yellow-600 !bg-yellow-200' },
      error: { fn: toast.error, className: '!text-red-600 !bg-red-200' },
      info: { fn: toast.info, className: '!text-primary/50 !bg-primary/30' },
    };

    const { fn, className } = typeConfig[type];

    fn(title, {
      ...(description && { description }),
      className,
      ...data,
    });
  };

  const context = React.useMemo(() => {
    return {
      toast: showToast,
    };
  }, []);

  return (
    <ToastContext value={context}>
      {children}

      <Toaster
        position="top-right"
        duration={1000 * 5}
        closeButton
      />
    </ToastContext>
  );
}
