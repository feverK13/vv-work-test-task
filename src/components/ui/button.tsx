import type { ComponentPropsWithoutRef } from 'react';
import { buttonClassName } from '@/components/ui/button-styles';
import type { ButtonSize, ButtonVariant } from '@/components/ui/button-styles';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<'button'>;

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return <button className={buttonClassName(variant, size, className)} {...props} />;
}
