import type { ReactNode } from 'react';
import { useParallax } from '@/hooks/use-parallax';

type ParallaxShapeProps = {
  speed: number;
  className: string;
  children?: ReactNode;
};

export function ParallaxShape({ speed, className, children }: ParallaxShapeProps) {
  const { ref, transform } = useParallax<HTMLDivElement>(speed);

  return (
    <div ref={ref} className={className} style={{ transform }}>
      {children}
    </div>
  );
}
