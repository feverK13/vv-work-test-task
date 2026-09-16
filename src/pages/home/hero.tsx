import { buttonClassName } from '@/components/ui/button-styles';
import { SectionLabel } from '@/components/ui/section-label';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-paper via-brand-100/30 to-paper">
      <div className="animate-fade-in mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
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
