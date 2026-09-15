import { Link } from 'react-router';

const CURRENT_YEAR = new Date().getFullYear();

const CANDIDATE_LINKS = [
  { label: 'Вакансії', to: '/#partners' },
  { label: 'Категорії', to: '/#categories' },
];

const EMPLOYER_LINKS = [
  { label: 'Розмістити вакансію', to: '/контакти' },
  { label: 'Наші партнери', to: '/#partners' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', abbr: 'FB' },
  { label: 'Instagram', abbr: 'IG' },
  { label: 'Telegram', abbr: 'TG' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">VV Work</p>
          <p className="mt-3 text-sm text-paper/70">
            З’єднуємо кандидатів та роботодавців по всій Україні.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Для кандидатів</p>
          <ul className="mt-3 space-y-2">
            {CANDIDATE_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-paper/70 hover:text-brand-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Для роботодавців</p>
          <ul className="mt-3 space-y-2">
            {EMPLOYER_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-sm text-paper/70 hover:text-brand-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-paper/90">Контакти</p>
          <ul className="mt-3 space-y-2 text-sm text-paper/70">
            <li>info@vvwork.ua</li>
            <li>+380 44 000 00 00</li>
          </ul>

          <p className="mt-4 text-sm font-medium text-paper/90">Соцмережі</p>
          <div className="mt-3 flex gap-2">
            {SOCIAL_LINKS.map((social) => (
              <span
                key={social.abbr}
                title={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/30 text-xs text-paper/70"
              >
                {social.abbr}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 px-4 py-4 text-center text-xs text-paper/50 sm:px-6">
        © {CURRENT_YEAR} VV Work
      </div>
    </footer>
  );
}
