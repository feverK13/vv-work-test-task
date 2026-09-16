import { useCallback, useState } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import { validateContact, validateMessage, validateName } from '@/utils/validators';

export type ApplicationFormValues = {
  name: string;
  contact: string;
  message: string;
};

export type ApplicationFormField = keyof ApplicationFormValues;

export type ApplicationFormErrors = Partial<Record<ApplicationFormField, string>>;

type FieldEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type BlurEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>;

const INITIAL_VALUES: ApplicationFormValues = { name: '', contact: '', message: '' };

const FIELD_VALIDATORS: Record<ApplicationFormField, (value: string) => string | null> = {
  name: validateName,
  contact: validateContact,
  message: validateMessage,
};

function isApplicationFormField(name: string): name is ApplicationFormField {
  return name in FIELD_VALIDATORS;
}

function validateAll(values: ApplicationFormValues): ApplicationFormErrors {
  const errors: ApplicationFormErrors = {};

  for (const field of Object.keys(FIELD_VALIDATORS) as ApplicationFormField[]) {
    const error = FIELD_VALIDATORS[field](values[field]);
    if (error) errors[field] = error;
  }

  return errors;
}

export function useFormValidation() {
  const [values, setValues] = useState<ApplicationFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event: FieldEvent) => {
    const { name, value } = event.target;
    if (!isApplicationFormField(name)) return;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;

      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  const handleBlur = useCallback((event: BlurEvent) => {
    const { name, value } = event.target;
    if (!isApplicationFormField(name)) return;

    const error = FIELD_VALIDATORS[name](value);

    setErrors((current) => {
      const next = { ...current };
      if (error) {
        next[name] = error;
      } else {
        delete next[name];
      }
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (onValid: (values: ApplicationFormValues) => void | Promise<void>) => {
      if (isSubmitting) return;

      const nextErrors = validateAll(values);
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await onValid(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, values],
  );

  return { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting };
}
