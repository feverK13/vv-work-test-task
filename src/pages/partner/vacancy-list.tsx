import { Fragment, useCallback, useEffect, useState } from 'react';
import { fetchVacanciesByPartner } from '@/api/vacancies';
import type { Vacancy } from '@/types/domain';
import { categories } from '@/data/categories';
import { useDebounce } from '@/hooks/use-debounce';
import { useGridColumnCount } from '@/hooks/use-grid-column-count';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useVacancyFilters } from '@/hooks/use-vacancy-filters';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ApplicationForm } from '@/components/ui/application-form';
import { VacancyCard } from '@/pages/partner/vacancy-card';

type LoadState =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; vacancies: Vacancy[] };

const SKELETON_CARDS = Array.from({ length: 6 }, (_, index) => index);

const NO_VACANCIES: Vacancy[] = [];

const ACTIVE_CHIP_CLASS_NAME = 'transition-colors hover:bg-brand-400';

const INACTIVE_CHIP_CLASS_NAME = 'transition-colors hover:bg-ink/5';

function resolveInitialCategory(initialCategory: string | undefined): string | null {
  if (!initialCategory) return null;

  return categories.some((category) => category.id === initialCategory) ? initialCategory : null;
}

type VacancyListBodyProps = {
  slug: string;
  onRetry: () => void;
  debouncedQuery: string;
  selectedCategory: string | null;
  openVacancyId: string | null;
  onToggleVacancy: (vacancyId: string) => void;
};

function VacancyListBody({
  slug,
  onRetry,
  debouncedQuery,
  selectedCategory,
  openVacancyId,
  onToggleVacancy,
}: VacancyListBodyProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });
  const { gridRef, columnCount } = useGridColumnCount();

  useEffect(() => {
    let cancelled = false;

    fetchVacanciesByPartner(slug)
      .then((vacancies) => {
        if (cancelled) return;
        setState({ status: 'success', vacancies });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ status: 'error' });
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const loadedVacancies = state.status === 'success' ? state.vacancies : NO_VACANCIES;
  const filteredVacancies = useVacancyFilters(loadedVacancies, debouncedQuery, selectedCategory);

  if (state.status === 'loading') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKELETON_CARDS.map((index) => (
          <div key={index} className="rounded-xl border border-line bg-paper p-6 shadow-card">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="mt-3 h-4 w-1/3" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-4/5" />
            <Skeleton className="mt-6 h-9 w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (state.status === 'error') {
    return <RetryBlock onRetry={onRetry} />;
  }

  if (loadedVacancies.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-paper p-8 text-center text-muted shadow-card">
        У цього партнера поки немає вакансій.
      </p>
    );
  }

  if (filteredVacancies.length === 0) {
    return (
      <p className="rounded-xl border border-line bg-paper p-8 text-center text-muted shadow-card">
        Нічого не знайдено.
      </p>
    );
  }

  const openIndex = filteredVacancies.findIndex((vacancy) => vacancy.id === openVacancyId);
  const openVacancy = openIndex >= 0 ? filteredVacancies[openIndex] : null;
  const formRowIndex =
    openIndex < 0
      ? -1
      : Math.min(
          (Math.floor(openIndex / columnCount) + 1) * columnCount - 1,
          filteredVacancies.length - 1,
        );

  return (
    <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredVacancies.map((vacancy, index) => (
        <Fragment key={vacancy.id}>
          <VacancyCard
            vacancy={vacancy}
            isOpen={vacancy.id === openVacancyId}
            onToggle={onToggleVacancy}
          />
          {openVacancy && index === formRowIndex ? (
            <div id={`vacancy-form-${openVacancy.id}`} className="expand-row col-span-full">
              <div>
                <div className="rounded-xl border border-l-[3px] border-line border-l-brand-500 bg-paper p-6 shadow-card sm:p-8">
                  <ApplicationForm vacancyTitle={openVacancy.title} />
                </div>
              </div>
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

type VacancyListProps = {
  slug: string;
  initialCategory?: string;
};

export function VacancyList({ slug, initialCategory }: VacancyListProps) {
  const [reloadToken, setReloadToken] = useState(0);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    resolveInitialCategory(initialCategory),
  );
  const [openVacancyId, setOpenVacancyId] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query);
  const { ref, revealClassName } = useScrollReveal<HTMLElement>();

  const handleToggleVacancy = useCallback((vacancyId: string) => {
    setOpenVacancyId((current) => (current === vacancyId ? null : vacancyId));
  }, []);

  return (
    <section
      ref={ref}
      className={`mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28 ${revealClassName}`}
    >
      <h2 className="text-2xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
        Вакансії
      </h2>

      <div className="mt-8 w-full md:max-w-md">
        <label htmlFor="vacancy-search" className="sr-only">
          Пошук вакансій
        </label>
        <Input
          id="vacancy-search"
          name="vacancy-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Пошук за назвою вакансії"
        />
      </div>

      <div className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {categories.map((category) => {
          const isActive = category.id === selectedCategory;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() =>
                setSelectedCategory((current) => (current === category.id ? null : category.id))
              }
              className="shrink-0 snap-start rounded-full transition-[scale] duration-150 focus:outline-none active:scale-95 active:duration-0 motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <Badge
                size="md"
                variant={isActive ? 'solid' : 'outline'}
                className={isActive ? ACTIVE_CHIP_CLASS_NAME : INACTIVE_CHIP_CLASS_NAME}
              >
                {category.label}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <VacancyListBody
          key={`${slug}-${reloadToken}`}
          slug={slug}
          onRetry={() => setReloadToken((token) => token + 1)}
          debouncedQuery={debouncedQuery}
          selectedCategory={selectedCategory}
          openVacancyId={openVacancyId}
          onToggleVacancy={handleToggleVacancy}
        />
      </div>
    </section>
  );
}
