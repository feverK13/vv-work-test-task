import { memo } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Vacancy } from '@/types/domain';

const fixture: Vacancy[] = [
  { id: 'a', title: 'Муляр', categoryId: 'construction', partnerSlug: 'x' },
  { id: 'b', title: 'Прораб', categoryId: 'construction', partnerSlug: 'x' },
  { id: 'c', title: 'Водій категорії CE', categoryId: 'drivers', partnerSlug: 'x' },
];

const renderCounts: Record<string, number> = {};

vi.mock('@/api/vacancies', () => ({
  fetchVacanciesByPartner: () => Promise.resolve(fixture),
}));

vi.mock('@/pages/partner/vacancy-card', () => ({
  VacancyCard: memo(function VacancyCardSpy({ vacancy }: { vacancy: Vacancy }) {
    renderCounts[vacancy.id] = (renderCounts[vacancy.id] ?? 0) + 1;
    return <article>{vacancy.title}</article>;
  }),
}));

const { VacancyList } = await import('@/pages/partner/vacancy-list');
const realCard = await vi.importActual<typeof import('@/pages/partner/vacancy-card')>(
  '@/pages/partner/vacancy-card',
);

describe('vacancy list filtering', () => {
  it('does not re-render cards that stay visible while typing', async () => {
    const user = userEvent.setup();
    render(<VacancyList slug="x" />);

    await screen.findByText('Муляр');
    expect(renderCounts).toEqual({ a: 1, b: 1, c: 1 });

    await user.type(screen.getByLabelText('Пошук вакансій'), 'мул');

    await waitFor(
      () => {
        expect(screen.queryByText('Прораб')).not.toBeInTheDocument();
      },
      { timeout: 2000 },
    );

    expect(screen.getByText('Муляр')).toBeInTheDocument();
    expect(renderCounts.a).toBe(1);
  });

  it('shows the empty-filter message', async () => {
    const user = userEvent.setup();
    render(<VacancyList slug="x" />);
    await screen.findByText('Муляр');

    await user.type(screen.getByLabelText('Пошук вакансій'), 'zzz');

    await waitFor(() => expect(screen.getByText('Нічого не знайдено.')).toBeInTheDocument(), {
      timeout: 2000,
    });
  });

  it('real VacancyCard is wrapped in React.memo', () => {
    expect((realCard.VacancyCard as unknown as { $$typeof: symbol }).$$typeof).toBe(
      Symbol.for('react.memo'),
    );
  });
});
