import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<'button'>;

const baseClassName =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink/90',
  secondary: 'border border-ink bg-transparent text-ink hover:bg-ink/5',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button className={`${baseClassName} ${variantClassName[variant]} ${className}`} {...props} />
  );
}
