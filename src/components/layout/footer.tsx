import { Link, useLocation } from 'react-router';
import { ArrowUp, Send } from 'lucide-react';
import { getHashTarget, scrollToSection } from '@/utils/scroll';

const CURRENT_YEAR = new Date().getFullYear();

type FooterLink = {
  label: string;
  to: string;
};

const CANDIDATE_LINKS: FooterLink[] = [
  { label: 'Знайти роботу', to: '/#partners' },
  { label: 'Категорії', to: '/#categories' },
];

const EMPLOYER_LINKS: FooterLink[] = [{ label: 'Розмістити вакансію', to: '/контакти' }];

const COMPANY_LINKS: FooterLink[] = [{ label: 'Контакти', to: '/контакти' }];

const columnClassName =
  'border-t border-paper/10 pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:border-paper/10 lg:pl-10';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 7.5h2V4.5h-2.3C12.4 4.5 11 6 11 8v2H9v3h2v6.5h3V13h2.2l.4-3H14V8.2c0-.4.2-.7.5-.7Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Telegram', Icon: Send },
];

function FooterLinkList({
  links,
  onLinkClick,
}: {
  links: FooterLink[];
  onLinkClick: (to: string) => void;
}) {
  return (
    <ul className="mt-4 space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.to}
            onClick={() => onLinkClick(link.to)}
            className="text-sm text-paper/60 transition-colors hover:text-brand-300"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const location = useLocation();
  const pathname = decodeURIComponent(location.pathname);

  const handleLinkClick = (to: string) => {
    const { path, sectionId } = getHashTarget(to);
    if (sectionId && path === pathname) scrollToSection(sectionId);
  };

  const handleBackToTop = () => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative bg-ink text-paper before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-500/30 before:to-transparent">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-0">
        <div className="lg:pr-10">
          <p className="text-lg font-semibold tracking-tight">VV Work</p>
          <p className="mt-3 max-w-xs text-sm text-paper/60">
            З’єднуємо кандидатів та роботодавців по всій Україні.
          </p>
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Для кандидатів</p>
          <FooterLinkList links={CANDIDATE_LINKS} onLinkClick={handleLinkClick} />
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Для роботодавців</p>
          <FooterLinkList links={EMPLOYER_LINKS} onLinkClick={handleLinkClick} />
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Компанія</p>
          <FooterLinkList links={COMPANY_LINKS} onLinkClick={handleLinkClick} />
          <ul className="mt-3 space-y-3 text-sm text-paper/60">
            <li>info@vvwork.ua</li>
            <li>+380 44 000 00 00</li>
          </ul>

          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <span
                key={label}
                role="img"
                title={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/60 transition-[color,border-color,scale] duration-200 hover:scale-110 hover:border-brand-400 hover:text-brand-400 motion-reduce:hover:scale-100"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6 text-xs text-paper/50 sm:px-6">
          <span>© {CURRENT_YEAR} VV Work</span>
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-paper/60 transition-[color,scale] duration-200 hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 active:scale-95 active:duration-0 motion-reduce:active:scale-100"
          >
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0"
              aria-hidden="true"
            />
            Вгору
          </button>
        </div>
      </div>
    </footer>
  );
}
