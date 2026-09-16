import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToSection, scrollToTop } from '@/utils/scroll';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash && scrollToSection(decodeURIComponent(hash).slice(1))) return;

    scrollToTop();
  }, [pathname, hash]);

  return null;
}
