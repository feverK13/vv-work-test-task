import { memo } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import type { Vacancy } from '@/types/domain';
import { categories } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type VacancyCardProps = {
  vacancy: Vacancy;
};

function VacancyCardComponent({ vacancy }: VacancyCardProps) {
  const categoryLabel = categories.find((category) => category.id === vacancy.categoryId)?.label;

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-ink/10 p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-ink">{vacancy.title}</h3>
        </div>
        {categoryLabel ? <Badge className="shrink-0">{categoryLabel}</Badge> : null}
      </div>

      {vacancy.location ? (
        <p className="flex items-center gap-1.5 text-sm text-ink/60">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {vacancy.location}
        </p>
      ) : null}

      {vacancy.description ? <p className="text-sm text-ink/70">{vacancy.description}</p> : null}

      <Button type="button" className="mt-auto self-start">
        Відгукнутись
      </Button>
    </article>
  );
}

export const VacancyCard = memo(VacancyCardComponent);
