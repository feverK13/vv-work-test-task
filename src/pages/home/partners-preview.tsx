import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchPartners } from '@/api/partners';
import type { Partner } from '@/types/domain';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Skeleton } from '@/components/ui/skeleton';
import { RetryBlock } from '@/components/ui/retry-block';
import { SectionLabel } from '@/components/ui/section-label';
import { buttonClassName } from '@/components/ui/button-styles';

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
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKELETON_CARDS.map((index) => (
          <div key={index} className="rounded-xl border border-line bg-paper p-6 shadow-card">
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
      <div className="mt-12">
        <RetryBlock onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {partners.map((partner) => (
        <div
          key={partner.slug}
          className="flex flex-col rounded-xl border border-line bg-paper p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand-300 hover:shadow-elevated motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
        >
          <h3 className="text-lg font-semibold tracking-tight text-ink">{partner.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{partner.description}</p>
          <Link
            to={`/partners/${partner.slug}`}
            className={buttonClassName('primary', 'md', 'mt-6 self-start')}
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
  const { ref, revealClassName } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="partners"
      className={`mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28 ${revealClassName}`}
    >
      <SectionLabel>Партнери</SectionLabel>
      <h2 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        Наші партнери-роботодавці
      </h2>

      <PartnersPreviewBody key={reloadToken} onRetry={() => setReloadToken((token) => token + 1)} />
    </section>
  );
}
