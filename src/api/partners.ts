import { partners } from '@/data/partners';
import type { Partner } from '@/types/domain';
import { mockFetch } from '@/api/mock-fetch';

export function fetchPartners(): Promise<Partner[]> {
  return mockFetch(() => partners);
}

export function fetchPartnerBySlug(slug: string): Promise<Partner | null> {
  return mockFetch(() => partners.find((partner) => partner.slug === slug) ?? null);
}
