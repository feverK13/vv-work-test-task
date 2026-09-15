import type { CSSProperties } from 'react';

type SkeletonProps = {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  className?: string;
};

export function Skeleton({ width, height, className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-md bg-ink/10 ${className}`} style={{ width, height }} />
  );
}
