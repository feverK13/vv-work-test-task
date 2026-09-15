import { Link } from 'react-router';
import { categories } from '@/data/categories';
import { partners } from '@/data/partners';
import { Badge } from '@/components/ui/badge';

export function CategoriesBlock() {
  const firstPartnerSlug = partners[0].slug;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-medium tracking-widest text-brand-500 uppercase">Категорії</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Оберіть напрямок</h2>

      <div className="mt-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link key={category.id} to={`/partners/${firstPartnerSlug}?category=${category.id}`}>
            <Badge className="transition-colors hover:bg-brand-400">{category.label}</Badge>
          </Link>
        ))}
      </div>
    </section>
  );
}
