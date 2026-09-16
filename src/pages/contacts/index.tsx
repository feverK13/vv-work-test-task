import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ApplicationForm } from '@/components/ui/application-form';

const contactDetails = [
  { icon: MapPin, label: 'Адреса', value: 'м. Київ, вул. Хрещатик, 1, офіс 200' },
  { icon: Phone, label: 'Телефон', value: '+380441234567' },
  { icon: Mail, label: 'Email', value: 'info@vvwork.ua' },
  { icon: Clock, label: 'Графік', value: 'Пн–Пт, 09:00–18:00' },
];

const cardClassName =
  'relative rounded-2xl border border-line bg-white p-6 shadow-card before:absolute before:top-0 before:left-6 before:h-1 before:w-12 before:rounded-b-full before:bg-brand-500 sm:p-8 sm:before:left-8';

export function ContactsPage() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
        aria-hidden="true"
      >
        <div className="absolute top-8 right-0 h-80 w-80 rounded-full bg-brand-200/35" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rotate-12 rounded-[3rem] bg-brand-100/70" />
        <div className="absolute top-1/3 left-1/2 h-36 w-36 rounded-full bg-brand-200/30" />
      </div>

      <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        Контакти
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
        Залиште заявку — і ми підберемо роботу або працівників під ваш запит.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <dl className={`${cardClassName} flex flex-col gap-6`}>
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className={cardClassName}>
          <h2 className="text-xl font-semibold tracking-tight text-ink">Залишити заявку</h2>
          <div className="mt-6">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
