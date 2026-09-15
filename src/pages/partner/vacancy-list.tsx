import { useEffect, useState } from 'react';
import { fetchVacanciesByPartner } from '@/api/vacancies';
import type { Vacancy } from '@/types/domain';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';
import { VacancyCard } from '@/pages/partner/vacancy-card';

type LoadState =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; vacancies: Vacancy[] };

const SKELETON_CARDS = Array.from({ length: 6 }, (_, index) => index);

function VacancyListBody({ slug, onRetry }: { slug: string; onRetry: () => void }) {
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

  if (state.vacancies.length === 0) {
    return (
      <p className="rounded-md border border-ink/10 p-8 text-center text-ink/70">
        У цього партнера поки немає вакансій.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {state.vacancies.map((vacancy) => (
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
  const [activeCategory] = useState(initialCategory);

  return (
    <section
      data-initial-category={activeCategory}
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Вакансії</h2>
      <div className="mt-6">
        <VacancyListBody
          key={`${slug}-${reloadToken}`}
          slug={slug}
          onRetry={() => setReloadToken((token) => token + 1)}
        />
      </div>
    </section>
  );
}
