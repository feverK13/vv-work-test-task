import { useEffect, useRef, useState } from 'react';

const PARALLAX_MEDIA_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState<string | undefined>(undefined);

  useEffect(() => {
    const anchor = ref.current?.parentElement;
    if (!anchor || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia(PARALLAX_MEDIA_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = anchor.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed;
      setTransform(`translate3d(0, ${Math.round(offset)}px, 0)`);
    };

    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    const start = () => {
      window.addEventListener('scroll', scheduleUpdate, { passive: true });
      window.addEventListener('resize', scheduleUpdate);
      scheduleUpdate();
    };

    const stop = () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const handleMediaChange = () => {
      stop();
      if (mediaQuery.matches) {
        start();
      } else {
        setTransform(undefined);
      }
    };

    if (mediaQuery.matches) start();
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      stop();
    };
  }, [speed]);

  return { ref, transform };
}
