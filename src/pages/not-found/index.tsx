import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-medium tracking-widest text-brand-500 uppercase">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">Сторінку не знайдено</h1>
      <p className="mt-4 text-ink/70">
        Можливо, посилання застаріле або адресу введено з помилкою.
      </p>
      <Link to="/" className="mt-8">
        <Button type="button">На головну</Button>
      </Link>
    </section>
  );
}
