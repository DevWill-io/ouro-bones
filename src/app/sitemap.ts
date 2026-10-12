import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { seedProducts } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/produtos', '/sobre', '/contato', '/blog', '/guia/tamanhos', '/guia/materiais', '/guia/personalizacao', '/guia/glossario', '/calculadora', '/quiz', '/simulador', '/privacidade', '/termos', '/trocas'];
  const now = new Date();
  const base = SITE.url;
  return [
    ...routes.map((r) => ({ url: `${base}${r}`, lastModified: now, changeFrequency: 'weekly' as const, priority: r === '' ? 1 : 0.7 })),
    ...seedProducts.map((p) => ({ url: `${base}/produtos/${p.slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6 })),
  ];
}