import { describe, expect, it } from 'vitest';
import { validateContact, validateMessage, validateName } from '@/utils/validators';

describe('validateName', () => {
  it('accepts two characters or more after trimming', () => {
    expect(validateName('Ігор')).toBeNull();
    expect(validateName('  Ян  ')).toBeNull();
  });

  it('rejects shorter values', () => {
    expect(validateName('')).toBe("Ім'я має містити щонайменше 2 символи");
    expect(validateName('  І  ')).toBe("Ім'я має містити щонайменше 2 символи");
  });
});

describe('validateContact', () => {
  it('accepts phones with and without separators', () => {
    expect(validateContact('+380441234567')).toBeNull();
    expect(validateContact('+38 044 123-45-67')).toBeNull();
    expect(validateContact('044123456')).toBeNull();
    expect(validateContact('+38 (044) 123-45-67')).toBeNull();
  });

  it('accepts telegram usernames', () => {
    expect(validateContact('@ihor_k')).toBeNull();
  });

  it('rejects anything else', () => {
    const error = 'Вкажіть номер телефону або Telegram (@username)';
    expect(validateContact('')).toBe(error);
    expect(validateContact('12345678')).toBe(error);
    expect(validateContact('@abc')).toBe(error);
    expect(validateContact('ihor@example.com')).toBe(error);
  });
});

describe('validateMessage', () => {
  it('treats an empty message as valid', () => {
    expect(validateMessage('')).toBeNull();
  });

  it('rejects more than 500 characters', () => {
    expect(validateMessage('x'.repeat(500))).toBeNull();
    expect(validateMessage('x'.repeat(501))).toBe('Повідомлення не може перевищувати 500 символів');
  });
});
