import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
};

const badgeBaseClassName = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium';

const badgeVariantClassName = {
  solid: 'bg-brand-500 text-paper',
  outline: 'bg-transparent text-ink ring-1 ring-ink/15',
};

export function Badge({ children, variant = 'solid', className = '' }: BadgeProps) {
  return (
    <span className={`${badgeBaseClassName} ${badgeVariantClassName[variant]} ${className}`}>
      {children}
    </span>
  );
}
