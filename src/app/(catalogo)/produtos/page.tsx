'use client';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import { useProducts } from '@/hooks/useProducts';

export default function ProdutosPage() {
  const { products, loading } = useProducts();

  return (
    <div className="container py-10 lg:py-16">
      <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: 'Produtos' }]} />
      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Catálogo de <span className="gold-gradient">bonés</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escolha os modelos, adicione as cores e monte seu pedido de 30+ unidades.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          Nenhum produto cadastrado ainda.
        </p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}