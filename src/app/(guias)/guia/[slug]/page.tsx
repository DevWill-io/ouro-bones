import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const GUIAS = {
  tamanhos: { title: 'Guia de tamanhos', body: 'Aba curva e reta, ajuste snapback, tamanhos P–GG. Aqui explicamos como escolher o tamanho ideal para o seu público.' },
  materiais: { title: 'Guia de materiais', body: 'Algodão, sarja, poliéster, telas respiráveis — cada material tem seu uso ideal. Entenda as diferenças.' },
  personalizacao: { title: 'Guia de personalização', body: 'Bordado, silk, patch bordado, aplicações em couro e sublimação. Qual escolher? Depende do design e do volume.' },
  glossario: { title: 'Glossário do atacado', body: 'Termos comuns no mercado de bonés personalizados: aba, coroa, pala, moletom, snapback, trucker.' },
} as const;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const g = GUIAS[params.slug as keyof typeof GUIAS];
  return g ? { title: g.title } : { title: 'Guia' };
}

export default function GuiaPage({ params }: { params: { slug: string } }) {
  const g = GUIAS[params.slug as keyof typeof GUIAS];
  if (!g) notFound();
  return (
    <div className="container py-10 lg:py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Guias' }, { label: g.title }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">{g.title}</h1>
      <p className="mt-4 text-muted-foreground">{g.body}</p>
    </div>
  );
}