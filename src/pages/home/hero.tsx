import { buttonClassName } from '@/components/ui/button-styles';
import { SectionLabel } from '@/components/ui/section-label';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-paper via-brand-100/30 to-paper">
      <div
        className="pointer-events-none absolute top-1/2 -right-32 hidden h-[30rem] w-[30rem] -translate-y-1/2 lg:block xl:-right-16"
        aria-hidden="true"
      >
        <div className="animate-float absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-200/50" />
        <div className="animate-float absolute bottom-6 left-0 h-60 w-60 rotate-12 rounded-[3rem] bg-brand-100/80 [--float-delay:-2.5s] [--float-duration:8s]" />
        <div className="animate-float absolute right-24 bottom-16 h-32 w-32 rounded-full bg-brand-300/40 [--float-delay:-4s] [--float-duration:6s]" />
      </div>

      <div className="animate-fade-in relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
        <SectionLabel>Платформа</SectionLabel>
        <h1 className="mt-6 max-w-2xl text-4xl leading-[1.05] font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
          Робота в Європі — без хаосу з документами й посередниками
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          VV Work з’єднує кандидатів із перевіреними партнерами-роботодавцями та допомагає компаніям
          швидко знаходити персонал по всій Європі.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <a href="#partners" className={buttonClassName('primary', 'lg')}>
            Знайти роботу
          </a>
          <a href="#employer" className={buttonClassName('secondary', 'lg')}>
            Знайти працівника
          </a>
        </div>
      </div>
    </section>
  );
}
