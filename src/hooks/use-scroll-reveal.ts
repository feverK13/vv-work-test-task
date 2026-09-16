import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element || isRevealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isRevealed]);

  return { ref, revealClassName: isRevealed ? 'reveal animate-fade-in' : 'reveal' };
}
