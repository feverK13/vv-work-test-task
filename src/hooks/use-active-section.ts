import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: readonly string[], enabled: boolean) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === 'undefined') return;

    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const sectionsInCenter = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            sectionsInCenter.add(entry.target.id);
          } else {
            sectionsInCenter.delete(entry.target.id);
          }
        }

        setActiveSection((current) =>
          current && sectionsInCenter.has(current)
            ? current
            : (elements.find((element) => sectionsInCenter.has(element.id))?.id ?? null),
        );
      },
      { threshold: 0, rootMargin: '-40% 0px -40% 0px' },
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
