import { useEffect, useState } from 'react';
import { fetchVacanciesByPartner } from '@/api/vacancies';
import type { Vacancy } from '@/types/domain';
import { categories } from '@/data/categories';
import { useDebounce } from '@/hooks/use-debounce';
import { useVacancyFilters } from '@/hooks/use-vacancy-filters';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
};

function VacancyListBody({
  slug,
  onRetry,
  debouncedQuery,
  selectedCategory,
}: VacancyListBodyProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

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
          <div key={index} className="rounded-lg border border-ink/10 p-6">
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
      <p className="rounded-md border border-ink/10 p-8 text-center text-ink/70">
        У цього партнера поки немає вакансій.
      </p>
    );
  }

  if (filteredVacancies.length === 0) {
    return (
      <p className="rounded-md border border-ink/10 p-8 text-center text-ink/70">
        Нічого не знайдено.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredVacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
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
  const debouncedQuery = useDebounce(query);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Вакансії</h2>

      <div className="mt-6 max-w-md">
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

      <div className="mt-4 flex flex-wrap gap-3">
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
              className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <Badge
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
        />
      </div>
    </section>
  );
}
