import React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => (
  <label className={clsx('inline-flex relative items-center cursor-pointer', className)}>
    <input type="checkbox" className="sr-only peer" {...props} />
    <div className="w-9 h-5 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-blue-600 transition" />
    <span className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full peer-checked:translate-x-4 transition" />
  </label>
);
function clsx(arg0: string, className: string | undefined): string | undefined {
    throw new Error('Function not implemented.');
}

