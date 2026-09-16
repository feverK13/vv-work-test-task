import { Link } from 'react-router';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { buttonClassName } from '@/components/ui/button-styles';
import { ParallaxShape } from '@/components/ui/parallax-shape';
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
      className={`relative isolate scroll-mt-24 bg-ink text-paper ${revealClassName}`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
        aria-hidden="true"
      >
        <ParallaxShape
          speed={0.2}
          className="absolute -top-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-brand-500/10"
        />
        <ParallaxShape
          speed={0.3}
          className="absolute bottom-0 -left-16 h-72 w-72 rotate-12 rounded-[3rem] bg-brand-500/10"
        />
        <ParallaxShape
          speed={0.4}
          className="absolute right-1/4 bottom-12 h-32 w-32 rounded-full bg-brand-500/10"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionLabel tone="inverted">Для роботодавців</SectionLabel>
        <h2 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
          Потрібні працівники?
        </h2>

        <ul className="stagger-children mt-12 grid gap-4 sm:grid-cols-3">
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
