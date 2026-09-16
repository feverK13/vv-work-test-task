import { memo, useState } from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import type { Vacancy } from '@/types/domain';
import { categories } from '@/data/categories';
import { ApplicationForm } from '@/components/ui/application-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type VacancyCardProps = {
  vacancy: Vacancy;
};

function VacancyCardComponent({ vacancy }: VacancyCardProps) {
  const categoryLabel = categories.find((category) => category.id === vacancy.categoryId)?.label;
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-l-[3px] border-line border-l-brand-500 bg-paper p-6 shadow-card transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-elevated motion-reduce:hover:translate-y-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-ink">{vacancy.title}</h3>
        </div>
        {categoryLabel ? <Badge className="shrink-0">{categoryLabel}</Badge> : null}
      </div>

      {vacancy.location ? (
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {vacancy.location}
        </p>
      ) : null}

      {vacancy.description ? <p className="text-sm text-muted">{vacancy.description}</p> : null}

      <Button
        type="button"
        aria-expanded={isFormOpen}
        onClick={() => setIsFormOpen((open) => !open)}
        className="mt-auto self-start"
      >
        {isFormOpen ? 'Згорнути' : 'Відгукнутись'}
      </Button>

      {isFormOpen ? (
        <div className="mt-2 border-t border-line pt-4">
          <ApplicationForm vacancyTitle={vacancy.title} />
        </div>
      ) : null}
    </article>
  );
}

export const VacancyCard = memo(VacancyCardComponent);
