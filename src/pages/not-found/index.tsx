import { Link } from 'react-router';
import { buttonClassName } from '@/components/ui/button-styles';

export function NotFoundPage() {
  return (
    <section className="bg-gradient-to-b from-paper via-brand-100/30 to-paper">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6 lg:py-36">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-10 text-[7rem] leading-none font-semibold tracking-tighter text-brand-200/60 select-none sm:text-[11rem] lg:text-[14rem]"
        >
          404
        </span>

        <div className="relative">
          <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
            Сторінку не знайдено
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Можливо, посилання застаріле або адресу введено з помилкою.
          </p>
          <Link to="/" className={buttonClassName('primary', 'lg', 'mt-10')}>
            На головну
          </Link>
        </div>
      </div>
    </section>
  );
}
