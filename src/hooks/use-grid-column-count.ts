import { useEffect, useState } from 'react';

export function useGridColumnCount() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      const columns = window
        .getComputedStyle(element)
        .gridTemplateColumns.split(' ')
        .filter(Boolean).length;

      setColumnCount(columns > 0 ? columns : 1);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return { gridRef: setElement, columnCount };
}
