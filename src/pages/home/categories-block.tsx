import type { ComponentType } from 'react';
import { Link } from 'react-router';
import {
  Car,
  Factory,
  Hammer,
  MoreHorizontal,
  Monitor,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { partners } from '@/data/partners';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { SectionLabel } from '@/components/ui/section-label';

type CategoryIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

const CATEGORY_ICONS: Record<string, CategoryIcon> = {
  construction: Hammer,
  manufacturing: Factory,
  logistics: Truck,
  hospitality: UtensilsCrossed,
  it: Monitor,
  drivers: Car,
  other: MoreHorizontal,
};

export function CategoriesBlock() {
  const firstPartnerSlug = partners[0].slug;
  const { ref, revealClassName } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="categories"
      className={`mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28 ${revealClassName}`}
    >
      <SectionLabel>Категорії</SectionLabel>
      <h2 className="mt-6 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        Оберіть напрямок
      </h2>

      <div className="no-scrollbar stagger-children -mx-4 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {categories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id];

          return (
            <Link
              key={category.id}
              to={`/partners/${firstPartnerSlug}?category=${category.id}`}
              className="shrink-0 snap-start rounded-full transition-[scale] duration-150 focus:outline-none active:scale-95 active:duration-0 motion-reduce:active:scale-100 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <Badge size="md" className="transition-colors hover:bg-brand-400">
                {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
                {category.label}
              </Badge>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
