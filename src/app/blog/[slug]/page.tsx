import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const POSTS: Record<string, { title: string; body: string }> = {
  'como-escolher-bone-para-sua-marca': {
    title: 'Como escolher o boné ideal para sua marca',
    body: 'O boné certo comunica muito sobre sua marca. Considere: público-alvo, contexto de uso (uniforme, evento, varejo), tipo de personalização e volume. Truckers funcionam para eventos; dad hats, para lifestyle; five panels, para streetwear.',
  },
  'bordado-vs-silk': {
    title: 'Bordado vs Silk: qual escolher?',
    body: 'Bordado é durável e transmite sofisticação. Silk permite cores vibrantes e detalhes finos, com menor custo em grandes volumes. Muitas marcas combinam os dois.',
  },
  'brindes-corporativos-que-funcionam': {
    title: 'Brindes corporativos que realmente funcionam',
    body: 'Bonés têm alta taxa de reuso — seu cliente usa de verdade. Isso multiplica o alcance da sua marca. Prefira qualidade sobre quantidade.',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = POSTS[params.slug];
  return p ? { title: p.title } : { title: 'Post' };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];
  if (!post) notFound();
  return (
    <article className="container py-10 lg:py-16 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
      <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
      <p className="mt-6 text-muted-foreground whitespace-pre-line">{post.body}</p>
    </article>
  );
}