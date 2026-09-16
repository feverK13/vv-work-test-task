import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { ApplicationForm } from '@/components/ui/application-form';

const contactDetails = [
  { icon: MapPin, label: 'Адреса', value: 'м. Київ, вул. Хрещатик, 1, офіс 200' },
  { icon: Phone, label: 'Телефон', value: '+380441234567' },
  { icon: Mail, label: 'Email', value: 'info@vvwork.ua' },
  { icon: Clock, label: 'Графік', value: 'Пн–Пт, 09:00–18:00' },
];

export function ContactsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Контакти</h1>
      <p className="mt-4 max-w-2xl text-ink/70">
        Залиште заявку — і ми підберемо роботу або працівників під ваш запит.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <dl className="flex flex-col gap-6">
          {contactDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <dt className="text-sm text-ink/60">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            </div>
          ))}
        </dl>

        <div className="rounded-lg border border-ink/10 p-6">
          <h2 className="text-xl font-semibold tracking-tight text-ink">Залишити заявку</h2>
          <div className="mt-6">
            <ApplicationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
