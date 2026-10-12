'use client';
import { useEffect, useState } from 'react';
import { getCollection } from '@/lib/firebase/firestore';
import { seedProducts } from '@/data/products';
import type { Product } from '@/types/product';

/**
 * Busca produtos ativos no Firestore.
 * Se a coleção estiver vazia (ou Firebase não configurado), cai no seed local.
 * Isso permite que o site funcione tanto antes quanto depois do admin popular.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getCollection<Product>('products');
        if (cancelled) return;
        const active = data.filter((p) => p.active !== false);
        // Se a coleção estiver vazia, usa o seed (primeira execução)
        setProducts(active.length > 0 ? active : seedProducts);
      } catch (err) {
        if (cancelled) return;
        // Falha silenciosa: mantém o site funcional com o seed local
        console.warn('[useProducts] Firestore indisponível, usando seed local.', err);
        setProducts(seedProducts);
        setError(err instanceof Error ? err : new Error('Erro desconhecido'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}

/** Busca um único produto por slug. */
export function useProduct(slug: string) {
  const { products, loading, error } = useProducts();
  const product = products.find((p) => p.slug === slug) ?? null;
  return { product, loading, error };
}