import { useParams, useSearchParams } from 'react-router';
import { PartnerHeader } from '@/pages/partner/partner-header';
import { VacancyList } from '@/pages/partner/vacancy-list';

export function PartnerPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') ?? undefined;

  return (
    <>
      <PartnerHeader slug={slug} />
      <VacancyList slug={slug} initialCategory={initialCategory} />
    </>
  );
}
