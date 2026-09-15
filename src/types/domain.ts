export type Category = {
  id: string;
  label: string;
};

export type Partner = {
  slug: string;
  name: string;
  logo?: string;
  description: string;
};

export type Vacancy = {
  id: string;
  title: string;
  categoryId: string;
  partnerSlug: string;
  location?: string;
  description?: string;
};
