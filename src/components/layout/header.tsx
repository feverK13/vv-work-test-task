import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

type NavItem = {
  label: string;
  to: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Знайти роботу', to: '/#partners' },
  { label: 'Знайти працівника', to: '/#employer' },
  { label: 'Партнери', to: '/#partners' },
  { label: 'Контакти', to: '/контакти' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (to: string) => {
    const [path, hash] = to.split('#');
    return location.pathname === path && location.hash === (hash ? `#${hash}` : '');
  };

  const navLinkClassName = (to: string) =>
    `text-sm transition-colors ${
      isActive(to) ? 'text-brand-500' : 'text-ink hover:text-brand-500'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-lg font-semibold tracking-tight text-ink">
            VV Work
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} className={navLinkClassName(item.to)}>
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

          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
              className={`${navLinkClassName(item.to)} border-b border-line py-3 text-base`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
