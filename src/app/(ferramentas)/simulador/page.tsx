import { ColorSimulator } from '@/components/tools/ColorSimulator';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = { title: 'Simulador de cores' };

export default function Page() {
  return (
    <div className="container py-10 lg:py-16 max-w-4xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Simulador' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Simulador de <span className="gold-gradient">cores</span></h1>
      <p className="mt-2 text-muted-foreground">Escolha a coroa e a aba e visualize combinações.</p>
      <div className="mt-8"><ColorSimulator /></div>
    </div>
  );
}