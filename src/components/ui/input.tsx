import type { ChangeEvent, FocusEvent } from 'react';

type InputProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  maxLength?: number;
  error?: string;
  showCounter?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
};

const fieldBaseClassName =
  'w-full rounded-md border bg-paper px-3 py-2 text-ink transition-colors placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 focus:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-50';

export function Input({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  disabled,
  maxLength,
  error,
  showCounter,
  multiline = false,
  rows = 4,
  className = '',
}: InputProps) {
  const fieldClassName = `${fieldBaseClassName} ${error ? 'border-red-500' : 'border-line hover:border-ink/25'} ${className}`;

  return (
    <div>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={fieldClassName}
        />
      ) : (
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          className={fieldClassName}
        />
      )}
      {error || showCounter ? (
        <div className="mt-1 flex items-center justify-between gap-2 text-sm">
          {error ? <p className="text-red-600">{error}</p> : <span />}
          {showCounter && maxLength ? (
            <span className="text-ink/50">
              {value.length}/{maxLength}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
