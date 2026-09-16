import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchPartnerBySlug } from '@/api/partners';
import type { Partner } from '@/types/domain';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';

type LoadState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'not-found' }
  | { status: 'success'; partner: Partner };

function PartnerHeaderBody({ slug, onRetry }: { slug: string; onRetry: () => void }) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetchPartnerBySlug(slug)
      .then((partner) => {
        if (cancelled) return;
        setState(partner ? { status: 'success', partner } : { status: 'not-found' });
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
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
          <Skeleton className="h-4 w-3/4 max-w-sm" />
        </div>
      </div>
    );
  }

  if (state.status === 'error') {
    return <RetryBlock onRetry={onRetry} />;
  }

  if (state.status === 'not-found') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-8 text-center shadow-card">
        <p className="text-muted">Партнера не знайдено.</p>
        <Link to="/" className="text-sm font-medium text-brand-500 hover:underline">
          На головну
        </Link>
      </div>
    );
  }

  const { partner } = state;

  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      {partner.logo ? (
        <img src={partner.logo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 text-2xl font-semibold text-paper">
          {partner.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
          {partner.name}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{partner.description}</p>
      </div>
    </div>
  );
}

type PartnerHeaderProps = {
  slug: string;
};

export function PartnerHeader({ slug }: PartnerHeaderProps) {
  const [reloadToken, setReloadToken] = useState(0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
      <PartnerHeaderBody
        key={`${slug}-${reloadToken}`}
        slug={slug}
        onRetry={() => setReloadToken((token) => token + 1)}
      />
    </section>
  );
}
