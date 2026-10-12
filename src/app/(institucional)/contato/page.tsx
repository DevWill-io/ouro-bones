import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SITE } from '@/lib/constants';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata = { title: 'Contato' };

export default function ContatoPage() {
  return (
    <div className="container py-10 lg:py-16 max-w-5xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Contato' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Fale com a <span className="gold-gradient">Ouro Bonés</span></h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <aside className="space-y-4">
          <div className="rounded-lg border p-5">
            <h2 className="font-semibold">Informações</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> {SITE.phone}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> {SITE.email}</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5" /> {SITE.address}</li>
              <li>{SITE.hours}</li>
            </ul>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border bg-muted/30 grid place-items-center">
            <span className="text-xs text-muted-foreground">Embed do Google Maps</span>
          </div>
        </aside>
      </div>
    </div>
  );
}