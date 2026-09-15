import { mockFetch } from '@/api/mock-fetch';

export type ApplicationPayload = {
  name: string;
  contact: string;
  message?: string;
  vacancyTitle?: string;
};

export function submitApplication(payload: ApplicationPayload): Promise<void> {
  return mockFetch(() => {
    console.info('Application submitted', payload);
  });
}
