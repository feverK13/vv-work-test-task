import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useActiveSection } from '@/hooks/use-active-section';
import { getHashTarget, scrollToSection } from '@/utils/scroll';

type NavItem = {
  label: string;
  to: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Знайти роботу', to: '/#partners' },
  { label: 'Для роботодавців', to: '/#employer' },
  { label: 'Категорії', to: '/#categories' },
  { label: 'Контакти', to: '/контакти' },
];

const HOME_SECTION_IDS = ['partners', 'categories', 'employer'] as const;

function resolveActiveIndex(pathname: string, activeSection: string | null) {
  if (pathname === '/') {
    if (!activeSection) return -1;

    return NAV_ITEMS.findIndex((item) => getHashTarget(item.to).sectionId === activeSection);
  }

  return NAV_ITEMS.findIndex((item) => {
    const { path, sectionId } = getHashTarget(item.to);
    return sectionId === null && path === pathname;
  });
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname);
  const isHome = pathname === '/';
  const activeSection = useActiveSection(HOME_SECTION_IDS, isHome);
  const activeIndex = resolveActiveIndex(pathname, activeSection);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.body.classList.add('overflow-hidden');
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  const handleNavClick = (to: string) => {
    setIsMenuOpen(false);

    const { path, sectionId } = getHashTarget(to);
    if (sectionId && path === pathname) scrollToSection(sectionId);
  };

  const navLinkClassName = (index: number) =>
    `text-sm transition-[color,scale] duration-200 active:scale-[0.97] active:duration-0 motion-reduce:active:scale-100 ${
      index === activeIndex ? 'text-brand-500' : 'text-ink hover:text-brand-500'
    }`;

  const desktopUnderlineClassName = (index: number) =>
    `relative py-1 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none ${
      index === activeIndex ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight text-ink">
            VV Work
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                aria-current={index === activeIndex ? 'page' : undefined}
                onClick={() => handleNavClick(item.to)}
                className={`${navLinkClassName(index)} ${desktopUnderlineClassName(index)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">{isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${isMenuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 h-full w-full cursor-default bg-ink/40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="sr-only">Закрити меню</span>
        </button>

        <nav
          id="mobile-menu"
          className={`absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col gap-1 border-l border-line bg-paper px-6 pt-6 shadow-elevated transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold tracking-tight text-ink">VV Work</span>
            <button
              type="button"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-md p-2 text-ink transition-colors hover:bg-ink/5"
            >
              <span className="sr-only">Закрити меню</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              tabIndex={isMenuOpen ? 0 : -1}
              aria-current={index === activeIndex ? 'page' : undefined}
              onClick={() => handleNavClick(item.to)}
              className={`${navLinkClassName(index)} border-b border-line py-3 text-base`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
