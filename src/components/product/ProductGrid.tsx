'use client';
import { useMemo, useState } from 'react';
import type { Product } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';

export function ProductGrid({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const filtered = useMemo(() => {
    const list = category === 'all' ? products : products.filter((p) => p.category === category);
    const sorted = [...list];
    if (sort === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === 'featured') sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, category, sort]);

  return (
    <div>
      <ProductFilters
        categories={categories}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}