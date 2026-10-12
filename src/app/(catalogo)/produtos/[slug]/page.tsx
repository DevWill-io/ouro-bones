'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/hooks/useProducts';
import { SITE } from '@/lib/constants';

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const { product, loading } = useProduct(params.slug);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !product) router.replace('/produtos');
  }, [loading, product, router]);

  if (loading) {
    return (
      <div className="container py-10 lg:py-16">
        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container py-10 lg:py-16">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Produtos', href: '/produtos' },
          { label: product.name },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: product.category,
          brand: { '@type': 'Brand', name: SITE.name },
        }}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <h1 className="text-3xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-3 text-muted-foreground">{product.description}</p>

          <div className="mt-6">
            <p className="text-sm font-medium">Cores disponíveis</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <span key={c} className="rounded-full border px-3 py-1 text-xs">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} quantity={30} className="w-full sm:w-auto" />
            <p className="mt-3 text-xs text-muted-foreground">
              Adicionado com quantidade sugerida (30) — você pode ajustar no carrinho.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}