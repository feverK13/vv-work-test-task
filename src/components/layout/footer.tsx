import { Link } from 'react-router';
import { Send } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

const CANDIDATE_LINKS = [
  { label: 'Вакансії', to: '/#partners' },
  { label: 'Категорії', to: '/#categories' },
];

const EMPLOYER_LINKS = [
  { label: 'Розмістити вакансію', to: '/контакти' },
  { label: 'Наші партнери', to: '/#partners' },
];

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

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-0">
        <div className="lg:pr-10">
          <p className="text-lg font-semibold tracking-tight">VV Work</p>
          <p className="mt-3 max-w-xs text-sm text-paper/60">
            З’єднуємо кандидатів та роботодавців по всій Україні.
          </p>
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Для кандидатів</p>
          <ul className="mt-4 space-y-3">
            {CANDIDATE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-paper/60 transition-colors hover:text-brand-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Для роботодавців</p>
          <ul className="mt-4 space-y-3">
            {EMPLOYER_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-paper/60 transition-colors hover:text-brand-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={columnClassName}>
          <p className="text-sm font-medium text-paper">Контакти</p>
          <ul className="mt-4 space-y-3 text-sm text-paper/60">
            <li>info@vvwork.ua</li>
            <li>+380 44 000 00 00</li>
          </ul>

          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <span
                key={label}
                title={label}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/60 transition-colors hover:border-brand-300 hover:text-brand-300"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 px-4 py-6 text-center text-xs text-paper/40 sm:px-6">
        © {CURRENT_YEAR} VV Work
      </div>
    </footer>
  );
}
