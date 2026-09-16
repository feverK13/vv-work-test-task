import { useId, useState } from 'react';
import type { FormEvent } from 'react';
import { submitApplication } from '@/api/applications';
import { useFormValidation } from '@/hooks/use-form-validation';
import type { ApplicationFormValues } from '@/hooks/use-form-validation';
import { MESSAGE_MAX_LENGTH } from '@/utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type ApplicationFormProps = {
  vacancyTitle?: string;
  onSubmitted?: () => void;
};

export function ApplicationForm({ vacancyTitle, onSubmitted }: ApplicationFormProps) {
  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting } =
    useFormValidation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const fieldId = useId();

  const sendInBackground = (submittedValues: ApplicationFormValues) => {
    submitApplication({
      name: submittedValues.name.trim(),
      contact: submittedValues.contact.trim(),
      message: submittedValues.message.trim() || undefined,
      vacancyTitle,
    }).catch(() => {
      setHasFailed(true);
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void handleSubmit((submittedValues) => {
      setHasFailed(false);
      setIsSubmitted(true);
      onSubmitted?.();
      sendInBackground(submittedValues);
    });
  };

  if (isSubmitted) {
    return (
      <div
        className="animate-fade-in rounded-xl border border-line bg-paper p-6 shadow-card"
        role="status"
        aria-live="polite"
      >
        <p className="font-medium text-ink">Дякуємо! Ми зв'яжемось з вами найближчим часом.</p>

        {hasFailed ? (
          <div className="animate-fade-in mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3">
            <p className="text-sm text-red-600">Не вдалося надіслати, спробуйте ще раз</p>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setHasFailed(false);
                setIsSubmitted(false);
              }}
            >
              Повернутись до форми
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {vacancyTitle ? (
        <p className="text-sm text-muted">
          Відгук на вакансію: <span className="font-medium text-ink">{vacancyTitle}</span>
        </p>
      ) : null}

      <div>
        <label htmlFor={`${fieldId}-name`} className="mb-1 block text-sm font-medium text-ink">
          Ім'я
        </label>
        <Input
          id={`${fieldId}-name`}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          placeholder="Як до вас звертатись"
        />
      </div>

      <div>
        <label htmlFor={`${fieldId}-contact`} className="mb-1 block text-sm font-medium text-ink">
          Телефон або Telegram
        </label>
        <Input
          id={`${fieldId}-contact`}
          name="contact"
          value={values.contact}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.contact}
          placeholder="+380XXXXXXXXX або @username"
        />
      </div>

      <div>
        <label htmlFor={`${fieldId}-message`} className="mb-1 block text-sm font-medium text-ink">
          Повідомлення
        </label>
        <Input
          id={`${fieldId}-message`}
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.message}
          placeholder="Коротко про ваш досвід (необов'язково)"
          multiline
          rows={4}
          maxLength={MESSAGE_MAX_LENGTH}
          showCounter
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="self-start">
        Надіслати
      </Button>
    </form>
  );
}
