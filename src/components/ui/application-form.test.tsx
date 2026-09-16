import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ApplicationForm } from '@/components/ui/application-form';
import { submitApplication } from '@/api/applications';

vi.mock('@/api/applications', () => ({
  submitApplication: vi.fn(() => new Promise<void>(() => {})),
}));

const submitApplicationMock = vi.mocked(submitApplication);

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Ім'я"), 'Ігор');
  await user.type(screen.getByLabelText('Телефон або Telegram'), '+380441234567');
}

describe('ApplicationForm', () => {
  beforeEach(() => {
    submitApplicationMock.mockReset();
    submitApplicationMock.mockImplementation(() => new Promise<void>(() => {}));
  });

  it('blocks submit and shows inline errors when invalid', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByRole('button', { name: 'Надіслати' }));

    expect(screen.getByText("Ім'я має містити щонайменше 2 символи")).toBeInTheDocument();
    expect(screen.getByText('Вкажіть номер телефону або Telegram (@username)')).toBeInTheDocument();
    expect(submitApplicationMock).not.toHaveBeenCalled();
  });

  it('validates a single field on blur', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByLabelText("Ім'я"));
    await user.tab();

    expect(screen.getByText("Ім'я має містити щонайменше 2 символи")).toBeInTheDocument();
    expect(
      screen.queryByText('Вкажіть номер телефону або Telegram (@username)'),
    ).not.toBeInTheDocument();
  });

  it('clears a stale field error as soon as the user types, before the next blur', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByLabelText("Ім'я"));
    await user.tab();
    expect(screen.getByText("Ім'я має містити щонайменше 2 символи")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Ім'я"), 'І');

    expect(screen.queryByText("Ім'я має містити щонайменше 2 символи")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Ім'я")).toHaveFocus();
  });

  it('re-validates on blur after the error was cleared by typing', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.click(screen.getByLabelText("Ім'я"));
    await user.tab();
    await user.type(screen.getByLabelText("Ім'я"), 'І');
    await user.tab();

    expect(screen.getByText("Ім'я має містити щонайменше 2 символи")).toBeInTheDocument();
  });

  it('does not validate an untouched field while another field is being typed', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await user.type(screen.getByLabelText("Ім'я"), 'Ігор');

    expect(
      screen.queryByText('Вкажіть номер телефону або Telegram (@username)'),
    ).not.toBeInTheDocument();
  });

  it('shows the success state before the request resolves (optimistic UI)', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm vacancyTitle="Муляр" />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Надіслати' }));

    expect(screen.getByText(/Дякуємо/)).toBeInTheDocument();
    expect(screen.queryByLabelText("Ім'я")).not.toBeInTheDocument();
    expect(submitApplicationMock).toHaveBeenCalledWith({
      name: 'Ігор',
      contact: '+380441234567',
      message: undefined,
      vacancyTitle: 'Муляр',
    });
  });

  it('sends only one request on a double submit', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm />);

    await fillValidForm(user);
    const submitButton = screen.getByRole('button', { name: 'Надіслати' });
    await user.dblClick(submitButton);

    expect(submitApplicationMock).toHaveBeenCalledTimes(1);
  });

  it('offers a retry that keeps the entered values when the background call fails', async () => {
    submitApplicationMock.mockImplementation(() => Promise.reject(new Error('Network')));

    const user = userEvent.setup();
    render(<ApplicationForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole('button', { name: 'Надіслати' }));

    await waitFor(() =>
      expect(screen.getByText('Не вдалося надіслати, спробуйте ще раз')).toBeInTheDocument(),
    );

    await user.click(screen.getByRole('button', { name: 'Повернутись до форми' }));

    expect(screen.getByLabelText("Ім'я")).toHaveValue('Ігор');
    expect(screen.getByLabelText('Телефон або Telegram')).toHaveValue('+380441234567');
  });

  it('renders the vacancy context and the character counter', async () => {
    const user = userEvent.setup();
    render(<ApplicationForm vacancyTitle="Прораб" />);

    expect(screen.getByText(/Відгук на вакансію:/)).toBeInTheDocument();
    expect(screen.getByText('Прораб')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Повідомлення'), 'Досвід 5 років');

    expect(screen.getByText('14/500')).toBeInTheDocument();
  });
});
