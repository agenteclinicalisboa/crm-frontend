import React from 'react';

import { type ExternalToast } from 'sonner';

export interface Toast {
  type?: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
  data?: Omit<ExternalToast, 'description'>;
}

interface ToastContextType {
  toast: (data: Toast) => void;
}

export const ToastContext = React.createContext<ToastContextType>({} as ToastContextType);

export const useToast = () => React.use(ToastContext);
