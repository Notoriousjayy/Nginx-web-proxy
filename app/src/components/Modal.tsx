import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { theme } from './theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
    function clsx(arg0: string): string | undefined {
        throw new Error('Function not implemented.');
    }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={clsx(`bg-${theme.colors.background} p-${theme.spacing.lg} ${theme.radii.lg} max-w-lg w-full`)}>
        {children}
        <button onClick={onClose} className="mt-4 text-sm text-${theme.colors.danger}">Close</button>
      </div>
    </div>,
    document.body
  );
};
