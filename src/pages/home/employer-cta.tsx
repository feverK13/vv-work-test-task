import { Link } from 'react-router';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { buttonClassName } from '@/components/ui/button-styles';
import { SectionLabel } from '@/components/ui/section-label';

const BENEFITS = [
  'Перевірені кандидати з підтвердженими навичками та документами.',
  'Швидкий підбір персоналу під ваші вакансії — без зайвої бюрократії.',
  'Супровід на всіх етапах: від першого контакту до виходу на роботу.',
];

export function EmployerCta() {
  const { ref, revealClassName } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="employer"
      className={`scroll-mt-24 bg-ink text-paper ${revealClassName}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionLabel tone="inverted">Для роботодавців</SectionLabel>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
          Потрібні працівники?
        </h2>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit}
              className="rounded-xl border border-paper/15 p-6 text-sm leading-relaxed text-paper/70 transition-colors duration-300 hover:border-brand-300/50"
            >
              {benefit}
            </li>
          ))}
        </ul>

        <Link to="/контакти" className={buttonClassName('inverted', 'lg', 'mt-12')}>
          Знайти працівника
        </Link>
      </div>
    </section>
  );
}
