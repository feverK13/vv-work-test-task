export const MESSAGE_MAX_LENGTH = 500;

const PHONE_PATTERN = /^\+?\d{9,13}$/;
const TELEGRAM_PATTERN = /^@\w{5,32}$/;
const PHONE_SEPARATORS_PATTERN = /[\s()-]/g;

export function validateName(value: string): string | null {
  return value.trim().length >= 2 ? null : "Ім'я має містити щонайменше 2 символи";
}

export function validateContact(value: string): string | null {
  const normalized = value.trim();
  const phoneCandidate = normalized.replace(PHONE_SEPARATORS_PATTERN, '');

  if (PHONE_PATTERN.test(phoneCandidate) || TELEGRAM_PATTERN.test(normalized)) {
    return null;
  }

  return 'Вкажіть номер телефону або Telegram (@username)';
}

export function validateMessage(value: string): string | null {
  return value.length <= MESSAGE_MAX_LENGTH
    ? null
    : `Повідомлення не може перевищувати ${MESSAGE_MAX_LENGTH} символів`;
}
