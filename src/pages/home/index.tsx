import { Hero } from '@/pages/home/hero';
import { PartnersPreview } from '@/pages/home/partners-preview';
import { CategoriesBlock } from '@/pages/home/categories-block';
import { EmployerCta } from '@/pages/home/employer-cta';

export function HomePage() {
  return (
    <>
      <Hero />
      <PartnersPreview />
      <CategoriesBlock />
      <EmployerCta />
    </>
  );
}
