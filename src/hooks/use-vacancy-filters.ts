import { useMemo } from 'react';
import type { Vacancy } from '@/types/domain';

export function useVacancyFilters(
  vacancies: Vacancy[],
  debouncedQuery: string,
  selectedCategory: string | null,
): Vacancy[] {
  return useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    if (normalizedQuery === '' && selectedCategory === null) {
      return vacancies;
    }

    return vacancies.filter((vacancy) => {
      const matchesQuery =
        normalizedQuery === '' || vacancy.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory = selectedCategory === null || vacancy.categoryId === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [vacancies, debouncedQuery, selectedCategory]);
}
