import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchPartners } from '@/api/partners';
import type { Partner } from '@/types/domain';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';

type LoadState = 'loading' | 'error' | 'success';

const SKELETON_CARDS = Array.from({ length: 6 }, (_, index) => index);

function PartnersPreviewBody({ onRetry }: { onRetry: () => void }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [state, setState] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;

    fetchPartners()
      .then((result) => {
        if (cancelled) return;
        setPartners(result);
        setState('success');
      })
      .catch(() => {
        if (cancelled) return;
        setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (state === 'loading') {
    return (
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKELETON_CARDS.map((index) => (
          <div key={index} className="rounded-lg border border-ink/10 p-6">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-6 h-9 w-36" />
          </div>
        ))}
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="mt-10">
        <RetryBlock onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => (
        <div key={partner.slug} className="flex flex-col rounded-lg border border-ink/10 p-6">
          <h3 className="text-lg font-semibold text-ink">{partner.name}</h3>
          <p className="mt-2 flex-1 text-sm text-ink/70">{partner.description}</p>
          <Link
            to={`/partners/${partner.slug}`}
            className="mt-6 inline-flex items-center justify-center self-start rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90"
          >
            Дивитись вакансії
          </Link>
        </div>
      ))}
    </div>
  );
}

export function PartnersPreview() {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <section id="partners" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-medium tracking-widest text-brand-500 uppercase">Партнери</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
        Наші партнери-роботодавці
      </h2>

      <PartnersPreviewBody key={reloadToken} onRetry={() => setReloadToken((token) => token + 1)} />
    </section>
  );
}
