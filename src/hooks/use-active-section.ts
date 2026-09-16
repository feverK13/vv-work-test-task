import { useEffect, useState } from 'react';

const ACTIVE_LINE_PX = 120;

export function useActiveSection(sectionIds: readonly string[], enabled: boolean) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;

    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      () => {
        let current: string | null = null;

        for (const element of elements) {
          if (element.getBoundingClientRect().top <= ACTIVE_LINE_PX) current = element.id;
        }

        setActiveSection(current);
      },
      { threshold: [0, 1], rootMargin: `-${ACTIVE_LINE_PX}px 0px -75% 0px` },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [enabled, sectionIds]);

  return enabled ? activeSection : null;
}
