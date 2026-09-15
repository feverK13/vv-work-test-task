import { vacancies } from '@/data/vacancies';
import type { Vacancy } from '@/types/domain';
import { mockFetch } from '@/api/mock-fetch';

export function fetchVacanciesByPartner(slug: string): Promise<Vacancy[]> {
  return mockFetch(() => vacancies.filter((vacancy) => vacancy.partnerSlug === slug));
}
