import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata = { title: 'Casos de sucesso' };

export default function CasosPage() {
  return (
    <div className="container py-10 lg:py-16 max-w-4xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Casos' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Casos de sucesso</h1>
      <p className="mt-4 text-muted-foreground">Conteúdo em breve — adicione MDX em <code>src/content/casos/</code>.</p>
    </div>
  );
}