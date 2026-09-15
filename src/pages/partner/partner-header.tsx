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
      <div className="flex items-center gap-4">
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
      <div className="flex flex-col items-center gap-3 rounded-md border border-ink/10 p-8 text-center">
        <p className="text-ink/70">Партнера не знайдено.</p>
        <Link to="/" className="text-sm font-medium text-brand-500 hover:underline">
          На головну
        </Link>
      </div>
    );
  }

  const { partner } = state;

  return (
    <div className="flex items-center gap-4">
      {partner.logo ? (
        <img src={partner.logo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
      ) : (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 text-2xl font-semibold text-paper">
          {partner.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">{partner.name}</h1>
        <p className="mt-2 text-sm text-ink/70">{partner.description}</p>
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
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <PartnerHeaderBody
        key={`${slug}-${reloadToken}`}
        slug={slug}
        onRetry={() => setReloadToken((token) => token + 1)}
      />
    </section>
  );
}
