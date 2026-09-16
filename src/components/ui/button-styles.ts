export type ButtonVariant = 'primary' | 'secondary' | 'inverted';

export type ButtonSize = 'md' | 'lg';

const baseClassName =
  'inline-flex items-center justify-center rounded-md font-medium transition-[transform,box-shadow,background-color,border-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper hover:-translate-y-px hover:shadow-elevated active:translate-y-0 motion-reduce:hover:translate-y-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink/90',
  secondary: 'border border-ink bg-transparent text-ink hover:bg-ink/5',
  inverted: 'bg-paper text-ink hover:bg-brand-100',
};

const sizeClassName: Record<ButtonSize, string> = {
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function buttonClassName(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
) {
  return `${baseClassName} ${variantClassName[variant]} ${sizeClassName[size]} ${className}`;
}
