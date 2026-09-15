import { Link } from 'react-router';

const BENEFITS = [
  'Перевірені кандидати з підтвердженими навичками та документами.',
  'Швидкий підбір персоналу під ваші вакансії — без зайвої бюрократії.',
  'Супровід на всіх етапах: від першого контакту до виходу на роботу.',
];

export function EmployerCta() {
  return (
    <section id="employer" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-medium tracking-widest text-brand-500 uppercase">
        Для роботодавців
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Потрібні працівники?</h2>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {BENEFITS.map((benefit) => (
          <li key={benefit} className="rounded-lg border border-ink/10 p-6 text-sm text-ink/70">
            {benefit}
          </li>
        ))}
      </ul>

      <Link
        to="/контакти"
        className="mt-10 inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
      >
        Знайти працівника
      </Link>
    </section>
  );
}
