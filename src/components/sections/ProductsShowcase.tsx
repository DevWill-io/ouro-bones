'use client';
import Link from 'next/link';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

export function ProductsShowcase() {
  const { products, loading } = useProducts();

  const featured = products.filter((p) => p.featured).slice(0, 3);
  // Se nenhum marcado como destaque, mostra os 3 primeiros
  const display = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Modelos em <span className="gold-gradient">destaque</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Do trucker clássico ao dad hat, escolha o que combina com sua marca.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Ver todos <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : display.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}