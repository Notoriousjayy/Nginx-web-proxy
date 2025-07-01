// src/components/Toast.tsx
import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const id = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
};