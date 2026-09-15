const PRIMARY_CTA_CLASSNAME =
  'inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90';
const SECONDARY_CTA_CLASSNAME =
  'inline-flex items-center justify-center rounded-md border border-ink px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink/5';

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <p className="text-xs font-medium tracking-widest text-brand-500 uppercase">Платформа</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Робота в Європі — без хаосу з документами й посередниками
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-ink/70">
        VV Work з’єднує кандидатів із перевіреними партнерами-роботодавцями та допомагає компаніям
        швидко знаходити персонал по всій Європі.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href="#partners" className={PRIMARY_CTA_CLASSNAME}>
          Знайти роботу
        </a>
        <a href="#employer" className={SECONDARY_CTA_CLASSNAME}>
          Знайти працівника
        </a>
      </div>
    </section>
  );
}
