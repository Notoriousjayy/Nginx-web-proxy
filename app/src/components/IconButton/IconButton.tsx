import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
  badge?: number;
  iconClassName?: string;
}

export default function IconButton({
  iconName, badge, iconClassName = '', ...buttonProps
}: IconButtonProps) {
  return (
    <button type="button" className="group relative inline-block p-2" {...buttonProps}>
      <svg className={`inline-block pointer-events-none fill-current align-bottom ${iconClassName}`}>
        <use xlinkHref={`#${iconName}`} />
      </svg>
      {badge != null && (
        <span className="absolute top-0 right-0 inline-flex h-4 w-4 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-xs text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
