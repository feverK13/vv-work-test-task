import type { ReactNode } from 'react';

type SectionLabelProps = {
  children: ReactNode;
  tone?: 'default' | 'inverted';
};

const toneClassName = {
  default: 'text-brand-500',
  inverted: 'text-brand-300',
};

const ruleClassName = {
  default: 'bg-brand-500',
  inverted: 'bg-brand-300',
};

export function SectionLabel({ children, tone = 'default' }: SectionLabelProps) {
  return (
    <p className={`flex items-center gap-3 text-sm font-medium ${toneClassName[tone]}`}>
      <span className={`h-px w-8 shrink-0 ${ruleClassName[tone]}`} aria-hidden="true" />
      {children}
    </p>
  );
}
