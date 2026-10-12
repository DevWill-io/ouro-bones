import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = { title: 'Blog' };

const posts = [
  { slug: 'como-escolher-bone-para-sua-marca', title: 'Como escolher o boné ideal para sua marca', excerpt: 'Um guia prático para decidir entre trucker, dad hat, five panel e bucket.' },
  { slug: 'bordado-vs-silk', title: 'Bordado vs Silk: qual escolher?', excerpt: 'Comparativo direto entre as duas técnicas mais usadas.' },
  { slug: 'brindes-corporativos-que-funcionam', title: 'Brindes corporativos que realmente funcionam', excerpt: 'Por que bonés personalizados superam canecas e chaveiros.' },
];

export default function BlogPage() {
  return (
    <div className="container py-10 lg:py-16">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Blog' }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">Blog da <span className="gold-gradient">Ouro Bonés</span></h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Card key={p.slug} className="hover:border-primary transition">
            <CardContent className="p-6">
              <Link href={`/blog/${p.slug}`}>
                <h2 className="font-semibold hover:text-primary">{p.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}