import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Vacancy } from '@/types/domain';
import { VacancyList } from '@/pages/partner/vacancy-list';

const fixture: Vacancy[] = [
  { id: 'a', title: 'Муляр', categoryId: 'construction', partnerSlug: 'x' },
  { id: 'b', title: 'Прораб', categoryId: 'construction', partnerSlug: 'x' },
  { id: 'c', title: 'Водій категорії CE', categoryId: 'drivers', partnerSlug: 'x' },
];

vi.mock('@/api/vacancies', () => ({
  fetchVacanciesByPartner: () => Promise.resolve(fixture),
}));

vi.mock('@/api/applications', () => ({
  submitApplication: vi.fn(() => new Promise<void>(() => {})),
}));

function openButtons() {
  return screen.getAllByRole('button', { name: 'Відгукнутись' });
}

describe('vacancy list expand', () => {
  it('opens one form at a time and closes the previous one', async () => {
    const user = userEvent.setup();
    render(<VacancyList slug="x" />);

    await screen.findByText('Муляр');
    expect(screen.queryByText(/Відгук на вакансію:/)).not.toBeInTheDocument();

    await user.click(openButtons()[0]);

    expect(screen.getAllByLabelText("Ім'я")).toHaveLength(1);
    expect(screen.getByText('Муляр', { selector: 'span' })).toBeInTheDocument();

    await user.click(openButtons()[0]);

    expect(screen.getAllByLabelText("Ім'я")).toHaveLength(1);
    expect(screen.getByText('Прораб', { selector: 'span' })).toBeInTheDocument();
    expect(screen.queryByText('Муляр', { selector: 'span' })).not.toBeInTheDocument();
  });

  it('collapses when the open card is toggled again', async () => {
    const user = userEvent.setup();
    render(<VacancyList slug="x" />);

    await screen.findByText('Муляр');
    await user.click(openButtons()[0]);
    expect(screen.getAllByLabelText("Ім'я")).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Згорнути' }));

    expect(screen.queryByLabelText("Ім'я")).not.toBeInTheDocument();
  });

  it('renders the form outside the card that triggered it', async () => {
    const user = userEvent.setup();
    render(<VacancyList slug="x" />);

    await screen.findByText('Муляр');
    await user.click(openButtons()[0]);

    const trigger = screen.getByRole('button', { name: 'Згорнути' });
    const card = trigger.closest('article');
    const form = screen.getByLabelText("Ім'я").closest('form');

    expect(card).not.toBeNull();
    expect(form).not.toBeNull();
    expect(card?.contains(form as Node)).toBe(false);
    expect(trigger.getAttribute('aria-controls')).toBe('vacancy-form-a');
  });
});
