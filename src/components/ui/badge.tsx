import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
};

const badgeBaseClassName = 'inline-flex items-center rounded-full font-medium';

const badgeVariantClassName = {
  solid: 'bg-brand-500 text-paper',
  outline: 'bg-transparent text-ink ring-1 ring-ink/15',
};

const badgeSizeClassName = {
  sm: 'px-3 py-1 text-xs',
  md: 'gap-2 px-4 py-2 text-sm',
};

export function Badge({ children, variant = 'solid', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span
      className={`${badgeBaseClassName} ${badgeVariantClassName[variant]} ${badgeSizeClassName[size]} ${className}`}
    >
      {children}
    </span>
  );
}
